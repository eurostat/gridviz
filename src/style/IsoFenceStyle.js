//@ts-check
'use strict'

import { Style } from '../Style.js'

/**
 * @author Julien Gaffuri
 */
export class IsoFenceStyle extends Style {

    /** @param {object} opts */
    constructor(opts) {
        super(opts)
        opts = opts || {}

        /**
         * The dictionary (string -> color) which give the color of each category.
         * @type {object} */
        this.color = opts.color

        /** The column where to get the height values.
         * @type {string} */
        this.heightCol = opts.heightCol

        /** A function returning the height of a cell.
         * @type {function(number,number,import("../Style").Stat|undefined,number):number} */
        this.height = opts.height || ((v, r, s, zf) => r * 0.4)

        /** The perspective angle.
         * @type {number} */
        this.angle = opts.angle
    }

    /**
     * Draw cells as segments.
     *
     * @param {Array.<import("../Dataset.js").Cell>} cells
     * @param {number} r
     * @param {import("../GeoCanvas.js").GeoCanvas} cg
     */
    draw(cells, r, cg) {
        //filter
        if (this.filter) cells = cells.filter(this.filter)

        //zoom factor
        const zf = cg.getZf()

        let stat
        if (this.heightCol) {
            //if size is used, sort cells by size so that the biggest are drawn first
            cells.sort((c1, c2) => c2[this.heightCol] - c1[this.heightCol])
            //and compute statistics
            stat = Style.getStatistics(cells, (c) => c[this.heightCol], true)
        }

        //nb categories - used for radar and agepyramid
        const nbCat = Object.entries(this.color).length

        //draw in geo coordinates
        cg.setCanvasTransform()

        //draw calls
        for (let cell of cells) {
            //height
            /** @type {function(number,number,import("../Style").Stat|undefined,number):number} */
            let h_ = this.height
            //height - in geo
            /** @type {number} */
            const hG = h_(cell[this.heightCol], r, stat, zf)


            //TODO

            
        }

        //update legends
        this.updateLegends({ style: this, r: r, zf: zf, sSize: stat })
    }
}
