//@ts-check

import { Style } from "../Style"
import { GeoCanvas } from "../GeoCanvas";
import { makeWebGLCanvas } from "../utils/webGLUtils";
import { WebGLSquareColoringAdvanced } from "../utils/WebGLSquareColoringAdvanced";
import { monitor, monitorDuration } from "../utils/Utils"

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
        opts = opts || {};

        /**
         * The name of the column/attribute of the tabular data where to retrieve the category of the cell, for coloring.
         * @type {string} */
        this.colorCol = opts.colorCol;

        /**
         * The dictionary (string -> color) which give the color of each category.
         * @type {object} */
         this.color = opts.color;

        /**
         * A function returning the size of the cells, in geographical unit. All cells have the same size.
         * @type {function(number,number):number} */
        this.size = opts.size; // (resolution, zf) => ...
    }


    /**
     * @param {Array.<import("../Dataset").Cell>} cells 
     * @param {number} resolution 
     * @param {GeoCanvas} cg 
     */
    draw(cells, resolution, cg) {
        if (monitor) monitorDuration("*** SquareColorWGLStyle draw")

        //zoom factor
        const zf = cg.getZf()

        //compute color variable statistics
        const statColor = Style.getStatistics(cells, c => c[this.colorCol], true)
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
        const r2 = resolution / 2
        let c, nb = cells.length
        const verticesBuffer = []
        const tBuffer = []
        for (let i = 0; i < nb; i++) {
            c = cells[i]
            const t = this.tFun(c[this.colorCol], resolution, statColor)
            if (t == null || t == undefined) continue
            verticesBuffer.push(c.x + r2, c.y + r2)
            tBuffer.push(t > 1 ? 1 : t < 0 ? 0 : t)
        }

        if (monitor) monitorDuration("   webgl drawing data preparation")

        const sizeGeo = this.size ? this.size(resolution, zf) : resolution + 0.2 * zf
        const wgp = new WebGLSquareColoringAdvanced(cvWGL.gl, this.colors, this.stretching, sizeGeo / zf)

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

        if (monitor) monitorDuration("*** SquareColorWGLStyle end draw")
    }

}
