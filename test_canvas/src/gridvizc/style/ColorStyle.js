//@ts-check

import { interpolateReds } from "d3-scale-chromatic"

export class ColorStyle {

    constructor() {
        //nothing yet
    }

    //draw cells
    draw(cells, th, tg) {

        const cp = th.cplus;
        const c2 = cp.c2d

        //clear
        c2.fillStyle = "black";
        c2.fillRect(0, 0, th.w, th.h);

        /** @type {number} */
        const r = tg.info.resolutionGeo

        for (let j = 0; j < cells.length; j++) {
            const cell = cells[j];
            const value = cell[2011]; //TODO extract column name
            c2.fillStyle = this.getColor(value);
            c2.fillRect(cp.geoToPixX(cell.x), cp.geoToPixY(cell.y), r / cp.ps, r / cp.ps);
        }
    }

    getColor(v) {
        //TODO better
        return interpolateReds(v / 200)
    }

}
