//@ts-check

/**
 * 
 * @author Julien Gaffuri
 * @abstract
 */
export class ALayer {

    /**
     * @param {boolean} visible 
     */
    constructor(visible = true) {

        /** An attribute to specify if a layer should be drawn or not
         * @type {boolean} */
        this.visible = visible;

    }

    /**
     * @abstract
     * @param {number} zf 
     * @returns {object}  */
    getLayer(zf) {
        throw new Error('Method getLayer not implemented.');
    }

}
