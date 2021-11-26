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
export function addPanAndZoom(app) {

    // define d3 zoom
    //where [x0, y0] is the top-left corner of the world and [x1, y1] is the bottom-right corner of the world
    let farScale = Utils.getScaleFromZ(app.height_, app.cameraConfig.fov_, app.cameraConfig.far_);
    let nearScale = Utils.getScaleFromZ(app.height_, app.cameraConfig.fov_, app.cameraConfig.near_);
    app.d3zoom =
      zoom()
        .scaleExtent([farScale, nearScale])
        .extent([[0, 0], [app.width_, app.height_]])
        .on("zoom", (event) => {
          // let event = currentEvent;
          if (app._mobile) {
            if (event) zoomHandlerMobile(app, event);
          } else {
            if (event) zoomHandler(app, event);
          }
        })
        .on("end", (event) => {
          //let event = currentEvent;
          if (event) zoomEnd(app, event);
        });

    app.view.call(app.d3zoom);

    if (app._mobile) {
      //due to a bug on mobile, where the camera shifts unexpectedly on the first pan or zoom event, we have to scale everything to a webgl-friendly range and set the camera to 0,0
      let initial_scale = Utils.getScaleFromZ(app.height_, app.cameraConfig.fov_, app.cameraConfig.initialZ_);
      var initial_transform = zoomIdentity.translate(app.width_ / 2, app.height_ / 2).scale(initial_scale);
      app.d3zoom.transform(app.view, initial_transform);
      Camera.setCamera(0, 0, app.cameraConfig.initialZ_)

    } else {
      //initial desktop zoom transform
      let scale = Utils.getScaleFromZ(app.height_, app.cameraConfig.fov_, app.cameraConfig.initialZ_)
      app.d3zoom.scaleTo(app.view, scale);
      app.d3zoom.translateTo(app.view,
        parseInt(app.center_[0]) + app.width_ / 2,
        parseInt(app.center_[1]) + app.height_ / 2);
      Camera.setCamera(app.center_[0], app.center_[1], app.cameraConfig.initialZ_)
    }
}



function zoomHandler(viewer, event) {
  let scale = event.transform.k;
  if (event.sourceEvent) {
    let new_z = Utils.getZFromScale(app.height_, app.cameraConfig.fov_, scale);
    //if zoom
    if (new_z !== app.camera.position.z) {
      // Handle a zoom event
      const { clientX, clientY } = event.sourceEvent;
      // Code from WestLangley https://stackoverflow.com/questions/13055214/mouse-canvas-x-y-to-three-js-world-x-y-z/13091694#13091694
      const vector = new Vector3(
        (clientX / app.width_) * 2 - 1,
        -(clientY / app.height_) * 2 + 1,
        1
      );
      vector.unproject(app.camera);
      const dir = vector.sub(app.camera.position).normalize();
      const distance = (new_z - app.camera.position.z) / dir.z;
      const pos = app.camera.position.clone().add(dir.multiplyScalar(distance));
      // Set the camera to new coordinates
      Camera.setCamera(pos.x, pos.y, new_z);
    } else {
      // If panning
      const { movementX, movementY } = event.sourceEvent;

      // Adjust mouse movement by current scale and set camera
      const current_scale = Utils.getScaleFromZ(app.height_, app.cameraConfig.fov_, app.camera.position.z);
      Camera.setCamera(
        app.camera.position.x - movementX / current_scale,
        app.camera.position.y + movementY / current_scale,
        app.camera.position.z
      );
    }
  }
}


function zoomHandlerMobile(viewer, event) {
  if (event.sourceEvent) {
    let scale = event.transform.k;
    let x = -(event.transform.x - app.width_ / 2) / scale;
    let y = (event.transform.y - app.height_ / 2) / scale;
    let z = Utils.getZFromScale(app.height_, app.cameraConfig.fov_, scale);
    Camera.setCamera(x, y, z);
  }
}


function zoomEnd(viewer, event) {
  Tooltip.hideTooltip();
  let scale = Utils.getScaleFromZ(app.height_, app.cameraConfig.fov_, event.transform.k);
  if (app.debugPlacenames_) {
    console.info('scale:', scale);
  }
  // get placenames at certain zoom levels
  if (app.showPlacenames_) {
    if (app.pointsLayer) {
      if (scale > 0 && scale < app.cameraConfig.far_) {
        //placenames are added to the app.pointsLayer object
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
  app.view.call(app.d3zoom.scaleBy, scaleFactor);
  Camera.setCamera(app.camera.position.x, app.camera.position.y, app.camera.position.z / scaleFactor)
}

/**
* @description zoom out (increase camera Z position)
* @function zoomOut
* @parameter scaleFactor 
*/
export function zoomOut(viewer, scaleFactor) {
  // when we zoom, we have to update both the threejs camera and the d3 zoom
  app.view.call(app.d3zoom.scaleBy, scaleFactor);
  Camera.setCamera(app.camera.position.x, app.camera.position.y, app.camera.position.z / scaleFactor)
}