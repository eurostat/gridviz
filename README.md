# gridviz

![npm bundle size](https://img.shields.io/bundlephobia/minzip/gridviz)
![npm](https://img.shields.io/npm/v/gridviz)
![license](https://img.shields.io/badge/license-EUPL-success)

[Gridviz](README.md) is a JavaScript library to visualise gridded data (or any tabular dataset with x/y position) in the browser in a large variety of advanced cartographic styles. Unlike traditional raster-based web mapping tools, [Gridviz](README.md) renders everything client-side, on the fly.

<div>
  <img src="https://raw.githubusercontent.com/eurostat/gridviz/master/docs/screenshots/cropped/color.png" alt="preview" width="200px" height="200px"/>
  <img src="https://raw.githubusercontent.com/eurostat/gridviz/master/docs/screenshots/cropped/joyplot.png" alt="preview" width="200px" height="200px"/>
  <img src="https://raw.githubusercontent.com/eurostat/gridviz/master/docs/screenshots/cropped/size.png" alt="preview" width="200px" height="200px"/>
  <img src="https://raw.githubusercontent.com/eurostat/gridviz/master/docs/screenshots/cropped/nl.png" alt="preview" width="200px" height="200px"/>
</div>

Note: This page presents the documentation of the version 2. The version 1 documentation remains available [there](v1/readme.md).

## Examples

Few examples are listed on [this page](examples/README.md).

## Installation

### Node.js

```Shell
npm install gridviz
```

then

```javascript
gridviz = require("gridviz");
```

### standalone

```javascript
<script src="https://unpkg.com/gridviz/build/gridviz.min.js"></script>
```

## Usage

Create a [Gridviz](README.md) application using `let app = new gviz.App();` and customise it with the methods described in the documentation below.

Here's a basic example that loads a CSV file on Europe population, 5x5 km grid:

```javascript
        new gviz.App(containerDiv)
            .setGeoCenter({ x: 4500000, y: 2900000 }).setZoomFactor(3000)
            .addCSVGridLayer(
                "https://raw.githubusercontent.com/eurostat/gridviz/master/assets/csv/Europe/5km/3035/pop_2011_3035_5km.csv",
                5000,
                [
                    new gviz.SquareColorWGLStyle({
                        colorCol: "Population",
                        tFun: (v) => Math.min(v / 50000, 1)
                    })
                ]
            )
```
(see [online](examples/basic_CSV.html))

[Gridviz](README.md) can display several layers on top of each others. Each layer is based on a single multi-resolution dataset, which can be displayed several times based on several cartographic styles. For more information, see the [examples](#examples).


## App Configuration



| Method                                                                      | Type                   | Default      | Description                                              |
| --------------------------------------------------------------------------- | ---------------------- | ------------ | -------------------------------------------------------- |
| _app_.**getGeoCenter**()<br />_app_.**setGeoCenter**([value])               | { x:number, y:number } | { x:0, y:0 } | Get/set the geographical coordinates of the view center. |
| _app_.**getZoomFactor**()<br />_app_.**setZoomFactor**([value])             | number                  | 1         | Get/set the view zoom. This zoom factor is expressed as the size of a pixel in ground distance.           |
| _app_.**getZoomFactorExtent**()<br />_app_.**setZoomFactorExtent**([value]) | Array.<number>                  | [0, Infinity]         | Get/set the view zoom extent, in order to prevent the user to zoom in/out beyond some zoom levels.        |
| _app_.**getBackgroundColor**()<br />_app_.**setBackgroundColor**([value])   | string                  | "white"         | Get/set the map background color.                                                         |
| _app_.**getBoundaryLayer**()<br />_app_.**setBoundaryLayer**([value])       | LineLayer       | undefined         | A layer for boundary lines, see [here](#showing-boundaries).                                                         |
| _app_.**getLabelLayer**()<br />_app_.**setLabelLayer**([value])             | LabelLayer     | A layer for labels (such as placenames), see [here](#showing-labels)undefined         |                                                          |
| _app_.**setViewFromURL**()                 |               |       | Set view geo center and zoom from URL parameters _x_, _y_ and _z_. For example, using the URL _myPage.html?x=1000&y=2000&z=45_ will force the viex to center to geographical coordinates _(1000, 2000)_ and zoom _45_.    |



## Adding data

Input data are tabular data, in CSV format. It is possible to specify different data sources for different zoom levels, so that the level of detail of the data can adapt to the zoom level. Tiled CSV data can also be specified following the [tiledCSV format](docs/tiledCSVformat.md).

Are are several examples:

### Single CSV file

```javascript
        new gviz.App(containerDiv)
            .setGeoCenter({ x: 4500000, y: 2900000 }).setZoomFactor(3000)
            .addCSVGridLayer(
                "https://raw.githubusercontent.com/eurostat/gridviz/master/assets/csv/Europe/5km/3035/pop_2011_3035_5km.csv",
                5000,
                [
                    new gviz.SquareColorWGLStyle({
                        colorCol: "Population",
                        tFun: (v) => Math.min(v / 50000, 1)
                    })
                ]
            )
```
(see [online](examples/basic_CSV.html))


### Multi scale CSV data

TODO add example

### Tiled CSV data

TODO add example

### Multi scale tiled CSV data

TODO add example


| Method                        | Arguments  | Description |
| ----------------------------- | ----- | ------ |
| _app_.**addCSVGridLayer**([args]) | See [example](#single-csv-file) | Add a layer from a CSV grid dataset. |
| _app_.**addMultiScaleCSVGridLayer**([args]) | See [example](#multi-scale-csv-data) | Add a layer from a multi scale CSV grid dataset. |
| _app_.**addTiledCSVGridLayer**([args]) | See [example](#tiled-csv-data) | Add a layer from a tiled CSV grid dataset. |
| _app_.**addMultiScaleTiledCSVGridLayer**([args]) | See [example](#multi-scale-tiled-csv-data) | Add a layer from a multi scale tiled CSV grid dataset. |

To manage creation of datasets and their possible reuse accross different layers (so that the data is loaded and stored once), the following methods are also available:

| Method                        | Arguments  | Description |
| ----------------------------- | ----- | ------ |
| _app_.**addLayerFromDataset**([args]) | - | Add a layer to the app. |
| _app_.**makeCSVGridDataset**([args]) | - | Make a CSV grid dataset. |
| _app_.**makeTiledCSVGridDataset**([args]) | - | Make a tiled CSV grid dataset. |
| _app_.**makeMultiScaleCSVGridDataset**([args]) | - | Make a multi scale CSV grid dataset. |
| _app_.**makeMultiScaleTiledCSVGridDataset**([args]) | - | Make a multi scale tiled CSV grid dataset. |


## Styles


### Shape/Color/Size Style

ColorSizeShapeStyle allows you to define the **color**, **size** and **shape** of each grid cell individually.

```javascript
//TODO

```

| Property              | Type   | Default | Description |
| --------------------- | ------ | ------- | ----------- |
| **propName**([value]) | String | 'grey'  | bla         |



### Square color WebGL Style


### Composition style

### Segment style


### Stroke style


### JoyPlot Style

JoyPlotStyle allows you to visualise a grid in the form of a 'joyplot' - named after Joy Division's "Unknown Pleasures" album cover.

```javascript
//TODO
```

| Property              | Type   | Default | Description |
| --------------------- | ------ | ------- | ----------- |
| **propName**([value]) | String | 'grey'  | bla         |

<br>


### Dot density style

TODO

### Side style

TODO

### Mosaic style

TODO

### Tanaka style

TODO

### Lego style

TODO

### Pillars style

TODO

### Text style

TODO

### Kernel smoothing style

TODO

## Tooltip

TODO

## Legends

TODO


## Foreground information


### Showing labels

TODO
From https://github.com/eurostat/euronym

### Showing boundaries

TODO
From https://github.com/eurostat/Nuts2json

## About

|                |                                                                                                                                                                                       |
| -------------- | ------------------------------------------------------- |
| _contributors_ | [<img src="https://github.com/JoeWDavies.png" height="40" />](https://github.com/JoeWDavies) [<img src="https://github.com/jgaffuri.png" height="40" />](https://github.com/jgaffuri) |
| _version_      | See [npm](https://www.npmjs.com/package/gridviz?activeTab=versions)                                                                                                                   |
| _status_       | Since 2020                                                                                                                                                                            |
| _license_      | [EUPL 1.2](https://github.com/eurostat/Nuts2json/blob/master/LICENSE)                                                                                                                 |

## Support and contribution

Feel free to [ask support](https://github.com/eurostat/eurostat.js/issues/new), fork the project or simply star it (it's always a pleasure).

## Copyright

The [Eurostat NUTS dataset](http://ec.europa.eu/eurostat/web/nuts/overview) is copyrighted. There are [specific provisions](https://ec.europa.eu/eurostat/web/gisco/geodata/reference-data/administrative-units-statistical-units) for the usage of this dataset which must be respected. The usage of these data is subject to their acceptance. See the [Eurostat-GISCO website](http://ec.europa.eu/eurostat/web/gisco/geodata/reference-data/administrative-units-statistical-units/nuts) for more information.

## Disclaimer

The designations employed and the presentation of material on these maps do not imply the expression of any opinion whatsoever on the part of the European Union concerning the legal status of any country, territory, city or area or of its authorities, or concerning the delimitation of its frontiers or boundaries. Kosovo*: This designation is without prejudice to positions on status, and is in line with UNSCR 1244/1999 and the ICJ Opinion on the Kosovo declaration of independence. Palestine*: This designation shall not be construed as recognition of a State of Palestine and is without prejudice to the individual positions of the Member States on this issue.
