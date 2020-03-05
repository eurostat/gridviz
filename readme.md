# EuroGridViz

Gridded statistics visualization tool.

![alt text](https://github.com/eurostat/EuroGridLayer/blob/master/assets/images/preview.png "Eurostat population grid")

## [Live demo](https://eurostat.github.io/EuroGridViz/examples/basic/index.html)

## Description

EuroGridViz allows you to visualize large gridded datasets on the browser. Unlike raster-based approaches, this tool utilizes WebGL through Three.js in order to render eveything client-side.

## Installation & Usage

The project works both in browsers and in node.js

#### Node

Within a node.js project simply run the following command:

`npm install eurogridviz --save`

Then import:

```javascript
import * as EuroGridViz from "eurogridviz";

EuroGridViz.createViewer({
  container: document.getElementById("viz-container"),
  background_color: 0x000000,
  border_color: 0xffffff, //0x97dbf2
  color_scheme: "interpolateTurbo",
  legend: true,
  color_scheme_selector: true
});
```

#### Browsers

As a standalone script use:

```html
<script src="https://unpkg.com/eurogridviz/build/eurogridviz.min.js"></script>
```

Then:

```javascript
EuroGridViz.createViewer({
  container: document.getElementById("viz-container"),
  background_color: 0x000000,
  border_color: 0xffffff, //0x97dbf2
  color_scheme: "interpolateTurbo",
  legend: true,
  color_scheme_selector: true
});
```

## Parameters

Coming soon...
