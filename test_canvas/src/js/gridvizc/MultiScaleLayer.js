//@ts-check

import { ALayer } from "./ALayer";
import { Layer } from "./Layer";
import { Style } from "./Style";

/**
 * 
 * @author Julien Gaffuri
 */
export class MultiScaleLayer extends ALayer {

    constructor(layers, zooms) {
        super()

        if (layers.length + 1 != zooms.length)
            throw new Error('Inconsistant number of layers / zooms in multiscale layer definition.');

        /** @type {Array.<Layer>} */
        this.layers = layers;

        /** @type {Array.<number>} */
        this.zooms = zooms;

        //NB: minZoom and maxZoom of layers do not need to be maintained consistant with this.zooms
    }



    /**
     * @param {number} zf 
     * @returns {Layer|undefined}  */
    getLayer(zf) {
        let i = 0;
        let z = this.zooms[i];
        if (zf < z) return;
        while (z < zf && i < this.zooms.length) { i++; z = this.zooms[i] }
        if (i == this.zooms.length) return;
        return this.layers[i - 1];
    }

    /** @abstract */
    hideLegends() {
        for (const l of this.layers)
            l.hideLegends()
    }

}
