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

        /** A function to compute 't' from the value v
         * @type {function(number,number,Stat,number):number} */
        opts.valueStretch = opts.valueStretch || ((v, r, s, zf) => (v - s.min) / (s.max - s.min))

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
            const nb = opts.colors.length
            for (let i = 0; i < nb - 1; i++)
                if (t <= (i + 1) / nb) return i
            return nb - 1
        }

        /** The color style */

        const colStyle = new SquareColorWGLStyle2({
            colorCol: col,
            //the color corresponding to the class
            color: (v, r, s, zf) => {
                const t = opts.valueStretch(v, r, s, zf);
                if (v == 0 && isNaN())
                    return undefined
                return opts.colors[getClass(opts.valueStretch(v, r, s, zf))]
            },
            size: (r, zf) => r + 0.5 * zf, //that is to ensure no gap between same class cells is visible
        })

        /*
        if no web gl:    
            const colStyle = new ShapeColorSizeStyle({
                colorCol: col,
                //the color corresponding to the class
                color: (v, r, s, zf) => {
                    if (v == 0 && opts.valueStretch && isNaN(opts.valueStretch(v, r, s, zf)))
                        return undefined
                    return opts.colors[getClass(opts.valueStretch ? opts.valueStretch(v, r, s, zf) : v)]
                },
                shape: () => "square",
                size: (v, r, s, zf) => r + 0.5 * zf, //that is to ensure no gap between same class cells is visible
            })
        */


        /** The side style, for the shadow effect */
        const sideStyle = new SideStyle({
            valueCol: col,
            value: (v1, v2, r, s, zf) => {
                //the number of classes of difference

                //Stretch values, if necessary
                const v1_ = opts.valueStretch ? opts.valueStretch(v1, r, s, zf) : v1
                const v2_ = opts.valueStretch ? opts.valueStretch(v2, r, s, zf) : v2
                //if no v1, no v2
                if (((!v1_ || isNaN(v1_)) && (!v2_ || isNaN(v2_)))) return 0;
                //if no v1
                else if (!v1_ || isNaN(v1_)) return getClass(v2_) //+1
                //if no v2
                else if (!v2_ || isNaN(v2_)) return -getClass(v1_) //-1
                //else, difference between two class numbers
                return getClass(v2_) - getClass(v1_);
            },
            //white or black, depending on orientation and value
            color: (side, r, s, z) => {
                if (side.value === 0) return
                if (side.or === "v")
                    return side.value > 0 ? opts.colBright : opts.colDark
                return side.value > 0 ? opts.colDark : opts.colBright
            },
            //width depends on the value, that is the number of classes of difference
            width: (side, r, s, z) => opts.widthFactor * r * Math.abs(side.value) * (side.or === "v" ? 0.5 : 1),
        })

        return [colStyle, sideStyle]
    }
}
