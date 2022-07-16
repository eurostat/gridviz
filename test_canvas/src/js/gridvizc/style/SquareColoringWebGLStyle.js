//@ts-check

import { Style, Stat, getStatistics, Shape } from "../Style"
import { Cell } from "../Dataset"
import { GeoCanvas } from "../GeoCanvas";
import { makeWebGLCanvas } from "../utils/webGLUtils";
import { WebGLSquareColoring } from "../utils/WebGLSquareColoring";

/**
 * 
 * @author Julien Gaffuri
 */
export class SquareColoringWebGLStyle extends Style {

    /** @param {object} opts */
    constructor(opts) {
        super(opts)
        opts = opts || {};


        /** The name of the column/attribute of the tabular data where to retrieve the variable for color.
         *  @protected @type {string} */
        this.colorCol = opts.colorCol;

        /** A function returning the color of the cell.
        * @protected @type {function(number,number,Stat|undefined):string} */
        this.color = opts.color || (() => "#EA6BAC");
    }


    /**
     * @param {Array.<Cell>} cells 
     * @param {number} resolution 
     * @param {GeoCanvas} cg 
     */
    draw(cells, resolution, cg) {
        //zoom factor
        const zf = cg.getZf()

        let statColor
        if (this.colorCol) {
            //compute color variable statistics
            statColor = getStatistics(cells, c => c[this.colorCol], true)
        }

        //create canvas and webgl renderer
        const cvWGL = makeWebGLCanvas(cg)
        if (!cvWGL) {
            console.error("No webGL")
            return
        }

        const prog = new WebGLSquareColoring(cvWGL.gl, resolution / zf + 0.2)

        //add vertice and fragment data
        for (let c of cells) {

            //color
            //TODO get it directly in RGBA ?
            const col = this.color ? this.color(c[this.colorCol], resolution, statColor) : undefined;
            if (!col || col === "none") continue

            const r2 = resolution / 2
            prog.addPointData(c.x + r2, c.y + r2, col)
        }

        //draw
        prog.draw(cg.getWebGLTransform())

        //draw in canvas geo
        cg.initCanvasTransform()
        cg.ctx.drawImage(cvWGL.canvas, 0, 0);

        //update legends
        this.updateLegends({ style: this, r: resolution, zf: zf, sColor: statColor });
    }


    //getters and setters

    /** @returns {function(number,number,Stat):string} */
    getColor() { return this.color; }
    /** @param {function(number,number,Stat|undefined):string} val @returns {this} */
    setColor(val) { this.color = val; return this; }

}
