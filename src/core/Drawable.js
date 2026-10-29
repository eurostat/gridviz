//@ts-check
'use strict'

/**
 * Tells if an element (a layer or a style) is visible at a zoom level: its visible property is a function of the zoom
 * level, or a boolean; it is visible when not specified. Works for any object, whether it is a Drawable or not.
 *
 * @param {{visible?: (function(number):boolean)|boolean}} element
 * @param {number} z The zoom level.
 * @returns {boolean}
 */
export function isVisibleAt(element, z) {
    const v = element.visible
    return typeof v === 'function' ? !!v(z) : v !== false
}

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

        /** Specifies if the element should be visible or not: a function of the zoom level, or a boolean
         * (to show or hide the element, then call map.redraw()). Visible when not specified.
         * @type {(function(number):boolean)|boolean|undefined} */
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
     * Tells if the element is visible at a zoom level.
     * @param {number} z The zoom level.
     * @returns {boolean}
     */
    isVisible(z) {
        return isVisibleAt(this, z)
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
