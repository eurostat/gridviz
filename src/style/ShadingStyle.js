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
     * @param {string} opts.field
     * @param {boolean} opts.diamond
     * @param {number} opts.exageration
     * @param {number} opts.reliefDirection
     */
    constructor(opts = {}) {
        super(opts)

        /** The cell elevation field name
         * @type {string} */
        const field = opts.field

        // compute side value as elevation difference and attach to side
        const sideValue = (side) => {
            if (!side.c1) side.v = 0
            else if (!side.c2) side.v = 0
            else if (!side.c1[field]) side.v = 0
            else if (!side.c2[field]) side.v = 0
            else side.v = +side.c2[field] - side.c1[field]
            return side.v
        }

        this.width = (_, r, z) => Math.min(2 * z, r / 3)
        this.diamond = opts.diamond

        this.viewScale = sides => max(sides, s => sideValue(s))

        const exageration = opts.exageration | 1
        const reliefDirection = opts.reliefDirection | 1

        const scale = exponentialScale(-exageration)
        this.color = (side, resolution, z, max) => {
            if (side.v == 0) return
            let coeff = Math.abs(side.v / max)
            coeff = scale(coeff)
            if ((side.v * reliefDirection < 0 && side.or === 'h') || (side.v * reliefDirection > 0 && side.or === 'v'))
                return 'rgba(255,255,255,' + coeff + ')'
            return 'rgba(0,0,0,' + coeff + ')'
        }

    }

}
