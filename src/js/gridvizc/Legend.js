//@ts-check

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
		this.id = opts.id;
		/** @type {number} */
		this.top = opts.top;
		/** @type {number} */
		this.bottom = opts.bottom;
		/** @type {number} */
		this.left = opts.left;
		/** @type {number} */
		this.right = opts.right;
		/** @type {string} */
		this.background = opts.background || "none";
		/** @type {string} */
		this.padding = opts.padding || "5px";
		/** @type {string} */
		this.border = opts.border || "0px";
		/** @type {string} */
		this["border-radius"] = opts["border-radius"] || "none";
		/** @type {string} */
		this["box-shadow"] = opts["box-shadow"] || "none";
		/** @type {string} */
		this["font-family"] = opts["font-family"] || "Helvetica, Arial, sans-serif";

		//the div element
		if (this.id)
			this.div = select("#" + this.id);
		if (!this.div || this.div.empty()) {
			this.div = select(document.createElement("div"))
			if (this.id)
				this.div.attr("id", this.id);
		}

		//set style
		this.div
			//.style("position", "absolute")
			//.style("width", "auto")
			//.style("height", "auto")
			//.style("min-width", "10px")
			//.style("min-height", "10px")
			//.style("overflow", "hidden")
			//.style("max-width", 100)
			//this.div.style("max-width", "100px")
			//this.div.style("font-size", this.fontSize)
			.style("background", this.background)
			.style("padding", this.padding)
			.style("border", this.border)
			.style("border-radius", this["border-radius"])
			.style("box-shadow", this["box-shadow"])
			.style("font-family", this["font-family"])

		/*
	if (this.top) this.div.style("top", this.top)
	if (this.bottom) this.div.style("bottom", this.bottom)
	if (this.left) this.div.style("left", this.left)
	if (this.right) this.div.style("right", this.right)*/

		//hide
		//this.div.style("visibility", "hidden");
	}

	/**
	 * @param {Object} opts 
	 * @abstract
	 */
	update(opts) {
		console.error("Legend update not implemented yet.")
	}

}
