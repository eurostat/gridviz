import "../css/styles.css";
import * as dsc from "d3-scale-chromatic"
import { App as App_ } from "./core/App"

export const app = function (opts) {
    return new App_(opts)
}

//export entire d3 scale chromatic
export const color = function () {
    return dsc
}

//export styles
import { ColorSizeShapeStyle } from "./core/style/ColorSizeShapeStyle"
export const colorSizeShapeStyle = function (opts) {
    return new ColorSizeShapeStyle(opts)
}

import { LineStyle } from "./core/style/LineStyle"
export const lineStyle = function (height) {
    return new LineStyle(height)
}

// import { CompositionStyle } from "./core/style/CompositionStyle"
// export const getCompositionStyle = function (color_, type, size) {
//     return new CompositionStyle(color_, type, size)
// }