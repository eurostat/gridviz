//@ts-check
'use strict'

/**
 * Statistics of a set of values
 * @typedef {{min:number,max:number}} Stat */

/** @typedef {"square"|"circle"|"diamond"|"donut"|"none"} Shape */
/**
 * viewScale type
 * Returns an object from a list of cells, 
 * @typedef {function(Array.<import('./Dataset.js').Cell>,number, number):object} ViewScale */

/**
 * A style, to show a grid dataset.
 *
 * @author Joseph Davies, Julien Gaffuri
 */
export class Style {
    /**
     * @abstract
     * @param {{filter?:function(import('./Dataset').Cell):boolean,offset?:function(import('./Dataset').Cell,number,number):{dx:number,dy:number},visible?:boolean,alpha?:function(number):number,blendOperation?:function(number):GlobalCompositeOperation,minZoom?:number,maxZoom?:number,drawFun?:function,viewScale?:ViewScale}} opts
     */
    constructor(opts) {
        opts = opts || {}

        /** An attribute to specify if a style should be drawn or not
         * @type {boolean} */
        this.visible = opts.visible === false ? false : true

        /** The minimum : Below this level, the layer is not shown.
         * @type {number}
         * */
        this.minZoom = opts.minZoom || 0

        /** The maximum : Above this level, the layer is not shown.
         * @type {number}
         * */
        this.maxZoom = opts.maxZoom || Infinity

        //ensure acceptable values for the zoom limits.
        if (this.minZoom >= this.maxZoom)
            throw new Error('Unexpected zoom limits for layer. Zoom min should be smaller than zoom max.')

        /** A function returning the alpha (transparency/opacity), between 0.0 (fully transparent) and 1.0 (fully opaque).
         *  The function parameter is the .
         * (see CanvasRenderingContext2D: globalAlpha property)
         * @type {(function(number):number)|undefined} */
        this.alpha = opts.alpha

        /** A function returning the blend operation. The function parameter is the .
         * (see CanvasRenderingContext2D: globalCompositeOperation property)
         * @type {function(number):GlobalCompositeOperation} */
        this.blendOperation = opts.blendOperation || (z => "source-over")


            /**
        * @type {ViewScale|undefined} */
        this.viewScale = opts.viewScale

        /** A filter function to apply to the cell list, to filter out some cells not to be drawn (such as for example the cells with value=0).
        * @protected
        * @type {function(import('./Dataset').Cell):boolean} */
        this.filter = opts.filter || (() => true)

        /** An offset. This is to alter the position of all symbols in a given direction. In geographical unit.
         * @protected
         * @type {function(import('./Dataset').Cell,number,number):{dx:number,dy:number}} */
        this.offset = opts.offset || ((c, r, z) => ({ dx: 0, dy: 0 }))

        /** A draw function for the style.
         * @type {function|undefined} */
        this.drawFun = opts.drawFun

        /**
         * @public
         * @type {Array.<import("./Legend").Legend>} */
        this.legends = []
    }

    /**
     * Draw cells.
     *
     * @param {Array.<import('./Dataset').Cell>} cells The cells to draw.
     * @param {import("./GeoCanvas").GeoCanvas} geoCanvas The canvas where to draw them.
     * @param {number} resolution Their resolution (in geographic unit)
     * @abstract
     */
    draw(cells, geoCanvas, resolution) {
        if (this.drawFun) this.drawFun(cells, geoCanvas, resolution)
        else throw new Error('Method draw not implemented.')
    }

    //getters and setters

    /** @returns {function(import('./Dataset').Cell,number,number):{dx:number,dy:number}} */
    getOffset() {
        return this.offset
    }
    /** @param {function(import('./Dataset').Cell,number,number):{dx:number,dy:number}} val @returns {this} */
    setOffset(val) {
        this.offset = val
        return this
    }

    /** Hide all legend elements of the style, if any
     * @param {object} opts
     * @returns {this} */
    updateLegends(opts) {
        for (const lg of this.legends) lg.update(opts)
        return this
    }

}
