import {
    Scene,
    WebGLRenderer,
    Color,
    Raycaster,
    Vector3
} from "three"

import { select } from "d3-selection";
import { CSS2DRenderer } from "../../lib/threejs/CSS2D/CSS2DRenderer";
import * as Utils from "../utils/utils";
import { Camera } from "../camera/camera.js";

/**
 * @desc A threeJS webGL viewer, containing a Camera, WebGL renderer, label renderer and raycaster - enhanced with zoom and pan capabilities.
 * 
 * @author Joseph Davies
 */
export class Viewer {

    constructor(opts) {

        this.width = opts.width;
        this.height = opts.height;
        this.container = opts.container;
        this.isMobile = opts.isMobile || false;
        this.zoom = opts.zoom;

        //set container height and width
        this.container.classList.add("gridviz-container");
        this.container.style.width = this.width;
        this.container.style.height = this.height;

        // three.js initializations
        this.createScene(this);
        if (!this.labelRenderer) this.createLabelRenderer(this);
        if (!this.renderer) this.createWebGLRenderer(this);

        this.camera = new Camera({
            isMobile: this.isMobile,
            viewerWidth: this.width,
            viewerHeight: this.height,
            zoom: this.zoom
        });

        this.createRaycaster(this);
    }

    /**
    *@description Build THREE.Scene
    *@function createScene
    */
    createScene() {
        this.scene = new Scene();
        this.scene.background = new Color(this.backgroundColor_);
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
        //app.labelRenderer.domElement.style.top = "0px";
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

    /**
     * @description Returns the current extent of the viewer in geographic coordinates
     * @function getCurrentViewExtent
     * @param app gridviz app
     */
    getCurrentViewExtent(app) {
        var elem = app.viewer.renderer.domElement;
        let clientBottomLeft = [elem.clientLeft, elem.clientHeight];
        let clientTopRight = [elem.clientWidth, elem.clientTop];
        let bottomLeftWorld = this.getWorldCoordsFromScreen(app, clientBottomLeft); //client x,y
        let topRightWorld = this.getWorldCoordsFromScreen(app, clientTopRight); //client x,y

        // if getting coords was unsuccessful, exit
        if (!bottomLeftWorld || !topRightWorld) {
            return
        }

        // full european extent in EPSG 3035:
        // return {
        //   xmin: 1053668.5589,
        //   ymin: 1645342.8583,
        //   xmax: 5724066.4412,
        //   ymax: 5901309.0137
        // };

        // if the user has reduced the filesize by removing trailing 0s from the csv, we simply add them back on before sending the placename queries
        if (app.zerosRemoved_) {
            let d = Number('1E' + app.zerosRemoved_);
            return {
                xmin: bottomLeftWorld.x * d,
                ymin: bottomLeftWorld.y * d,
                xmax: topRightWorld.x * d,
                ymax: topRightWorld.y * d
            };
        } else {
            return {
                xmin: bottomLeftWorld.x,
                ymin: bottomLeftWorld.y,
                xmax: topRightWorld.x,
                ymax: topRightWorld.y
            };
        }
    }

    /**
    * @description get the position of a canvas location in geographic coords
    *@function getWorldCoordsFromScreen
    */
    getWorldCoordsFromScreen(app, [clientX, clientY]) {
        var vec = new Vector3(); // create once and reuse
        var pos = new Vector3(); // create once and reuse
        vec.set(
            (clientX / window.innerWidth) * 2 - 1,
            -(clientY / window.innerHeight) * 2 + 1,
            0.5
        );
        vec.unproject(app.viewer.camera.camera);
        vec.sub(app.viewer.camera.camera.position).normalize();
        var distance = -app.viewer.camera.camera.position.z / vec.z;
        pos.copy(app.viewer.camera.camera.position).add(vec.multiplyScalar(distance));
        if (app._mobile) {
            if (app.mobileCoordScaleX && app.mobileCoordScaleY) {
                pos.x = Math.round(app.mobileCoordScaleX.invert(pos.x))
                pos.y = Math.round(app.mobileCoordScaleY.invert(pos.y))
            } else {
                return false
            }
        }
        return pos;
    }

}

