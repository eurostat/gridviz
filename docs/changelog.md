# Change log

## Version 3

legend: no more segment width. size with shape set to "line"
style filtering
lego tanaka: coming soon
core folder
change in legends. With examples.
zExtent -> zoomExtent
visible as a function of zoom z - remove maxzoom/minzoom
Drawable class, common to layer and style
gviz to gridviz
generalisation of opts
viewScale at style level
minPixelsPerCell -> minPixelsPerCell. zoomResolutionJump ?
filterColor: for all layers
Enveloppe
canvas -> geocanvas
layers grouping: one layers stack par map. no more - showBgLayers showLabels showBoundaries
removal of map.addLayer
zoom factor -> zoom
add map.setView(x,y,z)
App -> Map
style based on cell directly, with viewscale (see scale functions)
stretching: new functions
addLayerFromDataset -> addLayer
Dataset -> multiresolution dataset
dataset component: dataset
Layer -> GridLayer
remove GridTile class
clean stretching lib
get rid of "map.addXXXLayer" methods
getGeoCenter setGeoCenter replaced by getView setView
style: draw(cells, canvas, resolution)
