//@ts-check

import { Style, Size } from "../Style"
import { Cell } from "../Dataset"
import { CanvasGeo } from "../CanvasGeo";

/**
 * 
 * @author Julien Gaffuri
 */
export class TextStyle extends Style {

    /**
      * @param {function(Cell):string} text A function returning the text of a cell.
      * @param {function(Cell):string} color A function returning the color of the cell.
      * @param {function(Cell):number} fontSize A function returning the font size of the cell label.
      * @param {function(Cell):string} fontFamily A function returning the font family of the cell label.
      */
     constructor(text, color = () => "black", fontSize = () => 10, fontFamily = () => "Arial") {
        super()

        /** @private @type {function(Cell):string} */
        this.text = text;

        /** @private @type {function(Cell):string} */
        this.color = color;

        /** @private @type {function(Cell):number} */
        this.fontSize = fontSize;

        /** @private @type {function(Cell):string} */
        this.fontFamily = fontFamily;
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

            //color
            cg.ctx.fillStyle = this.color ? this.color(cell) : "#EA6BAC";

            //text position
            cg.ctx.textAlign = "center";
            const tx = cg.geoToPixX(cell.x + r * 0.5 + this.offset.dx);
            const ty = cg.geoToPixY(cell.y + r * 0.5 + this.offset.dy);

            /*
            ctx.font = "30px Comic Sans MS";
            ctx.fillText("Hello World", canvas.width/2, canvas.height/2);
            */

            //draw stroke
            //this.drawStroke(cell, resolution, cg, "square", this.size)
        }

    }


    //getters and setters

    //TODO

}
