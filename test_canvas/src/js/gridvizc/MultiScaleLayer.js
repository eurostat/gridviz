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
     */
    constructor(layers, resolutions, resToZoomFactor, z0 = 0, zMax=Infinity) {
        super()

        /** @type {Array.<Layer>} */
        this.layers = layers;

        /** @type {Array.<number>} */
        this.resolutions = resolutions;

        /** @type {number} */
        this.resToZoomFactor = resToZoomFactor;
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

/*
        //zoom breaks
        const zooms = [];
        zooms.push(z0);
        for (let r of resolutions) zooms.push(resToZoomMult * r)
        zooms.pop()
        zooms.push(zMax);
        console.log(zooms)

*/

        let i = 0;
        let z = this.zooms[i];
        if (zf < z) return;
        while (z < zf && i < this.zooms.length) { i++; z = this.zooms[i] }
        if (i == this.zooms.length) return;
        return this.layers[i - 1];
    }

}
