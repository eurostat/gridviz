//@ts-check

import { Style } from "../viewer/Style"
import { Cell } from "../viewer/Dataset"
import { CanvasGeo } from "../viewer/CanvasGeo";
import { interpolateReds } from "d3-scale-chromatic"

/**
 * 
 * @author Julien Gaffuri
 */
export class SquareStyle extends Style {

    /**
      * @param {string|function} color The attribute to use for the color
      * @param {number|function} size The attribute to use for the size
      */
    constructor(color, size) {
        super(color)

        /** @type {number|function} */
        this.size = size;

    }


    /**
     * Draw cells as squares, with various colors and size.
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

    //TODO better expose that
    getSize(v) {
        return v/1000
    }

}
