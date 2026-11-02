//@ts-check
'use strict'

import { Legend } from '../core/Legend.js'

/**
 * A legend element for continuous color style.
 * Inspiration: https://observablehq.com/@d3/color-legend
 *
 * @module legend
 * @author Joseph Davies, Julien Gaffuri
 */
export class ColorLegend extends Legend {
    /** @param {Object} opts */
    constructor(opts) {
        super(opts)
        opts = opts || {}

        //a function [0,1]->color for continuous colors.
        //it can take as second argument the viewscale.
        this.colorScale = opts.colorScale

        //function (t[0,1]) -> value (for label text)
        //it can take as second argument the viewscale.
        this.textScale = opts.textScale || ((t) => t)

        this.margin = opts.margin || 5

        // a number of pixels, or 'fill' for the width of the container
        this.width = opts.width === 'fill' ? 300 : opts.width || 300
        this.height = opts.height || 15

        //replace with labels ?
        this.tickSize = opts.tickSize || 6
        /** The number of ticks. By default one for each 50 pixels of the width the legend is drawn at, at least 2.
         * @type {number} */
        this.ticks = opts.ticks || Math.max(2, Math.floor(this.width / 50))
        /** The default number of ticks, when no number is given: it follows the width the legend is drawn at (@see update)
         * @private */
        this._defaultTicks = opts.ticks ? undefined : this.ticks
        this.tickFormat = opts.tickFormat
        this.tickUnit = opts.tickUnit

        /** The font size of the tick labels. By default, the one of the legend labels (labelFontSize).
         * @type {string|undefined} */
        this.fontSize = opts.fontSize
        this.invert = opts.invert

        this.setType('color')
    }

    /**
     * The number of ticks of the bar, for a width of it: the one given, or one for each 50 pixels (at least two: the two ends).
     * @param {number} width The width the bar is drawn at, in pixels.
     * @returns {number}
     */
    tickCount(width) {
        if (this._defaultTicks !== undefined && this.ticks === this._defaultTicks) return Math.max(2, Math.floor(width / 50))
        return Math.max(2, this.ticks)
    }

    /**
     * @param {{viewScale:import('../core/Style').ViewScale} } opts
     */
    update(opts) {
        //clear
        this.div.selectAll('*').remove()

        //title
        this.makeTitle()

        const width = this.availableWidth(this.width)
        // without a given number of ticks: one for each 50 pixels of the width the legend is drawn at (the one of its container
        // with width:'fill'). At least two: the two ends.
        const nbTicks = this.tickCount(width)
        const svgW = width + 2 * this.margin
        const svgH = this.height + this.margin + this.tickSize + 10
        const svg = this.div.append('svg').classed('gridviz-legend-graphic', true).attr('width', svgW).attr('height', svgH)
        //  <rect width="300" height="100" style="fill:rgb(0,0,255);stroke-width:3;stroke:rgb(0,0,0)" />

        const g = svg.append('g').classed('gridviz-legend-bar', true).attr('transform', 'translate(' + this.margin + ' ' + 0 + ')')

        //draw color bar
        const w = width,
            h = this.height
        const step = 5
        for (let i = 0; i < w; i += step) {
            let t = i / (w - 1)
            if (this.invert) t = 1 - t
            g.append('rect')
                .classed('gridviz-legend-swatch', true)
                .attr('x', i)
                .attr('y', 0)
                .attr('width', step)
                .attr('height', h)
                .style('fill', this.colorScale(t, opts.viewScale))
        }

        for (let i = 0; i < nbTicks; i++) {
            let t = i / (nbTicks - 1)

            //tick line
            g.append('line')
                .classed('gridviz-legend-tick', true)
                .attr('x1', w * t)
                .attr('y1', 0)
                .attr('x2', w * t)
                .attr('y2', h + this.tickSize)
                .style('stroke', 'black')

            //prepare tick label
            g.append('text')
                .classed('gridviz-legend-label', true)
                .attr('id', 'ticklabel_' + i)
                .attr('x', w * t)
                .attr('y', h + this.tickSize + 2)
                .style('font-size', this.fontSize || this.labelFontSizeCSS())
                .style('fill', this.labelColorCSS())
                //.style("font-weight", "bold")
                //.style("font-family", "Arial")
                .style('text-anchor', i == 0 ? 'start' : i == nbTicks - 1 ? 'end' : 'middle')
                .style('alignment-baseline', 'top')
                .style('dominant-baseline', 'hanging')
                .style('pointer-events', 'none')
            //.text("-")
        }

        //update tick labels

        //label text format
        const f = this.tickFormat && this.tickFormat != 'text' ? this.tickFormat : (v) => v
        for (let i = 0; i < nbTicks; i++) {
            let t = i / (nbTicks - 1)

            const v = this.textScale(t, opts.viewScale)
            const text = (v ? f(v) : '0') + (this.tickUnit ? this.tickUnit : '')
            if (text == undefined) continue

            //tick label
            this.div.select('#' + 'ticklabel_' + i).text(text)
        }
    }
}
