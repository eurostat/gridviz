//@ts-check
'use strict'

/** @typedef {{ dims: object, crs: string, tileSizeCell: number, originPoint: {x:number,y:number}, resolutionGeo: number, tilingBounds:import("../core/GeoCanvas.js").Envelope }} GridInfo */

// internal
import { Dataset } from '../core/Dataset.js'
//import { monitor, monitorDuration } from '../utils/Utils.js'

// external
import { json, csv } from 'd3-fetch'

/**
 * A tiled dataset, composed of CSV tiles.
 *
 * @module dataset
 * @author Joseph Davies, Julien Gaffuri
 */
export class TiledGrid extends Dataset {
    /**
     * @param {import("../core/Map.js").Map} map The map.
     * @param {string} url The URL of the dataset.
     * @param {{preprocess?:(function(import("../core/Dataset.js").Cell):boolean), onlyDrawWhenAllTilesReady:boolean}} opts
     */
    constructor(map, url, opts = {}) {
        super(map, url, 0, opts)
        this.onlyDrawWhenAllTilesReady = opts.onlyDrawWhenAllTilesReady || false
        /**
         * The grid info object, from the info.json file.
         *  @type {GridInfo | undefined}
         * @private
         *  */
        this.info = undefined

        /**
         * @type {string}
         * @private  */
        this.infoLoadingStatus = 'notLoaded'

        /**
         * The cache of the loaded tiles. It is double indexed: by xT and then yT.
         * Example: this.cache[xT][yT] returns the tile at [xT][yT] location.
         *
         * @type {object}
         * */
        this.cache = {}

        //launch loading
        this.loadInfo()
    }

    /**
     * Load the info.json from the url.
     * @returns this
     */
    loadInfo() {
        if (!this.info && this.infoLoadingStatus === 'notLoaded') {
            ;(async () => {
                try {
                    const data = await json(this.url + 'info.json')
                    this.info = data
                    this.resolution = data.resolutionGeo
                    this.infoLoadingStatus = 'loaded'
                    this.map.redraw()
                } catch (error) {
                    //mark as failed
                    this.infoLoadingStatus = 'failed'
                }
            })()
        } else if (this.infoLoadingStatus === 'loaded' || this.infoLoadingStatus === 'failed') this.map.redraw()
        return this
    }

    /**
     * Compute a tiling envelope from a geographical envelope.
     * This is the function to use to know which tiles to download for a geographical view.
     *
     * @param {import("../core/GeoCanvas.js").Envelope} e
     * @returns {import("../core/GeoCanvas.js").Envelope|undefined}
     */
    getTilingEnvelope(e) {
        if (!this.info) {
            this.loadInfo()
            return
        }

        const po = this.info.originPoint,
            r = this.info.resolutionGeo,
            s = this.info.tileSizeCell

        return {
            xMin: Math.floor((e.xMin - po.x) / (r * s)),
            xMax: Math.floor((e.xMax - po.x) / (r * s)),
            yMin: Math.floor((e.yMin - po.y) / (r * s)),
            yMax: Math.floor((e.yMax - po.y) / (r * s)),
        }
    }

    /**
     * Request data within a geographic envelope.
     *
     * @param {import('../core/GeoCanvas.js').Envelope} extGeo
     * @returns {this}
     */
    async getData(extGeo) {
        if (!this.info) return this

        // Capture the current zoom level
        const currentZoom = this.map.geoCanvas.view.z
        this.currentZoomLevel = currentZoom

        // Create an AbortController for the current data request
        this.abortController = new AbortController()
        const signal = this.abortController.signal

        // Get the tiling envelope and check bounds
        const tb = this.getTilingEnvelope(extGeo)
        if (!tb) return this

        const { xMin: gbXMin, xMax: gbXMax, yMin: gbYMin, yMax: gbYMax } = this.info.tilingBounds

        const xMin = Math.max(tb.xMin, gbXMin)
        const xMax = Math.min(tb.xMax, gbXMax)
        const yMin = Math.max(tb.yMin, gbYMin)
        const yMax = Math.min(tb.yMax, gbYMax)

        const totalTiles = (xMax - xMin + 1) * (yMax - yMin + 1)
        let processedTiles = 0
        const tilePromises = []

        // Iterate over tiles within bounds
        for (let xT = xMin; xT <= xMax; xT++) {
            for (let yT = yMin; yT <= yMax; yT++) {
                if (!this.cache[xT]) this.cache[xT] = {}

                // Skip already loaded tiles or retry failed ones
                if (this.cache[xT][yT] && this.cache[xT][yT] !== 'failed') {
                    ++processedTiles
                    continue
                }

                // Mark tile as loading
                this.cache[xT][yT] = 'loading'

                tilePromises.push(
                    this.loadTile(xT, yT, currentZoom, signal)
                        .then((tile) => {
                            this.cache[xT][yT] = tile

                            // Check if this is the last tile
                            const isLastTile = ++processedTiles === totalTiles
                            this.checkAndRedraw(tile, isLastTile)
                        })
                        .catch(() => {
                            this.cache[xT][yT] = 'failed'
                            ++processedTiles
                        })
                )
            }
        }

        await Promise.allSettled(tilePromises)
        return this
    }

    /**
     * Load a tile.
     *
     * @param {number} xT
     * @param {number} yT
     * @param {number} requestZoom
     * @param {AbortSignal} signal
     * @returns {Promise<any>}
     */
    async loadTile(xT, yT, requestZoom, signal) {
        try {
            const data = await csv(`${this.url}${xT}/${yT}.csv`, { signal })

            const cells = this.preprocess ? data.filter((cell) => this.preprocess(cell) !== false) : data

            if (!this.info) throw new Error('Tile info unknown')

            return getGridTile(cells, xT, yT, this.info)
        } catch (error) {
            if (error.name === 'AbortError') {
                console.warn(`Tile request for ${xT}, ${yT} was aborted.`)
            }
            throw error
        }
    }

    /**
     * Cancel ongoing data requests when zoom level changes.
     */
    cancelCurrentRequests() {
        if (this.abortController) {
            this.abortController.abort()
        }
    }

    checkAndRedraw(tile, isLastTile) {
        // Check if any visible layer depends on this dataset
        // check if redraw is really needed, that is if:
        // 1. the dataset belongs to a layer which is visible at the current zoom level
        let needsRedraw = false
        //go through the layers
        const z = this.map.getZoom()
        for (const lay of this.map.layers) {
            if (lay.visible && !lay.visible(z)) continue
            if (!lay.getDataset) continue
            if (lay.getDataset(z) != this) continue
            //found one layer. No need to seek more.
            needsRedraw = true
            break
        }

        if (!needsRedraw) return

        // Check if tile intersects the current view
        const env = this.map.updateExtentGeo()
        const { xMin, xMax, yMin, yMax } = tile.extGeo
        if (env.xMax <= xMin || env.xMin >= xMax || env.yMax <= yMin || env.yMin >= yMax) return

        // Trigger redraw
        if (this.onlyDrawWhenAllTilesReady) {
            if (isLastTile) {
                this.map.redraw()
            }
        } else {
            this.map.redraw()
        }
    }

    /**
     * Fill the view cache with all cells which are within a geographical envelope.
     * @abstract
     * @param {import("../core/GeoCanvas.js").Envelope} extGeo
     * @returns {void}
     */
    updateViewCache(extGeo) {
        //
        this.cellsViewCache = []

        //check if info has been loaded
        if (!this.info) return

        //tiles within the scope
        /** @type {import("../core/GeoCanvas.js").Envelope|undefined} */
        const tb = this.getTilingEnvelope(extGeo)
        if (!tb) return

        //grid bounds
        /** @type {import("../core/GeoCanvas.js").Envelope} */
        const gb = this.info.tilingBounds

        for (let xT = Math.max(tb.xMin, gb.xMin); xT <= Math.min(tb.xMax, gb.xMax); xT++) {
            if (!this.cache[xT]) continue
            for (let yT = Math.max(tb.yMin, gb.yMin); yT <= Math.min(tb.yMax, gb.yMax); yT++) {
                //get tile
                /** @type {object} */
                const tile = this.cache[xT][yT]
                if (!tile || typeof tile === 'string') continue

                //get cells
                //this.cellsViewCache = this.cellsViewCache.concat(tile.cells)

                for (const cell of tile.cells) {
                    if (+cell.x + this.resolution < extGeo.xMin) continue
                    if (+cell.x - this.resolution > extGeo.xMax) continue
                    if (+cell.y + this.resolution < extGeo.yMin) continue
                    if (+cell.y - this.resolution > extGeo.yMax) continue
                    this.cellsViewCache.push(cell)
                }
            }
        }
    }
}

function getGridTile(cells, xT, yT, gridInfo) {
    const tile = {}

    /** @type {Array.<import("../core/Dataset").Cell>} */
    tile.cells = cells
    /** @type {number} */
    tile.x = xT
    /** @type {number} */
    tile.y = yT

    const r = gridInfo.resolutionGeo
    const s = gridInfo.tileSizeCell

    /** @type {import("../core/GeoCanvas").Envelope} */
    tile.extGeo = {
        xMin: gridInfo.originPoint.x + r * s * tile.x,
        xMax: gridInfo.originPoint.x + r * s * (tile.x + 1),
        yMin: gridInfo.originPoint.y + r * s * tile.y,
        yMax: gridInfo.originPoint.y + r * s * (tile.y + 1),
    }

    //convert cell coordinates into geographical coordinates
    for (let cell of tile.cells) {
        cell.x = tile.extGeo.xMin + cell.x * r
        cell.y = tile.extGeo.yMin + cell.y * r
    }

    return tile
}
