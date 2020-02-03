var THREE = require("three");
var Stats = require("stats.js");
var Viewer = require("./viewer.js");
var utils = require("./utils.js");
import { MapControls } from "../controls/OrbitControls.js";

var pointCloud;
var viewer = null;

///////raycasting variables///////
var mouse = new THREE.Vector2();
var intersection = null;

/////// viewer constructor options ///////
const viewerOptions = {
  pixelRatio: window.devicePixelRatio,
  width: window.innerWidth,
  height: window.innerHeight,
  near_plane: 0.1,
  far_plane: 150,
  initial_camera_position: {
    x: 7.132992462781062,
    y: 3.3446920817392685,
    z: 53.62443698856341
  },
  initial_camera_lookAt: new THREE.Vector3(0, 0, 0),
  field_of_view: 45,
  raycaster_threshold: 0.009,
  statsBox: true,
  point_size: 0.001,
  point_attenuation: true
};

init();
animate();

function init() {
  viewer = new Viewer.default(viewerOptions);

  // EVENTS
  document.addEventListener("click", onDocumentClick, false);

  let pointsMaterial;

  var cells = [];
  //TODO use BufferGeometry() rather than Geometry()?
  //see https://threejsfundamentals.org/threejs/lessons/threejs-custom-buffergeometry.html
  const pointsGeometry = new THREE.Geometry();
  const colors = [];

  utils.showLoading();
  getCSV("./assets/csv/pop_1km.csv", data => {
    var csvArray = parseCSV(data);
    //add geometries
    for (var i = 1; i < csvArray.length; i++) {
      let cell = csvArray[i];
      var x = parseInt(cell[1]) / 100 - 35; //TODO: convert to screen coords properly
      var y = parseInt(cell[0]) / 100 - 35;
      var z = 0;
      const vertex = new THREE.Vector3(x, y, z);
      vertex.userData = {
        population: cell[2]
      }; //for cell interactivity
      pointsGeometry.vertices.push(vertex);
      const color = new THREE.Color(valueToColor(cell[2]));
      colors.push(color);
    }

    pointsGeometry.colors = colors;
    pointsMaterial = new THREE.PointsMaterial({
      // map: spriteMap,
      size: viewerOptions.point_size,
      // transparent: true,
      // blending: THREE.AdditiveBlending,
      sizeAttenuation: viewerOptions.point_attenuation,
      vertexColors: THREE.VertexColors
    });
    pointCloud = new THREE.Points(pointsGeometry, pointsMaterial);
    pointCloud.geometry.boundingBox = null;
    const pointsContainer = new THREE.Object3D();
    pointsContainer.add(pointCloud);
    viewer.addPoints(pointsContainer, pointsMaterial);

    //visualize grid cells as BoxBuffers?
    /*     var geometry = new THREE.BoxBufferGeometry( 1, 1, 1 );
              geometry.translate( 0, 0.5, 0 );
              var material = new THREE.MeshPhongMaterial( { color: 0xffffff, flatShading: true } );
              for ( var i = 0; i < 500; i ++ ) {
                  var mesh = new THREE.Mesh( geometry, material );
                  mesh.position.x = Math.random() * 1600 - 800;
                  mesh.position.y = 0;
                  mesh.position.z = Math.random() * 1600 - 800;
                  mesh.scale.x = 20;
                  mesh.scale.y = Math.random() * 80 + 10;
                  mesh.scale.z = 20;
                  mesh.updateMatrix();
                  mesh.matrixAutoUpdate = false;
                  scene.add( mesh );
              } */
    utils.hideLoading();
  });
}

function valueToColor(value) {
  if (value > 10000) {
    return 0xff0f00; //red
  } else if (value > 5000) {
    return 0xffce08; //orange
  } else if (value > 1000) {
    return 0xebff0a; //yellow
  } else if (value > 100) {
    return 0x55e238; //green
  } else if (value > 0) {
    return 0x005cff; //blue
  }
}

// Three.js render loop
function animate() {
  requestAnimationFrame(animate);
  viewer.renderer.render(viewer.scene, viewer.camera);
  viewer.stats.update();
}

// Click event
var highlightedColor = new THREE.Color();
highlightedColor.setRGB(1, 1, 1);

function onDocumentClick(event) {
  event.preventDefault();
  event.stopPropagation();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  //mouse over points raycaster
  if (pointCloud) {
    viewer.raycaster.setFromCamera(mouse, viewer.camera);
    var intersections = viewer.raycaster.intersectObject(pointCloud, false);
    intersection = intersections.length > 0 ? intersections[0] : null;
    //highlight logic
    if (intersection !== null) {
      //change colour of identified point
      let index = intersection.index;
      pointCloud.geometry.colors[index] = highlightedColor;
      pointCloud.geometry.colorsNeedUpdate = true;
      //get indicator value TODO:make dynamic:
      let indicator = pointCloud.geometry.vertices[index].userData.population;
      console.info("CLICKED VALUE: ", indicator);
    }
  }
}

function getCSV(url, callback) {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      try {
        var data = xmlhttp.responseText;
      } catch (err) {
        console.log(err.message + " in " + xmlhttp.responseText);
        return;
      }
      callback(data);
    }
  };
  xmlhttp.open("GET", url, true);
  xmlhttp.send();
}

function parseCSV(str) {
  var arr = [];
  var quote = false; // true means we're inside a quoted field

  // iterate over each character, keep track of current row and column (of the returned array)
  for (var row = 0, col = 0, c = 0; c < str.length; c++) {
    var cc = str[c],
      nc = str[c + 1]; // current character, next character
    arr[row] = arr[row] || []; // create a new row if necessary
    arr[row][col] = arr[row][col] || ""; // create a new column (start with empty string) if necessary

    // If the current character is a quotation mark, and we're inside a
    // quoted field, and the next character is also a quotation mark,
    // add a quotation mark to the current column and skip the next character
    if (cc == '"' && quote && nc == '"') {
      arr[row][col] += cc;
      ++c;
      continue;
    }

    // If it's just one quotation mark, begin/end quoted field
    if (cc == '"') {
      quote = !quote;
      continue;
    }

    // If it's a comma and we're not in a quoted field, move on to the next column
    if (cc == "," || (cc == ";" && !quote)) {
      ++col;
      continue;
    }

    // If it's a newline (CRLF) and we're not in a quoted field, skip the next character
    // and move on to the next row and move to column 0 of that new row
    if (cc == "\r" && nc == "\n" && !quote) {
      ++row;
      col = 0;
      ++c;
      continue;
    }

    // If it's a newline (LF or CR) and we're not in a quoted field,
    // move on to the next row and move to column 0 of that new row
    if (cc == "\n" && !quote) {
      ++row;
      col = 0;
      continue;
    }
    if (cc == "\r" && !quote) {
      ++row;
      col = 0;
      continue;
    }

    // Otherwise, append the current character to the current column
    arr[row][col] += cc;
  }
  return arr;
}
