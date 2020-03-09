//Boundaries json
export const nuts_base_URL = "https://raw.githubusercontent.com/eurostat/Nuts2json/master/2016/";
export const nuts_scale_threshold = 100; //scale at which nuts2json changes simplification
export const line_width = 0.0013; //GL.LINE height
export const line_z = 0.002; //line vertices z coordinate
export const point_z = 1; //threejs points object height
export const fov = 40;
export const near = 0.001; //minScale
export const coordinate_offset = { x: -40, y: -30 }; //offset for EPSG3035 to vector3 transformation
export const label_height = 0.001; //placenames z value
