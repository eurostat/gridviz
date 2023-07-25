//@ts-check
'use strict'

import { Style } from '../Style.js'

/**
 * Style based on sparkline map of https://datagistips.hypotheses.org/488
 *
 * @author Julien Gaffuri
 */
export class SparklineStyle extends Style {
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
         * @type {function(number,number,import("../Style").Stat|undefined,number):number} */
        this.width = opts.width ||  ((v,r,s,z) => 1*z)

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


        //draw with HTML canvas
        //in geo coordinates
        cg.setCanvasTransform()

        cg.ctx.strokeStyle = "black"
        //
        cg.ctx.lineCap = 'butt'

        const offX = 0 //TODO
        const offY = 0 //TODO
        const width = r
        const height = r
        const nb = this.ts.length
        const stepX = width / (nb - 1)

        for (let c of cells) {

            //width
            /** @type {number|undefined} */
            const wG = this.width ? this.width(c[this.widthCol], r, statWidth, zf) : undefined
            if (!wG || wG < 0) continue

            cg.ctx.lineWidth = wG

            /*/get min value
            let minY
            {
                for (let t of this.ts) {
                    const val = c[t]
                    if (minY == undefined || val < minY) minY = val
                }
            }*/

            //draw line
            cg.ctx.beginPath()
            const val0 = c[this.ts[0]]
            for (let i = 0; i < nb; i++) {
                const val = c[this.ts[i]]
                if (i == 0)
                    cg.ctx.moveTo(c.x, c.y)
                else
                    cg.ctx.lineTo(c.x + i * stepX, c.y + (val - val0) * height / ampMax)
            }
            cg.ctx.stroke()

        }

    }
}
