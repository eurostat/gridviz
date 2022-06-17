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

        /** For pie chart, this is parameter for internal radius, so that the pie chart looks like a donut.
         * 0 for normal pie charts, 0.5 to empty half of the radius. */
        this.pieChartInternalRadiusFactor = opts.pieChartInternalRadiusFactor || 0.5
    }


    /**
     * Draw cells as squares depending on their value.
     * 
     * @param {Array.<Cell>} cells 
     * @param {number} resolution 
     * @param {GeoCanvas} cg 
     */
    draw(cells, resolution, cg) {

        let stat
        if (this.sizeCol) {
            //if size is used, sort cells by size so that the biggest are drawn first
            cells.sort((c1, c2) => c2[this.sizeCol] - c1[this.sizeCol]);
            //and compute statistics
            stat = getStatistics(cells, c => c[this.sizeCol], true)
        }

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
            let s_ = this.size || (() => resolution);
            //size - in pixel and geo
            /** @type {number} */
            const sG = s_(cell[this.sizeCol], resolution, stat, cg.getZf())
            /** @type {number} */
            const sP = sG / cg.getZf();

            //get symbol type
            const type_ = this.type ? this.type(cell) : "flag"

            //get offset
            const offset = this.offset(cell, resolution, cg.getZf())

            //compute center position
            const xc = cg.geoToPixX(cell.x + resolution * 0.5 + offset.dx);
            const yc = cg.geoToPixY(cell.y + resolution * 0.5 + offset.dy);

            //draw decomposition symbol
            let cumul = 0;
            const d = resolution * (1 - sG / resolution) * 0.5
            for (let [column, color] of Object.entries(this.color)) {

                //get share
                const share = cell[column] / total;
                if (!share || isNaN(share)) continue

                //set color
                cg.ctx.fillStyle = color;

                //draw symbol part
                if (type_ === "flag") {

                    //draw flag vertical stripe
                    cg.ctx.fillRect(
                        cumul * sP + cg.geoToPixX(cell.x + d + offset.dx),
                        cg.geoToPixY(cell.y + resolution - d + offset.dy),
                        share * sP, sP);

                } else if (type_ === "piechart") {
                    //draw pie chart angular sector

                    //compute angles
                    const a1 = cumul * 2 * Math.PI
                    const a2 = (cumul + share) * 2 * Math.PI

                    //draw
                    cg.ctx.beginPath();
                    cg.ctx.moveTo(xc, yc);
                    cg.ctx.arc(xc, yc, sP * 0.5, a1, a2);
                    if (this.pieChartInternalRadiusFactor)
                        cg.ctx.arc(xc, yc, sP * 0.5 * this.pieChartInternalRadiusFactor, a2, a1, true);
                    cg.ctx.closePath();
                    cg.ctx.fill();

                } else if (type_ === "ring") {

                    //draw ring
                    cg.ctx.beginPath();
                    cg.ctx.arc(
                        xc,
                        yc,
                        Math.sqrt(1 - cumul) * sP * 0.5,
                        0, 2 * Math.PI);
                    cg.ctx.fill();

                } else if (type_ === "segment") {

                    /*/draw flag vertical stripe
                    cg.ctx.fillRect(
                        cumul * sP + cg.geoToPixX(cell.x + d + offset.dx),
                        cg.geoToPixY(cell.y + resolution - d + offset.dy),
                        share * sP, sP);*/

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

    /** @returns {function(number,number,Stat,number):number} */
    getPieChartInternalRadiusFactor() { return this.pieChartInternalRadiusFactor; }
    /** @param {function(number,number,Stat,number):number} val @returns {this} */
    setPieChartInternalRadiusFactor(val) { this.pieChartInternalRadiusFactor = val; return this; }
}
