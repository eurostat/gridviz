//@ts-check
"use strict";

import { Style } from "../Style"
import { density2d } from "fast-kde"

/**
 * A style representing the cell as a smoothed layer, to smoothing local variations and show main trends across space.
 * 
 * @author Julien Gaffuri
 */
export class KernelSmoothingFKDEStyle extends Style {

    // https://observablehq.com/d/5dd1cb5e4d21c021
    // https://observablehq.com/@uwdata/fast-kde
    // https://observablehq.com/d/3127b6d89ada959f
    //TODO https://observablehq.com/@sahilchinoy/areal-interpolation-iii ?

    /** @param {object} opts */
    constructor(opts) {
        super(opts)
        opts = opts || {}

        /** A function specifying the value to consider for each cell. This is the value to smooth.
         * @type {function(import("../Dataset").Cell):number} */
        this.value = opts.value

        /** The smoothing parameter, in geo unit. The larger, the more smoothed.
         * @type {function(number,number):number}
         */
        this.sigma = opts.sigma // (r, zf)=>...

        /** The styles to represent the smoothed cells.
         * @type {Array.<Style>}
         */
        this.styles = opts.styles
    }


    /**
     * Draw the smoothed cells depending on the list of styles specified.
     * 
    * @param {Array.<import("../Dataset").Cell>} cells 
    * @param {number} r 
    * @param {import("../GeoCanvas").GeoCanvas} cg
     */
    draw(cells, r, cg) {
        //filter
        cells = cells.filter(this.filter)

        if (!cells || cells.length == 0)
            return;


        //get smoothing param in geo unit
        /** @type {number} */
        const sG = this.sigma(r, cg.zf)

        //TODO
        //https://observablehq.com/d/5dd1cb5e4d21c021

        //compute extent
        const e = cg.extGeo;
        if (!e) return;
        const xMin = Math.floor(e.xMin / r) * r - r / 2;
        const xMax = Math.ceil(e.xMax / r) * r - r / 2;
        const yMin = Math.floor(e.yMin / r) * r - r / 2;
        const yMax = Math.ceil(e.yMax / r) * r - r / 2;
        const extent = [[xMin, xMax], [yMin, yMax]]
        const nbX = (extent[0][1] - extent[0][0]) / r
        const nbY = (extent[1][1] - extent[1][0]) / r
        const binsF = 1 //TODO expose that. Differently ?

        //TODO handle r/2
        //compute smoothing
        const kde = density2d(cells, {
            x: (c) => c.x + r / 2,
            y: (c) => c.y + r / 2,
            weight: (c) => this.value(c),
            bins: [nbX * binsF, nbY * binsF],
            bandwidth: sG,
            extent: extent
        })

        //restructure output
        //cells = kde.points("x", "y", "ksmval");
        //TODO expose
        const th = 1e-2;
        cells = [];
        const pts = kde.points("x", "y", "ksmval");
        for (let p of pts) {
            if (p.ksmval < th) continue;
            cells.push(p);
        }


        //draw smoothed cells from styles
        for (let s of this.styles)
            s.draw(cells, r, cg);

        //update legends
        //for (let s of this.styles)
        //    s.updateLegends({ style: s, r: r, zf: cg.getZf() });
    }
}
