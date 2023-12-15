# Gridviz API reference

## Table of contents

- [Gridviz API reference](#gridviz-api-reference)
  - [Table of contents](#table-of-contents)
  - [Usage](#usage)
  - [Concepts](#concepts)
  - [Adding data](#adding-data)
    - [Single CSV file](#single-csv-file)
    - [Multi scale CSV data](#multi-scale-csv-data)
    - [Tiled data](#tiled-data)
    - [Multi scale tiled data](#multi-scale-tiled-data)
    - [Data pre-processing and filtering](#data-pre-processing-and-filtering)
  - [Basic styles](#basic-styles)
    - [Shape/Color/Size Style](#shapecolorsize-style)
    - [Square color WebGL Style](#square-color-webgl-style)
    - [Square color category WebGL style](#square-color-category-webgl-style)
    - [Composition style](#composition-style)
    - [Segment style](#segment-style)
    - [Stroke style](#stroke-style)
  - [Advanced styles](#advanced-styles)
    - [Tanaka style](#tanaka-style)
    - [Dot density style](#dot-density-style)
    - [Pillars style](#pillars-style)
    - [Text style](#text-style)
    - [Time series style](#time-series-style)
  - [Side styles](#side-styles)
    - [Side style](#side-style)
    - [Side category style](#side-category-style)
    - [Contour style](#contour-style)
    - [Isometric fence style](#isometric-fence-style)
  - [Esthetic styles](#esthetic-styles)
    - [JoyPlot Style](#joyplot-style)
    - [Mosaic style](#mosaic-style)
    - [Ninja star style](#ninja-star-style)
    - [Lego style](#lego-style)
    - [Lego category style](#lego-category-style)
  - [Kernel smoothing](#kernel-smoothing)
  - [Custom styles](#custom-styles)
  - [Legends](#legends)
  - [Background layer](#background-layer)
    - [Tiled layer](#tiled-layer)
    - [WMS](#wms)
  - [Foreground information](#foreground-information)
    - [Showing labels](#showing-labels)
    - [Showing boundaries](#showing-boundaries)
  - [Transparency](#transparency)
  - [Tooltip](#tooltip)
  - [Leaflet](#leaflet)
  - [Alright?](#alright)

Anything unclear or missing? Feel free to [ask](https://github.com/eurostat/gridviz/issues/new) !

## Usage

TODO: Simple case, with CSV
Or see intro page ?

## Concepts

One map. Layers. Different types of layers (map background, boundaries, etc.) and grid layers.

Grid layer showing gridded dataset. In the grid reference system.

One dataset may be reused by several layers. It may be multi-resolution.

A grid layer draws a single dataset using one or several styles.

Each style specifies how to draw cells within the view.

There is a list of predefined styles.


## Adding data

Dataset class, several type. Multiscale dataset.

### Single CSV file



### Multi scale CSV data


### Tiled data


### Multi scale tiled data


### Data pre-processing and filtering



## Basic styles

### Shape/Color/Size Style

[![shape color size style](img/styles/shapesizecolor_sc.png)](https://eurostat.github.io/gridviz/examples/styles/shapecolorsize_size_color.html)
[![shape color size style](img/styles/shapesizecolor_s.png)](https://eurostat.github.io/gridviz/examples/styles/shapecolorsize_size.html)
[![shape color size style](img/styles/shapesizecolor_random.png)](https://eurostat.github.io/gridviz/examples/styles/shapecolorsize_random.html)
[![shape color size style](img/styles/shapesizecolor_sc_donut.png)](https://eurostat.github.io/gridviz/examples/styles/shapecolorsize_size_color.html)

This style is a generic style which allows to define the **shape**, **color** and **size** of each grid cell, independantly according to 3 different variables. Three shapes are currently available: square, circle and donut (a disk with a hole of changing size). To show grid cells as small squares with only changing color, one of the styles based on web GL [here](#square-color-webgl-style) or [here](#square-color-category-webgl-style) should rather be used, for efficiency reasons.

See [this example with changing size](https://eurostat.github.io/gridviz/examples/styles/shapecolorsize_size.html) ([code](https://github.com/eurostat/gridviz/blob/master/examples/styles/shapecolorsize_size.html)).

See [this example with changing size and color](https://eurostat.github.io/gridviz/examples/styles/shapecolorsize_size_color.html) ([code](https://github.com/eurostat/gridviz/blob/master/examples/styles/shapecolorsize_size_color.html)).

See [this example with random shape, color and size](https://eurostat.github.io/gridviz/examples/styles/shapecolorsize_random.html) ([code](https://github.com/eurostat/gridviz/blob/master/examples/styles/shapecolorsize_random.html)).

### Square color WebGL Style

[![square color webgl style](img/styles/squarecolorwgl_pop.png)](https://eurostat.github.io/gridviz/examples/styles/squarecolorwgl.html)
[![square color webgl style](img/styles/squarecolorwgl_dark.png)](https://eurostat.github.io/gridviz/examples/styles/squarecolorwgl_dark.html)

This style displays each cell as a square, with a changing color. This style uses webGL and should thus be used to display grid cells at detailled resolutions.

See [this basic example](https://eurostat.github.io/gridviz/examples/styles/squarecolorwgl.html) ([code](https://github.com/eurostat/gridviz/blob/master/examples/styles/squarecolorwgl.html)).

See [this example with dark style](https://eurostat.github.io/gridviz/examples/styles/squarecolorwgl_dark.html) ([code](https://github.com/eurostat/gridviz/blob/master/examples/styles/squarecolorwgl_dark.html)).

### Square color category WebGL style

[![square color webgl category style](img/styles/squarecolorcatwgl_lc.png)](https://eurostat.github.io/gridviz/examples/styles/squarecolorcatwgl.html)

This style displays each cell as a square, with a changing color based on a categorical variable. This style uses webGL and should thus be used to display grid cells at detailled resolutions.

See [this basic example](https://eurostat.github.io/gridviz/examples/styles/squarecolorcatwgl.html) ([code](https://github.com/eurostat/gridviz/blob/master/examples/styles/squarecolorcatwgl.html)).

### Composition style

![composition style](img/styles/composition_flag.png)
[![composition style](img/styles/composition_piechart.png)](https://eurostat.github.io/gridviz/examples/styles/composition_types.html)
![composition style](img/styles/composition_ring.png)
[![composition style](img/styles/composition_halftone.png)](https://eurostat.github.io/gridviz/examples/styles/composition_types.html)
[![composition style](img/styles/composition_random.png)](https://eurostat.github.io/gridviz/examples/styles/composition_types.html)

This style shows a composition at cell level in various different ways: Flags, pie charts, rings, segments, radar, age pyramid and halftone.

See [this basic example](https://eurostat.github.io/gridviz/examples/styles/composition_types.html) ([code](https://github.com/eurostat/gridviz/blob/master/examples/styles/composition_types.html)).

### Segment style

[![segment style](img/styles/segment_width.png)](https://eurostat.github.io/gridviz/examples/styles/segment_width.html)
[![segment style](img/styles/segment_random.png)](https://eurostat.github.io/gridviz/examples/styles/segment_random.html)

This style displays each cell as a segment with a changeable color, length, width and orientation.

See [this basic example](https://eurostat.github.io/gridviz/examples/styles/segment_width.html) ([code](https://github.com/eurostat/gridviz/blob/master/examples/styles/segment_width.html)).

See [this example with random segment orientation, color, length and width](https://eurostat.github.io/gridviz/examples/styles/segment_random.html) ([code](https://github.com/eurostat/gridviz/blob/master/examples/styles/segment_random.html)).

### Stroke style

[![stroke style](img/styles/stroke.png)](https://eurostat.github.io/gridviz/examples/styles/stroke.html)
[![stroke style](img/styles/stroke_random.png)](https://eurostat.github.io/gridviz/examples/styles/stroke_random.html)

This style shows the stroke of each cell with different colors, widths, shapes and sizes. This style can be used in addition to others to show the cell strokes on top of those other styles.

See [this basic example](https://eurostat.github.io/gridviz/examples/styles/stroke.html) ([code](https://github.com/eurostat/gridviz/blob/master/examples/styles/stroke.html)).

See [this an example with random color, size, width and shape](https://eurostat.github.io/gridviz/examples/styles/stroke_random.html) ([code](https://github.com/eurostat/gridviz/blob/master/examples/styles/stroke_random.html)).

## Advanced styles

### Tanaka style

[![tanaka style](img/styles/tanaka.png)](https://eurostat.github.io/gridviz/examples/styles/tanaka.html)
[![tanaka style](img/styles/tanaka_full.png)](https://eurostat.github.io/gridviz/examples/styles/tanaka_full.html)

This style shows the grid cells in a [Tanaka style](http://wiki.gis.com/wiki/index.php/Tanaka_contours), that is with discrete colors and a shadow effect.

See [this basic example](https://eurostat.github.io/gridviz/examples/styles/tanaka.html) ([code](https://github.com/eurostat/gridviz/blob/master/examples/styles/tanaka.html)).

See [this other example](https://eurostat.github.io/gridviz/examples/styles/tanaka_full.html) ([code](https://github.com/eurostat/gridviz/blob/master/examples/styles/tanaka_full.html)).

### Dot density style

[![dot density style](img/styles/dotdensity.png)](https://eurostat.github.io/gridviz/examples/styles/dotdensity.html)
[![dot density style](img/styles/dotdensity_random.png)](https://eurostat.github.io/gridviz/examples/styles/dotdensity_random.html)

This style displays each cell as randomly located points, with changeable density and color.

See [this basic example](https://eurostat.github.io/gridviz/examples/styles/dotdensity.html) ([code](https://github.com/eurostat/gridviz/blob/master/examples/styles/dotdensity.html)).

See [this example with random colors](https://eurostat.github.io/gridviz/examples/styles/dotdensity_random.html) ([code](https://github.com/eurostat/gridviz/blob/master/examples/styles/dotdensity_random.html)).

### Pillars style

[![pillars style](img/styles/pillar.png)](https://eurostat.github.io/gridviz/examples/styles/pillar.html)
[![pillars style](img/styles/pillar_simple.png)](https://eurostat.github.io/gridviz/examples/styles/pillar_simple.html)

This style shows the grid cells as 3D pillars or, with changeable height, width and color.

See [this basic example](https://eurostat.github.io/gridviz/examples/styles/pillar.html) ([code](https://github.com/eurostat/gridviz/blob/master/examples/styles/pillar.html)).

See [this basic example with simple style](https://eurostat.github.io/gridviz/examples/styles/pillar_simple.html) ([code](https://github.com/eurostat/gridviz/blob/master/examples/styles/pillar_simple.html)).

### Text style

[![text style](img/styles/text_elevation.png)](https://eurostat.github.io/gridviz/examples/styles/text_elevation.html)
[![text style](img/styles/text.png)](https://eurostat.github.io/gridviz/examples/styles/text.html)

This style shows the grid cells as text labels. The text, its color and font size can be set according to some cell values.

See [this basic example](https://eurostat.github.io/gridviz/examples/styles/text_elevation.html) ([code](https://github.com/eurostat/gridviz/blob/master/examples/styles/text_elevation.html)).

See [this example](https://eurostat.github.io/gridviz/examples/styles/text.html) ([code](https://github.com/eurostat/gridviz/blob/master/examples/styles/text.html)).

### Time series style

[![time series style](img/styles/timeseries.png)](https://eurostat.github.io/gridviz/examples/styles/time_series.html)

This style shows the grid cells as a time series chart. It is particulary suitable to show data that has high temporal granularity and low geographical granurality (variation across time rather than space). The time series charts can be colored and sized according to other variables.

See [this basic example](https://eurostat.github.io/gridviz/examples/styles/time_series.html) ([code](https://github.com/eurostat/gridviz/blob/master/examples/styles/time_series.html)).

## Side styles

The **side styles** are special:They do not display the cells, but their sides. They can be used to show discontinuities between cell values with, for example, some shadow effect.

### Side style

[![side style](img/styles/side.png)](https://eurostat.github.io/gridviz/examples/styles/side.html)

This style displays the sides of the cells as segments with different colors and widths, depending on the values of the 2 adjacent cells.

See [this example](https://eurostat.github.io/gridviz/examples/styles/side.html) ([code](https://github.com/eurostat/gridviz/blob/master/examples/styles/side.html)).

### Side category style

[![side category style](img/styles/sidecat.png)](https://eurostat.github.io/gridviz/examples/styles/sidecat.html)

This style displays the sides of the cells as segments with different colors depending on the categories of the 2 adjacent cells.

See [this example](https://eurostat.github.io/gridviz/examples/styles/sidecat.html) ([code](https://github.com/eurostat/gridviz/blob/master/examples/styles/sidecat.html)).

### Contour style

[![contour style](img/styles/side_contour.png)](https://eurostat.github.io/gridviz/examples/styles/side_contour.html)

This style is experimental / under development. It displays the sides of the cells depending on discontinuities between the 2 adjacent cells, like contour lines.

See [this example](https://eurostat.github.io/gridviz/examples/styles/side_contour.html) ([code](https://github.com/eurostat/gridviz/blob/master/examples/styles/side_contour.html)).

### Isometric fence style

[![Isometric fence style](img/styles/isofence.png)](https://eurostat.github.io/gridviz/examples/styles/isofence.html)

This style shows the composition of a total quantity into categories as vertical cross-sections oriented toward North-South and East-West. It is an alternative to [composition style](#composition-style). It may also be seen as a bi-directional [joyplot style](#joyplot-style) showing categories - note that when **angle** value is set to 90°, the style is equivalent to a joyplot. This style was inspired by the [USGS geologic isometric fence diagrams (1953)](https://pubs.usgs.gov/pp/0228/).

See [this example](https://eurostat.github.io/gridviz/examples/styles/isofence.html) ([code](https://github.com/eurostat/gridviz/blob/master/examples/styles/isofence.html)).

## Esthetic styles

### JoyPlot Style

[![joyplot style](img/styles/joyplot.png)](https://eurostat.github.io/gridviz/examples/styles/joyplot.html)
[![joyplot style](img/styles/joyplot_full.png)](https://eurostat.github.io/gridviz/examples/styles/joyplot_shading.html)
[![joyplot style](img/styles/joyplot_random.png)](https://eurostat.github.io/gridviz/examples/styles/joyplot_random.html)

This style shows cell rows in the form of a 'joyplot' - named after Joy Division's "Unknown Pleasures" album cover. For joyplot style showing composition by categories, or for various orientations and perspective angles, see [isometric fence style](#isometric-fence-style).

See [this basic example](https://eurostat.github.io/gridviz/examples/styles/joyplot.html) ([code](https://github.com/eurostat/gridviz/blob/master/examples/styles/joyplot.html)).

See [this an example of shaded joyplot](https://eurostat.github.io/gridviz/examples/styles/joyplot_shading.html) ([code](https://github.com/eurostat/gridviz/blob/master/examples/styles/joyplot_shading.html)).

See [this an example with random colors](https://eurostat.github.io/gridviz/examples/styles/joyplot_random.html) ([code](https://github.com/eurostat/gridviz/blob/master/examples/styles/joyplot_random.html)).

### Mosaic style

[![mosaic style](img/styles/mosaic_basic.png)](https://eurostat.github.io/gridviz/examples/styles/mosaic.html)
[![mosaic style](img/styles/mosaic_roman.png)](https://eurostat.github.io/gridviz/examples/styles/mosaic_full.html)

This style shows the cell as pseudo-irregular square shapes giving a [mosaic](https://en.wikipedia.org/wiki/Mosaic) effect. The cells are colored depending on a variable.

See [this basic example](https://eurostat.github.io/gridviz/examples/styles/mosaic.html) ([code](https://github.com/eurostat/gridviz/blob/master/examples/styles/mosaic.html)).

See [this roman style example](https://eurostat.github.io/gridviz/examples/styles/mosaic_full.html) ([code](https://github.com/eurostat/gridviz/blob/master/examples/styles/mosaic_full.html)).

### Ninja star style

[![Ninja star style](img/styles/ninja_star.png)](https://eurostat.github.io/gridviz/examples/styles/ninja_star.html)
[![Ninja star style](img/styles/ninja_star_p.png)](https://eurostat.github.io/gridviz/examples/styles/ninja_star_p.html)

This style shows the cell as a star polygon whose compacity depends on a variable. The higher the value, the more compact the star: Maximum values correspond to a square, and minimum values correspond to a thin star. The shapes in between correspond to 4 branches stars looking like a ninja star.

See [this basic example](https://eurostat.github.io/gridviz/examples/styles/ninja_star.html) ([code](https://github.com/eurostat/gridviz/blob/master/examples/styles/ninja_star.html)).

See [this other example](https://eurostat.github.io/gridviz/examples/styles/ninja_star_p.html) ([code](https://github.com/eurostat/gridviz/blob/master/examples/styles/ninja_star_p.html)) with stars parallel to the x/y axes.

### Lego style

[![lego style](img/styles/lego.png)](https://eurostat.github.io/gridviz/examples/styles/lego.html)

This style shows the grid cells as lego bricks with changeable colors and height based on a quantitative variable.

See [this basic example](https://eurostat.github.io/gridviz/examples/styles/lego.html) ([code](https://github.com/eurostat/gridviz/blob/master/examples/styles/lego.html)).

See [this other example](https://eurostat.github.io/gridviz/examples/styles/lego_EUR.html) ([code](https://github.com/eurostat/gridviz/blob/master/examples/styles/lego_EUR.html)).

### Lego category style

[![lego style](img/styles/lego_cat.png)](https://eurostat.github.io/gridviz/examples/styles/lego_cat.html)

This style shows the grid cells as lego bricks with changeable colors based on a categorical variable.

See [this basic example](https://eurostat.github.io/gridviz/examples/styles/lego_cat.html) ([code](https://github.com/eurostat/gridviz/blob/master/examples/styles/lego_cat.html)).

See [this other example](https://eurostat.github.io/gridviz/examples/styles/lego_EUR.html) ([code](https://github.com/eurostat/gridviz/blob/master/examples/styles/lego_EUR.html)).

## Kernel smoothing

[![kernel smoothing](img/styles/kernel_smoothing.png)](https://eurostat.github.io/gridviz/examples/styles/kernelsmoothing.html)

This style allows applying a gaussian kernel smoothing to the input grid. Other styles can then be used on the smoothed grid - this style is thus more a 'filter' than a proper style.

Note that this style is available within the [gridviz-smoothing](https://github.com/eurostat/gridviz-smoothing) extension which need to be added as: `<script src="https://cdn.jsdelivr.net/npm/gridviz-smoothing"></script>`.

See [this elementary example](https://eurostat.github.io/gridviz/examples/styles/kernelsmoothing_small.html) ([code](https://github.com/eurostat/gridviz/blob/master/examples/styles/kernelsmoothing_small.html)).

See [this example](https://eurostat.github.io/gridviz/examples/styles/kernelsmoothing.html) ([code](https://github.com/eurostat/gridviz/blob/master/examples/styles/kernelsmoothing.html)).

The kernel smoothing computation relies on the [fast-kde](https://www.npmjs.com/package/fast-kde) library, which produces smoothing approximation very fast. Note that the approximation degrades significantly for weak smoothing (for low sigma values).

## Custom styles


## Legends


## Background layer

### Tiled layer


### WMS

## Foreground information

### Showing labels

### Showing boundaries

## Transparency

## Tooltip

## Leaflet

Gridviz can be used with leaflet by using the [leaflet-gridviz plugin](https://github.com/eurostat/leaflet-gridviz)


## Alright?

Anything unclear or missing? Feel free to [ask](https://github.com/eurostat/gridviz/issues/new) !
