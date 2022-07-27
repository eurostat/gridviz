//@ts-check

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

    /**
     * @abstract
     * @param {function(Cell):string} v 
     * @returns {this}  */
    setCellInfoHTML(v) {
        throw new Error('Method setCellInfoHTML not implemented.');
    }

}
