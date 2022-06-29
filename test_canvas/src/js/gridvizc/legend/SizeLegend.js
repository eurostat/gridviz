//@ts-check

import { select } from "d3-selection";
import { Legend } from "../Legend";
import { format } from "d3-format";
import { Style, Stat, Shape } from "../Style"
import { ShapeColorSizeStyle } from "../style/ShapeColorSizeStyle"

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

        //function (t[0,1], r, s) -> v (for label text)
        //this.fun = opts.fun

        //nb symbols
        this.nb = opts.nb || 3

        //symbol
        /** @private @type {Shape} */
        this.shape = opts.shape || "circle"
        this.fillColor = opts.fillColor || "none"
        this.strokeColor = opts.strokeColor || "black"
        this.strokeWidth = opts.strokeWidth || 1

        //label
        this.labelFontSize = opts.labelFontSize || 9
        this.labelUnitText = opts.labelUnitText || ""

    }

    /**
     * @param {{ style: ShapeColorSizeStyle, r: number, zf: number, sSize: Stat, sColor: Stat }} opts 
     */
    update(opts) {

        //could happen when data is still loading
        if (!opts.sSize) return

        //clear
        this.div.selectAll("*").remove();

        //get max value
        const value = opts.sSize.max


        //TODO exagerate value + make nice

        //compute size of symbol, in pix
        const size = opts.style.getSize()(value, opts.r, opts.sSize, opts.zf) / opts.zf;

        const svg = this.div.append("svg").attr("width", size).attr("height", size)
        if (this.shape === "square") {
            svg.append("rect")
                .attr("x", 0).attr("y", 0).attr("width", size).attr("height", size)
                .style("fill", this.fillColor)
                .style("stroke", this.strokeColor)
                .style("stroke-width", this.strokeWidth)
            //TODO test
        } else if (this.shape === "circle") {
            // <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />
            svg.append("circle")
                .attr("cx", size / 2).attr("cy", size / 2).attr("r", size / 2)
                .style("fill", this.fillColor)
                .style("stroke", this.strokeColor)
                .style("stroke-width", this.strokeWidth)
        } else if (this.shape === "donut") {
            //TODO
        } else {
            throw new Error('Unexpected shape:' + this.shape);
        }

        this.div.append("div")
            .style("font-size", this.labelFontSize + "pt")
            .style("font-weight", "bold")
            .text("XXX" + " " + this.labelUnitText)
    }
}
