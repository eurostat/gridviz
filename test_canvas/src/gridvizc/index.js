//@ts-check

import { GridVizCanvas } from "./viewer/GridVizCanvas"
import * as dsc from "d3-scale-chromatic"

export const gridvizApp = function (opts) {
    return new GridVizCanvas(opts)
}

//export all d3 things
export const color = function () {
    return dsc
}
