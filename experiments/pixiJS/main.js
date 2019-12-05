// Gridded statistics viewer based on PixiJS Graphics https://pixijs.io/examples/#/graphics/simple.js
// Combined with davidfig's viewport plugin https://github.com/davidfig/pixi-viewport
//TODO:
//Change resolution to 1km at a certain zoom threshold
//Add dynamic legend/symbology for cells in current view
//Change cell size depending on second variable, defined by column index specified by user

const BASE_URL = "http://s-est-tpol.net1.cec.eu.int/gridded-statistics/";
var INITIAL_CSV_URL = "../assets/csv/pop_5km.csv"; //csv with xmin and y min coords of grid cells
const SECOND_CSV_URL = "../assets/csv/pop_2km.csv";
const ATTR_COLUMN = 2;
const X_COLUMN = 0; //column index for x coordinates
const Y_COLUMN = 1; //column index for y coordinates
const cellSizes = {
  "2km": 0.4,
  "5km": 1.04
};
var cellSize = cellSizes["5km"]; //fillRect() width/height in pixels
var mapBounds = null; //Viewport map width, height and center
var currentLevel = 0;
var loading = false;

if (!PIXI.utils.isWebGLSupported()) {
  alert("Browser incompatible. WebGL required!");
}

this.init();

function init() {
  //create application and add it to page
  app = new PIXI.Application({
    width: window.innerWidth - 10,
    height: window.innerHeight - 10,
    antialias: true
  });
  document.body.appendChild(app.view);
  app.view.id = "grid-canvas";

  //initialize the viewport and its added functionality
  viewportManager.init();

  this.loadCSVgrid();
}

function loadCSVgrid() {
  // get the first csv file and draw cells using its points
  if (!this.loading) {
    utils.showLoading(); //loading spinner
    this.loading = true;
    utils.getCSV(INITIAL_CSV_URL, data => {
      var csvArray = utils.parseCSV(data);
      //map width, height and center
      if (!this.mapBounds) {
        this.mapBounds = this.getMapBoundsFromCSV(csvArray);
      }
      //draw cells
      this.drawGraphics(csvArray);
      this.loading = false;
    });
  }
}

//define the map width, height and center in its local coords
function getMapBoundsFromCSV(csvArray) {
  //find the extent of the csv points (min and max coords)
  var minX, minY, maxX, maxY;
  for (var i = 1; i < csvArray.length; i++) {
    var p = csvArray[i]; //csv point // Y coordinates are converted to negative
    /* this.invertYcoord(p); */
    p[Y_COLUMN] = utils.invertNumber(p[Y_COLUMN]);
    var easting = parseInt(p[X_COLUMN]); //x_min
    var northing = parseInt(p[Y_COLUMN]); //y_min
    if (i === 1) {
      // if first cell
      minX = maxX = easting; //easting
      minY = maxY = northing; //northing
    } else {
      minX = Math.min(easting, minX);
      minY = Math.min(northing, minY);
      maxX = Math.max(easting, maxX);
      maxY = Math.max(northing, maxY);
    }
  }

  const mapCenterX = (maxX + minX) / 2;
  const mapCenterY = (maxY + minY) / 2;
  const mapWidth = maxX - minX;
  const mapHeight = maxY - minY;

  return {
    mapWidth: mapWidth,
    mapHeight: mapHeight,
    mapCenterX: mapCenterX,
    mapCenterY: mapCenterY
  };
}

// add CSV points as graphics to the viewport
function drawGraphics(csvArray) {
  viewportManager.clearViewport();
  console.info("viewport cleared");

  // to find the scale that will fit the canvas get the min scale to fit height or width
  const scale = Math.min(
    app.view.width / this.mapBounds.mapWidth,
    app.view.height / this.mapBounds.mapHeight
  );

  // draw the squares based on the csvPoints, centered on the canvas
  //split csv array into chunks - there appears to be a limit on primitives for each PIXI.Graphics()
  var chunk_size = 100;
  var groups = utils.chunk(csvArray, chunk_size);

  //loop through groups
  for (var i = 0; i < groups.length; i++) {
    // Add graphics layer to viewport https://pixijs.io/examples/#/graphics/simple.js
    var graphicsLayer = new PIXI.Graphics(); //for mouse events //for each CSV point
    viewportManager.graphicsLayers.push(graphicsLayer);
    /* graphicsLayer.interactive = true; */

    //for each csv point
    for (var g = 0; g < groups[i].length; g++) {
      /* var id = utils.generateUniqueId(); */
      var cell = groups[i][g];
      if (isNaN(cell[X_COLUMN]) == false) {
        var easting = cell[X_COLUMN];
        var northing = cell[Y_COLUMN];

        var x = getScreenXFromGeo(easting, scale);
        var y = getScreenYFromGeo(northing, scale);

        //simple colour scheme based on cell attribute
        var colour = utils.valueToColour(
          cell[ATTR_COLUMN],
          viewportManager.viewport.scaled
        );
        //canvas drawing functions
        graphicsLayer.beginFill(colour, 1);
        graphicsLayer.drawRect(x, y, this.cellSize, this.cellSize);
        graphicsLayer.endFill();
      }
    }
    viewportManager.viewport.addChild(graphicsLayer);
  }
  utils.hideLoading();
}

// convert geographic X coordinate into screen coordinate
// taken from https://stackoverflow.com/questions/44969880/draw-polygon-canvas-from-coordinates-map
function getScreenXFromGeo(easting, scale) {
  return (easting - this.mapBounds.mapCenterX) * scale + app.view.width / 2;
}
// convert geographic Y coordinate into screen coordinate
// taken from https://stackoverflow.com/questions/44969880/draw-polygon-canvas-from-coordinates-map
function getScreenYFromGeo(northing, scale) {
  return (northing - this.mapBounds.mapCenterY) * scale + app.view.height / 2;
}

viewportManager.viewport.on("wheel", e => {
  //console.log(e);
  if (viewportManager.viewport.scaled > 5) {
    /*     INITIAL_CSV_URL = SECOND_CSV_URL;
    this.loadCSVgrid(); */
  }
});
