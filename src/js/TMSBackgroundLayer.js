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

        this.img = undefined
    }


    /**
     * @param {GeoCanvas} cg The canvas where to draw the layer.
     * @returns {void}
     */
    draw(cg) {

        const url = this.url + "3/8/7";
        console.log(url)

        //TODO

        if(!this.img) {
            this.img = new Image()
            this.img.src = url
            this.img.onload = function () {
                cg.redraw()
            }
            return;
        }

        cg.ctx.drawImage(this.img, 100, 100)


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
