//@ts-check

import { DatasetComponent } from "./DatasetComponent";

/** @typedef { {xMin: number, xMax: number, yMin: number, yMax: number} } Envelope */
/** @typedef {{x: number, y: number}} Cell */

/**
 * A dataset of grid cells.
 * 
 * @abstract
 * 
 * @author Julien Gaffuri
 */
export class Dataset {

    /**
     * 
     * @param {Array.<DatasetComponent>} datasetComponents 
     * @param {Array.<number>} resolutions 
     * @param {object} opts  
     * @abstract
     */
    constructor(datasetComponents, resolutions, opts = undefined) {
        opts = opts || {};

        /** @type {Array.<DatasetComponent>} */
        this.datasetComponents = datasetComponents;

        /** @type {Array.<number>} */
        this.resolutions = resolutions;

        if (this.datasetComponents.length >= this.resolutions.length)
            throw new Error("Uncompatible number of datasets and resolutions: " + this.datasetComponents.length + " " + this.resolutions.length)

        //set dataset preprocesses if sepcified
        if (opts.preprocess)
            this.setPrepocesses(opts.preprocess)
    }

    /**
     * 
     * @param {function(Cell):void} preprocess 
     * @returns {this}
     */
    setPrepocesses(preprocess) {
        for (let ds of this.datasetComponents)
            ds.preprocess = preprocess
        return this;
    }

}
