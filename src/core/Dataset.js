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
     * Get the cell nearest to a position, from the middle of the cell, if one is within a distance. For cells drawn bigger than they are, such as points on a fine grid.
     *
     * @param {{x:number,y:number}} posGeo
     * @param {Array.<Cell>} cells Some cells from the dataset (a subset if necessary, usually the view cache).
     * @param {number} reach The distance, in geographic units.
     * @returns {Cell|undefined}
     */
    getNearestCellFromPosition(posGeo, cells, reach) {
        if (!cells || !cells.length) return undefined
        const r = this.getResolution()
        let best
        let bestDistance = Infinity
        const consider = (c) => {
            const d = Math.hypot(+c.x + r / 2 - posGeo.x, +c.y + r / 2 - posGeo.y)
            if (d <= reach && d < bestDistance) {
                best = c
                bestDistance = d
            }
        }
        const index = this.cellIndex(cells, r)
        if (index) {
            const span = Math.ceil(reach / r) + 1
            const ix = Math.floor((posGeo.x - index.ox) / r)
            const iy = Math.floor((posGeo.y - index.oy) / r)
            for (let dx = -span; dx <= span; dx++)
                for (let dy = -span; dy <= span; dy++) {
                    const c = index.cells.get(cellKey(ix + dx, iy + dy))
                    if (c) consider(c)
                }
        } else cells.forEach(consider)
        return best
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

        // A tiled dataset, for the view: from the tile the position is in, with an index made once per tile. An index of the
        // view cache would be made again after each redraw, for the first mouse move, which is too long on a dense view.
        const inTile = this.cache && this.info && cells === this.getViewCache() ? this._cellFromTiles(posGeo) : false
        if (inTile !== false) return inTile

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
     * The cell at a position, from the indexes of the tiles.
     *
     * @param {{x:number,y:number}} posGeo
     * @returns {Cell|undefined|false} false when the cells of a tile are not on the grid (the caller has to search them)
     * @private
     */
    _cellFromTiles(posGeo) {
        const { originPoint: po, resolutionGeo: r, tileSizeCell: s } = this.info
        const fx = (posGeo.x - po.x) / r
        const fy = (posGeo.y - po.y) / r
        const ix = Math.floor(fx)
        const iy = Math.floor(fy)
        // a position on a cell's right/top edge also belongs to that cell (inclusive bounds): check the cells left of and
        // below it too, which can be in another tile
        for (const [dx, dy] of [
            [0, 0],
            [-1, 0],
            [0, -1],
            [-1, -1],
        ]) {
            if (dx && fx !== ix) continue
            if (dy && fy !== iy) continue
            const column = this.cache[Math.floor((ix + dx) / s)]
            const tile = column && column[Math.floor((iy + dy) / s)]
            if (!tile || !tile.cells) continue
            const index = this._tileCellIndex(tile, r)
            if (!index) return false
            const cell = index.get(cellKey(ix + dx, iy + dy))
            if (cell) return cell
        }
        return undefined
    }

    /**
     * An index of the cells of a tile by their position on the grid from the origin of the tiling, or null when some cell
     * isn't on it. Made once, the first time the pointer is over the tile.
     *
     * @param {{cells:Array.<Cell>, cellIndex?:Map<number, Cell>|null}} tile
     * @param {number} r
     * @returns {Map<number, Cell>|null}
     * @private
     */
    _tileCellIndex(tile, r) {
        if (tile.cellIndex !== undefined) return tile.cellIndex
        const po = this.info.originPoint
        const index = new Map()
        for (const cell of tile.cells) {
            const fx = (+cell.x - po.x) / r
            const fy = (+cell.y - po.y) / r
            const ix = Math.round(fx)
            const iy = Math.round(fy)
            if (Math.abs(fx - ix) > 1e-6 || Math.abs(fy - iy) > 1e-6) {
                tile.cellIndex = null
                return null
            }
            const key = cellKey(ix, iy)
            // the first cell at a position wins, as in a search
            if (!index.has(key)) index.set(key, cell)
        }
        tile.cellIndex = index
        return index
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
        if (this._index && this._indexCells === cells && this._indexLength === cells.length && this._indexR === r)
            return this._index
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
