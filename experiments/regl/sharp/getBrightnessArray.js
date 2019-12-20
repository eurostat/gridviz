//nodejs script that converts image into an array of brightness scores (L value from HSL) for each of its pixels
const sharp = require("sharp");
const fs = require("fs");
const convert = require("color-convert");

var metadata = null; //input image metadata
var desiredRes = 100000; //desired resolution (used for downsampling / upsampling)
var inputImgURL = "input/eurostat_upscaled.png"; //input image URL
var outputImgURL = "../animated/image.json";

sharp(inputImgURL)
  .metadata(function (err, data) {
    if (err) {
      return console.log(err);
    }
    console.log("Input image metadata: ", data);
    metadata = data;
  })
  .raw()
  .greyscale()
  .toBuffer(function (err, data) {
    if (err) {
      return console.log(err);
    }
    // data is a Buffer containing uint8 values (0-255)
    // with each byte representing one pixel
    let rgb = []; //rgb grouping of buffer values
    let lValues = []; //L values of HSL colors

    //get HSL value for every 3 values (RGB) in the Buffer
    data.forEach((p, i) => {
      //for every 4 rgb values, convert to HSL and add L value to array
      rgb.push(p);
      if (i % 3 == 0) {
        hsl = convert.rgb.hsl(rgb[0], rgb[1], rgb[2]);
        lValues.push(hsl[2] / 100);
        rgb = [];
      }
    });

    var resampled; //resampled L values 

    if (lValues.length > desiredRes) {
      console.log("Image has more pixels (", lValues.length, ") than desired resolution (", desiredRes, "), downsampling...");
      //downsample to desired resolution
      resampled = distributedCopy(lValues, desiredRes);

    } else if (lValues.length < desiredRes) {
      return console.log("Image has less pixels (", lValues.length, ") than desired resolution (", desiredRes, "), please choose an image with more pixels.");
    }


    //define JSON file for export
    jsonObj = {
      height: metadata.height,
      width: metadata.width,
      points: resampled
    };

    //write JSON to file in output folder
    fs.writeFile(outputImgURL, JSON.stringify(jsonObj), function (err) {
      if (err) {
        return console.log(err);
      }
      console.log("The file was saved!");
    });
  });


/**
 * Retrieve a fixed number of elements from an array, evenly distributed but
 * always including the first and last elements.
 *
 * @param   {Array} items - The array to operate on.
 * @param   {number} n - The number of elements to extract.
 * @returns {Array}
 */
function distributedCopy(items, n) {
  var elements = [items[0]];
  var totalItems = items.length - 2;
  var interval = Math.floor(totalItems / (n - 2));
  for (var i = 1; i < n - 1; i++) {
    elements.push(items[i * interval]);
  }
  elements.push(items[items.length - 1]);
  return elements;
}