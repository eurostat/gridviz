//@ts-check
'use strict'

import { Style } from '../Style.js'
import { makeWebGLCanvas } from '../utils/webGLUtils.js'
import { WebGLSquareColoringAdvanced } from '../utils/WebGLSquareColoringAdvanced.js'
import { monitor, monitorDuration } from '../utils/Utils.js'

/**
 * Style based on webGL
 * To show cells as colored squares, with computation of the colors on GPU side (faster than JavaScript side).
 * Alls squares with the same size
 *
 * @author Julien Gaffuri
 */
export class SquareColorWGLStyle extends Style {
    /** @param {object} opts */
    constructor(opts) {
        super(opts)
        opts = opts || {}

        /**
         * The name of the column/attribute of the tabular data where to retrieve the variable for color.
         * @type {string} */
        this.colorCol = opts.colorCol

        /**
         * A function returning the t value (within [0,1]) of the cell.
         * @type {function(number,number,import("../Style").Stat):number} */
        this.tFun = opts.tFun || ((v, r, s) => v / s.max)

        /**
         * Distribution stretching method.
         * The stretching is performed on GPU side (fragment shader).
         * @type {{ fun:string, alpha:number }} */
        this.stretching = opts.stretching

        /**
         * The sample of the color ramp.
         * The color is computed on GPU side (fragment shader) based on those values (linear interpolation).
         * @type {Array.<string>} */
        this.colors =
            opts.colors ||
            [
                'rgb(158, 1, 66)',
                'rgb(248, 142, 83)',
                'rgb(251, 248, 176)',
                'rgb(137, 207, 165)',
                'rgb(94, 79, 162)',
            ].reverse()
        if (opts.color)
            this.colors = [
                opts.color(0),
                opts.color(0.2),
                opts.color(0.4),
                opts.color(0.6),
                opts.color(0.8),
                opts.color(1),
            ]

        /**
         * Define the opacity of the style, within [0,1].
         * If this opacity is defined, the individual color opacity will be ignored.
         * @type {function(number,number):number} */
        this.opacity = opts.opacity // (r,zf) => ...

        /**
         * A function returning the size of the cells, in geographical unit. All cells have the same size.
         * @type {function(number,number):number} */
        this.size = opts.size // (resolution, zf) => ...
    }

    /**
     * @param {Array.<import("../Dataset").Cell>} cells
     * @param {number} r
     * @param {import("../GeoCanvas").GeoCanvas} cg
     */
    draw(cells, r, cg) {
        if (monitor) monitorDuration('*** SquareColorWGLStyle draw')

        //filter
        if (this.filter) cells = cells.filter(this.filter)

        //
        const zf = cg.view.z

        //compute color variable statistics
        const statColor = Style.getStatistics(cells, (c) => c[this.colorCol], true)
        if (monitor) monitorDuration('   color stats computation')

        if (!statColor) return

        //create canvas and webgl renderer
        //for opacity control, see: https://webglfundamentals.org/webgl/lessons/webgl-and-alpha.html
        const cvWGL = makeWebGLCanvas(
            cg.w + '',
            cg.h + '',
            this.opacity != undefined ? { premultipliedAlpha: false } : undefined
        )
        if (!cvWGL) {
            console.error('No webGL')
            return
        }
        if (monitor) monitorDuration('   web GL canvas creation')

        //add vertice and fragment data
        const r2 = r / 2
        const verticesBuffer = []
        const tBuffer = []
        for (let c of cells) {
            const t = this.tFun(c[this.colorCol], r, statColor)
            if (t == null || t == undefined) continue
            verticesBuffer.push(c.x + r2, c.y + r2)
            tBuffer.push(t > 1 ? 1 : t < 0 ? 0 : t)
        }

        if (monitor) monitorDuration('   webgl drawing data preparation')

        //compute pixel size
        const sizeGeo = this.size ? this.size(r, zf) : r + 0.2 * zf

        //compute opacity
        const op = this.opacity ? this.opacity(r, zf) : undefined

        //
        const wgp = new WebGLSquareColoringAdvanced(cvWGL.gl, this.colors, this.stretching, sizeGeo / zf, op)

        if (monitor) monitorDuration('   webgl program preparation')

        //draw
        wgp.draw(verticesBuffer, tBuffer, cg.getWebGLTransform())

        if (monitor) monitorDuration('   webgl drawing')

        //draw in canvas geo
        cg.initCanvasTransform()
        cg.ctx.drawImage(cvWGL.canvas, 0, 0)

        if (monitor) monitorDuration('   canvas drawing')

        //update legends
        this.updateLegends({ style: this, r: r, zf: zf, sColor: statColor })

        if (monitor) monitorDuration('*** SquareColorWGLStyle end draw')
    }
}
