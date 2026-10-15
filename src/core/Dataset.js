//@ts-check
'use strict'

/**
 * A grid cell.
 * @typedef {{x: number, y: number}} Cell */

/**
 * A dataset component, of grid cells.
 * @abstract
 *
 * @module core
 * @author Joseph Davies, Julien Gaffuri
 */
export class Dataset {
    /**
     * @param {import("./Map.js").Map} map The map.
     * @param {string} url The URL of the dataset.
     * @param {number} resolution The dataset resolution, in the CRS geographical unit.
     * @param {{preprocess?:function(Cell):boolean, mixedResolution?:function(Cell):number}} opts
     * @abstract
     */
    constructor(map, url, resolution, opts = {}) {
        /**
         * The map.
         * @protected
         * @type {import("./Map.js").Map} */
        this.map = map

        /**
         * The url of the dataset.
         * @protected
         * @type {string} */
        this.url = url

        /**
         * The dataset resolution in geographical unit.
         * @protected
         * @type {number} */
        this.resolution = resolution

        /**
         * In case the dataset is a dataset with cells having different resolution,
         * this is the function returning the resolution of each cell.
         * @protected
         * @type {(function(Cell):number )| undefined } */
        this.mixedResolution = opts.mixedResolution

        /**
         * A preprocess to run on each cell after loading. It can be used to apply some specific treatment before or compute a new column. And also to determine which cells to keep after loading.
         * @type {(function(Cell):boolean )| undefined } */
        this.preprocess = opts.preprocess || undefined

        /** The cells within the view
         * @protected
         * @type {Array.<Cell>} */
        this.cellsViewCache = []
    }

    /**
     * Request data within a geographic envelope.
     *
     * @abstract
     * @param {import("./GeoCanvas").Envelope|undefined} extGeo
     * @returns {this}
     */
    getData(extGeo = undefined) {
        throw new Error('Method getData not implemented.')
    }

    /**
     * Fill the view cache with all cells which are within a geographical envelope.
     * @abstract
     * @param {import("./GeoCanvas").Envelope} extGeo The view geographical envelope.
     * @returns {void}
     */
    updateViewCache(extGeo) {
        throw new Error('Method updateViewCache not implemented.')
    }

    /**
     * Get a cell under a given position, if any.
     *
     * @param {{x:number,y:number}} posGeo
     * @param {Array.<Cell>} cells Some cells from the dataset (a subset if necessary, usually the view cache).
     * @returns {Cell|undefined}
     */
    getCellFromPosition(posGeo, cells) {
        //compute candidate cell position
        /** @type {number} */
        //const r = this.getResolution()
        /** @type {number} */
        //const cellX = r * Math.floor(posGeo.x / r)
        /** @type {number} */
        //const cellY = r * Math.floor(posGeo.y / r)

        /*/get cell
        for (const cell of cells) {
            if (cell.x != cellX) continue
            if (cell.y != cellY) continue
            return cell
        }
        return undefined*/

        //rare case of mixed resolution dataset
        if (this.mixedResolution) {
            for (const c of cells) {
                /** @type {number} */
                const r = +this.mixedResolution(c)
                if (posGeo.x < c.x) continue
                else if (c.x + r < posGeo.x) continue
                else if (posGeo.y < c.y) continue
                else if (c.y + r < posGeo.y) continue
                else return c
            }
            return undefined
        }

        //common case

        /** @type {number} */
        const r = this.getResolution()

        // Look the cell up in an index of the cells by grid position, built once per cell
        // list (the view cache is a new array after each redraw) instead of scanning every
        // cell on every mouse move.
        const index = this.cellIndex(cells, r)
        if (index) {
            const fx = (posGeo.x - index.ox) / r
            const fy = (posGeo.y - index.oy) / r
            const ix = Math.floor(fx)
            const iy = Math.floor(fy)
            // a position on a cell's right/top edge also belongs to that cell (inclusive
            // bounds, as in the scan below): check the cells left of and below it too
            for (const [dx, dy] of [
                [0, 0],
                [-1, 0],
                [0, -1],
                [-1, -1],
            ]) {
                if (dx && fx !== ix) continue
                if (dy && fy !== iy) continue
                const cell = index.cells.get(cellKey(ix + dx, iy + dy))
                if (cell) return cell
            }
            return undefined
        }

        for (const cell of cells) {
            if (posGeo.x < cell.x) continue
            else if (cell.x + r < posGeo.x) continue
            else if (posGeo.y < cell.y) continue
            else if (cell.y + r < posGeo.y) continue
            else return cell
        }
        return undefined
    }

    /**
     * An index of cells by their position on the grid of resolution r, or null when some
     * cell isn't on a common grid (then the caller scans the cells). Cached for the last
     * cell list given.
     *
     * @param {Array.<Cell>} cells
     * @param {number} r
     * @returns {{cells: Map<number, Cell>, ox: number, oy: number} | null}
     * @protected
     */
    cellIndex(cells, r) {
        if (this._index && this._indexCells === cells && this._indexLength === cells.length && this._indexR === r) return this._index
        let index = null
        if (cells.length && r > 0) {
            const ox = +cells[0].x
            const oy = +cells[0].y
            const map = new Map()
            index = { cells: map, ox, oy }
            for (const cell of cells) {
                const fx = (+cell.x - ox) / r
                const fy = (+cell.y - oy) / r
                const ix = Math.round(fx)
                const iy = Math.round(fy)
                // not on the grid: no index, scan instead
                if (Math.abs(fx - ix) > 1e-6 || Math.abs(fy - iy) > 1e-6) {
                    index = null
                    break
                }
                const key = cellKey(ix, iy)
                // the first cell at a position wins, as in the scan
                if (!map.has(key)) map.set(key, cell)
            }
        }
        this._index = index
        this._indexCells = cells
        this._indexLength = cells.length
        this._indexR = r
        return index
    }

    //getters and setters

    /** @returns {number} */
    getResolution() {
        return this.resolution
    }

    /** @returns {Array.<Cell>} */
    getViewCache() {
        return this.cellsViewCache
    }

    /**
     * Return the relevant dataset for a specified zoom.
     * @param {number} z
     * @param {number} minPixelsPerCell
     * @returns {Dataset|undefined}
     * */
    getDataset(z, minPixelsPerCell) {
        return this
    }
}

/**
 * One number per grid position: cell positions relative to the first cell stay well
 * within +-2^21, so x * 2^22 + y is exact.
 * @param {number} ix
 * @param {number} iy
 * @returns {number}
 */
function cellKey(ix, iy) {
    return ix * 4194304 + iy
}
