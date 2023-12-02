//@ts-check
'use strict'

import { Style } from '../core/Style.js'

/** @typedef {{ x:number, y:number, or:"v"|"h", c1:(import('../core/Dataset').Cell)|undefined, c2:(import('../core/Dataset').Cell)|undefined }} Side */

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

        /** A function returning the color of a cell side.
         * @type {function(Side, number, number, object):string} */
        this.color = opts.color || ((side, resolution, z, sideViewScale) => '#EA6BAC')

        /** A function returning the width of a cell side, in geo unit
         * @type {function(Side, number, number, object):number} */
        this.width = opts.width || ((side, resolution, z, sideViewScale) => resolution / 5)

        /** A function returning the length of a cell side, in geo unit
         * @type {function(Side, number, number, object):number} */
        this.length = opts.length || ((side, resolution, z, sideViewScale) => resolution)
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
        const sides = SideStyle.buildSides(cells, resolution)
        if (sides.length == 0) return

        //draw sides

        //get side view scale
        const viewScale = this.viewScale ? this.viewScale(sides, resolution, z) : undefined

        geoCanvas.ctx.lineCap = 'butt'
        //const r2 = resolution / 2
        for (let s of sides) {

            //color
            /** @type {string|undefined} */
            const col = this.color ? this.color(s, resolution, z, viewScale) : undefined
            if (!col || col == 'none') continue

            //width
            /** @type {number|undefined} */
            const wG = this.width ? this.width(s, resolution, z, viewScale) : undefined
            if (!wG || wG <= 0) continue

            //length
            /** @type {number|undefined} */
            const lG = this.length ? this.length(s, resolution, z, viewScale) : undefined
            if (!lG || lG <= 0) continue

            //set color and width
            geoCanvas.ctx.strokeStyle = col
            geoCanvas.ctx.lineWidth = wG

            //draw segment with correct orientation
            geoCanvas.ctx.beginPath()
            /*if (this.orientation == 90) {
                geoCanvas.ctx.moveTo(s.x + r2, s.y + r2)
                if (s.or === 'h') geoCanvas.ctx.lineTo(s.x + r2, s.y - r2)
                else geoCanvas.ctx.lineTo(s.x - r2, s.y + r2)
            } else {
                geoCanvas.ctx.moveTo(s.x, s.y)
                geoCanvas.ctx.lineTo(s.x + (s.or === 'h' ? resolution : 0), s.y + (s.or === 'v' ? resolution : 0))
            }*/
            //TODO use lG/2 somewhere
            geoCanvas.ctx.moveTo(s.x, s.y)
            geoCanvas.ctx.lineTo(s.x + (s.or === 'h' ? resolution : 0), s.y + (s.or === 'v' ? resolution : 0))
            geoCanvas.ctx.stroke()
        }

        //update legends
        this.updateLegends({ style: this, resolution: resolution, z: z, viewScale: viewScale })
    }



    /**
     * 
     * @param {Array.<import('../core/Dataset').Cell>} cells 
     * @param {number} resolution 
     * @returns { Array.<Side> }
     */
    static buildSides(cells, resolution) {
        /** @type { Array.<Side> } */
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
                    c2: undefined
                    //value: this.value(c1[this.valueCol], undefined, resolution, statValue, z),
                })
                sides.push({
                    x: c2.x,
                    y: c2.y,
                    or: 'h',
                    c1: undefined,
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
                    c2: undefined
                    //value: this.value(c1[this.valueCol], undefined, resolution, statValue, z),
                })
                sides.push({
                    x: c2.x,
                    y: c2.y,
                    or: 'v',
                    c1: undefined,
                    c2: c2
                    //value: this.value(undefined, c2[this.valueCol], resolution, statValue, z),
                })
            }

            c1 = c2
        }
        return sides
    }

}
