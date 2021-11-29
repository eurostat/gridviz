//@ts-check

import { Style } from "../Style"
import { Cell } from "../Dataset"
import { CanvasGeo } from "../CanvasGeo";

/** @typedef {"square"|"circle"} Shape */

/**
 * A very generic style that shows grid cells with specific color, size and shape.
 * It can be used to show variables as cell colors, cell size, cell shape, or any combination of the three visual variables.
 * 
 * @author Julien Gaffuri
 */
export class ShapeColorSizeStyle extends Style {

    /**
      * @param {function(Cell):string} color A function returning the color of the cell.
      * @param {function(Cell):number} size A function returning the size of a cell (in geographical unit).
      * @param {function(Cell):Shape} shape A function returning the shape of a cell.
      */
    constructor(color = () => "#EA6BAC", size = null, shape = () => "square") {
        super()

        /** @type {function(Cell):string} */
        this.color_ = color;

        /** @type {function(Cell):number} */
        this.size_ = size;

        /** @type {function(Cell):Shape} */
        this.shape_ = shape;
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
        if (this.size_)
            cells.sort((c1, c2) => (this.size_(c2) - this.size_(c1)));

        for (let cell of cells) {

            //color
            cg.ctx.fillStyle = this.color ? this.color_(cell) : "#EA6BAC";

            //size - in ground meters
            let sG = this.size_ ? this.size_(cell) : resolution;
            //size - in pixel
            const s = sG / cg.zf

            //get shape
            const shape = this.shape_ ? this.shape_(cell) : "square";
            if (shape === "square") {
                //draw square
                const d = resolution * (1 - sG / resolution) * 0.5
                cg.ctx.fillRect(
                    cg.geoToPixX(cell.x + d + this.offset_.dx),
                    cg.geoToPixY(cell.y + resolution - d + this.offset_.dy),
                    s, s);
            } else if (shape === "circle") {
                //draw circle
                cg.ctx.beginPath();
                cg.ctx.arc(
                    cg.geoToPixX(cell.x + resolution * 0.5 + this.offset_.dx),
                    cg.geoToPixY(cell.y + resolution * 0.5 + this.offset_.dy),
                    s * 0.5,
                    0, 2 * Math.PI, false);
                cg.ctx.fill();
            } else {
                throw new Error('Unexpected shape:' + shape);
            }

            //draw stroke
            this.drawStroke(cell, resolution, cg, this.shape_, this.size_)
        }

    }



    /**
     * @param {function(Cell):string} color 
     * @returns {this|function(Cell):string}
     */
    color(color) {
        if (color) {
            this.color_ = color;
            return this
        }
        return this.color_
    }

    /**
     * @param {function(Cell):number} size 
     * @returns {this|function(Cell):number}
     */
    size(size) {
        if (size) {
            this.size_ = size;
            return this
        }
        return this.size_
    }

    /**
     * @param {function(Cell):Shape} shape 
     * @returns {this|function(Cell):Shape}
     */
    shape(shape) {
        if (shape) {
            this.shape_ = shape;
            return this
        }
        return this.shape_
    }

}
