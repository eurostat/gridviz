//@ts-check
'use strict'

/**
 * A layer, which specifies a dataset to be shown with specified styles.
 *
 * @author Joseph Davies, Julien Gaffuri
 */
export class GridLayer {
    /**
     * @param {import("./MultiResolutionDataset").MultiResolutionDataset} dataset The multi resolution dataset to show.
     * @param {Array.<import("./Style").Style>} styles The styles, ordered in drawing order.
     * @param {{visible?:boolean,alpha?:number,blendOperation?:GlobalCompositeOperation,minZoom?:number,maxZoom?:number,pixNb?:number,cellInfoHTML?:function(import("./Dataset").Cell):string}} opts
     *      minZoom: The minimum zoom level when to show the layer. maxZoom: The maximum zoom level when to show the layer
     */
    constructor(dataset, styles, opts = {}) {
        opts = opts || {}

        /** @type {import("./MultiResolutionDataset").MultiResolutionDataset} */
        this.dataset = dataset
        /** @type {Array.<import("./Style").Style>} */
        this.styles = styles

        /** An attribute to specify if a layer should be drawn or not
         * @type {boolean} */
        this.visible = opts.visible === false ? false : true

        /** A function returning the alpha (transparency/opacity), between 0.0 (fully transparent) and 1.0 (fully opaque).
         *  The function parameter is the .
         * (see CanvasRenderingContext2D: globalAlpha property)
         * @type {function(number):number|undefined} */
        this.alpha = opts.alpha

        /** A function returning the blend operation. The function parameter is the .
         * (see CanvasRenderingContext2D: globalCompositeOperation property)
         * @type {GlobalCompositeOperation} */
        this.blendOperation = opts.blendOperation || (zf => "source-over")

        /** The minimum : Below this level, the layer is not shown.
         * @type {number} */
        this.minZoom = opts.minZoom || 0

        /** The maximum : Above this level, the layer is not shown.
         * @type {number} */
        this.maxZoom = opts.maxZoom || Infinity

        //ensure acceptable values for the zoom limits.
        if (this.minZoom >= this.maxZoom)
            throw new Error('Unexpected zoom limits for layer. Zoom min should be smaller than zoom max.')

        /** Unit: number of pixels
         * @type {number} */
        this.pixNb = opts.pixNb || 3

        /**
         * The function returning cell information as HTML.
         * This is typically used for tooltip information.
         * @type {function(import("./Dataset").Cell, number):string} */
        this.cellInfoHTML = opts.cellInfoHTML || GridLayer.defaultCellInfoHTML
    }

    /**
     * Return the relevant dataset component for a specified zoom.
     *
     * @param {number} z
     * @returns {import("./Dataset").Dataset|undefined}
     * */
    getDataset(z) {
        if (z < this.minZoom || z > this.maxZoom) return
        return this.dataset.getDataset(z, this.pixNb);
    }

    /**
     * The default function returning cell information as HTML.
     * This is typically used for tooltip information.
     *
     * @param {import("./Dataset").Cell} cell
     * @returns {string}
     */
    static defaultCellInfoHTML(cell) {
        const buf = []
        for (const key of Object.keys(cell)) {
            if (key === 'x') continue
            if (key === 'y') continue
            buf.push('<b>', key, '</b>', ' : ', cell[key], '<br>')
        }
        return buf.join('')
    }
}
