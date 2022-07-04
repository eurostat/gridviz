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

        //dimension, in geo
        const mG = this.margin(r, zf)
        const sideMaxG = r - 2 * mG
        const hPerCatG = sideMaxG / nbCat

        //get category keys
        const catKeys = Object.keys(this.color)

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

            //
            let hCumul = mG

            //compute cell position
            const xc = cell.x + offset.dx;
            const yc = cell.y + offset.dy;


            //size factor
            /** @type {function(number,number,Stat|undefined,number):number} */
            let sF_ = this.sizeFactor || (() => 1);
            //size - in geo
            /** @type {number} */
            const sF = sF_(cell[this.sizeFactorCol], r, stat, zf)

            //get cell category max value
            let maxVal = -Infinity
            for (let key of catKeys) {
                const v = +cell[key];
                if (v > maxVal) maxVal = v
            }

            //draw decomposition symbols
            for (let [column, color] of Object.entries(this.color)) {

                //set category color
                cg.ctx.fillStyle = color;

                //get category value
                const val = cell[column]

                //compute category length - in geo
                /** @type {number} */
                const wG = sF * sideMaxG * val / maxVal

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

}
