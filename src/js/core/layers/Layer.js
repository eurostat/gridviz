//@ts-check

import { Dataset } from "../dataset/Dataset";

/**
 * A data layer, which specifies a dataset to be shown within a specified zoom range, with a specified style.
 * 
 * @author Julien Gaffuri
 */
export class Layer {

    /**
     * @param {Dataset} dataset The dataset to show
     * @param {number} minZoom The minimum zoom level when to show the layer
     * @param {number} maxZoom The maximum zoom level when to show the layer
     */
    constructor(dataset, minZoom, maxZoom) {

        /** @type {Dataset} */
        this.dataset = dataset;
        /** @type {number} */
        this.minZoom = minZoom;
        /** @type {number} */
        this.maxZoom = maxZoom;

    }

}
