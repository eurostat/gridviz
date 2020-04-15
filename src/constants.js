//Boundaries json
export const nuts_base_URL = "https://raw.githubusercontent.com/eurostat/Nuts2json/master/2016/";
export const placenames_base_URL = "https://ec.europa.eu/regio/regiogis/gis/arcgis/rest/services/Urban/urban_centres_towns/MapServer/0/query?"
export const nuts_scale_threshold = 551689; //scale at which nuts2json changes simplification
export const line_width = 0.0009; //GL.LINE height
export const line_z = 0.002; //line vertices z coordinate
export const point_z = 1; //threejs points object height
export const fov = 50;
export const near = 1; //minScale
export const coordinate_offset = {
    x: -40,
    y: -30
}; //offset for EPSG3035 to vector3 transformation
export const label_height = 0.001; //placenames z value