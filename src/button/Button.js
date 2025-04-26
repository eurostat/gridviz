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
        if (opts.class) this.div.attr('class', opts.class)

        // add events
        if (opts.onClickFunction) this.div.on('click', opts.onClickFunction)

        //set styles
        this.style(
            'box-shadow',
            '0 7px 8px rgba(0,47,103,.08), 0 0 22px rgba(0,47,103,.04), 0 12px 17px rgba(0,47,103,.04), 0 -4px 4px rgba(0,47,103,.04)'
        ) //.ecl-u-shadow-3
        this.style('background-color', '#ffffff')
        this.style('position', 'absolute')
        this.style('cursor', 'pointer')
        this.style('display', 'flex')
        this.style('justify-content', 'center')
        this.style('align-items', 'center')
        this.style('width', '35px')
        this.style('height', '30px')
        // this.style(padding , '4px'

        // append to parent
        this.parentNode.appendChild(this.div.node())
    }

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
