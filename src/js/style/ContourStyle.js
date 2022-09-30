//@ts-check

import { SideStyle } from "../SideStyle"
import { Cell } from "../Dataset"

/** @typedef {{x:number,y:number,or:"v"|"h",value:number}} Side */


/**
 * 
 * @author Julien Gaffuri
 */
export class ContourStyle extends SideStyle {

    /** @param {object} opts */
    constructor(opts) {
        super(opts)
        opts = opts || {};

        /** The name of the column/attribute of the tabular data where to retrieve the variable for the cell values.
         * @type {number} */
        opts.interval = opts.interval || 100

        opts.color = opts.color || "#E7A935"

        opts.width = opts.width || ((r, z) => 2 * z)


        //override method for contour drawing

        this.value = (v1, v2, r, s, zf) => {
            //TODO check if v1 - v2 cross a contour line
            //is there a multiple of interval between v1 and v2 ?
            return 1;
        };

        this.color = (side) => side.value? opts.color : undefined;
        this.width = opts.width || ((side, r, s, z) => side.value? opts.width(r, z) : -1);

    }

}
