<meta name="google-site-verification" content="CF-f4tTHtmjHmKOBZXcJHfeioXOJnGPmnVvxFzKGMlA" />

# gridviz
![npm bundle size](https://img.shields.io/bundlephobia/minzip/gridviz)
![npm](https://img.shields.io/npm/v/gridviz)
![license](https://img.shields.io/badge/license-EUPL-success)

A JavaScript Library built for visualizing gridded statistics from CSV files. 

<div>
  <img src="assets/images/previews/preview6.png" alt="preview" width="49.7%" height="210px"/>
<img src="assets/images/previews/preview5.png" alt="preview" width="49.7%" height="210px"/>
<img src="assets/images/previews/preview2.png" alt="preview" width="49.7%" height="210px"/>
<img src="assets/images/previews/preview4.png" alt="preview" width="49.7%" height="210px"/>

</div>

## Examples

[Europe - 5km² Population Grid](https://eurostat.github.io/gridviz/examples/europe/5km/index.html) | [Data Source](https://ec.europa.eu/eurostat/web/gisco) 

[Europe - 2km² Population Grid](https://eurostat.github.io/gridviz/examples/europe/2km/index.html) | [Data Source](https://ec.europa.eu/eurostat/web/gisco)  

[Europe - 1km² Population Grid](https://eurostat.github.io/gridviz/examples/europe/1km/index.html) | [Data Source](https://ec.europa.eu/eurostat/web/gisco)  

[Netherlands - Inhabitants per 100m²](https://eurostat.github.io/gridviz/examples/netherlands/index.html) | [Data Source](https://www.cbs.nl/nl-nl/dossier/nederland-regionaal/geografische-data/kaart-van-100-meter-bij-100-meter-met-statistieken)  

[France - 1km² Population Grid](https://eurostat.github.io/gridviz/examples/france/index.html) | [Data Source](https://insee.fr/fr/statistiques/4176290?sommaire=4176305)  

[France - Inhabitants over 80 years of age per 1km²](https://eurostat.github.io/gridviz/examples/france/population-over-80.html) | [Data Source](https://insee.fr/fr/statistiques/4176290?sommaire=4176305)   

## Description

Gridviz is a JavaScript library which allows you to visualize large gridded datasets. Unlike traditional raster-based approaches, this tool utilizes WebGL through Three.js in order to render eveything client-side.

From a CSV file with x and y columns, gridviz will build a Three.js viewer capable of visualizing millions of grid cells on the fly.

For colouring, you can use any of D3's scale chromatic colour schemes, or define them yourself by passing an array to the colors method along with the threshold values they correspond with.

## Documentation

For documentation see [docs](https://eurostat.github.io/gridviz/docs/)


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

Create a viewer using  ```let viewer = gridviz.viewer();``` and customise it with the methods below.

Most of these methods follow the pattern viewer.myMethod([value]): If a value is specified, the method sets the parameter value and returns the viewer object itself. If no value is specified, then the method returns the current value of the parameter.

| Method                               | Type                               | Default                                                                                                                                       | Description                                                                                                                                                                                                                                          |
| ------------------------------------ | ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| viewer.container([value])            | HTMLElement                        | document.body                                                                                                                                 | The DOM element passed to the THREE.js renderer.                                                                                                                                                                                                     |
| viewer.height([value])               | int                                | window.innerHeight                                                                                                                            | The height value used for the threejs scene, camera, zoom, labels.                                                                                                                                                                                   |
| viewer.width([value])                | int                                | window.innerWidth                                                                                                                             | The width value used for the threejs scene, camera, zoom, labels.                                                                                                                                                                                    |
| viewer.backgroundColor([value])      | String                             | "#b7b7b7"                                                                                                                                     |                                                                                                                                                                                                                                                      |
| viewer.borderColor([value])          | String                             | "#ffffff"                                                                                                                                     |                                                                                                                                                                                                                                                      |
| viewer.highlightColor([value])       | String                             | "#37f2d6"                                                                                                                                     | Hex string which is later converted to THREE.Line2 color (hexidecimal).                                                                                                                                                                              |
| viewer.loadingIcon([value])          | String                             | "ring"                                                                                                                                        | CSS animation used for the loading icon, other options are: ripple \| ring \| ellipsis \|roller.                                                                                                                                                     |
| viewer.title([value])                | String                             | null                                                                                                                                          | Appends a title to the viewer                                                                                                                                                                                                                        |
| viewer.title([value])                | String                             | null                                                                                                                                          | Appends a subtitle to the viewer                                                                                                                                                                                                                     |
| viewer.cellCount([value])            | Boolean                            | false                                                                                                                                         | Shows a count below the title of the total number of cells displayed in the viewer.                                                                                                                                                                  |
| viewer.sourceHTML([value])           | HTML                               | null                                                                                                                                          | Defines the innerHTML of the link to the data source shown in the bottom-right corner                                                                                                                                                                |
| viewer.gridData([value])             | Object {url:string, cellSize: int} | null                                                                                                                                          | Object containing the URL of the CSV file and its cellSize (this will determine the point size in three.js). A 1 km² grid will have a cellSize of 1000.                                                                                              |
| viewer.center([value])               | Array                              | null                                                                                                                                          | [x,y] coordinates with which the viewer will center the camera.                                                                                                                                                                                      |
| viewer.nuts2json([value])            | Boolean                            | false                                                                                                                                         | Show nuts2json borders of Europe's NUTS regions.                                                                                                                                                                                                     |
| viewer.nuts2jsonEPSG([value])        | int                                | 3035                                                                                                                                          | EPSG code of the projection of the nuts2json geometries to request. (available in 3035, 3857, 4258 or 4326)                                                                                                                                          |
| viewer.nutsLevel([value])            | int                                | 0                                                                                                                                             | Nuts2json NUTS level                                                                                                                                                                                                                                 |
| viewer.nutsSimplification([value])   | String                             | "20M"                                                                                                                                         | Nuts2json simplification level                                                                                                                                                                                                                       |
| viewer.nuts2jsonCountry([value])     | String                             | null                                                                                                                                          | Filters nuts2json geometries by country code. Used in order to only load a single country boundary.                                                                                                                                                  |  |
| viewer.showPlacenames([value])       | Boolean                            | false                                                                                                                                         | Adds placenames to the viewer. Placename-scale thresholds currently defined by the user.                                                                                                                                                             |
| viewer.placenamesCountry([value])    | String                             | null                                                                                                                                          | Filters placenames by country code                                                                                                                                                                                                                   |
| viewer.placenamesThresholds([value]) | Object                             | null                                                                                                                                          | Defines population query parameter at certain scale thresholds e.g. {"100000":500} will show placenames with populations of over 5000 at scales up to 100 000                                                                                        |
| viewer.colorField([value])           | String                             | null                                                                                                                                          | CSV field used to determine cell colour                                                                                                                                                                                                              |
| viewer.colorField([value])           | String                             | null                                                                                                                                          | CSV field used to determine cell size                                                                                                                                                                                                                |
| viewer.colors([value])               | Array                              | null                                                                                                                                          | Array of hex strings to be used in combination with viewer.thresholdValues for colouring.                                                                                                                                                            |
| viewer.thresholdValues([value])      | Array                              | null                                                                                                                                          | Array of threshold values that are applied to the colour scaling function.                                                                                                                                                                           |
| viewer.colorSchemeName([value])      | String                             | "interpolateTurbo"                                                                                                                            | Name of d3.scaleChromatic function to use for scaling cell colours                                                                                                                                                                                   |
| viewer.colorScaleName([value])       | String                             | "scaleSequential"                                                                                                                             | Name of d3.scale function name to use for scaling cell colours                                                                                                                                                                                       |
| viewer.sizeScaleName([value])        | String                             | "scaleSqrt                                                                                                                                    | Name of d3.scale function name to use for scaling cell sizes                                                                                                                                                                                         |
| viewer.colorScaleFunction([value])   | Function                           | d3.[viewer.colorScaleName]                                                                                                                    | Defines the scale function to be used for color scaling. by default it will build a d3 scale using viewer.colorScaleName and the d3.extent() of the values loaded from viewer.colorField.                                                            |
| viewer.sizeScaleFunction([value])    | Function                           | d3.[viewer.sizeScaleName]                                                                                                                     | Defines the scale function to be used for size scaling. By default it will build a d3 scale using viewer.colorScaleName, the d3.extent() of the values loaded from viewer.sizeField and a range of [viewer .resolution / 3, viewer.resolution / 1.5] |
| viewer.colorFieldSelector([value])   | boolean                            | false                                                                                                                                         | Generates a simple HTML select input showing the available fields in the csv file that can be used to drive cell colour.                                                                                                                             |
| viewer.colorSchemeSelector([value])  | boolean                            | false                                                                                                                                         | Generates an HTML Select element for the different D3 Scale-Chromatic functions                                                                                                                                                                      |
| viewer.sizeFieldSelector([value])    | boolean                            | false                                                                                                                                         | Generates a simple HTML select input showing the available fields in the csv file that can be used to drive cell size.                                                                                                                               |
| viewer.showLegend([value])           | boolean                            | true                                                                                                                                          | Build d3 colour legend.                                                                                                                                                                                                                              |
| viewer.legend([value])               | Object                             | { type:"continuous", width:140, height:320, orientation:"vertical", title:"Legend", titleWidth: 50, format:".0s", cells: 13, shapeWidth: 30 } | Builds a legend of either type "continuous" or "cells". Cells and shapewidth properties are only applicable to legends of type "cells".                                                                                                              |

