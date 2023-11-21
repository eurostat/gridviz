//@ts-check
'use strict'

/**
 * A multi resolution dataset of grid cells.
 * It consists of different {@link Dataset}s for each resolution.
 *
 * @abstract
 *
 * @author Joseph Davies, Julien Gaffuri
 */
export class MultiResolutionDataset {
    /**
     * @param {Array.<import("./Dataset").Dataset>} datasets The datasets
     * @param {Array.<number>} resolutions The resolutions of the datasets, in CRS geographical unit
     * @param { {preprocess?:function(Cell):boolean} } opts Options. preprocess: A function to apply on each dataset cell to prepare its values. Can be used also to select cells to keep.
     */
    constructor(datasets, resolutions =[], opts = {}) {
        opts = opts || {}

        /** The dataset.
         * @type {Array.<import("./Dataset").Dataset>} */
        this.datasetComponents = datasets

        /** The resolutions of the datasets, in CRS geographical unit.
         * @type {Array.<number>} */
        this.resolutions = resolutions

        //there must be as many datasets as resolutions
        if (this.datasetComponents.length > 1 && this.datasetComponents.length != this.resolutions.length)
            throw new Error(
                'Uncompatible number of datasets and resolutions: ' +
                    this.datasetComponents.length +
                    ' ' +
                    this.resolutions.length
            )

        //set dataset preprocesses if specified
        if (opts.preprocess) this.setPrepocesses(opts.preprocess)
    }

    /**
     * Set a preprocess function for all datasets.
     * This is a function applied on each cell after it has been loaded.
     *
     * @param {function(Cell):boolean} preprocess
     * @returns {this}
     */
    setPrepocesses(preprocess) {
        for (let ds of this.datasetComponents) ds.preprocess = preprocess
        return this
    }

    /**
     * A function to ease the creation of multi resolution datasets.
     *
     * @param {Array.<number>} resolutions The resolutions of the datasets, in CRS geographical unit
     * @param {function(number):import("./Dataset").Dataset} resToDataset Function returning a dataset from a resolution
     * @param { {preprocess?:function(Cell):boolean} } opts Options. preprocess: A function to apply on each dataset cell to prepare its values
     * @returns {MultiResolutionDataset}
     */
    static make(resolutions, resToDataset, opts) {
        //make datasets
        const dsc = []
        for (const res of resolutions) dsc.push(resToDataset(res))
        //make multi resolution dataset
        return new MultiResolutionDataset(dsc, resolutions, opts)
    }
}
