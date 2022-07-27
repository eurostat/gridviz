//@ts-check

import { DatasetComponent } from "../DatasetComponent"
import { Cell } from "../Dataset"

/**
 * A dataset composed of a COGeo file.
 * @see https://www.cogeo.org/
 * 
 * @author Julien Gaffuri
 */
export class GeoTiff extends DatasetComponent {

    /**
     * 
     * @param {String} url 
     * @param {{preprocess?:(function(Cell):void)}} opts 
     */
    constructor(url, opts = {}) {
        super(url, 0, opts)
    }

    //TODO Use https://geotiffjs.github.io/

}
