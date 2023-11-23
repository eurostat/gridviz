//@ts-check
'use strict'

import { Layer } from "../Layer.js"

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
     * @param {import("../GeoCanvas").GeoCanvas} canvas The canvas where to draw the layer.
     * @returns {void}
     */
    draw(canvas) {

        //update map extent
        canvas.updateExtentGeo(0)

        if (!this.hasMoved(canvas.extGeo) && this.img) {
            //the map did not move and the image was already downloaded: draw the image
            canvas.ctx.drawImage(this.img, 0, 0, canvas.w, canvas.h)

        } else {
            //the map moved: retrieve new image

            //
            this.xMin = canvas.extGeo.xMin
            this.xMax = canvas.extGeo.xMax
            this.yMin = canvas.extGeo.yMin
            this.yMax = canvas.extGeo.yMax

            //build WMS URL
            const url = []
            url.push(this.url)
            url.push("&width=")
            url.push(canvas.w)
            url.push("&height=")
            url.push(canvas.h)
            //bbox: xmin ymin xmax ymax
            url.push("&bbox=")
            url.push(canvas.extGeo.xMin)
            url.push(",")
            url.push(canvas.extGeo.yMin)
            url.push(",")
            url.push(canvas.extGeo.xMax)
            url.push(",")
            url.push(canvas.extGeo.yMax)

            const urlS = url.join("")
            //console.log(urlS)

            if (!this.img) {
                this.img = new Image()
                this.img.onload = () => {
                    canvas.redraw()
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
        const zf = canvas.view.z
        if (this.filterColor) {
            const fc = this.filterColor(zf)
            if (fc && fc != 'none') {
                canvas.ctx.fillStyle = fc
                canvas.ctx.fillRect(0, 0, canvas.w, canvas.h)
            }
        }
    }
}
