//@ts-check
'use strict'


/**
 * Some function [0,1]->[0,1] to stretch range of values.
 * @see https://github.com/eurostat/gridviz/blob/master/docs/reference.md#stretching
 * @see https://observablehq.com/@jgaffuri/stretching
 */


export const powerScale = (exponent = 3) => t => Math.pow(t, exponent)

export const powerInverseScale = (exponent = 3) => t => 1 - Math.pow(1 - t, 1 / exponent)



export const exponentialScale = (base = 3) => {
    if (base == 0) return t => t
    const a = (Math.exp(base) - 1)
    return t => (Math.exp(t * base) - 1) / a
}

export const logarithmicScale = (base = 3) => {
    if (base == 0) return t => t
    return t => 1 - (1 / base) * Math.log(Math.exp(base) * (1 - t) + t)
}



export const circularScale = (alpha = 0.8) => {
    if (alpha == 0) return t => t
    if (alpha == 1) return t => Math.sqrt(t * (2 - t))
    else {
        const a = alpha / (1 - alpha)
        return t => Math.sqrt(1 / (a * a) + t * (2 / a + 2 - t)) - 1 / a
    }
}
export const circularInverseScale = (alpha = 0.8) => {
    const f = circularScale(alpha)
    return t => 1 - f(1 - t)
}
