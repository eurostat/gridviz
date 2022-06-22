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

        //zoom factor
        const zf = cg.getZf()

        //draw in geo coordinates
        cg.setCanvasTransform()

        cg.ctx.strokeStyle = "red";
        cg.ctx.lineWidth = 2 * zf;

        for (const f of this.fs) {
            const cs = f.geometry.coordinates
            if(cs.length <2) continue;

            cg.ctx.beginPath();
            cg.ctx.moveTo(cs[0][0], cs[0][1]);
            for(let i=1; i<cs.legend; i++)
            cg.ctx.lineTo(cs[i][0], cs[i][1]);
            cg.ctx.stroke();
        }

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
