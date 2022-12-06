//@ts-check

import { select } from "d3-selection";
import { Legend } from "../Legend";
//import { format } from "d3-format";
import { Style } from "../Style"

/**
 * A legend element for discrete color style.
 * Inspiration: https://observablehq.com/@d3/color-legend
 * 
 * @author Julien Gaffuri
 */
export class ColorDiscreteLegend extends Legend {

    /** @param {Object} opts */
    constructor(opts) {
        super(opts)
        opts = opts || {};

        /** @private @type {Array.<Array.<string>>} */
        this.colors = opts.colors

        /** @private @type {Array.<Array.<string>>} */
        this.breaksText = opts.breaksText

        this.dimension = opts.dimension || { h: 15, w: 20 }
        this.strokeColor = opts.strokeColor || "gray"
        this.strokeWidth = opts.strokeWidth || 1

        this.title = opts.title;
        this.titleFontSize = opts.titleFontSize || "0.8em";
        this.titleFontWeight = opts.titleFontWeight || "bold";

        //label
        this.labelFontSize = opts.labelFontSize || "0.8em"
        this.invert = opts.invert
    }

    /**
     * @param {{ style: Style, r: number, zf: number, sSize: import("../Style").Stat, sColor: import("../Style").Stat }} opts 
     */
    update(opts) {

        //clear
        this.div.selectAll("*").remove();

        //build

        //title
        if (this.title)
            this.div.append("div")
                .style("font-size", this.titleFontSize)
                .style("font-weight", this.titleFontWeight)
                .style("margin-bottom", "7px")
                .text(this.title)

        //classes
        const nb = this.colors.length
        if (nb == 0) return

        for (let i = 0; i < nb; i++) {

            //make div for category
            const d = this.div.append("div")
            //to enable vertical centering
            //.style("position", "relative")

            const sw = this.strokeWidth

            //draw graphic element
            const h = (this.dimension.h || 15)
            const w = (this.dimension.w || 20)
            d
                .append("div").style("display", "inline")

                .append("svg")
                .attr("width", w + 2 * sw).attr("height", h + 2 * sw)

                .append("rect")
                .attr("x", sw).attr("y", sw).attr("width", w).attr("height", h)
                .style("fill", this.colors[i])
                .style("stroke", this.strokeColor)
                .style("stroke-width", this.strokeWidth)

            /*/write label text
            d.append("div")
                //show on right of graphic
                .style("display", "inline")

                //center vertically
                //.style("position", "absolute").style("top", "0").style("bottom", "0")

                .style("padding-left", "5px")
                .style("font-size", this.labelFontSize)
                .text(cat[1])
                */
        }

    }


}
