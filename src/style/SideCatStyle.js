//@ts-check
'use strict'

import { SideStyle } from './SideStyle.js'

/**
 * A style to show the sides of grid cells based on their different categories.
 *
 * @author Julien Gaffuri
 */
export class SideCatStyle extends SideStyle {
    /** @param {object} opts */
    constructor(opts) {
        super(opts)
        opts = opts || {}

        /** A function returning the category code of a cell.
         * @type {function(import('../core/Dataset').Cell, number, number):string} */
        this.code = opts.code

        /**
         * The dictionary (string -> color) which give the color of each category.
         * @type {object} */
        this.color = opts.color

    }

    /**
     * @param {Array.<import("../core/Dataset").Cell>} cells
     * @param {import("../core/GeoCanvas").GeoCanvas} geoCanvas
     * @param {number} resolution
     */
    draw(cells, geoCanvas, resolution) {


        //filter
        if (this.filter) cells = cells.filter(this.filter)

        //
        const z = geoCanvas.view.z

        //build sides

        /**  @type {Array.<import('./SideStyle.js').Side>} */
        const sides = SideStyle.buildSides(cells, resolution)
        if (sides.length == 0) return

        //get side view scale
        const viewScale = this.viewScale ? this.viewScale(sides, resolution, z) : undefined

        //draw sides

        geoCanvas.ctx.lineCap = 'butt'
        for (let s of sides) {

            //width
            /** @type {number|undefined} */
            const wG = this.width ? this.width(s, resolution, z) : undefined
            if (!wG || wG <= 0) continue
            const w2 = wG * 0.5

            //set color and width
            geoCanvas.ctx.lineWidth = wG

            //draw segment with correct orientation
            if (s.or === 'h') {
                //top line
                if (s.v2) {
                    geoCanvas.ctx.beginPath()
                    geoCanvas.ctx.strokeStyle = this.color[s.v2]
                    geoCanvas.ctx.moveTo(s.x, s.y + w2)
                    geoCanvas.ctx.lineTo(s.x + resolution, s.y + w2)
                    geoCanvas.ctx.stroke()
                }

                //bottom line
                if (s.v1) {
                    geoCanvas.ctx.beginPath()
                    geoCanvas.ctx.strokeStyle = this.color[s.v1]
                    geoCanvas.ctx.moveTo(s.x, s.y - w2)
                    geoCanvas.ctx.lineTo(s.x + resolution, s.y - w2)
                    geoCanvas.ctx.stroke()
                }
            } else {
                //right line
                if (s.v2) {
                    geoCanvas.ctx.beginPath()
                    geoCanvas.ctx.strokeStyle = this.color[s.v2]
                    geoCanvas.ctx.moveTo(s.x + w2, s.y)
                    geoCanvas.ctx.lineTo(s.x + w2, s.y + resolution)
                    geoCanvas.ctx.stroke()
                }

                //left line
                if (s.v1) {
                    geoCanvas.ctx.beginPath()
                    geoCanvas.ctx.strokeStyle = this.color[s.v1]
                    geoCanvas.ctx.moveTo(s.x - w2, s.y)
                    geoCanvas.ctx.lineTo(s.x - w2, s.y + resolution)
                    geoCanvas.ctx.stroke()
                }
            }
        }

        //update legends
        this.updateLegends({ style: this, r: resolution, z: z })
    }
}
