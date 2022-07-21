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
     * @param {number} z0 
     * @param {number} zMax 
     */
    constructor(layers, resolutions, pixNb = 5, z0 = 0, zMax = Infinity) {
        super()

        /** @type {Array.<Layer>} */
        this.layers = layers;

        /** @type {Array.<number>} */
        this.resolutions = resolutions;

        /** Unit: number of pixels
         * @type {number} */
        this.pixNb = pixNb || 5;
        /** @type {number} */
        this.z0 = z0;
        /** @type {number} */
        this.zMax = zMax;

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
