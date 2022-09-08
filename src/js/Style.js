//@ts-check
import { Cell } from "./Dataset";
import { GeoCanvas } from './GeoCanvas';
import { Legend } from "./Legend";

/**
 * Statistics of a set of values
 * @typedef {{min:number,max:number}} Stat */

/** @typedef {"square"|"circle"|"donut"|"none"} Shape */

/**
 * A style, to show a grid dataset.
 * 
 * @abstract
 * 
 * @author Joseph Davies, Julien Gaffuri
 */
export class Style {

    /**
     * @abstract
     * @param {{offset?:function(Cell,number,number):{{dx:number,dy:number}},minZoom?:number,maxZoom?:number}} opts 
     *      minZoom: The minimum zoom level when to show the layer. maxZoom: The maximum zoom level when to show the layer
     */
    constructor(opts) {
        opts = opts || {};

        /** An offset. This is to alter the position of all symbols in a given direction. In geographical unit.
         * @protected
         * @type {function(Cell,number,number):{dx:number,dy:number}} */
        this.offset = opts.offset || ((c, r, zf) => ({ dx: 0, dy: 0 }));


        /** The minimum zoom factor: Below this level, the layer is not shown.
         * @type {number}
         * */
        this.minZoom = opts.minZoom || 0;

        /** The maximum zoom factor: Above this level, the layer is not shown.
         * @type {number}
         * */
        this.maxZoom = opts.maxZoom || Infinity;

        //ensure acceptable values for the zoom limits.
        if (this.minZoom >= this.maxZoom)
            throw new Error("Unexpected zoom limits for layer. Zoom min should be smaller than zoom max.")


        /** @public @type {Array.<Legend>} */
        this.legends = []
    }


    /**
     * Draw cells.
     * 
     * @param {Array.<Cell>} cells The cells to draw.
     * @param {number} resolution Their resolution (in geographic unit)
     * @param {GeoCanvas} cg The canvas where to draw them.
     * @abstract
     */
    draw(cells, resolution, cg) {
        throw new Error('Method draw not implemented.');
    }



    //getters and setters

    /** @returns {function(Cell,number,number):{dx:number,dy:number}} */
    getOffset() { return this.offset; }
    /** @param {function(Cell,number,number):{dx:number,dy:number}} val @returns {this} */
    setOffset(val) { this.offset = val; return this; }

    /** Hide all legend elements of the style, if any
     * @param {object} opts
    * @returns {this} */
    updateLegends(opts) {
        for (const lg of this.legends)
            lg.update(opts)
        return this
    }

}



/**
 * Compute some statistics on a value of some cells.
 * This is used to define how to draw specifically the cells within the view.
 * TODO: compute median ?
 * 
 * @param {Array.<Cell>} cells 
 * @param {function(Cell):number} valFun 
 * @param {boolean} ignoreZeros 
 * @returns {Stat | undefined}
 */
export const getStatistics = function (cells, valFun, ignoreZeros) {
    if (!cells || cells.length == 0) return undefined
    let min = Infinity
    let max = -Infinity
    //let sum = 0
    //let nb = 0
    for (const cell of cells) {
        const v = +valFun(cell);
        if (ignoreZeros && !v) continue
        if (v < min) min = v
        if (v > max) max = v
        //sum += v
        //nb++
    }
    return { min: min, max: max, }
}
