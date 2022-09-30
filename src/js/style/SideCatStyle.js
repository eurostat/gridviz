//@ts-check

import { Style, Stat } from "../Style"
import { Cell } from "../Dataset"
import { GeoCanvas } from "../GeoCanvas";

/** @typedef {{x:number,y:number,or:"v"|"h",v1:string,v2:string}} Side */


/**
 * 
 * @author Julien Gaffuri
 */
export class SideStyle extends Style {

    /** @param {object} opts */
    constructor(opts) {
        super(opts)
        opts = opts || {};

        /** The name of the column/attribute of the tabular data where to retrieve the categorical value.
         * @type {string} */
        this.col = opts.col;

        /**
         * The dictionary (string -> color) which give the color of each category.
         * @type {object} */
        this.color = opts.color;

        /** A function returning the width of a cell side, in geo unit
         * @type {function(Side,number,number):number} */
        this.width = opts.width || ((side, r, z) => r * 3);

        /** A fill color for the cells.
        * @type {function(Cell):string} */
        this.fillColor = opts.fillColor
    }


    /**
     * Draw cells as squares depending on their value.
     * 
     * @param {Array.<Cell>} cells 
     * @param {number} r 
     * @param {GeoCanvas} cg 
     */
    draw(cells, r, cg) {

        //zoom factor
        const zf = cg.getZf()

        /**  @type {Array.<Side>} */
        const sides = []

        //make horizontal sides
        //sort cells by x and y
        cells.sort((c1, c2) => c2.x == c1.x ? c1.y - c2.y : c1.x - c2.x)
        let c1 = cells[0]
        for (let i = 1; i < cells.length; i++) {
            let c2 = cells[i]

            if (c1.y + r == c2.y && c1.x == c2.x)
                //cells in same column and touch along horizontal side
                //make shared side
                sides.push({ x: c1.x, y: c2.y, or: "h", "v1": c1[this.col], "v2": c2[this.col] })
            else {
                //cells do not touch along horizontal side
                //make two sides: top one for c1, bottom for c2
                sides.push({ x: c1.x, y: c1.y + r, or: "h", "v1": c1[this.col], "v2": c2[this.col] })
                sides.push({ x: c2.x, y: c2.y, or: "h", "v1": c1[this.col], "v2": c2[this.col] })
            }

            c1 = c2
        }

        //make vertical sides
        //sort cells by y and x
        cells.sort((c1, c2) => c2.y == c1.y ? c1.x - c2.x : c1.y - c2.y)
        c1 = cells[0]
        for (let i = 1; i < cells.length; i++) {
            let c2 = cells[i]

            if (c1.x + r == c2.x && c1.y == c2.y)
                //cells in same row and touch along vertical side
                //make shared side
                sides.push({ x: c1.x + r, y: c1.y, or: "v", "v1": c1[this.col], "v2": c2[this.col] })
            else {
                //cells do not touch along vertical side
                //make two sides: right one for c1, left for c2
                sides.push({ x: c1.x + r, y: c1.y, or: "v", "v1": c1[this.col], "v2": c2[this.col] })
                sides.push({ x: c2.x, y: c2.y, or: "v", "v1": c1[this.col], "v2": c2[this.col] })
            }

            c1 = c2
        }

        //
        if (sides.length == 0) return;

        //draw in geo coordinates
        cg.setCanvasTransform()

        //draw cells, if fillColor specified
        if (this.fillColor)
            for (let c of cells) {
                const fc = this.fillColor(c)
                if (!fc || fc == "none") continue
                cg.ctx.fillStyle = fc;
                cg.ctx.fillRect(c.x, c.y, r, r);
            }


        //draw sides
        cg.ctx.lineCap = "butt";
        const r2 = r / 2
        for (let s of sides) {

            //width
            /** @type {number|undefined} */
            const wG = this.width ? this.width(s, r, zf) : undefined
            if (!wG || wG <= 0) continue

            //set color and width
            cg.ctx.lineWidth = wG
            //cg.ctx.strokeStyle = col

            //draw segment with correct orientation
            /*cg.ctx.beginPath();
            if (this.orientation == 90) {
                cg.ctx.moveTo(s.x + r2, s.y + r2);
                if (s.or === "h")
                    cg.ctx.lineTo(s.x + r2, s.y - r2);
                else
                    cg.ctx.lineTo(s.x - r2, s.y + r2);
            } else {
                cg.ctx.moveTo(s.x, s.y);
                cg.ctx.lineTo(s.x + (s.or === "h" ? r : 0), s.y + (s.or === "v" ? r : 0));
            }
            cg.ctx.stroke();*/

        }

        //update legends
        this.updateLegends({ style: this, r: r, zf: zf });
    }

}
