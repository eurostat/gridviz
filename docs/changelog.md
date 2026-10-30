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
-   _ShadingStyle_, _ShadingRayStyle_ and _Interpolator_ are now documented in the reference. Fix: the `width` option of _ShadingStyle_ was truncated to a whole number (and the default width was 0 when zoomed in far).

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
-   No upgrade so far for gridviz-parquet and gridviz-leaflet

### Out

-   Lego and Tanaka styles not included: coming back soon !
