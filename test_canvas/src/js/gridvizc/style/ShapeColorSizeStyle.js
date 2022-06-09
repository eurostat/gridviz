//@ts-check

import { Style, Stat, getStatistics } from "../Style"
import { Cell } from "../Dataset"
import { GeoCanvas } from "../GeoCanvas";
import { ColorLegend } from "../legend/ColorLegend"

/** @typedef {"square"|"circle"|"none"} Shape */

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


        /** @private @type {string} */
        this.colorCol = opts.colorCol;

        /** A function returning the color of the cell.
        * @private @type {function(number,number,Stat):string} */
        this.color = opts.color || (() => "#EA6BAC");


        /** @private @type {string} */
        this.sizeCol = opts.sizeCol;

        /** A function returning the size of a cell in geographical unit.
        * @private @type {function(number,number,Stat,number):number} */
        this.size = opts.size;


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

        cg.setCanvasTransform()
        for (let cell of cells) {

            //color
            const col = this.color ? this.color(cell[this.colorCol], resolution, statColor) : undefined;
            if (!col) continue
            cg.ctx.fillStyle = col;

            //shape
            const shape = this.shape ? this.shape(cell) : "square";
            if (shape === "none") continue

            //size
            /** @type {function(number,number,Stat,number):number} */
            let s_ = this.size || (() => resolution);
            //size - in geo unit
            const sG = s_(cell[this.sizeCol], resolution, statSize, cg.zf)

            //get offset
            const offset = this.offset(cell, resolution, cg.zf)

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
            } else {
                throw new Error('Unexpected shape:' + shape);
            }

            //draw stroke
            //TODO
            //this.drawStroke(cell, resolution, cg, this.shape, this.size)
        }

        //update legend, if any
        if (this.legend) this.legend.update({ r: resolution, s: statColor });
    }


    //getters and setters

    /** @returns {function(number,number,Stat):string} */
    getColor() { return this.color; }
    /** @param {function(number,number,Stat):string} val @returns {this} */
    setColor(val) { this.color = val; return this; }

    /** @returns {function(number,number,Stat,number):number} */
    getSize() { return this.size; }
    /** @param {function(number,number,Stat,number):number} val @returns {this} */
    setSize(val) { this.size = val; return this; }

    /** @returns {function(Cell):Shape} */
    getShape() { return this.shape; }
    /** @param {function(Cell):Shape} val @returns {this} */
    setShape(val) { this.shape = val; return this; }



    /**
     * @param {Object} opts
     * @returns {this}
     */
    addLegend(opts) {
        this.legend = new ColorLegend(opts);
        return this
    }

}
