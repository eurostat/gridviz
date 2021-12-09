
//@ts-check

import { Style } from "../Style"
import { Cell } from "../Dataset"
import { CanvasGeo } from "../CanvasGeo";

/**
 * A style representing the cell as a smoothed layer, to smoothing local variations and show main trends across space.
 * 
 * @author Julien Gaffuri
 */
export class KernelSmoothingStyle extends Style {

    /** @param {object} opts */
    constructor(opts) {
        super(opts)
        opts = opts || {}

        /** A function specifying the value to consider for each cell. This is the value to smooth.
         * @private @type {function(Cell):number} @private */
        this.value = opts.value

        /** The smoothing parameter, in geo unit. The larger, the more smoothed.
         * @type {function(number):number} @private */
        this.sigma = opts.sigma

        /** Return the style to represent the smoothed cells.
         * @type {Style} @private */
        this.style = opts.style
    }


    /**
    * Compute kernel matrix, that is the matrix of the weights.
    * One quadrant is necessary only, since it is symetrical (along both x and y axes).
    * @param {number} s 
    * @returns {Array.<Array<number>>}
    * @private
    */
    getKernelMatrix(s) {

        //the size of the window: lets limit that to ~4 times the standard deviation, as an approximation.
        const windowSize = Math.floor(3 * s) + 1;

        //prepare coefficients for gaussian computation, to avoid computing them every time.
        const c2 = 2 * s * s;

        /**
         * The gaussian function. TODO expose that function as a parameter, to use other kernels ?
         * @param {number} x 
         * @param {number} y 
         * @returns {number}
         */
        const gaussian = (x, y) => Math.exp(-(x * x + y * y) / c2)

        const kw = []
        for (let wi = 0; wi <= windowSize; wi++) {
            const col = []
            for (let wj = 0; wj <= windowSize; wj++) {
                //compute weight at wi,wj
                const val = gaussian(wi, wj)
                col.push(val)
            }
            kw.push(col)
        }
        return kw;
    }


    /**
    * Compute kernel smoothing.
    * 
    * @private
    * @param {Array.<Array.<number>>} m The input matrix to be smoothed
    * @param {number} nbX Size of the input matrix - X
    * @param {number} nbY Size of the input matrix - Y
    * @param {number} s 
    * @returns {Array.<Array.<number>>}
    */
    kernelSmoothing(m, nbX, nbY, s) {

        //create output matrix
        /** @type {Array.<Array.<number>>} */
        const out = getEmptyMatrix(nbX, nbY);

        //compute window matrix, that is the matrix of the weights
        //one quadrant is necessary only, since it is symetrical (along both x and y axes)
        /** @type {Array.<Array.<number>>} */
        const km = this.getKernelMatrix(s)
        const windowSize = km.length - 1

        //make smoothing, cell by cell
        for (let i = 0; i < nbX; i++) {
            for (let j = 0; j < nbY; j++) {

                //compute smoothed value, at i,j
                /** @type {number} */
                let sval = 0;
                /** @type {number} */
                let sumWeights = 0;

                //moving window (wi,wj)
                for (let wi = -windowSize; wi <= windowSize; wi++)
                    for (let wj = -windowSize; wj <= windowSize; wj++) {

                        //TODO use symetric
                        if (i + wi < 0 || i + wi >= nbX || j + wj < 0 || j + wj >= nbY)
                            continue;

                        //get weight of pixel (i+wi,j+wj)
                        const weight = km[Math.abs(wi)][Math.abs(wj)]

                        //add contribution of pixel (i+wi,j+wj): its weight times its value
                        sval += weight * m[i + wi][j + wj]

                        //keep sum of weights
                        sumWeights += weight;
                    }
                //smoothed value
                out[i][j] = sval / sumWeights
            }
        }
        return out;
    }


    /**
     * Draw cells as squares depending on their value.
     * 
     * @param {Array.<Cell>} cells 
     * @param {number} r 
     * @param {CanvasGeo} cg 
     */
    draw(cells, r, cg) {

        if (!cells || cells.length == 0)
            return;

        //compute extent
        const e = cg.updateExtentGeo();
        const xMin = Math.floor(e.xMin / r) * r;
        const xMax = Math.floor(e.xMax / r) * r;
        const yMin = Math.floor(e.yMin / r) * r;
        const yMax = Math.floor(e.yMax / r) * r;

        //compute matrix dimensions
        const nbX = (xMax - xMin) / r + 1
        const nbY = (yMax - yMin) / r + 1

        //create and fill input matrix with input figures, not smoothed
        /** @type {Array.<Array.<number>>} */
        let matrix = getEmptyMatrix(nbX, nbY);
        for (const c of cells) {
            if (c.x < xMin || c.x > xMax || c.y < yMin || c.y >= yMax)
                continue;
            const i = (c.x - xMin) / r
            const j = (c.y - yMin) / r
            matrix[i][j] = +this.value(c);
        }

        //get smoothing param in geo unit
        /** @type {number} */
        const sG = this.sigma(cg.zf)

        //compute smoothed matrix
        /** @type {Array.<Array.<number>>} */
        matrix = this.kernelSmoothing(matrix, nbX, nbY, sG / r)

        //convert smoothed matrix into list of cells
        /** @type {Array.<Cell>} */
        const scells = []
        for (let i = 0; i < nbX; i++) {
            for (let j = 0; j < nbY; j++) {
                /** @type {Cell} */
                const c = { x: xMin + i * r, y: yMin + j * r }
                c["val"] = +matrix[i][j]
                scells.push(c)
            }
        }

        //draw smoothed cells from style
        this.style.draw(scells, r, cg);

    }


    //getters and setters

    /** @returns {function(Cell):number} */
    getValue() { return this.value; }
    /** @param {function(Cell):number} val @returns {this} */
    setValue(val) { this.value = val; return this; }

    /** @returns {function(number):number} */
    getSigmaGeo() { return this.sigma; }
    /** @param {function(number):number} val @returns {this} */
    setSigmaGeo(val) { this.sigma = val; return this; }

    /** @returns {Style} */
    getStyle() { return this.style; }
    /** @param {Style} val @returns {this} */
    setStyle(val) { this.style = val; return this; }

}


/**
 * Create a matrix full of zeros.
 * 
 * @param {number} nbX 
 * @param {number} nbY 
 * @returns {Array.<Array.<number>>}
 */
function getEmptyMatrix(nbX, nbY) {
    const matrix = []
    for (let i = 0; i < nbX; i++) {
        const col = [];
        for (let j = 0; j < nbY; j++) {
            col.push(0);
        }
        matrix.push(col);
    }
    return matrix;
}

//See:
//NO https://github.com/Planeshifter/kernel-smooth/blob/master/examples/index.js
//NO https://github.com/jasondavies/science.js/tree/master/examples/kde
//NO https://gist.github.com/curran/b595fde4d771c5784421
//NO https://bl.ocks.org/rpgove/210f679b1087b517ce654b717e8247ac
//NO http://bl.ocks.org/rpgove/51621b3d35705b1a942a
//NO https://observablehq.com/@d3/kernel-density-estimation
