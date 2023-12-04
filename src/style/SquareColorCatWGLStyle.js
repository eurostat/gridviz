//@ts-check
'use strict'

import { Style } from '../core/Style.js'
import { makeWebGLCanvas } from '../utils/webGLUtils.js'
import { WebGLSquareColoringCatAdvanced } from '../utils/WebGLSquareColoringCatAdvanced.js'

/**
 * Style based on webGL
 * To show cells as colored squares, from categories.
 * All cells are drawn as squares, with the same size
 *
 * @author Julien Gaffuri
 */
export class SquareColorCatWGLStyle extends Style {
    /** @param {object} opts */
    constructor(opts) {
        super(opts)
        opts = opts || {}

        /** A function that returns a cell color.
         * @type {function(import('../core/Dataset').Cell, number, number, object):string} */
        this.color = opts.color

        /**
         * The dictionary (code -> color) which gives the color of each category code.
         * @type {object} */
        //opts.color = opts.color || undefined

        /** @type { Array.<string> } */
        //const codes = Object.keys(opts.color)

        /** @type { object } @private */
        /*this.catToI = {}
        for (let i = 0; i < codes.length; i++) this.catToI[codes[i]] = i + ''*/

        /** @type { Array.<string> } @private */
        /*this.colors = []
        for (const code of codes)
            this.colors.push(opts.color['' + code])*/

        /**
         * A function returning the size of the cells, in geographical unit. All cells have the same size.
         * @type {function(number,number):number} */
        this.size = opts.size // (resolution, z) => ...
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

        //get view scale
        const viewScale = this.viewScale ? this.viewScale(cells, resolution, z) : undefined

        //get list of colors
        /** @type { Array.<string> } */
        const colors = []
        for (const cell of cells) {
            const color = this.color(cell, resolution, z, viewScale)
            if (colors.includes(color)) continue
            colors.push(color)
        }

        //make index: color -> i
        const index = {}
        for (let i = 0; i < colors.length; i++) index[colors[i]] = i + ''

        //add vertice and fragment data
        const r2 = resolution / 2
        let cell, nb = cells.length
        const verticesBuffer = []
        const iBuffer = []
        for (let i = 0; i < nb; i++) {
            cell = cells[i]
            const color = this.color(cell, resolution, z, viewScale)
            if (color == undefined) {
                console.log('Unexpected color: ' + color)
                continue
            }
            /** @type {number} */
            const i_ = index[color]
            if (isNaN(+i_)) {
                console.log('Unexpected color index: ' + color + ' ' + i_)
                continue
            }
            verticesBuffer.push(cell.x + r2, cell.y + r2)
            iBuffer.push(+i_)
        }

        //create canvas and webgl renderer
        const cvWGL = makeWebGLCanvas(geoCanvas.w + '', geoCanvas.h + '')
        if (!cvWGL) {
            console.error('No webGL')
            return
        }

        /** @type { WebGLSquareColoringCatAdvanced } */
        const wgp = new WebGLSquareColoringCatAdvanced(colors)

        //draw
        const sizeGeo = this.size ? this.size(resolution, z) : resolution + 0.2 * z
        wgp.draw(cvWGL.gl, verticesBuffer, iBuffer, geoCanvas.getWebGLTransform(), sizeGeo / z)

        //draw in canvas geo
        geoCanvas.initCanvasTransform()
        geoCanvas.ctx.drawImage(cvWGL.canvas, 0, 0)

        //update legends
        this.updateLegends({ style: this, resolution: resolution, z: z })
    }
}
