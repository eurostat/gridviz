//@ts-check
'use strict'

import { select } from 'd3-selection'

/**
 * A legend container.
 *
 * @module core
 * @author Joseph Davies, Julien Gaffuri
 */
export class Legend {
    /**
     * @param {Object} opts
     */
    constructor(opts) {
        opts = opts || {}

        /** @type {string} */
        this.id = opts.id

        //TODO stop using it. Use style method below instead.

        /** @type {number} @deprecated */
        this.top = opts.top
        /** @type {number} @deprecated */
        this.bottom = opts.bottom
        /** @type {number} @deprecated */
        this.left = opts.left
        /** @type {number} @deprecated */
        this.right = opts.right
        /** @type {string} @deprecated */
        this.background = opts.background || 'none'
        /** @type {string} @deprecated */
        this.padding = opts.padding || '5px'
        /** @type {string} @deprecated */
        this.border = opts.border || '0px'
        /** @type {string} @deprecated */
        this['border-radius'] = opts['border-radius'] || 'none'
        /** @type {string} @deprecated */
        this['box-shadow'] = opts['box-shadow'] || 'none'
        /** @type {string} @deprecated */
        this['font-family'] = opts['font-family'] || 'Helvetica, Arial, sans-serif'
        /** @type {string} @deprecated */
        //this.width = opts.width
        /** @type {string} @deprecated */
        //this.height = opts.height

        //the div element
        if (this.id) this.div = select('#' + this.id)

        if (!this.div || this.div.empty()) {
            this.div = select(document.createElement('div'))
            if (this.id) this.div.attr('id', this.id)
        }

        // Which style options the caller set. The ones they didn't set are written as a CSS variable with the
        // usual value as its fallback (--gridviz-legend-font-family, ...): nothing changes unless a page defines the variable.
        /** @private */
        this._set = {
            padding: opts.padding !== undefined,
            fontFamily: opts['font-family'] !== undefined,
            titleFontSize: opts.titleFontSize !== undefined,
            titleFontWeight: opts.titleFontWeight !== undefined,
            labelFontSize: opts.labelFontSize !== undefined,
        }

        // CSS classes, to style legends from a stylesheet: gridviz-legend on every legend, a modifier for the
        // type (see each legend class), and whatever the caller asks for with the className option.
        this.div.classed('gridviz-legend', true)
        if (opts.className)
            for (const c of String(opts.className).split(/\s+/)) if (c) this.div.classed(c, true)

        //set style
        this.div.style('background', this.background)
        this.div.style('padding', this._css('padding', this.padding, this._set.padding))
        this.div.style('border', this.border)
        this.div.style('border-radius', this['border-radius'])
        this.div.style('box-shadow', this['box-shadow'])
        this.div.style('font-family', this._css('font-family', this['font-family'], this._set.fontFamily))

        //if (this.width) this.div.style('width', this.width)
        //if (this.height) this.div.style('height', this.height)

        //title
        this.title = opts.title
        this.titleFontSize = opts.titleFontSize || '0.8em'
        this.titleFontWeight = opts.titleFontWeight || 'bold'

        //label
        this.labelFontSize = opts.labelFontSize || '0.8em'
        this.labelUnitText = opts.labelUnitText || ''
        this.labelFormat = opts.labelFormat

        /**
         * Whether the title and the labels are HTML (to italicise a word, for example) instead of plain text.
         * Off by default, which is plain text. Only turn it on for text you trust: it is not escaped.
         * @type {boolean} */
        this.labelsAsHTML = opts.labelsAsHTML === true

        /**
         * Whether hovering a swatch of the legend shows only the matching cells on the map.
         * @type {boolean} */
        this.interactive = opts.interactive !== false

        /**
         * The style the legend belongs to, and a function to redraw the map. Both set by the layer when it draws.
         * @type {import('./Style.js').Style|undefined} */
        this.style_ = undefined
        /** @type {function|undefined} */
        this.redraw = undefined
        /**
         * The element the legends are drawn in, set by the layer when it draws.
         * @type {HTMLElement|undefined} */
        this.container = undefined

        /**
         * Draw at the width of the container instead of this.width (width:'fill').
         * @type {boolean} @protected */
        this.fill = opts.width === 'fill'
    }

    /**
     * Show only the cells drawn in some colours on the map, or all of them again.
     * @param {Array.<string>|null} colors
     */
    highlight(colors) {
        if (!this.interactive || !this.style_) return
        const before = this.style_.highlightColors
        // flag the legend while hovered, so that the map's redraw leaves its element in place:
        // a hovered element that is detached and appended again never gets its mouseleave
        if (this.div) this.div.attr('data-gridviz-hovered', colors && colors.length ? '' : null)
        this.style_.setHighlight(colors)
        // nothing to redraw when the highlight didn't change (mouse moving between a swatch's parts)
        if (before === null && this.style_.highlightColors === null) return
        if (this.redraw) this.redraw()
    }

    /**
     * Make a swatch react to the mouse: hovering it highlights the cells of a colour on the map.
     * @param {*} selection The d3 selection of the swatch (any element)
     * @param {string} color The colour the swatch stands for
     * @param {{enter?:function, leave?:function}} [extra] Extra feedback on the swatch itself
     */
    bindHover(selection, color, extra) {
        if (!this.interactive) return
        selection
            .style('cursor', 'pointer')
            .on('mouseenter', () => {
                if (extra && extra.enter) extra.enter()
                this.highlight([color])
            })
            .on('mouseleave', () => {
                if (extra && extra.leave) extra.leave()
                this.highlight(null)
            })
    }

    /**
     * A style value with a CSS variable around it, unless the caller set the option themselves.
     * @param {string} name The variable's name, after --gridviz-legend-
     * @param {string} value The value to use when the variable isn't defined
     * @param {boolean} custom
     * @returns {string}
     * @protected
     */
    _css(name, value, custom) {
        return custom ? value : `var(--gridviz-legend-${name}, ${value})`
    }

    /** The font size of the labels, for the style() of a label element.
     * @returns {string}
     * @protected */
    labelFontSizeCSS() {
        return this._css('label-font-size', this.labelFontSize, this._set.labelFontSize)
    }

    /**
     * Mark the root element as a type of legend: the CSS class gridviz-legend--<type>.
     * @param {string} type
     * @protected
     */
    setType(type) {
        this.div.classed('gridviz-legend--' + type, true)
    }

    /**
     * The width to draw at: this.width, or with width:'fill' the width of the container the legends are in
     * (the legendContainer of the map), less this legend's own padding.
     * @param {number} fallback Used when the container has no width (yet, or hidden)
     * @returns {number}
     * @protected
     */
    availableWidth(fallback) {
        if (!this.fill) return this.width
        const container = this.container
        const w = container && container.clientWidth
        if (!w) return fallback
        const p = parseFloat(this.padding) || 0
        return Math.max(60, Math.floor(w - 2 * p))
    }

    /**
     * Set the text of a d3 selection: as HTML if the legend has labelsAsHTML, as plain text otherwise.
     * @param {*} selection
     * @param {string} text
     * @protected
     */
    setText(selection, text) {
        return this.labelsAsHTML ? selection.html(text) : selection.text(text)
    }

    makeTitle() {
        if (!this.title) return
        this.setText(
            this.div
                .append('div')
                .classed('gridviz-legend-title', true)
                .style('font-size', this._css('title-font-size', this.titleFontSize, this._set.titleFontSize))
                .style('font-weight', this._css('title-font-weight', this.titleFontWeight, this._set.titleFontWeight))
                .style('margin-bottom', '7px'),
            this.title
        )
    }

    /**
     * Apply a style to the legend div.
     * @param {string} k
     * @param {string} v
     * @returns {this|string}
     */
    style(k, v) {
        if (arguments.length == 1) return this.div.style(k)
        this.div.style(k, v)
        return this
    }

    /**
     * @param {Object} opts
     * @abstract
     */
    update(opts = {}) {
        console.error('Legend update not implemented yet.')
    }
}
