//@ts-check

import { Style } from "../viewer/Style"
import { Cell } from "../viewer/Dataset"
import { CanvasGeo } from "../viewer/CanvasGeo";

/**
 * 
 * This style shows for each cell a square with vertical stripes representing a decomposition.
 * The square can be scaled depending on the cell importance.
 * 
 * @author Julien Gaffuri
 */
export class FlagStyle extends Style {

    /**
      * @param {Object} color The dictionary which give the color of each category.
      * @param {function} size A function returning the size of a cell (in geographical unit).
      */
    constructor(color, size = null) {
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
        const r = resolution / cg.ps;
        for (let cell of cells) {

            //compute total
            let total = 0;
            for (let column of Object.keys(this.color))
                total += +cell[column]

            //draw flag elements
            let cumul = 0;
            for (let [column, color] of Object.entries(this.color)) {

                //set color
                cg.ctx.fillStyle = color;

                //compute share
                const share = cell[column] / total;

                //draw flag element
                //TODO use size function
                cg.ctx.fillRect(cumul * r + cg.geoToPixX(cell.x), cg.geoToPixY(cell.y), share * r, r);

                cumul += share;
            }

        }

        //draw stroke
        this.drawStroke(cells, resolution, cg, () => "square", this.size)

    }

}
