//@ts-check
'use strict'

import { Style } from '../Style.js'

/**
 * Show cell as timeseries chart
 * Can be used for sparkline map of https://datagistips.hypotheses.org/488
 *
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


        /**
         * @type {string} */
        this.widthCol = opts.widthCol

        /** A function returning the width of the line, in geo unit
         * @type {function(number,number,import("../Style.js").Stat|undefined,number):number} */
        this.width = opts.width || ((v, r, s, z) => 1.5 * z)

        /**
         * @type {string} */
        this.colorCol = opts.colorCol

        /** A function returning the color of the cell segment.
         * @type {function(number,number,import("../Style.js").Stat|undefined):string} */
        this.color = opts.color || (() => 'black')

    }

    /**
     * Draw cells as text.
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

        let statWidth
        if (this.widthCol) {
            //and compute size variable statistics
            statWidth = Style.getStatistics(cells, (c) => c[this.widthCol], true)
        }

        let statColor
        if (this.colorCol) {
            //compute color variable statistics
            statColor = Style.getStatistics(cells, (c) => c[this.colorCol], true)
        }

        //compute cell amplitude
        const getAmplitude = c => {
            let min, max
            for (let t of this.ts) {
                const val = c[t];
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

        //x
        const offX = 0 //TODO
        const width = r
        const stepX = width / (nb - 1)

        //y
        const offY = 0 //TODO
        const height = r
        const anchorModeY = "first" //for sparkline
        //bottom
        //center


        //draw with HTML canvas
        //in geo coordinates
        cg.setCanvasTransform()

        cg.ctx.lineCap = 'butt'

        for (let c of cells) {

            //width
            /** @type {number|undefined} */
            const wG = this.width ? this.width(c[this.widthCol], r, statWidth, zf) : undefined
            if (!wG || wG < 0) continue

            //color
            /** @type {string|undefined} */
            const col = this.color ? this.color(c[this.colorCol], r, statColor) : undefined
            if (!col) continue

            cg.ctx.lineWidth = wG
            cg.ctx.strokeStyle = col

            //draw line
            cg.ctx.beginPath()

            if (anchorModeY === "first") {
                const val0 = c[this.ts[0]]
                for (let i = 0; i < nb; i++) {
                    const val = c[this.ts[i]]
                    if (i == 0)
                        cg.ctx.moveTo(c.x + offX, c.y + offY)
                    else
                        cg.ctx.lineTo(c.x + i * stepX + offX, c.y + (val - val0) * height / ampMax + offY)
                }
            } else if (anchorModeY === "bottom") {
                console.log("Not implemented yet: bottom")
                //compute min
                let min
                for (let t of this.ts) {
                    const val = c[t];
                    if (val == undefined) continue
                    if (min == undefined || val < min) min = val
                }
                if (min == undefined) continue
            } else if (anchorModeY === "center") {
                console.log("Not implemented yet: center")
                //compute min and max
                let min, max
                for (let t of this.ts) {
                    const val = c[t];
                    if (val == undefined) continue
                    if (min == undefined || val < min) min = val
                    if (max == undefined || val > max) max = val
                }
                if (min == undefined) continue

            } else {
                console.log("Unexpected anchorModeY: " + anchorModeY)
            }

            cg.ctx.stroke()

        }

    }
}
