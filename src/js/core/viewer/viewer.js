//@ts-check
/** @typedef { {container: HTMLElement, width: number, height: number, zoom:number, geoCenter:[number,number], isMobile: boolean?, is3D: Boolean?, backgroundColor:string?, showPlacenames:boolean?, zerosRemoved:number?} } ViewerConfig */
/** @typedef { {xMin: number, xMax: number, yMin: number, yMax: number} } Envelope */

import { Scene, WebGLRenderer, Color, Raycaster, Vector3, LatheBufferGeometry } from "three"
import { zoom, zoomIdentity } from "d3-zoom";
import { select } from "d3-selection";
import { CSS2DRenderer } from "../../lib/threejs/CSS2D/CSS2DRenderer";
import * as Utils from "../utils/utils";
import { Camera } from "./camera/camera.js";
import { OrbitControls } from '../../lib/threejs/orbitControls';

const EventEmitter = require('events');

/**
 * @desc A threeJS webGL viewer, containing a Camera, WebGL renderer, label renderer and raycaster - enhanced with zoom and pan capabilities.
 * 
 * @author Joseph Davies
 */
export class Viewer extends EventEmitter {

    /**
     * @constructor
     * @param {ViewerConfig} opts
     */
    constructor(opts) {
        super()

        /** Width of the viewport in pixels
        * @type {Number} */
        this.width = opts.width;

        /** Height of the viewport in pixels
        * @type {Number} */
        this.height = opts.height;

        /** Container upon which the viewer will be appended
        * @type {HTMLElement} */
        this.container = opts.container;

        /** Whether the current device is a mobile or not
        * @type {Boolean} */
        this.isMobile = opts.isMobile || false;

        /** Whether the viewport can pan and zoom in 3D
        * @type {Boolean} */
        this.is3D = opts.is3D || false;

        /** The camera Z position
        * @type {Number} */
        this.zoom = opts.zoom;

        /** Background color of the threejs scene
        * @type {String} */
        this.backgroundColor = opts.backgroundColor || "#ffffff";

        /** Whether to show placename labels from an ArcGIS service
        * @type {Boolean} */
        this.showPlacenames = opts.showPlacenames || false;

        /** The current geographic center of the viewer
        * @type {[number,number]} */
        this.geoCenter = opts.geoCenter || [0, 0];

        /** The current geographic extent of the viewer
        * @type {Envelope} */
        this.extGeo = null;

        /** A function for scaling geographic coordinates to wegbl cartesian coordinates (-1 to 1). Needed for mobile devices.
         * @type {import("d3-scale").ScaleLinear} */
        this.mobileCoordScale = null;

        /** A D3 Zoom Behavior for panning and zooming transformations
        * @type {import("d3-zoom").ZoomBehavior} */
        this.zoomBehaviour = undefined; //d3 zoom

        /** A d3 selection of the viewer WebGLRenderer.domElement.
        * @type {import("d3-selection").Selection} */
        this.view;

        //set container height and width
        this.container.classList.add("gridviz-container");
        this.container.style.width = this.width + "px";
        this.container.style.height = this.height + "px";

        // three.js initializations
        this.createScene();
        if (!this.labelRenderer) this.createLabelRenderer();
        if (!this.renderer) this.createWebGLRenderer();

        // set camera / controls
        this.camera = new Camera({
            isMobile: this.isMobile,
            viewerWidth: this.width,
            viewerHeight: this.height,
            zoom: this.zoom
        });

        this.is3D == true ? this.createOrbitControls() : this.addPanAndZoom();

        this.createRaycaster();

        //initial extent
        this.extGeo = this.getCurrentViewExtent();
    }

    /**
    *@description Build THREE.Scene
    *@function createScene
    */
    createScene() {
        this.scene = new Scene();
        this.scene.background = new Color(this.backgroundColor);
    }

    /**
     * @description Create renderer for three.js scene and appends it to the container element.
     * @function createWebGLRenderer
     */
    createWebGLRenderer() {
        this.renderer = new WebGLRenderer();
        // TODO: adjust for when the user loads gridviz into a small container
        let pixelRatio = window.devicePixelRatio;
        this.renderer.setPixelRatio(pixelRatio);
        let updateStyle = true;
        this.renderer.setSize(this.width, this.height, updateStyle);
        this.container.appendChild(this.renderer.domElement);
        this.view = select(this.renderer.domElement); //for d3 mouse events
    }

    /**
     * @description Creates renderer for placename labels. Uses CSS2DRenderer which is not currently included in main Three.js build
     *@function createLabelRenderer
     */
    createLabelRenderer() {
        this.labelRenderer = new CSS2DRenderer();
        this.labelRenderer.setSize(this.width, this.height);
        this.labelRenderer.domElement.style.position = "absolute";
        //this.labelRenderer.domElement.style.top = "0px";
        this.container.appendChild(this.labelRenderer.domElement);
    }

    /**
     * @description Initializes THREE.Raycaster object
     * @function createRaycaster
     */
    createRaycaster() {
        // for Click and tooltip interaction
        this.raycaster = new Raycaster();
    }

    addPanAndZoom() {
        //where [x0, y0] is the top-left corner of the world and [x1, y1] is the bottom-right corner of the world
        this.farScale = Utils.getScaleFromZ(this.height, this.camera.config.fov_, this.camera.config.far_);
        this.nearScale = Utils.getScaleFromZ(this.height, this.camera.config.fov_, this.camera.config.near_);

        this.zoomBehaviour =
            zoom()
                .scaleExtent([this.farScale, this.nearScale])
                .extent([[0, 0], [this.width, this.height]])
                .on("zoom", (event) => {
                    // let event = currentEvent;
                    if (this.isMobile) {
                        if (event) this.zoomHandlerMobile(event);
                    } else {
                        if (event) this.zoomHandler(event);
                    }
                })
                .on("end", (event) => {
                    //let event = currentEvent;
                    if (event) this.zoomEnd(event);
                });

        if (this.isMobile) {
            //due to a bug on mobile, where the camera shifts unexpectedly on the first pan or zoom event, we have to scale everything to a webgl-friendly range and set the camera to 0,0
            let initial_scale = Utils.getScaleFromZ(this.height, this.camera.config.fov_, this.camera.config.initialZ_);
            var initial_transform = zoomIdentity.translate(this.width / 2, this.height / 2).scale(initial_scale);
            this.zoomBehaviour.transform(this.view, initial_transform);
            this.camera.setCamera(0, 0, this.camera.config.initialZ_)

        } else {
            //initial desktop zoom transform
            let scale = Utils.getScaleFromZ(this.height, this.camera.config.fov_, this.camera.config.initialZ_)
            this.zoomBehaviour.scaleTo(this.view, scale);
            this.zoomBehaviour.translateTo(this.view,
                this.geoCenter[0] + this.width / 2,
                this.geoCenter[1] + this.height / 2);
            this.camera.setCamera(this.geoCenter[0], this.geoCenter[1], this.camera.config.initialZ_)
        }
        this.view.call(this.zoomBehaviour);
    }

    zoomHandler(event) {
        let scale = event.transform.k;
        if (event.sourceEvent) {
            let new_z = Utils.getZFromScale(this.height, this.camera.config.fov_, scale);
            //if zoom
            if (new_z !== this.camera.camera.position.z) {
                // Handle a zoom event
                const { clientX, clientY } = event.sourceEvent;
                // Code from WestLangley https://stackoverflow.com/questions/13055214/mouse-canvas-x-y-to-three-js-world-x-y-z/13091694#13091694
                const vector = new Vector3(
                    (clientX / this.width) * 2 - 1,
                    -(clientY / this.height) * 2 + 1,
                    1
                );
                vector.unproject(this.camera.camera);
                const dir = vector.sub(this.camera.camera.position).normalize();
                const distance = (new_z - this.camera.camera.position.z) / dir.z;
                const pos = this.camera.camera.position.clone().add(dir.multiplyScalar(distance));
                // Set the camera to new coordinates
                this.camera.setCamera(pos.x, pos.y, new_z);
            } else {
                // If panning
                const { movementX, movementY } = event.sourceEvent;

                // Adjust mouse movement by current scale and set camera
                const current_scale = Utils.getScaleFromZ(this.height, this.camera.config.fov_, this.camera.camera.position.z);
                this.camera.setCamera(
                    this.camera.camera.position.x - movementX / current_scale,
                    this.camera.camera.position.y + movementY / current_scale,
                    this.camera.camera.position.z
                );
            }
        }
    }

    zoomHandlerMobile(event) {
        if (event.sourceEvent) {
            let scale = event.transform.k;
            let x = -(event.transform.x - this.width / 2) / scale;
            let y = (event.transform.y - this.height / 2) / scale;
            let z = Utils.getZFromScale(this.height, this.camera.config.fov_, scale);
            this.camera.setCamera(x, y, z);
        }
    }

    zoomEnd(event) {
        this.extGeo = this.getCurrentViewExtent();
        this.emit("zoomEnd", event)
    }

    /**
     * @description zoom in (apply d3 transform and reduce camera Z position)
     * @function zoomIn
     * @parameter scaleFactor 
     */
    zoomIn(scaleFactor) {
        // when we zoom, we have to update both the threejs camera and the d3 zoom
        this.view.call(this.zoomBehaviour.scaleBy, scaleFactor);
        this.camera.setCamera(this.camera.camera.position.x, this.camera.camera.position.y, this.camera.camera.position.z / scaleFactor)
    }

    /**
    * @description zoom out (apply d3 transform and increase camera Z position)
    * @function zoomOut
    * @parameter scaleFactor 
    */
    zoomOut(scaleFactor) {
        // when we zoom, we have to update both the threejs camera and the d3 zoom
        this.view.call(this.zoomBehaviour.scaleBy, scaleFactor);
        this.camera.setCamera(this.camera.camera.position.x, this.camera.camera.position.y, this.camera.camera.position.z / scaleFactor)
    }

    /**
     * @description Returns the current extent of the viewer in geographic coordinates
     * @function getCurrentViewExtent
     * 
     * @returns {Envelope}
     */
    getCurrentViewExtent() {
        var elem = this.renderer.domElement;
        let clientBottomLeft = [elem.clientLeft, elem.clientHeight];
        let clientTopRight = [elem.clientWidth, elem.clientTop];
        let bottomLeftGeo = this.getGeoCoordsFromScreen(clientBottomLeft); //client x,y
        let topRightGeo = this.getGeoCoordsFromScreen(clientTopRight); //client x,y

        // if getting coords was unsuccessful, exit
        if (!bottomLeftGeo || !topRightGeo) {
            return
        }

        return {
            xMin: bottomLeftGeo.x,
            yMin: bottomLeftGeo.y,
            xMax: topRightGeo.x,
            yMax: topRightGeo.y,
        };
    }


    /**
     * @description transform Envelope to mobile coordinates (-1 - 1)
     * @memberof Viewer
     * @param {Envelope} e
     */
    envelopeToMobile(e) {
        e.xMin = this.mobileCoordScale(e.xMin);
        e.yMin = this.mobileCoordScale(e.yMin);
        e.xMax = this.mobileCoordScale(e.xMax);
        e.yMax = this.mobileCoordScale(e.yMax);
        return e;
    }

    /**
    * @description get the position of a canvas location in geographic coords
    * @function getGeoCoordsFromScreen
    * @returns {Vector3} pos
    */
    getGeoCoordsFromScreen([clientX, clientY]) {
        var vec = new Vector3(); // create once and reuse
        var pos = new Vector3(); // create once and reuse
        vec.set(
            (clientX / window.innerWidth) * 2 - 1,
            -(clientY / window.innerHeight) * 2 + 1,
            0.5
        );
        vec.unproject(this.camera.camera);
        vec.sub(this.camera.camera.position).normalize();
        var distance = -this.camera.camera.position.z / vec.z;
        pos.copy(this.camera.camera.position).add(vec.multiplyScalar(distance));
        if (this.isMobile) {
            if (this.mobileCoordScale) {
                pos.x = Math.round(this.mobileCoordScale.invert(pos.x))
                pos.y = Math.round(this.mobileCoordScale.invert(pos.y))
            }
        }
        return pos;
    }


    /**
  * @description Creates orbit controls to be used with three.js. Used when app is set to '3D' mode.
  * @function createOrbitControls
  * 
  */
    createOrbitControls() {
        // controls
        this.controls = new OrbitControls(this.camera.camera, this.renderer.domElement);
        this.controls.target = new Vector3(this.geoCenter[0], this.geoCenter[1], 0);
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

        this.camera.camera.position.set(this.geoCenter[0], this.geoCenter[1], this.camera.config.zoom);
        this.controls.update();
    }
}

