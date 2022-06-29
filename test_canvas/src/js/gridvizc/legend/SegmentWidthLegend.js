//@ts-check

import { Legend } from "../Legend";
import { format } from "d3-format";
import { Stat, Shape } from "../Style"
import { SegmentStyle } from "../style/SegmentStyle"

/**
 * A legend element for segment width.
 * 
 * @author Julien Gaffuri
 */
export class SegmentWidthLegend extends Legend {

    /** @param {Object} opts */
    constructor(opts) {
        super(opts)
        opts = opts || {};

        //exageration
        this.exaggerationFactor = opts.exaggerationFactor || 0.8

        //stroke
        this.strokeColor = opts.strokeColor || "gray"

        //label
        this.labelFontSize = opts.labelFontSize || 9
        this.labelUnitText = opts.labelUnitText || ""

        //
        this.div.style("text-align", "center")
    }

    /**
     * @param {{ style: SegmentStyle, r: number, zf: number, sSize: Stat, sColor: Stat }} opts 
     */
    update(opts) {

        //could happen when data is still loading
        if (!opts.sSize) return

        //clear
        this.div.selectAll("*").remove();

        //get max value
        const value_ = opts.sSize.max * this.exaggerationFactor

        //take 'nice' value (power of ten, or multiple)
        let pow10 = Math.log10(value_)
        pow10 = Math.floor(pow10)
        let value = Math.pow(10, pow10)
        if (value * 8 <= value_) value *= 8
        else if (value * 6 <= value_) value *= 6
        else if (value * 5 <= value_) value *= 5
        else if (value * 4 <= value_) value *= 4
        else if (value * 2.5 <= value_) value *= 2.5
        else if (value * 2 <= value_) value *= 2

        //compute size of symbol, in pix
        const size = opts.style.getSize()(value, opts.r, opts.sSize, opts.zf) / opts.zf;

        const svg = this.div.append("svg").attr("width", size + this.strokeWidth + 2).attr("height", size + this.strokeWidth + 2)
            .style("", "inline-block")

        if (this.shape === "square") {
            svg.append("rect")
                .attr("x", 0).attr("y", 0).attr("width", size).attr("height", size)
                .style("fill", this.fillColor)
                .style("stroke", this.strokeColor)
                .style("stroke-width", this.strokeWidth)
            //TODO test
        } else if (this.shape === "circle") {
            // <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />
            const r = (size + this.strokeWidth) * 0.5
            svg.append("circle")
                .attr("cx", r + 1).attr("cy", r + 1).attr("r", r)
                .style("fill", this.fillColor)
                .style("stroke", this.strokeColor)
                .style("stroke-width", this.strokeWidth)
        } else if (this.shape === "donut") {
            //TODO
        } else {
            throw new Error('Unexpected shape:' + this.shape);
        }

        const valueT = format(",.2r")(value);
        this.div.append("div")
            .style("font-size", this.labelFontSize + "pt")
            //.style("font-weight", "bold")
            .style("", "inline-block")
            .text(valueT + (this.labelUnitText? " ":"") + this.labelUnitText)
    }
}
