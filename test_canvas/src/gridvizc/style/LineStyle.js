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
     * @param {number} r 
     * @param {CanvasGeo} cg 
     */
    draw(cells, r, cg) {

        //index cells by y and x
        const ind = {};
        for (const cell of cells) {
            let row = ind[cell.y];
            if (!row) { row = {}; ind[cell.y] = row }
            row[cell.x] = +this.getValue(cell);
        }

        //compute extent
        const e = cg.extGeo;
        const xMin = Math.floor(e.xMin / r) * r;
        const xMax = Math.floor(e.xMax / r) * r;
        const yMin = Math.floor(e.yMin / r) * r;
        const yMax = Math.floor(e.yMax / r) * r;

        //set color and width
        cg.ctx.strokeStyle = this.lineColor_;
        cg.ctx.lineWidth = this.lineWidth_;
        cg.ctx.fillStyle = this.fillColor_;

        for (let y = yMin; y <= yMax; y += r) {
            cg.ctx.beginPath();

            //the row baseline
            const yP = cg.geoToPixY(y);

            //place first point
            cg.ctx.moveTo(cg.geoToPixX(xMin - r / 2), yP);

            //get row
            const row = ind[y]

            //store the previous value
            let v_ = 0;
            if (row) {
                for (let x = xMin; x <= xMax; x += r) {
                    //get value
                    let v = row[x];
                    if (v) {
                        //TODO test bezierCurveTo
                        cg.ctx.lineTo(cg.geoToPixX(x + r / 2), yP - this.valueToHeightFun(v));
                    } else {
                        //TODO cg.ctx.moveTo
                        cg.ctx.moveTo(cg.geoToPixX(x + r / 2), yP);
                    }
                    v_ = v;
                }
            }

            //last point
            if (v_)
                cg.ctx.lineTo(cg.geoToPixX(xMax + r / 2), yP);

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
