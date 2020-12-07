//Boundaries json
export const nuts_base_URL = "https://raw.githubusercontent.com/eurostat/Nuts2json/master/2021/";
export const placenames = {
    baseURL: "https://ec.europa.eu/regio/regiogis/gis/arcgis/rest/services/Urban/urban_centres_towns_v3/MapServer/0/query?",
    countryField: "REGIOMAP.CITIES_TOWNS_RG_LAEA.CNTR_CODE",
    townField: "REGIOMAP.CITIES_TOWNS_RG_LAEA.STTL_NAME",
    populationField: "REGIOMAP.CITIES_TOWNS_RG_LAEA.POPL_2011"
}
export const nuts_scale_threshold = 551689; //scale at which nuts2json changes simplification
export const line_width = 0.0020; //GL.LINE width
export const line_z = 0.002; //line vertices z coordinate
export const point_z = 0.0001; //threejs points object height
export const fov = 50;
export const coordinate_offset = {
    x: -40,
    y: -30
}; //offset for EPSG3035 to vector3 transformation
export const label_height = 0.001; //placenames z value