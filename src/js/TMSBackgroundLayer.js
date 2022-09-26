//@ts-check

import { PUREISH_TYPES } from "@babel/types";
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
     * @returns {HTMLImageElement|undefined}
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
     * @param {HTMLImageElement} img
     * @param {number} z 
     * @param {number} x 
     * @param {number} y 
     * @returns
     * @private
     */
    put(img, z, x, y) {
        if (!this.cache[z]) this.cache[z] = {}
        if (!this.cache[z][x]) this.cache[z][x] = {}
        this.cache[z][x][y] = img
    }

    /**
     * @param {GeoCanvas} cg The canvas where to draw the layer.
     * @returns {void}
     */
    draw(cg) {

        //get image coordinate
        const z = 3, x = 8, y = 7

        const res = 6614.596562526459;
        const size = 256 * res / cg.getZf();

        console.log(size)

        console.log(cg.extGeo)


        //handle images
        for (let i = 0; i < 1; i++) {

            //get image
            let d = this.get(z, x, y)

            //load image
            if (!d) {
                const img = new Image()
                img.src = this.url + z + "/" + x + "/" + y
                img.onload = () => {
                    this.put(img, z, x, y)
                    cg.redraw()
                }
                continue;
            }

            //draw image
            cg.ctx.drawImage(d, 0, 0, size, size)
        }

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
