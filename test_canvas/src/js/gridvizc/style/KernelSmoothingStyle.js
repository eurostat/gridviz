
//@ts-check

import { Style } from "../Style"
import { Cell, Envelope } from "../Dataset"
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

        const kw = []
        for (let wi = 0; wi <= kernelSize; wi++) {
            const col = []
            for (let wj = 0; wj <= kernelSize; wj++) {
                //compute weight at wi,wj
                const w = gaussian(wi, wj)
                col.push({ w: w, val: 0 })
            }
            kw.push(col)
        }
        return kw;
    }


    /**
    * Compute kernel smoothing.
    * 
    * @private
    * @param {Array.<Cell>} cells The cells to be smoothed
    * @param {Envelope} e 
    * @param {number} r 
    * @param {number} s 
    * @returns {Array.<Cell>}
    */
    kernelSmoothing(cells, e, r, s) {

        //compute extent
        const xMin = Math.floor(e.xMin / r) * r;
        const xMax = Math.floor(e.xMax / r) * r;
        const yMin = Math.floor(e.yMin / r) * r;
        const yMax = Math.floor(e.yMax / r) * r;

        //compute matrix dimensions
        const nbX = (xMax - xMin) / r + 1
        const nbY = (yMax - yMin) / r + 1

        //index input cells by i/j
        const ind = {}
        for (const c of cells) {
            // i,j of the cell
            const i = Math.floor((c.x - xMin) / r)
            const j = Math.floor((c.y - yMin) / r)
            if (!ind[i]) ind[i] = {}
            ind[i][j] = c
        }

        //get kernel matrix
        /** @type {Array.<Array.<{w:number,val:number}>>} */
        const km = this.getKernelMatrix(s)
        const kernelSize = km.length

        console.log(km)
        console.log(kernelSize)
        console.log(ind)

        //compute smoothing, cell by cell

        for (const i of Object.keys(ind)) {
            for (const j of Object.keys(ind[i])) {

                //get cell i,j
                const c = ind[i][j]

                //check if c is an input cell or a cell resulting from the smoothing already stored in 'cells'
                if (c.notInputCell) continue;

                /** 
                 * Value of cell c
                 * @type {number} */
                const val = this.value(c);

                //compute contribution of cell c with kernel window (ki,kj). store result in km.val field

                /** @type {number} */
                let sumWeights = 0;
                for (let ki = 0; ki <= kernelSize; ki++)
                    for (let kj = 0; kj <= kernelSize; kj++) {

                        //get kernel element
                        const ke = km[ki][kj]

                        //add contribution: its weight times its value
                        ke.val = ke.w * val

                        //keep sum of weights
                        sumWeights += ke.w;
                    }

                //add contributions to smoothed values
                for (let ki = -kernelSize; ki <= kernelSize; ki++)
                    for (let kj = -kernelSize; kj <= kernelSize; kj++) {

                        //check if target cell is within the view frame
                        if (+i + ki < 0 || +i + ki >= nbX || +j + kj < 0 || +j + kj >= nbY)
                            continue;

                        //get contribution (ki,kj)
                        const v = km[Math.abs(ki)][Math.abs(kj)].val
                        if (!v) continue;

                        //get cell at (i+ki,j+kj)
                        const c = ind[+i + ki][+j + kj]

                        //cell exist: add contribution
                        if (c) {
                            if (c.ksmval) c.ksmval += v
                            else c.ksmval = v
                        } else {
                            ind[i + ki][j + kj] = { x: xMin + (+i + ki) * r, y: yMin + (+j + kj) * r, ksmval: v, notInputCell: true }
                        }
                    }
            }

        }

        return cells;
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


        //create and fill input matrix with input figures, not smoothed
        /** @type {Array.<Array.<number>>} */
        /*let matrix = getEmptyMatrix(nbX, nbY);
        for (const c of cells) {
            if (c.x < xMin || c.x > xMax || c.y < yMin || c.y >= yMax)
                continue;
            const i = (c.x - xMin) / r
            const j = (c.y - yMin) / r
            matrix[i][j] = +this.value(c);
        }*/

        //get smoothing param in geo unit
        /** @type {number} */
        const sG = this.sigma(cg.zf)

        //compute smoothed matrix
        //matrix = this.kernelSmoothing(matrix, nbX, nbY, sG / r)

        //apply kernel smoothing
        cells = this.kernelSmoothing(cells, cg.extGeo, r, sG / r)

        //convert smoothed matrix into list of cells
        /** @type {Array.<Cell>} */
        /*const scells = []
        for (let i = 0; i < nbX; i++) {
            for (let j = 0; j < nbY; j++) {
                const c = { x: xMin + i * r, y: yMin + j * r }
                c["val"] = +matrix[i][j]
                scells.push(c)
            }
        }*/

        //draw smoothed cells from style
        this.style.draw(cells, r, cg);

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
/*function getEmptyMatrix(nbX, nbY) {
    const matrix = []
    for (let i = 0; i < nbX; i++) {
        const col = [];
        for (let j = 0; j < nbY; j++) {
            col.push(0);
        }
        matrix.push(col);
    }
    return matrix;
}*/

//See:
//NO https://github.com/Planeshifter/kernel-smooth/blob/master/examples/index.js
//NO https://github.com/jasondavies/science.js/tree/master/examples/kde
//NO https://gist.github.com/curran/b595fde4d771c5784421
//NO https://bl.ocks.org/rpgove/210f679b1087b517ce654b717e8247ac
//NO http://bl.ocks.org/rpgove/51621b3d35705b1a942a
//NO https://observablehq.com/@d3/kernel-density-estimation
