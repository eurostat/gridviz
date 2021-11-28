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

        //convert cell coordinates into geographical coordinates
        this.geoTile(gridInfo)
    }


    /**
     * Convert cell position from tile position into geo position
     * 
     * @param {GridInfo} gridInfo 
     */
    geoTile(gridInfo) {

        const r = gridInfo.resolutionGeo;
        const s = gridInfo.tileSizeCell;
        const xMin = gridInfo.originPoint.x + r * s * this.x
        const yMin = gridInfo.originPoint.y + r * s * this.y

        //compute geographical coordinates of cells
        for (let cell of this.cells) {
            cell.x = xMin + cell.x * r;
            cell.y = yMin + cell.y * r;
        }
    }


    /**
     * Check if the tile need to be drawn after receiving its data from http request.
     * That is if:
     * 1- the til is still within the viewer geo extent.
     * AND 2- the tile belongs to a layer whose zoom extent is within the current viewer zoom level.
     * @returns {boolean}
     */
    needToLaunchRedraw() {

        //TODO check redraw condition

        return true;
    }
}
