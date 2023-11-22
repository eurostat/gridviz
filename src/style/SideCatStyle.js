//@ts-check
'use strict'

import { Style } from '../Style.js'

/** @typedef {{x:number,y:number,or:"v"|"h",v1:string|undefined,v2:string|undefined}} Side */

/**
 * A style to show the sides of grid cells based on their different categories.
 *
 * @author Julien Gaffuri
 */
export class SideCatStyle extends Style {
    /** @param {object} opts */
    constructor(opts) {
        super(opts)
        opts = opts || {}

        /** The name of the column/attribute of the tabular data where to retrieve the categorical value.
         * @type {string} */
        this.col = opts.col

        /**
         * The dictionary (string -> color) which give the color of each category.
         * @type {object} */
        this.color = opts.color

        /** A function returning the width of a cell side line, in geo unit
         * @type {function(Side,number,number):number} */
        this.width = opts.width || ((side, r, z) => r * 0.2)

        /** A fill color for the cells.
         * @type {function(import("../Dataset").Cell):string} */
        this.fillColor = opts.fillColor
    }

    /**
     * @param {Array.<import("../Dataset").Cell>} cells
     * @param {number} r
     * @param {import("../GeoCanvas").GeoCanvas} cg
     */
    draw(cells, r, cg) {
        //filter
        if (this.filter) cells = cells.filter(this.filter)

        if (!cells || cells.length == 0) return

        //
        const zf = cg.getZf()

        /**  @type {Array.<Side>} */
        const sides = []

        //make horizontal sides
        //sort cells by x and y
        cells.sort((c1, c2) => (c2.x == c1.x ? c1.y - c2.y : c1.x - c2.x))
        let c1 = cells[0]
        let v1 = c1[this.col]
        for (let i = 1; i < cells.length; i++) {
            let c2 = cells[i]
            let v2 = c2[this.col]

            if (c1.y + r == c2.y && c1.x == c2.x) {
                //cells in same column and touch along horizontal side
                //make shared side
                if (v1 != v2) sides.push({ x: c1.x, y: c2.y, or: 'h', v1: v1, v2: v2 })
            } else {
                //cells do not touch along horizontal side
                //make two sides: top one for c1, bottom for c2
                sides.push({ x: c1.x, y: c1.y + r, or: 'h', v1: v1, v2: undefined })
                sides.push({ x: c2.x, y: c2.y, or: 'h', v1: undefined, v2: v2 })
            }

            c1 = c2
            v1 = v2
        }

        //make vertical sides
        //sort cells by y and x
        cells.sort((c1, c2) => (c2.y == c1.y ? c1.x - c2.x : c1.y - c2.y))
        c1 = cells[0]
        v1 = c1[this.col]
        for (let i = 1; i < cells.length; i++) {
            let c2 = cells[i]
            let v2 = c2[this.col]

            if (c1.x + r == c2.x && c1.y == c2.y) {
                //cells in same row and touch along vertical side
                //make shared side
                if (v1 != v2) sides.push({ x: c1.x + r, y: c1.y, or: 'v', v1: v1, v2: v2 })
            } else {
                //cells do not touch along vertical side
                //make two sides: right one for c1, left for c2
                sides.push({ x: c1.x + r, y: c1.y, or: 'v', v1: v1, v2: undefined })
                sides.push({ x: c2.x, y: c2.y, or: 'v', v1: undefined, v2: v2 })
            }

            c1 = c2
            v1 = v2
        }

        //
        if (sides.length == 0) return

        //draw in geo coordinates
        cg.setCanvasTransform()

        //draw cells, if fillColor specified
        if (this.fillColor)
            for (let c of cells) {
                const fc = this.fillColor(c)
                if (!fc || fc == 'none') continue
                cg.ctx.fillStyle = fc
                cg.ctx.fillRect(c.x, c.y, r, r)
            }

        //draw sides
        cg.ctx.lineCap = 'butt'
        for (let s of sides) {
            //width
            /** @type {number|undefined} */
            const wG = this.width ? this.width(s, r, zf) : undefined
            if (!wG || wG <= 0) continue
            const w2 = wG * 0.5

            //set color and width
            cg.ctx.lineWidth = wG

            //draw segment with correct orientation
            if (s.or === 'h') {
                //top line
                if (s.v2) {
                    cg.ctx.beginPath()
                    cg.ctx.strokeStyle = this.color[s.v2]
                    cg.ctx.moveTo(s.x, s.y + w2)
                    cg.ctx.lineTo(s.x + r, s.y + w2)
                    cg.ctx.stroke()
                }

                //bottom line
                if (s.v1) {
                    cg.ctx.beginPath()
                    cg.ctx.strokeStyle = this.color[s.v1]
                    cg.ctx.moveTo(s.x, s.y - w2)
                    cg.ctx.lineTo(s.x + r, s.y - w2)
                    cg.ctx.stroke()
                }
            } else {
                //right line
                if (s.v2) {
                    cg.ctx.beginPath()
                    cg.ctx.strokeStyle = this.color[s.v2]
                    cg.ctx.moveTo(s.x + w2, s.y)
                    cg.ctx.lineTo(s.x + w2, s.y + r)
                    cg.ctx.stroke()
                }

                //left line
                if (s.v1) {
                    cg.ctx.beginPath()
                    cg.ctx.strokeStyle = this.color[s.v1]
                    cg.ctx.moveTo(s.x - w2, s.y)
                    cg.ctx.lineTo(s.x - w2, s.y + r)
                    cg.ctx.stroke()
                }
            }
        }

        //update legends
        this.updateLegends({ style: this, r: r, zf: zf })
    }
}
