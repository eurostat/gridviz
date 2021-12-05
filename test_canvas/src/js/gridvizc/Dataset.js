//@ts-check

/** @typedef { {xMin: number, xMax: number, yMin: number, yMax: number} } Envelope */
/** @typedef {{x: number, y: number}} Cell */

/**
 * A dataset of grid cells.
 * 
 * @abstract
 * 
 * @author Julien Gaffuri
 */
export class Dataset {

    /**
     * @param {string} url The URL of the dataset
     * @param {object} opts 
     * @abstract
     */
    constructor(url, opts) {
        opts = opts || {};

        /**
         * The url of the dataset.
         * @protected @type {string} */
        this.url = url;

        /**
         * The dataset resolution (in geographical unit).
         * @protected @type {number} */
        this.resolution = opts.resolution;

        /**
         * A preprocess to run on each cell after loading. It can be used to apply some specific treatment before or compute a new column.
         * @protected @type {function(Cell):void} */
        this.preprocess = opts.preprocess;

        /**
         * The HTML content providing information on the grid cell.
         * @type {function(Cell):string} */
        this.cellInfoHTML = opts.cellInfoHTML || defaultCellInfoHTML;
    }


    /**
     * Request data within a geographic envelope.
     * 
     * @param {Envelope} extGeo 
     * @param {function():void} callback 
     * @returns {this}
     * @abstract
     */
    getData(extGeo, callback) {
        throw new Error('Method getData not implemented.');
    }

    /**
     * @param {Envelope} extGeo 
     * @returns {Array.<Cell>}
     * @abstract
     */
    getCells(extGeo) {
        throw new Error('Method getCells not implemented.');
    }




    /**
     * Get a cell under a given position, if any.
     * 
     * @param {{x:number,y:number}} posGeo 
     * @param {Array.<Cell>} cells Some cells from the dataset, a subset if necessary.
     * @returns {Cell}
     */
    getCellFromPosition(posGeo, cells) {

        //compute candidate cell position
        /** @type {number} */
        const r = this.getResolution();
        /** @type {number} */
        const cellX = r * Math.floor(posGeo.x / r)
        /** @type {number} */
        const cellY = r * Math.floor(posGeo.y / r)

        //get cell data
        for (const cell of cells) {
            if (cell.x != cellX) continue;
            if (cell.y != cellY) continue;
            return cell;
        }
        return undefined;
    }



    //getters and setters

    /** @returns {number} */
    getResolution() { return this.resolution; }

}


/**
 * The default function returning cell information as HTML.
 * This is typically used for tooltip information.
 * 
 * @param {Cell} cell 
 * @returns {string}
 */
const defaultCellInfoHTML = function (cell) {
    const buf = []
    for (const key of Object.keys(cell)) {
        if (key === "x") continue;
        if (key === "y") continue;
        buf.push("<b>")
        buf.push(key)
        buf.push("</b>")
        buf.push(" : ")
        buf.push(cell[key])
        buf.push("<br>")
    }
    return buf.join("");
}
