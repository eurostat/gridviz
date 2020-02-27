// This is a companion pen to go along with https://beta.observablehq.com/@grantcuster/using-three-js-for-2d-data-visualization. It shows a three.js pan and zoom example using d3-zoom working on 100,000 points. The code isn't very organized here so I recommend you check out the notebook to read about what is going on.
//import * as THREE from "three";
import * as d3ScaleChromatic from "d3-scale-chromatic";
import * as d3Scale from "d3-scale";
import * as d3Zoom from "d3-zoom";
import * as d3Selection from "d3-selection";
import * as d3Fetch from "d3-fetch";
import * as d3Array from "d3-array";
import * as d3Format from "d3-format";
//import * as d3 from "d3";
import * as LEGEND from "d3-svg-legend";

import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  Points,
  PointsMaterial,
  Geometry,
  Vector3,
  Color,
  Raycaster,
  Object3D,
  Float32BufferAttribute,
  BufferGeometry,
  LineBasicMaterial,
  Line
} from "three";
import * as THREE from "three/src/constants";
import { Line2 } from "../lib/lines/Line2";
import { LineSegments2 } from "../lib/lines/LineSegments2";
import { LineGeometry } from "../lib/lines/LineGeometry";
import { LineMaterial } from "../lib/lines/LineMaterial";
import { sortBy } from "lodash";
import * as TopoJSON from "topojson";

// datasets
let grids = {
  "1km": {
    point_size: 0.0271,
    raycaster_threshold: 0.02,
    cache: []
  },
  "2km": {
    point_size: 0.055,
    raycaster_threshold: 0.02,
    cache: []
  },
  "5km": {
    point_size: 0.1375,
    raycaster_threshold: 0.02,
    cache: []
  }
};
// set inital grid
var resolution = grids["5km"];

// three.js scene params
let width = window.innerWidth - 5;
let viz_width = width;
let height = window.innerHeight - 5;
let fov = 40;
let near = 1;
let far = 100;
let raycaster_threshold = 0.02;

// Set up camera and scene
let camera = new PerspectiveCamera(fov, width / height, near, far);
let scene;
let points;
let tooltip_container;

//offset for EPSG3035 to vector3 transformation
let offsetX = -40;
let offsetY = -30;

//colouring
let array_extent = null; //d3array.extent of grid
let color_scheme = d3ScaleChromatic.interpolateTurbo;
let colorScale = d3Scale.scaleSqrt();
let background_color = 0x000000;
let border_color = 0xffffff;

// d3-legend
let grid_legend = null;

// Add canvas to DOM
let renderer = new WebGLRenderer();
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);

// for zoom
const view = d3Selection.select(renderer.domElement);

// adjust camera and renderer upon window resize
window.addEventListener("resize", () => {
  width = window.innerWidth;
  viz_width = width;
  height = window.innerHeight;

  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
});

init();
function init() {
  initScene();
  setUpZoom();
  addTooltipContainer();
  addMouseEventsToView();
  loadInitialGrid("5km");
  loadBoundariesJSON();
  addClickEventsToResButtons();
}

// initialize three.js scene
function initScene() {
  scene = new Scene();
  scene.background = new Color(background_color);
}

function loadInitialGrid(res) {
  showLoading();
  requestGrid(res).then(() => {
    // calculate extent for colour scale
    updateColorScale();
    // add initial grid to the scene
    addPointsToScene();
    hideLoading();
    //add other grids to cache
    addRemainingGridsToCache();
  });
}

// TODO: replace this with Tiling Logic.
function addRemainingGridsToCache() {
  requestGrid("2km").then(() => {
    //requestGrid("1km"); //too much
  });
}

function loadBoundariesJSON() {
  let boundariesURL = "https://raw.githubusercontent.com/eurostat/Nuts2json/master/2016/3035/20M/0.json";
  d3Fetch.json(boundariesURL).then(json => {
    let newArray = json.objects.nutsrg.geometries.filter((v, i) => {
      return v.properties.id !== "TR";
    });
    json.objects.nutsbn.geometries = newArray;

    let features = TopoJSON.feature(json, json.objects.nutsbn).features;
    addBoundariesToScene(features);
  });
}

function addBoundariesToScene(features) {
  let coords = [];
  for (let i = 0; i < features.length; i++) {
    let feature = features[i];
    for (let c = 0; c < feature.geometry.coordinates.length; c++) {
      coords = [];
      if (feature.geometry.type == "Polygon") {
        //each polygon:
        for (let s = 0; s < feature.geometry.coordinates[c].length; s++) {
          let xyz = toScreenCoordinates(feature.geometry.coordinates[c][s]);
          coords.push(xyz);
        }
        drawBoundary(coords);
      } else if (feature.geometry.type == "MultiPolygon") {
        for (let s = 0; s < feature.geometry.coordinates[c].length; s++) {
          coords = [];
          //each polygon in multipolygon:
          for (let m = 0; m < feature.geometry.coordinates[c][s].length; m++) {
            let xyz = toScreenCoordinates(feature.geometry.coordinates[c][s][m]);
            coords.push(xyz);
          }
          drawBoundary(coords);
        }
      }
    }
  }
}

function drawBoundary(coords) {
  let line_geom = new LineGeometry();
  let positions = [];
  let colors = [];
  let color = new Color(border_color);
  for (var i = 0; i < coords.length; i++) {
    //line_geom.vertices.push(new Vector3(coords[i].x, coords[i].y, 0.001));
    positions.push(coords[i].x, coords[i].y, 0.001);
    colors.push(color.r, color.g, color.b);
  }
  line_geom.setPositions(positions);
  line_geom.setColors(colors);

  /*   var line_material = new LineBasicMaterial({
    color: 0x000000,
    linewidth: 2
  }); */
  let line_material = new LineMaterial({
    //color: 0xffffff,
    linewidth: 0.001, // in pixels - a value too large will break the app
    vertexColors: THREE.VertexColors
    //resolution:  // to be set by renderer, eventually
    //dashed: false
  });
  var line = new Line2(line_geom, line_material);
  scene.add(line);
}

function toScreenCoordinates(coords) {
  // EPSG 3035 to WebGL
  return {
    x: coords[0] / 100000 + offsetX,
    y: coords[1] / 100000 + offsetY,
    z: 0
  };
}

function fromScreenCoordinates(coords) {
  // WebGL to EPSG 3035
  return {
    x: (coords[0] - offsetX) * 100000,
    y: (coords[1] - offsetY) * 100000,
    z: 0
  };
}

function changeRes(res) {
  showLoading();
  resolution = grids[res];
  //update color scale (d3.scaleChromatic)
  updateColorScale();
  // remove current points layer
  /*   scene.remove(points);
  // empty points object
  points = null; */
  // add chosen resolution as points layer
  addPointsToScene();
  //update raycaster
  raycaster.params.Points.threshold = resolution.raycaster_threshold;
}

function requestGrid(res) {
  return d3Fetch.csv("./assets/csv/pop_" + res + ".csv").then(
    csv => {
      addGridToCache(csv, res);
    },
    err => console.error(err)
  );
}

function addGridToCache(csv, res) {
  if (csv) {
    for (let i = 0; i < csv.length; i++) {
      let position = [csv[i].x, csv[i].y]; // EPSG:3035
      let value = csv[i].value;
      let point = { position, value };
      grids[res].cache.push(point);
    }
  }
}

function updateColorScale() {
  array_extent = d3Array.extent(resolution.cache, d => d.value);
  colorScale.domain(array_extent);
}

function addPointsToScene() {
  // add grid to cache if required
  // At the moment the entire file is loaded into a cache. Here is where tiling logic needs to be applied..

  //let pointsGeometry = new Geometry();
  //threejs recommends using BufferGeometry for performance
  /*   indices = [0, 1, 2, 0, 2, 3];
  bufferGeometry.setIndex(new THREE.BufferAttribute(new Uint16Array(indices), 1));  */

  let geometry = new BufferGeometry();
  let colors = [];
  let positions = [];
  for (var i = 0; i < resolution.cache.length; i++) {
    // Set vector coordinates from data
    let coords = [resolution.cache[i].position[0], resolution.cache[i].position[1]];
    // TODO: find a cleaner way of converting EPSG 3035 to Vector3 xyz. Values must be between -1 and 1
    let x = coords[0] / 100 + offsetX;
    let y = coords[1] / 100 + offsetY;
    let z = 0;
    //let vectorCoords = new Vector3(x,y,z);
    //pointsGeometry.vertices.push(vectorCoords);
    positions.push(x, y, z);

    let hex = color_scheme(colorScale(resolution.cache[i].value)); //d3 scale-chromatic
    resolution.cache[i].color = hex; //for tooltip
    let color = new Color(hex);
    colors.push(color.r, color.g, color.b);
  }
  //pointsGeometry.colors = colors;

  //buffer geometry attributes
  geometry.setAttribute("position", new Float32BufferAttribute(positions, 3));
  geometry.setAttribute("color", new Float32BufferAttribute(colors, 3));
  geometry.computeBoundingSphere();

  let pointsMaterial = new PointsMaterial({
    size: resolution.point_size,
    sizeAttenuation: true,
    //https://github.com/mrdoob/three.js/blob/master/src/constants.js
    vertexColors: THREE.VertexColors
  });

  if (!points) {
    points = new Points(geometry, pointsMaterial);
  } else {
    points.geometry = geometry;
    points.material = pointsMaterial;
  }

  scene.add(points);
  if (grid_legend) {
    // update existing legend
    updateLegend();
  } else {
    //create new legend
    addLegend();
  }
  hideLoading();
  animate();
}

function addLegend() {
  var scale = d3Scale.scaleSequentialSqrt(d3ScaleChromatic.interpolateTurbo).domain(array_extent);
  var svg = d3Selection.select("#legend");
  let format = d3Format.format(".0s");

  svg
    .append("g")
    .attr("class", "legendSqrt")
    .attr("transform", "translate(10,10)"); //padding

  grid_legend = LEGEND.legendColor()
    .shapeWidth(30)
    .cells(13)
    .labelFormat(format)
    .orient("horizontal")
    .scale(scale)
    .title("Total Population");

  svg.select(".legendSqrt").call(grid_legend);
}
function updateLegend() {
  var l = d3Selection.selectAll(".legendSqrt").remove();
  setTimeout(addLegend(), 1000);
}

// Three.js render loop
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

// add d3's zoom
function setUpZoom() {
  // define zoom
  let zoom = d3Zoom
    .zoom()
    .scaleExtent([getScaleFromZ(far), getScaleFromZ(near)])
    .on("zoom", () => {
      let d3_transform = d3Selection.event.transform;
      zoomHandler(d3_transform);
    });
  view.call(zoom);
  let initial_scale = getScaleFromZ(far);
  var initial_transform = d3Zoom.zoomIdentity.translate(viz_width / 2, height / 2).scale(initial_scale);
  zoom.transform(view, initial_transform);
  camera.position.set(0, 0, far);
}

// add events to 'change resolution' buttons
function addClickEventsToResButtons() {
  let res_buttons = document.getElementsByName("resBtn");
  res_buttons.forEach(b => addClickEventToBtn(b));
  function addClickEventToBtn(btn) {
    btn.addEventListener("click", function() {
      showLoading();
      unselectOtherButtons(res_buttons);
      btn.classList.add("active");
      setTimeout(function() {
        changeRes(btn.value);
      }, 100);
    });
  }
}

function unselectOtherButtons(elements) {
  elements.forEach(b => b.classList.remove("active"));
}

function addTooltipContainer() {
  tooltip_container = new Object3D();
  scene.add(tooltip_container);
}

function addMouseEventsToView() {
  // show population value on click
  view.on("click", () => {
    let [mouseX, mouseY] = d3Selection.mouse(view.node());
    let mouse_position = [mouseX, mouseY];
    checkIntersects(mouse_position);
  });

  view.on("mouseleave", () => {
    removeHighlights();
  });
}

function zoomHandler(d3_transform) {
  let scale = d3_transform.k;
  let x = -(d3_transform.x - viz_width / 2) / scale;
  let y = (d3_transform.y - height / 2) / scale;
  let z = getZFromScale(scale);
  camera.position.set(x, y, z);
  //get topoNames
  //getPlacenames()
}

function getPlacenames() {
  //http://api.geonames.org/citiesJSON?north=44.1&south=-9.9&east=-22.4&west=55.2&lang=de&username=demo
  //let north =
  //let URL =
  d3Fetch.json(URL).then(
    json => {
      console.log(json);
    },
    err => console.error(err)
  );
}

function getScaleFromZ(camera_z_position) {
  let half_fov = fov / 2;
  let half_fov_radians = toRadians(half_fov);
  let half_fov_height = Math.tan(half_fov_radians) * camera_z_position;
  let fov_height = half_fov_height * 2;
  let scale = height / fov_height; // Divide visualization height by height derived from field of view
  return scale;
}

function getZFromScale(scale) {
  let half_fov = fov / 2;
  let half_fov_radians = toRadians(half_fov);
  let scale_height = height / scale;
  let camera_z_position = scale_height / (2 * Math.tan(half_fov_radians));
  return camera_z_position;
}

function toRadians(angle) {
  return angle * (Math.PI / 180);
}

// Click and tooltip interaction
const raycaster = new Raycaster();
raycaster.params.Points.threshold = resolution.raycaster_threshold;

function mouseToThree(mouseX, mouseY) {
  return new Vector3((mouseX / viz_width) * 2 - 1, -(mouseY / height) * 2 + 1, 1);
}

function checkIntersects(mouse_position) {
  let mouse_vector = mouseToThree(...mouse_position);
  raycaster.setFromCamera(mouse_vector, camera);
  let intersects = raycaster.intersectObject(points);
  if (intersects[0]) {
    let sorted_intersects = sortIntersectsByDistanceToRay(intersects);
    let intersect = sorted_intersects[0];
    let index = intersect.index;
    let cell = resolution.cache[index];
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
    size: resolution.point_size,
    sizeAttenuation: false,
    vertexColors: THREE.VertexColors,
    transparent: true
  });

  let point = new Points(geometry, material);
  tooltip_container.add(point);
}

function removeHighlights() {
  tooltip_container.remove(...tooltip_container.children);
}

// Initial tooltip state
let tooltip_state = { display: "none" };

let tooltip_template = document.createRange()
  .createContextualFragment(`<div id="tooltip" style="display: none; position: absolute; pointer-events: none; font-size: 13px; width: 120px; text-align: center; line-height: 1; padding: 6px; background: white; font-family: sans-serif;">
     <div id="label_tip" style="padding: 4px; margin-bottom: 4px;"></div>
  <div id="point_tip" style="padding: 4px; margin-bottom: 4px;"></div>
</div>`);
document.body.append(tooltip_template);

let $tooltip = document.querySelector("#tooltip");
let $point_tip = document.querySelector("#point_tip");
let $label_tip = document.querySelector("#label_tip");

function updateTooltip() {
  $tooltip.style.display = tooltip_state.display;
  $tooltip.style.left = tooltip_state.left + "px";
  $tooltip.style.top = tooltip_state.top + "px";
  //$point_tip.innerText = tooltip_state.name;
  $point_tip.style.background = tooltip_state.color;
  $label_tip.innerText = `Population: ${tooltip_state.name}`;
}

function showTooltip(mouse_position, cell) {
  let tooltip_width = 120;
  let x_offset = -tooltip_width / 2;
  let y_offset = 30;
  tooltip_state.display = "block";
  tooltip_state.left = mouse_position[0] + x_offset;
  tooltip_state.top = mouse_position[1] + y_offset;
  tooltip_state.name = cell.value;
  tooltip_state.color = cell.color;
  updateTooltip();
}

function hideTooltip() {
  tooltip_state.display = "none";
  updateTooltip();
}

function showLoading() {
  document.getElementById("loading-gif").style.display = "block";
}
function hideLoading() {
  document.getElementById("loading-gif").style.display = "none";
}
