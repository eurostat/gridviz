//@ts-check
'use strict'

//the application
export { App } from './App'
export { GeoCanvas } from './GeoCanvas'
export { Style } from './Style'
export { Layer } from './Layer'
export { Dataset } from './Dataset'
export { DatasetComponent } from './DatasetComponent'

//export dataset types
export { TiledGrid } from './dataset/TiledGrid'
export { CSVGrid } from './dataset/CSVGrid'
//export { ParquetGrid } from "./dataset/ParquetGrid"
//export { GeoTIFF } from "./dataset/GeoTIFF"

//export styles
export { ShapeColorSizeStyle } from './style/ShapeColorSizeStyle'
export { StrokeStyle } from './style/StrokeStyle'
export { JoyPlotStyle } from './style/JoyPlotStyle'
export { CompositionStyle } from './style/CompositionStyle'
export { SegmentStyle } from './style/SegmentStyle'
export { TextStyle } from './style/TextStyle'
export { KernelSmoothingStyle } from './style/KernelSmoothingStyle'
//export { KernelSmoothingOldStyle } from "./style/KernelSmoothingStyle"
//export { KernelSmoothingWGLStyle } from "./style/KernelSmoothingStyle"
export { PillarStyle } from './style/PillarStyle'
export { SideStyle } from './style/SideStyle'
export { ContourStyle } from './style/ContourStyle'
export { SideCatStyle } from './style/SideCatStyle'
export { DotDensityStyle } from './style/DotDensityStyle'
export { TanakaStyle } from './style/TanakaStyle'
export { LegoStyle } from './style/LegoStyle'
export { SquareColorWGLStyle } from './style/SquareColorWGLStyle'
export { SquareColorCatWGLStyle } from './style/SquareColorCatWGLStyle'
export { MosaicStyle } from './style/MosaicStyle'

//export additional layers
export { BackgroundLayer } from './BackgroundLayer'
export { BackgroundLayerWMS } from './BackgroundLayerWMS'
export { LabelLayer } from './LabelLayer'
export { LineLayer as BoundaryLayer } from './LineLayer'

export { ColorLegend } from './legend/ColorLegend'
export { ColorDiscreteLegend } from './legend/ColorDiscreteLegend'
export { ColorCategoryLegend } from './legend/ColorCategoryLegend'
export { SizeLegend } from './legend/SizeLegend'
export { SegmentWidthLegend } from './legend/SegmentWidthLegend'
export { SegmentOrientationLegend } from './legend/SegmentOrientationLegend'

//export { goToStraight, zoomTo } from "./utils/zoomUtils"
export * from './utils/stretching.js'

export { getClass } from './utils/Utils'

import { geoAzimuthalEqualArea } from 'd3-geo'
import { GeoCanvas } from './GeoCanvas'

/**
 * Returns label layer from Eurostat, for ETRS89-LAEA grids.
 * From Euronym data: https://github.com/eurostat/euronym
 *
 * @returns {object}
 */
export const getEuronymeLabelLayer = function (cc = 'EUR', res = 50, opts) {
    opts = opts || {}
    const ex = opts.ex || 1.2
    const fontFamily = opts.fontFamily || 'Arial'
    const exSize = opts.exSize || 1
    opts.style =
        opts.style ||
        ((lb, zf) => {
            if (lb.rs < ex * zf) return
            if (lb.r1 < ex * zf) return exSize + 'em ' + fontFamily
            return exSize * 1.5 + 'em ' + fontFamily
        })
    //ETRS89-LAEA projection
    opts.proj =
        opts.proj ||
        geoAzimuthalEqualArea()
            .rotate([-10, -52])
            .reflectX(false)
            .reflectY(true)
            .scale(6378137)
            .translate([4321000, 3210000])
    opts.preprocess = (lb) => {
        //exclude countries
        //if(opts.ccOut && lb.cc && opts.ccOut.includes(lb.cc)) return false;
        if (opts.ccIn && lb.cc && !(opts.ccIn.indexOf(lb.cc) >= 0)) return false

        //project from geo coordinates to ETRS89-LAEA
        const p = opts.proj([lb.lon, lb.lat])
        lb.x = p[0]
        lb.y = p[1]
        delete lb.lon
        delete lb.lat
    }
    opts.baseURL = opts.baseURL || 'https://raw.githubusercontent.com/eurostat/euronym/main/pub/v2/UTF/'
    opts.url = opts.baseURL + res + '/' + cc + '.csv'
    return opts
}

/**
 * @returns {object}
 */
export const getEurostatBoundariesLayer = function (opts) {
    opts = opts || {}
    const nutsYear = opts.nutsYear || '2021'
    const crs = opts.crs || '3035'
    const scale = opts.scale || '03M'
    const nutsLevel = opts.nutsLevel || '3'
    const col = opts.col || '#888'
    const colKosovo = opts.colKosovo || '#bcbcbc'
    const showOth = opts.showOth == undefined ? true : opts.showOth

    opts.color =
        opts.color ||
        ((f, zf) => {
            const p = f.properties
            if (!showOth /*&& p.co == "F"*/ && p.eu != 'T' && p.cc != 'T' && p.efta != 'T' && p.oth === 'T')
                return
            if (p.id >= 100000) return colKosovo
            if (p.co === 'T') return col
            if (zf < 400) return col
            else if (zf < 1000) return p.lvl >= 3 ? '' : col
            else if (zf < 2000) return p.lvl >= 2 ? '' : col
            else return p.lvl >= 1 ? '' : col
        })

    opts.width =
        opts.width ||
        ((f, zf) => {
            const p = f.properties
            if (p.co === 'T') return 0.5
            if (zf < 400) return p.lvl == 3 ? 2.2 : p.lvl == 2 ? 2.2 : p.lvl == 1 ? 2.2 : 4
            else if (zf < 1000) return p.lvl == 2 ? 1.8 : p.lvl == 1 ? 1.8 : 2.5
            else if (zf < 2000) return p.lvl == 1 ? 1.8 : 2.5
            else return 1.2
        })

    opts.lineDash =
        opts.lineDash ||
        ((f, zf) => {
            const p = f.properties
            if (p.co === 'T') return []
            if (zf < 400)
                return p.lvl == 3
                    ? [2 * zf, 2 * zf]
                    : p.lvl == 2
                    ? [5 * zf, 2 * zf]
                    : p.lvl == 1
                    ? [5 * zf, 2 * zf]
                    : [10 * zf, 3 * zf]
            else if (zf < 1000)
                return p.lvl == 2 ? [5 * zf, 2 * zf] : p.lvl == 1 ? [5 * zf, 2 * zf] : [10 * zf, 3 * zf]
            else if (zf < 2000) return p.lvl == 1 ? [5 * zf, 2 * zf] : [10 * zf, 3 * zf]
            else return [10 * zf, 3 * zf]
        })

    opts.baseURL = opts.baseURL || 'https://raw.githubusercontent.com/eurostat/Nuts2json/master/pub/v2/'
    opts.url = opts.baseURL + nutsYear + '/' + crs + '/' + scale + '/nutsbn_' + nutsLevel + '.json'
    return opts
}

export const getParameterByName = GeoCanvas.getParameterByName

// set default d3 locale
import { formatDefaultLocale } from 'd3-format'
formatDefaultLocale({
    decimal: '.',
    thousands: ' ',
    grouping: [3],
    currency: ['', '€'],
})
