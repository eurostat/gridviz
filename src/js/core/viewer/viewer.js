//@ts-check
/** @typedef { {container: HTMLElement, width: number, height: number, zoom:number, geoCenter:[number,number], isMobile: boolean,  backgroundColor?:string, showPlacenames:boolean?, zerosRemoved:number?} } ViewerConfig */
/** @typedef { {xMin: number, xMax: number, yMin: number, yMax: number} } Envelope */

import { Scene, WebGLRenderer, Color, Raycaster, Vector3, LatheBufferGeometry } from "three"
import { zoom, zoomIdentity } from "d3-zoom";
import { select } from "d3-selection";
import { CSS2DRenderer } from "../../lib/threejs/CSS2D/CSS2DRenderer";
import * as Utils from "../utils/utils";
import { Camera } from "./camera/camera.js";

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

        this.width = opts.width;
        this.height = opts.height;
        this.container = opts.container;
        this.isMobile = opts.isMobile || false;
        this.zoom = opts.zoom; //camera z position
        this.backgroundColor = opts.backgroundColor || "#000";
        this.showPlacenames = opts.showPlacenames || false;
        this.zerosRemoved = opts.zerosRemoved || 0;
        this.geoCenter = opts.geoCenter || [0, 0];
        this.extGeo = null;

        this.zoomBehaviour = undefined; //d3 zoom
        this.view; // d3 selection of WebGLRenderer.domElement: HTMLCanvasElement

        //set container height and width
        this.container.classList.add("gridviz-container");
        this.container.style.width = this.width + "px";
        this.container.style.height = this.height + "px";

        // three.js initializations
        this.createScene();
        if (!this.labelRenderer) this.createLabelRenderer();
        if (!this.renderer) this.createWebGLRenderer();

        this.camera = new Camera({
            isMobile: this.isMobile,
            viewerWidth: this.width,
            viewerHeight: this.height,
            zoom: this.zoom
        });

        this.createRaycaster();

        // add d3 zoom functionality
        this.addPanAndZoom();

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
                parseInt(this.geoCenter[0]) + this.width / 2,
                parseInt(this.geoCenter[1]) + this.height / 2);
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

    zoomHandlerMobile(app, event) {
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
     * @param app gridviz app
     * @returns {Envelope}
     */
    getCurrentViewExtent(app) {
        var elem = this.renderer.domElement;
        let clientBottomLeft = [elem.clientLeft, elem.clientHeight];
        let clientTopRight = [elem.clientWidth, elem.clientTop];
        let bottomLeftGeo = this.getGeoCoordsFromScreen(app, clientBottomLeft); //client x,y
        let topRightGeo = this.getGeoCoordsFromScreen(app, clientTopRight); //client x,y

        // if getting coords was unsuccessful, exit
        if (!bottomLeftGeo || !topRightGeo) {
            return
        }

        return {
            xMin: bottomLeftGeo.x,
            yMin: bottomLeftGeo.y,
            xMax: topRightGeo.x,
            yMax: topRightGeo.y
        };

    }

    /**
    * @description get the position of a canvas location in geographic coords
    * @function getGeoCoordsFromScreen
    */
    getGeoCoordsFromScreen(app, [clientX, clientY]) {
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
            if (this.mobileCoordScaleX && this.mobileCoordScaleY) {
                pos.x = Math.round(this.mobileCoordScaleX.invert(pos.x))
                pos.y = Math.round(this.mobileCoordScaleY.invert(pos.y))
            } else {
                return false
            }
        }
        return pos;
    }

}

