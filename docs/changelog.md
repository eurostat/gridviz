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

### Legends

-   Many changes in legends.
-   Creation of examples for all use cases.
-   Segment width legend was merged with size legend. Set shape property to "line".

### Modules

-   In gridviz-eurostat module, a new function to ease GISCO background layers creation.
-   Modules gridviz-smoothing and gridviz-eurostat were upgraded to a new version which is compatible with this new version 3.
-   No upgrade so far for gridviz-parquet and gridviz-leaflet

### Out

-   Lego and Tanaka styles not included: coming back soon !
