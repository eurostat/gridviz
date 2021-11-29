//@ts-check

import { Style, Size } from "../Style"
import { Cell } from "../Dataset"
import { CanvasGeo } from "../CanvasGeo";

/**
 * A style where each cell is represented by a segment whose length, width, color and orientation can vary according to statistical values.
 * 
 * @author Julien Gaffuri
 */
export class SegmentStyle extends Style {

    /**
      * @param {function(Cell):number} orientation A function returning the orientation (in degrees) of the segment representing a cell.
      * @param {function(Cell):string} color A function returning the color of the segment representing a cell.
      * @param {function(Cell):Size} length A function returning the length of the segment representing a cell.
      * @param {function(Cell):Size} width A function returning the width of the segment representing a cell.
      */
    constructor(orientation, color, length, width) {
        super()

        /** @type {function(Cell):number} */
        this.orientation_ = orientation;
        /** @type {function(Cell):string} */
        this.color_ = color;
        /** @type {function(Cell):Size} */
        this.length_ = length;
        /** @type {function(Cell):Size} */
        this.width_ = width;

    }


    /**
     * Draw cells as segments.
     * 
     * @param {Array.<Cell>} cells 
     * @param {number} resolution 
     * @param {CanvasGeo} cg 
     */
    draw(cells, resolution, cg) {

        //conversion factor degree -> radian
        const f = Math.PI / 180;

        for (let c of cells) {

            //set width and color
            /** @type {Size} */
            const lw = this.width_(c);
            cg.ctx.lineWidth = lw.unit === "pix" ? lw.val : lw.val / cg.zf;
            cg.ctx.strokeStyle = this.color_(c);

            //get segment orientation (in radian) and length
            const or = this.orientation_(c) * f
            const len = this.length_(c);
            //convert length in pixel
            if (len.unit === "geo") { len.val /= cg.zf; len.unit = "pix" }

            //get segment center
            const cx = cg.geoToPixX(c.x + resolution / 2 + this.offset_.dx),
                cy = cg.geoToPixY(c.y + resolution / 2 + this.offset_.dy);

            //get direction
            const dx = 0.5 * Math.cos(or) * len.val,
                dy = 0.5 * Math.sin(or) * len.val;

            //draw segment
            cg.ctx.beginPath();
            cg.ctx.moveTo(cx - dx, cy - dy);
            cg.ctx.lineTo(cx + dx, cy + dy);
            cg.ctx.stroke();
        }

    }


    /**
     * @param {function(Cell):number} orientation 
     * @returns {this|function(Cell):number}
     */
    orientation(orientation) {
        if (orientation) {
            this.orientation_ = orientation;
            return this
        }
        return this.orientation_
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
     * @param {function(Cell):Size} length 
     * @returns {this|function(Cell):Size}
     */
    length(length) {
        if (length) {
            this.length_ = length;
            return this
        }
        return this.length_
    }

    /**
     * @param {function(Cell):Size} width 
     * @returns {this|function(Cell):Size}
     */
    width(width) {
        if (width) {
            this.width_ = width;
            return this
        }
        return this.width_
    }

}
