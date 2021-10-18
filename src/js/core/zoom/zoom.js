import { zoom, zoomIdentity } from "d3-zoom";
import * as Utils from "../utils/utils";
import * as Placenames from "../placenames/placenames.js";
import * as Tooltip from "../tooltip/tooltip.js";
import * as Camera from "../camera/camera.js";
import { Vector3 } from "three"

/**
 * @description Defines zoom functionality using d3.js
 * @function addPanAndZoom
 * 
 */
export function addPanAndZoom(viewer) {

    // define d3 zoom
    //where [x0, y0] is the top-left corner of the world and [x1, y1] is the bottom-right corner of the world
    let farScale = Utils.getScaleFromZ(viewer.height_, viewer.cameraConfig.fov_, viewer.cameraConfig.far_);
    let nearScale = Utils.getScaleFromZ(viewer.height_, viewer.cameraConfig.fov_, viewer.cameraConfig.near_);
    viewer.d3zoom =
      zoom()
        .scaleExtent([farScale, nearScale])
        .extent([[0, 0], [viewer.width_, viewer.height_]])
        .on("zoom", (event) => {
          // let event = currentEvent;
          if (viewer._mobile) {
            if (event) zoomHandlerMobile(viewer, event);
          } else {
            if (event) zoomHandler(viewer, event);
          }
        })
        .on("end", (event) => {
          //let event = currentEvent;
          if (event) zoomEnd(viewer, event);
        });

    viewer.view.call(viewer.d3zoom);

    if (viewer._mobile) {
      //due to a bug on mobile, where the camera shifts unexpectedly on the first pan or zoom event, we have to scale everything to a webgl-friendly range and set the camera to 0,0
      let initial_scale = Utils.getScaleFromZ(viewer.height_, viewer.cameraConfig.fov_, viewer.cameraConfig.initialZ_);
      var initial_transform = zoomIdentity.translate(viewer.width_ / 2, viewer.height_ / 2).scale(initial_scale);
      viewer.d3zoom.transform(viewer.view, initial_transform);
      Camera.setCamera(0, 0, viewer.cameraConfig.initialZ_)

    } else {
      //initial desktop zoom transform
      let scale = Utils.getScaleFromZ(viewer.height_, viewer.cameraConfig.fov_, viewer.cameraConfig.initialZ_)
      viewer.d3zoom.scaleTo(viewer.view, scale);
      viewer.d3zoom.translateTo(viewer.view,
        parseInt(viewer.center_[0]) + viewer.width_ / 2,
        parseInt(viewer.center_[1]) + viewer.height_ / 2);
      Camera.setCamera(viewer.center_[0], viewer.center_[1], viewer.cameraConfig.initialZ_)
    }


}



function zoomHandler(viewer, event) {
  let scale = event.transform.k;
  if (event.sourceEvent) {
    let new_z = Utils.getZFromScale(viewer.height_, viewer.cameraConfig.fov_, scale);
    //if zoom
    if (new_z !== viewer.camera.position.z) {
      // Handle a zoom event
      const { clientX, clientY } = event.sourceEvent;
      // Code from WestLangley https://stackoverflow.com/questions/13055214/mouse-canvas-x-y-to-three-js-world-x-y-z/13091694#13091694
      const vector = new Vector3(
        (clientX / viewer.width_) * 2 - 1,
        -(clientY / viewer.height_) * 2 + 1,
        1
      );
      vector.unproject(viewer.camera);
      const dir = vector.sub(viewer.camera.position).normalize();
      const distance = (new_z - viewer.camera.position.z) / dir.z;
      const pos = viewer.camera.position.clone().add(dir.multiplyScalar(distance));
      // Set the camera to new coordinates
      Camera.setCamera(pos.x, pos.y, new_z);
    } else {
      // If panning
      const { movementX, movementY } = event.sourceEvent;

      // Adjust mouse movement by current scale and set camera
      const current_scale = Utils.getScaleFromZ(viewer.height_, viewer.cameraConfig.fov_, viewer.camera.position.z);
      Camera.setCamera(
        viewer.camera.position.x - movementX / current_scale,
        viewer.camera.position.y + movementY / current_scale,
        viewer.camera.position.z
      );
    }
  }
}


function zoomHandlerMobile(viewer, event) {
  if (event.sourceEvent) {
    let scale = event.transform.k;
    let x = -(event.transform.x - viewer.width_ / 2) / scale;
    let y = (event.transform.y - viewer.height_ / 2) / scale;
    let z = Utils.getZFromScale(viewer.height_, viewer.cameraConfig.fov_, scale);
    Camera.setCamera(x, y, z);
  }
}


function zoomEnd(viewer, event) {
  Tooltip.hideTooltip();
  let scale = Utils.getScaleFromZ(viewer.height_, viewer.cameraConfig.fov_, event.transform.k);
  if (viewer.debugPlacenames_) {
    console.info('scale:', scale);
  }
  // get placenames at certain zoom levels
  if (viewer.showPlacenames_) {
    if (viewer.pointsLayer) {
      if (scale > 0 && scale < viewer.cameraConfig.far_) {
        //placenames are added to the viewer.pointsLayer object
        Placenames.getPlacenames(viewer);
      } else {
        Placenames.removePlacenamesFromScene(viewer);
      }
    }
  }

}



/**
 * @description zoom in (reduce camera Z position)
 * @function zoomIn
 * @parameter scaleFactor 
 */
export function zoomIn(viewer, scaleFactor) {
  // when we zoom, we have to update both the threejs camera and the d3 zoom
  viewer.view.call(viewer.d3zoom.scaleBy, scaleFactor);
  Camera.setCamera(viewer.camera.position.x, viewer.camera.position.y, viewer.camera.position.z / scaleFactor)
}

/**
* @description zoom out (increase camera Z position)
* @function zoomOut
* @parameter scaleFactor 
*/
export function zoomOut(viewer, scaleFactor) {
  // when we zoom, we have to update both the threejs camera and the d3 zoom
  viewer.view.call(viewer.d3zoom.scaleBy, scaleFactor);
  Camera.setCamera(viewer.camera.position.x, viewer.camera.position.y, viewer.camera.position.z / scaleFactor)
}