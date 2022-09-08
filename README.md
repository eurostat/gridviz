# gridviz

![npm bundle size](https://img.shields.io/bundlephobia/minzip/gridviz)
![npm](https://img.shields.io/npm/v/gridviz)
![license](https://img.shields.io/badge/license-EUPL-success)

Gridviz is a JavaScript library to visualise gridded data (or any tabular dataset with x/y position) in the browser in a large variety of advanced cartographic styles. Unlike traditional raster-based web mapping tools, this tool renders eveything client-side on the fly.

<div>
  <img src="https://raw.githubusercontent.com/eurostat/gridviz/master/docs/screenshots/cropped/color.png" alt="preview" width="200px" height="200px"/>
  <img src="https://raw.githubusercontent.com/eurostat/gridviz/master/docs/screenshots/cropped/joyplot.png" alt="preview" width="200px" height="200px"/>
  <img src="https://raw.githubusercontent.com/eurostat/gridviz/master/docs/screenshots/cropped/size.png" alt="preview" width="200px" height="200px"/>
  <img src="https://raw.githubusercontent.com/eurostat/gridviz/master/docs/screenshots/cropped/nl.png" alt="preview" width="200px" height="200px"/>
</div>

## Documentation of version 1

See [there](v1/readme.md).

## Examples

See [there](examples/README.md).

TODO

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

Create a gridviz App using `let app = new gviz.App();` and customise it with the methods described in the documentation below.

Here's a barebones example that loads a CSV file containing population data for a 5x5 km grid of europe:

```javascript
let app = new gviz.App(containerDiv);
//...
//TODO
```

## Preparing csv data

TODO: move somewhere else

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

TODO: add sections for foreground: boundaries and placenames.
TODO: use only jsdoc ?

### App Configuration

TODO

| Method                          | Type   | Default              | Description                                                     |
| ------------------------------- | ------ | -------------------- | --------------------------------------------------------------- |
| _app_.**methodName**([value]) | Array  | null                 |  |


### Adding data


TODO

| Method                          | Type   | Default              | Description                                                     |
| ------------------------------- | ------ | -------------------- | --------------------------------------------------------------- |
| _app_.**methodName**([value]) | Array  | null                 |  |


### Styles



#### ColorSizeShapeStyle

ColorSizeShapeStyle allows you to define the **color**, **size** and **shape** of each grid cell individually.

In the following example, we define an interpolation function that will determine the colour of the grid cell using its "Population" attribute, and set each grid cell size to 1 and its shape to a circle.

```javascript
//TODO upgrade
const style = new gridviz.ColorSizeShapeStyle({
  colorFunction: (c) => gridviz.color().interpolateOrRd(Math.pow(c["Population"], 0.6) / 100),
  sizeFunction: (c) => 1,
  shapeFunction: (c) => "circle",
  opacity: 1,
  strokeWidth: 0.2,
  strokeColor: "grey",
});
```

| Property              | Type     | Default |Description            |
| --------------------------- | -------- | ------- | --------------------- |
| **propName**([value])      | String   | 'grey'  | bla      |


#### JoyPlotStyle

JoyPlotStyle allows you to visualise a grid in the form of a 'joyplot' - named after Joy Division's "Unknown Pleasures" album cover.

```javascript
//TODO upgrade
const style = new gridviz.JoyPlotStyle({
  heightFunction: (c) => 30 * Math.sqrt(c["2011"]),
  lineColor: "black",
});
```

| Property              | Type     | Default |Description            |
| --------------------------- | -------- | ------- | --------------------- |
| **propName**([value])      | String   | 'grey'  | bla      |

<br>

### Tooltip

TODO

### Legend

TODO

## About

|                |                 |
| -------------- | ---------------------------------- |
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
