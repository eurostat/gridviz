//@ts-check

import { Style } from "../viewer/Style"
import { Cell } from "../viewer/Dataset"
import { GridVizCanvas } from "../viewer/GridVizCanvas";
import { interpolateReds } from "d3-scale-chromatic"

export class ColorStyle extends Style {

    /**
      * @param {string|function} value 
      */
    constructor(value) {
        super(value)
    }


    /**
     * Draw cells.
     * 
     * @param {Array.<Cell>} cells 
     * @param {number} resolution 
     * @param {GridVizCanvas} app 
     */
    draw(cells, resolution, app) {

        const cp = app.cplus;
        const c2 = cp.c2d

        //TODO move that to a "clear" method.
        //clear
        c2.fillStyle = "black";
        c2.fillRect(0, 0, app.w, app.h);

        for (let cell of cells) {
            const value = this.getValue(cell);
            c2.fillStyle = this.getColor(value);
            c2.fillRect(cp.geoToPixX(cell.x), cp.geoToPixY(cell.y), resolution / cp.ps, resolution / cp.ps);
        }
    }

    //TODO better expose that
    getColor(v) {
        //TODO better
        return interpolateReds(v / 200)
    }

}
