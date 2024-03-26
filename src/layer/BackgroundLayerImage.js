//@ts-check
'use strict'

import { Layer } from '../core/Layer.js'

/**
 *
 * A map background layer composed of a single image file, geolocated.
 * 
 * @module layer
 * @author Julien Gaffuri
 */
export class BackgroundLayerImage extends Layer {
    /**
     * @param {object} opts
     */
    constructor(opts) {
        super(opts)
        opts = opts || {}

        /**
         * @type {string} */
        this.url = opts.url

        /** @type {HTMLImageElement|undefined} */
        this.img = undefined;

        /** @type {number} */
        this.xMin = opts.xMin || 0;
        /** @type {number} */
        const xMax = opts.xMax || 200;
        /** @type {number} */
        this.yMin = opts.yMin || 0;
        /** @type {number} */
        const yMax = opts.yMax || 200;

        //compute image width and height
        this.width = xMax - this.xMin
        this.height = yMax - this.yMin
    }

    /**
     * @param {import("../core/GeoCanvas.js").GeoCanvas} geoCanvas The canvas where to draw the layer.
     * @returns {void}
     */
    draw(geoCanvas) {

        //update map extent
        geoCanvas.updateExtentGeo(0)

        if (this.img) {
            //the image was already downloaded: draw it
            geoCanvas.setCanvasTransform()
            geoCanvas.ctx.drawImage(this.img, this.xMin, this.yMin, this.width, this.height)

        } else {
            //retrieve image

            if (!this.img) {
                this.img = new Image()
                this.img.onload = () => {
                    geoCanvas.redraw()
                }
                this.img.onerror = () => {
                    //case when no image
                    console.warn("Could not retrieve background image from", this.url)
                }
            }

            //set URL to launch the download
            this.img.src = this.url
        }

    }
}
