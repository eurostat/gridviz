//utility functions for gridviz 
import { Vector3 } from "three"

let loading_spinner;
let loading_bar;
let loading_text;


export function getCurrentViewExtent(app) {
  var elem = app.viewer.renderer.domElement;
  let clientBottomLeft = [elem.clientLeft, elem.clientHeight];
  let clientTopRight = [elem.clientWidth, elem.clientTop];
  let bottomLeftWorld = getWorldCoordsFromScreen(app, clientBottomLeft); //client x,y
  let topRightWorld = getWorldCoordsFromScreen(app, clientTopRight); //client x,y

  // if getting coords was unsuccessful, exit
  if (!bottomLeftWorld || !topRightWorld) {
    return
  }

  // full european extent in EPSG 3035:
  // return {
  //   xmin: 1053668.5589,
  //   ymin: 1645342.8583,
  //   xmax: 5724066.4412,
  //   ymax: 5901309.0137
  // };

  // if the user has reduced the filesize by removing trailing 0s from the csv, we simply add them back on before sending the placename queries
  if (app.zerosRemoved_) {
    let d = Number('1E' + app.zerosRemoved_);
    return {
      xmin: bottomLeftWorld.x * d,
      ymin: bottomLeftWorld.y * d,
      xmax: topRightWorld.x * d,
      ymax: topRightWorld.y * d
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


/**
* @description get the position of a canvas event in world coords
*@function getWorldCoordsFromScreen
*/
function getWorldCoordsFromScreen(app, [clientX, clientY]) {
  var vec = new Vector3(); // create once and reuse
  var pos = new Vector3(); // create once and reuse
  vec.set(
    (clientX / window.innerWidth) * 2 - 1,
    -(clientY / window.innerHeight) * 2 + 1,
    0.5
  );
  vec.unproject(app.viewer.camera.camera);
  vec.sub(app.viewer.camera.camera.position).normalize();
  var distance = -app.viewer.camera.camera.position.z / vec.z;
  pos.copy(app.viewer.camera.camera.position).add(vec.multiplyScalar(distance));
  if (app._mobile) {
    if (app.mobileCoordScaleX && app.mobileCoordScaleY) {
      pos.x = Math.round(app.mobileCoordScaleX.invert(pos.x))
      pos.y = Math.round(app.mobileCoordScaleY.invert(pos.y))
    } else {
      return false
    }
  }
  return pos;
}

/**
 * @description CSS3 animation spinner
 *@function createLoadingSpinner
 */
export function createLoadingSpinner(container, type) {
  loading_spinner = document.createElement("div");
  loading_spinner.id = "gridviz-loading-spinner";
  loading_spinner.classList.add("lds-" + type);
  let child1 = document.createElement("div");
  loading_spinner.appendChild(child1);
  let child2 = document.createElement("div");
  loading_spinner.appendChild(child2);
  let child3 = document.createElement("div");
  loading_spinner.appendChild(child3);
  let child4 = document.createElement("div");
  loading_spinner.appendChild(child4);
  container.appendChild(loading_spinner);
}

export function createProgressBar(container) {
  // <div id="myProgress">
  // <div id="myBar"></div>
  // </div>
  loading_bar = document.createElement("div");
  loading_bar.id = "gridviz-progress-bar";
  let child1 = document.createElement("div");
  child1.id = "gridviz-progress-bar-bar"
  loading_bar.appendChild(child1);
  container.appendChild(loading_bar);
}


export function createLoadingText(container) {
  // <div id="myProgress">
  // <div id="myBar"></div>
  // </div>
  loading_text = document.createElement("div");
  loading_text.id = "gridviz-loading-text";
  loading_text.innerHTML = "Large grids can take a while to load. Please wait."
  container.appendChild(loading_text);
}


/**
 *@function showLoading
 * @description show loading spinner
 */
export function showLoading() {
  loading_spinner.style.display = "block";
  if (loading_text) loading_text.style.display = "block";

}

/**
 * @description hide loading spinner
 * @function hideLoading
 */
export function hideLoading() {
  loading_spinner.style.display = "none";
  if (loading_text) loading_text.style.display = "none";
}

/**
 * @description returns number with space as separator
 * @function formatNumber
 */
export function formatNumber(n) {
  return n
    .toLocaleString("en")
    .replace(/,/gi, " ")
}

/**
 * @description returns a scale from a z value
 * @function getScaleFromZ
 */
export function getScaleFromZ(height, fov, z) {
  let half_fov = fov / 2;
  let half_fov_radians = toRadians(half_fov);
  let half_fov_height = Math.tan(half_fov_radians) * z;
  let fov_height = half_fov_height * 2;
  let scale = height / fov_height; // Divide visualization height by height derived from field of view
  return scale;
}

/**
 * @description returns a z value from a scale
 * @function getZFromScale
 */
export function getZFromScale(height, fov, scale) {
  let half_fov = fov / 2;
  let half_fov_radians = toRadians(half_fov);
  let scale_height = height / scale;
  let camera_z_position = scale_height / (2 * Math.tan(half_fov_radians));
  return camera_z_position;
}

//native replication of lodash's "sortBy"
export function sortBy(key) {
  return (a, b) => (a[key] > b[key]) ? 1 : ((b[key] > a[key]) ? -1 : 0);
};

function toRadians(angle) {
  return angle * (Math.PI / 180);
}

export function checkIfMobile() {
  // TODO: replace userAgent with screen threshold (this apprently userAgent is no longer standard)
  if (/Mobi|Android/i.test(navigator.userAgent)) {
    return true
  } else {
    return false
  }
}
