//@ts-check

import { DatasetComponent } from "../DatasetComponent"
import { Cell } from "../Dataset"

/**
 * A dataset composed of a single GeoTiff file.
 * 
 * @author Julien Gaffuri
 */
export class GeoTiff extends DatasetComponent {

    /**
     * 
     * @param {string} url 
     * @param {number} resolution 
     * @param {{preprocess?:(function(Cell):void)}} opts 
     */
    constructor(url, resolution, opts = {}) {
        super(url, resolution, opts)
    }

    //TODO Use https://geotiffjs.github.io/

}
