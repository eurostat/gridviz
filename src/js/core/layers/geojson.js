// logic for adding geojson features to the gridviz app

import { Color, Group } from "three";

import { Line2 } from "../../lib/threejs/lines/Line2";
import { LineGeometry } from "../../lib/threejs/lines/LineGeometry";
import { LineMaterial } from "../../lib/threejs/lines/LineMaterial";
import * as THREE from "three/src/constants";
import * as CONSTANTS from "../constants.js";

let lineMaterial; // line material used for all threejs webgl lines

/**
 * 
 * @description Add geojson features to three.js scene. Currently only accepts polygon, multipolygon or linestring
 * @param {Array} features Geojson feature array
 * @param {Object} app gridviz app
 * @function addGeoJsonToScene
 */
let layerZ = CONSTANTS.line_z;
export function addGeoJsonToScene(features, app) {
    layerZ = layerZ + 0.002; // increment draw order so that latest geojson is added on top of the rest.
    let geojsonGroup = new Group();
    geojsonGroup.renderOrder = 999; //always on top of grid
    // GEOJSON to ThreeJS
    for (let i = 0; i < features.length; i++) {
        let feature = features[i];
        let coords = [];
        for (let c = 0; c < feature.geometry.coordinates.length; c++) {
            if (feature.geometry.type == "Polygon") {
                let coords = [];
                for (let s = 0; s < feature.geometry.coordinates[c].length; s++) {
                    let xyz;
                    if (app.zerosRemoved_) {
                        let d = Number('1E' + app.zerosRemoved_);
                        xyz = {
                            x: feature.geometry.coordinates[c][s][0] / d,
                            y: feature.geometry.coordinates[c][s][1] / d,
                            z: layerZ
                        };
                    } else {
                        xyz = {
                            x: feature.geometry.coordinates[c][s][0],
                            y: feature.geometry.coordinates[c][s][1],
                            z: layerZ
                        };
                    }

                    coords.push(xyz);
                }
                if (coords.length > 0) {
                    geojsonGroup.add(createLineFromCoords(coords, app.lineColor_, app.lineWidth_));
                }

            } else if (feature.geometry.type == "MultiPolygon") {
                for (let s = 0; s < feature.geometry.coordinates[c].length; s++) {
                    //each polygon in multipolygon:
                    let coords = [];
                    for (
                        let m = 0;
                        m < feature.geometry.coordinates[c][s].length;
                        m++
                    ) {
                        let xyz;
                        if (app.zerosRemoved_) {
                            let d = Number('1E' + app.zerosRemoved_);
                            xyz = {
                                x: feature.geometry.coordinates[c][s][m][0] / d,
                                y: feature.geometry.coordinates[c][s][m][1] / d,
                                z: layerZ
                            };
                        } else {
                            xyz = {
                                x: feature.geometry.coordinates[c][s][m][0],
                                y: feature.geometry.coordinates[c][s][m][1],
                                z: layerZ
                            };
                        }
                        coords.push(xyz);
                    }
                    if (coords.length > 0) {
                        geojsonGroup.add(createLineFromCoords(coords, app.lineColor_, app.lineWidth_));
                    }
                }
            } else if (feature.geometry.type == "LineString") {
                let xyz;
                if (app.zerosRemoved_) {
                    let d = Number('1E' + app.zerosRemoved_);
                    xyz = {
                        x: feature.geometry.coordinates[c][0] / d,
                        y: feature.geometry.coordinates[c][1] / d,
                        z: layerZ
                    };
                } else {
                    xyz = {
                        x: feature.geometry.coordinates[c][0],
                        y: feature.geometry.coordinates[c][1],
                        z: layerZ
                    };
                }
                coords.push(xyz);
            }
        }
        if (feature.geometry.type = "LineString") {
            if (coords.length > 0) {
                geojsonGroup.add(createLineFromCoords(coords, app.lineColor_, app.lineWidth_));
            }
        }
    }
    app.viewer.scene.add(geojsonGroup);
}

/**
 * @description Build threejs line geometry from world coordinates
 * @function createLineFromCoords
 * @param coords {Array} array of coord objects with values x,y,z
 * @param lineColor {String | Number} accepted color value for geojson lines
 * @param lineWidth {Number} Geojson line width. Default: 0.0012
 * @returns {Line2}
 */
function createLineFromCoords(coords, lineColor, lineWidth) {
    let line_geom = new LineGeometry();
    let positions = [];
    let colors = [];
    let color = new Color(lineColor);
    for (var i = 0; i < coords.length; i++) {
        positions.push(coords[i].x, coords[i].y, layerZ);
        colors.push(color.r, color.g, color.b);
    }
    line_geom.setPositions(positions);
    line_geom.setColors(colors);
    if (!lineMaterial) {
        lineMaterial = new LineMaterial({
            linewidth: lineWidth,
            vertexColors: true
        });
    }
    //line2 allows custom linewidth (but not currently included in main threejs build)
    return new Line2(line_geom, lineMaterial);
}