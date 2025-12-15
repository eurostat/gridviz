//@ts-check
'use strict'

import { SideStyle } from './SideStyle.js'
import { max } from 'd3-array'
import { exponentialScale } from '../utils/stretching.js'

/**
 * @module style
 * @author Julien Gaffuri
 */
export class ShadingStyle extends SideStyle {

    /** @param {object} opts
     * @param {string} opts.elevation
     * @param {boolean} opts.diamond
     * @param {function} opts.scale
     * @param {function} opts.width
     * @param {number} opts.reliefDirection
     * @param {string} opts.colorTopLeft
     * @param {string} opts.colorBottomRight
     */
    constructor(opts = {}) {
        super(opts)

        /** The cell elevation field name
         * @type {string} */
        const elevation = opts.elevation

        // compute side value as elevation difference and attach to side
        const sideValue = (side) => {
            if (!side.c1) side.v = 0
            else if (!side.c2) side.v = 0
            else if (!side.c1[elevation]) side.v = 0
            else if (!side.c2[elevation]) side.v = 0
            else side.v = +side.c2[elevation] - side.c1[elevation]
            return side.v
        }

        // compute maximum side value for normalization
        this.viewScale = sides => max(sides, s => sideValue(s))

        const colorTopLeft = opts.colorTopLeft || '255,255,255'
        const colorBottomRight = opts.colorBottomRight || '0,0,0'
        const scale = opts.scale || (t=>t)

        this.color = (side, resolution, z, max) => {
            if (side.v == 0) return
            let coeff = Math.abs(side.v / max)
            coeff = scale(coeff)
            if ((side.v < 0 && side.or === 'h') || (side.v > 0 && side.or === 'v'))
                return 'rgba(' + colorTopLeft + ',' + coeff + ')'
            return 'rgba(' + colorBottomRight + ',' + coeff + ')'
        }

        this.width = (_, r, z) => opts.width | Math.min(2 * z, r / 3)
        this.diamond = opts.diamond

    }

}
