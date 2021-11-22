//@ts-check

/** @typedef { {xMin: number, xMax: number, yMin: number, yMax: number} } Envelope */
/** @typedef {{x: number, y: number}} Cell */

/**
 * @abstract
 * 
 * @author Julien Gaffuri
 */
export class Dataset {

    /**
     * @param {string} url This url of the dataset.
     * @param {number} resolutionGeo
     * @abstract
     */
     constructor(url, resolutionGeo){
        /** @type {string} */
        this.url = url;
        /** @type {number} */
        this.resolutionGeo = resolutionGeo;
    }


    /**
     * Request data within a geographic envelope.
     * 
     * @param {Envelope} extGeo 
     * @param {function} callback 
     * @returns {this}
     * @abstract
     */
     getData(extGeo, callback) {
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


}
