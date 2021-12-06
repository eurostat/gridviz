//@ts-check

import { Style } from "../Style"
import { Cell } from "../Dataset"
import { CanvasGeo } from "../CanvasGeo";

/**
 * 
 * @author Julien Gaffuri
 */
export class TextStyle extends Style {

    /** @param {object} opts */
    constructor(opts) {
        super(opts)
        opts = opts || {};

        /** A function returning the text of a cell.
         * @private @type {function(Cell):string} */
        this.text = opts.text || (c => c+"")

        /** A function returning the color of the cell.
         * @private @type {function(Cell):string} */
        this.color = opts.color || (() => "black")
        //TODO add stroke color aswell? This is only for fill

        /** A function returning the font size of the cell label.
         * @private @type {function(Cell):number} */
        this.fontSize = opts.fontSize || (() => 10)
        //TODO fontsize in geo also ? Here it is in pix only.

        /** A function returning the font family of the cell label.
         * @private @type {function(Cell):string} */
        this.fontFamily = opts.fontFamily || (() => "Arial")

        /** A function returning the font weight of the cell label.
         * @private @type {function(Cell):string} */
        this.fontWeight = opts.fontWeight || (() => "bold")
    }


    /**
     * Draw cells as text.
     * 
     * @param {Array.<Cell>} cells 
     * @param {number} r 
     * @param {CanvasGeo} cg 
     */
    draw(cells, r, cg) {

        //sort cells by size so that the biggest are drawn first
        cells.sort((c1, c2) => this.fontSize(c2) - this.fontSize(c1));

        for (let cell of cells) {
            //see https://www.w3schools.com/graphics/canvas_text.asp

            //get cell text
            const text = this.text(cell);
            if (!text) continue;

            //text color
            cg.ctx.fillStyle = this.color ? this.color(cell) : "#EA6BAC";

            //text size and font
            const fontSize = this.fontSize ? this.fontSize(cell) : 10;
            const fontFamily = this.fontFamily ? this.fontFamily(cell) : "Arial";
            const fontWeight = this.fontWeight ? this.fontWeight(cell) : "bold";
            cg.ctx.font = fontWeight + " " + fontSize + "px " + fontFamily;

            //text position
            cg.ctx.textAlign = "center";
            const tx = cg.geoToPixX(cell.x + r * 0.5 + this.offset.dx);
            const ty = cg.geoToPixY(cell.y + r * 0.5 + this.offset.dy) + fontSize * 0.5;

            //draw the text
            cg.ctx.fillText(text, tx, ty);

            //draw stroke of the cell as a square ?
            this.drawStroke(cell, r, cg, c => "square")
        }

    }


    //getters and setters

    //TODO

}
