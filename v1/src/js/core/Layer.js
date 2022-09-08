//@ts-check

import { Dataset } from "./Dataset";
import { Style } from "./Style";
import { ColorSizeShapeStyle } from "../core/style/ColorSizeShapeStyle"

/**
 * A data layer, which specifies a dataset to be shown within a specified zoom range, with a specified style.
 * 
 * @author Joseph Davies, Julien Gaffuri
 */
export class Layer {

    /**
     * @param {Dataset} dataset The dataset to show
     * @param {Array.<Style>} styles The styles, ordered in drawing order.
     * @param {number} minZoom The minimum zoom level when to show the layer
     * @param {number} maxZoom The maximum zoom level when to show the layer
     * @param {Boolean} drawAll Draw all cells in the dataset (e.g. to draw all cells of a csv grid only once)
     */
    constructor(dataset, styles, minZoom, maxZoom, drawAll) {

        /** @type {Dataset} */
        this.dataset = dataset;
        /** @type {Array.<Style>} */
        this.styles = styles || [new ColorSizeShapeStyle({})];
        /** @type {number} */
        this.minZoom = minZoom;
        /** @type {number} */
        this.maxZoom = maxZoom;
        /** @type {Boolean} */
        this.drawAll = drawAll ? drawAll : false;
        /** @type {Boolean} */
        this.hidden = false;


    }

}
