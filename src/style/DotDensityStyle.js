//@ts-check
'use strict'

import { Style } from '../core/Style.js'
import { randomNormal } from 'd3-random'
import { checkWebGLSupport, makeWebGLCanvas } from '../utils/webGLUtils.js'
import { WebGLSquareColoring } from '../utils/WebGLSquareColoring.js'
import { color } from 'd3-color'
import { monitor, monitorDuration } from '../utils/utils.js'

/**
 *
 * @author Julien Gaffuri
 */
export class DotDensityStyle extends Style {
    /** @param {object} opts */
    constructor(opts) {
        super(opts)
        opts = opts || {}

        /** A function returning the number of dots for a cell value.
         * @type {function(import('../core/Dataset.js').Cell,number, number,object):number} */
        this.dotNumber = opts.dotNumber || ((cell, resolution) => resolution / 100)

        /** The color of the dots. Same color for all dots within a cell.
         * @type {function(import('../core/Dataset.js').Cell,number, number,object):string} */
        this.color = opts.color || (() => '#FF5733') //(c,r,z,vs) => {}

        /** A function returning the size of the dots, in geo unit. Same size for all dots within a cell.
         * @type {function(import('../core/Dataset.js').Cell,number, number,object):number} */
        this.dotSize = opts.dotSize || ((cell, resolution, z) => z) //(c,r,z,vs) => {}

        /** A function returning the sigma of the dots distribution of a cell.
         * @type {function(import('../core/Dataset.js').Cell,number, number,object):number} */
        this.sigma = opts.sigma || ((cell, resolution, z) => resolution)
    }

    /**
     * Draw cells as text.
     *
     * @param {Array.<import("../core/Dataset").Cell>} cells
     * @param {number} resolution
     * @param {import("../core/GeoCanvas").GeoCanvas} geoCanvas
     */
    draw(cells, geoCanvas, resolution) {
        if (monitor) monitorDuration('*** DotDensityStyle draw')

        //filter
        if (this.filter) cells = cells.filter(this.filter)

        //
        const z = geoCanvas.view.z

        let stat
        if (this.nbCol) stat = Style.getStatistics(cells, (c) => c[this.nbCol], true)
        if (!stat) return

        //size of the dots
        const sGeo = this.dotSize ? this.dotSize(resolution, z) : 2 * z

        //make random function
        const sig = this.sigma ? this.sigma(resolution, z) : resolution * 0.4
        const rand = randomNormal(0, sig)

        if (monitor) monitorDuration(' preparation')

        if (checkWebGLSupport()) {
            //create canvas and webgl renderer
            const cvWGL = makeWebGLCanvas(geoCanvas.w + '', geoCanvas.h + '')
            if (!cvWGL) {
                console.error('No webGL')
                return
            }

            //create webGL program
            const prog = new WebGLSquareColoring(cvWGL.gl, sGeo / z)

            if (monitor) monitorDuration(' webgl creation')

            const r2 = resolution / 2

            let col, offset, nb, cx, cy, cc
            for (let c of cells) {
                //get color
                col = this.color(c)
                if (!col || col === 'none') continue

                //get offset
                offset = this.offset(c, resolution, z)

                //number of dots
                nb = this.dotNumber(c[this.nbCol], resolution, stat, z)

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
            prog.draw(geoCanvas.getWebGLTransform())

            if (monitor) monitorDuration(' webgl drawing')

            //draw in canvas geo
            geoCanvas.initCanvasTransform()
            geoCanvas.ctx.drawImage(cvWGL.canvas, 0, 0)

            if (monitor) monitorDuration(' canvas drawing')
        } else {
            for (let c of cells) {
                //get color
                const col = this.color(c)
                if (!col || col === 'none') continue
                //set color
                geoCanvas.ctx.fillStyle = col

                //get offset
                const offset = this.offset(c, resolution, z)

                //number of dots
                const nb = this.dotNumber(c[this.nbCol], resolution, stat, z)

                //draw random dots
                const cx = c.x + offset.dx + resolution / 2,
                    cy = c.y + offset.dy + resolution / 2
                for (let i = 0; i <= nb; i++) {
                    geoCanvas.ctx.fillRect(cx + rand(), cy + rand(), sGeo, sGeo)
                }
            }
        }

        //update legends
        this.updateLegends({ style: this, r: resolution, z: z })

        if (monitor) monitorDuration('*** DotDensityStyle end draw')
    }
}
