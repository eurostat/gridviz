//@ts-check
/** @typedef {{ dims: object, crs: string, tileSizeCell: number, originPoint: {x:number,y:number}, resolutionGeo: number, tilingBounds:Envelope }} GridInfo */

import { csv } from "d3-fetch";
import { Dataset, Cell, Envelope } from "../Dataset"

/**
 * A dataset composed of a single CSV file (not tiled).
 * 
 * @author Julien Gaffuri
 */
export class CSVGrid extends Dataset {

    /**
     * @param {string} url The URL of the dataset.
     * @param {number} resolution The dataset resolution in geogrpahical unit.
     * @param {object} opts 
     */
    constructor(url, resolution, opts) {
        super(url, resolution, opts)

        /** @private @type {Array.<Cell>} */
        this.cells = undefined;
    }


    /**
     * Request data within a geographic envelope.
     * 
     * @param {Envelope} e 
     * @param {function():void} redraw 
     */
    getData(e, redraw) {

        //TODO ensure it is not loading twice ?

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

                    //TODO check if redraw is necessary
                    //that is if the dataset belongs to a layer which is visible at the current zoom level

                    //execute the callback, usually a draw function
                    if (redraw) redraw()
                })
            .catch(() => {
                //mark as failed
                this.cells = []
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
        let cells = []
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
