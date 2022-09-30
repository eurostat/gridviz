//@ts-check

import { SideStyle } from "./SideStyle"
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

        opts.width = opts.width || 1
        opts.color = opts.color || "#E7A935"

        //override method for contour drawing

        this.value = (v1, v2, r, s, zf) => {
            //check if v1 - v2 cross a contour line
            if (!v1 || !v2) return 0
            const r1 = Math.floor(v1 / opts.interval);
            const r2 = Math.floor(v2 / opts.interval);
            return Math.abs(r2 - r1);
        };

        //same color for all
        this.color = (side) => side.value ? opts.color : undefined;

        //width: multiple of
        this.width = (side, r, s, zf) => side.value * zf * opts.width;
    }

}
