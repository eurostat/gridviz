//@ts-check

import { Style, Stat } from "../Style"
import { getStat, getCellStat } from "./RadarStyle"
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
         * @private @type {function(number,number,Stat|undefined,Stat|undefined,number):number} */
        this.length = opts.length;

        /**
        * The function specifying the margin, in geo unit.
        * 
        * @private @type {function(number):number} */
        this.margin = opts.margin || (r => 0.9 * r);

    }


    /**
     * Draw cells as squares depending on their value.
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

        //height, in geo
        const mG = this.margin(r)
        const hG = r - 2 * mG
        const hPerCatG = hG / nbCat

        //get the stat
        const keys = Object.keys(this.color)
        const stat = getStat(cells, keys, true);

        //draw in geo coordinates
        cg.setCanvasTransform()

        for (let cell of cells) {

            //get offset
            const offset = this.offset(cell, r, zf)

            //
            let hCumul = mG

            //compute cell position
            const xc = cell.x + offset.dx;
            const yc = cell.y + offset.dy;

            //get cell stats
            const cellStat = getCellStat(cell, keys, true);

            //draw decomposition symbols
            for (let [column, color] of Object.entries(this.color)) {

                //set category color
                cg.ctx.fillStyle = color;

                //get category value
                const val = cell[column]

                //compute category length - in geo
                /** @type {number} */
                const wG = this.length(val, r, stat, cellStat, zf)

                //draw bar
                cg.ctx.fillRect(
                    xc + (r - wG) / 2,
                    yc + hCumul,
                    wG, hPerCatG);

                //next height
                hCumul += hPerCatG
            }

        }
    }



    //getters and setters

    /** @returns {function(Cell):string} */
    getColor() { return this.color; }
    /** @param {function(Cell):string} val @returns {this} */
    setColor(val) { this.color = val; return this; }

    /** @returns {function(number,number,Stat|undefined,Stat|undefined,number):number} */
    getLength() { return this.length; }
    /** @param {function(number,number,Stat|undefined,Stat|undefined,number):number} val @returns {this} */
    setLength(val) { this.length = val; return this; }

    /** @returns {function(number):number} */
    getMargin() { return this.margin; }
    /** @param {function(number):number} val @returns {this} */
    sethMargin(val) { this.margin = val; return this; }

}
