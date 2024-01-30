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

        /** A function returning the image code of a cell.
         * @type {function(import('../core/Dataset.js').Cell, number, number, object):string} */
        this.imageCode = opts.imageCode || (() => '') //(c,r,z,vs) => {}

        /** The dictionnary code -> image
         *  @type {object}        */
        this.images = opts.images || {}

        /** The image size in ground meters
         *  @type {function(import('../core/Dataset.js').Cell, number, number, object):number}        */
        this.size = opts.size || ((cell, resolution) => resolution)
    }

    /**
     * @param {Array.<import("../core/Dataset.js").Cell>} cells
     * @param {import("../core/GeoCanvas.js").GeoCanvas} geoCanvas
     * @param {number} resolution
     * @override
     */
    draw(cells, geoCanvas, resolution) {

        //
        const z = geoCanvas.view.z,
            resolutionPix = resolution / z

        //get view scale
        const viewScale = this.viewScale ? this.viewScale(cells, resolution, z) : undefined

        //draw in screen coordinates
        geoCanvas.initCanvasTransform()

        //
        for (let cell of cells) {

            //get cell image code
            const code = this.imageCode(cell, resolution, z, viewScale)

            //get image
            const image = this.images[code]
            if (!image) continue

            //size and position values
            let sizePix = this.size(cell, resolution, z, viewScale) / z
            if (!sizePix) continue
            const d = (resolutionPix - sizePix) / 2

            try {
                geoCanvas.ctx.drawImage(image, geoCanvas.geoToPixX(cell.x) + d, geoCanvas.geoToPixY(cell.y) + d -resolutionPix, sizePix, sizePix)

                /*/red color filter
                geoCanvas.ctx.globalCompositeOperation = 'source-in';
                geoCanvas.ctx.fillStyle = 'red';
                geoCanvas.ctx.fillRect(geoCanvas.geoToPixX(cell.x) + d, geoCanvas.geoToPixY(cell.y) + d, sizePix, sizePix);
                geoCanvas.ctx.globalCompositeOperation = 'source-over';*/
            } catch (error) {
                console.error(error)
            }

        }


        //update legends
        this.updateLegends({ style: this, resolution: resolution, z: z, viewScale: viewScale })
    }
}
