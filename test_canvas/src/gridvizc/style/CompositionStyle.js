//@ts-check

import { Style } from "../viewer/Style"
import { Cell } from "../viewer/Dataset"
import { CanvasGeo } from "../viewer/CanvasGeo";

/**
 * 
 * TODO update description
 * Pie chart - ring - flag
 * This style shows for each cell a square with vertical stripes representing a decomposition.
 * The square can be scaled depending on the cell importance.
 * 
 * @author Julien Gaffuri
 */
export class CompositionStyle extends Style {

    /**
      * @param {Object} color The dictionary which give the color of each category.
      * @param {function} type A function returning the type of decomposition symbol of a cell: Among 'flag', 'piechart' and 'ring'
      * @param {function} size A function returning the size of a cell (in geographical unit).
      */
    constructor(color, type = null, size = null) {
        super()

        //dictionnary column -> color
        /** @type {object} */
        this.color = color;

        /** @type {function} */
        this.type = type;

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

        //TODO if size provided, sort cells by size to draw the larger below

        for (let cell of cells) {

            //compute total
            let total = 0;
            for (let column of Object.keys(this.color))
                total += +cell[column]

            //size - in ground meters
            let sG = this.size ? this.size(cell) : resolution;
            //size - in pixel
            const s = sG / cg.zf

            //get symbol type
            const type_ = this.type? this.type(cell) : "flag"

            //draw decomposition symbol
            let cumul = 0;
            const d = resolution * (1 - sG / resolution) * 0.5
            for (let [column, color] of Object.entries(this.color)) {

                //set color
                cg.ctx.fillStyle = color;

                //compute share
                const share = cell[column] / total;

                if (type_ === "flag") {
                    //draw flag element
                    cg.ctx.fillRect(cumul * s + cg.geoToPixX(cell.x + d), cg.geoToPixY(cell.y + resolution - d), share * s, s);
                } else if (type_ === "piechart") {
                    //TODO
                } else if (type_ === "ring") {
                    //TODO
                }

                cumul += share;
            }

        }

        //draw stroke
        //TODO adapt shape to all cases
        this.drawStroke(cells, resolution, cg, () => "square", this.size)
    }

}
