//@ts-check

import { Style } from "../viewer/Style"
import { Cell } from "../viewer/Dataset"
import { CanvasGeo } from "../viewer/CanvasGeo";

/**
 * 
 * @author Julien Gaffuri
 */
export class MultiStyle extends Style {

    /**
      * @param {Object} color The dictionary which give the color of each category.
      * @param {function} type
      */
    constructor(color, type = null) {
        super()

        //dictionnary column -> color
        /** @type {object} */
        this.color = color;

        /** @type {function} */
        this.type = type;
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

            //get symbol type
            const type_ = this.type ? this.type(cell) : "radar"

            //draw decomposition symbol
            for (let [column, color] of Object.entries(this.color)) {

                //set color
                cg.ctx.fillStyle = color;

                //draw symbol part
                if (type_ === "radar") {
                    //TODO
                } else if (type_ === "multi") {
                    //TODO
                } else {
                    throw new Error('Unexpected symbol type:' + type_);
                }

                //TODO draw the stroke ?
            }

        }

    }

}
