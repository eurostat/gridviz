
//@ts-check

import { Style } from "../Style"
import { Cell } from "../Dataset"
import { CanvasGeo } from "../CanvasGeo";

/**
 * 
 * @author Julien Gaffuri
 */
export class KernelSmoothingStyle extends Style {

    constructor() {
        super()

        /** @type {number} */
        this.sigma = 10000

        //prepare coefficients for gaussian computation
        const c1 = this.sigma * Math.sqrt(2 * Math.PI);
        const c2 = 2 * this.sigma * this.sigma;

        /**
         * The gaussian function.
         * 
         * @param {number} x 
         * @returns {number}
         * @private
         */
        this.gaussian = (x) => Math.exp(-x * x / c2) / c1
    }


    /**
     * Draw cells as squares depending on their value.
     * 
     * @param {Array.<Cell>} cells 
     * @param {number} r 
     * @param {CanvasGeo} cg 
     */
    draw(cells, r, cg) {

        //TODO
        //See:
        //NO https://github.com/Planeshifter/kernel-smooth/blob/master/examples/index.js
        //NO https://github.com/jasondavies/science.js/tree/master/examples/kde
        //NO https://gist.github.com/curran/b595fde4d771c5784421

        //NO https://bl.ocks.org/rpgove/210f679b1087b517ce654b717e8247ac
        //http://bl.ocks.org/rpgove/51621b3d35705b1a942a
        //https://observablehq.com/@d3/kernel-density-estimation

        //compute extent
        const e = cg.extGeo;
        const xMin = Math.floor(e.xMin / r) * r;
        const xMax = Math.floor(e.xMax / r) * r;
        const yMin = Math.floor(e.yMin / r) * r;
        const yMax = Math.floor(e.yMax / r) * r;

        //draw pixels
        for (let y = yMin; y <= yMax; y += r) {
            for (let x = xMin; x <= xMax; x += r) {
                //compute smoothed value
                


            }
        }
    }




    //getters and setters
    //TODO

}

