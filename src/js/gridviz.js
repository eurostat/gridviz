// d3.js
import { zoom, zoomIdentity } from "d3-zoom";
import * as d3scaleChromatic from "d3-scale-chromatic";
import * as d3scale from "d3-scale";
import { axisBottom } from "d3-axis";
import { interpolateRound } from "d3-interpolate";
import { json, csv } from "d3-fetch";
import { format } from "d3-format";
import { extent, range, quantile } from "d3-array";
import { select, create, selectAll, mouse } from "d3-selection";
import { event as currentEvent } from 'd3-selection';
import * as LEGEND from "d3-svg-legend";
//three.js
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  Points,
  Vector3,
  Color,
  Raycaster,
  Object3D,
  Float32BufferAttribute,
  BufferGeometry,
  Group,
  ShaderMaterial

} from "three";
import * as THREE from "three/src/constants";
// extra Three.js modules not included in main threejs build
import { Line2 } from "./lib/threejs/lines/Line2";
import { LineGeometry } from "./lib/threejs/lines/LineGeometry";
import { LineMaterial } from "./lib/threejs/lines/LineMaterial";
import { CSS2DRenderer, CSS2DObject } from "./lib/threejs/CSS2D/CSS2DRenderer";
// for loading NUTS2json 
import { feature } from "topojson";
import * as CONSTANTS from "./constants.js";
import * as Utils from "./utils";


//TODO list:
//

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
  viewer.backgroundColor_ = "#b7b7b7";
  viewer.borderColor_ = "#ffffff";
  viewer.highlightColor_ = "#37f2d6"
  viewer.loadingIcon_ = "ring"; //ripple | ring | ellipsis | roller

  // https://d3-legend.susielu.com vs https://blog.scottlogic.com/2019/03/13/how-to-create-a-continuous-colour-range-legend-using-d3-and-d3fc.html
  viewer.showLegend_ = true;
  // legend config
  viewer.legend_ = {
    type: "continuous", //cells vs continuous
    width: 440,
    height: null,
    orientation: "vertical",
    title: "Legend",
    titleWidth: 50,
    format: ".0s",
    cells: 13,
    shapeWidth: 30
  };
  viewer.gridLegend; //legend stored here

  //d3 Scale stuff
  viewer.colorSchemeName_ = "interpolateTurbo";
  viewer.sizeScaleName_ = "scaleSqrt";
  viewer.colorScaleName_ = "scaleSequentialSqrt";
  viewer._defaultColorScaleFunction = d3scale[viewer.colorScaleName_];
  viewer._defaultSizeScaleFunction = d3scale[viewer.sizeScaleName_];
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

  // placenames
  viewer.showPlacenames_ = false;
  viewer.placenamesEPSG_ = 3035; //used to determine grid rendering; placenames;
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
  viewer.homeButton_ = true;

  //borders using nuts2json
  viewer.nuts2json_ = false; //show topojson borders of europe (available in 3035; 3857, 4258 or 4326)
  viewer.nuts2jsonEPSG_ = 3035;
  viewer.nuts2jsonCountry_ = false; // only show borders of given country code
  viewer.nutsLevel_ = 0;
  viewer.nutsSimplification_ = "20M"; //current nuts2json simplification

  // grid data
  /**
 * @typedef {Object} Grid
 * @property {number} url - URL of the csv file to retrieve
 * @property {number} cellSize - Size of the cell in the same unit system as the coordinates. e.g 1 km² grid in EPSG:3035 with zerosRemoved set to 3 has a cellSize of 1 (without the zerosRemoved it would be 1000)
 */
  viewer.gridData_ = null; // type:Grid
  viewer.resolution_ = null; //current grid resolution. e.g. 5000 for EPSG:3035 5km grid

  //camera
  viewer.camera = {}
  viewer.camera.near_ = null;
  viewer.camera.far_ = null; //set min zoom
  viewer.camera.fov_ = null;
  viewer.camera.aspect_ = null;
  viewer.zoom_ = null; //initial camera position Z

  //three.js scene
  viewer.scene = null;
  viewer.animating = false;

  // remaining variables
  let lineMaterial,
    boundariesGroup, //THREE.Group for nuts borders
    pointsMaterial,
    pointsGeometry,
    camera,
    raycaster,
    pointsLayer,
    previousIntersect,
    tooltipContainer,
    tooltipTemplate,
    tooltip,
    pointTip,
    labelTip,
    view,
    labelRenderer,
    renderer;

  let tooltip_state = {
    display: "none"
  };
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
    if (viewer.gridLegend) {
      updateLegend()
    }
    return viewer;
  };

  //if gridData has already been added, this function now overwrites the gridData currently in the viewer.
  viewer.gridData = function (v) {
    if (v && pointsLayer) {
      viewer.gridData_ = v;
      viewer.resolution_ = v[0].cellSize
      gridConfig = defineGridConfig();

      if (viewer.showPlacenames_) {
        removePlacenamesFromScene(); //clear labels
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
    if (v && viewer.scene) {
      viewer.center_ = v;
      redefineCamera();
      setCamera(v[0], v[1], camera.position.z)
    } else {
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
      setCamera(camera.position.x, camera.position.y, v); // Set camera zoom (z position)
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
        viewer.width_ = viewer.container_.clientWidth
      }
      if (!viewer.height_) {
        if (viewer.container_.clientHeight == "0") {
          //if container element has no defined height, use screen height
          viewer.height_ = window.innerHeight;
        } else {
          viewer.height_ = viewer.container_.clientHeight
        }


      }
      //force viewer width to be the same as the container width
      if (viewer.width_ != viewer.container_.clientWidth) {
        viewer.width_ = viewer.container_.clientWidth;
      }

      //mobile logic
      if (/Mobi|Android/i.test(navigator.userAgent)) {
        viewer._mobile = true;
        // saving screen space...
        viewer.sourcesHTML_ = null
        viewer.sizeFieldSelector_ = false;
        viewer.colorFieldSelector_ = false;
        viewer.colorScaleSelector_ = false;
        viewer.colorSchemeSelector_ = false;
        if (viewer.legend_ && viewer.legend_.type == "continuous") {
          viewer.legend_.width = window.screen.width - 10; //margin
          viewer.legend_.height = 50;
        }
      }

      Utils.createLoadingSpinner(viewer.container_, viewer.loadingIcon_);

      //set container height and width
      viewer.container_.classList.add("gridviz-container");

      //set viewer resolution
      if (!viewer.resolution_) {
        viewer.resolution_ = viewer.gridData_[0].cellSize
      }
      gridConfig = defineGridConfig();

      // three.js initializations
      createScene();
      if (!labelRenderer) createLabelRenderer();
      if (!renderer) createWebGLRenderer();

      createCamera();
      createRaycaster();

      // define pan & zoom
      // if (viewer._mobile) {
      //   addMobilePanAndZoom()
      // } else {
      addPanAndZoom();
      // }

      // tooltip DOM element
      createTooltipContainer();

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
      if (viewer.nuts2json_) {
        loadNuts2json(
          CONSTANTS.nuts_base_URL +
          viewer.nuts2jsonEPSG_ +
          "/" +
          viewer.nutsSimplification_ +
          "/" + viewer.nutsLevel_ + ".json"
        );
      }

      //request initial placenames
      // view.transition().call(viewer.zoom.scaleBy, 1.000001); //sets initial scale properly (otherwise it starts as 0.0something)
      // let scale = getScaleFromZ(camera.position.z);
      if (viewer.showPlacenames_) {
        getPlacenames(camera.position.z);
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
    renderer = new WebGLRenderer();
    if (viewer._mobile) {
      renderer.setPixelRatio(window.devicePixelRatio);
    }

    renderer.setSize(viewer.width_, viewer.height_);
    viewer.container_.appendChild(renderer.domElement);
    view = select(renderer.domElement); //for d3 mouse events
  }

  /**
   * @description Creates renderer for placename labels. Uses CSS2DRenderer which is not currently included in main Three.js build
   *@function createLabelRenderer
   */
  function createLabelRenderer() {
    labelRenderer = new CSS2DRenderer();
    labelRenderer.setSize(viewer.width_, viewer.height_);
    labelRenderer.domElement.style.position = "absolute";
    //labelRenderer.domElement.style.top = "0px";
    viewer.container_.appendChild(labelRenderer.domElement);
  }

  /**
   * @description Initializes THREE camera object
   * @function createCamera
   */
  function createCamera() {
    //camera
    viewer.camera.near_ = CONSTANTS.near;
    viewer.camera.far_ = defineFar(); //set min zoom
    viewer.camera.fov_ = CONSTANTS.fov;
    viewer.camera.aspect_ = viewer.width_ / viewer.height_;
    viewer.camera.initialZ_ = viewer.camera.far_ / 2 - 1
    viewer.camera.zoom_ = viewer.zoom_ || viewer.camera.initialZ_; //initial camera position Z
    camera = new PerspectiveCamera(
      viewer.camera.fov_,
      viewer.camera.aspect_,
      viewer.camera.near_,
      viewer.camera.far_
    );

    if (!viewer.center_) {
      setCamera(0, 0, viewer.camera.initialZ_)
    } else {
      setCamera(viewer.center_[0], viewer.center_[1], viewer.camera.initialZ_)
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
  }

  /**
  * @description Updates camera configuration. Called when user adds grid data, changes zoom, or changes center after initialization
  * @function redefineCamera
  */
  function redefineCamera() {
    viewer.camera.near_ = CONSTANTS.near;
    viewer.camera.far_ = defineFar(); //set min zoom
    viewer.camera.fov_ = CONSTANTS.fov;
    viewer.camera.aspect_ = viewer.width_ / viewer.height_;
    viewer.camera.zoom_ = viewer.zoom_ || viewer.camera.far_ / 2 - 1; //initial camera position Z

    camera.fov = viewer.camera.fov_;
    camera.aspect = viewer.camera.aspect_;
    camera.near = viewer.camera.near_;
    camera.far = viewer.camera.far_;

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
    camera.position.set(x, y, z); // Set camera position
    camera.lookAt(new Vector3(x, y, z)); // Set camera angle
  }

  /**
   * @description Initializes THREE.Raycaster object
   * @function createRaycaster
   */
  function createRaycaster() {
    // Click and tooltip interaction
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
 * Add change event to color-scheme selector
 *
 */
  function addChangeEventToColorSchemeDropdown() {
    viewer.schemesSelect.addEventListener("change", function (e) {
      onChangeColorScheme(e.currentTarget.value);
    });
  }

  /**
  * Color scheme dropdown event handler
  *
  * @param {*} scheme
  */
  function onChangeColorScheme(scheme) {
    viewer.colorSchemeName_ = scheme;
    updateColorScale();
    updatePointsColors();
    if (viewer.legend_) {
      updateLegend();
    }
  }

  /**
  * Add change event to color-field selector
  *
  */
  function addChangeEventToColorFieldDropdown() {
    viewer.colorFieldSelect.addEventListener("change", function (e) {
      onChangeColorField(e.currentTarget.value);
    });
  }

  /**
  * Color csv field dropdown event handler
  *
  * @param {*} field
  */
  function onChangeColorField(field) {
    viewer.colorField_ = field;
    updatePointsColors();
    if (viewer.legend_) {
      updateLegend();
    }
  }

  /**
  * Add change event to color-scale selector
  *
  */
  function addChangeEventToColorScaleDropdown() {
    viewer.colorScaleSelect.addEventListener("change", function (e) {
      onChangeColorScale(e.currentTarget.value);
    });
  }

  /**
  * Color scale dropdown event handler
  *
  * @param {*} scale
  */
  function onChangeColorScale(scale) {
    viewer.colorScaleName_ = scale;
    updateColorScale();
    updatePointsColors();
    if (viewer.legend_) {
      updateLegend();
    }
  }


  /**
  * Add change event to siz-field selector
  *
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
    if (viewer.gridLegend) {
      updateLegend();
    }
  }

  /**
 * @description redefine width and height of viewer when window is resized
 * @function addResizeEvent
 */
  function addResizeEvent() {
    window.addEventListener("resize", () => {
      viewer.width_ = viewer.container_.clientWidth;
      viewer.height_ = viewer.container_.clientHeight - 4; //no idea why but an offset of -4 prevents the viewer from growing/shrinking upon resize
      labelRenderer.setSize(viewer.width_, viewer.height_);
      renderer.setSize(viewer.width_, viewer.height_);
      camera.aspect = viewer.width_ / viewer.height_;
      camera.updateProjectionMatrix();
    });
  }

  /**
* @description attach event listeners to the viewer
* @function addMouseEventsToView
*/
  function addMouseEventsToView() {
    // show cell value on click
    view.on("click", () => {
      let [mouseX, mouseY] = mouse(view.node());
      let mouse_position = [mouseX, mouseY];
      checkIntersects(mouse_position);
      //console.log("Camera pos:", camera.position);
    });

    view.on("mouseleave", () => {
      removeHighlights();
    });
  }

  /**
* @description attach event listeners to viewer buttons
* @function addButtonEvents
*/
  function addButtonEvents() {
    viewer.homeButtonNode.addEventListener("click", () => {
      viewWholeGrid();
    })
  }


  /**
* @description move camera to show the entire extent of the grid, and update the zoom transform
* @function viewWholeGrid
*/
  function viewWholeGrid() {
    let minViewerX = viewer.extentX[0];
    let minViewerY = viewer.extentY[0];

    if (viewer._mobile) {
      let scale = getScaleFromZ(viewer.camera.initialZ_)
      viewer.d3zoom.scaleTo(view, scale);
      viewer.d3zoom.translateTo(view,
        parseInt(viewer.center_[0]) + viewer.width_ / 2,
        parseInt(viewer.center_[1]) + viewer.height_ / 2);
      setCamera(viewer.center_[0], viewer.center_[1], viewer.camera.initialZ_)

      let initial_scale = getScaleFromZ(viewer.camera.far_);
      let initial_transform = zoomIdentity
        .translate(viewer.width_ / 2, viewer.height_ / 2)
        .scale(initial_scale);
      viewer.d3zoom.transform(view, initial_transform);

    } else {
      let scale = getScaleFromZ(viewer.camera.initialZ_)
      viewer.d3zoom.scaleTo(view, scale);
      viewer.d3zoom.translateTo(view,
        parseInt(viewer.center_[0]) + viewer.width_ / 2,
        parseInt(viewer.center_[1]) + viewer.height_ / 2);
      setCamera(viewer.center_[0], viewer.center_[1], viewer.camera.initialZ_)
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
   * @description Defines the pointSize parameter for THREE.pointsLayer objects at the specified resolution
   * @function definePointSize
   *
   */
  function definePointSize() {
    return viewer.resolution_; //INVESTIGATE: why does threejs pointSize value not correspond with the grid resolution?
  }

  /**
   * @description Define the far parameter for THREE.camera. The far parameter represents the furthest possible distance that the camera can be from the plane (where z=0)
   * @function defineFar
   */
  function defineFar() {
    return viewer.resolution_ * 4000;
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
            viewer.colorValuesExtent = extent(gridCaches[viewer.resolution_], d => d[viewer.colorField_]);
            viewer.colorScaleFunction_ = defineColorScale();
            if (viewer.sizeField_) {
              viewer.sizeValuesExtent = extent(gridCaches[viewer.resolution_], d => d[viewer.sizeField_]);
              viewer.sizeScaleFunction_ = defineSizeScale();
            }

            //coordinates extent
            viewer.extentX = extent(gridCaches[viewer.resolution_], d => d.x);
            viewer.extentY = extent(gridCaches[viewer.resolution_], d => d.y);

            // if center is not specified by user, move camera to a cell half way along the array
            // BUG mobile
            if (!viewer.center_) {
              let index = parseInt(gridCaches[viewer.resolution_].length / 2);
              let c = gridCaches[viewer.resolution_][index];
              viewer.center_ = [
                parseFloat(c.x),
                parseFloat(c.y)
              ];
              setCamera(viewer.center_[0], viewer.center_[1], viewer.camera.initialZ_)
            }

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
        err => console.log(err)
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
    return csv(grid.url);
  }

  /**
   * TODO: replace with addTileToCache()
   *
   * @param {*} csv 
   * @param {*} res
   */
  function addGridToCache(csv, res) {
    if (csv) {
      for (let i = 0; i < csv.length; i++) {
        let position = [csv[i].x, csv[i].y];
        let value = csv[i][viewer.colorField_];
        let point = {
          position,
          value
        };
        if (!gridCaches[res]) gridCaches[res] = [];
        gridCaches[res].push(csv[i]);
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
      let domain;
      // assign default if user doesnt specify their own function
      if (!viewer.colorScaleFunction_) {
        domain = viewer.colorValuesExtent;
        return viewer._defaultColorScaleFunction(domain, d3scaleChromatic[viewer.colorSchemeName_]);
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
      viewer.sizeValuesExtent = extent(gridCaches[viewer.resolution_], d => d[viewer.sizeField_]);
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
      return viewer._defaultSizeScaleFunction().domain(viewer.colorValuesExtent).range([viewer.resolution_ / 3, viewer.resolution_ / 1.5]); //minSize, maxSize
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
        if (viewer.nuts2jsonCountry_) {
          newArray = json.objects.nutsrg.geometries.filter((v, i) => {
            return v.properties.id.indexOf(viewer.nuts2jsonCountry_) !== -1; //apply user-defined filter
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
    let coords = [];
    let initial = true;
    if (!boundariesGroup) {
      boundariesGroup = new Group();
      boundariesGroup.renderOrder = 999; //always on top of grid
    } else {
      //empty current boundaries group
      for (var i = boundariesGroup.children.length - 1; i >= 0; i--) {
        boundariesGroup.remove(boundariesGroup.children[i]);
      }
      initial = false;
    }

    // GEOJSON to ThreeJS
    for (let i = 0; i < features.length; i++) {
      let feature = features[i];
      for (let c = 0; c < feature.geometry.coordinates.length; c++) {
        coords = [];
        if (feature.geometry.type == "Polygon") {
          for (let s = 0; s < feature.geometry.coordinates[c].length; s++) {
            let xyz;
            if (viewer.zerosRemoved_) {
              // remove zeros from nuts2json coordinates to match gridData
              let d = Number('1E' + viewer.zerosRemoved_);
              xyz = {
                x: feature.geometry.coordinates[c][s][0] / d,
                y: feature.geometry.coordinates[c][s][1] / d,
                z: CONSTANTS.line_z
              };
            } else {
              xyz = {
                x: feature.geometry.coordinates[c][s][0],
                y: feature.geometry.coordinates[c][s][1],
                z: CONSTANTS.line_z
              };
            }

            coords.push(xyz);
          }
          boundariesGroup.add(createLineFromCoords(coords));
        } else if (feature.geometry.type == "MultiPolygon") {
          for (let s = 0; s < feature.geometry.coordinates[c].length; s++) {
            //each polygon in multipolygon:
            coords = [];
            for (
              let m = 0;
              m < feature.geometry.coordinates[c][s].length;
              m++
            ) {
              let xyz;
              if (viewer.zerosRemoved_) {
                let d = Number('1E' + viewer.zerosRemoved_);
                xyz = {
                  x: feature.geometry.coordinates[c][s][m][0] / d,
                  y: feature.geometry.coordinates[c][s][m][1] / d,
                  z: CONSTANTS.line_z
                };
              } else {
                xyz = {
                  x: feature.geometry.coordinates[c][s][m][0],
                  y: feature.geometry.coordinates[c][s][m][1],
                  z: CONSTANTS.line_z
                };
              }
              coords.push(xyz);
            }
            boundariesGroup.add(createLineFromCoords(coords));
          }
        }
      }
    }
    if (initial) {
      viewer.scene.add(boundariesGroup);
    }
  }

  /**
   * 
   * @description Function exposed to user for adding geojson files to the viewer
   * @param {String} url URL of geojson file to be added
   * @param {Boolean} removeZeros whether or not to remove the amount of zeros specified in zerosRemoved_ from the geojson file to be loaded. E.g if your csv grid file has 3 trailing zeros removed but your geojson file doesnt
   * @function addGeoJson
   */
  viewer.addGeoJson = function (url, removeZeros) {
    json(url).then(
      res => {
        if (res.features) {
          if (res.features.length > 0) {
            addGeoJsonToScene(res.features, removeZeros);
          }
        }
      },
      err => {
        console.error(err);
      }
    );
  }

  /**
   * 
   * @description Add geojson features to three.js scene. Currently accepts polygon, multipolygon or linestring
   * @param {Array} features Geojson feature array
   * @param {Boolean} removeZeros whether or not to remove the amount of zeros specified in zerosRemoved_ from the geojson file to be loaded. E.g if your csv grid file has 3 trailing zeros removed but your geojson file doesnt
   * @function addGeoJsonToScene
   */
  let layerZ = 1;
  function addGeoJsonToScene(features, removeZeros) {
    layerZ = layerZ + 0.002; // increment draw order so that latest geojson is added on top of the rest.
    let geojsonGroup = new Group();
    geojsonGroup.renderOrder = 999; //always on top of grid
    // GEOJSON to ThreeJS
    for (let i = 0; i < features.length; i++) {
      let feature = features[i];
      let coords = [];
      for (let c = 0; c < feature.geometry.coordinates.length; c++) {
        if (feature.geometry.type == "Polygon") {
          let coords = [];
          for (let s = 0; s < feature.geometry.coordinates[c].length; s++) {
            let xyz;
            if (removeZeros && viewer.zerosRemoved_) {
              let d = Number('1E' + viewer.zerosRemoved_);
              xyz = {
                x: feature.geometry.coordinates[c][s][0] / d,
                y: feature.geometry.coordinates[c][s][1] / d,
                z: layerZ
              };
            } else {
              xyz = {
                x: feature.geometry.coordinates[c][s][0],
                y: feature.geometry.coordinates[c][s][1],
                z: layerZ
              };
            }

            coords.push(xyz);
          }
          geojsonGroup.add(createLineFromCoords(coords));
        } else if (feature.geometry.type == "MultiPolygon") {
          for (let s = 0; s < feature.geometry.coordinates[c].length; s++) {
            //each polygon in multipolygon:
            let coords = [];
            for (
              let m = 0;
              m < feature.geometry.coordinates[c][s].length;
              m++
            ) {
              let xyz;
              if (removeZeros && viewer.zerosRemoved_) {
                let d = Number('1E' + viewer.zerosRemoved_);
                xyz = {
                  x: feature.geometry.coordinates[c][s][m][0] / d,
                  y: feature.geometry.coordinates[c][s][m][1] / d,
                  z: layerZ
                };
              } else {
                xyz = {
                  x: feature.geometry.coordinates[c][s][m][0],
                  y: feature.geometry.coordinates[c][s][m][1],
                  z: layerZ
                };
              }
              coords.push(xyz);
            }
            geojsonGroup.add(createLineFromCoords(coords));
          }
        } else if (feature.geometry.type == "LineString") {
          let xyz;
          if (removeZeros && viewer.zerosRemoved_) {
            let d = Number('1E' + viewer.zerosRemoved_);
            xyz = {
              x: feature.geometry.coordinates[c][0] / d,
              y: feature.geometry.coordinates[c][1] / d,
              z: layerZ
            };
          } else {
            xyz = {
              x: feature.geometry.coordinates[c][0],
              y: feature.geometry.coordinates[c][1],
              z: layerZ
            };
          }
          coords.push(xyz);
        }
      }
      if (feature.geometry.type = "LineString") {
        geojsonGroup.add(createLineFromCoords(coords));
      }
    }
    viewer.scene.add(geojsonGroup);
  }

  /**
   * @description Build threejs line geometry from world coordinates
   * @function createLineFromCoords
   * @param []  array of coord objects with values x,y,z
   * @returns {Line2}
   */
  function createLineFromCoords(coords) {
    let line_geom = new LineGeometry();
    let positions = [];
    let colors = [];
    let color = new Color(viewer.borderColor_);
    for (var i = 0; i < coords.length; i++) {
      positions.push(coords[i].x, coords[i].y, layerZ);
      colors.push(color.r, color.g, color.b);
    }
    line_geom.setPositions(positions);
    line_geom.setColors(colors);
    if (!lineMaterial) {
      lineMaterial = new LineMaterial({
        linewidth: CONSTANTS.line_width,
        vertexColors: THREE.VertexColors
      });
    }
    //line2 allows custom linewidth (but not currently included in main threejs build)
    return new Line2(line_geom, lineMaterial);
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
    pointsLayer.geometry = pointsGeometry;
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
    pointsLayer.geometry = pointsGeometry;
  }

  /**
   * @description create or update THREE.js pointsLayer layer. At the moment, only ONE pointsLayer layer at a time is handled by the viewer, so a second call of gridviz.gridData() will overwrite the initial layer
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
    //create or reuse pointsLayer Material
    if (!pointsMaterial) {
      // Attempting to apply custom point sizes
      pointsMaterial = new ShaderMaterial({
        uniforms: {
          thing: {
            value: 1000.0
          }
        },
        fragmentShader: fragmentShader(),
        vertexShader: vertexShader(),
        vertexColors: THREE.VertexColors
      });
      //using threejs PointsMaterial
      //pointsMaterial = new PointsMaterial({
      //size: gridConfig.pointSize,
      // sizeAttenuation: true,
      //https://github.com/mrdoob/three.js/blob/master/src/constants.js
      // vertexColors: THREE.VertexColors
      // });
    } else {
      pointsMaterial.size = gridConfig.pointSize;
    }
    //create or reuse pointsLayer object
    if (!pointsLayer) {
      pointsLayer = new Points(pointsGeometry, pointsMaterial);
      pointsLayer.renderOrder = 1; //bottom
      viewer.scene.add(pointsLayer);
    } else {
      pointsLayer.geometry = pointsGeometry;
      pointsLayer.material = pointsMaterial;
    }
    //create or update legend
    if (viewer.showLegend_) {
      if (viewer.legend_) {
        if (viewer.gridLegend) {
          updateLegend();
        } else {
          createLegend();
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
  uniform float thing;
  attribute float size;
  float scale;
  varying vec3 vColor;

  void main() {
    vColor = color;
    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
    gl_PointSize = size * (thing / -mvPosition.z );
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
   * Add svg legend to DOM using d3-svg-legend
   *
   */
  function createLegend() {
    if (viewer.legend_.type == "cells") {
      createCellsLegend()
    } else if (viewer.legend_.type == "continuous") {
      createContinuousLegend()
    }

  }

  function createCellsLegend() {
    let legendContainer;
    if (document.getElementById("gridviz-legend")) {
      legendContainer = select("#gridviz-legend");
    } else {
      legendContainer = create("div").attr("id", "gridviz-legend");
      viewer.container_.appendChild(legendContainer.node());
    }
    if (viewer.legend_.orientation == "horizontal") {
      legendContainer.attr("class", "gridviz-legend-horizontal gridviz-plugin");
    } else {
      legendContainer.attr("class", "gridviz-legend-vertical gridviz-plugin");
    }
    let legend = legendContainer
      .append("g")
      .attr("class", "gridviz-legend-svg")
      .attr("transform", "translate(10,15)"); //padding

    viewer.gridLegend = LEGEND.legendColor()
      .shapeWidth(viewer.legend_.shapeWidth)
      .cells(viewer.legend_.cells)
      .labelFormat(format(viewer.legend_.format))
      .orient(viewer.legend_.orientation)
      .scale(viewer.colorScaleFunction_)
      .title(viewer.legend_.title)
      .titleWidth(viewer.legend_.titleWidth)

    if (viewer.thresholdValues_) {
      viewer.gridLegend.labels(thresholdLabels)
    }

    legendContainer.select(".gridviz-legend-svg").call(viewer.gridLegend);

    //adjust width/height
    if (!viewer.legend_.height) {
      viewer.legend_.height = 320
    }
    legendContainer.style("height", viewer.legend_.height + "px");
    legendContainer.style("width", viewer.legend_.width + "px");
    //legend.style("height", viewer.legend_.height +"px");
  }

  //https://observablehq.com/@gabgrz/color-legend
  function createContinuousLegend() {
    let container;
    if (document.getElementById("gridviz-legend")) {
      container = select("#gridviz-legend");
    } else {
      container = create("div").attr("id", "gridviz-legend");
      container.attr("class", "gridviz-plugin");
      viewer.container_.appendChild(container.node());
    }

    viewer.gridLegend = colorLegend({
      color: viewer.colorScaleFunction_,
      title: viewer.legend_.title,
      tickFormat: ".0f",
      width: viewer.legend_.width,
    });

    container.node().appendChild(viewer.gridLegend);

  }
  function ramp(color, n = 256) {
    const canvas = document.createElement("CANVAS")
    canvas.width = n;
    canvas.height = 1;
    const context = canvas.getContext("2d");
    for (let i = 0; i < n; ++i) {
      context.fillStyle = color(i / (n - 1));
      context.fillRect(i, 0, 1, 1);
    }
    return canvas;
  }

  function colorLegend({
    color,
    title,
    tickSize = 6,
    width = 500,
    height = viewer.legend_.height || 44 + tickSize,
    marginTop = 18,
    marginRight = 0,
    marginBottom = 16 + tickSize,
    marginLeft = 0,
    ticks = viewer.legend_.ticks || width / 64,
    tickFormat,
    tickValues
  } = {}) {

    const svg = create("svg")
      .attr("class", "gridviz-legend-svg")
      // .attr("class", "gridviz-continuous-legend")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .style("overflow", "visible")
      .style("display", "block");

    let x;

    // Continuous
    if (color.interpolator) {
      x = Object.assign(color.copy()
        .interpolator(interpolateRound(marginLeft, width - marginRight)),
        { range() { return [marginLeft, width - marginRight]; } });

      svg.append("image")
        .attr("x", marginLeft)
        .attr("y", marginTop)
        .attr("width", width - marginLeft - marginRight)
        .attr("height", height - marginTop - marginBottom)
        .attr("preserveAspectRatio", "none")
        .attr("xlink:href", ramp(color.interpolator()).toDataURL());

      // scaleSequentialQuantile doesn’t implement ticks or tickFormat.
      if (!x.ticks) {
        if (tickValues === undefined) {
          const n = Math.round(ticks + 1);
          tickValues = range(n).map(i => quantile(color.domain(), i / (n - 1)));
        }
        if (typeof tickFormat !== "function") {
          tickFormat = format(tickFormat === undefined ? ",f" : tickFormat);
        }
      }
    }

    // Discrete
    else if (color.invertExtent) {
      const thresholds
        = color.thresholds ? color.thresholds() // scaleQuantize
          : color.quantiles ? color.quantiles() // scaleQuantile
            : color.domain(); // scaleThreshold

      const thresholdFormat
        = tickFormat === undefined ? d => d
          : typeof tickFormat === "string" ? format(tickFormat)
            : tickFormat;

      x = d3scale.scaleLinear()
        .domain([-1, color.range().length - 1])
        .rangeRound([marginLeft, width - marginRight]);

      svg.append("g")
        .selectAll("rect")
        .data(color.range())
        .join("rect")
        .attr("x", (d, i) => x(i - 1))
        .attr("y", marginTop)
        .attr("width", (d, i) => x(i) - x(i - 1))
        .attr("height", height - marginTop - marginBottom)
        .attr("fill", d => d);

      tickValues = range(thresholds.length);
      tickFormat = i => thresholdFormat(thresholds[i], i);
    }

    svg.append("g")
      .attr("transform", `translate(0, ${height - marginBottom})`)
      .call(axisBottom(x)
        .ticks(ticks, typeof tickFormat === "string" ? tickFormat : undefined)
        .tickFormat(typeof tickFormat === "function" ? tickFormat : undefined)
        .tickSize(tickSize)
        .tickValues(tickValues))
      .call(g => g.selectAll(".tick line").attr("y1", marginTop + marginBottom - height))
      .call(g => g.select(".domain").remove())
      .call(g => g.append("text")
        .attr("y", marginTop + marginBottom - height - 10)
        .attr("fill", "currentColor")
        .attr("text-anchor", "start")
        .attr("font-weight", "bold")
        //.attr("font-size", viewer.legend_.fontSize)
        .attr("class", "gridviz-continuous-legend-title")
        .text(title));

    return svg.node();
  }

  function thresholdLabels({
    i,
    genLength,
    generatedLabels,
    labelDelimiter
  }) {
    if (i === 0) {
      const values = generatedLabels[i].split(` ${labelDelimiter} `)
      return `Less than ${values[1]}`
    } else if (i === genLength - 1) {
      const values = generatedLabels[i].split(` ${labelDelimiter} `)
      return `${values[0]} or more`
    }
    return generatedLabels[i]
  }

  /**
   * remove DOM element and rebuild legend
   *
   */
  function updateLegend() {
    var l = selectAll(".gridviz-legend-svg").remove();
    setTimeout(createLegend(), 1000);
  }

  /**
   *  @description Three.js render loop
   * @function animate
   * 
   */
  function animate() {
    //let time = Date.now() * 0.005;
    //pointsLayer.position.x = 0.02 * time;
    viewer.animating = true;
    requestAnimationFrame(animate);
    renderer.render(viewer.scene, camera);
    labelRenderer.render(viewer.scene, camera);
  }

  /**
   * @description Appends tooltip container to the scene
   * @function createTooltipContainer
   * 
   */
  function createTooltipContainer() {
    // Initial tooltip state
    tooltip_state = {
      display: "none"
    };

    //inject tooltip HTML to DOM
    tooltipTemplate = document.createRange()
      .createContextualFragment(`<div id="gridviz-tooltip">
    <div id="gridviz-labeltip"></div>
<div id="gridviz-pointtip"></div>
</div>`);
    viewer.container_.append(tooltipTemplate);

    tooltip = document.querySelector("#gridviz-tooltip");
    pointTip = document.querySelector("#gridviz-pointtip");
    labelTip = document.querySelector("#gridviz-labeltip");
    tooltipContainer = new Object3D();
    viewer.scene.add(tooltipContainer);
  }



  /**
   * @description Defines zoom functionality using d3.js
   * @function addPanAndZoom
   * 
   */
  function addPanAndZoom() {
    // define zoom
    //where [x0, y0] is the top-left corner of the world and [x1, y1] is the bottom-right corner of the world
    let farScale = getScaleFromZ(viewer.camera.far_);
    let nearScale = getScaleFromZ(viewer.camera.near_);
    viewer.d3zoom =
      zoom()
        .scaleExtent([farScale, nearScale])
        .extent([[0, 0], [viewer.width_, viewer.height_]])
        .on("zoom", () => {
          let event = currentEvent;
          if (viewer._mobile) {
            if (event) zoomHandlerMobile(event);
          } else {
            if (event) zoomHandler(event);
          }
        })
        .on("end", () => {
          let event = currentEvent;
          if (event) zoomEnd(event);
        });

    view.call(viewer.d3zoom);

    if (viewer._mobile) {
      let ext = [[0, 0], [view._groups[0][0].clientWidth, view._groups[0][0].clientHeight]]; //p value of translateBy defaults to the center of this extent.
      let p = [viewer.width_ / 2, viewer.height_ / 2]; //screen coords of where [x,y] should appear
      let scale = getScaleFromZ(viewer.camera.initialZ_)
      viewer.d3zoom.scaleTo(view, scale, p);
      let x = parseInt(viewer.center_[0]) + viewer.width_ / 2;
      let y = parseInt(viewer.center_[1]) + viewer.height_ / 2;
      viewer.d3zoom.translateTo(view, x, y, p);

      setCamera(viewer.center_[0], viewer.center_[1], viewer.camera.initialZ_)
    } else {
      //initial zoom transform
      let scale = getScaleFromZ(viewer.camera.initialZ_)
      viewer.d3zoom.scaleTo(view, scale);
      viewer.d3zoom.translateTo(view,
        parseInt(viewer.center_[0]) + viewer.width_ / 2,
        parseInt(viewer.center_[1]) + viewer.height_ / 2);
      setCamera(viewer.center_[0], viewer.center_[1], viewer.camera.initialZ_)
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
      if (new_z !== camera.position.z) {
        // Handle a zoom event
        const { clientX, clientY } = event.sourceEvent;
        // Code from WestLangley https://stackoverflow.com/questions/13055214/mouse-canvas-x-y-to-three-js-world-x-y-z/13091694#13091694
        const vector = new Vector3(
          (clientX / viewer.width_) * 2 - 1,
          -(clientY / viewer.height_) * 2 + 1,
          1
        );
        vector.unproject(camera);
        const dir = vector.sub(camera.position).normalize();
        const distance = (new_z - camera.position.z) / dir.z;
        const pos = camera.position.clone().add(dir.multiplyScalar(distance));
        // Set the camera to new coordinates
        setCamera(pos.x, pos.y, new_z);
      } else {
        // If panning
        const { movementX, movementY } = event.sourceEvent;

        // Adjust mouse movement by current scale and set camera
        const current_scale = getScaleFromZ(camera.position.z);
        setCamera(
          camera.position.x - movementX / current_scale,
          camera.position.y + movementY / current_scale,
          camera.position.z
        );
      }
    }
  }

  function getScaleFromZ(z) {
    let half_fov = viewer.camera.fov_ / 2;
    let half_fov_radians = toRadians(half_fov);
    let half_fov_height = Math.tan(half_fov_radians) * z;
    let fov_height = half_fov_height * 2;
    let scale = viewer.height_ / fov_height; // Divide visualization height by height derived from field of view
    return scale;
  }

  function getZFromScale(scale) {
    let half_fov = viewer.camera.fov_ / 2;
    let half_fov_radians = toRadians(half_fov);
    let scale_height = viewer.height_ / scale;
    let camera_z_position = scale_height / (2 * Math.tan(half_fov_radians));
    return camera_z_position;
  }

  function zoomEnd(event) {
    hideTooltip();
    let scale = getScaleFromZ(event.transform.k);
    if (viewer.debugPlacenames_) {
      console.info(scale);
    }
    // get placenames at certain zoom levels
    if (viewer.showPlacenames_) {
      if (pointsLayer) {
        if (scale > 0 && scale < viewer.camera.far_) {
          //placenames are added to the pointsLayer object
          getPlacenames(scale);
        } else {
          removePlacenamesFromScene();
        }
      }
    }

    //change nuts simplification (or not) based on current scale
    //URL themes: 2016/3035/20M/0.json
    if (viewer.nuts2json_) {
      if (
        scale < CONSTANTS.nuts_scale_threshold &&
        viewer.nutsSimplification_ !== "10M"
      ) {
        viewer.nutsSimplification_ = "10M";
        loadNuts2json(
          CONSTANTS.nuts_base_URL +
          viewer.nuts2jsonEPSG_ +
          "/" +
          viewer.nutsSimplification_ +
          "/" + viewer.nutsLevel_ + ".json"
        );
      } else if (
        scale > CONSTANTS.nuts_scale_threshold &&
        viewer.nutsSimplification_ !== "20M"
      ) {
        viewer.nutsSimplification_ = "20M";
        loadNuts2json(
          CONSTANTS.nuts_base_URL +
          viewer.nuts2jsonEPSG_ +
          "/" +
          viewer.nutsSimplification_ +
          "/" + viewer.nutsLevel_ + ".json"
        );
      }
    }
  }

  /**
   * retrieves placenames by population according to the current scale, from an ArcGIS server endpoint.
   * TODO: send bounding box correctly (geometry xmin,ymin,xmax,ymax)
   * @param {*} scale
   */
  function getPlacenames(scale) {
    let where = defineWhereParameter(scale)
    let envelope = getCurrentViewExtent();
    //currentExtent = envelope;
    //ESRI Rest API envelope: <xmin>,<ymin>,<xmax>,<ymax> (bottom left x,y , top right x,y)
    let URL =
      CONSTANTS.placenames_base_URL +
      "where=" +
      where +
      "&outSR=" +
      viewer.placenamesEPSG_ +
      "&inSR=" + viewer.placenamesEPSG_ +
      "&geometry=" +
      envelope.xmin +
      "," +
      envelope.ymin +
      "," +
      envelope.xmax +
      "," +
      envelope.ymax +
      "&geometryType=esriGeometryEnvelope&f=json&outFields=GISREGIO.CITIES_TOWNS_RG.STTL_NAME,GISREGIO.CITIES_TOWNS_RG.POPL_2011";

    //manage multiple calls by replicating angular's .unsubscribe() somehow
    let uri = encodeURI(URL);
    json(uri).then(
      res => {
        if (res.features) {
          if (res.features.length > 0) {
            removePlacenamesFromScene();
            addPlacenamesToScene(res.features);
          }
        }
      },
      err => {
        console.error(err);
      }
    );
  }

  function defineWhereParameter(scale) {
    let r = viewer.resolution_;
    let where = "";
    if (viewer.placenamesCountry_) {
      where = where + "GISREGIO.CITIES_TOWNS_RG.CNTR_CODE='" + viewer.placenamesCountry_ + "' AND "
    }
    // labelling thresholds by population - either custom values or by scale
    let popFilter = getPopulationParameterFromScale(scale)
    if (viewer.debugPlacenames_) {
      console.info(popFilter);
    }
    return where + popFilter;
  }

  /**
   * Defines the population parameter for the request to the placenmes service. If viewer.populationThresholds_ are not set, it uses default thresholds
   *
   * @param {*} scale
   */
  function getPopulationParameterFromScale(scale) {
    let populationFieldName = "GISREGIO.CITIES_TOWNS_RG.POPL_2011"
    //user-defined thresholds
    if (viewer.placenameThresholds_) {
      let thresholds = Object.keys(viewer.placenameThresholds_);
      for (let i = 0; i < thresholds.length; i++) {
        let t = thresholds[i];
        if (thresholds[i + 1]) { //if not last threshold
          if (scale < parseInt(thresholds[0])) { //below first threshold
            return populationFieldName + ">" + viewer.placenameThresholds_[thresholds[0]];
          } else if (scale > parseInt(t) && scale < parseInt(thresholds[i + 1])) {
            // if current scale is between thresholds
            return populationFieldName + ">" + viewer.placenameThresholds_[t];
          }
        } else {
          // if last threshold
          return populationFieldName + ">" + viewer.placenameThresholds_[t];
        }
      }
    } else {
      //default values
      let r = viewer.resolution_
      if (scale > 0 && scale < r) {
        return populationFieldName + ">10";
      } else if (scale > r && scale < r * 2) {
        return populationFieldName + ">1000";
      } else if (scale > r * 2 && scale < r * 4) {
        return populationFieldName + ">2500";
      } else if (scale > r * 4 && scale < r * 8) {
        return populationFieldName + ">5000";
      } else if (scale > r * 8 && scale < r * 16) {
        return populationFieldName + ">7500";
      } else if (scale > r * 16 && scale < r * 32) {
        return populationFieldName + ">10000";
      } else if (scale > r * 32 && scale < r * 64) {
        return populationFieldName + ">20000";
      } else if (scale > r * 64 && scale < r * 128) {
        return populationFieldName + ">100000";
      } else if (scale > r * 128 && scale < r * 256) {
        return populationFieldName + ">250000";
      } else if (scale > r * 256 && scale < r * 512) {
        return populationFieldName + ">500000";
      } else if (scale > r * 512 && scale < r * 1024) {
        return populationFieldName + ">750000";
      } else if (scale > r * 1024) {
        return populationFieldName + ">1000000";
      } else {
        return "1=1";
      }
    }
  }

  /**
   * Appends placename labels from JSON features to the viewer
   *
   * @param {*} placenames
   */
  function addPlacenamesToScene(placenames) {
    if (pointsLayer) {
      for (let p = 0; p < placenames.length; p++) {
        let label = createPlacenameLabelObject(placenames[p]);
        // TODO: group objects manually (THREE.group())
        pointsLayer.add(label);
      }
    }
  }

  /**
   * Removes the placename CSS2DObjects from the THREE pointsLayer layer
   * It seems that the browsers JS garbage collector removes the DOM nodes
   */
  function removePlacenamesFromScene() {
    if (pointsLayer && pointsLayer.children.length > 0) {
      for (var i = pointsLayer.children.length - 1; i >= 0; i--) {
        pointsLayer.remove(pointsLayer.children[i]);
      }
    }
  }

  /**
   * Creates a CSS2DObject for a placename ESRI JSON object
   *
   * @param {*} placename
   * @returns CSS2DObject
   */
  function createPlacenameLabelObject(placename) {
    var placeDiv = document.createElement("div");
    placeDiv.className = "gridviz-placename";
    placeDiv.textContent = placename.attributes["GISREGIO.CITIES_TOWNS_RG.STTL_NAME"];
    placeDiv.style.marginTop = "-1em";
    var placeLabel = new CSS2DObject(placeDiv);
    if (viewer.zerosRemoved_) {
      let d = Number('1E' + viewer.zerosRemoved_);
      placeLabel.position.set(
        placename.geometry.x / d,
        placename.geometry.y / d,
        CONSTANTS.label_height
      );
    } else {
      placeLabel.position.set(
        placename.geometry.x,
        placename.geometry.y,
        CONSTANTS.label_height
      );
    }
    return placeLabel;
  }

  function getCurrentViewExtent() {
    //let z = 0.5;
    //let padding = 10; // making sure the screen coords hit the scene
    //https://stackoverflow.com/questions/13055214/mouse-canvas-x-y-to-three-js-world-x-y-z

    /*   var elem = renderer.domElement, 
  boundingRect = elem.getBoundingClientRect(),
  x = (clientX - boundingRect.left) * (elem.width / boundingRect.width),
  y = (clientY - boundingRect.top) * (elem.height / boundingRect.height);
   
  var vector = new THREE.Vector3( 
  ( x / viewer.width_ ) * 2 - 1, 
  - ( y / viewer.height_ ) * 2 + 1, 
  0.5 
  );
   
  projector.unprojectVector( vector, camera ); */

    //let bottomLeftVector = mouseToThree(padding, viewer.height_ - padding); //screen x,y
    //let topRightVector = mouseToThree(viewer.width_ - padding, padding); //screen x,y

    //let bottomLeftWorld = getWorldCoordsFromVector(bottomLeftVector);
    //let topRightWorld = getWorldCoordsFromVector(topRightVector);
    var elem = renderer.domElement;
    let clientBottomLeft = [elem.clientLeft, elem.clientHeight];
    let clientTopRight = [elem.clientWidth, elem.clientTop];
    let bottomLeftWorld = getWorldCoordsFromScreen(clientBottomLeft); //client x,y
    let topRightWorld = getWorldCoordsFromScreen(clientTopRight); //client x,y

    // full european extent in EPSG 3035:
    // return {
    //   xmin: 1053668.5589,
    //   ymin: 1645342.8583,
    //   xmax: 5724066.4412,
    //   ymax: 5901309.0137
    // };
    if (viewer.zerosRemoved_) {
      let d = Number('1E' + viewer.zerosRemoved_);
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

  // get the position of a canvas event in world coords
  function getWorldCoordsFromScreen([clientX, clientY]) {
    var vec = new Vector3(); // create once and reuse
    var pos = new Vector3(); // create once and reuse

    vec.set(
      (clientX / window.innerWidth) * 2 - 1,
      -(clientY / window.innerHeight) * 2 + 1,
      0.5
    );

    vec.unproject(camera);

    vec.sub(camera.position).normalize();

    var distance = -camera.position.z / vec.z;

    pos.copy(camera.position).add(vec.multiplyScalar(distance));
    return pos;
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
    raycaster.setFromCamera(mouse_vector, camera);
    let intersects = raycaster.intersectObject(pointsLayer);
    if (intersects[0]) {
      let sorted_intersects = sortIntersectsByDistanceToRay(intersects);
      let intersect = sorted_intersects[0];
      console.log("Intersect", intersect);
      let index = intersect.index;
      let cell = gridCaches[viewer.resolution_][index];
      highlightPoint(intersect);
      showTooltip(mouse_position, cell);
    } else {
      removeHighlights();
      hideTooltip();
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
    removeHighlights();

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

    //add new cell
    // let geometry = new Geometry();
    // // FIXME
    // geometry.vertices.push(new Vector3(cell.position[0], cell.position[1], 0));
    // geometry.colors = [new Color("#ffffff")];

    // let material = new PointsMaterial({
    //   size: gridConfig.pointSize,
    //   sizeAttenuation: true,
    //   vertexColors: THREE.VertexColors,
    //   transparent: true
    // });

    // let point = new Points(geometry, material);
    // tooltipContainer.add(point);
  }

  function removeHighlights() {
    tooltipContainer.remove(...tooltipContainer.children);
  }

  /**
   *
   *
   */
  function updateTooltip() {
    tooltip.style.display = tooltip_state.display;
    tooltip.style.left = tooltip_state.left + "px";
    tooltip.style.top = tooltip_state.top + "px";
    //pointTip.innerText = tooltip_state.name;
    pointTip.style.background = tooltip_state.color;
    labelTip.innerHTML = `<strong>${viewer.colorField_}:</strong> ${tooltip_state.colorValue} <br> 
  <strong>x:</strong> ${tooltip_state.coords[0]} <br> 
  <strong>y:</strong> ${tooltip_state.coords[1]} <br> `;
  }

  /**
   *
   *
   * @param {*} mouse_position
   * @param {*} cell
   */
  function showTooltip(mouse_position, cell) {
    let x_offset = 15;
    let y_offset = -90;
    let tooltipWidth = parseInt(tooltip.style.width.replace("px", ""));
    let tooltipHeight = 100;//tooltip.style.height;
    let left = mouse_position[0] + x_offset;
    let top = mouse_position[1] + y_offset
    if (left > viewer.width_ - tooltipWidth) {
      left = left - (tooltipWidth + 40);
    }
    if (top < 0) {
      top = top + (tooltipHeight);
    }

    tooltip_state.display = "block";
    tooltip_state.left = left
    tooltip_state.top = top;
    tooltip_state.colorValue = Utils.formatNumber(parseFloat(cell[viewer.colorField_]));
    tooltip_state.coords = [cell.x, cell.y];
    tooltip_state.color = cell.color;
    updateTooltip();
  }

  /**
   *
   *
   */
  function hideTooltip() {
    if (tooltip && tooltip_state) {
      tooltip.style.display = "none";
      //updateTooltip();
    }
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
