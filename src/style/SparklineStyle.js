//@ts-check
'use strict'

import { Style } from '../Style.js'

/**
 * Style based on sparkline map of https://datagistips.hypotheses.org/488
 *
 * @author Julien Gaffuri
 */
export class SparklineStyle extends Style {
    /** @param {object} opts */
    constructor(opts) {
        super(opts)
        opts = opts || {}

    }

    /**
     * Draw cells as text.
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


    }
}
