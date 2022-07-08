//@ts-check

import { ShapeColorSizeStyle } from "./ShapeColorSizeStyle"
import { SideStyle } from "./SideStyle"
import { Style } from "../Style"

/**
 * https://manifold.net/doc/mfd9/example__tanaka_contours.htm
 * 
 * @param {string} col 
 * @param {object} opts 
 * @returns {Array.<Style>}
 */
export const getTanakaStyle = function (col, opts) {
    opts = opts || {}

    //the colors
    opts.colors = opts.colors || ["#a9bb9e", "#c9dcaa", "#f0f1af", "#fde89f", "#f9a579", "#eb444b"]

    //for fixed classification
    opts.breaks = opts.breaks
    //for dynamic classification
    opts.valueStretch = opts.valueStretch

    //shadow colors
    opts.colDark = opts.colDark || "#000"
    opts.colBright = opts.colBright || "#fff"

    //width of the segment (share of the resolution)
    opts.widthFactor = opts.widthFactor || 0.15

    const getClass = (v) => {

        if (opts.breaks) {
            //fixed classification
            for (let i = 0; i < opts.breaks.length; i++)
                if (v < opts.breaks[i]) return i
            return opts.breaks.length
        } else if (opts.valueStretch) {
            //dynamic classification
            const t = v //within [0,1] !
            const nb = opts.colors.length
            for (let i = 0; i < nb - 1; i++)
                if (t <= (i + 1) / nb) return i
            return nb - 1
        }
        return NaN
    }

    const colStyle = new ShapeColorSizeStyle({
        colorCol: col,
        //the color corresponding to the class
        color: (v, r, s, zf) => opts.colors[getClass(opts.valueStretch ? opts.valueStretch(v, r, s, zf) : v)],
        shape: () => "square",
        sizeCol: col,
        size: (v, r, s, zf) => r + 0.5 * zf, //that is to ensure no gap between same class cells is visible
        zfStroke: 0,
    })

    const sideStyle = new SideStyle({
        valueCol: col,
        value: (v1, v2, r, s, zf) => {
            //the number of classes of difference
            const v2_ = opts.valueStretch ? opts.valueStretch(v2, r, s, zf) : v2
            const v1_ = opts.valueStretch ? opts.valueStretch(v1, r, s, zf) : v1
            return (v2 != undefined ? getClass(v2_) + 1 : 0) - (v1 != undefined ? getClass(v1_) + 1 : 0)
        },
        //white or black, depending on orientation and value
        color: (side, r, s, z) => {
            if (side.value === 0) return
            if (side.or === "v")
                return side.value > 0 ? opts.colBright : opts.colDark
            return side.value > 0 ? opts.colDark : opts.colBright
        },
        //width depends on the value, that is the number of classes of difference
        width: (side, r, s, z) => opts.widthFactor * r * Math.abs(side.value) * (side.or === "v" ? 0.5 : 1),
    })

    return [colStyle, sideStyle]
}
