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

        this.width = opts.width || 300
        this.height = opts.height || 15

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
        const w = this.width / nb

        for (let i = 0; i < nb; i++) {

            //draw graphic element
            this.div
                .append("div").style("display", "inline")

                .append("svg")
                .attr("width", w).attr("height", this.height)

                .append("rect")
                .attr("x", 0).attr("y", 0).attr("width", w).attr("height", this.height)
                .style("fill", this.colors[i])

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
