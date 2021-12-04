//@ts-check

//the application
export { App } from "./App"

//export color (the entire d3 scale chromatic) //TODO simpler ?
import * as dsc from "d3-scale-chromatic"
export const color = function () {
    return dsc
}

//export dataset types
export { CSVGrid } from "./dataset/CSVGrid"
export { TiledGrid } from "./dataset/TiledGrid"

//export styles
export { ShapeColorSizeStyle } from "./style/ShapeColorSizeStyle"
export { JoyPlotStyle } from "./style/JoyPlotStyle"
export { CompositionStyle } from "./style/CompositionStyle"
export { SegmentStyle } from "./style/SegmentStyle"
export { TextStyle } from "./style/TextStyle"

//export label layer
export { LabelLayer } from "./LabelLayer"
export { getEurostatLabelLayer } from "./LabelLayer"

