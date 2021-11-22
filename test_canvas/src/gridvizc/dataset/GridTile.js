//@ts-check

import { Cell } from "../viewer/Dataset"
import { GridInfo } from "./TiledGrid"

export class GridTile {

    /**
     * 
     * @param {Array.<Cell>} data 
     * @param {number} xT 
     * @param {number} yT 
     * @param {GridInfo} gridInfo 
     */
    constructor(data, xT, yT, gridInfo) {

        /** @type {Array.<Cell>} */
        this.cells = data;
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

}
