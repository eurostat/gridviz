//@ts-check
'use strict'

import { Style } from '../core/Style.js'
import { cellsToMatrix } from '../utils/utils.js'

/**
 * @module style
 * @author Julien Gaffuri
 */
export class Interpolator extends Style {
    /** @param {object} opts */
    constructor(opts) {
        super(opts)
        opts = opts || {}

        /** The cell value to interpolate
         * @type { function } } */
        this.value = opts.value //(c) => elevation

        /** The target resolution. As a function (resolution, z) => targetResolution
         * NB: Try to make sure that resolution/targetResolution is an integer.
         * @type { function } } */
        this.targetResolution = opts.targetResolution || ((r, z) => r / 5)

        /** the property name to store the interpolated value in the cell
         * @type { string } } */
        this.interpolatedProperty = opts.interpolatedProperty || 'value'

        // the interpolation method: currently only 'bilinear' is supported
        //this.method = opts.method || 'bilinear' // 'nearest', 'bilinear'

        /** The styles to represent the interpolated grid.
         * @type {Array.<Style>} */
        this.styles = opts.styles || []
    }


    /**
     *
     * @param {Array.<import("../core/Dataset.js").Cell>} cells
     * @param {import("../core/GeoCanvas.js").GeoCanvas} geoCanvas
     * @param {number} resolution
     */
    draw(cells, geoCanvas, resolution) {

        //filter cells
        if (this.filter) cells = cells.filter(this.filter)
        if (cells.length == 0) return;

        //
        const z = geoCanvas.view.z

        //get view scale
        //const viewScale = this.viewScale ? this.viewScale(cells, resolution, z) : undefined

        //index cells by y and x
        let m = cellsToMatrix(cells, resolution, c => this.value(c))
        const x0 = m.x0, y0 = m.y0

        //get target resolution and scale factor
        let targetResolution = this.targetResolution(resolution, z)
        const scaleFactor = Math.round(resolution / targetResolution)
        targetResolution = resolution / scaleFactor

        // compute ray casting shadow
        m = bilinearInterpolator(m, scaleFactor);

        // make cells
        cells = []
        const ra = (resolution - targetResolution) / 2
        for (let i = 0; i < m.length; i++) {
            const row = m[i]
            const y = y0 - i * targetResolution + ra
            for (let j = 0; j < row.length; j++) {
                const v = row[j]
                if (!v) continue
                const c = { x: x0 + j * targetResolution + ra, y: y }
                c[this.interpolatedProperty] = v
                cells.push(c)
            }
        }

        //draw smoothed cells from styles
        const ctx = geoCanvas.offscreenCtx
        for (let s of this.styles) {

            //check if style is visible
            if (s.visible && !s.visible(z)) continue

            //set style alpha and blend mode
            //TODO: multiply by layer alpha ?
            if (s.alpha || s.blendOperation) {
                ctx.save()
                if (s.alpha) ctx.globalAlpha = s.alpha(z)
                if (s.blendOperation) ctx.globalCompositeOperation = s.blendOperation(z)
            }

            //set affin transform to draw with geographical coordinates
            geoCanvas.setCanvasTransform()

            //draw with style
            s.draw(cells, geoCanvas, targetResolution)

            //draw style filter
            if (s.filterColor) s.drawFilter(geoCanvas)

            //restore ctx
            if (s.alpha || s.blendOperation) ctx.restore()
        }

    }
}


const interp = (topLeft, topRight, bottomLeft, bottomRight, xRatio, yRatio) => {
    const top = topLeft + (topRight - topLeft) * xRatio;
    const bottom = bottomLeft + (bottomRight - bottomLeft) * xRatio;
    return top + (bottom - top) * yRatio;
}


function bilinearInterpolator(grid, scaleFactor = 5) {

    if (scaleFactor === 1) return grid;

    // input grid dimensions
    const rows = grid.length;
    if (rows === 0) return [];
    const cols = grid[0].length;

    // output grid dimensions
    const fineRows = rows * scaleFactor;
    const fineCols = cols * scaleFactor;
    const fineGrid = Array(fineRows).fill().map(() => Array(fineCols).fill(undefined));

    // check if scale factor is even
    const sfIsEven = scaleFactor % 2 === 0

    //compute output grid values
    for (let i = 0; i < fineRows; i++) {

        const coarseI = Math.min(Math.floor(i / scaleFactor), rows - 2);
        const yRatio = (i % scaleFactor) / scaleFactor;
        const i_ = coarseI * scaleFactor + (scaleFactor / 2)

        for (let j = 0; j < fineCols; j++) {
            const coarseJ = Math.min(Math.floor(j / scaleFactor), cols - 2);
            const xRatio = (j % scaleFactor) / scaleFactor;
            const j_ = coarseJ * scaleFactor + (scaleFactor / 2)

            // get four corner values
            const topLeft = grid[coarseI][coarseJ];
            const topRight = grid[coarseI][coarseJ + 1];
            const bottomLeft = grid[coarseI + 1][coarseJ];
            const bottomRight = grid[coarseI + 1][coarseJ + 1];


            if (sfIsEven) {
                if (topLeft === undefined && i <= i_ && j <= j_) continue
                if (topRight === undefined && i <= i_ && j >= j_) continue
                if (bottomLeft === undefined && i >= i_ && j <= j_) continue
                if (bottomRight === undefined && i >= i_ && j >= j_) continue
            } else {
                if (topLeft === undefined && i < i_ && j < j_) continue
                if (topRight === undefined && i < i_ && j > j_) continue
                if (bottomLeft === undefined && i > i_ && j < j_) continue
                if (bottomRight === undefined && i > i_ && j > j_) continue
            }

            // general case: bilinear interpolation
            // If all four are defined, interpolate normally
            if (topLeft !== undefined && topRight !== undefined && bottomLeft !== undefined && bottomRight !== undefined) {
                fineGrid[i][j] = interp(topLeft, topRight, bottomLeft, bottomRight, xRatio, yRatio)
                continue
            }

            // If only one is not defined, use average value of 2 adjacents and interpolate
            if (topLeft === undefined && topRight !== undefined && bottomLeft !== undefined && bottomRight !== undefined) {
                const v = topRight + bottomLeft
                fineGrid[i][j] = interp(v / 2, topRight, bottomLeft, bottomRight, xRatio, yRatio)
                continue
            }
            if (topLeft !== undefined && topRight === undefined && bottomLeft !== undefined && bottomRight !== undefined) {
                const v = topLeft + bottomRight
                fineGrid[i][j] = interp(topLeft, v / 2, bottomLeft, bottomRight, xRatio, yRatio)
                continue
            }
            if (topLeft !== undefined && topRight !== undefined && bottomLeft === undefined && bottomRight !== undefined) {
                const v = topLeft + bottomRight
                fineGrid[i][j] = interp(topLeft, topRight, v / 2, bottomRight, xRatio, yRatio)
                continue
            }
            if (topLeft !== undefined && topRight !== undefined && bottomLeft !== undefined && bottomRight === undefined) {
                const v = topRight + bottomLeft
                fineGrid[i][j] = interp(topLeft, topRight, bottomLeft, v / 2, xRatio, yRatio)
                continue
            }

            // If only two diagonally opposite points are defined, interpolate along diagonal
            if (topLeft !== undefined && bottomRight !== undefined) {
                const t = (xRatio + yRatio) * Math.SQRT1_2
                fineGrid[i][j] = topLeft * t + bottomRight * (1 - t);
                continue
            }
            if (topRight !== undefined && bottomLeft !== undefined) {
                const t = (1 - xRatio + yRatio) * Math.SQRT1_2
                fineGrid[i][j] = topRight * t + bottomLeft * (1 - t);
                continue
            }

            // If only two adjacent points are defined, interpolate between them
            if (topLeft !== undefined && bottomLeft !== undefined) {
                fineGrid[i][j] = bottomLeft * yRatio + topLeft * (1 - yRatio);
                continue
            }
            if (topRight !== undefined && bottomRight !== undefined) {
                fineGrid[i][j] = bottomRight * yRatio + topRight * (1 - yRatio);
                continue
            }
            if (topLeft !== undefined && topRight !== undefined) {
                fineGrid[i][j] = topRight * xRatio + topLeft * (1 - xRatio);
            }
            if (bottomLeft !== undefined && bottomRight !== undefined) {
                fineGrid[i][j] = bottomRight * xRatio + bottomLeft * (1 - xRatio);
                continue
            }

            // If only one point is defined, use that value
            if (topLeft !== undefined) {
                fineGrid[i][j] = topLeft;
                continue
            }
            if (topRight !== undefined) {
                fineGrid[i][j] = topRight;
                continue
            }
            if (bottomLeft !== undefined) {
                fineGrid[i][j] = bottomLeft;
                continue
            }
            if (bottomRight !== undefined) {
                fineGrid[i][j] = bottomRight;
            }
        }
    }
    return fineGrid;
}
