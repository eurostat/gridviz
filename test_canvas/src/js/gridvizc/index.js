//@ts-check

import { App as App_ } from "./App"
import * as dsc from "d3-scale-chromatic"

export const App = function (opts) {
    return new App_(opts)
}


//export entire d3 scale chromatic
export const color = function () {
    return dsc
}



//TODO export datasets



//export styles

import { ShapeColorSizeStyle } from "./style/ShapeColorSizeStyle"
export const getShapeColorSizeStyle = function (color_, size, shape) {
    return new ShapeColorSizeStyle(color_, size, shape)
}

import { LineStyle } from "./style/LineStyle"
export const getLineStyle = function (height) {
    return new LineStyle(height)
}


import { CompositionStyle } from "./style/CompositionStyle"
export const getCompositionStyle = function (color_, type, size) {
    return new CompositionStyle(color_, type, size)
}

