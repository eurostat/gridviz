//utility functions for gridviz 

/**
 * @description creates a unique identifier
 * @function createUUID
 */
export function createUUID(){
  var dt = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = (dt + Math.random()*16)%16 | 0;
      dt = Math.floor(dt/16);
      return (c=='x' ? r :(r&0x3|0x8)).toString(16);
  });
  return uuid;
}

/**
 * @description returns number with space as separator
 * @function formatNumber
 * @param {Number} n
 */
export function formatNumber(n) {
  return n.toLocaleString("en").replace(/,/gi, " ")
}

/**
 * @description returns a scale from a z value
 * @function getScaleFromZ
 * @param {Number} height - viz container height in pixels
 * @param {Number} fov - Field of view (of threeJS camera)
 * @param {Number} z - z position value
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
 * @description returns a z value from a d3 event.transform.k value
 * @function getZFromScale
 * @param {Number} height - viz container height in pixels
 * @param {Number} fov - Field of view (of threeJS camera)
 * @param {Number} scale - scale
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
  // TODO: replace userAgent with screen threshold ( apprently userAgent is no longer standard)
  if (/Mobi|Android/i.test(navigator.userAgent)) {
    return true
  } else {
    return false
  }
}
