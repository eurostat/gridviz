//@ts-check

import { DatasetComponent } from "../DatasetComponent";
import { tableFromIPC } from "apache-arrow"
import { readParquet } from "parquet-wasm"

/**
 * A dataset composed of a single parquet file (not tiled).
 * 
 * @author Julien Gaffuri
 */
export class ParquetGrid extends DatasetComponent {

    /**
     * @param {string} url The URL of the dataset.
     * @param {number} resolution The dataset resolution in geographical unit.
     * @param {{preprocess?:(function(import("../Dataset").Cell):boolean)}} opts 
     */
    constructor(url, resolution, opts = {}) {
        super(url, resolution, opts)

        /** 
         * @private
         * @type {Array.<import("../Dataset").Cell>} */
        this.cells = [];

        /**  
         * @type {string}
         * @private  */
        this.infoLoadingStatus = "notLoaded";
    }


    /**
     * Request data within a geographic envelope.
     * 
     * @param {import("../Dataset").Envelope|undefined} e 
     * @param {function():void} redraw 
     */
    getData(e, redraw) {

        //check if data already loaded
        if (this.infoLoadingStatus != "notLoaded") return this;

        //load data
        this.infoLoadingStatus = "loading";

        console.log("aahgvhva")

        //const ss = tableFromIPC
        //const sggs = readParquet

        return this;
    }

    /**
     * Fill the view cache with all cells which are within a geographical envelope.
     * 
     * @param {import("../Dataset").Envelope} extGeo 
     * @returns {void}
     */
    updateViewCache(extGeo) {

        //data not loaded yet
        if (!this.cells) return;

        this.cellsViewCache = []
        for (const cell of this.cells) {
            if (+cell.x + this.resolution < extGeo.xMin) continue;
            if (+cell.x - this.resolution > extGeo.xMax) continue;
            if (+cell.y + this.resolution < extGeo.yMin) continue;
            if (+cell.y - this.resolution > extGeo.yMax) continue;
            this.cellsViewCache.push(cell)
        }
    }
}

/**
 * Retrieve parquet wasm decoder
 */
const getReadParquet = async () => {
    //const parquetModule = await import("https://unpkg.com/parquet-wasm@0.4.0-beta.5/esm/arrow2.js");
    //await parquetModule.default();
    //return parquetModule.readParquet;
}
