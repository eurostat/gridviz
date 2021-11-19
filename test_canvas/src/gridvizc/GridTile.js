//@ts-check

export class GridTile {


    constructor(data, xT, yT, gridInfo) {

        /** @type {Array} */
        this.cells = data;
        /** @type {number} */
        this.x = xT
        /** @type {number} */
        this.y = yT

        this.geoTile(gridInfo)
    }




    //convert cell position from tile position into geo position
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
        for(let i=0; i<this.cells.length; i++) {
            const cell = this.cells[i];
            /** @type {number} */
            cell.x = xMin + cell.x * r;
            /** @type {number} */
            cell.y = yMin + cell.y * r;
        }
    }


}
