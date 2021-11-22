//@ts-check

import { Style } from "../viewer/Style"
import { Cell } from "../viewer/Dataset"
import { CanvasGeo } from "../viewer/CanvasGeo";

/**
 * 
 * @author Julien Gaffuri
 */
export class LineStyle extends Style {

    /**
      * @param {string|function} value 
      * @param {function} valueToHeightFun 
      */
    constructor(value, valueToHeightFun) {
        super(value)

        /** @type {function} */
        this.valueToHeightFun = valueToHeightFun;

        /** @type {string} */
        this.lineColor_ = "gray"
        /** @type {number} */
        this.lineWidth_ = 1;
        /** @type {string} */
        this.fillColor_ = "rgba(192, 140, 89, 0.4)"
    }


    /**
     * Draw cells as squares depending on their value.
     * 
     * @param {Array.<Cell>} cells 
     * @param {number} resolution 
     * @param {CanvasGeo} cg 
     */
    draw(cells, resolution, cg) {

        //index cells by y and x
        const ind = {};
        for (const cell of cells) {
            let row = ind[cell.y];
            if (!row) { row = {}; ind[cell.y] = row }
            row[cell.x] = +this.getValue(cell);
        }

        //compute extent
        const e = cg.extGeo;
        const xMin = Math.floor(e.xMin / resolution) * resolution;
        const xMax = Math.floor(e.xMax / resolution) * resolution;
        const yMin = Math.floor(e.yMin / resolution) * resolution;
        const yMax = Math.floor(e.yMax / resolution) * resolution;

        //set color and width
        cg.ctx.strokeStyle = this.lineColor_;
        cg.ctx.lineWidth = this.lineWidth_;
        cg.ctx.fillStyle = this.fillColor_;

        for (let y = yMin; y <= yMax; y += resolution) {
            cg.ctx.beginPath();

            //first point
            cg.ctx.moveTo(cg.geoToPixX(xMin - resolution / 2), cg.geoToPixY(y));

            //get row
            const row = ind[y]

            if (row) {
                for (let x = xMin; x <= xMax; x += resolution) {
                    //get value
                    let v = row[x];
                    if (v) {
                        //TODO test bezierCurveTo
                        cg.ctx.lineTo(cg.geoToPixX(x + resolution / 2), cg.geoToPixY(y) - this.valueToHeightFun(v));
                    } else {
                        //TODO cg.ctx.moveTo
                        cg.ctx.moveTo(cg.geoToPixX(x + resolution / 2), cg.geoToPixY(y));
                    }
                }
            }

            //last point
            cg.ctx.lineTo(cg.geoToPixX(xMax + resolution / 2), cg.geoToPixY(y));

            //draw
            if (this.fillColor_)
                cg.ctx.fill()
            if (this.lineColor_ && this.lineWidth_ > 0)
                cg.ctx.stroke();
        }
    }



    /**
     * 
     * @param {string} lineColor 
     * @returns 
     */
    lineColor(lineColor) {
        if (lineColor) {
            this.lineColor_ = lineColor;
            return this;
        }
        return this.lineColor_;
    }

    /**
     * 
     * @param {number} lineWidth 
     * @returns 
     */
    lineWidth(lineWidth) {
        if (lineWidth) {
            this.lineWidth_ = lineWidth;
            return this;
        }
        return this.lineWidth_;
    }


    /**
     * 
     * @param {string} fillColor 
     * @returns 
     */
    fillColor(fillColor) {
        if (fillColor) {
            this.fillColor_ = fillColor;
            return this;
        }
        return this.fillColor_;
    }

}
