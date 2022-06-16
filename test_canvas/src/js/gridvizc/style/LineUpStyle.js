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
        this.color = opts.color || (() => "#EA6BACAA");

        /** @private @type {string} */
        this.widthCol = opts.widthCol;
        /** A function returning the width of the line representing a cell, in geo unit
         * @private @type {function(number,number,Stat,number):number} */
        this.width = opts.width || ((v, r) => 0.2 * r);

        this.shadowDirection = 210 * Math.PI / 180.0;
        this.shadowFactor = 0.5;
        this.shadowColor = "#CCC";

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

        //get view center geo position
        const cgx = cg.getCenter().x, cgy = cg.getCenter().y

        //set view height
        const H = 1000 * cg.getZf()

        cg.ctx.lineCap = "round";

        //shadows
        cg.ctx.strokeStyle = this.shadowColor
        for (let c of cells) {

            //width
            /** @type {number} */
            const wG = this.width ? this.width(c[this.widthCol], resolution, statWidth, cg.zf) : undefined
            if (!wG || wG < 0) continue

            //height
            /** @type {number} */
            const hG = this.height ? this.height(c[this.heightCol], resolution, statHeight, cg.zf) : undefined
            if (!hG || hG < 0) continue

            //get offset
            //TODO use that
            const offset = this.offset(c, resolution, cg.zf)

            //set width
            cg.ctx.lineWidth = wG / cg.zf

            //compute cell centre postition
            const cx = c.x + resolution / 2;
            const cy = c.y + resolution / 2;
            const ls = hG * this.shadowFactor

            //draw segment
            cg.ctx.beginPath();
            cg.ctx.moveTo(cg.geoToPixX(cx), cg.geoToPixY(cy));
            cg.ctx.lineTo(cg.geoToPixX(cx + ls * Math.cos(this.shadowDirection)), cg.geoToPixY(cy + ls * Math.sin(this.shadowDirection)));
            cg.ctx.stroke();

        }



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
            const hG = this.height ? this.height(c[this.heightCol], resolution, statHeight, cg.zf) : undefined
            if (!hG || hG < 0) continue

            //get offset
            //TODO use that
            const offset = this.offset(c, resolution, cg.zf)

            //set color and width
            cg.ctx.strokeStyle = col
            cg.ctx.lineWidth = wG / cg.zf

            //compute cell centre postition
            const cx = c.x + resolution / 2;
            const cy = c.y + resolution / 2;

            //compute angle
            const dx = cx - cgx, dy = cy - cgy
            const a = Math.atan2(dy, dx);
            const D = Math.sqrt(dx * dx + dy * dy)
            const d = D * hG / (H - hG)

            //draw segment
            cg.ctx.beginPath();
            cg.ctx.moveTo(cg.geoToPixX(cx), cg.geoToPixY(cy));
            cg.ctx.lineTo(cg.geoToPixX(cx + d * Math.cos(a)), cg.geoToPixY(cy + d * Math.sin(a)));
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
