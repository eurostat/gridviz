// this file contains the logic required for loading placename labels into the viewer/
// placenames are requested from an ArcGIS service provided by REGIO and are queried by using population thresholds according to the viewer's current scale

import * as Utils from "../utils";
import * as CONSTANTS from "../constants.js";
import { json } from "d3-fetch";
import { CSS2DObject } from "../../lib/threejs/CSS2D/CSS2DRenderer";

/**
   * @description Retrieves placenames by population according to the current scale, from an ArcGIS server endpoint (see constants for baseURL).
   * @function getPlacenames
   * @param {*} scale
   */
export function getPlacenames(viewer) {
    let where = defineWhereParameter(viewer)
    let envelope = Utils.getCurrentViewExtent(viewer);
    //currentExtent = envelope;
    //ESRI Rest API envelope: <xmin>,<ymin>,<xmax>,<ymax> (bottom left x,y , top right x,y)

    if (envelope) {
        let URL =
            CONSTANTS.placenames.baseURL +
            "where=" +
            where +
            "&outSR=" +
            viewer.EPSG_ +
            "&inSR=" + viewer.EPSG_ +
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
                if (res.features) {
                    if (res.features.length > 0) {
                        removePlacenamesFromScene(viewer);
                        addPlacenamesToScene(viewer, res.features);
                    }
                } else {
                    removePlacenamesFromScene(viewer);
                }
            },
            err => {
                console.error(err);
            }
        );
    }
}


/**
 * @description Defines the WHERE part of the query sent to the placenames service
 * @function defineWhereParameter
 * @param {*} viewer
 */
function defineWhereParameter(viewer) {
    let scale = viewer.camera.position.z;
    let r = viewer.resolution_;
    let where = "";
    if (viewer.placenamesCountry_) {
        where = where + CONSTANTS.placenames.countryField + " = '" + viewer.placenamesCountry_ + "' AND "
    }
    // labelling thresholds by population - either custom values or by scale
    let popFilter = getPopulationParameterFromScale(viewer)
    if (viewer.debugPlacenames_) {
        console.info(popFilter);
    }
    return where + popFilter;
}

/**
 * @description Defines the population parameter for the request to the placenmes service. If viewer.populationThresholds_ are not set, it uses default thresholds
 * @function getPopulationParameterFromScale
 * @param {*} viewer
 */
function getPopulationParameterFromScale(viewer) {
    let scale = viewer.camera.position.z;
    if (viewer._mobile) {
        //scale up to desktop values
        let factor = viewer.originalResolution / viewer.resolution_
        scale = scale * factor;
    }

    let populationFieldName = CONSTANTS.placenames.populationField;
    //build query string from thresholds
    if (viewer.placenameThresholds_) {
        let thresholds = Object.keys(viewer.placenameThresholds_);
        for (let i = 0; i < thresholds.length; i++) {
            let t = thresholds[i];
            if (thresholds[i + 1]) { //if not last threshold
                if (scale < parseInt(thresholds[0])) { //below first threshold
                    return populationFieldName + ">" + viewer.placenameThresholds_[thresholds[0]];
                } else if (scale > parseInt(t) && scale < parseInt(thresholds[i + 1])) {
                    // if current scale is between thresholds
                    return populationFieldName + ">" + viewer.placenameThresholds_[t];
                }
            } else {
                // if last threshold
                return populationFieldName + ">" + viewer.placenameThresholds_[t];
            }
        }
    }
}

/**
 * @description Appends placename labels from JSON features to the viewer
 * @function addPlacenamesToScene
 * @param {*} placenames
 */
function addPlacenamesToScene(viewer, placenames) {
    if (viewer.pointsLayer) {
        for (let p = 0; p < placenames.length; p++) {
            let label = createPlacenameLabelObject(viewer, placenames[p]);
            // TODO: group objects manually (THREE.group())
            viewer.pointsLayer.add(label);
        }
    }
}

/**
 * 
 * It seems that the browsers JS garbage collector removes the DOM nodes
 * @function removePlacenamesFromScene
 * @description Removes the placenames CSS2DObjects from the THREE pointsLayer layer
 */
export function removePlacenamesFromScene(viewer) {
    if (viewer.pointsLayer && viewer.pointsLayer.children.length > 0) {
        for (var i = viewer.pointsLayer.children.length - 1; i >= 0; i--) {
            viewer.pointsLayer.remove(viewer.pointsLayer.children[i]);
        }
    }
}

/**
 * Creates a CSS2DObject for a placename ESRI JSON object
 *
 * @param {*} placename
 * @returns CSS2DObject
 */
function createPlacenameLabelObject(viewer, placename) {
    var placeDiv = document.createElement("div");
    placeDiv.className = "gridviz-placename";
    placeDiv.textContent = placename.attributes[CONSTANTS.placenames.townField];
    placeDiv.style.marginTop = "-1em";
    var placeLabel = new CSS2DObject(placeDiv);

    //scale mobile coords
    if (viewer._mobile) {
        if (viewer.zerosRemoved_) {
            let d = Number('1E' + viewer.zerosRemoved_);
            let x = viewer.mobileCoordScaleX(placename.geometry.x / d);
            let y = viewer.mobileCoordScaleY(placename.geometry.y / d)
            placeLabel.position.set(
                x,
                y,
                CONSTANTS.label_height
            );
        } else {
            placeLabel.position.set(
                viewer.mobileCoordScaleX(placename.geometry.x),
                viewer.mobileCoordScaleY(placename.geometry.y),
                CONSTANTS.label_height
            );
        }
        return placeLabel;
    } else {
        //desktop
        if (viewer.zerosRemoved_) {
            let d = Number('1E' + viewer.zerosRemoved_);
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