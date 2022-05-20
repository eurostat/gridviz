//@ts-check

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
     * @param {string} url The url of the dataset.
     * @param {number} resolution The dataset resolution (in geographical unit).
     * @param {function} preprocess A preprocess to run on each cell after loading. It can be used to apply some specific treatment before or compute a new column.
     * @abstract
     */
    constructor(url, resolution, preprocess = null) {

        /** @type {string} */
        this.url = url;

        /** @type {number} */
        this.resolution = resolution;

        /** @type {function} */
        this.preprocess = preprocess;
    }


    /**
     * Request data within a geographic envelope.
     * 
     * @param {Envelope} extGeo 
     * @param {function} callback 
     * @param {Function} errorCallback 
     * @returns {this}
     * @abstract
     */
    getData(extGeo, callback, errorCallback) {
        throw new Error('Method getData not implemented.');
    }

    /**
     * @param {Envelope} extGeo 
     * @returns {Array.<Cell>}
     * @abstract
     */
    getCells(extGeo) {
        throw new Error('Method getCells not implemented.');
    }

    /**
     * Get a cell under a given position, if any.
     * 
     * @param {{x:number,y:number}} posGeo 
     * @param {Array.<Cell>} cells Some cells from the dataset, a subset if necessary.
     * @returns {Cell}
     */
    getCellFromPosition(posGeo, cells, resolution) {

        //compute candidate cell position
        /** @type {number} */
        const r = resolution;
        /** @type {number} */
        const cellX = r * Math.floor(posGeo.x / r);
        /** @type {number} */
        const cellY = r * Math.floor(posGeo.y / r);

        //get cell data
        for (const cell of cells) {
            if (cell.x != cellX) continue;
            if (cell.y != cellY) continue;
            return cell;
        }
        return undefined;
    }

}
