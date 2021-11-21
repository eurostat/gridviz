//@ts-check
/** @typedef { {xMin: number, xMax: number, yMin: number, yMax: number} } Envelope */
/** @typedef {{ dims: object, crs: string, tileSizeCell: number, originPoint: {x:number,y:number}, resolutionGeo: number, tilingBounds:Envelope }} GridInfo */
/** @typedef {{x: number, y: number}} Cell */

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

        /** @type {number} */
        const r = gridInfo.resolutionGeo;
        /** @type {number} */
        const s = gridInfo.tileSizeCell;
        /** @type {number} */
        const xMin = gridInfo.originPoint.x + r*s*this.x
        /** @type {number} */
        const yMin = gridInfo.originPoint.y + r*s*this.y

        //compute geographical coordinates of cells
        for (let cell of this.cells) {
            /** @type {number} */
            cell.x = xMin + cell.x * r;
            /** @type {number} */
            cell.y = yMin + cell.y * r;
        }
    }

}
