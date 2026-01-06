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
         * @type { function } } */
        this.targetResolution = opts.targetResolution || ((r,z)=> 3*z)

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
        //filter
        if (this.filter) cells = cells.filter(this.filter)
        if (cells.length == 0) return;

        //
        const z = geoCanvas.view.z

        //get view scale
        //const viewScale = this.viewScale ? this.viewScale(cells, resolution, z) : undefined

        //index cells by y and x
        let m = cellsToMatrix(cells, resolution, c => this.value(c))
        const x0 = m.x0, y0 = m.y0

        //get target resolution
        const targetResolution = this.targetResolution(resolution, z)

        // compute ray casting shadow
        m = bilinearInterpolator(m, resolution, targetResolution);
 
        // make cells
        cells = []
        for (let i = 0; i < m.length; i++) {
            const row = m[i]
            const y = y0 - i * targetResolution
            for (let j = 0; j < row.length; j++) {
                const v = row[j]
                if (!v) continue
                const c = { x: x0 + j * targetResolution, y: y }
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


function bilinearInterpolator(coarseGrid, inputResolution, targetResolution) {
    const scaleFactor = Math.round(targetResolution / inputResolution);
    const rows = coarseGrid.length;
    if (rows === 0) return [];
    const cols = coarseGrid[0].length;
    const fineRows = rows * scaleFactor;
    const fineCols = cols * scaleFactor;
    const fineGrid = Array(fineRows).fill().map(() => Array(fineCols).fill(undefined));
    for (let i = 0; i < fineRows; i++) {
        const coarseI = Math.min(Math.floor(i / scaleFactor), rows - 2);
        for (let j = 0; j < fineCols; j++) {
            const coarseJ = Math.min(Math.floor(j / scaleFactor), cols - 2);
            const topLeft = coarseGrid[coarseI][coarseJ];
            const topRight = coarseGrid[coarseI][coarseJ + 1];
            const bottomLeft = coarseGrid[coarseI + 1][coarseJ];
            const bottomRight = coarseGrid[coarseI + 1][coarseJ + 1]; // If all four are defined, interpolate normally
            if (topLeft !== undefined && topRight !== undefined && bottomLeft !== undefined && bottomRight !== undefined) {
                const xRatio = (i % scaleFactor) / scaleFactor;
                const yRatio = (j % scaleFactor) / scaleFactor;
                const top = topLeft + (topRight - topLeft) * yRatio;
                const bottom = bottomLeft + (bottomRight - bottomLeft) * yRatio;
                fineGrid[i][j] = top + (bottom - top) * xRatio;
            } // If only two diagonally opposite points are defined, interpolate along diagonal
            else if (topLeft !== undefined && bottomRight !== undefined) {
                fineGrid[i][j] = (topLeft + bottomRight) / 2;
            } else if (topRight !== undefined && bottomLeft !== undefined) {
                fineGrid[i][j] = (topRight + bottomLeft) / 2;
            } // If only one point is defined, use that value
            else if (topLeft !== undefined) {
                fineGrid[i][j] = topLeft;
            } else if (topRight !== undefined) {
                fineGrid[i][j] = topRight;
            } else if (bottomLeft !== undefined) {
                fineGrid[i][j] = bottomLeft;
            } else if (bottomRight !== undefined) {
                fineGrid[i][j] = bottomRight;
            } // Otherwise, leave as undefined
            else {
                fineGrid[i][j] = undefined;
            }
        }
    }
    return fineGrid;
}


/*
function bilinearInterpolator(m, inputResolution, targetResolution) {
    const scale = Math.round(targetResolution / inputResolution)
    const nm = []
    for (let i = 0; i < m.length * scale; i++) {
        nm[i] = []
        for (let j = 0; j < (m[0].length * scale); j++) {
            const x = j / scale
            const y = i / scale
            const x0 = Math.floor(x)
            const y0 = Math.floor(y)
            const x1 = Math.min(x0 + 1, m[0].length - 1)
            const y1 = Math.min(y0 + 1, m.length - 1)
            const q11 = m[y0][x0] || 0
            const q21 = m[y0][x1] || 0
            const q12 = m[y1][x0] || 0
            const q22 = m[y1][x1] || 0
            const r1 = ((x1 - x) * q11) + ((x - x0) * q21)
            const r2 = ((x1 - x) * q12) + ((x - x0) * q22)
            const p = ((y1 - y) * r1) + ((y - y0) * r2)
            nm[i][j] = p
        }
    }
    return nm
}
*/