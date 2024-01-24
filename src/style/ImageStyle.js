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

        /** The image will be resized by this factor. 0: no image. 1: full resolution size
         *  @type {function(import('../core/Dataset.js').Cell, number, number, object):number}        */
        this.size = opts.size || (() => 1)
    }

    /**
     * @param {Array.<import("../core/Dataset.js").Cell>} cells
     * @param {import("../core/GeoCanvas.js").GeoCanvas} geoCanvas
     * @param {number} resolution
     * @override
     */
    draw(cells, geoCanvas, resolution) {

        //
        const z = geoCanvas.view.z

        //get view scale
        const viewScale = this.viewScale ? this.viewScale(cells, resolution, z) : undefined

        //draw in screen coordinates
        geoCanvas.initCanvasTransform()

        for (let cell of cells) {

            //get cell image code
            const code = this.imageCode(cell, resolution, z, viewScale)

            //get image
            const image = this.images[code]
            if (!image) continue

            //size and position values
            const size = resolution / z * this.size(cell, resolution, z, viewScale)
            if (!size) continue
            const d = resolution / z * (1 - size) / 2

            try {
                geoCanvas.ctx.drawImage(image, geoCanvas.geoToPixX(cell.x) + d, geoCanvas.geoToPixY(cell.y) + d, size, size)
            } catch (error) {
                console.error(error)
            }

        }


        //update legends
        this.updateLegends({ style: this, resolution: resolution, z: z, viewScale: viewScale })
    }
}

export function loadImage(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = function () { resolve(img); };
        img.onerror = function () { reject(new Error('Error loading image')); };
        img.src = src;
    });
}
