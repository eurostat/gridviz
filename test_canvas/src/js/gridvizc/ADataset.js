//@ts-check

/** @typedef { {xMin: number, xMax: number, yMin: number, yMax: number} } Envelope */
/** @typedef {{x: number, y: number}} Cell */

/**
 * 
 * @abstract
 * 
 * @author Julien Gaffuri
 */
export class ADataset {

    constructor() {
    }


    /**
     * Request data within a geographic envelope.
     * 
     * @abstract
     * @param {Envelope|undefined} extGeo 
     * @param {number} zf 
     * @param {function():void} callback 
     * @returns {this}
     */
    getData(extGeo, zf, callback) {
        throw new Error('Method getData not implemented.');
    }

    /** 
     * @param {number} zf 
     * @returns {Array.<Cell>} */
    getViewCache(zf) {
        throw new Error('Method getViewCache not implemented.');
    }

    /**
     * Fill the view cache with all cells which are within a geographical envelope.
     * @abstract
     * @param {Envelope} extGeo 
     * @param {number} zf 
     * @returns {void}
     */
    updateViewCache(extGeo, zf) {
        throw new Error('Method updateViewCache not implemented.');
    }

}
