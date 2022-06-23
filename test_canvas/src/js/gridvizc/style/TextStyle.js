//@ts-check

import { Style, Stat, getStatistics } from "../Style"
import { Cell } from "../Dataset"
import { GeoCanvas } from "../GeoCanvas";

/**
 * 
 * @author Julien Gaffuri
 */
export class TextStyle extends Style {

    /** @param {object} opts */
    constructor(opts) {
        super(opts)
        opts = opts || {};

        /** The name of the column/attribute of the tabular data where to retrieve the variable for text.
         *  @protected @type {string} */
        this.textCol = opts.textCol;

        /** A function returning the text of a cell.
         * @private @type {function(number,number,Stat|undefined):string} */
        this.text = opts.text || ((v, r, s, z) => "X")

        /** The name of the column/attribute of the tabular data where to retrieve the variable for color.
         *  @protected @type {string} */
        this.colorCol = opts.colorCol;

        /** A function returning the color of the cell.
        * @protected @type {function(number,number,Stat|undefined):string} */
        this.color = opts.color || (() => "#EA6BAC");



        /** The name of the column/attribute of the tabular data where to retrieve the variable for font size.
         * @protected @type {string} */
        this.fontSizeCol = opts.fontSizeCol;

        /** A function returning the font size of a cell in geo unit.
        * @protected @type {function(number,number,Stat|undefined,number):number} */
        this.fontSize = opts.fontSize || ((v, r, s, z) => r - 2);



        /** A function returning the font family.
        * @private @type {string} */
        this.fontFamily = opts.fontFamily || "Arial"

        /** A function returning the font weight.
         * @private @type {string} */
        this.fontWeight = opts.fontWeight || "bold"
    }


    /**
     * Draw cells as text.
     * 
     * @param {Array.<Cell>} cells 
     * @param {number} r 
     * @param {GeoCanvas} cg 
     */
    draw(cells, r, cg) {
        //zoom factor
        const zf = cg.getZf()

        let statText
        if (this.textCol) {
            //compute text variable statistics
            statText = getStatistics(cells, c => c[this.textCol], true)
        }

        let statColor
        if (this.colorCol) {
            //compute color variable statistics
            statColor = getStatistics(cells, c => c[this.colorCol], true)
        }

        let statFontSize
        if (this.fontSizeCol) {
            //if size is used, sort cells by size so that the biggest are drawn first
            cells.sort((c1, c2) => c2[this.fontSizeCol] - c1[this.fontSizeCol]);
            //and compute size variable statistics
            statFontSize = getStatistics(cells, c => c[this.fontSizeCol], true)
        }

        for (let cell of cells) {
            //see https://www.w3schools.com/graphics/canvas_text.asp

            //get cell text
            const text = this.text ? this.text(cell[this.textCol], r, statColor) : undefined;
            if (!text) continue;

            //color
            const col = this.color ? this.color(cell[this.colorCol], r, statColor) : undefined;
            if (!col) continue
            cg.ctx.fillStyle = col;

            //font size
            /** @type {function(number,number,Stat|undefined,number):number} */
            let s_ = this.fontSize || (() => r / zf - 2);
            //size - in pixel unit
            const fontSizePix = s_(cell[this.fontSizeCol], r, statFontSize, zf) / zf;

            //set font
            const fontFamily = this.fontFamily || "Arial";
            const fontWeight = this.fontWeight || "bold";
            cg.ctx.font = fontWeight + " " + fontSizePix + "px " + fontFamily;

            //get offset
            const offset = this.offset(cell, r, zf)

            //text position
            cg.ctx.textAlign = "center";
            const tx = cg.geoToPixX(cell.x + r * 0.5 + offset.dx);
            const ty = cg.geoToPixY(cell.y + r * 0.5 + offset.dy) + fontSizePix * 0.5;

            //draw the text
            cg.ctx.fillText(text, tx, ty);

            //draw stroke of the cell as a square ?
            //this.drawStroke(cell, r, cg, c => "square")
        }

    }


    //getters and setters

    //TODO

}
