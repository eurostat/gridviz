//@ts-check

import { Style, Stat, getStatistics } from "../Style"
import { Cell } from "../Dataset"
import { CanvasGeo } from "../CanvasGeo";

/**
 * A style where each cell is represented by a segment whose length, width, color and orientation can vary according to statistical values.
 * 
 * @author Julien Gaffuri
 */
export class SegmentStyle extends Style {

    /** @param {object} opts */
    constructor(opts) {
        super(opts)
        opts = opts || {};

        /** A function returning the orientation (in degrees) of the segment representing a cell.
         * @private @type {function(Cell):number} */
        this.orientation = opts.orientation;

        /** @private @type {string} */
        this.colorCol = opts.colorCol;

        /** A function returning the color of the cell segment.
        * @private @type {function(number,number,Stat):string} */
        this.color = opts.color || (() => "#EA6BAC");

        /** @private @type {string} */
        this.lengthCol = opts.lengthCol;

        /** A function returning the length of the segment representing a cell.
         * @private @type {function(number,number,Stat):number} */
        this.length = opts.length;

        /** @private @type {string} */
        this.widthCol = opts.widthCol;

        /** A function returning the width of the segment representing a cell.
         * @private @type {function(number,number,Stat):number} */
        this.width = opts.width;

    }


    /**
     * Draw cells as segments.
     * 
     * @param {Array.<Cell>} cells 
     * @param {number} resolution 
     * @param {CanvasGeo} cg 
     */
    draw(cells, resolution, cg) {

        let statColor
        if (this.colorCol) {
            //compute color variable statistics
            statColor = getStatistics(cells, c => c[this.colorCol], true)
        }

        let statLength
        if (this.lengthCol) {
            //if length is used, sort cells by length so that the longests are drawn first
            cells.sort((c1, c2) => c2[this.lengthCol] - c1[this.lengthCol]);
            //and compute size variable statistics
            statLength = getStatistics(cells, c => c[this.lengthCol], true)
        }

        let statWidth
        if (this.widthCol) {
            //and compute size variable statistics
            statWidth = getStatistics(cells, c => c[this.widthCol], true)
        }


        //conversion factor degree -> radian
        const f = Math.PI / 180;

        for (let c of cells) {

            //color
            const col = this.color ? this.color(c[this.colorCol], resolution, statColor) : undefined;
            if (!col) continue
            cg.ctx.fillStyle = col;


            //width
            const w = this.width? this.width(c[this.widthCol], resolution, statWidth) : undefined;
            if (!w) continue

            /** @type {function(number,number,Stat,number):number} */
            let s_ = this.size || (() => resolution)
            //size - in pixel and geo
            /** @type {number} */
            const sG = s_(cell[this.sizeCol], resolution, statSize, cg.zf)
            /** @type {number} */
            const sP = sG/cg.zf;


            //set width
            cg.ctx.lineWidth = this.width.unit === "pix" ? this.width.val(c) : this.width.val(c) / cg.zf;



            //get segment orientation (in radian) and length (in pixel)
            /** @type {number} */
            const or = this.orientation(c) * f
            /** @type {number} */
            const len = this.length.unit === "pix"? this.length.val(c) : this.length.val(c) / cg.zf

            //get segment center
            const cx = cg.geoToPixX(c.x + resolution / 2 + this.offset.dx),
                cy = cg.geoToPixY(c.y + resolution / 2 + this.offset.dy);

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

    //TODO colorCol

    /** @returns {function(number,number,Stat):string} */
    getColor() { return this.color; }
    /** @param {function(number,number,Stat):string} val @returns {this} */
    setColor(val) { this.color = val; return this; }

    //TODO lengthCol

    /** @returns {function(number,number,Stat):number} */
    getLength() { return this.length; }
    /** @param {function(number,number,Stat):number} val @returns {this} */
    setLength(val) { this.length = val; return this; }

    //TODO widthCol

    /** @returns {function(number,number,Stat):number} */
    getWidth() { return this.width; }
    /** @param {function(number,number,Stat):number} val @returns {this} */
    setWidth(val) { this.width = val; return this; }

}
