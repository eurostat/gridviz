//@ts-check

import { GeoCanvas } from "./GeoCanvas";
import { json } from "d3-fetch";

/**
 * @author Julien Gaffuri
 */
export class BoundaryLayer {

    /**
     * @param {string} url 
     * @param {object} opts 
     */
    constructor(url, opts) {
        opts = opts || {};

        /** 
         * @private @type {string} */
        this.url = url

        /** 
         * @private @type {function(object):void} */
        this.preprocess = opts.preprocess

        /** @private @type {Array.<object> | undefined} */
        this.fs

        /** @private @type {string} */
        this.loadingStatus = "notLoaded"
    }


    /**
     * Draw the layer.
     * @param {GeoCanvas} cg The canvas where to draw the layer.
     * @returns {void}
     */
    draw(cg) {

        //load data, if not done yet.
        if (!this.fs) {
            this.load(cg.redraw);
            return;
        }

        console.log("Draw boundaries: ", this.fs)

        //zoom factor
        //const zf = cg.getZf()

        /*/draw in pix coordinates
        cg.initCanvasTransform()

        //draw labels, one by one
        for (const lb of this.labels) {

            //get label style
            const st = this.style(lb, zf);
            if (!st) continue;
            cg.ctx.font = st;

            //check label within the view, to be drawn
            if (!cg.toDraw(lb)) continue;

            //position
            const xP = cg.geoToPixX(lb.x) + this.offsetPix[0]
            const yP = cg.geoToPixY(lb.y) - this.offsetPix[1]

            //label stroke, for the halo
            if (this.haloColor && this.haloWidth) {
                const hc = this.haloColor(lb, zf);
                const hw = this.haloWidth(lb, zf);
                if (hc && hw && hw > 0) {
                    cg.ctx.strokeStyle = hc;
                    cg.ctx.lineWidth = hw;
                    cg.ctx.strokeText(lb.name, xP, yP);
                }
            }

            //label fill
            if (this.color) {
                const col = this.color(lb, zf);
                if (col) {
                    cg.ctx.fillStyle = col;
                    cg.ctx.fillText(lb.name, xP, yP);
                }

            }
        }*/
    }

    /**
     * Load data for labels, from URL this.url
     * @param {function():void} callback
     * @private
     */
    load(callback) {

        if (!this.url) {
            console.log("Failed loading boundaries: No URL specified. " + this.url)
            this.loadingStatus = "failed"
            this.labels = []
            return;
        }

        if (this.loadingStatus === "notLoaded") {
            this.loadingStatus = "loading";

            json(this.url)
                .then(
                    /** @param {object} data */
                    (data) => {
                        data = data.features

                        //apply preprocess, if any
                        if (this.preprocess)
                            for (const f of data)
                                this.preprocess(f)

                        //store boundaries
                        this.fs = data;

                        this.loadingStatus = "loaded"

                        //redraw
                        if (callback) callback()
                    })
                .catch(() => {
                    console.log("Failed loading boundaries from " + this.url)
                    this.fs = []
                    this.loadingStatus = "failed"
                });
        }
    }



    //getters and setters

    /** @returns {string} */
    getUrl() { return this.url; }
    /** @param {string} val @returns {this} */
    setUrl(val) { this.url = val; return this; }

    /** @returns {function(object):void} */
    getPreprocess() { return this.preprocess; }
    /** @param {function(object):void} val @returns {this} */
    setPreprocess(val) { this.preprocess = val; return this; }

}
