//@ts-check
import { Cell } from "./Dataset";
import { CanvasGeo } from './CanvasGeo';

/** @typedef {{val: function(Cell):number, unit: "pix"|"geo"}} Size */

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

        /** An offset. This is to alter the position of all symbols in a given direction. In geographical unit.
         * @type {{dx:number,dy:number}} */
        this.offset_ = { dx: 0, dy: 0 };


        //the cell stroke

        /** The zoom factor limit when to show/hide the stroke.
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
    * The offset
    * This is to alter the position of all symbols in a given direction. In geographical unit.
    * 
    * @param {{dx:number,dy:number}} offset 
    * @returns {this|{dx:number,dy:number}}
    */
    offset(offset) {
        if (offset) {
            this.offset_ = offset;
            return this;
        }
        return this.offset_;
    }
    /**
     * The zoom limit when to show/hide the stroke.
     * 
     * @param {number} zfStroke 
     * @returns {this|number}
     */
    zfStroke(zfStroke) {
        if (zfStroke) {
            this.zfStroke_ = zfStroke;
            return this;
        }
        return this.zfStroke_;
    }

    /**
     * The stroke color.
     * 
     * @param {string} strokeColor 
     * @returns {this|string}
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
     * @returns {this|number}
     */
    strokeWidth(strokeWidth) {
        if (strokeWidth) {
            this.strokeWidth_ = strokeWidth;
            return this;
        }
        return this.strokeWidth_;
    }




    /**
     * Draw the stroke of the cells, as rectangle, only for detailled zoom levels when the cells are quite big.
     * 
     * @param {Cell} cell The cell to draw the stroke of.
     * @param {number} resolution Their resolution (in geographic unit)
     * @param {CanvasGeo} cg The canvas where to draw them.
     * @param {function(Cell):string} shape The shape of the stroke.
     * @param {Size} size A function returning the size of a cell (in geographical unit).
     * @returns 
     */
    drawStroke(cell, resolution, cg, shape, size) {
        if (!this.zfStroke_ || cg.zf > this.zfStroke_) return;

        cg.ctx.strokeStyle = this.strokeColor_;
        cg.ctx.lineWidth = this.strokeWidth_;

        //size
        /** @type {number} */
        size = size || { val: c=>resolution, unit:"geo"};
        //size - in pixel and geo
        const sP = size.unit === "pix" ? size.val(cell) : size.val(cell) / cg.zf
        const sG = cg.zf * sP;

        const shape_ = shape(cell);
        if (shape_ === "square") {
            //draw square
            const d = resolution * (1 - sG / resolution) * 0.5
            cg.ctx.beginPath();
            cg.ctx.rect(
                cg.geoToPixX(cell.x + d + this.offset_.dx),
                cg.geoToPixY(cell.y + resolution - d + this.offset_.dy),
                sP, sP);
            cg.ctx.stroke();

        } else if (shape_ === "circle") {
            //draw circle
            cg.ctx.beginPath();
            cg.ctx.arc(
                cg.geoToPixX(cell.x + resolution * 0.5 + this.offset_.dx),
                cg.geoToPixY(cell.y + resolution * 0.5 + this.offset_.dy),
                sP * 0.5,
                0, 2 * Math.PI, false);
            cg.ctx.stroke();
        }
    }

}
