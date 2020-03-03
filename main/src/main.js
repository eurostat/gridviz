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
  Group
  //LineBasicMaterial,
  //Line
} from "three";
import * as THREE from "three/src/constants";
// extra Three.js modules not included in main build
import { Line2 } from "../lib/lines/Line2";
import { LineSegments2 } from "../lib/lines/LineSegments2";
import { LineGeometry } from "../lib/lines/LineGeometry";
import { LineMaterial } from "../lib/lines/LineMaterial";
import { CSS2DRenderer, CSS2DObject } from "../lib/CSS2D/CSS2DRenderer";

// helpers
import { sortBy } from "lodash";
import * as TopoJSON from "topojson";

//boundaries json
let nuts_20m_URL = "https://raw.githubusercontent.com/eurostat/Nuts2json/master/2016/3035/20M/0.json";
let nuts_10m_URL = "https://raw.githubusercontent.com/eurostat/Nuts2json/master/2016/3035/10M/0.json";
let nuts_simplification = "20M"; //current nuts2json
let nuts_scale_threshold = 100; //scale at which nuts2json changes simplification
let line_material = null;
let line_width = 0.002; //GL.LINE height
let line_z = 0.002; //line vertices z coordinate
let boundaries_group = null; //THREE.Group for nuts borders

//threejs points object params
let points_material = null;
let points_geometry = null;
let point_z = 0.001;

// datasets
//TODO: adjust 2km & 1km raycaster_thresholds
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
let viz_width = window.innerWidth - 5; //account for additional DOM elements
let viz_height = window.innerHeight - 5;
let fov = 40;
let near = 0.001; //minScale
let far = 100; //maxScale
let raycaster_threshold = 0.02;

// Set up camera and scene
let camera = new PerspectiveCamera(fov, viz_width / viz_height, near, far);
let scene;
let points;
let tooltip_container;

//offset for EPSG3035 to vector3 transformation
let offset = { x: -40, y: -30 };

//colouring
let array_extent = null; //d3array.extent of grid
let color_scheme = d3ScaleChromatic.interpolateTurbo;
let colorScale = d3Scale.scaleSqrt();
let background_color = 0x000000;
let border_color = 0xffffff;

// d3-legend
let grid_legend = null;

//tooltip
let tooltip_state = null;

// Add renderer canvas to DOM
let renderer = new WebGLRenderer();
renderer.setSize(viz_width, viz_height);
document.body.appendChild(renderer.domElement);

// placenames
let label_height = 0.001; //placenames z value
let label_nodes = [];
let currentExtent = null; //3035 bbox

// placenames CSS renderer
let labelRenderer = new CSS2DRenderer();
labelRenderer.setSize(viz_width, viz_height);
labelRenderer.domElement.style.position = "absolute";
labelRenderer.domElement.style.top = 0;
document.body.appendChild(labelRenderer.domElement);

// for zoom
const view = d3Selection.select(renderer.domElement);

// adjust camera and renderer upon window resize
window.addEventListener("resize", () => {
  viz_width = window.innerWidth;
  viz_height = window.innerHeight;

  renderer.setSize(viz_width, viz_height);
  camera.aspect = viz_width / viz_height;
  camera.updateProjectionMatrix();
});

init();
function init() {
  initScene();
  setUpPanAndZoom();
  addTooltipContainer();
  addEventListeners();
  loadInitialGrid("5km");
  loadBoundariesJSON(nuts_20m_URL);
}

function addEventListeners() {
  addMouseEventsToView();
  addClickEventsToResButtons();
  addChangeEventToDropdowns();
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

function loadBoundariesJSON(url) {
  d3Fetch.json(url).then(json => {
    let newArray = json.objects.nutsrg.geometries.filter((v, i) => {
      return v.properties.id !== "TR"; //omit Turkey
    });
    json.objects.nutsbn.geometries = newArray;
    let features = TopoJSON.feature(json, json.objects.nutsbn).features;
    addBoundariesToScene(features);
  });
}

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
          let xyz = toWorldCoordinates(feature.geometry.coordinates[c][s]);
          coords.push(xyz);
        }
        boundaries_group.add(createLineFromCoords(coords));
      } else if (feature.geometry.type == "MultiPolygon") {
        for (let s = 0; s < feature.geometry.coordinates[c].length; s++) {
          //each polygon in multipolygon:
          coords = [];
          for (let m = 0; m < feature.geometry.coordinates[c][s].length; m++) {
            let xyz = toWorldCoordinates(feature.geometry.coordinates[c][s][m]);
            coords.push(xyz);
          }
          boundaries_group.add(createLineFromCoords(coords));
        }
      }
    }
  }
  if (initial) {
    scene.add(boundaries_group);
  }
}

function createLineFromCoords(coords) {
  let line_geom = new LineGeometry();
  let positions = [];
  let colors = [];
  let color = new Color(border_color);
  for (var i = 0; i < coords.length; i++) {
    positions.push(coords[i].x, coords[i].y, line_z);
    colors.push(color.r, color.g, color.b);
  }
  line_geom.setPositions(positions);
  line_geom.setColors(colors);
  if (!line_material) {
    line_material = new LineMaterial({
      linewidth: line_width,
      vertexColors: THREE.VertexColors
    });
  }
  //line2 allows custom linewidth (but not currently included in main threejs build)
  return new Line2(line_geom, line_material);
}

// EPSG 3035 to WebGL
function toWorldCoordinates(coords) {
  return {
    x: coords[0] / 100000 + offset.x,
    y: coords[1] / 100000 + offset.y,
    z: 0
  };
}

// WebGL to EPSG 3035
function fromWorldCoordinates(coords) {
  return {
    x: (coords[0] - offset.x) * 100000,
    y: (coords[1] - offset.y) * 100000
  };
}

function changeRes(res) {
  showLoading();
  resolution = grids[res];
  //update color scale (d3.scaleChromatic)
  updateColorScale();
  // add or update points layer
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
function onChangeColourScheme(scheme) {
  color_scheme = d3ScaleChromatic[scheme];
  updatePointsColors();
  updateLegend();
}

function updatePointsColors() {
  let colors = [];
  for (var i = 0; i < resolution.cache.length; i++) {
    let hex = color_scheme(colorScale(resolution.cache[i].value)); //d3 scale-chromatic
    resolution.cache[i].color = hex; //for tooltip
    let color = new Color(hex);
    colors.push(color.r, color.g, color.b);
  }
  //update colors
  points_geometry.setAttribute("color", new Float32BufferAttribute(colors, 3));
  points_geometry.computeBoundingSphere();
  points.geometry = points_geometry;
}

function addPointsToScene() {
  //threejs recommends using BufferGeometry instead of Geometry for performance
  /*   indices = [0, 1, 2, 0, 2, 3];
  bufferGeometry.setIndex(new THREE.BufferAttribute(new Uint16Array(indices), 1));  */
  if (!points_geometry) {
    points_geometry = new BufferGeometry();
  }

  let colors = [];
  let positions = [];
  for (var i = 0; i < resolution.cache.length; i++) {
    // Set vector coordinates from data
    let coords = [resolution.cache[i].position[0], resolution.cache[i].position[1]];
    let x = coords[0] / 100 + offset.x; //not using toWorldCoordinates() here because zeros have been removed from the csv file
    let y = coords[1] / 100 + offset.y;
    let z = point_z;
    positions.push(x, y, z);
    let hex = color_scheme(colorScale(resolution.cache[i].value)); //d3 scale-chromatic
    resolution.cache[i].color = hex; //for tooltip
    let color = new Color(hex);
    colors.push(color.r, color.g, color.b);
  }
  //set buffer geometry attributes
  points_geometry.setAttribute("position", new Float32BufferAttribute(positions, 3));
  points_geometry.setAttribute("color", new Float32BufferAttribute(colors, 3));
  points_geometry.computeBoundingSphere();
  //create or reuse points Material
  if (!points_material) {
    points_material = new PointsMaterial({
      size: resolution.point_size,
      sizeAttenuation: true,
      //https://github.com/mrdoob/three.js/blob/master/src/constants.js
      vertexColors: THREE.VertexColors
    });
  } else {
    points_material.size = resolution.point_size;
  }
  //create or reuse points object
  if (!points) {
    points = new Points(points_geometry, points_material);
    points.renderOrder = 1; //bottom
    scene.add(points);
  } else {
    points.geometry = points_geometry;
    points.material = points_material;
  }
  //create or update legend
  if (grid_legend) {
    updateLegend();
  } else {
    addLegend();
  }
  hideLoading();
  animate();
}

function addLegend() {
  var legendScale = d3Scale.scaleSequentialSqrt(color_scheme).domain(array_extent);
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
    .scale(legendScale)
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
  labelRenderer.render(scene, camera);
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

function addChangeEventToDropdowns() {
  let sel = document.getElementById("schemes");
  sel.addEventListener("change", function(e) {
    onChangeColourScheme(e.currentTarget.value);
  });
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

// add d3's zoom
function setUpPanAndZoom() {
  // define zoom
  let zoom = d3Zoom
    .zoom()
    .scaleExtent([getScaleFromZ(far), getScaleFromZ(near)])
    .on("zoom", () => {
      let event = d3Selection.event;
      if (event) zoomHandler(event);
    })
    .on("end", () => {
      let event = d3Selection.event;
      if (event) zoomEnd(event);
    });

  view.call(zoom);

  let initial_scale = getScaleFromZ(far);
  var initial_transform = d3Zoom.zoomIdentity.translate(viz_width / 2, viz_height / 2).scale(initial_scale);
  zoom.transform(view, initial_transform);

  //initial camera position
  camera.position.set(0, 0, far);
}

function zoomHandler(event) {
  let scale = event.transform.k;
  let x = -(event.transform.x - viz_width / 2) / scale;
  let y = (event.transform.y - viz_height / 2) / scale;
  let z = getZFromScale(scale);
  camera.position.set(x, y, z);
}

function zoomEnd(event) {
  hideTooltip();
  let scale = event.transform.k;
  // get placenames
  if (points) {
    //placenames are added to the points object
    getPlacenames(scale);
  }

  //change nuts simplification (or not) based on current scale
  if (scale > nuts_scale_threshold && nuts_simplification !== "10M") {
    loadBoundariesJSON(nuts_10m_URL);
    nuts_simplification = "10M";
  } else if (scale < nuts_scale_threshold && nuts_simplification !== "20M") {
    loadBoundariesJSON(nuts_20m_URL);
    nuts_simplification = "20M";
  }
}

function getPlacenames(scale) {
  let where;
  // labelling thresholds
  if (scale > 0 && scale < 1) {
    where = "POPL_2011>1000000";
  } else if (scale > 1 && scale < 2) {
    where = "POPL_2011>1000000";
  } else if (scale > 2 && scale < 4) {
    where = "POPL_2011>1000000";
  } else if (scale > 4 && scale < 8) {
    where = "POPL_2011>1000000";
  } else if (scale > 8 && scale < 16) {
    where = "POPL_2011>1000000";
  } else if (scale > 16 && scale < 32) {
    where = "POPL_2011>1000000";
  } else if (scale > 32 && scale < 64) {
    where = "POPL_2011>1000000";
  } else if (scale > 64 && scale < 128) {
    where = "POPL_2011>300000";
  } else if (scale > 128 && scale < 256) {
    where = "POPL_2011>300000";
  } else if (scale > 256 && scale < 512) {
    where = "POPL_2011>10000";
  } else if (scale > 512 && scale < 1024) {
    where = "POPL_2011>10000";
  } else if (scale > 1024) {
    where = "POPL_2011>10000";
  }
  let envelope = getCurrentViewExtent();
  currentExtent = envelope;
  //ESRI Rest API envelope: <xmin>,<ymin>,<xmax>,<ymax> (bottom left x,y , top right x,y)
  let baseURL = "https://ec.europa.eu/regio/regiogis/gis/arcgis/rest/services/Urban/urban_centres_towns/MapServer/0/query?";
  let URL =
    baseURL +
    "where=" +
    where +
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
  d3Fetch.json(uri).then(res => {
    if (res.features.length > 0) {
      addPlacenamesToScene(res.features);
    }
  });
}

function addPlacenamesToScene(placenames) {
  removePlacenamesFromScene();
  for (let p = 0; p < placenames.length; p++) {
    let label = createPlacenameLabelObject(placenames[p]);
    // TODO: group objects manually
    points.add(label);
  }
}

function removePlacenamesFromScene() {
  // remove label objects from points layer
  for (var i = points.children.length - 1; i >= 0; i--) {
    points.remove(points.children[i]);
  }
}

function createPlacenameLabelObject(placename) {
  var placeDiv = document.createElement("div");
  placeDiv.className = "placename";
  placeDiv.textContent = placename.attributes.city_town_name;
  placeDiv.style.marginTop = "-1em";
  //label_nodes.push(placeDiv);
  var placeLabel = new CSS2DObject(placeDiv);
  let pos = toWorldCoordinates([placename.geometry.x, placename.geometry.y]);
  placeLabel.position.set(pos.x, pos.y, label_height);
  return placeLabel;
}

function getCurrentViewExtent() {
  let z = 0.5;
  let padding = 10; // making sure the screen coords hit the scene
  //https://stackoverflow.com/questions/13055214/mouse-canvas-x-y-to-three-js-world-x-y-z

  /*   var elem = renderer.domElement, 
  boundingRect = elem.getBoundingClientRect(),
  x = (clientX - boundingRect.left) * (elem.width / boundingRect.width),
  y = (clientY - boundingRect.top) * (elem.height / boundingRect.height);

var vector = new THREE.Vector3( 
  ( x / viz_width ) * 2 - 1, 
  - ( y / viz_height ) * 2 + 1, 
  0.5 
);

projector.unprojectVector( vector, camera ); */

  //let bottomLeftVector = mouseToThree(padding, viz_height - padding); //screen x,y
  //let topRightVector = mouseToThree(viz_width - padding, padding); //screen x,y

  //let bottomLeftWorld = getWorldCoordsFromVector(bottomLeftVector);
  //let topRightWorld = getWorldCoordsFromVector(topRightVector);

  let bottomLeftWorld = getWorldCoordsFromScreen(10, 700);
  let topRightWorld = getWorldCoordsFromScreen(1000, 10);

  let BL = fromWorldCoordinates([bottomLeftWorld.x, bottomLeftWorld.y]);
  let TR = fromWorldCoordinates([topRightWorld.x, topRightWorld.y]);

  // FIXME: currently returning full european extent
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

  vec.set((clientX / window.innerWidth) * 2 - 1, -(clientY / window.innerHeight) * 2 + 1, 0.5);

  vec.unproject(camera);

  vec.sub(camera.position).normalize();

  var distance = -camera.position.z / vec.z;

  pos.copy(camera.position).add(vec.multiplyScalar(distance));
  return pos;
}

function getScaleFromZ(camera_z_position) {
  let half_fov = fov / 2;
  let half_fov_radians = toRadians(half_fov);
  let half_fov_height = Math.tan(half_fov_radians) * camera_z_position;
  let fov_height = half_fov_height * 2;
  let scale = viz_height / fov_height; // Divide visualization height by height derived from field of view
  return scale;
}

function getZFromScale(scale) {
  let half_fov = fov / 2;
  let half_fov_radians = toRadians(half_fov);
  let scale_height = viz_height / scale;
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
  return new Vector3((mouseX / viz_width) * 2 - 1, -(mouseY / viz_height) * 2 + 1, 0.5);
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
tooltip_state = { display: "none" };

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
  if (tooltip_state) {
    tooltip_state.display = "none";
    updateTooltip();
  }
}

function hideObject(object) {
  object.traverse(function(child) {
    if (child instanceof Points) {
      child.visible = false;
    }
  });
}
function showLoading() {
  document.getElementById("loading-gif").style.display = "block";
}
function hideLoading() {
  document.getElementById("loading-gif").style.display = "none";
}
