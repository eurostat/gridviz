import "../css/styles.css";
import * as dsc from "d3-scale-chromatic"

// the application
export { App } from "./core/App"

//export styles
export { JoyPlotStyle } from "./core/style/JoyPlotStyle"
export { ColorSizeShapeStyle } from "./core/style/ColorSizeShapeStyle"

//export entire d3 scale chromatic
export const color = function () {
    return dsc
}