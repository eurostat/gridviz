//@ts-check
'use strict'

import { Style } from '../core/Style.js'

/**
 * @module style
 * @author Julien Gaffuri
 */
export class ImageStyle extends Style {
    /** @param {object} opts */
    constructor(opts) {
        super(opts)
        opts = opts || {}

        /** A function returning the image URL of a cell.
         * @type {function(import('../core/Dataset.js').Cell, number, number, object):string} */
        this.image = opts.image || (() => '') //(c,r,z,vs) => {}

        /** The image size in ground meters
         *  @type {function(import('../core/Dataset.js').Cell, number, number, object):number}        */
        this.size = opts.size || ((cell, resolution) => resolution)

        /** Dictionnary of preloaded images. url -> image
         * @private
         * @type {object} */
        this.cache = {}
    }

    /**
     * @param {Array.<import("../core/Dataset.js").Cell>} cells
     * @param {import("../core/GeoCanvas.js").GeoCanvas} geoCanvas
     * @param {number} resolution
     * @override
     */
    async draw(cells, geoCanvas, resolution) {
        //
        const z = geoCanvas.view.z,
            resolutionPix = resolution / z

        //get view scale
        const viewScale = this.viewScale ? this.viewScale(cells, resolution, z) : undefined

        //draw in screen coordinates
        geoCanvas.initCanvasTransform()

        //
        for (let cell of cells) {
            //get cell image url
            const url = this.image(cell, resolution, z, viewScale)
            if (!url) continue

            //size and position values
            let sizePix = this.size(cell, resolution, z, viewScale) / z
            if (!sizePix) continue

            //get image from cache
            const image = this.cache[url]

            //loading, keep waiting
            if (image == 'loading') return
            //no image: load it
            else if (!image) {
                //tag as loading
                this.cache[url] = 'loading'

                //define image
                const img = new Image()
                img.onload = () => {
                    //store image data in cache and redraw
                    this.cache[url] = img
                    geoCanvas.redraw()
                }
                img.onerror = () => {
                    //case when no image
                    console.warn('Could not retrieve image from', url)
                }
                //set URL to launch the download
                img.src = url
            } else {
                //draw image
                const d = (resolutionPix - sizePix) / 2
                try {
                    geoCanvas.offscreenCtx.drawImage(
                        image,
                        geoCanvas.geoToPixX(cell.x) + d,
                        geoCanvas.geoToPixY(cell.y) + d - resolutionPix,
                        sizePix,
                        sizePix
                    )
                } catch (error) {
                    console.error(error)
                }
            }
        }

        //update legends
        this.updateLegends({ style: this, resolution: resolution, z: z, viewScale: viewScale })
    }
}
