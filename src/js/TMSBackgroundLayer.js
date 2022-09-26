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

        const zToRes = (z) => {
            if (z == 0) return 66145.9656252646
            if (z == 1) return 26458.386250105836
            if (z == 2) return 13229.193125052918
            if (z == 3) return 6614.596562526459
            if (z == 4) return 2645.8386250105837
            if (z == 5) return 1322.9193125052918
            return undefined
        }

        //get image coordinate
        const z = 4, x = 17, y = 20

        const res = zToRes(z)
        const size = 256 * res / cg.getZf()

        const x0 = -8426600.0, yMax = 1.59685E7
        //const x0 = -1.3581510484347418E7, y0 = -4.696133627367433E7;
        //const x0 = -8426403.908319328, y0 = -9526565.472562958, yMax = 1.5946565472562958E7

        const xGeo = x0 + x * 256 * res
        const yGeo = yMax - y * 256 * res

        //cg.setCanvasTransform()

        //handle images
        for (let i = 0; i < 1; i++) {

            //get image
            let d = this.get(z, x, y)

            //load image
            if (!d) {
                const img = new Image()
                img.src = this.url + z + "/" + y + "/" + x
                img.onload = () => {
                    this.put(img, z, x, y)
                    cg.redraw()
                }
                continue;
            }

            //draw image
            cg.ctx.drawImage(d, cg.geoToPixX(xGeo), cg.geoToPixY(yGeo), size, size)
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
