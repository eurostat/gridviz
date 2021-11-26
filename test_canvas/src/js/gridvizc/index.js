//@ts-check

import { App as App_ } from "./App"
import * as dsc from "d3-scale-chromatic"

export const App = function (opts) {
    return new App_(opts)
}




//export color (the entire d3 scale chromatic)
export const color = function () {
    return dsc
}




//export dataset types

import { CSVGrid as CSVGrid_ } from "./dataset/CSVGrid"
export const CSVGrid = function (url, resolution, preprocess = null) {
    return new CSVGrid_(url, resolution, preprocess)
}

import { TiledGrid as TiledGrid_ } from "./dataset/TiledGrid"
export const TiledGrid = function (url, preprocess = null) {
    return new TiledGrid_(url, preprocess)
}




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

