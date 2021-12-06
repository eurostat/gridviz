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

//export label layer
export { LabelLayer } from "./LabelLayer"








import { geoAzimuthalEqualArea } from 'd3-geo'
import { LabelLayer } from "./LabelLayer"

/**
 * Returns label layer from Eurostat, for ETRS89-LAEA grids.
 * From dataset: https://raw.githubusercontent.com/eurostat/gridviz/master/assets/csv/names.csv
 * 
 * @returns {LabelLayer}
 */
 export const getEurostatLabelLayer = function () {

    //ETRS89-LAEA projection
    const proj = geoAzimuthalEqualArea().rotate([-10, -52]).reflectX(false).reflectY(true).scale(6378137).translate([4321000, 3210000]);

    return new LabelLayer(
        //url
        "https://raw.githubusercontent.com/eurostat/gridviz/master/assets/csv/names.csv",
        //style
        (lb, zf) => {
            if (zf < 50) {
                return "bold 30px Arial";
            }
            if (zf < 100) {
                return "bold 20px Arial";
            }
            if (zf < 200) {
                return "bold 15px Arial";
            }
            if (zf < 300) {
                if (lb["cat"] == 2) return
                return "bold 15px Arial";
            }
            if (zf < 400) {
                if (lb["cat"] == 2) return
                if (lb["pop_2011"] < 10000) return
                return "bold 15px Arial";
            }
            if (zf < 500) {
                if (lb["cat"] == 2) return
                if (lb["pop_2011"] < 50000) return
                return "bold 15px Arial";
            }

            if (lb["cat"] == 2) return
            if (lb["pop_2011"] < 500000) return
            return "bold 15px Arial";
        },
        //color
        lb => "#00000044",
        //preprocess
        lb => {
            //project from geo coordinates to ETRS89-LAEA
            const p = proj([lb.lon, lb.lat])
            lb.x = p[0]; lb.y = p[1];
            delete lb.lon; delete lb.lat;
        }
    )
}
