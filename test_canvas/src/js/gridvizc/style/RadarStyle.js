//@ts-check

import { Style } from "../Style"
import { Cell } from "../Dataset"
import { CanvasGeo } from "../CanvasGeo";

/**
 * 
 * @author Julien Gaffuri
 */
export class RadarStyle extends Style {

    /**
      * @param {Object} color The dictionary which give the color of each category.
      * @param {function} size The dictionary which give the color of each category.
      */
    constructor(color, size) {
        super()

        //dictionnary column -> color
        /** @type {object} */
        this.color = color;

        /** @type {function} */
        this.size = size;
    }


    /**
     * Draw cells as squares depending on their value.
     * 
     * @param {Array.<Cell>} cells 
     * @param {number} resolution 
     * @param {CanvasGeo} cg 
     */
    draw(cells, resolution, cg) {

        //TODO sort cells by size to draw the larger below

        for (let cell of cells) {

            //draw decomposition symbol
            for (let [column, color] of Object.entries(this.color)) {

                //set color
                cg.ctx.fillStyle = color;

                //get size
                //TODO

                //TODO draw fill
                //TODO draw the stroke ?
            }

        }

    }

}
