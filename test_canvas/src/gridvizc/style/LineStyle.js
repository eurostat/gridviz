//@ts-check

import { Style } from "../viewer/Style"
import { Cell } from "../viewer/Dataset"
import { CanvasGeo } from "../viewer/CanvasGeo";

export class LineStyle extends Style {

    /**
      * @param {string|function} value 
      */
    constructor(value) {
        super(value)
    }


    /**
     * Draw cells as squares depending on their value.
 * 
 * @param {Array.<Cell>} cells 
 * @param {number} resolution 
 * @param {CanvasGeo} cg 
 */
    draw(cells, resolution, cg) {

        const r = resolution / cg.ps;

        //index cells by y
        const ind = {};
        for (const cell of cells) {
            let col = ind[cell.y];
            if(!col) { col=[]; ind[cell.y]=col }
            col.push(cell)
        }

        console.log(ind)


        //for each row, draw line

        cg.ctx.strokeStyle = "blue";
        cg.ctx.lineWidth = 3;
        cg.ctx.beginPath();
        cg.ctx.moveTo(10, 100);
        cg.ctx.lineTo(300, 100);
        cg.ctx.lineTo(30, 200);
        cg.ctx.stroke();


    }

}
