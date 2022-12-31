//@ts-check

import { DatasetComponent } from "../DatasetComponent";
import { tableFromIPC } from "apache-arrow"
//import { readParquet } from "parquet-wasm"

/**
 * A dataset composed of a single parquet file (not tiled).
 * 
 * @author Julien Gaffuri
 */
export class ParquetGrid extends DatasetComponent {

    /**
     * @param {string} url The URL of the dataset.
     * @param {number} resolution The dataset resolution in geographical unit.
     * @param {{preprocess?:(function(import("../Dataset").Cell):boolean), readParquetFun?:Function}} opts 
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

        if (!opts.readParquetFun) throw new Error("readParquet function needed for parquet dataset")

        /**  
         * @type {Function}
         * @private  */
        this.readParquetFun = opts.readParquetFun
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

        fetch(this.url)
            .then(
                (resp) => {
                    resp.arrayBuffer().then(
                        ab => {
                            const parquetUint8Array = new Uint8Array(ab);
                            //console.log(parquetUint8Array)
                            const arrowUint8Array = this.readParquetFun(parquetUint8Array);
                            //console.log(arrowUint8Array)
                            const t = tableFromIPC(arrowUint8Array);
                            //console.log(t)

                            //console.log(t.schema.fields)

                            //see https://arrow.apache.org/docs/js/
                            //https://loaders.gl/arrowjs/docs/developer-guide/tables#record-tojson-and-toarray
                            //const elt = t.get(0)
                            //console.log(elt.toJSON())
                            //console.log(elt.toArray())

                            const data = []
                            for (const e of t) {
                                const c = e.toJSON()
                                data.push(c)
                            }

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
                        }
                    )
                })

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

/**
 * Retrieve parquet wasm decoder
 */
const getReadParquet = async () => {
    //const parquetModule = await import("https://unpkg.com/parquet-wasm@0.4.0-beta.5/esm/arrow2.js");
    //await parquetModule.default();
    //return parquetModule.readParquet;
}
