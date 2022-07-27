//@ts-check

import { DatasetComponent } from "./DatasetComponent";

/** @typedef { {xMin: number, xMax: number, yMin: number, yMax: number} } Envelope */
/** @typedef {{x: number, y: number}} Cell */

/**
 * A multi resolution dataset of grid cells.
 * It consists of different dataset components for each resolution.
 * 
 * @abstract
 * 
 * @author Julien Gaffuri
 */
export class Dataset {

    /**
     * @param {Array.<DatasetComponent>} datasetComponents The dataset components.
     * @param {Array.<number>} resolutions The resolutions of the dataset components, in CRS geographical unit.
     * @param {{preprocess?:function(Cell):void}} opts preprocess: A function to apply on each dataset cell to prepare its values.
     */
    constructor(datasetComponents, resolutions, opts = {}) {
        opts = opts || {};

        /** The dataset components.
         * @type {Array.<DatasetComponent>} */
        this.datasetComponents = datasetComponents;

        /** The resolutions of the dataset components, in CRS geographical unit.
         * @type {Array.<number>} */
        this.resolutions = resolutions;

        //there must be as many dataset components as resolutions
        if (this.datasetComponents.length != this.resolutions.length)
            throw new Error("Uncompatible number of datasets and resolutions: " + this.datasetComponents.length + " " + this.resolutions.length)

        //set dataset preprocesses if specified
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
