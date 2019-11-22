//see doc: http://pixijs.download/release/docs/index.html
//https://github.com/davidfig/pixi-viewport
//https://davidfig.github.io/pixi-viewport/jsdoc/

var PIXI = require('pixi.js');
var Viewport = require('pixi-viewport');
import './globals';

//define initial variable values

let origin = {
    x: 0,
    y: 0
}; // x/y origin of the csv tiles coordinate system
let resolution = 10000; // cell size in the same units as coord system
let baseURL = globals.initial_CSV_URL;
let zoomLevel = 0;
let tiles = [];


// attribute value to color
const valueToColor = (value) => {
    if (value > 90) return 0xff0f00; //red
    if (value > 80) return 0xffce08; //orange
    if (value > 60) return 0xebff0a; //yellow
    if (value > 40) return 0x55e238; //green
    return 0x005cff; //blue
};


if (!PIXI.utils.isWebGLSupported()) {
    //fallback option for browsers without webgl
    PIXI = require('pixi.js-legacy');
}

//create application and add it to page
let app = new PIXI.Application({
    width: window.innerWidth - 10,
    height: window.innerHeight - 10,
    antialias: true
});
document.body.appendChild(app.view);
app.renderer.backgroundColor = 0x061639;

// create viewport
const viewport = new Viewport.Viewport({
    screenWidth: app.view.width,
    screenHeight: app.view.height,
    worldWidth: 2000000,
    worldHeight: 6000000, //TODO use top/bottom/right/left instead ?
    interaction: app.renderer.plugins.interaction
});

// add the viewport to the stage
app.stage.addChild(viewport);

// activate plugins
viewport
    .drag()
    .pinch()
    .wheel()
    .decelerate();

/* viewport.fitWorld(true); */

//get appropriate tiles when the canvas is moved (using loader?)
viewport.on("wheel", e => {
    var scale = e.viewport.scaled;

    if (scale < 1) {
        zoomLevel = 0;
    }
    var bounds = viewport.getVisibleBounds(); //returns PIXI.rectangle

    //retrieve the tiles that are within the viewport (xGeoMin, yGeoMin, xGeoMax, yGeoMax)
    // The formula is TxMin = E( (xGeoMin - origin.x ) / (res * 2^(8-z) )
    // Where res is the cell resolution, origin.x is the x coordinate of the origin point, z is the zoom level
    var xGeoMin = bounds.x;
    var xGeoMax = bounds.x + bounds.width;
    var yGeoMin = bounds.y;
    var yGeoMax = bounds.y + bounds.height;

    var tileXMin = Math.floor(
        (xGeoMin - origin.x) / (resolution * Math.pow(2, 8 - zoomLevel))
    );
    var tileXMax =
        Math.floor(
            (xGeoMax - origin.x) / (resolution * Math.pow(2, 8 - zoomLevel))
        ) + 1;

    var tileYMin = Math.floor(
        (yGeoMin - origin.y) / (resolution * Math.pow(2, 8 - zoomLevel))
    );

    var tileYMax =
        Math.floor(
            (yGeoMax - origin.y) / (resolution * Math.pow(2, 8 - zoomLevel))
        ) + 1;

    // iterate X tiles
    for (var tileX = tileXMin; tileX <= tileXMax; tileX++) {
        //disregard negative tiles
        if (Math.sign(tileX) != -1) {
            //create graphics layer for each tile
            let graphicsLayer = new PIXI.Graphics();

            //position each tile using the following formula:
            // xGeo = res * ( Tx * 2^(8-z) + x ) + origin.x
            graphicsLayer.position.x =
                resolution * tileX * Math.pow(2, 8 - zoomLevel) + origin.x;
            graphicsLayer.position.y =
                resolution * tileY * Math.pow(2, 8 - zoomLevel) + origin.y;

            //iterate Y tiles
            for (var tileY = tileYMin; tileY <= tileYMax; tileY++) {
                //disregard negative numbers
                if (Math.sign(tileX) != -1 && Math.sign(tileY) != -1) {
                    //construct url for csv file ( pop_grid_<year>_<res>km\<z>\<x>\<y>.csv )
                    var tileURL =
                        baseURL + zoomLevel + "/" + tileX + "/" + tileY + ".csv";

                    //TODO check if tile is cached and if not, request it

                    // Request CSV tile file
                    getCSV(tileURL, data => {
                        var cells = parseCSV(data); //csvArray representing the grid cells of a tile
                        addCellsToGraphicsLayer(
                            cells,
                            graphicsLayer,
                            tileX,
                            tileY
                        );
                    });
                }
            }
            viewport.addChild(graphicsLayer);
        }
    }
});

const addCellsToGraphicsLayer = function (cells, gr, tileX, tileY) {
    for (var i = 1; i < cells.length; i++) {
        var cell = cells[i];
        //draw cell
        //The formula to compute the cell geographic coordinates from its coordinates in the tile is: xGeo = res * ( Tx * 2^(8-z) + x ) + origin.x
        /*           var xGeo =
          resolution * (tileX * Math.pow(2, 8 - zoomLevel) + cell[0]) +
          origin.x;
        var yGeo =
          resolution * (tileY * Math.pow(2, 8 - zoomLevel) + cell[1]) +
          origin.y; */

        gr.beginFill(valueToColor(cell[2]));
        gr.drawRect(cell[0], cell[1], 1, 1);
        gr.endFill();
    }
};

viewport.on("clicked", e => {
    console.log("click point: ", e.world);
});

//xmlhttp request for csv files
const getCSV = (url, callback) => {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            try {
                var data = xmlhttp.responseText;
            } catch (err) {
                /* console.log(err.message + " in " + xmlhttp.responseText); */
                return;
            }
            callback(data);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
};

// parseCSV and convert to array
const parseCSV = (str) => {
    var arr = [];
    var quote = false; // true means we're inside a quoted field

    // iterate over each character, keep track of current row and column (of the returned array)
    for (var row = 0, col = 0, c = 0; c < str.length; c++) {
        var cc = str[c],
            nc = str[c + 1]; // current character, next character
        arr[row] = arr[row] || []; // create a new row if necessary
        arr[row][col] = arr[row][col] || ""; // create a new column (start with empty string) if necessary

        // If the current character is a quotation mark, and we're inside a
        // quoted field, and the next character is also a quotation mark,
        // add a quotation mark to the current column and skip the next character
        if (cc == '"' && quote && nc == '"') {
            arr[row][col] += cc;
            ++c;
            continue;
        }

        // If it's just one quotation mark, begin/end quoted field
        if (cc == '"') {
            quote = !quote;
            continue;
        }

        // If it's a comma and we're not in a quoted field, move on to the next column
        if (cc == "," || (cc == ";" && !quote)) {
            ++col;
            continue;
        }

        // If it's a newline (CRLF) and we're not in a quoted field, skip the next character
        // and move on to the next row and move to column 0 of that new row
        if (cc == "\r" && nc == "\n" && !quote) {
            ++row;
            col = 0;
            ++c;
            continue;
        }

        // If it's a newline (LF or CR) and we're not in a quoted field,
        // move on to the next row and move to column 0 of that new row
        if (cc == "\n" && !quote) {
            ++row;
            col = 0;
            continue;
        }
        if (cc == "\r" && !quote) {
            ++row;
            col = 0;
            continue;
        }

        // Otherwise, append the current character to the current column
        arr[row][col] += cc;
    }
    return arr;
};