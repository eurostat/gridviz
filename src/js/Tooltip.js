//@ts-check

import { select, Selection } from "d3-selection";
//import { transition } from "d3-transition";

/**
 * A generic class to make a tooltip.
 * It is a div element, which can be moved under the mouse pointer and filled with some information in html.
 */
export class Tooltip {

	/** 
	 * @param {object} opts
	 */
	constructor(opts = undefined) {
		opts = opts || {};

		/** @type {string} */
		this.div = opts.div || "tooltip_eurostat";
		/** @type {string} */
		this.maxWidth = opts.maxWidth || "20em";
		/** @type {string} */
		this.fontSize = opts.fontSize || "1.2em";
		/** @type {string} */
		this.background = opts.background || "white";
		/** @type {string} */
		this.padding = opts.padding || "5px";
		/** @type {string} */
		this.border = opts.border || "0px";
		/** @type {string} */
		this["border-radius"] = opts["border-radius"] || "5px";
		/** @type {string} */
		this["box-shadow"] = opts["box-shadow"] || "5px 5px 5px grey";
		/** @type {string} */
		this["font-family"] = opts["font-family"] || "Helvetica, Arial, sans-serif";

		/** @type {number} */
		this.transitionDuration = opts.transitionDuration || 100;
		/** @type {number} */
		this.xOffset = opts.xOffset || 30;
		/** @type {number} */
		this.yOffset = opts.yOffset || 20;


		/** 
		 * @private
		 * @type {Selection} */
		this.tooltip = select("#" + this.div);
		if (this.tooltip.empty())
			this.tooltip = select("body").append("div").attr("id", this.div);

		//initialise
		this.tooltip.style("max-width", this.maxWidth);
		this.tooltip.style("overflow", "hidden");
		this.tooltip.style("font-size", this.fontSize);
		this.tooltip.style("background", this.background);
		this.tooltip.style("padding", this.padding);
		this.tooltip.style("border", this.border);
		this.tooltip.style("border-radius", this["border-radius"]);
		this.tooltip.style("box-shadow", this["box-shadow"]);
		this.tooltip.style("font-family", this["font-family"]);
		this.tooltip.style("position", "absolute");
		this.tooltip.style("pointer-events", "none");
		this.tooltip.style("opacity", "0");
	}


	/** Show the tooltip */
	show() {
		// @ts-ignore
		this.tooltip.transition().duration(this.transitionDuration).style("opacity", 1);
	}

	/** Hide the tooltip */
	hide() {
		// @ts-ignore
		this.tooltip.transition().duration(this.transitionDuration).style("opacity", 0);
	}

	/**
	 * Set the content of the tooltip.
	 * @param {string} html 
	 */
	html(html) {
		this.tooltip.html(html);
	}

	/**
	 * Set the position of the tooltip at the mouse event position.
	 * @param {MouseEvent} event 
	 */
	setPosition(event) {
		this.tooltip.style("left", (event.pageX + this.xOffset) + "px").style("top", (event.pageY - this.yOffset) + "px")
	}

	/*
	my.mouseover = function (event, html) {
		if (html) my.html(html);
		my.setPosition(event);
		my.show()
		//this.ensureTooltipOnScreen();
	};
	
	my.mousemove = function (event) {
		my.setPosition(event);
		//this.ensureTooltipOnScreen();
	};
	
	my.mouseout = function () {
		my.hide();
	};*/

	style(k, v) {
		if (arguments.length == 1) return this.tooltip.style(k);
		this.tooltip.style(k, v);
		return this;
	};

	attr(k, v) {
		if (arguments.length == 1) return this.tooltip.attr(k);
		this.tooltip.attr(k, v);
		return this;
	};


	/**
	* @function ensureTooltipOnScreen
	* @description Prevents the tooltip from overflowing off screen
	*/
	/*my.ensureTooltipOnScreen = function () {
		// TODO: parent needs to be the all-encompassing container, not the map SVG id otherwise it just uses the last SVG which will be an inset SVG.
		let parent = document.getElementById(config.parentContainerId);
		let bbox = parent.getBBox();
		let parentWidth = bbox.width;
		let parentHeight = bbox.height;
		let node = tooltip.node();
		//too far right
		if (node.offsetLeft > parentWidth - node.clientWidth) {
			node.style.left = node.offsetLeft - (node.clientWidth + config.xOffset * 2) + "px";
	
		}
		//too far down
		if (node.offsetTop + node.clientHeight > parentHeight) {
			node.style.top = node.offsetTop - (node.clientHeight + config.yOffset * 2) + "px";
		}
	
	}*/

}
