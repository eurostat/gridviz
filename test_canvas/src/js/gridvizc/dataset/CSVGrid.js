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
     * @param {number} resolution The dataset resolution in geographical unit.
     * @param {object} opts 
     */
    constructor(url, resolution, opts = undefined) {
        super(url, resolution, opts)

        /** @private @type {Array.<Cell>} */
        this.cells = [];

        /**  @type {string} @private  */
        this.infoLoadingStatus = "notLoaded";
    }


    /**
     * Request data within a geographic envelope.
     * 
     * @param {Envelope|undefined} e 
     * @param {function():void} redraw 
     */
    getData(e, redraw) {

        //check if data already loaded
        if (this.infoLoadingStatus != "notLoaded") return this;

        //load data
        this.infoLoadingStatus = "loading";
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

                    this.infoLoadingStatus = "loaded";
                })
            .catch(() => {
                //mark as failed
                this.infoLoadingStatus = "failed";
                this.cells = []
            });

        return this;
    }

    /**
     * Fill the view cache with all cells which are within a geographical envelope.
     * @abstract
     * @param {Envelope} extGeo 
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
