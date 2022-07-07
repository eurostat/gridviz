//@ts-check

import { ShapeColorSizeStyle } from "./ShapeColorSizeStyle"
import { SideStyle } from "./SideStyle"


export const getTanakaStyle = function (col, opts) {
    opts = opts || {}

    //the colors
    opts.colors = opts.colors || ["#a9bb9e", "#c9dcaa", "#f0f1af", "#fde89f", "#f9a579", "#eb444b"]

    //for fixed classification
    opts.breaks = opts.breaks //|| [10, 50, 200, 500, 2000]
    //for dynamic classification
    opts.valueStretch = opts.valueStretch

    //width of the segment (share of the resolution)
    opts.widthFactor = opts.widthFactor || 0.1


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
        color: (v, r, s, zf) => opts.colors[getClass(v)],
        shape: () => "square",
        zfStroke: 0,
    })

    const sideStyle = new SideStyle({
        valueCol: col,
        value: (v1, v2, r, s, zf) => {
            //the number of classes of difference
            const a2 = opts.valueStretch ? opts.valueStretch(v2, r, s, zf) : v2
            const a1 = opts.valueStretch ? opts.valueStretch(v1, r, s, zf) : v1
            return (v2 != undefined ? getClass(a2) + 1 : 0) - (v1 != undefined ? getClass(a1) + 1 : 0)
            //return (v2 != undefined ? getClass(v2) + 1 : 0) - (v1 != undefined ? getClass(v1) + 1 : 0)
        },
        //white or black, depending on orientation
        color: (side, r, s, z) => side.value > 0 && side.or === "h" || side.value < 0 && side.or === "v" ? "#222" : "#ddd",
        //width depends on the value, that is the number of classes of difference
        width: (side, r, s, z) => opts.widthFactor * r * side.value,
    })

    return [colStyle]
}
