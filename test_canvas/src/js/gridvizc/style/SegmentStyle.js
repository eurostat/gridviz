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
      * @param {Size} length A function returning the length of the segment representing a cell.
      * @param {Size} width A function returning the width of the segment representing a cell.
      */
    constructor(orientation, color, length, width) {
        super()

        /** @private @type {function(Cell):number} */
        this.orientation = orientation;
        /** @private @type {function(Cell):string} */
        this.color = color;
        /** @private @type {Size} */
        this.length = length;
        /** @private @type {Size} */
        this.width = width;

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
            cg.ctx.lineWidth = this.width.unit === "pix" ? this.width.val(c) : this.width.val(c) / cg.zf;
            cg.ctx.strokeStyle = this.color(c);

            //get segment orientation (in radian) and length (in pixel)
            /** @type {number} */
            const or = this.orientation(c) * f
            /** @type {number} */
            const len = this.length.unit === "pix"? this.length.val(c) : this.length.val(c) / cg.zf

            //get segment center
            const cx = cg.geoToPixX(c.x + resolution / 2 + this.offset_.dx),
                cy = cg.geoToPixY(c.y + resolution / 2 + this.offset_.dy);

            //get direction
            const dx = 0.5 * Math.cos(or) * len,
                dy = 0.5 * Math.sin(or) * len;

            //draw segment
            cg.ctx.beginPath();
            cg.ctx.moveTo(cx - dx, cy - dy);
            cg.ctx.lineTo(cx + dx, cy + dy);
            cg.ctx.stroke();
        }

    }



    //getters and setters

    /** @returns {function(Cell):number} */
    getOrientation() { return this.orientation; }
    /** @param {function(Cell):number} val @returns {this} */
    setOrientation(val) { this.orientation = val; return this; }

    /** @returns {function(Cell):string} */
    getColor() { return this.color; }
    /** @param {function(Cell):string} val @returns {this} */
    setColor(val) { this.color = val; return this; }

    /** @returns {Size} */
    getLength() { return this.length; }
    /** @param {Size} val @returns {this} */
    setLength(val) { this.length = val; return this; }

    /** @returns {Size} */
    getWidth() { return this.width; }
    /** @param {Size} val @returns {this} */
    setWidth(val) { this.width = val; return this; }

}
