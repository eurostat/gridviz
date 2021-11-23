//@ts-check

import { GridVizCanvas } from "./gridvizc/viewer/GridVizCanvas"
import * as dsc from "d3-scale-chromatic"

export const gridvizApp = function (opts) {
    return new GridVizCanvas(opts)
}

//export entire d3 scale chromatic
export const color = function () {
    return dsc
}
