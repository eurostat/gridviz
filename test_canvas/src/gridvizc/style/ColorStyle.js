//@ts-check

import { Style } from "../viewer/Style"
import { Cell } from "../viewer/Dataset"
import { CanvasGeo } from "../viewer/CanvasGeo";
import { interpolateReds } from "d3-scale-chromatic"

/**
 * 
 * @author Julien Gaffuri
 */
export class ColorStyle extends Style {

    /**
      * @param {string|function} value 
      */
    constructor(value) {
        super(value)
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
            //get value
            const value = this.getValue(cell);
            //get color
            cg.ctx.fillStyle = this.getColor(value);
            //draw square
            cg.ctx.fillRect(cg.geoToPixX(cell.x), cg.geoToPixY(cell.y), resolution / cg.ps, resolution / cg.ps);
        }

        //draw stroke
        this.drawStroke(cells, resolution, cg)
    }

    //TODO better expose that
    getColor(v) {
        return interpolateReds(v / 200)
    }

}
