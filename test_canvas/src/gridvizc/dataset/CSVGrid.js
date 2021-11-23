//@ts-check
/** @typedef {{ dims: object, crs: string, tileSizeCell: number, originPoint: {x:number,y:number}, resolutionGeo: number, tilingBounds:Envelope }} GridInfo */

import { csv } from "d3-fetch";
import { Dataset, Cell, Envelope } from "../viewer/Dataset"

/**
 * A dataset composed of a single CSV file (not tiled).
 * 
 * @author Julien Gaffuri
 */
export class CSVGrid extends Dataset {

    /**
     * @param {string} url The url of the dataset.
     * @param {number} resolution The dataset resolution (in geographical unit).
     */
    constructor(url, resolution) {
        super(url, resolution)

        /** @type {Array.<Cell>} */
        this.cells = undefined;
    }


    /**
     * Request data within a geographic envelope.
     * 
     * @param {Envelope} e 
     * @param {function} callback 
     */
    getData(e, callback) {

        //check if data already loaded
        if(this.cells) return this;

        //load data
        csv(this.url)
        .then(
            /** @param {*} data */
            (data) => {
                //convert coordinates in numbers
                for (const c of data) { c.x=+c.x; c.y=+c.y; }

                this.cells = data;

                //execute the callback, usually a draw function
                if(callback) callback()
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
        if(!this.cells) return [];

        /** @type {Array.<Cell>} */
        let cells = []
        for (const cell of this.cells) {
            if(+cell.x + this.resolution < extGeo.xMin) continue;
            if(+cell.x - this.resolution > extGeo.xMax) continue;
            if(+cell.y + this.resolution < extGeo.yMin) continue;
            if(+cell.y - this.resolution > extGeo.yMax) continue;
            cells.push(cell)
        }

        return cells;
    }

}
