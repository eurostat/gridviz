# Change log

## Version 3

### Version 3.5.0 (since 3.4.0)

-   New, opt-in: the _maxCells_ option of _MultiResolutionDataset_ limits what a view can load from a tiled dataset, by going to a coarser resolution before anything is downloaded, with _getRequestedDataset()_ for the resolution the zoom asks for. See the reference, [Datasets](reference.md#datasets).
-   New, opt-in: the _blendMode_ option of _VennLegend_, for a map whose colours do not mix by multiplication, on a dark background for example.
-   New, opt-in: the _exactDotNumber_ option of _DotDensityStyle_, for _dotNumber_ dots exactly instead of one more, and the _filter_, _heightClass_ and _tanaka_ options of _LegoStyle.getCategory_, for bricks whose colour is a category and whose height is another variable.
-   Fix: _TimeSeriesStyle_ took a value of the number 0 as no data, which broke the line (the text `'0'` of a CSV file was not affected).
-   Examples: the ships demo has 14 views of its data, and uses both of these.

### Version 3.4.0 (since 3.3.0)

-   Faster _GPUGridRenderer_ during a movement: tiles are built a little on each frame, view scales are worked out from a sample, and a frame only draws when a tile is finished. A resolution a zoom only passes through gets no tile requests. On a slowed laptop profile, in the most demanding test of a layer of circles: 38 to 63 frames per second.
-   _GPUGridRenderer_ also draws all the shapes of _ShapeColorSizeStyle_, and the outlines of _StrokeStyle_ (squares and circles).
-   Fix: _GPUGridRenderer_ could ask for every tile of the finest resolution when a layer was drawn before its info.json had come in, about 37,000 requests on a map of Europe (since 3.3.0). And _attach()_ now shows its canvas, which had to be done by hand in 3.3.0.
-   New, opt-in: the _worker_ option of _TiledGrid_ fetches and parses CSV tiles in a web worker, with _TiledGrid.onTileRequest_ for a page counting what is loading. The cells are the same as without it.
-   `dist/gridviz.js`, which most examples load, is built again: it was still version 3.1.1. `npm run build` now makes both bundles. New tests: `npm run test:csv-worker`.
-   New, opt-in: the _viewExtent_ option of _Map_, with _setViewExtent()_ and _getViewExtent()_, limits what can be seen: the borders of the view stay inside. _centerExtent_ keeps its meaning. See the reference, [Limit panning and zooming](reference.md#limit-panning-and-zooming).
-   Fix: _zoomExtent_ and _centerExtent_ are now applied by the zoom behaviour of d3 rather than to the view afterwards. A drag past a limit no longer detaches the map from the pointer (dragging back moved the map at once), and a wheel event at the zoom limit no longer redraws the map.
-   Fix: the zoom buttons ignored _zoomExtent_. They now stop at the limit, so a page which counts on them to go further has to widen its _zoomExtent_.
-   Fix: _GPUGridRenderer_ left its canvas hidden, so a host had to show it itself or see no grid. _attach()_ now shows it, and _detach()_ of the last map hides it.
-   Fix: the fullscreen button left the canvas at its old size, with the black backdrop of the browser around it. The map now follows the size of its container. After fullscreen was left with the Esc key, the next click of the button did nothing but raise an error: it now opens it again.
-   `dist/gridviz.js`, which most examples load, is built again: it was still version 3.1.1. `npm run build` now makes both bundles.

### Version 3.3.0 (since 3.2.0)

Nothing changes for a map that does not use what is new: `npm run test:compat` compares the examples of the gallery with the published version.

-   New, opt-in: _GPUGridRenderer_ draws grid layers on the GPU, fast enough for each frame of a movement, for a map inside another map (see the reference, [A map inside another map](reference.md#a-map-inside-another-map)).
-   New on _Map_: _setSize()_, _cancelRedraw()_, _getExtentGeo()_, _isDestroyed()_, so that a host needs no private field. The _tooltip_ of the map is public.
-   Tests: `npm run test:gpu` compares what the renderer draws with what the map draws, and `npm run test:compat` compares a version with the published one before a release.

### Version 3.2.0 (since 3.1.1)

-   Faster hover on dense views: a tiled dataset finds the cell under the pointer from its tile.
-   New: the _hoverSuspended_ option of _Map_, and _clearHover()_.
-   Fix: on a touch screen, pressing a zoom button lit both buttons (the tap highlight of the browser on the container, and the hover color which stayed on the last button touched). Only the button pressed is lit now, and the zoom buttons are 48 pixels wide on a touch screen (unless the page sets `--gridviz-button-size`).
-   Examples: the tooltips of about 60 examples were the list of the names of the columns of the data (`CNTR_ID: DE`, `TOT_P_2011`, `ind_snv`...). They now write the values for a reader (country names, labels, units). About 26 examples have sliders to play with the settings of their style (dot size, height, exponent of the stretching, opacity...).
-   Documentation: audit of the reference. The options of the map (`legendContainer` was documented as `legendDivId`, `transparentBackground` as `transparentbackground`, the default selection color, and the missing `x`, `y`, `z`, `zoomExtent`, `centerExtent`, `digForTooltip`, `defaultGlobalCompositeOperation`, `w`, `h`), of the layers (`BackgroundLayer`, `GeoJSONLayer` and `LabelLayer` options), the view scale functions and the classifiers, the default parent of the tooltip (the map container), a broken link and the table of contents. The tutorial, which was a list of notes, is a tutorial.

### Version 3.1.1 (since 3.1.0)

-   Fixes: the flickering and missing selection rectangle of the hovered cell, also after a scroll or a pan (#174); the legends with the styles which did not give them the cells (_CompositionStyle_, _TimeSeriesStyle_...); the default ticks of _ColorLegend_; _TimeSeriesStyle_ values compared as texts; the gaps and the shifted squares of the webGL styles when zoomed in (#86); the width of _ShadingStyle_.
-   New: _CircleColorSizeWebGLStyle_, _RandomWalkInterpolator_, _stretchedBreaks_, _VennLegend_, the _donutOuterSize_ and _viewScaleFun_ options, and a new default look of the tooltip, the legends and the buttons.
-   Faster _LabelLayer_ (a redraw with the names of Europe: 106 ms to 11 ms).
-   Examples and tests: a gallery page of the examples, six demos ported from gridviz 2.1.17 to version 3, new examples, and browser tests with real data (`npm run test:browser`).
-   Documentation: the reference is complete (datasets, styles, legends with a subchapter for each class, layers, tooltip, buttons).
-   `jsdoc` is no longer installed with gridviz (7 direct dependencies, no vulnerability).

The details are in the sections below.

### General

-   _gviz_ module object replaced with _gridviz_
-   _core_ folder includes high level classes.
-   _App_ class renamed _Map_
-   New _map.setView(x,y,z)_ method to set map view (position x,y and zoom z)
-   _getGeoCenter_, _setGeoCenter_ methods replaced with _getView_ and _setView_ methods.
-   Removal of _map.addLayerXXX_ methods. Layers can now be created individually and then linked to a map with _map.layers_ property.
-   Style parameters are now based on cell directly, not the value of a predefined column/property.
-   Creation of the _viewScale_ attribute at style level to compute view level data to be used to draw the cells individually.
-   _zExtent_ property renamed _zoomExtent_
-   _pixNb_ property renamed _minPixelsPerCell_
-   _canvas_ property renamed _geocanvas_
-   Notion of "zoom factor" removed to keep only "zoom". _zf_ parameters renamed simply _z_.
-   _Enveloppe_ type duplicate removed.
-   New simpler way to create multiresolution datasets.
-   _DatasetComponent_ class renamed into _Dataset_. And former _Dataset_ class into _MultiResolutionDataset_.
-   Revamping of _TiledGrid_ class. _GridTile_ class removed.
-   Layers grouping: No more distinction between grid layers, background layers and other layers. One stack of layers per map, whatever the type, order and number.
-   New abstract class _Drawable_, which groups common elements of _Layer_ and _Style_ classes.
-   Change of signature for the _draw_ method of _Style_ class. It is now: _draw(cells, canvas, resolution)_. It should be reflected on all custom styles.
-   New abstract class _Layer_. The former _Layer_ class was renamed _GridLayer_.
-   _filterColor_ property now available for layers.
-   A new property is available on Style to allow filtering cells at this level and avoid drawing unnecessary cells.
-   _visible_ property added on _Style_ and _Layer_, and is now a function of zoom _z_. Removal of _maxzoom_ and _minzoom_ properties.
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
-   `npm audit` finds no vulnerability, in the development dependencies either: `jshint` (not used) is removed and `webpack-dev-server` is upgraded to 6. `npm publish` now runs `npm audit` and the tests first (`prepublishOnly`), and stops if one fails.
-   The _VennLegend_ has an accessible name (`role="img"` and an `aria-label`).
-   Fix (#174): the rectangle of the selection of the hovered cell flickered since 3.1.0, when something redraws the map while the mouse is on the cell (an application which shows the cells around the hovered one from the `cellInfoHTML` of a layer, a layer which keeps loading...): the redraw, which is asynchronous since 3.1.0, cleared the rectangle, which was only drawn again at the next mouse move. The map now shows the hover again at the end of each redraw, for the cell which is under the mouse. The `cellInfoHTML` of the layers is called once for a cell, not at each redraw.
-   The hover follows the mouse after a scroll (zoom with the wheel) or a pan (drag) too: the rectangle, the tooltip and the cursor of the cell under the mouse are back when the gesture is over, instead of at the next mouse move. The position of the mouse is followed in the window, as the canvas does not get the mouse events while the map is dragged or scrolled. Nothing is shown when the mouse is over something else than the map (a panel...).
-   Faster _LabelLayer_: it set the font of every label of its file, 180000 for the names of Europe, before checking if the label is in the view (36 are, zoomed in): about 100 ms at each redraw, which made a map which redraws often (on hover for example) laggy. It looks if the label is in the view first, and sets the font only when it changes. A redraw of a map with the names of Europe goes from about 106 ms to 11 ms.
-   Browser tests with real data (`npm run test:browser`): the hover, the scroll and the pan on examples of the gallery, in Chrome, with the redraw patterns of an application; `-- --all` also loads the 114 examples of the gallery and reports their errors. `playwright-core` is a development dependency.
-   The demos `DE`, `EUR_bu`, `FR`, `FR_pop`, `HR` and `NO` of the examples used gridviz 2.1.17 from a CDN: they are ported to version 3 (the local build, `gridviz-eurostat` 2.2.2 and `gridviz-smoothing` 3.0.3). They also declare their charset: the accents of the texts were broken.

### Legends

-   Many changes in legends.
-   Fix: every style gives the cells of the view to its legends (only _ShapeColorSizeStyle_, _SegmentStyle_ and _CircleColorSizeWebGLStyle_ did), so that a legend made from the cells, like the ones of _sizeLegendViewScale_, works with any style. It threw "values is not iterable" and stopped the drawing of the map with _CompositionStyle_, _TimeSeriesStyle_...
-   Fix: a _ColorLegend_ without the `ticks` option has one tick for each 50 pixels of its width (at least 2). The default was `NaN`: no tick was drawn.
-   The legends chapter of the reference has a subchapter for each legend class, with its options, and the options common to all the legends.
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
