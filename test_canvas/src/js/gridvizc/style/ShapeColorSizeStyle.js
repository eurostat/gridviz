//@ts-check

import { Style, Stat, getStatistics, Shape } from "../Style"
import { Cell } from "../Dataset"
import { GeoCanvas } from "../GeoCanvas";
import { makeWebGLCanvas } from "../utils/webGLUtils";
import { WebGLRectangleColoring } from "../utils/WebGLRectangleColoring";

/**
 * A very generic style that shows grid cells with specific color, size and shape.
 * It can be used to show variables as cell colors, cell size, cell shape, or any combination of the three visual variables.
 * 
 * @author Julien Gaffuri
 */
export class ShapeColorSizeStyle extends Style {

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

        /** The name of the column/attribute of the tabular data where to retrieve the variable for size.
         * @protected @type {string} */
        this.sizeCol = opts.sizeCol;

        /** A function returning the size of a cell in geographical unit.
        * @protected @type {function(number,number,Stat|undefined,number):number} */
        this.size = opts.size;

        /** A function returning the shape of a cell.
         * @private @type {function(Cell):Shape} */
        this.shape = opts.shape || (() => "square");

        /** Set to true when 1/ all cells have square shape 2/ webGL is authorised
         * @private @type {boolean} */
        this.webGLSquare = opts.webGLSquare
    }


    /**
     * Draw cells as squares, with various colors and size.
     * 
     * @param {Array.<Cell>} cells 
     * @param {number} resolution 
     * @param {GeoCanvas} cg 
     */
    draw(cells, resolution, cg) {
        //zoom factor
        const zf = cg.getZf()

        let statSize
        if (this.sizeCol) {
            //if size is used, sort cells by size so that the biggest are drawn first
            cells.sort((c1, c2) => c2[this.sizeCol] - c1[this.sizeCol]);
            //and compute size variable statistics
            statSize = getStatistics(cells, c => c[this.sizeCol], true)
        }

        let statColor
        if (this.colorCol) {
            //compute color variable statistics
            statColor = getStatistics(cells, c => c[this.colorCol], true)
        }


        if (this.webGLSquare) {

            //draw with webGL

            //create canvas and webgl renderer
            const cvWGL = makeWebGLCanvas(cg)
            if (cvWGL) {
                const prog = new WebGLRectangleColoring(cvWGL.gl)

                //add vertice and fragment data
                for (let c of cells) {
                    prog.addRectangleData(c.x, c.x + resolution, c.y, c.y + resolution, 1, Math.random(), Math.random())
                }

                //draw
                prog.draw(cg.getWebGLTransform())

                //draw in canvas geo
                cg.initCanvasTransform()
                cg.ctx.drawImage(cvWGL.canvas, 0, 0);

                //draw stroke
                //TODO
                //for (let c of cells)
                //    this.drawStroke(s, resolution, cg, "square", sG, offset)

                //update legends
                this.updateLegends({ style: this, r: resolution, zf: zf, sSize: statSize, sColor: statColor });

                return
            }
        }

        //draw with HTML canvas

        //draw in geo coordinates
        cg.setCanvasTransform()

        for (let cell of cells) {

            //color
            const col = this.color ? this.color(cell[this.colorCol], resolution, statColor) : undefined;
            if (!col || col === "none") continue
            cg.ctx.fillStyle = col;

            //shape
            const shape = this.shape ? this.shape(cell) : "square";
            if (shape === "none") continue

            //size
            /** @type {function(number,number,Stat|undefined,number):number} */
            let s_ = this.size || (() => resolution);
            //size - in geo unit
            const sG = s_(cell[this.sizeCol], resolution, statSize, zf)

            //get offset
            const offset = this.offset(cell, resolution, zf)

            if (shape === "square") {
                //draw square
                const d = resolution * (1 - sG / resolution) * 0.5
                cg.ctx.fillRect(
                    cell.x + d + offset.dx,
                    cell.y + d + offset.dy,
                    sG, sG);
            } else if (shape === "circle") {
                //draw circle
                cg.ctx.beginPath();
                cg.ctx.arc(
                    cell.x + resolution * 0.5 + offset.dx,
                    cell.y + resolution * 0.5 + offset.dy,
                    sG * 0.5,
                    0, 2 * Math.PI, false);
                cg.ctx.fill();
            } else if (shape === "donut") {
                const xc = cell.x + resolution * 0.5 + offset.dx, yc = cell.y + resolution * 0.5 + offset.dy
                cg.ctx.beginPath();
                cg.ctx.moveTo(xc, yc);
                cg.ctx.arc(xc, yc, 0.5 * resolution, 0, 2 * Math.PI);
                cg.ctx.arc(xc, yc, (1 - sG / resolution) * 0.5 * resolution, 0, 2 * Math.PI, true);
                cg.ctx.closePath();
                cg.ctx.fill();
            } else {
                throw new Error('Unexpected shape:' + shape);
            }

            //draw stroke
            this.drawStroke(cell, resolution, cg, shape, sG, offset)
        }

        //update legends
        this.updateLegends({ style: this, r: resolution, zf: zf, sSize: statSize, sColor: statColor });
    }


    //getters and setters

    /** @returns {function(number,number,Stat):string} */
    getColor() { return this.color; }
    /** @param {function(number,number,Stat|undefined):string} val @returns {this} */
    setColor(val) { this.color = val; return this; }

    /** @returns {function(number,number,Stat,number):number} */
    getSize() { return this.size; }
    /** @param {function(number,number,Stat|undefined,number):number} val @returns {this} */
    setSize(val) { this.size = val; return this; }

    /** @returns {function(Cell):Shape} */
    getShape() { return this.shape; }
    /** @param {function(Cell):Shape} val @returns {this} */
    setShape(val) { this.shape = val; return this; }

}
