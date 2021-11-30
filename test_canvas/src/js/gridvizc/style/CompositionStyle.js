//@ts-check

import { Style, Size } from "../Style"
import { Cell } from "../Dataset"
import { CanvasGeo } from "../CanvasGeo";

/** @typedef {"flag"|"piechart"|"ring"} CompositionType */

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

    /**
      * @param {Object} color The dictionary which give the color of each category.
      * @param {function(Cell):CompositionType} type A function returning the type of decomposition symbol of a cell, @see CompositionType
      * @param {Size} size A function returning the size of a cell (in geographical unit).
      */
    constructor(color, type = null, size = null) {
        super()

        //dictionnary column -> color
        /** @private @type {object} */
        this.color_ = color;

        /** @private @type {function(Cell):CompositionType} */
        this.type_ = type;

        /** @private @type {Size} */
        this.size_ = size;
    }


    /**
     * Draw cells as squares depending on their value.
     * 
     * @param {Array.<Cell>} cells 
     * @param {number} resolution 
     * @param {CanvasGeo} cg 
     */
    draw(cells, resolution, cg) {

        //if size is used, sort cells by size so that the biggest are drawn first
        if (this.size_)
            cells.sort((c1, c2) => (this.size_.val(c2) - this.size_.val(c1)));

        for (let cell of cells) {

            //compute total
            let total = 0;
            for (let column of Object.keys(this.color_))
                total += +cell[column]

            //size
            /** @type {Size} */
            let s_ = this.size_ || { val: c=>resolution, unit: "geo" };
            //size - in pixel and geo
            /** @type {number} */
            const sP = s_.unit === "pix" ? s_.val(cell) : s_.val(cell) / cg.zf
            /** @type {number} */
            const sG = cg.zf * sP;

            //get symbol type
            const type_ = this.type_ ? this.type_(cell) : "flag"

            //draw decomposition symbol
            let cumul = 0;
            const d = resolution * (1 - sG / resolution) * 0.5
            for (let [column, color] of Object.entries(this.color_)) {

                //set color
                cg.ctx.fillStyle = color;

                //compute share
                const share = cell[column] / total;

                //draw symbol part
                if (type_ === "flag") {
                    //draw flag vertical stripe
                    cg.ctx.fillRect(
                        cumul * sP + cg.geoToPixX(cell.x + d + this.offset_.dx),
                        cg.geoToPixY(cell.y + resolution - d + this.offset_.dy),
                        share * sP, sP);
                } else if (type_ === "piechart") {
                    //draw pie chart angular sector
                    const xc = cg.geoToPixX(cell.x + resolution * 0.5 + this.offset_.dx);
                    const yc = cg.geoToPixY(cell.y + resolution * 0.5 + this.offset_.dy);
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
                        cg.geoToPixX(cell.x + resolution * 0.5 + this.offset_.dx),
                        cg.geoToPixY(cell.y + resolution * 0.5 + this.offset_.dy),
                        Math.sqrt(1 - cumul) * sP * 0.5,
                        0, 2 * Math.PI);
                    cg.ctx.fill();
                } else {
                    throw new Error('Unexpected symbol type:' + type_);
                }

                cumul += share;
            }

            //draw stroke
            this.drawStroke(cell, resolution, cg, (c) => {
                return (type_ === "flag") ? "square" : "circle"
            }, this.size_)
        }

    }


    /**
     * @param {object} color 
     * @returns {this|object}
     */
    color(color) {
        if (color) {
            this.color_ = color;
            return this
        }
        return this.color_
    }

    /**
     * @param {function(Cell):CompositionType} type 
     * @returns {this|function(Cell):CompositionType}
     */
    type(type) {
        if (type) {
            this.type_ = type;
            return this
        }
        return this.type_
    }

    /**
     * @param {Size} size 
     * @returns {this|Size}
     */
    size(size) {
        if (size) {
            this.size_ = size;
            return this
        }
        return this.size_
    }

}
