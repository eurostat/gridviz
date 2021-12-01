//@ts-check

import { select } from "d3-selection";
import { transition } from "d3-transition";

/**
 * @param {*} config
 * @returns
 */
export const tooltip = function (config) {
	config = config || {};
	config.div = config.div || "tooltip_eurostat";
	config.maxWidth = config.maxWidth || "200px";
	config.fontSize = config.fontSize || "14px";
	config.background = config.background || "white";
	config.padding = config.padding || "5px";
	config.border = config.border || "0px";
	config["border-radius"] = config["border-radius"] || "5px";
	config["box-shadow"] = config["box-shadow"] || "5px 5px 5px grey";
	config["font-family"] = config["font-family"] || "Helvetica, Arial, sans-serif";

	config.transitionDuration = config.transitionDuration || 200;
	config.xOffset = config.xOffset || 30;
	config.yOffset = config.yOffset || 20;

	var tooltip;

	function my() {
		tooltip = select("#" + config.div);
		if (tooltip.empty())
			tooltip = select("body").append("div").attr("id", config.div);

		//tooltip.style("width",config.width);
		tooltip.style("max-width", config.maxWidth);
		tooltip.style("overflow", "hidden");
		tooltip.style("font-size", config.fontSize);
		tooltip.style("background", config.background);
		tooltip.style("padding", config.padding);
		tooltip.style("border", config.border);
		tooltip.style("border-radius", config["border-radius"]);
		tooltip.style("box-shadow", config["box-shadow"]);
		tooltip.style("position", "absolute");
		tooltip.style("font-family", config["font-family"]);
		tooltip.style("position", "absolute");
		tooltip.style("pointer-events", "none");
		tooltip.style("opacity", "0");
	}

	/**
	 * @param {string} html 
	 */
	my.html = function(html) {
		tooltip.html(html);
	}

	my.show = function() {
		tooltip.transition().duration(config.transitionDuration).style("opacity", 1);
	}

	my.hide = function() {
		tooltip.transition().duration(config.transitionDuration).style("opacity", 0);
	}

	my.setPosition = function(event) {
		tooltip.style("left", (event.pageX + config.xOffset) + "px").style("top", (event.pageY - config.yOffset) + "px")
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

	my.style = function (k, v) {
		if (arguments.length == 1) return tooltip.style(k);
		tooltip.style(k, v);
		return my;
	};

	my.attr = function (k, v) {
		if (arguments.length == 1) return tooltip.attr(k);
		tooltip.attr(k, v);
		return my;
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

	my();
	return my;
};
