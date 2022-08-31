//@ts-check

import { Style, Stat, getStatistics, Shape } from "../Style"
import { Cell } from "../Dataset"
import { GeoCanvas } from "../GeoCanvas";
import { makeWebGLCanvas } from "../utils/webGLUtils";
import { WebGLSquareColoring2 } from "../utils/WebGLSquareColoring2";
import { monitor, monitorDuration } from "../utils/Utils"

/**
 * Style based on webGL
 * To show cells as colored squares
 * Alls squares with the same size
 * 
 * @author Julien Gaffuri
 */
export class SquareColoringWebGLStyle2 extends Style {

    /** @param {object} opts */
    constructor(opts) {
        super(opts)
        opts = opts || {};

        /** The name of the column/attribute of the tabular data where to retrieve the variable for color.
         *  @protected @type {string} */
        this.colorCol = opts.colorCol;

        /** A function returning the t value (within [0,1]) of the cell.
        * @protected @type {function(number,number,Stat):number} */
        this.tFun = opts.tFun || ((v, r, s) => v / s.max);

        /** A parameter within [0,Inf] to deform the distribution. 1: no deformation. <1: better show small values. >1: better show large values.
         * The deformation is performed on GPU side (fragment shader).
         *  @protected @type {number} */
        this.deformationFactor = opts.deformationFactor || 1.0

        /** The sample of the color ramp.
         * The color is computed on GPU side (fragment shader) based on those values (linear interpolation).
         *  @protected @type {Array.<string>} */
        this.colors = opts.colors || ["red", "yellow"]
        if (opts.color)
            this.colors = [opts.color(0), opts.color(1 / 3), opts.color(2 / 3), opts.color(1)]

        /** A function returning the size of the cells, in geographical unit.
        * @protected @type {function(number,number):number} */
        this.size = opts.size; // (resolution, zf) => ...
    }


    /**
     * @param {Array.<Cell>} cells 
     * @param {number} resolution 
     * @param {GeoCanvas} cg 
     */
    draw(cells, resolution, cg) {
        if (monitor) monitorDuration("*** SquareColoringWebGLStyle draw")

        //zoom factor
        const zf = cg.getZf()

        //compute color variable statistics
        const statColor = getStatistics(cells, c => c[this.colorCol], true)
        if (monitor) monitorDuration("   color stats computation")

        if (!statColor) return

        //create canvas and webgl renderer
        const cvWGL = makeWebGLCanvas(cg.w + "", cg.h + "")
        if (!cvWGL) {
            console.error("No webGL")
            return
        }
        if (monitor) monitorDuration("   web GL canvas creation")

        //add vertice and fragment data
        let col
        const r2 = resolution / 2
        let c, nb = cells.length
        const verticesBuffer = []
        const tBuffer = []
        for (let i = 0; i < nb; i++) {
            c = cells[i]
            const t = this.tFun(c[this.colorCol], resolution, statColor)
            verticesBuffer.push(c.x + r2, c.y + r2)
            tBuffer.push(t)
        }

        if (monitor) monitorDuration("   webgl drawing data preparation")

        const sizeGeo = this.size ? this.size(resolution, zf) : resolution + 0.2 * zf
        const wgp = new WebGLSquareColoring2(cvWGL.gl, this.colors, this.deformationFactor, sizeGeo / zf)

        if (monitor) monitorDuration("   webgl program preparation")

        //draw
        wgp.draw(verticesBuffer, tBuffer, cg.getWebGLTransform())

        if (monitor) monitorDuration("   webgl drawing")

        //draw in canvas geo
        cg.initCanvasTransform()
        cg.ctx.drawImage(cvWGL.canvas, 0, 0);

        if (monitor) monitorDuration("   canvas drawing")

        //update legends
        this.updateLegends({ style: this, r: resolution, zf: zf, sColor: statColor });

        if (monitor) monitorDuration("*** SquareColoringWebGLStyle end draw")
    }


    //getters and setters

    //TODO

}
