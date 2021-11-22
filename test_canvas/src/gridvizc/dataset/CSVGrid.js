//@ts-check
/** @typedef {{ dims: object, crs: string, tileSizeCell: number, originPoint: {x:number,y:number}, resolutionGeo: number, tilingBounds:Envelope }} GridInfo */

import { csv } from "d3-fetch";
import { Dataset, Cell, Envelope } from "../viewer/Dataset"

/**
 * A dataset composed of a single CSV file.
 */
export class CSVGrid extends Dataset {

    /**
     * @param {string} url This url of the info.json.
     */
    constructor(url) {
        super(url, undefined)

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

        csv(this.url)
        .then(
            /** @param {*} data */
            (data) => {
                this.cells = data;

                //execute the callback, usually a draw function
                callback()
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
     * @param {Envelope} e 
     * @returns {Array.<Cell>}
     */
    getCells(e) {

        /** @type {Array.<Cell>} */
        let cells = []

        for (const cell of this.cells) {
            if(cell.x < e.xMin) continue;
            if(cell.x > e.xMax) continue;
            if(cell.y < e.yMin) continue;
            if(cell.y > e.yMax) continue;
        }

        return cells;
    }

}
