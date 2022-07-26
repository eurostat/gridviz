//@ts-check

import { ALayer } from "./ALayer";
import { Layer } from "./Layer";
import { Style } from "./Style";

/**
 * 
 * @author Julien Gaffuri
 */
export class MultiScaleLayer extends ALayer {

    /**
     * 
     * @param {Array.<Layer>} layers 
     * @param {Array.<number>} resolutions 
     * @param {number} pixNb 
     * @param {{z0?:number,zMax?:number,visible?:boolean}} opts 
     */
    constructor(layers, resolutions, pixNb = 5, opts) {
        super(opts)
        opts = opts || {}

        /** @type {Array.<Layer>} */
        this.layers = layers;

        /** @type {Array.<number>} */
        this.resolutions = resolutions;

        /** Unit: number of pixels
         * @type {number} */
        this.pixNb = pixNb || 5;
        /** @type {number} */
        this.z0 = opts.z0 == undefined ? 0 : opts.z0;
        /** @type {number} */
        this.zMax = opts.zMax || Infinity;

        //NB: minZoom and maxZoom of layers do not need to be maintained consistant with this.zooms
    }

    /**
     * @param {number} zf 
     * @returns {Layer|undefined}  */
    getLayer(zf) {
        if (zf < this.z0 || zf > this.zMax) return;

        let i = 0;
        let z = this.resolutions[i] / this.pixNb
        while (z < zf && i < this.resolutions.length) {
            i++;
            z = this.resolutions[i] / this.pixNb
        }
        if (i == 0) return this.layers[0];
        return this.layers[i - 1];
    }

    /**
     * 
     * @param {Array.<Style>} styles 
     */
    setStyles(styles) {
        for (let lay of this.layers)
            lay.styles = styles
    }

}
