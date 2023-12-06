//@ts-check
'use strict'

import { Legend } from '../core/Legend.js'

/**
 * A legend element for proportional symbols.
 *
 * @author Joseph Davies, Julien Gaffuri
 */
export class SizeLegend extends Legend {
    /** @param {Object} opts */
    constructor(opts) {
        super(opts)
        opts = opts || {}

        /** A function returning the text label
         *  @type { function(object, Array.<import('../core/Dataset.js').Cell>):(number|string) } */
        this.label = opts.label || undefined

        /** A function returning the size of the legend symbol
         *  @type { function(object):number } */
        this.size = opts.size || undefined

        //symbol
        /**  @type {(import("../core/Style").Shape)|"line"} */
        this.shape = opts.shape || 'circle'

        //general case
        this.fillColor = opts.fillColor || 'none'
        this.strokeColor = opts.strokeColor || 'gray'
        this.strokeWidth = opts.strokeWidth || 1

        //for line shape
        //TODO this.orientation = opts.orientation || 0
        this.color = opts.color || 'gray'
        this.length = opts.length || ((resolution, z, viewScale) => resolution)
    }

    /**
     * @param {{ viewScale:object, z:number, cells:Array.<import('../core/Dataset.js').Cell> }} opts
     */
    update(opts) {

        //clear
        this.div.selectAll('*').remove()

        //title
        this.makeTitle()

        //get label. May not be a number (!)
        let label = this.label(opts.viewScale, opts.cells)

        //compute size of symbol, in pix
        let sizePix
        if (this.size)
            sizePix = this.size(opts.viewScale) / opts.z
        else
            sizePix = opts.viewScale(+label) / opts.z
        if (!sizePix) return

        //format label, if specified and possible
        if (this.labelFormat && !isNaN(+label)) label = this.labelFormat(label)

        const d = this.div.append('div')
        //to enable vertical centering
        //.style("position", "relative")

        //shape
        const svg = d
            .append('svg')
            .attr('width', sizePix + this.strokeWidth + 2)
            .attr('height', sizePix + this.strokeWidth + 2)
            .style('', 'inline-block')

        if (this.shape === 'square') {
            svg.append('rect')
                .attr('x', 0)
                .attr('y', 0)
                .attr('width', sizePix)
                .attr('height', sizePix)
                .style('fill', this.fillColor)
                .style('stroke', this.strokeColor)
                .style('stroke-width', this.strokeWidth)
            //TODO test
        } else if (this.shape === 'circle') {
            // <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />
            const r = (sizePix + this.strokeWidth) * 0.5
            svg.append('circle')
                .attr('cx', r + 1)
                .attr('cy', r + 1)
                .attr('r', r)
                .style('fill', this.fillColor)
                .style('stroke', this.strokeColor)
                .style('stroke-width', this.strokeWidth)
        } else if (this.shape === 'donut') {
            //TODO
        } else if (this.shape === 'diamond') {
            //TODO
        } else {
            throw new Error('Unexpected shape:' + this.shape)
        }

        //label
        d.append('div')
            //show on right of graphic
            .style('display', 'inline')

            //center vertically
            //.style("position", "absolute").style("top", "0").style("bottom", "0")

            .style('padding-left', '5px')
            .style('font-size', this.labelFontSize)
            .text(label + (this.labelUnitText ? ' ' : '') + this.labelUnitText)
    }
}
