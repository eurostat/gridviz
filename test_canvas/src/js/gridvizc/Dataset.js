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
     * 
     * @param {Array.<Dataset>} datasets 
     * @param {Array.<number>} resolutions 
     * @param {object} opts  
     * @abstract
     */
    constructor(datasets, resolutions, opts = undefined) {
        opts = opts || {};

        /** @type {Array.<Dataset>} */
        this.dataset = datasets;

        /** @type {Array.<number>} */
        this.resolutions = resolutions;

        /**
         * A preprocess to run on each cell after loading. It can be used to apply some specific treatment before or compute a new column.
         * @protected @type {function(Cell):void} */
         this.preprocess = opts.preprocess;

    }



    /**
     * @param {number} zf 
     * @returns {Layer|undefined}  */
    /*get(zf) {
       if (zf < this.z0 || zf > this.zMax) return;

       let i = 0;
       let z = this.resolutions[i] / this.pixNb
       while (z < zf && i < this.resolutions.length) {
           i++;
           z = this.resolutions[i] / this.pixNb
       }
       if (i == 0) return this.layers[0];
       return this.layers[i - 1];
   }
*/


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
