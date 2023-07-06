//@ts-check
'use strict'

import { Style } from '../Style.js'

/**
 * A style representing the cell as a smoothed layer, to smoothing local variations and show main trends across space.
 *
 * @author Julien Gaffuri
 */
export class KernelSmoothingStyle extends Style {
    //bandwidth
    // https://observablehq.com/@uwdata/fast-kde
    // https://observablehq.com/d/3127b6d89ada959f
    //TODO use https://github.com/uwdata/fast-kde ?
    //TODO https://observablehq.com/@sahilchinoy/areal-interpolation-iii ?

    /** @param {object} opts */
    constructor(opts) {
        super(opts)
        opts = opts || {}

        /** A function specifying the value to consider for each cell. This is the value to smooth.
         * @type {function(import("../Dataset").Cell):number} */
        this.value = opts.value

        /** The smoothing parameter, in geo unit. The larger, the more smoothed.
         * @type {function(number,number):number}
         */
        this.sigma = opts.sigma // (r, zf)=>...

        /** The styles to represent the smoothed cells.
         * @type {Array.<Style>}
         */
        this.styles = opts.styles
    }

    /**
     * Compute the kernel matrix, that is the matrix of the weights.
     * One quadrant is necessary only, since it is symetrical (along both x and y axes).
     * @param {number} s Sigma (in grid pixel !)
     * @returns {Array.<Array<number>>}
     * @private
     */
    getKernelMatrix(s) {
        //the size of the kernel: lets limit that to ~3 times the standard deviation, as an approximation.
        const kernelSize = Math.floor(3.25 * s)

        //pre-compute coefficient for gaussian computation, to avoid computing them every time.
        const c2 = 2 * s * s

        /**
         * The gaussian function. TODO expose that function as a parameter, to use other kernels ?
         * @param {number} x
         * @param {number} y
         * @returns {number}
         */
        const gaussian = (x, y) => (c2 != 0 ? Math.exp(-(x * x + y * y) / c2) : x == 0 && y == 0 ? 1 : 0) //dirac case

        /** @type {Array.<Array<number>>} */
        const kw = []
        for (let wi = 0; wi <= kernelSize; wi++) {
            /** @type {Array<number>} */
            const col = []
            for (let wj = 0; wj <= kernelSize; wj++) {
                //compute weight at wi,wj
                col.push(gaussian(wi, wj))
            }
            kw.push(col)
        }

        /*
        //debug: show values
        for (let wj = kernelSize-1; wj >=0; wj--) {
            let st = "";
            for (let wi = 0; wi <= kernelSize; wi++) {
                st += "   " + Math.floor(kw[wi][wj].w *1000) /1000
            }
            console.log(st)
        }*/

        return kw
    }

    /**
     * Compute kernel smoothing of some cells.
     *
     * @private
     * @param {Array.<import("../Dataset").Cell>} cells The cells to be smoothed.
     * @param {import("../Dataset").Envelope} e Geo envelope to consider.
     * @param {number} r Resolution, in geo unit.
     * @param {number} s Sigma (in grid pixel !)
     * @returns {Array.<import("../Dataset").Cell>} The list of cells, including the initial ones and the ones with smoothed values, in "ksmval" property.
     */
    kernelSmoothing(cells, e, r, s) {
        //filter
        if (this.filter) cells = cells.filter(this.filter)

        const wThr = 0.01 //gaussian weights below this value will be ignored

        //compute extent, in grid position
        const xMin = Math.floor(e.xMin / r) * r
        const xMax = Math.floor(e.xMax / r) * r
        const yMin = Math.floor(e.yMin / r) * r
        const yMax = Math.floor(e.yMax / r) * r

        //compute matrix dimensions
        const nbX = (xMax - xMin) / r + 1
        const nbY = (yMax - yMin) / r + 1

        //initialise smoothed value to 0
        for (const c of cells) c['ksmval'] = 0

        //make matrix. add input cells by i/j (grid position)
        const index = {}
        for (const c of cells) {
            // i,j of the cell
            const i = Math.floor((c.x - xMin) / r)
            const j = Math.floor((c.y - yMin) / r)
            if (!index[i]) index[i] = {}
            index[i][j] = c
        }

        /** Check that the cell i,j is within the frame */
        const isWithinFrame = (i, j) => i >= 0 && i < nbX && j >= 0 && j < nbY

        //get kernel matrix
        /** @type {Array.<Array.<number>>} */
        const kernelMatrix = this.getKernelMatrix(s)
        const kernelSize = kernelMatrix.length

        //compute summ of the weights over entire kernel window
        /** @type {number} */
        let sumWeights = 0
        for (let ki = 1 - kernelSize; ki < kernelSize; ki++) {
            for (let kj = 1 - kernelSize; kj < kernelSize; kj++) {
                let w = kernelMatrix[Math.abs(ki)][Math.abs(kj)]
                if (w < wThr) continue
                sumWeights += w
            }
        }

        /** Add v as a contribution to the cell i,j */
        const addContributionTo = (i, j, v) => {
            //get cell at (i,j)
            const c_ = index[i] ? index[i][j] : undefined

            if (c_) {
                //cell exists: add contribution
                if (c_.ksmval) c_.ksmval += v
                else c_.ksmval = v
            } else {
                //cell does not exist: create a new one with the smoothed value
                if (!index[i]) index[i] = {}
                index[i][j] = { x: xMin + i * r, y: yMin + j * r, ksmval: v }
            }
        }

        //compute smoothing, input cell by input cell
        for (const c of cells) {
            /** get value of cell c
             * @type {number} */
            const val = this.value(c)
            if (!val) continue

            //cell matrix coordinates
            const i = Math.floor((c.x - xMin) / r)
            const j = Math.floor((c.y - yMin) / r)

            //add contributions to smoothed values
            for (let ki = 1 - kernelSize; ki < kernelSize; ki++) {
                for (let kj = 1 - kernelSize; kj < kernelSize; kj++) {
                    //check cell is within the frame
                    if (!isWithinFrame(i + ki, j + kj)) continue

                    //get contribution (ki,kj)
                    let w = kernelMatrix[Math.abs(ki)][Math.abs(kj)]
                    if (!w || w < wThr) continue
                    let v = w * val
                    if (!v) continue
                    v /= sumWeights
                    if (!v) continue

                    //add contribution
                    addContributionTo(i + ki, j + kj, v)
                }
            }
        }

        //make output list
        const out = []
        for (let i of Object.keys(index)) for (const j of Object.keys(index[i])) out.push(index[i][j])

        return out
    }

    /**
     * Draw the smoothed cells depending on the list of styles specified.
     *
     * @param {Array.<import("../Dataset").Cell>} cells
     * @param {number} r
     * @param {import("../GeoCanvas").GeoCanvas} cg
     */
    draw(cells, r, cg) {
        if (!cells || cells.length == 0) return

        //get smoothing param in geo unit
        /** @type {number} */
        const sG = this.sigma(r, cg.zf)

        //apply kernel smoothing
        cells = this.kernelSmoothing(cells, cg.extGeo, r, sG / r)

        //draw smoothed cells from styles
        for (let s of this.styles) s.draw(cells, r, cg)

        //update legends
        //for (let s of this.styles)
        //    s.updateLegends({ style: s, r: r, zf: cg.getZf() });
    }
}
