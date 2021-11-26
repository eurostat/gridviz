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
      * @param {function} orientation A function returning the orientation (in degrees) of the segment representing a cell.
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

        //conversion factor degree -> radian
        const f = Math.PI / 180;

        for (let c of cells) {

            //set width and color
            cg.ctx.lineWidth = this.width_(c) / cg.zf;
            cg.ctx.strokeStyle = this.color_(c);

            //get segment orientation (in radian) and length
            const or = this.orientation_(c) * f,
                len = this.length_(c);

            //get segment center
            const cx = cg.geoToPixX(c.x + resolution / 2 + this.offset_.dx),
                cy = cg.geoToPixY(c.y + resolution / 2 + this.offset_.dy);

            //get direction
            const dx = 0.5 * len * Math.cos(or) / cg.zf,
            dy = 0.5 * len * Math.sin(or) / cg.zf;

            //draw segment
            cg.ctx.beginPath();
            cg.ctx.moveTo(cx-dx, cy-dy);
            cg.ctx.lineTo(cx+dx, cy+dy);
            cg.ctx.stroke();
        }

    }


    //TODO getters and setters

}
