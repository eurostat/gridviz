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

        /** The image file URL
         * @type {string} */
        this.url = opts.url

        /** The image left coordinate
         * @type {number} */
        this.xMin = opts.xMin || 0;
        /** The image top coordinate
         *  @type {number} */
        this.yMax = opts.yMax || 0;

        /** The image resolution, in m/pixel
         * @type {number} */
        this.resolution = opts.resolution || 1

        /** The image width, in pixel
         * @type {number} */
        this.widthPix = opts.widthPix || 200
        /** The image height, in pixel
         * @type {number} */
        this.heightPix = opts.heightPix || 200

        /** The image object
         * @type {HTMLImageElement|undefined} */
        this.img = undefined;
    }

    /**
     * @param {import("../core/GeoCanvas.js").GeoCanvas} geoCanvas The canvas where to draw the layer.
     * @returns {void}
     */
    draw(geoCanvas) {

        //update map extent
        //geoCanvas.updateExtentGeo(0)

        if (this.img) {
            //the image was already downloaded: draw it

            //compute screen coordinates
            const x = geoCanvas.geoToPixX(this.xMin)
            const y = geoCanvas.geoToPixY(this.yMax)
            const r = this.resolution / geoCanvas.getView().z

            //draw image
            geoCanvas.initCanvasTransform()
            geoCanvas.ctx.drawImage(this.img, x, y, r * this.widthPix, r * this.heightPix)

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
