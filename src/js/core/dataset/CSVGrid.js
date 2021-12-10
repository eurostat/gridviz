//@ts-check
/** @typedef {{ url: String, resolution: Number, preprocess: Function, styles: Array<Style>, minZoom: Number, maxZoom: Number }} CSVGridConfig */

import { csv } from "d3-fetch";
import { Dataset, Cell, Envelope } from "../Dataset"
import { Style } from '../Style';

/**
 * A dataset composed of a single CSV file (not tiled).
 * 
 * @author Julien Gaffuri
 */
export class CSVGrid extends Dataset {

    /**
     * @param {CSVGridConfig} opts The url of the dataset.
     */
    constructor(opts) {
        super(opts.url, opts.resolution, opts.preprocess);

        /** @type {Array.<Cell>} */
        this.cells = undefined;
    }


    /**
     * Request data within a geographic envelope.
     * 
     * @param {Envelope} e 
     * @param {Function} callback 
     * @param {Function} errorCallback 
     */
    getData(e, callback, errorCallback) {

        //check if data already loaded
        if (this.cells) return this;

        //load data
        csv(this.url)
            .then(
                /** @param {*} data */
                (data) => {
                    //convert coordinates in numbers
                    for (const c of data) { c.x = +c.x; c.y = +c.y; }

                    this.cells = data;

                    //execute preprocess, if any
                    if (this.preprocess) for (const c of this.cells) this.preprocess(c);

                    //execute the callback, usually a draw function
                    if (callback) callback(this)
                })
            .catch(() => {
                //mark as failed
                this.cells = []
                //execute the error callback
                if (errorCallback) errorCallback(this)
            });

        return this;
    }


    /**
     * Get all cells from cache which are within a geographical envelope.
     * 
     * @param {Envelope} extGeo 
     * @returns {Array.<Cell>}
     */
    getCells(extGeo) {

        //data not loaded yet
        if (!this.cells) return [];

        /** @type {Array.<Cell>} */
        let cells = [];
        for (const cell of this.cells) {
            if (+cell.x + this.resolution < extGeo.xMin) continue;
            if (+cell.x - this.resolution > extGeo.xMax) continue;
            if (+cell.y + this.resolution < extGeo.yMin) continue;
            if (+cell.y - this.resolution > extGeo.yMax) continue;
            cells.push(cell)
        }

        return cells;
    }

}
