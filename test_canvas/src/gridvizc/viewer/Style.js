//@ts-check
import { Cell } from "./Dataset";
import { CanvasGeo } from './CanvasGeo';

/**
 * @abstract
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

}
