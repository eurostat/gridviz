//@ts-check
'use strict'

/**
 * A multi resolution dataset of grid cells.
 * It consists of different {@link Dataset}s for each resolution.
 *
 * @abstract
 *
 * @module core
 * @author Joseph Davies, Julien Gaffuri
 */
export class MultiResolutionDataset {
    /**
     * @param {Array.<number>} resolutions The resolutions of the datasets, in CRS geographical unit.
     * @param {Array.<import("./Dataset").Dataset>|function(number):import("./Dataset").Dataset} datasets The datasets list, one per resolution. Or a function that returns a dataset from a resolution value.
     * @param { {preprocess?:function(import("./Dataset").Cell):boolean, maxCells?:number|function(number):number} } opts Options. preprocess: A function to apply on each dataset cell to prepare its values. Can be used also to select cells to keep. maxCells: see the property.
     */
    constructor(resolutions, datasets, opts = {}) {
        opts = opts || {}

        /** The resolutions of the datasets, in CRS geographical unit.
         * @type {Array.<number>} */
        this.resolutions = resolutions

        /** The datasets. If the list is not explictely defined, build it from the resolution list with the function
         * @type {Array.<import("./Dataset").Dataset>} */
        this.datasets = typeof datasets === 'function' ? this.resolutions.map(datasets) : datasets

        //there must be as many datasets as resolutions
        if (this.datasets.length > 1 && this.datasets.length != this.resolutions.length)
            throw new Error(
                'Uncompatible number of datasets and resolutions: ' +
                    this.datasets.length +
                    ' ' +
                    this.resolutions.length
            )

        /**
         * A limit on what a view can load from a tiled dataset: the most cells its tiles could hold, or a function of the resolution
         * returning it. When the resolution chosen from the zoom is above the limit, the next coarser one which is not is shown.
         * It is counted before anything is downloaded, as if the tiles of the view were full, so it is well above the number of
         * cells of a grid with empty parts. Datasets which are not tiled are not limited. No limit by default.
         * @type {number|function(number):number|undefined} */
        this.maxCells = opts.maxCells

        //set dataset preprocesses if specified
        if (opts.preprocess) this.setPrepocesses(opts.preprocess)
    }

    /**
     * Return the relevant dataset for a specified zoom: the one of getRequestedDataset, or a coarser one when the view would load more than maxCells.
     * @param {number} z
     * @param {number} minPixelsPerCell
     * @returns {import("./Dataset").Dataset|undefined}
     * */
    getDataset(z, minPixelsPerCell) {
        const requested = this.getRequestedDataset(z, minPixelsPerCell)
        if (this.maxCells === undefined) return requested

        const first = this.datasets.indexOf(requested)
        for (let i = first; i < this.datasets.length; i++) {
            const dataset = this.datasets[i]
            const limit = typeof this.maxCells === 'function' ? this.maxCells(this.resolutions[i]) : this.maxCells
            const cells = MultiResolutionDataset.maxCellsInView(dataset)
            // its info is not there yet: nothing is downloaded until it is, and it can then be chosen or not
            if (cells === undefined) return dataset
            if (cells <= limit) return dataset
        }
        return this.datasets[this.datasets.length - 1]
    }

    /**
     * The most cells the tiles of the current view of the map could hold, as if they were full.
     * @param {import("./Dataset").Dataset} dataset
     * @returns {number|undefined} 0 for a dataset which is not tiled, and undefined while the info of a tiled one is loading.
     * @private
     */
    static maxCellsInView(dataset) {
        const tiled = /** @type {any} */ (dataset)
        if (!tiled.getTilingEnvelope) return 0
        const extent = tiled.map && tiled.map.geoCanvas && tiled.map.geoCanvas.extGeo
        if (!extent) return undefined
        // it also asks for the info, when it is not there
        const tiles = tiled.getTilingEnvelope(extent)
        if (!tiles || !tiled.info) return undefined
        const bounds = tiled.info.tilingBounds
        const width = Math.min(tiles.xMax, bounds.xMax) - Math.max(tiles.xMin, bounds.xMin) + 1
        const height = Math.min(tiles.yMax, bounds.yMax) - Math.max(tiles.yMin, bounds.yMin) + 1
        return Math.max(0, width) * Math.max(0, height) * tiled.info.tileSizeCell ** 2
    }

    /**
     * Return the dataset a zoom asks for, from the resolutions only: the finest one whose cells are at least minPixelsPerCell pixels wide.
     * @param {number} z
     * @param {number} minPixelsPerCell
     * @returns {import("./Dataset").Dataset|undefined}
     * */
    getRequestedDataset(z, minPixelsPerCell) {
        //special case whith single dataset
        if (this.datasets.length == 1) return this.datasets[0]

        const rs = this.resolutions
        let i = 0
        let z_ = rs[i] / minPixelsPerCell
        while (z_ < z && i < rs.length) {
            i++
            z_ = rs[i] / minPixelsPerCell
        }
        //if (i == 0) return this.dataset.datasets[0];
        //return this.dataset.datasets[i - 1];
        if (i == rs.length) return this.datasets[rs.length - 1]
        return this.datasets[i]
    }

    /**
     * Set a preprocess function for all datasets.
     * This is a function applied on each cell after it has been loaded.
     *
     * @param {function(import("./Dataset").Cell):boolean} preprocess
     * @returns {this}
     */
    setPrepocesses(preprocess) {
        for (let ds of this.datasets) ds.preprocess = preprocess
        return this
    }

    /**
     * A function to ease the creation of multi resolution datasets.
     *
     * @param {Array.<number>} resolutions The resolutions of the datasets, in CRS geographical unit
     * @param {function(number):import("./Dataset").Dataset} resToDataset Function returning a dataset from a resolution
     * @param { {preprocess?:function(import("./Dataset").Cell):boolean} } opts Options. preprocess: A function to apply on each dataset cell to prepare its values
     * @returns {MultiResolutionDataset}
     */
    /*static make(resolutions, resToDataset, opts) {
        //make datasets
        const dsc = []
        for (const res of resolutions) dsc.push(resToDataset(res))
        //make multi resolution dataset
        return new MultiResolutionDataset(dsc, resolutions, opts)
    }*/
}
