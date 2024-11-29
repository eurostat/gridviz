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
        /** @type {(function(import('../core/Dataset.js').Cell, number, number, object):string) | string} */
        this.color = opts.color || '#EA6BAC'

        /** @type {(function(import('../core/Dataset.js').Cell, number, number, object):number) | number} */
        this.size = opts.size || ((cell, resolution) => resolution)

        /** @type {(function(import("../core/Dataset.js").Cell,number, number,object):import("../core/Style.js").Shape) | string} */
        this.shape = opts.shape || 'square'
    }

    /**
     * Draw cells as squares, with various colors and sizes.
     *
     * @param {Array.<import("../core/Dataset.js").Cell>} cells - The grid cells to draw.
     * @param {import("../core/GeoCanvas.js").GeoCanvas} geoCanvas - The canvas to draw on.
     * @param {number} resolution - Resolution of the grid.
     * @override
     */
    draw(cells, geoCanvas, resolution) {
        //filter
        if (this.filter) cells = cells.filter(this.filter)

        //zoom
        const z = geoCanvas.view.z

        //get view scale
        const viewScale = this.viewScale ? this.viewScale(cells, resolution, z) : undefined

        const r2 = resolution * 0.5

        // Precompute if color, size, and shape are functions, for efficiency
        const isColorFunction = typeof this.color === 'function'
        const isSizeFunction = typeof this.size === 'function'
        const isShapeFunction = typeof this.shape === 'function'

        const defaultColor = this.color || 'black'
        const defaultSize = this.size || resolution
        const defaultShape = this.shape || 'square'

        // Optimized
        const colorFunction = isColorFunction ? this.color : null
        const sizeFunction = isSizeFunction ? this.size : null
        const shapeFunction = isShapeFunction ? this.shape : null

        for (let c of cells) {
            // Determine color
            //@ts-ignore
            const col = colorFunction ? colorFunction(c, resolution, z, viewScale) : defaultColor
            if (!col || col === 'none') continue

            // Determine size
            //@ts-ignore
            const size = sizeFunction ? sizeFunction(c, resolution, z, viewScale) : defaultSize
            if (!size) continue

            // Determine shape
            //@ts-ignore
            const shape = shapeFunction ? shapeFunction(c, resolution, z, viewScale) : defaultShape
            if (shape === 'none') continue

            //get offset
            const offset = this.offset(c, resolution, z)

            //get context
            const ctx = geoCanvas.offscreenCtx
            ctx.fillStyle = col
            if (shape === 'square') {
                //draw square
                const d = resolution * (1 - size / resolution) * 0.5
                ctx.fillRect(c.x + d + offset.dx, c.y + d + offset.dy, size, size)
            } else if (shape === 'circle') {
                //draw circle
                ctx.beginPath()
                ctx.arc(c.x + r2 + offset.dx, c.y + r2 + offset.dy, size * 0.5, 0, 2 * Math.PI, false)
                ctx.fill()
            } else if (shape === 'donut') {
                //draw donut
                const xc = c.x + r2 + offset.dx,
                    yc = c.y + r2 + offset.dy
                ctx.beginPath()
                ctx.moveTo(xc, yc)
                ctx.arc(xc, yc, r2, 0, 2 * Math.PI)
                ctx.arc(xc, yc, (1 - size / resolution) * r2, 0, 2 * Math.PI, true)
                ctx.closePath()
                ctx.fill()
            } else if (shape === 'diamond') {
                const s2 = size * 0.5
                ctx.beginPath()
                ctx.moveTo(c.x + r2 - s2, c.y + r2)
                ctx.lineTo(c.x + r2, c.y + r2 + s2)
                ctx.lineTo(c.x + r2 + s2, c.y + r2)
                ctx.lineTo(c.x + r2, c.y + r2 - s2)
                ctx.fill()
            } else if (shape === 'triangle_up') {
                const dr2 = (size - resolution) / 2
                ctx.beginPath()
                ctx.moveTo(c.x - dr2, c.y - dr2)
                ctx.lineTo(c.x + r2, c.y + resolution + dr2)
                ctx.lineTo(c.x + resolution + dr2, c.y - dr2)
                ctx.fill()
            } else if (shape === 'triangle_down') {
                const dr2 = (size - resolution) / 2
                ctx.beginPath()
                ctx.moveTo(c.x - dr2, c.y + resolution + dr2)
                ctx.lineTo(c.x + r2, c.y - dr2)
                ctx.lineTo(c.x + resolution + dr2, c.y + resolution + dr2)
                ctx.fill()
            } else if (shape === 'triangle_left') {
                const dr2 = (size - resolution) / 2
                ctx.beginPath()
                ctx.moveTo(c.x + resolution + dr2, c.y + resolution + dr2)
                ctx.lineTo(c.x - dr2, c.y + r2)
                ctx.lineTo(c.x + resolution + dr2, c.y - dr2)
                ctx.fill()
            } else if (shape === 'triangle_right') {
                const dr2 = (size - resolution) / 2
                ctx.beginPath()
                ctx.moveTo(c.x - dr2, c.y - dr2)
                ctx.lineTo(c.x + resolution + dr2, c.y + r2)
                ctx.lineTo(c.x - dr2, c.y + resolution + dr2)
                ctx.fill()
            } else {
                throw new Error('Unexpected shape:' + shape)
            }
        }

        //update legends
        this.updateLegends({ viewScale: viewScale, resolution: resolution, z: z, cells: cells })
    }
}
