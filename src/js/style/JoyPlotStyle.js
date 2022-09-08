//@ts-check

import { Style, Stat } from "../Style"
import { Cell } from "../Dataset"
import { GeoCanvas } from "../GeoCanvas";

/**
 * 
 * @author Joseph Davies, Julien Gaffuri
 */
export class JoyPlotStyle extends Style {

    /** @param {object} opts */
    constructor(opts) {
        super(opts)
        opts = opts || {};

        /** The cell column where to get the value to represent.
         * @private
         * @type {string} */
        this.heightCol = opts.heightCol

        /** A function returning the height of a cell.
         * @private
         * @type {function(number,number,Stat|undefined,number):number} */
        this.height = opts.height || ((v) => Math.sqrt(v));

        /** 
         * @private
         * @type {string} */
        this.lineColor = opts.lineColor || "#BBB"
        /** 
         * @private
         * @type {number} */
        this.lineWidth = opts.lineWidth || 1;
        /** 
         * @private
         * @type {string} */
        this.fillColor = opts.fillColor || "#c08c5968"
    }


    /**
     * Draw cells as squares depending on their value.
     * 
     * @param {Array.<Cell>} cells 
     * @param {number} r 
     * @param {GeoCanvas} cg 
     */
    draw(cells, r, cg) {
        //zoom factor
        const zf = cg.getZf()

        //compute statistics
        const stat = Style.getStatistics(cells, c => c[this.heightCol], true)

        //index cells by y and x
        /**  @type {object} */
        const ind = {};
        for (const cell of cells) {
            let row = ind[cell.y];
            if (!row) { row = {}; ind[cell.y] = row }
            row[cell.x] = this.height(cell[this.heightCol], r, stat, zf);
        }


        //compute extent
        const e = cg.extGeo;
        if (!e) return;
        const xMin = Math.floor(e.xMin / r) * r;
        const xMax = Math.floor(e.xMax / r) * r;
        const yMin = Math.floor(e.yMin / r) * r;
        const yMax = Math.floor(e.yMax / r) * r;

        //set color and width
        cg.ctx.strokeStyle = this.lineColor;
        cg.ctx.lineWidth = this.lineWidth * zf;
        cg.ctx.fillStyle = this.fillColor;

        //draw in geo coordinates
        cg.setCanvasTransform()

        //draw lines, row by row, stating from the top
        for (let y = yMax; y >= yMin; y -= r) {

            //get row
            const row = ind[y]

            //no row
            if (!row) continue;

            //place first point
            cg.ctx.beginPath();
            cg.ctx.moveTo(xMin - r / 2, y);

            //store the previous height
            /** @type {number|undefined} */
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
                    cg.ctx.lineTo(x + r / 2, y + hG);
                } else {
                    //else move the point
                    cg.ctx.moveTo(x + r / 2, y);
                }
                //store the previous value
                hG_ = hG;
            }

            //last point
            if (hG_)
                cg.ctx.lineTo(xMax + r / 2, y);

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
    getHeightCol() { return this.heightCol; }
    /** @param {string} val @returns {this} */
    setHeightCol(val) { this.heightCol = val; return this; }

    /** @returns {function(number,number,Stat|undefined,number):number} */
    getHeight() { return this.height; }
    /** @param {function(number,number,Stat|undefined,number):number} val @returns {this} */
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
