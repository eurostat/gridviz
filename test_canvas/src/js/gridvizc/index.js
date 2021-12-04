//@ts-check

//the application

import { App as App_ } from "./App"
export const App = function (opts) {
    return new App_(opts)
}


//export color (the entire d3 scale chromatic)

import * as dsc from "d3-scale-chromatic"
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


//test
import { ShapeColorSizeStyle as gfddf } from "./style/ShapeColorSizeStyle"
export const ShapeColorSizeStyle2 = gfddf
//test

import { ShapeColorSizeStyle as ShapeColorSizeStyle_ } from "./style/ShapeColorSizeStyle"
export const ShapeColorSizeStyle = function (color_, size, shape) {
    return new ShapeColorSizeStyle_(color_, size, shape)
}

import { JoyPlotStyle as JoyPlotStyle_ } from "./style/JoyPlotStyle"
export const JoyPlotStyle = function (height) {
    return new JoyPlotStyle_(height)
}

import { CompositionStyle as CompositionStyle_ } from "./style/CompositionStyle"
export const CompositionStyle = function (color_, type, size) {
    return new CompositionStyle_(color_, type, size)
}

import { SegmentStyle as SegmentStyle_ } from "./style/SegmentStyle"
export const SegmentStyle = function (orientation, color_, length, width) {
    return new SegmentStyle_(orientation, color_, length, width)
}

import { TextStyle as TextStyle_ } from "./style/TextStyle"
export const TextStyle = function (text, color_, fontSize, fontFamily, fontWeight) {
    return new TextStyle_(text, color_, fontSize, fontFamily, fontWeight)
}




//export Eurostat label layer

import { getEurostatLabelLayer as a } from "./LabelLayer"
export const getEurostatLabelLayer = a
