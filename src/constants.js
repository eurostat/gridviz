//Boundaries json
export const nuts_20m_URL = "https://raw.githubusercontent.com/eurostat/Nuts2json/master/2016/3035/20M/0.json";
export const nuts_10m_URL = "https://raw.githubusercontent.com/eurostat/Nuts2json/master/2016/3035/10M/0.json";
export const nuts_scale_threshold = 100; //scale at which nuts2json changes simplification
export const line_width = 0.0013; //GL.LINE height
export const line_z = 0.002; //line vertices z coordinate
export const point_z = 0.001; //threejs points object height
export const fov = 40;
export const near = 0.001; //minScale
export const far = 100; //maxScale
export const coordinate_offset = { x: -40, y: -30 }; //offset for EPSG3035 to vector3 transformation
export const label_height = 0.001; //placenames z value

// Datasets
//TODO: adjust 2km & 1km raycaster_thresholds
export const grid_configs = {
  "1km": {
    point_size: 0.0271,
    raycaster_threshold: 0.02
  },
  "2km": {
    point_size: 0.055,
    raycaster_threshold: 0.02
  },
  "5km": {
    point_size: 0.1375,
    raycaster_threshold: 0.02
  }
};
