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
        this.color = opts.color || (() => "#c08c59"); //bb

        /** @private @type {string} */
        this.widthCol = opts.widthCol;
        /** A function returning the width of the line representing a cell, in geo unit
         * @private @type {function(number,number,Stat,number):number} */
        this.width = opts.width || ((v, r) => 0.5 * r);

        this.viewHeightFactor = 5

        this.shadowDirection = - 40.3 * Math.PI / 180.0;
        this.shadowFactor = 0.2;
        this.shadowColor = "#00000033";

        this.viewSX = -0.25
        this.viewSY = -1.5

        this.outlineCol = "#FFFFFF"
        this.outlineWidthPix = 0.5

    }


    /**
     * Draw cells as segments.
     * 
     * @param {Array.<Cell>} cells 
     * @param {number} resolution 
     * @param {GeoCanvas} cg 
     */
    draw(cells, resolution, cg) {
        //zoom factor
        const zf = cg.getZf()

        let statHeight
        if (this.heightCol) {
            //compute size variable statistics
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
        const cvx = cg.getCenter().x + this.viewSX * cg.w * zf
        const cvy = cg.getCenter().y + this.viewSY * cg.h * zf

        //set view height
        const H = this.viewHeightFactor * (cg.w+cg.h)*0.5 * zf

        //sort cells by y and x
        //const distToViewCenter = (c) => { const dx = cvx - c.x, dy = cvy - c.y; return Math.sqrt(dx * dx + dy * dy) }
        cells.sort((c1, c2) => 100000000 * (c2.y - c1.y) + c1.x - c2.x);

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

            //draw bottom circle
            //cg.ctx.strokeStyle = "black"
            cg.ctx.fillStyle = "gray"
            //cg.ctx.lineWidth = 3
            cg.ctx.beginPath();
            cg.ctx.arc(
                cg.geoToPixX(cx), cg.geoToPixY(cy),
                wG / cg.zf * 0.5,
                0, 2 * Math.PI, false);
            //cg.ctx.stroke();
            cg.ctx.fill();

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

            //compute cell centre postition
            const cx = c.x + resolution / 2;
            const cy = c.y + resolution / 2;

            //compute angle
            const dx = cx - cvx, dy = cy - cvy
            const a = Math.atan2(dy, dx);
            const D = Math.sqrt(dx * dx + dy * dy)
            const d = D * hG / (H - hG)

            //draw background segment
            cg.ctx.strokeStyle = this.outlineCol
            cg.ctx.lineWidth = wG / cg.zf + 2*this.outlineWidthPix
            cg.ctx.beginPath();
            cg.ctx.moveTo(cg.geoToPixX(cx), cg.geoToPixY(cy));
            cg.ctx.lineTo(cg.geoToPixX(cx + d * Math.cos(a)), cg.geoToPixY(cy + d * Math.sin(a)));
            cg.ctx.stroke();

            //draw segment
            cg.ctx.strokeStyle = col
            cg.ctx.lineWidth = wG / cg.zf
            cg.ctx.beginPath();
            cg.ctx.moveTo(cg.geoToPixX(cx), cg.geoToPixY(cy));
            cg.ctx.lineTo(cg.geoToPixX(cx + d * Math.cos(a)), cg.geoToPixY(cy + d * Math.sin(a)));
            cg.ctx.stroke();

            //draw top circle
            cg.ctx.strokeStyle = this.outlineCol
            //cg.ctx.fillStyle = "#c08c59"
            cg.ctx.lineWidth = this.outlineWidthPix
            cg.ctx.beginPath();
            cg.ctx.arc(
                cg.geoToPixX(cx + d * Math.cos(a)), cg.geoToPixY(cy + d * Math.sin(a)),
                wG / cg.zf * 0.5 ,//- 1,
                0, 2 * Math.PI, false);
            cg.ctx.stroke();
            //cg.ctx.fill();

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
