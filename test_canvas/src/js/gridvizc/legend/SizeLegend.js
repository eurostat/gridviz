//@ts-check

import { select } from "d3-selection";
import { Legend } from "../Legend";
import { format } from "d3-format";

/**
 * A legend element for proportional symbols.
 * 
 * @author Julien Gaffuri
 */
export class SizeLegend extends Legend {

    /** @param {Object} opts */
    constructor(opts) {
        super(opts)
        opts = opts || {};

        //this.style = opts.style

        //function (t[0,1], r, s) -> v (for label text)
        //this.fun = opts.fun

        this.margin = opts.margin || 5

        //title
        this.title = opts.title;
        this.titleFontSize = opts.titleFontSize || 12

        //nb symbols
        this.nb = opts.nb || 3

        //symbol
        this.fillColor = opts.fillColor || "none"
        this.strokeColor = opts.strokeColor || "black"
        this.strokeWidth = opts.strokeWidth || 1

        //label
        this.labelFontSize = opts.labelFontSize || 9
        this.labelUnitText = opts.labelUnitText || ""
    }

    /**
     * @param {object} opts 
     */
    update(opts) {
        //could happen when data is still loading
        if (!opts.s) return

        //clear
        this.div.selectAll("*").remove();

        const w = 100
        const h = 100

        const svg = this.div.append("svg").attr("width", w).attr("height",h)

        //title
        svg.append("text").attr("x", this.margin).attr("y", this.margin)
            .style("font-size", this.titleFontSize)
            .style("font-weight", "bold")
            .style("alignment-baseline", "top")
            .style("dominant-baseline", "hanging")
            .style("pointer-events", "none")
            .text(this.title)

        /*
        const g = svg.append("g").attr("transform", "translate(" + this.margin + " " + (2 * this.margin + titleHeight) + ")")

        //draw color bar
        const w = this.width, h = this.height
        const step = 5
        for (let i = 0; i < w; i += step) {
            let t = i / (w - 1)
            if (this.invert) t = 1 - t
            g.append("rect").attr("x", i).attr("y", 0).attr("width", step).attr("height", h).style("fill", this.colorRamp(t))
        }


        for (let i = 0; i < this.ticks; i++) {
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
