# gridviz

![npm bundle size](https://img.shields.io/bundlephobia/minzip/gridviz)
![npm](https://img.shields.io/npm/v/gridviz)
![license](https://img.shields.io/badge/license-EUPL-success)

[Gridviz](https://github.com/eurostat/gridviz/) is a JavaScript library to visualise gridded data (or any tabular dataset with x/y position) in the browser in a large variety of advanced cartographic styles. Unlike traditional raster-based web mapping tools, [Gridviz](https://github.com/eurostat/gridviz/) renders everything client-side, on the fly.

[![](/docs/img/overviews/ov_accessibility.png)](#shapecolorsize-style)
[![](/docs/img/overviews/ov_age_balance.png)](#shapecolorsize-style)
[![](/docs/img/overviews/ov_choco.png)](#side-style)
[![](/docs/img/overviews/ov_dark.png)](#square-color-webgl-style)
[![](/docs/img/overviews/ov_donut.png)](#shapecolorsize-style)
[![](/docs/img/overviews/ov_flag.png)](#composition-style)
[![](/docs/img/overviews/ov_joyplot.png)](#joyplot-style)
[![](/docs/img/overviews/ov_lego.png)](#lego-style)
[![](/docs/img/overviews/ov_mosaic.png)](#mosaic-style)
[![](/docs/img/overviews/ov_piechart.png)](#composition-style)
[![](/docs/img/overviews/ov_pillar.png)](#pillars-style)
[![](/docs/img/overviews/ov_popchange.png)](#shapecolorsize-style)
[![](/docs/img/overviews/ov_ring.png)](#composition-style)
[![](/docs/img/overviews/ov_segment.png)](#segment-style)
[![](/docs/img/overviews/ov_tanaka.png)](#tanaka-style)

## Examples

- [Europe - 1km resolution - GEOSTAT/GISCO](https://eurostat.github.io/gridviz/examples/EUR.html)
- [France - 200m resolution - INSEE Filosofi](https://eurostat.github.io/gridviz/examples/FR.html)
- [Croatia - 1km resolution - DZS 2015 grid](https://eurostat.github.io/gridviz/examples/HR.html)
- [Dark style](https://eurostat.github.io/gridviz/examples/FR_dark.html)

## Table of contents

- [gridviz](#gridviz)
  - [Examples](#examples)
  - [Table of contents](#table-of-contents)
  - [Installation](#installation)
    - [Node.js](#nodejs)
    - [standalone](#standalone)
  - [Usage](#usage)
  - [App Configuration](#app-configuration)
  - [Adding data](#adding-data)
    - [Single CSV file](#single-csv-file)
    - [Multi scale CSV data](#multi-scale-csv-data)
    - [Tiled CSV data](#tiled-csv-data)
    - [Multi scale tiled CSV data](#multi-scale-tiled-csv-data)
    - [Data pre-processing](#data-pre-processing)
  - [Styles](#styles)
    - [Shape/Color/Size Style](#shapecolorsize-style)
    - [Square color WebGL Style](#square-color-webgl-style)
    - [Composition style](#composition-style)
    - [Segment style](#segment-style)
    - [Dot density style](#dot-density-style)
    - [Stroke style](#stroke-style)
    - [Side style](#side-style)
    - [JoyPlot Style](#joyplot-style)
    - [Mosaic style](#mosaic-style)
    - [Tanaka style](#tanaka-style)
    - [Lego style](#lego-style)
    - [Pillars style](#pillars-style)
    - [Text style](#text-style)
    - [Kernel smoothing style](#kernel-smoothing-style)
  - [Legends](#legends)
  - [Foreground information](#foreground-information)
    - [Showing labels](#showing-labels)
    - [Showing boundaries](#showing-boundaries)
  - [Tooltip](#tooltip)
  - [About](#about)
    - [Support and contribution](#support-and-contribution)
    - [Copyright](#copyright)
    - [Disclaimer](#disclaimer)


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

Create a [Gridviz](https://github.com/eurostat/gridviz/) application using `let app = new gviz.App();` and customise it with the methods described in the documentation below.

Here's a basic example that loads a CSV file on Europe population (5km resolution):

```javascript
        new gviz.App(containerDiv)
            //set position and zoom
            .setGeoCenter({ x: 4500000, y: 2900000 }).setZoomFactor(3000)
            //add CSV layer
            .addCSVGridLayer(
                //data URL
                "https://raw.githubusercontent.com/eurostat/gridviz/master/assets/csv/Europe/pop_2018_5km.csv",
                //resolution, in CRS unit (m)
                5000,
                //the style
                [
                    new gviz.SquareColorWGLStyle({
                        //the CSV column to show
                        colorCol: "Population",
                        //value to [0,1] mapping function
                        tFun: (value) => Math.min(value / 50000, 1)
                    })
                ]
            )
```
(see [online](https://eurostat.github.io/gridviz/examples/basic_CSV.html), see [code](examples/basic_CSV.html))

[Gridviz](https://github.com/eurostat/gridviz/) can display several layers on top of each others. Each layer is based on a single [multi-resolution dataset](#adding-data), which can be displayed with several [cartographic styles](#styles). For more information, see the [examples](#examples).


## App Configuration

The following methods allow further configuration of a [Gridviz](https://github.com/eurostat/gridviz/) application:

| Method                                                                      | Type                   | Default       | Description                                                                                                                                                                                                            |
| --------------------------------------------------------------------------- | ---------------------- | ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _app_.**getGeoCenter**()<br />_app_.**setGeoCenter**([value])               | { x:number, y:number } | { x:0, y:0 }  | Get/set the geographical coordinates of the view center.                                                                                                                                                               |
| _app_.**getZoomFactor**()<br />_app_.**setZoomFactor**([value])             | number                 | 1             | Get/set the view zoom. This zoom factor is expressed as the size of a pixel in ground distance.                                                                                                                        |
| _app_.**getZoomFactorExtent**()<br />_app_.**setZoomFactorExtent**([value]) | Array.<number>         | [0, Infinity] | Get/set the view zoom extent, in order to prevent the user to zoom in/out beyond some zoom levels.                                                                                                                     |
| _app_.**getBackgroundColor**()<br />_app_.**setBackgroundColor**([value])   | string                 | "white"       | Get/set the map background color.                                                                                                                                                                                      |
| _app_.**getBoundaryLayer**()<br />_app_.**setBoundaryLayer**([value])       | LineLayer              | undefined     | A layer for boundary lines, see [here](#showing-boundaries).                                                                                                                                                           |
| _app_.**getLabelLayer**()<br />_app_.**setLabelLayer**([value])             | LabelLayer             | undefined     | A layer for labels (such as placenames), see [here](#showing-labels).                                                                                                                                                  |
| _app_.**setViewFromURL**()                                                  |                        |               | Set view geo center and zoom from URL parameters _x_, _y_ and _z_. For example, using the URL _myPage.html?x=1000&y=2000&z=45_ will force the viex to center to geographical coordinates _(1000, 2000)_ and zoom _45_. |



## Adding data

Input data are tabular data, in CSV format. It is possible to specify different data sources for different zoom levels, so that the level of detail of the data can adapt to the zoom level. Tiled CSV data can also be specified following the [tiled CSV format](docs/tiledCSVformat.md).

Are are several examples:

### Single CSV file

See the [basic example above](#usage).

### Multi scale CSV data

```javascript
        new gviz.App(containerDiv)
            //set position and zoom
            .setGeoCenter({ x: 4500000, y: 2900000 }).setZoomFactor(3000)
            //add multi scale tiled CSV layer
            .addMultiScaleTiledCSVGridLayer(
                //the resolution values, ordered
                [1000, 2000, 5000, 10000, 20000, 50000, 100000],
                //the URL, from the resolution
                r => "https://raw.githubusercontent.com/eurostat/gridviz/master/assets/csv/Europe/grid_pop_tiled/" + Math.round(r / 1000) + "km/",
                //the styles
                [
                    new gviz.SquareColorWGLStyle({
                        colorCol: "2018",
                        tFun: (value, resolution, stats) => Math.pow(value / stats.max, 0.3)
                    })
                ],
                {
                    //the maximum pixel size before jumping to a lower resolution
                    pixNb: 3
                })
```
(see [online](https://eurostat.github.io/gridviz/examples/basic_multiscale_CSV.html), see [code](examples/basic_multiscale_CSV.html))


### Tiled CSV data

```javascript
        new gviz.App(containerDiv)
        new gviz.App(containerDiv)
            //set position and zoom
            .setGeoCenter({ x: 4500000, y: 2900000 }).setZoomFactor(3000)
            //add multi scale tiled CSV layer
            .addTiledCSVGridLayer(
                //data URL
                "https://raw.githubusercontent.com/eurostat/gridviz/master/assets/csv/Europe/grid_pop_tiled/5km/",
                //the styles
                [
                    new gviz.SquareColorWGLStyle({
                        colorCol: "2018",
                        tFun: (value) => Math.min(value / 50000, 1)
                    })
                ]
            )
```
(see [online](https://eurostat.github.io/gridviz/examples/basic_tiled_CSV.html), see [code](examples/basic_tiled_CSV.html))

### Multi scale tiled CSV data

```javascript
        new gviz.App(containerDiv)
            //set position and zoom
            .setGeoCenter({ x: 4500000, y: 2900000 }).setZoomFactor(3000)
            //add multi scale tiled CSV layer
            .addMultiScaleTiledCSVGridLayer(
                //the resolution values, ordered
                [1000, 2000, 5000, 10000, 20000, 50000, 100000],
                //the URL, from the resolution
                r => "https://raw.githubusercontent.com/eurostat/gridviz/master/assets/csv/Europe/grid_pop_tiled/" + Math.round(r / 1000) + "km/",
                //the styles
                [
                    new gviz.SquareColorWGLStyle({
                        colorCol: "2018",
                        tFun: (value, resolution, stats) => Math.pow(value / stats.max, 0.3)
                    })
                ],
                {
                    //the maximum pixel size before jumping to a lower resolution
                    pixNb: 3
                })
```
(see [online](https://eurostat.github.io/gridviz/examples/basic_multiscale_tiled_CSV.html), see [code](examples/basic_multiscale_tiled_CSV.html))


| Method                                           | Arguments                                  | Description                                            |
| ------------------------------------------------ | ------------------------------------------ | ------------------------------------------------------ |
| _app_.**addCSVGridLayer**([args])                | See [example](#single-csv-file)            | Add a layer from a CSV grid dataset.                   |
| _app_.**addMultiScaleCSVGridLayer**([args])      | See [example](#multi-scale-csv-data)       | Add a layer from a multi scale CSV grid dataset.       |
| _app_.**addTiledCSVGridLayer**([args])           | See [example](#tiled-csv-data)             | Add a layer from a tiled CSV grid dataset.             |
| _app_.**addMultiScaleTiledCSVGridLayer**([args]) | See [example](#multi-scale-tiled-csv-data) | Add a layer from a multi scale tiled CSV grid dataset. |

To manage creation of datasets and their possible reuse accross different layers (so that the data is loaded and stored once), the following methods are also available:

| Method                                              | Arguments | Description                                |
| --------------------------------------------------- | --------- | ------------------------------------------ |
| _app_.**addLayerFromDataset**([args])               | -         | Add a layer to the app.                    |
| _app_.**makeCSVGridDataset**([args])                | -         | Make a CSV grid dataset.                   |
| _app_.**makeTiledCSVGridDataset**([args])           | -         | Make a tiled CSV grid dataset.             |
| _app_.**makeMultiScaleCSVGridDataset**([args])      | -         | Make a multi scale CSV grid dataset.       |
| _app_.**makeMultiScaleTiledCSVGridDataset**([args]) | -         | Make a multi scale tiled CSV grid dataset. |


### Data pre-processing

Loaded data can be processed/transformed before it is being used by the [Gridviz](https://github.com/eurostat/gridviz/) application in order to, for example:
- Filter/simplify the data to keep only the necessary one. This can save client memory,
- Extract/compute each cell coordinates into the **x** and **y** columns, in case the input data does not contain such columns explicitelly,
- Compute a new column from the combination of existing ones, such as the ratio between two columns, or the aggregation of several columns,
- Run some data conversions,
- Etc.

This process is run on each cell individually, only once, after the data has been downloaded.

Here is an example showing how to compute a new column on population change, as the difference between two columns _2011_ and _2018_. This new column is then used directly to be represented:


```javascript
        new gviz.App(containerDiv)
            .setGeoCenter({ x: 4500000, y: 2900000 }).setZoomFactor(3000)
            .addMultiScaleTiledCSVGridLayer(
                [1000, 2000, 5000, 10000, 20000, 50000, 100000],
                r => "https://raw.githubusercontent.com/eurostat/gridviz/master/assets/csv/Europe/grid_pop_tiled/" + Math.round(r / 1000) + "km/",
                [ new gviz.ShapeColorSizeStyle({ /* style construction */}) ],
                {
                    //for each cell, compute 2011 -> 2018 change and store it in a new "change" column
                    preprocess: c => {
                        if (!c["2011"] && !c["2018"]) c.change = 0
                        else if (!c["2011"] && c["2018"]) c.change = + c["2018"]
                        else if (c["2011"] && !c["2018"]) c.change = - c["2011"]
                        else c.change = c["2018"] - c["2011"]
                    },
                    pixNb: 3,
                }
            )
```
(see [online](https://eurostat.github.io/gridviz/examples/preprocess.html), see [code](examples/preprocess.html))

Note that it is unfortunatelly currently not possible to compute new columns from the combination of two different datasets.

## Styles

TODO: explain general principles, with (v,r,zf,s) functions. + use several styles by layer + define zoom extent for each style

### Shape/Color/Size Style

This style is a generic type which allows to define the **shape**, **color** and **size** of each grid cell, independantly according to 3 different variables. Three shapes are currently available: square, circle and donut (a disk with a hole of changing size).

TODO: screenshots

TODO list/describe properties ?

See [this example with changing size](https://eurostat.github.io/gridviz/examples/styles/shapecolorsize.html) ([code](examples/styles/shapecolorsize.html)).

See [this example with random shape, color and size](https://eurostat.github.io/gridviz/examples/styles/shapecolorsize_random.html) ([code](examples/styles/shapecolorsize_random.html)).

### Square color WebGL Style

This style displays each cell as a square, with a changing color. This style uses webGL and should thus be used to display at detailled resolutions.

See [this example](https://eurostat.github.io/gridviz/examples/styles/squarecolorwgl.html) ([code](examples/styles/squarecolorwgl.html)).

### Composition style

This style shows a composition at cell level in various different ways: Flags, pie charts, rings, segments, radar, age pyramid and halftone.

See [this example](https://eurostat.github.io/gridviz/examples/styles/composition.html) ([code](examples/styles/composition.html)).


### Segment style

This style displays each cell as a segment with a changeable color, length, width and orientation.

See [this example](https://eurostat.github.io/gridviz/examples/styles/segment.html) ([code](examples/styles/segment.html)).


### Dot density style

This style displays each cell as randomly located points, with changeable density and color.

See [this example](https://eurostat.github.io/gridviz/examples/styles/dotdensity.html) ([code](examples/styles/dotdensity.html)).

### Stroke style

This style shows the stroke of each cell with different colors, widths, shapes and sizes.

See [this example](https://eurostat.github.io/gridviz/examples/styles/stroke.html) ([code](examples/styles/stroke.html)).


### Side style

This style extract the sides of the cells and show each of them depending on the values of the 2 cells around.

See [this example](https://eurostat.github.io/gridviz/examples/styles/side.html) ([code](examples/styles/side.html)).


### JoyPlot Style

This style shows cell rows in the form of a 'joyplot' - named after Joy Division's "Unknown Pleasures" album cover.

See [this example](https://eurostat.github.io/gridviz/examples/styles/joyplot.html) ([code](examples/styles/joyplot.html)).

### Mosaic style

This style is a usual cell coloring style with a slight random deformation of the squares giving a 'mosaic' like effect.

See [this example](https://eurostat.github.io/gridviz/examples/styles/mosaic.html) ([code](examples/styles/mosaic.html)).


### Tanaka style

This style shows the grid cells in a Tanaka-like style, that is with discrete colors and shadow effect.

See [this example](https://eurostat.github.io/gridviz/examples/styles/tanaka.html) ([code](examples/styles/tanaka.html)).

### Lego style

This style shows the grid cells as lego bricks with changeable colors and height.

See [this example](https://eurostat.github.io/gridviz/examples/styles/lego.html) ([code](examples/styles/lego.html)).

### Pillars style

This style shows the grid cells as 3D pillars, with changeable heigths and colors.

See [this example](https://eurostat.github.io/gridviz/examples/styles/pillar.html) ([code](examples/styles/pillar.html)).

### Text style

This style shows the grid cells as text characters with different colors.

See [this example](https://eurostat.github.io/gridviz/examples/styles/text.html) ([code](examples/styles/text.html)).

### Kernel smoothing style

This style allows applying gaussian kernel smoothing to the grid.

See [this example](https://eurostat.github.io/gridviz/examples/styles/kernelsmoothing.html) ([code](examples/styles/kernelsmoothing.html)).


## Legends

TODO


## Foreground information


### Showing labels

TODO

Example based on https://github.com/eurostat/euronym

### Showing boundaries

TODO

Example based on https://github.com/eurostat/Nuts2json



## Tooltip

![gridviz tooltip](/docs/img/tooltip.png)

A 'tooltip' shows information related to the selected grid cell. The information shown for each selected cell can be specified at dataset level using the **cellInfoHTML** parameter. See for example:

```javascript
        new gviz.App(containerDiv)
            .setGeoCenter({ x: 4500000, y: 2900000 }).setZoomFactor(500)
            .addCSVGridLayer(
                "https://raw.githubusercontent.com/eurostat/gridviz/master/assets/csv/Europe/pop_2018_5km.csv",
                5000,
                [new gviz.SquareColorWGLStyle({ colorCol: "population", tFun: (value) => Math.min(value / 50000, 1) })],
                {
                    //tooltip content configuration
                    cellInfoHTML: c => "The population of this cell is: <b>" + c.population + "</b> !",
                }
            )
```
(see [online](https://eurostat.github.io/gridviz/examples/tooltip.html), see [code](examples/tooltip.html))

TODO: change tooltip style

## About

|                |                                                                                                                                                                                       |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _contributors_ | [<img src="https://github.com/JoeWDavies.png" height="40" />](https://github.com/JoeWDavies) [<img src="https://github.com/jgaffuri.png" height="40" />](https://github.com/jgaffuri) |
| _version_      | See [npm](https://www.npmjs.com/package/gridviz?activeTab=versions)                                                                                                                   |
| _status_       | Since 2020                                                                                                                                                                            |
| _license_      | [EUPL 1.2](LICENSE)                                                                                                                                                                   |

### Support and contribution

Feel free to [ask support](https://github.com/eurostat/gridviz/issues/new), fork the project or simply star it (it's always a pleasure).

### Copyright

The [Eurostat NUTS dataset](http://ec.europa.eu/eurostat/web/nuts/overview) is copyrighted. There are [specific provisions](https://ec.europa.eu/eurostat/web/gisco/geodata/reference-data/administrative-units-statistical-units) for the usage of this dataset which must be respected. The usage of these data is subject to their acceptance. See the [Eurostat-GISCO website](http://ec.europa.eu/eurostat/web/gisco/geodata/reference-data/administrative-units-statistical-units/nuts) for more information.

### Disclaimer

The designations employed and the presentation of material on these maps do not imply the expression of any opinion whatsoever on the part of the European Union concerning the legal status of any country, territory, city or area or of its authorities, or concerning the delimitation of its frontiers or boundaries. Kosovo*: This designation is without prejudice to positions on status, and is in line with UNSCR 1244/1999 and the ICJ Opinion on the Kosovo declaration of independence. Palestine*: This designation shall not be construed as recognition of a State of Palestine and is without prejudice to the individual positions of the Member States on this issue.
