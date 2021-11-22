//@ts-check

import { Dataset } from "./Dataset";
import { Style } from "./Style";

/**
 * 
 * @author Julien Gaffuri
 */
export class Layer {

    /**
     * @param {Dataset} dataset 
     * @param {Style} style 
     * @param {number} minZoom 
     * @param {number} maxZoom 
     */
    constructor(dataset, style, minZoom, maxZoom) {

        /** @type {Dataset} */
        this.dataset = dataset;
        /** @type {Style} */
        this.style = style;
        /** @type {number} */
        this.minZoom = minZoom;
        /** @type {number} */
        this.maxZoom = maxZoom;

    }

}
