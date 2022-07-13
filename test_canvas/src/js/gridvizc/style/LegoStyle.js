//@ts-check

import { ShapeColorSizeStyle } from "./ShapeColorSizeStyle"
import { SideStyle } from "./SideStyle"
import { Style } from "../Style"
import { s } from "../index"

/**
 * 
 * @param {string} col 
 * @param {object} opts 
 * @returns {Array.<Style>}
 */
export const getLegoStyle = function (col, opts) {
    opts = opts || {}

    //the colors
    //http://www.jennyscrayoncollection.com/2021/06/all-current-lego-colors.html
    //https://leonawicz.github.io/legocolors/reference/figures/README-plot-1.png
    opts.colors = opts.colors || [
        "#afd246", //light green
        "#00852b", //darker green
        "#fac80a", //dark yellow
        "#d67923", //mostard
        "#bb805a", //brown
        "#cb4e29", //redish
        "#b40000", //red
        "#720012", //dark red
    ]

    //for fixed classification
    opts.breaks = opts.breaks
    //for dynamic classification
    opts.valueStretch = opts.valueStretch

    //shadow colors
    opts.colDark = opts.colDark || "#333"
    opts.colBright = opts.colBright || "#aaa"

    //width of the segment (share of the resolution)
    opts.widthFactor = opts.widthFactor || 0.05

    /**
     * @param {number} v A cell value (within [0,1] for a dynamic classification).
     * @returns the class number of the value
     */
    const getClass = (v) => {

        //fixed classification
        if (opts.breaks) {
            for (let i = 0; i < opts.breaks.length; i++)
                if (v < opts.breaks[i]) return i
            return opts.breaks.length

            //dynamic classification
        } else if (opts.valueStretch) {
            const t = v //within [0,1] !
            const nb = opts.colors.length
            for (let i = 0; i < nb - 1; i++)
                if (t <= (i + 1) / nb) return i
            return nb - 1
        }
        return NaN

    }




    /** The color style */
    const colStyle = new ShapeColorSizeStyle({
        colorCol: col,
        //the color corresponding to the class
        color: (v, r, s, zf) => {
            if (v == 0 && opts.valueStretch && isNaN(opts.valueStretch(v, r, s, zf)))
                return undefined
            return opts.colors[getClass(opts.valueStretch ? opts.valueStretch(v, r, s, zf) : v)]
        },
        shape: () => "square",
        sizeCol: col,
        size: (v, r, s, zf) => r,
        zfStroke: 0,
    })


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
            if (side.value === 0) return opts.colDark
            if (side.or === "v")
                return side.value > 0 ? opts.colBright : opts.colDark
            return side.value > 0 ? opts.colDark : opts.colBright
        },
        //width depends on the value, that is the number of classes of difference
        width: (side, r, s, z) => {
            //return 1*z
            const v = side.value;
            if (v == 0) return 0.75 * z
            return opts.widthFactor * r * Math.abs(side.value) * (side.or === "v" ? 0.5 : 1)
        },
    })



    class LegoTopStyle extends Style {

        /** @param {object} opts */
        constructor(opts = undefined) { super(opts) }

        draw(cells, r, cg) {
            cg.ctx.lineWidth = 0.6 * cg.getZf();

            //dark part
            cg.ctx.strokeStyle = opts.colDark;
            for (let c of cells) {
                cg.ctx.beginPath();
                cg.ctx.arc(
                    c.x + r * 0.5,
                    c.y + r * 0.5,
                    r * 0.55 * 0.5,
                    Math.PI / 4, - Math.PI * (3 / 4), true);
                cg.ctx.stroke();
            }

            //bright part
            cg.ctx.strokeStyle = opts.colBright;
            for (let c of cells) {
                cg.ctx.beginPath();
                cg.ctx.arc(
                    c.x + r * 0.5,
                    c.y + r * 0.5,
                    r * 0.55 * 0.5,
                    Math.PI / 4, - Math.PI * (3 / 4), false);
                cg.ctx.stroke();
            }

        }

    }

    return [colStyle, sideStyle, new LegoTopStyle()]
}
