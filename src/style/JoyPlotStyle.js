//@ts-check
'use strict'

import { Style } from '../Style.js'

/**
 *
 * @author Julien Gaffuri
 */
export class JoyPlotStyle extends Style {
    /** @param {object} opts */
    constructor(opts) {
        super(opts)
        opts = opts || {}

        /** A function returning the view scale.
         * @type {function(Array.<import('../Dataset.js').Cell>,number, number):object} */
        this.viewScale = opts.viewScale

        /** A function returning the height of a cell in geographical unit.
         * @type {function(import('../Dataset.js').Cell,number, number,object):number} */
        this.height = opts.height //(c,r,z,vs) => {}

        /**
         * @type {function(number,{min:number, max:number},number,number):string} */
        this.lineColor = opts.lineColor || ((y, ys, r, zf) => '#BBB')
        /**
         * @type {function(number,{min:number, max:number},number,number):number} */
        this.lineWidth = opts.lineWidth || ((y, ys, r, zf) => zf)
        /**
         * @type {function(number,{min:number, max:number},number,number):string} */
        this.fillColor = opts.fillColor || ((y, ys, r, zf) => '#c08c5968')
    }

    /**
     * Draw cells as squares depending on their value.
     *
     * @param {Array.<import("../Dataset").Cell>} cells
     * @param {number} r
     * @param {import("../GeoCanvas").GeoCanvas} cg
     * */
    draw(cells, r, cg) {
        //filter
        if (this.filter) cells = cells.filter(this.filter)

        cg.ctx.lineJoin = 'round'

        //zoom factor
        const zf = cg.getZf()

        //get view scale
        const vs = this.viewScale ? this.viewScale(cells, r, zf) : undefined

        //index cells by y and x
        /**  @type {object} */
        const ind = {}
        for (const cell of cells) {
            let row = ind[cell.y]
            if (!row) {
                row = {}
                ind[cell.y] = row
            }
            row[cell.x] = this.height(cell, r, zf, vs)
        }

        //compute extent
        const e = cg.extGeo
        if (!e) return
        const xMin = Math.floor(e.xMin / r) * r
        const xMax = Math.floor(e.xMax / r) * r
        const yMin = Math.floor(e.yMin / r) * r
        const yMax = Math.floor(e.yMax / r) * r

        /**  @type {{min:number, max:number}} */
        const ys = { min: yMin, max: yMax }

        //draw in geo coordinates
        cg.setCanvasTransform()

        //draw lines, row by row, stating from the top
        for (let y = yMax; y >= yMin; y -= r) {
            //get row
            const row = ind[y]

            //no row
            if (!row) continue

            //place first point
            cg.ctx.beginPath()
            cg.ctx.moveTo(xMin - r / 2, y)

            //store the previous height
            /** @type {number|undefined} */
            let hG_

            //go through the line cells
            for (let x = xMin; x <= xMax; x += r) {
                //get column value
                /** @type {number} */
                let hG = row[x]
                if (!hG) hG = 0

                if (hG || hG_) {
                    //draw line only when at least one of both values is non-null
                    //TODO test bezierCurveTo
                    cg.ctx.lineTo(x + r / 2, y + hG)
                } else {
                    //else move the point
                    cg.ctx.moveTo(x + r / 2, y)
                }
                //store the previous value
                hG_ = hG
            }

            //last point
            if (hG_) cg.ctx.lineTo(xMax + r / 2, y)

            //draw fill
            const fc = this.fillColor(y, ys, r, zf)
            if (fc && fc != 'none') {
                cg.ctx.fillStyle = fc
                cg.ctx.fill()
            }

            //draw line
            const lc = this.lineColor(y, ys, r, zf)
            const lw = this.lineWidth(y, ys, r, zf)
            if (lc && lc != 'none' && lw > 0) {
                cg.ctx.strokeStyle = lc
                cg.ctx.lineWidth = lw
                cg.ctx.stroke()
            }
        }
    }
}
