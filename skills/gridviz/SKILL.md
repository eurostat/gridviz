---
name: gridviz
description: Visualise gridded data (population grids, 1 km / 100 m cells, or any table with x/y columns) in the browser with the gridviz JavaScript library, using canvas and WebGL styles, tiled datasets, view scales and legends. Use when asked to make, edit or debug a gridviz map, or to show Eurostat/GISCO grid data.
---

# Using gridviz

gridviz draws gridded data client-side on a canvas, on the fly, with a large library of cartographic
styles. This file is a guide for people and agents **using** the library. For changing the library
itself, read [docs/agents/README.md](../../docs/agents/README.md).

Authoritative sources, in this order:

1. [docs/reference.md](../../docs/reference.md) (published: https://eurostat.github.io/gridviz/docs/reference).
2. [examples/](../../examples) and the live gallery https://eurostat.github.io/gridviz/examples/
   (one page per style and feature; `examples/basics`, `examples/styles`, `examples/legends`,
   `examples/demos`).
3. [docs/tiledformat.md](../../docs/tiledformat.md) for tiled datasets.

Copy the closest example and change it. Option names are case-sensitive and unknown ones are
ignored silently, so look them up in the reference.

## The mental model

-   A **Map** holds a stack of **layers**, drawn bottom to top: a `BackgroundLayer`, one or more
    `GridLayer`s, then `GeoJSONLayer` / `LabelLayer` on top.
-   A **dataset** says where cells come from. It is created once and can be shared by several layers.
-   A **GridLayer** draws one dataset with one or more **styles**. A **style** says how each cell looks.
-   Style options are usually **functions** of `(cell, resolution, zoom, viewScale)`.
-   `z` (zoom) is **ground units per pixel**, so a smaller `z` is more zoomed in. A cell of size
    `resolution` is `resolution / z` pixels wide on screen.
-   Sizes are in **ground units** (metres in the usual CRS), not pixels.
-   **Coordinates are in the grid's own CRS, not lon/lat.** For Europe this is usually ETRS89-LAEA
    (EPSG:3035), in metres, for example `x: 4500000, y: 2900000` for the centre of Europe. A place
    given as WGS84 lon/lat must be projected first (for example with proj4 or d3-geo).

## Minimal map

```html
<div id="map" style="width: 100%; height: 600px"></div>
<script src="https://unpkg.com/gridviz/dist/gridviz.min.js"></script>
<script>
    const map = new gridviz.Map(document.getElementById('map'), { x: 4500000, y: 2900000, z: 3000 }).addZoomButtons()

    const dataset = new gridviz.CSVGrid(
        map,
        'https://raw.githubusercontent.com/eurostat/gridviz/master/assets/csv/Europe/pop_2018_10km.csv',
        10000 // resolution of the grid, in ground units
    )

    const style = new gridviz.ShapeColorSizeStyle({
        color: (cell) => (cell.population > 60000 ? '#d95f0e' : cell.population > 6000 ? '#fec44f' : '#ffffd4'),
    })

    map.layers = [
        new gridviz.GridLayer(dataset, [style], {
            cellInfoHTML: (c) => '<b>' + (+c.population).toLocaleString() + '</b> inhabitants (2018)',
        }),
    ]
</script>
```

With npm: `import * as gridviz from 'gridviz'`, or `import { Map, SquareColorWebGLStyle } from 'gridviz'`.
After changing a style, a dataset or `map.layers`, call `map.redraw()`.

## Datasets

| Class                                           | Use for                                                                                                                |
| ----------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `JSGrid(resolution, cells)`                     | Cells already in JavaScript: an array of objects with `x` and `y`.                                                     |
| `CSVGrid(map, url, resolution)`                 | One CSV file with `x` and `y` columns plus values.                                                                     |
| `TiledGrid(map, url)`                           | A folder of tiles in the tiled grid format. Only the tiles in view are loaded. Use this for large grids.               |
| `MultiResolutionDataset(resolutions, datasets)` | Several resolutions of the same data. The layer picks the finest one whose cells are at least `minPixelsPerCell` wide. |

-   `x`, `y` of a cell are the **lower left corner**, usually a multiple of the resolution.
-   **CSV values are text.** Convert in `preprocess` (`cell.population = +cell.population`); a
    `preprocess` that returns `false` drops the cell.
-   Tiled grids are produced with GridTiler (https://github.com/eurostat/gridtiler). The grid's CRS and
    resolution come from the dataset's `info.json`. Parquet tiles need the `gridviz-parquet` extension.
-   For many cells, prefer `TiledGrid` and `MultiResolutionDataset` over one big CSV.

## Choosing a style

All styles are classes of `gridviz`, passed to the layer as an array (several styles draw on top of
each other).

| Goal                                         | Style                                                                                                                                    |
| -------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| Colour by value, any shape, any colour logic | `ShapeColorSizeStyle` (canvas, most flexible)                                                                                            |
| Colour by value, lots of cells               | `SquareColorWebGLStyle` (`tFun` gives 0..1 on a `color` ramp)                                                                            |
| Colour by category, lots of cells            | `SquareColorCategoryWebGLStyle` (`code` + `color` object)                                                                                |
| Many circles with size and colour            | `CircleColorSizeWebGLStyle`                                                                                                              |
| Share of several components                  | `CompositionStyle` (pies, rings...); for three shares, `ShapeColorSizeStyle` with `gridviz.ternaryColorClassifier` and a `TernaryLegend` |
| Over time                                    | `TimeSeriesStyle`                                                                                                                        |
| Dots, 3D look, hillshade...                  | `DotDensityStyle`, `PillarStyle`, `ShadingStyle`, `SideTanakaStyle`, `JoyPlotStyle`, `LegoStyle`, `IsoFenceStyle`                        |

The reference has one section per style with its class name and options; there are more than the
table lists (`StrokeStyle`, `SegmentStyle`, `TextStyle`, `ImageStyle`, `MosaicStyle`, `NinjaStarStyle`...).
Kernel smoothing and interpolation are separate sections.

Options shared by all styles: `filter(cell)`, `visible`, `alpha(z)`, `blendOperation(z)`, `viewScale`.

**Colour scales that adapt to the view.** Use a `viewScale` (`gridviz.viewScaleColor`,
`viewScaleColorQuantile`, `viewScale`, `viewScaleQuantile`) so the scale is computed from the cells
currently on screen. For skewed data add `stretching` (`gridviz.logarithmicScale(-8)`,
`powerScale(0.4)`), or in WebGL styles `stretching: { fun: 'log', alpha: -7 }`.

## Layers and extras

-   **Background**: `BackgroundLayer({ url, resolutions, origin })` for slippy-map tiles,
    `BackgroundLayerImage`, `BackgroundLayerWMS`. For Eurostat GISCO basemaps use the
    `gridviz-eurostat` extension, which provides ready-made layers in the grid CRS:
    `new gridviz.BackgroundLayer(gridviz_eurostat.giscoBackgroundLayer('OSMPositronBackground', 18, 'EPSG3035'))`
    (see `examples/basics/background_gisco.html`).
-   **Labels and boundaries**: `LabelLayer` (CSV of places, give each its `x`/`y` in `preprocess`),
    `GeoJSONLayer` (GeoJSON must already be in the grid CRS).
-   **Tooltip**: set `cellInfoHTML: (cell) => html` on the layer; the default lists raw column names,
    which is fine for exploring but not for a finished map. `'none'` disables it.
-   **Legends**: `style.legends = [new gridviz.ColorLegend({...}), ...]`. Types: `ColorLegend`,
    `ColorDiscreteLegend`, `ColorCategoryLegend`, `SizeLegend`, `OrientationLegend`, `TernaryLegend`,
    `VennLegend`. Put them in your own element with the map option `legendContainer`.
-   **Limits**: `map.setZoomExtent([min, max])` and `map.setViewExtent([xMin, yMin, xMax, yMax])`.
-   **Leaflet**: use the `leaflet-gridviz` plugin; for dense grids see "Drawing grid layers on the GPU"
    in the reference.

## Gotchas

-   **Missing values need their own colour.** `+''` is `0` and `+':'` is `NaN`: test the text before
    converting, mark missing cells, and draw them with a distinct colour and a legend entry. WebGL
    styles skip a cell whose `tFun` returns `undefined`, so use a second style with `filter` for the
    missing cells. See "Missing values" in the reference.
-   **Colour functions run on every visible cell on every redraw.** Keep them cheap; prefer a WebGL
    style for dense grids.
-   **`multiply` on a dark background gives black**; use `screen` or `lighter` there.
-   **Sizes are not pixels.** Use `resolution` for "fill the cell" and `z` to convert to pixels.
-   **A column named `x` or `y` in a tile overwrites the cell position.**
-   **Custom styles** are possible (`new gridviz.Style({ drawFun })`, see "Custom styles" in the
    reference), but check the predefined styles and their options first.
-   **Check the result.** Open the page and look. A blank map is usually wrong coordinates (lon/lat
    instead of the grid CRS), wrong `resolution`, a `z` that is far too large or small, or CSV
    values left as text.

## Related

-   Grid cells for Europe (population, census, accessibility) are published by Eurostat/GISCO. Their
    web services take WGS84 lon/lat; remember to project coordinates to the grid CRS before using
    them as the gridviz view.
-   For region-based (NUTS) thematic maps instead of grids, use eurostat-map:
    https://github.com/eurostat/eurostat-map/tree/master/skills/eurostat-map
