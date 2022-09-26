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

    }


    /**
     * @param {GeoCanvas} cg The canvas where to draw the layer.
     * @returns {void}
     */
    draw(cg) {

        //TODO

    }

}
