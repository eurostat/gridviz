//@ts-check
/** @typedef { {xMin: number, xMax: number, yMin: number, yMax: number} } Envelope */

import { select } from "d3-selection";
import { zoom, zoomIdentity } from "d3-zoom";

/**
 * A HTML canvas for geo data display, enhanced with zoom and pan capabilities.
 * 
 * @author Julien Gaffuri
 */
export class GeoCanvas {

    /**
     * @constructor
     * @param {string} canvasId
     * @param {object} center Geographical coordinates of the center
     * @param {number} zf The zoom factor (pixel size, in ground m)
     */
    constructor(canvasId = "vacanvas", center = undefined, zf = 1) {

        /** @type {object} */
        this.canvas = document.getElementById(canvasId);

        /** @type {number} */
        this.w = this.canvas.offsetWidth;
        /** @type {number} */
        this.h = this.canvas.offsetHeight;

        this.canvas.width = this.w;
        this.canvas.height = this.h;

        /**@type {object} */
        this.ctx = this.canvas.getContext("2d");

        // set geo coordinates of the center
        this.center = center || { x: this.w * 0.5, y: this.h * 0.5 };

        // set zoom factor: pixel size, in m/pix
        this.zf = zf;

        //current extent
        /** @type {Envelope} */
        this.extGeo = { xMin: NaN, xMax: NaN, yMin: NaN, yMax: NaN };
        this.updateExtentGeo()

        //rely on d3 zoom for pan/zoom
        let tP = zoomIdentity
        const z = zoom().on("zoom", (e) => {
            const t = e.transform
            const f = tP.k / t.k
            if (f == 1) {
                //pan
                const dx = tP.x - t.x
                const dy = tP.y - t.y
                this.pan(dx * this.getZf(), -dy * this.getZf())
            } else {
                const se = e.sourceEvent;
                if (se instanceof WheelEvent) {
                    //zoom at the mouse position
                    this.zoom(f, this.pixToGeoX(e.sourceEvent.offsetX), this.pixToGeoY(e.sourceEvent.offsetY))
                } else if (se instanceof TouchEvent) {
                    //compute average position of the touches
                    let tx = 0, ty = 0
                    for (let tt of se.targetTouches) { tx += tt.clientX; ty += tt.clientY }
                    tx /= se.targetTouches.length; ty /= se.targetTouches.length
                    //zoom at this average position
                    this.zoom(f, this.pixToGeoX(tx), this.pixToGeoY(ty))
                }
            }
            tP = t
        });
        z(select(this.canvas))
        //select(this.canvas).call(z);

        /** Zoom extent, to limit zoom in and out
         *  @type {Array.<number>} */
        this.zfExtent = [0, Infinity]
    }

    /** @param {{x:number,y:number}} v Geographical coordinates of the center */
    setCenter(v) { this.center = v; }
    /** @returns {{x:number,y:number}} Geographical coordinates of the center */
    getCenter() { return this.center; }

    /** @param {number} v The zoom factor (pixel size, in ground m) */
    setZf(v) {
        this.zf = v;
        if (this.slider) this.slider.attr("value", +this.zf)
    }
    /** @returns {number} The zoom factor (pixel size, in ground m) */
    getZf() { return this.zf; }

    /** @param {Array.<number>} v */
    setZfExtent(v) { this.zfExtent = v; }
    /** @returns {Array.<number>} */
    getZfExtent() { return this.zfExtent; }



    /** Initialise canvas transform with identity transformation. */
    initCanvasTransform() {
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    }

    /** Initialise canvas transform with geo to screen transformation, so that geo objects can be drawn directly in geo coordinates. */
    setCanvasTransform() {
        const k = 1 / this.getZf();
        const tx = -this.center.x / this.getZf() + this.w * 0.5;
        const ty = this.center.y / this.getZf() + this.h * 0.5;
        this.ctx.setTransform(k, 0, 0, -k, tx, ty);
    }

    getWebGLTransform() {
        const kx = 2 / (this.w * this.getZf());
        const ky = 2 / (this.h * this.getZf());
        return [
            kx, 0.0, 0.0, -kx * this.center.x,
            0.0, ky, 0.0, -ky * this.center.y,
            0.0, 0.0, 1.0, 0.0,
            0.0, 0.0, 0.0, 1.0
        ]
    }


    /** The function specifying how to draw the map. */
    redraw() {
        throw new Error('Method redraw not implemented.');
    }

    /**
     * Clear. To be used before a redraw for example.
     * @param {string} color 
     */
    clear(color = "white") {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(0, 0, this.w, this.h);
    }

    /**
     * @param {number} dxGeo
     * @param {number} dyGeo
     */
    pan(dxGeo, dyGeo) {
        //TODO force extend to remain
        this.center.x += dxGeo;
        this.center.y += dyGeo;
        this.updateExtentGeo()
        this.redraw();
    }

    /**
     * Zoom.
     * @param {number} f The zoom factor, within ]0, Infinity]. 1 is for no change. <1 to zoom-in, >1 to zoom-out.
     * @param {number} xGeo The x geo position fixed in the screen.
     * @param {number} yGeo The y geo position fixed in the screen.
     */
    zoom(f = 1, xGeo = this.center.x, yGeo = this.center.y) {
        //TODO force extend to remain

        //ensure zoom extent preserved
        const newZf = f * this.getZf()
        if (newZf < this.zfExtent[0]) f = this.zfExtent[0] / this.getZf()
        if (newZf > this.zfExtent[1]) f = this.zfExtent[1] / this.getZf()

        this.setZf(f * this.getZf());
        this.center.x += (xGeo - this.center.x) * (1 - f)
        this.center.y += (yGeo - this.center.y) * (1 - f)
        this.updateExtentGeo()
        this.redraw();
    }

    /**
     * @param {number} marginPx 
     * @returns {Envelope} The envelope of the view, in geo coordinates.
     */
    updateExtentGeo(marginPx = 20) {
        this.extGeo = {
            xMin: this.pixToGeoX(-marginPx),
            xMax: this.pixToGeoX(this.w + marginPx),
            yMin: this.pixToGeoY(this.h + marginPx),
            yMax: this.pixToGeoY(-marginPx)
        }
        return this.extGeo;
    }

    /**
     * Check if the object has to be drawn
     * 
     * @param {{x:number,y:number}} obj 
     */
    toDraw(obj) {
        if (obj.x < this.extGeo.xMin) return false;
        if (obj.x > this.extGeo.xMax) return false;
        if (obj.y < this.extGeo.yMin) return false;
        if (obj.y > this.extGeo.yMax) return false;
        return true
    }



    //conversion functions
    /**
     * @param {number} xGeo Geo x coordinate, in m.
     * @returns {number} Screen x coordinate, in pix.
    */
    geoToPixX(xGeo) { return (xGeo - this.center.x) / this.getZf() + this.w * 0.5; }
    /**
     * @param {number} yGeo Geo y coordinate, in m.
     * @returns {number} Screen y coordinate, in pix.
    */
    geoToPixY(yGeo) { return -(yGeo - this.center.y) / this.getZf() + this.h * 0.5; }
    /**
     * @param {number} x Screen x coordinate, in pix.
     * @returns {number} Geo x coordinate, in m.
    */
    pixToGeoX(x) { return (x - this.w * 0.5) * this.getZf() + this.center.x; }
    /**
     * @param {number} y Screen y coordinate, in pix.
     * @returns {number} Geo y coordinate, in m.
    */
    pixToGeoY(y) { return -(y - this.h * 0.5) * this.getZf() + this.center.y; }


    /** Get x,y,z elements from URL and assign them to the view center and zoom level. */
    setViewFromURL() {
        const x = getParameterByName("x"),
            y = getParameterByName("y"),
            z = getParameterByName("z")
        const c = this.getCenter();
        if (x != null && x != undefined && !isNaN(+x)) c.x = +x;
        if (y != null && y != undefined && !isNaN(+y)) c.y = +y;
        if (z != null && z != undefined && !isNaN(+z)) this.setZf(+z);
    }





    /**
     * 
     * @param {string} id 
     * @param {object} opts 
     * @returns 
     */
    addZoomSlider(id, opts) {
        opts = opts || {}
        opts.width = opts.width || "30px"
        opts.height = opts.height || "300px"


        //the div element
        const div = select("#" + id);
        if (div.empty()) {
            console.error("Could not find div element to build zoom slider. Id: " + id)
            return;
        }

        const th = this
        /** */
        this.slider = div.append("input")
            .attr("type", "range")
            .attr("min", this.getZfExtent()[0])
            .attr("max", this.getZfExtent()[1])
            .attr("value", this.getZf())
            .on("input", function (d) {
                select(this).attr("value", +this.value)
                th.setZf(+this.value)
                //redraw
                th.redraw()
            })
            .style("width", opts.width)
            .style("height", opts.height)
            .style("opacity", 0.7)
            .on("mouseover", function (d) {
                select(this).style("opacity", 1)
            })
            .on("mouseout", function (d) {
                select(this).style("opacity", 0.7)
            })
            .style("-webkit-appearance", "slider-vertical") //for chrome
            .style("writing-mode", "bt-lr") //for IE/edge
            .attr("orient", "vertical") //for firefox
            .style("background", "lightgray")
            .style("outline", "none")
            .style("-webkit-transition", ".2s")
            .style("transition", "opacity .2s")

        //TODO
        /*select(".slider::-webkit-slider-thumb")
            .style("-webkit-appearance", "none")
            .style("appearance", "none")
            .style("width", "30px")
            .style("height", "40px")
            .style("background", "black")
            .style("cursor", "pointer")*/

        /*select("slider::-moz-range-thumb")
            .style("-webkit-appearance", "none")
            .style("width", "30px")
            .style("height", "40px")
            .style("background", "#04AA6D")
            .style("cursor", "pointer")*/
        /*
            .slider::ms-thumb,
        .slider::-moz-range-thumb {
        }*/

        return this
    }

}

/**
 * @param {string} name
 * @returns {string | null}
 */
const getParameterByName = function (name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return !results ? null : decodeURIComponent(results[1].replace(/\+/g, " "));
};
