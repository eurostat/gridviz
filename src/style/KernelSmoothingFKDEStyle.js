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
        const xMin = Math.floor(e.xMin / r) * r;
        const xMax = Math.ceil(e.xMax / r) * r;
        const yMin = Math.floor(e.yMin / r) * r;
        const yMax = Math.ceil(e.yMax / r) * r;
        const extent = [[xMin,xMax],[yMin,yMax]]

        const kde = density2d(cells, {
            x: (c) => c.x,
            y: (c) => c.y,
            weight: (c) => this.value(c), //TODO check
            bins: [],
            bandwidth: bw2d,
            extent: extent
        })







        //draw smoothed cells from styles
        for (let s of this.styles)
            s.draw(cells, r, cg);

        //update legends
        //for (let s of this.styles)
        //    s.updateLegends({ style: s, r: r, zf: cg.getZf() });
    }
}
