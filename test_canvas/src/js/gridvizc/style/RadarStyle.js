//@ts-check

import { Style, Stat, getStatistics } from "../Style"
import { Cell } from "../Dataset"
import { GeoCanvas } from "../GeoCanvas";

/**
 * A style showing the composition of the grid cell as a "radar" chart.
 * It is a bit like a pie chart, except the angular amplitude of each part is the same but the radius of the part changes depending on the category importance.
 * 
 * @author Julien Gaffuri
 */
export class RadarStyle extends Style {

    /** @param {object} opts */
    constructor(opts) {
        super(opts)
        opts = opts || {};

        /**
         * The dictionary which give the color of each category.
         * 
         * @private @type {object} */
        this.color = opts.color;




        /** The column where to get the size factor [0,1].
         * @private @type {string} */
        this.sizeFactorCol = opts.sizeFactorCol

        /** A function returning the size factor [0,1] of a cell.
         * @private @type {function(number,number,Stat|undefined,number):number} */
        this.sizeFactor = opts.sizeFactor || ((v, r, s, zf) => 1);

        /**
        * The function specifying the margin, in geo unit.
        * 
        * @private @type {function(number:number):number} */
        this.margin = opts.margin || ((r, zf) => 1 * zf);




        /**
         * The function specifying how the radius evolves depending on the statistical value.
         * 
         * @private @type {function(number,number,Stat|undefined,Stat|undefined,number):number} */
        //this.radius = opts.radius;

        /**
         * The function specifying how the offser angle.
         * 
         * @private @type {function(Cell,number,number):number} */
        this.offsetAngle = opts.offsetAngle;

    }


    /**
     * Draw cells.
     * 
     * @param {Array.<Cell>} cells 
     * @param {number} r 
     * @param {GeoCanvas} cg 
     */
    draw(cells, r, cg) {
        //zoom factor
        const zf = cg.getZf()

        //nb categories
        const nbCat = Object.entries(this.color).length

        //angle for each category: the same for all.
        const angle = 2 * Math.PI / nbCat
        const f = Math.PI / 180

        //get the stat
        //const keys = Object.keys(this.color)
        //const stat = getStat(cells, keys, true);

        //dimension, in geo
        const mG = this.margin(r, zf)
        const rMaxG = r / 2 - mG

        //get size stats
        let stat
        if (this.sizeFactorCol) {
            //compute statistics
            stat = getStatistics(cells, c => c[this.sizeFactorCol], true)
        }




        //draw in geo coordinates
        cg.setCanvasTransform()

        for (let cell of cells) {

            //get offset
            const offset = this.offset(cell, r, zf)

            //get offset angle
            const offsetAngle = this.offsetAngle ? this.offsetAngle(cell, r, zf) : 0
            let angleCumul = Math.PI + offsetAngle * f

            //compute cell center position
            const xc = cell.x + r * 0.5 + offset.dx;
            const yc = cell.y + r * 0.5 + offset.dy;

            //size factor
            /** @type {function(number,number,Stat|undefined,number):number} */
            let sF_ = this.sizeFactor || (() => 1);
            //size - in geo
            /** @type {number} */
            const sF = sF_(cell[this.sizeFactorCol], r, stat, zf)

            //get cell category max value
            let maxVal = -Infinity
            for (let key of Object.keys(this.color)) {
                const v = +cell[key];
                if (v > maxVal) maxVal = v
            }

            //draw decomposition symbols
            for (let [column, color] of Object.entries(this.color)) {

                //set category color
                cg.ctx.fillStyle = color;

                //get categroy value
                const val = cell[column]

                //compute category radius - in geo
                /** @type {number} */
                //const rG = this.radius(val, r, stat, cellStat, zf)
                const rG = sF * rMaxG * Math.sqrt(val / maxVal)

                //draw angular sector
                cg.ctx.beginPath();
                cg.ctx.moveTo(xc, yc);
                cg.ctx.arc(xc, yc, rG, angleCumul - angle, angleCumul);
                cg.ctx.lineTo(xc, yc);
                cg.ctx.fill();

                //next angular sector
                angleCumul -= angle
            }

        }

    }



    //getters and setters

    /** @returns {function(Cell):string} */
    getColor() { return this.color; }
    /** @param {function(Cell):string} val @returns {this} */
    setColor(val) { this.color = val; return this; }

    /** @returns {string} */
    getColSize() { return this.sizeFactorCol; }
    /** @param {string} val @returns {this} */
    setColSize(val) { this.sizeFactorCol = val; return this; }

    /** @returns {function(number,number,Stat|undefined,number):number} */
    getSizeFactor() { return this.sizeFactor; }
    /** @param {function(number,number,Stat|undefined,number):number} val @returns {this} */
    setSizeFactor(val) { this.sizeFactor = val; return this; }

    /** @returns {function(number,number):number} */
    getMargin() { return this.margin; }
    /** @param {function(number,number):number} val @returns {this} */
    sethMargin(val) { this.margin = val; return this; }

    /** @returns {function(Cell,number,number):number} */
    getOffsetAngle() { return this.offsetAngle; }
    /** @param {function(Cell,number,number):number} val @returns {this} */
    setOffsetAngle(val) { this.offsetAngle = val; return this; }

}
