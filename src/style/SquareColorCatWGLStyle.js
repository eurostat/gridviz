//@ts-check
'use strict'

import { Style } from '../Style.js'
import { makeWebGLCanvas } from '../utils/webGLUtils.js'
import { WebGLSquareColoringCatAdvanced } from '../utils/WebGLSquareColoringCatAdvanced.js'
import { monitor, monitorDuration } from '../utils/Utils.js'

/**
 * Style based on webGL
 * To show cells as colored squares, from categories.
 * Alls squares with the same size
 *
 * @author Julien Gaffuri
 */
export class SquareColorCatWGLStyle extends Style {
    /** @param {object} opts */
    constructor(opts) {
        super(opts)
        opts = opts || {}

        /**
         * The name of the column/attribute of the tabular data where to retrieve the category of the cell, for coloring.
         * @type {string} */
        this.colorCol = opts.colorCol

        /**
         * The dictionary (string -> color) which give the color of each category.
         * @type {object} */
        opts.color = opts.color || undefined

        /** @type { Array.<string> } @private */
        const keys = Object.keys(opts.color)

        /** @type { object } @private */
        this.catToI = {}
        for (let i = 0; i < keys.length; i++) this.catToI[keys[i]] = i + ''

        /** @type { Array.<string> } @private */
        this.colors = []
        for (let i = 0; i < keys.length; i++) {
            this.colors.push(opts.color['' + keys[i]])
        }

        /**
         * A function returning the size of the cells, in geographical unit. All cells have the same size.
         * @type {function(number,number):number} */
        this.size = opts.size // (resolution, zf) => ...

        /**
         * @private
         * @type { WebGLSquareColoringCatAdvanced } */
        this.wgp = new WebGLSquareColoringCatAdvanced(this.colors)
    }

    /**
     * @param {Array.<import("../Dataset").Cell>} cells
     * @param {number} r
     * @param {import("../GeoCanvas").GeoCanvas} cg
     */
    draw(cells, r, cg) {
        if (monitor) monitorDuration('*** SquareColorCatWGLStyle draw')

        //filter
        if (this.filter) cells = cells.filter(this.filter)

        //
        const zf = cg.getZf()

        //add vertice and fragment data
        const r2 = r / 2
        let c,
            nb = cells.length
        const verticesBuffer = []
        const iBuffer = []
        for (let i = 0; i < nb; i++) {
            c = cells[i]
            const cat = c[this.colorCol]
            if (cat == undefined) {
                console.log('Unexpected category: ' + cat)
                continue
            }
            /** @type {number} */
            const i_ = this.catToI[cat]
            if (isNaN(+i_)) {
                console.log('Unexpected category index: ' + cat + ' ' + i_)
                continue
            }
            verticesBuffer.push(c.x + r2, c.y + r2)
            iBuffer.push(+i_)
        }

        if (monitor) monitorDuration('   webgl program inputs preparation')

        //create canvas and webgl renderer
        const cvWGL = makeWebGLCanvas(cg.w + '', cg.h + '')
        if (!cvWGL) {
            console.error('No webGL')
            return
        }
        if (monitor) monitorDuration('   web GL canvas creation')

        //draw
        const sizeGeo = this.size ? this.size(r, zf) : r + 0.2 * zf
        this.wgp.draw(cvWGL.gl, verticesBuffer, iBuffer, cg.getWebGLTransform(), sizeGeo / zf)

        if (monitor) monitorDuration('   webgl drawing')

        //draw in canvas geo
        cg.initCanvasTransform()
        cg.ctx.drawImage(cvWGL.canvas, 0, 0)

        if (monitor) monitorDuration('   canvas drawing')

        //update legends
        this.updateLegends({ style: this, r: r, zf: zf })

        if (monitor) monitorDuration('*** SquareColorCatWGLStyle end draw')
    }
}
