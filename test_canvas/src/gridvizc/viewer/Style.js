//@ts-check
import { Cell } from "./Dataset";
import { GridVizCanvas } from "./GridVizCanvas";

/**
 * @abstract
 */
 export class Style {

    /**
     * @abstract
     */
    constructor(){
        //
    }

    /**
     * Draw cells.
     * 
     * @param {Array.<Cell>} cells 
     * @param {number} resolution 
     * @param {GridVizCanvas} app 
     */
     draw(cells, resolution, app) {
        console.log("Style draw method not implemented.")
    }

}
