export class viewerOptions {
    pixelRatio: number;
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
    statsBox: boolean; //whether or not to show the stats box
}
