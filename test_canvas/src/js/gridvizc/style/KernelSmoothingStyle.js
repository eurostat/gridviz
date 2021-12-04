
//@ts-check

import { Style } from "../Style"
import { Cell } from "../Dataset"
import { CanvasGeo } from "../CanvasGeo";

/**
 * 
 * @author Julien Gaffuri
 */
export class KernelSmoothingStyle extends Style {

    constructor(value) {
        super()

        /** @private @type {function(Cell):number} */
        this.value = value;

        /** @type {number} */
        this.sigmaGeo = 10000
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

        //TODO
        //See:
        //NO https://github.com/Planeshifter/kernel-smooth/blob/master/examples/index.js
        //NO https://github.com/jasondavies/science.js/tree/master/examples/kde
        //NO https://gist.github.com/curran/b595fde4d771c5784421

        //NO https://bl.ocks.org/rpgove/210f679b1087b517ce654b717e8247ac
        //NO http://bl.ocks.org/rpgove/51621b3d35705b1a942a
        //https://observablehq.com/@d3/kernel-density-estimation

        //compute extent
        const e = cg.updateExtentGeo();
        const xMin = Math.floor(e.xMin / r) * r;
        const xMax = Math.floor(e.xMax / r) * r;
        const yMin = Math.floor(e.yMin / r) * r;
        const yMax = Math.floor(e.yMax / r) * r;

        const nbX = (xMax - xMin) / r + 1
        const nbY = (yMax - yMin) / r + 1
        console.log(nbX, nbY)

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

        console.log(matrix)

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
    const c1 = sigma * Math.sqrt(2 * Math.PI);
    const c2 = 2 * sigma * sigma;

    //the gaussian function.
    const gaussian = (x) => Math.exp(-x * x / c2) / c1

    //the size of the window: lets limit that to 5 times the standard deviation, as an approximation.
    const windowSize = Math.floor(5 * sigma) + 1;

    //make smoothing, cell by cell
    for (let i = 0; i < nbX; i++) {
        for (let j = 0; j < nbY; j++) {
            //compute smoothed value, at i,j
            let sval = 0;
            let sumWeights = 0;
            for (let wi = -windowSize; wi <= windowSize; wi++)
                for (let wj = -windowSize; wj <= windowSize; wj++) {
                    //compute weight of pixel (i+wi,j+wj)
                    const weight = gaussian( Math.sqrt(wi*wi+wj*wj) ); //TODO with gaussian
                    //add contribution of pixel (i+wi,j+wj): its weight times its value
                    sval += weight * m[i+wi][j+wj]
                    //keep sum of weights
                    sumWeights += weight;
                }
            //TODO check sumWeights is (almost) equal to 1
            out[i][j] = sval / sumWeights
        }
    }
    return out;
}
