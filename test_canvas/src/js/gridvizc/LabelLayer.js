//@ts-check

import { csv } from "d3-fetch";
import { geoAzimuthalEqualArea } from 'd3-geo'
import { CanvasGeo } from "./CanvasGeo";

/** @typedef {{name: string, cat: number, pop_2011:number, lon:number, lat:number, x:number, y:number }} Label */


/**
 * A layer specifying labels.
 * The input is a CSV file with the position of the labels and name + some other info on the label importance.
 * If the label position is not in the same CRS as the grid, it can be reporjected with the "projection" function.
 * The selection of the label, their style (font, weight, etc.) and color can be specified depending on their importance and the zoom level.
 * 
 * @author Julien Gaffuri
 */
export class LabelLayer {

    /**
     * 
     * @param {string} url The URL of the label data, as CSV file
     * @param {function(Label,number):string} labelStyle Specify if and how a lable should be drawn, depending on its importance and the zoom level.
     * @param {function(Label,number):string} labelColor Specify the label color, depending on its importance and the zoom level.
     * @param {function} projection 
     */
    constructor(url, labelStyle = lb=>"bold 15px Arial", labelColor = lb=>"#00000044", projection = (a=>a)) {

        /** @type {string} */
        this.url = url

        /** Return label style depending on its importance and the zoom level
         * @type {function(Label,number):string} */
        this.labelStyle = labelStyle

        /** Return label color depending on its importance and the zoom level
         * @type {function(Label,number):string} */
        this.labelColor = labelColor

        /** The projection from (lat,lon) to the CRS of the grid.
          * ITt is used for example to project and show the labels in the foreground.
          * By default, it is set to European projection, ETRS89-LAEA (EPSG:3035)
          * @type {function} */
         this.projection = projection

        /** @private @type {Array.<Label>} */
        this.labels = undefined

    }


    /**
     * Draw the label layer.
     * 
     * @param {CanvasGeo} cg
     * @returns {void}
     */
    draw(cg) {

        //load labels if necessary
        if (!this.labels) {
            this.load(cg.redraw);
            return;
        }

        cg.ctx.textAlign = "center";
        for (const lb of this.labels) {

            //set color
            cg.ctx.fillStyle = this.labelColor(lb, cg.zf);

            //get label style
            const st = this.labelStyle(lb, cg.zf);
            if (!st) continue;
            cg.ctx.font = st;

            //get label position
            const tx = cg.geoToPixX(lb.x);
            const ty = cg.geoToPixY(lb.y);

            //draw label
            cg.ctx.fillText(lb.name, tx, ty);
        }
    }

    /**
     * Load data for labels, from URL this.url
     * @param {function():void} callback
     * @private
     */
    load(callback) {

        if(!this.url) {
            console.log("Failed loading labels. No URL specified." + this.url)
            this.labels = []
            return;
        }

        csv(this.url)
            .then(
                /** @param {*} data */
                (data) => {
                    this.labels = data;

                    //project labels
                    for (const lb of this.labels) {
                        const p = this.projection([lb.lon, lb.lat])
                        lb.x = p[0]; lb.y = p[1];
                        delete lb.lon; delete lb.lat;
                    }

                    //redraw
                    if(callback) callback()
                })
            .catch(() => {
                console.log("Failed loading labels from: " + this.url)
                this.labels = []
            });
    }

}


/**
 * Returns label layer from Eurostat, in LAEA projection
 * @returns {LabelLayer}
 */
export const getEurostatLabelLayer = function(){
    return new LabelLayer(
        //url
        "https://raw.githubusercontent.com/eurostat/gridviz/master/assets/csv/names.csv",
        //style
        function(lb, zf) {
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
                if (lb.cat == 2) return
                return "bold 15px Arial";
            }
            if (zf < 400) {
                if (lb.cat == 2) return
                if (lb.pop_2011 < 10000) return
                return "bold 15px Arial";
            }
            if (zf < 500) {
                if (lb.cat == 2) return
                if (lb.pop_2011 < 50000) return
                return "bold 15px Arial";
            }

            if (lb.cat == 2) return
            if (lb.pop_2011 < 500000) return
            return "bold 15px Arial";
        },
        //color
        lb=>"#00000044",
        //projection
        geoAzimuthalEqualArea().rotate([-10, -52]).reflectX(false).reflectY(true).scale(6378137).translate([4321000, 3210000]),
    )
}
