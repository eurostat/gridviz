//@ts-check

import { Style } from "../viewer/Style"
import { Cell } from "../viewer/Dataset"
import { CanvasGeo } from "../viewer/CanvasGeo";

export class FlagStyle extends Style {

    /**
      * @param {Object} dict 
      * @param {number} psStroke 
      */
    constructor(dict, psStroke) {
        super(null)

        //dictionnary column -> color
        this.dict = dict;

        this.psStroke = psStroke;
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
                c2.fillStyle = color;

                //compute share
                const share = cell[column] / total;

                //draw flag element
                c2.fillRect(cumul * r + cg.geoToPixX(cell.x), cg.geoToPixY(cell.y), share * r, r);

                cumul += share;
            }

        }

        //draw stroke
        if (this.psStroke && cg.ps < this.psStroke) {
            c2.fillStyle = "darkgray";
            for (let cell of cells) {
                c2.beginPath();
                c2.rect(cg.geoToPixX(cell.x), cg.geoToPixY(cell.y), r, r);
                c2.stroke();
            }
        }

    }

}
