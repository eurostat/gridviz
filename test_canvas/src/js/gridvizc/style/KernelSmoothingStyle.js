//@ts-check

import { Style } from "../Style"
import { Cell, Envelope } from "../DatasetComponent"
import { GeoCanvas } from "../GeoCanvas";

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
         * @private @type {function(Cell):number} @private */
        this.value = opts.value

        /** The smoothing parameter, in geo unit. The larger, the more smoothed.
         * @type {function(number|number):number} @private */
        this.sigma = opts.sigma // (r, zf)=>...

        /** The styles to represent the smoothed cells.
         * @type {Array.<Style>} @private */
        this.styles = opts.styles
    }


    /**
    * Compute the kernel matrix, that is the matrix of the weights.
    * One quadrant is necessary only, since it is symetrical (along both x and y axes).
    * @param {number} s Sigma (in grid pixel !)
    * @returns {Array.<Array<{w:number,val:number}>>}
    * @private
    */
    getKernelMatrix(s) {

        //the size of the kernel: lets limit that to ~4 times the standard deviation, as an approximation.
        const kernelSize = Math.floor(3 * s);

        //prepare coefficients for gaussian computation, to avoid computing them every time.
        const c2 = 2 * s * s;

        /**
         * The gaussian function. TODO expose that function as a parameter, to use other kernels ?
         * @param {number} x 
         * @param {number} y 
         * @returns {number}
         */
        const gaussian = (x, y) => Math.exp(-(x * x + y * y) / c2)

        /** @type {Array.<Array<{w:number,val:number}>>} */
        const kw = []
        for (let wi = 0; wi <= kernelSize; wi++) {
            /** @type {Array<{w:number,val:number}>} */
            const col = []
            for (let wj = 0; wj <= kernelSize; wj++) {
                //compute weight at wi,wj
                /** @type {number} */
                const w = gaussian(wi, wj)
                col.push({ w: w, val: 0 })
            }
            kw.push(col)
        }
        return kw;
    }


    /**
    * Compute kernel smoothing of some cells.
    * 
    * @private
    * @param {Array.<Cell>} cells The cells to be smoothed.
    * @param {Envelope} e Geo envelope to consider.
    * @param {number} r Resolution, in geo unit.
    * @param {number} s Sigma (in grid pixel !)
    * @returns {Array.<Cell>} The list of cells, including the initial ones and the ones with smoothed values, in "ksmval" property.
    */
    kernelSmoothing(cells, e, r, s) {

        //compute extent, in grid position
        const xMin = Math.floor(e.xMin / r) * r;
        const xMax = Math.floor(e.xMax / r) * r;
        const yMin = Math.floor(e.yMin / r) * r;
        const yMax = Math.floor(e.yMax / r) * r;

        //compute matrix dimensions
        const nbX = (xMax - xMin) / r + 1
        const nbY = (yMax - yMin) / r + 1

        //initialise smoothed value to 0
        for (const c of cells) c["ksmval"] = 0

        //index input cells by i/j (grid position)
        const index = {}
        for (const c of cells) {
            // i,j of the cell
            const i = Math.floor((c.x - xMin) / r)
            const j = Math.floor((c.y - yMin) / r)
            if (!index[i]) index[i] = {}
            index[i][j] = c
        }

        //get kernel matrix
        /** @type {Array.<Array.<{w:number,val:number}>>} */
        const kernelMatrix = this.getKernelMatrix(s)
        const kernelSize = kernelMatrix.length

        //compute smoothing, cell by cell

        for (const i_ of Object.keys(index)) {
            const i = +i_
            for (const j_ of Object.keys(index[i_])) {
                const j = +j_

                //get cell i,j
                const c = index[i][j]

                //check if c is an input cell or a cell resulting from the smoothing already stored in 'cells'
                if (c.notInputCell) continue;

                /** 
                 * get value of cell c
                 * @type {number} */
                const val = this.value(c);
                if (!val) continue

                //compute contribution of cell c across kernel window (ki,kj).
                //store contributions in kernelMatrix.val field.

                /** @type {number} */
                let sumWeights = 0;
                for (let ki = 0; ki < kernelSize; ki++) {
                    for (let kj = 0; kj < kernelSize; kj++) {

                        //get kernel element
                        const ke = kernelMatrix[ki][kj]

                        //add contribution: the weight X the value
                        ke.val = ke.w * val

                        //keep sum of weights
                        sumWeights += ke.w;
                    }
                }

                /** Check that the cell i,j is within the frame */
                const isWithinFrame = (i, j) => i >= 0 && i < nbX && j >= 0 && j < nbY
                /** Add v as a contribution to the cell i,j */
                const addContributionTo = (i, j, v) => {
                    //get cell at (i+ki,j+kj)
                    const c_ = index[i] ? index[i][j] : undefined

                    if (c_) {
                        //cell exists: add contribution
                        if (c_["ksmval"]) c_["ksmval"] += v
                        else c_["ksmval"] = v
                    } else {
                        //cell does not exist: create a new one with the smoothed value
                        if (!index[i]) index[i] = {}
                        index[i][j] = { x: xMin + i * r, y: yMin + j * r, ksmval: v, notInputCell: true }
                    }
                }

                //add contributions to smoothed values
                for (let ki = 0; ki < kernelSize; ki++) {
                    for (let kj = 0; kj < kernelSize; kj++) {

                        //get contribution (ki,kj)
                        let ke = kernelMatrix[Math.abs(ki)][Math.abs(kj)]
                        if (!ke) continue
                        let v = ke.val
                        if (!v) continue;
                        v /= sumWeights
                        if (!v) continue;

                        //add contributions to 4 similar cells, if they are within the frame of course
                        if (isWithinFrame(i + ki, j + kj))
                            addContributionTo(i + ki, j + kj, v)

                        if (ki == 0 && kj == 0) continue;

                        if (isWithinFrame(i - ki, j + kj))
                            addContributionTo(i - ki, j + kj, v)

                        if (ki == 0) continue;
                        if (isWithinFrame(i + ki, j - kj))
                            addContributionTo(i + ki, j - kj, v)
                        if (isWithinFrame(i - ki, j - kj))
                            addContributionTo(i - ki, j - kj, v)
                    }
                }
            }
        }

        //make output list
        const out = []
        for (let i of Object.keys(index))
            for (const j of Object.keys(index[i]))
                out.push(index[i][j])

        return out;
    }


    /**
     * Draw cells as squares depending on their value.
     * 
     * @param {Array.<Cell>} cells 
     * @param {number} r 
     * @param {GeoCanvas} cg 
     */
    draw(cells, r, cg) {

        if (!cells || cells.length == 0)
            return;

        //get smoothing param in geo unit
        /** @type {number} */
        const sG = this.sigma(r, cg.zf)

        //apply kernel smoothing
        cells = this.kernelSmoothing(cells, cg.extGeo, r, sG / r)

        //draw smoothed cells from styles
        for (let s of this.styles)
            s.draw(cells, r, cg);
    }


    //getters and setters

    /** @returns {function(Cell):number} */
    getValue() { return this.value; }
    /** @param {function(Cell):number} val @returns {this} */
    setValue(val) { this.value = val; return this; }

    /** @returns {function(number|number):number} */
    getSigma() { return this.sigma; }
    /** @param {function(number|number):number} val @returns {this} */
    setSigma(val) { this.sigma = val; return this; }

    /** @returns {Array.<Style>} */
    getStyles() { return this.styles; }
    /** @param {Array.<Style>} val @returns {this} */
    setStyles(val) { this.styles = val; return this; }

}
