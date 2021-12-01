// all methods related to gridviz viewer's threejs camera and controls

import * as CONSTANTS from "../../constants.js";
import { PerspectiveCamera, Vector3 } from 'three'
import { OrbitControls } from '../../../lib/threejs/orbitControls';


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
        this.controls = null; //orbit controls
        this.viewerWidth = opts.viewerWidth;
        this.viewerHeight = opts.viewerHeight;
        this.isMobile = opts.isMobile;
        this.zoom = opts.zoom; // initial camera z position
        this.config = this.defineCameraConfig(this.isMobile,this.zoom,this.viewerWidth,this.viewerHeight);
        this.camera = new PerspectiveCamera(
            this.config.fov_,
            this.config.aspect_,
            this.config.near_,
            this.config.far_
        );

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
      * @description Creates orbit controls to be used with three.js. Used when app is set to '3D' mode.
      * @function createOrbitControls
      * @param app 
      */
    createOrbitControls(app) {
        // controls
        this.controls = new OrbitControls(app.viewer.camera.camera, app.viewer.renderer.domElement);
        this.controls.target = new Vector3(app.geoCenter_[0], app.geoCenter_[1], 0);
        //controls.minPolarAngle = 0;
        //controls.maxPolarAngle = 0;
        this.controls.minAzimuthAngle = -0.5;
        this.controls.maxAzimuthAngle = 0.5;

        // controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
        // controls.dampingFactor = 0.05;
        // controls.screenSpacePanning = false;
        // controls.minDistance = 100;
        // controls.maxDistance = 500;
        // controls.maxPolarAngle = Math.PI / 2;

        this.camera.position.set(app.geoCenter_[0], app.geoCenter_[1], cameraConfig.zoom_);
        this.controls.update();
    }

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
    * @description defines the configuration object we will use for the threejs camera
    * @function defineCameraConfig
    * @param isMobile
    * @param zoom
    * @param viewerWidth
    * @param viewerHeight
    */
    defineCameraConfig(isMobile,zoom,viewerWidth,viewerHeight) {
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
    * @description Updates camera configuration. Called when user adds grid data, changes zoom, or changes center after initialization
    * @function redefineCamera
    * @param opts
    */
    redefineCamera(isMobile,zoom,viewerWidth,viewerHeight) {
        let cameraConfig = this.defineCameraConfig(isMobile,zoom,viewerWidth,viewerHeight)
        camera.fov = cameraConfig.fov_;
        camera.aspect = cameraConfig.aspect_;
        camera.near = cameraConfig.near_;
        camera.far = cameraConfig.far_;

        // TODO: redefine panAndZoom
        this.cameraConfig = cameraConfig;
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
            return zoom * 50000;
            //return Math.pow(8, app.currentResolution_);
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




