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
     * @param {string} url The URL of the dataset.
     * @param {App} app The application.
     * @param {object} opts 
     */
    constructor(url, app, opts) {
        super(url, null, opts)

        /**
         * The app being used.
         * @type {App}
         */
        this.app = app;

        /**
         * The grid info object, from the info.json file.
         *  @type {GridInfo}
         * @private
         *  */
        this.info = undefined;

        /**  @type {string} @private  */
        this.infoLoadingStatus = "notLoaded";

        /** 
        * The cache of the loaded tiles. It is double indexed: by xT and then yT.
        * Example: this.cache[xT][yT] returns the tile at [xT][yT] location.
        * 
        * @type {object}
        * */
        this.cache = {}
    }

    /**
     * Load the info.json from the url.
     * 
     * @param {function():void} callback
     * @returns this
     */
    loadInfo(callback) {

        if (!this.info && this.infoLoadingStatus === "notLoaded") {
            this.infoLoadingStatus = "loading"
            json(this.url + "info.json")
                .then(
                    /** @param {*} data */
                    (data) => {
                        this.info = data;
                        this.resolution = data.resolutionGeo;
                        this.infoLoadingStatus = "loaded"
                        if (callback) callback();
                    }
                )
                .catch(() => {
                    //mark as failed
                    this.infoLoadingStatus = "failed"
                });
        }
        else if (callback && (this.infoLoadingStatus === "loaded" || this.infoLoadingStatus === "failed"))
            callback();
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
        const po = this.info.originPoint,
            r = this.info.resolutionGeo,
            s = this.info.tileSizeCell;

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
        if (!this.info) return;

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


                            //if no redraw is specified, then leave
                            if (!redrawFun) return;

                            //check if redraw is really needed, that is if:

                            // 1. the dataset belongs to a layer which is visible at the current zoom level
                            let redraw = false;
                            for (const layer of this.app.getActiveLayers()) {
                                if (layer.dataset != this) continue;
                                //found one layer. No need to seek more.
                                redraw = true;
                                break;
                            }
                            if (!redraw) return;

                            // 2. the tile is within the view, that is its geo envelope intersects the viewer geo envelope.
                            const env = this.app.updateExtentGeo();
                            const envT = tile_.extGeo;
                            if (env.xMax <= envT.xMin) return;
                            if (env.xMin >= envT.xMax) return;
                            if (env.yMax <= envT.yMin) return;
                            if (env.yMin >= envT.yMax) return;

                            //redraw
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
     * Fill the view cache with all cells which are within a geographical envelope.
     * @abstract
     * @param {Envelope} extGeo 
     * @returns {void}
     */
    updateViewCache(extGeo) {

        //
        this.cellsViewCache = []

        //check if info has been loaded
        if (!this.info) return;

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
                //this.cellsViewCache = this.cellsViewCache.concat(tile.cells)

                for (const cell of tile.cells) {
                    if (+cell.x + this.resolution < extGeo.xMin) continue;
                    if (+cell.x - this.resolution > extGeo.xMax) continue;
                    if (+cell.y + this.resolution < extGeo.yMin) continue;
                    if (+cell.y - this.resolution > extGeo.yMax) continue;
                    this.cellsViewCache.push(cell)
                }
            }
        }
    }

}
