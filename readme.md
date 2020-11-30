<meta name="google-site-verification" content="CF-f4tTHtmjHmKOBZXcJHfeioXOJnGPmnVvxFzKGMlA" />

# gridviz
![npm bundle size](https://img.shields.io/bundlephobia/minzip/gridviz)
![npm](https://img.shields.io/npm/v/gridviz)
![license](https://img.shields.io/badge/license-EUPL-success)

A JavaScript library being developed for visualizing gridded statistics from CSV files using three.js and d3.js. 

<div>
  <img src="https://raw.githubusercontent.com/eurostat/gridviz/master/assets/images/previews/preview.gif" alt="preview" width="98%" height="10%"/>
</div>

## Examples

| Link to example                                                                                                                  | Data source                                                                                                                              | Link to code                                                                                        |
| :------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| [Europe - 5km² Population Grid](https://eurostat.github.io/gridviz/examples/europe/5km/index.html)                               | [data source](https://ec.europa.eu/eurostat/web/gisco)                                                                                   | [See code](https://github.com/eurostat/gridviz/blob/master/examples/europe/5km/index.html)          |
| [Europe - 2km² Population Grid](https://eurostat.github.io/gridviz/examples/europe/2km/index.html)                               | [data source](https://ec.europa.eu/eurostat/web/gisco)                                                                                   | [See code](https://github.com/eurostat/gridviz/blob/master/examples/europe/2km/index.html)          |
| [Europe - 1km² Population Grid](https://eurostat.github.io/gridviz/examples/europe/1km/index.html)                               | [data source](https://ec.europa.eu/eurostat/web/gisco)                                                                                   | [See code](https://github.com/eurostat/gridviz/blob/master/examples/europe/1km/index.html)          |
| [Netherlands - Inhabitants per 100m²](https://eurostat.github.io/gridviz/examples/netherlands/index.html)                        | [data source](https://www.cbs.nl/nl-nl/dossier/nederland-regionaal/geografische-data/kaart-van-100-meter-bij-100-meter-met-statistieken) | [See code](https://github.com/eurostat/gridviz/blob/master/examples/netherlands/index.html)         |
| [France - 1km² Population Grid](https://eurostat.github.io/gridviz/examples/france/index.html)                                   | [data source](https://insee.fr/fr/statistiques/4176290?sommaire=4176305)                                                                 | [See code](https://github.com/eurostat/gridviz/blob/master/examples/france/1km/index.html)          |
| [France - Inhabitants over 80 years of age per 1km²](https://eurostat.github.io/gridviz/examples/france/population-over-80.html) | [data source](https://insee.fr/fr/statistiques/4176290?sommaire=4176305)                                                                 | [See code](https://github.com/eurostat/gridviz/blob/master/examples/france/population-over-80.html) |
| [Portugal census data](https://eurostat.github.io/gridviz/examples/portugal/index.html)                                          | [data source](https://www.efgs.info/data/national/)                                                                                      | [See code](https://github.com/eurostat/gridviz/blob/master/examples/portugal/index.html)            |

## Description

Gridviz is a JavaScript library which allows you to visualize large gridded datasets (or any csv file with x/y data) in the browser. Unlike traditional raster-based GIS approaches, this tool utilizes WebGL through three.js in order to render eveything client-side.

From a CSV file with x and y columns, gridviz will build a viewer capable of visualizing millions of grid cells on the fly.

For data-driven colouring and sizing, you can use [d3-scale](https://github.com/d3/d3-scale) and [d3-scale-chromatic](https://github.com/d3/d3-scale-chromatic).

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

Here's a barebones example that loads a CSV containing population data for a 5 km² grid of europe:

```javascript
    let viz = gridviz.viewer()
        .container(containerDiv)
        .gridData([
            {
                url: "https://raw.githubusercontent.com/eurostat/gridviz/master/assets/csv/Europe/5km/3035/pop_5km_zeros_removed.csv",
                cellSize: 5
            }
        ])
        .zerosRemoved(3) // To reduce file size, zeros can be removed from the cell's x and y coordinates. Just let gridviz know how many have been removed here!
        .title("5km² Population Grid of Europe")
        .colorField("value")  // csv column that will determine cell colour
        .legend({
            title: "Total population per 5 km² (2011)",
            ticks: 6
        })
        .sourcesHTML("Source: <a target='__blank' href='https://ec.europa.eu/eurostat/web/gisco/geodata/'>GISCO</a>")
        .build()
```

| Method                               | Type                               | Default                                                                                                                                       | Description                                                                                                                                                                                                                                          |
| ------------------------------------ | ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| viewer.container([value])            | HTMLElement                        | document.body                                                                                                                                 | The DOM element passed to the THREE.js renderer.                                                                                                                                                                                                     |
| viewer.height([value])               | int                                | container.clientHeight                                                                                                                        | The height value used for the threejs scene, camera, zoom, labels.                                                                                                                                                                                   |
| viewer.width([value])                | int                                | container.clientWidth                                                                                                                         | The width value used for the threejs scene, camera, zoom, labels.                                                                                                                                                                                    |
| viewer.backgroundColor([value])      | String                             | "#b7b7b7"                                                                                                                                     | Viewer background colour                                                                                                                                                                                                                             |
| viewer.borderColor([value])          | String                             | "#ffffff"                                                                                                                                     | Colour used for line geometries                                                                                                                                                                                                                      |
| viewer.highlightColor([value])       | String                             | "#37f2d6"                                                                                                                                     | Hex string which is later converted to THREE.Line2 color (hexidecimal).                                                                                                                                                                              |
| viewer.loadingIcon([value])          | String                             | "ring"                                                                                                                                        | CSS animation used for the loading icon, other options are: ripple \| ring \| ellipsis \|roller.                                                                                                                                                     |
| viewer.title([value])                | String                             | null                                                                                                                                          | Appends a title to the viewer                                                                                                                                                                                                                        |
| viewer.subtitle([value])             | String                             | null                                                                                                                                          | Appends a subtitle to the viewer                                                                                                                                                                                                                     |
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
| viewer.addGeoJson([value])           | String                             | null                                                                                                                                          | Loads a geojson file from the specified URL and adds it's geometries to the viewer. Currently only accepts "polygon" or "multipolygon" geometries                                                                                                    |

## Developer docs

For source code documentation see [docs](https://eurostat.github.io/gridviz/docs/)
