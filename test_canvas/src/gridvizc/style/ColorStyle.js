//@ts-check

import { Style } from "../viewer/Style"
import { Cell } from "../viewer/Dataset"
import { CanvasGeo } from "../viewer/CanvasGeo";
import { interpolateReds } from "d3-scale-chromatic"

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
        const c2 = cg.c2d
        for (let cell of cells) {
            //get value
            const value = this.getValue(cell);
            //get color
            c2.fillStyle = this.getColor(value);
            //draw square
            c2.fillRect(cg.geoToPixX(cell.x), cg.geoToPixY(cell.y), resolution / cg.ps, resolution / cg.ps);
        }
    }

    //TODO better expose that
    getColor(v) {
        return interpolateReds(v / 200)
    }

}
