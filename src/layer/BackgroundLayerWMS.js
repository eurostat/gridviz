//@ts-check
'use strict'

import { Layer } from "../Layer"

/**
 *
 * A map WMS background layer.
 * 
 * @author Julien Gaffuri
 */
export class BackgroundLayerWMS extends Layer {
    /**
     * @param {object} opts
     */
    constructor(opts) {
        super(opts)
        opts = opts || {}

        /** An attribute to specify if a layer should be drawn or not
         * @type {boolean} */
        this.visible = opts.visible == false ? false : true

        /** The minimum : Below this level, the layer is not shown.
         * @type {number} */
        this.minZoom = opts.minZoom || 0

        /** The maximum : Above this level, the layer is not shown.
         * @type {number} */
        this.maxZoom = opts.maxZoom || Infinity

        //ensure acceptable values for the zoom limits.
        if (this.minZoom >= this.maxZoom)
            throw new Error('Unexpected zoom limits for layer. Zoom min should be smaller than zoom max.')

        /**
         * @type {string} */
        this.url = opts.url

        /** @type {function(number):string} */
        this.filterColor = opts.filterColor // (zf) => "#eee7"

        /** @type {HTMLImageElement|undefined} */
        this.img = undefined;

        /** @type {number|undefined} */
        this.xMin = undefined;
        /** @type {number|undefined} */
        this.xMax = undefined;
        /** @type {number|undefined} */
        this.yMin = undefined;
        /** @type {number|undefined} */
        this.yMax = undefined;
    }

    /** Check if the view has moved and a new image needs to be retrieved.
     * @private */
    hasMoved(extGeo) {
        if ((extGeo.xMin) != this.xMin) return true
        else if ((extGeo.xMax) != this.xMax) return true
        else if ((extGeo.yMin) != this.yMin) return true
        else if ((extGeo.yMax) != this.yMax) return true
        else return false
    }


    /**
     * @param {import("../GeoCanvas").GeoCanvas} cg The canvas where to draw the layer.
     * @returns {void}
     */
    draw(cg) {

        //update map extent
        cg.updateExtentGeo(0)

        if (!this.hasMoved(cg.extGeo) && this.img) {
            //the map did not move and the image was already downloaded: draw the image
            cg.ctx.drawImage(this.img, 0, 0, cg.w, cg.h)

        } else {
            //the map moved: retrieve new image

            //
            this.xMin = cg.extGeo.xMin
            this.xMax = cg.extGeo.xMax
            this.yMin = cg.extGeo.yMin
            this.yMax = cg.extGeo.yMax

            //build WMS URL
            const url = []
            url.push(this.url)
            url.push("&width=")
            url.push(cg.w)
            url.push("&height=")
            url.push(cg.h)
            //bbox: xmin ymin xmax ymax
            url.push("&bbox=")
            url.push(cg.extGeo.xMin)
            url.push(",")
            url.push(cg.extGeo.yMin)
            url.push(",")
            url.push(cg.extGeo.xMax)
            url.push(",")
            url.push(cg.extGeo.yMax)

            const urlS = url.join("")
            //console.log(urlS)

            if (!this.img) {
                this.img = new Image()
                this.img.onload = () => {
                    cg.redraw()
                }
                this.img.onerror = () => {
                    //case when no image
                    console.warn("Could not retrieve WMS background image from", urlS)
                }
            }

            //set URL to launch the download
            this.img.src = urlS
        }

        //apply filter
        const zf = cg.getZf()
        if (this.filterColor) {
            const fc = this.filterColor(zf)
            if (fc && fc != 'none') {
                cg.ctx.fillStyle = fc
                cg.ctx.fillRect(0, 0, cg.w, cg.h)
            }
        }
    }
}
