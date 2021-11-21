//@ts-check

export class Layer {

    /**
     * @param {number} minZoom 
     * @param {number} maxZoom 
     */
    constructor(minZoom, maxZoom) {

        /** @type {number} */
        this.minZoom = minZoom;
        /** @type {number} */
        this.maxZoom = maxZoom;

    }

    draw() {
        //TODO
    }


}
