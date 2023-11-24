//@ts-check
'use strict'

import { Style } from '../Style.js'

/**
 *
 * @author Julien Gaffuri
 */
export class StrokeStyle extends Style {
    /** @param {object} opts */
    constructor(opts) {
        super(opts)
        opts = opts || {}

        /** The name of the column/attribute of the tabular data where to retrieve the variable for color.
         * @type {string} */
        this.strokeColorCol = opts.strokeColorCol

        /** A function returning the color of the stroke.
         * @type {function(number,number,import("../Style").Stat|undefined):string} */
        this.strokeColor = opts.strokeColor || (() => '#666')

        /** The name of the column/attribute of the tabular data where to retrieve the variable for size.
         * @type {string} */
        this.sizeCol = opts.sizeCol

        /** A function returning the size of a cell in geographical unit.
         * @type {function(number,number,import("../Style").Stat|undefined,number):number} */
        this.size = opts.size

        /** The stroke line width, in pixels.
         * @type {string} */
        this.strokeWidthCol = opts.strokeWidthCol

        /** The stroke line width in geographical unit.
         * @type {function(number,number,import("../Style").Stat|undefined,number):number} */
        this.strokeWidth = opts.strokeWidth // (v,r,s,z)=>...

        /** A function returning the shape of a cell.
         * @type {function(import("../Dataset").Cell):import("../Style").Shape} */
        this.shape = opts.shape || (() => 'square')
    }

    /**
     * Draw cells as squares, with various colors and size.
     *
     * @param {Array.<import("../Dataset").Cell>} cells
     * @param {import("../GeoCanvas").GeoCanvas} geoCanvas
     * @param {number} resolution
     */
    draw(cells, geoCanvas, resolution) {
        //filter
        if (this.filter) cells = cells.filter(this.filter)

        //
        const z = geoCanvas.view.z

        let statColor
        if (this.strokeColorCol) statColor = Style.getStatistics(cells, (c) => c[this.strokeColorCol], true)

        let statSize
        if (this.sizeCol) statSize = Style.getStatistics(cells, (c) => c[this.sizeCol], true)

        let statWidth
        if (this.strokeWidthCol) statWidth = Style.getStatistics(cells, (c) => c[this.strokeWidthCol], true)

        const r2 = resolution * 0.5
        for (let cell of cells) {
            //color
            const col = this.strokeColor
                ? this.strokeColor(cell[this.strokeColorCol], resolution, statColor)
                : undefined
            if (!col || col === 'none') continue
            geoCanvas.ctx.strokeStyle = col

            //size
            /** @type {function(number,number,import("../Style").Stat|undefined,number):number} */
            let s_ = this.size || (() => resolution)
            //size - in geo unit
            const sG = s_(cell[this.sizeCol], resolution, statSize, z)

            //width
            const wi = this.strokeWidth
                ? this.strokeWidth(cell[this.strokeWidthCol], resolution, statWidth, z)
                : 1 * z
            if (!wi || wi <= 0) continue
            geoCanvas.ctx.lineWidth = wi

            //shape
            const shape = this.shape ? this.shape(cell) : 'square'
            if (shape === 'none') continue

            //get offset
            const offset = this.offset(cell, resolution, z)

            if (shape === 'square') {
                //draw square
                const d = resolution * (1 - sG / resolution) * 0.5
                geoCanvas.ctx.beginPath()
                geoCanvas.ctx.rect(cell.x + d + offset.dx, cell.y + d + offset.dy, sG, sG)
                geoCanvas.ctx.stroke()
            } else if (shape === 'circle') {
                //draw circle
                geoCanvas.ctx.beginPath()
                geoCanvas.ctx.arc(cell.x + r2 + offset.dx, cell.y + r2 + offset.dy, sG * 0.5, 0, 2 * Math.PI, false)
                geoCanvas.ctx.stroke()
            } else if (shape === 'diamond') {
                const s2 = sG * 0.5
                geoCanvas.ctx.beginPath()
                geoCanvas.ctx.moveTo(cell.x + r2 - s2, cell.y + r2)
                geoCanvas.ctx.lineTo(cell.x + r2, cell.y + r2 + s2)
                geoCanvas.ctx.lineTo(cell.x + r2 + s2, cell.y + r2)
                geoCanvas.ctx.lineTo(cell.x + r2, cell.y + r2 - s2)
                geoCanvas.ctx.lineTo(cell.x + r2 - s2, cell.y + r2)
                geoCanvas.ctx.stroke()
            } else if (shape === 'donut') {
                console.error('Not implemented')
            } else {
                throw new Error('Unexpected shape:' + shape)
            }
        }

        //update legends
        //TODO
    }
}
