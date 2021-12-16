//@ts-check

import { Style, Stat, getStatistics } from "../Style"
import { Cell } from "../Dataset"
import { GeoViewer } from "../GeoViewer";

/**
 * 
 * @author Julien Gaffuri
 */
export class AgePyramidStyle extends Style {

    /** @param {object} opts */
    constructor(opts) {
        super(opts)
        opts = opts || {};

        /**
         * The dictionary which give the color of each category.
         * @private @type {object} */
        this.color = opts.color;

        /** The column where to get the size values.
         * @private @type {string} */
        this.sizeCol = opts.sizeCol

        /** A function returning the size of a cell.
         * @private @type {function(number,number,Stat,number):number} */
        this.size = opts.size || ((v) => Math.sqrt(v));
    }


    /**
     * Draw cells as squares depending on their value.
     * 
     * @param {Array.<Cell>} cells 
     * @param {number} resolution 
     * @param {GeoViewer} cg 
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
            if (!total) continue

            //size
            /** @type {function(number,number,Stat,number):number} */
            let s_ = this.size || (() => resolution);
            //size - in pixel and geo
            /** @type {number} */
            const sG = s_(cell[this.sizeCol], resolution, stat, cg.zf)
            /** @type {number} */
            const sP = sG / cg.zf;

            //get symbol type
            const type_ = this.type ? this.type(cell) : "flag"

            //get offset
            const offset = this.offset(cell, resolution, cg.zf)

            //draw decomposition symbol
            let cumul = 0;
            const d = resolution * (1 - sG / resolution) * 0.5
            for (let [column, color] of Object.entries(this.color)) {

                //get share
                const share = cell[column] / total;
                if (!share) continue

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
                    const xc = cg.geoToPixX(cell.x + resolution * 0.5 + offset.dx);
                    const yc = cg.geoToPixY(cell.y + resolution * 0.5 + offset.dy);
                    cg.ctx.beginPath();
                    cg.ctx.moveTo(xc, yc);
                    cg.ctx.arc(xc, yc, sP * 0.5, cumul * 2 * Math.PI, (cumul + share) * 2 * Math.PI);
                    cg.ctx.lineTo(xc, yc);
                    cg.ctx.fill();
                } else if (type_ === "ring") {
                    //draw ring
                    //TODO need to compute radius properly ! Variation as rootsquare of share !
                    cg.ctx.beginPath();
                    cg.ctx.arc(
                        cg.geoToPixX(cell.x + resolution * 0.5 + offset.dx),
                        cg.geoToPixY(cell.y + resolution * 0.5 + offset.dy),
                        Math.sqrt(1 - cumul) * sP * 0.5,
                        0, 2 * Math.PI);
                    cg.ctx.fill();
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

    /** @returns {function(number,number,Stat,number):number} */
    getSize() { return this.size; }
    /** @param {function(number,number,Stat,number):number} val @returns {this} */
    setSize(val) { this.size = val; return this; }

}
