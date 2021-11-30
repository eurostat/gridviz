//@ts-check
import { Dataset, Cell, Envelope } from "../Dataset"

/**
 * A dataset composed of a COGeo file.
 * @see https://www.cogeo.org/
 * 
 * @author Julien Gaffuri
 */
export class GeoTiff extends Dataset {

     constructor(url, resolution, preprocess = null) {
        super(url, resolution, preprocess)

    }

//TODO Use https://geotiffjs.github.io/

}
