//@ts-check
'use strict'

import { Style } from '../core/Style.js'
import { cellsToMatrix } from '../utils/utils.js'
//import { extent } from 'd3-array'

/**
 * @module style
 * @author Julien Gaffuri
 */
export class Interpolator extends Style {
    /** @param {object} opts */
    constructor(opts) {
        super(opts)
        opts = opts || {}

        this.value = opts.value //(c) => elevation
        this.targetResolution = opts.targetResolution || ((r,z)=> 3*z)
        this.interpolatedProperty = opts.interpolatedProperty || 'value'
        //this.method = opts.method || 'bilinear' // 'nearest', 'bilinear'
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

        //TODO style

    }
}


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
