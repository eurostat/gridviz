function toVectorColor(colorStr) {
  var rgb = d3.rgb(colorStr);
  return [rgb.r / 255, rgb.g / 255, rgb.b / 255];
}

//it appears that for this to work the image has to be "width":365,"height":274 and have the same amount of pixels as numPoints
function expandImageData(compressed, width, height) {
  var imgAspect = compressed.width / compressed.height;
  var scaledWidth = width;
  var scaledHeight = width / imgAspect;
  var yTranslate = (height - scaledHeight) / 2;
  var xScale = d3
    .scaleLinear()
    .domain([0, compressed.width])
    .range([0, scaledWidth]);
  var yScale = d3
    .scaleLinear()
    .domain([0, compressed.height])
    .range([yTranslate, scaledHeight + yTranslate]);
  var hue = 205;
  var saturation = 0.74;
  //each array value is a brightness score (L value of HSL)
  var points = compressed.points.map(function (d, i) {
    return {
      x: xScale(Math.round(i % compressed.width)),
      y: yScale(Math.floor(i / compressed.width)),
      color: toVectorColor(d3.hsl(hue, saturation, d).toString())
    };
  });
  return points;
}

function sortImageData(imgData, width, height) {
  var xMid = width / 2;
  var yMid = height / 2;
  var distToMiddle = function (d) {
    return Math.pow(d.x - xMid, 2) + Math.pow(d.y - yMid, 2);
  };
  imgData.sort(function (a, b) {
    return distToMiddle(a) - distToMiddle(b);
  });
  return imgData;
}

function processImageData(compressed, width, height) {
  var expanded = expandImageData(compressed, width, height);
  return sortImageData(expanded, width, height);
}


function getCellClass(value) {
  let cellClass;
  if (value > 10000) {
    cellClass = 5; //red
  } else if (value > 5000) {
    cellClass = 4; //orange
  } else if (value > 1000) {
    cellClass = 3; //yellow
  } else if (value > 100) {
    cellClass = 2; //green
  } else if (value > 0) {
    cellClass = 1; //blue
  }
  return cellClass
}

function loadData(width, height) {
  let cellClass;
  return new Promise(function (resolve, reject) {
    var cellsCsv = function () {
      var args = [],
        len = arguments.length;
      while (len--) args[len] = arguments[len];
      return d3.csv(
        args[0],
        function (d) {
          cellClass = getCellClass(d.value);
          return {
            value: d.value,
            class: cellClass,
            y: +d.y,
            x: +d.x
          };
        },
        args[1]
      );
    };
    d3.queue()
      .defer(cellsCsv, csvURL)
      .defer(d3.json, imgURL)
      .await(function (err, cellsData, imgData) {
        if (err) {
          console.error("Something went wrong loading data", err);
          reject(err);
          return;
        }
        resolve({
          cellsData: cellsData,
          imgData: processImageData(imgData, width, height)
        });
      });
  });
}

function colorDataByClass(data, cellsData) {
  var colorScale = d3
    .scaleOrdinal()
    /*  .domain(["NA", "SA", "EU", "AS", "AF", "OC", "AN"]) */
    .domain(["1", "2", "3", "4", "5"]) //class breaks
    .range(
      d3
      .range(0, 1, 1 / 4)
      .concat(1)
      .map(d3.scaleSequential(d3.interpolatePlasma))
    );
  var varyLightness = function (color) {
    var hsl = d3.hsl(color);
    hsl.l *= 0.1 + Math.random();
    return hsl.toString();
  };
  data.forEach(function (d, i) {
    /* d.color = toVectorColor(varyLightness(colorScale(cellsData[i].class))) */
    /*       d.color = toVectorColor(
            d3.interpolateCubehelixDefault(cellsData[i].value)
          ); */
    d.color = valueToColor(cellsData[i].value);
  });
}

function valueToColor(value) {
  let color;
  if (value > 10000) {
    color = toVectorColor("#ff0f00"); //red
  } else if (value > 5000) {
    color = toVectorColor("#ffce08"); //orange
  } else if (value > 1000) {
    color = toVectorColor("#ebff0a"); //yellow
  } else if (value > 100) {
    color = toVectorColor("#55e238"); //green
  } else if (value > 0) {
    color = toVectorColor("#005cff"); //blue
  }
  return color;
};

function mapLayout(points, width, height, cellsData) {
  function projectData(data) {
    var latExtent = d3.extent(cellsData, function (d) {
      return d.y;
    });
    var lngExtent = d3.extent(cellsData, function (d) {
      return d.x;
    });
    var extentGeoJson = {
      type: "LineString",
      coordinates: [
        [lngExtent[0] * 1000, latExtent[0] * 1000],
        [lngExtent[1] * 1000, latExtent[1] * 1000]
      ]
    };
    /* var projection = d3.geoMercator().fitSize([width, height], extentGeoJson); */
    //TODO: project from EPSG to webgl screen coords
    var projection = d3
    /*       .geoAzimuthalEqualArea() */
    //.fitSize([width, height], extentGeoJson);
    data.forEach(function (d, i) {
      var cell = cellsData[i];
      /*       var location = projection([cell.x * 1000, cell.y * 1000]); */
      /*       d.x = location[0];
            d.y = location[1]; */

      d.x = (parseInt(cell.x) / 3); //convert & center coords
      d.y = ((parseInt(cell.y) / 3) * -1) + height; //invert the y coordinates and add height for centering
    });
  }
  projectData(points);
  colorDataByClass(points, cellsData);
}

function photoLayout(points, width, height, imgData) {
  points.forEach(function (d, i) {
    Object.assign(d, imgData[i]);
  });
}

//draw bar graph by defining point x/y based on cellclass value
function barsLayout(points, width, height, cellsData) {
  var pointWidth = width / 800;
  var pointMargin = 1;
  var byValue = d3
    .nest()
    .key(function (d) {
      return d.class;
    })
    .entries(cellsData)
    .filter(function (d) {
      return d.values.length > 10;
    })
    .sort(function (x, y) {
      return d3.ascending(x.key, y.key);
    });
  var binMargin = pointWidth * 10;
  var numBins = byValue.length;
  var minBinWidth = width / (numBins * 2.5);
  var totalExtraWidth =
    width - binMargin * (numBins - 1) - minBinWidth * numBins;
  var binWidths = byValue.map(function (d) {
    return (
      Math.ceil((d.values.length / cellsData.length) * totalExtraWidth) +
      minBinWidth
    );
  });
  /*   console.log(binWidths); */
  var increment = pointWidth + pointMargin;
  var cumulativeBinWidth = 0;
  var binsArray = binWidths.map(function (binWidth, i) {
    var bin = {
      value: byValue[i].key,
      binWidth: binWidth,
      binStart: cumulativeBinWidth + i * binMargin,
      binCount: 0,
      binCols: Math.floor(binWidth / increment)
    };
    cumulativeBinWidth += binWidth - 1;
    return bin;
  });
  var bins = d3
    .nest()
    .key(function (d) {
      return d.value;
    })
    .rollup(function (d) {
      return d[0];
    })
    .object(binsArray);
  /* console.log("got bins", bins); */
  colorDataByClass(points, cellsData);
  var arrangement = points.map(function (d, i) {
    var value = cellsData[i].class;
    var bin = bins[value];
    if (!bin) {
      return {
        x: d.x,
        y: d.y,
        color: [0, 0, 0]
      };
    }
    var binWidth = bin.binWidth;
    var binCount = bin.binCount;
    var binStart = bin.binStart;
    var binCols = bin.binCols;
    var row = Math.floor(binCount / binCols);
    var col = binCount % binCols;
    var x = binStart + col * increment;
    var y = -row * increment + height;
    bin.binCount += 1;
    return {
      x: x,
      y: y,
      color: d.color
    };
  });
  arrangement.forEach(function (d, i) {
    Object.assign(points[i], d);
  });
  /*   console.log("points[0]=", points[0]); */
}

function swarmLayout(points, width, height, cellsData) {
  mapLayout(points, width, height, cellsData);
  var rng = d3.randomNormal(0, 0.3);
  points.forEach(function (d, i) {
    d.y = 0.75 * rng() * height + height / 2;
  });
}

function randomLayout(points, width, height, cellsData) {
  mapLayout(points, width, height, cellsData);
  points.forEach(function (d, i) {
    d.y = Math.random() * height;
    d.x = Math.random() * width;
  });
}

//change point coordinates depending on attribute grouping
function areaLayout(points, width, height, cellsData) {
  colorDataByClass(points, cellsData);
  var rng = d3.randomNormal(0, 0.2);
  var pointWidth = Math.round(width / 800);
  var pointMargin = 1;
  var pointHeight = pointWidth * 0.375;
  var latExtent = d3.extent(cellsData, function (d) {
    return d.y;
  });
  var xScale = d3
    .scaleQuantize()
    .domain(latExtent)
    .range(d3.range(0, width, pointWidth + pointMargin));
  var binCounts = xScale.range().reduce(function (accum, binNum) {
    accum[binNum] = 0;
    return accum;
  }, {});
  var byValue = d3
    .nest()
    .key(function (d) {
      return d.class;
    })
    .entries(cellsData);
  cellsData.forEach(function (cell, i) {
    cell.d = points[i];
  });
  byValue.forEach(function (value, i) {
    value.values.forEach(function (cell, j) {
      var d = cell.d;
      if (d) {
        var binNum = xScale(cell.y);
        d.x = binNum;
        d.y = height - pointHeight * binCounts[binNum];
        binCounts[binNum] += 1;
      }
    });
  });
}

function phyllotaxisLayout(points, pointWidth, xOffset, yOffset, cellsData) {
  if (xOffset === void 0) xOffset = 0;
  if (yOffset === void 0) yOffset = 0;
  colorDataByClass(points, cellsData);
  var sortData = cellsData
    .map(function (cell, index) {
      return {
        index: index,
        value: cell.value
      };
    })
    .sort(function (a, b) {
      return a.value.localeCompare(b.value);
    });
  var theta = Math.PI * (3 - Math.sqrt(5));
  var pointRadius = pointWidth / 2;
  sortData.forEach(function (d, i) {
    var point = points[d.index];
    if (point) {
      var index = i % points.length;
      var phylloX = pointRadius * Math.sqrt(index) * Math.cos(index * theta);
      var phylloY = pointRadius * Math.sqrt(index) * Math.sin(index * theta);
      point.x = xOffset + phylloX - pointRadius;
      point.y = yOffset + phylloY - pointRadius;
    }
  });
  return points;
}