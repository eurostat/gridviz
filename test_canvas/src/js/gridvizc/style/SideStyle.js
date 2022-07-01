//@ts-check

import { Style, Stat } from "../Style"
import { Cell } from "../Dataset"
import { GeoCanvas } from "../GeoCanvas";

/** @typedef {{x:number,y:number,or:"v"|"h",value:number}} Side */


/**
 * 
 * @author Julien Gaffuri
 */
export class SideStyle extends Style {

    /** @param {object} opts */
    constructor(opts) {
        super(opts)
        opts = opts || {};

        /** A function returning the value of a cell side. This value is computed from the two adjacent cells.
         * For horizontal sides, c1 is below and c2 above.
         * For vertical sides, c1 is left and c2 right.
        * @private @type {function(Cell,Cell):number} */
        this.value = opts.value || ((c1, c2) => 100 * Math.random());

        /** A function returning the color of a cell side.
        * @private @type {function(Side,number,Stat|undefined):string} */
        this.color = opts.color || (() => "#EA6BAC");

        /** A function returning the width of a cell side, in geo unit
         * @private @type {function(Side,number,Stat|undefined,number):number} */
        this.width = opts.width || ((side, r, s, z) => r * side.value/500);
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

            //cells should be in the same column
            //cells should be touching along horizontal side
            if (c1.x == c2.x && c1.y + r == c2.y)
                //make side
                sides.push({ x: c1.x, y: c2.y, or: "h", value: this.value(c1, c2) })

            c1 = c2
        }

        //make vertical sides
        //sort cells by y and x
        cells.sort((c1, c2) => c2.y == c1.y ? c1.x - c2.x : c1.y - c2.y)
        c1 = cells[0]
        for (let i = 1; i < cells.length; i++) {
            let c2 = cells[i]

            //cells should be in the same row
            //cells should be touching along vertical side
            if (c1.y == c2.y && c1.x + r == c2.x)
                //make side
                sides.push({ x: c1.x, y: c2.y, or: "v", value: this.value(c1, c2) })

            c1 = c2
        }

        //compute stats on sides
        const statSides = getStatistics(sides, true)

        //draw sides

        //draw in geo coordinates
        cg.setCanvasTransform()

        cg.ctx.lineCap = "butt";
        for (let s of sides) {

            //color
            /** @type {string|undefined} */
            const col = this.color ? this.color(s, r, statSides) : undefined
            if (!col) continue

            //width
            /** @type {number|undefined} */
            const wG = this.width ? this.width(s, r, statSides, zf) : undefined
            if (!wG || wG < 0) continue

            //set color and width
            cg.ctx.strokeStyle = col
            cg.ctx.lineWidth = wG

            //draw segment with correct orientation
            cg.ctx.beginPath();
            cg.ctx.moveTo(s.x, s.y);
            cg.ctx.lineTo(s.x + (s.or === "h" ? r : 0), s.y + (s.or === "v" ? r : 0));
            cg.ctx.stroke();

        }
    }


    //getters and setters
    //TODO


}



/**
 * Compute some statistics on a value of some sides.
 * This is used to define how to draw specifically the sides within the view.
 * 
 * @param {Array.<Side>} sides 
 * @param {boolean} ignoreZeros
 * @returns {Stat | undefined}
 */
const getStatistics = function (sides, ignoreZeros) {
    if (!sides || sides.length == 0) return undefined
    let min = Infinity
    let max = -Infinity
    //let sum = 0
    //let nb = 0
    for (const s of sides) {
        const v = s.value
        if (ignoreZeros && !v) continue
        if (v < min) min = v
        if (v > max) max = v
        //sum += v
        //nb++
    }
    return { min: min, max: max, }
}
