//@ts-check

import { Style } from "../viewer/Style"
import { Cell } from "../viewer/Dataset"
import { CanvasGeo } from "../viewer/CanvasGeo";
import { interpolateReds } from "d3-scale-chromatic"

/**
 * 
 * @author Julien Gaffuri
 */
export class ShapeColorSizeStyle extends Style {

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

        //TODO if by size, sort them

        for (let cell of cells) {

            //color
            const cv = this.getColorValue(cell);
            cg.ctx.fillStyle = this.getColor(cv);

            //size - in ground meters
            const sv = this.getSizeValue(cell);
            const sG = this.getSizeGeo(sv);
            //size - in pixels
            const s = sG / cg.ps

            //draw square
            const d = resolution * (1-sG/resolution) * 0.5
            cg.ctx.fillRect(cg.geoToPixX(cell.x+d), cg.geoToPixY(cell.y+resolution-d), s, s);

            //draw circle
            cg.ctx.beginPath();
            cg.ctx.arc(cg.geoToPixX(cell.x + resolution*0.5), cg.geoToPixY(cell.y + resolution*0.5), s*0.5, 0, 2 * Math.PI, false);
            cg.ctx.fill();
        }

        //draw stroke
        this.drawStroke(cells, resolution, cg, (cell) => this.getSizeGeo(this.getSizeValue(cell)) )
    }


    /**
     * Get the statistical value to use for the color.
     * 
     * @param {Cell} cell 
     * @returns {number}
     */
    getColorValue(cell) {
        return this.getValue(cell);
    }

    /**
     * Get the statistical value to use for the size.
     * 
     * @param {Cell} cell 
     * @returns {number}
     */
     getSizeValue(cell) {
        if (this.size instanceof Function || typeof this.size === "function")
            return this.size(cell);
        else
            return cell[this.size];
    }



    //TODO better expose that
    getColor(v) {
        return interpolateReds(v / 200)
    }

    //TODO better expose that
    getSizeGeo(v) {
        return 1000*Math.sqrt(v/30000)
    }

}
