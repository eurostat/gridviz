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
 
    }


    /**
     * @param {GeoCanvas} cg The canvas where to draw the layer.
     * @returns {void}
     */
    draw(cg) {

        //TODO

    }

}
