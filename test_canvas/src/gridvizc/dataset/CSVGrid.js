//@ts-check
/** @typedef {{ dims: object, crs: string, tileSizeCell: number, originPoint: {x:number,y:number}, resolutionGeo: number, tilingBounds:Envelope }} GridInfo */

import { csv } from "d3-fetch";
import { Dataset, Cell, Envelope } from "../viewer/Dataset"

/**
 * A dataset composed of a single CSV file.
 */
export class CSVGrid extends Dataset {

    /**
     * @param {string} url This url of the CSV file.
     * @param {number} resolutionGeo This url of the info.json.
     */
    constructor(url, resolutionGeo) {
        super(url, resolutionGeo)

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
                this.cells = data;

                //TODO
                for (const cell of this.cells) { cell.x = +cell.x; cell.y = +cell.y; }

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
     * @param {Envelope} extGeo 
     * @returns {Array.<Cell>}
     */
    getCells(extGeo) {

        //data not loaded yet
        if(!this.cells) return [];

        /** @type {Array.<Cell>} */
        let cells = []
        for (const cell of this.cells) {
            if(cell.x < extGeo.xMin) continue;
            if(cell.x > extGeo.xMax) continue;
            if(cell.y < extGeo.yMin) continue;
            if(cell.y > extGeo.yMax) continue;
            cells.push(cell)
        }

        return cells;
    }

}
