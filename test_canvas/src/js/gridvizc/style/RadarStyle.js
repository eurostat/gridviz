//@ts-check

import { Style, Size } from "../Style"
import { Cell } from "../Dataset"
import { CanvasGeo } from "../CanvasGeo";

/** @typedef {"square"|"circle"} Shape */

/**
 * 
 * @author Julien Gaffuri
 */
export class RadarStyle extends Style {

    /**
      * @param {Object} color The dictionary which give the color of each category.
      * @param {Size} size 
      */
    constructor(color, size) {
        super()

        //dictionnary column -> color
        /** @private @type {object} */
        this.color = color;

        /** @private @type {Size} */
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

        for (let cell of cells) {

            //draw decomposition symbol
            for (let [column, color] of Object.entries(this.color)) {

                //set color
                cg.ctx.fillStyle = color;

                //TODO get size

                //TODO draw fill
                //TODO draw stroke ?
            }

        }

    }

}
