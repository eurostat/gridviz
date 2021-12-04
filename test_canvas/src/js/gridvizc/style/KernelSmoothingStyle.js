
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
        //https://github.com/Planeshifter/kernel-smooth/blob/master/examples/index.js
        //https://gist.github.com/curran/b595fde4d771c5784421
        //https://github.com/jasondavies/science.js/tree/master/examples/kde

        //https://bl.ocks.org/rpgove/210f679b1087b517ce654b717e8247ac
        //https://observablehq.com/@d3/kernel-density-estimation

        
    }


    //getters and setters
    //TODO

}
