//@ts-check

import { Style } from "../Style"
import { Cell } from "../Dataset"
import { GeoCanvas } from "../GeoCanvas";

/**
 * A very generic style that shows grid cells with specific color, size and shape.
 * It can be used to show variables as cell colors, cell size, cell shape, or any combination of the three visual variables.
 * 
 * @author Julien Gaffuri
 */
export class WebGLTestStyle extends Style {

    /** @param {object} opts */
    constructor(opts) {
        super(opts)
    }


    /**
     * Draw cells as squares, with various colors and size.
     * 
     * @param {Array.<Cell>} cells 
     * @param {number} resolution 
     * @param {GeoCanvas} cg 
     */
    draw(cells, resolution, cg) {
        //zoom factor
        const zf = cg.getZf()


        //1
        //test: create canvas, same size
        //draw in canvas
        //draw canvas on canvas
        //check overlap - canvas transparency

        //2
        //same but draw with webGL

    }

}
