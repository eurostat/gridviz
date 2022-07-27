//@ts-check

import { DatasetComponent } from "../DatasetComponent"

/**
 * A dataset composed of a single GeoTiff file.
 * 
 * @author Julien Gaffuri
 */
export class GeoTiff extends DatasetComponent {

    constructor(url, resolution, opts=undefined) {
        super(url, resolution, opts)
    }

    //TODO Use https://geotiffjs.github.io/

}
