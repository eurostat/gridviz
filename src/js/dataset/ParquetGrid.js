//@ts-check

import { DatasetComponent } from "../DatasetComponent";


/**
 * A dataset composed of a single parquet file (not tiled).
 * 
 * @author Julien Gaffuri
 */
export class ParquetGrid extends DatasetComponent {

    /**
     * @param {string} url The URL of the dataset.
     * @param {number} resolution The dataset resolution in geographical unit.
     * @param {{preprocess?:(function(import("../Dataset").Cell):boolean)}} opts 
     */
    constructor(url, resolution, opts = {}) {
        super(url, resolution, opts)

        /** 
         * @private
         * @type {Array.<import("../Dataset").Cell>} */
        this.cells = [];

        /**  
         * @type {string}
         * @private  */
        this.infoLoadingStatus = "notLoaded";
    }


    /**
     * Request data within a geographic envelope.
     * 
     * @param {import("../Dataset").Envelope|undefined} e 
     * @param {function():void} redraw 
     */
    getData(e, redraw) {

        //check if data already loaded
        if (this.infoLoadingStatus != "notLoaded") return this;

        //load data
        this.infoLoadingStatus = "loading";

        //https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Promise



        //duckdb attempt

        //https://duckdb.org/2021/10/29/duckdb-wasm.html
        //https://www.npmjs.com/package/@duckdb/duckdb-wasm
        //import * as duckdb from '@duckdb/duckdb-wasm';
        //await db.registerFileURL("remote.parquet", "https://origin/remote.parquet");




        //parquetjs attempt

        //https://github.com/ironSource/parquetjs#usage-reading-files
        //import { ParquetReader } from "parquetjs";
        //let reader = ParquetReader.openFile(this.url);

        /*
        // create a new cursor
        let cursor = reader.getCursor();

        // read all records from the file and print them
        let record = null;
        while (record = await cursor.next()) {
          console.log(record);
        }

        reader.close();
        */







        //parquetjs-lite attempt
        //https://github.com/ZJONSSON/parquetjs#reading-data-from-a-url
        //import * as request from "request";
        //import { ParquetReader } from "parquetjs-lite";
        
        //let reader = ParquetReader.openUrl(request,'https://domain/fruits.parquet');




        //parquet-wasm attempt
        //https://github.com/kylebarron/parquet-wasm
        //import { tableFromIPC } from "apache-arrow";
        // Edit the `parquet-wasm` import as necessary
        //import { readParquet } from "parquet-wasm/node";

        //import { tableFromIPC } from "apache-arrow";
        // Edit the `parquet-wasm` import as necessary
        //import { readParquet2 } from "parquet-wasm/node2";

        /*
        fetch(this.url).then((pm) => {

            pm.arrayBuffer().then((data) => {
                console.log(data)
                const parquetUint8Array = new Uint8Array(data);
                console.log(parquetUint8Array)
                //const arrowUint8Array = readParquet(parquetUint8Array);
                //console.log(arrowUint8Array)

                //const arrowTable = tableFromIPC(arrowUint8Array);

                //data = readParquet(data);
                //data = tableFromIPC(data);
                //const arrowUint8Array = readParquet(parquetUint8Array);
                //data = readParquet(parquetUint8Array);
                //console.log(parquetUint8Array)
                //const arrowTable = tableFromIPC(arrowUint8Array);

            }).catch(() => {
                //mark as failed
                this.infoLoadingStatus = "failed";
                this.cells = []
            });

        }).catch(() => {
            //mark as failed
            this.infoLoadingStatus = "failed";
            this.cells = []
        });
*/


        /*
        csv(this.url)
            .then(
                (data) => {
                    //convert coordinates in numbers
                    for (const c of data) { c.x = +c.x; c.y = +c.y; }

                    //preprocess/filter
                    if (this.preprocess) {
                        this.cells = [];
                        for (const c of data) {
                            const b = this.preprocess(c)
                            if (b == false) continue;
                            this.cells.push(c)
                        }
                    } else {
                        this.cells = data;
                    }

                    //TODO check if redraw is necessary
                    //that is if the dataset belongs to a layer which is visible at the current zoom level

                    //execute the callback, usually a draw function
                    if (redraw) redraw()

                    this.infoLoadingStatus = "loaded";
                })
            .catch(() => {
                //mark as failed
                this.infoLoadingStatus = "failed";
                this.cells = []
            });
*/
        return this;
    }

    /**
     * Fill the view cache with all cells which are within a geographical envelope.
     * 
     * @param {import("../Dataset").Envelope} extGeo 
     * @returns {void}
     */
    updateViewCache(extGeo) {

        //data not loaded yet
        if (!this.cells) return;

        this.cellsViewCache = []
        for (const cell of this.cells) {
            if (+cell.x + this.resolution < extGeo.xMin) continue;
            if (+cell.x - this.resolution > extGeo.xMax) continue;
            if (+cell.y + this.resolution < extGeo.yMin) continue;
            if (+cell.y - this.resolution > extGeo.yMax) continue;
            this.cellsViewCache.push(cell)
        }
    }
}
