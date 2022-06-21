//@ts-check

//the application
export { App } from "./App"

//export color (the entire d3 scale chromatic)
export * from "d3-scale-chromatic"

//export dataset types
export { CSVGrid } from "./dataset/CSVGrid"
export { TiledGrid } from "./dataset/TiledGrid"

//export styles
export { ShapeColorSizeStyle } from "./style/ShapeColorSizeStyle"
export { JoyPlotStyle } from "./style/JoyPlotStyle"
export { CompositionStyle } from "./style/CompositionStyle"
export { SegmentStyle } from "./style/SegmentStyle"
export { TextStyle } from "./style/TextStyle"
export { KernelSmoothingStyle } from "./style/KernelSmoothingStyle"
export { RadarStyle } from "./style/RadarStyle"
export { AgePyramidStyle } from "./style/AgePyramidStyle"
export { LineUpStyle } from "./style/LineUpStyle"

//export label layer
export { LabelLayer } from "./LabelLayer"





import { geoAzimuthalEqualArea } from 'd3-geo'
import { LabelLayer } from "./LabelLayer"




/**
 * Returns label layer from Eurostat, for ETRS89-LAEA grids.
 * From dataset: https://raw.githubusercontent.com/eurostat/gridviz/master/assets/csv/euronymes.csv
 * 
 * @returns {LabelLayer}
 */
export const getEuronymeLabelLayer = function (cc = "EUR", res = 50, opts) {
    opts = opts || {}
    opts.style = opts.style || ((lb, zf) => { if (lb.rs < zf) return; if(lb.r1 < zf) return "12px Arial"; return "18px Arial"; })
    //ETRS89-LAEA projection
    opts.proj = opts.proj || geoAzimuthalEqualArea().rotate([-10, -52]).reflectX(false).reflectY(true).scale(6378137).translate([4321000, 3210000]);
    opts.preprocess = lb => {
        //project from geo coordinates to ETRS89-LAEA
        const p = opts.proj([lb.lon, lb.lat])
        lb.x = p[0]; lb.y = p[1];
        delete lb.lon; delete lb.lat;
    }

    return new LabelLayer("https://raw.githubusercontent.com/eurostat/euronym/main/pub/v1/" + res + "/" + cc + ".csv", opts)
}
