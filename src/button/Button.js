import { select } from 'd3-selection'

/**
 * Parent class for button elements used to interact with the gridviz viewer.
 *
 * @module button
 * @author Joseph Davies, Julien Gaffuri
 */
export class Button {
    /**
     * @param {Object} opts
     * opts.parentNode
     * opts.id
     * opts.title
     * opts.class
     * opts.onClickFunction
     * opts.x
     * opts.y
     */
    constructor(opts = {}) {
        this.map = opts.map
        this.parentNode = opts.parentNode || opts.map.container

        // the div element
        if (opts.id) this.div = select('#' + opts.id)

        if (!this.div || this.div.empty()) {
            this.div = select(document.createElement('div'))
            if (opts.id) this.div.attr('id', opts.id)
        }

        if (opts.title) this.div.attr('title', opts.title)
        this.div.classed('gridviz-button', true)
        if (opts.class) for (const c of String(opts.class).split(/\s+/)) if (c) this.div.classed(c, true)

        // add events
        if (opts.onClickFunction) this.div.on('click', opts.onClickFunction)

        //set styles: the look of the map controls of the statistical atlas (white, with a thin border and rounded corners).
        //Each one is a CSS variable with the usual value as fallback, so that a page can change it without !important:
        //--gridviz-button-color, --gridviz-button-background, --gridviz-button-hover-background, --gridviz-button-border-color,
        //--gridviz-button-radius and --gridviz-button-size (the width and height, border included)
        this.style('box-sizing', 'border-box')
        this.style('box-shadow', 'none')
        this.style('background-color', Button.BACKGROUND)
        this.style('border', '1px solid var(--gridviz-button-border-color, #0e47cb)')
        this.style('border-radius', 'var(--gridviz-button-radius, 10px)')
        this.style('color', 'var(--gridviz-button-color, #0e47cb)')
        this.style('overflow', 'hidden')
        this.style('position', 'absolute')
        this.style('cursor', 'pointer')
        this.style('display', 'flex')
        this.style('justify-content', 'center')
        this.style('align-items', 'center')
        this.style('width', 'var(--gridviz-button-size, 38px)')
        this.style('height', 'var(--gridviz-button-size, 38px)')

        // append to parent
        this.parentNode.appendChild(this.div.node())
    }

    /** The background of a button. */
    static BACKGROUND = 'var(--gridviz-button-background, #ffffff)'
    /** The background of a button when the mouse is over it. */
    static HOVER_BACKGROUND = 'var(--gridviz-button-hover-background, #f4f4f4)'

    /**
     * Apply a style to the button div.
     * @param {string} k
     * @param {string} v
     * @returns {this}
     */
    style(k, v) {
        this.div.style(k, v)
        return this
    }
}
