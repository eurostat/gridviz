//@ts-check

import { Style, Stat, getStatistics } from "../Style"
import { Cell } from "../Dataset"
import { GeoCanvas } from "../GeoCanvas";
import { s } from "../index"

/**
 * 
 * @author Julien Gaffuri
 */
export class DotDensityStyle extends Style {

    /** @param {object} opts */
    constructor(opts) {
        super(opts)
        opts = opts || {};

        /** The name of the column/attribute of the tabular data where to retrieve the variable for dot density.
         *  @protected @type {string} */
        this.col = opts.col;

        /** A function returning the number of dots for a cell value.
        * @protected @type {function(number,number,Stat,number):number} */
        this.nb = opts.nb || ((v, r, s, zf) => 0.3 * r * r / (zf * zf) * v / s.max)

        /** The color of the dots
        * @protected @type {function(Cell):string} */
        this.color = opts.color || (() => "#FF5733");

        /** A function returning the size of the dots, in geo unit.
        * @protected @type {function(number,number):number} */
        this.dotSize = opts.dotSize //|| ((r, zf) => ...
    }


    /**
     * Draw cells as text.
     * 
     * @param {Array.<Cell>} cells 
     * @param {number} r 
     * @param {GeoCanvas} cg 
     */
    draw(cells, r, cg) {
        //zoom factor
        const zf = cg.getZf()

        let stat
        if (this.col) {
            //compute variable statistics
            stat = getStatistics(cells, c => c[this.col], true)
        }
        if (!stat) return

        //draw in geo coordinates
        cg.setCanvasTransform()

        //size of the dots
        const s = this.dotSize ? this.dotSize(r, zf) : 2 * zf

        for (let c of cells) {

            //get color
            const col = this.color(c);
            if (!col || col === "none") continue
            //set color
            cg.ctx.fillStyle = col;

            //get offset
            const offset = this.offset(c, r, zf)

            //number of dots
            const nb = this.nb(c[this.col], r, stat, zf)

            //draw random dots
            for (let i = 0; i <= nb; i++) {
                cg.ctx.fillRect(
                    c.x + offset.dx + r * Math.random(),
                    c.y + offset.dy + r * Math.random(),
                    s, s);
            }

        }

    }

}
