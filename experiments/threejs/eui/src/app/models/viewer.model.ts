import {
    WebGLRenderer,
    PerspectiveCamera,
    Scene,
    Raycaster,
    Color
} from "three";
import { viewerOptions } from "./viewer-options.model";
import { Stats } from "stats.js";

export class Viewer {
    public renderer;
    public camera;
    public scene;
    public raycaster;

    constructor(options: viewerOptions) {
        // renderer
        this.renderer = new WebGLRenderer();
        this.renderer.setPixelRatio(options.pixelRatio);
        this.renderer.setSize(options.width, options.height);
        document.body.appendChild(this.renderer.domElement);

        // Add stats box
        var stats = new Stats();
        stats.dom.style.position = "absolute";
        stats.dom.style.top = "0px";
        stats.dom.style.right = "0px";
        document.body.appendChild(stats.dom);

        // Set up camera
        this.camera = new PerspectiveCamera(
            options.field_of_view, //fov — Camera frustum vertical field of view.
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
        this.scene = new Scene();
        this.scene.background = new Color(0x000000);

        //for identifying points
        this.raycaster = new Raycaster();
        this.raycaster.params.Points.threshold = options.raycaster_threshold;
    }
}
