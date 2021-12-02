// this file contains the logic required for loading placename labels into the app/
// placenames are requested from an ArcGIS service provided by REGIO and are queried by using population thresholds according to the app's current scale

import * as Utils from "../utils/utils";
import * as CONSTANTS from "../constants.js";
import { json } from "d3-fetch";
import { CSS2DObject } from "../../lib/threejs/CSS2D/CSS2DRenderer";

/**
   * @description Defines the default 'scale : population' thresholds which are used to generate the placename queries. E.g 10 : 10000 will define the population value of the placename query as 10 000 when the current app scale (or camera.position.z) is above 10 and below the next threshold.
   * @function defineDefaultPlacenameThresholds
   * @param {number} resolution
   */
export function defineDefaultPlacenameThresholds(resolution) {
    let r = resolution / window.devicePixelRatio;
    //let s = app.viewer.camera.camera.position.z;
    // scale : population
    return {
        [r * 1024]: 1000000,
        [r * 512]: 600000,
        [r * 256]: 500000,
        [r * 128]: 200000,
        [r * 64]: 150000,
        [r * 32]: 100000,
        [r * 16]: 50000,
        [r * 8]: 10000,
        [r * 4]: 5000,
        [r * 2]: 1000,
        [r]: 10,
    }
}

/**
   * @description Retrieves placenames by population according to the current scale, from an ArcGIS server endpoint (see constants for baseURL).
   * @function getPlacenames
   * @param {*} scale
   * @returns {Promise}
   */
export function getPlacenames(app) {
    let where = defineWhereParameter(app)
    let envelope = app.viewer.getCurrentViewExtent(app);
    //currentExtent = envelope;
    //ESRI Rest API envelope: <xmin>,<ymin>,<xmax>,<ymax> (bottom left x,y , top right x,y)
    if (app.debugPlacenames_) console.info(envelope);

    if (envelope && where) {
        let URL =
            CONSTANTS.placenames.baseURL +
            "where=" +
            where +
            "&outSR=" +
            app.EPSG_ +
            "&inSR=" + app.EPSG_ +
            "&geometry=" +
            envelope.xMin +
            "," +
            envelope.yMin +
            "," +
            envelope.xMax +
            "," +
            envelope.yMax +
            "&geometryType=esriGeometryEnvelope&f=json&outFields=" + CONSTANTS.placenames.townField + "," + CONSTANTS.placenames.populationField;

        //TODO: manage multiple calls by replicating angular's .unsubscribe() somehow
        let uri = encodeURI(URL);
        return json(uri);
    }
}

/**
 * 
 * 
 * @function removePlacenamesFromScene
 * @description Removes the placenames CSS2DObjects from the THREE pointsLayer layer
 */
 export function removeAllLabelsFromLayer(labelsLayer) {
    if (labelsLayer && labelsLayer.children.length > 0) {
        for (var i = labelsLayer.children.length - 1; i >= 0; i--) {
            labelsLayer.remove(labelsLayer.children[i]);
        }
    }
}


/**
 * @description Defines the WHERE part of the query sent to the placenames service
 * @function defineWhereParameter
 * @param {*} app
 */
function defineWhereParameter(app) {
    let scale = app.viewer.camera.camera.position.z;
    let r = app._currentResolution;
    let where = "";
    if (app.placenamesCountry_) {
        where = where + CONSTANTS.placenames.countryField + " = '" + app.placenamesCountry_ + "' AND "
    }
    // labelling thresholds by population - either custom values or by scale
    let popFilter = getPopulationParameterFromScale(app)
    if (app.debugPlacenames_) {
        console.info(popFilter);
    }
    return where + popFilter;
}

/**
 * @description Defines the population parameter for the request to the placenmes service. If app.populationThresholds_ are not set, it uses default thresholds
 * @function getPopulationParameterFromScale
 * @param {*} app
 */
function getPopulationParameterFromScale(app) {
    let scale = app.viewer.camera.camera.position.z;
    if (app._mobile) {
        //scale up to desktop values
        let factor = app.originalResolution / app._currentResolution
        scale = scale * factor;
    }

    let populationFieldName = CONSTANTS.placenames.populationField;
    //build query string from thresholds
    if (app.placenameThresholds_) {
        // always ascending order
        let scales = Object.keys(app.placenameThresholds_).sort((a, b)=>{return parseInt(a)-parseInt(b)});
        let populations = Object.values(app.placenameThresholds_).sort((a, b)=>{return parseInt(a)-parseInt(b)});
        for (let i = 0; i < scales.length; i++) {
            let s = scales[i];
            let p = populations[i];

            

            if (scales[i + 1]) { //if not last threshold
                if (scale < parseInt(scales[0])) { //below first threshold
                    return populationFieldName + ">" + p;
                } else if (scale > parseInt(s) && scale < parseInt(scales[i + 1])) {
                    // if current scale is between thresholds
                    return populationFieldName + ">" + p;
                }
            } else {
                // if last threshold
                return populationFieldName + ">" + p;
            }
        }
    }
}

/**
 * Creates a CSS2DObject for a placename ESRI JSON object
 *
 * @param {string} placename
 * @returns CSS2DObject
 */
export function createPlacenameLabelObject(x, y, placename) {   
    var placeDiv = document.createElement("div");
    placeDiv.className = "gridviz-placename";
    placeDiv.textContent = placename;
    placeDiv.style.marginTop = "-1em";
    var placeLabel = new CSS2DObject(placeDiv);
    placeLabel.position.set(x,y,CONSTANTS.label_height);
    return placeLabel;
}