// Gridded statistics viewer based on PixiJS Graphics https://pixijs.io/examples/#/graphics/simple.js
// Combined with davidfig's viewport plugin https://github.com/davidfig/pixi-viewport
//TODO:
//Change resolution to 1km at a certain zoom threshold
//Add dynamic legend/symbology for cells in current view
//Change cell size depending on second variable, defined by column index specified by user

var csvURL = "assets/csv/pop_5km.csv"; //csv with xmin and y min coords of grid cells
var ATTRIBUTE1_COLUMN = 2;
var X_COLUMN = 0; //column index for x coordinates
var Y_COLUMN = 1; //column index for y coordinates
cellSize = 1.04; //fillRect() width/height in pixels
csvArray = []; //array of csv grid cells
graphicsLayers = []; //PixiJS Graphics Objects
mapDefinition = null; //Viewport map width, height and center
currentLevel = 0;
level1Graphics = [];
initialGraphics = [];

app = new PIXI.Application({
  width: window.innerWidth - 10,
  height: window.innerHeight - 10
});
document.body.appendChild(app.view);
app.view.id = "grid-canvas";

// create viewport (viewer) to add pan and zoom capability to pixijs
const viewport = new Viewport.Viewport({
  screenWidth: window.innerWidth,
  screenHeight: window.innerHeight,
  worldWidth: window.innerHeight + 1000,
  worldHeight: window.innerHeight + 1000,
  interaction: app.renderer.plugins.interaction // the interaction module is important for wheel to work properly when renderer.view is placed or scaled
});

//restrict viewport
/* viewport.clamp({
  left: viewport.worldWidth - 20000,
  right: viewport.worldWidth + 20000,
  top: -20000,
  bottom: +20000
}); */

// add the viewport to the stage
app.stage.addChild(viewport);

// activate plugins
viewport
  .drag()
  .pinch()
  .wheel()
  .decelerate();

// define scroll event
viewport.on("wheel", e => {
  var scale = e.viewport.scaled;
  console.log("scale: " + scale);
  this.changeGraphicsForCurrentScale(scale);
});

// get csv points for initial scale
utils.showLoading();
utils.getCSV(csvURL, data => {
  let arr = utils.parseCSV(data);
  csvArray = arr;
  this.initialGraphics = arr;
  this.drawCSVGrid();
});

function invertYcoord(c) {
  c[Y_COLUMN] = -Math.abs(c[Y_COLUMN]);
}

//define the map width, height and center in its local coords
function getMapDefinition() {
  //find the extent of the csv points (min and max coords)
  var minX, minY, maxX, maxY;
  for (var i = 1; i < csvArray.length; i++) {
    var p = csvArray[i]; //csv point // Y coordinates are converted to negative
    this.invertYcoord(p);
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
function drawCSVGrid() {
  utils.clearStage();

  //map width, height and center
  if (!this.mapDefinition) {
    this.mapDefinition = this.getMapDefinition();
  }

  // to find the scale that will fit the canvas get the min scale to fit height or width
  const scale = Math.min(
    app.view.width / this.mapDefinition.mapWidth,
    app.view.height / this.mapDefinition.mapHeight
  );

  // draw the squares based on the csvPoints, centered on the canvas
  //split csv array into chunks - there appears to be a limit on primitives for each PIXI.Graphics()
  var chunk_size = 100;
  var groups = utils.chunk(csvArray, chunk_size);

  //loop through groups
  for (var i = 0; i < groups.length; i++) {
    // Add graphics layer to viewport https://pixijs.io/examples/#/graphics/simple.js
    var graphicsLayer = new PIXI.Graphics(); //for mouse events //for each CSV point
    this.graphicsLayers.push(graphicsLayer);
    /* graphicsLayer.interactive = true; */

    //for each csv point
    for (var g = 0; g < groups[i].length; g++) {
      /* var id = utils.generateUniqueId(); */
      var cell = groups[i][g];

      var easting = cell[X_COLUMN];
      var northing = cell[Y_COLUMN];
      var x =
        (easting - this.mapDefinition.mapCenterX) * scale + app.view.width / 2;
      var y =
        (northing - this.mapDefinition.mapCenterY) * scale +
        app.view.height / 2;
      //simple colour scheme based on cell attribute
      var colour = utils.getColourValue(cell[ATTRIBUTE1_COLUMN], scale);
      //canvas drawing functions
      graphicsLayer.beginFill(colour, 1);
      graphicsLayer.drawRect(x, y, this.cellSize, this.cellSize);
      graphicsLayer.endFill();
    }

    /*     graphicsLayer.on("click", function(event) {
      //click event doesnt show individual cell attributes, only their x and y
      console.log(event);
    }); */
    viewport.addChild(graphicsLayer);
  }
  utils.hideLoading();
}

function clearAllGraphicsLayers() {
  for (var i = 0; i < this.graphicsLayers.length; i++) {
    this.graphicsLayers[i].clear();
  }
}

function changeGraphicsForCurrentScale(scale) {
  if (scale >= 8) {
    if (this.currentLevel !== 1) {
      this.currentLevel = 1;
      this.clearAllGraphicsLayers();
      this.cellSize = 0.2;
      utils.getCSV("assets/csv/wales_1km.csv", data => {
        let arr = utils.parseCSV(data);
        csvArray = arr;
        this.level1Graphics = arr;
        //invert Y coordinates
        for (var i = 1; i < csvArray.length; i++) {
          var p = csvArray[i]; //csv point
          this.invertYcoord(p); // Y coordinates are converted to negative
        }

        //draw grid
        this.drawCSVGrid();
      });
    }
  } else if (scale <= 8) {
    if (this.currentLevel !== 0) {
      this.currentLevel = 0;
      this.clearAllGraphicsLayers();
      this.cellSize = 1.04;
      csvArray = this.initialGraphics;
      //draw grid
      this.drawCSVGrid();
    }
  }
}
