# Gridviz, in 5 minutes

This tutorial makes a map of the population of Europe, from a CSV file, and improves it step by step. The complete code of each step is in the [examples](https://eurostat.github.io/gridviz/examples/), and every option is in the [reference](reference.md).

## 1. A map

A gridviz map needs a page with a container of the size you want for the map, and the library:

```html
<div id="map" style="height: 100%; width: 100%"></div>

<script src="https://unpkg.com/gridviz/dist/gridviz.min.js"></script>
<script>
    // the map, with its initial view: the position of its center (x, y), and the zoom z in meters per pixel
    const map = new gridviz.Map(document.getElementById('map'), { x: 4500000, y: 2900000, z: 3000 }).addZoomButtons()

    // the data: a CSV file with a x and a y column (the lower left corner of each cell), and the size of the cells
    const dataset = new gridviz.CSVGrid(
        map,
        'https://raw.githubusercontent.com/eurostat/gridviz/master/assets/csv/Europe/pop_2018_10km.csv',
        10000
    )

    // the style: how to draw a cell
    const style = new gridviz.ShapeColorSizeStyle({
        color: (cell) => (cell.population > 60000 ? '#d95f0e' : '#fee391'),
    })

    // a layer shows a dataset with one or several styles. The layers of the map are drawn in order.
    map.layers = [new gridviz.GridLayer(dataset, [style])]
</script>
```

The coordinates are those of the grid, here ETRS89-LAEA (EPSG:3035), in meters. See [this example](https://eurostat.github.io/gridviz/examples/basics/basic_CSV.html).

## 2. A tooltip

By default the tooltip of a cell lists the names of the columns of the file (`population: 12288`). Write it for your readers with `cellInfoHTML`:

```javascript
map.layers = [
    new gridviz.GridLayer(dataset, [style], {
        cellInfoHTML: (cell) => '<b>' + (+cell.population).toLocaleString() + '</b> inhabitants (2018)',
    }),
]
```

The values of a CSV file are text: `+cell.population` makes the number. See the [tooltip](reference.md#tooltip).

## 3. A color scale and a legend

A style parameter is a function of the cell, so a color can follow a value. A legend explains it:

```javascript
const style = new gridviz.ShapeColorSizeStyle({
    color: (cell) => d3.interpolateYlOrRd(cell.population / 20000), // d3-scale-chromatic: https://d3js.org/d3-scale-chromatic
})

style.legends = [
    new gridviz.ColorLegend({
        title: 'Population',
        colorScale: d3.interpolateYlOrRd,
        ticks: 5,
        textScale: (t) => t * 20000, // the value written for a position t within [0, 1] of the scale
    }),
]
```

See [this example](https://eurostat.github.io/gridviz/examples/legends/colorLegend.html), and the [legends](reference.md#legends) of the reference.

## 4. Other styles

The style is what changes the look of the map. The same data as circles, with a size, or as dots:

```javascript
const circles = new gridviz.ShapeColorSizeStyle({
    shape: () => 'circle',
    size: (cell, resolution) => resolution * Math.sqrt(cell.population / 150000),
    color: () => 'darkcyan',
})

const dots = new gridviz.DotDensityStyle({
    dotNumber: (cell, resolution, z) => cell.population / z / 5,
    dotSize: (resolution, z) => 1.2 * z,
})
```

Several styles can be given to a layer, to be drawn on top of each other. All of them are in the [gallery](https://eurostat.github.io/gridviz/examples/) and in the [reference](reference.md#basic-styles). Many examples have sliders for the options of their style.

## 5. A background, boundaries, labels

A map is a stack of layers: put a [background layer](reference.md#backgroundlayer) below the grid, and [boundaries](reference.md#geojsonlayer) and [labels](reference.md#labellayer) above it. See [this example](https://eurostat.github.io/gridviz/examples/basics/background_gisco.html), and the module [gridviz-eurostat](https://github.com/eurostat/gridviz-eurostat) for ready-made layers of Europe.

## 6. More data

A big grid is not loaded as one file: it is cut into tiles, at several resolutions, and the map loads the tiles of the view. Use [GridTiler](https://github.com/eurostat/gridtiler) to tile your CSV file into the [tiled grid format](tiledformat.md), publish the folder on a web server, and replace the dataset:

```javascript
const dataset = new gridviz.MultiResolutionDataset(
    [1000, 2000, 5000, 10000, 20000, 50000, 100000],
    (resolution) => new gridviz.TiledGrid(map, 'https://your.server/your/tiles/' + resolution + 'm/')
)
```

See [this example](https://eurostat.github.io/gridviz/examples/basics/basic_multiscale_tiled_CSV.html). The map then shows the resolution which fits the zoom level.
