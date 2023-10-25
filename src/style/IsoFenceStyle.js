//@ts-check
'use strict'

import { Style } from '../Style.js'

/** @typedef {{x:number,y:number,or:"v"|"h",c1:import('../Dataset.js').Cell|undefined,c2:import('../Dataset.js').Cell|undefined}} Side */

/**
 * @author Julien Gaffuri
 */
export class IsoFenceStyle extends Style {

    /** @param {object} opts */
    constructor(opts) {
        super(opts)
        opts = opts || {}

        /**
         * The dictionary (string -> color) which give the color of each category.
         * @type {object} */
        this.color = opts.color

        /** The column where to get the height values.
         * @type {string} */
        this.heightCol = opts.heightCol

        /** A function returning the height of a cell.
         * @type {function(number,number,import("../Style").Stat|undefined,number):number} */
        this.height = opts.height || ((v, r, s, zf) => r * 0.4)

        /** The perspective angle.
         * @type {number} */
        this.angle = opts.angle != undefined ? opts.angle : 45
    }

    /**
     * Draw cells as segments.
     *
     * @param {Array.<import("../Dataset.js").Cell>} cells
     * @param {number} r
     * @param {import("../GeoCanvas.js").GeoCanvas} cg
     */
    draw(cells, r, cg) {
        //filter
        if (this.filter) cells = cells.filter(this.filter)

        //zoom factor
        const zf = cg.getZf()

        let stat
        if (this.heightCol) {
            //if size is used, sort cells by size so that the biggest are drawn first
            cells.sort((c1, c2) => c2[this.heightCol] - c1[this.heightCol])
            //and compute statistics
            stat = Style.getStatistics(cells, (c) => c[this.heightCol], true)
        }

        //nb categories - used for radar and agepyramid
        const cats = Object.keys(this.color)
        const nbCat = cats.length

        //draw in geo coordinates
        cg.setCanvasTransform()

        //half resolution
        const r2 = r / 2

        //height
        /** @type {function(number,number,import("../Style").Stat|undefined,number):number} */
        let h_ = this.height

        //make sides
        /**  @type {Array.<Side>} */
        const sides = []

        //make horizontal sides
        //sort cells by x and y
        cells.sort((c1, c2) => (c2.x == c1.x ? c1.y - c2.y : c1.x - c2.x))
        let c1 = cells[0]
        for (let i = 1; i < cells.length; i++) {
            let c2 = cells[i]

            if ((c1.y + r == c2.y) && (c1.x == c2.x))
                //cells in same column and touch along horizontal side
                //make shared side
                sides.push({ x: c1.x + r2, y: c2.y, or: 'h', c1: c1, c2: c2 })
            else {
                //cells do not touch along horizontal side
                //make two sides: top one for c1, bottom for c2
                sides.push({ x: c1.x + r2, y: c1.y + r, or: 'h', c1: c1, c2: undefined })
                sides.push({ x: c2.x + r2, y: c2.y, or: 'h', c1: undefined, c2: c2 })
            }

            c1 = c2
        }

        //make vertical sides
        //sort cells by y and x
        cells.sort((c1, c2) => (c2.y == c1.y ? c1.x - c2.x : c1.y - c2.y))
        c1 = cells[0]
        for (let i = 1; i < cells.length; i++) {
            let c2 = cells[i]

            if ((c1.x + r == c2.x) && (c1.y == c2.y))
                //cells in same row and touch along vertical side
                //make shared side
                sides.push({ x: c2.x, y: c1.y + r2, or: 'v', c1: c1, c2: c2 })
            else {
                //cells do not touch along vertical side
                //make two sides: right one for c1, left for c2
                sides.push({ x: c1.x + r, y: c1.y + r2, or: 'v', c1: c1, c2: undefined })
                sides.push({ x: c2.x, y: c2.y + r2, or: 'v', c1: undefined, c2: c2 })
            }

            c1 = c2
        }

        //
        if (sides.length == 0) return

        //angle in radians
        const aRad = this.angle * Math.PI / 180, cos = Math.cos(aRad), sin = Math.sin(aRad)

        //draw in geo coordinates
        cg.setCanvasTransform()

        //sort sides so that the north east ones are drown first
        sides.sort((s1, s2) => (Math.hypot(s2.x, s2.y) - Math.hypot(s1.x, s1.y)))

        //draw sides
        for (let s of sides) {

            //heights - in geo
            /** @type {number} */
            const hG1 = s.c1 ? h_(s.c1[this.heightCol], r, stat, zf) : 0
            /** @type {number} */
            const hG2 = s.c2 ? h_(s.c2[this.heightCol], r, stat, zf) : 0

            //compute totals for both cells
            const total1 = computeTotal(s.c1, cats)
            const total2 = computeTotal(s.c2, cats)

            let cumul1 = 0, cumul2 = 0
            for (let [column, color] of Object.entries(this.color)) {
                //draw stripe of side s and category column

                //get values for both cells
                let v1 = s.c1 ? s.c1[column] : 0
                let v2 = s.c2 ? s.c2[column] : 0

                //compute heights
                const h1 = total1 > 0 ? hG1 * cumul1 / total1 : 0
                const h1n = total1 > 0 ? hG1 * (cumul1 + v1) / total1 : 0
                const h2 = total2 > 0 ? hG2 * cumul2 / total2 : 0
                const h2n = total2 > 0 ? hG2 * (cumul2 + v2) / total2 : 0

                //make path
                cg.ctx.beginPath()
                if (s.or == "h") {
                    //horizontal side - vertical section
                    //bottom left
                    cg.ctx.moveTo(s.x + h1 * cos, s.y - r2 + h1 * sin)
                    //top left
                    cg.ctx.lineTo(s.x + h2 * cos, s.y + r2 + h2 * sin)
                    //top right
                    cg.ctx.lineTo(s.x + h2n * cos, s.y + r2 + h2n * sin)
                    //bottom right
                    cg.ctx.lineTo(s.x + h1n * cos, s.y - r2 + h1n * sin)
                } else {
                    //vertical side - horizontal section
                    //bottom left
                    cg.ctx.moveTo(s.x - r2, s.y)
                    //bottom right
                    cg.ctx.lineTo(s.x + r2, s.y)
                    //top right
                    cg.ctx.lineTo(s.x + r2 + hG2 * cos, s.y + hG2 * sin)
                    //top left
                    cg.ctx.lineTo(s.x - r2 + hG1 * cos, s.y + hG1 * sin)
                }
                cg.ctx.closePath()

                //fill
                cg.ctx.fillStyle = color
                cg.ctx.fill()

                cumul1 += v1
                cumul2 += v2
            }
        }

        cg.ctx.strokeStyle = "darkgray"
        cg.ctx.lineWidth = 1 * zf

        for (let c of cells) {
            //height - in geo
            const hG = h_(c[this.heightCol], r, stat, zf)

            cg.ctx.beginPath()
            cg.ctx.moveTo(c.x + r2, c.y + r2)
            cg.ctx.lineTo(c.x + r2 + hG * cos, c.y + r2 + hG * sin)
            cg.ctx.closePath()
            cg.ctx.stroke()

        }


        //update legends
        this.updateLegends({ style: this, r: r, zf: zf, sSize: stat })
    }
}



const computeTotal = (cell, categories) => {
    if (!cell) return 0
    let total = 0
    for (let column of categories) {
        const v = +cell[column]
        if (!v) continue
        total += v
    }
    return total || 0
}
