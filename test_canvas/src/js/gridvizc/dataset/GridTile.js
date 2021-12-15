//@ts-check

import { Cell } from "../Dataset"
import { GridInfo } from "./TiledGrid"

/**
 * A grid tile.
 * 
 * @author Julien Gaffuri
 */
export class GridTile {

    /**
     * @param {Array.<Cell>} cells The tile cells.
     * @param {number} xT The X position of the tile.
     * @param {number} yT The Y position of the tile.
     * @param {GridInfo} gridInfo The grid info object.
     */
    constructor(cells, xT, yT, gridInfo) {

        /** @type {Array.<Cell>} */
        this.cells = cells;
        /** @type {number} */
        this.x = xT
        /** @type {number} */
        this.y = yT

        const r = gridInfo.resolutionGeo;
        const s = gridInfo.tileSizeCell;

        /** @type {import("../Dataset").Envelope} */
        this.extGeo = {
            xMin: gridInfo.originPoint.x + r * s * this.x,
            xMax: gridInfo.originPoint.x + r * s * (this.x + 1),
            yMin: gridInfo.originPoint.y + r * s * this.y,
            yMax: gridInfo.originPoint.y + r * s * (this.y + 1)
        }

        //convert cell coordinates into geographical coordinates
        for (let cell of this.cells) {
            cell.x = this.extGeo.xMin + cell.x * r;
            cell.y = this.extGeo.yMin + cell.y * r;
        }
    }

}
