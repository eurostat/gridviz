//@ts-check

import { Style, Stat } from "../Style"
import { getStat } from "./RadarStyle"
import { Cell } from "../Dataset"
import { GeoViewer } from "../GeoViewer";

/**
 * 
 * @author Julien Gaffuri
 */
export class AgePyramidStyle extends Style {

    /** @param {object} opts */
    constructor(opts) {
        super(opts)
        opts = opts || {};

        /**
         * The dictionary which give the color of each category.
         * @private @type {object} */
        this.color = opts.color;

        /**
         * The function specifying how the length of a bar depending on the statistical value.
         * 
         * @private @type {function(number,number,Stat,number):number} */
         this.length = opts.lenght;

         /**
         * The function specifying how the height of the age pyramid.
         * 
         * @private @type {function(number):number} */
         this.height = opts.height;

    }


    /**
     * Draw cells as squares depending on their value.
     * 
     * @param {Array.<Cell>} cells 
     * @param {number} r 
     * @param {GeoViewer} cg 
     */
    draw(cells, r, cg) {


        //nb categories
        const nbCat = Object.entries(this.color).length

        //angle for each category: the same for all.
        const angle = 2 * Math.PI / nbCat
        const f = Math.PI/180

        //get the stat
        const stat = getStat(cells, this.color, true);

        for (let cell of cells) {

            //get offset
            const offset = this.offset(cell, r, cg.zf)

            //compute cell center position
            const xc = cg.geoToPixX(cell.x + r * 0.5 + offset.dx);
            const yc = cg.geoToPixY(cell.y + r * 0.5 + offset.dy);

            //draw decomposition symbols
            for (let [column, color] of Object.entries(this.color)) {

                //set category color
                cg.ctx.fillStyle = color;

                //get categroy value
                const val = cell[column]

                //compute category radius - in pixel
                /** @type {number} */
                const rP = this.radius(val, r, stat, cg.zf) / cg.zf

                //draw angular sector
                cg.ctx.beginPath();
                cg.ctx.moveTo(xc, yc);
                cg.ctx.arc(xc, yc, rP, angleCumul - angle, angleCumul);
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

    /** @returns {function(number,number,Stat,number):number} */
    getLength() { return this.length; }
    /** @param {function(number,number,Stat,number):number} val @returns {this} */
    setLength(val) { this.length = val; return this; }

}
