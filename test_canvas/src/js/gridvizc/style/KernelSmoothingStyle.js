
//@ts-check

import { Style } from "../Style"
import { Cell } from "../Dataset"
import { CanvasGeo } from "../CanvasGeo";

/**
 * 
 * @author Julien Gaffuri
 */
export class KernelSmoothingStyle extends Style {

    constructor(value, sigmaGeo) {
        super()

        /** @private @type {function(Cell):number} */
        this.value = value;

        /** @type {number} */
        this.sigmaGeo = sigmaGeo
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
        let matrix = getEmptyMatrix(nbX, nbY);
        for (const c of cells) {
            if (c.x < xMin || c.x > xMax || c.y < yMin || c.y >= yMax)
                continue;
            const i = (c.x - xMin) / r
            const j = (c.y - yMin) / r
            matrix[i][j] = +this.value(c);
        }

        //compute smoothed matrix
        matrix = kernelSmoothing(matrix, nbX, nbY, this.sigmaGeo / r)

        //draw smoothed matrix
        //TODO

    }


    //getters and setters
    //TODO

}


/**
 * Create a matrix full of zeros.
 * 
 * @param {number} nbX 
 * @param {number} nbY 
 * @returns 
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


/**
 * Compute kernel smoothing.
 * 
 * @param {Array.<Array.<number>>} m The input matrix to be smoothed
 * @param {number} nbX Size of the input matrix - X
 * @param {number} nbY Size of the input matrix - Y
 * @param {number} sigma Smoothing std deviation, in number of cells
 * @returns {Array.<Array.<number>>}
 */
function kernelSmoothing(m, nbX, nbY, sigma) {

    //create output matrix
    const out = getEmptyMatrix(nbX, nbY);

    //prepare coefficients for gaussian computation
    //to avoid computing them every time.
    const c2 = 2 * sigma * sigma;

    //the gaussian function.
    const gaussian = (x, y) => Math.exp(-(x * x + y * y) / c2)

    //the size of the window: lets limit that to 3 times the standard deviation, as an approximation.
    const windowSize = Math.floor(3 * sigma) + 1;

    //compute window matrix, that is the matrix of the weights
    //one quadrant is necessary only, since it is symetrical (with 2 axes)
    const window = []
    for (let wi = 0; wi <= windowSize; wi++) {
        const col = []
        for (let wj = 0; wj <= windowSize; wj++) {
            //compute weight at wi,wj
            const val = gaussian(wi, wj)
            col.push(val)
        }
        window.push(col)
    }
    console.log(window)

    //make smoothing, cell by cell
    for (let i = 0; i < nbX; i++) {
        for (let j = 0; j < nbY; j++) {

            //compute smoothed value, at i,j
            let sval = 0;
            let sumWeights = 0;

            //moving window (wi,wj)
            for (let wi = -windowSize; wi <= windowSize; wi++)
                for (let wj = -windowSize; wj <= windowSize; wj++) {

                    //TODO use symetric
                    if (i + wi < 0 || i + wi >= nbX || j + wj < 0 || j + wj >= nbY)
                        continue;

                    //get weight of pixel (i+wi,j+wj)
                    const weight = window[Math.abs(wi)][Math.abs(wj)]

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


        //See:
        //NO https://github.com/Planeshifter/kernel-smooth/blob/master/examples/index.js
        //NO https://github.com/jasondavies/science.js/tree/master/examples/kde
        //NO https://gist.github.com/curran/b595fde4d771c5784421

        //NO https://bl.ocks.org/rpgove/210f679b1087b517ce654b717e8247ac
        //NO http://bl.ocks.org/rpgove/51621b3d35705b1a942a
        //https://observablehq.com/@d3/kernel-density-estimation
