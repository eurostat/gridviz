//@ts-check

import { csv } from "d3-fetch";
import { geoAzimuthalEqualArea } from 'd3-geo'
import { CanvasGeo } from "./CanvasGeo";

/** A label. The name is the text to show. (x,y) are the coordinates in the same CRS as the grid.
 * @typedef {{name: string, x:number, y:number }} Label */

/**
 * A (generic) layer for placename labels, to be shown on top of the grid layers.
 * The input is a CSV file with the position of the labels and name + some other info on the label importance.
 * If the label position is not in the same CRS as the grid, it can be reporjected with the "projection" function.
 * The selection of the label, their style (font, weight, etc.) and color can be specified depending on their importance and the zoom level.
 * 
 * @author Julien Gaffuri
 */
export class LabelLayer {

    /**
     * @param {string} url The URL of the label data, as CSV file
     * @param {function(Label,number):string} labelStyle Specify if and how a label should be drawn, depending on its importance and the zoom level.
     * @param {function(Label,number):string} labelColor Specify the label color, depending on its importance and the zoom level.
     * @param {function(object):void} preprocess A preprocess to run on each label after loading. It can be used to apply some specific treatment before, format the label data, project coordinates, etc.
     */
    constructor(url, labelStyle = lb => "bold 15px Arial", labelColor = lb => "#00000044", preprocess = undefined) {

        /** @private @type {string} */
        this.url = url

        /** @private @type {function(Label,number):string} */
        this.labelStyle = labelStyle

        /** @private @type {function(Label,number):string} */
        this.labelColor = labelColor

        /** @private @type {function(object):void} */
        this.preprocess = preprocess;

        /** @private @type {Array.<Label>} */
        this.labels = undefined
    }


    /**
     * Draw the label layer.
     * 
     * @param {CanvasGeo} cg The canvas where to draw the layer.
     * @returns {void}
     */
    draw(cg) {

        //load labels, if not done yet.
        if (!this.labels) {
            this.load(cg.redraw);
            return;
        }

        //maybe another position (top right?)
        cg.ctx.textAlign = "center";

        //draw labels, one by one
        for (const lb of this.labels) {

            //set color
            cg.ctx.fillStyle = this.labelColor(lb, cg.zf);

            //get label style
            const st = this.labelStyle(lb, cg.zf);
            if (!st) continue;
            cg.ctx.font = st;

            //draw label
            cg.ctx.fillText(lb.name, cg.geoToPixX(lb.x), cg.geoToPixY(lb.y));
        }
    }

    /**
     * Load data for labels, from URL this.url
     * @param {function():void} callback
     * @private
     */
    load(callback) {

        if (!this.url) {
            console.log("Failed loading labels: No URL specified. " + this.url)
            this.labels = []
            return;
        }

        csv(this.url)
            .then(
                /** @param {Array.<object>} data */
                (data) => {

                    //apply preprocess, if any
                    if (this.preprocess)
                        for (const lb of data)
                            this.preprocess(lb)

                    //store labels
                    this.labels = data;

                    //redraw
                    if (callback) callback()
                })
            .catch(() => {
                console.log("Failed loading labels from " + this.url)
                this.labels = []
            });
    }



    //getters and setters

    /** @returns {string} */
    getUrl() { return this.url; }
    /** @param {string} val @returns {this} */
    setUrl(val) { this.url = val; return this; }

    /** @returns {function(Label,number):string} */
    getLabelStyle() { return this.labelStyle; }
    /** @param {function(Label,number):string} val @returns {this} */
    setLabelStyle(val) { this.labelStyle = val; return this; }

    /** @returns {function(Label,number):string} */
    getLabelColor() { return this.labelColor; }
    /** @param {function(Label,number):string} val @returns {this} */
    setLabelColor(val) { this.labelColor = val; return this; }

    /** @returns {function(object):void} */
    getPreprocess() { return this.preprocess; }
    /** @param {function(object):void} val @returns {this} */
    setPreprocess(val) { this.preprocess = val; return this; }

}


/**
 * Returns label layer from Eurostat, for ETRS89-LAEA grids.
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
