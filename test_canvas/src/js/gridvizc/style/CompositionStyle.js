//@ts-check

import { Style, Stat, getStatistics } from "../Style"
import { Cell } from "../Dataset"
import { GeoCanvas } from "../GeoCanvas";

/** @typedef {"flag"|"piechart"|"ring"|"segment"} CompositionType */

/**
 * A style showing the composition of a total in different categories, with different color hues.
 * It consists of a symbol with different parts, whose size reflect the proportion of the corresponding category.
 * 3 types of symbols are possible:
 * - Flag (square symbol, with decomposition into vertical stripes)
 * - Pie chart (circular symbol, with decomposition into angular sectors)
 * - Ring (circular symbol, with decomposition into concentric rings)
 * The symbol can be scaled depending on the cell importance.
 * 
 * @author Julien Gaffuri
 */
export class CompositionStyle extends Style {

    /** @param {object} opts */
    constructor(opts) {
        super(opts)
        opts = opts || {};

        /**
         * The dictionary which give the color of each category.
         * @private @type {object} */
        this.color = opts.color;

        /**
         * A function returning the type of decomposition symbol of a cell, @see CompositionType
         * @private @type {function(Cell):CompositionType} */
        this.type = opts.type;


        /** The column where to get the size values.
         * @private @type {string} */
        this.sizeCol = opts.sizeCol

        /** A function returning the size of a cell.
         * @private @type {function(number,number,Stat|undefined,number):number} */
        this.size = opts.size || ((v) => Math.sqrt(v));

        /** For style types with stripes (flag, segment), the orientation of the stripes.
         * @private @type {function(number,number,number):number} */
        this.stripesOrientation = opts.stripesOrientation || (() => 0);

        /** For pie chart, this is parameter for internal radius, so that the pie chart looks like a donut.
         * 0 for normal pie charts, 0.5 to empty half of the radius. */
        this.pieChartInternalRadiusFactor = opts.pieChartInternalRadiusFactor || 0.5
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

        let stat
        if (this.sizeCol) {
            //if size is used, sort cells by size so that the biggest are drawn first
            cells.sort((c1, c2) => c2[this.sizeCol] - c1[this.sizeCol]);
            //and compute statistics
            stat = getStatistics(cells, c => c[this.sizeCol], true)
        }

        //draw in geo coordinates
        cg.setCanvasTransform()

        for (let cell of cells) {

            //compute total
            let total = 0;
            for (let column of Object.keys(this.color)) {
                const v = +cell[column];
                if (!v) continue
                total += v
            }
            if (!total || isNaN(total)) continue

            //size
            /** @type {function(number,number,Stat|undefined,number):number} */
            let s_ = this.size || (() => r);
            //size - in geo
            /** @type {number} */
            const sG = s_(cell[this.sizeCol], r, stat, zf)

            //get symbol type
            const type_ = this.type ? this.type(cell) : "flag"

            //get offset
            const offset = this.offset(cell, r, zf)

            //compute center position
            const xc = cell.x + r * 0.5 + offset.dx;
            const yc = cell.y + r * 0.5 + offset.dy;

            //draw decomposition symbol
            let cumul = 0;
            const d = r * (1 - sG / r) * 0.5
            for (let [column, color] of Object.entries(this.color)) {

                //get share
                const share = cell[column] / total;
                if (!share || isNaN(share)) continue

                //set color
                cg.ctx.fillStyle = color;

                //draw symbol part
                if (type_ === "flag") {

                    //draw flag stripe
                    if (this.stripesOrientation(cell[this.sizeCol], r, zf) == 0) {
                        //horizontal
                        cg.ctx.fillRect(
                            cell.x + d + offset.dx,
                            cell.y + d + cumul * sG + offset.dy,
                            sG, share * sG);
                    } else {
                        //vertical
                        cg.ctx.fillRect(
                            cell.x + d + cumul * sG + offset.dx,
                            cell.y + d + offset.dy,
                            share * sG, sG);
                    }
                } else if (type_ === "piechart") {
                    //draw pie chart angular sector

                    //compute angles
                    const a1 = cumul * 2 * Math.PI
                    const a2 = (cumul + share) * 2 * Math.PI

                    //draw
                    cg.ctx.beginPath();
                    cg.ctx.moveTo(xc, yc);
                    cg.ctx.arc(xc, yc, sG * 0.5, a1, a2);
                    if (this.pieChartInternalRadiusFactor)
                        cg.ctx.arc(xc, yc, sG * 0.5 * this.pieChartInternalRadiusFactor, a2, a1, true);
                    cg.ctx.closePath();
                    cg.ctx.fill();

                } else if (type_ === "ring") {

                    //draw ring
                    cg.ctx.beginPath();
                    cg.ctx.arc(
                        xc,
                        yc,
                        Math.sqrt(1 - cumul) * sG * 0.5,
                        0, 2 * Math.PI);
                    cg.ctx.fill();

                } else if (type_ === "segment") {

                    //draw segment sections
                    const wG = sG * sG / r
                    if (this.stripesOrientation(cell[this.sizeCol], r, zf) == 0) {
                        //horizontal
                        cg.ctx.fillRect(
                            cell.x + offset.dx,
                            cell.y + (r - wG) / 2 + cumul * wG + offset.dy,
                            r, share * wG);
                    } else {
                        //vertical
                        cg.ctx.fillRect(
                            cell.x + cumul * r + offset.dx,
                            cell.y + (r - wG) / 2 + offset.dy,
                            share * r, wG);
                    }

                } else {
                    throw new Error('Unexpected symbol type:' + type_);
                }

                cumul += share;
            }

            /*/draw stroke
            this.drawStroke(cell, resolution, cg, (c) => {
                return (type_ === "flag") ? "square" : "circle"
            }, this.size)*/
            //TODO
        }

    }



    //getters and setters

    /** @returns {function(Cell):string} */
    getColor() { return this.color; }
    /** @param {function(Cell):string} val @returns {this} */
    setColor(val) { this.color = val; return this; }

    /** @returns {function(Cell):CompositionType} */
    getType() { return this.type; }
    /** @param {function(Cell):CompositionType} val @returns {this} */
    setType(val) { this.type = val; return this; }

    /** @returns {string} */
    getColSize() { return this.sizeCol; }
    /** @param {string} val @returns {this} */
    setColSize(val) { this.sizeCol = val; return this; }

    /** @returns {function(number,number,Stat|undefined,number):number} */
    getSize() { return this.size; }
    /** @param {function(number,number,Stat|undefined,number):number} val @returns {this} */
    setSize(val) { this.size = val; return this; }

    /** @returns {function(number,number,number):number} */
    getStripesOrientation() { return this.stripesOrientation; }
    /** @param {function(number,number,number):number} val @returns {this} */
    setStripesOrientation(val) { this.stripesOrientation = val; return this; }

    /** @returns {function(number,number,Stat,number):number} */
    getPieChartInternalRadiusFactor() { return this.pieChartInternalRadiusFactor; }
    /** @param {function(number,number,Stat,number):number} val @returns {this} */
    setPieChartInternalRadiusFactor(val) { this.pieChartInternalRadiusFactor = val; return this; }

}
