//@ts-check

import { SquareColorWGLStyle2 } from "./SquareColorWGLStyle2"
import { SideStyle } from "./SideStyle"
import { Style, Stat } from "../Style"

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
     * @returns {Array.<Style>}
     */
    static get(col, opts) {
        opts = opts || {}

        //the colors
        opts.colors = opts.colors || ["#a9bb9e", "#c9dcaa", "#f0f1af", "#fde89f", "#f9a579", "#eb444b"]
        const nb = opts.colors.length

        /** A function to compute 't' from the value v
         * @type {function(number,number,Stat,number):number} */
        opts.tFun = opts.tFun || ((v, r, s, zf) => (v - s.min) / (s.max - s.min))

        //shadow colors
        opts.colDark = opts.colDark || "#111"
        opts.colBright = opts.colBright || "#ddd"

        //width of the segment (share of the resolution)
        opts.widthFactor = opts.widthFactor || 0.1

        /**
         * @param {number} t A cell t value, within [0,1].
         * @returns the class number for the value
         */
        const getClass = (t) => {
            if (isNaN(t) || t == undefined) throw new Error("Unexpected t value 1: " + t);
            for (let i = 0; i < nb; i++)
                if (t <= (i + 1) / nb) return i
            throw new Error("Unexpected t value 2: " + t);
        }

        /** The color style */
        const colStyle = new SquareColorWGLStyle2({
            colorCol: col,
            //the color corresponding to the class
            color: (v, r, s, zf) => {
                const t = opts.tFun(v, r, s, zf);
                const ci = getClass(t < 0 ? 0 : (t > 1) ? 1 : t);
                return opts.colors[ci]
            },
            size: (r, zf) => r + 0.5 * zf, //that is to ensure no gap between same class cells is visible
        })




        
        /*
        if no web gl:    
            const colStyle = new ShapeColorSizeStyle({
                colorCol: col,
                //the color corresponding to the class
                color: (v, r, s, zf) => {
                    if (v == 0 && opts.tFun && isNaN(opts.tFun(v, r, s, zf)))
                        return undefined
                    return opts.colors[getClass(opts.tFun ? opts.tFun(v, r, s, zf) : v)]
                },
                shape: () => "square",
                size: (v, r, s, zf) => r + 0.5 * zf, //that is to ensure no gap between same class cells is visible
            })
        */


        /** The side style, for the shadow effect */
        const sideStyle = new SideStyle({
            valueCol: col,
            value: (v1, v2, r, s, zf) => {
                //compute the number of classes of difference
                if (v1 === undefined && v2 === undefined)
                    return 0
                else if (v2 === undefined) {
                    const t = opts.tFun(v1, r, s, zf)
                    const c = getClass(t)
                    return c + 1
                } else if (v1 === undefined) {
                    const t = opts.tFun(v2, r, s, zf)
                    const c = getClass(t)
                    return -c - 1
                }
                const t1 = opts.tFun(v1, r, s, zf)
                const t2 = opts.tFun(v2, r, s, zf)
                const c1 = getClass(t1)
                const c2 = getClass(t2)
                return -c2 + c1;
            },
            //white or black, depending on orientation and value
            color: (side, r, s, z) => {
                if (side.value === 0) return
                //return "gray"
                if (side.or === "v")
                    return side.value < 0 ? opts.colBright : opts.colDark
                return side.value < 0 ? opts.colDark : opts.colBright
            },
            //width depends on the value, that is the number of classes of difference
            width: (side, r, s, z) => opts.widthFactor * r * Math.abs(side.value) * (side.or === "v" ? 0.5 : 1),
        })

        return [colStyle, sideStyle]
    }
}
