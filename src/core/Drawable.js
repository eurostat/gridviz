//@ts-check
'use strict'

/**
 * This is an abstract class used to group elements shared between Layer and Style classes.
 *
 * @abstract
 * @module core
 * @author Joseph Davies, Julien Gaffuri
 */
export class Drawable {
    /**
     * @param {object} opts
     */
    constructor(opts) {
        opts = opts || {}

        /** A function specifying if the element should be visible or not.
         * The function parameter is the zoom level.
         * @type {function(number):boolean} */
        this.visible = opts.visible

        /** A function returning the alpha (transparency/opacity), between 0.0 (fully transparent) and 1.0 (fully opaque).
         *  The function parameter is the zoom level.
         * (see CanvasRenderingContext2D: globalAlpha property)
         * @type {(function(number):number)|undefined} */
        this.alpha = opts.alpha

        /** A function returning the blend operation.
         * The function parameter is the zoom level.
         * (see CanvasRenderingContext2D: globalCompositeOperation property)
         * @type {function(number):GlobalCompositeOperation} */
        this.blendOperation = opts.blendOperation //|| ((z) => 'source-over')

        /** @type {(function(number):string)|undefined} */
        this.filterColor = opts.filterColor // (z) => "#eee7"
        /** @type {(function(number):GlobalCompositeOperation|"none")|undefined} */
        this.filterBlendOperation = opts.filterBlendOperation // (z) => "multiply"
    }

    /**
     * Draw filter.
     *
     * @param {import("./GeoCanvas.js").GeoCanvas} geoCanvas The canvas where to draw the layer.
     * @returns {void}
     * @abstract
     */
    drawFilter(geoCanvas) {
        //no filter: return
        if (!this.filterColor) return

        //get filter
        const fc = this.filterColor(geoCanvas.view.z)

        //no filter: return
        if (!fc || fc == 'none') return

        //draw filter

        //set color
        geoCanvas.offscreenCtx.fillStyle = fc

        //save blend mode and set new, if any
        let bo = undefined, bo2 = undefined
        if (this.filterBlendOperation) {
            bo = geoCanvas.offscreenCtx.globalCompositeOperation
            bo2 = this.filterBlendOperation(geoCanvas.view.z)
        }
        if (bo2 && bo2 != "none") geoCanvas.offscreenCtx.globalCompositeOperation = bo2;

        //draw
        geoCanvas.offscreenCtx.fillRect(0, 0, geoCanvas.w, geoCanvas.h)

        //restore blend mode
        if (bo) geoCanvas.offscreenCtx.globalCompositeOperation = bo;

    }
}
