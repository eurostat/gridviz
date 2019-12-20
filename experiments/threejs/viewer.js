var THREE = require('three');
var Stats = require("stats.js");
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
        this.renderer = new THREE.WebGLRenderer();
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
        this.camera.position.set(
            options.initial_camera_position.x,
            options.initial_camera_position.y,
            options.initial_camera_position.z
        );
        this.camera.position.normalize();
        this.camera.lookAt(options.initial_camera_lookAt);
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x000000);

        //for identifying points
        this.raycaster = new THREE.Raycaster();
        this.raycaster.params.Points.threshold = options.raycaster_threshold || 0.009;

        addClickEvent();
    }

}
    function addClickEvent() {
   /*      document.addEventListener('click', onViewerClick, false); */
    }

    function onViewerClick(event) {
        // Click event
    var newColor = new THREE.Color();
    newColor.setRGB(1, 1, 1);
    event.preventDefault();
    event.stopPropagation();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
    //mouse over points raycaster
    if (pointCloud) {
        raycaster.setFromCamera(mouse, camera);
        var intersections = raycaster.intersectObject(pointCloud, false);
        intersection = (intersections.length) > 0 ? intersections[0] : null;
        //highlight logic
        if (intersection !== null) {
            //change colour of identified point
            let index = intersection.index;
            pointCloud.geometry.colors[index] = newColor;
            pointCloud.geometry.colorsNeedUpdate = true;
        }
    }
}