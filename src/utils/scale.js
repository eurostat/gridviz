//@ts-check
'use strict'

import { extent, max } from "d3-array"
import { scaleQuantile } from "d3-scale"

//generic function for continuous color maps
//valueFunction, colorRamp, stretching
export const colorContinuousScale = (opts) => {
    const valueFunction = opts.valueFunction
    const colorRamp = opts.colorRamp || (() => "purple")
    const stretching = opts.stretching
    return (cells) => {
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

//generic function for quantile color maps
//valueFunction, classNumber, colorRamp
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

//generic function for size map
//valueFunction, minValue, minSizePix, maxSizeFactor, stretching
export const sizeContinuousScale = (opts) => {
    const valueFunction = opts.valueFunction
    const minValue = opts.minValue || 0
    const minSizePix = opts.minSizePix || 0
    const maxSizeFactor = opts.minSizePix || 1.41
    const stretching = opts.stretching
    return (cells, r, zf) => {
        const domain = [minValue, max(cells, valueFunction)]
        const range = [minSizePix * zf, r * maxSizeFactor]
        const scale = t => {
            //scale to [0,1]
            t = (t - domain[0]) / (domain[1] - domain[0])
            //stretch
            if (stretching) t = stretching(t)
            //scale to range
            return range[0] + t * (range[1] - range[0])
        }
        return scale;
    }
}

//generic function for size map - quantile
//valueFunction, classNumber, minSizePix, maxSizeFactor
export const sizeQuantileScale = (opts) => {
    const valueFunction = opts.valueFunction
    const classNumber = opts.classNumber || 12
    const minSizePix = opts.minSizePix || 1
    const maxSizeFactor = opts.maxSizeFactor || 1
    const scale = scaleQuantile()
    return (cells, r, zf) => {
        scale.domain(cells.map(valueFunction))
        const minSizeGeo = minSizePix * zf, maxSizeGeo = r * maxSizeFactor
        scale.range(Array.from({ length: classNumber }, (_, i) => minSizeGeo + i * (maxSizeGeo - minSizeGeo) / (classNumber - 1)))
        return scale;
    }
}


//combine scales
export const viewScaleCombination = (obj) => {
    //obj: prop and a function to call
    return (cells, r, zf) => {
        const out = {}
        for (const p in obj) { out[p] = obj[p](cells, r, zf) }
        return out
    }
}

