var PIXI = require("pixi.js");
var Viewport = require("pixi-viewport");
var d3 = require("d3");
import "./globals";

//see doc: http://pixijs.download/release/docs/index.html
//https://github.com/davidfig/pixi-viewport
//https://davidfig.github.io/pixi-viewport/jsdoc/

//TODO fix how to choose this z parameter
const z = 2;
const tileSize = Math.pow(2, 8 - z);

//specifications of the grid data service
var cellSize = "2km";
const gridServiceBaseURL = globals.BASE_URL + globals.TILESETS[grid];
const res = 5000;
const origin = { x: 0, y: 0 };
const tileFrameLimits = { xMin: 0, xMax: z * 10, yMin: 0, yMax: z * 10 };

//create application
if (!PIXI.utils.isWebGLSupported()) PIXI = require("pixi.js-legacy");

//create application and add it to page
let app = new PIXI.Application({
  width: window.innerWidth - 10,
  height: window.innerHeight - 10,
  antialias: true
});
document.body.appendChild(app.view);
app.renderer.backgroundColor = 0x000000;

// create viewport
const viewport = new Viewport.Viewport({
  screenWidth: app.view.width,
  screenHeight: app.view.height,
  interaction: app.renderer.plugins.interaction
});

// add the viewport to the stage
app.stage.addChild(viewport);

//TODO try to use that to fix the y orientation at the source
//viewport.setTransform(0, 0, 1, -1, 0, 0, 0, 0, 0);

// activate plugins
viewport
  .drag()
  .pinch()
  .wheel() //TODO make it two
  /* .wheel({ percent: 10.0, smooth: 5 }) */
  .decelerate();

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

//pool of graphics
let graphicsPool = [];

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
  viewport.addChild(gr);
  graphicsPool.push(gr);
};

var refresh = function(clear) {
  if (clear) {
    viewport.removeChildren();
    //destroy graphics to prevent memory leak
    graphicsPool.forEach(g => {
      g.clear();
    });
  }

  var bn = viewport.getVisibleBounds(),
    tileXMin = Math.floor((bn.x - origin.x) / (res * tileSize)),
    tileXMax = Math.floor((bn.x + bn.width - origin.x) / (res * tileSize)) + 1,
    tileYMax = Math.floor((-bn.y - origin.y) / (res * tileSize)) + 1,
    tileYMin = Math.floor((-bn.y - bn.height - origin.y) / (res * tileSize));
  tileXMin = Math.max(tileXMin, tileFrameLimits.xMin);
  tileXMax = Math.min(tileXMax, tileFrameLimits.xMax);
  tileYMin = Math.max(tileYMin, tileFrameLimits.yMin);
  tileYMax = Math.min(tileYMax, tileFrameLimits.yMax);

  for (var x = tileXMin; x <= tileXMax; x++) {
    for (var y = tileYMin; y <= tileYMax; y++) {
      //check if tile exists in cache
      var tile = tileCache.getTile(z, x, y);
      //if there is no tile there or it is already loading, continue
      if (tile === "none" || tile === "loading") continue;
      //if the tile was already loaded into the cache, draw it
      if (tile) {
        drawTile(tile);
        continue;
      }

      //get the tile
      (function(x, y, z) {
        //tag tile as being loaded in the cache
        tileCache.store(z, x, y, "loading");
        //tile http request
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
  }
};

viewport.on("wheel", e => {
  //console.log(e);
  refresh(true);
});

viewport.on("moved-end", e => {
  //console.log(e);
  refresh(true);
});

viewport.on("clicked", e => {
  console.log(e);
  //console.log(viewport.scaled);
  //console.log(app);
  //console.log(tileCache);
  //refresh();
  //TODO retrieve and show cell value under the click
});

//interpretation of scaled factor: pixelSizeM = 1/scaled. a grid cell is represented as a single pixel when scaled = 1/res
viewport.setZoom(0.001, true);
viewport.moveCenter(4304777, -3064954);

refresh();
