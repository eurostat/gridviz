//@ts-check

import { Style, Stat, getStatistics } from "../Style"
import { Cell } from "../Dataset"
import { GeoCanvas } from "../GeoCanvas";

/**
 * @author Julien Gaffuri
 */
export class LineUpStyle extends Style {

    /** @param {object} opts */
    constructor(opts) {
        super(opts)
        opts = opts || {};

        /** @private @type {string} */
        this.heightCol = opts.heightCol;
        /** A function returning the height of the line representing a cell, in geo unit
         * @private @type {function(number,number,Stat,number):number} */
        this.height = opts.height;

        /** @private @type {string} */
        this.colorCol = opts.colorCol;
        /** A function returning the color of the line representing a cell.
        * @private @type {function(number,number,Stat):string} */
        this.color = opts.color || (() => "#EA6BAC");

        /** @private @type {string} */
        this.widthCol = opts.widthCol;
        /** A function returning the width of the line representing a cell, in geo unit
         * @private @type {function(number,number,Stat,number):number} */
        this.width = opts.width;

    }


    /**
     * Draw cells as segments.
     * 
     * @param {Array.<Cell>} cells 
     * @param {number} resolution 
     * @param {GeoCanvas} cg 
     */
    draw(cells, resolution, cg) {

        let statHeight
        if (this.heightCol) {
            //if length is used, sort cells by length so that the longests are drawn first
            cells.sort((c1, c2) => c2[this.heightCol] - c1[this.heightCol]);
            //and compute size variable statistics
            statHeight = getStatistics(cells, c => c[this.heightCol], true)
        }

        let statColor
        if (this.colorCol) {
            //compute color variable statistics
            statColor = getStatistics(cells, c => c[this.colorCol], true)
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
            /** @type {string} */
            const col = this.color ? this.color(c[this.colorCol], resolution, statColor) : undefined
            if (!col) continue

            //width
            /** @type {number} */
            const wG = this.width ? this.width(c[this.widthCol], resolution, statWidth, cg.zf) : undefined
            if (!wG || wG < 0) continue

            //height
            /** @type {number} */
            const lG = this.height ? this.height(c[this.heightCol], resolution, statHeight, cg.zf) : undefined
            if (!lG || lG < 0) continue

            //orientation (in radian)
            //const or = this.orientation(c) * f
            //if (or === undefined || isNaN(or)) continue;

            //get offset
            const offset = this.offset(c, resolution, cg.zf)

            //set color and width
            cg.ctx.strokeStyle = col
            cg.ctx.lineWidth = wG / cg.zf

            //compute segment centre postition
            const cx = cg.geoToPixX(c.x + resolution / 2 + offset.dx);
            const cy = cg.geoToPixY(c.y + resolution / 2 + offset.dy);

            //compute segment direction
            const dx = 0.5 * /*Math.cos(or) **/ lG / cg.zf
            const dy = 0.5 * /*Math.sin(or) **/ lG / cg.zf

            //draw segment
            cg.ctx.beginPath();
            cg.ctx.moveTo(cx - dx, cy - dy);
            cg.ctx.lineTo(cx + dx, cy + dy);
            cg.ctx.stroke();
        }

    }



    //getters and setters

    //TODO colorCol

    /** @returns {function(number,number,Stat):string} */
    getColor() { return this.color; }
    /** @param {function(number,number,Stat):string} val @returns {this} */
    setColor(val) { this.color = val; return this; }

    //TODO heightCol

    /** @returns {function(number,number,Stat,number):number} */
    getHeight() { return this.height; }
    /** @param {function(number,number,Stat,number):number} val @returns {this} */
    setHeight(val) { this.height = val; return this; }

    //TODO widthCol

    /** @returns {function(number,number,Stat,number):number} */
    getWidth() { return this.width; }
    /** @param {function(number,number,Stat,number):number} val @returns {this} */
    setWidth(val) { this.width = val; return this; }

}
