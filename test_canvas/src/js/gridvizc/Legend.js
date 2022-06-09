//@ts-check

import { Style } from "./Style";
import { select } from "d3-selection";

/**
 * 
 * @author Julien Gaffuri
 */
export class Legend {

	/**
	 * @param {Object} opts 
	 */
	constructor(opts) {
		opts = opts || {};

		/** @type {string} */
		this.id = opts.id || "legend";
		/** @type {number} */
		this.x = opts.x || 20;
		/** @type {number} */
		this.y = opts.y || 20;
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
				.style("left", this.x + "px")
				.style("top", this.y + "100px")
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

	/** Show the legend */
	show() {
		this.div.style("visibility", "visible");
	}

	/** Hide the legend */
	hide() {
		this.div.style("visibility", "hidden");
	}

	/**
	 * @param {Object} opts 
	 * @abstract
	 */
	update(opts) {
		console.error("Legend update not implemented yet.")
	}

}
