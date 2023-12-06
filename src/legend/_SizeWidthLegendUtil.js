//@ts-check
'use strict'

import { nice } from '../utils/utils.js'
import { max } from 'd3-array'

import { Legend } from '../core/Legend.js';
import { SizeLegend } from './SizeLegend.js';

/**
 * @param {Array.<number>} values 
 * @param {function(number):number} size 
 * @param { object } opts 
 * @returns {Array.<SizeLegend>}
 */
export function sizeLegend(values, size, opts = {}) {
    const legends = []
    for (let value of values) {
        opts.title = value == values[0] ? opts.title : undefined;
        opts.size = () => size(value)
        opts.label = () => value
        legends.push(new SizeLegend(opts))
    }
    return legends
}

export function sizeLegendViewScale(value, opts = {}) {
    const k = opts.k || [0.9, 0.5, 0.2, 0.05]
    const legends = []
    for (let k_ of k) {
        opts.title = k_ == k[0] ? opts.title : undefined
        opts.label = (viewScale, cells) => nice(k_ * max(cells, value))
        legends.push(new SizeLegend(opts))
    }
    return legends
}








/**
 * 
 * @param { Array.<number> } breaks 
 * @param { Array.<number> } sizesWidths 
 * @param { string } type size or width
 * @param { object } opts 
 * @returns {Array.<Legend>}
 */
function sizeWidthDiscreteLegend(factory, breaks, sizesWidths, type, opts = {}) {
    const f = opts.labelFormat || (x => x)
    const labelText = opts.labelText || defaultLabelText(f)
    const legends = []
    for (let i = sizesWidths.length - 1; i >= 0; i--) {
        opts.title = i == sizesWidths.length - 1 ? opts.title : undefined
        if (type == "size") opts.size = () => sizesWidths[i]
        if (type == "width") opts.segmentWidth = () => sizesWidths[i]
        opts.label = () => labelText(breaks[i - 1], breaks[i]),
            legends.push(factory(opts))
    }
    /*        legends.push(
                new SizeLegend({
                    title: i == sizes.length - 1 ? opts.title : undefined,
                    size: () => sizes[i],
                    label: () => labelText(breaks[i - 1], breaks[i]),
                    fillColor: opts.fillColor || "white",
                    shape: opts.shape
                })
            )*/
    return legends
}


//A function which return a stack of size legends for a discrete classification.
export function sizeDiscreteLegend(breaks, sizes, opts = {}) {
    const factory = (opts) => new SizeLegend(opts)
    return sizeWidthDiscreteLegend(factory, breaks, sizes, "size", opts)
}




/**
 * A function which return a stack of size legends for a discrete classification using a viewscale.
 * @param { number } classNumber 
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
 * @param { function(number):string } format 
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

