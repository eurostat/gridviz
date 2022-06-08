//@ts-check

import { Style } from "./Style";
import { select } from "d3-selection";

/**
 * 
 * @author Julien Gaffuri
 */
export class Legend {

    /**
     * @param {Style} style
     * @param {Object} opts 
     */
    constructor(style, opts) {
		opts = opts || {};

		this.style = style

		/** @type {string} */
		this.id = opts.id || "legend";
		/** @type {string} */
		//this.maxWidth = opts.maxWidth || "200px";
		/** @type {string} */
		//this.fontSize = opts.fontSize || "14px";
		/** @type {string} */
		this.background = opts.background || "#FFFFFFCC";
		/** @type {string} */
		this.padding = opts.padding || "5px";
		/** @type {string} */
		this.border = opts.border || "0px";
		/** @type {string} */
		this["border-radius"] = opts["border-radius"] || "5px";
		/** @type {string} */
		//this["box-shadow"] = opts["box-shadow"] || "5px 5px 5px grey";
		/** @type {string} */
		this["font-family"] = opts["font-family"] || "Helvetica, Arial, sans-serif";

        //the div element
        this.div = select("#" + this.id);
		if (this.div.empty()) {
			this.div = select("body").append("div").attr("id", this.id)
            .style("position", "absolute")
            .style("left", "100px")
            .style("top", "100px")
        }

		//initialise
		//this.div.style("max-width", 100);
        this.div.style("max-width", "100px");
		//this.div.style("font-size", this.fontSize);
		this.div.style("background", this.background);
		this.div.style("padding", this.padding);
		this.div.style("border", this.border);
		this.div.style("border-radius", this["border-radius"]);
		this.div.style("font-family", this["font-family"]);
		//this.div.style("opacity", "0.5");

    }

    show() {
		this.div.style("visibility", "visibile");
    }

    hide () {
		this.div.style("visibility", "hidden");
    }

    /** */
    update() {
        console.log("Legend update not implemented yet")
    }
}
