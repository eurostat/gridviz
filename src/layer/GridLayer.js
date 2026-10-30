//@ts-check
'use strict'

import { Layer } from '../core/Layer.js'
import { isVisibleAt } from '../core/Drawable.js'

/**
 * A layer, which specifies a dataset to be shown with specified styles.
 *
 * @module layer
 * @author Joseph Davies, Julien Gaffuri
 */
export class GridLayer extends Layer {
    /**
     * @param {import("../core/Dataset").Dataset|import("../core/MultiResolutionDataset").MultiResolutionDataset} dataset The dataset to show.
     * @param {Array.<import("../core/Style").Style>} styles The styles, ordered in drawing order.
     * @param {{visible?:function(number):boolean,alpha?:function(number):number,blendOperation?:function(number):GlobalCompositeOperation,minPixelsPerCell?:number,cellInfoHTML?:'none'|function(import("../core/Dataset").Cell):string}} opts
     */
    constructor(dataset, styles, opts = {}) {
        super(opts)
        opts = opts || {}

        /** @type {import("../core/Dataset").Dataset|import("../core/MultiResolutionDataset").MultiResolutionDataset} */
        this.dataset = dataset

        /** @type {Array.<import("../core/Style").Style>} */
        this.styles = styles

        /**
         * This parameter is used when the dataset is a MultiResolutionDataset.
         * It defines the minimum number of pixels a grid cell should have to select the dataset to display based on its resolution.
         * A low value, means that the map will be more detailled (smaller cells).
         * A high value, means that the map will be less detailled (larger cells).
         * This value should be higher than 1, otherwise it means a grid cell is smaller than the screen resolution.
         * For more complex cell representations that require some more map space, this value should be higher.
         * @type {number} */
        this.minPixelsPerCell = opts.minPixelsPerCell || 3

        /**
         * The function returning cell information as HTML.
         * This is typically used for tooltip information.
         * Set to 'none' to disable cell info.
         * @type {'none'|function(import("../core/Dataset").Cell, number):string} */
        this.cellInfoHTML = opts.cellInfoHTML || GridLayer.defaultCellInfoHTML
    }

    /** */
    draw(geoCanvas, legend) {
        //get zoom level
        const z = geoCanvas.view.z
        const ctx = geoCanvas.offscreenCtx

        //get layer dataset component
        /** @type {import('../core/Dataset.js').Dataset|undefined} */
        const dsc = this.getDataset(z)
        if (!dsc) return

        //launch data download, if necessary
        dsc.getData(geoCanvas.extGeo)

        //update dataset view cache
        dsc.updateViewCache(geoCanvas.extGeo)


        //set layer alpha and blend mode
        if (this.alpha || this.blendOperation) {
            ctx.save()
            if (this.alpha) ctx.globalAlpha = this.alpha(z)
            if (this.blendOperation) ctx.globalCompositeOperation = this.blendOperation(z)
        }

        // tell the legends where they are drawn, so that they can fit it (width:'fill')
        if (legend) for (const s of this.styles) GridLayer.setLegendContainer(legend.node(), s.legends, s['styles'])

        //draw cells, style by style
        for (const s of this.styles) {
            //check if style is visible
            if (!isVisibleAt(s, z)) continue

            // set style alpha and blend mode
            //TODO: multiply style alpha by layer alpha ?
            if (s.alpha || s.blendOperation) {
                ctx.save()
                if (s.alpha) ctx.globalAlpha = s.alpha(z)
                if (s.blendOperation) ctx.globalCompositeOperation = s.blendOperation(z)
            }

            //set affin transform to draw with geographical coordinates
            geoCanvas.setCanvasTransform()

            //draw with style
            s.draw(dsc.getViewCache(), geoCanvas, dsc.getResolution())

            //draw style filter
            if (s.filterColor) s.drawFilter(geoCanvas)

            //restore default alpha and blend operation - before style change
            if (s.alpha || s.blendOperation) ctx.restore()
        }

        //restore default alpha and blend operation - before layer change
        if (this.alpha || this.blendOperation) ctx.restore()

        //add legend element
        if (legend) {
            for (const s of this.styles) {
                //check if style is visible
                if (!isVisibleAt(s, z)) continue
                GridLayer.addLegends(legend, s.legends, s, geoCanvas, this.styles)

                //case for styles of styles, like kernel smoothing
                //TODO do better
                if (s['styles']) {
                    for (const s2 of s['styles']) {
                        if (!isVisibleAt(s2, z)) continue
                        GridLayer.addLegends(legend, s2.legends, s2, geoCanvas)
                    }
                }
            }
        }
    }

    /** @private */
    static setLegendContainer(container, legends, subStyles) {
        // legends can be nested in arrays, like in Style.updateLegendsRecursive
        const set = (lg) => {
            if (Array.isArray(lg)) lg.forEach(set)
            else if (lg) lg.container = container
        }
        set(legends)
        for (const s2 of subStyles || []) GridLayer.setLegendContainer(container, s2.legends, undefined)
    }

    /** @private */
    static addLegends(legendComp, lg, style, geoCanvas, layerStyles) {
        if (Array.isArray(lg)) for (const lg_ of lg) this.addLegends(legendComp, lg_, style, geoCanvas, layerStyles)
        else {
            // so that hovering a swatch can highlight the cells of the style on the map
            lg.style_ = style
            lg.layerStyles = layerStyles
            lg.redraw = () => (geoCanvas.redraw ? geoCanvas.redraw() : undefined)
            // The legends go in the order they are drawn, after the one placed before them. A hovered legend is
            // still in the container (see Map.redrawNow) and is left where it is: moving it would lose its mouseleave,
            // and appending the others after it would put it above the legends that come before it.
            const container = legendComp.node()
            const el = lg.div.node()
            const previous = container._gridvizLegendCursor
            if (previous) {
                if (el.previousSibling !== previous) previous.after(el)
            } else if (container.firstChild !== el) container.prepend(el)
            container._gridvizLegendCursor = el
        }
    }

    /**
     * Return the relevant dataset component for a specified zoom.
     *
     * @param {number} z
     * @returns {import("../core/Dataset").Dataset|undefined}
     * */
    getDataset(z) {
        return this.dataset.getDataset(z, this.minPixelsPerCell)
    }

    /**
     * Set/get style stack.
     *
     * @param {undefined|import("../core/Style").Style|Array.<import("../core/Style").Style>} styles
     * @returns { this | Array.<import("../core/Style").Style> }
     */
    styles_(styles) {
        if (arguments.length === 0) return this.styles
        if (arguments.length === 1)
            if (Array.isArray(styles)) this.styles = styles
            else this.styles = [styles]
        else this.styles = arguments
        return this
    }

    /**
     * The default function returning cell information as HTML.
     * This is typically used for tooltip information.
     *
     * @param {import("../core/Dataset").Cell} cell
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
