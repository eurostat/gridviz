//@ts-check

import { Style } from "../viewer/Style"
import { Cell } from "../viewer/Dataset"
import { CanvasGeo } from "../viewer/CanvasGeo";

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
      * @param {function} type A function returning the type of decomposition symbol of a cell: Among 'flag', 'piechart' and 'ring'
      * @param {function} size A function returning the size of a cell (in geographical unit).
      */
    constructor(color, type = null, size = null) {
        super()

        //dictionnary column -> color
        /** @type {object} */
        this.color = color;

        /** @type {function} */
        this.type = type;

        /** @type {function} */
        this.size = size;
    }


    /**
     * Draw cells as squares depending on their value.
     * 
     * @param {Array.<Cell>} cells 
     * @param {number} resolution 
     * @param {CanvasGeo} cg 
     */
    draw(cells, resolution, cg) {

        //TODO if size provided, sort cells by size to draw the larger below

        for (let cell of cells) {

            //compute total
            let total = 0;
            for (let column of Object.keys(this.color))
                total += +cell[column]

            //size - in ground meters
            let sG = this.size ? this.size(cell) : resolution;
            //size - in pixel
            const s = sG / cg.zf

            //get symbol type
            const type_ = this.type ? this.type(cell) : "flag"

            //draw decomposition symbol
            let cumul = 0;
            const d = resolution * (1 - sG / resolution) * 0.5
            for (let [column, color] of Object.entries(this.color)) {

                //set color
                cg.ctx.fillStyle = color;

                //compute share
                const share = cell[column] / total;

                //draw symbol part
                if (type_ === "flag") {
                    //draw flag vertical stripe
                    cg.ctx.fillRect(cumul * s + cg.geoToPixX(cell.x + d), cg.geoToPixY(cell.y + resolution - d), share * s, s);
                } else if (type_ === "piechart") {
                    //draw pie chart angular sector
                    const xc = cg.geoToPixX(cell.x + resolution * 0.5);
                    const yc = cg.geoToPixY(cell.y + resolution * 0.5);
                    cg.ctx.beginPath();
                    cg.ctx.moveTo(xc, yc);
                    cg.ctx.arc(xc, yc, s * 0.5, cumul * 2 * Math.PI, (cumul + share) * 2 * Math.PI);
                    cg.ctx.lineTo(xc, yc);
                    cg.ctx.fill();
                } else if (type_ === "ring") {
                    //draw ring
                    //TODO
                    //TODO need to compute radius properly ! Variation as rootsquare of share !
                    cg.ctx.beginPath();
                    cg.ctx.arc(cg.geoToPixX(cell.x + resolution * 0.5), cg.geoToPixY(cell.y + resolution * 0.5),
                        Math.sqrt(1-cumul) * s * 0.5,
                    0, 2 * Math.PI);
                    cg.ctx.fill();
                } else {
                    throw new Error('Unexpected symbol type:' + type_);
                }

                cumul += share;
            }

        }

        //draw stroke
        this.drawStroke(cells, resolution, cg, (c) => {
            const type_ = this.type ? this.type(c) : "flag";
            return (type_ === "flag") ? "square" : "circle"
        }, this.size)
    }

}
