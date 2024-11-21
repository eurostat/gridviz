//@ts-check
'use strict'

import { Style } from '../core/Style.js'

/**
 * @module style
 * @author Julien Gaffuri
 */
export class StrokeStyle extends Style {
    /** @param {object} opts */
    constructor(opts) {
        super(opts)
        opts = opts || {}

        /** A function returning the color of the cell.
         * @type {function(import('../core/Dataset.js').Cell,number,number,object):string} */
        this.strokeColor = opts.strokeColor || (() => '#666') //(c,r,z,vs) => {}

        /** A function returning the size of a cell in geographical unit.
         * @type {function(import('../core/Dataset.js').Cell,number,number,object):number} */
        this.size = opts.size || ((cell, resolution) => resolution) //(c,r,z,vs) => {}

        /** The stroke line width in geographical unit.
         * @type {function(import('../core/Dataset.js').Cell,number,number,object):number} */
        this.strokeWidth = opts.strokeWidth || ((cell, resolution, z) => z * 1.5) //(c,r,z,vs) => {}

        /** A function returning the shape of a cell.
         * @type {function(import("../core/Dataset.js").Cell,number,number,object):import("../core/Style.js").Shape} */
        this.shape = opts.shape || (() => 'square') //(c,r,z,vs) => {}
    }

    /**
     * Draw cells as squares, with various colors and size.
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

        //get view scale
        const viewScale = this.viewScale ? this.viewScale(cells, resolution, z) : undefined

        const r2 = resolution * 0.5
        for (let c of cells) {
            //color
            const col = this.strokeColor ? this.strokeColor(c, resolution, z, viewScale) : undefined
            if (!col || col === 'none') continue
            geoCanvas.ctx.strokeStyle = col

            //size - in geo unit
            const size = this.size ? this.size(c, resolution, z, viewScale) : resolution

            //width
            const wi = this.strokeWidth ? this.strokeWidth(c, resolution, z, viewScale) : 1 * z
            if (!wi || wi <= 0) continue
            geoCanvas.ctx.lineWidth = wi

            //shape
            const shape = this.shape ? this.shape(c, resolution, z, viewScale) : 'square'
            if (shape === 'none') continue

            //get offset
            const offset = this.offset(c, resolution, z)

            if (shape === 'square') {
                //draw square
                const d = resolution * (1 - size / resolution) * 0.5
                geoCanvas.ctx.beginPath()
                geoCanvas.ctx.rect(c.x + d + offset.dx, c.y + d + offset.dy, size, size)
                geoCanvas.ctx.stroke()
            } else if (shape === 'circle') {
                //draw circle
                geoCanvas.ctx.beginPath()
                geoCanvas.ctx.arc(
                    c.x + r2 + offset.dx,
                    c.y + r2 + offset.dy,
                    size * 0.5,
                    0,
                    2 * Math.PI,
                    false
                )
                geoCanvas.ctx.stroke()
            } else if (shape === 'diamond') {
                const s2 = size * 0.5
                geoCanvas.ctx.beginPath()
                geoCanvas.ctx.moveTo(c.x + r2 - s2, c.y + r2)
                geoCanvas.ctx.lineTo(c.x + r2, c.y + r2 + s2)
                geoCanvas.ctx.lineTo(c.x + r2 + s2, c.y + r2)
                geoCanvas.ctx.lineTo(c.x + r2, c.y + r2 - s2)
                geoCanvas.ctx.lineTo(c.x + r2 - s2, c.y + r2)
                geoCanvas.ctx.stroke()
            } else if (shape === 'donut') {
                console.error('Not implemented')
            } else if (shape === 'triangle_up') {
                const dr2 = (size - resolution) / 2
                geoCanvas.ctx.beginPath()
                geoCanvas.ctx.moveTo(c.x - dr2, c.y - dr2)
                geoCanvas.ctx.lineTo(c.x + r2, c.y + resolution + dr2)
                geoCanvas.ctx.lineTo(c.x + resolution + dr2, c.y - dr2)
                geoCanvas.ctx.closePath()
                geoCanvas.ctx.stroke()
            } else if (shape === 'triangle_down') {
                const dr2 = (size - resolution) / 2
                geoCanvas.ctx.beginPath()
                geoCanvas.ctx.moveTo(c.x - dr2, c.y + resolution + dr2)
                geoCanvas.ctx.lineTo(c.x + r2, c.y - dr2)
                geoCanvas.ctx.lineTo(c.x + resolution + dr2, c.y + resolution + dr2)
                geoCanvas.ctx.closePath()
                geoCanvas.ctx.stroke()
            } else if (shape === 'triangle_left') {
                const dr2 = (size - resolution) / 2
                geoCanvas.ctx.beginPath()
                geoCanvas.ctx.moveTo(c.x + resolution + dr2, c.y + resolution + dr2)
                geoCanvas.ctx.lineTo(c.x - dr2, c.y + r2)
                geoCanvas.ctx.lineTo(c.x + resolution + dr2, c.y - dr2)
                geoCanvas.ctx.closePath()
                geoCanvas.ctx.stroke()
            } else if (shape === 'triangle_right') {
                const dr2 = (size - resolution) / 2
                geoCanvas.ctx.beginPath()
                geoCanvas.ctx.moveTo(c.x - dr2, c.y - dr2)
                geoCanvas.ctx.lineTo(c.x + resolution + dr2, c.y + r2)
                geoCanvas.ctx.lineTo(c.x - dr2, c.y + resolution + dr2)
                geoCanvas.ctx.closePath()
                geoCanvas.ctx.stroke()
            } else {
                throw new Error('Unexpected shape:' + shape)
            }
        }

        //update legends
        this.updateLegends({ style: this, resolution: resolution, z: z, viewScale: viewScale })
    }
}
