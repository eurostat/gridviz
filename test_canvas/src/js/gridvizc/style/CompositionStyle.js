//@ts-check

import { Style, Stat, getStatistics } from "../Style"
import { Cell } from "../Dataset"
import { GeoCanvas } from "../GeoCanvas";

/** @typedef {"flag"|"piechart"|"ring"|"segment"|"radar"|"agepyramid"|"halftone"} CompositionType */

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
        this.pieChartInternalRadiusFactor = opts.pieChartInternalRadiusFactor || 0

        /** The function specifying an offset angle for a radar or halftone style.
         * @private @type {function(Cell,number,number):number} */
        this.offsetAngle = opts.offsetAngle;

        /** The function specifying the height of the age pyramid, in geo unit.
        * @private @type {function(number):number} */
        this.agePyramidHeight = opts.agePyramidHeight;
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

        //nb categories - used for radar and agepyramid
        const nbCat = Object.entries(this.color).length

        //draw in geo coordinates
        cg.setCanvasTransform()

        //draw calls
        for (let cell of cells) {

            //size
            /** @type {function(number,number,Stat|undefined,number):number} */
            let s_ = this.size || (() => r);
            //size - in geo
            /** @type {number} */
            const sG = s_(cell[this.sizeCol], r, stat, zf)

            //get offset
            const offset = this.offset(cell, r, zf)

            //get symbol type
            const type_ = this.type ? this.type(cell) : "flag"

            //compute center position
            const xc = cell.x + offset.dx + (type_ === "agepyramid" ? 0 : r * 0.5);
            const yc = cell.y + offset.dy + (type_ === "agepyramid" ? 0 : r * 0.5);

            if (type_ === "agepyramid" || type_ === "radar" || type_ === "halftone") {


                //get cell category max value
                let maxVal = -Infinity
                for (let key of Object.keys(this.color)) {
                    const v = +cell[key];
                    if (v > maxVal) maxVal = v
                }

                //cumul
                let cumul = 0;
                if (type_ === "agepyramid" && this.agePyramidHeight) cumul = (r - this.agePyramidHeight(r)) / 2
                if (type_ === "radar" || type_ === "halftone") cumul = Math.PI / 2 + (this.offsetAngle ? this.offsetAngle(cell, r, zf) * Math.PI / 180 : 0)

                //compute the increment, which is the value to increment the cumul for each category
                const incr = (type_ === "agepyramid") ?
                    (this.agePyramidHeight ? this.agePyramidHeight(r) : r) / nbCat
                    : (type_ === "radar" || type_ === "halftone") ?
                        2 * Math.PI / nbCat : undefined
                if (incr === undefined) throw new Error('Unexpected symbol type:' + type_);

                for (let [column, color] of Object.entries(this.color)) {

                    if (type_ === "agepyramid") {
                        //set category color
                        cg.ctx.fillStyle = color;

                        //get category value
                        const val = cell[column]

                        //compute category length - in geo
                        /** @type {number} */
                        const wG = sG * val / maxVal

                        //draw bar
                        cg.ctx.fillRect(
                            xc + (r - wG) / 2,
                            yc + cumul,
                            wG, incr);

                        //next height
                        cumul += incr

                    } else if (type_ === "radar") {
                        //set category color
                        cg.ctx.fillStyle = color;

                        //get categroy value
                        const val = cell[column]

                        //compute category radius - in geo
                        /** @type {number} */
                        //const rG = this.radius(val, r, stat, cellStat, zf)
                        const rG = sG / 2 * Math.sqrt(val / maxVal)

                        //draw angular sector
                        cg.ctx.beginPath();
                        cg.ctx.moveTo(xc, yc);
                        cg.ctx.arc(xc, yc, rG, cumul - incr, cumul);
                        cg.ctx.lineTo(xc, yc);
                        cg.ctx.fill();

                        //next angular sector
                        cumul += incr

                    } else if (type_ === "halftone") {
                        //set category color
                        cg.ctx.fillStyle = color;

                        //get categroy value
                        const val = cell[column]

                        //compute category radius - in geo
                        /** @type {number} */
                        //const rG = this.radius(val, r, stat, cellStat, zf)
                        const rG = sG / 4 * Math.sqrt(val / maxVal)

                        //draw circle
                        cg.ctx.beginPath();
                        cg.ctx.arc(
                            xc + r / 4 * Math.cos(cumul),
                            yc + r / 4 * Math.sin(cumul),
                            rG,
                            0, 2 * Math.PI);
                        cg.ctx.fill();

                        //next angular sector
                        cumul += incr
                    } else {
                        throw new Error('Unexpected symbol type:' + type_);
                    }
                }

            } else {

                //compute total
                let total = 0;
                for (let column of Object.keys(this.color)) {
                    const v = +cell[column];
                    if (!v) continue
                    total += v
                }
                if (!total || isNaN(total)) continue

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
                            cg.ctx.arc(xc, yc, sG * 0.5 * this.pieChartInternalRadiusFactor, a1, a2, true);
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

    /** @returns {function(Cell,number,number):number} */
    getOffsetAngle() { return this.offsetAngle; }
    /** @param {function(Cell,number,number):number} val @returns {this} */
    setOffsetAngle(val) { this.offsetAngle = val; return this; }

    /** @returns {function(number):number} */
    getAgePyramidHeight() { return this.agePyramidHeight; }
    /** @param {function(number):number} val @returns {this} */
    sethAgePyramidHeight(val) { this.agePyramidHeight = val; return this; }

}
