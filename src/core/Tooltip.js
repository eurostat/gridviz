//@ts-check
'use strict'

import { select } from 'd3-selection'
//import { transition } from "d3-transition";

/**
 * A generic class to make a tooltip.
 * It is a div element, which can be moved under the mouse pointer and filled with some information in html.
 * @module core
 */
export class Tooltip {
    /**
     * @param {object} opts
     */
    constructor(opts) {
        opts = opts || {}

        /** @type {string} */
        this.maxWidth = opts.maxWidth || '20em'
        /** @type {string} */
        this.fontSize = opts.fontSize || '1.2em'
        /** @type {string} */
        this.background = opts.background || 'white'
        /** @type {string} */
        this.padding = opts.padding || '5px'
        /** @type {string} */
        this.border = opts.border || '0px'
        /** @type {string} */
        this['border-radius'] = opts['border-radius'] || '0px'
        /** @type {string} */
        this['box-shadow'] = opts['box-shadow'] || '5px 5px 5px grey'
        /** @type {string} */
        this['font-family'] = opts['font-family'] || 'Helvetica, Arial, sans-serif'

        /** @type {number} */
        this.transitionDuration = opts.transitionDuration || 100
        /** @type {number} */
        this.xOffset = opts.xOffset || 30
        /** @type {number} */
        this.yOffset = opts.yOffset || 20
        /** @type {number} */ // e.g. to prevent mouse cursor covering cell being highlighted
        this.yMouseOffset = opts.yMouseOffset || 0
        /** @type {number} */
        this.xMouseOffset = opts.xMouseOffset || 0
        /** @type {HTMLElement} */
        this.parentElement = opts.parentElement || document.body
        /** @type {HTMLElement} */
        this.tooltipElement = opts.tooltipElement || null

        /**
         * @public
         * @type {import("d3-selection").Selection} */
        this.tooltip = opts.tooltipElement
            ? select(opts.tooltipElement) // Wrap the provided HTML node in a D3 selection
            : select(this.parentElement).append('div').attr('id', 'gridviz-tooltip').attr('class', 'gridviz-tooltip') // create default element

        //initialise
        this.tooltip.style('max-width', this.maxWidth)
        this.tooltip.style('overflow', 'hidden')
        this.tooltip.style('font-size', this.fontSize)
        this.tooltip.style('background', this.background)
        this.tooltip.style('padding', this.padding)
        this.tooltip.style('border', this.border)
        this.tooltip.style('border-radius', this['border-radius'])
        this.tooltip.style('box-shadow', this['box-shadow'])
        this.tooltip.style('font-family', this['font-family'])
        this.tooltip.style('position', 'absolute')
        this.tooltip.style('pointer-events', 'none')
        this.tooltip.style('opacity', '0')
        this.tooltip.style('text-wrap', 'nowrap')
        this.tooltip.style('z-index', 99999999) // important for leaflet-gridviz etc

        // these placeholders are needed to prevent an infinite DOM resizeObserver loop:
        this.tooltip.style('left', '0')
        this.tooltip.style('top', '0')

        // aria-labels (thanks to wahlatlas)
        this.tooltip.attr('role', 'tooltip').attr('aria-live', 'polite')
    }

    /** Show the tooltip */
    show() {
        // @ts-ignore
        this.tooltip.transition().duration(this.transitionDuration).style('opacity', 1)
    }

    /** Hide the tooltip */
    hide() {
        // @ts-ignore
        this.tooltip.transition().duration(this.transitionDuration).style('opacity', 0)
    }

    /**
     * Set the content of the tooltip.
     * @param {string} html
     */
    html(html) {
        this.tooltip.html(html)
    }

    /**
     * Set the position of the tooltip at the mouse event position.
     * @param {MouseEvent} event
     */
    setPosition(event) {
        // Get the bounding rect of the parent container (map2)
        let parentRect = this.parentElement.getBoundingClientRect()

        // Get the mouse position (relative to the parent container)
        let x = event.clientX - parentRect.left + this.xOffset // Relative to parent
        let y = event.clientY - parentRect.top - this.yOffset // Relative to parent

        // Now, apply the position to the tooltip
        this.tooltip.style('left', x + 'px').style('top', y + 'px')

        // Ensure the tooltip stays inside the parent container
        this.ensureTooltipInsideContainer(event, parentRect, this.tooltip.node())
    }
    /**
     * @function ensureTooltipInsideContainer
     * @description Prevents the tooltip from overflowing out of the App container (ensures that the tooltip is inside the gridviz container)
     * @param {MouseEvent} event
     * @param {DOMRect} parentRect
     * @param {HTMLElement} tooltipNode
     */
    ensureTooltipInsideContainer(event, parentRect, tooltipNode) {
        let node = tooltipNode
        let parentWidth = parentRect.width
        let parentHeight = parentRect.height

        // Ensure tooltip doesn't go beyond the right edge
        if (node.offsetLeft + node.clientWidth > parentWidth) {
            let left = event.clientX - node.clientWidth - this.xOffset
            node.style.left = left + 'px'
        }

        // Ensure tooltip doesn't go beyond the bottom edge
        if (node.offsetTop + node.clientHeight > parentHeight) {
            node.style.top = parentHeight - node.clientHeight + 'px'
        }

        // Ensure tooltip doesn't go above the top edge
        if (node.offsetTop < 0) {
            node.style.top = 0 + 'px'
        }

        // Ensure tooltip doesn't go beyond the left edge
        if (node.offsetLeft < 0) {
            node.style.left = 0 + 'px'
        }
    }

    /*
	my.mouseover = function (event, html) {
		if (html) my.html(html);
		my.setPosition(event);
		my.show()
		//this.ensureTooltipInsideContainer();
	};
	
	my.mousemove = function (event) {
		my.setPosition(event);
		//this.ensureTooltipInsideContainer();
	};
	
	my.mouseout = function () {
		my.hide();
	};*/

    style(k, v) {
        if (arguments.length == 1) return this.tooltip.style(k)
        this.tooltip.style(k, v)
        return this
    }

    attr(k, v) {
        if (arguments.length == 1) return this.tooltip.attr(k)
        this.tooltip.attr(k, v)
        return this
    }
}
