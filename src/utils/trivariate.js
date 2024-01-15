//@ts-check
'use strict'

import { interpolateLab } from "d3-interpolate"


const orderedIndexesDec = arr => [...arr.keys()].sort((a, b) => arr[b] - arr[a]);
const orderedIndexesInc = arr => [...arr.keys()].sort((a, b) => arr[a] - arr[b]);

export const trivariateColorClassifier = (properties, totalFunction, opts = {}) => {
    const lowThreshold = opts.lowThreshold || [1 / 3, 1 / 3, 1 / 3]
    const highThreshold = opts.highThreshold || [2 / 3, 2 / 3, 2 / 3]
    const colors = opts.colors || ["red", "green", "blue"]
    const colorInterpolation = opts.colorInterpolation || interpolateLab

    //https://d3js.org/d3-interpolate/color
    const middleColorFunction = (color1, color2) => colorInterpolation(color1, color2)(0.5)
    const middleColors = opts.middleColors || [middleColorFunction(colors[1], colors[2]), middleColorFunction(colors[0], colors[2]), middleColorFunction(colors[0], colors[1])]
    const centralColor = opts.centralColor || colorInterpolation(middleColors[2], colors[2])(0.333)

    const high_ = orderedIndexesDec(highThreshold)
    const low_ = orderedIndexesInc(lowThreshold)

    const p0 = properties[0], p1 = properties[1], p2 = properties[2]
    const fun = c => {
        //get total
        const tot = totalFunction(c)
        if (!tot) return undefined
        //compute shares
        const shares = [+c[p0] / tot, +c[p1] / tot, +c[p2] / tot]
        //return colors
        for (let i of high_) if (shares[i] > highThreshold[i]) return colors[i]
        for (let i of low_) if (shares[i] < lowThreshold[i]) return middleColors[i]
        return centralColor
    }
    fun.lowThreshold = lowThreshold
    fun.highThreshold = highThreshold
    fun.colors = colors
    fun.middleColors = middleColors
    fun.centralColor = centralColor
    fun.lowIndex = low_
    fun.highIndex = high_
    return fun
}
