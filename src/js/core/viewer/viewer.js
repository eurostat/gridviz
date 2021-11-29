import {
    Scene,
    WebGLRenderer,
    Color,
    Raycaster,
} from "three";
import { select } from "d3-selection";
import { CSS2DRenderer } from "../../lib/threejs/CSS2D/CSS2DRenderer";
import * as Utils from "../utils/utils";
import * as GUI from "../gui/gui";
import { Camera } from "../camera/camera.js";
import * as Dropdowns from "../gui/dropdowns.js";


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

        Utils.createLoadingSpinner(this.container, this.loadingIcon_);

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

}

