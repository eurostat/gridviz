//@ts-check
import { Cell } from "./Dataset";
import { CanvasGeo } from './CanvasGeo';

/** Definition of a cell size parameter.
 * val: The function returning the size of a cell.
 * unit: The unit of the size value, either in pixel ("pix") or in geographical unit ("geo").
 * @typedef {{val: function(Cell):number, unit: "pix"|"geo"}} Size */

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
        this.offset = { dx: 0, dy: 0 };


        //the cell stroke

        /** The zoom factor limit when to show/hide the stroke.
         * @type {number} */
        this.zfStroke = undefined;

        /** The stroke color.
         * @type {string} */
        this.strokeColor = "lightgray";

        /** The stroke line width, in pixels.
         * @type {number} */
        this.strokeWidth = 1.5;

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
     * @param {Cell} cell The cell to draw the stroke of.
     * @param {number} resolution Their resolution (in geographic unit)
     * @param {CanvasGeo} cg The canvas where to draw them.
     * @param {function(Cell):string} shape The shape of the stroke.
     * @param {Size} size A function returning the size of a cell (in geographical unit).
     * @returns 
     */
     drawStroke(cell, resolution, cg, shape, size) {
        if (!this.zfStroke || cg.zf > this.zfStroke) return;

        cg.ctx.strokeStyle = this.strokeColor;
        cg.ctx.lineWidth = this.strokeWidth;

        //size
        /** @type {number} */
        size = size || { val: c => resolution, unit: "geo" };
        //size - in pixel and geo
        const sP = size.unit === "pix" ? size.val(cell) : size.val(cell) / cg.zf
        const sG = cg.zf * sP;

        const shape_ = shape(cell);
        if (shape_ === "square") {
            //draw square
            const d = resolution * (1 - sG / resolution) * 0.5
            cg.ctx.beginPath();
            cg.ctx.rect(
                cg.geoToPixX(cell.x + d + this.offset.dx),
                cg.geoToPixY(cell.y + resolution - d + this.offset.dy),
                sP, sP);
            cg.ctx.stroke();

        } else if (shape_ === "circle") {
            //draw circle
            cg.ctx.beginPath();
            cg.ctx.arc(
                cg.geoToPixX(cell.x + resolution * 0.5 + this.offset.dx),
                cg.geoToPixY(cell.y + resolution * 0.5 + this.offset.dy),
                sP * 0.5,
                0, 2 * Math.PI, false);
            cg.ctx.stroke();
        }
    }



    //getters and setters

    /** @returns {{dx:number,dy:number}} */
    getOffset() { return this.offset; }
    /** @param {{dx:number,dy:number}} val @returns {this} */
    setOffset(val) { this.offset = val; return this; }

    /** @returns {number} */
    getZFStroke() { return this.zfStroke; }
    /** @param {number} val @returns {this} */
    setZFStroke(val) { this.zfStroke = val; return this; }

    /** @returns {string} */
    getStrokeColor() { return this.strokeColor; }
    /** @param {string} val @returns {this} */
    setStrokeColor(val) { this.strokeColor = val; return this; }

    /** @returns {number} */
    getStrokeWidth() { return this.strokeWidth; }
    /** @param {number} val @returns {this} */
    setStrokeWidth(val) { this.strokeWidth = val; return this; }

}
