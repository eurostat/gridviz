//@ts-check

import { GeoCanvas } from "./GeoCanvas";

/**
 * 
 * @author Julien Gaffuri
 */
export class TMSBackgroundLayer {

    /**
     * @param {object} opts 
     */
    constructor(opts) {
        opts = opts || {};

        /** 
         * @private
         * @type {string} */
        this.url = opts.url

        /** An attribute to specify if a layer should be drawn or not
         * @type {boolean} */
        this.visible = opts.visible == false ? false : true;

        /** The minimum zoom factor: Below this level, the layer is not shown.
         * @type {number} */
        this.minZoom = opts.minZoom || 0;

        /** The maximum zoom factor: Above this level, the layer is not shown.
         * @type {number} */
        this.maxZoom = opts.maxZoom || Infinity;

        //ensure acceptable values for the zoom limits.
        if (this.minZoom >= this.maxZoom)
            throw new Error("Unexpected zoom limits for layer. Zoom min should be smaller than zoom max.")

        /** The data cache, indexed by z/y/x */
        this.cache = {}
    }

    /**
     * Get z/x/y cache data.
     * @param {number} z 
     * @param {number} x 
     * @param {number} y 
     * @returns {Image|undefined}
     * @private
     */
    get(z, x, y) {
        let d = this.cache[z];
        if (!d) return;
        d = d[x];
        if (!d) return;
        return d[y];
    }

    /**
     * Get z/x/y cache data.
     * @param {d|string} z 
     * @param {number} z 
     * @param {number} x 
     * @param {number} y 
     * @returns
     * @private
     */
    put(d, z, x, y) {
        if (!this.cache[z]) this.cache[z] = {}
        if (!this.cache[z][x]) this.cache[z][x] = {}
        this.cache[z][x][y] = d
    }

    /**
     * @param {GeoCanvas} cg The canvas where to draw the layer.
     * @returns {void}
     */
    draw(cg) {

        if (!this.img) {
            this.img = new Image()
            this.img.src = this.url + "3/8/7"
            this.img.onload = function () {
                cg.redraw()
            }
            return;
        }

        cg.ctx.drawImage(this.img, 100, 100)

        ///Z/X/Y.png

        /*
        async function drawImage(url, ctx) {
          let img = new Image();
          await new Promise(r => img.onload=r, img.src=url);
          ctx.drawImage(img, 0, 0);
        }
        
        let ctx = document.querySelector("#myCanvas").getContext("2d");
        await drawImage("https://example.com/image.png", ctx);
        */


    }

}
