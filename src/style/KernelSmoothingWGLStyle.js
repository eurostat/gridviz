//@ts-check
'use strict'

import { Style } from '../Style.js'
import { makeWebGLCanvas } from '../utils/webGLUtils'
import { WebGLSquareColoringKS } from '../utils/WebGLSquareColoringKS'

/**
 * @author Julien Gaffuri
 */
export class KernelSmoothingStyle extends Style {
    //see
    //https://stackoverflow.com/questions/8099979/creating-a-glsl-arrays-of-uniforms
    //see https://gist.github.com/jasonkit/c5b4fd62e8cbfe2780cc

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
        //filter
        if (this.filter) cells = cells.filter(this.filter)

        //zoom factor
        const zf = cg.getZf()

        //compute color variable statistics
        const statColor = Style.getStatistics(cells, (c) => c[this.colorCol], true)

        if (!statColor) return

        //create canvas and webgl renderer
        const cvWGL = makeWebGLCanvas(cg.w + '', cg.h + '')
        if (!cvWGL) {
            console.error('No webGL')
            return
        }

        //add vertice and fragment data
        const r2 = r / 2
        let c,
            nb = cells.length
        const verticesBuffer = []
        //const tBuffer = []
        for (let i = 0; i < nb; i++) {
            c = cells[i]
            const t = this.tFun(c[this.colorCol], r, statColor)
            if (t == null || t == undefined) continue
            verticesBuffer.push(c.x + r2, c.y + r2)
            //tBuffer.push(t > 1 ? 1 : t < 0 ? 0 : t)
        }

        const sizeGeo = this.size ? this.size(r, zf) : r + 0.2 * zf
        const wgp = new WebGLSquareColoringKS(cvWGL.gl, this.colors, this.stretching, sizeGeo / zf)

        //TODO - [i,j,t]
        let data = []
        for (const c of cells) {
            const xGL = cg.geoToPixX(c.x + r2) //TODO within [-1,1] ?
            data.push(xGL)
            const yGL = cg.geoToPixY(c.y + r2) //TODO within [-1,1] ?
            data.push(yGL)
            const t = this.tFun(c[this.colorCol], r, statColor)
            data.push(t)
        }

        data = [0.0, 2.0, 1.0, 0.0, 0.0, 0.0]

        //draw
        wgp.draw(verticesBuffer, data, cg.getWebGLTransform())

        //draw in canvas geo
        cg.initCanvasTransform()
        cg.ctx.drawImage(cvWGL.canvas, 0, 0)

        //update legends
        this.updateLegends({ style: this, r: r, zf: zf, sColor: statColor })
    }
}
