//@ts-check
'use strict'

import { Style } from '../Style.js'
import { randomNormal } from 'd3-random'
import { checkWebGLSupport, makeWebGLCanvas } from '../utils/webGLUtils.js'
import { WebGLSquareColoring } from '../utils/WebGLSquareColoring.js'
import { color } from 'd3-color'
import { monitor, monitorDuration } from '../utils/Utils.js'

/**
 *
 * @author Julien Gaffuri
 */
export class DotDensityStyle extends Style {
    /** @param {object} opts */
    constructor(opts) {
        super(opts)
        opts = opts || {}

        /** The name of the column/attribute of the tabular data where to retrieve the variable for dot number.
         * @type {string} */
        this.nbCol = opts.nbCol

        /** A function returning the number of dots for a cell value.
         * @type {function(number,number,import("../Style").Stat,number):number} */
        this.nb = opts.nb || ((v, r, s, zf) => (((0.3 * r * r) / (zf * zf)) * v) / s.max)

        /** The color of the dots. Same color for all dots within a cell.
         * @type {function(import("../Dataset").Cell):string} */
        this.color = opts.color || (() => '#FF5733')

        /** A function returning the size of the dots, in geo unit.
         * @type {function(number,number):number} */
        this.dotSize = opts.dotSize //|| ((r, zf) => ...

        /** A function returning the sigma of the distribution from the resolution, in geo unit.
         * @type {function(number,number):number} */
        this.sigma = opts.sigma //|| ((r,zf) => ...
    }

    /**
     * Draw cells as text.
     *
     * @param {Array.<import("../Dataset").Cell>} cells
     * @param {number} r
     * @param {import("../GeoCanvas").GeoCanvas} cg
     */
    draw(cells, r, cg) {
        if (monitor) monitorDuration('*** DotDensityStyle draw')

        //filter
        if (this.filter) cells = cells.filter(this.filter)

        //
        const zf = cg.view.z

        let stat
        if (this.nbCol) stat = Style.getStatistics(cells, (c) => c[this.nbCol], true)
        if (!stat) return

        //size of the dots
        const sGeo = this.dotSize ? this.dotSize(r, zf) : 2 * zf

        //make random function
        const sig = this.sigma ? this.sigma(r, zf) : r * 0.4
        const rand = randomNormal(0, sig)

        if (monitor) monitorDuration(' preparation')

        if (checkWebGLSupport()) {
            //create canvas and webgl renderer
            const cvWGL = makeWebGLCanvas(cg.w + '', cg.h + '')
            if (!cvWGL) {
                console.error('No webGL')
                return
            }

            //create webGL program
            const prog = new WebGLSquareColoring(cvWGL.gl, sGeo / zf)

            if (monitor) monitorDuration(' webgl creation')

            const r2 = r / 2

            let col, offset, nb, cx, cy, cc
            for (let c of cells) {
                //get color
                col = this.color(c)
                if (!col || col === 'none') continue

                //get offset
                offset = this.offset(c, r, zf)

                //number of dots
                nb = this.nb(c[this.nbCol], r, stat, zf)

                //cell center
                cx = c.x + offset.dx + r2
                cy = c.y + offset.dy + r2

                //convert color
                cc = color(col)
                if (!cc) return

                //random points
                for (let i = 0; i <= nb; i++)
                    prog.addPointData2(cx + rand(), cy + rand(), cc.r, cc.g, cc.b, cc.opacity)
            }

            if (monitor) monitorDuration(' data preparation')

            //draw
            prog.draw(cg.getWebGLTransform())

            if (monitor) monitorDuration(' webgl drawing')

            //draw in canvas geo
            cg.initCanvasTransform()
            cg.ctx.drawImage(cvWGL.canvas, 0, 0)

            if (monitor) monitorDuration(' canvas drawing')
        } else {
            for (let c of cells) {
                //get color
                const col = this.color(c)
                if (!col || col === 'none') continue
                //set color
                cg.ctx.fillStyle = col

                //get offset
                const offset = this.offset(c, r, zf)

                //number of dots
                const nb = this.nb(c[this.nbCol], r, stat, zf)

                //draw random dots
                const cx = c.x + offset.dx + r / 2,
                    cy = c.y + offset.dy + r / 2
                for (let i = 0; i <= nb; i++) {
                    cg.ctx.fillRect(cx + rand(), cy + rand(), sGeo, sGeo)
                }
            }
        }

        //update legends
        this.updateLegends({ style: this, r: r, zf: zf })

        if (monitor) monitorDuration('*** DotDensityStyle end draw')
    }
}
