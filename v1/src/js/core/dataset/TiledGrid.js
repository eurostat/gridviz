//@ts-check
/** @typedef {{ dims: object, crs: string, tileSizeCell: number, originPoint: {x:number,y:number}, resolutionGeo: number, tilingBounds:Envelope }} GridInfo */
/** @typedef {{ url: String, resolution: Number, preprocess: Function, styles: Array<Style>, minZoom: Number, maxZoom: Number }} TiledGridConfig */

import { json, csv } from "d3-fetch";
import { GridTile } from './GridTile';
import { Dataset, Cell, Envelope } from "../Dataset"
import { Style } from '../Style';

/**
 * A tiled dataset, composed of CSV tiles.
 * 
 * @author Joseph Davies, Julien Gaffuri
 */
export class TiledGrid extends Dataset {

    /**
     * @param {TiledGridConfig} opts 
     */
    constructor(opts) {
        super(opts.url, undefined, opts.preprocess)

        /** 
         * The cache of the loaded tiles. It is double indexed: by xT and then yT.
         * Example: this.cache[xT][yT] returns the tile at [xT][yT] location.
         * 
         * @type {Object}
         * */
        this.cache = {}

        /**
         * The grid info object, from the info.json file.
         * 
         *  @type {GridInfo}
         *  */
        this.info = undefined;

    }

    /**
     * Load the info.json from the url.
     * 
     * @param {function} callback
     * @param {function} errorCallback
     * @returns this
     */
    loadInfo(callback, errorCallback) {
        if (!this.info)
            json(this.url + "/info.json").then(
                /** @param {*} data */
                (data) => {
                    this.info = data;
                    this.resolution = this.info.resolutionGeo;
                    if (callback) callback(this);
                }
            ).catch(() => {
                //execute the error callback
                if (errorCallback) errorCallback("request failed");
            });
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
        if (this.info) {
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
    }

    /**
     * Request data within a geographic envelope.
     * 
     * @param {Envelope} e 
     * @param {function} callback
     * @param {Function} errorCallback 
     * @returns {this}
     */
    getData(e, callback, errorCallback) {

        //TODO empty cache when it becomes too big.

        //tiles within the scope
        /** @type {Envelope} */
        const tb = this.getTilingEnvelope(e);

        //grid bounds
        /** @type {Envelope} */
        const gb = this.info.tilingBounds;

        let requests = 0; // count requests

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
                requests++;
                csv(this.url + xT + "/" + yT + ".csv")
                    .then(
                        /** @param {*} data */
                        (data) => {
                            //store tile in cache
                            const tile_ = new GridTile(data, xT, yT, this.info);
                            this.cache[xT][yT] = tile_;

                            //execute preprocess, if any
                            if (this.preprocess) for (const c of tile_.cells) this.preprocess(c);

                            //execute the callback, usually a draw function. Send how many requests were made
                            if (callback) callback(requests)
                        })
                    .catch(() => {
                        //mark as failed
                        this.cache[xT][yT] = "failed"
                        //execute the error callback
                        if (errorCallback) errorCallback("request failed")
                    });
            }
        }

        if (requests == 0 && errorCallback) errorCallback("no tiles requested") // not necessarily an error? but need to execute callback to stop loading spinner
        return this;
    }


    /**
     * Get all cells from cache which are within a geographical envelope.
     * 
     * @param {Envelope} extGeo 
     * @returns {Array.<Cell>}
     */
    getCells(extGeo) {
        if (this.info) {

            /** @type {Array.<Cell>} */
            let cells = []

            //tiles within the scope
            /** @type {Envelope} */
            const tb = this.getTilingEnvelope(extGeo);

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
        } else { return []; }
    }
}
