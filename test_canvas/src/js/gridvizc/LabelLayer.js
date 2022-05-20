//@ts-check

import { csv } from "d3-fetch";
import { GeoViewer } from "./GeoViewer";

/** A label. The name is the text to show. (x,y) are the coordinates in the same CRS as the grid.
 * @typedef {{name: string, x:number, y:number }} Label */

/**
 * A (generic) layer for placename labels, to be shown on top of the grid layers.
 * The input is a CSV file with the position (lon, lat) of the labels and name + some other info on the label importance.
 * If the label data is not in the expected format or in the same CRS as the grid, it can be corrected with the "preprocess" function.
 * The selection of the label, their style (font, weight, etc.) and color can be specified depending on their importance and the zoom level.
 * 
 * @author Julien Gaffuri
 */
export class LabelLayer {

    /**
     * @param {string} url 
     * @param {object} opts 
     */
    constructor(url, opts) {
        opts = opts || {};

        /** 
         * The URL of the label data, as CSV file.
         * The file should contain the information for each label such as the text, the position and other information for the display of the label according to the zoom level.
         * If necessary, this data can be reformated with the 'preprocess' parameter.
         * @private @type {string} */
        this.url = url

        /** Specify if and how a label should be drawn, depending on its importance and the zoom level.
         * @private @type {function(Label,number):string} */
        this.style = opts.style || (() => "bold 15px Arial")

        /** Specify the label color, depending on its importance and the zoom level.
         * @private @type {function(Label,number):string} */
        this.color = opts.color || (() => "#000000BB")

        /** Specify the label halo color, depending on its importance and the zoom level.
         * @private @type {function(Label,number):string} */
        this.haloColor = opts.haloColor || (() => "#FFFFFFBB")

        /** Specify the label halo width, depending on its importance and the zoom level.
        * @private @type {function(Label,number):number} */
        this.haloWidth = opts.haloWidth || (() => 3)

        /** 
         * A preprocess to run on each label after loading.
         * It can be used to apply some specific treatment before, format the label data, project coordinates, etc.
         * @private @type {function(object):void} */
        this.preprocess = opts.preprocess

        /** @private @type {Array.<Label>} */
        this.labels = undefined

        /** @private @type {string} */
        this.loadingStatus = "notLoaded"
    }


    /**
     * Draw the label layer.
     * 
     * @param {GeoViewer} cg The canvas where to draw the layer.
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


            //get label style
            const st = this.style(lb, cg.zf);
            if (!st) continue;
            cg.ctx.font = st;

            //position
            const xP = cg.geoToPixX(lb.x)
            const yP = cg.geoToPixY(lb.y)

            //label stroke, for the halo
            if (this.haloColor && this.haloWidth) {
                const hc = this.haloColor(lb, cg.zf);
                const hw = this.haloWidth(lb, cg.zf);
                if (hc && hw && hw > 0) {
                    cg.ctx.strokeStyle = hc;
                    cg.ctx.lineWidth = hw;
                    cg.ctx.strokeText(lb.name, xP, yP);
                }
            }

            //label fill
            if (this.color) {
                const col = this.color(lb, cg.zf);
                if (col) {
                    cg.ctx.fillStyle = col;
                    cg.ctx.fillText(lb.name, xP, yP);
                }

            }
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
            this.loadingStatus = "failed"
            this.labels = []
            return;
        }

        if (this.loadingStatus === "notLoaded") {
            this.loadingStatus = "loading"
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

                        this.loadingStatus = "loaded"

                        //redraw
                        if (callback) callback()
                    })
                .catch(() => {
                    console.log("Failed loading labels from " + this.url)
                    this.labels = []
                    this.loadingStatus = "failed"
                });
        }
    }



    //getters and setters

    /** @returns {string} */
    getUrl() { return this.url; }
    /** @param {string} val @returns {this} */
    setUrl(val) { this.url = val; return this; }

    /** @returns {function(Label,number):string} */
    getStyle() { return this.style; }
    /** @param {function(Label,number):string} val @returns {this} */
    setStyle(val) { this.style = val; return this; }

    /** @returns {function(Label,number):string} */
    getColor() { return this.color; }
    /** @param {function(Label,number):string} val @returns {this} */
    setColor(val) { this.color = val; return this; }

    /** @returns {function(Label,number):string} */
    getHaloColor() { return this.haloColor; }
    /** @param {function(Label,number):string} val @returns {this} */
    setHaloColor(val) { this.haloColor = val; return this; }

    /** @returns {function(Label,number):number} */
    getHaloWidth() { return this.haloWidth; }
    /** @param {function(Label,number):number} val @returns {this} */
    setHaloWidth(val) { this.haloWidth = val; return this; }

    /** @returns {function(object):void} */
    getPreprocess() { return this.preprocess; }
    /** @param {function(object):void} val @returns {this} */
    setPreprocess(val) { this.preprocess = val; return this; }

}
