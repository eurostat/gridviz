var utils = {};

utils.getCSV = function(url, callback) {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      try {
        var data = xmlhttp.responseText;
      } catch (err) {
        console.log(err.message + " in " + xmlhttp.responseText);
        return;
      }
      callback(data);
    }
  };
  xmlhttp.open("GET", url, true);
  xmlhttp.send();
};

utils.getRadianAngle = function(degreeValue) {
  return (degreeValue * Math.PI) / 180;
};

utils.parseCSV = function(str) {
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

utils.getColourValue = function(value, scale) {
  if (viewport.scaled < 8) {
    if (value > 100000) {
      return 0xff0f00; //red
    } else if (value < 100000 && value > 10000) {
      return 0xffce08; //orange
    } else if (value < 10000 && value > 5000) {
      return 0xebff0a; //yellow
    } else if (value < 5000 && value > 1000) {
      return 0x55e238; //green
    } else if (value < 1000 && value > 0) {
      return 0x005cff; //blue
    }
  } else if (viewport.scaled > 8) {
    if (value > 1000) {
      return 0xff0f00; //red
    } else if (value < 1000 && value > 100) {
      return 0xffce08; //orange
    } else if (value < 100 && value > 20) {
      return 0xebff0a; //yellow
    } else if (value < 20 && value > 10) {
      return 0x55e238; //green
    } else if (value < 10 && value > 0) {
      return 0x005cff; //blue
    }
  }
};

utils.splitArrayIntoChunks = function(arr, chunk_size) {
  arr
    .map(function(e, i) {
      if (i !== 0) {
        return i % chunk_size === 0 ? arr.slice(i, i + chunk_size) : null;
      }
    })
    .filter(function(e) {
      return e;
    });
};

utils.chunk = function(array, size) {
  const chunked_arr = [];
  for (let i = 0; i < array.length; i++) {
    const last = chunked_arr[chunked_arr.length - 1];
    if (!last || last.length === size) {
      chunked_arr.push([array[i]]);
    } else {
      last.push(array[i]);
    }
  }
  return chunked_arr;
};

utils.showLoading = function() {
  document.getElementById("loading-gif").style.display = "block";
};
utils.hideLoading = function() {
  document.getElementById("loading-gif").style.display = "none";
};
utils.clearStage = function() {
  var viewport = app.stage.children[0];
  for (var i = viewport.children.length - 1; i >= 0; i--) {
    viewport.removeChild(viewport.children[i]);
  }
};
utils.generateUniqueId = function() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};
