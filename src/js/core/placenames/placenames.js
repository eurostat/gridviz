// this file contains the logic required for loading placename labels into the app/
// placenames are requested from an ArcGIS service provided by REGIO and are queried by using population thresholds according to the app's current scale

import * as Utils from "../utils/utils";
import * as CONSTANTS from "../constants.js";
import { json } from "d3-fetch";
import { CSS2DObject } from "../../lib/threejs/CSS2D/CSS2DRenderer";

/**
   * @description Defines the default 'scale : population' thresholds which are used to generate the placename queries. E.g 10 : 10000 will define the population value of the placename query as 10 000 when the current app scale (or camera.position.z) is above 10 and below the next threshold.
   * @function defineDefaultPlacenameThresholds
   * @param {Object} app
   */
export function defineDefaultPlacenameThresholds(app) {
    let r = app.currentResolution_ / window.devicePixelRatio;
    //let s = app.viewer.camera.camera.position.z;
    // scale : population

    app.placenameThresholds_ = {
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
            envelope.xmin +
            "," +
            envelope.ymin +
            "," +
            envelope.xmax +
            "," +
            envelope.ymax +
            "&geometryType=esriGeometryEnvelope&f=json&outFields=" + CONSTANTS.placenames.townField + "," + CONSTANTS.placenames.populationField;

        //TODO: manage multiple calls by replicating angular's .unsubscribe() somehow
        let uri = encodeURI(URL);
        json(uri).then(
            res => {
                removePlacenamesFromScene(app);
                if (res.features) {
                    if (res.features.length > 0) {
                        addPlacenamesToScene(app, res.features);
                    }
                }
            },
            err => {
                console.error(err);
            }
        );
    }
}

/**
 * 
 * It seems that the browsers JS garbage collector removes the DOM nodes
 * @function removePlacenamesFromScene
 * @description Removes the placenames CSS2DObjects from the THREE pointsLayer layer
 */
 export function removePlacenamesFromScene(app) {
    if (app.pointsLayer && app.pointsLayer.children.length > 0) {
        for (var i = app.pointsLayer.children.length - 1; i >= 0; i--) {
            app.pointsLayer.remove(app.pointsLayer.children[i]);
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
    let r = app.currentResolution_;
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
        let factor = app.originalResolution / app.currentResolution_
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
 * @description Appends placename labels from JSON features to the app
 * @function addPlacenamesToScene
 * @param {*} placenames
 */
function addPlacenamesToScene(app, placenames) {
    if (app.pointsLayer) {
        for (let p = 0; p < placenames.length; p++) {
            let label = createPlacenameLabelObject(app, placenames[p]);
            // TODO: group objects manually (THREE.group())
            app.pointsLayer.add(label);
        }
    }
}


/**
 * Creates a CSS2DObject for a placename ESRI JSON object
 *
 * @param {*} placename
 * @returns CSS2DObject
 */
function createPlacenameLabelObject(app, placename) {
    var placeDiv = document.createElement("div");
    placeDiv.className = "gridviz-placename";
    placeDiv.textContent = placename.attributes[CONSTANTS.placenames.townField];
    placeDiv.style.marginTop = "-1em";
    var placeLabel = new CSS2DObject(placeDiv);

    //scale mobile coords
    if (app._mobile) {
        if (app.zerosRemoved_) {
            let d = Number('1E' + app.zerosRemoved_);
            let x = app.mobileCoordScaleX(placename.geometry.x / d);
            let y = app.mobileCoordScaleY(placename.geometry.y / d)
            placeLabel.position.set(
                x,
                y,
                CONSTANTS.label_height
            );
        } else {
            placeLabel.position.set(
                app.mobileCoordScaleX(placename.geometry.x),
                app.mobileCoordScaleY(placename.geometry.y),
                CONSTANTS.label_height
            );
        }
        return placeLabel;
    } else {
        //desktop
        if (app.zerosRemoved_) {
            let d = Number('1E' + app.zerosRemoved_);
            placeLabel.position.set(
                placename.geometry.x / d,
                placename.geometry.y / d,
                CONSTANTS.label_height
            );
        } else {
            placeLabel.position.set(
                placename.geometry.x,
                placename.geometry.y,
                CONSTANTS.label_height
            );
        }
        return placeLabel;
    }
}