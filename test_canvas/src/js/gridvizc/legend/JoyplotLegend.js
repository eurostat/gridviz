//@ts-check

import { select } from "d3-selection";
import { Legend } from "../Legend";
import { format } from "d3-format";

/**
 * A legend element for joyplot style.
 * 
 * @author Julien Gaffuri
 */
export class JoyplotLegend extends Legend {

    /** @param {Object} opts */
    constructor(opts) {
        super(opts)
        opts = opts || {};

        this.width = opts.width || 300
        this.height = opts.height || 15
        this.margin = opts.margin || 5

        /*
        this.colorRamp = opts.colorRamp

        //function (t) -> v
        this.fun = opts.fun

        this.title = opts.title;
        this.tickSize = opts.tickSize || 6
        this.ticks = opts.ticks || Math.floor(this.width / 40)
        this.tickFormat = opts.tickFormat || ".0f"
        this.tickUnit = opts.tickUnit

        this.fontSize = opts.fontSize || 9
        this.invert = opts.invert*/

        //clear
        //this.div.selectAll("*").remove();

        //const titleHeight = 12
        //const svg = this.div.append("svg").attr("width", this.width + 2 * this.margin).attr("height", this.height + 3 * this.margin + titleHeight + this.tickSize + this.fontSize - 5)
        //  <rect width="300" height="100" style="fill:rgb(0,0,255);stroke-width:3;stroke:rgb(0,0,0)" />

        /*/title
        svg.append("text").attr("x", this.margin).attr("y", this.margin)
            .style("font-size", "12")
            .style("font-weight", "bold")
            .style("alignment-baseline", "top")
            .style("dominant-baseline", "hanging")
            .style("pointer-events", "none")
            .text(this.title)*/

        //const g = svg.append("g").attr("transform", "translate(" + this.margin + " " + (2 * this.margin + titleHeight) + ")")

        /*/draw color bar
        const w = this.width, h = this.height
        const step = 5
        for (let i = 0; i < w; i += step) {
            let t = i / (w - 1)
            if (this.invert) t = 1 - t
            g.append("rect").attr("x", i).attr("y", 0).attr("width", step).attr("height", h).style("fill", this.colorRamp(t))
        }*/


        /*for (let i = 0; i < this.ticks; i++) {
            let t = i / (this.ticks - 1)

            //tick line
            g.append("line").attr("x1", w * t).attr("y1", 0).attr("x2", w * t).attr("y2", h + this.tickSize).style("stroke", "black")

            //prepare tick label
            g.append("text")
                .attr("id", this.id + "_ticklabel_" + i)
                .attr("x", w * (this.invert ? 1 - t : t))
                .attr("y", h + this.tickSize + 2)
                .style("font-size", this.fontSize)
                //.style("font-weight", "bold")
                //.style("font-family", "Arial")
                .style("text-anchor", i == 0 ? (this.invert ? "end" : "start") : i == (this.ticks - 1) ? (this.invert ? "start" : "end") : "middle")
                .style("alignment-baseline", "top")
                .style("dominant-baseline", "hanging")
                .style("pointer-events", "none")
                .text("-")
        }*/

    }

    /**
     * @param {object} opts 
     */
    update(opts) {
        //could happen when data is still loading
        if (!opts.s) return

        //update tick labels

        /*/label text format
        const f = this.tickFormat ? format(this.tickFormat) : (v) => v;
        for (let i = 0; i < this.ticks; i++) {
            let t = i / (this.ticks - 1)
            const v = this.fun(t, opts.r, opts.s)

            //tick label
            select("#" + this.id + "_ticklabel_" + i).text(f(v) + (this.tickUnit ? this.tickUnit : ""))
        }*/

    }

}
