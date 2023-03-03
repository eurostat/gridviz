# Tiled format

The tiled dataset is a decomposition of a gridded dataset into separate files corresponding to a square portion of space. These files are indexed in a file structure allowing to retrieve them by geographical location.

Examples of tiled grids are available in [this repository](https://github.com/jgaffuri/tiledgrids).

## info.json

The tiled grid is described by a **info.json** file at the root of the structure. See an example of such info.json file [here](https://raw.githubusercontent.com/jgaffuri/tiledgrids/master/data/europe/forest/500m/info.json) or below:

    {
        "dims": [
            "tcd",
            "dlt"
        ],
        "crs": "3035",
        "tileSizeCell": 128,
        "originPoint": {
            "x": 0,
            "y": 0
        },
        "resolutionGeo": 500,
        "tilingBounds": {
            "yMin": 14,
            "yMax": 84,
            "xMax": 114,
            "xMin": 14
        }
    }

This **info.json** file includes the following information:

| Entry | Type | Description |
| -------- | ------- | ------- |
| **dims** | Array(String) | The list of column names. |
| **crs** | String | The [EPSG](https://spatialreference.org/) code of the grid Coordinate Reference System. |
| **tileSizeCell** | Integer | The size of each tile, in number of cells. The tiles are square. They have all the same size. |
| **originPoint** | { x:Number, y:Number } | The origin point of the tiling scheme, in CRS coordinates. This is the bottom left point. The tiles start being built from this point. |
| **resolutionGeo** | Number | The resolution of the grid, that is the size of each cell in CRS unit of measure. |
| **tilingBounds** | { xMin:Number, yMin:Number, xMax:Number, yMax:Number } | The bounds of the tiling scheme, that is the min/max x/y coordinates of the tiles in the tiling scheme. |

The information provided in this **info.json** file allows to retrieve each tile by geographic location and interpret the information of each tile file to locate properly the cells it contains.

## Tile structure

The tiles are structured into a folder structure following the **http://.../X/Y.fff** pattern. **X** and **Y** are the coordinates of the tiles within the tiling scheme, starting with *(0,0)* for the tile immediately on the top right of the origin point. **fff** is the file extension of each file, depending on the chosen encodings.

See for example [this dataset](https://github.com/jgaffuri/tiledgrids/tree/main/data/europe/forest/10000m).

## Tile format

Each tile file contains the information related to the grid for the geographical location of the tile. It is a tabular file. Each row corresponds to a grid cell. The following columns are provided:
- **x** and **y** specify the position of the grid cell **in the tile**. These values are thus within *[0, tileSizeCell[* interval. *(0,0)* position corresponds to the bottom left cell.
- Various columns **dims**, one for each variable describing the cells. 

Each file can be encoded in whatever format. GridViz currently supports CSV and [Apache Parquet](https://parquet.apache.org/).

## Comparison with other similar formats

This format is designed for the specific case of gridded data visualisation on the web. It uses a tiling mechanisms like other similar formats.

Difference with slippy map **/Z/X/Y.png** tilenames:
- Not only web mercator. Other CRS can be used, as soon as it is the CRS of the grid.
- Not necessarly global. A local portion of space can be described with high resolution information.
- Not image data, but tabular.
- No predifined way to specify zoom level. The user is free to index various multi-resolution versions of the datasets in the way he prefers. See for example in [here](https://github.com/jgaffuri/tiledgrids/tree/main/data/europe/forest) how to specify multi-resolution gridded data.

Difference with [Cloud Optimized GeoTIFF (COG)](https://www.cogeo.org/)
- No need for HTTP GET range requests.
- Indexation based on file hierachy.
