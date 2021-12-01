//@ts-check

import { select } from "d3-selection";
import { transition } from "d3-transition";

export class Tooltip2 {

	constructor(config) {
		config = config || {};
		this.div = config.div || "tooltip_eurostat";
		this.maxWidth = config.maxWidth || "200px";
		this.fontSize = config.fontSize || "14px";
		this.background = config.background || "white";
		this.padding = config.padding || "5px";
		this.border = config.border || "0px";
		this["border-radius"] = config["border-radius"] || "5px";
		this["box-shadow"] = config["box-shadow"] || "5px 5px 5px grey";
		this["font-family"] = config["font-family"] || "Helvetica, Arial, sans-serif";

		this.transitionDuration = config.transitionDuration || 200;
		this.xOffset = config.xOffset || 30;
		this.yOffset = config.yOffset || 20;


		this.tooltip = select("#" + config.div);
		if (this.tooltip.empty())
			this.tooltip = select("body").append("div").attr("id", config.div);

		//this.tooltip.style("width",config.width);
		this.tooltip.style("max-width", config.maxWidth);
		this.tooltip.style("overflow", "hidden");
		this.tooltip.style("font-size", config.fontSize);
		this.tooltip.style("background", config.background);
		this.tooltip.style("padding", config.padding);
		this.tooltip.style("border", config.border);
		this.tooltip.style("border-radius", config["border-radius"]);
		this.tooltip.style("box-shadow", config["box-shadow"]);
		this.tooltip.style("position", "absolute");
		this.tooltip.style("font-family", config["font-family"]);
		this.tooltip.style("position", "absolute");
		this.tooltip.style("pointer-events", "none");
		this.tooltip.style("opacity", "0");
	}


	/**
	* @param {string} html 
	*/
	html(html) {
		this.tooltip.html(html);
	}

	show() {
		this.tooltip.transition().duration(this.transitionDuration).style("opacity", 1);
	}

	hide() {
		this.tooltip.transition().duration(this.transitionDuration).style("opacity", 0);
	}

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
