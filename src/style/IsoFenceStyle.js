//@ts-check
'use strict'

import { Style } from '../Style.js'

/** @typedef {{x:number,y:number,or:"v"|"h",c1:import('../Dataset.js').Cell|undefined,c2:import('../Dataset.js').Cell|undefined}} Side */

/**
 * @author Julien Gaffuri
 */
export class IsoFenceStyle extends Style {

    /** @param {object} opts */
    constructor(opts) {
        super(opts)
        opts = opts || {}

        /**
         * The dictionary (string -> color) which give the color of each category.
         * @type {object} */
        this.color = opts.color

        /** The column where to get the height values.
         * @type {string} */
        this.heightCol = opts.heightCol

        /** A function returning the height of a cell.
         * @type {function(number,number,import("../Style").Stat|undefined,number):number} */
        this.height = opts.height || ((v, r, s, zf) => r * 0.4)

        /** The perspective angle.
         * @type {number} */
        this.angle = opts.angle
    }

    /**
     * Draw cells as segments.
     *
     * @param {Array.<import("../Dataset.js").Cell>} cells
     * @param {number} r
     * @param {import("../GeoCanvas.js").GeoCanvas} cg
     */
    draw(cells, r, cg) {
        //filter
        if (this.filter) cells = cells.filter(this.filter)

        //zoom factor
        const zf = cg.getZf()

        let stat
        if (this.heightCol) {
            //if size is used, sort cells by size so that the biggest are drawn first
            cells.sort((c1, c2) => c2[this.heightCol] - c1[this.heightCol])
            //and compute statistics
            stat = Style.getStatistics(cells, (c) => c[this.heightCol], true)
        }

        //nb categories - used for radar and agepyramid
        const nbCat = Object.entries(this.color).length

        //draw in geo coordinates
        cg.setCanvasTransform()

        //draw calls
        for (let cell of cells) {
            //height
            /** @type {function(number,number,import("../Style").Stat|undefined,number):number} */
            let h_ = this.height
            //height - in geo
            /** @type {number} */
            const hG = h_(cell[this.heightCol], r, stat, zf)

            //make sides
            /**  @type {Array.<Side>} */
            const sides = []

            //make horizontal sides
            //sort cells by x and y
            cells.sort((c1, c2) => (c2.x == c1.x ? c1.y - c2.y : c1.x - c2.x))
            let c1 = cells[0]
            for (let i = 1; i < cells.length; i++) {
                let c2 = cells[i]

                if ((c1.y + r == c2.y) && (c1.x == c2.x))
                    //cells in same column and touch along horizontal side
                    //make shared side
                    sides.push({ x: c1.x, y: c2.y, or: 'h', c1: c1, c2: c2 })
                else {
                    //cells do not touch along horizontal side
                    //make two sides: top one for c1, bottom for c2
                    sides.push({ x: c1.x, y: c1.y + r, or: 'h', c1: c1, c2: undefined })
                    sides.push({ x: c2.x, y: c2.y, or: 'h', c1: undefined, c2: c2 })
                }

                c1 = c2
            }

            //make vertical sides
            //sort cells by y and x
            cells.sort((c1, c2) => (c2.y == c1.y ? c1.x - c2.x : c1.y - c2.y))
            c1 = cells[0]
            for (let i = 1; i < cells.length; i++) {
                let c2 = cells[i]

                if ((c1.x + r == c2.x) && (c1.y == c2.y))
                    //cells in same row and touch along vertical side
                    //make shared side
                    sides.push({ x: c1.x + r, y: c1.y, or: 'v', c1: c1, c2: c2 })
                else {
                    //cells do not touch along vertical side
                    //make two sides: right one for c1, left for c2
                    sides.push({ x: c1.x + r, y: c1.y, or: 'v', c1: c1, c2: undefined })
                    sides.push({ x: c2.x, y: c2.y, or: 'v', c1: undefined, c2: c2 })
                }

                c1 = c2
            }

            //
            if (sides.length == 0) return




        }

        //update legends
        this.updateLegends({ style: this, r: r, zf: zf, sSize: stat })
    }
}
