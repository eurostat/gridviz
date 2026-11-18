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
        this.fontSize = opts.fontSize || '1rem'
        /** @type {string} */
        this.color = opts.color || '#171a22'
        /** @type {string} */
        this.lineHeight = opts.lineHeight || '1.5'
        /** @type {string} */
        this.background = opts.background || 'white'
        /** @type {string} */
        this.padding = opts.padding || '4px'
        /** @type {string} */
        this.border = opts.border || '1px solid #d5d5d5'
        /** @type {string} */
        this['border-radius'] = opts['border-radius'] || '6px'
        /** @type {string} */
        this['box-shadow'] = opts['box-shadow'] || '0px 4px 6px rgba(0, 0, 0, 0.1), 0px 1px 3px rgba(0, 0, 0, 0.08)'
        /** @type {string} */
        this['font-family'] = opts['font-family'] || "'Helvetica Neue', Arial, Helvetica, sans-serif"

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
        this.tooltip.style('color', this.color)
        this.tooltip.style('line-height', this.lineHeight)
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

        // a tooltip element given by the user gets the class too
        this.tooltip.classed('gridviz-tooltip', true)

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
     * @description Keeps the tooltip inside its parent element (the gridviz container): to the right of the pointer, or to
     * its left when it does not fit there. When it fits on neither side on one line, it wraps onto several lines on the
     * side with more room. Positions are relative to the parent element.
     * @param {MouseEvent} event
     * @param {DOMRect} parentRect
     * @param {HTMLElement} tooltipNode
     */
    ensureTooltipInsideContainer(event, parentRect, tooltipNode) {
        const node = tooltipNode
        const parentWidth = parentRect.width
        const parentHeight = parentRect.height
        const mouseX = event.clientX - parentRect.left

        // start from one line, as wide as the content up to maxWidth
        node.style.maxWidth = this.maxWidth
        node.style.setProperty('text-wrap', 'nowrap')
        let left = tooltipLeft(mouseX, node.offsetWidth, parentWidth, this.xOffset)
        if (left === undefined) {
            // too wide for both sides of the pointer: wrap it within the wider side
            const { side, room } = tooltipRoom(mouseX, parentWidth, this.xOffset)
            const cs = getComputedStyle(node)
            const frame =
                parseFloat(cs.paddingLeft) +
                parseFloat(cs.paddingRight) +
                parseFloat(cs.borderLeftWidth) +
                parseFloat(cs.borderRightWidth)
            node.style.setProperty('text-wrap', 'wrap')
            node.style.maxWidth = Math.max(0, room - (cs.boxSizing === 'border-box' ? 0 : frame)) + 'px'
            left = side === 'right' ? mouseX + this.xOffset : mouseX - this.xOffset - node.offsetWidth
            left = Math.max(0, Math.min(left, parentWidth - node.offsetWidth))
        }
        node.style.left = left + 'px'

        // Ensure tooltip doesn't go beyond the bottom edge
        if (node.offsetTop + node.offsetHeight > parentHeight) {
            node.style.top = parentHeight - node.offsetHeight + 'px'
        }

        // Ensure tooltip doesn't go above the top edge
        if (node.offsetTop < 0) {
            node.style.top = 0 + 'px'
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

/**
 * Where a tooltip of a given width goes, relative to its container: to the right of the pointer, or to its left when it
 * does not fit there.
 * @param {number} mouseX The pointer, from the left of the container, in pixels.
 * @param {number} width The width of the tooltip.
 * @param {number} containerWidth
 * @param {number} xOffset The gap between the pointer and the tooltip.
 * @returns {number|undefined} The left of the tooltip, or undefined when it fits on neither side.
 */
export function tooltipLeft(mouseX, width, containerWidth, xOffset) {
    const right = mouseX + xOffset
    if (right + width <= containerWidth) return right
    const left = mouseX - xOffset - width
    if (left >= 0) return left
    return undefined
}

/**
 * The side of the pointer with more room for a tooltip, and that room in pixels.
 * @param {number} mouseX The pointer, from the left of the container, in pixels.
 * @param {number} containerWidth
 * @param {number} xOffset The gap between the pointer and the tooltip.
 * @returns {{side:'left'|'right', room:number}}
 */
export function tooltipRoom(mouseX, containerWidth, xOffset) {
    const right = containerWidth - mouseX - xOffset
    const left = mouseX - xOffset
    return right >= left ? { side: 'right', room: Math.max(0, right) } : { side: 'left', room: Math.max(0, left) }
}
