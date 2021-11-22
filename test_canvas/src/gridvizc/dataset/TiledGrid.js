//@ts-check
/** @typedef {{ dims: object, crs: string, tileSizeCell: number, originPoint: {x:number,y:number}, resolutionGeo: number, tilingBounds:Envelope }} GridInfo */

import { json, csv } from "d3-fetch";
import { GridTile } from './GridTile';
import { Dataset, Cell, Envelope } from "../viewer/Dataset"

/**
 * A dataset composed of tiled CSV files.
 */
 export class TiledGrid extends Dataset {

    /**
     * @param {string} url This url of the info.json.
     */
    constructor(url) {
        super(url, undefined)

        /** 
         * The cache of the loaded tiles. It is double indexed: by xT and then yT.
         * Example: this.cache[xT][yT] returns the tile at [xT][yT] location.
         * @type {Object} */
        this.cache = {}

        /** @type {GridInfo} */
        this.info = undefined;

    }

    /**
     * Load the info.json from the URL.
     * 
     * @param {function} callback
     * @returns this
     */
    loadInfo(callback) {
        if (!this.info)
            json(this.url + "/info.json").then(
                /** @param {*} data */
                (data) => {
                    this.info = data;
                    this.resolutionGeo = this.info.resolutionGeo;
                    if (callback) callback();
                }
            );
        else if (callback) callback();
        return this;
    }


    /**
     * Compute a tiling envelope from a geographical envelope.
     * This is the function to use to know which tiles to download for a geographical view.
     * 
     * @param {Envelope} e 
     * @returns {Envelope}
     */
    getTilingEnvelope(e) {
        const po = this.info.originPoint
        const r = this.info.resolutionGeo
        const s = this.info.tileSizeCell

        return {
            xMin: Math.floor((e.xMin - po.x) / (r * s)),
            xMax: Math.floor((e.xMax - po.x) / (r * s)),
            yMin: Math.floor((e.yMin - po.y) / (r * s)),
            yMax: Math.floor((e.yMax - po.y) / (r * s))
        }
    }

    /**
     * Request data within a geographic envelope.
     * 
     * @param {Envelope} e 
     * @param {function} callback
     * @returns {this}
     */
    getData(e, callback) {

        //TODO empty cache when it becomes too big.

        //tiles within the scope
        /** @type {Envelope} */
        const tb = this.getTilingEnvelope(e);

        //grid bounds
        /** @type {Envelope} */
        const gb = this.info.tilingBounds;

        for (let xT = Math.max(tb.xMin, gb.xMin); xT <= Math.min(tb.xMax, gb.xMax); xT++) {
            for (let yT = Math.max(tb.yMin, gb.yMin); yT <= Math.min(tb.yMax, gb.yMax); yT++) {

                //prepare cache
                if (!this.cache[xT]) this.cache[xT] = {};

                //check if tile exists in the cache
                /** @type {GridTile} */
                let tile = this.cache[xT][yT];
                if (tile) continue;

                //mark tile as loading
                this.cache[xT][yT] = "loading"

                //request tile
                csv(this.url + xT + "/" + yT + ".csv")
                    .then(
                        /** @param {*} data */
                        (data) => {
                            //store tile in cache
                            this.cache[xT][yT] = new GridTile(data, xT, yT, this.info);

                            //execute the callback, usually a draw function
                            callback()
                        })
                    .catch(() => {
                        //mark as failed
                        this.cache[xT][yT] = "failed"
                    });
            }
        }
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

        //tiles within the scope
        /** @type {Envelope} */
        const tb = this.getTilingEnvelope(e);

        //grid bounds
        /** @type {Envelope} */
        const gb = this.info.tilingBounds;

        for (let xT = Math.max(tb.xMin, gb.xMin); xT <= Math.min(tb.xMax, gb.xMax); xT++) {
            if (!this.cache[xT]) continue;
            for (let yT = Math.max(tb.yMin, gb.yMin); yT <= Math.min(tb.yMax, gb.yMax); yT++) {

                //get tile
                /** @type {GridTile} */
                const tile = this.cache[xT][yT];
                if (!tile || typeof tile === "string") continue;

                //get cells
                cells = cells.concat(tile.cells)
            }
        }

        return cells;
    }

}
