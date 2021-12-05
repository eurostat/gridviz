//@ts-check

import * as CONSTANTS from "../../constants.js";
import { PerspectiveCamera, Vector3 } from 'three'

/**
  * @Description parent class for THREE camera usage in gridviz
  * @class Camera
  * 
  */
export class Camera {

    /**
     * Creates an instance of Camera.
     * @param {*} opts
     * @memberof Camera
     */
    constructor(opts) {

        /** Width of the viewport in pixels
        * @type {Number} */
        this.viewerWidth = opts.viewerWidth;

        /** Height of the viewport in pixels
         * @type {Number} */
        this.viewerHeight = opts.viewerHeight;

        /** Whether the current device is a mobile or not
        * @type {Boolean} */
         this.isMobile = opts.isMobile || false;

        /** initial camera z position
        * @type {Number} */
        this.zoom = opts.zoom;

        /** Configurations for the threeJS camera
        * @type {Object} */
        this.config = this.defineCameraConfig(this.isMobile, this.zoom, this.viewerWidth, this.viewerHeight);

        /** ThreeJS perspective camera
        * @type {PerspectiveCamera} */
        this.camera = new PerspectiveCamera(
            this.config.fov_,
            this.config.aspect_,
            this.config.near_,
            this.config.far_
        );

        /** Orbit controls for 3D panning and zooming
        * @type {OrbitControls} */
        this.controls = null;

    }

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


    /**
     * @function setCamera
     * @description Sets position and direction of camera
     * @param {number} x three.js coord
     * @param {number} y three.js coord
     * @param {number} z three.js coord
     * 
     */
    setCamera(x, y, z) {
        this.camera.position.set(x, y, z); // Set camera position
        this.camera.lookAt(new Vector3(x, y, z)); // Set camera angle to point straight down

        if (this.controls) {
            this.controls.update();
        }
    }

    /**
    * @description defines the configuration object that is used for the threejs camera
    * @function defineCameraConfig
    * @param {Boolean} isMobile
    * @param {Number} zoom
    * @param {Number} viewerWidth
    * @param {Number} viewerHeight
    */
    defineCameraConfig(isMobile, zoom, viewerWidth, viewerHeight) {
        let config = {}
        config.near_ = this.defineNear(isMobile);
        config.far_ = this.defineFar(isMobile, zoom); //set min zoom
        config.fov_ = CONSTANTS.fov;
        config.aspect_ = viewerWidth / viewerHeight;

        //initial camera position Z (zoom)
        if (isMobile) {
            config.initialZ_ = config.far_ / 2 - 1
        } else {
            config.initialZ_ = zoom || config.far_ / 2 - 1
        }
        config.zoom_ = zoom || config.initialZ_;

        return config;
    }

    /**
    * @description Updates camera configuration. Usually called when user adds grid data, changes zoom, or changes center after initialization
    * @function redefineCamera
    * @param {Boolean} isMobile
    * @param {Number} zoom
    * @param {Number} viewerWidth
    * @param {Number} viewerHeight
    */
    redefineCamera(isMobile, zoom, viewerWidth, viewerHeight) {
        let cameraConfig = this.defineCameraConfig(isMobile, zoom, viewerWidth, viewerHeight)
        this.camera.fov = cameraConfig.fov_;
        this.camera.aspect = cameraConfig.aspect_;
        this.camera.near = cameraConfig.near_;
        this.camera.far = cameraConfig.far_;

        // TODO: redefine panAndZoom
        this.config = cameraConfig;
    }

    /**
    * @description Define the far parameter for THREE.camera. The far parameter represents the furthest possible distance that the camera can be from the plane (where z=0)
    * @function defineFar
    * @param isMobile
    */
    defineFar(isMobile, zoom) {
        if (isMobile) {
            return 5; //due to a bug with pan & zoom, we have to scale everything on mobile to webgl coords
        } else {
            return zoom * 500000;
            //return Math.pow(8, app._currentResolution);
        }
    }

    /**
     * @description Define the near parameter for THREE.camera. The near parameter represents the smallest possible distance that the camera can be from the plane (where z=0)
     * @function defineNear
     * @param isMobile
     */
    defineNear(isMobile) {
        if (isMobile) {
            return 0.0001; //due to a bug with pan & zoom, we have to scale everything on mobile
        } else {
            return 0.01;
        }
    }

}




