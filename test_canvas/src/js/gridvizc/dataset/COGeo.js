//@ts-check

import { DatasetComponent } from "../DatasetComponent"

/**
 * A dataset composed of a COGeo file.
 * @see https://www.cogeo.org/
 * 
 * @author Julien Gaffuri
 */
export class GeoTiff extends DatasetComponent {

    constructor(url, opts=undefined) {
        super(url, 0, opts)
    }

    //TODO Use https://geotiffjs.github.io/

}
