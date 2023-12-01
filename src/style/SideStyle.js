//@ts-check
'use strict'

import { Style } from '../core/Style.js'

/** @typedef {{ x:number, y:number, or:"v"|"h", c1:import('../core/Dataset').Cell, c2:import('../core/Dataset').Cell }} Side */

/**
 * @typedef {function(Array.<Side>,number, number):*} SideViewScale */

/**
 *
 * @author Julien Gaffuri
 */
export class SideStyle extends Style {
    /** @param {object} opts */
    constructor(opts) {
        super(opts)
        opts = opts || {}

        /**
        * @type {SideViewScale|undefined} */
        this.sideViewScale = opts.sideViewScale

        /** A function returning the color of a cell side.
         * @type {function(Side, number, number, object):string} */
        this.color = opts.color || ((side, resolution, z, sideViewScale) => '#EA6BAC')

        /** A function returning the width of a cell side, in geo unit
         * @type {function(Side, number, number, object):number} */
        this.width = opts.width || ((side, resolution, z, sideViewScale) => resolution / 5)

        /** orientation. Set to 90 to show sides as slope lines for example.
         * @type {number} */
        this.orientation = opts.orientation || 0

        /** A fill color for the cells.
         * @type {function(import('../core/Dataset.js').Cell, number, number, object):string} */
        this.fillColor = opts.fillColor
    }

    /**
     * @param {Array.<import("../core/Dataset").Cell>} cells
     * @param {number} resolution
     * @param {import("../core/GeoCanvas").GeoCanvas} geoCanvas
     */
    draw(cells, geoCanvas, resolution) {

        //filter
        if (this.filter) cells = cells.filter(this.filter)

        //
        const z = geoCanvas.view.z

        /**  @type {Array.<Side>} */
        const sides = []

        //make horizontal sides
        //sort cells by x and y
        cells.sort((c1, c2) => (c2.x == c1.x ? c1.y - c2.y : c1.x - c2.x))
        let c1 = cells[0]
        for (let i = 1; i < cells.length; i++) {
            let c2 = cells[i]

            if ((c1.y + resolution == c2.y) && (c1.x == c2.x))
                //cells in same column and touch along horizontal side
                //make shared side
                sides.push({
                    x: c1.x,
                    y: c2.y,
                    or: 'h',
                    c1: c1,
                    c2: c2
                    //value: this.value(c1[this.valueCol], c2[this.valueCol], resolution, statValue, z),
                })
            else {
                //cells do not touch along horizontal side
                //make two sides: top one for c1, bottom for c2
                sides.push({
                    x: c1.x,
                    y: c1.y + resolution,
                    or: 'h',
                    c1: c1,
                    c2: c2
                    //value: this.value(c1[this.valueCol], undefined, resolution, statValue, z),
                })
                sides.push({
                    x: c2.x,
                    y: c2.y,
                    or: 'h',
                    c1: c1,
                    c2: c2
                    //value: this.value(undefined, c2[this.valueCol], resolution, statValue, z),
                })
            }

            c1 = c2
        }

        //make vertical sides
        //sort cells by y and x
        cells.sort((c1, c2) => (c2.y == c1.y ? c1.x - c2.x : c1.y - c2.y))
        c1 = cells[0]
        for (let i = 1; i < cells.length; i++) {
            let c2 = cells[i]

            if ((c1.x + resolution == c2.x) && (c1.y == c2.y))
                //cells in same row and touch along vertical side
                //make shared side
                sides.push({
                    x: c1.x + resolution,
                    y: c1.y,
                    or: 'v',
                    c1: c1,
                    c2: c2
                    //value: this.value(c1[this.valueCol], c2[this.valueCol], resolution, statValue, z),
                })
            else {
                //cells do not touch along vertical side
                //make two sides: right one for c1, left for c2
                sides.push({
                    x: c1.x + resolution,
                    y: c1.y,
                    or: 'v',
                    c1: c1,
                    c2: c2
                    //value: this.value(c1[this.valueCol], undefined, resolution, statValue, z),
                })
                sides.push({
                    x: c2.x,
                    y: c2.y,
                    or: 'v',
                    c1: c1,
                    c2: c2
                    //value: this.value(undefined, c2[this.valueCol], resolution, statValue, z),
                })
            }

            c1 = c2
        }

        //
        if (sides.length == 0) return



        //draw cells, if fillColor specified
        //get view scale
        const viewScale = this.viewScale ? this.viewScale(cells, resolution, z) : undefined
        if (this.fillColor)
            for (let cell of cells) {
                const fc = this.fillColor ? this.fillColor(cell, resolution, z, viewScale) : undefined
                if (!fc || fc == 'none') continue
                geoCanvas.ctx.fillStyle = fc
                geoCanvas.ctx.fillRect(cell.x, cell.y, resolution, resolution)

            }


        //draw sides

        //get side view scale
        const sideViewScale = this.sideViewScale ? this.sideViewScale(sides, resolution, z) : undefined

        geoCanvas.ctx.lineCap = 'butt'
        const r2 = resolution / 2
        for (let s of sides) {
            //color
            /** @type {string|undefined} */
            const col = this.color ? this.color(s, resolution, z, sideViewScale) : undefined
            if (!col || col == 'none') continue

            //width
            /** @type {number|undefined} */
            const wG = this.width ? this.width(s, resolution, z, sideViewScale) : undefined
            if (!wG || wG <= 0) continue

            //set color and width
            geoCanvas.ctx.strokeStyle = col
            geoCanvas.ctx.lineWidth = wG

            //draw segment with correct orientation
            geoCanvas.ctx.beginPath()
            if (this.orientation == 90) {
                geoCanvas.ctx.moveTo(s.x + r2, s.y + r2)
                if (s.or === 'h') geoCanvas.ctx.lineTo(s.x + r2, s.y - r2)
                else geoCanvas.ctx.lineTo(s.x - r2, s.y + r2)
            } else {
                geoCanvas.ctx.moveTo(s.x, s.y)
                geoCanvas.ctx.lineTo(s.x + (s.or === 'h' ? resolution : 0), s.y + (s.or === 'v' ? resolution : 0))
            }
            geoCanvas.ctx.stroke()
        }

        //update legends
        this.updateLegends({ style: this, resolution: resolution, z: z, sideViewScale: sideViewScale, viewScale: viewScale })
    }

}
