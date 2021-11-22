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


        this.psStroke = undefined;
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
     * 
     * @param {*} cells 
     * @param {*} resolution 
     * @param {*} cg 
     * @returns 
     */
    drawStroke(cells, resolution, cg) {
        if (!this.psStroke || cg.ps > this.psStroke) return;

        const c2 = cg.c2d
        const r = resolution / cg.ps;
        c2.fillStyle = "darkgray";
        for (let cell of cells) {
            c2.beginPath();
            c2.rect(cg.geoToPixX(cell.x), cg.geoToPixY(cell.y), r, r);
            c2.stroke();
        }
    }

    /**
     * 
     * @param {*} psStroke 
     * @returns 
     */
    psStroke(psStroke) {
        if(psStroke) {
            this.psStroke = psStroke;
            return this;
        }
        return psStroke;
    }

}
