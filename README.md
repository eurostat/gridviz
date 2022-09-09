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
                        tFun: (v) => +v == 0 ? null : 1 - Math.pow(Math.min(v / 50000, 1), 0.5)
                    })
                ]
            )
```

[Gridviz](README.md) can display several layers on top of each others. Each layer is based on a single multi-resolution dataset, which can be displayed several times based on several cartographic styles. For more information, see the [examples](#examples).


## App Configuration

TODO

| Method                        | Type  | Default | Description |
| ----------------------------- | ----- | ------- | ----------- |
| _app_.**methodName**([value]) | Array | null    |             |



    getGeoCenter() { return this.cg.getCenter(); }
    setGeoCenter(val) { this.cg.setCenter(val); return this; }

    getZoomFactor() { return this.cg.getZf(); }
    setZoomFactor(val) { this.cg.setZf(val); return this; }

    getZoomFactorExtent() { return this.cg.getZfExtent(); }
    setZoomFactorExtent(val) { this.cg.setZfExtent(val); return this; }

    getBackgroundColor() { return this.cg.backgroundColor; }
    setBackgroundColor(val) { this.cg.backgroundColor = val; return this; }

    getProjection() { return this.projection; }
    setProjection(val) { this.projection = val; return this; }



    getBoundaryLayer() { return this.boundaryLayer; }
    setBoundaryLayer(val) { this.boundaryLayer = val; return this; }
    getLabelLayer() { return this.labelLayer; }
    setLabelLayer(val) { this.labelLayer = val; return this; }


setViewFromURL


## Adding data

TODO
4 examples: CSV/tiled + ms tiled

| Method                        | Type  | Default | Description |
| ----------------------------- | ----- | ------- | ----------- |
| _app_.**methodName**([value]) | Array | null    |             |


## Styles


### ColorSizeShapeStyle

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

| Property              | Type   | Default | Description |
| --------------------- | ------ | ------- | ----------- |
| **propName**([value]) | String | 'grey'  | bla         |


### JoyPlotStyle

JoyPlotStyle allows you to visualise a grid in the form of a 'joyplot' - named after Joy Division's "Unknown Pleasures" album cover.

```javascript
//TODO upgrade
const style = new gridviz.JoyPlotStyle({
  heightFunction: (c) => 30 * Math.sqrt(c["2011"]),
  lineColor: "black",
});
```

| Property              | Type   | Default | Description |
| --------------------- | ------ | ------- | ----------- |
| **propName**([value]) | String | 'grey'  | bla         |

<br>

## Tooltip

TODO

## Legends

TODO


## Foreground information


### Placenames

TODO
From https://github.com/eurostat/euronym

### Boundaries

TODO
From https://github.com/eurostat/Nuts2json

## About

|                |                                                                                                                                                                                       |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
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
