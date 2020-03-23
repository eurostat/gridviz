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
 * @param {boolean} [options.show_legend = true] - THREE.Line2 color (hexidecimal).
 * @param {boolean} [options.show_color_scheme_selector = true] - THREE.Line2 color (hexidecimal).
 * @description User defined parameters
 */
export function createViewer(options) {
  //output object
  let viewer = {};

  let default_options = {
    containerElement: document.body,
    height: window.innerHeight,
    width: window.innerWidth,
    backgroundColor: "#b7b7b7",
    borderColor: "#ffffff",
    colorScheme: "interpolateTurbo",
    legend: true,
    legendOrientation: "vertical",
    legendTitle: "",
    colorSchemeSelector: true,
    EPSG: 3035, //used to determine grid rendering, placenames, and nuts2json requests.
    center: null, //default - If not specified then should default as first or randomly selected point
    //center: [4369000, 2834000], //EPSG:3035
    //center: [4369, 2834], //EPSG:3035 with zeros removed
    //center: [1328169.8035,6308195.0703], //EPSG:3857
    //center: [9.997559,49.681847], //EPSG:4326
    colorColumn: null,
    sizeColumn: null,
    title: null,
    nuts2json: true, //show topojson borders of europe (available in 3035, 3857, 4258 or 4326)

    //"../../assets/csv/3035/pop_2011_3035_5km.csv"
    //"../../assets/csv/3857/pop_2011_3857_5km.csv"
    //"../../assets/csv/4326/pop_2011_4326_5km.csv"
    //TODO: get resolution (UNIT) from https://spatialreference.org/
    data: [
      {
        url: "../../assets/csv/3035/pop_2011_3035_5km.csv",
        cellSize: 5000
      }
    ]
    // data: [
    //   {
    //     url: "../../assets/csv/3035/pop_2km.csv",
    //     cellSize: 2 //without zeros removed would be 2000
    //   }
    // ]
    //data: [{ url: "../../assets/csv/3857/pop_2011_3857_5km.csv", cellSize:5000 }]
    // data: [{
    //   url: "../../assets/csv/3035/France_2015_1km_over80.csv",
    //   cellSize: 10800,
    //   tiled: false
    // }]
  };

  // apply user-defined options or set defaults
  // TODO: validate & sanitize params

  //set container height and width
  viewer.container_element =
    options.container || default_options.containerElement;
  viewer.container_element.classList.add("egv-container");
  viewer.container_element.style.width =
    options.width + "px" || default_options.width + "px";
  viewer.viz_width = options.width || default_options.width;
  viewer.container_element.style.height =
    options.height + "px" || default_options.height + "px";
  viewer.viz_height = options.height || default_options.height;

  //CRS
  viewer.EPSG = options.EPSG || default_options.EPSG;

  //data
  viewer.data = options.data || default_options.data;
  viewer.color_column = options.colorColumn || default_options.colorColumn;
  viewer.size_column = options.sizeColumn || default_options.sizeColumn;
  viewer.resolution = viewer.data[0].cellSize; //current grid resolution. e.g. 5000 for EPSG:3035 5km grid

  //camera
  viewer.near = CONSTANTS.near;
  viewer.far = defineFar(); //set min zoom
  viewer.fov = CONSTANTS.fov;
  viewer.aspect = viewer.viz_width / viewer.viz_height;
  viewer.center = options.center || default_options.center;
  viewer.zoom = options.zoom || viewer.far - 1; //initial camera position Z

  //styles
  viewer.background_color =
    options.backgroundColor || default_options.backgroundColor;
  viewer.show_legend = options.legend !== false;
  viewer.show_color_scheme_selector = options.colorSchemeSelector !== false;
  viewer.color_scheme = options.colorScheme || default_options.colorScheme;
  viewer.border_color = options.borderColor || default_options.borderColor;
  viewer.legend_orientation =
    options.legendOrientation || default_options.legendOrientation;
  viewer.legend_title = options.legendTitle || default_options.legendTitle;
  //definition of generic accessors based on the name of each parameter name
  // for (var p in out)
  // (function () {
  //   var p_ = p;
  //   out[p_.substring(0, p_.length - 1)] = function (v) { if (!arguments.length) return out[p_]; out[p_] = v; return out; };
  // })();

  // other variables
  let line_material,
    boundaries_group, //THREE.Group for nuts borders
    points_material,
    points_geometry,
    camera,
    raycaster,
    points,
    tooltip_container,
    tooltip_template,
    tooltip,
    point_tip,
    label_tip,
    array_extent, //d3array.extent of grid
    grid_legend,
    view,
    label_renderer,
    schemes_select,
    renderer;

  // initial states
  let nuts_simplification = "20M"; //current nuts2json
  let tooltip_state = {
    display: "none"
  };
  let colorScale = d3Scale.scaleSqrt();
  let pointSizeScale = d3Scale.scaleSqrt();
  let grid_caches = {};
  let grid_configs = {};
  let grid_config = defineGridConfig();
  let initial_zoom = true; //indicate whether

  Utils.createLoadingSpinner(viewer.container_element);

  //build viewer
  createScene();
  if (!label_renderer) createLabelRenderer();
  if (!renderer) createWebGLRenderer();
  createCamera();
  createRaycaster();
  addPanAndZoom();
  createTooltipContainer();
  if (viewer.show_color_scheme_selector) {
    createColorSchemeDropdown();
  }

  addEventListeners();

  //load initial data
  loadGrid(viewer.data[0]);
  loadBordersJson(
    CONSTANTS.nuts_base_URL +
      viewer.EPSG +
      "/" +
      nuts_simplification +
      "/0.json"
  );

  /**
   * Create renderer for three.js scene and append to container element.
   *
   */
  function createWebGLRenderer() {
    renderer = new WebGLRenderer();
    renderer.setSize(viewer.viz_width, viewer.viz_height);
    viewer.container_element.appendChild(renderer.domElement);
    view = d3Selection.select(renderer.domElement); //for d3 mouse events
  }

  /**
   * Create renderer for placename labels. Uses CSS2DRenderer which is not currently in main Three.js build
   *
   */
  function createLabelRenderer() {
    label_renderer = new CSS2DRenderer();
    label_renderer.setSize(viewer.viz_width, viewer.viz_height);
    label_renderer.domElement.style.position = "absolute";
    //label_renderer.domElement.style.top = "0px";
    viewer.container_element.appendChild(label_renderer.domElement);
  }

  /**
   * Initialize THREE camera object
   *
   */
  function createCamera() {
    camera = new PerspectiveCamera(
      viewer.fov,
      viewer.aspect,
      viewer.near,
      viewer.far
    );

    //if user hasnt specified center, move camera to cell halfway through grid cache array
    if (!viewer.center) {
      camera.position.set(0, 0, viewer.zoom); // Set initial camera position
      camera.lookAt(new Vector3(0, 0, 0)); // Set initial camera position
    } else {
      camera.position.set(viewer.center[0], viewer.center[1], viewer.zoom); // Set initial camera position
      camera.lookAt(new Vector3(viewer.center[0], viewer.center[1], 0)); // Set initial camera position
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
    raycaster.params.Points.threshold = grid_config.raycaster_threshold;
  }

  /**
   * Add event listeners to DOM elements
   *
   */
  function addEventListeners() {
    //show population value on click
    addMouseEventsToView();
    //change color scheme
    if (viewer.show_color_scheme_selector) {
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
    viewer.scene.background = new Color(viewer.background_color);
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
    return viewer.resolution;
  }

  /**
   * Define the point_size parameter for THREE.points objects at the specified resolution
   *
   *
   */
  function definePointSize() {
    return viewer.resolution * 1.05; //INVESTIGATE: why does threejs pointSize value not correspond with the grid resolution?
  }

  /**
   * Define the far parameter for THREE.camera.
   * The far parameter represents the furthest possible distance that the camera can be from the plane (where z=0)
   *
   */
  function defineFar() {
    return viewer.resolution * 2000;
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
            updateColorScale();
            if (viewer.size_column) {
              updatePointSizeScale();
            }

            if (!viewer.center) {
              let index = parseInt(grid_caches[viewer.resolution].length / 2);
              let c = grid_caches[viewer.resolution][index];
              viewer.center = [
                parseFloat(c.position[0]),
                parseFloat(c.position[1])
              ];
              camera.position.set(
                viewer.center[0],
                viewer.center[1],
                viewer.zoom
              );
              camera.lookAt(new Vector3(viewer.center[0], viewer.center[1], 0)); // Set initial camera position
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
        if (csv[0].x && csv[0].y && csv[0][viewer.color_column]) {
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
        let value = csv[i][viewer.color_column];
        let point = {
          position,
          value
        };
        if (!grid_caches[res]) grid_caches[res] = [];
        grid_caches[res].push(point);
      }
    }
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
    if (!boundaries_group) {
      boundaries_group = new Group();
      boundaries_group.renderOrder = 999; //always on top
    } else {
      //empty current boundaries group
      for (var i = boundaries_group.children.length - 1; i >= 0; i--) {
        boundaries_group.remove(boundaries_group.children[i]);
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
            let xyz = {
              x: feature.geometry.coordinates[c][s][0],
              y: feature.geometry.coordinates[c][s][1],
              z: CONSTANTS.line_z
            };
            coords.push(xyz);
          }
          boundaries_group.add(createLineFromCoords(coords));
        } else if (feature.geometry.type == "MultiPolygon") {
          for (let s = 0; s < feature.geometry.coordinates[c].length; s++) {
            //each polygon in multipolygon:
            coords = [];
            for (
              let m = 0;
              m < feature.geometry.coordinates[c][s].length;
              m++
            ) {
              let xyz = {
                x: feature.geometry.coordinates[c][s][m][0],
                y: feature.geometry.coordinates[c][s][m][1],
                z: CONSTANTS.line_z
              };
              coords.push(xyz);
            }
            boundaries_group.add(createLineFromCoords(coords));
          }
        }
      }
    }
    if (initial) {
      viewer.scene.add(boundaries_group);
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
    let color = new Color(viewer.border_color);
    for (var i = 0; i < coords.length; i++) {
      positions.push(coords[i].x, coords[i].y, CONSTANTS.line_z);
      colors.push(color.r, color.g, color.b);
    }
    line_geom.setPositions(positions);
    line_geom.setColors(colors);
    if (!line_material) {
      line_material = new LineMaterial({
        linewidth: CONSTANTS.line_width,
        vertexColors: THREE.VertexColors
      });
    }
    //line2 allows custom linewidth (but not currently included in main threejs build)
    return new Line2(line_geom, line_material);
  }

  /**
   * Change grid grid_config
   *
   * @param {*} res
   */
  function changeRes(res) {
    resolution = res;
    grid_config = grid_configs[res];
    Utils.showLoading();
    updateColorScale();
    if (viewer.size_column) {
      updatePointSizeScale();
    }
    // add or update points layer
    addPointsToScene();
    //update raycaster
    raycaster.params.Points.threshold = grid_config.raycaster_threshold;
  }

  /**
   * Update colorScale domain
   *
   */
  function updateColorScale() {
    array_extent = d3Array.extent(grid_caches[viewer.resolution], d => d.value);
    colorScale.domain(array_extent);
  }

  function updatePointSizeScale() {
    pointSizeScale
      .domain(array_extent)
      .range([viewer.resolution / 3, viewer.resolution / 1.5]); //minSize, maxSize
  }

  /**
   * Color scheme dropdown event handler
   *
   * @param {*} scheme
   */
  function onChangeColorScheme(scheme) {
    viewer.color_scheme = scheme;
    updatePointsColors();
    if (viewer.show_legend) {
      updateLegend();
    }
  }

  /**
   * rebuild color array
   *
   */
  function updatePointsColors() {
    let colors = [];
    for (var i = 0; i < grid_caches[viewer.resolution].length; i++) {
      let hex = d3ScaleChromatic[viewer.color_scheme](
        colorScale(grid_caches[viewer.resolution][i].value)
      ); //d3 scale-chromatic
      if (hex == "rgb(NaN, NaN, NaN)") {
        hex = "#000"; //fallback to black
      }
      grid_caches[viewer.resolution][i].color = hex; //for tooltip
      let color = new Color(hex);
      if (color) colors.push(color.r, color.g, color.b);
    }
    //update colors
    points_geometry.setAttribute(
      "color",
      new Float32BufferAttribute(colors, 3)
    );
    points_geometry.computeBoundingSphere();
    points.geometry = points_geometry;
  }

  /**
   * create or update THREE.js points layer
   *
   */
  function addPointsToScene() {
    //threejs recommends using BufferGeometry instead of Geometry for performance
    /*   indices = [0, 1, 2, 0, 2, 3];
bufferGeometry.setIndex(new THREE.BufferAttribute(new Uint16Array(indices), 1));  */
    if (!points_geometry) {
      points_geometry = new BufferGeometry();
    }

    let colors = [];
    let positions = [];
    let sizes = [];
    for (var i = 0; i < grid_caches[viewer.resolution].length; i++) {
      // Set vector coordinates from data
      let coords = [
        grid_caches[viewer.resolution][i].position[0],
        grid_caches[viewer.resolution][i].position[1]
      ];
      let x = parseFloat(coords[0]);
      let y = parseFloat(coords[1]);
      let z = CONSTANTS.point_z;
      let indicator = grid_caches[viewer.resolution][i].value;
      let hex = d3ScaleChromatic[viewer.color_scheme](colorScale(indicator)); //d3 scale-chromatic
      if (hex == "rgb(NaN, NaN, NaN)") {
        hex = "#000"; //fallback to black
      }
      grid_caches[viewer.resolution][i].color = hex; //for tooltip
      let color = new Color(hex);

      positions.push(x, y, z);
      colors.push(color.r, color.g, color.b);
      if (viewer.size_column) {
        sizes.push(pointSizeScale(indicator));
      } else {
        sizes.push(grid_config.point_size);
      }
    }
    //set buffer geometry attributes
    points_geometry.setAttribute(
      "position",
      new Float32BufferAttribute(positions, 3)
    );
    points_geometry.setAttribute(
      "color",
      new Float32BufferAttribute(colors, 3)
    );
    //Variable point size will affect raycasting: https://github.com/mrdoob/three.js/issues/5105
    points_geometry.setAttribute("size", new Float32BufferAttribute(sizes, 1));
    points_geometry.computeBoundingSphere();
    //create or reuse points Material
    if (!points_material) {
      // Attempting to apply custom point sizes
      points_material = new ShaderMaterial({
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
      //points_material = new PointsMaterial({
      //size: grid_config.point_size,
      // sizeAttenuation: true,
      //https://github.com/mrdoob/three.js/blob/master/src/constants.js
      // vertexColors: THREE.VertexColors
      // });
    } else {
      points_material.size = grid_config.point_size;
    }
    //create or reuse points object
    if (!points) {
      points = new Points(points_geometry, points_material);
      points.renderOrder = 1; //bottom
      viewer.scene.add(points);
    } else {
      points.geometry = points_geometry;
      points.material = points_material;
    }
    //create or update legend
    if (viewer.show_legend) {
      if (grid_legend) {
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
    dropdown_container.id = "egv-dropdown-container";
    dropdown_container.classList.add("egv-plugin");
    schemes_select = document.createElement("select");
    schemes_select.id = "schemes";
    let label = document.createElement("label");
    label.for = "schemes";
    label.classList.add("egv-dropdown-label");
    label.innerText = "Colour Scheme: ";

    for (let i = 0; i < schemes.length; i++) {
      let scheme = schemes[i];
      let option = document.createElement("option");
      option.value = scheme.value;
      option.innerText = scheme.innerText;
      schemes_select.appendChild(option);
    }
    schemes_select.value = viewer.color_scheme;
    dropdown_container.appendChild(label);
    dropdown_container.appendChild(schemes_select);
    viewer.container_element.appendChild(dropdown_container);
  }

  /**
   * Add svg legend to DOM using d3-svg-legend
   *
   */
  function createLegend() {
    let legendScale = d3Scale
      .scaleSequentialSqrt(d3ScaleChromatic[viewer.color_scheme])
      .domain(array_extent);
    let svg;
    if (document.getElementById("egv-legend")) {
      svg = d3Selection.select("#egv-legend");
    } else {
      svg = d3Selection.create("svg").attr("id", "egv-legend");
      viewer.container_element.appendChild(svg.node());
    }
    if (viewer.legend_orientation == "horizontal") {
      svg.attr("class", "egv-legend-horizontal egv-plugin");
    } else {
      svg.attr("class", "egv-legend-vertical egv-plugin");
    }
    let format = d3Format.format(".0s");
    svg
      .append("g")
      .attr("class", "legendSqrt")
      .attr("transform", "translate(10,10)"); //padding

    grid_legend = LEGEND.legendColor()
      .shapeWidth(30)
      .cells(13)
      .labelFormat(format)
      .orient(viewer.legend_orientation)
      .scale(legendScale)
      .title(viewer.legend_title);

    svg.select(".legendSqrt").call(grid_legend);
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
    label_renderer.render(viewer.scene, camera);
  }

  /**
   * Add change event to color-scheme selector
   *
   */
  function addChangeEventToColorDropdown() {
    schemes_select.addEventListener("change", function(e) {
      onChangeColorScheme(e.currentTarget.value);
    });
  }

  function createTooltipContainer() {
    // Initial tooltip state
    tooltip_state = {
      display: "none"
    };

    tooltip_template = document.createRange()
      .createContextualFragment(`<div id="tooltip" style="display: none; position: absolute; pointer-events: none; z-index:999; border-radius:5px; box-shadow: 0 1px 5px rgba(0,0,0,0.65); font-size: 13px; width: 120px; text-align: center; line-height: 1; padding: 6px; background: white; font-family: sans-serif;">
    <div id="label_tip" style="padding: 4px; margin-bottom: 4px;"></div>
<div id="point_tip" style="padding: 4px; margin-bottom: 4px;"></div>
</div>`);
    viewer.container_element.append(tooltip_template);

    tooltip = document.querySelector("#tooltip");
    point_tip = document.querySelector("#point_tip");
    label_tip = document.querySelector("#label_tip");
    tooltip_container = new Object3D();
    viewer.scene.add(tooltip_container);
  }

  function addMouseEventsToView() {
    // show population value on click
    view.on("click", () => {
      let [mouseX, mouseY] = d3Selection.mouse(view.node());
      let mouse_position = [mouseX, mouseY];
      checkIntersects(mouse_position);
      console.log("Camera:", camera.position);
    });

    view.on("mouseleave", () => {
      removeHighlights();
    });
  }

  // add d3's zoom

  function addPanAndZoom() {
    // define zoom
    //where [x0, y0] is the top-left corner of the world and [x1, y1] is the bottom-right corner of the world
    let farScale = getScaleFromZ(viewer.far);
    let nearScale = getScaleFromZ(viewer.near);
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

    let initial_scale = getScaleFromZ(viewer.far);
    var initial_transform = d3Zoom.zoomIdentity
      .translate(viewer.viz_width / 2, viewer.viz_height / 2)
      .scale(initial_scale);
    zoom.transform(view, initial_transform);

    //initial camera position

    //camera.position.set(viewer.center[0], viewer.center[1], viewer.zoom);
  }

  function zoomHandler(event) {
    let scale = event.transform.k;
    // let x = -(event.transform.x - viewer.viz_width / 2) / scale;
    // let y = (event.transform.y - viewer.viz_height / 2) / scale;
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
          (clientX / viewer.viz_width) * 2 - 1,
          -(clientY / viewer.viz_height) * 2 + 1,
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
    // let scale = viewer.viz_height / scale_height;
    // return scale;

    let half_fov = CONSTANTS.fov / 2;
    let half_fov_radians = toRadians(half_fov);
    let half_fov_height = Math.tan(half_fov_radians) * z;
    let fov_height = half_fov_height * 2;
    let scale = viewer.viz_height / fov_height; // Divide visualization height by height derived from field of view
    return scale;
  }

  function getZFromScale(scale) {
    // let half_fov = CONSTANTS.fov / 2;
    // let half_fov_radians = toRadians(half_fov);
    // let scale_height = viewer.viz_height / scale;
    // let camera_z_position = scale_height / (2 * Math.tan(half_fov_radians));
    // return camera_z_position;
    let half_fov = CONSTANTS.fov / 2;
    let half_fov_radians = toRadians(half_fov);
    let scale_height = viewer.viz_height / scale;
    let camera_z_position = scale_height / (2 * Math.tan(half_fov_radians));
    return camera_z_position;
  }

  function zoomEnd(event) {
    hideTooltip();
    let scale = getScaleFromZ(event.transform.k);
    // get placenames at certain zoom levels
    if (points) {
      if (scale > 0 && scale < viewer.resolution * 256) {
        //placenames are added to the points object
        getPlacenames(scale);
      } else {
        removePlacenamesFromScene();
      }
    }

    //change nuts simplification (or not) based on current scale
    //URL themes: 2016/3035/20M/0.json
    if (
      scale < CONSTANTS.nuts_scale_threshold &&
      nuts_simplification !== "10M"
    ) {
      nuts_simplification = "10M";
      loadBordersJson(
        CONSTANTS.nuts_base_URL +
          viewer.EPSG +
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
          viewer.EPSG +
          "/" +
          nuts_simplification +
          "/0.json"
      );
    }
  }

  /**
   * retrieves placenames by population according to the current scale, from an ArcGIS server endpoint.
   * TODO: send bounding box correctly (geometry xmin,ymin,xmax,ymax)
   * @param {*} scale
   */
  function getPlacenames(scale) {
    let where;
    let r = viewer.resolution;
    // labelling thresholds
    if (scale > 0 && scale < r) {
      where = "POPL_2011>10000";
    } else if (scale > r && scale < r * 2) {
      where = "POPL_2011>10000";
    } else if (scale > r * 2 && scale < r * 4) {
      where = "POPL_2011>10000";
    } else if (scale > r * 4 && scale < r * 8) {
      where = "POPL_2011>10000";
    } else if (scale > r * 8 && scale < r * 16) {
      where = "POPL_2011>10000";
    } else if (scale > r * 16 && scale < r * 32) {
      where = "POPL_2011>10000";
    } else if (scale > r * 32 && scale < r * 64) {
      where = "POPL_2011>200000";
    } else if (scale > r * 64 && scale < r * 128) {
      where = "POPL_2011>300000";
    } else if (scale > r * 128 && scale < r * 256) {
      where = "POPL_2011>1000000";
    } else if (scale > r * 256 && scale < r * 512) {
      where = "POPL_2011>1000000";
    } else if (scale > r * 512 && scale < r * 1024) {
      where = "1=2";
    } else if (scale > r * 1024) {
      where = "1=2";
    }

    let envelope = getCurrentViewExtent();
    //currentExtent = envelope;
    //ESRI Rest API envelope: <xmin>,<ymin>,<xmax>,<ymax> (bottom left x,y , top right x,y)
    let URL =
      CONSTANTS.placenames_base_URL +
      "where=" +
      where +
      "&outSR={'wkid':" +
      viewer.EPSG +
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
    placeDiv.className = "egv-placename";
    placeDiv.textContent = placename.attributes.city_town_name;
    placeDiv.style.marginTop = "-1em";
    var placeLabel = new CSS2DObject(placeDiv);
    placeLabel.position.set(
      placename.geometry.x,
      placename.geometry.y,
      CONSTANTS.label_height
    );
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
( x / viewer.viz_width ) * 2 - 1, 
- ( y / viewer.viz_height ) * 2 + 1, 
0.5 
);

projector.unprojectVector( vector, camera ); */

    //let bottomLeftVector = mouseToThree(padding, viewer.viz_height - padding); //screen x,y
    //let topRightVector = mouseToThree(viewer.viz_width - padding, padding); //screen x,y

    //let bottomLeftWorld = getWorldCoordsFromVector(bottomLeftVector);
    //let topRightWorld = getWorldCoordsFromVector(topRightVector);

    let bottomLeftWorld = getWorldCoordsFromScreen(10, 700);
    let topRightWorld = getWorldCoordsFromScreen(1000, 10);

    // FIXME: currently returning full european extent in EPSG 3035
    return {
      xmin: 1053668.5589,
      ymin: 1645342.8583,
      xmax: 5724066.4412,
      ymax: 5901309.0137
    };
    /*   return {
  xmin: BL.x,
  ymin: BL.y,
  xmax: TR.x,
  ymax: TR.y
}; */
  }

  // get the position of a canvas event in world coords
  function getWorldCoordsFromScreen(clientX, clientY) {
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
      (mouseX / viewer.viz_width) * 2 - 1,
      -(mouseY / viewer.viz_height) * 2 + 1,
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
      let cell = grid_caches[viewer.resolution][index];
      //highlightPoint(cell);
      showTooltip(mouse_position, cell);
    } else {
      removeHighlights();
      hideTooltip();
    }
  }

  function sortIntersectsByDistanceToRay(intersects) {
    return _.sortBy(intersects, "distanceToRay");
  }

  function highlightPoint(cell) {
    removeHighlights();

    let geometry = new Geometry();
    // FIXME
    geometry.vertices.push(new Vector3(cell.position[0], cell.position[1], 0));
    geometry.colors = [new Color("#ffffff")];

    let material = new PointsMaterial({
      size: grid_config.point_size,
      sizeAttenuation: true,
      vertexColors: THREE.VertexColors,
      transparent: true
    });

    let point = new Points(geometry, material);
    tooltip_container.add(point);
  }

  function removeHighlights() {
    tooltip_container.remove(...tooltip_container.children);
  }

  /**
   *
   *
   */
  function updateTooltip() {
    tooltip.style.display = tooltip_state.display;
    tooltip.style.left = tooltip_state.left + "px";
    tooltip.style.top = tooltip_state.top + "px";
    //point_tip.innerText = tooltip_state.name;
    point_tip.style.background = tooltip_state.color;
    label_tip.innerHTML = `<strong>${viewer.color_column}:</strong> ${tooltip_state.name} <br> 
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
    let tooltip_width = 120;
    let x_offset = -tooltip_width / 2;
    let y_offset = 30;
    tooltip_state.display = "block";
    tooltip_state.left = mouse_position[0] + x_offset;
    tooltip_state.top = mouse_position[1] + y_offset;
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
    object.traverse(function(child) {
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
      viewer.viz_width = viewer.container_element.clientWidth;
      viewer.viz_height = viewer.container_element.clientHeight;
      label_renderer.setSize(viewer.viz_width, viewer.viz_height);
      renderer.setSize(viewer.viz_width, viewer.viz_height);
      camera.aspect = viewer.viz_width / viewer.viz_height;
      camera.updateProjectionMatrix();
    });
  }

  return viewer;
}
