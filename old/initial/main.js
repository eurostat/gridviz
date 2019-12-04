// Gridded statistics viewer based on PixiJS Graphics https://pixijs.io/examples/#/graphics/simple.js
// Combined with davidfig's viewport plugin https://github.com/davidfig/pixi-viewport
//TODO:
//Change resolution to 1km at a certain zoom threshold
//Add dynamic legend/symbology for cells in current view
//Change cell size depending on second variable, defined by column index specified by user

const BASE_URL = "http://s-est-tpol.net1.cec.eu.int/gridded-statistics/";
const INITIAL_CSV_URL = "../assets/csv/pop_5km.csv"; //csv with xmin and y min coords of grid cells
const ATTR_COLUMN = 2;
const X_COLUMN = 0; //column index for x coordinates
const Y_COLUMN = 1; //column index for y coordinates
const cellSizes = {
  "2km": 0.4,
  "5km": 1.04
};
var cellSize = cellSizes["5km"]; //fillRect() width/height in pixels
mapBounds = null; //Viewport map width, height and center
currentLevel = 0;

//TODO fix how to choose this z parameter
const z = 2;
const tileSize = Math.pow(2, 8 - z);

//specifications of the grid data service
const gridServiceBaseURL = BASE_URL + "tiles/pop_grid_2011_2km/";
const res = 2000; //2km
const origin = { x: 0, y: 0 };
const tileFrameLimits = { xMin: 0, xMax: z * 10, yMin: 0, yMax: z * 10 };

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

  // get the first csv file and draw cells using its points
  utils.showLoading(); //loading spinner
  utils.getCSV(INITIAL_CSV_URL, data => {
    var csvArray = utils.parseCSV(data);
    //map width, height and center
    if (!this.mapBounds) {
      this.mapBounds = this.getMapBoundsFromCSV(csvArray);
    }
    //draw cells
    this.drawGraphics(csvArray);
  });
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

//TILING LOGIC:
//
//
//
//
//the cache structure for the grid tiles. the tiles are indexed by z>x>y
//when a tile has been requested and was not found, a tag "none" is set
//when a http request has been sent to retrieve a tile but the response has not been received yet, a tag "loading" is set.
const tileCache = {
  cache: {},
  //retrieve a tile from its position in the tile structure
  getTile: function(z, x, y) {
    if (!this.cache[z]) this.cache[z] = {};
    if (!this.cache[z][x]) this.cache[z][x] = {};
    return this.cache[z][x][y];
  },
  //add a tile to the cache, once received
  store: function(z, x, y, tile) {
    if (!this.cache[z]) this.cache[z] = {};
    if (!this.cache[z][x]) this.cache[z][x] = {};
    this.cache[z][x][y] = tile;
  }
};

//value to color
//TODO decompose into 'value to class' function and 'class to style'. Use d3 for that
var valueToColor = function(value) {
  var t = value / 1400000;
  t = Math.pow(t, 0.2);
  if (t > 1) console.log(value);
  //see https://github.com/d3/d3-scale-chromatic
  return PIXI.utils.string2hex(
    d3.rgb(d3.interpolateCubehelixDefault(t)).formatHex()
  );
};

//draw a tile
const drawTile = function(tile) {
  //use one graphics per tile
  let gr = new PIXI.Graphics();

  //move and scale the tile graphics to draw each cell as a 1 pixel size element in the tile coordinates
  var dx = origin.x + tile.x * tileSize * res;
  var dy = origin.y + tile.y * tileSize * res;
  /*     gr.setTransform(dx, -dy, res, -res, 0, 0, 0, 0, 0);  */

  //draw the cells
  for (var j = 0; j < tile.cells.length; j++) {
    //get cell
    var cell = tile.cells[j];

    //get cell drawing style
    let fcol = valueToColor(cell.val);

    //draw the cell
    {
      gr.lineStyle(0);
      gr.beginFill(fcol, 1);
      /*             gr.drawRect(cell.x, cell.y, 1, 1);
       */ gr.drawRect(dx + cell.x * res, -cell.y * res - dy, res, res);
      //TODO find why this does not work !
      //see https://pixijs.io/examples/#/graphics/simple.js
      //see https://codingthesmartway.com/async-programming-with-javascript-callbacks-promises-and-async-await/
      //gr.drawRoundedRect(cell.x, cell.y, 0.8, 0.8, 0.2);
      //gr.drawCircle(cell.x, cell.y, 0.5);
      gr.endFill();
    }
  }
  viewportManager.viewport.addChild(gr);
};

var refresh = function(clear) {
  if (clear) {
    viewportManager.viewport.removeChildren();
  }

  var bn = viewportManager.viewport.getVisibleBounds(),
    tileXMin = Math.floor((bn.x - origin.x) / (res * tileSize)),
    tileXMax = Math.floor((bn.x + bn.width - origin.x) / (res * tileSize)) + 1,
    tileYMax = Math.floor((-bn.y - origin.y) / (res * tileSize)) + 1,
    tileYMin = Math.floor((-bn.y - bn.height - origin.y) / (res * tileSize));
  tileXMin = Math.max(tileXMin, tileFrameLimits.xMin);
  tileXMax = Math.min(tileXMax, tileFrameLimits.xMax);
  tileYMin = Math.max(tileYMin, tileFrameLimits.yMin);
  tileYMax = Math.min(tileYMax, tileFrameLimits.yMax);

  for (var x = tileXMin; x <= tileXMax; x++)
    for (var y = tileYMin; y <= tileYMax; y++) {
      //check if tile exists in cache
      var tile = tileCache.getTile(z, x, y);
      //if there is no tile there or it is already loading, continue
      if (tile === "none" || tile === "loading") continue;
      //if the tile was already loaded into the cach, draw it
      if (tile) {
        drawTile(tile);
        continue;
      }
      //get the tile
      (function(x, y, z) {
        //tag tile as being loaded in the cache
        tileCache.store(z, x, y, "loading");

        d3.csv(gridServiceBaseURL + z + "/" + x + "/" + y + ".csv")
          //.row(function (d) { return { x: +d.x, y: +d.y, val: +d.val }; })
          .then(function(cells) {
            //make tile
            var tile = { x: x, y: y, cells: cells };
            //store tile in cache
            tileCache.store(z, x, y, tile);
            //draw tile
            drawTile(tile);
          })
          .catch(function(error) {
            //no tile was found: keep that info in the cache to avoid asking again
            tileCache.store(z, x, y, "none");
          });
      })(x, y, z);
    }
};

viewportManager.viewport.on("wheel", e => {
  //console.log(e);
  if (viewportManager.viewport.scaled > 5) {
    refresh(true);
  }
});

viewportManager.viewport.on("moved-end", e => {
  //console.log(e);
  if (viewportManager.viewport.scaled > 5) {
    refresh(true);
  }
});
