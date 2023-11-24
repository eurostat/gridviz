//@ts-check
'use strict'

/**
 * This is an abstract class used to group elements shared between Layer and Style classes.
 * 
 * @abstract
 * @author Joseph Davies, Julien Gaffuri
 */
export class Drawable {
    /**
     * @param {object} opts
     */
    constructor(opts) {
        opts = opts || {}

        /** An attribute to specify if the object should be drawn or not
        * @type {boolean} */
        this.visible = opts.visible != false

        /** The minimum : Below this level, the object is not drawn.
         * @type {number} */
        this.minZoom = opts.minZoom || 0

        /** The maximum : Above this level, the object is not drawn.
         * @type {number} */
        this.maxZoom = opts.maxZoom || Infinity

        //ensure acceptable values for the zoom limits.
        if (this.minZoom >= this.maxZoom)
            throw new Error('Unexpected zoom limits for element. Zoom min should be smaller than zoom max.')

        /** A function returning the alpha (transparency/opacity), between 0.0 (fully transparent) and 1.0 (fully opaque).
         *  The function parameter is the zoom level.
         * (see CanvasRenderingContext2D: globalAlpha property)
         * @type {(function(number):number)|undefined} */
        this.alpha = opts.alpha

        /** A function returning the blend operation.
         * The function parameter is the zoom level.
         * (see CanvasRenderingContext2D: globalCompositeOperation property)
         * @type {function(number):GlobalCompositeOperation} */
        this.blendOperation = opts.blendOperation || (z => "source-over")

        /** @type {function(number):string} */
        this.filterColor = opts.filterColor // (z) => "#eee7"
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
