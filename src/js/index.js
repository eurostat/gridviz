//@ts-check

//the application
export { App } from "./App"
export { Layer } from "./Layer"
export { Dataset } from "./Dataset"
export { DatasetComponent } from "./DatasetComponent"

//export color (the entire d3 scale chromatic)
export * from "d3-scale-chromatic"

//export dataset types
export { TiledGrid } from "./dataset/TiledGrid"
export { CSVGrid } from "./dataset/CSVGrid"
//export { GeoTIFF } from "./dataset/GeoTIFF"

//export styles
export { ShapeColorSizeStyle } from "./style/ShapeColorSizeStyle"
export { StrokeStyle } from "./style/StrokeStyle"
export { JoyPlotStyle } from "./style/JoyPlotStyle"
export { CompositionStyle } from "./style/CompositionStyle"
export { SegmentStyle } from "./style/SegmentStyle"
export { TextStyle } from "./style/TextStyle"
export { KernelSmoothingStyle } from "./style/KernelSmoothingStyle"
export { PillarStyle } from "./style/PillarStyle"
export { SideStyle } from "./style/SideStyle"
export { DotDensityStyle } from "./style/DotDensityStyle"
export { TanakaStyle } from "./style/TanakaStyle"
export { LegoStyle } from "./style/LegoStyle"
export { SquareColorWGLStyle2 } from "./style/SquareColorWGLStyle2"
export { SquareColorWGLStyle } from "./style/SquareColorWGLStyle"
export { MosaicStyle } from "./style/MosaicStyle"

//export additional layers
export { LabelLayer } from "./LabelLayer"
export { LineLayer as BoundaryLayer } from "./LineLayer"

export { ColorLegend } from "./legend/ColorLegend"
export { ColorCategoryLegend } from "./legend/ColorCategoryLegend"
export { SizeLegend } from "./legend/SizeLegend"
export { SegmentWidthLegend } from "./legend/SegmentWidthLegend"

export { goToStraight, zoomTo } from "./utils/zoomUtils"


import { geoAzimuthalEqualArea } from 'd3-geo'
import { LabelLayer } from "./LabelLayer"
import { LineLayer } from "./LineLayer"


/**
 * 
 * @param {number} t The value to stretch, within [0,1]
 * @param {number} alpha The stretching factor: 1=no stretching. >1 stretch to show high values. <1 stretch to show low values.
 * @param {number} type Test 0, 1 or 2... show different result.
 * @returns The stretched value, within [0,1]
 * @deprecated use new functions instead
 */
export const s = function (t, alpha, type = 0) {
    if (!type) return Math.pow(t, alpha)
    else if (type == 1) return 0.5 * (Math.pow(t, alpha) + 1 - Math.pow(1 - t, 1 / alpha))
    return 1 - Math.pow(1 - t, 1 / alpha)
}

/**
 * Function [0,1]->[0,1] to stretch range of values.
 * 
 * @param {number} t The value to stretch, within [0,1]
 * @param {number} alpha >1: differenciate better the high values
 * @returns {number} The stretched value, within [0,1]
 */
export const sLow = (t, alpha = 3) => Math.pow(t, 1 / alpha)

/**
 * Function [0,1]->[0,1] to stretch range of values.
 * 
 * @param {number} t The value to stretch, within [0,1]
 * @param {number} alpha >1: differenciate better the low values
 * @returns {number} The stretched value, within [0,1]
 */
export const sHigh = (t, alpha = 3) => 1 - Math.pow(1 - t, 1 / alpha)

/**
 * Function [0,1]->[0,1] to stretch range of values.
 * 
 * @param {number} t The value to stretch, within [0,1]
 * @param {number} alpha >1: differenciate better the middle values
 * @returns {number} The stretched value, within [0,1]
 */
export const sMiddle = (t, alpha = 3) => (t *= 2) >= 1 ? 1 - 0.5 * Math.pow(2 - t, alpha) : 0.5 * Math.pow(t, alpha);

export const sCircleUp = (t, alpha = 3) => {
    alpha = alpha <= 0 ? 1e-20 : 1 / alpha;
    return Math.sqrt(alpha * alpha + 2 * alpha * t + 2 * t - t * t) - alpha
}
export const sCircleDown = (t, alpha = 3) => 1 - sCircleUp(1 - t, alpha);

export const sExpUp = (t, alpha = 3) => 1 - sExpDown(1 - t, alpha);
export const sExpDown = (t, alpha = 3) => (Math.exp(t * alpha)-1) / (Math.exp(alpha)-1);




/**
 * Returns label layer from Eurostat, for ETRS89-LAEA grids.
 * From dataset: https://raw.githubusercontent.com/eurostat/gridviz/master/assets/csv/euronymes.csv
 * 
 * @returns {LabelLayer}
 */
export const getEuronymeLabelLayer = function (cc = "EUR", res = 50, opts) {
    opts = opts || {}
    const ex = opts.ex || 1.2
    opts.style = opts.style || ((lb, zf) => { if (lb.rs < ex * zf) return; if (lb.r1 < ex * zf) return "1em Arial"; return "1.5em Arial"; })
    //ETRS89-LAEA projection
    opts.proj = opts.proj || geoAzimuthalEqualArea().rotate([-10, -52]).reflectX(false).reflectY(true).scale(6378137).translate([4321000, 3210000]);
    opts.preprocess = lb => {
        //project from geo coordinates to ETRS89-LAEA
        const p = opts.proj([lb.lon, lb.lat])
        lb.x = p[0]; lb.y = p[1];
        delete lb.lon; delete lb.lat;
    }
    opts.url = "https://raw.githubusercontent.com/eurostat/euronym/main/pub/v1/" + res + "/" + cc + ".csv";
    return new LabelLayer(opts)
}

/**
 * @returns {LineLayer}
 */
export const getEurostatBoundariesLayer = function (opts) {
    opts = opts || {}
    const nutsYear = opts.nutsYear || "2021"
    const crs = opts.crs || "3035"
    const scale = opts.scale || "03M"
    const nutsLevel = opts.nutsLevel || "3"
    const col = "#888"

    opts.color = opts.color || ((f, zf) => {
        const p = f.properties
        if (p.co === "T") return col
        if (zf < 400) return col
        else if (zf < 1000) return p.lvl >= 3 ? "" : col
        else if (zf < 2000) return p.lvl >= 2 ? "" : col
        else return p.lvl >= 1 ? "" : col
    })

    opts.width = opts.width || ((f, zf) => {
        const p = f.properties
        if (p.co === "T") return 0.5
        if (zf < 400) return p.lvl == 3 ? 2.2 : p.lvl == 2 ? 2.2 : p.lvl == 1 ? 2.2 : 4
        else if (zf < 1000) return p.lvl == 2 ? 1.8 : p.lvl == 1 ? 1.8 : 2.5
        else if (zf < 2000) return p.lvl == 1 ? 1.8 : 2.5
        else return 1.2
    })

    opts.lineDash = opts.lineDash || ((f, zf) => {
        const p = f.properties
        if (p.co === "T") return []
        if (zf < 400) return p.lvl == 3 ? [2 * zf, 2 * zf] : p.lvl == 2 ? [5 * zf, 2 * zf] : p.lvl == 1 ? [5 * zf, 2 * zf] : [10 * zf, 3 * zf]
        else if (zf < 1000) return p.lvl == 2 ? [5 * zf, 2 * zf] : p.lvl == 1 ? [5 * zf, 2 * zf] : [10 * zf, 3 * zf]
        else if (zf < 2000) return p.lvl == 1 ? [5 * zf, 2 * zf] : [10 * zf, 3 * zf]
        else return [10 * zf, 3 * zf]
    })

    const url = "https://raw.githubusercontent.com/eurostat/Nuts2json/master/pub/v2/" + nutsYear + "/" + crs + "/" + scale + "/nutsbn_" + nutsLevel + ".json"
    return new LineLayer(url, opts)
}

