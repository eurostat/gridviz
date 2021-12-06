//@ts-check

import { Style, Size } from "../Style"
import { Cell } from "../Dataset"
import { CanvasGeo } from "../CanvasGeo";

/** @typedef {"square"|"circle"} Shape */

/**
 * 
 * @author Julien Gaffuri
 */
export class RadarStyle extends Style {

    /** @param {object} opts */
    constructor(opts) {
        super(opts)
        opts = opts || {};

        /**
         * The dictionary which give the color of each category.
         * @private @type {object} */
        this.color = opts.color;

        /**
         * @private @type {{val: function(number):number, unit: "pix"|"geo"}} */
        this.radius = opts.radius;

    }


    /**
     * Draw cells as squares depending on their value.
     * 
     * @param {Array.<Cell>} cells 
     * @param {number} resolution 
     * @param {CanvasGeo} cg 
     */
    draw(cells, resolution, cg) {

        //nb categories
        const nbCat = Object.entries(this.color).length
        const angle = 2 * Math.PI / nbCat
        let angleCumul = 0

        for (let cell of cells) {

            //compute cell center position
            const xc = cg.geoToPixX(cell.x + resolution * 0.5 + this.offset.dx);
            const yc = cg.geoToPixY(cell.y + resolution * 0.5 + this.offset.dy);

            //draw decomposition symbol
            for (let [column, color] of Object.entries(this.color)) {

                //set color
                cg.ctx.fillStyle = color;

                //get categroy value
                const val = cell[column]

                //radius - in pixel
                /** @type {number} */
                const rP = this.radius.unit === "pix" ? this.radius.val(val) : this.radius.val(val) / cg.zf

                cg.ctx.beginPath();
                cg.ctx.moveTo(xc, yc);
                cg.ctx.arc(xc, yc, rP, angleCumul, angleCumul + angle);
                cg.ctx.lineTo(xc, yc);
                cg.ctx.fill();

                //
                angleCumul += angle

                //TODO draw stroke ?
            }

        }

    }

}
