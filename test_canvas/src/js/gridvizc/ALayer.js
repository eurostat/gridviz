//@ts-check

/**
 * 
 * @author Julien Gaffuri
 * @abstract
 */
export class ALayer {

    constructor() {
    }

    /**
     * @abstract
     * @param {number} zf 
     * @returns {object}  */
    getLayer(zf) {
        throw new Error('Method getLayer not implemented.');
    }

    /** @abstract */
    hideLegend() {
        throw new Error('Method hideLegend not implemented.');
    }

}
