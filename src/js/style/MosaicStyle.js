//@ts-check

import { Style, getStatistics } from "../Style"
import { GeoCanvas } from "../GeoCanvas";

/**
 * @author Julien Gaffuri
 */
export class MosaicStyle extends Style {

    /** @param {object} opts */
    constructor(opts) {
        super(opts)
        opts = opts || {};

        /** The name of the column/attribute of the tabular data where to retrieve the variable for color.
         *  @protected @type {string} */
        this.colorCol = opts.colorCol;

        /** A function returning the color of the cell.
        * @protected @type {function(number,number,import("../Style").Stat|undefined):string} */
        this.color = opts.color || (() => "#EA6BAC");

    }


    /**
     * 
     * @param {Array.<import("../Dataset").Cell>} cells 
     * @param {number} resolution 
     * @param {GeoCanvas} cg 
     */
    draw(cells, resolution, cg) {
        //zoom factor
        const zf = cg.getZf()

        let statColor
        if (this.colorCol) {
            //compute color variable statistics
            statColor = getStatistics(cells, c => c[this.colorCol], true)
        }

        //size - in geo unit
        const sG = resolution
        const d = resolution * 0.15

        //stroke color
        cg.ctx.strokeStyle = "darkgray";
        cg.ctx.lineWidth = 2 * zf;

        const makeRandom = () => { return { dx: Math.random() * d, dy: Math.random() * d } }

        //draw with HTML canvas
        //in geo coordinates
        cg.setCanvasTransform()

        for (let cell of cells) {

            //get offset
            const offset = this.offset(cell, resolution, zf)

            //compute position perturbations

            //stroke
            cg.ctx.beginPath();
            cg.ctx.moveTo(
                cell.x + offset.dx + Math.random() * d,
                cell.y + offset.dy + Math.random() * d,
            );
            cg.ctx.lineTo(
                cell.x + offset.dx + sG - Math.random() * d,
                cell.y + offset.dy + Math.random() * d,
            );
            cg.ctx.lineTo(
                cell.x + offset.dx + sG - Math.random() * d,
                cell.y + offset.dy + sG - Math.random() * d,
            );
            cg.ctx.stroke();


            //fill

            //set fill color
            const col = this.color ? this.color(cell[this.colorCol], resolution, statColor) : undefined;
            if (!col || col === "none") continue
            cg.ctx.fillStyle = col;

            cg.ctx.beginPath();
            cg.ctx.moveTo(
                cell.x + offset.dx + Math.random() * d,
                cell.y + offset.dy + Math.random() * d,
            );
            cg.ctx.lineTo(
                cell.x + offset.dx + sG - Math.random() * d,
                cell.y + offset.dy + Math.random() * d,
            );
            cg.ctx.lineTo(
                cell.x + offset.dx + sG - Math.random() * d,
                cell.y + offset.dy + sG - Math.random() * d,
            );
            cg.ctx.lineTo(
                cell.x + offset.dx + Math.random() * d,
                cell.y + offset.dy + sG - Math.random() * d,
            );
            cg.ctx.fill()


        }

        //update legends
        this.updateLegends({ style: this, r: resolution, zf: zf, sColor: statColor });
    }


    //getters and setters

    /** @returns {function(number,number,import("../Style").Stat):string} */
    getColor() { return this.color; }
    /** @param {function(number,number,import("../Style").Stat|undefined):string} val @returns {this} */
    setColor(val) { this.color = val; return this; }

}
