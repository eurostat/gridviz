//@ts-check

import { Style, Stat, getStatistics } from "../Style"
import { Legend } from "../Legend";
import { ShapeColorSizeStyle } from "../style/ShapeColorSizeStyle";


/**
 * @author Julien Gaffuri
 */
export class ColorLegend extends Legend {

    /** @param {Object} opts */
    constructor(opts) {
        super(opts)

        this.colorRamp = opts.colorRamp
        this.fun = opts.fun
    }

    /**
     * @param {object} opts 
     */
    update(opts) {
        //needed: function (t) -> value  +  color ramp

        //clear
        this.div.selectAll("*").remove();

        const svg = this.div.append("svg")//.attr("width",50).attr("height",100)
        //  <rect width="300" height="100" style="fill:rgb(0,0,255);stroke-width:3;stroke:rgb(0,0,0)" />

        const w = 15
        const h = 100
        for (let i = 0; i < h; i++) {
            svg.append("rect").attr("x", 0).attr("y", i).attr("width", w).attr("height", 1).style("fill", this.colorRamp(i / (h - 1)))
        }
        svg.append("rect").attr("x", 0).attr("y", 0).attr("width", w).attr("height", h).style("fill", "none").style("stroke", "lightgray")
    }

}
