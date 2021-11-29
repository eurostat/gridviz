//@ts-check
/** @typedef {{ dims: object, crs: string, tileSizeCell: number, originPoint: {x:number,y:number}, resolutionGeo: number, tilingBounds:Envelope }} GridInfo */

import { json, csv } from "d3-fetch";
import { GridTile } from './GridTile';
import { App } from '../App';
import { Dataset, Cell, Envelope } from "../Dataset"

/**
 * A tiled dataset, composed of CSV tiles.
 * 
 * @author Julien Gaffuri
 */
export class TiledGrid extends Dataset {

    /**
     * @param {string} url The url of the dataset info.json file.
     * @param {App} app The app.
     * @param {function(Cell):void} preprocess A preprocess to run on each cell after loading. It can be used to apply some specific treatment before or compute a new column.
     */
    constructor(url, app, preprocess = null) {
        super(url, undefined, preprocess)

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
     * @param {function():void} callback
     * @returns this
     */
    loadInfo(callback) {
        if (!this.info)
            json(this.url + "/info.json").then(
                /** @param {*} data */
                (data) => {
                    this.info = data;
                    this.resolution = this.info.resolutionGeo;
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
     * @param {Envelope} extGeo 
     * @param {function():void} redrawFun
     * @returns {this}
     */
    getData(extGeo, redrawFun) {

        //TODO empty cache when it gets too big ?

        //check if info has been loaded
        if(!this.info) return;

        //tiles within the scope
        /** @type {Envelope} */
        const tb = this.getTilingEnvelope(extGeo);

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
                            const tile_ = new GridTile(data, xT, yT, this.info);
                            this.cache[xT][yT] = tile_;

                            //execute preprocess, if any
                            if (this.preprocess)
                                for (const c of tile_.cells)
                                    this.preprocess(c);

                            //check if redraw is needed, that is:
                            // 1. if the dataset belongs to a layer which is visible at the current zoom level
                            // and 2. the tile is within the view


                            //execute the callback, usually a draw function
                            if (tile_.needToLaunchRedraw() && redrawFun)
                                redrawFun()
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
     * @param {Envelope} extGeo 
     * @returns {Array.<Cell>}
     */
    getCells(extGeo) {

        /** @type {Array.<Cell>} */
        let cells = []

        //check if info has been loaded
        if(!this.info) return cells;

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
    }

}
