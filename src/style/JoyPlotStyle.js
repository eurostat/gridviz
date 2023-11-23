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
        this.height = opts.height || ((c, r) => r * Math.random()) //(c,r,z,vs) => {}

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

    draw(cells, canvas, resolution, view) {
        //filter
        if (this.filter) cells = cells.filter(this.filter)

        canvas.ctx.lineJoin = 'round'

        //
        const zf = view.z

        //get view scale
        const vs = this.viewScale ? this.viewScale(cells, resolution, zf) : undefined

        //index cells by y and x
        /**  @type {object} */
        const ind = {}
        for (const cell of cells) {
            let row = ind[cell.y]
            if (!row) {
                row = {}
                ind[cell.y] = row
            }
            row[cell.x] = this.height(cell, resolution, zf, vs)
        }

        //compute extent
        const e = canvas.extGeo
        if (!e) return
        const xMin = Math.floor(e.xMin / resolution) * resolution
        const xMax = Math.floor(e.xMax / resolution) * resolution
        const yMin = Math.floor(e.yMin / resolution) * resolution
        const yMax = Math.floor(e.yMax / resolution) * resolution

        /**  @type {{min:number, max:number}} */
        const ys = { min: yMin, max: yMax }

        //draw lines, row by row, stating from the top
        for (let y = yMax; y >= yMin; y -= resolution) {
            //get row
            const row = ind[y]

            //no row
            if (!row) continue

            //place first point
            canvas.ctx.beginPath()
            canvas.ctx.moveTo(xMin - resolution / 2, y)

            //store the previous height
            /** @type {number|undefined} */
            let hG_

            //go through the line cells
            for (let x = xMin; x <= xMax; x += resolution) {
                //get column value
                /** @type {number} */
                let hG = row[x]
                if (!hG) hG = 0

                if (hG || hG_) {
                    //draw line only when at least one of both values is non-null
                    //TODO test bezierCurveTo
                    canvas.ctx.lineTo(x + resolution / 2, y + hG)
                } else {
                    //else move the point
                    canvas.ctx.moveTo(x + resolution / 2, y)
                }
                //store the previous value
                hG_ = hG
            }

            //last point
            if (hG_) canvas.ctx.lineTo(xMax + resolution / 2, y)

            //draw fill
            const fc = this.fillColor(y, ys, resolution, zf)
            if (fc && fc != 'none') {
                canvas.ctx.fillStyle = fc
                canvas.ctx.fill()
            }

            //draw line
            const lc = this.lineColor(y, ys, resolution, zf)
            const lw = this.lineWidth(y, ys, resolution, zf)
            if (lc && lc != 'none' && lw > 0) {
                canvas.ctx.strokeStyle = lc
                canvas.ctx.lineWidth = lw
                canvas.ctx.stroke()
            }
        }
    }
}
