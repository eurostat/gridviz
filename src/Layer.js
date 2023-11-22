//@ts-check
'use strict'

/**
 * @abstract
 * @author Joseph Davies, Julien Gaffuri
 */
export class Layer {
    /**
     * @param {object} opts
     */
    constructor(opts) {
        opts = opts || {}

        /** An attribute to specify if a layer should be drawn or not
        * @type {boolean} */
        this.visible = opts.visible == false ? false : true

        /** The minimum : Below this level, the layer is not shown.
         * @type {number} */
        this.minZoom = opts.minZoom || 0

        /** The maximum : Above this level, the layer is not shown.
         * @type {number} */
        this.maxZoom = opts.maxZoom || Infinity

        //ensure acceptable values for the zoom limits.
        if (this.minZoom >= this.maxZoom)
            throw new Error('Unexpected zoom limits for layer. Zoom min should be smaller than zoom max.')

    }

}
