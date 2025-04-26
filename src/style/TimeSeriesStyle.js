//@ts-check
'use strict'

import { Style } from '../core/Style.js'

/** @typedef {"first"|"bottom"|"center"|"top"|"last"} AnchorModeYEnum */

/**
 * Show cell as timeseries chart
 * Can be used for sparkline map of https://datagistips.hypotheses.org/488
 *
 * @module style
 * @author Julien Gaffuri
 */
export class TimeSeriesStyle extends Style {
    /** @param {object} opts */
    constructor(opts) {
        super(opts)
        opts = opts || {}

        /** The columns of the time series, ordered in chronological order.
         * @type {Array.<string>} */
        this.ts = opts.ts

        /** A function specifying when a value should be considered as "no data" and thus not ignored. The line will have a break at these values.
         * @type {function(string):boolean} */
        this.noData = opts.noData || ((v) => v === undefined || v == '' || v === null || isNaN(+v))

        //x
        /** in geo unit
         * @type {function(import("../core/Dataset.js").Cell,number,number):number} */
        this.offsetX = opts.offsetX || ((c, r, z) => 0)
        /** @type {function(import("../core/Dataset.js").Cell,number,number):number} */
        this.width = opts.width || ((c, r, z) => r)

        //y
        /** in geo unit
         * @type {function(import("../core/Dataset.js").Cell,number,number):number} */
        this.offsetY = opts.offsetY || ((c, r, z) => 0)
        /** @type {function(import("../core/Dataset.js").Cell,number,number):number} */
        this.height = opts.height || ((c, r, z) => r)
        /** @type {function(import("../core/Dataset.js").Cell,number,number):AnchorModeYEnum} */
        this.anchorModeY = opts.anchorModeY || ((c, r, z) => 'center')

        /** A function returning the width of the line, in geo unit
         * @type {function(import('../core/Dataset.js').Cell, number, number, object):number} */
        this.lineWidth = opts.lineWidth || ((v, r, s, z) => 1.5 * z)

        /** A function returning the color of the chart.
         * @type {function(import('../core/Dataset.js').Cell, number, number, object):string} */
        this.color = opts.color || (() => 'black') //(c,r,z,vs) => {}
    }

    /**
     * Draw cells as text.
     *
     * @param {Array.<import("../core/Dataset.js").Cell>} cells
     * @param {import("../core/GeoCanvas.js").GeoCanvas} geoCanvas
     * @param {number} resolution
     */
    draw(cells, geoCanvas, resolution) {
        //filter
        if (this.filter) cells = cells.filter(this.filter)

        //
        const z = geoCanvas.view.z
        const ctx = geoCanvas.offscreenCtx

        //get view scale
        const viewScale = this.viewScale ? this.viewScale(cells, resolution, z) : undefined

        //compute cell amplitude
        const getAmplitude = (c) => {
            let min, max
            for (let t of this.ts) {
                const val = c[t]
                if (val == undefined) continue
                if (min == undefined || val < min) min = val
                if (max == undefined || val > max) max = val
            }
            if (min == undefined) return undefined
            return max - min
        }

        //compute max amplitude
        let ampMax
        for (let c of cells) {
            const amp = getAmplitude(c)
            if (amp == undefined) continue
            if (ampMax == undefined || amp > ampMax) ampMax = amp
        }
        if (!ampMax) return

        const nb = this.ts.length

        ctx.lineCap = 'butt'
        for (let c of cells) {
            //line width
            /** @type {number|undefined} */
            const wG = this.lineWidth ? this.lineWidth(c, resolution, z, viewScale) : undefined
            if (!wG || wG < 0) continue

            //line color
            /** @type {string|undefined} */
            const col = this.color ? this.color(c, resolution, z, viewScale) : undefined
            if (!col) continue

            //x
            const offX = this.offsetX ? this.offsetX(c, resolution, z) : 0
            if (offX == undefined || isNaN(offX)) continue
            const w = this.width ? this.width(c, resolution, z) : resolution
            if (w == undefined || isNaN(w)) continue

            //y
            const offY = this.offsetY ? this.offsetY(c, resolution, z) : 0
            if (offY == undefined || isNaN(offY)) continue
            const h = this.height ? this.height(c, resolution, z) : resolution
            if (h == undefined || isNaN(h)) continue
            const anchY = this.anchorModeY ? this.anchorModeY(c, resolution, z) : 'center'
            if (!anchY) continue

            ctx.lineWidth = wG
            ctx.strokeStyle = col

            //compute anchor Y figures
            let val0, y0
            if (anchY === 'first') {
                //get first value
                val0 = c[this.ts[0]]
                y0 = 0
            } else if (anchY === 'last') {
                //get last value
                val0 = c[this.ts[this.ts.length - 1]]
                y0 = 0
            } else if (anchY === 'bottom') {
                //get min
                for (let t of this.ts) {
                    const val = +c[t]
                    if (val == undefined) continue
                    if (val0 == undefined || val < val0) val0 = val
                }
                y0 = 0
            } else if (anchY === 'top') {
                //get max
                for (let t of this.ts) {
                    const val = +c[t]
                    if (val == undefined) continue
                    if (val0 == undefined || val > val0) val0 = val
                }
                y0 = resolution
            } else if (anchY === 'center') {
                //get min and max
                let min, max
                for (let t of this.ts) {
                    const val = c[t]
                    if (val == undefined) continue
                    if (min == undefined || val < min) min = val
                    if (max == undefined || val > max) max = val
                }
                val0 = (+max + +min) * 0.5
                y0 = resolution / 2
            } else {
                console.log('Unexpected anchorModeY: ' + anchY)
                continue
            }

            /*/draw line
            if (val0 == undefined || isNaN(val0)) continue
            cg.ctx.beginPath()
            const sX = w / (nb - 1)
            for (let i = 0; i < nb; i++) {
                const val = c[this.ts[i]]
                if (val == undefined || isNaN(val)) break
                if (i == 0)
                    cg.ctx.moveTo(c.x + i * sX + offX, c.y + y0 + (val - val0) * h / ampMax + offY)
                else
                    cg.ctx.lineTo(c.x + i * sX + offX, c.y + y0 + (val - val0) * h / ampMax + offY)
            }
            cg.ctx.stroke()*/

            //draw line, segment by segment
            const sX = w / (nb - 1)

            //handle first point
            let v0 = c[this.ts[0]]
            if (!this.noData(v0)) {
                ctx.beginPath()
                ctx.moveTo(c.x + offX, c.y + y0 + ((v0 - val0) * h) / ampMax + offY)
            }
            //console.log(v0, isNaN(v0))

            let v1
            for (let i = 1; i < nb; i++) {
                v1 = c[this.ts[i]]

                //draw segment from v0 to v1

                //both points 'no data'
                if (this.noData(v0) && this.noData(v1)) {
                    //second point 'no data'
                } else if (!this.noData(v0) && this.noData(v1)) {
                    ctx.stroke()

                    //first point 'no data'
                } else if (this.noData(v0) && !this.noData(v1)) {
                    ctx.beginPath()
                    ctx.moveTo(c.x + i * sX + offX, c.y + y0 + ((v1 - val0) * h) / ampMax + offY)

                    //both points have data: trace line
                } else {
                    ctx.lineTo(c.x + i * sX + offX, c.y + y0 + ((v1 - val0) * h) / ampMax + offY)
                    //if it is the last point, stroke
                    if (i == nb - 1) ctx.stroke()
                }
                v0 = v1
            }
        }

        //update legend, if any
        this.updateLegends({ style: this, resolution: resolution, z: z, viewScale: viewScale })
    }
}
