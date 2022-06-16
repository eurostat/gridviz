//@ts-check

import { Style, Stat, getStatistics, Shape } from "../Style"
import { Cell } from "../Dataset"
import { GeoCanvas } from "../GeoCanvas";

/**
 * @author Julien Gaffuri
 */
export class DonutStyle extends Style {

    /** @param {object} opts */
    constructor(opts) {
        super(opts)
        opts = opts || {};

        /** The name of the column/attribute of the tabular data where to retrieve the variable for size.
         * @private @type {string} */
        this.sizeCol = opts.sizeCol;

        /** A function returning the size parameter of the donut, within [0,1]. 1 correspond to the entire circle (donut without hole), 0 to the thinnest donut.
        * @private @type {function(number,number,Stat,number):number} */
        this.size = opts.size;

        /** The name of the column/attribute of the tabular data where to retrieve the variable for color.
         *  @private @type {string} */
        this.colorCol = opts.colorCol;

        /** A function returning the color of the cell.
        * @private @type {function(number,number,Stat):string} */
        this.color = opts.color || (() => "#EA6BAC");

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

        //draw in geo coordinates
        cg.setCanvasTransform()
        for (let cell of cells) {

            //color
            const col = this.color ? this.color(cell[this.colorCol], resolution, statColor) : undefined;
            if (!col) continue
            cg.ctx.fillStyle = col;

            //size
            /** @type {function(number,number,Stat,number):number} */
            let s_ = this.size || (() => resolution);
            //size factor, within [0,1]
            const sF = s_(cell[this.sizeCol], resolution, statSize, cg.zf)

            //get offset
            const offset = this.offset(cell, resolution, cg.zf)

            //draw circle
            const xc = cell.x + resolution * 0.5 + offset.dx, yc = cell.y + resolution * 0.5 + offset.dy
            cg.ctx.beginPath();
            cg.ctx.moveTo(xc, yc);
            cg.ctx.arc(xc, yc, sF * 0.5 * resolution, 0, 2 * Math.PI);
            cg.ctx.arc(xc, yc, sF * 0.25 * resolution, 0, 2 * Math.PI, true);
            cg.ctx.closePath();
            cg.ctx.fill();

            //draw stroke
            //this.drawStroke(cell, resolution, cg, "circle", sG, offset)
        }

        //update legend, if any
        if (this.legend) this.legend.update({ r: resolution, s: statColor });
    }


    //getters and setters

    /** @returns {function(number,number,Stat,number):number} */
    getSize() { return this.size; }
    /** @param {function(number,number,Stat,number):number} val @returns {this} */
    setSize(val) { this.size = val; return this; }

    /** @returns {function(number,number,Stat):string} */
    getColor() { return this.color; }
    /** @param {function(number,number,Stat):string} val @returns {this} */
    setColor(val) { this.color = val; return this; }

}
