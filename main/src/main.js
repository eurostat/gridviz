// This is a companion pen to go along with https://beta.observablehq.com/@grantcuster/using-three-js-for-2d-data-visualization. It shows a three.js pan and zoom example using d3-zoom working on 100,000 points. The code isn't very organized here so I recommend you check out the notebook to read about what is going on.
//import * as THREE from "three";
import * as d3ScaleChromatic from "d3-scale-chromatic";
import * as d3Scale from "d3-scale";
import * as d3Zoom from "d3-zoom";
import * as d3Selection from "d3-selection";
import * as d3Fetch from "d3-fetch";
import * as d3Array from "d3-array";
import * as THREE from "three/src/constants";

import { Scene, PerspectiveCamera, WebGLRenderer, Points, PointsMaterial, Geometry, Vector3, Color, Raycaster, Object3D } from "three";

//import Stats from "stats.js";
import { sortBy } from "lodash";
//var dsv = require("d3-dsv");

//1km
//let point_size = 0.0000271;

//2km
//let point_size = 0.00005;

//5km
//let point_size = 0.0001375;

let grids = {
  "1km": {
    point_size: 0.0000271,
    raycaster_threshold: 0.00002,
    cache: []
  },
  "2km": {
    point_size: 0.00005,
    raycaster_threshold: 0.00002,
    cache: []
  },
  "5km": {
    point_size: 0.0001375,
    raycaster_threshold: 0.00002,
    cache: []
  }
};

var resolution = grids["5km"]; //inital view is of the 5km grid

let width = window.innerWidth - 5;
let viz_width = width;
let height = window.innerHeight - 5;

let fov = 40;
let near = 0.001;
let far = 0.1;
let raycaster_threshold = 0.00002;

//offset for EPSG3035 to vector3 transformation
let offsetX = -0.04;
let offsetY = -0.03;

//colouring
let color_scheme = d3ScaleChromatic.interpolateTurbo;
let colorScale = d3Scale.scaleSqrt();
let background_color = 0x000;

// Set up camera and scene
let camera = new PerspectiveCamera(fov, width / height, near, far);
let scene;
let points;
let tooltip_container;
let cells = [];

let color_array = ["#1f78b4", "#b2df8a", "#33a02c", "#fb9a99", "#e31a1c", "#fdbf6f", "#ff7f00", "#6a3d9a", "#cab2d6", "#ffff99"];

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

function addRemainingGridsToCache() {
  requestGrid("2km").then(() => {
    requestGrid("1km");
  });
}

function changeRes(res) {
  showLoading();
  resolution = grids[res];
  console.log(grids, resolution);

  //remove existing points layer > load new points into cache if required > add new resolution to scene
  if (grids[res].cache.length > 0) {
    showLoading();
    // remove current points layer
    scene.remove(points);
    points = null;
    // add chosen resolution as points layer
    addPointsToScene();
  } else {
    if (points) {
      scene.remove(points);
      points = null;
    }
  }
}

function requestGrid(res) {
  return d3Fetch.csv("./assets/csv/pop_" + res + ".csv").then(
    csv => {
      addGridToCache(csv, res);
    },
    err => console.log(err)
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
  colorScale.domain(d3Array.extent(resolution.cache, d => d.value));
}

function addPointsToScene() {
  // add grid to cache if required
  // At the moment the entire file is loaded into a cache. Here is where the tiling logic needs to be applied..
  if (!resolution.cache.length > 0) {
  }

  let pointsGeometry = new Geometry();
  let colors = [];
  for (let cell of resolution.cache) {
    // Set vector coordinates from data
    let coords = [cell.position[0], cell.position[1]];
    // TODO: find a cleaner way of converting EPSG 3035 to Vector3. Values must be between -1 and 1
    let vectorCoords = new Vector3(coords[0] / 100000 + offsetX, coords[1] / 100000 + offsetY, 0);
    // in Threejs, colors and vertices are added to the geometry object in separate, corresponding arrays
    pointsGeometry.vertices.push(vectorCoords);
    let hex = color_scheme(colorScale(cell.value)); //d3 scale-chromatic
    cell.color = hex; //for tooltip
    colors.push(new Color(hex));
  }
  pointsGeometry.colors = colors;

  let pointsMaterial = new PointsMaterial({
    size: resolution.point_size,
    sizeAttenuation: true,
    //https://github.com/mrdoob/three.js/blob/master/src/constants.js
    vertexColors: THREE.VertexColors
  });

  points = new Points(pointsGeometry, pointsMaterial);
  scene.add(points);
  hideLoading();
  animate();
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
      console.log(btn);
      changeRes(btn.value);
    });
  }
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
raycaster.params.Points.threshold = raycaster_threshold;

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
    highlightPoint(cell);
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
  geometry.colors = [new Color(color_array[1])];

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
