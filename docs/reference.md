# Gridviz API reference

## Table of contents

- [Gridviz API reference](#gridviz-api-reference)
  - [Table of contents](#table-of-contents)
  - [Usage](#usage)
  - [App Configuration](#app-configuration)
  - [Adding data](#adding-data)
    - [Single CSV file](#single-csv-file)
    - [Multi scale CSV data](#multi-scale-csv-data)
    - [Tiled CSV data](#tiled-csv-data)
    - [Multi scale tiled CSV data](#multi-scale-tiled-csv-data)
    - [Data pre-processing](#data-pre-processing)
  - [Styles](#styles)
    - [Square color WebGL Style](#square-color-webgl-style)
    - [Shape/Color/Size Style](#shapecolorsize-style)
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
  - [Stretching](#stretching)
  - [Foreground information](#foreground-information)
    - [Showing labels](#showing-labels)
    - [Showing boundaries](#showing-boundaries)
  - [Tooltip](#tooltip)

Anything unclear or missing? Feel free to [ask](https://github.com/eurostat/gridviz/issues/new) !

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
                tFun: (value) => gviz.sExp(Math.min(value / 100000, 1), -15)
            })
        ]
    )
```
(see [online](https://eurostat.github.io/gridviz/examples/basic_CSV.html), see [code](../examples/basic_CSV.html))

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

Input data are tabular data, in CSV format.

For the position of the cell, two columns **x** and **y** must be specified, with the geographical coordinates of the lower left corner of the cell, expressed in the grid Coordinate Reference System. If this information is not explicitelly provided in the input data, it is however possible to compute it on-the-fly as explained [here](#data-pre-processing).

It is possible to specify different data sources for different zoom levels, so that the level of detail of the data can adapt to the zoom level. Tiled CSV data can also be specified following the [tiled CSV format](tiledCSVformat.md).

Are are several examples:

### Single CSV file

This is the simplest case, when a unique CSV file is loaded. See the [basic example above](#usage).

### Multi scale CSV data

When several CSV files contain the data with different resolutions, it is possible to define a multi-scale dataset from those files. The change of dataset depending on the zoom level is controled with the **pixNb** parameter:

```javascript
new gviz.App(containerDiv)
    //set position and zoom
    .setGeoCenter({ x: 4500000, y: 2900000 }).setZoomFactor(3000)
    //add multiscale CSV layer
    .addMultiScaleCSVGridLayer(
        [5000, 10000, 20000, 50000, 100000],
        r => "https://raw.githubusercontent.com/eurostat/gridviz/master/assets/csv/Europe/pop_2018_" + Math.round(r / 1000) + "km.csv",
        [
            new gviz.SquareColorWGLStyle({
                colorCol: "population",
                tFun: (value, resolution, stats) => gviz.sExp(value / stats.max, -50)
            })
        ],
        {
            //the maximum pixel size before jumping to a lower resolution
            pixNb: 3
        }
    )
```
(see [online](https://eurostat.github.io/gridviz/examples/basic_multiscale_CSV.html), see [code](../examples/basic_multiscale_CSV.html))

### Tiled CSV data

For large dataset, it is adviced to decompose them into different data chunks and index those by geographical location, as specified in the [tiled CSV format](tiledCSVformat.md). The [Gridviz](https://github.com/eurostat/gridviz/) application can then automatically retrieve only the usefull data that fall into the view geographical extent. This is an example of how to load such data:

```javascript
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
                tFun: (value) => gviz.sExp(Math.min(value / 100000, 1), -15)
            })
        ]
    )
```
(see [online](https://eurostat.github.io/gridviz/examples/basic_tiled_CSV.html), see [code](../examples/basic_tiled_CSV.html))

### Multi scale tiled CSV data

Multi scale tiled CSV data based on the [tiled CSV format](tiledCSVformat.md) can also be simply loaded with the example below. Here again, the change of dataset depending on the zoom level is controled with the **pixNb** parameter:

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
                tFun: (value, resolution, stats) => gviz.sExp(value / stats.max, -50)
            })
        ],
        {
            //the maximum pixel size before jumping to a lower resolution
            pixNb: 3
        }
    )
```
(see [online](https://eurostat.github.io/gridviz/examples/basic_multiscale_tiled_CSV.html), see [code](../examples/basic_multiscale_tiled_CSV.html))


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
            preprocess: c => {
                //for each cell, compute 2011 -> 2018 change and store it in a new "change" column
                if (!c["2011"] && !c["2018"]) c.change = 0
                else if (!c["2011"] && c["2018"]) c.change = + c["2018"]
                else if (c["2011"] && !c["2018"]) c.change = - c["2011"]
                else c.change = c["2018"] - c["2011"]
                //remove unused information
                delete c["2006"]; delete c["2011"]; delete c["2018"]
            },
            pixNb: 3,
        }
    )
```
(see [online](https://eurostat.github.io/gridviz/examples/preprocess.html), see [code](../examples/preprocess.html))

Note that it is unfortunatelly currently not possible to compute new columns from the combination of two different datasets.

## Styles

TODO: explain general principles, with (v,r,zf,s) functions. + use several styles by layer + define zoom extent for each style


### Square color WebGL Style

This style displays each cell as a square, with a changing color. This style uses webGL and should thus be used to display grid cells at detailled resolutions.

See [this basic example](https://eurostat.github.io/gridviz/examples/styles/squarecolorwgl.html) ([code](../examples/styles/squarecolorwgl.html)).

See [this example with dark style](https://eurostat.github.io/gridviz/examples/styles/squarecolorwgl_dark.html) ([code](../examples/styles/squarecolorwgl_dark.html)).


| Property | Type     | Default | Description  |
| ----------- | -------- | ------- | ------------ |
| **colorCol** | string |  undefined   | The name of the column used for the color. |
| **tFun** | function(number,number,Stat):number | (v, r, s) => v / s.max |  A function computing the cell color parameter **t** (whithin [0,1]) from its __colorCol__ value **v**, the resolution **r**, and statistics **s**. This **t** value is then used to determine the cell color from the color sampling. |
| **deformationFactor** | number |  1   | A parameter within [0,Inf] to deform the distribution. 1: no deformation. <1: better show small values. >1: better show large values. |
| **colors** | Array.<string> |  Colors based on [interpolateSpectral](https://github.com/d3/d3-scale-chromatic#interpolateSpectral)   | The sample of the color ramp. |
| **size** | function(r,zf):number |  (r,zf) => r + 0.2 * zf   | A function returning the size of the cells from the resolution **r** and zoom factor **zf**, in geographical unit. All cells have the same size. |


### Shape/Color/Size Style

[![shape color size style](img/styles/shapesizecolor_sc.png)](https://eurostat.github.io/gridviz/examples/styles/shapecolorsize_size_color.html)

[![shape color size style](img/styles/shapesizecolor_s.png)](https://eurostat.github.io/gridviz/examples/styles/shapecolorsize_size.html)

[![shape color size style](img/styles/shapesizecolor_random.png)](https://eurostat.github.io/gridviz/examples/styles/shapecolorsize_random.html)

This style is a generic style which allows to define the **shape**, **color** and **size** of each grid cell, independantly according to 3 different variables. Three shapes are currently available: square, circle and donut (a disk with a hole of changing size). To show grid cells as small squares with only changing color, the style based on web GL [here](#square-color-webgl-style) should rather be used, for efficiency reasons.

See [this example with changing size](https://eurostat.github.io/gridviz/examples/styles/shapecolorsize_size.html) ([code](../examples/styles/shapecolorsize_size.html)).

See [this example with changing size and color](https://eurostat.github.io/gridviz/examples/styles/shapecolorsize_size_color.html) ([code](../examples/styles/shapecolorsize_size_color.html)).

See [this example with random shape, color and size](https://eurostat.github.io/gridviz/examples/styles/shapecolorsize_random.html) ([code](../examples/styles/shapecolorsize_random.html)).

| Property | Type     | Default | Description  |
| -------------- | -------- | ------- | -------------- |
| **colorCol** | string |  undefined   | The name of the column used for the color. |
| **color** | function(v,r,s):string |  () => "#EA6BAC"   | A function computing the cell color from its __colorCol__ value **v**, the resolution **r**, and statistics **s**. |
| **sizeCol** | string |  undefined   | The name of the column used for the size. |
| **size** | function(v,r,s,zf) |  (v,r,s,zf) => r   | A function computing the cell size from its __sizeCol__ value **v**, the resolution **r**, statistics **s** and zoom factor **zf**. |
| **shape** | function(c):string |  () => "square"   | A function computing the shape of cell **c**. Expected values are within __{"square", "circle", "donut", "none"}__ |


### Composition style

This style shows a composition at cell level in various different ways: Flags, pie charts, rings, segments, radar, age pyramid and halftone.

See [this example](https://eurostat.github.io/gridviz/examples/styles/composition.html) ([code](../examples/styles/composition.html)).

| Property | Type     | Default | Description  |
| ----------- | -------- | ------- | ------------ |
| **.** |  |     |  |


### Segment style

This style displays each cell as a segment with a changeable color, length, width and orientation.

See [this basic example](https://eurostat.github.io/gridviz/examples/styles/segment.html) ([code](../examples/styles/segment.html)).

See [this example with random orientation, color, length and width](https://eurostat.github.io/gridviz/examples/styles/segment_random.html) ([code](../examples/styles/segment_random.html)).

| Property | Type     | Default | Description  |
| ----------- | -------- | ------- | ------------ |
| **.** |  |     |  |


### Dot density style

This style displays each cell as randomly located points, with changeable density and color.

See [this basic example](https://eurostat.github.io/gridviz/examples/styles/dotdensity.html) ([code](../examples/styles/dotdensity.html)).

| Property | Type     | Default | Description  |
| ----------- | -------- | ------- | ------------ |
| **.** |  |     |  |

### Stroke style

This style shows the stroke of each cell with different colors, widths, shapes and sizes. This style can be used in addition to others to show the cell strokes on top of those other styles.

See [this basic example](https://eurostat.github.io/gridviz/examples/styles/stroke.html) ([code](../examples/styles/stroke.html)).

See [this an example with random color, size, width and shape](https://eurostat.github.io/gridviz/examples/styles/stroke_random.html) ([code](../examples/styles/stroke_random.html)).

| Property | Type     | Default | Description  |
| ----------- | -------- | ------- | ------------ |
| **strokeColorCol** | string |  undefined   | The name of the column used for the stroke color. |
| **strokeColor** | function(v,r,s):string |  () => "#666"   | A function computing the cell stroke color from its __colorCol__ value **v**, the resolution **r**, and statistics **s**. |
| **sizeCol** | string |  undefined   | The name of the column used for the size. |
| **size** | function(v,r,s,zf) | (v,r,s,zf) => r   | A function computing the cell size from its __sizeCol__ value **v**, the resolution **r**, statistics **s** and zoom factor **zf**. |
| **strokeWidthCol** | string |  undefined   | The name of the column used for the stroke width. |
| **strokeWidth** | function(v,r,s,zf) | (v,r,s,zf) => zf   | A function computing the cell stroke width from its __sizeCol__ value **v**, the resolution **r**, statistics **s** and zoom factor **zf**. |
| **shape** | function(c):string |  () => "square"   | A function computing the shape of cell **c**. Expected values are within __{"square", "circle", "none"}__ |

### Side style

This style extract the sides of the cells and show each of them depending on the values of the 2 cells around.

See [this basic example](https://eurostat.github.io/gridviz/examples/styles/side.html) ([code](../examples/styles/side.html)).

| Property | Type     | Default | Description  |
| ----------- | -------- | ------- | ------------ |
| **.** |  |     |  |


### JoyPlot Style

This style shows cell rows in the form of a 'joyplot' - named after Joy Division's "Unknown Pleasures" album cover.

See [this basic example](https://eurostat.github.io/gridviz/examples/styles/joyplot.html) ([code](../examples/styles/joyplot.html)).

| Property | Type     | Default | Description  |
| ----------- | -------- | ------- | ------------ |
| **.** |  |     |  |

### Mosaic style

[![mosaic style](img/styles/mosaic_basic.png)](https://eurostat.github.io/gridviz/examples/styles/mosaic.html)

[![mosaic style](img/styles/mosaic_roman.png)](https://eurostat.github.io/gridviz/examples/styles/mosaic_full.html)

This style shows the cell as pseudo-irregular square shapes giving a [mosaic](https://en.wikipedia.org/wiki/Mosaic) effect. The cells are colored depending on a variable.

See [this basic example](https://eurostat.github.io/gridviz/examples/styles/mosaic.html) ([code](../examples/styles/mosaic.html)).

See [this roman style example](https://eurostat.github.io/gridviz/examples/styles/mosaic_full.html) ([code](../examples/styles/mosaic_full.html)).



| Property | Type     | Default | Description  |
| ----------- | -------- | ------- | ------------ |
| **colorCol** | string |  undefined   | The name of the column used for the color. |
| **color** | function(v,r,s):string |  () => "#EA6BAC"   | A function computing the cell color from its __colorCol__ value **v**, the resolution **r**, and statistics **s**. |
| **mosaicFactor** | number |  0.15   | The mosaic factor, within [0,0.5], to control the shape irregularities. Set to 0 for no mosaic effect. Set to 0.5 for strong mosaic effect. |
| **shadowFactor** | number |  0.2   | The mosaic shadow factor, within [0,0.5]. Set to 0 for no mosaic shadow. Set to 0.5 for strong mosaic shadow. |
| **shadowColor** | string |   "#555"  | The mosaic shadow color. |

### Tanaka style

This style shows the grid cells in a Tanaka-like style, that is with discrete colors and shadow effect.

See [this basic example](https://eurostat.github.io/gridviz/examples/styles/tanaka.html) ([code](../examples/styles/tanaka.html)).

| Property | Type     | Default | Description  |
| ----------- | -------- | ------- | ------------ |
| **.** |  |     |  |

### Lego style

This style shows the grid cells as lego bricks with changeable colors and height.

See [this basic example](https://eurostat.github.io/gridviz/examples/styles/lego.html) ([code](../examples/styles/lego.html)).

| Property | Type     | Default | Description  |
| ----------- | -------- | ------- | ------------ |
| **.** |  |     |  |

### Pillars style

This style shows the grid cells as 3D pillars, with changeable heigths and colors.

See [this basic example](https://eurostat.github.io/gridviz/examples/styles/pillar.html) ([code](../examples/styles/pillar.html)).

| Property | Type     | Default | Description  |
| ----------- | -------- | ------- | ------------ |
| **.** |  |     |  |

### Text style

This style shows the grid cells as text characters with different colors.

See [this basic example](https://eurostat.github.io/gridviz/examples/styles/text.html) ([code](../examples/styles/text.html)).

| Property | Type     | Default | Description  |
| ----------- | -------- | ------- | ------------ |
| **.** |  |     |  |

### Kernel smoothing style

This style allows applying gaussian kernel smoothing to the grid.

See [this example](https://eurostat.github.io/gridviz/examples/styles/kernelsmoothing.html) ([code](../examples/styles/kernelsmoothing.html)).

| Property | Type     | Default | Description  |
| ----------- | -------- | ------- | ------------ |
| **.** |  |     |  |


## Legends

TODO


## Stretching

TODO - link to observable page


## Foreground information


### Showing labels

TODO

Example based on https://github.com/eurostat/euronym

### Showing boundaries

TODO

Example based on https://github.com/eurostat/Nuts2json


## Tooltip

![gridviz tooltip](img/tooltip.png)

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
(see [online](https://eurostat.github.io/gridviz/examples/tooltip.html), see [code](../examples/tooltip.html))

TODO: change tooltip style


