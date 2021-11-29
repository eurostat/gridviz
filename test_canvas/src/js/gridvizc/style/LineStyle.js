//@ts-check

import { Style, Size } from "../Style"
import { Cell } from "../Dataset"
import { CanvasGeo } from "../CanvasGeo";

/**
 * 
 * @author Julien Gaffuri
 */
export class LineStyle extends Style {

    /**
      * @param {function(Cell):Size} height A function returning the height of a cell (in geographical unit).
      */
    constructor(height) {
        super()

        /** @type {function(Cell):Size} */
        this.height_ = height;

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
        /**  @type {object} */
        const ind = {};
        for (const cell of cells) {
            let row = ind[cell.y];
            if (!row) { row = {}; ind[cell.y] = row }
            row[cell.x] = +this.height_(cell);
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

        //draw lines row by row, stating from the top
        for (let y = yMax; y >= yMin; y -= r) {

            //get row
            const row = ind[y]
            if (!row) continue;

            //compute row baseline
            const yP = cg.geoToPixY(y);

            //place first point
            cg.ctx.beginPath();
            cg.ctx.moveTo(cg.geoToPixX(xMin - r / 2), yP);

            //store the previous height
            /** @type {Size} */
            let hG_;

            for (let x = xMin; x <= xMax; x += r) {

                //get column value
                /** @type {Size} */
                let hG = row[x];
                if (!hG) hG = {val:0,type:"g"};

                if (hG.val || hG_.val) {
                    //draw line only when at least one of both values is non-null
                    //TODO test bezierCurveTo
                    cg.ctx.lineTo(cg.geoToPixX(x + r / 2), yP - hG.val / cg.zf);
                } else {
                    //else move the point
                    cg.ctx.moveTo(cg.geoToPixX(x + r / 2), yP);
                }
                //store the previous value
                hG_ = hG;
            }

            //last point
            if (hG_)
                cg.ctx.lineTo(cg.geoToPixX(xMax + r / 2), yP);

            //draw fill
            if (this.fillColor_)
                cg.ctx.fill()
            //draw line
            if (this.lineColor_ && this.lineWidth_ > 0)
                cg.ctx.stroke();

        }
    }



    /**
     * 
     * @param {function(Cell):Size} height 
     * @returns {this|function(Cell):Size}
     */
    height(height) {
        if (height) {
            this.height_ = height;
            return this;
        }
        return this.height_;
    }

    /**
     * 
     * @param {string} lineColor 
     * @returns {this|string}
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
     * @returns {this|number}
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
     * @returns {this|string}
     */
    fillColor(fillColor) {
        if (fillColor) {
            this.fillColor_ = fillColor;
            return this;
        }
        return this.fillColor_;
    }

}
