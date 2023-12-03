//@ts-check
'use strict'

import { SideStyle } from './SideStyle.js'

/** @typedef {{x:number,y:number,or:"v"|"h",value:number}} Side */

/**
 *
 * @author Julien Gaffuri
 */
export class ContourStyle extends SideStyle {
    /** @param {object} opts */
    constructor(opts) {
        super(opts)
        opts = opts || {}

        /** @type {number} */
        //opts.interval = opts.interval || 100

        /** @type {Array.<number>} */
        opts.breaks = opts.breaks || [100, 1000, 10000, 100000, 1000000]

        /** @type {function(Side,number,number):string} */
        opts.width = opts.width || (() => 1) //(s, r, z) => ...

        /** @type {function(Side,number,number):string} */
        opts.color = opts.color || (() => '#E7A935') //(s, r, z) => ...

        //override method for contour drawing

        const getClass = function (v) {
            if (v == undefined) return 0
            for (let i = 0; i < opts.breaks.length; i++) if (v < opts.breaks[i]) return i
            return opts.breaks.length
        }

        this.value = (v1, v2, r, s, z) => {
            //if (!v1 || !v2) return 0
            return Math.abs(getClass(v2) - getClass(v1))

            //check if v1 - v2 cross a contour line
            //const r1 = Math.floor(v1 / opts.interval);
            //const r2 = Math.floor(v2 / opts.interval);
            //return Math.abs(r2 - r1);
        }

        //same color for all
        this.color = (side, r, z) => (side.value ? opts.color(side, r, z) : undefined)

        //width: multiple of
        this.width = (side, r, z) => side.value * z * opts.width(side, r, z)
    }
}
