//@ts-check

import { Style, Size, Stat } from "../Style"
import { Cell } from "../Dataset"
import { CanvasGeo } from "../CanvasGeo";

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

        /** A function returning the size of a cell (in geographical unit).
        * @private @type {{val: function(number,number,Stat):number, unit: "pix"|"geo"}} */
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
     * @param {CanvasGeo} cg 
     */
    draw(cells, resolution, cg) {

        //if size is used, sort cells by size so that the biggest are drawn first
        if (this.size)
            cells.sort((c1, c2) => (this.size.val(c2) - this.size.val(c1)));

        for (let cell of cells) {

            //color
            const col = this.color ? this.color(cell) : undefined;
            if (!col) continue
            cg.ctx.fillStyle = col;

            //shape
            const shape = this.shape ? this.shape(cell) : "square";
            if (shape === "none") continue

            //size
            /** @type {Size} */
            let s_ = this.size || { val: c => resolution, unit: "geo" };
            //size - in pixel and geo
            /** @type {number} */
            const sP = s_.unit === "pix" ? s_.val(cell) : s_.val(cell) / cg.zf
            /** @type {number} */
            const sG = cg.zf * sP;

            if (shape === "square") {
                //draw square
                const d = resolution * (1 - sG / resolution) * 0.5
                cg.ctx.fillRect(
                    cg.geoToPixX(cell.x + d + this.offset.dx),
                    cg.geoToPixY(cell.y + resolution - d + this.offset.dy),
                    sP, sP);
            } else if (shape === "circle") {
                //draw circle
                cg.ctx.beginPath();
                cg.ctx.arc(
                    cg.geoToPixX(cell.x + resolution * 0.5 + this.offset.dx),
                    cg.geoToPixY(cell.y + resolution * 0.5 + this.offset.dy),
                    sP * 0.5,
                    0, 2 * Math.PI, false);
                cg.ctx.fill();
            } else {
                throw new Error('Unexpected shape:' + shape);
            }

            //draw stroke
            //TODO
            //this.drawStroke(cell, resolution, cg, this.shape, this.size)
        }

    }


    //getters and setters

    /** @returns {function(number,number,Stat):string} */
    getColor() { return this.color; }
    /** @param {function(number,number,Stat):string} val @returns {this} */
    setColor(val) { this.color = val; return this; }

    /** @returns {{val: function(number,number,Stat):number, unit: "pix"|"geo"}} */
    getSize() { return this.size; }
    /** @param {{val: function(number,number,Stat):number, unit: "pix"|"geo"}} val @returns {this} */
    setSize(val) { this.size = val; return this; }

    /** @returns {function(Cell):Shape} */
    getShape() { return this.shape; }
    /** @param {function(Cell):Shape} val @returns {this} */
    setShape(val) { this.shape = val; return this; }

}
