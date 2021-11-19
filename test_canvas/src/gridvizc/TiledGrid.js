//@ts-check

import { json, csv } from "d3-fetch";

export class TiledGrid {

    constructor(url) {

        /** @type {string} */
        this.url = url;

        //this.tiles = [];
        //TODO
        //dictionary code->tile
        this.cache = {}

        /** @type {Object} */
        this.info = undefined;
        this.getInfo()

        /** @type {function} */
        this.tfun = ()=>{};

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


    //request tiles within a geographic envelope.
    requestTiles(e, fun){

        const po = this.getInfo().originPoint
        /** @type {number} */
        const r = this.getInfo().resolutionGeo
        /** @type {number} */
        const s = this.getInfo().tileSizeCell;
        const tb = this.getInfo().tilingBounds;

        const xTMin = Math.floor( (e.xMin-po.x)/(r*s) )
        const xTMax = Math.floor( (e.xMax-po.x)/(r*s) )
        const yTMin = Math.floor( (e.yMin-po.y)/(r*s) )
        const yTMax = Math.floor( (e.yMax-po.y)/(r*s) )

        for(let xT=Math.max(xTMin,tb.minX); xT<=Math.min(xTMax,tb.maxX); xT++) {
            for(let yT=Math.max(yTMin,tb.minY); yT<=Math.min(yTMax,tb.maxY); yT++) {

                //prepare cache
                if(!this.cache[xT]) this.cache[xT]={};

                //check if tile exists in the cache
                let tile = this.cache[xT][yT];
                if(tile) continue;

                //mark as loading
                this.cache[xT][yT] = "loading"

                //get tile request
                csv( this.url+xT+"/"+yT+".csv" ).then((data) => {
                    //store tile in cache
                    this.cache[xT][yT] = new GridTile(data, xT, yT, this.getInfo());
                    fun();
                }).catch(()=>{
                    //mark as failed
                    this.cache[xT][yT] = "failed"
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
