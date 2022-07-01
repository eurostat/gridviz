//@ts-check

import { Style, Stat, getStatistics } from "../Style"
import { Cell } from "../Dataset"
import { GeoCanvas } from "../GeoCanvas";

/** @typedef {{x:number,y:number,or:"v"|"h",diff:number}} Side */


/**
 * 
 * @author Julien Gaffuri
 */
export class SideStyle extends Style {

    /** @param {object} opts */
    constructor(opts) {
        super(opts)
        opts = opts || {};

        /** A function returning the value of a cell side. This value is computed from the two adjacent cells.
         * For horizontal sides, c1 is below and c2 above.
         * For vertical sides, c1 is left and c2 right.
        * @private @type {function(Cell,Cell):string} */
        this.value = opts.value || ((c1, c2) => 100);

        /** @private @type {string} */
        this.colorCol = opts.colorCol;
        /** A function returning the color of a cell side.
        * @private @type {function(number,number,Stat|undefined):string} */
        this.color = opts.color || (() => "#EA6BAC");

        /** @private @type {string} */
        this.widthCol = opts.widthCol;
        /** A function returning the width of a cell side, in geo unit
         * @private @type {function(number,number,Stat|undefined,number):number} */
        this.width = opts.width || (() => 10);
    }


    /**
     * Draw cells as squares depending on their value.
     * 
     * @param {Array.<Cell>} cells 
     * @param {number} r 
     * @param {GeoCanvas} cg 
     */
    draw(cells, r, cg) {

        //zoom factor
        const zf = cg.getZf()

        //make horizontal sides
        cells.sort((c1, c2) => 0 )

        //build limits
        //{x:,y}




        //
        cg.ctx.lineCap = "butt";


    }


    //getters and setters
    //TODO


}
