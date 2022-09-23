//@ts-check

import { SquareColorWGLStyle2 } from "./SquareColorWGLStyle2"
import { SideStyle } from "./SideStyle"
import { TanakaStyle } from "./TanakaStyle"
import { Style } from "../Style"

/**
 * @author Julien Gaffuri
 */
export class LegoStyle {

    /**
     * @param {string} col 
     * @param {object} opts 
     * @returns {Array.<Style>}
     */
    static get(col, opts) {
        opts = opts || {}

        //the colors
        //http://www.jennyscrayoncollection.com/2021/06/all-current-lego-colors.html
        //https://leonawicz.github.io/legocolors/reference/figures/README-plot-1.png
        opts.colors = opts.colors || [
            "#00852b", //darker green
            "#afd246", //light green
            "#fac80a", //dark yellow
            "#d67923", //mostard
            "#bb805a", //brown
            "#cb4e29", //redish
            "#b40000", //red
            "#720012", //dark red
        ]

        opts.colDark = opts.colDark || "#333"
        opts.colBright = opts.colBright || "#aaa"
        opts.widthFactor = opts.widthFactor || 0.05

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

        const out = TanakaStyle.get(col, opts)
        out.push(new LegoTopStyle())

        return out
    }
}
