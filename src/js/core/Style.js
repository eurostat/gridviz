//@ts-check
import { Cell } from "./Dataset";
import { Viewer } from './viewer/viewer';

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
     * @param {Viewer} v The canvas where to draw them.
     * @abstract
     */
    draw(cells, resolution, v) {
        throw new Error('Method draw not implemented.');
    }



    /**
     * Draw the stroke of the cells, as rectangle, only for detailled zoom levels when the cells are quite big.
     * 
     * @param {Cell} cell The cell to draw the stroke of.
     * @param {number} resolution Their resolution (in geographic unit)
     * @param {Viewer} viewer The canvas where to draw them.
     * @param {function} shape The shape of the stroke.
     * @param {function} size A function returning the size of a cell (in geographical unit).
     * @returns 
     */
    drawStroke(cell, resolution, viewer, shape, size) {

    }

}
