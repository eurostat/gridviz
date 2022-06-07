//@ts-check

import { Style, Stat } from "../Style"
import { getStat } from "./RadarStyle"
import { Cell } from "../Dataset"
import { GeoCanvas } from "../GeoCanvas";

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
         * The function specifying how the length of a bar depending on the statistical value, in geo unit.
         * 
         * @private @type {function(number,number,Stat,number):number} */
        this.length = opts.length;

        /**
        * The function specifying the height of the age pyramid, in geo unit.
        * 
        * @private @type {function(number):number} */
        this.height = opts.height || (r => r);

    }


    /**
     * Draw cells as squares depending on their value.
     * 
     * @param {Array.<Cell>} cells 
     * @param {number} r 
     * @param {GeoCanvas} cg 
     */
    draw(cells, r, cg) {

        //nb categories
        const nbCat = Object.entries(this.color).length

        //height, in pixel
        const h = this.height(r) / cg.zf
        const hPerCat = h / nbCat

        //get the stat
        const stat = getStat(cells, this.color, true);

        for (let cell of cells) {

            //get offset
            const offset = this.offset(cell, r, cg.zf)

            //
            let hCumul = (-r / cg.zf + h) * 0.5

            //compute cell position
            const xc = cg.geoToPixX(cell.x + offset.dx);
            const yc = cg.geoToPixY(cell.y + offset.dy);

            //draw decomposition symbols
            for (let [column, color] of Object.entries(this.color)) {

                //set category color
                cg.ctx.fillStyle = color;

                //get categroy value
                const val = cell[column]

                //compute category length - in pixel
                /** @type {number} */
                const wP = this.length(val, r, stat, cg.zf) / cg.zf

                //draw bar
                cg.ctx.fillRect(
                    xc + (r / cg.zf - wP) * 0.5,
                    yc + hCumul,
                    wP, -hPerCat);

                //next height
                hCumul -= hPerCat
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

    /** @returns {function(number):number} */
    getHeight() { return this.height; }
    /** @param {function(number):number} val @returns {this} */
    sethHight(val) { this.height = val; return this; }

}
