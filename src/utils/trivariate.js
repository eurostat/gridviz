//@ts-check
'use strict'

import { interpolateLab } from "d3-interpolate"


export const trivariateClassifier = (properties, totalFunction, opts = {}) => {

    //the three properties
    const p0 = properties[0], p1 = properties[1], p2 = properties[2]

    //the classifier center point. sum must be equal to 1
    const [c0, c1, c2] = opts.center || [1 / 3, 1 / 3, 1 / 3]

    //parameter to decide wether to use mixed classes m0, m1, m2.
    const withMixedClasses = opts.withMixedClasses != undefined ? opts.withMixedClasses : true

    //paramerter decide wether to use a central class, and the size of this central class.
    //set to 0 or undefined for not showing any central class. Set to 1 for a central class that contains the mix classes
    const cc = opts.centerCoefficient ? 1 - opts.centerCoefficient : undefined

    //the output classifier method
    const fun = c => {
        //get total
        const tot = totalFunction(c)
        if (!tot) return undefined
        //compute shares
        const [s0, s1, s2] = [+c[p0] / tot, +c[p1] / tot, +c[p2] / tot]

        //class 0
        if (s0 >= c0 && s1 <= c1 && s2 <= c2) {
            //central class near class 0
            if (cc != undefined && (s2 - c2) * (c1 - cc * c1) >= (s1 - cc * c1) * (cc * c2 - c2))
                return "center"
            return "0"
        }
        //class 1
        if (s0 <= c0 && s1 >= c1 && s2 <= c2) {
            //central class near class 1
            if (cc != undefined && (s2 - c2) * (c0 - cc * c0) >= (s0 - cc * c0) * (cc * c2 - c2))
                return "center"
            return "1"
        }
        //class 2
        if (s0 <= c0 && s1 <= c1 && s2 >= c2) {
            //central class near class 2
            if (cc != undefined && (s1 - c1) * (c0 - cc * c0) >= (s0 - cc * c0) * (cc * c1 - c1))
                return "center"
            return "2"
        }
        //middle class 0 - intersection class 1 and 2
        if (s0 <= c0 && s1 >= c1 && s2 >= c2) {
            //central class
            if (cc != undefined && s0 > cc * c0) return "center"
            if (withMixedClasses) return "m0"
            return s1 > s2 ? "1" : "2"
        }
        //middle class 1 - intersection class 0 and 1
        if (s0 >= c0 && s1 <= c1 && s2 >= c2) {
            //central class
            if (cc != undefined && s1 > cc * c1) return "center"
            if (withMixedClasses) return "m1"
            return s0 > s2 ? "0" : "2"
        }
        //middle class 2 - intersection class 0 and 1
        if (s0 >= c0 && s1 >= c1 && s2 <= c2) {
            //central class
            if (cc != undefined && s2 > cc * c2) return "center"
            if (withMixedClasses) return "m2"
            return s1 > s0 ? "1" : "0"
        }
        //should not happen
        return "unknown"
    }

    //attach information to output function
    fun.center = [c0, c1, c2]
    fun.centerCoefficient = opts.centerCoefficient

    return fun
}



export const trivariateColorClassifier = (properties, totalFunction, colors = ["red", "green", "blue"], opts = {}) => {

    //the three colors
    const [color0, color1, color2] = colors

    //the color interpolation function
    const colorInterpolation = opts.colorInterpolation || interpolateLab

    //https://d3js.org/d3-interpolate/color
    const mixColorFunction = (color1, color2) => colorInterpolation(color1, color2)(0.5)
    //the colors corresponding to the mixed classes
    const [mixColor0, mixColor1, mixColor2] = opts.middleColors || opts.withMixedClasses ? [mixColorFunction(color1, color2), mixColorFunction(color0, color2), mixColorFunction(color0, color1)] : []

    //the central color, used for the central class, if any. The central class is the class of relatively balanced values, around the center point
    const centerColor = opts.centerColor || colorInterpolation(mixColorFunction(color0, color1), color2)(0.333)

    //make classifier
    const classifier = trivariateColorClassifier(properties, totalFunction, opts)

    //the output color classifier method
    const fun = c => {
        const cla = classifier(c)
        if (cla == "0") return color0
        if (cla == "1") return color1
        if (cla == "2") return color2
        if (cla == "m0") return mixColor0
        if (cla == "m1") return mixColor1
        if (cla == "m2") return mixColor2
        if (cla == "center") return centerColor
        return opts.defaultColor || "black"
    }
    fun.center = classifier.center
    fun.centerCoefficient = opts.centerCoefficient
    fun.colors = [color0, color1, color2]
    fun.mixColors = [mixColor0, mixColor1, mixColor2]
    fun.centralColor = centerColor

    return fun
}






/*
const orderedIndexesDec = arr => [...arr.keys()].sort((a, b) => arr[b] - arr[a]);
const orderedIndexesInc = arr => [...arr.keys()].sort((a, b) => arr[a] - arr[b]);

export const trivariateClassifier = (properties, totalFunction, opts = {}) => {
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
        //start first with the extreme high (triangles): from the larger value (small triangle) to the lower value (large triangle)
        for (let i of high_) if (shares[i] > highThreshold[i]) return colors[i]
        //then draw the extreme low (trapeziums): from the lower value (small trapeziums) to the larger values (large trapezium)
        for (let i of low_) if (shares[i] < lowThreshold[i]) return middleColors[i]
        //else central color
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
*/

/*
export const trivariateClassifier3 = (properties, totalFunction, opts = {}) => {
    const [a01, a12, a20] = opts.thresholds || [1/3, 1/3, 1/3]
    const [c0, c1, c2] = opts.colors || ["red", "green", "blue"]
    const centralColor = opts.centralColor || "gray"

    const fff = a => a == 1 ? Infinity : a / (1 - a)
    const c01 = fff(a01), c12 = fff(a12), c20 = fff(a20)

    const p0 = properties[0], p1 = properties[1], p2 = properties[2]
    const fun = c => {
        //get total
        const tot = totalFunction(c)
        if (!tot) return undefined
        //compute shares
        const [s0, s1, s2] = [+c[p0] / tot, +c[p1] / tot, +c[p2] / tot]
        //return colors
        if (s0 * c01 > s1 && s0 > s2 * c20) return c0
        else if (s1 > s0 * c01 && s1 * c12 > s2) return c1
        else if (s2 * c20 > s0 && s2 > s1 * c12) return c2
        else return centralColor
    }
    fun.colors = [c0, c1, c2]
    fun.centralColor = centralColor
    return fun
}
*/
