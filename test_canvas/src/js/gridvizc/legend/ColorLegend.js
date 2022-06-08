//@ts-check

import { Legend } from "../Legend";

/**
 * @author Julien Gaffuri
 */
export class ColorLegend extends Legend {

    /** @param {Object} opts */
    constructor(opts) {
        super(opts)

        this.colorRamp = opts.colorRamp
        this.fun = opts.fun

        this.nbText = 5
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

        //draw color bar
        for (let i = 0; i < h; i++) {
            svg.append("rect").attr("x", 0).attr("y", i).attr("width", w).attr("height", 1).style("fill", this.colorRamp(1- i / (h - 1)))
        }
        //draw color bar frame
        //svg.append("rect").attr("x", 0).attr("y", 0).attr("width", w).attr("height", h).style("fill", "none").style("stroke", "lightgray")

        for(let i=0; i<this.nbText; i++) {
            const t = i/(this.nbText-1)
            const v = this.fun(t, opts.r, opts.s)

            svg.append("text")
            .attr("x", w+5)
            .attr("y", 5+h*(1-t))
            .style("font-size", 10)
            //.style("font-weight", "bold")
            .style("font-family", "Arial")
            .text(v)

            svg.append("line").attr("x1", 0).attr("y1", h*(1-t)).attr("x2", w).attr("y2", h*(1-t)).style("stroke", "black")
        }
    }

}
