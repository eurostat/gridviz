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


        //draw with HTML canvas
        //in geo coordinates
        cg.setCanvasTransform()

        cg.ctx.strokeStyle = "red"
        cg.ctx.lineWidth = 5 * zf

        const r2 = r * 0.5
        for (let cell of cells) {
            //center position
            const cx = cell.x + r2
            const cy = cell.y + r2

            cg.ctx.beginPath()
            cg.ctx.moveTo(cx, cy)
            cg.ctx.lineTo(cx + r2, cy + r2)
            cg.ctx.stroke()

        }

    }
}
