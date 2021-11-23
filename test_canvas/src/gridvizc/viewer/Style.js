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
     * @param {string|function} value 
     * @abstract
     */
    constructor(value) {

        /** Used to retrieve the cell value to be used for styling.
         * @type {string|function} */
        this.value = value


        //the stroke

        /** @type {number} */
        this.psStroke_ = undefined;
        /** @type {string} */
        this.strokeColor_ = "gray";
        /** @type {number} */
        this.strokeWidth_ = 1.5;
    }

    /**
     * Returns the value of a grid cell to be used for styling.
     * 
     * @param {Cell} cell 
     * @returns {number}
     */
    getValue(cell) {
        if (this.value instanceof Function || typeof this.value === "function")
            return this.value(cell);
        else
            return cell[this.value];
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
     * @param {function} sizeGeo The function returning the cell size factor
     * @returns 
     */
    drawStroke(cells, resolution, cg, sizeGeo) {
        if (!this.psStroke_ || cg.ps > this.psStroke_) return;

        cg.ctx.fillStyle = this.strokeColor_;
        cg.ctx.lineWidth = this.strokeWidth_;
        for (let cell of cells) {

            //get size - in ground meters
            const sG = sizeGeo(cell);
            //get size - in pixels
            const s = sG / cg.ps

            //draw square
            //TODO incinsistency between circle fill and rectangle stroke
            const d = resolution * (1-sG/resolution) * 0.5
            cg.ctx.beginPath();
            cg.ctx.rect(cg.geoToPixX(cell.x + d), cg.geoToPixY(cell.y - d), s, s);
            cg.ctx.stroke();

            /*
            //draw circle
            cg.ctx.beginPath();
            cg.ctx.arc(cg.geoToPixX(cell.x + resolution*0.5), cg.geoToPixY(cell.y + resolution*0.5), s*0.5, 0, 2 * Math.PI, false);
            cg.ctx.fill();
*/

        }
    }

    /**
     * 
     * @param {*} psStroke 
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
