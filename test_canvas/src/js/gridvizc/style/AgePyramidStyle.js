//@ts-check

import { Style, Stat, getStatistics } from "../Style"
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


        /** The column where to get the size values.
         * @private @type {string} */
        this.sizeCol = opts.sizeCol

        /** A function returning the size of a cell.
         * @private @type {function(number,number,Stat|undefined,number):number} */
        this.size = opts.size || ((v) => Math.sqrt(v));
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

        //get size stats
        let stat
        if (this.sizeCol) {
            //compute statistics
            stat = getStatistics(cells, c => c[this.sizeCol], true)
        }

        //draw in geo coordinates
        cg.setCanvasTransform()



        //dimension, in geo
        const hPerCatG = r / nbCat

        for (let cell of cells) {

            //get offset
            const offset = this.offset(cell, r, zf)

            //compute cell position
            const xc = cell.x + offset.dx;
            const yc = cell.y + offset.dy;

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
            let cumul = 0
            for (let [column, color] of Object.entries(this.color)) {

                //set category color
                cg.ctx.fillStyle = color;

                //get category value
                const val = cell[column]

                //compute category length - in geo
                /** @type {number} */
                const wG = sG * val / maxVal

                //draw bar
                cg.ctx.fillRect(
                    xc + (r - wG) / 2,
                    yc + cumul,
                    wG, hPerCatG);

                //next height
                cumul += hPerCatG
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

}
