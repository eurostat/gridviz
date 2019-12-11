
var THREE = require('three');
var Stats = require("stats.js");
/* require("./orbitControls"); */

const width = window.innerWidth - 25;
const height = window.innerHeight - 25;
const point_size = 0.001;
const near_plane = 1;
const far_plane = 300;

// Add canvas
let renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);

// Add stats box
stats = new Stats();
stats.dom.style.position = 'absolute';
stats.dom.style.top = '0px';
stats.dom.style.right = '0px'
document.body.appendChild(stats.dom);


// Set up camera and scene
/*     let camera = new THREE.OrthographicCamera(
        45, //fov — Camera frustum vertical field of view.
        width / height, //aspect — Camera frustum aspect ratio
        near_plane, //near — Camera frustum near plane
        far_plane//far — Camera frustum far plane
    ); */
var camera = new THREE.OrthographicCamera(width / - 2, width / 2, height / 2, height / - 2, 1, 1000);


// That's it. panZoom wil now listen to events from `container`. You can pan and
// zoom with your mouse or fingers (on touch device)

/* camera.position.set(0.9, 0.9, far_plane);
camera.lookAt(new THREE.Vector3(0, 0, 0)); */
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);


// To turn on a map-like navigation:
var createPanZoom = require('three.map.control');

// We assume that three.js scene is hosted inside DOM element `container`
var panZoom = createPanZoom(camera, renderer.domElement);

/* controls = new THREE.OrbitControls(camera, renderer.domElement); */

let pointsMaterial;

var cells = [];
const pointsGeometry = new THREE.Geometry();
const colors = [];

showLoading();
getCSV("../assets/csv/pop_1km_new.csv", data => {
    var csvArray = parseCSV(data);
    for (var i = 1; i < csvArray.length; i++) {
        let cell = csvArray[i];
        var x = (parseInt(cell[1]) / 100) - 35;
        var y = (parseInt(cell[0]) / 100) - 35;
        var z = 0;
        /*             var x = Math.random() * 100 + 0;
                    var y = Math.random() * 100 + 0; */
        const vertex = new THREE.Vector3(x, y, z);
        pointsGeometry.vertices.push(vertex);
        const color = new THREE.Color(valueToColor(cell[2]));
        colors.push(color);
    }

    pointsGeometry.colors = colors;
    pointsMaterial = new THREE.PointsMaterial({
        // map: spriteMap,
        size: point_size,
        // transparent: true,
        // blending: THREE.AdditiveBlending,
        sizeAttenuation: true,
        vertexColors: THREE.VertexColors,
    });
    const points = new THREE.Points(pointsGeometry, pointsMaterial);
    const pointsContainer = new THREE.Object3D();
    pointsContainer.add(points);
    scene.add(pointsContainer);
    hideLoading();
});

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
    /*         var value = value / 1400000;
            value = Math.pow(value, 0.2);
            //see https://github.com/d3/d3-scale-chromatic
            // https://npmdoc.github.io/node-npmdoc-d3-scale/build/apidoc.html
            let rgb = d3.interpolateTurbo(value);
            return rgb; */
};

// Set up zoom behavior
/* const zoom = d3.zoom()
    .scaleExtent([near_plane, far_plane])
    .wheelDelta(function wheelDelta() {
        // this inverts d3 zoom direction, which makes it the rith zoom direction for setting the camera
        return d3.event.deltaY * (d3.event.deltaMode ? 120 : 1) / 500;
    })
    .on('zoom', () => {
        const event = d3.event;
        if (event.sourceEvent) {

            // Get z from D3
            const new_z = event.transform.k;

            if (new_z !== camera.position.z) {

                // Handle a zoom event
                const { clientX, clientY } = event.sourceEvent;

                // Project a vector from current mouse position and zoom level
                // Find the x and y coordinates for where that vector intersects the new
                // zoom level.
                // Code from WestLangley https://stackoverflow.com/questions/13055214/mouse-canvas-x-y-to-three-js-world-x-y-z/13091694#13091694
                const vector = new THREE.Vector3(
                    clientX / width * 2 - 1,
                    - (clientY / height) * 2 + 1,
                    1
                );
                vector.unproject(camera);
                const dir = vector.sub(camera.position).normalize();
                const distance = (new_z - camera.position.z) / dir.z;
                const pos = camera.position.clone().add(dir.multiplyScalar(distance));


                if (camera.position.z < 20) {
                    scale = (20 - camera.position.z) / camera.position.z;
                    pointsMaterial.setValues({ size: point_size + 3 * scale });
                } else if (camera.position.z >= 20 && pointsMaterial.size !== point_size) {
                    pointsMaterial.setValues({ size: point_size });
                }

                // Set the camera to new coordinates
                camera.position.set(pos.x, pos.y, new_z);

            } else {

                // Handle panning
                const { movementX, movementY } = event.sourceEvent;

                // Adjust mouse movement by current scale and set camera
                const current_scale = getCurrentScale();
                camera.position.set(camera.position.x - movementX / current_scale, camera.position.y +
                    movementY / current_scale, camera.position.z);
            }
        }
    });

// Add zoom listener
const view = d3.select(renderer.domElement);
view.call(zoom);

// Disable double click to zoom because I'm not handling it in Three.js
view.on('dblclick.zoom', null);

// Sync d3 zoom with camera z position
zoom.scaleTo(view, far_plane); */


// Three.js render loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    stats.update();
}
animate();

// From https://github.com/anvaka/three.map.control, used for panning
function getCurrentScale() {
    var vFOV = camera.fov * Math.PI / 180
    var scale_height = 2 * Math.tan(vFOV / 2) * camera.position.z
    var currentScale = height / scale_height
    return currentScale
}

// Point generator function
function phyllotaxis(radius) {
    const theta = Math.PI * (3 - Math.sqrt(5));
    return function (i) {
        const r = radius * Math.sqrt(i), a = theta * i;
        return [
            width / 2 + r * Math.cos(a) - width / 2,
            height / 2 + r * Math.sin(a) - height / 2
        ];
    };
}

function showLoading() {
    document.getElementById("loading-gif").style.display = "block";
};
function hideLoading() {
    document.getElementById("loading-gif").style.display = "none";
};


function getCSV(url, callback) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
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
};


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
};