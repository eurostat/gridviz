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
     * @param {Array.<Style>} styles The styles, ordered in drawing order.
     * @param {number} minZoom The minimum zoom level when to show the layer
     * @param {number} maxZoom The maximum zoom level when to show the layer
     */
    constructor(dataset, styles, minZoom, maxZoom) {

        /** @type {Dataset} */
        this.dataset = dataset;
        /** @type {Array.<Style>} */
        this.styles = styles;
        /** @type {number} */
        this.minZoom = minZoom;
        /** @type {number} */
        this.maxZoom = maxZoom;
        /** @type {Boolean} */
        this.hidden = false;

    }

}
