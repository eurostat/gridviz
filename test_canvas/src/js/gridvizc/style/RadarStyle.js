//@ts-check

import { Style, Size } from "../Style"
import { Cell } from "../Dataset"
import { CanvasGeo } from "../CanvasGeo";

/**
 * A style showing the composition of the grid cell as a "radar" chart.
 * It is a bit like a pie chart, except the angular amplitude of each part is the same but the radius of the part changes depending on the category importance.
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
         * 
         * @private @type {object} */
        this.color = opts.color;

        /**
         * The function specifying how the radius evolves depending on the statistical value.
         * 
         * @private @type {{val: function(number):number, unit: "pix"|"geo"}} */
        this.radius = opts.radius;

    }


    /**
     * Draw cells.
     * 
     * @param {Array.<Cell>} cells 
     * @param {number} resolution 
     * @param {CanvasGeo} cg 
     */
    draw(cells, resolution, cg) {

        //nb categories
        const nbCat = Object.entries(this.color).length

        //angle for each category: the same for all.
        const angle = 2 * Math.PI / nbCat
        let angleCumul = Math.PI

        for (let cell of cells) {

            //compute cell center position
            const xc = cg.geoToPixX(cell.x + resolution * 0.5 + this.offset.dx);
            const yc = cg.geoToPixY(cell.y + resolution * 0.5 + this.offset.dy);

            //draw decomposition symbols
            for (let [column, color] of Object.entries(this.color)) {

                //set category color
                cg.ctx.fillStyle = color;

                //get categroy value
                const val = cell[column]

                //compute category radius - in pixel
                /** @type {number} */
                const rP = this.radius.unit === "pix" ? this.radius.val(val) : this.radius.val(val) / cg.zf

                //draw angular sector
                cg.ctx.beginPath();
                cg.ctx.moveTo(xc, yc);
                cg.ctx.arc(xc, yc, rP, angleCumul -angle , angleCumul);
                cg.ctx.lineTo(xc, yc);
                cg.ctx.fill();

                //next angular sector
                angleCumul -= angle
            }

        }

    }


    //getters and setters

    /** @returns {function(Cell):string} */
    getColor() { return this.color; }
    /** @param {function(Cell):string} val @returns {this} */
    setColor(val) { this.color = val; return this; }

    /** @returns {{val: function(number):number, unit: "pix"|"geo"}} */
    getRadius() { return this.radius; }
    /** @param {{val: function(number):number, unit: "pix"|"geo"}} val @returns {this} */
    setRadius(val) { this.radius = val; return this; }

}
