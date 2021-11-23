//@ts-check

import { Dataset } from "./Dataset";
import { Style } from "./Style";

/**
 * A data layer, which specifies a dataset to be shown within a specified zoom range, with a specified style.
 * 
 * @author Julien Gaffuri
 */
export class Layer {

    /**
     * @param {Dataset} dataset The dataset to show
     * @param {Style} style The style to use
     * @param {number} minZoom The minimum zoom level when to show the layer
     * @param {number} maxZoom The maximum zoom level when to show the layer
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
