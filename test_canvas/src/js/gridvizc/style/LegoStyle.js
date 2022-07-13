//@ts-check

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
    opts.colors = opts.colors || ["blue", "red", "yellow", "green", "pink"]

    //shadow colors
    opts.colDark = opts.colDark || "#111"
    opts.colBright = opts.colBright || "#999"

    //width of the segment (share of the resolution)
    opts.widthFactor = opts.widthFactor || 0.15

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



    /** The side style, for the shadow effect */
    const sideStyle = new SideStyle({
        valueCol: col,
        value: (v1, v2) => { return (v2 != undefined ? +v2 : 0) - (v1 != undefined ? +v1 : 0) },
        color: (side, r, s, z) => side.value > 0 && side.or === "h" || side.value < 0 && side.or === "v" ? opts.colDark : opts.colBright,
        width: (side, r, stat, z) => {
            const max = Math.max(Math.abs(stat.min), Math.abs(stat.max))
            return r * (0.01 + 0.333 * (side.or === "v" ? 0.6 : 1) * s(Math.abs(side.value) / max, 0.3))
        },
        fillColor: (c) => {
            if (!c.legoColor)
                c.legoColor = opts.colors[Math.floor(opts.colors.length * Math.random())]
            return c.legoColor
        },
    })


    class LegoTopStyle extends Style {

        /** @param {object} opts */
        constructor(opts = undefined) { super(opts) }

        draw(cells, r, cg) {
            cg.ctx.lineWidth = 1.5 * cg.getZf();

            //dark part
            cg.ctx.strokeStyle = opts.colDark;
            for (let c of cells) {
                cg.ctx.beginPath();
                cg.ctx.arc(
                    c.x + r * 0.5,
                    c.y + r * 0.5,
                    r * 0.6 * 0.5,
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
                    r * 0.6 * 0.5,
                    Math.PI / 4, - Math.PI * (3 / 4), false);
                cg.ctx.stroke();
            }

        }

    }

    return [sideStyle, new LegoTopStyle()]
}
