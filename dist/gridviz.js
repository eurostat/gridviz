(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["gridviz"] = factory();
	else
		root["gridviz"] = factory();
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/d3-array/src/ascending.js":
/*!************************************************!*\
  !*** ./node_modules/d3-array/src/ascending.js ***!
  \************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ascending)
/* harmony export */ });
function ascending(a, b) {
  return a == null || b == null ? NaN : a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
}


/***/ }),

/***/ "./node_modules/d3-array/src/bisect.js":
/*!*********************************************!*\
  !*** ./node_modules/d3-array/src/bisect.js ***!
  \*********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   bisectCenter: () => (/* binding */ bisectCenter),
/* harmony export */   bisectLeft: () => (/* binding */ bisectLeft),
/* harmony export */   bisectRight: () => (/* binding */ bisectRight),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ascending_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ascending.js */ "./node_modules/d3-array/src/ascending.js");
/* harmony import */ var _bisector_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bisector.js */ "./node_modules/d3-array/src/bisector.js");
/* harmony import */ var _number_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./number.js */ "./node_modules/d3-array/src/number.js");




const ascendingBisect = (0,_bisector_js__WEBPACK_IMPORTED_MODULE_0__["default"])(_ascending_js__WEBPACK_IMPORTED_MODULE_1__["default"]);
const bisectRight = ascendingBisect.right;
const bisectLeft = ascendingBisect.left;
const bisectCenter = (0,_bisector_js__WEBPACK_IMPORTED_MODULE_0__["default"])(_number_js__WEBPACK_IMPORTED_MODULE_2__["default"]).center;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (bisectRight);


/***/ }),

/***/ "./node_modules/d3-array/src/bisector.js":
/*!***********************************************!*\
  !*** ./node_modules/d3-array/src/bisector.js ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ bisector)
/* harmony export */ });
/* harmony import */ var _ascending_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ascending.js */ "./node_modules/d3-array/src/ascending.js");
/* harmony import */ var _descending_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./descending.js */ "./node_modules/d3-array/src/descending.js");



function bisector(f) {
  let compare1, compare2, delta;

  // If an accessor is specified, promote it to a comparator. In this case we
  // can test whether the search value is (self-) comparable. We can’t do this
  // for a comparator (except for specific, known comparators) because we can’t
  // tell if the comparator is symmetric, and an asymmetric comparator can’t be
  // used to test whether a single value is comparable.
  if (f.length !== 2) {
    compare1 = _ascending_js__WEBPACK_IMPORTED_MODULE_0__["default"];
    compare2 = (d, x) => (0,_ascending_js__WEBPACK_IMPORTED_MODULE_0__["default"])(f(d), x);
    delta = (d, x) => f(d) - x;
  } else {
    compare1 = f === _ascending_js__WEBPACK_IMPORTED_MODULE_0__["default"] || f === _descending_js__WEBPACK_IMPORTED_MODULE_1__["default"] ? f : zero;
    compare2 = f;
    delta = f;
  }

  function left(a, x, lo = 0, hi = a.length) {
    if (lo < hi) {
      if (compare1(x, x) !== 0) return hi;
      do {
        const mid = (lo + hi) >>> 1;
        if (compare2(a[mid], x) < 0) lo = mid + 1;
        else hi = mid;
      } while (lo < hi);
    }
    return lo;
  }

  function right(a, x, lo = 0, hi = a.length) {
    if (lo < hi) {
      if (compare1(x, x) !== 0) return hi;
      do {
        const mid = (lo + hi) >>> 1;
        if (compare2(a[mid], x) <= 0) lo = mid + 1;
        else hi = mid;
      } while (lo < hi);
    }
    return lo;
  }

  function center(a, x, lo = 0, hi = a.length) {
    const i = left(a, x, lo, hi - 1);
    return i > lo && delta(a[i - 1], x) > -delta(a[i], x) ? i - 1 : i;
  }

  return {left, center, right};
}

function zero() {
  return 0;
}


/***/ }),

/***/ "./node_modules/d3-array/src/descending.js":
/*!*************************************************!*\
  !*** ./node_modules/d3-array/src/descending.js ***!
  \*************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ descending)
/* harmony export */ });
function descending(a, b) {
  return a == null || b == null ? NaN
    : b < a ? -1
    : b > a ? 1
    : b >= a ? 0
    : NaN;
}


/***/ }),

/***/ "./node_modules/d3-array/src/extent.js":
/*!*********************************************!*\
  !*** ./node_modules/d3-array/src/extent.js ***!
  \*********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ extent)
/* harmony export */ });
function extent(values, valueof) {
  let min;
  let max;
  if (valueof === undefined) {
    for (const value of values) {
      if (value != null) {
        if (min === undefined) {
          if (value >= value) min = max = value;
        } else {
          if (min > value) min = value;
          if (max < value) max = value;
        }
      }
    }
  } else {
    let index = -1;
    for (let value of values) {
      if ((value = valueof(value, ++index, values)) != null) {
        if (min === undefined) {
          if (value >= value) min = max = value;
        } else {
          if (min > value) min = value;
          if (max < value) max = value;
        }
      }
    }
  }
  return [min, max];
}


/***/ }),

/***/ "./node_modules/d3-array/src/greatest.js":
/*!***********************************************!*\
  !*** ./node_modules/d3-array/src/greatest.js ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ greatest)
/* harmony export */ });
/* harmony import */ var _ascending_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ascending.js */ "./node_modules/d3-array/src/ascending.js");


function greatest(values, compare = _ascending_js__WEBPACK_IMPORTED_MODULE_0__["default"]) {
  let max;
  let defined = false;
  if (compare.length === 1) {
    let maxValue;
    for (const element of values) {
      const value = compare(element);
      if (defined
          ? (0,_ascending_js__WEBPACK_IMPORTED_MODULE_0__["default"])(value, maxValue) > 0
          : (0,_ascending_js__WEBPACK_IMPORTED_MODULE_0__["default"])(value, value) === 0) {
        max = element;
        maxValue = value;
        defined = true;
      }
    }
  } else {
    for (const value of values) {
      if (defined
          ? compare(value, max) > 0
          : compare(value, value) === 0) {
        max = value;
        defined = true;
      }
    }
  }
  return max;
}


/***/ }),

/***/ "./node_modules/d3-array/src/max.js":
/*!******************************************!*\
  !*** ./node_modules/d3-array/src/max.js ***!
  \******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ max)
/* harmony export */ });
function max(values, valueof) {
  let max;
  if (valueof === undefined) {
    for (const value of values) {
      if (value != null
          && (max < value || (max === undefined && value >= value))) {
        max = value;
      }
    }
  } else {
    let index = -1;
    for (let value of values) {
      if ((value = valueof(value, ++index, values)) != null
          && (max < value || (max === undefined && value >= value))) {
        max = value;
      }
    }
  }
  return max;
}


/***/ }),

/***/ "./node_modules/d3-array/src/maxIndex.js":
/*!***********************************************!*\
  !*** ./node_modules/d3-array/src/maxIndex.js ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ maxIndex)
/* harmony export */ });
function maxIndex(values, valueof) {
  let max;
  let maxIndex = -1;
  let index = -1;
  if (valueof === undefined) {
    for (const value of values) {
      ++index;
      if (value != null
          && (max < value || (max === undefined && value >= value))) {
        max = value, maxIndex = index;
      }
    }
  } else {
    for (let value of values) {
      if ((value = valueof(value, ++index, values)) != null
          && (max < value || (max === undefined && value >= value))) {
        max = value, maxIndex = index;
      }
    }
  }
  return maxIndex;
}


/***/ }),

/***/ "./node_modules/d3-array/src/min.js":
/*!******************************************!*\
  !*** ./node_modules/d3-array/src/min.js ***!
  \******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ min)
/* harmony export */ });
function min(values, valueof) {
  let min;
  if (valueof === undefined) {
    for (const value of values) {
      if (value != null
          && (min > value || (min === undefined && value >= value))) {
        min = value;
      }
    }
  } else {
    let index = -1;
    for (let value of values) {
      if ((value = valueof(value, ++index, values)) != null
          && (min > value || (min === undefined && value >= value))) {
        min = value;
      }
    }
  }
  return min;
}


/***/ }),

/***/ "./node_modules/d3-array/src/minIndex.js":
/*!***********************************************!*\
  !*** ./node_modules/d3-array/src/minIndex.js ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ minIndex)
/* harmony export */ });
function minIndex(values, valueof) {
  let min;
  let minIndex = -1;
  let index = -1;
  if (valueof === undefined) {
    for (const value of values) {
      ++index;
      if (value != null
          && (min > value || (min === undefined && value >= value))) {
        min = value, minIndex = index;
      }
    }
  } else {
    for (let value of values) {
      if ((value = valueof(value, ++index, values)) != null
          && (min > value || (min === undefined && value >= value))) {
        min = value, minIndex = index;
      }
    }
  }
  return minIndex;
}


/***/ }),

/***/ "./node_modules/d3-array/src/number.js":
/*!*********************************************!*\
  !*** ./node_modules/d3-array/src/number.js ***!
  \*********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ number),
/* harmony export */   numbers: () => (/* binding */ numbers)
/* harmony export */ });
function number(x) {
  return x === null ? NaN : +x;
}

function* numbers(values, valueof) {
  if (valueof === undefined) {
    for (let value of values) {
      if (value != null && (value = +value) >= value) {
        yield value;
      }
    }
  } else {
    let index = -1;
    for (let value of values) {
      if ((value = valueof(value, ++index, values)) != null && (value = +value) >= value) {
        yield value;
      }
    }
  }
}


/***/ }),

/***/ "./node_modules/d3-array/src/permute.js":
/*!**********************************************!*\
  !*** ./node_modules/d3-array/src/permute.js ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ permute)
/* harmony export */ });
function permute(source, keys) {
  return Array.from(keys, key => source[key]);
}


/***/ }),

/***/ "./node_modules/d3-array/src/quantile.js":
/*!***********************************************!*\
  !*** ./node_modules/d3-array/src/quantile.js ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ quantile),
/* harmony export */   quantileIndex: () => (/* binding */ quantileIndex),
/* harmony export */   quantileSorted: () => (/* binding */ quantileSorted)
/* harmony export */ });
/* harmony import */ var _max_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./max.js */ "./node_modules/d3-array/src/max.js");
/* harmony import */ var _maxIndex_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./maxIndex.js */ "./node_modules/d3-array/src/maxIndex.js");
/* harmony import */ var _min_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./min.js */ "./node_modules/d3-array/src/min.js");
/* harmony import */ var _minIndex_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./minIndex.js */ "./node_modules/d3-array/src/minIndex.js");
/* harmony import */ var _quickselect_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./quickselect.js */ "./node_modules/d3-array/src/quickselect.js");
/* harmony import */ var _number_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./number.js */ "./node_modules/d3-array/src/number.js");
/* harmony import */ var _sort_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./sort.js */ "./node_modules/d3-array/src/sort.js");
/* harmony import */ var _greatest_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./greatest.js */ "./node_modules/d3-array/src/greatest.js");









function quantile(values, p, valueof) {
  values = Float64Array.from((0,_number_js__WEBPACK_IMPORTED_MODULE_0__.numbers)(values, valueof));
  if (!(n = values.length) || isNaN(p = +p)) return;
  if (p <= 0 || n < 2) return (0,_min_js__WEBPACK_IMPORTED_MODULE_1__["default"])(values);
  if (p >= 1) return (0,_max_js__WEBPACK_IMPORTED_MODULE_2__["default"])(values);
  var n,
      i = (n - 1) * p,
      i0 = Math.floor(i),
      value0 = (0,_max_js__WEBPACK_IMPORTED_MODULE_2__["default"])((0,_quickselect_js__WEBPACK_IMPORTED_MODULE_3__["default"])(values, i0).subarray(0, i0 + 1)),
      value1 = (0,_min_js__WEBPACK_IMPORTED_MODULE_1__["default"])(values.subarray(i0 + 1));
  return value0 + (value1 - value0) * (i - i0);
}

function quantileSorted(values, p, valueof = _number_js__WEBPACK_IMPORTED_MODULE_0__["default"]) {
  if (!(n = values.length) || isNaN(p = +p)) return;
  if (p <= 0 || n < 2) return +valueof(values[0], 0, values);
  if (p >= 1) return +valueof(values[n - 1], n - 1, values);
  var n,
      i = (n - 1) * p,
      i0 = Math.floor(i),
      value0 = +valueof(values[i0], i0, values),
      value1 = +valueof(values[i0 + 1], i0 + 1, values);
  return value0 + (value1 - value0) * (i - i0);
}

function quantileIndex(values, p, valueof = _number_js__WEBPACK_IMPORTED_MODULE_0__["default"]) {
  if (isNaN(p = +p)) return;
  numbers = Float64Array.from(values, (_, i) => (0,_number_js__WEBPACK_IMPORTED_MODULE_0__["default"])(valueof(values[i], i, values)));
  if (p <= 0) return (0,_minIndex_js__WEBPACK_IMPORTED_MODULE_4__["default"])(numbers);
  if (p >= 1) return (0,_maxIndex_js__WEBPACK_IMPORTED_MODULE_5__["default"])(numbers);
  var numbers,
      index = Uint32Array.from(values, (_, i) => i),
      j = numbers.length - 1,
      i = Math.floor(j * p);
  (0,_quickselect_js__WEBPACK_IMPORTED_MODULE_3__["default"])(index, i, 0, j, (i, j) => (0,_sort_js__WEBPACK_IMPORTED_MODULE_6__.ascendingDefined)(numbers[i], numbers[j]));
  i = (0,_greatest_js__WEBPACK_IMPORTED_MODULE_7__["default"])(index.subarray(0, i + 1), (i) => numbers[i]);
  return i >= 0 ? i : -1;
}


/***/ }),

/***/ "./node_modules/d3-array/src/quickselect.js":
/*!**************************************************!*\
  !*** ./node_modules/d3-array/src/quickselect.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ quickselect)
/* harmony export */ });
/* harmony import */ var _sort_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sort.js */ "./node_modules/d3-array/src/sort.js");


// Based on https://github.com/mourner/quickselect
// ISC license, Copyright 2018 Vladimir Agafonkin.
function quickselect(array, k, left = 0, right = Infinity, compare) {
  k = Math.floor(k);
  left = Math.floor(Math.max(0, left));
  right = Math.floor(Math.min(array.length - 1, right));

  if (!(left <= k && k <= right)) return array;

  compare = compare === undefined ? _sort_js__WEBPACK_IMPORTED_MODULE_0__.ascendingDefined : (0,_sort_js__WEBPACK_IMPORTED_MODULE_0__.compareDefined)(compare);

  while (right > left) {
    if (right - left > 600) {
      const n = right - left + 1;
      const m = k - left + 1;
      const z = Math.log(n);
      const s = 0.5 * Math.exp(2 * z / 3);
      const sd = 0.5 * Math.sqrt(z * s * (n - s) / n) * (m - n / 2 < 0 ? -1 : 1);
      const newLeft = Math.max(left, Math.floor(k - m * s / n + sd));
      const newRight = Math.min(right, Math.floor(k + (n - m) * s / n + sd));
      quickselect(array, k, newLeft, newRight, compare);
    }

    const t = array[k];
    let i = left;
    let j = right;

    swap(array, left, k);
    if (compare(array[right], t) > 0) swap(array, left, right);

    while (i < j) {
      swap(array, i, j), ++i, --j;
      while (compare(array[i], t) < 0) ++i;
      while (compare(array[j], t) > 0) --j;
    }

    if (compare(array[left], t) === 0) swap(array, left, j);
    else ++j, swap(array, j, right);

    if (j <= k) left = j + 1;
    if (k <= j) right = j - 1;
  }

  return array;
}

function swap(array, i, j) {
  const t = array[i];
  array[i] = array[j];
  array[j] = t;
}


/***/ }),

/***/ "./node_modules/d3-array/src/sort.js":
/*!*******************************************!*\
  !*** ./node_modules/d3-array/src/sort.js ***!
  \*******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ascendingDefined: () => (/* binding */ ascendingDefined),
/* harmony export */   compareDefined: () => (/* binding */ compareDefined),
/* harmony export */   "default": () => (/* binding */ sort)
/* harmony export */ });
/* harmony import */ var _ascending_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ascending.js */ "./node_modules/d3-array/src/ascending.js");
/* harmony import */ var _permute_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./permute.js */ "./node_modules/d3-array/src/permute.js");



function sort(values, ...F) {
  if (typeof values[Symbol.iterator] !== "function") throw new TypeError("values is not iterable");
  values = Array.from(values);
  let [f] = F;
  if ((f && f.length !== 2) || F.length > 1) {
    const index = Uint32Array.from(values, (d, i) => i);
    if (F.length > 1) {
      F = F.map(f => values.map(f));
      index.sort((i, j) => {
        for (const f of F) {
          const c = ascendingDefined(f[i], f[j]);
          if (c) return c;
        }
      });
    } else {
      f = values.map(f);
      index.sort((i, j) => ascendingDefined(f[i], f[j]));
    }
    return (0,_permute_js__WEBPACK_IMPORTED_MODULE_0__["default"])(values, index);
  }
  return values.sort(compareDefined(f));
}

function compareDefined(compare = _ascending_js__WEBPACK_IMPORTED_MODULE_1__["default"]) {
  if (compare === _ascending_js__WEBPACK_IMPORTED_MODULE_1__["default"]) return ascendingDefined;
  if (typeof compare !== "function") throw new TypeError("compare is not a function");
  return (a, b) => {
    const x = compare(a, b);
    if (x || x === 0) return x;
    return (compare(b, b) === 0) - (compare(a, a) === 0);
  };
}

function ascendingDefined(a, b) {
  return (a == null || !(a >= a)) - (b == null || !(b >= b)) || (a < b ? -1 : a > b ? 1 : 0);
}


/***/ }),

/***/ "./node_modules/d3-color/src/color.js":
/*!********************************************!*\
  !*** ./node_modules/d3-color/src/color.js ***!
  \********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Color: () => (/* binding */ Color),
/* harmony export */   Rgb: () => (/* binding */ Rgb),
/* harmony export */   brighter: () => (/* binding */ brighter),
/* harmony export */   darker: () => (/* binding */ darker),
/* harmony export */   "default": () => (/* binding */ color),
/* harmony export */   hsl: () => (/* binding */ hsl),
/* harmony export */   hslConvert: () => (/* binding */ hslConvert),
/* harmony export */   rgb: () => (/* binding */ rgb),
/* harmony export */   rgbConvert: () => (/* binding */ rgbConvert)
/* harmony export */ });
/* harmony import */ var _define_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./define.js */ "./node_modules/d3-color/src/define.js");


function Color() {}

var darker = 0.7;
var brighter = 1 / darker;

var reI = "\\s*([+-]?\\d+)\\s*",
    reN = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",
    reP = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
    reHex = /^#([0-9a-f]{3,8})$/,
    reRgbInteger = new RegExp(`^rgb\\(${reI},${reI},${reI}\\)$`),
    reRgbPercent = new RegExp(`^rgb\\(${reP},${reP},${reP}\\)$`),
    reRgbaInteger = new RegExp(`^rgba\\(${reI},${reI},${reI},${reN}\\)$`),
    reRgbaPercent = new RegExp(`^rgba\\(${reP},${reP},${reP},${reN}\\)$`),
    reHslPercent = new RegExp(`^hsl\\(${reN},${reP},${reP}\\)$`),
    reHslaPercent = new RegExp(`^hsla\\(${reN},${reP},${reP},${reN}\\)$`);

var named = {
  aliceblue: 0xf0f8ff,
  antiquewhite: 0xfaebd7,
  aqua: 0x00ffff,
  aquamarine: 0x7fffd4,
  azure: 0xf0ffff,
  beige: 0xf5f5dc,
  bisque: 0xffe4c4,
  black: 0x000000,
  blanchedalmond: 0xffebcd,
  blue: 0x0000ff,
  blueviolet: 0x8a2be2,
  brown: 0xa52a2a,
  burlywood: 0xdeb887,
  cadetblue: 0x5f9ea0,
  chartreuse: 0x7fff00,
  chocolate: 0xd2691e,
  coral: 0xff7f50,
  cornflowerblue: 0x6495ed,
  cornsilk: 0xfff8dc,
  crimson: 0xdc143c,
  cyan: 0x00ffff,
  darkblue: 0x00008b,
  darkcyan: 0x008b8b,
  darkgoldenrod: 0xb8860b,
  darkgray: 0xa9a9a9,
  darkgreen: 0x006400,
  darkgrey: 0xa9a9a9,
  darkkhaki: 0xbdb76b,
  darkmagenta: 0x8b008b,
  darkolivegreen: 0x556b2f,
  darkorange: 0xff8c00,
  darkorchid: 0x9932cc,
  darkred: 0x8b0000,
  darksalmon: 0xe9967a,
  darkseagreen: 0x8fbc8f,
  darkslateblue: 0x483d8b,
  darkslategray: 0x2f4f4f,
  darkslategrey: 0x2f4f4f,
  darkturquoise: 0x00ced1,
  darkviolet: 0x9400d3,
  deeppink: 0xff1493,
  deepskyblue: 0x00bfff,
  dimgray: 0x696969,
  dimgrey: 0x696969,
  dodgerblue: 0x1e90ff,
  firebrick: 0xb22222,
  floralwhite: 0xfffaf0,
  forestgreen: 0x228b22,
  fuchsia: 0xff00ff,
  gainsboro: 0xdcdcdc,
  ghostwhite: 0xf8f8ff,
  gold: 0xffd700,
  goldenrod: 0xdaa520,
  gray: 0x808080,
  green: 0x008000,
  greenyellow: 0xadff2f,
  grey: 0x808080,
  honeydew: 0xf0fff0,
  hotpink: 0xff69b4,
  indianred: 0xcd5c5c,
  indigo: 0x4b0082,
  ivory: 0xfffff0,
  khaki: 0xf0e68c,
  lavender: 0xe6e6fa,
  lavenderblush: 0xfff0f5,
  lawngreen: 0x7cfc00,
  lemonchiffon: 0xfffacd,
  lightblue: 0xadd8e6,
  lightcoral: 0xf08080,
  lightcyan: 0xe0ffff,
  lightgoldenrodyellow: 0xfafad2,
  lightgray: 0xd3d3d3,
  lightgreen: 0x90ee90,
  lightgrey: 0xd3d3d3,
  lightpink: 0xffb6c1,
  lightsalmon: 0xffa07a,
  lightseagreen: 0x20b2aa,
  lightskyblue: 0x87cefa,
  lightslategray: 0x778899,
  lightslategrey: 0x778899,
  lightsteelblue: 0xb0c4de,
  lightyellow: 0xffffe0,
  lime: 0x00ff00,
  limegreen: 0x32cd32,
  linen: 0xfaf0e6,
  magenta: 0xff00ff,
  maroon: 0x800000,
  mediumaquamarine: 0x66cdaa,
  mediumblue: 0x0000cd,
  mediumorchid: 0xba55d3,
  mediumpurple: 0x9370db,
  mediumseagreen: 0x3cb371,
  mediumslateblue: 0x7b68ee,
  mediumspringgreen: 0x00fa9a,
  mediumturquoise: 0x48d1cc,
  mediumvioletred: 0xc71585,
  midnightblue: 0x191970,
  mintcream: 0xf5fffa,
  mistyrose: 0xffe4e1,
  moccasin: 0xffe4b5,
  navajowhite: 0xffdead,
  navy: 0x000080,
  oldlace: 0xfdf5e6,
  olive: 0x808000,
  olivedrab: 0x6b8e23,
  orange: 0xffa500,
  orangered: 0xff4500,
  orchid: 0xda70d6,
  palegoldenrod: 0xeee8aa,
  palegreen: 0x98fb98,
  paleturquoise: 0xafeeee,
  palevioletred: 0xdb7093,
  papayawhip: 0xffefd5,
  peachpuff: 0xffdab9,
  peru: 0xcd853f,
  pink: 0xffc0cb,
  plum: 0xdda0dd,
  powderblue: 0xb0e0e6,
  purple: 0x800080,
  rebeccapurple: 0x663399,
  red: 0xff0000,
  rosybrown: 0xbc8f8f,
  royalblue: 0x4169e1,
  saddlebrown: 0x8b4513,
  salmon: 0xfa8072,
  sandybrown: 0xf4a460,
  seagreen: 0x2e8b57,
  seashell: 0xfff5ee,
  sienna: 0xa0522d,
  silver: 0xc0c0c0,
  skyblue: 0x87ceeb,
  slateblue: 0x6a5acd,
  slategray: 0x708090,
  slategrey: 0x708090,
  snow: 0xfffafa,
  springgreen: 0x00ff7f,
  steelblue: 0x4682b4,
  tan: 0xd2b48c,
  teal: 0x008080,
  thistle: 0xd8bfd8,
  tomato: 0xff6347,
  turquoise: 0x40e0d0,
  violet: 0xee82ee,
  wheat: 0xf5deb3,
  white: 0xffffff,
  whitesmoke: 0xf5f5f5,
  yellow: 0xffff00,
  yellowgreen: 0x9acd32
};

(0,_define_js__WEBPACK_IMPORTED_MODULE_0__["default"])(Color, color, {
  copy(channels) {
    return Object.assign(new this.constructor, this, channels);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: color_formatHex, // Deprecated! Use color.formatHex.
  formatHex: color_formatHex,
  formatHex8: color_formatHex8,
  formatHsl: color_formatHsl,
  formatRgb: color_formatRgb,
  toString: color_formatRgb
});

function color_formatHex() {
  return this.rgb().formatHex();
}

function color_formatHex8() {
  return this.rgb().formatHex8();
}

function color_formatHsl() {
  return hslConvert(this).formatHsl();
}

function color_formatRgb() {
  return this.rgb().formatRgb();
}

function color(format) {
  var m, l;
  format = (format + "").trim().toLowerCase();
  return (m = reHex.exec(format)) ? (l = m[1].length, m = parseInt(m[1], 16), l === 6 ? rgbn(m) // #ff0000
      : l === 3 ? new Rgb((m >> 8 & 0xf) | (m >> 4 & 0xf0), (m >> 4 & 0xf) | (m & 0xf0), ((m & 0xf) << 4) | (m & 0xf), 1) // #f00
      : l === 8 ? rgba(m >> 24 & 0xff, m >> 16 & 0xff, m >> 8 & 0xff, (m & 0xff) / 0xff) // #ff000000
      : l === 4 ? rgba((m >> 12 & 0xf) | (m >> 8 & 0xf0), (m >> 8 & 0xf) | (m >> 4 & 0xf0), (m >> 4 & 0xf) | (m & 0xf0), (((m & 0xf) << 4) | (m & 0xf)) / 0xff) // #f000
      : null) // invalid hex
      : (m = reRgbInteger.exec(format)) ? new Rgb(m[1], m[2], m[3], 1) // rgb(255, 0, 0)
      : (m = reRgbPercent.exec(format)) ? new Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) // rgb(100%, 0%, 0%)
      : (m = reRgbaInteger.exec(format)) ? rgba(m[1], m[2], m[3], m[4]) // rgba(255, 0, 0, 1)
      : (m = reRgbaPercent.exec(format)) ? rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) // rgb(100%, 0%, 0%, 1)
      : (m = reHslPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, 1) // hsl(120, 50%, 50%)
      : (m = reHslaPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, m[4]) // hsla(120, 50%, 50%, 1)
      : named.hasOwnProperty(format) ? rgbn(named[format]) // eslint-disable-line no-prototype-builtins
      : format === "transparent" ? new Rgb(NaN, NaN, NaN, 0)
      : null;
}

function rgbn(n) {
  return new Rgb(n >> 16 & 0xff, n >> 8 & 0xff, n & 0xff, 1);
}

function rgba(r, g, b, a) {
  if (a <= 0) r = g = b = NaN;
  return new Rgb(r, g, b, a);
}

function rgbConvert(o) {
  if (!(o instanceof Color)) o = color(o);
  if (!o) return new Rgb;
  o = o.rgb();
  return new Rgb(o.r, o.g, o.b, o.opacity);
}

function rgb(r, g, b, opacity) {
  return arguments.length === 1 ? rgbConvert(r) : new Rgb(r, g, b, opacity == null ? 1 : opacity);
}

function Rgb(r, g, b, opacity) {
  this.r = +r;
  this.g = +g;
  this.b = +b;
  this.opacity = +opacity;
}

(0,_define_js__WEBPACK_IMPORTED_MODULE_0__["default"])(Rgb, rgb, (0,_define_js__WEBPACK_IMPORTED_MODULE_0__.extend)(Color, {
  brighter(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  darker(k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new Rgb(clampi(this.r), clampi(this.g), clampi(this.b), clampa(this.opacity));
  },
  displayable() {
    return (-0.5 <= this.r && this.r < 255.5)
        && (-0.5 <= this.g && this.g < 255.5)
        && (-0.5 <= this.b && this.b < 255.5)
        && (0 <= this.opacity && this.opacity <= 1);
  },
  hex: rgb_formatHex, // Deprecated! Use color.formatHex.
  formatHex: rgb_formatHex,
  formatHex8: rgb_formatHex8,
  formatRgb: rgb_formatRgb,
  toString: rgb_formatRgb
}));

function rgb_formatHex() {
  return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}`;
}

function rgb_formatHex8() {
  return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}${hex((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}

function rgb_formatRgb() {
  const a = clampa(this.opacity);
  return `${a === 1 ? "rgb(" : "rgba("}${clampi(this.r)}, ${clampi(this.g)}, ${clampi(this.b)}${a === 1 ? ")" : `, ${a})`}`;
}

function clampa(opacity) {
  return isNaN(opacity) ? 1 : Math.max(0, Math.min(1, opacity));
}

function clampi(value) {
  return Math.max(0, Math.min(255, Math.round(value) || 0));
}

function hex(value) {
  value = clampi(value);
  return (value < 16 ? "0" : "") + value.toString(16);
}

function hsla(h, s, l, a) {
  if (a <= 0) h = s = l = NaN;
  else if (l <= 0 || l >= 1) h = s = NaN;
  else if (s <= 0) h = NaN;
  return new Hsl(h, s, l, a);
}

function hslConvert(o) {
  if (o instanceof Hsl) return new Hsl(o.h, o.s, o.l, o.opacity);
  if (!(o instanceof Color)) o = color(o);
  if (!o) return new Hsl;
  if (o instanceof Hsl) return o;
  o = o.rgb();
  var r = o.r / 255,
      g = o.g / 255,
      b = o.b / 255,
      min = Math.min(r, g, b),
      max = Math.max(r, g, b),
      h = NaN,
      s = max - min,
      l = (max + min) / 2;
  if (s) {
    if (r === max) h = (g - b) / s + (g < b) * 6;
    else if (g === max) h = (b - r) / s + 2;
    else h = (r - g) / s + 4;
    s /= l < 0.5 ? max + min : 2 - max - min;
    h *= 60;
  } else {
    s = l > 0 && l < 1 ? 0 : h;
  }
  return new Hsl(h, s, l, o.opacity);
}

function hsl(h, s, l, opacity) {
  return arguments.length === 1 ? hslConvert(h) : new Hsl(h, s, l, opacity == null ? 1 : opacity);
}

function Hsl(h, s, l, opacity) {
  this.h = +h;
  this.s = +s;
  this.l = +l;
  this.opacity = +opacity;
}

(0,_define_js__WEBPACK_IMPORTED_MODULE_0__["default"])(Hsl, hsl, (0,_define_js__WEBPACK_IMPORTED_MODULE_0__.extend)(Color, {
  brighter(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  darker(k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  rgb() {
    var h = this.h % 360 + (this.h < 0) * 360,
        s = isNaN(h) || isNaN(this.s) ? 0 : this.s,
        l = this.l,
        m2 = l + (l < 0.5 ? l : 1 - l) * s,
        m1 = 2 * l - m2;
    return new Rgb(
      hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2),
      hsl2rgb(h, m1, m2),
      hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2),
      this.opacity
    );
  },
  clamp() {
    return new Hsl(clamph(this.h), clampt(this.s), clampt(this.l), clampa(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s))
        && (0 <= this.l && this.l <= 1)
        && (0 <= this.opacity && this.opacity <= 1);
  },
  formatHsl() {
    const a = clampa(this.opacity);
    return `${a === 1 ? "hsl(" : "hsla("}${clamph(this.h)}, ${clampt(this.s) * 100}%, ${clampt(this.l) * 100}%${a === 1 ? ")" : `, ${a})`}`;
  }
}));

function clamph(value) {
  value = (value || 0) % 360;
  return value < 0 ? value + 360 : value;
}

function clampt(value) {
  return Math.max(0, Math.min(1, value || 0));
}

/* From FvD 13.37, CSS Color Module Level 3 */
function hsl2rgb(h, m1, m2) {
  return (h < 60 ? m1 + (m2 - m1) * h / 60
      : h < 180 ? m2
      : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60
      : m1) * 255;
}


/***/ }),

/***/ "./node_modules/d3-color/src/define.js":
/*!*********************************************!*\
  !*** ./node_modules/d3-color/src/define.js ***!
  \*********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   extend: () => (/* binding */ extend)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(constructor, factory, prototype) {
  constructor.prototype = factory.prototype = prototype;
  prototype.constructor = constructor;
}

function extend(parent, definition) {
  var prototype = Object.create(parent.prototype);
  for (var key in definition) prototype[key] = definition[key];
  return prototype;
}


/***/ }),

/***/ "./node_modules/d3-dsv/src/csv.js":
/*!****************************************!*\
  !*** ./node_modules/d3-dsv/src/csv.js ***!
  \****************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   csvFormat: () => (/* binding */ csvFormat),
/* harmony export */   csvFormatBody: () => (/* binding */ csvFormatBody),
/* harmony export */   csvFormatRow: () => (/* binding */ csvFormatRow),
/* harmony export */   csvFormatRows: () => (/* binding */ csvFormatRows),
/* harmony export */   csvFormatValue: () => (/* binding */ csvFormatValue),
/* harmony export */   csvParse: () => (/* binding */ csvParse),
/* harmony export */   csvParseRows: () => (/* binding */ csvParseRows)
/* harmony export */ });
/* harmony import */ var _dsv_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dsv.js */ "./node_modules/d3-dsv/src/dsv.js");


var csv = (0,_dsv_js__WEBPACK_IMPORTED_MODULE_0__["default"])(",");

var csvParse = csv.parse;
var csvParseRows = csv.parseRows;
var csvFormat = csv.format;
var csvFormatBody = csv.formatBody;
var csvFormatRows = csv.formatRows;
var csvFormatRow = csv.formatRow;
var csvFormatValue = csv.formatValue;


/***/ }),

/***/ "./node_modules/d3-dsv/src/dsv.js":
/*!****************************************!*\
  !*** ./node_modules/d3-dsv/src/dsv.js ***!
  \****************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var EOL = {},
    EOF = {},
    QUOTE = 34,
    NEWLINE = 10,
    RETURN = 13;

function objectConverter(columns) {
  return new Function("d", "return {" + columns.map(function(name, i) {
    return JSON.stringify(name) + ": d[" + i + "] || \"\"";
  }).join(",") + "}");
}

function customConverter(columns, f) {
  var object = objectConverter(columns);
  return function(row, i) {
    return f(object(row), i, columns);
  };
}

// Compute unique columns in order of discovery.
function inferColumns(rows) {
  var columnSet = Object.create(null),
      columns = [];

  rows.forEach(function(row) {
    for (var column in row) {
      if (!(column in columnSet)) {
        columns.push(columnSet[column] = column);
      }
    }
  });

  return columns;
}

function pad(value, width) {
  var s = value + "", length = s.length;
  return length < width ? new Array(width - length + 1).join(0) + s : s;
}

function formatYear(year) {
  return year < 0 ? "-" + pad(-year, 6)
    : year > 9999 ? "+" + pad(year, 6)
    : pad(year, 4);
}

function formatDate(date) {
  var hours = date.getUTCHours(),
      minutes = date.getUTCMinutes(),
      seconds = date.getUTCSeconds(),
      milliseconds = date.getUTCMilliseconds();
  return isNaN(date) ? "Invalid Date"
      : formatYear(date.getUTCFullYear(), 4) + "-" + pad(date.getUTCMonth() + 1, 2) + "-" + pad(date.getUTCDate(), 2)
      + (milliseconds ? "T" + pad(hours, 2) + ":" + pad(minutes, 2) + ":" + pad(seconds, 2) + "." + pad(milliseconds, 3) + "Z"
      : seconds ? "T" + pad(hours, 2) + ":" + pad(minutes, 2) + ":" + pad(seconds, 2) + "Z"
      : minutes || hours ? "T" + pad(hours, 2) + ":" + pad(minutes, 2) + "Z"
      : "");
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(delimiter) {
  var reFormat = new RegExp("[\"" + delimiter + "\n\r]"),
      DELIMITER = delimiter.charCodeAt(0);

  function parse(text, f) {
    var convert, columns, rows = parseRows(text, function(row, i) {
      if (convert) return convert(row, i - 1);
      columns = row, convert = f ? customConverter(row, f) : objectConverter(row);
    });
    rows.columns = columns || [];
    return rows;
  }

  function parseRows(text, f) {
    var rows = [], // output rows
        N = text.length,
        I = 0, // current character index
        n = 0, // current line number
        t, // current token
        eof = N <= 0, // current token followed by EOF?
        eol = false; // current token followed by EOL?

    // Strip the trailing newline.
    if (text.charCodeAt(N - 1) === NEWLINE) --N;
    if (text.charCodeAt(N - 1) === RETURN) --N;

    function token() {
      if (eof) return EOF;
      if (eol) return eol = false, EOL;

      // Unescape quotes.
      var i, j = I, c;
      if (text.charCodeAt(j) === QUOTE) {
        while (I++ < N && text.charCodeAt(I) !== QUOTE || text.charCodeAt(++I) === QUOTE);
        if ((i = I) >= N) eof = true;
        else if ((c = text.charCodeAt(I++)) === NEWLINE) eol = true;
        else if (c === RETURN) { eol = true; if (text.charCodeAt(I) === NEWLINE) ++I; }
        return text.slice(j + 1, i - 1).replace(/""/g, "\"");
      }

      // Find next delimiter or newline.
      while (I < N) {
        if ((c = text.charCodeAt(i = I++)) === NEWLINE) eol = true;
        else if (c === RETURN) { eol = true; if (text.charCodeAt(I) === NEWLINE) ++I; }
        else if (c !== DELIMITER) continue;
        return text.slice(j, i);
      }

      // Return last token before EOF.
      return eof = true, text.slice(j, N);
    }

    while ((t = token()) !== EOF) {
      var row = [];
      while (t !== EOL && t !== EOF) row.push(t), t = token();
      if (f && (row = f(row, n++)) == null) continue;
      rows.push(row);
    }

    return rows;
  }

  function preformatBody(rows, columns) {
    return rows.map(function(row) {
      return columns.map(function(column) {
        return formatValue(row[column]);
      }).join(delimiter);
    });
  }

  function format(rows, columns) {
    if (columns == null) columns = inferColumns(rows);
    return [columns.map(formatValue).join(delimiter)].concat(preformatBody(rows, columns)).join("\n");
  }

  function formatBody(rows, columns) {
    if (columns == null) columns = inferColumns(rows);
    return preformatBody(rows, columns).join("\n");
  }

  function formatRows(rows) {
    return rows.map(formatRow).join("\n");
  }

  function formatRow(row) {
    return row.map(formatValue).join(delimiter);
  }

  function formatValue(value) {
    return value == null ? ""
        : value instanceof Date ? formatDate(value)
        : reFormat.test(value += "") ? "\"" + value.replace(/"/g, "\"\"") + "\""
        : value;
  }

  return {
    parse: parse,
    parseRows: parseRows,
    format: format,
    formatBody: formatBody,
    formatRows: formatRows,
    formatRow: formatRow,
    formatValue: formatValue
  };
}


/***/ }),

/***/ "./node_modules/d3-dsv/src/tsv.js":
/*!****************************************!*\
  !*** ./node_modules/d3-dsv/src/tsv.js ***!
  \****************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   tsvFormat: () => (/* binding */ tsvFormat),
/* harmony export */   tsvFormatBody: () => (/* binding */ tsvFormatBody),
/* harmony export */   tsvFormatRow: () => (/* binding */ tsvFormatRow),
/* harmony export */   tsvFormatRows: () => (/* binding */ tsvFormatRows),
/* harmony export */   tsvFormatValue: () => (/* binding */ tsvFormatValue),
/* harmony export */   tsvParse: () => (/* binding */ tsvParse),
/* harmony export */   tsvParseRows: () => (/* binding */ tsvParseRows)
/* harmony export */ });
/* harmony import */ var _dsv_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dsv.js */ "./node_modules/d3-dsv/src/dsv.js");


var tsv = (0,_dsv_js__WEBPACK_IMPORTED_MODULE_0__["default"])("\t");

var tsvParse = tsv.parse;
var tsvParseRows = tsv.parseRows;
var tsvFormat = tsv.format;
var tsvFormatBody = tsv.formatBody;
var tsvFormatRows = tsv.formatRows;
var tsvFormatRow = tsv.formatRow;
var tsvFormatValue = tsv.formatValue;


/***/ }),

/***/ "./node_modules/d3-fetch/src/dsv.js":
/*!******************************************!*\
  !*** ./node_modules/d3-fetch/src/dsv.js ***!
  \******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   csv: () => (/* binding */ csv),
/* harmony export */   "default": () => (/* binding */ dsv),
/* harmony export */   tsv: () => (/* binding */ tsv)
/* harmony export */ });
/* harmony import */ var d3_dsv__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-dsv */ "./node_modules/d3-dsv/src/dsv.js");
/* harmony import */ var d3_dsv__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! d3-dsv */ "./node_modules/d3-dsv/src/csv.js");
/* harmony import */ var d3_dsv__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! d3-dsv */ "./node_modules/d3-dsv/src/tsv.js");
/* harmony import */ var _text_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./text.js */ "./node_modules/d3-fetch/src/text.js");



function dsvParse(parse) {
  return function(input, init, row) {
    if (arguments.length === 2 && typeof init === "function") row = init, init = undefined;
    return (0,_text_js__WEBPACK_IMPORTED_MODULE_0__["default"])(input, init).then(function(response) {
      return parse(response, row);
    });
  };
}

function dsv(delimiter, input, init, row) {
  if (arguments.length === 3 && typeof init === "function") row = init, init = undefined;
  var format = (0,d3_dsv__WEBPACK_IMPORTED_MODULE_1__["default"])(delimiter);
  return (0,_text_js__WEBPACK_IMPORTED_MODULE_0__["default"])(input, init).then(function(response) {
    return format.parse(response, row);
  });
}

var csv = dsvParse(d3_dsv__WEBPACK_IMPORTED_MODULE_2__.csvParse);
var tsv = dsvParse(d3_dsv__WEBPACK_IMPORTED_MODULE_3__.tsvParse);


/***/ }),

/***/ "./node_modules/d3-fetch/src/json.js":
/*!*******************************************!*\
  !*** ./node_modules/d3-fetch/src/json.js ***!
  \*******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function responseJson(response) {
  if (!response.ok) throw new Error(response.status + " " + response.statusText);
  if (response.status === 204 || response.status === 205) return;
  return response.json();
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(input, init) {
  return fetch(input, init).then(responseJson);
}


/***/ }),

/***/ "./node_modules/d3-fetch/src/text.js":
/*!*******************************************!*\
  !*** ./node_modules/d3-fetch/src/text.js ***!
  \*******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function responseText(response) {
  if (!response.ok) throw new Error(response.status + " " + response.statusText);
  return response.text();
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(input, init) {
  return fetch(input, init).then(responseText);
}


/***/ }),

/***/ "./node_modules/d3-format/src/defaultLocale.js":
/*!*****************************************************!*\
  !*** ./node_modules/d3-format/src/defaultLocale.js ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ defaultLocale),
/* harmony export */   format: () => (/* binding */ format),
/* harmony export */   formatPrefix: () => (/* binding */ formatPrefix)
/* harmony export */ });
/* harmony import */ var _locale_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./locale.js */ "./node_modules/d3-format/src/locale.js");


var locale;
var format;
var formatPrefix;

defaultLocale({
  thousands: ",",
  grouping: [3],
  currency: ["$", ""]
});

function defaultLocale(definition) {
  locale = (0,_locale_js__WEBPACK_IMPORTED_MODULE_0__["default"])(definition);
  format = locale.format;
  formatPrefix = locale.formatPrefix;
  return locale;
}


/***/ }),

/***/ "./node_modules/d3-format/src/exponent.js":
/*!************************************************!*\
  !*** ./node_modules/d3-format/src/exponent.js ***!
  \************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _formatDecimal_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./formatDecimal.js */ "./node_modules/d3-format/src/formatDecimal.js");


/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(x) {
  return x = (0,_formatDecimal_js__WEBPACK_IMPORTED_MODULE_0__.formatDecimalParts)(Math.abs(x)), x ? x[1] : NaN;
}


/***/ }),

/***/ "./node_modules/d3-format/src/formatDecimal.js":
/*!*****************************************************!*\
  !*** ./node_modules/d3-format/src/formatDecimal.js ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   formatDecimalParts: () => (/* binding */ formatDecimalParts)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(x) {
  return Math.abs(x = Math.round(x)) >= 1e21
      ? x.toLocaleString("en").replace(/,/g, "")
      : x.toString(10);
}

// Computes the decimal coefficient and exponent of the specified number x with
// significant digits p, where x is positive and p is in [1, 21] or undefined.
// For example, formatDecimalParts(1.23) returns ["123", 0].
function formatDecimalParts(x, p) {
  if ((i = (x = p ? x.toExponential(p - 1) : x.toExponential()).indexOf("e")) < 0) return null; // NaN, ±Infinity
  var i, coefficient = x.slice(0, i);

  // The string returned by toExponential either has the form \d\.\d+e[-+]\d+
  // (e.g., 1.2e+3) or the form \de[-+]\d+ (e.g., 1e+3).
  return [
    coefficient.length > 1 ? coefficient[0] + coefficient.slice(2) : coefficient,
    +x.slice(i + 1)
  ];
}


/***/ }),

/***/ "./node_modules/d3-format/src/formatGroup.js":
/*!***************************************************!*\
  !*** ./node_modules/d3-format/src/formatGroup.js ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(grouping, thousands) {
  return function(value, width) {
    var i = value.length,
        t = [],
        j = 0,
        g = grouping[0],
        length = 0;

    while (i > 0 && g > 0) {
      if (length + g + 1 > width) g = Math.max(1, width - length);
      t.push(value.substring(i -= g, i + g));
      if ((length += g + 1) > width) break;
      g = grouping[j = (j + 1) % grouping.length];
    }

    return t.reverse().join(thousands);
  };
}


/***/ }),

/***/ "./node_modules/d3-format/src/formatNumerals.js":
/*!******************************************************!*\
  !*** ./node_modules/d3-format/src/formatNumerals.js ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(numerals) {
  return function(value) {
    return value.replace(/[0-9]/g, function(i) {
      return numerals[+i];
    });
  };
}


/***/ }),

/***/ "./node_modules/d3-format/src/formatPrefixAuto.js":
/*!********************************************************!*\
  !*** ./node_modules/d3-format/src/formatPrefixAuto.js ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   prefixExponent: () => (/* binding */ prefixExponent)
/* harmony export */ });
/* harmony import */ var _formatDecimal_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./formatDecimal.js */ "./node_modules/d3-format/src/formatDecimal.js");


var prefixExponent;

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(x, p) {
  var d = (0,_formatDecimal_js__WEBPACK_IMPORTED_MODULE_0__.formatDecimalParts)(x, p);
  if (!d) return x + "";
  var coefficient = d[0],
      exponent = d[1],
      i = exponent - (prefixExponent = Math.max(-8, Math.min(8, Math.floor(exponent / 3))) * 3) + 1,
      n = coefficient.length;
  return i === n ? coefficient
      : i > n ? coefficient + new Array(i - n + 1).join("0")
      : i > 0 ? coefficient.slice(0, i) + "." + coefficient.slice(i)
      : "0." + new Array(1 - i).join("0") + (0,_formatDecimal_js__WEBPACK_IMPORTED_MODULE_0__.formatDecimalParts)(x, Math.max(0, p + i - 1))[0]; // less than 1y!
}


/***/ }),

/***/ "./node_modules/d3-format/src/formatRounded.js":
/*!*****************************************************!*\
  !*** ./node_modules/d3-format/src/formatRounded.js ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _formatDecimal_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./formatDecimal.js */ "./node_modules/d3-format/src/formatDecimal.js");


/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(x, p) {
  var d = (0,_formatDecimal_js__WEBPACK_IMPORTED_MODULE_0__.formatDecimalParts)(x, p);
  if (!d) return x + "";
  var coefficient = d[0],
      exponent = d[1];
  return exponent < 0 ? "0." + new Array(-exponent).join("0") + coefficient
      : coefficient.length > exponent + 1 ? coefficient.slice(0, exponent + 1) + "." + coefficient.slice(exponent + 1)
      : coefficient + new Array(exponent - coefficient.length + 2).join("0");
}


/***/ }),

/***/ "./node_modules/d3-format/src/formatSpecifier.js":
/*!*******************************************************!*\
  !*** ./node_modules/d3-format/src/formatSpecifier.js ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FormatSpecifier: () => (/* binding */ FormatSpecifier),
/* harmony export */   "default": () => (/* binding */ formatSpecifier)
/* harmony export */ });
// [[fill]align][sign][symbol][0][width][,][.precision][~][type]
var re = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;

function formatSpecifier(specifier) {
  if (!(match = re.exec(specifier))) throw new Error("invalid format: " + specifier);
  var match;
  return new FormatSpecifier({
    fill: match[1],
    align: match[2],
    sign: match[3],
    symbol: match[4],
    zero: match[5],
    width: match[6],
    comma: match[7],
    precision: match[8] && match[8].slice(1),
    trim: match[9],
    type: match[10]
  });
}

formatSpecifier.prototype = FormatSpecifier.prototype; // instanceof

function FormatSpecifier(specifier) {
  this.fill = specifier.fill === undefined ? " " : specifier.fill + "";
  this.align = specifier.align === undefined ? ">" : specifier.align + "";
  this.sign = specifier.sign === undefined ? "-" : specifier.sign + "";
  this.symbol = specifier.symbol === undefined ? "" : specifier.symbol + "";
  this.zero = !!specifier.zero;
  this.width = specifier.width === undefined ? undefined : +specifier.width;
  this.comma = !!specifier.comma;
  this.precision = specifier.precision === undefined ? undefined : +specifier.precision;
  this.trim = !!specifier.trim;
  this.type = specifier.type === undefined ? "" : specifier.type + "";
}

FormatSpecifier.prototype.toString = function() {
  return this.fill
      + this.align
      + this.sign
      + this.symbol
      + (this.zero ? "0" : "")
      + (this.width === undefined ? "" : Math.max(1, this.width | 0))
      + (this.comma ? "," : "")
      + (this.precision === undefined ? "" : "." + Math.max(0, this.precision | 0))
      + (this.trim ? "~" : "")
      + this.type;
};


/***/ }),

/***/ "./node_modules/d3-format/src/formatTrim.js":
/*!**************************************************!*\
  !*** ./node_modules/d3-format/src/formatTrim.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Trims insignificant zeros, e.g., replaces 1.2000k with 1.2k.
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(s) {
  out: for (var n = s.length, i = 1, i0 = -1, i1; i < n; ++i) {
    switch (s[i]) {
      case ".": i0 = i1 = i; break;
      case "0": if (i0 === 0) i0 = i; i1 = i; break;
      default: if (!+s[i]) break out; if (i0 > 0) i0 = 0; break;
    }
  }
  return i0 > 0 ? s.slice(0, i0) + s.slice(i1 + 1) : s;
}


/***/ }),

/***/ "./node_modules/d3-format/src/formatTypes.js":
/*!***************************************************!*\
  !*** ./node_modules/d3-format/src/formatTypes.js ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _formatDecimal_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./formatDecimal.js */ "./node_modules/d3-format/src/formatDecimal.js");
/* harmony import */ var _formatPrefixAuto_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./formatPrefixAuto.js */ "./node_modules/d3-format/src/formatPrefixAuto.js");
/* harmony import */ var _formatRounded_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./formatRounded.js */ "./node_modules/d3-format/src/formatRounded.js");




/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  "%": (x, p) => (x * 100).toFixed(p),
  "b": (x) => Math.round(x).toString(2),
  "c": (x) => x + "",
  "d": _formatDecimal_js__WEBPACK_IMPORTED_MODULE_0__["default"],
  "e": (x, p) => x.toExponential(p),
  "f": (x, p) => x.toFixed(p),
  "g": (x, p) => x.toPrecision(p),
  "o": (x) => Math.round(x).toString(8),
  "p": (x, p) => (0,_formatRounded_js__WEBPACK_IMPORTED_MODULE_1__["default"])(x * 100, p),
  "r": _formatRounded_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  "s": _formatPrefixAuto_js__WEBPACK_IMPORTED_MODULE_2__["default"],
  "X": (x) => Math.round(x).toString(16).toUpperCase(),
  "x": (x) => Math.round(x).toString(16)
});


/***/ }),

/***/ "./node_modules/d3-format/src/identity.js":
/*!************************************************!*\
  !*** ./node_modules/d3-format/src/identity.js ***!
  \************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(x) {
  return x;
}


/***/ }),

/***/ "./node_modules/d3-format/src/locale.js":
/*!**********************************************!*\
  !*** ./node_modules/d3-format/src/locale.js ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _exponent_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./exponent.js */ "./node_modules/d3-format/src/exponent.js");
/* harmony import */ var _formatGroup_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./formatGroup.js */ "./node_modules/d3-format/src/formatGroup.js");
/* harmony import */ var _formatNumerals_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./formatNumerals.js */ "./node_modules/d3-format/src/formatNumerals.js");
/* harmony import */ var _formatSpecifier_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./formatSpecifier.js */ "./node_modules/d3-format/src/formatSpecifier.js");
/* harmony import */ var _formatTrim_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./formatTrim.js */ "./node_modules/d3-format/src/formatTrim.js");
/* harmony import */ var _formatTypes_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./formatTypes.js */ "./node_modules/d3-format/src/formatTypes.js");
/* harmony import */ var _formatPrefixAuto_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./formatPrefixAuto.js */ "./node_modules/d3-format/src/formatPrefixAuto.js");
/* harmony import */ var _identity_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./identity.js */ "./node_modules/d3-format/src/identity.js");









var map = Array.prototype.map,
    prefixes = ["y","z","a","f","p","n","µ","m","","k","M","G","T","P","E","Z","Y"];

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(locale) {
  var group = locale.grouping === undefined || locale.thousands === undefined ? _identity_js__WEBPACK_IMPORTED_MODULE_0__["default"] : (0,_formatGroup_js__WEBPACK_IMPORTED_MODULE_1__["default"])(map.call(locale.grouping, Number), locale.thousands + ""),
      currencyPrefix = locale.currency === undefined ? "" : locale.currency[0] + "",
      currencySuffix = locale.currency === undefined ? "" : locale.currency[1] + "",
      decimal = locale.decimal === undefined ? "." : locale.decimal + "",
      numerals = locale.numerals === undefined ? _identity_js__WEBPACK_IMPORTED_MODULE_0__["default"] : (0,_formatNumerals_js__WEBPACK_IMPORTED_MODULE_2__["default"])(map.call(locale.numerals, String)),
      percent = locale.percent === undefined ? "%" : locale.percent + "",
      minus = locale.minus === undefined ? "−" : locale.minus + "",
      nan = locale.nan === undefined ? "NaN" : locale.nan + "";

  function newFormat(specifier) {
    specifier = (0,_formatSpecifier_js__WEBPACK_IMPORTED_MODULE_3__["default"])(specifier);

    var fill = specifier.fill,
        align = specifier.align,
        sign = specifier.sign,
        symbol = specifier.symbol,
        zero = specifier.zero,
        width = specifier.width,
        comma = specifier.comma,
        precision = specifier.precision,
        trim = specifier.trim,
        type = specifier.type;

    // The "n" type is an alias for ",g".
    if (type === "n") comma = true, type = "g";

    // The "" type, and any invalid type, is an alias for ".12~g".
    else if (!_formatTypes_js__WEBPACK_IMPORTED_MODULE_4__["default"][type]) precision === undefined && (precision = 12), trim = true, type = "g";

    // If zero fill is specified, padding goes after sign and before digits.
    if (zero || (fill === "0" && align === "=")) zero = true, fill = "0", align = "=";

    // Compute the prefix and suffix.
    // For SI-prefix, the suffix is lazily computed.
    var prefix = symbol === "$" ? currencyPrefix : symbol === "#" && /[boxX]/.test(type) ? "0" + type.toLowerCase() : "",
        suffix = symbol === "$" ? currencySuffix : /[%p]/.test(type) ? percent : "";

    // What format function should we use?
    // Is this an integer type?
    // Can this type generate exponential notation?
    var formatType = _formatTypes_js__WEBPACK_IMPORTED_MODULE_4__["default"][type],
        maybeSuffix = /[defgprs%]/.test(type);

    // Set the default precision if not specified,
    // or clamp the specified precision to the supported range.
    // For significant precision, it must be in [1, 21].
    // For fixed precision, it must be in [0, 20].
    precision = precision === undefined ? 6
        : /[gprs]/.test(type) ? Math.max(1, Math.min(21, precision))
        : Math.max(0, Math.min(20, precision));

    function format(value) {
      var valuePrefix = prefix,
          valueSuffix = suffix,
          i, n, c;

      if (type === "c") {
        valueSuffix = formatType(value) + valueSuffix;
        value = "";
      } else {
        value = +value;

        // Determine the sign. -0 is not less than 0, but 1 / -0 is!
        var valueNegative = value < 0 || 1 / value < 0;

        // Perform the initial formatting.
        value = isNaN(value) ? nan : formatType(Math.abs(value), precision);

        // Trim insignificant zeros.
        if (trim) value = (0,_formatTrim_js__WEBPACK_IMPORTED_MODULE_5__["default"])(value);

        // If a negative value rounds to zero after formatting, and no explicit positive sign is requested, hide the sign.
        if (valueNegative && +value === 0 && sign !== "+") valueNegative = false;

        // Compute the prefix and suffix.
        valuePrefix = (valueNegative ? (sign === "(" ? sign : minus) : sign === "-" || sign === "(" ? "" : sign) + valuePrefix;
        valueSuffix = (type === "s" ? prefixes[8 + _formatPrefixAuto_js__WEBPACK_IMPORTED_MODULE_6__.prefixExponent / 3] : "") + valueSuffix + (valueNegative && sign === "(" ? ")" : "");

        // Break the formatted value into the integer “value” part that can be
        // grouped, and fractional or exponential “suffix” part that is not.
        if (maybeSuffix) {
          i = -1, n = value.length;
          while (++i < n) {
            if (c = value.charCodeAt(i), 48 > c || c > 57) {
              valueSuffix = (c === 46 ? decimal + value.slice(i + 1) : value.slice(i)) + valueSuffix;
              value = value.slice(0, i);
              break;
            }
          }
        }
      }

      // If the fill character is not "0", grouping is applied before padding.
      if (comma && !zero) value = group(value, Infinity);

      // Compute the padding.
      var length = valuePrefix.length + value.length + valueSuffix.length,
          padding = length < width ? new Array(width - length + 1).join(fill) : "";

      // If the fill character is "0", grouping is applied after padding.
      if (comma && zero) value = group(padding + value, padding.length ? width - valueSuffix.length : Infinity), padding = "";

      // Reconstruct the final output based on the desired alignment.
      switch (align) {
        case "<": value = valuePrefix + value + valueSuffix + padding; break;
        case "=": value = valuePrefix + padding + value + valueSuffix; break;
        case "^": value = padding.slice(0, length = padding.length >> 1) + valuePrefix + value + valueSuffix + padding.slice(length); break;
        default: value = padding + valuePrefix + value + valueSuffix; break;
      }

      return numerals(value);
    }

    format.toString = function() {
      return specifier + "";
    };

    return format;
  }

  function formatPrefix(specifier, value) {
    var f = newFormat((specifier = (0,_formatSpecifier_js__WEBPACK_IMPORTED_MODULE_3__["default"])(specifier), specifier.type = "f", specifier)),
        e = Math.max(-8, Math.min(8, Math.floor((0,_exponent_js__WEBPACK_IMPORTED_MODULE_7__["default"])(value) / 3))) * 3,
        k = Math.pow(10, -e),
        prefix = prefixes[8 + e / 3];
    return function(value) {
      return f(k * value) + prefix;
    };
  }

  return {
    format: newFormat,
    formatPrefix: formatPrefix
  };
}


/***/ }),

/***/ "./node_modules/d3-random/src/defaultSource.js":
/*!*****************************************************!*\
  !*** ./node_modules/d3-random/src/defaultSource.js ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Math.random);


/***/ }),

/***/ "./node_modules/d3-random/src/normal.js":
/*!**********************************************!*\
  !*** ./node_modules/d3-random/src/normal.js ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _defaultSource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./defaultSource.js */ "./node_modules/d3-random/src/defaultSource.js");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((function sourceRandomNormal(source) {
  function randomNormal(mu, sigma) {
    var x, r;
    mu = mu == null ? 0 : +mu;
    sigma = sigma == null ? 1 : +sigma;
    return function() {
      var y;

      // If available, use the second previously-generated uniform random.
      if (x != null) y = x, x = null;

      // Otherwise, generate a new x and y.
      else do {
        x = source() * 2 - 1;
        y = source() * 2 - 1;
        r = x * x + y * y;
      } while (!r || r > 1);

      return mu + sigma * y * Math.sqrt(-2 * Math.log(r) / r);
    };
  }

  randomNormal.source = sourceRandomNormal;

  return randomNormal;
})(_defaultSource_js__WEBPACK_IMPORTED_MODULE_0__["default"]));


/***/ }),

/***/ "./node_modules/d3-scale/src/init.js":
/*!*******************************************!*\
  !*** ./node_modules/d3-scale/src/init.js ***!
  \*******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   initInterpolator: () => (/* binding */ initInterpolator),
/* harmony export */   initRange: () => (/* binding */ initRange)
/* harmony export */ });
function initRange(domain, range) {
  switch (arguments.length) {
    case 0: break;
    case 1: this.range(domain); break;
    default: this.range(range).domain(domain); break;
  }
  return this;
}

function initInterpolator(domain, interpolator) {
  switch (arguments.length) {
    case 0: break;
    case 1: {
      if (typeof domain === "function") this.interpolator(domain);
      else this.range(domain);
      break;
    }
    default: {
      this.domain(domain);
      if (typeof interpolator === "function") this.interpolator(interpolator);
      else this.range(interpolator);
      break;
    }
  }
  return this;
}


/***/ }),

/***/ "./node_modules/d3-scale/src/quantile.js":
/*!***********************************************!*\
  !*** ./node_modules/d3-scale/src/quantile.js ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ quantile)
/* harmony export */ });
/* harmony import */ var d3_array__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-array */ "./node_modules/d3-array/src/quantile.js");
/* harmony import */ var d3_array__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-array */ "./node_modules/d3-array/src/bisect.js");
/* harmony import */ var d3_array__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! d3-array */ "./node_modules/d3-array/src/ascending.js");
/* harmony import */ var _init_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./init.js */ "./node_modules/d3-scale/src/init.js");



function quantile() {
  var domain = [],
      range = [],
      thresholds = [],
      unknown;

  function rescale() {
    var i = 0, n = Math.max(1, range.length);
    thresholds = new Array(n - 1);
    while (++i < n) thresholds[i - 1] = (0,d3_array__WEBPACK_IMPORTED_MODULE_0__.quantileSorted)(domain, i / n);
    return scale;
  }

  function scale(x) {
    return x == null || isNaN(x = +x) ? unknown : range[(0,d3_array__WEBPACK_IMPORTED_MODULE_1__["default"])(thresholds, x)];
  }

  scale.invertExtent = function(y) {
    var i = range.indexOf(y);
    return i < 0 ? [NaN, NaN] : [
      i > 0 ? thresholds[i - 1] : domain[0],
      i < thresholds.length ? thresholds[i] : domain[domain.length - 1]
    ];
  };

  scale.domain = function(_) {
    if (!arguments.length) return domain.slice();
    domain = [];
    for (let d of _) if (d != null && !isNaN(d = +d)) domain.push(d);
    domain.sort(d3_array__WEBPACK_IMPORTED_MODULE_2__["default"]);
    return rescale();
  };

  scale.range = function(_) {
    return arguments.length ? (range = Array.from(_), rescale()) : range.slice();
  };

  scale.unknown = function(_) {
    return arguments.length ? (unknown = _, scale) : unknown;
  };

  scale.quantiles = function() {
    return thresholds.slice();
  };

  scale.copy = function() {
    return quantile()
        .domain(domain)
        .range(range)
        .unknown(unknown);
  };

  return _init_js__WEBPACK_IMPORTED_MODULE_3__.initRange.apply(scale, arguments);
}


/***/ }),

/***/ "./src/dataset/CSVGrid.js":
/*!********************************!*\
  !*** ./src/dataset/CSVGrid.js ***!
  \********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CSVGrid: () => (/* binding */ CSVGrid)
/* harmony export */ });
/* harmony import */ var d3_fetch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-fetch */ "./node_modules/d3-fetch/src/dsv.js");
Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Dataset.js'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
//@ts-check


/** @typedef {{ dims: object, crs: string, tileSizeCell: number, originPoint: {x:number,y:number}, resolutionGeo: number, tilingBounds:import("../GeoCanvas.js").Envelope }} GridInfo */

;


/**
 * A dataset composed of a single CSV file (not tiled).
 *
 * @author Joseph Davies, Julien Gaffuri
 */
class CSVGrid extends Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Dataset.js'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()) {
    /**
     * @param {import("../Map")} map The map.
     * @param {string} url The URL of the dataset.
     * @param {number} resolution The dataset resolution in geographical unit.
     * @param {{preprocess?:(function(import("../Dataset.js").Cell):boolean)}} opts
     */
    constructor(map, url, resolution, opts = {}) {
        super(map, url, resolution, opts)

        /**
         * @private
         * @type {Array.<import("../Dataset.js").Cell>} */
        this.cells = []

        /**
         * @type {string}
         * @private  */
        this.infoLoadingStatus = 'notLoaded'

        //get data
        this.getData(undefined)
    }

    /**
     * Request data within a geographic envelope.
     * @param {import("../GeoCanvas.js").Envelope|undefined} e
     */
    getData(e) {
        //check if data already loaded
        if (this.infoLoadingStatus != 'notLoaded') return this

        //load data
        this.infoLoadingStatus = 'loading'
            ; (async () => {
                try {
                    const data = await (0,d3_fetch__WEBPACK_IMPORTED_MODULE_1__.csv)(this.url)

                    //convert coordinates in numbers
                    for (const c of data) {
                        c.x = +c.x
                        c.y = +c.y
                    }

                    //preprocess/filter
                    if (this.preprocess) {
                        this.cells = []
                        for (const c of data) {
                            const b = this.preprocess(c)
                            if (b == false) continue
                            this.cells.push(c)
                        }
                    } else {
                        this.cells = data
                    }

                    //TODO check if redraw is necessary
                    //that is if the dataset belongs to a layer which is visible at the current zoom level

                    //execute the callback, usually a draw function
                    if (this.map) this.map.redraw()

                    this.infoLoadingStatus = 'loaded'
                } catch (error) {
                    //mark as failed
                    this.infoLoadingStatus = 'failed'
                    this.cells = []
                }
            })()

        return this
    }

    /**
     * Fill the view cache with all cells which are within a geographical envelope.
     *
     * @param {import("../GeoCanvas.js").Envelope} extGeo
     * @returns {void}
     */
    updateViewCache(extGeo) {
        //data not loaded yet
        if (!this.cells) return

        this.cellsViewCache = []
        for (const cell of this.cells) {
            if (+cell.x + this.resolution < extGeo.xMin) continue
            if (+cell.x - this.resolution > extGeo.xMax) continue
            if (+cell.y + this.resolution < extGeo.yMin) continue
            if (+cell.y - this.resolution > extGeo.yMax) continue
            this.cellsViewCache.push(cell)
        }
    }
}


/***/ }),

/***/ "./src/dataset/JSGrid.js":
/*!*******************************!*\
  !*** ./src/dataset/JSGrid.js ***!
  \*******************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   JSGrid: () => (/* binding */ JSGrid)
/* harmony export */ });
Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Dataset.js'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
//@ts-check


/** @typedef {{ dims: object, crs: string, tileSizeCell: number, originPoint: {x:number,y:number}, resolutionGeo: number, tilingBounds:import("../GeoCanvas.js").Envelope }} GridInfo */

;

/**
 * A dataset composed of cells defined in javascript, or loaded outside of gridviz map.
 *
 * @author Joseph Davies, Julien Gaffuri
 */
class JSGrid extends Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Dataset.js'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()) {
    /**
     * @param {number} resolution The dataset resolution in geographical unit.
     * @param {Array.<Object>} cells The cells.
     */
    constructor(resolution, cells) {
        super(undefined, "", resolution)

        /**
         * @private
         * @type {Array.<import("../MultiResolutionDataset.js").Cell>} */
        this.cells = cells || []
    }

    /**
     * Request data within a geographic envelope.
     *
     * @param {import("../GeoCanvas.js").Envelope|undefined} e
     */
    getData(e) { return this }

    /**
     * Fill the view cache with all cells which are within a geographical envelope.
     *
     * @param {import("../GeoCanvas.js").Envelope} extGeo
     * @returns {void}
     */
    updateViewCache(extGeo) {
        //data not loaded yet
        if (!this.cells) return

        this.cellsViewCache = []
        for (const cell of this.cells) {
            if (+cell.x + this.resolution < extGeo.xMin) continue
            if (+cell.x - this.resolution > extGeo.xMax) continue
            if (+cell.y + this.resolution < extGeo.yMin) continue
            if (+cell.y - this.resolution > extGeo.yMax) continue
            this.cellsViewCache.push(cell)
        }
    }
}


/***/ }),

/***/ "./src/dataset/TiledGrid.js":
/*!**********************************!*\
  !*** ./src/dataset/TiledGrid.js ***!
  \**********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TiledGrid: () => (/* binding */ TiledGrid)
/* harmony export */ });
Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Dataset.js'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
/* harmony import */ var d3_fetch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-fetch */ "./node_modules/d3-fetch/src/json.js");
/* harmony import */ var d3_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! d3-fetch */ "./node_modules/d3-fetch/src/dsv.js");
//@ts-check


/** @typedef {{ dims: object, crs: string, tileSizeCell: number, originPoint: {x:number,y:number}, resolutionGeo: number, tilingBounds:import("../GeoCanvas.js").Envelope }} GridInfo */

// internal
;
//import { monitor, monitorDuration } from '../utils/Utils.js'

// external


/**
 * A tiled dataset, composed of CSV tiles.
 *
 * @author Joseph Davies, Julien Gaffuri
 */
class TiledGrid extends Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Dataset.js'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()) {
    /**
     * @param {import("../Map")} map The map.
     * @param {string} url The URL of the dataset.
     * @param {{preprocess?:(function(import("../Dataset.js").Cell):boolean) }} opts
     */
    constructor(map, url, opts = {}) {
        super(map, url, 0, opts)

        /**
         * The grid info object, from the info.json file.
         *  @type {GridInfo | undefined}
         * @private
         *  */
        this.info = undefined

        /**
         * @type {string}
         * @private  */
        this.infoLoadingStatus = 'notLoaded'

        /**
         * The cache of the loaded tiles. It is double indexed: by xT and then yT.
         * Example: this.cache[xT][yT] returns the tile at [xT][yT] location.
         *
         * @type {object}
         * */
        this.cache = {}

        //launch loading
        this.loadInfo()
    }

    /**
     * Load the info.json from the url.
     * @returns this
     */
    loadInfo() {
        if (!this.info && this.infoLoadingStatus === 'notLoaded') {
            ; (async () => {
                try {
                    const data = await (0,d3_fetch__WEBPACK_IMPORTED_MODULE_1__["default"])(this.url + 'info.json')
                    this.info = data
                    this.resolution = data.resolutionGeo
                    this.infoLoadingStatus = 'loaded'
                    this.map.redraw()
                } catch (error) {
                    //mark as failed
                    this.infoLoadingStatus = 'failed'
                }
            })()
        } else if ((this.infoLoadingStatus === 'loaded' || this.infoLoadingStatus === 'failed'))
            this.map.redraw()
        return this
    }

    /**
     * Compute a tiling envelope from a geographical envelope.
     * This is the function to use to know which tiles to download for a geographical view.
     *
     * @param {import("../GeoCanvas.js").Envelope} e
     * @returns {import("../GeoCanvas.js").Envelope|undefined}
     */
    getTilingEnvelope(e) {
        if (!this.info) {
            this.loadInfo()
            return
        }

        const po = this.info.originPoint,
            r = this.info.resolutionGeo,
            s = this.info.tileSizeCell

        return {
            xMin: Math.floor((e.xMin - po.x) / (r * s)),
            xMax: Math.floor((e.xMax - po.x) / (r * s)),
            yMin: Math.floor((e.yMin - po.y) / (r * s)),
            yMax: Math.floor((e.yMax - po.y) / (r * s)),
        }
    }

    /**
     * Request data within a geographic envelope.
     *
     * @param {import('../GeoCanvas.js').Envelope} extGeo
     * @returns {this}
     */
    getData(extGeo) {
        //TODO empty cache when it gets too big ?

        //check if info has been loaded
        if (!this.info) return this

        //tiles within the scope
        /** @type {import("../GeoCanvas.js").Envelope|undefined} */
        const tb = this.getTilingEnvelope(extGeo)
        if (!tb) return this

        //grid bounds
        /** @type {import("../GeoCanvas.js").Envelope} */
        const gb = this.info.tilingBounds

        for (let xT = Math.max(tb.xMin, gb.xMin); xT <= Math.min(tb.xMax, gb.xMax); xT++) {
            for (let yT = Math.max(tb.yMin, gb.yMin); yT <= Math.min(tb.yMax, gb.yMax); yT++) {
                //prepare cache
                if (!this.cache[xT]) this.cache[xT] = {}

                //check if tile exists in the cache
                /** @type {object} */
                let tile = this.cache[xT][yT]
                if (tile) continue

                //mark tile as loading
                this.cache[xT][yT] = "loading";
                (async () => {
                    //request tile
                    /** @type {Array.<import("../Dataset.js").Cell>}  */
                    let cells

                    try {
                        /** @type {Array.<import("../Dataset.js").Cell>}  */
                        // @ts-ignore
                        const data = await (0,d3_fetch__WEBPACK_IMPORTED_MODULE_2__.csv)(this.url + xT + '/' + yT + '.csv')

                        //if (monitor) monitorDuration('*** TiledGrid parse start')

                        //preprocess/filter
                        if (this.preprocess) {
                            cells = []
                            for (const c of data) {
                                const b = this.preprocess(c)
                                if (b == false) continue
                                cells.push(c)
                            }
                        } else {
                            cells = data
                        }

                        //if (monitor) monitorDuration('preprocess / filter')
                    } catch (error) {
                        //mark as failed
                        this.cache[xT][yT] = 'failed'
                        return
                    }

                    //store tile in cache
                    if (!this.info) {
                        console.error('Tile info inknown')
                        return
                    }
                    const tile_ = getGridTile(cells, xT, yT, this.info)
                    this.cache[xT][yT] = tile_

                    //if (monitor) monitorDuration('storage')

                    //if no redraw is specified, then leave
                    this.map.redraw()

                    //check if redraw is really needed, that is if:

                    // 1. the dataset belongs to a layer which is visible at the current zoom level
                    let redraw = false
                    //go through the layers
                    const z = this.map.getZoom()
                    for (const lay of this.map.layers) {
                        if (lay.visible && !lay.visible(z)) continue
                        if (!lay.getDataset) continue
                        if (lay.getDataset(z) != this) continue
                        //found one layer. No need to seek more.
                        redraw = true
                        break
                    }
                    //if (monitor) monitorDuration('check redraw 1')

                    if (!redraw) return

                    // 2. the tile is within the view, that is its geo envelope intersects the viewer geo envelope.
                    const env = this.map.updateExtentGeo()
                    const envT = tile_.extGeo
                    if (env.xMax <= envT.xMin) return
                    if (env.xMin >= envT.xMax) return
                    if (env.yMax <= envT.yMin) return
                    if (env.yMin >= envT.yMax) return

                    //if (monitor) monitorDuration('check redraw 2')
                    //if (monitor) monitorDuration('*** TiledGrid parse end')

                    //redraw
                    this.map.redraw()
                })()
            }
        }
        return this
    }

    /**
     * Fill the view cache with all cells which are within a geographical envelope.
     * @abstract
     * @param {import("../GeoCanvas.js").Envelope} extGeo
     * @returns {void}
     */
    updateViewCache(extGeo) {
        //
        this.cellsViewCache = []

        //check if info has been loaded
        if (!this.info) return

        //tiles within the scope
        /** @type {import("../GeoCanvas.js").Envelope|undefined} */
        const tb = this.getTilingEnvelope(extGeo)
        if (!tb) return

        //grid bounds
        /** @type {import("../GeoCanvas.js").Envelope} */
        const gb = this.info.tilingBounds

        for (let xT = Math.max(tb.xMin, gb.xMin); xT <= Math.min(tb.xMax, gb.xMax); xT++) {
            if (!this.cache[xT]) continue
            for (let yT = Math.max(tb.yMin, gb.yMin); yT <= Math.min(tb.yMax, gb.yMax); yT++) {
                //get tile
                /** @type {object} */
                const tile = this.cache[xT][yT]
                if (!tile || typeof tile === 'string') continue

                //get cells
                //this.cellsViewCache = this.cellsViewCache.concat(tile.cells)

                for (const cell of tile.cells) {
                    if (+cell.x + this.resolution < extGeo.xMin) continue
                    if (+cell.x - this.resolution > extGeo.xMax) continue
                    if (+cell.y + this.resolution < extGeo.yMin) continue
                    if (+cell.y - this.resolution > extGeo.yMax) continue
                    this.cellsViewCache.push(cell)
                }
            }
        }
    }
}

function getGridTile(cells, xT, yT, gridInfo) {

    const tile = {}

    /** @type {Array.<import("../Dataset").Cell>} */
    tile.cells = cells
    /** @type {number} */
    tile.x = xT
    /** @type {number} */
    tile.y = yT

    const r = gridInfo.resolutionGeo
    const s = gridInfo.tileSizeCell

    /** @type {import("../GeoCanvas").Envelope} */
    tile.extGeo = {
        xMin: gridInfo.originPoint.x + r * s * tile.x,
        xMax: gridInfo.originPoint.x + r * s * (tile.x + 1),
        yMin: gridInfo.originPoint.y + r * s * tile.y,
        yMax: gridInfo.originPoint.y + r * s * (tile.y + 1),
    }

    //convert cell coordinates into geographical coordinates
    for (let cell of tile.cells) {
        cell.x = tile.extGeo.xMin + cell.x * r
        cell.y = tile.extGeo.yMin + cell.y * r
    }

    return tile
}


/***/ }),

/***/ "./src/layer/BackgroundLayer.js":
/*!**************************************!*\
  !*** ./src/layer/BackgroundLayer.js ***!
  \**************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BackgroundLayer: () => (/* binding */ BackgroundLayer)
/* harmony export */ });
Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Layer.js'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
//@ts-check


;

/**
 *
 * A map background layer in "Slippy map" XYZ standard.
 * See https://wiki.openstreetmap.org/wiki/Slippy_map_tilenames
 * https://www.maptiler.com/google-maps-coordinates-tile-bounds-projection/#6/27.88/44.48
 * 
 * @author Julien Gaffuri
 */
class BackgroundLayer extends Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Layer.js'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()) {
    /**
     * @param {object} opts
     */
    constructor(opts) {
        super(opts)
        opts = opts || {}

        /** The image cache, indexed by z/y/x */
        this.cache = {}

        /**
         * @type {string} */
        this.url = opts.url
        /** @type {function(number,number,number):string} */
        this.urlFun = opts.urlFun || ((x, y, z) => this.url + z + '/' + x + '/' + y + '.png')

        /** @type {Array.<number>} */
        this.resolutions = opts.resolutions
        if (!this.resolutions || this.resolutions.length == 0)
            throw new Error('No resolutions provided for background layer')

        /** @type {number} */
        this.nbPix = opts.nbPix || 256
        /** CRS coordinates of top left corner
         * @type {Array.<number>} */
        this.origin = opts.origin || [0, 0]
        /** @type {number} */
        this.z0 = opts.z0 || 0
    }

    /**
     * Get z/x/y cache data.
     * @param {number} z
     * @param {number} x
     * @param {number} y
     * @returns {HTMLImageElement|string|undefined}
     * @private
     */
    get(z, x, y) {
        let d = this.cache[z]
        if (!d) return
        d = d[x]
        if (!d) return
        return d[y]
    }

    /**
     * Get z/x/y cache data.
     * @param {HTMLImageElement|string} img
     * @param {number} z
     * @param {number} x
     * @param {number} y
     * @returns
     * @private
     */
    put(img, z, x, y) {
        if (!this.cache[z]) this.cache[z] = {}
        if (!this.cache[z][x]) this.cache[z][x] = {}
        this.cache[z][x][y] = img
    }

    /**
     * @param {import("../GeoCanvas").GeoCanvas} geoCanvas The canvas where to draw the layer.
     * @returns {void}
     */
    draw(geoCanvas) {

        if (!this.resolutions || this.resolutions.length == 0) {
            console.error('No resolutions provided for background layer')
            return
        }

        //
        const z = geoCanvas.view.z
        const x0 = this.origin[0],
            y0 = this.origin[1]

        //get zoom level and resolution
        let z_ = 0
        for (z_ = 0; z_ < this.resolutions.length; z_++) if (this.resolutions[z_] < z) break
        z_ -= 1
        z_ = Math.max(0, z_)
        z_ = Math.min(z_, this.resolutions.length - 1)
        //console.log(this.resolutions.length, z)
        const res = this.resolutions[z_]

        z_ += this.z0

        const sizeG = this.nbPix * res
        const size = sizeG / z

        //get tile numbers
        const xGeoToTMS = (x) => Math.ceil((x - x0) / sizeG)
        const yGeoToTMS = (y) => Math.ceil(-(y - y0) / sizeG)
        const xMin = xGeoToTMS(geoCanvas.extGeo.xMin) - 1
        const xMax = xGeoToTMS(geoCanvas.extGeo.xMax)
        const yMax = yGeoToTMS(geoCanvas.extGeo.yMin)
        const yMin = yGeoToTMS(geoCanvas.extGeo.yMax) - 1

        //handle images
        for (let x = xMin; x < xMax; x++) {
            for (let y = yMin; y < yMax; y++) {
                //get image
                let img = this.get(z_, x, y)

                //load image
                if (!img) {
                    const img = new Image()
                    this.put(img, z_, x, y)
                    img.onload = () => {
                        geoCanvas.redraw()
                    }
                    img.onerror = () => {
                        //case when no image
                        this.put('failed', z_, x, y)
                    }
                    img.src = this.urlFun(x, y, z_)
                    continue
                }

                //case when no image
                if (img === 'failed') continue
                if (!(img instanceof HTMLImageElement)) {
                    console.log(img)
                    continue
                }
                if (img.width == 0 || img.height == 0) continue

                //draw image
                const xGeo = x0 + x * sizeG
                const yGeo = y0 - y * sizeG
                try {
                    geoCanvas.initCanvasTransform()
                    geoCanvas.ctx.drawImage(img, geoCanvas.geoToPixX(xGeo), geoCanvas.geoToPixY(yGeo), size, size)
                    //cg.ctx.drawImage(img, xGeo, yGeo, sizeG, -sizeG)
                } catch (error) {
                    console.error(error)
                }
            }
        }

    }
}


/***/ }),

/***/ "./src/layer/BackgroundLayerWMS.js":
/*!*****************************************!*\
  !*** ./src/layer/BackgroundLayerWMS.js ***!
  \*****************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BackgroundLayerWMS: () => (/* binding */ BackgroundLayerWMS)
/* harmony export */ });
Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Layer.js'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
//@ts-check


;

/**
 *
 * A map WMS background layer.
 * 
 * @author Julien Gaffuri
 */
class BackgroundLayerWMS extends Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Layer.js'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()) {
    /**
     * @param {object} opts
     */
    constructor(opts) {
        super(opts)
        opts = opts || {}

        /**
         * @type {string} */
        this.url = opts.url

        /** @type {HTMLImageElement|undefined} */
        this.img = undefined;

        /** @type {number|undefined} */
        this.xMin = undefined;
        /** @type {number|undefined} */
        this.xMax = undefined;
        /** @type {number|undefined} */
        this.yMin = undefined;
        /** @type {number|undefined} */
        this.yMax = undefined;
    }

    /** Check if the view has moved and a new image needs to be retrieved.
     * @private */
    hasMoved(extGeo) {
        if ((extGeo.xMin) != this.xMin) return true
        else if ((extGeo.xMax) != this.xMax) return true
        else if ((extGeo.yMin) != this.yMin) return true
        else if ((extGeo.yMax) != this.yMax) return true
        else return false
    }


    /**
     * @param {import("../GeoCanvas").GeoCanvas} geoCanvas The canvas where to draw the layer.
     * @returns {void}
     */
    draw(geoCanvas) {

        //update map extent
        geoCanvas.updateExtentGeo(0)

        if (!this.hasMoved(geoCanvas.extGeo) && this.img) {
            //the map did not move and the image was already downloaded: draw the image
            geoCanvas.initCanvasTransform()
            geoCanvas.ctx.drawImage(this.img, 0, 0, geoCanvas.w, geoCanvas.h)

        } else {
            //the map moved: retrieve new image

            //
            this.xMin = geoCanvas.extGeo.xMin
            this.xMax = geoCanvas.extGeo.xMax
            this.yMin = geoCanvas.extGeo.yMin
            this.yMax = geoCanvas.extGeo.yMax

            //build WMS URL
            const url = []
            url.push(this.url)
            url.push("&width=")
            url.push(geoCanvas.w)
            url.push("&height=")
            url.push(geoCanvas.h)
            //bbox: xmin ymin xmax ymax
            url.push("&bbox=")
            url.push(geoCanvas.extGeo.xMin)
            url.push(",")
            url.push(geoCanvas.extGeo.yMin)
            url.push(",")
            url.push(geoCanvas.extGeo.xMax)
            url.push(",")
            url.push(geoCanvas.extGeo.yMax)

            const urlS = url.join("")
            //console.log(urlS)

            if (!this.img) {
                this.img = new Image()
                this.img.onload = () => {
                    geoCanvas.redraw()
                }
                this.img.onerror = () => {
                    //case when no image
                    console.warn("Could not retrieve WMS background image from", urlS)
                }
            }

            //set URL to launch the download
            this.img.src = urlS
        }

    }
}


/***/ }),

/***/ "./src/layer/GridLayer.js":
/*!********************************!*\
  !*** ./src/layer/GridLayer.js ***!
  \********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GridLayer: () => (/* binding */ GridLayer)
/* harmony export */ });
Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Layer.js'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
//@ts-check


;

/**
 * A layer, which specifies a dataset to be shown with specified styles.
 *
 * @author Joseph Davies, Julien Gaffuri
 */
class GridLayer extends Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Layer.js'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()) {
    /**
     * @param {import("../Dataset").Dataset|import("../MultiResolutionDataset").MultiResolutionDataset} dataset The dataset to show.
     * @param {Array.<import("../Style").Style>} styles The styles, ordered in drawing order.
     * @param {{visible?:function(number):boolean,alpha?:function(number):number,blendOperation?:function(number):GlobalCompositeOperation,minPixelsPerCell?:number,cellInfoHTML?:function(import("../Dataset").Cell):string}} opts
     */
    constructor(dataset, styles, opts = {}) {
        super(opts)
        opts = opts || {}

        /** @type {import("../Dataset").Dataset|import("../MultiResolutionDataset").MultiResolutionDataset} */
        this.dataset = dataset
        /** @type {Array.<import("../Style").Style>} */
        this.styles = styles

        /** 
         * This parameter is used when the dataset is a MultiResolutionDataset.
         * It defines the minimum number of pixels a grid cell should have to select the dataset to display based on its resolution.
         * A low value, means that the map will be more detailled (smaller cells).
         * A high value, means that the map will be less detailled (larger cells).
         * This value should be higher than 1, otherwise it means a grid cell is smaller than the screen resolution.
         * For more complex cell representations that require some more map space, this value should be higher.
         * @type {number} */
        this.minPixelsPerCell = opts.minPixelsPerCell || 3

        /**
         * The function returning cell information as HTML.
         * This is typically used for tooltip information.
         * @type {function(import("../Dataset").Cell, number):string} */
        this.cellInfoHTML = opts.cellInfoHTML || GridLayer.defaultCellInfoHTML
    }

    /** */
    draw(geoCanvas, legend) {

        //get zoom level
        const z = geoCanvas.view.z

        //get layer dataset component
        /** @type {import('../Dataset.js').Dataset|undefined} */
        const dsc = this.getDataset(z)
        if (!dsc) return

        //launch data download, if necessary
        dsc.getData(geoCanvas.extGeo)

        //update dataset view cache
        dsc.updateViewCache(geoCanvas.extGeo)

        //draw cells, style by style
        for (const s of this.styles) {

            //check if style is visible
            if (s.visible && !s.visible(z)) continue

            //set style alpha and blend mode
            //TODO: multiply by layer alpha ?
            geoCanvas.ctx.globalAlpha = s.alpha ? s.alpha(z) : 1.0
            geoCanvas.ctx.globalCompositeOperation = s.blendOperation(z)

            //draw with style
            s.draw(dsc.getViewCache(), geoCanvas, dsc.getResolution())

            //draw style filter
            if (s.filterColor)
                s.drawFilter(geoCanvas)
        }

        //add legend element
        if (legend) {
            for (const s of this.styles) {
                //check if style is visible
                if (s.visible && !s.visible(z)) continue
                for (const lg of s.legends) {
                    //console.log(s, lg)
                    //this.legend.append(lg.div)
                    //s1.node().appendChild(s2.node())
                    legend.node().append(lg.div.node())
                }

                //case for styles of styles, like kernel smoothing
                //TODO do better
                if (s['styles']) {
                    for (const s2 of s['styles']) {
                        if (s2.visible && !s2.visible(z)) continue
                        for (const lg of s2.legends) {
                            //console.log(s, lg)
                            //this.legend.append(lg.div)
                            //s1.node().appendChild(s2.node())
                            legend.node().append(lg.div.node())
                        }
                    }
                }
            }
        }

    }



    /**
     * Return the relevant dataset component for a specified zoom.
     *
     * @param {number} z
     * @returns {import("../Dataset").Dataset|undefined}
     * */
    getDataset(z) {
        return this.dataset.getDataset(z, this.minPixelsPerCell);
    }

    /**
     * The default function returning cell information as HTML.
     * This is typically used for tooltip information.
     *
     * @param {import("../Dataset").Cell} cell
     * @returns {string}
     */
    static defaultCellInfoHTML(cell) {
        const buf = []
        for (const key of Object.keys(cell)) {
            if (key === 'x') continue
            if (key === 'y') continue
            buf.push('<b>', key, '</b>', ' : ', cell[key], '<br>')
        }
        return buf.join('')
    }
}


/***/ }),

/***/ "./src/layer/LabelLayer.js":
/*!*********************************!*\
  !*** ./src/layer/LabelLayer.js ***!
  \*********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LabelLayer: () => (/* binding */ LabelLayer)
/* harmony export */ });
Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Layer.js'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
/* harmony import */ var d3_fetch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-fetch */ "./node_modules/d3-fetch/src/dsv.js");
//@ts-check


;


/** A label. The name is the text to show. (x,y) are the coordinates in the same CRS as the grid.
 * @typedef {{name: string, x:number, y:number }} Label */

/**
 * A (generic) layer for placename labels, to be shown on top of the grid layers.
 * The input is a CSV file with the position (x, y) of the labels and name + some other info on the label importance.
 * If the label data is not in the expected format or in the same CRS as the grid, it can be corrected with the "preprocess" function.
 * The selection of the label, their style (font, weight, etc.) and color can be specified depending on their importance and the zoom level.
 *
 * @author Joseph Davies, Julien Gaffuri
 */
class LabelLayer extends Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Layer.js'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()) {
    /**
     * @param {object} opts
     */
    constructor(opts) {
        super(opts)
        opts = opts || {}

        /**
         * The URL of the label data, as CSV file.
         * The file should contain the information for each label such as the text, the position and other information for the display of the label according to the zoom level.
         * If necessary, this data can be reformated with the 'preprocess' parameter.
         * @private
         * @type {string} */
        this.url = opts.url

        /** Specify if and how a label should be drawn, depending on its importance and the zoom level.
         * @private
         * @type {function(Label,number):string} */
        this.style = opts.style || (() => 'bold 1em Arial')

        /** Specify the label color, depending on its importance and the zoom level.
         * @private
         * @type {function(Label,number):string} */
        this.color = opts.color || (opts.dark ? () => '#ddd' : () => '#222')

        /** Specify the label halo color, depending on its importance and the zoom level.
         * @private
         * @type {function(Label,number):string} */
        this.haloColor = opts.haloColor || (opts.dark ? () => '#000000BB' : () => '#FFFFFFBB')

        /** Specify the label halo width, depending on its importance and the zoom level.
         * @private
         * @type {function(Label,number):number} */
        this.haloWidth = opts.haloWidth || (() => 4)

        /** The anchor where to draw the text, from label position. See HTML-canvas textAlign property.
         * "left" || "right" || "center" || "start" || "end"
         * @private
         * @type {CanvasTextAlign} */
        this.textAlign = opts.textAlign || 'start'

        /**
         * @private
         * @type {Array.<number>} */
        this.offsetPix = opts.offsetPix || [5, 5]

        /**
         * A preprocess to run on each label after loading.
         * It can be used to apply some specific treatment before, format the label data, project coordinates, etc.
         * Return false if the label should not be kept.
         * @private
         * @type {function(Label):boolean} */
        this.preprocess = opts.preprocess

        /**
         * @private
         * @type {Array.<Label> | undefined} */
        this.labels = undefined

        /**
         * @private
         * @type {string} */
        this.loadingStatus = 'notLoaded'
    }

    /**
     * Draw the label layer.
     *
     * @param {import("../GeoCanvas").GeoCanvas} geoCanvas The canvas where to draw the layer.
     * @returns {void}
     */
    draw(geoCanvas) {
        //load labels, if not done yet.
        if (!this.labels) {
            this.load(geoCanvas.redraw)
            return
        }

        //
        const z = geoCanvas.view.z

        //text align
        geoCanvas.ctx.textAlign = this.textAlign || 'start'

        //line join and cap
        geoCanvas.ctx.lineJoin = 'bevel' //|| "round" || "miter";
        geoCanvas.ctx.lineCap = 'butt' //|| "round" || "square";

        //draw in pix coordinates
        geoCanvas.initCanvasTransform()

        //draw labels, one by one
        for (const lb of this.labels) {
            //get label style
            const st = this.style(lb, z)
            if (!st) continue
            geoCanvas.ctx.font = st

            //check label within the view, to be drawn
            if (!geoCanvas.toDraw(lb)) continue

            //position
            const xP = geoCanvas.geoToPixX(lb.x) + this.offsetPix[0]
            const yP = geoCanvas.geoToPixY(lb.y) - this.offsetPix[1]

            //label stroke, for the halo
            if (this.haloColor && this.haloWidth) {
                const hc = this.haloColor(lb, z)
                const hw = this.haloWidth(lb, z)
                if (hc && hw && hw > 0) {
                    geoCanvas.ctx.strokeStyle = hc
                    geoCanvas.ctx.lineWidth = hw
                    geoCanvas.ctx.strokeText(lb.name, xP, yP)
                }
            }

            //label fill
            if (this.color) {
                const col = this.color(lb, z)
                if (col) {
                    geoCanvas.ctx.fillStyle = col
                    geoCanvas.ctx.fillText(lb.name, xP, yP)
                }
            }
        }
    }

    /**
     * Load data for labels, from URL this.url
     * @param {function():void} callback
     * @private
     */
    async load(callback) {
        if (!this.url) {
            console.log('Failed loading labels: No URL specified. ' + this.url)
            this.loadingStatus = 'failed'
            this.labels = []
            return
        }

        //check if data already loaded
        if (this.loadingStatus != 'notLoaded') return

        //load data
        this.loadingStatus = 'loading'

        try {
            /** @type { Array.<Label> } */
            const data = await (0,d3_fetch__WEBPACK_IMPORTED_MODULE_1__.csv)(this.url)

            //preprocess/filter
            if (this.preprocess) {
                this.labels = []
                for (const c of data) {
                    const b = this.preprocess(c)
                    if (b == false) continue
                    this.labels.push(c)
                }
            } else {
                //store labels
                this.labels = data
            }

            this.loadingStatus = 'loaded'

            //redraw
            if (callback) callback()
        } catch (error) {
            console.log('Failed loading labels from ' + this.url)
            this.labels = []
            this.loadingStatus = 'failed'
        }
    }
}


/***/ }),

/***/ "./src/layer/LineLayer.js":
/*!********************************!*\
  !*** ./src/layer/LineLayer.js ***!
  \********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LineLayer: () => (/* binding */ LineLayer)
/* harmony export */ });
Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Layer.js'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
/* harmony import */ var d3_fetch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-fetch */ "./node_modules/d3-fetch/src/json.js");
//@ts-check


;


/**
 * @author Joseph Davies, Julien Gaffuri
 */
class LineLayer extends Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Layer.js'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()) {
    /**
     * @param {object} opts
     */
    constructor(opts) {
        super(opts)
        opts = opts || {}

        /**
         * @private
         * @type {string} */
        this.url = opts.url

        /**
         * A preprocess to run on each feature after loading.
         * It can be used to apply some specific treatment before, format the label data, project coordinates, etc.
         * Return false if the label should not be kept.
         * @private
         * @type {function(object):boolean} */
        this.preprocess = opts.preprocess

        /**
         * @private
         * @type {function(object,number):string} */
        this.color = opts.color || ((f, z) => 'gray')
        /**
         * @private
         * @type {function(object,number):number} */
        this.width = opts.width || ((f, z) => 2)
        /**
         * @private
         * @type {function(object,number):Array.<number>|undefined} */
        this.lineDash = opts.lineDash || ((f, z) => undefined)

        /**
         * @private
         * @type {Array.<object> | undefined} */
        this.fs = undefined

        /**
         * @private
         * @type {string} */
        this.loadingStatus = 'notLoaded'
    }

    /**
     * Draw the layer.
     * @param {import("../GeoCanvas").GeoCanvas} geoCanvas The canvas where to draw the layer.
     * @returns {void}
     */
    draw(geoCanvas) {
        //load data, if not done yet.
        if (!this.fs) {
            this.load(geoCanvas.redraw)
            return
        }

        //TODO sort lines by width ?

        //
        const z = geoCanvas.view.z

        for (const f of this.fs) {
            const cs = f.geometry.coordinates
            if (cs.length < 2) continue

            //set color
            const col = this.color(f, z)
            if (!col || col == 'none') continue
            geoCanvas.ctx.strokeStyle = col

            //set linewidth
            const wP = this.width(f, z)
            if (!wP || wP < 0) continue
            geoCanvas.ctx.lineWidth = wP * z

            //set line dash
            const ldP = this.lineDash(f, z)
            if (ldP) geoCanvas.ctx.setLineDash(ldP)

            //draw line
            geoCanvas.ctx.beginPath()
            geoCanvas.ctx.moveTo(cs[0][0], cs[0][1])
            for (let i = 1; i < cs.length; i++) geoCanvas.ctx.lineTo(cs[i][0], cs[i][1])
            geoCanvas.ctx.stroke()
        }

        //...
        geoCanvas.ctx.setLineDash([])
    }

    /**
     * Load data for labels, from URL this.url
     * @param {function():void} callback
     * @private
     */
    async load(callback) {
        if (!this.url) {
            console.log('Failed loading boundaries: No URL specified. ' + this.url)
            this.loadingStatus = 'failed'
            this.labels = []
            return
        }

        //check if data already loaded
        if (this.loadingStatus != 'notLoaded') return

        //load data
        this.loadingStatus = 'loading'

        try {
            const data_ = await (0,d3_fetch__WEBPACK_IMPORTED_MODULE_1__["default"])(this.url)

            /** @type { Array.<object> } */
            const data = data_.features

            //preprocess/filter
            if (this.preprocess) {
                this.fs = []
                for (const c of data) {
                    const b = this.preprocess(c)
                    if (b == false) continue
                    this.fs.push(c)
                }
            } else {
                //store labels
                this.fs = data
            }

            this.loadingStatus = 'loaded'

            //redraw
            if (callback) callback()
        } catch (error) {
            console.log('Failed loading boundaries from ' + this.url)
            this.fs = []
            this.loadingStatus = 'failed'
        }
    }
}


/***/ }),

/***/ "./src/legend/ColorCategoryLegend.js":
/*!*******************************************!*\
  !*** ./src/legend/ColorCategoryLegend.js ***!
  \*******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ColorCategoryLegend: () => (/* binding */ ColorCategoryLegend)
/* harmony export */ });
Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Legend.js'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
//@ts-check


;

/**
 * A legend element for color categrories.
 *
 * @author Joseph Davies, Julien Gaffuri
 */
class ColorCategoryLegend extends Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Legend.js'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()) {
    /** @param {Object} opts */
    constructor(opts) {
        super(opts)
        opts = opts || {}

        //col/categories array, in display order
        /**
         * @private
         * @type {Array.<Array.<string>>} */
        this.colCat = opts.colCat || [['gray', '-']]

        /**
         * @private
         * @type {import("../Style").Shape} */
        this.shape = opts.shape || 'circle'
        this.dimension = opts.dimension || { r: 8 }
        this.strokeColor = opts.strokeColor || 'gray'
        this.strokeWidth = opts.strokeWidth || 1

        this.title = opts.title
        this.titleFontSize = opts.titleFontSize || '0.8em'
        this.titleFontWeight = opts.titleFontWeight || 'bold'

        //label
        this.labelFontSize = opts.labelFontSize || '0.8em'
    }

    /**
     */
    update() {
        //clear
        this.div.selectAll('*').remove()

        //build

        //title
        if (this.title)
            this.div
                .append('div')
                .style('font-size', this.titleFontSize)
                .style('font-weight', this.titleFontWeight)
                .style('margin-bottom', '7px')
                .text(this.title)

        //categories
        const nb = this.colCat.length
        if (nb == 0) return

        for (let i = 0; i < nb; i++) {
            const cat = this.colCat[i]

            //make div for category
            const d = this.div.append('div')
            //to enable vertical centering
            //.style("position", "relative")

            const sw = this.strokeWidth

            //draw graphic element: box / circle
            if (this.shape === 'square') {
                const h = this.dimension.h || 15
                const w = this.dimension.w || 20
                d.append('div')
                    .style('display', 'inline')

                    .append('svg')
                    .attr('width', w + 2 * sw)
                    .attr('height', h + 2 * sw)

                    .append('rect')
                    .attr('x', sw)
                    .attr('y', sw)
                    .attr('width', w)
                    .attr('height', h)
                    .style('fill', cat[0])
                    .style('stroke', this.strokeColor)
                    .style('stroke-width', this.strokeWidth)
            } else if (this.shape === 'circle') {
                const r = this.dimension.r || 8
                const h = 2 * r + 2 * sw
                d.append('div')
                    .style('display', 'inline')

                    .append('svg')
                    .attr('width', h)
                    .attr('height', h)

                    .append('circle')
                    .attr('cx', r + sw)
                    .attr('cy', r + sw)
                    .attr('r', r)
                    .style('fill', cat[0])
                    .style('stroke', this.strokeColor)
                    .style('stroke-width', this.strokeWidth)
            } else {
                throw new Error('Unexpected shape:' + this.shape)
            }

            //write label text
            d.append('div')
                //show on right of graphic
                .style('display', 'inline')

                //center vertically
                //.style("position", "absolute").style("top", "0").style("bottom", "0")

                .style('padding-left', '5px')
                .style('font-size', this.labelFontSize)
                .text(cat[1])
        }
    }
}


/***/ }),

/***/ "./src/legend/ColorDiscreteLegend.js":
/*!*******************************************!*\
  !*** ./src/legend/ColorDiscreteLegend.js ***!
  \*******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ColorDiscreteLegend: () => (/* binding */ ColorDiscreteLegend)
/* harmony export */ });
Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Legend.js'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
//@ts-check


;

/**
 * A legend element for discrete color style.
 * Inspiration: https://observablehq.com/@d3/color-legend
 *
 * @author Julien Gaffuri
 */
class ColorDiscreteLegend extends Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Legend.js'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()) {
    /** @param {Object} opts */
    constructor(opts) {
        super(opts)
        opts = opts || {}

        /** @private @type {function(import('../Style').ViewScale):Array.<string>} */
        this.colors = opts.colors
        /** @private @type {function(import('../Style').ViewScale):Array.<number>} */
        this.breaks = opts.breaks

        this.width = opts.width || 300
        this.height = opts.height || 15

        this.title = opts.title
        this.titleFontSize = opts.titleFontSize || '0.8em'
        this.titleFontWeight = opts.titleFontWeight || 'bold'

        this.tickSize = opts.tickSize || 3

        //label
        this.labelFontSize = opts.labelFontSize || '0.8em'
        this.invert = opts.invert
    }

    /**
     * @param {{viewScale:import('../Style').ViewScale} } opts
     */
    update(opts) {
        //clear
        this.div.selectAll('*').remove()

        //build

        //title
        if (this.title)
            this.div
                .append('div')
                .style('font-size', this.titleFontSize)
                .style('font-weight', this.titleFontWeight)
                .style('margin-bottom', '7px')
                .text(this.title)

        //get colors and breaks
        const colors = this.colors(opts.viewScale)
        const breaks = this.breaks(opts.viewScale)

        //classes
        const nb = colors.length
        if (nb == 0) return
        const w = this.width / nb

        //make svg element
        const svg = this.div
            .append('svg')
            .attr('width', this.width)
            .attr('height', this.height + this.tickSize + 2 + 10)

        //draw graphic elements
        for (let i = 0; i < nb; i++) {
            svg.append('rect')
                .attr('x', i * w)
                .attr('y', 0)
                .attr('width', w)
                .attr('height', this.height)
                .style('fill', colors[i])
        }

        //tick line
        for (let i = 1; i < nb; i++) {
            svg.append('line')
                .attr('x1', w * i)
                .attr('y1', 0)
                .attr('x2', w * i)
                .attr('y2', this.height + this.tickSize)
                .style('stroke', 'black')
        }

        //labels
        for (let i = 1; i < nb; i++) {

            let label = breaks[i - 1]
            if (isNaN(label) || label == undefined) continue

            //label
            svg.append('text')
                .attr('id', 'ticklabel_' + i)
                .attr('x', w * i)
                .attr('y', this.height + this.tickSize + 2)
                .style('font-size', this.labelFontSize)
                //.style("font-weight", "bold")
                //.style("font-family", "Arial")
                .style('text-anchor', 'middle')
                .style('alignment-baseline', 'top')
                .style('dominant-baseline', 'hanging')
                .style('pointer-events', 'none')
                .text(label)
        }
    }
}


/***/ }),

/***/ "./src/legend/ColorLegend.js":
/*!***********************************!*\
  !*** ./src/legend/ColorLegend.js ***!
  \***********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ColorLegend: () => (/* binding */ ColorLegend)
/* harmony export */ });
Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Legend.js'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
//@ts-check


;

/**
 * A legend element for continuous color style.
 * Inspiration: https://observablehq.com/@d3/color-legend
 *
 * @author Joseph Davies, Julien Gaffuri
 */
class ColorLegend extends Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Legend.js'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()) {
    /** @param {Object} opts */
    constructor(opts) {
        super(opts)
        opts = opts || {}

        //a function [0,1]->color for continuous colors
        //or array of colors for discrete colors
        this.colorScale = opts.colorScale

        //function (t[0,1]) -> value (for label text)
        this.textScale = opts.textScale || (t => t)

        this.title = opts.title
        this.tickSize = opts.tickSize || 6
        this.width = opts.width || 300
        this.height = opts.height || 15
        this.margin = opts.margin || 5
        this.ticks = opts.ticks || Math.floor(this.width / 50)
        this.tickFormat = opts.tickFormat
        this.tickUnit = opts.tickUnit

        this.fontSize = opts.fontSize || '0.8em'
        this.invert = opts.invert
    }

    /**
     * @param {{viewScale:import('../Style').ViewScale} } opts
     */
    update(opts) {
        //could happen when data is still loading
        //if (!opts.sColor) return

        //clear
        this.div.selectAll('*').remove()

        const titleHeight = 12

        const svgW = this.width + 2 * this.margin
        const svgH = this.height + 3 * this.margin + titleHeight + this.tickSize + 10
        const svg = this.div.append('svg').attr('width', svgW).attr('height', svgH)
        //  <rect width="300" height="100" style="fill:rgb(0,0,255);stroke-width:3;stroke:rgb(0,0,0)" />

        //title
        svg.append('text')
            .attr('x', this.margin)
            .attr('y', this.margin)
            .style('font-size', '0.8em')
            .style('font-weight', 'bold')
            .style('alignment-baseline', 'top')
            .style('dominant-baseline', 'hanging')
            .style('pointer-events', 'none')
            .text(this.title)

        const g = svg
            .append('g')
            .attr('transform', 'translate(' + this.margin + ' ' + (2 * this.margin + titleHeight) + ')')

        //draw color bar
        const w = this.width,
            h = this.height
        const step = 5
        for (let i = 0; i < w; i += step) {
            let t = i / (w - 1)
            if (this.invert) t = 1 - t
            g.append('rect')
                .attr('x', i)
                .attr('y', 0)
                .attr('width', step)
                .attr('height', h)
                .style('fill', this.colorScale(t, opts.viewScale))
        }

        for (let i = 0; i < this.ticks; i++) {
            let t = i / (this.ticks - 1)

            //tick line
            g.append('line')
                .attr('x1', w * t)
                .attr('y1', 0)
                .attr('x2', w * t)
                .attr('y2', h + this.tickSize)
                .style('stroke', 'black')

            //prepare tick label
            g.append('text')
                .attr('id', 'ticklabel_' + i)
                .attr('x', w * t)
                .attr('y', h + this.tickSize + 2)
                .style('font-size', this.fontSize)
                //.style("font-weight", "bold")
                //.style("font-family", "Arial")
                .style('text-anchor', i == 0 ? 'start' : i == this.ticks - 1 ? 'end' : 'middle')
                .style('alignment-baseline', 'top')
                .style('dominant-baseline', 'hanging')
                .style('pointer-events', 'none')
            //.text("-")
        }

        //update tick labels

        //label text format
        const f = this.tickFormat && this.tickFormat != 'text' ? this.tickFormat : (v) => v
        for (let i = 0; i < this.ticks; i++) {
            let t = i / (this.ticks - 1)

            const v = this.textScale(t, opts.viewScale)
            const text = (v ? f(v) : '0') + (this.tickUnit ? this.tickUnit : '')

            //tick label
            this.div.select('#' + 'ticklabel_' + i).text(text)
        }
    }
}


/***/ }),

/***/ "./src/legend/SegmentOrientationLegend.js":
/*!************************************************!*\
  !*** ./src/legend/SegmentOrientationLegend.js ***!
  \************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SegmentOrientationLegend: () => (/* binding */ SegmentOrientationLegend)
/* harmony export */ });
Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Legend.js'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
//@ts-check


;

/**
 * A legend element for segment orientation.
 *
 * @author Joseph Davies, Julien Gaffuri
 */
class SegmentOrientationLegend extends Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Legend.js'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()) {
    /** @param {Object} opts */
    constructor(opts) {
        super(opts)
        opts = opts || {}

        //title
        this.title = opts.title
        this.titleFontSize = opts.titleFontSize || '0.8em'
        this.titleFontWeight = opts.titleFontWeight || 'bold'

        //exageration
        this.exaggerationFactor = opts.exaggerationFactor || 0.5

        //color
        this.color = opts.color || 'gray'
        //orientation
        this.orientation = opts.orientation || 0
        //width
        this.widthPix = opts.widthPix || 3

        //label
        this.labelFontSize = opts.labelFontSize || '0.8em'
        this.labelUnitText = opts.labelUnitText || ''
    }

    /**
     * @param {{ style: import("../style/SegmentStyle").SegmentStyle, r: number, z: number, sColor: import("../Style").Stat, sLength: import("../Style").Stat, sWidth: import("../Style").Stat }} opts
     */
    update(opts) {
        //could happen when data is still loading
        if (!opts.sWidth) return

        //clear
        this.div.selectAll('*').remove()

        const d = this.div.append('div')

        //title
        if (this.title) {
            d.append('div')
                .attr('class', 'title')
                .style('font-size', this.titleFontSize)
                .style('font-weight', this.titleFontWeight)
                .text(this.title)
        }

        //compute segment width and length, in pix
        const sWidth = this.widthPix
        const sLength = (1 * opts.r) / opts.z

        //draw SVG segment
        const svgS = Math.max(sLength, sWidth)
        const svg = d.append('svg').attr('width', svgS).attr('height', svgS).style('', 'inline-block')

        const cos = Math.cos((-this.orientation * Math.PI) / 180)
        const sin = Math.sin((-this.orientation * Math.PI) / 180)
        const dc = svgS * 0.5,
            l2 = sLength * 0.5
        svg.append('line')
            .attr('x1', dc - cos * l2)
            .attr('y1', dc - sin * l2)
            .attr('x2', dc + cos * l2)
            .attr('y2', dc + sin * l2)
            .style('stroke', this.color)
            .style('stroke-width', sWidth)

        //text label
        d.append('div')
            //show on right of svg
            .style('display', 'inline')
            .style('padding-left', '5px')
            .style('font-size', this.labelFontSize)
            //.style("font-weight", "bold")
            .text(this.labelUnitText)
    }
}


/***/ }),

/***/ "./src/legend/SegmentWidthLegend.js":
/*!******************************************!*\
  !*** ./src/legend/SegmentWidthLegend.js ***!
  \******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SegmentWidthLegend: () => (/* binding */ SegmentWidthLegend)
/* harmony export */ });
Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Legend.js'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
//@ts-check


;

/**
 * A legend element for segment width.
 *
 * @author Joseph Davies, Julien Gaffuri
 */
class SegmentWidthLegend extends Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Legend.js'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()) {
    /** @param {Object} opts */
    constructor(opts) {
        super(opts)
        opts = opts || {}

        //title
        this.title = opts.title
        this.titleFontSize = opts.titleFontSize || '0.8em'
        this.titleFontWeight = opts.titleFontWeight || 'bold'

        //exageration
        //if set to 1, the segment width in the legend will be the one of the maximum width on the map
        this.exaggerationFactor = opts.exaggerationFactor || 0.5

        //color of the segment in the legend
        this.color = opts.color || 'gray'
        //orientation of the segment in the legend
        this.orientation = opts.orientation || 0

        //label
        this.labelFontSize = opts.labelFontSize || '0.8em'
        this.labelUnitText = opts.labelUnitText || ''
        this.labelFormat = opts.labelFormat

        //segment length in geo unit - a function of the resolution r and zoom level z
        this.lengthFun = opts.lengthExaggerationFactor || ((r, z) => r)
    }

    /**
     * @param {{ style: import("../style/SegmentStyle").SegmentStyle, r: number, z: number, sColor: import("../Style").Stat, sLength: import("../Style").Stat, sWidth: import("../Style").Stat }} opts
     */
    update(opts) {
        //could happen when data is still loading
        if (!opts.sWidth) return

        //clear
        this.div.selectAll('*').remove()

        const d = this.div.append('div')

        //title
        if (this.title) {
            d.append('div')
                .attr('class', 'title')
                .style('font-size', this.titleFontSize)
                .style('font-weight', this.titleFontWeight)
                .text(this.title)
        }

        //get segment max value
        const value_ = opts.sWidth.max * this.exaggerationFactor
        //TODO use gridviz.nice function
        //make 'nice' value (power of ten, or multiple)
        let pow10 = Math.log10(value_)
        pow10 = Math.floor(pow10)
        let value = Math.pow(10, pow10)
        if (value * 8 <= value_) value *= 8
        else if (value * 6 <= value_) value *= 6
        else if (value * 5 <= value_) value *= 5
        else if (value * 4 <= value_) value *= 4
        else if (value * 2.5 <= value_) value *= 2.5
        else if (value * 2 <= value_) value *= 2
        else if (value * 1.5 <= value_) value *= 1.5

        //compute segment width and length, in pix
        const sWidth = opts.widthFun(value, opts.r, opts.sWidth, opts.z) / opts.z
        const sLength = this.lengthFun(opts.r, opts.z) / opts.z

        //TODO use orientation

        const svg = d.append('svg').attr('width', sLength).attr('height', sWidth).style('', 'inline-block')

        //<line x1="0" y1="0" x2="200" y2="200" style="stroke:rgb(255,0,0);stroke-width:2" />
        svg.append('line')
            .attr('x1', 0)
            .attr('y1', sWidth / 2)
            .attr('x2', sLength)
            .attr('y2', sWidth / 2)
            .style('stroke', this.color)
            .style('stroke-width', sWidth)

        const valueT = this.labelFormat? this.labelFormat(value) : value
        d.append('div')
            //show on right of graphic
            .style('display', 'inline')
            .style('padding-left', '5px')
            .style('font-size', this.labelFontSize)
            //.style("font-weight", "bold")
            .text(valueT + (this.labelUnitText ? ' ' : '') + this.labelUnitText)
    }
}


/***/ }),

/***/ "./src/legend/SizeLegend.js":
/*!**********************************!*\
  !*** ./src/legend/SizeLegend.js ***!
  \**********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SizeLegend: () => (/* binding */ SizeLegend),
/* harmony export */   sizeDiscreteLegend: () => (/* binding */ sizeDiscreteLegend),
/* harmony export */   sizeDiscreteViewScaleLegend: () => (/* binding */ sizeDiscreteViewScaleLegend),
/* harmony export */   sizeLegend: () => (/* binding */ sizeLegend),
/* harmony export */   sizeLegendViewScale: () => (/* binding */ sizeLegendViewScale)
/* harmony export */ });
Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Legend.js'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
//@ts-check


;

/**
 * A legend element for proportional symbols.
 *
 * @author Joseph Davies, Julien Gaffuri
 */
class SizeLegend extends Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Legend.js'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()) {
    /** @param {Object} opts */
    constructor(opts) {
        super(opts)
        opts = opts || {}

        //if label is to be shown
        this.label = opts.label || undefined
        //if size corresponding to the value
        this.sizePix = opts.sizePix || undefined

        //title
        this.title = opts.title
        this.titleFontSize = opts.titleFontSize || '0.8em'
        this.titleFontWeight = opts.titleFontWeight || 'bold'

        //symbol
        /**
         * @private
         * @type {import("../Style").Shape} */
        this.shape = opts.shape || 'circle'
        this.fillColor = opts.fillColor || 'none'
        this.strokeColor = opts.strokeColor || 'gray'
        this.strokeWidth = opts.strokeWidth || 1

        //label
        this.labelFontSize = opts.labelFontSize || '0.8em'
        this.labelUnitText = opts.labelUnitText || ''
        this.labelFormat = opts.labelFormat

        //
        //this.div.style("text-align", "center")
    }

    /**
     * @param {{ viewScale:import('../Style').ViewScale, z:number, cells:Array.<import('../Dataset.js').Cell> }} opts
     */
    update(opts) {

        //clear
        this.div.selectAll('*').remove()


        //get label. May not be a number (!)
        let label = this.label(opts.viewScale, opts.cells)

        //compute size of symbol, in pix
        let sizePix
        if (this.sizePix)
            sizePix = this.sizePix(opts.viewScale, opts.z)
        else
            sizePix = opts.viewScale(+label) / opts.z
        if (!sizePix) return

        //format label text with format function
        if (this.labelFormat && !isNaN(+label)) label = this.labelFormat(label)


        const d = this.div.append('div')
        //to enable vertical centering
        //.style("position", "relative")

        //title
        if (this.title) {
            d.append('div')
                .attr('class', 'title')
                .style('font-size', this.titleFontSize)
                .style('font-weight', this.titleFontWeight)
                .text(this.title)
        }

        //shape
        const svg = d
            .append('svg')
            .attr('width', sizePix + this.strokeWidth + 2)
            .attr('height', sizePix + this.strokeWidth + 2)
            .style('', 'inline-block')

        if (this.shape === 'square') {
            svg.append('rect')
                .attr('x', 0)
                .attr('y', 0)
                .attr('width', sizePix)
                .attr('height', sizePix)
                .style('fill', this.fillColor)
                .style('stroke', this.strokeColor)
                .style('stroke-width', this.strokeWidth)
            //TODO test
        } else if (this.shape === 'circle') {
            // <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />
            const r = (sizePix + this.strokeWidth) * 0.5
            svg.append('circle')
                .attr('cx', r + 1)
                .attr('cy', r + 1)
                .attr('r', r)
                .style('fill', this.fillColor)
                .style('stroke', this.strokeColor)
                .style('stroke-width', this.strokeWidth)
        } else if (this.shape === 'donut') {
            //TODO
        } else if (this.shape === 'diamond') {
            //TODO
        } else {
            throw new Error('Unexpected shape:' + this.shape)
        }

        //label
        d.append('div')
            //show on right of graphic
            .style('display', 'inline')

            //center vertically
            //.style("position", "absolute").style("top", "0").style("bottom", "0")

            .style('padding-left', '5px')
            .style('font-size', this.labelFontSize)
            .text(label + (this.labelUnitText ? ' ' : '') + this.labelUnitText)
    }
}




/**
 * 
 * @param {Array.<number>} values 
 * @param {function} size 
 * @param {*} opts 
 * @returns 
 */
function sizeLegend(values, size, opts = {}) {
    const legends = []
    for (let value of values)
        legends.push(
            new SizeLegend({
                title: value == values[0] ? opts.title : undefined,
                sizePix: (vs, z) => size(value) / z,
                label: () => value,
                labelFormat: opts.labelFormat,
                fillColor: opts.fillColor || "white"
            })
        )
    return legends
}


/**
 * 
 * @param {function} value 
 * @param {*} opts 
 * @returns 
 */
function sizeLegendViewScale(value, opts = {}) {
    const k = opts.k || [0.9, 0.5, 0.2, 0.05]
    const legends = []
    for (let k_ of k)
        legends.push(
            new SizeLegend({
                title: k_ == k[0] ? opts.title : undefined,
                label: (viewScale, cells) => gridviz.nice(k_ * d3.max(cells, value)),
                labelFormat: opts.labelFormat,
                fillColor: opts.fillColor || "white"
            })
        )
    return legends
}



/**
 * A function which return a stack of size legends for a discrete classification.
 * @param {*} breaks 
 * @param {*} sizes 
 * @param {*} opts 
 * @returns 
 */
function sizeDiscreteLegend(breaks, sizes, opts = {}) {
    const f = opts.labelFormat || (x => x)
    const labelText = opts.labelText || defaultLabelText(f)
    const legends = []
    for (let i = sizes.length - 1; i >= 0; i--)
        legends.push(
            new SizeLegend({
                title: i == sizes.length - 1 ? opts.title : undefined,
                sizePix: (vs, z) => sizes[i] / z,
                label: () => labelText(breaks[i - 1], breaks[i]),
                fillColor: opts.fillColor || "white",
                shape: opts.shape
            })
        )
    return legends
}

/**
 * A function which return a stack of size legends for a discrete classification using a viewscale.
 * @param {number} classNumber 
 * @param {*} opts 
 * @returns 
 */
function sizeDiscreteViewScaleLegend(classNumber, opts = {}) {
    const f = opts.labelFormat || (x => x)
    const labelText = opts.labelText || defaultLabelText(f)
    const legends = []
    for (let i = classNumber - 1; i >= 0; i--) {
        legends.push(
            new SizeLegend({
                title: i == classNumber - 1 ? opts.title : undefined,
                sizePix: (viewScale, z) => viewScale.values[i] / z,
                label: (viewScale) => labelText(viewScale.breaks[i - 1], viewScale.breaks[i]),
                fillColor: opts.fillColor || "white",
                shape: opts.shape
            })
        )
    }
    return legends
}


function defaultLabelText(f) {
    return (v0, v1) => {
        if (v0 == undefined && v1 == undefined) return ""
        if (v1 == undefined) return "< " + f(v0)
        if (v0 == undefined) return "> " + f(v1)
        return f(v0) + " - " + f(v1)
    }
}


/***/ }),

/***/ "./src/style/CompositionStyle.js":
/*!***************************************!*\
  !*** ./src/style/CompositionStyle.js ***!
  \***************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CompositionStyle: () => (/* binding */ CompositionStyle)
/* harmony export */ });
Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Style.js'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
//@ts-check


;

/** @typedef {"flag"|"piechart"|"ring"|"segment"|"radar"|"agepyramid"|"halftone"} CompositionType */

/**
 * A style showing the composition of a total in different categories, with different color hues.
 * It consists of a symbol with different parts, whose size reflect the proportion of the corresponding category.
 * For a list of supported symbols, @see CompositionType
 * The symbol can be scaled depending on the cell importance.
 *
 * @author Julien Gaffuri
 */
class CompositionStyle extends Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Style.js'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()) {
    /** @param {object} opts */
    constructor(opts) {
        super(opts)
        opts = opts || {}

        /**
         * The dictionary (string -> color) which give the color of each category.
         * @type {object} */
        this.color = opts.color

        /**
         * A function returning the type of decomposition symbol of a cell, @see CompositionType
         * @type {function(import("../Dataset.js").Cell,number, number,object):CompositionType} */
        this.type = opts.type || (() => "flag") //(c,r,z,vs) => {}

        /** A function returning the size of a cell in geographical unit.
         * @type {function(import('../Dataset.js').Cell,number, number,object):number} */
        this.size = opts.size || ((c, r) => r) //(c,r,z,vs) => {}

        /** For style types with stripes (flag, segment), the orientation of the stripes (0 for horizontal, other for vertical).
         * @type {function(import("../Dataset.js").Cell,number,number,object):number} */
        this.stripesOrientation = opts.stripesOrientation || (() => 0) //(c,r,z,vs) => ...

        /** The function specifying an offset angle for a radar, halftone or pie chart style.
         * The angle is specified in degree. The rotation is anti-clockwise.
         * @type {function(import("../Dataset.js").Cell,number,number,object):number} */
        this.offsetAngle = opts.offsetAngle || (() => 0) //(c,r,z,vs) => ...

        /** The function specifying the height of the age pyramid, in geo unit.
         * @type {function(import("../Dataset.js").Cell,number,number,object):number} */
        this.agePyramidHeight = opts.agePyramidHeight || ((c, r) => r) //(c,r,z,vs) => ...

        /** For pie chart, this is parameter for internal radius, so that the pie chart looks like a donut.
         * 0 for normal pie charts, 0.5 to empty half of the radius.
         * @type {number} */
        this.pieChartInternalRadiusFactor = opts.pieChartInternalRadiusFactor || 0
    }

    /**
     * Draw cells as squares depending on their value.
     *
     * @param {Array.<import("../Dataset.js").Cell>} cells
     * @param {import("../GeoCanvas.js").GeoCanvas} geoCanvas
     * @param {number} resolution
     */
    draw(cells, geoCanvas, resolution) {
        //filter
        if (this.filter) cells = cells.filter(this.filter)

        //
        const z = geoCanvas.view.z

        //get view scale
        const viewScale = this.viewScale ? this.viewScale(cells, resolution, z) : undefined

        //nb categories - used for radar and agepyramid
        const nbCat = Object.entries(this.color).length

        //draw calls
        for (let cell of cells) {

            //size
            const sG = this.size ? this.size(cell, resolution, z, viewScale) : resolution
            if (!sG) continue

            //get offset
            const offset = this.offset(cell, resolution, z)

            //get symbol type
            const type_ = this.type ? this.type(cell, resolution, z, viewScale) : 'flag'

            //compute center position
            const xc = cell.x + offset.dx + (type_ === 'agepyramid' ? 0 : resolution * 0.5)
            const yc = cell.y + offset.dy + (type_ === 'agepyramid' ? 0 : resolution * 0.5)

            //compute offset angle, when relevant
            const offAng = this.offsetAngle ? (this.offsetAngle(cell, resolution, z, viewScale) * Math.PI) / 180 : 0

            if (type_ === 'agepyramid' || type_ === 'radar' || type_ === 'halftone') {
                //get cell category max value
                let maxVal = -Infinity
                for (let key of Object.keys(this.color)) {
                    const v = +cell[key]
                    if (v > maxVal) maxVal = v
                }

                //cumul
                let cumul = 0
                if (type_ === 'agepyramid' && this.agePyramidHeight)
                    cumul = (resolution - this.agePyramidHeight(cell, resolution, z, viewScale)) / 2
                if (type_ === 'radar' || type_ === 'halftone') cumul = Math.PI / 2 + offAng

                //compute the increment, which is the value to increment the cumul for each category
                const incr =
                    type_ === 'agepyramid'
                        ? (this.agePyramidHeight ? this.agePyramidHeight(cell, resolution, z, viewScale) : resolution) / nbCat
                        : type_ === 'radar' || type_ === 'halftone'
                            ? (2 * Math.PI) / nbCat
                            : undefined
                if (incr === undefined) throw new Error('Unexpected symbol type:' + type_)

                for (let [column, color] of Object.entries(this.color)) {
                    if (type_ === 'agepyramid') {
                        //set category color
                        geoCanvas.ctx.fillStyle = color

                        //get category value
                        const val = cell[column]

                        //compute category length - in geo
                        /** @type {number} */
                        const wG = (sG * val) / maxVal

                        //draw bar
                        geoCanvas.ctx.fillRect(xc + (resolution - wG) / 2, yc + cumul, wG, incr)

                        //next height
                        cumul += incr
                    } else if (type_ === 'radar') {
                        //set category color
                        geoCanvas.ctx.fillStyle = color

                        //get categroy value
                        const val = cell[column]

                        //compute category radius - in geo
                        /** @type {number} */
                        //const rG = this.radius(val, r, stat, cellStat, z)
                        const rG = (sG / 2) * Math.sqrt(val / maxVal)

                        //draw angular sector
                        geoCanvas.ctx.beginPath()
                        geoCanvas.ctx.moveTo(xc, yc)
                        geoCanvas.ctx.arc(xc, yc, rG, cumul - incr, cumul)
                        geoCanvas.ctx.lineTo(xc, yc)
                        geoCanvas.ctx.fill()

                        //next angular sector
                        cumul += incr
                    } else if (type_ === 'halftone') {
                        //set category color
                        geoCanvas.ctx.fillStyle = color

                        //get categroy value
                        const val = cell[column]

                        //compute category radius - in geo
                        /** @type {number} */
                        const rG = sG * 0.333 * Math.sqrt(val / maxVal)

                        //draw circle
                        geoCanvas.ctx.beginPath()
                        geoCanvas.ctx.arc(
                            xc + resolution * 0.25 * Math.cos(cumul),
                            yc + resolution * 0.25 * Math.sin(cumul),
                            rG,
                            0,
                            2 * Math.PI
                        )
                        geoCanvas.ctx.fill()

                        //next angular sector
                        cumul += incr
                    } else {
                        throw new Error('Unexpected symbol type:' + type_)
                    }
                }
            } else {
                //compute total
                let total = 0
                for (let column of Object.keys(this.color)) {
                    const v = +cell[column]
                    if (!v) continue
                    total += v
                }
                if (!total || isNaN(total)) continue

                //draw decomposition symbol
                let cumul = 0
                const d = resolution * (1 - sG / resolution) * 0.5
                const ori = this.stripesOrientation(cell, resolution, z, viewScale)

                for (let [column, color] of Object.entries(this.color)) {
                    //get share
                    const share = cell[column] / total
                    if (!share || isNaN(share)) continue

                    //set color
                    geoCanvas.ctx.fillStyle = color

                    //draw symbol part
                    if (type_ === 'flag') {
                        //draw flag stripe
                        if (ori == 0) {
                            //horizontal
                            geoCanvas.ctx.fillRect(
                                cell.x + d + offset.dx,
                                cell.y + d + cumul * sG + offset.dy,
                                sG,
                                share * sG
                            )
                        } else {
                            //vertical
                            geoCanvas.ctx.fillRect(
                                cell.x + d + cumul * sG + offset.dx,
                                cell.y + d + offset.dy,
                                share * sG,
                                sG
                            )
                        }
                    } else if (type_ === 'piechart') {
                        //draw pie chart angular sector

                        //compute angles
                        const a1 = cumul * 2 * Math.PI
                        const a2 = (cumul + share) * 2 * Math.PI

                        //draw
                        geoCanvas.ctx.beginPath()
                        geoCanvas.ctx.moveTo(xc, yc)
                        geoCanvas.ctx.arc(xc, yc, sG * 0.5, a1 + offAng, a2 + offAng)
                        if (this.pieChartInternalRadiusFactor)
                            geoCanvas.ctx.arc(
                                xc,
                                yc,
                                sG * 0.5 * this.pieChartInternalRadiusFactor,
                                a1 + offAng,
                                a2 + offAng,
                                true
                            )
                        geoCanvas.ctx.closePath()
                        geoCanvas.ctx.fill()
                    } else if (type_ === 'ring') {
                        //draw ring
                        geoCanvas.ctx.beginPath()
                        geoCanvas.ctx.arc(xc, yc, Math.sqrt(1 - cumul) * sG * 0.5, 0, 2 * Math.PI)
                        geoCanvas.ctx.fill()
                    } else if (type_ === 'segment') {
                        //draw segment sections
                        const wG = (sG * sG) / resolution
                        if (ori == 0) {
                            //horizontal
                            geoCanvas.ctx.fillRect(
                                cell.x + offset.dx,
                                cell.y + (resolution - wG) / 2 + cumul * wG + offset.dy,
                                resolution,
                                share * wG
                            )
                        } else {
                            //vertical
                            geoCanvas.ctx.fillRect(
                                cell.x + cumul * resolution + offset.dx,
                                cell.y + (resolution - wG) / 2 + offset.dy,
                                share * resolution,
                                wG
                            )
                        }
                    } else {
                        throw new Error('Unexpected symbol type:' + type_)
                    }

                    cumul += share
                }
            }
        }

        //update legends
        this.updateLegends({ style: this, r: resolution, z: z, viewScale: viewScale })
    }
}


/***/ }),

/***/ "./src/style/ContourStyle.js":
/*!***********************************!*\
  !*** ./src/style/ContourStyle.js ***!
  \***********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ContourStyle: () => (/* binding */ ContourStyle)
/* harmony export */ });
/* harmony import */ var _SideStyle_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SideStyle.js */ "./src/style/SideStyle.js");
//@ts-check


;

/** @typedef {{x:number,y:number,or:"v"|"h",value:number}} Side */

/**
 *
 * @author Julien Gaffuri
 */
class ContourStyle extends _SideStyle_js__WEBPACK_IMPORTED_MODULE_0__.SideStyle {
    /** @param {object} opts */
    constructor(opts) {
        super(opts)
        opts = opts || {}

        /** @type {number} */
        //opts.interval = opts.interval || 100

        /** @type {Array.<number>} */
        opts.breaks = opts.breaks || [100, 1000, 10000, 100000, 1000000]

        /** @type {function(Side,number,number):string} */
        opts.width = opts.width || (() => 1) //(s, r, z) => ...

        /** @type {function(Side,number,number):string} */
        opts.color = opts.color || (() => '#E7A935') //(s, r, z) => ...

        //override method for contour drawing

        const getClass = function (v) {
            if (v == undefined) return 0
            for (let i = 0; i < opts.breaks.length; i++) if (v < opts.breaks[i]) return i
            return opts.breaks.length
        }

        this.value = (v1, v2, r, s, z) => {
            //if (!v1 || !v2) return 0
            return Math.abs(getClass(v2) - getClass(v1))

            //check if v1 - v2 cross a contour line
            //const r1 = Math.floor(v1 / opts.interval);
            //const r2 = Math.floor(v2 / opts.interval);
            //return Math.abs(r2 - r1);
        }

        //same color for all
        this.color = (side, r, s, z) => (side.value ? opts.color(side, r, z) : undefined)

        //width: multiple of
        this.width = (side, r, s, z) => side.value * z * opts.width(side, r, z)
    }
}


/***/ }),

/***/ "./src/style/DotDensityStyle.js":
/*!**************************************!*\
  !*** ./src/style/DotDensityStyle.js ***!
  \**************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DotDensityStyle: () => (/* binding */ DotDensityStyle)
/* harmony export */ });
Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Style.js'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
/* harmony import */ var d3_random__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! d3-random */ "./node_modules/d3-random/src/normal.js");
/* harmony import */ var _utils_webGLUtils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/webGLUtils.js */ "./src/utils/webGLUtils.js");
/* harmony import */ var _utils_WebGLSquareColoring_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/WebGLSquareColoring.js */ "./src/utils/WebGLSquareColoring.js");
/* harmony import */ var d3_color__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! d3-color */ "./node_modules/d3-color/src/color.js");
/* harmony import */ var _utils_utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/utils.js */ "./src/utils/utils.js");
//@ts-check


;






/**
 *
 * @author Julien Gaffuri
 */
class DotDensityStyle extends Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Style.js'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()) {
    /** @param {object} opts */
    constructor(opts) {
        super(opts)
        opts = opts || {}

        /** The name of the column/attribute of the tabular data where to retrieve the variable for dot number.
         * @type {string} */
        this.nbCol = opts.nbCol

        /** A function returning the number of dots for a cell value.
         * @type {function(number,number,import("../Style").Stat,number):number} */
        this.nb = opts.nb || ((v, r, s, z) => (((0.3 * r * r) / (z * z)) * v) / s.max)

        /** The color of the dots. Same color for all dots within a cell.
         * @type {function(import("../Dataset").Cell):string} */
        this.color = opts.color || (() => '#FF5733')

        /** A function returning the size of the dots, in geo unit.
         * @type {function(number,number):number} */
        this.dotSize = opts.dotSize //|| ((r, z) => ...

        /** A function returning the sigma of the distribution from the resolution, in geo unit.
         * @type {function(number,number):number} */
        this.sigma = opts.sigma //|| ((r,z) => ...
    }

    /**
     * Draw cells as text.
     *
     * @param {Array.<import("../Dataset").Cell>} cells
     * @param {number} resolution
     * @param {import("../GeoCanvas").GeoCanvas} geoCanvas
     */
    draw(cells, geoCanvas, resolution) {
        if (_utils_utils_js__WEBPACK_IMPORTED_MODULE_3__.monitor) (0,_utils_utils_js__WEBPACK_IMPORTED_MODULE_3__.monitorDuration)('*** DotDensityStyle draw')

        //filter
        if (this.filter) cells = cells.filter(this.filter)

        //
        const z = geoCanvas.view.z

        let stat
        if (this.nbCol) stat = Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Style.js'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()).getStatistics(cells, (c) => c[this.nbCol], true)
        if (!stat) return

        //size of the dots
        const sGeo = this.dotSize ? this.dotSize(resolution, z) : 2 * z

        //make random function
        const sig = this.sigma ? this.sigma(resolution, z) : resolution * 0.4
        const rand = (0,d3_random__WEBPACK_IMPORTED_MODULE_4__["default"])(0, sig)

        if (_utils_utils_js__WEBPACK_IMPORTED_MODULE_3__.monitor) (0,_utils_utils_js__WEBPACK_IMPORTED_MODULE_3__.monitorDuration)(' preparation')

        if ((0,_utils_webGLUtils_js__WEBPACK_IMPORTED_MODULE_1__.checkWebGLSupport)()) {
            //create canvas and webgl renderer
            const cvWGL = (0,_utils_webGLUtils_js__WEBPACK_IMPORTED_MODULE_1__.makeWebGLCanvas)(geoCanvas.w + '', geoCanvas.h + '')
            if (!cvWGL) {
                console.error('No webGL')
                return
            }

            //create webGL program
            const prog = new _utils_WebGLSquareColoring_js__WEBPACK_IMPORTED_MODULE_2__.WebGLSquareColoring(cvWGL.gl, sGeo / z)

            if (_utils_utils_js__WEBPACK_IMPORTED_MODULE_3__.monitor) (0,_utils_utils_js__WEBPACK_IMPORTED_MODULE_3__.monitorDuration)(' webgl creation')

            const r2 = resolution / 2

            let col, offset, nb, cx, cy, cc
            for (let c of cells) {
                //get color
                col = this.color(c)
                if (!col || col === 'none') continue

                //get offset
                offset = this.offset(c, resolution, z)

                //number of dots
                nb = this.nb(c[this.nbCol], resolution, stat, z)

                //cell center
                cx = c.x + offset.dx + r2
                cy = c.y + offset.dy + r2

                //convert color
                cc = (0,d3_color__WEBPACK_IMPORTED_MODULE_5__["default"])(col)
                if (!cc) return

                //random points
                for (let i = 0; i <= nb; i++)
                    prog.addPointData2(cx + rand(), cy + rand(), cc.r, cc.g, cc.b, cc.opacity)
            }

            if (_utils_utils_js__WEBPACK_IMPORTED_MODULE_3__.monitor) (0,_utils_utils_js__WEBPACK_IMPORTED_MODULE_3__.monitorDuration)(' data preparation')

            //draw
            prog.draw(geoCanvas.getWebGLTransform())

            if (_utils_utils_js__WEBPACK_IMPORTED_MODULE_3__.monitor) (0,_utils_utils_js__WEBPACK_IMPORTED_MODULE_3__.monitorDuration)(' webgl drawing')

            //draw in canvas geo
            geoCanvas.initCanvasTransform()
            geoCanvas.ctx.drawImage(cvWGL.canvas, 0, 0)

            if (_utils_utils_js__WEBPACK_IMPORTED_MODULE_3__.monitor) (0,_utils_utils_js__WEBPACK_IMPORTED_MODULE_3__.monitorDuration)(' canvas drawing')
        } else {
            for (let c of cells) {
                //get color
                const col = this.color(c)
                if (!col || col === 'none') continue
                //set color
                geoCanvas.ctx.fillStyle = col

                //get offset
                const offset = this.offset(c, resolution, z)

                //number of dots
                const nb = this.nb(c[this.nbCol], resolution, stat, z)

                //draw random dots
                const cx = c.x + offset.dx + resolution / 2,
                    cy = c.y + offset.dy + resolution / 2
                for (let i = 0; i <= nb; i++) {
                    geoCanvas.ctx.fillRect(cx + rand(), cy + rand(), sGeo, sGeo)
                }
            }
        }

        //update legends
        this.updateLegends({ style: this, r: resolution, z: z })

        if (_utils_utils_js__WEBPACK_IMPORTED_MODULE_3__.monitor) (0,_utils_utils_js__WEBPACK_IMPORTED_MODULE_3__.monitorDuration)('*** DotDensityStyle end draw')
    }
}


/***/ }),

/***/ "./src/style/IsoFenceStyle.js":
/*!************************************!*\
  !*** ./src/style/IsoFenceStyle.js ***!
  \************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   IsoFenceStyle: () => (/* binding */ IsoFenceStyle)
/* harmony export */ });
Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Style.js'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
//@ts-check


;

/** @typedef {{x:number,y:number,or:"v"|"h",c1:import('../Dataset.js').Cell|undefined,c2:import('../Dataset.js').Cell|undefined}} Side */

/**
 * @author Julien Gaffuri
 */
class IsoFenceStyle extends Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Style.js'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()) {

    /** @param {object} opts */
    constructor(opts) {
        super(opts)
        opts = opts || {}

        /**
         * The dictionary (string -> color) which give the color of each category.
         * @type {object} */
        this.color = opts.color

        /** A function returning the height of a cell in geographical unit.
         * @type {function(import('../Dataset.js').Cell,number, number,object):number} */
        this.height = opts.height || ((cell, resolution, z, viewScale) => resolution * 0.4)

        /** The perspective angle, in degree, within [-180,180], from [O,x] axis.
         * @type {number} */
        this.angle = opts.angle != undefined ? opts.angle : 50

        /** A function returning the corner line stroke style.
         * @type {function(import('../Dataset.js').Cell,number,number,number):string} */
        this.cornerLineStrokeColor = opts.cornerLineStrokeColor || ((c, r, z, angle) => "#999")

        /** A function returning the corner line width.
        * @type {function(import('../Dataset.js').Cell,number,number,number):number} */
        this.cornerLineWidth = opts.cornerLineWidth || ((c, r, z, angle) => (angle % 90 == 0 ? 0 : 0.8 * z))

        /**
        * Show vertical cross-sections.
        * @type {boolean} */
        this.sVert = opts.sVert != undefined ? opts.sVert : true

        /**
        * Show horizontal cross-sections.
        * @type {boolean} */
        this.sHor = opts.sHor != undefined ? opts.sHor : true
    }

    /**
     * @param {Array.<import("../Dataset.js").Cell>} cells
     * @param {import("../GeoCanvas.js").GeoCanvas} geoCanvas
     * @param {number} resolution
     * @override
     */
    draw(cells, geoCanvas, resolution) {
        //filter
        if (this.filter) cells = cells.filter(this.filter)

        //
        const z = geoCanvas.view.z

        //get view scale
        const viewScale = this.viewScale ? this.viewScale(cells, resolution, z) : undefined

        //nb categories - used for radar and agepyramid
        const cats = Object.keys(this.color)

        //half resolution
        const r2 = resolution / 2

        //get offset
        // @ts-ignore
        const offset = this.offset(undefined, resolution, z), dx = offset.dx, dy = offset.dy

        //make sides
        /**  @type {Array.<Side>} */
        const sides = []

        //make horizontal sides - except when angle%180=0
        //sort cells by x and y
        if (this.angle % 180 != 90 && this.sVert) {
            cells.sort((c1, c2) => (c2.x == c1.x ? c1.y - c2.y : c1.x - c2.x))
            let c1 = cells[0]
            for (let i = 1; i < cells.length; i++) {
                let c2 = cells[i]

                if ((c1.y + resolution == c2.y) && (c1.x == c2.x))
                    //cells in same column and touch along horizontal side
                    //make shared side
                    sides.push({ x: c1.x + r2, y: c2.y, or: 'h', c1: c1, c2: c2 })
                else {
                    //cells do not touch along horizontal side
                    //make two sides: top one for c1, bottom for c2
                    sides.push({ x: c1.x + r2, y: c1.y + resolution, or: 'h', c1: c1, c2: undefined })
                    sides.push({ x: c2.x + r2, y: c2.y, or: 'h', c1: undefined, c2: c2 })
                }

                c1 = c2
            }
        }

        //make vertical sides - except when angle%180=90
        //sort cells by y and x
        if (this.angle % 180 != 0 && this.sHor) {
            cells.sort((c1, c2) => (c2.y == c1.y ? c1.x - c2.x : c1.y - c2.y))
            let c1 = cells[0]
            for (let i = 1; i < cells.length; i++) {
                let c2 = cells[i]

                if ((c1.x + resolution == c2.x) && (c1.y == c2.y))
                    //cells in same row and touch along vertical side
                    //make shared side
                    sides.push({ x: c2.x, y: c1.y + r2, or: 'v', c1: c1, c2: c2 })
                else {
                    //cells do not touch along vertical side
                    //make two sides: right one for c1, left for c2
                    sides.push({ x: c1.x + resolution, y: c1.y + r2, or: 'v', c1: c1, c2: undefined })
                    sides.push({ x: c2.x, y: c2.y + r2, or: 'v', c1: undefined, c2: c2 })
                }

                c1 = c2
            }
        }

        //
        if (sides.length == 0) return

        //angle in radians
        const aRad = this.angle * Math.PI / 180, cos = Math.cos(aRad), sin = Math.sin(aRad)

        //sort sides so that the back ones are drawn first. This depends on the angle.
        //depending on distance to the reference corner point
        const xCorner = Math.abs(this.angle) < 90 ? geoCanvas.extGeo.xMin : geoCanvas.extGeo.xMax
        const yCorner = this.angle < 0 ? geoCanvas.extGeo.yMax : geoCanvas.extGeo.yMin
        sides.sort((s1, s2) => (Math.hypot(s2.x - xCorner, s2.y - yCorner) - Math.hypot(s1.x - xCorner, s1.y - yCorner)))

        //prepare function to draw corner line for a cell *c*
        const drawCornerLine = (cell) => {

            if (!cell) return
            //line style
            const lw = this.cornerLineWidth ? this.cornerLineWidth(cell, resolution, z, this.angle) : 0.8 * z
            if (lw == 0) return
            geoCanvas.ctx.strokeStyle = this.cornerLineStrokeColor ? this.cornerLineStrokeColor(cell, resolution, z, this.angle) : "#333"
            geoCanvas.ctx.lineWidth = lw

            //height - in geo
            const hG = this.height(cell, resolution, z, viewScale)

            //draw line
            geoCanvas.ctx.beginPath()
            geoCanvas.ctx.moveTo(cell.x + r2 + dx, cell.y + r2 + dy)
            geoCanvas.ctx.lineTo(cell.x + r2 + hG * cos + dx, cell.y + r2 + hG * sin + dy)
            geoCanvas.ctx.stroke()
        }

        //draw sides
        geoCanvas.ctx.lineCap = "round";
        for (let s of sides) {

            //heights - in geo
            const hG1 = s.c1 ? this.height(s.c1, resolution, z, viewScale) : 0,
                hG2 = s.c2 ? this.height(s.c2, resolution, z, viewScale) : 0

            //compute totals for both cells
            const total1 = computeTotal(s.c1, cats),
                total2 = computeTotal(s.c2, cats)
            if (total1 == 0 && total2 == 0) continue

            let cumul1 = 0, cumul2 = 0
            for (let [column, color] of Object.entries(this.color)) {
                //draw stripe of side s and category column

                //get values for both cells
                let v1 = s.c1 ? +s.c1[column] : 0
                let v2 = s.c2 ? +s.c2[column] : 0
                if (v1 == 0 && v2 == 0) continue

                //compute heights
                const h1 = hG1 * cumul1 / total1 || 0
                const h1n = hG1 * (cumul1 + v1) / total1 || 0
                const h2 = hG2 * cumul2 / total2 || 0
                const h2n = hG2 * (cumul2 + v2) / total2 || 0

                //make path
                geoCanvas.ctx.beginPath()
                if (s.or == "h") {
                    //horizontal side - vertical section
                    //bottom left
                    geoCanvas.ctx.moveTo(s.x + h1 * cos + dx, s.y - r2 + h1 * sin + dy)
                    //top left
                    geoCanvas.ctx.lineTo(s.x + h2 * cos + dx, s.y + r2 + h2 * sin + dy)
                    //top right
                    geoCanvas.ctx.lineTo(s.x + h2n * cos + dx, s.y + r2 + h2n * sin + dy)
                    //bottom right
                    geoCanvas.ctx.lineTo(s.x + h1n * cos + dx, s.y - r2 + h1n * sin + dy)
                } else {
                    //vertical side - horizontal section
                    //bottom left
                    geoCanvas.ctx.moveTo(s.x - r2 + h1 * cos + dx, s.y + h1 * sin + dy)
                    //bottom right
                    geoCanvas.ctx.lineTo(s.x + r2 + h2 * cos + dx, s.y + h2 * sin + dy)
                    //top right
                    geoCanvas.ctx.lineTo(s.x + r2 + h2n * cos + dx, s.y + h2n * sin + dy)
                    //top left
                    geoCanvas.ctx.lineTo(s.x - r2 + h1n * cos + dx, s.y + h1n * sin + dy)
                }
                //cg.ctx.closePath()

                //fill
                geoCanvas.ctx.fillStyle = color
                geoCanvas.ctx.fill()

                cumul1 += v1
                cumul2 += v2

                //TODO draw only one line
                //draw corner line
                //if (s.or == "h") {
                drawCornerLine(s.c1)
                drawCornerLine(s.c2)
                //if (this.angle > 0 && s.or == "h") drawCornerLine(s.c2)
                //else drawCornerLine(s.c2)
                //}
            }
        }

        //update legends
        this.updateLegends({ style: this, r: resolution, z: z, viewScale: viewScale })
    }
}



const computeTotal = (cell, categories) => {
    if (!cell) return 0
    let total = 0
    for (let column of categories) {
        const v = cell[column]
        if (!v) continue
        total += +v
    }
    return total || 0
}


/***/ }),

/***/ "./src/style/JoyPlotStyle.js":
/*!***********************************!*\
  !*** ./src/style/JoyPlotStyle.js ***!
  \***********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   JoyPlotStyle: () => (/* binding */ JoyPlotStyle)
/* harmony export */ });
Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Style.js'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
//@ts-check


;

/**
 *
 * @author Julien Gaffuri
 */
class JoyPlotStyle extends Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Style.js'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()) {
    /** @param {object} opts */
    constructor(opts) {
        super(opts)
        opts = opts || {}

        /** A function returning the height of a cell in geographical unit.
         * @type {function(import('../Dataset.js').Cell,number, number,object):number} */
        this.height = opts.height || ((c, r) => r * Math.random()) //(c,r,z,vs) => {}

        /**
         * @type {function(number,{min:number, max:number},number,number):string} */
        this.lineColor = opts.lineColor || ((y, ys, r, z) => '#BBB')
        /**
         * @type {function(number,{min:number, max:number},number,number):number} */
        this.lineWidth = opts.lineWidth || ((y, ys, r, z) => z)
        /**
         * @type {function(number,{min:number, max:number},number,number):string} */
        this.fillColor = opts.fillColor || ((y, ys, r, z) => '#c08c5968')
    }


    /**
     * @param {Array.<import("../Dataset.js").Cell>} cells
     * @param {import("../GeoCanvas.js").GeoCanvas} geoCanvas
     * @param {number} resolution
     * @override
     */
    draw(cells, geoCanvas, resolution) {
        //filter
        if (this.filter) cells = cells.filter(this.filter)

        geoCanvas.ctx.lineJoin = 'round'

        //
        const z = geoCanvas.view.z

        //get view scale
        const viewScale = this.viewScale ? this.viewScale(cells, resolution, z) : undefined

        //index cells by y and x
        /**  @type {object} */
        const ind = {}
        for (const cell of cells) {
            let row = ind[cell.y]
            if (!row) {
                row = {}
                ind[cell.y] = row
            }
            row[cell.x] = this.height(cell, resolution, z, viewScale)
        }

        //compute extent
        const e = geoCanvas.extGeo
        if (!e) return
        const xMin = Math.floor(e.xMin / resolution) * resolution
        const xMax = Math.floor(e.xMax / resolution) * resolution
        const yMin = Math.floor(e.yMin / resolution) * resolution
        const yMax = Math.floor(e.yMax / resolution) * resolution

        /**  @type {{min:number, max:number}} */
        const ys = { min: yMin, max: yMax }

        //draw lines, row by row, stating from the top
        for (let y = yMax; y >= yMin; y -= resolution) {
            //get row
            const row = ind[y]

            //no row
            if (!row) continue

            //place first point
            geoCanvas.ctx.beginPath()
            geoCanvas.ctx.moveTo(xMin - resolution / 2, y)

            //store the previous height
            /** @type {number|undefined} */
            let hG_

            //go through the line cells
            for (let x = xMin; x <= xMax; x += resolution) {
                //get column value
                /** @type {number} */
                let hG = row[x]
                if (!hG) hG = 0

                if (hG || hG_) {
                    //draw line only when at least one of both values is non-null
                    //TODO test bezierCurveTo
                    geoCanvas.ctx.lineTo(x + resolution / 2, y + hG)
                } else {
                    //else move the point
                    geoCanvas.ctx.moveTo(x + resolution / 2, y)
                }
                //store the previous value
                hG_ = hG
            }

            //last point
            if (hG_) geoCanvas.ctx.lineTo(xMax + resolution / 2, y)

            //draw fill
            const fc = this.fillColor(y, ys, resolution, z)
            if (fc && fc != 'none') {
                geoCanvas.ctx.fillStyle = fc
                geoCanvas.ctx.fill()
            }

            //draw line
            const lc = this.lineColor(y, ys, resolution, z)
            const lw = this.lineWidth(y, ys, resolution, z)
            if (lc && lc != 'none' && lw > 0) {
                geoCanvas.ctx.strokeStyle = lc
                geoCanvas.ctx.lineWidth = lw
                geoCanvas.ctx.stroke()
            }
        }
    }
}


/***/ }),

/***/ "./src/style/LegoStyle.js":
/*!********************************!*\
  !*** ./src/style/LegoStyle.js ***!
  \********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LegoStyle: () => (/* binding */ LegoStyle)
/* harmony export */ });
/* harmony import */ var _TanakaStyle_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TanakaStyle.js */ "./src/style/TanakaStyle.js");
/* harmony import */ var _StrokeStyle_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./StrokeStyle.js */ "./src/style/StrokeStyle.js");
/* harmony import */ var _SquareColorCatWGLStyle_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SquareColorCatWGLStyle.js */ "./src/style/SquareColorCatWGLStyle.js");
Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Style.js'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
//@ts-check


;




/**
 * @author Julien Gaffuri
 */
class LegoStyle {
    /**
     * @param {string} col
     * @param {object} opts
     * @returns {Array.<Style>}
     */
    static get(col, opts) {
        opts = opts || {}

        //the colors
        //http://www.jennyscrayoncollection.com/2021/06/all-current-lego-colors.html
        //https://leonawicz.github.io/legocolors/reference/figures/README-plot-1.png
        opts.colors = opts.colors || [
            '#00852b', //darker green
            '#afd246', //light green
            '#fac80a', //dark yellow
            '#bb805a', //brown
            '#d67923', //mostard
            '#cb4e29', //redish
            '#b40000', //red
            '#720012', //dark red
            //"purple",
            //"#eee" //whithe
        ]

        opts.colDark = opts.colDark || '#333'
        opts.colBright = opts.colBright || '#aaa'
        opts.widthFactor = opts.widthFactor || 0.12

        //reuse tanaka as basis
        const ts = _TanakaStyle_js__WEBPACK_IMPORTED_MODULE_0__.TanakaStyle.get(col, opts)
        //style to show limits between pieces
        const sst = new _StrokeStyle_js__WEBPACK_IMPORTED_MODULE_1__.StrokeStyle({
            strokeColor: () => '#666',
            strokeWidth: (v, r, s, z) => 0.2 * z,
            filter: opts.filter,
        })

        return [
            ts[0],
            sst,
            ts[1],
            new LegoTopStyle({ colDark: opts.colDark, colBright: opts.colBright, filter: opts.filter }),
        ]
    }

    /**
     * @param {function(string):string} col
     * @param {object} opts
     * @returns {Array.<Style>}
     */
    static getCat(col, opts) {
        opts = opts || {}

        opts.colDark = opts.colDark || '#333'
        opts.colBright = opts.colBright || '#aaa'

        //
        const s = new _SquareColorCatWGLStyle_js__WEBPACK_IMPORTED_MODULE_2__.SquareColorCatWGLStyle({ colorCol: col, color: opts.color })
        //style to show limits between pieces
        const sst = new _StrokeStyle_js__WEBPACK_IMPORTED_MODULE_1__.StrokeStyle({ strokeColor: () => '#666', strokeWidth: (v, r, s, z) => 0.2 * z })

        return [s, sst, new LegoTopStyle({ colDark: opts.colDark, colBright: opts.colBright })]
    }
}

/**
 * A style to draw top circle of lego bricks.
 */
class LegoTopStyle extends Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Style.js'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()) {
    /** @param {object|undefined} opts */
    constructor(opts) {
        super(opts)
        opts = opts || {}
        this.colDark = opts.colDark || '#333'
        this.colBright = opts.colBright || '#aaa'
    }

    draw(cells, r, cg) {
        //filter
        if (this.filter) cells = cells.filter(this.filter)

        cg.ctx.lineWidth = 0.6 * cg.view.z

        //dark part
        cg.ctx.strokeStyle = this.colDark
        for (let c of cells) {
            cg.ctx.beginPath()
            cg.ctx.arc(c.x + r * 0.5, c.y + r * 0.5, r * 0.55 * 0.5, Math.PI / 4, -Math.PI * (3 / 4), true)
            cg.ctx.stroke()
        }

        //bright part
        cg.ctx.strokeStyle = this.colBright
        for (let c of cells) {
            cg.ctx.beginPath()
            cg.ctx.arc(c.x + r * 0.5, c.y + r * 0.5, r * 0.55 * 0.5, Math.PI / 4, -Math.PI * (3 / 4), false)
            cg.ctx.stroke()
        }
    }
}


/***/ }),

/***/ "./src/style/MosaicStyle.js":
/*!**********************************!*\
  !*** ./src/style/MosaicStyle.js ***!
  \**********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MosaicStyle: () => (/* binding */ MosaicStyle)
/* harmony export */ });
Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Style.js'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
//@ts-check


;

/**
 * @author Julien Gaffuri
 */
class MosaicStyle extends Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Style.js'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()) {
    /** @param {object} opts */
    constructor(opts) {
        super(opts)
        opts = opts || {}

        /** A function returning the color of the cell.
         * @type {function(import('../Dataset.js').Cell,number, number,object):string} */
        this.color = opts.color || (() => "#EA6BAC") //(c,r,z,vs) => {}

        /** The mosaic factor, within [0,0.5]. Set to 0 for no mosaic effect. Set to 0.5 for strong mosaic effect.
         * @type {number} */
        this.mosaicFactor = opts.mosaicFactor || 0.15

        /** The mosaic shadow factor, within [0,0.5]. Set to 0 for no mosaic shadow. Set to 0.5 for strong mosaic shadow.
         * @type {number} */
        this.shadowFactor = opts.shadowFactor || 0.2

        /** The mosaic shadow color.
         * @type {string} */
        this.shadowColor = opts.shadowColor || '#555'
    }

    /**
     *
     * @param {Array.<import("../Dataset").Cell>} cells
     * @param {import("../GeoCanvas").GeoCanvas} geoCanvas
     * @param {number} resolution
     */
    draw(cells, geoCanvas, resolution) {
        //filter
        if (this.filter) cells = cells.filter(this.filter)

        //
        const z = geoCanvas.view.z

        //get view scale
        const viewScale = this.viewScale ? this.viewScale(cells, resolution, z) : undefined

        //set stroke style, for shadow
        geoCanvas.ctx.strokeStyle = this.shadowColor
        geoCanvas.ctx.lineWidth = this.shadowFactor * resolution
        geoCanvas.ctx.lineJoin = 'round'
        geoCanvas.ctx.lineCap = 'butt'

        //function to compute position mosaic effect
        const d = resolution * this.mosaicFactor
        const mosaic = () => {
            return { x: Math.random() * d, y: Math.random() * d }
        }

        for (let cell of cells) {
            //set fill color
            const col = this.color ? this.color(cell, resolution, z, viewScale) : undefined
            if (!col || col === 'none') continue
            geoCanvas.ctx.fillStyle = col

            //get offset
            const offset = this.offset(cell, resolution, z)

            //compute position mosaic effect
            const ll = mosaic(),
                ul = mosaic(),
                lr = mosaic(),
                ur = mosaic()

            //stroke
            if (this.shadowFactor > 0) {
                geoCanvas.ctx.beginPath()
                geoCanvas.ctx.moveTo(cell.x + offset.dx + ll.x, cell.y + offset.dy + ll.y)
                geoCanvas.ctx.lineTo(cell.x + offset.dx + resolution - lr.x, cell.y + offset.dy + lr.y)
                geoCanvas.ctx.lineTo(cell.x + offset.dx + resolution - ur.x, cell.y + offset.dy + resolution - ur.y)
                geoCanvas.ctx.stroke()
            }

            //fill

            geoCanvas.ctx.beginPath()
            geoCanvas.ctx.moveTo(cell.x + offset.dx + ll.x, cell.y + offset.dy + ll.y)
            geoCanvas.ctx.lineTo(cell.x + offset.dx + resolution - lr.x, cell.y + offset.dy + lr.y)
            geoCanvas.ctx.lineTo(cell.x + offset.dx + resolution - ur.x, cell.y + offset.dy + resolution - ur.y)
            geoCanvas.ctx.lineTo(cell.x + offset.dx + ul.x, cell.y + offset.dy + resolution - ul.y)
            geoCanvas.ctx.fill()
        }

        //update legends
        this.updateLegends({ style: this, resolution: resolution, z: z, viewScale: viewScale })
    }
}


/***/ }),

/***/ "./src/style/NinjaStarStyle.js":
/*!*************************************!*\
  !*** ./src/style/NinjaStarStyle.js ***!
  \*************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NinjaStarStyle: () => (/* binding */ NinjaStarStyle)
/* harmony export */ });
Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Style.js'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
//@ts-check


;

/**
 *
 * @author Joseph Davies, Julien Gaffuri
 */
class NinjaStarStyle extends Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Style.js'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()) {
    /** @param {object} opts */
    constructor(opts) {
        super(opts)
        opts = opts || {}

        /** A function returning the color of the cell.
         * @type {function(import('../Dataset.js').Cell,number, number,object):string} */
        this.color = opts.color || (() => "#EA6BAC") //(c,r,z,vs) => {}

        /** A function returning the size of a cell, within [0,1]:
         *  - 0, nothing shown
         *  - 1, entire square
          * @type {function(import('../Dataset.js').Cell,number, number,object):number} */
        this.size = opts.size || ((cell, resolution) => resolution) //(c,r,z,vs) => {}

        /** A function returning the shape.
         * @type {function(import("../Dataset").Cell):string} */
        this.shape = opts.shape || (() => 'o')
    }

    /**
     *
     * @param {Array.<import("../Dataset").Cell>} cells
     * @param {number} resolution
     * @param {import("../GeoCanvas").GeoCanvas} geoCanvas
     */
    draw(cells, geoCanvas, resolution) {
        //filter
        if (this.filter) cells = cells.filter(this.filter)

        //
        const z = geoCanvas.view.z

        //get view scale
        const viewScale = this.viewScale ? this.viewScale(cells, resolution, z) : undefined

        const r2 = resolution * 0.5
        for (let cell of cells) {
            //color
            const col = this.color ? this.color(cell, resolution, z, viewScale) : undefined
            if (!col || col === 'none') continue
            geoCanvas.ctx.fillStyle = col

            //size - in geo unit
            let k = this.size(cell, resolution, z, viewScale)
            k = k < 0 ? 0 : k > 1 ? 1 : k
            const sG2 = k * r2

            //shape
            const shape = this.shape ? this.shape(cell) : 'o'
            if (shape === 'none') continue

            //get offset
            //TODO use
            //const offset = this.offset(cell, r, z)

            //center position
            const cx = cell.x + r2
            const cy = cell.y + r2

            if (shape === 'p') {
                geoCanvas.ctx.beginPath()
                geoCanvas.ctx.moveTo(cx, cy + r2)
                geoCanvas.ctx.lineTo(cx + sG2, cy + sG2)
                geoCanvas.ctx.lineTo(cx + r2, cy)
                geoCanvas.ctx.lineTo(cx + sG2, cy - sG2)
                geoCanvas.ctx.lineTo(cx, cy - r2)
                geoCanvas.ctx.lineTo(cx - sG2, cy - sG2)
                geoCanvas.ctx.lineTo(cx - r2, cy)
                geoCanvas.ctx.lineTo(cx - sG2, cy + sG2)
                geoCanvas.ctx.fill()
            } else if (shape === 'o') {
                geoCanvas.ctx.beginPath()
                geoCanvas.ctx.moveTo(cx, cy + sG2)
                geoCanvas.ctx.lineTo(cx + r2, cy + r2)
                geoCanvas.ctx.lineTo(cx + sG2, cy)
                geoCanvas.ctx.lineTo(cx + r2, cy - r2)
                geoCanvas.ctx.lineTo(cx, cy - sG2)
                geoCanvas.ctx.lineTo(cx - r2, cy - r2)
                geoCanvas.ctx.lineTo(cx - sG2, cy)
                geoCanvas.ctx.lineTo(cx - r2, cy + r2)
                geoCanvas.ctx.fill()
            } else {
                throw new Error('Unexpected shape:' + shape)
            }
        }

        //update legends
        this.updateLegends({ style: this, r: resolution, z: z, viewScale: viewScale })
    }
}


/***/ }),

/***/ "./src/style/PillarStyle.js":
/*!**********************************!*\
  !*** ./src/style/PillarStyle.js ***!
  \**********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PillarStyle: () => (/* binding */ PillarStyle)
/* harmony export */ });
Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Style.js'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
//@ts-check


;

/**
 * @author Julien Gaffuri
 */
class PillarStyle extends Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Style.js'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()) {
    //TODO make a webGL version ?

    /** @param {object} opts */
    constructor(opts) {
        super(opts)
        opts = opts || {}

        /** @type {string} */
        this.heightCol = opts.heightCol

        /** A function returning the height of the line representing a cell, in geo unit
         * @type {function(number,number,import("../Style").Stat|undefined,number):number} */
        this.height = opts.height

        /** @type {string} */
        this.colorCol = opts.colorCol

        /** A function returning the color of the line representing a cell.
         * @type {function(number,number,import("../Style").Stat|undefined):string} */
        this.color = opts.color || (() => '#c08c59') //bb

        /** @type {string} */
        this.widthCol = opts.widthCol

        /** A function returning the width of the line representing a cell, in geo unit
         * @type {function(number,number,import("../Style").Stat|undefined,number):number} */
        this.width = opts.width || ((v, r) => 0.5 * r)

        /** @type {boolean} */
        this.simple = opts.simple == true

        /** @type {number} */
        this.viewHeightFactor = opts.viewHeightFactor || 1.5
        //0,0 is the center
        /** @type {number} */
        this.viewSX = opts.viewSX == undefined ? 0 : opts.viewSX
        /** @type {number} */
        this.viewSY = opts.viewSY == undefined ? -0.5 : opts.viewSY

        //TODO replace with sun location ?
        /** @type {number} */
        this.shadowDirection =
            opts.shadowDirection == undefined ? (-40.3 * Math.PI) / 180.0 : opts.shadowDirection
        /** @type {number} */
        this.shadowFactor = opts.shadowFactor || 0.3
        /** @type {string} */
        this.shadowColor = opts.shadowColor || '#00000033'

        /** @type {string} */
        this.outlineCol = opts.outlineCol || '#FFFFFF'
        /** @type {number} */
        this.outlineWidthPix = opts.outlineWidthPix == undefined ? 0.5 : opts.outlineWidthPix
    }

    /**
     * Draw cells as segments.
     *
     * @param {Array.<import("../Dataset").Cell>} cells
     * @param {import("../GeoCanvas").GeoCanvas} geoCanvas
     * @param {number} resolution
     */
    draw(cells, geoCanvas, resolution) {
        //filter
        if (this.filter) cells = cells.filter(this.filter)

        //
        const z = geoCanvas.view.z

        let statHeight
        if (this.heightCol) {
            //compute size variable statistics
            statHeight = Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Style.js'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()).getStatistics(cells, (c) => c[this.heightCol], true)
        }

        let statColor
        if (this.colorCol) {
            //compute color variable statistics
            statColor = Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Style.js'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()).getStatistics(cells, (c) => c[this.colorCol], true)
        }

        let statWidth
        if (this.widthCol) {
            //and compute size variable statistics
            statWidth = Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Style.js'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()).getStatistics(cells, (c) => c[this.widthCol], true)
        }

        //get view center geo position
        const cvx = geoCanvas.view.x + this.viewSX * geoCanvas.w * z
        const cvy = geoCanvas.view.y + this.viewSY * geoCanvas.h * z
        //get view height
        const H = this.viewHeightFactor * (geoCanvas.w + geoCanvas.h) * 0.5 * z

        //sort cells by y and x
        //const distToViewCenter = (c) => { const dx = cvx - c.x, dy = cvy - c.y; return Math.sqrt(dx * dx + dy * dy) }
        cells.sort((c1, c2) => 100000000 * (c2.y - c1.y) + c1.x - c2.x)

        geoCanvas.ctx.lineCap = this.simple ? 'butt' : 'round'

        //draw shadows
        geoCanvas.ctx.strokeStyle = this.shadowColor
        geoCanvas.ctx.fillStyle = this.shadowColor
        for (let c of cells) {
            //width
            /** @type {number|undefined} */
            const wG = this.width ? this.width(c[this.widthCol], resolution, statWidth, z) : undefined
            if (!wG || wG < 0) continue

            //height
            /** @type {number|undefined} */
            const hG = this.height ? this.height(c[this.heightCol], resolution, statHeight, z) : undefined
            if (!hG || hG < 0) continue

            //get offset
            //TODO use that
            const offset = this.offset(c, resolution, z)

            //set width
            geoCanvas.ctx.lineWidth = wG

            //compute cell centre postition
            const cx = c.x + resolution / 2
            const cy = c.y + resolution / 2
            const ls = hG * this.shadowFactor

            //draw segment
            geoCanvas.ctx.beginPath()
            geoCanvas.ctx.moveTo(cx, cy)
            geoCanvas.ctx.lineTo(cx + ls * Math.cos(this.shadowDirection), cy + ls * Math.sin(this.shadowDirection))
            geoCanvas.ctx.stroke()

            /*
            if (this.simple) {
                //draw base circle
                cg.ctx.beginPath();
                cg.ctx.arc(
                    cx, cy,
                    wG * 0.5,
                    0, 2 * Math.PI, false);
                //cg.ctx.stroke();
                cg.ctx.fill();
            }*/
        }

        //draw pillars
        for (let c of cells) {
            //color
            /** @type {string|undefined} */
            const col = this.color ? this.color(c[this.colorCol], resolution, statColor) : undefined
            if (!col) continue

            //width
            /** @type {number|undefined} */
            const wG = this.width ? this.width(c[this.widthCol], resolution, statWidth, z) : undefined
            if (!wG || wG < 0) continue

            //height
            /** @type {number|undefined} */
            const hG = this.height ? this.height(c[this.heightCol], resolution, statHeight, z) : undefined
            if (!hG || hG < 0) continue

            //get offset
            //TODO use that
            const offset = this.offset(c, resolution, z)

            //compute cell centre postition
            const cx = c.x + resolution / 2
            const cy = c.y + resolution / 2

            //compute angle
            const dx = cx - cvx,
                dy = cy - cvy
            const a = Math.atan2(dy, dx)
            const D = Math.sqrt(dx * dx + dy * dy)
            const d = (D * hG) / (H - hG)

            if (this.simple) {
                //draw segment
                geoCanvas.ctx.strokeStyle = col
                geoCanvas.ctx.lineWidth = wG
                geoCanvas.ctx.beginPath()
                geoCanvas.ctx.moveTo(cx, cy)
                geoCanvas.ctx.lineTo(cx + d * Math.cos(a), cy + d * Math.sin(a))
                geoCanvas.ctx.stroke()
            } else {
                //draw background segment
                geoCanvas.ctx.strokeStyle = this.outlineCol
                geoCanvas.ctx.lineWidth = wG + 2 * this.outlineWidthPix * z
                geoCanvas.ctx.beginPath()
                geoCanvas.ctx.moveTo(cx, cy)
                geoCanvas.ctx.lineTo(cx + d * Math.cos(a), cy + d * Math.sin(a))
                geoCanvas.ctx.stroke()

                //draw segment
                geoCanvas.ctx.strokeStyle = col
                geoCanvas.ctx.lineWidth = wG
                geoCanvas.ctx.beginPath()
                geoCanvas.ctx.moveTo(cx, cy)
                geoCanvas.ctx.lineTo(cx + d * Math.cos(a), cy + d * Math.sin(a))
                geoCanvas.ctx.stroke()

                //draw top circle
                geoCanvas.ctx.strokeStyle = this.outlineCol
                //cg.ctx.fillStyle = "#c08c59"
                geoCanvas.ctx.lineWidth = this.outlineWidthPix * z
                geoCanvas.ctx.beginPath()
                geoCanvas.ctx.arc(cx + d * Math.cos(a), cy + d * Math.sin(a), wG * 0.5, 0, 2 * Math.PI, false)
                geoCanvas.ctx.stroke()
                //cg.ctx.fill();
            }
        }

        //in case...
        geoCanvas.ctx.lineCap = 'butt'

        //update legends
        this.updateLegends({ style: this, r: resolution, z: z, sColor: statColor })
    }
}


/***/ }),

/***/ "./src/style/SegmentStyle.js":
/*!***********************************!*\
  !*** ./src/style/SegmentStyle.js ***!
  \***********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SegmentStyle: () => (/* binding */ SegmentStyle)
/* harmony export */ });
Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Style.js'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
//@ts-check


;

/**
 * A style where each cell is represented by a segment whose length, width, color and orientation can vary according to statistical values.
 *
 * @author Julien Gaffuri
 */
class SegmentStyle extends Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Style.js'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()) {
    /** @param {object} opts */
    constructor(opts) {
        super(opts)
        opts = opts || {}

        /** A function returning the orientation (in degrees) of the segment representing a cell.
         * @type {function(import("../Dataset").Cell):number} */
        this.orientation = opts.orientation || (() => 0)

        /**
         * @type {string} */
        this.colorCol = opts.colorCol

        /** A function returning the color of the cell segment.
         * @type {function(number,number,import("../Style").Stat|undefined):string} */
        this.color = opts.color || (() => '#EA6BAC')

        /**
         * @type {string} */
        this.lengthCol = opts.lengthCol

        /** A function returning the length of the segment representing a cell, in geo unit
         * @type {function(number,number,import("../Style").Stat|undefined,number):number} */
        this.length = opts.length

        /**
         * @type {string} */
        this.widthCol = opts.widthCol

        /** A function returning the width of the segment representing a cell, in geo unit
         * @type {function(number,number,import("../Style").Stat|undefined,number):number} */
        this.width = opts.width
    }

    /**
     * Draw cells as segments.
     *
     * @param {Array.<import("../Dataset").Cell>} cells
     * @param {import("../GeoCanvas").GeoCanvas} geoCanvas
     * @param {number} resolution
     */
    draw(cells, geoCanvas, resolution) {
        //filter
        if (this.filter) cells = cells.filter(this.filter)

        //
        const z = geoCanvas.view.z

        let statColor
        if (this.colorCol) {
            //compute color variable statistics
            statColor = Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Style.js'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()).getStatistics(cells, (c) => c[this.colorCol], true)
        }

        let statLength
        if (this.lengthCol) {
            //if length is used, sort cells by length so that the longests are drawn first
            cells.sort((c1, c2) => c2[this.lengthCol] - c1[this.lengthCol])
            //and compute size variable statistics
            statLength = Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Style.js'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()).getStatistics(cells, (c) => c[this.lengthCol], true)
        }

        let statWidth
        if (this.widthCol) {
            //and compute size variable statistics
            statWidth = Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Style.js'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()).getStatistics(cells, (c) => c[this.widthCol], true)
        }

        //
        geoCanvas.ctx.lineCap = 'butt'

        //conversion factor degree -> radian
        const f = Math.PI / 180

        for (let c of cells) {
            //color
            /** @type {string|undefined} */
            const col = this.color ? this.color(c[this.colorCol], resolution, statColor) : undefined
            if (!col) continue

            //width
            /** @type {number|undefined} */
            const wG = this.width ? this.width(c[this.widthCol], resolution, statWidth, z) : undefined
            if (!wG || wG < 0) continue

            //length
            /** @type {number|undefined} */
            const lG = this.length ? this.length(c[this.lengthCol], resolution, statLength, z) : undefined
            if (!lG || lG < 0) continue

            //orientation (in radian)
            /** @type {number} */
            const or = this.orientation(c) * f
            if (or === undefined || isNaN(or)) continue

            //get offset
            const offset = this.offset(c, resolution, z)

            //set color and width
            geoCanvas.ctx.strokeStyle = col
            geoCanvas.ctx.lineWidth = wG

            //compute segment centre postition
            const cx = c.x + resolution / 2 + offset.dx
            const cy = c.y + resolution / 2 + offset.dy

            //compute segment direction
            const dx = 0.5 * Math.cos(or) * lG
            const dy = 0.5 * Math.sin(or) * lG

            //draw segment
            geoCanvas.ctx.beginPath()
            geoCanvas.ctx.moveTo(cx - dx, cy - dy)
            geoCanvas.ctx.lineTo(cx + dx, cy + dy)
            geoCanvas.ctx.stroke()
        }

        //update legend, if any
        this.updateLegends({
            widthFun: this.width,
            r: resolution,
            z: z,
            sColor: statColor,
            //sLength: statLength,
            sWidth: statWidth,
        })
    }
}


/***/ }),

/***/ "./src/style/ShapeColorSizeStyle.js":
/*!******************************************!*\
  !*** ./src/style/ShapeColorSizeStyle.js ***!
  \******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ShapeColorSizeStyle: () => (/* binding */ ShapeColorSizeStyle)
/* harmony export */ });
Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Style.js'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
//@ts-check


;

/**
 * A very generic style that shows grid cells with specific color, size and shape.
 * It can be used to show variables as cell colors, cell size, cell shape, or any combination of the three visual variables.
 *
 * @author Joseph Davies, Julien Gaffuri
 */
class ShapeColorSizeStyle extends Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Style.js'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()) {
    /** @param {object} opts */
    constructor(opts) {
        super(opts)
        opts = opts || {}

        /** A function returning the color of the cell.
         * @type {function(import('../Dataset.js').Cell,number, number,object):string} */
        this.color = opts.color || (() => "#EA6BAC") //(c,r,z,vs) => {}

        /** A function returning the size of a cell in geographical unit.
         * @type {function(import('../Dataset.js').Cell,number, number,object):number} */
        this.size = opts.size || ((cell, resolution) => resolution) //(c,r,z,vs) => {}

        /** A function returning the shape of a cell.
         * @type {function(import("../Dataset.js").Cell,number, number,object):import("../Style.js").Shape} */
        this.shape = opts.shape || (() => "square") //(c,r,z,vs) => {}
    }

    /**
     * Draw cells as squares, with various colors and sizes.
     * 
     * @param {Array.<import("../Dataset.js").Cell>} cells
     * @param {import("../GeoCanvas.js").GeoCanvas} geoCanvas
     * @param {number} resolution
     * @override
     */
    draw(cells, geoCanvas, resolution) {
        //filter
        if (this.filter) cells = cells.filter(this.filter)

        //zoom
        const z = geoCanvas.view.z

        //get view scale
        const viewScale = this.viewScale ? this.viewScale(cells, resolution, z) : undefined

        const r2 = resolution * 0.5
        for (let c of cells) {
            //color
            let col = this.color ? this.color(c, resolution, z, viewScale) : "black"
            if (!col || col === 'none') continue

            //size
            const size = this.size ? this.size(c, resolution, z, viewScale) : resolution
            if (!size) continue

            //shape
            const shape = this.shape ? this.shape(c, resolution, z, viewScale) : 'square'
            if (shape === 'none') continue

            //get offset
            const offset = this.offset(c, resolution, z)

            geoCanvas.ctx.fillStyle = col
            if (shape === 'square') {
                //draw square
                const d = resolution * (1 - size / resolution) * 0.5
                geoCanvas.ctx.fillRect(c.x + d + offset.dx, c.y + d + offset.dy, size, size)
            } else if (shape === 'circle') {
                //draw circle
                geoCanvas.ctx.beginPath()
                geoCanvas.ctx.arc(c.x + r2 + offset.dx, c.y + r2 + offset.dy, size * 0.5, 0, 2 * Math.PI, false)
                geoCanvas.ctx.fill()
            } else if (shape === 'donut') {
                //draw donut
                const xc = c.x + r2 + offset.dx,
                    yc = c.y + r2 + offset.dy
                geoCanvas.ctx.beginPath()
                geoCanvas.ctx.moveTo(xc, yc)
                geoCanvas.ctx.arc(xc, yc, r2, 0, 2 * Math.PI)
                geoCanvas.ctx.arc(xc, yc, (1 - size / resolution) * r2, 0, 2 * Math.PI, true)
                geoCanvas.ctx.closePath()
                geoCanvas.ctx.fill()
            } else if (shape === 'diamond') {
                const s2 = size * 0.5
                geoCanvas.ctx.beginPath()
                geoCanvas.ctx.moveTo(c.x + r2 - s2, c.y + r2)
                geoCanvas.ctx.lineTo(c.x + r2, c.y + r2 + s2)
                geoCanvas.ctx.lineTo(c.x + r2 + s2, c.y + r2)
                geoCanvas.ctx.lineTo(c.x + r2, c.y + r2 - s2)
                geoCanvas.ctx.fill()
            } else {
                throw new Error('Unexpected shape:' + shape)
            }
        }

        //update legends
        this.updateLegends({ viewScale: viewScale, z: z, cells: cells })
    }
}


/***/ }),

/***/ "./src/style/SideCatStyle.js":
/*!***********************************!*\
  !*** ./src/style/SideCatStyle.js ***!
  \***********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SideCatStyle: () => (/* binding */ SideCatStyle)
/* harmony export */ });
Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Style.js'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
//@ts-check


;

/** @typedef {{x:number,y:number,or:"v"|"h",v1:string|undefined,v2:string|undefined}} Side */

/**
 * A style to show the sides of grid cells based on their different categories.
 *
 * @author Julien Gaffuri
 */
class SideCatStyle extends Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Style.js'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()) {
    /** @param {object} opts */
    constructor(opts) {
        super(opts)
        opts = opts || {}

        /** The name of the column/attribute of the tabular data where to retrieve the categorical value.
         * @type {string} */
        this.col = opts.col

        /**
         * The dictionary (string -> color) which give the color of each category.
         * @type {object} */
        this.color = opts.color

        /** A function returning the width of a cell side line, in geo unit
         * @type {function(Side,number,number):number} */
        this.width = opts.width || ((side, r, z) => r * 0.2)

        /** A fill color for the cells.
         * @type {function(import("../Dataset").Cell):string} */
        this.fillColor = opts.fillColor
    }

    /**
     * @param {Array.<import("../Dataset").Cell>} cells
     * @param {import("../GeoCanvas").GeoCanvas} geoCanvas
     * @param {number} resolution
     */
    draw(cells, geoCanvas, resolution) {
        //filter
        if (this.filter) cells = cells.filter(this.filter)

        if (!cells || cells.length == 0) return

        //
        const z = geoCanvas.view.z

        /**  @type {Array.<Side>} */
        const sides = []

        //make horizontal sides
        //sort cells by x and y
        cells.sort((c1, c2) => (c2.x == c1.x ? c1.y - c2.y : c1.x - c2.x))
        let c1 = cells[0]
        let v1 = c1[this.col]
        for (let i = 1; i < cells.length; i++) {
            let c2 = cells[i]
            let v2 = c2[this.col]

            if (c1.y + resolution == c2.y && c1.x == c2.x) {
                //cells in same column and touch along horizontal side
                //make shared side
                if (v1 != v2) sides.push({ x: c1.x, y: c2.y, or: 'h', v1: v1, v2: v2 })
            } else {
                //cells do not touch along horizontal side
                //make two sides: top one for c1, bottom for c2
                sides.push({ x: c1.x, y: c1.y + resolution, or: 'h', v1: v1, v2: undefined })
                sides.push({ x: c2.x, y: c2.y, or: 'h', v1: undefined, v2: v2 })
            }

            c1 = c2
            v1 = v2
        }

        //make vertical sides
        //sort cells by y and x
        cells.sort((c1, c2) => (c2.y == c1.y ? c1.x - c2.x : c1.y - c2.y))
        c1 = cells[0]
        v1 = c1[this.col]
        for (let i = 1; i < cells.length; i++) {
            let c2 = cells[i]
            let v2 = c2[this.col]

            if (c1.x + resolution == c2.x && c1.y == c2.y) {
                //cells in same row and touch along vertical side
                //make shared side
                if (v1 != v2) sides.push({ x: c1.x + resolution, y: c1.y, or: 'v', v1: v1, v2: v2 })
            } else {
                //cells do not touch along vertical side
                //make two sides: right one for c1, left for c2
                sides.push({ x: c1.x + resolution, y: c1.y, or: 'v', v1: v1, v2: undefined })
                sides.push({ x: c2.x, y: c2.y, or: 'v', v1: undefined, v2: v2 })
            }

            c1 = c2
            v1 = v2
        }

        //
        if (sides.length == 0) return

        //draw cells, if fillColor specified
        if (this.fillColor)
            for (let c of cells) {
                const fc = this.fillColor(c)
                if (!fc || fc == 'none') continue
                geoCanvas.ctx.fillStyle = fc
                geoCanvas.ctx.fillRect(c.x, c.y, resolution, resolution)
            }

        //draw sides
        geoCanvas.ctx.lineCap = 'butt'
        for (let s of sides) {
            //width
            /** @type {number|undefined} */
            const wG = this.width ? this.width(s, resolution, z) : undefined
            if (!wG || wG <= 0) continue
            const w2 = wG * 0.5

            //set color and width
            geoCanvas.ctx.lineWidth = wG

            //draw segment with correct orientation
            if (s.or === 'h') {
                //top line
                if (s.v2) {
                    geoCanvas.ctx.beginPath()
                    geoCanvas.ctx.strokeStyle = this.color[s.v2]
                    geoCanvas.ctx.moveTo(s.x, s.y + w2)
                    geoCanvas.ctx.lineTo(s.x + resolution, s.y + w2)
                    geoCanvas.ctx.stroke()
                }

                //bottom line
                if (s.v1) {
                    geoCanvas.ctx.beginPath()
                    geoCanvas.ctx.strokeStyle = this.color[s.v1]
                    geoCanvas.ctx.moveTo(s.x, s.y - w2)
                    geoCanvas.ctx.lineTo(s.x + resolution, s.y - w2)
                    geoCanvas.ctx.stroke()
                }
            } else {
                //right line
                if (s.v2) {
                    geoCanvas.ctx.beginPath()
                    geoCanvas.ctx.strokeStyle = this.color[s.v2]
                    geoCanvas.ctx.moveTo(s.x + w2, s.y)
                    geoCanvas.ctx.lineTo(s.x + w2, s.y + resolution)
                    geoCanvas.ctx.stroke()
                }

                //left line
                if (s.v1) {
                    geoCanvas.ctx.beginPath()
                    geoCanvas.ctx.strokeStyle = this.color[s.v1]
                    geoCanvas.ctx.moveTo(s.x - w2, s.y)
                    geoCanvas.ctx.lineTo(s.x - w2, s.y + resolution)
                    geoCanvas.ctx.stroke()
                }
            }
        }

        //update legends
        this.updateLegends({ style: this, r: resolution, z: z })
    }
}


/***/ }),

/***/ "./src/style/SideStyle.js":
/*!********************************!*\
  !*** ./src/style/SideStyle.js ***!
  \********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SideStyle: () => (/* binding */ SideStyle)
/* harmony export */ });
Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Style.js'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
//@ts-check


;

/** @typedef {{x:number,y:number,or:"v"|"h",value:number}} Side */

/**
 *
 * @author Julien Gaffuri
 */
class SideStyle extends Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Style.js'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()) {
    /** @param {object} opts */
    constructor(opts) {
        super(opts)
        opts = opts || {}

        /** The name of the column/attribute of the tabular data where to retrieve the variable for the cell values.
         * @type {string} */
        this.valueCol = opts.valueCol

        /** A function returning the value of a cell side. This value is computed from the two adjacent cell values.
         * For horizontal sides, v1 is the value of the cell below and v2 the value of the cell above.
         * For vertical sides, v1 is the value of the cell left and v2 the value of the cell right.
         * @type {function(number|undefined,number|undefined,number,import("../Style").Stat|undefined,number):number} */
        this.value = opts.value || ((v1, v2, r, s, z) => 1)

        /** A function returning the color of a cell side.
         * @type {function(Side,number,import("../Style").Stat|undefined,number):string} */
        this.color = opts.color || (() => '#EA6BAC')

        /** A function returning the width of a cell side, in geo unit
         * @type {function(Side,number,import("../Style").Stat|undefined,number):number} */
        this.width = opts.width || ((side, r, s, z) => (r * side.value) / 5)

        /** orientation. Set to 90 to show sides as slope lines for example.
         * @type {number} */
        this.orientation = opts.orientation || 0

        /** A fill color for the cells.
         * @type {function(import("../Dataset").Cell):string} */
        this.fillColor = opts.fillColor
    }

    /**
     * @param {Array.<import("../Dataset").Cell>} cells
     * @param {number} resolution
     * @param {import("../GeoCanvas").GeoCanvas} geoCanvas
     */
    draw(cells, geoCanvas, resolution) {
        //filter
        if (this.filter) cells = cells.filter(this.filter)

        //
        const z = geoCanvas.view.z

        //compute stats on cell values
        let statValue
        if (this.valueCol) {
            //compute color variable statistics
            statValue = Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Style.js'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()).getStatistics(cells, (c) => c[this.valueCol], true)
        }

        /**  @type {Array.<Side>} */
        const sides = []

        //make horizontal sides
        //sort cells by x and y
        cells.sort((c1, c2) => (c2.x == c1.x ? c1.y - c2.y : c1.x - c2.x))
        let c1 = cells[0]
        for (let i = 1; i < cells.length; i++) {
            let c2 = cells[i]

            if ((c1.y + resolution == c2.y) && (c1.x == c2.x))
                //cells in same column and touch along horizontal side
                //make shared side
                sides.push({
                    x: c1.x,
                    y: c2.y,
                    or: 'h',
                    value: this.value(c1[this.valueCol], c2[this.valueCol], resolution, statValue, z),
                })
            else {
                //cells do not touch along horizontal side
                //make two sides: top one for c1, bottom for c2
                sides.push({
                    x: c1.x,
                    y: c1.y + resolution,
                    or: 'h',
                    value: this.value(c1[this.valueCol], undefined, resolution, statValue, z),
                })
                sides.push({
                    x: c2.x,
                    y: c2.y,
                    or: 'h',
                    value: this.value(undefined, c2[this.valueCol], resolution, statValue, z),
                })
            }

            c1 = c2
        }

        //make vertical sides
        //sort cells by y and x
        cells.sort((c1, c2) => (c2.y == c1.y ? c1.x - c2.x : c1.y - c2.y))
        c1 = cells[0]
        for (let i = 1; i < cells.length; i++) {
            let c2 = cells[i]

            if ((c1.x + resolution == c2.x) && (c1.y == c2.y))
                //cells in same row and touch along vertical side
                //make shared side
                sides.push({
                    x: c1.x + resolution,
                    y: c1.y,
                    or: 'v',
                    value: this.value(c1[this.valueCol], c2[this.valueCol], resolution, statValue, z),
                })
            else {
                //cells do not touch along vertical side
                //make two sides: right one for c1, left for c2
                sides.push({
                    x: c1.x + resolution,
                    y: c1.y,
                    or: 'v',
                    value: this.value(c1[this.valueCol], undefined, resolution, statValue, z),
                })
                sides.push({
                    x: c2.x,
                    y: c2.y,
                    or: 'v',
                    value: this.value(undefined, c2[this.valueCol], resolution, statValue, z),
                })
            }

            c1 = c2
        }

        //
        if (sides.length == 0) return

        //compute stats on sides
        const statSides = SideStyle.getSideStatistics(sides, true)

        //draw cells, if fillColor specified
        if (this.fillColor)
            for (let c of cells) {
                const fc = this.fillColor(c)
                if (!fc || fc == 'none') continue
                geoCanvas.ctx.fillStyle = fc
                geoCanvas.ctx.fillRect(c.x, c.y, resolution, resolution)
            }

        //draw sides
        geoCanvas.ctx.lineCap = 'butt'
        const r2 = resolution / 2
        for (let s of sides) {
            //color
            /** @type {string|undefined} */
            const col = this.color ? this.color(s, resolution, statSides, z) : undefined
            if (!col || col == 'none') continue

            //width
            /** @type {number|undefined} */
            const wG = this.width ? this.width(s, resolution, statSides, z) : undefined
            if (!wG || wG <= 0) continue

            //set color and width
            geoCanvas.ctx.strokeStyle = col
            geoCanvas.ctx.lineWidth = wG

            //draw segment with correct orientation
            geoCanvas.ctx.beginPath()
            if (this.orientation == 90) {
                geoCanvas.ctx.moveTo(s.x + r2, s.y + r2)
                if (s.or === 'h') geoCanvas.ctx.lineTo(s.x + r2, s.y - r2)
                else geoCanvas.ctx.lineTo(s.x - r2, s.y + r2)
            } else {
                geoCanvas.ctx.moveTo(s.x, s.y)
                geoCanvas.ctx.lineTo(s.x + (s.or === 'h' ? resolution : 0), s.y + (s.or === 'v' ? resolution : 0))
            }
            geoCanvas.ctx.stroke()
        }

        //update legends
        this.updateLegends({ style: this, r: resolution, z: z })
    }

    /**
     * Compute some statistics on a value of some sides.
     * This is used to define how to draw specifically the sides within the view.
     *
     * @param {Array.<Side>} sides
     * @param {boolean} ignoreZeros
     * @returns {import("../Style").Stat | undefined}
     */
    static getSideStatistics(sides, ignoreZeros) {
        if (!sides || sides.length == 0) return undefined
        let min = Infinity
        let max = -Infinity
        //let sum = 0
        //let nb = 0
        for (const s of sides) {
            const v = s.value
            if (ignoreZeros && !v) continue
            if (v < min) min = v
            if (v > max) max = v
            //sum += v
            //nb++
        }
        return { min: min, max: max }
    }
}


/***/ }),

/***/ "./src/style/SquareColorCatWGLStyle.js":
/*!*********************************************!*\
  !*** ./src/style/SquareColorCatWGLStyle.js ***!
  \*********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SquareColorCatWGLStyle: () => (/* binding */ SquareColorCatWGLStyle)
/* harmony export */ });
Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Style.js'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
/* harmony import */ var _utils_webGLUtils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/webGLUtils.js */ "./src/utils/webGLUtils.js");
/* harmony import */ var _utils_WebGLSquareColoringCatAdvanced_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/WebGLSquareColoringCatAdvanced.js */ "./src/utils/WebGLSquareColoringCatAdvanced.js");
//@ts-check


;



/**
 * Style based on webGL
 * To show cells as colored squares, from categories.
 * All cells are drawn as squares, with the same size
 *
 * @author Julien Gaffuri
 */
class SquareColorCatWGLStyle extends Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Style.js'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()) {
    /** @param {object} opts */
    constructor(opts) {
        super(opts)
        opts = opts || {}

        /**
         * The name of the column/attribute of the tabular data where to retrieve the category of the cell, for coloring.
         * @type {string} */
        this.colorCol = opts.colorCol

        /**
         * The dictionary (string -> color) which give the color of each category.
         * @type {object} */
        opts.color = opts.color || undefined

        /** @type { Array.<string> } @private */
        const keys = Object.keys(opts.color)

        /** @type { object } @private */
        this.catToI = {}
        for (let i = 0; i < keys.length; i++) this.catToI[keys[i]] = i + ''

        /** @type { Array.<string> } @private */
        this.colors = []
        for (let i = 0; i < keys.length; i++) {
            this.colors.push(opts.color['' + keys[i]])
        }

        /**
         * A function returning the size of the cells, in geographical unit. All cells have the same size.
         * @type {function(number,number):number} */
        this.size = opts.size // (resolution, z) => ...

        /**
         * @private
         * @type { WebGLSquareColoringCatAdvanced } */
        this.wgp = new _utils_WebGLSquareColoringCatAdvanced_js__WEBPACK_IMPORTED_MODULE_2__.WebGLSquareColoringCatAdvanced(this.colors)
    }

    /**
     * @param {Array.<import("../Dataset").Cell>} cells
     * @param {number} resolution
     * @param {import("../GeoCanvas").GeoCanvas} geoCanvas
     */
    draw(cells, geoCanvas, resolution) {

        //filter
        if (this.filter) cells = cells.filter(this.filter)

        //
        const z = geoCanvas.view.z

        //add vertice and fragment data
        const r2 = resolution / 2
        let c, nb = cells.length
        const verticesBuffer = []
        const iBuffer = []
        for (let i = 0; i < nb; i++) {
            c = cells[i]
            const cat = c[this.colorCol]
            if (cat == undefined) {
                console.log('Unexpected category: ' + cat)
                continue
            }
            /** @type {number} */
            const i_ = this.catToI[cat]
            if (isNaN(+i_)) {
                console.log('Unexpected category index: ' + cat + ' ' + i_)
                continue
            }
            verticesBuffer.push(c.x + r2, c.y + r2)
            iBuffer.push(+i_)
        }

        //create canvas and webgl renderer
        const cvWGL = (0,_utils_webGLUtils_js__WEBPACK_IMPORTED_MODULE_1__.makeWebGLCanvas)(geoCanvas.w + '', geoCanvas.h + '')
        if (!cvWGL) {
            console.error('No webGL')
            return
        }

        //draw
        const sizeGeo = this.size ? this.size(resolution, z) : resolution + 0.2 * z
        this.wgp.draw(cvWGL.gl, verticesBuffer, iBuffer, geoCanvas.getWebGLTransform(), sizeGeo / z)

        //draw in canvas geo
        geoCanvas.initCanvasTransform()
        geoCanvas.ctx.drawImage(cvWGL.canvas, 0, 0)

        //update legends
        this.updateLegends({ style: this, r: resolution, z: z })
    }
}


/***/ }),

/***/ "./src/style/SquareColorWGLStyle.js":
/*!******************************************!*\
  !*** ./src/style/SquareColorWGLStyle.js ***!
  \******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SquareColorWGLStyle: () => (/* binding */ SquareColorWGLStyle)
/* harmony export */ });
Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Style.js'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
/* harmony import */ var _utils_webGLUtils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/webGLUtils.js */ "./src/utils/webGLUtils.js");
/* harmony import */ var _utils_WebGLSquareColoringAdvanced_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/WebGLSquareColoringAdvanced.js */ "./src/utils/WebGLSquareColoringAdvanced.js");
//@ts-check


;



/**
 * Style based on webGL
 * To show cells as colored squares, with computation of the colors on GPU side (faster than JavaScript side).
 * Alls squares with the same size
 *
 * @author Julien Gaffuri
 */
class SquareColorWGLStyle extends Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Style.js'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()) {
    /** @param {object} opts */
    constructor(opts) {
        super(opts)
        opts = opts || {}

        /**
         * A function returning a t value (within [0,1]) for a cell.
         * @type {function(import('../Dataset.js').Cell,number,number,object):number} */
        this.tFun = opts.tFun //(c,r,z,vs) => {}

        /**
         * Distribution stretching method.
         * The stretching is performed on GPU side (fragment shader).
         * @type {{ fun:string, alpha:number }} */
        this.stretching = opts.stretching

        /**
         * The sample of the color ramp.
         * The color is computed on GPU side (fragment shader) based on those values (linear interpolation).
         * @type {Array.<string>} */
        this.colors =
            opts.colors ||
            [
                'rgb(158, 1, 66)',
                'rgb(248, 142, 83)',
                'rgb(251, 248, 176)',
                'rgb(137, 207, 165)',
                'rgb(94, 79, 162)',
            ].reverse()
        if (opts.color)
            this.colors = [
                opts.color(0),
                opts.color(0.2),
                opts.color(0.4),
                opts.color(0.6),
                opts.color(0.8),
                opts.color(1),
            ]

        /**
         * Define the opacity of the style, within [0,1].
         * If this opacity is defined, the individual color opacity will be ignored.
         * @type {function(number,number):number} */
        this.opacity = opts.opacity // (r,z) => ...

        /**
         * A function returning the size of the cells, in geographical unit. All cells have the same size.
         * @type {function(number,number):number} */
        this.size = opts.size // (resolution, z) => ...
    }

    /**
     * @param {Array.<import("../Dataset").Cell>} cells
     * @param {import("../GeoCanvas").GeoCanvas} geoCanvas
     * @param {number} resolution
     */
    draw(cells, geoCanvas, resolution) {

        //filter
        if (this.filter) cells = cells.filter(this.filter)

        //
        const z = geoCanvas.view.z

        //get view scale
        const viewScale = this.viewScale ? this.viewScale(cells, resolution, z) : undefined

        //create canvas and webgl renderer
        //for opacity control, see: https://webglfundamentals.org/webgl/lessons/webgl-and-alpha.html
        const cvWGL = (0,_utils_webGLUtils_js__WEBPACK_IMPORTED_MODULE_1__.makeWebGLCanvas)(
            geoCanvas.w + '',
            geoCanvas.h + '',
            this.opacity != undefined ? { premultipliedAlpha: false } : undefined
        )
        if (!cvWGL) {
            console.error('No webGL')
            return
        }

        //add vertice and fragment data
        const r2 = resolution / 2
        const verticesBuffer = []
        const tBuffer = []
        for (let cell of cells) {
            const t = this.tFun(cell, resolution, z, viewScale)
            if (t == null || t == undefined) continue
            verticesBuffer.push(cell.x + r2, cell.y + r2)
            tBuffer.push(t > 1 ? 1 : t < 0 ? 0 : t)
        }

        //compute pixel size
        const sizeGeo = this.size ? this.size(resolution, z) : resolution + 0.2 * z

        //compute opacity
        const op = this.opacity ? this.opacity(resolution, z) : undefined

        //
        const wgp = new _utils_WebGLSquareColoringAdvanced_js__WEBPACK_IMPORTED_MODULE_2__.WebGLSquareColoringAdvanced(cvWGL.gl, this.colors, this.stretching, sizeGeo / z, op)

        //draw
        wgp.draw(verticesBuffer, tBuffer, geoCanvas.getWebGLTransform())

        //draw in canvas geo
        geoCanvas.initCanvasTransform()
        geoCanvas.ctx.drawImage(cvWGL.canvas, 0, 0)

        //update legends
        this.updateLegends({ style: this, r: resolution, z: z, viewScale: viewScale })
    }
}


/***/ }),

/***/ "./src/style/StrokeStyle.js":
/*!**********************************!*\
  !*** ./src/style/StrokeStyle.js ***!
  \**********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   StrokeStyle: () => (/* binding */ StrokeStyle)
/* harmony export */ });
Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Style.js'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
//@ts-check


;

/**
 *
 * @author Julien Gaffuri
 */
class StrokeStyle extends Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Style.js'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()) {
    /** @param {object} opts */
    constructor(opts) {
        super(opts)
        opts = opts || {}

        /** A function returning the color of the cell.
         * @type {function(import('../Dataset.js').Cell,number,number,object):string} */
        this.strokeColor = opts.strokeColor || (() => "#666") //(c,r,z,vs) => {}

        /** A function returning the size of a cell in geographical unit.
         * @type {function(import('../Dataset.js').Cell,number,number,object):number} */
        this.size = opts.size || ((cell, resolution) => resolution) //(c,r,z,vs) => {}

        /** The stroke line width in geographical unit.
         * @type {function(import('../Dataset.js').Cell,number,number,object):number} */
        this.strokeWidth = opts.strokeWidth || ((cell, resolution, z) => z * 1.5) //(c,r,z,vs) => {}

        /** A function returning the shape of a cell.
        * @type {function(import("../Dataset.js").Cell,number,number,object):import("../Style.js").Shape} */
        this.shape = opts.shape || (() => "square") //(c,r,z,vs) => {}
    }

    /**
     * Draw cells as squares, with various colors and size.
     *
     * @param {Array.<import("../Dataset").Cell>} cells
     * @param {import("../GeoCanvas").GeoCanvas} geoCanvas
     * @param {number} resolution
     */
    draw(cells, geoCanvas, resolution) {
        //filter
        if (this.filter) cells = cells.filter(this.filter)

        //
        const z = geoCanvas.view.z

        //get view scale
        const viewScale = this.viewScale ? this.viewScale(cells, resolution, z) : undefined

        const r2 = resolution * 0.5
        for (let cell of cells) {

            //color
            const col = this.strokeColor ? this.strokeColor(cell, resolution, z, viewScale) : undefined
            if (!col || col === 'none') continue
            geoCanvas.ctx.strokeStyle = col

            //size - in geo unit
            const sG = this.size ? this.size(cell, resolution, z, viewScale) : resolution

            //width
            const wi = this.strokeWidth ? this.strokeWidth(cell, resolution, z, viewScale) : 1 * z
            if (!wi || wi <= 0) continue
            geoCanvas.ctx.lineWidth = wi

            //shape
            const shape = this.shape ? this.shape(cell, resolution, z, viewScale) : 'square'
            if (shape === 'none') continue

            //get offset
            const offset = this.offset(cell, resolution, z)

            if (shape === 'square') {
                //draw square
                const d = resolution * (1 - sG / resolution) * 0.5
                geoCanvas.ctx.beginPath()
                geoCanvas.ctx.rect(cell.x + d + offset.dx, cell.y + d + offset.dy, sG, sG)
                geoCanvas.ctx.stroke()
            } else if (shape === 'circle') {
                //draw circle
                geoCanvas.ctx.beginPath()
                geoCanvas.ctx.arc(cell.x + r2 + offset.dx, cell.y + r2 + offset.dy, sG * 0.5, 0, 2 * Math.PI, false)
                geoCanvas.ctx.stroke()
            } else if (shape === 'diamond') {
                const s2 = sG * 0.5
                geoCanvas.ctx.beginPath()
                geoCanvas.ctx.moveTo(cell.x + r2 - s2, cell.y + r2)
                geoCanvas.ctx.lineTo(cell.x + r2, cell.y + r2 + s2)
                geoCanvas.ctx.lineTo(cell.x + r2 + s2, cell.y + r2)
                geoCanvas.ctx.lineTo(cell.x + r2, cell.y + r2 - s2)
                geoCanvas.ctx.lineTo(cell.x + r2 - s2, cell.y + r2)
                geoCanvas.ctx.stroke()
            } else if (shape === 'donut') {
                console.error('Not implemented')
            } else {
                throw new Error('Unexpected shape:' + shape)
            }
        }

        //update legends
        //TODO
    }
}


/***/ }),

/***/ "./src/style/TanakaStyle.js":
/*!**********************************!*\
  !*** ./src/style/TanakaStyle.js ***!
  \**********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TanakaStyle: () => (/* binding */ TanakaStyle)
/* harmony export */ });
/* harmony import */ var _SquareColorWGLStyle_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SquareColorWGLStyle.js */ "./src/style/SquareColorWGLStyle.js");
/* harmony import */ var _SideStyle_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SideStyle.js */ "./src/style/SideStyle.js");
//@ts-check


;


/**
 *
 * @see https://manifold.net/doc/mfd9/example__tanaka_contours.htm
 *
 * @author Julien Gaffuri
 */
class TanakaStyle {
    /**
     * @param {string} col
     * @param {object} opts
     * @returns {Array.<import("../Style").Style>}
     */
    static get(col, opts) {
        opts = opts || {}

        //get colors from d3 ramps, if 'nb' is specified
        if (opts.nb != undefined) {
            if (opts.nb < 2) {
                console.error('unexpected number of colors in tanaka (<2): ' + opts.nb)
                opts.nb = 2
            }
            if (!opts.color) {
                console.error('color function not defined in tanaka')
                opts.color = () => 'gray'
            }
            opts.colors = []
            for (let i = 0; i < opts.nb; i++) opts.colors.push(opts.color(i / (opts.nb - 1)))
        }

        /**
         * The colors.
         * @type {Array.<string>} */
        opts.colors = opts.colors || ['#a9bb9e', '#c9dcaa', '#fde89f', '#f9a579', '#eb444b']
        const nb = opts.colors.length

        /** A function to compute 't' from the value v
         * @type {function(number,number,import("../Style").Stat):number} */
        opts.tFun = opts.tFun || ((v, r, s) => (v - s.min) / (s.max - s.min))

        //shadow colors
        opts.colDark = opts.colDark || '#111'
        opts.colBright = opts.colBright || '#ddd'

        //width of the segment (share of the resolution)
        opts.widthFactor = opts.widthFactor || 0.08

        //shading
        opts.newShading = opts.newShading
        opts.newShadingWidthPix = opts.newShadingWidthPix || 2
        //transparency value, within [0,1]
        opts.newShadingTr =
            opts.newShadingTr ||
            ((sideValue, sideStat) =>
                Math.abs(sideValue) / Math.max(Math.abs(sideStat.min), Math.abs(sideStat.max)))

        /**
         * @param {number} t A cell t value, within [0,1].
         * @returns the class number for the value
         */
        const getClass = (t) => {
            if (isNaN(t) || t == undefined) {
                console.error('Unexpected t value 1: ' + t)
                return -9
            }
            for (let i = 0; i < nb; i++) if (t <= (i + 1) / nb) return i
            console.error('Unexpected t value 2: ' + t)
            return -9
        }

        const colStyle = new _SquareColorWGLStyle_js__WEBPACK_IMPORTED_MODULE_0__.SquareColorWGLStyle({
            colorCol: col,
            colors: opts.colors,
            tFun: (v, r, s) => {
                const t = opts.tFun(v, r, s)
                const c = getClass(t)
                return c / (nb - 1)
            },
            //stretching: { fun: "log", alpha: -7 },
            size: (r, z) => r + 0.5 * z, //that is to ensure no gap between same class cells is visible
            filter: opts.filter,
        })

        /*
        if no web gl:    
            const colStyle = new ShapeColorSizeStyle({
                colorCol: col,
                //the color corresponding to the class
                color: (v, r, s, z) => {
                    if (v == 0 && opts.tFun && isNaN(opts.tFun(v, r, s)))
                        return undefined
                    return opts.colors[getClass(opts.tFun ? opts.tFun(v, r, s) : v)]
                },
                shape: () => "square",
                size: (v, r, s, z) => r + 0.5 * z, //that is to ensure no gap between same class cells is visible
            })
        */

        /** The side style, for the shadow effect */
        const sideStyle = new _SideStyle_js__WEBPACK_IMPORTED_MODULE_1__.SideStyle({
            valueCol: col,
            value: (v1, v2, r, s, z) => {
                //compute the number of classes of difference
                if (v1 === undefined && v2 === undefined) return 0
                else if (v2 === undefined) {
                    const t = opts.tFun(v1, r, s)
                    if (t == undefined || isNaN(t)) throw new Error('Unexpected value: ' + v1 + ' - ' + t)
                    const c = getClass(t)
                    return c + 1
                } else if (v1 === undefined) {
                    const t = opts.tFun(v2, r, s)
                    if (t == undefined || isNaN(t)) throw new Error('Unexpected value: ' + v2 + ' - ' + t)
                    const c = getClass(t)
                    return -c - 1
                }
                const t1 = opts.tFun(v1, r, s)
                if (t1 == undefined || isNaN(t1)) throw new Error('Unexpected value: ' + v1 + ' - ' + t1)
                const t2 = opts.tFun(v2, r, s)
                if (t2 == undefined || isNaN(t2)) throw new Error('Unexpected value: ' + v2 + ' - ' + t2)
                const c1 = getClass(t1)
                const c2 = getClass(t2)
                return -c2 + c1
            },

            color: opts.newShading
                ? //black with transparency depending on difference
                  (side, r, s, z) => {
                      const tr = opts.newShadingTr(side.value, s)
                      return (side.value > 0 && side.or === 'h') || (side.value < 0 && side.or === 'v')
                          ? 'rgba(255,255,100,' + tr + ')'
                          : 'rgba(0,0,0,' + tr + ')'
                  }
                : //white or black, depending on orientation and value
                  (side, r, s, z) => {
                      if (side.value === 0) return
                      //return "gray"
                      if (side.or === 'v') return side.value < 0 ? opts.colBright : opts.colDark
                      return side.value < 0 ? opts.colDark : opts.colBright
                  },

            width: opts.newShading
                ? //fill size
                  (side, r, s, z) => {
                      return opts.newShadingWidthPix * z
                  }
                : //width depends on the value, that is the number of classes of difference
                  (side, r, s, z) =>
                      opts.widthFactor * r * Math.abs(side.value) * (side.or === 'v' ? 0.5 : 1),

            filter: opts.filter,
        })

        return [colStyle, sideStyle]
    }
}


/***/ }),

/***/ "./src/style/TextStyle.js":
/*!********************************!*\
  !*** ./src/style/TextStyle.js ***!
  \********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TextStyle: () => (/* binding */ TextStyle)
/* harmony export */ });
Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Style.js'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
//@ts-check


;

/**
 *
 * @author Julien Gaffuri
 */
class TextStyle extends Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Style.js'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()) {
    /** @param {object} opts */
    constructor(opts) {
        super(opts)
        opts = opts || {}

        /** The name of the column/attribute of the tabular data where to retrieve the variable for text.
         * @type {string} */
        this.textCol = opts.textCol

        /** A function returning the text of a cell.
         * @type {function(number,number,import("../Style").Stat|undefined,number):string} */
        this.text = opts.text || ((v, r, s, z) => 'X')

        /** The name of the column/attribute of the tabular data where to retrieve the variable for color.
         * @type {string} */
        this.colorCol = opts.colorCol

        /** A function returning the color of the cell.
         * @type {function(number,number,import("../Style").Stat|undefined,number):string} */
        this.color = opts.color || (() => '#EA6BAC')

        /** The name of the column/attribute of the tabular data where to retrieve the variable for font size.
         * @type {string} */
        this.fontSizeCol = opts.fontSizeCol

        /** A function returning the font size of a cell in geo unit.
         * @type {function(number,number,import("../Style").Stat|undefined,number):number} */
        this.fontSize = opts.fontSize || ((v, r, s, z) => r * 0.8)

        /** The text font family.
         * @type {string} */
        this.fontFamily = opts.fontFamily || 'Arial'

        /** The text font weight.
         * @type {string} */
        this.fontWeight = opts.fontWeight || 'bold'
    }

    /**
     * Draw cells as text.
     *
     * @param {Array.<import("../Dataset").Cell>} cells
     * @param {number} resolution
     * @param {import("../GeoCanvas").GeoCanvas} geoCanvas
     */
    draw(cells, geoCanvas, resolution) {
        //filter
        if (this.filter) cells = cells.filter(this.filter)

        //
        const z = geoCanvas.view.z

        let statText
        if (this.textCol) {
            //compute text variable statistics
            statText = Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Style.js'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()).getStatistics(cells, (c) => c[this.textCol], true)
        }

        let statColor
        if (this.colorCol) {
            //compute color variable statistics
            statColor = Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Style.js'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()).getStatistics(cells, (c) => c[this.colorCol], true)
        }

        let statFontSize
        if (this.fontSizeCol) {
            //if size is used, sort cells by size so that the biggest are drawn first
            cells.sort((c1, c2) => c2[this.fontSizeCol] - c1[this.fontSizeCol])
            //and compute size variable statistics
            statFontSize = Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Style.js'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()).getStatistics(cells, (c) => c[this.fontSizeCol], true)
        }

        //draw with HTML canvas
        //in screen coordinates
        geoCanvas.initCanvasTransform()

        for (let cell of cells) {
            //get cell text
            const text = this.text ? this.text(cell[this.textCol], resolution, statText, z) : undefined
            if (text == undefined || text == null || text + '' === '') continue

            //color
            const col = this.color ? this.color(cell[this.colorCol], resolution, statColor, z) : undefined
            if (!col) continue
            geoCanvas.ctx.fillStyle = col

            //font size
            //size - in pixel unit
            const fontSizePix = this.fontSize(cell[this.fontSizeCol], resolution, statFontSize, z) / z

            //set font
            const fontFamily = this.fontFamily || 'Arial'
            const fontWeight = this.fontWeight || 'bold'
            geoCanvas.ctx.font = fontWeight + ' ' + fontSizePix + 'px ' + fontFamily

            //get offset
            const offset = this.offset(cell, resolution, z)

            //text position
            geoCanvas.ctx.textAlign = 'center'
            const tx = geoCanvas.geoToPixX(cell.x + resolution * 0.5 + offset.dx)
            const ty = geoCanvas.geoToPixY(cell.y + resolution * 0.5 + offset.dy) + fontSizePix * 0.3 //it should be 0.5 but 0.3 seems to work better

            //draw the text
            geoCanvas.ctx.fillText(text, tx, ty)
        }

        //update legends
        this.updateLegends({ style: this, r: resolution, z: z, sColor: statColor })
    }

    /**
     * Build a function [0,1]->string for characters legend
     *
     * @param {Array.<string>} chars
     * @returns {function(number):string}
     */
    static getCharLegendFun(chars) {
        const nb = chars.length
        return (t) => (t == 0 ? '' : t == 1 ? chars[nb - 1] : chars[Math.floor(t * nb)])
    }
}


/***/ }),

/***/ "./src/style/TimeSeriesStyle.js":
/*!**************************************!*\
  !*** ./src/style/TimeSeriesStyle.js ***!
  \**************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TimeSeriesStyle: () => (/* binding */ TimeSeriesStyle)
/* harmony export */ });
Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Style.js'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
//@ts-check


;

/** @typedef {"first"|"bottom"|"center"|"top"|"last"} AnchorModeYEnum */

/**
 * Show cell as timeseries chart
 * Can be used for sparkline map of https://datagistips.hypotheses.org/488
 *
 * @author Julien Gaffuri
 */
class TimeSeriesStyle extends Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Style.js'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()) {
    /** @param {object} opts */
    constructor(opts) {
        super(opts)
        opts = opts || {}

        /** The columns of the time series, ordered in chronological order.
         * @type {Array.<string>} */
        this.ts = opts.ts

        /** A function specifying when a value should be considered as "no data" and thus not ignored. The line will have a break at these values.
         * @type {function(string):boolean} */
        this.noData = opts.noData || ((v) => v === undefined || v == "" || v === null || isNaN(+v))

        //x
        /** in geo unit
         * @type {function(import("../Dataset.js").Cell,number,number):number} */
        this.offsetX = opts.offsetX || ((c, r, z) => 0)
        /** @type {function(import("../Dataset.js").Cell,number,number):number} */
        this.width = opts.width || ((c, r, z) => r)

        //y
        /** in geo unit
         * @type {function(import("../Dataset.js").Cell,number,number):number} */
        this.offsetY = opts.offsetY || ((c, r, z) => 0)
        /** @type {function(import("../Dataset.js").Cell,number,number):number} */
        this.height = opts.height || ((c, r, z) => r)
        /** @type {function(import("../Dataset.js").Cell,number,number):AnchorModeYEnum} */
        this.anchorModeY = opts.anchorModeY || ((c, r, z) => "center")


        /**
         * @type {string} */
        this.lineWidthCol = opts.lineWidthCol

        /** A function returning the width of the line, in geo unit
         * @type {function(number,number,import("../Style.js").Stat|undefined,number):number} */
        this.lineWidth = opts.lineWidth || ((v, r, s, z) => 1.5 * z)

        /**
         * @type {string} */
        this.colorCol = opts.colorCol

        /** A function returning the color of the cell.
         * @type {function(number,number,import("../Style.js").Stat|undefined,number):string} */
        this.color = opts.color || ((v, r, s, z) => 'black')

    }

    /**
     * Draw cells as text.
     *
     * @param {Array.<import("../Dataset.js").Cell>} cells
     * @param {import("../GeoCanvas.js").GeoCanvas} geoCanvas
     * @param {number} resolution
     */
    draw(cells, geoCanvas, resolution) {

        //filter
        if (this.filter) cells = cells.filter(this.filter)

        //
        const z = geoCanvas.view.z

        let statWidth
        if (this.lineWidthCol) {
            //and compute size variable statistics
            statWidth = Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Style.js'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()).getStatistics(cells, (c) => c[this.lineWidthCol], true)
        }

        let statColor
        if (this.colorCol) {
            //compute color variable statistics
            statColor = Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Style.js'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()).getStatistics(cells, (c) => c[this.colorCol], true)
        }

        //compute cell amplitude
        const getAmplitude = c => {
            let min, max
            for (let t of this.ts) {
                const val = c[t];
                if (val == undefined) continue
                if (min == undefined || val < min) min = val
                if (max == undefined || val > max) max = val
            }
            if (min == undefined) return undefined
            return max - min
        }

        //compute max amplitude
        let ampMax
        for (let c of cells) {
            const amp = getAmplitude(c)
            if (amp == undefined) continue
            if (ampMax == undefined || amp > ampMax) ampMax = amp
        }
        if (!ampMax) return

        const nb = this.ts.length

        geoCanvas.ctx.lineCap = "butt"
        for (let c of cells) {

            //line width
            /** @type {number|undefined} */
            const wG = this.lineWidth ? this.lineWidth(c[this.lineWidthCol], resolution, statWidth, z) : undefined
            if (!wG || wG < 0) continue

            //line color
            /** @type {string|undefined} */
            const col = this.color ? this.color(c[this.colorCol], resolution, statColor, z) : undefined
            if (!col) continue


            //x
            const offX = this.offsetX ? this.offsetX(c, resolution, z) : 0
            if (offX == undefined || isNaN(offX)) continue
            const w = this.width ? this.width(c, resolution, z) : resolution
            if (w == undefined || isNaN(w)) continue

            //y
            const offY = this.offsetY ? this.offsetY(c, resolution, z) : 0
            if (offY == undefined || isNaN(offY)) continue
            const h = this.height ? this.height(c, resolution, z) : resolution
            if (h == undefined || isNaN(h)) continue
            const anchY = this.anchorModeY ? this.anchorModeY(c, resolution, z) : "center"
            if (!anchY) continue

            geoCanvas.ctx.lineWidth = wG
            geoCanvas.ctx.strokeStyle = col

            //compute anchor Y figures
            let val0, y0
            if (anchY === "first") {
                //get first value
                val0 = c[this.ts[0]]
                y0 = 0
            } else if (anchY === "last") {
                //get last value
                val0 = c[this.ts[this.ts.length - 1]]
                y0 = 0
            } else if (anchY === "bottom") {
                //get min
                for (let t of this.ts) {
                    const val = +c[t];
                    if (val == undefined) continue
                    if (val0 == undefined || val < val0) val0 = val
                }
                y0 = 0
            } else if (anchY === "top") {
                //get max
                for (let t of this.ts) {
                    const val = +c[t];
                    if (val == undefined) continue
                    if (val0 == undefined || val > val0) val0 = val
                }
                y0 = resolution
            } else if (anchY === "center") {
                //get min and max
                let min, max
                for (let t of this.ts) {
                    const val = c[t];
                    if (val == undefined) continue
                    if (min == undefined || val < min) min = val
                    if (max == undefined || val > max) max = val
                }
                val0 = (+max + +min) * 0.5
                y0 = resolution / 2
            } else {
                console.log("Unexpected anchorModeY: " + anchY)
                continue;
            }

            /*/draw line
            if (val0 == undefined || isNaN(val0)) continue
            cg.ctx.beginPath()
            const sX = w / (nb - 1)
            for (let i = 0; i < nb; i++) {
                const val = c[this.ts[i]]
                if (val == undefined || isNaN(val)) break
                if (i == 0)
                    cg.ctx.moveTo(c.x + i * sX + offX, c.y + y0 + (val - val0) * h / ampMax + offY)
                else
                    cg.ctx.lineTo(c.x + i * sX + offX, c.y + y0 + (val - val0) * h / ampMax + offY)
            }
            cg.ctx.stroke()*/


            //draw line, segment by segment
            const sX = w / (nb - 1)

            //handle first point
            let v0 = c[this.ts[0]]
            if (!this.noData(v0)) {
                geoCanvas.ctx.beginPath()
                geoCanvas.ctx.moveTo(c.x + offX, c.y + y0 + (v0 - val0) * h / ampMax + offY)
            }
            //console.log(v0, isNaN(v0))

            let v1
            for (let i = 1; i < nb; i++) {
                v1 = c[this.ts[i]]

                //draw segment from v0 to v1

                //both points 'no data'
                if (this.noData(v0) && this.noData(v1)) {

                    //second point 'no data'
                } else if (!this.noData(v0) && this.noData(v1)) {
                    geoCanvas.ctx.stroke()

                    //first point 'no data'
                } else if (this.noData(v0) && !this.noData(v1)) {
                    geoCanvas.ctx.beginPath()
                    geoCanvas.ctx.moveTo(c.x + i * sX + offX, c.y + y0 + (v1 - val0) * h / ampMax + offY)

                    //both points have data: trace line
                } else {
                    geoCanvas.ctx.lineTo(c.x + i * sX + offX, c.y + y0 + (v1 - val0) * h / ampMax + offY)
                    //if it is the last point, stroke
                    if (i == nb - 1) geoCanvas.ctx.stroke()
                }
                v0 = v1
            }

        }

        //update legend, if any
        this.updateLegends({
            widthFun: this.lineWidth,
            r: resolution,
            z: z,
            sColor: statColor,
            //sLength: statLength,
            sWidth: statWidth,
        })

    }

}



/***/ }),

/***/ "./src/utils/WebGLSquareColoring.js":
/*!******************************************!*\
  !*** ./src/utils/WebGLSquareColoring.js ***!
  \******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WebGLSquareColoring: () => (/* binding */ WebGLSquareColoring)
/* harmony export */ });
/* harmony import */ var _webGLUtils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./webGLUtils.js */ "./src/utils/webGLUtils.js");
/* harmony import */ var d3_color__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-color */ "./node_modules/d3-color/src/color.js");
//@ts-check


;


/**
 * Everything to easily draw colored squares with webGL.
 * All the same size, but different fill color.
 */
class WebGLSquareColoring {
    /**
     *
     * @param {WebGLRenderingContext} gl
     */
    constructor(gl, sizePix) {
        this.gl = gl
        this.sizePix = sizePix || 10.0

        this.program = (0,_webGLUtils_js__WEBPACK_IMPORTED_MODULE_0__.initShaderProgram)(
            gl,
            (0,_webGLUtils_js__WEBPACK_IMPORTED_MODULE_0__.createShader)(
                gl,
                gl.VERTEX_SHADER,
                `
            attribute vec2 pos;
            uniform float sizePix;
            uniform mat3 mat;
            attribute vec4 color;
            varying vec4 vColor;
            void main() {
              gl_Position = vec4(mat * vec3(pos, 1.0), 1.0);
              gl_PointSize = sizePix;
              vColor = color;
            }
          `
            ),
            (0,_webGLUtils_js__WEBPACK_IMPORTED_MODULE_0__.createShader)(
                gl,
                gl.FRAGMENT_SHADER,
                `
            precision mediump float;
            varying vec4 vColor;
            void main(void) {
                vec4 vColor_ = vColor / 255.0;
                vColor_[3] = 255.0 * vColor_[3];
                gl_FragColor = vColor_;
            }`
            )
        )
        gl.useProgram(this.program)

        //buffer data
        this.verticesBuffer = []
        this.colorsBuffer = []
    }

    /** Add data to vertices/size/color buffers for color squares drawing */
    addPointData(xC, yC, col) {
        //convert color
        const cc = (0,d3_color__WEBPACK_IMPORTED_MODULE_1__["default"])(col)
        //const cc = {r:45,g:87,b:98,opacity:0.9}
        if (!cc) return

        //vertices
        this.verticesBuffer.push(xC, yC)
        //color
        this.colorsBuffer.push(cc.r, cc.g, cc.b, cc.opacity)
    }

    addPointData2(xC, yC, r, g, b, opacity) {
        //vertices
        this.verticesBuffer.push(xC, yC)
        //color
        this.colorsBuffer.push(r, g, b, opacity)
    }

    /**  */
    draw(transfoMat) {
        const gl = this.gl

        //vertice data
        gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer())
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.verticesBuffer), gl.STATIC_DRAW)
        const position = gl.getAttribLocation(this.program, 'pos')
        gl.vertexAttribPointer(
            position,
            2, //numComponents
            gl.FLOAT, //type
            false, //normalise
            0, //stride
            0 //offset
        )
        gl.enableVertexAttribArray(position)

        //color data
        gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer())
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.colorsBuffer), gl.STATIC_DRAW)
        var color = gl.getAttribLocation(this.program, 'color')
        gl.vertexAttribPointer(color, 4, gl.FLOAT, false, 0, 0)
        gl.enableVertexAttribArray(color)

        //sizePix
        gl.uniform1f(gl.getUniformLocation(this.program, 'sizePix'), 1.0 * this.sizePix)

        //transformation
        gl.uniformMatrix3fv(gl.getUniformLocation(this.program, 'mat'), false, new Float32Array(transfoMat))

        // Enable the depth test
        //gl.enable(gl.DEPTH_TEST);
        // Clear the color buffer bit
        gl.clear(gl.COLOR_BUFFER_BIT)
        // Set the view port
        //gl.viewport(0, 0, cg.w, cg.h);

        gl.drawArrays(gl.POINTS, 0, this.verticesBuffer.length / 2)
    }
}


/***/ }),

/***/ "./src/utils/WebGLSquareColoringAdvanced.js":
/*!**************************************************!*\
  !*** ./src/utils/WebGLSquareColoringAdvanced.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WebGLSquareColoringAdvanced: () => (/* binding */ WebGLSquareColoringAdvanced)
/* harmony export */ });
/* harmony import */ var _webGLUtils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./webGLUtils.js */ "./src/utils/webGLUtils.js");
/* harmony import */ var d3_color__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-color */ "./node_modules/d3-color/src/color.js");
//@ts-check


;


/**
 * Everything to easily draw colored squares with webGL.
 * All the same size, but different fill color.
 * The color interpolation is computed in the fragment shader program, by the GPU, thus it is less flexible but faster.
 */
class WebGLSquareColoringAdvanced {
    //see:
    //https://webglfundamentals.org/webgl/lessons/fr/webgl-shaders-and-glsl.html#les-uniforms-dans-les-shaders-de-vertex
    //https://thebookofshaders.com/glossary/?search=mix
    //https://thebookofshaders.com/06/
    //https://thebookofshaders.com/glossary/

    /**
     *
     * @param {*} gl
     * @param {Array.<String>} colors
     * @param {{fun:string,alpha:number}} stretching
     * @param {number} sizePix
     * @param {number|undefined} globalOpacity
     */
    constructor(gl, colors, stretching, sizePix = 10, globalOpacity = undefined) {
        /** @type {WebGLRenderingContext} */
        this.gl = gl
        //gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
        //gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        //gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

        /** @type {WebGLShader} */
        const vShader = (0,_webGLUtils_js__WEBPACK_IMPORTED_MODULE_0__.createShader)(
            gl,
            gl.VERTEX_SHADER,
            `
        attribute vec2 pos;
        uniform float sizePix;
        uniform mat3 mat;

        attribute float t;
        varying float vt;

        void main() {
          gl_Position = vec4(mat * vec3(pos, 1.0), 1.0);
          gl_PointSize = sizePix;
          vt = t;
        }
      `
        )

        //prepare fragment shader code
        //declare the uniform and other variables
        let fshString =
            '' +
            'precision mediump float;\n' +
            'varying float vt;\n' +
            'uniform float alpha;\n' +
            (() => {
                const out = []
                for (let i = 0; i < colors.length; i++) out.push('uniform vec4 c' + i + ';\n')
                return out.join('')
            })() +
            //start the main function, apply the stretching of t
            'void main(void) {\n'

        if (stretching) {
            if (stretching.fun == 'pow')
                //sPow = (t, alpha = 3) => Math.pow(t, alpha);
                fshString += '   float t = pow(vt, alpha);\n'
            else if (stretching.fun == 'powInv')
                //sPowRev = (t, alpha = 3) => 1 - Math.pow(1 - t, 1 / alpha);
                fshString += '   float t = 1.0-pow(1.0-vt, 1.0/alpha);\n'
            else if (stretching.fun == 'exp')
                //sExp = (t, alpha = 3) => alpha == 0 ? t : (Math.exp(t * alpha) - 1) / (Math.exp(alpha) - 1);
                fshString +=
                    stretching.alpha == 0
                        ? `float t = vt;`
                        : '   float t = (exp(vt * alpha) - 1.0) / (exp(alpha) - 1.0);\n'
            else if (stretching.fun == 'log')
                //sExpRev = (t, alpha = 3) => alpha == 0 ? t : 1 - (1 / alpha) * Math.log(Math.exp(alpha) * (1 - t) + t);
                fshString +=
                    stretching.alpha == 0
                        ? `float t = vt;`
                        : '   float t = 1.0 - (1.0 / alpha) * log(exp(alpha) * (1.0 - vt) + vt);\n'
            else if (stretching.fun == 'circle') {
                if (stretching.alpha == 0)
                    //if (alpha == 0) return t;
                    fshString += '   float t = vt;\n'
                else if (stretching.alpha == 1)
                    // if (alpha == 1) return Math.sqrt(2 * t - t * t);
                    fshString += '   float t = sqrt(vt * (2.0 - vt));\n'
                else {
                    //const a = alpha / (1 - alpha);
                    //return Math.sqrt(1 / (a * a) + t * (2 / a + 2 - t)) - 1 / a;
                    fshString +=
                        '   float a = alpha / (1.0 - alpha);\n' +
                        '   float t = sqrt(1.0 / (a * a) + vt * ( 2.0/a + 2.0 - vt )) - 1.0 / a;\n'
                }
            } else if (stretching.fun == 'circleInv') {
                // 1 - sCircleLow(1 - t, alpha)
                if (stretching.alpha == 0)
                    //if (alpha == 0) return t;
                    fshString += '   float t = vt;\n'
                else if (stretching.alpha == 1)
                    // if (alpha == 1) return Math.sqrt(2 * t - t * t);
                    fshString += '   float t = 1.0 - sqrt((1.0 - vt) * (1.0 + vt));\n'
                else {
                    //const a = alpha / (1 - alpha);
                    //return Math.sqrt(1 / (a * a) + (2 * t) / a + 2 * t - t * t) - 1 / a;
                    fshString +=
                        '   float a = alpha / (1.0 - alpha);\n' +
                        '   float t = 1.0 - sqrt(1.0 / (a * a) + (1.0-vt) * ( 2.0/a + 1.0 + vt )) + 1.0 / a;\n'
                }
            } else {
                console.error('Unexpected stretching function code: ' + stretching.fun)
                fshString += '   float t = vt;\n'
            }
        } else {
            fshString += '   float t = vt;\n'
        }

        //choose initial and final colors, and adjust t value
        if (colors.length == 1) fshString += '   vec4 cI=c0;\n   vec4 cF=c0;\n'
        else if (colors.length == 2) fshString += '   vec4 cI=c0;\n   vec4 cF=c1;\n'
        else {
            const nb = colors.length - 1
            const nbs = nb + '.0'
            fshString += '   vec4 cI;\n'
            fshString += '   vec4 cF;\n'
            fshString += '   if(t<1.0/' + nbs + ') { cI=c0; cF=c1; t=t*' + nbs + '; }\n'
            for (let i = 2; i < nb; i++)
                fshString +=
                    '   else if(t<' +
                    i +
                    '.0/' +
                    nbs +
                    ') { cI=c' +
                    (i - 1) +
                    '; cF=c' +
                    i +
                    '; t=' +
                    nbs +
                    '*t-' +
                    (i - 1) +
                    '.0; }\n'
            fshString +=
                '   else { cI=c' + (nb - 1) + '; cF=c' + nb + '; t=' + nbs + '*t-' + (nb - 1) + '.0; }\n'
        }

        //one single color
        if (colors.length == 1) fshString += '   gl_FragColor = vec4(c0[0], c0[1], c0[2], c0[3]);}\n'
        //set interpolated color, between initial and final one
        else fshString += '   gl_FragColor = mix(cI, cF, t);}\n'

        //console.log(fshString)

        /** @type {WebGLShader} */
        const fShader = (0,_webGLUtils_js__WEBPACK_IMPORTED_MODULE_0__.createShader)(gl, gl.FRAGMENT_SHADER, fshString)

        /** @type {WebGLProgram} */
        this.program = (0,_webGLUtils_js__WEBPACK_IMPORTED_MODULE_0__.initShaderProgram)(gl, vShader, fShader)
        gl.useProgram(this.program)

        //set uniforms

        //sizePix
        //TODO: bug here. Seems to be limited to some threshold value (around 250).
        gl.uniform1f(gl.getUniformLocation(this.program, 'sizePix'), 1.0 * sizePix)

        //stretching alpha factor
        gl.uniform1f(gl.getUniformLocation(this.program, 'alpha'), stretching ? 1.0 * stretching.alpha : 0.0)

        //colors
        for (let i = 0; i < colors.length; i++) {
            const c = (0,d3_color__WEBPACK_IMPORTED_MODULE_1__["default"])(colors[i])

            let opacity = c.opacity
            if (c.opacity == 1 && globalOpacity != undefined) opacity = globalOpacity

            gl.uniform4fv(gl.getUniformLocation(this.program, 'c' + i), [
                +c.r / 255.0,
                +c.g / 255.0,
                +c.b / 255.0,
                +opacity,
            ])
        }
    }

    /**  */
    draw(verticesBuffer, tBuffer, transfoMat) {
        const gl = this.gl
        const program = this.program

        //vertice data
        gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer())
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verticesBuffer), gl.STATIC_DRAW)
        const position = gl.getAttribLocation(program, 'pos')
        gl.vertexAttribPointer(
            position,
            2, //numComponents
            gl.FLOAT, //type
            false, //normalise
            0, //stride
            0 //offset
        )
        gl.enableVertexAttribArray(position)

        //t data
        gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer())
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(tBuffer), gl.STATIC_DRAW)
        const t = gl.getAttribLocation(program, 't')
        gl.vertexAttribPointer(t, 1, gl.FLOAT, false, 0, 0)
        gl.enableVertexAttribArray(t)

        //transformation
        gl.uniformMatrix3fv(gl.getUniformLocation(program, 'mat'), false, new Float32Array(transfoMat))

        // Enable the depth test
        //gl.enable(gl.DEPTH_TEST);
        // Clear the color buffer bit
        gl.clear(gl.COLOR_BUFFER_BIT)
        // Set the view port
        //gl.viewport(0, 0, cg.w, cg.h);

        gl.drawArrays(gl.POINTS, 0, verticesBuffer.length / 2)
    }
}


/***/ }),

/***/ "./src/utils/WebGLSquareColoringCatAdvanced.js":
/*!*****************************************************!*\
  !*** ./src/utils/WebGLSquareColoringCatAdvanced.js ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WebGLSquareColoringCatAdvanced: () => (/* binding */ WebGLSquareColoringCatAdvanced)
/* harmony export */ });
/* harmony import */ var _webGLUtils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./webGLUtils.js */ "./src/utils/webGLUtils.js");
/* harmony import */ var d3_color__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-color */ "./node_modules/d3-color/src/color.js");
//@ts-check


;


/**
 * Everything to easily draw colored squares with webGL.
 * All the same size, but different fill color.
 * Color based on categories.
 */
class WebGLSquareColoringCatAdvanced {
    /**
     * @param {Array.<string>} colors
     */
    constructor(colors) {
        /**
         * @type {Array.<string>} */
        this.colors = colors

        /** Vector shader program
         * @type {string} */
        this.vshString = `
        attribute vec2 pos;
        uniform float sizePix;
        uniform mat3 mat;

        attribute float i;
        varying float vi;

        void main() {
          gl_Position = vec4(mat * vec3(pos, 1.0), 1.0);
          gl_PointSize = sizePix;
          vi = i;
        }
        `

        //prepare fragment shader code
        //declare the uniform and other variables
        const out = []
        out.push('precision mediump float;\nvarying float vi;\n')
        //add color uniforms
        out.push('uniform vec4')
        for (let i = 0; i < colors.length; i++) {
            if (i > 0) out.push(',')
            out.push(' c' + i)
        }
        out.push(';\n')
        //start the main function
        out.push('void main(void) {\n')
        //choose color i
        for (let i = 0; i < colors.length; i++) {
            if (i > 0) out.push('else ')
            out.push('if(vi==')
            out.push(i)
            out.push('.0) gl_FragColor = vec4(c')
            out.push(i)
            out.push('[0], c')
            out.push(i)
            out.push('[1], c')
            out.push(i)
            out.push('[2], c')
            out.push(i)
            out.push('[3]);\n')
        }
        out.push('else gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);\n}')
        /** Fragment shader program
         * @type {string} */
        this.fshString = out.join('')
    }

    /**  */
    draw(gl, verticesBuffer, iBuffer, transfoMat, sizePix = 10) {
        /** @type {WebGLShader} */
        const vShader = (0,_webGLUtils_js__WEBPACK_IMPORTED_MODULE_0__.createShader)(gl, gl.VERTEX_SHADER, this.vshString)

        /** @type {WebGLShader} */
        const fShader = (0,_webGLUtils_js__WEBPACK_IMPORTED_MODULE_0__.createShader)(gl, gl.FRAGMENT_SHADER, this.fshString)

        /** @type {WebGLProgram} */
        const program = (0,_webGLUtils_js__WEBPACK_IMPORTED_MODULE_0__.initShaderProgram)(gl, vShader, fShader)
        gl.useProgram(program)

        //set uniforms

        //sizePix
        gl.uniform1f(gl.getUniformLocation(program, 'sizePix'), 1.0 * sizePix)

        //colors
        for (let i = 0; i < this.colors.length; i++) {
            const c = (0,d3_color__WEBPACK_IMPORTED_MODULE_1__["default"])(this.colors[i])
            gl.uniform4fv(gl.getUniformLocation(program, 'c' + i), [
                +c.r / 255.0,
                +c.g / 255.0,
                +c.b / 255.0,
                +c.opacity,
            ])
        }

        //vertice data
        gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer())
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verticesBuffer), gl.STATIC_DRAW)
        const position = gl.getAttribLocation(program, 'pos')
        gl.vertexAttribPointer(
            position,
            2, //numComponents
            gl.FLOAT, //type
            false, //normalise
            0, //stride
            0 //offset
        )
        gl.enableVertexAttribArray(position)

        //i data
        gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer())
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(iBuffer), gl.STATIC_DRAW)
        const i = gl.getAttribLocation(program, 'i')
        gl.vertexAttribPointer(i, 1, gl.FLOAT, false, 0, 0)
        gl.enableVertexAttribArray(i)

        //transformation
        gl.uniformMatrix3fv(gl.getUniformLocation(program, 'mat'), false, new Float32Array(transfoMat))

        // Enable the depth test
        //gl.enable(gl.DEPTH_TEST);
        // Clear the color buffer bit
        gl.clear(gl.COLOR_BUFFER_BIT)
        // Set the view port
        //gl.viewport(0, 0, cg.w, cg.h);

        gl.drawArrays(gl.POINTS, 0, verticesBuffer.length / 2)
    }
}


/***/ }),

/***/ "./src/utils/scale.js":
/*!****************************!*\
  !*** ./src/utils/scale.js ***!
  \****************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   classifier: () => (/* binding */ classifier),
/* harmony export */   colorClassifier: () => (/* binding */ colorClassifier),
/* harmony export */   discreteColors: () => (/* binding */ discreteColors),
/* harmony export */   viewScale: () => (/* binding */ viewScale),
/* harmony export */   viewScaleColor: () => (/* binding */ viewScaleColor),
/* harmony export */   viewScaleColorQuantile: () => (/* binding */ viewScaleColorQuantile),
/* harmony export */   viewScaleCombination: () => (/* binding */ viewScaleCombination),
/* harmony export */   viewScaleQuantile: () => (/* binding */ viewScaleQuantile)
/* harmony export */ });
/* harmony import */ var d3_array__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-array */ "./node_modules/d3-array/src/max.js");
/* harmony import */ var d3_array__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! d3-array */ "./node_modules/d3-array/src/extent.js");
/* harmony import */ var d3_scale__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-scale */ "./node_modules/d3-scale/src/quantile.js");
//@ts-check


;


/**
 * A scale is simply a function that map a domain to a range.
 * @typedef {function(number):number} Scale */

/**
 * A scale whose range is a color (string).
* @typedef {function(number):string} ColorScale */



/**
 * Generic function for view scale - continuous
 * 
 * @param {{ valueFunction:function(import("../Dataset").Cell):number, minValue?:number, minSizePix?:number, maxSizeFactor?:number, range?:[number, number], domain?:[number, number], stretching?:function(number):number }} opts 
 * @returns {function(Array.<import("../Dataset").Cell>):Scale}
 */
const viewScale = (opts) => {
    const valueFunction = opts.valueFunction
    const minValue = opts.minValue || 0
    const minSizePix = opts.minSizePix || 0
    const maxSizeFactor = opts.maxSizeFactor || 1
    const stretching = opts.stretching
    const range_ = opts.range
    const domain_ = opts.domain
    return (cells, r, z) => {
        const domain = domain_ || [minValue, (0,d3_array__WEBPACK_IMPORTED_MODULE_0__["default"])(cells, valueFunction)]
        const range = range_ || [minSizePix * z, r * maxSizeFactor]
        return t => {
            //scale to [0,1]
            t = (t - domain[0]) / (domain[1] - domain[0])
            //stretch
            if (stretching) t = stretching(t)
            //scale to range
            return range[0] + t * (range[1] - range[0])
        }
    }
}


/**
 * Generic function for view scale - quantile
 * 
 * @param {{ valueFunction:function(import("../Dataset").Cell):number, classNumber?:number, minSizePix?:number, maxSizeFactor?:number }} opts 
 * @returns {function(Array.<import("../Dataset").Cell>):Scale}
 */
const viewScaleQuantile = (opts) => {
    const valueFunction = opts.valueFunction
    const classNumber = opts.classNumber || 12
    const minSizePix = opts.minSizePix || 1
    const maxSizeFactor = opts.maxSizeFactor || 1
    const scale = (0,d3_scale__WEBPACK_IMPORTED_MODULE_1__["default"])()
    return (cells, r, z) => {
        scale.domain(cells.map(valueFunction))
        const minSizeGeo = minSizePix * z, maxSizeGeo = r * maxSizeFactor
        scale.range(Array.from({ length: classNumber }, (_, i) => minSizeGeo + i * (maxSizeGeo - minSizeGeo) / (classNumber - 1)))
        scale.breaks = scale.quantiles()
        scale.values = scale.range()
        return scale;
    }
}






/**
 * Generic function for color view scale - continuous
 * 
 * @param {{ valueFunction:function(import("../Dataset").Cell):number, colorScale?:function(number):string, stretching?:function(number):number }} opts 
 * @returns {function(Array.<import("../Dataset").Cell>):ColorScale}
 */
const viewScaleColor = (opts) => {
    const valueFunction = opts.valueFunction
    const colorScale = opts.colorScale || (() => "purple")
    const stretching = opts.stretching
    return (cells) => {
        /** @type {[undefined, undefined] | [number, number]} */
        const domain = (0,d3_array__WEBPACK_IMPORTED_MODULE_2__["default"])(cells, valueFunction)
        const amplitude = domain[1] - domain[0]
        const scale = t => {
            //scale to [0,1]
            t = (t - domain[0]) / amplitude
            //stretch
            if (stretching) t = stretching(t)
            return colorScale(t)
        }
        //function that return the domain value from the [0,1] range.
        scale.invert = t => {
            if (stretching) t = stretching.invert(t)
            return domain[0] + t * amplitude
        }

        return scale;
    }
}

/**
 * Generic function for color view scale - quantile
 * 
 * @param {{ valueFunction:function(import("../Dataset").Cell):number, classNumber?:number, colors?:Array.<string>, colorScale?:function(number):string }} opts 
 * @returns {function(Array.<import("../Dataset").Cell>):ColorScale}
 */
const viewScaleColorQuantile = (opts) => {
    const valueFunction = opts.valueFunction
    const classNumber = opts.classNumber || 12

    let colors = opts.colors
    if (opts.colorScale) colors = discreteColors(opts.colorScale, classNumber)
    colors = colors || Array.from({ length: classNumber }, (_, i) => "rgb(" + Math.floor(255 * i / (classNumber - 1)) + ",150,150)")

    const scale = (0,d3_scale__WEBPACK_IMPORTED_MODULE_1__["default"])().range(colors)
    return (cells) => {
        scale.domain(cells.map(valueFunction));
        scale.breaks = scale.quantiles()
        scale.colors = colors
        return scale;
    }
}




/**
 * combine view scale functions
 * 
 * @param {*} obj 
 * @returns 
 */
const viewScaleCombination = (obj) => {
    //obj: prop and a function to call
    return (cells, r, z) => {
        const out = {}
        for (const p in obj) { out[p] = obj[p](cells, r, z) }
        return out
    }
}






/**
 * Return a classifier function from break values.
 * The classifier function returns the class id (from 0 to breaks.length) from a value to classifiy.
 * @param {Array.<number>} breaks the breaks
 */
function classifier(breaks) {
    const bl = breaks.length
    const classifier = value => {
        let i = 0
        while (i < bl) {
            const break_ = breaks[i]
            if (value <= break_) return i
            i++
        }
        return i
    }
    classifier.breaks = breaks
    return classifier
}



/**
 * Return a color classifier function from break values.
 * The classifier function returns the color from a value to classifiy.
 * There should be one color more than break values.
 * @param {Array.<number>} breaks the breaks
 * @param {Array.<string>} colors the colors
 */
function colorClassifier(breaks, colors) {
    const classifier_ = classifier(breaks)
    const colorClissifier = value => colors[classifier_(value)]
    colorClissifier.breaks = breaks
    colorClissifier.colors = colors
    return colorClissifier
}

/**
 * Make array of colors from a colorScale
 * 
 * @param {function(number):string} colorScale 
 * @param {number} nb 
 */
function discreteColors(colorScale, nb) {
    if (nb == 1) return [colorScale(0.5)]
    const out = []
    for (let i = 0; i < nb; i++)
        out.push(colorScale(i / (nb - 1)))
    return out
}


/***/ }),

/***/ "./src/utils/stretching.js":
/*!*********************************!*\
  !*** ./src/utils/stretching.js ***!
  \*********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   circularInverseScale: () => (/* binding */ circularInverseScale),
/* harmony export */   circularScale: () => (/* binding */ circularScale),
/* harmony export */   exponentialScale: () => (/* binding */ exponentialScale),
/* harmony export */   logarithmicScale: () => (/* binding */ logarithmicScale),
/* harmony export */   powerInverseScale: () => (/* binding */ powerInverseScale),
/* harmony export */   powerScale: () => (/* binding */ powerScale)
/* harmony export */ });
//@ts-check



//TODO invert for circular
//TODO use Math.sqrt
//TODO validate


/**
 * Some function [0,1]->[0,1] to stretch range of values.
 * @see https://github.com/eurostat/gridviz/blob/master/docs/reference.md#stretching
 * @see https://observablehq.com/@jgaffuri/stretching
 */

//identity function
const identity = t => t
identity.invert = identity


/**
 * @param {number} base 
 * @returns {function(number):number}
 */
const exponentialScale = (base = 3) => {
    if (base == 0) return identity
    const a = (Math.exp(base) - 1)
    const f = t => (Math.exp(t * base) - 1) / a
    f.invert = t => Math.log(a * t + 1) / base
    return f
}

/**
 * @param {number} base 
 * @returns {function(number):number}
 */
const logarithmicScale = (base = 3) => {
    if (base == 0) return identity
    const a = Math.exp(base), b = 1 - a
    const f = t => 1 - Math.log(a + t * b) / base
    f.invert = t => (Math.exp((1 - t) * base) - a) / b
    return f
}





/**
 * @param {number} exponent 
 * @returns {function(number):number}
 */
const powerScale = (exponent = 3) => {
    if (exponent == 1) return identity
    //TODO if (exponent == 0.5) return Math.sqrt
    const f = t => Math.pow(t, exponent)
    const a = 1 / exponent
    f.invert = t => Math.pow(t, a)
    return f
}

/**
 * @param {number} exponent 
 * @returns {function(number):number}
 */
const powerInverseScale = (exponent = 3) => {
    if (exponent == 1) return identity
    //TODO if (exponent == 2) return t => 1 - Math.sqrt(1 - t)
    const a = 1 / exponent
    const f = t => 1 - Math.pow(1 - t, a)
    f.invert = t => 1 - Math.pow(1 - t, exponent)
    return f
}




/**
 * @param {number} circularity 
 * @returns {function(number):number}
 */
const circularScale = (circularity = 0.8) => {
    if (circularity == 0) return identity
    if (circularity == 1) return t => Math.sqrt(t * (2 - t))
    else {
        const a = circularity / (1 - circularity)
        return t => Math.sqrt(1 / (a * a) + t * (2 / a + 2 - t)) - 1 / a
    }
}

/**
 * @param {number} circularity 
 * @returns {function(number):number}
 */
const circularInverseScale = (circularity = 0.8) => {
    if (circularity == 0) return identity
    const f = circularScale(circularity)
    return t => 1 - f(1 - t)
}





//test
/*
const test = (f, fun, a, err = 1e-12) => {
    for (let t = 0; t <= 1; t += 1 / 50) {
        const er = t - f.invert(f(t))
        if (Math.abs(er) < err) continue
        console.log(fun, a, er)
    }
}

for (let fun of [powerScale, powerInverseScale])
    for (let exp = -30; exp <= 50; exp += 1) {
        if (exp == 0) continue
        const f = fun(exp)
        test(f, fun, exp)
    }


for (let fun of [exponentialScale, logarithmicScale])
    for (let base = -20; base <= 20; base += 1) {
        //if (exp == 0) continue
        const f = fun(base)
        test(f, fun, base, 1e-10)
    }
*/

/***/ }),

/***/ "./src/utils/utils.js":
/*!****************************!*\
  !*** ./src/utils/utils.js ***!
  \****************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getClass: () => (/* binding */ getClass),
/* harmony export */   monitor: () => (/* binding */ monitor),
/* harmony export */   monitorDuration: () => (/* binding */ monitorDuration),
/* harmony export */   nice: () => (/* binding */ nice)
/* harmony export */ });
//@ts-check


/**
 * Get the class id from a value and class break values
 *
 * @param {number} v the value
 * @param {Array.<number>} breaks the breaks
 * @returns The class id, from 0 to breaks.length
 * @deprecated use getClassifier instead
 */
function getClass(v, breaks) {
    if (!breaks) return
    if (breaks.length == 0) return 0
    if (v <= breaks[0]) return 0
    for (let i = 1; i < breaks.length; i++) if (breaks[i - 1] < v && v <= breaks[i]) return i
    return breaks.length
}



//take 'nice' value (power of ten, or multiple)
function nice(v, multiples = [8, 6, 5, 4, 2.5, 2]) {
    //compute bigger power of ten below
    const v_ = Math.pow(10, Math.floor(Math.log10(v)))
    for (let multiple of multiples)
        if (v_ * multiple <= v) return v_ * multiple
    return v_
}






let monitor = false

let previousDate
function monitorDuration(message) {
    const nowDate = Date.now()

    //first call
    if (!previousDate) {
        previousDate = nowDate
        console.log(previousDate, message)
        return
    }

    const d = nowDate - previousDate
    previousDate = nowDate
    console.log(d, message)
}


/***/ }),

/***/ "./src/utils/webGLUtils.js":
/*!*********************************!*\
  !*** ./src/utils/webGLUtils.js ***!
  \*********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   checkWebGLSupport: () => (/* binding */ checkWebGLSupport),
/* harmony export */   createShader: () => (/* binding */ createShader),
/* harmony export */   initShaderProgram: () => (/* binding */ initShaderProgram),
/* harmony export */   makeWebGLCanvas: () => (/* binding */ makeWebGLCanvas)
/* harmony export */ });
//@ts-check


/**
 * @param {string} width
 * @param {string} height
 * @param {object} opts
 * @returns {{canvas:HTMLCanvasElement, gl:WebGLRenderingContext}}
 */
function makeWebGLCanvas(width, height, opts) {
    const canvas = document.createElement('canvas')
    canvas.setAttribute('width', width)
    canvas.setAttribute('height', height)
    const gl = canvas.getContext('webgl', opts)
    if (!gl) {
        throw new Error('Unable to initialize WebGL. Your browser or machine may not support it.')
    }
    return { canvas: canvas, gl: gl }
}

/**
 * Initialize a shader program, so WebGL knows how to draw our data
 *
 * @param {WebGLRenderingContext} gl
 * @param  {...WebGLShader} shaders
 * @returns {WebGLProgram}
 */
function initShaderProgram(gl, ...shaders) {
    /** @type {WebGLProgram|null} */
    const program = gl.createProgram()
    if (program == null) throw new Error('Cannot create webGL program')
    for (const shader of shaders) gl.attachShader(program, shader)
    gl.linkProgram(program)
    if (gl.getProgramParameter(program, gl.LINK_STATUS)) return program
    throw new Error(gl.getProgramInfoLog(program) || 'Cannot create webGL program (2)')
}

/**
 * Creates a shader of the given type, uploads the source and compiles it.
 *
 * @param {WebGLRenderingContext} gl
 * @param {number} type
 * @param  {...string} sources
 * @returns {WebGLShader}
 */
function createShader(gl, type, ...sources) {
    /** @type {WebGLShader|null} */
    const shader = gl.createShader(type)
    if (shader == null) throw new Error('Cannot create webGL shader')
    gl.shaderSource(shader, sources.join('\n'))
    gl.compileShader(shader)
    if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) return shader
    throw new Error(gl.getShaderInfoLog(shader) || 'Cannot create webGL shader (2)')
}

/**
 * Check if webGL is supported
 *
 * @returns {boolean}
 */
function checkWebGLSupport() {
    try {
        const canvas = document.createElement('canvas')
        return !!window.WebGLRenderingContext &&
            (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
            ? true
            : false
    } catch (err) {
        return false
    }
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* empty/unused harmony star reexport */
/* empty/unused harmony star reexport */
/* empty/unused harmony star reexport */
/* empty/unused harmony star reexport */
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BackgroundLayer: () => (/* reexport safe */ _layer_BackgroundLayer_js__WEBPACK_IMPORTED_MODULE_24__.BackgroundLayer),
/* harmony export */   BackgroundLayerWMS: () => (/* reexport safe */ _layer_BackgroundLayerWMS_js__WEBPACK_IMPORTED_MODULE_25__.BackgroundLayerWMS),
/* harmony export */   BoundaryLayer: () => (/* reexport safe */ _layer_LineLayer_js__WEBPACK_IMPORTED_MODULE_27__.LineLayer),
/* harmony export */   CSVGrid: () => (/* reexport safe */ _dataset_CSVGrid_js__WEBPACK_IMPORTED_MODULE_2__.CSVGrid),
/* harmony export */   ColorCategoryLegend: () => (/* reexport safe */ _legend_ColorCategoryLegend_js__WEBPACK_IMPORTED_MODULE_30__.ColorCategoryLegend),
/* harmony export */   ColorDiscreteLegend: () => (/* reexport safe */ _legend_ColorDiscreteLegend_js__WEBPACK_IMPORTED_MODULE_29__.ColorDiscreteLegend),
/* harmony export */   ColorLegend: () => (/* reexport safe */ _legend_ColorLegend_js__WEBPACK_IMPORTED_MODULE_28__.ColorLegend),
/* harmony export */   CompositionStyle: () => (/* reexport safe */ _style_CompositionStyle_js__WEBPACK_IMPORTED_MODULE_7__.CompositionStyle),
/* harmony export */   ContourStyle: () => (/* reexport safe */ _style_ContourStyle_js__WEBPACK_IMPORTED_MODULE_12__.ContourStyle),
/* harmony export */   DotDensityStyle: () => (/* reexport safe */ _style_DotDensityStyle_js__WEBPACK_IMPORTED_MODULE_14__.DotDensityStyle),
/* harmony export */   GridLayer: () => (/* reexport safe */ _layer_GridLayer_js__WEBPACK_IMPORTED_MODULE_23__.GridLayer),
/* harmony export */   IsoFenceStyle: () => (/* reexport safe */ _style_IsoFenceStyle_js__WEBPACK_IMPORTED_MODULE_22__.IsoFenceStyle),
/* harmony export */   JSGrid: () => (/* reexport safe */ _dataset_JSGrid_js__WEBPACK_IMPORTED_MODULE_3__.JSGrid),
/* harmony export */   JoyPlotStyle: () => (/* reexport safe */ _style_JoyPlotStyle_js__WEBPACK_IMPORTED_MODULE_6__.JoyPlotStyle),
/* harmony export */   LabelLayer: () => (/* reexport safe */ _layer_LabelLayer_js__WEBPACK_IMPORTED_MODULE_26__.LabelLayer),
/* harmony export */   LegoStyle: () => (/* reexport safe */ _style_LegoStyle_js__WEBPACK_IMPORTED_MODULE_16__.LegoStyle),
/* harmony export */   MosaicStyle: () => (/* reexport safe */ _style_MosaicStyle_js__WEBPACK_IMPORTED_MODULE_19__.MosaicStyle),
/* harmony export */   NinjaStarStyle: () => (/* reexport safe */ _style_NinjaStarStyle_js__WEBPACK_IMPORTED_MODULE_20__.NinjaStarStyle),
/* harmony export */   PillarStyle: () => (/* reexport safe */ _style_PillarStyle_js__WEBPACK_IMPORTED_MODULE_10__.PillarStyle),
/* harmony export */   SegmentOrientationLegend: () => (/* reexport safe */ _legend_SegmentOrientationLegend_js__WEBPACK_IMPORTED_MODULE_33__.SegmentOrientationLegend),
/* harmony export */   SegmentStyle: () => (/* reexport safe */ _style_SegmentStyle_js__WEBPACK_IMPORTED_MODULE_8__.SegmentStyle),
/* harmony export */   SegmentWidthLegend: () => (/* reexport safe */ _legend_SegmentWidthLegend_js__WEBPACK_IMPORTED_MODULE_32__.SegmentWidthLegend),
/* harmony export */   ShapeColorSizeStyle: () => (/* reexport safe */ _style_ShapeColorSizeStyle_js__WEBPACK_IMPORTED_MODULE_4__.ShapeColorSizeStyle),
/* harmony export */   SideCatStyle: () => (/* reexport safe */ _style_SideCatStyle_js__WEBPACK_IMPORTED_MODULE_13__.SideCatStyle),
/* harmony export */   SideStyle: () => (/* reexport safe */ _style_SideStyle_js__WEBPACK_IMPORTED_MODULE_11__.SideStyle),
/* harmony export */   SizeLegend: () => (/* reexport safe */ _legend_SizeLegend_js__WEBPACK_IMPORTED_MODULE_31__.SizeLegend),
/* harmony export */   SquareColorCatWGLStyle: () => (/* reexport safe */ _style_SquareColorCatWGLStyle_js__WEBPACK_IMPORTED_MODULE_18__.SquareColorCatWGLStyle),
/* harmony export */   SquareColorWGLStyle: () => (/* reexport safe */ _style_SquareColorWGLStyle_js__WEBPACK_IMPORTED_MODULE_17__.SquareColorWGLStyle),
/* harmony export */   StrokeStyle: () => (/* reexport safe */ _style_StrokeStyle_js__WEBPACK_IMPORTED_MODULE_5__.StrokeStyle),
/* harmony export */   TanakaStyle: () => (/* reexport safe */ _style_TanakaStyle_js__WEBPACK_IMPORTED_MODULE_15__.TanakaStyle),
/* harmony export */   TextStyle: () => (/* reexport safe */ _style_TextStyle_js__WEBPACK_IMPORTED_MODULE_9__.TextStyle),
/* harmony export */   TiledGrid: () => (/* reexport safe */ _dataset_TiledGrid_js__WEBPACK_IMPORTED_MODULE_1__.TiledGrid),
/* harmony export */   TimeSeriesStyle: () => (/* reexport safe */ _style_TimeSeriesStyle_js__WEBPACK_IMPORTED_MODULE_21__.TimeSeriesStyle),
/* harmony export */   circularInverseScale: () => (/* reexport safe */ _utils_stretching_js__WEBPACK_IMPORTED_MODULE_34__.circularInverseScale),
/* harmony export */   circularScale: () => (/* reexport safe */ _utils_stretching_js__WEBPACK_IMPORTED_MODULE_34__.circularScale),
/* harmony export */   classifier: () => (/* reexport safe */ _utils_scale_js__WEBPACK_IMPORTED_MODULE_35__.classifier),
/* harmony export */   colorClassifier: () => (/* reexport safe */ _utils_scale_js__WEBPACK_IMPORTED_MODULE_35__.colorClassifier),
/* harmony export */   discreteColors: () => (/* reexport safe */ _utils_scale_js__WEBPACK_IMPORTED_MODULE_35__.discreteColors),
/* harmony export */   exponentialScale: () => (/* reexport safe */ _utils_stretching_js__WEBPACK_IMPORTED_MODULE_34__.exponentialScale),
/* harmony export */   getParameterByName: () => (/* binding */ getParameterByName),
/* harmony export */   logarithmicScale: () => (/* reexport safe */ _utils_stretching_js__WEBPACK_IMPORTED_MODULE_34__.logarithmicScale),
/* harmony export */   nice: () => (/* reexport safe */ _utils_utils_js__WEBPACK_IMPORTED_MODULE_36__.nice),
/* harmony export */   powerInverseScale: () => (/* reexport safe */ _utils_stretching_js__WEBPACK_IMPORTED_MODULE_34__.powerInverseScale),
/* harmony export */   powerScale: () => (/* reexport safe */ _utils_stretching_js__WEBPACK_IMPORTED_MODULE_34__.powerScale),
/* harmony export */   sizeDiscreteLegend: () => (/* reexport safe */ _legend_SizeLegend_js__WEBPACK_IMPORTED_MODULE_31__.sizeDiscreteLegend),
/* harmony export */   sizeDiscreteViewScaleLegend: () => (/* reexport safe */ _legend_SizeLegend_js__WEBPACK_IMPORTED_MODULE_31__.sizeDiscreteViewScaleLegend),
/* harmony export */   sizeLegend: () => (/* reexport safe */ _legend_SizeLegend_js__WEBPACK_IMPORTED_MODULE_31__.sizeLegend),
/* harmony export */   sizeLegendViewScale: () => (/* reexport safe */ _legend_SizeLegend_js__WEBPACK_IMPORTED_MODULE_31__.sizeLegendViewScale),
/* harmony export */   viewScale: () => (/* reexport safe */ _utils_scale_js__WEBPACK_IMPORTED_MODULE_35__.viewScale),
/* harmony export */   viewScaleColor: () => (/* reexport safe */ _utils_scale_js__WEBPACK_IMPORTED_MODULE_35__.viewScaleColor),
/* harmony export */   viewScaleColorQuantile: () => (/* reexport safe */ _utils_scale_js__WEBPACK_IMPORTED_MODULE_35__.viewScaleColorQuantile),
/* harmony export */   viewScaleCombination: () => (/* reexport safe */ _utils_scale_js__WEBPACK_IMPORTED_MODULE_35__.viewScaleCombination),
/* harmony export */   viewScaleQuantile: () => (/* reexport safe */ _utils_scale_js__WEBPACK_IMPORTED_MODULE_35__.viewScaleQuantile)
/* harmony export */ });
Object(function webpackMissingModule() { var e = new Error("Cannot find module './Map.js'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
Object(function webpackMissingModule() { var e = new Error("Cannot find module './Style.js'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
Object(function webpackMissingModule() { var e = new Error("Cannot find module './Layer.js'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
Object(function webpackMissingModule() { var e = new Error("Cannot find module './MultiResolutionDataset.js'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
/* harmony import */ var _dataset_TiledGrid_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dataset/TiledGrid.js */ "./src/dataset/TiledGrid.js");
/* harmony import */ var _dataset_CSVGrid_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dataset/CSVGrid.js */ "./src/dataset/CSVGrid.js");
/* harmony import */ var _dataset_JSGrid_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dataset/JSGrid.js */ "./src/dataset/JSGrid.js");
/* harmony import */ var _style_ShapeColorSizeStyle_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./style/ShapeColorSizeStyle.js */ "./src/style/ShapeColorSizeStyle.js");
/* harmony import */ var _style_StrokeStyle_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./style/StrokeStyle.js */ "./src/style/StrokeStyle.js");
/* harmony import */ var _style_JoyPlotStyle_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./style/JoyPlotStyle.js */ "./src/style/JoyPlotStyle.js");
/* harmony import */ var _style_CompositionStyle_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./style/CompositionStyle.js */ "./src/style/CompositionStyle.js");
/* harmony import */ var _style_SegmentStyle_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./style/SegmentStyle.js */ "./src/style/SegmentStyle.js");
/* harmony import */ var _style_TextStyle_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./style/TextStyle.js */ "./src/style/TextStyle.js");
/* harmony import */ var _style_PillarStyle_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./style/PillarStyle.js */ "./src/style/PillarStyle.js");
/* harmony import */ var _style_SideStyle_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./style/SideStyle.js */ "./src/style/SideStyle.js");
/* harmony import */ var _style_ContourStyle_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./style/ContourStyle.js */ "./src/style/ContourStyle.js");
/* harmony import */ var _style_SideCatStyle_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./style/SideCatStyle.js */ "./src/style/SideCatStyle.js");
/* harmony import */ var _style_DotDensityStyle_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./style/DotDensityStyle.js */ "./src/style/DotDensityStyle.js");
/* harmony import */ var _style_TanakaStyle_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./style/TanakaStyle.js */ "./src/style/TanakaStyle.js");
/* harmony import */ var _style_LegoStyle_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./style/LegoStyle.js */ "./src/style/LegoStyle.js");
/* harmony import */ var _style_SquareColorWGLStyle_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./style/SquareColorWGLStyle.js */ "./src/style/SquareColorWGLStyle.js");
/* harmony import */ var _style_SquareColorCatWGLStyle_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./style/SquareColorCatWGLStyle.js */ "./src/style/SquareColorCatWGLStyle.js");
/* harmony import */ var _style_MosaicStyle_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./style/MosaicStyle.js */ "./src/style/MosaicStyle.js");
/* harmony import */ var _style_NinjaStarStyle_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./style/NinjaStarStyle.js */ "./src/style/NinjaStarStyle.js");
/* harmony import */ var _style_TimeSeriesStyle_js__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./style/TimeSeriesStyle.js */ "./src/style/TimeSeriesStyle.js");
/* harmony import */ var _style_IsoFenceStyle_js__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./style/IsoFenceStyle.js */ "./src/style/IsoFenceStyle.js");
/* harmony import */ var _layer_GridLayer_js__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./layer/GridLayer.js */ "./src/layer/GridLayer.js");
/* harmony import */ var _layer_BackgroundLayer_js__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./layer/BackgroundLayer.js */ "./src/layer/BackgroundLayer.js");
/* harmony import */ var _layer_BackgroundLayerWMS_js__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./layer/BackgroundLayerWMS.js */ "./src/layer/BackgroundLayerWMS.js");
/* harmony import */ var _layer_LabelLayer_js__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./layer/LabelLayer.js */ "./src/layer/LabelLayer.js");
/* harmony import */ var _layer_LineLayer_js__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./layer/LineLayer.js */ "./src/layer/LineLayer.js");
/* harmony import */ var _legend_ColorLegend_js__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./legend/ColorLegend.js */ "./src/legend/ColorLegend.js");
/* harmony import */ var _legend_ColorDiscreteLegend_js__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./legend/ColorDiscreteLegend.js */ "./src/legend/ColorDiscreteLegend.js");
/* harmony import */ var _legend_ColorCategoryLegend_js__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./legend/ColorCategoryLegend.js */ "./src/legend/ColorCategoryLegend.js");
/* harmony import */ var _legend_SizeLegend_js__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./legend/SizeLegend.js */ "./src/legend/SizeLegend.js");
/* harmony import */ var _legend_SegmentWidthLegend_js__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./legend/SegmentWidthLegend.js */ "./src/legend/SegmentWidthLegend.js");
/* harmony import */ var _legend_SegmentOrientationLegend_js__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./legend/SegmentOrientationLegend.js */ "./src/legend/SegmentOrientationLegend.js");
/* harmony import */ var _utils_stretching_js__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./utils/stretching.js */ "./src/utils/stretching.js");
/* harmony import */ var _utils_scale_js__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ./utils/scale.js */ "./src/utils/scale.js");
/* harmony import */ var _utils_utils_js__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ./utils/utils.js */ "./src/utils/utils.js");
Object(function webpackMissingModule() { var e = new Error("Cannot find module './GeoCanvas.js'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
/* harmony import */ var d3_format__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! d3-format */ "./node_modules/d3-format/src/defaultLocale.js");
//@ts-check


// the application

//export { GeoCanvas } from './GeoCanvas.js'




// export dataset types
//export { Dataset } from './Dataset.js'



//export { GeoTIFF } from "./dataset/GeoTIFF"

// export styles




















// export additional layers






// export legends







// export { goToStraight, zoomTo } from "./utils/zoomUtils"




;
const getParameterByName = Object(function webpackMissingModule() { var e = new Error("Cannot find module './GeoCanvas.js'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()).getParameterByName

// set default d3 locale
;
(0,d3_format__WEBPACK_IMPORTED_MODULE_37__["default"])({
    decimal: '.',
    thousands: ' ',
    grouping: [3],
    currency: ['', '€'],
})

})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUF5QixJQUFJO0FBQzdCLHdDQUF3QyxJQUFJLEdBQUcsSUFBSSxHQUFHLElBQUk7QUFDMUQsd0NBQXdDLElBQUksR0FBRyxJQUFJLEdBQUcsSUFBSTtBQUMxRCwwQ0FBMEMsSUFBSSxHQUFHLElBQUksR0FBRyxJQUFJLEdBQUcsSUFBSTtBQUNuRSwwQ0FBMEMsSUFBSSxHQUFHLElBQUksR0FBRyxJQUFJLEdBQUcsSUFBSTtBQUNuRSx3Q0FBd0MsSUFBSSxHQUFHLElBQUksR0FBRyxJQUFJO0FBQzFELDBDQUEwQyxJQUFJLEdBQUcsSUFBSSxHQUFHLElBQUksR0FBRyxJQUFJOztBQUVuRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QjtBQUNKO0FBQ0Y7QUFDNUMsV0FBVyxVQUFVOztBQUVyQjtBQUNvRTtBQUNoQjtBQUNFO0FBQ1E7QUFDUjtBQUNOO0FBQ0k7QUFDSjtBQUNNO0FBQ0E7QUFDTTtBQUNSO0FBQ0o7QUFDb0I7QUFDTTtBQUN0QjtBQUNNO0FBQ0U7QUFDSjs7QUFFeEQ7QUFDZ0Q7QUFDWTtBQUNNO0FBQ2hCO0FBQ2U7O0FBRWpFO0FBQ3FEO0FBQ2dCO0FBQ0E7QUFDZ0U7QUFDbEU7QUFDWTs7QUFFL0UsWUFBWSx1QkFBdUI7QUFDRTtBQUNMO0FBQ087O0FBRXZDLENBQTBDO0FBQ25DLDJCQUEyQiw2SUFBUzs7QUFFM0M7QUFDQSxDQUErQztBQUMvQyxzREFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZ3JpZHZpei93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vZ3JpZHZpei8uL25vZGVfbW9kdWxlcy9kMy1hcnJheS9zcmMvYXNjZW5kaW5nLmpzIiwid2VicGFjazovL2dyaWR2aXovLi9ub2RlX21vZHVsZXMvZDMtYXJyYXkvc3JjL2Jpc2VjdC5qcyIsIndlYnBhY2s6Ly9ncmlkdml6Ly4vbm9kZV9tb2R1bGVzL2QzLWFycmF5L3NyYy9iaXNlY3Rvci5qcyIsIndlYnBhY2s6Ly9ncmlkdml6Ly4vbm9kZV9tb2R1bGVzL2QzLWFycmF5L3NyYy9kZXNjZW5kaW5nLmpzIiwid2VicGFjazovL2dyaWR2aXovLi9ub2RlX21vZHVsZXMvZDMtYXJyYXkvc3JjL2V4dGVudC5qcyIsIndlYnBhY2s6Ly9ncmlkdml6Ly4vbm9kZV9tb2R1bGVzL2QzLWFycmF5L3NyYy9ncmVhdGVzdC5qcyIsIndlYnBhY2s6Ly9ncmlkdml6Ly4vbm9kZV9tb2R1bGVzL2QzLWFycmF5L3NyYy9tYXguanMiLCJ3ZWJwYWNrOi8vZ3JpZHZpei8uL25vZGVfbW9kdWxlcy9kMy1hcnJheS9zcmMvbWF4SW5kZXguanMiLCJ3ZWJwYWNrOi8vZ3JpZHZpei8uL25vZGVfbW9kdWxlcy9kMy1hcnJheS9zcmMvbWluLmpzIiwid2VicGFjazovL2dyaWR2aXovLi9ub2RlX21vZHVsZXMvZDMtYXJyYXkvc3JjL21pbkluZGV4LmpzIiwid2VicGFjazovL2dyaWR2aXovLi9ub2RlX21vZHVsZXMvZDMtYXJyYXkvc3JjL251bWJlci5qcyIsIndlYnBhY2s6Ly9ncmlkdml6Ly4vbm9kZV9tb2R1bGVzL2QzLWFycmF5L3NyYy9wZXJtdXRlLmpzIiwid2VicGFjazovL2dyaWR2aXovLi9ub2RlX21vZHVsZXMvZDMtYXJyYXkvc3JjL3F1YW50aWxlLmpzIiwid2VicGFjazovL2dyaWR2aXovLi9ub2RlX21vZHVsZXMvZDMtYXJyYXkvc3JjL3F1aWNrc2VsZWN0LmpzIiwid2VicGFjazovL2dyaWR2aXovLi9ub2RlX21vZHVsZXMvZDMtYXJyYXkvc3JjL3NvcnQuanMiLCJ3ZWJwYWNrOi8vZ3JpZHZpei8uL25vZGVfbW9kdWxlcy9kMy1jb2xvci9zcmMvY29sb3IuanMiLCJ3ZWJwYWNrOi8vZ3JpZHZpei8uL25vZGVfbW9kdWxlcy9kMy1jb2xvci9zcmMvZGVmaW5lLmpzIiwid2VicGFjazovL2dyaWR2aXovLi9ub2RlX21vZHVsZXMvZDMtZHN2L3NyYy9jc3YuanMiLCJ3ZWJwYWNrOi8vZ3JpZHZpei8uL25vZGVfbW9kdWxlcy9kMy1kc3Yvc3JjL2Rzdi5qcyIsIndlYnBhY2s6Ly9ncmlkdml6Ly4vbm9kZV9tb2R1bGVzL2QzLWRzdi9zcmMvdHN2LmpzIiwid2VicGFjazovL2dyaWR2aXovLi9ub2RlX21vZHVsZXMvZDMtZmV0Y2gvc3JjL2Rzdi5qcyIsIndlYnBhY2s6Ly9ncmlkdml6Ly4vbm9kZV9tb2R1bGVzL2QzLWZldGNoL3NyYy9qc29uLmpzIiwid2VicGFjazovL2dyaWR2aXovLi9ub2RlX21vZHVsZXMvZDMtZmV0Y2gvc3JjL3RleHQuanMiLCJ3ZWJwYWNrOi8vZ3JpZHZpei8uL25vZGVfbW9kdWxlcy9kMy1mb3JtYXQvc3JjL2RlZmF1bHRMb2NhbGUuanMiLCJ3ZWJwYWNrOi8vZ3JpZHZpei8uL25vZGVfbW9kdWxlcy9kMy1mb3JtYXQvc3JjL2V4cG9uZW50LmpzIiwid2VicGFjazovL2dyaWR2aXovLi9ub2RlX21vZHVsZXMvZDMtZm9ybWF0L3NyYy9mb3JtYXREZWNpbWFsLmpzIiwid2VicGFjazovL2dyaWR2aXovLi9ub2RlX21vZHVsZXMvZDMtZm9ybWF0L3NyYy9mb3JtYXRHcm91cC5qcyIsIndlYnBhY2s6Ly9ncmlkdml6Ly4vbm9kZV9tb2R1bGVzL2QzLWZvcm1hdC9zcmMvZm9ybWF0TnVtZXJhbHMuanMiLCJ3ZWJwYWNrOi8vZ3JpZHZpei8uL25vZGVfbW9kdWxlcy9kMy1mb3JtYXQvc3JjL2Zvcm1hdFByZWZpeEF1dG8uanMiLCJ3ZWJwYWNrOi8vZ3JpZHZpei8uL25vZGVfbW9kdWxlcy9kMy1mb3JtYXQvc3JjL2Zvcm1hdFJvdW5kZWQuanMiLCJ3ZWJwYWNrOi8vZ3JpZHZpei8uL25vZGVfbW9kdWxlcy9kMy1mb3JtYXQvc3JjL2Zvcm1hdFNwZWNpZmllci5qcyIsIndlYnBhY2s6Ly9ncmlkdml6Ly4vbm9kZV9tb2R1bGVzL2QzLWZvcm1hdC9zcmMvZm9ybWF0VHJpbS5qcyIsIndlYnBhY2s6Ly9ncmlkdml6Ly4vbm9kZV9tb2R1bGVzL2QzLWZvcm1hdC9zcmMvZm9ybWF0VHlwZXMuanMiLCJ3ZWJwYWNrOi8vZ3JpZHZpei8uL25vZGVfbW9kdWxlcy9kMy1mb3JtYXQvc3JjL2lkZW50aXR5LmpzIiwid2VicGFjazovL2dyaWR2aXovLi9ub2RlX21vZHVsZXMvZDMtZm9ybWF0L3NyYy9sb2NhbGUuanMiLCJ3ZWJwYWNrOi8vZ3JpZHZpei8uL25vZGVfbW9kdWxlcy9kMy1yYW5kb20vc3JjL2RlZmF1bHRTb3VyY2UuanMiLCJ3ZWJwYWNrOi8vZ3JpZHZpei8uL25vZGVfbW9kdWxlcy9kMy1yYW5kb20vc3JjL25vcm1hbC5qcyIsIndlYnBhY2s6Ly9ncmlkdml6Ly4vbm9kZV9tb2R1bGVzL2QzLXNjYWxlL3NyYy9pbml0LmpzIiwid2VicGFjazovL2dyaWR2aXovLi9ub2RlX21vZHVsZXMvZDMtc2NhbGUvc3JjL3F1YW50aWxlLmpzIiwid2VicGFjazovL2dyaWR2aXovLi9zcmMvZGF0YXNldC9DU1ZHcmlkLmpzIiwid2VicGFjazovL2dyaWR2aXovLi9zcmMvZGF0YXNldC9KU0dyaWQuanMiLCJ3ZWJwYWNrOi8vZ3JpZHZpei8uL3NyYy9kYXRhc2V0L1RpbGVkR3JpZC5qcyIsIndlYnBhY2s6Ly9ncmlkdml6Ly4vc3JjL2xheWVyL0JhY2tncm91bmRMYXllci5qcyIsIndlYnBhY2s6Ly9ncmlkdml6Ly4vc3JjL2xheWVyL0JhY2tncm91bmRMYXllcldNUy5qcyIsIndlYnBhY2s6Ly9ncmlkdml6Ly4vc3JjL2xheWVyL0dyaWRMYXllci5qcyIsIndlYnBhY2s6Ly9ncmlkdml6Ly4vc3JjL2xheWVyL0xhYmVsTGF5ZXIuanMiLCJ3ZWJwYWNrOi8vZ3JpZHZpei8uL3NyYy9sYXllci9MaW5lTGF5ZXIuanMiLCJ3ZWJwYWNrOi8vZ3JpZHZpei8uL3NyYy9sZWdlbmQvQ29sb3JDYXRlZ29yeUxlZ2VuZC5qcyIsIndlYnBhY2s6Ly9ncmlkdml6Ly4vc3JjL2xlZ2VuZC9Db2xvckRpc2NyZXRlTGVnZW5kLmpzIiwid2VicGFjazovL2dyaWR2aXovLi9zcmMvbGVnZW5kL0NvbG9yTGVnZW5kLmpzIiwid2VicGFjazovL2dyaWR2aXovLi9zcmMvbGVnZW5kL1NlZ21lbnRPcmllbnRhdGlvbkxlZ2VuZC5qcyIsIndlYnBhY2s6Ly9ncmlkdml6Ly4vc3JjL2xlZ2VuZC9TZWdtZW50V2lkdGhMZWdlbmQuanMiLCJ3ZWJwYWNrOi8vZ3JpZHZpei8uL3NyYy9sZWdlbmQvU2l6ZUxlZ2VuZC5qcyIsIndlYnBhY2s6Ly9ncmlkdml6Ly4vc3JjL3N0eWxlL0NvbXBvc2l0aW9uU3R5bGUuanMiLCJ3ZWJwYWNrOi8vZ3JpZHZpei8uL3NyYy9zdHlsZS9Db250b3VyU3R5bGUuanMiLCJ3ZWJwYWNrOi8vZ3JpZHZpei8uL3NyYy9zdHlsZS9Eb3REZW5zaXR5U3R5bGUuanMiLCJ3ZWJwYWNrOi8vZ3JpZHZpei8uL3NyYy9zdHlsZS9Jc29GZW5jZVN0eWxlLmpzIiwid2VicGFjazovL2dyaWR2aXovLi9zcmMvc3R5bGUvSm95UGxvdFN0eWxlLmpzIiwid2VicGFjazovL2dyaWR2aXovLi9zcmMvc3R5bGUvTGVnb1N0eWxlLmpzIiwid2VicGFjazovL2dyaWR2aXovLi9zcmMvc3R5bGUvTW9zYWljU3R5bGUuanMiLCJ3ZWJwYWNrOi8vZ3JpZHZpei8uL3NyYy9zdHlsZS9OaW5qYVN0YXJTdHlsZS5qcyIsIndlYnBhY2s6Ly9ncmlkdml6Ly4vc3JjL3N0eWxlL1BpbGxhclN0eWxlLmpzIiwid2VicGFjazovL2dyaWR2aXovLi9zcmMvc3R5bGUvU2VnbWVudFN0eWxlLmpzIiwid2VicGFjazovL2dyaWR2aXovLi9zcmMvc3R5bGUvU2hhcGVDb2xvclNpemVTdHlsZS5qcyIsIndlYnBhY2s6Ly9ncmlkdml6Ly4vc3JjL3N0eWxlL1NpZGVDYXRTdHlsZS5qcyIsIndlYnBhY2s6Ly9ncmlkdml6Ly4vc3JjL3N0eWxlL1NpZGVTdHlsZS5qcyIsIndlYnBhY2s6Ly9ncmlkdml6Ly4vc3JjL3N0eWxlL1NxdWFyZUNvbG9yQ2F0V0dMU3R5bGUuanMiLCJ3ZWJwYWNrOi8vZ3JpZHZpei8uL3NyYy9zdHlsZS9TcXVhcmVDb2xvcldHTFN0eWxlLmpzIiwid2VicGFjazovL2dyaWR2aXovLi9zcmMvc3R5bGUvU3Ryb2tlU3R5bGUuanMiLCJ3ZWJwYWNrOi8vZ3JpZHZpei8uL3NyYy9zdHlsZS9UYW5ha2FTdHlsZS5qcyIsIndlYnBhY2s6Ly9ncmlkdml6Ly4vc3JjL3N0eWxlL1RleHRTdHlsZS5qcyIsIndlYnBhY2s6Ly9ncmlkdml6Ly4vc3JjL3N0eWxlL1RpbWVTZXJpZXNTdHlsZS5qcyIsIndlYnBhY2s6Ly9ncmlkdml6Ly4vc3JjL3V0aWxzL1dlYkdMU3F1YXJlQ29sb3JpbmcuanMiLCJ3ZWJwYWNrOi8vZ3JpZHZpei8uL3NyYy91dGlscy9XZWJHTFNxdWFyZUNvbG9yaW5nQWR2YW5jZWQuanMiLCJ3ZWJwYWNrOi8vZ3JpZHZpei8uL3NyYy91dGlscy9XZWJHTFNxdWFyZUNvbG9yaW5nQ2F0QWR2YW5jZWQuanMiLCJ3ZWJwYWNrOi8vZ3JpZHZpei8uL3NyYy91dGlscy9zY2FsZS5qcyIsIndlYnBhY2s6Ly9ncmlkdml6Ly4vc3JjL3V0aWxzL3N0cmV0Y2hpbmcuanMiLCJ3ZWJwYWNrOi8vZ3JpZHZpei8uL3NyYy91dGlscy91dGlscy5qcyIsIndlYnBhY2s6Ly9ncmlkdml6Ly4vc3JjL3V0aWxzL3dlYkdMVXRpbHMuanMiLCJ3ZWJwYWNrOi8vZ3JpZHZpei93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9ncmlkdml6L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9ncmlkdml6L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vZ3JpZHZpei93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2dyaWR2aXovLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiZ3JpZHZpelwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJncmlkdml6XCJdID0gZmFjdG9yeSgpO1xufSkoc2VsZiwgKCkgPT4ge1xucmV0dXJuICIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzY2VuZGluZyhhLCBiKSB7XG4gIHJldHVybiBhID09IG51bGwgfHwgYiA9PSBudWxsID8gTmFOIDogYSA8IGIgPyAtMSA6IGEgPiBiID8gMSA6IGEgPj0gYiA/IDAgOiBOYU47XG59XG4iLCJpbXBvcnQgYXNjZW5kaW5nIGZyb20gXCIuL2FzY2VuZGluZy5qc1wiO1xuaW1wb3J0IGJpc2VjdG9yIGZyb20gXCIuL2Jpc2VjdG9yLmpzXCI7XG5pbXBvcnQgbnVtYmVyIGZyb20gXCIuL251bWJlci5qc1wiO1xuXG5jb25zdCBhc2NlbmRpbmdCaXNlY3QgPSBiaXNlY3Rvcihhc2NlbmRpbmcpO1xuZXhwb3J0IGNvbnN0IGJpc2VjdFJpZ2h0ID0gYXNjZW5kaW5nQmlzZWN0LnJpZ2h0O1xuZXhwb3J0IGNvbnN0IGJpc2VjdExlZnQgPSBhc2NlbmRpbmdCaXNlY3QubGVmdDtcbmV4cG9ydCBjb25zdCBiaXNlY3RDZW50ZXIgPSBiaXNlY3RvcihudW1iZXIpLmNlbnRlcjtcbmV4cG9ydCBkZWZhdWx0IGJpc2VjdFJpZ2h0O1xuIiwiaW1wb3J0IGFzY2VuZGluZyBmcm9tIFwiLi9hc2NlbmRpbmcuanNcIjtcbmltcG9ydCBkZXNjZW5kaW5nIGZyb20gXCIuL2Rlc2NlbmRpbmcuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYmlzZWN0b3IoZikge1xuICBsZXQgY29tcGFyZTEsIGNvbXBhcmUyLCBkZWx0YTtcblxuICAvLyBJZiBhbiBhY2Nlc3NvciBpcyBzcGVjaWZpZWQsIHByb21vdGUgaXQgdG8gYSBjb21wYXJhdG9yLiBJbiB0aGlzIGNhc2Ugd2VcbiAgLy8gY2FuIHRlc3Qgd2hldGhlciB0aGUgc2VhcmNoIHZhbHVlIGlzIChzZWxmLSkgY29tcGFyYWJsZS4gV2UgY2Fu4oCZdCBkbyB0aGlzXG4gIC8vIGZvciBhIGNvbXBhcmF0b3IgKGV4Y2VwdCBmb3Igc3BlY2lmaWMsIGtub3duIGNvbXBhcmF0b3JzKSBiZWNhdXNlIHdlIGNhbuKAmXRcbiAgLy8gdGVsbCBpZiB0aGUgY29tcGFyYXRvciBpcyBzeW1tZXRyaWMsIGFuZCBhbiBhc3ltbWV0cmljIGNvbXBhcmF0b3IgY2Fu4oCZdCBiZVxuICAvLyB1c2VkIHRvIHRlc3Qgd2hldGhlciBhIHNpbmdsZSB2YWx1ZSBpcyBjb21wYXJhYmxlLlxuICBpZiAoZi5sZW5ndGggIT09IDIpIHtcbiAgICBjb21wYXJlMSA9IGFzY2VuZGluZztcbiAgICBjb21wYXJlMiA9IChkLCB4KSA9PiBhc2NlbmRpbmcoZihkKSwgeCk7XG4gICAgZGVsdGEgPSAoZCwgeCkgPT4gZihkKSAtIHg7XG4gIH0gZWxzZSB7XG4gICAgY29tcGFyZTEgPSBmID09PSBhc2NlbmRpbmcgfHwgZiA9PT0gZGVzY2VuZGluZyA/IGYgOiB6ZXJvO1xuICAgIGNvbXBhcmUyID0gZjtcbiAgICBkZWx0YSA9IGY7XG4gIH1cblxuICBmdW5jdGlvbiBsZWZ0KGEsIHgsIGxvID0gMCwgaGkgPSBhLmxlbmd0aCkge1xuICAgIGlmIChsbyA8IGhpKSB7XG4gICAgICBpZiAoY29tcGFyZTEoeCwgeCkgIT09IDApIHJldHVybiBoaTtcbiAgICAgIGRvIHtcbiAgICAgICAgY29uc3QgbWlkID0gKGxvICsgaGkpID4+PiAxO1xuICAgICAgICBpZiAoY29tcGFyZTIoYVttaWRdLCB4KSA8IDApIGxvID0gbWlkICsgMTtcbiAgICAgICAgZWxzZSBoaSA9IG1pZDtcbiAgICAgIH0gd2hpbGUgKGxvIDwgaGkpO1xuICAgIH1cbiAgICByZXR1cm4gbG87XG4gIH1cblxuICBmdW5jdGlvbiByaWdodChhLCB4LCBsbyA9IDAsIGhpID0gYS5sZW5ndGgpIHtcbiAgICBpZiAobG8gPCBoaSkge1xuICAgICAgaWYgKGNvbXBhcmUxKHgsIHgpICE9PSAwKSByZXR1cm4gaGk7XG4gICAgICBkbyB7XG4gICAgICAgIGNvbnN0IG1pZCA9IChsbyArIGhpKSA+Pj4gMTtcbiAgICAgICAgaWYgKGNvbXBhcmUyKGFbbWlkXSwgeCkgPD0gMCkgbG8gPSBtaWQgKyAxO1xuICAgICAgICBlbHNlIGhpID0gbWlkO1xuICAgICAgfSB3aGlsZSAobG8gPCBoaSk7XG4gICAgfVxuICAgIHJldHVybiBsbztcbiAgfVxuXG4gIGZ1bmN0aW9uIGNlbnRlcihhLCB4LCBsbyA9IDAsIGhpID0gYS5sZW5ndGgpIHtcbiAgICBjb25zdCBpID0gbGVmdChhLCB4LCBsbywgaGkgLSAxKTtcbiAgICByZXR1cm4gaSA+IGxvICYmIGRlbHRhKGFbaSAtIDFdLCB4KSA+IC1kZWx0YShhW2ldLCB4KSA/IGkgLSAxIDogaTtcbiAgfVxuXG4gIHJldHVybiB7bGVmdCwgY2VudGVyLCByaWdodH07XG59XG5cbmZ1bmN0aW9uIHplcm8oKSB7XG4gIHJldHVybiAwO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZGVzY2VuZGluZyhhLCBiKSB7XG4gIHJldHVybiBhID09IG51bGwgfHwgYiA9PSBudWxsID8gTmFOXG4gICAgOiBiIDwgYSA/IC0xXG4gICAgOiBiID4gYSA/IDFcbiAgICA6IGIgPj0gYSA/IDBcbiAgICA6IE5hTjtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGV4dGVudCh2YWx1ZXMsIHZhbHVlb2YpIHtcbiAgbGV0IG1pbjtcbiAgbGV0IG1heDtcbiAgaWYgKHZhbHVlb2YgPT09IHVuZGVmaW5lZCkge1xuICAgIGZvciAoY29uc3QgdmFsdWUgb2YgdmFsdWVzKSB7XG4gICAgICBpZiAodmFsdWUgIT0gbnVsbCkge1xuICAgICAgICBpZiAobWluID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBpZiAodmFsdWUgPj0gdmFsdWUpIG1pbiA9IG1heCA9IHZhbHVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChtaW4gPiB2YWx1ZSkgbWluID0gdmFsdWU7XG4gICAgICAgICAgaWYgKG1heCA8IHZhbHVlKSBtYXggPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBsZXQgaW5kZXggPSAtMTtcbiAgICBmb3IgKGxldCB2YWx1ZSBvZiB2YWx1ZXMpIHtcbiAgICAgIGlmICgodmFsdWUgPSB2YWx1ZW9mKHZhbHVlLCArK2luZGV4LCB2YWx1ZXMpKSAhPSBudWxsKSB7XG4gICAgICAgIGlmIChtaW4gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGlmICh2YWx1ZSA+PSB2YWx1ZSkgbWluID0gbWF4ID0gdmFsdWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKG1pbiA+IHZhbHVlKSBtaW4gPSB2YWx1ZTtcbiAgICAgICAgICBpZiAobWF4IDwgdmFsdWUpIG1heCA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBbbWluLCBtYXhdO1xufVxuIiwiaW1wb3J0IGFzY2VuZGluZyBmcm9tIFwiLi9hc2NlbmRpbmcuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ3JlYXRlc3QodmFsdWVzLCBjb21wYXJlID0gYXNjZW5kaW5nKSB7XG4gIGxldCBtYXg7XG4gIGxldCBkZWZpbmVkID0gZmFsc2U7XG4gIGlmIChjb21wYXJlLmxlbmd0aCA9PT0gMSkge1xuICAgIGxldCBtYXhWYWx1ZTtcbiAgICBmb3IgKGNvbnN0IGVsZW1lbnQgb2YgdmFsdWVzKSB7XG4gICAgICBjb25zdCB2YWx1ZSA9IGNvbXBhcmUoZWxlbWVudCk7XG4gICAgICBpZiAoZGVmaW5lZFxuICAgICAgICAgID8gYXNjZW5kaW5nKHZhbHVlLCBtYXhWYWx1ZSkgPiAwXG4gICAgICAgICAgOiBhc2NlbmRpbmcodmFsdWUsIHZhbHVlKSA9PT0gMCkge1xuICAgICAgICBtYXggPSBlbGVtZW50O1xuICAgICAgICBtYXhWYWx1ZSA9IHZhbHVlO1xuICAgICAgICBkZWZpbmVkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgZm9yIChjb25zdCB2YWx1ZSBvZiB2YWx1ZXMpIHtcbiAgICAgIGlmIChkZWZpbmVkXG4gICAgICAgICAgPyBjb21wYXJlKHZhbHVlLCBtYXgpID4gMFxuICAgICAgICAgIDogY29tcGFyZSh2YWx1ZSwgdmFsdWUpID09PSAwKSB7XG4gICAgICAgIG1heCA9IHZhbHVlO1xuICAgICAgICBkZWZpbmVkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIG1heDtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG1heCh2YWx1ZXMsIHZhbHVlb2YpIHtcbiAgbGV0IG1heDtcbiAgaWYgKHZhbHVlb2YgPT09IHVuZGVmaW5lZCkge1xuICAgIGZvciAoY29uc3QgdmFsdWUgb2YgdmFsdWVzKSB7XG4gICAgICBpZiAodmFsdWUgIT0gbnVsbFxuICAgICAgICAgICYmIChtYXggPCB2YWx1ZSB8fCAobWF4ID09PSB1bmRlZmluZWQgJiYgdmFsdWUgPj0gdmFsdWUpKSkge1xuICAgICAgICBtYXggPSB2YWx1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgbGV0IGluZGV4ID0gLTE7XG4gICAgZm9yIChsZXQgdmFsdWUgb2YgdmFsdWVzKSB7XG4gICAgICBpZiAoKHZhbHVlID0gdmFsdWVvZih2YWx1ZSwgKytpbmRleCwgdmFsdWVzKSkgIT0gbnVsbFxuICAgICAgICAgICYmIChtYXggPCB2YWx1ZSB8fCAobWF4ID09PSB1bmRlZmluZWQgJiYgdmFsdWUgPj0gdmFsdWUpKSkge1xuICAgICAgICBtYXggPSB2YWx1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIG1heDtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG1heEluZGV4KHZhbHVlcywgdmFsdWVvZikge1xuICBsZXQgbWF4O1xuICBsZXQgbWF4SW5kZXggPSAtMTtcbiAgbGV0IGluZGV4ID0gLTE7XG4gIGlmICh2YWx1ZW9mID09PSB1bmRlZmluZWQpIHtcbiAgICBmb3IgKGNvbnN0IHZhbHVlIG9mIHZhbHVlcykge1xuICAgICAgKytpbmRleDtcbiAgICAgIGlmICh2YWx1ZSAhPSBudWxsXG4gICAgICAgICAgJiYgKG1heCA8IHZhbHVlIHx8IChtYXggPT09IHVuZGVmaW5lZCAmJiB2YWx1ZSA+PSB2YWx1ZSkpKSB7XG4gICAgICAgIG1heCA9IHZhbHVlLCBtYXhJbmRleCA9IGluZGV4O1xuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBmb3IgKGxldCB2YWx1ZSBvZiB2YWx1ZXMpIHtcbiAgICAgIGlmICgodmFsdWUgPSB2YWx1ZW9mKHZhbHVlLCArK2luZGV4LCB2YWx1ZXMpKSAhPSBudWxsXG4gICAgICAgICAgJiYgKG1heCA8IHZhbHVlIHx8IChtYXggPT09IHVuZGVmaW5lZCAmJiB2YWx1ZSA+PSB2YWx1ZSkpKSB7XG4gICAgICAgIG1heCA9IHZhbHVlLCBtYXhJbmRleCA9IGluZGV4O1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gbWF4SW5kZXg7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBtaW4odmFsdWVzLCB2YWx1ZW9mKSB7XG4gIGxldCBtaW47XG4gIGlmICh2YWx1ZW9mID09PSB1bmRlZmluZWQpIHtcbiAgICBmb3IgKGNvbnN0IHZhbHVlIG9mIHZhbHVlcykge1xuICAgICAgaWYgKHZhbHVlICE9IG51bGxcbiAgICAgICAgICAmJiAobWluID4gdmFsdWUgfHwgKG1pbiA9PT0gdW5kZWZpbmVkICYmIHZhbHVlID49IHZhbHVlKSkpIHtcbiAgICAgICAgbWluID0gdmFsdWU7XG4gICAgICB9XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGxldCBpbmRleCA9IC0xO1xuICAgIGZvciAobGV0IHZhbHVlIG9mIHZhbHVlcykge1xuICAgICAgaWYgKCh2YWx1ZSA9IHZhbHVlb2YodmFsdWUsICsraW5kZXgsIHZhbHVlcykpICE9IG51bGxcbiAgICAgICAgICAmJiAobWluID4gdmFsdWUgfHwgKG1pbiA9PT0gdW5kZWZpbmVkICYmIHZhbHVlID49IHZhbHVlKSkpIHtcbiAgICAgICAgbWluID0gdmFsdWU7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBtaW47XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBtaW5JbmRleCh2YWx1ZXMsIHZhbHVlb2YpIHtcbiAgbGV0IG1pbjtcbiAgbGV0IG1pbkluZGV4ID0gLTE7XG4gIGxldCBpbmRleCA9IC0xO1xuICBpZiAodmFsdWVvZiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgZm9yIChjb25zdCB2YWx1ZSBvZiB2YWx1ZXMpIHtcbiAgICAgICsraW5kZXg7XG4gICAgICBpZiAodmFsdWUgIT0gbnVsbFxuICAgICAgICAgICYmIChtaW4gPiB2YWx1ZSB8fCAobWluID09PSB1bmRlZmluZWQgJiYgdmFsdWUgPj0gdmFsdWUpKSkge1xuICAgICAgICBtaW4gPSB2YWx1ZSwgbWluSW5kZXggPSBpbmRleDtcbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgZm9yIChsZXQgdmFsdWUgb2YgdmFsdWVzKSB7XG4gICAgICBpZiAoKHZhbHVlID0gdmFsdWVvZih2YWx1ZSwgKytpbmRleCwgdmFsdWVzKSkgIT0gbnVsbFxuICAgICAgICAgICYmIChtaW4gPiB2YWx1ZSB8fCAobWluID09PSB1bmRlZmluZWQgJiYgdmFsdWUgPj0gdmFsdWUpKSkge1xuICAgICAgICBtaW4gPSB2YWx1ZSwgbWluSW5kZXggPSBpbmRleDtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIG1pbkluZGV4O1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbnVtYmVyKHgpIHtcbiAgcmV0dXJuIHggPT09IG51bGwgPyBOYU4gOiAreDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uKiBudW1iZXJzKHZhbHVlcywgdmFsdWVvZikge1xuICBpZiAodmFsdWVvZiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgZm9yIChsZXQgdmFsdWUgb2YgdmFsdWVzKSB7XG4gICAgICBpZiAodmFsdWUgIT0gbnVsbCAmJiAodmFsdWUgPSArdmFsdWUpID49IHZhbHVlKSB7XG4gICAgICAgIHlpZWxkIHZhbHVlO1xuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBsZXQgaW5kZXggPSAtMTtcbiAgICBmb3IgKGxldCB2YWx1ZSBvZiB2YWx1ZXMpIHtcbiAgICAgIGlmICgodmFsdWUgPSB2YWx1ZW9mKHZhbHVlLCArK2luZGV4LCB2YWx1ZXMpKSAhPSBudWxsICYmICh2YWx1ZSA9ICt2YWx1ZSkgPj0gdmFsdWUpIHtcbiAgICAgICAgeWllbGQgdmFsdWU7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBwZXJtdXRlKHNvdXJjZSwga2V5cykge1xuICByZXR1cm4gQXJyYXkuZnJvbShrZXlzLCBrZXkgPT4gc291cmNlW2tleV0pO1xufVxuIiwiaW1wb3J0IG1heCBmcm9tIFwiLi9tYXguanNcIjtcbmltcG9ydCBtYXhJbmRleCBmcm9tIFwiLi9tYXhJbmRleC5qc1wiO1xuaW1wb3J0IG1pbiBmcm9tIFwiLi9taW4uanNcIjtcbmltcG9ydCBtaW5JbmRleCBmcm9tIFwiLi9taW5JbmRleC5qc1wiO1xuaW1wb3J0IHF1aWNrc2VsZWN0IGZyb20gXCIuL3F1aWNrc2VsZWN0LmpzXCI7XG5pbXBvcnQgbnVtYmVyLCB7bnVtYmVyc30gZnJvbSBcIi4vbnVtYmVyLmpzXCI7XG5pbXBvcnQge2FzY2VuZGluZ0RlZmluZWR9IGZyb20gXCIuL3NvcnQuanNcIjtcbmltcG9ydCBncmVhdGVzdCBmcm9tIFwiLi9ncmVhdGVzdC5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBxdWFudGlsZSh2YWx1ZXMsIHAsIHZhbHVlb2YpIHtcbiAgdmFsdWVzID0gRmxvYXQ2NEFycmF5LmZyb20obnVtYmVycyh2YWx1ZXMsIHZhbHVlb2YpKTtcbiAgaWYgKCEobiA9IHZhbHVlcy5sZW5ndGgpIHx8IGlzTmFOKHAgPSArcCkpIHJldHVybjtcbiAgaWYgKHAgPD0gMCB8fCBuIDwgMikgcmV0dXJuIG1pbih2YWx1ZXMpO1xuICBpZiAocCA+PSAxKSByZXR1cm4gbWF4KHZhbHVlcyk7XG4gIHZhciBuLFxuICAgICAgaSA9IChuIC0gMSkgKiBwLFxuICAgICAgaTAgPSBNYXRoLmZsb29yKGkpLFxuICAgICAgdmFsdWUwID0gbWF4KHF1aWNrc2VsZWN0KHZhbHVlcywgaTApLnN1YmFycmF5KDAsIGkwICsgMSkpLFxuICAgICAgdmFsdWUxID0gbWluKHZhbHVlcy5zdWJhcnJheShpMCArIDEpKTtcbiAgcmV0dXJuIHZhbHVlMCArICh2YWx1ZTEgLSB2YWx1ZTApICogKGkgLSBpMCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBxdWFudGlsZVNvcnRlZCh2YWx1ZXMsIHAsIHZhbHVlb2YgPSBudW1iZXIpIHtcbiAgaWYgKCEobiA9IHZhbHVlcy5sZW5ndGgpIHx8IGlzTmFOKHAgPSArcCkpIHJldHVybjtcbiAgaWYgKHAgPD0gMCB8fCBuIDwgMikgcmV0dXJuICt2YWx1ZW9mKHZhbHVlc1swXSwgMCwgdmFsdWVzKTtcbiAgaWYgKHAgPj0gMSkgcmV0dXJuICt2YWx1ZW9mKHZhbHVlc1tuIC0gMV0sIG4gLSAxLCB2YWx1ZXMpO1xuICB2YXIgbixcbiAgICAgIGkgPSAobiAtIDEpICogcCxcbiAgICAgIGkwID0gTWF0aC5mbG9vcihpKSxcbiAgICAgIHZhbHVlMCA9ICt2YWx1ZW9mKHZhbHVlc1tpMF0sIGkwLCB2YWx1ZXMpLFxuICAgICAgdmFsdWUxID0gK3ZhbHVlb2YodmFsdWVzW2kwICsgMV0sIGkwICsgMSwgdmFsdWVzKTtcbiAgcmV0dXJuIHZhbHVlMCArICh2YWx1ZTEgLSB2YWx1ZTApICogKGkgLSBpMCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBxdWFudGlsZUluZGV4KHZhbHVlcywgcCwgdmFsdWVvZiA9IG51bWJlcikge1xuICBpZiAoaXNOYU4ocCA9ICtwKSkgcmV0dXJuO1xuICBudW1iZXJzID0gRmxvYXQ2NEFycmF5LmZyb20odmFsdWVzLCAoXywgaSkgPT4gbnVtYmVyKHZhbHVlb2YodmFsdWVzW2ldLCBpLCB2YWx1ZXMpKSk7XG4gIGlmIChwIDw9IDApIHJldHVybiBtaW5JbmRleChudW1iZXJzKTtcbiAgaWYgKHAgPj0gMSkgcmV0dXJuIG1heEluZGV4KG51bWJlcnMpO1xuICB2YXIgbnVtYmVycyxcbiAgICAgIGluZGV4ID0gVWludDMyQXJyYXkuZnJvbSh2YWx1ZXMsIChfLCBpKSA9PiBpKSxcbiAgICAgIGogPSBudW1iZXJzLmxlbmd0aCAtIDEsXG4gICAgICBpID0gTWF0aC5mbG9vcihqICogcCk7XG4gIHF1aWNrc2VsZWN0KGluZGV4LCBpLCAwLCBqLCAoaSwgaikgPT4gYXNjZW5kaW5nRGVmaW5lZChudW1iZXJzW2ldLCBudW1iZXJzW2pdKSk7XG4gIGkgPSBncmVhdGVzdChpbmRleC5zdWJhcnJheSgwLCBpICsgMSksIChpKSA9PiBudW1iZXJzW2ldKTtcbiAgcmV0dXJuIGkgPj0gMCA/IGkgOiAtMTtcbn1cbiIsImltcG9ydCB7YXNjZW5kaW5nRGVmaW5lZCwgY29tcGFyZURlZmluZWR9IGZyb20gXCIuL3NvcnQuanNcIjtcblxuLy8gQmFzZWQgb24gaHR0cHM6Ly9naXRodWIuY29tL21vdXJuZXIvcXVpY2tzZWxlY3Rcbi8vIElTQyBsaWNlbnNlLCBDb3B5cmlnaHQgMjAxOCBWbGFkaW1pciBBZ2Fmb25raW4uXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBxdWlja3NlbGVjdChhcnJheSwgaywgbGVmdCA9IDAsIHJpZ2h0ID0gSW5maW5pdHksIGNvbXBhcmUpIHtcbiAgayA9IE1hdGguZmxvb3Ioayk7XG4gIGxlZnQgPSBNYXRoLmZsb29yKE1hdGgubWF4KDAsIGxlZnQpKTtcbiAgcmlnaHQgPSBNYXRoLmZsb29yKE1hdGgubWluKGFycmF5Lmxlbmd0aCAtIDEsIHJpZ2h0KSk7XG5cbiAgaWYgKCEobGVmdCA8PSBrICYmIGsgPD0gcmlnaHQpKSByZXR1cm4gYXJyYXk7XG5cbiAgY29tcGFyZSA9IGNvbXBhcmUgPT09IHVuZGVmaW5lZCA/IGFzY2VuZGluZ0RlZmluZWQgOiBjb21wYXJlRGVmaW5lZChjb21wYXJlKTtcblxuICB3aGlsZSAocmlnaHQgPiBsZWZ0KSB7XG4gICAgaWYgKHJpZ2h0IC0gbGVmdCA+IDYwMCkge1xuICAgICAgY29uc3QgbiA9IHJpZ2h0IC0gbGVmdCArIDE7XG4gICAgICBjb25zdCBtID0gayAtIGxlZnQgKyAxO1xuICAgICAgY29uc3QgeiA9IE1hdGgubG9nKG4pO1xuICAgICAgY29uc3QgcyA9IDAuNSAqIE1hdGguZXhwKDIgKiB6IC8gMyk7XG4gICAgICBjb25zdCBzZCA9IDAuNSAqIE1hdGguc3FydCh6ICogcyAqIChuIC0gcykgLyBuKSAqIChtIC0gbiAvIDIgPCAwID8gLTEgOiAxKTtcbiAgICAgIGNvbnN0IG5ld0xlZnQgPSBNYXRoLm1heChsZWZ0LCBNYXRoLmZsb29yKGsgLSBtICogcyAvIG4gKyBzZCkpO1xuICAgICAgY29uc3QgbmV3UmlnaHQgPSBNYXRoLm1pbihyaWdodCwgTWF0aC5mbG9vcihrICsgKG4gLSBtKSAqIHMgLyBuICsgc2QpKTtcbiAgICAgIHF1aWNrc2VsZWN0KGFycmF5LCBrLCBuZXdMZWZ0LCBuZXdSaWdodCwgY29tcGFyZSk7XG4gICAgfVxuXG4gICAgY29uc3QgdCA9IGFycmF5W2tdO1xuICAgIGxldCBpID0gbGVmdDtcbiAgICBsZXQgaiA9IHJpZ2h0O1xuXG4gICAgc3dhcChhcnJheSwgbGVmdCwgayk7XG4gICAgaWYgKGNvbXBhcmUoYXJyYXlbcmlnaHRdLCB0KSA+IDApIHN3YXAoYXJyYXksIGxlZnQsIHJpZ2h0KTtcblxuICAgIHdoaWxlIChpIDwgaikge1xuICAgICAgc3dhcChhcnJheSwgaSwgaiksICsraSwgLS1qO1xuICAgICAgd2hpbGUgKGNvbXBhcmUoYXJyYXlbaV0sIHQpIDwgMCkgKytpO1xuICAgICAgd2hpbGUgKGNvbXBhcmUoYXJyYXlbal0sIHQpID4gMCkgLS1qO1xuICAgIH1cblxuICAgIGlmIChjb21wYXJlKGFycmF5W2xlZnRdLCB0KSA9PT0gMCkgc3dhcChhcnJheSwgbGVmdCwgaik7XG4gICAgZWxzZSArK2osIHN3YXAoYXJyYXksIGosIHJpZ2h0KTtcblxuICAgIGlmIChqIDw9IGspIGxlZnQgPSBqICsgMTtcbiAgICBpZiAoayA8PSBqKSByaWdodCA9IGogLSAxO1xuICB9XG5cbiAgcmV0dXJuIGFycmF5O1xufVxuXG5mdW5jdGlvbiBzd2FwKGFycmF5LCBpLCBqKSB7XG4gIGNvbnN0IHQgPSBhcnJheVtpXTtcbiAgYXJyYXlbaV0gPSBhcnJheVtqXTtcbiAgYXJyYXlbal0gPSB0O1xufVxuIiwiaW1wb3J0IGFzY2VuZGluZyBmcm9tIFwiLi9hc2NlbmRpbmcuanNcIjtcbmltcG9ydCBwZXJtdXRlIGZyb20gXCIuL3Blcm11dGUuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc29ydCh2YWx1ZXMsIC4uLkYpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZXNbU3ltYm9sLml0ZXJhdG9yXSAhPT0gXCJmdW5jdGlvblwiKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwidmFsdWVzIGlzIG5vdCBpdGVyYWJsZVwiKTtcbiAgdmFsdWVzID0gQXJyYXkuZnJvbSh2YWx1ZXMpO1xuICBsZXQgW2ZdID0gRjtcbiAgaWYgKChmICYmIGYubGVuZ3RoICE9PSAyKSB8fCBGLmxlbmd0aCA+IDEpIHtcbiAgICBjb25zdCBpbmRleCA9IFVpbnQzMkFycmF5LmZyb20odmFsdWVzLCAoZCwgaSkgPT4gaSk7XG4gICAgaWYgKEYubGVuZ3RoID4gMSkge1xuICAgICAgRiA9IEYubWFwKGYgPT4gdmFsdWVzLm1hcChmKSk7XG4gICAgICBpbmRleC5zb3J0KChpLCBqKSA9PiB7XG4gICAgICAgIGZvciAoY29uc3QgZiBvZiBGKSB7XG4gICAgICAgICAgY29uc3QgYyA9IGFzY2VuZGluZ0RlZmluZWQoZltpXSwgZltqXSk7XG4gICAgICAgICAgaWYgKGMpIHJldHVybiBjO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgZiA9IHZhbHVlcy5tYXAoZik7XG4gICAgICBpbmRleC5zb3J0KChpLCBqKSA9PiBhc2NlbmRpbmdEZWZpbmVkKGZbaV0sIGZbal0pKTtcbiAgICB9XG4gICAgcmV0dXJuIHBlcm11dGUodmFsdWVzLCBpbmRleCk7XG4gIH1cbiAgcmV0dXJuIHZhbHVlcy5zb3J0KGNvbXBhcmVEZWZpbmVkKGYpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbXBhcmVEZWZpbmVkKGNvbXBhcmUgPSBhc2NlbmRpbmcpIHtcbiAgaWYgKGNvbXBhcmUgPT09IGFzY2VuZGluZykgcmV0dXJuIGFzY2VuZGluZ0RlZmluZWQ7XG4gIGlmICh0eXBlb2YgY29tcGFyZSAhPT0gXCJmdW5jdGlvblwiKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiY29tcGFyZSBpcyBub3QgYSBmdW5jdGlvblwiKTtcbiAgcmV0dXJuIChhLCBiKSA9PiB7XG4gICAgY29uc3QgeCA9IGNvbXBhcmUoYSwgYik7XG4gICAgaWYgKHggfHwgeCA9PT0gMCkgcmV0dXJuIHg7XG4gICAgcmV0dXJuIChjb21wYXJlKGIsIGIpID09PSAwKSAtIChjb21wYXJlKGEsIGEpID09PSAwKTtcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFzY2VuZGluZ0RlZmluZWQoYSwgYikge1xuICByZXR1cm4gKGEgPT0gbnVsbCB8fCAhKGEgPj0gYSkpIC0gKGIgPT0gbnVsbCB8fCAhKGIgPj0gYikpIHx8IChhIDwgYiA/IC0xIDogYSA+IGIgPyAxIDogMCk7XG59XG4iLCJpbXBvcnQgZGVmaW5lLCB7ZXh0ZW5kfSBmcm9tIFwiLi9kZWZpbmUuanNcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIENvbG9yKCkge31cblxuZXhwb3J0IHZhciBkYXJrZXIgPSAwLjc7XG5leHBvcnQgdmFyIGJyaWdodGVyID0gMSAvIGRhcmtlcjtcblxudmFyIHJlSSA9IFwiXFxcXHMqKFsrLV0/XFxcXGQrKVxcXFxzKlwiLFxuICAgIHJlTiA9IFwiXFxcXHMqKFsrLV0/KD86XFxcXGQqXFxcXC4pP1xcXFxkKyg/OltlRV1bKy1dP1xcXFxkKyk/KVxcXFxzKlwiLFxuICAgIHJlUCA9IFwiXFxcXHMqKFsrLV0/KD86XFxcXGQqXFxcXC4pP1xcXFxkKyg/OltlRV1bKy1dP1xcXFxkKyk/KSVcXFxccypcIixcbiAgICByZUhleCA9IC9eIyhbMC05YS1mXXszLDh9KSQvLFxuICAgIHJlUmdiSW50ZWdlciA9IG5ldyBSZWdFeHAoYF5yZ2JcXFxcKCR7cmVJfSwke3JlSX0sJHtyZUl9XFxcXCkkYCksXG4gICAgcmVSZ2JQZXJjZW50ID0gbmV3IFJlZ0V4cChgXnJnYlxcXFwoJHtyZVB9LCR7cmVQfSwke3JlUH1cXFxcKSRgKSxcbiAgICByZVJnYmFJbnRlZ2VyID0gbmV3IFJlZ0V4cChgXnJnYmFcXFxcKCR7cmVJfSwke3JlSX0sJHtyZUl9LCR7cmVOfVxcXFwpJGApLFxuICAgIHJlUmdiYVBlcmNlbnQgPSBuZXcgUmVnRXhwKGBecmdiYVxcXFwoJHtyZVB9LCR7cmVQfSwke3JlUH0sJHtyZU59XFxcXCkkYCksXG4gICAgcmVIc2xQZXJjZW50ID0gbmV3IFJlZ0V4cChgXmhzbFxcXFwoJHtyZU59LCR7cmVQfSwke3JlUH1cXFxcKSRgKSxcbiAgICByZUhzbGFQZXJjZW50ID0gbmV3IFJlZ0V4cChgXmhzbGFcXFxcKCR7cmVOfSwke3JlUH0sJHtyZVB9LCR7cmVOfVxcXFwpJGApO1xuXG52YXIgbmFtZWQgPSB7XG4gIGFsaWNlYmx1ZTogMHhmMGY4ZmYsXG4gIGFudGlxdWV3aGl0ZTogMHhmYWViZDcsXG4gIGFxdWE6IDB4MDBmZmZmLFxuICBhcXVhbWFyaW5lOiAweDdmZmZkNCxcbiAgYXp1cmU6IDB4ZjBmZmZmLFxuICBiZWlnZTogMHhmNWY1ZGMsXG4gIGJpc3F1ZTogMHhmZmU0YzQsXG4gIGJsYWNrOiAweDAwMDAwMCxcbiAgYmxhbmNoZWRhbG1vbmQ6IDB4ZmZlYmNkLFxuICBibHVlOiAweDAwMDBmZixcbiAgYmx1ZXZpb2xldDogMHg4YTJiZTIsXG4gIGJyb3duOiAweGE1MmEyYSxcbiAgYnVybHl3b29kOiAweGRlYjg4NyxcbiAgY2FkZXRibHVlOiAweDVmOWVhMCxcbiAgY2hhcnRyZXVzZTogMHg3ZmZmMDAsXG4gIGNob2NvbGF0ZTogMHhkMjY5MWUsXG4gIGNvcmFsOiAweGZmN2Y1MCxcbiAgY29ybmZsb3dlcmJsdWU6IDB4NjQ5NWVkLFxuICBjb3Juc2lsazogMHhmZmY4ZGMsXG4gIGNyaW1zb246IDB4ZGMxNDNjLFxuICBjeWFuOiAweDAwZmZmZixcbiAgZGFya2JsdWU6IDB4MDAwMDhiLFxuICBkYXJrY3lhbjogMHgwMDhiOGIsXG4gIGRhcmtnb2xkZW5yb2Q6IDB4Yjg4NjBiLFxuICBkYXJrZ3JheTogMHhhOWE5YTksXG4gIGRhcmtncmVlbjogMHgwMDY0MDAsXG4gIGRhcmtncmV5OiAweGE5YTlhOSxcbiAgZGFya2toYWtpOiAweGJkYjc2YixcbiAgZGFya21hZ2VudGE6IDB4OGIwMDhiLFxuICBkYXJrb2xpdmVncmVlbjogMHg1NTZiMmYsXG4gIGRhcmtvcmFuZ2U6IDB4ZmY4YzAwLFxuICBkYXJrb3JjaGlkOiAweDk5MzJjYyxcbiAgZGFya3JlZDogMHg4YjAwMDAsXG4gIGRhcmtzYWxtb246IDB4ZTk5NjdhLFxuICBkYXJrc2VhZ3JlZW46IDB4OGZiYzhmLFxuICBkYXJrc2xhdGVibHVlOiAweDQ4M2Q4YixcbiAgZGFya3NsYXRlZ3JheTogMHgyZjRmNGYsXG4gIGRhcmtzbGF0ZWdyZXk6IDB4MmY0ZjRmLFxuICBkYXJrdHVycXVvaXNlOiAweDAwY2VkMSxcbiAgZGFya3Zpb2xldDogMHg5NDAwZDMsXG4gIGRlZXBwaW5rOiAweGZmMTQ5MyxcbiAgZGVlcHNreWJsdWU6IDB4MDBiZmZmLFxuICBkaW1ncmF5OiAweDY5Njk2OSxcbiAgZGltZ3JleTogMHg2OTY5NjksXG4gIGRvZGdlcmJsdWU6IDB4MWU5MGZmLFxuICBmaXJlYnJpY2s6IDB4YjIyMjIyLFxuICBmbG9yYWx3aGl0ZTogMHhmZmZhZjAsXG4gIGZvcmVzdGdyZWVuOiAweDIyOGIyMixcbiAgZnVjaHNpYTogMHhmZjAwZmYsXG4gIGdhaW5zYm9ybzogMHhkY2RjZGMsXG4gIGdob3N0d2hpdGU6IDB4ZjhmOGZmLFxuICBnb2xkOiAweGZmZDcwMCxcbiAgZ29sZGVucm9kOiAweGRhYTUyMCxcbiAgZ3JheTogMHg4MDgwODAsXG4gIGdyZWVuOiAweDAwODAwMCxcbiAgZ3JlZW55ZWxsb3c6IDB4YWRmZjJmLFxuICBncmV5OiAweDgwODA4MCxcbiAgaG9uZXlkZXc6IDB4ZjBmZmYwLFxuICBob3RwaW5rOiAweGZmNjliNCxcbiAgaW5kaWFucmVkOiAweGNkNWM1YyxcbiAgaW5kaWdvOiAweDRiMDA4MixcbiAgaXZvcnk6IDB4ZmZmZmYwLFxuICBraGFraTogMHhmMGU2OGMsXG4gIGxhdmVuZGVyOiAweGU2ZTZmYSxcbiAgbGF2ZW5kZXJibHVzaDogMHhmZmYwZjUsXG4gIGxhd25ncmVlbjogMHg3Y2ZjMDAsXG4gIGxlbW9uY2hpZmZvbjogMHhmZmZhY2QsXG4gIGxpZ2h0Ymx1ZTogMHhhZGQ4ZTYsXG4gIGxpZ2h0Y29yYWw6IDB4ZjA4MDgwLFxuICBsaWdodGN5YW46IDB4ZTBmZmZmLFxuICBsaWdodGdvbGRlbnJvZHllbGxvdzogMHhmYWZhZDIsXG4gIGxpZ2h0Z3JheTogMHhkM2QzZDMsXG4gIGxpZ2h0Z3JlZW46IDB4OTBlZTkwLFxuICBsaWdodGdyZXk6IDB4ZDNkM2QzLFxuICBsaWdodHBpbms6IDB4ZmZiNmMxLFxuICBsaWdodHNhbG1vbjogMHhmZmEwN2EsXG4gIGxpZ2h0c2VhZ3JlZW46IDB4MjBiMmFhLFxuICBsaWdodHNreWJsdWU6IDB4ODdjZWZhLFxuICBsaWdodHNsYXRlZ3JheTogMHg3Nzg4OTksXG4gIGxpZ2h0c2xhdGVncmV5OiAweDc3ODg5OSxcbiAgbGlnaHRzdGVlbGJsdWU6IDB4YjBjNGRlLFxuICBsaWdodHllbGxvdzogMHhmZmZmZTAsXG4gIGxpbWU6IDB4MDBmZjAwLFxuICBsaW1lZ3JlZW46IDB4MzJjZDMyLFxuICBsaW5lbjogMHhmYWYwZTYsXG4gIG1hZ2VudGE6IDB4ZmYwMGZmLFxuICBtYXJvb246IDB4ODAwMDAwLFxuICBtZWRpdW1hcXVhbWFyaW5lOiAweDY2Y2RhYSxcbiAgbWVkaXVtYmx1ZTogMHgwMDAwY2QsXG4gIG1lZGl1bW9yY2hpZDogMHhiYTU1ZDMsXG4gIG1lZGl1bXB1cnBsZTogMHg5MzcwZGIsXG4gIG1lZGl1bXNlYWdyZWVuOiAweDNjYjM3MSxcbiAgbWVkaXVtc2xhdGVibHVlOiAweDdiNjhlZSxcbiAgbWVkaXVtc3ByaW5nZ3JlZW46IDB4MDBmYTlhLFxuICBtZWRpdW10dXJxdW9pc2U6IDB4NDhkMWNjLFxuICBtZWRpdW12aW9sZXRyZWQ6IDB4YzcxNTg1LFxuICBtaWRuaWdodGJsdWU6IDB4MTkxOTcwLFxuICBtaW50Y3JlYW06IDB4ZjVmZmZhLFxuICBtaXN0eXJvc2U6IDB4ZmZlNGUxLFxuICBtb2NjYXNpbjogMHhmZmU0YjUsXG4gIG5hdmFqb3doaXRlOiAweGZmZGVhZCxcbiAgbmF2eTogMHgwMDAwODAsXG4gIG9sZGxhY2U6IDB4ZmRmNWU2LFxuICBvbGl2ZTogMHg4MDgwMDAsXG4gIG9saXZlZHJhYjogMHg2YjhlMjMsXG4gIG9yYW5nZTogMHhmZmE1MDAsXG4gIG9yYW5nZXJlZDogMHhmZjQ1MDAsXG4gIG9yY2hpZDogMHhkYTcwZDYsXG4gIHBhbGVnb2xkZW5yb2Q6IDB4ZWVlOGFhLFxuICBwYWxlZ3JlZW46IDB4OThmYjk4LFxuICBwYWxldHVycXVvaXNlOiAweGFmZWVlZSxcbiAgcGFsZXZpb2xldHJlZDogMHhkYjcwOTMsXG4gIHBhcGF5YXdoaXA6IDB4ZmZlZmQ1LFxuICBwZWFjaHB1ZmY6IDB4ZmZkYWI5LFxuICBwZXJ1OiAweGNkODUzZixcbiAgcGluazogMHhmZmMwY2IsXG4gIHBsdW06IDB4ZGRhMGRkLFxuICBwb3dkZXJibHVlOiAweGIwZTBlNixcbiAgcHVycGxlOiAweDgwMDA4MCxcbiAgcmViZWNjYXB1cnBsZTogMHg2NjMzOTksXG4gIHJlZDogMHhmZjAwMDAsXG4gIHJvc3licm93bjogMHhiYzhmOGYsXG4gIHJveWFsYmx1ZTogMHg0MTY5ZTEsXG4gIHNhZGRsZWJyb3duOiAweDhiNDUxMyxcbiAgc2FsbW9uOiAweGZhODA3MixcbiAgc2FuZHlicm93bjogMHhmNGE0NjAsXG4gIHNlYWdyZWVuOiAweDJlOGI1NyxcbiAgc2Vhc2hlbGw6IDB4ZmZmNWVlLFxuICBzaWVubmE6IDB4YTA1MjJkLFxuICBzaWx2ZXI6IDB4YzBjMGMwLFxuICBza3libHVlOiAweDg3Y2VlYixcbiAgc2xhdGVibHVlOiAweDZhNWFjZCxcbiAgc2xhdGVncmF5OiAweDcwODA5MCxcbiAgc2xhdGVncmV5OiAweDcwODA5MCxcbiAgc25vdzogMHhmZmZhZmEsXG4gIHNwcmluZ2dyZWVuOiAweDAwZmY3ZixcbiAgc3RlZWxibHVlOiAweDQ2ODJiNCxcbiAgdGFuOiAweGQyYjQ4YyxcbiAgdGVhbDogMHgwMDgwODAsXG4gIHRoaXN0bGU6IDB4ZDhiZmQ4LFxuICB0b21hdG86IDB4ZmY2MzQ3LFxuICB0dXJxdW9pc2U6IDB4NDBlMGQwLFxuICB2aW9sZXQ6IDB4ZWU4MmVlLFxuICB3aGVhdDogMHhmNWRlYjMsXG4gIHdoaXRlOiAweGZmZmZmZixcbiAgd2hpdGVzbW9rZTogMHhmNWY1ZjUsXG4gIHllbGxvdzogMHhmZmZmMDAsXG4gIHllbGxvd2dyZWVuOiAweDlhY2QzMlxufTtcblxuZGVmaW5lKENvbG9yLCBjb2xvciwge1xuICBjb3B5KGNoYW5uZWxzKSB7XG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24obmV3IHRoaXMuY29uc3RydWN0b3IsIHRoaXMsIGNoYW5uZWxzKTtcbiAgfSxcbiAgZGlzcGxheWFibGUoKSB7XG4gICAgcmV0dXJuIHRoaXMucmdiKCkuZGlzcGxheWFibGUoKTtcbiAgfSxcbiAgaGV4OiBjb2xvcl9mb3JtYXRIZXgsIC8vIERlcHJlY2F0ZWQhIFVzZSBjb2xvci5mb3JtYXRIZXguXG4gIGZvcm1hdEhleDogY29sb3JfZm9ybWF0SGV4LFxuICBmb3JtYXRIZXg4OiBjb2xvcl9mb3JtYXRIZXg4LFxuICBmb3JtYXRIc2w6IGNvbG9yX2Zvcm1hdEhzbCxcbiAgZm9ybWF0UmdiOiBjb2xvcl9mb3JtYXRSZ2IsXG4gIHRvU3RyaW5nOiBjb2xvcl9mb3JtYXRSZ2Jcbn0pO1xuXG5mdW5jdGlvbiBjb2xvcl9mb3JtYXRIZXgoKSB7XG4gIHJldHVybiB0aGlzLnJnYigpLmZvcm1hdEhleCgpO1xufVxuXG5mdW5jdGlvbiBjb2xvcl9mb3JtYXRIZXg4KCkge1xuICByZXR1cm4gdGhpcy5yZ2IoKS5mb3JtYXRIZXg4KCk7XG59XG5cbmZ1bmN0aW9uIGNvbG9yX2Zvcm1hdEhzbCgpIHtcbiAgcmV0dXJuIGhzbENvbnZlcnQodGhpcykuZm9ybWF0SHNsKCk7XG59XG5cbmZ1bmN0aW9uIGNvbG9yX2Zvcm1hdFJnYigpIHtcbiAgcmV0dXJuIHRoaXMucmdiKCkuZm9ybWF0UmdiKCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbG9yKGZvcm1hdCkge1xuICB2YXIgbSwgbDtcbiAgZm9ybWF0ID0gKGZvcm1hdCArIFwiXCIpLnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xuICByZXR1cm4gKG0gPSByZUhleC5leGVjKGZvcm1hdCkpID8gKGwgPSBtWzFdLmxlbmd0aCwgbSA9IHBhcnNlSW50KG1bMV0sIDE2KSwgbCA9PT0gNiA/IHJnYm4obSkgLy8gI2ZmMDAwMFxuICAgICAgOiBsID09PSAzID8gbmV3IFJnYigobSA+PiA4ICYgMHhmKSB8IChtID4+IDQgJiAweGYwKSwgKG0gPj4gNCAmIDB4ZikgfCAobSAmIDB4ZjApLCAoKG0gJiAweGYpIDw8IDQpIHwgKG0gJiAweGYpLCAxKSAvLyAjZjAwXG4gICAgICA6IGwgPT09IDggPyByZ2JhKG0gPj4gMjQgJiAweGZmLCBtID4+IDE2ICYgMHhmZiwgbSA+PiA4ICYgMHhmZiwgKG0gJiAweGZmKSAvIDB4ZmYpIC8vICNmZjAwMDAwMFxuICAgICAgOiBsID09PSA0ID8gcmdiYSgobSA+PiAxMiAmIDB4ZikgfCAobSA+PiA4ICYgMHhmMCksIChtID4+IDggJiAweGYpIHwgKG0gPj4gNCAmIDB4ZjApLCAobSA+PiA0ICYgMHhmKSB8IChtICYgMHhmMCksICgoKG0gJiAweGYpIDw8IDQpIHwgKG0gJiAweGYpKSAvIDB4ZmYpIC8vICNmMDAwXG4gICAgICA6IG51bGwpIC8vIGludmFsaWQgaGV4XG4gICAgICA6IChtID0gcmVSZ2JJbnRlZ2VyLmV4ZWMoZm9ybWF0KSkgPyBuZXcgUmdiKG1bMV0sIG1bMl0sIG1bM10sIDEpIC8vIHJnYigyNTUsIDAsIDApXG4gICAgICA6IChtID0gcmVSZ2JQZXJjZW50LmV4ZWMoZm9ybWF0KSkgPyBuZXcgUmdiKG1bMV0gKiAyNTUgLyAxMDAsIG1bMl0gKiAyNTUgLyAxMDAsIG1bM10gKiAyNTUgLyAxMDAsIDEpIC8vIHJnYigxMDAlLCAwJSwgMCUpXG4gICAgICA6IChtID0gcmVSZ2JhSW50ZWdlci5leGVjKGZvcm1hdCkpID8gcmdiYShtWzFdLCBtWzJdLCBtWzNdLCBtWzRdKSAvLyByZ2JhKDI1NSwgMCwgMCwgMSlcbiAgICAgIDogKG0gPSByZVJnYmFQZXJjZW50LmV4ZWMoZm9ybWF0KSkgPyByZ2JhKG1bMV0gKiAyNTUgLyAxMDAsIG1bMl0gKiAyNTUgLyAxMDAsIG1bM10gKiAyNTUgLyAxMDAsIG1bNF0pIC8vIHJnYigxMDAlLCAwJSwgMCUsIDEpXG4gICAgICA6IChtID0gcmVIc2xQZXJjZW50LmV4ZWMoZm9ybWF0KSkgPyBoc2xhKG1bMV0sIG1bMl0gLyAxMDAsIG1bM10gLyAxMDAsIDEpIC8vIGhzbCgxMjAsIDUwJSwgNTAlKVxuICAgICAgOiAobSA9IHJlSHNsYVBlcmNlbnQuZXhlYyhmb3JtYXQpKSA/IGhzbGEobVsxXSwgbVsyXSAvIDEwMCwgbVszXSAvIDEwMCwgbVs0XSkgLy8gaHNsYSgxMjAsIDUwJSwgNTAlLCAxKVxuICAgICAgOiBuYW1lZC5oYXNPd25Qcm9wZXJ0eShmb3JtYXQpID8gcmdibihuYW1lZFtmb3JtYXRdKSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXByb3RvdHlwZS1idWlsdGluc1xuICAgICAgOiBmb3JtYXQgPT09IFwidHJhbnNwYXJlbnRcIiA/IG5ldyBSZ2IoTmFOLCBOYU4sIE5hTiwgMClcbiAgICAgIDogbnVsbDtcbn1cblxuZnVuY3Rpb24gcmdibihuKSB7XG4gIHJldHVybiBuZXcgUmdiKG4gPj4gMTYgJiAweGZmLCBuID4+IDggJiAweGZmLCBuICYgMHhmZiwgMSk7XG59XG5cbmZ1bmN0aW9uIHJnYmEociwgZywgYiwgYSkge1xuICBpZiAoYSA8PSAwKSByID0gZyA9IGIgPSBOYU47XG4gIHJldHVybiBuZXcgUmdiKHIsIGcsIGIsIGEpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmdiQ29udmVydChvKSB7XG4gIGlmICghKG8gaW5zdGFuY2VvZiBDb2xvcikpIG8gPSBjb2xvcihvKTtcbiAgaWYgKCFvKSByZXR1cm4gbmV3IFJnYjtcbiAgbyA9IG8ucmdiKCk7XG4gIHJldHVybiBuZXcgUmdiKG8uciwgby5nLCBvLmIsIG8ub3BhY2l0eSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZ2IociwgZywgYiwgb3BhY2l0eSkge1xuICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA9PT0gMSA/IHJnYkNvbnZlcnQocikgOiBuZXcgUmdiKHIsIGcsIGIsIG9wYWNpdHkgPT0gbnVsbCA/IDEgOiBvcGFjaXR5KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFJnYihyLCBnLCBiLCBvcGFjaXR5KSB7XG4gIHRoaXMuciA9ICtyO1xuICB0aGlzLmcgPSArZztcbiAgdGhpcy5iID0gK2I7XG4gIHRoaXMub3BhY2l0eSA9ICtvcGFjaXR5O1xufVxuXG5kZWZpbmUoUmdiLCByZ2IsIGV4dGVuZChDb2xvciwge1xuICBicmlnaHRlcihrKSB7XG4gICAgayA9IGsgPT0gbnVsbCA/IGJyaWdodGVyIDogTWF0aC5wb3coYnJpZ2h0ZXIsIGspO1xuICAgIHJldHVybiBuZXcgUmdiKHRoaXMuciAqIGssIHRoaXMuZyAqIGssIHRoaXMuYiAqIGssIHRoaXMub3BhY2l0eSk7XG4gIH0sXG4gIGRhcmtlcihrKSB7XG4gICAgayA9IGsgPT0gbnVsbCA/IGRhcmtlciA6IE1hdGgucG93KGRhcmtlciwgayk7XG4gICAgcmV0dXJuIG5ldyBSZ2IodGhpcy5yICogaywgdGhpcy5nICogaywgdGhpcy5iICogaywgdGhpcy5vcGFjaXR5KTtcbiAgfSxcbiAgcmdiKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuICBjbGFtcCgpIHtcbiAgICByZXR1cm4gbmV3IFJnYihjbGFtcGkodGhpcy5yKSwgY2xhbXBpKHRoaXMuZyksIGNsYW1waSh0aGlzLmIpLCBjbGFtcGEodGhpcy5vcGFjaXR5KSk7XG4gIH0sXG4gIGRpc3BsYXlhYmxlKCkge1xuICAgIHJldHVybiAoLTAuNSA8PSB0aGlzLnIgJiYgdGhpcy5yIDwgMjU1LjUpXG4gICAgICAgICYmICgtMC41IDw9IHRoaXMuZyAmJiB0aGlzLmcgPCAyNTUuNSlcbiAgICAgICAgJiYgKC0wLjUgPD0gdGhpcy5iICYmIHRoaXMuYiA8IDI1NS41KVxuICAgICAgICAmJiAoMCA8PSB0aGlzLm9wYWNpdHkgJiYgdGhpcy5vcGFjaXR5IDw9IDEpO1xuICB9LFxuICBoZXg6IHJnYl9mb3JtYXRIZXgsIC8vIERlcHJlY2F0ZWQhIFVzZSBjb2xvci5mb3JtYXRIZXguXG4gIGZvcm1hdEhleDogcmdiX2Zvcm1hdEhleCxcbiAgZm9ybWF0SGV4ODogcmdiX2Zvcm1hdEhleDgsXG4gIGZvcm1hdFJnYjogcmdiX2Zvcm1hdFJnYixcbiAgdG9TdHJpbmc6IHJnYl9mb3JtYXRSZ2Jcbn0pKTtcblxuZnVuY3Rpb24gcmdiX2Zvcm1hdEhleCgpIHtcbiAgcmV0dXJuIGAjJHtoZXgodGhpcy5yKX0ke2hleCh0aGlzLmcpfSR7aGV4KHRoaXMuYil9YDtcbn1cblxuZnVuY3Rpb24gcmdiX2Zvcm1hdEhleDgoKSB7XG4gIHJldHVybiBgIyR7aGV4KHRoaXMucil9JHtoZXgodGhpcy5nKX0ke2hleCh0aGlzLmIpfSR7aGV4KChpc05hTih0aGlzLm9wYWNpdHkpID8gMSA6IHRoaXMub3BhY2l0eSkgKiAyNTUpfWA7XG59XG5cbmZ1bmN0aW9uIHJnYl9mb3JtYXRSZ2IoKSB7XG4gIGNvbnN0IGEgPSBjbGFtcGEodGhpcy5vcGFjaXR5KTtcbiAgcmV0dXJuIGAke2EgPT09IDEgPyBcInJnYihcIiA6IFwicmdiYShcIn0ke2NsYW1waSh0aGlzLnIpfSwgJHtjbGFtcGkodGhpcy5nKX0sICR7Y2xhbXBpKHRoaXMuYil9JHthID09PSAxID8gXCIpXCIgOiBgLCAke2F9KWB9YDtcbn1cblxuZnVuY3Rpb24gY2xhbXBhKG9wYWNpdHkpIHtcbiAgcmV0dXJuIGlzTmFOKG9wYWNpdHkpID8gMSA6IE1hdGgubWF4KDAsIE1hdGgubWluKDEsIG9wYWNpdHkpKTtcbn1cblxuZnVuY3Rpb24gY2xhbXBpKHZhbHVlKSB7XG4gIHJldHVybiBNYXRoLm1heCgwLCBNYXRoLm1pbigyNTUsIE1hdGgucm91bmQodmFsdWUpIHx8IDApKTtcbn1cblxuZnVuY3Rpb24gaGV4KHZhbHVlKSB7XG4gIHZhbHVlID0gY2xhbXBpKHZhbHVlKTtcbiAgcmV0dXJuICh2YWx1ZSA8IDE2ID8gXCIwXCIgOiBcIlwiKSArIHZhbHVlLnRvU3RyaW5nKDE2KTtcbn1cblxuZnVuY3Rpb24gaHNsYShoLCBzLCBsLCBhKSB7XG4gIGlmIChhIDw9IDApIGggPSBzID0gbCA9IE5hTjtcbiAgZWxzZSBpZiAobCA8PSAwIHx8IGwgPj0gMSkgaCA9IHMgPSBOYU47XG4gIGVsc2UgaWYgKHMgPD0gMCkgaCA9IE5hTjtcbiAgcmV0dXJuIG5ldyBIc2woaCwgcywgbCwgYSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBoc2xDb252ZXJ0KG8pIHtcbiAgaWYgKG8gaW5zdGFuY2VvZiBIc2wpIHJldHVybiBuZXcgSHNsKG8uaCwgby5zLCBvLmwsIG8ub3BhY2l0eSk7XG4gIGlmICghKG8gaW5zdGFuY2VvZiBDb2xvcikpIG8gPSBjb2xvcihvKTtcbiAgaWYgKCFvKSByZXR1cm4gbmV3IEhzbDtcbiAgaWYgKG8gaW5zdGFuY2VvZiBIc2wpIHJldHVybiBvO1xuICBvID0gby5yZ2IoKTtcbiAgdmFyIHIgPSBvLnIgLyAyNTUsXG4gICAgICBnID0gby5nIC8gMjU1LFxuICAgICAgYiA9IG8uYiAvIDI1NSxcbiAgICAgIG1pbiA9IE1hdGgubWluKHIsIGcsIGIpLFxuICAgICAgbWF4ID0gTWF0aC5tYXgociwgZywgYiksXG4gICAgICBoID0gTmFOLFxuICAgICAgcyA9IG1heCAtIG1pbixcbiAgICAgIGwgPSAobWF4ICsgbWluKSAvIDI7XG4gIGlmIChzKSB7XG4gICAgaWYgKHIgPT09IG1heCkgaCA9IChnIC0gYikgLyBzICsgKGcgPCBiKSAqIDY7XG4gICAgZWxzZSBpZiAoZyA9PT0gbWF4KSBoID0gKGIgLSByKSAvIHMgKyAyO1xuICAgIGVsc2UgaCA9IChyIC0gZykgLyBzICsgNDtcbiAgICBzIC89IGwgPCAwLjUgPyBtYXggKyBtaW4gOiAyIC0gbWF4IC0gbWluO1xuICAgIGggKj0gNjA7XG4gIH0gZWxzZSB7XG4gICAgcyA9IGwgPiAwICYmIGwgPCAxID8gMCA6IGg7XG4gIH1cbiAgcmV0dXJuIG5ldyBIc2woaCwgcywgbCwgby5vcGFjaXR5KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGhzbChoLCBzLCBsLCBvcGFjaXR5KSB7XG4gIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID09PSAxID8gaHNsQ29udmVydChoKSA6IG5ldyBIc2woaCwgcywgbCwgb3BhY2l0eSA9PSBudWxsID8gMSA6IG9wYWNpdHkpO1xufVxuXG5mdW5jdGlvbiBIc2woaCwgcywgbCwgb3BhY2l0eSkge1xuICB0aGlzLmggPSAraDtcbiAgdGhpcy5zID0gK3M7XG4gIHRoaXMubCA9ICtsO1xuICB0aGlzLm9wYWNpdHkgPSArb3BhY2l0eTtcbn1cblxuZGVmaW5lKEhzbCwgaHNsLCBleHRlbmQoQ29sb3IsIHtcbiAgYnJpZ2h0ZXIoaykge1xuICAgIGsgPSBrID09IG51bGwgPyBicmlnaHRlciA6IE1hdGgucG93KGJyaWdodGVyLCBrKTtcbiAgICByZXR1cm4gbmV3IEhzbCh0aGlzLmgsIHRoaXMucywgdGhpcy5sICogaywgdGhpcy5vcGFjaXR5KTtcbiAgfSxcbiAgZGFya2VyKGspIHtcbiAgICBrID0gayA9PSBudWxsID8gZGFya2VyIDogTWF0aC5wb3coZGFya2VyLCBrKTtcbiAgICByZXR1cm4gbmV3IEhzbCh0aGlzLmgsIHRoaXMucywgdGhpcy5sICogaywgdGhpcy5vcGFjaXR5KTtcbiAgfSxcbiAgcmdiKCkge1xuICAgIHZhciBoID0gdGhpcy5oICUgMzYwICsgKHRoaXMuaCA8IDApICogMzYwLFxuICAgICAgICBzID0gaXNOYU4oaCkgfHwgaXNOYU4odGhpcy5zKSA/IDAgOiB0aGlzLnMsXG4gICAgICAgIGwgPSB0aGlzLmwsXG4gICAgICAgIG0yID0gbCArIChsIDwgMC41ID8gbCA6IDEgLSBsKSAqIHMsXG4gICAgICAgIG0xID0gMiAqIGwgLSBtMjtcbiAgICByZXR1cm4gbmV3IFJnYihcbiAgICAgIGhzbDJyZ2IoaCA+PSAyNDAgPyBoIC0gMjQwIDogaCArIDEyMCwgbTEsIG0yKSxcbiAgICAgIGhzbDJyZ2IoaCwgbTEsIG0yKSxcbiAgICAgIGhzbDJyZ2IoaCA8IDEyMCA/IGggKyAyNDAgOiBoIC0gMTIwLCBtMSwgbTIpLFxuICAgICAgdGhpcy5vcGFjaXR5XG4gICAgKTtcbiAgfSxcbiAgY2xhbXAoKSB7XG4gICAgcmV0dXJuIG5ldyBIc2woY2xhbXBoKHRoaXMuaCksIGNsYW1wdCh0aGlzLnMpLCBjbGFtcHQodGhpcy5sKSwgY2xhbXBhKHRoaXMub3BhY2l0eSkpO1xuICB9LFxuICBkaXNwbGF5YWJsZSgpIHtcbiAgICByZXR1cm4gKDAgPD0gdGhpcy5zICYmIHRoaXMucyA8PSAxIHx8IGlzTmFOKHRoaXMucykpXG4gICAgICAgICYmICgwIDw9IHRoaXMubCAmJiB0aGlzLmwgPD0gMSlcbiAgICAgICAgJiYgKDAgPD0gdGhpcy5vcGFjaXR5ICYmIHRoaXMub3BhY2l0eSA8PSAxKTtcbiAgfSxcbiAgZm9ybWF0SHNsKCkge1xuICAgIGNvbnN0IGEgPSBjbGFtcGEodGhpcy5vcGFjaXR5KTtcbiAgICByZXR1cm4gYCR7YSA9PT0gMSA/IFwiaHNsKFwiIDogXCJoc2xhKFwifSR7Y2xhbXBoKHRoaXMuaCl9LCAke2NsYW1wdCh0aGlzLnMpICogMTAwfSUsICR7Y2xhbXB0KHRoaXMubCkgKiAxMDB9JSR7YSA9PT0gMSA/IFwiKVwiIDogYCwgJHthfSlgfWA7XG4gIH1cbn0pKTtcblxuZnVuY3Rpb24gY2xhbXBoKHZhbHVlKSB7XG4gIHZhbHVlID0gKHZhbHVlIHx8IDApICUgMzYwO1xuICByZXR1cm4gdmFsdWUgPCAwID8gdmFsdWUgKyAzNjAgOiB2YWx1ZTtcbn1cblxuZnVuY3Rpb24gY2xhbXB0KHZhbHVlKSB7XG4gIHJldHVybiBNYXRoLm1heCgwLCBNYXRoLm1pbigxLCB2YWx1ZSB8fCAwKSk7XG59XG5cbi8qIEZyb20gRnZEIDEzLjM3LCBDU1MgQ29sb3IgTW9kdWxlIExldmVsIDMgKi9cbmZ1bmN0aW9uIGhzbDJyZ2IoaCwgbTEsIG0yKSB7XG4gIHJldHVybiAoaCA8IDYwID8gbTEgKyAobTIgLSBtMSkgKiBoIC8gNjBcbiAgICAgIDogaCA8IDE4MCA/IG0yXG4gICAgICA6IGggPCAyNDAgPyBtMSArIChtMiAtIG0xKSAqICgyNDAgLSBoKSAvIDYwXG4gICAgICA6IG0xKSAqIDI1NTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGNvbnN0cnVjdG9yLCBmYWN0b3J5LCBwcm90b3R5cGUpIHtcbiAgY29uc3RydWN0b3IucHJvdG90eXBlID0gZmFjdG9yeS5wcm90b3R5cGUgPSBwcm90b3R5cGU7XG4gIHByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IGNvbnN0cnVjdG9yO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZXh0ZW5kKHBhcmVudCwgZGVmaW5pdGlvbikge1xuICB2YXIgcHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShwYXJlbnQucHJvdG90eXBlKTtcbiAgZm9yICh2YXIga2V5IGluIGRlZmluaXRpb24pIHByb3RvdHlwZVtrZXldID0gZGVmaW5pdGlvbltrZXldO1xuICByZXR1cm4gcHJvdG90eXBlO1xufVxuIiwiaW1wb3J0IGRzdiBmcm9tIFwiLi9kc3YuanNcIjtcblxudmFyIGNzdiA9IGRzdihcIixcIik7XG5cbmV4cG9ydCB2YXIgY3N2UGFyc2UgPSBjc3YucGFyc2U7XG5leHBvcnQgdmFyIGNzdlBhcnNlUm93cyA9IGNzdi5wYXJzZVJvd3M7XG5leHBvcnQgdmFyIGNzdkZvcm1hdCA9IGNzdi5mb3JtYXQ7XG5leHBvcnQgdmFyIGNzdkZvcm1hdEJvZHkgPSBjc3YuZm9ybWF0Qm9keTtcbmV4cG9ydCB2YXIgY3N2Rm9ybWF0Um93cyA9IGNzdi5mb3JtYXRSb3dzO1xuZXhwb3J0IHZhciBjc3ZGb3JtYXRSb3cgPSBjc3YuZm9ybWF0Um93O1xuZXhwb3J0IHZhciBjc3ZGb3JtYXRWYWx1ZSA9IGNzdi5mb3JtYXRWYWx1ZTtcbiIsInZhciBFT0wgPSB7fSxcbiAgICBFT0YgPSB7fSxcbiAgICBRVU9URSA9IDM0LFxuICAgIE5FV0xJTkUgPSAxMCxcbiAgICBSRVRVUk4gPSAxMztcblxuZnVuY3Rpb24gb2JqZWN0Q29udmVydGVyKGNvbHVtbnMpIHtcbiAgcmV0dXJuIG5ldyBGdW5jdGlvbihcImRcIiwgXCJyZXR1cm4ge1wiICsgY29sdW1ucy5tYXAoZnVuY3Rpb24obmFtZSwgaSkge1xuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShuYW1lKSArIFwiOiBkW1wiICsgaSArIFwiXSB8fCBcXFwiXFxcIlwiO1xuICB9KS5qb2luKFwiLFwiKSArIFwifVwiKTtcbn1cblxuZnVuY3Rpb24gY3VzdG9tQ29udmVydGVyKGNvbHVtbnMsIGYpIHtcbiAgdmFyIG9iamVjdCA9IG9iamVjdENvbnZlcnRlcihjb2x1bW5zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uKHJvdywgaSkge1xuICAgIHJldHVybiBmKG9iamVjdChyb3cpLCBpLCBjb2x1bW5zKTtcbiAgfTtcbn1cblxuLy8gQ29tcHV0ZSB1bmlxdWUgY29sdW1ucyBpbiBvcmRlciBvZiBkaXNjb3ZlcnkuXG5mdW5jdGlvbiBpbmZlckNvbHVtbnMocm93cykge1xuICB2YXIgY29sdW1uU2V0ID0gT2JqZWN0LmNyZWF0ZShudWxsKSxcbiAgICAgIGNvbHVtbnMgPSBbXTtcblxuICByb3dzLmZvckVhY2goZnVuY3Rpb24ocm93KSB7XG4gICAgZm9yICh2YXIgY29sdW1uIGluIHJvdykge1xuICAgICAgaWYgKCEoY29sdW1uIGluIGNvbHVtblNldCkpIHtcbiAgICAgICAgY29sdW1ucy5wdXNoKGNvbHVtblNldFtjb2x1bW5dID0gY29sdW1uKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBjb2x1bW5zO1xufVxuXG5mdW5jdGlvbiBwYWQodmFsdWUsIHdpZHRoKSB7XG4gIHZhciBzID0gdmFsdWUgKyBcIlwiLCBsZW5ndGggPSBzLmxlbmd0aDtcbiAgcmV0dXJuIGxlbmd0aCA8IHdpZHRoID8gbmV3IEFycmF5KHdpZHRoIC0gbGVuZ3RoICsgMSkuam9pbigwKSArIHMgOiBzO1xufVxuXG5mdW5jdGlvbiBmb3JtYXRZZWFyKHllYXIpIHtcbiAgcmV0dXJuIHllYXIgPCAwID8gXCItXCIgKyBwYWQoLXllYXIsIDYpXG4gICAgOiB5ZWFyID4gOTk5OSA/IFwiK1wiICsgcGFkKHllYXIsIDYpXG4gICAgOiBwYWQoeWVhciwgNCk7XG59XG5cbmZ1bmN0aW9uIGZvcm1hdERhdGUoZGF0ZSkge1xuICB2YXIgaG91cnMgPSBkYXRlLmdldFVUQ0hvdXJzKCksXG4gICAgICBtaW51dGVzID0gZGF0ZS5nZXRVVENNaW51dGVzKCksXG4gICAgICBzZWNvbmRzID0gZGF0ZS5nZXRVVENTZWNvbmRzKCksXG4gICAgICBtaWxsaXNlY29uZHMgPSBkYXRlLmdldFVUQ01pbGxpc2Vjb25kcygpO1xuICByZXR1cm4gaXNOYU4oZGF0ZSkgPyBcIkludmFsaWQgRGF0ZVwiXG4gICAgICA6IGZvcm1hdFllYXIoZGF0ZS5nZXRVVENGdWxsWWVhcigpLCA0KSArIFwiLVwiICsgcGFkKGRhdGUuZ2V0VVRDTW9udGgoKSArIDEsIDIpICsgXCItXCIgKyBwYWQoZGF0ZS5nZXRVVENEYXRlKCksIDIpXG4gICAgICArIChtaWxsaXNlY29uZHMgPyBcIlRcIiArIHBhZChob3VycywgMikgKyBcIjpcIiArIHBhZChtaW51dGVzLCAyKSArIFwiOlwiICsgcGFkKHNlY29uZHMsIDIpICsgXCIuXCIgKyBwYWQobWlsbGlzZWNvbmRzLCAzKSArIFwiWlwiXG4gICAgICA6IHNlY29uZHMgPyBcIlRcIiArIHBhZChob3VycywgMikgKyBcIjpcIiArIHBhZChtaW51dGVzLCAyKSArIFwiOlwiICsgcGFkKHNlY29uZHMsIDIpICsgXCJaXCJcbiAgICAgIDogbWludXRlcyB8fCBob3VycyA/IFwiVFwiICsgcGFkKGhvdXJzLCAyKSArIFwiOlwiICsgcGFkKG1pbnV0ZXMsIDIpICsgXCJaXCJcbiAgICAgIDogXCJcIik7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGRlbGltaXRlcikge1xuICB2YXIgcmVGb3JtYXQgPSBuZXcgUmVnRXhwKFwiW1xcXCJcIiArIGRlbGltaXRlciArIFwiXFxuXFxyXVwiKSxcbiAgICAgIERFTElNSVRFUiA9IGRlbGltaXRlci5jaGFyQ29kZUF0KDApO1xuXG4gIGZ1bmN0aW9uIHBhcnNlKHRleHQsIGYpIHtcbiAgICB2YXIgY29udmVydCwgY29sdW1ucywgcm93cyA9IHBhcnNlUm93cyh0ZXh0LCBmdW5jdGlvbihyb3csIGkpIHtcbiAgICAgIGlmIChjb252ZXJ0KSByZXR1cm4gY29udmVydChyb3csIGkgLSAxKTtcbiAgICAgIGNvbHVtbnMgPSByb3csIGNvbnZlcnQgPSBmID8gY3VzdG9tQ29udmVydGVyKHJvdywgZikgOiBvYmplY3RDb252ZXJ0ZXIocm93KTtcbiAgICB9KTtcbiAgICByb3dzLmNvbHVtbnMgPSBjb2x1bW5zIHx8IFtdO1xuICAgIHJldHVybiByb3dzO1xuICB9XG5cbiAgZnVuY3Rpb24gcGFyc2VSb3dzKHRleHQsIGYpIHtcbiAgICB2YXIgcm93cyA9IFtdLCAvLyBvdXRwdXQgcm93c1xuICAgICAgICBOID0gdGV4dC5sZW5ndGgsXG4gICAgICAgIEkgPSAwLCAvLyBjdXJyZW50IGNoYXJhY3RlciBpbmRleFxuICAgICAgICBuID0gMCwgLy8gY3VycmVudCBsaW5lIG51bWJlclxuICAgICAgICB0LCAvLyBjdXJyZW50IHRva2VuXG4gICAgICAgIGVvZiA9IE4gPD0gMCwgLy8gY3VycmVudCB0b2tlbiBmb2xsb3dlZCBieSBFT0Y/XG4gICAgICAgIGVvbCA9IGZhbHNlOyAvLyBjdXJyZW50IHRva2VuIGZvbGxvd2VkIGJ5IEVPTD9cblxuICAgIC8vIFN0cmlwIHRoZSB0cmFpbGluZyBuZXdsaW5lLlxuICAgIGlmICh0ZXh0LmNoYXJDb2RlQXQoTiAtIDEpID09PSBORVdMSU5FKSAtLU47XG4gICAgaWYgKHRleHQuY2hhckNvZGVBdChOIC0gMSkgPT09IFJFVFVSTikgLS1OO1xuXG4gICAgZnVuY3Rpb24gdG9rZW4oKSB7XG4gICAgICBpZiAoZW9mKSByZXR1cm4gRU9GO1xuICAgICAgaWYgKGVvbCkgcmV0dXJuIGVvbCA9IGZhbHNlLCBFT0w7XG5cbiAgICAgIC8vIFVuZXNjYXBlIHF1b3Rlcy5cbiAgICAgIHZhciBpLCBqID0gSSwgYztcbiAgICAgIGlmICh0ZXh0LmNoYXJDb2RlQXQoaikgPT09IFFVT1RFKSB7XG4gICAgICAgIHdoaWxlIChJKysgPCBOICYmIHRleHQuY2hhckNvZGVBdChJKSAhPT0gUVVPVEUgfHwgdGV4dC5jaGFyQ29kZUF0KCsrSSkgPT09IFFVT1RFKTtcbiAgICAgICAgaWYgKChpID0gSSkgPj0gTikgZW9mID0gdHJ1ZTtcbiAgICAgICAgZWxzZSBpZiAoKGMgPSB0ZXh0LmNoYXJDb2RlQXQoSSsrKSkgPT09IE5FV0xJTkUpIGVvbCA9IHRydWU7XG4gICAgICAgIGVsc2UgaWYgKGMgPT09IFJFVFVSTikgeyBlb2wgPSB0cnVlOyBpZiAodGV4dC5jaGFyQ29kZUF0KEkpID09PSBORVdMSU5FKSArK0k7IH1cbiAgICAgICAgcmV0dXJuIHRleHQuc2xpY2UoaiArIDEsIGkgLSAxKS5yZXBsYWNlKC9cIlwiL2csIFwiXFxcIlwiKTtcbiAgICAgIH1cblxuICAgICAgLy8gRmluZCBuZXh0IGRlbGltaXRlciBvciBuZXdsaW5lLlxuICAgICAgd2hpbGUgKEkgPCBOKSB7XG4gICAgICAgIGlmICgoYyA9IHRleHQuY2hhckNvZGVBdChpID0gSSsrKSkgPT09IE5FV0xJTkUpIGVvbCA9IHRydWU7XG4gICAgICAgIGVsc2UgaWYgKGMgPT09IFJFVFVSTikgeyBlb2wgPSB0cnVlOyBpZiAodGV4dC5jaGFyQ29kZUF0KEkpID09PSBORVdMSU5FKSArK0k7IH1cbiAgICAgICAgZWxzZSBpZiAoYyAhPT0gREVMSU1JVEVSKSBjb250aW51ZTtcbiAgICAgICAgcmV0dXJuIHRleHQuc2xpY2UoaiwgaSk7XG4gICAgICB9XG5cbiAgICAgIC8vIFJldHVybiBsYXN0IHRva2VuIGJlZm9yZSBFT0YuXG4gICAgICByZXR1cm4gZW9mID0gdHJ1ZSwgdGV4dC5zbGljZShqLCBOKTtcbiAgICB9XG5cbiAgICB3aGlsZSAoKHQgPSB0b2tlbigpKSAhPT0gRU9GKSB7XG4gICAgICB2YXIgcm93ID0gW107XG4gICAgICB3aGlsZSAodCAhPT0gRU9MICYmIHQgIT09IEVPRikgcm93LnB1c2godCksIHQgPSB0b2tlbigpO1xuICAgICAgaWYgKGYgJiYgKHJvdyA9IGYocm93LCBuKyspKSA9PSBudWxsKSBjb250aW51ZTtcbiAgICAgIHJvd3MucHVzaChyb3cpO1xuICAgIH1cblxuICAgIHJldHVybiByb3dzO1xuICB9XG5cbiAgZnVuY3Rpb24gcHJlZm9ybWF0Qm9keShyb3dzLCBjb2x1bW5zKSB7XG4gICAgcmV0dXJuIHJvd3MubWFwKGZ1bmN0aW9uKHJvdykge1xuICAgICAgcmV0dXJuIGNvbHVtbnMubWFwKGZ1bmN0aW9uKGNvbHVtbikge1xuICAgICAgICByZXR1cm4gZm9ybWF0VmFsdWUocm93W2NvbHVtbl0pO1xuICAgICAgfSkuam9pbihkZWxpbWl0ZXIpO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gZm9ybWF0KHJvd3MsIGNvbHVtbnMpIHtcbiAgICBpZiAoY29sdW1ucyA9PSBudWxsKSBjb2x1bW5zID0gaW5mZXJDb2x1bW5zKHJvd3MpO1xuICAgIHJldHVybiBbY29sdW1ucy5tYXAoZm9ybWF0VmFsdWUpLmpvaW4oZGVsaW1pdGVyKV0uY29uY2F0KHByZWZvcm1hdEJvZHkocm93cywgY29sdW1ucykpLmpvaW4oXCJcXG5cIik7XG4gIH1cblxuICBmdW5jdGlvbiBmb3JtYXRCb2R5KHJvd3MsIGNvbHVtbnMpIHtcbiAgICBpZiAoY29sdW1ucyA9PSBudWxsKSBjb2x1bW5zID0gaW5mZXJDb2x1bW5zKHJvd3MpO1xuICAgIHJldHVybiBwcmVmb3JtYXRCb2R5KHJvd3MsIGNvbHVtbnMpLmpvaW4oXCJcXG5cIik7XG4gIH1cblxuICBmdW5jdGlvbiBmb3JtYXRSb3dzKHJvd3MpIHtcbiAgICByZXR1cm4gcm93cy5tYXAoZm9ybWF0Um93KS5qb2luKFwiXFxuXCIpO1xuICB9XG5cbiAgZnVuY3Rpb24gZm9ybWF0Um93KHJvdykge1xuICAgIHJldHVybiByb3cubWFwKGZvcm1hdFZhbHVlKS5qb2luKGRlbGltaXRlcik7XG4gIH1cblxuICBmdW5jdGlvbiBmb3JtYXRWYWx1ZSh2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZSA9PSBudWxsID8gXCJcIlxuICAgICAgICA6IHZhbHVlIGluc3RhbmNlb2YgRGF0ZSA/IGZvcm1hdERhdGUodmFsdWUpXG4gICAgICAgIDogcmVGb3JtYXQudGVzdCh2YWx1ZSArPSBcIlwiKSA/IFwiXFxcIlwiICsgdmFsdWUucmVwbGFjZSgvXCIvZywgXCJcXFwiXFxcIlwiKSArIFwiXFxcIlwiXG4gICAgICAgIDogdmFsdWU7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHBhcnNlOiBwYXJzZSxcbiAgICBwYXJzZVJvd3M6IHBhcnNlUm93cyxcbiAgICBmb3JtYXQ6IGZvcm1hdCxcbiAgICBmb3JtYXRCb2R5OiBmb3JtYXRCb2R5LFxuICAgIGZvcm1hdFJvd3M6IGZvcm1hdFJvd3MsXG4gICAgZm9ybWF0Um93OiBmb3JtYXRSb3csXG4gICAgZm9ybWF0VmFsdWU6IGZvcm1hdFZhbHVlXG4gIH07XG59XG4iLCJpbXBvcnQgZHN2IGZyb20gXCIuL2Rzdi5qc1wiO1xuXG52YXIgdHN2ID0gZHN2KFwiXFx0XCIpO1xuXG5leHBvcnQgdmFyIHRzdlBhcnNlID0gdHN2LnBhcnNlO1xuZXhwb3J0IHZhciB0c3ZQYXJzZVJvd3MgPSB0c3YucGFyc2VSb3dzO1xuZXhwb3J0IHZhciB0c3ZGb3JtYXQgPSB0c3YuZm9ybWF0O1xuZXhwb3J0IHZhciB0c3ZGb3JtYXRCb2R5ID0gdHN2LmZvcm1hdEJvZHk7XG5leHBvcnQgdmFyIHRzdkZvcm1hdFJvd3MgPSB0c3YuZm9ybWF0Um93cztcbmV4cG9ydCB2YXIgdHN2Rm9ybWF0Um93ID0gdHN2LmZvcm1hdFJvdztcbmV4cG9ydCB2YXIgdHN2Rm9ybWF0VmFsdWUgPSB0c3YuZm9ybWF0VmFsdWU7XG4iLCJpbXBvcnQge2NzdlBhcnNlLCBkc3ZGb3JtYXQsIHRzdlBhcnNlfSBmcm9tIFwiZDMtZHN2XCI7XG5pbXBvcnQgdGV4dCBmcm9tIFwiLi90ZXh0LmpzXCI7XG5cbmZ1bmN0aW9uIGRzdlBhcnNlKHBhcnNlKSB7XG4gIHJldHVybiBmdW5jdGlvbihpbnB1dCwgaW5pdCwgcm93KSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDIgJiYgdHlwZW9mIGluaXQgPT09IFwiZnVuY3Rpb25cIikgcm93ID0gaW5pdCwgaW5pdCA9IHVuZGVmaW5lZDtcbiAgICByZXR1cm4gdGV4dChpbnB1dCwgaW5pdCkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgcmV0dXJuIHBhcnNlKHJlc3BvbnNlLCByb3cpO1xuICAgIH0pO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBkc3YoZGVsaW1pdGVyLCBpbnB1dCwgaW5pdCwgcm93KSB7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAzICYmIHR5cGVvZiBpbml0ID09PSBcImZ1bmN0aW9uXCIpIHJvdyA9IGluaXQsIGluaXQgPSB1bmRlZmluZWQ7XG4gIHZhciBmb3JtYXQgPSBkc3ZGb3JtYXQoZGVsaW1pdGVyKTtcbiAgcmV0dXJuIHRleHQoaW5wdXQsIGluaXQpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICByZXR1cm4gZm9ybWF0LnBhcnNlKHJlc3BvbnNlLCByb3cpO1xuICB9KTtcbn1cblxuZXhwb3J0IHZhciBjc3YgPSBkc3ZQYXJzZShjc3ZQYXJzZSk7XG5leHBvcnQgdmFyIHRzdiA9IGRzdlBhcnNlKHRzdlBhcnNlKTtcbiIsImZ1bmN0aW9uIHJlc3BvbnNlSnNvbihyZXNwb25zZSkge1xuICBpZiAoIXJlc3BvbnNlLm9rKSB0aHJvdyBuZXcgRXJyb3IocmVzcG9uc2Uuc3RhdHVzICsgXCIgXCIgKyByZXNwb25zZS5zdGF0dXNUZXh0KTtcbiAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PT0gMjA0IHx8IHJlc3BvbnNlLnN0YXR1cyA9PT0gMjA1KSByZXR1cm47XG4gIHJldHVybiByZXNwb25zZS5qc29uKCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGlucHV0LCBpbml0KSB7XG4gIHJldHVybiBmZXRjaChpbnB1dCwgaW5pdCkudGhlbihyZXNwb25zZUpzb24pO1xufVxuIiwiZnVuY3Rpb24gcmVzcG9uc2VUZXh0KHJlc3BvbnNlKSB7XG4gIGlmICghcmVzcG9uc2Uub2spIHRocm93IG5ldyBFcnJvcihyZXNwb25zZS5zdGF0dXMgKyBcIiBcIiArIHJlc3BvbnNlLnN0YXR1c1RleHQpO1xuICByZXR1cm4gcmVzcG9uc2UudGV4dCgpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihpbnB1dCwgaW5pdCkge1xuICByZXR1cm4gZmV0Y2goaW5wdXQsIGluaXQpLnRoZW4ocmVzcG9uc2VUZXh0KTtcbn1cbiIsImltcG9ydCBmb3JtYXRMb2NhbGUgZnJvbSBcIi4vbG9jYWxlLmpzXCI7XG5cbnZhciBsb2NhbGU7XG5leHBvcnQgdmFyIGZvcm1hdDtcbmV4cG9ydCB2YXIgZm9ybWF0UHJlZml4O1xuXG5kZWZhdWx0TG9jYWxlKHtcbiAgdGhvdXNhbmRzOiBcIixcIixcbiAgZ3JvdXBpbmc6IFszXSxcbiAgY3VycmVuY3k6IFtcIiRcIiwgXCJcIl1cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBkZWZhdWx0TG9jYWxlKGRlZmluaXRpb24pIHtcbiAgbG9jYWxlID0gZm9ybWF0TG9jYWxlKGRlZmluaXRpb24pO1xuICBmb3JtYXQgPSBsb2NhbGUuZm9ybWF0O1xuICBmb3JtYXRQcmVmaXggPSBsb2NhbGUuZm9ybWF0UHJlZml4O1xuICByZXR1cm4gbG9jYWxlO1xufVxuIiwiaW1wb3J0IHtmb3JtYXREZWNpbWFsUGFydHN9IGZyb20gXCIuL2Zvcm1hdERlY2ltYWwuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oeCkge1xuICByZXR1cm4geCA9IGZvcm1hdERlY2ltYWxQYXJ0cyhNYXRoLmFicyh4KSksIHggPyB4WzFdIDogTmFOO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oeCkge1xuICByZXR1cm4gTWF0aC5hYnMoeCA9IE1hdGgucm91bmQoeCkpID49IDFlMjFcbiAgICAgID8geC50b0xvY2FsZVN0cmluZyhcImVuXCIpLnJlcGxhY2UoLywvZywgXCJcIilcbiAgICAgIDogeC50b1N0cmluZygxMCk7XG59XG5cbi8vIENvbXB1dGVzIHRoZSBkZWNpbWFsIGNvZWZmaWNpZW50IGFuZCBleHBvbmVudCBvZiB0aGUgc3BlY2lmaWVkIG51bWJlciB4IHdpdGhcbi8vIHNpZ25pZmljYW50IGRpZ2l0cyBwLCB3aGVyZSB4IGlzIHBvc2l0aXZlIGFuZCBwIGlzIGluIFsxLCAyMV0gb3IgdW5kZWZpbmVkLlxuLy8gRm9yIGV4YW1wbGUsIGZvcm1hdERlY2ltYWxQYXJ0cygxLjIzKSByZXR1cm5zIFtcIjEyM1wiLCAwXS5cbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXREZWNpbWFsUGFydHMoeCwgcCkge1xuICBpZiAoKGkgPSAoeCA9IHAgPyB4LnRvRXhwb25lbnRpYWwocCAtIDEpIDogeC50b0V4cG9uZW50aWFsKCkpLmluZGV4T2YoXCJlXCIpKSA8IDApIHJldHVybiBudWxsOyAvLyBOYU4sIMKxSW5maW5pdHlcbiAgdmFyIGksIGNvZWZmaWNpZW50ID0geC5zbGljZSgwLCBpKTtcblxuICAvLyBUaGUgc3RyaW5nIHJldHVybmVkIGJ5IHRvRXhwb25lbnRpYWwgZWl0aGVyIGhhcyB0aGUgZm9ybSBcXGRcXC5cXGQrZVstK11cXGQrXG4gIC8vIChlLmcuLCAxLjJlKzMpIG9yIHRoZSBmb3JtIFxcZGVbLStdXFxkKyAoZS5nLiwgMWUrMykuXG4gIHJldHVybiBbXG4gICAgY29lZmZpY2llbnQubGVuZ3RoID4gMSA/IGNvZWZmaWNpZW50WzBdICsgY29lZmZpY2llbnQuc2xpY2UoMikgOiBjb2VmZmljaWVudCxcbiAgICAreC5zbGljZShpICsgMSlcbiAgXTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGdyb3VwaW5nLCB0aG91c2FuZHMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKHZhbHVlLCB3aWR0aCkge1xuICAgIHZhciBpID0gdmFsdWUubGVuZ3RoLFxuICAgICAgICB0ID0gW10sXG4gICAgICAgIGogPSAwLFxuICAgICAgICBnID0gZ3JvdXBpbmdbMF0sXG4gICAgICAgIGxlbmd0aCA9IDA7XG5cbiAgICB3aGlsZSAoaSA+IDAgJiYgZyA+IDApIHtcbiAgICAgIGlmIChsZW5ndGggKyBnICsgMSA+IHdpZHRoKSBnID0gTWF0aC5tYXgoMSwgd2lkdGggLSBsZW5ndGgpO1xuICAgICAgdC5wdXNoKHZhbHVlLnN1YnN0cmluZyhpIC09IGcsIGkgKyBnKSk7XG4gICAgICBpZiAoKGxlbmd0aCArPSBnICsgMSkgPiB3aWR0aCkgYnJlYWs7XG4gICAgICBnID0gZ3JvdXBpbmdbaiA9IChqICsgMSkgJSBncm91cGluZy5sZW5ndGhdO1xuICAgIH1cblxuICAgIHJldHVybiB0LnJldmVyc2UoKS5qb2luKHRob3VzYW5kcyk7XG4gIH07XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbihudW1lcmFscykge1xuICByZXR1cm4gZnVuY3Rpb24odmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUucmVwbGFjZSgvWzAtOV0vZywgZnVuY3Rpb24oaSkge1xuICAgICAgcmV0dXJuIG51bWVyYWxzWytpXTtcbiAgICB9KTtcbiAgfTtcbn1cbiIsImltcG9ydCB7Zm9ybWF0RGVjaW1hbFBhcnRzfSBmcm9tIFwiLi9mb3JtYXREZWNpbWFsLmpzXCI7XG5cbmV4cG9ydCB2YXIgcHJlZml4RXhwb25lbnQ7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHgsIHApIHtcbiAgdmFyIGQgPSBmb3JtYXREZWNpbWFsUGFydHMoeCwgcCk7XG4gIGlmICghZCkgcmV0dXJuIHggKyBcIlwiO1xuICB2YXIgY29lZmZpY2llbnQgPSBkWzBdLFxuICAgICAgZXhwb25lbnQgPSBkWzFdLFxuICAgICAgaSA9IGV4cG9uZW50IC0gKHByZWZpeEV4cG9uZW50ID0gTWF0aC5tYXgoLTgsIE1hdGgubWluKDgsIE1hdGguZmxvb3IoZXhwb25lbnQgLyAzKSkpICogMykgKyAxLFxuICAgICAgbiA9IGNvZWZmaWNpZW50Lmxlbmd0aDtcbiAgcmV0dXJuIGkgPT09IG4gPyBjb2VmZmljaWVudFxuICAgICAgOiBpID4gbiA/IGNvZWZmaWNpZW50ICsgbmV3IEFycmF5KGkgLSBuICsgMSkuam9pbihcIjBcIilcbiAgICAgIDogaSA+IDAgPyBjb2VmZmljaWVudC5zbGljZSgwLCBpKSArIFwiLlwiICsgY29lZmZpY2llbnQuc2xpY2UoaSlcbiAgICAgIDogXCIwLlwiICsgbmV3IEFycmF5KDEgLSBpKS5qb2luKFwiMFwiKSArIGZvcm1hdERlY2ltYWxQYXJ0cyh4LCBNYXRoLm1heCgwLCBwICsgaSAtIDEpKVswXTsgLy8gbGVzcyB0aGFuIDF5IVxufVxuIiwiaW1wb3J0IHtmb3JtYXREZWNpbWFsUGFydHN9IGZyb20gXCIuL2Zvcm1hdERlY2ltYWwuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oeCwgcCkge1xuICB2YXIgZCA9IGZvcm1hdERlY2ltYWxQYXJ0cyh4LCBwKTtcbiAgaWYgKCFkKSByZXR1cm4geCArIFwiXCI7XG4gIHZhciBjb2VmZmljaWVudCA9IGRbMF0sXG4gICAgICBleHBvbmVudCA9IGRbMV07XG4gIHJldHVybiBleHBvbmVudCA8IDAgPyBcIjAuXCIgKyBuZXcgQXJyYXkoLWV4cG9uZW50KS5qb2luKFwiMFwiKSArIGNvZWZmaWNpZW50XG4gICAgICA6IGNvZWZmaWNpZW50Lmxlbmd0aCA+IGV4cG9uZW50ICsgMSA/IGNvZWZmaWNpZW50LnNsaWNlKDAsIGV4cG9uZW50ICsgMSkgKyBcIi5cIiArIGNvZWZmaWNpZW50LnNsaWNlKGV4cG9uZW50ICsgMSlcbiAgICAgIDogY29lZmZpY2llbnQgKyBuZXcgQXJyYXkoZXhwb25lbnQgLSBjb2VmZmljaWVudC5sZW5ndGggKyAyKS5qb2luKFwiMFwiKTtcbn1cbiIsIi8vIFtbZmlsbF1hbGlnbl1bc2lnbl1bc3ltYm9sXVswXVt3aWR0aF1bLF1bLnByZWNpc2lvbl1bfl1bdHlwZV1cbnZhciByZSA9IC9eKD86KC4pPyhbPD49Xl0pKT8oWytcXC0oIF0pPyhbJCNdKT8oMCk/KFxcZCspPygsKT8oXFwuXFxkKyk/KH4pPyhbYS16JV0pPyQvaTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZm9ybWF0U3BlY2lmaWVyKHNwZWNpZmllcikge1xuICBpZiAoIShtYXRjaCA9IHJlLmV4ZWMoc3BlY2lmaWVyKSkpIHRocm93IG5ldyBFcnJvcihcImludmFsaWQgZm9ybWF0OiBcIiArIHNwZWNpZmllcik7XG4gIHZhciBtYXRjaDtcbiAgcmV0dXJuIG5ldyBGb3JtYXRTcGVjaWZpZXIoe1xuICAgIGZpbGw6IG1hdGNoWzFdLFxuICAgIGFsaWduOiBtYXRjaFsyXSxcbiAgICBzaWduOiBtYXRjaFszXSxcbiAgICBzeW1ib2w6IG1hdGNoWzRdLFxuICAgIHplcm86IG1hdGNoWzVdLFxuICAgIHdpZHRoOiBtYXRjaFs2XSxcbiAgICBjb21tYTogbWF0Y2hbN10sXG4gICAgcHJlY2lzaW9uOiBtYXRjaFs4XSAmJiBtYXRjaFs4XS5zbGljZSgxKSxcbiAgICB0cmltOiBtYXRjaFs5XSxcbiAgICB0eXBlOiBtYXRjaFsxMF1cbiAgfSk7XG59XG5cbmZvcm1hdFNwZWNpZmllci5wcm90b3R5cGUgPSBGb3JtYXRTcGVjaWZpZXIucHJvdG90eXBlOyAvLyBpbnN0YW5jZW9mXG5cbmV4cG9ydCBmdW5jdGlvbiBGb3JtYXRTcGVjaWZpZXIoc3BlY2lmaWVyKSB7XG4gIHRoaXMuZmlsbCA9IHNwZWNpZmllci5maWxsID09PSB1bmRlZmluZWQgPyBcIiBcIiA6IHNwZWNpZmllci5maWxsICsgXCJcIjtcbiAgdGhpcy5hbGlnbiA9IHNwZWNpZmllci5hbGlnbiA9PT0gdW5kZWZpbmVkID8gXCI+XCIgOiBzcGVjaWZpZXIuYWxpZ24gKyBcIlwiO1xuICB0aGlzLnNpZ24gPSBzcGVjaWZpZXIuc2lnbiA9PT0gdW5kZWZpbmVkID8gXCItXCIgOiBzcGVjaWZpZXIuc2lnbiArIFwiXCI7XG4gIHRoaXMuc3ltYm9sID0gc3BlY2lmaWVyLnN5bWJvbCA9PT0gdW5kZWZpbmVkID8gXCJcIiA6IHNwZWNpZmllci5zeW1ib2wgKyBcIlwiO1xuICB0aGlzLnplcm8gPSAhIXNwZWNpZmllci56ZXJvO1xuICB0aGlzLndpZHRoID0gc3BlY2lmaWVyLndpZHRoID09PSB1bmRlZmluZWQgPyB1bmRlZmluZWQgOiArc3BlY2lmaWVyLndpZHRoO1xuICB0aGlzLmNvbW1hID0gISFzcGVjaWZpZXIuY29tbWE7XG4gIHRoaXMucHJlY2lzaW9uID0gc3BlY2lmaWVyLnByZWNpc2lvbiA9PT0gdW5kZWZpbmVkID8gdW5kZWZpbmVkIDogK3NwZWNpZmllci5wcmVjaXNpb247XG4gIHRoaXMudHJpbSA9ICEhc3BlY2lmaWVyLnRyaW07XG4gIHRoaXMudHlwZSA9IHNwZWNpZmllci50eXBlID09PSB1bmRlZmluZWQgPyBcIlwiIDogc3BlY2lmaWVyLnR5cGUgKyBcIlwiO1xufVxuXG5Gb3JtYXRTcGVjaWZpZXIucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLmZpbGxcbiAgICAgICsgdGhpcy5hbGlnblxuICAgICAgKyB0aGlzLnNpZ25cbiAgICAgICsgdGhpcy5zeW1ib2xcbiAgICAgICsgKHRoaXMuemVybyA/IFwiMFwiIDogXCJcIilcbiAgICAgICsgKHRoaXMud2lkdGggPT09IHVuZGVmaW5lZCA/IFwiXCIgOiBNYXRoLm1heCgxLCB0aGlzLndpZHRoIHwgMCkpXG4gICAgICArICh0aGlzLmNvbW1hID8gXCIsXCIgOiBcIlwiKVxuICAgICAgKyAodGhpcy5wcmVjaXNpb24gPT09IHVuZGVmaW5lZCA/IFwiXCIgOiBcIi5cIiArIE1hdGgubWF4KDAsIHRoaXMucHJlY2lzaW9uIHwgMCkpXG4gICAgICArICh0aGlzLnRyaW0gPyBcIn5cIiA6IFwiXCIpXG4gICAgICArIHRoaXMudHlwZTtcbn07XG4iLCIvLyBUcmltcyBpbnNpZ25pZmljYW50IHplcm9zLCBlLmcuLCByZXBsYWNlcyAxLjIwMDBrIHdpdGggMS4yay5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHMpIHtcbiAgb3V0OiBmb3IgKHZhciBuID0gcy5sZW5ndGgsIGkgPSAxLCBpMCA9IC0xLCBpMTsgaSA8IG47ICsraSkge1xuICAgIHN3aXRjaCAoc1tpXSkge1xuICAgICAgY2FzZSBcIi5cIjogaTAgPSBpMSA9IGk7IGJyZWFrO1xuICAgICAgY2FzZSBcIjBcIjogaWYgKGkwID09PSAwKSBpMCA9IGk7IGkxID0gaTsgYnJlYWs7XG4gICAgICBkZWZhdWx0OiBpZiAoIStzW2ldKSBicmVhayBvdXQ7IGlmIChpMCA+IDApIGkwID0gMDsgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiBpMCA+IDAgPyBzLnNsaWNlKDAsIGkwKSArIHMuc2xpY2UoaTEgKyAxKSA6IHM7XG59XG4iLCJpbXBvcnQgZm9ybWF0RGVjaW1hbCBmcm9tIFwiLi9mb3JtYXREZWNpbWFsLmpzXCI7XG5pbXBvcnQgZm9ybWF0UHJlZml4QXV0byBmcm9tIFwiLi9mb3JtYXRQcmVmaXhBdXRvLmpzXCI7XG5pbXBvcnQgZm9ybWF0Um91bmRlZCBmcm9tIFwiLi9mb3JtYXRSb3VuZGVkLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgXCIlXCI6ICh4LCBwKSA9PiAoeCAqIDEwMCkudG9GaXhlZChwKSxcbiAgXCJiXCI6ICh4KSA9PiBNYXRoLnJvdW5kKHgpLnRvU3RyaW5nKDIpLFxuICBcImNcIjogKHgpID0+IHggKyBcIlwiLFxuICBcImRcIjogZm9ybWF0RGVjaW1hbCxcbiAgXCJlXCI6ICh4LCBwKSA9PiB4LnRvRXhwb25lbnRpYWwocCksXG4gIFwiZlwiOiAoeCwgcCkgPT4geC50b0ZpeGVkKHApLFxuICBcImdcIjogKHgsIHApID0+IHgudG9QcmVjaXNpb24ocCksXG4gIFwib1wiOiAoeCkgPT4gTWF0aC5yb3VuZCh4KS50b1N0cmluZyg4KSxcbiAgXCJwXCI6ICh4LCBwKSA9PiBmb3JtYXRSb3VuZGVkKHggKiAxMDAsIHApLFxuICBcInJcIjogZm9ybWF0Um91bmRlZCxcbiAgXCJzXCI6IGZvcm1hdFByZWZpeEF1dG8sXG4gIFwiWFwiOiAoeCkgPT4gTWF0aC5yb3VuZCh4KS50b1N0cmluZygxNikudG9VcHBlckNhc2UoKSxcbiAgXCJ4XCI6ICh4KSA9PiBNYXRoLnJvdW5kKHgpLnRvU3RyaW5nKDE2KVxufTtcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHgpIHtcbiAgcmV0dXJuIHg7XG59XG4iLCJpbXBvcnQgZXhwb25lbnQgZnJvbSBcIi4vZXhwb25lbnQuanNcIjtcbmltcG9ydCBmb3JtYXRHcm91cCBmcm9tIFwiLi9mb3JtYXRHcm91cC5qc1wiO1xuaW1wb3J0IGZvcm1hdE51bWVyYWxzIGZyb20gXCIuL2Zvcm1hdE51bWVyYWxzLmpzXCI7XG5pbXBvcnQgZm9ybWF0U3BlY2lmaWVyIGZyb20gXCIuL2Zvcm1hdFNwZWNpZmllci5qc1wiO1xuaW1wb3J0IGZvcm1hdFRyaW0gZnJvbSBcIi4vZm9ybWF0VHJpbS5qc1wiO1xuaW1wb3J0IGZvcm1hdFR5cGVzIGZyb20gXCIuL2Zvcm1hdFR5cGVzLmpzXCI7XG5pbXBvcnQge3ByZWZpeEV4cG9uZW50fSBmcm9tIFwiLi9mb3JtYXRQcmVmaXhBdXRvLmpzXCI7XG5pbXBvcnQgaWRlbnRpdHkgZnJvbSBcIi4vaWRlbnRpdHkuanNcIjtcblxudmFyIG1hcCA9IEFycmF5LnByb3RvdHlwZS5tYXAsXG4gICAgcHJlZml4ZXMgPSBbXCJ5XCIsXCJ6XCIsXCJhXCIsXCJmXCIsXCJwXCIsXCJuXCIsXCLCtVwiLFwibVwiLFwiXCIsXCJrXCIsXCJNXCIsXCJHXCIsXCJUXCIsXCJQXCIsXCJFXCIsXCJaXCIsXCJZXCJdO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihsb2NhbGUpIHtcbiAgdmFyIGdyb3VwID0gbG9jYWxlLmdyb3VwaW5nID09PSB1bmRlZmluZWQgfHwgbG9jYWxlLnRob3VzYW5kcyA9PT0gdW5kZWZpbmVkID8gaWRlbnRpdHkgOiBmb3JtYXRHcm91cChtYXAuY2FsbChsb2NhbGUuZ3JvdXBpbmcsIE51bWJlciksIGxvY2FsZS50aG91c2FuZHMgKyBcIlwiKSxcbiAgICAgIGN1cnJlbmN5UHJlZml4ID0gbG9jYWxlLmN1cnJlbmN5ID09PSB1bmRlZmluZWQgPyBcIlwiIDogbG9jYWxlLmN1cnJlbmN5WzBdICsgXCJcIixcbiAgICAgIGN1cnJlbmN5U3VmZml4ID0gbG9jYWxlLmN1cnJlbmN5ID09PSB1bmRlZmluZWQgPyBcIlwiIDogbG9jYWxlLmN1cnJlbmN5WzFdICsgXCJcIixcbiAgICAgIGRlY2ltYWwgPSBsb2NhbGUuZGVjaW1hbCA9PT0gdW5kZWZpbmVkID8gXCIuXCIgOiBsb2NhbGUuZGVjaW1hbCArIFwiXCIsXG4gICAgICBudW1lcmFscyA9IGxvY2FsZS5udW1lcmFscyA9PT0gdW5kZWZpbmVkID8gaWRlbnRpdHkgOiBmb3JtYXROdW1lcmFscyhtYXAuY2FsbChsb2NhbGUubnVtZXJhbHMsIFN0cmluZykpLFxuICAgICAgcGVyY2VudCA9IGxvY2FsZS5wZXJjZW50ID09PSB1bmRlZmluZWQgPyBcIiVcIiA6IGxvY2FsZS5wZXJjZW50ICsgXCJcIixcbiAgICAgIG1pbnVzID0gbG9jYWxlLm1pbnVzID09PSB1bmRlZmluZWQgPyBcIuKIklwiIDogbG9jYWxlLm1pbnVzICsgXCJcIixcbiAgICAgIG5hbiA9IGxvY2FsZS5uYW4gPT09IHVuZGVmaW5lZCA/IFwiTmFOXCIgOiBsb2NhbGUubmFuICsgXCJcIjtcblxuICBmdW5jdGlvbiBuZXdGb3JtYXQoc3BlY2lmaWVyKSB7XG4gICAgc3BlY2lmaWVyID0gZm9ybWF0U3BlY2lmaWVyKHNwZWNpZmllcik7XG5cbiAgICB2YXIgZmlsbCA9IHNwZWNpZmllci5maWxsLFxuICAgICAgICBhbGlnbiA9IHNwZWNpZmllci5hbGlnbixcbiAgICAgICAgc2lnbiA9IHNwZWNpZmllci5zaWduLFxuICAgICAgICBzeW1ib2wgPSBzcGVjaWZpZXIuc3ltYm9sLFxuICAgICAgICB6ZXJvID0gc3BlY2lmaWVyLnplcm8sXG4gICAgICAgIHdpZHRoID0gc3BlY2lmaWVyLndpZHRoLFxuICAgICAgICBjb21tYSA9IHNwZWNpZmllci5jb21tYSxcbiAgICAgICAgcHJlY2lzaW9uID0gc3BlY2lmaWVyLnByZWNpc2lvbixcbiAgICAgICAgdHJpbSA9IHNwZWNpZmllci50cmltLFxuICAgICAgICB0eXBlID0gc3BlY2lmaWVyLnR5cGU7XG5cbiAgICAvLyBUaGUgXCJuXCIgdHlwZSBpcyBhbiBhbGlhcyBmb3IgXCIsZ1wiLlxuICAgIGlmICh0eXBlID09PSBcIm5cIikgY29tbWEgPSB0cnVlLCB0eXBlID0gXCJnXCI7XG5cbiAgICAvLyBUaGUgXCJcIiB0eXBlLCBhbmQgYW55IGludmFsaWQgdHlwZSwgaXMgYW4gYWxpYXMgZm9yIFwiLjEyfmdcIi5cbiAgICBlbHNlIGlmICghZm9ybWF0VHlwZXNbdHlwZV0pIHByZWNpc2lvbiA9PT0gdW5kZWZpbmVkICYmIChwcmVjaXNpb24gPSAxMiksIHRyaW0gPSB0cnVlLCB0eXBlID0gXCJnXCI7XG5cbiAgICAvLyBJZiB6ZXJvIGZpbGwgaXMgc3BlY2lmaWVkLCBwYWRkaW5nIGdvZXMgYWZ0ZXIgc2lnbiBhbmQgYmVmb3JlIGRpZ2l0cy5cbiAgICBpZiAoemVybyB8fCAoZmlsbCA9PT0gXCIwXCIgJiYgYWxpZ24gPT09IFwiPVwiKSkgemVybyA9IHRydWUsIGZpbGwgPSBcIjBcIiwgYWxpZ24gPSBcIj1cIjtcblxuICAgIC8vIENvbXB1dGUgdGhlIHByZWZpeCBhbmQgc3VmZml4LlxuICAgIC8vIEZvciBTSS1wcmVmaXgsIHRoZSBzdWZmaXggaXMgbGF6aWx5IGNvbXB1dGVkLlxuICAgIHZhciBwcmVmaXggPSBzeW1ib2wgPT09IFwiJFwiID8gY3VycmVuY3lQcmVmaXggOiBzeW1ib2wgPT09IFwiI1wiICYmIC9bYm94WF0vLnRlc3QodHlwZSkgPyBcIjBcIiArIHR5cGUudG9Mb3dlckNhc2UoKSA6IFwiXCIsXG4gICAgICAgIHN1ZmZpeCA9IHN5bWJvbCA9PT0gXCIkXCIgPyBjdXJyZW5jeVN1ZmZpeCA6IC9bJXBdLy50ZXN0KHR5cGUpID8gcGVyY2VudCA6IFwiXCI7XG5cbiAgICAvLyBXaGF0IGZvcm1hdCBmdW5jdGlvbiBzaG91bGQgd2UgdXNlP1xuICAgIC8vIElzIHRoaXMgYW4gaW50ZWdlciB0eXBlP1xuICAgIC8vIENhbiB0aGlzIHR5cGUgZ2VuZXJhdGUgZXhwb25lbnRpYWwgbm90YXRpb24/XG4gICAgdmFyIGZvcm1hdFR5cGUgPSBmb3JtYXRUeXBlc1t0eXBlXSxcbiAgICAgICAgbWF5YmVTdWZmaXggPSAvW2RlZmdwcnMlXS8udGVzdCh0eXBlKTtcblxuICAgIC8vIFNldCB0aGUgZGVmYXVsdCBwcmVjaXNpb24gaWYgbm90IHNwZWNpZmllZCxcbiAgICAvLyBvciBjbGFtcCB0aGUgc3BlY2lmaWVkIHByZWNpc2lvbiB0byB0aGUgc3VwcG9ydGVkIHJhbmdlLlxuICAgIC8vIEZvciBzaWduaWZpY2FudCBwcmVjaXNpb24sIGl0IG11c3QgYmUgaW4gWzEsIDIxXS5cbiAgICAvLyBGb3IgZml4ZWQgcHJlY2lzaW9uLCBpdCBtdXN0IGJlIGluIFswLCAyMF0uXG4gICAgcHJlY2lzaW9uID0gcHJlY2lzaW9uID09PSB1bmRlZmluZWQgPyA2XG4gICAgICAgIDogL1tncHJzXS8udGVzdCh0eXBlKSA/IE1hdGgubWF4KDEsIE1hdGgubWluKDIxLCBwcmVjaXNpb24pKVxuICAgICAgICA6IE1hdGgubWF4KDAsIE1hdGgubWluKDIwLCBwcmVjaXNpb24pKTtcblxuICAgIGZ1bmN0aW9uIGZvcm1hdCh2YWx1ZSkge1xuICAgICAgdmFyIHZhbHVlUHJlZml4ID0gcHJlZml4LFxuICAgICAgICAgIHZhbHVlU3VmZml4ID0gc3VmZml4LFxuICAgICAgICAgIGksIG4sIGM7XG5cbiAgICAgIGlmICh0eXBlID09PSBcImNcIikge1xuICAgICAgICB2YWx1ZVN1ZmZpeCA9IGZvcm1hdFR5cGUodmFsdWUpICsgdmFsdWVTdWZmaXg7XG4gICAgICAgIHZhbHVlID0gXCJcIjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhbHVlID0gK3ZhbHVlO1xuXG4gICAgICAgIC8vIERldGVybWluZSB0aGUgc2lnbi4gLTAgaXMgbm90IGxlc3MgdGhhbiAwLCBidXQgMSAvIC0wIGlzIVxuICAgICAgICB2YXIgdmFsdWVOZWdhdGl2ZSA9IHZhbHVlIDwgMCB8fCAxIC8gdmFsdWUgPCAwO1xuXG4gICAgICAgIC8vIFBlcmZvcm0gdGhlIGluaXRpYWwgZm9ybWF0dGluZy5cbiAgICAgICAgdmFsdWUgPSBpc05hTih2YWx1ZSkgPyBuYW4gOiBmb3JtYXRUeXBlKE1hdGguYWJzKHZhbHVlKSwgcHJlY2lzaW9uKTtcblxuICAgICAgICAvLyBUcmltIGluc2lnbmlmaWNhbnQgemVyb3MuXG4gICAgICAgIGlmICh0cmltKSB2YWx1ZSA9IGZvcm1hdFRyaW0odmFsdWUpO1xuXG4gICAgICAgIC8vIElmIGEgbmVnYXRpdmUgdmFsdWUgcm91bmRzIHRvIHplcm8gYWZ0ZXIgZm9ybWF0dGluZywgYW5kIG5vIGV4cGxpY2l0IHBvc2l0aXZlIHNpZ24gaXMgcmVxdWVzdGVkLCBoaWRlIHRoZSBzaWduLlxuICAgICAgICBpZiAodmFsdWVOZWdhdGl2ZSAmJiArdmFsdWUgPT09IDAgJiYgc2lnbiAhPT0gXCIrXCIpIHZhbHVlTmVnYXRpdmUgPSBmYWxzZTtcblxuICAgICAgICAvLyBDb21wdXRlIHRoZSBwcmVmaXggYW5kIHN1ZmZpeC5cbiAgICAgICAgdmFsdWVQcmVmaXggPSAodmFsdWVOZWdhdGl2ZSA/IChzaWduID09PSBcIihcIiA/IHNpZ24gOiBtaW51cykgOiBzaWduID09PSBcIi1cIiB8fCBzaWduID09PSBcIihcIiA/IFwiXCIgOiBzaWduKSArIHZhbHVlUHJlZml4O1xuICAgICAgICB2YWx1ZVN1ZmZpeCA9ICh0eXBlID09PSBcInNcIiA/IHByZWZpeGVzWzggKyBwcmVmaXhFeHBvbmVudCAvIDNdIDogXCJcIikgKyB2YWx1ZVN1ZmZpeCArICh2YWx1ZU5lZ2F0aXZlICYmIHNpZ24gPT09IFwiKFwiID8gXCIpXCIgOiBcIlwiKTtcblxuICAgICAgICAvLyBCcmVhayB0aGUgZm9ybWF0dGVkIHZhbHVlIGludG8gdGhlIGludGVnZXIg4oCcdmFsdWXigJ0gcGFydCB0aGF0IGNhbiBiZVxuICAgICAgICAvLyBncm91cGVkLCBhbmQgZnJhY3Rpb25hbCBvciBleHBvbmVudGlhbCDigJxzdWZmaXjigJ0gcGFydCB0aGF0IGlzIG5vdC5cbiAgICAgICAgaWYgKG1heWJlU3VmZml4KSB7XG4gICAgICAgICAgaSA9IC0xLCBuID0gdmFsdWUubGVuZ3RoO1xuICAgICAgICAgIHdoaWxlICgrK2kgPCBuKSB7XG4gICAgICAgICAgICBpZiAoYyA9IHZhbHVlLmNoYXJDb2RlQXQoaSksIDQ4ID4gYyB8fCBjID4gNTcpIHtcbiAgICAgICAgICAgICAgdmFsdWVTdWZmaXggPSAoYyA9PT0gNDYgPyBkZWNpbWFsICsgdmFsdWUuc2xpY2UoaSArIDEpIDogdmFsdWUuc2xpY2UoaSkpICsgdmFsdWVTdWZmaXg7XG4gICAgICAgICAgICAgIHZhbHVlID0gdmFsdWUuc2xpY2UoMCwgaSk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBJZiB0aGUgZmlsbCBjaGFyYWN0ZXIgaXMgbm90IFwiMFwiLCBncm91cGluZyBpcyBhcHBsaWVkIGJlZm9yZSBwYWRkaW5nLlxuICAgICAgaWYgKGNvbW1hICYmICF6ZXJvKSB2YWx1ZSA9IGdyb3VwKHZhbHVlLCBJbmZpbml0eSk7XG5cbiAgICAgIC8vIENvbXB1dGUgdGhlIHBhZGRpbmcuXG4gICAgICB2YXIgbGVuZ3RoID0gdmFsdWVQcmVmaXgubGVuZ3RoICsgdmFsdWUubGVuZ3RoICsgdmFsdWVTdWZmaXgubGVuZ3RoLFxuICAgICAgICAgIHBhZGRpbmcgPSBsZW5ndGggPCB3aWR0aCA/IG5ldyBBcnJheSh3aWR0aCAtIGxlbmd0aCArIDEpLmpvaW4oZmlsbCkgOiBcIlwiO1xuXG4gICAgICAvLyBJZiB0aGUgZmlsbCBjaGFyYWN0ZXIgaXMgXCIwXCIsIGdyb3VwaW5nIGlzIGFwcGxpZWQgYWZ0ZXIgcGFkZGluZy5cbiAgICAgIGlmIChjb21tYSAmJiB6ZXJvKSB2YWx1ZSA9IGdyb3VwKHBhZGRpbmcgKyB2YWx1ZSwgcGFkZGluZy5sZW5ndGggPyB3aWR0aCAtIHZhbHVlU3VmZml4Lmxlbmd0aCA6IEluZmluaXR5KSwgcGFkZGluZyA9IFwiXCI7XG5cbiAgICAgIC8vIFJlY29uc3RydWN0IHRoZSBmaW5hbCBvdXRwdXQgYmFzZWQgb24gdGhlIGRlc2lyZWQgYWxpZ25tZW50LlxuICAgICAgc3dpdGNoIChhbGlnbikge1xuICAgICAgICBjYXNlIFwiPFwiOiB2YWx1ZSA9IHZhbHVlUHJlZml4ICsgdmFsdWUgKyB2YWx1ZVN1ZmZpeCArIHBhZGRpbmc7IGJyZWFrO1xuICAgICAgICBjYXNlIFwiPVwiOiB2YWx1ZSA9IHZhbHVlUHJlZml4ICsgcGFkZGluZyArIHZhbHVlICsgdmFsdWVTdWZmaXg7IGJyZWFrO1xuICAgICAgICBjYXNlIFwiXlwiOiB2YWx1ZSA9IHBhZGRpbmcuc2xpY2UoMCwgbGVuZ3RoID0gcGFkZGluZy5sZW5ndGggPj4gMSkgKyB2YWx1ZVByZWZpeCArIHZhbHVlICsgdmFsdWVTdWZmaXggKyBwYWRkaW5nLnNsaWNlKGxlbmd0aCk7IGJyZWFrO1xuICAgICAgICBkZWZhdWx0OiB2YWx1ZSA9IHBhZGRpbmcgKyB2YWx1ZVByZWZpeCArIHZhbHVlICsgdmFsdWVTdWZmaXg7IGJyZWFrO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbnVtZXJhbHModmFsdWUpO1xuICAgIH1cblxuICAgIGZvcm1hdC50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHNwZWNpZmllciArIFwiXCI7XG4gICAgfTtcblxuICAgIHJldHVybiBmb3JtYXQ7XG4gIH1cblxuICBmdW5jdGlvbiBmb3JtYXRQcmVmaXgoc3BlY2lmaWVyLCB2YWx1ZSkge1xuICAgIHZhciBmID0gbmV3Rm9ybWF0KChzcGVjaWZpZXIgPSBmb3JtYXRTcGVjaWZpZXIoc3BlY2lmaWVyKSwgc3BlY2lmaWVyLnR5cGUgPSBcImZcIiwgc3BlY2lmaWVyKSksXG4gICAgICAgIGUgPSBNYXRoLm1heCgtOCwgTWF0aC5taW4oOCwgTWF0aC5mbG9vcihleHBvbmVudCh2YWx1ZSkgLyAzKSkpICogMyxcbiAgICAgICAgayA9IE1hdGgucG93KDEwLCAtZSksXG4gICAgICAgIHByZWZpeCA9IHByZWZpeGVzWzggKyBlIC8gM107XG4gICAgcmV0dXJuIGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICByZXR1cm4gZihrICogdmFsdWUpICsgcHJlZml4O1xuICAgIH07XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGZvcm1hdDogbmV3Rm9ybWF0LFxuICAgIGZvcm1hdFByZWZpeDogZm9ybWF0UHJlZml4XG4gIH07XG59XG4iLCJleHBvcnQgZGVmYXVsdCBNYXRoLnJhbmRvbTtcbiIsImltcG9ydCBkZWZhdWx0U291cmNlIGZyb20gXCIuL2RlZmF1bHRTb3VyY2UuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgKGZ1bmN0aW9uIHNvdXJjZVJhbmRvbU5vcm1hbChzb3VyY2UpIHtcbiAgZnVuY3Rpb24gcmFuZG9tTm9ybWFsKG11LCBzaWdtYSkge1xuICAgIHZhciB4LCByO1xuICAgIG11ID0gbXUgPT0gbnVsbCA/IDAgOiArbXU7XG4gICAgc2lnbWEgPSBzaWdtYSA9PSBudWxsID8gMSA6ICtzaWdtYTtcbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgeTtcblxuICAgICAgLy8gSWYgYXZhaWxhYmxlLCB1c2UgdGhlIHNlY29uZCBwcmV2aW91c2x5LWdlbmVyYXRlZCB1bmlmb3JtIHJhbmRvbS5cbiAgICAgIGlmICh4ICE9IG51bGwpIHkgPSB4LCB4ID0gbnVsbDtcblxuICAgICAgLy8gT3RoZXJ3aXNlLCBnZW5lcmF0ZSBhIG5ldyB4IGFuZCB5LlxuICAgICAgZWxzZSBkbyB7XG4gICAgICAgIHggPSBzb3VyY2UoKSAqIDIgLSAxO1xuICAgICAgICB5ID0gc291cmNlKCkgKiAyIC0gMTtcbiAgICAgICAgciA9IHggKiB4ICsgeSAqIHk7XG4gICAgICB9IHdoaWxlICghciB8fCByID4gMSk7XG5cbiAgICAgIHJldHVybiBtdSArIHNpZ21hICogeSAqIE1hdGguc3FydCgtMiAqIE1hdGgubG9nKHIpIC8gcik7XG4gICAgfTtcbiAgfVxuXG4gIHJhbmRvbU5vcm1hbC5zb3VyY2UgPSBzb3VyY2VSYW5kb21Ob3JtYWw7XG5cbiAgcmV0dXJuIHJhbmRvbU5vcm1hbDtcbn0pKGRlZmF1bHRTb3VyY2UpO1xuIiwiZXhwb3J0IGZ1bmN0aW9uIGluaXRSYW5nZShkb21haW4sIHJhbmdlKSB7XG4gIHN3aXRjaCAoYXJndW1lbnRzLmxlbmd0aCkge1xuICAgIGNhc2UgMDogYnJlYWs7XG4gICAgY2FzZSAxOiB0aGlzLnJhbmdlKGRvbWFpbik7IGJyZWFrO1xuICAgIGRlZmF1bHQ6IHRoaXMucmFuZ2UocmFuZ2UpLmRvbWFpbihkb21haW4pOyBicmVhaztcbiAgfVxuICByZXR1cm4gdGhpcztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGluaXRJbnRlcnBvbGF0b3IoZG9tYWluLCBpbnRlcnBvbGF0b3IpIHtcbiAgc3dpdGNoIChhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgY2FzZSAwOiBicmVhaztcbiAgICBjYXNlIDE6IHtcbiAgICAgIGlmICh0eXBlb2YgZG9tYWluID09PSBcImZ1bmN0aW9uXCIpIHRoaXMuaW50ZXJwb2xhdG9yKGRvbWFpbik7XG4gICAgICBlbHNlIHRoaXMucmFuZ2UoZG9tYWluKTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBkZWZhdWx0OiB7XG4gICAgICB0aGlzLmRvbWFpbihkb21haW4pO1xuICAgICAgaWYgKHR5cGVvZiBpbnRlcnBvbGF0b3IgPT09IFwiZnVuY3Rpb25cIikgdGhpcy5pbnRlcnBvbGF0b3IoaW50ZXJwb2xhdG9yKTtcbiAgICAgIGVsc2UgdGhpcy5yYW5nZShpbnRlcnBvbGF0b3IpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiB0aGlzO1xufVxuIiwiaW1wb3J0IHthc2NlbmRpbmcsIGJpc2VjdCwgcXVhbnRpbGVTb3J0ZWQgYXMgdGhyZXNob2xkfSBmcm9tIFwiZDMtYXJyYXlcIjtcbmltcG9ydCB7aW5pdFJhbmdlfSBmcm9tIFwiLi9pbml0LmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHF1YW50aWxlKCkge1xuICB2YXIgZG9tYWluID0gW10sXG4gICAgICByYW5nZSA9IFtdLFxuICAgICAgdGhyZXNob2xkcyA9IFtdLFxuICAgICAgdW5rbm93bjtcblxuICBmdW5jdGlvbiByZXNjYWxlKCkge1xuICAgIHZhciBpID0gMCwgbiA9IE1hdGgubWF4KDEsIHJhbmdlLmxlbmd0aCk7XG4gICAgdGhyZXNob2xkcyA9IG5ldyBBcnJheShuIC0gMSk7XG4gICAgd2hpbGUgKCsraSA8IG4pIHRocmVzaG9sZHNbaSAtIDFdID0gdGhyZXNob2xkKGRvbWFpbiwgaSAvIG4pO1xuICAgIHJldHVybiBzY2FsZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNjYWxlKHgpIHtcbiAgICByZXR1cm4geCA9PSBudWxsIHx8IGlzTmFOKHggPSAreCkgPyB1bmtub3duIDogcmFuZ2VbYmlzZWN0KHRocmVzaG9sZHMsIHgpXTtcbiAgfVxuXG4gIHNjYWxlLmludmVydEV4dGVudCA9IGZ1bmN0aW9uKHkpIHtcbiAgICB2YXIgaSA9IHJhbmdlLmluZGV4T2YoeSk7XG4gICAgcmV0dXJuIGkgPCAwID8gW05hTiwgTmFOXSA6IFtcbiAgICAgIGkgPiAwID8gdGhyZXNob2xkc1tpIC0gMV0gOiBkb21haW5bMF0sXG4gICAgICBpIDwgdGhyZXNob2xkcy5sZW5ndGggPyB0aHJlc2hvbGRzW2ldIDogZG9tYWluW2RvbWFpbi5sZW5ndGggLSAxXVxuICAgIF07XG4gIH07XG5cbiAgc2NhbGUuZG9tYWluID0gZnVuY3Rpb24oXykge1xuICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIGRvbWFpbi5zbGljZSgpO1xuICAgIGRvbWFpbiA9IFtdO1xuICAgIGZvciAobGV0IGQgb2YgXykgaWYgKGQgIT0gbnVsbCAmJiAhaXNOYU4oZCA9ICtkKSkgZG9tYWluLnB1c2goZCk7XG4gICAgZG9tYWluLnNvcnQoYXNjZW5kaW5nKTtcbiAgICByZXR1cm4gcmVzY2FsZSgpO1xuICB9O1xuXG4gIHNjYWxlLnJhbmdlID0gZnVuY3Rpb24oXykge1xuICAgIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID8gKHJhbmdlID0gQXJyYXkuZnJvbShfKSwgcmVzY2FsZSgpKSA6IHJhbmdlLnNsaWNlKCk7XG4gIH07XG5cbiAgc2NhbGUudW5rbm93biA9IGZ1bmN0aW9uKF8pIHtcbiAgICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA/ICh1bmtub3duID0gXywgc2NhbGUpIDogdW5rbm93bjtcbiAgfTtcblxuICBzY2FsZS5xdWFudGlsZXMgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhyZXNob2xkcy5zbGljZSgpO1xuICB9O1xuXG4gIHNjYWxlLmNvcHkgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gcXVhbnRpbGUoKVxuICAgICAgICAuZG9tYWluKGRvbWFpbilcbiAgICAgICAgLnJhbmdlKHJhbmdlKVxuICAgICAgICAudW5rbm93bih1bmtub3duKTtcbiAgfTtcblxuICByZXR1cm4gaW5pdFJhbmdlLmFwcGx5KHNjYWxlLCBhcmd1bWVudHMpO1xufVxuIiwiLy9AdHMtY2hlY2tcbid1c2Ugc3RyaWN0J1xuXG4vKiogQHR5cGVkZWYge3sgZGltczogb2JqZWN0LCBjcnM6IHN0cmluZywgdGlsZVNpemVDZWxsOiBudW1iZXIsIG9yaWdpblBvaW50OiB7eDpudW1iZXIseTpudW1iZXJ9LCByZXNvbHV0aW9uR2VvOiBudW1iZXIsIHRpbGluZ0JvdW5kczppbXBvcnQoXCIuLi9HZW9DYW52YXMuanNcIikuRW52ZWxvcGUgfX0gR3JpZEluZm8gKi9cblxuaW1wb3J0IHsgY3N2IH0gZnJvbSAnZDMtZmV0Y2gnXG5pbXBvcnQgeyBEYXRhc2V0IH0gZnJvbSAnLi4vRGF0YXNldC5qcydcblxuLyoqXG4gKiBBIGRhdGFzZXQgY29tcG9zZWQgb2YgYSBzaW5nbGUgQ1NWIGZpbGUgKG5vdCB0aWxlZCkuXG4gKlxuICogQGF1dGhvciBKb3NlcGggRGF2aWVzLCBKdWxpZW4gR2FmZnVyaVxuICovXG5leHBvcnQgY2xhc3MgQ1NWR3JpZCBleHRlbmRzIERhdGFzZXQge1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7aW1wb3J0KFwiLi4vTWFwXCIpfSBtYXAgVGhlIG1hcC5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXJsIFRoZSBVUkwgb2YgdGhlIGRhdGFzZXQuXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHJlc29sdXRpb24gVGhlIGRhdGFzZXQgcmVzb2x1dGlvbiBpbiBnZW9ncmFwaGljYWwgdW5pdC5cbiAgICAgKiBAcGFyYW0ge3twcmVwcm9jZXNzPzooZnVuY3Rpb24oaW1wb3J0KFwiLi4vRGF0YXNldC5qc1wiKS5DZWxsKTpib29sZWFuKX19IG9wdHNcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihtYXAsIHVybCwgcmVzb2x1dGlvbiwgb3B0cyA9IHt9KSB7XG4gICAgICAgIHN1cGVyKG1hcCwgdXJsLCByZXNvbHV0aW9uLCBvcHRzKVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKiBAdHlwZSB7QXJyYXkuPGltcG9ydChcIi4uL0RhdGFzZXQuanNcIikuQ2VsbD59ICovXG4gICAgICAgIHRoaXMuY2VsbHMgPSBbXVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAgICAgKiBAcHJpdmF0ZSAgKi9cbiAgICAgICAgdGhpcy5pbmZvTG9hZGluZ1N0YXR1cyA9ICdub3RMb2FkZWQnXG5cbiAgICAgICAgLy9nZXQgZGF0YVxuICAgICAgICB0aGlzLmdldERhdGEodW5kZWZpbmVkKVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlcXVlc3QgZGF0YSB3aXRoaW4gYSBnZW9ncmFwaGljIGVudmVsb3BlLlxuICAgICAqIEBwYXJhbSB7aW1wb3J0KFwiLi4vR2VvQ2FudmFzLmpzXCIpLkVudmVsb3BlfHVuZGVmaW5lZH0gZVxuICAgICAqL1xuICAgIGdldERhdGEoZSkge1xuICAgICAgICAvL2NoZWNrIGlmIGRhdGEgYWxyZWFkeSBsb2FkZWRcbiAgICAgICAgaWYgKHRoaXMuaW5mb0xvYWRpbmdTdGF0dXMgIT0gJ25vdExvYWRlZCcpIHJldHVybiB0aGlzXG5cbiAgICAgICAgLy9sb2FkIGRhdGFcbiAgICAgICAgdGhpcy5pbmZvTG9hZGluZ1N0YXR1cyA9ICdsb2FkaW5nJ1xuICAgICAgICAgICAgOyAoYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCBjc3YodGhpcy51cmwpXG5cbiAgICAgICAgICAgICAgICAgICAgLy9jb252ZXJ0IGNvb3JkaW5hdGVzIGluIG51bWJlcnNcbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBjIG9mIGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGMueCA9ICtjLnhcbiAgICAgICAgICAgICAgICAgICAgICAgIGMueSA9ICtjLnlcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIC8vcHJlcHJvY2Vzcy9maWx0ZXJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucHJlcHJvY2Vzcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jZWxscyA9IFtdXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGMgb2YgZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGIgPSB0aGlzLnByZXByb2Nlc3MoYylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYiA9PSBmYWxzZSkgY29udGludWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNlbGxzLnB1c2goYylcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2VsbHMgPSBkYXRhXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvL1RPRE8gY2hlY2sgaWYgcmVkcmF3IGlzIG5lY2Vzc2FyeVxuICAgICAgICAgICAgICAgICAgICAvL3RoYXQgaXMgaWYgdGhlIGRhdGFzZXQgYmVsb25ncyB0byBhIGxheWVyIHdoaWNoIGlzIHZpc2libGUgYXQgdGhlIGN1cnJlbnQgem9vbSBsZXZlbFxuXG4gICAgICAgICAgICAgICAgICAgIC8vZXhlY3V0ZSB0aGUgY2FsbGJhY2ssIHVzdWFsbHkgYSBkcmF3IGZ1bmN0aW9uXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm1hcCkgdGhpcy5tYXAucmVkcmF3KClcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLmluZm9Mb2FkaW5nU3RhdHVzID0gJ2xvYWRlZCdcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAvL21hcmsgYXMgZmFpbGVkXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5mb0xvYWRpbmdTdGF0dXMgPSAnZmFpbGVkJ1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNlbGxzID0gW11cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSgpXG5cbiAgICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGaWxsIHRoZSB2aWV3IGNhY2hlIHdpdGggYWxsIGNlbGxzIHdoaWNoIGFyZSB3aXRoaW4gYSBnZW9ncmFwaGljYWwgZW52ZWxvcGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge2ltcG9ydChcIi4uL0dlb0NhbnZhcy5qc1wiKS5FbnZlbG9wZX0gZXh0R2VvXG4gICAgICogQHJldHVybnMge3ZvaWR9XG4gICAgICovXG4gICAgdXBkYXRlVmlld0NhY2hlKGV4dEdlbykge1xuICAgICAgICAvL2RhdGEgbm90IGxvYWRlZCB5ZXRcbiAgICAgICAgaWYgKCF0aGlzLmNlbGxzKSByZXR1cm5cblxuICAgICAgICB0aGlzLmNlbGxzVmlld0NhY2hlID0gW11cbiAgICAgICAgZm9yIChjb25zdCBjZWxsIG9mIHRoaXMuY2VsbHMpIHtcbiAgICAgICAgICAgIGlmICgrY2VsbC54ICsgdGhpcy5yZXNvbHV0aW9uIDwgZXh0R2VvLnhNaW4pIGNvbnRpbnVlXG4gICAgICAgICAgICBpZiAoK2NlbGwueCAtIHRoaXMucmVzb2x1dGlvbiA+IGV4dEdlby54TWF4KSBjb250aW51ZVxuICAgICAgICAgICAgaWYgKCtjZWxsLnkgKyB0aGlzLnJlc29sdXRpb24gPCBleHRHZW8ueU1pbikgY29udGludWVcbiAgICAgICAgICAgIGlmICgrY2VsbC55IC0gdGhpcy5yZXNvbHV0aW9uID4gZXh0R2VvLnlNYXgpIGNvbnRpbnVlXG4gICAgICAgICAgICB0aGlzLmNlbGxzVmlld0NhY2hlLnB1c2goY2VsbClcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIi8vQHRzLWNoZWNrXG4ndXNlIHN0cmljdCdcblxuLyoqIEB0eXBlZGVmIHt7IGRpbXM6IG9iamVjdCwgY3JzOiBzdHJpbmcsIHRpbGVTaXplQ2VsbDogbnVtYmVyLCBvcmlnaW5Qb2ludDoge3g6bnVtYmVyLHk6bnVtYmVyfSwgcmVzb2x1dGlvbkdlbzogbnVtYmVyLCB0aWxpbmdCb3VuZHM6aW1wb3J0KFwiLi4vR2VvQ2FudmFzLmpzXCIpLkVudmVsb3BlIH19IEdyaWRJbmZvICovXG5cbmltcG9ydCB7IERhdGFzZXQgfSBmcm9tICcuLi9EYXRhc2V0LmpzJ1xuXG4vKipcbiAqIEEgZGF0YXNldCBjb21wb3NlZCBvZiBjZWxscyBkZWZpbmVkIGluIGphdmFzY3JpcHQsIG9yIGxvYWRlZCBvdXRzaWRlIG9mIGdyaWR2aXogbWFwLlxuICpcbiAqIEBhdXRob3IgSm9zZXBoIERhdmllcywgSnVsaWVuIEdhZmZ1cmlcbiAqL1xuZXhwb3J0IGNsYXNzIEpTR3JpZCBleHRlbmRzIERhdGFzZXQge1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSByZXNvbHV0aW9uIFRoZSBkYXRhc2V0IHJlc29sdXRpb24gaW4gZ2VvZ3JhcGhpY2FsIHVuaXQuXG4gICAgICogQHBhcmFtIHtBcnJheS48T2JqZWN0Pn0gY2VsbHMgVGhlIGNlbGxzLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHJlc29sdXRpb24sIGNlbGxzKSB7XG4gICAgICAgIHN1cGVyKHVuZGVmaW5lZCwgXCJcIiwgcmVzb2x1dGlvbilcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICogQHR5cGUge0FycmF5LjxpbXBvcnQoXCIuLi9NdWx0aVJlc29sdXRpb25EYXRhc2V0LmpzXCIpLkNlbGw+fSAqL1xuICAgICAgICB0aGlzLmNlbGxzID0gY2VsbHMgfHwgW11cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXF1ZXN0IGRhdGEgd2l0aGluIGEgZ2VvZ3JhcGhpYyBlbnZlbG9wZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7aW1wb3J0KFwiLi4vR2VvQ2FudmFzLmpzXCIpLkVudmVsb3BlfHVuZGVmaW5lZH0gZVxuICAgICAqL1xuICAgIGdldERhdGEoZSkgeyByZXR1cm4gdGhpcyB9XG5cbiAgICAvKipcbiAgICAgKiBGaWxsIHRoZSB2aWV3IGNhY2hlIHdpdGggYWxsIGNlbGxzIHdoaWNoIGFyZSB3aXRoaW4gYSBnZW9ncmFwaGljYWwgZW52ZWxvcGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge2ltcG9ydChcIi4uL0dlb0NhbnZhcy5qc1wiKS5FbnZlbG9wZX0gZXh0R2VvXG4gICAgICogQHJldHVybnMge3ZvaWR9XG4gICAgICovXG4gICAgdXBkYXRlVmlld0NhY2hlKGV4dEdlbykge1xuICAgICAgICAvL2RhdGEgbm90IGxvYWRlZCB5ZXRcbiAgICAgICAgaWYgKCF0aGlzLmNlbGxzKSByZXR1cm5cblxuICAgICAgICB0aGlzLmNlbGxzVmlld0NhY2hlID0gW11cbiAgICAgICAgZm9yIChjb25zdCBjZWxsIG9mIHRoaXMuY2VsbHMpIHtcbiAgICAgICAgICAgIGlmICgrY2VsbC54ICsgdGhpcy5yZXNvbHV0aW9uIDwgZXh0R2VvLnhNaW4pIGNvbnRpbnVlXG4gICAgICAgICAgICBpZiAoK2NlbGwueCAtIHRoaXMucmVzb2x1dGlvbiA+IGV4dEdlby54TWF4KSBjb250aW51ZVxuICAgICAgICAgICAgaWYgKCtjZWxsLnkgKyB0aGlzLnJlc29sdXRpb24gPCBleHRHZW8ueU1pbikgY29udGludWVcbiAgICAgICAgICAgIGlmICgrY2VsbC55IC0gdGhpcy5yZXNvbHV0aW9uID4gZXh0R2VvLnlNYXgpIGNvbnRpbnVlXG4gICAgICAgICAgICB0aGlzLmNlbGxzVmlld0NhY2hlLnB1c2goY2VsbClcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIi8vQHRzLWNoZWNrXG4ndXNlIHN0cmljdCdcblxuLyoqIEB0eXBlZGVmIHt7IGRpbXM6IG9iamVjdCwgY3JzOiBzdHJpbmcsIHRpbGVTaXplQ2VsbDogbnVtYmVyLCBvcmlnaW5Qb2ludDoge3g6bnVtYmVyLHk6bnVtYmVyfSwgcmVzb2x1dGlvbkdlbzogbnVtYmVyLCB0aWxpbmdCb3VuZHM6aW1wb3J0KFwiLi4vR2VvQ2FudmFzLmpzXCIpLkVudmVsb3BlIH19IEdyaWRJbmZvICovXG5cbi8vIGludGVybmFsXG5pbXBvcnQgeyBEYXRhc2V0IH0gZnJvbSAnLi4vRGF0YXNldC5qcydcbi8vaW1wb3J0IHsgbW9uaXRvciwgbW9uaXRvckR1cmF0aW9uIH0gZnJvbSAnLi4vdXRpbHMvVXRpbHMuanMnXG5cbi8vIGV4dGVybmFsXG5pbXBvcnQgeyBqc29uLCBjc3YgfSBmcm9tICdkMy1mZXRjaCdcblxuLyoqXG4gKiBBIHRpbGVkIGRhdGFzZXQsIGNvbXBvc2VkIG9mIENTViB0aWxlcy5cbiAqXG4gKiBAYXV0aG9yIEpvc2VwaCBEYXZpZXMsIEp1bGllbiBHYWZmdXJpXG4gKi9cbmV4cG9ydCBjbGFzcyBUaWxlZEdyaWQgZXh0ZW5kcyBEYXRhc2V0IHtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge2ltcG9ydChcIi4uL01hcFwiKX0gbWFwIFRoZSBtYXAuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVybCBUaGUgVVJMIG9mIHRoZSBkYXRhc2V0LlxuICAgICAqIEBwYXJhbSB7e3ByZXByb2Nlc3M/OihmdW5jdGlvbihpbXBvcnQoXCIuLi9EYXRhc2V0LmpzXCIpLkNlbGwpOmJvb2xlYW4pIH19IG9wdHNcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihtYXAsIHVybCwgb3B0cyA9IHt9KSB7XG4gICAgICAgIHN1cGVyKG1hcCwgdXJsLCAwLCBvcHRzKVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgZ3JpZCBpbmZvIG9iamVjdCwgZnJvbSB0aGUgaW5mby5qc29uIGZpbGUuXG4gICAgICAgICAqICBAdHlwZSB7R3JpZEluZm8gfCB1bmRlZmluZWR9XG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqICAqL1xuICAgICAgICB0aGlzLmluZm8gPSB1bmRlZmluZWRcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgICAgICogQHByaXZhdGUgICovXG4gICAgICAgIHRoaXMuaW5mb0xvYWRpbmdTdGF0dXMgPSAnbm90TG9hZGVkJ1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgY2FjaGUgb2YgdGhlIGxvYWRlZCB0aWxlcy4gSXQgaXMgZG91YmxlIGluZGV4ZWQ6IGJ5IHhUIGFuZCB0aGVuIHlULlxuICAgICAgICAgKiBFeGFtcGxlOiB0aGlzLmNhY2hlW3hUXVt5VF0gcmV0dXJucyB0aGUgdGlsZSBhdCBbeFRdW3lUXSBsb2NhdGlvbi5cbiAgICAgICAgICpcbiAgICAgICAgICogQHR5cGUge29iamVjdH1cbiAgICAgICAgICogKi9cbiAgICAgICAgdGhpcy5jYWNoZSA9IHt9XG5cbiAgICAgICAgLy9sYXVuY2ggbG9hZGluZ1xuICAgICAgICB0aGlzLmxvYWRJbmZvKClcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBMb2FkIHRoZSBpbmZvLmpzb24gZnJvbSB0aGUgdXJsLlxuICAgICAqIEByZXR1cm5zIHRoaXNcbiAgICAgKi9cbiAgICBsb2FkSW5mbygpIHtcbiAgICAgICAgaWYgKCF0aGlzLmluZm8gJiYgdGhpcy5pbmZvTG9hZGluZ1N0YXR1cyA9PT0gJ25vdExvYWRlZCcpIHtcbiAgICAgICAgICAgIDsgKGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBkYXRhID0gYXdhaXQganNvbih0aGlzLnVybCArICdpbmZvLmpzb24nKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmluZm8gPSBkYXRhXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVzb2x1dGlvbiA9IGRhdGEucmVzb2x1dGlvbkdlb1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmluZm9Mb2FkaW5nU3RhdHVzID0gJ2xvYWRlZCdcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXAucmVkcmF3KClcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAvL21hcmsgYXMgZmFpbGVkXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5mb0xvYWRpbmdTdGF0dXMgPSAnZmFpbGVkJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pKClcbiAgICAgICAgfSBlbHNlIGlmICgodGhpcy5pbmZvTG9hZGluZ1N0YXR1cyA9PT0gJ2xvYWRlZCcgfHwgdGhpcy5pbmZvTG9hZGluZ1N0YXR1cyA9PT0gJ2ZhaWxlZCcpKVxuICAgICAgICAgICAgdGhpcy5tYXAucmVkcmF3KClcbiAgICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb21wdXRlIGEgdGlsaW5nIGVudmVsb3BlIGZyb20gYSBnZW9ncmFwaGljYWwgZW52ZWxvcGUuXG4gICAgICogVGhpcyBpcyB0aGUgZnVuY3Rpb24gdG8gdXNlIHRvIGtub3cgd2hpY2ggdGlsZXMgdG8gZG93bmxvYWQgZm9yIGEgZ2VvZ3JhcGhpY2FsIHZpZXcuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge2ltcG9ydChcIi4uL0dlb0NhbnZhcy5qc1wiKS5FbnZlbG9wZX0gZVxuICAgICAqIEByZXR1cm5zIHtpbXBvcnQoXCIuLi9HZW9DYW52YXMuanNcIikuRW52ZWxvcGV8dW5kZWZpbmVkfVxuICAgICAqL1xuICAgIGdldFRpbGluZ0VudmVsb3BlKGUpIHtcbiAgICAgICAgaWYgKCF0aGlzLmluZm8pIHtcbiAgICAgICAgICAgIHRoaXMubG9hZEluZm8oKVxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwbyA9IHRoaXMuaW5mby5vcmlnaW5Qb2ludCxcbiAgICAgICAgICAgIHIgPSB0aGlzLmluZm8ucmVzb2x1dGlvbkdlbyxcbiAgICAgICAgICAgIHMgPSB0aGlzLmluZm8udGlsZVNpemVDZWxsXG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHhNaW46IE1hdGguZmxvb3IoKGUueE1pbiAtIHBvLngpIC8gKHIgKiBzKSksXG4gICAgICAgICAgICB4TWF4OiBNYXRoLmZsb29yKChlLnhNYXggLSBwby54KSAvIChyICogcykpLFxuICAgICAgICAgICAgeU1pbjogTWF0aC5mbG9vcigoZS55TWluIC0gcG8ueSkgLyAociAqIHMpKSxcbiAgICAgICAgICAgIHlNYXg6IE1hdGguZmxvb3IoKGUueU1heCAtIHBvLnkpIC8gKHIgKiBzKSksXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXF1ZXN0IGRhdGEgd2l0aGluIGEgZ2VvZ3JhcGhpYyBlbnZlbG9wZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7aW1wb3J0KCcuLi9HZW9DYW52YXMuanMnKS5FbnZlbG9wZX0gZXh0R2VvXG4gICAgICogQHJldHVybnMge3RoaXN9XG4gICAgICovXG4gICAgZ2V0RGF0YShleHRHZW8pIHtcbiAgICAgICAgLy9UT0RPIGVtcHR5IGNhY2hlIHdoZW4gaXQgZ2V0cyB0b28gYmlnID9cblxuICAgICAgICAvL2NoZWNrIGlmIGluZm8gaGFzIGJlZW4gbG9hZGVkXG4gICAgICAgIGlmICghdGhpcy5pbmZvKSByZXR1cm4gdGhpc1xuXG4gICAgICAgIC8vdGlsZXMgd2l0aGluIHRoZSBzY29wZVxuICAgICAgICAvKiogQHR5cGUge2ltcG9ydChcIi4uL0dlb0NhbnZhcy5qc1wiKS5FbnZlbG9wZXx1bmRlZmluZWR9ICovXG4gICAgICAgIGNvbnN0IHRiID0gdGhpcy5nZXRUaWxpbmdFbnZlbG9wZShleHRHZW8pXG4gICAgICAgIGlmICghdGIpIHJldHVybiB0aGlzXG5cbiAgICAgICAgLy9ncmlkIGJvdW5kc1xuICAgICAgICAvKiogQHR5cGUge2ltcG9ydChcIi4uL0dlb0NhbnZhcy5qc1wiKS5FbnZlbG9wZX0gKi9cbiAgICAgICAgY29uc3QgZ2IgPSB0aGlzLmluZm8udGlsaW5nQm91bmRzXG5cbiAgICAgICAgZm9yIChsZXQgeFQgPSBNYXRoLm1heCh0Yi54TWluLCBnYi54TWluKTsgeFQgPD0gTWF0aC5taW4odGIueE1heCwgZ2IueE1heCk7IHhUKyspIHtcbiAgICAgICAgICAgIGZvciAobGV0IHlUID0gTWF0aC5tYXgodGIueU1pbiwgZ2IueU1pbik7IHlUIDw9IE1hdGgubWluKHRiLnlNYXgsIGdiLnlNYXgpOyB5VCsrKSB7XG4gICAgICAgICAgICAgICAgLy9wcmVwYXJlIGNhY2hlXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmNhY2hlW3hUXSkgdGhpcy5jYWNoZVt4VF0gPSB7fVxuXG4gICAgICAgICAgICAgICAgLy9jaGVjayBpZiB0aWxlIGV4aXN0cyBpbiB0aGUgY2FjaGVcbiAgICAgICAgICAgICAgICAvKiogQHR5cGUge29iamVjdH0gKi9cbiAgICAgICAgICAgICAgICBsZXQgdGlsZSA9IHRoaXMuY2FjaGVbeFRdW3lUXVxuICAgICAgICAgICAgICAgIGlmICh0aWxlKSBjb250aW51ZVxuXG4gICAgICAgICAgICAgICAgLy9tYXJrIHRpbGUgYXMgbG9hZGluZ1xuICAgICAgICAgICAgICAgIHRoaXMuY2FjaGVbeFRdW3lUXSA9IFwibG9hZGluZ1wiO1xuICAgICAgICAgICAgICAgIChhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vcmVxdWVzdCB0aWxlXG4gICAgICAgICAgICAgICAgICAgIC8qKiBAdHlwZSB7QXJyYXkuPGltcG9ydChcIi4uL0RhdGFzZXQuanNcIikuQ2VsbD59ICAqL1xuICAgICAgICAgICAgICAgICAgICBsZXQgY2VsbHNcblxuICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLyoqIEB0eXBlIHtBcnJheS48aW1wb3J0KFwiLi4vRGF0YXNldC5qc1wiKS5DZWxsPn0gICovXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBkYXRhID0gYXdhaXQgY3N2KHRoaXMudXJsICsgeFQgKyAnLycgKyB5VCArICcuY3N2JylcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy9pZiAobW9uaXRvcikgbW9uaXRvckR1cmF0aW9uKCcqKiogVGlsZWRHcmlkIHBhcnNlIHN0YXJ0JylcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy9wcmVwcm9jZXNzL2ZpbHRlclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucHJlcHJvY2Vzcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNlbGxzID0gW11cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGMgb2YgZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBiID0gdGhpcy5wcmVwcm9jZXNzKGMpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChiID09IGZhbHNlKSBjb250aW51ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjZWxscy5wdXNoKGMpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjZWxscyA9IGRhdGFcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgLy9pZiAobW9uaXRvcikgbW9uaXRvckR1cmF0aW9uKCdwcmVwcm9jZXNzIC8gZmlsdGVyJylcbiAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vbWFyayBhcyBmYWlsZWRcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2FjaGVbeFRdW3lUXSA9ICdmYWlsZWQnXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIC8vc3RvcmUgdGlsZSBpbiBjYWNoZVxuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaW5mbykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignVGlsZSBpbmZvIGlua25vd24nKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdGlsZV8gPSBnZXRHcmlkVGlsZShjZWxscywgeFQsIHlULCB0aGlzLmluZm8pXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2FjaGVbeFRdW3lUXSA9IHRpbGVfXG5cbiAgICAgICAgICAgICAgICAgICAgLy9pZiAobW9uaXRvcikgbW9uaXRvckR1cmF0aW9uKCdzdG9yYWdlJylcblxuICAgICAgICAgICAgICAgICAgICAvL2lmIG5vIHJlZHJhdyBpcyBzcGVjaWZpZWQsIHRoZW4gbGVhdmVcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXAucmVkcmF3KClcblxuICAgICAgICAgICAgICAgICAgICAvL2NoZWNrIGlmIHJlZHJhdyBpcyByZWFsbHkgbmVlZGVkLCB0aGF0IGlzIGlmOlxuXG4gICAgICAgICAgICAgICAgICAgIC8vIDEuIHRoZSBkYXRhc2V0IGJlbG9uZ3MgdG8gYSBsYXllciB3aGljaCBpcyB2aXNpYmxlIGF0IHRoZSBjdXJyZW50IHpvb20gbGV2ZWxcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJlZHJhdyA9IGZhbHNlXG4gICAgICAgICAgICAgICAgICAgIC8vZ28gdGhyb3VnaCB0aGUgbGF5ZXJzXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHogPSB0aGlzLm1hcC5nZXRab29tKClcbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBsYXkgb2YgdGhpcy5tYXAubGF5ZXJzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobGF5LnZpc2libGUgJiYgIWxheS52aXNpYmxlKHopKSBjb250aW51ZVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFsYXkuZ2V0RGF0YXNldCkgY29udGludWVcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsYXkuZ2V0RGF0YXNldCh6KSAhPSB0aGlzKSBjb250aW51ZVxuICAgICAgICAgICAgICAgICAgICAgICAgLy9mb3VuZCBvbmUgbGF5ZXIuIE5vIG5lZWQgdG8gc2VlayBtb3JlLlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVkcmF3ID0gdHJ1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvL2lmIChtb25pdG9yKSBtb25pdG9yRHVyYXRpb24oJ2NoZWNrIHJlZHJhdyAxJylcblxuICAgICAgICAgICAgICAgICAgICBpZiAoIXJlZHJhdykgcmV0dXJuXG5cbiAgICAgICAgICAgICAgICAgICAgLy8gMi4gdGhlIHRpbGUgaXMgd2l0aGluIHRoZSB2aWV3LCB0aGF0IGlzIGl0cyBnZW8gZW52ZWxvcGUgaW50ZXJzZWN0cyB0aGUgdmlld2VyIGdlbyBlbnZlbG9wZS5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZW52ID0gdGhpcy5tYXAudXBkYXRlRXh0ZW50R2VvKClcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZW52VCA9IHRpbGVfLmV4dEdlb1xuICAgICAgICAgICAgICAgICAgICBpZiAoZW52LnhNYXggPD0gZW52VC54TWluKSByZXR1cm5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGVudi54TWluID49IGVudlQueE1heCkgcmV0dXJuXG4gICAgICAgICAgICAgICAgICAgIGlmIChlbnYueU1heCA8PSBlbnZULnlNaW4pIHJldHVyblxuICAgICAgICAgICAgICAgICAgICBpZiAoZW52LnlNaW4gPj0gZW52VC55TWF4KSByZXR1cm5cblxuICAgICAgICAgICAgICAgICAgICAvL2lmIChtb25pdG9yKSBtb25pdG9yRHVyYXRpb24oJ2NoZWNrIHJlZHJhdyAyJylcbiAgICAgICAgICAgICAgICAgICAgLy9pZiAobW9uaXRvcikgbW9uaXRvckR1cmF0aW9uKCcqKiogVGlsZWRHcmlkIHBhcnNlIGVuZCcpXG5cbiAgICAgICAgICAgICAgICAgICAgLy9yZWRyYXdcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXAucmVkcmF3KClcbiAgICAgICAgICAgICAgICB9KSgpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGaWxsIHRoZSB2aWV3IGNhY2hlIHdpdGggYWxsIGNlbGxzIHdoaWNoIGFyZSB3aXRoaW4gYSBnZW9ncmFwaGljYWwgZW52ZWxvcGUuXG4gICAgICogQGFic3RyYWN0XG4gICAgICogQHBhcmFtIHtpbXBvcnQoXCIuLi9HZW9DYW52YXMuanNcIikuRW52ZWxvcGV9IGV4dEdlb1xuICAgICAqIEByZXR1cm5zIHt2b2lkfVxuICAgICAqL1xuICAgIHVwZGF0ZVZpZXdDYWNoZShleHRHZW8pIHtcbiAgICAgICAgLy9cbiAgICAgICAgdGhpcy5jZWxsc1ZpZXdDYWNoZSA9IFtdXG5cbiAgICAgICAgLy9jaGVjayBpZiBpbmZvIGhhcyBiZWVuIGxvYWRlZFxuICAgICAgICBpZiAoIXRoaXMuaW5mbykgcmV0dXJuXG5cbiAgICAgICAgLy90aWxlcyB3aXRoaW4gdGhlIHNjb3BlXG4gICAgICAgIC8qKiBAdHlwZSB7aW1wb3J0KFwiLi4vR2VvQ2FudmFzLmpzXCIpLkVudmVsb3BlfHVuZGVmaW5lZH0gKi9cbiAgICAgICAgY29uc3QgdGIgPSB0aGlzLmdldFRpbGluZ0VudmVsb3BlKGV4dEdlbylcbiAgICAgICAgaWYgKCF0YikgcmV0dXJuXG5cbiAgICAgICAgLy9ncmlkIGJvdW5kc1xuICAgICAgICAvKiogQHR5cGUge2ltcG9ydChcIi4uL0dlb0NhbnZhcy5qc1wiKS5FbnZlbG9wZX0gKi9cbiAgICAgICAgY29uc3QgZ2IgPSB0aGlzLmluZm8udGlsaW5nQm91bmRzXG5cbiAgICAgICAgZm9yIChsZXQgeFQgPSBNYXRoLm1heCh0Yi54TWluLCBnYi54TWluKTsgeFQgPD0gTWF0aC5taW4odGIueE1heCwgZ2IueE1heCk7IHhUKyspIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5jYWNoZVt4VF0pIGNvbnRpbnVlXG4gICAgICAgICAgICBmb3IgKGxldCB5VCA9IE1hdGgubWF4KHRiLnlNaW4sIGdiLnlNaW4pOyB5VCA8PSBNYXRoLm1pbih0Yi55TWF4LCBnYi55TWF4KTsgeVQrKykge1xuICAgICAgICAgICAgICAgIC8vZ2V0IHRpbGVcbiAgICAgICAgICAgICAgICAvKiogQHR5cGUge29iamVjdH0gKi9cbiAgICAgICAgICAgICAgICBjb25zdCB0aWxlID0gdGhpcy5jYWNoZVt4VF1beVRdXG4gICAgICAgICAgICAgICAgaWYgKCF0aWxlIHx8IHR5cGVvZiB0aWxlID09PSAnc3RyaW5nJykgY29udGludWVcblxuICAgICAgICAgICAgICAgIC8vZ2V0IGNlbGxzXG4gICAgICAgICAgICAgICAgLy90aGlzLmNlbGxzVmlld0NhY2hlID0gdGhpcy5jZWxsc1ZpZXdDYWNoZS5jb25jYXQodGlsZS5jZWxscylcblxuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgY2VsbCBvZiB0aWxlLmNlbGxzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICgrY2VsbC54ICsgdGhpcy5yZXNvbHV0aW9uIDwgZXh0R2VvLnhNaW4pIGNvbnRpbnVlXG4gICAgICAgICAgICAgICAgICAgIGlmICgrY2VsbC54IC0gdGhpcy5yZXNvbHV0aW9uID4gZXh0R2VvLnhNYXgpIGNvbnRpbnVlXG4gICAgICAgICAgICAgICAgICAgIGlmICgrY2VsbC55ICsgdGhpcy5yZXNvbHV0aW9uIDwgZXh0R2VvLnlNaW4pIGNvbnRpbnVlXG4gICAgICAgICAgICAgICAgICAgIGlmICgrY2VsbC55IC0gdGhpcy5yZXNvbHV0aW9uID4gZXh0R2VvLnlNYXgpIGNvbnRpbnVlXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2VsbHNWaWV3Q2FjaGUucHVzaChjZWxsKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gZ2V0R3JpZFRpbGUoY2VsbHMsIHhULCB5VCwgZ3JpZEluZm8pIHtcblxuICAgIGNvbnN0IHRpbGUgPSB7fVxuXG4gICAgLyoqIEB0eXBlIHtBcnJheS48aW1wb3J0KFwiLi4vRGF0YXNldFwiKS5DZWxsPn0gKi9cbiAgICB0aWxlLmNlbGxzID0gY2VsbHNcbiAgICAvKiogQHR5cGUge251bWJlcn0gKi9cbiAgICB0aWxlLnggPSB4VFxuICAgIC8qKiBAdHlwZSB7bnVtYmVyfSAqL1xuICAgIHRpbGUueSA9IHlUXG5cbiAgICBjb25zdCByID0gZ3JpZEluZm8ucmVzb2x1dGlvbkdlb1xuICAgIGNvbnN0IHMgPSBncmlkSW5mby50aWxlU2l6ZUNlbGxcblxuICAgIC8qKiBAdHlwZSB7aW1wb3J0KFwiLi4vR2VvQ2FudmFzXCIpLkVudmVsb3BlfSAqL1xuICAgIHRpbGUuZXh0R2VvID0ge1xuICAgICAgICB4TWluOiBncmlkSW5mby5vcmlnaW5Qb2ludC54ICsgciAqIHMgKiB0aWxlLngsXG4gICAgICAgIHhNYXg6IGdyaWRJbmZvLm9yaWdpblBvaW50LnggKyByICogcyAqICh0aWxlLnggKyAxKSxcbiAgICAgICAgeU1pbjogZ3JpZEluZm8ub3JpZ2luUG9pbnQueSArIHIgKiBzICogdGlsZS55LFxuICAgICAgICB5TWF4OiBncmlkSW5mby5vcmlnaW5Qb2ludC55ICsgciAqIHMgKiAodGlsZS55ICsgMSksXG4gICAgfVxuXG4gICAgLy9jb252ZXJ0IGNlbGwgY29vcmRpbmF0ZXMgaW50byBnZW9ncmFwaGljYWwgY29vcmRpbmF0ZXNcbiAgICBmb3IgKGxldCBjZWxsIG9mIHRpbGUuY2VsbHMpIHtcbiAgICAgICAgY2VsbC54ID0gdGlsZS5leHRHZW8ueE1pbiArIGNlbGwueCAqIHJcbiAgICAgICAgY2VsbC55ID0gdGlsZS5leHRHZW8ueU1pbiArIGNlbGwueSAqIHJcbiAgICB9XG5cbiAgICByZXR1cm4gdGlsZVxufVxuIiwiLy9AdHMtY2hlY2tcbid1c2Ugc3RyaWN0J1xuXG5pbXBvcnQgeyBMYXllciB9IGZyb20gXCIuLi9MYXllci5qc1wiXG5cbi8qKlxuICpcbiAqIEEgbWFwIGJhY2tncm91bmQgbGF5ZXIgaW4gXCJTbGlwcHkgbWFwXCIgWFlaIHN0YW5kYXJkLlxuICogU2VlIGh0dHBzOi8vd2lraS5vcGVuc3RyZWV0bWFwLm9yZy93aWtpL1NsaXBweV9tYXBfdGlsZW5hbWVzXG4gKiBodHRwczovL3d3dy5tYXB0aWxlci5jb20vZ29vZ2xlLW1hcHMtY29vcmRpbmF0ZXMtdGlsZS1ib3VuZHMtcHJvamVjdGlvbi8jNi8yNy44OC80NC40OFxuICogXG4gKiBAYXV0aG9yIEp1bGllbiBHYWZmdXJpXG4gKi9cbmV4cG9ydCBjbGFzcyBCYWNrZ3JvdW5kTGF5ZXIgZXh0ZW5kcyBMYXllciB7XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtvYmplY3R9IG9wdHNcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihvcHRzKSB7XG4gICAgICAgIHN1cGVyKG9wdHMpXG4gICAgICAgIG9wdHMgPSBvcHRzIHx8IHt9XG5cbiAgICAgICAgLyoqIFRoZSBpbWFnZSBjYWNoZSwgaW5kZXhlZCBieSB6L3kveCAqL1xuICAgICAgICB0aGlzLmNhY2hlID0ge31cblxuICAgICAgICAvKipcbiAgICAgICAgICogQHR5cGUge3N0cmluZ30gKi9cbiAgICAgICAgdGhpcy51cmwgPSBvcHRzLnVybFxuICAgICAgICAvKiogQHR5cGUge2Z1bmN0aW9uKG51bWJlcixudW1iZXIsbnVtYmVyKTpzdHJpbmd9ICovXG4gICAgICAgIHRoaXMudXJsRnVuID0gb3B0cy51cmxGdW4gfHwgKCh4LCB5LCB6KSA9PiB0aGlzLnVybCArIHogKyAnLycgKyB4ICsgJy8nICsgeSArICcucG5nJylcblxuICAgICAgICAvKiogQHR5cGUge0FycmF5LjxudW1iZXI+fSAqL1xuICAgICAgICB0aGlzLnJlc29sdXRpb25zID0gb3B0cy5yZXNvbHV0aW9uc1xuICAgICAgICBpZiAoIXRoaXMucmVzb2x1dGlvbnMgfHwgdGhpcy5yZXNvbHV0aW9ucy5sZW5ndGggPT0gMClcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTm8gcmVzb2x1dGlvbnMgcHJvdmlkZWQgZm9yIGJhY2tncm91bmQgbGF5ZXInKVxuXG4gICAgICAgIC8qKiBAdHlwZSB7bnVtYmVyfSAqL1xuICAgICAgICB0aGlzLm5iUGl4ID0gb3B0cy5uYlBpeCB8fCAyNTZcbiAgICAgICAgLyoqIENSUyBjb29yZGluYXRlcyBvZiB0b3AgbGVmdCBjb3JuZXJcbiAgICAgICAgICogQHR5cGUge0FycmF5LjxudW1iZXI+fSAqL1xuICAgICAgICB0aGlzLm9yaWdpbiA9IG9wdHMub3JpZ2luIHx8IFswLCAwXVxuICAgICAgICAvKiogQHR5cGUge251bWJlcn0gKi9cbiAgICAgICAgdGhpcy56MCA9IG9wdHMuejAgfHwgMFxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB6L3gveSBjYWNoZSBkYXRhLlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB6XG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHhcbiAgICAgKiBAcGFyYW0ge251bWJlcn0geVxuICAgICAqIEByZXR1cm5zIHtIVE1MSW1hZ2VFbGVtZW50fHN0cmluZ3x1bmRlZmluZWR9XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBnZXQoeiwgeCwgeSkge1xuICAgICAgICBsZXQgZCA9IHRoaXMuY2FjaGVbel1cbiAgICAgICAgaWYgKCFkKSByZXR1cm5cbiAgICAgICAgZCA9IGRbeF1cbiAgICAgICAgaWYgKCFkKSByZXR1cm5cbiAgICAgICAgcmV0dXJuIGRbeV1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgei94L3kgY2FjaGUgZGF0YS5cbiAgICAgKiBAcGFyYW0ge0hUTUxJbWFnZUVsZW1lbnR8c3RyaW5nfSBpbWdcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gelxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB4XG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHlcbiAgICAgKiBAcmV0dXJuc1xuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgcHV0KGltZywgeiwgeCwgeSkge1xuICAgICAgICBpZiAoIXRoaXMuY2FjaGVbel0pIHRoaXMuY2FjaGVbel0gPSB7fVxuICAgICAgICBpZiAoIXRoaXMuY2FjaGVbel1beF0pIHRoaXMuY2FjaGVbel1beF0gPSB7fVxuICAgICAgICB0aGlzLmNhY2hlW3pdW3hdW3ldID0gaW1nXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtpbXBvcnQoXCIuLi9HZW9DYW52YXNcIikuR2VvQ2FudmFzfSBnZW9DYW52YXMgVGhlIGNhbnZhcyB3aGVyZSB0byBkcmF3IHRoZSBsYXllci5cbiAgICAgKiBAcmV0dXJucyB7dm9pZH1cbiAgICAgKi9cbiAgICBkcmF3KGdlb0NhbnZhcykge1xuXG4gICAgICAgIGlmICghdGhpcy5yZXNvbHV0aW9ucyB8fCB0aGlzLnJlc29sdXRpb25zLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdObyByZXNvbHV0aW9ucyBwcm92aWRlZCBmb3IgYmFja2dyb3VuZCBsYXllcicpXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuXG4gICAgICAgIC8vXG4gICAgICAgIGNvbnN0IHogPSBnZW9DYW52YXMudmlldy56XG4gICAgICAgIGNvbnN0IHgwID0gdGhpcy5vcmlnaW5bMF0sXG4gICAgICAgICAgICB5MCA9IHRoaXMub3JpZ2luWzFdXG5cbiAgICAgICAgLy9nZXQgem9vbSBsZXZlbCBhbmQgcmVzb2x1dGlvblxuICAgICAgICBsZXQgel8gPSAwXG4gICAgICAgIGZvciAoel8gPSAwOyB6XyA8IHRoaXMucmVzb2x1dGlvbnMubGVuZ3RoOyB6XysrKSBpZiAodGhpcy5yZXNvbHV0aW9uc1t6X10gPCB6KSBicmVha1xuICAgICAgICB6XyAtPSAxXG4gICAgICAgIHpfID0gTWF0aC5tYXgoMCwgel8pXG4gICAgICAgIHpfID0gTWF0aC5taW4oel8sIHRoaXMucmVzb2x1dGlvbnMubGVuZ3RoIC0gMSlcbiAgICAgICAgLy9jb25zb2xlLmxvZyh0aGlzLnJlc29sdXRpb25zLmxlbmd0aCwgeilcbiAgICAgICAgY29uc3QgcmVzID0gdGhpcy5yZXNvbHV0aW9uc1t6X11cblxuICAgICAgICB6XyArPSB0aGlzLnowXG5cbiAgICAgICAgY29uc3Qgc2l6ZUcgPSB0aGlzLm5iUGl4ICogcmVzXG4gICAgICAgIGNvbnN0IHNpemUgPSBzaXplRyAvIHpcblxuICAgICAgICAvL2dldCB0aWxlIG51bWJlcnNcbiAgICAgICAgY29uc3QgeEdlb1RvVE1TID0gKHgpID0+IE1hdGguY2VpbCgoeCAtIHgwKSAvIHNpemVHKVxuICAgICAgICBjb25zdCB5R2VvVG9UTVMgPSAoeSkgPT4gTWF0aC5jZWlsKC0oeSAtIHkwKSAvIHNpemVHKVxuICAgICAgICBjb25zdCB4TWluID0geEdlb1RvVE1TKGdlb0NhbnZhcy5leHRHZW8ueE1pbikgLSAxXG4gICAgICAgIGNvbnN0IHhNYXggPSB4R2VvVG9UTVMoZ2VvQ2FudmFzLmV4dEdlby54TWF4KVxuICAgICAgICBjb25zdCB5TWF4ID0geUdlb1RvVE1TKGdlb0NhbnZhcy5leHRHZW8ueU1pbilcbiAgICAgICAgY29uc3QgeU1pbiA9IHlHZW9Ub1RNUyhnZW9DYW52YXMuZXh0R2VvLnlNYXgpIC0gMVxuXG4gICAgICAgIC8vaGFuZGxlIGltYWdlc1xuICAgICAgICBmb3IgKGxldCB4ID0geE1pbjsgeCA8IHhNYXg7IHgrKykge1xuICAgICAgICAgICAgZm9yIChsZXQgeSA9IHlNaW47IHkgPCB5TWF4OyB5KyspIHtcbiAgICAgICAgICAgICAgICAvL2dldCBpbWFnZVxuICAgICAgICAgICAgICAgIGxldCBpbWcgPSB0aGlzLmdldCh6XywgeCwgeSlcblxuICAgICAgICAgICAgICAgIC8vbG9hZCBpbWFnZVxuICAgICAgICAgICAgICAgIGlmICghaW1nKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGltZyA9IG5ldyBJbWFnZSgpXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHV0KGltZywgel8sIHgsIHkpXG4gICAgICAgICAgICAgICAgICAgIGltZy5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBnZW9DYW52YXMucmVkcmF3KClcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpbWcub25lcnJvciA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vY2FzZSB3aGVuIG5vIGltYWdlXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnB1dCgnZmFpbGVkJywgel8sIHgsIHkpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaW1nLnNyYyA9IHRoaXMudXJsRnVuKHgsIHksIHpfKVxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vY2FzZSB3aGVuIG5vIGltYWdlXG4gICAgICAgICAgICAgICAgaWYgKGltZyA9PT0gJ2ZhaWxlZCcpIGNvbnRpbnVlXG4gICAgICAgICAgICAgICAgaWYgKCEoaW1nIGluc3RhbmNlb2YgSFRNTEltYWdlRWxlbWVudCkpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coaW1nKVxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoaW1nLndpZHRoID09IDAgfHwgaW1nLmhlaWdodCA9PSAwKSBjb250aW51ZVxuXG4gICAgICAgICAgICAgICAgLy9kcmF3IGltYWdlXG4gICAgICAgICAgICAgICAgY29uc3QgeEdlbyA9IHgwICsgeCAqIHNpemVHXG4gICAgICAgICAgICAgICAgY29uc3QgeUdlbyA9IHkwIC0geSAqIHNpemVHXG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgZ2VvQ2FudmFzLmluaXRDYW52YXNUcmFuc2Zvcm0oKVxuICAgICAgICAgICAgICAgICAgICBnZW9DYW52YXMuY3R4LmRyYXdJbWFnZShpbWcsIGdlb0NhbnZhcy5nZW9Ub1BpeFgoeEdlbyksIGdlb0NhbnZhcy5nZW9Ub1BpeFkoeUdlbyksIHNpemUsIHNpemUpXG4gICAgICAgICAgICAgICAgICAgIC8vY2cuY3R4LmRyYXdJbWFnZShpbWcsIHhHZW8sIHlHZW8sIHNpemVHLCAtc2l6ZUcpXG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcilcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH1cbn1cbiIsIi8vQHRzLWNoZWNrXG4ndXNlIHN0cmljdCdcblxuaW1wb3J0IHsgTGF5ZXIgfSBmcm9tIFwiLi4vTGF5ZXIuanNcIlxuXG4vKipcbiAqXG4gKiBBIG1hcCBXTVMgYmFja2dyb3VuZCBsYXllci5cbiAqIFxuICogQGF1dGhvciBKdWxpZW4gR2FmZnVyaVxuICovXG5leHBvcnQgY2xhc3MgQmFja2dyb3VuZExheWVyV01TIGV4dGVuZHMgTGF5ZXIge1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRzXG4gICAgICovXG4gICAgY29uc3RydWN0b3Iob3B0cykge1xuICAgICAgICBzdXBlcihvcHRzKVxuICAgICAgICBvcHRzID0gb3B0cyB8fCB7fVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAdHlwZSB7c3RyaW5nfSAqL1xuICAgICAgICB0aGlzLnVybCA9IG9wdHMudXJsXG5cbiAgICAgICAgLyoqIEB0eXBlIHtIVE1MSW1hZ2VFbGVtZW50fHVuZGVmaW5lZH0gKi9cbiAgICAgICAgdGhpcy5pbWcgPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtudW1iZXJ8dW5kZWZpbmVkfSAqL1xuICAgICAgICB0aGlzLnhNaW4gPSB1bmRlZmluZWQ7XG4gICAgICAgIC8qKiBAdHlwZSB7bnVtYmVyfHVuZGVmaW5lZH0gKi9cbiAgICAgICAgdGhpcy54TWF4ID0gdW5kZWZpbmVkO1xuICAgICAgICAvKiogQHR5cGUge251bWJlcnx1bmRlZmluZWR9ICovXG4gICAgICAgIHRoaXMueU1pbiA9IHVuZGVmaW5lZDtcbiAgICAgICAgLyoqIEB0eXBlIHtudW1iZXJ8dW5kZWZpbmVkfSAqL1xuICAgICAgICB0aGlzLnlNYXggPSB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgLyoqIENoZWNrIGlmIHRoZSB2aWV3IGhhcyBtb3ZlZCBhbmQgYSBuZXcgaW1hZ2UgbmVlZHMgdG8gYmUgcmV0cmlldmVkLlxuICAgICAqIEBwcml2YXRlICovXG4gICAgaGFzTW92ZWQoZXh0R2VvKSB7XG4gICAgICAgIGlmICgoZXh0R2VvLnhNaW4pICE9IHRoaXMueE1pbikgcmV0dXJuIHRydWVcbiAgICAgICAgZWxzZSBpZiAoKGV4dEdlby54TWF4KSAhPSB0aGlzLnhNYXgpIHJldHVybiB0cnVlXG4gICAgICAgIGVsc2UgaWYgKChleHRHZW8ueU1pbikgIT0gdGhpcy55TWluKSByZXR1cm4gdHJ1ZVxuICAgICAgICBlbHNlIGlmICgoZXh0R2VvLnlNYXgpICE9IHRoaXMueU1heCkgcmV0dXJuIHRydWVcbiAgICAgICAgZWxzZSByZXR1cm4gZmFsc2VcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7aW1wb3J0KFwiLi4vR2VvQ2FudmFzXCIpLkdlb0NhbnZhc30gZ2VvQ2FudmFzIFRoZSBjYW52YXMgd2hlcmUgdG8gZHJhdyB0aGUgbGF5ZXIuXG4gICAgICogQHJldHVybnMge3ZvaWR9XG4gICAgICovXG4gICAgZHJhdyhnZW9DYW52YXMpIHtcblxuICAgICAgICAvL3VwZGF0ZSBtYXAgZXh0ZW50XG4gICAgICAgIGdlb0NhbnZhcy51cGRhdGVFeHRlbnRHZW8oMClcblxuICAgICAgICBpZiAoIXRoaXMuaGFzTW92ZWQoZ2VvQ2FudmFzLmV4dEdlbykgJiYgdGhpcy5pbWcpIHtcbiAgICAgICAgICAgIC8vdGhlIG1hcCBkaWQgbm90IG1vdmUgYW5kIHRoZSBpbWFnZSB3YXMgYWxyZWFkeSBkb3dubG9hZGVkOiBkcmF3IHRoZSBpbWFnZVxuICAgICAgICAgICAgZ2VvQ2FudmFzLmluaXRDYW52YXNUcmFuc2Zvcm0oKVxuICAgICAgICAgICAgZ2VvQ2FudmFzLmN0eC5kcmF3SW1hZ2UodGhpcy5pbWcsIDAsIDAsIGdlb0NhbnZhcy53LCBnZW9DYW52YXMuaClcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy90aGUgbWFwIG1vdmVkOiByZXRyaWV2ZSBuZXcgaW1hZ2VcblxuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIHRoaXMueE1pbiA9IGdlb0NhbnZhcy5leHRHZW8ueE1pblxuICAgICAgICAgICAgdGhpcy54TWF4ID0gZ2VvQ2FudmFzLmV4dEdlby54TWF4XG4gICAgICAgICAgICB0aGlzLnlNaW4gPSBnZW9DYW52YXMuZXh0R2VvLnlNaW5cbiAgICAgICAgICAgIHRoaXMueU1heCA9IGdlb0NhbnZhcy5leHRHZW8ueU1heFxuXG4gICAgICAgICAgICAvL2J1aWxkIFdNUyBVUkxcbiAgICAgICAgICAgIGNvbnN0IHVybCA9IFtdXG4gICAgICAgICAgICB1cmwucHVzaCh0aGlzLnVybClcbiAgICAgICAgICAgIHVybC5wdXNoKFwiJndpZHRoPVwiKVxuICAgICAgICAgICAgdXJsLnB1c2goZ2VvQ2FudmFzLncpXG4gICAgICAgICAgICB1cmwucHVzaChcIiZoZWlnaHQ9XCIpXG4gICAgICAgICAgICB1cmwucHVzaChnZW9DYW52YXMuaClcbiAgICAgICAgICAgIC8vYmJveDogeG1pbiB5bWluIHhtYXggeW1heFxuICAgICAgICAgICAgdXJsLnB1c2goXCImYmJveD1cIilcbiAgICAgICAgICAgIHVybC5wdXNoKGdlb0NhbnZhcy5leHRHZW8ueE1pbilcbiAgICAgICAgICAgIHVybC5wdXNoKFwiLFwiKVxuICAgICAgICAgICAgdXJsLnB1c2goZ2VvQ2FudmFzLmV4dEdlby55TWluKVxuICAgICAgICAgICAgdXJsLnB1c2goXCIsXCIpXG4gICAgICAgICAgICB1cmwucHVzaChnZW9DYW52YXMuZXh0R2VvLnhNYXgpXG4gICAgICAgICAgICB1cmwucHVzaChcIixcIilcbiAgICAgICAgICAgIHVybC5wdXNoKGdlb0NhbnZhcy5leHRHZW8ueU1heClcblxuICAgICAgICAgICAgY29uc3QgdXJsUyA9IHVybC5qb2luKFwiXCIpXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKHVybFMpXG5cbiAgICAgICAgICAgIGlmICghdGhpcy5pbWcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmltZyA9IG5ldyBJbWFnZSgpXG4gICAgICAgICAgICAgICAgdGhpcy5pbWcub25sb2FkID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBnZW9DYW52YXMucmVkcmF3KClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5pbWcub25lcnJvciA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy9jYXNlIHdoZW4gbm8gaW1hZ2VcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFwiQ291bGQgbm90IHJldHJpZXZlIFdNUyBiYWNrZ3JvdW5kIGltYWdlIGZyb21cIiwgdXJsUylcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vc2V0IFVSTCB0byBsYXVuY2ggdGhlIGRvd25sb2FkXG4gICAgICAgICAgICB0aGlzLmltZy5zcmMgPSB1cmxTXG4gICAgICAgIH1cblxuICAgIH1cbn1cbiIsIi8vQHRzLWNoZWNrXG4ndXNlIHN0cmljdCdcblxuaW1wb3J0IHsgTGF5ZXIgfSBmcm9tIFwiLi4vTGF5ZXIuanNcIlxuXG4vKipcbiAqIEEgbGF5ZXIsIHdoaWNoIHNwZWNpZmllcyBhIGRhdGFzZXQgdG8gYmUgc2hvd24gd2l0aCBzcGVjaWZpZWQgc3R5bGVzLlxuICpcbiAqIEBhdXRob3IgSm9zZXBoIERhdmllcywgSnVsaWVuIEdhZmZ1cmlcbiAqL1xuZXhwb3J0IGNsYXNzIEdyaWRMYXllciBleHRlbmRzIExheWVyIHtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge2ltcG9ydChcIi4uL0RhdGFzZXRcIikuRGF0YXNldHxpbXBvcnQoXCIuLi9NdWx0aVJlc29sdXRpb25EYXRhc2V0XCIpLk11bHRpUmVzb2x1dGlvbkRhdGFzZXR9IGRhdGFzZXQgVGhlIGRhdGFzZXQgdG8gc2hvdy5cbiAgICAgKiBAcGFyYW0ge0FycmF5LjxpbXBvcnQoXCIuLi9TdHlsZVwiKS5TdHlsZT59IHN0eWxlcyBUaGUgc3R5bGVzLCBvcmRlcmVkIGluIGRyYXdpbmcgb3JkZXIuXG4gICAgICogQHBhcmFtIHt7dmlzaWJsZT86ZnVuY3Rpb24obnVtYmVyKTpib29sZWFuLGFscGhhPzpmdW5jdGlvbihudW1iZXIpOm51bWJlcixibGVuZE9wZXJhdGlvbj86ZnVuY3Rpb24obnVtYmVyKTpHbG9iYWxDb21wb3NpdGVPcGVyYXRpb24sbWluUGl4ZWxzUGVyQ2VsbD86bnVtYmVyLGNlbGxJbmZvSFRNTD86ZnVuY3Rpb24oaW1wb3J0KFwiLi4vRGF0YXNldFwiKS5DZWxsKTpzdHJpbmd9fSBvcHRzXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoZGF0YXNldCwgc3R5bGVzLCBvcHRzID0ge30pIHtcbiAgICAgICAgc3VwZXIob3B0cylcbiAgICAgICAgb3B0cyA9IG9wdHMgfHwge31cblxuICAgICAgICAvKiogQHR5cGUge2ltcG9ydChcIi4uL0RhdGFzZXRcIikuRGF0YXNldHxpbXBvcnQoXCIuLi9NdWx0aVJlc29sdXRpb25EYXRhc2V0XCIpLk11bHRpUmVzb2x1dGlvbkRhdGFzZXR9ICovXG4gICAgICAgIHRoaXMuZGF0YXNldCA9IGRhdGFzZXRcbiAgICAgICAgLyoqIEB0eXBlIHtBcnJheS48aW1wb3J0KFwiLi4vU3R5bGVcIikuU3R5bGU+fSAqL1xuICAgICAgICB0aGlzLnN0eWxlcyA9IHN0eWxlc1xuXG4gICAgICAgIC8qKiBcbiAgICAgICAgICogVGhpcyBwYXJhbWV0ZXIgaXMgdXNlZCB3aGVuIHRoZSBkYXRhc2V0IGlzIGEgTXVsdGlSZXNvbHV0aW9uRGF0YXNldC5cbiAgICAgICAgICogSXQgZGVmaW5lcyB0aGUgbWluaW11bSBudW1iZXIgb2YgcGl4ZWxzIGEgZ3JpZCBjZWxsIHNob3VsZCBoYXZlIHRvIHNlbGVjdCB0aGUgZGF0YXNldCB0byBkaXNwbGF5IGJhc2VkIG9uIGl0cyByZXNvbHV0aW9uLlxuICAgICAgICAgKiBBIGxvdyB2YWx1ZSwgbWVhbnMgdGhhdCB0aGUgbWFwIHdpbGwgYmUgbW9yZSBkZXRhaWxsZWQgKHNtYWxsZXIgY2VsbHMpLlxuICAgICAgICAgKiBBIGhpZ2ggdmFsdWUsIG1lYW5zIHRoYXQgdGhlIG1hcCB3aWxsIGJlIGxlc3MgZGV0YWlsbGVkIChsYXJnZXIgY2VsbHMpLlxuICAgICAgICAgKiBUaGlzIHZhbHVlIHNob3VsZCBiZSBoaWdoZXIgdGhhbiAxLCBvdGhlcndpc2UgaXQgbWVhbnMgYSBncmlkIGNlbGwgaXMgc21hbGxlciB0aGFuIHRoZSBzY3JlZW4gcmVzb2x1dGlvbi5cbiAgICAgICAgICogRm9yIG1vcmUgY29tcGxleCBjZWxsIHJlcHJlc2VudGF0aW9ucyB0aGF0IHJlcXVpcmUgc29tZSBtb3JlIG1hcCBzcGFjZSwgdGhpcyB2YWx1ZSBzaG91bGQgYmUgaGlnaGVyLlxuICAgICAgICAgKiBAdHlwZSB7bnVtYmVyfSAqL1xuICAgICAgICB0aGlzLm1pblBpeGVsc1BlckNlbGwgPSBvcHRzLm1pblBpeGVsc1BlckNlbGwgfHwgM1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgZnVuY3Rpb24gcmV0dXJuaW5nIGNlbGwgaW5mb3JtYXRpb24gYXMgSFRNTC5cbiAgICAgICAgICogVGhpcyBpcyB0eXBpY2FsbHkgdXNlZCBmb3IgdG9vbHRpcCBpbmZvcm1hdGlvbi5cbiAgICAgICAgICogQHR5cGUge2Z1bmN0aW9uKGltcG9ydChcIi4uL0RhdGFzZXRcIikuQ2VsbCwgbnVtYmVyKTpzdHJpbmd9ICovXG4gICAgICAgIHRoaXMuY2VsbEluZm9IVE1MID0gb3B0cy5jZWxsSW5mb0hUTUwgfHwgR3JpZExheWVyLmRlZmF1bHRDZWxsSW5mb0hUTUxcbiAgICB9XG5cbiAgICAvKiogKi9cbiAgICBkcmF3KGdlb0NhbnZhcywgbGVnZW5kKSB7XG5cbiAgICAgICAgLy9nZXQgem9vbSBsZXZlbFxuICAgICAgICBjb25zdCB6ID0gZ2VvQ2FudmFzLnZpZXcuelxuXG4gICAgICAgIC8vZ2V0IGxheWVyIGRhdGFzZXQgY29tcG9uZW50XG4gICAgICAgIC8qKiBAdHlwZSB7aW1wb3J0KCcuLi9EYXRhc2V0LmpzJykuRGF0YXNldHx1bmRlZmluZWR9ICovXG4gICAgICAgIGNvbnN0IGRzYyA9IHRoaXMuZ2V0RGF0YXNldCh6KVxuICAgICAgICBpZiAoIWRzYykgcmV0dXJuXG5cbiAgICAgICAgLy9sYXVuY2ggZGF0YSBkb3dubG9hZCwgaWYgbmVjZXNzYXJ5XG4gICAgICAgIGRzYy5nZXREYXRhKGdlb0NhbnZhcy5leHRHZW8pXG5cbiAgICAgICAgLy91cGRhdGUgZGF0YXNldCB2aWV3IGNhY2hlXG4gICAgICAgIGRzYy51cGRhdGVWaWV3Q2FjaGUoZ2VvQ2FudmFzLmV4dEdlbylcblxuICAgICAgICAvL2RyYXcgY2VsbHMsIHN0eWxlIGJ5IHN0eWxlXG4gICAgICAgIGZvciAoY29uc3QgcyBvZiB0aGlzLnN0eWxlcykge1xuXG4gICAgICAgICAgICAvL2NoZWNrIGlmIHN0eWxlIGlzIHZpc2libGVcbiAgICAgICAgICAgIGlmIChzLnZpc2libGUgJiYgIXMudmlzaWJsZSh6KSkgY29udGludWVcblxuICAgICAgICAgICAgLy9zZXQgc3R5bGUgYWxwaGEgYW5kIGJsZW5kIG1vZGVcbiAgICAgICAgICAgIC8vVE9ETzogbXVsdGlwbHkgYnkgbGF5ZXIgYWxwaGEgP1xuICAgICAgICAgICAgZ2VvQ2FudmFzLmN0eC5nbG9iYWxBbHBoYSA9IHMuYWxwaGEgPyBzLmFscGhhKHopIDogMS4wXG4gICAgICAgICAgICBnZW9DYW52YXMuY3R4Lmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9IHMuYmxlbmRPcGVyYXRpb24oeilcblxuICAgICAgICAgICAgLy9kcmF3IHdpdGggc3R5bGVcbiAgICAgICAgICAgIHMuZHJhdyhkc2MuZ2V0Vmlld0NhY2hlKCksIGdlb0NhbnZhcywgZHNjLmdldFJlc29sdXRpb24oKSlcblxuICAgICAgICAgICAgLy9kcmF3IHN0eWxlIGZpbHRlclxuICAgICAgICAgICAgaWYgKHMuZmlsdGVyQ29sb3IpXG4gICAgICAgICAgICAgICAgcy5kcmF3RmlsdGVyKGdlb0NhbnZhcylcbiAgICAgICAgfVxuXG4gICAgICAgIC8vYWRkIGxlZ2VuZCBlbGVtZW50XG4gICAgICAgIGlmIChsZWdlbmQpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgcyBvZiB0aGlzLnN0eWxlcykge1xuICAgICAgICAgICAgICAgIC8vY2hlY2sgaWYgc3R5bGUgaXMgdmlzaWJsZVxuICAgICAgICAgICAgICAgIGlmIChzLnZpc2libGUgJiYgIXMudmlzaWJsZSh6KSkgY29udGludWVcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGxnIG9mIHMubGVnZW5kcykge1xuICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKHMsIGxnKVxuICAgICAgICAgICAgICAgICAgICAvL3RoaXMubGVnZW5kLmFwcGVuZChsZy5kaXYpXG4gICAgICAgICAgICAgICAgICAgIC8vczEubm9kZSgpLmFwcGVuZENoaWxkKHMyLm5vZGUoKSlcbiAgICAgICAgICAgICAgICAgICAgbGVnZW5kLm5vZGUoKS5hcHBlbmQobGcuZGl2Lm5vZGUoKSlcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvL2Nhc2UgZm9yIHN0eWxlcyBvZiBzdHlsZXMsIGxpa2Uga2VybmVsIHNtb290aGluZ1xuICAgICAgICAgICAgICAgIC8vVE9ETyBkbyBiZXR0ZXJcbiAgICAgICAgICAgICAgICBpZiAoc1snc3R5bGVzJ10pIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBzMiBvZiBzWydzdHlsZXMnXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHMyLnZpc2libGUgJiYgIXMyLnZpc2libGUoeikpIGNvbnRpbnVlXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGxnIG9mIHMyLmxlZ2VuZHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKHMsIGxnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhpcy5sZWdlbmQuYXBwZW5kKGxnLmRpdilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3MxLm5vZGUoKS5hcHBlbmRDaGlsZChzMi5ub2RlKCkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVnZW5kLm5vZGUoKS5hcHBlbmQobGcuZGl2Lm5vZGUoKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfVxuXG5cblxuICAgIC8qKlxuICAgICAqIFJldHVybiB0aGUgcmVsZXZhbnQgZGF0YXNldCBjb21wb25lbnQgZm9yIGEgc3BlY2lmaWVkIHpvb20uXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gelxuICAgICAqIEByZXR1cm5zIHtpbXBvcnQoXCIuLi9EYXRhc2V0XCIpLkRhdGFzZXR8dW5kZWZpbmVkfVxuICAgICAqICovXG4gICAgZ2V0RGF0YXNldCh6KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGFzZXQuZ2V0RGF0YXNldCh6LCB0aGlzLm1pblBpeGVsc1BlckNlbGwpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoZSBkZWZhdWx0IGZ1bmN0aW9uIHJldHVybmluZyBjZWxsIGluZm9ybWF0aW9uIGFzIEhUTUwuXG4gICAgICogVGhpcyBpcyB0eXBpY2FsbHkgdXNlZCBmb3IgdG9vbHRpcCBpbmZvcm1hdGlvbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7aW1wb3J0KFwiLi4vRGF0YXNldFwiKS5DZWxsfSBjZWxsXG4gICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgKi9cbiAgICBzdGF0aWMgZGVmYXVsdENlbGxJbmZvSFRNTChjZWxsKSB7XG4gICAgICAgIGNvbnN0IGJ1ZiA9IFtdXG4gICAgICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKGNlbGwpKSB7XG4gICAgICAgICAgICBpZiAoa2V5ID09PSAneCcpIGNvbnRpbnVlXG4gICAgICAgICAgICBpZiAoa2V5ID09PSAneScpIGNvbnRpbnVlXG4gICAgICAgICAgICBidWYucHVzaCgnPGI+Jywga2V5LCAnPC9iPicsICcgOiAnLCBjZWxsW2tleV0sICc8YnI+JylcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYnVmLmpvaW4oJycpXG4gICAgfVxufVxuIiwiLy9AdHMtY2hlY2tcbid1c2Ugc3RyaWN0J1xuXG5pbXBvcnQgeyBMYXllciB9IGZyb20gXCIuLi9MYXllci5qc1wiXG5pbXBvcnQgeyBjc3YgfSBmcm9tICdkMy1mZXRjaCdcblxuLyoqIEEgbGFiZWwuIFRoZSBuYW1lIGlzIHRoZSB0ZXh0IHRvIHNob3cuICh4LHkpIGFyZSB0aGUgY29vcmRpbmF0ZXMgaW4gdGhlIHNhbWUgQ1JTIGFzIHRoZSBncmlkLlxuICogQHR5cGVkZWYge3tuYW1lOiBzdHJpbmcsIHg6bnVtYmVyLCB5Om51bWJlciB9fSBMYWJlbCAqL1xuXG4vKipcbiAqIEEgKGdlbmVyaWMpIGxheWVyIGZvciBwbGFjZW5hbWUgbGFiZWxzLCB0byBiZSBzaG93biBvbiB0b3Agb2YgdGhlIGdyaWQgbGF5ZXJzLlxuICogVGhlIGlucHV0IGlzIGEgQ1NWIGZpbGUgd2l0aCB0aGUgcG9zaXRpb24gKHgsIHkpIG9mIHRoZSBsYWJlbHMgYW5kIG5hbWUgKyBzb21lIG90aGVyIGluZm8gb24gdGhlIGxhYmVsIGltcG9ydGFuY2UuXG4gKiBJZiB0aGUgbGFiZWwgZGF0YSBpcyBub3QgaW4gdGhlIGV4cGVjdGVkIGZvcm1hdCBvciBpbiB0aGUgc2FtZSBDUlMgYXMgdGhlIGdyaWQsIGl0IGNhbiBiZSBjb3JyZWN0ZWQgd2l0aCB0aGUgXCJwcmVwcm9jZXNzXCIgZnVuY3Rpb24uXG4gKiBUaGUgc2VsZWN0aW9uIG9mIHRoZSBsYWJlbCwgdGhlaXIgc3R5bGUgKGZvbnQsIHdlaWdodCwgZXRjLikgYW5kIGNvbG9yIGNhbiBiZSBzcGVjaWZpZWQgZGVwZW5kaW5nIG9uIHRoZWlyIGltcG9ydGFuY2UgYW5kIHRoZSB6b29tIGxldmVsLlxuICpcbiAqIEBhdXRob3IgSm9zZXBoIERhdmllcywgSnVsaWVuIEdhZmZ1cmlcbiAqL1xuZXhwb3J0IGNsYXNzIExhYmVsTGF5ZXIgZXh0ZW5kcyBMYXllciB7XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtvYmplY3R9IG9wdHNcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihvcHRzKSB7XG4gICAgICAgIHN1cGVyKG9wdHMpXG4gICAgICAgIG9wdHMgPSBvcHRzIHx8IHt9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBVUkwgb2YgdGhlIGxhYmVsIGRhdGEsIGFzIENTViBmaWxlLlxuICAgICAgICAgKiBUaGUgZmlsZSBzaG91bGQgY29udGFpbiB0aGUgaW5mb3JtYXRpb24gZm9yIGVhY2ggbGFiZWwgc3VjaCBhcyB0aGUgdGV4dCwgdGhlIHBvc2l0aW9uIGFuZCBvdGhlciBpbmZvcm1hdGlvbiBmb3IgdGhlIGRpc3BsYXkgb2YgdGhlIGxhYmVsIGFjY29yZGluZyB0byB0aGUgem9vbSBsZXZlbC5cbiAgICAgICAgICogSWYgbmVjZXNzYXJ5LCB0aGlzIGRhdGEgY2FuIGJlIHJlZm9ybWF0ZWQgd2l0aCB0aGUgJ3ByZXByb2Nlc3MnIHBhcmFtZXRlci5cbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICogQHR5cGUge3N0cmluZ30gKi9cbiAgICAgICAgdGhpcy51cmwgPSBvcHRzLnVybFxuXG4gICAgICAgIC8qKiBTcGVjaWZ5IGlmIGFuZCBob3cgYSBsYWJlbCBzaG91bGQgYmUgZHJhd24sIGRlcGVuZGluZyBvbiBpdHMgaW1wb3J0YW5jZSBhbmQgdGhlIHpvb20gbGV2ZWwuXG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqIEB0eXBlIHtmdW5jdGlvbihMYWJlbCxudW1iZXIpOnN0cmluZ30gKi9cbiAgICAgICAgdGhpcy5zdHlsZSA9IG9wdHMuc3R5bGUgfHwgKCgpID0+ICdib2xkIDFlbSBBcmlhbCcpXG5cbiAgICAgICAgLyoqIFNwZWNpZnkgdGhlIGxhYmVsIGNvbG9yLCBkZXBlbmRpbmcgb24gaXRzIGltcG9ydGFuY2UgYW5kIHRoZSB6b29tIGxldmVsLlxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKiBAdHlwZSB7ZnVuY3Rpb24oTGFiZWwsbnVtYmVyKTpzdHJpbmd9ICovXG4gICAgICAgIHRoaXMuY29sb3IgPSBvcHRzLmNvbG9yIHx8IChvcHRzLmRhcmsgPyAoKSA9PiAnI2RkZCcgOiAoKSA9PiAnIzIyMicpXG5cbiAgICAgICAgLyoqIFNwZWNpZnkgdGhlIGxhYmVsIGhhbG8gY29sb3IsIGRlcGVuZGluZyBvbiBpdHMgaW1wb3J0YW5jZSBhbmQgdGhlIHpvb20gbGV2ZWwuXG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqIEB0eXBlIHtmdW5jdGlvbihMYWJlbCxudW1iZXIpOnN0cmluZ30gKi9cbiAgICAgICAgdGhpcy5oYWxvQ29sb3IgPSBvcHRzLmhhbG9Db2xvciB8fCAob3B0cy5kYXJrID8gKCkgPT4gJyMwMDAwMDBCQicgOiAoKSA9PiAnI0ZGRkZGRkJCJylcblxuICAgICAgICAvKiogU3BlY2lmeSB0aGUgbGFiZWwgaGFsbyB3aWR0aCwgZGVwZW5kaW5nIG9uIGl0cyBpbXBvcnRhbmNlIGFuZCB0aGUgem9vbSBsZXZlbC5cbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICogQHR5cGUge2Z1bmN0aW9uKExhYmVsLG51bWJlcik6bnVtYmVyfSAqL1xuICAgICAgICB0aGlzLmhhbG9XaWR0aCA9IG9wdHMuaGFsb1dpZHRoIHx8ICgoKSA9PiA0KVxuXG4gICAgICAgIC8qKiBUaGUgYW5jaG9yIHdoZXJlIHRvIGRyYXcgdGhlIHRleHQsIGZyb20gbGFiZWwgcG9zaXRpb24uIFNlZSBIVE1MLWNhbnZhcyB0ZXh0QWxpZ24gcHJvcGVydHkuXG4gICAgICAgICAqIFwibGVmdFwiIHx8IFwicmlnaHRcIiB8fCBcImNlbnRlclwiIHx8IFwic3RhcnRcIiB8fCBcImVuZFwiXG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqIEB0eXBlIHtDYW52YXNUZXh0QWxpZ259ICovXG4gICAgICAgIHRoaXMudGV4dEFsaWduID0gb3B0cy50ZXh0QWxpZ24gfHwgJ3N0YXJ0J1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKiBAdHlwZSB7QXJyYXkuPG51bWJlcj59ICovXG4gICAgICAgIHRoaXMub2Zmc2V0UGl4ID0gb3B0cy5vZmZzZXRQaXggfHwgWzUsIDVdXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEEgcHJlcHJvY2VzcyB0byBydW4gb24gZWFjaCBsYWJlbCBhZnRlciBsb2FkaW5nLlxuICAgICAgICAgKiBJdCBjYW4gYmUgdXNlZCB0byBhcHBseSBzb21lIHNwZWNpZmljIHRyZWF0bWVudCBiZWZvcmUsIGZvcm1hdCB0aGUgbGFiZWwgZGF0YSwgcHJvamVjdCBjb29yZGluYXRlcywgZXRjLlxuICAgICAgICAgKiBSZXR1cm4gZmFsc2UgaWYgdGhlIGxhYmVsIHNob3VsZCBub3QgYmUga2VwdC5cbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICogQHR5cGUge2Z1bmN0aW9uKExhYmVsKTpib29sZWFufSAqL1xuICAgICAgICB0aGlzLnByZXByb2Nlc3MgPSBvcHRzLnByZXByb2Nlc3NcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICogQHR5cGUge0FycmF5LjxMYWJlbD4gfCB1bmRlZmluZWR9ICovXG4gICAgICAgIHRoaXMubGFiZWxzID0gdW5kZWZpbmVkXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqIEB0eXBlIHtzdHJpbmd9ICovXG4gICAgICAgIHRoaXMubG9hZGluZ1N0YXR1cyA9ICdub3RMb2FkZWQnXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRHJhdyB0aGUgbGFiZWwgbGF5ZXIuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge2ltcG9ydChcIi4uL0dlb0NhbnZhc1wiKS5HZW9DYW52YXN9IGdlb0NhbnZhcyBUaGUgY2FudmFzIHdoZXJlIHRvIGRyYXcgdGhlIGxheWVyLlxuICAgICAqIEByZXR1cm5zIHt2b2lkfVxuICAgICAqL1xuICAgIGRyYXcoZ2VvQ2FudmFzKSB7XG4gICAgICAgIC8vbG9hZCBsYWJlbHMsIGlmIG5vdCBkb25lIHlldC5cbiAgICAgICAgaWYgKCF0aGlzLmxhYmVscykge1xuICAgICAgICAgICAgdGhpcy5sb2FkKGdlb0NhbnZhcy5yZWRyYXcpXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuXG4gICAgICAgIC8vXG4gICAgICAgIGNvbnN0IHogPSBnZW9DYW52YXMudmlldy56XG5cbiAgICAgICAgLy90ZXh0IGFsaWduXG4gICAgICAgIGdlb0NhbnZhcy5jdHgudGV4dEFsaWduID0gdGhpcy50ZXh0QWxpZ24gfHwgJ3N0YXJ0J1xuXG4gICAgICAgIC8vbGluZSBqb2luIGFuZCBjYXBcbiAgICAgICAgZ2VvQ2FudmFzLmN0eC5saW5lSm9pbiA9ICdiZXZlbCcgLy98fCBcInJvdW5kXCIgfHwgXCJtaXRlclwiO1xuICAgICAgICBnZW9DYW52YXMuY3R4LmxpbmVDYXAgPSAnYnV0dCcgLy98fCBcInJvdW5kXCIgfHwgXCJzcXVhcmVcIjtcblxuICAgICAgICAvL2RyYXcgaW4gcGl4IGNvb3JkaW5hdGVzXG4gICAgICAgIGdlb0NhbnZhcy5pbml0Q2FudmFzVHJhbnNmb3JtKClcblxuICAgICAgICAvL2RyYXcgbGFiZWxzLCBvbmUgYnkgb25lXG4gICAgICAgIGZvciAoY29uc3QgbGIgb2YgdGhpcy5sYWJlbHMpIHtcbiAgICAgICAgICAgIC8vZ2V0IGxhYmVsIHN0eWxlXG4gICAgICAgICAgICBjb25zdCBzdCA9IHRoaXMuc3R5bGUobGIsIHopXG4gICAgICAgICAgICBpZiAoIXN0KSBjb250aW51ZVxuICAgICAgICAgICAgZ2VvQ2FudmFzLmN0eC5mb250ID0gc3RcblxuICAgICAgICAgICAgLy9jaGVjayBsYWJlbCB3aXRoaW4gdGhlIHZpZXcsIHRvIGJlIGRyYXduXG4gICAgICAgICAgICBpZiAoIWdlb0NhbnZhcy50b0RyYXcobGIpKSBjb250aW51ZVxuXG4gICAgICAgICAgICAvL3Bvc2l0aW9uXG4gICAgICAgICAgICBjb25zdCB4UCA9IGdlb0NhbnZhcy5nZW9Ub1BpeFgobGIueCkgKyB0aGlzLm9mZnNldFBpeFswXVxuICAgICAgICAgICAgY29uc3QgeVAgPSBnZW9DYW52YXMuZ2VvVG9QaXhZKGxiLnkpIC0gdGhpcy5vZmZzZXRQaXhbMV1cblxuICAgICAgICAgICAgLy9sYWJlbCBzdHJva2UsIGZvciB0aGUgaGFsb1xuICAgICAgICAgICAgaWYgKHRoaXMuaGFsb0NvbG9yICYmIHRoaXMuaGFsb1dpZHRoKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaGMgPSB0aGlzLmhhbG9Db2xvcihsYiwgeilcbiAgICAgICAgICAgICAgICBjb25zdCBodyA9IHRoaXMuaGFsb1dpZHRoKGxiLCB6KVxuICAgICAgICAgICAgICAgIGlmIChoYyAmJiBodyAmJiBodyA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgZ2VvQ2FudmFzLmN0eC5zdHJva2VTdHlsZSA9IGhjXG4gICAgICAgICAgICAgICAgICAgIGdlb0NhbnZhcy5jdHgubGluZVdpZHRoID0gaHdcbiAgICAgICAgICAgICAgICAgICAgZ2VvQ2FudmFzLmN0eC5zdHJva2VUZXh0KGxiLm5hbWUsIHhQLCB5UClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vbGFiZWwgZmlsbFxuICAgICAgICAgICAgaWYgKHRoaXMuY29sb3IpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjb2wgPSB0aGlzLmNvbG9yKGxiLCB6KVxuICAgICAgICAgICAgICAgIGlmIChjb2wpIHtcbiAgICAgICAgICAgICAgICAgICAgZ2VvQ2FudmFzLmN0eC5maWxsU3R5bGUgPSBjb2xcbiAgICAgICAgICAgICAgICAgICAgZ2VvQ2FudmFzLmN0eC5maWxsVGV4dChsYi5uYW1lLCB4UCwgeVApXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTG9hZCBkYXRhIGZvciBsYWJlbHMsIGZyb20gVVJMIHRoaXMudXJsXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbigpOnZvaWR9IGNhbGxiYWNrXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBhc3luYyBsb2FkKGNhbGxiYWNrKSB7XG4gICAgICAgIGlmICghdGhpcy51cmwpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdGYWlsZWQgbG9hZGluZyBsYWJlbHM6IE5vIFVSTCBzcGVjaWZpZWQuICcgKyB0aGlzLnVybClcbiAgICAgICAgICAgIHRoaXMubG9hZGluZ1N0YXR1cyA9ICdmYWlsZWQnXG4gICAgICAgICAgICB0aGlzLmxhYmVscyA9IFtdXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuXG4gICAgICAgIC8vY2hlY2sgaWYgZGF0YSBhbHJlYWR5IGxvYWRlZFxuICAgICAgICBpZiAodGhpcy5sb2FkaW5nU3RhdHVzICE9ICdub3RMb2FkZWQnKSByZXR1cm5cblxuICAgICAgICAvL2xvYWQgZGF0YVxuICAgICAgICB0aGlzLmxvYWRpbmdTdGF0dXMgPSAnbG9hZGluZydcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLyoqIEB0eXBlIHsgQXJyYXkuPExhYmVsPiB9ICovXG4gICAgICAgICAgICBjb25zdCBkYXRhID0gYXdhaXQgY3N2KHRoaXMudXJsKVxuXG4gICAgICAgICAgICAvL3ByZXByb2Nlc3MvZmlsdGVyXG4gICAgICAgICAgICBpZiAodGhpcy5wcmVwcm9jZXNzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sYWJlbHMgPSBbXVxuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgYyBvZiBkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGIgPSB0aGlzLnByZXByb2Nlc3MoYylcbiAgICAgICAgICAgICAgICAgICAgaWYgKGIgPT0gZmFsc2UpIGNvbnRpbnVlXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGFiZWxzLnB1c2goYylcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vc3RvcmUgbGFiZWxzXG4gICAgICAgICAgICAgICAgdGhpcy5sYWJlbHMgPSBkYXRhXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMubG9hZGluZ1N0YXR1cyA9ICdsb2FkZWQnXG5cbiAgICAgICAgICAgIC8vcmVkcmF3XG4gICAgICAgICAgICBpZiAoY2FsbGJhY2spIGNhbGxiYWNrKClcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdGYWlsZWQgbG9hZGluZyBsYWJlbHMgZnJvbSAnICsgdGhpcy51cmwpXG4gICAgICAgICAgICB0aGlzLmxhYmVscyA9IFtdXG4gICAgICAgICAgICB0aGlzLmxvYWRpbmdTdGF0dXMgPSAnZmFpbGVkJ1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiLy9AdHMtY2hlY2tcbid1c2Ugc3RyaWN0J1xuXG5pbXBvcnQgeyBMYXllciB9IGZyb20gXCIuLi9MYXllci5qc1wiXG5pbXBvcnQgeyBqc29uIH0gZnJvbSAnZDMtZmV0Y2gnXG5cbi8qKlxuICogQGF1dGhvciBKb3NlcGggRGF2aWVzLCBKdWxpZW4gR2FmZnVyaVxuICovXG5leHBvcnQgY2xhc3MgTGluZUxheWVyIGV4dGVuZHMgTGF5ZXIge1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRzXG4gICAgICovXG4gICAgY29uc3RydWN0b3Iob3B0cykge1xuICAgICAgICBzdXBlcihvcHRzKVxuICAgICAgICBvcHRzID0gb3B0cyB8fCB7fVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKiBAdHlwZSB7c3RyaW5nfSAqL1xuICAgICAgICB0aGlzLnVybCA9IG9wdHMudXJsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEEgcHJlcHJvY2VzcyB0byBydW4gb24gZWFjaCBmZWF0dXJlIGFmdGVyIGxvYWRpbmcuXG4gICAgICAgICAqIEl0IGNhbiBiZSB1c2VkIHRvIGFwcGx5IHNvbWUgc3BlY2lmaWMgdHJlYXRtZW50IGJlZm9yZSwgZm9ybWF0IHRoZSBsYWJlbCBkYXRhLCBwcm9qZWN0IGNvb3JkaW5hdGVzLCBldGMuXG4gICAgICAgICAqIFJldHVybiBmYWxzZSBpZiB0aGUgbGFiZWwgc2hvdWxkIG5vdCBiZSBrZXB0LlxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKiBAdHlwZSB7ZnVuY3Rpb24ob2JqZWN0KTpib29sZWFufSAqL1xuICAgICAgICB0aGlzLnByZXByb2Nlc3MgPSBvcHRzLnByZXByb2Nlc3NcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICogQHR5cGUge2Z1bmN0aW9uKG9iamVjdCxudW1iZXIpOnN0cmluZ30gKi9cbiAgICAgICAgdGhpcy5jb2xvciA9IG9wdHMuY29sb3IgfHwgKChmLCB6KSA9PiAnZ3JheScpXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKiBAdHlwZSB7ZnVuY3Rpb24ob2JqZWN0LG51bWJlcik6bnVtYmVyfSAqL1xuICAgICAgICB0aGlzLndpZHRoID0gb3B0cy53aWR0aCB8fCAoKGYsIHopID0+IDIpXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKiBAdHlwZSB7ZnVuY3Rpb24ob2JqZWN0LG51bWJlcik6QXJyYXkuPG51bWJlcj58dW5kZWZpbmVkfSAqL1xuICAgICAgICB0aGlzLmxpbmVEYXNoID0gb3B0cy5saW5lRGFzaCB8fCAoKGYsIHopID0+IHVuZGVmaW5lZClcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICogQHR5cGUge0FycmF5LjxvYmplY3Q+IHwgdW5kZWZpbmVkfSAqL1xuICAgICAgICB0aGlzLmZzID0gdW5kZWZpbmVkXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqIEB0eXBlIHtzdHJpbmd9ICovXG4gICAgICAgIHRoaXMubG9hZGluZ1N0YXR1cyA9ICdub3RMb2FkZWQnXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRHJhdyB0aGUgbGF5ZXIuXG4gICAgICogQHBhcmFtIHtpbXBvcnQoXCIuLi9HZW9DYW52YXNcIikuR2VvQ2FudmFzfSBnZW9DYW52YXMgVGhlIGNhbnZhcyB3aGVyZSB0byBkcmF3IHRoZSBsYXllci5cbiAgICAgKiBAcmV0dXJucyB7dm9pZH1cbiAgICAgKi9cbiAgICBkcmF3KGdlb0NhbnZhcykge1xuICAgICAgICAvL2xvYWQgZGF0YSwgaWYgbm90IGRvbmUgeWV0LlxuICAgICAgICBpZiAoIXRoaXMuZnMpIHtcbiAgICAgICAgICAgIHRoaXMubG9hZChnZW9DYW52YXMucmVkcmF3KVxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cblxuICAgICAgICAvL1RPRE8gc29ydCBsaW5lcyBieSB3aWR0aCA/XG5cbiAgICAgICAgLy9cbiAgICAgICAgY29uc3QgeiA9IGdlb0NhbnZhcy52aWV3LnpcblxuICAgICAgICBmb3IgKGNvbnN0IGYgb2YgdGhpcy5mcykge1xuICAgICAgICAgICAgY29uc3QgY3MgPSBmLmdlb21ldHJ5LmNvb3JkaW5hdGVzXG4gICAgICAgICAgICBpZiAoY3MubGVuZ3RoIDwgMikgY29udGludWVcblxuICAgICAgICAgICAgLy9zZXQgY29sb3JcbiAgICAgICAgICAgIGNvbnN0IGNvbCA9IHRoaXMuY29sb3IoZiwgeilcbiAgICAgICAgICAgIGlmICghY29sIHx8IGNvbCA9PSAnbm9uZScpIGNvbnRpbnVlXG4gICAgICAgICAgICBnZW9DYW52YXMuY3R4LnN0cm9rZVN0eWxlID0gY29sXG5cbiAgICAgICAgICAgIC8vc2V0IGxpbmV3aWR0aFxuICAgICAgICAgICAgY29uc3Qgd1AgPSB0aGlzLndpZHRoKGYsIHopXG4gICAgICAgICAgICBpZiAoIXdQIHx8IHdQIDwgMCkgY29udGludWVcbiAgICAgICAgICAgIGdlb0NhbnZhcy5jdHgubGluZVdpZHRoID0gd1AgKiB6XG5cbiAgICAgICAgICAgIC8vc2V0IGxpbmUgZGFzaFxuICAgICAgICAgICAgY29uc3QgbGRQID0gdGhpcy5saW5lRGFzaChmLCB6KVxuICAgICAgICAgICAgaWYgKGxkUCkgZ2VvQ2FudmFzLmN0eC5zZXRMaW5lRGFzaChsZFApXG5cbiAgICAgICAgICAgIC8vZHJhdyBsaW5lXG4gICAgICAgICAgICBnZW9DYW52YXMuY3R4LmJlZ2luUGF0aCgpXG4gICAgICAgICAgICBnZW9DYW52YXMuY3R4Lm1vdmVUbyhjc1swXVswXSwgY3NbMF1bMV0pXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IGNzLmxlbmd0aDsgaSsrKSBnZW9DYW52YXMuY3R4LmxpbmVUbyhjc1tpXVswXSwgY3NbaV1bMV0pXG4gICAgICAgICAgICBnZW9DYW52YXMuY3R4LnN0cm9rZSgpXG4gICAgICAgIH1cblxuICAgICAgICAvLy4uLlxuICAgICAgICBnZW9DYW52YXMuY3R4LnNldExpbmVEYXNoKFtdKVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIExvYWQgZGF0YSBmb3IgbGFiZWxzLCBmcm9tIFVSTCB0aGlzLnVybFxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb24oKTp2b2lkfSBjYWxsYmFja1xuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgYXN5bmMgbG9hZChjYWxsYmFjaykge1xuICAgICAgICBpZiAoIXRoaXMudXJsKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnRmFpbGVkIGxvYWRpbmcgYm91bmRhcmllczogTm8gVVJMIHNwZWNpZmllZC4gJyArIHRoaXMudXJsKVxuICAgICAgICAgICAgdGhpcy5sb2FkaW5nU3RhdHVzID0gJ2ZhaWxlZCdcbiAgICAgICAgICAgIHRoaXMubGFiZWxzID0gW11cbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG5cbiAgICAgICAgLy9jaGVjayBpZiBkYXRhIGFscmVhZHkgbG9hZGVkXG4gICAgICAgIGlmICh0aGlzLmxvYWRpbmdTdGF0dXMgIT0gJ25vdExvYWRlZCcpIHJldHVyblxuXG4gICAgICAgIC8vbG9hZCBkYXRhXG4gICAgICAgIHRoaXMubG9hZGluZ1N0YXR1cyA9ICdsb2FkaW5nJ1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCBkYXRhXyA9IGF3YWl0IGpzb24odGhpcy51cmwpXG5cbiAgICAgICAgICAgIC8qKiBAdHlwZSB7IEFycmF5LjxvYmplY3Q+IH0gKi9cbiAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBkYXRhXy5mZWF0dXJlc1xuXG4gICAgICAgICAgICAvL3ByZXByb2Nlc3MvZmlsdGVyXG4gICAgICAgICAgICBpZiAodGhpcy5wcmVwcm9jZXNzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5mcyA9IFtdXG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBjIG9mIGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYiA9IHRoaXMucHJlcHJvY2VzcyhjKVxuICAgICAgICAgICAgICAgICAgICBpZiAoYiA9PSBmYWxzZSkgY29udGludWVcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mcy5wdXNoKGMpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvL3N0b3JlIGxhYmVsc1xuICAgICAgICAgICAgICAgIHRoaXMuZnMgPSBkYXRhXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMubG9hZGluZ1N0YXR1cyA9ICdsb2FkZWQnXG5cbiAgICAgICAgICAgIC8vcmVkcmF3XG4gICAgICAgICAgICBpZiAoY2FsbGJhY2spIGNhbGxiYWNrKClcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdGYWlsZWQgbG9hZGluZyBib3VuZGFyaWVzIGZyb20gJyArIHRoaXMudXJsKVxuICAgICAgICAgICAgdGhpcy5mcyA9IFtdXG4gICAgICAgICAgICB0aGlzLmxvYWRpbmdTdGF0dXMgPSAnZmFpbGVkJ1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiLy9AdHMtY2hlY2tcbid1c2Ugc3RyaWN0J1xuXG5pbXBvcnQgeyBMZWdlbmQgfSBmcm9tICcuLi9MZWdlbmQuanMnXG5cbi8qKlxuICogQSBsZWdlbmQgZWxlbWVudCBmb3IgY29sb3IgY2F0ZWdyb3JpZXMuXG4gKlxuICogQGF1dGhvciBKb3NlcGggRGF2aWVzLCBKdWxpZW4gR2FmZnVyaVxuICovXG5leHBvcnQgY2xhc3MgQ29sb3JDYXRlZ29yeUxlZ2VuZCBleHRlbmRzIExlZ2VuZCB7XG4gICAgLyoqIEBwYXJhbSB7T2JqZWN0fSBvcHRzICovXG4gICAgY29uc3RydWN0b3Iob3B0cykge1xuICAgICAgICBzdXBlcihvcHRzKVxuICAgICAgICBvcHRzID0gb3B0cyB8fCB7fVxuXG4gICAgICAgIC8vY29sL2NhdGVnb3JpZXMgYXJyYXksIGluIGRpc3BsYXkgb3JkZXJcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqIEB0eXBlIHtBcnJheS48QXJyYXkuPHN0cmluZz4+fSAqL1xuICAgICAgICB0aGlzLmNvbENhdCA9IG9wdHMuY29sQ2F0IHx8IFtbJ2dyYXknLCAnLSddXVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKiBAdHlwZSB7aW1wb3J0KFwiLi4vU3R5bGVcIikuU2hhcGV9ICovXG4gICAgICAgIHRoaXMuc2hhcGUgPSBvcHRzLnNoYXBlIHx8ICdjaXJjbGUnXG4gICAgICAgIHRoaXMuZGltZW5zaW9uID0gb3B0cy5kaW1lbnNpb24gfHwgeyByOiA4IH1cbiAgICAgICAgdGhpcy5zdHJva2VDb2xvciA9IG9wdHMuc3Ryb2tlQ29sb3IgfHwgJ2dyYXknXG4gICAgICAgIHRoaXMuc3Ryb2tlV2lkdGggPSBvcHRzLnN0cm9rZVdpZHRoIHx8IDFcblxuICAgICAgICB0aGlzLnRpdGxlID0gb3B0cy50aXRsZVxuICAgICAgICB0aGlzLnRpdGxlRm9udFNpemUgPSBvcHRzLnRpdGxlRm9udFNpemUgfHwgJzAuOGVtJ1xuICAgICAgICB0aGlzLnRpdGxlRm9udFdlaWdodCA9IG9wdHMudGl0bGVGb250V2VpZ2h0IHx8ICdib2xkJ1xuXG4gICAgICAgIC8vbGFiZWxcbiAgICAgICAgdGhpcy5sYWJlbEZvbnRTaXplID0gb3B0cy5sYWJlbEZvbnRTaXplIHx8ICcwLjhlbSdcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKi9cbiAgICB1cGRhdGUoKSB7XG4gICAgICAgIC8vY2xlYXJcbiAgICAgICAgdGhpcy5kaXYuc2VsZWN0QWxsKCcqJykucmVtb3ZlKClcblxuICAgICAgICAvL2J1aWxkXG5cbiAgICAgICAgLy90aXRsZVxuICAgICAgICBpZiAodGhpcy50aXRsZSlcbiAgICAgICAgICAgIHRoaXMuZGl2XG4gICAgICAgICAgICAgICAgLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ2ZvbnQtc2l6ZScsIHRoaXMudGl0bGVGb250U2l6ZSlcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ2ZvbnQtd2VpZ2h0JywgdGhpcy50aXRsZUZvbnRXZWlnaHQpXG4gICAgICAgICAgICAgICAgLnN0eWxlKCdtYXJnaW4tYm90dG9tJywgJzdweCcpXG4gICAgICAgICAgICAgICAgLnRleHQodGhpcy50aXRsZSlcblxuICAgICAgICAvL2NhdGVnb3JpZXNcbiAgICAgICAgY29uc3QgbmIgPSB0aGlzLmNvbENhdC5sZW5ndGhcbiAgICAgICAgaWYgKG5iID09IDApIHJldHVyblxuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbmI7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgY2F0ID0gdGhpcy5jb2xDYXRbaV1cblxuICAgICAgICAgICAgLy9tYWtlIGRpdiBmb3IgY2F0ZWdvcnlcbiAgICAgICAgICAgIGNvbnN0IGQgPSB0aGlzLmRpdi5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAvL3RvIGVuYWJsZSB2ZXJ0aWNhbCBjZW50ZXJpbmdcbiAgICAgICAgICAgIC8vLnN0eWxlKFwicG9zaXRpb25cIiwgXCJyZWxhdGl2ZVwiKVxuXG4gICAgICAgICAgICBjb25zdCBzdyA9IHRoaXMuc3Ryb2tlV2lkdGhcblxuICAgICAgICAgICAgLy9kcmF3IGdyYXBoaWMgZWxlbWVudDogYm94IC8gY2lyY2xlXG4gICAgICAgICAgICBpZiAodGhpcy5zaGFwZSA9PT0gJ3NxdWFyZScpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBoID0gdGhpcy5kaW1lbnNpb24uaCB8fCAxNVxuICAgICAgICAgICAgICAgIGNvbnN0IHcgPSB0aGlzLmRpbWVuc2lvbi53IHx8IDIwXG4gICAgICAgICAgICAgICAgZC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZSgnZGlzcGxheScsICdpbmxpbmUnKVxuXG4gICAgICAgICAgICAgICAgICAgIC5hcHBlbmQoJ3N2ZycpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd3aWR0aCcsIHcgKyAyICogc3cpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdoZWlnaHQnLCBoICsgMiAqIHN3KVxuXG4gICAgICAgICAgICAgICAgICAgIC5hcHBlbmQoJ3JlY3QnKVxuICAgICAgICAgICAgICAgICAgICAuYXR0cigneCcsIHN3KVxuICAgICAgICAgICAgICAgICAgICAuYXR0cigneScsIHN3KVxuICAgICAgICAgICAgICAgICAgICAuYXR0cignd2lkdGgnLCB3KVxuICAgICAgICAgICAgICAgICAgICAuYXR0cignaGVpZ2h0JywgaClcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKCdmaWxsJywgY2F0WzBdKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoJ3N0cm9rZScsIHRoaXMuc3Ryb2tlQ29sb3IpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZSgnc3Ryb2tlLXdpZHRoJywgdGhpcy5zdHJva2VXaWR0aClcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5zaGFwZSA9PT0gJ2NpcmNsZScpIHtcbiAgICAgICAgICAgICAgICBjb25zdCByID0gdGhpcy5kaW1lbnNpb24uciB8fCA4XG4gICAgICAgICAgICAgICAgY29uc3QgaCA9IDIgKiByICsgMiAqIHN3XG4gICAgICAgICAgICAgICAgZC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZSgnZGlzcGxheScsICdpbmxpbmUnKVxuXG4gICAgICAgICAgICAgICAgICAgIC5hcHBlbmQoJ3N2ZycpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd3aWR0aCcsIGgpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdoZWlnaHQnLCBoKVxuXG4gICAgICAgICAgICAgICAgICAgIC5hcHBlbmQoJ2NpcmNsZScpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdjeCcsIHIgKyBzdylcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2N5JywgciArIHN3KVxuICAgICAgICAgICAgICAgICAgICAuYXR0cigncicsIHIpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZSgnZmlsbCcsIGNhdFswXSlcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKCdzdHJva2UnLCB0aGlzLnN0cm9rZUNvbG9yKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoJ3N0cm9rZS13aWR0aCcsIHRoaXMuc3Ryb2tlV2lkdGgpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVW5leHBlY3RlZCBzaGFwZTonICsgdGhpcy5zaGFwZSlcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy93cml0ZSBsYWJlbCB0ZXh0XG4gICAgICAgICAgICBkLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgICAgICAvL3Nob3cgb24gcmlnaHQgb2YgZ3JhcGhpY1xuICAgICAgICAgICAgICAgIC5zdHlsZSgnZGlzcGxheScsICdpbmxpbmUnKVxuXG4gICAgICAgICAgICAgICAgLy9jZW50ZXIgdmVydGljYWxseVxuICAgICAgICAgICAgICAgIC8vLnN0eWxlKFwicG9zaXRpb25cIiwgXCJhYnNvbHV0ZVwiKS5zdHlsZShcInRvcFwiLCBcIjBcIikuc3R5bGUoXCJib3R0b21cIiwgXCIwXCIpXG5cbiAgICAgICAgICAgICAgICAuc3R5bGUoJ3BhZGRpbmctbGVmdCcsICc1cHgnKVxuICAgICAgICAgICAgICAgIC5zdHlsZSgnZm9udC1zaXplJywgdGhpcy5sYWJlbEZvbnRTaXplKVxuICAgICAgICAgICAgICAgIC50ZXh0KGNhdFsxXSlcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIi8vQHRzLWNoZWNrXG4ndXNlIHN0cmljdCdcblxuaW1wb3J0IHsgTGVnZW5kIH0gZnJvbSAnLi4vTGVnZW5kLmpzJ1xuXG4vKipcbiAqIEEgbGVnZW5kIGVsZW1lbnQgZm9yIGRpc2NyZXRlIGNvbG9yIHN0eWxlLlxuICogSW5zcGlyYXRpb246IGh0dHBzOi8vb2JzZXJ2YWJsZWhxLmNvbS9AZDMvY29sb3ItbGVnZW5kXG4gKlxuICogQGF1dGhvciBKdWxpZW4gR2FmZnVyaVxuICovXG5leHBvcnQgY2xhc3MgQ29sb3JEaXNjcmV0ZUxlZ2VuZCBleHRlbmRzIExlZ2VuZCB7XG4gICAgLyoqIEBwYXJhbSB7T2JqZWN0fSBvcHRzICovXG4gICAgY29uc3RydWN0b3Iob3B0cykge1xuICAgICAgICBzdXBlcihvcHRzKVxuICAgICAgICBvcHRzID0gb3B0cyB8fCB7fVxuXG4gICAgICAgIC8qKiBAcHJpdmF0ZSBAdHlwZSB7ZnVuY3Rpb24oaW1wb3J0KCcuLi9TdHlsZScpLlZpZXdTY2FsZSk6QXJyYXkuPHN0cmluZz59ICovXG4gICAgICAgIHRoaXMuY29sb3JzID0gb3B0cy5jb2xvcnNcbiAgICAgICAgLyoqIEBwcml2YXRlIEB0eXBlIHtmdW5jdGlvbihpbXBvcnQoJy4uL1N0eWxlJykuVmlld1NjYWxlKTpBcnJheS48bnVtYmVyPn0gKi9cbiAgICAgICAgdGhpcy5icmVha3MgPSBvcHRzLmJyZWFrc1xuXG4gICAgICAgIHRoaXMud2lkdGggPSBvcHRzLndpZHRoIHx8IDMwMFxuICAgICAgICB0aGlzLmhlaWdodCA9IG9wdHMuaGVpZ2h0IHx8IDE1XG5cbiAgICAgICAgdGhpcy50aXRsZSA9IG9wdHMudGl0bGVcbiAgICAgICAgdGhpcy50aXRsZUZvbnRTaXplID0gb3B0cy50aXRsZUZvbnRTaXplIHx8ICcwLjhlbSdcbiAgICAgICAgdGhpcy50aXRsZUZvbnRXZWlnaHQgPSBvcHRzLnRpdGxlRm9udFdlaWdodCB8fCAnYm9sZCdcblxuICAgICAgICB0aGlzLnRpY2tTaXplID0gb3B0cy50aWNrU2l6ZSB8fCAzXG5cbiAgICAgICAgLy9sYWJlbFxuICAgICAgICB0aGlzLmxhYmVsRm9udFNpemUgPSBvcHRzLmxhYmVsRm9udFNpemUgfHwgJzAuOGVtJ1xuICAgICAgICB0aGlzLmludmVydCA9IG9wdHMuaW52ZXJ0XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHt7dmlld1NjYWxlOmltcG9ydCgnLi4vU3R5bGUnKS5WaWV3U2NhbGV9IH0gb3B0c1xuICAgICAqL1xuICAgIHVwZGF0ZShvcHRzKSB7XG4gICAgICAgIC8vY2xlYXJcbiAgICAgICAgdGhpcy5kaXYuc2VsZWN0QWxsKCcqJykucmVtb3ZlKClcblxuICAgICAgICAvL2J1aWxkXG5cbiAgICAgICAgLy90aXRsZVxuICAgICAgICBpZiAodGhpcy50aXRsZSlcbiAgICAgICAgICAgIHRoaXMuZGl2XG4gICAgICAgICAgICAgICAgLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ2ZvbnQtc2l6ZScsIHRoaXMudGl0bGVGb250U2l6ZSlcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ2ZvbnQtd2VpZ2h0JywgdGhpcy50aXRsZUZvbnRXZWlnaHQpXG4gICAgICAgICAgICAgICAgLnN0eWxlKCdtYXJnaW4tYm90dG9tJywgJzdweCcpXG4gICAgICAgICAgICAgICAgLnRleHQodGhpcy50aXRsZSlcblxuICAgICAgICAvL2dldCBjb2xvcnMgYW5kIGJyZWFrc1xuICAgICAgICBjb25zdCBjb2xvcnMgPSB0aGlzLmNvbG9ycyhvcHRzLnZpZXdTY2FsZSlcbiAgICAgICAgY29uc3QgYnJlYWtzID0gdGhpcy5icmVha3Mob3B0cy52aWV3U2NhbGUpXG5cbiAgICAgICAgLy9jbGFzc2VzXG4gICAgICAgIGNvbnN0IG5iID0gY29sb3JzLmxlbmd0aFxuICAgICAgICBpZiAobmIgPT0gMCkgcmV0dXJuXG4gICAgICAgIGNvbnN0IHcgPSB0aGlzLndpZHRoIC8gbmJcblxuICAgICAgICAvL21ha2Ugc3ZnIGVsZW1lbnRcbiAgICAgICAgY29uc3Qgc3ZnID0gdGhpcy5kaXZcbiAgICAgICAgICAgIC5hcHBlbmQoJ3N2ZycpXG4gICAgICAgICAgICAuYXR0cignd2lkdGgnLCB0aGlzLndpZHRoKVxuICAgICAgICAgICAgLmF0dHIoJ2hlaWdodCcsIHRoaXMuaGVpZ2h0ICsgdGhpcy50aWNrU2l6ZSArIDIgKyAxMClcblxuICAgICAgICAvL2RyYXcgZ3JhcGhpYyBlbGVtZW50c1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5iOyBpKyspIHtcbiAgICAgICAgICAgIHN2Zy5hcHBlbmQoJ3JlY3QnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCd4JywgaSAqIHcpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3knLCAwKVxuICAgICAgICAgICAgICAgIC5hdHRyKCd3aWR0aCcsIHcpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2hlaWdodCcsIHRoaXMuaGVpZ2h0KVxuICAgICAgICAgICAgICAgIC5zdHlsZSgnZmlsbCcsIGNvbG9yc1tpXSlcbiAgICAgICAgfVxuXG4gICAgICAgIC8vdGljayBsaW5lXG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgbmI7IGkrKykge1xuICAgICAgICAgICAgc3ZnLmFwcGVuZCgnbGluZScpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3gxJywgdyAqIGkpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3kxJywgMClcbiAgICAgICAgICAgICAgICAuYXR0cigneDInLCB3ICogaSlcbiAgICAgICAgICAgICAgICAuYXR0cigneTInLCB0aGlzLmhlaWdodCArIHRoaXMudGlja1NpemUpXG4gICAgICAgICAgICAgICAgLnN0eWxlKCdzdHJva2UnLCAnYmxhY2snKVxuICAgICAgICB9XG5cbiAgICAgICAgLy9sYWJlbHNcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBuYjsgaSsrKSB7XG5cbiAgICAgICAgICAgIGxldCBsYWJlbCA9IGJyZWFrc1tpIC0gMV1cbiAgICAgICAgICAgIGlmIChpc05hTihsYWJlbCkgfHwgbGFiZWwgPT0gdW5kZWZpbmVkKSBjb250aW51ZVxuXG4gICAgICAgICAgICAvL2xhYmVsXG4gICAgICAgICAgICBzdmcuYXBwZW5kKCd0ZXh0JylcbiAgICAgICAgICAgICAgICAuYXR0cignaWQnLCAndGlja2xhYmVsXycgKyBpKVxuICAgICAgICAgICAgICAgIC5hdHRyKCd4JywgdyAqIGkpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3knLCB0aGlzLmhlaWdodCArIHRoaXMudGlja1NpemUgKyAyKVxuICAgICAgICAgICAgICAgIC5zdHlsZSgnZm9udC1zaXplJywgdGhpcy5sYWJlbEZvbnRTaXplKVxuICAgICAgICAgICAgICAgIC8vLnN0eWxlKFwiZm9udC13ZWlnaHRcIiwgXCJib2xkXCIpXG4gICAgICAgICAgICAgICAgLy8uc3R5bGUoXCJmb250LWZhbWlseVwiLCBcIkFyaWFsXCIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKCd0ZXh0LWFuY2hvcicsICdtaWRkbGUnKVxuICAgICAgICAgICAgICAgIC5zdHlsZSgnYWxpZ25tZW50LWJhc2VsaW5lJywgJ3RvcCcpXG4gICAgICAgICAgICAgICAgLnN0eWxlKCdkb21pbmFudC1iYXNlbGluZScsICdoYW5naW5nJylcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ3BvaW50ZXItZXZlbnRzJywgJ25vbmUnKVxuICAgICAgICAgICAgICAgIC50ZXh0KGxhYmVsKVxuICAgICAgICB9XG4gICAgfVxufVxuIiwiLy9AdHMtY2hlY2tcbid1c2Ugc3RyaWN0J1xuXG5pbXBvcnQgeyBMZWdlbmQgfSBmcm9tICcuLi9MZWdlbmQuanMnXG5cbi8qKlxuICogQSBsZWdlbmQgZWxlbWVudCBmb3IgY29udGludW91cyBjb2xvciBzdHlsZS5cbiAqIEluc3BpcmF0aW9uOiBodHRwczovL29ic2VydmFibGVocS5jb20vQGQzL2NvbG9yLWxlZ2VuZFxuICpcbiAqIEBhdXRob3IgSm9zZXBoIERhdmllcywgSnVsaWVuIEdhZmZ1cmlcbiAqL1xuZXhwb3J0IGNsYXNzIENvbG9yTGVnZW5kIGV4dGVuZHMgTGVnZW5kIHtcbiAgICAvKiogQHBhcmFtIHtPYmplY3R9IG9wdHMgKi9cbiAgICBjb25zdHJ1Y3RvcihvcHRzKSB7XG4gICAgICAgIHN1cGVyKG9wdHMpXG4gICAgICAgIG9wdHMgPSBvcHRzIHx8IHt9XG5cbiAgICAgICAgLy9hIGZ1bmN0aW9uIFswLDFdLT5jb2xvciBmb3IgY29udGludW91cyBjb2xvcnNcbiAgICAgICAgLy9vciBhcnJheSBvZiBjb2xvcnMgZm9yIGRpc2NyZXRlIGNvbG9yc1xuICAgICAgICB0aGlzLmNvbG9yU2NhbGUgPSBvcHRzLmNvbG9yU2NhbGVcblxuICAgICAgICAvL2Z1bmN0aW9uICh0WzAsMV0pIC0+IHZhbHVlIChmb3IgbGFiZWwgdGV4dClcbiAgICAgICAgdGhpcy50ZXh0U2NhbGUgPSBvcHRzLnRleHRTY2FsZSB8fCAodCA9PiB0KVxuXG4gICAgICAgIHRoaXMudGl0bGUgPSBvcHRzLnRpdGxlXG4gICAgICAgIHRoaXMudGlja1NpemUgPSBvcHRzLnRpY2tTaXplIHx8IDZcbiAgICAgICAgdGhpcy53aWR0aCA9IG9wdHMud2lkdGggfHwgMzAwXG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gb3B0cy5oZWlnaHQgfHwgMTVcbiAgICAgICAgdGhpcy5tYXJnaW4gPSBvcHRzLm1hcmdpbiB8fCA1XG4gICAgICAgIHRoaXMudGlja3MgPSBvcHRzLnRpY2tzIHx8IE1hdGguZmxvb3IodGhpcy53aWR0aCAvIDUwKVxuICAgICAgICB0aGlzLnRpY2tGb3JtYXQgPSBvcHRzLnRpY2tGb3JtYXRcbiAgICAgICAgdGhpcy50aWNrVW5pdCA9IG9wdHMudGlja1VuaXRcblxuICAgICAgICB0aGlzLmZvbnRTaXplID0gb3B0cy5mb250U2l6ZSB8fCAnMC44ZW0nXG4gICAgICAgIHRoaXMuaW52ZXJ0ID0gb3B0cy5pbnZlcnRcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3t2aWV3U2NhbGU6aW1wb3J0KCcuLi9TdHlsZScpLlZpZXdTY2FsZX0gfSBvcHRzXG4gICAgICovXG4gICAgdXBkYXRlKG9wdHMpIHtcbiAgICAgICAgLy9jb3VsZCBoYXBwZW4gd2hlbiBkYXRhIGlzIHN0aWxsIGxvYWRpbmdcbiAgICAgICAgLy9pZiAoIW9wdHMuc0NvbG9yKSByZXR1cm5cblxuICAgICAgICAvL2NsZWFyXG4gICAgICAgIHRoaXMuZGl2LnNlbGVjdEFsbCgnKicpLnJlbW92ZSgpXG5cbiAgICAgICAgY29uc3QgdGl0bGVIZWlnaHQgPSAxMlxuXG4gICAgICAgIGNvbnN0IHN2Z1cgPSB0aGlzLndpZHRoICsgMiAqIHRoaXMubWFyZ2luXG4gICAgICAgIGNvbnN0IHN2Z0ggPSB0aGlzLmhlaWdodCArIDMgKiB0aGlzLm1hcmdpbiArIHRpdGxlSGVpZ2h0ICsgdGhpcy50aWNrU2l6ZSArIDEwXG4gICAgICAgIGNvbnN0IHN2ZyA9IHRoaXMuZGl2LmFwcGVuZCgnc3ZnJykuYXR0cignd2lkdGgnLCBzdmdXKS5hdHRyKCdoZWlnaHQnLCBzdmdIKVxuICAgICAgICAvLyAgPHJlY3Qgd2lkdGg9XCIzMDBcIiBoZWlnaHQ9XCIxMDBcIiBzdHlsZT1cImZpbGw6cmdiKDAsMCwyNTUpO3N0cm9rZS13aWR0aDozO3N0cm9rZTpyZ2IoMCwwLDApXCIgLz5cblxuICAgICAgICAvL3RpdGxlXG4gICAgICAgIHN2Zy5hcHBlbmQoJ3RleHQnKVxuICAgICAgICAgICAgLmF0dHIoJ3gnLCB0aGlzLm1hcmdpbilcbiAgICAgICAgICAgIC5hdHRyKCd5JywgdGhpcy5tYXJnaW4pXG4gICAgICAgICAgICAuc3R5bGUoJ2ZvbnQtc2l6ZScsICcwLjhlbScpXG4gICAgICAgICAgICAuc3R5bGUoJ2ZvbnQtd2VpZ2h0JywgJ2JvbGQnKVxuICAgICAgICAgICAgLnN0eWxlKCdhbGlnbm1lbnQtYmFzZWxpbmUnLCAndG9wJylcbiAgICAgICAgICAgIC5zdHlsZSgnZG9taW5hbnQtYmFzZWxpbmUnLCAnaGFuZ2luZycpXG4gICAgICAgICAgICAuc3R5bGUoJ3BvaW50ZXItZXZlbnRzJywgJ25vbmUnKVxuICAgICAgICAgICAgLnRleHQodGhpcy50aXRsZSlcblxuICAgICAgICBjb25zdCBnID0gc3ZnXG4gICAgICAgICAgICAuYXBwZW5kKCdnJylcbiAgICAgICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKCcgKyB0aGlzLm1hcmdpbiArICcgJyArICgyICogdGhpcy5tYXJnaW4gKyB0aXRsZUhlaWdodCkgKyAnKScpXG5cbiAgICAgICAgLy9kcmF3IGNvbG9yIGJhclxuICAgICAgICBjb25zdCB3ID0gdGhpcy53aWR0aCxcbiAgICAgICAgICAgIGggPSB0aGlzLmhlaWdodFxuICAgICAgICBjb25zdCBzdGVwID0gNVxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHc7IGkgKz0gc3RlcCkge1xuICAgICAgICAgICAgbGV0IHQgPSBpIC8gKHcgLSAxKVxuICAgICAgICAgICAgaWYgKHRoaXMuaW52ZXJ0KSB0ID0gMSAtIHRcbiAgICAgICAgICAgIGcuYXBwZW5kKCdyZWN0JylcbiAgICAgICAgICAgICAgICAuYXR0cigneCcsIGkpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3knLCAwKVxuICAgICAgICAgICAgICAgIC5hdHRyKCd3aWR0aCcsIHN0ZXApXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2hlaWdodCcsIGgpXG4gICAgICAgICAgICAgICAgLnN0eWxlKCdmaWxsJywgdGhpcy5jb2xvclNjYWxlKHQsIG9wdHMudmlld1NjYWxlKSlcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy50aWNrczsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgdCA9IGkgLyAodGhpcy50aWNrcyAtIDEpXG5cbiAgICAgICAgICAgIC8vdGljayBsaW5lXG4gICAgICAgICAgICBnLmFwcGVuZCgnbGluZScpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3gxJywgdyAqIHQpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3kxJywgMClcbiAgICAgICAgICAgICAgICAuYXR0cigneDInLCB3ICogdClcbiAgICAgICAgICAgICAgICAuYXR0cigneTInLCBoICsgdGhpcy50aWNrU2l6ZSlcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ3N0cm9rZScsICdibGFjaycpXG5cbiAgICAgICAgICAgIC8vcHJlcGFyZSB0aWNrIGxhYmVsXG4gICAgICAgICAgICBnLmFwcGVuZCgndGV4dCcpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2lkJywgJ3RpY2tsYWJlbF8nICsgaSlcbiAgICAgICAgICAgICAgICAuYXR0cigneCcsIHcgKiB0KVxuICAgICAgICAgICAgICAgIC5hdHRyKCd5JywgaCArIHRoaXMudGlja1NpemUgKyAyKVxuICAgICAgICAgICAgICAgIC5zdHlsZSgnZm9udC1zaXplJywgdGhpcy5mb250U2l6ZSlcbiAgICAgICAgICAgICAgICAvLy5zdHlsZShcImZvbnQtd2VpZ2h0XCIsIFwiYm9sZFwiKVxuICAgICAgICAgICAgICAgIC8vLnN0eWxlKFwiZm9udC1mYW1pbHlcIiwgXCJBcmlhbFwiKVxuICAgICAgICAgICAgICAgIC5zdHlsZSgndGV4dC1hbmNob3InLCBpID09IDAgPyAnc3RhcnQnIDogaSA9PSB0aGlzLnRpY2tzIC0gMSA/ICdlbmQnIDogJ21pZGRsZScpXG4gICAgICAgICAgICAgICAgLnN0eWxlKCdhbGlnbm1lbnQtYmFzZWxpbmUnLCAndG9wJylcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ2RvbWluYW50LWJhc2VsaW5lJywgJ2hhbmdpbmcnKVxuICAgICAgICAgICAgICAgIC5zdHlsZSgncG9pbnRlci1ldmVudHMnLCAnbm9uZScpXG4gICAgICAgICAgICAvLy50ZXh0KFwiLVwiKVxuICAgICAgICB9XG5cbiAgICAgICAgLy91cGRhdGUgdGljayBsYWJlbHNcblxuICAgICAgICAvL2xhYmVsIHRleHQgZm9ybWF0XG4gICAgICAgIGNvbnN0IGYgPSB0aGlzLnRpY2tGb3JtYXQgJiYgdGhpcy50aWNrRm9ybWF0ICE9ICd0ZXh0JyA/IHRoaXMudGlja0Zvcm1hdCA6ICh2KSA9PiB2XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy50aWNrczsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgdCA9IGkgLyAodGhpcy50aWNrcyAtIDEpXG5cbiAgICAgICAgICAgIGNvbnN0IHYgPSB0aGlzLnRleHRTY2FsZSh0LCBvcHRzLnZpZXdTY2FsZSlcbiAgICAgICAgICAgIGNvbnN0IHRleHQgPSAodiA/IGYodikgOiAnMCcpICsgKHRoaXMudGlja1VuaXQgPyB0aGlzLnRpY2tVbml0IDogJycpXG5cbiAgICAgICAgICAgIC8vdGljayBsYWJlbFxuICAgICAgICAgICAgdGhpcy5kaXYuc2VsZWN0KCcjJyArICd0aWNrbGFiZWxfJyArIGkpLnRleHQodGV4dClcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIi8vQHRzLWNoZWNrXG4ndXNlIHN0cmljdCdcblxuaW1wb3J0IHsgTGVnZW5kIH0gZnJvbSAnLi4vTGVnZW5kLmpzJ1xuXG4vKipcbiAqIEEgbGVnZW5kIGVsZW1lbnQgZm9yIHNlZ21lbnQgb3JpZW50YXRpb24uXG4gKlxuICogQGF1dGhvciBKb3NlcGggRGF2aWVzLCBKdWxpZW4gR2FmZnVyaVxuICovXG5leHBvcnQgY2xhc3MgU2VnbWVudE9yaWVudGF0aW9uTGVnZW5kIGV4dGVuZHMgTGVnZW5kIHtcbiAgICAvKiogQHBhcmFtIHtPYmplY3R9IG9wdHMgKi9cbiAgICBjb25zdHJ1Y3RvcihvcHRzKSB7XG4gICAgICAgIHN1cGVyKG9wdHMpXG4gICAgICAgIG9wdHMgPSBvcHRzIHx8IHt9XG5cbiAgICAgICAgLy90aXRsZVxuICAgICAgICB0aGlzLnRpdGxlID0gb3B0cy50aXRsZVxuICAgICAgICB0aGlzLnRpdGxlRm9udFNpemUgPSBvcHRzLnRpdGxlRm9udFNpemUgfHwgJzAuOGVtJ1xuICAgICAgICB0aGlzLnRpdGxlRm9udFdlaWdodCA9IG9wdHMudGl0bGVGb250V2VpZ2h0IHx8ICdib2xkJ1xuXG4gICAgICAgIC8vZXhhZ2VyYXRpb25cbiAgICAgICAgdGhpcy5leGFnZ2VyYXRpb25GYWN0b3IgPSBvcHRzLmV4YWdnZXJhdGlvbkZhY3RvciB8fCAwLjVcblxuICAgICAgICAvL2NvbG9yXG4gICAgICAgIHRoaXMuY29sb3IgPSBvcHRzLmNvbG9yIHx8ICdncmF5J1xuICAgICAgICAvL29yaWVudGF0aW9uXG4gICAgICAgIHRoaXMub3JpZW50YXRpb24gPSBvcHRzLm9yaWVudGF0aW9uIHx8IDBcbiAgICAgICAgLy93aWR0aFxuICAgICAgICB0aGlzLndpZHRoUGl4ID0gb3B0cy53aWR0aFBpeCB8fCAzXG5cbiAgICAgICAgLy9sYWJlbFxuICAgICAgICB0aGlzLmxhYmVsRm9udFNpemUgPSBvcHRzLmxhYmVsRm9udFNpemUgfHwgJzAuOGVtJ1xuICAgICAgICB0aGlzLmxhYmVsVW5pdFRleHQgPSBvcHRzLmxhYmVsVW5pdFRleHQgfHwgJydcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3sgc3R5bGU6IGltcG9ydChcIi4uL3N0eWxlL1NlZ21lbnRTdHlsZVwiKS5TZWdtZW50U3R5bGUsIHI6IG51bWJlciwgejogbnVtYmVyLCBzQ29sb3I6IGltcG9ydChcIi4uL1N0eWxlXCIpLlN0YXQsIHNMZW5ndGg6IGltcG9ydChcIi4uL1N0eWxlXCIpLlN0YXQsIHNXaWR0aDogaW1wb3J0KFwiLi4vU3R5bGVcIikuU3RhdCB9fSBvcHRzXG4gICAgICovXG4gICAgdXBkYXRlKG9wdHMpIHtcbiAgICAgICAgLy9jb3VsZCBoYXBwZW4gd2hlbiBkYXRhIGlzIHN0aWxsIGxvYWRpbmdcbiAgICAgICAgaWYgKCFvcHRzLnNXaWR0aCkgcmV0dXJuXG5cbiAgICAgICAgLy9jbGVhclxuICAgICAgICB0aGlzLmRpdi5zZWxlY3RBbGwoJyonKS5yZW1vdmUoKVxuXG4gICAgICAgIGNvbnN0IGQgPSB0aGlzLmRpdi5hcHBlbmQoJ2RpdicpXG5cbiAgICAgICAgLy90aXRsZVxuICAgICAgICBpZiAodGhpcy50aXRsZSkge1xuICAgICAgICAgICAgZC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3RpdGxlJylcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ2ZvbnQtc2l6ZScsIHRoaXMudGl0bGVGb250U2l6ZSlcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ2ZvbnQtd2VpZ2h0JywgdGhpcy50aXRsZUZvbnRXZWlnaHQpXG4gICAgICAgICAgICAgICAgLnRleHQodGhpcy50aXRsZSlcbiAgICAgICAgfVxuXG4gICAgICAgIC8vY29tcHV0ZSBzZWdtZW50IHdpZHRoIGFuZCBsZW5ndGgsIGluIHBpeFxuICAgICAgICBjb25zdCBzV2lkdGggPSB0aGlzLndpZHRoUGl4XG4gICAgICAgIGNvbnN0IHNMZW5ndGggPSAoMSAqIG9wdHMucikgLyBvcHRzLnpcblxuICAgICAgICAvL2RyYXcgU1ZHIHNlZ21lbnRcbiAgICAgICAgY29uc3Qgc3ZnUyA9IE1hdGgubWF4KHNMZW5ndGgsIHNXaWR0aClcbiAgICAgICAgY29uc3Qgc3ZnID0gZC5hcHBlbmQoJ3N2ZycpLmF0dHIoJ3dpZHRoJywgc3ZnUykuYXR0cignaGVpZ2h0Jywgc3ZnUykuc3R5bGUoJycsICdpbmxpbmUtYmxvY2snKVxuXG4gICAgICAgIGNvbnN0IGNvcyA9IE1hdGguY29zKCgtdGhpcy5vcmllbnRhdGlvbiAqIE1hdGguUEkpIC8gMTgwKVxuICAgICAgICBjb25zdCBzaW4gPSBNYXRoLnNpbigoLXRoaXMub3JpZW50YXRpb24gKiBNYXRoLlBJKSAvIDE4MClcbiAgICAgICAgY29uc3QgZGMgPSBzdmdTICogMC41LFxuICAgICAgICAgICAgbDIgPSBzTGVuZ3RoICogMC41XG4gICAgICAgIHN2Zy5hcHBlbmQoJ2xpbmUnKVxuICAgICAgICAgICAgLmF0dHIoJ3gxJywgZGMgLSBjb3MgKiBsMilcbiAgICAgICAgICAgIC5hdHRyKCd5MScsIGRjIC0gc2luICogbDIpXG4gICAgICAgICAgICAuYXR0cigneDInLCBkYyArIGNvcyAqIGwyKVxuICAgICAgICAgICAgLmF0dHIoJ3kyJywgZGMgKyBzaW4gKiBsMilcbiAgICAgICAgICAgIC5zdHlsZSgnc3Ryb2tlJywgdGhpcy5jb2xvcilcbiAgICAgICAgICAgIC5zdHlsZSgnc3Ryb2tlLXdpZHRoJywgc1dpZHRoKVxuXG4gICAgICAgIC8vdGV4dCBsYWJlbFxuICAgICAgICBkLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgIC8vc2hvdyBvbiByaWdodCBvZiBzdmdcbiAgICAgICAgICAgIC5zdHlsZSgnZGlzcGxheScsICdpbmxpbmUnKVxuICAgICAgICAgICAgLnN0eWxlKCdwYWRkaW5nLWxlZnQnLCAnNXB4JylcbiAgICAgICAgICAgIC5zdHlsZSgnZm9udC1zaXplJywgdGhpcy5sYWJlbEZvbnRTaXplKVxuICAgICAgICAgICAgLy8uc3R5bGUoXCJmb250LXdlaWdodFwiLCBcImJvbGRcIilcbiAgICAgICAgICAgIC50ZXh0KHRoaXMubGFiZWxVbml0VGV4dClcbiAgICB9XG59XG4iLCIvL0B0cy1jaGVja1xuJ3VzZSBzdHJpY3QnXG5cbmltcG9ydCB7IExlZ2VuZCB9IGZyb20gJy4uL0xlZ2VuZC5qcydcblxuLyoqXG4gKiBBIGxlZ2VuZCBlbGVtZW50IGZvciBzZWdtZW50IHdpZHRoLlxuICpcbiAqIEBhdXRob3IgSm9zZXBoIERhdmllcywgSnVsaWVuIEdhZmZ1cmlcbiAqL1xuZXhwb3J0IGNsYXNzIFNlZ21lbnRXaWR0aExlZ2VuZCBleHRlbmRzIExlZ2VuZCB7XG4gICAgLyoqIEBwYXJhbSB7T2JqZWN0fSBvcHRzICovXG4gICAgY29uc3RydWN0b3Iob3B0cykge1xuICAgICAgICBzdXBlcihvcHRzKVxuICAgICAgICBvcHRzID0gb3B0cyB8fCB7fVxuXG4gICAgICAgIC8vdGl0bGVcbiAgICAgICAgdGhpcy50aXRsZSA9IG9wdHMudGl0bGVcbiAgICAgICAgdGhpcy50aXRsZUZvbnRTaXplID0gb3B0cy50aXRsZUZvbnRTaXplIHx8ICcwLjhlbSdcbiAgICAgICAgdGhpcy50aXRsZUZvbnRXZWlnaHQgPSBvcHRzLnRpdGxlRm9udFdlaWdodCB8fCAnYm9sZCdcblxuICAgICAgICAvL2V4YWdlcmF0aW9uXG4gICAgICAgIC8vaWYgc2V0IHRvIDEsIHRoZSBzZWdtZW50IHdpZHRoIGluIHRoZSBsZWdlbmQgd2lsbCBiZSB0aGUgb25lIG9mIHRoZSBtYXhpbXVtIHdpZHRoIG9uIHRoZSBtYXBcbiAgICAgICAgdGhpcy5leGFnZ2VyYXRpb25GYWN0b3IgPSBvcHRzLmV4YWdnZXJhdGlvbkZhY3RvciB8fCAwLjVcblxuICAgICAgICAvL2NvbG9yIG9mIHRoZSBzZWdtZW50IGluIHRoZSBsZWdlbmRcbiAgICAgICAgdGhpcy5jb2xvciA9IG9wdHMuY29sb3IgfHwgJ2dyYXknXG4gICAgICAgIC8vb3JpZW50YXRpb24gb2YgdGhlIHNlZ21lbnQgaW4gdGhlIGxlZ2VuZFxuICAgICAgICB0aGlzLm9yaWVudGF0aW9uID0gb3B0cy5vcmllbnRhdGlvbiB8fCAwXG5cbiAgICAgICAgLy9sYWJlbFxuICAgICAgICB0aGlzLmxhYmVsRm9udFNpemUgPSBvcHRzLmxhYmVsRm9udFNpemUgfHwgJzAuOGVtJ1xuICAgICAgICB0aGlzLmxhYmVsVW5pdFRleHQgPSBvcHRzLmxhYmVsVW5pdFRleHQgfHwgJydcbiAgICAgICAgdGhpcy5sYWJlbEZvcm1hdCA9IG9wdHMubGFiZWxGb3JtYXRcblxuICAgICAgICAvL3NlZ21lbnQgbGVuZ3RoIGluIGdlbyB1bml0IC0gYSBmdW5jdGlvbiBvZiB0aGUgcmVzb2x1dGlvbiByIGFuZCB6b29tIGxldmVsIHpcbiAgICAgICAgdGhpcy5sZW5ndGhGdW4gPSBvcHRzLmxlbmd0aEV4YWdnZXJhdGlvbkZhY3RvciB8fCAoKHIsIHopID0+IHIpXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHt7IHN0eWxlOiBpbXBvcnQoXCIuLi9zdHlsZS9TZWdtZW50U3R5bGVcIikuU2VnbWVudFN0eWxlLCByOiBudW1iZXIsIHo6IG51bWJlciwgc0NvbG9yOiBpbXBvcnQoXCIuLi9TdHlsZVwiKS5TdGF0LCBzTGVuZ3RoOiBpbXBvcnQoXCIuLi9TdHlsZVwiKS5TdGF0LCBzV2lkdGg6IGltcG9ydChcIi4uL1N0eWxlXCIpLlN0YXQgfX0gb3B0c1xuICAgICAqL1xuICAgIHVwZGF0ZShvcHRzKSB7XG4gICAgICAgIC8vY291bGQgaGFwcGVuIHdoZW4gZGF0YSBpcyBzdGlsbCBsb2FkaW5nXG4gICAgICAgIGlmICghb3B0cy5zV2lkdGgpIHJldHVyblxuXG4gICAgICAgIC8vY2xlYXJcbiAgICAgICAgdGhpcy5kaXYuc2VsZWN0QWxsKCcqJykucmVtb3ZlKClcblxuICAgICAgICBjb25zdCBkID0gdGhpcy5kaXYuYXBwZW5kKCdkaXYnKVxuXG4gICAgICAgIC8vdGl0bGVcbiAgICAgICAgaWYgKHRoaXMudGl0bGUpIHtcbiAgICAgICAgICAgIGQuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICd0aXRsZScpXG4gICAgICAgICAgICAgICAgLnN0eWxlKCdmb250LXNpemUnLCB0aGlzLnRpdGxlRm9udFNpemUpXG4gICAgICAgICAgICAgICAgLnN0eWxlKCdmb250LXdlaWdodCcsIHRoaXMudGl0bGVGb250V2VpZ2h0KVxuICAgICAgICAgICAgICAgIC50ZXh0KHRoaXMudGl0bGUpXG4gICAgICAgIH1cblxuICAgICAgICAvL2dldCBzZWdtZW50IG1heCB2YWx1ZVxuICAgICAgICBjb25zdCB2YWx1ZV8gPSBvcHRzLnNXaWR0aC5tYXggKiB0aGlzLmV4YWdnZXJhdGlvbkZhY3RvclxuICAgICAgICAvL1RPRE8gdXNlIGdyaWR2aXoubmljZSBmdW5jdGlvblxuICAgICAgICAvL21ha2UgJ25pY2UnIHZhbHVlIChwb3dlciBvZiB0ZW4sIG9yIG11bHRpcGxlKVxuICAgICAgICBsZXQgcG93MTAgPSBNYXRoLmxvZzEwKHZhbHVlXylcbiAgICAgICAgcG93MTAgPSBNYXRoLmZsb29yKHBvdzEwKVxuICAgICAgICBsZXQgdmFsdWUgPSBNYXRoLnBvdygxMCwgcG93MTApXG4gICAgICAgIGlmICh2YWx1ZSAqIDggPD0gdmFsdWVfKSB2YWx1ZSAqPSA4XG4gICAgICAgIGVsc2UgaWYgKHZhbHVlICogNiA8PSB2YWx1ZV8pIHZhbHVlICo9IDZcbiAgICAgICAgZWxzZSBpZiAodmFsdWUgKiA1IDw9IHZhbHVlXykgdmFsdWUgKj0gNVxuICAgICAgICBlbHNlIGlmICh2YWx1ZSAqIDQgPD0gdmFsdWVfKSB2YWx1ZSAqPSA0XG4gICAgICAgIGVsc2UgaWYgKHZhbHVlICogMi41IDw9IHZhbHVlXykgdmFsdWUgKj0gMi41XG4gICAgICAgIGVsc2UgaWYgKHZhbHVlICogMiA8PSB2YWx1ZV8pIHZhbHVlICo9IDJcbiAgICAgICAgZWxzZSBpZiAodmFsdWUgKiAxLjUgPD0gdmFsdWVfKSB2YWx1ZSAqPSAxLjVcblxuICAgICAgICAvL2NvbXB1dGUgc2VnbWVudCB3aWR0aCBhbmQgbGVuZ3RoLCBpbiBwaXhcbiAgICAgICAgY29uc3Qgc1dpZHRoID0gb3B0cy53aWR0aEZ1bih2YWx1ZSwgb3B0cy5yLCBvcHRzLnNXaWR0aCwgb3B0cy56KSAvIG9wdHMuelxuICAgICAgICBjb25zdCBzTGVuZ3RoID0gdGhpcy5sZW5ndGhGdW4ob3B0cy5yLCBvcHRzLnopIC8gb3B0cy56XG5cbiAgICAgICAgLy9UT0RPIHVzZSBvcmllbnRhdGlvblxuXG4gICAgICAgIGNvbnN0IHN2ZyA9IGQuYXBwZW5kKCdzdmcnKS5hdHRyKCd3aWR0aCcsIHNMZW5ndGgpLmF0dHIoJ2hlaWdodCcsIHNXaWR0aCkuc3R5bGUoJycsICdpbmxpbmUtYmxvY2snKVxuXG4gICAgICAgIC8vPGxpbmUgeDE9XCIwXCIgeTE9XCIwXCIgeDI9XCIyMDBcIiB5Mj1cIjIwMFwiIHN0eWxlPVwic3Ryb2tlOnJnYigyNTUsMCwwKTtzdHJva2Utd2lkdGg6MlwiIC8+XG4gICAgICAgIHN2Zy5hcHBlbmQoJ2xpbmUnKVxuICAgICAgICAgICAgLmF0dHIoJ3gxJywgMClcbiAgICAgICAgICAgIC5hdHRyKCd5MScsIHNXaWR0aCAvIDIpXG4gICAgICAgICAgICAuYXR0cigneDInLCBzTGVuZ3RoKVxuICAgICAgICAgICAgLmF0dHIoJ3kyJywgc1dpZHRoIC8gMilcbiAgICAgICAgICAgIC5zdHlsZSgnc3Ryb2tlJywgdGhpcy5jb2xvcilcbiAgICAgICAgICAgIC5zdHlsZSgnc3Ryb2tlLXdpZHRoJywgc1dpZHRoKVxuXG4gICAgICAgIGNvbnN0IHZhbHVlVCA9IHRoaXMubGFiZWxGb3JtYXQ/IHRoaXMubGFiZWxGb3JtYXQodmFsdWUpIDogdmFsdWVcbiAgICAgICAgZC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAvL3Nob3cgb24gcmlnaHQgb2YgZ3JhcGhpY1xuICAgICAgICAgICAgLnN0eWxlKCdkaXNwbGF5JywgJ2lubGluZScpXG4gICAgICAgICAgICAuc3R5bGUoJ3BhZGRpbmctbGVmdCcsICc1cHgnKVxuICAgICAgICAgICAgLnN0eWxlKCdmb250LXNpemUnLCB0aGlzLmxhYmVsRm9udFNpemUpXG4gICAgICAgICAgICAvLy5zdHlsZShcImZvbnQtd2VpZ2h0XCIsIFwiYm9sZFwiKVxuICAgICAgICAgICAgLnRleHQodmFsdWVUICsgKHRoaXMubGFiZWxVbml0VGV4dCA/ICcgJyA6ICcnKSArIHRoaXMubGFiZWxVbml0VGV4dClcbiAgICB9XG59XG4iLCIvL0B0cy1jaGVja1xuJ3VzZSBzdHJpY3QnXG5cbmltcG9ydCB7IExlZ2VuZCB9IGZyb20gJy4uL0xlZ2VuZC5qcydcblxuLyoqXG4gKiBBIGxlZ2VuZCBlbGVtZW50IGZvciBwcm9wb3J0aW9uYWwgc3ltYm9scy5cbiAqXG4gKiBAYXV0aG9yIEpvc2VwaCBEYXZpZXMsIEp1bGllbiBHYWZmdXJpXG4gKi9cbmV4cG9ydCBjbGFzcyBTaXplTGVnZW5kIGV4dGVuZHMgTGVnZW5kIHtcbiAgICAvKiogQHBhcmFtIHtPYmplY3R9IG9wdHMgKi9cbiAgICBjb25zdHJ1Y3RvcihvcHRzKSB7XG4gICAgICAgIHN1cGVyKG9wdHMpXG4gICAgICAgIG9wdHMgPSBvcHRzIHx8IHt9XG5cbiAgICAgICAgLy9pZiBsYWJlbCBpcyB0byBiZSBzaG93blxuICAgICAgICB0aGlzLmxhYmVsID0gb3B0cy5sYWJlbCB8fCB1bmRlZmluZWRcbiAgICAgICAgLy9pZiBzaXplIGNvcnJlc3BvbmRpbmcgdG8gdGhlIHZhbHVlXG4gICAgICAgIHRoaXMuc2l6ZVBpeCA9IG9wdHMuc2l6ZVBpeCB8fCB1bmRlZmluZWRcblxuICAgICAgICAvL3RpdGxlXG4gICAgICAgIHRoaXMudGl0bGUgPSBvcHRzLnRpdGxlXG4gICAgICAgIHRoaXMudGl0bGVGb250U2l6ZSA9IG9wdHMudGl0bGVGb250U2l6ZSB8fCAnMC44ZW0nXG4gICAgICAgIHRoaXMudGl0bGVGb250V2VpZ2h0ID0gb3B0cy50aXRsZUZvbnRXZWlnaHQgfHwgJ2JvbGQnXG5cbiAgICAgICAgLy9zeW1ib2xcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqIEB0eXBlIHtpbXBvcnQoXCIuLi9TdHlsZVwiKS5TaGFwZX0gKi9cbiAgICAgICAgdGhpcy5zaGFwZSA9IG9wdHMuc2hhcGUgfHwgJ2NpcmNsZSdcbiAgICAgICAgdGhpcy5maWxsQ29sb3IgPSBvcHRzLmZpbGxDb2xvciB8fCAnbm9uZSdcbiAgICAgICAgdGhpcy5zdHJva2VDb2xvciA9IG9wdHMuc3Ryb2tlQ29sb3IgfHwgJ2dyYXknXG4gICAgICAgIHRoaXMuc3Ryb2tlV2lkdGggPSBvcHRzLnN0cm9rZVdpZHRoIHx8IDFcblxuICAgICAgICAvL2xhYmVsXG4gICAgICAgIHRoaXMubGFiZWxGb250U2l6ZSA9IG9wdHMubGFiZWxGb250U2l6ZSB8fCAnMC44ZW0nXG4gICAgICAgIHRoaXMubGFiZWxVbml0VGV4dCA9IG9wdHMubGFiZWxVbml0VGV4dCB8fCAnJ1xuICAgICAgICB0aGlzLmxhYmVsRm9ybWF0ID0gb3B0cy5sYWJlbEZvcm1hdFxuXG4gICAgICAgIC8vXG4gICAgICAgIC8vdGhpcy5kaXYuc3R5bGUoXCJ0ZXh0LWFsaWduXCIsIFwiY2VudGVyXCIpXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHt7IHZpZXdTY2FsZTppbXBvcnQoJy4uL1N0eWxlJykuVmlld1NjYWxlLCB6Om51bWJlciwgY2VsbHM6QXJyYXkuPGltcG9ydCgnLi4vRGF0YXNldC5qcycpLkNlbGw+IH19IG9wdHNcbiAgICAgKi9cbiAgICB1cGRhdGUob3B0cykge1xuXG4gICAgICAgIC8vY2xlYXJcbiAgICAgICAgdGhpcy5kaXYuc2VsZWN0QWxsKCcqJykucmVtb3ZlKClcblxuXG4gICAgICAgIC8vZ2V0IGxhYmVsLiBNYXkgbm90IGJlIGEgbnVtYmVyICghKVxuICAgICAgICBsZXQgbGFiZWwgPSB0aGlzLmxhYmVsKG9wdHMudmlld1NjYWxlLCBvcHRzLmNlbGxzKVxuXG4gICAgICAgIC8vY29tcHV0ZSBzaXplIG9mIHN5bWJvbCwgaW4gcGl4XG4gICAgICAgIGxldCBzaXplUGl4XG4gICAgICAgIGlmICh0aGlzLnNpemVQaXgpXG4gICAgICAgICAgICBzaXplUGl4ID0gdGhpcy5zaXplUGl4KG9wdHMudmlld1NjYWxlLCBvcHRzLnopXG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHNpemVQaXggPSBvcHRzLnZpZXdTY2FsZSgrbGFiZWwpIC8gb3B0cy56XG4gICAgICAgIGlmICghc2l6ZVBpeCkgcmV0dXJuXG5cbiAgICAgICAgLy9mb3JtYXQgbGFiZWwgdGV4dCB3aXRoIGZvcm1hdCBmdW5jdGlvblxuICAgICAgICBpZiAodGhpcy5sYWJlbEZvcm1hdCAmJiAhaXNOYU4oK2xhYmVsKSkgbGFiZWwgPSB0aGlzLmxhYmVsRm9ybWF0KGxhYmVsKVxuXG5cbiAgICAgICAgY29uc3QgZCA9IHRoaXMuZGl2LmFwcGVuZCgnZGl2JylcbiAgICAgICAgLy90byBlbmFibGUgdmVydGljYWwgY2VudGVyaW5nXG4gICAgICAgIC8vLnN0eWxlKFwicG9zaXRpb25cIiwgXCJyZWxhdGl2ZVwiKVxuXG4gICAgICAgIC8vdGl0bGVcbiAgICAgICAgaWYgKHRoaXMudGl0bGUpIHtcbiAgICAgICAgICAgIGQuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICd0aXRsZScpXG4gICAgICAgICAgICAgICAgLnN0eWxlKCdmb250LXNpemUnLCB0aGlzLnRpdGxlRm9udFNpemUpXG4gICAgICAgICAgICAgICAgLnN0eWxlKCdmb250LXdlaWdodCcsIHRoaXMudGl0bGVGb250V2VpZ2h0KVxuICAgICAgICAgICAgICAgIC50ZXh0KHRoaXMudGl0bGUpXG4gICAgICAgIH1cblxuICAgICAgICAvL3NoYXBlXG4gICAgICAgIGNvbnN0IHN2ZyA9IGRcbiAgICAgICAgICAgIC5hcHBlbmQoJ3N2ZycpXG4gICAgICAgICAgICAuYXR0cignd2lkdGgnLCBzaXplUGl4ICsgdGhpcy5zdHJva2VXaWR0aCArIDIpXG4gICAgICAgICAgICAuYXR0cignaGVpZ2h0Jywgc2l6ZVBpeCArIHRoaXMuc3Ryb2tlV2lkdGggKyAyKVxuICAgICAgICAgICAgLnN0eWxlKCcnLCAnaW5saW5lLWJsb2NrJylcblxuICAgICAgICBpZiAodGhpcy5zaGFwZSA9PT0gJ3NxdWFyZScpIHtcbiAgICAgICAgICAgIHN2Zy5hcHBlbmQoJ3JlY3QnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCd4JywgMClcbiAgICAgICAgICAgICAgICAuYXR0cigneScsIDApXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3dpZHRoJywgc2l6ZVBpeClcbiAgICAgICAgICAgICAgICAuYXR0cignaGVpZ2h0Jywgc2l6ZVBpeClcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ2ZpbGwnLCB0aGlzLmZpbGxDb2xvcilcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ3N0cm9rZScsIHRoaXMuc3Ryb2tlQ29sb3IpXG4gICAgICAgICAgICAgICAgLnN0eWxlKCdzdHJva2Utd2lkdGgnLCB0aGlzLnN0cm9rZVdpZHRoKVxuICAgICAgICAgICAgLy9UT0RPIHRlc3RcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnNoYXBlID09PSAnY2lyY2xlJykge1xuICAgICAgICAgICAgLy8gPGNpcmNsZSBjeD1cIjUwXCIgY3k9XCI1MFwiIHI9XCI0MFwiIHN0cm9rZT1cImJsYWNrXCIgc3Ryb2tlLXdpZHRoPVwiM1wiIGZpbGw9XCJyZWRcIiAvPlxuICAgICAgICAgICAgY29uc3QgciA9IChzaXplUGl4ICsgdGhpcy5zdHJva2VXaWR0aCkgKiAwLjVcbiAgICAgICAgICAgIHN2Zy5hcHBlbmQoJ2NpcmNsZScpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2N4JywgciArIDEpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2N5JywgciArIDEpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3InLCByKVxuICAgICAgICAgICAgICAgIC5zdHlsZSgnZmlsbCcsIHRoaXMuZmlsbENvbG9yKVxuICAgICAgICAgICAgICAgIC5zdHlsZSgnc3Ryb2tlJywgdGhpcy5zdHJva2VDb2xvcilcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ3N0cm9rZS13aWR0aCcsIHRoaXMuc3Ryb2tlV2lkdGgpXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5zaGFwZSA9PT0gJ2RvbnV0Jykge1xuICAgICAgICAgICAgLy9UT0RPXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5zaGFwZSA9PT0gJ2RpYW1vbmQnKSB7XG4gICAgICAgICAgICAvL1RPRE9cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVW5leHBlY3RlZCBzaGFwZTonICsgdGhpcy5zaGFwZSlcbiAgICAgICAgfVxuXG4gICAgICAgIC8vbGFiZWxcbiAgICAgICAgZC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAvL3Nob3cgb24gcmlnaHQgb2YgZ3JhcGhpY1xuICAgICAgICAgICAgLnN0eWxlKCdkaXNwbGF5JywgJ2lubGluZScpXG5cbiAgICAgICAgICAgIC8vY2VudGVyIHZlcnRpY2FsbHlcbiAgICAgICAgICAgIC8vLnN0eWxlKFwicG9zaXRpb25cIiwgXCJhYnNvbHV0ZVwiKS5zdHlsZShcInRvcFwiLCBcIjBcIikuc3R5bGUoXCJib3R0b21cIiwgXCIwXCIpXG5cbiAgICAgICAgICAgIC5zdHlsZSgncGFkZGluZy1sZWZ0JywgJzVweCcpXG4gICAgICAgICAgICAuc3R5bGUoJ2ZvbnQtc2l6ZScsIHRoaXMubGFiZWxGb250U2l6ZSlcbiAgICAgICAgICAgIC50ZXh0KGxhYmVsICsgKHRoaXMubGFiZWxVbml0VGV4dCA/ICcgJyA6ICcnKSArIHRoaXMubGFiZWxVbml0VGV4dClcbiAgICB9XG59XG5cblxuXG5cbi8qKlxuICogXG4gKiBAcGFyYW0ge0FycmF5LjxudW1iZXI+fSB2YWx1ZXMgXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBzaXplIFxuICogQHBhcmFtIHsqfSBvcHRzIFxuICogQHJldHVybnMgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzaXplTGVnZW5kKHZhbHVlcywgc2l6ZSwgb3B0cyA9IHt9KSB7XG4gICAgY29uc3QgbGVnZW5kcyA9IFtdXG4gICAgZm9yIChsZXQgdmFsdWUgb2YgdmFsdWVzKVxuICAgICAgICBsZWdlbmRzLnB1c2goXG4gICAgICAgICAgICBuZXcgU2l6ZUxlZ2VuZCh7XG4gICAgICAgICAgICAgICAgdGl0bGU6IHZhbHVlID09IHZhbHVlc1swXSA/IG9wdHMudGl0bGUgOiB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgc2l6ZVBpeDogKHZzLCB6KSA9PiBzaXplKHZhbHVlKSAvIHosXG4gICAgICAgICAgICAgICAgbGFiZWw6ICgpID0+IHZhbHVlLFxuICAgICAgICAgICAgICAgIGxhYmVsRm9ybWF0OiBvcHRzLmxhYmVsRm9ybWF0LFxuICAgICAgICAgICAgICAgIGZpbGxDb2xvcjogb3B0cy5maWxsQ29sb3IgfHwgXCJ3aGl0ZVwiXG4gICAgICAgICAgICB9KVxuICAgICAgICApXG4gICAgcmV0dXJuIGxlZ2VuZHNcbn1cblxuXG4vKipcbiAqIFxuICogQHBhcmFtIHtmdW5jdGlvbn0gdmFsdWUgXG4gKiBAcGFyYW0geyp9IG9wdHMgXG4gKiBAcmV0dXJucyBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNpemVMZWdlbmRWaWV3U2NhbGUodmFsdWUsIG9wdHMgPSB7fSkge1xuICAgIGNvbnN0IGsgPSBvcHRzLmsgfHwgWzAuOSwgMC41LCAwLjIsIDAuMDVdXG4gICAgY29uc3QgbGVnZW5kcyA9IFtdXG4gICAgZm9yIChsZXQga18gb2YgaylcbiAgICAgICAgbGVnZW5kcy5wdXNoKFxuICAgICAgICAgICAgbmV3IFNpemVMZWdlbmQoe1xuICAgICAgICAgICAgICAgIHRpdGxlOiBrXyA9PSBrWzBdID8gb3B0cy50aXRsZSA6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICBsYWJlbDogKHZpZXdTY2FsZSwgY2VsbHMpID0+IGdyaWR2aXoubmljZShrXyAqIGQzLm1heChjZWxscywgdmFsdWUpKSxcbiAgICAgICAgICAgICAgICBsYWJlbEZvcm1hdDogb3B0cy5sYWJlbEZvcm1hdCxcbiAgICAgICAgICAgICAgICBmaWxsQ29sb3I6IG9wdHMuZmlsbENvbG9yIHx8IFwid2hpdGVcIlxuICAgICAgICAgICAgfSlcbiAgICAgICAgKVxuICAgIHJldHVybiBsZWdlbmRzXG59XG5cblxuXG4vKipcbiAqIEEgZnVuY3Rpb24gd2hpY2ggcmV0dXJuIGEgc3RhY2sgb2Ygc2l6ZSBsZWdlbmRzIGZvciBhIGRpc2NyZXRlIGNsYXNzaWZpY2F0aW9uLlxuICogQHBhcmFtIHsqfSBicmVha3MgXG4gKiBAcGFyYW0geyp9IHNpemVzIFxuICogQHBhcmFtIHsqfSBvcHRzIFxuICogQHJldHVybnMgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzaXplRGlzY3JldGVMZWdlbmQoYnJlYWtzLCBzaXplcywgb3B0cyA9IHt9KSB7XG4gICAgY29uc3QgZiA9IG9wdHMubGFiZWxGb3JtYXQgfHwgKHggPT4geClcbiAgICBjb25zdCBsYWJlbFRleHQgPSBvcHRzLmxhYmVsVGV4dCB8fCBkZWZhdWx0TGFiZWxUZXh0KGYpXG4gICAgY29uc3QgbGVnZW5kcyA9IFtdXG4gICAgZm9yIChsZXQgaSA9IHNpemVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKVxuICAgICAgICBsZWdlbmRzLnB1c2goXG4gICAgICAgICAgICBuZXcgU2l6ZUxlZ2VuZCh7XG4gICAgICAgICAgICAgICAgdGl0bGU6IGkgPT0gc2l6ZXMubGVuZ3RoIC0gMSA/IG9wdHMudGl0bGUgOiB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgc2l6ZVBpeDogKHZzLCB6KSA9PiBzaXplc1tpXSAvIHosXG4gICAgICAgICAgICAgICAgbGFiZWw6ICgpID0+IGxhYmVsVGV4dChicmVha3NbaSAtIDFdLCBicmVha3NbaV0pLFxuICAgICAgICAgICAgICAgIGZpbGxDb2xvcjogb3B0cy5maWxsQ29sb3IgfHwgXCJ3aGl0ZVwiLFxuICAgICAgICAgICAgICAgIHNoYXBlOiBvcHRzLnNoYXBlXG4gICAgICAgICAgICB9KVxuICAgICAgICApXG4gICAgcmV0dXJuIGxlZ2VuZHNcbn1cblxuLyoqXG4gKiBBIGZ1bmN0aW9uIHdoaWNoIHJldHVybiBhIHN0YWNrIG9mIHNpemUgbGVnZW5kcyBmb3IgYSBkaXNjcmV0ZSBjbGFzc2lmaWNhdGlvbiB1c2luZyBhIHZpZXdzY2FsZS5cbiAqIEBwYXJhbSB7bnVtYmVyfSBjbGFzc051bWJlciBcbiAqIEBwYXJhbSB7Kn0gb3B0cyBcbiAqIEByZXR1cm5zIFxuICovXG5leHBvcnQgZnVuY3Rpb24gc2l6ZURpc2NyZXRlVmlld1NjYWxlTGVnZW5kKGNsYXNzTnVtYmVyLCBvcHRzID0ge30pIHtcbiAgICBjb25zdCBmID0gb3B0cy5sYWJlbEZvcm1hdCB8fCAoeCA9PiB4KVxuICAgIGNvbnN0IGxhYmVsVGV4dCA9IG9wdHMubGFiZWxUZXh0IHx8IGRlZmF1bHRMYWJlbFRleHQoZilcbiAgICBjb25zdCBsZWdlbmRzID0gW11cbiAgICBmb3IgKGxldCBpID0gY2xhc3NOdW1iZXIgLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICBsZWdlbmRzLnB1c2goXG4gICAgICAgICAgICBuZXcgU2l6ZUxlZ2VuZCh7XG4gICAgICAgICAgICAgICAgdGl0bGU6IGkgPT0gY2xhc3NOdW1iZXIgLSAxID8gb3B0cy50aXRsZSA6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICBzaXplUGl4OiAodmlld1NjYWxlLCB6KSA9PiB2aWV3U2NhbGUudmFsdWVzW2ldIC8geixcbiAgICAgICAgICAgICAgICBsYWJlbDogKHZpZXdTY2FsZSkgPT4gbGFiZWxUZXh0KHZpZXdTY2FsZS5icmVha3NbaSAtIDFdLCB2aWV3U2NhbGUuYnJlYWtzW2ldKSxcbiAgICAgICAgICAgICAgICBmaWxsQ29sb3I6IG9wdHMuZmlsbENvbG9yIHx8IFwid2hpdGVcIixcbiAgICAgICAgICAgICAgICBzaGFwZTogb3B0cy5zaGFwZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgKVxuICAgIH1cbiAgICByZXR1cm4gbGVnZW5kc1xufVxuXG5cbmZ1bmN0aW9uIGRlZmF1bHRMYWJlbFRleHQoZikge1xuICAgIHJldHVybiAodjAsIHYxKSA9PiB7XG4gICAgICAgIGlmICh2MCA9PSB1bmRlZmluZWQgJiYgdjEgPT0gdW5kZWZpbmVkKSByZXR1cm4gXCJcIlxuICAgICAgICBpZiAodjEgPT0gdW5kZWZpbmVkKSByZXR1cm4gXCI8IFwiICsgZih2MClcbiAgICAgICAgaWYgKHYwID09IHVuZGVmaW5lZCkgcmV0dXJuIFwiPiBcIiArIGYodjEpXG4gICAgICAgIHJldHVybiBmKHYwKSArIFwiIC0gXCIgKyBmKHYxKVxuICAgIH1cbn1cbiIsIi8vQHRzLWNoZWNrXG4ndXNlIHN0cmljdCdcblxuaW1wb3J0IHsgU3R5bGUgfSBmcm9tICcuLi9TdHlsZS5qcydcblxuLyoqIEB0eXBlZGVmIHtcImZsYWdcInxcInBpZWNoYXJ0XCJ8XCJyaW5nXCJ8XCJzZWdtZW50XCJ8XCJyYWRhclwifFwiYWdlcHlyYW1pZFwifFwiaGFsZnRvbmVcIn0gQ29tcG9zaXRpb25UeXBlICovXG5cbi8qKlxuICogQSBzdHlsZSBzaG93aW5nIHRoZSBjb21wb3NpdGlvbiBvZiBhIHRvdGFsIGluIGRpZmZlcmVudCBjYXRlZ29yaWVzLCB3aXRoIGRpZmZlcmVudCBjb2xvciBodWVzLlxuICogSXQgY29uc2lzdHMgb2YgYSBzeW1ib2wgd2l0aCBkaWZmZXJlbnQgcGFydHMsIHdob3NlIHNpemUgcmVmbGVjdCB0aGUgcHJvcG9ydGlvbiBvZiB0aGUgY29ycmVzcG9uZGluZyBjYXRlZ29yeS5cbiAqIEZvciBhIGxpc3Qgb2Ygc3VwcG9ydGVkIHN5bWJvbHMsIEBzZWUgQ29tcG9zaXRpb25UeXBlXG4gKiBUaGUgc3ltYm9sIGNhbiBiZSBzY2FsZWQgZGVwZW5kaW5nIG9uIHRoZSBjZWxsIGltcG9ydGFuY2UuXG4gKlxuICogQGF1dGhvciBKdWxpZW4gR2FmZnVyaVxuICovXG5leHBvcnQgY2xhc3MgQ29tcG9zaXRpb25TdHlsZSBleHRlbmRzIFN0eWxlIHtcbiAgICAvKiogQHBhcmFtIHtvYmplY3R9IG9wdHMgKi9cbiAgICBjb25zdHJ1Y3RvcihvcHRzKSB7XG4gICAgICAgIHN1cGVyKG9wdHMpXG4gICAgICAgIG9wdHMgPSBvcHRzIHx8IHt9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBkaWN0aW9uYXJ5IChzdHJpbmcgLT4gY29sb3IpIHdoaWNoIGdpdmUgdGhlIGNvbG9yIG9mIGVhY2ggY2F0ZWdvcnkuXG4gICAgICAgICAqIEB0eXBlIHtvYmplY3R9ICovXG4gICAgICAgIHRoaXMuY29sb3IgPSBvcHRzLmNvbG9yXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEEgZnVuY3Rpb24gcmV0dXJuaW5nIHRoZSB0eXBlIG9mIGRlY29tcG9zaXRpb24gc3ltYm9sIG9mIGEgY2VsbCwgQHNlZSBDb21wb3NpdGlvblR5cGVcbiAgICAgICAgICogQHR5cGUge2Z1bmN0aW9uKGltcG9ydChcIi4uL0RhdGFzZXQuanNcIikuQ2VsbCxudW1iZXIsIG51bWJlcixvYmplY3QpOkNvbXBvc2l0aW9uVHlwZX0gKi9cbiAgICAgICAgdGhpcy50eXBlID0gb3B0cy50eXBlIHx8ICgoKSA9PiBcImZsYWdcIikgLy8oYyxyLHosdnMpID0+IHt9XG5cbiAgICAgICAgLyoqIEEgZnVuY3Rpb24gcmV0dXJuaW5nIHRoZSBzaXplIG9mIGEgY2VsbCBpbiBnZW9ncmFwaGljYWwgdW5pdC5cbiAgICAgICAgICogQHR5cGUge2Z1bmN0aW9uKGltcG9ydCgnLi4vRGF0YXNldC5qcycpLkNlbGwsbnVtYmVyLCBudW1iZXIsb2JqZWN0KTpudW1iZXJ9ICovXG4gICAgICAgIHRoaXMuc2l6ZSA9IG9wdHMuc2l6ZSB8fCAoKGMsIHIpID0+IHIpIC8vKGMscix6LHZzKSA9PiB7fVxuXG4gICAgICAgIC8qKiBGb3Igc3R5bGUgdHlwZXMgd2l0aCBzdHJpcGVzIChmbGFnLCBzZWdtZW50KSwgdGhlIG9yaWVudGF0aW9uIG9mIHRoZSBzdHJpcGVzICgwIGZvciBob3Jpem9udGFsLCBvdGhlciBmb3IgdmVydGljYWwpLlxuICAgICAgICAgKiBAdHlwZSB7ZnVuY3Rpb24oaW1wb3J0KFwiLi4vRGF0YXNldC5qc1wiKS5DZWxsLG51bWJlcixudW1iZXIsb2JqZWN0KTpudW1iZXJ9ICovXG4gICAgICAgIHRoaXMuc3RyaXBlc09yaWVudGF0aW9uID0gb3B0cy5zdHJpcGVzT3JpZW50YXRpb24gfHwgKCgpID0+IDApIC8vKGMscix6LHZzKSA9PiAuLi5cblxuICAgICAgICAvKiogVGhlIGZ1bmN0aW9uIHNwZWNpZnlpbmcgYW4gb2Zmc2V0IGFuZ2xlIGZvciBhIHJhZGFyLCBoYWxmdG9uZSBvciBwaWUgY2hhcnQgc3R5bGUuXG4gICAgICAgICAqIFRoZSBhbmdsZSBpcyBzcGVjaWZpZWQgaW4gZGVncmVlLiBUaGUgcm90YXRpb24gaXMgYW50aS1jbG9ja3dpc2UuXG4gICAgICAgICAqIEB0eXBlIHtmdW5jdGlvbihpbXBvcnQoXCIuLi9EYXRhc2V0LmpzXCIpLkNlbGwsbnVtYmVyLG51bWJlcixvYmplY3QpOm51bWJlcn0gKi9cbiAgICAgICAgdGhpcy5vZmZzZXRBbmdsZSA9IG9wdHMub2Zmc2V0QW5nbGUgfHwgKCgpID0+IDApIC8vKGMscix6LHZzKSA9PiAuLi5cblxuICAgICAgICAvKiogVGhlIGZ1bmN0aW9uIHNwZWNpZnlpbmcgdGhlIGhlaWdodCBvZiB0aGUgYWdlIHB5cmFtaWQsIGluIGdlbyB1bml0LlxuICAgICAgICAgKiBAdHlwZSB7ZnVuY3Rpb24oaW1wb3J0KFwiLi4vRGF0YXNldC5qc1wiKS5DZWxsLG51bWJlcixudW1iZXIsb2JqZWN0KTpudW1iZXJ9ICovXG4gICAgICAgIHRoaXMuYWdlUHlyYW1pZEhlaWdodCA9IG9wdHMuYWdlUHlyYW1pZEhlaWdodCB8fCAoKGMsIHIpID0+IHIpIC8vKGMscix6LHZzKSA9PiAuLi5cblxuICAgICAgICAvKiogRm9yIHBpZSBjaGFydCwgdGhpcyBpcyBwYXJhbWV0ZXIgZm9yIGludGVybmFsIHJhZGl1cywgc28gdGhhdCB0aGUgcGllIGNoYXJ0IGxvb2tzIGxpa2UgYSBkb251dC5cbiAgICAgICAgICogMCBmb3Igbm9ybWFsIHBpZSBjaGFydHMsIDAuNSB0byBlbXB0eSBoYWxmIG9mIHRoZSByYWRpdXMuXG4gICAgICAgICAqIEB0eXBlIHtudW1iZXJ9ICovXG4gICAgICAgIHRoaXMucGllQ2hhcnRJbnRlcm5hbFJhZGl1c0ZhY3RvciA9IG9wdHMucGllQ2hhcnRJbnRlcm5hbFJhZGl1c0ZhY3RvciB8fCAwXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRHJhdyBjZWxscyBhcyBzcXVhcmVzIGRlcGVuZGluZyBvbiB0aGVpciB2YWx1ZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7QXJyYXkuPGltcG9ydChcIi4uL0RhdGFzZXQuanNcIikuQ2VsbD59IGNlbGxzXG4gICAgICogQHBhcmFtIHtpbXBvcnQoXCIuLi9HZW9DYW52YXMuanNcIikuR2VvQ2FudmFzfSBnZW9DYW52YXNcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gcmVzb2x1dGlvblxuICAgICAqL1xuICAgIGRyYXcoY2VsbHMsIGdlb0NhbnZhcywgcmVzb2x1dGlvbikge1xuICAgICAgICAvL2ZpbHRlclxuICAgICAgICBpZiAodGhpcy5maWx0ZXIpIGNlbGxzID0gY2VsbHMuZmlsdGVyKHRoaXMuZmlsdGVyKVxuXG4gICAgICAgIC8vXG4gICAgICAgIGNvbnN0IHogPSBnZW9DYW52YXMudmlldy56XG5cbiAgICAgICAgLy9nZXQgdmlldyBzY2FsZVxuICAgICAgICBjb25zdCB2aWV3U2NhbGUgPSB0aGlzLnZpZXdTY2FsZSA/IHRoaXMudmlld1NjYWxlKGNlbGxzLCByZXNvbHV0aW9uLCB6KSA6IHVuZGVmaW5lZFxuXG4gICAgICAgIC8vbmIgY2F0ZWdvcmllcyAtIHVzZWQgZm9yIHJhZGFyIGFuZCBhZ2VweXJhbWlkXG4gICAgICAgIGNvbnN0IG5iQ2F0ID0gT2JqZWN0LmVudHJpZXModGhpcy5jb2xvcikubGVuZ3RoXG5cbiAgICAgICAgLy9kcmF3IGNhbGxzXG4gICAgICAgIGZvciAobGV0IGNlbGwgb2YgY2VsbHMpIHtcblxuICAgICAgICAgICAgLy9zaXplXG4gICAgICAgICAgICBjb25zdCBzRyA9IHRoaXMuc2l6ZSA/IHRoaXMuc2l6ZShjZWxsLCByZXNvbHV0aW9uLCB6LCB2aWV3U2NhbGUpIDogcmVzb2x1dGlvblxuICAgICAgICAgICAgaWYgKCFzRykgY29udGludWVcblxuICAgICAgICAgICAgLy9nZXQgb2Zmc2V0XG4gICAgICAgICAgICBjb25zdCBvZmZzZXQgPSB0aGlzLm9mZnNldChjZWxsLCByZXNvbHV0aW9uLCB6KVxuXG4gICAgICAgICAgICAvL2dldCBzeW1ib2wgdHlwZVxuICAgICAgICAgICAgY29uc3QgdHlwZV8gPSB0aGlzLnR5cGUgPyB0aGlzLnR5cGUoY2VsbCwgcmVzb2x1dGlvbiwgeiwgdmlld1NjYWxlKSA6ICdmbGFnJ1xuXG4gICAgICAgICAgICAvL2NvbXB1dGUgY2VudGVyIHBvc2l0aW9uXG4gICAgICAgICAgICBjb25zdCB4YyA9IGNlbGwueCArIG9mZnNldC5keCArICh0eXBlXyA9PT0gJ2FnZXB5cmFtaWQnID8gMCA6IHJlc29sdXRpb24gKiAwLjUpXG4gICAgICAgICAgICBjb25zdCB5YyA9IGNlbGwueSArIG9mZnNldC5keSArICh0eXBlXyA9PT0gJ2FnZXB5cmFtaWQnID8gMCA6IHJlc29sdXRpb24gKiAwLjUpXG5cbiAgICAgICAgICAgIC8vY29tcHV0ZSBvZmZzZXQgYW5nbGUsIHdoZW4gcmVsZXZhbnRcbiAgICAgICAgICAgIGNvbnN0IG9mZkFuZyA9IHRoaXMub2Zmc2V0QW5nbGUgPyAodGhpcy5vZmZzZXRBbmdsZShjZWxsLCByZXNvbHV0aW9uLCB6LCB2aWV3U2NhbGUpICogTWF0aC5QSSkgLyAxODAgOiAwXG5cbiAgICAgICAgICAgIGlmICh0eXBlXyA9PT0gJ2FnZXB5cmFtaWQnIHx8IHR5cGVfID09PSAncmFkYXInIHx8IHR5cGVfID09PSAnaGFsZnRvbmUnKSB7XG4gICAgICAgICAgICAgICAgLy9nZXQgY2VsbCBjYXRlZ29yeSBtYXggdmFsdWVcbiAgICAgICAgICAgICAgICBsZXQgbWF4VmFsID0gLUluZmluaXR5XG4gICAgICAgICAgICAgICAgZm9yIChsZXQga2V5IG9mIE9iamVjdC5rZXlzKHRoaXMuY29sb3IpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHYgPSArY2VsbFtrZXldXG4gICAgICAgICAgICAgICAgICAgIGlmICh2ID4gbWF4VmFsKSBtYXhWYWwgPSB2XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy9jdW11bFxuICAgICAgICAgICAgICAgIGxldCBjdW11bCA9IDBcbiAgICAgICAgICAgICAgICBpZiAodHlwZV8gPT09ICdhZ2VweXJhbWlkJyAmJiB0aGlzLmFnZVB5cmFtaWRIZWlnaHQpXG4gICAgICAgICAgICAgICAgICAgIGN1bXVsID0gKHJlc29sdXRpb24gLSB0aGlzLmFnZVB5cmFtaWRIZWlnaHQoY2VsbCwgcmVzb2x1dGlvbiwgeiwgdmlld1NjYWxlKSkgLyAyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVfID09PSAncmFkYXInIHx8IHR5cGVfID09PSAnaGFsZnRvbmUnKSBjdW11bCA9IE1hdGguUEkgLyAyICsgb2ZmQW5nXG5cbiAgICAgICAgICAgICAgICAvL2NvbXB1dGUgdGhlIGluY3JlbWVudCwgd2hpY2ggaXMgdGhlIHZhbHVlIHRvIGluY3JlbWVudCB0aGUgY3VtdWwgZm9yIGVhY2ggY2F0ZWdvcnlcbiAgICAgICAgICAgICAgICBjb25zdCBpbmNyID1cbiAgICAgICAgICAgICAgICAgICAgdHlwZV8gPT09ICdhZ2VweXJhbWlkJ1xuICAgICAgICAgICAgICAgICAgICAgICAgPyAodGhpcy5hZ2VQeXJhbWlkSGVpZ2h0ID8gdGhpcy5hZ2VQeXJhbWlkSGVpZ2h0KGNlbGwsIHJlc29sdXRpb24sIHosIHZpZXdTY2FsZSkgOiByZXNvbHV0aW9uKSAvIG5iQ2F0XG4gICAgICAgICAgICAgICAgICAgICAgICA6IHR5cGVfID09PSAncmFkYXInIHx8IHR5cGVfID09PSAnaGFsZnRvbmUnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyAoMiAqIE1hdGguUEkpIC8gbmJDYXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IHVuZGVmaW5lZFxuICAgICAgICAgICAgICAgIGlmIChpbmNyID09PSB1bmRlZmluZWQpIHRocm93IG5ldyBFcnJvcignVW5leHBlY3RlZCBzeW1ib2wgdHlwZTonICsgdHlwZV8pXG5cbiAgICAgICAgICAgICAgICBmb3IgKGxldCBbY29sdW1uLCBjb2xvcl0gb2YgT2JqZWN0LmVudHJpZXModGhpcy5jb2xvcikpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVfID09PSAnYWdlcHlyYW1pZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vc2V0IGNhdGVnb3J5IGNvbG9yXG4gICAgICAgICAgICAgICAgICAgICAgICBnZW9DYW52YXMuY3R4LmZpbGxTdHlsZSA9IGNvbG9yXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vZ2V0IGNhdGVnb3J5IHZhbHVlXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB2YWwgPSBjZWxsW2NvbHVtbl1cblxuICAgICAgICAgICAgICAgICAgICAgICAgLy9jb21wdXRlIGNhdGVnb3J5IGxlbmd0aCAtIGluIGdlb1xuICAgICAgICAgICAgICAgICAgICAgICAgLyoqIEB0eXBlIHtudW1iZXJ9ICovXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB3RyA9IChzRyAqIHZhbCkgLyBtYXhWYWxcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy9kcmF3IGJhclxuICAgICAgICAgICAgICAgICAgICAgICAgZ2VvQ2FudmFzLmN0eC5maWxsUmVjdCh4YyArIChyZXNvbHV0aW9uIC0gd0cpIC8gMiwgeWMgKyBjdW11bCwgd0csIGluY3IpXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vbmV4dCBoZWlnaHRcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1bXVsICs9IGluY3JcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlXyA9PT0gJ3JhZGFyJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9zZXQgY2F0ZWdvcnkgY29sb3JcbiAgICAgICAgICAgICAgICAgICAgICAgIGdlb0NhbnZhcy5jdHguZmlsbFN0eWxlID0gY29sb3JcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy9nZXQgY2F0ZWdyb3kgdmFsdWVcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHZhbCA9IGNlbGxbY29sdW1uXVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2NvbXB1dGUgY2F0ZWdvcnkgcmFkaXVzIC0gaW4gZ2VvXG4gICAgICAgICAgICAgICAgICAgICAgICAvKiogQHR5cGUge251bWJlcn0gKi9cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vY29uc3QgckcgPSB0aGlzLnJhZGl1cyh2YWwsIHIsIHN0YXQsIGNlbGxTdGF0LCB6KVxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgckcgPSAoc0cgLyAyKSAqIE1hdGguc3FydCh2YWwgLyBtYXhWYWwpXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vZHJhdyBhbmd1bGFyIHNlY3RvclxuICAgICAgICAgICAgICAgICAgICAgICAgZ2VvQ2FudmFzLmN0eC5iZWdpblBhdGgoKVxuICAgICAgICAgICAgICAgICAgICAgICAgZ2VvQ2FudmFzLmN0eC5tb3ZlVG8oeGMsIHljKVxuICAgICAgICAgICAgICAgICAgICAgICAgZ2VvQ2FudmFzLmN0eC5hcmMoeGMsIHljLCByRywgY3VtdWwgLSBpbmNyLCBjdW11bClcbiAgICAgICAgICAgICAgICAgICAgICAgIGdlb0NhbnZhcy5jdHgubGluZVRvKHhjLCB5YylcbiAgICAgICAgICAgICAgICAgICAgICAgIGdlb0NhbnZhcy5jdHguZmlsbCgpXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vbmV4dCBhbmd1bGFyIHNlY3RvclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VtdWwgKz0gaW5jclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVfID09PSAnaGFsZnRvbmUnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL3NldCBjYXRlZ29yeSBjb2xvclxuICAgICAgICAgICAgICAgICAgICAgICAgZ2VvQ2FudmFzLmN0eC5maWxsU3R5bGUgPSBjb2xvclxuXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2dldCBjYXRlZ3JveSB2YWx1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdmFsID0gY2VsbFtjb2x1bW5dXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vY29tcHV0ZSBjYXRlZ29yeSByYWRpdXMgLSBpbiBnZW9cbiAgICAgICAgICAgICAgICAgICAgICAgIC8qKiBAdHlwZSB7bnVtYmVyfSAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgckcgPSBzRyAqIDAuMzMzICogTWF0aC5zcXJ0KHZhbCAvIG1heFZhbClcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy9kcmF3IGNpcmNsZVxuICAgICAgICAgICAgICAgICAgICAgICAgZ2VvQ2FudmFzLmN0eC5iZWdpblBhdGgoKVxuICAgICAgICAgICAgICAgICAgICAgICAgZ2VvQ2FudmFzLmN0eC5hcmMoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeGMgKyByZXNvbHV0aW9uICogMC4yNSAqIE1hdGguY29zKGN1bXVsKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB5YyArIHJlc29sdXRpb24gKiAwLjI1ICogTWF0aC5zaW4oY3VtdWwpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJHLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgMiAqIE1hdGguUElcbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgIGdlb0NhbnZhcy5jdHguZmlsbCgpXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vbmV4dCBhbmd1bGFyIHNlY3RvclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VtdWwgKz0gaW5jclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmV4cGVjdGVkIHN5bWJvbCB0eXBlOicgKyB0eXBlXylcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy9jb21wdXRlIHRvdGFsXG4gICAgICAgICAgICAgICAgbGV0IHRvdGFsID0gMFxuICAgICAgICAgICAgICAgIGZvciAobGV0IGNvbHVtbiBvZiBPYmplY3Qua2V5cyh0aGlzLmNvbG9yKSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB2ID0gK2NlbGxbY29sdW1uXVxuICAgICAgICAgICAgICAgICAgICBpZiAoIXYpIGNvbnRpbnVlXG4gICAgICAgICAgICAgICAgICAgIHRvdGFsICs9IHZcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCF0b3RhbCB8fCBpc05hTih0b3RhbCkpIGNvbnRpbnVlXG5cbiAgICAgICAgICAgICAgICAvL2RyYXcgZGVjb21wb3NpdGlvbiBzeW1ib2xcbiAgICAgICAgICAgICAgICBsZXQgY3VtdWwgPSAwXG4gICAgICAgICAgICAgICAgY29uc3QgZCA9IHJlc29sdXRpb24gKiAoMSAtIHNHIC8gcmVzb2x1dGlvbikgKiAwLjVcbiAgICAgICAgICAgICAgICBjb25zdCBvcmkgPSB0aGlzLnN0cmlwZXNPcmllbnRhdGlvbihjZWxsLCByZXNvbHV0aW9uLCB6LCB2aWV3U2NhbGUpXG5cbiAgICAgICAgICAgICAgICBmb3IgKGxldCBbY29sdW1uLCBjb2xvcl0gb2YgT2JqZWN0LmVudHJpZXModGhpcy5jb2xvcikpIHtcbiAgICAgICAgICAgICAgICAgICAgLy9nZXQgc2hhcmVcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2hhcmUgPSBjZWxsW2NvbHVtbl0gLyB0b3RhbFxuICAgICAgICAgICAgICAgICAgICBpZiAoIXNoYXJlIHx8IGlzTmFOKHNoYXJlKSkgY29udGludWVcblxuICAgICAgICAgICAgICAgICAgICAvL3NldCBjb2xvclxuICAgICAgICAgICAgICAgICAgICBnZW9DYW52YXMuY3R4LmZpbGxTdHlsZSA9IGNvbG9yXG5cbiAgICAgICAgICAgICAgICAgICAgLy9kcmF3IHN5bWJvbCBwYXJ0XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlXyA9PT0gJ2ZsYWcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL2RyYXcgZmxhZyBzdHJpcGVcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcmkgPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vaG9yaXpvbnRhbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdlb0NhbnZhcy5jdHguZmlsbFJlY3QoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNlbGwueCArIGQgKyBvZmZzZXQuZHgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNlbGwueSArIGQgKyBjdW11bCAqIHNHICsgb2Zmc2V0LmR5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzRyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hhcmUgKiBzR1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy92ZXJ0aWNhbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdlb0NhbnZhcy5jdHguZmlsbFJlY3QoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNlbGwueCArIGQgKyBjdW11bCAqIHNHICsgb2Zmc2V0LmR4LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjZWxsLnkgKyBkICsgb2Zmc2V0LmR5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaGFyZSAqIHNHLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzR1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlXyA9PT0gJ3BpZWNoYXJ0Jykge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9kcmF3IHBpZSBjaGFydCBhbmd1bGFyIHNlY3RvclxuXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2NvbXB1dGUgYW5nbGVzXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBhMSA9IGN1bXVsICogMiAqIE1hdGguUElcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGEyID0gKGN1bXVsICsgc2hhcmUpICogMiAqIE1hdGguUElcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy9kcmF3XG4gICAgICAgICAgICAgICAgICAgICAgICBnZW9DYW52YXMuY3R4LmJlZ2luUGF0aCgpXG4gICAgICAgICAgICAgICAgICAgICAgICBnZW9DYW52YXMuY3R4Lm1vdmVUbyh4YywgeWMpXG4gICAgICAgICAgICAgICAgICAgICAgICBnZW9DYW52YXMuY3R4LmFyYyh4YywgeWMsIHNHICogMC41LCBhMSArIG9mZkFuZywgYTIgKyBvZmZBbmcpXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5waWVDaGFydEludGVybmFsUmFkaXVzRmFjdG9yKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdlb0NhbnZhcy5jdHguYXJjKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB4YyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeWMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNHICogMC41ICogdGhpcy5waWVDaGFydEludGVybmFsUmFkaXVzRmFjdG9yLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhMSArIG9mZkFuZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYTIgKyBvZmZBbmcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRydWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICBnZW9DYW52YXMuY3R4LmNsb3NlUGF0aCgpXG4gICAgICAgICAgICAgICAgICAgICAgICBnZW9DYW52YXMuY3R4LmZpbGwoKVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVfID09PSAncmluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vZHJhdyByaW5nXG4gICAgICAgICAgICAgICAgICAgICAgICBnZW9DYW52YXMuY3R4LmJlZ2luUGF0aCgpXG4gICAgICAgICAgICAgICAgICAgICAgICBnZW9DYW52YXMuY3R4LmFyYyh4YywgeWMsIE1hdGguc3FydCgxIC0gY3VtdWwpICogc0cgKiAwLjUsIDAsIDIgKiBNYXRoLlBJKVxuICAgICAgICAgICAgICAgICAgICAgICAgZ2VvQ2FudmFzLmN0eC5maWxsKClcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlXyA9PT0gJ3NlZ21lbnQnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL2RyYXcgc2VnbWVudCBzZWN0aW9uc1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgd0cgPSAoc0cgKiBzRykgLyByZXNvbHV0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob3JpID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2hvcml6b250YWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZW9DYW52YXMuY3R4LmZpbGxSZWN0KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjZWxsLnggKyBvZmZzZXQuZHgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNlbGwueSArIChyZXNvbHV0aW9uIC0gd0cpIC8gMiArIGN1bXVsICogd0cgKyBvZmZzZXQuZHksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdXRpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNoYXJlICogd0dcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdmVydGljYWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZW9DYW52YXMuY3R4LmZpbGxSZWN0KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjZWxsLnggKyBjdW11bCAqIHJlc29sdXRpb24gKyBvZmZzZXQuZHgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNlbGwueSArIChyZXNvbHV0aW9uIC0gd0cpIC8gMiArIG9mZnNldC5keSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hhcmUgKiByZXNvbHV0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3R1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVW5leHBlY3RlZCBzeW1ib2wgdHlwZTonICsgdHlwZV8pXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBjdW11bCArPSBzaGFyZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vdXBkYXRlIGxlZ2VuZHNcbiAgICAgICAgdGhpcy51cGRhdGVMZWdlbmRzKHsgc3R5bGU6IHRoaXMsIHI6IHJlc29sdXRpb24sIHo6IHosIHZpZXdTY2FsZTogdmlld1NjYWxlIH0pXG4gICAgfVxufVxuIiwiLy9AdHMtY2hlY2tcbid1c2Ugc3RyaWN0J1xuXG5pbXBvcnQgeyBTaWRlU3R5bGUgfSBmcm9tICcuL1NpZGVTdHlsZS5qcydcblxuLyoqIEB0eXBlZGVmIHt7eDpudW1iZXIseTpudW1iZXIsb3I6XCJ2XCJ8XCJoXCIsdmFsdWU6bnVtYmVyfX0gU2lkZSAqL1xuXG4vKipcbiAqXG4gKiBAYXV0aG9yIEp1bGllbiBHYWZmdXJpXG4gKi9cbmV4cG9ydCBjbGFzcyBDb250b3VyU3R5bGUgZXh0ZW5kcyBTaWRlU3R5bGUge1xuICAgIC8qKiBAcGFyYW0ge29iamVjdH0gb3B0cyAqL1xuICAgIGNvbnN0cnVjdG9yKG9wdHMpIHtcbiAgICAgICAgc3VwZXIob3B0cylcbiAgICAgICAgb3B0cyA9IG9wdHMgfHwge31cblxuICAgICAgICAvKiogQHR5cGUge251bWJlcn0gKi9cbiAgICAgICAgLy9vcHRzLmludGVydmFsID0gb3B0cy5pbnRlcnZhbCB8fCAxMDBcblxuICAgICAgICAvKiogQHR5cGUge0FycmF5LjxudW1iZXI+fSAqL1xuICAgICAgICBvcHRzLmJyZWFrcyA9IG9wdHMuYnJlYWtzIHx8IFsxMDAsIDEwMDAsIDEwMDAwLCAxMDAwMDAsIDEwMDAwMDBdXG5cbiAgICAgICAgLyoqIEB0eXBlIHtmdW5jdGlvbihTaWRlLG51bWJlcixudW1iZXIpOnN0cmluZ30gKi9cbiAgICAgICAgb3B0cy53aWR0aCA9IG9wdHMud2lkdGggfHwgKCgpID0+IDEpIC8vKHMsIHIsIHopID0+IC4uLlxuXG4gICAgICAgIC8qKiBAdHlwZSB7ZnVuY3Rpb24oU2lkZSxudW1iZXIsbnVtYmVyKTpzdHJpbmd9ICovXG4gICAgICAgIG9wdHMuY29sb3IgPSBvcHRzLmNvbG9yIHx8ICgoKSA9PiAnI0U3QTkzNScpIC8vKHMsIHIsIHopID0+IC4uLlxuXG4gICAgICAgIC8vb3ZlcnJpZGUgbWV0aG9kIGZvciBjb250b3VyIGRyYXdpbmdcblxuICAgICAgICBjb25zdCBnZXRDbGFzcyA9IGZ1bmN0aW9uICh2KSB7XG4gICAgICAgICAgICBpZiAodiA9PSB1bmRlZmluZWQpIHJldHVybiAwXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9wdHMuYnJlYWtzLmxlbmd0aDsgaSsrKSBpZiAodiA8IG9wdHMuYnJlYWtzW2ldKSByZXR1cm4gaVxuICAgICAgICAgICAgcmV0dXJuIG9wdHMuYnJlYWtzLmxlbmd0aFxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy52YWx1ZSA9ICh2MSwgdjIsIHIsIHMsIHopID0+IHtcbiAgICAgICAgICAgIC8vaWYgKCF2MSB8fCAhdjIpIHJldHVybiAwXG4gICAgICAgICAgICByZXR1cm4gTWF0aC5hYnMoZ2V0Q2xhc3ModjIpIC0gZ2V0Q2xhc3ModjEpKVxuXG4gICAgICAgICAgICAvL2NoZWNrIGlmIHYxIC0gdjIgY3Jvc3MgYSBjb250b3VyIGxpbmVcbiAgICAgICAgICAgIC8vY29uc3QgcjEgPSBNYXRoLmZsb29yKHYxIC8gb3B0cy5pbnRlcnZhbCk7XG4gICAgICAgICAgICAvL2NvbnN0IHIyID0gTWF0aC5mbG9vcih2MiAvIG9wdHMuaW50ZXJ2YWwpO1xuICAgICAgICAgICAgLy9yZXR1cm4gTWF0aC5hYnMocjIgLSByMSk7XG4gICAgICAgIH1cblxuICAgICAgICAvL3NhbWUgY29sb3IgZm9yIGFsbFxuICAgICAgICB0aGlzLmNvbG9yID0gKHNpZGUsIHIsIHMsIHopID0+IChzaWRlLnZhbHVlID8gb3B0cy5jb2xvcihzaWRlLCByLCB6KSA6IHVuZGVmaW5lZClcblxuICAgICAgICAvL3dpZHRoOiBtdWx0aXBsZSBvZlxuICAgICAgICB0aGlzLndpZHRoID0gKHNpZGUsIHIsIHMsIHopID0+IHNpZGUudmFsdWUgKiB6ICogb3B0cy53aWR0aChzaWRlLCByLCB6KVxuICAgIH1cbn1cbiIsIi8vQHRzLWNoZWNrXG4ndXNlIHN0cmljdCdcblxuaW1wb3J0IHsgU3R5bGUgfSBmcm9tICcuLi9TdHlsZS5qcydcbmltcG9ydCB7IHJhbmRvbU5vcm1hbCB9IGZyb20gJ2QzLXJhbmRvbSdcbmltcG9ydCB7IGNoZWNrV2ViR0xTdXBwb3J0LCBtYWtlV2ViR0xDYW52YXMgfSBmcm9tICcuLi91dGlscy93ZWJHTFV0aWxzLmpzJ1xuaW1wb3J0IHsgV2ViR0xTcXVhcmVDb2xvcmluZyB9IGZyb20gJy4uL3V0aWxzL1dlYkdMU3F1YXJlQ29sb3JpbmcuanMnXG5pbXBvcnQgeyBjb2xvciB9IGZyb20gJ2QzLWNvbG9yJ1xuaW1wb3J0IHsgbW9uaXRvciwgbW9uaXRvckR1cmF0aW9uIH0gZnJvbSAnLi4vdXRpbHMvdXRpbHMuanMnXG5cbi8qKlxuICpcbiAqIEBhdXRob3IgSnVsaWVuIEdhZmZ1cmlcbiAqL1xuZXhwb3J0IGNsYXNzIERvdERlbnNpdHlTdHlsZSBleHRlbmRzIFN0eWxlIHtcbiAgICAvKiogQHBhcmFtIHtvYmplY3R9IG9wdHMgKi9cbiAgICBjb25zdHJ1Y3RvcihvcHRzKSB7XG4gICAgICAgIHN1cGVyKG9wdHMpXG4gICAgICAgIG9wdHMgPSBvcHRzIHx8IHt9XG5cbiAgICAgICAgLyoqIFRoZSBuYW1lIG9mIHRoZSBjb2x1bW4vYXR0cmlidXRlIG9mIHRoZSB0YWJ1bGFyIGRhdGEgd2hlcmUgdG8gcmV0cmlldmUgdGhlIHZhcmlhYmxlIGZvciBkb3QgbnVtYmVyLlxuICAgICAgICAgKiBAdHlwZSB7c3RyaW5nfSAqL1xuICAgICAgICB0aGlzLm5iQ29sID0gb3B0cy5uYkNvbFxuXG4gICAgICAgIC8qKiBBIGZ1bmN0aW9uIHJldHVybmluZyB0aGUgbnVtYmVyIG9mIGRvdHMgZm9yIGEgY2VsbCB2YWx1ZS5cbiAgICAgICAgICogQHR5cGUge2Z1bmN0aW9uKG51bWJlcixudW1iZXIsaW1wb3J0KFwiLi4vU3R5bGVcIikuU3RhdCxudW1iZXIpOm51bWJlcn0gKi9cbiAgICAgICAgdGhpcy5uYiA9IG9wdHMubmIgfHwgKCh2LCByLCBzLCB6KSA9PiAoKCgwLjMgKiByICogcikgLyAoeiAqIHopKSAqIHYpIC8gcy5tYXgpXG5cbiAgICAgICAgLyoqIFRoZSBjb2xvciBvZiB0aGUgZG90cy4gU2FtZSBjb2xvciBmb3IgYWxsIGRvdHMgd2l0aGluIGEgY2VsbC5cbiAgICAgICAgICogQHR5cGUge2Z1bmN0aW9uKGltcG9ydChcIi4uL0RhdGFzZXRcIikuQ2VsbCk6c3RyaW5nfSAqL1xuICAgICAgICB0aGlzLmNvbG9yID0gb3B0cy5jb2xvciB8fCAoKCkgPT4gJyNGRjU3MzMnKVxuXG4gICAgICAgIC8qKiBBIGZ1bmN0aW9uIHJldHVybmluZyB0aGUgc2l6ZSBvZiB0aGUgZG90cywgaW4gZ2VvIHVuaXQuXG4gICAgICAgICAqIEB0eXBlIHtmdW5jdGlvbihudW1iZXIsbnVtYmVyKTpudW1iZXJ9ICovXG4gICAgICAgIHRoaXMuZG90U2l6ZSA9IG9wdHMuZG90U2l6ZSAvL3x8ICgociwgeikgPT4gLi4uXG5cbiAgICAgICAgLyoqIEEgZnVuY3Rpb24gcmV0dXJuaW5nIHRoZSBzaWdtYSBvZiB0aGUgZGlzdHJpYnV0aW9uIGZyb20gdGhlIHJlc29sdXRpb24sIGluIGdlbyB1bml0LlxuICAgICAgICAgKiBAdHlwZSB7ZnVuY3Rpb24obnVtYmVyLG51bWJlcik6bnVtYmVyfSAqL1xuICAgICAgICB0aGlzLnNpZ21hID0gb3B0cy5zaWdtYSAvL3x8ICgocix6KSA9PiAuLi5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEcmF3IGNlbGxzIGFzIHRleHQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0FycmF5LjxpbXBvcnQoXCIuLi9EYXRhc2V0XCIpLkNlbGw+fSBjZWxsc1xuICAgICAqIEBwYXJhbSB7bnVtYmVyfSByZXNvbHV0aW9uXG4gICAgICogQHBhcmFtIHtpbXBvcnQoXCIuLi9HZW9DYW52YXNcIikuR2VvQ2FudmFzfSBnZW9DYW52YXNcbiAgICAgKi9cbiAgICBkcmF3KGNlbGxzLCBnZW9DYW52YXMsIHJlc29sdXRpb24pIHtcbiAgICAgICAgaWYgKG1vbml0b3IpIG1vbml0b3JEdXJhdGlvbignKioqIERvdERlbnNpdHlTdHlsZSBkcmF3JylcblxuICAgICAgICAvL2ZpbHRlclxuICAgICAgICBpZiAodGhpcy5maWx0ZXIpIGNlbGxzID0gY2VsbHMuZmlsdGVyKHRoaXMuZmlsdGVyKVxuXG4gICAgICAgIC8vXG4gICAgICAgIGNvbnN0IHogPSBnZW9DYW52YXMudmlldy56XG5cbiAgICAgICAgbGV0IHN0YXRcbiAgICAgICAgaWYgKHRoaXMubmJDb2wpIHN0YXQgPSBTdHlsZS5nZXRTdGF0aXN0aWNzKGNlbGxzLCAoYykgPT4gY1t0aGlzLm5iQ29sXSwgdHJ1ZSlcbiAgICAgICAgaWYgKCFzdGF0KSByZXR1cm5cblxuICAgICAgICAvL3NpemUgb2YgdGhlIGRvdHNcbiAgICAgICAgY29uc3Qgc0dlbyA9IHRoaXMuZG90U2l6ZSA/IHRoaXMuZG90U2l6ZShyZXNvbHV0aW9uLCB6KSA6IDIgKiB6XG5cbiAgICAgICAgLy9tYWtlIHJhbmRvbSBmdW5jdGlvblxuICAgICAgICBjb25zdCBzaWcgPSB0aGlzLnNpZ21hID8gdGhpcy5zaWdtYShyZXNvbHV0aW9uLCB6KSA6IHJlc29sdXRpb24gKiAwLjRcbiAgICAgICAgY29uc3QgcmFuZCA9IHJhbmRvbU5vcm1hbCgwLCBzaWcpXG5cbiAgICAgICAgaWYgKG1vbml0b3IpIG1vbml0b3JEdXJhdGlvbignIHByZXBhcmF0aW9uJylcblxuICAgICAgICBpZiAoY2hlY2tXZWJHTFN1cHBvcnQoKSkge1xuICAgICAgICAgICAgLy9jcmVhdGUgY2FudmFzIGFuZCB3ZWJnbCByZW5kZXJlclxuICAgICAgICAgICAgY29uc3QgY3ZXR0wgPSBtYWtlV2ViR0xDYW52YXMoZ2VvQ2FudmFzLncgKyAnJywgZ2VvQ2FudmFzLmggKyAnJylcbiAgICAgICAgICAgIGlmICghY3ZXR0wpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdObyB3ZWJHTCcpXG4gICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vY3JlYXRlIHdlYkdMIHByb2dyYW1cbiAgICAgICAgICAgIGNvbnN0IHByb2cgPSBuZXcgV2ViR0xTcXVhcmVDb2xvcmluZyhjdldHTC5nbCwgc0dlbyAvIHopXG5cbiAgICAgICAgICAgIGlmIChtb25pdG9yKSBtb25pdG9yRHVyYXRpb24oJyB3ZWJnbCBjcmVhdGlvbicpXG5cbiAgICAgICAgICAgIGNvbnN0IHIyID0gcmVzb2x1dGlvbiAvIDJcblxuICAgICAgICAgICAgbGV0IGNvbCwgb2Zmc2V0LCBuYiwgY3gsIGN5LCBjY1xuICAgICAgICAgICAgZm9yIChsZXQgYyBvZiBjZWxscykge1xuICAgICAgICAgICAgICAgIC8vZ2V0IGNvbG9yXG4gICAgICAgICAgICAgICAgY29sID0gdGhpcy5jb2xvcihjKVxuICAgICAgICAgICAgICAgIGlmICghY29sIHx8IGNvbCA9PT0gJ25vbmUnKSBjb250aW51ZVxuXG4gICAgICAgICAgICAgICAgLy9nZXQgb2Zmc2V0XG4gICAgICAgICAgICAgICAgb2Zmc2V0ID0gdGhpcy5vZmZzZXQoYywgcmVzb2x1dGlvbiwgeilcblxuICAgICAgICAgICAgICAgIC8vbnVtYmVyIG9mIGRvdHNcbiAgICAgICAgICAgICAgICBuYiA9IHRoaXMubmIoY1t0aGlzLm5iQ29sXSwgcmVzb2x1dGlvbiwgc3RhdCwgeilcblxuICAgICAgICAgICAgICAgIC8vY2VsbCBjZW50ZXJcbiAgICAgICAgICAgICAgICBjeCA9IGMueCArIG9mZnNldC5keCArIHIyXG4gICAgICAgICAgICAgICAgY3kgPSBjLnkgKyBvZmZzZXQuZHkgKyByMlxuXG4gICAgICAgICAgICAgICAgLy9jb252ZXJ0IGNvbG9yXG4gICAgICAgICAgICAgICAgY2MgPSBjb2xvcihjb2wpXG4gICAgICAgICAgICAgICAgaWYgKCFjYykgcmV0dXJuXG5cbiAgICAgICAgICAgICAgICAvL3JhbmRvbSBwb2ludHNcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8PSBuYjsgaSsrKVxuICAgICAgICAgICAgICAgICAgICBwcm9nLmFkZFBvaW50RGF0YTIoY3ggKyByYW5kKCksIGN5ICsgcmFuZCgpLCBjYy5yLCBjYy5nLCBjYy5iLCBjYy5vcGFjaXR5KVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAobW9uaXRvcikgbW9uaXRvckR1cmF0aW9uKCcgZGF0YSBwcmVwYXJhdGlvbicpXG5cbiAgICAgICAgICAgIC8vZHJhd1xuICAgICAgICAgICAgcHJvZy5kcmF3KGdlb0NhbnZhcy5nZXRXZWJHTFRyYW5zZm9ybSgpKVxuXG4gICAgICAgICAgICBpZiAobW9uaXRvcikgbW9uaXRvckR1cmF0aW9uKCcgd2ViZ2wgZHJhd2luZycpXG5cbiAgICAgICAgICAgIC8vZHJhdyBpbiBjYW52YXMgZ2VvXG4gICAgICAgICAgICBnZW9DYW52YXMuaW5pdENhbnZhc1RyYW5zZm9ybSgpXG4gICAgICAgICAgICBnZW9DYW52YXMuY3R4LmRyYXdJbWFnZShjdldHTC5jYW52YXMsIDAsIDApXG5cbiAgICAgICAgICAgIGlmIChtb25pdG9yKSBtb25pdG9yRHVyYXRpb24oJyBjYW52YXMgZHJhd2luZycpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmb3IgKGxldCBjIG9mIGNlbGxzKSB7XG4gICAgICAgICAgICAgICAgLy9nZXQgY29sb3JcbiAgICAgICAgICAgICAgICBjb25zdCBjb2wgPSB0aGlzLmNvbG9yKGMpXG4gICAgICAgICAgICAgICAgaWYgKCFjb2wgfHwgY29sID09PSAnbm9uZScpIGNvbnRpbnVlXG4gICAgICAgICAgICAgICAgLy9zZXQgY29sb3JcbiAgICAgICAgICAgICAgICBnZW9DYW52YXMuY3R4LmZpbGxTdHlsZSA9IGNvbFxuXG4gICAgICAgICAgICAgICAgLy9nZXQgb2Zmc2V0XG4gICAgICAgICAgICAgICAgY29uc3Qgb2Zmc2V0ID0gdGhpcy5vZmZzZXQoYywgcmVzb2x1dGlvbiwgeilcblxuICAgICAgICAgICAgICAgIC8vbnVtYmVyIG9mIGRvdHNcbiAgICAgICAgICAgICAgICBjb25zdCBuYiA9IHRoaXMubmIoY1t0aGlzLm5iQ29sXSwgcmVzb2x1dGlvbiwgc3RhdCwgeilcblxuICAgICAgICAgICAgICAgIC8vZHJhdyByYW5kb20gZG90c1xuICAgICAgICAgICAgICAgIGNvbnN0IGN4ID0gYy54ICsgb2Zmc2V0LmR4ICsgcmVzb2x1dGlvbiAvIDIsXG4gICAgICAgICAgICAgICAgICAgIGN5ID0gYy55ICsgb2Zmc2V0LmR5ICsgcmVzb2x1dGlvbiAvIDJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8PSBuYjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGdlb0NhbnZhcy5jdHguZmlsbFJlY3QoY3ggKyByYW5kKCksIGN5ICsgcmFuZCgpLCBzR2VvLCBzR2VvKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vdXBkYXRlIGxlZ2VuZHNcbiAgICAgICAgdGhpcy51cGRhdGVMZWdlbmRzKHsgc3R5bGU6IHRoaXMsIHI6IHJlc29sdXRpb24sIHo6IHogfSlcblxuICAgICAgICBpZiAobW9uaXRvcikgbW9uaXRvckR1cmF0aW9uKCcqKiogRG90RGVuc2l0eVN0eWxlIGVuZCBkcmF3JylcbiAgICB9XG59XG4iLCIvL0B0cy1jaGVja1xuJ3VzZSBzdHJpY3QnXG5cbmltcG9ydCB7IFN0eWxlIH0gZnJvbSAnLi4vU3R5bGUuanMnXG5cbi8qKiBAdHlwZWRlZiB7e3g6bnVtYmVyLHk6bnVtYmVyLG9yOlwidlwifFwiaFwiLGMxOmltcG9ydCgnLi4vRGF0YXNldC5qcycpLkNlbGx8dW5kZWZpbmVkLGMyOmltcG9ydCgnLi4vRGF0YXNldC5qcycpLkNlbGx8dW5kZWZpbmVkfX0gU2lkZSAqL1xuXG4vKipcbiAqIEBhdXRob3IgSnVsaWVuIEdhZmZ1cmlcbiAqL1xuZXhwb3J0IGNsYXNzIElzb0ZlbmNlU3R5bGUgZXh0ZW5kcyBTdHlsZSB7XG5cbiAgICAvKiogQHBhcmFtIHtvYmplY3R9IG9wdHMgKi9cbiAgICBjb25zdHJ1Y3RvcihvcHRzKSB7XG4gICAgICAgIHN1cGVyKG9wdHMpXG4gICAgICAgIG9wdHMgPSBvcHRzIHx8IHt9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBkaWN0aW9uYXJ5IChzdHJpbmcgLT4gY29sb3IpIHdoaWNoIGdpdmUgdGhlIGNvbG9yIG9mIGVhY2ggY2F0ZWdvcnkuXG4gICAgICAgICAqIEB0eXBlIHtvYmplY3R9ICovXG4gICAgICAgIHRoaXMuY29sb3IgPSBvcHRzLmNvbG9yXG5cbiAgICAgICAgLyoqIEEgZnVuY3Rpb24gcmV0dXJuaW5nIHRoZSBoZWlnaHQgb2YgYSBjZWxsIGluIGdlb2dyYXBoaWNhbCB1bml0LlxuICAgICAgICAgKiBAdHlwZSB7ZnVuY3Rpb24oaW1wb3J0KCcuLi9EYXRhc2V0LmpzJykuQ2VsbCxudW1iZXIsIG51bWJlcixvYmplY3QpOm51bWJlcn0gKi9cbiAgICAgICAgdGhpcy5oZWlnaHQgPSBvcHRzLmhlaWdodCB8fCAoKGNlbGwsIHJlc29sdXRpb24sIHosIHZpZXdTY2FsZSkgPT4gcmVzb2x1dGlvbiAqIDAuNClcblxuICAgICAgICAvKiogVGhlIHBlcnNwZWN0aXZlIGFuZ2xlLCBpbiBkZWdyZWUsIHdpdGhpbiBbLTE4MCwxODBdLCBmcm9tIFtPLHhdIGF4aXMuXG4gICAgICAgICAqIEB0eXBlIHtudW1iZXJ9ICovXG4gICAgICAgIHRoaXMuYW5nbGUgPSBvcHRzLmFuZ2xlICE9IHVuZGVmaW5lZCA/IG9wdHMuYW5nbGUgOiA1MFxuXG4gICAgICAgIC8qKiBBIGZ1bmN0aW9uIHJldHVybmluZyB0aGUgY29ybmVyIGxpbmUgc3Ryb2tlIHN0eWxlLlxuICAgICAgICAgKiBAdHlwZSB7ZnVuY3Rpb24oaW1wb3J0KCcuLi9EYXRhc2V0LmpzJykuQ2VsbCxudW1iZXIsbnVtYmVyLG51bWJlcik6c3RyaW5nfSAqL1xuICAgICAgICB0aGlzLmNvcm5lckxpbmVTdHJva2VDb2xvciA9IG9wdHMuY29ybmVyTGluZVN0cm9rZUNvbG9yIHx8ICgoYywgciwgeiwgYW5nbGUpID0+IFwiIzk5OVwiKVxuXG4gICAgICAgIC8qKiBBIGZ1bmN0aW9uIHJldHVybmluZyB0aGUgY29ybmVyIGxpbmUgd2lkdGguXG4gICAgICAgICogQHR5cGUge2Z1bmN0aW9uKGltcG9ydCgnLi4vRGF0YXNldC5qcycpLkNlbGwsbnVtYmVyLG51bWJlcixudW1iZXIpOm51bWJlcn0gKi9cbiAgICAgICAgdGhpcy5jb3JuZXJMaW5lV2lkdGggPSBvcHRzLmNvcm5lckxpbmVXaWR0aCB8fCAoKGMsIHIsIHosIGFuZ2xlKSA9PiAoYW5nbGUgJSA5MCA9PSAwID8gMCA6IDAuOCAqIHopKVxuXG4gICAgICAgIC8qKlxuICAgICAgICAqIFNob3cgdmVydGljYWwgY3Jvc3Mtc2VjdGlvbnMuXG4gICAgICAgICogQHR5cGUge2Jvb2xlYW59ICovXG4gICAgICAgIHRoaXMuc1ZlcnQgPSBvcHRzLnNWZXJ0ICE9IHVuZGVmaW5lZCA/IG9wdHMuc1ZlcnQgOiB0cnVlXG5cbiAgICAgICAgLyoqXG4gICAgICAgICogU2hvdyBob3Jpem9udGFsIGNyb3NzLXNlY3Rpb25zLlxuICAgICAgICAqIEB0eXBlIHtib29sZWFufSAqL1xuICAgICAgICB0aGlzLnNIb3IgPSBvcHRzLnNIb3IgIT0gdW5kZWZpbmVkID8gb3B0cy5zSG9yIDogdHJ1ZVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7QXJyYXkuPGltcG9ydChcIi4uL0RhdGFzZXQuanNcIikuQ2VsbD59IGNlbGxzXG4gICAgICogQHBhcmFtIHtpbXBvcnQoXCIuLi9HZW9DYW52YXMuanNcIikuR2VvQ2FudmFzfSBnZW9DYW52YXNcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gcmVzb2x1dGlvblxuICAgICAqIEBvdmVycmlkZVxuICAgICAqL1xuICAgIGRyYXcoY2VsbHMsIGdlb0NhbnZhcywgcmVzb2x1dGlvbikge1xuICAgICAgICAvL2ZpbHRlclxuICAgICAgICBpZiAodGhpcy5maWx0ZXIpIGNlbGxzID0gY2VsbHMuZmlsdGVyKHRoaXMuZmlsdGVyKVxuXG4gICAgICAgIC8vXG4gICAgICAgIGNvbnN0IHogPSBnZW9DYW52YXMudmlldy56XG5cbiAgICAgICAgLy9nZXQgdmlldyBzY2FsZVxuICAgICAgICBjb25zdCB2aWV3U2NhbGUgPSB0aGlzLnZpZXdTY2FsZSA/IHRoaXMudmlld1NjYWxlKGNlbGxzLCByZXNvbHV0aW9uLCB6KSA6IHVuZGVmaW5lZFxuXG4gICAgICAgIC8vbmIgY2F0ZWdvcmllcyAtIHVzZWQgZm9yIHJhZGFyIGFuZCBhZ2VweXJhbWlkXG4gICAgICAgIGNvbnN0IGNhdHMgPSBPYmplY3Qua2V5cyh0aGlzLmNvbG9yKVxuXG4gICAgICAgIC8vaGFsZiByZXNvbHV0aW9uXG4gICAgICAgIGNvbnN0IHIyID0gcmVzb2x1dGlvbiAvIDJcblxuICAgICAgICAvL2dldCBvZmZzZXRcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBjb25zdCBvZmZzZXQgPSB0aGlzLm9mZnNldCh1bmRlZmluZWQsIHJlc29sdXRpb24sIHopLCBkeCA9IG9mZnNldC5keCwgZHkgPSBvZmZzZXQuZHlcblxuICAgICAgICAvL21ha2Ugc2lkZXNcbiAgICAgICAgLyoqICBAdHlwZSB7QXJyYXkuPFNpZGU+fSAqL1xuICAgICAgICBjb25zdCBzaWRlcyA9IFtdXG5cbiAgICAgICAgLy9tYWtlIGhvcml6b250YWwgc2lkZXMgLSBleGNlcHQgd2hlbiBhbmdsZSUxODA9MFxuICAgICAgICAvL3NvcnQgY2VsbHMgYnkgeCBhbmQgeVxuICAgICAgICBpZiAodGhpcy5hbmdsZSAlIDE4MCAhPSA5MCAmJiB0aGlzLnNWZXJ0KSB7XG4gICAgICAgICAgICBjZWxscy5zb3J0KChjMSwgYzIpID0+IChjMi54ID09IGMxLnggPyBjMS55IC0gYzIueSA6IGMxLnggLSBjMi54KSlcbiAgICAgICAgICAgIGxldCBjMSA9IGNlbGxzWzBdXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IGNlbGxzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IGMyID0gY2VsbHNbaV1cblxuICAgICAgICAgICAgICAgIGlmICgoYzEueSArIHJlc29sdXRpb24gPT0gYzIueSkgJiYgKGMxLnggPT0gYzIueCkpXG4gICAgICAgICAgICAgICAgICAgIC8vY2VsbHMgaW4gc2FtZSBjb2x1bW4gYW5kIHRvdWNoIGFsb25nIGhvcml6b250YWwgc2lkZVxuICAgICAgICAgICAgICAgICAgICAvL21ha2Ugc2hhcmVkIHNpZGVcbiAgICAgICAgICAgICAgICAgICAgc2lkZXMucHVzaCh7IHg6IGMxLnggKyByMiwgeTogYzIueSwgb3I6ICdoJywgYzE6IGMxLCBjMjogYzIgfSlcbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy9jZWxscyBkbyBub3QgdG91Y2ggYWxvbmcgaG9yaXpvbnRhbCBzaWRlXG4gICAgICAgICAgICAgICAgICAgIC8vbWFrZSB0d28gc2lkZXM6IHRvcCBvbmUgZm9yIGMxLCBib3R0b20gZm9yIGMyXG4gICAgICAgICAgICAgICAgICAgIHNpZGVzLnB1c2goeyB4OiBjMS54ICsgcjIsIHk6IGMxLnkgKyByZXNvbHV0aW9uLCBvcjogJ2gnLCBjMTogYzEsIGMyOiB1bmRlZmluZWQgfSlcbiAgICAgICAgICAgICAgICAgICAgc2lkZXMucHVzaCh7IHg6IGMyLnggKyByMiwgeTogYzIueSwgb3I6ICdoJywgYzE6IHVuZGVmaW5lZCwgYzI6IGMyIH0pXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgYzEgPSBjMlxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy9tYWtlIHZlcnRpY2FsIHNpZGVzIC0gZXhjZXB0IHdoZW4gYW5nbGUlMTgwPTkwXG4gICAgICAgIC8vc29ydCBjZWxscyBieSB5IGFuZCB4XG4gICAgICAgIGlmICh0aGlzLmFuZ2xlICUgMTgwICE9IDAgJiYgdGhpcy5zSG9yKSB7XG4gICAgICAgICAgICBjZWxscy5zb3J0KChjMSwgYzIpID0+IChjMi55ID09IGMxLnkgPyBjMS54IC0gYzIueCA6IGMxLnkgLSBjMi55KSlcbiAgICAgICAgICAgIGxldCBjMSA9IGNlbGxzWzBdXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IGNlbGxzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IGMyID0gY2VsbHNbaV1cblxuICAgICAgICAgICAgICAgIGlmICgoYzEueCArIHJlc29sdXRpb24gPT0gYzIueCkgJiYgKGMxLnkgPT0gYzIueSkpXG4gICAgICAgICAgICAgICAgICAgIC8vY2VsbHMgaW4gc2FtZSByb3cgYW5kIHRvdWNoIGFsb25nIHZlcnRpY2FsIHNpZGVcbiAgICAgICAgICAgICAgICAgICAgLy9tYWtlIHNoYXJlZCBzaWRlXG4gICAgICAgICAgICAgICAgICAgIHNpZGVzLnB1c2goeyB4OiBjMi54LCB5OiBjMS55ICsgcjIsIG9yOiAndicsIGMxOiBjMSwgYzI6IGMyIH0pXG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vY2VsbHMgZG8gbm90IHRvdWNoIGFsb25nIHZlcnRpY2FsIHNpZGVcbiAgICAgICAgICAgICAgICAgICAgLy9tYWtlIHR3byBzaWRlczogcmlnaHQgb25lIGZvciBjMSwgbGVmdCBmb3IgYzJcbiAgICAgICAgICAgICAgICAgICAgc2lkZXMucHVzaCh7IHg6IGMxLnggKyByZXNvbHV0aW9uLCB5OiBjMS55ICsgcjIsIG9yOiAndicsIGMxOiBjMSwgYzI6IHVuZGVmaW5lZCB9KVxuICAgICAgICAgICAgICAgICAgICBzaWRlcy5wdXNoKHsgeDogYzIueCwgeTogYzIueSArIHIyLCBvcjogJ3YnLCBjMTogdW5kZWZpbmVkLCBjMjogYzIgfSlcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjMSA9IGMyXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvL1xuICAgICAgICBpZiAoc2lkZXMubGVuZ3RoID09IDApIHJldHVyblxuXG4gICAgICAgIC8vYW5nbGUgaW4gcmFkaWFuc1xuICAgICAgICBjb25zdCBhUmFkID0gdGhpcy5hbmdsZSAqIE1hdGguUEkgLyAxODAsIGNvcyA9IE1hdGguY29zKGFSYWQpLCBzaW4gPSBNYXRoLnNpbihhUmFkKVxuXG4gICAgICAgIC8vc29ydCBzaWRlcyBzbyB0aGF0IHRoZSBiYWNrIG9uZXMgYXJlIGRyYXduIGZpcnN0LiBUaGlzIGRlcGVuZHMgb24gdGhlIGFuZ2xlLlxuICAgICAgICAvL2RlcGVuZGluZyBvbiBkaXN0YW5jZSB0byB0aGUgcmVmZXJlbmNlIGNvcm5lciBwb2ludFxuICAgICAgICBjb25zdCB4Q29ybmVyID0gTWF0aC5hYnModGhpcy5hbmdsZSkgPCA5MCA/IGdlb0NhbnZhcy5leHRHZW8ueE1pbiA6IGdlb0NhbnZhcy5leHRHZW8ueE1heFxuICAgICAgICBjb25zdCB5Q29ybmVyID0gdGhpcy5hbmdsZSA8IDAgPyBnZW9DYW52YXMuZXh0R2VvLnlNYXggOiBnZW9DYW52YXMuZXh0R2VvLnlNaW5cbiAgICAgICAgc2lkZXMuc29ydCgoczEsIHMyKSA9PiAoTWF0aC5oeXBvdChzMi54IC0geENvcm5lciwgczIueSAtIHlDb3JuZXIpIC0gTWF0aC5oeXBvdChzMS54IC0geENvcm5lciwgczEueSAtIHlDb3JuZXIpKSlcblxuICAgICAgICAvL3ByZXBhcmUgZnVuY3Rpb24gdG8gZHJhdyBjb3JuZXIgbGluZSBmb3IgYSBjZWxsICpjKlxuICAgICAgICBjb25zdCBkcmF3Q29ybmVyTGluZSA9IChjZWxsKSA9PiB7XG5cbiAgICAgICAgICAgIGlmICghY2VsbCkgcmV0dXJuXG4gICAgICAgICAgICAvL2xpbmUgc3R5bGVcbiAgICAgICAgICAgIGNvbnN0IGx3ID0gdGhpcy5jb3JuZXJMaW5lV2lkdGggPyB0aGlzLmNvcm5lckxpbmVXaWR0aChjZWxsLCByZXNvbHV0aW9uLCB6LCB0aGlzLmFuZ2xlKSA6IDAuOCAqIHpcbiAgICAgICAgICAgIGlmIChsdyA9PSAwKSByZXR1cm5cbiAgICAgICAgICAgIGdlb0NhbnZhcy5jdHguc3Ryb2tlU3R5bGUgPSB0aGlzLmNvcm5lckxpbmVTdHJva2VDb2xvciA/IHRoaXMuY29ybmVyTGluZVN0cm9rZUNvbG9yKGNlbGwsIHJlc29sdXRpb24sIHosIHRoaXMuYW5nbGUpIDogXCIjMzMzXCJcbiAgICAgICAgICAgIGdlb0NhbnZhcy5jdHgubGluZVdpZHRoID0gbHdcblxuICAgICAgICAgICAgLy9oZWlnaHQgLSBpbiBnZW9cbiAgICAgICAgICAgIGNvbnN0IGhHID0gdGhpcy5oZWlnaHQoY2VsbCwgcmVzb2x1dGlvbiwgeiwgdmlld1NjYWxlKVxuXG4gICAgICAgICAgICAvL2RyYXcgbGluZVxuICAgICAgICAgICAgZ2VvQ2FudmFzLmN0eC5iZWdpblBhdGgoKVxuICAgICAgICAgICAgZ2VvQ2FudmFzLmN0eC5tb3ZlVG8oY2VsbC54ICsgcjIgKyBkeCwgY2VsbC55ICsgcjIgKyBkeSlcbiAgICAgICAgICAgIGdlb0NhbnZhcy5jdHgubGluZVRvKGNlbGwueCArIHIyICsgaEcgKiBjb3MgKyBkeCwgY2VsbC55ICsgcjIgKyBoRyAqIHNpbiArIGR5KVxuICAgICAgICAgICAgZ2VvQ2FudmFzLmN0eC5zdHJva2UoKVxuICAgICAgICB9XG5cbiAgICAgICAgLy9kcmF3IHNpZGVzXG4gICAgICAgIGdlb0NhbnZhcy5jdHgubGluZUNhcCA9IFwicm91bmRcIjtcbiAgICAgICAgZm9yIChsZXQgcyBvZiBzaWRlcykge1xuXG4gICAgICAgICAgICAvL2hlaWdodHMgLSBpbiBnZW9cbiAgICAgICAgICAgIGNvbnN0IGhHMSA9IHMuYzEgPyB0aGlzLmhlaWdodChzLmMxLCByZXNvbHV0aW9uLCB6LCB2aWV3U2NhbGUpIDogMCxcbiAgICAgICAgICAgICAgICBoRzIgPSBzLmMyID8gdGhpcy5oZWlnaHQocy5jMiwgcmVzb2x1dGlvbiwgeiwgdmlld1NjYWxlKSA6IDBcblxuICAgICAgICAgICAgLy9jb21wdXRlIHRvdGFscyBmb3IgYm90aCBjZWxsc1xuICAgICAgICAgICAgY29uc3QgdG90YWwxID0gY29tcHV0ZVRvdGFsKHMuYzEsIGNhdHMpLFxuICAgICAgICAgICAgICAgIHRvdGFsMiA9IGNvbXB1dGVUb3RhbChzLmMyLCBjYXRzKVxuICAgICAgICAgICAgaWYgKHRvdGFsMSA9PSAwICYmIHRvdGFsMiA9PSAwKSBjb250aW51ZVxuXG4gICAgICAgICAgICBsZXQgY3VtdWwxID0gMCwgY3VtdWwyID0gMFxuICAgICAgICAgICAgZm9yIChsZXQgW2NvbHVtbiwgY29sb3JdIG9mIE9iamVjdC5lbnRyaWVzKHRoaXMuY29sb3IpKSB7XG4gICAgICAgICAgICAgICAgLy9kcmF3IHN0cmlwZSBvZiBzaWRlIHMgYW5kIGNhdGVnb3J5IGNvbHVtblxuXG4gICAgICAgICAgICAgICAgLy9nZXQgdmFsdWVzIGZvciBib3RoIGNlbGxzXG4gICAgICAgICAgICAgICAgbGV0IHYxID0gcy5jMSA/ICtzLmMxW2NvbHVtbl0gOiAwXG4gICAgICAgICAgICAgICAgbGV0IHYyID0gcy5jMiA/ICtzLmMyW2NvbHVtbl0gOiAwXG4gICAgICAgICAgICAgICAgaWYgKHYxID09IDAgJiYgdjIgPT0gMCkgY29udGludWVcblxuICAgICAgICAgICAgICAgIC8vY29tcHV0ZSBoZWlnaHRzXG4gICAgICAgICAgICAgICAgY29uc3QgaDEgPSBoRzEgKiBjdW11bDEgLyB0b3RhbDEgfHwgMFxuICAgICAgICAgICAgICAgIGNvbnN0IGgxbiA9IGhHMSAqIChjdW11bDEgKyB2MSkgLyB0b3RhbDEgfHwgMFxuICAgICAgICAgICAgICAgIGNvbnN0IGgyID0gaEcyICogY3VtdWwyIC8gdG90YWwyIHx8IDBcbiAgICAgICAgICAgICAgICBjb25zdCBoMm4gPSBoRzIgKiAoY3VtdWwyICsgdjIpIC8gdG90YWwyIHx8IDBcblxuICAgICAgICAgICAgICAgIC8vbWFrZSBwYXRoXG4gICAgICAgICAgICAgICAgZ2VvQ2FudmFzLmN0eC5iZWdpblBhdGgoKVxuICAgICAgICAgICAgICAgIGlmIChzLm9yID09IFwiaFwiKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vaG9yaXpvbnRhbCBzaWRlIC0gdmVydGljYWwgc2VjdGlvblxuICAgICAgICAgICAgICAgICAgICAvL2JvdHRvbSBsZWZ0XG4gICAgICAgICAgICAgICAgICAgIGdlb0NhbnZhcy5jdHgubW92ZVRvKHMueCArIGgxICogY29zICsgZHgsIHMueSAtIHIyICsgaDEgKiBzaW4gKyBkeSlcbiAgICAgICAgICAgICAgICAgICAgLy90b3AgbGVmdFxuICAgICAgICAgICAgICAgICAgICBnZW9DYW52YXMuY3R4LmxpbmVUbyhzLnggKyBoMiAqIGNvcyArIGR4LCBzLnkgKyByMiArIGgyICogc2luICsgZHkpXG4gICAgICAgICAgICAgICAgICAgIC8vdG9wIHJpZ2h0XG4gICAgICAgICAgICAgICAgICAgIGdlb0NhbnZhcy5jdHgubGluZVRvKHMueCArIGgybiAqIGNvcyArIGR4LCBzLnkgKyByMiArIGgybiAqIHNpbiArIGR5KVxuICAgICAgICAgICAgICAgICAgICAvL2JvdHRvbSByaWdodFxuICAgICAgICAgICAgICAgICAgICBnZW9DYW52YXMuY3R4LmxpbmVUbyhzLnggKyBoMW4gKiBjb3MgKyBkeCwgcy55IC0gcjIgKyBoMW4gKiBzaW4gKyBkeSlcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvL3ZlcnRpY2FsIHNpZGUgLSBob3Jpem9udGFsIHNlY3Rpb25cbiAgICAgICAgICAgICAgICAgICAgLy9ib3R0b20gbGVmdFxuICAgICAgICAgICAgICAgICAgICBnZW9DYW52YXMuY3R4Lm1vdmVUbyhzLnggLSByMiArIGgxICogY29zICsgZHgsIHMueSArIGgxICogc2luICsgZHkpXG4gICAgICAgICAgICAgICAgICAgIC8vYm90dG9tIHJpZ2h0XG4gICAgICAgICAgICAgICAgICAgIGdlb0NhbnZhcy5jdHgubGluZVRvKHMueCArIHIyICsgaDIgKiBjb3MgKyBkeCwgcy55ICsgaDIgKiBzaW4gKyBkeSlcbiAgICAgICAgICAgICAgICAgICAgLy90b3AgcmlnaHRcbiAgICAgICAgICAgICAgICAgICAgZ2VvQ2FudmFzLmN0eC5saW5lVG8ocy54ICsgcjIgKyBoMm4gKiBjb3MgKyBkeCwgcy55ICsgaDJuICogc2luICsgZHkpXG4gICAgICAgICAgICAgICAgICAgIC8vdG9wIGxlZnRcbiAgICAgICAgICAgICAgICAgICAgZ2VvQ2FudmFzLmN0eC5saW5lVG8ocy54IC0gcjIgKyBoMW4gKiBjb3MgKyBkeCwgcy55ICsgaDFuICogc2luICsgZHkpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vY2cuY3R4LmNsb3NlUGF0aCgpXG5cbiAgICAgICAgICAgICAgICAvL2ZpbGxcbiAgICAgICAgICAgICAgICBnZW9DYW52YXMuY3R4LmZpbGxTdHlsZSA9IGNvbG9yXG4gICAgICAgICAgICAgICAgZ2VvQ2FudmFzLmN0eC5maWxsKClcblxuICAgICAgICAgICAgICAgIGN1bXVsMSArPSB2MVxuICAgICAgICAgICAgICAgIGN1bXVsMiArPSB2MlxuXG4gICAgICAgICAgICAgICAgLy9UT0RPIGRyYXcgb25seSBvbmUgbGluZVxuICAgICAgICAgICAgICAgIC8vZHJhdyBjb3JuZXIgbGluZVxuICAgICAgICAgICAgICAgIC8vaWYgKHMub3IgPT0gXCJoXCIpIHtcbiAgICAgICAgICAgICAgICBkcmF3Q29ybmVyTGluZShzLmMxKVxuICAgICAgICAgICAgICAgIGRyYXdDb3JuZXJMaW5lKHMuYzIpXG4gICAgICAgICAgICAgICAgLy9pZiAodGhpcy5hbmdsZSA+IDAgJiYgcy5vciA9PSBcImhcIikgZHJhd0Nvcm5lckxpbmUocy5jMilcbiAgICAgICAgICAgICAgICAvL2Vsc2UgZHJhd0Nvcm5lckxpbmUocy5jMilcbiAgICAgICAgICAgICAgICAvL31cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vdXBkYXRlIGxlZ2VuZHNcbiAgICAgICAgdGhpcy51cGRhdGVMZWdlbmRzKHsgc3R5bGU6IHRoaXMsIHI6IHJlc29sdXRpb24sIHo6IHosIHZpZXdTY2FsZTogdmlld1NjYWxlIH0pXG4gICAgfVxufVxuXG5cblxuY29uc3QgY29tcHV0ZVRvdGFsID0gKGNlbGwsIGNhdGVnb3JpZXMpID0+IHtcbiAgICBpZiAoIWNlbGwpIHJldHVybiAwXG4gICAgbGV0IHRvdGFsID0gMFxuICAgIGZvciAobGV0IGNvbHVtbiBvZiBjYXRlZ29yaWVzKSB7XG4gICAgICAgIGNvbnN0IHYgPSBjZWxsW2NvbHVtbl1cbiAgICAgICAgaWYgKCF2KSBjb250aW51ZVxuICAgICAgICB0b3RhbCArPSArdlxuICAgIH1cbiAgICByZXR1cm4gdG90YWwgfHwgMFxufVxuIiwiLy9AdHMtY2hlY2tcbid1c2Ugc3RyaWN0J1xuXG5pbXBvcnQgeyBTdHlsZSB9IGZyb20gJy4uL1N0eWxlLmpzJ1xuXG4vKipcbiAqXG4gKiBAYXV0aG9yIEp1bGllbiBHYWZmdXJpXG4gKi9cbmV4cG9ydCBjbGFzcyBKb3lQbG90U3R5bGUgZXh0ZW5kcyBTdHlsZSB7XG4gICAgLyoqIEBwYXJhbSB7b2JqZWN0fSBvcHRzICovXG4gICAgY29uc3RydWN0b3Iob3B0cykge1xuICAgICAgICBzdXBlcihvcHRzKVxuICAgICAgICBvcHRzID0gb3B0cyB8fCB7fVxuXG4gICAgICAgIC8qKiBBIGZ1bmN0aW9uIHJldHVybmluZyB0aGUgaGVpZ2h0IG9mIGEgY2VsbCBpbiBnZW9ncmFwaGljYWwgdW5pdC5cbiAgICAgICAgICogQHR5cGUge2Z1bmN0aW9uKGltcG9ydCgnLi4vRGF0YXNldC5qcycpLkNlbGwsbnVtYmVyLCBudW1iZXIsb2JqZWN0KTpudW1iZXJ9ICovXG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gb3B0cy5oZWlnaHQgfHwgKChjLCByKSA9PiByICogTWF0aC5yYW5kb20oKSkgLy8oYyxyLHosdnMpID0+IHt9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEB0eXBlIHtmdW5jdGlvbihudW1iZXIse21pbjpudW1iZXIsIG1heDpudW1iZXJ9LG51bWJlcixudW1iZXIpOnN0cmluZ30gKi9cbiAgICAgICAgdGhpcy5saW5lQ29sb3IgPSBvcHRzLmxpbmVDb2xvciB8fCAoKHksIHlzLCByLCB6KSA9PiAnI0JCQicpXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAdHlwZSB7ZnVuY3Rpb24obnVtYmVyLHttaW46bnVtYmVyLCBtYXg6bnVtYmVyfSxudW1iZXIsbnVtYmVyKTpudW1iZXJ9ICovXG4gICAgICAgIHRoaXMubGluZVdpZHRoID0gb3B0cy5saW5lV2lkdGggfHwgKCh5LCB5cywgciwgeikgPT4geilcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEB0eXBlIHtmdW5jdGlvbihudW1iZXIse21pbjpudW1iZXIsIG1heDpudW1iZXJ9LG51bWJlcixudW1iZXIpOnN0cmluZ30gKi9cbiAgICAgICAgdGhpcy5maWxsQ29sb3IgPSBvcHRzLmZpbGxDb2xvciB8fCAoKHksIHlzLCByLCB6KSA9PiAnI2MwOGM1OTY4JylcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7QXJyYXkuPGltcG9ydChcIi4uL0RhdGFzZXQuanNcIikuQ2VsbD59IGNlbGxzXG4gICAgICogQHBhcmFtIHtpbXBvcnQoXCIuLi9HZW9DYW52YXMuanNcIikuR2VvQ2FudmFzfSBnZW9DYW52YXNcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gcmVzb2x1dGlvblxuICAgICAqIEBvdmVycmlkZVxuICAgICAqL1xuICAgIGRyYXcoY2VsbHMsIGdlb0NhbnZhcywgcmVzb2x1dGlvbikge1xuICAgICAgICAvL2ZpbHRlclxuICAgICAgICBpZiAodGhpcy5maWx0ZXIpIGNlbGxzID0gY2VsbHMuZmlsdGVyKHRoaXMuZmlsdGVyKVxuXG4gICAgICAgIGdlb0NhbnZhcy5jdHgubGluZUpvaW4gPSAncm91bmQnXG5cbiAgICAgICAgLy9cbiAgICAgICAgY29uc3QgeiA9IGdlb0NhbnZhcy52aWV3LnpcblxuICAgICAgICAvL2dldCB2aWV3IHNjYWxlXG4gICAgICAgIGNvbnN0IHZpZXdTY2FsZSA9IHRoaXMudmlld1NjYWxlID8gdGhpcy52aWV3U2NhbGUoY2VsbHMsIHJlc29sdXRpb24sIHopIDogdW5kZWZpbmVkXG5cbiAgICAgICAgLy9pbmRleCBjZWxscyBieSB5IGFuZCB4XG4gICAgICAgIC8qKiAgQHR5cGUge29iamVjdH0gKi9cbiAgICAgICAgY29uc3QgaW5kID0ge31cbiAgICAgICAgZm9yIChjb25zdCBjZWxsIG9mIGNlbGxzKSB7XG4gICAgICAgICAgICBsZXQgcm93ID0gaW5kW2NlbGwueV1cbiAgICAgICAgICAgIGlmICghcm93KSB7XG4gICAgICAgICAgICAgICAgcm93ID0ge31cbiAgICAgICAgICAgICAgICBpbmRbY2VsbC55XSA9IHJvd1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcm93W2NlbGwueF0gPSB0aGlzLmhlaWdodChjZWxsLCByZXNvbHV0aW9uLCB6LCB2aWV3U2NhbGUpXG4gICAgICAgIH1cblxuICAgICAgICAvL2NvbXB1dGUgZXh0ZW50XG4gICAgICAgIGNvbnN0IGUgPSBnZW9DYW52YXMuZXh0R2VvXG4gICAgICAgIGlmICghZSkgcmV0dXJuXG4gICAgICAgIGNvbnN0IHhNaW4gPSBNYXRoLmZsb29yKGUueE1pbiAvIHJlc29sdXRpb24pICogcmVzb2x1dGlvblxuICAgICAgICBjb25zdCB4TWF4ID0gTWF0aC5mbG9vcihlLnhNYXggLyByZXNvbHV0aW9uKSAqIHJlc29sdXRpb25cbiAgICAgICAgY29uc3QgeU1pbiA9IE1hdGguZmxvb3IoZS55TWluIC8gcmVzb2x1dGlvbikgKiByZXNvbHV0aW9uXG4gICAgICAgIGNvbnN0IHlNYXggPSBNYXRoLmZsb29yKGUueU1heCAvIHJlc29sdXRpb24pICogcmVzb2x1dGlvblxuXG4gICAgICAgIC8qKiAgQHR5cGUge3ttaW46bnVtYmVyLCBtYXg6bnVtYmVyfX0gKi9cbiAgICAgICAgY29uc3QgeXMgPSB7IG1pbjogeU1pbiwgbWF4OiB5TWF4IH1cblxuICAgICAgICAvL2RyYXcgbGluZXMsIHJvdyBieSByb3csIHN0YXRpbmcgZnJvbSB0aGUgdG9wXG4gICAgICAgIGZvciAobGV0IHkgPSB5TWF4OyB5ID49IHlNaW47IHkgLT0gcmVzb2x1dGlvbikge1xuICAgICAgICAgICAgLy9nZXQgcm93XG4gICAgICAgICAgICBjb25zdCByb3cgPSBpbmRbeV1cblxuICAgICAgICAgICAgLy9ubyByb3dcbiAgICAgICAgICAgIGlmICghcm93KSBjb250aW51ZVxuXG4gICAgICAgICAgICAvL3BsYWNlIGZpcnN0IHBvaW50XG4gICAgICAgICAgICBnZW9DYW52YXMuY3R4LmJlZ2luUGF0aCgpXG4gICAgICAgICAgICBnZW9DYW52YXMuY3R4Lm1vdmVUbyh4TWluIC0gcmVzb2x1dGlvbiAvIDIsIHkpXG5cbiAgICAgICAgICAgIC8vc3RvcmUgdGhlIHByZXZpb3VzIGhlaWdodFxuICAgICAgICAgICAgLyoqIEB0eXBlIHtudW1iZXJ8dW5kZWZpbmVkfSAqL1xuICAgICAgICAgICAgbGV0IGhHX1xuXG4gICAgICAgICAgICAvL2dvIHRocm91Z2ggdGhlIGxpbmUgY2VsbHNcbiAgICAgICAgICAgIGZvciAobGV0IHggPSB4TWluOyB4IDw9IHhNYXg7IHggKz0gcmVzb2x1dGlvbikge1xuICAgICAgICAgICAgICAgIC8vZ2V0IGNvbHVtbiB2YWx1ZVxuICAgICAgICAgICAgICAgIC8qKiBAdHlwZSB7bnVtYmVyfSAqL1xuICAgICAgICAgICAgICAgIGxldCBoRyA9IHJvd1t4XVxuICAgICAgICAgICAgICAgIGlmICghaEcpIGhHID0gMFxuXG4gICAgICAgICAgICAgICAgaWYgKGhHIHx8IGhHXykge1xuICAgICAgICAgICAgICAgICAgICAvL2RyYXcgbGluZSBvbmx5IHdoZW4gYXQgbGVhc3Qgb25lIG9mIGJvdGggdmFsdWVzIGlzIG5vbi1udWxsXG4gICAgICAgICAgICAgICAgICAgIC8vVE9ETyB0ZXN0IGJlemllckN1cnZlVG9cbiAgICAgICAgICAgICAgICAgICAgZ2VvQ2FudmFzLmN0eC5saW5lVG8oeCArIHJlc29sdXRpb24gLyAyLCB5ICsgaEcpXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy9lbHNlIG1vdmUgdGhlIHBvaW50XG4gICAgICAgICAgICAgICAgICAgIGdlb0NhbnZhcy5jdHgubW92ZVRvKHggKyByZXNvbHV0aW9uIC8gMiwgeSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy9zdG9yZSB0aGUgcHJldmlvdXMgdmFsdWVcbiAgICAgICAgICAgICAgICBoR18gPSBoR1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvL2xhc3QgcG9pbnRcbiAgICAgICAgICAgIGlmIChoR18pIGdlb0NhbnZhcy5jdHgubGluZVRvKHhNYXggKyByZXNvbHV0aW9uIC8gMiwgeSlcblxuICAgICAgICAgICAgLy9kcmF3IGZpbGxcbiAgICAgICAgICAgIGNvbnN0IGZjID0gdGhpcy5maWxsQ29sb3IoeSwgeXMsIHJlc29sdXRpb24sIHopXG4gICAgICAgICAgICBpZiAoZmMgJiYgZmMgIT0gJ25vbmUnKSB7XG4gICAgICAgICAgICAgICAgZ2VvQ2FudmFzLmN0eC5maWxsU3R5bGUgPSBmY1xuICAgICAgICAgICAgICAgIGdlb0NhbnZhcy5jdHguZmlsbCgpXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vZHJhdyBsaW5lXG4gICAgICAgICAgICBjb25zdCBsYyA9IHRoaXMubGluZUNvbG9yKHksIHlzLCByZXNvbHV0aW9uLCB6KVxuICAgICAgICAgICAgY29uc3QgbHcgPSB0aGlzLmxpbmVXaWR0aCh5LCB5cywgcmVzb2x1dGlvbiwgeilcbiAgICAgICAgICAgIGlmIChsYyAmJiBsYyAhPSAnbm9uZScgJiYgbHcgPiAwKSB7XG4gICAgICAgICAgICAgICAgZ2VvQ2FudmFzLmN0eC5zdHJva2VTdHlsZSA9IGxjXG4gICAgICAgICAgICAgICAgZ2VvQ2FudmFzLmN0eC5saW5lV2lkdGggPSBsd1xuICAgICAgICAgICAgICAgIGdlb0NhbnZhcy5jdHguc3Ryb2tlKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIi8vQHRzLWNoZWNrXG4ndXNlIHN0cmljdCdcblxuaW1wb3J0IHsgVGFuYWthU3R5bGUgfSBmcm9tICcuL1RhbmFrYVN0eWxlLmpzJ1xuaW1wb3J0IHsgU3Ryb2tlU3R5bGUgfSBmcm9tICcuL1N0cm9rZVN0eWxlLmpzJ1xuaW1wb3J0IHsgU3F1YXJlQ29sb3JDYXRXR0xTdHlsZSB9IGZyb20gJy4vU3F1YXJlQ29sb3JDYXRXR0xTdHlsZS5qcydcbmltcG9ydCB7IFN0eWxlIH0gZnJvbSAnLi4vU3R5bGUuanMnXG5cbi8qKlxuICogQGF1dGhvciBKdWxpZW4gR2FmZnVyaVxuICovXG5leHBvcnQgY2xhc3MgTGVnb1N0eWxlIHtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY29sXG4gICAgICogQHBhcmFtIHtvYmplY3R9IG9wdHNcbiAgICAgKiBAcmV0dXJucyB7QXJyYXkuPFN0eWxlPn1cbiAgICAgKi9cbiAgICBzdGF0aWMgZ2V0KGNvbCwgb3B0cykge1xuICAgICAgICBvcHRzID0gb3B0cyB8fCB7fVxuXG4gICAgICAgIC8vdGhlIGNvbG9yc1xuICAgICAgICAvL2h0dHA6Ly93d3cuamVubnlzY3JheW9uY29sbGVjdGlvbi5jb20vMjAyMS8wNi9hbGwtY3VycmVudC1sZWdvLWNvbG9ycy5odG1sXG4gICAgICAgIC8vaHR0cHM6Ly9sZW9uYXdpY3ouZ2l0aHViLmlvL2xlZ29jb2xvcnMvcmVmZXJlbmNlL2ZpZ3VyZXMvUkVBRE1FLXBsb3QtMS5wbmdcbiAgICAgICAgb3B0cy5jb2xvcnMgPSBvcHRzLmNvbG9ycyB8fCBbXG4gICAgICAgICAgICAnIzAwODUyYicsIC8vZGFya2VyIGdyZWVuXG4gICAgICAgICAgICAnI2FmZDI0NicsIC8vbGlnaHQgZ3JlZW5cbiAgICAgICAgICAgICcjZmFjODBhJywgLy9kYXJrIHllbGxvd1xuICAgICAgICAgICAgJyNiYjgwNWEnLCAvL2Jyb3duXG4gICAgICAgICAgICAnI2Q2NzkyMycsIC8vbW9zdGFyZFxuICAgICAgICAgICAgJyNjYjRlMjknLCAvL3JlZGlzaFxuICAgICAgICAgICAgJyNiNDAwMDAnLCAvL3JlZFxuICAgICAgICAgICAgJyM3MjAwMTInLCAvL2RhcmsgcmVkXG4gICAgICAgICAgICAvL1wicHVycGxlXCIsXG4gICAgICAgICAgICAvL1wiI2VlZVwiIC8vd2hpdGhlXG4gICAgICAgIF1cblxuICAgICAgICBvcHRzLmNvbERhcmsgPSBvcHRzLmNvbERhcmsgfHwgJyMzMzMnXG4gICAgICAgIG9wdHMuY29sQnJpZ2h0ID0gb3B0cy5jb2xCcmlnaHQgfHwgJyNhYWEnXG4gICAgICAgIG9wdHMud2lkdGhGYWN0b3IgPSBvcHRzLndpZHRoRmFjdG9yIHx8IDAuMTJcblxuICAgICAgICAvL3JldXNlIHRhbmFrYSBhcyBiYXNpc1xuICAgICAgICBjb25zdCB0cyA9IFRhbmFrYVN0eWxlLmdldChjb2wsIG9wdHMpXG4gICAgICAgIC8vc3R5bGUgdG8gc2hvdyBsaW1pdHMgYmV0d2VlbiBwaWVjZXNcbiAgICAgICAgY29uc3Qgc3N0ID0gbmV3IFN0cm9rZVN0eWxlKHtcbiAgICAgICAgICAgIHN0cm9rZUNvbG9yOiAoKSA9PiAnIzY2NicsXG4gICAgICAgICAgICBzdHJva2VXaWR0aDogKHYsIHIsIHMsIHopID0+IDAuMiAqIHosXG4gICAgICAgICAgICBmaWx0ZXI6IG9wdHMuZmlsdGVyLFxuICAgICAgICB9KVxuXG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICB0c1swXSxcbiAgICAgICAgICAgIHNzdCxcbiAgICAgICAgICAgIHRzWzFdLFxuICAgICAgICAgICAgbmV3IExlZ29Ub3BTdHlsZSh7IGNvbERhcms6IG9wdHMuY29sRGFyaywgY29sQnJpZ2h0OiBvcHRzLmNvbEJyaWdodCwgZmlsdGVyOiBvcHRzLmZpbHRlciB9KSxcbiAgICAgICAgXVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb24oc3RyaW5nKTpzdHJpbmd9IGNvbFxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRzXG4gICAgICogQHJldHVybnMge0FycmF5LjxTdHlsZT59XG4gICAgICovXG4gICAgc3RhdGljIGdldENhdChjb2wsIG9wdHMpIHtcbiAgICAgICAgb3B0cyA9IG9wdHMgfHwge31cblxuICAgICAgICBvcHRzLmNvbERhcmsgPSBvcHRzLmNvbERhcmsgfHwgJyMzMzMnXG4gICAgICAgIG9wdHMuY29sQnJpZ2h0ID0gb3B0cy5jb2xCcmlnaHQgfHwgJyNhYWEnXG5cbiAgICAgICAgLy9cbiAgICAgICAgY29uc3QgcyA9IG5ldyBTcXVhcmVDb2xvckNhdFdHTFN0eWxlKHsgY29sb3JDb2w6IGNvbCwgY29sb3I6IG9wdHMuY29sb3IgfSlcbiAgICAgICAgLy9zdHlsZSB0byBzaG93IGxpbWl0cyBiZXR3ZWVuIHBpZWNlc1xuICAgICAgICBjb25zdCBzc3QgPSBuZXcgU3Ryb2tlU3R5bGUoeyBzdHJva2VDb2xvcjogKCkgPT4gJyM2NjYnLCBzdHJva2VXaWR0aDogKHYsIHIsIHMsIHopID0+IDAuMiAqIHogfSlcblxuICAgICAgICByZXR1cm4gW3MsIHNzdCwgbmV3IExlZ29Ub3BTdHlsZSh7IGNvbERhcms6IG9wdHMuY29sRGFyaywgY29sQnJpZ2h0OiBvcHRzLmNvbEJyaWdodCB9KV1cbiAgICB9XG59XG5cbi8qKlxuICogQSBzdHlsZSB0byBkcmF3IHRvcCBjaXJjbGUgb2YgbGVnbyBicmlja3MuXG4gKi9cbmNsYXNzIExlZ29Ub3BTdHlsZSBleHRlbmRzIFN0eWxlIHtcbiAgICAvKiogQHBhcmFtIHtvYmplY3R8dW5kZWZpbmVkfSBvcHRzICovXG4gICAgY29uc3RydWN0b3Iob3B0cykge1xuICAgICAgICBzdXBlcihvcHRzKVxuICAgICAgICBvcHRzID0gb3B0cyB8fCB7fVxuICAgICAgICB0aGlzLmNvbERhcmsgPSBvcHRzLmNvbERhcmsgfHwgJyMzMzMnXG4gICAgICAgIHRoaXMuY29sQnJpZ2h0ID0gb3B0cy5jb2xCcmlnaHQgfHwgJyNhYWEnXG4gICAgfVxuXG4gICAgZHJhdyhjZWxscywgciwgY2cpIHtcbiAgICAgICAgLy9maWx0ZXJcbiAgICAgICAgaWYgKHRoaXMuZmlsdGVyKSBjZWxscyA9IGNlbGxzLmZpbHRlcih0aGlzLmZpbHRlcilcblxuICAgICAgICBjZy5jdHgubGluZVdpZHRoID0gMC42ICogY2cudmlldy56XG5cbiAgICAgICAgLy9kYXJrIHBhcnRcbiAgICAgICAgY2cuY3R4LnN0cm9rZVN0eWxlID0gdGhpcy5jb2xEYXJrXG4gICAgICAgIGZvciAobGV0IGMgb2YgY2VsbHMpIHtcbiAgICAgICAgICAgIGNnLmN0eC5iZWdpblBhdGgoKVxuICAgICAgICAgICAgY2cuY3R4LmFyYyhjLnggKyByICogMC41LCBjLnkgKyByICogMC41LCByICogMC41NSAqIDAuNSwgTWF0aC5QSSAvIDQsIC1NYXRoLlBJICogKDMgLyA0KSwgdHJ1ZSlcbiAgICAgICAgICAgIGNnLmN0eC5zdHJva2UoKVxuICAgICAgICB9XG5cbiAgICAgICAgLy9icmlnaHQgcGFydFxuICAgICAgICBjZy5jdHguc3Ryb2tlU3R5bGUgPSB0aGlzLmNvbEJyaWdodFxuICAgICAgICBmb3IgKGxldCBjIG9mIGNlbGxzKSB7XG4gICAgICAgICAgICBjZy5jdHguYmVnaW5QYXRoKClcbiAgICAgICAgICAgIGNnLmN0eC5hcmMoYy54ICsgciAqIDAuNSwgYy55ICsgciAqIDAuNSwgciAqIDAuNTUgKiAwLjUsIE1hdGguUEkgLyA0LCAtTWF0aC5QSSAqICgzIC8gNCksIGZhbHNlKVxuICAgICAgICAgICAgY2cuY3R4LnN0cm9rZSgpXG4gICAgICAgIH1cbiAgICB9XG59XG4iLCIvL0B0cy1jaGVja1xuJ3VzZSBzdHJpY3QnXG5cbmltcG9ydCB7IFN0eWxlIH0gZnJvbSAnLi4vU3R5bGUuanMnXG5cbi8qKlxuICogQGF1dGhvciBKdWxpZW4gR2FmZnVyaVxuICovXG5leHBvcnQgY2xhc3MgTW9zYWljU3R5bGUgZXh0ZW5kcyBTdHlsZSB7XG4gICAgLyoqIEBwYXJhbSB7b2JqZWN0fSBvcHRzICovXG4gICAgY29uc3RydWN0b3Iob3B0cykge1xuICAgICAgICBzdXBlcihvcHRzKVxuICAgICAgICBvcHRzID0gb3B0cyB8fCB7fVxuXG4gICAgICAgIC8qKiBBIGZ1bmN0aW9uIHJldHVybmluZyB0aGUgY29sb3Igb2YgdGhlIGNlbGwuXG4gICAgICAgICAqIEB0eXBlIHtmdW5jdGlvbihpbXBvcnQoJy4uL0RhdGFzZXQuanMnKS5DZWxsLG51bWJlciwgbnVtYmVyLG9iamVjdCk6c3RyaW5nfSAqL1xuICAgICAgICB0aGlzLmNvbG9yID0gb3B0cy5jb2xvciB8fCAoKCkgPT4gXCIjRUE2QkFDXCIpIC8vKGMscix6LHZzKSA9PiB7fVxuXG4gICAgICAgIC8qKiBUaGUgbW9zYWljIGZhY3Rvciwgd2l0aGluIFswLDAuNV0uIFNldCB0byAwIGZvciBubyBtb3NhaWMgZWZmZWN0LiBTZXQgdG8gMC41IGZvciBzdHJvbmcgbW9zYWljIGVmZmVjdC5cbiAgICAgICAgICogQHR5cGUge251bWJlcn0gKi9cbiAgICAgICAgdGhpcy5tb3NhaWNGYWN0b3IgPSBvcHRzLm1vc2FpY0ZhY3RvciB8fCAwLjE1XG5cbiAgICAgICAgLyoqIFRoZSBtb3NhaWMgc2hhZG93IGZhY3Rvciwgd2l0aGluIFswLDAuNV0uIFNldCB0byAwIGZvciBubyBtb3NhaWMgc2hhZG93LiBTZXQgdG8gMC41IGZvciBzdHJvbmcgbW9zYWljIHNoYWRvdy5cbiAgICAgICAgICogQHR5cGUge251bWJlcn0gKi9cbiAgICAgICAgdGhpcy5zaGFkb3dGYWN0b3IgPSBvcHRzLnNoYWRvd0ZhY3RvciB8fCAwLjJcblxuICAgICAgICAvKiogVGhlIG1vc2FpYyBzaGFkb3cgY29sb3IuXG4gICAgICAgICAqIEB0eXBlIHtzdHJpbmd9ICovXG4gICAgICAgIHRoaXMuc2hhZG93Q29sb3IgPSBvcHRzLnNoYWRvd0NvbG9yIHx8ICcjNTU1J1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtBcnJheS48aW1wb3J0KFwiLi4vRGF0YXNldFwiKS5DZWxsPn0gY2VsbHNcbiAgICAgKiBAcGFyYW0ge2ltcG9ydChcIi4uL0dlb0NhbnZhc1wiKS5HZW9DYW52YXN9IGdlb0NhbnZhc1xuICAgICAqIEBwYXJhbSB7bnVtYmVyfSByZXNvbHV0aW9uXG4gICAgICovXG4gICAgZHJhdyhjZWxscywgZ2VvQ2FudmFzLCByZXNvbHV0aW9uKSB7XG4gICAgICAgIC8vZmlsdGVyXG4gICAgICAgIGlmICh0aGlzLmZpbHRlcikgY2VsbHMgPSBjZWxscy5maWx0ZXIodGhpcy5maWx0ZXIpXG5cbiAgICAgICAgLy9cbiAgICAgICAgY29uc3QgeiA9IGdlb0NhbnZhcy52aWV3LnpcblxuICAgICAgICAvL2dldCB2aWV3IHNjYWxlXG4gICAgICAgIGNvbnN0IHZpZXdTY2FsZSA9IHRoaXMudmlld1NjYWxlID8gdGhpcy52aWV3U2NhbGUoY2VsbHMsIHJlc29sdXRpb24sIHopIDogdW5kZWZpbmVkXG5cbiAgICAgICAgLy9zZXQgc3Ryb2tlIHN0eWxlLCBmb3Igc2hhZG93XG4gICAgICAgIGdlb0NhbnZhcy5jdHguc3Ryb2tlU3R5bGUgPSB0aGlzLnNoYWRvd0NvbG9yXG4gICAgICAgIGdlb0NhbnZhcy5jdHgubGluZVdpZHRoID0gdGhpcy5zaGFkb3dGYWN0b3IgKiByZXNvbHV0aW9uXG4gICAgICAgIGdlb0NhbnZhcy5jdHgubGluZUpvaW4gPSAncm91bmQnXG4gICAgICAgIGdlb0NhbnZhcy5jdHgubGluZUNhcCA9ICdidXR0J1xuXG4gICAgICAgIC8vZnVuY3Rpb24gdG8gY29tcHV0ZSBwb3NpdGlvbiBtb3NhaWMgZWZmZWN0XG4gICAgICAgIGNvbnN0IGQgPSByZXNvbHV0aW9uICogdGhpcy5tb3NhaWNGYWN0b3JcbiAgICAgICAgY29uc3QgbW9zYWljID0gKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHsgeDogTWF0aC5yYW5kb20oKSAqIGQsIHk6IE1hdGgucmFuZG9tKCkgKiBkIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IGNlbGwgb2YgY2VsbHMpIHtcbiAgICAgICAgICAgIC8vc2V0IGZpbGwgY29sb3JcbiAgICAgICAgICAgIGNvbnN0IGNvbCA9IHRoaXMuY29sb3IgPyB0aGlzLmNvbG9yKGNlbGwsIHJlc29sdXRpb24sIHosIHZpZXdTY2FsZSkgOiB1bmRlZmluZWRcbiAgICAgICAgICAgIGlmICghY29sIHx8IGNvbCA9PT0gJ25vbmUnKSBjb250aW51ZVxuICAgICAgICAgICAgZ2VvQ2FudmFzLmN0eC5maWxsU3R5bGUgPSBjb2xcblxuICAgICAgICAgICAgLy9nZXQgb2Zmc2V0XG4gICAgICAgICAgICBjb25zdCBvZmZzZXQgPSB0aGlzLm9mZnNldChjZWxsLCByZXNvbHV0aW9uLCB6KVxuXG4gICAgICAgICAgICAvL2NvbXB1dGUgcG9zaXRpb24gbW9zYWljIGVmZmVjdFxuICAgICAgICAgICAgY29uc3QgbGwgPSBtb3NhaWMoKSxcbiAgICAgICAgICAgICAgICB1bCA9IG1vc2FpYygpLFxuICAgICAgICAgICAgICAgIGxyID0gbW9zYWljKCksXG4gICAgICAgICAgICAgICAgdXIgPSBtb3NhaWMoKVxuXG4gICAgICAgICAgICAvL3N0cm9rZVxuICAgICAgICAgICAgaWYgKHRoaXMuc2hhZG93RmFjdG9yID4gMCkge1xuICAgICAgICAgICAgICAgIGdlb0NhbnZhcy5jdHguYmVnaW5QYXRoKClcbiAgICAgICAgICAgICAgICBnZW9DYW52YXMuY3R4Lm1vdmVUbyhjZWxsLnggKyBvZmZzZXQuZHggKyBsbC54LCBjZWxsLnkgKyBvZmZzZXQuZHkgKyBsbC55KVxuICAgICAgICAgICAgICAgIGdlb0NhbnZhcy5jdHgubGluZVRvKGNlbGwueCArIG9mZnNldC5keCArIHJlc29sdXRpb24gLSBsci54LCBjZWxsLnkgKyBvZmZzZXQuZHkgKyBsci55KVxuICAgICAgICAgICAgICAgIGdlb0NhbnZhcy5jdHgubGluZVRvKGNlbGwueCArIG9mZnNldC5keCArIHJlc29sdXRpb24gLSB1ci54LCBjZWxsLnkgKyBvZmZzZXQuZHkgKyByZXNvbHV0aW9uIC0gdXIueSlcbiAgICAgICAgICAgICAgICBnZW9DYW52YXMuY3R4LnN0cm9rZSgpXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vZmlsbFxuXG4gICAgICAgICAgICBnZW9DYW52YXMuY3R4LmJlZ2luUGF0aCgpXG4gICAgICAgICAgICBnZW9DYW52YXMuY3R4Lm1vdmVUbyhjZWxsLnggKyBvZmZzZXQuZHggKyBsbC54LCBjZWxsLnkgKyBvZmZzZXQuZHkgKyBsbC55KVxuICAgICAgICAgICAgZ2VvQ2FudmFzLmN0eC5saW5lVG8oY2VsbC54ICsgb2Zmc2V0LmR4ICsgcmVzb2x1dGlvbiAtIGxyLngsIGNlbGwueSArIG9mZnNldC5keSArIGxyLnkpXG4gICAgICAgICAgICBnZW9DYW52YXMuY3R4LmxpbmVUbyhjZWxsLnggKyBvZmZzZXQuZHggKyByZXNvbHV0aW9uIC0gdXIueCwgY2VsbC55ICsgb2Zmc2V0LmR5ICsgcmVzb2x1dGlvbiAtIHVyLnkpXG4gICAgICAgICAgICBnZW9DYW52YXMuY3R4LmxpbmVUbyhjZWxsLnggKyBvZmZzZXQuZHggKyB1bC54LCBjZWxsLnkgKyBvZmZzZXQuZHkgKyByZXNvbHV0aW9uIC0gdWwueSlcbiAgICAgICAgICAgIGdlb0NhbnZhcy5jdHguZmlsbCgpXG4gICAgICAgIH1cblxuICAgICAgICAvL3VwZGF0ZSBsZWdlbmRzXG4gICAgICAgIHRoaXMudXBkYXRlTGVnZW5kcyh7IHN0eWxlOiB0aGlzLCByZXNvbHV0aW9uOiByZXNvbHV0aW9uLCB6OiB6LCB2aWV3U2NhbGU6IHZpZXdTY2FsZSB9KVxuICAgIH1cbn1cbiIsIi8vQHRzLWNoZWNrXG4ndXNlIHN0cmljdCdcblxuaW1wb3J0IHsgU3R5bGUgfSBmcm9tICcuLi9TdHlsZS5qcydcblxuLyoqXG4gKlxuICogQGF1dGhvciBKb3NlcGggRGF2aWVzLCBKdWxpZW4gR2FmZnVyaVxuICovXG5leHBvcnQgY2xhc3MgTmluamFTdGFyU3R5bGUgZXh0ZW5kcyBTdHlsZSB7XG4gICAgLyoqIEBwYXJhbSB7b2JqZWN0fSBvcHRzICovXG4gICAgY29uc3RydWN0b3Iob3B0cykge1xuICAgICAgICBzdXBlcihvcHRzKVxuICAgICAgICBvcHRzID0gb3B0cyB8fCB7fVxuXG4gICAgICAgIC8qKiBBIGZ1bmN0aW9uIHJldHVybmluZyB0aGUgY29sb3Igb2YgdGhlIGNlbGwuXG4gICAgICAgICAqIEB0eXBlIHtmdW5jdGlvbihpbXBvcnQoJy4uL0RhdGFzZXQuanMnKS5DZWxsLG51bWJlciwgbnVtYmVyLG9iamVjdCk6c3RyaW5nfSAqL1xuICAgICAgICB0aGlzLmNvbG9yID0gb3B0cy5jb2xvciB8fCAoKCkgPT4gXCIjRUE2QkFDXCIpIC8vKGMscix6LHZzKSA9PiB7fVxuXG4gICAgICAgIC8qKiBBIGZ1bmN0aW9uIHJldHVybmluZyB0aGUgc2l6ZSBvZiBhIGNlbGwsIHdpdGhpbiBbMCwxXTpcbiAgICAgICAgICogIC0gMCwgbm90aGluZyBzaG93blxuICAgICAgICAgKiAgLSAxLCBlbnRpcmUgc3F1YXJlXG4gICAgICAgICAgKiBAdHlwZSB7ZnVuY3Rpb24oaW1wb3J0KCcuLi9EYXRhc2V0LmpzJykuQ2VsbCxudW1iZXIsIG51bWJlcixvYmplY3QpOm51bWJlcn0gKi9cbiAgICAgICAgdGhpcy5zaXplID0gb3B0cy5zaXplIHx8ICgoY2VsbCwgcmVzb2x1dGlvbikgPT4gcmVzb2x1dGlvbikgLy8oYyxyLHosdnMpID0+IHt9XG5cbiAgICAgICAgLyoqIEEgZnVuY3Rpb24gcmV0dXJuaW5nIHRoZSBzaGFwZS5cbiAgICAgICAgICogQHR5cGUge2Z1bmN0aW9uKGltcG9ydChcIi4uL0RhdGFzZXRcIikuQ2VsbCk6c3RyaW5nfSAqL1xuICAgICAgICB0aGlzLnNoYXBlID0gb3B0cy5zaGFwZSB8fCAoKCkgPT4gJ28nKVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtBcnJheS48aW1wb3J0KFwiLi4vRGF0YXNldFwiKS5DZWxsPn0gY2VsbHNcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gcmVzb2x1dGlvblxuICAgICAqIEBwYXJhbSB7aW1wb3J0KFwiLi4vR2VvQ2FudmFzXCIpLkdlb0NhbnZhc30gZ2VvQ2FudmFzXG4gICAgICovXG4gICAgZHJhdyhjZWxscywgZ2VvQ2FudmFzLCByZXNvbHV0aW9uKSB7XG4gICAgICAgIC8vZmlsdGVyXG4gICAgICAgIGlmICh0aGlzLmZpbHRlcikgY2VsbHMgPSBjZWxscy5maWx0ZXIodGhpcy5maWx0ZXIpXG5cbiAgICAgICAgLy9cbiAgICAgICAgY29uc3QgeiA9IGdlb0NhbnZhcy52aWV3LnpcblxuICAgICAgICAvL2dldCB2aWV3IHNjYWxlXG4gICAgICAgIGNvbnN0IHZpZXdTY2FsZSA9IHRoaXMudmlld1NjYWxlID8gdGhpcy52aWV3U2NhbGUoY2VsbHMsIHJlc29sdXRpb24sIHopIDogdW5kZWZpbmVkXG5cbiAgICAgICAgY29uc3QgcjIgPSByZXNvbHV0aW9uICogMC41XG4gICAgICAgIGZvciAobGV0IGNlbGwgb2YgY2VsbHMpIHtcbiAgICAgICAgICAgIC8vY29sb3JcbiAgICAgICAgICAgIGNvbnN0IGNvbCA9IHRoaXMuY29sb3IgPyB0aGlzLmNvbG9yKGNlbGwsIHJlc29sdXRpb24sIHosIHZpZXdTY2FsZSkgOiB1bmRlZmluZWRcbiAgICAgICAgICAgIGlmICghY29sIHx8IGNvbCA9PT0gJ25vbmUnKSBjb250aW51ZVxuICAgICAgICAgICAgZ2VvQ2FudmFzLmN0eC5maWxsU3R5bGUgPSBjb2xcblxuICAgICAgICAgICAgLy9zaXplIC0gaW4gZ2VvIHVuaXRcbiAgICAgICAgICAgIGxldCBrID0gdGhpcy5zaXplKGNlbGwsIHJlc29sdXRpb24sIHosIHZpZXdTY2FsZSlcbiAgICAgICAgICAgIGsgPSBrIDwgMCA/IDAgOiBrID4gMSA/IDEgOiBrXG4gICAgICAgICAgICBjb25zdCBzRzIgPSBrICogcjJcblxuICAgICAgICAgICAgLy9zaGFwZVxuICAgICAgICAgICAgY29uc3Qgc2hhcGUgPSB0aGlzLnNoYXBlID8gdGhpcy5zaGFwZShjZWxsKSA6ICdvJ1xuICAgICAgICAgICAgaWYgKHNoYXBlID09PSAnbm9uZScpIGNvbnRpbnVlXG5cbiAgICAgICAgICAgIC8vZ2V0IG9mZnNldFxuICAgICAgICAgICAgLy9UT0RPIHVzZVxuICAgICAgICAgICAgLy9jb25zdCBvZmZzZXQgPSB0aGlzLm9mZnNldChjZWxsLCByLCB6KVxuXG4gICAgICAgICAgICAvL2NlbnRlciBwb3NpdGlvblxuICAgICAgICAgICAgY29uc3QgY3ggPSBjZWxsLnggKyByMlxuICAgICAgICAgICAgY29uc3QgY3kgPSBjZWxsLnkgKyByMlxuXG4gICAgICAgICAgICBpZiAoc2hhcGUgPT09ICdwJykge1xuICAgICAgICAgICAgICAgIGdlb0NhbnZhcy5jdHguYmVnaW5QYXRoKClcbiAgICAgICAgICAgICAgICBnZW9DYW52YXMuY3R4Lm1vdmVUbyhjeCwgY3kgKyByMilcbiAgICAgICAgICAgICAgICBnZW9DYW52YXMuY3R4LmxpbmVUbyhjeCArIHNHMiwgY3kgKyBzRzIpXG4gICAgICAgICAgICAgICAgZ2VvQ2FudmFzLmN0eC5saW5lVG8oY3ggKyByMiwgY3kpXG4gICAgICAgICAgICAgICAgZ2VvQ2FudmFzLmN0eC5saW5lVG8oY3ggKyBzRzIsIGN5IC0gc0cyKVxuICAgICAgICAgICAgICAgIGdlb0NhbnZhcy5jdHgubGluZVRvKGN4LCBjeSAtIHIyKVxuICAgICAgICAgICAgICAgIGdlb0NhbnZhcy5jdHgubGluZVRvKGN4IC0gc0cyLCBjeSAtIHNHMilcbiAgICAgICAgICAgICAgICBnZW9DYW52YXMuY3R4LmxpbmVUbyhjeCAtIHIyLCBjeSlcbiAgICAgICAgICAgICAgICBnZW9DYW52YXMuY3R4LmxpbmVUbyhjeCAtIHNHMiwgY3kgKyBzRzIpXG4gICAgICAgICAgICAgICAgZ2VvQ2FudmFzLmN0eC5maWxsKClcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc2hhcGUgPT09ICdvJykge1xuICAgICAgICAgICAgICAgIGdlb0NhbnZhcy5jdHguYmVnaW5QYXRoKClcbiAgICAgICAgICAgICAgICBnZW9DYW52YXMuY3R4Lm1vdmVUbyhjeCwgY3kgKyBzRzIpXG4gICAgICAgICAgICAgICAgZ2VvQ2FudmFzLmN0eC5saW5lVG8oY3ggKyByMiwgY3kgKyByMilcbiAgICAgICAgICAgICAgICBnZW9DYW52YXMuY3R4LmxpbmVUbyhjeCArIHNHMiwgY3kpXG4gICAgICAgICAgICAgICAgZ2VvQ2FudmFzLmN0eC5saW5lVG8oY3ggKyByMiwgY3kgLSByMilcbiAgICAgICAgICAgICAgICBnZW9DYW52YXMuY3R4LmxpbmVUbyhjeCwgY3kgLSBzRzIpXG4gICAgICAgICAgICAgICAgZ2VvQ2FudmFzLmN0eC5saW5lVG8oY3ggLSByMiwgY3kgLSByMilcbiAgICAgICAgICAgICAgICBnZW9DYW52YXMuY3R4LmxpbmVUbyhjeCAtIHNHMiwgY3kpXG4gICAgICAgICAgICAgICAgZ2VvQ2FudmFzLmN0eC5saW5lVG8oY3ggLSByMiwgY3kgKyByMilcbiAgICAgICAgICAgICAgICBnZW9DYW52YXMuY3R4LmZpbGwoKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuZXhwZWN0ZWQgc2hhcGU6JyArIHNoYXBlKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy91cGRhdGUgbGVnZW5kc1xuICAgICAgICB0aGlzLnVwZGF0ZUxlZ2VuZHMoeyBzdHlsZTogdGhpcywgcjogcmVzb2x1dGlvbiwgejogeiwgdmlld1NjYWxlOiB2aWV3U2NhbGUgfSlcbiAgICB9XG59XG4iLCIvL0B0cy1jaGVja1xuJ3VzZSBzdHJpY3QnXG5cbmltcG9ydCB7IFN0eWxlIH0gZnJvbSAnLi4vU3R5bGUuanMnXG5cbi8qKlxuICogQGF1dGhvciBKdWxpZW4gR2FmZnVyaVxuICovXG5leHBvcnQgY2xhc3MgUGlsbGFyU3R5bGUgZXh0ZW5kcyBTdHlsZSB7XG4gICAgLy9UT0RPIG1ha2UgYSB3ZWJHTCB2ZXJzaW9uID9cblxuICAgIC8qKiBAcGFyYW0ge29iamVjdH0gb3B0cyAqL1xuICAgIGNvbnN0cnVjdG9yKG9wdHMpIHtcbiAgICAgICAgc3VwZXIob3B0cylcbiAgICAgICAgb3B0cyA9IG9wdHMgfHwge31cblxuICAgICAgICAvKiogQHR5cGUge3N0cmluZ30gKi9cbiAgICAgICAgdGhpcy5oZWlnaHRDb2wgPSBvcHRzLmhlaWdodENvbFxuXG4gICAgICAgIC8qKiBBIGZ1bmN0aW9uIHJldHVybmluZyB0aGUgaGVpZ2h0IG9mIHRoZSBsaW5lIHJlcHJlc2VudGluZyBhIGNlbGwsIGluIGdlbyB1bml0XG4gICAgICAgICAqIEB0eXBlIHtmdW5jdGlvbihudW1iZXIsbnVtYmVyLGltcG9ydChcIi4uL1N0eWxlXCIpLlN0YXR8dW5kZWZpbmVkLG51bWJlcik6bnVtYmVyfSAqL1xuICAgICAgICB0aGlzLmhlaWdodCA9IG9wdHMuaGVpZ2h0XG5cbiAgICAgICAgLyoqIEB0eXBlIHtzdHJpbmd9ICovXG4gICAgICAgIHRoaXMuY29sb3JDb2wgPSBvcHRzLmNvbG9yQ29sXG5cbiAgICAgICAgLyoqIEEgZnVuY3Rpb24gcmV0dXJuaW5nIHRoZSBjb2xvciBvZiB0aGUgbGluZSByZXByZXNlbnRpbmcgYSBjZWxsLlxuICAgICAgICAgKiBAdHlwZSB7ZnVuY3Rpb24obnVtYmVyLG51bWJlcixpbXBvcnQoXCIuLi9TdHlsZVwiKS5TdGF0fHVuZGVmaW5lZCk6c3RyaW5nfSAqL1xuICAgICAgICB0aGlzLmNvbG9yID0gb3B0cy5jb2xvciB8fCAoKCkgPT4gJyNjMDhjNTknKSAvL2JiXG5cbiAgICAgICAgLyoqIEB0eXBlIHtzdHJpbmd9ICovXG4gICAgICAgIHRoaXMud2lkdGhDb2wgPSBvcHRzLndpZHRoQ29sXG5cbiAgICAgICAgLyoqIEEgZnVuY3Rpb24gcmV0dXJuaW5nIHRoZSB3aWR0aCBvZiB0aGUgbGluZSByZXByZXNlbnRpbmcgYSBjZWxsLCBpbiBnZW8gdW5pdFxuICAgICAgICAgKiBAdHlwZSB7ZnVuY3Rpb24obnVtYmVyLG51bWJlcixpbXBvcnQoXCIuLi9TdHlsZVwiKS5TdGF0fHVuZGVmaW5lZCxudW1iZXIpOm51bWJlcn0gKi9cbiAgICAgICAgdGhpcy53aWR0aCA9IG9wdHMud2lkdGggfHwgKCh2LCByKSA9PiAwLjUgKiByKVxuXG4gICAgICAgIC8qKiBAdHlwZSB7Ym9vbGVhbn0gKi9cbiAgICAgICAgdGhpcy5zaW1wbGUgPSBvcHRzLnNpbXBsZSA9PSB0cnVlXG5cbiAgICAgICAgLyoqIEB0eXBlIHtudW1iZXJ9ICovXG4gICAgICAgIHRoaXMudmlld0hlaWdodEZhY3RvciA9IG9wdHMudmlld0hlaWdodEZhY3RvciB8fCAxLjVcbiAgICAgICAgLy8wLDAgaXMgdGhlIGNlbnRlclxuICAgICAgICAvKiogQHR5cGUge251bWJlcn0gKi9cbiAgICAgICAgdGhpcy52aWV3U1ggPSBvcHRzLnZpZXdTWCA9PSB1bmRlZmluZWQgPyAwIDogb3B0cy52aWV3U1hcbiAgICAgICAgLyoqIEB0eXBlIHtudW1iZXJ9ICovXG4gICAgICAgIHRoaXMudmlld1NZID0gb3B0cy52aWV3U1kgPT0gdW5kZWZpbmVkID8gLTAuNSA6IG9wdHMudmlld1NZXG5cbiAgICAgICAgLy9UT0RPIHJlcGxhY2Ugd2l0aCBzdW4gbG9jYXRpb24gP1xuICAgICAgICAvKiogQHR5cGUge251bWJlcn0gKi9cbiAgICAgICAgdGhpcy5zaGFkb3dEaXJlY3Rpb24gPVxuICAgICAgICAgICAgb3B0cy5zaGFkb3dEaXJlY3Rpb24gPT0gdW5kZWZpbmVkID8gKC00MC4zICogTWF0aC5QSSkgLyAxODAuMCA6IG9wdHMuc2hhZG93RGlyZWN0aW9uXG4gICAgICAgIC8qKiBAdHlwZSB7bnVtYmVyfSAqL1xuICAgICAgICB0aGlzLnNoYWRvd0ZhY3RvciA9IG9wdHMuc2hhZG93RmFjdG9yIHx8IDAuM1xuICAgICAgICAvKiogQHR5cGUge3N0cmluZ30gKi9cbiAgICAgICAgdGhpcy5zaGFkb3dDb2xvciA9IG9wdHMuc2hhZG93Q29sb3IgfHwgJyMwMDAwMDAzMydcblxuICAgICAgICAvKiogQHR5cGUge3N0cmluZ30gKi9cbiAgICAgICAgdGhpcy5vdXRsaW5lQ29sID0gb3B0cy5vdXRsaW5lQ29sIHx8ICcjRkZGRkZGJ1xuICAgICAgICAvKiogQHR5cGUge251bWJlcn0gKi9cbiAgICAgICAgdGhpcy5vdXRsaW5lV2lkdGhQaXggPSBvcHRzLm91dGxpbmVXaWR0aFBpeCA9PSB1bmRlZmluZWQgPyAwLjUgOiBvcHRzLm91dGxpbmVXaWR0aFBpeFxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERyYXcgY2VsbHMgYXMgc2VnbWVudHMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0FycmF5LjxpbXBvcnQoXCIuLi9EYXRhc2V0XCIpLkNlbGw+fSBjZWxsc1xuICAgICAqIEBwYXJhbSB7aW1wb3J0KFwiLi4vR2VvQ2FudmFzXCIpLkdlb0NhbnZhc30gZ2VvQ2FudmFzXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHJlc29sdXRpb25cbiAgICAgKi9cbiAgICBkcmF3KGNlbGxzLCBnZW9DYW52YXMsIHJlc29sdXRpb24pIHtcbiAgICAgICAgLy9maWx0ZXJcbiAgICAgICAgaWYgKHRoaXMuZmlsdGVyKSBjZWxscyA9IGNlbGxzLmZpbHRlcih0aGlzLmZpbHRlcilcblxuICAgICAgICAvL1xuICAgICAgICBjb25zdCB6ID0gZ2VvQ2FudmFzLnZpZXcuelxuXG4gICAgICAgIGxldCBzdGF0SGVpZ2h0XG4gICAgICAgIGlmICh0aGlzLmhlaWdodENvbCkge1xuICAgICAgICAgICAgLy9jb21wdXRlIHNpemUgdmFyaWFibGUgc3RhdGlzdGljc1xuICAgICAgICAgICAgc3RhdEhlaWdodCA9IFN0eWxlLmdldFN0YXRpc3RpY3MoY2VsbHMsIChjKSA9PiBjW3RoaXMuaGVpZ2h0Q29sXSwgdHJ1ZSlcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBzdGF0Q29sb3JcbiAgICAgICAgaWYgKHRoaXMuY29sb3JDb2wpIHtcbiAgICAgICAgICAgIC8vY29tcHV0ZSBjb2xvciB2YXJpYWJsZSBzdGF0aXN0aWNzXG4gICAgICAgICAgICBzdGF0Q29sb3IgPSBTdHlsZS5nZXRTdGF0aXN0aWNzKGNlbGxzLCAoYykgPT4gY1t0aGlzLmNvbG9yQ29sXSwgdHJ1ZSlcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBzdGF0V2lkdGhcbiAgICAgICAgaWYgKHRoaXMud2lkdGhDb2wpIHtcbiAgICAgICAgICAgIC8vYW5kIGNvbXB1dGUgc2l6ZSB2YXJpYWJsZSBzdGF0aXN0aWNzXG4gICAgICAgICAgICBzdGF0V2lkdGggPSBTdHlsZS5nZXRTdGF0aXN0aWNzKGNlbGxzLCAoYykgPT4gY1t0aGlzLndpZHRoQ29sXSwgdHJ1ZSlcbiAgICAgICAgfVxuXG4gICAgICAgIC8vZ2V0IHZpZXcgY2VudGVyIGdlbyBwb3NpdGlvblxuICAgICAgICBjb25zdCBjdnggPSBnZW9DYW52YXMudmlldy54ICsgdGhpcy52aWV3U1ggKiBnZW9DYW52YXMudyAqIHpcbiAgICAgICAgY29uc3QgY3Z5ID0gZ2VvQ2FudmFzLnZpZXcueSArIHRoaXMudmlld1NZICogZ2VvQ2FudmFzLmggKiB6XG4gICAgICAgIC8vZ2V0IHZpZXcgaGVpZ2h0XG4gICAgICAgIGNvbnN0IEggPSB0aGlzLnZpZXdIZWlnaHRGYWN0b3IgKiAoZ2VvQ2FudmFzLncgKyBnZW9DYW52YXMuaCkgKiAwLjUgKiB6XG5cbiAgICAgICAgLy9zb3J0IGNlbGxzIGJ5IHkgYW5kIHhcbiAgICAgICAgLy9jb25zdCBkaXN0VG9WaWV3Q2VudGVyID0gKGMpID0+IHsgY29uc3QgZHggPSBjdnggLSBjLngsIGR5ID0gY3Z5IC0gYy55OyByZXR1cm4gTWF0aC5zcXJ0KGR4ICogZHggKyBkeSAqIGR5KSB9XG4gICAgICAgIGNlbGxzLnNvcnQoKGMxLCBjMikgPT4gMTAwMDAwMDAwICogKGMyLnkgLSBjMS55KSArIGMxLnggLSBjMi54KVxuXG4gICAgICAgIGdlb0NhbnZhcy5jdHgubGluZUNhcCA9IHRoaXMuc2ltcGxlID8gJ2J1dHQnIDogJ3JvdW5kJ1xuXG4gICAgICAgIC8vZHJhdyBzaGFkb3dzXG4gICAgICAgIGdlb0NhbnZhcy5jdHguc3Ryb2tlU3R5bGUgPSB0aGlzLnNoYWRvd0NvbG9yXG4gICAgICAgIGdlb0NhbnZhcy5jdHguZmlsbFN0eWxlID0gdGhpcy5zaGFkb3dDb2xvclxuICAgICAgICBmb3IgKGxldCBjIG9mIGNlbGxzKSB7XG4gICAgICAgICAgICAvL3dpZHRoXG4gICAgICAgICAgICAvKiogQHR5cGUge251bWJlcnx1bmRlZmluZWR9ICovXG4gICAgICAgICAgICBjb25zdCB3RyA9IHRoaXMud2lkdGggPyB0aGlzLndpZHRoKGNbdGhpcy53aWR0aENvbF0sIHJlc29sdXRpb24sIHN0YXRXaWR0aCwgeikgOiB1bmRlZmluZWRcbiAgICAgICAgICAgIGlmICghd0cgfHwgd0cgPCAwKSBjb250aW51ZVxuXG4gICAgICAgICAgICAvL2hlaWdodFxuICAgICAgICAgICAgLyoqIEB0eXBlIHtudW1iZXJ8dW5kZWZpbmVkfSAqL1xuICAgICAgICAgICAgY29uc3QgaEcgPSB0aGlzLmhlaWdodCA/IHRoaXMuaGVpZ2h0KGNbdGhpcy5oZWlnaHRDb2xdLCByZXNvbHV0aW9uLCBzdGF0SGVpZ2h0LCB6KSA6IHVuZGVmaW5lZFxuICAgICAgICAgICAgaWYgKCFoRyB8fCBoRyA8IDApIGNvbnRpbnVlXG5cbiAgICAgICAgICAgIC8vZ2V0IG9mZnNldFxuICAgICAgICAgICAgLy9UT0RPIHVzZSB0aGF0XG4gICAgICAgICAgICBjb25zdCBvZmZzZXQgPSB0aGlzLm9mZnNldChjLCByZXNvbHV0aW9uLCB6KVxuXG4gICAgICAgICAgICAvL3NldCB3aWR0aFxuICAgICAgICAgICAgZ2VvQ2FudmFzLmN0eC5saW5lV2lkdGggPSB3R1xuXG4gICAgICAgICAgICAvL2NvbXB1dGUgY2VsbCBjZW50cmUgcG9zdGl0aW9uXG4gICAgICAgICAgICBjb25zdCBjeCA9IGMueCArIHJlc29sdXRpb24gLyAyXG4gICAgICAgICAgICBjb25zdCBjeSA9IGMueSArIHJlc29sdXRpb24gLyAyXG4gICAgICAgICAgICBjb25zdCBscyA9IGhHICogdGhpcy5zaGFkb3dGYWN0b3JcblxuICAgICAgICAgICAgLy9kcmF3IHNlZ21lbnRcbiAgICAgICAgICAgIGdlb0NhbnZhcy5jdHguYmVnaW5QYXRoKClcbiAgICAgICAgICAgIGdlb0NhbnZhcy5jdHgubW92ZVRvKGN4LCBjeSlcbiAgICAgICAgICAgIGdlb0NhbnZhcy5jdHgubGluZVRvKGN4ICsgbHMgKiBNYXRoLmNvcyh0aGlzLnNoYWRvd0RpcmVjdGlvbiksIGN5ICsgbHMgKiBNYXRoLnNpbih0aGlzLnNoYWRvd0RpcmVjdGlvbikpXG4gICAgICAgICAgICBnZW9DYW52YXMuY3R4LnN0cm9rZSgpXG5cbiAgICAgICAgICAgIC8qXG4gICAgICAgICAgICBpZiAodGhpcy5zaW1wbGUpIHtcbiAgICAgICAgICAgICAgICAvL2RyYXcgYmFzZSBjaXJjbGVcbiAgICAgICAgICAgICAgICBjZy5jdHguYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICAgICAgY2cuY3R4LmFyYyhcbiAgICAgICAgICAgICAgICAgICAgY3gsIGN5LFxuICAgICAgICAgICAgICAgICAgICB3RyAqIDAuNSxcbiAgICAgICAgICAgICAgICAgICAgMCwgMiAqIE1hdGguUEksIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAvL2NnLmN0eC5zdHJva2UoKTtcbiAgICAgICAgICAgICAgICBjZy5jdHguZmlsbCgpO1xuICAgICAgICAgICAgfSovXG4gICAgICAgIH1cblxuICAgICAgICAvL2RyYXcgcGlsbGFyc1xuICAgICAgICBmb3IgKGxldCBjIG9mIGNlbGxzKSB7XG4gICAgICAgICAgICAvL2NvbG9yXG4gICAgICAgICAgICAvKiogQHR5cGUge3N0cmluZ3x1bmRlZmluZWR9ICovXG4gICAgICAgICAgICBjb25zdCBjb2wgPSB0aGlzLmNvbG9yID8gdGhpcy5jb2xvcihjW3RoaXMuY29sb3JDb2xdLCByZXNvbHV0aW9uLCBzdGF0Q29sb3IpIDogdW5kZWZpbmVkXG4gICAgICAgICAgICBpZiAoIWNvbCkgY29udGludWVcblxuICAgICAgICAgICAgLy93aWR0aFxuICAgICAgICAgICAgLyoqIEB0eXBlIHtudW1iZXJ8dW5kZWZpbmVkfSAqL1xuICAgICAgICAgICAgY29uc3Qgd0cgPSB0aGlzLndpZHRoID8gdGhpcy53aWR0aChjW3RoaXMud2lkdGhDb2xdLCByZXNvbHV0aW9uLCBzdGF0V2lkdGgsIHopIDogdW5kZWZpbmVkXG4gICAgICAgICAgICBpZiAoIXdHIHx8IHdHIDwgMCkgY29udGludWVcblxuICAgICAgICAgICAgLy9oZWlnaHRcbiAgICAgICAgICAgIC8qKiBAdHlwZSB7bnVtYmVyfHVuZGVmaW5lZH0gKi9cbiAgICAgICAgICAgIGNvbnN0IGhHID0gdGhpcy5oZWlnaHQgPyB0aGlzLmhlaWdodChjW3RoaXMuaGVpZ2h0Q29sXSwgcmVzb2x1dGlvbiwgc3RhdEhlaWdodCwgeikgOiB1bmRlZmluZWRcbiAgICAgICAgICAgIGlmICghaEcgfHwgaEcgPCAwKSBjb250aW51ZVxuXG4gICAgICAgICAgICAvL2dldCBvZmZzZXRcbiAgICAgICAgICAgIC8vVE9ETyB1c2UgdGhhdFxuICAgICAgICAgICAgY29uc3Qgb2Zmc2V0ID0gdGhpcy5vZmZzZXQoYywgcmVzb2x1dGlvbiwgeilcblxuICAgICAgICAgICAgLy9jb21wdXRlIGNlbGwgY2VudHJlIHBvc3RpdGlvblxuICAgICAgICAgICAgY29uc3QgY3ggPSBjLnggKyByZXNvbHV0aW9uIC8gMlxuICAgICAgICAgICAgY29uc3QgY3kgPSBjLnkgKyByZXNvbHV0aW9uIC8gMlxuXG4gICAgICAgICAgICAvL2NvbXB1dGUgYW5nbGVcbiAgICAgICAgICAgIGNvbnN0IGR4ID0gY3ggLSBjdngsXG4gICAgICAgICAgICAgICAgZHkgPSBjeSAtIGN2eVxuICAgICAgICAgICAgY29uc3QgYSA9IE1hdGguYXRhbjIoZHksIGR4KVxuICAgICAgICAgICAgY29uc3QgRCA9IE1hdGguc3FydChkeCAqIGR4ICsgZHkgKiBkeSlcbiAgICAgICAgICAgIGNvbnN0IGQgPSAoRCAqIGhHKSAvIChIIC0gaEcpXG5cbiAgICAgICAgICAgIGlmICh0aGlzLnNpbXBsZSkge1xuICAgICAgICAgICAgICAgIC8vZHJhdyBzZWdtZW50XG4gICAgICAgICAgICAgICAgZ2VvQ2FudmFzLmN0eC5zdHJva2VTdHlsZSA9IGNvbFxuICAgICAgICAgICAgICAgIGdlb0NhbnZhcy5jdHgubGluZVdpZHRoID0gd0dcbiAgICAgICAgICAgICAgICBnZW9DYW52YXMuY3R4LmJlZ2luUGF0aCgpXG4gICAgICAgICAgICAgICAgZ2VvQ2FudmFzLmN0eC5tb3ZlVG8oY3gsIGN5KVxuICAgICAgICAgICAgICAgIGdlb0NhbnZhcy5jdHgubGluZVRvKGN4ICsgZCAqIE1hdGguY29zKGEpLCBjeSArIGQgKiBNYXRoLnNpbihhKSlcbiAgICAgICAgICAgICAgICBnZW9DYW52YXMuY3R4LnN0cm9rZSgpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vZHJhdyBiYWNrZ3JvdW5kIHNlZ21lbnRcbiAgICAgICAgICAgICAgICBnZW9DYW52YXMuY3R4LnN0cm9rZVN0eWxlID0gdGhpcy5vdXRsaW5lQ29sXG4gICAgICAgICAgICAgICAgZ2VvQ2FudmFzLmN0eC5saW5lV2lkdGggPSB3RyArIDIgKiB0aGlzLm91dGxpbmVXaWR0aFBpeCAqIHpcbiAgICAgICAgICAgICAgICBnZW9DYW52YXMuY3R4LmJlZ2luUGF0aCgpXG4gICAgICAgICAgICAgICAgZ2VvQ2FudmFzLmN0eC5tb3ZlVG8oY3gsIGN5KVxuICAgICAgICAgICAgICAgIGdlb0NhbnZhcy5jdHgubGluZVRvKGN4ICsgZCAqIE1hdGguY29zKGEpLCBjeSArIGQgKiBNYXRoLnNpbihhKSlcbiAgICAgICAgICAgICAgICBnZW9DYW52YXMuY3R4LnN0cm9rZSgpXG5cbiAgICAgICAgICAgICAgICAvL2RyYXcgc2VnbWVudFxuICAgICAgICAgICAgICAgIGdlb0NhbnZhcy5jdHguc3Ryb2tlU3R5bGUgPSBjb2xcbiAgICAgICAgICAgICAgICBnZW9DYW52YXMuY3R4LmxpbmVXaWR0aCA9IHdHXG4gICAgICAgICAgICAgICAgZ2VvQ2FudmFzLmN0eC5iZWdpblBhdGgoKVxuICAgICAgICAgICAgICAgIGdlb0NhbnZhcy5jdHgubW92ZVRvKGN4LCBjeSlcbiAgICAgICAgICAgICAgICBnZW9DYW52YXMuY3R4LmxpbmVUbyhjeCArIGQgKiBNYXRoLmNvcyhhKSwgY3kgKyBkICogTWF0aC5zaW4oYSkpXG4gICAgICAgICAgICAgICAgZ2VvQ2FudmFzLmN0eC5zdHJva2UoKVxuXG4gICAgICAgICAgICAgICAgLy9kcmF3IHRvcCBjaXJjbGVcbiAgICAgICAgICAgICAgICBnZW9DYW52YXMuY3R4LnN0cm9rZVN0eWxlID0gdGhpcy5vdXRsaW5lQ29sXG4gICAgICAgICAgICAgICAgLy9jZy5jdHguZmlsbFN0eWxlID0gXCIjYzA4YzU5XCJcbiAgICAgICAgICAgICAgICBnZW9DYW52YXMuY3R4LmxpbmVXaWR0aCA9IHRoaXMub3V0bGluZVdpZHRoUGl4ICogelxuICAgICAgICAgICAgICAgIGdlb0NhbnZhcy5jdHguYmVnaW5QYXRoKClcbiAgICAgICAgICAgICAgICBnZW9DYW52YXMuY3R4LmFyYyhjeCArIGQgKiBNYXRoLmNvcyhhKSwgY3kgKyBkICogTWF0aC5zaW4oYSksIHdHICogMC41LCAwLCAyICogTWF0aC5QSSwgZmFsc2UpXG4gICAgICAgICAgICAgICAgZ2VvQ2FudmFzLmN0eC5zdHJva2UoKVxuICAgICAgICAgICAgICAgIC8vY2cuY3R4LmZpbGwoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vaW4gY2FzZS4uLlxuICAgICAgICBnZW9DYW52YXMuY3R4LmxpbmVDYXAgPSAnYnV0dCdcblxuICAgICAgICAvL3VwZGF0ZSBsZWdlbmRzXG4gICAgICAgIHRoaXMudXBkYXRlTGVnZW5kcyh7IHN0eWxlOiB0aGlzLCByOiByZXNvbHV0aW9uLCB6OiB6LCBzQ29sb3I6IHN0YXRDb2xvciB9KVxuICAgIH1cbn1cbiIsIi8vQHRzLWNoZWNrXG4ndXNlIHN0cmljdCdcblxuaW1wb3J0IHsgU3R5bGUgfSBmcm9tICcuLi9TdHlsZS5qcydcblxuLyoqXG4gKiBBIHN0eWxlIHdoZXJlIGVhY2ggY2VsbCBpcyByZXByZXNlbnRlZCBieSBhIHNlZ21lbnQgd2hvc2UgbGVuZ3RoLCB3aWR0aCwgY29sb3IgYW5kIG9yaWVudGF0aW9uIGNhbiB2YXJ5IGFjY29yZGluZyB0byBzdGF0aXN0aWNhbCB2YWx1ZXMuXG4gKlxuICogQGF1dGhvciBKdWxpZW4gR2FmZnVyaVxuICovXG5leHBvcnQgY2xhc3MgU2VnbWVudFN0eWxlIGV4dGVuZHMgU3R5bGUge1xuICAgIC8qKiBAcGFyYW0ge29iamVjdH0gb3B0cyAqL1xuICAgIGNvbnN0cnVjdG9yKG9wdHMpIHtcbiAgICAgICAgc3VwZXIob3B0cylcbiAgICAgICAgb3B0cyA9IG9wdHMgfHwge31cblxuICAgICAgICAvKiogQSBmdW5jdGlvbiByZXR1cm5pbmcgdGhlIG9yaWVudGF0aW9uIChpbiBkZWdyZWVzKSBvZiB0aGUgc2VnbWVudCByZXByZXNlbnRpbmcgYSBjZWxsLlxuICAgICAgICAgKiBAdHlwZSB7ZnVuY3Rpb24oaW1wb3J0KFwiLi4vRGF0YXNldFwiKS5DZWxsKTpudW1iZXJ9ICovXG4gICAgICAgIHRoaXMub3JpZW50YXRpb24gPSBvcHRzLm9yaWVudGF0aW9uIHx8ICgoKSA9PiAwKVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAdHlwZSB7c3RyaW5nfSAqL1xuICAgICAgICB0aGlzLmNvbG9yQ29sID0gb3B0cy5jb2xvckNvbFxuXG4gICAgICAgIC8qKiBBIGZ1bmN0aW9uIHJldHVybmluZyB0aGUgY29sb3Igb2YgdGhlIGNlbGwgc2VnbWVudC5cbiAgICAgICAgICogQHR5cGUge2Z1bmN0aW9uKG51bWJlcixudW1iZXIsaW1wb3J0KFwiLi4vU3R5bGVcIikuU3RhdHx1bmRlZmluZWQpOnN0cmluZ30gKi9cbiAgICAgICAgdGhpcy5jb2xvciA9IG9wdHMuY29sb3IgfHwgKCgpID0+ICcjRUE2QkFDJylcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHR5cGUge3N0cmluZ30gKi9cbiAgICAgICAgdGhpcy5sZW5ndGhDb2wgPSBvcHRzLmxlbmd0aENvbFxuXG4gICAgICAgIC8qKiBBIGZ1bmN0aW9uIHJldHVybmluZyB0aGUgbGVuZ3RoIG9mIHRoZSBzZWdtZW50IHJlcHJlc2VudGluZyBhIGNlbGwsIGluIGdlbyB1bml0XG4gICAgICAgICAqIEB0eXBlIHtmdW5jdGlvbihudW1iZXIsbnVtYmVyLGltcG9ydChcIi4uL1N0eWxlXCIpLlN0YXR8dW5kZWZpbmVkLG51bWJlcik6bnVtYmVyfSAqL1xuICAgICAgICB0aGlzLmxlbmd0aCA9IG9wdHMubGVuZ3RoXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEB0eXBlIHtzdHJpbmd9ICovXG4gICAgICAgIHRoaXMud2lkdGhDb2wgPSBvcHRzLndpZHRoQ29sXG5cbiAgICAgICAgLyoqIEEgZnVuY3Rpb24gcmV0dXJuaW5nIHRoZSB3aWR0aCBvZiB0aGUgc2VnbWVudCByZXByZXNlbnRpbmcgYSBjZWxsLCBpbiBnZW8gdW5pdFxuICAgICAgICAgKiBAdHlwZSB7ZnVuY3Rpb24obnVtYmVyLG51bWJlcixpbXBvcnQoXCIuLi9TdHlsZVwiKS5TdGF0fHVuZGVmaW5lZCxudW1iZXIpOm51bWJlcn0gKi9cbiAgICAgICAgdGhpcy53aWR0aCA9IG9wdHMud2lkdGhcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEcmF3IGNlbGxzIGFzIHNlZ21lbnRzLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtBcnJheS48aW1wb3J0KFwiLi4vRGF0YXNldFwiKS5DZWxsPn0gY2VsbHNcbiAgICAgKiBAcGFyYW0ge2ltcG9ydChcIi4uL0dlb0NhbnZhc1wiKS5HZW9DYW52YXN9IGdlb0NhbnZhc1xuICAgICAqIEBwYXJhbSB7bnVtYmVyfSByZXNvbHV0aW9uXG4gICAgICovXG4gICAgZHJhdyhjZWxscywgZ2VvQ2FudmFzLCByZXNvbHV0aW9uKSB7XG4gICAgICAgIC8vZmlsdGVyXG4gICAgICAgIGlmICh0aGlzLmZpbHRlcikgY2VsbHMgPSBjZWxscy5maWx0ZXIodGhpcy5maWx0ZXIpXG5cbiAgICAgICAgLy9cbiAgICAgICAgY29uc3QgeiA9IGdlb0NhbnZhcy52aWV3LnpcblxuICAgICAgICBsZXQgc3RhdENvbG9yXG4gICAgICAgIGlmICh0aGlzLmNvbG9yQ29sKSB7XG4gICAgICAgICAgICAvL2NvbXB1dGUgY29sb3IgdmFyaWFibGUgc3RhdGlzdGljc1xuICAgICAgICAgICAgc3RhdENvbG9yID0gU3R5bGUuZ2V0U3RhdGlzdGljcyhjZWxscywgKGMpID0+IGNbdGhpcy5jb2xvckNvbF0sIHRydWUpXG4gICAgICAgIH1cblxuICAgICAgICBsZXQgc3RhdExlbmd0aFxuICAgICAgICBpZiAodGhpcy5sZW5ndGhDb2wpIHtcbiAgICAgICAgICAgIC8vaWYgbGVuZ3RoIGlzIHVzZWQsIHNvcnQgY2VsbHMgYnkgbGVuZ3RoIHNvIHRoYXQgdGhlIGxvbmdlc3RzIGFyZSBkcmF3biBmaXJzdFxuICAgICAgICAgICAgY2VsbHMuc29ydCgoYzEsIGMyKSA9PiBjMlt0aGlzLmxlbmd0aENvbF0gLSBjMVt0aGlzLmxlbmd0aENvbF0pXG4gICAgICAgICAgICAvL2FuZCBjb21wdXRlIHNpemUgdmFyaWFibGUgc3RhdGlzdGljc1xuICAgICAgICAgICAgc3RhdExlbmd0aCA9IFN0eWxlLmdldFN0YXRpc3RpY3MoY2VsbHMsIChjKSA9PiBjW3RoaXMubGVuZ3RoQ29sXSwgdHJ1ZSlcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBzdGF0V2lkdGhcbiAgICAgICAgaWYgKHRoaXMud2lkdGhDb2wpIHtcbiAgICAgICAgICAgIC8vYW5kIGNvbXB1dGUgc2l6ZSB2YXJpYWJsZSBzdGF0aXN0aWNzXG4gICAgICAgICAgICBzdGF0V2lkdGggPSBTdHlsZS5nZXRTdGF0aXN0aWNzKGNlbGxzLCAoYykgPT4gY1t0aGlzLndpZHRoQ29sXSwgdHJ1ZSlcbiAgICAgICAgfVxuXG4gICAgICAgIC8vXG4gICAgICAgIGdlb0NhbnZhcy5jdHgubGluZUNhcCA9ICdidXR0J1xuXG4gICAgICAgIC8vY29udmVyc2lvbiBmYWN0b3IgZGVncmVlIC0+IHJhZGlhblxuICAgICAgICBjb25zdCBmID0gTWF0aC5QSSAvIDE4MFxuXG4gICAgICAgIGZvciAobGV0IGMgb2YgY2VsbHMpIHtcbiAgICAgICAgICAgIC8vY29sb3JcbiAgICAgICAgICAgIC8qKiBAdHlwZSB7c3RyaW5nfHVuZGVmaW5lZH0gKi9cbiAgICAgICAgICAgIGNvbnN0IGNvbCA9IHRoaXMuY29sb3IgPyB0aGlzLmNvbG9yKGNbdGhpcy5jb2xvckNvbF0sIHJlc29sdXRpb24sIHN0YXRDb2xvcikgOiB1bmRlZmluZWRcbiAgICAgICAgICAgIGlmICghY29sKSBjb250aW51ZVxuXG4gICAgICAgICAgICAvL3dpZHRoXG4gICAgICAgICAgICAvKiogQHR5cGUge251bWJlcnx1bmRlZmluZWR9ICovXG4gICAgICAgICAgICBjb25zdCB3RyA9IHRoaXMud2lkdGggPyB0aGlzLndpZHRoKGNbdGhpcy53aWR0aENvbF0sIHJlc29sdXRpb24sIHN0YXRXaWR0aCwgeikgOiB1bmRlZmluZWRcbiAgICAgICAgICAgIGlmICghd0cgfHwgd0cgPCAwKSBjb250aW51ZVxuXG4gICAgICAgICAgICAvL2xlbmd0aFxuICAgICAgICAgICAgLyoqIEB0eXBlIHtudW1iZXJ8dW5kZWZpbmVkfSAqL1xuICAgICAgICAgICAgY29uc3QgbEcgPSB0aGlzLmxlbmd0aCA/IHRoaXMubGVuZ3RoKGNbdGhpcy5sZW5ndGhDb2xdLCByZXNvbHV0aW9uLCBzdGF0TGVuZ3RoLCB6KSA6IHVuZGVmaW5lZFxuICAgICAgICAgICAgaWYgKCFsRyB8fCBsRyA8IDApIGNvbnRpbnVlXG5cbiAgICAgICAgICAgIC8vb3JpZW50YXRpb24gKGluIHJhZGlhbilcbiAgICAgICAgICAgIC8qKiBAdHlwZSB7bnVtYmVyfSAqL1xuICAgICAgICAgICAgY29uc3Qgb3IgPSB0aGlzLm9yaWVudGF0aW9uKGMpICogZlxuICAgICAgICAgICAgaWYgKG9yID09PSB1bmRlZmluZWQgfHwgaXNOYU4ob3IpKSBjb250aW51ZVxuXG4gICAgICAgICAgICAvL2dldCBvZmZzZXRcbiAgICAgICAgICAgIGNvbnN0IG9mZnNldCA9IHRoaXMub2Zmc2V0KGMsIHJlc29sdXRpb24sIHopXG5cbiAgICAgICAgICAgIC8vc2V0IGNvbG9yIGFuZCB3aWR0aFxuICAgICAgICAgICAgZ2VvQ2FudmFzLmN0eC5zdHJva2VTdHlsZSA9IGNvbFxuICAgICAgICAgICAgZ2VvQ2FudmFzLmN0eC5saW5lV2lkdGggPSB3R1xuXG4gICAgICAgICAgICAvL2NvbXB1dGUgc2VnbWVudCBjZW50cmUgcG9zdGl0aW9uXG4gICAgICAgICAgICBjb25zdCBjeCA9IGMueCArIHJlc29sdXRpb24gLyAyICsgb2Zmc2V0LmR4XG4gICAgICAgICAgICBjb25zdCBjeSA9IGMueSArIHJlc29sdXRpb24gLyAyICsgb2Zmc2V0LmR5XG5cbiAgICAgICAgICAgIC8vY29tcHV0ZSBzZWdtZW50IGRpcmVjdGlvblxuICAgICAgICAgICAgY29uc3QgZHggPSAwLjUgKiBNYXRoLmNvcyhvcikgKiBsR1xuICAgICAgICAgICAgY29uc3QgZHkgPSAwLjUgKiBNYXRoLnNpbihvcikgKiBsR1xuXG4gICAgICAgICAgICAvL2RyYXcgc2VnbWVudFxuICAgICAgICAgICAgZ2VvQ2FudmFzLmN0eC5iZWdpblBhdGgoKVxuICAgICAgICAgICAgZ2VvQ2FudmFzLmN0eC5tb3ZlVG8oY3ggLSBkeCwgY3kgLSBkeSlcbiAgICAgICAgICAgIGdlb0NhbnZhcy5jdHgubGluZVRvKGN4ICsgZHgsIGN5ICsgZHkpXG4gICAgICAgICAgICBnZW9DYW52YXMuY3R4LnN0cm9rZSgpXG4gICAgICAgIH1cblxuICAgICAgICAvL3VwZGF0ZSBsZWdlbmQsIGlmIGFueVxuICAgICAgICB0aGlzLnVwZGF0ZUxlZ2VuZHMoe1xuICAgICAgICAgICAgd2lkdGhGdW46IHRoaXMud2lkdGgsXG4gICAgICAgICAgICByOiByZXNvbHV0aW9uLFxuICAgICAgICAgICAgejogeixcbiAgICAgICAgICAgIHNDb2xvcjogc3RhdENvbG9yLFxuICAgICAgICAgICAgLy9zTGVuZ3RoOiBzdGF0TGVuZ3RoLFxuICAgICAgICAgICAgc1dpZHRoOiBzdGF0V2lkdGgsXG4gICAgICAgIH0pXG4gICAgfVxufVxuIiwiLy9AdHMtY2hlY2tcbid1c2Ugc3RyaWN0J1xuXG5pbXBvcnQgeyBTdHlsZSB9IGZyb20gJy4uL1N0eWxlLmpzJ1xuXG4vKipcbiAqIEEgdmVyeSBnZW5lcmljIHN0eWxlIHRoYXQgc2hvd3MgZ3JpZCBjZWxscyB3aXRoIHNwZWNpZmljIGNvbG9yLCBzaXplIGFuZCBzaGFwZS5cbiAqIEl0IGNhbiBiZSB1c2VkIHRvIHNob3cgdmFyaWFibGVzIGFzIGNlbGwgY29sb3JzLCBjZWxsIHNpemUsIGNlbGwgc2hhcGUsIG9yIGFueSBjb21iaW5hdGlvbiBvZiB0aGUgdGhyZWUgdmlzdWFsIHZhcmlhYmxlcy5cbiAqXG4gKiBAYXV0aG9yIEpvc2VwaCBEYXZpZXMsIEp1bGllbiBHYWZmdXJpXG4gKi9cbmV4cG9ydCBjbGFzcyBTaGFwZUNvbG9yU2l6ZVN0eWxlIGV4dGVuZHMgU3R5bGUge1xuICAgIC8qKiBAcGFyYW0ge29iamVjdH0gb3B0cyAqL1xuICAgIGNvbnN0cnVjdG9yKG9wdHMpIHtcbiAgICAgICAgc3VwZXIob3B0cylcbiAgICAgICAgb3B0cyA9IG9wdHMgfHwge31cblxuICAgICAgICAvKiogQSBmdW5jdGlvbiByZXR1cm5pbmcgdGhlIGNvbG9yIG9mIHRoZSBjZWxsLlxuICAgICAgICAgKiBAdHlwZSB7ZnVuY3Rpb24oaW1wb3J0KCcuLi9EYXRhc2V0LmpzJykuQ2VsbCxudW1iZXIsIG51bWJlcixvYmplY3QpOnN0cmluZ30gKi9cbiAgICAgICAgdGhpcy5jb2xvciA9IG9wdHMuY29sb3IgfHwgKCgpID0+IFwiI0VBNkJBQ1wiKSAvLyhjLHIseix2cykgPT4ge31cblxuICAgICAgICAvKiogQSBmdW5jdGlvbiByZXR1cm5pbmcgdGhlIHNpemUgb2YgYSBjZWxsIGluIGdlb2dyYXBoaWNhbCB1bml0LlxuICAgICAgICAgKiBAdHlwZSB7ZnVuY3Rpb24oaW1wb3J0KCcuLi9EYXRhc2V0LmpzJykuQ2VsbCxudW1iZXIsIG51bWJlcixvYmplY3QpOm51bWJlcn0gKi9cbiAgICAgICAgdGhpcy5zaXplID0gb3B0cy5zaXplIHx8ICgoY2VsbCwgcmVzb2x1dGlvbikgPT4gcmVzb2x1dGlvbikgLy8oYyxyLHosdnMpID0+IHt9XG5cbiAgICAgICAgLyoqIEEgZnVuY3Rpb24gcmV0dXJuaW5nIHRoZSBzaGFwZSBvZiBhIGNlbGwuXG4gICAgICAgICAqIEB0eXBlIHtmdW5jdGlvbihpbXBvcnQoXCIuLi9EYXRhc2V0LmpzXCIpLkNlbGwsbnVtYmVyLCBudW1iZXIsb2JqZWN0KTppbXBvcnQoXCIuLi9TdHlsZS5qc1wiKS5TaGFwZX0gKi9cbiAgICAgICAgdGhpcy5zaGFwZSA9IG9wdHMuc2hhcGUgfHwgKCgpID0+IFwic3F1YXJlXCIpIC8vKGMscix6LHZzKSA9PiB7fVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERyYXcgY2VsbHMgYXMgc3F1YXJlcywgd2l0aCB2YXJpb3VzIGNvbG9ycyBhbmQgc2l6ZXMuXG4gICAgICogXG4gICAgICogQHBhcmFtIHtBcnJheS48aW1wb3J0KFwiLi4vRGF0YXNldC5qc1wiKS5DZWxsPn0gY2VsbHNcbiAgICAgKiBAcGFyYW0ge2ltcG9ydChcIi4uL0dlb0NhbnZhcy5qc1wiKS5HZW9DYW52YXN9IGdlb0NhbnZhc1xuICAgICAqIEBwYXJhbSB7bnVtYmVyfSByZXNvbHV0aW9uXG4gICAgICogQG92ZXJyaWRlXG4gICAgICovXG4gICAgZHJhdyhjZWxscywgZ2VvQ2FudmFzLCByZXNvbHV0aW9uKSB7XG4gICAgICAgIC8vZmlsdGVyXG4gICAgICAgIGlmICh0aGlzLmZpbHRlcikgY2VsbHMgPSBjZWxscy5maWx0ZXIodGhpcy5maWx0ZXIpXG5cbiAgICAgICAgLy96b29tXG4gICAgICAgIGNvbnN0IHogPSBnZW9DYW52YXMudmlldy56XG5cbiAgICAgICAgLy9nZXQgdmlldyBzY2FsZVxuICAgICAgICBjb25zdCB2aWV3U2NhbGUgPSB0aGlzLnZpZXdTY2FsZSA/IHRoaXMudmlld1NjYWxlKGNlbGxzLCByZXNvbHV0aW9uLCB6KSA6IHVuZGVmaW5lZFxuXG4gICAgICAgIGNvbnN0IHIyID0gcmVzb2x1dGlvbiAqIDAuNVxuICAgICAgICBmb3IgKGxldCBjIG9mIGNlbGxzKSB7XG4gICAgICAgICAgICAvL2NvbG9yXG4gICAgICAgICAgICBsZXQgY29sID0gdGhpcy5jb2xvciA/IHRoaXMuY29sb3IoYywgcmVzb2x1dGlvbiwgeiwgdmlld1NjYWxlKSA6IFwiYmxhY2tcIlxuICAgICAgICAgICAgaWYgKCFjb2wgfHwgY29sID09PSAnbm9uZScpIGNvbnRpbnVlXG5cbiAgICAgICAgICAgIC8vc2l6ZVxuICAgICAgICAgICAgY29uc3Qgc2l6ZSA9IHRoaXMuc2l6ZSA/IHRoaXMuc2l6ZShjLCByZXNvbHV0aW9uLCB6LCB2aWV3U2NhbGUpIDogcmVzb2x1dGlvblxuICAgICAgICAgICAgaWYgKCFzaXplKSBjb250aW51ZVxuXG4gICAgICAgICAgICAvL3NoYXBlXG4gICAgICAgICAgICBjb25zdCBzaGFwZSA9IHRoaXMuc2hhcGUgPyB0aGlzLnNoYXBlKGMsIHJlc29sdXRpb24sIHosIHZpZXdTY2FsZSkgOiAnc3F1YXJlJ1xuICAgICAgICAgICAgaWYgKHNoYXBlID09PSAnbm9uZScpIGNvbnRpbnVlXG5cbiAgICAgICAgICAgIC8vZ2V0IG9mZnNldFxuICAgICAgICAgICAgY29uc3Qgb2Zmc2V0ID0gdGhpcy5vZmZzZXQoYywgcmVzb2x1dGlvbiwgeilcblxuICAgICAgICAgICAgZ2VvQ2FudmFzLmN0eC5maWxsU3R5bGUgPSBjb2xcbiAgICAgICAgICAgIGlmIChzaGFwZSA9PT0gJ3NxdWFyZScpIHtcbiAgICAgICAgICAgICAgICAvL2RyYXcgc3F1YXJlXG4gICAgICAgICAgICAgICAgY29uc3QgZCA9IHJlc29sdXRpb24gKiAoMSAtIHNpemUgLyByZXNvbHV0aW9uKSAqIDAuNVxuICAgICAgICAgICAgICAgIGdlb0NhbnZhcy5jdHguZmlsbFJlY3QoYy54ICsgZCArIG9mZnNldC5keCwgYy55ICsgZCArIG9mZnNldC5keSwgc2l6ZSwgc2l6ZSlcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc2hhcGUgPT09ICdjaXJjbGUnKSB7XG4gICAgICAgICAgICAgICAgLy9kcmF3IGNpcmNsZVxuICAgICAgICAgICAgICAgIGdlb0NhbnZhcy5jdHguYmVnaW5QYXRoKClcbiAgICAgICAgICAgICAgICBnZW9DYW52YXMuY3R4LmFyYyhjLnggKyByMiArIG9mZnNldC5keCwgYy55ICsgcjIgKyBvZmZzZXQuZHksIHNpemUgKiAwLjUsIDAsIDIgKiBNYXRoLlBJLCBmYWxzZSlcbiAgICAgICAgICAgICAgICBnZW9DYW52YXMuY3R4LmZpbGwoKVxuICAgICAgICAgICAgfSBlbHNlIGlmIChzaGFwZSA9PT0gJ2RvbnV0Jykge1xuICAgICAgICAgICAgICAgIC8vZHJhdyBkb251dFxuICAgICAgICAgICAgICAgIGNvbnN0IHhjID0gYy54ICsgcjIgKyBvZmZzZXQuZHgsXG4gICAgICAgICAgICAgICAgICAgIHljID0gYy55ICsgcjIgKyBvZmZzZXQuZHlcbiAgICAgICAgICAgICAgICBnZW9DYW52YXMuY3R4LmJlZ2luUGF0aCgpXG4gICAgICAgICAgICAgICAgZ2VvQ2FudmFzLmN0eC5tb3ZlVG8oeGMsIHljKVxuICAgICAgICAgICAgICAgIGdlb0NhbnZhcy5jdHguYXJjKHhjLCB5YywgcjIsIDAsIDIgKiBNYXRoLlBJKVxuICAgICAgICAgICAgICAgIGdlb0NhbnZhcy5jdHguYXJjKHhjLCB5YywgKDEgLSBzaXplIC8gcmVzb2x1dGlvbikgKiByMiwgMCwgMiAqIE1hdGguUEksIHRydWUpXG4gICAgICAgICAgICAgICAgZ2VvQ2FudmFzLmN0eC5jbG9zZVBhdGgoKVxuICAgICAgICAgICAgICAgIGdlb0NhbnZhcy5jdHguZmlsbCgpXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHNoYXBlID09PSAnZGlhbW9uZCcpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzMiA9IHNpemUgKiAwLjVcbiAgICAgICAgICAgICAgICBnZW9DYW52YXMuY3R4LmJlZ2luUGF0aCgpXG4gICAgICAgICAgICAgICAgZ2VvQ2FudmFzLmN0eC5tb3ZlVG8oYy54ICsgcjIgLSBzMiwgYy55ICsgcjIpXG4gICAgICAgICAgICAgICAgZ2VvQ2FudmFzLmN0eC5saW5lVG8oYy54ICsgcjIsIGMueSArIHIyICsgczIpXG4gICAgICAgICAgICAgICAgZ2VvQ2FudmFzLmN0eC5saW5lVG8oYy54ICsgcjIgKyBzMiwgYy55ICsgcjIpXG4gICAgICAgICAgICAgICAgZ2VvQ2FudmFzLmN0eC5saW5lVG8oYy54ICsgcjIsIGMueSArIHIyIC0gczIpXG4gICAgICAgICAgICAgICAgZ2VvQ2FudmFzLmN0eC5maWxsKClcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmV4cGVjdGVkIHNoYXBlOicgKyBzaGFwZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vdXBkYXRlIGxlZ2VuZHNcbiAgICAgICAgdGhpcy51cGRhdGVMZWdlbmRzKHsgdmlld1NjYWxlOiB2aWV3U2NhbGUsIHo6IHosIGNlbGxzOiBjZWxscyB9KVxuICAgIH1cbn1cbiIsIi8vQHRzLWNoZWNrXG4ndXNlIHN0cmljdCdcblxuaW1wb3J0IHsgU3R5bGUgfSBmcm9tICcuLi9TdHlsZS5qcydcblxuLyoqIEB0eXBlZGVmIHt7eDpudW1iZXIseTpudW1iZXIsb3I6XCJ2XCJ8XCJoXCIsdjE6c3RyaW5nfHVuZGVmaW5lZCx2MjpzdHJpbmd8dW5kZWZpbmVkfX0gU2lkZSAqL1xuXG4vKipcbiAqIEEgc3R5bGUgdG8gc2hvdyB0aGUgc2lkZXMgb2YgZ3JpZCBjZWxscyBiYXNlZCBvbiB0aGVpciBkaWZmZXJlbnQgY2F0ZWdvcmllcy5cbiAqXG4gKiBAYXV0aG9yIEp1bGllbiBHYWZmdXJpXG4gKi9cbmV4cG9ydCBjbGFzcyBTaWRlQ2F0U3R5bGUgZXh0ZW5kcyBTdHlsZSB7XG4gICAgLyoqIEBwYXJhbSB7b2JqZWN0fSBvcHRzICovXG4gICAgY29uc3RydWN0b3Iob3B0cykge1xuICAgICAgICBzdXBlcihvcHRzKVxuICAgICAgICBvcHRzID0gb3B0cyB8fCB7fVxuXG4gICAgICAgIC8qKiBUaGUgbmFtZSBvZiB0aGUgY29sdW1uL2F0dHJpYnV0ZSBvZiB0aGUgdGFidWxhciBkYXRhIHdoZXJlIHRvIHJldHJpZXZlIHRoZSBjYXRlZ29yaWNhbCB2YWx1ZS5cbiAgICAgICAgICogQHR5cGUge3N0cmluZ30gKi9cbiAgICAgICAgdGhpcy5jb2wgPSBvcHRzLmNvbFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgZGljdGlvbmFyeSAoc3RyaW5nIC0+IGNvbG9yKSB3aGljaCBnaXZlIHRoZSBjb2xvciBvZiBlYWNoIGNhdGVnb3J5LlxuICAgICAgICAgKiBAdHlwZSB7b2JqZWN0fSAqL1xuICAgICAgICB0aGlzLmNvbG9yID0gb3B0cy5jb2xvclxuXG4gICAgICAgIC8qKiBBIGZ1bmN0aW9uIHJldHVybmluZyB0aGUgd2lkdGggb2YgYSBjZWxsIHNpZGUgbGluZSwgaW4gZ2VvIHVuaXRcbiAgICAgICAgICogQHR5cGUge2Z1bmN0aW9uKFNpZGUsbnVtYmVyLG51bWJlcik6bnVtYmVyfSAqL1xuICAgICAgICB0aGlzLndpZHRoID0gb3B0cy53aWR0aCB8fCAoKHNpZGUsIHIsIHopID0+IHIgKiAwLjIpXG5cbiAgICAgICAgLyoqIEEgZmlsbCBjb2xvciBmb3IgdGhlIGNlbGxzLlxuICAgICAgICAgKiBAdHlwZSB7ZnVuY3Rpb24oaW1wb3J0KFwiLi4vRGF0YXNldFwiKS5DZWxsKTpzdHJpbmd9ICovXG4gICAgICAgIHRoaXMuZmlsbENvbG9yID0gb3B0cy5maWxsQ29sb3JcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge0FycmF5LjxpbXBvcnQoXCIuLi9EYXRhc2V0XCIpLkNlbGw+fSBjZWxsc1xuICAgICAqIEBwYXJhbSB7aW1wb3J0KFwiLi4vR2VvQ2FudmFzXCIpLkdlb0NhbnZhc30gZ2VvQ2FudmFzXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHJlc29sdXRpb25cbiAgICAgKi9cbiAgICBkcmF3KGNlbGxzLCBnZW9DYW52YXMsIHJlc29sdXRpb24pIHtcbiAgICAgICAgLy9maWx0ZXJcbiAgICAgICAgaWYgKHRoaXMuZmlsdGVyKSBjZWxscyA9IGNlbGxzLmZpbHRlcih0aGlzLmZpbHRlcilcblxuICAgICAgICBpZiAoIWNlbGxzIHx8IGNlbGxzLmxlbmd0aCA9PSAwKSByZXR1cm5cblxuICAgICAgICAvL1xuICAgICAgICBjb25zdCB6ID0gZ2VvQ2FudmFzLnZpZXcuelxuXG4gICAgICAgIC8qKiAgQHR5cGUge0FycmF5LjxTaWRlPn0gKi9cbiAgICAgICAgY29uc3Qgc2lkZXMgPSBbXVxuXG4gICAgICAgIC8vbWFrZSBob3Jpem9udGFsIHNpZGVzXG4gICAgICAgIC8vc29ydCBjZWxscyBieSB4IGFuZCB5XG4gICAgICAgIGNlbGxzLnNvcnQoKGMxLCBjMikgPT4gKGMyLnggPT0gYzEueCA/IGMxLnkgLSBjMi55IDogYzEueCAtIGMyLngpKVxuICAgICAgICBsZXQgYzEgPSBjZWxsc1swXVxuICAgICAgICBsZXQgdjEgPSBjMVt0aGlzLmNvbF1cbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBjZWxscy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IGMyID0gY2VsbHNbaV1cbiAgICAgICAgICAgIGxldCB2MiA9IGMyW3RoaXMuY29sXVxuXG4gICAgICAgICAgICBpZiAoYzEueSArIHJlc29sdXRpb24gPT0gYzIueSAmJiBjMS54ID09IGMyLngpIHtcbiAgICAgICAgICAgICAgICAvL2NlbGxzIGluIHNhbWUgY29sdW1uIGFuZCB0b3VjaCBhbG9uZyBob3Jpem9udGFsIHNpZGVcbiAgICAgICAgICAgICAgICAvL21ha2Ugc2hhcmVkIHNpZGVcbiAgICAgICAgICAgICAgICBpZiAodjEgIT0gdjIpIHNpZGVzLnB1c2goeyB4OiBjMS54LCB5OiBjMi55LCBvcjogJ2gnLCB2MTogdjEsIHYyOiB2MiB9KVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvL2NlbGxzIGRvIG5vdCB0b3VjaCBhbG9uZyBob3Jpem9udGFsIHNpZGVcbiAgICAgICAgICAgICAgICAvL21ha2UgdHdvIHNpZGVzOiB0b3Agb25lIGZvciBjMSwgYm90dG9tIGZvciBjMlxuICAgICAgICAgICAgICAgIHNpZGVzLnB1c2goeyB4OiBjMS54LCB5OiBjMS55ICsgcmVzb2x1dGlvbiwgb3I6ICdoJywgdjE6IHYxLCB2MjogdW5kZWZpbmVkIH0pXG4gICAgICAgICAgICAgICAgc2lkZXMucHVzaCh7IHg6IGMyLngsIHk6IGMyLnksIG9yOiAnaCcsIHYxOiB1bmRlZmluZWQsIHYyOiB2MiB9KVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjMSA9IGMyXG4gICAgICAgICAgICB2MSA9IHYyXG4gICAgICAgIH1cblxuICAgICAgICAvL21ha2UgdmVydGljYWwgc2lkZXNcbiAgICAgICAgLy9zb3J0IGNlbGxzIGJ5IHkgYW5kIHhcbiAgICAgICAgY2VsbHMuc29ydCgoYzEsIGMyKSA9PiAoYzIueSA9PSBjMS55ID8gYzEueCAtIGMyLnggOiBjMS55IC0gYzIueSkpXG4gICAgICAgIGMxID0gY2VsbHNbMF1cbiAgICAgICAgdjEgPSBjMVt0aGlzLmNvbF1cbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBjZWxscy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IGMyID0gY2VsbHNbaV1cbiAgICAgICAgICAgIGxldCB2MiA9IGMyW3RoaXMuY29sXVxuXG4gICAgICAgICAgICBpZiAoYzEueCArIHJlc29sdXRpb24gPT0gYzIueCAmJiBjMS55ID09IGMyLnkpIHtcbiAgICAgICAgICAgICAgICAvL2NlbGxzIGluIHNhbWUgcm93IGFuZCB0b3VjaCBhbG9uZyB2ZXJ0aWNhbCBzaWRlXG4gICAgICAgICAgICAgICAgLy9tYWtlIHNoYXJlZCBzaWRlXG4gICAgICAgICAgICAgICAgaWYgKHYxICE9IHYyKSBzaWRlcy5wdXNoKHsgeDogYzEueCArIHJlc29sdXRpb24sIHk6IGMxLnksIG9yOiAndicsIHYxOiB2MSwgdjI6IHYyIH0pXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vY2VsbHMgZG8gbm90IHRvdWNoIGFsb25nIHZlcnRpY2FsIHNpZGVcbiAgICAgICAgICAgICAgICAvL21ha2UgdHdvIHNpZGVzOiByaWdodCBvbmUgZm9yIGMxLCBsZWZ0IGZvciBjMlxuICAgICAgICAgICAgICAgIHNpZGVzLnB1c2goeyB4OiBjMS54ICsgcmVzb2x1dGlvbiwgeTogYzEueSwgb3I6ICd2JywgdjE6IHYxLCB2MjogdW5kZWZpbmVkIH0pXG4gICAgICAgICAgICAgICAgc2lkZXMucHVzaCh7IHg6IGMyLngsIHk6IGMyLnksIG9yOiAndicsIHYxOiB1bmRlZmluZWQsIHYyOiB2MiB9KVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjMSA9IGMyXG4gICAgICAgICAgICB2MSA9IHYyXG4gICAgICAgIH1cblxuICAgICAgICAvL1xuICAgICAgICBpZiAoc2lkZXMubGVuZ3RoID09IDApIHJldHVyblxuXG4gICAgICAgIC8vZHJhdyBjZWxscywgaWYgZmlsbENvbG9yIHNwZWNpZmllZFxuICAgICAgICBpZiAodGhpcy5maWxsQ29sb3IpXG4gICAgICAgICAgICBmb3IgKGxldCBjIG9mIGNlbGxzKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZmMgPSB0aGlzLmZpbGxDb2xvcihjKVxuICAgICAgICAgICAgICAgIGlmICghZmMgfHwgZmMgPT0gJ25vbmUnKSBjb250aW51ZVxuICAgICAgICAgICAgICAgIGdlb0NhbnZhcy5jdHguZmlsbFN0eWxlID0gZmNcbiAgICAgICAgICAgICAgICBnZW9DYW52YXMuY3R4LmZpbGxSZWN0KGMueCwgYy55LCByZXNvbHV0aW9uLCByZXNvbHV0aW9uKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIC8vZHJhdyBzaWRlc1xuICAgICAgICBnZW9DYW52YXMuY3R4LmxpbmVDYXAgPSAnYnV0dCdcbiAgICAgICAgZm9yIChsZXQgcyBvZiBzaWRlcykge1xuICAgICAgICAgICAgLy93aWR0aFxuICAgICAgICAgICAgLyoqIEB0eXBlIHtudW1iZXJ8dW5kZWZpbmVkfSAqL1xuICAgICAgICAgICAgY29uc3Qgd0cgPSB0aGlzLndpZHRoID8gdGhpcy53aWR0aChzLCByZXNvbHV0aW9uLCB6KSA6IHVuZGVmaW5lZFxuICAgICAgICAgICAgaWYgKCF3RyB8fCB3RyA8PSAwKSBjb250aW51ZVxuICAgICAgICAgICAgY29uc3QgdzIgPSB3RyAqIDAuNVxuXG4gICAgICAgICAgICAvL3NldCBjb2xvciBhbmQgd2lkdGhcbiAgICAgICAgICAgIGdlb0NhbnZhcy5jdHgubGluZVdpZHRoID0gd0dcblxuICAgICAgICAgICAgLy9kcmF3IHNlZ21lbnQgd2l0aCBjb3JyZWN0IG9yaWVudGF0aW9uXG4gICAgICAgICAgICBpZiAocy5vciA9PT0gJ2gnKSB7XG4gICAgICAgICAgICAgICAgLy90b3AgbGluZVxuICAgICAgICAgICAgICAgIGlmIChzLnYyKSB7XG4gICAgICAgICAgICAgICAgICAgIGdlb0NhbnZhcy5jdHguYmVnaW5QYXRoKClcbiAgICAgICAgICAgICAgICAgICAgZ2VvQ2FudmFzLmN0eC5zdHJva2VTdHlsZSA9IHRoaXMuY29sb3Jbcy52Ml1cbiAgICAgICAgICAgICAgICAgICAgZ2VvQ2FudmFzLmN0eC5tb3ZlVG8ocy54LCBzLnkgKyB3MilcbiAgICAgICAgICAgICAgICAgICAgZ2VvQ2FudmFzLmN0eC5saW5lVG8ocy54ICsgcmVzb2x1dGlvbiwgcy55ICsgdzIpXG4gICAgICAgICAgICAgICAgICAgIGdlb0NhbnZhcy5jdHguc3Ryb2tlKClcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvL2JvdHRvbSBsaW5lXG4gICAgICAgICAgICAgICAgaWYgKHMudjEpIHtcbiAgICAgICAgICAgICAgICAgICAgZ2VvQ2FudmFzLmN0eC5iZWdpblBhdGgoKVxuICAgICAgICAgICAgICAgICAgICBnZW9DYW52YXMuY3R4LnN0cm9rZVN0eWxlID0gdGhpcy5jb2xvcltzLnYxXVxuICAgICAgICAgICAgICAgICAgICBnZW9DYW52YXMuY3R4Lm1vdmVUbyhzLngsIHMueSAtIHcyKVxuICAgICAgICAgICAgICAgICAgICBnZW9DYW52YXMuY3R4LmxpbmVUbyhzLnggKyByZXNvbHV0aW9uLCBzLnkgLSB3MilcbiAgICAgICAgICAgICAgICAgICAgZ2VvQ2FudmFzLmN0eC5zdHJva2UoKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy9yaWdodCBsaW5lXG4gICAgICAgICAgICAgICAgaWYgKHMudjIpIHtcbiAgICAgICAgICAgICAgICAgICAgZ2VvQ2FudmFzLmN0eC5iZWdpblBhdGgoKVxuICAgICAgICAgICAgICAgICAgICBnZW9DYW52YXMuY3R4LnN0cm9rZVN0eWxlID0gdGhpcy5jb2xvcltzLnYyXVxuICAgICAgICAgICAgICAgICAgICBnZW9DYW52YXMuY3R4Lm1vdmVUbyhzLnggKyB3Miwgcy55KVxuICAgICAgICAgICAgICAgICAgICBnZW9DYW52YXMuY3R4LmxpbmVUbyhzLnggKyB3Miwgcy55ICsgcmVzb2x1dGlvbilcbiAgICAgICAgICAgICAgICAgICAgZ2VvQ2FudmFzLmN0eC5zdHJva2UoKVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vbGVmdCBsaW5lXG4gICAgICAgICAgICAgICAgaWYgKHMudjEpIHtcbiAgICAgICAgICAgICAgICAgICAgZ2VvQ2FudmFzLmN0eC5iZWdpblBhdGgoKVxuICAgICAgICAgICAgICAgICAgICBnZW9DYW52YXMuY3R4LnN0cm9rZVN0eWxlID0gdGhpcy5jb2xvcltzLnYxXVxuICAgICAgICAgICAgICAgICAgICBnZW9DYW52YXMuY3R4Lm1vdmVUbyhzLnggLSB3Miwgcy55KVxuICAgICAgICAgICAgICAgICAgICBnZW9DYW52YXMuY3R4LmxpbmVUbyhzLnggLSB3Miwgcy55ICsgcmVzb2x1dGlvbilcbiAgICAgICAgICAgICAgICAgICAgZ2VvQ2FudmFzLmN0eC5zdHJva2UoKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vdXBkYXRlIGxlZ2VuZHNcbiAgICAgICAgdGhpcy51cGRhdGVMZWdlbmRzKHsgc3R5bGU6IHRoaXMsIHI6IHJlc29sdXRpb24sIHo6IHogfSlcbiAgICB9XG59XG4iLCIvL0B0cy1jaGVja1xuJ3VzZSBzdHJpY3QnXG5cbmltcG9ydCB7IFN0eWxlIH0gZnJvbSAnLi4vU3R5bGUuanMnXG5cbi8qKiBAdHlwZWRlZiB7e3g6bnVtYmVyLHk6bnVtYmVyLG9yOlwidlwifFwiaFwiLHZhbHVlOm51bWJlcn19IFNpZGUgKi9cblxuLyoqXG4gKlxuICogQGF1dGhvciBKdWxpZW4gR2FmZnVyaVxuICovXG5leHBvcnQgY2xhc3MgU2lkZVN0eWxlIGV4dGVuZHMgU3R5bGUge1xuICAgIC8qKiBAcGFyYW0ge29iamVjdH0gb3B0cyAqL1xuICAgIGNvbnN0cnVjdG9yKG9wdHMpIHtcbiAgICAgICAgc3VwZXIob3B0cylcbiAgICAgICAgb3B0cyA9IG9wdHMgfHwge31cblxuICAgICAgICAvKiogVGhlIG5hbWUgb2YgdGhlIGNvbHVtbi9hdHRyaWJ1dGUgb2YgdGhlIHRhYnVsYXIgZGF0YSB3aGVyZSB0byByZXRyaWV2ZSB0aGUgdmFyaWFibGUgZm9yIHRoZSBjZWxsIHZhbHVlcy5cbiAgICAgICAgICogQHR5cGUge3N0cmluZ30gKi9cbiAgICAgICAgdGhpcy52YWx1ZUNvbCA9IG9wdHMudmFsdWVDb2xcblxuICAgICAgICAvKiogQSBmdW5jdGlvbiByZXR1cm5pbmcgdGhlIHZhbHVlIG9mIGEgY2VsbCBzaWRlLiBUaGlzIHZhbHVlIGlzIGNvbXB1dGVkIGZyb20gdGhlIHR3byBhZGphY2VudCBjZWxsIHZhbHVlcy5cbiAgICAgICAgICogRm9yIGhvcml6b250YWwgc2lkZXMsIHYxIGlzIHRoZSB2YWx1ZSBvZiB0aGUgY2VsbCBiZWxvdyBhbmQgdjIgdGhlIHZhbHVlIG9mIHRoZSBjZWxsIGFib3ZlLlxuICAgICAgICAgKiBGb3IgdmVydGljYWwgc2lkZXMsIHYxIGlzIHRoZSB2YWx1ZSBvZiB0aGUgY2VsbCBsZWZ0IGFuZCB2MiB0aGUgdmFsdWUgb2YgdGhlIGNlbGwgcmlnaHQuXG4gICAgICAgICAqIEB0eXBlIHtmdW5jdGlvbihudW1iZXJ8dW5kZWZpbmVkLG51bWJlcnx1bmRlZmluZWQsbnVtYmVyLGltcG9ydChcIi4uL1N0eWxlXCIpLlN0YXR8dW5kZWZpbmVkLG51bWJlcik6bnVtYmVyfSAqL1xuICAgICAgICB0aGlzLnZhbHVlID0gb3B0cy52YWx1ZSB8fCAoKHYxLCB2MiwgciwgcywgeikgPT4gMSlcblxuICAgICAgICAvKiogQSBmdW5jdGlvbiByZXR1cm5pbmcgdGhlIGNvbG9yIG9mIGEgY2VsbCBzaWRlLlxuICAgICAgICAgKiBAdHlwZSB7ZnVuY3Rpb24oU2lkZSxudW1iZXIsaW1wb3J0KFwiLi4vU3R5bGVcIikuU3RhdHx1bmRlZmluZWQsbnVtYmVyKTpzdHJpbmd9ICovXG4gICAgICAgIHRoaXMuY29sb3IgPSBvcHRzLmNvbG9yIHx8ICgoKSA9PiAnI0VBNkJBQycpXG5cbiAgICAgICAgLyoqIEEgZnVuY3Rpb24gcmV0dXJuaW5nIHRoZSB3aWR0aCBvZiBhIGNlbGwgc2lkZSwgaW4gZ2VvIHVuaXRcbiAgICAgICAgICogQHR5cGUge2Z1bmN0aW9uKFNpZGUsbnVtYmVyLGltcG9ydChcIi4uL1N0eWxlXCIpLlN0YXR8dW5kZWZpbmVkLG51bWJlcik6bnVtYmVyfSAqL1xuICAgICAgICB0aGlzLndpZHRoID0gb3B0cy53aWR0aCB8fCAoKHNpZGUsIHIsIHMsIHopID0+IChyICogc2lkZS52YWx1ZSkgLyA1KVxuXG4gICAgICAgIC8qKiBvcmllbnRhdGlvbi4gU2V0IHRvIDkwIHRvIHNob3cgc2lkZXMgYXMgc2xvcGUgbGluZXMgZm9yIGV4YW1wbGUuXG4gICAgICAgICAqIEB0eXBlIHtudW1iZXJ9ICovXG4gICAgICAgIHRoaXMub3JpZW50YXRpb24gPSBvcHRzLm9yaWVudGF0aW9uIHx8IDBcblxuICAgICAgICAvKiogQSBmaWxsIGNvbG9yIGZvciB0aGUgY2VsbHMuXG4gICAgICAgICAqIEB0eXBlIHtmdW5jdGlvbihpbXBvcnQoXCIuLi9EYXRhc2V0XCIpLkNlbGwpOnN0cmluZ30gKi9cbiAgICAgICAgdGhpcy5maWxsQ29sb3IgPSBvcHRzLmZpbGxDb2xvclxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7QXJyYXkuPGltcG9ydChcIi4uL0RhdGFzZXRcIikuQ2VsbD59IGNlbGxzXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHJlc29sdXRpb25cbiAgICAgKiBAcGFyYW0ge2ltcG9ydChcIi4uL0dlb0NhbnZhc1wiKS5HZW9DYW52YXN9IGdlb0NhbnZhc1xuICAgICAqL1xuICAgIGRyYXcoY2VsbHMsIGdlb0NhbnZhcywgcmVzb2x1dGlvbikge1xuICAgICAgICAvL2ZpbHRlclxuICAgICAgICBpZiAodGhpcy5maWx0ZXIpIGNlbGxzID0gY2VsbHMuZmlsdGVyKHRoaXMuZmlsdGVyKVxuXG4gICAgICAgIC8vXG4gICAgICAgIGNvbnN0IHogPSBnZW9DYW52YXMudmlldy56XG5cbiAgICAgICAgLy9jb21wdXRlIHN0YXRzIG9uIGNlbGwgdmFsdWVzXG4gICAgICAgIGxldCBzdGF0VmFsdWVcbiAgICAgICAgaWYgKHRoaXMudmFsdWVDb2wpIHtcbiAgICAgICAgICAgIC8vY29tcHV0ZSBjb2xvciB2YXJpYWJsZSBzdGF0aXN0aWNzXG4gICAgICAgICAgICBzdGF0VmFsdWUgPSBTdHlsZS5nZXRTdGF0aXN0aWNzKGNlbGxzLCAoYykgPT4gY1t0aGlzLnZhbHVlQ29sXSwgdHJ1ZSlcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKiAgQHR5cGUge0FycmF5LjxTaWRlPn0gKi9cbiAgICAgICAgY29uc3Qgc2lkZXMgPSBbXVxuXG4gICAgICAgIC8vbWFrZSBob3Jpem9udGFsIHNpZGVzXG4gICAgICAgIC8vc29ydCBjZWxscyBieSB4IGFuZCB5XG4gICAgICAgIGNlbGxzLnNvcnQoKGMxLCBjMikgPT4gKGMyLnggPT0gYzEueCA/IGMxLnkgLSBjMi55IDogYzEueCAtIGMyLngpKVxuICAgICAgICBsZXQgYzEgPSBjZWxsc1swXVxuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IGNlbGxzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgYzIgPSBjZWxsc1tpXVxuXG4gICAgICAgICAgICBpZiAoKGMxLnkgKyByZXNvbHV0aW9uID09IGMyLnkpICYmIChjMS54ID09IGMyLngpKVxuICAgICAgICAgICAgICAgIC8vY2VsbHMgaW4gc2FtZSBjb2x1bW4gYW5kIHRvdWNoIGFsb25nIGhvcml6b250YWwgc2lkZVxuICAgICAgICAgICAgICAgIC8vbWFrZSBzaGFyZWQgc2lkZVxuICAgICAgICAgICAgICAgIHNpZGVzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICB4OiBjMS54LFxuICAgICAgICAgICAgICAgICAgICB5OiBjMi55LFxuICAgICAgICAgICAgICAgICAgICBvcjogJ2gnLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdGhpcy52YWx1ZShjMVt0aGlzLnZhbHVlQ29sXSwgYzJbdGhpcy52YWx1ZUNvbF0sIHJlc29sdXRpb24sIHN0YXRWYWx1ZSwgeiksXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vY2VsbHMgZG8gbm90IHRvdWNoIGFsb25nIGhvcml6b250YWwgc2lkZVxuICAgICAgICAgICAgICAgIC8vbWFrZSB0d28gc2lkZXM6IHRvcCBvbmUgZm9yIGMxLCBib3R0b20gZm9yIGMyXG4gICAgICAgICAgICAgICAgc2lkZXMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIHg6IGMxLngsXG4gICAgICAgICAgICAgICAgICAgIHk6IGMxLnkgKyByZXNvbHV0aW9uLFxuICAgICAgICAgICAgICAgICAgICBvcjogJ2gnLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdGhpcy52YWx1ZShjMVt0aGlzLnZhbHVlQ29sXSwgdW5kZWZpbmVkLCByZXNvbHV0aW9uLCBzdGF0VmFsdWUsIHopLFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgc2lkZXMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIHg6IGMyLngsXG4gICAgICAgICAgICAgICAgICAgIHk6IGMyLnksXG4gICAgICAgICAgICAgICAgICAgIG9yOiAnaCcsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiB0aGlzLnZhbHVlKHVuZGVmaW5lZCwgYzJbdGhpcy52YWx1ZUNvbF0sIHJlc29sdXRpb24sIHN0YXRWYWx1ZSwgeiksXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYzEgPSBjMlxuICAgICAgICB9XG5cbiAgICAgICAgLy9tYWtlIHZlcnRpY2FsIHNpZGVzXG4gICAgICAgIC8vc29ydCBjZWxscyBieSB5IGFuZCB4XG4gICAgICAgIGNlbGxzLnNvcnQoKGMxLCBjMikgPT4gKGMyLnkgPT0gYzEueSA/IGMxLnggLSBjMi54IDogYzEueSAtIGMyLnkpKVxuICAgICAgICBjMSA9IGNlbGxzWzBdXG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgY2VsbHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBjMiA9IGNlbGxzW2ldXG5cbiAgICAgICAgICAgIGlmICgoYzEueCArIHJlc29sdXRpb24gPT0gYzIueCkgJiYgKGMxLnkgPT0gYzIueSkpXG4gICAgICAgICAgICAgICAgLy9jZWxscyBpbiBzYW1lIHJvdyBhbmQgdG91Y2ggYWxvbmcgdmVydGljYWwgc2lkZVxuICAgICAgICAgICAgICAgIC8vbWFrZSBzaGFyZWQgc2lkZVxuICAgICAgICAgICAgICAgIHNpZGVzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICB4OiBjMS54ICsgcmVzb2x1dGlvbixcbiAgICAgICAgICAgICAgICAgICAgeTogYzEueSxcbiAgICAgICAgICAgICAgICAgICAgb3I6ICd2JyxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMudmFsdWUoYzFbdGhpcy52YWx1ZUNvbF0sIGMyW3RoaXMudmFsdWVDb2xdLCByZXNvbHV0aW9uLCBzdGF0VmFsdWUsIHopLFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAvL2NlbGxzIGRvIG5vdCB0b3VjaCBhbG9uZyB2ZXJ0aWNhbCBzaWRlXG4gICAgICAgICAgICAgICAgLy9tYWtlIHR3byBzaWRlczogcmlnaHQgb25lIGZvciBjMSwgbGVmdCBmb3IgYzJcbiAgICAgICAgICAgICAgICBzaWRlcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgeDogYzEueCArIHJlc29sdXRpb24sXG4gICAgICAgICAgICAgICAgICAgIHk6IGMxLnksXG4gICAgICAgICAgICAgICAgICAgIG9yOiAndicsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiB0aGlzLnZhbHVlKGMxW3RoaXMudmFsdWVDb2xdLCB1bmRlZmluZWQsIHJlc29sdXRpb24sIHN0YXRWYWx1ZSwgeiksXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICBzaWRlcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgeDogYzIueCxcbiAgICAgICAgICAgICAgICAgICAgeTogYzIueSxcbiAgICAgICAgICAgICAgICAgICAgb3I6ICd2JyxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMudmFsdWUodW5kZWZpbmVkLCBjMlt0aGlzLnZhbHVlQ29sXSwgcmVzb2x1dGlvbiwgc3RhdFZhbHVlLCB6KSxcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjMSA9IGMyXG4gICAgICAgIH1cblxuICAgICAgICAvL1xuICAgICAgICBpZiAoc2lkZXMubGVuZ3RoID09IDApIHJldHVyblxuXG4gICAgICAgIC8vY29tcHV0ZSBzdGF0cyBvbiBzaWRlc1xuICAgICAgICBjb25zdCBzdGF0U2lkZXMgPSBTaWRlU3R5bGUuZ2V0U2lkZVN0YXRpc3RpY3Moc2lkZXMsIHRydWUpXG5cbiAgICAgICAgLy9kcmF3IGNlbGxzLCBpZiBmaWxsQ29sb3Igc3BlY2lmaWVkXG4gICAgICAgIGlmICh0aGlzLmZpbGxDb2xvcilcbiAgICAgICAgICAgIGZvciAobGV0IGMgb2YgY2VsbHMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBmYyA9IHRoaXMuZmlsbENvbG9yKGMpXG4gICAgICAgICAgICAgICAgaWYgKCFmYyB8fCBmYyA9PSAnbm9uZScpIGNvbnRpbnVlXG4gICAgICAgICAgICAgICAgZ2VvQ2FudmFzLmN0eC5maWxsU3R5bGUgPSBmY1xuICAgICAgICAgICAgICAgIGdlb0NhbnZhcy5jdHguZmlsbFJlY3QoYy54LCBjLnksIHJlc29sdXRpb24sIHJlc29sdXRpb24pXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgLy9kcmF3IHNpZGVzXG4gICAgICAgIGdlb0NhbnZhcy5jdHgubGluZUNhcCA9ICdidXR0J1xuICAgICAgICBjb25zdCByMiA9IHJlc29sdXRpb24gLyAyXG4gICAgICAgIGZvciAobGV0IHMgb2Ygc2lkZXMpIHtcbiAgICAgICAgICAgIC8vY29sb3JcbiAgICAgICAgICAgIC8qKiBAdHlwZSB7c3RyaW5nfHVuZGVmaW5lZH0gKi9cbiAgICAgICAgICAgIGNvbnN0IGNvbCA9IHRoaXMuY29sb3IgPyB0aGlzLmNvbG9yKHMsIHJlc29sdXRpb24sIHN0YXRTaWRlcywgeikgOiB1bmRlZmluZWRcbiAgICAgICAgICAgIGlmICghY29sIHx8IGNvbCA9PSAnbm9uZScpIGNvbnRpbnVlXG5cbiAgICAgICAgICAgIC8vd2lkdGhcbiAgICAgICAgICAgIC8qKiBAdHlwZSB7bnVtYmVyfHVuZGVmaW5lZH0gKi9cbiAgICAgICAgICAgIGNvbnN0IHdHID0gdGhpcy53aWR0aCA/IHRoaXMud2lkdGgocywgcmVzb2x1dGlvbiwgc3RhdFNpZGVzLCB6KSA6IHVuZGVmaW5lZFxuICAgICAgICAgICAgaWYgKCF3RyB8fCB3RyA8PSAwKSBjb250aW51ZVxuXG4gICAgICAgICAgICAvL3NldCBjb2xvciBhbmQgd2lkdGhcbiAgICAgICAgICAgIGdlb0NhbnZhcy5jdHguc3Ryb2tlU3R5bGUgPSBjb2xcbiAgICAgICAgICAgIGdlb0NhbnZhcy5jdHgubGluZVdpZHRoID0gd0dcblxuICAgICAgICAgICAgLy9kcmF3IHNlZ21lbnQgd2l0aCBjb3JyZWN0IG9yaWVudGF0aW9uXG4gICAgICAgICAgICBnZW9DYW52YXMuY3R4LmJlZ2luUGF0aCgpXG4gICAgICAgICAgICBpZiAodGhpcy5vcmllbnRhdGlvbiA9PSA5MCkge1xuICAgICAgICAgICAgICAgIGdlb0NhbnZhcy5jdHgubW92ZVRvKHMueCArIHIyLCBzLnkgKyByMilcbiAgICAgICAgICAgICAgICBpZiAocy5vciA9PT0gJ2gnKSBnZW9DYW52YXMuY3R4LmxpbmVUbyhzLnggKyByMiwgcy55IC0gcjIpXG4gICAgICAgICAgICAgICAgZWxzZSBnZW9DYW52YXMuY3R4LmxpbmVUbyhzLnggLSByMiwgcy55ICsgcjIpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGdlb0NhbnZhcy5jdHgubW92ZVRvKHMueCwgcy55KVxuICAgICAgICAgICAgICAgIGdlb0NhbnZhcy5jdHgubGluZVRvKHMueCArIChzLm9yID09PSAnaCcgPyByZXNvbHV0aW9uIDogMCksIHMueSArIChzLm9yID09PSAndicgPyByZXNvbHV0aW9uIDogMCkpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBnZW9DYW52YXMuY3R4LnN0cm9rZSgpXG4gICAgICAgIH1cblxuICAgICAgICAvL3VwZGF0ZSBsZWdlbmRzXG4gICAgICAgIHRoaXMudXBkYXRlTGVnZW5kcyh7IHN0eWxlOiB0aGlzLCByOiByZXNvbHV0aW9uLCB6OiB6IH0pXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29tcHV0ZSBzb21lIHN0YXRpc3RpY3Mgb24gYSB2YWx1ZSBvZiBzb21lIHNpZGVzLlxuICAgICAqIFRoaXMgaXMgdXNlZCB0byBkZWZpbmUgaG93IHRvIGRyYXcgc3BlY2lmaWNhbGx5IHRoZSBzaWRlcyB3aXRoaW4gdGhlIHZpZXcuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0FycmF5LjxTaWRlPn0gc2lkZXNcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGlnbm9yZVplcm9zXG4gICAgICogQHJldHVybnMge2ltcG9ydChcIi4uL1N0eWxlXCIpLlN0YXQgfCB1bmRlZmluZWR9XG4gICAgICovXG4gICAgc3RhdGljIGdldFNpZGVTdGF0aXN0aWNzKHNpZGVzLCBpZ25vcmVaZXJvcykge1xuICAgICAgICBpZiAoIXNpZGVzIHx8IHNpZGVzLmxlbmd0aCA9PSAwKSByZXR1cm4gdW5kZWZpbmVkXG4gICAgICAgIGxldCBtaW4gPSBJbmZpbml0eVxuICAgICAgICBsZXQgbWF4ID0gLUluZmluaXR5XG4gICAgICAgIC8vbGV0IHN1bSA9IDBcbiAgICAgICAgLy9sZXQgbmIgPSAwXG4gICAgICAgIGZvciAoY29uc3QgcyBvZiBzaWRlcykge1xuICAgICAgICAgICAgY29uc3QgdiA9IHMudmFsdWVcbiAgICAgICAgICAgIGlmIChpZ25vcmVaZXJvcyAmJiAhdikgY29udGludWVcbiAgICAgICAgICAgIGlmICh2IDwgbWluKSBtaW4gPSB2XG4gICAgICAgICAgICBpZiAodiA+IG1heCkgbWF4ID0gdlxuICAgICAgICAgICAgLy9zdW0gKz0gdlxuICAgICAgICAgICAgLy9uYisrXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHsgbWluOiBtaW4sIG1heDogbWF4IH1cbiAgICB9XG59XG4iLCIvL0B0cy1jaGVja1xuJ3VzZSBzdHJpY3QnXG5cbmltcG9ydCB7IFN0eWxlIH0gZnJvbSAnLi4vU3R5bGUuanMnXG5pbXBvcnQgeyBtYWtlV2ViR0xDYW52YXMgfSBmcm9tICcuLi91dGlscy93ZWJHTFV0aWxzLmpzJ1xuaW1wb3J0IHsgV2ViR0xTcXVhcmVDb2xvcmluZ0NhdEFkdmFuY2VkIH0gZnJvbSAnLi4vdXRpbHMvV2ViR0xTcXVhcmVDb2xvcmluZ0NhdEFkdmFuY2VkLmpzJ1xuXG4vKipcbiAqIFN0eWxlIGJhc2VkIG9uIHdlYkdMXG4gKiBUbyBzaG93IGNlbGxzIGFzIGNvbG9yZWQgc3F1YXJlcywgZnJvbSBjYXRlZ29yaWVzLlxuICogQWxsIGNlbGxzIGFyZSBkcmF3biBhcyBzcXVhcmVzLCB3aXRoIHRoZSBzYW1lIHNpemVcbiAqXG4gKiBAYXV0aG9yIEp1bGllbiBHYWZmdXJpXG4gKi9cbmV4cG9ydCBjbGFzcyBTcXVhcmVDb2xvckNhdFdHTFN0eWxlIGV4dGVuZHMgU3R5bGUge1xuICAgIC8qKiBAcGFyYW0ge29iamVjdH0gb3B0cyAqL1xuICAgIGNvbnN0cnVjdG9yKG9wdHMpIHtcbiAgICAgICAgc3VwZXIob3B0cylcbiAgICAgICAgb3B0cyA9IG9wdHMgfHwge31cblxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIG5hbWUgb2YgdGhlIGNvbHVtbi9hdHRyaWJ1dGUgb2YgdGhlIHRhYnVsYXIgZGF0YSB3aGVyZSB0byByZXRyaWV2ZSB0aGUgY2F0ZWdvcnkgb2YgdGhlIGNlbGwsIGZvciBjb2xvcmluZy5cbiAgICAgICAgICogQHR5cGUge3N0cmluZ30gKi9cbiAgICAgICAgdGhpcy5jb2xvckNvbCA9IG9wdHMuY29sb3JDb2xcblxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIGRpY3Rpb25hcnkgKHN0cmluZyAtPiBjb2xvcikgd2hpY2ggZ2l2ZSB0aGUgY29sb3Igb2YgZWFjaCBjYXRlZ29yeS5cbiAgICAgICAgICogQHR5cGUge29iamVjdH0gKi9cbiAgICAgICAgb3B0cy5jb2xvciA9IG9wdHMuY29sb3IgfHwgdW5kZWZpbmVkXG5cbiAgICAgICAgLyoqIEB0eXBlIHsgQXJyYXkuPHN0cmluZz4gfSBAcHJpdmF0ZSAqL1xuICAgICAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMob3B0cy5jb2xvcilcblxuICAgICAgICAvKiogQHR5cGUgeyBvYmplY3QgfSBAcHJpdmF0ZSAqL1xuICAgICAgICB0aGlzLmNhdFRvSSA9IHt9XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykgdGhpcy5jYXRUb0lba2V5c1tpXV0gPSBpICsgJydcblxuICAgICAgICAvKiogQHR5cGUgeyBBcnJheS48c3RyaW5nPiB9IEBwcml2YXRlICovXG4gICAgICAgIHRoaXMuY29sb3JzID0gW11cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLmNvbG9ycy5wdXNoKG9wdHMuY29sb3JbJycgKyBrZXlzW2ldXSlcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBIGZ1bmN0aW9uIHJldHVybmluZyB0aGUgc2l6ZSBvZiB0aGUgY2VsbHMsIGluIGdlb2dyYXBoaWNhbCB1bml0LiBBbGwgY2VsbHMgaGF2ZSB0aGUgc2FtZSBzaXplLlxuICAgICAgICAgKiBAdHlwZSB7ZnVuY3Rpb24obnVtYmVyLG51bWJlcik6bnVtYmVyfSAqL1xuICAgICAgICB0aGlzLnNpemUgPSBvcHRzLnNpemUgLy8gKHJlc29sdXRpb24sIHopID0+IC4uLlxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKiBAdHlwZSB7IFdlYkdMU3F1YXJlQ29sb3JpbmdDYXRBZHZhbmNlZCB9ICovXG4gICAgICAgIHRoaXMud2dwID0gbmV3IFdlYkdMU3F1YXJlQ29sb3JpbmdDYXRBZHZhbmNlZCh0aGlzLmNvbG9ycylcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge0FycmF5LjxpbXBvcnQoXCIuLi9EYXRhc2V0XCIpLkNlbGw+fSBjZWxsc1xuICAgICAqIEBwYXJhbSB7bnVtYmVyfSByZXNvbHV0aW9uXG4gICAgICogQHBhcmFtIHtpbXBvcnQoXCIuLi9HZW9DYW52YXNcIikuR2VvQ2FudmFzfSBnZW9DYW52YXNcbiAgICAgKi9cbiAgICBkcmF3KGNlbGxzLCBnZW9DYW52YXMsIHJlc29sdXRpb24pIHtcblxuICAgICAgICAvL2ZpbHRlclxuICAgICAgICBpZiAodGhpcy5maWx0ZXIpIGNlbGxzID0gY2VsbHMuZmlsdGVyKHRoaXMuZmlsdGVyKVxuXG4gICAgICAgIC8vXG4gICAgICAgIGNvbnN0IHogPSBnZW9DYW52YXMudmlldy56XG5cbiAgICAgICAgLy9hZGQgdmVydGljZSBhbmQgZnJhZ21lbnQgZGF0YVxuICAgICAgICBjb25zdCByMiA9IHJlc29sdXRpb24gLyAyXG4gICAgICAgIGxldCBjLCBuYiA9IGNlbGxzLmxlbmd0aFxuICAgICAgICBjb25zdCB2ZXJ0aWNlc0J1ZmZlciA9IFtdXG4gICAgICAgIGNvbnN0IGlCdWZmZXIgPSBbXVxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5iOyBpKyspIHtcbiAgICAgICAgICAgIGMgPSBjZWxsc1tpXVxuICAgICAgICAgICAgY29uc3QgY2F0ID0gY1t0aGlzLmNvbG9yQ29sXVxuICAgICAgICAgICAgaWYgKGNhdCA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnVW5leHBlY3RlZCBjYXRlZ29yeTogJyArIGNhdClcbiAgICAgICAgICAgICAgICBjb250aW51ZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLyoqIEB0eXBlIHtudW1iZXJ9ICovXG4gICAgICAgICAgICBjb25zdCBpXyA9IHRoaXMuY2F0VG9JW2NhdF1cbiAgICAgICAgICAgIGlmIChpc05hTigraV8pKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1VuZXhwZWN0ZWQgY2F0ZWdvcnkgaW5kZXg6ICcgKyBjYXQgKyAnICcgKyBpXylcbiAgICAgICAgICAgICAgICBjb250aW51ZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmVydGljZXNCdWZmZXIucHVzaChjLnggKyByMiwgYy55ICsgcjIpXG4gICAgICAgICAgICBpQnVmZmVyLnB1c2goK2lfKVxuICAgICAgICB9XG5cbiAgICAgICAgLy9jcmVhdGUgY2FudmFzIGFuZCB3ZWJnbCByZW5kZXJlclxuICAgICAgICBjb25zdCBjdldHTCA9IG1ha2VXZWJHTENhbnZhcyhnZW9DYW52YXMudyArICcnLCBnZW9DYW52YXMuaCArICcnKVxuICAgICAgICBpZiAoIWN2V0dMKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdObyB3ZWJHTCcpXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuXG4gICAgICAgIC8vZHJhd1xuICAgICAgICBjb25zdCBzaXplR2VvID0gdGhpcy5zaXplID8gdGhpcy5zaXplKHJlc29sdXRpb24sIHopIDogcmVzb2x1dGlvbiArIDAuMiAqIHpcbiAgICAgICAgdGhpcy53Z3AuZHJhdyhjdldHTC5nbCwgdmVydGljZXNCdWZmZXIsIGlCdWZmZXIsIGdlb0NhbnZhcy5nZXRXZWJHTFRyYW5zZm9ybSgpLCBzaXplR2VvIC8geilcblxuICAgICAgICAvL2RyYXcgaW4gY2FudmFzIGdlb1xuICAgICAgICBnZW9DYW52YXMuaW5pdENhbnZhc1RyYW5zZm9ybSgpXG4gICAgICAgIGdlb0NhbnZhcy5jdHguZHJhd0ltYWdlKGN2V0dMLmNhbnZhcywgMCwgMClcblxuICAgICAgICAvL3VwZGF0ZSBsZWdlbmRzXG4gICAgICAgIHRoaXMudXBkYXRlTGVnZW5kcyh7IHN0eWxlOiB0aGlzLCByOiByZXNvbHV0aW9uLCB6OiB6IH0pXG4gICAgfVxufVxuIiwiLy9AdHMtY2hlY2tcbid1c2Ugc3RyaWN0J1xuXG5pbXBvcnQgeyBTdHlsZSB9IGZyb20gJy4uL1N0eWxlLmpzJ1xuaW1wb3J0IHsgbWFrZVdlYkdMQ2FudmFzIH0gZnJvbSAnLi4vdXRpbHMvd2ViR0xVdGlscy5qcydcbmltcG9ydCB7IFdlYkdMU3F1YXJlQ29sb3JpbmdBZHZhbmNlZCB9IGZyb20gJy4uL3V0aWxzL1dlYkdMU3F1YXJlQ29sb3JpbmdBZHZhbmNlZC5qcydcblxuLyoqXG4gKiBTdHlsZSBiYXNlZCBvbiB3ZWJHTFxuICogVG8gc2hvdyBjZWxscyBhcyBjb2xvcmVkIHNxdWFyZXMsIHdpdGggY29tcHV0YXRpb24gb2YgdGhlIGNvbG9ycyBvbiBHUFUgc2lkZSAoZmFzdGVyIHRoYW4gSmF2YVNjcmlwdCBzaWRlKS5cbiAqIEFsbHMgc3F1YXJlcyB3aXRoIHRoZSBzYW1lIHNpemVcbiAqXG4gKiBAYXV0aG9yIEp1bGllbiBHYWZmdXJpXG4gKi9cbmV4cG9ydCBjbGFzcyBTcXVhcmVDb2xvcldHTFN0eWxlIGV4dGVuZHMgU3R5bGUge1xuICAgIC8qKiBAcGFyYW0ge29iamVjdH0gb3B0cyAqL1xuICAgIGNvbnN0cnVjdG9yKG9wdHMpIHtcbiAgICAgICAgc3VwZXIob3B0cylcbiAgICAgICAgb3B0cyA9IG9wdHMgfHwge31cblxuICAgICAgICAvKipcbiAgICAgICAgICogQSBmdW5jdGlvbiByZXR1cm5pbmcgYSB0IHZhbHVlICh3aXRoaW4gWzAsMV0pIGZvciBhIGNlbGwuXG4gICAgICAgICAqIEB0eXBlIHtmdW5jdGlvbihpbXBvcnQoJy4uL0RhdGFzZXQuanMnKS5DZWxsLG51bWJlcixudW1iZXIsb2JqZWN0KTpudW1iZXJ9ICovXG4gICAgICAgIHRoaXMudEZ1biA9IG9wdHMudEZ1biAvLyhjLHIseix2cykgPT4ge31cblxuICAgICAgICAvKipcbiAgICAgICAgICogRGlzdHJpYnV0aW9uIHN0cmV0Y2hpbmcgbWV0aG9kLlxuICAgICAgICAgKiBUaGUgc3RyZXRjaGluZyBpcyBwZXJmb3JtZWQgb24gR1BVIHNpZGUgKGZyYWdtZW50IHNoYWRlcikuXG4gICAgICAgICAqIEB0eXBlIHt7IGZ1bjpzdHJpbmcsIGFscGhhOm51bWJlciB9fSAqL1xuICAgICAgICB0aGlzLnN0cmV0Y2hpbmcgPSBvcHRzLnN0cmV0Y2hpbmdcblxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIHNhbXBsZSBvZiB0aGUgY29sb3IgcmFtcC5cbiAgICAgICAgICogVGhlIGNvbG9yIGlzIGNvbXB1dGVkIG9uIEdQVSBzaWRlIChmcmFnbWVudCBzaGFkZXIpIGJhc2VkIG9uIHRob3NlIHZhbHVlcyAobGluZWFyIGludGVycG9sYXRpb24pLlxuICAgICAgICAgKiBAdHlwZSB7QXJyYXkuPHN0cmluZz59ICovXG4gICAgICAgIHRoaXMuY29sb3JzID1cbiAgICAgICAgICAgIG9wdHMuY29sb3JzIHx8XG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgJ3JnYigxNTgsIDEsIDY2KScsXG4gICAgICAgICAgICAgICAgJ3JnYigyNDgsIDE0MiwgODMpJyxcbiAgICAgICAgICAgICAgICAncmdiKDI1MSwgMjQ4LCAxNzYpJyxcbiAgICAgICAgICAgICAgICAncmdiKDEzNywgMjA3LCAxNjUpJyxcbiAgICAgICAgICAgICAgICAncmdiKDk0LCA3OSwgMTYyKScsXG4gICAgICAgICAgICBdLnJldmVyc2UoKVxuICAgICAgICBpZiAob3B0cy5jb2xvcilcbiAgICAgICAgICAgIHRoaXMuY29sb3JzID0gW1xuICAgICAgICAgICAgICAgIG9wdHMuY29sb3IoMCksXG4gICAgICAgICAgICAgICAgb3B0cy5jb2xvcigwLjIpLFxuICAgICAgICAgICAgICAgIG9wdHMuY29sb3IoMC40KSxcbiAgICAgICAgICAgICAgICBvcHRzLmNvbG9yKDAuNiksXG4gICAgICAgICAgICAgICAgb3B0cy5jb2xvcigwLjgpLFxuICAgICAgICAgICAgICAgIG9wdHMuY29sb3IoMSksXG4gICAgICAgICAgICBdXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIERlZmluZSB0aGUgb3BhY2l0eSBvZiB0aGUgc3R5bGUsIHdpdGhpbiBbMCwxXS5cbiAgICAgICAgICogSWYgdGhpcyBvcGFjaXR5IGlzIGRlZmluZWQsIHRoZSBpbmRpdmlkdWFsIGNvbG9yIG9wYWNpdHkgd2lsbCBiZSBpZ25vcmVkLlxuICAgICAgICAgKiBAdHlwZSB7ZnVuY3Rpb24obnVtYmVyLG51bWJlcik6bnVtYmVyfSAqL1xuICAgICAgICB0aGlzLm9wYWNpdHkgPSBvcHRzLm9wYWNpdHkgLy8gKHIseikgPT4gLi4uXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEEgZnVuY3Rpb24gcmV0dXJuaW5nIHRoZSBzaXplIG9mIHRoZSBjZWxscywgaW4gZ2VvZ3JhcGhpY2FsIHVuaXQuIEFsbCBjZWxscyBoYXZlIHRoZSBzYW1lIHNpemUuXG4gICAgICAgICAqIEB0eXBlIHtmdW5jdGlvbihudW1iZXIsbnVtYmVyKTpudW1iZXJ9ICovXG4gICAgICAgIHRoaXMuc2l6ZSA9IG9wdHMuc2l6ZSAvLyAocmVzb2x1dGlvbiwgeikgPT4gLi4uXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtBcnJheS48aW1wb3J0KFwiLi4vRGF0YXNldFwiKS5DZWxsPn0gY2VsbHNcbiAgICAgKiBAcGFyYW0ge2ltcG9ydChcIi4uL0dlb0NhbnZhc1wiKS5HZW9DYW52YXN9IGdlb0NhbnZhc1xuICAgICAqIEBwYXJhbSB7bnVtYmVyfSByZXNvbHV0aW9uXG4gICAgICovXG4gICAgZHJhdyhjZWxscywgZ2VvQ2FudmFzLCByZXNvbHV0aW9uKSB7XG5cbiAgICAgICAgLy9maWx0ZXJcbiAgICAgICAgaWYgKHRoaXMuZmlsdGVyKSBjZWxscyA9IGNlbGxzLmZpbHRlcih0aGlzLmZpbHRlcilcblxuICAgICAgICAvL1xuICAgICAgICBjb25zdCB6ID0gZ2VvQ2FudmFzLnZpZXcuelxuXG4gICAgICAgIC8vZ2V0IHZpZXcgc2NhbGVcbiAgICAgICAgY29uc3Qgdmlld1NjYWxlID0gdGhpcy52aWV3U2NhbGUgPyB0aGlzLnZpZXdTY2FsZShjZWxscywgcmVzb2x1dGlvbiwgeikgOiB1bmRlZmluZWRcblxuICAgICAgICAvL2NyZWF0ZSBjYW52YXMgYW5kIHdlYmdsIHJlbmRlcmVyXG4gICAgICAgIC8vZm9yIG9wYWNpdHkgY29udHJvbCwgc2VlOiBodHRwczovL3dlYmdsZnVuZGFtZW50YWxzLm9yZy93ZWJnbC9sZXNzb25zL3dlYmdsLWFuZC1hbHBoYS5odG1sXG4gICAgICAgIGNvbnN0IGN2V0dMID0gbWFrZVdlYkdMQ2FudmFzKFxuICAgICAgICAgICAgZ2VvQ2FudmFzLncgKyAnJyxcbiAgICAgICAgICAgIGdlb0NhbnZhcy5oICsgJycsXG4gICAgICAgICAgICB0aGlzLm9wYWNpdHkgIT0gdW5kZWZpbmVkID8geyBwcmVtdWx0aXBsaWVkQWxwaGE6IGZhbHNlIH0gOiB1bmRlZmluZWRcbiAgICAgICAgKVxuICAgICAgICBpZiAoIWN2V0dMKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdObyB3ZWJHTCcpXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuXG4gICAgICAgIC8vYWRkIHZlcnRpY2UgYW5kIGZyYWdtZW50IGRhdGFcbiAgICAgICAgY29uc3QgcjIgPSByZXNvbHV0aW9uIC8gMlxuICAgICAgICBjb25zdCB2ZXJ0aWNlc0J1ZmZlciA9IFtdXG4gICAgICAgIGNvbnN0IHRCdWZmZXIgPSBbXVxuICAgICAgICBmb3IgKGxldCBjZWxsIG9mIGNlbGxzKSB7XG4gICAgICAgICAgICBjb25zdCB0ID0gdGhpcy50RnVuKGNlbGwsIHJlc29sdXRpb24sIHosIHZpZXdTY2FsZSlcbiAgICAgICAgICAgIGlmICh0ID09IG51bGwgfHwgdCA9PSB1bmRlZmluZWQpIGNvbnRpbnVlXG4gICAgICAgICAgICB2ZXJ0aWNlc0J1ZmZlci5wdXNoKGNlbGwueCArIHIyLCBjZWxsLnkgKyByMilcbiAgICAgICAgICAgIHRCdWZmZXIucHVzaCh0ID4gMSA/IDEgOiB0IDwgMCA/IDAgOiB0KVxuICAgICAgICB9XG5cbiAgICAgICAgLy9jb21wdXRlIHBpeGVsIHNpemVcbiAgICAgICAgY29uc3Qgc2l6ZUdlbyA9IHRoaXMuc2l6ZSA/IHRoaXMuc2l6ZShyZXNvbHV0aW9uLCB6KSA6IHJlc29sdXRpb24gKyAwLjIgKiB6XG5cbiAgICAgICAgLy9jb21wdXRlIG9wYWNpdHlcbiAgICAgICAgY29uc3Qgb3AgPSB0aGlzLm9wYWNpdHkgPyB0aGlzLm9wYWNpdHkocmVzb2x1dGlvbiwgeikgOiB1bmRlZmluZWRcblxuICAgICAgICAvL1xuICAgICAgICBjb25zdCB3Z3AgPSBuZXcgV2ViR0xTcXVhcmVDb2xvcmluZ0FkdmFuY2VkKGN2V0dMLmdsLCB0aGlzLmNvbG9ycywgdGhpcy5zdHJldGNoaW5nLCBzaXplR2VvIC8geiwgb3ApXG5cbiAgICAgICAgLy9kcmF3XG4gICAgICAgIHdncC5kcmF3KHZlcnRpY2VzQnVmZmVyLCB0QnVmZmVyLCBnZW9DYW52YXMuZ2V0V2ViR0xUcmFuc2Zvcm0oKSlcblxuICAgICAgICAvL2RyYXcgaW4gY2FudmFzIGdlb1xuICAgICAgICBnZW9DYW52YXMuaW5pdENhbnZhc1RyYW5zZm9ybSgpXG4gICAgICAgIGdlb0NhbnZhcy5jdHguZHJhd0ltYWdlKGN2V0dMLmNhbnZhcywgMCwgMClcblxuICAgICAgICAvL3VwZGF0ZSBsZWdlbmRzXG4gICAgICAgIHRoaXMudXBkYXRlTGVnZW5kcyh7IHN0eWxlOiB0aGlzLCByOiByZXNvbHV0aW9uLCB6OiB6LCB2aWV3U2NhbGU6IHZpZXdTY2FsZSB9KVxuICAgIH1cbn1cbiIsIi8vQHRzLWNoZWNrXG4ndXNlIHN0cmljdCdcblxuaW1wb3J0IHsgU3R5bGUgfSBmcm9tICcuLi9TdHlsZS5qcydcblxuLyoqXG4gKlxuICogQGF1dGhvciBKdWxpZW4gR2FmZnVyaVxuICovXG5leHBvcnQgY2xhc3MgU3Ryb2tlU3R5bGUgZXh0ZW5kcyBTdHlsZSB7XG4gICAgLyoqIEBwYXJhbSB7b2JqZWN0fSBvcHRzICovXG4gICAgY29uc3RydWN0b3Iob3B0cykge1xuICAgICAgICBzdXBlcihvcHRzKVxuICAgICAgICBvcHRzID0gb3B0cyB8fCB7fVxuXG4gICAgICAgIC8qKiBBIGZ1bmN0aW9uIHJldHVybmluZyB0aGUgY29sb3Igb2YgdGhlIGNlbGwuXG4gICAgICAgICAqIEB0eXBlIHtmdW5jdGlvbihpbXBvcnQoJy4uL0RhdGFzZXQuanMnKS5DZWxsLG51bWJlcixudW1iZXIsb2JqZWN0KTpzdHJpbmd9ICovXG4gICAgICAgIHRoaXMuc3Ryb2tlQ29sb3IgPSBvcHRzLnN0cm9rZUNvbG9yIHx8ICgoKSA9PiBcIiM2NjZcIikgLy8oYyxyLHosdnMpID0+IHt9XG5cbiAgICAgICAgLyoqIEEgZnVuY3Rpb24gcmV0dXJuaW5nIHRoZSBzaXplIG9mIGEgY2VsbCBpbiBnZW9ncmFwaGljYWwgdW5pdC5cbiAgICAgICAgICogQHR5cGUge2Z1bmN0aW9uKGltcG9ydCgnLi4vRGF0YXNldC5qcycpLkNlbGwsbnVtYmVyLG51bWJlcixvYmplY3QpOm51bWJlcn0gKi9cbiAgICAgICAgdGhpcy5zaXplID0gb3B0cy5zaXplIHx8ICgoY2VsbCwgcmVzb2x1dGlvbikgPT4gcmVzb2x1dGlvbikgLy8oYyxyLHosdnMpID0+IHt9XG5cbiAgICAgICAgLyoqIFRoZSBzdHJva2UgbGluZSB3aWR0aCBpbiBnZW9ncmFwaGljYWwgdW5pdC5cbiAgICAgICAgICogQHR5cGUge2Z1bmN0aW9uKGltcG9ydCgnLi4vRGF0YXNldC5qcycpLkNlbGwsbnVtYmVyLG51bWJlcixvYmplY3QpOm51bWJlcn0gKi9cbiAgICAgICAgdGhpcy5zdHJva2VXaWR0aCA9IG9wdHMuc3Ryb2tlV2lkdGggfHwgKChjZWxsLCByZXNvbHV0aW9uLCB6KSA9PiB6ICogMS41KSAvLyhjLHIseix2cykgPT4ge31cblxuICAgICAgICAvKiogQSBmdW5jdGlvbiByZXR1cm5pbmcgdGhlIHNoYXBlIG9mIGEgY2VsbC5cbiAgICAgICAgKiBAdHlwZSB7ZnVuY3Rpb24oaW1wb3J0KFwiLi4vRGF0YXNldC5qc1wiKS5DZWxsLG51bWJlcixudW1iZXIsb2JqZWN0KTppbXBvcnQoXCIuLi9TdHlsZS5qc1wiKS5TaGFwZX0gKi9cbiAgICAgICAgdGhpcy5zaGFwZSA9IG9wdHMuc2hhcGUgfHwgKCgpID0+IFwic3F1YXJlXCIpIC8vKGMscix6LHZzKSA9PiB7fVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERyYXcgY2VsbHMgYXMgc3F1YXJlcywgd2l0aCB2YXJpb3VzIGNvbG9ycyBhbmQgc2l6ZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7QXJyYXkuPGltcG9ydChcIi4uL0RhdGFzZXRcIikuQ2VsbD59IGNlbGxzXG4gICAgICogQHBhcmFtIHtpbXBvcnQoXCIuLi9HZW9DYW52YXNcIikuR2VvQ2FudmFzfSBnZW9DYW52YXNcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gcmVzb2x1dGlvblxuICAgICAqL1xuICAgIGRyYXcoY2VsbHMsIGdlb0NhbnZhcywgcmVzb2x1dGlvbikge1xuICAgICAgICAvL2ZpbHRlclxuICAgICAgICBpZiAodGhpcy5maWx0ZXIpIGNlbGxzID0gY2VsbHMuZmlsdGVyKHRoaXMuZmlsdGVyKVxuXG4gICAgICAgIC8vXG4gICAgICAgIGNvbnN0IHogPSBnZW9DYW52YXMudmlldy56XG5cbiAgICAgICAgLy9nZXQgdmlldyBzY2FsZVxuICAgICAgICBjb25zdCB2aWV3U2NhbGUgPSB0aGlzLnZpZXdTY2FsZSA/IHRoaXMudmlld1NjYWxlKGNlbGxzLCByZXNvbHV0aW9uLCB6KSA6IHVuZGVmaW5lZFxuXG4gICAgICAgIGNvbnN0IHIyID0gcmVzb2x1dGlvbiAqIDAuNVxuICAgICAgICBmb3IgKGxldCBjZWxsIG9mIGNlbGxzKSB7XG5cbiAgICAgICAgICAgIC8vY29sb3JcbiAgICAgICAgICAgIGNvbnN0IGNvbCA9IHRoaXMuc3Ryb2tlQ29sb3IgPyB0aGlzLnN0cm9rZUNvbG9yKGNlbGwsIHJlc29sdXRpb24sIHosIHZpZXdTY2FsZSkgOiB1bmRlZmluZWRcbiAgICAgICAgICAgIGlmICghY29sIHx8IGNvbCA9PT0gJ25vbmUnKSBjb250aW51ZVxuICAgICAgICAgICAgZ2VvQ2FudmFzLmN0eC5zdHJva2VTdHlsZSA9IGNvbFxuXG4gICAgICAgICAgICAvL3NpemUgLSBpbiBnZW8gdW5pdFxuICAgICAgICAgICAgY29uc3Qgc0cgPSB0aGlzLnNpemUgPyB0aGlzLnNpemUoY2VsbCwgcmVzb2x1dGlvbiwgeiwgdmlld1NjYWxlKSA6IHJlc29sdXRpb25cblxuICAgICAgICAgICAgLy93aWR0aFxuICAgICAgICAgICAgY29uc3Qgd2kgPSB0aGlzLnN0cm9rZVdpZHRoID8gdGhpcy5zdHJva2VXaWR0aChjZWxsLCByZXNvbHV0aW9uLCB6LCB2aWV3U2NhbGUpIDogMSAqIHpcbiAgICAgICAgICAgIGlmICghd2kgfHwgd2kgPD0gMCkgY29udGludWVcbiAgICAgICAgICAgIGdlb0NhbnZhcy5jdHgubGluZVdpZHRoID0gd2lcblxuICAgICAgICAgICAgLy9zaGFwZVxuICAgICAgICAgICAgY29uc3Qgc2hhcGUgPSB0aGlzLnNoYXBlID8gdGhpcy5zaGFwZShjZWxsLCByZXNvbHV0aW9uLCB6LCB2aWV3U2NhbGUpIDogJ3NxdWFyZSdcbiAgICAgICAgICAgIGlmIChzaGFwZSA9PT0gJ25vbmUnKSBjb250aW51ZVxuXG4gICAgICAgICAgICAvL2dldCBvZmZzZXRcbiAgICAgICAgICAgIGNvbnN0IG9mZnNldCA9IHRoaXMub2Zmc2V0KGNlbGwsIHJlc29sdXRpb24sIHopXG5cbiAgICAgICAgICAgIGlmIChzaGFwZSA9PT0gJ3NxdWFyZScpIHtcbiAgICAgICAgICAgICAgICAvL2RyYXcgc3F1YXJlXG4gICAgICAgICAgICAgICAgY29uc3QgZCA9IHJlc29sdXRpb24gKiAoMSAtIHNHIC8gcmVzb2x1dGlvbikgKiAwLjVcbiAgICAgICAgICAgICAgICBnZW9DYW52YXMuY3R4LmJlZ2luUGF0aCgpXG4gICAgICAgICAgICAgICAgZ2VvQ2FudmFzLmN0eC5yZWN0KGNlbGwueCArIGQgKyBvZmZzZXQuZHgsIGNlbGwueSArIGQgKyBvZmZzZXQuZHksIHNHLCBzRylcbiAgICAgICAgICAgICAgICBnZW9DYW52YXMuY3R4LnN0cm9rZSgpXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHNoYXBlID09PSAnY2lyY2xlJykge1xuICAgICAgICAgICAgICAgIC8vZHJhdyBjaXJjbGVcbiAgICAgICAgICAgICAgICBnZW9DYW52YXMuY3R4LmJlZ2luUGF0aCgpXG4gICAgICAgICAgICAgICAgZ2VvQ2FudmFzLmN0eC5hcmMoY2VsbC54ICsgcjIgKyBvZmZzZXQuZHgsIGNlbGwueSArIHIyICsgb2Zmc2V0LmR5LCBzRyAqIDAuNSwgMCwgMiAqIE1hdGguUEksIGZhbHNlKVxuICAgICAgICAgICAgICAgIGdlb0NhbnZhcy5jdHguc3Ryb2tlKClcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc2hhcGUgPT09ICdkaWFtb25kJykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHMyID0gc0cgKiAwLjVcbiAgICAgICAgICAgICAgICBnZW9DYW52YXMuY3R4LmJlZ2luUGF0aCgpXG4gICAgICAgICAgICAgICAgZ2VvQ2FudmFzLmN0eC5tb3ZlVG8oY2VsbC54ICsgcjIgLSBzMiwgY2VsbC55ICsgcjIpXG4gICAgICAgICAgICAgICAgZ2VvQ2FudmFzLmN0eC5saW5lVG8oY2VsbC54ICsgcjIsIGNlbGwueSArIHIyICsgczIpXG4gICAgICAgICAgICAgICAgZ2VvQ2FudmFzLmN0eC5saW5lVG8oY2VsbC54ICsgcjIgKyBzMiwgY2VsbC55ICsgcjIpXG4gICAgICAgICAgICAgICAgZ2VvQ2FudmFzLmN0eC5saW5lVG8oY2VsbC54ICsgcjIsIGNlbGwueSArIHIyIC0gczIpXG4gICAgICAgICAgICAgICAgZ2VvQ2FudmFzLmN0eC5saW5lVG8oY2VsbC54ICsgcjIgLSBzMiwgY2VsbC55ICsgcjIpXG4gICAgICAgICAgICAgICAgZ2VvQ2FudmFzLmN0eC5zdHJva2UoKVxuICAgICAgICAgICAgfSBlbHNlIGlmIChzaGFwZSA9PT0gJ2RvbnV0Jykge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ05vdCBpbXBsZW1lbnRlZCcpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVW5leHBlY3RlZCBzaGFwZTonICsgc2hhcGUpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvL3VwZGF0ZSBsZWdlbmRzXG4gICAgICAgIC8vVE9ET1xuICAgIH1cbn1cbiIsIi8vQHRzLWNoZWNrXG4ndXNlIHN0cmljdCdcblxuaW1wb3J0IHsgU3F1YXJlQ29sb3JXR0xTdHlsZSB9IGZyb20gJy4vU3F1YXJlQ29sb3JXR0xTdHlsZS5qcydcbmltcG9ydCB7IFNpZGVTdHlsZSB9IGZyb20gJy4vU2lkZVN0eWxlLmpzJ1xuXG4vKipcbiAqXG4gKiBAc2VlIGh0dHBzOi8vbWFuaWZvbGQubmV0L2RvYy9tZmQ5L2V4YW1wbGVfX3RhbmFrYV9jb250b3Vycy5odG1cbiAqXG4gKiBAYXV0aG9yIEp1bGllbiBHYWZmdXJpXG4gKi9cbmV4cG9ydCBjbGFzcyBUYW5ha2FTdHlsZSB7XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNvbFxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRzXG4gICAgICogQHJldHVybnMge0FycmF5LjxpbXBvcnQoXCIuLi9TdHlsZVwiKS5TdHlsZT59XG4gICAgICovXG4gICAgc3RhdGljIGdldChjb2wsIG9wdHMpIHtcbiAgICAgICAgb3B0cyA9IG9wdHMgfHwge31cblxuICAgICAgICAvL2dldCBjb2xvcnMgZnJvbSBkMyByYW1wcywgaWYgJ25iJyBpcyBzcGVjaWZpZWRcbiAgICAgICAgaWYgKG9wdHMubmIgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBpZiAob3B0cy5uYiA8IDIpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCd1bmV4cGVjdGVkIG51bWJlciBvZiBjb2xvcnMgaW4gdGFuYWthICg8Mik6ICcgKyBvcHRzLm5iKVxuICAgICAgICAgICAgICAgIG9wdHMubmIgPSAyXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIW9wdHMuY29sb3IpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdjb2xvciBmdW5jdGlvbiBub3QgZGVmaW5lZCBpbiB0YW5ha2EnKVxuICAgICAgICAgICAgICAgIG9wdHMuY29sb3IgPSAoKSA9PiAnZ3JheSdcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9wdHMuY29sb3JzID0gW11cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb3B0cy5uYjsgaSsrKSBvcHRzLmNvbG9ycy5wdXNoKG9wdHMuY29sb3IoaSAvIChvcHRzLm5iIC0gMSkpKVxuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBjb2xvcnMuXG4gICAgICAgICAqIEB0eXBlIHtBcnJheS48c3RyaW5nPn0gKi9cbiAgICAgICAgb3B0cy5jb2xvcnMgPSBvcHRzLmNvbG9ycyB8fCBbJyNhOWJiOWUnLCAnI2M5ZGNhYScsICcjZmRlODlmJywgJyNmOWE1NzknLCAnI2ViNDQ0YiddXG4gICAgICAgIGNvbnN0IG5iID0gb3B0cy5jb2xvcnMubGVuZ3RoXG5cbiAgICAgICAgLyoqIEEgZnVuY3Rpb24gdG8gY29tcHV0ZSAndCcgZnJvbSB0aGUgdmFsdWUgdlxuICAgICAgICAgKiBAdHlwZSB7ZnVuY3Rpb24obnVtYmVyLG51bWJlcixpbXBvcnQoXCIuLi9TdHlsZVwiKS5TdGF0KTpudW1iZXJ9ICovXG4gICAgICAgIG9wdHMudEZ1biA9IG9wdHMudEZ1biB8fCAoKHYsIHIsIHMpID0+ICh2IC0gcy5taW4pIC8gKHMubWF4IC0gcy5taW4pKVxuXG4gICAgICAgIC8vc2hhZG93IGNvbG9yc1xuICAgICAgICBvcHRzLmNvbERhcmsgPSBvcHRzLmNvbERhcmsgfHwgJyMxMTEnXG4gICAgICAgIG9wdHMuY29sQnJpZ2h0ID0gb3B0cy5jb2xCcmlnaHQgfHwgJyNkZGQnXG5cbiAgICAgICAgLy93aWR0aCBvZiB0aGUgc2VnbWVudCAoc2hhcmUgb2YgdGhlIHJlc29sdXRpb24pXG4gICAgICAgIG9wdHMud2lkdGhGYWN0b3IgPSBvcHRzLndpZHRoRmFjdG9yIHx8IDAuMDhcblxuICAgICAgICAvL3NoYWRpbmdcbiAgICAgICAgb3B0cy5uZXdTaGFkaW5nID0gb3B0cy5uZXdTaGFkaW5nXG4gICAgICAgIG9wdHMubmV3U2hhZGluZ1dpZHRoUGl4ID0gb3B0cy5uZXdTaGFkaW5nV2lkdGhQaXggfHwgMlxuICAgICAgICAvL3RyYW5zcGFyZW5jeSB2YWx1ZSwgd2l0aGluIFswLDFdXG4gICAgICAgIG9wdHMubmV3U2hhZGluZ1RyID1cbiAgICAgICAgICAgIG9wdHMubmV3U2hhZGluZ1RyIHx8XG4gICAgICAgICAgICAoKHNpZGVWYWx1ZSwgc2lkZVN0YXQpID0+XG4gICAgICAgICAgICAgICAgTWF0aC5hYnMoc2lkZVZhbHVlKSAvIE1hdGgubWF4KE1hdGguYWJzKHNpZGVTdGF0Lm1pbiksIE1hdGguYWJzKHNpZGVTdGF0Lm1heCkpKVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gdCBBIGNlbGwgdCB2YWx1ZSwgd2l0aGluIFswLDFdLlxuICAgICAgICAgKiBAcmV0dXJucyB0aGUgY2xhc3MgbnVtYmVyIGZvciB0aGUgdmFsdWVcbiAgICAgICAgICovXG4gICAgICAgIGNvbnN0IGdldENsYXNzID0gKHQpID0+IHtcbiAgICAgICAgICAgIGlmIChpc05hTih0KSB8fCB0ID09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1VuZXhwZWN0ZWQgdCB2YWx1ZSAxOiAnICsgdClcbiAgICAgICAgICAgICAgICByZXR1cm4gLTlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbmI7IGkrKykgaWYgKHQgPD0gKGkgKyAxKSAvIG5iKSByZXR1cm4gaVxuICAgICAgICAgICAgY29uc29sZS5lcnJvcignVW5leHBlY3RlZCB0IHZhbHVlIDI6ICcgKyB0KVxuICAgICAgICAgICAgcmV0dXJuIC05XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjb2xTdHlsZSA9IG5ldyBTcXVhcmVDb2xvcldHTFN0eWxlKHtcbiAgICAgICAgICAgIGNvbG9yQ29sOiBjb2wsXG4gICAgICAgICAgICBjb2xvcnM6IG9wdHMuY29sb3JzLFxuICAgICAgICAgICAgdEZ1bjogKHYsIHIsIHMpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB0ID0gb3B0cy50RnVuKHYsIHIsIHMpXG4gICAgICAgICAgICAgICAgY29uc3QgYyA9IGdldENsYXNzKHQpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGMgLyAobmIgLSAxKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8vc3RyZXRjaGluZzogeyBmdW46IFwibG9nXCIsIGFscGhhOiAtNyB9LFxuICAgICAgICAgICAgc2l6ZTogKHIsIHopID0+IHIgKyAwLjUgKiB6LCAvL3RoYXQgaXMgdG8gZW5zdXJlIG5vIGdhcCBiZXR3ZWVuIHNhbWUgY2xhc3MgY2VsbHMgaXMgdmlzaWJsZVxuICAgICAgICAgICAgZmlsdGVyOiBvcHRzLmZpbHRlcixcbiAgICAgICAgfSlcblxuICAgICAgICAvKlxuICAgICAgICBpZiBubyB3ZWIgZ2w6ICAgIFxuICAgICAgICAgICAgY29uc3QgY29sU3R5bGUgPSBuZXcgU2hhcGVDb2xvclNpemVTdHlsZSh7XG4gICAgICAgICAgICAgICAgY29sb3JDb2w6IGNvbCxcbiAgICAgICAgICAgICAgICAvL3RoZSBjb2xvciBjb3JyZXNwb25kaW5nIHRvIHRoZSBjbGFzc1xuICAgICAgICAgICAgICAgIGNvbG9yOiAodiwgciwgcywgeikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAodiA9PSAwICYmIG9wdHMudEZ1biAmJiBpc05hTihvcHRzLnRGdW4odiwgciwgcykpKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZFxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gb3B0cy5jb2xvcnNbZ2V0Q2xhc3Mob3B0cy50RnVuID8gb3B0cy50RnVuKHYsIHIsIHMpIDogdildXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzaGFwZTogKCkgPT4gXCJzcXVhcmVcIixcbiAgICAgICAgICAgICAgICBzaXplOiAodiwgciwgcywgeikgPT4gciArIDAuNSAqIHosIC8vdGhhdCBpcyB0byBlbnN1cmUgbm8gZ2FwIGJldHdlZW4gc2FtZSBjbGFzcyBjZWxscyBpcyB2aXNpYmxlXG4gICAgICAgICAgICB9KVxuICAgICAgICAqL1xuXG4gICAgICAgIC8qKiBUaGUgc2lkZSBzdHlsZSwgZm9yIHRoZSBzaGFkb3cgZWZmZWN0ICovXG4gICAgICAgIGNvbnN0IHNpZGVTdHlsZSA9IG5ldyBTaWRlU3R5bGUoe1xuICAgICAgICAgICAgdmFsdWVDb2w6IGNvbCxcbiAgICAgICAgICAgIHZhbHVlOiAodjEsIHYyLCByLCBzLCB6KSA9PiB7XG4gICAgICAgICAgICAgICAgLy9jb21wdXRlIHRoZSBudW1iZXIgb2YgY2xhc3NlcyBvZiBkaWZmZXJlbmNlXG4gICAgICAgICAgICAgICAgaWYgKHYxID09PSB1bmRlZmluZWQgJiYgdjIgPT09IHVuZGVmaW5lZCkgcmV0dXJuIDBcbiAgICAgICAgICAgICAgICBlbHNlIGlmICh2MiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHQgPSBvcHRzLnRGdW4odjEsIHIsIHMpXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ID09IHVuZGVmaW5lZCB8fCBpc05hTih0KSkgdGhyb3cgbmV3IEVycm9yKCdVbmV4cGVjdGVkIHZhbHVlOiAnICsgdjEgKyAnIC0gJyArIHQpXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGMgPSBnZXRDbGFzcyh0KVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYyArIDFcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHYxID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdCA9IG9wdHMudEZ1bih2MiwgciwgcylcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgPT0gdW5kZWZpbmVkIHx8IGlzTmFOKHQpKSB0aHJvdyBuZXcgRXJyb3IoJ1VuZXhwZWN0ZWQgdmFsdWU6ICcgKyB2MiArICcgLSAnICsgdClcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYyA9IGdldENsYXNzKHQpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAtYyAtIDFcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgdDEgPSBvcHRzLnRGdW4odjEsIHIsIHMpXG4gICAgICAgICAgICAgICAgaWYgKHQxID09IHVuZGVmaW5lZCB8fCBpc05hTih0MSkpIHRocm93IG5ldyBFcnJvcignVW5leHBlY3RlZCB2YWx1ZTogJyArIHYxICsgJyAtICcgKyB0MSlcbiAgICAgICAgICAgICAgICBjb25zdCB0MiA9IG9wdHMudEZ1bih2MiwgciwgcylcbiAgICAgICAgICAgICAgICBpZiAodDIgPT0gdW5kZWZpbmVkIHx8IGlzTmFOKHQyKSkgdGhyb3cgbmV3IEVycm9yKCdVbmV4cGVjdGVkIHZhbHVlOiAnICsgdjIgKyAnIC0gJyArIHQyKVxuICAgICAgICAgICAgICAgIGNvbnN0IGMxID0gZ2V0Q2xhc3ModDEpXG4gICAgICAgICAgICAgICAgY29uc3QgYzIgPSBnZXRDbGFzcyh0MilcbiAgICAgICAgICAgICAgICByZXR1cm4gLWMyICsgYzFcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGNvbG9yOiBvcHRzLm5ld1NoYWRpbmdcbiAgICAgICAgICAgICAgICA/IC8vYmxhY2sgd2l0aCB0cmFuc3BhcmVuY3kgZGVwZW5kaW5nIG9uIGRpZmZlcmVuY2VcbiAgICAgICAgICAgICAgICAgIChzaWRlLCByLCBzLCB6KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgY29uc3QgdHIgPSBvcHRzLm5ld1NoYWRpbmdUcihzaWRlLnZhbHVlLCBzKVxuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoc2lkZS52YWx1ZSA+IDAgJiYgc2lkZS5vciA9PT0gJ2gnKSB8fCAoc2lkZS52YWx1ZSA8IDAgJiYgc2lkZS5vciA9PT0gJ3YnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICA/ICdyZ2JhKDI1NSwyNTUsMTAwLCcgKyB0ciArICcpJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICA6ICdyZ2JhKDAsMCwwLCcgKyB0ciArICcpJ1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIDogLy93aGl0ZSBvciBibGFjaywgZGVwZW5kaW5nIG9uIG9yaWVudGF0aW9uIGFuZCB2YWx1ZVxuICAgICAgICAgICAgICAgICAgKHNpZGUsIHIsIHMsIHopID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICBpZiAoc2lkZS52YWx1ZSA9PT0gMCkgcmV0dXJuXG4gICAgICAgICAgICAgICAgICAgICAgLy9yZXR1cm4gXCJncmF5XCJcbiAgICAgICAgICAgICAgICAgICAgICBpZiAoc2lkZS5vciA9PT0gJ3YnKSByZXR1cm4gc2lkZS52YWx1ZSA8IDAgPyBvcHRzLmNvbEJyaWdodCA6IG9wdHMuY29sRGFya1xuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzaWRlLnZhbHVlIDwgMCA/IG9wdHMuY29sRGFyayA6IG9wdHMuY29sQnJpZ2h0XG4gICAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICB3aWR0aDogb3B0cy5uZXdTaGFkaW5nXG4gICAgICAgICAgICAgICAgPyAvL2ZpbGwgc2l6ZVxuICAgICAgICAgICAgICAgICAgKHNpZGUsIHIsIHMsIHopID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gb3B0cy5uZXdTaGFkaW5nV2lkdGhQaXggKiB6XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgOiAvL3dpZHRoIGRlcGVuZHMgb24gdGhlIHZhbHVlLCB0aGF0IGlzIHRoZSBudW1iZXIgb2YgY2xhc3NlcyBvZiBkaWZmZXJlbmNlXG4gICAgICAgICAgICAgICAgICAoc2lkZSwgciwgcywgeikgPT5cbiAgICAgICAgICAgICAgICAgICAgICBvcHRzLndpZHRoRmFjdG9yICogciAqIE1hdGguYWJzKHNpZGUudmFsdWUpICogKHNpZGUub3IgPT09ICd2JyA/IDAuNSA6IDEpLFxuXG4gICAgICAgICAgICBmaWx0ZXI6IG9wdHMuZmlsdGVyLFxuICAgICAgICB9KVxuXG4gICAgICAgIHJldHVybiBbY29sU3R5bGUsIHNpZGVTdHlsZV1cbiAgICB9XG59XG4iLCIvL0B0cy1jaGVja1xuJ3VzZSBzdHJpY3QnXG5cbmltcG9ydCB7IFN0eWxlIH0gZnJvbSAnLi4vU3R5bGUuanMnXG5cbi8qKlxuICpcbiAqIEBhdXRob3IgSnVsaWVuIEdhZmZ1cmlcbiAqL1xuZXhwb3J0IGNsYXNzIFRleHRTdHlsZSBleHRlbmRzIFN0eWxlIHtcbiAgICAvKiogQHBhcmFtIHtvYmplY3R9IG9wdHMgKi9cbiAgICBjb25zdHJ1Y3RvcihvcHRzKSB7XG4gICAgICAgIHN1cGVyKG9wdHMpXG4gICAgICAgIG9wdHMgPSBvcHRzIHx8IHt9XG5cbiAgICAgICAgLyoqIFRoZSBuYW1lIG9mIHRoZSBjb2x1bW4vYXR0cmlidXRlIG9mIHRoZSB0YWJ1bGFyIGRhdGEgd2hlcmUgdG8gcmV0cmlldmUgdGhlIHZhcmlhYmxlIGZvciB0ZXh0LlxuICAgICAgICAgKiBAdHlwZSB7c3RyaW5nfSAqL1xuICAgICAgICB0aGlzLnRleHRDb2wgPSBvcHRzLnRleHRDb2xcblxuICAgICAgICAvKiogQSBmdW5jdGlvbiByZXR1cm5pbmcgdGhlIHRleHQgb2YgYSBjZWxsLlxuICAgICAgICAgKiBAdHlwZSB7ZnVuY3Rpb24obnVtYmVyLG51bWJlcixpbXBvcnQoXCIuLi9TdHlsZVwiKS5TdGF0fHVuZGVmaW5lZCxudW1iZXIpOnN0cmluZ30gKi9cbiAgICAgICAgdGhpcy50ZXh0ID0gb3B0cy50ZXh0IHx8ICgodiwgciwgcywgeikgPT4gJ1gnKVxuXG4gICAgICAgIC8qKiBUaGUgbmFtZSBvZiB0aGUgY29sdW1uL2F0dHJpYnV0ZSBvZiB0aGUgdGFidWxhciBkYXRhIHdoZXJlIHRvIHJldHJpZXZlIHRoZSB2YXJpYWJsZSBmb3IgY29sb3IuXG4gICAgICAgICAqIEB0eXBlIHtzdHJpbmd9ICovXG4gICAgICAgIHRoaXMuY29sb3JDb2wgPSBvcHRzLmNvbG9yQ29sXG5cbiAgICAgICAgLyoqIEEgZnVuY3Rpb24gcmV0dXJuaW5nIHRoZSBjb2xvciBvZiB0aGUgY2VsbC5cbiAgICAgICAgICogQHR5cGUge2Z1bmN0aW9uKG51bWJlcixudW1iZXIsaW1wb3J0KFwiLi4vU3R5bGVcIikuU3RhdHx1bmRlZmluZWQsbnVtYmVyKTpzdHJpbmd9ICovXG4gICAgICAgIHRoaXMuY29sb3IgPSBvcHRzLmNvbG9yIHx8ICgoKSA9PiAnI0VBNkJBQycpXG5cbiAgICAgICAgLyoqIFRoZSBuYW1lIG9mIHRoZSBjb2x1bW4vYXR0cmlidXRlIG9mIHRoZSB0YWJ1bGFyIGRhdGEgd2hlcmUgdG8gcmV0cmlldmUgdGhlIHZhcmlhYmxlIGZvciBmb250IHNpemUuXG4gICAgICAgICAqIEB0eXBlIHtzdHJpbmd9ICovXG4gICAgICAgIHRoaXMuZm9udFNpemVDb2wgPSBvcHRzLmZvbnRTaXplQ29sXG5cbiAgICAgICAgLyoqIEEgZnVuY3Rpb24gcmV0dXJuaW5nIHRoZSBmb250IHNpemUgb2YgYSBjZWxsIGluIGdlbyB1bml0LlxuICAgICAgICAgKiBAdHlwZSB7ZnVuY3Rpb24obnVtYmVyLG51bWJlcixpbXBvcnQoXCIuLi9TdHlsZVwiKS5TdGF0fHVuZGVmaW5lZCxudW1iZXIpOm51bWJlcn0gKi9cbiAgICAgICAgdGhpcy5mb250U2l6ZSA9IG9wdHMuZm9udFNpemUgfHwgKCh2LCByLCBzLCB6KSA9PiByICogMC44KVxuXG4gICAgICAgIC8qKiBUaGUgdGV4dCBmb250IGZhbWlseS5cbiAgICAgICAgICogQHR5cGUge3N0cmluZ30gKi9cbiAgICAgICAgdGhpcy5mb250RmFtaWx5ID0gb3B0cy5mb250RmFtaWx5IHx8ICdBcmlhbCdcblxuICAgICAgICAvKiogVGhlIHRleHQgZm9udCB3ZWlnaHQuXG4gICAgICAgICAqIEB0eXBlIHtzdHJpbmd9ICovXG4gICAgICAgIHRoaXMuZm9udFdlaWdodCA9IG9wdHMuZm9udFdlaWdodCB8fCAnYm9sZCdcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEcmF3IGNlbGxzIGFzIHRleHQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0FycmF5LjxpbXBvcnQoXCIuLi9EYXRhc2V0XCIpLkNlbGw+fSBjZWxsc1xuICAgICAqIEBwYXJhbSB7bnVtYmVyfSByZXNvbHV0aW9uXG4gICAgICogQHBhcmFtIHtpbXBvcnQoXCIuLi9HZW9DYW52YXNcIikuR2VvQ2FudmFzfSBnZW9DYW52YXNcbiAgICAgKi9cbiAgICBkcmF3KGNlbGxzLCBnZW9DYW52YXMsIHJlc29sdXRpb24pIHtcbiAgICAgICAgLy9maWx0ZXJcbiAgICAgICAgaWYgKHRoaXMuZmlsdGVyKSBjZWxscyA9IGNlbGxzLmZpbHRlcih0aGlzLmZpbHRlcilcblxuICAgICAgICAvL1xuICAgICAgICBjb25zdCB6ID0gZ2VvQ2FudmFzLnZpZXcuelxuXG4gICAgICAgIGxldCBzdGF0VGV4dFxuICAgICAgICBpZiAodGhpcy50ZXh0Q29sKSB7XG4gICAgICAgICAgICAvL2NvbXB1dGUgdGV4dCB2YXJpYWJsZSBzdGF0aXN0aWNzXG4gICAgICAgICAgICBzdGF0VGV4dCA9IFN0eWxlLmdldFN0YXRpc3RpY3MoY2VsbHMsIChjKSA9PiBjW3RoaXMudGV4dENvbF0sIHRydWUpXG4gICAgICAgIH1cblxuICAgICAgICBsZXQgc3RhdENvbG9yXG4gICAgICAgIGlmICh0aGlzLmNvbG9yQ29sKSB7XG4gICAgICAgICAgICAvL2NvbXB1dGUgY29sb3IgdmFyaWFibGUgc3RhdGlzdGljc1xuICAgICAgICAgICAgc3RhdENvbG9yID0gU3R5bGUuZ2V0U3RhdGlzdGljcyhjZWxscywgKGMpID0+IGNbdGhpcy5jb2xvckNvbF0sIHRydWUpXG4gICAgICAgIH1cblxuICAgICAgICBsZXQgc3RhdEZvbnRTaXplXG4gICAgICAgIGlmICh0aGlzLmZvbnRTaXplQ29sKSB7XG4gICAgICAgICAgICAvL2lmIHNpemUgaXMgdXNlZCwgc29ydCBjZWxscyBieSBzaXplIHNvIHRoYXQgdGhlIGJpZ2dlc3QgYXJlIGRyYXduIGZpcnN0XG4gICAgICAgICAgICBjZWxscy5zb3J0KChjMSwgYzIpID0+IGMyW3RoaXMuZm9udFNpemVDb2xdIC0gYzFbdGhpcy5mb250U2l6ZUNvbF0pXG4gICAgICAgICAgICAvL2FuZCBjb21wdXRlIHNpemUgdmFyaWFibGUgc3RhdGlzdGljc1xuICAgICAgICAgICAgc3RhdEZvbnRTaXplID0gU3R5bGUuZ2V0U3RhdGlzdGljcyhjZWxscywgKGMpID0+IGNbdGhpcy5mb250U2l6ZUNvbF0sIHRydWUpXG4gICAgICAgIH1cblxuICAgICAgICAvL2RyYXcgd2l0aCBIVE1MIGNhbnZhc1xuICAgICAgICAvL2luIHNjcmVlbiBjb29yZGluYXRlc1xuICAgICAgICBnZW9DYW52YXMuaW5pdENhbnZhc1RyYW5zZm9ybSgpXG5cbiAgICAgICAgZm9yIChsZXQgY2VsbCBvZiBjZWxscykge1xuICAgICAgICAgICAgLy9nZXQgY2VsbCB0ZXh0XG4gICAgICAgICAgICBjb25zdCB0ZXh0ID0gdGhpcy50ZXh0ID8gdGhpcy50ZXh0KGNlbGxbdGhpcy50ZXh0Q29sXSwgcmVzb2x1dGlvbiwgc3RhdFRleHQsIHopIDogdW5kZWZpbmVkXG4gICAgICAgICAgICBpZiAodGV4dCA9PSB1bmRlZmluZWQgfHwgdGV4dCA9PSBudWxsIHx8IHRleHQgKyAnJyA9PT0gJycpIGNvbnRpbnVlXG5cbiAgICAgICAgICAgIC8vY29sb3JcbiAgICAgICAgICAgIGNvbnN0IGNvbCA9IHRoaXMuY29sb3IgPyB0aGlzLmNvbG9yKGNlbGxbdGhpcy5jb2xvckNvbF0sIHJlc29sdXRpb24sIHN0YXRDb2xvciwgeikgOiB1bmRlZmluZWRcbiAgICAgICAgICAgIGlmICghY29sKSBjb250aW51ZVxuICAgICAgICAgICAgZ2VvQ2FudmFzLmN0eC5maWxsU3R5bGUgPSBjb2xcblxuICAgICAgICAgICAgLy9mb250IHNpemVcbiAgICAgICAgICAgIC8vc2l6ZSAtIGluIHBpeGVsIHVuaXRcbiAgICAgICAgICAgIGNvbnN0IGZvbnRTaXplUGl4ID0gdGhpcy5mb250U2l6ZShjZWxsW3RoaXMuZm9udFNpemVDb2xdLCByZXNvbHV0aW9uLCBzdGF0Rm9udFNpemUsIHopIC8gelxuXG4gICAgICAgICAgICAvL3NldCBmb250XG4gICAgICAgICAgICBjb25zdCBmb250RmFtaWx5ID0gdGhpcy5mb250RmFtaWx5IHx8ICdBcmlhbCdcbiAgICAgICAgICAgIGNvbnN0IGZvbnRXZWlnaHQgPSB0aGlzLmZvbnRXZWlnaHQgfHwgJ2JvbGQnXG4gICAgICAgICAgICBnZW9DYW52YXMuY3R4LmZvbnQgPSBmb250V2VpZ2h0ICsgJyAnICsgZm9udFNpemVQaXggKyAncHggJyArIGZvbnRGYW1pbHlcblxuICAgICAgICAgICAgLy9nZXQgb2Zmc2V0XG4gICAgICAgICAgICBjb25zdCBvZmZzZXQgPSB0aGlzLm9mZnNldChjZWxsLCByZXNvbHV0aW9uLCB6KVxuXG4gICAgICAgICAgICAvL3RleHQgcG9zaXRpb25cbiAgICAgICAgICAgIGdlb0NhbnZhcy5jdHgudGV4dEFsaWduID0gJ2NlbnRlcidcbiAgICAgICAgICAgIGNvbnN0IHR4ID0gZ2VvQ2FudmFzLmdlb1RvUGl4WChjZWxsLnggKyByZXNvbHV0aW9uICogMC41ICsgb2Zmc2V0LmR4KVxuICAgICAgICAgICAgY29uc3QgdHkgPSBnZW9DYW52YXMuZ2VvVG9QaXhZKGNlbGwueSArIHJlc29sdXRpb24gKiAwLjUgKyBvZmZzZXQuZHkpICsgZm9udFNpemVQaXggKiAwLjMgLy9pdCBzaG91bGQgYmUgMC41IGJ1dCAwLjMgc2VlbXMgdG8gd29yayBiZXR0ZXJcblxuICAgICAgICAgICAgLy9kcmF3IHRoZSB0ZXh0XG4gICAgICAgICAgICBnZW9DYW52YXMuY3R4LmZpbGxUZXh0KHRleHQsIHR4LCB0eSlcbiAgICAgICAgfVxuXG4gICAgICAgIC8vdXBkYXRlIGxlZ2VuZHNcbiAgICAgICAgdGhpcy51cGRhdGVMZWdlbmRzKHsgc3R5bGU6IHRoaXMsIHI6IHJlc29sdXRpb24sIHo6IHosIHNDb2xvcjogc3RhdENvbG9yIH0pXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQnVpbGQgYSBmdW5jdGlvbiBbMCwxXS0+c3RyaW5nIGZvciBjaGFyYWN0ZXJzIGxlZ2VuZFxuICAgICAqXG4gICAgICogQHBhcmFtIHtBcnJheS48c3RyaW5nPn0gY2hhcnNcbiAgICAgKiBAcmV0dXJucyB7ZnVuY3Rpb24obnVtYmVyKTpzdHJpbmd9XG4gICAgICovXG4gICAgc3RhdGljIGdldENoYXJMZWdlbmRGdW4oY2hhcnMpIHtcbiAgICAgICAgY29uc3QgbmIgPSBjaGFycy5sZW5ndGhcbiAgICAgICAgcmV0dXJuICh0KSA9PiAodCA9PSAwID8gJycgOiB0ID09IDEgPyBjaGFyc1tuYiAtIDFdIDogY2hhcnNbTWF0aC5mbG9vcih0ICogbmIpXSlcbiAgICB9XG59XG4iLCIvL0B0cy1jaGVja1xuJ3VzZSBzdHJpY3QnXG5cbmltcG9ydCB7IFN0eWxlIH0gZnJvbSAnLi4vU3R5bGUuanMnXG5cbi8qKiBAdHlwZWRlZiB7XCJmaXJzdFwifFwiYm90dG9tXCJ8XCJjZW50ZXJcInxcInRvcFwifFwibGFzdFwifSBBbmNob3JNb2RlWUVudW0gKi9cblxuLyoqXG4gKiBTaG93IGNlbGwgYXMgdGltZXNlcmllcyBjaGFydFxuICogQ2FuIGJlIHVzZWQgZm9yIHNwYXJrbGluZSBtYXAgb2YgaHR0cHM6Ly9kYXRhZ2lzdGlwcy5oeXBvdGhlc2VzLm9yZy80ODhcbiAqXG4gKiBAYXV0aG9yIEp1bGllbiBHYWZmdXJpXG4gKi9cbmV4cG9ydCBjbGFzcyBUaW1lU2VyaWVzU3R5bGUgZXh0ZW5kcyBTdHlsZSB7XG4gICAgLyoqIEBwYXJhbSB7b2JqZWN0fSBvcHRzICovXG4gICAgY29uc3RydWN0b3Iob3B0cykge1xuICAgICAgICBzdXBlcihvcHRzKVxuICAgICAgICBvcHRzID0gb3B0cyB8fCB7fVxuXG4gICAgICAgIC8qKiBUaGUgY29sdW1ucyBvZiB0aGUgdGltZSBzZXJpZXMsIG9yZGVyZWQgaW4gY2hyb25vbG9naWNhbCBvcmRlci5cbiAgICAgICAgICogQHR5cGUge0FycmF5LjxzdHJpbmc+fSAqL1xuICAgICAgICB0aGlzLnRzID0gb3B0cy50c1xuXG4gICAgICAgIC8qKiBBIGZ1bmN0aW9uIHNwZWNpZnlpbmcgd2hlbiBhIHZhbHVlIHNob3VsZCBiZSBjb25zaWRlcmVkIGFzIFwibm8gZGF0YVwiIGFuZCB0aHVzIG5vdCBpZ25vcmVkLiBUaGUgbGluZSB3aWxsIGhhdmUgYSBicmVhayBhdCB0aGVzZSB2YWx1ZXMuXG4gICAgICAgICAqIEB0eXBlIHtmdW5jdGlvbihzdHJpbmcpOmJvb2xlYW59ICovXG4gICAgICAgIHRoaXMubm9EYXRhID0gb3B0cy5ub0RhdGEgfHwgKCh2KSA9PiB2ID09PSB1bmRlZmluZWQgfHwgdiA9PSBcIlwiIHx8IHYgPT09IG51bGwgfHwgaXNOYU4oK3YpKVxuXG4gICAgICAgIC8veFxuICAgICAgICAvKiogaW4gZ2VvIHVuaXRcbiAgICAgICAgICogQHR5cGUge2Z1bmN0aW9uKGltcG9ydChcIi4uL0RhdGFzZXQuanNcIikuQ2VsbCxudW1iZXIsbnVtYmVyKTpudW1iZXJ9ICovXG4gICAgICAgIHRoaXMub2Zmc2V0WCA9IG9wdHMub2Zmc2V0WCB8fCAoKGMsIHIsIHopID0+IDApXG4gICAgICAgIC8qKiBAdHlwZSB7ZnVuY3Rpb24oaW1wb3J0KFwiLi4vRGF0YXNldC5qc1wiKS5DZWxsLG51bWJlcixudW1iZXIpOm51bWJlcn0gKi9cbiAgICAgICAgdGhpcy53aWR0aCA9IG9wdHMud2lkdGggfHwgKChjLCByLCB6KSA9PiByKVxuXG4gICAgICAgIC8veVxuICAgICAgICAvKiogaW4gZ2VvIHVuaXRcbiAgICAgICAgICogQHR5cGUge2Z1bmN0aW9uKGltcG9ydChcIi4uL0RhdGFzZXQuanNcIikuQ2VsbCxudW1iZXIsbnVtYmVyKTpudW1iZXJ9ICovXG4gICAgICAgIHRoaXMub2Zmc2V0WSA9IG9wdHMub2Zmc2V0WSB8fCAoKGMsIHIsIHopID0+IDApXG4gICAgICAgIC8qKiBAdHlwZSB7ZnVuY3Rpb24oaW1wb3J0KFwiLi4vRGF0YXNldC5qc1wiKS5DZWxsLG51bWJlcixudW1iZXIpOm51bWJlcn0gKi9cbiAgICAgICAgdGhpcy5oZWlnaHQgPSBvcHRzLmhlaWdodCB8fCAoKGMsIHIsIHopID0+IHIpXG4gICAgICAgIC8qKiBAdHlwZSB7ZnVuY3Rpb24oaW1wb3J0KFwiLi4vRGF0YXNldC5qc1wiKS5DZWxsLG51bWJlcixudW1iZXIpOkFuY2hvck1vZGVZRW51bX0gKi9cbiAgICAgICAgdGhpcy5hbmNob3JNb2RlWSA9IG9wdHMuYW5jaG9yTW9kZVkgfHwgKChjLCByLCB6KSA9PiBcImNlbnRlclwiKVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEB0eXBlIHtzdHJpbmd9ICovXG4gICAgICAgIHRoaXMubGluZVdpZHRoQ29sID0gb3B0cy5saW5lV2lkdGhDb2xcblxuICAgICAgICAvKiogQSBmdW5jdGlvbiByZXR1cm5pbmcgdGhlIHdpZHRoIG9mIHRoZSBsaW5lLCBpbiBnZW8gdW5pdFxuICAgICAgICAgKiBAdHlwZSB7ZnVuY3Rpb24obnVtYmVyLG51bWJlcixpbXBvcnQoXCIuLi9TdHlsZS5qc1wiKS5TdGF0fHVuZGVmaW5lZCxudW1iZXIpOm51bWJlcn0gKi9cbiAgICAgICAgdGhpcy5saW5lV2lkdGggPSBvcHRzLmxpbmVXaWR0aCB8fCAoKHYsIHIsIHMsIHopID0+IDEuNSAqIHopXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEB0eXBlIHtzdHJpbmd9ICovXG4gICAgICAgIHRoaXMuY29sb3JDb2wgPSBvcHRzLmNvbG9yQ29sXG5cbiAgICAgICAgLyoqIEEgZnVuY3Rpb24gcmV0dXJuaW5nIHRoZSBjb2xvciBvZiB0aGUgY2VsbC5cbiAgICAgICAgICogQHR5cGUge2Z1bmN0aW9uKG51bWJlcixudW1iZXIsaW1wb3J0KFwiLi4vU3R5bGUuanNcIikuU3RhdHx1bmRlZmluZWQsbnVtYmVyKTpzdHJpbmd9ICovXG4gICAgICAgIHRoaXMuY29sb3IgPSBvcHRzLmNvbG9yIHx8ICgodiwgciwgcywgeikgPT4gJ2JsYWNrJylcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERyYXcgY2VsbHMgYXMgdGV4dC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7QXJyYXkuPGltcG9ydChcIi4uL0RhdGFzZXQuanNcIikuQ2VsbD59IGNlbGxzXG4gICAgICogQHBhcmFtIHtpbXBvcnQoXCIuLi9HZW9DYW52YXMuanNcIikuR2VvQ2FudmFzfSBnZW9DYW52YXNcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gcmVzb2x1dGlvblxuICAgICAqL1xuICAgIGRyYXcoY2VsbHMsIGdlb0NhbnZhcywgcmVzb2x1dGlvbikge1xuXG4gICAgICAgIC8vZmlsdGVyXG4gICAgICAgIGlmICh0aGlzLmZpbHRlcikgY2VsbHMgPSBjZWxscy5maWx0ZXIodGhpcy5maWx0ZXIpXG5cbiAgICAgICAgLy9cbiAgICAgICAgY29uc3QgeiA9IGdlb0NhbnZhcy52aWV3LnpcblxuICAgICAgICBsZXQgc3RhdFdpZHRoXG4gICAgICAgIGlmICh0aGlzLmxpbmVXaWR0aENvbCkge1xuICAgICAgICAgICAgLy9hbmQgY29tcHV0ZSBzaXplIHZhcmlhYmxlIHN0YXRpc3RpY3NcbiAgICAgICAgICAgIHN0YXRXaWR0aCA9IFN0eWxlLmdldFN0YXRpc3RpY3MoY2VsbHMsIChjKSA9PiBjW3RoaXMubGluZVdpZHRoQ29sXSwgdHJ1ZSlcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBzdGF0Q29sb3JcbiAgICAgICAgaWYgKHRoaXMuY29sb3JDb2wpIHtcbiAgICAgICAgICAgIC8vY29tcHV0ZSBjb2xvciB2YXJpYWJsZSBzdGF0aXN0aWNzXG4gICAgICAgICAgICBzdGF0Q29sb3IgPSBTdHlsZS5nZXRTdGF0aXN0aWNzKGNlbGxzLCAoYykgPT4gY1t0aGlzLmNvbG9yQ29sXSwgdHJ1ZSlcbiAgICAgICAgfVxuXG4gICAgICAgIC8vY29tcHV0ZSBjZWxsIGFtcGxpdHVkZVxuICAgICAgICBjb25zdCBnZXRBbXBsaXR1ZGUgPSBjID0+IHtcbiAgICAgICAgICAgIGxldCBtaW4sIG1heFxuICAgICAgICAgICAgZm9yIChsZXQgdCBvZiB0aGlzLnRzKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdmFsID0gY1t0XTtcbiAgICAgICAgICAgICAgICBpZiAodmFsID09IHVuZGVmaW5lZCkgY29udGludWVcbiAgICAgICAgICAgICAgICBpZiAobWluID09IHVuZGVmaW5lZCB8fCB2YWwgPCBtaW4pIG1pbiA9IHZhbFxuICAgICAgICAgICAgICAgIGlmIChtYXggPT0gdW5kZWZpbmVkIHx8IHZhbCA+IG1heCkgbWF4ID0gdmFsXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobWluID09IHVuZGVmaW5lZCkgcmV0dXJuIHVuZGVmaW5lZFxuICAgICAgICAgICAgcmV0dXJuIG1heCAtIG1pblxuICAgICAgICB9XG5cbiAgICAgICAgLy9jb21wdXRlIG1heCBhbXBsaXR1ZGVcbiAgICAgICAgbGV0IGFtcE1heFxuICAgICAgICBmb3IgKGxldCBjIG9mIGNlbGxzKSB7XG4gICAgICAgICAgICBjb25zdCBhbXAgPSBnZXRBbXBsaXR1ZGUoYylcbiAgICAgICAgICAgIGlmIChhbXAgPT0gdW5kZWZpbmVkKSBjb250aW51ZVxuICAgICAgICAgICAgaWYgKGFtcE1heCA9PSB1bmRlZmluZWQgfHwgYW1wID4gYW1wTWF4KSBhbXBNYXggPSBhbXBcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWFtcE1heCkgcmV0dXJuXG5cbiAgICAgICAgY29uc3QgbmIgPSB0aGlzLnRzLmxlbmd0aFxuXG4gICAgICAgIGdlb0NhbnZhcy5jdHgubGluZUNhcCA9IFwiYnV0dFwiXG4gICAgICAgIGZvciAobGV0IGMgb2YgY2VsbHMpIHtcblxuICAgICAgICAgICAgLy9saW5lIHdpZHRoXG4gICAgICAgICAgICAvKiogQHR5cGUge251bWJlcnx1bmRlZmluZWR9ICovXG4gICAgICAgICAgICBjb25zdCB3RyA9IHRoaXMubGluZVdpZHRoID8gdGhpcy5saW5lV2lkdGgoY1t0aGlzLmxpbmVXaWR0aENvbF0sIHJlc29sdXRpb24sIHN0YXRXaWR0aCwgeikgOiB1bmRlZmluZWRcbiAgICAgICAgICAgIGlmICghd0cgfHwgd0cgPCAwKSBjb250aW51ZVxuXG4gICAgICAgICAgICAvL2xpbmUgY29sb3JcbiAgICAgICAgICAgIC8qKiBAdHlwZSB7c3RyaW5nfHVuZGVmaW5lZH0gKi9cbiAgICAgICAgICAgIGNvbnN0IGNvbCA9IHRoaXMuY29sb3IgPyB0aGlzLmNvbG9yKGNbdGhpcy5jb2xvckNvbF0sIHJlc29sdXRpb24sIHN0YXRDb2xvciwgeikgOiB1bmRlZmluZWRcbiAgICAgICAgICAgIGlmICghY29sKSBjb250aW51ZVxuXG5cbiAgICAgICAgICAgIC8veFxuICAgICAgICAgICAgY29uc3Qgb2ZmWCA9IHRoaXMub2Zmc2V0WCA/IHRoaXMub2Zmc2V0WChjLCByZXNvbHV0aW9uLCB6KSA6IDBcbiAgICAgICAgICAgIGlmIChvZmZYID09IHVuZGVmaW5lZCB8fCBpc05hTihvZmZYKSkgY29udGludWVcbiAgICAgICAgICAgIGNvbnN0IHcgPSB0aGlzLndpZHRoID8gdGhpcy53aWR0aChjLCByZXNvbHV0aW9uLCB6KSA6IHJlc29sdXRpb25cbiAgICAgICAgICAgIGlmICh3ID09IHVuZGVmaW5lZCB8fCBpc05hTih3KSkgY29udGludWVcblxuICAgICAgICAgICAgLy95XG4gICAgICAgICAgICBjb25zdCBvZmZZID0gdGhpcy5vZmZzZXRZID8gdGhpcy5vZmZzZXRZKGMsIHJlc29sdXRpb24sIHopIDogMFxuICAgICAgICAgICAgaWYgKG9mZlkgPT0gdW5kZWZpbmVkIHx8IGlzTmFOKG9mZlkpKSBjb250aW51ZVxuICAgICAgICAgICAgY29uc3QgaCA9IHRoaXMuaGVpZ2h0ID8gdGhpcy5oZWlnaHQoYywgcmVzb2x1dGlvbiwgeikgOiByZXNvbHV0aW9uXG4gICAgICAgICAgICBpZiAoaCA9PSB1bmRlZmluZWQgfHwgaXNOYU4oaCkpIGNvbnRpbnVlXG4gICAgICAgICAgICBjb25zdCBhbmNoWSA9IHRoaXMuYW5jaG9yTW9kZVkgPyB0aGlzLmFuY2hvck1vZGVZKGMsIHJlc29sdXRpb24sIHopIDogXCJjZW50ZXJcIlxuICAgICAgICAgICAgaWYgKCFhbmNoWSkgY29udGludWVcblxuICAgICAgICAgICAgZ2VvQ2FudmFzLmN0eC5saW5lV2lkdGggPSB3R1xuICAgICAgICAgICAgZ2VvQ2FudmFzLmN0eC5zdHJva2VTdHlsZSA9IGNvbFxuXG4gICAgICAgICAgICAvL2NvbXB1dGUgYW5jaG9yIFkgZmlndXJlc1xuICAgICAgICAgICAgbGV0IHZhbDAsIHkwXG4gICAgICAgICAgICBpZiAoYW5jaFkgPT09IFwiZmlyc3RcIikge1xuICAgICAgICAgICAgICAgIC8vZ2V0IGZpcnN0IHZhbHVlXG4gICAgICAgICAgICAgICAgdmFsMCA9IGNbdGhpcy50c1swXV1cbiAgICAgICAgICAgICAgICB5MCA9IDBcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoYW5jaFkgPT09IFwibGFzdFwiKSB7XG4gICAgICAgICAgICAgICAgLy9nZXQgbGFzdCB2YWx1ZVxuICAgICAgICAgICAgICAgIHZhbDAgPSBjW3RoaXMudHNbdGhpcy50cy5sZW5ndGggLSAxXV1cbiAgICAgICAgICAgICAgICB5MCA9IDBcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoYW5jaFkgPT09IFwiYm90dG9tXCIpIHtcbiAgICAgICAgICAgICAgICAvL2dldCBtaW5cbiAgICAgICAgICAgICAgICBmb3IgKGxldCB0IG9mIHRoaXMudHMpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdmFsID0gK2NbdF07XG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWwgPT0gdW5kZWZpbmVkKSBjb250aW51ZVxuICAgICAgICAgICAgICAgICAgICBpZiAodmFsMCA9PSB1bmRlZmluZWQgfHwgdmFsIDwgdmFsMCkgdmFsMCA9IHZhbFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB5MCA9IDBcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoYW5jaFkgPT09IFwidG9wXCIpIHtcbiAgICAgICAgICAgICAgICAvL2dldCBtYXhcbiAgICAgICAgICAgICAgICBmb3IgKGxldCB0IG9mIHRoaXMudHMpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdmFsID0gK2NbdF07XG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWwgPT0gdW5kZWZpbmVkKSBjb250aW51ZVxuICAgICAgICAgICAgICAgICAgICBpZiAodmFsMCA9PSB1bmRlZmluZWQgfHwgdmFsID4gdmFsMCkgdmFsMCA9IHZhbFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB5MCA9IHJlc29sdXRpb25cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoYW5jaFkgPT09IFwiY2VudGVyXCIpIHtcbiAgICAgICAgICAgICAgICAvL2dldCBtaW4gYW5kIG1heFxuICAgICAgICAgICAgICAgIGxldCBtaW4sIG1heFxuICAgICAgICAgICAgICAgIGZvciAobGV0IHQgb2YgdGhpcy50cykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB2YWwgPSBjW3RdO1xuICAgICAgICAgICAgICAgICAgICBpZiAodmFsID09IHVuZGVmaW5lZCkgY29udGludWVcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1pbiA9PSB1bmRlZmluZWQgfHwgdmFsIDwgbWluKSBtaW4gPSB2YWxcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1heCA9PSB1bmRlZmluZWQgfHwgdmFsID4gbWF4KSBtYXggPSB2YWxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFsMCA9ICgrbWF4ICsgK21pbikgKiAwLjVcbiAgICAgICAgICAgICAgICB5MCA9IHJlc29sdXRpb24gLyAyXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVW5leHBlY3RlZCBhbmNob3JNb2RlWTogXCIgKyBhbmNoWSlcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLyovZHJhdyBsaW5lXG4gICAgICAgICAgICBpZiAodmFsMCA9PSB1bmRlZmluZWQgfHwgaXNOYU4odmFsMCkpIGNvbnRpbnVlXG4gICAgICAgICAgICBjZy5jdHguYmVnaW5QYXRoKClcbiAgICAgICAgICAgIGNvbnN0IHNYID0gdyAvIChuYiAtIDEpXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5iOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCB2YWwgPSBjW3RoaXMudHNbaV1dXG4gICAgICAgICAgICAgICAgaWYgKHZhbCA9PSB1bmRlZmluZWQgfHwgaXNOYU4odmFsKSkgYnJlYWtcbiAgICAgICAgICAgICAgICBpZiAoaSA9PSAwKVxuICAgICAgICAgICAgICAgICAgICBjZy5jdHgubW92ZVRvKGMueCArIGkgKiBzWCArIG9mZlgsIGMueSArIHkwICsgKHZhbCAtIHZhbDApICogaCAvIGFtcE1heCArIG9mZlkpXG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICBjZy5jdHgubGluZVRvKGMueCArIGkgKiBzWCArIG9mZlgsIGMueSArIHkwICsgKHZhbCAtIHZhbDApICogaCAvIGFtcE1heCArIG9mZlkpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjZy5jdHguc3Ryb2tlKCkqL1xuXG5cbiAgICAgICAgICAgIC8vZHJhdyBsaW5lLCBzZWdtZW50IGJ5IHNlZ21lbnRcbiAgICAgICAgICAgIGNvbnN0IHNYID0gdyAvIChuYiAtIDEpXG5cbiAgICAgICAgICAgIC8vaGFuZGxlIGZpcnN0IHBvaW50XG4gICAgICAgICAgICBsZXQgdjAgPSBjW3RoaXMudHNbMF1dXG4gICAgICAgICAgICBpZiAoIXRoaXMubm9EYXRhKHYwKSkge1xuICAgICAgICAgICAgICAgIGdlb0NhbnZhcy5jdHguYmVnaW5QYXRoKClcbiAgICAgICAgICAgICAgICBnZW9DYW52YXMuY3R4Lm1vdmVUbyhjLnggKyBvZmZYLCBjLnkgKyB5MCArICh2MCAtIHZhbDApICogaCAvIGFtcE1heCArIG9mZlkpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKHYwLCBpc05hTih2MCkpXG5cbiAgICAgICAgICAgIGxldCB2MVxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBuYjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdjEgPSBjW3RoaXMudHNbaV1dXG5cbiAgICAgICAgICAgICAgICAvL2RyYXcgc2VnbWVudCBmcm9tIHYwIHRvIHYxXG5cbiAgICAgICAgICAgICAgICAvL2JvdGggcG9pbnRzICdubyBkYXRhJ1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLm5vRGF0YSh2MCkgJiYgdGhpcy5ub0RhdGEodjEpKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgLy9zZWNvbmQgcG9pbnQgJ25vIGRhdGEnXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICghdGhpcy5ub0RhdGEodjApICYmIHRoaXMubm9EYXRhKHYxKSkge1xuICAgICAgICAgICAgICAgICAgICBnZW9DYW52YXMuY3R4LnN0cm9rZSgpXG5cbiAgICAgICAgICAgICAgICAgICAgLy9maXJzdCBwb2ludCAnbm8gZGF0YSdcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMubm9EYXRhKHYwKSAmJiAhdGhpcy5ub0RhdGEodjEpKSB7XG4gICAgICAgICAgICAgICAgICAgIGdlb0NhbnZhcy5jdHguYmVnaW5QYXRoKClcbiAgICAgICAgICAgICAgICAgICAgZ2VvQ2FudmFzLmN0eC5tb3ZlVG8oYy54ICsgaSAqIHNYICsgb2ZmWCwgYy55ICsgeTAgKyAodjEgLSB2YWwwKSAqIGggLyBhbXBNYXggKyBvZmZZKVxuXG4gICAgICAgICAgICAgICAgICAgIC8vYm90aCBwb2ludHMgaGF2ZSBkYXRhOiB0cmFjZSBsaW5lXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZ2VvQ2FudmFzLmN0eC5saW5lVG8oYy54ICsgaSAqIHNYICsgb2ZmWCwgYy55ICsgeTAgKyAodjEgLSB2YWwwKSAqIGggLyBhbXBNYXggKyBvZmZZKVxuICAgICAgICAgICAgICAgICAgICAvL2lmIGl0IGlzIHRoZSBsYXN0IHBvaW50LCBzdHJva2VcbiAgICAgICAgICAgICAgICAgICAgaWYgKGkgPT0gbmIgLSAxKSBnZW9DYW52YXMuY3R4LnN0cm9rZSgpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHYwID0gdjFcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgLy91cGRhdGUgbGVnZW5kLCBpZiBhbnlcbiAgICAgICAgdGhpcy51cGRhdGVMZWdlbmRzKHtcbiAgICAgICAgICAgIHdpZHRoRnVuOiB0aGlzLmxpbmVXaWR0aCxcbiAgICAgICAgICAgIHI6IHJlc29sdXRpb24sXG4gICAgICAgICAgICB6OiB6LFxuICAgICAgICAgICAgc0NvbG9yOiBzdGF0Q29sb3IsXG4gICAgICAgICAgICAvL3NMZW5ndGg6IHN0YXRMZW5ndGgsXG4gICAgICAgICAgICBzV2lkdGg6IHN0YXRXaWR0aCxcbiAgICAgICAgfSlcblxuICAgIH1cblxufVxuXG4iLCIvL0B0cy1jaGVja1xuJ3VzZSBzdHJpY3QnXG5cbmltcG9ydCB7IGluaXRTaGFkZXJQcm9ncmFtLCBjcmVhdGVTaGFkZXIgfSBmcm9tICcuL3dlYkdMVXRpbHMuanMnXG5pbXBvcnQgeyBjb2xvciB9IGZyb20gJ2QzLWNvbG9yJ1xuXG4vKipcbiAqIEV2ZXJ5dGhpbmcgdG8gZWFzaWx5IGRyYXcgY29sb3JlZCBzcXVhcmVzIHdpdGggd2ViR0wuXG4gKiBBbGwgdGhlIHNhbWUgc2l6ZSwgYnV0IGRpZmZlcmVudCBmaWxsIGNvbG9yLlxuICovXG5leHBvcnQgY2xhc3MgV2ViR0xTcXVhcmVDb2xvcmluZyB7XG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1dlYkdMUmVuZGVyaW5nQ29udGV4dH0gZ2xcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihnbCwgc2l6ZVBpeCkge1xuICAgICAgICB0aGlzLmdsID0gZ2xcbiAgICAgICAgdGhpcy5zaXplUGl4ID0gc2l6ZVBpeCB8fCAxMC4wXG5cbiAgICAgICAgdGhpcy5wcm9ncmFtID0gaW5pdFNoYWRlclByb2dyYW0oXG4gICAgICAgICAgICBnbCxcbiAgICAgICAgICAgIGNyZWF0ZVNoYWRlcihcbiAgICAgICAgICAgICAgICBnbCxcbiAgICAgICAgICAgICAgICBnbC5WRVJURVhfU0hBREVSLFxuICAgICAgICAgICAgICAgIGBcbiAgICAgICAgICAgIGF0dHJpYnV0ZSB2ZWMyIHBvcztcbiAgICAgICAgICAgIHVuaWZvcm0gZmxvYXQgc2l6ZVBpeDtcbiAgICAgICAgICAgIHVuaWZvcm0gbWF0MyBtYXQ7XG4gICAgICAgICAgICBhdHRyaWJ1dGUgdmVjNCBjb2xvcjtcbiAgICAgICAgICAgIHZhcnlpbmcgdmVjNCB2Q29sb3I7XG4gICAgICAgICAgICB2b2lkIG1haW4oKSB7XG4gICAgICAgICAgICAgIGdsX1Bvc2l0aW9uID0gdmVjNChtYXQgKiB2ZWMzKHBvcywgMS4wKSwgMS4wKTtcbiAgICAgICAgICAgICAgZ2xfUG9pbnRTaXplID0gc2l6ZVBpeDtcbiAgICAgICAgICAgICAgdkNvbG9yID0gY29sb3I7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgYFxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIGNyZWF0ZVNoYWRlcihcbiAgICAgICAgICAgICAgICBnbCxcbiAgICAgICAgICAgICAgICBnbC5GUkFHTUVOVF9TSEFERVIsXG4gICAgICAgICAgICAgICAgYFxuICAgICAgICAgICAgcHJlY2lzaW9uIG1lZGl1bXAgZmxvYXQ7XG4gICAgICAgICAgICB2YXJ5aW5nIHZlYzQgdkNvbG9yO1xuICAgICAgICAgICAgdm9pZCBtYWluKHZvaWQpIHtcbiAgICAgICAgICAgICAgICB2ZWM0IHZDb2xvcl8gPSB2Q29sb3IgLyAyNTUuMDtcbiAgICAgICAgICAgICAgICB2Q29sb3JfWzNdID0gMjU1LjAgKiB2Q29sb3JfWzNdO1xuICAgICAgICAgICAgICAgIGdsX0ZyYWdDb2xvciA9IHZDb2xvcl87XG4gICAgICAgICAgICB9YFxuICAgICAgICAgICAgKVxuICAgICAgICApXG4gICAgICAgIGdsLnVzZVByb2dyYW0odGhpcy5wcm9ncmFtKVxuXG4gICAgICAgIC8vYnVmZmVyIGRhdGFcbiAgICAgICAgdGhpcy52ZXJ0aWNlc0J1ZmZlciA9IFtdXG4gICAgICAgIHRoaXMuY29sb3JzQnVmZmVyID0gW11cbiAgICB9XG5cbiAgICAvKiogQWRkIGRhdGEgdG8gdmVydGljZXMvc2l6ZS9jb2xvciBidWZmZXJzIGZvciBjb2xvciBzcXVhcmVzIGRyYXdpbmcgKi9cbiAgICBhZGRQb2ludERhdGEoeEMsIHlDLCBjb2wpIHtcbiAgICAgICAgLy9jb252ZXJ0IGNvbG9yXG4gICAgICAgIGNvbnN0IGNjID0gY29sb3IoY29sKVxuICAgICAgICAvL2NvbnN0IGNjID0ge3I6NDUsZzo4NyxiOjk4LG9wYWNpdHk6MC45fVxuICAgICAgICBpZiAoIWNjKSByZXR1cm5cblxuICAgICAgICAvL3ZlcnRpY2VzXG4gICAgICAgIHRoaXMudmVydGljZXNCdWZmZXIucHVzaCh4QywgeUMpXG4gICAgICAgIC8vY29sb3JcbiAgICAgICAgdGhpcy5jb2xvcnNCdWZmZXIucHVzaChjYy5yLCBjYy5nLCBjYy5iLCBjYy5vcGFjaXR5KVxuICAgIH1cblxuICAgIGFkZFBvaW50RGF0YTIoeEMsIHlDLCByLCBnLCBiLCBvcGFjaXR5KSB7XG4gICAgICAgIC8vdmVydGljZXNcbiAgICAgICAgdGhpcy52ZXJ0aWNlc0J1ZmZlci5wdXNoKHhDLCB5QylcbiAgICAgICAgLy9jb2xvclxuICAgICAgICB0aGlzLmNvbG9yc0J1ZmZlci5wdXNoKHIsIGcsIGIsIG9wYWNpdHkpXG4gICAgfVxuXG4gICAgLyoqICAqL1xuICAgIGRyYXcodHJhbnNmb01hdCkge1xuICAgICAgICBjb25zdCBnbCA9IHRoaXMuZ2xcblxuICAgICAgICAvL3ZlcnRpY2UgZGF0YVxuICAgICAgICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgZ2wuY3JlYXRlQnVmZmVyKCkpXG4gICAgICAgIGdsLmJ1ZmZlckRhdGEoZ2wuQVJSQVlfQlVGRkVSLCBuZXcgRmxvYXQzMkFycmF5KHRoaXMudmVydGljZXNCdWZmZXIpLCBnbC5TVEFUSUNfRFJBVylcbiAgICAgICAgY29uc3QgcG9zaXRpb24gPSBnbC5nZXRBdHRyaWJMb2NhdGlvbih0aGlzLnByb2dyYW0sICdwb3MnKVxuICAgICAgICBnbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKFxuICAgICAgICAgICAgcG9zaXRpb24sXG4gICAgICAgICAgICAyLCAvL251bUNvbXBvbmVudHNcbiAgICAgICAgICAgIGdsLkZMT0FULCAvL3R5cGVcbiAgICAgICAgICAgIGZhbHNlLCAvL25vcm1hbGlzZVxuICAgICAgICAgICAgMCwgLy9zdHJpZGVcbiAgICAgICAgICAgIDAgLy9vZmZzZXRcbiAgICAgICAgKVxuICAgICAgICBnbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheShwb3NpdGlvbilcblxuICAgICAgICAvL2NvbG9yIGRhdGFcbiAgICAgICAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIGdsLmNyZWF0ZUJ1ZmZlcigpKVxuICAgICAgICBnbC5idWZmZXJEYXRhKGdsLkFSUkFZX0JVRkZFUiwgbmV3IEZsb2F0MzJBcnJheSh0aGlzLmNvbG9yc0J1ZmZlciksIGdsLlNUQVRJQ19EUkFXKVxuICAgICAgICB2YXIgY29sb3IgPSBnbC5nZXRBdHRyaWJMb2NhdGlvbih0aGlzLnByb2dyYW0sICdjb2xvcicpXG4gICAgICAgIGdsLnZlcnRleEF0dHJpYlBvaW50ZXIoY29sb3IsIDQsIGdsLkZMT0FULCBmYWxzZSwgMCwgMClcbiAgICAgICAgZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkoY29sb3IpXG5cbiAgICAgICAgLy9zaXplUGl4XG4gICAgICAgIGdsLnVuaWZvcm0xZihnbC5nZXRVbmlmb3JtTG9jYXRpb24odGhpcy5wcm9ncmFtLCAnc2l6ZVBpeCcpLCAxLjAgKiB0aGlzLnNpemVQaXgpXG5cbiAgICAgICAgLy90cmFuc2Zvcm1hdGlvblxuICAgICAgICBnbC51bmlmb3JtTWF0cml4M2Z2KGdsLmdldFVuaWZvcm1Mb2NhdGlvbih0aGlzLnByb2dyYW0sICdtYXQnKSwgZmFsc2UsIG5ldyBGbG9hdDMyQXJyYXkodHJhbnNmb01hdCkpXG5cbiAgICAgICAgLy8gRW5hYmxlIHRoZSBkZXB0aCB0ZXN0XG4gICAgICAgIC8vZ2wuZW5hYmxlKGdsLkRFUFRIX1RFU1QpO1xuICAgICAgICAvLyBDbGVhciB0aGUgY29sb3IgYnVmZmVyIGJpdFxuICAgICAgICBnbC5jbGVhcihnbC5DT0xPUl9CVUZGRVJfQklUKVxuICAgICAgICAvLyBTZXQgdGhlIHZpZXcgcG9ydFxuICAgICAgICAvL2dsLnZpZXdwb3J0KDAsIDAsIGNnLncsIGNnLmgpO1xuXG4gICAgICAgIGdsLmRyYXdBcnJheXMoZ2wuUE9JTlRTLCAwLCB0aGlzLnZlcnRpY2VzQnVmZmVyLmxlbmd0aCAvIDIpXG4gICAgfVxufVxuIiwiLy9AdHMtY2hlY2tcbid1c2Ugc3RyaWN0J1xuXG5pbXBvcnQgeyBpbml0U2hhZGVyUHJvZ3JhbSwgY3JlYXRlU2hhZGVyIH0gZnJvbSAnLi93ZWJHTFV0aWxzLmpzJ1xuaW1wb3J0IHsgY29sb3IgfSBmcm9tICdkMy1jb2xvcidcblxuLyoqXG4gKiBFdmVyeXRoaW5nIHRvIGVhc2lseSBkcmF3IGNvbG9yZWQgc3F1YXJlcyB3aXRoIHdlYkdMLlxuICogQWxsIHRoZSBzYW1lIHNpemUsIGJ1dCBkaWZmZXJlbnQgZmlsbCBjb2xvci5cbiAqIFRoZSBjb2xvciBpbnRlcnBvbGF0aW9uIGlzIGNvbXB1dGVkIGluIHRoZSBmcmFnbWVudCBzaGFkZXIgcHJvZ3JhbSwgYnkgdGhlIEdQVSwgdGh1cyBpdCBpcyBsZXNzIGZsZXhpYmxlIGJ1dCBmYXN0ZXIuXG4gKi9cbmV4cG9ydCBjbGFzcyBXZWJHTFNxdWFyZUNvbG9yaW5nQWR2YW5jZWQge1xuICAgIC8vc2VlOlxuICAgIC8vaHR0cHM6Ly93ZWJnbGZ1bmRhbWVudGFscy5vcmcvd2ViZ2wvbGVzc29ucy9mci93ZWJnbC1zaGFkZXJzLWFuZC1nbHNsLmh0bWwjbGVzLXVuaWZvcm1zLWRhbnMtbGVzLXNoYWRlcnMtZGUtdmVydGV4XG4gICAgLy9odHRwczovL3RoZWJvb2tvZnNoYWRlcnMuY29tL2dsb3NzYXJ5Lz9zZWFyY2g9bWl4XG4gICAgLy9odHRwczovL3RoZWJvb2tvZnNoYWRlcnMuY29tLzA2L1xuICAgIC8vaHR0cHM6Ly90aGVib29rb2ZzaGFkZXJzLmNvbS9nbG9zc2FyeS9cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHsqfSBnbFxuICAgICAqIEBwYXJhbSB7QXJyYXkuPFN0cmluZz59IGNvbG9yc1xuICAgICAqIEBwYXJhbSB7e2Z1bjpzdHJpbmcsYWxwaGE6bnVtYmVyfX0gc3RyZXRjaGluZ1xuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBzaXplUGl4XG4gICAgICogQHBhcmFtIHtudW1iZXJ8dW5kZWZpbmVkfSBnbG9iYWxPcGFjaXR5XG4gICAgICovXG4gICAgY29uc3RydWN0b3IoZ2wsIGNvbG9ycywgc3RyZXRjaGluZywgc2l6ZVBpeCA9IDEwLCBnbG9iYWxPcGFjaXR5ID0gdW5kZWZpbmVkKSB7XG4gICAgICAgIC8qKiBAdHlwZSB7V2ViR0xSZW5kZXJpbmdDb250ZXh0fSAqL1xuICAgICAgICB0aGlzLmdsID0gZ2xcbiAgICAgICAgLy9nbC5waXhlbFN0b3JlaShnbC5VTlBBQ0tfUFJFTVVMVElQTFlfQUxQSEFfV0VCR0wsIHRydWUpO1xuICAgICAgICAvL2dsLmJsZW5kRnVuYyhnbC5TUkNfQUxQSEEsIGdsLk9ORV9NSU5VU19TUkNfQUxQSEEpO1xuICAgICAgICAvL2dsLmJsZW5kRnVuYyhnbC5PTkUsIGdsLk9ORV9NSU5VU19TUkNfQUxQSEEpO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7V2ViR0xTaGFkZXJ9ICovXG4gICAgICAgIGNvbnN0IHZTaGFkZXIgPSBjcmVhdGVTaGFkZXIoXG4gICAgICAgICAgICBnbCxcbiAgICAgICAgICAgIGdsLlZFUlRFWF9TSEFERVIsXG4gICAgICAgICAgICBgXG4gICAgICAgIGF0dHJpYnV0ZSB2ZWMyIHBvcztcbiAgICAgICAgdW5pZm9ybSBmbG9hdCBzaXplUGl4O1xuICAgICAgICB1bmlmb3JtIG1hdDMgbWF0O1xuXG4gICAgICAgIGF0dHJpYnV0ZSBmbG9hdCB0O1xuICAgICAgICB2YXJ5aW5nIGZsb2F0IHZ0O1xuXG4gICAgICAgIHZvaWQgbWFpbigpIHtcbiAgICAgICAgICBnbF9Qb3NpdGlvbiA9IHZlYzQobWF0ICogdmVjMyhwb3MsIDEuMCksIDEuMCk7XG4gICAgICAgICAgZ2xfUG9pbnRTaXplID0gc2l6ZVBpeDtcbiAgICAgICAgICB2dCA9IHQ7XG4gICAgICAgIH1cbiAgICAgIGBcbiAgICAgICAgKVxuXG4gICAgICAgIC8vcHJlcGFyZSBmcmFnbWVudCBzaGFkZXIgY29kZVxuICAgICAgICAvL2RlY2xhcmUgdGhlIHVuaWZvcm0gYW5kIG90aGVyIHZhcmlhYmxlc1xuICAgICAgICBsZXQgZnNoU3RyaW5nID1cbiAgICAgICAgICAgICcnICtcbiAgICAgICAgICAgICdwcmVjaXNpb24gbWVkaXVtcCBmbG9hdDtcXG4nICtcbiAgICAgICAgICAgICd2YXJ5aW5nIGZsb2F0IHZ0O1xcbicgK1xuICAgICAgICAgICAgJ3VuaWZvcm0gZmxvYXQgYWxwaGE7XFxuJyArXG4gICAgICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IG91dCA9IFtdXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb2xvcnMubGVuZ3RoOyBpKyspIG91dC5wdXNoKCd1bmlmb3JtIHZlYzQgYycgKyBpICsgJztcXG4nKVxuICAgICAgICAgICAgICAgIHJldHVybiBvdXQuam9pbignJylcbiAgICAgICAgICAgIH0pKCkgK1xuICAgICAgICAgICAgLy9zdGFydCB0aGUgbWFpbiBmdW5jdGlvbiwgYXBwbHkgdGhlIHN0cmV0Y2hpbmcgb2YgdFxuICAgICAgICAgICAgJ3ZvaWQgbWFpbih2b2lkKSB7XFxuJ1xuXG4gICAgICAgIGlmIChzdHJldGNoaW5nKSB7XG4gICAgICAgICAgICBpZiAoc3RyZXRjaGluZy5mdW4gPT0gJ3BvdycpXG4gICAgICAgICAgICAgICAgLy9zUG93ID0gKHQsIGFscGhhID0gMykgPT4gTWF0aC5wb3codCwgYWxwaGEpO1xuICAgICAgICAgICAgICAgIGZzaFN0cmluZyArPSAnICAgZmxvYXQgdCA9IHBvdyh2dCwgYWxwaGEpO1xcbidcbiAgICAgICAgICAgIGVsc2UgaWYgKHN0cmV0Y2hpbmcuZnVuID09ICdwb3dJbnYnKVxuICAgICAgICAgICAgICAgIC8vc1Bvd1JldiA9ICh0LCBhbHBoYSA9IDMpID0+IDEgLSBNYXRoLnBvdygxIC0gdCwgMSAvIGFscGhhKTtcbiAgICAgICAgICAgICAgICBmc2hTdHJpbmcgKz0gJyAgIGZsb2F0IHQgPSAxLjAtcG93KDEuMC12dCwgMS4wL2FscGhhKTtcXG4nXG4gICAgICAgICAgICBlbHNlIGlmIChzdHJldGNoaW5nLmZ1biA9PSAnZXhwJylcbiAgICAgICAgICAgICAgICAvL3NFeHAgPSAodCwgYWxwaGEgPSAzKSA9PiBhbHBoYSA9PSAwID8gdCA6IChNYXRoLmV4cCh0ICogYWxwaGEpIC0gMSkgLyAoTWF0aC5leHAoYWxwaGEpIC0gMSk7XG4gICAgICAgICAgICAgICAgZnNoU3RyaW5nICs9XG4gICAgICAgICAgICAgICAgICAgIHN0cmV0Y2hpbmcuYWxwaGEgPT0gMFxuICAgICAgICAgICAgICAgICAgICAgICAgPyBgZmxvYXQgdCA9IHZ0O2BcbiAgICAgICAgICAgICAgICAgICAgICAgIDogJyAgIGZsb2F0IHQgPSAoZXhwKHZ0ICogYWxwaGEpIC0gMS4wKSAvIChleHAoYWxwaGEpIC0gMS4wKTtcXG4nXG4gICAgICAgICAgICBlbHNlIGlmIChzdHJldGNoaW5nLmZ1biA9PSAnbG9nJylcbiAgICAgICAgICAgICAgICAvL3NFeHBSZXYgPSAodCwgYWxwaGEgPSAzKSA9PiBhbHBoYSA9PSAwID8gdCA6IDEgLSAoMSAvIGFscGhhKSAqIE1hdGgubG9nKE1hdGguZXhwKGFscGhhKSAqICgxIC0gdCkgKyB0KTtcbiAgICAgICAgICAgICAgICBmc2hTdHJpbmcgKz1cbiAgICAgICAgICAgICAgICAgICAgc3RyZXRjaGluZy5hbHBoYSA9PSAwXG4gICAgICAgICAgICAgICAgICAgICAgICA/IGBmbG9hdCB0ID0gdnQ7YFxuICAgICAgICAgICAgICAgICAgICAgICAgOiAnICAgZmxvYXQgdCA9IDEuMCAtICgxLjAgLyBhbHBoYSkgKiBsb2coZXhwKGFscGhhKSAqICgxLjAgLSB2dCkgKyB2dCk7XFxuJ1xuICAgICAgICAgICAgZWxzZSBpZiAoc3RyZXRjaGluZy5mdW4gPT0gJ2NpcmNsZScpIHtcbiAgICAgICAgICAgICAgICBpZiAoc3RyZXRjaGluZy5hbHBoYSA9PSAwKVxuICAgICAgICAgICAgICAgICAgICAvL2lmIChhbHBoYSA9PSAwKSByZXR1cm4gdDtcbiAgICAgICAgICAgICAgICAgICAgZnNoU3RyaW5nICs9ICcgICBmbG9hdCB0ID0gdnQ7XFxuJ1xuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHN0cmV0Y2hpbmcuYWxwaGEgPT0gMSlcbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgKGFscGhhID09IDEpIHJldHVybiBNYXRoLnNxcnQoMiAqIHQgLSB0ICogdCk7XG4gICAgICAgICAgICAgICAgICAgIGZzaFN0cmluZyArPSAnICAgZmxvYXQgdCA9IHNxcnQodnQgKiAoMi4wIC0gdnQpKTtcXG4nXG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vY29uc3QgYSA9IGFscGhhIC8gKDEgLSBhbHBoYSk7XG4gICAgICAgICAgICAgICAgICAgIC8vcmV0dXJuIE1hdGguc3FydCgxIC8gKGEgKiBhKSArIHQgKiAoMiAvIGEgKyAyIC0gdCkpIC0gMSAvIGE7XG4gICAgICAgICAgICAgICAgICAgIGZzaFN0cmluZyArPVxuICAgICAgICAgICAgICAgICAgICAgICAgJyAgIGZsb2F0IGEgPSBhbHBoYSAvICgxLjAgLSBhbHBoYSk7XFxuJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnICAgZmxvYXQgdCA9IHNxcnQoMS4wIC8gKGEgKiBhKSArIHZ0ICogKCAyLjAvYSArIDIuMCAtIHZ0ICkpIC0gMS4wIC8gYTtcXG4nXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmIChzdHJldGNoaW5nLmZ1biA9PSAnY2lyY2xlSW52Jykge1xuICAgICAgICAgICAgICAgIC8vIDEgLSBzQ2lyY2xlTG93KDEgLSB0LCBhbHBoYSlcbiAgICAgICAgICAgICAgICBpZiAoc3RyZXRjaGluZy5hbHBoYSA9PSAwKVxuICAgICAgICAgICAgICAgICAgICAvL2lmIChhbHBoYSA9PSAwKSByZXR1cm4gdDtcbiAgICAgICAgICAgICAgICAgICAgZnNoU3RyaW5nICs9ICcgICBmbG9hdCB0ID0gdnQ7XFxuJ1xuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHN0cmV0Y2hpbmcuYWxwaGEgPT0gMSlcbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgKGFscGhhID09IDEpIHJldHVybiBNYXRoLnNxcnQoMiAqIHQgLSB0ICogdCk7XG4gICAgICAgICAgICAgICAgICAgIGZzaFN0cmluZyArPSAnICAgZmxvYXQgdCA9IDEuMCAtIHNxcnQoKDEuMCAtIHZ0KSAqICgxLjAgKyB2dCkpO1xcbidcbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy9jb25zdCBhID0gYWxwaGEgLyAoMSAtIGFscGhhKTtcbiAgICAgICAgICAgICAgICAgICAgLy9yZXR1cm4gTWF0aC5zcXJ0KDEgLyAoYSAqIGEpICsgKDIgKiB0KSAvIGEgKyAyICogdCAtIHQgKiB0KSAtIDEgLyBhO1xuICAgICAgICAgICAgICAgICAgICBmc2hTdHJpbmcgKz1cbiAgICAgICAgICAgICAgICAgICAgICAgICcgICBmbG9hdCBhID0gYWxwaGEgLyAoMS4wIC0gYWxwaGEpO1xcbicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJyAgIGZsb2F0IHQgPSAxLjAgLSBzcXJ0KDEuMCAvIChhICogYSkgKyAoMS4wLXZ0KSAqICggMi4wL2EgKyAxLjAgKyB2dCApKSArIDEuMCAvIGE7XFxuJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignVW5leHBlY3RlZCBzdHJldGNoaW5nIGZ1bmN0aW9uIGNvZGU6ICcgKyBzdHJldGNoaW5nLmZ1bilcbiAgICAgICAgICAgICAgICBmc2hTdHJpbmcgKz0gJyAgIGZsb2F0IHQgPSB2dDtcXG4nXG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmc2hTdHJpbmcgKz0gJyAgIGZsb2F0IHQgPSB2dDtcXG4nXG4gICAgICAgIH1cblxuICAgICAgICAvL2Nob29zZSBpbml0aWFsIGFuZCBmaW5hbCBjb2xvcnMsIGFuZCBhZGp1c3QgdCB2YWx1ZVxuICAgICAgICBpZiAoY29sb3JzLmxlbmd0aCA9PSAxKSBmc2hTdHJpbmcgKz0gJyAgIHZlYzQgY0k9YzA7XFxuICAgdmVjNCBjRj1jMDtcXG4nXG4gICAgICAgIGVsc2UgaWYgKGNvbG9ycy5sZW5ndGggPT0gMikgZnNoU3RyaW5nICs9ICcgICB2ZWM0IGNJPWMwO1xcbiAgIHZlYzQgY0Y9YzE7XFxuJ1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IG5iID0gY29sb3JzLmxlbmd0aCAtIDFcbiAgICAgICAgICAgIGNvbnN0IG5icyA9IG5iICsgJy4wJ1xuICAgICAgICAgICAgZnNoU3RyaW5nICs9ICcgICB2ZWM0IGNJO1xcbidcbiAgICAgICAgICAgIGZzaFN0cmluZyArPSAnICAgdmVjNCBjRjtcXG4nXG4gICAgICAgICAgICBmc2hTdHJpbmcgKz0gJyAgIGlmKHQ8MS4wLycgKyBuYnMgKyAnKSB7IGNJPWMwOyBjRj1jMTsgdD10KicgKyBuYnMgKyAnOyB9XFxuJ1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDI7IGkgPCBuYjsgaSsrKVxuICAgICAgICAgICAgICAgIGZzaFN0cmluZyArPVxuICAgICAgICAgICAgICAgICAgICAnICAgZWxzZSBpZih0PCcgK1xuICAgICAgICAgICAgICAgICAgICBpICtcbiAgICAgICAgICAgICAgICAgICAgJy4wLycgK1xuICAgICAgICAgICAgICAgICAgICBuYnMgK1xuICAgICAgICAgICAgICAgICAgICAnKSB7IGNJPWMnICtcbiAgICAgICAgICAgICAgICAgICAgKGkgLSAxKSArXG4gICAgICAgICAgICAgICAgICAgICc7IGNGPWMnICtcbiAgICAgICAgICAgICAgICAgICAgaSArXG4gICAgICAgICAgICAgICAgICAgICc7IHQ9JyArXG4gICAgICAgICAgICAgICAgICAgIG5icyArXG4gICAgICAgICAgICAgICAgICAgICcqdC0nICtcbiAgICAgICAgICAgICAgICAgICAgKGkgLSAxKSArXG4gICAgICAgICAgICAgICAgICAgICcuMDsgfVxcbidcbiAgICAgICAgICAgIGZzaFN0cmluZyArPVxuICAgICAgICAgICAgICAgICcgICBlbHNlIHsgY0k9YycgKyAobmIgLSAxKSArICc7IGNGPWMnICsgbmIgKyAnOyB0PScgKyBuYnMgKyAnKnQtJyArIChuYiAtIDEpICsgJy4wOyB9XFxuJ1xuICAgICAgICB9XG5cbiAgICAgICAgLy9vbmUgc2luZ2xlIGNvbG9yXG4gICAgICAgIGlmIChjb2xvcnMubGVuZ3RoID09IDEpIGZzaFN0cmluZyArPSAnICAgZ2xfRnJhZ0NvbG9yID0gdmVjNChjMFswXSwgYzBbMV0sIGMwWzJdLCBjMFszXSk7fVxcbidcbiAgICAgICAgLy9zZXQgaW50ZXJwb2xhdGVkIGNvbG9yLCBiZXR3ZWVuIGluaXRpYWwgYW5kIGZpbmFsIG9uZVxuICAgICAgICBlbHNlIGZzaFN0cmluZyArPSAnICAgZ2xfRnJhZ0NvbG9yID0gbWl4KGNJLCBjRiwgdCk7fVxcbidcblxuICAgICAgICAvL2NvbnNvbGUubG9nKGZzaFN0cmluZylcblxuICAgICAgICAvKiogQHR5cGUge1dlYkdMU2hhZGVyfSAqL1xuICAgICAgICBjb25zdCBmU2hhZGVyID0gY3JlYXRlU2hhZGVyKGdsLCBnbC5GUkFHTUVOVF9TSEFERVIsIGZzaFN0cmluZylcblxuICAgICAgICAvKiogQHR5cGUge1dlYkdMUHJvZ3JhbX0gKi9cbiAgICAgICAgdGhpcy5wcm9ncmFtID0gaW5pdFNoYWRlclByb2dyYW0oZ2wsIHZTaGFkZXIsIGZTaGFkZXIpXG4gICAgICAgIGdsLnVzZVByb2dyYW0odGhpcy5wcm9ncmFtKVxuXG4gICAgICAgIC8vc2V0IHVuaWZvcm1zXG5cbiAgICAgICAgLy9zaXplUGl4XG4gICAgICAgIC8vVE9ETzogYnVnIGhlcmUuIFNlZW1zIHRvIGJlIGxpbWl0ZWQgdG8gc29tZSB0aHJlc2hvbGQgdmFsdWUgKGFyb3VuZCAyNTApLlxuICAgICAgICBnbC51bmlmb3JtMWYoZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHRoaXMucHJvZ3JhbSwgJ3NpemVQaXgnKSwgMS4wICogc2l6ZVBpeClcblxuICAgICAgICAvL3N0cmV0Y2hpbmcgYWxwaGEgZmFjdG9yXG4gICAgICAgIGdsLnVuaWZvcm0xZihnbC5nZXRVbmlmb3JtTG9jYXRpb24odGhpcy5wcm9ncmFtLCAnYWxwaGEnKSwgc3RyZXRjaGluZyA/IDEuMCAqIHN0cmV0Y2hpbmcuYWxwaGEgOiAwLjApXG5cbiAgICAgICAgLy9jb2xvcnNcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb2xvcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGMgPSBjb2xvcihjb2xvcnNbaV0pXG5cbiAgICAgICAgICAgIGxldCBvcGFjaXR5ID0gYy5vcGFjaXR5XG4gICAgICAgICAgICBpZiAoYy5vcGFjaXR5ID09IDEgJiYgZ2xvYmFsT3BhY2l0eSAhPSB1bmRlZmluZWQpIG9wYWNpdHkgPSBnbG9iYWxPcGFjaXR5XG5cbiAgICAgICAgICAgIGdsLnVuaWZvcm00ZnYoZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHRoaXMucHJvZ3JhbSwgJ2MnICsgaSksIFtcbiAgICAgICAgICAgICAgICArYy5yIC8gMjU1LjAsXG4gICAgICAgICAgICAgICAgK2MuZyAvIDI1NS4wLFxuICAgICAgICAgICAgICAgICtjLmIgLyAyNTUuMCxcbiAgICAgICAgICAgICAgICArb3BhY2l0eSxcbiAgICAgICAgICAgIF0pXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogICovXG4gICAgZHJhdyh2ZXJ0aWNlc0J1ZmZlciwgdEJ1ZmZlciwgdHJhbnNmb01hdCkge1xuICAgICAgICBjb25zdCBnbCA9IHRoaXMuZ2xcbiAgICAgICAgY29uc3QgcHJvZ3JhbSA9IHRoaXMucHJvZ3JhbVxuXG4gICAgICAgIC8vdmVydGljZSBkYXRhXG4gICAgICAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCBnbC5jcmVhdGVCdWZmZXIoKSlcbiAgICAgICAgZ2wuYnVmZmVyRGF0YShnbC5BUlJBWV9CVUZGRVIsIG5ldyBGbG9hdDMyQXJyYXkodmVydGljZXNCdWZmZXIpLCBnbC5TVEFUSUNfRFJBVylcbiAgICAgICAgY29uc3QgcG9zaXRpb24gPSBnbC5nZXRBdHRyaWJMb2NhdGlvbihwcm9ncmFtLCAncG9zJylcbiAgICAgICAgZ2wudmVydGV4QXR0cmliUG9pbnRlcihcbiAgICAgICAgICAgIHBvc2l0aW9uLFxuICAgICAgICAgICAgMiwgLy9udW1Db21wb25lbnRzXG4gICAgICAgICAgICBnbC5GTE9BVCwgLy90eXBlXG4gICAgICAgICAgICBmYWxzZSwgLy9ub3JtYWxpc2VcbiAgICAgICAgICAgIDAsIC8vc3RyaWRlXG4gICAgICAgICAgICAwIC8vb2Zmc2V0XG4gICAgICAgIClcbiAgICAgICAgZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkocG9zaXRpb24pXG5cbiAgICAgICAgLy90IGRhdGFcbiAgICAgICAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIGdsLmNyZWF0ZUJ1ZmZlcigpKVxuICAgICAgICBnbC5idWZmZXJEYXRhKGdsLkFSUkFZX0JVRkZFUiwgbmV3IEZsb2F0MzJBcnJheSh0QnVmZmVyKSwgZ2wuU1RBVElDX0RSQVcpXG4gICAgICAgIGNvbnN0IHQgPSBnbC5nZXRBdHRyaWJMb2NhdGlvbihwcm9ncmFtLCAndCcpXG4gICAgICAgIGdsLnZlcnRleEF0dHJpYlBvaW50ZXIodCwgMSwgZ2wuRkxPQVQsIGZhbHNlLCAwLCAwKVxuICAgICAgICBnbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheSh0KVxuXG4gICAgICAgIC8vdHJhbnNmb3JtYXRpb25cbiAgICAgICAgZ2wudW5pZm9ybU1hdHJpeDNmdihnbC5nZXRVbmlmb3JtTG9jYXRpb24ocHJvZ3JhbSwgJ21hdCcpLCBmYWxzZSwgbmV3IEZsb2F0MzJBcnJheSh0cmFuc2ZvTWF0KSlcblxuICAgICAgICAvLyBFbmFibGUgdGhlIGRlcHRoIHRlc3RcbiAgICAgICAgLy9nbC5lbmFibGUoZ2wuREVQVEhfVEVTVCk7XG4gICAgICAgIC8vIENsZWFyIHRoZSBjb2xvciBidWZmZXIgYml0XG4gICAgICAgIGdsLmNsZWFyKGdsLkNPTE9SX0JVRkZFUl9CSVQpXG4gICAgICAgIC8vIFNldCB0aGUgdmlldyBwb3J0XG4gICAgICAgIC8vZ2wudmlld3BvcnQoMCwgMCwgY2cudywgY2cuaCk7XG5cbiAgICAgICAgZ2wuZHJhd0FycmF5cyhnbC5QT0lOVFMsIDAsIHZlcnRpY2VzQnVmZmVyLmxlbmd0aCAvIDIpXG4gICAgfVxufVxuIiwiLy9AdHMtY2hlY2tcbid1c2Ugc3RyaWN0J1xuXG5pbXBvcnQgeyBpbml0U2hhZGVyUHJvZ3JhbSwgY3JlYXRlU2hhZGVyIH0gZnJvbSAnLi93ZWJHTFV0aWxzLmpzJ1xuaW1wb3J0IHsgY29sb3IgfSBmcm9tICdkMy1jb2xvcidcblxuLyoqXG4gKiBFdmVyeXRoaW5nIHRvIGVhc2lseSBkcmF3IGNvbG9yZWQgc3F1YXJlcyB3aXRoIHdlYkdMLlxuICogQWxsIHRoZSBzYW1lIHNpemUsIGJ1dCBkaWZmZXJlbnQgZmlsbCBjb2xvci5cbiAqIENvbG9yIGJhc2VkIG9uIGNhdGVnb3JpZXMuXG4gKi9cbmV4cG9ydCBjbGFzcyBXZWJHTFNxdWFyZUNvbG9yaW5nQ2F0QWR2YW5jZWQge1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7QXJyYXkuPHN0cmluZz59IGNvbG9yc1xuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGNvbG9ycykge1xuICAgICAgICAvKipcbiAgICAgICAgICogQHR5cGUge0FycmF5LjxzdHJpbmc+fSAqL1xuICAgICAgICB0aGlzLmNvbG9ycyA9IGNvbG9yc1xuXG4gICAgICAgIC8qKiBWZWN0b3Igc2hhZGVyIHByb2dyYW1cbiAgICAgICAgICogQHR5cGUge3N0cmluZ30gKi9cbiAgICAgICAgdGhpcy52c2hTdHJpbmcgPSBgXG4gICAgICAgIGF0dHJpYnV0ZSB2ZWMyIHBvcztcbiAgICAgICAgdW5pZm9ybSBmbG9hdCBzaXplUGl4O1xuICAgICAgICB1bmlmb3JtIG1hdDMgbWF0O1xuXG4gICAgICAgIGF0dHJpYnV0ZSBmbG9hdCBpO1xuICAgICAgICB2YXJ5aW5nIGZsb2F0IHZpO1xuXG4gICAgICAgIHZvaWQgbWFpbigpIHtcbiAgICAgICAgICBnbF9Qb3NpdGlvbiA9IHZlYzQobWF0ICogdmVjMyhwb3MsIDEuMCksIDEuMCk7XG4gICAgICAgICAgZ2xfUG9pbnRTaXplID0gc2l6ZVBpeDtcbiAgICAgICAgICB2aSA9IGk7XG4gICAgICAgIH1cbiAgICAgICAgYFxuXG4gICAgICAgIC8vcHJlcGFyZSBmcmFnbWVudCBzaGFkZXIgY29kZVxuICAgICAgICAvL2RlY2xhcmUgdGhlIHVuaWZvcm0gYW5kIG90aGVyIHZhcmlhYmxlc1xuICAgICAgICBjb25zdCBvdXQgPSBbXVxuICAgICAgICBvdXQucHVzaCgncHJlY2lzaW9uIG1lZGl1bXAgZmxvYXQ7XFxudmFyeWluZyBmbG9hdCB2aTtcXG4nKVxuICAgICAgICAvL2FkZCBjb2xvciB1bmlmb3Jtc1xuICAgICAgICBvdXQucHVzaCgndW5pZm9ybSB2ZWM0JylcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb2xvcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChpID4gMCkgb3V0LnB1c2goJywnKVxuICAgICAgICAgICAgb3V0LnB1c2goJyBjJyArIGkpXG4gICAgICAgIH1cbiAgICAgICAgb3V0LnB1c2goJztcXG4nKVxuICAgICAgICAvL3N0YXJ0IHRoZSBtYWluIGZ1bmN0aW9uXG4gICAgICAgIG91dC5wdXNoKCd2b2lkIG1haW4odm9pZCkge1xcbicpXG4gICAgICAgIC8vY2hvb3NlIGNvbG9yIGlcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb2xvcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChpID4gMCkgb3V0LnB1c2goJ2Vsc2UgJylcbiAgICAgICAgICAgIG91dC5wdXNoKCdpZih2aT09JylcbiAgICAgICAgICAgIG91dC5wdXNoKGkpXG4gICAgICAgICAgICBvdXQucHVzaCgnLjApIGdsX0ZyYWdDb2xvciA9IHZlYzQoYycpXG4gICAgICAgICAgICBvdXQucHVzaChpKVxuICAgICAgICAgICAgb3V0LnB1c2goJ1swXSwgYycpXG4gICAgICAgICAgICBvdXQucHVzaChpKVxuICAgICAgICAgICAgb3V0LnB1c2goJ1sxXSwgYycpXG4gICAgICAgICAgICBvdXQucHVzaChpKVxuICAgICAgICAgICAgb3V0LnB1c2goJ1syXSwgYycpXG4gICAgICAgICAgICBvdXQucHVzaChpKVxuICAgICAgICAgICAgb3V0LnB1c2goJ1szXSk7XFxuJylcbiAgICAgICAgfVxuICAgICAgICBvdXQucHVzaCgnZWxzZSBnbF9GcmFnQ29sb3IgPSB2ZWM0KDAuMCwgMC4wLCAwLjAsIDEuMCk7XFxufScpXG4gICAgICAgIC8qKiBGcmFnbWVudCBzaGFkZXIgcHJvZ3JhbVxuICAgICAgICAgKiBAdHlwZSB7c3RyaW5nfSAqL1xuICAgICAgICB0aGlzLmZzaFN0cmluZyA9IG91dC5qb2luKCcnKVxuICAgIH1cblxuICAgIC8qKiAgKi9cbiAgICBkcmF3KGdsLCB2ZXJ0aWNlc0J1ZmZlciwgaUJ1ZmZlciwgdHJhbnNmb01hdCwgc2l6ZVBpeCA9IDEwKSB7XG4gICAgICAgIC8qKiBAdHlwZSB7V2ViR0xTaGFkZXJ9ICovXG4gICAgICAgIGNvbnN0IHZTaGFkZXIgPSBjcmVhdGVTaGFkZXIoZ2wsIGdsLlZFUlRFWF9TSEFERVIsIHRoaXMudnNoU3RyaW5nKVxuXG4gICAgICAgIC8qKiBAdHlwZSB7V2ViR0xTaGFkZXJ9ICovXG4gICAgICAgIGNvbnN0IGZTaGFkZXIgPSBjcmVhdGVTaGFkZXIoZ2wsIGdsLkZSQUdNRU5UX1NIQURFUiwgdGhpcy5mc2hTdHJpbmcpXG5cbiAgICAgICAgLyoqIEB0eXBlIHtXZWJHTFByb2dyYW19ICovXG4gICAgICAgIGNvbnN0IHByb2dyYW0gPSBpbml0U2hhZGVyUHJvZ3JhbShnbCwgdlNoYWRlciwgZlNoYWRlcilcbiAgICAgICAgZ2wudXNlUHJvZ3JhbShwcm9ncmFtKVxuXG4gICAgICAgIC8vc2V0IHVuaWZvcm1zXG5cbiAgICAgICAgLy9zaXplUGl4XG4gICAgICAgIGdsLnVuaWZvcm0xZihnbC5nZXRVbmlmb3JtTG9jYXRpb24ocHJvZ3JhbSwgJ3NpemVQaXgnKSwgMS4wICogc2l6ZVBpeClcblxuICAgICAgICAvL2NvbG9yc1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY29sb3JzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBjID0gY29sb3IodGhpcy5jb2xvcnNbaV0pXG4gICAgICAgICAgICBnbC51bmlmb3JtNGZ2KGdsLmdldFVuaWZvcm1Mb2NhdGlvbihwcm9ncmFtLCAnYycgKyBpKSwgW1xuICAgICAgICAgICAgICAgICtjLnIgLyAyNTUuMCxcbiAgICAgICAgICAgICAgICArYy5nIC8gMjU1LjAsXG4gICAgICAgICAgICAgICAgK2MuYiAvIDI1NS4wLFxuICAgICAgICAgICAgICAgICtjLm9wYWNpdHksXG4gICAgICAgICAgICBdKVxuICAgICAgICB9XG5cbiAgICAgICAgLy92ZXJ0aWNlIGRhdGFcbiAgICAgICAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIGdsLmNyZWF0ZUJ1ZmZlcigpKVxuICAgICAgICBnbC5idWZmZXJEYXRhKGdsLkFSUkFZX0JVRkZFUiwgbmV3IEZsb2F0MzJBcnJheSh2ZXJ0aWNlc0J1ZmZlciksIGdsLlNUQVRJQ19EUkFXKVxuICAgICAgICBjb25zdCBwb3NpdGlvbiA9IGdsLmdldEF0dHJpYkxvY2F0aW9uKHByb2dyYW0sICdwb3MnKVxuICAgICAgICBnbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKFxuICAgICAgICAgICAgcG9zaXRpb24sXG4gICAgICAgICAgICAyLCAvL251bUNvbXBvbmVudHNcbiAgICAgICAgICAgIGdsLkZMT0FULCAvL3R5cGVcbiAgICAgICAgICAgIGZhbHNlLCAvL25vcm1hbGlzZVxuICAgICAgICAgICAgMCwgLy9zdHJpZGVcbiAgICAgICAgICAgIDAgLy9vZmZzZXRcbiAgICAgICAgKVxuICAgICAgICBnbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheShwb3NpdGlvbilcblxuICAgICAgICAvL2kgZGF0YVxuICAgICAgICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgZ2wuY3JlYXRlQnVmZmVyKCkpXG4gICAgICAgIGdsLmJ1ZmZlckRhdGEoZ2wuQVJSQVlfQlVGRkVSLCBuZXcgRmxvYXQzMkFycmF5KGlCdWZmZXIpLCBnbC5TVEFUSUNfRFJBVylcbiAgICAgICAgY29uc3QgaSA9IGdsLmdldEF0dHJpYkxvY2F0aW9uKHByb2dyYW0sICdpJylcbiAgICAgICAgZ2wudmVydGV4QXR0cmliUG9pbnRlcihpLCAxLCBnbC5GTE9BVCwgZmFsc2UsIDAsIDApXG4gICAgICAgIGdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KGkpXG5cbiAgICAgICAgLy90cmFuc2Zvcm1hdGlvblxuICAgICAgICBnbC51bmlmb3JtTWF0cml4M2Z2KGdsLmdldFVuaWZvcm1Mb2NhdGlvbihwcm9ncmFtLCAnbWF0JyksIGZhbHNlLCBuZXcgRmxvYXQzMkFycmF5KHRyYW5zZm9NYXQpKVxuXG4gICAgICAgIC8vIEVuYWJsZSB0aGUgZGVwdGggdGVzdFxuICAgICAgICAvL2dsLmVuYWJsZShnbC5ERVBUSF9URVNUKTtcbiAgICAgICAgLy8gQ2xlYXIgdGhlIGNvbG9yIGJ1ZmZlciBiaXRcbiAgICAgICAgZ2wuY2xlYXIoZ2wuQ09MT1JfQlVGRkVSX0JJVClcbiAgICAgICAgLy8gU2V0IHRoZSB2aWV3IHBvcnRcbiAgICAgICAgLy9nbC52aWV3cG9ydCgwLCAwLCBjZy53LCBjZy5oKTtcblxuICAgICAgICBnbC5kcmF3QXJyYXlzKGdsLlBPSU5UUywgMCwgdmVydGljZXNCdWZmZXIubGVuZ3RoIC8gMilcbiAgICB9XG59XG4iLCIvL0B0cy1jaGVja1xuJ3VzZSBzdHJpY3QnXG5cbmltcG9ydCB7IGV4dGVudCwgbWF4IH0gZnJvbSBcImQzLWFycmF5XCJcbmltcG9ydCB7IHNjYWxlUXVhbnRpbGUgfSBmcm9tIFwiZDMtc2NhbGVcIlxuXG4vKipcbiAqIEEgc2NhbGUgaXMgc2ltcGx5IGEgZnVuY3Rpb24gdGhhdCBtYXAgYSBkb21haW4gdG8gYSByYW5nZS5cbiAqIEB0eXBlZGVmIHtmdW5jdGlvbihudW1iZXIpOm51bWJlcn0gU2NhbGUgKi9cblxuLyoqXG4gKiBBIHNjYWxlIHdob3NlIHJhbmdlIGlzIGEgY29sb3IgKHN0cmluZykuXG4qIEB0eXBlZGVmIHtmdW5jdGlvbihudW1iZXIpOnN0cmluZ30gQ29sb3JTY2FsZSAqL1xuXG5cblxuLyoqXG4gKiBHZW5lcmljIGZ1bmN0aW9uIGZvciB2aWV3IHNjYWxlIC0gY29udGludW91c1xuICogXG4gKiBAcGFyYW0ge3sgdmFsdWVGdW5jdGlvbjpmdW5jdGlvbihpbXBvcnQoXCIuLi9EYXRhc2V0XCIpLkNlbGwpOm51bWJlciwgbWluVmFsdWU/Om51bWJlciwgbWluU2l6ZVBpeD86bnVtYmVyLCBtYXhTaXplRmFjdG9yPzpudW1iZXIsIHJhbmdlPzpbbnVtYmVyLCBudW1iZXJdLCBkb21haW4/OltudW1iZXIsIG51bWJlcl0sIHN0cmV0Y2hpbmc/OmZ1bmN0aW9uKG51bWJlcik6bnVtYmVyIH19IG9wdHMgXG4gKiBAcmV0dXJucyB7ZnVuY3Rpb24oQXJyYXkuPGltcG9ydChcIi4uL0RhdGFzZXRcIikuQ2VsbD4pOlNjYWxlfVxuICovXG5leHBvcnQgY29uc3Qgdmlld1NjYWxlID0gKG9wdHMpID0+IHtcbiAgICBjb25zdCB2YWx1ZUZ1bmN0aW9uID0gb3B0cy52YWx1ZUZ1bmN0aW9uXG4gICAgY29uc3QgbWluVmFsdWUgPSBvcHRzLm1pblZhbHVlIHx8IDBcbiAgICBjb25zdCBtaW5TaXplUGl4ID0gb3B0cy5taW5TaXplUGl4IHx8IDBcbiAgICBjb25zdCBtYXhTaXplRmFjdG9yID0gb3B0cy5tYXhTaXplRmFjdG9yIHx8IDFcbiAgICBjb25zdCBzdHJldGNoaW5nID0gb3B0cy5zdHJldGNoaW5nXG4gICAgY29uc3QgcmFuZ2VfID0gb3B0cy5yYW5nZVxuICAgIGNvbnN0IGRvbWFpbl8gPSBvcHRzLmRvbWFpblxuICAgIHJldHVybiAoY2VsbHMsIHIsIHopID0+IHtcbiAgICAgICAgY29uc3QgZG9tYWluID0gZG9tYWluXyB8fCBbbWluVmFsdWUsIG1heChjZWxscywgdmFsdWVGdW5jdGlvbildXG4gICAgICAgIGNvbnN0IHJhbmdlID0gcmFuZ2VfIHx8IFttaW5TaXplUGl4ICogeiwgciAqIG1heFNpemVGYWN0b3JdXG4gICAgICAgIHJldHVybiB0ID0+IHtcbiAgICAgICAgICAgIC8vc2NhbGUgdG8gWzAsMV1cbiAgICAgICAgICAgIHQgPSAodCAtIGRvbWFpblswXSkgLyAoZG9tYWluWzFdIC0gZG9tYWluWzBdKVxuICAgICAgICAgICAgLy9zdHJldGNoXG4gICAgICAgICAgICBpZiAoc3RyZXRjaGluZykgdCA9IHN0cmV0Y2hpbmcodClcbiAgICAgICAgICAgIC8vc2NhbGUgdG8gcmFuZ2VcbiAgICAgICAgICAgIHJldHVybiByYW5nZVswXSArIHQgKiAocmFuZ2VbMV0gLSByYW5nZVswXSlcbiAgICAgICAgfVxuICAgIH1cbn1cblxuXG4vKipcbiAqIEdlbmVyaWMgZnVuY3Rpb24gZm9yIHZpZXcgc2NhbGUgLSBxdWFudGlsZVxuICogXG4gKiBAcGFyYW0ge3sgdmFsdWVGdW5jdGlvbjpmdW5jdGlvbihpbXBvcnQoXCIuLi9EYXRhc2V0XCIpLkNlbGwpOm51bWJlciwgY2xhc3NOdW1iZXI/Om51bWJlciwgbWluU2l6ZVBpeD86bnVtYmVyLCBtYXhTaXplRmFjdG9yPzpudW1iZXIgfX0gb3B0cyBcbiAqIEByZXR1cm5zIHtmdW5jdGlvbihBcnJheS48aW1wb3J0KFwiLi4vRGF0YXNldFwiKS5DZWxsPik6U2NhbGV9XG4gKi9cbmV4cG9ydCBjb25zdCB2aWV3U2NhbGVRdWFudGlsZSA9IChvcHRzKSA9PiB7XG4gICAgY29uc3QgdmFsdWVGdW5jdGlvbiA9IG9wdHMudmFsdWVGdW5jdGlvblxuICAgIGNvbnN0IGNsYXNzTnVtYmVyID0gb3B0cy5jbGFzc051bWJlciB8fCAxMlxuICAgIGNvbnN0IG1pblNpemVQaXggPSBvcHRzLm1pblNpemVQaXggfHwgMVxuICAgIGNvbnN0IG1heFNpemVGYWN0b3IgPSBvcHRzLm1heFNpemVGYWN0b3IgfHwgMVxuICAgIGNvbnN0IHNjYWxlID0gc2NhbGVRdWFudGlsZSgpXG4gICAgcmV0dXJuIChjZWxscywgciwgeikgPT4ge1xuICAgICAgICBzY2FsZS5kb21haW4oY2VsbHMubWFwKHZhbHVlRnVuY3Rpb24pKVxuICAgICAgICBjb25zdCBtaW5TaXplR2VvID0gbWluU2l6ZVBpeCAqIHosIG1heFNpemVHZW8gPSByICogbWF4U2l6ZUZhY3RvclxuICAgICAgICBzY2FsZS5yYW5nZShBcnJheS5mcm9tKHsgbGVuZ3RoOiBjbGFzc051bWJlciB9LCAoXywgaSkgPT4gbWluU2l6ZUdlbyArIGkgKiAobWF4U2l6ZUdlbyAtIG1pblNpemVHZW8pIC8gKGNsYXNzTnVtYmVyIC0gMSkpKVxuICAgICAgICBzY2FsZS5icmVha3MgPSBzY2FsZS5xdWFudGlsZXMoKVxuICAgICAgICBzY2FsZS52YWx1ZXMgPSBzY2FsZS5yYW5nZSgpXG4gICAgICAgIHJldHVybiBzY2FsZTtcbiAgICB9XG59XG5cblxuXG5cblxuXG4vKipcbiAqIEdlbmVyaWMgZnVuY3Rpb24gZm9yIGNvbG9yIHZpZXcgc2NhbGUgLSBjb250aW51b3VzXG4gKiBcbiAqIEBwYXJhbSB7eyB2YWx1ZUZ1bmN0aW9uOmZ1bmN0aW9uKGltcG9ydChcIi4uL0RhdGFzZXRcIikuQ2VsbCk6bnVtYmVyLCBjb2xvclNjYWxlPzpmdW5jdGlvbihudW1iZXIpOnN0cmluZywgc3RyZXRjaGluZz86ZnVuY3Rpb24obnVtYmVyKTpudW1iZXIgfX0gb3B0cyBcbiAqIEByZXR1cm5zIHtmdW5jdGlvbihBcnJheS48aW1wb3J0KFwiLi4vRGF0YXNldFwiKS5DZWxsPik6Q29sb3JTY2FsZX1cbiAqL1xuZXhwb3J0IGNvbnN0IHZpZXdTY2FsZUNvbG9yID0gKG9wdHMpID0+IHtcbiAgICBjb25zdCB2YWx1ZUZ1bmN0aW9uID0gb3B0cy52YWx1ZUZ1bmN0aW9uXG4gICAgY29uc3QgY29sb3JTY2FsZSA9IG9wdHMuY29sb3JTY2FsZSB8fCAoKCkgPT4gXCJwdXJwbGVcIilcbiAgICBjb25zdCBzdHJldGNoaW5nID0gb3B0cy5zdHJldGNoaW5nXG4gICAgcmV0dXJuIChjZWxscykgPT4ge1xuICAgICAgICAvKiogQHR5cGUge1t1bmRlZmluZWQsIHVuZGVmaW5lZF0gfCBbbnVtYmVyLCBudW1iZXJdfSAqL1xuICAgICAgICBjb25zdCBkb21haW4gPSBleHRlbnQoY2VsbHMsIHZhbHVlRnVuY3Rpb24pXG4gICAgICAgIGNvbnN0IGFtcGxpdHVkZSA9IGRvbWFpblsxXSAtIGRvbWFpblswXVxuICAgICAgICBjb25zdCBzY2FsZSA9IHQgPT4ge1xuICAgICAgICAgICAgLy9zY2FsZSB0byBbMCwxXVxuICAgICAgICAgICAgdCA9ICh0IC0gZG9tYWluWzBdKSAvIGFtcGxpdHVkZVxuICAgICAgICAgICAgLy9zdHJldGNoXG4gICAgICAgICAgICBpZiAoc3RyZXRjaGluZykgdCA9IHN0cmV0Y2hpbmcodClcbiAgICAgICAgICAgIHJldHVybiBjb2xvclNjYWxlKHQpXG4gICAgICAgIH1cbiAgICAgICAgLy9mdW5jdGlvbiB0aGF0IHJldHVybiB0aGUgZG9tYWluIHZhbHVlIGZyb20gdGhlIFswLDFdIHJhbmdlLlxuICAgICAgICBzY2FsZS5pbnZlcnQgPSB0ID0+IHtcbiAgICAgICAgICAgIGlmIChzdHJldGNoaW5nKSB0ID0gc3RyZXRjaGluZy5pbnZlcnQodClcbiAgICAgICAgICAgIHJldHVybiBkb21haW5bMF0gKyB0ICogYW1wbGl0dWRlXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gc2NhbGU7XG4gICAgfVxufVxuXG4vKipcbiAqIEdlbmVyaWMgZnVuY3Rpb24gZm9yIGNvbG9yIHZpZXcgc2NhbGUgLSBxdWFudGlsZVxuICogXG4gKiBAcGFyYW0ge3sgdmFsdWVGdW5jdGlvbjpmdW5jdGlvbihpbXBvcnQoXCIuLi9EYXRhc2V0XCIpLkNlbGwpOm51bWJlciwgY2xhc3NOdW1iZXI/Om51bWJlciwgY29sb3JzPzpBcnJheS48c3RyaW5nPiwgY29sb3JTY2FsZT86ZnVuY3Rpb24obnVtYmVyKTpzdHJpbmcgfX0gb3B0cyBcbiAqIEByZXR1cm5zIHtmdW5jdGlvbihBcnJheS48aW1wb3J0KFwiLi4vRGF0YXNldFwiKS5DZWxsPik6Q29sb3JTY2FsZX1cbiAqL1xuZXhwb3J0IGNvbnN0IHZpZXdTY2FsZUNvbG9yUXVhbnRpbGUgPSAob3B0cykgPT4ge1xuICAgIGNvbnN0IHZhbHVlRnVuY3Rpb24gPSBvcHRzLnZhbHVlRnVuY3Rpb25cbiAgICBjb25zdCBjbGFzc051bWJlciA9IG9wdHMuY2xhc3NOdW1iZXIgfHwgMTJcblxuICAgIGxldCBjb2xvcnMgPSBvcHRzLmNvbG9yc1xuICAgIGlmIChvcHRzLmNvbG9yU2NhbGUpIGNvbG9ycyA9IGRpc2NyZXRlQ29sb3JzKG9wdHMuY29sb3JTY2FsZSwgY2xhc3NOdW1iZXIpXG4gICAgY29sb3JzID0gY29sb3JzIHx8IEFycmF5LmZyb20oeyBsZW5ndGg6IGNsYXNzTnVtYmVyIH0sIChfLCBpKSA9PiBcInJnYihcIiArIE1hdGguZmxvb3IoMjU1ICogaSAvIChjbGFzc051bWJlciAtIDEpKSArIFwiLDE1MCwxNTApXCIpXG5cbiAgICBjb25zdCBzY2FsZSA9IHNjYWxlUXVhbnRpbGUoKS5yYW5nZShjb2xvcnMpXG4gICAgcmV0dXJuIChjZWxscykgPT4ge1xuICAgICAgICBzY2FsZS5kb21haW4oY2VsbHMubWFwKHZhbHVlRnVuY3Rpb24pKTtcbiAgICAgICAgc2NhbGUuYnJlYWtzID0gc2NhbGUucXVhbnRpbGVzKClcbiAgICAgICAgc2NhbGUuY29sb3JzID0gY29sb3JzXG4gICAgICAgIHJldHVybiBzY2FsZTtcbiAgICB9XG59XG5cblxuXG5cbi8qKlxuICogY29tYmluZSB2aWV3IHNjYWxlIGZ1bmN0aW9uc1xuICogXG4gKiBAcGFyYW0geyp9IG9iaiBcbiAqIEByZXR1cm5zIFxuICovXG5leHBvcnQgY29uc3Qgdmlld1NjYWxlQ29tYmluYXRpb24gPSAob2JqKSA9PiB7XG4gICAgLy9vYmo6IHByb3AgYW5kIGEgZnVuY3Rpb24gdG8gY2FsbFxuICAgIHJldHVybiAoY2VsbHMsIHIsIHopID0+IHtcbiAgICAgICAgY29uc3Qgb3V0ID0ge31cbiAgICAgICAgZm9yIChjb25zdCBwIGluIG9iaikgeyBvdXRbcF0gPSBvYmpbcF0oY2VsbHMsIHIsIHopIH1cbiAgICAgICAgcmV0dXJuIG91dFxuICAgIH1cbn1cblxuXG5cblxuXG5cbi8qKlxuICogUmV0dXJuIGEgY2xhc3NpZmllciBmdW5jdGlvbiBmcm9tIGJyZWFrIHZhbHVlcy5cbiAqIFRoZSBjbGFzc2lmaWVyIGZ1bmN0aW9uIHJldHVybnMgdGhlIGNsYXNzIGlkIChmcm9tIDAgdG8gYnJlYWtzLmxlbmd0aCkgZnJvbSBhIHZhbHVlIHRvIGNsYXNzaWZpeS5cbiAqIEBwYXJhbSB7QXJyYXkuPG51bWJlcj59IGJyZWFrcyB0aGUgYnJlYWtzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjbGFzc2lmaWVyKGJyZWFrcykge1xuICAgIGNvbnN0IGJsID0gYnJlYWtzLmxlbmd0aFxuICAgIGNvbnN0IGNsYXNzaWZpZXIgPSB2YWx1ZSA9PiB7XG4gICAgICAgIGxldCBpID0gMFxuICAgICAgICB3aGlsZSAoaSA8IGJsKSB7XG4gICAgICAgICAgICBjb25zdCBicmVha18gPSBicmVha3NbaV1cbiAgICAgICAgICAgIGlmICh2YWx1ZSA8PSBicmVha18pIHJldHVybiBpXG4gICAgICAgICAgICBpKytcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaVxuICAgIH1cbiAgICBjbGFzc2lmaWVyLmJyZWFrcyA9IGJyZWFrc1xuICAgIHJldHVybiBjbGFzc2lmaWVyXG59XG5cblxuXG4vKipcbiAqIFJldHVybiBhIGNvbG9yIGNsYXNzaWZpZXIgZnVuY3Rpb24gZnJvbSBicmVhayB2YWx1ZXMuXG4gKiBUaGUgY2xhc3NpZmllciBmdW5jdGlvbiByZXR1cm5zIHRoZSBjb2xvciBmcm9tIGEgdmFsdWUgdG8gY2xhc3NpZml5LlxuICogVGhlcmUgc2hvdWxkIGJlIG9uZSBjb2xvciBtb3JlIHRoYW4gYnJlYWsgdmFsdWVzLlxuICogQHBhcmFtIHtBcnJheS48bnVtYmVyPn0gYnJlYWtzIHRoZSBicmVha3NcbiAqIEBwYXJhbSB7QXJyYXkuPHN0cmluZz59IGNvbG9ycyB0aGUgY29sb3JzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb2xvckNsYXNzaWZpZXIoYnJlYWtzLCBjb2xvcnMpIHtcbiAgICBjb25zdCBjbGFzc2lmaWVyXyA9IGNsYXNzaWZpZXIoYnJlYWtzKVxuICAgIGNvbnN0IGNvbG9yQ2xpc3NpZmllciA9IHZhbHVlID0+IGNvbG9yc1tjbGFzc2lmaWVyXyh2YWx1ZSldXG4gICAgY29sb3JDbGlzc2lmaWVyLmJyZWFrcyA9IGJyZWFrc1xuICAgIGNvbG9yQ2xpc3NpZmllci5jb2xvcnMgPSBjb2xvcnNcbiAgICByZXR1cm4gY29sb3JDbGlzc2lmaWVyXG59XG5cbi8qKlxuICogTWFrZSBhcnJheSBvZiBjb2xvcnMgZnJvbSBhIGNvbG9yU2NhbGVcbiAqIFxuICogQHBhcmFtIHtmdW5jdGlvbihudW1iZXIpOnN0cmluZ30gY29sb3JTY2FsZSBcbiAqIEBwYXJhbSB7bnVtYmVyfSBuYiBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRpc2NyZXRlQ29sb3JzKGNvbG9yU2NhbGUsIG5iKSB7XG4gICAgaWYgKG5iID09IDEpIHJldHVybiBbY29sb3JTY2FsZSgwLjUpXVxuICAgIGNvbnN0IG91dCA9IFtdXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuYjsgaSsrKVxuICAgICAgICBvdXQucHVzaChjb2xvclNjYWxlKGkgLyAobmIgLSAxKSkpXG4gICAgcmV0dXJuIG91dFxufVxuIiwiLy9AdHMtY2hlY2tcbid1c2Ugc3RyaWN0J1xuXG5cbi8vVE9ETyBpbnZlcnQgZm9yIGNpcmN1bGFyXG4vL1RPRE8gdXNlIE1hdGguc3FydFxuLy9UT0RPIHZhbGlkYXRlXG5cblxuLyoqXG4gKiBTb21lIGZ1bmN0aW9uIFswLDFdLT5bMCwxXSB0byBzdHJldGNoIHJhbmdlIG9mIHZhbHVlcy5cbiAqIEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL2V1cm9zdGF0L2dyaWR2aXovYmxvYi9tYXN0ZXIvZG9jcy9yZWZlcmVuY2UubWQjc3RyZXRjaGluZ1xuICogQHNlZSBodHRwczovL29ic2VydmFibGVocS5jb20vQGpnYWZmdXJpL3N0cmV0Y2hpbmdcbiAqL1xuXG4vL2lkZW50aXR5IGZ1bmN0aW9uXG5jb25zdCBpZGVudGl0eSA9IHQgPT4gdFxuaWRlbnRpdHkuaW52ZXJ0ID0gaWRlbnRpdHlcblxuXG4vKipcbiAqIEBwYXJhbSB7bnVtYmVyfSBiYXNlIFxuICogQHJldHVybnMge2Z1bmN0aW9uKG51bWJlcik6bnVtYmVyfVxuICovXG5leHBvcnQgY29uc3QgZXhwb25lbnRpYWxTY2FsZSA9IChiYXNlID0gMykgPT4ge1xuICAgIGlmIChiYXNlID09IDApIHJldHVybiBpZGVudGl0eVxuICAgIGNvbnN0IGEgPSAoTWF0aC5leHAoYmFzZSkgLSAxKVxuICAgIGNvbnN0IGYgPSB0ID0+IChNYXRoLmV4cCh0ICogYmFzZSkgLSAxKSAvIGFcbiAgICBmLmludmVydCA9IHQgPT4gTWF0aC5sb2coYSAqIHQgKyAxKSAvIGJhc2VcbiAgICByZXR1cm4gZlxufVxuXG4vKipcbiAqIEBwYXJhbSB7bnVtYmVyfSBiYXNlIFxuICogQHJldHVybnMge2Z1bmN0aW9uKG51bWJlcik6bnVtYmVyfVxuICovXG5leHBvcnQgY29uc3QgbG9nYXJpdGhtaWNTY2FsZSA9IChiYXNlID0gMykgPT4ge1xuICAgIGlmIChiYXNlID09IDApIHJldHVybiBpZGVudGl0eVxuICAgIGNvbnN0IGEgPSBNYXRoLmV4cChiYXNlKSwgYiA9IDEgLSBhXG4gICAgY29uc3QgZiA9IHQgPT4gMSAtIE1hdGgubG9nKGEgKyB0ICogYikgLyBiYXNlXG4gICAgZi5pbnZlcnQgPSB0ID0+IChNYXRoLmV4cCgoMSAtIHQpICogYmFzZSkgLSBhKSAvIGJcbiAgICByZXR1cm4gZlxufVxuXG5cblxuXG5cbi8qKlxuICogQHBhcmFtIHtudW1iZXJ9IGV4cG9uZW50IFxuICogQHJldHVybnMge2Z1bmN0aW9uKG51bWJlcik6bnVtYmVyfVxuICovXG5leHBvcnQgY29uc3QgcG93ZXJTY2FsZSA9IChleHBvbmVudCA9IDMpID0+IHtcbiAgICBpZiAoZXhwb25lbnQgPT0gMSkgcmV0dXJuIGlkZW50aXR5XG4gICAgLy9UT0RPIGlmIChleHBvbmVudCA9PSAwLjUpIHJldHVybiBNYXRoLnNxcnRcbiAgICBjb25zdCBmID0gdCA9PiBNYXRoLnBvdyh0LCBleHBvbmVudClcbiAgICBjb25zdCBhID0gMSAvIGV4cG9uZW50XG4gICAgZi5pbnZlcnQgPSB0ID0+IE1hdGgucG93KHQsIGEpXG4gICAgcmV0dXJuIGZcbn1cblxuLyoqXG4gKiBAcGFyYW0ge251bWJlcn0gZXhwb25lbnQgXG4gKiBAcmV0dXJucyB7ZnVuY3Rpb24obnVtYmVyKTpudW1iZXJ9XG4gKi9cbmV4cG9ydCBjb25zdCBwb3dlckludmVyc2VTY2FsZSA9IChleHBvbmVudCA9IDMpID0+IHtcbiAgICBpZiAoZXhwb25lbnQgPT0gMSkgcmV0dXJuIGlkZW50aXR5XG4gICAgLy9UT0RPIGlmIChleHBvbmVudCA9PSAyKSByZXR1cm4gdCA9PiAxIC0gTWF0aC5zcXJ0KDEgLSB0KVxuICAgIGNvbnN0IGEgPSAxIC8gZXhwb25lbnRcbiAgICBjb25zdCBmID0gdCA9PiAxIC0gTWF0aC5wb3coMSAtIHQsIGEpXG4gICAgZi5pbnZlcnQgPSB0ID0+IDEgLSBNYXRoLnBvdygxIC0gdCwgZXhwb25lbnQpXG4gICAgcmV0dXJuIGZcbn1cblxuXG5cblxuLyoqXG4gKiBAcGFyYW0ge251bWJlcn0gY2lyY3VsYXJpdHkgXG4gKiBAcmV0dXJucyB7ZnVuY3Rpb24obnVtYmVyKTpudW1iZXJ9XG4gKi9cbmV4cG9ydCBjb25zdCBjaXJjdWxhclNjYWxlID0gKGNpcmN1bGFyaXR5ID0gMC44KSA9PiB7XG4gICAgaWYgKGNpcmN1bGFyaXR5ID09IDApIHJldHVybiBpZGVudGl0eVxuICAgIGlmIChjaXJjdWxhcml0eSA9PSAxKSByZXR1cm4gdCA9PiBNYXRoLnNxcnQodCAqICgyIC0gdCkpXG4gICAgZWxzZSB7XG4gICAgICAgIGNvbnN0IGEgPSBjaXJjdWxhcml0eSAvICgxIC0gY2lyY3VsYXJpdHkpXG4gICAgICAgIHJldHVybiB0ID0+IE1hdGguc3FydCgxIC8gKGEgKiBhKSArIHQgKiAoMiAvIGEgKyAyIC0gdCkpIC0gMSAvIGFcbiAgICB9XG59XG5cbi8qKlxuICogQHBhcmFtIHtudW1iZXJ9IGNpcmN1bGFyaXR5IFxuICogQHJldHVybnMge2Z1bmN0aW9uKG51bWJlcik6bnVtYmVyfVxuICovXG5leHBvcnQgY29uc3QgY2lyY3VsYXJJbnZlcnNlU2NhbGUgPSAoY2lyY3VsYXJpdHkgPSAwLjgpID0+IHtcbiAgICBpZiAoY2lyY3VsYXJpdHkgPT0gMCkgcmV0dXJuIGlkZW50aXR5XG4gICAgY29uc3QgZiA9IGNpcmN1bGFyU2NhbGUoY2lyY3VsYXJpdHkpXG4gICAgcmV0dXJuIHQgPT4gMSAtIGYoMSAtIHQpXG59XG5cblxuXG5cblxuLy90ZXN0XG4vKlxuY29uc3QgdGVzdCA9IChmLCBmdW4sIGEsIGVyciA9IDFlLTEyKSA9PiB7XG4gICAgZm9yIChsZXQgdCA9IDA7IHQgPD0gMTsgdCArPSAxIC8gNTApIHtcbiAgICAgICAgY29uc3QgZXIgPSB0IC0gZi5pbnZlcnQoZih0KSlcbiAgICAgICAgaWYgKE1hdGguYWJzKGVyKSA8IGVycikgY29udGludWVcbiAgICAgICAgY29uc29sZS5sb2coZnVuLCBhLCBlcilcbiAgICB9XG59XG5cbmZvciAobGV0IGZ1biBvZiBbcG93ZXJTY2FsZSwgcG93ZXJJbnZlcnNlU2NhbGVdKVxuICAgIGZvciAobGV0IGV4cCA9IC0zMDsgZXhwIDw9IDUwOyBleHAgKz0gMSkge1xuICAgICAgICBpZiAoZXhwID09IDApIGNvbnRpbnVlXG4gICAgICAgIGNvbnN0IGYgPSBmdW4oZXhwKVxuICAgICAgICB0ZXN0KGYsIGZ1biwgZXhwKVxuICAgIH1cblxuXG5mb3IgKGxldCBmdW4gb2YgW2V4cG9uZW50aWFsU2NhbGUsIGxvZ2FyaXRobWljU2NhbGVdKVxuICAgIGZvciAobGV0IGJhc2UgPSAtMjA7IGJhc2UgPD0gMjA7IGJhc2UgKz0gMSkge1xuICAgICAgICAvL2lmIChleHAgPT0gMCkgY29udGludWVcbiAgICAgICAgY29uc3QgZiA9IGZ1bihiYXNlKVxuICAgICAgICB0ZXN0KGYsIGZ1biwgYmFzZSwgMWUtMTApXG4gICAgfVxuKi8iLCIvL0B0cy1jaGVja1xuJ3VzZSBzdHJpY3QnXG5cbi8qKlxuICogR2V0IHRoZSBjbGFzcyBpZCBmcm9tIGEgdmFsdWUgYW5kIGNsYXNzIGJyZWFrIHZhbHVlc1xuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSB2IHRoZSB2YWx1ZVxuICogQHBhcmFtIHtBcnJheS48bnVtYmVyPn0gYnJlYWtzIHRoZSBicmVha3NcbiAqIEByZXR1cm5zIFRoZSBjbGFzcyBpZCwgZnJvbSAwIHRvIGJyZWFrcy5sZW5ndGhcbiAqIEBkZXByZWNhdGVkIHVzZSBnZXRDbGFzc2lmaWVyIGluc3RlYWRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldENsYXNzKHYsIGJyZWFrcykge1xuICAgIGlmICghYnJlYWtzKSByZXR1cm5cbiAgICBpZiAoYnJlYWtzLmxlbmd0aCA9PSAwKSByZXR1cm4gMFxuICAgIGlmICh2IDw9IGJyZWFrc1swXSkgcmV0dXJuIDBcbiAgICBmb3IgKGxldCBpID0gMTsgaSA8IGJyZWFrcy5sZW5ndGg7IGkrKykgaWYgKGJyZWFrc1tpIC0gMV0gPCB2ICYmIHYgPD0gYnJlYWtzW2ldKSByZXR1cm4gaVxuICAgIHJldHVybiBicmVha3MubGVuZ3RoXG59XG5cblxuXG4vL3Rha2UgJ25pY2UnIHZhbHVlIChwb3dlciBvZiB0ZW4sIG9yIG11bHRpcGxlKVxuZXhwb3J0IGZ1bmN0aW9uIG5pY2UodiwgbXVsdGlwbGVzID0gWzgsIDYsIDUsIDQsIDIuNSwgMl0pIHtcbiAgICAvL2NvbXB1dGUgYmlnZ2VyIHBvd2VyIG9mIHRlbiBiZWxvd1xuICAgIGNvbnN0IHZfID0gTWF0aC5wb3coMTAsIE1hdGguZmxvb3IoTWF0aC5sb2cxMCh2KSkpXG4gICAgZm9yIChsZXQgbXVsdGlwbGUgb2YgbXVsdGlwbGVzKVxuICAgICAgICBpZiAodl8gKiBtdWx0aXBsZSA8PSB2KSByZXR1cm4gdl8gKiBtdWx0aXBsZVxuICAgIHJldHVybiB2X1xufVxuXG5cblxuXG5cblxuZXhwb3J0IGxldCBtb25pdG9yID0gZmFsc2VcblxubGV0IHByZXZpb3VzRGF0ZVxuZXhwb3J0IGZ1bmN0aW9uIG1vbml0b3JEdXJhdGlvbihtZXNzYWdlKSB7XG4gICAgY29uc3Qgbm93RGF0ZSA9IERhdGUubm93KClcblxuICAgIC8vZmlyc3QgY2FsbFxuICAgIGlmICghcHJldmlvdXNEYXRlKSB7XG4gICAgICAgIHByZXZpb3VzRGF0ZSA9IG5vd0RhdGVcbiAgICAgICAgY29uc29sZS5sb2cocHJldmlvdXNEYXRlLCBtZXNzYWdlKVxuICAgICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBjb25zdCBkID0gbm93RGF0ZSAtIHByZXZpb3VzRGF0ZVxuICAgIHByZXZpb3VzRGF0ZSA9IG5vd0RhdGVcbiAgICBjb25zb2xlLmxvZyhkLCBtZXNzYWdlKVxufVxuIiwiLy9AdHMtY2hlY2tcbid1c2Ugc3RyaWN0J1xuXG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSB3aWR0aFxuICogQHBhcmFtIHtzdHJpbmd9IGhlaWdodFxuICogQHBhcmFtIHtvYmplY3R9IG9wdHNcbiAqIEByZXR1cm5zIHt7Y2FudmFzOkhUTUxDYW52YXNFbGVtZW50LCBnbDpXZWJHTFJlbmRlcmluZ0NvbnRleHR9fVxuICovXG5leHBvcnQgZnVuY3Rpb24gbWFrZVdlYkdMQ2FudmFzKHdpZHRoLCBoZWlnaHQsIG9wdHMpIHtcbiAgICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKVxuICAgIGNhbnZhcy5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgd2lkdGgpXG4gICAgY2FudmFzLnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgaGVpZ2h0KVxuICAgIGNvbnN0IGdsID0gY2FudmFzLmdldENvbnRleHQoJ3dlYmdsJywgb3B0cylcbiAgICBpZiAoIWdsKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVW5hYmxlIHRvIGluaXRpYWxpemUgV2ViR0wuIFlvdXIgYnJvd3NlciBvciBtYWNoaW5lIG1heSBub3Qgc3VwcG9ydCBpdC4nKVxuICAgIH1cbiAgICByZXR1cm4geyBjYW52YXM6IGNhbnZhcywgZ2w6IGdsIH1cbn1cblxuLyoqXG4gKiBJbml0aWFsaXplIGEgc2hhZGVyIHByb2dyYW0sIHNvIFdlYkdMIGtub3dzIGhvdyB0byBkcmF3IG91ciBkYXRhXG4gKlxuICogQHBhcmFtIHtXZWJHTFJlbmRlcmluZ0NvbnRleHR9IGdsXG4gKiBAcGFyYW0gIHsuLi5XZWJHTFNoYWRlcn0gc2hhZGVyc1xuICogQHJldHVybnMge1dlYkdMUHJvZ3JhbX1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGluaXRTaGFkZXJQcm9ncmFtKGdsLCAuLi5zaGFkZXJzKSB7XG4gICAgLyoqIEB0eXBlIHtXZWJHTFByb2dyYW18bnVsbH0gKi9cbiAgICBjb25zdCBwcm9ncmFtID0gZ2wuY3JlYXRlUHJvZ3JhbSgpXG4gICAgaWYgKHByb2dyYW0gPT0gbnVsbCkgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3QgY3JlYXRlIHdlYkdMIHByb2dyYW0nKVxuICAgIGZvciAoY29uc3Qgc2hhZGVyIG9mIHNoYWRlcnMpIGdsLmF0dGFjaFNoYWRlcihwcm9ncmFtLCBzaGFkZXIpXG4gICAgZ2wubGlua1Byb2dyYW0ocHJvZ3JhbSlcbiAgICBpZiAoZ2wuZ2V0UHJvZ3JhbVBhcmFtZXRlcihwcm9ncmFtLCBnbC5MSU5LX1NUQVRVUykpIHJldHVybiBwcm9ncmFtXG4gICAgdGhyb3cgbmV3IEVycm9yKGdsLmdldFByb2dyYW1JbmZvTG9nKHByb2dyYW0pIHx8ICdDYW5ub3QgY3JlYXRlIHdlYkdMIHByb2dyYW0gKDIpJylcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgc2hhZGVyIG9mIHRoZSBnaXZlbiB0eXBlLCB1cGxvYWRzIHRoZSBzb3VyY2UgYW5kIGNvbXBpbGVzIGl0LlxuICpcbiAqIEBwYXJhbSB7V2ViR0xSZW5kZXJpbmdDb250ZXh0fSBnbFxuICogQHBhcmFtIHtudW1iZXJ9IHR5cGVcbiAqIEBwYXJhbSAgey4uLnN0cmluZ30gc291cmNlc1xuICogQHJldHVybnMge1dlYkdMU2hhZGVyfVxuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2hhZGVyKGdsLCB0eXBlLCAuLi5zb3VyY2VzKSB7XG4gICAgLyoqIEB0eXBlIHtXZWJHTFNoYWRlcnxudWxsfSAqL1xuICAgIGNvbnN0IHNoYWRlciA9IGdsLmNyZWF0ZVNoYWRlcih0eXBlKVxuICAgIGlmIChzaGFkZXIgPT0gbnVsbCkgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3QgY3JlYXRlIHdlYkdMIHNoYWRlcicpXG4gICAgZ2wuc2hhZGVyU291cmNlKHNoYWRlciwgc291cmNlcy5qb2luKCdcXG4nKSlcbiAgICBnbC5jb21waWxlU2hhZGVyKHNoYWRlcilcbiAgICBpZiAoZ2wuZ2V0U2hhZGVyUGFyYW1ldGVyKHNoYWRlciwgZ2wuQ09NUElMRV9TVEFUVVMpKSByZXR1cm4gc2hhZGVyXG4gICAgdGhyb3cgbmV3IEVycm9yKGdsLmdldFNoYWRlckluZm9Mb2coc2hhZGVyKSB8fCAnQ2Fubm90IGNyZWF0ZSB3ZWJHTCBzaGFkZXIgKDIpJylcbn1cblxuLyoqXG4gKiBDaGVjayBpZiB3ZWJHTCBpcyBzdXBwb3J0ZWRcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNoZWNrV2ViR0xTdXBwb3J0KCkge1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpXG4gICAgICAgIHJldHVybiAhIXdpbmRvdy5XZWJHTFJlbmRlcmluZ0NvbnRleHQgJiZcbiAgICAgICAgICAgIChjYW52YXMuZ2V0Q29udGV4dCgnd2ViZ2wnKSB8fCBjYW52YXMuZ2V0Q29udGV4dCgnZXhwZXJpbWVudGFsLXdlYmdsJykpXG4gICAgICAgICAgICA/IHRydWVcbiAgICAgICAgICAgIDogZmFsc2VcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvL0B0cy1jaGVja1xuJ3VzZSBzdHJpY3QnXG5cbi8vIHRoZSBhcHBsaWNhdGlvblxuZXhwb3J0IHsgTWFwIH0gZnJvbSAnLi9NYXAuanMnXG4vL2V4cG9ydCB7IEdlb0NhbnZhcyB9IGZyb20gJy4vR2VvQ2FudmFzLmpzJ1xuZXhwb3J0IHsgU3R5bGUgfSBmcm9tICcuL1N0eWxlLmpzJ1xuZXhwb3J0IHsgTGF5ZXIgfSBmcm9tICcuL0xheWVyLmpzJ1xuZXhwb3J0IHsgTXVsdGlSZXNvbHV0aW9uRGF0YXNldCB9IGZyb20gJy4vTXVsdGlSZXNvbHV0aW9uRGF0YXNldC5qcydcblxuLy8gZXhwb3J0IGRhdGFzZXQgdHlwZXNcbi8vZXhwb3J0IHsgRGF0YXNldCB9IGZyb20gJy4vRGF0YXNldC5qcydcbmV4cG9ydCB7IFRpbGVkR3JpZCB9IGZyb20gJy4vZGF0YXNldC9UaWxlZEdyaWQuanMnXG5leHBvcnQgeyBDU1ZHcmlkIH0gZnJvbSAnLi9kYXRhc2V0L0NTVkdyaWQuanMnXG5leHBvcnQgeyBKU0dyaWQgfSBmcm9tICcuL2RhdGFzZXQvSlNHcmlkLmpzJ1xuLy9leHBvcnQgeyBHZW9USUZGIH0gZnJvbSBcIi4vZGF0YXNldC9HZW9USUZGXCJcblxuLy8gZXhwb3J0IHN0eWxlc1xuZXhwb3J0IHsgU2hhcGVDb2xvclNpemVTdHlsZSB9IGZyb20gJy4vc3R5bGUvU2hhcGVDb2xvclNpemVTdHlsZS5qcydcbmV4cG9ydCB7IFN0cm9rZVN0eWxlIH0gZnJvbSAnLi9zdHlsZS9TdHJva2VTdHlsZS5qcydcbmV4cG9ydCB7IEpveVBsb3RTdHlsZSB9IGZyb20gJy4vc3R5bGUvSm95UGxvdFN0eWxlLmpzJ1xuZXhwb3J0IHsgQ29tcG9zaXRpb25TdHlsZSB9IGZyb20gJy4vc3R5bGUvQ29tcG9zaXRpb25TdHlsZS5qcydcbmV4cG9ydCB7IFNlZ21lbnRTdHlsZSB9IGZyb20gJy4vc3R5bGUvU2VnbWVudFN0eWxlLmpzJ1xuZXhwb3J0IHsgVGV4dFN0eWxlIH0gZnJvbSAnLi9zdHlsZS9UZXh0U3R5bGUuanMnXG5leHBvcnQgeyBQaWxsYXJTdHlsZSB9IGZyb20gJy4vc3R5bGUvUGlsbGFyU3R5bGUuanMnXG5leHBvcnQgeyBTaWRlU3R5bGUgfSBmcm9tICcuL3N0eWxlL1NpZGVTdHlsZS5qcydcbmV4cG9ydCB7IENvbnRvdXJTdHlsZSB9IGZyb20gJy4vc3R5bGUvQ29udG91clN0eWxlLmpzJ1xuZXhwb3J0IHsgU2lkZUNhdFN0eWxlIH0gZnJvbSAnLi9zdHlsZS9TaWRlQ2F0U3R5bGUuanMnXG5leHBvcnQgeyBEb3REZW5zaXR5U3R5bGUgfSBmcm9tICcuL3N0eWxlL0RvdERlbnNpdHlTdHlsZS5qcydcbmV4cG9ydCB7IFRhbmFrYVN0eWxlIH0gZnJvbSAnLi9zdHlsZS9UYW5ha2FTdHlsZS5qcydcbmV4cG9ydCB7IExlZ29TdHlsZSB9IGZyb20gJy4vc3R5bGUvTGVnb1N0eWxlLmpzJ1xuZXhwb3J0IHsgU3F1YXJlQ29sb3JXR0xTdHlsZSB9IGZyb20gJy4vc3R5bGUvU3F1YXJlQ29sb3JXR0xTdHlsZS5qcydcbmV4cG9ydCB7IFNxdWFyZUNvbG9yQ2F0V0dMU3R5bGUgfSBmcm9tICcuL3N0eWxlL1NxdWFyZUNvbG9yQ2F0V0dMU3R5bGUuanMnXG5leHBvcnQgeyBNb3NhaWNTdHlsZSB9IGZyb20gJy4vc3R5bGUvTW9zYWljU3R5bGUuanMnXG5leHBvcnQgeyBOaW5qYVN0YXJTdHlsZSB9IGZyb20gJy4vc3R5bGUvTmluamFTdGFyU3R5bGUuanMnXG5leHBvcnQgeyBUaW1lU2VyaWVzU3R5bGUgfSBmcm9tICcuL3N0eWxlL1RpbWVTZXJpZXNTdHlsZS5qcydcbmV4cG9ydCB7IElzb0ZlbmNlU3R5bGUgfSBmcm9tICcuL3N0eWxlL0lzb0ZlbmNlU3R5bGUuanMnXG5cbi8vIGV4cG9ydCBhZGRpdGlvbmFsIGxheWVyc1xuZXhwb3J0IHsgR3JpZExheWVyIH0gZnJvbSAnLi9sYXllci9HcmlkTGF5ZXIuanMnXG5leHBvcnQgeyBCYWNrZ3JvdW5kTGF5ZXIgfSBmcm9tICcuL2xheWVyL0JhY2tncm91bmRMYXllci5qcydcbmV4cG9ydCB7IEJhY2tncm91bmRMYXllcldNUyB9IGZyb20gJy4vbGF5ZXIvQmFja2dyb3VuZExheWVyV01TLmpzJ1xuZXhwb3J0IHsgTGFiZWxMYXllciB9IGZyb20gJy4vbGF5ZXIvTGFiZWxMYXllci5qcydcbmV4cG9ydCB7IExpbmVMYXllciBhcyBCb3VuZGFyeUxheWVyIH0gZnJvbSAnLi9sYXllci9MaW5lTGF5ZXIuanMnXG5cbi8vIGV4cG9ydCBsZWdlbmRzXG5leHBvcnQgeyBDb2xvckxlZ2VuZCB9IGZyb20gJy4vbGVnZW5kL0NvbG9yTGVnZW5kLmpzJ1xuZXhwb3J0IHsgQ29sb3JEaXNjcmV0ZUxlZ2VuZCB9IGZyb20gJy4vbGVnZW5kL0NvbG9yRGlzY3JldGVMZWdlbmQuanMnXG5leHBvcnQgeyBDb2xvckNhdGVnb3J5TGVnZW5kIH0gZnJvbSAnLi9sZWdlbmQvQ29sb3JDYXRlZ29yeUxlZ2VuZC5qcydcbmV4cG9ydCB7IFNpemVMZWdlbmQsIHNpemVMZWdlbmQsIHNpemVMZWdlbmRWaWV3U2NhbGUsIHNpemVEaXNjcmV0ZUxlZ2VuZCwgc2l6ZURpc2NyZXRlVmlld1NjYWxlTGVnZW5kIH0gZnJvbSAnLi9sZWdlbmQvU2l6ZUxlZ2VuZC5qcydcbmV4cG9ydCB7IFNlZ21lbnRXaWR0aExlZ2VuZCB9IGZyb20gJy4vbGVnZW5kL1NlZ21lbnRXaWR0aExlZ2VuZC5qcydcbmV4cG9ydCB7IFNlZ21lbnRPcmllbnRhdGlvbkxlZ2VuZCB9IGZyb20gJy4vbGVnZW5kL1NlZ21lbnRPcmllbnRhdGlvbkxlZ2VuZC5qcydcblxuLy8gZXhwb3J0IHsgZ29Ub1N0cmFpZ2h0LCB6b29tVG8gfSBmcm9tIFwiLi91dGlscy96b29tVXRpbHNcIlxuZXhwb3J0ICogZnJvbSAnLi91dGlscy9zdHJldGNoaW5nLmpzJ1xuZXhwb3J0ICogZnJvbSAnLi91dGlscy9zY2FsZS5qcydcbmV4cG9ydCB7IG5pY2UgfSBmcm9tICcuL3V0aWxzL3V0aWxzLmpzJ1xuXG5pbXBvcnQgeyBHZW9DYW52YXMgfSBmcm9tICcuL0dlb0NhbnZhcy5qcydcbmV4cG9ydCBjb25zdCBnZXRQYXJhbWV0ZXJCeU5hbWUgPSBHZW9DYW52YXMuZ2V0UGFyYW1ldGVyQnlOYW1lXG5cbi8vIHNldCBkZWZhdWx0IGQzIGxvY2FsZVxuaW1wb3J0IHsgZm9ybWF0RGVmYXVsdExvY2FsZSB9IGZyb20gJ2QzLWZvcm1hdCdcbmZvcm1hdERlZmF1bHRMb2NhbGUoe1xuICAgIGRlY2ltYWw6ICcuJyxcbiAgICB0aG91c2FuZHM6ICcgJyxcbiAgICBncm91cGluZzogWzNdLFxuICAgIGN1cnJlbmN5OiBbJycsICfigqwnXSxcbn0pXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=