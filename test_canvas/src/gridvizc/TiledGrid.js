//@ts-check

import { json, csv } from "d3-fetch";

export class TiledGrid {

    constructor(url) {

        /** @type {string} */
        this.url = url;

        /** @type {Array.<GridTile>} */
        this.tiles = [];

        /** @type {Object} */
        this.info = undefined;
        this.getInfo()

        /** @type {function} */
        this.tfun = ()=>{};

        //TODO
        //dictionary code->tile
        this.cache = {}
    }

    //get grid info
    getInfo() {
        if(!this.info)
            json(this.url+"/info.json").then((data) => {
                this.info = data;
                this.tfun();
         });
         return this.info;
    }



    then(tfun) {
        this.tfun = tfun;
        return this;
    }


    requestTiles(e, fun){

        const po = this.getInfo().originPoint
        /** @type {number} */
        const r = this.getInfo().resolutionGeo
        /** @type {number} */
        const s = this.getInfo().tileSizeCell;

        const xTMin = Math.floor( (e.xMin-po.x)/(r*s) )
        const xTMax = Math.floor( (e.xMax-po.x)/(r*s) )
        const yTMin = Math.floor( (e.yMin-po.y)/(r*s) )
        const yTMax = Math.floor( (e.yMax-po.y)/(r*s) )

        //TODO use also min/max from gridinfo
        for(let xT=xTMin; xT<xTMax; xT++) {
            for(let yT=yTMin; yT<yTMax; yT++) {

                //get cells
                csv( this.url+xT+"/"+yT+".csv" ).then((data) => {
                    const tile = new GridTile(data, xT, yT, this.getInfo());
                    this.tiles.push(tile)
                    fun();
                });

            }
        }


    }


}




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

        for(let i=0; i<this.cells.length; i++) {
            const cell = this.cells[i];
            /** @type {number} */
            cell.x = xMin + cell.x * r;
            /** @type {number} */
            cell.y = yMin + cell.y * r;
            //console.log(cell)
        }
    }


}
