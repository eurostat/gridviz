//@ts-check
'use strict'

import { Style } from '../core/Style.js'

/**
 * A style where each cell is represented by a segment whose length, width, color and orientation can vary according to statistical values.
 *
 * @author Julien Gaffuri
 */
export class SegmentStyle extends Style {
    /** @param {object} opts */
    constructor(opts) {
        super(opts)
        opts = opts || {}

        /** A function returning the orientation (in degrees) of the segment representing a cell.
         * @type {function(import("../Dataset").Cell):number} */
        this.orientation = opts.orientation || (() => 0)

        /**
         * @type {string} */
        this.colorCol = opts.colorCol

        /** A function returning the color of the cell segment.
         * @type {function(number,number,import("../Style").Stat|undefined):string} */
        this.color = opts.color || (() => '#EA6BAC')

        /**
         * @type {string} */
        this.lengthCol = opts.lengthCol

        /** A function returning the length of the segment representing a cell, in geo unit
         * @type {function(number,number,import("../Style").Stat|undefined,number):number} */
        this.length = opts.length

        /**
         * @type {string} */
        this.widthCol = opts.widthCol

        /** A function returning the width of the segment representing a cell, in geo unit
         * @type {function(number,number,import("../Style").Stat|undefined,number):number} */
        this.width = opts.width
    }

    /**
     * Draw cells as segments.
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
        if (this.colorCol) {
            //compute color variable statistics
            statColor = Style.getStatistics(cells, (c) => c[this.colorCol], true)
        }

        let statLength
        if (this.lengthCol) {
            //if length is used, sort cells by length so that the longests are drawn first
            cells.sort((c1, c2) => c2[this.lengthCol] - c1[this.lengthCol])
            //and compute size variable statistics
            statLength = Style.getStatistics(cells, (c) => c[this.lengthCol], true)
        }

        let statWidth
        if (this.widthCol) {
            //and compute size variable statistics
            statWidth = Style.getStatistics(cells, (c) => c[this.widthCol], true)
        }

        //
        geoCanvas.ctx.lineCap = 'butt'

        //conversion factor degree -> radian
        const f = Math.PI / 180

        for (let c of cells) {
            //color
            /** @type {string|undefined} */
            const col = this.color ? this.color(c[this.colorCol], resolution, statColor) : undefined
            if (!col) continue

            //width
            /** @type {number|undefined} */
            const wG = this.width ? this.width(c[this.widthCol], resolution, statWidth, z) : undefined
            if (!wG || wG < 0) continue

            //length
            /** @type {number|undefined} */
            const lG = this.length ? this.length(c[this.lengthCol], resolution, statLength, z) : undefined
            if (!lG || lG < 0) continue

            //orientation (in radian)
            /** @type {number} */
            const or = this.orientation(c) * f
            if (or === undefined || isNaN(or)) continue

            //get offset
            const offset = this.offset(c, resolution, z)

            //set color and width
            geoCanvas.ctx.strokeStyle = col
            geoCanvas.ctx.lineWidth = wG

            //compute segment centre postition
            const cx = c.x + resolution / 2 + offset.dx
            const cy = c.y + resolution / 2 + offset.dy

            //compute segment direction
            const dx = 0.5 * Math.cos(or) * lG
            const dy = 0.5 * Math.sin(or) * lG

            //draw segment
            geoCanvas.ctx.beginPath()
            geoCanvas.ctx.moveTo(cx - dx, cy - dy)
            geoCanvas.ctx.lineTo(cx + dx, cy + dy)
            geoCanvas.ctx.stroke()
        }

        //update legend, if any
        this.updateLegends({
            widthFun: this.width,
            r: resolution,
            z: z,
            sColor: statColor,
            //sLength: statLength,
            sWidth: statWidth,
        })
    }
}
