<meta name="google-site-verification" content="CF-f4tTHtmjHmKOBZXcJHfeioXOJnGPmnVvxFzKGMlA" />

# gridviz
![npm bundle size](https://img.shields.io/bundlephobia/minzip/gridviz)
![npm](https://img.shields.io/npm/v/gridviz)
![license](https://img.shields.io/badge/license-EUPL-success)

A JavaScript library for visualizing large amounts of gridded data client-side, through the power of WebGL. 

<div>
  <!-- <img src="https://raw.githubusercontent.com/eurostat/gridviz/master/assets/images/previews/preview.gif" alt="preview" width="98%" height="10%"/> -->
  <a href="https://eurostat.github.io/gridviz/examples/europe/2km/index.html" target="_blank"><img src="https://raw.githubusercontent.com/eurostat/gridviz/master/docs/screenshots/cropped/2km.png" alt="preview" width="200px" height="200px"/></a>
  <a href="https://eurostat.github.io/gridviz/examples/europe/2km/index.html" target="_blank"><img src="https://raw.githubusercontent.com/eurostat/gridviz/master/docs/screenshots/cropped/berlin.png" alt="preview" width="200px" height="200px"/></a>
  <a href="https://eurostat.github.io/gridviz/examples/netherlands/index.html" target="_blank"><img src="https://raw.githubusercontent.com/eurostat/gridviz/master/docs/screenshots/cropped/nl.png" alt="preview" width="200px" height="200px"/></a>
  <a href="https://eurostat.github.io/gridviz/examples/europe/1km/index.html" target="_blank"><img src="https://raw.githubusercontent.com/eurostat/gridviz/master/docs/screenshots/cropped/paris.png" alt="preview" width="200px" height="200px"/></a>
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
    - [Styling](#styling)
    - [Defining the data](#defining-the-data)
    - [Cell colouring](#cell-colouring)
    - [Cell sizing](#cell-sizing)
    - [Legend](#legend)
    - [Tooltip](#tooltip)
  -  [About](#about)
  -  [Contribute](#support-and-contribution)
  -  [Copyright](#copyright)
  -  [Disclaimer](#disclaimer)


<hr>

## Introduction

Gridviz is a JavaScript library which allows you to visualize large gridded datasets (or any csv file with x/y data) in the browser. Unlike traditional raster-based GIS approaches, this tool utilizes WebGL through [three.js](https://github.com/mrdoob/three.js/) in order to render eveything client-side. 

From a CSV file with x and y columns, gridviz will build a viewer capable of visualizing millions of grid cells on the fly. 

For data-driven colouring and sizing, you can use [d3-scale](https://github.com/d3/d3-scale) and [d3-scale-chromatic](https://github.com/d3/d3-scale-chromatic), or simply set your own colours and thresholds.

## Examples

| Link to example                                                                                                                     | Data source                                                                                                                              | Link to code                                                                                         |
| :---------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| [Europe - 5x5km Population Grid](https://eurostat.github.io/gridviz/examples/europe/5km/index.html)                                 | [data source](https://ec.europa.eu/eurostat/web/gisco)                                                                                   | [See code](https://github.com/eurostat/gridviz/blob/master/examples/europe/5km/index.html)           |
| [Europe - 2x2km Population Grid](https://eurostat.github.io/gridviz/examples/europe/2km/index.html)                                 | [data source](https://ec.europa.eu/eurostat/web/gisco)                                                                                   | [See code](https://github.com/eurostat/gridviz/blob/master/examples/europe/2km/index.html)           |
| [Europe - 1x1km Population Grid](https://eurostat.github.io/gridviz/examples/europe/1km/index.html)                                 | [data source](https://ec.europa.eu/eurostat/web/gisco)                                                                                   | [See code](https://github.com/eurostat/gridviz/blob/master/examples/europe/1km/index.html)           |
| [Netherlands - 100x100m Census data](https://eurostat.github.io/gridviz/examples/netherlands/index.html)                            | [data source](https://www.cbs.nl/nl-nl/dossier/nederland-regionaal/geografische-data/kaart-van-100-meter-bij-100-meter-met-statistieken) | [See code](https://github.com/eurostat/gridviz/blob/master/examples/netherlands/index.html)          |
| [France - 1x1km Population Grid](https://eurostat.github.io/gridviz/examples/france/index.html)                                     | [data source](https://insee.fr/fr/statistiques/4176290?sommaire=4176305)                                                                 | [See code](https://github.com/eurostat/gridviz/blob/master/examples/france/1km/index.html)           |
| [SE France - Building area by type per km²](https://eurostat.github.io/gridviz/examples/france/building_area/index.html)            | [data source](https://insee.fr/fr/statistiques/4176290?sommaire=4176305)                                                                 | [See code](https://github.com/eurostat/gridviz/blob/master/examples/france/building_area/index.html) |
| [France - Inhabitants over 80 years of age per 1km²](https://eurostat.github.io/gridviz/examples/france/population-over-80.html)    | [data source](https://insee.fr/fr/statistiques/4176290?sommaire=4176305)                                                                 | [See code](https://github.com/eurostat/gridviz/blob/master/examples/france/population-over-80.html)  |
| [Portugal census data](https://eurostat.github.io/gridviz/examples/portugal/index.html)                                             | [data source](https://www.efgs.info/data/national/)                                                                                      | [See code](https://github.com/eurostat/gridviz/blob/master/examples/portugal/index.html)             |
| [Average internet speed 2020 (ookla open data, 400x400m grid)](https://eurostat.github.io/gridviz/examples/europe/ookla/index.html) | [data source](https://github.com/teamookla/ookla-open-data)                                                                              | [See code](https://github.com/eurostat/gridviz/blob/master/examples/europe/ookla/index.html)         |

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

Create a viewer using  ```let viewer = gridviz.viewer();``` and customise it with the methods described in the [API reference](#api-reference) below.

Most of these methods follow the pattern viewer.myMethod([value]): If a value is specified, the method sets the parameter value and returns the viewer object itself. If no value is specified, then the method returns the current value of the parameter.

Here's a barebones example that loads a CSV containing population data for a 5x5 km grid of europe:

```javascript
    let viz = gridviz.viewer()
        .container(containerDiv)
        .gridData(
            {
                url: "https://raw.githubusercontent.com/eurostat/gridviz/master/assets/csv/Europe/5km/3035/pop_5km_zeros_removed.csv",
                cellSize: 5
            }
        )
        .colorField("population")  // The csv column that will determine cell colour
        .build()
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

Here you will find information on how to use the functions available for configuring a gridviz viewer. Like D3, gridviz uses a method chaining syntax (as shown in the barebones example above).

First create a viewer with ``let viewer = gridviz.viewer() ``.

Then configure it using the methods in the table below. The methods follow the pattern: ``viewer.method([value])``.

Once you have configured the viewer, you can build it using `` viewer.build() ``.

### Contents
- [Styling](#styling)
- [Defining the data](#defining-the-data)
- [Cell colouring](#cell-colouring)
- [Cell sizing](#cell-sizing)
- [Legend](#legend)
- [Tooltip](#tooltip)


### Styling

These are the methods available for styling the viewer.

| Method                                | Type        | Default            | Description                                                                                      |
| ------------------------------------- | ----------- | ------------------ | ------------------------------------------------------------------------------------------------ |
| *viewer*.**container**([value])       | HTMLElement | document.body      | The DOM element passed to the THREE.js renderer.                                                 |
| *viewer*.**height**([value])          | int         | window.innerHeight | The height value used for the threejs scene, camera, zoom, labels.                               |
| *viewer*.**width**([value])           | int         | window.innerWidth  | The width value used for the threejs scene, camera, zoom, labels.                                |
| *viewer*.**backgroundColor**([value]) | String      | "#b7b7b7"          | Viewer background colour                                                                         |
| *viewer*.**lineColor**([value])       | String      | "#ffffff"          | Colour used for line geometries                                                                  |
| *viewer*.**highlightColor**([value])  | String      | "#37f2d6"          | Colour used when highlighting a cell                                                             |
| *viewer*.**loadingIcon**([value])     | String      | "ring"             | CSS animation used for the loading icon, other options are: ripple \| ring \| ellipsis \|roller. |
| *viewer*.**homeButton**([value])     | Boolean      | false             | Whether or not to show a 'home' button which, when clicked will show the entire grid. |
| *viewer*.**zoomButtons**([value])     | Boolean      | false             | Whether or not to show 'zoom' buttons which, when clicked will zoom in or out. |
| *viewer*.**title**([value])           | String      | null               | The viewer's title                                                                               |
| *viewer*.**subtitle**([value])        | String      | null               | The viewer's subtitle                                                                            |
| *viewer*.**cellCount**([value])       | Boolean     | false              | Shows a count below the title of the total number of cells displayed in the viewer.              |
| *viewer*.**sourceHTML**([value])      | HTML        | null               | Defines the innerHTML of the link to the data source shown in the bottom-right corner            | 


<br>


### Defining the data

These methods allow you to define the data that is added to the viewer and how it is presented.

| Method                                     | Type                               | Default                | Description                                                                                                                                                                 |
| ------------------------------------------ | ---------------------------------- | ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| *viewer*.**gridData**([value])             | Object {url:string, cellSize: int} | null                   | Object containing the URL of the grid's CSV file and its cellSize (this will determine the point size in three.js). A 1 km² grid in EPSG:3035 will have a cellSize of 1000. |
| *viewer*.**center**([value])               | Array                              | null                   | [x,y] coordinates with which the viewer will center the camera.                                                                                                             |
| *viewer*.**zoom**([value])                 | Number                             | (cellSize * 50000) / 2 | The initial Z position of the camera.                                                                                                                                       |
| *viewer*.**addGeoJson**([value])           | String                             | null                   | Loads a geojson file from the specified URL and adds it's geometries to the viewer. Currently only accepts "polygon" or "multipolygon" geometries                           |
| *viewer*.**nuts**([value])                 | Boolean                            | false                  | Show NUTS boundaries using [nuts2json](https://github.com/eurostat/nuts2json)                                                                                               |
| *viewer*.**EPSG**([value])                 | int                                | 3035                   | EPSG code of the projection to use for the geometries, placename labels and NUTS boundaries. (NUTS and Placenames only available in 3035, 3857, 4258 or 4326)               |
| *viewer*.**nutsLevel**([value])            | int                                | 0                      | Nuts2json NUTS level                                                                                                                                                        |
| *viewer*.**nutsSimplification**([value])   | String                             | "20M"                  | The level of generalisation applied to the Nuts2json  geometries                                                                                                            |
| *viewer*.**nutsCountry**([value])          | String                             | null                   | Filters nuts2json geometries by country code. Used in order to only load boundaries for a single country.                                                                   |  |
| *viewer*.**showPlacenames**([value])       | Boolean                            | false                  | Adds placenames to the viewer. Placename-scale thresholds currently defined by the user.                                                                                    |
| *viewer*.**placenamesCountry**([value])    | String                             | null                   | Filters placenames by country code                                                                                                                                          |
| *viewer*.**placenamesThresholds**([value]) | Object                             | null                   | Defines population query parameter at certain scale thresholds e.g. {"100000":500} will show placenames with populations of over 5000 at scales up to 100 000               |



<br>

### Cell colouring

The methods that can be used to determine the colour of the grid cells.

| Method                                    | Type     | Default                    | Description                                                                                                                                                                                |
| ----------------------------------------- | -------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| *viewer*.**colorField**([value])          | String   | null                       | CSV field used to determine cell colour                                                                                                                                                    |
| *viewer*.**colorScaleName**([value])      | String   | "scaleSequential"          | The name of d3.scale function name to use for scaling cell colours. If you would like to define your own scale you can use colorScaleFunction()                                            |
| *viewer*.**colorScaleMidpoint**([value])  | Number   | 0                          | The midpoint value when using a diverging scale (when viewer.colorScaleName is set to 'scaleDiverging')                                                                                    |
| *viewer*.**colorScaleFunction**([value])  | Function | d3.[viewer.colorScaleName] | Define a scale function to be used for color scaling. If unspecified it will build a d3 scale using viewer.colorScaleName and the d3.extent() of the values loaded from viewer.colorField. |
| *viewer*.**reverseColorScheme**([value])  | Boolean  | false                      | Flips the current color scheme. Applies .reverse() method to the 'domain' array of the scale.                                                                                              |
| *viewer*.**colorSchemeName**([value])     | String   | "interpolateTurbo"         | Name of d3.scaleChromatic function to use for scaling cell colours                                                                                                                         |
| *viewer*.**colors**([value])              | Array    | null                       | Array of hex strings to be used in combination with viewer.thresholds for colouring.                                                                                                       |
| *viewer*.**thresholds**([value])          | Array    | null                       | Array of threshold values that are applied to the colour scaling function.                                                                                                                 |
| *viewer*.**colorFieldSelector**([value])  | boolean  | false                      | Generates a simple HTML select input showing the available fields in the csv file that can be used to drive cell colour.                                                                   |
| *viewer*.**colorSchemeSelector**([value]) | boolean  | false                      | Generates an HTML Select element for the different D3 Scale-Chromatic functions                                                                                                            |

<br>

 ### Cell sizing

 The methods that can be used to determine the size of the grid cells.

| Method                                  | Type     | Default                   | Description                                                                                                                                                                                                                                                           |
| --------------------------------------- | -------- | ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| *viewer*.**sizeField**([value])         | String   | null                      | CSV field used to determine cell size                                                                                                                                                                                                                                 |
| *viewer*.**sizeScaleName**([value])     | String   | "scaleSqrt                | Name of d3.scale function name to use for scaling cell sizes                                                                                                                                                                                                          |
| *viewer*.**sizeScaleFunction**([value]) | Function | d3.[viewer.sizeScaleName] | Define a scale function to be used for scaling cell sizes. If unspecified it will build a d3 scale using viewer.colorScaleName, the d3.extent() of the values loaded from viewer.sizeField and a range of [viewer *viewer*.**resolution / 3, viewer.resolution / 1.5] |
| *viewer*.**sizeFieldSelector**([value]) | boolean  | false                     | Generates a simple HTML select input showing the available fields in the csv file that can be used to drive cell size.                                                                                                                                                |


<br>

### Legend

The possible configurations for the legend of the grid data.

Default:
```javascript
{
    type: "continuous", //cells vs continuous
    width: 300,
    height: null,
    orientation: "horizontal",
    title: null, //if null, will default to the current colorField
    titleWidth: 50,
    format: ".0s",
    cells: 5,
    shapeWidth: 30
}
```

| Method     / Object                   | Type    | Default                                 | Description                                                                                                                                                                                                                                        |
| ------------------------------------- | ------- | --------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| showLegend([value])                   | boolean | true                                    | Build d3 colour legend.                                                                                                                                                                                                                            |
| *viewer*.**legend**([*legendConfig*]) | Object  | See legendConfig default values below.  |
| **legendConfig**.type                 | String  | "continuous"                            | Type of legend to build. Accepted values are "cells" or "continuous". Cells uses [d3-svg-legend](https://d3-legend.susielu.com/) and continuous uses an implementation of Mike Bostock's [color legend](https://observablehq.com/@d3/color-legend) |
| *legendConfig*.**width**                | int     | 140                                     | width of the legend in pixels                                                                                                                                                                                                                      |
| *legendConfig*.**height**               | int     | 320 for "cells" and 50 for "continuous" | height of the legend in pixels                                                                                                                                                                                                                     |
| *legendConfig*.**orientation**          | int     | For cells legends only                  | "vertical" or "horizontal"                                                                                                                                                                                                                         |
| *legendConfig*.**title**                | String  | "Legend"                                | Title text of the legend.                                                                                                                                                                                                                          |
| *legendConfig*.**titleWidth**           | int     | 50                                      | Width of the title text of the legend.                                                                                                                                                                                                             |
| *legendConfig*.**format**               | string  | ".0s"                                   | d3.format string used to format the legend values                                                                                                                                                                                                  |
| *legendConfig*.**cells**                | int     | 5                                       | Number of cells (for cell legends only)                                                                                                                                                                                                            |
| *legendConfig*.**shapeWidth**           | int     | 30                                      | width in pixels of legend cell (for cell legends only)                                                                                                                                                                                             |

<br>

### Tooltip

The possible configurations for the viewer's tooltip.

Default:
```javascript
{
    eventType: "click", // click vs mouseover
    showLAU: true,
    showEPSG: true,
    showNUTS: true,
    showCoordinates: true,
    xOffset: 15,
    yOffset: 15
}
```


| Method / Object                         | Type    | Default                                 | Description                                                                                                                                                                                       |
| --------------------------------------- | ------- | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| *viewer*.**tooltip**([*tooltipConfig*]) | Object  | See tooltipConfig default values below. |
| *tooltipConfig*.**eventType**             | String  | "click"                                 | The mouse event that will trigger the tooltip ("click" or "mousemove" being the most common, depending on the dataset). You might want to set showLAU and showNUTS to false when using mousemove. |
| *tooltipConfig*.**showLAU**               | boolean | true                                    | Whether or not to show the LAU code in the tooltip (only available for EPSG 4326, 4258 or 3035)                                                                                                   |
| *tooltipConfig*.**showNUTS**              | boolean | true                                    | Whether or not to show the LAU code in the tooltip (only available for EPSG 4326, 4258 or 3035)                                                                                                   |
| *tooltipConfig*.**showCoordinates**       | boolean | true                                    | Whether or not to show the LAU code in the tooltip (only available for EPSG 4326, 4258 or 3035)                                                                                                   |
| *tooltipConfig*.**showEPSG**              | boolean | true                                    | Whether or not to show the LAU code in the tooltip (only available for EPSG 4326, 4258 or 3035)                                                                                                   |
| *tooltipConfig*.**xOffset**               | int     | 15                                      | X offset in pixels from the mouse position                                                                                                                                                        |
| *legendConfig*.**yOffset**                | int     | 15                                      | Y offset in pixels from the mouse position                                                                                                                                                        |

<br>


## About

|   |    |
| ------ | -------- |
| *contributors* | [<img src="https://github.com/JoeWDavies.png" height="40" />](https://github.com/JoeWDavies) [<img src="https://github.com/jgaffuri.png" height="40" />](https://github.com/jgaffuri)  |
| *version* | See [npm](https://www.npmjs.com/package/gridviz?activeTab=versions) |
| *status* | Since 2020  |
| *license* | [EUPL 1.2](https://github.com/eurostat/Nuts2json/blob/master/LICENSE)    |


## Support and contribution

Feel free to [ask support](https://github.com/eurostat/eurostat.js/issues/new), fork the project or simply star it (it's always a pleasure).


## Copyright

The [Eurostat NUTS dataset](http://ec.europa.eu/eurostat/web/nuts/overview) is copyrighted. There are [specific provisions](https://ec.europa.eu/eurostat/web/gisco/geodata/reference-data/administrative-units-statistical-units) for the usage of this dataset which must be respected. The usage of these data is subject to their acceptance. See the [Eurostat-GISCO website](http://ec.europa.eu/eurostat/web/gisco/geodata/reference-data/administrative-units-statistical-units/nuts) for more information.


## Disclaimer
The designations employed and the presentation of material on these maps do not imply the expression of any opinion whatsoever on the part of the European Union concerning the legal status of any country, territory, city or area or of its authorities, or concerning the delimitation of its frontiers or boundaries. Kosovo*: This designation is without prejudice to positions on status, and is in line with UNSCR 1244/1999 and the ICJ Opinion on the Kosovo declaration of independence. Palestine*: This designation shall not be construed as recognition of a State of Palestine and is without prejudice to the individual positions of the Member States on this issue.

