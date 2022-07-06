//@ts-check

import { ShapeColorSizeStyle } from "./ShapeColorSizeStyle"
import { SideStyle } from "./SideStyle"


export const getTanakaStyle = function (col, opts) {
    opts = opts || {}
    opts.colors = opts.colors || ["#a9bb9e", "#c9dcaa", "#f0f1af", "#fde89f", "#f9a579", "#eb444b"]
    opts.breaks = opts.breaks || [10, 50, 200, 500, 2000]
    const getClass = (v) => {
        for (let i = 0; i < opts.breaks.length; i++)
            if (v < opts.breaks[i]) return i
        return opts.breaks.length
    }
    opts.widthFactor = opts.widthFactor || 0.15

    const colStyle = new ShapeColorSizeStyle({
        colorCol: col,
        //the color corresponding to the class
        color: (v, r, s) => opts.colors[getClass(v)],
        shape: () => "square",
        zfStroke: 0,
    })

    const sideStyle = new SideStyle({
        value: (c1, c2) => {
            //the number of classes of difference
            return (c2 ? getClass(c2[col]) + 1 : 0) - (c1 ? getClass(c1[col]) + 1 : 0)
        },
        //white or black, depending on orientation
        color: (side, r, s, z) => side.value > 0 && side.or === "h" || side.value < 0 && side.or === "v" ? "#222" : "#ddd",
        //width depends on the value, that is the number of classes of difference
        width: (side, r, s, z) => opts.widthFactor * r * side.value,
    })

    return [colStyle, sideStyle]
}
