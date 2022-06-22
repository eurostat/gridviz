//@ts-check

import { GeoCanvas } from "./GeoCanvas";

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
        this.color = opts.color || (() => "#222")

        /** Specify the label halo color, depending on its importance and the zoom level.
         * @private @type {function(Label,number):string} */
        this.haloColor = opts.haloColor || (() => "#FFFFFFBB")

        /** Specify the label halo width, depending on its importance and the zoom level.
        * @private @type {function(Label,number):number} */
        this.haloWidth = opts.haloWidth || (() => 3)

        /** The anchor where to draw the text, from label position. See HTML-canvas textAlign property.
         * "left" || "right" || "center" || "start" || "end"
         * @private @type {string} */
        this.textAlign = opts.textAlign || "start"

        /**
        * @private @type {Array.<number>} */
        this.offsetPix = opts.offsetPix || [5, 5]

        /** 
         * A preprocess to run on each label after loading.
         * It can be used to apply some specific treatment before, format the label data, project coordinates, etc.
         * @private @type {function(object):void} */
        this.preprocess = opts.preprocess

        /** @private @type {Array.<Label> | undefined} */
        this.labels

        /** @private @type {string} */
        this.loadingStatus = "notLoaded"
    }


    /**
     * Draw the label layer.
     * 
     * @param {GeoCanvas} cg The canvas where to draw the layer.
     * @returns {void}
     */
    draw(cg) {

        //load labels, if not done yet.
        if (!this.labels) {
            this.load(cg.redraw);
            return;
        }

        //zoom factor
        const zf = cg.getZf()

        //text align
        cg.ctx.textAlign = this.textAlign || "start";


        //draw in pix coordinates
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
