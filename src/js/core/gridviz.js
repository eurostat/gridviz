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
  WebGLRenderer,
  Vector3,
  Color,
  Raycaster,
} from "three";
import { WEBGL } from '../lib/threejs/WebGL'

import * as THREE from "three/src/constants";
// extra Three.js modules not included in main threejs build, used for labelling
import { CSS2DRenderer } from "../lib/threejs/CSS2D/CSS2DRenderer";
// for loading NUTS2json 
import { feature } from "topojson";
// gridviz constants
import * as CONSTANTS from "./constants.js";
// utility functions
import * as Utils from "./utils/utils";
// gridviz modules
import * as Geojson from "./layers/geojson.js";
import * as Tooltip from "./tooltip/tooltip.js";
import * as Placenames from "./placenames/placenames.js";
import * as Legend from "./legend/legend.js";
import * as Camera from "./camera/camera.js";
import * as Dropdowns from "./gui/dropdowns.js";
import * as Gui from "./gui/gui.js";
import * as Buttons from "./gui/buttons.js";
import * as Points from "./layers/points.js";

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
  //TODO: move default configs to their respective modules

  //output object
  let viewer = {};

  //debugging
  viewer.debugPlacenames_ = false; //logs scale & population filter values in the console upon zoom

  //styles
  viewer.container_ = document.body;
  viewer.height_ = null; //takes container width/height
  viewer.width_ = null;
  viewer.backgroundColor_ = "#ffffff";
  viewer.lineColor_ = "rgb(0, 0, 0)";
  viewer.lineWidth_ = 0.0012;
  viewer.highlightColor_ = "yellow"
  viewer.loadingIcon_ = "ring"; //ripple | ring | ellipsis | roller

  // https://d3-legend.susielu.com vs https://blog.scottlogic.com/2019/03/13/how-to-create-a-continuous-colour-range-legend-using-d3-and-d3fc.html
  viewer.showLegend_ = true;

  // default legend config
  viewer.legend_ = {
    type: "continuous", //cells vs continuous
    width: 300,
    height: null,
    orientation: "horizontal",
    title: null, //if null, will default to the current colorField
    titleWidth: 50,
    format: ".0s",
    cells: 5,
    shapeWidth: 30
  };
  viewer._gridLegend; //legend stored here

  // default tooltip config
  viewer.tooltip_ = {
    eventType: "mousemove", // click vs mousemove
    showLAU: false,
    showEPSG: false,
    showNUTS: false,
    showCoordinates: true,
    xOffset: 15,
    yOffset: 15
  };

  //d3 Scaling & colouring stuff
  viewer.colorSchemeName_ = "interpolateBlues";
  viewer.reverseColorScheme_ = false;
  viewer.sizeScaleName_ = "scaleSqrt";
  viewer.colorScaleName_ = "scaleSequentialSqrt";
  viewer.colorScaleMidpoint_ = 0; // midpoint for diverging scales
  viewer.colors_ = null;
  viewer.thresholds_ = null; // for threshold / quantile scales
  viewer.colorScaleFunction_ = null;
  viewer.sizeScaleFunction_ = null;

  //dropdowns
  viewer.colorSchemeSelector_ = false;
  viewer.colorScaleSelectorLabel_ = "Colour scale: "
  viewer.colorScaleSelector_ = false;
  viewer.colorScaleSelectorDefault_ = viewer.colorScaleName_
  viewer.colorFieldSelectorLabel_ = "Colour field: "
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
  viewer.zoomButtons_ = false;

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
  viewer.gridInfo_ = null; // type:Grid
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

  // other variables
  let previousIntersect;
  let gridCaches = {};

  //mobile stuff 
  viewer.mobileCellSize_ = null;

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
      Legend.updateLegend(viewer)
    }
    return viewer;
  };
  viewer.tooltip = function (v) {
    for (let key in v) {
      viewer.tooltip_[key] = v[key];
    }
    return viewer;
  };

  //threejs layer that will contain the grid "points"
  viewer.pointsLayer = null; //three.Points

  //if gridData has already been added, this function now overwrites the gridData currently in the viewer.
  viewer.gridData = function (v) {
    if (v && viewer.pointsLayer) {
      viewer.gridInfo_ = v;
      viewer.resolution_ = v[0].cellSize
      viewer.raycasterThreshold = defineRaycasterThreshold();
      viewer.pointSize = definePointSize();

      if (viewer.showPlacenames_) {
        Placenames.removePlacenamesFromScene(viewer); //clear labels
      }

      Camera.redefineCamera(viewer);
      //clear previous grid
      loadGrid(v[0])
    } else {
      if (v) {
        viewer.gridInfo_ = v;
        viewer.pointSize = v[0].cellSize;
      }
    }
    return viewer;
  };

  //if viewer has already been initialized, calls to center() method will move existing camera
  viewer.center = function (v) {
    //if already previously set
    if (v && viewer.scene) {
      viewer.center_ = v;
      Camera.redefineCamera(viewer);
      Camera.setCamera(v[0], v[1], viewer.camera.position.z)
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
      Camera.redefineCamera(viewer);
      Camera.setCamera(viewer.camera.position.x, viewer.camera.position.y, v); // Set camera zoom (z position)
    } else {
      if (v) {
        viewer.zoom_ = v;
      }
    }
    return viewer;
  };

  /**
   *  TODO: return a promise once build is complete
   *
   * @function build
   * @description Clears the canvas, builds the three.js viewer and appends grid data
  */
  viewer.build = function () {
    //check if WebGL compatible device
    if (WEBGL.isWebGLAvailable()) {

      // Initiate function or other initializations here
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

        //mobile settings
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
          viewer.resolution_ = viewer.gridInfo_[0].cellSize;
        }

        if (viewer.showPlacenames_ && !viewer.placenameThresholds_) {
          Placenames.defineDefaultPlacenameThresholds(viewer);
        }

        // three.js initializations
        createScene();
        if (!viewer.labelRenderer) createLabelRenderer();
        if (!viewer.renderer) createWebGLRenderer();

        Camera.createCamera(viewer);
        createRaycaster();

        // tooltip DOM element
        Tooltip.createTooltipContainer(viewer);

        // dropdowns DOM container
        if (viewer.colorSchemeSelector_ || viewer.colorScaleSelector_ || viewer.sizeFieldSelector_ || viewer.colorFieldSelector_) {
          Gui.addSelectorsContainerToDOM(viewer);
        }
        // colour selector added here. Data-dependent dropdowns added once grid data is loaded
        if (viewer.colorSchemeSelector_) {
          Dropdowns.createColorSchemeDropdown(viewer);
          addChangeEventToColorSchemeDropdown();
        }

        //load initial data
        loadGrid(viewer.gridInfo_[0]);

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
          Placenames.getPlacenames(viewer);
        }

        return viewer;

      } else {
        Utils.hideLoading();
        let msg = "invalid inputs";
        console.error(msg);
        alert(msg)
        return;
      }

    } else {

      // warn user that their device is not compatible with WebGL
      const warning = WEBGL.getWebGLErrorMessage();
      document.getElementById('container').appendChild(warning);

    }


  };

  /**
  *
  *
  * @function validateInputs
  * @description validates user inputs when initializing the viewer
  */
  function validateInputs() {
    if (viewer.colors_ && viewer.thresholds_) {
      if (viewer.colors_.length !== viewer.thresholds_.length) {
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
      Gui.addHeadingsContainerToDOM(viewer);
    }
    if (viewer.title_) {
      Gui.addTitleToDOM(viewer);
    }
    if (viewer.subtitle_) {
      Gui.addSubtitleToDOM(viewer);
    }
    if (viewer.cellCount_) {
      Gui.addCellCountToDOM(viewer);
    }
    if (viewer.sourcesHTML_) {
      Gui.addSourcesToDOM(viewer);
    }
    if (viewer.homeButton_) {
      Buttons.addHomeButtonToDOM(viewer);
    }
    if (viewer.zoomButtons_) {
      Buttons.addZoomButtonsToDOM(viewer);
    }
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
    viewer.view = select(viewer.renderer.domElement); //for d3 mouse events
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
   * @description Initializes THREE.Raycaster object
   * @function createRaycaster
   */
  function createRaycaster() {
    // for Click and tooltip interaction
    viewer.raycaster = new Raycaster();
    viewer.raycaster.params.Points.threshold = defineRaycasterThreshold();
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
      Dropdowns.createColorScaleDropdown(viewer);
      addChangeEventToColorScaleDropdown();
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
    Tooltip.hideTooltip()
    viewer.colorSchemeName_ = scheme;
    updateColorScale();
    Points.updatePointsColors(viewer, gridCaches[viewer.resolution_]);
    if (viewer.legend_) {
      Legend.updateLegend(viewer);
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

    //update the extent/domain of the values of the new field 
    viewer.colorValuesExtent = extent(gridCaches[viewer.resolution_], d => parseFloat(d[viewer.colorField_]));

    //update the scale function used for colouring
    if (!viewer.colors_) {
      updateColorScale();
    }

    //update the thee.js point colours
    Points.updatePointsColors(viewer, gridCaches[viewer.resolution_]);

    if (viewer.legend_) {
      Legend.updateLegend(viewer);
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
    Points.updatePointsColors(viewer, gridCaches[viewer.resolution_]);
    if (viewer.legend_) {
      Legend.updateLegend(viewer);
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
    Points.updatePointsSizes(viewer, gridCaches[viewer.resolution_]);
    if (viewer._gridLegend) {
      Legend.updateLegend(viewer);
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
    viewer.view.on(viewer.tooltip_.eventType, (event) => {
      let [mouseX, mouseY] = pointer(event);
      let mouse_position = [mouseX, mouseY];
      let intersect = checkIntersects(mouse_position);
      if (intersect) {
        //console.log("Intersect", intersect); //for debugging intersects
        let index = intersect.index;
        let cell = gridCaches[viewer.resolution_][index];
        highlightPoint(intersect);
        Tooltip.showTooltip(viewer, mouse_position, cell);
      } else {
        Tooltip.hideTooltip();
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
    if (viewer.zoomButtons_) {
      viewer.zoominButtonNode.addEventListener("click", () => {
        viewer.zoomIn(2);
      })
      viewer.zoomoutButtonNode.addEventListener("click", () => {
        viewer.zoomOut(0.5);
      })
    }
  }


  /**
  * @description zoom in (reduce camera Z position)
  * @function zoomIn
  * @parameter scaleFactor 
  */
  viewer.zoomIn = function (scaleFactor) {
    // when we zoom, we have to update both the threejs camera and the d3 zoom
    viewer.view.transition().call(viewer.d3zoom.scaleBy, scaleFactor);
    Camera.setCamera(viewer.camera.position.x, viewer.camera.position.y, viewer.camera.position.z / scaleFactor)
  }

  /**
* @description zoom out (increase camera Z position)
* @function zoomOut
* @parameter scaleFactor 
*/
  viewer.zoomOut = function (scaleFactor) {
    // when we zoom, we have to update both the threejs camera and the d3 zoom
    viewer.view.transition().call(viewer.d3zoom.scaleBy, scaleFactor);
    Camera.setCamera(viewer.camera.position.x, viewer.camera.position.y, viewer.camera.position.z / scaleFactor)
  }


  /**
  * @description move camera to show the entire extent of the grid, and update the zoom transform. TODO: this theoretically should show the initial (home) zoom position, not necesarily the full extent.
  * @function viewWholeGrid
  */
  function viewWholeGrid() {
    // when we zoom, we have to update both the threejs camera and the d3 zoom

    if (viewer._mobile) {

      let scale = getScaleFromZ(viewer.cameraConfig.initialZ_)
      viewer.d3zoom.scaleTo(viewer.view, scale);
      viewer.d3zoom.translateTo(viewer.view,
        parseInt(viewer.center_[0]) + viewer.width_ / 2,
        parseInt(viewer.center_[1]) + viewer.height_ / 2);
      Camera.setCamera(viewer.center_[0], viewer.center_[1], viewer.cameraConfig.initialZ_)

      // mobile devices a transform
      let initial_scale = getScaleFromZ(viewer.cameraConfig.far_);
      let initial_transform = zoomIdentity
        .translate(viewer.width_ / 2, viewer.height_ / 2)
        .scale(initial_scale);
      viewer.d3zoom.transform(viewer.view, initial_transform);

    } else {
      let scale = getScaleFromZ(viewer.cameraConfig.initialZ_)
      viewer.d3zoom.scaleTo(viewer.view, scale);
      viewer.d3zoom.translateTo(viewer.view,
        parseInt(viewer.center_[0]) + viewer.width_ / 2,
        parseInt(viewer.center_[1]) + viewer.height_ / 2);
      Camera.setCamera(viewer.center_[0], viewer.center_[1], viewer.cameraConfig.initialZ_)
    }

  }
  // end of event listeners


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
              if (viewer._mobile && !viewer.mobileCellSize_) {
                let xDomain = extent(csv.map(c => parseFloat(c.x)));
                let yDomain = extent(csv.map(c => parseFloat(c.y)));

                let domain = [
                  min([xDomain, yDomain], array => min(array)),
                  max([xDomain, yDomain], array => max(array))
                ]; // overall min and max values of both axis

                viewer.mobileCoordScaleX = d3scale.scaleLinear().domain(domain).range([-1, 1]);
                viewer.mobileCoordScaleY = d3scale.scaleLinear().domain(domain).range([-1, 1]);
                //update cell sizes and raycaster to fit new webgl-friendly coords

                //distance in x coordinates between two neighbouring cells is the new resolution

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

                //we then calculate the difference between two distinct X coordinates in mobile (webgl) coords
                // note: THIS ONLY WORKS IF THE CELLS ARE NEXT TO EACH OTHER. For this to work all the time we would need the minimum distance between two X coordinates out of ALL neighbours
                let mobileXCoord1 = viewer.mobileCoordScaleX(x1)
                let mobileXCoord2 = viewer.mobileCoordScaleX(x2)
                let difference = Math.abs(mobileXCoord1 - mobileXCoord2);
                difference = difference * 2;

                //giving us our new cell size
                let newResolution = difference;
                viewer.originalResolution = viewer.resolution_;
                viewer.resolution_ = newResolution;
                grid.cellSize = newResolution;
                viewer.pointSize = newResolution;
                viewer.raycaster.params.Points.threshold = newResolution;
                //scale center coords
                if (viewer.center_) {
                  viewer.center_[0] = viewer.mobileCoordScaleX(viewer.center_[0]);
                  viewer.center_[1] = viewer.mobileCoordScaleY(viewer.center_[1]);
                }

              } else if (viewer._mobile && viewer.mobileCellSize_) {
                // new mobile scale
                let xDomain = extent(csv.map(c => parseFloat(c.x)));
                let yDomain = extent(csv.map(c => parseFloat(c.y)));
                let domain = [
                  min([xDomain, yDomain], array => min(array)),
                  max([xDomain, yDomain], array => max(array))
                ]; // overall min and max values of both axis
                viewer.mobileCoordScaleX = d3scale.scaleLinear().domain(domain).range([-1, 1]);
                viewer.mobileCoordScaleY = d3scale.scaleLinear().domain(domain).range([-1, 1]);

                //mobile cell size
                viewer.originalResolution = viewer.resolution_;
                let newResolution = viewer.mobileCellSize_;
                viewer.resolution_ = newResolution;
                grid.cellSize = newResolution;
                viewer.pointSize = newResolution;
                viewer.raycaster.params.Points.threshold = newResolution;
                //scale center coords
                if (viewer.center_) {
                  viewer.center_[0] = viewer.mobileCoordScaleX(viewer.center_[0]);
                  viewer.center_[1] = viewer.mobileCoordScaleY(viewer.center_[1]);
                }
              }

              // add points to cache
              addGridToCache(csv, grid.cellSize);
            } else {
              Utils.hideLoading();
              let msg = "Incorrect csv format. Please use coordinate columns with names 'x' and 'y' and check that colorField is defined correctly.";
              console.error(msg);
              alert(msg)
              return;
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
              Dropdowns.createColorFieldDropdown(viewer, gridCaches);
              addChangeEventToColorFieldDropdown();
            }
            if (viewer.sizeFieldSelector_) {
              Dropdowns.createSizeFieldDropdown(viewer, gridCaches);
              addChangeEventToSizeFieldDropdown()
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
      Utils.hideLoading();
      let msg = "Please specify grid cell size in the units of its coordinate system";
      console.error(msg);
      alert(msg)

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
    if (viewer.colors_ && viewer.thresholds_) {
      return d3scale
        .scaleThreshold()
        .domain(viewer.thresholds_)
        .range(viewer.colors_);
    } else {
      // assign default if user doesnt specify their own function
      if (!viewer.colorScaleFunction_) {

        if (viewer.colorScaleName_ == "scaleSequentialLog") {
          // fix 0 issue for log scales
          if (viewer.colorValuesExtent[0] == 0) {
            viewer.colorValuesExtent[0] = 0.1
          }
        }

        let domain = viewer.colorValuesExtent;

        if (viewer.reverseColorScheme_) {
          domain = domain.reverse();
        }
        //apply thresholds if specified by user
        if (viewer.colorScaleName_ == "scaleSequentialQuantile") {
          // use threshold values as domain
          return d3scale[viewer.colorScaleName_](viewer.thresholds_, d3scaleChromatic[viewer.colorSchemeName_])

        } else {
          return d3scale[viewer.colorScaleName_](domain, d3scaleChromatic[viewer.colorSchemeName_]);
        }

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

    if (viewer.colorScaleName_ == "scaleSequentialLog") {
      // fix 0 issue for log scales
      if (viewer.colorValuesExtent[0] == 0) {
        viewer.colorValuesExtent[0] = 0.1
      }
    }

    if (viewer.colorScaleName_ == "scaleDiverging") {
      domain = [viewer.colorValuesExtent[0], viewer.colorScaleMidpoint, viewer.colorValuesExtent[1]];
    } else {
      domain = viewer.colorValuesExtent;
    }

    //apply thresholds if specified by user
    if (viewer.colorScaleName_ == "scaleSequentialQuantile") {
      // use threshold values as domain
      viewer.colorScaleFunction_ = d3scale[viewer.colorScaleName_](viewer.thresholds_, d3scaleChromatic[viewer.colorSchemeName_])
    } else {
      viewer.colorScaleFunction_ = d3scale[viewer.colorScaleName_](domain, d3scaleChromatic[viewer.colorSchemeName_]);
    }
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
    Geojson.addGeoJsonToScene(features, viewer);
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
            Geojson.addGeoJsonToScene(res.features, viewer);
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

  function addPointsToScene() {

    Points.addPointsToScene(viewer, gridCaches[viewer.resolution_])

    //create or update legend
    if (viewer.showLegend_) {
      if (viewer.legend_) {
        if (viewer._gridLegend) {
          Legend.updateLegend(viewer);
        } else {
          Legend.createLegend(viewer);
        }
      }
    }

    Utils.hideLoading();
    if (!viewer.animating) {
      animate();
    }

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

    viewer.view.call(viewer.d3zoom);

    if (viewer._mobile) {
      //due to a bug on mobile, where the camera shifts unexpectedly on the first pan or zoom event, we have to scale everything to a webgl-friendly range and set the camera to 0,0
      let initial_scale = getScaleFromZ(viewer.cameraConfig.initialZ_);
      var initial_transform = zoomIdentity.translate(viewer.width_ / 2, viewer.height_ / 2).scale(initial_scale);
      viewer.d3zoom.transform(viewer.view, initial_transform);
      Camera.setCamera(0, 0, viewer.cameraConfig.initialZ_)

    } else {
      //initial desktop zoom transform
      let scale = getScaleFromZ(viewer.cameraConfig.initialZ_)
      viewer.d3zoom.scaleTo(viewer.view, scale);
      viewer.d3zoom.translateTo(viewer.view,
        parseInt(viewer.center_[0]) + viewer.width_ / 2,
        parseInt(viewer.center_[1]) + viewer.height_ / 2);
      Camera.setCamera(viewer.center_[0], viewer.center_[1], viewer.cameraConfig.initialZ_)
    }
  }

  function zoomHandlerMobile(event) {
    if (event.sourceEvent) {
      let scale = event.transform.k;
      let x = -(event.transform.x - viewer.width_ / 2) / scale;
      let y = (event.transform.y - viewer.height_ / 2) / scale;
      let z = getZFromScale(scale);
      Camera.setCamera(x, y, z);
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
        Camera.setCamera(pos.x, pos.y, new_z);
      } else {
        // If panning
        const { movementX, movementY } = event.sourceEvent;

        // Adjust mouse movement by current scale and set camera
        const current_scale = getScaleFromZ(viewer.camera.position.z);
        Camera.setCamera(
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
    Tooltip.hideTooltip();
    let scale = getScaleFromZ(event.transform.k);
    if (viewer.debugPlacenames_) {
      console.info(scale);
    }
    // get placenames at certain zoom levels
    if (viewer.showPlacenames_) {
      if (viewer.pointsLayer) {
        if (scale > 0 && scale < viewer.cameraConfig.far_) {
          //placenames are added to the viewer.pointsLayer object
          Placenames.getPlacenames(viewer);
        } else {
          Placenames.removePlacenamesFromScene(viewer);
        }
      }
    }

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
    viewer.raycaster.setFromCamera(mouse_vector, viewer.camera);
    let intersects = viewer.raycaster.intersectObject(viewer.pointsLayer);
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
