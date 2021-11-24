//@ts-check
import { Cell } from "./Dataset";
import { CanvasGeo } from './CanvasGeo';

/**
 * A style, to show a grid dataset.
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

        /** The zoom limit when to show/hide the stroke.
         * @type {number} */
        this.zfStroke_ = undefined;

        /** The stroke color.
         * @type {string} */
        this.strokeColor_ = "lightgray";

        /** The stroke line width, in pixels.
         * @type {number} */
        this.strokeWidth_ = 1.5;

    }


    /**
     * Draw cells.
     * 
     * @param {Array.<Cell>} cells The cells to draw.
     * @param {number} resolution Their resolution (in geographic unit)
     * @param {CanvasGeo} cg The canvas where to draw them.
     * @abstract
     */
    draw(cells, resolution, cg) {
        throw new Error('Method draw not implemented.');
    }



    /**
     * Draw the stroke of the cells, as rectangle, only for detailled zoom levels when the cells are quite big.
     * 
     * @param {Array.<Cell>} cells The cells to draw.
     * @param {number} resolution Their resolution (in geographic unit)
     * @param {CanvasGeo} cg The canvas where to draw them.
     * @param {function} shape The shape of the stroke.
     * @param {function} size A function returning the size of a cell (in geographical unit).
     * @returns 
     */
    drawStroke(cells, resolution, cg, shape, size) {
        if (!this.zfStroke_ || cg.zf > this.zfStroke_) return;

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
            const s = sG / cg.zf

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
     * The zoom limit when to show/hide the stroke.
     * 
     * @param {number} zfStroke 
     * @returns 
     */
    psStroke(zfStroke) {
        if (zfStroke) {
            this.zfStroke_ = zfStroke;
            return this;
        }
        return this.zfStroke_;
    }

    /**
     * The stroke color.
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
     * The stroke line width, in pixels.
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
