//@ts-check

import { Legend } from "../Legend";
//import { format } from "d3-format";
import { Style } from "../Style"

/**
 * A legend element for color categrories.
 * 
 * @author Joseph Davies, Julien Gaffuri
 */
export class ColorCategoryLegend extends Legend {

    /** @param {Object} opts */
    constructor(opts) {
        super(opts)
        opts = opts || {};

        //col/categories array, in display order
        /** 
         * @private
         * @type {Array.<Array.<string>>} */
        this.colCat = opts.colCat || [["gray", "-"]]

        /** 
         * @private
         * @type {import("../Style").Shape} */
        this.shape = opts.shape || "circle"
        this.dimension = opts.dimension || { r: 8 }
        this.strokeColor = opts.strokeColor || "gray"
        this.strokeWidth = opts.strokeWidth || 1

        this.title = opts.title;
        this.titleFontSize = opts.titleFontSize || "0.8em";
        this.titleFontWeight = opts.titleFontWeight || "bold";

        //label
        this.labelFontSize = opts.labelFontSize || "0.8em"
    }

    /**
     * @param {{ style: Style, r: number, zf: number, sSize: import("../Style").Stat, sColor: import("../Style").Stat }} opts 
     */
    update(opts) {

        //clear
        this.div.selectAll("*").remove();


        //build

        if (this.title) {
            const d = this.div.append("div")
                .style("font-size", this.titleFontSize)
                .style("font-weight", this.titleFontWeight)
                .style("margin-bottom", "7px")
            d.text(this.title)
        }


        const nb = this.colCat.length
        if (nb == 0) return

        for (let i = 0; i < nb; i++) {
            const cat = this.colCat[i]
            const d = this.div.append("div");

            const sw = this.strokeWidth

            //draw box / circle
            if (this.shape === "square") {
                const h = (this.dimension.h || 15)
                const w = (this.dimension.w || 20)
                d
                    .append("div").style("display", "inline")

                    .append("svg")
                    .attr("width", w + 2 * sw).attr("height", h + 2 * sw)

                    .append("rect")
                    .attr("x", sw).attr("y", sw).attr("width", w).attr("height", h)
                    .style("fill", cat[0])
                    .style("stroke", this.strokeColor)
                    .style("stroke-width", this.strokeWidth)
            } else if (this.shape === "circle") {
                const r = this.dimension.r || 8
                const h = 2 * r + 2 * sw
                d
                    .append("div").style("display", "inline")

                    .append("svg")
                    .attr("width", h).attr("height", h)

                    .append("circle")
                    .attr("cx", r + sw).attr("cy", r + sw).attr("r", r)
                    .style("fill", cat[0])
                    .style("stroke", this.strokeColor)
                    .style("stroke-width", this.strokeWidth)
            } else {
                throw new Error('Unexpected shape:' + this.shape);
            }

            //Write label text
            d.append("div")
                .style("display", "inline")
                //.style("height", h)
                //.style("float", "right")
                .style("padding-left", "5px")
                .style("margin", "0")
                //.style("text-align", "left")
                .style("font-size", this.labelFontSize)
                //.style("font-weight", "bold")
                .text(cat[1])
        }

    }

}
