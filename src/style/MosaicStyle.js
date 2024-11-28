//@ts-check
'use strict'

import { Style } from '../core/Style.js'

/**
 * @module style
 * @author Julien Gaffuri
 */
export class MosaicStyle extends Style {
    /** @param {object} opts */
    constructor(opts) {
        super(opts)
        opts = opts || {}

        /** A function returning the color of the cell.
         * @type {function(import('../core/Dataset.js').Cell, number, number, object):string} */
        this.color = opts.color || (() => '#EA6BAC') //(c,r,z,vs) => {}

        /** The mosaic factor, within [0,0.5]. Set to 0 for no mosaic effect. Set to 0.5 for strong mosaic effect.
         * @type {number} */
        this.mosaicFactor = opts.mosaicFactor || 0.15

        /** The mosaic shadow factor, within [0,0.5]. Set to 0 for no mosaic shadow. Set to 0.5 for strong mosaic shadow.
         * @type {number} */
        this.shadowFactor = opts.shadowFactor || 0.2

        /** The mosaic shadow color.
         * @type {string} */
        this.shadowColor = opts.shadowColor || '#555'
    }

    /**
     *
     * @param {Array.<import("../core/Dataset").Cell>} cells
     * @param {import("../core/GeoCanvas").GeoCanvas} geoCanvas
     * @param {number} resolution
     */
    draw(cells, geoCanvas, resolution) {
        //filter
        if (this.filter) cells = cells.filter(this.filter)

        //
        const z = geoCanvas.view.z
        const ctx = geoCanvas.offscreenCtx

        //get view scale
        const viewScale = this.viewScale ? this.viewScale(cells, resolution, z) : undefined

        //set stroke style, for shadow
        ctx.strokeStyle = this.shadowColor
        ctx.lineWidth = this.shadowFactor * resolution
        ctx.lineJoin = 'round'
        ctx.lineCap = 'butt'

        //function to compute position mosaic effect
        const d = resolution * this.mosaicFactor
        const mosaic = () => {
            return { x: Math.random() * d, y: Math.random() * d }
        }

        for (let cell of cells) {
            //set fill color
            const col = this.color ? this.color(cell, resolution, z, viewScale) : undefined
            if (!col || col === 'none') continue
            ctx.fillStyle = col

            //get offset
            const offset = this.offset(cell, resolution, z)

            //compute position mosaic effect
            const ll = mosaic(),
                ul = mosaic(),
                lr = mosaic(),
                ur = mosaic()

            //stroke
            if (this.shadowFactor > 0) {
                ctx.beginPath()
                ctx.moveTo(cell.x + offset.dx + ll.x, cell.y + offset.dy + ll.y)
                ctx.lineTo(cell.x + offset.dx + resolution - lr.x, cell.y + offset.dy + lr.y)
                ctx.lineTo(cell.x + offset.dx + resolution - ur.x, cell.y + offset.dy + resolution - ur.y)
                ctx.stroke()
            }

            //fill

            ctx.beginPath()
            ctx.moveTo(cell.x + offset.dx + ll.x, cell.y + offset.dy + ll.y)
            ctx.lineTo(cell.x + offset.dx + resolution - lr.x, cell.y + offset.dy + lr.y)
            ctx.lineTo(cell.x + offset.dx + resolution - ur.x, cell.y + offset.dy + resolution - ur.y)
            ctx.lineTo(cell.x + offset.dx + ul.x, cell.y + offset.dy + resolution - ul.y)
            ctx.fill()
        }

        //update legends
        this.updateLegends({ style: this, resolution: resolution, z: z, viewScale: viewScale })
    }
}
