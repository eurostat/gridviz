//@ts-check

import { Style } from "../viewer/Style"
import { Cell } from "../viewer/Dataset"
import { CanvasGeo } from "../viewer/CanvasGeo";

/**
 * 
 * @author Julien Gaffuri
 */
export class FlagStyle extends Style {

    /**
      * @param {Object} dict 
      */
    constructor(dict) {
        super(null)

        //dictionnary column -> color
        this.dict = dict;
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
            for (let column of Object.keys(this.dict))
                total += +cell[column]

            //draw flag elements
            let cumul = 0;
            for (let [column, color] of Object.entries(this.dict)) {

                //set color
                cg.ctx.fillStyle = color;

                //compute share
                const share = cell[column] / total;

                //draw flag element
                cg.ctx.fillRect(cumul * r + cg.geoToPixX(cell.x), cg.geoToPixY(cell.y), share * r, r);

                cumul += share;
            }

        }

        //draw stroke
        this.drawStroke(cells, resolution, cg)

    }

}
