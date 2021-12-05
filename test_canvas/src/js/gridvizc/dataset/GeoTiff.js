//@ts-check
import { Dataset, Cell, Envelope } from "../Dataset"

/**
 * A dataset composed of a single GeoTiff file.
 * 
 * @author Julien Gaffuri
 */
export class GeoTiff extends Dataset {

    constructor(url, resolution, opts) {
        super(url, resolution, opts)
    }

    //TODO Use https://geotiffjs.github.io/

}
