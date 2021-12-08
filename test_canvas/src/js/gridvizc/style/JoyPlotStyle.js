//@ts-check

import { Style, Size, Stat, getStatistics } from "../Style"
import { Cell } from "../Dataset"
import { CanvasGeo } from "../CanvasGeo";

/**
 * 
 * @author Julien Gaffuri
 */
export class JoyPlotStyle extends Style {

    /** @param {object} opts */
    constructor(opts) {
        super(opts)
        opts = opts || {};

        /** The cell column where to get the value to represent.
         * @private @type {string} */
        this.col = opts.col

        /** A function returning the height of a cell.
         * @private @type {{val: function(number,Stat):number, unit: "pix"|"geo"}} */
        this.height = opts.height || { val: (v) => Math.sqrt(v), unit: "pix" };

        /** @private @type {string} */
        this.lineColor = opts.lineColor || "gray"
        /** @private @type {number} */
        this.lineWidth = opts.lineWidth || 1;
        /** @private @type {string} */
        this.fillColor = opts.fillColor || "rgba(192, 140, 89, 0.4)"
    }


    /**
     * Draw cells as squares depending on their value.
     * 
     * @param {Array.<Cell>} cells 
     * @param {number} r 
     * @param {CanvasGeo} cg 
     */
    draw(cells, r, cg) {

        //compute statistics
        const stat = getStatistics(cells, c => c[this.col], true)

        //index cells by y and x
        /**  @type {object} */
        const ind = {};
        for (const cell of cells) {
            let row = ind[cell.y];
            if (!row) { row = {}; ind[cell.y] = row }
            row[cell.x] = this.height.val(cell[this.col], stat);
        }


        //compute extent
        const e = cg.extGeo;
        const xMin = Math.floor(e.xMin / r) * r;
        const xMax = Math.floor(e.xMax / r) * r;
        const yMin = Math.floor(e.yMin / r) * r;
        const yMax = Math.floor(e.yMax / r) * r;

        //set color and width
        cg.ctx.strokeStyle = this.lineColor;
        cg.ctx.lineWidth = this.lineWidth;
        cg.ctx.fillStyle = this.fillColor;

        //draw lines, row by row, stating from the top
        for (let y = yMax; y >= yMin; y -= r) {

            //get row
            const row = ind[y]

            //no row
            if (!row) continue;

            //compute row baseline
            const yP = cg.geoToPixY(y);

            //place first point
            cg.ctx.beginPath();
            cg.ctx.moveTo(cg.geoToPixX(xMin - r / 2), yP);

            //store the previous height
            /** @type {number} */
            let hG_;

            //go through the line cells
            for (let x = xMin; x <= xMax; x += r) {

                //get column value
                /** @type {number} */
                let hG = row[x];
                if (!hG) hG = 0;

                if (hG || hG_) {
                    //draw line only when at least one of both values is non-null
                    //TODO test bezierCurveTo
                    const dyP = this.height.unit === "pix" ? hG : hG / cg.zf
                    cg.ctx.lineTo(cg.geoToPixX(x + r / 2), yP - dyP);
                } else {
                    //else move the point
                    cg.ctx.moveTo(cg.geoToPixX(x + r / 2), yP);
                }
                //store the previous value
                hG_ = hG;
            }

            //last point
            if (hG_)
                cg.ctx.lineTo(cg.geoToPixX(xMax + r / 2), yP);

            //draw fill
            if (this.fillColor)
                cg.ctx.fill()
            //draw line
            if (this.lineColor && this.lineWidth > 0)
                cg.ctx.stroke();

        }
    }


    //getters and setters

    /** @returns {string} */
    getCol() { return this.col; }
    /** @param {string} val @returns {this} */
    setCol(val) { this.col = val; return this; }

    /** @returns {{val: function(number,Stat):number, unit: "pix"|"geo"}} */
    getHeight() { return this.height; }
    /** @param {{val: function(number,Stat):number, unit: "pix"|"geo"}} val @returns {this} */
    setHeight(val) { this.height = val; return this; }

    /** @returns {string} */
    getLineColor() { return this.lineColor; }
    /** @param {string} val @returns {this} */
    setLineColor(val) { this.lineColor = val; return this; }

    /** @returns {number} */
    getLineWidth() { return this.lineWidth; }
    /** @param {number} val @returns {this} */
    setLineWidth(val) { this.lineWidth = val; return this; }

    /** @returns {string} */
    getFillColor() { return this.fillColor; }
    /** @param {string} val @returns {this} */
    setFillColor(val) { this.fillColor = val; return this; }

}
