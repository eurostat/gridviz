// all methods related to gridviz app's threejs camera

import * as CONSTANTS from "../constants.js";
import {  PerspectiveCamera, Vector3 } from 'three'
import { OrbitControls } from '../../lib/threejs/orbitControls';
import { app } from "../gridviz.js";

let camera; // threejs camera object
let cameraConfig; // config object containing: near, far, fov, aspect, zoom
let controls; //orbit controls

/**
  * @description Initializes THREE camera object
  * @function createCamera
  * @param app 
  */
 export function createCamera(app) {
    cameraConfig = defineCameraConfig(app);
    app.cameraConfig = cameraConfig;
    camera = new PerspectiveCamera(
        cameraConfig.fov_,
        cameraConfig.aspect_,
        cameraConfig.near_,
        cameraConfig.far_
    );

    app.camera = camera;

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
  * @description Creates orbit controls to be used with three.js. Used when app is set to '3D' mode.
  * @function createOrbitControls
  * @param app 
  */
export function createOrbitControls(app) {

    // controls
    controls = new OrbitControls( app.camera, app.renderer.domElement );
    controls.target = new Vector3( app.center_[0], app.center_[1], 0 );
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

    camera.position.set( app.center_[0], app.center_[1], cameraConfig.zoom_);
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
  * @param app 
*/
export function redefineCamera(app) {
    cameraConfig = defineCameraConfig(app)

    camera.fov = cameraConfig.fov_;
    camera.aspect = cameraConfig.aspect_;
    camera.near = cameraConfig.near_;
    camera.far = cameraConfig.far_;

    // TODO: redefine panAndZoom
    app.cameraConfig = cameraConfig;
}

/**
* @description defines the configuration object we will use for the threejs camera
* @function defineCameraConfig
  * @param app 
*/
function defineCameraConfig(app) {
    let config = {}
    config.near_ = defineNear(app);
    config.far_ = defineFar(app); //set min zoom
    config.fov_ = CONSTANTS.fov;
    config.aspect_ = app.width_ / app.height_;

    //initial camera position Z (zoom)
    if (app._mobile) {
        config.initialZ_ = config.far_ / 2 - 1
    } else {
        config.initialZ_ = app.zoom_ || config.far_ / 2 - 1
    }
    config.zoom_ = app.zoom_ || config.initialZ_;

    return config;
}

/**
* @description Define the far parameter for THREE.camera. The far parameter represents the furthest possible distance that the camera can be from the plane (where z=0)
* @function defineFar
  * @param app 
*/
function defineFar(app) {
    if (app._mobile) {
        return 5; //due to a bug with pan & zoom, we have to scale everything on mobile to webgl coords
    } else {
        return app.zoom_ * 50000;
        //return Math.pow(8, app.currentResolution_);
    }
}

/**
 * @description Define the near parameter for THREE.camera. The near parameter represents the smallest possible distance that the camera can be from the plane (where z=0)
 * @function defineNear
 *   * @param app 
 */
function defineNear(app) {
    if (app._mobile) {
        return 0.0001; //due to a bug with pan & zoom, we have to scale everything on mobile
    } else {
        return 0.01;
    }
}






