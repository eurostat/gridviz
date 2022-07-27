//@ts-check

import { Dataset, Cell } from "./Dataset";
import { Style } from "./Style";

/**
 * A data layer, which specifies a dataset to be shown within a specified zoom range, with specified styles.
 * 
 * @author Julien Gaffuri
 */
export class Layer {

    /**
     * @param {Dataset} dataset The dataset to show
     * @param {Array.<Style>} styles The styles, ordered in drawing order.
     * @param {number} minZoom The minimum zoom level when to show the layer
     * @param {number} maxZoom The maximum zoom level when to show the layer
     * @param {number} pixNb 
     * @param {{visible?:boolean,cellInfoHTML?:function(Cell):string}} opts 
     */
    constructor(dataset, styles, minZoom = 0, maxZoom = Infinity, pixNb = 5, opts = {}) {

        /** @type {Dataset} */
        this.dataset = dataset;
        /** @type {Array.<Style>} */
        this.styles = styles;

        /** @type {number} */
        this.minZoom = minZoom;
        /** @type {number} */
        this.maxZoom = maxZoom;

        if (this.minZoom >= this.maxZoom)
            throw new Error("Unexpected zoom limits for layer. Zoom min should be smaller than zoom max.")

        /** Unit: number of pixels
         * @type {number} */
        this.pixNb = pixNb || 5;

        /** An attribute to specify if a layer should be drawn or not
         * @type {boolean} */
        this.visible = opts.visible == false ? false : true;

        /**
        * The HTML content providing information on the grid cell.
        * @type {function(Cell):string} */
        this.cellInfoHTML = opts.cellInfoHTML || defaultCellInfoHTML;
    }

}



/**
 * The default function returning cell information as HTML.
 * This is typically used for tooltip information.
 * 
 * @param {Cell} cell 
 * @returns {string}
 */
const defaultCellInfoHTML = function (cell) {
    const buf = []
    for (const key of Object.keys(cell)) {
        if (key === "x") continue;
        if (key === "y") continue;
        buf.push("<b>")
        buf.push(key)
        buf.push("</b>")
        buf.push(" : ")
        buf.push(cell[key])
        buf.push("<br>")
    }
    return buf.join("");
}
