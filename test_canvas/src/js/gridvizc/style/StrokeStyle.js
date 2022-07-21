//@ts-check

import { Style, Stat, getStatistics, Shape } from "../Style"
import { Cell } from "../Dataset"
import { GeoCanvas } from "../GeoCanvas";

/**
 * 
 * @author Julien Gaffuri
 */
export class StrokeStyle extends Style {

    /** @param {object} opts */
    constructor(opts) {
        super(opts)
        opts = opts || {};

        /** The name of the column/attribute of the tabular data where to retrieve the variable for color.
         *  @protected @type {string} */
        this.strokeColorCol = opts.strokeColorCol;

        /** A function returning the color of the stroke.
        * @protected @type {function(number,number,Stat|undefined):string} */
        this.strokeColor = opts.strokeColor;

        /** The name of the column/attribute of the tabular data where to retrieve the variable for size.
         * @protected @type {string} */
        this.sizeCol = opts.sizeCol;

        /** A function returning the size of a cell in geographical unit.
        * @protected @type {function(number,number,Stat|undefined,number):number} */
        this.size = opts.size;

        /** The stroke line width, in pixels.
        * @protected @type {string} */
        this.strokeWidthCol = opts.strokeWidthCol;

        /** The stroke line width in geographical unit.
       * @protected @type {function(number,number,Stat|undefined,number):number} */
        this.strokeWidth = opts.strokeWidth;

        /** A function returning the shape of a cell.
         * @private @type {function(Cell):Shape} */
        this.shape = opts.shape || (() => "square");

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
        if (this.strokeColorCol) {
            //compute color variable statistics
            statColor = getStatistics(cells, c => c[this.strokeColorCol], true)
        }

        //draw with HTML canvas
        //in geo coordinates
        cg.setCanvasTransform()

        for (let cell of cells) {

            //color
            const col = this.strokeColor ? this.strokeColor(cell[this.strokeColorCol], resolution, statColor) : undefined;
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
        }

        //update legends
        //this.updateLegends({ style: this, r: resolution, zf: zf, sSize: statSize, sColor: statColor });




        /*
        
                if (!this.zfStroke || cg.getZf() > this.zfStroke) return;
        
                cg.ctx.strokeStyle = this.strokeColor;
                cg.ctx.lineWidth = this.strokeWidth * cg.getZf();
        
                if (shape === "square") {
                    //draw square
                    const d = resolution * (1 - size / resolution) * 0.5
                    cg.ctx.beginPath();
                    cg.ctx.rect(
                        cell.x + d + offset.dx,
                        cell.y + d + offset.dy,
                        size, size);
                    cg.ctx.stroke();
        
                } else if (shape === "circle") {
                    //draw circle
                    cg.ctx.beginPath();
                    cg.ctx.arc(
                        cell.x + resolution * 0.5 + offset.dx,
                        cell.y + resolution * 0.5 + offset.dy,
                        size * 0.5,
                        0, 2 * Math.PI, false);
                    cg.ctx.stroke();
                } else if (shape === "donut") {
                    //console.error("Not implemented")
                } else {
                    throw new Error('Unexpected shape:' + shape);
                }
        
        
        
        */



    }


    //getters and setters

    /** @returns {function(number,number,Stat):string} */
    getColor() { return this.strokeColor; }
    /** @param {function(number,number,Stat|undefined):string} val @returns {this} */
    setColor(val) { this.strokeColor = val; return this; }

    /** @returns {function(number,number,Stat,number):number} */
    getSize() { return this.size; }
    /** @param {function(number,number,Stat|undefined,number):number} val @returns {this} */
    setSize(val) { this.size = val; return this; }


    /** @returns {number} */
    getStrokeWidth() { return this.strokeWidth; }
    /** @param {number} val @returns {this} */
    setStrokeWidth(val) { this.strokeWidth = val; return this; }



    /** @returns {function(Cell):Shape} */
    getShape() { return this.shape; }
    /** @param {function(Cell):Shape} val @returns {this} */
    setShape(val) { this.shape = val; return this; }

}
