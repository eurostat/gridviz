<meta name="google-site-verification" content="CF-f4tTHtmjHmKOBZXcJHfeioXOJnGPmnVvxFzKGMlA" />

# gridviz
![npm bundle size](https://img.shields.io/bundlephobia/minzip/gridviz)
![npm](https://img.shields.io/npm/v/gridviz)
![license](https://img.shields.io/badge/license-EUPL-success)

A JavaScript library for visualizing large amounts of gridded data client-side, through the power of threejs and WebGL. 

<div>
  <a href="https://eurostat.github.io/gridviz/examples/europe/color/index.html" target="_blank"><img src="https://raw.githubusercontent.com/eurostat/gridviz/master/docs/screenshots/cropped/2km.png" alt="preview" width="200px" height="200px"/></a>
  <a href="https://eurostat.github.io/gridviz/examples/europe/color/index.html" target="_blank"><img src="https://raw.githubusercontent.com/eurostat/gridviz/master/docs/screenshots/cropped/berlin.png" alt="preview" width="200px" height="200px"/></a>
  <a href="https://eurostat.github.io/gridviz/examples/netherlands/index.html" target="_blank"><img src="https://raw.githubusercontent.com/eurostat/gridviz/master/docs/screenshots/cropped/nl.png" alt="preview" width="200px" height="200px"/></a>
  <a href="https://eurostat.github.io/gridviz/examples/europe/color/index.html" target="_blank"><img src="https://raw.githubusercontent.com/eurostat/gridviz/master/docs/screenshots/cropped/paris.png" alt="preview" width="200px" height="200px"/></a>
</div>

<hr>

## Table of contents
  - [Introduction](#introduction)
  - [Examples](#examples)
  - [Installation](#installation)
    - [Node.js](#nodejs)
    - [standalone](#standalone)
  - [Usage](#usage)
  - [Preparing csv data](#preparing-csv-data)
  - [API reference](#api-reference)
    - [Styling](#Styles)
    - [Defining the data](#adding-data)
    - [Tooltip](#tooltip)
  -  [About](#about)
  -  [Contribute](#support-and-contribution)
  -  [Copyright](#copyright)
  -  [Disclaimer](#disclaimer)


<hr>

## Introduction

Gridviz is a JavaScript library which allows you to visualize large gridded datasets (or any csv file with x/y data) in the browser. Unlike traditional raster-based GIS approaches, this tool utilizes WebGL through [three.js](https://github.com/mrdoob/three.js/) in order to render eveything client-side. 

From a CSV file with x and y columns, gridviz will build a viewer capable of visualizing millions of grid cells on the fly. You can also add GeoJSON files to the viewer using the addGeoJson() method.

For data-driven colouring and sizing, you can use [d3-scale](https://github.com/d3/d3-scale) and [d3-scale-chromatic](https://github.com/d3/d3-scale-chromatic), or simply set your own colours and thresholds.

## Examples

| Link to example                                                                                                                     | Data source                                                                                                                              | Link to code                                                                                 |
| :---------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| [Population grids of Europe](https://eurostat.github.io/gridviz/examples/europe/color/index.html)                                   | [data source](https://ec.europa.eu/eurostat/web/gisco)                                                                                   | [See code](https://github.com/eurostat/gridviz/blob/master/examples/europe/color/index.html) |
| [Netherlands - 100x100m Census data](https://eurostat.github.io/gridviz/examples/netherlands/index.html)                            | [data source](https://www.cbs.nl/nl-nl/dossier/nederland-regionaal/geografische-data/kaart-van-100-meter-bij-100-meter-met-statistieken) | [See code](https://github.com/eurostat/gridviz/blob/master/examples/netherlands/index.html)  |
| [France - 1x1km Population Grid](https://eurostat.github.io/gridviz/examples/france/index.html)                                     | [data source](https://insee.fr/fr/statistiques/4176290?sommaire=4176305)                                                                 | [See code](https://github.com/eurostat/gridviz/blob/master/examples/france/1km/index.html)   |
| [Portugal census data](https://eurostat.github.io/gridviz/examples/portugal/index.html)                                             | [data source](https://www.efgs.info/data/national/)                                                                                      | [See code](https://github.com/eurostat/gridviz/blob/master/examples/portugal/index.html)     |
| [Average internet speed 2020 (ookla open data, 400x400m grid)](https://eurostat.github.io/gridviz/examples/europe/ookla/index.html) | [data source](https://github.com/teamookla/ookla-open-data)                                                                              | [See code](https://github.com/eurostat/gridviz/blob/master/examples/europe/ookla/index.html) |

## Installation

### Node.js

```Shell
npm install gridviz
```

then 
```javascript
gridviz = require("gridviz")
```

### standalone

```javascript
<script src="https://unpkg.com/gridviz/build/gridviz.min.js"></script>
```

## Usage

Create a gridviz App using  ```let viewer = gridviz.App();``` and customise it with the methods described in the [API reference](#api-reference) below.

Most of these methods follow the pattern app.myMethod([value]): If a value is specified, the method sets the parameter value and returns the viewer object itself. If no value is specified, then the method returns the current value of the parameter.

Here's a barebones example that loads a CSV file containing population data for a 5x5 km grid of europe:

```javascript
  let app = gridviz.App()
        .container(containerDiv)
        .geoCenter([4500,3000])
        .zoom(4000)
        .build()

    app.addCSVGrid({
      url: "https://raw.githubusercontent.com/eurostat/gridviz/master/assets/csv/Europe/5km/3035/pop_5km_zeros_removed.csv",
      resolution: 5,
      minZoom: 500,
      maxZoom: 999999999
    });

```

For an explanation of all the available functionality, see the developer docs below.

## Preparing csv data

If you have exported your grid data as points to a csv file, then it is likely that you can reduce the file size significantly by removing redundant data. We have prepared a small node.js package exactly for this, which you will find in the [csv-prep folder](https://github.com/eurostat/gridviz/tree/master/csv-prep) of this repository.

Here is an example of removing unnecessary information:

Turning each row from this...

``` 
OBJECTID;ID;Cnt_ID;Ave_Total_Trav
1;CRS3035RES1000mN1000000E1967000;3;49,121209420200000 
```

into this...

``` 
x,y,time
1967,1000,49 
```

## API reference

Here you will find information on how to use the functions available for configuring a gridviz app. Like D3, gridviz uses a method chaining syntax (as shown in the barebones example above).

First create a viewer with ``let viewer = gridviz.App() ``.

Then configure it using the methods in the table below. The methods follow the pattern: ``App.method([value])``.

Once you have configured the viewer, you can build it using `` App.build() ``.

### Contents
- [Position](#position)
- [Styling](#styling)
- [Adding data](#adding-data)
- [Styles](#styles)
- [Tooltip](#tooltip)


### Position

The following methods can be used to set the position of the viewer's [camera](https://threejs.org/docs/#api/en/cameras/PerspectiveCamera).

| Method                          | Type   | Default              | Description                                                     |
| ------------------------------- | ------ | -------------------- | --------------------------------------------------------------- |
| *viewer*.**geoCenter**([value]) | Array  | null                 | [x,y] coordinates with which the viewer will center the camera. |
| *viewer*.**zoom**([value])      | Number | uses grid resolution | The Z position of the viewer's camera.                          |


### Decoration

These are the methods available for styling the app.

| Method                                | Type        | Default            | Description                                                                                       |
| ------------------------------------- | ----------- | ------------------ | ------------------------------------------------------------------------------------------------- |
| *viewer*.**container**([value])       | HTMLElement | document.body      | The DOM element passed to the THREE.js renderer that will act as the viewer's container.          |
| *viewer*.**height**([value])          | int         | window.innerHeight | The height value used for the threejs scene, camera, zoom, labels.                                |
| *viewer*.**width**([value])           | int         | window.innerWidth  | The width value used for the threejs scene, camera, zoom, labels.                                 |
| *viewer*.**backgroundColor**([value]) | String      | "#b7b7b7"          | Viewer background colour.                                                                         |
| *viewer*.**highlightColor**([value])  | String      | "#37f2d6"          | Colour used when highlighting a cell.                                                             |
| *viewer*.**loadingIcon**([value])     | String      | "ring"             | CSS animation used for the loading icon, options are: ripple \| ring \| ellipsis \|roller.        |
| *viewer*.**homeButton**([value])      | Boolean     | false              | Whether or not to show a 'home' button which, when clicked will show the initial viewer position. |
| *viewer*.**zoomButtons**([value])     | Boolean     | false              | Whether or not to show 'zoom' buttons which, when clicked will zoom in or out.                    |
| *viewer*.**title**([value])           | String      | null               | The viewer's title.                                                                               |
| *viewer*.**subtitle**([value])        | String      | null               | The viewer's subtitle.                                                                            |
| *viewer*.**cellCount**([value])       | Boolean     | false              | Shows a count below the title of the total number of cells displayed in the app.                  |
| *viewer*.**sourceHTML**([value])      | HTML        | null               | Defines the innerHTML of the link to the data source shown in the bottom-right corner.            |


<br>


### Adding data

These methods allow you to define the data that is added to the viewer and how it is presented.


| Method                             | Type                                                                                                                               | Default | Description                                                                                                                                    |
| ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| *viewer*.**addCSVGrid**([value])   | Object {url:string, resolution: Number, minZoom: Number, maxZoom: Number, styles?: Array[\<Style\>](#styles), preprocess: Function | null    | Object containing the configuration for the CSV gri.                                                                                           |
| *viewer*.**addTiledGrid**([value]) | Object {url:string, minZoom: Number, maxZoom: Number, styles?: Array[\<Style\>](#styles), preprocess: Function                     | null    | Object containing the configuration for the Tiled grid.                                                                                        |
| *viewer*.**addGeoJson**([value])   | String                                                                                                                             | null    | Loads a geojson file from the specified URL and adds it's geometries to the app. Currently only accepts "polygon" or "multipolygon" geometries |


#### NUTS

| Method                                   | Type    | Default | Description                                                                                               |
| ---------------------------------------- | ------- | ------- | --------------------------------------------------------------------------------------------------------- |
| *viewer*.**nuts**([value])               | Boolean | false   | Show NUTS boundaries using [nuts2json](https://github.com/eurostat/nuts2json)                             |
| *viewer*.**nutsLevel**([value])          | int     | 0       | Nuts2json NUTS level                                                                                      |
| *viewer*.**nutsSimplification**([value]) | String  | "20M"   | The level of generalisation applied to the Nuts2json  geometries                                          |
| *viewer*.**nutsCountry**([value])        | String  | null    | Filters nuts2json geometries by country code. Used in order to only load boundaries for a single country. |


#### Placenames

| Method                                     | Type    | Default | Description                                                                                                                                                                       |
| ------------------------------------------ | ------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| *viewer*.**showPlacenames**([value])       | Boolean | false   | Adds placenames to the app. Placename-scale thresholds currently defined by the user.                                                                                             |
| *viewer*.**placenamesCountry**([value])    | String  | null    | Filters placenames by country code                                                                                                                                                |
| *viewer*.**placenamesThresholds**([value]) | Object  | null    | Defines population query parameter at certain scale thresholds e.g. {"10000":500} will show names of places with populations of over 5000 inhabitants at zoom levels up to 10 000 |

#### Projection

| Method                             | Type | Default | Description                                                                                                                                                                                                                        |
| ---------------------------------- | ---- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| *viewer*.**EPSG**([value])         | int  | 3035    | EPSG code of the projection to use for the placename labels and NUTS boundaries. (NUTS and Placenames only available in 3035, 3857, 4258 or 4326)                                                                                  |
| *viewer*.**zerosRemoved**([value]) | int  | null    | To reduce file size, zeros can be removed from the cell's x and y coordinates. Just let gridviz know how many have been removed here! That way it can add them back on for placename requests and when adding Nuts2Json geometries |

<br>


### Styles

Gridviz offers various styles that can be applied to the grid cells:

  - [colorSizeShapeStyle](#colorSizeShapeStyle)
  - [JoyPlotStyle](#JoyPlotStyle)

These styles can be initialised individually using a configuration object and applied to different layers. 
To help define interpolation functions for these styles, d3's [scale-chromatic](https://github.com/d3/d3-scale-chromatic) can be accessed via ```gridviz.color()```.

For example: 

```javascript
    //define the style
    const style = new gridviz.ColorSizeShapeStyle({
      "colorFunction": cell => gridviz.color().interpolateOrRd(Math.pow(cell["2018"], 0.6) / 100)
      });

    // add it to the grid definition object
    app.addCSVGrid({
      url: "https://raw.githubusercontent.com/eurostat/gridviz/master/assets/csv/Europe/5km/3035/pop_5km_zeros_removed.csv",
      styles: [style]
      resolution: 5,
      minZoom: 500,
      maxZoom: 999999999
    });
```



#### colorSizeShapeStyle

colorSizeShapeStyle allows you to define the **color**, **size** and **shape** of each grid cell individually. 

In the following example, we define an interpolation function that will determine the colour of the grid cell using its "Population" attribute, and set each grid cell size to 1 and its shape to a circle.

```javascript
  const style = new gridviz.ColorSizeShapeStyle({
      "colorFunction": c => gridviz.color().interpolateOrRd(Math.pow(c["Population"], 0.6) / 100),
      "sizeFunction":  c => 1,
      "shapeFunction": c => "circle",
      "opacity": 1,
      "strokeWidth": 0.2,
      "strokeColor": 'grey'
    })

```
The following properties can be defined in the configuration object passed to new gridviz.ColorSizeShapeStyle(). All are optional.

| Property                   | Type     | Default | Description                                                                                                                                                                                    |
| -------------------------- | -------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **colorFunction**([value]) | Function | null    | Function used to define the colour of each cell. Function is executed on each cell at draw time. Can return any value accepted by threejs [Color](https://threejs.org/docs/#api/en/math/Color) |
| **sizeFunction**([value])  | Function | null    | Function used to define the size of each cell. Function is executed on each cell at draw time. Can return a number.                                                                            |
| **shapeFunction**([value]) | Function | null    | Function used to define the shape of each cell. Function is executed on each cell at draw time. Currently can only return "square" or "circle"                                                 |
| **opacity**([value])       | Number   | 1       | Opacity of all grid cells. Accepts values between 0 - 1.                                                                                                                                       |
| **strokeWidth**([value])   | Number   | 0       | The size of the border stroke. Accepts values between 0 - 1.                                                                                                                                   |
| **strokeColor**([value])   | String   | 'grey'  | The color of the cell border stroke.                                                                                                                                                           |


#### JoyPlotStyle

JoyPlotStyle allows you to visualize a grid in the form of a 'joyplot' - named after Joy Division's "Unknown Pleasures" album cover.

```javascript
    const style = new gridviz.JoyPlotStyle({
        "heightFunction": c => 30 * Math.sqrt(c["2011"]),
        "lineColor": "black"
    })
```
The following properties can be defined in the configuration object passed to new gridviz.JoyPlotStyle().

| Property                    | Type     | Default | Description                                                                                                                               |
| --------------------------- | -------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| **heightFunction**([value]) | Function | null    | Function used to define the height of the line at the location of its corresponding cell. Function is executed on each cell at draw time. |
| **lineColor**([value])      | String   | 'grey'  | The color of the lines.                                                                                                                   |


<br>


### Tooltip

The possible configurations for the viewer's tooltip.

Default:
```javascript
{
    eventType: "mouseover", // click vs mouseover
    showCoordinates: true,
    xOffset: 15,
    yOffset: 15
}
```


| Method / Object                         | Type    | Default                                 | Description                                                                |
| --------------------------------------- | ------- | --------------------------------------- | -------------------------------------------------------------------------- |
| *viewer*.**tooltip**([*tooltipConfig*]) | Object  | See tooltipConfig default values below. |
| *tooltipConfig*.**eventType**           | String  | "mouseover"                             | The type of mouse event that will trigger the tooltip. Mouseover or click. |
| *tooltipConfig*.**showCoordinates**     | boolean | true                                    | Whether to show the cell's x and y values                                  |
| *tooltipConfig*.**xOffset**             | int     | 15                                      | X offset in pixels from the mouse position                                 |
| *legendConfig*.**yOffset**              | int     | 15                                      | Y offset in pixels from the mouse position                                 |

<br>


## About

|                |                                                                                                                                                                                       |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| *contributors* | [<img src="https://github.com/JoeWDavies.png" height="40" />](https://github.com/JoeWDavies) [<img src="https://github.com/jgaffuri.png" height="40" />](https://github.com/jgaffuri) |
| *version*      | See [npm](https://www.npmjs.com/package/gridviz?activeTab=versions)                                                                                                                   |
| *status*       | Since 2020                                                                                                                                                                            |
| *license*      | [EUPL 1.2](https://github.com/eurostat/Nuts2json/blob/master/LICENSE)                                                                                                                 |


## Support and contribution

Feel free to [ask support](https://github.com/eurostat/eurostat.js/issues/new), fork the project or simply star it (it's always a pleasure).


## Copyright

The [Eurostat NUTS dataset](http://ec.europa.eu/eurostat/web/nuts/overview) is copyrighted. There are [specific provisions](https://ec.europa.eu/eurostat/web/gisco/geodata/reference-data/administrative-units-statistical-units) for the usage of this dataset which must be respected. The usage of these data is subject to their acceptance. See the [Eurostat-GISCO website](http://ec.europa.eu/eurostat/web/gisco/geodata/reference-data/administrative-units-statistical-units/nuts) for more information.


## Disclaimer
The designations employed and the presentation of material on these maps do not imply the expression of any opinion whatsoever on the part of the European Union concerning the legal status of any country, territory, city or area or of its authorities, or concerning the delimitation of its frontiers or boundaries. Kosovo*: This designation is without prejudice to positions on status, and is in line with UNSCR 1244/1999 and the ICJ Opinion on the Kosovo declaration of independence. Palestine*: This designation shall not be construed as recognition of a State of Palestine and is without prejudice to the individual positions of the Member States on this issue.

