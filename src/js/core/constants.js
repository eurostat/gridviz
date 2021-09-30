//constants to be used in all gridviz components
export const nuts_base_URL = "https://raw.githubusercontent.com/eurostat/Nuts2json/master/pub/v2/2016/";
// export const placenames = {
//     baseURL: "https://ec.europa.eu/regio/regiogis/gis/arcgis/rest/services/Urban/urban_centres_towns_v3/MapServer/0/query?",
//     countryField: "REGIOMAP.CITIES_TOWNS_RG_LAEA.CNTR_CODE",
//     townField: "REGIOMAP.CITIES_TOWNS_RG_LAEA.STTL_NAME",
//     populationField: "REGIOMAP.CITIES_TOWNS_RG_LAEA.POPL_2011"
// }
export const placenames = {
    baseURL: "https://ec.europa.eu/eurostat/statistical-atlas/gis/arcgis/rest/services/Basemaps/StatAtlas_Cities_Labels_2014/MapServer/0/query?",
    countryField: "CNTR_CODE",
    townField: "STTL_NAME",
    populationField: "POPL_SIZE",
    minScaleField: "MIN_SCAL"
}
export const nutsAPIBaseURL = "https://gisco-services.ec.europa.eu/id/"; //to get nuts codes of cells
export const line_z = 0.0001001; //line vertices z coordinate
export const point_z = 0.0001; //threejs points object height
export const fov = 50; // threejs camera FOV
export const label_height = 0.001; // placenames z coordinate