//@ts-check

import { GridVizCanvas } from "./viewer/GridVizCanvas"

export const gridvizApp = function (opts) {
    return new GridVizCanvas(opts)
}
