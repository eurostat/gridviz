//@ts-check
'use strict'

import { SideStyle } from './SideStyle.js'
import { max } from 'd3-array'

/** @typedef {{ x:number, y:number, or:"v"|"h", c1:(import('../core/Dataset.js').Cell)|undefined, c2:(import('../core/Dataset.js').Cell)|undefined }} Side */


/**
 * A style to show the relief of an elevation grid as hillshading.
 * For each side between two adjacent cells, a segment is drawn: light when the side faces the top left, dark when it faces the bottom right,
 * with an opacity proportional to the elevation difference between the two cells (relative to the biggest one in the view).
 *
 * @example
 * new gridviz.ShadingStyle({ elevation: 'v', colorTopLeft: '255,155,155', colorBottomRight: '0,0,100' })
 *
 * @module style
 * @author Julien Gaffuri
 */
export class ShadingStyle extends SideStyle {

    /** @param {object} opts The options of the style (see SideStyle and Style for the others: filter, alpha, blendOperation, visible...).
     * @param {string} opts.elevation The name of the cell property with the elevation.
     * @param {string} [opts.colorTopLeft] The color of the sides which face the top left, as 'r,g,b'. Default: '255,255,255'.
     * @param {string} [opts.colorBottomRight] The color of the sides which face the bottom right, as 'r,g,b'. Default: '0,0,0'.
     * @param {boolean} [opts.revert] Swaps the two colors, to show depressions as hills. Default: false.
     * @param {function(number):number} [opts.scale] Stretches the opacity, from a value within [0,1] to a value within [0,1]. Default: linear.
     * @param {number} [opts.width] The width of the segments, in geographical unit. Default: 2 pixels, and at most a third of the resolution.
     * @param {boolean} [opts.diamond] Draws the sides as diamonds.
     */
    constructor(opts = {}) {
        super(opts)

        /** The cell elevation field name
         * @type {string} */
        const elevation = opts.elevation

        // compute side value as elevation difference and attach to side
        const sideValue = (/** @type {Side} */ side) => {
            if (!side.c1) side.v = 0
            else if (!side.c2) side.v = 0
            else if (!side.c1[elevation]) side.v = 0
            else if (!side.c2[elevation]) side.v = 0
            else side.v = +side.c2[elevation] - side.c1[elevation]
            return side.v
        }

        // compute maximum side value for normalization
        this.viewScale = sides => max(sides, s => sideValue(s))

        // get colors
        let colorTopLeft = opts.colorTopLeft || '255,255,255'
        let colorBottomRight = opts.colorBottomRight || '0,0,0'

        // revert colors (to revert the relief, show depressions as hills)
        const revert = opts.revert == undefined? false : opts.revert
        if(revert) {
            let a = colorTopLeft
            colorTopLeft = colorBottomRight
            colorBottomRight = a
        }

        //
        const scale = opts.scale

        this.color = (side, resolution, z, max) => {
            if (side.v == 0) return
            let coeff = Math.abs(side.v / max)
            if(scale) coeff = scale(coeff)
            if ((side.v < 0 && side.or === 'h') || (side.v > 0 && side.or === 'v'))
                return 'rgba(' + colorTopLeft + ',' + coeff + ')'
            return 'rgba(' + colorBottomRight + ',' + coeff + ')'
        }

        // 2 pixels, and at most a third of the resolution (a bitwise OR here truncated the width to an integer number of geographical units)
        this.width = (_, r, z) => opts.width || Math.min(2 * z, r / 3)
        this.diamond = opts.diamond
    }
}
