/** @typedef {{ url: object, colorField: string, cellSize: string, sizeField: string }} LayerConfig */

// d3.js
import { zoomIdentity } from "d3-zoom";
import * as d3scaleChromatic from "d3-scale-chromatic";
import * as d3scale from "d3-scale";
import { json, csv } from "d3-fetch";
import { extent, min, max } from "d3-array";
import { pointer } from "d3-selection";

//three.js
import {
  Vector3,
  Color,
} from "three";
import { WEBGL } from '../lib/threejs/WebGL'

// gridviz modules
import * as Geojson from "./layers/geojson.js";
import * as Tooltip from "./tooltip/tooltip.js";
import * as Placenames from "./placenames/placenames.js";
import * as Legend from "./legend/legend.js";
import { Camera } from "./camera/camera.js";
import * as Zoom from "./zoom/zoom.js";
import * as Buttons from "./gui/buttons.js";
import * as Points from "./layers/points.js";
import * as Dropdowns from "./gui/dropdowns.js";
import * as GUI from "./gui/gui";
import { Viewer } from "./viewer/viewer.js";
import { SquaresLayer } from "./layers/squares.js";

//other 
import { feature } from "topojson";
import * as CONSTANTS from "./constants.js";
import * as Utils from "./utils/utils";
import * as Loading from "./gui/loading";

/**
 * Creates a Three.js scene for visualizing x/y data derived from gridded statistics.
 *
 * @author Joseph Davies, Julien Gaffuri
 * @description Generates a Three.js scene for visualizing large point datasets using WebGL. The library follows a similar structure to that of d3, where parameters are set using a series of accessor functions, each of which returns the main app.
 * @requires "THREE"
 * @requires "D3"
 * 
 */
export function app(options) {
  //output
  let app = {};

  app.layers = [];

  app.container_ = document.body;
  app.height_ = null; //takes container width/height
  app.width_ = null;

  //threejs scene (2D = orthographic, 3D = Orbital)
  app.mode_ = '2D';
  app.cellShape_ = 'square';

  //debugging
  app.debugPlacenames_ = false; //logs scale & population filter values in the console upon zoom

  // TODO: move to layer class:
  app.backgroundColor_ = "#ffffff";
  app.lineColor_ = "rgb(0, 0, 0)";
  app.lineWidth_ = 0.0012;
  app.highlightColor_ = "yellow"
  app.loadingIcon_ = "ring"; //ripple | ring | ellipsis | roller

  // legend
  app.showLegend_ = true;
  app.legend_ = Legend.defaultLegendConfig; // default legend config
  app.__Legend; // legend stored here

  // default tooltip config
  app.tooltip_ = Tooltip.defaultTooltipConfig;

  //d3 Scaling & colouring stuff
  app.colorSchemeName_ = "interpolateBlues";
  app.reverseColorScheme_ = false;
  app.sizeScaleName_ = "scaleSqrt";
  app.colorScaleName_ = "scaleSequentialSqrt";
  app.colorScaleMidpoint_ = 0; // midpoint for diverging scales
  app.colors_ = null;
  app.thresholds_ = null; // for threshold / quantile scales
  app.colorScaleFunction_ = null;
  app.sizeScaleFunction_ = null;

  //dropdowns
  app.colorSchemeSelector_ = false;
  app.colorScaleSelectorLabel_ = "Colour scale: "
  app.colorScaleSelector_ = false;
  app.colorScaleSelectorDefault_ = app.colorScaleName_
  app.colorFieldSelectorLabel_ = "Colour field: "
  app.colorFieldSelector_ = false;
  app.sizeFieldSelector_ = false;
  app.sizeFieldSelectorLabel_ = "Size field: ";

  //projection
  app.EPSG_ = 3035; //used to determine the projection for grid, placenames, NUTS, etc

  // placenames
  app.showPlacenames_ = false;
  app.placenamesCountry_ = false;
  app.placenameThresholds_ = null;

  // dataset properties
  app.geoCenter_ = null; //default - If not specified then should default as first or randomly selected point
  app.zerosRemoved_ = 0; //to make EPSG 3035 files lighter, the final 3 zeros of each x/y coordinate are often removed. 

  //texts
  app.title_ = null;
  app.subtitle_ = null;
  app.cellCount_ = null;
  app.sourcesHTML_ = null;

  //buttons
  app.homeButton_ = false;
  app.zoomButtons_ = false;

  //borders using nuts2json
  app.nuts_ = false; //show topojson borders of europe (available in 3035; 3857, 4258 or 4326)
  app.nutsCountry_ = false; // only show borders of given country code
  app.nutsLevel_ = 0;
  app.nutsSimplification_ = "10M"; //current nuts2json simplification

  app.currentResolution_ = null; //current grid resolution. e.g. 5000 for EPSG:3035 5km grid
  app.zoom_ = null; //initial camera position Z
  app.mobileCellSize_ = null; //cell size for mobiles

  //definition of generic accessors based on the name of each parameter
  for (var p in app)
    (function () {
      var p_ = p;
      app[p_.substring(0, p_.length - 1)] = function (v) { if (!arguments.length) return app[p_]; app[p_] = v; return app; };
    })();

  //override some accesors
  app.legend = function (v) {
    for (let key in v) {
      app.legend_[key] = v[key];
    }
    //update legend if necessary
    if (app.__Legend) {
      Legend.updateLegend(app, gridConfigs[app.currentResolution_])
    }
    return app;
  };
  app.tooltip = function (v) {
    for (let key in v) {
      app.tooltip_[key] = v[key];
    }
    return app;
  };

  // internal properties
  app.pointsLayer = null; //threejs layer that will contain the grid "points"
  app.animating = false;

  // other variables
  let previousIntersect;

  //grid data / configs
  let gridCaches = {}; //resolution: pointsArray
  let gridConfigs = {}; //resolution: config

  /**
   *  TODO: resolve a promise once build is complete
   *
   * @function build
   * @description Clears the canvas, builds the app
  */
  app.build = function () {

    Loading.createLoadingSpinner(app.container_, app.loadingIcon_);
    Loading.showLoading();

    //check if WebGL compatible device
    if (WEBGL.isWebGLAvailable()) {

      // check that settings are valid
      let valid = validateAppConfiguration(app);

      if (valid) {

        app._isMobile = Utils.checkIfMobile();

        //set width/height if unspecified by user
        if (!app.width_) app.width_ = getDefaultAppWidth(app);
        if (!app.height_) app.height_ = getDefaultAppHeight(app);

        // default zoom if unspecified
        if (!app.zoom_) app.zoom_ = 1000;

        // build threeJS viewer
        app.viewer = new Viewer({
          width: app.width_,
          height: app.height_,
          container: app.container_,
          isMobile: app._isMobile,
          zoom: app.zoom_
        });
        //Viewer.build(app)

        // add NUTS geometries to viewer as geojson
        if (app.nuts_) loadNuts2json(CONSTANTS.nuts_base_URL + app.EPSG_ + "/" + app.nutsSimplification_ + "/" + app.nutsLevel_ + ".json");

        //add stuff to DOM 
        addInitialElementsToDOM()

        //add container for dropdowns
        if (this.colorSchemeSelector_ || this.colorScaleSelector_ || this.sizeFieldSelector_ || this.colorFieldSelector_) {
          GUI.addSelectorsContainerToDOM(this);
        }
        // colour selector added here. Data-dependent dropdowns added once grid data is loaded
        if (this.colorSchemeSelector_) {
          Dropdowns.createColorSchemeDropdown(this);
        }

        return app;

      } else {
        Loading.hideLoading();
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

  function getDefaultAppWidth(app) {
    return app.container_.clientWidth == window.innerWidth ? app.container_.clientWidth - 1 : app.container_.clientWidth;
  }

  function getDefaultAppHeight(app) {
    return app.container_.clientHeight == "0" ? window.innerHeight - 1 : app.container_.clientHeight;
  }

  /**
  *
  *
  * @function validateAppConfiguration
  * @description validates app configuration
  */
  function validateAppConfiguration(app) {
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
     * Add a layer.
     * 
     * @param {LayerConfig} layerConfig The layer configuration
     */
  app.addGrid = function (layerConfig) {
    Loading.showLoading();
    if (layerConfig.cellSize) {
      requestGrid(layerConfig).then(
        cells => {
          if (cells) {
            //validate cells
            if (cells[0].x && cells[0].y && cells[0][layerConfig.colorField]) {
              // save grid config
              gridConfigs[layerConfig.cellSize] = layerConfig;
              // set current app resolution (new grid cell size)
              app.currentResolution_ = layerConfig.cellSize;
              // set raycaster threshold
              app.viewer.raycaster.params.Points.threshold = layerConfig.cellSize;

              app.cellCount = cells.length;
              app._cellFields = Object.keys(cells[0]).filter(key => key !== 'x' && key !== 'y');

              //as a temporary hacky fix for d3's pan and zoom not working correctly on mobile devices, we scale the coordinates to a webgl-friendly range
              if (app._isMobile) convertCoordinatesToMobile(app, cells, layerConfig)

              // add points to cache
              addGridToCache(cells, layerConfig);

              //define scales
              defineGridScalingFunctions(app, layerConfig)

              // define app click, dropdown change and screen resize events
              addEventListeners();

              // if center is not specified by user, set center to a cell half way along the array
              if (!app.geoCenter_) {
                let index = parseInt(gridCaches[layerConfig.cellSize].length / 2);
                let c = gridCaches[layerConfig.cellSize][index];
                if (app._isMobile) {
                  app.geoCenter_ = [
                    app.mobileCoordScaleX(parseFloat(c.x)),
                    app.mobileCoordScaleY(parseFloat(c.y))
                  ];
                } else {
                  app.geoCenter_ = [
                    parseFloat(c.x),
                    parseFloat(c.y)
                  ];
                }
              }

              // define pan & zoom for 2D apps
              if (app.mode_ == '2D') {
                Zoom.addPanAndZoom(app);
              } else if (app.mode_ == '3D') {
                app.viewer.camera.camera.createOrbitControls(app)
              }

              //add cells to app
              let newLayer;
              if (app.cellShape_ == "square") {
                newLayer = new SquaresLayer(cells, layerConfig.colorField, app.colorScaleFunction_, layerConfig.cellSize, layerConfig.sizeField, app.sizeScaleFunction_);
              } else if (app.cellShape_ == "cuboid") {
                newLayer = new CuboidsLayer(cells, layerConfig.colorField, app.colorScaleFunction_, layerConfig.cellSize, layerConfig.sizeField, app.sizeScaleFunction_);
              }
              
              // add to app layers array
              app.layers.push(newLayer);
              // add to threeJS viewer
              app.viewer.scene.add(newLayer)

              //create or update legend
              if (app.showLegend_) {
                if (app.legend_) {
                  if (app.__Legend) {
                    Legend.updateLegend(app, layerConfig);
                  } else {
                    Legend.createLegend(app, layerConfig);
                  }
                }
              }

              Loading.hideLoading();
              if (!app.animating) {
                animate();
              }

              // tooltip DOM element
              Tooltip.createTooltipContainer(app);

              if (app.colorFieldSelector_) {
                Dropdowns.createColorFieldDropdown(app, gridConfigs[app.currentResolution_]);
                addChangeEventToColorFieldDropdown();
              }
              if (app.sizeFieldSelector_) {
                Dropdowns.createSizeFieldDropdown(app, gridConfigs[app.currentResolution_]);
                addChangeEventToSizeFieldDropdown()
              }

              // default scale:population thresholds for placenames
              if (app.showPlacenames_ && !app.placenameThresholds_) {
                Placenames.defineDefaultPlacenameThresholds(app);
              }

              //request initial placenames
              if (app.showPlacenames_) {
                Placenames.getPlacenames(app);
              }
            }

            Loading.hideLoading();

          } else {
            Loading.hideLoading();
            let msg = "Incorrect csv format. Please use coordinate columns with names 'x' and 'y' and check that colorField is defined correctly.";
            console.error(msg);
            alert(msg)
            return;
          }
        },
        err => {
          Loading.hideLoading();
          alert(err)
        }
      );
    } else {
      Loading.hideLoading();
      let msg = "Please specify grid cell size in the units of its coordinate system";
      console.error(msg);
      alert(msg)

    }
  }

  function defineGridScalingFunctions(app, layerConfig) {
    app.colorValuesExtent = extent(gridCaches[layerConfig.cellSize], d => parseFloat(d[layerConfig.colorField]));
    app.colorScaleFunction_ = defineColorScale();
    if (layerConfig.sizeField) {
      app.sizeValuesExtent = extent(gridCaches[layerConfig.cellSize], d => parseFloat(d[layerConfig.sizeField]));
      app.sizeScaleFunction_ = defineSizeScale();
    }
  }

  function convertCoordinatesToMobile(app, cells, layerConfig) {
    if (app._isMobile && !app.mobileCellSize_) {
      let xDomain = extent(cells.map(c => parseFloat(c.x)));
      let yDomain = extent(cells.map(c => parseFloat(c.y)));

      let domain = [
        min([xDomain, yDomain], array => min(array)),
        max([xDomain, yDomain], array => max(array))
      ]; // overall min and max values of both axis

      //save mobile-scaling function
      app.mobileCoordScaleX = d3scale.scaleLinear().domain(domain).range([-1, 1]);
      app.mobileCoordScaleY = d3scale.scaleLinear().domain(domain).range([-1, 1]);
      //update cell sizes and raycaster to fit new webgl-friendly coords
      //distance in x coordinates between two neighbouring cells is the new resolution
      // to try to ensure the cells are neighbours, first we have to sort the points by X
      cells.sort(function (a, b) { return a.x - b.x });

      // then we use the first cell, and find the next cell with a distinct X value
      let x1 = cells[0].x;
      let x2;
      cells.some(function (cell) {
        if (cell.x !== x1) {
          x2 = cell.x;
          return true;
        }
      });

      //we then calculate the difference between two distinct X coordinates in mobile (webgl) coords
      // note: this only works if cells are next to each other. 
      // For this to work all the time we would need the minimum distance between two X coordinates out of two adjacent neighbours
      let mobileXCoord1 = app.mobileCoordScaleX(x1)
      let mobileXCoord2 = app.mobileCoordScaleX(x2)
      let difference = Math.abs(mobileXCoord1 - mobileXCoord2);
      difference = difference * 2;

      //giving us our new cell size
      let newResolution = difference;
      app.currentResolution_ = newResolution;
      layerConfig.cellSize = newResolution;
      app.pointSize = newResolution;
      app.viewer.raycaster.params.Points.threshold = newResolution;
      //scale center coords
      if (app.geoCenter_) {
        app.geoCenter_[0] = app.mobileCoordScaleX(app.geoCenter_[0]);
        app.geoCenter_[1] = app.mobileCoordScaleY(app.geoCenter_[1]);
      }

    } else if (app._isMobile && app.mobileCellSize_) {
      // apply cell size manually (with accessor method)
      // new mobile scale
      let xDomain = extent(cells.map(c => parseFloat(c.x)));
      let yDomain = extent(cells.map(c => parseFloat(c.y)));
      let domain = [
        min([xDomain, yDomain], array => min(array)),
        max([xDomain, yDomain], array => max(array))
      ]; // overall min and max values of both axis
      app.mobileCoordScaleX = d3scale.scaleLinear().domain(domain).range([-1, 1]);
      app.mobileCoordScaleY = d3scale.scaleLinear().domain(domain).range([-1, 1]);

      //mobile cell size
      let newResolution = app.mobileCellSize_;
      // app.currentResolution_ = newResolution;
      layerConfig.cellSize = newResolution;
      app.pointSize = newResolution;
      app.viewer.raycaster.params.Points.threshold = newResolution;
      //scale center coords
      if (app.geoCenter_) {
        app.geoCenter_[0] = app.mobileCoordScaleX(app.geoCenter_[0]);
        app.geoCenter_[1] = app.mobileCoordScaleY(app.geoCenter_[1]);
      }
    }

  }

  app.addTiledGrid = function () {

  }



  //if app has already been initialized, calls to geoCenter() method will move existing camera
  app.geoCenter = function (v) {
    //if already previously set
    if (v && app.viewer) {
      app.geoCenter_ = v;
      app.viewer.camera.redefineCamera(app._isMobile, app.zoom_, app.width_, app.height_);
      app.viewer.camera.camera.setCamera(v[0], v[1], app.viewer.camera.camera.position.z)
    } else {
      //set initial
      if (v) {
        app.geoCenter_ = v;
      }
    }
    return app;
  };


  /**
   * @function zoom
   * @description Sets the three.js camera z value. If the app has already been initialized, calls to zoom() method will move existing camera
   */
  app.zoom = function (v) {
    if (v && app.viewer) {
      app.zoom_ = v;
      app.viewer.camera.redefineCamera(app._isMobile, app.zoom_, app.width_, app.height_);
      app.viewer.app.viewer.camera.setCamera(app.viewer.camera.camera.position.x, app.viewer.camera.camera.position.y, v); // Set camera zoom (z position)
    } else {
      if (v) {
        app.zoom_ = v;
      }
    }
    return app;
  };



  /**
 * @description request nuts2json file then add it to the scene
 * @function loadNuts2json
 * @param {String} url of nuts2json file
 */
  function loadNuts2json(url) {
    json(url).then(
      json => {
        let newArray;
        if (app.nutsCountry_) {
          newArray = json.objects.nutsrg.geometries.filter((v, i) => {
            return v.properties.id.indexOf(app.nutsCountry_) !== -1; //apply user-defined filter
          });
        } else {
          newArray = json.objects.nutsrg.geometries.filter((v, i) => {
            return v.properties.id !== "TR"; //omit Turkey
          });
        }
        json.objects.nutsbn.geometries = newArray;
        //topojson to geojson
        let features = feature(json, json.objects.nutsbn).features;
        //add line geometries to app
        Geojson.addGeoJsonToScene(features, app);
      },
      err => {
        console.error(err);
      }
    );
  }

  function addInitialElementsToDOM() {
    // add headings / sources texts
    if (app.title_ || app.subtitle_ || app.cellCount_) {
      GUI.addHeadingsContainerToDOM(app);
    }
    if (app.title_) {
      GUI.addTitleToDOM(app);
    }
    if (app.subtitle_) {
      GUI.addSubtitleToDOM(app);
    }
    if (app.cellCount_) {
      GUI.addCellCountToDOM(app);
    }
    if (app.sourcesHTML_) {
      GUI.addSourcesToDOM(app);
    }
    if (!app._isMobile) {
      if (app.homeButton_) {
        Buttons.addHomeButtonToDOM(app);
      }
      if (app.zoomButtons_) {
        Buttons.addZoomButtonsToDOM(app);
      }
    }
  }


  /**
   * @description Adds event listeners to app, dropdowns and screen resize
   * @function addEventListeners
   */
  function addEventListeners() {
    //show population value on click
    addMouseEventsToView();
    //change color scheme
    if (app.colorSchemeSelector_) {
      addChangeEventToColorSchemeDropdown();
    }
    //change scale
    if (app.colorScaleSelector_) {
      Dropdowns.createColorScaleDropdown(app);
      addChangeEventToColorScaleDropdown();
    }
    //screen resize
    addResizeEvent();
    //zoom, home buttons etc
    if (!app._isMobile) {
      addButtonEvents();
    }

  }

  /**
 * @description Add change event to color-scheme selector
 * @function addChangeEventToColorSchemeDropdown
 */
  function addChangeEventToColorSchemeDropdown() {
    app.schemesSelect.addEventListener("change", function (e) {
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
    app.colorSchemeName_ = scheme;
    updateColorScale();
    Points.updatePointsColors(app, gridConfigs[app.currentResolution_], gridCaches[app.currentResolution_]);
    if (app.legend_) {
      Legend.updateLegend(app, gridConfigs[app.currentResolution_]);
    }
  }

  /**
  * @description Adds change event to color-field select element
  * @function addChangeEventToColorFieldDropdown
  */
  function addChangeEventToColorFieldDropdown() {
    app.colorFieldSelect.addEventListener("change", function (e) {
      onChangeColorField(e.currentTarget.value);
    });
  }

  /**
  * @description Color csv field dropdown event handler
  * @function onChangeColorField
  * @param {*} field
  */
  function onChangeColorField(field) {
    gridConfigs[app.currentResolution_].colorField = field;

    //update the extent/domain of the values of the new field 
    app.colorValuesExtent = extent(gridCaches[app.currentResolution_], d => parseFloat(d[gridConfigs[app.currentResolution_].colorField]));

    //update the scale function used for colouring
    if (!app.colors_) {
      updateColorScale();
    }

    //update the thee.js point colours
    Points.updatePointsColors(app, gridConfigs[app.currentResolution_], gridCaches[app.currentResolution_]);

    if (app.legend_) {
      Legend.updateLegend(app, gridConfigs[app.currentResolution_]);
    }
  }

  /**
  * @description Add change event to color-scale selector
  * @function addChangeEventToColorScaleDropdown
  */
  function addChangeEventToColorScaleDropdown() {
    app.colorScaleSelect.addEventListener("change", function (e) {
      onChangeColorScale(e.currentTarget.value);
    });
  }

  /**
  * @description Color scale dropdown event handler
  * @function onChangeColorScale
  * @param {String} scale name of d3-scale to be used
  */
  function onChangeColorScale(scale) {
    app.colorScaleName_ = scale;
    updateColorScale();
    Points.updatePointsColors(app, gridConfigs[app.currentResolution_], gridCaches[app.currentResolution_]);
    if (app.legend_) {
      Legend.updateLegend(app, gridConfigs[app.currentResolution_]);
    }
  }

  /**
  * @description Add change event to size-field selector
  * @function addChangeEventToSizeFieldDropdown
  */
  function addChangeEventToSizeFieldDropdown() {
    app.sizeFieldSelect.addEventListener("change", function (e) {
      onChangeSizeField(e.currentTarget.value);
    });
  }

  /**
  * Color csv field dropdown event handler
  *
  * @param {*} field
  */
  function onChangeSizeField(field) {
    gridConfigs[app.currentResolution_].sizeField = field;
    updateSizeScale();
    Points.updatePointsSizes(app, gridCaches[app.currentResolution_]);
    if (app.__Legend) {
      Legend.updateLegend(app, gridConfigs[app.currentResolution_]);
    }
  }

  /**
   * @description redefine width and height of app when window is resized
   * @function addResizeEvent
   */
  function addResizeEvent() {
    window.addEventListener("resize", () => {
      app.width_ = app.container_.clientWidth;
      app.height_ = app.container_.clientHeight;
      app.viewer.labelRenderer.setSize(app.width_, app.height_);
      app.viewer.renderer.setSize(app.width_, app.height_);
      app.viewer.camera.camera.aspect = app.width_ / app.height_;
      app.viewer.camera.camera.updateProjectionMatrix();
    });
  }

  /**
  * @description attach event listeners to the app
  * @function addMouseEventsToView
  */
  function addMouseEventsToView() {
    // show cell value on click
    app.viewer.view.on(app.tooltip_.eventType, (event) => {
      let [mouseX, mouseY] = pointer(event);
      let mouse_position = [mouseX, mouseY];
      let intersect = checkIntersects(mouse_position);
      if (intersect) {
        //console.log("Intersect", intersect); //for debugging intersects
        let index = intersect.index;
        let cell = gridCaches[app.currentResolution_][index];
        highlightPoint(intersect);
        Tooltip.showTooltip(app, mouse_position, cell);
      } else {
        Tooltip.hideTooltip();
      }
    });
  }

  /**
  * @description attach event listeners to app buttons
  * @function addButtonEvents
  */
  function addButtonEvents() {
    if (app.homeButton_ && app.homeButtonNode) {
      app.homeButtonNode.addEventListener("click", () => {
        //TODO: this theoretically should show the initial (home) zoom position, not necesarily the full extent.
        viewWholeGrid();
      })
    }
    if (app.zoomButtons_ && app.zoominButtonNode && app.zoomoutButtonNode) {
      app.zoominButtonNode.addEventListener("click", () => {
        app.zoomIn(2);
      })
      app.zoomoutButtonNode.addEventListener("click", () => {
        app.zoomOut(0.5);
      })
    }
  }

  /**
   * @description zoom in (reduce camera Z position)
   * @function zoomIn
   * @parameter scaleFactor 
   */
  app.zoomIn = function (scaleFactor) {
    Zoom.zoomIn(app, scaleFactor)
  }

  /**
* @description zoom out (increase camera Z position)
* @function zoomOut
* @parameter scaleFactor 
*/
  app.zoomOut = function (scaleFactor) {
    Zoom.zoomOut(app, scaleFactor)
  }

  /**
  * @description move camera to show the entire extent of the grid, and update the zoom transform. 
  * @function viewWholeGrid
  */
  function viewWholeGrid() {
    // when we zoom, we have to update both the threejs camera and the d3 zoom

    if (app._isMobile) {

      let scale = Utils.getScaleFromZ(app.height_, app.viewer.camera.config.fov_, app.viewer.camera.config.initialZ_)
      app.d3zoom.scaleTo(app.viewer.view, scale);
      app.d3zoom.translateTo(app.viewer.view,
        parseInt(app.geoCenter_[0]) + app.width_ / 2,
        parseInt(app.geoCenter_[1]) + app.height_ / 2);
      app.viewer.camera.setCamera(app.geoCenter_[0], app.geoCenter_[1], app.viewer.camera.config.initialZ_)

      // mobile devices a transform
      let initial_scale = Utils.getScaleFromZ(app.height_, app.viewer.camera.config.fov_, app.viewer.camera.config.far_);
      let initial_transform = zoomIdentity
        .translate(app.width_ / 2, app.height_ / 2)
        .scale(initial_scale);
      app.d3zoom.transform(app.viewer.view, initial_transform);

    } else {
      let scale = Utils.getScaleFromZ(app.height_, app.viewer.camera.config.fov_, app.viewer.camera.config.initialZ_)
      app.d3zoom.scaleTo(app.viewer.view, scale);
      app.d3zoom.translateTo(app.viewer.view,
        parseInt(app.geoCenter_[0]) + app.width_ / 2,
        parseInt(app.geoCenter_[1]) + app.height_ / 2);
      app.viewer.camera.setCamera(app.geoCenter_[0], app.geoCenter_[1], app.viewer.camera.config.initialZ_)
    }

  }
  // end of event listeners




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
   * @param {*} cells 
   * @param {LayerConfig} layerConfig
   */
  function addGridToCache(cells, layerConfig) {
    let res = layerConfig.cellSize;
    if (cells) {
      if (app._isMobile) {
        for (let i = 0; i < cells.length; i++) {
          //scale mobile coordinates to avoid d3 pan/zoom bug 
          let point = cells[i];
          point.x = app.mobileCoordScaleX(parseFloat(cells[i].x));
          point.y = app.mobileCoordScaleY(parseFloat(cells[i].y));
          if (!gridCaches[res]) gridCaches[res] = [];
          gridCaches[res].push(point);
        }
      } else {
        if (!gridCaches[res]) gridCaches[res] = cells
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
    if (app.colors_ && app.thresholds_) {
      return d3scale
        .scaleThreshold()
        .domain(app.thresholds_)
        .range(app.colors_);
    } else {
      // assign default if user doesnt specify their own function
      if (!app.colorScaleFunction_) {

        if (app.colorScaleName_ == "scaleSequentialLog") {
          // fix 0 issue for log scales
          if (app.colorValuesExtent[0] == 0) {
            app.colorValuesExtent[0] = 0.1
          }
        }

        let domain = app.colorValuesExtent;

        if (app.reverseColorScheme_) {
          domain = domain.reverse();
        }
        //apply thresholds if specified by user
        if (app.colorScaleName_ == "scaleSequentialQuantile") {
          // use threshold values as domain
          return d3scale[app.colorScaleName_](app.thresholds_, d3scaleChromatic[app.colorSchemeName_])

        } else {
          return d3scale[app.colorScaleName_](domain, d3scaleChromatic[app.colorSchemeName_]);
        }

      } else {
        return app.colorScaleFunction_;
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

    if (app.colorScaleName_ == "scaleSequentialLog") {
      // fix 0 issue for log scales
      if (app.colorValuesExtent[0] == 0) {
        app.colorValuesExtent[0] = 0.1
      }
    }

    if (app.colorScaleName_ == "scaleDiverging") {
      domain = [app.colorValuesExtent[0], app.colorScaleMidpoint, app.colorValuesExtent[1]];
    } else {
      domain = app.colorValuesExtent;
    }

    //apply thresholds if specified by user
    if (app.colorScaleName_ == "scaleSequentialQuantile") {
      // use threshold values as domain
      app.colorScaleFunction_ = d3scale[app.colorScaleName_](app.thresholds_, d3scaleChromatic[app.colorSchemeName_])
    } else {
      app.colorScaleFunction_ = d3scale[app.colorScaleName_](domain, d3scaleChromatic[app.colorSchemeName_]);
    }
  }

  /**
  * 
  * @function updateColorScaleFunction
  * @description called when user selects a different colour scheme or scale function
  *
  */
  function updateSizeScaleFunction() {
    if (!app.sizeScaleFunction_) {
      //create if didnt exist upon initialization
      if (!app.sizeValuesExtent) {
        app.sizeValuesExtent = extent(gridCaches[app.currentResolution_], d => parseFloat(gridCaches[app.currentResolution_]));
        app.sizeScaleFunction_ = defineSizeScale();
      } else {
        //update
        let domain = app.sizeValuesExtent;
        app.sizeScaleFunction_ = d3scale[app.sizeScaleName_]().domain(domain).range([app.currentResolution_ / 3, app.currentResolution_ / 1.5]);
      }
    } else {
      return app.sizeScaleFunction_;
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
    if (app.sizeScaleFunction_) {
      return app.sizeScaleFunction_;
    } else {
      return d3scale[app.sizeScaleName_]().domain(app.colorValuesExtent).range([app.currentResolution_ / 3, app.currentResolution_ / 1.5]); //minSize, maxSize
    }
  }

  /**
   * 
   * @description Function exposed to user for adding geojson files to the app
   * @param {String} url URL of geojson file to be added
   * @function addGeoJson
   */
  app.addGeoJson = function (url) {
    json(url).then(
      res => {
        if (res.features) {
          if (res.features.length > 0) {
            Geojson.addGeoJsonToScene(res.features, app);
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
  * @description Three.js render loop
  * @function animate
  * 
  */
  function animate() {
    //let time = Date.now() * 0.005;
    //app.pointsLayer.position.x = 0.02 * time;
    app.animating = true;
    requestAnimationFrame(animate);
    app.viewer.renderer.render(app.viewer.scene, app.viewer.camera.camera);
    app.viewer.labelRenderer.render(app.viewer.scene, app.viewer.camera.camera);
  }


  function mouseToThree(mouseX, mouseY) {
    return new Vector3(
      (mouseX / app.width_) * 2 - 1,
      -(mouseY / app.height_) * 2 + 1,
      0.5
    );
  }

  function checkIntersects(mouse_position) {
    let mouse_vector = mouseToThree(...mouse_position);
    app.viewer.raycaster.setFromCamera(mouse_vector, app.viewer.camera.camera);
    let intersects = app.viewer.raycaster.intersectObject(app.layers[0]); // intersect first layer TODO: intersect all layers
    if (intersects[0]) {
      let sorted_intersects = sortIntersectsByDistanceToRay(intersects);
      let intersect = sorted_intersects[0];
      return intersect;
    } else {
      return false;

    }
  }

  function sortIntersectsByDistanceToRay(intersects) {
    return intersects.concat().sort(Utils.sortBy("distanceToRay"));
  }

  function highlightBar(intersect) {
    //removeHighlights();

    let colors = intersect.object.material.color;

    //reset previous intersect colours back to their original values
    if (previousIntersect) {
      colors[previousIntersect.colourIndex].r = previousIntersect.color.r;
      colors[previousIntersect.colourIndex].g = previousIntersect.color.g;
      colors[previousIntersect.colourIndex].b = previousIntersect.color.b;
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
    colors[colourIndex].r = newColor.r;
    colors[colourIndex].g = newColor.g;
    colors[colourIndex].b = newColor.b;

    intersect.object.geometry.attributes.color.needsUpdate = true;

  }

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
    let newColor = new Color(app.highlightColor_);
    colors[colourIndex] = newColor.r;
    colors[colourIndex + 1] = newColor.g;
    colors[colourIndex + 2] = newColor.b;

    intersect.object.geometry.attributes.color.needsUpdate = true;

  }


  /**
   * Used for 'turning objects on and off'. Could be useful for applying filter upon legend class hover
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

  return app;
}
