# Change log

## Version 3

### General

-   _gviz_ module bject replaced with _gridviz_
-   _core_ folder includes high level classes.
-   _App_ class renamed _Map_
-   New _map.setView(x,y,z)_ method to set map view (position x,y and zoom z)
-   _getGeoCenter_, _setGeoCenter_ methods replaced with _getView_ and _setView_ methods.
-   Removal of _map.addLayerXXX_ methods. Layers can now be created individually and then linked to a map with _map.layers_ property.
-   Style parameters are now based on cell directly, not the value of a predefined column/prperty.
-   Creation of the _viewScale_ attribute at style level to compute view level data to be used to draw the cells individually.
-   _zExtent_ property renamed _zoomExtent_
-   _pixNb_ property renamed _minPixelsPerCell_
-   _canvas_ property renamed _geocanva_
-   Notion of "zoom factor" removed to keep only "zoom". _zf_ parameters renamed simply _z_.
-   _Enveloppe_ type duplicate removed.
-   New simpler way to create multiresolution datasets.
-   _DatasetComponent_ class renamed into _Dataset_. And former _Dataset_ class into _MultiResolutionDataset_.
-   Revamping of _TiledGrid_ class. _GridTile_ class removed.
-   Layers grouping: No more distinction beteen grid layers, background layers and other layers. One stack of layers par map, whatever the type, order and number.
-   New abstract class _Drawable_, which groups common elements of _Layer_ and _Style_ classes.
-   Change of signature for the _draw_ method of _Style_ class. It is now: _draw(cells, canvas, resolution)_. It should be reflected on all custom styles.
-   New abstract class _Layer_. The former _Layer_ class was renamed _GridLayer_.
-   _filterColor_ property now available for layers.
-   A new property is available on Style to allow filtering cells at this level and avoid drawing unecessary cells.
-   _visible_ property added on _Style_ and _Layer_, and is now a function of zoom _z_. Removal of _maxzoom_ and _minzoom_ properrties.
-   Map properties _showBgLayers_, _showLabels_ and _showBoundaries_ removed. Use the new generic _visible_ property instead.
-   _LineLayer_ class was renamed _GeoJSONLayer_ to prepare support for new geometry types.
-   Stretching function structure change and renaming. See examples.
-   Add _layers\_()_ method to _Map_ class, to get or set map layers.
-   Add _styles\_()_ method to _GridLayer_ class, to get or set layer styles.
-   _viewScale_ scales have an _invert(t)_ function, like the ones of _viewScaleColor_, so that a _ColorLegend_ can write its labels from them (#165).
-   Zooming while the mouse moves no longer makes the map jolt when the zoom ends: the picture shown during the zoom is placed from the views it was taken at and the current one, instead of from a zoom anchor that is supposed to stay put (#161).
-   Fix: hovering a legend swatch no longer moves that legend above the ones before it (the legends keep their order while one is hovered).
-   New _CircleColorSizeWebGLStyle_: circles with a color and a size, drawn with webGL. All the circles of the style are drawn at once, and its `blendOperation` (such as `'multiply'`) is applied once for the style: much faster than the circle shape of _ShapeColorSizeStyle_ when there are many circles.
-   New default look of the tooltip, the legends and the buttons, which is the one of the statistical atlas. Tooltip options `color` and `lineHeight`, and CSS variables `--gridviz-legend-label-color` and `--gridviz-button-*`.
-   New examples gallery page (`examples/index.html`) listing all the examples by chapter, with a thumbnail for each. An example opens beside its source code (`examples/view.html?example=styles/lego.html`): the code is highlighted, can be copied, and the panel can be resized or hidden. The button "Examples" goes back to the gallery as it was left (same chapter, search and scroll position).
-   Fix: the squares of the webGL styles (_SquareColorWebGLStyle_, _SquareColorCategoryWebGLStyle_) left gaps in the grid when zoomed in, as a point has a limit of size and is not drawn when its center is out of the view. The squares are now drawn as triangles from 24 pixels (#86).
-   Fix: zoomed in a lot, the squares of the webGL styles (_SquareColorWebGLStyle_, _SquareColorCategoryWebGLStyle_) and the dots of _DotDensityStyle_ were not where the cells are (by tens of pixels, so that the outline of the hovered cell did not match them): the GPU lost the position with the geographical coordinates, in 32 bits floats. The positions are now sent relative to the center of the view (_GeoCanvas.getWebGLTransformCentered_) (#86).
-   New _donutOuterSize_ option of _ShapeColorSizeStyle_, the outer diameter of a donut (the resolution by default), to make a ring around a pie chart or another symbol (#112).
-   New _RandomWalkInterpolator_: a finer grid from a grid of categories, with the random walk interpolator, drawn by the styles it is given (#150).
-   New _stretchedBreaks(min, max, classNumber, stretching)_, the class limits which a stretching function maps to the limits of the classes of a color ramp. It replaces the _tFun_ option of _LegoStyle_ of version 2 (#142). _LegoStyle.get_ gives its _colDark_ and _colBright_ options (as documented) to the sides and the top of the bricks.
-   _SizeLegend_ has a _viewScaleFun_ option, to take the scale of the size in the combined view scale (_viewScaleCombination_) of a style with a color and a size (#154).
-   Fix: _TimeSeriesStyle_ compared the values, which are texts in a CSV file, as texts ('9' was above '10000'), which flattened the lines. Its default _lineWidth_ had the arguments of version 2 and drew nothing.
-   Documentation: the options of _ShapeColorSizeStyle_, _SquareColorWebGLStyle_ and _SquareColorCategoryWebGLStyle_, the stretching of the webGL styles (#124), how to show missing values (#155), the combined view scale of a color and a size (#154), the migration of _LegoStyle_ from version 2 (#142).
-   New examples: pie charts with a donut ring, a view scale for the color and the size, missing values, lego with a stretched color ramp, random walk interpolation, cross-sections of elevation and land cover (a prototype, #169), and a demo of 20 years of population in Norway (#144).
-   _ShadingStyle_, _ShadingRayStyle_ and _Interpolator_ are now documented in the reference. Fix: the `width` option of _ShadingStyle_ was truncated to a whole number (and the default width was 0 when zoomed in far).
-   The reference now names the dataset classes (_JSGrid_, _CSVGrid_, _TiledGrid_, _MultiResolutionDataset_), and gives the class and the options of each style, the options common to all the styles, the options of _GridLayer_, of the tooltip and of the buttons. `examples/README.md` explains the examples gallery.
-   `jsdoc` is now a development dependency: it was a dependency, so it was installed with gridviz, with its own dependencies (which have known vulnerabilities). A user of gridviz now installs only the d3 modules it uses (7 direct dependencies), and `npm audit --omit=dev` finds no vulnerability.
-   The _VennLegend_ has an accessible name (`role="img"` and an `aria-label`).

### Legends

-   Many changes in legends.
-   Creation of examples for all use cases.
-   Segment width legend was merged with size legend. Set shape property to "line".
-   New `labelsAsHTML` legend option (title and category labels as HTML, off by default) and `onLegendUpdate` map callback (called with the legend container after each draw).
-   Legends can be styled from a stylesheet: CSS classes on the legends and their parts, `--gridviz-legend-*` CSS variables for the fonts and padding, a `className` option, and `width: 'fill'` to fit the legend to its container.
-   CSS classes on the other elements too: `gridviz-map`, `gridviz-canvas`, `gridviz-legends`, `gridviz-tooltip` (also on a tooltip element you give), `gridviz-button` with `gridviz-zoom-buttons` / `gridviz-fullscreen-button`, `gridviz-legend-graphic`, `-symbol`, `-symbol-wrapper`, `-bar` and `-triangle` inside the legends.
-   Interactive legends: hovering a swatch of a color discrete, color category or ternary legend shows only the matching cells on the map (`interactive: false` to turn it off).
-   New _VennLegend_: a Venn diagram for the colors of two or three overlapping variables, drawn with one style each and blended by multiplication. It is interactive: hovering a part of the diagram shows only the cells of the colors of the circles at this place. A legend can now highlight several styles (`highlightedStyles()`), and gets the styles of its layer (`layerStyles`).

### Modules

-   In gridviz-eurostat module, a new function to ease GISCO background layers creation.
-   Modules gridviz-smoothing and gridviz-eurostat were upgraded to a new version which is compatible with this new version 3.
-   gridviz-parquet works with this version (use gridviz-parquet 1.1 or later). No upgrade so far for gridviz-leaflet.

### Out

-   Nothing is left out any more: the Lego and Tanaka styles, which were not included at first, are back.
