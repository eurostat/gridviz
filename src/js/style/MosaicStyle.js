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

        /** The mosaic factor, within [0,0.5]. Set to 0 for no mosaic effect. Set to 0.5 for strong mosaic effect.
         *  @protected @type {number} */
        this.mosaicFactor = opts.mosaicFactor || 0.2;

        /** The mosaic shadow color.
         *  @protected @type {string} */
        this.shadowColor = opts.shadowColor || "#555";

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

        //set stroke style, for shadow
        cg.ctx.strokeStyle = this.shadowColor;
        cg.ctx.lineWidth = 0.15 * resolution;

        //function to compute position disturbance
        const d = resolution * this.mosaicFactor
        const makeRandom = () => { return { x: Math.random() * d, y: Math.random() * d } }

        //draw with HTML canvas
        //in geo coordinates
        cg.setCanvasTransform()

        for (let cell of cells) {

            //get offset
            const offset = this.offset(cell, resolution, zf)

            //compute position disturbance
            const ll = makeRandom(), ul = makeRandom(), lr = makeRandom(), ur = makeRandom()

            //stroke
            cg.ctx.beginPath();
            cg.ctx.moveTo(
                cell.x + offset.dx + ll.x,
                cell.y + offset.dy + ll.y,
            );
            cg.ctx.lineTo(
                cell.x + offset.dx + sG - lr.x,
                cell.y + offset.dy + lr.y,
            );
            cg.ctx.lineTo(
                cell.x + offset.dx + sG - ur.x,
                cell.y + offset.dy + sG - ur.y,
            );
            cg.ctx.stroke();


            //fill

            //set fill color
            const col = this.color ? this.color(cell[this.colorCol], resolution, statColor) : undefined;
            if (!col || col === "none") continue
            cg.ctx.fillStyle = col;

            cg.ctx.beginPath();
            cg.ctx.moveTo(
                cell.x + offset.dx + ll.x,
                cell.y + offset.dy + ll.y,
            );
            cg.ctx.lineTo(
                cell.x + offset.dx + sG - lr.x,
                cell.y + offset.dy + lr.y,
            );
            cg.ctx.lineTo(
                cell.x + offset.dx + sG - ur.x,
                cell.y + offset.dy + sG - ur.y,
            );
            cg.ctx.lineTo(
                cell.x + offset.dx + ul.x,
                cell.y + offset.dy + sG - ul.y,
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
