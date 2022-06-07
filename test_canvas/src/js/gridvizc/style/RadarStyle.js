//@ts-check

import { Style, Stat } from "../Style"
import { Cell } from "../Dataset"
import { GeoCanvas } from "../GeoCanvas";

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
         * @private @type {function(number,number,Stat,number):number} */
        this.radius = opts.radius;

        /**
         * The function specifying how the offser angle.
         * 
         * @private @type {function(Cell,number,number):number} */
        this.offsetAngle = opts.offsetAngle;

    }


    /**
     * Draw cells.
     * 
     * @param {Array.<Cell>} cells 
     * @param {number} r 
     * @param {GeoCanvas} cg 
     */
    draw(cells, r, cg) {

        //nb categories
        const nbCat = Object.entries(this.color).length

        //angle for each category: the same for all.
        const angle = 2 * Math.PI / nbCat
        const f = Math.PI / 180

        //get the stat
        const stat = getStat(cells, this.color, true);

        for (let cell of cells) {

            //get offset
            const offset = this.offset(cell, r, cg.zf)

            //get offset angle
            const offsetAngle = this.offsetAngle ? this.offsetAngle(cell, r, cg.zf) : 0
            let angleCumul = Math.PI + offsetAngle * f

            //compute cell center position
            const xc = cg.geoToPixX(cell.x + r * 0.5 + offset.dx);
            const yc = cg.geoToPixY(cell.y + r * 0.5 + offset.dy);

            //draw decomposition symbols
            for (let [column, color] of Object.entries(this.color)) {

                //set category color
                cg.ctx.fillStyle = color;

                //get categroy value
                const val = cell[column]

                //compute category radius - in pixel
                /** @type {number} */
                const rP = this.radius(val, r, stat, cg.zf) / cg.zf

                //draw angular sector
                cg.ctx.beginPath();
                cg.ctx.moveTo(xc, yc);
                cg.ctx.arc(xc, yc, rP, angleCumul - angle, angleCumul);
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

    /** @returns {function(number,number,Stat,number):number} */
    getRadius() { return this.radius; }
    /** @param {function(number,number,Stat,number):number} val @returns {this} */
    setRadius(val) { this.radius = val; return this; }

    /** @returns {function(Cell,number,number):number} */
    getOffsetAngle() { return this.offsetAngle; }
    /** @param {function(Cell,number,number):number} val @returns {this} */
    setOffsetAngle(val) { this.offsetAngle = val; return this; }

}



/** 
* Get the stat, all categories together.
* @param {Array.<Cell>} cells 
* @param {object} color 
* @param {boolean} ignoreZeros 
* @returns {Stat}
*/
export const getStat = function (cells, color, ignoreZeros) {
    if (!cells || cells.length == 0) return undefined
    let min = Infinity
    let max = -Infinity
    //let sum = 0
    //let nb = 0
    const keys = Object.keys(color)
    for (const cell of cells) {
        for (let key of keys) {
            const v = +cell[key];
            if (ignoreZeros && !v) continue
            if (v < min) min = v
            if (v > max) max = v
            //sum += v
            //nb++
        }
    }
    return { min: min, max: max/*, mean: (sum / nb)*/ }
}
