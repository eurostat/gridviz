//@ts-check

import { Style, Stat, getStatistics, Shape } from "../Style"
import { Cell } from "../DatasetComponent"
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



        /**
         *  @protected @type {number} */
        this.zf = opts.zf;



        /** The name of the column/attribute of the tabular data where to retrieve the variable for color.
         *  @protected @type {string} */
        this.strokeColorCol = opts.strokeColorCol;

        /** A function returning the color of the stroke.
        * @protected @type {function(number,number,Stat|undefined):string} */
        this.strokeColor = opts.strokeColor || (() => "#666");



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

        //
        if (zf > this.zf) return

        let statColor
        if (this.strokeColorCol)
            statColor = getStatistics(cells, c => c[this.strokeColorCol], true)

        let statSize
        if (this.sizeCol)
            statSize = getStatistics(cells, c => c[this.sizeCol], true)

        let statWidth
        if (this.strokeWidthCol)
            statWidth = getStatistics(cells, c => c[this.strokeWidthCol], true)

        //draw with HTML canvas
        //in geo coordinates
        cg.setCanvasTransform()

        for (let cell of cells) {

            //color
            const col = this.strokeColor ? this.strokeColor(cell[this.strokeColorCol], resolution, statColor) : undefined;
            if (!col || col === "none") continue
            cg.ctx.strokeStyle = col;

            //size
            /** @type {function(number,number,Stat|undefined,number):number} */
            let s_ = this.size || (() => resolution);
            //size - in geo unit
            const sG = s_(cell[this.sizeCol], resolution, statSize, zf)

            //width
            const wi = this.strokeWidth ? this.strokeWidth(cell[this.strokeWidthCol], resolution, statWidth, zf) : 1 * zf;
            if (!wi || wi <= 0) continue
            cg.ctx.lineWidth = wi;

            //shape
            const shape = this.shape ? this.shape(cell) : "square";
            if (shape === "none") continue

            //get offset
            const offset = this.offset(cell, resolution, zf)

            if (shape === "square") {
                //draw square
                const d = resolution * (1 - sG / resolution) * 0.5
                cg.ctx.beginPath();
                cg.ctx.rect(
                    cell.x + d + offset.dx,
                    cell.y + d + offset.dy,
                    sG, sG);
                cg.ctx.stroke();
            } else if (shape === "circle") {
                //draw circle
                cg.ctx.beginPath();
                cg.ctx.arc(
                    cell.x + resolution * 0.5 + offset.dx,
                    cell.y + resolution * 0.5 + offset.dy,
                    sG * 0.5,
                    0, 2 * Math.PI, false);
                cg.ctx.stroke();
            } else if (shape === "donut") {
                console.error("Not implemented")
            } else {
                throw new Error('Unexpected shape:' + shape);
            }
        }

        //update legends
        //this.updateLegends({ style: this, r: resolution, zf: zf, sSize: statSize, sColor: statColor });

    }


    //getters and setters

    /** @returns {function(number,number,Stat):string} */
    //getColor() { return this.strokeColor; }
    /** @param {function(number,number,Stat|undefined):string} val @returns {this} */
    //setColor(val) { this.strokeColor = val; return this; }

    /** @returns {function(number,number,Stat,number):number} */
    //getSize() { return this.size; }
    /** @param {function(number,number,Stat|undefined,number):number} val @returns {this} */
    //setSize(val) { this.size = val; return this; }


    /** @returns {number} */
    //getStrokeWidth() { return this.strokeWidth; }
    /** @param {number} val @returns {this} */
    //setStrokeWidth(val) { this.strokeWidth = val; return this; }

    /** @returns {function(Cell):Shape} */
    //getShape() { return this.shape; }
    /** @param {function(Cell):Shape} val @returns {this} */
    //setShape(val) { this.shape = val; return this; }

}
