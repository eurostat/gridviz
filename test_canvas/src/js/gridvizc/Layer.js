//@ts-check

import { Dataset, Cell } from "./Dataset";
import { DatasetComponent } from "./DatasetComponent";
import { Style } from "./Style";

/**
 * A layer, which specifies a dataset to be shown within a specified zoom range, with specified styles.
 * 
 * @author Julien Gaffuri
 */
export class Layer {

    /**
     * @param {Dataset} dataset The multi resolution dataset to show.
     * @param {Array.<Style>} styles The styles, ordered in drawing order.
     * @param {{visible?:boolean,minZoom?:number,maxZoom?:number,pixNb?:number,cellInfoHTML?:function(Cell):string}} opts 
     *      minZoom: The minimum zoom level when to show the layer. maxZoom: The maximum zoom level when to show the layer
     */
    constructor(dataset, styles, opts = {}) {
        opts = opts || {}

        /** @type {Dataset} */
        this.dataset = dataset;
        /** @type {Array.<Style>} */
        this.styles = styles;

        /** An attribute to specify if a layer should be drawn or not
         * @type {boolean} */
        this.visible = opts.visible == false ? false : true;

        /** The minimum zoom factor: Below this level, the layer is not shown.
         * @type {number} */
        this.minZoom = opts.minZoom || 0;

        /** The maximum zoom factor: Above this level, the layer is not shown.
         * @type {number} */
        this.maxZoom = opts.minZoom || Infinity;

        //ensure acceptable values for the zoom limits.
        if (this.minZoom >= this.maxZoom)
            throw new Error("Unexpected zoom limits for layer. Zoom min should be smaller than zoom max.")

        /** Unit: number of pixels
         * @type {number} */
        this.pixNb = opts.pixNb || 5;

        /**
         * The function returning cell information as HTML.
         * This is typically used for tooltip information.
         * @type {function(Cell):string} */
        this.cellInfoHTML = opts.cellInfoHTML || defaultCellInfoHTML;
    }


    /**
     * Return the relevant dataset component for a specified zoom factor.
     * 
     * @param {number} zf 
     * @returns {DatasetComponent|undefined}  */
    getDatasetComponent(zf) {
        if (zf < this.minZoom || zf > this.maxZoom) return;
        const rs = this.dataset.resolutions

        let i = 0;
        let z = rs[i] / this.pixNb
        while (z < zf && i < rs.length) {
            i++;
            z = rs[i] / this.pixNb
        }
        if (i == 0) return this.dataset.datasetComponents[0];
        return this.dataset.datasetComponents[i - 1];
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
