import * as d3ScaleChromatic from "d3-scale-chromatic";
import * as d3Scale from "d3-scale";
import * as d3Zoom from "d3-zoom";
import * as d3Selection from "d3-selection";
import * as d3Fetch from "d3-fetch";
import * as d3Array from "d3-array";
import * as d3Format from "d3-format";
import * as LEGEND from "d3-svg-legend";
import {
  Scene,
  OrthographicCamera,
  PerspectiveCamera,
  WebGLRenderer,
  Points,
  PointsMaterial,
  Geometry,
  Vector3,
  Vector2,
  Color,
  Raycaster,
  Object3D,
  Float32BufferAttribute,
  BufferGeometry,
  Group,
  Texture,
  ShaderMaterial
} from "three";
import * as THREE from "three/src/constants";
// extra Three.js modules not included in main build
import { Line2 } from "../assets/js/lines/Line2";
import { LineSegments2 } from "../assets/js/lines/LineSegments2";
import { LineGeometry } from "../assets/js/lines/LineGeometry";
import { LineMaterial } from "../assets/js/lines/LineMaterial";
import { CSS2DRenderer, CSS2DObject } from "../assets/js/CSS2D/CSS2DRenderer";
import { sortBy } from "lodash";
import * as TopoJSON from "topojson";

import * as CONSTANTS from "./constants.js";
import * as Utils from "../utils/utils";
import "./styles.css";

//TODO list:
//
//Resize bug:
//https://stackoverflow.com/questions/41814539/html-div-height-keeps-growing-on-window-resize-event
//container_element.style.lineHeight = 0; fixes resize bug, but placenames loose background styling.
//
//Go to center instead of transforming coordinates
//Apply setters to input options params
// Placenames in different CRS
//DatasourceURL (multiple grids must have defined scale-resolution thresholds)
//FIX placenames 'extent' request parameter
//

/**
 * Creates a 2D Three.js scene for visualizing point data derived from gridded statistics.
 *
 * @author Joseph Davies
 * @requires "THREE"
 * @requires "D3"
 * @param {} options
 * @param {HTMLElement} [options.container_element = document.body] - The DOM element used for the THREE.js renderer.
 * @param {number} [options.background_color = 0x000000] - THREE.Scene background color (hexidecimal).
 * @param {number} [options.border_color = 0xffffff] - THREE.Line2 color (hexidecimal).
 * @param {string} [options.color_scheme = "interpolateTurbo"] - D3 Scale-Chromatic color scheme to use for cell-coloring.
 * @param {boolean} [options.showLegend = true] - THREE.Line2 color (hexidecimal).
 * @param {boolean} [options.showColorSchemeSelector = true] - THREE.Line2 color (hexidecimal).
 * @description User defined parameters
 */
export function viewer(options) {
  //output object
  let viewer = {};

  //styles
  viewer.container_ = document.body;
  viewer.height_ = window.innerHeight;
  viewer.width_ = window.innerWidth;
  viewer.backgroundColor_ = "#b7b7b7";
  viewer.borderColor_ = "#ffffff";
  viewer.highlightColor_ = "#37f2d6"
  viewer.loadingIcon_ = "ripple"; //ripple | ring

  //d3-legend.susielu.com
  viewer.legend_ = {
    width: 140,
    height: 320,
    orientation: "vertical",
    title: "Legend",
    titleWidth: 50,
    width: null,
    format: d3Format.format(".0s"),
    cells: 13,
    shapeWidth: 30
  };

  //d3 Scale stuff
  viewer.colorScheme_ = "interpolateTurbo";
  viewer.colors_ = null;
  viewer.thresholdValues_ = null;
  viewer.colorSchemeSelector_ = true;
  viewer.d3ScaleSelector_ = false;
  viewer.colorScaleFunction_ = "scaleSequential"; //scaleSequential or scaleDiverging & their respective variants
  viewer.sizeScaleFunction = "scaleSqrt"; //scaleSequential or scaleDiverging & their respective variants
  viewer.colorScale_ = null; //requires .range and .domain functions
  viewer.sizeScale_ = null;  //requires .range and .domain functions

  //data params
  viewer.EPSG_ = 3035; //used to determine grid rendering; placenames; and nuts2json requests.
  viewer.center_ = null; //default - If not specified then should default as first or randomly selected point
  viewer.zerosRemoved_ = false; //to make EPSG 3035 files lighter, the final 3 zeros of each x/y coordinate are often removed. 
  viewer.colorColumn_ = null;
  viewer.sizeColumn_ = null;
  viewer.title_ = null;
  viewer.nuts2json_ = false; //show topojson borders of europe (available in 3035; 3857, 4258 or 4326)
  viewer.data_ = null;
  //data
  viewer.resolution_ = null; //current grid resolution. e.g. 5000 for EPSG:3035 5km grid
  //camera
  viewer.camera = {}
  viewer.camera.near_ = null;
  viewer.camera.far_ = null; //set min zoom
  viewer.camera.fov_ = null;
  viewer.camera.aspect_ = null;
  viewer.zoom_ = null; //initial camera position Z

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
    return viewer;
  };

  // other variables
  let lineMaterial,
    boundariesGroup, //THREE.Group for nuts borders
    pointsMaterial,
    pointsGeometry,
    camera,
    raycaster,
    points,
    previousIntersect,
    tooltipContainer,
    tooltipTemplate,
    tooltip,
    pointTip,
    labelTip,
    valuesExtent, //d3array.extent of grid
    gridLegend,
    view,
    labelRenderer,
    schemesSelect,
    renderer;

  // initial states
  let nuts_simplification = "20M"; //current nuts2json
  let tooltip_state = {
    display: "none"
  };
  let gridCaches = {};
  let gridConfigs = {};
  let gridConfig = {};

  Utils.createLoadingSpinner(viewer.container_, viewer.loadingIcon_);

  //clear canvas, build threejs viewer and append grid
  viewer.build = function () {
    let valid = validateInputs();

    if (valid) {
      //set container height and width
      viewer.container_.classList.add("gridviz-container");
      viewer.container_.style.width =
        viewer.width_ + "px";
      viewer.container_.style.height =
        viewer.height_ + "px";
      //set resolution
      if (!viewer.resolution_) {
        viewer.resolution_ = viewer.data_[0].cellSize
      }
      gridConfig = defineGridConfig();

      createScene();
      if (!labelRenderer) createLabelRenderer();
      if (!renderer) createWebGLRenderer();

      createCamera();
      createRaycaster();
      addPanAndZoom();
      //setUpZoom();
      createTooltipContainer();
      if (viewer.colorSchemeSelector_) {
        createColorSchemeDropdown();
      }

      //load initial data
      loadGrid(viewer.data_[0]);

      if (viewer.nuts2json_) {
        loadBordersJson(
          CONSTANTS.nuts_base_URL +
          viewer.EPSG_ +
          "/" +
          nuts_simplification +
          "/0.json"
        );
      }


      addEventListeners();
      return viewer;
    } else { return }
  };

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


  /**
   * Create renderer for three.js scene and append to container element.
   *
   */
  function createWebGLRenderer() {
    renderer = new WebGLRenderer();
    renderer.setSize(viewer.width_, viewer.height_);
    viewer.container_.appendChild(renderer.domElement);
    view = d3Selection.select(renderer.domElement); //for d3 mouse events
  }

  /**
   * Create renderer for placename labels. Uses CSS2DRenderer which is not currently in main Three.js build
   *
   */
  function createLabelRenderer() {
    labelRenderer = new CSS2DRenderer();
    labelRenderer.setSize(viewer.width_, viewer.height_);
    labelRenderer.domElement.style.position = "absolute";
    //labelRenderer.domElement.style.top = "0px";
    viewer.container_.appendChild(labelRenderer.domElement);
  }

  /**
   * Initialize THREE camera object
   *
   */
  function createCamera() {
    //camera
    viewer.camera.near_ = CONSTANTS.near;
    viewer.camera.far_ = defineFar(); //set min zoom
    viewer.camera.fov_ = CONSTANTS.fov;
    viewer.camera.aspect_ = viewer.width_ / viewer.height_;
    viewer.camera.zoom_ = viewer.zoom_ || viewer.camera.far_ / 2 - 1; //initial camera position Z
    camera = new PerspectiveCamera(
      viewer.camera.fov_,
      viewer.camera.aspect_,
      viewer.camera.near_,
      viewer.camera.far_
    );

    //if user hasnt specified center, move camera to cell halfway through grid cache array
    if (!viewer.center_) {
      camera.position.set(0, 0, viewer.camera.zoom_); // Set initial camera position
      camera.lookAt(new Vector3(0, 0, 0.1)); // Set initial camera position
    } else {
      camera.position.set(viewer.center_[0], viewer.center_[1], viewer.camera.zoom_); // Set initial camera position
      camera.lookAt(new Vector3(viewer.center_[0], viewer.center_[1], 0.1)); // Set initial camera position
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
    // camera.position.set(x, y, z);
  }

  /**
   * Initialize THREE.Raycaster object
   *
   */
  function createRaycaster() {
    // Click and tooltip interaction
    raycaster = new Raycaster();
    raycaster.params.Points.threshold = gridConfig.raycaster_threshold;
  }

  /**
   * Add event listeners to DOM elements
   *
   */
  function addEventListeners() {
    //show population value on click
    addMouseEventsToView();
    //change color scheme
    if (viewer.colorSchemeSelector_) {
      addChangeEventToColorDropdown();
    }
    //screen resize
    addResizeEvent();
  }

  /**
   * Build THREE.Scene
   *
   */
  function createScene() {
    viewer.scene = new Scene();
    viewer.scene.background = new Color(viewer.backgroundColor_);
  }

  function defineGridConfig() {
    let config = {};
    config.raycaster_threshold = defineRaycasterThreshold();
    config.point_size = definePointSize();
    return config;
  }

  /**
   * Define the threshold for raycasting grid cells at the specified resolution. Value represents the distance from the center of the cell's point object.
   *
   *
   */
  function defineRaycasterThreshold() {
    return viewer.resolution_;
  }

  /**
   * Define the point_size parameter for THREE.points objects at the specified resolution
   *
   *
   */
  function definePointSize() {
    return viewer.resolution_; //INVESTIGATE: why does threejs pointSize value not correspond with the grid resolution?
  }

  /**
   * Define the far parameter for THREE.camera.
   * The far parameter represents the furthest possible distance that the camera can be from the plane (where z=0)
   *
   */
  function defineFar() {
    return viewer.resolution_ * 2000;
  }

  /**
   * request grid, save it to the cache, and add it to the scene
   *
   * @param grid data object from options parameters
   */
  function loadGrid(grid) {
    Utils.showLoading();
    if (grid.cellSize) {
      requestGrid(grid).then(
        err => {
          if (!err) {
            //define scales
            viewer.valuesExtent = d3Array.extent(gridCaches[viewer.resolution_], d => d.value);
            viewer.colorScale_ = defineColorScale();
            if (viewer.sizeColumn_) viewer.sizeScale_ = defineSizeScale();

            if (!viewer.center_) {
              let index = parseInt(gridCaches[viewer.resolution_].length / 2);
              let c = gridCaches[viewer.resolution_][index];
              viewer.center_ = [
                parseFloat(c.position[0]),
                parseFloat(c.position[1])
              ];
              camera.position.set(
                viewer.center_[0],
                viewer.center_[1],
                viewer.camera.zoom_
              );
              camera.lookAt(new Vector3(viewer.center_[0], viewer.center_[1], 0)); // Set initial camera position
            }
            addPointsToScene();
          }

          Utils.hideLoading();
        },
        err => console.log(err)
      );
    } else {
      console.error(
        "Please specify grid cell size in the units of its coordinate system"
      );
    }
  }

  /**
   * TODO: replace with requestTile() and addTileToCache() for CSVTiles endpoint
   *
   *
   * @returns Promise
   */
  function requestGrid(grid) {
    return d3Fetch.csv(grid.url).then(
      csv => {
        //validate csv
        if (csv[0].x && csv[0].y && csv[0][viewer.colorColumn_]) {
          console.log("Cells:" + csv.length)
          addGridToCache(csv, grid.cellSize);
        } else {
          return console.error(
            "Incorrect csv format. Please use coordinate columns with names 'x' and 'y'"
          );
        }
      },
      err => console.error(err)
    );
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
        let value = csv[i][viewer.colorColumn_];
        let point = {
          position,
          value
        };
        if (!gridCaches[res]) gridCaches[res] = [];
        gridCaches[res].push(point);
      }
    }
  }

  //any scale accepted by d3-legend.susielu.com
  function defineColorScale() {
    if (viewer.colors_ && viewer.thresholdValues_) {
      return d3Scale
        .scaleThreshold()
        .domain(viewer.thresholdValues_)
        .range(viewer.colors_);
    } else {
      if (viewer.colorScaleFunction_ == "scaleDiverging") {
        return d3Scale[viewer.colorScaleFunction_](d3ScaleChromatic[viewer.colorScheme_]).domain([viewer.valuesExtent[0], 0, viewer.valuesExtent[1]])
      } else {
        return d3Scale[viewer.colorScaleFunction_](d3ScaleChromatic[viewer.colorScheme_]).domain(viewer.valuesExtent)
      }
    }
  }


  function defineSizeScale() {
    //default scale
    let func = d3Scale[viewer.sizeScaleFunction];
    return func().domain(viewer.valuesExtent).range([viewer.resolution_ / 3, viewer.resolution_ / 1.5]); //minSize, maxSize
  }

  /**
   * request nuts2json file then add it to the scene
   *
   * @param {*} url
   */
  function loadBordersJson(url) {
    d3Fetch.json(url).then(
      json => {
        let newArray = json.objects.nutsrg.geometries.filter((v, i) => {
          return v.properties.id !== "TR"; //omit Turkey
        });
        json.objects.nutsbn.geometries = newArray;
        let features = TopoJSON.feature(json, json.objects.nutsbn).features;
        addBoundariesToScene(features);
      },
      err => {
        console.error(err);
      }
    );
  }

  /**
   * Create THREE.Group and append line geometries from GeoJSON features
   *
   * @param {*} features
   */
  function addBoundariesToScene(features) {
    let coords = [];
    let initial = true;
    if (!boundariesGroup) {
      boundariesGroup = new Group();
      boundariesGroup.renderOrder = 999; //always on top
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
              xyz = {
                x: feature.geometry.coordinates[c][s][0] / 1000,
                y: feature.geometry.coordinates[c][s][1] / 1000,
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
                xyz = {
                  x: feature.geometry.coordinates[c][s][m][0] / 1000,
                  y: feature.geometry.coordinates[c][s][m][1] / 1000,
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
   * Build threejs line geometry from world coords
   *
   * @param {*} coords
   * @returns Line2
   */
  function createLineFromCoords(coords) {
    let line_geom = new LineGeometry();
    let positions = [];
    let colors = [];
    let color = new Color(viewer.borderColor_);
    for (var i = 0; i < coords.length; i++) {
      positions.push(coords[i].x, coords[i].y, CONSTANTS.line_z);
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


  /**
   * Color scheme dropdown event handler
   *
   * @param {*} scheme
   */
  function onChangeColorScheme(scheme) {
    viewer.colorScheme_ = scheme;
    viewer.colorScale_ = defineColorScale();
    updatePointsColors();
    if (viewer.legend_) {
      updateLegend();
    }
  }

  function updateColorScale() {

  }
  /**
   * rebuild color array
   *
   */
  function updatePointsColors() {
    let colors = [];
    for (var i = 0; i < gridCaches[viewer.resolution_].length; i++) {
      let hex = viewer.colorScale_(gridCaches[viewer.resolution_][i].value); //d3 scale-chromatic
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
    points.geometry = pointsGeometry;
  }

  /**
   * create or update THREE.js points layer
   *
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
        gridCaches[viewer.resolution_][i].position[0],
        gridCaches[viewer.resolution_][i].position[1]
      ];
      let x = parseFloat(coords[0]);
      let y = parseFloat(coords[1]);
      let z = CONSTANTS.point_z;
      let indicator = gridCaches[viewer.resolution_][i].value;
      let hex = viewer.colorScale_(indicator); //d3 scale-chromatic
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
      if (viewer.sizeColumn_) {
        sizes.push(viewer.sizeScale_(indicator));
      } else {
        sizes.push(gridConfig.point_size);
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
    //create or reuse points Material
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
      //size: gridConfig.point_size,
      // sizeAttenuation: true,
      //https://github.com/mrdoob/three.js/blob/master/src/constants.js
      // vertexColors: THREE.VertexColors
      // });
    } else {
      pointsMaterial.size = gridConfig.point_size;
    }
    //create or reuse points object
    if (!points) {
      points = new Points(pointsGeometry, pointsMaterial);
      points.renderOrder = 1; //bottom
      viewer.scene.add(points);
    } else {
      points.geometry = pointsGeometry;
      points.material = pointsMaterial;
    }
    //create or update legend
    if (viewer.legend_) {
      if (gridLegend) {
        updateLegend();
      } else {
        createLegend();
      }
    }
    Utils.hideLoading();
    animate();
  }

  function fragmentShader() {
    return `
  varying vec3 vColor;

  void main() {
    gl_FragColor = vec4( vColor.rgb, 1.0 );
  }
`;
  }

  function vertexShader() {
    return `
  uniform float thing;
  attribute float size;
  float scale;
  varying vec3 vColor;

  void main() {
    vColor = color;
    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
    //TODO: change 900.0 to uniform
    gl_PointSize = size * (thing / -mvPosition.z );
    gl_Position = projectionMatrix * mvPosition;
  }
`;
  }

  /**
   * Creates an HTML Select element for the different D3 Scale-Chromatic functions
   *
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
    dropdown_container.id = "gridviz-dropdown-container";
    dropdown_container.classList.add("gridviz-plugin");
    schemesSelect = document.createElement("select");
    schemesSelect.id = "schemes";
    let label = document.createElement("label");
    label.for = "schemes";
    label.classList.add("gridviz-dropdown-label");
    label.innerText = "Colour Scheme: ";

    for (let i = 0; i < schemes.length; i++) {
      let scheme = schemes[i];
      let option = document.createElement("option");
      option.value = scheme.value;
      option.innerText = scheme.innerText;
      schemesSelect.appendChild(option);
    }
    schemesSelect.value = viewer.colorScheme_;
    dropdown_container.appendChild(label);
    dropdown_container.appendChild(schemesSelect);
    viewer.container_.appendChild(dropdown_container);
  }

  /**
   * Add svg legend to DOM using d3-svg-legend
   *
   */
  function createLegend() {
    let legendContainer;
    if (document.getElementById("gridviz-legend")) {
      legendContainer = d3Selection.select("#gridviz-legend");
    } else {
      legendContainer = d3Selection.create("svg").attr("id", "gridviz-legend");
      viewer.container_.appendChild(legendContainer.node());
    }
    if (viewer.legend.orientation == "horizontal") {
      legendContainer.attr("class", "gridviz-legend-horizontal gridviz-plugin");
    } else {
      legendContainer.attr("class", "gridviz-legend-vertical gridviz-plugin");
    }
    let legend = legendContainer
      .append("g")
      .attr("class", "legendSqrt")
      .attr("transform", "translate(10,15)"); //padding

    gridLegend = LEGEND.legendColor()
      .shapeWidth(viewer.legend_.shapeWidth)
      .cells(viewer.legend_.cells)
      .labelFormat(viewer.legend_.format)
      .orient(viewer.legend_.orientation)
      .scale(viewer.colorScale_)
      .title(viewer.legend_.title)
      .titleWidth(viewer.legend_.titleWidth)

    if (viewer.thresholdValues_) {
      gridLegend.labels(thresholdLabels)
    }

    legendContainer.select(".legendSqrt").call(gridLegend);

    //adjust width/height
    legendContainer.style("height", viewer.legend_.height + "px");
    legendContainer.style("width", viewer.legend_.width + "px");
    //legend.style("height", viewer.legend_.height +"px");

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
    var l = d3Selection.selectAll(".legendSqrt").remove();
    setTimeout(createLegend(), 1000);
  }

  /**
   * Three.js render loop
   *
   */
  function animate() {
    //let time = Date.now() * 0.005;
    //points.position.x = 0.02 * time;

    requestAnimationFrame(animate);
    renderer.render(viewer.scene, camera);
    labelRenderer.render(viewer.scene, camera);
  }

  /**
   * Add change event to color-scheme selector
   *
   */
  function addChangeEventToColorDropdown() {
    schemesSelect.addEventListener("change", function (e) {
      onChangeColorScheme(e.currentTarget.value);
    });
  }

  function createTooltipContainer() {
    // Initial tooltip state
    tooltip_state = {
      display: "none"
    };

    tooltipTemplate = document.createRange()
      .createContextualFragment(`<div id="tooltip" style="display: none; position: absolute; pointer-events: none; z-index:999; border-radius:5px; box-shadow: 0 1px 5px rgba(0,0,0,0.65); font-size: 13px; width: 120px; text-align: center; line-height: 1; padding: 6px; background: white; font-family: sans-serif;">
    <div id="labelTip" style="padding: 4px; margin-bottom: 4px;"></div>
<div id="pointTip" style="padding: 4px; margin-bottom: 4px;"></div>
</div>`);
    viewer.container_.append(tooltipTemplate);

    tooltip = document.querySelector("#tooltip");
    pointTip = document.querySelector("#pointTip");
    labelTip = document.querySelector("#labelTip");
    tooltipContainer = new Object3D();
    viewer.scene.add(tooltipContainer);
  }

  function addMouseEventsToView() {
    // show population value on click
    view.on("click", () => {
      let [mouseX, mouseY] = d3Selection.mouse(view.node());
      let mouse_position = [mouseX, mouseY];
      checkIntersects(mouse_position);
      console.log("Clicked:", camera.position);
    });

    view.on("mouseleave", () => {
      removeHighlights();
    });
  }

  //taken from observableHQ & works on mobile:
  function setUpZoom() {
    let d3_zoom = d3Zoom.zoom()
      .scaleExtent([getScaleFromZ1(viewer.camera.far_), getScaleFromZ1(viewer.camera.near_)])
      .on('zoom', () => {
        let d3_transform = d3Selection.event.transform;
        zoomHandler1(d3_transform);
      });
    view.call(d3_zoom);
    let initial_scale = getScaleFromZ1(viewer.camera.far_);
    var initial_transform = d3Zoom.zoomIdentity.translate(viewer.width_ / 2, viewer.height_ / 2).scale(initial_scale);
    d3_zoom.transform(view, initial_transform);
    camera.position.set(0, 0, viewer.camera.far_);
  }
  function zoomHandler1(d3_transform) {
    let scale = d3_transform.k;
    let x = -(d3_transform.x - viewer.width_ / 2) / scale;
    let y = (d3_transform.y - viewer.height_ / 2) / scale;
    let z = getZFromScale1(scale);
    camera.position.set(x, y, z);
  }
  function getScaleFromZ1(camera_z_position) {
    let half_fov = viewer.camera.fov_ / 2;
    let half_fov_radians = toRadians(half_fov);
    let half_fov_height = Math.tan(half_fov_radians) * camera_z_position;
    let fov_height = half_fov_height * 2;
    let scale = viewer.height_ / fov_height; // Divide visualization height by height derived from field of view
    return scale;
  }
  function getZFromScale1(scale) {
    let half_fov = viewer.camera.fov_ / 2;
    let half_fov_radians = toRadians(half_fov);
    let scale_height = viewer.height_ / scale;
    let camera_z_position = scale_height / (2 * Math.tan(half_fov_radians));
    return camera_z_position;
  }

  //taken from elsewhere & DOESNT work on mobile:
  // add d3's zoom

  function addPanAndZoom() {
    // define zoom
    //where [x0, y0] is the top-left corner of the world and [x1, y1] is the bottom-right corner of the world
    let farScale = getScaleFromZ1(viewer.camera.far_);
    let nearScale = getScaleFromZ1(viewer.camera.near_);
    let zoom = d3Zoom
      .zoom()
      .scaleExtent([farScale, nearScale])
      .on("zoom", () => {
        let event = d3Selection.event;
        if (event) zoomHandler(event);
      })
      .on("end", () => {
        let event = d3Selection.event;
        if (event) zoomEnd(event);
      });
    view.call(zoom);

    let initial_scale = getScaleFromZ1(viewer.camera.zoom_);
    var initial_transform = d3Zoom.zoomIdentity
      .translate(viewer.width_ / 2, viewer.height_ / 2)
      .scale(initial_scale);
    zoom.transform(view, initial_transform);

    //initial camera position

    //camera.position.set(viewer.center_[0], viewer.center_[1], viewer.camera.zoom_);
  }

  function zoomHandler(event) {
    let scale = event.transform.k;
    // let x = -(event.transform.x - viewer.width_ / 2) / scale;
    // let y = (event.transform.y - viewer.height_ / 2) / scale;
    // let z = getZFromScale(scale);
    // camera.position.set(x, y, z);

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
        camera.position.set(pos.x, pos.y, new_z);
      } else {
        // If panning
        const { movementX, movementY } = event.sourceEvent;

        // Adjust mouse movement by current scale and set camera
        const current_scale = getScaleFromZ(camera.position.z);
        camera.position.set(
          camera.position.x - movementX / current_scale,
          camera.position.y + movementY / current_scale,
          camera.position.z
        );
      }
    }
  }

  function getScaleFromZ(z) {
    // let vFOV = (camera.fov * Math.PI) / 180;
    // let scale_height = 2 * Math.tan(vFOV / 2) * z;
    // let scale = viewer.height_ / scale_height;
    // return scale;

    let half_fov = CONSTANTS.fov / 2;
    let half_fov_radians = toRadians(half_fov);
    let half_fov_height = Math.tan(half_fov_radians) * z;
    let fov_height = half_fov_height * 2;
    let scale = viewer.height_ / fov_height; // Divide visualization height by height derived from field of view
    return scale;
  }

  function getZFromScale(scale) {
    // let half_fov = CONSTANTS.fov / 2;
    // let half_fov_radians = toRadians(half_fov);
    // let scale_height = viewer.height_ / scale;
    // let camera_z_position = scale_height / (2 * Math.tan(half_fov_radians));
    // return camera_z_position;
    let half_fov = CONSTANTS.fov / 2;
    let half_fov_radians = toRadians(half_fov);
    let scale_height = viewer.height_ / scale;
    let camera_z_position = scale_height / (2 * Math.tan(half_fov_radians));
    return camera_z_position;
  }

  function zoomEnd(event) {
    hideTooltip();
    let scale = getScaleFromZ(event.transform.k);
    // get placenames at certain zoom levels
    if (points) {
      if (scale > 0 && scale < viewer.camera.far_) {
        //placenames are added to the points object
        getPlacenames(scale);
      } else {
        removePlacenamesFromScene();
      }
    }

    //change nuts simplification (or not) based on current scale
    //URL themes: 2016/3035/20M/0.json
    if (viewer.nuts2json_) {
      if (
        scale < CONSTANTS.nuts_scale_threshold &&
        nuts_simplification !== "10M"
      ) {
        nuts_simplification = "10M";
        loadBordersJson(
          CONSTANTS.nuts_base_URL +
          viewer.EPSG_ +
          "/" +
          nuts_simplification +
          "/0.json"
        );
      } else if (
        scale > CONSTANTS.nuts_scale_threshold &&
        nuts_simplification !== "20M"
      ) {
        nuts_simplification = "20M";
        loadBordersJson(
          CONSTANTS.nuts_base_URL +
          viewer.EPSG_ +
          "/" +
          nuts_simplification +
          "/0.json"
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
      "&outSR={'wkid':" +
      viewer.EPSG_ +
      "}" +
      "&geometry=" +
      envelope.xmin +
      "," +
      envelope.ymin +
      "," +
      envelope.xmax +
      "," +
      envelope.ymax +
      "&geometryType=esriGeometryEnvelope&f=json&outFields=city_town_name,POPL_2011&resultRecordCount=200";
    let uri = encodeURI(URL);
    d3Fetch.json(uri).then(
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
    // labelling thresholds
    if (scale > 0 && scale < r) {
      return "POPL_2011>10";
    } else if (scale > r && scale < r * 2) {
      return "POPL_2011>1000";
    } else if (scale > r * 2 && scale < r * 4) {
      return "POPL_2011>10000";
    } else if (scale > r * 4 && scale < r * 8) {
      return "POPL_2011>10000";
    } else if (scale > r * 8 && scale < r * 16) {
      return "POPL_2011>10000";
    } else if (scale > r * 16 && scale < r * 32) {
      return "POPL_2011>10000";
    } else if (scale > r * 32 && scale < r * 64) {
      return "POPL_2011>200000";
    } else if (scale > r * 64 && scale < r * 128) {
      return "POPL_2011>300000";
    } else if (scale > r * 128 && scale < r * 256) {
      return "POPL_2011>1000000";
    } else if (scale > r * 256 && scale < r * 512) {
      return "POPL_2011>1000000";
    } else if (scale > r * 512 && scale < r * 1024) {
      return "POPL_2011>1000000";
    } else if (scale > r * 1024) {
      return "POPL_2011>1000000";
    } else {
      return "1=1";
    }
  }

  /**
   * Appends placename labels from JSON features to the viewer
   *
   * @param {*} placenames
   */
  function addPlacenamesToScene(placenames) {
    for (let p = 0; p < placenames.length; p++) {
      let label = createPlacenameLabelObject(placenames[p]);
      // TODO: group objects manually (THREE.group())
      points.add(label);
    }
  }

  /**
   * Removes the placename CSS2DObjects from the THREE points layer
   * It seems that the browsers JS garbage collector removes the DOM nodes
   */
  function removePlacenamesFromScene() {
    for (var i = points.children.length - 1; i >= 0; i--) {
      points.remove(points.children[i]);
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
    placeDiv.textContent = placename.attributes.city_town_name;
    placeDiv.style.marginTop = "-1em";
    var placeLabel = new CSS2DObject(placeDiv);
    if (viewer.zerosRemoved_) {
      placeLabel.position.set(
        placename.geometry.x / 1000,
        placename.geometry.y / 1000,
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
      return {
        xmin: bottomLeftWorld.x * 1000,
        ymin: bottomLeftWorld.y * 1000,
        xmax: topRightWorld.x * 1000,
        ymax: topRightWorld.y * 1000
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
    let intersects = raycaster.intersectObject(points);
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
    return _.sortBy(intersects, "distanceToRay");
  }

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
    //   size: gridConfig.point_size,
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
    labelTip.innerHTML = `<strong>${viewer.colorColumn_}:</strong> ${tooltip_state.name} <br> 
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
    tooltip_state.name = cell.value;
    tooltip_state.coords = cell.position;
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

  /**
   * redefine width and height of viewer, currently only works with default_options values
   *
   */
  function addResizeEvent() {
    window.addEventListener("resize", () => {
      viewer.width_ = viewer.container_.clientWidth;
      viewer.height_ = viewer.container_.clientHeight;
      labelRenderer.setSize(viewer.width_, viewer.height_);
      renderer.setSize(viewer.width_, viewer.height_);
      camera.aspect = viewer.width_ / viewer.height_;
      camera.updateProjectionMatrix();
    });
  }

  return viewer;
}
