//@ts-check

import { Legend } from "../Legend";
import { format } from "d3-format";

/**
 * @author Julien Gaffuri
 */
export class ColorLegend extends Legend {

    //inspiration: https://observablehq.com/@d3/color-legend

    /** @param {Object} opts */
    constructor(opts) {
        super(opts)
		opts = opts || {};

        this.colorRamp = opts.colorRamp
        this.fun = opts.fun

        //this.title = opts.title;
        this.tickSize = opts.tickSize || 6
        this.width = opts.width || 300
        this.height = opts.height || 15
        this.margin = opts.margin || 5
        this.ticks = opts.ticks || Math.floor(this.width / 40)
        this.tickFormat = opts.tickFormat || ".0f"

        this.fontSize = opts.fontSize || 9
    }

    /**
     * @param {object} opts 
     */
    update(opts) {
        //needed: function (t) -> value  +  color ramp

        //clear
        this.div.selectAll("*").remove();

        const svg = this.div.append("svg").attr("width",this.width + 2*this.margin).attr("height", this.height + 2*this.margin + this.tickSize + this.fontSize - 5)
        //  <rect width="300" height="100" style="fill:rgb(0,0,255);stroke-width:3;stroke:rgb(0,0,0)" />
        const g = svg.append("g").attr("transform", "translate(" + this.margin + " " + this.margin + ")")

        const w = this.width
        const h = this.height

        //draw color bar
        const step = 5
        for (let i = 0; i < w; i += step) {
            g.append("rect").attr("x", i).attr("y", 0).attr("width", step).attr("height", h).style("fill", this.colorRamp(i / (w - 1)))
        }

        //label text format
        const f = this.tickFormat? format(this.tickFormat) : (v)=>v;

        for (let i = 0; i < this.ticks; i++) {
            const t = i / (this.ticks - 1)
            const v = this.fun(t, opts.r, opts.s)

            //tick line
            g.append("line").attr("x1", w * t).attr("y1", 0).attr("x2", w * t).attr("y2", h + this.tickSize).style("stroke", "black")

            //tick label
            g.append("text")
                .attr("x", w * t)
                .attr("y", h + this.tickSize + 2)
                .style("font-size", this.fontSize)
                //.style("font-weight", "bold")
                .style("font-family", "Arial")
                .style("text-anchor", i==0? "start" : i==(this.ticks-1)? "end" : "middle")
                .style("alignment-baseline", "top")
                .style("dominant-baseline", "hanging")
                .style("pointer-events", "none")
                .text(f(v))
        }
    }

}
