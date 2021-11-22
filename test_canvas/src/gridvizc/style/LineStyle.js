//@ts-check

import { Style } from "../viewer/Style"
import { Cell } from "../viewer/Dataset"
import { CanvasGeo } from "../viewer/CanvasGeo";

/**
 * 
 * @author Julien Gaffuri
 */
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
        
        //index cells by y
        const ind = {};
        for (const cell of cells) {
            let col = ind[cell.y];
            if(!col) { col=[]; ind[cell.y]=col }
            col.push(cell)
        }

        //compute extent
        const e = cg.extGeo;
        const xMin = Math.floor(e.xMin / resolution) * resolution;
        const xMax = Math.floor(e.xMax / resolution) * resolution;
        const yMin = Math.floor(e.yMin / resolution) * resolution;
        const yMax = Math.floor(e.yMax / resolution) * resolution;

        cg.ctx.strokeStyle = "black";
        cg.ctx.lineWidth = 1;
        const r = resolution / cg.ps;

        for (let y = yMin; y <= yMax; y+=resolution) {
            cg.ctx.beginPath();
            cg.ctx.moveTo(cg.geoToPixX(xMin)-100, cg.geoToPixY(y));

            const row = ind[y];
            if(row) {

            }

            cg.ctx.lineTo(cg.geoToPixX(xMax)+100, cg.geoToPixY(y));
            cg.ctx.stroke();
        }




    }

}
