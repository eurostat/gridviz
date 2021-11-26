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

import { ShapeColorSizeStyle as ShapeColorSizeStyle_ } from "./style/ShapeColorSizeStyle"
export const ShapeColorSizeStyle = function (color_, size, shape) {
    return new ShapeColorSizeStyle_(color_, size, shape)
}

import { LineStyle as LineStyle_ } from "./style/LineStyle"
export const LineStyle = function (height) {
    return new LineStyle_(height)
}

import { CompositionStyle as CompositionStyle_ } from "./style/CompositionStyle"
export const CompositionStyle = function (color_, type, size) {
    return new CompositionStyle_(color_, type, size)
}

import { SegmentStyle as SegmentStyle_ } from "./style/SegmentStyle"
export const SegmentStyle = function (orientation, color, length, width) {
    return new SegmentStyle_(orientation, color, length, width)
}

