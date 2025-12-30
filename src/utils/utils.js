//@ts-check
'use strict'

import { min, max, extent } from 'd3-array'

/**
 * Get the class id from a value and class break values
 *
 * @param {number} v the value
 * @param {Array.<number>} breaks the breaks
 * @returns The class id, from 0 to breaks.length
 * @deprecated use getClassifier instead.
 */
export function getClass(v, breaks) {
    if (!breaks) return
    if (breaks.length == 0) return 0
    if (v <= breaks[0]) return 0
    for (let i = 1; i < breaks.length; i++) if (breaks[i - 1] < v && v <= breaks[i]) return i
    return breaks.length
}

//take 'nice' value (power of ten, or multiple)
export function nice(v, multiples = [8, 6, 5, 4, 2.5, 2]) {
    //compute bigger power of ten below
    const v_ = Math.pow(10, Math.floor(Math.log10(v)))
    for (let multiple of multiples) if (v_ * multiple <= v) return v_ * multiple
    return v_
}

/**
 * A grid cell.
 * @typedef {{x: number, y: number}} Cell */

/**
 * Index cells by y and x
 * @param {Array.<Cell>} cells
 * @param {Function} [fun]
 * @returns {Object}
 */
export function cellsToGrid(cells, fun) {
    /** @type {Object} */
    const ind = {}
    for (const cell of cells) {
        let row = ind[cell.y]
        if (!row) {
            row = {}
            ind[cell.y] = row
        }
        row[cell.x] = fun ? fun(cell) : cell
    }
    return ind
}



/**
 * Cells to grid.
 * 
 * @param {Array.<Cell>} cells
 * @param {number} resolution
 * @param {Function} [fun]
 * @returns {Object}
 * Grid[i][j] is the value for line i and column j.
 * Numbered from top to bottom, from left to right.
 * Properties x0 and y0 are the geo coordinates of the lower left corner of the top left cell.
 * Properties minI, maxI, minJ, maxJ are the extent of the grid.
 */
export function cellsToMatrix(cells, resolution, fun) {

    // get cells extent
    const [minx, maxx] = extent(cells, c => c.x)
    const [miny, maxy] = extent(cells, c => c.y)

    // get grid dimension
    const rows = Math.ceil((maxy - miny) / resolution) +1
    const cols = Math.ceil((maxx - minx) / resolution) +1

    // make empty grid
    const grid = Array.from({ length: rows }, () =>
        new Array(cols).fill(undefined)
    );
    grid.x0 = minx
    grid.y0 = maxy
    grid.resolution = resolution

    for (const c of cells) {
        const i = Math.floor((maxy - c.y) / resolution)
        const j = Math.floor((c.x - minx) / resolution)
        const v = fun ? fun(c) : c
        /*if (grid.minI == undefined || i < grid.minI) grid.minI = i
        if (grid.maxI == undefined || i > grid.maxI) grid.maxI = i
        if (grid.minJ == undefined || j < grid.minJ) grid.minJ = j
        if (grid.maxJ == undefined || j > grid.maxJ) grid.maxJ = j*/
        //console.log(i,rows,j,cols,v)
        grid[i][j] = v
    }
    return grid
}



/*
//no longer used
export function loadImage(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = function () { resolve(img); };
        img.onerror = function () { reject(new Error('Error loading image')); };
        img.src = src;
    });
}
*/

/*
export let monitor = false

let previousDate
export function monitorDuration(message) {
    const nowDate = Date.now()

    //first call
    if (!previousDate) {
        previousDate = nowDate
        console.log(previousDate, message)
        return
    }

    const d = nowDate - previousDate
    previousDate = nowDate
    console.log(d, message)
}
*/
