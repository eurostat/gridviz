//@ts-check
import { Cell } from "./Dataset";
import { CanvasGeo } from './CanvasGeo';

/**
 * 
 * @abstract
 * 
 * @author Julien Gaffuri
 */
export class Style {

    /**
     * @abstract
     */
    constructor() {

        //the cell stroke

        /** @type {number} */
        this.psStroke_ = undefined;
        /** @type {string} */
        this.strokeColor_ = "gray";
        /** @type {number} */
        this.strokeWidth_ = 1.5;
    }



    /**
     * Draw cells.
     * 
     * @param {Array.<Cell>} cells 
     * @param {number} resolution 
     * @param {CanvasGeo} cg 
     */
    draw(cells, resolution, cg) {
        throw new Error('Method draw not implemented.');
    }






    /**
     * Draw the stroke of the cells, as rectangle, only for detailled zoom levels when the cells are quite big.
     * 
     * @param {Array.<Cell>} cells 
     * @param {number} resolution 
     * @param {CanvasGeo} cg 
     * @param {function} shape 
     * @param {function} size
     * @returns 
     */
    drawStroke(cells, resolution, cg, shape, size) {
        if (!this.psStroke_ || cg.ps > this.psStroke_) return;

        cg.ctx.fillStyle = this.strokeColor_;
        cg.ctx.lineWidth = this.strokeWidth_;
        for (let cell of cells) {

            //size - in ground meters
            let sG;
            if (size) {
                sG = size(cell);
            } else
                sG = resolution

            //size - in pixel
            const s = sG / cg.ps

            const shape_ = shape(cell);
            if (shape_ === "square") {
                //draw square
                const d = resolution * (1 - sG / resolution) * 0.5
                cg.ctx.beginPath();
                cg.ctx.rect(cg.geoToPixX(cell.x + d), cg.geoToPixY(cell.y + resolution - d), s, s);
                cg.ctx.stroke();
            } else if (shape_ === "circle") {
                //draw circle
                cg.ctx.beginPath();
                cg.ctx.arc(cg.geoToPixX(cell.x + resolution * 0.5), cg.geoToPixY(cell.y + resolution * 0.5), s * 0.5, 0, 2 * Math.PI, false);
                cg.ctx.stroke();
            }
        }
    }

    /**
     * 
     * @param {number} psStroke 
     * @returns 
     */
    psStroke(psStroke) {
        if (psStroke) {
            this.psStroke_ = psStroke;
            return this;
        }
        return this.psStroke_;
    }

    /**
     * 
     * @param {*} strokeColor 
     * @returns 
     */
    strokeColor(strokeColor) {
        if (strokeColor) {
            this.strokeColor_ = strokeColor;
            return this;
        }
        return this.strokeColor_;
    }

    /**
     * 
     * @param {number} strokeWidth 
     * @returns 
     */
    strokeWidth(strokeWidth) {
        if (strokeWidth) {
            this.strokeWidth_ = strokeWidth;
            return this;
        }
        return this.strokeWidth_;
    }

}
