//@ts-check

import { GridVizCanvas } from "./GridVizCanvas"
import * as dsc from "d3-scale-chromatic"

export const gridvizApp = function (opts) {
    return new GridVizCanvas(opts)
}

//export entire d3 scale chromatic
export const color = function () {
    return dsc
}


//export styles

import { ShapeColorSizeStyle } from "./style/ShapeColorSizeStyle"
export const getShapeColorSizeStyle = function (color, size, shape) {
    return new ShapeColorSizeStyle(color, size, shape)
}

import { LineStyle } from "./style/LineStyle"
export const getLineStyle = function (height) {
    return new LineStyle(height)
}


import { CompositionStyle } from "./style/CompositionStyle"
export const getCompositionStyle = function (color, type, size) {
    return new CompositionStyle(color, type, size)
}

