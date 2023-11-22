//@ts-check
'use strict'

/** @typedef {{ dims: object, crs: string, tileSizeCell: number, originPoint: {x:number,y:number}, resolutionGeo: number, tilingBounds:import("../MultiResolutionDataset.js").Envelope }} GridInfo */

import { Dataset } from '../Dataset.js'

/**
 * A dataset composed of cells defined in javascript, or loaded outside of gridviz map.
 *
 * @author Joseph Davies, Julien Gaffuri
 */
export class JSGrid extends Dataset {
    /**
     * @param {number} resolution The dataset resolution in geographical unit.
     * @param {Array.<Object>} cells The cells.
     */
    constructor(resolution, cells) {
        super(undefined,"", resolution)

        /**
         * @private
         * @type {Array.<import("../MultiResolutionDataset.js").Cell>} */
        this.cells = cells || []
    }

    /**
     * Request data within a geographic envelope.
     *
     * @param {import("../MultiResolutionDataset.js").Envelope|undefined} e
     */
    getData(e) { return this }

    /**
     * Fill the view cache with all cells which are within a geographical envelope.
     *
     * @param {import("../MultiResolutionDataset.js").Envelope} extGeo
     * @returns {void}
     */
    updateViewCache(extGeo) {
        //data not loaded yet
        if (!this.cells) return

        this.cellsViewCache = []
        for (const cell of this.cells) {
            if (+cell.x + this.resolution < extGeo.xMin) continue
            if (+cell.x - this.resolution > extGeo.xMax) continue
            if (+cell.y + this.resolution < extGeo.yMin) continue
            if (+cell.y - this.resolution > extGeo.yMax) continue
            this.cellsViewCache.push(cell)
        }
    }
}