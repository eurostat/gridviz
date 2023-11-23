//@ts-check
'use strict'

import { Style } from '../Style.js'

/**
 * @author Julien Gaffuri
 */
export class MosaicStyle extends Style {
    /** @param {object} opts */
    constructor(opts) {
        super(opts)
        opts = opts || {}

        /** The name of the column/attribute of the tabular data where to retrieve the variable for color.
         * @type {string} */
        this.colorCol = opts.colorCol

        /** A function returning the color of the cell.
         * @type {function(number,number,import("../Style").Stat|undefined):string} */
        this.color = opts.color || (() => '#EA6BAC')

        /** The mosaic factor, within [0,0.5]. Set to 0 for no mosaic effect. Set to 0.5 for strong mosaic effect.
         * @type {number} */
        this.mosaicFactor = opts.mosaicFactor || 0.15

        /** The mosaic shadow factor, within [0,0.5]. Set to 0 for no mosaic shadow. Set to 0.5 for strong mosaic shadow.
         * @type {number} */
        this.shadowFactor = opts.shadowFactor || 0.2

        /** The mosaic shadow color.
         * @type {string} */
        this.shadowColor = opts.shadowColor || '#555'
    }

    /**
     *
     * @param {Array.<import("../Dataset").Cell>} cells
     * @param {number} resolution
     * @param {import("../GeoCanvas").GeoCanvas} cg
     */
    draw(cells, resolution, cg) {
        //filter
        if (this.filter) cells = cells.filter(this.filter)

        //
        const zf = cg.getZf()

        let statColor
        if (this.colorCol) {
            //compute color variable statistics
            statColor = Style.getStatistics(cells, (c) => c[this.colorCol], true)
        }

        //set stroke style, for shadow
        cg.ctx.strokeStyle = this.shadowColor
        cg.ctx.lineWidth = this.shadowFactor * resolution
        cg.ctx.lineJoin = 'round'
        cg.ctx.lineCap = 'butt'

        //function to compute position mosaic effect
        const d = resolution * this.mosaicFactor
        const mosaic = () => {
            return { x: Math.random() * d, y: Math.random() * d }
        }

        for (let cell of cells) {
            //set fill color
            const col = this.color ? this.color(cell[this.colorCol], resolution, statColor) : undefined
            if (!col || col === 'none') continue
            cg.ctx.fillStyle = col

            //get offset
            const offset = this.offset(cell, resolution, zf)

            //compute position mosaic effect
            const ll = mosaic(),
                ul = mosaic(),
                lr = mosaic(),
                ur = mosaic()

            //stroke
            if (this.shadowFactor > 0) {
                cg.ctx.beginPath()
                cg.ctx.moveTo(cell.x + offset.dx + ll.x, cell.y + offset.dy + ll.y)
                cg.ctx.lineTo(cell.x + offset.dx + resolution - lr.x, cell.y + offset.dy + lr.y)
                cg.ctx.lineTo(cell.x + offset.dx + resolution - ur.x, cell.y + offset.dy + resolution - ur.y)
                cg.ctx.stroke()
            }

            //fill

            cg.ctx.beginPath()
            cg.ctx.moveTo(cell.x + offset.dx + ll.x, cell.y + offset.dy + ll.y)
            cg.ctx.lineTo(cell.x + offset.dx + resolution - lr.x, cell.y + offset.dy + lr.y)
            cg.ctx.lineTo(cell.x + offset.dx + resolution - ur.x, cell.y + offset.dy + resolution - ur.y)
            cg.ctx.lineTo(cell.x + offset.dx + ul.x, cell.y + offset.dy + resolution - ul.y)
            cg.ctx.fill()
        }

        //update legends
        this.updateLegends({ style: this, r: resolution, zf: zf, sColor: statColor })
    }
}
