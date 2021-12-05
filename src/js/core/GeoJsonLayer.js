// logic for adding geojson features to the gridviz app

import { Color, Group } from "three";
import { Line2 } from "../lib/threejs/lines/Line2";
import { LineGeometry } from "../lib/threejs/lines/LineGeometry";
import { LineMaterial } from "../lib/threejs/lines/LineMaterial";
import * as CONSTANTS from "./constants.js";


/**
 * @description Add geojson features to three.js Group. Currently only accepts polygon, multipolygon or linestring geometries
 * @export Three.Group
 * @class GeoJsonLayer
 */
export class GeoJsonLayer {

    /**
     * Creates an instance of GeoJsonLayer.
     * @memberof GeoJsonLayer
     * @param {Array} features geojson features array
     * @param {Number} lineWidth line width in webgl
     * @param {String} lineColor line color hex string
     * @param {Number} zerosRemoved number of trailing zeros to be removed from coordinates
     * @returns {Three.Group} ThreeJS group of line geometries
     */
    constructor(features, lineColor, lineWidth, zerosRemoved) {
        this.features = features;
        this.lineColor = lineColor || "grey";
        this.lineWidth = lineWidth || 0.001;
        this.layerZ = CONSTANTS.line_z;
        this.group = new Group();
        this.group.renderOrder = 999; //always on top of grid cells
        this.lineMaterial; // line material used for all threejs webgl lines

        // GEOJSON to ThreeJS
        for (let i = 0; i < this.features.length; i++) {
            let feature = this.features[i];
            let coords = [];
            for (let c = 0; c < feature.geometry.coordinates.length; c++) {
                if (feature.geometry.type == "Polygon") {
                    let coords = [];
                    for (let s = 0; s < feature.geometry.coordinates[c].length; s++) {
                        let xyz;
                        if (zerosRemoved) {
                            let d = Number('1E' + zerosRemoved);
                            xyz = {
                                x: feature.geometry.coordinates[c][s][0] / d,
                                y: feature.geometry.coordinates[c][s][1] / d,
                                z: this.layerZ
                            };
                        } else {
                            xyz = {
                                x: feature.geometry.coordinates[c][s][0],
                                y: feature.geometry.coordinates[c][s][1],
                                z: this.layerZ
                            };
                        }

                        coords.push(xyz);
                    }
                    if (coords.length > 0) {
                        this.group.add(this.createLineFromCoords(coords, this.lineColor, this.lineWidth));
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
                            if (zerosRemoved) {
                                let d = Number('1E' + zerosRemoved);
                                xyz = {
                                    x: feature.geometry.coordinates[c][s][m][0] / d,
                                    y: feature.geometry.coordinates[c][s][m][1] / d,
                                    z: this.layerZ
                                };
                            } else {
                                xyz = {
                                    x: feature.geometry.coordinates[c][s][m][0],
                                    y: feature.geometry.coordinates[c][s][m][1],
                                    z: this.layerZ
                                };
                            }
                            coords.push(xyz);
                        }
                        if (coords.length > 0) {
                            this.group.add(this.createLineFromCoords(coords, this.lineColor, this.lineWidth));
                        }
                    }
                } else if (feature.geometry.type == "LineString") {
                    let xyz;
                    if (zerosRemoved) {
                        let d = Number('1E' + zerosRemoved);
                        xyz = {
                            x: feature.geometry.coordinates[c][0] / d,
                            y: feature.geometry.coordinates[c][1] / d,
                            z: this.layerZ
                        };
                    } else {
                        xyz = {
                            x: feature.geometry.coordinates[c][0],
                            y: feature.geometry.coordinates[c][1],
                            z: this.layerZ
                        };
                    }
                    coords.push(xyz);
                }
            }
            if (feature.geometry.type = "LineString") {
                if (coords.length > 0) {
                    this.group.add(this.createLineFromCoords(coords, this.lineColor, this.lineWidth));
                }
            }
        }

        this.layerZ = this.layerZ + 0.002; //increment this.layerZ so next GeoJson is drawn on top

        return this.group;
    }

    /**
 * @description Build threejs line geometry from world coordinates
 * @function createLineFromCoords
 * @param {Array} coords  array of coord objects with values x,y,z
 * @param {String || Number} lineColor  accepted color value for geojson lines
 * @param {Number} lineWidth  Geojson line width. Default: 0.0012
 * @returns {Line2}
 */
    createLineFromCoords(coords, lineColor, lineWidth) {
        let line_geom = new LineGeometry();
        let positions = [];
        let colors = [];
        let color = new Color(lineColor);
        for (var i = 0; i < coords.length; i++) {
            positions.push(coords[i].x, coords[i].y, this.layerZ);
            colors.push(color.r, color.g, color.b);
        }
        line_geom.setPositions(positions);
        line_geom.setColors(colors);
        if (!this.lineMaterial) {
            this.lineMaterial = new LineMaterial({
                linewidth: lineWidth,
                vertexColors: true
            });
        }
        //line2 allows custom linewidth (but not currently included in main threejs build)
        return new Line2(line_geom, this.lineMaterial);
    }

}


