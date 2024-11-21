//@ts-check
'use strict'

import { Style } from '../core/Style.js'

/**
 * A very generic style that shows grid cells with specific color, size and shape.
 * It can be used to show variables as cell colors, cell size, cell shape, or any combination of the three visual variables.
 *
 * @module style
 * @author Joseph Davies, Julien Gaffuri
 */
export class ShapeColorSizeStyle extends Style {
    /** @param {object} opts */
    constructor(opts) {
        super(opts)
        opts = opts || {}
        this.opts = opts

        /** A function returning the color of the cell.
         * @type {function(import('../core/Dataset.js').Cell, number, number, object):string} */
        this.color = opts.color || (() => '#EA6BAC') //(c,r,z,vs) => {}

        /** A function returning the size of a cell in geographical unit.
         * @type {function(import('../core/Dataset.js').Cell, number, number, object):number} */
        this.size = opts.size || ((cell, resolution) => resolution) //(c,r,z,vs) => {}

        /** A function returning the shape of a cell.
         * @type {function(import("../core/Dataset.js").Cell,number, number,object):import("../core/Style.js").Shape} */
        this.shape = opts.shape || (() => 'square') //(c,r,z,vs) => {}
    }

    /**
     * Draw cells as squares, with various colors and sizes.
     *
     * @param {Array.<import("../core/Dataset.js").Cell>} cells
     * @param {import("../core/GeoCanvas.js").GeoCanvas} geoCanvas
     * @param {number} resolution
     * @override
     */
    draw(cells, geoCanvas, resolution) {
        // Filter cells early
        if (this.filter) cells = cells.filter(this.filter)

        // Precompute constants
        const r2 = resolution * 0.5
        const z = geoCanvas.view.z

        // Determine view scale if applicable
        const viewScale = this.viewScale ? this.viewScale(cells, resolution, z) : undefined

        const ctx = geoCanvas.ctx
        // Get the offscreen context
        const offscreenCtx = geoCanvas.offscreenCtx

        // Loop through cells
        for (const c of cells) {
            // Determine color
            const col = this.color ? this.color(c, resolution, z, viewScale) : 'black'
            if (!col || col === 'none') continue

            // Determine size
            const size = this.size ? this.size(c, resolution, z, viewScale) : resolution
            if (!size) continue

            // Determine shape
            const shape = this.shape ? this.shape(c, resolution, z, viewScale) : 'square'
            if (shape === 'none') continue

            // Get offsets
            const { dx, dy } = this.offset(c, resolution, z)

            // Apply color
            offscreenCtx.fillStyle = col

            // Draw the appropriate shape
            const x = c.x + dx
            const y = c.y + dy

            switch (shape) {
                case 'square': {
                    const d = resolution * (1 - size / resolution) * 0.5
                    offscreenCtx.fillRect(x + d, y + d, size, size)
                    break
                }
                case 'circle': {
                    offscreenCtx.beginPath()
                    offscreenCtx.arc(x + r2, y + r2, size * 0.5, 0, 2 * Math.PI)
                    offscreenCtx.fill()
                    break
                }
                case 'donut': {
                    const xc = x + r2,
                        yc = y + r2
                    offscreenCtx.beginPath()
                    offscreenCtx.arc(xc, yc, r2, 0, 2 * Math.PI)
                    offscreenCtx.arc(xc, yc, (1 - size / resolution) * r2, 0, 2 * Math.PI, true)
                    offscreenCtx.closePath()
                    offscreenCtx.fill()
                    break
                }
                case 'diamond': {
                    const s2 = size * 0.5
                    offscreenCtx.beginPath()
                    offscreenCtx.moveTo(x + r2 - s2, y + r2)
                    offscreenCtx.lineTo(x + r2, y + r2 + s2)
                    offscreenCtx.lineTo(x + r2 + s2, y + r2)
                    offscreenCtx.lineTo(x + r2, y + r2 - s2)
                    offscreenCtx.fill()
                    break
                }
                case 'triangle_up': {
                    const dr2 = (size - resolution) / 2
                    offscreenCtx.beginPath()
                    offscreenCtx.moveTo(x - dr2, y - dr2)
                    offscreenCtx.lineTo(x + r2, y + resolution + dr2)
                    offscreenCtx.lineTo(x + resolution + dr2, y - dr2)
                    offscreenCtx.fill()
                    break
                }
                case 'triangle_down': {
                    const dr2 = (size - resolution) / 2
                    offscreenCtx.beginPath()
                    offscreenCtx.moveTo(x - dr2, y + resolution + dr2)
                    offscreenCtx.lineTo(x + r2, y - dr2)
                    offscreenCtx.lineTo(x + resolution + dr2, y + resolution + dr2)
                    offscreenCtx.fill()
                    break
                }
                case 'triangle_left': {
                    const dr2 = (size - resolution) / 2
                    offscreenCtx.beginPath()
                    offscreenCtx.moveTo(x + resolution + dr2, y + resolution + dr2)
                    offscreenCtx.lineTo(x - dr2, y + r2)
                    offscreenCtx.lineTo(x + resolution + dr2, y - dr2)
                    offscreenCtx.fill()
                    break
                }
                case 'triangle_right': {
                    const dr2 = (size - resolution) / 2
                    offscreenCtx.beginPath()
                    offscreenCtx.moveTo(x - dr2, y - dr2)
                    offscreenCtx.lineTo(x + resolution + dr2, y + r2)
                    offscreenCtx.lineTo(x - dr2, y + resolution + dr2)
                    offscreenCtx.fill()
                    break
                }
                default:
                    console.error('Unexpected shape:', shape)
                    break
            }
        }

        // Update legends
        this.updateLegends({ viewScale, resolution, z, cells })
    }
}
