//@ts-check
/** @typedef { {xMin: number, xMax: number, yMin: number, yMax: number} } Envelope */
/** @typedef {{ dims: object, crs: string, tileSizeCell: number, originPoint: {x:number,y:number}, resolutionGeo: number, tilingBounds:Envelope }} GridInfo */
/** @typedef {{x: number, y: number}} Cell */

import { json, csv } from "d3-fetch";
import { GridTile } from './GridTile';

export class TiledGrid {

    /**
     * 
     * @param {string} url 
     */
    constructor(url) {

        /** @type {string} */
        this.url = url;

        /** @type {Object} */
        this.cache = {}

        /** @type {GridInfo} */
        this.info = undefined;
        this.getInfo()

        /** @type {function} */
        this.tfun = ()=>{ /** A callback function to execute after the gridinfo has been retrieved. */};

    }


    /** @returns {GridInfo} */
    getInfo() {
        if(!this.info)
            json(this.url+"/info.json").then(
                /** @param {*} data */
                 (data) => {
                    this.info = data;
                    this.tfun();
                }
         );
        return this.info;
    }



    then(tfun) {
        this.tfun = tfun;
        return this;
    }


    /** @returns {Envelope} */
    getTilingEnvelope(e) {
        /** @type {{ x:number, y:number }} */
        const po = this.getInfo().originPoint
        /** @type {number} */
        const r = this.getInfo().resolutionGeo
        /** @type {number} */
        const s = this.getInfo().tileSizeCell;

        return {
            xMin: Math.floor( (e.xMin-po.x)/(r*s) ),
            xMax: Math.floor( (e.xMax-po.x)/(r*s) ),
            yMin: Math.floor( (e.yMin-po.y)/(r*s) ),
            yMax: Math.floor( (e.yMax-po.y)/(r*s) )
        }
    }

    /**
     * Request tiles within a geographic envelope.
     * 
     * @param {Envelope} e 
     * @param {function} fun 
     */
    requestTiles(e, fun){

        //tiles within the scope
        /** @type {Envelope} */
        const tb = this.getTilingEnvelope(e);
        //grid bounds
        /** @type {Envelope} */
        const gb = this.getInfo().tilingBounds;

        for(let xT=Math.max(tb.xMin,gb.xMin); xT<=Math.min(tb.xMax,gb.xMax); xT++) {
            for(let yT=Math.max(tb.yMin,gb.yMin); yT<=Math.min(tb.yMax,gb.yMax); yT++) {

                //prepare cache
                if(!this.cache[xT]) this.cache[xT]={};

                //check if tile exists in the cache
                /** @type {GridTile} */
                let tile = this.cache[xT][yT];
                if(tile) continue;

                //mark as loading
                this.cache[xT][yT] = "loading"

                //get tile request
                csv( this.url+xT+"/"+yT+".csv" ).then(
                    /** @param {*} data */
                    (data) => {
                    //store tile in cache
                    this.cache[xT][yT] = new GridTile(data, xT, yT, this.getInfo());

                    //draw 
                    fun()
                }).catch(()=>{
                    //mark as failed
                    this.cache[xT][yT] = "failed"
                });
            }
        }
    }

    /**
     * Get all cells from cache which are within a geographical envelope
     * 
     * @param {Envelope} e 
     * @returns {Array.<Cell>}
     */
    getCells(e){
        /** @type {Array.<Cell>} */
        let cells = []

        //tiles within the scope
        /** @type {Envelope} */
        const tb = this.getTilingEnvelope(e);
        //grid bounds
        /** @type {Envelope} */
        const gb = this.getInfo().tilingBounds;

        for(let xT=Math.max(tb.xMin,gb.xMin); xT<=Math.min(tb.xMax,gb.xMax); xT++) {
            if(!this.cache[xT]) continue;
            for(let yT=Math.max(tb.yMin,gb.yMin); yT<=Math.min(tb.yMax,gb.yMax); yT++) {

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
