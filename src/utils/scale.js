//@ts-check
'use strict'

import { extent, max } from "d3-array"
import { scaleQuantile } from "d3-scale"

/**
 * A scale is simply a function that map a domain to a range.
 * @typedef {function(number):number} Scale */

/**
 * A scale whose range is a color (string).
* @typedef {function(number):string} ColorScale */



/**
 * Generic function for view scale - continuous
 * 
 * @param {{ valueFunction:function(import("../Dataset").Cell):number, minValue?:number, minSizePix?:number, maxSizeFactor?:number, range?:[number, number], domain?:[number, number], stretching?:function(number):number }} opts 
 * @returns {function(Array.<import("../Dataset").Cell>):Scale}
 */
export const sizeContinuousScale = (opts) => {
    const valueFunction = opts.valueFunction
    const minValue = opts.minValue || 0
    const minSizePix = opts.minSizePix || 0
    const maxSizeFactor = opts.maxSizeFactor || 1
    const stretching = opts.stretching
    const range_ = opts.range
    const domain_ = opts.domain
    return (cells, r, z) => {
        const domain = domain_ || [minValue, max(cells, valueFunction)]
        const range = range_ || [minSizePix * z, r * maxSizeFactor]
        return t => {
            //scale to [0,1]
            t = (t - domain[0]) / (domain[1] - domain[0])
            //stretch
            if (stretching) t = stretching(t)
            //scale to range
            return range[0] + t * (range[1] - range[0])
        }
    }
}


/**
 * Generic function for view scale - quantile
 * 
 * @param {{ valueFunction:function(import("../Dataset").Cell):number, classNumber?:number, minSizePix?:number, maxSizeFactor?:number }} opts 
 * @returns {function(Array.<import("../Dataset").Cell>):Scale}
 */
export const sizeQuantileScale = (opts) => {
    const valueFunction = opts.valueFunction
    const classNumber = opts.classNumber || 12
    const minSizePix = opts.minSizePix || 1
    const maxSizeFactor = opts.maxSizeFactor || 1
    const scale = scaleQuantile()
    return (cells, r, z) => {
        scale.domain(cells.map(valueFunction))
        const minSizeGeo = minSizePix * z, maxSizeGeo = r * maxSizeFactor
        scale.range(Array.from({ length: classNumber }, (_, i) => minSizeGeo + i * (maxSizeGeo - minSizeGeo) / (classNumber - 1)))
        return scale;
    }
}






/**
 * Generic function for color view scale - continuous
 * 
 * @param {{ valueFunction:function(import("../Dataset").Cell):number, colorRamp?:function(number):string, stretching?:function(number):number }} opts 
 * @returns {function(Array.<import("../Dataset").Cell>):ColorScale}
 */
export const colorContinuousScale = (opts) => {
    const valueFunction = opts.valueFunction
    const colorRamp = opts.colorRamp || (() => "purple")
    const stretching = opts.stretching
    return (cells) => {
        /** @type {[undefined, undefined] | [number, number]} */
        const domain = extent(cells, valueFunction)
        const scale = t => {
            //scale to [0,1]
            t = (t - domain[0]) / (domain[1] - domain[0])
            //stretch
            if (stretching) t = stretching(t)
            return colorRamp(t)
        }
        //scale.domain(d3.extent(cells, valueFunction))
        return scale;
    }
}

/**
 * Generic function for color view scale - quantile
 * 
 * @param {{ valueFunction:function(import("../Dataset").Cell):number, classNumber?:number, colorRamp?:function(number):string }} opts 
 * @returns {function(Array.<import("../Dataset").Cell>):ColorScale}
 */
export const colorQuantileScale = (opts) => {
    const valueFunction = opts.valueFunction
    const classNumber = opts.classNumber || 12
    const colorRamp = opts.colorRamp || (() => "purple")
    const scale = scaleQuantile().range(Array.from({ length: classNumber }, (_, i) => colorRamp(i / (classNumber - 1))))
    return (cells) => {
        scale.domain(cells.map(valueFunction));
        return scale;
    }
}




/**
 * combine view scale functions
 * 
 * @param {*} obj 
 * @returns 
 */
export const viewScaleCombination = (obj) => {
    //obj: prop and a function to call
    return (cells, r, z) => {
        const out = {}
        for (const p in obj) { out[p] = obj[p](cells, r, z) }
        return out
    }
}

