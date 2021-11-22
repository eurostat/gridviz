//@ts-check

import { Style } from "../viewer/Style"
import { Cell } from "../viewer/Dataset"
import { CanvasGeo } from "../viewer/CanvasGeo";

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
        const c2 = cg.c2d
        for (let cell of cells) {

            //compute total
            let total = 0;
            for (let column of Object.keys(this.dict))
                total += cell[column]

            //draw flag elements
            for (let [column, color] of Object.entries(this.dict)) {
                //set color
                c2.fillStyle = color;
                //compute share
                const share = cell[column] / total;
                //draw flag element
                c2.fillRect(cg.geoToPixX(cell.x), cg.geoToPixY(cell.y), resolution / cg.ps, share * resolution / cg.ps);
            }

        }
    }

}
