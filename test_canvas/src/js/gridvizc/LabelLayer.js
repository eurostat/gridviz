//@ts-check

import { csv } from "d3-fetch";
import { geoAzimuthalEqualArea } from 'd3-geo'
import { CanvasGeo } from "./CanvasGeo";

/**
 * 
 * @author Julien Gaffuri
 */
export class LabelLayer {

    /**
     */
    constructor() {
        //
        this.toponymsURL = "https://raw.githubusercontent.com/eurostat/gridviz/master/assets/csv/names.csv"

        /** @typedef {{name: string, cat: number, pop_2011:number, lon:number, lat:number, x:number, y:number }} Toponym */
        /** @type {Array.<Toponym>} */
        this.toponyms = undefined;

        /** The projection from (lat,lon) to the CRS of the grid.
          * ITt is used for example to project and show the toponyms in the foreground.
          * By default, it is set to European projection, ETRS89-LAEA (EPSG:3035)
          * @type {function} */
        this.projection = geoAzimuthalEqualArea().rotate([-10, -52]).reflectX(false).reflectY(true).scale(6378137).translate([4321000, 3210000])//.scale(1)

        //toponyms selection function

        /** Return toponym style depending on its importance and the zoom level
         * @type {function(Toponym,number):string} */
        this.toponymStyle = (tn, zf) => {
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
                if (tn.cat == 2) return
                return "bold 15px Arial";
            }
            if (zf < 400) {
                if (tn.cat == 2) return
                if (tn.pop_2011 < 10000) return
                return "bold 15px Arial";
            }
            if (zf < 500) {
                if (tn.cat == 2) return
                if (tn.pop_2011 < 50000) return
                return "bold 15px Arial";
            }

            if (tn.cat == 2) return
            if (tn.pop_2011 < 500000) return
            return "bold 15px Arial";
        }

    }


    /**
     * Draw the label layer.
     * @param {CanvasGeo} cg
     * @returns {void}
     */
    draw(cg) {

        //load toponyms if necessary
        if (!this.toponyms) {
            this.load(cg.redraw);
            return;
        }

        cg.ctx.fillStyle = "#00000044";
        cg.ctx.textAlign = "center";
        for (const tn of this.toponyms) {

            //get toponym style
            const st = this.toponymStyle(tn, cg.zf);
            if (!st) continue;
            cg.ctx.font = st;

            //get toponym position
            const tx = cg.geoToPixX(tn.x);
            const ty = cg.geoToPixY(tn.y);

            //draw toponym
            cg.ctx.fillText(tn.name, tx, ty);
        }
    }

    /**
     * Load data for toponyms, from URL this.toponymsURL
     * @param {function():void} callback
     * @private
     */
    load(callback) {
        csv(this.toponymsURL)
            .then(
                /** @param {*} data */
                (data) => {
                    this.toponyms = data;

                    //project toponyms
                    for (const tn of this.toponyms) {
                        const p = this.projection([tn.lon, tn.lat])
                        tn.x = p[0]; tn.y = p[1];
                        delete tn.lon; delete tn.lat;
                    }

                    //redraw
                    if(callback) callback()
                })
            .catch(() => {
                console.log("Failed loading toponyms from: " + this.toponymsURL)
                this.toponyms = []
            });
    }

}
