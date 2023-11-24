//@ts-check
'use strict'

/**
 * @abstract
 * @author Joseph Davies, Julien Gaffuri
 */
export class Layer {
    /**
     * @param {object} opts
     */
    constructor(opts) {
        opts = opts || {}

        /** An attribute to specify if a layer should be drawn or not
        * @type {boolean} */
        this.visible = opts.visible != false

        /** The minimum : Below this level, the layer is not shown.
         * @type {number} */
        this.minZoom = opts.minZoom || 0

        /** The maximum : Above this level, the layer is not shown.
         * @type {number} */
        this.maxZoom = opts.maxZoom || Infinity

        //ensure acceptable values for the zoom limits.
        if (this.minZoom >= this.maxZoom)
            throw new Error('Unexpected zoom limits for layer. Zoom min should be smaller than zoom max.')

        /** A function returning the alpha (transparency/opacity), between 0.0 (fully transparent) and 1.0 (fully opaque).
         *  The function parameter is the .
         * (see CanvasRenderingContext2D: globalAlpha property)
         * @type {function(number):number|undefined} */
        this.alpha = opts.alpha

        /** A function returning the blend operation. The function parameter is the .
         * (see CanvasRenderingContext2D: globalCompositeOperation property)
         * @type {GlobalCompositeOperation} */
        this.blendOperation = opts.blendOperation || (z => "source-over")

        /** @type {function(number):string} */
        this.filterColor = opts.filterColor // (z) => "#eee7"
    }

    /**
     * Draw layer.
     * 
     * @param {import("./GeoCanvas").GeoCanvas} geoCanvas The canvas where to draw the layer.
     * @param {object} legend
     * @returns {void}
     * @abstract
     */
    draw(geoCanvas, legend = undefined) {
        throw new Error('Method draw not implemented.')
    }

    /**
     * Draw layer filter.
     * 
     * @param {import("./GeoCanvas").GeoCanvas} geoCanvas The canvas where to draw the layer.
     * @returns {void}
     * @abstract
     */
    drawFilter(geoCanvas) {
        const fc = this.filterColor(geoCanvas.view.z)
        if (!fc || fc == 'none') return
        geoCanvas.ctx.fillStyle = fc
        geoCanvas.ctx.fillRect(0, 0, geoCanvas.w, geoCanvas.h)
    }

}
