//@ts-check
'use strict'

import { Interpolator } from './Interpolator.js'
import { cellsToMatrix } from '../utils/utils.js'

/**
 * A style which makes a finer grid from a grid of categories (a land cover for example), and draws it with other styles.
 * It does not draw anything by itself.
 *
 * A category has no value between categories to interpolate, as a number has. This style uses the random walk interpolator
 * described in "Spatial interpolators in Observable Plot" (VISU 2023): each cell of the finer grid is given the category
 * of the first cell of the original grid which a random walk, starting from it, reaches. The cells of the original grid are
 * taken as points at their centre. A cell of the finer grid is then most often given the category of its closest neighbours,
 * and the limits between the categories become irregular, with fine details, instead of squares.
 *
 * The random walks are drawn from the position of the cell, so that the result does not change when the map is panned,
 * or drawn again.
 *
 * @example
 * const interpolator = new gridviz.RandomWalkInterpolator({ value: (c) => c.clc, targetResolution: (r, z) => r / 5, interpolatedProperty: 'clc' })
 * interpolator.styles.push(new gridviz.SquareColorCategoryWebGLStyle({ code: (c) => c.clc, color: colors }))
 *
 * @module style
 */
export class RandomWalkInterpolator extends Interpolator {
    /** @param {object} opts The options of the style (see Style for the others: filter, visible...).
     * @param {function(import('../core/Dataset.js').Cell):(string|number|undefined)} opts.value The category of a cell. A cell without category (undefined) is not interpolated.
     * @param {function(number, number):number} [opts.targetResolution] (resolution, z) => the resolution of the interpolated cells. The ratio between the resolution and this one is rounded to an integer. Default: resolution / 5.
     * @param {string} [opts.interpolatedProperty] The property of the interpolated cells which holds their category. Default: 'value'.
     * @param {function(number):number} [opts.maxSteps] (factor) => the maximum number of steps of a random walk, from the ratio between the resolutions. A walk which has not reached a cell of the original grid then gives its cell the category of the cell it is in. Default: 6 * factor * factor.
     * @param {number} [opts.seed] A number to change the random walks, and thus the result. Default: 0.
     * @param {Array.<import('../core/Style.js').Style>} [opts.styles] The styles which draw the interpolated cells.
     */
    constructor(opts) {
        super(opts)
        opts = opts || {}

        /** The category of a cell.
         * @type {function(import('../core/Dataset.js').Cell):(string|number|undefined)} */
        this.value = opts.value

        /** The maximum number of steps of a random walk, as a function of the ratio between the resolutions.
         * @type {function(number):number} */
        this.maxSteps = opts.maxSteps || ((factor) => 6 * factor * factor)

        /** A number to change the random walks.
         * @type {number} */
        this.seed = opts.seed || 0
    }

    /**
     * @param {Array.<import("../core/Dataset.js").Cell>} cells
     * @param {import("../core/GeoCanvas.js").GeoCanvas} geoCanvas
     * @param {number} resolution
     * @override
     */
    draw(cells, geoCanvas, resolution) {
        //filter cells
        if (this.filter) cells = cells.filter(this.filter)
        if (cells.length == 0) return

        const z = geoCanvas.view.z

        //get target resolution and scale factor
        let targetResolution = this.targetResolution(resolution, z)
        const factor = Math.max(1, Math.round(resolution / targetResolution))
        targetResolution = resolution / factor

        //the categories of the cells, in a matrix: the lines go from the top to the bottom
        const m = cellsToMatrix(cells, resolution, (c) => this.value(c))
        const x0 = m.x0,
            y0 = m.y0

        //the categories as numbers, for speed
        /** @type {Array.<string|number>} */
        const categories = []
        const index = new Map()
        const rows = m.length,
            cols = rows ? m[0].length : 0
        const codes = new Int32Array(rows * cols).fill(-1)
        for (let i = 0; i < rows; i++)
            for (let j = 0; j < cols; j++) {
                const v = m[i][j]
                if (v === undefined || v === null) continue
                let k = index.get(v)
                if (k === undefined) {
                    k = categories.length
                    categories.push(v)
                    index.set(v, k)
                }
                codes[i * cols + j] = k
            }

        //the position of the first fine cell in the grid of all the fine cells of the map: the random walks depend on it only
        const offsetI = -Math.round(y0 / targetResolution) - factor
        const offsetJ = Math.round(x0 / targetResolution)

        const fine = randomWalkInterpolate(codes, rows, cols, factor, {
            maxSteps: this.maxSteps(factor),
            seed: this.seed,
            offsetI: offsetI,
            offsetJ: offsetJ,
        })

        //make the cells
        const out = []
        const fineCols = cols * factor
        const r = targetResolution
        for (let I = 0; I < rows * factor; I++) {
            const y = y0 + resolution - (I + 1) * r
            for (let J = 0; J < fineCols; J++) {
                const k = fine[I * fineCols + J]
                if (k < 0) continue
                const c = { x: x0 + J * r, y: y }
                c[this.interpolatedProperty] = categories[k]
                out.push(c)
            }
        }

        //draw the interpolated cells with the styles
        this.drawStyles(out, geoCanvas, targetResolution)
    }
}

/**
 * The random walk interpolation of a grid of categories to a grid `factor` times finer.
 *
 * The cell (i,j) of the grid is a point at the centre of its factor x factor fine cells. The category of a fine cell
 * is the one of the first point reached by a random walk which starts on it and moves to a neighbour fine cell
 * (up, down, left or right) at each step. A walk which has not reached a point after maxSteps steps, or which leaves the
 * grid, is ended: the fine cell gets the category of the cell of the grid it is in. The fine cells of the cells without
 * category get no category.
 *
 * The walks are deterministic: they come from the position of the fine cell in the grid of the map, and a seed.
 *
 * @param {Int32Array|Array.<number>} codes The categories of the cells of the grid, as numbers (0, 1, 2...), -1 for no category. Line by line (rows * cols values).
 * @param {number} rows The number of lines
 * @param {number} cols The number of columns
 * @param {number} factor The number of fine cells for a cell, in each direction.
 * @param {{maxSteps?:number, seed?:number, offsetI?:number, offsetJ?:number}} [opts] maxSteps: the maximum number of steps of a walk (default: 6*factor*factor). seed. offsetI and offsetJ: the position of the first fine cell in a larger grid, so that the same fine cell has the same walk in different extents (default: 0).
 * @returns {Int32Array} The categories of the fine cells, line by line (rows * factor lines of cols * factor values), -1 for no category.
 */
export function randomWalkInterpolate(codes, rows, cols, factor, opts = {}) {
    const maxSteps = opts.maxSteps === undefined ? 6 * factor * factor : opts.maxSteps
    const seed = (opts.seed || 0) | 0
    const offsetI = opts.offsetI || 0
    const offsetJ = opts.offsetJ || 0

    const fineRows = rows * factor,
        fineCols = cols * factor
    const out = new Int32Array(fineRows * fineCols).fill(-1)

    // the point of a cell is the fine cell h cells from its top left corner
    const h = Math.floor(factor / 2)

    for (let I = 0; I < fineRows; I++) {
        const i = Math.floor(I / factor)
        for (let J = 0; J < fineCols; J++) {
            const j = Math.floor(J / factor)
            const own = codes[i * cols + j]
            //no category here
            if (own < 0) continue

            //a random generator for this fine cell
            let rnd = hash(I + offsetI, J + offsetJ, seed)

            let a = I,
                b = J,
                found = -1
            for (let step = 0; ; step++) {
                //the fine cell is the point of a cell of the grid?
                if (a % factor === h && b % factor === h) {
                    const c = codes[Math.floor(a / factor) * cols + Math.floor(b / factor)]
                    if (c >= 0) {
                        found = c
                        break
                    }
                }
                if (step >= maxSteps) break
                //next step, to a neighbour: xorshift32
                rnd ^= rnd << 13
                rnd ^= rnd >>> 17
                rnd ^= rnd << 5
                const dir = (rnd >>> 0) & 3
                if (dir === 0) a--
                else if (dir === 1) a++
                else if (dir === 2) b--
                else b++
                //out of the grid: the walk is ended
                if (a < 0 || a >= fineRows || b < 0 || b >= fineCols) break
            }
            out[I * fineCols + J] = found >= 0 ? found : own
        }
    }
    return out
}

/**
 * A 32 bits number from two integers and a seed, never 0.
 * @param {number} a
 * @param {number} b
 * @param {number} seed
 * @returns {number}
 */
function hash(a, b, seed) {
    let h = (Math.imul(a | 0, 73856093) ^ Math.imul(b | 0, 19349663) ^ Math.imul(seed, 83492791)) | 0
    //mix the bits
    h = Math.imul(h ^ (h >>> 16), 2246822507)
    h = Math.imul(h ^ (h >>> 13), 3266489909)
    h ^= h >>> 16
    return h === 0 ? 1 : h
}
