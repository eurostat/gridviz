// all methods related to gridviz viewer's threejs camera

import * as CONSTANTS from "../constants.js";
import {  PerspectiveCamera, Vector3 } from 'three'
import { OrbitControls } from '../../lib/threejs/orbitControls';
import { viewer } from "../gridviz.js";

let camera; // threejs camera object
let cameraConfig; // config object containing: near, far, fov, aspect, zoom
let controls; //orbit controls

/**
  * @description Initializes THREE camera object
  * @function createCamera
  * @param viewer 
  */
 export function createCamera(viewer) {
    cameraConfig = defineCameraConfig(viewer);
    viewer.cameraConfig = cameraConfig;
    camera = new PerspectiveCamera(
        cameraConfig.fov_,
        cameraConfig.aspect_,
        cameraConfig.near_,
        cameraConfig.far_
    );

    viewer.camera = camera;

    //orthographic
    //https://discourse.threejs.org/t/why-does-pointsmaterial-size-does-not-correspond-with-geographic-grid-cell-size/13408
    //left — Camera frustum left plane.
    // right — Camera frustum right plane.
    // top — Camera frustum top plane.
    // bottom — Camera frustum bottom plane.
    // near — Camera frustum near plane.
    // far — Camera frustum far plane.
    //3035 projected bounds 2426378.0132, 1528101.2618, 6293974.6215, 5446513.5222

    // let width = 6293974 - 2426378;
    // let height = 5446513 - 1528101; //ymin - ymax /2
    // let left = width / -2;
    // let right = width / 2;
    // let top = height / 2;
    // let bottom = height / -2;

    //camera = new OrthographicCamera(left, right, top, bottom, 1, 2000);

    // let x = (6293974 + 2426378) / 2
    // let y = (5446513 + 1528101) / 2
    // let z = 1000;
}


/**
  * @description Creates orbit controls to be used with three.js. Used when viewer is set to '3D' mode.
  * @function createOrbitControls
  * @param viewer 
  */
export function createOrbitControls(viewer) {

    // controls
    controls = new OrbitControls( viewer.camera, viewer.renderer.domElement );
    controls.target = new Vector3( viewer.center_[0], viewer.center_[1], 0 );
    //controls.minPolarAngle = 0;
    //controls.maxPolarAngle = 0;
    controls.minAzimuthAngle = -0.5;
    controls.maxAzimuthAngle = 0.5; 

    // controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
    // controls.dampingFactor = 0.05;
    // controls.screenSpacePanning = false;
    // controls.minDistance = 100;
    // controls.maxDistance = 500;
    // controls.maxPolarAngle = Math.PI / 2;

    camera.position.set( viewer.center_[0], viewer.center_[1], cameraConfig.zoom_);
    controls.update();
}

/**
 * @function setCamera
 * @description Sets position and direction of camera
 * @param {number} x three.js coord
 * @param {number} y three.js coord
 * @param {number} z three.js coord
 * 
 */
 export function setCamera(x, y, z) {
    camera.position.set(x, y, z); // Set camera position
    camera.lookAt(new Vector3(x, y, z)); // Set camera angle to point straight down

    if (controls) {
        controls.update();
    }
}

/**
* @description Updates camera configuration. Called when user adds grid data, changes zoom, or changes center after initialization
* @function redefineCamera
  * @param viewer 
*/
export function redefineCamera(viewer) {
    cameraConfig = defineCameraConfig(viewer)

    camera.fov = cameraConfig.fov_;
    camera.aspect = cameraConfig.aspect_;
    camera.near = cameraConfig.near_;
    camera.far = cameraConfig.far_;

    // TODO: redefine panAndZoom
    viewer.cameraConfig = cameraConfig;
}

/**
* @description defines the configuration object we will use for the threejs camera
* @function defineCameraConfig
  * @param viewer 
*/
function defineCameraConfig(viewer) {
    let config = {}
    config.near_ = defineNear(viewer);
    config.far_ = defineFar(viewer); //set min zoom
    config.fov_ = CONSTANTS.fov;
    config.aspect_ = viewer.width_ / viewer.height_;

    //initial camera position Z (zoom)
    if (viewer._mobile) {
        config.initialZ_ = config.far_ / 2 - 1
    } else {
        config.initialZ_ = viewer.zoom_ || config.far_ / 2 - 1
    }
    config.zoom_ = viewer.zoom_ || config.initialZ_;

    return config;
}

/**
* @description Define the far parameter for THREE.camera. The far parameter represents the furthest possible distance that the camera can be from the plane (where z=0)
* @function defineFar
  * @param viewer 
*/
function defineFar(viewer) {
    if (viewer._mobile) {
        return 5; //due to a bug with pan & zoom, we have to scale everything on mobile to webgl coords
    } else {
        return viewer.resolution_ * 50000;
        //return Math.pow(8, viewer.resolution_);
    }
}

/**
 * @description Define the near parameter for THREE.camera. The near parameter represents the smallest possible distance that the camera can be from the plane (where z=0)
 * @function defineNear
 *   * @param viewer 
 */
function defineNear(viewer) {
    if (viewer._mobile) {
        return 0.0001; //due to a bug with pan & zoom, we have to scale everything on mobile
    } else {
        return 0.01;
    }
}






