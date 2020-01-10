var THREE = require("three");
var Stats = require("stats.js");
var d3 = require("d3");
//parent class for THREEjs viewer functionality
export default class Viewer {
  /*     pixelRatio: number;
    width;
    height;
    near_plane;
    far_plane;
    initial_camera_position: {
        x: number;
        y: number;
        z: number;
    };
    initial_camera_lookAt;
    field_of_view;
    raycaster_threshold;
    statsBox: boolean; //whether or not to show the stats box */

  /*     this.renderer;
    this.camera;
    this.scene;
    this.raycaster; */

  constructor(options) {
    // renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(options.pixelRatio);
    this.renderer.setSize(options.width, options.height);
    document.body.appendChild(this.renderer.domElement);

    // Add stats box
    this.stats = new Stats();
    this.stats.dom.style.position = "absolute";
    this.stats.dom.style.top = "0px";
    this.stats.dom.style.right = "0px";
    document.body.appendChild(this.stats.dom);

    // Set up camera
    this.camera = new THREE.PerspectiveCamera(
      options.field_of_view || 45, //fov — Camera frustum vertical field of view.
      options.width / options.height, //aspect — Camera frustum aspect ratio
      options.near_plane, //near — Camera frustum near plane
      options.far_plane //far — Camera frustum far plane
    );
    /* var camera = new OrthographicCamera(width / - 2, width / 2, height / 2, height / - 2, near_plane, far_plane);
     */

    this.camera.position.normalize();
    this.camera.lookAt(options.initial_camera_lookAt);
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x000000);

    //for identifying points
    this.raycaster = new THREE.Raycaster();
    this.raycaster.params.Points.threshold =
      options.raycaster_threshold || 0.009;
    this.camera.position.set(
      options.initial_camera_position.x,
      options.initial_camera_position.y,
      options.initial_camera_position.z
    );
    this.addClickEvent();
    this._defineZoom(options);
  }

  addPoints(pointsContainer, pointsMaterial) {
    this.scene.add(pointsContainer);
    this.pointsMaterial = pointsMaterial;
  }

  addClickEvent() {
    /*      document.addEventListener('click', onViewerClick, false); */
  }

  onViewerClick(event) {
    // Click event
    var newColor = new THREE.Color();
    newColor.setRGB(1, 1, 1);
    event.preventDefault();
    event.stopPropagation();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    //mouse over points raycaster
    if (pointCloud) {
      raycaster.setFromCamera(mouse, camera);
      var intersections = raycaster.intersectObject(pointCloud, false);
      intersection = intersections.length > 0 ? intersections[0] : null;
      //highlight logic
      if (intersection !== null) {
        //change colour of identified point
        let index = intersection.index;
        debugger;
        pointCloud.geometry.colors[index] = newColor;
        pointCloud.geometry.colorsNeedUpdate = true;
      }
    }
  }

  // Set up zoom behavior
  _defineZoom(options) {
    const zoom = d3
      .zoom()
      .scaleExtent([options.near_plane, options.far_plane])
      .wheelDelta(function wheelDelta() {
        // this inverts d3 zoom direction, which makes it the rith zoom direction for setting the camera
        return (d3.event.deltaY * (d3.event.deltaMode ? 120 : 1)) / 500;
      })
      .on("zoom", () => {
        const event = d3.event;
        if (event.sourceEvent) {
          // Get z from D3
          const new_z = event.transform.k;

          if (new_z !== this.camera.position.z) {
            // Handle a zoom event
            const { clientX, clientY } = event.sourceEvent;

            // Project a vector from current mouse position and zoom level
            // Find the x and y coordinates for where that vector intersects the new
            // zoom level.
            // Code from WestLangley https://stackoverflow.com/questions/13055214/mouse-canvas-x-y-to-three-js-world-x-y-z/13091694#13091694
            const vector = new THREE.Vector3(
              (clientX / options.width) * 2 - 1,
              -(clientY / options.height) * 2 + 1,
              1
            );
            vector.unproject(this.camera);
            const dir = vector.sub(this.camera.position).normalize();
            const distance = (new_z - this.camera.position.z) / dir.z;
            const pos = this.camera.position
              .clone()
              .add(dir.multiplyScalar(distance)); //adds direction to zoom

            let scale;
            if (this.camera.position.z < 20) {
              scale = (20 - this.camera.position.z) / this.camera.position.z;
              this.pointsMaterial.setValues({
                size: options.point_size * scale
              });
            } else if (
              this.camera.position.z >= 20 &&
              this.pointsMaterial.size !== options.point_size
            ) {
              this.pointsMaterial.setValues({
                size: options.point_size
              });
            }

            // Set the this.camera to new coordinates
            this.camera.position.set(pos.x, pos.y, new_z);
            console.info(
              "zoom event: new camera position:",
              pos.x,
              ",",
              pos.y,
              ",",
              pos.z
            );
          } else {
            // Handle panning
            const { movementX, movementY } = event.sourceEvent;

            // Adjust mouse movement by current scale and set this.camera
            const current_scale = this.getCurrentScale(options);
            this.camera.position.set(
              this.camera.position.x - movementX / current_scale,
              this.camera.position.y + movementY / current_scale,
              this.camera.position.z
            );
          }
        }
      });

    // Add zoom listener
    const view = d3.select(this.renderer.domElement);
    view.call(zoom);

    // Disable double click to zoom because I'm not handling it in Three.js
    view.on("dblclick.zoom", null);

    // Sync d3 zoom with camera z position
    zoom.scaleTo(view, options.initial_camera_position.z);
  }

  getCurrentScale(options) {
    var vFOV = (this.camera.fov * Math.PI) / 180;
    var scale_height = 2 * Math.tan(vFOV / 2) * this.camera.position.z;
    var currentScale = options.height / scale_height;
    return currentScale;
  }
}
