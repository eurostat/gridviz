// d3.js
import { zoom, zoomIdentity } from "d3-zoom";
import * as d3scaleChromatic from "d3-scale-chromatic";
import * as d3scale from "d3-scale";
import { json, csv } from "d3-fetch";
import { extent, min, max } from "d3-array";
import { select, pointer } from "d3-selection";

//three.js
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  Points,
  Vector3,
  Color,
  Raycaster,
  Float32BufferAttribute,
  BufferGeometry,
  ShaderMaterial,
  PointsMaterial
} from "three";
import * as THREE from "three/src/constants";
// extra Three.js modules not included in main threejs build, used for labelling
import { CSS2DRenderer } from "../lib/threejs/CSS2D/CSS2DRenderer";
// for loading NUTS2json 
import { feature } from "topojson";
// library constants
import * as CONSTANTS from "./constants.js";
// utility functions
import * as Utils from "./utils";
// gridviz modules
import * as geojson from "./layers/geojson.js";
import * as tooltip from "./tooltip/tooltip.js";
import * as placenames from "./placenames/placenames.js";
import * as legend from "./legend/legend.js";

//TODO list:
// - mobile pan & zoom bug when using method center([x,y])

/**
 * Creates a 2D Three.js scene for visualizing point data derived from gridded statistics.
 *
 * @author Joseph Davies, Julien Gaffuri
 * @description Generates a 2D Three.js scene for visualizing large point datasets using WebGL. The library follows a similar structure to that of d3, whereby parameters are set using a series of accessor functions, each of which returns the main viewer.
 * @requires "THREE"
 * @requires "D3"
 * 
 */
export function viewer(options) {
  //output object
  let viewer = {};

  //debugging
  viewer.debugPlacenames_ = false; //logs scale & population filter values in the console upon zoom

  //styles
  viewer.container_ = document.body;
  viewer.height_ = null; //takes container width/height
  viewer.width_ = null;
  viewer.backgroundColor_ = "#000";
  viewer.lineColor_ = "#ffffff";
  viewer.lineWidth_ = 0.0012;
  viewer.highlightColor_ = "cyan"
  viewer.loadingIcon_ = "ring"; //ripple | ring | ellipsis | roller

  // https://d3-legend.susielu.com vs https://blog.scottlogic.com/2019/03/13/how-to-create-a-continuous-colour-range-legend-using-d3-and-d3fc.html
  viewer.showLegend_ = true;
  // legend config
  viewer.legend_ = {
    type: "continuous", //cells vs continuous
    width: 300,
    height: null,
    orientation: "horizontal",
    title: "Legend",
    titleWidth: 50,
    format: ".0s",
    cells: 5,
    shapeWidth: 30
  };
  viewer._gridLegend; //legend stored here

  //d3 Scaling & colouring stuff
  viewer.colorSchemeName_ = "interpolateTurbo";
  viewer.reverseColorScheme_ = false;
  viewer.sizeScaleName_ = "scaleSqrt";
  viewer.colorScaleName_ = "scaleSequential";
  viewer.colors_ = null;
  viewer.thresholdValues_ = null;
  viewer.colorScaleFunction_ = null;
  viewer.sizeScaleFunction_ = null;

  //dropdowns
  viewer.colorSchemeSelector_ = false;
  viewer.colorScaleSelectorLabel_ = "Color scale: "
  viewer.colorScaleSelector_ = false;
  viewer.colorScaleSelectorDefault_ = viewer.colorScaleName_
  viewer.colorFieldSelectorLabel_ = "Color field: "
  viewer.colorFieldSelector_ = false;
  viewer.sizeFieldSelector_ = false;
  viewer.sizeFieldSelectorLabel_ = "Size field: ";

  //projection
  viewer.EPSG_ = 3035; //used to determine the projection for grid, placenames, NUTS, etc

  // placenames
  viewer.showPlacenames_ = false;
  viewer.placenamesCountry_ = false;
  viewer.placenameThresholds_ = null;

  // dataset properties
  viewer.center_ = null; //default - If not specified then should default as first or randomly selected point
  viewer.zerosRemoved_ = 0; //to make EPSG 3035 files lighter, the final 3 zeros of each x/y coordinate are often removed. 
  viewer.colorField_ = null;
  viewer.sizeField_ = null;

  //texts
  viewer.title_ = null;
  viewer.subtitle_ = null;
  viewer.cellCount_ = null;
  viewer.sourcesHTML_ = null;

  //buttons
  viewer.homeButton_ = false;

  //borders using nuts2json
  viewer.nuts_ = false; //show topojson borders of europe (available in 3035; 3857, 4258 or 4326)
  viewer.nutsCountry_ = false; // only show borders of given country code
  viewer.nutsLevel_ = 0;
  viewer.nutsSimplification_ = "10M"; //current nuts2json simplification

  // grid data
  /**
 * @typedef {Object} Grid
 * @property {number} url - URL of the csv file to retrieve
 * @property {number} cellSize - Size of the cell in the same unit system as the coordinates. e.g 1 km² grid in EPSG:3035 with zerosRemoved set to 3 has a cellSize of 1 (without the zerosRemoved it would be 1000)
 */
  viewer.gridData_ = null; // type:Grid
  viewer.resolution_ = null; //current grid resolution. e.g. 5000 for EPSG:3035 5km grid

  //threejs camera
  viewer.cameraConfig = {}
  viewer.cameraConfig.near_ = null;
  viewer.cameraConfig.far_ = null; //set min zoom
  viewer.cameraConfig.fov_ = null;
  viewer.cameraConfig.aspect_ = null;
  viewer.zoom_ = null; //initial camera position Z

  //three.js scene
  viewer.scene = null;
  viewer.animating = false;

  // remaining variables
  let
    boundariesGroup, //THREE.Group for nuts borders
    pointsMaterial,
    pointsGeometry,
    camera,
    raycaster,
    previousIntersect,
    view


  let gridCaches = {};
  let gridConfig = {};

  //definition of generic accessors based on the name of each parameter name
  for (var p in viewer)
    (function () {
      var p_ = p;
      viewer[p_.substring(0, p_.length - 1)] = function (v) { if (!arguments.length) return viewer[p_]; viewer[p_] = v; return viewer; };
    })();

  //override some accesors
  viewer.legend = function (v) {
    for (let key in v) {
      viewer.legend_[key] = v[key];
    }
    //update legend if necessary
    if (viewer._gridLegend) {
      legend.updateLegend(viewer)
    }
    return viewer;
  };

  //threejs layer that will contain the grid "points"
  viewer.pointsLayer = null; //three.Points

  //if gridData has already been added, this function now overwrites the gridData currently in the viewer.
  viewer.gridData = function (v) {
    if (v && viewer.pointsLayer) {
      viewer.gridData_ = v;
      viewer.resolution_ = v[0].cellSize
      gridConfig = defineGridConfig();

      if (viewer.showPlacenames_) {
        removePlacenamesFromScene(viewer); //clear labels
      }

      redefineCamera();
      //clear previous grid
      loadGrid(v[0])
    } else {
      if (v) {
        viewer.gridData_ = v;
      }
    }
    return viewer;
  };

  //if viewer has already been initialized, calls to center() method will move existing camera
  viewer.center = function (v) {
    //if already previously set
    if (v && viewer.scene) {
      viewer.center_ = v;
      redefineCamera();
      setCamera(v[0], v[1], camera.position.z)
    } else {
      //set initial
      if (v) {
        viewer.center_ = v;
      }
    }
    return viewer;
  };


  /**
   *
   *
   * @function zoom
   * @description Sets the three.js camera z value. If the viewer has already been initialized, calls to zoom() method will move existing camera
   */
  viewer.zoom = function (v) {
    if (v && viewer.scene) {
      viewer.zoom_ = v;
      redefineCamera();
      setCamera(viewer.camera.position.x, viewer.camera.position.y, v); // Set camera zoom (z position)
    } else {
      if (v) {
        viewer.zoom_ = v;
      }
    }
    return viewer;
  };

  /**
   *
   *
   * @function build
   * @description Clears the canvas, builds the three.js viewer and appends grid data
  */
  viewer.build = function () {
    let valid = validateInputs();

    if (valid) {

      //set width/height if unspecified by user
      if (!viewer.width_) {
        if (viewer.container_.clientWidth == window.innerWidth) {
          viewer.width_ = viewer.container_.clientWidth - 4;
        } else {
          viewer.width_ = viewer.container_.clientWidth
        }

      }
      if (!viewer.height_) {
        if (viewer.container_.clientHeight == "0") {
          //if container element has no defined height, use screen height
          viewer.height_ = window.innerHeight - 4;
        } else {
          viewer.height_ = viewer.container_.clientHeight
        }


      }
      //force viewer width to be the same as the container width
      // if (viewer.width_ != viewer.container_.clientWidth) {
      //   viewer.width_ = viewer.container_.clientWidth;
      // }

      //mobile logic
      if (/Mobi|Android/i.test(navigator.userAgent)) {
        viewer._mobile = true;
        // saving screen space...
        viewer.sourcesHTML_ = null
        viewer.sizeFieldSelector_ = false;
        viewer.colorFieldSelector_ = false;
        viewer.colorScaleSelector_ = false;
        viewer.colorSchemeSelector_ = false;
      }

      Utils.createLoadingSpinner(viewer.container_, viewer.loadingIcon_);
      Utils.createLoadingText(viewer.container_);

      //set container height and width
      viewer.container_.classList.add("gridviz-container");
      viewer.container_.style.width = viewer.width_;
      viewer.container_.style.height = viewer.height_;

      //set viewer resolution from user input
      if (!viewer.resolution_) {
        viewer.resolution_ = viewer.gridData_[0].cellSize;
      }

      if (viewer.showPlacenames_ && !viewer.placenameThresholds_) {
        placenames.defineDefaultPlacenameThresholds(viewer);
      }

      //defines raycaster threshold and point size. See GridConfig typedef.
      gridConfig = defineGridConfig();

      // three.js initializations
      createScene();
      if (!viewer.labelRenderer) createLabelRenderer();
      if (!viewer.renderer) createWebGLRenderer();

      createCamera();
      createRaycaster();

      // tooltip DOM element
      tooltip.createTooltipContainer(viewer);

      // dropdowns DOM container
      if (viewer.colorSchemeSelector_ || viewer.colorScaleSelector_ || viewer.sizeFieldSelector_ || viewer.colorFieldSelector_) {
        addSelectorsContainerToDOM();
      }
      // colour selector added here. Data-dependent dropdowns added once grid data is loaded
      if (viewer.colorSchemeSelector_) {
        createColorSchemeDropdown();
      }

      //load initial data
      loadGrid(viewer.gridData_[0]);

      // NUTS geometries
      if (viewer.nuts_) {
        loadNuts2json(
          CONSTANTS.nuts_base_URL +
          viewer.EPSG_ +
          "/" +
          viewer.nutsSimplification_ +
          "/" + viewer.nutsLevel_ + ".json"
        );
      }

      //request initial placenames
      if (viewer.showPlacenames_) {
        placenames.getPlacenames(viewer);
      }

      return viewer;

    } else {
      Utils.hideLoading();
      console.error("invalid inputs");
      return
    }
  };

  /**
  *
  *
  * @function validateInputs
  * @description validates user inputs when initializing the viewer
  */
  function validateInputs() {
    if (viewer.colors_ && viewer.thresholdValues_) {
      if (viewer.colors_.length !== viewer.thresholdValues_.length) {
        alert("The number of colors and thesholdvalues must be equal")
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  }

  function addInitialElementsToDOM() {
    // add headings / sources texts
    if (viewer.title_ || viewer.subtitle_ || viewer.cellCount_) {
      addHeadingsContainerToDOM();
    }
    if (viewer.title_) {
      addTitleToDOM();
    }
    if (viewer.subtitle_) {
      addSubtitleToDOM();
    }
    if (viewer.cellCount_) {
      addCellCountToDOM();
    }
    if (viewer.sourcesHTML_) {
      addSourcesToDOM();
    }
    if (viewer.homeButton_) {
      addHomeButtonToDOM();
    }
  }

  /**
  *
  *
  * @function addHeadingsContainerToDOM
  * @description adds a div container for viewer.title and viewer.subtitle texts
  */
  function addHeadingsContainerToDOM() {
    viewer.headingsNode = document.createElement("div");
    viewer.headingsNode.classList.add("gridviz-headings-container");
    viewer.headingsNode.classList.add("gridviz-plugin");
    viewer.container_.appendChild(viewer.headingsNode);
  }

  /**
  *
  *
  * @function addTitleToDOM
  * @description adds a div element for viewer.title to headings container 
  */
  function addTitleToDOM() {
    let node = document.createElement("div");
    node.classList.add("gridviz-title");
    node.innerHTML = viewer.title_;
    viewer.headingsNode.appendChild(node);
  }

  /**
  *
  *
  * @function addSubtitleToDOM
  * @description adds a div element for viewer.subtitle to headings container 
  */
  function addSubtitleToDOM() {
    let node = document.createElement("div");
    node.classList.add("gridviz-subtitle");
    node.innerHTML = viewer.subtitle_;
    viewer.headingsNode.appendChild(node);
  }

  /**
  *
  *
  * @function addCellCountToDOM
  * @description adds a div element for viewer.cellCount to headings container 
  */
  function addCellCountToDOM() {
    let node = document.createElement("div");
    node.classList.add("gridviz-cellcount");
    node.innerHTML = "Number of cells: " + Utils.formatNumber(viewer.cellCount);
    viewer.headingsNode.appendChild(node);
  }

  /**
  *
  *
  * @function addSourcesToDOM
  * @description adds a div element showing viewer.sourcesHTML in the bottom right corner
  */
  function addSourcesToDOM() {
    let node = document.createElement("div");
    node.classList.add("gridviz-sources");
    node.innerHTML = viewer.sourcesHTML_;
    viewer.container_.appendChild(node);
  }

  /**
*
*
* @function addHomeButtonToDOM
* @description adds a button element with a home icon to the DOM
*/
  function addHomeButtonToDOM() {
    viewer.homeButtonNode = document.createElement("div");
    viewer.homeButtonNode.id = "gridviz-home-btn";
    viewer.homeButtonNode.classList.add("gridviz-home-button", "gridviz-icon-button");
    let icon = document.createElement("span")
    icon.classList.add("icon")
    viewer.homeButtonNode.appendChild(icon)
    viewer.container_.appendChild(viewer.homeButtonNode);
  }

  /**
  *
  *
  * @function addSelectorsContainerToDOM
  * @description adds a div container for the available dropdown selectors to the DOM
  */
  function addSelectorsContainerToDOM() {
    viewer.selectorsContainer = document.createElement("div");
    viewer.selectorsContainer.classList.add("gridviz-selectors");
    viewer.selectorsContainer.classList.add("gridviz-plugin");
    viewer.container_.appendChild(viewer.selectorsContainer);
  }

  /**
  *@description Build THREE.Scene
  *@function createScene
  */
  function createScene() {
    viewer.scene = new Scene();
    viewer.scene.background = new Color(viewer.backgroundColor_);
  }


  /**
   * @description Create renderer for three.js scene and appends it to the container element.
   * @function createWebGLRenderer
   */
  function createWebGLRenderer() {
    viewer.renderer = new WebGLRenderer();
    // TODO: adjust for when the user loads gridviz into a small container
    let pixelRatio = window.devicePixelRatio;
    viewer.renderer.setPixelRatio(pixelRatio);
    let updateStyle = true;
    viewer.renderer.setSize(viewer.width_, viewer.height_, updateStyle);
    viewer.container_.appendChild(viewer.renderer.domElement);
    view = select(viewer.renderer.domElement); //for d3 mouse events
  }

  /**
   * @description Creates renderer for placename labels. Uses CSS2DRenderer which is not currently included in main Three.js build
   *@function createLabelRenderer
   */
  function createLabelRenderer() {
    viewer.labelRenderer = new CSS2DRenderer();
    viewer.labelRenderer.setSize(viewer.width_, viewer.height_);
    viewer.labelRenderer.domElement.style.position = "absolute";
    //viewer.labelRenderer.domElement.style.top = "0px";
    viewer.container_.appendChild(viewer.labelRenderer.domElement);
  }

  /**
 * @description defines the configuration object we will use for the threejs camera
 * @function defineCameraConfig
 */
  function defineCameraConfig() {
    let config = {}
    config.near_ = defineNear();
    config.far_ = defineFar(); //set min zoom
    config.fov_ = CONSTANTS.fov;
    config.aspect_ = viewer.width_ / viewer.height_;

    //initial camera position Z
    //zoom doesnt work on mobile ...yet
    if (viewer._mobile) {
      config.initialZ_ = config.far_ / 2 - 1
    } else {
      config.initialZ_ = viewer.zoom_ || config.far_ / 2 - 1
    }
    config.zoom_ = viewer.zoom_ || config.initialZ_;

    return config;
  }

  /**
   * @description Initializes THREE camera object
   * @function createCamera
   */
  function createCamera() {
    viewer.cameraConfig = defineCameraConfig();
    viewer.camera = new PerspectiveCamera(
      viewer.cameraConfig.fov_,
      viewer.cameraConfig.aspect_,
      viewer.cameraConfig.near_,
      viewer.cameraConfig.far_
    );

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
  * @description Updates camera configuration. Called when user adds grid data, changes zoom, or changes center after initialization
  * @function redefineCamera
  */
  function redefineCamera() {
    let cameraConfig = defineCameraConfig()

    viewer.camera.fov = cameraConfig.fov_;
    viewer.camera.aspect = cameraConfig.aspect_;
    viewer.camera.near = cameraConfig.near_;
    viewer.camera.far = cameraConfig.far_;

    // TODO: redefine panAndZoom
  }


  /**
   * @function setCamera
   * @description Sets position and direction of camera
   * @param {number} x three.js coord
   * @param {number} y three.js coord
   * @param {number} z three.js coord
   * 
   */
  function setCamera(x, y, z) {
    viewer.camera.position.set(x, y, z); // Set camera position
    viewer.camera.lookAt(new Vector3(x, y, z)); // Set camera angle
  }

  /**
   * @description Initializes THREE.Raycaster object
   * @function createRaycaster
   */
  function createRaycaster() {
    // for Click and tooltip interaction
    raycaster = new Raycaster();
    raycaster.params.Points.threshold = gridConfig.raycasterThreshold;
  }

  /**
   * @description Adds event listeners to viewer, dropdowns and screen resize
   * @function addEventListeners
   */
  function addEventListeners() {
    //show population value on click
    addMouseEventsToView();
    //change color scheme
    if (viewer.colorSchemeSelector_) {
      addChangeEventToColorSchemeDropdown();
    }
    //change scale
    if (viewer.colorScaleSelector_) {
      createColorScaleDropdown();
    }
    //screen resize
    addResizeEvent();
    //zoom, home buttons etc
    addButtonEvents();
  }

  /**
 * @description Add change event to color-scheme selector
 * @function addChangeEventToColorSchemeDropdown
 */
  function addChangeEventToColorSchemeDropdown() {
    viewer.schemesSelect.addEventListener("change", function (e) {
      onChangeColorScheme(e.currentTarget.value);
    });
  }

  /**
  * @description Color scheme dropdown event handler. Updates point colours and legend
  * @function onChangeColorScheme
  * @param {String} scheme Name of the d3-scale-chromatic colour scheme
  */
  function onChangeColorScheme(scheme) {
    tooltip.hideTooltip()
    viewer.colorSchemeName_ = scheme;
    updateColorScale();
    updatePointsColors();
    if (viewer.legend_) {
      legend.updateLegend(viewer);
    }
  }

  /**
  * @description Adds change event to color-field select element
  * @function addChangeEventToColorFieldDropdown
  */
  function addChangeEventToColorFieldDropdown() {
    viewer.colorFieldSelect.addEventListener("change", function (e) {
      onChangeColorField(e.currentTarget.value);
    });
  }

  /**
  * @description Color csv field dropdown event handler
  * @function onChangeColorField
  * @param {*} field
  */
  function onChangeColorField(field) {
    viewer.colorField_ = field;
    updatePointsColors();
    if (viewer.legend_) {
      legend.updateLegend(viewer);
    }
  }

  /**
  * @description Add change event to color-scale selector
  * @function addChangeEventToColorScaleDropdown
  */
  function addChangeEventToColorScaleDropdown() {
    viewer.colorScaleSelect.addEventListener("change", function (e) {
      onChangeColorScale(e.currentTarget.value);
    });
  }

  /**
  * @description Color scale dropdown event handler
  * @function onChangeColorScale
  * @param {String} scale name of d3-scale to be used
  */
  function onChangeColorScale(scale) {
    viewer.colorScaleName_ = scale;
    updateColorScale();
    updatePointsColors();
    if (viewer.legend_) {
      legend.updateLegend(viewer);
    }
  }

  /**
  * @description Add change event to size-field selector
  * @function addChangeEventToSizeFieldDropdown
  */
  function addChangeEventToSizeFieldDropdown() {
    viewer.sizeFieldSelect.addEventListener("change", function (e) {
      onChangeSizeField(e.currentTarget.value);
    });
  }

  /**
  * Color csv field dropdown event handler
  *
  * @param {*} field
  */
  function onChangeSizeField(field) {
    viewer.sizeField_ = field;
    updateSizeScale();
    updatePointsSizes();
    if (viewer._gridLegend) {
      legend.updateLegend(viewer);
    }
  }

  /**
 * @description redefine width and height of viewer when window is resized
 * @function addResizeEvent
 */
  function addResizeEvent() {
    window.addEventListener("resize", () => {
      viewer.width_ = viewer.container_.clientWidth;
      viewer.height_ = viewer.container_.clientHeight;
      viewer.labelRenderer.setSize(viewer.width_, viewer.height_);
      viewer.renderer.setSize(viewer.width_, viewer.height_);
      viewer.camera.aspect = viewer.width_ / viewer.height_;
      viewer.camera.updateProjectionMatrix();
    });
  }

  /**
* @description attach event listeners to the viewer
* @function addMouseEventsToView
*/
  function addMouseEventsToView() {
    // show cell value on click
    view.on("click", (event) => {
      let [mouseX, mouseY] = pointer(event);
      let mouse_position = [mouseX, mouseY];
      let intersect = checkIntersects(mouse_position);
      if (intersect) {
        console.log("Intersect", intersect);
        let index = intersect.index;
        let cell = gridCaches[viewer.resolution_][index];
        highlightPoint(intersect);
        tooltip.showTooltip(viewer, mouse_position, cell);
      } else {
        tooltip.hideTooltip();
      }
      //console.log("Camera pos:", viewer.camera.position);
    });

    // view.on("mouseleave", () => {

    // });
  }

  /**
* @description attach event listeners to viewer buttons
* @function addButtonEvents
*/
  function addButtonEvents() {
    if (viewer.homeButton_) {
      viewer.homeButtonNode.addEventListener("click", () => {
        viewWholeGrid();
      })
    }
  }


  /**
* @description move camera to show the entire extent of the grid, and update the zoom transform
* @function viewWholeGrid
*/
  function viewWholeGrid() {
    //let minViewerX = viewer.extentX[0];
    //let minViewerY = viewer.extentY[0];

    if (viewer._mobile) {
      let scale = getScaleFromZ(viewer.cameraConfig.initialZ_)
      viewer.d3zoom.scaleTo(view, scale);
      viewer.d3zoom.translateTo(view,
        parseInt(viewer.center_[0]) + viewer.width_ / 2,
        parseInt(viewer.center_[1]) + viewer.height_ / 2);
      setCamera(viewer.center_[0], viewer.center_[1], viewer.cameraConfig.initialZ_)

      let initial_scale = getScaleFromZ(viewer.cameraConfig.far_);
      let initial_transform = zoomIdentity
        .translate(viewer.width_ / 2, viewer.height_ / 2)
        .scale(initial_scale);
      viewer.d3zoom.transform(view, initial_transform);

    } else {
      let scale = getScaleFromZ(viewer.cameraConfig.initialZ_)
      viewer.d3zoom.scaleTo(view, scale);
      viewer.d3zoom.translateTo(view,
        parseInt(viewer.center_[0]) + viewer.width_ / 2,
        parseInt(viewer.center_[1]) + viewer.height_ / 2);
      setCamera(viewer.center_[0], viewer.center_[1], viewer.cameraConfig.initialZ_)
    }

  }
  // end of event listeners

  /**
  * @typedef {Object} GridConfig
  * @property {number} raycasterThreshold - The threshold for raycasting grid cells. Its value represents the distance from the center of the cell's point object.
  * @property {number} pointSize - Three.js point size
  */
  /**
  *@description defines the configuration object which the viewer uses to paint grid cells
  *@function defineGridConfig
  *@returns {GridConfig} 
  */
  function defineGridConfig() {
    let config = {};
    config.raycasterThreshold = defineRaycasterThreshold();
    config.pointSize = definePointSize();
    return config;
  }

  /**
   * 
   * @description Defines the threshold for raycasting grid cells at the specified resolution. Value represents the distance from the center of the cell's point object.
   *@function defineRaycasterThreshold
   *
   */
  function defineRaycasterThreshold() {
    return viewer.resolution_;
  }

  /**
   * @description Defines the pointSize parameter for THREE.viewer.pointsLayer objects at the specified resolution
   * @function definePointSize
   *
   */
  function definePointSize() {
    return viewer.resolution_; //INVESTIGATE: why does threejs pointSize value not always correspond with the grid resolution?
  }

  /**
   * @description Define the far parameter for THREE.camera. The far parameter represents the furthest possible distance that the camera can be from the plane (where z=0)
   * @function defineFar
   */
  function defineFar() {
    if (viewer._mobile) {
      return 5; //due to a bug with pan & zoom, we have to scale everything on mobile
    } else {
      return viewer.resolution_ * 50000;
    }
  }

  /**
 * @description Define the near parameter for THREE.camera. The near parameter represents the smallest possible distance that the camera can be from the plane (where z=0)
 * @function defineNear
 */
  function defineNear() {
    if (viewer._mobile) {
      return 0.0001; //due to a bug with pan & zoom, we have to scale everything on mobile
    } else {
      return 0.01;
    }
  }



  /**
   * @function loadGrid
   * @description request grid, save it to the cache, define the scales used for colouring and sizing, then add the cells (points) to the scene
   * @param {Grid}
   */
  function loadGrid(grid) {
    Utils.showLoading();
    if (grid.cellSize) {
      requestGrid(grid).then(
        csv => {
          if (csv) {
            //validate csv
            if (csv[0].x && csv[0].y && csv[0][viewer.colorField_]) {
              viewer.cellCount = csv.length;

              //as a temporary hacky fix for d3's pan and zoom not working correctly on mobile devices, we scale the coordinates to a webgl-friendly range
              if (viewer._mobile) {
                let xDomain = extent(csv.map(c => parseFloat(c.x)));
                let yDomain = extent(csv.map(c => parseFloat(c.y)));
                let domain = [
                  min([xDomain, yDomain], array => min(array)),
                  max([xDomain, yDomain], array => max(array))
                ];
                viewer.mobileCoordScaleX = d3scale.scaleLinear().domain(domain).range([-1, 1]);
                viewer.mobileCoordScaleY = d3scale.scaleLinear().domain(domain).range([-1, 1]);
                //update cell sizes and raycaster to fit new webgl-friendly coords

                //distance between two neighbouring cell x values is the new resolution

                // to try to ensure the cells are neighbours, first we have to sort the points by X
                csv.sort(function (a, b) { return a.x - b.x });

                // then we use the first cell, and find the next cell with a distinct X value
                let x1 = csv[0].x;
                let x2;
                csv.some(function (cell) {
                  if (cell.x !== x1) {
                    x2 = cell.x;
                    return true;
                  }
                });

                //we then calculate the difference between two distinct X coordinates in mobile coords
                let difference = Math.abs(viewer.mobileCoordScaleX(x1) - viewer.mobileCoordScaleX(x2));
                difference = difference * 2;

                //giving us our new cell size
                let newResolution = difference;
                viewer.originalResolution = viewer.resolution_;
                viewer.resolution_ = newResolution;
                grid.cellSize = newResolution;
                gridConfig.pointSize = newResolution;
                gridConfig.raycasterThreshold = newResolution;
                raycaster.params.Points.threshold = newResolution;
                //scale center coords
                if (viewer.center_) {
                  viewer.center_[0] = viewer.mobileCoordScaleX(viewer.center_[0]);
                  viewer.center_[1] = viewer.mobileCoordScaleY(viewer.center_[1]);
                }

              }

              // add points to cache
              addGridToCache(csv, grid.cellSize);
            } else {
              return console.error(
                "Incorrect csv format. Please use coordinate columns with names 'x' and 'y'"
              );
            }

            // add HTMLElements to DOM
            addInitialElementsToDOM();
            // define viewer click, dropdown change and screen resize events
            addEventListeners();

            //define scales
            viewer.colorValuesExtent = extent(gridCaches[viewer.resolution_], d => parseFloat(d[viewer.colorField_]));
            viewer.colorScaleFunction_ = defineColorScale();
            if (viewer.sizeField_) {
              viewer.sizeValuesExtent = extent(gridCaches[viewer.resolution_], d => parseFloat(d[viewer.sizeField_]));
              viewer.sizeScaleFunction_ = defineSizeScale();
            }

            //coordinates extent
            //viewer.extentX = extent(gridCaches[viewer.resolution_], d => parseFloat(d.x));
            //viewer.extentY = extent(gridCaches[viewer.resolution_], d => parseFloat(d.y));

            // if center is not specified by user, move camera to a cell half way along the array
            if (!viewer.center_) {
              let index = parseInt(gridCaches[viewer.resolution_].length / 2);
              let c = gridCaches[viewer.resolution_][index];
              if (viewer._mobile) {
                viewer.center_ = [
                  viewer.mobileCoordScaleX(parseFloat(c.x)),
                  viewer.mobileCoordScaleY(parseFloat(c.y))
                ];
              } else {
                viewer.center_ = [
                  parseFloat(c.x),
                  parseFloat(c.y)
                ];
              }
            }

            // define pan & zoom
            addPanAndZoom();

            //add cells to viewer
            addPointsToScene();

            if (viewer.colorFieldSelector_) {
              createColorFieldDropdown();
            }
            if (viewer.sizeFieldSelector_) {
              createSizeFieldDropdown();
            }
          }

          Utils.hideLoading();
        },
        err => {
          Utils.hideLoading();
          alert(err)
        }
      );
    } else {
      console.error(
        "Please specify grid cell size in the units of its coordinate system"
      );
      Utils.hideLoading();
    }
  }

  /**
   * TODO: TILING: replace with requestTile() and addTileToCache() for CSVTiles endpoint
   * @function requestGrid
   * @description fetches csv file and adds the data to the cache
   * @param @param {"string"} [grid] URL of csv file
   * @returns {Promise}
   */
  function requestGrid(grid) {
    return csv(grid.url)
    // .on("progress", function (e) {
    //   //update progress bar
    //   if (event.lengthComputable) {
    //     var percentComplete = Math.round(event.loaded * 100 / event.total);
    //     console.log(percentComplete);
    //   }
    // });
  }

  /**
   * TODO: replace with addTileToCache()
   * @description adds the csv points to a cache object
   * @param {*} csv 
   * @param {*} res
   */
  function addGridToCache(csv, res) {
    if (csv) {
      if (viewer._mobile) {
        for (let i = 0; i < csv.length; i++) {
          //scale mobile coordinates to avoid d3 pan/zoom bug 
          let point = csv[i];
          point.x = viewer.mobileCoordScaleX(parseFloat(csv[i].x));
          point.y = viewer.mobileCoordScaleY(parseFloat(csv[i].y));
          if (!gridCaches[res]) gridCaches[res] = [];
          gridCaches[res].push(point);
        }
      } else {
        if (!gridCaches[res]) gridCaches[res] = csv
      }
    }
  }

  /**
   * 
   * @function defineColorScale
   * @description defines the initial color scale to be used when colouring grid cells
   *
   */
  function defineColorScale() {
    if (viewer.colors_ && viewer.thresholdValues_) {
      return d3scale
        .scaleThreshold()
        .domain(viewer.thresholdValues_)
        .range(viewer.colors_);
    } else {
      // assign default if user doesnt specify their own function
      if (!viewer.colorScaleFunction_) {
        let domain = viewer.colorValuesExtent;
        if (viewer.reverseColorScheme_) {
          domain = domain.reverse();
        }
        return d3scale[viewer.colorScaleName_](domain, d3scaleChromatic[viewer.colorSchemeName_]);
      } else {
        return viewer.colorScaleFunction_;
      }
    }
  }


  /**
 * 
 * @function updateColorScaleFunction
 * @description called when user selects a different colour scheme or scale function
 *
 */
  function updateColorScaleFunction() {
    let domain;
    if (viewer.colorScaleName_ == "scaleDiverging") {
      domain = [viewer.colorValuesExtent[0], 0, viewer.colorValuesExtent[1]];
    } else {
      domain = viewer.colorValuesExtent;
    }
    viewer.colorScaleFunction_ = d3scale[viewer.colorScaleName_](domain, d3scaleChromatic[viewer.colorSchemeName_]);
  }


  /**
* 
* @function updateColorScaleFunction
* @description called when user selects a different colour scheme or scale function
*
*/
  function updateSizeScaleFunction() {
    //create if didnt exist upon initialization
    if (!viewer.sizeValuesExtent) {
      viewer.sizeValuesExtent = extent(gridCaches[viewer.resolution_], d => parseFloat(d[viewer.sizeField_]));
      viewer.sizeScaleFunction_ = defineSizeScale();
    } else {
      //update
      let domain = viewer.sizeValuesExtent;
      viewer.sizeScaleFunction_ = d3scale[viewer.sizeScaleName_]().domain(domain).range([viewer.resolution_ / 3, viewer.resolution_ / 1.5]);
    }
  }

  /**
* 
* @function defineSizeScale
* @description define initial scale function to be used when determining cell size
*
*/
  function defineSizeScale() {
    // user-defined vs default scale
    if (viewer.sizeScaleFunction_) {
      return viewer.sizeScaleFunction_;
    } else {
      return d3scale[viewer.sizeScaleName_]().domain(viewer.colorValuesExtent).range([viewer.resolution_ / 3, viewer.resolution_ / 1.5]); //minSize, maxSize
    }
  }

  /**
   * @description request nuts2json file then add it to the scene
   * @function loadNuts2json
   * @param {String} url of nuts2json file
   */
  function loadNuts2json(url) {
    json(url).then(
      json => {
        let newArray;
        if (viewer.nutsCountry_) {
          newArray = json.objects.nutsrg.geometries.filter((v, i) => {
            return v.properties.id.indexOf(viewer.nutsCountry_) !== -1; //apply user-defined filter
          });
        } else {
          newArray = json.objects.nutsrg.geometries.filter((v, i) => {
            return v.properties.id !== "TR"; //omit Turkey
          });
        }
        json.objects.nutsbn.geometries = newArray;
        //topojson to geojson
        let features = feature(json, json.objects.nutsbn).features;
        //add line geometries to viewer
        addNuts2jsonToScene(features, true);
      },
      err => {
        console.error(err);
      }
    );
  }

  /**
   * @description Create THREE.Group and append line geometries from nuts2json features
   * @function addNuts2jsonToScene
   * @param {Array} features geojson feature array
   *
   */
  function addNuts2jsonToScene(features) {
    geojson.addGeoJsonToScene(features, viewer);
  }

  /**
   * 
   * @description Function exposed to user for adding geojson files to the viewer
   * @param {String} url URL of geojson file to be added
   * @function addGeoJson
   */
  viewer.addGeoJson = function (url) {
    json(url).then(
      res => {
        if (res.features) {
          if (res.features.length > 0) {
            geojson.addGeoJsonToScene(res.features, viewer);
          }
        }
      },
      err => {
        console.error(err);
      }
    );
  }




  function updateColorScale() {
    updateColorScaleFunction();
  }
  function updateSizeScale() {
    updateSizeScaleFunction();
  }

  /**
   * @description rebuilds array of point colours
   * @function updatePointsColors
   */
  function updatePointsColors() {
    let colors = [];
    for (var i = 0; i < gridCaches[viewer.resolution_].length; i++) {
      let hex = viewer.colorScaleFunction_(gridCaches[viewer.resolution_][i][viewer.colorField_]); //d3 scale-chromatic
      if (hex == "rgb(NaN, NaN, NaN)") {
        hex = "#000"; //fallback to black
      }
      gridCaches[viewer.resolution_][i].color = hex; //for tooltip
      let color = new Color(hex);
      if (color) colors.push(color.r, color.g, color.b);
    }
    //update colors
    pointsGeometry.setAttribute(
      "color",
      new Float32BufferAttribute(colors, 3)
    );
    pointsGeometry.computeBoundingSphere();
    viewer.pointsLayer.geometry = pointsGeometry;
  }

  /**
   * @description rebuilds array which stores point sizes
   * @function updatePointsSizes
   */
  function updatePointsSizes() {
    let sizes = [];
    for (var i = 0; i < gridCaches[viewer.resolution_].length; i++) {
      if (viewer.sizeField_ && viewer.sizeField_ !== "null") {
        sizes.push(viewer.sizeScaleFunction_(gridCaches[viewer.resolution_][i][viewer.sizeField_]));
      } else {
        sizes.push(gridConfig.pointSize);
      }
    }
    //update sizes
    pointsGeometry.setAttribute("size", new Float32BufferAttribute(sizes, 1));
    pointsGeometry.computeBoundingSphere();
    viewer.pointsLayer.geometry = pointsGeometry;
  }

  /**
   * @description create or update THREE.js viewer.pointsLayer layer. At the moment, only ONE viewer.pointsLayer layer at a time is handled by the viewer, so a second call of gridviz.gridData() will overwrite the initial layer
   * @function addPointsToScene
   */
  function addPointsToScene() {
    //threejs recommends using BufferGeometry instead of Geometry for performance
    /*   indices = [0, 1, 2, 0, 2, 3];
  bufferGeometry.setIndex(new THREE.BufferAttribute(new Uint16Array(indices), 1));  */
    if (!pointsGeometry) {
      pointsGeometry = new BufferGeometry();
    }

    let colors = [];
    let positions = [];
    let sizes = [];

    for (var i = 0; i < gridCaches[viewer.resolution_].length; i++) {
      // Set vector coordinates from data
      let coords = [
        gridCaches[viewer.resolution_][i].x,
        gridCaches[viewer.resolution_][i].y
      ];
      let x = parseFloat(coords[0]);
      let y = parseFloat(coords[1]);
      let z = CONSTANTS.point_z;
      let indicator = gridCaches[viewer.resolution_][i][viewer.colorField_];
      let hex = viewer.colorScaleFunction_(parseFloat(indicator)); //d3 scale-chromatic
      if (hex == "rgb(NaN, NaN, NaN)") {
        hex = "#000"; //fallback to black
      }
      gridCaches[viewer.resolution_][i].color = hex; //for tooltip
      let color = new Color(hex);

      if (!isNaN(x) && !isNaN(y)) {
        positions.push(x, y, z);
        if (!isNaN(color.r) && !isNaN(color.g) && !isNaN(color.b)) {
          colors.push(color.r, color.g, color.b);
        } else {
          let blk = new Color("#000");
          colors.push(blk.r, blk.g, blk.b)
        }
        if (viewer.sizeField_) {
          sizes.push(viewer.sizeScaleFunction_(gridCaches[viewer.resolution_][i][viewer.sizeField_]));
        } else {
          sizes.push(gridConfig.pointSize);
        }
      }
    } //fin loop

    //set buffer geometry attributes
    pointsGeometry.setAttribute(
      "position",
      new Float32BufferAttribute(positions, 3)
    );
    pointsGeometry.setAttribute(
      "color",
      new Float32BufferAttribute(colors, 3)
    );
    //Variable point size will affect raycasting: https://github.com/mrdoob/three.js/issues/5105
    pointsGeometry.setAttribute("size", new Float32BufferAttribute(sizes, 1));
    pointsGeometry.computeBoundingSphere();
    //create or reuse viewer.pointsLayer Material
    if (!pointsMaterial) {
      // Apply custom point sizes, instead of using three.js pointsMaterial
      pointsMaterial = new ShaderMaterial({
        uniforms: {
          multiplier: {
            value: 1050 //km TODO: define dynamically. the extra meters prevent white lines across the screen flickering when zooming
          }
        },
        fragmentShader: fragmentShader(),
        vertexShader: vertexShader(),
        vertexColors: THREE.VertexColors
      });

      //use threejs PointsMaterial instead:
      // pointsMaterial = new PointsMaterial({
      //   size: gridConfig.pointSize * 2, // when using three.js attenuation we have to multiply the cellSize by 2
      //   sizeAttenuation: true,
      //   //https://github.com/mrdoob/three.js/blob/master/src/constants.js
      //   vertexColors: THREE.VertexColors
      // });

    } else {
      pointsMaterial.size = gridConfig.pointSize;
    }
    //create or reuse viewer.pointsLayer object
    if (!viewer.pointsLayer) {
      viewer.pointsLayer = new Points(pointsGeometry, pointsMaterial);
      viewer.pointsLayer.renderOrder = 1; //bottom
      viewer.scene.add(viewer.pointsLayer);
    } else {
      viewer.pointsLayer.geometry = pointsGeometry;
      viewer.pointsLayer.material = pointsMaterial;
    }
    //create or update legend
    if (viewer.showLegend_) {
      if (viewer.legend_) {
        if (viewer._gridLegend) {
          legend.updateLegend(viewer);
        } else {
          legend.createLegend(viewer);
        }
      }
    }

    Utils.hideLoading();
    if (!viewer.animating) {
      animate();
    }

  }

  /**
  * @description WebGL - Shader stage that will process a Fragment generated by the Rasterization into a set of colors and a single depth value
  * @function fragmentShader
  */
  function fragmentShader() {
    return `
  varying vec3 vColor;

  void main() {
    gl_FragColor = vec4( vColor.rgb, 1.0 );
  }
`;
  }

  /**
  * @description WebGL - shader stage in the rendering pipeline that handles the processing of individual vertices
  * @function vertexShader
  */
  function vertexShader() {
    return `
  uniform float multiplier;
  attribute float size;
  float scale;
  varying vec3 vColor;

  void main() {
    vColor = color;

    // mvPosition represents the vertex position in view space (model-view-position). It’s usually calculated like so:
    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );

    // manual 'point attenuation' attempt because threejs attenuation doesnt coincide with real world cellSize 
    // (e.g. 1000 for 1km grid leaves space between cells)...
    // this method works well on mobile & desktop, but not when appending the renderer to a container
    gl_PointSize = size * (multiplier / -mvPosition.z ); 

    // threejs attenuation (attenuation: true in pointer material)...
    // does this: gl_PointSize *= ( scale / - mvPosition.z );
    // works well in containers & desktop, but not mobile
    // gl_PointSize = size;

    //set position:
    gl_Position = projectionMatrix * mvPosition;
  }
`;
  }

  /**
   * @description Creates an HTML Select element for the different D3 Scale-Chromatic functions
   * @function createColorSchemeDropdown
   */
  function createColorSchemeDropdown() {
    let schemes = [
      {
        value: "interpolateBrBG",
        innerText: "Brown-blue-green"
      },
      {
        value: "interpolatePRGn",
        innerText: "Purple-green"
      },
      {
        value: "interpolatePiYG",
        innerText: "Pink-green"
      },
      {
        value: "interpolatePuOr",
        innerText: "Purple-orange"
      },
      {
        value: "interpolateRdBu",
        innerText: "Red-blue"
      },
      {
        value: "interpolateRdGy",
        innerText: "Red-grey"
      },
      {
        value: "interpolateRdYlBu",
        innerText: "Red-yellow-blue"
      },
      {
        value: "interpolateRdYlGn",
        innerText: "Red-yellow-green"
      },
      {
        value: "interpolateSpectral",
        innerText: "Spectral"
      },
      {
        value: "interpolateBlues",
        innerText: "Blues"
      },
      {
        value: "interpolateGreens",
        innerText: "Greens"
      },
      {
        value: "interpolateGreys",
        innerText: "Greys"
      },
      {
        value: "interpolateOranges",
        innerText: "Oranges"
      },
      {
        value: "interpolatePurples",
        innerText: "Purples"
      },
      {
        value: "interpolateReds",
        innerText: "Reds"
      },
      {
        value: "interpolateTurbo",
        innerText: "Turbo"
      },
      {
        value: "interpolateViridis",
        innerText: "Viridis"
      },
      {
        value: "interpolateInferno",
        innerText: "Inferno"
      },
      {
        value: "interpolateMagma",
        innerText: "Magma"
      },
      {
        value: "interpolatePlasma",
        innerText: "Plasma"
      },
      {
        value: "interpolateCividis",
        innerText: "Cividis"
      },
      {
        value: "interpolateWarm",
        innerText: "Warm"
      },
      {
        value: "interpolateCool",
        innerText: "Cool"
      },
      {
        value: "interpolateCubehelixDefault",
        innerText: "CubehelixDefault"
      },
      {
        value: "interpolateBuGn",
        innerText: "Blue-green"
      },
      {
        value: "interpolateBuPu",
        innerText: "Blue-purple"
      },
      {
        value: "interpolateGnBu",
        innerText: "Green-blue"
      },
      {
        value: "interpolateOrRd",
        innerText: "Orange-red"
      },
      {
        value: "interpolatePuBuGn",
        innerText: "Purple-blue-green"
      },
      {
        value: "interpolatePuBu",
        innerText: "Purple-blue"
      },
      {
        value: "interpolatePuRd",
        innerText: "Purple-red"
      },
      {
        value: "interpolateRdPu",
        innerText: "Red-purple"
      },
      {
        value: "interpolateYlGnBu",
        innerText: "Yellow-green-blue"
      },
      {
        value: "interpolateYlGn",
        innerText: "Yellow-green"
      },
      {
        value: "interpolateYlOrBr",
        innerText: "Yellow-orange-brown"
      },
      {
        value: "interpolateYlOrRd",
        innerText: "Yellow-orange-red"
      },
      {
        value: "interpolateRainbow",
        innerText: "Rainbow"
      },
      {
        value: "interpolateSinebow",
        innerText: "Sinebow"
      }
    ];
    let dropdown_container = document.createElement("div");
    dropdown_container.id = "gridviz-colorscheme-dropdown-container";
    dropdown_container.classList.add("gridviz-dropdown");
    viewer.schemesSelect = document.createElement("select");
    viewer.schemesSelect.id = "schemes";
    viewer.schemesSelect.classList.add("gridviz-select");
    let label = document.createElement("label");
    label.for = "schemes";
    label.classList.add("gridviz-dropdown-label");
    label.innerText = "Colour scheme: ";

    for (let i = 0; i < schemes.length; i++) {
      let scheme = schemes[i];
      let option = document.createElement("option");
      option.value = scheme.value;
      option.innerText = scheme.innerText;
      viewer.schemesSelect.appendChild(option);
    }
    viewer.schemesSelect.value = viewer.colorSchemeName_;
    dropdown_container.appendChild(label);
    dropdown_container.appendChild(viewer.schemesSelect);
    viewer.selectorsContainer.appendChild(dropdown_container);
  }


  /**
   * Creates an HTML Select element for the different D3 Scale functions used to generate the colours
   * Accepted: scaleSequential or scaleDiverging & their respective variants
   */
  function createColorScaleDropdown() {
    let scales = [
      {
        value: "scaleSequential",
        innerText: "Sequential"
      },
      {
        value: "scaleSequentialLog",
        innerText: "Sequential logarithmic"
      },
      {
        value: "scaleSequentialPow",
        innerText: "Sequential exponential"
      },
      {
        value: "scaleSequentialSqrt",
        innerText: "Sequential square-root "
      },
      {
        value: "scaleSequentialQuantile",
        innerText: "Sequential quantile"
      },
    ];
    let dropdown_container = document.createElement("div");
    dropdown_container.id = "gridviz-colorscale-dropdown-container";
    dropdown_container.classList.add("gridviz-dropdown");
    viewer.colorScaleSelect = document.createElement("select");
    viewer.colorScaleSelect.classList.add("gridviz-select");
    viewer.colorScaleSelect.id = "scales";
    let label = document.createElement("label");
    label.for = "scales";
    label.classList.add("gridviz-dropdown-label");
    label.innerText = viewer.colorScaleSelectorLabel_;

    for (let i = 0; i < scales.length; i++) {
      let scale = scales[i];
      let option = document.createElement("option");
      option.value = scale.value;
      option.innerText = scale.innerText;
      viewer.colorScaleSelect.appendChild(option);
    }
    viewer.colorScaleSelect.value = viewer.colorScaleName_;
    dropdown_container.appendChild(label);
    dropdown_container.appendChild(viewer.colorScaleSelect);
    viewer.selectorsContainer.appendChild(dropdown_container);
    addChangeEventToColorScaleDropdown();
  }

  /**
  * Creates an HTML Select element which allows the user to select the csv field used for colouring(colorField)
  *
  */
  function createColorFieldDropdown() {
    let dropdown_container = document.createElement("div");
    dropdown_container.id = "gridviz-colorfield-dropdown-container";
    dropdown_container.classList.add("gridviz-dropdown");
    viewer.colorFieldSelect = document.createElement("select");
    viewer.colorFieldSelect.classList.add("gridviz-select");
    viewer.colorFieldSelect.id = "colorFields";
    let label = document.createElement("label");
    label.for = "colorFields";
    label.classList.add("gridviz-dropdown-label");
    label.innerText = viewer.colorFieldSelectorLabel_;

    let fields = Object.keys(gridCaches[viewer.resolution_][0]);
    for (let i = 0; i < fields.length; i++) {
      let field = fields[i];
      if (field.toLowerCase() !== "x" && field.toLowerCase() !== "y" && field !== "color") {
        let option = document.createElement("option");
        option.value = field;
        option.innerText = field;
        viewer.colorFieldSelect.appendChild(option);
      }
    }
    viewer.colorFieldSelect.value = viewer.colorField_;
    dropdown_container.appendChild(label);
    dropdown_container.appendChild(viewer.colorFieldSelect);
    viewer.selectorsContainer.appendChild(dropdown_container);
    addChangeEventToColorFieldDropdown();
  }


  /**
  * Creates an HTML Select element which allows the user to select the csv field used for sizing the cells (sizeField)
  *
  */
  function createSizeFieldDropdown() {
    let dropdown_container = document.createElement("div");
    dropdown_container.id = "gridviz-sizefield-dropdown-container";
    dropdown_container.classList.add("gridviz-dropdown");
    viewer.sizeFieldSelect = document.createElement("select");
    viewer.sizeFieldSelect.classList.add("gridviz-select");
    viewer.sizeFieldSelect.id = "sizeFields";
    let label = document.createElement("label");
    label.for = "sizeFields";
    label.classList.add("gridviz-dropdown-label");
    label.innerText = viewer.sizeFieldSelectorLabel_;

    let fields = Object.keys(gridCaches[viewer.resolution_][0]);
    for (let i = 0; i < fields.length; i++) {
      let field = fields[i];
      if (field.toLowerCase() !== "x" && field.toLowerCase() !== "y" && field !== "color") {
        let option = document.createElement("option");
        option.value = field;
        option.innerText = field;
        viewer.sizeFieldSelect.appendChild(option);
      }
    }
    //option for not using sizing
    let option = document.createElement("option");
    option.value = null;
    option.innerText = "none";
    viewer.sizeFieldSelect.appendChild(option);
    //set initial value
    viewer.sizeFieldSelect.value = viewer.sizeField_;
    dropdown_container.appendChild(label);
    dropdown_container.appendChild(viewer.sizeFieldSelect);
    viewer.selectorsContainer.appendChild(dropdown_container);
    addChangeEventToSizeFieldDropdown()
  }

  /** 
  * @description Three.js render loop
  * @function animate
  * 
  */
  function animate() {
    //let time = Date.now() * 0.005;
    //viewer.pointsLayer.position.x = 0.02 * time;
    viewer.animating = true;
    requestAnimationFrame(animate);
    viewer.renderer.render(viewer.scene, viewer.camera);
    viewer.labelRenderer.render(viewer.scene, viewer.camera);
  }

  /**
   * @description Defines zoom functionality using d3.js
   * @function addPanAndZoom
   * 
   */
  function addPanAndZoom() {
    // define zoom
    //where [x0, y0] is the top-left corner of the world and [x1, y1] is the bottom-right corner of the world
    let farScale = getScaleFromZ(viewer.cameraConfig.far_);
    let nearScale = getScaleFromZ(viewer.cameraConfig.near_);
    viewer.d3zoom =
      zoom()
        .scaleExtent([farScale, nearScale])
        .extent([[0, 0], [viewer.width_, viewer.height_]])
        .on("zoom", (event) => {
          // let event = currentEvent;
          if (viewer._mobile) {
            if (event) zoomHandlerMobile(event);
          } else {
            if (event) zoomHandler(event);
          }
        })
        .on("end", (event) => {
          //let event = currentEvent;
          if (event) zoomEnd(event);
        });

    view.call(viewer.d3zoom);

    if (viewer._mobile) {
      //due to a bug on mobile, where the camera shifts unexpectedly on the first pan or zoom event, we have to scale everything to a webgl-friendly range and set the camera to 0,0
      let initial_scale = getScaleFromZ(viewer.cameraConfig.initialZ_);
      var initial_transform = zoomIdentity.translate(viewer.width_ / 2, viewer.height_ / 2).scale(initial_scale);
      viewer.d3zoom.transform(view, initial_transform);
      setCamera(0, 0, viewer.cameraConfig.initialZ_)

    } else {
      //initial desktop zoom transform
      let scale = getScaleFromZ(viewer.cameraConfig.initialZ_)
      viewer.d3zoom.scaleTo(view, scale);
      viewer.d3zoom.translateTo(view,
        parseInt(viewer.center_[0]) + viewer.width_ / 2,
        parseInt(viewer.center_[1]) + viewer.height_ / 2);
      setCamera(viewer.center_[0], viewer.center_[1], viewer.cameraConfig.initialZ_)
    }
  }

  function zoomHandlerMobile(event) {
    if (event.sourceEvent) {
      let scale = event.transform.k;
      let x = -(event.transform.x - viewer.width_ / 2) / scale;
      let y = (event.transform.y - viewer.height_ / 2) / scale;
      let z = getZFromScale(scale);
      setCamera(x, y, z);
    }
  }

  function zoomHandler(event) {
    let scale = event.transform.k;
    if (event.sourceEvent) {
      let new_z = getZFromScale(scale);
      //if zoom
      if (new_z !== viewer.camera.position.z) {
        // Handle a zoom event
        const { clientX, clientY } = event.sourceEvent;
        // Code from WestLangley https://stackoverflow.com/questions/13055214/mouse-canvas-x-y-to-three-js-world-x-y-z/13091694#13091694
        const vector = new Vector3(
          (clientX / viewer.width_) * 2 - 1,
          -(clientY / viewer.height_) * 2 + 1,
          1
        );
        vector.unproject(viewer.camera);
        const dir = vector.sub(viewer.camera.position).normalize();
        const distance = (new_z - viewer.camera.position.z) / dir.z;
        const pos = viewer.camera.position.clone().add(dir.multiplyScalar(distance));
        // Set the camera to new coordinates
        setCamera(pos.x, pos.y, new_z);
      } else {
        // If panning
        const { movementX, movementY } = event.sourceEvent;

        // Adjust mouse movement by current scale and set camera
        const current_scale = getScaleFromZ(viewer.camera.position.z);
        setCamera(
          viewer.camera.position.x - movementX / current_scale,
          viewer.camera.position.y + movementY / current_scale,
          viewer.camera.position.z
        );
      }
    }
  }

  function getScaleFromZ(z) {
    let half_fov = viewer.cameraConfig.fov_ / 2;
    let half_fov_radians = toRadians(half_fov);
    let half_fov_height = Math.tan(half_fov_radians) * z;
    let fov_height = half_fov_height * 2;
    let scale = viewer.height_ / fov_height; // Divide visualization height by height derived from field of view
    return scale;
  }

  function getZFromScale(scale) {
    let half_fov = viewer.cameraConfig.fov_ / 2;
    let half_fov_radians = toRadians(half_fov);
    let scale_height = viewer.height_ / scale;
    let camera_z_position = scale_height / (2 * Math.tan(half_fov_radians));
    return camera_z_position;
  }

  function zoomEnd(event) {
    tooltip.hideTooltip();
    let scale = getScaleFromZ(event.transform.k);
    if (viewer.debugPlacenames_) {
      console.info(scale);
    }
    // get placenames at certain zoom levels
    if (viewer.showPlacenames_) {
      if (viewer.pointsLayer) {
        if (scale > 0 && scale < viewer.cameraConfig.far_) {
          //placenames are added to the viewer.pointsLayer object
          placenames.getPlacenames(viewer);
        } else {
          placenames.removePlacenamesFromScene(viewer);
        }
      }
    }

    //change nuts simplification (or not) based on current scale
    //URL themes: 2016/3035/20M/0.json
    // if (viewer.nuts_) {
    //   if (
    //     scale < CONSTANTS.nuts_scale_threshold &&
    //     viewer.nutsSimplification_ !== "10M"
    //   ) {
    //     viewer.nutsSimplification_ = "10M";
    //     loadNuts2json(
    //       CONSTANTS.nuts_base_URL +
    //       viewer.EPSG_ +
    //       "/" +
    //       viewer.nutsSimplification_ +
    //       "/" + viewer.nutsLevel_ + ".json"
    //     );
    //   } else if (
    //     scale > CONSTANTS.nuts_scale_threshold &&
    //     viewer.nutsSimplification_ !== "20M"
    //   ) {
    //     viewer.nutsSimplification_ = "20M";
    //     loadNuts2json(
    //       CONSTANTS.nuts_base_URL +
    //       viewer.EPSG_ +
    //       "/" +
    //       viewer.nutsSimplification_ +
    //       "/" + viewer.nutsLevel_ + ".json"
    //     );
    //   }
    // }
  }




  function toRadians(angle) {
    return angle * (Math.PI / 180);
  }

  function mouseToThree(mouseX, mouseY) {
    return new Vector3(
      (mouseX / viewer.width_) * 2 - 1,
      -(mouseY / viewer.height_) * 2 + 1,
      0.5
    );
  }

  function checkIntersects(mouse_position) {
    let mouse_vector = mouseToThree(...mouse_position);
    raycaster.setFromCamera(mouse_vector, viewer.camera);
    let intersects = raycaster.intersectObject(viewer.pointsLayer);
    if (intersects[0]) {
      let sorted_intersects = sortIntersectsByDistanceToRay(intersects);
      let intersect = sorted_intersects[0];
      return intersect;
    } else {
      return false;

    }
  }

  function sortIntersectsByDistanceToRay(intersects) {
    return intersects.concat().sort(sortBy("distanceToRay"));
  }

  //native replication of lodash's "sortBy"
  const sortBy = (key) => {
    return (a, b) => (a[key] > b[key]) ? 1 : ((b[key] > a[key]) ? -1 : 0);
  };

  function highlightPoint(intersect) {
    //removeHighlights();

    let colors = intersect.object.geometry.attributes.color.array;

    //reset previous intersect colours back to their original values
    if (previousIntersect) {
      colors[previousIntersect.colourIndex] = previousIntersect.color.r;
      colors[previousIntersect.colourIndex + 1] = previousIntersect.color.g;
      colors[previousIntersect.colourIndex + 2] = previousIntersect.color.b;
    }

    //position in geometry colour attribute float32Array
    let colourIndex = intersect.index * 3
    let r = colors[colourIndex];
    let g = colors[colourIndex + 1];
    let b = colors[colourIndex + 2];

    previousIntersect = {
      colourIndex: colourIndex,
      color: { r: r, g: g, b: b }
    }

    //highlight
    let newColor = new Color(viewer.highlightColor_);
    colors[colourIndex] = newColor.r;
    colors[colourIndex + 1] = newColor.g;
    colors[colourIndex + 2] = newColor.b;

    intersect.object.geometry.attributes.color.needsUpdate = true;

  }




  /**
   * Used for 'turning objects on and off'
   *
   * @param {*} object
   */
  function hideObject(object) {
    object.traverse(function (child) {
      if (child instanceof Points) {
        child.visible = false;
      }
    });
  }



  return viewer;
}
