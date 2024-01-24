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


        for (let cell of cells) {

            //get cell image code
            const code = this.imageCode(cell, resolution, z, viewScale)

            //get image
            const image = this.images[code]
            if (!image) continue

            console.log(image)

            const size = 100 //TODO fix that
            try {
                geoCanvas.initCanvasTransform()
                geoCanvas.ctx.drawImage(image, geoCanvas.geoToPixX(cell.x), geoCanvas.geoToPixY(cell.y), size, size)
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
