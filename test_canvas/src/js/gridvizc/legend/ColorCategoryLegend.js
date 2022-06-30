//@ts-check

import { Legend } from "../Legend";
import { format } from "d3-format";
import { Stat, Shape, Style } from "../Style"

/**
 * A legend element for color categrories.
 * 
 * @author Julien Gaffuri
 */
export class ColorCategoryLegend extends Legend {

    /** @param {Object} opts */
    constructor(opts) {
        super(opts)
        opts = opts || {};

        //col/categories array, in display order
        /** @private @type {Array.<Array.<string>>} */
        this.colCat = opts.colCat || [["gray", "-"]]

        /** @private @type {Shape} */
        this.shape = opts.shape || "circle"
        this.dimension = opts.dimension || { r: 8 }
        this.strokeColor = opts.strokeColor || "gray"
        this.strokeWidth = opts.strokeWidth || 1

        //label
        this.labelFontSize = opts.labelFontSize || 9


        //build

        const nb = this.colCat.length
        if (nb == 0) return

        for (let i = 0; i < nb; i++) {
            const cat = this.colCat[i]
            const d = this.div.append("div")
            const sw = this.strokeWidth

            //draw box / circle
            if (this.shape === "square") {
                d.append("svg").attr("width", (this.dimension.w || 20) + 2 * sw).attr("height", (this.dimension.h || 15) + 2 * sw)
                    .append("rect")
                    .attr("x", sw).attr("y", sw).attr("width", (this.dimension.w || 20) + 2 * sw).attr("height", (this.dimension.h || 15) + 2 * sw)
                    .style("fill", cat[0])
                    .style("stroke", this.strokeColor)
                    .style("stroke-width", this.strokeWidth)
            } else if (this.shape === "circle") {
                const r = this.dimension.r || 8
                d.append("svg").attr("width", 2 * r + 2 * sw).attr("height", 2 * r + 2 * sw)
                    .append("circle")
                    .attr("cx", r + sw).attr("cy", r + sw).attr("r", r)
                    .style("fill", cat[0])
                    .style("stroke", this.strokeColor)
                    .style("stroke-width", this.strokeWidth)
            } else {
                throw new Error('Unexpected shape:' + this.shape);
            }

            //Write label

            //d.ap

        }
/*
        const valueT = format(",.2r")(value);
        this.div.append("div")
            .style("font-size", this.labelFontSize + "pt")
            //.style("font-weight", "bold")
            .style("", "inline-block")
            .text(valueT + (this.labelUnitText ? " " : "") + this.labelUnitText)
*/

    }

    /**
     * @param {{ style: Style, r: number, zf: number, sSize: Stat, sColor: Stat }} opts 
     */
    update(opts) { }

}
