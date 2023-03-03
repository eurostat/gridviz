# Tiled format

The tiled grid format relies on a decomposition of a gridded dataset into separate files corresponding to a square portion of space. These files are indexed in a file structure allowing to retrieve them by geographical location.

Examples of tiled grids are available in [this repository](https://github.com/jgaffuri/tiledgrids).

The tiled grid is described by a **info.json** file at the root of the structure. See an example of such info.json file [here](https://raw.githubusercontent.com/jgaffuri/tiledgrids/master/data/europe/forest/500m/info.json)

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
| dims | Array(String) | The list of column names. |
| crs | String | The EPSG code of the grid Coordinate Reference System. |
| tileSizeCell | Integer | The size of each tile, in number of cells. The tiles are square. They have all the same size. |
| originPoint | { x:Number, y:Number } | The origin point of the tiling scheme, in CRS coordinates. This is the bottom left point. The tiles start being built from this point. |
| resolutionGeo | Number | The resolution of the grid, that is the size of each cell in CRS unit of measure. |
| tilingBounds | { xMin:Number, yMin:Number, xMax:Number, yMax:Number } | The bounds of the tiling scheme, that is the min/max x/y coordinates of the tiles in the tiling scheme. |





http://.../X/Y.png


Difference with slippy map tilenames:
- Not only web mercator
- Not necessarly global
- Not image files, but tabular (CSV, parquet, or maybe others)
- No zoom level. The user is free to index various multi-resolution versions of the datasets in the way he prefers. See for example in [this repository](https://github.com/jgaffuri/tiledgrids).


