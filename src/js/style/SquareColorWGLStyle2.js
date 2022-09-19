//@ts-check

import { Style, Stat, Shape } from "../Style"
import { Cell } from "../Dataset"
import { GeoCanvas } from "../GeoCanvas";
import { makeWebGLCanvas } from "../utils/webGLUtils";
import { WebGLSquareColoring } from "../utils/WebGLSquareColoring";
import { monitor, monitorDuration } from "../utils/Utils"

/**
 * Style based on webGL
 * To show cells as colored squares, with computation of the colors on JavaScript side.
 * Alls squares with the same size
 * 
 * @author Julien Gaffuri
 */
export class SquareColorWGLStyle2 extends Style {

    /** @param {object} opts */
    constructor(opts) {
        super(opts)
        opts = opts || {};

        /** The name of the column/attribute of the tabular data where to retrieve the variable for color.
         * @type {string} */
        this.colorCol = opts.colorCol;

        /** A function returning the color of the cell.
        * @type {function(number,number,Stat|undefined):string} */
        this.color = opts.color || (() => "#EA6BAC");

        /** A function returning the size of the cells, in geographical unit.
        * @type {function(number,number):number} */
        this.size = opts.size; // (resolution, zf) => ...
    }


    /**
     * @param {Array.<Cell>} cells 
     * @param {number} resolution 
     * @param {GeoCanvas} cg 
     */
    draw(cells, resolution, cg) {
        if (monitor) monitorDuration("*** SquareColorWGLStyle2 draw")

        //zoom factor
        const zf = cg.getZf()

        let statColor
        if (this.colorCol) {
            //compute color variable statistics
            statColor = Style.getStatistics(cells, c => c[this.colorCol], true)
        }
        if (monitor) monitorDuration("   color stats computation")

        //create canvas and webgl renderer
        const cvWGL = makeWebGLCanvas(cg.w + "", cg.h + "")
        if (!cvWGL) {
            console.error("No webGL")
            return
        }
        if (monitor) monitorDuration("   web GL canvas creation")

        const sizeGeo = this.size ? this.size(resolution, zf) : resolution + 0.2 * zf
        const prog = new WebGLSquareColoring(cvWGL.gl, sizeGeo / zf)

        if (monitor) monitorDuration("   preparation")

        //add vertice and fragment data
        let col
        const r2 = resolution / 2
        let c, nb = cells.length
        for (let i = 0; i < nb; i++) {
            c = cells[i]

            //color
            col = this.color ? this.color(c[this.colorCol], resolution, statColor) : undefined;
            if (!col || col === "none") continue

            prog.addPointData(c.x + r2, c.y + r2, col)
        }

        if (monitor) monitorDuration("   webgl drawing data preparation")

        //draw
        prog.draw(cg.getWebGLTransform())

        if (monitor) monitorDuration("   webgl drawing")

        //draw in canvas geo
        cg.initCanvasTransform()
        cg.ctx.drawImage(cvWGL.canvas, 0, 0);

        if (monitor) monitorDuration("   canvas drawing")

        //update legends
        this.updateLegends({ style: this, r: resolution, zf: zf, sColor: statColor });

        if (monitor) monitorDuration("*** SquareColorWGLStyle2 end draw")
    }

}
