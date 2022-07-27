//@ts-check

import { ADataset, Cell } from "./ADataset";


/**
 * A dataset of grid cells.
 * 
 * @abstract
 * 
 * @author Julien Gaffuri
 */
export class Dataset extends ADataset {

    /**
     * @param {string} url The URL of the dataset.
     * @param {number} resolution The dataset resolution in geographical unit.
     * @param {object} opts 
     * @abstract
     */
    constructor(url, resolution, opts = undefined) {
        super(opts)
        opts = opts || {};

        /**
         * The url of the dataset.
         * @protected @type {string} */
        this.url = url;

        /**
         * The dataset resolution in geographical unit.
         * @protected @type {number} */
        this.resolution = resolution;

        /** The cells within the view
         * @protected @type {Array.<Cell>} */
        this.cellsViewCache = []
    }

    /** 
     * @param {number} zf 
     * @returns {Array.<Cell>} */
    getViewCache(zf) { return this.cellsViewCache }

    /**
     * Get a cell under a given position, if any.
     * 
     * @param {{x:number,y:number}} posGeo 
     * @param {Array.<Cell>} cells Some cells from the dataset (a subset if necessary, usually the view cache).
     * @returns {Cell|undefined}
     */
    getCellFromPosition(posGeo, cells) {

        //compute candidate cell position
        /** @type {number} */
        const r = this.getResolution();
        /** @type {number} */
        const cellX = r * Math.floor(posGeo.x / r)
        /** @type {number} */
        const cellY = r * Math.floor(posGeo.y / r)

        //get cell
        for (const cell of cells) {
            if (cell.x != cellX) continue;
            if (cell.y != cellY) continue;
            return cell;
        }
        return undefined;
    }

    //getters and setters

    /** @returns {number} */
    getResolution() { return this.resolution; }

}
