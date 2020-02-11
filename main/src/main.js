// This is a companion pen to go along with https://beta.observablehq.com/@grantcuster/using-three-js-for-2d-data-visualization. It shows a three.js pan and zoom example using d3-zoom working on 100,000 points. The code isn't very organized here so I recommend you check out the notebook to read about what is going on.
import * as THREE from "three";
import * as d3 from "d3";
import Stats from "stats.js";
import { sortBy } from "lodash";
//var dsv = require("d3-dsv");

let point_size = 0.00005;

let width = window.innerWidth;
let viz_width = width;
let height = window.innerHeight;

let fov = 40;
let near = 0.001;
let far = 0.1;
let raycaster_threshold =  0.00002;

//offset for EPSG3035 to vector3 transformation
let offsetX = -0.04;
let offsetY = -0.03;

//colouring
let color_scheme = d3.interpolateTurbo;
let colorScale = d3.scaleSqrt();

// Set up camera and scene
let camera = new THREE.PerspectiveCamera(fov, width / height, near, far);
let scene;
let points;
let hoverContainer;
let cells = [];

window.addEventListener("resize", () => {
  width = window.innerWidth;
  viz_width = width;
  height = window.innerHeight;

  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
});

let color_array = ["#1f78b4", "#b2df8a", "#33a02c", "#fb9a99", "#e31a1c", "#fdbf6f", "#ff7f00", "#6a3d9a", "#cab2d6", "#ffff99"];

// Add canvas
let renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);

let zoom = d3
  .zoom()
  .scaleExtent([getScaleFromZ(far), getScaleFromZ(near)])
  .on("zoom", () => {
    let d3_transform = d3.event.transform;
    zoomHandler(d3_transform);
  });

const view = d3.select(renderer.domElement);
function setUpZoom() {
  view.call(zoom);
  let initial_scale = getScaleFromZ(far);
  var initial_transform = d3.zoomIdentity.translate(viz_width / 2, height / 2).scale(initial_scale);
  zoom.transform(view, initial_transform);
  camera.position.set(0, 0, far);
}
setUpZoom();

// set up data
d3.csv("./assets/csv/pop_2km.csv").then(csv => {
  colorScale.domain(d3.extent(csv, d => d.value));

 
  for (let i = 0; i < csv.length; i++) {
    let position = [csv[i].x, csv[i].y]; // EPSG:3035
    let value = csv[i].value;
    let point = { position, value };
    cells.push(point);
  }

  let pointsGeometry = new THREE.Geometry();
  let colors = [];
  for (let cell of cells) {
    // Set vector coordinates from data
    let coords = [cell.position[0], cell.position[1]];
    // TODO: find a cleaner way of converting EPSG 3035 to Vector3. Values must be between -1 and 1
    let vectorCoords = new THREE.Vector3(coords[0] / 100000 + offsetX, coords[1] / 100000 + offsetY, 0);
    // in Threejs, colors and vertices are added to the geometry object in separate, corresponding arrays
    pointsGeometry.vertices.push(vectorCoords);
    let hex = color_scheme(colorScale(cell.value)); //d3 scale-chromatic
    cell.color = hex; //for tooltip
    colors.push(new THREE.Color(hex));
  }
  pointsGeometry.colors = colors;

  let pointsMaterial = new THREE.PointsMaterial({
    size: point_size,
    sizeAttenuation: true,
    vertexColors: THREE.VertexColors
  });

  points = new THREE.Points(pointsGeometry, pointsMaterial);

  scene = new THREE.Scene();
  scene.add(points);
  scene.background = new THREE.Color(0x000);

  hoverContainer = new THREE.Object3D();
  scene.add(hoverContainer);

   view.on("click", () => {
  let [mouseX, mouseY] = d3.mouse(view.node());
  let mouse_position = [mouseX, mouseY];
  checkIntersects(mouse_position);
});

view.on("mouseleave", () => {
  removeHighlights();
}); 
  document.getElementById("loading-gif").style.display = "none";

  animate();
});

// Three.js render loop
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
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

// Hover and tooltip interaction

const raycaster = new THREE.Raycaster();
raycaster.params.Points.threshold = raycaster_threshold;

function mouseToThree(mouseX, mouseY) {
  return new THREE.Vector3((mouseX / viz_width) * 2 - 1, -(mouseY / height) * 2 + 1, 1);
}

function checkIntersects(mouse_position) {
  let mouse_vector = mouseToThree(...mouse_position);
  raycaster.setFromCamera(mouse_vector, camera);
  let intersects = raycaster.intersectObject(points);
  if (intersects[0]) {
    let sorted_intersects = sortIntersectsByDistanceToRay(intersects);
    let intersect = sorted_intersects[0];
    let index = intersect.index;
    let cell = cells[index];
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

  let geometry = new THREE.Geometry();
  geometry.vertices.push(new THREE.Vector3(cell.position[0], cell.position[1], 0));
  geometry.colors = [new THREE.Color(color_array[1])];

  let material = new THREE.PointsMaterial({
    size: point_size,
    sizeAttenuation: false,
    vertexColors: THREE.VertexColors,
    transparent: true
  });

  let point = new THREE.Points(geometry, material);
  hoverContainer.add(point);
}

function removeHighlights() {
  hoverContainer.remove(...hoverContainer.children);
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
