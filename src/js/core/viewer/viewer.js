// Viewer.js: logic for building a threeJS viewer, containing a Camera, WebGL renderer, Label renderer, raycaster

import {
    Scene,
    WebGLRenderer,
    Color,
    Raycaster,
} from "three";

import { select } from "d3-selection";

// extra Three.js module not included in main threejs build, used for labelling
import { CSS2DRenderer } from "../../lib/threejs/CSS2D/CSS2DRenderer";

import * as Utils from "../utils/utils";
import * as GUI from "../gui/gui";
import * as Camera from "../camera/camera.js";
import * as Dropdowns from "../gui/dropdowns.js";


export const build = function (app) {
    // check that settings are valid
    let valid = validateInputs(app);

    if (valid) {

        //set width/height if unspecified by user
        if (!app.width_) {
            if (app.container_.clientWidth == window.innerWidth) {
                app.width_ = app.container_.clientWidth - 1;
            } else {
                app.width_ = app.container_.clientWidth
            }
        }
        if (!app.height_) {
            if (app.container_.clientHeight == "0") {
                //if container element has no defined height, use screen height
                app.height_ = window.innerHeight - 1;
            } else {
                app.height_ = app.container_.clientHeight
            }
        }

        //mobile settings
        // TODO: replace userAgent with screen threshold (apparently userAgent is no longer standard)
        if (/Mobi|Android/i.test(navigator.userAgent)) {
            app._mobile = true;
            // saving screen space...
            app.sourcesHTML_ = null
            app.sizeFieldSelector_ = false;
            app.colorFieldSelector_ = false;
            app.colorScaleSelector_ = false;
            app.colorSchemeSelector_ = false;
        }

        Utils.createLoadingSpinner(app.container_, app.loadingIcon_);

        //set container height and width
        app.container_.classList.add("gridviz-container");
        app.container_.style.width = app.width_;
        app.container_.style.height = app.height_;

        // three.js initializations
        createScene(app);
        if (!app.labelRenderer) createLabelRenderer(app);
        if (!app.renderer) createWebGLRenderer(app);

        Camera.createCamera(app);

        createRaycaster(app);

        // dropdowns DOM container
        if (app.colorSchemeSelector_ || app.colorScaleSelector_ || app.sizeFieldSelector_ || app.colorFieldSelector_) {
            GUI.addSelectorsContainerToDOM(app);
        }
        // colour selector added here. Data-dependent dropdowns added once grid data is loaded
        if (app.colorSchemeSelector_) {
            Dropdowns.createColorSchemeDropdown(app);
            //addChangeEventToColorSchemeDropdown();
        }

        //load initial data
        //loadGrid(app.gridData_);

        return app;

    } else {
        Utils.hideLoading();
        let msg = "invalid inputs";
        console.error(msg);
        alert(msg)
        return;
    }
}

/**
*
*
* @function validateInputs
* @description validates user inputs when initializing the app
*/
function validateInputs(app) {
    if (app.colors_ && app.thresholds_) {
        if (app.colors_.length !== app.thresholds_.length) {
            alert("The number of colors and thesholdvalues must be equal")
            return false;
        } else {
            return true;
        }
    } else {
        return true;
    }
}

/**
*@description Build THREE.Scene
*@function createScene
*/
function createScene(app) {
    app.scene = new Scene();
    app.scene.background = new Color(app.backgroundColor_);
}

/**
 * @description Create renderer for three.js scene and appends it to the container element.
 * @function createWebGLRenderer
 */
function createWebGLRenderer(app) {
    app.renderer = new WebGLRenderer();
    // TODO: adjust for when the user loads gridviz into a small container
    let pixelRatio = window.devicePixelRatio;
    app.renderer.setPixelRatio(pixelRatio);
    let updateStyle = true;
    app.renderer.setSize(app.width_, app.height_, updateStyle);
    app.container_.appendChild(app.renderer.domElement);
    app.view = select(app.renderer.domElement); //for d3 mouse events
}

/**
 * @description Creates renderer for placename labels. Uses CSS2DRenderer which is not currently included in main Three.js build
 *@function createLabelRenderer
 */
function createLabelRenderer(app) {
    app.labelRenderer = new CSS2DRenderer();
    app.labelRenderer.setSize(app.width_, app.height_);
    app.labelRenderer.domElement.style.position = "absolute";
    //app.labelRenderer.domElement.style.top = "0px";
    app.container_.appendChild(app.labelRenderer.domElement);
}

/**
 * @description Initializes THREE.Raycaster object
 * @function createRaycaster
 */
function createRaycaster(app) {
    // for Click and tooltip interaction
    app.raycaster = new Raycaster();
    //app.raycaster.params.Points.threshold = defineRaycasterThreshold(app);
}



