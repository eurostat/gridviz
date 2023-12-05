//@ts-check
'use strict'

import { Legend } from '../core/Legend.js'
import { nice } from '../utils/utils.js'
import { max } from 'd3-array'

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

        //title
        this.title = opts.title
        this.titleFontSize = opts.titleFontSize || '0.8em'
        this.titleFontWeight = opts.titleFontWeight || 'bold'

        //symbol
        /**
         * @private
         * @type {import("../core/Style").Shape} */
        this.shape = opts.shape || 'circle'
        this.fillColor = opts.fillColor || 'none'
        this.strokeColor = opts.strokeColor || 'gray'
        this.strokeWidth = opts.strokeWidth || 1

        //label
        this.labelFontSize = opts.labelFontSize || '0.8em'
        this.labelUnitText = opts.labelUnitText || ''
        this.labelFormat = opts.labelFormat
    }

    /**
     * @param {{ viewScale:object, z:number, cells:Array.<import('../core/Dataset.js').Cell> }} opts
     */
    update(opts) {

        //clear
        this.div.selectAll('*').remove()

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

        //title
        if (this.title) {
            d.append('div')
                .attr('class', 'title')
                .style('font-size', this.titleFontSize)
                .style('font-weight', this.titleFontWeight)
                .text(this.title)
        }

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




/**
 * 
 * @param {Array.<number>} values 
 * @param {function(number):number} size 
 * @param {{ title?:string, fillColor?:string, labelFormat?:function(number):string }} opts 
 * @returns {Array.<SizeLegend>}
 */
export function sizeLegend(values, size, opts = {}) {
    const legends = []
    for (let value of values)
        legends.push(
            new SizeLegend({
                title: value == values[0] ? opts.title : undefined,
                size: () => size(value),
                label: () => value,
                labelFormat: opts.labelFormat,
                fillColor: opts.fillColor || "white"
            })
        )
    return legends
}


/**
 * 
 * @param {function(import('../core/Dataset.js').Cell):number} value 
 * @param {*} opts 
 * @returns {Array.<SizeLegend>}
 */
export function sizeLegendViewScale(value, opts = {}) {
    const k = opts.k || [0.9, 0.5, 0.2, 0.05]
    const legends = []
    for (let k_ of k)
        legends.push(
            new SizeLegend({
                title: k_ == k[0] ? opts.title : undefined,
                label: (viewScale, cells) => nice(k_ * max(cells, value)),
                labelFormat: opts.labelFormat,
                fillColor: opts.fillColor || "white"
            })
        )
    return legends
}



/**
 * A function which return a stack of size legends for a discrete classification.
 * @param {*} breaks 
 * @param {*} sizes 
 * @param {*} opts 
 * @returns {Array.<SizeLegend>}
 */
export function sizeDiscreteLegend(breaks, sizes, opts = {}) {
    const f = opts.labelFormat || (x => x)
    const labelText = opts.labelText || defaultLabelText(f)
    const legends = []
    for (let i = sizes.length - 1; i >= 0; i--)
        legends.push(
            new SizeLegend({
                title: i == sizes.length - 1 ? opts.title : undefined,
                size: () => sizes[i],
                label: () => labelText(breaks[i - 1], breaks[i]),
                fillColor: opts.fillColor || "white",
                shape: opts.shape
            })
        )
    return legends
}

/**
 * A function which return a stack of size legends for a discrete classification using a viewscale.
 * @param {number} classNumber 
 * @param {*} opts 
 * @returns {Array.<SizeLegend>}
 */
export function sizeDiscreteViewScaleLegend(classNumber, opts = {}) {
    const f = opts.labelFormat || (x => x)
    const labelText = opts.labelText || defaultLabelText(f)
    const legends = []
    for (let i = classNumber - 1; i >= 0; i--) {
        legends.push(
            new SizeLegend({
                title: i == classNumber - 1 ? opts.title : undefined,
                size: (viewScale) => viewScale.values[i],
                label: (viewScale) => labelText(viewScale.breaks[i - 1], viewScale.breaks[i]),
                fillColor: opts.fillColor || "white",
                shape: opts.shape
            })
        )
    }
    return legends
}


/**
 * A function that returns a function to format laberls for discrete scale legends.
 * @param {function(number):string} format 
 * @returns { function(number|undefined, number|undefined): string }
 */
function defaultLabelText(format) {
    return (v0, v1) => {
        if (v0 == undefined && v1 == undefined) return ""
        if (v1 == undefined) return "> " + format(v0)
        if (v0 == undefined) return "< " + format(v1)
        return format(v0) + " - " + format(v1)
    }
}
