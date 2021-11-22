//@ts-check
import { Cell } from "./Dataset";
import { CanvasPlus } from "../viewer/CanvasPlus";

/**
 * @abstract
 */
export class Style {

    /**
     * @param {string|function} value 
     * @abstract
     */
    constructor(value) {
        this.value = value
    }

    /**
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
     * @param {CanvasPlus} cp 
     */
     draw(cells, resolution, cp) {
        throw new Error('Method draw not implemented.');
    }

}
