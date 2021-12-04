/** @typedef {{ url: object, colorField: string, cellSize: string, sizeField: string }} LayerConfig */

// d3.js
import { zoomIdentity } from "d3-zoom";
import * as d3scaleChromatic from "d3-scale-chromatic";
import * as d3scale from "d3-scale";
import { json, csv } from "d3-fetch";
import { extent, min, max } from "d3-array";
import { pointer } from "d3-selection";

//three.js
import { Vector3, Color, Points } from "three";
import { WEBGL } from '../lib/threejs/WebGL'

// gridviz modules

import * as Placenames from "./placenames/placenames.js";
import * as Buttons from "./gui/buttons.js";
import * as Dropdowns from "./gui/dropdowns.js";
import * as GUI from "./gui/gui";

import { Viewer } from "./viewer/viewer.js";
import { Layer } from './Layer';
import { Style } from './Style';
import { Dataset } from './Dataset';
import { Legend } from './legend/legend';
import { Tooltip } from "./tooltip/tooltip.js";

import { LabelsLayer } from "./placenames/LabelsLayer.js";
import { GeoJsonLayer } from "./GeoJsonLayer";

import { CSVGrid } from './dataset/CSVGrid';
import { TiledGrid } from './dataset/TiledGrid';

//other 
import { feature } from "topojson";
import * as CONSTANTS from "./constants.js";
import * as Utils from "./utils/utils";
import * as Loading from "./gui/loading";
import { app } from "..";

/**
 * Creates a Three.js scene for visualizing x/y data derived from gridded statistics.
 *
 * @author Joseph Davies, Julien Gaffuri
 * @description Generates a webGL app using threejs to visualize grid cells.
 * @requires "THREE"
 * @requires "D3"
 * 
 */
export class App {

  constructor() {
    //output
    let app = this;

    /**
   * The layers.
   * @type {Array.<Layer>}
   * */
    this.layers = [];

    /**
    * Container where viewer will be appended
    * @type {HTMLElement}
    * */
    this.container_ = document.body;

    /**
    * Height of the viewport
    * @type {Number}
    * */
    this.height_ = null;

    /**
    * Width of the viewport
    * @type {Number}
    * */
    this.width_ = null;

    /**
    * Background color of the app
    * @type {String}
    * */
    this.backgroundColor_ = "#ffffff";

    /**
    * Color of cell when highlighted by mouse event
    * @type {String}
    * */
    this.highlightColor_ = "yellow"

    /**
    * style of loading spinner
    * @type {String} ripple | ring | ellipsis | roller
    * */
    this.loadingIcon_ = "ring";

    /**
    * Whether or not to show a legend
    * @type {Boolean}
    * */
    this.showLegend_ = true;

    // tooltip config
    this.tooltip_ = {};

    //d3 Scaling & colouring stuff
    this.colorSchemeName_ = "interpolateBlues";
    this.reverseColorScheme_ = false;
    this.sizeScaleName_ = "scaleSqrt";
    this.colorScaleName_ = "scaleSequentialSqrt";
    this.colorScaleMidpoint_ = 0; // midpoint for diverging scales
    this.colors_ = null;
    this.thresholds_ = null; // for threshold / quantile scales
    this.colorScaleFunction_ = null;
    this.sizeScaleFunction_ = null;

    //dropdowns
    this.colorSchemeSelector_ = false;
    this.colorScaleSelectorLabel_ = "Colour scale: "
    this.colorScaleSelector_ = false;
    this.colorScaleSelectorDefault_ = this.colorScaleName_
    this.colorFieldSelectorLabel_ = "Colour field: "
    this.colorFieldSelector_ = false;
    this.sizeFieldSelector_ = false;
    this.sizeFieldSelectorLabel_ = "Size field: ";

    //projection
    this.EPSG_ = 3035; //used to determine the projection for grid, placenames, NUTS, etc

    // placenames
    this.showPlacenames_ = false;
    this.placenamesCountry_ = false;
    this.placenameThresholds_ = null;

    // dataset properties
    this.geoCenter_ = null; //default - If not specified then should default as first or randomly selected point
    this.zerosRemoved_ = 0; //to make EPSG 3035 files lighter, the final 3 zeros of each x/y coordinate are often removed. 

    //texts
    this.title_ = null;
    this.subtitle_ = null;
    this.cellCount_ = null;
    this.sourcesHTML_ = null;

    //buttons
    this.homeButton_ = false;
    this.zoomButtons_ = false;

    //borders using nuts2json
    this.nuts_ = false; //show topojson borders of europe (available in 3035; 3857, 4258 or 4326)
    this.nutsCountry_ = false; // only show borders of given country code
    this.nutsLevel_ = 0;
    this.nutsSimplification_ = "10M"; //current nuts2json simplification


    this.zoom_ = null; //initial camera position Z
    this.mobileCellSize_ = null; //cell size for mobiles

    //threejs scene (2D = orthographic, 3D = Orbital)
    this.is3D_ = false; // not yet implemented

    //debugging
    this.debugPlacenames_ = false; //logs scale & population filter values in the console upon zoom

    //definition of generic accessors based on the name of each parameter
    for (var p in app)
      (function () {
        var p_ = p;
        app[p_.substring(0, p_.length - 1)] = function (v) { if (!arguments.length) return app[p_]; app[p_] = v; return app; };
      })();

    // internal properties
    this.threejsObject = null; //threejs layer that will contain the grid "points"
    this.animating = false;

    // previously highlighted/intersected cell
    this._previousIntersect;

    this._currentResolution = null; //current grid resolution. e.g. 5000 for EPSG:3035 5km grid

  }

  //overwrite some accessors
  legend(v) {
    console.log("App.Legend() method deprecated. Legend now specified at layer level.");
    return this;
  };
  tooltip(v) {
    for (let key in v) {
      this.tooltip_[key] = v[key];
    }
    return this;
  };

  /**
   *  TODO: resolve a promise once build is complete
   *
   * @function build
   * @description Clears the canvas, builds the app
  */
  build() {

    Loading.createLoadingSpinner(this.container_, this.loadingIcon_);
    Loading.showLoading();

    //check if WebGL compatible device
    if (WEBGL.isWebGLAvailable()) {

      // check that settings are valid
      let valid = this.validateAppConfiguration(this);

      if (valid) {

        this._isMobile = Utils.checkIfMobile();

        //set width/height if unspecified by user
        if (!this.width_) this.width_ = this.getDefaultAppWidth(this);
        if (!this.height_) this.height_ = this.getDefaultAppHeight(this);

        // default zoom if unspecified
        if (!this.zoom_) this.zoom_ = 1000;

        // build threeJS viewer with pan and zoom functionality
        this.viewer = new Viewer({
          width: this.width_,
          height: this.height_,
          container: this.container_,
          geoCenter: this.geoCenter_,
          isMobile: this._isMobile,
          is3D: this.is3D_,
          zoom: this.zoom_,
          zerosRemoved: this.zerosRemoved_
        });

        //add tooltip
        this._tooltip = new Tooltip(this.container_, this.tooltip_);

        // window.resize
        this.addResizeEvent();

        // view.onHover
        this.addMouseEventsToView();

        // add NUTS geometries to viewer as geojson
        if (this.nuts_) this.loadNuts2json(CONSTANTS.nuts_base_URL + this.EPSG_ + "/" + this.nutsSimplification_ + "/" + this.nutsLevel_ + ".json");

        //add titles, sources texts to DOM 
        this.addInitialElementsToDOM();

        // handle viewer's pan & zoom end
        this.viewer.on("zoomEnd", (e) => { this.onZoomEnd(e) });

        //request initial placenames
        if (this.showPlacenames_) {
          //add layer to scene
          this.labelsLayer = new LabelsLayer();
          this.viewer.scene.add(this.labelsLayer);
          Placenames.getPlacenames(this);
        }

        //add container for dropdowns - Deprecate dropdowns?
        // if (this.colorSchemeSelector_ || this.colorScaleSelector_ || this.sizeFieldSelector_ || this.colorFieldSelector_) {
        //   GUI.addSelectorsContainerToDOM(this);
        // }
        // colour selector added here. Data-dependent dropdowns added once grid data is loaded
        // if (this.colorSchemeSelector_) {
        //   Dropdowns.createColorSchemeDropdown(this);
        // }

        this.animating = true;
        this.animate();

        Loading.hideLoading();

        return this;

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

  /**
   * @description Event handler for when viewer pan or zoom event has finished
   * @param {*} event
   * @memberof App
   */
  onZoomEnd(event) {
    //this._tooltip.hide();

    // show/hide layers within new Envelope
    this.redraw();

    // get zoom-dependent placenames
    if (this.showPlacenames_) {
      let scale = Utils.getScaleFromZ(this.height_, this.viewer.camera.config.fov_, event.transform.k);
      Placenames.updatePlacenameLabels(this, scale);
    }
  }

  /**
   * @description Determines which layers to draw and shows or hides them
   * @memberof App
   * @function redraw
   */
  redraw() {
    // decide which layers to render
    for (const layer of this.layers) {

      //hide layer not within the zoom range
      if (layer.minZoom >= this.viewer.camera.camera.position.z) {
        //this.hideLayer(layer);
        continue;
      };
      if (layer.maxZoom < this.viewer.camera.camera.position.z) {
        //this.hideLayer(layer);
        continue;
      };

      if (layer.dataset.cells || layer.dataset.info) {
        // set current resolution for placename requests
        this.updateCurrentResolution(layer.dataset.resolution);

        // set raycaster threshold (for tooltip hover)
        this.updateRaycasterThreshold(layer.dataset.resolution);

        //create or update legend
        if (this.showLegend_) {
          if (layer.legend) {
            if (layer.__Legend) {
              layer.__Legend.updateLegend();
            } else {
              layer.__Legend = new Legend(layer.legend);
            }
          }
        }

        //get data to show if necessary
        if (layer.dataset.info) {
          layer.dataset.getData(this.viewer.extGeo, () => {
            this.draw(layer);
          });
          this.draw(layer);
        } else {
          //draw cells
          this.draw(layer);
        }



        //show if hidden
        if (layer.hidden == true) {
          this.showLayer(layer);
        }
      }
    }
  }

  /**
 * Draw a layer.
 * 
 * @param {Layer} layer 
 */
  draw(layer) {
    //get cells to draw
    let geoExt = this._isMobile ? this.viewer.envelopeToMobile(this.viewer.getCurrentViewExtent()) : this.viewer.getCurrentViewExtent();
    let cells = layer.dataset.getCells(geoExt);

    if (cells.length > 0) {
      // count cells
      if (this.cellCount_) GUI.updateCellCount(cells.length);

      //debugging
      //console.log(cells[0], this.viewer.camera.camera.position)

      //draw cells, style by style
      for (const style of layer.styles)
        style.draw(cells, layer.dataset.resolution, this.viewer)
    }
  }

  /**
  * TODO: validate all app configurations
  *
  * @function validateAppConfiguration
  * @description validates the app configurations chosen by the user
  */
  validateAppConfiguration() {
    if (this.colors_ && this.thresholds_) {
      if (this.colors_.length !== this.thresholds_.length) {
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
   * @param {Dataset} dataset The dataset to show
   * @param {Array.<Style>} styles The styles, ordered in drawing order.
   * @param {number} minZoom The minimum zoom level when to show the layer
   * @param {number} maxZoom The maximum zoom level when to show the layer
   */
  add(dataset, styles, minZoom, maxZoom) {
    this.layers.push(new Layer(dataset, styles, minZoom, maxZoom));
  }

  /**
   * Add a layer from a CSV grid dataset.
   * 
   * @param {string} url The url of the dataset.
   * @param {number} resolution The dataset resolution (in geographical unit).
   * @param {Array.<Style>} styles The styles, ordered in drawing order.
   * @param {number} minZoom The minimum zoom level when to show the layer
   * @param {number} maxZoom The maximum zoom level when to show the layer
   * @param {function} preprocess A preprocess to run on each cell after loading. It can be used to apply some specific treatment before or compute a new column.
   */
  addCSVGrid(url, resolution, styles, minZoom, maxZoom, preprocess = null) {
    Loading.showLoading();

    this.add(
      new CSVGrid(url, resolution, preprocess).getData(null, (grid) => {
        Loading.hideLoading();

        // for mobile devices
        if (this._isMobile) this.applyMobileSettings(grid);

        // draw cells
        this.redraw();
      }),
      styles, minZoom, maxZoom
    )
  }

  /**
   * Add a layer from a tiled grid dataset.
   * 
   * @param {string} url The url of the dataset info.json file.
   * @param {Array.<Style>} styles The styles, ordered in drawing order.
   * @param {number} minZoom The minimum zoom level when to show the layer
   * @param {number} maxZoom The maximum zoom level when to show the layer
   * @param {function} preprocess A preprocess to run on each cell after loading. It can be used to apply some specific treatment before or compute a new column.
   */
  addTiledGrid(url, styles, minZoom, maxZoom, preprocess = null) {
    this.add(
      new TiledGrid(url, preprocess).loadInfo(() => {
        Loading.hideLoading();

        // for mobile devices
        //if (this._isMobile) this.applyMobileSettings(grid);

        // draw cells
        this.redraw();
      }),
      styles, minZoom, maxZoom
    )
  }

  /**
   * @description Transforms cell coordinates to cartesian coordinates from -1 to 1, cell resolution and the camera Z position
   * @param {CSVGrid} grid
   * @memberof App
   */
  applyMobileSettings(grid) {
    // fix for d3's pan and zoom not working correctly on mobile devices with webgl, we scale the coordinates to a webgl-friendly range
    this.viewer.mobileCoordScale = this.defineMobileCoordScale(grid.cells);

    // transform mobile coords
    if (this._isMobile) {
      grid.cells.forEach((cell, index) => {
        grid.cells[index].x = this.viewer.mobileCoordScale(cell.x);
        grid.cells[index].y = this.viewer.mobileCoordScale(cell.y);
      });
    }

    //set grid resolution to mobile
    let originalResolution = grid.resolution;
    let mobileResolution = this.defineMobileResolution(grid.cells, grid.resolution);
    this.viewer.mobileResolutionScale = originalResolution / mobileResolution;
    grid.resolution = mobileResolution;

    // convert other settings to mobile-friendly coordinates
    if (this.geoCenter_) this.geoCenter([this.viewer.mobileCoordScale(this.geoCenter_[0]), this.viewer.mobileCoordScale(this.geoCenter_[1])]);
    if (this.zoom_) this.zoom(0.1);
    //if (grid.minZoom) grid.minZoom = 
  }


  /** 
  * @description Three.js render loop
  * @function animate
  * 
  */
  animate() {
    var $this = this; // Hold the app's scope, for accessing properties from within the callback method.
    function renderloop() {
      requestAnimationFrame(renderloop);
      $this.viewer.renderer.render($this.viewer.scene, $this.viewer.camera.camera);
      $this.viewer.labelRenderer.render($this.viewer.scene, $this.viewer.camera.camera);
    }
    renderloop();
  }


  /**
   *
   *
   * @param {*} app
   * @param {*} layerConfig
   * @memberof App
   */
  defineGridScalingFunctions(app, layerConfig) {
    this.colorValuesExtent = extent(this.gridCaches[layerConfig.cellSize], d => parseFloat(d[layerConfig.colorField]));
    this.colorScaleFunction_ = this.defineColorScale();
    if (layerConfig.sizeField) {
      this.sizeValuesExtent = extent(this.gridCaches[layerConfig.cellSize], d => parseFloat(d[layerConfig.sizeField]));
      this.sizeScaleFunction_ = this.defineSizeScale();
    }
  }


  /**
   * @description defines a scaling function for transforming geographic coordinates into webgl cartesian coordinates (-1 to 1)
   * @param {Array<Cell>} cells
   * @return {d3scale.scaleLinear} 
   * @memberof App
   */
  defineMobileCoordScale(cells) {
    let mobileCoordScale;

    let xDomain = extent(cells.map(c => parseFloat(c.x)));
    let yDomain = extent(cells.map(c => parseFloat(c.y)));

    let domain = [
      min([xDomain, yDomain], array => min(array)),
      max([xDomain, yDomain], array => max(array))
    ]; // overall min and max values of both axis

    //save mobile-scaling function
    mobileCoordScale = d3scale.scaleLinear().domain(domain).range([-1, 1]);

    return mobileCoordScale;
  }


  /**
   * @description define mobile resolution in webgl
   * @return {Number} 
   * @memberof App
   */
  defineMobileResolution(cells, resolution) {
    let newResolution;

    if (!this.mobileCellSize_) { // cell size not set by user

      // distance between two X coordinates out of two adjacent neighbours
      let mobileXCoord1 = this.viewer.mobileCoordScale(0)
      let mobileXCoord2 = this.viewer.mobileCoordScale(resolution)
      let difference = Math.abs(mobileXCoord1 - mobileXCoord2);
      difference = difference * 2;

      //giving us our new cell size
      newResolution = difference / window.devicePixelRatio;

    } else if (this.mobileCellSize_) {
      // set manually
      newResolution = this.mobileCellSize_;
    }

    return newResolution;
  }


  /**
   * @description if app has already been initialized, calls to geoCenter() method will move existing camera
   *
   * @param {*} v
   * @return {*} 
   * @memberof App
   */
  geoCenter(v) {
    //if already previously set
    if (v && this.viewer) {
      this.geoCenter_ = v;
      this.viewer.camera.redefineCamera(this._isMobile, this.zoom_, this.width_, this.height_);
      this.viewer.camera.camera.setCamera(v[0], v[1], this.viewer.camera.camera.position.z)
    } else {
      //set initial
      if (v) {
        this.geoCenter_ = v;
      }
    }
    return this;
  };


  /**
   * @function zoom
   * @description Sets the three.js camera z value. If the app has already been initialized, calls to zoom() method will move existing camera
   */
  zoom(v) {
    if (v && this.viewer) {
      this.zoom_ = v;
      this.viewer.camera.redefineCamera(this._isMobile, this.zoom_, this.width_, this.height_);
      this.viewer.this.viewer.camera.setCamera(this.viewer.camera.camera.position.x, this.viewer.camera.camera.position.y, v); // Set camera zoom (z position)
    } else {
      if (v) {
        this.zoom_ = v;
      }
    }
    return this;
  };



  /**
  * @description request nuts2json file then add it to the scene
  * @function loadNuts2json
  * @param {String} url of nuts2json file
  */
  loadNuts2json(url) {
    json(url).then(
      json => {
        let newArray;
        if (this.nutsCountry_) {
          newArray = json.objects.nutsrg.geometries.filter((v, i) => {
            return v.properties.id.indexOf(this.nutsCountry_) !== -1; //apply user-defined filter
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
        let geojsonLayer = new GeoJsonLayer(features);
        this.viewer.scene.add(geojsonLayer);

      },
      err => {
        console.error(err);
      }
    );
  }

  /**
   * @description
   * @memberof App
   * @function addInitialElementsToDOM
   */
  addInitialElementsToDOM() {
    // add headings / sources texts
    if (this.title_ || this.subtitle_ || this.cellCount_) {
      GUI.addHeadingsContainerToDOM(this);
    }
    if (this.title_) {
      GUI.addTitleToDOM(this);
    }
    if (this.subtitle_) {
      GUI.addSubtitleToDOM(this);
    }
    GUI.addLegendContainerToDOM(this);
    if (this.cellCount_) {
      GUI.addCellCountToDOM(this);
    }
    if (this.sourcesHTML_) {
      GUI.addSourcesToDOM(this);
    }
    if (!this._isMobile) {
      if (this.homeButton_) {
        Buttons.addHomeButtonToDOM(this);
      }
      if (this.zoomButtons_) {
        Buttons.addZoomButtonsToDOM(this);
      }
    }
  }


  /**
   * @description Adds event listeners to the app viewer, dropdowns and screen resize
   * @function addEventListeners
   */
  addEventListeners() {
    //show population value on click
    this.addMouseEventsToView();
    //change color scheme
    if (this.colorSchemeSelector_) {
      this.addChangeEventToColorSchemeDropdown();
    }
    //change scale
    if (this.colorScaleSelector_) {
      Dropdowns.createColorScaleDropdown(app);
      this.addChangeEventToColorScaleDropdown();
    }
    //screen resize
    this.addResizeEvent();
    //zoom, home buttons etc
    if (!this._isMobile) {
      this.addButtonEvents();
    }

  }

  /**
  * @description Add change event to color-scheme selector
  * @function addChangeEventToColorSchemeDropdown
  */
  addChangeEventToColorSchemeDropdown() {
    this.schemesSelect.addEventListener("change", function (e) {
      this.onChangeColorScheme(e.currentTarget.value);
    });
  }

  /**
  * @description Color scheme dropdown event handler. Updates point colours and legend
  * @function onChangeColorScheme
  * @param {String} scheme Name of the d3-scale-chromatic colour scheme
  */
  onChangeColorScheme(scheme) {
    Tooltip.hideTooltip()
    this.colorSchemeName_ = scheme;
    this.updateColorScale();
    Points.updatePointsColors(app, this.gridConfigs[this._currentResolution], this.gridCaches[this._currentResolution]);
    // if (this.layer._legend) {
    //   this.layer._legend.updateLegend();
    // }
  }

  /**
  * @description Adds change event to color-field select element
  * @function addChangeEventToColorFieldDropdown
  */
  addChangeEventToColorFieldDropdown() {
    this.colorFieldSelect.addEventListener("change", function (e) {
      this.onChangeColorField(e.currentTarget.value);
    });
  }

  /**
  * @description Color csv field dropdown event handler
  * @function onChangeColorField
  * @param {*} field
  */
  onChangeColorField(field) {
    this.gridConfigs[this._currentResolution].colorField = field;

    //update the extent/domain of the values of the new field 
    this.colorValuesExtent = extent(this.gridCaches[this._currentResolution], d => parseFloat(d[this.gridConfigs[this._currentResolution].colorField]));

    //update the scale function used for colouring
    if (!this.colors_) {
      this.updateColorScale();
    }

    //update the thee.js point colours
    Points.updatePointsColors(app, this.gridConfigs[this._currentResolution], this.gridCaches[this._currentResolution]);

    // if (this.legend_) {
    //   Legend.updateLegend(app, this.gridConfigs[this._currentResolution]);
    // }
  }

  /**
  * @description Add change event to color-scale selector
  * @function addChangeEventToColorScaleDropdown
  */
  addChangeEventToColorScaleDropdown() {
    this.colorScaleSelect.addEventListener("change", function (e) {
      this.onChangeColorScale(e.currentTarget.value);
    });
  }

  /**
  * @description Color scale dropdown event handler
  * @function onChangeColorScale
  * @param {String} scale name of d3-scale to be used
  */
  onChangeColorScale(scale) {
    this.colorScaleName_ = scale;
    this.updateColorScale();
    Points.updatePointsColors(app, this.gridConfigs[this._currentResolution], this.gridCaches[this._currentResolution]);
    // if (this.legend_) {
    //   Legend.updateLegend(app, this.gridConfigs[this._currentResolution]);
    // }
  }

  /**
  * @description Add change event to size-field selector
  * @function addChangeEventToSizeFieldDropdown
  */
  addChangeEventToSizeFieldDropdown() {
    this.sizeFieldSelect.addEventListener("change", function (e) {
      this.onChangeSizeField(e.currentTarget.value);
    });
  }

  /**
  * Color csv field dropdown event handler
  *
  * @param {*} field
  */
  onChangeSizeField(field) {
    this.gridConfigs[this._currentResolution].sizeField = field;
    this.updateSizeScale();
    Points.updatePointsSizes(app, this.gridCaches[this._currentResolution]);
    // if (this.__Legend) {
    //   Legend.updateLegend(app, this.gridConfigs[this._currentResolution]);
    // }
  }

  /**
   * @description redefine width and height of app when window is resized
   * @function addResizeEvent
   */
  addResizeEvent() {
    window.addEventListener("resize", () => {
      this.width_ = this.container_.clientWidth;
      this.height_ = this.container_.clientHeight;
      this.viewer.labelRenderer.setSize(this.width_, this.height_);
      this.viewer.renderer.setSize(this.width_, this.height_);
      this.viewer.camera.camera.aspect = this.width_ / this.height_;
      this.viewer.camera.camera.updateProjectionMatrix();
    });
  }

  /**
  * @description attach event listeners to the app
  * @function addMouseEventsToView
  */
  addMouseEventsToView() {
    // show cell value on click
    this.viewer.view.on(this._tooltip.eventType, (event) => {
      let [mouseX, mouseY] = pointer(event);
      let mouse_position = [mouseX, mouseY];
      let intersect = this.checkIntersects(mouse_position);
      if (intersect) {

        // find the Layer that has been intersected
        let intersectedLayer;
        this.layers.find((layer) => {
          return layer.styles.forEach((s) => {
            if (s.threejsObject) {
              if (layer.styles[0].threejsObject.uuid == intersect.object.uuid) {
                intersectedLayer = layer;
              }
            }
          })
        });
        //find cell in original array
        let index = intersect.index;


        let cell;
        if (intersectedLayer.dataset.cells) { // CSVGrid
          cell = intersectedLayer.dataset.cells[index];
        } // TODO: find cell in TiledGrid

        if (cell) {
          //change cell colour
          this.highlightPoint(intersect);

          //show tooltip & update its content
          this._tooltip.show();

          this._tooltip.updateTooltip(cell, mouse_position[0], mouse_position[1], cell.color || 'none')
        }


      } else {
        this._tooltip.hide();
      }
    });
  }

  mouseToThree(mouseX, mouseY) {
    return new Vector3(
      (mouseX / this.width_) * 2 - 1,
      -(mouseY / this.height_) * 2 + 1,
      0.5
    );
  }

  checkIntersects(mouse_position) {
    let mouse_vector = this.mouseToThree(...mouse_position);
    this.viewer.raycaster.setFromCamera(mouse_vector, this.viewer.camera.camera);
    // intersect visible layers
    let intersects = this.viewer.raycaster.intersectObjects(this.viewer.scene.children.filter((obj) => { return obj.visible == true; }));
    if (intersects[0]) {
      let sorted_intersects = this.sortIntersectsByDistanceToRay(intersects);
      let intersect = sorted_intersects[0];
      return intersect;
    } else {
      return false;
    }
  }

  sortIntersectsByDistanceToRay(intersects) {
    return intersects.concat().sort(Utils.sortBy("distanceToRay"));
  }

  /**
  * @description attach event listeners to app buttons
  * @function addButtonEvents
  */
  addButtonEvents() {
    if (this.homeButton_ && this.homeButtonNode) {
      this.homeButtonNode.addEventListener("click", () => {
        //TODO: this theoretically should show the initial (home) zoom position, not necesarily the full extent.
        this.viewWholeGrid();
      })
    }
    if (this.zoomButtons_ && this.zoominButtonNode && this.zoomoutButtonNode) {
      this.zoominButtonNode.addEventListener("click", () => {
        this.zoomIn(2);
      })
      this.zoomoutButtonNode.addEventListener("click", () => {
        this.zoomOut(0.5);
      })
    }
  }

  /**
   * @description zoom in (reduce camera Z position)
   * @function zoomIn
   * @parameter scaleFactor 
   */
  zoomIn(scaleFactor) {
    this.viewer.zoomIn(scaleFactor)
  }

  /**
  * @description zoom out (increase camera Z position)
  * @function zoomOut
  * @parameter scaleFactor 
  */
  zoomOut(scaleFactor) {
    this.viewer.zoomOut(scaleFactor)
  }

  /**
  * @description move camera to show the entire extent of the grid, and update the zoom transform. 
  * @function viewWholeGrid
  */
  viewWholeGrid() {
    // when we zoom, we have to update both the threejs camera and the d3 zoom

    if (this._isMobile) {

      let scale = Utils.getScaleFromZ(this.height_, this.viewer.camera.config.fov_, this.viewer.camera.config.initialZ_)
      this.d3zoom.scaleTo(this.viewer.view, scale);
      this.d3zoom.translateTo(this.viewer.view,
        parseInt(this.geoCenter_[0]) + this.width_ / 2,
        parseInt(this.geoCenter_[1]) + this.height_ / 2);
      this.viewer.camera.setCamera(this.geoCenter_[0], this.geoCenter_[1], this.viewer.camera.config.initialZ_)

      // mobile devices a transform
      let initial_scale = Utils.getScaleFromZ(this.height_, this.viewer.camera.config.fov_, this.viewer.camera.config.far_);
      let initial_transform = zoomIdentity
        .translate(this.width_ / 2, this.height_ / 2)
        .scale(initial_scale);
      this.d3zoom.transform(this.viewer.view, initial_transform);

    } else {
      let scale = Utils.getScaleFromZ(this.height_, this.viewer.camera.config.fov_, this.viewer.camera.config.initialZ_)
      this.d3zoom.scaleTo(this.viewer.view, scale);
      this.d3zoom.translateTo(this.viewer.view,
        parseInt(this.geoCenter_[0]) + this.width_ / 2,
        parseInt(this.geoCenter_[1]) + this.height_ / 2);
      this.viewer.camera.setCamera(this.geoCenter_[0], this.geoCenter_[1], this.viewer.camera.config.initialZ_)
    }

  }
  // end of event listeners


  /**
   * 
   * @function defineColorScale
   * @description defines the initial color scale to be used when colouring grid cells
   *
   */
  defineColorScale() {
    if (this.colors_ && this.thresholds_) {
      return d3scale
        .scaleThreshold()
        .domain(this.thresholds_)
        .range(this.colors_);
    } else {
      // assign default if user doesnt specify their own function
      if (!this.colorScaleFunction_) {

        if (this.colorScaleName_ == "scaleSequentialLog") {
          // fix 0 issue for log scales
          if (this.colorValuesExtent[0] == 0) {
            this.colorValuesExtent[0] = 0.1
          }
        }

        let domain = this.colorValuesExtent;

        if (this.reverseColorScheme_) {
          domain = domain.reverse();
        }
        //apply thresholds if specified by user
        if (this.colorScaleName_ == "scaleSequentialQuantile") {
          // use threshold values as domain
          return d3scale[this.colorScaleName_](this.thresholds_, d3scaleChromatic[this.colorSchemeName_])

        } else {
          return d3scale[this.colorScaleName_](domain, d3scaleChromatic[this.colorSchemeName_]);
        }

      } else {
        return this.colorScaleFunction_;
      }
    }
  }


  /**
   * 
   * @function updateColorScaleFunction
   * @description called when user selects a different colour scheme or scale function
   *
   */
  updateColorScaleFunction() {
    let domain;

    if (this.colorScaleName_ == "scaleSequentialLog") {
      // fix 0 issue for log scales
      if (this.colorValuesExtent[0] == 0) {
        this.colorValuesExtent[0] = 0.1
      }
    }

    if (this.colorScaleName_ == "scaleDiverging") {
      domain = [this.colorValuesExtent[0], this.colorScaleMidpoint, this.colorValuesExtent[1]];
    } else {
      domain = this.colorValuesExtent;
    }

    //apply thresholds if specified by user
    if (this.colorScaleName_ == "scaleSequentialQuantile") {
      // use threshold values as domain
      this.colorScaleFunction_ = d3scale[this.colorScaleName_](this.thresholds_, d3scaleChromatic[this.colorSchemeName_])
    } else {
      this.colorScaleFunction_ = d3scale[this.colorScaleName_](domain, d3scaleChromatic[this.colorSchemeName_]);
    }
  }

  /**
  * 
  * @function updateColorScaleFunction
  * @description called when user selects a different colour scheme or scale function
  *
  */
  updateSizeScaleFunction() {
    if (!this.sizeScaleFunction_) {
      //create if didnt exist upon initialization
      if (!this.sizeValuesExtent) {
        this.sizeValuesExtent = extent(this.gridCaches[this._currentResolution], d => parseFloat(this.gridCaches[this._currentResolution]));
        this.sizeScaleFunction_ = defineSizeScale();
      } else {
        //update
        let domain = this.sizeValuesExtent;
        this.sizeScaleFunction_ = d3scale[this.sizeScaleName_]().domain(domain).range([this._currentResolution / 3, this._currentResolution / 1.5]);
      }
    } else {
      return this.sizeScaleFunction_;
    }
  }

  /**
  * 
  * @function defineSizeScale
  * @description define initial scale function to be used when determining cell size
  *
  */
  defineSizeScale() {
    if (this.sizeScaleFunction_) {
      // user-defined
      return this.sizeScaleFunction_;
    } else {
      // default sizing scale
      return d3scale[this.sizeScaleName_]().domain(this.sizeValuesExtent).range([this._currentResolution / 1.5, this._currentResolution]); //minSize, maxSize
    }
  }

  /**
   * 
   * @description Function exposed to user for adding geojson files to the app
   * @param {String} url URL of geojson file to be added
   * @function addGeoJson
   */
  addGeoJson(url) {
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

  updateColorScale() {
    updateColorScaleFunction();
  }
  updateSizeScale() {
    updateSizeScaleFunction();
  }
  updateCurrentResolution(res) {
    this._currentResolution = res;
  }
  updateRaycasterThreshold(threshold) {
    this.viewer.raycaster.params.Points.threshold = threshold;
  }



  highlightBar(intersect) {
    //removeHighlights();

    let colors = intersect.object.material.color;

    //reset previous intersect colours back to their original values
    if (this.previousIntersect) {
      colors[this.previousIntersect.colourIndex].r = this.previousIntersect.color.r;
      colors[this.previousIntersect.colourIndex].g = this.previousIntersect.color.g;
      colors[this.previousIntersect.colourIndex].b = this.previousIntersect.color.b;
    }

    //position in geometry colour attribute float32Array
    let colourIndex = intersect.index * 3
    let r = colors[colourIndex];
    let g = colors[colourIndex + 1];
    let b = colors[colourIndex + 2];

    this.previousIntersect = {
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

  highlightPoint(intersect) {
    //removeHighlights();

    let colors = intersect.object.geometry.attributes.color.array;

    //reset previous intersect colours back to their original values
    if (this.previousIntersect) {
      colors[this.previousIntersect.colourIndex] = this.previousIntersect.color.r;
      colors[this.previousIntersect.colourIndex + 1] = this.previousIntersect.color.g;
      colors[this.previousIntersect.colourIndex + 2] = this.previousIntersect.color.b;
    }

    //position in geometry colour attribute float32Array
    let colourIndex = intersect.index * 3
    let r = colors[colourIndex];
    let g = colors[colourIndex + 1];
    let b = colors[colourIndex + 2];

    this.previousIntersect = {
      colourIndex: colourIndex,
      color: { r: r, g: g, b: b }
    }

    //highlight
    let newColor = new Color(this.highlightColor_);
    colors[colourIndex] = newColor.r;
    colors[colourIndex + 1] = newColor.g;
    colors[colourIndex + 2] = newColor.b;

    intersect.object.geometry.attributes.color.needsUpdate = true;

  }


  /**
   * Used for 'turning objects on and off'. Could be useful for applying filter upon legend class hover
   *
   * @param {Layer} layer
   */
  hideLayer(layer) {
    layer.styles.forEach((style) => {
      if (style.threejsObject) {
        style.threejsObject.traverse(function (child) {
          if (child instanceof Points) {
            child.visible = false;
          }
        });
        layer.hidden = true;
      }
    })

  }

  /**
   * @description
   * @param {Layer} layer
   * @memberof App
   */
  showLayer(layer) {
    layer.styles.forEach((style) => {
      if (style.threejsObject) {
        style.threejsObject.traverse(function (child) {
          if (child instanceof Points) {
            child.visible = true;
          }
        });
        layer.hidden = false;
      }
    })
  }

  getDefaultAppWidth() {
    return this.container_.clientWidth == window.innerWidth ? this.container_.clientWidth - 1 : this.container_.clientWidth;
  }

  getDefaultAppHeight() {
    return this.container_.clientHeight == "0" ? window.innerHeight - 1 : this.container_.clientHeight;
  }
}


