//@ts-check

import { Style } from "../Style"
import { GeoCanvas } from "../GeoCanvas";

/**
 * @author Julien Gaffuri
 */
export class PillarWGStyle extends Style {

    /** @param {object} opts */
    constructor(opts) {
        super(opts)
        opts = opts || {};

        /** 
         * @type {string} */
        this.heightCol = opts.heightCol;

        /** A function returning the height of the line representing a cell, in geo unit
         * @type {function(number,number,import("../Style").Stat|undefined,number):number} */
        this.height = opts.height;

        /** 
         * @type {string} */
        this.colorCol = opts.colorCol;

        /** A function returning the color of the line representing a cell.
        * @type {function(number,number,import("../Style").Stat|undefined):string} */
        this.color = opts.color || (() => "#c08c59"); //bb

        /** 
         * @type {string} */
        this.widthCol = opts.widthCol;

        /** A function returning the width of the line representing a cell, in geo unit
         * @type {function(number,number,import("../Style").Stat|undefined,number):number} */
        this.width = opts.width || ((v, r) => 0.5 * r);

        this.viewHeightFactor = 5

        this.shadowDirection = -40.3 * Math.PI / 180.0;
        this.shadowFactor = 0.3;
        this.shadowColor = "#00000033";

        this.viewSX = -0.25
        this.viewSY = -1.5

        this.outlineCol = "#FFFFFF"
        this.outlineWidthPix = 0.5
    }


    /**
     * Draw cells as segments.
     * 
     * @param {Array.<import("../Dataset").Cell>} cells 
     * @param {number} resolution 
     * @param {GeoCanvas} cg 
     */
    draw(cells, resolution, cg) {
        //zoom factor
        const zf = cg.getZf()

        let statHeight
        if (this.heightCol) {
            //compute size variable statistics
            statHeight = Style.getStatistics(cells, c => c[this.heightCol], true)
        }

        let statColor
        if (this.colorCol) {
            //compute color variable statistics
            statColor = Style.getStatistics(cells, c => c[this.colorCol], true)
        }

        let statWidth
        if (this.widthCol) {
            //and compute size variable statistics
            statWidth = Style.getStatistics(cells, c => c[this.widthCol], true)
        }

        //get view center geo position
        const cvx = cg.getCenter().x + this.viewSX * cg.w * zf
        const cvy = cg.getCenter().y + this.viewSY * cg.h * zf

        //set view height
        const H = this.viewHeightFactor * (cg.w + cg.h) * 0.5 * zf

        //sort cells by y and x
        //const distToViewCenter = (c) => { const dx = cvx - c.x, dy = cvy - c.y; return Math.sqrt(dx * dx + dy * dy) }
        cells.sort((c1, c2) => 100000000 * (c2.y - c1.y) + c1.x - c2.x);

        cg.ctx.lineCap = "round";

        //draw in geo coordinates
        cg.setCanvasTransform()

        //shadows
        cg.ctx.strokeStyle = this.shadowColor
        for (let c of cells) {

            //width
            /** @type {number|undefined} */
            const wG = this.width ? this.width(c[this.widthCol], resolution, statWidth, zf) : undefined
            if (!wG || wG < 0) continue

            //height
            /** @type {number|undefined} */
            const hG = this.height ? this.height(c[this.heightCol], resolution, statHeight, zf) : undefined
            if (!hG || hG < 0) continue

            //get offset
            //TODO use that
            const offset = this.offset(c, resolution, zf)

            //set width
            cg.ctx.lineWidth = wG

            //compute cell centre postition
            const cx = c.x + resolution / 2;
            const cy = c.y + resolution / 2;
            const ls = hG * this.shadowFactor

            //draw segment
            cg.ctx.beginPath();
            cg.ctx.moveTo(cx, cy);
            cg.ctx.lineTo(cx + ls * Math.cos(this.shadowDirection), cy + ls * Math.sin(this.shadowDirection));
            cg.ctx.stroke();

            //draw bottom circle
            //cg.ctx.strokeStyle = "black"
            cg.ctx.fillStyle = "gray"
            //cg.ctx.lineWidth = 3
            cg.ctx.beginPath();
            cg.ctx.arc(
                cx, cy,
                wG * 0.5,
                0, 2 * Math.PI, false);
            //cg.ctx.stroke();
            cg.ctx.fill();

        }



        for (let c of cells) {

            //color
            /** @type {string|undefined} */
            const col = this.color ? this.color(c[this.colorCol], resolution, statColor) : undefined
            if (!col) continue

            //width
            /** @type {number|undefined} */
            const wG = this.width ? this.width(c[this.widthCol], resolution, statWidth, zf) : undefined
            if (!wG || wG < 0) continue

            //height
            /** @type {number|undefined} */
            const hG = this.height ? this.height(c[this.heightCol], resolution, statHeight, zf) : undefined
            if (!hG || hG < 0) continue

            //get offset
            //TODO use that
            const offset = this.offset(c, resolution, zf)

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
            cg.ctx.lineWidth = wG + 2 * this.outlineWidthPix * zf
            cg.ctx.beginPath();
            cg.ctx.moveTo(cx, cy);
            cg.ctx.lineTo(cx + d * Math.cos(a), cy + d * Math.sin(a));
            cg.ctx.stroke();

            //draw segment
            cg.ctx.strokeStyle = col
            cg.ctx.lineWidth = wG
            cg.ctx.beginPath();
            cg.ctx.moveTo(cx, cy);
            cg.ctx.lineTo(cx + d * Math.cos(a), cy + d * Math.sin(a));
            cg.ctx.stroke();

            //draw top circle
            cg.ctx.strokeStyle = this.outlineCol
            //cg.ctx.fillStyle = "#c08c59"
            cg.ctx.lineWidth = this.outlineWidthPix * zf
            cg.ctx.beginPath();
            cg.ctx.arc(
                cx + d * Math.cos(a), cy + d * Math.sin(a),
                wG * 0.5,
                0, 2 * Math.PI, false);
            cg.ctx.stroke();
            //cg.ctx.fill();

        }

        //in case...
        cg.ctx.lineCap = "butt";


        //update legends
        this.updateLegends({ style: this, r: resolution, zf: zf, sColor: statColor });
    }

}
