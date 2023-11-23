//@ts-check
'use strict'

import { Layer } from "../Layer.js"

/**
 * A layer, which specifies a dataset to be shown with specified styles.
 *
 * @author Joseph Davies, Julien Gaffuri
 */
export class GridLayer extends Layer {
    /**
     * @param {import("../Dataset").Dataset|import("../MultiResolutionDataset").MultiResolutionDataset} dataset The dataset to show.
     * @param {Array.<import("../Style").Style>} styles The styles, ordered in drawing order.
     * @param {{visible?:boolean,alpha?:number,blendOperation?:GlobalCompositeOperation,minZoom?:number,maxZoom?:number,pixNb?:number,cellInfoHTML?:function(import("../Dataset").Cell):string}} opts
     *      minZoom: The minimum zoom level when to show the layer. maxZoom: The maximum zoom level when to show the layer
     */
    constructor(dataset, styles, opts = {}) {
        super(opts)
        opts = opts || {}

        /** @type {import("../Dataset").Dataset|import("../MultiResolutionDataset").MultiResolutionDataset} */
        this.dataset = dataset
        /** @type {Array.<import("../Style").Style>} */
        this.styles = styles

        /** Unit: number of pixels
         * @type {number} */
        this.pixNb = opts.pixNb || 3

        /**
         * The function returning cell information as HTML.
         * This is typically used for tooltip information.
         * @type {function(import("../Dataset").Cell, number):string} */
        this.cellInfoHTML = opts.cellInfoHTML || GridLayer.defaultCellInfoHTML
    }


    draw(canvas, legend) {

        const z = canvas.view.z

        //get layer dataset component
        /** @type {import('../Dataset.js').Dataset|undefined} */
        const dsc = this.getDataset(z)
        if (!dsc) return

        //launch data download, if necessary
        dsc.getData(canvas.extGeo)

        //update dataset view cache
        dsc.updateViewCache(canvas.extGeo)

        //draw cells, style by style
        for (const s of this.styles) {
            //check if style is visible
            if (!s.visible) continue
            if (z > s.maxZoom) continue
            if (z < s.minZoom) continue

            //set style alpha and blend mode
            //TODO: multiply by layer alpha ?
            canvas.ctx.globalAlpha = s.alpha ? s.alpha(z) : 1.0
            canvas.ctx.globalCompositeOperation = s.blendOperation(z)

            //draw with style
            s.draw(dsc.getViewCache(), canvas, dsc.getResolution(), canvas.getView())
        }

        //add legend element
        if (legend) {
            for (const s of this.styles) {
                if (z > s.maxZoom) continue
                if (z < s.minZoom) continue
                for (const lg of s.legends) {
                    //console.log(s, lg)
                    //this.legend.append(lg.div)
                    //s1.node().appendChild(s2.node())
                    legend.node().append(lg.div.node())
                }

                //case for styles of styles, like kernel smoothing
                //TODO do better
                if (s['styles']) {
                    for (const s2 of s.styles) {
                        if (z > s2.maxZoom) continue
                        if (z < s2.minZoom) continue
                        for (const lg of s2.legends) {
                            //console.log(s, lg)
                            //this.legend.append(lg.div)
                            //s1.node().appendChild(s2.node())
                            legend.node().append(lg.div.node())
                        }
                    }
                }
            }
        }

    }



    /**
     * Return the relevant dataset component for a specified zoom.
     *
     * @param {number} z
     * @returns {import("../Dataset").Dataset|undefined}
     * */
    getDataset(z) {
        if (z < this.minZoom || z > this.maxZoom) return
        return this.dataset.getDataset(z, this.pixNb);
    }

    /**
     * The default function returning cell information as HTML.
     * This is typically used for tooltip information.
     *
     * @param {import("../Dataset").Cell} cell
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
