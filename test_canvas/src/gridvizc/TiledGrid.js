//@ts-check

import { json, csv } from "d3-fetch";
import { GridTile } from './GridTile';

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


    getTilingEnvelope(e) {
        const po = this.getInfo().originPoint
        /** @type {number} */
        const r = this.getInfo().resolutionGeo
        /** @type {number} */
        const s = this.getInfo().tileSizeCell;

        return {
            minX: Math.floor( (e.xMin-po.x)/(r*s) ),
            minY: Math.floor( (e.yMin-po.y)/(r*s) ),
            maxX: Math.floor( (e.xMax-po.x)/(r*s) ),
            maxY: Math.floor( (e.yMax-po.y)/(r*s) )
        }
    }

    //request tiles within a geographic envelope.
    requestTiles(e, draw){

        //tiles within the scope
        const tb = this.getTilingEnvelope(e);
        //grid bounds
        const gb = this.getInfo().tilingBounds;

        for(let xT=Math.max(tb.minX,gb.minX); xT<=Math.min(tb.maxX,gb.maxX); xT++) {
            for(let yT=Math.max(tb.minY,gb.minY); yT<=Math.min(tb.maxY,gb.maxY); yT++) {

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

                    //TODO if movement, interupt redraw

                    //get cells within the view
                    const cells = this.getCells(e)
                    //draw cells
                    draw(cells)
                }).catch(()=>{
                    //mark as failed
                    this.cache[xT][yT] = "failed"
                });

            }
        }


    }

    //get all cells from cache which are within an envelope
    getCells(e){
        let cells = []

        //tiles within the scope
        const tb = this.getTilingEnvelope(e);
        //grid bounds
        const gb = this.getInfo().tilingBounds;

        for(let xT=Math.max(tb.minX,gb.minX); xT<=Math.min(tb.maxX,gb.maxX); xT++) {
            if(!this.cache[xT]) continue;
            for(let yT=Math.max(tb.minY,gb.minY); yT<=Math.min(tb.maxY,gb.maxY); yT++) {

                //get tile
                /** @type {GridTile} */
                const tile = this.cache[xT][yT];
                if(!tile || typeof tile === "string") continue;

                //get cells
                cells = cells.concat(tile.cells)
            }
        }

        return cells;
    }

}
