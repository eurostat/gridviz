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

        /** The dictionary which give the color of each category.
         * @private @type {object} */
        this.color = opts.color;

        /** The column where to get the size values.
         * @private @type {string} */
        this.sizeCol = opts.sizeCol

        /** A function returning the size of a cell.
         * @private @type {function(number,number,Stat|undefined,number):number} */
        this.size = opts.size || ((v) => Math.sqrt(v));

        /** The function specifying how the offser angle.
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

        //get size stats
        let stat
        if (this.sizeCol) {
            //compute statistics
            stat = getStatistics(cells, c => c[this.sizeCol], true)
        }

        //draw in geo coordinates
        cg.setCanvasTransform()


        //angle for each category: the same for all.
        const angle = 2 * Math.PI / nbCat

        for (let cell of cells) {

            //get offset
            const offset = this.offset(cell, r, zf)

            //compute cell center position
            const xc = cell.x + r * 0.5 + offset.dx;
            const yc = cell.y + r * 0.5 + offset.dy;

            //size
            /** @type {function(number,number,Stat|undefined,number):number} */
            let s_ = this.size || (() => r);
            //size - in geo
            /** @type {number} */
            const sG = s_(cell[this.sizeCol], r, stat, zf)

            //get cell category max value
            let maxVal = -Infinity
            for (let key of Object.keys(this.color)) {
                const v = +cell[key];
                if (v > maxVal) maxVal = v
            }

            //draw decomposition symbols
            //get offset angle
            const offsetAngle = this.offsetAngle ? this.offsetAngle(cell, r, zf) : 0
            let cumul = Math.PI + offsetAngle * Math.PI / 180
            for (let [column, color] of Object.entries(this.color)) {

                //set category color
                cg.ctx.fillStyle = color;

                //get categroy value
                const val = cell[column]

                //compute category radius - in geo
                /** @type {number} */
                //const rG = this.radius(val, r, stat, cellStat, zf)
                const rG = sG / 2 * Math.sqrt(val / maxVal)

                //draw angular sector
                cg.ctx.beginPath();
                cg.ctx.moveTo(xc, yc);
                cg.ctx.arc(xc, yc, rG, cumul - angle, cumul);
                cg.ctx.lineTo(xc, yc);
                cg.ctx.fill();

                //next angular sector
                cumul -= angle
            }

        }

    }



    //getters and setters

    /** @returns {function(Cell):string} */
    getColor() { return this.color; }
    /** @param {function(Cell):string} val @returns {this} */
    setColor(val) { this.color = val; return this; }

    /** @returns {string} */
    getColSize() { return this.sizeCol; }
    /** @param {string} val @returns {this} */
    setColSize(val) { this.sizeCol = val; return this; }

    /** @returns {function(number,number,Stat|undefined,number):number} */
    getSize() { return this.size; }
    /** @param {function(number,number,Stat|undefined,number):number} val @returns {this} */
    setSize(val) { this.size = val; return this; }

    /** @returns {function(Cell,number,number):number} */
    getOffsetAngle() { return this.offsetAngle; }
    /** @param {function(Cell,number,number):number} val @returns {this} */
    setOffsetAngle(val) { this.offsetAngle = val; return this; }

}
