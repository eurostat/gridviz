//@ts-check

import { Cell } from "./Dataset";

/**
 * 
 * @author Julien Gaffuri
 * @abstract
 */
export class ALayer {

    /**
     * @param {{visible?:boolean}} opts 
     */
    constructor(opts) {
        opts = opts || {}

        /** An attribute to specify if a layer should be drawn or not
         * @type {boolean} */
        this.visible = opts.visible == false ? false : true;

    }

    /**
     * @abstract
     * @param {number} zf 
     * @returns {object}  */
    getLayer(zf) {
        throw new Error('Method getLayer not implemented.');
    }

    /**
     * @abstract
     * @param {function(Cell):string} v 
     * @returns {this}  */
    setCellInfoHTML(v) {
        throw new Error('Method setCellInfoHTML not implemented.');
    }

}
