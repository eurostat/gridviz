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

//export additional layers
export { LabelLayer } from "./LabelLayer"
export { BoundaryLayer } from "./BoundaryLayer"





import { geoAzimuthalEqualArea } from 'd3-geo'
import { LabelLayer } from "./LabelLayer"
import { BoundaryLayer } from "./BoundaryLayer"




/**
 * Returns label layer from Eurostat, for ETRS89-LAEA grids.
 * From dataset: https://raw.githubusercontent.com/eurostat/gridviz/master/assets/csv/euronymes.csv
 * 
 * @returns {LabelLayer}
 */
export const getEuronymeLabelLayer = function (cc = "EUR", res = 50, opts) {
    opts = opts || {}
    opts.style = opts.style || ((lb, zf) => { if (lb.rs < zf) return; if (lb.r1 < zf) return "12px Arial"; return "18px Arial"; })
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

/**
 * @returns {BoundaryLayer}
 */
export const getEurostatBoundariesLayer = function (opts) {
    opts = opts || {}
    const nutsYear = opts.nutsYear || "2021"
    const crs = opts.crs || "3035"
    const scale = opts.scale || "03M"
    const nutsLevel = opts.nutsLevel || "3"

    opts.color = opts.color || ((f, zf) => {
        const p = f.properties
        const col = "#BBB"
        if (p.co === "T") return
        if (zf < 400) return col
        else if (zf < 1000) return p.lvl >= 3 ? "" : col
        else if (zf < 2000) return p.lvl >= 2 ? "" : col
        else return p.lvl >= 1 ? "" : col
    })

    opts.width = opts.width || ((f, zf) => {
        const p = f.properties
        if (p.co === "T") return
        if (zf < 400) return p.lvl == 3 ? 1 : p.lvl == 2 ? 2.2 : p.lvl == 1 ? 2.2 : 4
        else if (zf < 1000) return p.lvl == 2 ? 1.2 : p.lvl == 1 ? 1.2 : 2.5
        else if (zf < 2000) return p.lvl == 1 ? 1 : 2
        else return 1.2
    })

    const url = "https://raw.githubusercontent.com/eurostat/Nuts2json/master/pub/v2/" + nutsYear + "/" + crs + "/" + scale + "/nutsbn_" + nutsLevel + ".json"
    return new BoundaryLayer(url, opts)
}
