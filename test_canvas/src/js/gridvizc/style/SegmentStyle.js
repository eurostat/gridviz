//@ts-check

import { Style } from "../Style"
import { Cell } from "../Dataset"
import { CanvasGeo } from "../CanvasGeo";

/**
 * A style where each cell is represented by a segment whose length, width, color and orientation can vary according to statistical values.
 * 
 * @author Julien Gaffuri
 */
export class SegmentStyle extends Style {

    /**
      * @param {function} orientation A function returning the orientation of the segment representing a cell.
      * @param {function} color A function returning the color of the segment representing a cell.
      * @param {function} length A function returning the length of the segment representing a cell.
      * @param {function} width A function returning the width of the segment representing a cell.
      */
    constructor(orientation, color, length, width) {
        super()

        /** @type {function} */
        this.orientation_ = orientation;
        /** @type {function} */
        this.color_ = color;
        /** @type {function} */
        this.length_ = length;
        /** @type {function} */
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

        for (let c of cells) {

            //get segment specs
            const or = this.orientation_(c);
            const col = this.color_(c);
            const len = this.length_(c);
            const w = this.width_(c);

            //draw the segment
            cg.ctx.lineWidth = w;

        }

    }

}
