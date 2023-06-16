//@ts-check
'use strict'

/**
 *
 * A map WMS background layer.
 * 
 * @author Julien Gaffuri
 */
export class BackgroundLayerWMS {
    /**
     * @param {object} opts
     */
    constructor(opts) {
        opts = opts || {}

        /** An attribute to specify if a layer should be drawn or not
         * @type {boolean} */
        this.visible = opts.visible == false ? false : true

        /** The minimum zoom factor: Below this level, the layer is not shown.
         * @type {number} */
        this.minZoom = opts.minZoom || 0

        /** The maximum zoom factor: Above this level, the layer is not shown.
         * @type {number} */
        this.maxZoom = opts.maxZoom || Infinity

        //ensure acceptable values for the zoom limits.
        if (this.minZoom >= this.maxZoom)
            throw new Error('Unexpected zoom limits for layer. Zoom min should be smaller than zoom max.')

        /**
         * @type {string} */
        this.url = opts.url

        /** @type {function(number):string} */
        this.filterColor = opts.filterColor
    }

    /**
     * @param {import("./GeoCanvas").GeoCanvas} cg The canvas where to draw the layer.
     * @returns {void}
     */
    draw(cg) {

        const url = []
        url.push(this.url)
        url.push("&width=")
        url.push(cg.w)
        url.push("&height=")
        url.push(cg.h)
        //bbox: xmin ymin xmax ymax
        cg.updateExtentGeo(0)
        url.push("&bbox=")
        url.push(cg.extGeo.xMin)
        url.push(",")
        url.push(cg.extGeo.yMin)
        url.push(",")
        url.push(cg.extGeo.xMax)
        url.push(",")
        url.push(cg.extGeo.yMax)

        const urlS = url.join("")
        console.log(urlS)

    }
}
