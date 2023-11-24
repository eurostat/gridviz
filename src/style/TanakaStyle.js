//@ts-check
'use strict'

import { SquareColorWGLStyle } from './SquareColorWGLStyle.js'
import { SideStyle } from './SideStyle.js'

/**
 *
 * @see https://manifold.net/doc/mfd9/example__tanaka_contours.htm
 *
 * @author Julien Gaffuri
 */
export class TanakaStyle {
    /**
     * @param {string} col
     * @param {object} opts
     * @returns {Array.<import("../Style").Style>}
     */
    static get(col, opts) {
        opts = opts || {}

        //get colors from d3 ramps, if 'nb' is specified
        if (opts.nb != undefined) {
            if (opts.nb < 2) {
                console.error('unexpected number of colors in tanaka (<2): ' + opts.nb)
                opts.nb = 2
            }
            if (!opts.color) {
                console.error('color function not defined in tanaka')
                opts.color = () => 'gray'
            }
            opts.colors = []
            for (let i = 0; i < opts.nb; i++) opts.colors.push(opts.color(i / (opts.nb - 1)))
        }

        /**
         * The colors.
         * @type {Array.<string>} */
        opts.colors = opts.colors || ['#a9bb9e', '#c9dcaa', '#fde89f', '#f9a579', '#eb444b']
        const nb = opts.colors.length

        /** A function to compute 't' from the value v
         * @type {function(number,number,import("../Style").Stat):number} */
        opts.tFun = opts.tFun || ((v, r, s) => (v - s.min) / (s.max - s.min))

        //shadow colors
        opts.colDark = opts.colDark || '#111'
        opts.colBright = opts.colBright || '#ddd'

        //width of the segment (share of the resolution)
        opts.widthFactor = opts.widthFactor || 0.08

        //shading
        opts.newShading = opts.newShading
        opts.newShadingWidthPix = opts.newShadingWidthPix || 2
        //transparency value, within [0,1]
        opts.newShadingTr =
            opts.newShadingTr ||
            ((sideValue, sideStat) =>
                Math.abs(sideValue) / Math.max(Math.abs(sideStat.min), Math.abs(sideStat.max)))

        /**
         * @param {number} t A cell t value, within [0,1].
         * @returns the class number for the value
         */
        const getClass = (t) => {
            if (isNaN(t) || t == undefined) {
                console.error('Unexpected t value 1: ' + t)
                return -9
            }
            for (let i = 0; i < nb; i++) if (t <= (i + 1) / nb) return i
            console.error('Unexpected t value 2: ' + t)
            return -9
        }

        const colStyle = new SquareColorWGLStyle({
            colorCol: col,
            colors: opts.colors,
            tFun: (v, r, s) => {
                const t = opts.tFun(v, r, s)
                const c = getClass(t)
                return c / (nb - 1)
            },
            //stretching: { fun: "expRev", alpha: -7 },
            size: (r, z) => r + 0.5 * z, //that is to ensure no gap between same class cells is visible
            filter: opts.filter,
        })

        /*
        if no web gl:    
            const colStyle = new ShapeColorSizeStyle({
                colorCol: col,
                //the color corresponding to the class
                color: (v, r, s, z) => {
                    if (v == 0 && opts.tFun && isNaN(opts.tFun(v, r, s)))
                        return undefined
                    return opts.colors[getClass(opts.tFun ? opts.tFun(v, r, s) : v)]
                },
                shape: () => "square",
                size: (v, r, s, z) => r + 0.5 * z, //that is to ensure no gap between same class cells is visible
            })
        */

        /** The side style, for the shadow effect */
        const sideStyle = new SideStyle({
            valueCol: col,
            value: (v1, v2, r, s, z) => {
                //compute the number of classes of difference
                if (v1 === undefined && v2 === undefined) return 0
                else if (v2 === undefined) {
                    const t = opts.tFun(v1, r, s)
                    if (t == undefined || isNaN(t)) throw new Error('Unexpected value: ' + v1 + ' - ' + t)
                    const c = getClass(t)
                    return c + 1
                } else if (v1 === undefined) {
                    const t = opts.tFun(v2, r, s)
                    if (t == undefined || isNaN(t)) throw new Error('Unexpected value: ' + v2 + ' - ' + t)
                    const c = getClass(t)
                    return -c - 1
                }
                const t1 = opts.tFun(v1, r, s)
                if (t1 == undefined || isNaN(t1)) throw new Error('Unexpected value: ' + v1 + ' - ' + t1)
                const t2 = opts.tFun(v2, r, s)
                if (t2 == undefined || isNaN(t2)) throw new Error('Unexpected value: ' + v2 + ' - ' + t2)
                const c1 = getClass(t1)
                const c2 = getClass(t2)
                return -c2 + c1
            },

            color: opts.newShading
                ? //black with transparency depending on difference
                  (side, r, s, z) => {
                      const tr = opts.newShadingTr(side.value, s)
                      return (side.value > 0 && side.or === 'h') || (side.value < 0 && side.or === 'v')
                          ? 'rgba(255,255,100,' + tr + ')'
                          : 'rgba(0,0,0,' + tr + ')'
                  }
                : //white or black, depending on orientation and value
                  (side, r, s, z) => {
                      if (side.value === 0) return
                      //return "gray"
                      if (side.or === 'v') return side.value < 0 ? opts.colBright : opts.colDark
                      return side.value < 0 ? opts.colDark : opts.colBright
                  },

            width: opts.newShading
                ? //fill size
                  (side, r, s, z) => {
                      return opts.newShadingWidthPix * z
                  }
                : //width depends on the value, that is the number of classes of difference
                  (side, r, s, z) =>
                      opts.widthFactor * r * Math.abs(side.value) * (side.or === 'v' ? 0.5 : 1),

            filter: opts.filter,
        })

        return [colStyle, sideStyle]
    }
}
