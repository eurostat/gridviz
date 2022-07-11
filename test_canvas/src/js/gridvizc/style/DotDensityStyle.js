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

        /** The name of the column/attribute of the tabular data where to retrieve the variable for text.
         *  @protected @type {string} */
        this.col = opts.col;

        /** 
        * @protected @type {function(number,number,Stat|undefined):string} */
        this.nb = opts.nbMaxPix || 0.3

        /** The color of the points.
        * @protected @type {string} */
        this.color = opts.color || "#FF5733";

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

        //set color
        cg.ctx.fillStyle = this.color;

        //compute max number of points per cell
        const nbMaxCell = this.nbMaxPix * r * r / (zf * zf)

        const r2 = r / 2
        for (let cell of cells) {

            //get center
            const offset = this.offset(cell, r, zf)
            const cx = cell.x + r2 + offset.dx
            const cy = cell.y + r2 + offset.dy

            //radius
            const rc = 1 * zf; //pixel radius

            //draw circles
            const nb = nbMaxCell * s(cell[this.col] / stat.max, 0.4);

            for (let i = 0; i <= nb; i++) {
                /*/draw circle
                cg.ctx.beginPath();
                cg.ctx.arc(
                    cx + r * (Math.random() - 0.5),
                    cy + r * (Math.random() - 0.5),
                    rc,
                    0, 2 * Math.PI, false);
                cg.ctx.fill();*/

                cg.ctx.fillRect(
                    cell.x + offset.dx + r * Math.random(),
                    cell.y + offset.dy + r * Math.random(),
                    rc * 2, rc * 2);
            }

        }

    }

}
