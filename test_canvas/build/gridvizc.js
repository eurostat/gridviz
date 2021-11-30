(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["gviz"] = factory();
	else
		root["gviz"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "build/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/gridvizc/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../node_modules/d3-color/src/color.js":
/*!*********************************************!*\
  !*** ../node_modules/d3-color/src/color.js ***!
  \*********************************************/
/*! exports provided: Color, darker, brighter, default, rgbConvert, rgb, Rgb, hslConvert, hsl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Color", function() { return Color; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "darker", function() { return darker; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "brighter", function() { return brighter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return color; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rgbConvert", function() { return rgbConvert; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rgb", function() { return rgb; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Rgb", function() { return Rgb; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hslConvert", function() { return hslConvert; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hsl", function() { return hsl; });
/* harmony import */ var _define_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./define.js */ "../node_modules/d3-color/src/define.js");


function Color() {}

var darker = 0.7;
var brighter = 1 / darker;

var reI = "\\s*([+-]?\\d+)\\s*",
    reN = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*",
    reP = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
    reHex = /^#([0-9a-f]{3,8})$/,
    reRgbInteger = new RegExp("^rgb\\(" + [reI, reI, reI] + "\\)$"),
    reRgbPercent = new RegExp("^rgb\\(" + [reP, reP, reP] + "\\)$"),
    reRgbaInteger = new RegExp("^rgba\\(" + [reI, reI, reI, reN] + "\\)$"),
    reRgbaPercent = new RegExp("^rgba\\(" + [reP, reP, reP, reN] + "\\)$"),
    reHslPercent = new RegExp("^hsl\\(" + [reN, reP, reP] + "\\)$"),
    reHslaPercent = new RegExp("^hsla\\(" + [reN, reP, reP, reN] + "\\)$");

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

Object(_define_js__WEBPACK_IMPORTED_MODULE_0__["default"])(Color, color, {
  copy: function(channels) {
    return Object.assign(new this.constructor, this, channels);
  },
  displayable: function() {
    return this.rgb().displayable();
  },
  hex: color_formatHex, // Deprecated! Use color.formatHex.
  formatHex: color_formatHex,
  formatHsl: color_formatHsl,
  formatRgb: color_formatRgb,
  toString: color_formatRgb
});

function color_formatHex() {
  return this.rgb().formatHex();
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

Object(_define_js__WEBPACK_IMPORTED_MODULE_0__["default"])(Rgb, rgb, Object(_define_js__WEBPACK_IMPORTED_MODULE_0__["extend"])(Color, {
  brighter: function(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  darker: function(k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  rgb: function() {
    return this;
  },
  displayable: function() {
    return (-0.5 <= this.r && this.r < 255.5)
        && (-0.5 <= this.g && this.g < 255.5)
        && (-0.5 <= this.b && this.b < 255.5)
        && (0 <= this.opacity && this.opacity <= 1);
  },
  hex: rgb_formatHex, // Deprecated! Use color.formatHex.
  formatHex: rgb_formatHex,
  formatRgb: rgb_formatRgb,
  toString: rgb_formatRgb
}));

function rgb_formatHex() {
  return "#" + hex(this.r) + hex(this.g) + hex(this.b);
}

function rgb_formatRgb() {
  var a = this.opacity; a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
  return (a === 1 ? "rgb(" : "rgba(")
      + Math.max(0, Math.min(255, Math.round(this.r) || 0)) + ", "
      + Math.max(0, Math.min(255, Math.round(this.g) || 0)) + ", "
      + Math.max(0, Math.min(255, Math.round(this.b) || 0))
      + (a === 1 ? ")" : ", " + a + ")");
}

function hex(value) {
  value = Math.max(0, Math.min(255, Math.round(value) || 0));
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

Object(_define_js__WEBPACK_IMPORTED_MODULE_0__["default"])(Hsl, hsl, Object(_define_js__WEBPACK_IMPORTED_MODULE_0__["extend"])(Color, {
  brighter: function(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  darker: function(k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  rgb: function() {
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
  displayable: function() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s))
        && (0 <= this.l && this.l <= 1)
        && (0 <= this.opacity && this.opacity <= 1);
  },
  formatHsl: function() {
    var a = this.opacity; a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
    return (a === 1 ? "hsl(" : "hsla(")
        + (this.h || 0) + ", "
        + (this.s || 0) * 100 + "%, "
        + (this.l || 0) * 100 + "%"
        + (a === 1 ? ")" : ", " + a + ")");
  }
}));

/* From FvD 13.37, CSS Color Module Level 3 */
function hsl2rgb(h, m1, m2) {
  return (h < 60 ? m1 + (m2 - m1) * h / 60
      : h < 180 ? m2
      : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60
      : m1) * 255;
}


/***/ }),

/***/ "../node_modules/d3-color/src/cubehelix.js":
/*!*************************************************!*\
  !*** ../node_modules/d3-color/src/cubehelix.js ***!
  \*************************************************/
/*! exports provided: default, Cubehelix */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return cubehelix; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Cubehelix", function() { return Cubehelix; });
/* harmony import */ var _define_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./define.js */ "../node_modules/d3-color/src/define.js");
/* harmony import */ var _color_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./color.js */ "../node_modules/d3-color/src/color.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./math.js */ "../node_modules/d3-color/src/math.js");




var A = -0.14861,
    B = +1.78277,
    C = -0.29227,
    D = -0.90649,
    E = +1.97294,
    ED = E * D,
    EB = E * B,
    BC_DA = B * C - D * A;

function cubehelixConvert(o) {
  if (o instanceof Cubehelix) return new Cubehelix(o.h, o.s, o.l, o.opacity);
  if (!(o instanceof _color_js__WEBPACK_IMPORTED_MODULE_1__["Rgb"])) o = Object(_color_js__WEBPACK_IMPORTED_MODULE_1__["rgbConvert"])(o);
  var r = o.r / 255,
      g = o.g / 255,
      b = o.b / 255,
      l = (BC_DA * b + ED * r - EB * g) / (BC_DA + ED - EB),
      bl = b - l,
      k = (E * (g - l) - C * bl) / D,
      s = Math.sqrt(k * k + bl * bl) / (E * l * (1 - l)), // NaN if l=0 or l=1
      h = s ? Math.atan2(k, bl) * _math_js__WEBPACK_IMPORTED_MODULE_2__["rad2deg"] - 120 : NaN;
  return new Cubehelix(h < 0 ? h + 360 : h, s, l, o.opacity);
}

function cubehelix(h, s, l, opacity) {
  return arguments.length === 1 ? cubehelixConvert(h) : new Cubehelix(h, s, l, opacity == null ? 1 : opacity);
}

function Cubehelix(h, s, l, opacity) {
  this.h = +h;
  this.s = +s;
  this.l = +l;
  this.opacity = +opacity;
}

Object(_define_js__WEBPACK_IMPORTED_MODULE_0__["default"])(Cubehelix, cubehelix, Object(_define_js__WEBPACK_IMPORTED_MODULE_0__["extend"])(_color_js__WEBPACK_IMPORTED_MODULE_1__["Color"], {
  brighter: function(k) {
    k = k == null ? _color_js__WEBPACK_IMPORTED_MODULE_1__["brighter"] : Math.pow(_color_js__WEBPACK_IMPORTED_MODULE_1__["brighter"], k);
    return new Cubehelix(this.h, this.s, this.l * k, this.opacity);
  },
  darker: function(k) {
    k = k == null ? _color_js__WEBPACK_IMPORTED_MODULE_1__["darker"] : Math.pow(_color_js__WEBPACK_IMPORTED_MODULE_1__["darker"], k);
    return new Cubehelix(this.h, this.s, this.l * k, this.opacity);
  },
  rgb: function() {
    var h = isNaN(this.h) ? 0 : (this.h + 120) * _math_js__WEBPACK_IMPORTED_MODULE_2__["deg2rad"],
        l = +this.l,
        a = isNaN(this.s) ? 0 : this.s * l * (1 - l),
        cosh = Math.cos(h),
        sinh = Math.sin(h);
    return new _color_js__WEBPACK_IMPORTED_MODULE_1__["Rgb"](
      255 * (l + a * (A * cosh + B * sinh)),
      255 * (l + a * (C * cosh + D * sinh)),
      255 * (l + a * (E * cosh)),
      this.opacity
    );
  }
}));


/***/ }),

/***/ "../node_modules/d3-color/src/define.js":
/*!**********************************************!*\
  !*** ../node_modules/d3-color/src/define.js ***!
  \**********************************************/
/*! exports provided: default, extend */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "extend", function() { return extend; });
/* harmony default export */ __webpack_exports__["default"] = (function(constructor, factory, prototype) {
  constructor.prototype = factory.prototype = prototype;
  prototype.constructor = constructor;
});

function extend(parent, definition) {
  var prototype = Object.create(parent.prototype);
  for (var key in definition) prototype[key] = definition[key];
  return prototype;
}


/***/ }),

/***/ "../node_modules/d3-color/src/index.js":
/*!*********************************************!*\
  !*** ../node_modules/d3-color/src/index.js ***!
  \*********************************************/
/*! exports provided: color, rgb, hsl, lab, hcl, lch, gray, cubehelix */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _color_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./color.js */ "../node_modules/d3-color/src/color.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "color", function() { return _color_js__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "rgb", function() { return _color_js__WEBPACK_IMPORTED_MODULE_0__["rgb"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "hsl", function() { return _color_js__WEBPACK_IMPORTED_MODULE_0__["hsl"]; });

/* harmony import */ var _lab_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lab.js */ "../node_modules/d3-color/src/lab.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "lab", function() { return _lab_js__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "hcl", function() { return _lab_js__WEBPACK_IMPORTED_MODULE_1__["hcl"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "lch", function() { return _lab_js__WEBPACK_IMPORTED_MODULE_1__["lch"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "gray", function() { return _lab_js__WEBPACK_IMPORTED_MODULE_1__["gray"]; });

/* harmony import */ var _cubehelix_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./cubehelix.js */ "../node_modules/d3-color/src/cubehelix.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "cubehelix", function() { return _cubehelix_js__WEBPACK_IMPORTED_MODULE_2__["default"]; });






/***/ }),

/***/ "../node_modules/d3-color/src/lab.js":
/*!*******************************************!*\
  !*** ../node_modules/d3-color/src/lab.js ***!
  \*******************************************/
/*! exports provided: gray, default, Lab, lch, hcl, Hcl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "gray", function() { return gray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return lab; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Lab", function() { return Lab; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lch", function() { return lch; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hcl", function() { return hcl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Hcl", function() { return Hcl; });
/* harmony import */ var _define_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./define.js */ "../node_modules/d3-color/src/define.js");
/* harmony import */ var _color_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./color.js */ "../node_modules/d3-color/src/color.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./math.js */ "../node_modules/d3-color/src/math.js");




// https://observablehq.com/@mbostock/lab-and-rgb
var K = 18,
    Xn = 0.96422,
    Yn = 1,
    Zn = 0.82521,
    t0 = 4 / 29,
    t1 = 6 / 29,
    t2 = 3 * t1 * t1,
    t3 = t1 * t1 * t1;

function labConvert(o) {
  if (o instanceof Lab) return new Lab(o.l, o.a, o.b, o.opacity);
  if (o instanceof Hcl) return hcl2lab(o);
  if (!(o instanceof _color_js__WEBPACK_IMPORTED_MODULE_1__["Rgb"])) o = Object(_color_js__WEBPACK_IMPORTED_MODULE_1__["rgbConvert"])(o);
  var r = rgb2lrgb(o.r),
      g = rgb2lrgb(o.g),
      b = rgb2lrgb(o.b),
      y = xyz2lab((0.2225045 * r + 0.7168786 * g + 0.0606169 * b) / Yn), x, z;
  if (r === g && g === b) x = z = y; else {
    x = xyz2lab((0.4360747 * r + 0.3850649 * g + 0.1430804 * b) / Xn);
    z = xyz2lab((0.0139322 * r + 0.0971045 * g + 0.7141733 * b) / Zn);
  }
  return new Lab(116 * y - 16, 500 * (x - y), 200 * (y - z), o.opacity);
}

function gray(l, opacity) {
  return new Lab(l, 0, 0, opacity == null ? 1 : opacity);
}

function lab(l, a, b, opacity) {
  return arguments.length === 1 ? labConvert(l) : new Lab(l, a, b, opacity == null ? 1 : opacity);
}

function Lab(l, a, b, opacity) {
  this.l = +l;
  this.a = +a;
  this.b = +b;
  this.opacity = +opacity;
}

Object(_define_js__WEBPACK_IMPORTED_MODULE_0__["default"])(Lab, lab, Object(_define_js__WEBPACK_IMPORTED_MODULE_0__["extend"])(_color_js__WEBPACK_IMPORTED_MODULE_1__["Color"], {
  brighter: function(k) {
    return new Lab(this.l + K * (k == null ? 1 : k), this.a, this.b, this.opacity);
  },
  darker: function(k) {
    return new Lab(this.l - K * (k == null ? 1 : k), this.a, this.b, this.opacity);
  },
  rgb: function() {
    var y = (this.l + 16) / 116,
        x = isNaN(this.a) ? y : y + this.a / 500,
        z = isNaN(this.b) ? y : y - this.b / 200;
    x = Xn * lab2xyz(x);
    y = Yn * lab2xyz(y);
    z = Zn * lab2xyz(z);
    return new _color_js__WEBPACK_IMPORTED_MODULE_1__["Rgb"](
      lrgb2rgb( 3.1338561 * x - 1.6168667 * y - 0.4906146 * z),
      lrgb2rgb(-0.9787684 * x + 1.9161415 * y + 0.0334540 * z),
      lrgb2rgb( 0.0719453 * x - 0.2289914 * y + 1.4052427 * z),
      this.opacity
    );
  }
}));

function xyz2lab(t) {
  return t > t3 ? Math.pow(t, 1 / 3) : t / t2 + t0;
}

function lab2xyz(t) {
  return t > t1 ? t * t * t : t2 * (t - t0);
}

function lrgb2rgb(x) {
  return 255 * (x <= 0.0031308 ? 12.92 * x : 1.055 * Math.pow(x, 1 / 2.4) - 0.055);
}

function rgb2lrgb(x) {
  return (x /= 255) <= 0.04045 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
}

function hclConvert(o) {
  if (o instanceof Hcl) return new Hcl(o.h, o.c, o.l, o.opacity);
  if (!(o instanceof Lab)) o = labConvert(o);
  if (o.a === 0 && o.b === 0) return new Hcl(NaN, 0 < o.l && o.l < 100 ? 0 : NaN, o.l, o.opacity);
  var h = Math.atan2(o.b, o.a) * _math_js__WEBPACK_IMPORTED_MODULE_2__["rad2deg"];
  return new Hcl(h < 0 ? h + 360 : h, Math.sqrt(o.a * o.a + o.b * o.b), o.l, o.opacity);
}

function lch(l, c, h, opacity) {
  return arguments.length === 1 ? hclConvert(l) : new Hcl(h, c, l, opacity == null ? 1 : opacity);
}

function hcl(h, c, l, opacity) {
  return arguments.length === 1 ? hclConvert(h) : new Hcl(h, c, l, opacity == null ? 1 : opacity);
}

function Hcl(h, c, l, opacity) {
  this.h = +h;
  this.c = +c;
  this.l = +l;
  this.opacity = +opacity;
}

function hcl2lab(o) {
  if (isNaN(o.h)) return new Lab(o.l, 0, 0, o.opacity);
  var h = o.h * _math_js__WEBPACK_IMPORTED_MODULE_2__["deg2rad"];
  return new Lab(o.l, Math.cos(h) * o.c, Math.sin(h) * o.c, o.opacity);
}

Object(_define_js__WEBPACK_IMPORTED_MODULE_0__["default"])(Hcl, hcl, Object(_define_js__WEBPACK_IMPORTED_MODULE_0__["extend"])(_color_js__WEBPACK_IMPORTED_MODULE_1__["Color"], {
  brighter: function(k) {
    return new Hcl(this.h, this.c, this.l + K * (k == null ? 1 : k), this.opacity);
  },
  darker: function(k) {
    return new Hcl(this.h, this.c, this.l - K * (k == null ? 1 : k), this.opacity);
  },
  rgb: function() {
    return hcl2lab(this).rgb();
  }
}));


/***/ }),

/***/ "../node_modules/d3-color/src/math.js":
/*!********************************************!*\
  !*** ../node_modules/d3-color/src/math.js ***!
  \********************************************/
/*! exports provided: deg2rad, rad2deg */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deg2rad", function() { return deg2rad; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rad2deg", function() { return rad2deg; });
var deg2rad = Math.PI / 180;
var rad2deg = 180 / Math.PI;


/***/ }),

/***/ "../node_modules/d3-dsv/src/autoType.js":
/*!**********************************************!*\
  !*** ../node_modules/d3-dsv/src/autoType.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return autoType; });
function autoType(object) {
  for (var key in object) {
    var value = object[key].trim(), number, m;
    if (!value) value = null;
    else if (value === "true") value = true;
    else if (value === "false") value = false;
    else if (value === "NaN") value = NaN;
    else if (!isNaN(number = +value)) value = number;
    else if (m = value.match(/^([-+]\d{2})?\d{4}(-\d{2}(-\d{2})?)?(T\d{2}:\d{2}(:\d{2}(\.\d{3})?)?(Z|[-+]\d{2}:\d{2})?)?$/)) {
      if (fixtz && !!m[4] && !m[7]) value = value.replace(/-/g, "/").replace(/T/, " ");
      value = new Date(value);
    }
    else continue;
    object[key] = value;
  }
  return object;
}

// https://github.com/d3/d3-dsv/issues/45
var fixtz = new Date("2019-01-01T00:00").getHours() || new Date("2019-07-01T00:00").getHours();

/***/ }),

/***/ "../node_modules/d3-dsv/src/csv.js":
/*!*****************************************!*\
  !*** ../node_modules/d3-dsv/src/csv.js ***!
  \*****************************************/
/*! exports provided: csvParse, csvParseRows, csvFormat, csvFormatBody, csvFormatRows, csvFormatRow, csvFormatValue */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "csvParse", function() { return csvParse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "csvParseRows", function() { return csvParseRows; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "csvFormat", function() { return csvFormat; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "csvFormatBody", function() { return csvFormatBody; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "csvFormatRows", function() { return csvFormatRows; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "csvFormatRow", function() { return csvFormatRow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "csvFormatValue", function() { return csvFormatValue; });
/* harmony import */ var _dsv_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dsv.js */ "../node_modules/d3-dsv/src/dsv.js");


var csv = Object(_dsv_js__WEBPACK_IMPORTED_MODULE_0__["default"])(",");

var csvParse = csv.parse;
var csvParseRows = csv.parseRows;
var csvFormat = csv.format;
var csvFormatBody = csv.formatBody;
var csvFormatRows = csv.formatRows;
var csvFormatRow = csv.formatRow;
var csvFormatValue = csv.formatValue;


/***/ }),

/***/ "../node_modules/d3-dsv/src/dsv.js":
/*!*****************************************!*\
  !*** ../node_modules/d3-dsv/src/dsv.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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

/* harmony default export */ __webpack_exports__["default"] = (function(delimiter) {
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
});


/***/ }),

/***/ "../node_modules/d3-dsv/src/index.js":
/*!*******************************************!*\
  !*** ../node_modules/d3-dsv/src/index.js ***!
  \*******************************************/
/*! exports provided: dsvFormat, csvParse, csvParseRows, csvFormat, csvFormatBody, csvFormatRows, csvFormatRow, csvFormatValue, tsvParse, tsvParseRows, tsvFormat, tsvFormatBody, tsvFormatRows, tsvFormatRow, tsvFormatValue, autoType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dsv_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dsv.js */ "../node_modules/d3-dsv/src/dsv.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "dsvFormat", function() { return _dsv_js__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _csv_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./csv.js */ "../node_modules/d3-dsv/src/csv.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "csvParse", function() { return _csv_js__WEBPACK_IMPORTED_MODULE_1__["csvParse"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "csvParseRows", function() { return _csv_js__WEBPACK_IMPORTED_MODULE_1__["csvParseRows"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "csvFormat", function() { return _csv_js__WEBPACK_IMPORTED_MODULE_1__["csvFormat"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "csvFormatBody", function() { return _csv_js__WEBPACK_IMPORTED_MODULE_1__["csvFormatBody"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "csvFormatRows", function() { return _csv_js__WEBPACK_IMPORTED_MODULE_1__["csvFormatRows"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "csvFormatRow", function() { return _csv_js__WEBPACK_IMPORTED_MODULE_1__["csvFormatRow"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "csvFormatValue", function() { return _csv_js__WEBPACK_IMPORTED_MODULE_1__["csvFormatValue"]; });

/* harmony import */ var _tsv_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tsv.js */ "../node_modules/d3-dsv/src/tsv.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "tsvParse", function() { return _tsv_js__WEBPACK_IMPORTED_MODULE_2__["tsvParse"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "tsvParseRows", function() { return _tsv_js__WEBPACK_IMPORTED_MODULE_2__["tsvParseRows"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "tsvFormat", function() { return _tsv_js__WEBPACK_IMPORTED_MODULE_2__["tsvFormat"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "tsvFormatBody", function() { return _tsv_js__WEBPACK_IMPORTED_MODULE_2__["tsvFormatBody"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "tsvFormatRows", function() { return _tsv_js__WEBPACK_IMPORTED_MODULE_2__["tsvFormatRows"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "tsvFormatRow", function() { return _tsv_js__WEBPACK_IMPORTED_MODULE_2__["tsvFormatRow"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "tsvFormatValue", function() { return _tsv_js__WEBPACK_IMPORTED_MODULE_2__["tsvFormatValue"]; });

/* harmony import */ var _autoType_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./autoType.js */ "../node_modules/d3-dsv/src/autoType.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "autoType", function() { return _autoType_js__WEBPACK_IMPORTED_MODULE_3__["default"]; });







/***/ }),

/***/ "../node_modules/d3-dsv/src/tsv.js":
/*!*****************************************!*\
  !*** ../node_modules/d3-dsv/src/tsv.js ***!
  \*****************************************/
/*! exports provided: tsvParse, tsvParseRows, tsvFormat, tsvFormatBody, tsvFormatRows, tsvFormatRow, tsvFormatValue */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tsvParse", function() { return tsvParse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tsvParseRows", function() { return tsvParseRows; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tsvFormat", function() { return tsvFormat; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tsvFormatBody", function() { return tsvFormatBody; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tsvFormatRows", function() { return tsvFormatRows; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tsvFormatRow", function() { return tsvFormatRow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tsvFormatValue", function() { return tsvFormatValue; });
/* harmony import */ var _dsv_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dsv.js */ "../node_modules/d3-dsv/src/dsv.js");


var tsv = Object(_dsv_js__WEBPACK_IMPORTED_MODULE_0__["default"])("\t");

var tsvParse = tsv.parse;
var tsvParseRows = tsv.parseRows;
var tsvFormat = tsv.format;
var tsvFormatBody = tsv.formatBody;
var tsvFormatRows = tsv.formatRows;
var tsvFormatRow = tsv.formatRow;
var tsvFormatValue = tsv.formatValue;


/***/ }),

/***/ "../node_modules/d3-fetch/src/blob.js":
/*!********************************************!*\
  !*** ../node_modules/d3-fetch/src/blob.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function responseBlob(response) {
  if (!response.ok) throw new Error(response.status + " " + response.statusText);
  return response.blob();
}

/* harmony default export */ __webpack_exports__["default"] = (function(input, init) {
  return fetch(input, init).then(responseBlob);
});


/***/ }),

/***/ "../node_modules/d3-fetch/src/buffer.js":
/*!**********************************************!*\
  !*** ../node_modules/d3-fetch/src/buffer.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function responseArrayBuffer(response) {
  if (!response.ok) throw new Error(response.status + " " + response.statusText);
  return response.arrayBuffer();
}

/* harmony default export */ __webpack_exports__["default"] = (function(input, init) {
  return fetch(input, init).then(responseArrayBuffer);
});


/***/ }),

/***/ "../node_modules/d3-fetch/src/dsv.js":
/*!*******************************************!*\
  !*** ../node_modules/d3-fetch/src/dsv.js ***!
  \*******************************************/
/*! exports provided: default, csv, tsv */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return dsv; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "csv", function() { return csv; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tsv", function() { return tsv; });
/* harmony import */ var d3_dsv__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-dsv */ "../node_modules/d3-dsv/src/index.js");
/* harmony import */ var _text_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./text.js */ "../node_modules/d3-fetch/src/text.js");



function dsvParse(parse) {
  return function(input, init, row) {
    if (arguments.length === 2 && typeof init === "function") row = init, init = undefined;
    return Object(_text_js__WEBPACK_IMPORTED_MODULE_1__["default"])(input, init).then(function(response) {
      return parse(response, row);
    });
  };
}

function dsv(delimiter, input, init, row) {
  if (arguments.length === 3 && typeof init === "function") row = init, init = undefined;
  var format = Object(d3_dsv__WEBPACK_IMPORTED_MODULE_0__["dsvFormat"])(delimiter);
  return Object(_text_js__WEBPACK_IMPORTED_MODULE_1__["default"])(input, init).then(function(response) {
    return format.parse(response, row);
  });
}

var csv = dsvParse(d3_dsv__WEBPACK_IMPORTED_MODULE_0__["csvParse"]);
var tsv = dsvParse(d3_dsv__WEBPACK_IMPORTED_MODULE_0__["tsvParse"]);


/***/ }),

/***/ "../node_modules/d3-fetch/src/image.js":
/*!*********************************************!*\
  !*** ../node_modules/d3-fetch/src/image.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function(input, init) {
  return new Promise(function(resolve, reject) {
    var image = new Image;
    for (var key in init) image[key] = init[key];
    image.onerror = reject;
    image.onload = function() { resolve(image); };
    image.src = input;
  });
});


/***/ }),

/***/ "../node_modules/d3-fetch/src/index.js":
/*!*********************************************!*\
  !*** ../node_modules/d3-fetch/src/index.js ***!
  \*********************************************/
/*! exports provided: blob, buffer, dsv, csv, tsv, image, json, text, xml, html, svg */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _blob_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./blob.js */ "../node_modules/d3-fetch/src/blob.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "blob", function() { return _blob_js__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _buffer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./buffer.js */ "../node_modules/d3-fetch/src/buffer.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "buffer", function() { return _buffer_js__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _dsv_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dsv.js */ "../node_modules/d3-fetch/src/dsv.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "dsv", function() { return _dsv_js__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "csv", function() { return _dsv_js__WEBPACK_IMPORTED_MODULE_2__["csv"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "tsv", function() { return _dsv_js__WEBPACK_IMPORTED_MODULE_2__["tsv"]; });

/* harmony import */ var _image_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./image.js */ "../node_modules/d3-fetch/src/image.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "image", function() { return _image_js__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _json_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./json.js */ "../node_modules/d3-fetch/src/json.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "json", function() { return _json_js__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony import */ var _text_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./text.js */ "../node_modules/d3-fetch/src/text.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "text", function() { return _text_js__WEBPACK_IMPORTED_MODULE_5__["default"]; });

/* harmony import */ var _xml_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./xml.js */ "../node_modules/d3-fetch/src/xml.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "xml", function() { return _xml_js__WEBPACK_IMPORTED_MODULE_6__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "html", function() { return _xml_js__WEBPACK_IMPORTED_MODULE_6__["html"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "svg", function() { return _xml_js__WEBPACK_IMPORTED_MODULE_6__["svg"]; });










/***/ }),

/***/ "../node_modules/d3-fetch/src/json.js":
/*!********************************************!*\
  !*** ../node_modules/d3-fetch/src/json.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function responseJson(response) {
  if (!response.ok) throw new Error(response.status + " " + response.statusText);
  if (response.status === 204 || response.status === 205) return;
  return response.json();
}

/* harmony default export */ __webpack_exports__["default"] = (function(input, init) {
  return fetch(input, init).then(responseJson);
});


/***/ }),

/***/ "../node_modules/d3-fetch/src/text.js":
/*!********************************************!*\
  !*** ../node_modules/d3-fetch/src/text.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function responseText(response) {
  if (!response.ok) throw new Error(response.status + " " + response.statusText);
  return response.text();
}

/* harmony default export */ __webpack_exports__["default"] = (function(input, init) {
  return fetch(input, init).then(responseText);
});


/***/ }),

/***/ "../node_modules/d3-fetch/src/xml.js":
/*!*******************************************!*\
  !*** ../node_modules/d3-fetch/src/xml.js ***!
  \*******************************************/
/*! exports provided: default, html, svg */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "html", function() { return html; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "svg", function() { return svg; });
/* harmony import */ var _text_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./text.js */ "../node_modules/d3-fetch/src/text.js");


function parser(type) {
  return function(input, init)  {
    return Object(_text_js__WEBPACK_IMPORTED_MODULE_0__["default"])(input, init).then(function(text) {
      return (new DOMParser).parseFromString(text, type);
    });
  };
}

/* harmony default export */ __webpack_exports__["default"] = (parser("application/xml"));

var html = parser("text/html");

var svg = parser("image/svg+xml");


/***/ }),

/***/ "../node_modules/d3-interpolate/src/array.js":
/*!***************************************************!*\
  !*** ../node_modules/d3-interpolate/src/array.js ***!
  \***************************************************/
/*! exports provided: default, genericArray */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "genericArray", function() { return genericArray; });
/* harmony import */ var _value_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./value.js */ "../node_modules/d3-interpolate/src/value.js");
/* harmony import */ var _numberArray_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./numberArray.js */ "../node_modules/d3-interpolate/src/numberArray.js");



/* harmony default export */ __webpack_exports__["default"] = (function(a, b) {
  return (Object(_numberArray_js__WEBPACK_IMPORTED_MODULE_1__["isNumberArray"])(b) ? _numberArray_js__WEBPACK_IMPORTED_MODULE_1__["default"] : genericArray)(a, b);
});

function genericArray(a, b) {
  var nb = b ? b.length : 0,
      na = a ? Math.min(nb, a.length) : 0,
      x = new Array(na),
      c = new Array(nb),
      i;

  for (i = 0; i < na; ++i) x[i] = Object(_value_js__WEBPACK_IMPORTED_MODULE_0__["default"])(a[i], b[i]);
  for (; i < nb; ++i) c[i] = b[i];

  return function(t) {
    for (i = 0; i < na; ++i) c[i] = x[i](t);
    return c;
  };
}


/***/ }),

/***/ "../node_modules/d3-interpolate/src/basis.js":
/*!***************************************************!*\
  !*** ../node_modules/d3-interpolate/src/basis.js ***!
  \***************************************************/
/*! exports provided: basis, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "basis", function() { return basis; });
function basis(t1, v0, v1, v2, v3) {
  var t2 = t1 * t1, t3 = t2 * t1;
  return ((1 - 3 * t1 + 3 * t2 - t3) * v0
      + (4 - 6 * t2 + 3 * t3) * v1
      + (1 + 3 * t1 + 3 * t2 - 3 * t3) * v2
      + t3 * v3) / 6;
}

/* harmony default export */ __webpack_exports__["default"] = (function(values) {
  var n = values.length - 1;
  return function(t) {
    var i = t <= 0 ? (t = 0) : t >= 1 ? (t = 1, n - 1) : Math.floor(t * n),
        v1 = values[i],
        v2 = values[i + 1],
        v0 = i > 0 ? values[i - 1] : 2 * v1 - v2,
        v3 = i < n - 1 ? values[i + 2] : 2 * v2 - v1;
    return basis((t - i / n) * n, v0, v1, v2, v3);
  };
});


/***/ }),

/***/ "../node_modules/d3-interpolate/src/basisClosed.js":
/*!*********************************************************!*\
  !*** ../node_modules/d3-interpolate/src/basisClosed.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _basis_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./basis.js */ "../node_modules/d3-interpolate/src/basis.js");


/* harmony default export */ __webpack_exports__["default"] = (function(values) {
  var n = values.length;
  return function(t) {
    var i = Math.floor(((t %= 1) < 0 ? ++t : t) * n),
        v0 = values[(i + n - 1) % n],
        v1 = values[i % n],
        v2 = values[(i + 1) % n],
        v3 = values[(i + 2) % n];
    return Object(_basis_js__WEBPACK_IMPORTED_MODULE_0__["basis"])((t - i / n) * n, v0, v1, v2, v3);
  };
});


/***/ }),

/***/ "../node_modules/d3-interpolate/src/color.js":
/*!***************************************************!*\
  !*** ../node_modules/d3-interpolate/src/color.js ***!
  \***************************************************/
/*! exports provided: hue, gamma, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hue", function() { return hue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "gamma", function() { return gamma; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return nogamma; });
/* harmony import */ var _constant_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constant.js */ "../node_modules/d3-interpolate/src/constant.js");


function linear(a, d) {
  return function(t) {
    return a + t * d;
  };
}

function exponential(a, b, y) {
  return a = Math.pow(a, y), b = Math.pow(b, y) - a, y = 1 / y, function(t) {
    return Math.pow(a + t * b, y);
  };
}

function hue(a, b) {
  var d = b - a;
  return d ? linear(a, d > 180 || d < -180 ? d - 360 * Math.round(d / 360) : d) : Object(_constant_js__WEBPACK_IMPORTED_MODULE_0__["default"])(isNaN(a) ? b : a);
}

function gamma(y) {
  return (y = +y) === 1 ? nogamma : function(a, b) {
    return b - a ? exponential(a, b, y) : Object(_constant_js__WEBPACK_IMPORTED_MODULE_0__["default"])(isNaN(a) ? b : a);
  };
}

function nogamma(a, b) {
  var d = b - a;
  return d ? linear(a, d) : Object(_constant_js__WEBPACK_IMPORTED_MODULE_0__["default"])(isNaN(a) ? b : a);
}


/***/ }),

/***/ "../node_modules/d3-interpolate/src/constant.js":
/*!******************************************************!*\
  !*** ../node_modules/d3-interpolate/src/constant.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function(x) {
  return function() {
    return x;
  };
});


/***/ }),

/***/ "../node_modules/d3-interpolate/src/cubehelix.js":
/*!*******************************************************!*\
  !*** ../node_modules/d3-interpolate/src/cubehelix.js ***!
  \*******************************************************/
/*! exports provided: default, cubehelixLong */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cubehelixLong", function() { return cubehelixLong; });
/* harmony import */ var d3_color__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-color */ "../node_modules/d3-color/src/index.js");
/* harmony import */ var _color_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./color.js */ "../node_modules/d3-interpolate/src/color.js");



function cubehelix(hue) {
  return (function cubehelixGamma(y) {
    y = +y;

    function cubehelix(start, end) {
      var h = hue((start = Object(d3_color__WEBPACK_IMPORTED_MODULE_0__["cubehelix"])(start)).h, (end = Object(d3_color__WEBPACK_IMPORTED_MODULE_0__["cubehelix"])(end)).h),
          s = Object(_color_js__WEBPACK_IMPORTED_MODULE_1__["default"])(start.s, end.s),
          l = Object(_color_js__WEBPACK_IMPORTED_MODULE_1__["default"])(start.l, end.l),
          opacity = Object(_color_js__WEBPACK_IMPORTED_MODULE_1__["default"])(start.opacity, end.opacity);
      return function(t) {
        start.h = h(t);
        start.s = s(t);
        start.l = l(Math.pow(t, y));
        start.opacity = opacity(t);
        return start + "";
      };
    }

    cubehelix.gamma = cubehelixGamma;

    return cubehelix;
  })(1);
}

/* harmony default export */ __webpack_exports__["default"] = (cubehelix(_color_js__WEBPACK_IMPORTED_MODULE_1__["hue"]));
var cubehelixLong = cubehelix(_color_js__WEBPACK_IMPORTED_MODULE_1__["default"]);


/***/ }),

/***/ "../node_modules/d3-interpolate/src/date.js":
/*!**************************************************!*\
  !*** ../node_modules/d3-interpolate/src/date.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function(a, b) {
  var d = new Date;
  return a = +a, b = +b, function(t) {
    return d.setTime(a * (1 - t) + b * t), d;
  };
});


/***/ }),

/***/ "../node_modules/d3-interpolate/src/discrete.js":
/*!******************************************************!*\
  !*** ../node_modules/d3-interpolate/src/discrete.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function(range) {
  var n = range.length;
  return function(t) {
    return range[Math.max(0, Math.min(n - 1, Math.floor(t * n)))];
  };
});


/***/ }),

/***/ "../node_modules/d3-interpolate/src/hcl.js":
/*!*************************************************!*\
  !*** ../node_modules/d3-interpolate/src/hcl.js ***!
  \*************************************************/
/*! exports provided: default, hclLong */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hclLong", function() { return hclLong; });
/* harmony import */ var d3_color__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-color */ "../node_modules/d3-color/src/index.js");
/* harmony import */ var _color_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./color.js */ "../node_modules/d3-interpolate/src/color.js");



function hcl(hue) {
  return function(start, end) {
    var h = hue((start = Object(d3_color__WEBPACK_IMPORTED_MODULE_0__["hcl"])(start)).h, (end = Object(d3_color__WEBPACK_IMPORTED_MODULE_0__["hcl"])(end)).h),
        c = Object(_color_js__WEBPACK_IMPORTED_MODULE_1__["default"])(start.c, end.c),
        l = Object(_color_js__WEBPACK_IMPORTED_MODULE_1__["default"])(start.l, end.l),
        opacity = Object(_color_js__WEBPACK_IMPORTED_MODULE_1__["default"])(start.opacity, end.opacity);
    return function(t) {
      start.h = h(t);
      start.c = c(t);
      start.l = l(t);
      start.opacity = opacity(t);
      return start + "";
    };
  }
}

/* harmony default export */ __webpack_exports__["default"] = (hcl(_color_js__WEBPACK_IMPORTED_MODULE_1__["hue"]));
var hclLong = hcl(_color_js__WEBPACK_IMPORTED_MODULE_1__["default"]);


/***/ }),

/***/ "../node_modules/d3-interpolate/src/hsl.js":
/*!*************************************************!*\
  !*** ../node_modules/d3-interpolate/src/hsl.js ***!
  \*************************************************/
/*! exports provided: default, hslLong */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hslLong", function() { return hslLong; });
/* harmony import */ var d3_color__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-color */ "../node_modules/d3-color/src/index.js");
/* harmony import */ var _color_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./color.js */ "../node_modules/d3-interpolate/src/color.js");



function hsl(hue) {
  return function(start, end) {
    var h = hue((start = Object(d3_color__WEBPACK_IMPORTED_MODULE_0__["hsl"])(start)).h, (end = Object(d3_color__WEBPACK_IMPORTED_MODULE_0__["hsl"])(end)).h),
        s = Object(_color_js__WEBPACK_IMPORTED_MODULE_1__["default"])(start.s, end.s),
        l = Object(_color_js__WEBPACK_IMPORTED_MODULE_1__["default"])(start.l, end.l),
        opacity = Object(_color_js__WEBPACK_IMPORTED_MODULE_1__["default"])(start.opacity, end.opacity);
    return function(t) {
      start.h = h(t);
      start.s = s(t);
      start.l = l(t);
      start.opacity = opacity(t);
      return start + "";
    };
  }
}

/* harmony default export */ __webpack_exports__["default"] = (hsl(_color_js__WEBPACK_IMPORTED_MODULE_1__["hue"]));
var hslLong = hsl(_color_js__WEBPACK_IMPORTED_MODULE_1__["default"]);


/***/ }),

/***/ "../node_modules/d3-interpolate/src/hue.js":
/*!*************************************************!*\
  !*** ../node_modules/d3-interpolate/src/hue.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _color_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./color.js */ "../node_modules/d3-interpolate/src/color.js");


/* harmony default export */ __webpack_exports__["default"] = (function(a, b) {
  var i = Object(_color_js__WEBPACK_IMPORTED_MODULE_0__["hue"])(+a, +b);
  return function(t) {
    var x = i(t);
    return x - 360 * Math.floor(x / 360);
  };
});


/***/ }),

/***/ "../node_modules/d3-interpolate/src/index.js":
/*!***************************************************!*\
  !*** ../node_modules/d3-interpolate/src/index.js ***!
  \***************************************************/
/*! exports provided: interpolate, interpolateArray, interpolateBasis, interpolateBasisClosed, interpolateDate, interpolateDiscrete, interpolateHue, interpolateNumber, interpolateNumberArray, interpolateObject, interpolateRound, interpolateString, interpolateTransformCss, interpolateTransformSvg, interpolateZoom, interpolateRgb, interpolateRgbBasis, interpolateRgbBasisClosed, interpolateHsl, interpolateHslLong, interpolateLab, interpolateHcl, interpolateHclLong, interpolateCubehelix, interpolateCubehelixLong, piecewise, quantize */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _value_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./value.js */ "../node_modules/d3-interpolate/src/value.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolate", function() { return _value_js__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _array_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./array.js */ "../node_modules/d3-interpolate/src/array.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateArray", function() { return _array_js__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _basis_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./basis.js */ "../node_modules/d3-interpolate/src/basis.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateBasis", function() { return _basis_js__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _basisClosed_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./basisClosed.js */ "../node_modules/d3-interpolate/src/basisClosed.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateBasisClosed", function() { return _basisClosed_js__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _date_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./date.js */ "../node_modules/d3-interpolate/src/date.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateDate", function() { return _date_js__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony import */ var _discrete_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./discrete.js */ "../node_modules/d3-interpolate/src/discrete.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateDiscrete", function() { return _discrete_js__WEBPACK_IMPORTED_MODULE_5__["default"]; });

/* harmony import */ var _hue_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./hue.js */ "../node_modules/d3-interpolate/src/hue.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateHue", function() { return _hue_js__WEBPACK_IMPORTED_MODULE_6__["default"]; });

/* harmony import */ var _number_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./number.js */ "../node_modules/d3-interpolate/src/number.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateNumber", function() { return _number_js__WEBPACK_IMPORTED_MODULE_7__["default"]; });

/* harmony import */ var _numberArray_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./numberArray.js */ "../node_modules/d3-interpolate/src/numberArray.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateNumberArray", function() { return _numberArray_js__WEBPACK_IMPORTED_MODULE_8__["default"]; });

/* harmony import */ var _object_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./object.js */ "../node_modules/d3-interpolate/src/object.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateObject", function() { return _object_js__WEBPACK_IMPORTED_MODULE_9__["default"]; });

/* harmony import */ var _round_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./round.js */ "../node_modules/d3-interpolate/src/round.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateRound", function() { return _round_js__WEBPACK_IMPORTED_MODULE_10__["default"]; });

/* harmony import */ var _string_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./string.js */ "../node_modules/d3-interpolate/src/string.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateString", function() { return _string_js__WEBPACK_IMPORTED_MODULE_11__["default"]; });

/* harmony import */ var _transform_index_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./transform/index.js */ "../node_modules/d3-interpolate/src/transform/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateTransformCss", function() { return _transform_index_js__WEBPACK_IMPORTED_MODULE_12__["interpolateTransformCss"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateTransformSvg", function() { return _transform_index_js__WEBPACK_IMPORTED_MODULE_12__["interpolateTransformSvg"]; });

/* harmony import */ var _zoom_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./zoom.js */ "../node_modules/d3-interpolate/src/zoom.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateZoom", function() { return _zoom_js__WEBPACK_IMPORTED_MODULE_13__["default"]; });

/* harmony import */ var _rgb_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./rgb.js */ "../node_modules/d3-interpolate/src/rgb.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateRgb", function() { return _rgb_js__WEBPACK_IMPORTED_MODULE_14__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateRgbBasis", function() { return _rgb_js__WEBPACK_IMPORTED_MODULE_14__["rgbBasis"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateRgbBasisClosed", function() { return _rgb_js__WEBPACK_IMPORTED_MODULE_14__["rgbBasisClosed"]; });

/* harmony import */ var _hsl_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./hsl.js */ "../node_modules/d3-interpolate/src/hsl.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateHsl", function() { return _hsl_js__WEBPACK_IMPORTED_MODULE_15__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateHslLong", function() { return _hsl_js__WEBPACK_IMPORTED_MODULE_15__["hslLong"]; });

/* harmony import */ var _lab_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./lab.js */ "../node_modules/d3-interpolate/src/lab.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateLab", function() { return _lab_js__WEBPACK_IMPORTED_MODULE_16__["default"]; });

/* harmony import */ var _hcl_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./hcl.js */ "../node_modules/d3-interpolate/src/hcl.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateHcl", function() { return _hcl_js__WEBPACK_IMPORTED_MODULE_17__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateHclLong", function() { return _hcl_js__WEBPACK_IMPORTED_MODULE_17__["hclLong"]; });

/* harmony import */ var _cubehelix_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./cubehelix.js */ "../node_modules/d3-interpolate/src/cubehelix.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateCubehelix", function() { return _cubehelix_js__WEBPACK_IMPORTED_MODULE_18__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateCubehelixLong", function() { return _cubehelix_js__WEBPACK_IMPORTED_MODULE_18__["cubehelixLong"]; });

/* harmony import */ var _piecewise_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./piecewise.js */ "../node_modules/d3-interpolate/src/piecewise.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "piecewise", function() { return _piecewise_js__WEBPACK_IMPORTED_MODULE_19__["default"]; });

/* harmony import */ var _quantize_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./quantize.js */ "../node_modules/d3-interpolate/src/quantize.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "quantize", function() { return _quantize_js__WEBPACK_IMPORTED_MODULE_20__["default"]; });
























/***/ }),

/***/ "../node_modules/d3-interpolate/src/lab.js":
/*!*************************************************!*\
  !*** ../node_modules/d3-interpolate/src/lab.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return lab; });
/* harmony import */ var d3_color__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-color */ "../node_modules/d3-color/src/index.js");
/* harmony import */ var _color_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./color.js */ "../node_modules/d3-interpolate/src/color.js");



function lab(start, end) {
  var l = Object(_color_js__WEBPACK_IMPORTED_MODULE_1__["default"])((start = Object(d3_color__WEBPACK_IMPORTED_MODULE_0__["lab"])(start)).l, (end = Object(d3_color__WEBPACK_IMPORTED_MODULE_0__["lab"])(end)).l),
      a = Object(_color_js__WEBPACK_IMPORTED_MODULE_1__["default"])(start.a, end.a),
      b = Object(_color_js__WEBPACK_IMPORTED_MODULE_1__["default"])(start.b, end.b),
      opacity = Object(_color_js__WEBPACK_IMPORTED_MODULE_1__["default"])(start.opacity, end.opacity);
  return function(t) {
    start.l = l(t);
    start.a = a(t);
    start.b = b(t);
    start.opacity = opacity(t);
    return start + "";
  };
}


/***/ }),

/***/ "../node_modules/d3-interpolate/src/number.js":
/*!****************************************************!*\
  !*** ../node_modules/d3-interpolate/src/number.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function(a, b) {
  return a = +a, b = +b, function(t) {
    return a * (1 - t) + b * t;
  };
});


/***/ }),

/***/ "../node_modules/d3-interpolate/src/numberArray.js":
/*!*********************************************************!*\
  !*** ../node_modules/d3-interpolate/src/numberArray.js ***!
  \*********************************************************/
/*! exports provided: default, isNumberArray */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isNumberArray", function() { return isNumberArray; });
/* harmony default export */ __webpack_exports__["default"] = (function(a, b) {
  if (!b) b = [];
  var n = a ? Math.min(b.length, a.length) : 0,
      c = b.slice(),
      i;
  return function(t) {
    for (i = 0; i < n; ++i) c[i] = a[i] * (1 - t) + b[i] * t;
    return c;
  };
});

function isNumberArray(x) {
  return ArrayBuffer.isView(x) && !(x instanceof DataView);
}


/***/ }),

/***/ "../node_modules/d3-interpolate/src/object.js":
/*!****************************************************!*\
  !*** ../node_modules/d3-interpolate/src/object.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _value_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./value.js */ "../node_modules/d3-interpolate/src/value.js");


/* harmony default export */ __webpack_exports__["default"] = (function(a, b) {
  var i = {},
      c = {},
      k;

  if (a === null || typeof a !== "object") a = {};
  if (b === null || typeof b !== "object") b = {};

  for (k in b) {
    if (k in a) {
      i[k] = Object(_value_js__WEBPACK_IMPORTED_MODULE_0__["default"])(a[k], b[k]);
    } else {
      c[k] = b[k];
    }
  }

  return function(t) {
    for (k in i) c[k] = i[k](t);
    return c;
  };
});


/***/ }),

/***/ "../node_modules/d3-interpolate/src/piecewise.js":
/*!*******************************************************!*\
  !*** ../node_modules/d3-interpolate/src/piecewise.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return piecewise; });
function piecewise(interpolate, values) {
  var i = 0, n = values.length - 1, v = values[0], I = new Array(n < 0 ? 0 : n);
  while (i < n) I[i] = interpolate(v, v = values[++i]);
  return function(t) {
    var i = Math.max(0, Math.min(n - 1, Math.floor(t *= n)));
    return I[i](t - i);
  };
}


/***/ }),

/***/ "../node_modules/d3-interpolate/src/quantize.js":
/*!******************************************************!*\
  !*** ../node_modules/d3-interpolate/src/quantize.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function(interpolator, n) {
  var samples = new Array(n);
  for (var i = 0; i < n; ++i) samples[i] = interpolator(i / (n - 1));
  return samples;
});


/***/ }),

/***/ "../node_modules/d3-interpolate/src/rgb.js":
/*!*************************************************!*\
  !*** ../node_modules/d3-interpolate/src/rgb.js ***!
  \*************************************************/
/*! exports provided: default, rgbBasis, rgbBasisClosed */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rgbBasis", function() { return rgbBasis; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rgbBasisClosed", function() { return rgbBasisClosed; });
/* harmony import */ var d3_color__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-color */ "../node_modules/d3-color/src/index.js");
/* harmony import */ var _basis_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./basis.js */ "../node_modules/d3-interpolate/src/basis.js");
/* harmony import */ var _basisClosed_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./basisClosed.js */ "../node_modules/d3-interpolate/src/basisClosed.js");
/* harmony import */ var _color_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./color.js */ "../node_modules/d3-interpolate/src/color.js");





/* harmony default export */ __webpack_exports__["default"] = ((function rgbGamma(y) {
  var color = Object(_color_js__WEBPACK_IMPORTED_MODULE_3__["gamma"])(y);

  function rgb(start, end) {
    var r = color((start = Object(d3_color__WEBPACK_IMPORTED_MODULE_0__["rgb"])(start)).r, (end = Object(d3_color__WEBPACK_IMPORTED_MODULE_0__["rgb"])(end)).r),
        g = color(start.g, end.g),
        b = color(start.b, end.b),
        opacity = Object(_color_js__WEBPACK_IMPORTED_MODULE_3__["default"])(start.opacity, end.opacity);
    return function(t) {
      start.r = r(t);
      start.g = g(t);
      start.b = b(t);
      start.opacity = opacity(t);
      return start + "";
    };
  }

  rgb.gamma = rgbGamma;

  return rgb;
})(1));

function rgbSpline(spline) {
  return function(colors) {
    var n = colors.length,
        r = new Array(n),
        g = new Array(n),
        b = new Array(n),
        i, color;
    for (i = 0; i < n; ++i) {
      color = Object(d3_color__WEBPACK_IMPORTED_MODULE_0__["rgb"])(colors[i]);
      r[i] = color.r || 0;
      g[i] = color.g || 0;
      b[i] = color.b || 0;
    }
    r = spline(r);
    g = spline(g);
    b = spline(b);
    color.opacity = 1;
    return function(t) {
      color.r = r(t);
      color.g = g(t);
      color.b = b(t);
      return color + "";
    };
  };
}

var rgbBasis = rgbSpline(_basis_js__WEBPACK_IMPORTED_MODULE_1__["default"]);
var rgbBasisClosed = rgbSpline(_basisClosed_js__WEBPACK_IMPORTED_MODULE_2__["default"]);


/***/ }),

/***/ "../node_modules/d3-interpolate/src/round.js":
/*!***************************************************!*\
  !*** ../node_modules/d3-interpolate/src/round.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function(a, b) {
  return a = +a, b = +b, function(t) {
    return Math.round(a * (1 - t) + b * t);
  };
});


/***/ }),

/***/ "../node_modules/d3-interpolate/src/string.js":
/*!****************************************************!*\
  !*** ../node_modules/d3-interpolate/src/string.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _number_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./number.js */ "../node_modules/d3-interpolate/src/number.js");


var reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
    reB = new RegExp(reA.source, "g");

function zero(b) {
  return function() {
    return b;
  };
}

function one(b) {
  return function(t) {
    return b(t) + "";
  };
}

/* harmony default export */ __webpack_exports__["default"] = (function(a, b) {
  var bi = reA.lastIndex = reB.lastIndex = 0, // scan index for next number in b
      am, // current match in a
      bm, // current match in b
      bs, // string preceding current number in b, if any
      i = -1, // index in s
      s = [], // string constants and placeholders
      q = []; // number interpolators

  // Coerce inputs to strings.
  a = a + "", b = b + "";

  // Interpolate pairs of numbers in a & b.
  while ((am = reA.exec(a))
      && (bm = reB.exec(b))) {
    if ((bs = bm.index) > bi) { // a string precedes the next number in b
      bs = b.slice(bi, bs);
      if (s[i]) s[i] += bs; // coalesce with previous string
      else s[++i] = bs;
    }
    if ((am = am[0]) === (bm = bm[0])) { // numbers in a & b match
      if (s[i]) s[i] += bm; // coalesce with previous string
      else s[++i] = bm;
    } else { // interpolate non-matching numbers
      s[++i] = null;
      q.push({i: i, x: Object(_number_js__WEBPACK_IMPORTED_MODULE_0__["default"])(am, bm)});
    }
    bi = reB.lastIndex;
  }

  // Add remains of b.
  if (bi < b.length) {
    bs = b.slice(bi);
    if (s[i]) s[i] += bs; // coalesce with previous string
    else s[++i] = bs;
  }

  // Special optimization for only a single match.
  // Otherwise, interpolate each of the numbers and rejoin the string.
  return s.length < 2 ? (q[0]
      ? one(q[0].x)
      : zero(b))
      : (b = q.length, function(t) {
          for (var i = 0, o; i < b; ++i) s[(o = q[i]).i] = o.x(t);
          return s.join("");
        });
});


/***/ }),

/***/ "../node_modules/d3-interpolate/src/transform/decompose.js":
/*!*****************************************************************!*\
  !*** ../node_modules/d3-interpolate/src/transform/decompose.js ***!
  \*****************************************************************/
/*! exports provided: identity, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "identity", function() { return identity; });
var degrees = 180 / Math.PI;

var identity = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};

/* harmony default export */ __webpack_exports__["default"] = (function(a, b, c, d, e, f) {
  var scaleX, scaleY, skewX;
  if (scaleX = Math.sqrt(a * a + b * b)) a /= scaleX, b /= scaleX;
  if (skewX = a * c + b * d) c -= a * skewX, d -= b * skewX;
  if (scaleY = Math.sqrt(c * c + d * d)) c /= scaleY, d /= scaleY, skewX /= scaleY;
  if (a * d < b * c) a = -a, b = -b, skewX = -skewX, scaleX = -scaleX;
  return {
    translateX: e,
    translateY: f,
    rotate: Math.atan2(b, a) * degrees,
    skewX: Math.atan(skewX) * degrees,
    scaleX: scaleX,
    scaleY: scaleY
  };
});


/***/ }),

/***/ "../node_modules/d3-interpolate/src/transform/index.js":
/*!*************************************************************!*\
  !*** ../node_modules/d3-interpolate/src/transform/index.js ***!
  \*************************************************************/
/*! exports provided: interpolateTransformCss, interpolateTransformSvg */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "interpolateTransformCss", function() { return interpolateTransformCss; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "interpolateTransformSvg", function() { return interpolateTransformSvg; });
/* harmony import */ var _number_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../number.js */ "../node_modules/d3-interpolate/src/number.js");
/* harmony import */ var _parse_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./parse.js */ "../node_modules/d3-interpolate/src/transform/parse.js");



function interpolateTransform(parse, pxComma, pxParen, degParen) {

  function pop(s) {
    return s.length ? s.pop() + " " : "";
  }

  function translate(xa, ya, xb, yb, s, q) {
    if (xa !== xb || ya !== yb) {
      var i = s.push("translate(", null, pxComma, null, pxParen);
      q.push({i: i - 4, x: Object(_number_js__WEBPACK_IMPORTED_MODULE_0__["default"])(xa, xb)}, {i: i - 2, x: Object(_number_js__WEBPACK_IMPORTED_MODULE_0__["default"])(ya, yb)});
    } else if (xb || yb) {
      s.push("translate(" + xb + pxComma + yb + pxParen);
    }
  }

  function rotate(a, b, s, q) {
    if (a !== b) {
      if (a - b > 180) b += 360; else if (b - a > 180) a += 360; // shortest path
      q.push({i: s.push(pop(s) + "rotate(", null, degParen) - 2, x: Object(_number_js__WEBPACK_IMPORTED_MODULE_0__["default"])(a, b)});
    } else if (b) {
      s.push(pop(s) + "rotate(" + b + degParen);
    }
  }

  function skewX(a, b, s, q) {
    if (a !== b) {
      q.push({i: s.push(pop(s) + "skewX(", null, degParen) - 2, x: Object(_number_js__WEBPACK_IMPORTED_MODULE_0__["default"])(a, b)});
    } else if (b) {
      s.push(pop(s) + "skewX(" + b + degParen);
    }
  }

  function scale(xa, ya, xb, yb, s, q) {
    if (xa !== xb || ya !== yb) {
      var i = s.push(pop(s) + "scale(", null, ",", null, ")");
      q.push({i: i - 4, x: Object(_number_js__WEBPACK_IMPORTED_MODULE_0__["default"])(xa, xb)}, {i: i - 2, x: Object(_number_js__WEBPACK_IMPORTED_MODULE_0__["default"])(ya, yb)});
    } else if (xb !== 1 || yb !== 1) {
      s.push(pop(s) + "scale(" + xb + "," + yb + ")");
    }
  }

  return function(a, b) {
    var s = [], // string constants and placeholders
        q = []; // number interpolators
    a = parse(a), b = parse(b);
    translate(a.translateX, a.translateY, b.translateX, b.translateY, s, q);
    rotate(a.rotate, b.rotate, s, q);
    skewX(a.skewX, b.skewX, s, q);
    scale(a.scaleX, a.scaleY, b.scaleX, b.scaleY, s, q);
    a = b = null; // gc
    return function(t) {
      var i = -1, n = q.length, o;
      while (++i < n) s[(o = q[i]).i] = o.x(t);
      return s.join("");
    };
  };
}

var interpolateTransformCss = interpolateTransform(_parse_js__WEBPACK_IMPORTED_MODULE_1__["parseCss"], "px, ", "px)", "deg)");
var interpolateTransformSvg = interpolateTransform(_parse_js__WEBPACK_IMPORTED_MODULE_1__["parseSvg"], ", ", ")", ")");


/***/ }),

/***/ "../node_modules/d3-interpolate/src/transform/parse.js":
/*!*************************************************************!*\
  !*** ../node_modules/d3-interpolate/src/transform/parse.js ***!
  \*************************************************************/
/*! exports provided: parseCss, parseSvg */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseCss", function() { return parseCss; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseSvg", function() { return parseSvg; });
/* harmony import */ var _decompose_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./decompose.js */ "../node_modules/d3-interpolate/src/transform/decompose.js");


var cssNode,
    cssRoot,
    cssView,
    svgNode;

function parseCss(value) {
  if (value === "none") return _decompose_js__WEBPACK_IMPORTED_MODULE_0__["identity"];
  if (!cssNode) cssNode = document.createElement("DIV"), cssRoot = document.documentElement, cssView = document.defaultView;
  cssNode.style.transform = value;
  value = cssView.getComputedStyle(cssRoot.appendChild(cssNode), null).getPropertyValue("transform");
  cssRoot.removeChild(cssNode);
  value = value.slice(7, -1).split(",");
  return Object(_decompose_js__WEBPACK_IMPORTED_MODULE_0__["default"])(+value[0], +value[1], +value[2], +value[3], +value[4], +value[5]);
}

function parseSvg(value) {
  if (value == null) return _decompose_js__WEBPACK_IMPORTED_MODULE_0__["identity"];
  if (!svgNode) svgNode = document.createElementNS("http://www.w3.org/2000/svg", "g");
  svgNode.setAttribute("transform", value);
  if (!(value = svgNode.transform.baseVal.consolidate())) return _decompose_js__WEBPACK_IMPORTED_MODULE_0__["identity"];
  value = value.matrix;
  return Object(_decompose_js__WEBPACK_IMPORTED_MODULE_0__["default"])(value.a, value.b, value.c, value.d, value.e, value.f);
}


/***/ }),

/***/ "../node_modules/d3-interpolate/src/value.js":
/*!***************************************************!*\
  !*** ../node_modules/d3-interpolate/src/value.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var d3_color__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-color */ "../node_modules/d3-color/src/index.js");
/* harmony import */ var _rgb_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./rgb.js */ "../node_modules/d3-interpolate/src/rgb.js");
/* harmony import */ var _array_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./array.js */ "../node_modules/d3-interpolate/src/array.js");
/* harmony import */ var _date_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./date.js */ "../node_modules/d3-interpolate/src/date.js");
/* harmony import */ var _number_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./number.js */ "../node_modules/d3-interpolate/src/number.js");
/* harmony import */ var _object_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./object.js */ "../node_modules/d3-interpolate/src/object.js");
/* harmony import */ var _string_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./string.js */ "../node_modules/d3-interpolate/src/string.js");
/* harmony import */ var _constant_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./constant.js */ "../node_modules/d3-interpolate/src/constant.js");
/* harmony import */ var _numberArray_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./numberArray.js */ "../node_modules/d3-interpolate/src/numberArray.js");










/* harmony default export */ __webpack_exports__["default"] = (function(a, b) {
  var t = typeof b, c;
  return b == null || t === "boolean" ? Object(_constant_js__WEBPACK_IMPORTED_MODULE_7__["default"])(b)
      : (t === "number" ? _number_js__WEBPACK_IMPORTED_MODULE_4__["default"]
      : t === "string" ? ((c = Object(d3_color__WEBPACK_IMPORTED_MODULE_0__["color"])(b)) ? (b = c, _rgb_js__WEBPACK_IMPORTED_MODULE_1__["default"]) : _string_js__WEBPACK_IMPORTED_MODULE_6__["default"])
      : b instanceof d3_color__WEBPACK_IMPORTED_MODULE_0__["color"] ? _rgb_js__WEBPACK_IMPORTED_MODULE_1__["default"]
      : b instanceof Date ? _date_js__WEBPACK_IMPORTED_MODULE_3__["default"]
      : Object(_numberArray_js__WEBPACK_IMPORTED_MODULE_8__["isNumberArray"])(b) ? _numberArray_js__WEBPACK_IMPORTED_MODULE_8__["default"]
      : Array.isArray(b) ? _array_js__WEBPACK_IMPORTED_MODULE_2__["genericArray"]
      : typeof b.valueOf !== "function" && typeof b.toString !== "function" || isNaN(b) ? _object_js__WEBPACK_IMPORTED_MODULE_5__["default"]
      : _number_js__WEBPACK_IMPORTED_MODULE_4__["default"])(a, b);
});


/***/ }),

/***/ "../node_modules/d3-interpolate/src/zoom.js":
/*!**************************************************!*\
  !*** ../node_modules/d3-interpolate/src/zoom.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var rho = Math.SQRT2,
    rho2 = 2,
    rho4 = 4,
    epsilon2 = 1e-12;

function cosh(x) {
  return ((x = Math.exp(x)) + 1 / x) / 2;
}

function sinh(x) {
  return ((x = Math.exp(x)) - 1 / x) / 2;
}

function tanh(x) {
  return ((x = Math.exp(2 * x)) - 1) / (x + 1);
}

// p0 = [ux0, uy0, w0]
// p1 = [ux1, uy1, w1]
/* harmony default export */ __webpack_exports__["default"] = (function(p0, p1) {
  var ux0 = p0[0], uy0 = p0[1], w0 = p0[2],
      ux1 = p1[0], uy1 = p1[1], w1 = p1[2],
      dx = ux1 - ux0,
      dy = uy1 - uy0,
      d2 = dx * dx + dy * dy,
      i,
      S;

  // Special case for u0 ≅ u1.
  if (d2 < epsilon2) {
    S = Math.log(w1 / w0) / rho;
    i = function(t) {
      return [
        ux0 + t * dx,
        uy0 + t * dy,
        w0 * Math.exp(rho * t * S)
      ];
    }
  }

  // General case.
  else {
    var d1 = Math.sqrt(d2),
        b0 = (w1 * w1 - w0 * w0 + rho4 * d2) / (2 * w0 * rho2 * d1),
        b1 = (w1 * w1 - w0 * w0 - rho4 * d2) / (2 * w1 * rho2 * d1),
        r0 = Math.log(Math.sqrt(b0 * b0 + 1) - b0),
        r1 = Math.log(Math.sqrt(b1 * b1 + 1) - b1);
    S = (r1 - r0) / rho;
    i = function(t) {
      var s = t * S,
          coshr0 = cosh(r0),
          u = w0 / (rho2 * d1) * (coshr0 * tanh(rho * s + r0) - sinh(r0));
      return [
        ux0 + u * dx,
        uy0 + u * dy,
        w0 * coshr0 / cosh(rho * s + r0)
      ];
    }
  }

  i.duration = S * 1000;

  return i;
});


/***/ }),

/***/ "../node_modules/d3-scale-chromatic/src/categorical/Accent.js":
/*!********************************************************************!*\
  !*** ../node_modules/d3-scale-chromatic/src/categorical/Accent.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _colors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../colors.js */ "../node_modules/d3-scale-chromatic/src/colors.js");


/* harmony default export */ __webpack_exports__["default"] = (Object(_colors_js__WEBPACK_IMPORTED_MODULE_0__["default"])("7fc97fbeaed4fdc086ffff99386cb0f0027fbf5b17666666"));


/***/ }),

/***/ "../node_modules/d3-scale-chromatic/src/categorical/Dark2.js":
/*!*******************************************************************!*\
  !*** ../node_modules/d3-scale-chromatic/src/categorical/Dark2.js ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _colors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../colors.js */ "../node_modules/d3-scale-chromatic/src/colors.js");


/* harmony default export */ __webpack_exports__["default"] = (Object(_colors_js__WEBPACK_IMPORTED_MODULE_0__["default"])("1b9e77d95f027570b3e7298a66a61ee6ab02a6761d666666"));


/***/ }),

/***/ "../node_modules/d3-scale-chromatic/src/categorical/Paired.js":
/*!********************************************************************!*\
  !*** ../node_modules/d3-scale-chromatic/src/categorical/Paired.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _colors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../colors.js */ "../node_modules/d3-scale-chromatic/src/colors.js");


/* harmony default export */ __webpack_exports__["default"] = (Object(_colors_js__WEBPACK_IMPORTED_MODULE_0__["default"])("a6cee31f78b4b2df8a33a02cfb9a99e31a1cfdbf6fff7f00cab2d66a3d9affff99b15928"));


/***/ }),

/***/ "../node_modules/d3-scale-chromatic/src/categorical/Pastel1.js":
/*!*********************************************************************!*\
  !*** ../node_modules/d3-scale-chromatic/src/categorical/Pastel1.js ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _colors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../colors.js */ "../node_modules/d3-scale-chromatic/src/colors.js");


/* harmony default export */ __webpack_exports__["default"] = (Object(_colors_js__WEBPACK_IMPORTED_MODULE_0__["default"])("fbb4aeb3cde3ccebc5decbe4fed9a6ffffcce5d8bdfddaecf2f2f2"));


/***/ }),

/***/ "../node_modules/d3-scale-chromatic/src/categorical/Pastel2.js":
/*!*********************************************************************!*\
  !*** ../node_modules/d3-scale-chromatic/src/categorical/Pastel2.js ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _colors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../colors.js */ "../node_modules/d3-scale-chromatic/src/colors.js");


/* harmony default export */ __webpack_exports__["default"] = (Object(_colors_js__WEBPACK_IMPORTED_MODULE_0__["default"])("b3e2cdfdcdaccbd5e8f4cae4e6f5c9fff2aef1e2cccccccc"));


/***/ }),

/***/ "../node_modules/d3-scale-chromatic/src/categorical/Set1.js":
/*!******************************************************************!*\
  !*** ../node_modules/d3-scale-chromatic/src/categorical/Set1.js ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _colors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../colors.js */ "../node_modules/d3-scale-chromatic/src/colors.js");


/* harmony default export */ __webpack_exports__["default"] = (Object(_colors_js__WEBPACK_IMPORTED_MODULE_0__["default"])("e41a1c377eb84daf4a984ea3ff7f00ffff33a65628f781bf999999"));


/***/ }),

/***/ "../node_modules/d3-scale-chromatic/src/categorical/Set2.js":
/*!******************************************************************!*\
  !*** ../node_modules/d3-scale-chromatic/src/categorical/Set2.js ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _colors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../colors.js */ "../node_modules/d3-scale-chromatic/src/colors.js");


/* harmony default export */ __webpack_exports__["default"] = (Object(_colors_js__WEBPACK_IMPORTED_MODULE_0__["default"])("66c2a5fc8d628da0cbe78ac3a6d854ffd92fe5c494b3b3b3"));


/***/ }),

/***/ "../node_modules/d3-scale-chromatic/src/categorical/Set3.js":
/*!******************************************************************!*\
  !*** ../node_modules/d3-scale-chromatic/src/categorical/Set3.js ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _colors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../colors.js */ "../node_modules/d3-scale-chromatic/src/colors.js");


/* harmony default export */ __webpack_exports__["default"] = (Object(_colors_js__WEBPACK_IMPORTED_MODULE_0__["default"])("8dd3c7ffffb3bebadafb807280b1d3fdb462b3de69fccde5d9d9d9bc80bdccebc5ffed6f"));


/***/ }),

/***/ "../node_modules/d3-scale-chromatic/src/categorical/Tableau10.js":
/*!***********************************************************************!*\
  !*** ../node_modules/d3-scale-chromatic/src/categorical/Tableau10.js ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _colors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../colors.js */ "../node_modules/d3-scale-chromatic/src/colors.js");


/* harmony default export */ __webpack_exports__["default"] = (Object(_colors_js__WEBPACK_IMPORTED_MODULE_0__["default"])("4e79a7f28e2ce1575976b7b259a14fedc949af7aa1ff9da79c755fbab0ab"));


/***/ }),

/***/ "../node_modules/d3-scale-chromatic/src/categorical/category10.js":
/*!************************************************************************!*\
  !*** ../node_modules/d3-scale-chromatic/src/categorical/category10.js ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _colors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../colors.js */ "../node_modules/d3-scale-chromatic/src/colors.js");


/* harmony default export */ __webpack_exports__["default"] = (Object(_colors_js__WEBPACK_IMPORTED_MODULE_0__["default"])("1f77b4ff7f0e2ca02cd627289467bd8c564be377c27f7f7fbcbd2217becf"));


/***/ }),

/***/ "../node_modules/d3-scale-chromatic/src/colors.js":
/*!********************************************************!*\
  !*** ../node_modules/d3-scale-chromatic/src/colors.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function(specifier) {
  var n = specifier.length / 6 | 0, colors = new Array(n), i = 0;
  while (i < n) colors[i] = "#" + specifier.slice(i * 6, ++i * 6);
  return colors;
});


/***/ }),

/***/ "../node_modules/d3-scale-chromatic/src/diverging/BrBG.js":
/*!****************************************************************!*\
  !*** ../node_modules/d3-scale-chromatic/src/diverging/BrBG.js ***!
  \****************************************************************/
/*! exports provided: scheme, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scheme", function() { return scheme; });
/* harmony import */ var _colors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../colors.js */ "../node_modules/d3-scale-chromatic/src/colors.js");
/* harmony import */ var _ramp_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ramp.js */ "../node_modules/d3-scale-chromatic/src/ramp.js");



var scheme = new Array(3).concat(
  "d8b365f5f5f55ab4ac",
  "a6611adfc27d80cdc1018571",
  "a6611adfc27df5f5f580cdc1018571",
  "8c510ad8b365f6e8c3c7eae55ab4ac01665e",
  "8c510ad8b365f6e8c3f5f5f5c7eae55ab4ac01665e",
  "8c510abf812ddfc27df6e8c3c7eae580cdc135978f01665e",
  "8c510abf812ddfc27df6e8c3f5f5f5c7eae580cdc135978f01665e",
  "5430058c510abf812ddfc27df6e8c3c7eae580cdc135978f01665e003c30",
  "5430058c510abf812ddfc27df6e8c3f5f5f5c7eae580cdc135978f01665e003c30"
).map(_colors_js__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (Object(_ramp_js__WEBPACK_IMPORTED_MODULE_1__["default"])(scheme));


/***/ }),

/***/ "../node_modules/d3-scale-chromatic/src/diverging/PRGn.js":
/*!****************************************************************!*\
  !*** ../node_modules/d3-scale-chromatic/src/diverging/PRGn.js ***!
  \****************************************************************/
/*! exports provided: scheme, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scheme", function() { return scheme; });
/* harmony import */ var _colors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../colors.js */ "../node_modules/d3-scale-chromatic/src/colors.js");
/* harmony import */ var _ramp_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ramp.js */ "../node_modules/d3-scale-chromatic/src/ramp.js");



var scheme = new Array(3).concat(
  "af8dc3f7f7f77fbf7b",
  "7b3294c2a5cfa6dba0008837",
  "7b3294c2a5cff7f7f7a6dba0008837",
  "762a83af8dc3e7d4e8d9f0d37fbf7b1b7837",
  "762a83af8dc3e7d4e8f7f7f7d9f0d37fbf7b1b7837",
  "762a839970abc2a5cfe7d4e8d9f0d3a6dba05aae611b7837",
  "762a839970abc2a5cfe7d4e8f7f7f7d9f0d3a6dba05aae611b7837",
  "40004b762a839970abc2a5cfe7d4e8d9f0d3a6dba05aae611b783700441b",
  "40004b762a839970abc2a5cfe7d4e8f7f7f7d9f0d3a6dba05aae611b783700441b"
).map(_colors_js__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (Object(_ramp_js__WEBPACK_IMPORTED_MODULE_1__["default"])(scheme));


/***/ }),

/***/ "../node_modules/d3-scale-chromatic/src/diverging/PiYG.js":
/*!****************************************************************!*\
  !*** ../node_modules/d3-scale-chromatic/src/diverging/PiYG.js ***!
  \****************************************************************/
/*! exports provided: scheme, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scheme", function() { return scheme; });
/* harmony import */ var _colors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../colors.js */ "../node_modules/d3-scale-chromatic/src/colors.js");
/* harmony import */ var _ramp_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ramp.js */ "../node_modules/d3-scale-chromatic/src/ramp.js");



var scheme = new Array(3).concat(
  "e9a3c9f7f7f7a1d76a",
  "d01c8bf1b6dab8e1864dac26",
  "d01c8bf1b6daf7f7f7b8e1864dac26",
  "c51b7de9a3c9fde0efe6f5d0a1d76a4d9221",
  "c51b7de9a3c9fde0eff7f7f7e6f5d0a1d76a4d9221",
  "c51b7dde77aef1b6dafde0efe6f5d0b8e1867fbc414d9221",
  "c51b7dde77aef1b6dafde0eff7f7f7e6f5d0b8e1867fbc414d9221",
  "8e0152c51b7dde77aef1b6dafde0efe6f5d0b8e1867fbc414d9221276419",
  "8e0152c51b7dde77aef1b6dafde0eff7f7f7e6f5d0b8e1867fbc414d9221276419"
).map(_colors_js__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (Object(_ramp_js__WEBPACK_IMPORTED_MODULE_1__["default"])(scheme));


/***/ }),

/***/ "../node_modules/d3-scale-chromatic/src/diverging/PuOr.js":
/*!****************************************************************!*\
  !*** ../node_modules/d3-scale-chromatic/src/diverging/PuOr.js ***!
  \****************************************************************/
/*! exports provided: scheme, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scheme", function() { return scheme; });
/* harmony import */ var _colors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../colors.js */ "../node_modules/d3-scale-chromatic/src/colors.js");
/* harmony import */ var _ramp_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ramp.js */ "../node_modules/d3-scale-chromatic/src/ramp.js");



var scheme = new Array(3).concat(
  "998ec3f7f7f7f1a340",
  "5e3c99b2abd2fdb863e66101",
  "5e3c99b2abd2f7f7f7fdb863e66101",
  "542788998ec3d8daebfee0b6f1a340b35806",
  "542788998ec3d8daebf7f7f7fee0b6f1a340b35806",
  "5427888073acb2abd2d8daebfee0b6fdb863e08214b35806",
  "5427888073acb2abd2d8daebf7f7f7fee0b6fdb863e08214b35806",
  "2d004b5427888073acb2abd2d8daebfee0b6fdb863e08214b358067f3b08",
  "2d004b5427888073acb2abd2d8daebf7f7f7fee0b6fdb863e08214b358067f3b08"
).map(_colors_js__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (Object(_ramp_js__WEBPACK_IMPORTED_MODULE_1__["default"])(scheme));


/***/ }),

/***/ "../node_modules/d3-scale-chromatic/src/diverging/RdBu.js":
/*!****************************************************************!*\
  !*** ../node_modules/d3-scale-chromatic/src/diverging/RdBu.js ***!
  \****************************************************************/
/*! exports provided: scheme, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scheme", function() { return scheme; });
/* harmony import */ var _colors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../colors.js */ "../node_modules/d3-scale-chromatic/src/colors.js");
/* harmony import */ var _ramp_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ramp.js */ "../node_modules/d3-scale-chromatic/src/ramp.js");



var scheme = new Array(3).concat(
  "ef8a62f7f7f767a9cf",
  "ca0020f4a58292c5de0571b0",
  "ca0020f4a582f7f7f792c5de0571b0",
  "b2182bef8a62fddbc7d1e5f067a9cf2166ac",
  "b2182bef8a62fddbc7f7f7f7d1e5f067a9cf2166ac",
  "b2182bd6604df4a582fddbc7d1e5f092c5de4393c32166ac",
  "b2182bd6604df4a582fddbc7f7f7f7d1e5f092c5de4393c32166ac",
  "67001fb2182bd6604df4a582fddbc7d1e5f092c5de4393c32166ac053061",
  "67001fb2182bd6604df4a582fddbc7f7f7f7d1e5f092c5de4393c32166ac053061"
).map(_colors_js__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (Object(_ramp_js__WEBPACK_IMPORTED_MODULE_1__["default"])(scheme));


/***/ }),

/***/ "../node_modules/d3-scale-chromatic/src/diverging/RdGy.js":
/*!****************************************************************!*\
  !*** ../node_modules/d3-scale-chromatic/src/diverging/RdGy.js ***!
  \****************************************************************/
/*! exports provided: scheme, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scheme", function() { return scheme; });
/* harmony import */ var _colors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../colors.js */ "../node_modules/d3-scale-chromatic/src/colors.js");
/* harmony import */ var _ramp_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ramp.js */ "../node_modules/d3-scale-chromatic/src/ramp.js");



var scheme = new Array(3).concat(
  "ef8a62ffffff999999",
  "ca0020f4a582bababa404040",
  "ca0020f4a582ffffffbababa404040",
  "b2182bef8a62fddbc7e0e0e09999994d4d4d",
  "b2182bef8a62fddbc7ffffffe0e0e09999994d4d4d",
  "b2182bd6604df4a582fddbc7e0e0e0bababa8787874d4d4d",
  "b2182bd6604df4a582fddbc7ffffffe0e0e0bababa8787874d4d4d",
  "67001fb2182bd6604df4a582fddbc7e0e0e0bababa8787874d4d4d1a1a1a",
  "67001fb2182bd6604df4a582fddbc7ffffffe0e0e0bababa8787874d4d4d1a1a1a"
).map(_colors_js__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (Object(_ramp_js__WEBPACK_IMPORTED_MODULE_1__["default"])(scheme));


/***/ }),

/***/ "../node_modules/d3-scale-chromatic/src/diverging/RdYlBu.js":
/*!******************************************************************!*\
  !*** ../node_modules/d3-scale-chromatic/src/diverging/RdYlBu.js ***!
  \******************************************************************/
/*! exports provided: scheme, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scheme", function() { return scheme; });
/* harmony import */ var _colors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../colors.js */ "../node_modules/d3-scale-chromatic/src/colors.js");
/* harmony import */ var _ramp_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ramp.js */ "../node_modules/d3-scale-chromatic/src/ramp.js");



var scheme = new Array(3).concat(
  "fc8d59ffffbf91bfdb",
  "d7191cfdae61abd9e92c7bb6",
  "d7191cfdae61ffffbfabd9e92c7bb6",
  "d73027fc8d59fee090e0f3f891bfdb4575b4",
  "d73027fc8d59fee090ffffbfe0f3f891bfdb4575b4",
  "d73027f46d43fdae61fee090e0f3f8abd9e974add14575b4",
  "d73027f46d43fdae61fee090ffffbfe0f3f8abd9e974add14575b4",
  "a50026d73027f46d43fdae61fee090e0f3f8abd9e974add14575b4313695",
  "a50026d73027f46d43fdae61fee090ffffbfe0f3f8abd9e974add14575b4313695"
).map(_colors_js__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (Object(_ramp_js__WEBPACK_IMPORTED_MODULE_1__["default"])(scheme));


/***/ }),

/***/ "../node_modules/d3-scale-chromatic/src/diverging/RdYlGn.js":
/*!******************************************************************!*\
  !*** ../node_modules/d3-scale-chromatic/src/diverging/RdYlGn.js ***!
  \******************************************************************/
/*! exports provided: scheme, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scheme", function() { return scheme; });
/* harmony import */ var _colors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../colors.js */ "../node_modules/d3-scale-chromatic/src/colors.js");
/* harmony import */ var _ramp_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ramp.js */ "../node_modules/d3-scale-chromatic/src/ramp.js");



var scheme = new Array(3).concat(
  "fc8d59ffffbf91cf60",
  "d7191cfdae61a6d96a1a9641",
  "d7191cfdae61ffffbfa6d96a1a9641",
  "d73027fc8d59fee08bd9ef8b91cf601a9850",
  "d73027fc8d59fee08bffffbfd9ef8b91cf601a9850",
  "d73027f46d43fdae61fee08bd9ef8ba6d96a66bd631a9850",
  "d73027f46d43fdae61fee08bffffbfd9ef8ba6d96a66bd631a9850",
  "a50026d73027f46d43fdae61fee08bd9ef8ba6d96a66bd631a9850006837",
  "a50026d73027f46d43fdae61fee08bffffbfd9ef8ba6d96a66bd631a9850006837"
).map(_colors_js__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (Object(_ramp_js__WEBPACK_IMPORTED_MODULE_1__["default"])(scheme));


/***/ }),

/***/ "../node_modules/d3-scale-chromatic/src/diverging/Spectral.js":
/*!********************************************************************!*\
  !*** ../node_modules/d3-scale-chromatic/src/diverging/Spectral.js ***!
  \********************************************************************/
/*! exports provided: scheme, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scheme", function() { return scheme; });
/* harmony import */ var _colors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../colors.js */ "../node_modules/d3-scale-chromatic/src/colors.js");
/* harmony import */ var _ramp_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ramp.js */ "../node_modules/d3-scale-chromatic/src/ramp.js");



var scheme = new Array(3).concat(
  "fc8d59ffffbf99d594",
  "d7191cfdae61abdda42b83ba",
  "d7191cfdae61ffffbfabdda42b83ba",
  "d53e4ffc8d59fee08be6f59899d5943288bd",
  "d53e4ffc8d59fee08bffffbfe6f59899d5943288bd",
  "d53e4ff46d43fdae61fee08be6f598abdda466c2a53288bd",
  "d53e4ff46d43fdae61fee08bffffbfe6f598abdda466c2a53288bd",
  "9e0142d53e4ff46d43fdae61fee08be6f598abdda466c2a53288bd5e4fa2",
  "9e0142d53e4ff46d43fdae61fee08bffffbfe6f598abdda466c2a53288bd5e4fa2"
).map(_colors_js__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (Object(_ramp_js__WEBPACK_IMPORTED_MODULE_1__["default"])(scheme));


/***/ }),

/***/ "../node_modules/d3-scale-chromatic/src/index.js":
/*!*******************************************************!*\
  !*** ../node_modules/d3-scale-chromatic/src/index.js ***!
  \*******************************************************/
/*! exports provided: schemeCategory10, schemeAccent, schemeDark2, schemePaired, schemePastel1, schemePastel2, schemeSet1, schemeSet2, schemeSet3, schemeTableau10, interpolateBrBG, schemeBrBG, interpolatePRGn, schemePRGn, interpolatePiYG, schemePiYG, interpolatePuOr, schemePuOr, interpolateRdBu, schemeRdBu, interpolateRdGy, schemeRdGy, interpolateRdYlBu, schemeRdYlBu, interpolateRdYlGn, schemeRdYlGn, interpolateSpectral, schemeSpectral, interpolateBuGn, schemeBuGn, interpolateBuPu, schemeBuPu, interpolateGnBu, schemeGnBu, interpolateOrRd, schemeOrRd, interpolatePuBuGn, schemePuBuGn, interpolatePuBu, schemePuBu, interpolatePuRd, schemePuRd, interpolateRdPu, schemeRdPu, interpolateYlGnBu, schemeYlGnBu, interpolateYlGn, schemeYlGn, interpolateYlOrBr, schemeYlOrBr, interpolateYlOrRd, schemeYlOrRd, interpolateBlues, schemeBlues, interpolateGreens, schemeGreens, interpolateGreys, schemeGreys, interpolatePurples, schemePurples, interpolateReds, schemeReds, interpolateOranges, schemeOranges, interpolateCividis, interpolateCubehelixDefault, interpolateRainbow, interpolateWarm, interpolateCool, interpolateSinebow, interpolateTurbo, interpolateViridis, interpolateMagma, interpolateInferno, interpolatePlasma */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _categorical_category10_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./categorical/category10.js */ "../node_modules/d3-scale-chromatic/src/categorical/category10.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "schemeCategory10", function() { return _categorical_category10_js__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _categorical_Accent_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./categorical/Accent.js */ "../node_modules/d3-scale-chromatic/src/categorical/Accent.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "schemeAccent", function() { return _categorical_Accent_js__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _categorical_Dark2_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./categorical/Dark2.js */ "../node_modules/d3-scale-chromatic/src/categorical/Dark2.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "schemeDark2", function() { return _categorical_Dark2_js__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _categorical_Paired_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./categorical/Paired.js */ "../node_modules/d3-scale-chromatic/src/categorical/Paired.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "schemePaired", function() { return _categorical_Paired_js__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _categorical_Pastel1_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./categorical/Pastel1.js */ "../node_modules/d3-scale-chromatic/src/categorical/Pastel1.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "schemePastel1", function() { return _categorical_Pastel1_js__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony import */ var _categorical_Pastel2_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./categorical/Pastel2.js */ "../node_modules/d3-scale-chromatic/src/categorical/Pastel2.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "schemePastel2", function() { return _categorical_Pastel2_js__WEBPACK_IMPORTED_MODULE_5__["default"]; });

/* harmony import */ var _categorical_Set1_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./categorical/Set1.js */ "../node_modules/d3-scale-chromatic/src/categorical/Set1.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "schemeSet1", function() { return _categorical_Set1_js__WEBPACK_IMPORTED_MODULE_6__["default"]; });

/* harmony import */ var _categorical_Set2_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./categorical/Set2.js */ "../node_modules/d3-scale-chromatic/src/categorical/Set2.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "schemeSet2", function() { return _categorical_Set2_js__WEBPACK_IMPORTED_MODULE_7__["default"]; });

/* harmony import */ var _categorical_Set3_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./categorical/Set3.js */ "../node_modules/d3-scale-chromatic/src/categorical/Set3.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "schemeSet3", function() { return _categorical_Set3_js__WEBPACK_IMPORTED_MODULE_8__["default"]; });

/* harmony import */ var _categorical_Tableau10_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./categorical/Tableau10.js */ "../node_modules/d3-scale-chromatic/src/categorical/Tableau10.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "schemeTableau10", function() { return _categorical_Tableau10_js__WEBPACK_IMPORTED_MODULE_9__["default"]; });

/* harmony import */ var _diverging_BrBG_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./diverging/BrBG.js */ "../node_modules/d3-scale-chromatic/src/diverging/BrBG.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateBrBG", function() { return _diverging_BrBG_js__WEBPACK_IMPORTED_MODULE_10__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "schemeBrBG", function() { return _diverging_BrBG_js__WEBPACK_IMPORTED_MODULE_10__["scheme"]; });

/* harmony import */ var _diverging_PRGn_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./diverging/PRGn.js */ "../node_modules/d3-scale-chromatic/src/diverging/PRGn.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolatePRGn", function() { return _diverging_PRGn_js__WEBPACK_IMPORTED_MODULE_11__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "schemePRGn", function() { return _diverging_PRGn_js__WEBPACK_IMPORTED_MODULE_11__["scheme"]; });

/* harmony import */ var _diverging_PiYG_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./diverging/PiYG.js */ "../node_modules/d3-scale-chromatic/src/diverging/PiYG.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolatePiYG", function() { return _diverging_PiYG_js__WEBPACK_IMPORTED_MODULE_12__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "schemePiYG", function() { return _diverging_PiYG_js__WEBPACK_IMPORTED_MODULE_12__["scheme"]; });

/* harmony import */ var _diverging_PuOr_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./diverging/PuOr.js */ "../node_modules/d3-scale-chromatic/src/diverging/PuOr.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolatePuOr", function() { return _diverging_PuOr_js__WEBPACK_IMPORTED_MODULE_13__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "schemePuOr", function() { return _diverging_PuOr_js__WEBPACK_IMPORTED_MODULE_13__["scheme"]; });

/* harmony import */ var _diverging_RdBu_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./diverging/RdBu.js */ "../node_modules/d3-scale-chromatic/src/diverging/RdBu.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateRdBu", function() { return _diverging_RdBu_js__WEBPACK_IMPORTED_MODULE_14__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "schemeRdBu", function() { return _diverging_RdBu_js__WEBPACK_IMPORTED_MODULE_14__["scheme"]; });

/* harmony import */ var _diverging_RdGy_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./diverging/RdGy.js */ "../node_modules/d3-scale-chromatic/src/diverging/RdGy.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateRdGy", function() { return _diverging_RdGy_js__WEBPACK_IMPORTED_MODULE_15__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "schemeRdGy", function() { return _diverging_RdGy_js__WEBPACK_IMPORTED_MODULE_15__["scheme"]; });

/* harmony import */ var _diverging_RdYlBu_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./diverging/RdYlBu.js */ "../node_modules/d3-scale-chromatic/src/diverging/RdYlBu.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateRdYlBu", function() { return _diverging_RdYlBu_js__WEBPACK_IMPORTED_MODULE_16__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "schemeRdYlBu", function() { return _diverging_RdYlBu_js__WEBPACK_IMPORTED_MODULE_16__["scheme"]; });

/* harmony import */ var _diverging_RdYlGn_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./diverging/RdYlGn.js */ "../node_modules/d3-scale-chromatic/src/diverging/RdYlGn.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateRdYlGn", function() { return _diverging_RdYlGn_js__WEBPACK_IMPORTED_MODULE_17__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "schemeRdYlGn", function() { return _diverging_RdYlGn_js__WEBPACK_IMPORTED_MODULE_17__["scheme"]; });

/* harmony import */ var _diverging_Spectral_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./diverging/Spectral.js */ "../node_modules/d3-scale-chromatic/src/diverging/Spectral.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateSpectral", function() { return _diverging_Spectral_js__WEBPACK_IMPORTED_MODULE_18__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "schemeSpectral", function() { return _diverging_Spectral_js__WEBPACK_IMPORTED_MODULE_18__["scheme"]; });

/* harmony import */ var _sequential_multi_BuGn_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./sequential-multi/BuGn.js */ "../node_modules/d3-scale-chromatic/src/sequential-multi/BuGn.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateBuGn", function() { return _sequential_multi_BuGn_js__WEBPACK_IMPORTED_MODULE_19__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "schemeBuGn", function() { return _sequential_multi_BuGn_js__WEBPACK_IMPORTED_MODULE_19__["scheme"]; });

/* harmony import */ var _sequential_multi_BuPu_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./sequential-multi/BuPu.js */ "../node_modules/d3-scale-chromatic/src/sequential-multi/BuPu.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateBuPu", function() { return _sequential_multi_BuPu_js__WEBPACK_IMPORTED_MODULE_20__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "schemeBuPu", function() { return _sequential_multi_BuPu_js__WEBPACK_IMPORTED_MODULE_20__["scheme"]; });

/* harmony import */ var _sequential_multi_GnBu_js__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./sequential-multi/GnBu.js */ "../node_modules/d3-scale-chromatic/src/sequential-multi/GnBu.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateGnBu", function() { return _sequential_multi_GnBu_js__WEBPACK_IMPORTED_MODULE_21__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "schemeGnBu", function() { return _sequential_multi_GnBu_js__WEBPACK_IMPORTED_MODULE_21__["scheme"]; });

/* harmony import */ var _sequential_multi_OrRd_js__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./sequential-multi/OrRd.js */ "../node_modules/d3-scale-chromatic/src/sequential-multi/OrRd.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateOrRd", function() { return _sequential_multi_OrRd_js__WEBPACK_IMPORTED_MODULE_22__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "schemeOrRd", function() { return _sequential_multi_OrRd_js__WEBPACK_IMPORTED_MODULE_22__["scheme"]; });

/* harmony import */ var _sequential_multi_PuBuGn_js__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./sequential-multi/PuBuGn.js */ "../node_modules/d3-scale-chromatic/src/sequential-multi/PuBuGn.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolatePuBuGn", function() { return _sequential_multi_PuBuGn_js__WEBPACK_IMPORTED_MODULE_23__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "schemePuBuGn", function() { return _sequential_multi_PuBuGn_js__WEBPACK_IMPORTED_MODULE_23__["scheme"]; });

/* harmony import */ var _sequential_multi_PuBu_js__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./sequential-multi/PuBu.js */ "../node_modules/d3-scale-chromatic/src/sequential-multi/PuBu.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolatePuBu", function() { return _sequential_multi_PuBu_js__WEBPACK_IMPORTED_MODULE_24__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "schemePuBu", function() { return _sequential_multi_PuBu_js__WEBPACK_IMPORTED_MODULE_24__["scheme"]; });

/* harmony import */ var _sequential_multi_PuRd_js__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./sequential-multi/PuRd.js */ "../node_modules/d3-scale-chromatic/src/sequential-multi/PuRd.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolatePuRd", function() { return _sequential_multi_PuRd_js__WEBPACK_IMPORTED_MODULE_25__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "schemePuRd", function() { return _sequential_multi_PuRd_js__WEBPACK_IMPORTED_MODULE_25__["scheme"]; });

/* harmony import */ var _sequential_multi_RdPu_js__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./sequential-multi/RdPu.js */ "../node_modules/d3-scale-chromatic/src/sequential-multi/RdPu.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateRdPu", function() { return _sequential_multi_RdPu_js__WEBPACK_IMPORTED_MODULE_26__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "schemeRdPu", function() { return _sequential_multi_RdPu_js__WEBPACK_IMPORTED_MODULE_26__["scheme"]; });

/* harmony import */ var _sequential_multi_YlGnBu_js__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./sequential-multi/YlGnBu.js */ "../node_modules/d3-scale-chromatic/src/sequential-multi/YlGnBu.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateYlGnBu", function() { return _sequential_multi_YlGnBu_js__WEBPACK_IMPORTED_MODULE_27__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "schemeYlGnBu", function() { return _sequential_multi_YlGnBu_js__WEBPACK_IMPORTED_MODULE_27__["scheme"]; });

/* harmony import */ var _sequential_multi_YlGn_js__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./sequential-multi/YlGn.js */ "../node_modules/d3-scale-chromatic/src/sequential-multi/YlGn.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateYlGn", function() { return _sequential_multi_YlGn_js__WEBPACK_IMPORTED_MODULE_28__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "schemeYlGn", function() { return _sequential_multi_YlGn_js__WEBPACK_IMPORTED_MODULE_28__["scheme"]; });

/* harmony import */ var _sequential_multi_YlOrBr_js__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./sequential-multi/YlOrBr.js */ "../node_modules/d3-scale-chromatic/src/sequential-multi/YlOrBr.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateYlOrBr", function() { return _sequential_multi_YlOrBr_js__WEBPACK_IMPORTED_MODULE_29__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "schemeYlOrBr", function() { return _sequential_multi_YlOrBr_js__WEBPACK_IMPORTED_MODULE_29__["scheme"]; });

/* harmony import */ var _sequential_multi_YlOrRd_js__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./sequential-multi/YlOrRd.js */ "../node_modules/d3-scale-chromatic/src/sequential-multi/YlOrRd.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateYlOrRd", function() { return _sequential_multi_YlOrRd_js__WEBPACK_IMPORTED_MODULE_30__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "schemeYlOrRd", function() { return _sequential_multi_YlOrRd_js__WEBPACK_IMPORTED_MODULE_30__["scheme"]; });

/* harmony import */ var _sequential_single_Blues_js__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./sequential-single/Blues.js */ "../node_modules/d3-scale-chromatic/src/sequential-single/Blues.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateBlues", function() { return _sequential_single_Blues_js__WEBPACK_IMPORTED_MODULE_31__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "schemeBlues", function() { return _sequential_single_Blues_js__WEBPACK_IMPORTED_MODULE_31__["scheme"]; });

/* harmony import */ var _sequential_single_Greens_js__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./sequential-single/Greens.js */ "../node_modules/d3-scale-chromatic/src/sequential-single/Greens.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateGreens", function() { return _sequential_single_Greens_js__WEBPACK_IMPORTED_MODULE_32__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "schemeGreens", function() { return _sequential_single_Greens_js__WEBPACK_IMPORTED_MODULE_32__["scheme"]; });

/* harmony import */ var _sequential_single_Greys_js__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./sequential-single/Greys.js */ "../node_modules/d3-scale-chromatic/src/sequential-single/Greys.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateGreys", function() { return _sequential_single_Greys_js__WEBPACK_IMPORTED_MODULE_33__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "schemeGreys", function() { return _sequential_single_Greys_js__WEBPACK_IMPORTED_MODULE_33__["scheme"]; });

/* harmony import */ var _sequential_single_Purples_js__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./sequential-single/Purples.js */ "../node_modules/d3-scale-chromatic/src/sequential-single/Purples.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolatePurples", function() { return _sequential_single_Purples_js__WEBPACK_IMPORTED_MODULE_34__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "schemePurples", function() { return _sequential_single_Purples_js__WEBPACK_IMPORTED_MODULE_34__["scheme"]; });

/* harmony import */ var _sequential_single_Reds_js__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ./sequential-single/Reds.js */ "../node_modules/d3-scale-chromatic/src/sequential-single/Reds.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateReds", function() { return _sequential_single_Reds_js__WEBPACK_IMPORTED_MODULE_35__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "schemeReds", function() { return _sequential_single_Reds_js__WEBPACK_IMPORTED_MODULE_35__["scheme"]; });

/* harmony import */ var _sequential_single_Oranges_js__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ./sequential-single/Oranges.js */ "../node_modules/d3-scale-chromatic/src/sequential-single/Oranges.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateOranges", function() { return _sequential_single_Oranges_js__WEBPACK_IMPORTED_MODULE_36__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "schemeOranges", function() { return _sequential_single_Oranges_js__WEBPACK_IMPORTED_MODULE_36__["scheme"]; });

/* harmony import */ var _sequential_multi_cividis_js__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! ./sequential-multi/cividis.js */ "../node_modules/d3-scale-chromatic/src/sequential-multi/cividis.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateCividis", function() { return _sequential_multi_cividis_js__WEBPACK_IMPORTED_MODULE_37__["default"]; });

/* harmony import */ var _sequential_multi_cubehelix_js__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! ./sequential-multi/cubehelix.js */ "../node_modules/d3-scale-chromatic/src/sequential-multi/cubehelix.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateCubehelixDefault", function() { return _sequential_multi_cubehelix_js__WEBPACK_IMPORTED_MODULE_38__["default"]; });

/* harmony import */ var _sequential_multi_rainbow_js__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! ./sequential-multi/rainbow.js */ "../node_modules/d3-scale-chromatic/src/sequential-multi/rainbow.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateRainbow", function() { return _sequential_multi_rainbow_js__WEBPACK_IMPORTED_MODULE_39__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateWarm", function() { return _sequential_multi_rainbow_js__WEBPACK_IMPORTED_MODULE_39__["warm"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateCool", function() { return _sequential_multi_rainbow_js__WEBPACK_IMPORTED_MODULE_39__["cool"]; });

/* harmony import */ var _sequential_multi_sinebow_js__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! ./sequential-multi/sinebow.js */ "../node_modules/d3-scale-chromatic/src/sequential-multi/sinebow.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateSinebow", function() { return _sequential_multi_sinebow_js__WEBPACK_IMPORTED_MODULE_40__["default"]; });

/* harmony import */ var _sequential_multi_turbo_js__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(/*! ./sequential-multi/turbo.js */ "../node_modules/d3-scale-chromatic/src/sequential-multi/turbo.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateTurbo", function() { return _sequential_multi_turbo_js__WEBPACK_IMPORTED_MODULE_41__["default"]; });

/* harmony import */ var _sequential_multi_viridis_js__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(/*! ./sequential-multi/viridis.js */ "../node_modules/d3-scale-chromatic/src/sequential-multi/viridis.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateViridis", function() { return _sequential_multi_viridis_js__WEBPACK_IMPORTED_MODULE_42__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateMagma", function() { return _sequential_multi_viridis_js__WEBPACK_IMPORTED_MODULE_42__["magma"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolateInferno", function() { return _sequential_multi_viridis_js__WEBPACK_IMPORTED_MODULE_42__["inferno"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interpolatePlasma", function() { return _sequential_multi_viridis_js__WEBPACK_IMPORTED_MODULE_42__["plasma"]; });














































/***/ }),

/***/ "../node_modules/d3-scale-chromatic/src/ramp.js":
/*!******************************************************!*\
  !*** ../node_modules/d3-scale-chromatic/src/ramp.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var d3_interpolate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-interpolate */ "../node_modules/d3-interpolate/src/index.js");


/* harmony default export */ __webpack_exports__["default"] = (function(scheme) {
  return Object(d3_interpolate__WEBPACK_IMPORTED_MODULE_0__["interpolateRgbBasis"])(scheme[scheme.length - 1]);
});


/***/ }),

/***/ "../node_modules/d3-scale-chromatic/src/sequential-multi/BuGn.js":
/*!***********************************************************************!*\
  !*** ../node_modules/d3-scale-chromatic/src/sequential-multi/BuGn.js ***!
  \***********************************************************************/
/*! exports provided: scheme, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scheme", function() { return scheme; });
/* harmony import */ var _colors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../colors.js */ "../node_modules/d3-scale-chromatic/src/colors.js");
/* harmony import */ var _ramp_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ramp.js */ "../node_modules/d3-scale-chromatic/src/ramp.js");



var scheme = new Array(3).concat(
  "e5f5f999d8c92ca25f",
  "edf8fbb2e2e266c2a4238b45",
  "edf8fbb2e2e266c2a42ca25f006d2c",
  "edf8fbccece699d8c966c2a42ca25f006d2c",
  "edf8fbccece699d8c966c2a441ae76238b45005824",
  "f7fcfde5f5f9ccece699d8c966c2a441ae76238b45005824",
  "f7fcfde5f5f9ccece699d8c966c2a441ae76238b45006d2c00441b"
).map(_colors_js__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (Object(_ramp_js__WEBPACK_IMPORTED_MODULE_1__["default"])(scheme));


/***/ }),

/***/ "../node_modules/d3-scale-chromatic/src/sequential-multi/BuPu.js":
/*!***********************************************************************!*\
  !*** ../node_modules/d3-scale-chromatic/src/sequential-multi/BuPu.js ***!
  \***********************************************************************/
/*! exports provided: scheme, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scheme", function() { return scheme; });
/* harmony import */ var _colors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../colors.js */ "../node_modules/d3-scale-chromatic/src/colors.js");
/* harmony import */ var _ramp_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ramp.js */ "../node_modules/d3-scale-chromatic/src/ramp.js");



var scheme = new Array(3).concat(
  "e0ecf49ebcda8856a7",
  "edf8fbb3cde38c96c688419d",
  "edf8fbb3cde38c96c68856a7810f7c",
  "edf8fbbfd3e69ebcda8c96c68856a7810f7c",
  "edf8fbbfd3e69ebcda8c96c68c6bb188419d6e016b",
  "f7fcfde0ecf4bfd3e69ebcda8c96c68c6bb188419d6e016b",
  "f7fcfde0ecf4bfd3e69ebcda8c96c68c6bb188419d810f7c4d004b"
).map(_colors_js__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (Object(_ramp_js__WEBPACK_IMPORTED_MODULE_1__["default"])(scheme));


/***/ }),

/***/ "../node_modules/d3-scale-chromatic/src/sequential-multi/GnBu.js":
/*!***********************************************************************!*\
  !*** ../node_modules/d3-scale-chromatic/src/sequential-multi/GnBu.js ***!
  \***********************************************************************/
/*! exports provided: scheme, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scheme", function() { return scheme; });
/* harmony import */ var _colors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../colors.js */ "../node_modules/d3-scale-chromatic/src/colors.js");
/* harmony import */ var _ramp_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ramp.js */ "../node_modules/d3-scale-chromatic/src/ramp.js");



var scheme = new Array(3).concat(
  "e0f3dba8ddb543a2ca",
  "f0f9e8bae4bc7bccc42b8cbe",
  "f0f9e8bae4bc7bccc443a2ca0868ac",
  "f0f9e8ccebc5a8ddb57bccc443a2ca0868ac",
  "f0f9e8ccebc5a8ddb57bccc44eb3d32b8cbe08589e",
  "f7fcf0e0f3dbccebc5a8ddb57bccc44eb3d32b8cbe08589e",
  "f7fcf0e0f3dbccebc5a8ddb57bccc44eb3d32b8cbe0868ac084081"
).map(_colors_js__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (Object(_ramp_js__WEBPACK_IMPORTED_MODULE_1__["default"])(scheme));


/***/ }),

/***/ "../node_modules/d3-scale-chromatic/src/sequential-multi/OrRd.js":
/*!***********************************************************************!*\
  !*** ../node_modules/d3-scale-chromatic/src/sequential-multi/OrRd.js ***!
  \***********************************************************************/
/*! exports provided: scheme, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scheme", function() { return scheme; });
/* harmony import */ var _colors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../colors.js */ "../node_modules/d3-scale-chromatic/src/colors.js");
/* harmony import */ var _ramp_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ramp.js */ "../node_modules/d3-scale-chromatic/src/ramp.js");



var scheme = new Array(3).concat(
  "fee8c8fdbb84e34a33",
  "fef0d9fdcc8afc8d59d7301f",
  "fef0d9fdcc8afc8d59e34a33b30000",
  "fef0d9fdd49efdbb84fc8d59e34a33b30000",
  "fef0d9fdd49efdbb84fc8d59ef6548d7301f990000",
  "fff7ecfee8c8fdd49efdbb84fc8d59ef6548d7301f990000",
  "fff7ecfee8c8fdd49efdbb84fc8d59ef6548d7301fb300007f0000"
).map(_colors_js__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (Object(_ramp_js__WEBPACK_IMPORTED_MODULE_1__["default"])(scheme));


/***/ }),

/***/ "../node_modules/d3-scale-chromatic/src/sequential-multi/PuBu.js":
/*!***********************************************************************!*\
  !*** ../node_modules/d3-scale-chromatic/src/sequential-multi/PuBu.js ***!
  \***********************************************************************/
/*! exports provided: scheme, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scheme", function() { return scheme; });
/* harmony import */ var _colors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../colors.js */ "../node_modules/d3-scale-chromatic/src/colors.js");
/* harmony import */ var _ramp_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ramp.js */ "../node_modules/d3-scale-chromatic/src/ramp.js");



var scheme = new Array(3).concat(
  "ece7f2a6bddb2b8cbe",
  "f1eef6bdc9e174a9cf0570b0",
  "f1eef6bdc9e174a9cf2b8cbe045a8d",
  "f1eef6d0d1e6a6bddb74a9cf2b8cbe045a8d",
  "f1eef6d0d1e6a6bddb74a9cf3690c00570b0034e7b",
  "fff7fbece7f2d0d1e6a6bddb74a9cf3690c00570b0034e7b",
  "fff7fbece7f2d0d1e6a6bddb74a9cf3690c00570b0045a8d023858"
).map(_colors_js__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (Object(_ramp_js__WEBPACK_IMPORTED_MODULE_1__["default"])(scheme));


/***/ }),

/***/ "../node_modules/d3-scale-chromatic/src/sequential-multi/PuBuGn.js":
/*!*************************************************************************!*\
  !*** ../node_modules/d3-scale-chromatic/src/sequential-multi/PuBuGn.js ***!
  \*************************************************************************/
/*! exports provided: scheme, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scheme", function() { return scheme; });
/* harmony import */ var _colors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../colors.js */ "../node_modules/d3-scale-chromatic/src/colors.js");
/* harmony import */ var _ramp_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ramp.js */ "../node_modules/d3-scale-chromatic/src/ramp.js");



var scheme = new Array(3).concat(
  "ece2f0a6bddb1c9099",
  "f6eff7bdc9e167a9cf02818a",
  "f6eff7bdc9e167a9cf1c9099016c59",
  "f6eff7d0d1e6a6bddb67a9cf1c9099016c59",
  "f6eff7d0d1e6a6bddb67a9cf3690c002818a016450",
  "fff7fbece2f0d0d1e6a6bddb67a9cf3690c002818a016450",
  "fff7fbece2f0d0d1e6a6bddb67a9cf3690c002818a016c59014636"
).map(_colors_js__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (Object(_ramp_js__WEBPACK_IMPORTED_MODULE_1__["default"])(scheme));


/***/ }),

/***/ "../node_modules/d3-scale-chromatic/src/sequential-multi/PuRd.js":
/*!***********************************************************************!*\
  !*** ../node_modules/d3-scale-chromatic/src/sequential-multi/PuRd.js ***!
  \***********************************************************************/
/*! exports provided: scheme, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scheme", function() { return scheme; });
/* harmony import */ var _colors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../colors.js */ "../node_modules/d3-scale-chromatic/src/colors.js");
/* harmony import */ var _ramp_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ramp.js */ "../node_modules/d3-scale-chromatic/src/ramp.js");



var scheme = new Array(3).concat(
  "e7e1efc994c7dd1c77",
  "f1eef6d7b5d8df65b0ce1256",
  "f1eef6d7b5d8df65b0dd1c77980043",
  "f1eef6d4b9dac994c7df65b0dd1c77980043",
  "f1eef6d4b9dac994c7df65b0e7298ace125691003f",
  "f7f4f9e7e1efd4b9dac994c7df65b0e7298ace125691003f",
  "f7f4f9e7e1efd4b9dac994c7df65b0e7298ace125698004367001f"
).map(_colors_js__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (Object(_ramp_js__WEBPACK_IMPORTED_MODULE_1__["default"])(scheme));


/***/ }),

/***/ "../node_modules/d3-scale-chromatic/src/sequential-multi/RdPu.js":
/*!***********************************************************************!*\
  !*** ../node_modules/d3-scale-chromatic/src/sequential-multi/RdPu.js ***!
  \***********************************************************************/
/*! exports provided: scheme, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scheme", function() { return scheme; });
/* harmony import */ var _colors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../colors.js */ "../node_modules/d3-scale-chromatic/src/colors.js");
/* harmony import */ var _ramp_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ramp.js */ "../node_modules/d3-scale-chromatic/src/ramp.js");



var scheme = new Array(3).concat(
  "fde0ddfa9fb5c51b8a",
  "feebe2fbb4b9f768a1ae017e",
  "feebe2fbb4b9f768a1c51b8a7a0177",
  "feebe2fcc5c0fa9fb5f768a1c51b8a7a0177",
  "feebe2fcc5c0fa9fb5f768a1dd3497ae017e7a0177",
  "fff7f3fde0ddfcc5c0fa9fb5f768a1dd3497ae017e7a0177",
  "fff7f3fde0ddfcc5c0fa9fb5f768a1dd3497ae017e7a017749006a"
).map(_colors_js__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (Object(_ramp_js__WEBPACK_IMPORTED_MODULE_1__["default"])(scheme));


/***/ }),

/***/ "../node_modules/d3-scale-chromatic/src/sequential-multi/YlGn.js":
/*!***********************************************************************!*\
  !*** ../node_modules/d3-scale-chromatic/src/sequential-multi/YlGn.js ***!
  \***********************************************************************/
/*! exports provided: scheme, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scheme", function() { return scheme; });
/* harmony import */ var _colors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../colors.js */ "../node_modules/d3-scale-chromatic/src/colors.js");
/* harmony import */ var _ramp_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ramp.js */ "../node_modules/d3-scale-chromatic/src/ramp.js");



var scheme = new Array(3).concat(
  "f7fcb9addd8e31a354",
  "ffffccc2e69978c679238443",
  "ffffccc2e69978c67931a354006837",
  "ffffccd9f0a3addd8e78c67931a354006837",
  "ffffccd9f0a3addd8e78c67941ab5d238443005a32",
  "ffffe5f7fcb9d9f0a3addd8e78c67941ab5d238443005a32",
  "ffffe5f7fcb9d9f0a3addd8e78c67941ab5d238443006837004529"
).map(_colors_js__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (Object(_ramp_js__WEBPACK_IMPORTED_MODULE_1__["default"])(scheme));


/***/ }),

/***/ "../node_modules/d3-scale-chromatic/src/sequential-multi/YlGnBu.js":
/*!*************************************************************************!*\
  !*** ../node_modules/d3-scale-chromatic/src/sequential-multi/YlGnBu.js ***!
  \*************************************************************************/
/*! exports provided: scheme, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scheme", function() { return scheme; });
/* harmony import */ var _colors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../colors.js */ "../node_modules/d3-scale-chromatic/src/colors.js");
/* harmony import */ var _ramp_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ramp.js */ "../node_modules/d3-scale-chromatic/src/ramp.js");



var scheme = new Array(3).concat(
  "edf8b17fcdbb2c7fb8",
  "ffffcca1dab441b6c4225ea8",
  "ffffcca1dab441b6c42c7fb8253494",
  "ffffccc7e9b47fcdbb41b6c42c7fb8253494",
  "ffffccc7e9b47fcdbb41b6c41d91c0225ea80c2c84",
  "ffffd9edf8b1c7e9b47fcdbb41b6c41d91c0225ea80c2c84",
  "ffffd9edf8b1c7e9b47fcdbb41b6c41d91c0225ea8253494081d58"
).map(_colors_js__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (Object(_ramp_js__WEBPACK_IMPORTED_MODULE_1__["default"])(scheme));


/***/ }),

/***/ "../node_modules/d3-scale-chromatic/src/sequential-multi/YlOrBr.js":
/*!*************************************************************************!*\
  !*** ../node_modules/d3-scale-chromatic/src/sequential-multi/YlOrBr.js ***!
  \*************************************************************************/
/*! exports provided: scheme, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scheme", function() { return scheme; });
/* harmony import */ var _colors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../colors.js */ "../node_modules/d3-scale-chromatic/src/colors.js");
/* harmony import */ var _ramp_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ramp.js */ "../node_modules/d3-scale-chromatic/src/ramp.js");



var scheme = new Array(3).concat(
  "fff7bcfec44fd95f0e",
  "ffffd4fed98efe9929cc4c02",
  "ffffd4fed98efe9929d95f0e993404",
  "ffffd4fee391fec44ffe9929d95f0e993404",
  "ffffd4fee391fec44ffe9929ec7014cc4c028c2d04",
  "ffffe5fff7bcfee391fec44ffe9929ec7014cc4c028c2d04",
  "ffffe5fff7bcfee391fec44ffe9929ec7014cc4c02993404662506"
).map(_colors_js__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (Object(_ramp_js__WEBPACK_IMPORTED_MODULE_1__["default"])(scheme));


/***/ }),

/***/ "../node_modules/d3-scale-chromatic/src/sequential-multi/YlOrRd.js":
/*!*************************************************************************!*\
  !*** ../node_modules/d3-scale-chromatic/src/sequential-multi/YlOrRd.js ***!
  \*************************************************************************/
/*! exports provided: scheme, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scheme", function() { return scheme; });
/* harmony import */ var _colors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../colors.js */ "../node_modules/d3-scale-chromatic/src/colors.js");
/* harmony import */ var _ramp_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ramp.js */ "../node_modules/d3-scale-chromatic/src/ramp.js");



var scheme = new Array(3).concat(
  "ffeda0feb24cf03b20",
  "ffffb2fecc5cfd8d3ce31a1c",
  "ffffb2fecc5cfd8d3cf03b20bd0026",
  "ffffb2fed976feb24cfd8d3cf03b20bd0026",
  "ffffb2fed976feb24cfd8d3cfc4e2ae31a1cb10026",
  "ffffccffeda0fed976feb24cfd8d3cfc4e2ae31a1cb10026",
  "ffffccffeda0fed976feb24cfd8d3cfc4e2ae31a1cbd0026800026"
).map(_colors_js__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (Object(_ramp_js__WEBPACK_IMPORTED_MODULE_1__["default"])(scheme));


/***/ }),

/***/ "../node_modules/d3-scale-chromatic/src/sequential-multi/cividis.js":
/*!**************************************************************************!*\
  !*** ../node_modules/d3-scale-chromatic/src/sequential-multi/cividis.js ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function(t) {
  t = Math.max(0, Math.min(1, t));
  return "rgb("
      + Math.max(0, Math.min(255, Math.round(-4.54 - t * (35.34 - t * (2381.73 - t * (6402.7 - t * (7024.72 - t * 2710.57))))))) + ", "
      + Math.max(0, Math.min(255, Math.round(32.49 + t * (170.73 + t * (52.82 - t * (131.46 - t * (176.58 - t * 67.37))))))) + ", "
      + Math.max(0, Math.min(255, Math.round(81.24 + t * (442.36 - t * (2482.43 - t * (6167.24 - t * (6614.94 - t * 2475.67)))))))
      + ")";
});


/***/ }),

/***/ "../node_modules/d3-scale-chromatic/src/sequential-multi/cubehelix.js":
/*!****************************************************************************!*\
  !*** ../node_modules/d3-scale-chromatic/src/sequential-multi/cubehelix.js ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var d3_color__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-color */ "../node_modules/d3-color/src/index.js");
/* harmony import */ var d3_interpolate__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-interpolate */ "../node_modules/d3-interpolate/src/index.js");



/* harmony default export */ __webpack_exports__["default"] = (Object(d3_interpolate__WEBPACK_IMPORTED_MODULE_1__["interpolateCubehelixLong"])(Object(d3_color__WEBPACK_IMPORTED_MODULE_0__["cubehelix"])(300, 0.5, 0.0), Object(d3_color__WEBPACK_IMPORTED_MODULE_0__["cubehelix"])(-240, 0.5, 1.0)));


/***/ }),

/***/ "../node_modules/d3-scale-chromatic/src/sequential-multi/rainbow.js":
/*!**************************************************************************!*\
  !*** ../node_modules/d3-scale-chromatic/src/sequential-multi/rainbow.js ***!
  \**************************************************************************/
/*! exports provided: warm, cool, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "warm", function() { return warm; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cool", function() { return cool; });
/* harmony import */ var d3_color__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-color */ "../node_modules/d3-color/src/index.js");
/* harmony import */ var d3_interpolate__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-interpolate */ "../node_modules/d3-interpolate/src/index.js");



var warm = Object(d3_interpolate__WEBPACK_IMPORTED_MODULE_1__["interpolateCubehelixLong"])(Object(d3_color__WEBPACK_IMPORTED_MODULE_0__["cubehelix"])(-100, 0.75, 0.35), Object(d3_color__WEBPACK_IMPORTED_MODULE_0__["cubehelix"])(80, 1.50, 0.8));

var cool = Object(d3_interpolate__WEBPACK_IMPORTED_MODULE_1__["interpolateCubehelixLong"])(Object(d3_color__WEBPACK_IMPORTED_MODULE_0__["cubehelix"])(260, 0.75, 0.35), Object(d3_color__WEBPACK_IMPORTED_MODULE_0__["cubehelix"])(80, 1.50, 0.8));

var c = Object(d3_color__WEBPACK_IMPORTED_MODULE_0__["cubehelix"])();

/* harmony default export */ __webpack_exports__["default"] = (function(t) {
  if (t < 0 || t > 1) t -= Math.floor(t);
  var ts = Math.abs(t - 0.5);
  c.h = 360 * t - 100;
  c.s = 1.5 - 1.5 * ts;
  c.l = 0.8 - 0.9 * ts;
  return c + "";
});


/***/ }),

/***/ "../node_modules/d3-scale-chromatic/src/sequential-multi/sinebow.js":
/*!**************************************************************************!*\
  !*** ../node_modules/d3-scale-chromatic/src/sequential-multi/sinebow.js ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var d3_color__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-color */ "../node_modules/d3-color/src/index.js");


var c = Object(d3_color__WEBPACK_IMPORTED_MODULE_0__["rgb"])(),
    pi_1_3 = Math.PI / 3,
    pi_2_3 = Math.PI * 2 / 3;

/* harmony default export */ __webpack_exports__["default"] = (function(t) {
  var x;
  t = (0.5 - t) * Math.PI;
  c.r = 255 * (x = Math.sin(t)) * x;
  c.g = 255 * (x = Math.sin(t + pi_1_3)) * x;
  c.b = 255 * (x = Math.sin(t + pi_2_3)) * x;
  return c + "";
});


/***/ }),

/***/ "../node_modules/d3-scale-chromatic/src/sequential-multi/turbo.js":
/*!************************************************************************!*\
  !*** ../node_modules/d3-scale-chromatic/src/sequential-multi/turbo.js ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function(t) {
  t = Math.max(0, Math.min(1, t));
  return "rgb("
      + Math.max(0, Math.min(255, Math.round(34.61 + t * (1172.33 - t * (10793.56 - t * (33300.12 - t * (38394.49 - t * 14825.05))))))) + ", "
      + Math.max(0, Math.min(255, Math.round(23.31 + t * (557.33 + t * (1225.33 - t * (3574.96 - t * (1073.77 + t * 707.56))))))) + ", "
      + Math.max(0, Math.min(255, Math.round(27.2 + t * (3211.1 - t * (15327.97 - t * (27814 - t * (22569.18 - t * 6838.66)))))))
      + ")";
});


/***/ }),

/***/ "../node_modules/d3-scale-chromatic/src/sequential-multi/viridis.js":
/*!**************************************************************************!*\
  !*** ../node_modules/d3-scale-chromatic/src/sequential-multi/viridis.js ***!
  \**************************************************************************/
/*! exports provided: default, magma, inferno, plasma */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "magma", function() { return magma; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "inferno", function() { return inferno; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "plasma", function() { return plasma; });
/* harmony import */ var _colors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../colors.js */ "../node_modules/d3-scale-chromatic/src/colors.js");


function ramp(range) {
  var n = range.length;
  return function(t) {
    return range[Math.max(0, Math.min(n - 1, Math.floor(t * n)))];
  };
}

/* harmony default export */ __webpack_exports__["default"] = (ramp(Object(_colors_js__WEBPACK_IMPORTED_MODULE_0__["default"])("44015444025645045745055946075a46085c460a5d460b5e470d60470e6147106347116447136548146748166848176948186a481a6c481b6d481c6e481d6f481f70482071482173482374482475482576482677482878482979472a7a472c7a472d7b472e7c472f7d46307e46327e46337f463480453581453781453882443983443a83443b84433d84433e85423f854240864241864142874144874045884046883f47883f48893e49893e4a893e4c8a3d4d8a3d4e8a3c4f8a3c508b3b518b3b528b3a538b3a548c39558c39568c38588c38598c375a8c375b8d365c8d365d8d355e8d355f8d34608d34618d33628d33638d32648e32658e31668e31678e31688e30698e306a8e2f6b8e2f6c8e2e6d8e2e6e8e2e6f8e2d708e2d718e2c718e2c728e2c738e2b748e2b758e2a768e2a778e2a788e29798e297a8e297b8e287c8e287d8e277e8e277f8e27808e26818e26828e26828e25838e25848e25858e24868e24878e23888e23898e238a8d228b8d228c8d228d8d218e8d218f8d21908d21918c20928c20928c20938c1f948c1f958b1f968b1f978b1f988b1f998a1f9a8a1e9b8a1e9c891e9d891f9e891f9f881fa0881fa1881fa1871fa28720a38620a48621a58521a68522a78522a88423a98324aa8325ab8225ac8226ad8127ad8128ae8029af7f2ab07f2cb17e2db27d2eb37c2fb47c31b57b32b67a34b67935b77937b87838b9773aba763bbb753dbc743fbc7340bd7242be7144bf7046c06f48c16e4ac16d4cc26c4ec36b50c46a52c56954c56856c66758c7655ac8645cc8635ec96260ca6063cb5f65cb5e67cc5c69cd5b6ccd5a6ece5870cf5773d05675d05477d1537ad1517cd2507fd34e81d34d84d44b86d54989d5488bd6468ed64590d74393d74195d84098d83e9bd93c9dd93ba0da39a2da37a5db36a8db34aadc32addc30b0dd2fb2dd2db5de2bb8de29bade28bddf26c0df25c2df23c5e021c8e020cae11fcde11dd0e11cd2e21bd5e21ad8e219dae319dde318dfe318e2e418e5e419e7e419eae51aece51befe51cf1e51df4e61ef6e620f8e621fbe723fde725")));

var magma = ramp(Object(_colors_js__WEBPACK_IMPORTED_MODULE_0__["default"])("00000401000501010601010802010902020b02020d03030f03031204041405041606051806051a07061c08071e0907200a08220b09240c09260d0a290e0b2b100b2d110c2f120d31130d34140e36150e38160f3b180f3d19103f1a10421c10441d11471e114920114b21114e22115024125325125527125829115a2a115c2c115f2d11612f116331116533106734106936106b38106c390f6e3b0f703d0f713f0f72400f74420f75440f764510774710784910784a10794c117a4e117b4f127b51127c52137c54137d56147d57157e59157e5a167e5c167f5d177f5f187f601880621980641a80651a80671b80681c816a1c816b1d816d1d816e1e81701f81721f817320817521817621817822817922827b23827c23827e24828025828125818326818426818627818827818928818b29818c29818e2a81902a81912b81932b80942c80962c80982d80992d809b2e7f9c2e7f9e2f7fa02f7fa1307ea3307ea5317ea6317da8327daa337dab337cad347cae347bb0357bb2357bb3367ab5367ab73779b83779ba3878bc3978bd3977bf3a77c03a76c23b75c43c75c53c74c73d73c83e73ca3e72cc3f71cd4071cf4070d0416fd2426fd3436ed5446dd6456cd8456cd9466bdb476adc4869de4968df4a68e04c67e24d66e34e65e44f64e55064e75263e85362e95462ea5661eb5760ec5860ed5a5fee5b5eef5d5ef05f5ef1605df2625df2645cf3655cf4675cf4695cf56b5cf66c5cf66e5cf7705cf7725cf8745cf8765cf9785df9795df97b5dfa7d5efa7f5efa815ffb835ffb8560fb8761fc8961fc8a62fc8c63fc8e64fc9065fd9266fd9467fd9668fd9869fd9a6afd9b6bfe9d6cfe9f6dfea16efea36ffea571fea772fea973feaa74feac76feae77feb078feb27afeb47bfeb67cfeb77efeb97ffebb81febd82febf84fec185fec287fec488fec68afec88cfeca8dfecc8ffecd90fecf92fed194fed395fed597fed799fed89afdda9cfddc9efddea0fde0a1fde2a3fde3a5fde5a7fde7a9fde9aafdebacfcecaefceeb0fcf0b2fcf2b4fcf4b6fcf6b8fcf7b9fcf9bbfcfbbdfcfdbf"));

var inferno = ramp(Object(_colors_js__WEBPACK_IMPORTED_MODULE_0__["default"])("00000401000501010601010802010a02020c02020e03021004031204031405041706041907051b08051d09061f0a07220b07240c08260d08290e092b10092d110a30120a32140b34150b37160b39180c3c190c3e1b0c411c0c431e0c451f0c48210c4a230c4c240c4f260c51280b53290b552b0b572d0b592f0a5b310a5c320a5e340a5f3609613809623909633b09643d09653e0966400a67420a68440a68450a69470b6a490b6a4a0c6b4c0c6b4d0d6c4f0d6c510e6c520e6d540f6d550f6d57106e59106e5a116e5c126e5d126e5f136e61136e62146e64156e65156e67166e69166e6a176e6c186e6d186e6f196e71196e721a6e741a6e751b6e771c6d781c6d7a1d6d7c1d6d7d1e6d7f1e6c801f6c82206c84206b85216b87216b88226a8a226a8c23698d23698f24699025689225689326679526679727669827669a28659b29649d29649f2a63a02a63a22b62a32c61a52c60a62d60a82e5fa92e5eab2f5ead305dae305cb0315bb1325ab3325ab43359b63458b73557b93556ba3655bc3754bd3853bf3952c03a51c13a50c33b4fc43c4ec63d4dc73e4cc83f4bca404acb4149cc4248ce4347cf4446d04545d24644d34743d44842d54a41d74b3fd84c3ed94d3dda4e3cdb503bdd513ade5238df5337e05536e15635e25734e35933e45a31e55c30e65d2fe75e2ee8602de9612bea632aeb6429eb6628ec6726ed6925ee6a24ef6c23ef6e21f06f20f1711ff1731df2741cf3761bf37819f47918f57b17f57d15f67e14f68013f78212f78410f8850ff8870ef8890cf98b0bf98c0af98e09fa9008fa9207fa9407fb9606fb9706fb9906fb9b06fb9d07fc9f07fca108fca309fca50afca60cfca80dfcaa0ffcac11fcae12fcb014fcb216fcb418fbb61afbb81dfbba1ffbbc21fbbe23fac026fac228fac42afac62df9c72ff9c932f9cb35f8cd37f8cf3af7d13df7d340f6d543f6d746f5d949f5db4cf4dd4ff4df53f4e156f3e35af3e55df2e661f2e865f2ea69f1ec6df1ed71f1ef75f1f179f2f27df2f482f3f586f3f68af4f88ef5f992f6fa96f8fb9af9fc9dfafda1fcffa4"));

var plasma = ramp(Object(_colors_js__WEBPACK_IMPORTED_MODULE_0__["default"])("0d088710078813078916078a19068c1b068d1d068e20068f2206902406912605912805922a05932c05942e05952f059631059733059735049837049938049a3a049a3c049b3e049c3f049c41049d43039e44039e46039f48039f4903a04b03a14c02a14e02a25002a25102a35302a35502a45601a45801a45901a55b01a55c01a65e01a66001a66100a76300a76400a76600a76700a86900a86a00a86c00a86e00a86f00a87100a87201a87401a87501a87701a87801a87a02a87b02a87d03a87e03a88004a88104a78305a78405a78606a68707a68808a68a09a58b0aa58d0ba58e0ca48f0da4910ea3920fa39410a29511a19613a19814a099159f9a169f9c179e9d189d9e199da01a9ca11b9ba21d9aa31e9aa51f99a62098a72197a82296aa2395ab2494ac2694ad2793ae2892b02991b12a90b22b8fb32c8eb42e8db52f8cb6308bb7318ab83289ba3388bb3488bc3587bd3786be3885bf3984c03a83c13b82c23c81c33d80c43e7fc5407ec6417dc7427cc8437bc9447aca457acb4679cc4778cc4977cd4a76ce4b75cf4c74d04d73d14e72d24f71d35171d45270d5536fd5546ed6556dd7566cd8576bd9586ada5a6ada5b69db5c68dc5d67dd5e66de5f65de6164df6263e06363e16462e26561e26660e3685fe4695ee56a5de56b5de66c5ce76e5be76f5ae87059e97158e97257ea7457eb7556eb7655ec7754ed7953ed7a52ee7b51ef7c51ef7e50f07f4ff0804ef1814df1834cf2844bf3854bf3874af48849f48948f58b47f58c46f68d45f68f44f79044f79143f79342f89441f89540f9973ff9983ef99a3efa9b3dfa9c3cfa9e3bfb9f3afba139fba238fca338fca537fca636fca835fca934fdab33fdac33fdae32fdaf31fdb130fdb22ffdb42ffdb52efeb72dfeb82cfeba2cfebb2bfebd2afebe2afec029fdc229fdc328fdc527fdc627fdc827fdca26fdcb26fccd25fcce25fcd025fcd225fbd324fbd524fbd724fad824fada24f9dc24f9dd25f8df25f8e125f7e225f7e425f6e626f6e826f5e926f5eb27f4ed27f3ee27f3f027f2f227f1f426f1f525f0f724f0f921"));


/***/ }),

/***/ "../node_modules/d3-scale-chromatic/src/sequential-single/Blues.js":
/*!*************************************************************************!*\
  !*** ../node_modules/d3-scale-chromatic/src/sequential-single/Blues.js ***!
  \*************************************************************************/
/*! exports provided: scheme, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scheme", function() { return scheme; });
/* harmony import */ var _colors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../colors.js */ "../node_modules/d3-scale-chromatic/src/colors.js");
/* harmony import */ var _ramp_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ramp.js */ "../node_modules/d3-scale-chromatic/src/ramp.js");



var scheme = new Array(3).concat(
  "deebf79ecae13182bd",
  "eff3ffbdd7e76baed62171b5",
  "eff3ffbdd7e76baed63182bd08519c",
  "eff3ffc6dbef9ecae16baed63182bd08519c",
  "eff3ffc6dbef9ecae16baed64292c62171b5084594",
  "f7fbffdeebf7c6dbef9ecae16baed64292c62171b5084594",
  "f7fbffdeebf7c6dbef9ecae16baed64292c62171b508519c08306b"
).map(_colors_js__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (Object(_ramp_js__WEBPACK_IMPORTED_MODULE_1__["default"])(scheme));


/***/ }),

/***/ "../node_modules/d3-scale-chromatic/src/sequential-single/Greens.js":
/*!**************************************************************************!*\
  !*** ../node_modules/d3-scale-chromatic/src/sequential-single/Greens.js ***!
  \**************************************************************************/
/*! exports provided: scheme, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scheme", function() { return scheme; });
/* harmony import */ var _colors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../colors.js */ "../node_modules/d3-scale-chromatic/src/colors.js");
/* harmony import */ var _ramp_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ramp.js */ "../node_modules/d3-scale-chromatic/src/ramp.js");



var scheme = new Array(3).concat(
  "e5f5e0a1d99b31a354",
  "edf8e9bae4b374c476238b45",
  "edf8e9bae4b374c47631a354006d2c",
  "edf8e9c7e9c0a1d99b74c47631a354006d2c",
  "edf8e9c7e9c0a1d99b74c47641ab5d238b45005a32",
  "f7fcf5e5f5e0c7e9c0a1d99b74c47641ab5d238b45005a32",
  "f7fcf5e5f5e0c7e9c0a1d99b74c47641ab5d238b45006d2c00441b"
).map(_colors_js__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (Object(_ramp_js__WEBPACK_IMPORTED_MODULE_1__["default"])(scheme));


/***/ }),

/***/ "../node_modules/d3-scale-chromatic/src/sequential-single/Greys.js":
/*!*************************************************************************!*\
  !*** ../node_modules/d3-scale-chromatic/src/sequential-single/Greys.js ***!
  \*************************************************************************/
/*! exports provided: scheme, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scheme", function() { return scheme; });
/* harmony import */ var _colors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../colors.js */ "../node_modules/d3-scale-chromatic/src/colors.js");
/* harmony import */ var _ramp_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ramp.js */ "../node_modules/d3-scale-chromatic/src/ramp.js");



var scheme = new Array(3).concat(
  "f0f0f0bdbdbd636363",
  "f7f7f7cccccc969696525252",
  "f7f7f7cccccc969696636363252525",
  "f7f7f7d9d9d9bdbdbd969696636363252525",
  "f7f7f7d9d9d9bdbdbd969696737373525252252525",
  "fffffff0f0f0d9d9d9bdbdbd969696737373525252252525",
  "fffffff0f0f0d9d9d9bdbdbd969696737373525252252525000000"
).map(_colors_js__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (Object(_ramp_js__WEBPACK_IMPORTED_MODULE_1__["default"])(scheme));


/***/ }),

/***/ "../node_modules/d3-scale-chromatic/src/sequential-single/Oranges.js":
/*!***************************************************************************!*\
  !*** ../node_modules/d3-scale-chromatic/src/sequential-single/Oranges.js ***!
  \***************************************************************************/
/*! exports provided: scheme, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scheme", function() { return scheme; });
/* harmony import */ var _colors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../colors.js */ "../node_modules/d3-scale-chromatic/src/colors.js");
/* harmony import */ var _ramp_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ramp.js */ "../node_modules/d3-scale-chromatic/src/ramp.js");



var scheme = new Array(3).concat(
  "fee6cefdae6be6550d",
  "feeddefdbe85fd8d3cd94701",
  "feeddefdbe85fd8d3ce6550da63603",
  "feeddefdd0a2fdae6bfd8d3ce6550da63603",
  "feeddefdd0a2fdae6bfd8d3cf16913d948018c2d04",
  "fff5ebfee6cefdd0a2fdae6bfd8d3cf16913d948018c2d04",
  "fff5ebfee6cefdd0a2fdae6bfd8d3cf16913d94801a636037f2704"
).map(_colors_js__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (Object(_ramp_js__WEBPACK_IMPORTED_MODULE_1__["default"])(scheme));


/***/ }),

/***/ "../node_modules/d3-scale-chromatic/src/sequential-single/Purples.js":
/*!***************************************************************************!*\
  !*** ../node_modules/d3-scale-chromatic/src/sequential-single/Purples.js ***!
  \***************************************************************************/
/*! exports provided: scheme, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scheme", function() { return scheme; });
/* harmony import */ var _colors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../colors.js */ "../node_modules/d3-scale-chromatic/src/colors.js");
/* harmony import */ var _ramp_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ramp.js */ "../node_modules/d3-scale-chromatic/src/ramp.js");



var scheme = new Array(3).concat(
  "efedf5bcbddc756bb1",
  "f2f0f7cbc9e29e9ac86a51a3",
  "f2f0f7cbc9e29e9ac8756bb154278f",
  "f2f0f7dadaebbcbddc9e9ac8756bb154278f",
  "f2f0f7dadaebbcbddc9e9ac8807dba6a51a34a1486",
  "fcfbfdefedf5dadaebbcbddc9e9ac8807dba6a51a34a1486",
  "fcfbfdefedf5dadaebbcbddc9e9ac8807dba6a51a354278f3f007d"
).map(_colors_js__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (Object(_ramp_js__WEBPACK_IMPORTED_MODULE_1__["default"])(scheme));


/***/ }),

/***/ "../node_modules/d3-scale-chromatic/src/sequential-single/Reds.js":
/*!************************************************************************!*\
  !*** ../node_modules/d3-scale-chromatic/src/sequential-single/Reds.js ***!
  \************************************************************************/
/*! exports provided: scheme, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scheme", function() { return scheme; });
/* harmony import */ var _colors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../colors.js */ "../node_modules/d3-scale-chromatic/src/colors.js");
/* harmony import */ var _ramp_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ramp.js */ "../node_modules/d3-scale-chromatic/src/ramp.js");



var scheme = new Array(3).concat(
  "fee0d2fc9272de2d26",
  "fee5d9fcae91fb6a4acb181d",
  "fee5d9fcae91fb6a4ade2d26a50f15",
  "fee5d9fcbba1fc9272fb6a4ade2d26a50f15",
  "fee5d9fcbba1fc9272fb6a4aef3b2ccb181d99000d",
  "fff5f0fee0d2fcbba1fc9272fb6a4aef3b2ccb181d99000d",
  "fff5f0fee0d2fcbba1fc9272fb6a4aef3b2ccb181da50f1567000d"
).map(_colors_js__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (Object(_ramp_js__WEBPACK_IMPORTED_MODULE_1__["default"])(scheme));


/***/ }),

/***/ "./src/js/gridvizc/App.js":
/*!********************************!*\
  !*** ./src/js/gridvizc/App.js ***!
  \********************************/
/*! exports provided: App */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "App", function() { return App; });
/* harmony import */ var _CanvasGeo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CanvasGeo */ "./src/js/gridvizc/CanvasGeo.js");
/* harmony import */ var _Layer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Layer */ "./src/js/gridvizc/Layer.js");
/* harmony import */ var _Style__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Style */ "./src/js/gridvizc/Style.js");
/* harmony import */ var _Dataset__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Dataset */ "./src/js/gridvizc/Dataset.js");
/* harmony import */ var _dataset_CSVGrid__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./dataset/CSVGrid */ "./src/js/gridvizc/dataset/CSVGrid.js");
/* harmony import */ var _dataset_TiledGrid__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./dataset/TiledGrid */ "./src/js/gridvizc/dataset/TiledGrid.js");
//@ts-check









/**
 * A gridviz on a HTML canvas.
 * 
 * @author Julien Gaffuri
 */
class App {

    /**
     * @param {object} opts 
     */
    constructor(opts) {
        opts = opts || {};

        /**
         * The layers.
         * @type {Array.<Layer>}
         * */
         this.layers = [];

        //get canvas element
        opts.canvasId = opts.canvasId || "vacanvas";
        const canvas = document.getElementById(opts.canvasId);

        //set dimensions
        /** @type {number} */
        this.w = opts.w || canvas.offsetWidth;
        /** @type {number} */
        this.h = opts.h || canvas.offsetHeight;

        /** Background color.
         * @type {string} */
        this.backgroundColor_ = opts.backgroundColor || "white"


        /** Make geo canvas
         * @type {CanvasGeo} */
        this.cg = new _CanvasGeo__WEBPACK_IMPORTED_MODULE_0__["CanvasGeo"]();
        const th = this;
        this.cg.redraw = function () {

            //go through the list of layers and find the one(s) to draw
            for (const layer of th.layers) {

                //skip layer not within the zoom range
                if (layer.minZoom >= this.zf) continue;
                if (layer.maxZoom < this.zf) continue;

                //get data to show
                layer.dataset.getData(this.updateExtentGeo(), () => { th.draw(layer); });

                //draw cells
                th.draw(layer);
            }
            return this
        };

    }


    /**
     * Add a layer.
     * 
     * @param {Dataset} dataset The dataset to show
     * @param {Array.<Style>} styles The styles, ordered in drawing order.
     * @param {number} minZoom The minimum zoom level when to show the layer
     * @param {number} maxZoom The maximum zoom level when to show the layer
     * @returns {this}
     */
    addLayer(dataset, styles, minZoom, maxZoom) {
        this.layers.push(new _Layer__WEBPACK_IMPORTED_MODULE_1__["Layer"](dataset, styles, minZoom, maxZoom));
        return this;
    }

    /**
     * Add a layer from a tiled grid dataset.
     * 
     * @param {string} url The url of the dataset info.json file.
     * @param {Array.<Style>} styles The styles, ordered in drawing order.
     * @param {number} minZoom The minimum zoom level when to show the layer
     * @param {number} maxZoom The maximum zoom level when to show the layer
     * @param {function(Cell):void} preprocess A preprocess to run on each cell after loading. It can be used to apply some specific treatment before or compute a new column.
     * @returns {this}
     */
    addTiledGrid(url, styles, minZoom, maxZoom, preprocess = null) {
        return this.addLayer(
            new _dataset_TiledGrid__WEBPACK_IMPORTED_MODULE_5__["TiledGrid"](url, this, preprocess).loadInfo(() => { this.cg.redraw(); }),
            styles, minZoom, maxZoom
        )
    }


    /**
     * Add a layer from a CSV grid dataset.
     * 
     * @param {string} url The url of the dataset.
     * @param {number} resolution The dataset resolution (in geographical unit).
     * @param {Array.<Style>} styles The styles, ordered in drawing order.
     * @param {number} minZoom The minimum zoom level when to show the layer
     * @param {number} maxZoom The maximum zoom level when to show the layer
     * @param {function(Cell):void} preprocess A preprocess to run on each cell after loading. It can be used to apply some specific treatment before or compute a new column.
     * @returns {this}
     */
    addCSVGrid(url, resolution, styles, minZoom, maxZoom, preprocess = null) {
        return this.addLayer(
            new _dataset_CSVGrid__WEBPACK_IMPORTED_MODULE_4__["CSVGrid"](url, resolution, preprocess).getData(null, () => { this.cg.redraw(); }),
            styles, minZoom, maxZoom
        )
    }


    /**
     * Draw a layer.
     * 
     * @param {Layer} layer 
     * @returns {this}
     */
    draw(layer) {

        //get cells to draw
        const cells = layer.dataset.getCells(this.cg.extGeo)

        //clear
        this.cg.clear(this.backgroundColor_);

        //draw cells, style by style
        for (const style of layer.styles)
            style.draw(cells, layer.dataset.resolution, this.cg)
        
        return this;
    }


    /**
     * Set viewer position.
     * 
     * @param {{x:number,y:number}=} pos 
     * @returns {this|{x:number,y:number}}
     */
    geoCenter(pos) {
        if (pos) {
            this.cg.center = pos;
            return this;
        }
        return this.cg.center;
    }

    /**
     * Set viewer zoom level (ground pixel size).
     * 
     * @param {number=} zf
     * @returns {this|number}
     */
     zoomFactor(zf) {
        if (zf) {
            this.cg.zf = zf;
            return this;
        }
        return this.cg.zf;
    }

    /**
     * Set viewer zoom level (ground pixel size).
     * 
     * @param {string=} backgroundColor 
     * @returns {this|string}
     */
     backgroundColor(backgroundColor) {
        if (backgroundColor) {
            this.backgroundColor_ = backgroundColor;
            return this;
        }
        return this.backgroundColor_;
    }

}


/***/ }),

/***/ "./src/js/gridvizc/CanvasGeo.js":
/*!**************************************!*\
  !*** ./src/js/gridvizc/CanvasGeo.js ***!
  \**************************************/
/*! exports provided: CanvasGeo */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CanvasGeo", function() { return CanvasGeo; });
//@ts-check
/** @typedef { {xMin: number, xMax: number, yMin: number, yMax: number} } Envelope */

/**
 * A HTML canvas, enhanced with zoom and pan capabilities.
 * 
 * @author Julien Gaffuri
 */
class CanvasGeo {

    /**
     * @constructor
     * @param {string} canvasId
     * @param {Object} center
     * @param {number} zf
     */
    constructor(canvasId = "vacanvas", center = undefined, zf = 1) {

        /** @type {*} */
        this.canvas = document.getElementById(canvasId);

        /** @type {number} */
        this.w = this.canvas.offsetWidth;
        /** @type {number} */
        this.h = this.canvas.offsetHeight;

        this.canvas.width = this.w;
        this.canvas.height = this.h;

        /**@type {Object} */
        this.ctx = this.canvas.getContext("2d");

        // geo coordinates of the center
        /** @type {{x:number,y:number}} */
        this.center = center || { x: this.w * 0.5, y: this.h * 0.5 }

        // zoom factor: pixel size, in m/pix
        /** @type {number} */
        this.zf = zf;

        //extent
        /** @type {{xMin: number, xMax: number, yMin: number, yMax: number}} */
        this.extGeo = undefined;
        this.updateExtentGeo()

        //mouse click - pan
        let mpan = false
        this.canvas.addEventListener("mousedown", e => { mpan = true });
        this.canvas.addEventListener("mousemove", e => {
            if (mpan) this.pan(-e.movementX * this.zf, e.movementY * this.zf)
        });
        this.canvas.addEventListener("mouseup", e => { mpan = false });

        //mouse wheel - zoom
        const f = 1.5
        this.canvas.addEventListener("wheel", e => {
            const f_ = e.deltaY > 0 ? f : 1 / f;
            this.zoom(f_, this.pixToGeoX(e.offsetX), this.pixToGeoY(e.offsetY))
        });

    }

    /**
     */
    redraw() {
        throw new Error('Method redraw not implemented.');
    }

    /**
     * Clear the app screen.
     * To be used before a redraw for example.
     * @param {*} color 
     */
    clear(color="white") {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(0, 0, this.w, this.h);
    }

    //conversion functions
    /**
     * @param {number} xGeo
     * @returns {number}
    */
    geoToPixX(xGeo) { return (xGeo - this.center.x) / this.zf + this.w * 0.5; }
    /**
     * @param {number} yGeo
     * @returns {number}
    */
    geoToPixY(yGeo) { return -(yGeo - this.center.y) / this.zf + this.h * 0.5; }
    /**
     * @param {number} x
     * @returns {number}
    */
    pixToGeoX(x) { return (x - this.w * 0.5) * this.zf + this.center.x; }
    /**
     * @param {number} y
     * @returns {number}
    */
    pixToGeoY(y) { return -(y - this.h * 0.5) * this.zf + this.center.y; }

    /**
     * @param {number} dxGeo
     * @param {number} dyGeo
     */
    pan(dxGeo, dyGeo) {
        this.center.x += dxGeo;
        this.center.y += dyGeo;
        this.updateExtentGeo()
        this.redraw();
    }

    /**
     * @param {number} f
     * @param {number} xGeo
     * @param {number} yGeo
     */
    zoom(f = 1, xGeo = this.center.x, yGeo = this.center.y) {
        this.zf *= f;
        this.center.x += (xGeo - this.center.x) * (1 - f)
        this.center.y += (yGeo - this.center.y) * (1 - f)
        this.updateExtentGeo()
        this.redraw();
    }

    /**
     * @param {number} marginPx 
     * @returns {Envelope}
     */
    updateExtentGeo(marginPx = 20) {
        this.extGeo = {
            xMin: this.pixToGeoX(-marginPx),
            xMax: this.pixToGeoX(this.w + marginPx),
            yMin: this.pixToGeoY(this.h + marginPx),
            yMax: this.pixToGeoY(-marginPx)
        }
        return this.extGeo;
    }

    /**
     * Check if the object has to be drawn
     * 
     * @param {{x:number,y:number}} obj 
     */
    toDraw(obj) {
        if (obj.x < this.extGeo.xMin) return false;
        if (obj.x > this.extGeo.xMax) return false;
        if (obj.y < this.extGeo.yMin) return false;
        if (obj.y > this.extGeo.yMax) return false;
        return true
    }
}


/***/ }),

/***/ "./src/js/gridvizc/Dataset.js":
/*!************************************!*\
  !*** ./src/js/gridvizc/Dataset.js ***!
  \************************************/
/*! exports provided: Dataset */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Dataset", function() { return Dataset; });
//@ts-check

/** @typedef { {xMin: number, xMax: number, yMin: number, yMax: number} } Envelope */
/** @typedef {{x: number, y: number}} Cell */

/**
 * A dataset of grid cells.
 * 
 * @abstract
 * 
 * @author Julien Gaffuri
 */
class Dataset {

    /**
     * @param {string} url The url of the dataset.
     * @param {number} resolution The dataset resolution (in geographical unit).
     * @param {function(Cell):void} preprocess A preprocess to run on each cell after loading. It can be used to apply some specific treatment before or compute a new column.
     * @abstract
     */
    constructor(url, resolution, preprocess = null) {

        /** @type {string} */
        this.url = url;

        /** @type {number} */
        this.resolution = resolution;

        /** @type {function(Cell):void} */
        this.preprocess = preprocess;
    }


    /**
     * Request data within a geographic envelope.
     * 
     * @param {Envelope} extGeo 
     * @param {function():void} callback 
     * @returns {this}
     * @abstract
     */
    getData(extGeo, callback) {
        throw new Error('Method getData not implemented.');
    }

    /**
     * @param {Envelope} extGeo 
     * @returns {Array.<Cell>}
     * @abstract
     */
    getCells(extGeo) {
        throw new Error('Method getCells not implemented.');
    }

}


/***/ }),

/***/ "./src/js/gridvizc/Layer.js":
/*!**********************************!*\
  !*** ./src/js/gridvizc/Layer.js ***!
  \**********************************/
/*! exports provided: Layer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Layer", function() { return Layer; });
/* harmony import */ var _Dataset__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Dataset */ "./src/js/gridvizc/Dataset.js");
/* harmony import */ var _Style__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Style */ "./src/js/gridvizc/Style.js");
//@ts-check




/**
 * A data layer, which specifies a dataset to be shown within a specified zoom range, with a specified style.
 * 
 * @author Julien Gaffuri
 */
class Layer {

    /**
     * @param {Dataset} dataset The dataset to show
     * @param {Array.<Style>} styles The styles, ordered in drawing order.
     * @param {number} minZoom The minimum zoom level when to show the layer
     * @param {number} maxZoom The maximum zoom level when to show the layer
     */
    constructor(dataset, styles, minZoom, maxZoom) {

        /** @type {Dataset} */
        this.dataset = dataset;
        /** @type {Array.<Style>} */
        this.styles = styles;
        /** @type {number} */
        this.minZoom = minZoom;
        /** @type {number} */
        this.maxZoom = maxZoom;

    }

}


/***/ }),

/***/ "./src/js/gridvizc/Style.js":
/*!**********************************!*\
  !*** ./src/js/gridvizc/Style.js ***!
  \**********************************/
/*! exports provided: Style */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Style", function() { return Style; });
/* harmony import */ var _Dataset__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Dataset */ "./src/js/gridvizc/Dataset.js");
/* harmony import */ var _CanvasGeo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CanvasGeo */ "./src/js/gridvizc/CanvasGeo.js");
//@ts-check



/** Definition of a cell size parameter.
 * val: The function returning the size of a cell.
 * unit: The unit of the size value, either in pixel ("pix") or in geographical unit ("geo").
 * @typedef {{val: function(Cell):number, unit: "pix"|"geo"}} Size */

/**
 * A style, to show a grid dataset.
 * 
 * @abstract
 * 
 * @author Julien Gaffuri
 */
class Style {

    /**
     * @abstract
     */
    constructor() {

        /** An offset. This is to alter the position of all symbols in a given direction. In geographical unit.
         * @type {{dx:number,dy:number}} */
        this.offset_ = { dx: 0, dy: 0 };


        //the cell stroke

        /** The zoom factor limit when to show/hide the stroke.
         * @type {number} */
        this.zfStroke_ = undefined;

        /** The stroke color.
         * @type {string} */
        this.strokeColor_ = "lightgray";

        /** The stroke line width, in pixels.
         * @type {number} */
        this.strokeWidth_ = 1.5;

    }


    /**
     * Draw cells.
     * 
     * @param {Array.<Cell>} cells The cells to draw.
     * @param {number} resolution Their resolution (in geographic unit)
     * @param {CanvasGeo} cg The canvas where to draw them.
     * @abstract
     */
    draw(cells, resolution, cg) {
        throw new Error('Method draw not implemented.');
    }


    /**
    * The offset
    * This is to alter the position of all symbols in a given direction. In geographical unit.
    * 
    * @param {{dx:number,dy:number}} offset 
    * @returns {this|{dx:number,dy:number}}
    */
    offset(offset) {
        if (offset) {
            this.offset_ = offset;
            return this;
        }
        return this.offset_;
    }
    /**
     * The zoom limit when to show/hide the stroke.
     * 
     * @param {number} zfStroke 
     * @returns {this|number}
     */
    zfStroke(zfStroke) {
        if (zfStroke) {
            this.zfStroke_ = zfStroke;
            return this;
        }
        return this.zfStroke_;
    }

    /**
     * The stroke color.
     * 
     * @param {string} strokeColor 
     * @returns {this|string}
     */
    strokeColor(strokeColor) {
        if (strokeColor) {
            this.strokeColor_ = strokeColor;
            return this;
        }
        return this.strokeColor_;
    }

    /**
     * The stroke line width, in pixels.
     * 
     * @param {number} strokeWidth 
     * @returns {this|number}
     */
    strokeWidth(strokeWidth) {
        if (strokeWidth) {
            this.strokeWidth_ = strokeWidth;
            return this;
        }
        return this.strokeWidth_;
    }




    /**
     * Draw the stroke of the cells, as rectangle, only for detailled zoom levels when the cells are quite big.
     * 
     * @param {Cell} cell The cell to draw the stroke of.
     * @param {number} resolution Their resolution (in geographic unit)
     * @param {CanvasGeo} cg The canvas where to draw them.
     * @param {function(Cell):string} shape The shape of the stroke.
     * @param {Size} size A function returning the size of a cell (in geographical unit).
     * @returns 
     */
    drawStroke(cell, resolution, cg, shape, size) {
        if (!this.zfStroke_ || cg.zf > this.zfStroke_) return;

        cg.ctx.strokeStyle = this.strokeColor_;
        cg.ctx.lineWidth = this.strokeWidth_;

        //size
        /** @type {number} */
        size = size || { val: c => resolution, unit: "geo" };
        //size - in pixel and geo
        const sP = size.unit === "pix" ? size.val(cell) : size.val(cell) / cg.zf
        const sG = cg.zf * sP;

        const shape_ = shape(cell);
        if (shape_ === "square") {
            //draw square
            const d = resolution * (1 - sG / resolution) * 0.5
            cg.ctx.beginPath();
            cg.ctx.rect(
                cg.geoToPixX(cell.x + d + this.offset_.dx),
                cg.geoToPixY(cell.y + resolution - d + this.offset_.dy),
                sP, sP);
            cg.ctx.stroke();

        } else if (shape_ === "circle") {
            //draw circle
            cg.ctx.beginPath();
            cg.ctx.arc(
                cg.geoToPixX(cell.x + resolution * 0.5 + this.offset_.dx),
                cg.geoToPixY(cell.y + resolution * 0.5 + this.offset_.dy),
                sP * 0.5,
                0, 2 * Math.PI, false);
            cg.ctx.stroke();
        }
    }

}


/***/ }),

/***/ "./src/js/gridvizc/dataset/CSVGrid.js":
/*!********************************************!*\
  !*** ./src/js/gridvizc/dataset/CSVGrid.js ***!
  \********************************************/
/*! exports provided: CSVGrid */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CSVGrid", function() { return CSVGrid; });
/* harmony import */ var d3_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-fetch */ "../node_modules/d3-fetch/src/index.js");
/* harmony import */ var _Dataset__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Dataset */ "./src/js/gridvizc/Dataset.js");
//@ts-check
/** @typedef {{ dims: object, crs: string, tileSizeCell: number, originPoint: {x:number,y:number}, resolutionGeo: number, tilingBounds:Envelope }} GridInfo */




/**
 * A dataset composed of a single CSV file (not tiled).
 * 
 * @author Julien Gaffuri
 */
class CSVGrid extends _Dataset__WEBPACK_IMPORTED_MODULE_1__["Dataset"] {

    /**
     * @param {string} url The url of the dataset.
     * @param {number} resolution The dataset resolution (in geographical unit).
     * @param {function(Cell):void} preprocess A preprocess to run on each cell after loading. It can be used to apply some specific treatment before or compute a new column.
     */
    constructor(url, resolution, preprocess = null) {
        super(url, resolution, preprocess)

        /** @type {Array.<Cell>} */
        this.cells = undefined;
    }


    /**
     * Request data within a geographic envelope.
     * 
     * @param {Envelope} e 
     * @param {function():void} redraw 
     */
    getData(e, redraw) {

        //TODO ensure it is not loading twice ?

        //check if data already loaded
        if(this.cells) return this;

        //load data
        Object(d3_fetch__WEBPACK_IMPORTED_MODULE_0__["csv"])(this.url)
        .then(
            /** @param {*} data */
            (data) => {
                //convert coordinates in numbers
                for (const c of data) { c.x=+c.x; c.y=+c.y; }

                this.cells = data;

                //execute preprocess, if any
                if(this.preprocess) for (const c of this.cells) this.preprocess(c);

                //TODO check if redraw is necessary
                //that is if the dataset belongs to a layer which is visible at the current zoom level

                //execute the callback, usually a draw function
                if(redraw) redraw()
            })
        .catch(() => {
            //mark as failed
            this.cells = []
        });

        return this;
    }


    /**
     * Get all cells from cache which are within a geographical envelope.
     * 
     * @param {Envelope} extGeo 
     * @returns {Array.<Cell>}
     */
    getCells(extGeo) {

        //data not loaded yet
        if(!this.cells) return [];

        /** @type {Array.<Cell>} */
        let cells = []
        for (const cell of this.cells) {
            if(+cell.x + this.resolution < extGeo.xMin) continue;
            if(+cell.x - this.resolution > extGeo.xMax) continue;
            if(+cell.y + this.resolution < extGeo.yMin) continue;
            if(+cell.y - this.resolution > extGeo.yMax) continue;
            cells.push(cell)
        }

        return cells;
    }

}


/***/ }),

/***/ "./src/js/gridvizc/dataset/GridTile.js":
/*!*********************************************!*\
  !*** ./src/js/gridvizc/dataset/GridTile.js ***!
  \*********************************************/
/*! exports provided: GridTile */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GridTile", function() { return GridTile; });
/* harmony import */ var _Dataset__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Dataset */ "./src/js/gridvizc/Dataset.js");
/* harmony import */ var _TiledGrid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TiledGrid */ "./src/js/gridvizc/dataset/TiledGrid.js");
//@ts-check




/**
 * A grid tile.
 * 
 * @author Julien Gaffuri
 */
class GridTile {

    /**
     * @param {Array.<Cell>} cells The tile cells.
     * @param {number} xT The X position of the tile.
     * @param {number} yT The Y position of the tile.
     * @param {GridInfo} gridInfo The grid info object.
     */
    constructor(cells, xT, yT, gridInfo) {

        /** @type {Array.<Cell>} */
        this.cells = cells;
        /** @type {number} */
        this.x = xT
        /** @type {number} */
        this.y = yT

        const r = gridInfo.resolutionGeo;
        const s = gridInfo.tileSizeCell;

        /** @type {import("../Dataset").Envelope} */
        this.extGeo = {
            xMin: gridInfo.originPoint.x + r * s * this.x,
            xMax: gridInfo.originPoint.x + r * s * (this.x + 1),
            yMin: gridInfo.originPoint.y + r * s * this.y,
            yMax: gridInfo.originPoint.y + r * s * (this.y + 1)
        }

        //convert cell coordinates into geographical coordinates
        for (let cell of this.cells) {
            cell.x = this.extGeo.xMin + cell.x * r;
            cell.y = this.extGeo.yMin + cell.y * r;
        }
    }

}


/***/ }),

/***/ "./src/js/gridvizc/dataset/TiledGrid.js":
/*!**********************************************!*\
  !*** ./src/js/gridvizc/dataset/TiledGrid.js ***!
  \**********************************************/
/*! exports provided: TiledGrid */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TiledGrid", function() { return TiledGrid; });
/* harmony import */ var d3_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-fetch */ "../node_modules/d3-fetch/src/index.js");
/* harmony import */ var _GridTile__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./GridTile */ "./src/js/gridvizc/dataset/GridTile.js");
/* harmony import */ var _App__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../App */ "./src/js/gridvizc/App.js");
/* harmony import */ var _Dataset__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Dataset */ "./src/js/gridvizc/Dataset.js");
//@ts-check
/** @typedef {{ dims: object, crs: string, tileSizeCell: number, originPoint: {x:number,y:number}, resolutionGeo: number, tilingBounds:Envelope }} GridInfo */






/**
 * A tiled dataset, composed of CSV tiles.
 * 
 * @author Julien Gaffuri
 */
class TiledGrid extends _Dataset__WEBPACK_IMPORTED_MODULE_3__["Dataset"] {

    /**
     * @param {string} url The url of the dataset info.json file.
     * @param {App} app The app.
     * @param {function(Cell):void} preprocess A preprocess to run on each cell after loading. It can be used to apply some specific treatment before or compute a new column.
     */
    constructor(url, app, preprocess = null) {
        super(url, undefined, preprocess)

        /** 
         * The cache of the loaded tiles. It is double indexed: by xT and then yT.
         * Example: this.cache[xT][yT] returns the tile at [xT][yT] location.
         * 
         * @type {Object}
         * */
        this.cache = {}

        /**
         * The grid info object, from the info.json file.
         * 
         *  @type {GridInfo}
         *  */
        this.info = undefined;

        /**
         * The app being used.
         * 
         * @type {App}
         */
        this.app = app;
    }

    /**
     * Load the info.json from the url.
     * 
     * @param {function():void} callback
     * @returns this
     */
    loadInfo(callback) {
        if (!this.info)
            Object(d3_fetch__WEBPACK_IMPORTED_MODULE_0__["json"])(this.url + "/info.json").then(
                /** @param {*} data */
                (data) => {
                    this.info = data;
                    this.resolution = this.info.resolutionGeo;
                    if (callback) callback();
                }
            );
        else if (callback) callback();
        return this;
    }


    /**
     * Compute a tiling envelope from a geographical envelope.
     * This is the function to use to know which tiles to download for a geographical view.
     * 
     * @param {Envelope} e 
     * @returns {Envelope}
     */
    getTilingEnvelope(e) {
        const po = this.info.originPoint,
            r = this.info.resolutionGeo,
            s = this.info.tileSizeCell;

        return {
            xMin: Math.floor((e.xMin - po.x) / (r * s)),
            xMax: Math.floor((e.xMax - po.x) / (r * s)),
            yMin: Math.floor((e.yMin - po.y) / (r * s)),
            yMax: Math.floor((e.yMax - po.y) / (r * s))
        }
    }

    /**
     * Request data within a geographic envelope.
     * 
     * @param {Envelope} extGeo 
     * @param {function():void} redrawFun
     * @returns {this}
     */
    getData(extGeo, redrawFun) {

        //TODO empty cache when it gets too big ?

        //check if info has been loaded
        if (!this.info) return;

        //tiles within the scope
        /** @type {Envelope} */
        const tb = this.getTilingEnvelope(extGeo);

        //grid bounds
        /** @type {Envelope} */
        const gb = this.info.tilingBounds;

        for (let xT = Math.max(tb.xMin, gb.xMin); xT <= Math.min(tb.xMax, gb.xMax); xT++) {
            for (let yT = Math.max(tb.yMin, gb.yMin); yT <= Math.min(tb.yMax, gb.yMax); yT++) {

                //prepare cache
                if (!this.cache[xT]) this.cache[xT] = {};

                //check if tile exists in the cache
                /** @type {GridTile} */
                let tile = this.cache[xT][yT];
                if (tile) continue;

                //mark tile as loading
                this.cache[xT][yT] = "loading"

                //request tile
                Object(d3_fetch__WEBPACK_IMPORTED_MODULE_0__["csv"])(this.url + xT + "/" + yT + ".csv")
                    .then(
                        /** @param {*} data */
                        (data) => {
                            //store tile in cache
                            const tile_ = new _GridTile__WEBPACK_IMPORTED_MODULE_1__["GridTile"](data, xT, yT, this.info);
                            this.cache[xT][yT] = tile_;

                            //execute preprocess, if any
                            if (this.preprocess)
                                for (const c of tile_.cells)
                                    this.preprocess(c);


                            //if no redraw is specified, then leave
                            if (!redrawFun) return;

                            //check if redraw is really needed, that is if:

                            // 1. the dataset belongs to a layer which is visible at the current zoom level
                            let redraw = false;
                            for (const layer of this.app.layers) {
                                if (layer.dataset != this) continue;
                                if (layer.maxZoom < this.app.zoomFactor()) continue;
                                if (layer.minZoom > this.app.zoomFactor()) continue;
                                //found one layer. No need to seek more.
                                redraw = true;
                                break;
                            }
                            if (!redraw) return;

                            // 2. the tile is within the view, that is its geo envelope intersects the viewer geo envelope.
                            const env = this.app.cg.updateExtentGeo();
                            const envT = tile_.extGeo;
                            if(env.xMax <= envT.xMin) return;
                            if(env.xMin >= envT.xMax) return;
                            if(env.yMax <= envT.yMin) return;
                            if(env.yMin >= envT.yMax) return;

                            //redraw
                            redrawFun()
                        })
                    .catch(() => {
                        //mark as failed
                        this.cache[xT][yT] = "failed"
                    });
            }
        }
        return this;
    }


    /**
     * Get all cells from cache which are within a geographical envelope.
     * 
     * @param {Envelope} extGeo 
     * @returns {Array.<Cell>}
     */
    getCells(extGeo) {

        /** @type {Array.<Cell>} */
        let cells = []

        //check if info has been loaded
        if (!this.info) return cells;

        //tiles within the scope
        /** @type {Envelope} */
        const tb = this.getTilingEnvelope(extGeo);

        //grid bounds
        /** @type {Envelope} */
        const gb = this.info.tilingBounds;

        for (let xT = Math.max(tb.xMin, gb.xMin); xT <= Math.min(tb.xMax, gb.xMax); xT++) {
            if (!this.cache[xT]) continue;
            for (let yT = Math.max(tb.yMin, gb.yMin); yT <= Math.min(tb.yMax, gb.yMax); yT++) {

                //get tile
                /** @type {GridTile} */
                const tile = this.cache[xT][yT];
                if (!tile || typeof tile === "string") continue;

                //get cells
                cells = cells.concat(tile.cells)
            }
        }

        return cells;
    }

}


/***/ }),

/***/ "./src/js/gridvizc/index.js":
/*!**********************************!*\
  !*** ./src/js/gridvizc/index.js ***!
  \**********************************/
/*! exports provided: App, color, CSVGrid, TiledGrid, ShapeColorSizeStyle, LineStyle, CompositionStyle, SegmentStyle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "App", function() { return App; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "color", function() { return color; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CSVGrid", function() { return CSVGrid; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TiledGrid", function() { return TiledGrid; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShapeColorSizeStyle", function() { return ShapeColorSizeStyle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LineStyle", function() { return LineStyle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CompositionStyle", function() { return CompositionStyle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SegmentStyle", function() { return SegmentStyle; });
/* harmony import */ var _App__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./App */ "./src/js/gridvizc/App.js");
/* harmony import */ var d3_scale_chromatic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-scale-chromatic */ "../node_modules/d3-scale-chromatic/src/index.js");
/* harmony import */ var _dataset_CSVGrid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dataset/CSVGrid */ "./src/js/gridvizc/dataset/CSVGrid.js");
/* harmony import */ var _dataset_TiledGrid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dataset/TiledGrid */ "./src/js/gridvizc/dataset/TiledGrid.js");
/* harmony import */ var _style_ShapeColorSizeStyle__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./style/ShapeColorSizeStyle */ "./src/js/gridvizc/style/ShapeColorSizeStyle.js");
/* harmony import */ var _style_LineStyle__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./style/LineStyle */ "./src/js/gridvizc/style/LineStyle.js");
/* harmony import */ var _style_CompositionStyle__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./style/CompositionStyle */ "./src/js/gridvizc/style/CompositionStyle.js");
/* harmony import */ var _style_SegmentStyle__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./style/SegmentStyle */ "./src/js/gridvizc/style/SegmentStyle.js");
//@ts-check




const App = function (opts) {
    return new _App__WEBPACK_IMPORTED_MODULE_0__["App"](opts)
}




//export color (the entire d3 scale chromatic)
const color = function () {
    return d3_scale_chromatic__WEBPACK_IMPORTED_MODULE_1__
}




//export dataset types


const CSVGrid = function (url, resolution, preprocess = null) {
    return new _dataset_CSVGrid__WEBPACK_IMPORTED_MODULE_2__["CSVGrid"](url, resolution, preprocess)
}


const TiledGrid = function (url, preprocess = null) {
    return new _dataset_TiledGrid__WEBPACK_IMPORTED_MODULE_3__["TiledGrid"](url, preprocess)
}




//export styles


const ShapeColorSizeStyle = function (color_, size, shape) {
    return new _style_ShapeColorSizeStyle__WEBPACK_IMPORTED_MODULE_4__["ShapeColorSizeStyle"](color_, size, shape)
}


const LineStyle = function (height) {
    return new _style_LineStyle__WEBPACK_IMPORTED_MODULE_5__["LineStyle"](height)
}


const CompositionStyle = function (color_, type, size) {
    return new _style_CompositionStyle__WEBPACK_IMPORTED_MODULE_6__["CompositionStyle"](color_, type, size)
}


const SegmentStyle = function (orientation, color, length, width) {
    return new _style_SegmentStyle__WEBPACK_IMPORTED_MODULE_7__["SegmentStyle"](orientation, color, length, width)
}



/***/ }),

/***/ "./src/js/gridvizc/style/CompositionStyle.js":
/*!***************************************************!*\
  !*** ./src/js/gridvizc/style/CompositionStyle.js ***!
  \***************************************************/
/*! exports provided: CompositionStyle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CompositionStyle", function() { return CompositionStyle; });
/* harmony import */ var _Style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Style */ "./src/js/gridvizc/Style.js");
/* harmony import */ var _Dataset__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Dataset */ "./src/js/gridvizc/Dataset.js");
/* harmony import */ var _CanvasGeo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../CanvasGeo */ "./src/js/gridvizc/CanvasGeo.js");
//@ts-check





/**
 * A style showing the composition of a total in different categories, with different color hues.
 * It consists of a symbol with different parts, whose size reflect the proportion of the corresponding category.
 * 3 types of symbols are possible:
 * - Flag (square symbol, with decomposition into vertical stripes)
 * - Pie chart (circular symbol, with decomposition into angular sectors)
 * - Ring (circular symbol, with decomposition into concentric rings)
 * The symbol can be scaled depending on the cell importance.
 * 
 * @author Julien Gaffuri
 */
class CompositionStyle extends _Style__WEBPACK_IMPORTED_MODULE_0__["Style"] {

    /**
      * @param {Object} color The dictionary which give the color of each category.
      * @param {function(Cell):string} type A function returning the type of decomposition symbol of a cell: Among 'flag', 'piechart' and 'ring'
      * @param {Size} size A function returning the size of a cell (in geographical unit).
      */
    constructor(color, type = null, size = null) {
        super()

        //dictionnary column -> color
        /** @type {object} */
        this.color_ = color;

        /** @type {function(Cell):string} */
        this.type_ = type;

        /** @type {Size} */
        this.size_ = size;
    }


    /**
     * Draw cells as squares depending on their value.
     * 
     * @param {Array.<Cell>} cells 
     * @param {number} resolution 
     * @param {CanvasGeo} cg 
     */
    draw(cells, resolution, cg) {

        //if size is used, sort cells by size so that the biggest are drawn first
        if (this.size_)
            cells.sort((c1, c2) => (this.size_.val(c2) - this.size_.val(c1)));

        for (let cell of cells) {

            //compute total
            let total = 0;
            for (let column of Object.keys(this.color_))
                total += +cell[column]

            //size
            /** @type {Size} */
            let s_ = this.size_ || { val: c=>resolution, unit: "geo" };
            //size - in pixel and geo
            /** @type {number} */
            const sP = s_.unit === "pix" ? s_.val(cell) : s_.val(cell) / cg.zf
            /** @type {number} */
            const sG = cg.zf * sP;

            //get symbol type
            const type_ = this.type_ ? this.type_(cell) : "flag"

            //draw decomposition symbol
            let cumul = 0;
            const d = resolution * (1 - sG / resolution) * 0.5
            for (let [column, color] of Object.entries(this.color_)) {

                //set color
                cg.ctx.fillStyle = color;

                //compute share
                const share = cell[column] / total;

                //draw symbol part
                if (type_ === "flag") {
                    //draw flag vertical stripe
                    cg.ctx.fillRect(
                        cumul * sP + cg.geoToPixX(cell.x + d + this.offset_.dx),
                        cg.geoToPixY(cell.y + resolution - d + this.offset_.dy),
                        share * sP, sP);
                } else if (type_ === "piechart") {
                    //draw pie chart angular sector
                    const xc = cg.geoToPixX(cell.x + resolution * 0.5 + this.offset_.dx);
                    const yc = cg.geoToPixY(cell.y + resolution * 0.5 + this.offset_.dy);
                    cg.ctx.beginPath();
                    cg.ctx.moveTo(xc, yc);
                    cg.ctx.arc(xc, yc, sP * 0.5, cumul * 2 * Math.PI, (cumul + share) * 2 * Math.PI);
                    cg.ctx.lineTo(xc, yc);
                    cg.ctx.fill();
                } else if (type_ === "ring") {
                    //draw ring
                    //TODO need to compute radius properly ! Variation as rootsquare of share !
                    cg.ctx.beginPath();
                    cg.ctx.arc(
                        cg.geoToPixX(cell.x + resolution * 0.5 + this.offset_.dx),
                        cg.geoToPixY(cell.y + resolution * 0.5 + this.offset_.dy),
                        Math.sqrt(1 - cumul) * sP * 0.5,
                        0, 2 * Math.PI);
                    cg.ctx.fill();
                } else {
                    throw new Error('Unexpected symbol type:' + type_);
                }

                cumul += share;
            }

            //draw stroke
            this.drawStroke(cell, resolution, cg, (c) => {
                return (type_ === "flag") ? "square" : "circle"
            }, this.size_)
        }

    }


    /**
     * @param {object} color 
     * @returns {this|object}
     */
    color(color) {
        if (color) {
            this.color_ = color;
            return this
        }
        return this.color_
    }

    /**
     * @param {function(Cell):string} type 
     * @returns {this|function(Cell):string}
     */
    type(type) {
        if (type) {
            this.type_ = type;
            return this
        }
        return this.type_
    }

    /**
     * @param {Size} size 
     * @returns {this|Size}
     */
    size(size) {
        if (size) {
            this.size_ = size;
            return this
        }
        return this.size_
    }

}


/***/ }),

/***/ "./src/js/gridvizc/style/LineStyle.js":
/*!********************************************!*\
  !*** ./src/js/gridvizc/style/LineStyle.js ***!
  \********************************************/
/*! exports provided: LineStyle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LineStyle", function() { return LineStyle; });
/* harmony import */ var _Style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Style */ "./src/js/gridvizc/Style.js");
/* harmony import */ var _Dataset__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Dataset */ "./src/js/gridvizc/Dataset.js");
/* harmony import */ var _CanvasGeo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../CanvasGeo */ "./src/js/gridvizc/CanvasGeo.js");
//@ts-check





/**
 * 
 * @author Julien Gaffuri
 */
class LineStyle extends _Style__WEBPACK_IMPORTED_MODULE_0__["Style"] {

    /**
      * @param {Size} height A function returning the height of a cell.
      */
    constructor(height) {
        super()

        /** @type {Size} */
        this.height_ = height;

        /** @type {string} */
        this.lineColor_ = "gray"
        /** @type {number} */
        this.lineWidth_ = 1;
        /** @type {string} */
        this.fillColor_ = "rgba(192, 140, 89, 0.4)"
    }


    /**
     * Draw cells as squares depending on their value.
     * 
     * @param {Array.<Cell>} cells 
     * @param {number} r 
     * @param {CanvasGeo} cg 
     */
    draw(cells, r, cg) {

        //index cells by y and x
        /**  @type {object} */
        const ind = {};
        for (const cell of cells) {
            let row = ind[cell.y];
            if (!row) { row = {}; ind[cell.y] = row }
            row[cell.x] = this.height_.val(cell);
        }


        //compute extent
        const e = cg.extGeo;
        const xMin = Math.floor(e.xMin / r) * r;
        const xMax = Math.floor(e.xMax / r) * r;
        const yMin = Math.floor(e.yMin / r) * r;
        const yMax = Math.floor(e.yMax / r) * r;

        //set color and width
        cg.ctx.strokeStyle = this.lineColor_;
        cg.ctx.lineWidth = this.lineWidth_;
        cg.ctx.fillStyle = this.fillColor_;

        //draw lines, row by row, stating from the top
        for (let y = yMax; y >= yMin; y -= r) {

            //get row
            const row = ind[y]

            //no row
            if (!row) continue;

            //compute row baseline
            const yP = cg.geoToPixY(y);

            //place first point
            cg.ctx.beginPath();
            cg.ctx.moveTo(cg.geoToPixX(xMin - r / 2), yP);

            //store the previous height
            /** @type {number} */
            let hG_;

            //go through the line cells
            for (let x = xMin; x <= xMax; x += r) {

                //get column value
                /** @type {number} */
                let hG = row[x];
                if (!hG) hG = 0;

                if (hG || hG_) {
                    //draw line only when at least one of both values is non-null
                    //TODO test bezierCurveTo
                    const dyP = this.height_.unit==="pix" ? hG : hG / cg.zf
                    cg.ctx.lineTo(cg.geoToPixX(x + r / 2), yP - dyP);
                } else {
                    //else move the point
                    cg.ctx.moveTo(cg.geoToPixX(x + r / 2), yP);
                }
                //store the previous value
                hG_ = hG;
            }

            //last point
            if (hG_)
                cg.ctx.lineTo(cg.geoToPixX(xMax + r / 2), yP);

            //draw fill
            if (this.fillColor_)
                cg.ctx.fill()
            //draw line
            if (this.lineColor_ && this.lineWidth_ > 0)
                cg.ctx.stroke();

        }
    }



    /**
     * 
     * @param {Size} height 
     * @returns {this|Size}
     */
    height(height) {
        if (height) {
            this.height_ = height;
            return this;
        }
        return this.height_;
    }

    /**
     * 
     * @param {string} lineColor 
     * @returns {this|string}
     */
    lineColor(lineColor) {
        if (lineColor) {
            this.lineColor_ = lineColor;
            return this;
        }
        return this.lineColor_;
    }

    /**
     * 
     * @param {number} lineWidth 
     * @returns {this|number}
     */
    lineWidth(lineWidth) {
        if (lineWidth) {
            this.lineWidth_ = lineWidth;
            return this;
        }
        return this.lineWidth_;
    }

    /**
     * 
     * @param {string} fillColor 
     * @returns {this|string}
     */
    fillColor(fillColor) {
        if (fillColor) {
            this.fillColor_ = fillColor;
            return this;
        }
        return this.fillColor_;
    }

}


/***/ }),

/***/ "./src/js/gridvizc/style/SegmentStyle.js":
/*!***********************************************!*\
  !*** ./src/js/gridvizc/style/SegmentStyle.js ***!
  \***********************************************/
/*! exports provided: SegmentStyle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SegmentStyle", function() { return SegmentStyle; });
/* harmony import */ var _Style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Style */ "./src/js/gridvizc/Style.js");
/* harmony import */ var _Dataset__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Dataset */ "./src/js/gridvizc/Dataset.js");
/* harmony import */ var _CanvasGeo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../CanvasGeo */ "./src/js/gridvizc/CanvasGeo.js");
//@ts-check





/**
 * A style where each cell is represented by a segment whose length, width, color and orientation can vary according to statistical values.
 * 
 * @author Julien Gaffuri
 */
class SegmentStyle extends _Style__WEBPACK_IMPORTED_MODULE_0__["Style"] {

    /**
      * @param {function(Cell):number} orientation A function returning the orientation (in degrees) of the segment representing a cell.
      * @param {function(Cell):string} color A function returning the color of the segment representing a cell.
      * @param {Size} length A function returning the length of the segment representing a cell.
      * @param {Size} width A function returning the width of the segment representing a cell.
      */
    constructor(orientation, color, length, width) {
        super()

        /** @type {function(Cell):number} */
        this.orientation_ = orientation;
        /** @type {function(Cell):string} */
        this.color_ = color;
        /** @type {Size} */
        this.length_ = length;
        /** @type {Size} */
        this.width_ = width;

    }


    /**
     * Draw cells as segments.
     * 
     * @param {Array.<Cell>} cells 
     * @param {number} resolution 
     * @param {CanvasGeo} cg 
     */
    draw(cells, resolution, cg) {

        //conversion factor degree -> radian
        const f = Math.PI / 180;

        for (let c of cells) {

            //set width and color
            cg.ctx.lineWidth = this.width_.unit === "pix" ? this.width_.val(c) : this.width_.val(c) / cg.zf;
            cg.ctx.strokeStyle = this.color_(c);

            //get segment orientation (in radian) and length (in pixel)
            /** @type {number} */
            const or = this.orientation_(c) * f
            /** @type {number} */
            const len = this.length_.unit === "pix"? this.length_.val(c) : this.length_.val(c) / cg.zf

            //get segment center
            const cx = cg.geoToPixX(c.x + resolution / 2 + this.offset_.dx),
                cy = cg.geoToPixY(c.y + resolution / 2 + this.offset_.dy);

            //get direction
            const dx = 0.5 * Math.cos(or) * len,
                dy = 0.5 * Math.sin(or) * len;

            //draw segment
            cg.ctx.beginPath();
            cg.ctx.moveTo(cx - dx, cy - dy);
            cg.ctx.lineTo(cx + dx, cy + dy);
            cg.ctx.stroke();
        }

    }


    /**
     * @param {function(Cell):number} orientation 
     * @returns {this|function(Cell):number}
     */
    orientation(orientation) {
        if (orientation) {
            this.orientation_ = orientation;
            return this
        }
        return this.orientation_
    }

    /**
     * @param {function(Cell):string} color 
     * @returns {this|function(Cell):string}
     */
    color(color) {
        if (color) {
            this.color_ = color;
            return this
        }
        return this.color_
    }

    /**
     * @param {Size} length 
     * @returns {this|Size}
     */
    length(length) {
        if (length) {
            this.length_ = length;
            return this
        }
        return this.length_
    }

    /**
     * @param {Size} width 
     * @returns {this|Size}
     */
    width(width) {
        if (width) {
            this.width_ = width;
            return this
        }
        return this.width_
    }

}


/***/ }),

/***/ "./src/js/gridvizc/style/ShapeColorSizeStyle.js":
/*!******************************************************!*\
  !*** ./src/js/gridvizc/style/ShapeColorSizeStyle.js ***!
  \******************************************************/
/*! exports provided: ShapeColorSizeStyle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShapeColorSizeStyle", function() { return ShapeColorSizeStyle; });
/* harmony import */ var _Style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Style */ "./src/js/gridvizc/Style.js");
/* harmony import */ var _Dataset__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Dataset */ "./src/js/gridvizc/Dataset.js");
/* harmony import */ var _CanvasGeo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../CanvasGeo */ "./src/js/gridvizc/CanvasGeo.js");
//@ts-check





/** @typedef {"square"|"circle"} Shape */

/**
 * A very generic style that shows grid cells with specific color, size and shape.
 * It can be used to show variables as cell colors, cell size, cell shape, or any combination of the three visual variables.
 * 
 * @author Julien Gaffuri
 */
class ShapeColorSizeStyle extends _Style__WEBPACK_IMPORTED_MODULE_0__["Style"] {

    /**
      * @param {function(Cell):string} color A function returning the color of the cell.
      * @param {Size} size A function returning the size of a cell (in geographical unit).
      * @param {function(Cell):Shape} shape A function returning the shape of a cell.
      */
    constructor(color = () => "#EA6BAC", size = null, shape = () => "square") {
        super()

        /** @type {function(Cell):string} */
        this.color_ = color;

        /** @type {Size} */
        this.size_ = size;

        /** @type {function(Cell):Shape} */
        this.shape_ = shape;
    }


    /**
     * Draw cells as squares, with various colors and size.
     * 
     * @param {Array.<Cell>} cells 
     * @param {number} resolution 
     * @param {CanvasGeo} cg 
     */
    draw(cells, resolution, cg) {

        //if size is used, sort cells by size so that the biggest are drawn first
        if (this.size_)
            cells.sort((c1, c2) => (this.size_.val(c2) - this.size_.val(c1)));

        for (let cell of cells) {

            //color
            cg.ctx.fillStyle = this.color ? this.color_(cell) : "#EA6BAC";

            //size
            /** @type {Size} */
            let s_ = this.size_ || { val: c=>resolution, unit: "geo" };
            //size - in pixel and geo
            /** @type {number} */
            const sP = s_.unit === "pix" ? s_.val(cell) : s_.val(cell) / cg.zf
            /** @type {number} */
            const sG = cg.zf * sP;

            //get shape
            const shape = this.shape_ ? this.shape_(cell) : "square";
            if (shape === "square") {
                //draw square
                const d = resolution * (1 - sG / resolution) * 0.5
                cg.ctx.fillRect(
                    cg.geoToPixX(cell.x + d + this.offset_.dx),
                    cg.geoToPixY(cell.y + resolution - d + this.offset_.dy),
                    sP, sP);
            } else if (shape === "circle") {
                //draw circle
                cg.ctx.beginPath();
                cg.ctx.arc(
                    cg.geoToPixX(cell.x + resolution * 0.5 + this.offset_.dx),
                    cg.geoToPixY(cell.y + resolution * 0.5 + this.offset_.dy),
                    sP * 0.5,
                    0, 2 * Math.PI, false);
                cg.ctx.fill();
            } else {
                throw new Error('Unexpected shape:' + shape);
            }

            //draw stroke
            this.drawStroke(cell, resolution, cg, this.shape_, this.size_)
        }

    }



    /**
     * @param {function(Cell):string} color 
     * @returns {this|function(Cell):string}
     */
    color(color) {
        if (color) {
            this.color_ = color;
            return this
        }
        return this.color_
    }

    /**
     * @param {Size} size 
     * @returns {this|Size}
     */
    size(size) {
        if (size) {
            this.size_ = size;
            return this
        }
        return this.size_
    }

    /**
     * @param {function(Cell):Shape} shape 
     * @returns {this|function(Cell):Shape}
     */
    shape(shape) {
        if (shape) {
            this.shape_ = shape;
            return this
        }
        return this.shape_
    }

}


/***/ })

/******/ });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9ndml6L3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly9ndml6L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2d2aXovLi4vbm9kZV9tb2R1bGVzL2QzLWNvbG9yL3NyYy9jb2xvci5qcyIsIndlYnBhY2s6Ly9ndml6Ly4uL25vZGVfbW9kdWxlcy9kMy1jb2xvci9zcmMvY3ViZWhlbGl4LmpzIiwid2VicGFjazovL2d2aXovLi4vbm9kZV9tb2R1bGVzL2QzLWNvbG9yL3NyYy9kZWZpbmUuanMiLCJ3ZWJwYWNrOi8vZ3Zpei8uLi9ub2RlX21vZHVsZXMvZDMtY29sb3Ivc3JjL2luZGV4LmpzIiwid2VicGFjazovL2d2aXovLi4vbm9kZV9tb2R1bGVzL2QzLWNvbG9yL3NyYy9sYWIuanMiLCJ3ZWJwYWNrOi8vZ3Zpei8uLi9ub2RlX21vZHVsZXMvZDMtY29sb3Ivc3JjL21hdGguanMiLCJ3ZWJwYWNrOi8vZ3Zpei8uLi9ub2RlX21vZHVsZXMvZDMtZHN2L3NyYy9hdXRvVHlwZS5qcyIsIndlYnBhY2s6Ly9ndml6Ly4uL25vZGVfbW9kdWxlcy9kMy1kc3Yvc3JjL2Nzdi5qcyIsIndlYnBhY2s6Ly9ndml6Ly4uL25vZGVfbW9kdWxlcy9kMy1kc3Yvc3JjL2Rzdi5qcyIsIndlYnBhY2s6Ly9ndml6Ly4uL25vZGVfbW9kdWxlcy9kMy1kc3Yvc3JjL2luZGV4LmpzIiwid2VicGFjazovL2d2aXovLi4vbm9kZV9tb2R1bGVzL2QzLWRzdi9zcmMvdHN2LmpzIiwid2VicGFjazovL2d2aXovLi4vbm9kZV9tb2R1bGVzL2QzLWZldGNoL3NyYy9ibG9iLmpzIiwid2VicGFjazovL2d2aXovLi4vbm9kZV9tb2R1bGVzL2QzLWZldGNoL3NyYy9idWZmZXIuanMiLCJ3ZWJwYWNrOi8vZ3Zpei8uLi9ub2RlX21vZHVsZXMvZDMtZmV0Y2gvc3JjL2Rzdi5qcyIsIndlYnBhY2s6Ly9ndml6Ly4uL25vZGVfbW9kdWxlcy9kMy1mZXRjaC9zcmMvaW1hZ2UuanMiLCJ3ZWJwYWNrOi8vZ3Zpei8uLi9ub2RlX21vZHVsZXMvZDMtZmV0Y2gvc3JjL2luZGV4LmpzIiwid2VicGFjazovL2d2aXovLi4vbm9kZV9tb2R1bGVzL2QzLWZldGNoL3NyYy9qc29uLmpzIiwid2VicGFjazovL2d2aXovLi4vbm9kZV9tb2R1bGVzL2QzLWZldGNoL3NyYy90ZXh0LmpzIiwid2VicGFjazovL2d2aXovLi4vbm9kZV9tb2R1bGVzL2QzLWZldGNoL3NyYy94bWwuanMiLCJ3ZWJwYWNrOi8vZ3Zpei8uLi9ub2RlX21vZHVsZXMvZDMtaW50ZXJwb2xhdGUvc3JjL2FycmF5LmpzIiwid2VicGFjazovL2d2aXovLi4vbm9kZV9tb2R1bGVzL2QzLWludGVycG9sYXRlL3NyYy9iYXNpcy5qcyIsIndlYnBhY2s6Ly9ndml6Ly4uL25vZGVfbW9kdWxlcy9kMy1pbnRlcnBvbGF0ZS9zcmMvYmFzaXNDbG9zZWQuanMiLCJ3ZWJwYWNrOi8vZ3Zpei8uLi9ub2RlX21vZHVsZXMvZDMtaW50ZXJwb2xhdGUvc3JjL2NvbG9yLmpzIiwid2VicGFjazovL2d2aXovLi4vbm9kZV9tb2R1bGVzL2QzLWludGVycG9sYXRlL3NyYy9jb25zdGFudC5qcyIsIndlYnBhY2s6Ly9ndml6Ly4uL25vZGVfbW9kdWxlcy9kMy1pbnRlcnBvbGF0ZS9zcmMvY3ViZWhlbGl4LmpzIiwid2VicGFjazovL2d2aXovLi4vbm9kZV9tb2R1bGVzL2QzLWludGVycG9sYXRlL3NyYy9kYXRlLmpzIiwid2VicGFjazovL2d2aXovLi4vbm9kZV9tb2R1bGVzL2QzLWludGVycG9sYXRlL3NyYy9kaXNjcmV0ZS5qcyIsIndlYnBhY2s6Ly9ndml6Ly4uL25vZGVfbW9kdWxlcy9kMy1pbnRlcnBvbGF0ZS9zcmMvaGNsLmpzIiwid2VicGFjazovL2d2aXovLi4vbm9kZV9tb2R1bGVzL2QzLWludGVycG9sYXRlL3NyYy9oc2wuanMiLCJ3ZWJwYWNrOi8vZ3Zpei8uLi9ub2RlX21vZHVsZXMvZDMtaW50ZXJwb2xhdGUvc3JjL2h1ZS5qcyIsIndlYnBhY2s6Ly9ndml6Ly4uL25vZGVfbW9kdWxlcy9kMy1pbnRlcnBvbGF0ZS9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZ3Zpei8uLi9ub2RlX21vZHVsZXMvZDMtaW50ZXJwb2xhdGUvc3JjL2xhYi5qcyIsIndlYnBhY2s6Ly9ndml6Ly4uL25vZGVfbW9kdWxlcy9kMy1pbnRlcnBvbGF0ZS9zcmMvbnVtYmVyLmpzIiwid2VicGFjazovL2d2aXovLi4vbm9kZV9tb2R1bGVzL2QzLWludGVycG9sYXRlL3NyYy9udW1iZXJBcnJheS5qcyIsIndlYnBhY2s6Ly9ndml6Ly4uL25vZGVfbW9kdWxlcy9kMy1pbnRlcnBvbGF0ZS9zcmMvb2JqZWN0LmpzIiwid2VicGFjazovL2d2aXovLi4vbm9kZV9tb2R1bGVzL2QzLWludGVycG9sYXRlL3NyYy9waWVjZXdpc2UuanMiLCJ3ZWJwYWNrOi8vZ3Zpei8uLi9ub2RlX21vZHVsZXMvZDMtaW50ZXJwb2xhdGUvc3JjL3F1YW50aXplLmpzIiwid2VicGFjazovL2d2aXovLi4vbm9kZV9tb2R1bGVzL2QzLWludGVycG9sYXRlL3NyYy9yZ2IuanMiLCJ3ZWJwYWNrOi8vZ3Zpei8uLi9ub2RlX21vZHVsZXMvZDMtaW50ZXJwb2xhdGUvc3JjL3JvdW5kLmpzIiwid2VicGFjazovL2d2aXovLi4vbm9kZV9tb2R1bGVzL2QzLWludGVycG9sYXRlL3NyYy9zdHJpbmcuanMiLCJ3ZWJwYWNrOi8vZ3Zpei8uLi9ub2RlX21vZHVsZXMvZDMtaW50ZXJwb2xhdGUvc3JjL3RyYW5zZm9ybS9kZWNvbXBvc2UuanMiLCJ3ZWJwYWNrOi8vZ3Zpei8uLi9ub2RlX21vZHVsZXMvZDMtaW50ZXJwb2xhdGUvc3JjL3RyYW5zZm9ybS9pbmRleC5qcyIsIndlYnBhY2s6Ly9ndml6Ly4uL25vZGVfbW9kdWxlcy9kMy1pbnRlcnBvbGF0ZS9zcmMvdHJhbnNmb3JtL3BhcnNlLmpzIiwid2VicGFjazovL2d2aXovLi4vbm9kZV9tb2R1bGVzL2QzLWludGVycG9sYXRlL3NyYy92YWx1ZS5qcyIsIndlYnBhY2s6Ly9ndml6Ly4uL25vZGVfbW9kdWxlcy9kMy1pbnRlcnBvbGF0ZS9zcmMvem9vbS5qcyIsIndlYnBhY2s6Ly9ndml6Ly4uL25vZGVfbW9kdWxlcy9kMy1zY2FsZS1jaHJvbWF0aWMvc3JjL2NhdGVnb3JpY2FsL0FjY2VudC5qcyIsIndlYnBhY2s6Ly9ndml6Ly4uL25vZGVfbW9kdWxlcy9kMy1zY2FsZS1jaHJvbWF0aWMvc3JjL2NhdGVnb3JpY2FsL0RhcmsyLmpzIiwid2VicGFjazovL2d2aXovLi4vbm9kZV9tb2R1bGVzL2QzLXNjYWxlLWNocm9tYXRpYy9zcmMvY2F0ZWdvcmljYWwvUGFpcmVkLmpzIiwid2VicGFjazovL2d2aXovLi4vbm9kZV9tb2R1bGVzL2QzLXNjYWxlLWNocm9tYXRpYy9zcmMvY2F0ZWdvcmljYWwvUGFzdGVsMS5qcyIsIndlYnBhY2s6Ly9ndml6Ly4uL25vZGVfbW9kdWxlcy9kMy1zY2FsZS1jaHJvbWF0aWMvc3JjL2NhdGVnb3JpY2FsL1Bhc3RlbDIuanMiLCJ3ZWJwYWNrOi8vZ3Zpei8uLi9ub2RlX21vZHVsZXMvZDMtc2NhbGUtY2hyb21hdGljL3NyYy9jYXRlZ29yaWNhbC9TZXQxLmpzIiwid2VicGFjazovL2d2aXovLi4vbm9kZV9tb2R1bGVzL2QzLXNjYWxlLWNocm9tYXRpYy9zcmMvY2F0ZWdvcmljYWwvU2V0Mi5qcyIsIndlYnBhY2s6Ly9ndml6Ly4uL25vZGVfbW9kdWxlcy9kMy1zY2FsZS1jaHJvbWF0aWMvc3JjL2NhdGVnb3JpY2FsL1NldDMuanMiLCJ3ZWJwYWNrOi8vZ3Zpei8uLi9ub2RlX21vZHVsZXMvZDMtc2NhbGUtY2hyb21hdGljL3NyYy9jYXRlZ29yaWNhbC9UYWJsZWF1MTAuanMiLCJ3ZWJwYWNrOi8vZ3Zpei8uLi9ub2RlX21vZHVsZXMvZDMtc2NhbGUtY2hyb21hdGljL3NyYy9jYXRlZ29yaWNhbC9jYXRlZ29yeTEwLmpzIiwid2VicGFjazovL2d2aXovLi4vbm9kZV9tb2R1bGVzL2QzLXNjYWxlLWNocm9tYXRpYy9zcmMvY29sb3JzLmpzIiwid2VicGFjazovL2d2aXovLi4vbm9kZV9tb2R1bGVzL2QzLXNjYWxlLWNocm9tYXRpYy9zcmMvZGl2ZXJnaW5nL0JyQkcuanMiLCJ3ZWJwYWNrOi8vZ3Zpei8uLi9ub2RlX21vZHVsZXMvZDMtc2NhbGUtY2hyb21hdGljL3NyYy9kaXZlcmdpbmcvUFJHbi5qcyIsIndlYnBhY2s6Ly9ndml6Ly4uL25vZGVfbW9kdWxlcy9kMy1zY2FsZS1jaHJvbWF0aWMvc3JjL2RpdmVyZ2luZy9QaVlHLmpzIiwid2VicGFjazovL2d2aXovLi4vbm9kZV9tb2R1bGVzL2QzLXNjYWxlLWNocm9tYXRpYy9zcmMvZGl2ZXJnaW5nL1B1T3IuanMiLCJ3ZWJwYWNrOi8vZ3Zpei8uLi9ub2RlX21vZHVsZXMvZDMtc2NhbGUtY2hyb21hdGljL3NyYy9kaXZlcmdpbmcvUmRCdS5qcyIsIndlYnBhY2s6Ly9ndml6Ly4uL25vZGVfbW9kdWxlcy9kMy1zY2FsZS1jaHJvbWF0aWMvc3JjL2RpdmVyZ2luZy9SZEd5LmpzIiwid2VicGFjazovL2d2aXovLi4vbm9kZV9tb2R1bGVzL2QzLXNjYWxlLWNocm9tYXRpYy9zcmMvZGl2ZXJnaW5nL1JkWWxCdS5qcyIsIndlYnBhY2s6Ly9ndml6Ly4uL25vZGVfbW9kdWxlcy9kMy1zY2FsZS1jaHJvbWF0aWMvc3JjL2RpdmVyZ2luZy9SZFlsR24uanMiLCJ3ZWJwYWNrOi8vZ3Zpei8uLi9ub2RlX21vZHVsZXMvZDMtc2NhbGUtY2hyb21hdGljL3NyYy9kaXZlcmdpbmcvU3BlY3RyYWwuanMiLCJ3ZWJwYWNrOi8vZ3Zpei8uLi9ub2RlX21vZHVsZXMvZDMtc2NhbGUtY2hyb21hdGljL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly9ndml6Ly4uL25vZGVfbW9kdWxlcy9kMy1zY2FsZS1jaHJvbWF0aWMvc3JjL3JhbXAuanMiLCJ3ZWJwYWNrOi8vZ3Zpei8uLi9ub2RlX21vZHVsZXMvZDMtc2NhbGUtY2hyb21hdGljL3NyYy9zZXF1ZW50aWFsLW11bHRpL0J1R24uanMiLCJ3ZWJwYWNrOi8vZ3Zpei8uLi9ub2RlX21vZHVsZXMvZDMtc2NhbGUtY2hyb21hdGljL3NyYy9zZXF1ZW50aWFsLW11bHRpL0J1UHUuanMiLCJ3ZWJwYWNrOi8vZ3Zpei8uLi9ub2RlX21vZHVsZXMvZDMtc2NhbGUtY2hyb21hdGljL3NyYy9zZXF1ZW50aWFsLW11bHRpL0duQnUuanMiLCJ3ZWJwYWNrOi8vZ3Zpei8uLi9ub2RlX21vZHVsZXMvZDMtc2NhbGUtY2hyb21hdGljL3NyYy9zZXF1ZW50aWFsLW11bHRpL09yUmQuanMiLCJ3ZWJwYWNrOi8vZ3Zpei8uLi9ub2RlX21vZHVsZXMvZDMtc2NhbGUtY2hyb21hdGljL3NyYy9zZXF1ZW50aWFsLW11bHRpL1B1QnUuanMiLCJ3ZWJwYWNrOi8vZ3Zpei8uLi9ub2RlX21vZHVsZXMvZDMtc2NhbGUtY2hyb21hdGljL3NyYy9zZXF1ZW50aWFsLW11bHRpL1B1QnVHbi5qcyIsIndlYnBhY2s6Ly9ndml6Ly4uL25vZGVfbW9kdWxlcy9kMy1zY2FsZS1jaHJvbWF0aWMvc3JjL3NlcXVlbnRpYWwtbXVsdGkvUHVSZC5qcyIsIndlYnBhY2s6Ly9ndml6Ly4uL25vZGVfbW9kdWxlcy9kMy1zY2FsZS1jaHJvbWF0aWMvc3JjL3NlcXVlbnRpYWwtbXVsdGkvUmRQdS5qcyIsIndlYnBhY2s6Ly9ndml6Ly4uL25vZGVfbW9kdWxlcy9kMy1zY2FsZS1jaHJvbWF0aWMvc3JjL3NlcXVlbnRpYWwtbXVsdGkvWWxHbi5qcyIsIndlYnBhY2s6Ly9ndml6Ly4uL25vZGVfbW9kdWxlcy9kMy1zY2FsZS1jaHJvbWF0aWMvc3JjL3NlcXVlbnRpYWwtbXVsdGkvWWxHbkJ1LmpzIiwid2VicGFjazovL2d2aXovLi4vbm9kZV9tb2R1bGVzL2QzLXNjYWxlLWNocm9tYXRpYy9zcmMvc2VxdWVudGlhbC1tdWx0aS9ZbE9yQnIuanMiLCJ3ZWJwYWNrOi8vZ3Zpei8uLi9ub2RlX21vZHVsZXMvZDMtc2NhbGUtY2hyb21hdGljL3NyYy9zZXF1ZW50aWFsLW11bHRpL1lsT3JSZC5qcyIsIndlYnBhY2s6Ly9ndml6Ly4uL25vZGVfbW9kdWxlcy9kMy1zY2FsZS1jaHJvbWF0aWMvc3JjL3NlcXVlbnRpYWwtbXVsdGkvY2l2aWRpcy5qcyIsIndlYnBhY2s6Ly9ndml6Ly4uL25vZGVfbW9kdWxlcy9kMy1zY2FsZS1jaHJvbWF0aWMvc3JjL3NlcXVlbnRpYWwtbXVsdGkvY3ViZWhlbGl4LmpzIiwid2VicGFjazovL2d2aXovLi4vbm9kZV9tb2R1bGVzL2QzLXNjYWxlLWNocm9tYXRpYy9zcmMvc2VxdWVudGlhbC1tdWx0aS9yYWluYm93LmpzIiwid2VicGFjazovL2d2aXovLi4vbm9kZV9tb2R1bGVzL2QzLXNjYWxlLWNocm9tYXRpYy9zcmMvc2VxdWVudGlhbC1tdWx0aS9zaW5lYm93LmpzIiwid2VicGFjazovL2d2aXovLi4vbm9kZV9tb2R1bGVzL2QzLXNjYWxlLWNocm9tYXRpYy9zcmMvc2VxdWVudGlhbC1tdWx0aS90dXJiby5qcyIsIndlYnBhY2s6Ly9ndml6Ly4uL25vZGVfbW9kdWxlcy9kMy1zY2FsZS1jaHJvbWF0aWMvc3JjL3NlcXVlbnRpYWwtbXVsdGkvdmlyaWRpcy5qcyIsIndlYnBhY2s6Ly9ndml6Ly4uL25vZGVfbW9kdWxlcy9kMy1zY2FsZS1jaHJvbWF0aWMvc3JjL3NlcXVlbnRpYWwtc2luZ2xlL0JsdWVzLmpzIiwid2VicGFjazovL2d2aXovLi4vbm9kZV9tb2R1bGVzL2QzLXNjYWxlLWNocm9tYXRpYy9zcmMvc2VxdWVudGlhbC1zaW5nbGUvR3JlZW5zLmpzIiwid2VicGFjazovL2d2aXovLi4vbm9kZV9tb2R1bGVzL2QzLXNjYWxlLWNocm9tYXRpYy9zcmMvc2VxdWVudGlhbC1zaW5nbGUvR3JleXMuanMiLCJ3ZWJwYWNrOi8vZ3Zpei8uLi9ub2RlX21vZHVsZXMvZDMtc2NhbGUtY2hyb21hdGljL3NyYy9zZXF1ZW50aWFsLXNpbmdsZS9PcmFuZ2VzLmpzIiwid2VicGFjazovL2d2aXovLi4vbm9kZV9tb2R1bGVzL2QzLXNjYWxlLWNocm9tYXRpYy9zcmMvc2VxdWVudGlhbC1zaW5nbGUvUHVycGxlcy5qcyIsIndlYnBhY2s6Ly9ndml6Ly4uL25vZGVfbW9kdWxlcy9kMy1zY2FsZS1jaHJvbWF0aWMvc3JjL3NlcXVlbnRpYWwtc2luZ2xlL1JlZHMuanMiLCJ3ZWJwYWNrOi8vZ3Zpei8uL3NyYy9qcy9ncmlkdml6Yy9BcHAuanMiLCJ3ZWJwYWNrOi8vZ3Zpei8uL3NyYy9qcy9ncmlkdml6Yy9DYW52YXNHZW8uanMiLCJ3ZWJwYWNrOi8vZ3Zpei8uL3NyYy9qcy9ncmlkdml6Yy9EYXRhc2V0LmpzIiwid2VicGFjazovL2d2aXovLi9zcmMvanMvZ3JpZHZpemMvTGF5ZXIuanMiLCJ3ZWJwYWNrOi8vZ3Zpei8uL3NyYy9qcy9ncmlkdml6Yy9TdHlsZS5qcyIsIndlYnBhY2s6Ly9ndml6Ly4vc3JjL2pzL2dyaWR2aXpjL2RhdGFzZXQvQ1NWR3JpZC5qcyIsIndlYnBhY2s6Ly9ndml6Ly4vc3JjL2pzL2dyaWR2aXpjL2RhdGFzZXQvR3JpZFRpbGUuanMiLCJ3ZWJwYWNrOi8vZ3Zpei8uL3NyYy9qcy9ncmlkdml6Yy9kYXRhc2V0L1RpbGVkR3JpZC5qcyIsIndlYnBhY2s6Ly9ndml6Ly4vc3JjL2pzL2dyaWR2aXpjL2luZGV4LmpzIiwid2VicGFjazovL2d2aXovLi9zcmMvanMvZ3JpZHZpemMvc3R5bGUvQ29tcG9zaXRpb25TdHlsZS5qcyIsIndlYnBhY2s6Ly9ndml6Ly4vc3JjL2pzL2dyaWR2aXpjL3N0eWxlL0xpbmVTdHlsZS5qcyIsIndlYnBhY2s6Ly9ndml6Ly4vc3JjL2pzL2dyaWR2aXpjL3N0eWxlL1NlZ21lbnRTdHlsZS5qcyIsIndlYnBhY2s6Ly9ndml6Ly4vc3JjL2pzL2dyaWR2aXpjL3N0eWxlL1NoYXBlQ29sb3JTaXplU3R5bGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87UUNWQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUEyQzs7QUFFcEM7O0FBRUE7QUFDQTs7QUFFUDtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsSUFBSTtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDBEQUFNO0FBQ047QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsMERBQU0sV0FBVyx5REFBTTtBQUN2QjtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtB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QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQXdFO0FBQ1I7QUFDRjtBQUNFO0FBQ0U7QUFDQTtBQUNOO0FBQ0E7QUFDQTtBQUNVO0FBQ2U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ007QUFDQTtBQUNNO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDTTtBQUNOO0FBQ0E7QUFDQTtBQUNNO0FBQ047QUFDTTtBQUNBO0FBQ0Y7QUFDRztBQUNI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QUFDckMsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxlQUFlLEtBQUs7QUFDcEIsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxlQUFlLHFCQUFxQjtBQUNwQyxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSIsImZpbGUiOiJncmlkdml6Yy5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcImd2aXpcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiZ3ZpelwiXSA9IGZhY3RvcnkoKTtcbn0pKHdpbmRvdywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJidWlsZC9cIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvanMvZ3JpZHZpemMvaW5kZXguanNcIik7XG4iLCJpbXBvcnQgZGVmaW5lLCB7ZXh0ZW5kfSBmcm9tIFwiLi9kZWZpbmUuanNcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIENvbG9yKCkge31cblxuZXhwb3J0IHZhciBkYXJrZXIgPSAwLjc7XG5leHBvcnQgdmFyIGJyaWdodGVyID0gMSAvIGRhcmtlcjtcblxudmFyIHJlSSA9IFwiXFxcXHMqKFsrLV0/XFxcXGQrKVxcXFxzKlwiLFxuICAgIHJlTiA9IFwiXFxcXHMqKFsrLV0/XFxcXGQqXFxcXC4/XFxcXGQrKD86W2VFXVsrLV0/XFxcXGQrKT8pXFxcXHMqXCIsXG4gICAgcmVQID0gXCJcXFxccyooWystXT9cXFxcZCpcXFxcLj9cXFxcZCsoPzpbZUVdWystXT9cXFxcZCspPyklXFxcXHMqXCIsXG4gICAgcmVIZXggPSAvXiMoWzAtOWEtZl17Myw4fSkkLyxcbiAgICByZVJnYkludGVnZXIgPSBuZXcgUmVnRXhwKFwiXnJnYlxcXFwoXCIgKyBbcmVJLCByZUksIHJlSV0gKyBcIlxcXFwpJFwiKSxcbiAgICByZVJnYlBlcmNlbnQgPSBuZXcgUmVnRXhwKFwiXnJnYlxcXFwoXCIgKyBbcmVQLCByZVAsIHJlUF0gKyBcIlxcXFwpJFwiKSxcbiAgICByZVJnYmFJbnRlZ2VyID0gbmV3IFJlZ0V4cChcIl5yZ2JhXFxcXChcIiArIFtyZUksIHJlSSwgcmVJLCByZU5dICsgXCJcXFxcKSRcIiksXG4gICAgcmVSZ2JhUGVyY2VudCA9IG5ldyBSZWdFeHAoXCJecmdiYVxcXFwoXCIgKyBbcmVQLCByZVAsIHJlUCwgcmVOXSArIFwiXFxcXCkkXCIpLFxuICAgIHJlSHNsUGVyY2VudCA9IG5ldyBSZWdFeHAoXCJeaHNsXFxcXChcIiArIFtyZU4sIHJlUCwgcmVQXSArIFwiXFxcXCkkXCIpLFxuICAgIHJlSHNsYVBlcmNlbnQgPSBuZXcgUmVnRXhwKFwiXmhzbGFcXFxcKFwiICsgW3JlTiwgcmVQLCByZVAsIHJlTl0gKyBcIlxcXFwpJFwiKTtcblxudmFyIG5hbWVkID0ge1xuICBhbGljZWJsdWU6IDB4ZjBmOGZmLFxuICBhbnRpcXVld2hpdGU6IDB4ZmFlYmQ3LFxuICBhcXVhOiAweDAwZmZmZixcbiAgYXF1YW1hcmluZTogMHg3ZmZmZDQsXG4gIGF6dXJlOiAweGYwZmZmZixcbiAgYmVpZ2U6IDB4ZjVmNWRjLFxuICBiaXNxdWU6IDB4ZmZlNGM0LFxuICBibGFjazogMHgwMDAwMDAsXG4gIGJsYW5jaGVkYWxtb25kOiAweGZmZWJjZCxcbiAgYmx1ZTogMHgwMDAwZmYsXG4gIGJsdWV2aW9sZXQ6IDB4OGEyYmUyLFxuICBicm93bjogMHhhNTJhMmEsXG4gIGJ1cmx5d29vZDogMHhkZWI4ODcsXG4gIGNhZGV0Ymx1ZTogMHg1ZjllYTAsXG4gIGNoYXJ0cmV1c2U6IDB4N2ZmZjAwLFxuICBjaG9jb2xhdGU6IDB4ZDI2OTFlLFxuICBjb3JhbDogMHhmZjdmNTAsXG4gIGNvcm5mbG93ZXJibHVlOiAweDY0OTVlZCxcbiAgY29ybnNpbGs6IDB4ZmZmOGRjLFxuICBjcmltc29uOiAweGRjMTQzYyxcbiAgY3lhbjogMHgwMGZmZmYsXG4gIGRhcmtibHVlOiAweDAwMDA4YixcbiAgZGFya2N5YW46IDB4MDA4YjhiLFxuICBkYXJrZ29sZGVucm9kOiAweGI4ODYwYixcbiAgZGFya2dyYXk6IDB4YTlhOWE5LFxuICBkYXJrZ3JlZW46IDB4MDA2NDAwLFxuICBkYXJrZ3JleTogMHhhOWE5YTksXG4gIGRhcmtraGFraTogMHhiZGI3NmIsXG4gIGRhcmttYWdlbnRhOiAweDhiMDA4YixcbiAgZGFya29saXZlZ3JlZW46IDB4NTU2YjJmLFxuICBkYXJrb3JhbmdlOiAweGZmOGMwMCxcbiAgZGFya29yY2hpZDogMHg5OTMyY2MsXG4gIGRhcmtyZWQ6IDB4OGIwMDAwLFxuICBkYXJrc2FsbW9uOiAweGU5OTY3YSxcbiAgZGFya3NlYWdyZWVuOiAweDhmYmM4ZixcbiAgZGFya3NsYXRlYmx1ZTogMHg0ODNkOGIsXG4gIGRhcmtzbGF0ZWdyYXk6IDB4MmY0ZjRmLFxuICBkYXJrc2xhdGVncmV5OiAweDJmNGY0ZixcbiAgZGFya3R1cnF1b2lzZTogMHgwMGNlZDEsXG4gIGRhcmt2aW9sZXQ6IDB4OTQwMGQzLFxuICBkZWVwcGluazogMHhmZjE0OTMsXG4gIGRlZXBza3libHVlOiAweDAwYmZmZixcbiAgZGltZ3JheTogMHg2OTY5NjksXG4gIGRpbWdyZXk6IDB4Njk2OTY5LFxuICBkb2RnZXJibHVlOiAweDFlOTBmZixcbiAgZmlyZWJyaWNrOiAweGIyMjIyMixcbiAgZmxvcmFsd2hpdGU6IDB4ZmZmYWYwLFxuICBmb3Jlc3RncmVlbjogMHgyMjhiMjIsXG4gIGZ1Y2hzaWE6IDB4ZmYwMGZmLFxuICBnYWluc2Jvcm86IDB4ZGNkY2RjLFxuICBnaG9zdHdoaXRlOiAweGY4ZjhmZixcbiAgZ29sZDogMHhmZmQ3MDAsXG4gIGdvbGRlbnJvZDogMHhkYWE1MjAsXG4gIGdyYXk6IDB4ODA4MDgwLFxuICBncmVlbjogMHgwMDgwMDAsXG4gIGdyZWVueWVsbG93OiAweGFkZmYyZixcbiAgZ3JleTogMHg4MDgwODAsXG4gIGhvbmV5ZGV3OiAweGYwZmZmMCxcbiAgaG90cGluazogMHhmZjY5YjQsXG4gIGluZGlhbnJlZDogMHhjZDVjNWMsXG4gIGluZGlnbzogMHg0YjAwODIsXG4gIGl2b3J5OiAweGZmZmZmMCxcbiAga2hha2k6IDB4ZjBlNjhjLFxuICBsYXZlbmRlcjogMHhlNmU2ZmEsXG4gIGxhdmVuZGVyYmx1c2g6IDB4ZmZmMGY1LFxuICBsYXduZ3JlZW46IDB4N2NmYzAwLFxuICBsZW1vbmNoaWZmb246IDB4ZmZmYWNkLFxuICBsaWdodGJsdWU6IDB4YWRkOGU2LFxuICBsaWdodGNvcmFsOiAweGYwODA4MCxcbiAgbGlnaHRjeWFuOiAweGUwZmZmZixcbiAgbGlnaHRnb2xkZW5yb2R5ZWxsb3c6IDB4ZmFmYWQyLFxuICBsaWdodGdyYXk6IDB4ZDNkM2QzLFxuICBsaWdodGdyZWVuOiAweDkwZWU5MCxcbiAgbGlnaHRncmV5OiAweGQzZDNkMyxcbiAgbGlnaHRwaW5rOiAweGZmYjZjMSxcbiAgbGlnaHRzYWxtb246IDB4ZmZhMDdhLFxuICBsaWdodHNlYWdyZWVuOiAweDIwYjJhYSxcbiAgbGlnaHRza3libHVlOiAweDg3Y2VmYSxcbiAgbGlnaHRzbGF0ZWdyYXk6IDB4Nzc4ODk5LFxuICBsaWdodHNsYXRlZ3JleTogMHg3Nzg4OTksXG4gIGxpZ2h0c3RlZWxibHVlOiAweGIwYzRkZSxcbiAgbGlnaHR5ZWxsb3c6IDB4ZmZmZmUwLFxuICBsaW1lOiAweDAwZmYwMCxcbiAgbGltZWdyZWVuOiAweDMyY2QzMixcbiAgbGluZW46IDB4ZmFmMGU2LFxuICBtYWdlbnRhOiAweGZmMDBmZixcbiAgbWFyb29uOiAweDgwMDAwMCxcbiAgbWVkaXVtYXF1YW1hcmluZTogMHg2NmNkYWEsXG4gIG1lZGl1bWJsdWU6IDB4MDAwMGNkLFxuICBtZWRpdW1vcmNoaWQ6IDB4YmE1NWQzLFxuICBtZWRpdW1wdXJwbGU6IDB4OTM3MGRiLFxuICBtZWRpdW1zZWFncmVlbjogMHgzY2IzNzEsXG4gIG1lZGl1bXNsYXRlYmx1ZTogMHg3YjY4ZWUsXG4gIG1lZGl1bXNwcmluZ2dyZWVuOiAweDAwZmE5YSxcbiAgbWVkaXVtdHVycXVvaXNlOiAweDQ4ZDFjYyxcbiAgbWVkaXVtdmlvbGV0cmVkOiAweGM3MTU4NSxcbiAgbWlkbmlnaHRibHVlOiAweDE5MTk3MCxcbiAgbWludGNyZWFtOiAweGY1ZmZmYSxcbiAgbWlzdHlyb3NlOiAweGZmZTRlMSxcbiAgbW9jY2FzaW46IDB4ZmZlNGI1LFxuICBuYXZham93aGl0ZTogMHhmZmRlYWQsXG4gIG5hdnk6IDB4MDAwMDgwLFxuICBvbGRsYWNlOiAweGZkZjVlNixcbiAgb2xpdmU6IDB4ODA4MDAwLFxuICBvbGl2ZWRyYWI6IDB4NmI4ZTIzLFxuICBvcmFuZ2U6IDB4ZmZhNTAwLFxuICBvcmFuZ2VyZWQ6IDB4ZmY0NTAwLFxuICBvcmNoaWQ6IDB4ZGE3MGQ2LFxuICBwYWxlZ29sZGVucm9kOiAweGVlZThhYSxcbiAgcGFsZWdyZWVuOiAweDk4ZmI5OCxcbiAgcGFsZXR1cnF1b2lzZTogMHhhZmVlZWUsXG4gIHBhbGV2aW9sZXRyZWQ6IDB4ZGI3MDkzLFxuICBwYXBheWF3aGlwOiAweGZmZWZkNSxcbiAgcGVhY2hwdWZmOiAweGZmZGFiOSxcbiAgcGVydTogMHhjZDg1M2YsXG4gIHBpbms6IDB4ZmZjMGNiLFxuICBwbHVtOiAweGRkYTBkZCxcbiAgcG93ZGVyYmx1ZTogMHhiMGUwZTYsXG4gIHB1cnBsZTogMHg4MDAwODAsXG4gIHJlYmVjY2FwdXJwbGU6IDB4NjYzMzk5LFxuICByZWQ6IDB4ZmYwMDAwLFxuICByb3N5YnJvd246IDB4YmM4ZjhmLFxuICByb3lhbGJsdWU6IDB4NDE2OWUxLFxuICBzYWRkbGVicm93bjogMHg4YjQ1MTMsXG4gIHNhbG1vbjogMHhmYTgwNzIsXG4gIHNhbmR5YnJvd246IDB4ZjRhNDYwLFxuICBzZWFncmVlbjogMHgyZThiNTcsXG4gIHNlYXNoZWxsOiAweGZmZjVlZSxcbiAgc2llbm5hOiAweGEwNTIyZCxcbiAgc2lsdmVyOiAweGMwYzBjMCxcbiAgc2t5Ymx1ZTogMHg4N2NlZWIsXG4gIHNsYXRlYmx1ZTogMHg2YTVhY2QsXG4gIHNsYXRlZ3JheTogMHg3MDgwOTAsXG4gIHNsYXRlZ3JleTogMHg3MDgwOTAsXG4gIHNub3c6IDB4ZmZmYWZhLFxuICBzcHJpbmdncmVlbjogMHgwMGZmN2YsXG4gIHN0ZWVsYmx1ZTogMHg0NjgyYjQsXG4gIHRhbjogMHhkMmI0OGMsXG4gIHRlYWw6IDB4MDA4MDgwLFxuICB0aGlzdGxlOiAweGQ4YmZkOCxcbiAgdG9tYXRvOiAweGZmNjM0NyxcbiAgdHVycXVvaXNlOiAweDQwZTBkMCxcbiAgdmlvbGV0OiAweGVlODJlZSxcbiAgd2hlYXQ6IDB4ZjVkZWIzLFxuICB3aGl0ZTogMHhmZmZmZmYsXG4gIHdoaXRlc21va2U6IDB4ZjVmNWY1LFxuICB5ZWxsb3c6IDB4ZmZmZjAwLFxuICB5ZWxsb3dncmVlbjogMHg5YWNkMzJcbn07XG5cbmRlZmluZShDb2xvciwgY29sb3IsIHtcbiAgY29weTogZnVuY3Rpb24oY2hhbm5lbHMpIHtcbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihuZXcgdGhpcy5jb25zdHJ1Y3RvciwgdGhpcywgY2hhbm5lbHMpO1xuICB9LFxuICBkaXNwbGF5YWJsZTogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMucmdiKCkuZGlzcGxheWFibGUoKTtcbiAgfSxcbiAgaGV4OiBjb2xvcl9mb3JtYXRIZXgsIC8vIERlcHJlY2F0ZWQhIFVzZSBjb2xvci5mb3JtYXRIZXguXG4gIGZvcm1hdEhleDogY29sb3JfZm9ybWF0SGV4LFxuICBmb3JtYXRIc2w6IGNvbG9yX2Zvcm1hdEhzbCxcbiAgZm9ybWF0UmdiOiBjb2xvcl9mb3JtYXRSZ2IsXG4gIHRvU3RyaW5nOiBjb2xvcl9mb3JtYXRSZ2Jcbn0pO1xuXG5mdW5jdGlvbiBjb2xvcl9mb3JtYXRIZXgoKSB7XG4gIHJldHVybiB0aGlzLnJnYigpLmZvcm1hdEhleCgpO1xufVxuXG5mdW5jdGlvbiBjb2xvcl9mb3JtYXRIc2woKSB7XG4gIHJldHVybiBoc2xDb252ZXJ0KHRoaXMpLmZvcm1hdEhzbCgpO1xufVxuXG5mdW5jdGlvbiBjb2xvcl9mb3JtYXRSZ2IoKSB7XG4gIHJldHVybiB0aGlzLnJnYigpLmZvcm1hdFJnYigpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb2xvcihmb3JtYXQpIHtcbiAgdmFyIG0sIGw7XG4gIGZvcm1hdCA9IChmb3JtYXQgKyBcIlwiKS50cmltKCkudG9Mb3dlckNhc2UoKTtcbiAgcmV0dXJuIChtID0gcmVIZXguZXhlYyhmb3JtYXQpKSA/IChsID0gbVsxXS5sZW5ndGgsIG0gPSBwYXJzZUludChtWzFdLCAxNiksIGwgPT09IDYgPyByZ2JuKG0pIC8vICNmZjAwMDBcbiAgICAgIDogbCA9PT0gMyA/IG5ldyBSZ2IoKG0gPj4gOCAmIDB4ZikgfCAobSA+PiA0ICYgMHhmMCksIChtID4+IDQgJiAweGYpIHwgKG0gJiAweGYwKSwgKChtICYgMHhmKSA8PCA0KSB8IChtICYgMHhmKSwgMSkgLy8gI2YwMFxuICAgICAgOiBsID09PSA4ID8gcmdiYShtID4+IDI0ICYgMHhmZiwgbSA+PiAxNiAmIDB4ZmYsIG0gPj4gOCAmIDB4ZmYsIChtICYgMHhmZikgLyAweGZmKSAvLyAjZmYwMDAwMDBcbiAgICAgIDogbCA9PT0gNCA/IHJnYmEoKG0gPj4gMTIgJiAweGYpIHwgKG0gPj4gOCAmIDB4ZjApLCAobSA+PiA4ICYgMHhmKSB8IChtID4+IDQgJiAweGYwKSwgKG0gPj4gNCAmIDB4ZikgfCAobSAmIDB4ZjApLCAoKChtICYgMHhmKSA8PCA0KSB8IChtICYgMHhmKSkgLyAweGZmKSAvLyAjZjAwMFxuICAgICAgOiBudWxsKSAvLyBpbnZhbGlkIGhleFxuICAgICAgOiAobSA9IHJlUmdiSW50ZWdlci5leGVjKGZvcm1hdCkpID8gbmV3IFJnYihtWzFdLCBtWzJdLCBtWzNdLCAxKSAvLyByZ2IoMjU1LCAwLCAwKVxuICAgICAgOiAobSA9IHJlUmdiUGVyY2VudC5leGVjKGZvcm1hdCkpID8gbmV3IFJnYihtWzFdICogMjU1IC8gMTAwLCBtWzJdICogMjU1IC8gMTAwLCBtWzNdICogMjU1IC8gMTAwLCAxKSAvLyByZ2IoMTAwJSwgMCUsIDAlKVxuICAgICAgOiAobSA9IHJlUmdiYUludGVnZXIuZXhlYyhmb3JtYXQpKSA/IHJnYmEobVsxXSwgbVsyXSwgbVszXSwgbVs0XSkgLy8gcmdiYSgyNTUsIDAsIDAsIDEpXG4gICAgICA6IChtID0gcmVSZ2JhUGVyY2VudC5leGVjKGZvcm1hdCkpID8gcmdiYShtWzFdICogMjU1IC8gMTAwLCBtWzJdICogMjU1IC8gMTAwLCBtWzNdICogMjU1IC8gMTAwLCBtWzRdKSAvLyByZ2IoMTAwJSwgMCUsIDAlLCAxKVxuICAgICAgOiAobSA9IHJlSHNsUGVyY2VudC5leGVjKGZvcm1hdCkpID8gaHNsYShtWzFdLCBtWzJdIC8gMTAwLCBtWzNdIC8gMTAwLCAxKSAvLyBoc2woMTIwLCA1MCUsIDUwJSlcbiAgICAgIDogKG0gPSByZUhzbGFQZXJjZW50LmV4ZWMoZm9ybWF0KSkgPyBoc2xhKG1bMV0sIG1bMl0gLyAxMDAsIG1bM10gLyAxMDAsIG1bNF0pIC8vIGhzbGEoMTIwLCA1MCUsIDUwJSwgMSlcbiAgICAgIDogbmFtZWQuaGFzT3duUHJvcGVydHkoZm9ybWF0KSA/IHJnYm4obmFtZWRbZm9ybWF0XSkgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1wcm90b3R5cGUtYnVpbHRpbnNcbiAgICAgIDogZm9ybWF0ID09PSBcInRyYW5zcGFyZW50XCIgPyBuZXcgUmdiKE5hTiwgTmFOLCBOYU4sIDApXG4gICAgICA6IG51bGw7XG59XG5cbmZ1bmN0aW9uIHJnYm4obikge1xuICByZXR1cm4gbmV3IFJnYihuID4+IDE2ICYgMHhmZiwgbiA+PiA4ICYgMHhmZiwgbiAmIDB4ZmYsIDEpO1xufVxuXG5mdW5jdGlvbiByZ2JhKHIsIGcsIGIsIGEpIHtcbiAgaWYgKGEgPD0gMCkgciA9IGcgPSBiID0gTmFOO1xuICByZXR1cm4gbmV3IFJnYihyLCBnLCBiLCBhKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJnYkNvbnZlcnQobykge1xuICBpZiAoIShvIGluc3RhbmNlb2YgQ29sb3IpKSBvID0gY29sb3Iobyk7XG4gIGlmICghbykgcmV0dXJuIG5ldyBSZ2I7XG4gIG8gPSBvLnJnYigpO1xuICByZXR1cm4gbmV3IFJnYihvLnIsIG8uZywgby5iLCBvLm9wYWNpdHkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmdiKHIsIGcsIGIsIG9wYWNpdHkpIHtcbiAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPT09IDEgPyByZ2JDb252ZXJ0KHIpIDogbmV3IFJnYihyLCBnLCBiLCBvcGFjaXR5ID09IG51bGwgPyAxIDogb3BhY2l0eSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBSZ2IociwgZywgYiwgb3BhY2l0eSkge1xuICB0aGlzLnIgPSArcjtcbiAgdGhpcy5nID0gK2c7XG4gIHRoaXMuYiA9ICtiO1xuICB0aGlzLm9wYWNpdHkgPSArb3BhY2l0eTtcbn1cblxuZGVmaW5lKFJnYiwgcmdiLCBleHRlbmQoQ29sb3IsIHtcbiAgYnJpZ2h0ZXI6IGZ1bmN0aW9uKGspIHtcbiAgICBrID0gayA9PSBudWxsID8gYnJpZ2h0ZXIgOiBNYXRoLnBvdyhicmlnaHRlciwgayk7XG4gICAgcmV0dXJuIG5ldyBSZ2IodGhpcy5yICogaywgdGhpcy5nICogaywgdGhpcy5iICogaywgdGhpcy5vcGFjaXR5KTtcbiAgfSxcbiAgZGFya2VyOiBmdW5jdGlvbihrKSB7XG4gICAgayA9IGsgPT0gbnVsbCA/IGRhcmtlciA6IE1hdGgucG93KGRhcmtlciwgayk7XG4gICAgcmV0dXJuIG5ldyBSZ2IodGhpcy5yICogaywgdGhpcy5nICogaywgdGhpcy5iICogaywgdGhpcy5vcGFjaXR5KTtcbiAgfSxcbiAgcmdiOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcbiAgZGlzcGxheWFibGU6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiAoLTAuNSA8PSB0aGlzLnIgJiYgdGhpcy5yIDwgMjU1LjUpXG4gICAgICAgICYmICgtMC41IDw9IHRoaXMuZyAmJiB0aGlzLmcgPCAyNTUuNSlcbiAgICAgICAgJiYgKC0wLjUgPD0gdGhpcy5iICYmIHRoaXMuYiA8IDI1NS41KVxuICAgICAgICAmJiAoMCA8PSB0aGlzLm9wYWNpdHkgJiYgdGhpcy5vcGFjaXR5IDw9IDEpO1xuICB9LFxuICBoZXg6IHJnYl9mb3JtYXRIZXgsIC8vIERlcHJlY2F0ZWQhIFVzZSBjb2xvci5mb3JtYXRIZXguXG4gIGZvcm1hdEhleDogcmdiX2Zvcm1hdEhleCxcbiAgZm9ybWF0UmdiOiByZ2JfZm9ybWF0UmdiLFxuICB0b1N0cmluZzogcmdiX2Zvcm1hdFJnYlxufSkpO1xuXG5mdW5jdGlvbiByZ2JfZm9ybWF0SGV4KCkge1xuICByZXR1cm4gXCIjXCIgKyBoZXgodGhpcy5yKSArIGhleCh0aGlzLmcpICsgaGV4KHRoaXMuYik7XG59XG5cbmZ1bmN0aW9uIHJnYl9mb3JtYXRSZ2IoKSB7XG4gIHZhciBhID0gdGhpcy5vcGFjaXR5OyBhID0gaXNOYU4oYSkgPyAxIDogTWF0aC5tYXgoMCwgTWF0aC5taW4oMSwgYSkpO1xuICByZXR1cm4gKGEgPT09IDEgPyBcInJnYihcIiA6IFwicmdiYShcIilcbiAgICAgICsgTWF0aC5tYXgoMCwgTWF0aC5taW4oMjU1LCBNYXRoLnJvdW5kKHRoaXMucikgfHwgMCkpICsgXCIsIFwiXG4gICAgICArIE1hdGgubWF4KDAsIE1hdGgubWluKDI1NSwgTWF0aC5yb3VuZCh0aGlzLmcpIHx8IDApKSArIFwiLCBcIlxuICAgICAgKyBNYXRoLm1heCgwLCBNYXRoLm1pbigyNTUsIE1hdGgucm91bmQodGhpcy5iKSB8fCAwKSlcbiAgICAgICsgKGEgPT09IDEgPyBcIilcIiA6IFwiLCBcIiArIGEgKyBcIilcIik7XG59XG5cbmZ1bmN0aW9uIGhleCh2YWx1ZSkge1xuICB2YWx1ZSA9IE1hdGgubWF4KDAsIE1hdGgubWluKDI1NSwgTWF0aC5yb3VuZCh2YWx1ZSkgfHwgMCkpO1xuICByZXR1cm4gKHZhbHVlIDwgMTYgPyBcIjBcIiA6IFwiXCIpICsgdmFsdWUudG9TdHJpbmcoMTYpO1xufVxuXG5mdW5jdGlvbiBoc2xhKGgsIHMsIGwsIGEpIHtcbiAgaWYgKGEgPD0gMCkgaCA9IHMgPSBsID0gTmFOO1xuICBlbHNlIGlmIChsIDw9IDAgfHwgbCA+PSAxKSBoID0gcyA9IE5hTjtcbiAgZWxzZSBpZiAocyA8PSAwKSBoID0gTmFOO1xuICByZXR1cm4gbmV3IEhzbChoLCBzLCBsLCBhKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGhzbENvbnZlcnQobykge1xuICBpZiAobyBpbnN0YW5jZW9mIEhzbCkgcmV0dXJuIG5ldyBIc2woby5oLCBvLnMsIG8ubCwgby5vcGFjaXR5KTtcbiAgaWYgKCEobyBpbnN0YW5jZW9mIENvbG9yKSkgbyA9IGNvbG9yKG8pO1xuICBpZiAoIW8pIHJldHVybiBuZXcgSHNsO1xuICBpZiAobyBpbnN0YW5jZW9mIEhzbCkgcmV0dXJuIG87XG4gIG8gPSBvLnJnYigpO1xuICB2YXIgciA9IG8uciAvIDI1NSxcbiAgICAgIGcgPSBvLmcgLyAyNTUsXG4gICAgICBiID0gby5iIC8gMjU1LFxuICAgICAgbWluID0gTWF0aC5taW4ociwgZywgYiksXG4gICAgICBtYXggPSBNYXRoLm1heChyLCBnLCBiKSxcbiAgICAgIGggPSBOYU4sXG4gICAgICBzID0gbWF4IC0gbWluLFxuICAgICAgbCA9IChtYXggKyBtaW4pIC8gMjtcbiAgaWYgKHMpIHtcbiAgICBpZiAociA9PT0gbWF4KSBoID0gKGcgLSBiKSAvIHMgKyAoZyA8IGIpICogNjtcbiAgICBlbHNlIGlmIChnID09PSBtYXgpIGggPSAoYiAtIHIpIC8gcyArIDI7XG4gICAgZWxzZSBoID0gKHIgLSBnKSAvIHMgKyA0O1xuICAgIHMgLz0gbCA8IDAuNSA/IG1heCArIG1pbiA6IDIgLSBtYXggLSBtaW47XG4gICAgaCAqPSA2MDtcbiAgfSBlbHNlIHtcbiAgICBzID0gbCA+IDAgJiYgbCA8IDEgPyAwIDogaDtcbiAgfVxuICByZXR1cm4gbmV3IEhzbChoLCBzLCBsLCBvLm9wYWNpdHkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaHNsKGgsIHMsIGwsIG9wYWNpdHkpIHtcbiAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPT09IDEgPyBoc2xDb252ZXJ0KGgpIDogbmV3IEhzbChoLCBzLCBsLCBvcGFjaXR5ID09IG51bGwgPyAxIDogb3BhY2l0eSk7XG59XG5cbmZ1bmN0aW9uIEhzbChoLCBzLCBsLCBvcGFjaXR5KSB7XG4gIHRoaXMuaCA9ICtoO1xuICB0aGlzLnMgPSArcztcbiAgdGhpcy5sID0gK2w7XG4gIHRoaXMub3BhY2l0eSA9ICtvcGFjaXR5O1xufVxuXG5kZWZpbmUoSHNsLCBoc2wsIGV4dGVuZChDb2xvciwge1xuICBicmlnaHRlcjogZnVuY3Rpb24oaykge1xuICAgIGsgPSBrID09IG51bGwgPyBicmlnaHRlciA6IE1hdGgucG93KGJyaWdodGVyLCBrKTtcbiAgICByZXR1cm4gbmV3IEhzbCh0aGlzLmgsIHRoaXMucywgdGhpcy5sICogaywgdGhpcy5vcGFjaXR5KTtcbiAgfSxcbiAgZGFya2VyOiBmdW5jdGlvbihrKSB7XG4gICAgayA9IGsgPT0gbnVsbCA/IGRhcmtlciA6IE1hdGgucG93KGRhcmtlciwgayk7XG4gICAgcmV0dXJuIG5ldyBIc2wodGhpcy5oLCB0aGlzLnMsIHRoaXMubCAqIGssIHRoaXMub3BhY2l0eSk7XG4gIH0sXG4gIHJnYjogZnVuY3Rpb24oKSB7XG4gICAgdmFyIGggPSB0aGlzLmggJSAzNjAgKyAodGhpcy5oIDwgMCkgKiAzNjAsXG4gICAgICAgIHMgPSBpc05hTihoKSB8fCBpc05hTih0aGlzLnMpID8gMCA6IHRoaXMucyxcbiAgICAgICAgbCA9IHRoaXMubCxcbiAgICAgICAgbTIgPSBsICsgKGwgPCAwLjUgPyBsIDogMSAtIGwpICogcyxcbiAgICAgICAgbTEgPSAyICogbCAtIG0yO1xuICAgIHJldHVybiBuZXcgUmdiKFxuICAgICAgaHNsMnJnYihoID49IDI0MCA/IGggLSAyNDAgOiBoICsgMTIwLCBtMSwgbTIpLFxuICAgICAgaHNsMnJnYihoLCBtMSwgbTIpLFxuICAgICAgaHNsMnJnYihoIDwgMTIwID8gaCArIDI0MCA6IGggLSAxMjAsIG0xLCBtMiksXG4gICAgICB0aGlzLm9wYWNpdHlcbiAgICApO1xuICB9LFxuICBkaXNwbGF5YWJsZTogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuICgwIDw9IHRoaXMucyAmJiB0aGlzLnMgPD0gMSB8fCBpc05hTih0aGlzLnMpKVxuICAgICAgICAmJiAoMCA8PSB0aGlzLmwgJiYgdGhpcy5sIDw9IDEpXG4gICAgICAgICYmICgwIDw9IHRoaXMub3BhY2l0eSAmJiB0aGlzLm9wYWNpdHkgPD0gMSk7XG4gIH0sXG4gIGZvcm1hdEhzbDogZnVuY3Rpb24oKSB7XG4gICAgdmFyIGEgPSB0aGlzLm9wYWNpdHk7IGEgPSBpc05hTihhKSA/IDEgOiBNYXRoLm1heCgwLCBNYXRoLm1pbigxLCBhKSk7XG4gICAgcmV0dXJuIChhID09PSAxID8gXCJoc2woXCIgOiBcImhzbGEoXCIpXG4gICAgICAgICsgKHRoaXMuaCB8fCAwKSArIFwiLCBcIlxuICAgICAgICArICh0aGlzLnMgfHwgMCkgKiAxMDAgKyBcIiUsIFwiXG4gICAgICAgICsgKHRoaXMubCB8fCAwKSAqIDEwMCArIFwiJVwiXG4gICAgICAgICsgKGEgPT09IDEgPyBcIilcIiA6IFwiLCBcIiArIGEgKyBcIilcIik7XG4gIH1cbn0pKTtcblxuLyogRnJvbSBGdkQgMTMuMzcsIENTUyBDb2xvciBNb2R1bGUgTGV2ZWwgMyAqL1xuZnVuY3Rpb24gaHNsMnJnYihoLCBtMSwgbTIpIHtcbiAgcmV0dXJuIChoIDwgNjAgPyBtMSArIChtMiAtIG0xKSAqIGggLyA2MFxuICAgICAgOiBoIDwgMTgwID8gbTJcbiAgICAgIDogaCA8IDI0MCA/IG0xICsgKG0yIC0gbTEpICogKDI0MCAtIGgpIC8gNjBcbiAgICAgIDogbTEpICogMjU1O1xufVxuIiwiaW1wb3J0IGRlZmluZSwge2V4dGVuZH0gZnJvbSBcIi4vZGVmaW5lLmpzXCI7XG5pbXBvcnQge0NvbG9yLCByZ2JDb252ZXJ0LCBSZ2IsIGRhcmtlciwgYnJpZ2h0ZXJ9IGZyb20gXCIuL2NvbG9yLmpzXCI7XG5pbXBvcnQge2RlZzJyYWQsIHJhZDJkZWd9IGZyb20gXCIuL21hdGguanNcIjtcblxudmFyIEEgPSAtMC4xNDg2MSxcbiAgICBCID0gKzEuNzgyNzcsXG4gICAgQyA9IC0wLjI5MjI3LFxuICAgIEQgPSAtMC45MDY0OSxcbiAgICBFID0gKzEuOTcyOTQsXG4gICAgRUQgPSBFICogRCxcbiAgICBFQiA9IEUgKiBCLFxuICAgIEJDX0RBID0gQiAqIEMgLSBEICogQTtcblxuZnVuY3Rpb24gY3ViZWhlbGl4Q29udmVydChvKSB7XG4gIGlmIChvIGluc3RhbmNlb2YgQ3ViZWhlbGl4KSByZXR1cm4gbmV3IEN1YmVoZWxpeChvLmgsIG8ucywgby5sLCBvLm9wYWNpdHkpO1xuICBpZiAoIShvIGluc3RhbmNlb2YgUmdiKSkgbyA9IHJnYkNvbnZlcnQobyk7XG4gIHZhciByID0gby5yIC8gMjU1LFxuICAgICAgZyA9IG8uZyAvIDI1NSxcbiAgICAgIGIgPSBvLmIgLyAyNTUsXG4gICAgICBsID0gKEJDX0RBICogYiArIEVEICogciAtIEVCICogZykgLyAoQkNfREEgKyBFRCAtIEVCKSxcbiAgICAgIGJsID0gYiAtIGwsXG4gICAgICBrID0gKEUgKiAoZyAtIGwpIC0gQyAqIGJsKSAvIEQsXG4gICAgICBzID0gTWF0aC5zcXJ0KGsgKiBrICsgYmwgKiBibCkgLyAoRSAqIGwgKiAoMSAtIGwpKSwgLy8gTmFOIGlmIGw9MCBvciBsPTFcbiAgICAgIGggPSBzID8gTWF0aC5hdGFuMihrLCBibCkgKiByYWQyZGVnIC0gMTIwIDogTmFOO1xuICByZXR1cm4gbmV3IEN1YmVoZWxpeChoIDwgMCA/IGggKyAzNjAgOiBoLCBzLCBsLCBvLm9wYWNpdHkpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjdWJlaGVsaXgoaCwgcywgbCwgb3BhY2l0eSkge1xuICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA9PT0gMSA/IGN1YmVoZWxpeENvbnZlcnQoaCkgOiBuZXcgQ3ViZWhlbGl4KGgsIHMsIGwsIG9wYWNpdHkgPT0gbnVsbCA/IDEgOiBvcGFjaXR5KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEN1YmVoZWxpeChoLCBzLCBsLCBvcGFjaXR5KSB7XG4gIHRoaXMuaCA9ICtoO1xuICB0aGlzLnMgPSArcztcbiAgdGhpcy5sID0gK2w7XG4gIHRoaXMub3BhY2l0eSA9ICtvcGFjaXR5O1xufVxuXG5kZWZpbmUoQ3ViZWhlbGl4LCBjdWJlaGVsaXgsIGV4dGVuZChDb2xvciwge1xuICBicmlnaHRlcjogZnVuY3Rpb24oaykge1xuICAgIGsgPSBrID09IG51bGwgPyBicmlnaHRlciA6IE1hdGgucG93KGJyaWdodGVyLCBrKTtcbiAgICByZXR1cm4gbmV3IEN1YmVoZWxpeCh0aGlzLmgsIHRoaXMucywgdGhpcy5sICogaywgdGhpcy5vcGFjaXR5KTtcbiAgfSxcbiAgZGFya2VyOiBmdW5jdGlvbihrKSB7XG4gICAgayA9IGsgPT0gbnVsbCA/IGRhcmtlciA6IE1hdGgucG93KGRhcmtlciwgayk7XG4gICAgcmV0dXJuIG5ldyBDdWJlaGVsaXgodGhpcy5oLCB0aGlzLnMsIHRoaXMubCAqIGssIHRoaXMub3BhY2l0eSk7XG4gIH0sXG4gIHJnYjogZnVuY3Rpb24oKSB7XG4gICAgdmFyIGggPSBpc05hTih0aGlzLmgpID8gMCA6ICh0aGlzLmggKyAxMjApICogZGVnMnJhZCxcbiAgICAgICAgbCA9ICt0aGlzLmwsXG4gICAgICAgIGEgPSBpc05hTih0aGlzLnMpID8gMCA6IHRoaXMucyAqIGwgKiAoMSAtIGwpLFxuICAgICAgICBjb3NoID0gTWF0aC5jb3MoaCksXG4gICAgICAgIHNpbmggPSBNYXRoLnNpbihoKTtcbiAgICByZXR1cm4gbmV3IFJnYihcbiAgICAgIDI1NSAqIChsICsgYSAqIChBICogY29zaCArIEIgKiBzaW5oKSksXG4gICAgICAyNTUgKiAobCArIGEgKiAoQyAqIGNvc2ggKyBEICogc2luaCkpLFxuICAgICAgMjU1ICogKGwgKyBhICogKEUgKiBjb3NoKSksXG4gICAgICB0aGlzLm9wYWNpdHlcbiAgICApO1xuICB9XG59KSk7XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbihjb25zdHJ1Y3RvciwgZmFjdG9yeSwgcHJvdG90eXBlKSB7XG4gIGNvbnN0cnVjdG9yLnByb3RvdHlwZSA9IGZhY3RvcnkucHJvdG90eXBlID0gcHJvdG90eXBlO1xuICBwcm90b3R5cGUuY29uc3RydWN0b3IgPSBjb25zdHJ1Y3Rvcjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGV4dGVuZChwYXJlbnQsIGRlZmluaXRpb24pIHtcbiAgdmFyIHByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUocGFyZW50LnByb3RvdHlwZSk7XG4gIGZvciAodmFyIGtleSBpbiBkZWZpbml0aW9uKSBwcm90b3R5cGVba2V5XSA9IGRlZmluaXRpb25ba2V5XTtcbiAgcmV0dXJuIHByb3RvdHlwZTtcbn1cbiIsImV4cG9ydCB7ZGVmYXVsdCBhcyBjb2xvciwgcmdiLCBoc2x9IGZyb20gXCIuL2NvbG9yLmpzXCI7XG5leHBvcnQge2RlZmF1bHQgYXMgbGFiLCBoY2wsIGxjaCwgZ3JheX0gZnJvbSBcIi4vbGFiLmpzXCI7XG5leHBvcnQge2RlZmF1bHQgYXMgY3ViZWhlbGl4fSBmcm9tIFwiLi9jdWJlaGVsaXguanNcIjtcbiIsImltcG9ydCBkZWZpbmUsIHtleHRlbmR9IGZyb20gXCIuL2RlZmluZS5qc1wiO1xuaW1wb3J0IHtDb2xvciwgcmdiQ29udmVydCwgUmdifSBmcm9tIFwiLi9jb2xvci5qc1wiO1xuaW1wb3J0IHtkZWcycmFkLCByYWQyZGVnfSBmcm9tIFwiLi9tYXRoLmpzXCI7XG5cbi8vIGh0dHBzOi8vb2JzZXJ2YWJsZWhxLmNvbS9AbWJvc3RvY2svbGFiLWFuZC1yZ2JcbnZhciBLID0gMTgsXG4gICAgWG4gPSAwLjk2NDIyLFxuICAgIFluID0gMSxcbiAgICBabiA9IDAuODI1MjEsXG4gICAgdDAgPSA0IC8gMjksXG4gICAgdDEgPSA2IC8gMjksXG4gICAgdDIgPSAzICogdDEgKiB0MSxcbiAgICB0MyA9IHQxICogdDEgKiB0MTtcblxuZnVuY3Rpb24gbGFiQ29udmVydChvKSB7XG4gIGlmIChvIGluc3RhbmNlb2YgTGFiKSByZXR1cm4gbmV3IExhYihvLmwsIG8uYSwgby5iLCBvLm9wYWNpdHkpO1xuICBpZiAobyBpbnN0YW5jZW9mIEhjbCkgcmV0dXJuIGhjbDJsYWIobyk7XG4gIGlmICghKG8gaW5zdGFuY2VvZiBSZ2IpKSBvID0gcmdiQ29udmVydChvKTtcbiAgdmFyIHIgPSByZ2IybHJnYihvLnIpLFxuICAgICAgZyA9IHJnYjJscmdiKG8uZyksXG4gICAgICBiID0gcmdiMmxyZ2Ioby5iKSxcbiAgICAgIHkgPSB4eXoybGFiKCgwLjIyMjUwNDUgKiByICsgMC43MTY4Nzg2ICogZyArIDAuMDYwNjE2OSAqIGIpIC8gWW4pLCB4LCB6O1xuICBpZiAociA9PT0gZyAmJiBnID09PSBiKSB4ID0geiA9IHk7IGVsc2Uge1xuICAgIHggPSB4eXoybGFiKCgwLjQzNjA3NDcgKiByICsgMC4zODUwNjQ5ICogZyArIDAuMTQzMDgwNCAqIGIpIC8gWG4pO1xuICAgIHogPSB4eXoybGFiKCgwLjAxMzkzMjIgKiByICsgMC4wOTcxMDQ1ICogZyArIDAuNzE0MTczMyAqIGIpIC8gWm4pO1xuICB9XG4gIHJldHVybiBuZXcgTGFiKDExNiAqIHkgLSAxNiwgNTAwICogKHggLSB5KSwgMjAwICogKHkgLSB6KSwgby5vcGFjaXR5KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdyYXkobCwgb3BhY2l0eSkge1xuICByZXR1cm4gbmV3IExhYihsLCAwLCAwLCBvcGFjaXR5ID09IG51bGwgPyAxIDogb3BhY2l0eSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGxhYihsLCBhLCBiLCBvcGFjaXR5KSB7XG4gIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID09PSAxID8gbGFiQ29udmVydChsKSA6IG5ldyBMYWIobCwgYSwgYiwgb3BhY2l0eSA9PSBudWxsID8gMSA6IG9wYWNpdHkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gTGFiKGwsIGEsIGIsIG9wYWNpdHkpIHtcbiAgdGhpcy5sID0gK2w7XG4gIHRoaXMuYSA9ICthO1xuICB0aGlzLmIgPSArYjtcbiAgdGhpcy5vcGFjaXR5ID0gK29wYWNpdHk7XG59XG5cbmRlZmluZShMYWIsIGxhYiwgZXh0ZW5kKENvbG9yLCB7XG4gIGJyaWdodGVyOiBmdW5jdGlvbihrKSB7XG4gICAgcmV0dXJuIG5ldyBMYWIodGhpcy5sICsgSyAqIChrID09IG51bGwgPyAxIDogayksIHRoaXMuYSwgdGhpcy5iLCB0aGlzLm9wYWNpdHkpO1xuICB9LFxuICBkYXJrZXI6IGZ1bmN0aW9uKGspIHtcbiAgICByZXR1cm4gbmV3IExhYih0aGlzLmwgLSBLICogKGsgPT0gbnVsbCA/IDEgOiBrKSwgdGhpcy5hLCB0aGlzLmIsIHRoaXMub3BhY2l0eSk7XG4gIH0sXG4gIHJnYjogZnVuY3Rpb24oKSB7XG4gICAgdmFyIHkgPSAodGhpcy5sICsgMTYpIC8gMTE2LFxuICAgICAgICB4ID0gaXNOYU4odGhpcy5hKSA/IHkgOiB5ICsgdGhpcy5hIC8gNTAwLFxuICAgICAgICB6ID0gaXNOYU4odGhpcy5iKSA/IHkgOiB5IC0gdGhpcy5iIC8gMjAwO1xuICAgIHggPSBYbiAqIGxhYjJ4eXooeCk7XG4gICAgeSA9IFluICogbGFiMnh5eih5KTtcbiAgICB6ID0gWm4gKiBsYWIyeHl6KHopO1xuICAgIHJldHVybiBuZXcgUmdiKFxuICAgICAgbHJnYjJyZ2IoIDMuMTMzODU2MSAqIHggLSAxLjYxNjg2NjcgKiB5IC0gMC40OTA2MTQ2ICogeiksXG4gICAgICBscmdiMnJnYigtMC45Nzg3Njg0ICogeCArIDEuOTE2MTQxNSAqIHkgKyAwLjAzMzQ1NDAgKiB6KSxcbiAgICAgIGxyZ2IycmdiKCAwLjA3MTk0NTMgKiB4IC0gMC4yMjg5OTE0ICogeSArIDEuNDA1MjQyNyAqIHopLFxuICAgICAgdGhpcy5vcGFjaXR5XG4gICAgKTtcbiAgfVxufSkpO1xuXG5mdW5jdGlvbiB4eXoybGFiKHQpIHtcbiAgcmV0dXJuIHQgPiB0MyA/IE1hdGgucG93KHQsIDEgLyAzKSA6IHQgLyB0MiArIHQwO1xufVxuXG5mdW5jdGlvbiBsYWIyeHl6KHQpIHtcbiAgcmV0dXJuIHQgPiB0MSA/IHQgKiB0ICogdCA6IHQyICogKHQgLSB0MCk7XG59XG5cbmZ1bmN0aW9uIGxyZ2IycmdiKHgpIHtcbiAgcmV0dXJuIDI1NSAqICh4IDw9IDAuMDAzMTMwOCA/IDEyLjkyICogeCA6IDEuMDU1ICogTWF0aC5wb3coeCwgMSAvIDIuNCkgLSAwLjA1NSk7XG59XG5cbmZ1bmN0aW9uIHJnYjJscmdiKHgpIHtcbiAgcmV0dXJuICh4IC89IDI1NSkgPD0gMC4wNDA0NSA/IHggLyAxMi45MiA6IE1hdGgucG93KCh4ICsgMC4wNTUpIC8gMS4wNTUsIDIuNCk7XG59XG5cbmZ1bmN0aW9uIGhjbENvbnZlcnQobykge1xuICBpZiAobyBpbnN0YW5jZW9mIEhjbCkgcmV0dXJuIG5ldyBIY2woby5oLCBvLmMsIG8ubCwgby5vcGFjaXR5KTtcbiAgaWYgKCEobyBpbnN0YW5jZW9mIExhYikpIG8gPSBsYWJDb252ZXJ0KG8pO1xuICBpZiAoby5hID09PSAwICYmIG8uYiA9PT0gMCkgcmV0dXJuIG5ldyBIY2woTmFOLCAwIDwgby5sICYmIG8ubCA8IDEwMCA/IDAgOiBOYU4sIG8ubCwgby5vcGFjaXR5KTtcbiAgdmFyIGggPSBNYXRoLmF0YW4yKG8uYiwgby5hKSAqIHJhZDJkZWc7XG4gIHJldHVybiBuZXcgSGNsKGggPCAwID8gaCArIDM2MCA6IGgsIE1hdGguc3FydChvLmEgKiBvLmEgKyBvLmIgKiBvLmIpLCBvLmwsIG8ub3BhY2l0eSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsY2gobCwgYywgaCwgb3BhY2l0eSkge1xuICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA9PT0gMSA/IGhjbENvbnZlcnQobCkgOiBuZXcgSGNsKGgsIGMsIGwsIG9wYWNpdHkgPT0gbnVsbCA/IDEgOiBvcGFjaXR5KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGhjbChoLCBjLCBsLCBvcGFjaXR5KSB7XG4gIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID09PSAxID8gaGNsQ29udmVydChoKSA6IG5ldyBIY2woaCwgYywgbCwgb3BhY2l0eSA9PSBudWxsID8gMSA6IG9wYWNpdHkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gSGNsKGgsIGMsIGwsIG9wYWNpdHkpIHtcbiAgdGhpcy5oID0gK2g7XG4gIHRoaXMuYyA9ICtjO1xuICB0aGlzLmwgPSArbDtcbiAgdGhpcy5vcGFjaXR5ID0gK29wYWNpdHk7XG59XG5cbmZ1bmN0aW9uIGhjbDJsYWIobykge1xuICBpZiAoaXNOYU4oby5oKSkgcmV0dXJuIG5ldyBMYWIoby5sLCAwLCAwLCBvLm9wYWNpdHkpO1xuICB2YXIgaCA9IG8uaCAqIGRlZzJyYWQ7XG4gIHJldHVybiBuZXcgTGFiKG8ubCwgTWF0aC5jb3MoaCkgKiBvLmMsIE1hdGguc2luKGgpICogby5jLCBvLm9wYWNpdHkpO1xufVxuXG5kZWZpbmUoSGNsLCBoY2wsIGV4dGVuZChDb2xvciwge1xuICBicmlnaHRlcjogZnVuY3Rpb24oaykge1xuICAgIHJldHVybiBuZXcgSGNsKHRoaXMuaCwgdGhpcy5jLCB0aGlzLmwgKyBLICogKGsgPT0gbnVsbCA/IDEgOiBrKSwgdGhpcy5vcGFjaXR5KTtcbiAgfSxcbiAgZGFya2VyOiBmdW5jdGlvbihrKSB7XG4gICAgcmV0dXJuIG5ldyBIY2wodGhpcy5oLCB0aGlzLmMsIHRoaXMubCAtIEsgKiAoayA9PSBudWxsID8gMSA6IGspLCB0aGlzLm9wYWNpdHkpO1xuICB9LFxuICByZ2I6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBoY2wybGFiKHRoaXMpLnJnYigpO1xuICB9XG59KSk7XG4iLCJleHBvcnQgdmFyIGRlZzJyYWQgPSBNYXRoLlBJIC8gMTgwO1xuZXhwb3J0IHZhciByYWQyZGVnID0gMTgwIC8gTWF0aC5QSTtcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGF1dG9UeXBlKG9iamVjdCkge1xuICBmb3IgKHZhciBrZXkgaW4gb2JqZWN0KSB7XG4gICAgdmFyIHZhbHVlID0gb2JqZWN0W2tleV0udHJpbSgpLCBudW1iZXIsIG07XG4gICAgaWYgKCF2YWx1ZSkgdmFsdWUgPSBudWxsO1xuICAgIGVsc2UgaWYgKHZhbHVlID09PSBcInRydWVcIikgdmFsdWUgPSB0cnVlO1xuICAgIGVsc2UgaWYgKHZhbHVlID09PSBcImZhbHNlXCIpIHZhbHVlID0gZmFsc2U7XG4gICAgZWxzZSBpZiAodmFsdWUgPT09IFwiTmFOXCIpIHZhbHVlID0gTmFOO1xuICAgIGVsc2UgaWYgKCFpc05hTihudW1iZXIgPSArdmFsdWUpKSB2YWx1ZSA9IG51bWJlcjtcbiAgICBlbHNlIGlmIChtID0gdmFsdWUubWF0Y2goL14oWy0rXVxcZHsyfSk/XFxkezR9KC1cXGR7Mn0oLVxcZHsyfSk/KT8oVFxcZHsyfTpcXGR7Mn0oOlxcZHsyfShcXC5cXGR7M30pPyk/KFp8Wy0rXVxcZHsyfTpcXGR7Mn0pPyk/JC8pKSB7XG4gICAgICBpZiAoZml4dHogJiYgISFtWzRdICYmICFtWzddKSB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoLy0vZywgXCIvXCIpLnJlcGxhY2UoL1QvLCBcIiBcIik7XG4gICAgICB2YWx1ZSA9IG5ldyBEYXRlKHZhbHVlKTtcbiAgICB9XG4gICAgZWxzZSBjb250aW51ZTtcbiAgICBvYmplY3Rba2V5XSA9IHZhbHVlO1xuICB9XG4gIHJldHVybiBvYmplY3Q7XG59XG5cbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9kMy9kMy1kc3YvaXNzdWVzLzQ1XG52YXIgZml4dHogPSBuZXcgRGF0ZShcIjIwMTktMDEtMDFUMDA6MDBcIikuZ2V0SG91cnMoKSB8fCBuZXcgRGF0ZShcIjIwMTktMDctMDFUMDA6MDBcIikuZ2V0SG91cnMoKTsiLCJpbXBvcnQgZHN2IGZyb20gXCIuL2Rzdi5qc1wiO1xuXG52YXIgY3N2ID0gZHN2KFwiLFwiKTtcblxuZXhwb3J0IHZhciBjc3ZQYXJzZSA9IGNzdi5wYXJzZTtcbmV4cG9ydCB2YXIgY3N2UGFyc2VSb3dzID0gY3N2LnBhcnNlUm93cztcbmV4cG9ydCB2YXIgY3N2Rm9ybWF0ID0gY3N2LmZvcm1hdDtcbmV4cG9ydCB2YXIgY3N2Rm9ybWF0Qm9keSA9IGNzdi5mb3JtYXRCb2R5O1xuZXhwb3J0IHZhciBjc3ZGb3JtYXRSb3dzID0gY3N2LmZvcm1hdFJvd3M7XG5leHBvcnQgdmFyIGNzdkZvcm1hdFJvdyA9IGNzdi5mb3JtYXRSb3c7XG5leHBvcnQgdmFyIGNzdkZvcm1hdFZhbHVlID0gY3N2LmZvcm1hdFZhbHVlO1xuIiwidmFyIEVPTCA9IHt9LFxuICAgIEVPRiA9IHt9LFxuICAgIFFVT1RFID0gMzQsXG4gICAgTkVXTElORSA9IDEwLFxuICAgIFJFVFVSTiA9IDEzO1xuXG5mdW5jdGlvbiBvYmplY3RDb252ZXJ0ZXIoY29sdW1ucykge1xuICByZXR1cm4gbmV3IEZ1bmN0aW9uKFwiZFwiLCBcInJldHVybiB7XCIgKyBjb2x1bW5zLm1hcChmdW5jdGlvbihuYW1lLCBpKSB7XG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KG5hbWUpICsgXCI6IGRbXCIgKyBpICsgXCJdIHx8IFxcXCJcXFwiXCI7XG4gIH0pLmpvaW4oXCIsXCIpICsgXCJ9XCIpO1xufVxuXG5mdW5jdGlvbiBjdXN0b21Db252ZXJ0ZXIoY29sdW1ucywgZikge1xuICB2YXIgb2JqZWN0ID0gb2JqZWN0Q29udmVydGVyKGNvbHVtbnMpO1xuICByZXR1cm4gZnVuY3Rpb24ocm93LCBpKSB7XG4gICAgcmV0dXJuIGYob2JqZWN0KHJvdyksIGksIGNvbHVtbnMpO1xuICB9O1xufVxuXG4vLyBDb21wdXRlIHVuaXF1ZSBjb2x1bW5zIGluIG9yZGVyIG9mIGRpc2NvdmVyeS5cbmZ1bmN0aW9uIGluZmVyQ29sdW1ucyhyb3dzKSB7XG4gIHZhciBjb2x1bW5TZXQgPSBPYmplY3QuY3JlYXRlKG51bGwpLFxuICAgICAgY29sdW1ucyA9IFtdO1xuXG4gIHJvd3MuZm9yRWFjaChmdW5jdGlvbihyb3cpIHtcbiAgICBmb3IgKHZhciBjb2x1bW4gaW4gcm93KSB7XG4gICAgICBpZiAoIShjb2x1bW4gaW4gY29sdW1uU2V0KSkge1xuICAgICAgICBjb2x1bW5zLnB1c2goY29sdW1uU2V0W2NvbHVtbl0gPSBjb2x1bW4pO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIGNvbHVtbnM7XG59XG5cbmZ1bmN0aW9uIHBhZCh2YWx1ZSwgd2lkdGgpIHtcbiAgdmFyIHMgPSB2YWx1ZSArIFwiXCIsIGxlbmd0aCA9IHMubGVuZ3RoO1xuICByZXR1cm4gbGVuZ3RoIDwgd2lkdGggPyBuZXcgQXJyYXkod2lkdGggLSBsZW5ndGggKyAxKS5qb2luKDApICsgcyA6IHM7XG59XG5cbmZ1bmN0aW9uIGZvcm1hdFllYXIoeWVhcikge1xuICByZXR1cm4geWVhciA8IDAgPyBcIi1cIiArIHBhZCgteWVhciwgNilcbiAgICA6IHllYXIgPiA5OTk5ID8gXCIrXCIgKyBwYWQoeWVhciwgNilcbiAgICA6IHBhZCh5ZWFyLCA0KTtcbn1cblxuZnVuY3Rpb24gZm9ybWF0RGF0ZShkYXRlKSB7XG4gIHZhciBob3VycyA9IGRhdGUuZ2V0VVRDSG91cnMoKSxcbiAgICAgIG1pbnV0ZXMgPSBkYXRlLmdldFVUQ01pbnV0ZXMoKSxcbiAgICAgIHNlY29uZHMgPSBkYXRlLmdldFVUQ1NlY29uZHMoKSxcbiAgICAgIG1pbGxpc2Vjb25kcyA9IGRhdGUuZ2V0VVRDTWlsbGlzZWNvbmRzKCk7XG4gIHJldHVybiBpc05hTihkYXRlKSA/IFwiSW52YWxpZCBEYXRlXCJcbiAgICAgIDogZm9ybWF0WWVhcihkYXRlLmdldFVUQ0Z1bGxZZWFyKCksIDQpICsgXCItXCIgKyBwYWQoZGF0ZS5nZXRVVENNb250aCgpICsgMSwgMikgKyBcIi1cIiArIHBhZChkYXRlLmdldFVUQ0RhdGUoKSwgMilcbiAgICAgICsgKG1pbGxpc2Vjb25kcyA/IFwiVFwiICsgcGFkKGhvdXJzLCAyKSArIFwiOlwiICsgcGFkKG1pbnV0ZXMsIDIpICsgXCI6XCIgKyBwYWQoc2Vjb25kcywgMikgKyBcIi5cIiArIHBhZChtaWxsaXNlY29uZHMsIDMpICsgXCJaXCJcbiAgICAgIDogc2Vjb25kcyA/IFwiVFwiICsgcGFkKGhvdXJzLCAyKSArIFwiOlwiICsgcGFkKG1pbnV0ZXMsIDIpICsgXCI6XCIgKyBwYWQoc2Vjb25kcywgMikgKyBcIlpcIlxuICAgICAgOiBtaW51dGVzIHx8IGhvdXJzID8gXCJUXCIgKyBwYWQoaG91cnMsIDIpICsgXCI6XCIgKyBwYWQobWludXRlcywgMikgKyBcIlpcIlxuICAgICAgOiBcIlwiKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oZGVsaW1pdGVyKSB7XG4gIHZhciByZUZvcm1hdCA9IG5ldyBSZWdFeHAoXCJbXFxcIlwiICsgZGVsaW1pdGVyICsgXCJcXG5cXHJdXCIpLFxuICAgICAgREVMSU1JVEVSID0gZGVsaW1pdGVyLmNoYXJDb2RlQXQoMCk7XG5cbiAgZnVuY3Rpb24gcGFyc2UodGV4dCwgZikge1xuICAgIHZhciBjb252ZXJ0LCBjb2x1bW5zLCByb3dzID0gcGFyc2VSb3dzKHRleHQsIGZ1bmN0aW9uKHJvdywgaSkge1xuICAgICAgaWYgKGNvbnZlcnQpIHJldHVybiBjb252ZXJ0KHJvdywgaSAtIDEpO1xuICAgICAgY29sdW1ucyA9IHJvdywgY29udmVydCA9IGYgPyBjdXN0b21Db252ZXJ0ZXIocm93LCBmKSA6IG9iamVjdENvbnZlcnRlcihyb3cpO1xuICAgIH0pO1xuICAgIHJvd3MuY29sdW1ucyA9IGNvbHVtbnMgfHwgW107XG4gICAgcmV0dXJuIHJvd3M7XG4gIH1cblxuICBmdW5jdGlvbiBwYXJzZVJvd3ModGV4dCwgZikge1xuICAgIHZhciByb3dzID0gW10sIC8vIG91dHB1dCByb3dzXG4gICAgICAgIE4gPSB0ZXh0Lmxlbmd0aCxcbiAgICAgICAgSSA9IDAsIC8vIGN1cnJlbnQgY2hhcmFjdGVyIGluZGV4XG4gICAgICAgIG4gPSAwLCAvLyBjdXJyZW50IGxpbmUgbnVtYmVyXG4gICAgICAgIHQsIC8vIGN1cnJlbnQgdG9rZW5cbiAgICAgICAgZW9mID0gTiA8PSAwLCAvLyBjdXJyZW50IHRva2VuIGZvbGxvd2VkIGJ5IEVPRj9cbiAgICAgICAgZW9sID0gZmFsc2U7IC8vIGN1cnJlbnQgdG9rZW4gZm9sbG93ZWQgYnkgRU9MP1xuXG4gICAgLy8gU3RyaXAgdGhlIHRyYWlsaW5nIG5ld2xpbmUuXG4gICAgaWYgKHRleHQuY2hhckNvZGVBdChOIC0gMSkgPT09IE5FV0xJTkUpIC0tTjtcbiAgICBpZiAodGV4dC5jaGFyQ29kZUF0KE4gLSAxKSA9PT0gUkVUVVJOKSAtLU47XG5cbiAgICBmdW5jdGlvbiB0b2tlbigpIHtcbiAgICAgIGlmIChlb2YpIHJldHVybiBFT0Y7XG4gICAgICBpZiAoZW9sKSByZXR1cm4gZW9sID0gZmFsc2UsIEVPTDtcblxuICAgICAgLy8gVW5lc2NhcGUgcXVvdGVzLlxuICAgICAgdmFyIGksIGogPSBJLCBjO1xuICAgICAgaWYgKHRleHQuY2hhckNvZGVBdChqKSA9PT0gUVVPVEUpIHtcbiAgICAgICAgd2hpbGUgKEkrKyA8IE4gJiYgdGV4dC5jaGFyQ29kZUF0KEkpICE9PSBRVU9URSB8fCB0ZXh0LmNoYXJDb2RlQXQoKytJKSA9PT0gUVVPVEUpO1xuICAgICAgICBpZiAoKGkgPSBJKSA+PSBOKSBlb2YgPSB0cnVlO1xuICAgICAgICBlbHNlIGlmICgoYyA9IHRleHQuY2hhckNvZGVBdChJKyspKSA9PT0gTkVXTElORSkgZW9sID0gdHJ1ZTtcbiAgICAgICAgZWxzZSBpZiAoYyA9PT0gUkVUVVJOKSB7IGVvbCA9IHRydWU7IGlmICh0ZXh0LmNoYXJDb2RlQXQoSSkgPT09IE5FV0xJTkUpICsrSTsgfVxuICAgICAgICByZXR1cm4gdGV4dC5zbGljZShqICsgMSwgaSAtIDEpLnJlcGxhY2UoL1wiXCIvZywgXCJcXFwiXCIpO1xuICAgICAgfVxuXG4gICAgICAvLyBGaW5kIG5leHQgZGVsaW1pdGVyIG9yIG5ld2xpbmUuXG4gICAgICB3aGlsZSAoSSA8IE4pIHtcbiAgICAgICAgaWYgKChjID0gdGV4dC5jaGFyQ29kZUF0KGkgPSBJKyspKSA9PT0gTkVXTElORSkgZW9sID0gdHJ1ZTtcbiAgICAgICAgZWxzZSBpZiAoYyA9PT0gUkVUVVJOKSB7IGVvbCA9IHRydWU7IGlmICh0ZXh0LmNoYXJDb2RlQXQoSSkgPT09IE5FV0xJTkUpICsrSTsgfVxuICAgICAgICBlbHNlIGlmIChjICE9PSBERUxJTUlURVIpIGNvbnRpbnVlO1xuICAgICAgICByZXR1cm4gdGV4dC5zbGljZShqLCBpKTtcbiAgICAgIH1cblxuICAgICAgLy8gUmV0dXJuIGxhc3QgdG9rZW4gYmVmb3JlIEVPRi5cbiAgICAgIHJldHVybiBlb2YgPSB0cnVlLCB0ZXh0LnNsaWNlKGosIE4pO1xuICAgIH1cblxuICAgIHdoaWxlICgodCA9IHRva2VuKCkpICE9PSBFT0YpIHtcbiAgICAgIHZhciByb3cgPSBbXTtcbiAgICAgIHdoaWxlICh0ICE9PSBFT0wgJiYgdCAhPT0gRU9GKSByb3cucHVzaCh0KSwgdCA9IHRva2VuKCk7XG4gICAgICBpZiAoZiAmJiAocm93ID0gZihyb3csIG4rKykpID09IG51bGwpIGNvbnRpbnVlO1xuICAgICAgcm93cy5wdXNoKHJvdyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJvd3M7XG4gIH1cblxuICBmdW5jdGlvbiBwcmVmb3JtYXRCb2R5KHJvd3MsIGNvbHVtbnMpIHtcbiAgICByZXR1cm4gcm93cy5tYXAoZnVuY3Rpb24ocm93KSB7XG4gICAgICByZXR1cm4gY29sdW1ucy5tYXAoZnVuY3Rpb24oY29sdW1uKSB7XG4gICAgICAgIHJldHVybiBmb3JtYXRWYWx1ZShyb3dbY29sdW1uXSk7XG4gICAgICB9KS5qb2luKGRlbGltaXRlcik7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBmb3JtYXQocm93cywgY29sdW1ucykge1xuICAgIGlmIChjb2x1bW5zID09IG51bGwpIGNvbHVtbnMgPSBpbmZlckNvbHVtbnMocm93cyk7XG4gICAgcmV0dXJuIFtjb2x1bW5zLm1hcChmb3JtYXRWYWx1ZSkuam9pbihkZWxpbWl0ZXIpXS5jb25jYXQocHJlZm9ybWF0Qm9keShyb3dzLCBjb2x1bW5zKSkuam9pbihcIlxcblwiKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZvcm1hdEJvZHkocm93cywgY29sdW1ucykge1xuICAgIGlmIChjb2x1bW5zID09IG51bGwpIGNvbHVtbnMgPSBpbmZlckNvbHVtbnMocm93cyk7XG4gICAgcmV0dXJuIHByZWZvcm1hdEJvZHkocm93cywgY29sdW1ucykuam9pbihcIlxcblwiKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZvcm1hdFJvd3Mocm93cykge1xuICAgIHJldHVybiByb3dzLm1hcChmb3JtYXRSb3cpLmpvaW4oXCJcXG5cIik7XG4gIH1cblxuICBmdW5jdGlvbiBmb3JtYXRSb3cocm93KSB7XG4gICAgcmV0dXJuIHJvdy5tYXAoZm9ybWF0VmFsdWUpLmpvaW4oZGVsaW1pdGVyKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZvcm1hdFZhbHVlKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlID09IG51bGwgPyBcIlwiXG4gICAgICAgIDogdmFsdWUgaW5zdGFuY2VvZiBEYXRlID8gZm9ybWF0RGF0ZSh2YWx1ZSlcbiAgICAgICAgOiByZUZvcm1hdC50ZXN0KHZhbHVlICs9IFwiXCIpID8gXCJcXFwiXCIgKyB2YWx1ZS5yZXBsYWNlKC9cIi9nLCBcIlxcXCJcXFwiXCIpICsgXCJcXFwiXCJcbiAgICAgICAgOiB2YWx1ZTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgcGFyc2U6IHBhcnNlLFxuICAgIHBhcnNlUm93czogcGFyc2VSb3dzLFxuICAgIGZvcm1hdDogZm9ybWF0LFxuICAgIGZvcm1hdEJvZHk6IGZvcm1hdEJvZHksXG4gICAgZm9ybWF0Um93czogZm9ybWF0Um93cyxcbiAgICBmb3JtYXRSb3c6IGZvcm1hdFJvdyxcbiAgICBmb3JtYXRWYWx1ZTogZm9ybWF0VmFsdWVcbiAgfTtcbn1cbiIsImV4cG9ydCB7ZGVmYXVsdCBhcyBkc3ZGb3JtYXR9IGZyb20gXCIuL2Rzdi5qc1wiO1xuZXhwb3J0IHtjc3ZQYXJzZSwgY3N2UGFyc2VSb3dzLCBjc3ZGb3JtYXQsIGNzdkZvcm1hdEJvZHksIGNzdkZvcm1hdFJvd3MsIGNzdkZvcm1hdFJvdywgY3N2Rm9ybWF0VmFsdWV9IGZyb20gXCIuL2Nzdi5qc1wiO1xuZXhwb3J0IHt0c3ZQYXJzZSwgdHN2UGFyc2VSb3dzLCB0c3ZGb3JtYXQsIHRzdkZvcm1hdEJvZHksIHRzdkZvcm1hdFJvd3MsIHRzdkZvcm1hdFJvdywgdHN2Rm9ybWF0VmFsdWV9IGZyb20gXCIuL3Rzdi5qc1wiO1xuZXhwb3J0IHtkZWZhdWx0IGFzIGF1dG9UeXBlfSBmcm9tIFwiLi9hdXRvVHlwZS5qc1wiO1xuIiwiaW1wb3J0IGRzdiBmcm9tIFwiLi9kc3YuanNcIjtcblxudmFyIHRzdiA9IGRzdihcIlxcdFwiKTtcblxuZXhwb3J0IHZhciB0c3ZQYXJzZSA9IHRzdi5wYXJzZTtcbmV4cG9ydCB2YXIgdHN2UGFyc2VSb3dzID0gdHN2LnBhcnNlUm93cztcbmV4cG9ydCB2YXIgdHN2Rm9ybWF0ID0gdHN2LmZvcm1hdDtcbmV4cG9ydCB2YXIgdHN2Rm9ybWF0Qm9keSA9IHRzdi5mb3JtYXRCb2R5O1xuZXhwb3J0IHZhciB0c3ZGb3JtYXRSb3dzID0gdHN2LmZvcm1hdFJvd3M7XG5leHBvcnQgdmFyIHRzdkZvcm1hdFJvdyA9IHRzdi5mb3JtYXRSb3c7XG5leHBvcnQgdmFyIHRzdkZvcm1hdFZhbHVlID0gdHN2LmZvcm1hdFZhbHVlO1xuIiwiZnVuY3Rpb24gcmVzcG9uc2VCbG9iKHJlc3BvbnNlKSB7XG4gIGlmICghcmVzcG9uc2Uub2spIHRocm93IG5ldyBFcnJvcihyZXNwb25zZS5zdGF0dXMgKyBcIiBcIiArIHJlc3BvbnNlLnN0YXR1c1RleHQpO1xuICByZXR1cm4gcmVzcG9uc2UuYmxvYigpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihpbnB1dCwgaW5pdCkge1xuICByZXR1cm4gZmV0Y2goaW5wdXQsIGluaXQpLnRoZW4ocmVzcG9uc2VCbG9iKTtcbn1cbiIsImZ1bmN0aW9uIHJlc3BvbnNlQXJyYXlCdWZmZXIocmVzcG9uc2UpIHtcbiAgaWYgKCFyZXNwb25zZS5vaykgdGhyb3cgbmV3IEVycm9yKHJlc3BvbnNlLnN0YXR1cyArIFwiIFwiICsgcmVzcG9uc2Uuc3RhdHVzVGV4dCk7XG4gIHJldHVybiByZXNwb25zZS5hcnJheUJ1ZmZlcigpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihpbnB1dCwgaW5pdCkge1xuICByZXR1cm4gZmV0Y2goaW5wdXQsIGluaXQpLnRoZW4ocmVzcG9uc2VBcnJheUJ1ZmZlcik7XG59XG4iLCJpbXBvcnQge2NzdlBhcnNlLCBkc3ZGb3JtYXQsIHRzdlBhcnNlfSBmcm9tIFwiZDMtZHN2XCI7XG5pbXBvcnQgdGV4dCBmcm9tIFwiLi90ZXh0LmpzXCI7XG5cbmZ1bmN0aW9uIGRzdlBhcnNlKHBhcnNlKSB7XG4gIHJldHVybiBmdW5jdGlvbihpbnB1dCwgaW5pdCwgcm93KSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDIgJiYgdHlwZW9mIGluaXQgPT09IFwiZnVuY3Rpb25cIikgcm93ID0gaW5pdCwgaW5pdCA9IHVuZGVmaW5lZDtcbiAgICByZXR1cm4gdGV4dChpbnB1dCwgaW5pdCkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgcmV0dXJuIHBhcnNlKHJlc3BvbnNlLCByb3cpO1xuICAgIH0pO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBkc3YoZGVsaW1pdGVyLCBpbnB1dCwgaW5pdCwgcm93KSB7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAzICYmIHR5cGVvZiBpbml0ID09PSBcImZ1bmN0aW9uXCIpIHJvdyA9IGluaXQsIGluaXQgPSB1bmRlZmluZWQ7XG4gIHZhciBmb3JtYXQgPSBkc3ZGb3JtYXQoZGVsaW1pdGVyKTtcbiAgcmV0dXJuIHRleHQoaW5wdXQsIGluaXQpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICByZXR1cm4gZm9ybWF0LnBhcnNlKHJlc3BvbnNlLCByb3cpO1xuICB9KTtcbn1cblxuZXhwb3J0IHZhciBjc3YgPSBkc3ZQYXJzZShjc3ZQYXJzZSk7XG5leHBvcnQgdmFyIHRzdiA9IGRzdlBhcnNlKHRzdlBhcnNlKTtcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGlucHV0LCBpbml0KSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICB2YXIgaW1hZ2UgPSBuZXcgSW1hZ2U7XG4gICAgZm9yICh2YXIga2V5IGluIGluaXQpIGltYWdlW2tleV0gPSBpbml0W2tleV07XG4gICAgaW1hZ2Uub25lcnJvciA9IHJlamVjdDtcbiAgICBpbWFnZS5vbmxvYWQgPSBmdW5jdGlvbigpIHsgcmVzb2x2ZShpbWFnZSk7IH07XG4gICAgaW1hZ2Uuc3JjID0gaW5wdXQ7XG4gIH0pO1xufVxuIiwiZXhwb3J0IHtkZWZhdWx0IGFzIGJsb2J9IGZyb20gXCIuL2Jsb2IuanNcIjtcbmV4cG9ydCB7ZGVmYXVsdCBhcyBidWZmZXJ9IGZyb20gXCIuL2J1ZmZlci5qc1wiO1xuZXhwb3J0IHtkZWZhdWx0IGFzIGRzdiwgY3N2LCB0c3Z9IGZyb20gXCIuL2Rzdi5qc1wiO1xuZXhwb3J0IHtkZWZhdWx0IGFzIGltYWdlfSBmcm9tIFwiLi9pbWFnZS5qc1wiO1xuZXhwb3J0IHtkZWZhdWx0IGFzIGpzb259IGZyb20gXCIuL2pzb24uanNcIjtcbmV4cG9ydCB7ZGVmYXVsdCBhcyB0ZXh0fSBmcm9tIFwiLi90ZXh0LmpzXCI7XG5leHBvcnQge2RlZmF1bHQgYXMgeG1sLCBodG1sLCBzdmd9IGZyb20gXCIuL3htbC5qc1wiO1xuIiwiZnVuY3Rpb24gcmVzcG9uc2VKc29uKHJlc3BvbnNlKSB7XG4gIGlmICghcmVzcG9uc2Uub2spIHRocm93IG5ldyBFcnJvcihyZXNwb25zZS5zdGF0dXMgKyBcIiBcIiArIHJlc3BvbnNlLnN0YXR1c1RleHQpO1xuICBpZiAocmVzcG9uc2Uuc3RhdHVzID09PSAyMDQgfHwgcmVzcG9uc2Uuc3RhdHVzID09PSAyMDUpIHJldHVybjtcbiAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oaW5wdXQsIGluaXQpIHtcbiAgcmV0dXJuIGZldGNoKGlucHV0LCBpbml0KS50aGVuKHJlc3BvbnNlSnNvbik7XG59XG4iLCJmdW5jdGlvbiByZXNwb25zZVRleHQocmVzcG9uc2UpIHtcbiAgaWYgKCFyZXNwb25zZS5vaykgdGhyb3cgbmV3IEVycm9yKHJlc3BvbnNlLnN0YXR1cyArIFwiIFwiICsgcmVzcG9uc2Uuc3RhdHVzVGV4dCk7XG4gIHJldHVybiByZXNwb25zZS50ZXh0KCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGlucHV0LCBpbml0KSB7XG4gIHJldHVybiBmZXRjaChpbnB1dCwgaW5pdCkudGhlbihyZXNwb25zZVRleHQpO1xufVxuIiwiaW1wb3J0IHRleHQgZnJvbSBcIi4vdGV4dC5qc1wiO1xuXG5mdW5jdGlvbiBwYXJzZXIodHlwZSkge1xuICByZXR1cm4gZnVuY3Rpb24oaW5wdXQsIGluaXQpICB7XG4gICAgcmV0dXJuIHRleHQoaW5wdXQsIGluaXQpLnRoZW4oZnVuY3Rpb24odGV4dCkge1xuICAgICAgcmV0dXJuIChuZXcgRE9NUGFyc2VyKS5wYXJzZUZyb21TdHJpbmcodGV4dCwgdHlwZSk7XG4gICAgfSk7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IHBhcnNlcihcImFwcGxpY2F0aW9uL3htbFwiKTtcblxuZXhwb3J0IHZhciBodG1sID0gcGFyc2VyKFwidGV4dC9odG1sXCIpO1xuXG5leHBvcnQgdmFyIHN2ZyA9IHBhcnNlcihcImltYWdlL3N2Zyt4bWxcIik7XG4iLCJpbXBvcnQgdmFsdWUgZnJvbSBcIi4vdmFsdWUuanNcIjtcbmltcG9ydCBudW1iZXJBcnJheSwge2lzTnVtYmVyQXJyYXl9IGZyb20gXCIuL251bWJlckFycmF5LmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGEsIGIpIHtcbiAgcmV0dXJuIChpc051bWJlckFycmF5KGIpID8gbnVtYmVyQXJyYXkgOiBnZW5lcmljQXJyYXkpKGEsIGIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2VuZXJpY0FycmF5KGEsIGIpIHtcbiAgdmFyIG5iID0gYiA/IGIubGVuZ3RoIDogMCxcbiAgICAgIG5hID0gYSA/IE1hdGgubWluKG5iLCBhLmxlbmd0aCkgOiAwLFxuICAgICAgeCA9IG5ldyBBcnJheShuYSksXG4gICAgICBjID0gbmV3IEFycmF5KG5iKSxcbiAgICAgIGk7XG5cbiAgZm9yIChpID0gMDsgaSA8IG5hOyArK2kpIHhbaV0gPSB2YWx1ZShhW2ldLCBiW2ldKTtcbiAgZm9yICg7IGkgPCBuYjsgKytpKSBjW2ldID0gYltpXTtcblxuICByZXR1cm4gZnVuY3Rpb24odCkge1xuICAgIGZvciAoaSA9IDA7IGkgPCBuYTsgKytpKSBjW2ldID0geFtpXSh0KTtcbiAgICByZXR1cm4gYztcbiAgfTtcbn1cbiIsImV4cG9ydCBmdW5jdGlvbiBiYXNpcyh0MSwgdjAsIHYxLCB2MiwgdjMpIHtcbiAgdmFyIHQyID0gdDEgKiB0MSwgdDMgPSB0MiAqIHQxO1xuICByZXR1cm4gKCgxIC0gMyAqIHQxICsgMyAqIHQyIC0gdDMpICogdjBcbiAgICAgICsgKDQgLSA2ICogdDIgKyAzICogdDMpICogdjFcbiAgICAgICsgKDEgKyAzICogdDEgKyAzICogdDIgLSAzICogdDMpICogdjJcbiAgICAgICsgdDMgKiB2MykgLyA2O1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbih2YWx1ZXMpIHtcbiAgdmFyIG4gPSB2YWx1ZXMubGVuZ3RoIC0gMTtcbiAgcmV0dXJuIGZ1bmN0aW9uKHQpIHtcbiAgICB2YXIgaSA9IHQgPD0gMCA/ICh0ID0gMCkgOiB0ID49IDEgPyAodCA9IDEsIG4gLSAxKSA6IE1hdGguZmxvb3IodCAqIG4pLFxuICAgICAgICB2MSA9IHZhbHVlc1tpXSxcbiAgICAgICAgdjIgPSB2YWx1ZXNbaSArIDFdLFxuICAgICAgICB2MCA9IGkgPiAwID8gdmFsdWVzW2kgLSAxXSA6IDIgKiB2MSAtIHYyLFxuICAgICAgICB2MyA9IGkgPCBuIC0gMSA/IHZhbHVlc1tpICsgMl0gOiAyICogdjIgLSB2MTtcbiAgICByZXR1cm4gYmFzaXMoKHQgLSBpIC8gbikgKiBuLCB2MCwgdjEsIHYyLCB2Myk7XG4gIH07XG59XG4iLCJpbXBvcnQge2Jhc2lzfSBmcm9tIFwiLi9iYXNpcy5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbih2YWx1ZXMpIHtcbiAgdmFyIG4gPSB2YWx1ZXMubGVuZ3RoO1xuICByZXR1cm4gZnVuY3Rpb24odCkge1xuICAgIHZhciBpID0gTWF0aC5mbG9vcigoKHQgJT0gMSkgPCAwID8gKyt0IDogdCkgKiBuKSxcbiAgICAgICAgdjAgPSB2YWx1ZXNbKGkgKyBuIC0gMSkgJSBuXSxcbiAgICAgICAgdjEgPSB2YWx1ZXNbaSAlIG5dLFxuICAgICAgICB2MiA9IHZhbHVlc1soaSArIDEpICUgbl0sXG4gICAgICAgIHYzID0gdmFsdWVzWyhpICsgMikgJSBuXTtcbiAgICByZXR1cm4gYmFzaXMoKHQgLSBpIC8gbikgKiBuLCB2MCwgdjEsIHYyLCB2Myk7XG4gIH07XG59XG4iLCJpbXBvcnQgY29uc3RhbnQgZnJvbSBcIi4vY29uc3RhbnQuanNcIjtcblxuZnVuY3Rpb24gbGluZWFyKGEsIGQpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKHQpIHtcbiAgICByZXR1cm4gYSArIHQgKiBkO1xuICB9O1xufVxuXG5mdW5jdGlvbiBleHBvbmVudGlhbChhLCBiLCB5KSB7XG4gIHJldHVybiBhID0gTWF0aC5wb3coYSwgeSksIGIgPSBNYXRoLnBvdyhiLCB5KSAtIGEsIHkgPSAxIC8geSwgZnVuY3Rpb24odCkge1xuICAgIHJldHVybiBNYXRoLnBvdyhhICsgdCAqIGIsIHkpO1xuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaHVlKGEsIGIpIHtcbiAgdmFyIGQgPSBiIC0gYTtcbiAgcmV0dXJuIGQgPyBsaW5lYXIoYSwgZCA+IDE4MCB8fCBkIDwgLTE4MCA/IGQgLSAzNjAgKiBNYXRoLnJvdW5kKGQgLyAzNjApIDogZCkgOiBjb25zdGFudChpc05hTihhKSA/IGIgOiBhKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdhbW1hKHkpIHtcbiAgcmV0dXJuICh5ID0gK3kpID09PSAxID8gbm9nYW1tYSA6IGZ1bmN0aW9uKGEsIGIpIHtcbiAgICByZXR1cm4gYiAtIGEgPyBleHBvbmVudGlhbChhLCBiLCB5KSA6IGNvbnN0YW50KGlzTmFOKGEpID8gYiA6IGEpO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBub2dhbW1hKGEsIGIpIHtcbiAgdmFyIGQgPSBiIC0gYTtcbiAgcmV0dXJuIGQgPyBsaW5lYXIoYSwgZCkgOiBjb25zdGFudChpc05hTihhKSA/IGIgOiBhKTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHgpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB4O1xuICB9O1xufVxuIiwiaW1wb3J0IHtjdWJlaGVsaXggYXMgY29sb3JDdWJlaGVsaXh9IGZyb20gXCJkMy1jb2xvclwiO1xuaW1wb3J0IGNvbG9yLCB7aHVlfSBmcm9tIFwiLi9jb2xvci5qc1wiO1xuXG5mdW5jdGlvbiBjdWJlaGVsaXgoaHVlKSB7XG4gIHJldHVybiAoZnVuY3Rpb24gY3ViZWhlbGl4R2FtbWEoeSkge1xuICAgIHkgPSAreTtcblxuICAgIGZ1bmN0aW9uIGN1YmVoZWxpeChzdGFydCwgZW5kKSB7XG4gICAgICB2YXIgaCA9IGh1ZSgoc3RhcnQgPSBjb2xvckN1YmVoZWxpeChzdGFydCkpLmgsIChlbmQgPSBjb2xvckN1YmVoZWxpeChlbmQpKS5oKSxcbiAgICAgICAgICBzID0gY29sb3Ioc3RhcnQucywgZW5kLnMpLFxuICAgICAgICAgIGwgPSBjb2xvcihzdGFydC5sLCBlbmQubCksXG4gICAgICAgICAgb3BhY2l0eSA9IGNvbG9yKHN0YXJ0Lm9wYWNpdHksIGVuZC5vcGFjaXR5KTtcbiAgICAgIHJldHVybiBmdW5jdGlvbih0KSB7XG4gICAgICAgIHN0YXJ0LmggPSBoKHQpO1xuICAgICAgICBzdGFydC5zID0gcyh0KTtcbiAgICAgICAgc3RhcnQubCA9IGwoTWF0aC5wb3codCwgeSkpO1xuICAgICAgICBzdGFydC5vcGFjaXR5ID0gb3BhY2l0eSh0KTtcbiAgICAgICAgcmV0dXJuIHN0YXJ0ICsgXCJcIjtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgY3ViZWhlbGl4LmdhbW1hID0gY3ViZWhlbGl4R2FtbWE7XG5cbiAgICByZXR1cm4gY3ViZWhlbGl4O1xuICB9KSgxKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY3ViZWhlbGl4KGh1ZSk7XG5leHBvcnQgdmFyIGN1YmVoZWxpeExvbmcgPSBjdWJlaGVsaXgoY29sb3IpO1xuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oYSwgYikge1xuICB2YXIgZCA9IG5ldyBEYXRlO1xuICByZXR1cm4gYSA9ICthLCBiID0gK2IsIGZ1bmN0aW9uKHQpIHtcbiAgICByZXR1cm4gZC5zZXRUaW1lKGEgKiAoMSAtIHQpICsgYiAqIHQpLCBkO1xuICB9O1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24ocmFuZ2UpIHtcbiAgdmFyIG4gPSByYW5nZS5sZW5ndGg7XG4gIHJldHVybiBmdW5jdGlvbih0KSB7XG4gICAgcmV0dXJuIHJhbmdlW01hdGgubWF4KDAsIE1hdGgubWluKG4gLSAxLCBNYXRoLmZsb29yKHQgKiBuKSkpXTtcbiAgfTtcbn1cbiIsImltcG9ydCB7aGNsIGFzIGNvbG9ySGNsfSBmcm9tIFwiZDMtY29sb3JcIjtcbmltcG9ydCBjb2xvciwge2h1ZX0gZnJvbSBcIi4vY29sb3IuanNcIjtcblxuZnVuY3Rpb24gaGNsKGh1ZSkge1xuICByZXR1cm4gZnVuY3Rpb24oc3RhcnQsIGVuZCkge1xuICAgIHZhciBoID0gaHVlKChzdGFydCA9IGNvbG9ySGNsKHN0YXJ0KSkuaCwgKGVuZCA9IGNvbG9ySGNsKGVuZCkpLmgpLFxuICAgICAgICBjID0gY29sb3Ioc3RhcnQuYywgZW5kLmMpLFxuICAgICAgICBsID0gY29sb3Ioc3RhcnQubCwgZW5kLmwpLFxuICAgICAgICBvcGFjaXR5ID0gY29sb3Ioc3RhcnQub3BhY2l0eSwgZW5kLm9wYWNpdHkpO1xuICAgIHJldHVybiBmdW5jdGlvbih0KSB7XG4gICAgICBzdGFydC5oID0gaCh0KTtcbiAgICAgIHN0YXJ0LmMgPSBjKHQpO1xuICAgICAgc3RhcnQubCA9IGwodCk7XG4gICAgICBzdGFydC5vcGFjaXR5ID0gb3BhY2l0eSh0KTtcbiAgICAgIHJldHVybiBzdGFydCArIFwiXCI7XG4gICAgfTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBoY2woaHVlKTtcbmV4cG9ydCB2YXIgaGNsTG9uZyA9IGhjbChjb2xvcik7XG4iLCJpbXBvcnQge2hzbCBhcyBjb2xvckhzbH0gZnJvbSBcImQzLWNvbG9yXCI7XG5pbXBvcnQgY29sb3IsIHtodWV9IGZyb20gXCIuL2NvbG9yLmpzXCI7XG5cbmZ1bmN0aW9uIGhzbChodWUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKHN0YXJ0LCBlbmQpIHtcbiAgICB2YXIgaCA9IGh1ZSgoc3RhcnQgPSBjb2xvckhzbChzdGFydCkpLmgsIChlbmQgPSBjb2xvckhzbChlbmQpKS5oKSxcbiAgICAgICAgcyA9IGNvbG9yKHN0YXJ0LnMsIGVuZC5zKSxcbiAgICAgICAgbCA9IGNvbG9yKHN0YXJ0LmwsIGVuZC5sKSxcbiAgICAgICAgb3BhY2l0eSA9IGNvbG9yKHN0YXJ0Lm9wYWNpdHksIGVuZC5vcGFjaXR5KTtcbiAgICByZXR1cm4gZnVuY3Rpb24odCkge1xuICAgICAgc3RhcnQuaCA9IGgodCk7XG4gICAgICBzdGFydC5zID0gcyh0KTtcbiAgICAgIHN0YXJ0LmwgPSBsKHQpO1xuICAgICAgc3RhcnQub3BhY2l0eSA9IG9wYWNpdHkodCk7XG4gICAgICByZXR1cm4gc3RhcnQgKyBcIlwiO1xuICAgIH07XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgaHNsKGh1ZSk7XG5leHBvcnQgdmFyIGhzbExvbmcgPSBoc2woY29sb3IpO1xuIiwiaW1wb3J0IHtodWV9IGZyb20gXCIuL2NvbG9yLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGEsIGIpIHtcbiAgdmFyIGkgPSBodWUoK2EsICtiKTtcbiAgcmV0dXJuIGZ1bmN0aW9uKHQpIHtcbiAgICB2YXIgeCA9IGkodCk7XG4gICAgcmV0dXJuIHggLSAzNjAgKiBNYXRoLmZsb29yKHggLyAzNjApO1xuICB9O1xufVxuIiwiZXhwb3J0IHtkZWZhdWx0IGFzIGludGVycG9sYXRlfSBmcm9tIFwiLi92YWx1ZS5qc1wiO1xuZXhwb3J0IHtkZWZhdWx0IGFzIGludGVycG9sYXRlQXJyYXl9IGZyb20gXCIuL2FycmF5LmpzXCI7XG5leHBvcnQge2RlZmF1bHQgYXMgaW50ZXJwb2xhdGVCYXNpc30gZnJvbSBcIi4vYmFzaXMuanNcIjtcbmV4cG9ydCB7ZGVmYXVsdCBhcyBpbnRlcnBvbGF0ZUJhc2lzQ2xvc2VkfSBmcm9tIFwiLi9iYXNpc0Nsb3NlZC5qc1wiO1xuZXhwb3J0IHtkZWZhdWx0IGFzIGludGVycG9sYXRlRGF0ZX0gZnJvbSBcIi4vZGF0ZS5qc1wiO1xuZXhwb3J0IHtkZWZhdWx0IGFzIGludGVycG9sYXRlRGlzY3JldGV9IGZyb20gXCIuL2Rpc2NyZXRlLmpzXCI7XG5leHBvcnQge2RlZmF1bHQgYXMgaW50ZXJwb2xhdGVIdWV9IGZyb20gXCIuL2h1ZS5qc1wiO1xuZXhwb3J0IHtkZWZhdWx0IGFzIGludGVycG9sYXRlTnVtYmVyfSBmcm9tIFwiLi9udW1iZXIuanNcIjtcbmV4cG9ydCB7ZGVmYXVsdCBhcyBpbnRlcnBvbGF0ZU51bWJlckFycmF5fSBmcm9tIFwiLi9udW1iZXJBcnJheS5qc1wiO1xuZXhwb3J0IHtkZWZhdWx0IGFzIGludGVycG9sYXRlT2JqZWN0fSBmcm9tIFwiLi9vYmplY3QuanNcIjtcbmV4cG9ydCB7ZGVmYXVsdCBhcyBpbnRlcnBvbGF0ZVJvdW5kfSBmcm9tIFwiLi9yb3VuZC5qc1wiO1xuZXhwb3J0IHtkZWZhdWx0IGFzIGludGVycG9sYXRlU3RyaW5nfSBmcm9tIFwiLi9zdHJpbmcuanNcIjtcbmV4cG9ydCB7aW50ZXJwb2xhdGVUcmFuc2Zvcm1Dc3MsIGludGVycG9sYXRlVHJhbnNmb3JtU3ZnfSBmcm9tIFwiLi90cmFuc2Zvcm0vaW5kZXguanNcIjtcbmV4cG9ydCB7ZGVmYXVsdCBhcyBpbnRlcnBvbGF0ZVpvb219IGZyb20gXCIuL3pvb20uanNcIjtcbmV4cG9ydCB7ZGVmYXVsdCBhcyBpbnRlcnBvbGF0ZVJnYiwgcmdiQmFzaXMgYXMgaW50ZXJwb2xhdGVSZ2JCYXNpcywgcmdiQmFzaXNDbG9zZWQgYXMgaW50ZXJwb2xhdGVSZ2JCYXNpc0Nsb3NlZH0gZnJvbSBcIi4vcmdiLmpzXCI7XG5leHBvcnQge2RlZmF1bHQgYXMgaW50ZXJwb2xhdGVIc2wsIGhzbExvbmcgYXMgaW50ZXJwb2xhdGVIc2xMb25nfSBmcm9tIFwiLi9oc2wuanNcIjtcbmV4cG9ydCB7ZGVmYXVsdCBhcyBpbnRlcnBvbGF0ZUxhYn0gZnJvbSBcIi4vbGFiLmpzXCI7XG5leHBvcnQge2RlZmF1bHQgYXMgaW50ZXJwb2xhdGVIY2wsIGhjbExvbmcgYXMgaW50ZXJwb2xhdGVIY2xMb25nfSBmcm9tIFwiLi9oY2wuanNcIjtcbmV4cG9ydCB7ZGVmYXVsdCBhcyBpbnRlcnBvbGF0ZUN1YmVoZWxpeCwgY3ViZWhlbGl4TG9uZyBhcyBpbnRlcnBvbGF0ZUN1YmVoZWxpeExvbmd9IGZyb20gXCIuL2N1YmVoZWxpeC5qc1wiO1xuZXhwb3J0IHtkZWZhdWx0IGFzIHBpZWNld2lzZX0gZnJvbSBcIi4vcGllY2V3aXNlLmpzXCI7XG5leHBvcnQge2RlZmF1bHQgYXMgcXVhbnRpemV9IGZyb20gXCIuL3F1YW50aXplLmpzXCI7XG4iLCJpbXBvcnQge2xhYiBhcyBjb2xvckxhYn0gZnJvbSBcImQzLWNvbG9yXCI7XG5pbXBvcnQgY29sb3IgZnJvbSBcIi4vY29sb3IuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbGFiKHN0YXJ0LCBlbmQpIHtcbiAgdmFyIGwgPSBjb2xvcigoc3RhcnQgPSBjb2xvckxhYihzdGFydCkpLmwsIChlbmQgPSBjb2xvckxhYihlbmQpKS5sKSxcbiAgICAgIGEgPSBjb2xvcihzdGFydC5hLCBlbmQuYSksXG4gICAgICBiID0gY29sb3Ioc3RhcnQuYiwgZW5kLmIpLFxuICAgICAgb3BhY2l0eSA9IGNvbG9yKHN0YXJ0Lm9wYWNpdHksIGVuZC5vcGFjaXR5KTtcbiAgcmV0dXJuIGZ1bmN0aW9uKHQpIHtcbiAgICBzdGFydC5sID0gbCh0KTtcbiAgICBzdGFydC5hID0gYSh0KTtcbiAgICBzdGFydC5iID0gYih0KTtcbiAgICBzdGFydC5vcGFjaXR5ID0gb3BhY2l0eSh0KTtcbiAgICByZXR1cm4gc3RhcnQgKyBcIlwiO1xuICB9O1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oYSwgYikge1xuICByZXR1cm4gYSA9ICthLCBiID0gK2IsIGZ1bmN0aW9uKHQpIHtcbiAgICByZXR1cm4gYSAqICgxIC0gdCkgKyBiICogdDtcbiAgfTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGEsIGIpIHtcbiAgaWYgKCFiKSBiID0gW107XG4gIHZhciBuID0gYSA/IE1hdGgubWluKGIubGVuZ3RoLCBhLmxlbmd0aCkgOiAwLFxuICAgICAgYyA9IGIuc2xpY2UoKSxcbiAgICAgIGk7XG4gIHJldHVybiBmdW5jdGlvbih0KSB7XG4gICAgZm9yIChpID0gMDsgaSA8IG47ICsraSkgY1tpXSA9IGFbaV0gKiAoMSAtIHQpICsgYltpXSAqIHQ7XG4gICAgcmV0dXJuIGM7XG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc051bWJlckFycmF5KHgpIHtcbiAgcmV0dXJuIEFycmF5QnVmZmVyLmlzVmlldyh4KSAmJiAhKHggaW5zdGFuY2VvZiBEYXRhVmlldyk7XG59XG4iLCJpbXBvcnQgdmFsdWUgZnJvbSBcIi4vdmFsdWUuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oYSwgYikge1xuICB2YXIgaSA9IHt9LFxuICAgICAgYyA9IHt9LFxuICAgICAgaztcblxuICBpZiAoYSA9PT0gbnVsbCB8fCB0eXBlb2YgYSAhPT0gXCJvYmplY3RcIikgYSA9IHt9O1xuICBpZiAoYiA9PT0gbnVsbCB8fCB0eXBlb2YgYiAhPT0gXCJvYmplY3RcIikgYiA9IHt9O1xuXG4gIGZvciAoayBpbiBiKSB7XG4gICAgaWYgKGsgaW4gYSkge1xuICAgICAgaVtrXSA9IHZhbHVlKGFba10sIGJba10pO1xuICAgIH0gZWxzZSB7XG4gICAgICBjW2tdID0gYltrXTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24odCkge1xuICAgIGZvciAoayBpbiBpKSBjW2tdID0gaVtrXSh0KTtcbiAgICByZXR1cm4gYztcbiAgfTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHBpZWNld2lzZShpbnRlcnBvbGF0ZSwgdmFsdWVzKSB7XG4gIHZhciBpID0gMCwgbiA9IHZhbHVlcy5sZW5ndGggLSAxLCB2ID0gdmFsdWVzWzBdLCBJID0gbmV3IEFycmF5KG4gPCAwID8gMCA6IG4pO1xuICB3aGlsZSAoaSA8IG4pIElbaV0gPSBpbnRlcnBvbGF0ZSh2LCB2ID0gdmFsdWVzWysraV0pO1xuICByZXR1cm4gZnVuY3Rpb24odCkge1xuICAgIHZhciBpID0gTWF0aC5tYXgoMCwgTWF0aC5taW4obiAtIDEsIE1hdGguZmxvb3IodCAqPSBuKSkpO1xuICAgIHJldHVybiBJW2ldKHQgLSBpKTtcbiAgfTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGludGVycG9sYXRvciwgbikge1xuICB2YXIgc2FtcGxlcyA9IG5ldyBBcnJheShuKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBuOyArK2kpIHNhbXBsZXNbaV0gPSBpbnRlcnBvbGF0b3IoaSAvIChuIC0gMSkpO1xuICByZXR1cm4gc2FtcGxlcztcbn1cbiIsImltcG9ydCB7cmdiIGFzIGNvbG9yUmdifSBmcm9tIFwiZDMtY29sb3JcIjtcbmltcG9ydCBiYXNpcyBmcm9tIFwiLi9iYXNpcy5qc1wiO1xuaW1wb3J0IGJhc2lzQ2xvc2VkIGZyb20gXCIuL2Jhc2lzQ2xvc2VkLmpzXCI7XG5pbXBvcnQgbm9nYW1tYSwge2dhbW1hfSBmcm9tIFwiLi9jb2xvci5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCAoZnVuY3Rpb24gcmdiR2FtbWEoeSkge1xuICB2YXIgY29sb3IgPSBnYW1tYSh5KTtcblxuICBmdW5jdGlvbiByZ2Ioc3RhcnQsIGVuZCkge1xuICAgIHZhciByID0gY29sb3IoKHN0YXJ0ID0gY29sb3JSZ2Ioc3RhcnQpKS5yLCAoZW5kID0gY29sb3JSZ2IoZW5kKSkuciksXG4gICAgICAgIGcgPSBjb2xvcihzdGFydC5nLCBlbmQuZyksXG4gICAgICAgIGIgPSBjb2xvcihzdGFydC5iLCBlbmQuYiksXG4gICAgICAgIG9wYWNpdHkgPSBub2dhbW1hKHN0YXJ0Lm9wYWNpdHksIGVuZC5vcGFjaXR5KTtcbiAgICByZXR1cm4gZnVuY3Rpb24odCkge1xuICAgICAgc3RhcnQuciA9IHIodCk7XG4gICAgICBzdGFydC5nID0gZyh0KTtcbiAgICAgIHN0YXJ0LmIgPSBiKHQpO1xuICAgICAgc3RhcnQub3BhY2l0eSA9IG9wYWNpdHkodCk7XG4gICAgICByZXR1cm4gc3RhcnQgKyBcIlwiO1xuICAgIH07XG4gIH1cblxuICByZ2IuZ2FtbWEgPSByZ2JHYW1tYTtcblxuICByZXR1cm4gcmdiO1xufSkoMSk7XG5cbmZ1bmN0aW9uIHJnYlNwbGluZShzcGxpbmUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKGNvbG9ycykge1xuICAgIHZhciBuID0gY29sb3JzLmxlbmd0aCxcbiAgICAgICAgciA9IG5ldyBBcnJheShuKSxcbiAgICAgICAgZyA9IG5ldyBBcnJheShuKSxcbiAgICAgICAgYiA9IG5ldyBBcnJheShuKSxcbiAgICAgICAgaSwgY29sb3I7XG4gICAgZm9yIChpID0gMDsgaSA8IG47ICsraSkge1xuICAgICAgY29sb3IgPSBjb2xvclJnYihjb2xvcnNbaV0pO1xuICAgICAgcltpXSA9IGNvbG9yLnIgfHwgMDtcbiAgICAgIGdbaV0gPSBjb2xvci5nIHx8IDA7XG4gICAgICBiW2ldID0gY29sb3IuYiB8fCAwO1xuICAgIH1cbiAgICByID0gc3BsaW5lKHIpO1xuICAgIGcgPSBzcGxpbmUoZyk7XG4gICAgYiA9IHNwbGluZShiKTtcbiAgICBjb2xvci5vcGFjaXR5ID0gMTtcbiAgICByZXR1cm4gZnVuY3Rpb24odCkge1xuICAgICAgY29sb3IuciA9IHIodCk7XG4gICAgICBjb2xvci5nID0gZyh0KTtcbiAgICAgIGNvbG9yLmIgPSBiKHQpO1xuICAgICAgcmV0dXJuIGNvbG9yICsgXCJcIjtcbiAgICB9O1xuICB9O1xufVxuXG5leHBvcnQgdmFyIHJnYkJhc2lzID0gcmdiU3BsaW5lKGJhc2lzKTtcbmV4cG9ydCB2YXIgcmdiQmFzaXNDbG9zZWQgPSByZ2JTcGxpbmUoYmFzaXNDbG9zZWQpO1xuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oYSwgYikge1xuICByZXR1cm4gYSA9ICthLCBiID0gK2IsIGZ1bmN0aW9uKHQpIHtcbiAgICByZXR1cm4gTWF0aC5yb3VuZChhICogKDEgLSB0KSArIGIgKiB0KTtcbiAgfTtcbn1cbiIsImltcG9ydCBudW1iZXIgZnJvbSBcIi4vbnVtYmVyLmpzXCI7XG5cbnZhciByZUEgPSAvWy0rXT8oPzpcXGQrXFwuP1xcZCp8XFwuP1xcZCspKD86W2VFXVstK10/XFxkKyk/L2csXG4gICAgcmVCID0gbmV3IFJlZ0V4cChyZUEuc291cmNlLCBcImdcIik7XG5cbmZ1bmN0aW9uIHplcm8oYikge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGI7XG4gIH07XG59XG5cbmZ1bmN0aW9uIG9uZShiKSB7XG4gIHJldHVybiBmdW5jdGlvbih0KSB7XG4gICAgcmV0dXJuIGIodCkgKyBcIlwiO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihhLCBiKSB7XG4gIHZhciBiaSA9IHJlQS5sYXN0SW5kZXggPSByZUIubGFzdEluZGV4ID0gMCwgLy8gc2NhbiBpbmRleCBmb3IgbmV4dCBudW1iZXIgaW4gYlxuICAgICAgYW0sIC8vIGN1cnJlbnQgbWF0Y2ggaW4gYVxuICAgICAgYm0sIC8vIGN1cnJlbnQgbWF0Y2ggaW4gYlxuICAgICAgYnMsIC8vIHN0cmluZyBwcmVjZWRpbmcgY3VycmVudCBudW1iZXIgaW4gYiwgaWYgYW55XG4gICAgICBpID0gLTEsIC8vIGluZGV4IGluIHNcbiAgICAgIHMgPSBbXSwgLy8gc3RyaW5nIGNvbnN0YW50cyBhbmQgcGxhY2Vob2xkZXJzXG4gICAgICBxID0gW107IC8vIG51bWJlciBpbnRlcnBvbGF0b3JzXG5cbiAgLy8gQ29lcmNlIGlucHV0cyB0byBzdHJpbmdzLlxuICBhID0gYSArIFwiXCIsIGIgPSBiICsgXCJcIjtcblxuICAvLyBJbnRlcnBvbGF0ZSBwYWlycyBvZiBudW1iZXJzIGluIGEgJiBiLlxuICB3aGlsZSAoKGFtID0gcmVBLmV4ZWMoYSkpXG4gICAgICAmJiAoYm0gPSByZUIuZXhlYyhiKSkpIHtcbiAgICBpZiAoKGJzID0gYm0uaW5kZXgpID4gYmkpIHsgLy8gYSBzdHJpbmcgcHJlY2VkZXMgdGhlIG5leHQgbnVtYmVyIGluIGJcbiAgICAgIGJzID0gYi5zbGljZShiaSwgYnMpO1xuICAgICAgaWYgKHNbaV0pIHNbaV0gKz0gYnM7IC8vIGNvYWxlc2NlIHdpdGggcHJldmlvdXMgc3RyaW5nXG4gICAgICBlbHNlIHNbKytpXSA9IGJzO1xuICAgIH1cbiAgICBpZiAoKGFtID0gYW1bMF0pID09PSAoYm0gPSBibVswXSkpIHsgLy8gbnVtYmVycyBpbiBhICYgYiBtYXRjaFxuICAgICAgaWYgKHNbaV0pIHNbaV0gKz0gYm07IC8vIGNvYWxlc2NlIHdpdGggcHJldmlvdXMgc3RyaW5nXG4gICAgICBlbHNlIHNbKytpXSA9IGJtO1xuICAgIH0gZWxzZSB7IC8vIGludGVycG9sYXRlIG5vbi1tYXRjaGluZyBudW1iZXJzXG4gICAgICBzWysraV0gPSBudWxsO1xuICAgICAgcS5wdXNoKHtpOiBpLCB4OiBudW1iZXIoYW0sIGJtKX0pO1xuICAgIH1cbiAgICBiaSA9IHJlQi5sYXN0SW5kZXg7XG4gIH1cblxuICAvLyBBZGQgcmVtYWlucyBvZiBiLlxuICBpZiAoYmkgPCBiLmxlbmd0aCkge1xuICAgIGJzID0gYi5zbGljZShiaSk7XG4gICAgaWYgKHNbaV0pIHNbaV0gKz0gYnM7IC8vIGNvYWxlc2NlIHdpdGggcHJldmlvdXMgc3RyaW5nXG4gICAgZWxzZSBzWysraV0gPSBicztcbiAgfVxuXG4gIC8vIFNwZWNpYWwgb3B0aW1pemF0aW9uIGZvciBvbmx5IGEgc2luZ2xlIG1hdGNoLlxuICAvLyBPdGhlcndpc2UsIGludGVycG9sYXRlIGVhY2ggb2YgdGhlIG51bWJlcnMgYW5kIHJlam9pbiB0aGUgc3RyaW5nLlxuICByZXR1cm4gcy5sZW5ndGggPCAyID8gKHFbMF1cbiAgICAgID8gb25lKHFbMF0ueClcbiAgICAgIDogemVybyhiKSlcbiAgICAgIDogKGIgPSBxLmxlbmd0aCwgZnVuY3Rpb24odCkge1xuICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBvOyBpIDwgYjsgKytpKSBzWyhvID0gcVtpXSkuaV0gPSBvLngodCk7XG4gICAgICAgICAgcmV0dXJuIHMuam9pbihcIlwiKTtcbiAgICAgICAgfSk7XG59XG4iLCJ2YXIgZGVncmVlcyA9IDE4MCAvIE1hdGguUEk7XG5cbmV4cG9ydCB2YXIgaWRlbnRpdHkgPSB7XG4gIHRyYW5zbGF0ZVg6IDAsXG4gIHRyYW5zbGF0ZVk6IDAsXG4gIHJvdGF0ZTogMCxcbiAgc2tld1g6IDAsXG4gIHNjYWxlWDogMSxcbiAgc2NhbGVZOiAxXG59O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihhLCBiLCBjLCBkLCBlLCBmKSB7XG4gIHZhciBzY2FsZVgsIHNjYWxlWSwgc2tld1g7XG4gIGlmIChzY2FsZVggPSBNYXRoLnNxcnQoYSAqIGEgKyBiICogYikpIGEgLz0gc2NhbGVYLCBiIC89IHNjYWxlWDtcbiAgaWYgKHNrZXdYID0gYSAqIGMgKyBiICogZCkgYyAtPSBhICogc2tld1gsIGQgLT0gYiAqIHNrZXdYO1xuICBpZiAoc2NhbGVZID0gTWF0aC5zcXJ0KGMgKiBjICsgZCAqIGQpKSBjIC89IHNjYWxlWSwgZCAvPSBzY2FsZVksIHNrZXdYIC89IHNjYWxlWTtcbiAgaWYgKGEgKiBkIDwgYiAqIGMpIGEgPSAtYSwgYiA9IC1iLCBza2V3WCA9IC1za2V3WCwgc2NhbGVYID0gLXNjYWxlWDtcbiAgcmV0dXJuIHtcbiAgICB0cmFuc2xhdGVYOiBlLFxuICAgIHRyYW5zbGF0ZVk6IGYsXG4gICAgcm90YXRlOiBNYXRoLmF0YW4yKGIsIGEpICogZGVncmVlcyxcbiAgICBza2V3WDogTWF0aC5hdGFuKHNrZXdYKSAqIGRlZ3JlZXMsXG4gICAgc2NhbGVYOiBzY2FsZVgsXG4gICAgc2NhbGVZOiBzY2FsZVlcbiAgfTtcbn1cbiIsImltcG9ydCBudW1iZXIgZnJvbSBcIi4uL251bWJlci5qc1wiO1xuaW1wb3J0IHtwYXJzZUNzcywgcGFyc2VTdmd9IGZyb20gXCIuL3BhcnNlLmpzXCI7XG5cbmZ1bmN0aW9uIGludGVycG9sYXRlVHJhbnNmb3JtKHBhcnNlLCBweENvbW1hLCBweFBhcmVuLCBkZWdQYXJlbikge1xuXG4gIGZ1bmN0aW9uIHBvcChzKSB7XG4gICAgcmV0dXJuIHMubGVuZ3RoID8gcy5wb3AoKSArIFwiIFwiIDogXCJcIjtcbiAgfVxuXG4gIGZ1bmN0aW9uIHRyYW5zbGF0ZSh4YSwgeWEsIHhiLCB5YiwgcywgcSkge1xuICAgIGlmICh4YSAhPT0geGIgfHwgeWEgIT09IHliKSB7XG4gICAgICB2YXIgaSA9IHMucHVzaChcInRyYW5zbGF0ZShcIiwgbnVsbCwgcHhDb21tYSwgbnVsbCwgcHhQYXJlbik7XG4gICAgICBxLnB1c2goe2k6IGkgLSA0LCB4OiBudW1iZXIoeGEsIHhiKX0sIHtpOiBpIC0gMiwgeDogbnVtYmVyKHlhLCB5Yil9KTtcbiAgICB9IGVsc2UgaWYgKHhiIHx8IHliKSB7XG4gICAgICBzLnB1c2goXCJ0cmFuc2xhdGUoXCIgKyB4YiArIHB4Q29tbWEgKyB5YiArIHB4UGFyZW4pO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJvdGF0ZShhLCBiLCBzLCBxKSB7XG4gICAgaWYgKGEgIT09IGIpIHtcbiAgICAgIGlmIChhIC0gYiA+IDE4MCkgYiArPSAzNjA7IGVsc2UgaWYgKGIgLSBhID4gMTgwKSBhICs9IDM2MDsgLy8gc2hvcnRlc3QgcGF0aFxuICAgICAgcS5wdXNoKHtpOiBzLnB1c2gocG9wKHMpICsgXCJyb3RhdGUoXCIsIG51bGwsIGRlZ1BhcmVuKSAtIDIsIHg6IG51bWJlcihhLCBiKX0pO1xuICAgIH0gZWxzZSBpZiAoYikge1xuICAgICAgcy5wdXNoKHBvcChzKSArIFwicm90YXRlKFwiICsgYiArIGRlZ1BhcmVuKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBza2V3WChhLCBiLCBzLCBxKSB7XG4gICAgaWYgKGEgIT09IGIpIHtcbiAgICAgIHEucHVzaCh7aTogcy5wdXNoKHBvcChzKSArIFwic2tld1goXCIsIG51bGwsIGRlZ1BhcmVuKSAtIDIsIHg6IG51bWJlcihhLCBiKX0pO1xuICAgIH0gZWxzZSBpZiAoYikge1xuICAgICAgcy5wdXNoKHBvcChzKSArIFwic2tld1goXCIgKyBiICsgZGVnUGFyZW4pO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHNjYWxlKHhhLCB5YSwgeGIsIHliLCBzLCBxKSB7XG4gICAgaWYgKHhhICE9PSB4YiB8fCB5YSAhPT0geWIpIHtcbiAgICAgIHZhciBpID0gcy5wdXNoKHBvcChzKSArIFwic2NhbGUoXCIsIG51bGwsIFwiLFwiLCBudWxsLCBcIilcIik7XG4gICAgICBxLnB1c2goe2k6IGkgLSA0LCB4OiBudW1iZXIoeGEsIHhiKX0sIHtpOiBpIC0gMiwgeDogbnVtYmVyKHlhLCB5Yil9KTtcbiAgICB9IGVsc2UgaWYgKHhiICE9PSAxIHx8IHliICE9PSAxKSB7XG4gICAgICBzLnB1c2gocG9wKHMpICsgXCJzY2FsZShcIiArIHhiICsgXCIsXCIgKyB5YiArIFwiKVwiKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24oYSwgYikge1xuICAgIHZhciBzID0gW10sIC8vIHN0cmluZyBjb25zdGFudHMgYW5kIHBsYWNlaG9sZGVyc1xuICAgICAgICBxID0gW107IC8vIG51bWJlciBpbnRlcnBvbGF0b3JzXG4gICAgYSA9IHBhcnNlKGEpLCBiID0gcGFyc2UoYik7XG4gICAgdHJhbnNsYXRlKGEudHJhbnNsYXRlWCwgYS50cmFuc2xhdGVZLCBiLnRyYW5zbGF0ZVgsIGIudHJhbnNsYXRlWSwgcywgcSk7XG4gICAgcm90YXRlKGEucm90YXRlLCBiLnJvdGF0ZSwgcywgcSk7XG4gICAgc2tld1goYS5za2V3WCwgYi5za2V3WCwgcywgcSk7XG4gICAgc2NhbGUoYS5zY2FsZVgsIGEuc2NhbGVZLCBiLnNjYWxlWCwgYi5zY2FsZVksIHMsIHEpO1xuICAgIGEgPSBiID0gbnVsbDsgLy8gZ2NcbiAgICByZXR1cm4gZnVuY3Rpb24odCkge1xuICAgICAgdmFyIGkgPSAtMSwgbiA9IHEubGVuZ3RoLCBvO1xuICAgICAgd2hpbGUgKCsraSA8IG4pIHNbKG8gPSBxW2ldKS5pXSA9IG8ueCh0KTtcbiAgICAgIHJldHVybiBzLmpvaW4oXCJcIik7XG4gICAgfTtcbiAgfTtcbn1cblxuZXhwb3J0IHZhciBpbnRlcnBvbGF0ZVRyYW5zZm9ybUNzcyA9IGludGVycG9sYXRlVHJhbnNmb3JtKHBhcnNlQ3NzLCBcInB4LCBcIiwgXCJweClcIiwgXCJkZWcpXCIpO1xuZXhwb3J0IHZhciBpbnRlcnBvbGF0ZVRyYW5zZm9ybVN2ZyA9IGludGVycG9sYXRlVHJhbnNmb3JtKHBhcnNlU3ZnLCBcIiwgXCIsIFwiKVwiLCBcIilcIik7XG4iLCJpbXBvcnQgZGVjb21wb3NlLCB7aWRlbnRpdHl9IGZyb20gXCIuL2RlY29tcG9zZS5qc1wiO1xuXG52YXIgY3NzTm9kZSxcbiAgICBjc3NSb290LFxuICAgIGNzc1ZpZXcsXG4gICAgc3ZnTm9kZTtcblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlQ3NzKHZhbHVlKSB7XG4gIGlmICh2YWx1ZSA9PT0gXCJub25lXCIpIHJldHVybiBpZGVudGl0eTtcbiAgaWYgKCFjc3NOb2RlKSBjc3NOb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIkRJVlwiKSwgY3NzUm9vdCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCwgY3NzVmlldyA9IGRvY3VtZW50LmRlZmF1bHRWaWV3O1xuICBjc3NOb2RlLnN0eWxlLnRyYW5zZm9ybSA9IHZhbHVlO1xuICB2YWx1ZSA9IGNzc1ZpZXcuZ2V0Q29tcHV0ZWRTdHlsZShjc3NSb290LmFwcGVuZENoaWxkKGNzc05vZGUpLCBudWxsKS5nZXRQcm9wZXJ0eVZhbHVlKFwidHJhbnNmb3JtXCIpO1xuICBjc3NSb290LnJlbW92ZUNoaWxkKGNzc05vZGUpO1xuICB2YWx1ZSA9IHZhbHVlLnNsaWNlKDcsIC0xKS5zcGxpdChcIixcIik7XG4gIHJldHVybiBkZWNvbXBvc2UoK3ZhbHVlWzBdLCArdmFsdWVbMV0sICt2YWx1ZVsyXSwgK3ZhbHVlWzNdLCArdmFsdWVbNF0sICt2YWx1ZVs1XSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZVN2Zyh2YWx1ZSkge1xuICBpZiAodmFsdWUgPT0gbnVsbCkgcmV0dXJuIGlkZW50aXR5O1xuICBpZiAoIXN2Z05vZGUpIHN2Z05vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLCBcImdcIik7XG4gIHN2Z05vZGUuc2V0QXR0cmlidXRlKFwidHJhbnNmb3JtXCIsIHZhbHVlKTtcbiAgaWYgKCEodmFsdWUgPSBzdmdOb2RlLnRyYW5zZm9ybS5iYXNlVmFsLmNvbnNvbGlkYXRlKCkpKSByZXR1cm4gaWRlbnRpdHk7XG4gIHZhbHVlID0gdmFsdWUubWF0cml4O1xuICByZXR1cm4gZGVjb21wb3NlKHZhbHVlLmEsIHZhbHVlLmIsIHZhbHVlLmMsIHZhbHVlLmQsIHZhbHVlLmUsIHZhbHVlLmYpO1xufVxuIiwiaW1wb3J0IHtjb2xvcn0gZnJvbSBcImQzLWNvbG9yXCI7XG5pbXBvcnQgcmdiIGZyb20gXCIuL3JnYi5qc1wiO1xuaW1wb3J0IHtnZW5lcmljQXJyYXl9IGZyb20gXCIuL2FycmF5LmpzXCI7XG5pbXBvcnQgZGF0ZSBmcm9tIFwiLi9kYXRlLmpzXCI7XG5pbXBvcnQgbnVtYmVyIGZyb20gXCIuL251bWJlci5qc1wiO1xuaW1wb3J0IG9iamVjdCBmcm9tIFwiLi9vYmplY3QuanNcIjtcbmltcG9ydCBzdHJpbmcgZnJvbSBcIi4vc3RyaW5nLmpzXCI7XG5pbXBvcnQgY29uc3RhbnQgZnJvbSBcIi4vY29uc3RhbnQuanNcIjtcbmltcG9ydCBudW1iZXJBcnJheSwge2lzTnVtYmVyQXJyYXl9IGZyb20gXCIuL251bWJlckFycmF5LmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGEsIGIpIHtcbiAgdmFyIHQgPSB0eXBlb2YgYiwgYztcbiAgcmV0dXJuIGIgPT0gbnVsbCB8fCB0ID09PSBcImJvb2xlYW5cIiA/IGNvbnN0YW50KGIpXG4gICAgICA6ICh0ID09PSBcIm51bWJlclwiID8gbnVtYmVyXG4gICAgICA6IHQgPT09IFwic3RyaW5nXCIgPyAoKGMgPSBjb2xvcihiKSkgPyAoYiA9IGMsIHJnYikgOiBzdHJpbmcpXG4gICAgICA6IGIgaW5zdGFuY2VvZiBjb2xvciA/IHJnYlxuICAgICAgOiBiIGluc3RhbmNlb2YgRGF0ZSA/IGRhdGVcbiAgICAgIDogaXNOdW1iZXJBcnJheShiKSA/IG51bWJlckFycmF5XG4gICAgICA6IEFycmF5LmlzQXJyYXkoYikgPyBnZW5lcmljQXJyYXlcbiAgICAgIDogdHlwZW9mIGIudmFsdWVPZiAhPT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBiLnRvU3RyaW5nICE9PSBcImZ1bmN0aW9uXCIgfHwgaXNOYU4oYikgPyBvYmplY3RcbiAgICAgIDogbnVtYmVyKShhLCBiKTtcbn1cbiIsInZhciByaG8gPSBNYXRoLlNRUlQyLFxuICAgIHJobzIgPSAyLFxuICAgIHJobzQgPSA0LFxuICAgIGVwc2lsb24yID0gMWUtMTI7XG5cbmZ1bmN0aW9uIGNvc2goeCkge1xuICByZXR1cm4gKCh4ID0gTWF0aC5leHAoeCkpICsgMSAvIHgpIC8gMjtcbn1cblxuZnVuY3Rpb24gc2luaCh4KSB7XG4gIHJldHVybiAoKHggPSBNYXRoLmV4cCh4KSkgLSAxIC8geCkgLyAyO1xufVxuXG5mdW5jdGlvbiB0YW5oKHgpIHtcbiAgcmV0dXJuICgoeCA9IE1hdGguZXhwKDIgKiB4KSkgLSAxKSAvICh4ICsgMSk7XG59XG5cbi8vIHAwID0gW3V4MCwgdXkwLCB3MF1cbi8vIHAxID0gW3V4MSwgdXkxLCB3MV1cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHAwLCBwMSkge1xuICB2YXIgdXgwID0gcDBbMF0sIHV5MCA9IHAwWzFdLCB3MCA9IHAwWzJdLFxuICAgICAgdXgxID0gcDFbMF0sIHV5MSA9IHAxWzFdLCB3MSA9IHAxWzJdLFxuICAgICAgZHggPSB1eDEgLSB1eDAsXG4gICAgICBkeSA9IHV5MSAtIHV5MCxcbiAgICAgIGQyID0gZHggKiBkeCArIGR5ICogZHksXG4gICAgICBpLFxuICAgICAgUztcblxuICAvLyBTcGVjaWFsIGNhc2UgZm9yIHUwIOKJhSB1MS5cbiAgaWYgKGQyIDwgZXBzaWxvbjIpIHtcbiAgICBTID0gTWF0aC5sb2codzEgLyB3MCkgLyByaG87XG4gICAgaSA9IGZ1bmN0aW9uKHQpIHtcbiAgICAgIHJldHVybiBbXG4gICAgICAgIHV4MCArIHQgKiBkeCxcbiAgICAgICAgdXkwICsgdCAqIGR5LFxuICAgICAgICB3MCAqIE1hdGguZXhwKHJobyAqIHQgKiBTKVxuICAgICAgXTtcbiAgICB9XG4gIH1cblxuICAvLyBHZW5lcmFsIGNhc2UuXG4gIGVsc2Uge1xuICAgIHZhciBkMSA9IE1hdGguc3FydChkMiksXG4gICAgICAgIGIwID0gKHcxICogdzEgLSB3MCAqIHcwICsgcmhvNCAqIGQyKSAvICgyICogdzAgKiByaG8yICogZDEpLFxuICAgICAgICBiMSA9ICh3MSAqIHcxIC0gdzAgKiB3MCAtIHJobzQgKiBkMikgLyAoMiAqIHcxICogcmhvMiAqIGQxKSxcbiAgICAgICAgcjAgPSBNYXRoLmxvZyhNYXRoLnNxcnQoYjAgKiBiMCArIDEpIC0gYjApLFxuICAgICAgICByMSA9IE1hdGgubG9nKE1hdGguc3FydChiMSAqIGIxICsgMSkgLSBiMSk7XG4gICAgUyA9IChyMSAtIHIwKSAvIHJobztcbiAgICBpID0gZnVuY3Rpb24odCkge1xuICAgICAgdmFyIHMgPSB0ICogUyxcbiAgICAgICAgICBjb3NocjAgPSBjb3NoKHIwKSxcbiAgICAgICAgICB1ID0gdzAgLyAocmhvMiAqIGQxKSAqIChjb3NocjAgKiB0YW5oKHJobyAqIHMgKyByMCkgLSBzaW5oKHIwKSk7XG4gICAgICByZXR1cm4gW1xuICAgICAgICB1eDAgKyB1ICogZHgsXG4gICAgICAgIHV5MCArIHUgKiBkeSxcbiAgICAgICAgdzAgKiBjb3NocjAgLyBjb3NoKHJobyAqIHMgKyByMClcbiAgICAgIF07XG4gICAgfVxuICB9XG5cbiAgaS5kdXJhdGlvbiA9IFMgKiAxMDAwO1xuXG4gIHJldHVybiBpO1xufVxuIiwiaW1wb3J0IGNvbG9ycyBmcm9tIFwiLi4vY29sb3JzLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNvbG9ycyhcIjdmYzk3ZmJlYWVkNGZkYzA4NmZmZmY5OTM4NmNiMGYwMDI3ZmJmNWIxNzY2NjY2NlwiKTtcbiIsImltcG9ydCBjb2xvcnMgZnJvbSBcIi4uL2NvbG9ycy5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjb2xvcnMoXCIxYjllNzdkOTVmMDI3NTcwYjNlNzI5OGE2NmE2MWVlNmFiMDJhNjc2MWQ2NjY2NjZcIik7XG4iLCJpbXBvcnQgY29sb3JzIGZyb20gXCIuLi9jb2xvcnMuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY29sb3JzKFwiYTZjZWUzMWY3OGI0YjJkZjhhMzNhMDJjZmI5YTk5ZTMxYTFjZmRiZjZmZmY3ZjAwY2FiMmQ2NmEzZDlhZmZmZjk5YjE1OTI4XCIpO1xuIiwiaW1wb3J0IGNvbG9ycyBmcm9tIFwiLi4vY29sb3JzLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNvbG9ycyhcImZiYjRhZWIzY2RlM2NjZWJjNWRlY2JlNGZlZDlhNmZmZmZjY2U1ZDhiZGZkZGFlY2YyZjJmMlwiKTtcbiIsImltcG9ydCBjb2xvcnMgZnJvbSBcIi4uL2NvbG9ycy5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjb2xvcnMoXCJiM2UyY2RmZGNkYWNjYmQ1ZThmNGNhZTRlNmY1YzlmZmYyYWVmMWUyY2NjY2NjY2NcIik7XG4iLCJpbXBvcnQgY29sb3JzIGZyb20gXCIuLi9jb2xvcnMuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY29sb3JzKFwiZTQxYTFjMzc3ZWI4NGRhZjRhOTg0ZWEzZmY3ZjAwZmZmZjMzYTY1NjI4Zjc4MWJmOTk5OTk5XCIpO1xuIiwiaW1wb3J0IGNvbG9ycyBmcm9tIFwiLi4vY29sb3JzLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNvbG9ycyhcIjY2YzJhNWZjOGQ2MjhkYTBjYmU3OGFjM2E2ZDg1NGZmZDkyZmU1YzQ5NGIzYjNiM1wiKTtcbiIsImltcG9ydCBjb2xvcnMgZnJvbSBcIi4uL2NvbG9ycy5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjb2xvcnMoXCI4ZGQzYzdmZmZmYjNiZWJhZGFmYjgwNzI4MGIxZDNmZGI0NjJiM2RlNjlmY2NkZTVkOWQ5ZDliYzgwYmRjY2ViYzVmZmVkNmZcIik7XG4iLCJpbXBvcnQgY29sb3JzIGZyb20gXCIuLi9jb2xvcnMuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY29sb3JzKFwiNGU3OWE3ZjI4ZTJjZTE1NzU5NzZiN2IyNTlhMTRmZWRjOTQ5YWY3YWExZmY5ZGE3OWM3NTVmYmFiMGFiXCIpO1xuIiwiaW1wb3J0IGNvbG9ycyBmcm9tIFwiLi4vY29sb3JzLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNvbG9ycyhcIjFmNzdiNGZmN2YwZTJjYTAyY2Q2MjcyODk0NjdiZDhjNTY0YmUzNzdjMjdmN2Y3ZmJjYmQyMjE3YmVjZlwiKTtcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHNwZWNpZmllcikge1xuICB2YXIgbiA9IHNwZWNpZmllci5sZW5ndGggLyA2IHwgMCwgY29sb3JzID0gbmV3IEFycmF5KG4pLCBpID0gMDtcbiAgd2hpbGUgKGkgPCBuKSBjb2xvcnNbaV0gPSBcIiNcIiArIHNwZWNpZmllci5zbGljZShpICogNiwgKytpICogNik7XG4gIHJldHVybiBjb2xvcnM7XG59XG4iLCJpbXBvcnQgY29sb3JzIGZyb20gXCIuLi9jb2xvcnMuanNcIjtcbmltcG9ydCByYW1wIGZyb20gXCIuLi9yYW1wLmpzXCI7XG5cbmV4cG9ydCB2YXIgc2NoZW1lID0gbmV3IEFycmF5KDMpLmNvbmNhdChcbiAgXCJkOGIzNjVmNWY1ZjU1YWI0YWNcIixcbiAgXCJhNjYxMWFkZmMyN2Q4MGNkYzEwMTg1NzFcIixcbiAgXCJhNjYxMWFkZmMyN2RmNWY1ZjU4MGNkYzEwMTg1NzFcIixcbiAgXCI4YzUxMGFkOGIzNjVmNmU4YzNjN2VhZTU1YWI0YWMwMTY2NWVcIixcbiAgXCI4YzUxMGFkOGIzNjVmNmU4YzNmNWY1ZjVjN2VhZTU1YWI0YWMwMTY2NWVcIixcbiAgXCI4YzUxMGFiZjgxMmRkZmMyN2RmNmU4YzNjN2VhZTU4MGNkYzEzNTk3OGYwMTY2NWVcIixcbiAgXCI4YzUxMGFiZjgxMmRkZmMyN2RmNmU4YzNmNWY1ZjVjN2VhZTU4MGNkYzEzNTk3OGYwMTY2NWVcIixcbiAgXCI1NDMwMDU4YzUxMGFiZjgxMmRkZmMyN2RmNmU4YzNjN2VhZTU4MGNkYzEzNTk3OGYwMTY2NWUwMDNjMzBcIixcbiAgXCI1NDMwMDU4YzUxMGFiZjgxMmRkZmMyN2RmNmU4YzNmNWY1ZjVjN2VhZTU4MGNkYzEzNTk3OGYwMTY2NWUwMDNjMzBcIlxuKS5tYXAoY29sb3JzKTtcblxuZXhwb3J0IGRlZmF1bHQgcmFtcChzY2hlbWUpO1xuIiwiaW1wb3J0IGNvbG9ycyBmcm9tIFwiLi4vY29sb3JzLmpzXCI7XG5pbXBvcnQgcmFtcCBmcm9tIFwiLi4vcmFtcC5qc1wiO1xuXG5leHBvcnQgdmFyIHNjaGVtZSA9IG5ldyBBcnJheSgzKS5jb25jYXQoXG4gIFwiYWY4ZGMzZjdmN2Y3N2ZiZjdiXCIsXG4gIFwiN2IzMjk0YzJhNWNmYTZkYmEwMDA4ODM3XCIsXG4gIFwiN2IzMjk0YzJhNWNmZjdmN2Y3YTZkYmEwMDA4ODM3XCIsXG4gIFwiNzYyYTgzYWY4ZGMzZTdkNGU4ZDlmMGQzN2ZiZjdiMWI3ODM3XCIsXG4gIFwiNzYyYTgzYWY4ZGMzZTdkNGU4ZjdmN2Y3ZDlmMGQzN2ZiZjdiMWI3ODM3XCIsXG4gIFwiNzYyYTgzOTk3MGFiYzJhNWNmZTdkNGU4ZDlmMGQzYTZkYmEwNWFhZTYxMWI3ODM3XCIsXG4gIFwiNzYyYTgzOTk3MGFiYzJhNWNmZTdkNGU4ZjdmN2Y3ZDlmMGQzYTZkYmEwNWFhZTYxMWI3ODM3XCIsXG4gIFwiNDAwMDRiNzYyYTgzOTk3MGFiYzJhNWNmZTdkNGU4ZDlmMGQzYTZkYmEwNWFhZTYxMWI3ODM3MDA0NDFiXCIsXG4gIFwiNDAwMDRiNzYyYTgzOTk3MGFiYzJhNWNmZTdkNGU4ZjdmN2Y3ZDlmMGQzYTZkYmEwNWFhZTYxMWI3ODM3MDA0NDFiXCJcbikubWFwKGNvbG9ycyk7XG5cbmV4cG9ydCBkZWZhdWx0IHJhbXAoc2NoZW1lKTtcbiIsImltcG9ydCBjb2xvcnMgZnJvbSBcIi4uL2NvbG9ycy5qc1wiO1xuaW1wb3J0IHJhbXAgZnJvbSBcIi4uL3JhbXAuanNcIjtcblxuZXhwb3J0IHZhciBzY2hlbWUgPSBuZXcgQXJyYXkoMykuY29uY2F0KFxuICBcImU5YTNjOWY3ZjdmN2ExZDc2YVwiLFxuICBcImQwMWM4YmYxYjZkYWI4ZTE4NjRkYWMyNlwiLFxuICBcImQwMWM4YmYxYjZkYWY3ZjdmN2I4ZTE4NjRkYWMyNlwiLFxuICBcImM1MWI3ZGU5YTNjOWZkZTBlZmU2ZjVkMGExZDc2YTRkOTIyMVwiLFxuICBcImM1MWI3ZGU5YTNjOWZkZTBlZmY3ZjdmN2U2ZjVkMGExZDc2YTRkOTIyMVwiLFxuICBcImM1MWI3ZGRlNzdhZWYxYjZkYWZkZTBlZmU2ZjVkMGI4ZTE4NjdmYmM0MTRkOTIyMVwiLFxuICBcImM1MWI3ZGRlNzdhZWYxYjZkYWZkZTBlZmY3ZjdmN2U2ZjVkMGI4ZTE4NjdmYmM0MTRkOTIyMVwiLFxuICBcIjhlMDE1MmM1MWI3ZGRlNzdhZWYxYjZkYWZkZTBlZmU2ZjVkMGI4ZTE4NjdmYmM0MTRkOTIyMTI3NjQxOVwiLFxuICBcIjhlMDE1MmM1MWI3ZGRlNzdhZWYxYjZkYWZkZTBlZmY3ZjdmN2U2ZjVkMGI4ZTE4NjdmYmM0MTRkOTIyMTI3NjQxOVwiXG4pLm1hcChjb2xvcnMpO1xuXG5leHBvcnQgZGVmYXVsdCByYW1wKHNjaGVtZSk7XG4iLCJpbXBvcnQgY29sb3JzIGZyb20gXCIuLi9jb2xvcnMuanNcIjtcbmltcG9ydCByYW1wIGZyb20gXCIuLi9yYW1wLmpzXCI7XG5cbmV4cG9ydCB2YXIgc2NoZW1lID0gbmV3IEFycmF5KDMpLmNvbmNhdChcbiAgXCI5OThlYzNmN2Y3ZjdmMWEzNDBcIixcbiAgXCI1ZTNjOTliMmFiZDJmZGI4NjNlNjYxMDFcIixcbiAgXCI1ZTNjOTliMmFiZDJmN2Y3ZjdmZGI4NjNlNjYxMDFcIixcbiAgXCI1NDI3ODg5OThlYzNkOGRhZWJmZWUwYjZmMWEzNDBiMzU4MDZcIixcbiAgXCI1NDI3ODg5OThlYzNkOGRhZWJmN2Y3ZjdmZWUwYjZmMWEzNDBiMzU4MDZcIixcbiAgXCI1NDI3ODg4MDczYWNiMmFiZDJkOGRhZWJmZWUwYjZmZGI4NjNlMDgyMTRiMzU4MDZcIixcbiAgXCI1NDI3ODg4MDczYWNiMmFiZDJkOGRhZWJmN2Y3ZjdmZWUwYjZmZGI4NjNlMDgyMTRiMzU4MDZcIixcbiAgXCIyZDAwNGI1NDI3ODg4MDczYWNiMmFiZDJkOGRhZWJmZWUwYjZmZGI4NjNlMDgyMTRiMzU4MDY3ZjNiMDhcIixcbiAgXCIyZDAwNGI1NDI3ODg4MDczYWNiMmFiZDJkOGRhZWJmN2Y3ZjdmZWUwYjZmZGI4NjNlMDgyMTRiMzU4MDY3ZjNiMDhcIlxuKS5tYXAoY29sb3JzKTtcblxuZXhwb3J0IGRlZmF1bHQgcmFtcChzY2hlbWUpO1xuIiwiaW1wb3J0IGNvbG9ycyBmcm9tIFwiLi4vY29sb3JzLmpzXCI7XG5pbXBvcnQgcmFtcCBmcm9tIFwiLi4vcmFtcC5qc1wiO1xuXG5leHBvcnQgdmFyIHNjaGVtZSA9IG5ldyBBcnJheSgzKS5jb25jYXQoXG4gIFwiZWY4YTYyZjdmN2Y3NjdhOWNmXCIsXG4gIFwiY2EwMDIwZjRhNTgyOTJjNWRlMDU3MWIwXCIsXG4gIFwiY2EwMDIwZjRhNTgyZjdmN2Y3OTJjNWRlMDU3MWIwXCIsXG4gIFwiYjIxODJiZWY4YTYyZmRkYmM3ZDFlNWYwNjdhOWNmMjE2NmFjXCIsXG4gIFwiYjIxODJiZWY4YTYyZmRkYmM3ZjdmN2Y3ZDFlNWYwNjdhOWNmMjE2NmFjXCIsXG4gIFwiYjIxODJiZDY2MDRkZjRhNTgyZmRkYmM3ZDFlNWYwOTJjNWRlNDM5M2MzMjE2NmFjXCIsXG4gIFwiYjIxODJiZDY2MDRkZjRhNTgyZmRkYmM3ZjdmN2Y3ZDFlNWYwOTJjNWRlNDM5M2MzMjE2NmFjXCIsXG4gIFwiNjcwMDFmYjIxODJiZDY2MDRkZjRhNTgyZmRkYmM3ZDFlNWYwOTJjNWRlNDM5M2MzMjE2NmFjMDUzMDYxXCIsXG4gIFwiNjcwMDFmYjIxODJiZDY2MDRkZjRhNTgyZmRkYmM3ZjdmN2Y3ZDFlNWYwOTJjNWRlNDM5M2MzMjE2NmFjMDUzMDYxXCJcbikubWFwKGNvbG9ycyk7XG5cbmV4cG9ydCBkZWZhdWx0IHJhbXAoc2NoZW1lKTtcbiIsImltcG9ydCBjb2xvcnMgZnJvbSBcIi4uL2NvbG9ycy5qc1wiO1xuaW1wb3J0IHJhbXAgZnJvbSBcIi4uL3JhbXAuanNcIjtcblxuZXhwb3J0IHZhciBzY2hlbWUgPSBuZXcgQXJyYXkoMykuY29uY2F0KFxuICBcImVmOGE2MmZmZmZmZjk5OTk5OVwiLFxuICBcImNhMDAyMGY0YTU4MmJhYmFiYTQwNDA0MFwiLFxuICBcImNhMDAyMGY0YTU4MmZmZmZmZmJhYmFiYTQwNDA0MFwiLFxuICBcImIyMTgyYmVmOGE2MmZkZGJjN2UwZTBlMDk5OTk5OTRkNGQ0ZFwiLFxuICBcImIyMTgyYmVmOGE2MmZkZGJjN2ZmZmZmZmUwZTBlMDk5OTk5OTRkNGQ0ZFwiLFxuICBcImIyMTgyYmQ2NjA0ZGY0YTU4MmZkZGJjN2UwZTBlMGJhYmFiYTg3ODc4NzRkNGQ0ZFwiLFxuICBcImIyMTgyYmQ2NjA0ZGY0YTU4MmZkZGJjN2ZmZmZmZmUwZTBlMGJhYmFiYTg3ODc4NzRkNGQ0ZFwiLFxuICBcIjY3MDAxZmIyMTgyYmQ2NjA0ZGY0YTU4MmZkZGJjN2UwZTBlMGJhYmFiYTg3ODc4NzRkNGQ0ZDFhMWExYVwiLFxuICBcIjY3MDAxZmIyMTgyYmQ2NjA0ZGY0YTU4MmZkZGJjN2ZmZmZmZmUwZTBlMGJhYmFiYTg3ODc4NzRkNGQ0ZDFhMWExYVwiXG4pLm1hcChjb2xvcnMpO1xuXG5leHBvcnQgZGVmYXVsdCByYW1wKHNjaGVtZSk7XG4iLCJpbXBvcnQgY29sb3JzIGZyb20gXCIuLi9jb2xvcnMuanNcIjtcbmltcG9ydCByYW1wIGZyb20gXCIuLi9yYW1wLmpzXCI7XG5cbmV4cG9ydCB2YXIgc2NoZW1lID0gbmV3IEFycmF5KDMpLmNvbmNhdChcbiAgXCJmYzhkNTlmZmZmYmY5MWJmZGJcIixcbiAgXCJkNzE5MWNmZGFlNjFhYmQ5ZTkyYzdiYjZcIixcbiAgXCJkNzE5MWNmZGFlNjFmZmZmYmZhYmQ5ZTkyYzdiYjZcIixcbiAgXCJkNzMwMjdmYzhkNTlmZWUwOTBlMGYzZjg5MWJmZGI0NTc1YjRcIixcbiAgXCJkNzMwMjdmYzhkNTlmZWUwOTBmZmZmYmZlMGYzZjg5MWJmZGI0NTc1YjRcIixcbiAgXCJkNzMwMjdmNDZkNDNmZGFlNjFmZWUwOTBlMGYzZjhhYmQ5ZTk3NGFkZDE0NTc1YjRcIixcbiAgXCJkNzMwMjdmNDZkNDNmZGFlNjFmZWUwOTBmZmZmYmZlMGYzZjhhYmQ5ZTk3NGFkZDE0NTc1YjRcIixcbiAgXCJhNTAwMjZkNzMwMjdmNDZkNDNmZGFlNjFmZWUwOTBlMGYzZjhhYmQ5ZTk3NGFkZDE0NTc1YjQzMTM2OTVcIixcbiAgXCJhNTAwMjZkNzMwMjdmNDZkNDNmZGFlNjFmZWUwOTBmZmZmYmZlMGYzZjhhYmQ5ZTk3NGFkZDE0NTc1YjQzMTM2OTVcIlxuKS5tYXAoY29sb3JzKTtcblxuZXhwb3J0IGRlZmF1bHQgcmFtcChzY2hlbWUpO1xuIiwiaW1wb3J0IGNvbG9ycyBmcm9tIFwiLi4vY29sb3JzLmpzXCI7XG5pbXBvcnQgcmFtcCBmcm9tIFwiLi4vcmFtcC5qc1wiO1xuXG5leHBvcnQgdmFyIHNjaGVtZSA9IG5ldyBBcnJheSgzKS5jb25jYXQoXG4gIFwiZmM4ZDU5ZmZmZmJmOTFjZjYwXCIsXG4gIFwiZDcxOTFjZmRhZTYxYTZkOTZhMWE5NjQxXCIsXG4gIFwiZDcxOTFjZmRhZTYxZmZmZmJmYTZkOTZhMWE5NjQxXCIsXG4gIFwiZDczMDI3ZmM4ZDU5ZmVlMDhiZDllZjhiOTFjZjYwMWE5ODUwXCIsXG4gIFwiZDczMDI3ZmM4ZDU5ZmVlMDhiZmZmZmJmZDllZjhiOTFjZjYwMWE5ODUwXCIsXG4gIFwiZDczMDI3ZjQ2ZDQzZmRhZTYxZmVlMDhiZDllZjhiYTZkOTZhNjZiZDYzMWE5ODUwXCIsXG4gIFwiZDczMDI3ZjQ2ZDQzZmRhZTYxZmVlMDhiZmZmZmJmZDllZjhiYTZkOTZhNjZiZDYzMWE5ODUwXCIsXG4gIFwiYTUwMDI2ZDczMDI3ZjQ2ZDQzZmRhZTYxZmVlMDhiZDllZjhiYTZkOTZhNjZiZDYzMWE5ODUwMDA2ODM3XCIsXG4gIFwiYTUwMDI2ZDczMDI3ZjQ2ZDQzZmRhZTYxZmVlMDhiZmZmZmJmZDllZjhiYTZkOTZhNjZiZDYzMWE5ODUwMDA2ODM3XCJcbikubWFwKGNvbG9ycyk7XG5cbmV4cG9ydCBkZWZhdWx0IHJhbXAoc2NoZW1lKTtcbiIsImltcG9ydCBjb2xvcnMgZnJvbSBcIi4uL2NvbG9ycy5qc1wiO1xuaW1wb3J0IHJhbXAgZnJvbSBcIi4uL3JhbXAuanNcIjtcblxuZXhwb3J0IHZhciBzY2hlbWUgPSBuZXcgQXJyYXkoMykuY29uY2F0KFxuICBcImZjOGQ1OWZmZmZiZjk5ZDU5NFwiLFxuICBcImQ3MTkxY2ZkYWU2MWFiZGRhNDJiODNiYVwiLFxuICBcImQ3MTkxY2ZkYWU2MWZmZmZiZmFiZGRhNDJiODNiYVwiLFxuICBcImQ1M2U0ZmZjOGQ1OWZlZTA4YmU2ZjU5ODk5ZDU5NDMyODhiZFwiLFxuICBcImQ1M2U0ZmZjOGQ1OWZlZTA4YmZmZmZiZmU2ZjU5ODk5ZDU5NDMyODhiZFwiLFxuICBcImQ1M2U0ZmY0NmQ0M2ZkYWU2MWZlZTA4YmU2ZjU5OGFiZGRhNDY2YzJhNTMyODhiZFwiLFxuICBcImQ1M2U0ZmY0NmQ0M2ZkYWU2MWZlZTA4YmZmZmZiZmU2ZjU5OGFiZGRhNDY2YzJhNTMyODhiZFwiLFxuICBcIjllMDE0MmQ1M2U0ZmY0NmQ0M2ZkYWU2MWZlZTA4YmU2ZjU5OGFiZGRhNDY2YzJhNTMyODhiZDVlNGZhMlwiLFxuICBcIjllMDE0MmQ1M2U0ZmY0NmQ0M2ZkYWU2MWZlZTA4YmZmZmZiZmU2ZjU5OGFiZGRhNDY2YzJhNTMyODhiZDVlNGZhMlwiXG4pLm1hcChjb2xvcnMpO1xuXG5leHBvcnQgZGVmYXVsdCByYW1wKHNjaGVtZSk7XG4iLCJleHBvcnQge2RlZmF1bHQgYXMgc2NoZW1lQ2F0ZWdvcnkxMH0gZnJvbSBcIi4vY2F0ZWdvcmljYWwvY2F0ZWdvcnkxMC5qc1wiO1xuZXhwb3J0IHtkZWZhdWx0IGFzIHNjaGVtZUFjY2VudH0gZnJvbSBcIi4vY2F0ZWdvcmljYWwvQWNjZW50LmpzXCI7XG5leHBvcnQge2RlZmF1bHQgYXMgc2NoZW1lRGFyazJ9IGZyb20gXCIuL2NhdGVnb3JpY2FsL0RhcmsyLmpzXCI7XG5leHBvcnQge2RlZmF1bHQgYXMgc2NoZW1lUGFpcmVkfSBmcm9tIFwiLi9jYXRlZ29yaWNhbC9QYWlyZWQuanNcIjtcbmV4cG9ydCB7ZGVmYXVsdCBhcyBzY2hlbWVQYXN0ZWwxfSBmcm9tIFwiLi9jYXRlZ29yaWNhbC9QYXN0ZWwxLmpzXCI7XG5leHBvcnQge2RlZmF1bHQgYXMgc2NoZW1lUGFzdGVsMn0gZnJvbSBcIi4vY2F0ZWdvcmljYWwvUGFzdGVsMi5qc1wiO1xuZXhwb3J0IHtkZWZhdWx0IGFzIHNjaGVtZVNldDF9IGZyb20gXCIuL2NhdGVnb3JpY2FsL1NldDEuanNcIjtcbmV4cG9ydCB7ZGVmYXVsdCBhcyBzY2hlbWVTZXQyfSBmcm9tIFwiLi9jYXRlZ29yaWNhbC9TZXQyLmpzXCI7XG5leHBvcnQge2RlZmF1bHQgYXMgc2NoZW1lU2V0M30gZnJvbSBcIi4vY2F0ZWdvcmljYWwvU2V0My5qc1wiO1xuZXhwb3J0IHtkZWZhdWx0IGFzIHNjaGVtZVRhYmxlYXUxMH0gZnJvbSBcIi4vY2F0ZWdvcmljYWwvVGFibGVhdTEwLmpzXCI7XG5leHBvcnQge2RlZmF1bHQgYXMgaW50ZXJwb2xhdGVCckJHLCBzY2hlbWUgYXMgc2NoZW1lQnJCR30gZnJvbSBcIi4vZGl2ZXJnaW5nL0JyQkcuanNcIjtcbmV4cG9ydCB7ZGVmYXVsdCBhcyBpbnRlcnBvbGF0ZVBSR24sIHNjaGVtZSBhcyBzY2hlbWVQUkdufSBmcm9tIFwiLi9kaXZlcmdpbmcvUFJHbi5qc1wiO1xuZXhwb3J0IHtkZWZhdWx0IGFzIGludGVycG9sYXRlUGlZRywgc2NoZW1lIGFzIHNjaGVtZVBpWUd9IGZyb20gXCIuL2RpdmVyZ2luZy9QaVlHLmpzXCI7XG5leHBvcnQge2RlZmF1bHQgYXMgaW50ZXJwb2xhdGVQdU9yLCBzY2hlbWUgYXMgc2NoZW1lUHVPcn0gZnJvbSBcIi4vZGl2ZXJnaW5nL1B1T3IuanNcIjtcbmV4cG9ydCB7ZGVmYXVsdCBhcyBpbnRlcnBvbGF0ZVJkQnUsIHNjaGVtZSBhcyBzY2hlbWVSZEJ1fSBmcm9tIFwiLi9kaXZlcmdpbmcvUmRCdS5qc1wiO1xuZXhwb3J0IHtkZWZhdWx0IGFzIGludGVycG9sYXRlUmRHeSwgc2NoZW1lIGFzIHNjaGVtZVJkR3l9IGZyb20gXCIuL2RpdmVyZ2luZy9SZEd5LmpzXCI7XG5leHBvcnQge2RlZmF1bHQgYXMgaW50ZXJwb2xhdGVSZFlsQnUsIHNjaGVtZSBhcyBzY2hlbWVSZFlsQnV9IGZyb20gXCIuL2RpdmVyZ2luZy9SZFlsQnUuanNcIjtcbmV4cG9ydCB7ZGVmYXVsdCBhcyBpbnRlcnBvbGF0ZVJkWWxHbiwgc2NoZW1lIGFzIHNjaGVtZVJkWWxHbn0gZnJvbSBcIi4vZGl2ZXJnaW5nL1JkWWxHbi5qc1wiO1xuZXhwb3J0IHtkZWZhdWx0IGFzIGludGVycG9sYXRlU3BlY3RyYWwsIHNjaGVtZSBhcyBzY2hlbWVTcGVjdHJhbH0gZnJvbSBcIi4vZGl2ZXJnaW5nL1NwZWN0cmFsLmpzXCI7XG5leHBvcnQge2RlZmF1bHQgYXMgaW50ZXJwb2xhdGVCdUduLCBzY2hlbWUgYXMgc2NoZW1lQnVHbn0gZnJvbSBcIi4vc2VxdWVudGlhbC1tdWx0aS9CdUduLmpzXCI7XG5leHBvcnQge2RlZmF1bHQgYXMgaW50ZXJwb2xhdGVCdVB1LCBzY2hlbWUgYXMgc2NoZW1lQnVQdX0gZnJvbSBcIi4vc2VxdWVudGlhbC1tdWx0aS9CdVB1LmpzXCI7XG5leHBvcnQge2RlZmF1bHQgYXMgaW50ZXJwb2xhdGVHbkJ1LCBzY2hlbWUgYXMgc2NoZW1lR25CdX0gZnJvbSBcIi4vc2VxdWVudGlhbC1tdWx0aS9HbkJ1LmpzXCI7XG5leHBvcnQge2RlZmF1bHQgYXMgaW50ZXJwb2xhdGVPclJkLCBzY2hlbWUgYXMgc2NoZW1lT3JSZH0gZnJvbSBcIi4vc2VxdWVudGlhbC1tdWx0aS9PclJkLmpzXCI7XG5leHBvcnQge2RlZmF1bHQgYXMgaW50ZXJwb2xhdGVQdUJ1R24sIHNjaGVtZSBhcyBzY2hlbWVQdUJ1R259IGZyb20gXCIuL3NlcXVlbnRpYWwtbXVsdGkvUHVCdUduLmpzXCI7XG5leHBvcnQge2RlZmF1bHQgYXMgaW50ZXJwb2xhdGVQdUJ1LCBzY2hlbWUgYXMgc2NoZW1lUHVCdX0gZnJvbSBcIi4vc2VxdWVudGlhbC1tdWx0aS9QdUJ1LmpzXCI7XG5leHBvcnQge2RlZmF1bHQgYXMgaW50ZXJwb2xhdGVQdVJkLCBzY2hlbWUgYXMgc2NoZW1lUHVSZH0gZnJvbSBcIi4vc2VxdWVudGlhbC1tdWx0aS9QdVJkLmpzXCI7XG5leHBvcnQge2RlZmF1bHQgYXMgaW50ZXJwb2xhdGVSZFB1LCBzY2hlbWUgYXMgc2NoZW1lUmRQdX0gZnJvbSBcIi4vc2VxdWVudGlhbC1tdWx0aS9SZFB1LmpzXCI7XG5leHBvcnQge2RlZmF1bHQgYXMgaW50ZXJwb2xhdGVZbEduQnUsIHNjaGVtZSBhcyBzY2hlbWVZbEduQnV9IGZyb20gXCIuL3NlcXVlbnRpYWwtbXVsdGkvWWxHbkJ1LmpzXCI7XG5leHBvcnQge2RlZmF1bHQgYXMgaW50ZXJwb2xhdGVZbEduLCBzY2hlbWUgYXMgc2NoZW1lWWxHbn0gZnJvbSBcIi4vc2VxdWVudGlhbC1tdWx0aS9ZbEduLmpzXCI7XG5leHBvcnQge2RlZmF1bHQgYXMgaW50ZXJwb2xhdGVZbE9yQnIsIHNjaGVtZSBhcyBzY2hlbWVZbE9yQnJ9IGZyb20gXCIuL3NlcXVlbnRpYWwtbXVsdGkvWWxPckJyLmpzXCI7XG5leHBvcnQge2RlZmF1bHQgYXMgaW50ZXJwb2xhdGVZbE9yUmQsIHNjaGVtZSBhcyBzY2hlbWVZbE9yUmR9IGZyb20gXCIuL3NlcXVlbnRpYWwtbXVsdGkvWWxPclJkLmpzXCI7XG5leHBvcnQge2RlZmF1bHQgYXMgaW50ZXJwb2xhdGVCbHVlcywgc2NoZW1lIGFzIHNjaGVtZUJsdWVzfSBmcm9tIFwiLi9zZXF1ZW50aWFsLXNpbmdsZS9CbHVlcy5qc1wiO1xuZXhwb3J0IHtkZWZhdWx0IGFzIGludGVycG9sYXRlR3JlZW5zLCBzY2hlbWUgYXMgc2NoZW1lR3JlZW5zfSBmcm9tIFwiLi9zZXF1ZW50aWFsLXNpbmdsZS9HcmVlbnMuanNcIjtcbmV4cG9ydCB7ZGVmYXVsdCBhcyBpbnRlcnBvbGF0ZUdyZXlzLCBzY2hlbWUgYXMgc2NoZW1lR3JleXN9IGZyb20gXCIuL3NlcXVlbnRpYWwtc2luZ2xlL0dyZXlzLmpzXCI7XG5leHBvcnQge2RlZmF1bHQgYXMgaW50ZXJwb2xhdGVQdXJwbGVzLCBzY2hlbWUgYXMgc2NoZW1lUHVycGxlc30gZnJvbSBcIi4vc2VxdWVudGlhbC1zaW5nbGUvUHVycGxlcy5qc1wiO1xuZXhwb3J0IHtkZWZhdWx0IGFzIGludGVycG9sYXRlUmVkcywgc2NoZW1lIGFzIHNjaGVtZVJlZHN9IGZyb20gXCIuL3NlcXVlbnRpYWwtc2luZ2xlL1JlZHMuanNcIjtcbmV4cG9ydCB7ZGVmYXVsdCBhcyBpbnRlcnBvbGF0ZU9yYW5nZXMsIHNjaGVtZSBhcyBzY2hlbWVPcmFuZ2VzfSBmcm9tIFwiLi9zZXF1ZW50aWFsLXNpbmdsZS9PcmFuZ2VzLmpzXCI7XG5leHBvcnQge2RlZmF1bHQgYXMgaW50ZXJwb2xhdGVDaXZpZGlzfSBmcm9tIFwiLi9zZXF1ZW50aWFsLW11bHRpL2NpdmlkaXMuanNcIjtcbmV4cG9ydCB7ZGVmYXVsdCBhcyBpbnRlcnBvbGF0ZUN1YmVoZWxpeERlZmF1bHR9IGZyb20gXCIuL3NlcXVlbnRpYWwtbXVsdGkvY3ViZWhlbGl4LmpzXCI7XG5leHBvcnQge2RlZmF1bHQgYXMgaW50ZXJwb2xhdGVSYWluYm93LCB3YXJtIGFzIGludGVycG9sYXRlV2FybSwgY29vbCBhcyBpbnRlcnBvbGF0ZUNvb2x9IGZyb20gXCIuL3NlcXVlbnRpYWwtbXVsdGkvcmFpbmJvdy5qc1wiO1xuZXhwb3J0IHtkZWZhdWx0IGFzIGludGVycG9sYXRlU2luZWJvd30gZnJvbSBcIi4vc2VxdWVudGlhbC1tdWx0aS9zaW5lYm93LmpzXCI7XG5leHBvcnQge2RlZmF1bHQgYXMgaW50ZXJwb2xhdGVUdXJib30gZnJvbSBcIi4vc2VxdWVudGlhbC1tdWx0aS90dXJiby5qc1wiO1xuZXhwb3J0IHtkZWZhdWx0IGFzIGludGVycG9sYXRlVmlyaWRpcywgbWFnbWEgYXMgaW50ZXJwb2xhdGVNYWdtYSwgaW5mZXJubyBhcyBpbnRlcnBvbGF0ZUluZmVybm8sIHBsYXNtYSBhcyBpbnRlcnBvbGF0ZVBsYXNtYX0gZnJvbSBcIi4vc2VxdWVudGlhbC1tdWx0aS92aXJpZGlzLmpzXCI7XG4iLCJpbXBvcnQge2ludGVycG9sYXRlUmdiQmFzaXN9IGZyb20gXCJkMy1pbnRlcnBvbGF0ZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihzY2hlbWUpIHtcbiAgcmV0dXJuIGludGVycG9sYXRlUmdiQmFzaXMoc2NoZW1lW3NjaGVtZS5sZW5ndGggLSAxXSk7XG59XG4iLCJpbXBvcnQgY29sb3JzIGZyb20gXCIuLi9jb2xvcnMuanNcIjtcbmltcG9ydCByYW1wIGZyb20gXCIuLi9yYW1wLmpzXCI7XG5cbmV4cG9ydCB2YXIgc2NoZW1lID0gbmV3IEFycmF5KDMpLmNvbmNhdChcbiAgXCJlNWY1Zjk5OWQ4YzkyY2EyNWZcIixcbiAgXCJlZGY4ZmJiMmUyZTI2NmMyYTQyMzhiNDVcIixcbiAgXCJlZGY4ZmJiMmUyZTI2NmMyYTQyY2EyNWYwMDZkMmNcIixcbiAgXCJlZGY4ZmJjY2VjZTY5OWQ4Yzk2NmMyYTQyY2EyNWYwMDZkMmNcIixcbiAgXCJlZGY4ZmJjY2VjZTY5OWQ4Yzk2NmMyYTQ0MWFlNzYyMzhiNDUwMDU4MjRcIixcbiAgXCJmN2ZjZmRlNWY1ZjljY2VjZTY5OWQ4Yzk2NmMyYTQ0MWFlNzYyMzhiNDUwMDU4MjRcIixcbiAgXCJmN2ZjZmRlNWY1ZjljY2VjZTY5OWQ4Yzk2NmMyYTQ0MWFlNzYyMzhiNDUwMDZkMmMwMDQ0MWJcIlxuKS5tYXAoY29sb3JzKTtcblxuZXhwb3J0IGRlZmF1bHQgcmFtcChzY2hlbWUpO1xuIiwiaW1wb3J0IGNvbG9ycyBmcm9tIFwiLi4vY29sb3JzLmpzXCI7XG5pbXBvcnQgcmFtcCBmcm9tIFwiLi4vcmFtcC5qc1wiO1xuXG5leHBvcnQgdmFyIHNjaGVtZSA9IG5ldyBBcnJheSgzKS5jb25jYXQoXG4gIFwiZTBlY2Y0OWViY2RhODg1NmE3XCIsXG4gIFwiZWRmOGZiYjNjZGUzOGM5NmM2ODg0MTlkXCIsXG4gIFwiZWRmOGZiYjNjZGUzOGM5NmM2ODg1NmE3ODEwZjdjXCIsXG4gIFwiZWRmOGZiYmZkM2U2OWViY2RhOGM5NmM2ODg1NmE3ODEwZjdjXCIsXG4gIFwiZWRmOGZiYmZkM2U2OWViY2RhOGM5NmM2OGM2YmIxODg0MTlkNmUwMTZiXCIsXG4gIFwiZjdmY2ZkZTBlY2Y0YmZkM2U2OWViY2RhOGM5NmM2OGM2YmIxODg0MTlkNmUwMTZiXCIsXG4gIFwiZjdmY2ZkZTBlY2Y0YmZkM2U2OWViY2RhOGM5NmM2OGM2YmIxODg0MTlkODEwZjdjNGQwMDRiXCJcbikubWFwKGNvbG9ycyk7XG5cbmV4cG9ydCBkZWZhdWx0IHJhbXAoc2NoZW1lKTtcbiIsImltcG9ydCBjb2xvcnMgZnJvbSBcIi4uL2NvbG9ycy5qc1wiO1xuaW1wb3J0IHJhbXAgZnJvbSBcIi4uL3JhbXAuanNcIjtcblxuZXhwb3J0IHZhciBzY2hlbWUgPSBuZXcgQXJyYXkoMykuY29uY2F0KFxuICBcImUwZjNkYmE4ZGRiNTQzYTJjYVwiLFxuICBcImYwZjllOGJhZTRiYzdiY2NjNDJiOGNiZVwiLFxuICBcImYwZjllOGJhZTRiYzdiY2NjNDQzYTJjYTA4NjhhY1wiLFxuICBcImYwZjllOGNjZWJjNWE4ZGRiNTdiY2NjNDQzYTJjYTA4NjhhY1wiLFxuICBcImYwZjllOGNjZWJjNWE4ZGRiNTdiY2NjNDRlYjNkMzJiOGNiZTA4NTg5ZVwiLFxuICBcImY3ZmNmMGUwZjNkYmNjZWJjNWE4ZGRiNTdiY2NjNDRlYjNkMzJiOGNiZTA4NTg5ZVwiLFxuICBcImY3ZmNmMGUwZjNkYmNjZWJjNWE4ZGRiNTdiY2NjNDRlYjNkMzJiOGNiZTA4NjhhYzA4NDA4MVwiXG4pLm1hcChjb2xvcnMpO1xuXG5leHBvcnQgZGVmYXVsdCByYW1wKHNjaGVtZSk7XG4iLCJpbXBvcnQgY29sb3JzIGZyb20gXCIuLi9jb2xvcnMuanNcIjtcbmltcG9ydCByYW1wIGZyb20gXCIuLi9yYW1wLmpzXCI7XG5cbmV4cG9ydCB2YXIgc2NoZW1lID0gbmV3IEFycmF5KDMpLmNvbmNhdChcbiAgXCJmZWU4YzhmZGJiODRlMzRhMzNcIixcbiAgXCJmZWYwZDlmZGNjOGFmYzhkNTlkNzMwMWZcIixcbiAgXCJmZWYwZDlmZGNjOGFmYzhkNTllMzRhMzNiMzAwMDBcIixcbiAgXCJmZWYwZDlmZGQ0OWVmZGJiODRmYzhkNTllMzRhMzNiMzAwMDBcIixcbiAgXCJmZWYwZDlmZGQ0OWVmZGJiODRmYzhkNTllZjY1NDhkNzMwMWY5OTAwMDBcIixcbiAgXCJmZmY3ZWNmZWU4YzhmZGQ0OWVmZGJiODRmYzhkNTllZjY1NDhkNzMwMWY5OTAwMDBcIixcbiAgXCJmZmY3ZWNmZWU4YzhmZGQ0OWVmZGJiODRmYzhkNTllZjY1NDhkNzMwMWZiMzAwMDA3ZjAwMDBcIlxuKS5tYXAoY29sb3JzKTtcblxuZXhwb3J0IGRlZmF1bHQgcmFtcChzY2hlbWUpO1xuIiwiaW1wb3J0IGNvbG9ycyBmcm9tIFwiLi4vY29sb3JzLmpzXCI7XG5pbXBvcnQgcmFtcCBmcm9tIFwiLi4vcmFtcC5qc1wiO1xuXG5leHBvcnQgdmFyIHNjaGVtZSA9IG5ldyBBcnJheSgzKS5jb25jYXQoXG4gIFwiZWNlN2YyYTZiZGRiMmI4Y2JlXCIsXG4gIFwiZjFlZWY2YmRjOWUxNzRhOWNmMDU3MGIwXCIsXG4gIFwiZjFlZWY2YmRjOWUxNzRhOWNmMmI4Y2JlMDQ1YThkXCIsXG4gIFwiZjFlZWY2ZDBkMWU2YTZiZGRiNzRhOWNmMmI4Y2JlMDQ1YThkXCIsXG4gIFwiZjFlZWY2ZDBkMWU2YTZiZGRiNzRhOWNmMzY5MGMwMDU3MGIwMDM0ZTdiXCIsXG4gIFwiZmZmN2ZiZWNlN2YyZDBkMWU2YTZiZGRiNzRhOWNmMzY5MGMwMDU3MGIwMDM0ZTdiXCIsXG4gIFwiZmZmN2ZiZWNlN2YyZDBkMWU2YTZiZGRiNzRhOWNmMzY5MGMwMDU3MGIwMDQ1YThkMDIzODU4XCJcbikubWFwKGNvbG9ycyk7XG5cbmV4cG9ydCBkZWZhdWx0IHJhbXAoc2NoZW1lKTtcbiIsImltcG9ydCBjb2xvcnMgZnJvbSBcIi4uL2NvbG9ycy5qc1wiO1xuaW1wb3J0IHJhbXAgZnJvbSBcIi4uL3JhbXAuanNcIjtcblxuZXhwb3J0IHZhciBzY2hlbWUgPSBuZXcgQXJyYXkoMykuY29uY2F0KFxuICBcImVjZTJmMGE2YmRkYjFjOTA5OVwiLFxuICBcImY2ZWZmN2JkYzllMTY3YTljZjAyODE4YVwiLFxuICBcImY2ZWZmN2JkYzllMTY3YTljZjFjOTA5OTAxNmM1OVwiLFxuICBcImY2ZWZmN2QwZDFlNmE2YmRkYjY3YTljZjFjOTA5OTAxNmM1OVwiLFxuICBcImY2ZWZmN2QwZDFlNmE2YmRkYjY3YTljZjM2OTBjMDAyODE4YTAxNjQ1MFwiLFxuICBcImZmZjdmYmVjZTJmMGQwZDFlNmE2YmRkYjY3YTljZjM2OTBjMDAyODE4YTAxNjQ1MFwiLFxuICBcImZmZjdmYmVjZTJmMGQwZDFlNmE2YmRkYjY3YTljZjM2OTBjMDAyODE4YTAxNmM1OTAxNDYzNlwiXG4pLm1hcChjb2xvcnMpO1xuXG5leHBvcnQgZGVmYXVsdCByYW1wKHNjaGVtZSk7XG4iLCJpbXBvcnQgY29sb3JzIGZyb20gXCIuLi9jb2xvcnMuanNcIjtcbmltcG9ydCByYW1wIGZyb20gXCIuLi9yYW1wLmpzXCI7XG5cbmV4cG9ydCB2YXIgc2NoZW1lID0gbmV3IEFycmF5KDMpLmNvbmNhdChcbiAgXCJlN2UxZWZjOTk0YzdkZDFjNzdcIixcbiAgXCJmMWVlZjZkN2I1ZDhkZjY1YjBjZTEyNTZcIixcbiAgXCJmMWVlZjZkN2I1ZDhkZjY1YjBkZDFjNzc5ODAwNDNcIixcbiAgXCJmMWVlZjZkNGI5ZGFjOTk0YzdkZjY1YjBkZDFjNzc5ODAwNDNcIixcbiAgXCJmMWVlZjZkNGI5ZGFjOTk0YzdkZjY1YjBlNzI5OGFjZTEyNTY5MTAwM2ZcIixcbiAgXCJmN2Y0ZjllN2UxZWZkNGI5ZGFjOTk0YzdkZjY1YjBlNzI5OGFjZTEyNTY5MTAwM2ZcIixcbiAgXCJmN2Y0ZjllN2UxZWZkNGI5ZGFjOTk0YzdkZjY1YjBlNzI5OGFjZTEyNTY5ODAwNDM2NzAwMWZcIlxuKS5tYXAoY29sb3JzKTtcblxuZXhwb3J0IGRlZmF1bHQgcmFtcChzY2hlbWUpO1xuIiwiaW1wb3J0IGNvbG9ycyBmcm9tIFwiLi4vY29sb3JzLmpzXCI7XG5pbXBvcnQgcmFtcCBmcm9tIFwiLi4vcmFtcC5qc1wiO1xuXG5leHBvcnQgdmFyIHNjaGVtZSA9IG5ldyBBcnJheSgzKS5jb25jYXQoXG4gIFwiZmRlMGRkZmE5ZmI1YzUxYjhhXCIsXG4gIFwiZmVlYmUyZmJiNGI5Zjc2OGExYWUwMTdlXCIsXG4gIFwiZmVlYmUyZmJiNGI5Zjc2OGExYzUxYjhhN2EwMTc3XCIsXG4gIFwiZmVlYmUyZmNjNWMwZmE5ZmI1Zjc2OGExYzUxYjhhN2EwMTc3XCIsXG4gIFwiZmVlYmUyZmNjNWMwZmE5ZmI1Zjc2OGExZGQzNDk3YWUwMTdlN2EwMTc3XCIsXG4gIFwiZmZmN2YzZmRlMGRkZmNjNWMwZmE5ZmI1Zjc2OGExZGQzNDk3YWUwMTdlN2EwMTc3XCIsXG4gIFwiZmZmN2YzZmRlMGRkZmNjNWMwZmE5ZmI1Zjc2OGExZGQzNDk3YWUwMTdlN2EwMTc3NDkwMDZhXCJcbikubWFwKGNvbG9ycyk7XG5cbmV4cG9ydCBkZWZhdWx0IHJhbXAoc2NoZW1lKTtcbiIsImltcG9ydCBjb2xvcnMgZnJvbSBcIi4uL2NvbG9ycy5qc1wiO1xuaW1wb3J0IHJhbXAgZnJvbSBcIi4uL3JhbXAuanNcIjtcblxuZXhwb3J0IHZhciBzY2hlbWUgPSBuZXcgQXJyYXkoMykuY29uY2F0KFxuICBcImY3ZmNiOWFkZGQ4ZTMxYTM1NFwiLFxuICBcImZmZmZjY2MyZTY5OTc4YzY3OTIzODQ0M1wiLFxuICBcImZmZmZjY2MyZTY5OTc4YzY3OTMxYTM1NDAwNjgzN1wiLFxuICBcImZmZmZjY2Q5ZjBhM2FkZGQ4ZTc4YzY3OTMxYTM1NDAwNjgzN1wiLFxuICBcImZmZmZjY2Q5ZjBhM2FkZGQ4ZTc4YzY3OTQxYWI1ZDIzODQ0MzAwNWEzMlwiLFxuICBcImZmZmZlNWY3ZmNiOWQ5ZjBhM2FkZGQ4ZTc4YzY3OTQxYWI1ZDIzODQ0MzAwNWEzMlwiLFxuICBcImZmZmZlNWY3ZmNiOWQ5ZjBhM2FkZGQ4ZTc4YzY3OTQxYWI1ZDIzODQ0MzAwNjgzNzAwNDUyOVwiXG4pLm1hcChjb2xvcnMpO1xuXG5leHBvcnQgZGVmYXVsdCByYW1wKHNjaGVtZSk7XG4iLCJpbXBvcnQgY29sb3JzIGZyb20gXCIuLi9jb2xvcnMuanNcIjtcbmltcG9ydCByYW1wIGZyb20gXCIuLi9yYW1wLmpzXCI7XG5cbmV4cG9ydCB2YXIgc2NoZW1lID0gbmV3IEFycmF5KDMpLmNvbmNhdChcbiAgXCJlZGY4YjE3ZmNkYmIyYzdmYjhcIixcbiAgXCJmZmZmY2NhMWRhYjQ0MWI2YzQyMjVlYThcIixcbiAgXCJmZmZmY2NhMWRhYjQ0MWI2YzQyYzdmYjgyNTM0OTRcIixcbiAgXCJmZmZmY2NjN2U5YjQ3ZmNkYmI0MWI2YzQyYzdmYjgyNTM0OTRcIixcbiAgXCJmZmZmY2NjN2U5YjQ3ZmNkYmI0MWI2YzQxZDkxYzAyMjVlYTgwYzJjODRcIixcbiAgXCJmZmZmZDllZGY4YjFjN2U5YjQ3ZmNkYmI0MWI2YzQxZDkxYzAyMjVlYTgwYzJjODRcIixcbiAgXCJmZmZmZDllZGY4YjFjN2U5YjQ3ZmNkYmI0MWI2YzQxZDkxYzAyMjVlYTgyNTM0OTQwODFkNThcIlxuKS5tYXAoY29sb3JzKTtcblxuZXhwb3J0IGRlZmF1bHQgcmFtcChzY2hlbWUpO1xuIiwiaW1wb3J0IGNvbG9ycyBmcm9tIFwiLi4vY29sb3JzLmpzXCI7XG5pbXBvcnQgcmFtcCBmcm9tIFwiLi4vcmFtcC5qc1wiO1xuXG5leHBvcnQgdmFyIHNjaGVtZSA9IG5ldyBBcnJheSgzKS5jb25jYXQoXG4gIFwiZmZmN2JjZmVjNDRmZDk1ZjBlXCIsXG4gIFwiZmZmZmQ0ZmVkOThlZmU5OTI5Y2M0YzAyXCIsXG4gIFwiZmZmZmQ0ZmVkOThlZmU5OTI5ZDk1ZjBlOTkzNDA0XCIsXG4gIFwiZmZmZmQ0ZmVlMzkxZmVjNDRmZmU5OTI5ZDk1ZjBlOTkzNDA0XCIsXG4gIFwiZmZmZmQ0ZmVlMzkxZmVjNDRmZmU5OTI5ZWM3MDE0Y2M0YzAyOGMyZDA0XCIsXG4gIFwiZmZmZmU1ZmZmN2JjZmVlMzkxZmVjNDRmZmU5OTI5ZWM3MDE0Y2M0YzAyOGMyZDA0XCIsXG4gIFwiZmZmZmU1ZmZmN2JjZmVlMzkxZmVjNDRmZmU5OTI5ZWM3MDE0Y2M0YzAyOTkzNDA0NjYyNTA2XCJcbikubWFwKGNvbG9ycyk7XG5cbmV4cG9ydCBkZWZhdWx0IHJhbXAoc2NoZW1lKTtcbiIsImltcG9ydCBjb2xvcnMgZnJvbSBcIi4uL2NvbG9ycy5qc1wiO1xuaW1wb3J0IHJhbXAgZnJvbSBcIi4uL3JhbXAuanNcIjtcblxuZXhwb3J0IHZhciBzY2hlbWUgPSBuZXcgQXJyYXkoMykuY29uY2F0KFxuICBcImZmZWRhMGZlYjI0Y2YwM2IyMFwiLFxuICBcImZmZmZiMmZlY2M1Y2ZkOGQzY2UzMWExY1wiLFxuICBcImZmZmZiMmZlY2M1Y2ZkOGQzY2YwM2IyMGJkMDAyNlwiLFxuICBcImZmZmZiMmZlZDk3NmZlYjI0Y2ZkOGQzY2YwM2IyMGJkMDAyNlwiLFxuICBcImZmZmZiMmZlZDk3NmZlYjI0Y2ZkOGQzY2ZjNGUyYWUzMWExY2IxMDAyNlwiLFxuICBcImZmZmZjY2ZmZWRhMGZlZDk3NmZlYjI0Y2ZkOGQzY2ZjNGUyYWUzMWExY2IxMDAyNlwiLFxuICBcImZmZmZjY2ZmZWRhMGZlZDk3NmZlYjI0Y2ZkOGQzY2ZjNGUyYWUzMWExY2JkMDAyNjgwMDAyNlwiXG4pLm1hcChjb2xvcnMpO1xuXG5leHBvcnQgZGVmYXVsdCByYW1wKHNjaGVtZSk7XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbih0KSB7XG4gIHQgPSBNYXRoLm1heCgwLCBNYXRoLm1pbigxLCB0KSk7XG4gIHJldHVybiBcInJnYihcIlxuICAgICAgKyBNYXRoLm1heCgwLCBNYXRoLm1pbigyNTUsIE1hdGgucm91bmQoLTQuNTQgLSB0ICogKDM1LjM0IC0gdCAqICgyMzgxLjczIC0gdCAqICg2NDAyLjcgLSB0ICogKDcwMjQuNzIgLSB0ICogMjcxMC41NykpKSkpKSkgKyBcIiwgXCJcbiAgICAgICsgTWF0aC5tYXgoMCwgTWF0aC5taW4oMjU1LCBNYXRoLnJvdW5kKDMyLjQ5ICsgdCAqICgxNzAuNzMgKyB0ICogKDUyLjgyIC0gdCAqICgxMzEuNDYgLSB0ICogKDE3Ni41OCAtIHQgKiA2Ny4zNykpKSkpKSkgKyBcIiwgXCJcbiAgICAgICsgTWF0aC5tYXgoMCwgTWF0aC5taW4oMjU1LCBNYXRoLnJvdW5kKDgxLjI0ICsgdCAqICg0NDIuMzYgLSB0ICogKDI0ODIuNDMgLSB0ICogKDYxNjcuMjQgLSB0ICogKDY2MTQuOTQgLSB0ICogMjQ3NS42NykpKSkpKSlcbiAgICAgICsgXCIpXCI7XG59XG4iLCJpbXBvcnQge2N1YmVoZWxpeH0gZnJvbSBcImQzLWNvbG9yXCI7XG5pbXBvcnQge2ludGVycG9sYXRlQ3ViZWhlbGl4TG9uZ30gZnJvbSBcImQzLWludGVycG9sYXRlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGludGVycG9sYXRlQ3ViZWhlbGl4TG9uZyhjdWJlaGVsaXgoMzAwLCAwLjUsIDAuMCksIGN1YmVoZWxpeCgtMjQwLCAwLjUsIDEuMCkpO1xuIiwiaW1wb3J0IHtjdWJlaGVsaXh9IGZyb20gXCJkMy1jb2xvclwiO1xuaW1wb3J0IHtpbnRlcnBvbGF0ZUN1YmVoZWxpeExvbmd9IGZyb20gXCJkMy1pbnRlcnBvbGF0ZVwiO1xuXG5leHBvcnQgdmFyIHdhcm0gPSBpbnRlcnBvbGF0ZUN1YmVoZWxpeExvbmcoY3ViZWhlbGl4KC0xMDAsIDAuNzUsIDAuMzUpLCBjdWJlaGVsaXgoODAsIDEuNTAsIDAuOCkpO1xuXG5leHBvcnQgdmFyIGNvb2wgPSBpbnRlcnBvbGF0ZUN1YmVoZWxpeExvbmcoY3ViZWhlbGl4KDI2MCwgMC43NSwgMC4zNSksIGN1YmVoZWxpeCg4MCwgMS41MCwgMC44KSk7XG5cbnZhciBjID0gY3ViZWhlbGl4KCk7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHQpIHtcbiAgaWYgKHQgPCAwIHx8IHQgPiAxKSB0IC09IE1hdGguZmxvb3IodCk7XG4gIHZhciB0cyA9IE1hdGguYWJzKHQgLSAwLjUpO1xuICBjLmggPSAzNjAgKiB0IC0gMTAwO1xuICBjLnMgPSAxLjUgLSAxLjUgKiB0cztcbiAgYy5sID0gMC44IC0gMC45ICogdHM7XG4gIHJldHVybiBjICsgXCJcIjtcbn1cbiIsImltcG9ydCB7cmdifSBmcm9tIFwiZDMtY29sb3JcIjtcblxudmFyIGMgPSByZ2IoKSxcbiAgICBwaV8xXzMgPSBNYXRoLlBJIC8gMyxcbiAgICBwaV8yXzMgPSBNYXRoLlBJICogMiAvIDM7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHQpIHtcbiAgdmFyIHg7XG4gIHQgPSAoMC41IC0gdCkgKiBNYXRoLlBJO1xuICBjLnIgPSAyNTUgKiAoeCA9IE1hdGguc2luKHQpKSAqIHg7XG4gIGMuZyA9IDI1NSAqICh4ID0gTWF0aC5zaW4odCArIHBpXzFfMykpICogeDtcbiAgYy5iID0gMjU1ICogKHggPSBNYXRoLnNpbih0ICsgcGlfMl8zKSkgKiB4O1xuICByZXR1cm4gYyArIFwiXCI7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbih0KSB7XG4gIHQgPSBNYXRoLm1heCgwLCBNYXRoLm1pbigxLCB0KSk7XG4gIHJldHVybiBcInJnYihcIlxuICAgICAgKyBNYXRoLm1heCgwLCBNYXRoLm1pbigyNTUsIE1hdGgucm91bmQoMzQuNjEgKyB0ICogKDExNzIuMzMgLSB0ICogKDEwNzkzLjU2IC0gdCAqICgzMzMwMC4xMiAtIHQgKiAoMzgzOTQuNDkgLSB0ICogMTQ4MjUuMDUpKSkpKSkpICsgXCIsIFwiXG4gICAgICArIE1hdGgubWF4KDAsIE1hdGgubWluKDI1NSwgTWF0aC5yb3VuZCgyMy4zMSArIHQgKiAoNTU3LjMzICsgdCAqICgxMjI1LjMzIC0gdCAqICgzNTc0Ljk2IC0gdCAqICgxMDczLjc3ICsgdCAqIDcwNy41NikpKSkpKSkgKyBcIiwgXCJcbiAgICAgICsgTWF0aC5tYXgoMCwgTWF0aC5taW4oMjU1LCBNYXRoLnJvdW5kKDI3LjIgKyB0ICogKDMyMTEuMSAtIHQgKiAoMTUzMjcuOTcgLSB0ICogKDI3ODE0IC0gdCAqICgyMjU2OS4xOCAtIHQgKiA2ODM4LjY2KSkpKSkpKVxuICAgICAgKyBcIilcIjtcbn1cbiIsImltcG9ydCBjb2xvcnMgZnJvbSBcIi4uL2NvbG9ycy5qc1wiO1xuXG5mdW5jdGlvbiByYW1wKHJhbmdlKSB7XG4gIHZhciBuID0gcmFuZ2UubGVuZ3RoO1xuICByZXR1cm4gZnVuY3Rpb24odCkge1xuICAgIHJldHVybiByYW5nZVtNYXRoLm1heCgwLCBNYXRoLm1pbihuIC0gMSwgTWF0aC5mbG9vcih0ICogbikpKV07XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IHJhbXAoY29sb3JzKFwiNDQwMTU0NDQwMjU2NDUwNDU3NDUwNTU5NDYwNzVhNDYwODVjNDYwYTVkNDYwYjVlNDcwZDYwNDcwZTYxNDcxMDYzNDcxMTY0NDcxMzY1NDgxNDY3NDgxNjY4NDgxNzY5NDgxODZhNDgxYTZjNDgxYjZkNDgxYzZlNDgxZDZmNDgxZjcwNDgyMDcxNDgyMTczNDgyMzc0NDgyNDc1NDgyNTc2NDgyNjc3NDgyODc4NDgyOTc5NDcyYTdhNDcyYzdhNDcyZDdiNDcyZTdjNDcyZjdkNDYzMDdlNDYzMjdlNDYzMzdmNDYzNDgwNDUzNTgxNDUzNzgxNDUzODgyNDQzOTgzNDQzYTgzNDQzYjg0NDMzZDg0NDMzZTg1NDIzZjg1NDI0MDg2NDI0MTg2NDE0Mjg3NDE0NDg3NDA0NTg4NDA0Njg4M2Y0Nzg4M2Y0ODg5M2U0OTg5M2U0YTg5M2U0YzhhM2Q0ZDhhM2Q0ZThhM2M0ZjhhM2M1MDhiM2I1MThiM2I1MjhiM2E1MzhiM2E1NDhjMzk1NThjMzk1NjhjMzg1ODhjMzg1OThjMzc1YThjMzc1YjhkMzY1YzhkMzY1ZDhkMzU1ZThkMzU1ZjhkMzQ2MDhkMzQ2MThkMzM2MjhkMzM2MzhkMzI2NDhlMzI2NThlMzE2NjhlMzE2NzhlMzE2ODhlMzA2OThlMzA2YThlMmY2YjhlMmY2YzhlMmU2ZDhlMmU2ZThlMmU2ZjhlMmQ3MDhlMmQ3MThlMmM3MThlMmM3MjhlMmM3MzhlMmI3NDhlMmI3NThlMmE3NjhlMmE3NzhlMmE3ODhlMjk3OThlMjk3YThlMjk3YjhlMjg3YzhlMjg3ZDhlMjc3ZThlMjc3ZjhlMjc4MDhlMjY4MThlMjY4MjhlMjY4MjhlMjU4MzhlMjU4NDhlMjU4NThlMjQ4NjhlMjQ4NzhlMjM4ODhlMjM4OThlMjM4YThkMjI4YjhkMjI4YzhkMjI4ZDhkMjE4ZThkMjE4ZjhkMjE5MDhkMjE5MThjMjA5MjhjMjA5MjhjMjA5MzhjMWY5NDhjMWY5NThiMWY5NjhiMWY5NzhiMWY5ODhiMWY5OThhMWY5YThhMWU5YjhhMWU5Yzg5MWU5ZDg5MWY5ZTg5MWY5Zjg4MWZhMDg4MWZhMTg4MWZhMTg3MWZhMjg3MjBhMzg2MjBhNDg2MjFhNTg1MjFhNjg1MjJhNzg1MjJhODg0MjNhOTgzMjRhYTgzMjVhYjgyMjVhYzgyMjZhZDgxMjdhZDgxMjhhZTgwMjlhZjdmMmFiMDdmMmNiMTdlMmRiMjdkMmViMzdjMmZiNDdjMzFiNTdiMzJiNjdhMzRiNjc5MzViNzc5MzdiODc4MzhiOTc3M2FiYTc2M2JiYjc1M2RiYzc0M2ZiYzczNDBiZDcyNDJiZTcxNDRiZjcwNDZjMDZmNDhjMTZlNGFjMTZkNGNjMjZjNGVjMzZiNTBjNDZhNTJjNTY5NTRjNTY4NTZjNjY3NThjNzY1NWFjODY0NWNjODYzNWVjOTYyNjBjYTYwNjNjYjVmNjVjYjVlNjdjYzVjNjljZDViNmNjZDVhNmVjZTU4NzBjZjU3NzNkMDU2NzVkMDU0NzdkMTUzN2FkMTUxN2NkMjUwN2ZkMzRlODFkMzRkODRkNDRiODZkNTQ5ODlkNTQ4OGJkNjQ2OGVkNjQ1OTBkNzQzOTNkNzQxOTVkODQwOThkODNlOWJkOTNjOWRkOTNiYTBkYTM5YTJkYTM3YTVkYjM2YThkYjM0YWFkYzMyYWRkYzMwYjBkZDJmYjJkZDJkYjVkZTJiYjhkZTI5YmFkZTI4YmRkZjI2YzBkZjI1YzJkZjIzYzVlMDIxYzhlMDIwY2FlMTFmY2RlMTFkZDBlMTFjZDJlMjFiZDVlMjFhZDhlMjE5ZGFlMzE5ZGRlMzE4ZGZlMzE4ZTJlNDE4ZTVlNDE5ZTdlNDE5ZWFlNTFhZWNlNTFiZWZlNTFjZjFlNTFkZjRlNjFlZjZlNjIwZjhlNjIxZmJlNzIzZmRlNzI1XCIpKTtcblxuZXhwb3J0IHZhciBtYWdtYSA9IHJhbXAoY29sb3JzKFwiMDAwMDA0MDEwMDA1MDEwMTA2MDEwMTA4MDIwMTA5MDIwMjBiMDIwMjBkMDMwMzBmMDMwMzEyMDQwNDE0MDUwNDE2MDYwNTE4MDYwNTFhMDcwNjFjMDgwNzFlMDkwNzIwMGEwODIyMGIwOTI0MGMwOTI2MGQwYTI5MGUwYjJiMTAwYjJkMTEwYzJmMTIwZDMxMTMwZDM0MTQwZTM2MTUwZTM4MTYwZjNiMTgwZjNkMTkxMDNmMWExMDQyMWMxMDQ0MWQxMTQ3MWUxMTQ5MjAxMTRiMjExMTRlMjIxMTUwMjQxMjUzMjUxMjU1MjcxMjU4MjkxMTVhMmExMTVjMmMxMTVmMmQxMTYxMmYxMTYzMzExMTY1MzMxMDY3MzQxMDY5MzYxMDZiMzgxMDZjMzkwZjZlM2IwZjcwM2QwZjcxM2YwZjcyNDAwZjc0NDIwZjc1NDQwZjc2NDUxMDc3NDcxMDc4NDkxMDc4NGExMDc5NGMxMTdhNGUxMTdiNGYxMjdiNTExMjdjNTIxMzdjNTQxMzdkNTYxNDdkNTcxNTdlNTkxNTdlNWExNjdlNWMxNjdmNWQxNzdmNWYxODdmNjAxODgwNjIxOTgwNjQxYTgwNjUxYTgwNjcxYjgwNjgxYzgxNmExYzgxNmIxZDgxNmQxZDgxNmUxZTgxNzAxZjgxNzIxZjgxNzMyMDgxNzUyMTgxNzYyMTgxNzgyMjgxNzkyMjgyN2IyMzgyN2MyMzgyN2UyNDgyODAyNTgyODEyNTgxODMyNjgxODQyNjgxODYyNzgxODgyNzgxODkyODgxOGIyOTgxOGMyOTgxOGUyYTgxOTAyYTgxOTEyYjgxOTMyYjgwOTQyYzgwOTYyYzgwOTgyZDgwOTkyZDgwOWIyZTdmOWMyZTdmOWUyZjdmYTAyZjdmYTEzMDdlYTMzMDdlYTUzMTdlYTYzMTdkYTgzMjdkYWEzMzdkYWIzMzdjYWQzNDdjYWUzNDdiYjAzNTdiYjIzNTdiYjMzNjdhYjUzNjdhYjczNzc5YjgzNzc5YmEzODc4YmMzOTc4YmQzOTc3YmYzYTc3YzAzYTc2YzIzYjc1YzQzYzc1YzUzYzc0YzczZDczYzgzZTczY2EzZTcyY2MzZjcxY2Q0MDcxY2Y0MDcwZDA0MTZmZDI0MjZmZDM0MzZlZDU0NDZkZDY0NTZjZDg0NTZjZDk0NjZiZGI0NzZhZGM0ODY5ZGU0OTY4ZGY0YTY4ZTA0YzY3ZTI0ZDY2ZTM0ZTY1ZTQ0ZjY0ZTU1MDY0ZTc1MjYzZTg1MzYyZTk1NDYyZWE1NjYxZWI1NzYwZWM1ODYwZWQ1YTVmZWU1YjVlZWY1ZDVlZjA1ZjVlZjE2MDVkZjI2MjVkZjI2NDVjZjM2NTVjZjQ2NzVjZjQ2OTVjZjU2YjVjZjY2YzVjZjY2ZTVjZjc3MDVjZjc3MjVjZjg3NDVjZjg3NjVjZjk3ODVkZjk3OTVkZjk3YjVkZmE3ZDVlZmE3ZjVlZmE4MTVmZmI4MzVmZmI4NTYwZmI4NzYxZmM4OTYxZmM4YTYyZmM4YzYzZmM4ZTY0ZmM5MDY1ZmQ5MjY2ZmQ5NDY3ZmQ5NjY4ZmQ5ODY5ZmQ5YTZhZmQ5YjZiZmU5ZDZjZmU5ZjZkZmVhMTZlZmVhMzZmZmVhNTcxZmVhNzcyZmVhOTczZmVhYTc0ZmVhYzc2ZmVhZTc3ZmViMDc4ZmViMjdhZmViNDdiZmViNjdjZmViNzdlZmViOTdmZmViYjgxZmViZDgyZmViZjg0ZmVjMTg1ZmVjMjg3ZmVjNDg4ZmVjNjhhZmVjODhjZmVjYThkZmVjYzhmZmVjZDkwZmVjZjkyZmVkMTk0ZmVkMzk1ZmVkNTk3ZmVkNzk5ZmVkODlhZmRkYTljZmRkYzllZmRkZWEwZmRlMGExZmRlMmEzZmRlM2E1ZmRlNWE3ZmRlN2E5ZmRlOWFhZmRlYmFjZmNlY2FlZmNlZWIwZmNmMGIyZmNmMmI0ZmNmNGI2ZmNmNmI4ZmNmN2I5ZmNmOWJiZmNmYmJkZmNmZGJmXCIpKTtcblxuZXhwb3J0IHZhciBpbmZlcm5vID0gcmFtcChjb2xvcnMoXCIwMDAwMDQwMTAwMDUwMTAxMDYwMTAxMDgwMjAxMGEwMjAyMGMwMjAyMGUwMzAyMTAwNDAzMTIwNDAzMTQwNTA0MTcwNjA0MTkwNzA1MWIwODA1MWQwOTA2MWYwYTA3MjIwYjA3MjQwYzA4MjYwZDA4MjkwZTA5MmIxMDA5MmQxMTBhMzAxMjBhMzIxNDBiMzQxNTBiMzcxNjBiMzkxODBjM2MxOTBjM2UxYjBjNDExYzBjNDMxZTBjNDUxZjBjNDgyMTBjNGEyMzBjNGMyNDBjNGYyNjBjNTEyODBiNTMyOTBiNTUyYjBiNTcyZDBiNTkyZjBhNWIzMTBhNWMzMjBhNWUzNDBhNWYzNjA5NjEzODA5NjIzOTA5NjMzYjA5NjQzZDA5NjUzZTA5NjY0MDBhNjc0MjBhNjg0NDBhNjg0NTBhNjk0NzBiNmE0OTBiNmE0YTBjNmI0YzBjNmI0ZDBkNmM0ZjBkNmM1MTBlNmM1MjBlNmQ1NDBmNmQ1NTBmNmQ1NzEwNmU1OTEwNmU1YTExNmU1YzEyNmU1ZDEyNmU1ZjEzNmU2MTEzNmU2MjE0NmU2NDE1NmU2NTE1NmU2NzE2NmU2OTE2NmU2YTE3NmU2YzE4NmU2ZDE4NmU2ZjE5NmU3MTE5NmU3MjFhNmU3NDFhNmU3NTFiNmU3NzFjNmQ3ODFjNmQ3YTFkNmQ3YzFkNmQ3ZDFlNmQ3ZjFlNmM4MDFmNmM4MjIwNmM4NDIwNmI4NTIxNmI4NzIxNmI4ODIyNmE4YTIyNmE4YzIzNjk4ZDIzNjk4ZjI0Njk5MDI1Njg5MjI1Njg5MzI2Njc5NTI2Njc5NzI3NjY5ODI3NjY5YTI4NjU5YjI5NjQ5ZDI5NjQ5ZjJhNjNhMDJhNjNhMjJiNjJhMzJjNjFhNTJjNjBhNjJkNjBhODJlNWZhOTJlNWVhYjJmNWVhZDMwNWRhZTMwNWNiMDMxNWJiMTMyNWFiMzMyNWFiNDMzNTliNjM0NThiNzM1NTdiOTM1NTZiYTM2NTViYzM3NTRiZDM4NTNiZjM5NTJjMDNhNTFjMTNhNTBjMzNiNGZjNDNjNGVjNjNkNGRjNzNlNGNjODNmNGJjYTQwNGFjYjQxNDljYzQyNDhjZTQzNDdjZjQ0NDZkMDQ1NDVkMjQ2NDRkMzQ3NDNkNDQ4NDJkNTRhNDFkNzRiM2ZkODRjM2VkOTRkM2RkYTRlM2NkYjUwM2JkZDUxM2FkZTUyMzhkZjUzMzdlMDU1MzZlMTU2MzVlMjU3MzRlMzU5MzNlNDVhMzFlNTVjMzBlNjVkMmZlNzVlMmVlODYwMmRlOTYxMmJlYTYzMmFlYjY0MjllYjY2MjhlYzY3MjZlZDY5MjVlZTZhMjRlZjZjMjNlZjZlMjFmMDZmMjBmMTcxMWZmMTczMWRmMjc0MWNmMzc2MWJmMzc4MTlmNDc5MThmNTdiMTdmNTdkMTVmNjdlMTRmNjgwMTNmNzgyMTJmNzg0MTBmODg1MGZmODg3MGVmODg5MGNmOThiMGJmOThjMGFmOThlMDlmYTkwMDhmYTkyMDdmYTk0MDdmYjk2MDZmYjk3MDZmYjk5MDZmYjliMDZmYjlkMDdmYzlmMDdmY2ExMDhmY2EzMDlmY2E1MGFmY2E2MGNmY2E4MGRmY2FhMGZmY2FjMTFmY2FlMTJmY2IwMTRmY2IyMTZmY2I0MThmYmI2MWFmYmI4MWRmYmJhMWZmYmJjMjFmYmJlMjNmYWMwMjZmYWMyMjhmYWM0MmFmYWM2MmRmOWM3MmZmOWM5MzJmOWNiMzVmOGNkMzdmOGNmM2FmN2QxM2RmN2QzNDBmNmQ1NDNmNmQ3NDZmNWQ5NDlmNWRiNGNmNGRkNGZmNGRmNTNmNGUxNTZmM2UzNWFmM2U1NWRmMmU2NjFmMmU4NjVmMmVhNjlmMWVjNmRmMWVkNzFmMWVmNzVmMWYxNzlmMmYyN2RmMmY0ODJmM2Y1ODZmM2Y2OGFmNGY4OGVmNWY5OTJmNmZhOTZmOGZiOWFmOWZjOWRmYWZkYTFmY2ZmYTRcIikpO1xuXG5leHBvcnQgdmFyIHBsYXNtYSA9IHJhbXAoY29sb3JzKFwiMGQwODg3MTAwNzg4MTMwNzg5MTYwNzhhMTkwNjhjMWIwNjhkMWQwNjhlMjAwNjhmMjIwNjkwMjQwNjkxMjYwNTkxMjgwNTkyMmEwNTkzMmMwNTk0MmUwNTk1MmYwNTk2MzEwNTk3MzMwNTk3MzUwNDk4MzcwNDk5MzgwNDlhM2EwNDlhM2MwNDliM2UwNDljM2YwNDljNDEwNDlkNDMwMzllNDQwMzllNDYwMzlmNDgwMzlmNDkwM2EwNGIwM2ExNGMwMmExNGUwMmEyNTAwMmEyNTEwMmEzNTMwMmEzNTUwMmE0NTYwMWE0NTgwMWE0NTkwMWE1NWIwMWE1NWMwMWE2NWUwMWE2NjAwMWE2NjEwMGE3NjMwMGE3NjQwMGE3NjYwMGE3NjcwMGE4NjkwMGE4NmEwMGE4NmMwMGE4NmUwMGE4NmYwMGE4NzEwMGE4NzIwMWE4NzQwMWE4NzUwMWE4NzcwMWE4NzgwMWE4N2EwMmE4N2IwMmE4N2QwM2E4N2UwM2E4ODAwNGE4ODEwNGE3ODMwNWE3ODQwNWE3ODYwNmE2ODcwN2E2ODgwOGE2OGEwOWE1OGIwYWE1OGQwYmE1OGUwY2E0OGYwZGE0OTEwZWEzOTIwZmEzOTQxMGEyOTUxMWExOTYxM2ExOTgxNGEwOTkxNTlmOWExNjlmOWMxNzllOWQxODlkOWUxOTlkYTAxYTljYTExYjliYTIxZDlhYTMxZTlhYTUxZjk5YTYyMDk4YTcyMTk3YTgyMjk2YWEyMzk1YWIyNDk0YWMyNjk0YWQyNzkzYWUyODkyYjAyOTkxYjEyYTkwYjIyYjhmYjMyYzhlYjQyZThkYjUyZjhjYjYzMDhiYjczMThhYjgzMjg5YmEzMzg4YmIzNDg4YmMzNTg3YmQzNzg2YmUzODg1YmYzOTg0YzAzYTgzYzEzYjgyYzIzYzgxYzMzZDgwYzQzZTdmYzU0MDdlYzY0MTdkYzc0MjdjYzg0MzdiYzk0NDdhY2E0NTdhY2I0Njc5Y2M0Nzc4Y2M0OTc3Y2Q0YTc2Y2U0Yjc1Y2Y0Yzc0ZDA0ZDczZDE0ZTcyZDI0ZjcxZDM1MTcxZDQ1MjcwZDU1MzZmZDU1NDZlZDY1NTZkZDc1NjZjZDg1NzZiZDk1ODZhZGE1YTZhZGE1YjY5ZGI1YzY4ZGM1ZDY3ZGQ1ZTY2ZGU1ZjY1ZGU2MTY0ZGY2MjYzZTA2MzYzZTE2NDYyZTI2NTYxZTI2NjYwZTM2ODVmZTQ2OTVlZTU2YTVkZTU2YjVkZTY2YzVjZTc2ZTViZTc2ZjVhZTg3MDU5ZTk3MTU4ZTk3MjU3ZWE3NDU3ZWI3NTU2ZWI3NjU1ZWM3NzU0ZWQ3OTUzZWQ3YTUyZWU3YjUxZWY3YzUxZWY3ZTUwZjA3ZjRmZjA4MDRlZjE4MTRkZjE4MzRjZjI4NDRiZjM4NTRiZjM4NzRhZjQ4ODQ5ZjQ4OTQ4ZjU4YjQ3ZjU4YzQ2ZjY4ZDQ1ZjY4ZjQ0Zjc5MDQ0Zjc5MTQzZjc5MzQyZjg5NDQxZjg5NTQwZjk5NzNmZjk5ODNlZjk5YTNlZmE5YjNkZmE5YzNjZmE5ZTNiZmI5ZjNhZmJhMTM5ZmJhMjM4ZmNhMzM4ZmNhNTM3ZmNhNjM2ZmNhODM1ZmNhOTM0ZmRhYjMzZmRhYzMzZmRhZTMyZmRhZjMxZmRiMTMwZmRiMjJmZmRiNDJmZmRiNTJlZmViNzJkZmViODJjZmViYTJjZmViYjJiZmViZDJhZmViZTJhZmVjMDI5ZmRjMjI5ZmRjMzI4ZmRjNTI3ZmRjNjI3ZmRjODI3ZmRjYTI2ZmRjYjI2ZmNjZDI1ZmNjZTI1ZmNkMDI1ZmNkMjI1ZmJkMzI0ZmJkNTI0ZmJkNzI0ZmFkODI0ZmFkYTI0ZjlkYzI0ZjlkZDI1ZjhkZjI1ZjhlMTI1ZjdlMjI1ZjdlNDI1ZjZlNjI2ZjZlODI2ZjVlOTI2ZjVlYjI3ZjRlZDI3ZjNlZTI3ZjNmMDI3ZjJmMjI3ZjFmNDI2ZjFmNTI1ZjBmNzI0ZjBmOTIxXCIpKTtcbiIsImltcG9ydCBjb2xvcnMgZnJvbSBcIi4uL2NvbG9ycy5qc1wiO1xuaW1wb3J0IHJhbXAgZnJvbSBcIi4uL3JhbXAuanNcIjtcblxuZXhwb3J0IHZhciBzY2hlbWUgPSBuZXcgQXJyYXkoMykuY29uY2F0KFxuICBcImRlZWJmNzllY2FlMTMxODJiZFwiLFxuICBcImVmZjNmZmJkZDdlNzZiYWVkNjIxNzFiNVwiLFxuICBcImVmZjNmZmJkZDdlNzZiYWVkNjMxODJiZDA4NTE5Y1wiLFxuICBcImVmZjNmZmM2ZGJlZjllY2FlMTZiYWVkNjMxODJiZDA4NTE5Y1wiLFxuICBcImVmZjNmZmM2ZGJlZjllY2FlMTZiYWVkNjQyOTJjNjIxNzFiNTA4NDU5NFwiLFxuICBcImY3ZmJmZmRlZWJmN2M2ZGJlZjllY2FlMTZiYWVkNjQyOTJjNjIxNzFiNTA4NDU5NFwiLFxuICBcImY3ZmJmZmRlZWJmN2M2ZGJlZjllY2FlMTZiYWVkNjQyOTJjNjIxNzFiNTA4NTE5YzA4MzA2YlwiXG4pLm1hcChjb2xvcnMpO1xuXG5leHBvcnQgZGVmYXVsdCByYW1wKHNjaGVtZSk7XG4iLCJpbXBvcnQgY29sb3JzIGZyb20gXCIuLi9jb2xvcnMuanNcIjtcbmltcG9ydCByYW1wIGZyb20gXCIuLi9yYW1wLmpzXCI7XG5cbmV4cG9ydCB2YXIgc2NoZW1lID0gbmV3IEFycmF5KDMpLmNvbmNhdChcbiAgXCJlNWY1ZTBhMWQ5OWIzMWEzNTRcIixcbiAgXCJlZGY4ZTliYWU0YjM3NGM0NzYyMzhiNDVcIixcbiAgXCJlZGY4ZTliYWU0YjM3NGM0NzYzMWEzNTQwMDZkMmNcIixcbiAgXCJlZGY4ZTljN2U5YzBhMWQ5OWI3NGM0NzYzMWEzNTQwMDZkMmNcIixcbiAgXCJlZGY4ZTljN2U5YzBhMWQ5OWI3NGM0NzY0MWFiNWQyMzhiNDUwMDVhMzJcIixcbiAgXCJmN2ZjZjVlNWY1ZTBjN2U5YzBhMWQ5OWI3NGM0NzY0MWFiNWQyMzhiNDUwMDVhMzJcIixcbiAgXCJmN2ZjZjVlNWY1ZTBjN2U5YzBhMWQ5OWI3NGM0NzY0MWFiNWQyMzhiNDUwMDZkMmMwMDQ0MWJcIlxuKS5tYXAoY29sb3JzKTtcblxuZXhwb3J0IGRlZmF1bHQgcmFtcChzY2hlbWUpO1xuIiwiaW1wb3J0IGNvbG9ycyBmcm9tIFwiLi4vY29sb3JzLmpzXCI7XG5pbXBvcnQgcmFtcCBmcm9tIFwiLi4vcmFtcC5qc1wiO1xuXG5leHBvcnQgdmFyIHNjaGVtZSA9IG5ldyBBcnJheSgzKS5jb25jYXQoXG4gIFwiZjBmMGYwYmRiZGJkNjM2MzYzXCIsXG4gIFwiZjdmN2Y3Y2NjY2NjOTY5Njk2NTI1MjUyXCIsXG4gIFwiZjdmN2Y3Y2NjY2NjOTY5Njk2NjM2MzYzMjUyNTI1XCIsXG4gIFwiZjdmN2Y3ZDlkOWQ5YmRiZGJkOTY5Njk2NjM2MzYzMjUyNTI1XCIsXG4gIFwiZjdmN2Y3ZDlkOWQ5YmRiZGJkOTY5Njk2NzM3MzczNTI1MjUyMjUyNTI1XCIsXG4gIFwiZmZmZmZmZjBmMGYwZDlkOWQ5YmRiZGJkOTY5Njk2NzM3MzczNTI1MjUyMjUyNTI1XCIsXG4gIFwiZmZmZmZmZjBmMGYwZDlkOWQ5YmRiZGJkOTY5Njk2NzM3MzczNTI1MjUyMjUyNTI1MDAwMDAwXCJcbikubWFwKGNvbG9ycyk7XG5cbmV4cG9ydCBkZWZhdWx0IHJhbXAoc2NoZW1lKTtcbiIsImltcG9ydCBjb2xvcnMgZnJvbSBcIi4uL2NvbG9ycy5qc1wiO1xuaW1wb3J0IHJhbXAgZnJvbSBcIi4uL3JhbXAuanNcIjtcblxuZXhwb3J0IHZhciBzY2hlbWUgPSBuZXcgQXJyYXkoMykuY29uY2F0KFxuICBcImZlZTZjZWZkYWU2YmU2NTUwZFwiLFxuICBcImZlZWRkZWZkYmU4NWZkOGQzY2Q5NDcwMVwiLFxuICBcImZlZWRkZWZkYmU4NWZkOGQzY2U2NTUwZGE2MzYwM1wiLFxuICBcImZlZWRkZWZkZDBhMmZkYWU2YmZkOGQzY2U2NTUwZGE2MzYwM1wiLFxuICBcImZlZWRkZWZkZDBhMmZkYWU2YmZkOGQzY2YxNjkxM2Q5NDgwMThjMmQwNFwiLFxuICBcImZmZjVlYmZlZTZjZWZkZDBhMmZkYWU2YmZkOGQzY2YxNjkxM2Q5NDgwMThjMmQwNFwiLFxuICBcImZmZjVlYmZlZTZjZWZkZDBhMmZkYWU2YmZkOGQzY2YxNjkxM2Q5NDgwMWE2MzYwMzdmMjcwNFwiXG4pLm1hcChjb2xvcnMpO1xuXG5leHBvcnQgZGVmYXVsdCByYW1wKHNjaGVtZSk7XG4iLCJpbXBvcnQgY29sb3JzIGZyb20gXCIuLi9jb2xvcnMuanNcIjtcbmltcG9ydCByYW1wIGZyb20gXCIuLi9yYW1wLmpzXCI7XG5cbmV4cG9ydCB2YXIgc2NoZW1lID0gbmV3IEFycmF5KDMpLmNvbmNhdChcbiAgXCJlZmVkZjViY2JkZGM3NTZiYjFcIixcbiAgXCJmMmYwZjdjYmM5ZTI5ZTlhYzg2YTUxYTNcIixcbiAgXCJmMmYwZjdjYmM5ZTI5ZTlhYzg3NTZiYjE1NDI3OGZcIixcbiAgXCJmMmYwZjdkYWRhZWJiY2JkZGM5ZTlhYzg3NTZiYjE1NDI3OGZcIixcbiAgXCJmMmYwZjdkYWRhZWJiY2JkZGM5ZTlhYzg4MDdkYmE2YTUxYTM0YTE0ODZcIixcbiAgXCJmY2ZiZmRlZmVkZjVkYWRhZWJiY2JkZGM5ZTlhYzg4MDdkYmE2YTUxYTM0YTE0ODZcIixcbiAgXCJmY2ZiZmRlZmVkZjVkYWRhZWJiY2JkZGM5ZTlhYzg4MDdkYmE2YTUxYTM1NDI3OGYzZjAwN2RcIlxuKS5tYXAoY29sb3JzKTtcblxuZXhwb3J0IGRlZmF1bHQgcmFtcChzY2hlbWUpO1xuIiwiaW1wb3J0IGNvbG9ycyBmcm9tIFwiLi4vY29sb3JzLmpzXCI7XG5pbXBvcnQgcmFtcCBmcm9tIFwiLi4vcmFtcC5qc1wiO1xuXG5leHBvcnQgdmFyIHNjaGVtZSA9IG5ldyBBcnJheSgzKS5jb25jYXQoXG4gIFwiZmVlMGQyZmM5MjcyZGUyZDI2XCIsXG4gIFwiZmVlNWQ5ZmNhZTkxZmI2YTRhY2IxODFkXCIsXG4gIFwiZmVlNWQ5ZmNhZTkxZmI2YTRhZGUyZDI2YTUwZjE1XCIsXG4gIFwiZmVlNWQ5ZmNiYmExZmM5MjcyZmI2YTRhZGUyZDI2YTUwZjE1XCIsXG4gIFwiZmVlNWQ5ZmNiYmExZmM5MjcyZmI2YTRhZWYzYjJjY2IxODFkOTkwMDBkXCIsXG4gIFwiZmZmNWYwZmVlMGQyZmNiYmExZmM5MjcyZmI2YTRhZWYzYjJjY2IxODFkOTkwMDBkXCIsXG4gIFwiZmZmNWYwZmVlMGQyZmNiYmExZmM5MjcyZmI2YTRhZWYzYjJjY2IxODFkYTUwZjE1NjcwMDBkXCJcbikubWFwKGNvbG9ycyk7XG5cbmV4cG9ydCBkZWZhdWx0IHJhbXAoc2NoZW1lKTtcbiIsIi8vQHRzLWNoZWNrXG5cbmltcG9ydCB7IENhbnZhc0dlbyB9IGZyb20gJy4vQ2FudmFzR2VvJztcbmltcG9ydCB7IExheWVyIH0gZnJvbSAnLi9MYXllcic7XG5pbXBvcnQgeyBTdHlsZSB9IGZyb20gJy4vU3R5bGUnO1xuaW1wb3J0IHsgRGF0YXNldCwgQ2VsbCB9IGZyb20gJy4vRGF0YXNldCc7XG5cbmltcG9ydCB7IENTVkdyaWQgfSBmcm9tICcuL2RhdGFzZXQvQ1NWR3JpZCc7XG5pbXBvcnQgeyBUaWxlZEdyaWQgfSBmcm9tICcuL2RhdGFzZXQvVGlsZWRHcmlkJztcblxuLyoqXG4gKiBBIGdyaWR2aXogb24gYSBIVE1MIGNhbnZhcy5cbiAqIFxuICogQGF1dGhvciBKdWxpZW4gR2FmZnVyaVxuICovXG5leHBvcnQgY2xhc3MgQXBwIHtcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRzIFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG9wdHMpIHtcbiAgICAgICAgb3B0cyA9IG9wdHMgfHwge307XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBsYXllcnMuXG4gICAgICAgICAqIEB0eXBlIHtBcnJheS48TGF5ZXI+fVxuICAgICAgICAgKiAqL1xuICAgICAgICAgdGhpcy5sYXllcnMgPSBbXTtcblxuICAgICAgICAvL2dldCBjYW52YXMgZWxlbWVudFxuICAgICAgICBvcHRzLmNhbnZhc0lkID0gb3B0cy5jYW52YXNJZCB8fCBcInZhY2FudmFzXCI7XG4gICAgICAgIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKG9wdHMuY2FudmFzSWQpO1xuXG4gICAgICAgIC8vc2V0IGRpbWVuc2lvbnNcbiAgICAgICAgLyoqIEB0eXBlIHtudW1iZXJ9ICovXG4gICAgICAgIHRoaXMudyA9IG9wdHMudyB8fCBjYW52YXMub2Zmc2V0V2lkdGg7XG4gICAgICAgIC8qKiBAdHlwZSB7bnVtYmVyfSAqL1xuICAgICAgICB0aGlzLmggPSBvcHRzLmggfHwgY2FudmFzLm9mZnNldEhlaWdodDtcblxuICAgICAgICAvKiogQmFja2dyb3VuZCBjb2xvci5cbiAgICAgICAgICogQHR5cGUge3N0cmluZ30gKi9cbiAgICAgICAgdGhpcy5iYWNrZ3JvdW5kQ29sb3JfID0gb3B0cy5iYWNrZ3JvdW5kQ29sb3IgfHwgXCJ3aGl0ZVwiXG5cblxuICAgICAgICAvKiogTWFrZSBnZW8gY2FudmFzXG4gICAgICAgICAqIEB0eXBlIHtDYW52YXNHZW99ICovXG4gICAgICAgIHRoaXMuY2cgPSBuZXcgQ2FudmFzR2VvKCk7XG4gICAgICAgIGNvbnN0IHRoID0gdGhpcztcbiAgICAgICAgdGhpcy5jZy5yZWRyYXcgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgIC8vZ28gdGhyb3VnaCB0aGUgbGlzdCBvZiBsYXllcnMgYW5kIGZpbmQgdGhlIG9uZShzKSB0byBkcmF3XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGxheWVyIG9mIHRoLmxheWVycykge1xuXG4gICAgICAgICAgICAgICAgLy9za2lwIGxheWVyIG5vdCB3aXRoaW4gdGhlIHpvb20gcmFuZ2VcbiAgICAgICAgICAgICAgICBpZiAobGF5ZXIubWluWm9vbSA+PSB0aGlzLnpmKSBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBpZiAobGF5ZXIubWF4Wm9vbSA8IHRoaXMuemYpIGNvbnRpbnVlO1xuXG4gICAgICAgICAgICAgICAgLy9nZXQgZGF0YSB0byBzaG93XG4gICAgICAgICAgICAgICAgbGF5ZXIuZGF0YXNldC5nZXREYXRhKHRoaXMudXBkYXRlRXh0ZW50R2VvKCksICgpID0+IHsgdGguZHJhdyhsYXllcik7IH0pO1xuXG4gICAgICAgICAgICAgICAgLy9kcmF3IGNlbGxzXG4gICAgICAgICAgICAgICAgdGguZHJhdyhsYXllcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpc1xuICAgICAgICB9O1xuXG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBBZGQgYSBsYXllci5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0RhdGFzZXR9IGRhdGFzZXQgVGhlIGRhdGFzZXQgdG8gc2hvd1xuICAgICAqIEBwYXJhbSB7QXJyYXkuPFN0eWxlPn0gc3R5bGVzIFRoZSBzdHlsZXMsIG9yZGVyZWQgaW4gZHJhd2luZyBvcmRlci5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbWluWm9vbSBUaGUgbWluaW11bSB6b29tIGxldmVsIHdoZW4gdG8gc2hvdyB0aGUgbGF5ZXJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbWF4Wm9vbSBUaGUgbWF4aW11bSB6b29tIGxldmVsIHdoZW4gdG8gc2hvdyB0aGUgbGF5ZXJcbiAgICAgKiBAcmV0dXJucyB7dGhpc31cbiAgICAgKi9cbiAgICBhZGRMYXllcihkYXRhc2V0LCBzdHlsZXMsIG1pblpvb20sIG1heFpvb20pIHtcbiAgICAgICAgdGhpcy5sYXllcnMucHVzaChuZXcgTGF5ZXIoZGF0YXNldCwgc3R5bGVzLCBtaW5ab29tLCBtYXhab29tKSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZCBhIGxheWVyIGZyb20gYSB0aWxlZCBncmlkIGRhdGFzZXQuXG4gICAgICogXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVybCBUaGUgdXJsIG9mIHRoZSBkYXRhc2V0IGluZm8uanNvbiBmaWxlLlxuICAgICAqIEBwYXJhbSB7QXJyYXkuPFN0eWxlPn0gc3R5bGVzIFRoZSBzdHlsZXMsIG9yZGVyZWQgaW4gZHJhd2luZyBvcmRlci5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbWluWm9vbSBUaGUgbWluaW11bSB6b29tIGxldmVsIHdoZW4gdG8gc2hvdyB0aGUgbGF5ZXJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbWF4Wm9vbSBUaGUgbWF4aW11bSB6b29tIGxldmVsIHdoZW4gdG8gc2hvdyB0aGUgbGF5ZXJcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9uKENlbGwpOnZvaWR9IHByZXByb2Nlc3MgQSBwcmVwcm9jZXNzIHRvIHJ1biBvbiBlYWNoIGNlbGwgYWZ0ZXIgbG9hZGluZy4gSXQgY2FuIGJlIHVzZWQgdG8gYXBwbHkgc29tZSBzcGVjaWZpYyB0cmVhdG1lbnQgYmVmb3JlIG9yIGNvbXB1dGUgYSBuZXcgY29sdW1uLlxuICAgICAqIEByZXR1cm5zIHt0aGlzfVxuICAgICAqL1xuICAgIGFkZFRpbGVkR3JpZCh1cmwsIHN0eWxlcywgbWluWm9vbSwgbWF4Wm9vbSwgcHJlcHJvY2VzcyA9IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWRkTGF5ZXIoXG4gICAgICAgICAgICBuZXcgVGlsZWRHcmlkKHVybCwgdGhpcywgcHJlcHJvY2VzcykubG9hZEluZm8oKCkgPT4geyB0aGlzLmNnLnJlZHJhdygpOyB9KSxcbiAgICAgICAgICAgIHN0eWxlcywgbWluWm9vbSwgbWF4Wm9vbVxuICAgICAgICApXG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBBZGQgYSBsYXllciBmcm9tIGEgQ1NWIGdyaWQgZGF0YXNldC5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXJsIFRoZSB1cmwgb2YgdGhlIGRhdGFzZXQuXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHJlc29sdXRpb24gVGhlIGRhdGFzZXQgcmVzb2x1dGlvbiAoaW4gZ2VvZ3JhcGhpY2FsIHVuaXQpLlxuICAgICAqIEBwYXJhbSB7QXJyYXkuPFN0eWxlPn0gc3R5bGVzIFRoZSBzdHlsZXMsIG9yZGVyZWQgaW4gZHJhd2luZyBvcmRlci5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbWluWm9vbSBUaGUgbWluaW11bSB6b29tIGxldmVsIHdoZW4gdG8gc2hvdyB0aGUgbGF5ZXJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbWF4Wm9vbSBUaGUgbWF4aW11bSB6b29tIGxldmVsIHdoZW4gdG8gc2hvdyB0aGUgbGF5ZXJcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9uKENlbGwpOnZvaWR9IHByZXByb2Nlc3MgQSBwcmVwcm9jZXNzIHRvIHJ1biBvbiBlYWNoIGNlbGwgYWZ0ZXIgbG9hZGluZy4gSXQgY2FuIGJlIHVzZWQgdG8gYXBwbHkgc29tZSBzcGVjaWZpYyB0cmVhdG1lbnQgYmVmb3JlIG9yIGNvbXB1dGUgYSBuZXcgY29sdW1uLlxuICAgICAqIEByZXR1cm5zIHt0aGlzfVxuICAgICAqL1xuICAgIGFkZENTVkdyaWQodXJsLCByZXNvbHV0aW9uLCBzdHlsZXMsIG1pblpvb20sIG1heFpvb20sIHByZXByb2Nlc3MgPSBudWxsKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFkZExheWVyKFxuICAgICAgICAgICAgbmV3IENTVkdyaWQodXJsLCByZXNvbHV0aW9uLCBwcmVwcm9jZXNzKS5nZXREYXRhKG51bGwsICgpID0+IHsgdGhpcy5jZy5yZWRyYXcoKTsgfSksXG4gICAgICAgICAgICBzdHlsZXMsIG1pblpvb20sIG1heFpvb21cbiAgICAgICAgKVxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogRHJhdyBhIGxheWVyLlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7TGF5ZXJ9IGxheWVyIFxuICAgICAqIEByZXR1cm5zIHt0aGlzfVxuICAgICAqL1xuICAgIGRyYXcobGF5ZXIpIHtcblxuICAgICAgICAvL2dldCBjZWxscyB0byBkcmF3XG4gICAgICAgIGNvbnN0IGNlbGxzID0gbGF5ZXIuZGF0YXNldC5nZXRDZWxscyh0aGlzLmNnLmV4dEdlbylcblxuICAgICAgICAvL2NsZWFyXG4gICAgICAgIHRoaXMuY2cuY2xlYXIodGhpcy5iYWNrZ3JvdW5kQ29sb3JfKTtcblxuICAgICAgICAvL2RyYXcgY2VsbHMsIHN0eWxlIGJ5IHN0eWxlXG4gICAgICAgIGZvciAoY29uc3Qgc3R5bGUgb2YgbGF5ZXIuc3R5bGVzKVxuICAgICAgICAgICAgc3R5bGUuZHJhdyhjZWxscywgbGF5ZXIuZGF0YXNldC5yZXNvbHV0aW9uLCB0aGlzLmNnKVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBTZXQgdmlld2VyIHBvc2l0aW9uLlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7e3g6bnVtYmVyLHk6bnVtYmVyfT19IHBvcyBcbiAgICAgKiBAcmV0dXJucyB7dGhpc3x7eDpudW1iZXIseTpudW1iZXJ9fVxuICAgICAqL1xuICAgIGdlb0NlbnRlcihwb3MpIHtcbiAgICAgICAgaWYgKHBvcykge1xuICAgICAgICAgICAgdGhpcy5jZy5jZW50ZXIgPSBwb3M7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5jZy5jZW50ZXI7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IHZpZXdlciB6b29tIGxldmVsIChncm91bmQgcGl4ZWwgc2l6ZSkuXG4gICAgICogXG4gICAgICogQHBhcmFtIHtudW1iZXI9fSB6ZlxuICAgICAqIEByZXR1cm5zIHt0aGlzfG51bWJlcn1cbiAgICAgKi9cbiAgICAgem9vbUZhY3Rvcih6Zikge1xuICAgICAgICBpZiAoemYpIHtcbiAgICAgICAgICAgIHRoaXMuY2cuemYgPSB6ZjtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmNnLnpmO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldCB2aWV3ZXIgem9vbSBsZXZlbCAoZ3JvdW5kIHBpeGVsIHNpemUpLlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7c3RyaW5nPX0gYmFja2dyb3VuZENvbG9yIFxuICAgICAqIEByZXR1cm5zIHt0aGlzfHN0cmluZ31cbiAgICAgKi9cbiAgICAgYmFja2dyb3VuZENvbG9yKGJhY2tncm91bmRDb2xvcikge1xuICAgICAgICBpZiAoYmFja2dyb3VuZENvbG9yKSB7XG4gICAgICAgICAgICB0aGlzLmJhY2tncm91bmRDb2xvcl8gPSBiYWNrZ3JvdW5kQ29sb3I7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5iYWNrZ3JvdW5kQ29sb3JfO1xuICAgIH1cblxufVxuIiwiLy9AdHMtY2hlY2tcbi8qKiBAdHlwZWRlZiB7IHt4TWluOiBudW1iZXIsIHhNYXg6IG51bWJlciwgeU1pbjogbnVtYmVyLCB5TWF4OiBudW1iZXJ9IH0gRW52ZWxvcGUgKi9cblxuLyoqXG4gKiBBIEhUTUwgY2FudmFzLCBlbmhhbmNlZCB3aXRoIHpvb20gYW5kIHBhbiBjYXBhYmlsaXRpZXMuXG4gKiBcbiAqIEBhdXRob3IgSnVsaWVuIEdhZmZ1cmlcbiAqL1xuZXhwb3J0IGNsYXNzIENhbnZhc0dlbyB7XG5cbiAgICAvKipcbiAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY2FudmFzSWRcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gY2VudGVyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHpmXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoY2FudmFzSWQgPSBcInZhY2FudmFzXCIsIGNlbnRlciA9IHVuZGVmaW5lZCwgemYgPSAxKSB7XG5cbiAgICAgICAgLyoqIEB0eXBlIHsqfSAqL1xuICAgICAgICB0aGlzLmNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGNhbnZhc0lkKTtcblxuICAgICAgICAvKiogQHR5cGUge251bWJlcn0gKi9cbiAgICAgICAgdGhpcy53ID0gdGhpcy5jYW52YXMub2Zmc2V0V2lkdGg7XG4gICAgICAgIC8qKiBAdHlwZSB7bnVtYmVyfSAqL1xuICAgICAgICB0aGlzLmggPSB0aGlzLmNhbnZhcy5vZmZzZXRIZWlnaHQ7XG5cbiAgICAgICAgdGhpcy5jYW52YXMud2lkdGggPSB0aGlzLnc7XG4gICAgICAgIHRoaXMuY2FudmFzLmhlaWdodCA9IHRoaXMuaDtcblxuICAgICAgICAvKipAdHlwZSB7T2JqZWN0fSAqL1xuICAgICAgICB0aGlzLmN0eCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcblxuICAgICAgICAvLyBnZW8gY29vcmRpbmF0ZXMgb2YgdGhlIGNlbnRlclxuICAgICAgICAvKiogQHR5cGUge3t4Om51bWJlcix5Om51bWJlcn19ICovXG4gICAgICAgIHRoaXMuY2VudGVyID0gY2VudGVyIHx8IHsgeDogdGhpcy53ICogMC41LCB5OiB0aGlzLmggKiAwLjUgfVxuXG4gICAgICAgIC8vIHpvb20gZmFjdG9yOiBwaXhlbCBzaXplLCBpbiBtL3BpeFxuICAgICAgICAvKiogQHR5cGUge251bWJlcn0gKi9cbiAgICAgICAgdGhpcy56ZiA9IHpmO1xuXG4gICAgICAgIC8vZXh0ZW50XG4gICAgICAgIC8qKiBAdHlwZSB7e3hNaW46IG51bWJlciwgeE1heDogbnVtYmVyLCB5TWluOiBudW1iZXIsIHlNYXg6IG51bWJlcn19ICovXG4gICAgICAgIHRoaXMuZXh0R2VvID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLnVwZGF0ZUV4dGVudEdlbygpXG5cbiAgICAgICAgLy9tb3VzZSBjbGljayAtIHBhblxuICAgICAgICBsZXQgbXBhbiA9IGZhbHNlXG4gICAgICAgIHRoaXMuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgZSA9PiB7IG1wYW4gPSB0cnVlIH0pO1xuICAgICAgICB0aGlzLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIGUgPT4ge1xuICAgICAgICAgICAgaWYgKG1wYW4pIHRoaXMucGFuKC1lLm1vdmVtZW50WCAqIHRoaXMuemYsIGUubW92ZW1lbnRZICogdGhpcy56ZilcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIGUgPT4geyBtcGFuID0gZmFsc2UgfSk7XG5cbiAgICAgICAgLy9tb3VzZSB3aGVlbCAtIHpvb21cbiAgICAgICAgY29uc3QgZiA9IDEuNVxuICAgICAgICB0aGlzLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKFwid2hlZWxcIiwgZSA9PiB7XG4gICAgICAgICAgICBjb25zdCBmXyA9IGUuZGVsdGFZID4gMCA/IGYgOiAxIC8gZjtcbiAgICAgICAgICAgIHRoaXMuem9vbShmXywgdGhpcy5waXhUb0dlb1goZS5vZmZzZXRYKSwgdGhpcy5waXhUb0dlb1koZS5vZmZzZXRZKSlcbiAgICAgICAgfSk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKi9cbiAgICByZWRyYXcoKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTWV0aG9kIHJlZHJhdyBub3QgaW1wbGVtZW50ZWQuJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2xlYXIgdGhlIGFwcCBzY3JlZW4uXG4gICAgICogVG8gYmUgdXNlZCBiZWZvcmUgYSByZWRyYXcgZm9yIGV4YW1wbGUuXG4gICAgICogQHBhcmFtIHsqfSBjb2xvciBcbiAgICAgKi9cbiAgICBjbGVhcihjb2xvcj1cIndoaXRlXCIpIHtcbiAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gY29sb3I7XG4gICAgICAgIHRoaXMuY3R4LmZpbGxSZWN0KDAsIDAsIHRoaXMudywgdGhpcy5oKTtcbiAgICB9XG5cbiAgICAvL2NvbnZlcnNpb24gZnVuY3Rpb25zXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHhHZW9cbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgICovXG4gICAgZ2VvVG9QaXhYKHhHZW8pIHsgcmV0dXJuICh4R2VvIC0gdGhpcy5jZW50ZXIueCkgLyB0aGlzLnpmICsgdGhpcy53ICogMC41OyB9XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHlHZW9cbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgICovXG4gICAgZ2VvVG9QaXhZKHlHZW8pIHsgcmV0dXJuIC0oeUdlbyAtIHRoaXMuY2VudGVyLnkpIC8gdGhpcy56ZiArIHRoaXMuaCAqIDAuNTsgfVxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB4XG4gICAgICogQHJldHVybnMge251bWJlcn1cbiAgICAqL1xuICAgIHBpeFRvR2VvWCh4KSB7IHJldHVybiAoeCAtIHRoaXMudyAqIDAuNSkgKiB0aGlzLnpmICsgdGhpcy5jZW50ZXIueDsgfVxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB5XG4gICAgICogQHJldHVybnMge251bWJlcn1cbiAgICAqL1xuICAgIHBpeFRvR2VvWSh5KSB7IHJldHVybiAtKHkgLSB0aGlzLmggKiAwLjUpICogdGhpcy56ZiArIHRoaXMuY2VudGVyLnk7IH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBkeEdlb1xuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBkeUdlb1xuICAgICAqL1xuICAgIHBhbihkeEdlbywgZHlHZW8pIHtcbiAgICAgICAgdGhpcy5jZW50ZXIueCArPSBkeEdlbztcbiAgICAgICAgdGhpcy5jZW50ZXIueSArPSBkeUdlbztcbiAgICAgICAgdGhpcy51cGRhdGVFeHRlbnRHZW8oKVxuICAgICAgICB0aGlzLnJlZHJhdygpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBmXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHhHZW9cbiAgICAgKiBAcGFyYW0ge251bWJlcn0geUdlb1xuICAgICAqL1xuICAgIHpvb20oZiA9IDEsIHhHZW8gPSB0aGlzLmNlbnRlci54LCB5R2VvID0gdGhpcy5jZW50ZXIueSkge1xuICAgICAgICB0aGlzLnpmICo9IGY7XG4gICAgICAgIHRoaXMuY2VudGVyLnggKz0gKHhHZW8gLSB0aGlzLmNlbnRlci54KSAqICgxIC0gZilcbiAgICAgICAgdGhpcy5jZW50ZXIueSArPSAoeUdlbyAtIHRoaXMuY2VudGVyLnkpICogKDEgLSBmKVxuICAgICAgICB0aGlzLnVwZGF0ZUV4dGVudEdlbygpXG4gICAgICAgIHRoaXMucmVkcmF3KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG1hcmdpblB4IFxuICAgICAqIEByZXR1cm5zIHtFbnZlbG9wZX1cbiAgICAgKi9cbiAgICB1cGRhdGVFeHRlbnRHZW8obWFyZ2luUHggPSAyMCkge1xuICAgICAgICB0aGlzLmV4dEdlbyA9IHtcbiAgICAgICAgICAgIHhNaW46IHRoaXMucGl4VG9HZW9YKC1tYXJnaW5QeCksXG4gICAgICAgICAgICB4TWF4OiB0aGlzLnBpeFRvR2VvWCh0aGlzLncgKyBtYXJnaW5QeCksXG4gICAgICAgICAgICB5TWluOiB0aGlzLnBpeFRvR2VvWSh0aGlzLmggKyBtYXJnaW5QeCksXG4gICAgICAgICAgICB5TWF4OiB0aGlzLnBpeFRvR2VvWSgtbWFyZ2luUHgpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuZXh0R2VvO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIHRoZSBvYmplY3QgaGFzIHRvIGJlIGRyYXduXG4gICAgICogXG4gICAgICogQHBhcmFtIHt7eDpudW1iZXIseTpudW1iZXJ9fSBvYmogXG4gICAgICovXG4gICAgdG9EcmF3KG9iaikge1xuICAgICAgICBpZiAob2JqLnggPCB0aGlzLmV4dEdlby54TWluKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIGlmIChvYmoueCA+IHRoaXMuZXh0R2VvLnhNYXgpIHJldHVybiBmYWxzZTtcbiAgICAgICAgaWYgKG9iai55IDwgdGhpcy5leHRHZW8ueU1pbikgcmV0dXJuIGZhbHNlO1xuICAgICAgICBpZiAob2JqLnkgPiB0aGlzLmV4dEdlby55TWF4KSByZXR1cm4gZmFsc2U7XG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgfVxufVxuIiwiLy9AdHMtY2hlY2tcblxuLyoqIEB0eXBlZGVmIHsge3hNaW46IG51bWJlciwgeE1heDogbnVtYmVyLCB5TWluOiBudW1iZXIsIHlNYXg6IG51bWJlcn0gfSBFbnZlbG9wZSAqL1xuLyoqIEB0eXBlZGVmIHt7eDogbnVtYmVyLCB5OiBudW1iZXJ9fSBDZWxsICovXG5cbi8qKlxuICogQSBkYXRhc2V0IG9mIGdyaWQgY2VsbHMuXG4gKiBcbiAqIEBhYnN0cmFjdFxuICogXG4gKiBAYXV0aG9yIEp1bGllbiBHYWZmdXJpXG4gKi9cbmV4cG9ydCBjbGFzcyBEYXRhc2V0IHtcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgVGhlIHVybCBvZiB0aGUgZGF0YXNldC5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gcmVzb2x1dGlvbiBUaGUgZGF0YXNldCByZXNvbHV0aW9uIChpbiBnZW9ncmFwaGljYWwgdW5pdCkuXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbihDZWxsKTp2b2lkfSBwcmVwcm9jZXNzIEEgcHJlcHJvY2VzcyB0byBydW4gb24gZWFjaCBjZWxsIGFmdGVyIGxvYWRpbmcuIEl0IGNhbiBiZSB1c2VkIHRvIGFwcGx5IHNvbWUgc3BlY2lmaWMgdHJlYXRtZW50IGJlZm9yZSBvciBjb21wdXRlIGEgbmV3IGNvbHVtbi5cbiAgICAgKiBAYWJzdHJhY3RcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcih1cmwsIHJlc29sdXRpb24sIHByZXByb2Nlc3MgPSBudWxsKSB7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtzdHJpbmd9ICovXG4gICAgICAgIHRoaXMudXJsID0gdXJsO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7bnVtYmVyfSAqL1xuICAgICAgICB0aGlzLnJlc29sdXRpb24gPSByZXNvbHV0aW9uO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7ZnVuY3Rpb24oQ2VsbCk6dm9pZH0gKi9cbiAgICAgICAgdGhpcy5wcmVwcm9jZXNzID0gcHJlcHJvY2VzcztcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIFJlcXVlc3QgZGF0YSB3aXRoaW4gYSBnZW9ncmFwaGljIGVudmVsb3BlLlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7RW52ZWxvcGV9IGV4dEdlbyBcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9uKCk6dm9pZH0gY2FsbGJhY2sgXG4gICAgICogQHJldHVybnMge3RoaXN9XG4gICAgICogQGFic3RyYWN0XG4gICAgICovXG4gICAgZ2V0RGF0YShleHRHZW8sIGNhbGxiYWNrKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTWV0aG9kIGdldERhdGEgbm90IGltcGxlbWVudGVkLicpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7RW52ZWxvcGV9IGV4dEdlbyBcbiAgICAgKiBAcmV0dXJucyB7QXJyYXkuPENlbGw+fVxuICAgICAqIEBhYnN0cmFjdFxuICAgICAqL1xuICAgIGdldENlbGxzKGV4dEdlbykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ01ldGhvZCBnZXRDZWxscyBub3QgaW1wbGVtZW50ZWQuJyk7XG4gICAgfVxuXG59XG4iLCIvL0B0cy1jaGVja1xuXG5pbXBvcnQgeyBEYXRhc2V0IH0gZnJvbSBcIi4vRGF0YXNldFwiO1xuaW1wb3J0IHsgU3R5bGUgfSBmcm9tIFwiLi9TdHlsZVwiO1xuXG4vKipcbiAqIEEgZGF0YSBsYXllciwgd2hpY2ggc3BlY2lmaWVzIGEgZGF0YXNldCB0byBiZSBzaG93biB3aXRoaW4gYSBzcGVjaWZpZWQgem9vbSByYW5nZSwgd2l0aCBhIHNwZWNpZmllZCBzdHlsZS5cbiAqIFxuICogQGF1dGhvciBKdWxpZW4gR2FmZnVyaVxuICovXG5leHBvcnQgY2xhc3MgTGF5ZXIge1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtEYXRhc2V0fSBkYXRhc2V0IFRoZSBkYXRhc2V0IHRvIHNob3dcbiAgICAgKiBAcGFyYW0ge0FycmF5LjxTdHlsZT59IHN0eWxlcyBUaGUgc3R5bGVzLCBvcmRlcmVkIGluIGRyYXdpbmcgb3JkZXIuXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG1pblpvb20gVGhlIG1pbmltdW0gem9vbSBsZXZlbCB3aGVuIHRvIHNob3cgdGhlIGxheWVyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG1heFpvb20gVGhlIG1heGltdW0gem9vbSBsZXZlbCB3aGVuIHRvIHNob3cgdGhlIGxheWVyXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoZGF0YXNldCwgc3R5bGVzLCBtaW5ab29tLCBtYXhab29tKSB7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtEYXRhc2V0fSAqL1xuICAgICAgICB0aGlzLmRhdGFzZXQgPSBkYXRhc2V0O1xuICAgICAgICAvKiogQHR5cGUge0FycmF5LjxTdHlsZT59ICovXG4gICAgICAgIHRoaXMuc3R5bGVzID0gc3R5bGVzO1xuICAgICAgICAvKiogQHR5cGUge251bWJlcn0gKi9cbiAgICAgICAgdGhpcy5taW5ab29tID0gbWluWm9vbTtcbiAgICAgICAgLyoqIEB0eXBlIHtudW1iZXJ9ICovXG4gICAgICAgIHRoaXMubWF4Wm9vbSA9IG1heFpvb207XG5cbiAgICB9XG5cbn1cbiIsIi8vQHRzLWNoZWNrXG5pbXBvcnQgeyBDZWxsIH0gZnJvbSBcIi4vRGF0YXNldFwiO1xuaW1wb3J0IHsgQ2FudmFzR2VvIH0gZnJvbSAnLi9DYW52YXNHZW8nO1xuXG4vKiogRGVmaW5pdGlvbiBvZiBhIGNlbGwgc2l6ZSBwYXJhbWV0ZXIuXG4gKiB2YWw6IFRoZSBmdW5jdGlvbiByZXR1cm5pbmcgdGhlIHNpemUgb2YgYSBjZWxsLlxuICogdW5pdDogVGhlIHVuaXQgb2YgdGhlIHNpemUgdmFsdWUsIGVpdGhlciBpbiBwaXhlbCAoXCJwaXhcIikgb3IgaW4gZ2VvZ3JhcGhpY2FsIHVuaXQgKFwiZ2VvXCIpLlxuICogQHR5cGVkZWYge3t2YWw6IGZ1bmN0aW9uKENlbGwpOm51bWJlciwgdW5pdDogXCJwaXhcInxcImdlb1wifX0gU2l6ZSAqL1xuXG4vKipcbiAqIEEgc3R5bGUsIHRvIHNob3cgYSBncmlkIGRhdGFzZXQuXG4gKiBcbiAqIEBhYnN0cmFjdFxuICogXG4gKiBAYXV0aG9yIEp1bGllbiBHYWZmdXJpXG4gKi9cbmV4cG9ydCBjbGFzcyBTdHlsZSB7XG5cbiAgICAvKipcbiAgICAgKiBAYWJzdHJhY3RcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcigpIHtcblxuICAgICAgICAvKiogQW4gb2Zmc2V0LiBUaGlzIGlzIHRvIGFsdGVyIHRoZSBwb3NpdGlvbiBvZiBhbGwgc3ltYm9scyBpbiBhIGdpdmVuIGRpcmVjdGlvbi4gSW4gZ2VvZ3JhcGhpY2FsIHVuaXQuXG4gICAgICAgICAqIEB0eXBlIHt7ZHg6bnVtYmVyLGR5Om51bWJlcn19ICovXG4gICAgICAgIHRoaXMub2Zmc2V0XyA9IHsgZHg6IDAsIGR5OiAwIH07XG5cblxuICAgICAgICAvL3RoZSBjZWxsIHN0cm9rZVxuXG4gICAgICAgIC8qKiBUaGUgem9vbSBmYWN0b3IgbGltaXQgd2hlbiB0byBzaG93L2hpZGUgdGhlIHN0cm9rZS5cbiAgICAgICAgICogQHR5cGUge251bWJlcn0gKi9cbiAgICAgICAgdGhpcy56ZlN0cm9rZV8gPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgLyoqIFRoZSBzdHJva2UgY29sb3IuXG4gICAgICAgICAqIEB0eXBlIHtzdHJpbmd9ICovXG4gICAgICAgIHRoaXMuc3Ryb2tlQ29sb3JfID0gXCJsaWdodGdyYXlcIjtcblxuICAgICAgICAvKiogVGhlIHN0cm9rZSBsaW5lIHdpZHRoLCBpbiBwaXhlbHMuXG4gICAgICAgICAqIEB0eXBlIHtudW1iZXJ9ICovXG4gICAgICAgIHRoaXMuc3Ryb2tlV2lkdGhfID0gMS41O1xuXG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBEcmF3IGNlbGxzLlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7QXJyYXkuPENlbGw+fSBjZWxscyBUaGUgY2VsbHMgdG8gZHJhdy5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gcmVzb2x1dGlvbiBUaGVpciByZXNvbHV0aW9uIChpbiBnZW9ncmFwaGljIHVuaXQpXG4gICAgICogQHBhcmFtIHtDYW52YXNHZW99IGNnIFRoZSBjYW52YXMgd2hlcmUgdG8gZHJhdyB0aGVtLlxuICAgICAqIEBhYnN0cmFjdFxuICAgICAqL1xuICAgIGRyYXcoY2VsbHMsIHJlc29sdXRpb24sIGNnKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTWV0aG9kIGRyYXcgbm90IGltcGxlbWVudGVkLicpO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgKiBUaGUgb2Zmc2V0XG4gICAgKiBUaGlzIGlzIHRvIGFsdGVyIHRoZSBwb3NpdGlvbiBvZiBhbGwgc3ltYm9scyBpbiBhIGdpdmVuIGRpcmVjdGlvbi4gSW4gZ2VvZ3JhcGhpY2FsIHVuaXQuXG4gICAgKiBcbiAgICAqIEBwYXJhbSB7e2R4Om51bWJlcixkeTpudW1iZXJ9fSBvZmZzZXQgXG4gICAgKiBAcmV0dXJucyB7dGhpc3x7ZHg6bnVtYmVyLGR5Om51bWJlcn19XG4gICAgKi9cbiAgICBvZmZzZXQob2Zmc2V0KSB7XG4gICAgICAgIGlmIChvZmZzZXQpIHtcbiAgICAgICAgICAgIHRoaXMub2Zmc2V0XyA9IG9mZnNldDtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLm9mZnNldF87XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoZSB6b29tIGxpbWl0IHdoZW4gdG8gc2hvdy9oaWRlIHRoZSBzdHJva2UuXG4gICAgICogXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHpmU3Ryb2tlIFxuICAgICAqIEByZXR1cm5zIHt0aGlzfG51bWJlcn1cbiAgICAgKi9cbiAgICB6ZlN0cm9rZSh6ZlN0cm9rZSkge1xuICAgICAgICBpZiAoemZTdHJva2UpIHtcbiAgICAgICAgICAgIHRoaXMuemZTdHJva2VfID0gemZTdHJva2U7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy56ZlN0cm9rZV87XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhlIHN0cm9rZSBjb2xvci5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc3Ryb2tlQ29sb3IgXG4gICAgICogQHJldHVybnMge3RoaXN8c3RyaW5nfVxuICAgICAqL1xuICAgIHN0cm9rZUNvbG9yKHN0cm9rZUNvbG9yKSB7XG4gICAgICAgIGlmIChzdHJva2VDb2xvcikge1xuICAgICAgICAgICAgdGhpcy5zdHJva2VDb2xvcl8gPSBzdHJva2VDb2xvcjtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnN0cm9rZUNvbG9yXztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGUgc3Ryb2tlIGxpbmUgd2lkdGgsIGluIHBpeGVscy5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gc3Ryb2tlV2lkdGggXG4gICAgICogQHJldHVybnMge3RoaXN8bnVtYmVyfVxuICAgICAqL1xuICAgIHN0cm9rZVdpZHRoKHN0cm9rZVdpZHRoKSB7XG4gICAgICAgIGlmIChzdHJva2VXaWR0aCkge1xuICAgICAgICAgICAgdGhpcy5zdHJva2VXaWR0aF8gPSBzdHJva2VXaWR0aDtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnN0cm9rZVdpZHRoXztcbiAgICB9XG5cblxuXG5cbiAgICAvKipcbiAgICAgKiBEcmF3IHRoZSBzdHJva2Ugb2YgdGhlIGNlbGxzLCBhcyByZWN0YW5nbGUsIG9ubHkgZm9yIGRldGFpbGxlZCB6b29tIGxldmVscyB3aGVuIHRoZSBjZWxscyBhcmUgcXVpdGUgYmlnLlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7Q2VsbH0gY2VsbCBUaGUgY2VsbCB0byBkcmF3IHRoZSBzdHJva2Ugb2YuXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHJlc29sdXRpb24gVGhlaXIgcmVzb2x1dGlvbiAoaW4gZ2VvZ3JhcGhpYyB1bml0KVxuICAgICAqIEBwYXJhbSB7Q2FudmFzR2VvfSBjZyBUaGUgY2FudmFzIHdoZXJlIHRvIGRyYXcgdGhlbS5cbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9uKENlbGwpOnN0cmluZ30gc2hhcGUgVGhlIHNoYXBlIG9mIHRoZSBzdHJva2UuXG4gICAgICogQHBhcmFtIHtTaXplfSBzaXplIEEgZnVuY3Rpb24gcmV0dXJuaW5nIHRoZSBzaXplIG9mIGEgY2VsbCAoaW4gZ2VvZ3JhcGhpY2FsIHVuaXQpLlxuICAgICAqIEByZXR1cm5zIFxuICAgICAqL1xuICAgIGRyYXdTdHJva2UoY2VsbCwgcmVzb2x1dGlvbiwgY2csIHNoYXBlLCBzaXplKSB7XG4gICAgICAgIGlmICghdGhpcy56ZlN0cm9rZV8gfHwgY2cuemYgPiB0aGlzLnpmU3Ryb2tlXykgcmV0dXJuO1xuXG4gICAgICAgIGNnLmN0eC5zdHJva2VTdHlsZSA9IHRoaXMuc3Ryb2tlQ29sb3JfO1xuICAgICAgICBjZy5jdHgubGluZVdpZHRoID0gdGhpcy5zdHJva2VXaWR0aF87XG5cbiAgICAgICAgLy9zaXplXG4gICAgICAgIC8qKiBAdHlwZSB7bnVtYmVyfSAqL1xuICAgICAgICBzaXplID0gc2l6ZSB8fCB7IHZhbDogYyA9PiByZXNvbHV0aW9uLCB1bml0OiBcImdlb1wiIH07XG4gICAgICAgIC8vc2l6ZSAtIGluIHBpeGVsIGFuZCBnZW9cbiAgICAgICAgY29uc3Qgc1AgPSBzaXplLnVuaXQgPT09IFwicGl4XCIgPyBzaXplLnZhbChjZWxsKSA6IHNpemUudmFsKGNlbGwpIC8gY2cuemZcbiAgICAgICAgY29uc3Qgc0cgPSBjZy56ZiAqIHNQO1xuXG4gICAgICAgIGNvbnN0IHNoYXBlXyA9IHNoYXBlKGNlbGwpO1xuICAgICAgICBpZiAoc2hhcGVfID09PSBcInNxdWFyZVwiKSB7XG4gICAgICAgICAgICAvL2RyYXcgc3F1YXJlXG4gICAgICAgICAgICBjb25zdCBkID0gcmVzb2x1dGlvbiAqICgxIC0gc0cgLyByZXNvbHV0aW9uKSAqIDAuNVxuICAgICAgICAgICAgY2cuY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgY2cuY3R4LnJlY3QoXG4gICAgICAgICAgICAgICAgY2cuZ2VvVG9QaXhYKGNlbGwueCArIGQgKyB0aGlzLm9mZnNldF8uZHgpLFxuICAgICAgICAgICAgICAgIGNnLmdlb1RvUGl4WShjZWxsLnkgKyByZXNvbHV0aW9uIC0gZCArIHRoaXMub2Zmc2V0Xy5keSksXG4gICAgICAgICAgICAgICAgc1AsIHNQKTtcbiAgICAgICAgICAgIGNnLmN0eC5zdHJva2UoKTtcblxuICAgICAgICB9IGVsc2UgaWYgKHNoYXBlXyA9PT0gXCJjaXJjbGVcIikge1xuICAgICAgICAgICAgLy9kcmF3IGNpcmNsZVxuICAgICAgICAgICAgY2cuY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgY2cuY3R4LmFyYyhcbiAgICAgICAgICAgICAgICBjZy5nZW9Ub1BpeFgoY2VsbC54ICsgcmVzb2x1dGlvbiAqIDAuNSArIHRoaXMub2Zmc2V0Xy5keCksXG4gICAgICAgICAgICAgICAgY2cuZ2VvVG9QaXhZKGNlbGwueSArIHJlc29sdXRpb24gKiAwLjUgKyB0aGlzLm9mZnNldF8uZHkpLFxuICAgICAgICAgICAgICAgIHNQICogMC41LFxuICAgICAgICAgICAgICAgIDAsIDIgKiBNYXRoLlBJLCBmYWxzZSk7XG4gICAgICAgICAgICBjZy5jdHguc3Ryb2tlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbn1cbiIsIi8vQHRzLWNoZWNrXG4vKiogQHR5cGVkZWYge3sgZGltczogb2JqZWN0LCBjcnM6IHN0cmluZywgdGlsZVNpemVDZWxsOiBudW1iZXIsIG9yaWdpblBvaW50OiB7eDpudW1iZXIseTpudW1iZXJ9LCByZXNvbHV0aW9uR2VvOiBudW1iZXIsIHRpbGluZ0JvdW5kczpFbnZlbG9wZSB9fSBHcmlkSW5mbyAqL1xuXG5pbXBvcnQgeyBjc3YgfSBmcm9tIFwiZDMtZmV0Y2hcIjtcbmltcG9ydCB7IERhdGFzZXQsIENlbGwsIEVudmVsb3BlIH0gZnJvbSBcIi4uL0RhdGFzZXRcIlxuXG4vKipcbiAqIEEgZGF0YXNldCBjb21wb3NlZCBvZiBhIHNpbmdsZSBDU1YgZmlsZSAobm90IHRpbGVkKS5cbiAqIFxuICogQGF1dGhvciBKdWxpZW4gR2FmZnVyaVxuICovXG5leHBvcnQgY2xhc3MgQ1NWR3JpZCBleHRlbmRzIERhdGFzZXQge1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVybCBUaGUgdXJsIG9mIHRoZSBkYXRhc2V0LlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSByZXNvbHV0aW9uIFRoZSBkYXRhc2V0IHJlc29sdXRpb24gKGluIGdlb2dyYXBoaWNhbCB1bml0KS5cbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9uKENlbGwpOnZvaWR9IHByZXByb2Nlc3MgQSBwcmVwcm9jZXNzIHRvIHJ1biBvbiBlYWNoIGNlbGwgYWZ0ZXIgbG9hZGluZy4gSXQgY2FuIGJlIHVzZWQgdG8gYXBwbHkgc29tZSBzcGVjaWZpYyB0cmVhdG1lbnQgYmVmb3JlIG9yIGNvbXB1dGUgYSBuZXcgY29sdW1uLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHVybCwgcmVzb2x1dGlvbiwgcHJlcHJvY2VzcyA9IG51bGwpIHtcbiAgICAgICAgc3VwZXIodXJsLCByZXNvbHV0aW9uLCBwcmVwcm9jZXNzKVxuXG4gICAgICAgIC8qKiBAdHlwZSB7QXJyYXkuPENlbGw+fSAqL1xuICAgICAgICB0aGlzLmNlbGxzID0gdW5kZWZpbmVkO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogUmVxdWVzdCBkYXRhIHdpdGhpbiBhIGdlb2dyYXBoaWMgZW52ZWxvcGUuXG4gICAgICogXG4gICAgICogQHBhcmFtIHtFbnZlbG9wZX0gZSBcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9uKCk6dm9pZH0gcmVkcmF3IFxuICAgICAqL1xuICAgIGdldERhdGEoZSwgcmVkcmF3KSB7XG5cbiAgICAgICAgLy9UT0RPIGVuc3VyZSBpdCBpcyBub3QgbG9hZGluZyB0d2ljZSA/XG5cbiAgICAgICAgLy9jaGVjayBpZiBkYXRhIGFscmVhZHkgbG9hZGVkXG4gICAgICAgIGlmKHRoaXMuY2VsbHMpIHJldHVybiB0aGlzO1xuXG4gICAgICAgIC8vbG9hZCBkYXRhXG4gICAgICAgIGNzdih0aGlzLnVybClcbiAgICAgICAgLnRoZW4oXG4gICAgICAgICAgICAvKiogQHBhcmFtIHsqfSBkYXRhICovXG4gICAgICAgICAgICAoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgIC8vY29udmVydCBjb29yZGluYXRlcyBpbiBudW1iZXJzXG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBjIG9mIGRhdGEpIHsgYy54PStjLng7IGMueT0rYy55OyB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLmNlbGxzID0gZGF0YTtcblxuICAgICAgICAgICAgICAgIC8vZXhlY3V0ZSBwcmVwcm9jZXNzLCBpZiBhbnlcbiAgICAgICAgICAgICAgICBpZih0aGlzLnByZXByb2Nlc3MpIGZvciAoY29uc3QgYyBvZiB0aGlzLmNlbGxzKSB0aGlzLnByZXByb2Nlc3MoYyk7XG5cbiAgICAgICAgICAgICAgICAvL1RPRE8gY2hlY2sgaWYgcmVkcmF3IGlzIG5lY2Vzc2FyeVxuICAgICAgICAgICAgICAgIC8vdGhhdCBpcyBpZiB0aGUgZGF0YXNldCBiZWxvbmdzIHRvIGEgbGF5ZXIgd2hpY2ggaXMgdmlzaWJsZSBhdCB0aGUgY3VycmVudCB6b29tIGxldmVsXG5cbiAgICAgICAgICAgICAgICAvL2V4ZWN1dGUgdGhlIGNhbGxiYWNrLCB1c3VhbGx5IGEgZHJhdyBmdW5jdGlvblxuICAgICAgICAgICAgICAgIGlmKHJlZHJhdykgcmVkcmF3KClcbiAgICAgICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICAvL21hcmsgYXMgZmFpbGVkXG4gICAgICAgICAgICB0aGlzLmNlbGxzID0gW11cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBHZXQgYWxsIGNlbGxzIGZyb20gY2FjaGUgd2hpY2ggYXJlIHdpdGhpbiBhIGdlb2dyYXBoaWNhbCBlbnZlbG9wZS5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0VudmVsb3BlfSBleHRHZW8gXG4gICAgICogQHJldHVybnMge0FycmF5LjxDZWxsPn1cbiAgICAgKi9cbiAgICBnZXRDZWxscyhleHRHZW8pIHtcblxuICAgICAgICAvL2RhdGEgbm90IGxvYWRlZCB5ZXRcbiAgICAgICAgaWYoIXRoaXMuY2VsbHMpIHJldHVybiBbXTtcblxuICAgICAgICAvKiogQHR5cGUge0FycmF5LjxDZWxsPn0gKi9cbiAgICAgICAgbGV0IGNlbGxzID0gW11cbiAgICAgICAgZm9yIChjb25zdCBjZWxsIG9mIHRoaXMuY2VsbHMpIHtcbiAgICAgICAgICAgIGlmKCtjZWxsLnggKyB0aGlzLnJlc29sdXRpb24gPCBleHRHZW8ueE1pbikgY29udGludWU7XG4gICAgICAgICAgICBpZigrY2VsbC54IC0gdGhpcy5yZXNvbHV0aW9uID4gZXh0R2VvLnhNYXgpIGNvbnRpbnVlO1xuICAgICAgICAgICAgaWYoK2NlbGwueSArIHRoaXMucmVzb2x1dGlvbiA8IGV4dEdlby55TWluKSBjb250aW51ZTtcbiAgICAgICAgICAgIGlmKCtjZWxsLnkgLSB0aGlzLnJlc29sdXRpb24gPiBleHRHZW8ueU1heCkgY29udGludWU7XG4gICAgICAgICAgICBjZWxscy5wdXNoKGNlbGwpXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY2VsbHM7XG4gICAgfVxuXG59XG4iLCIvL0B0cy1jaGVja1xuXG5pbXBvcnQgeyBDZWxsIH0gZnJvbSBcIi4uL0RhdGFzZXRcIlxuaW1wb3J0IHsgR3JpZEluZm8gfSBmcm9tIFwiLi9UaWxlZEdyaWRcIlxuXG4vKipcbiAqIEEgZ3JpZCB0aWxlLlxuICogXG4gKiBAYXV0aG9yIEp1bGllbiBHYWZmdXJpXG4gKi9cbmV4cG9ydCBjbGFzcyBHcmlkVGlsZSB7XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge0FycmF5LjxDZWxsPn0gY2VsbHMgVGhlIHRpbGUgY2VsbHMuXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHhUIFRoZSBYIHBvc2l0aW9uIG9mIHRoZSB0aWxlLlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB5VCBUaGUgWSBwb3NpdGlvbiBvZiB0aGUgdGlsZS5cbiAgICAgKiBAcGFyYW0ge0dyaWRJbmZvfSBncmlkSW5mbyBUaGUgZ3JpZCBpbmZvIG9iamVjdC5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihjZWxscywgeFQsIHlULCBncmlkSW5mbykge1xuXG4gICAgICAgIC8qKiBAdHlwZSB7QXJyYXkuPENlbGw+fSAqL1xuICAgICAgICB0aGlzLmNlbGxzID0gY2VsbHM7XG4gICAgICAgIC8qKiBAdHlwZSB7bnVtYmVyfSAqL1xuICAgICAgICB0aGlzLnggPSB4VFxuICAgICAgICAvKiogQHR5cGUge251bWJlcn0gKi9cbiAgICAgICAgdGhpcy55ID0geVRcblxuICAgICAgICBjb25zdCByID0gZ3JpZEluZm8ucmVzb2x1dGlvbkdlbztcbiAgICAgICAgY29uc3QgcyA9IGdyaWRJbmZvLnRpbGVTaXplQ2VsbDtcblxuICAgICAgICAvKiogQHR5cGUge2ltcG9ydChcIi4uL0RhdGFzZXRcIikuRW52ZWxvcGV9ICovXG4gICAgICAgIHRoaXMuZXh0R2VvID0ge1xuICAgICAgICAgICAgeE1pbjogZ3JpZEluZm8ub3JpZ2luUG9pbnQueCArIHIgKiBzICogdGhpcy54LFxuICAgICAgICAgICAgeE1heDogZ3JpZEluZm8ub3JpZ2luUG9pbnQueCArIHIgKiBzICogKHRoaXMueCArIDEpLFxuICAgICAgICAgICAgeU1pbjogZ3JpZEluZm8ub3JpZ2luUG9pbnQueSArIHIgKiBzICogdGhpcy55LFxuICAgICAgICAgICAgeU1heDogZ3JpZEluZm8ub3JpZ2luUG9pbnQueSArIHIgKiBzICogKHRoaXMueSArIDEpXG4gICAgICAgIH1cblxuICAgICAgICAvL2NvbnZlcnQgY2VsbCBjb29yZGluYXRlcyBpbnRvIGdlb2dyYXBoaWNhbCBjb29yZGluYXRlc1xuICAgICAgICBmb3IgKGxldCBjZWxsIG9mIHRoaXMuY2VsbHMpIHtcbiAgICAgICAgICAgIGNlbGwueCA9IHRoaXMuZXh0R2VvLnhNaW4gKyBjZWxsLnggKiByO1xuICAgICAgICAgICAgY2VsbC55ID0gdGhpcy5leHRHZW8ueU1pbiArIGNlbGwueSAqIHI7XG4gICAgICAgIH1cbiAgICB9XG5cbn1cbiIsIi8vQHRzLWNoZWNrXG4vKiogQHR5cGVkZWYge3sgZGltczogb2JqZWN0LCBjcnM6IHN0cmluZywgdGlsZVNpemVDZWxsOiBudW1iZXIsIG9yaWdpblBvaW50OiB7eDpudW1iZXIseTpudW1iZXJ9LCByZXNvbHV0aW9uR2VvOiBudW1iZXIsIHRpbGluZ0JvdW5kczpFbnZlbG9wZSB9fSBHcmlkSW5mbyAqL1xuXG5pbXBvcnQgeyBqc29uLCBjc3YgfSBmcm9tIFwiZDMtZmV0Y2hcIjtcbmltcG9ydCB7IEdyaWRUaWxlIH0gZnJvbSAnLi9HcmlkVGlsZSc7XG5pbXBvcnQgeyBBcHAgfSBmcm9tICcuLi9BcHAnO1xuaW1wb3J0IHsgRGF0YXNldCwgQ2VsbCwgRW52ZWxvcGUgfSBmcm9tIFwiLi4vRGF0YXNldFwiXG5cbi8qKlxuICogQSB0aWxlZCBkYXRhc2V0LCBjb21wb3NlZCBvZiBDU1YgdGlsZXMuXG4gKiBcbiAqIEBhdXRob3IgSnVsaWVuIEdhZmZ1cmlcbiAqL1xuZXhwb3J0IGNsYXNzIFRpbGVkR3JpZCBleHRlbmRzIERhdGFzZXQge1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVybCBUaGUgdXJsIG9mIHRoZSBkYXRhc2V0IGluZm8uanNvbiBmaWxlLlxuICAgICAqIEBwYXJhbSB7QXBwfSBhcHAgVGhlIGFwcC5cbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9uKENlbGwpOnZvaWR9IHByZXByb2Nlc3MgQSBwcmVwcm9jZXNzIHRvIHJ1biBvbiBlYWNoIGNlbGwgYWZ0ZXIgbG9hZGluZy4gSXQgY2FuIGJlIHVzZWQgdG8gYXBwbHkgc29tZSBzcGVjaWZpYyB0cmVhdG1lbnQgYmVmb3JlIG9yIGNvbXB1dGUgYSBuZXcgY29sdW1uLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHVybCwgYXBwLCBwcmVwcm9jZXNzID0gbnVsbCkge1xuICAgICAgICBzdXBlcih1cmwsIHVuZGVmaW5lZCwgcHJlcHJvY2VzcylcblxuICAgICAgICAvKiogXG4gICAgICAgICAqIFRoZSBjYWNoZSBvZiB0aGUgbG9hZGVkIHRpbGVzLiBJdCBpcyBkb3VibGUgaW5kZXhlZDogYnkgeFQgYW5kIHRoZW4geVQuXG4gICAgICAgICAqIEV4YW1wbGU6IHRoaXMuY2FjaGVbeFRdW3lUXSByZXR1cm5zIHRoZSB0aWxlIGF0IFt4VF1beVRdIGxvY2F0aW9uLlxuICAgICAgICAgKiBcbiAgICAgICAgICogQHR5cGUge09iamVjdH1cbiAgICAgICAgICogKi9cbiAgICAgICAgdGhpcy5jYWNoZSA9IHt9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBncmlkIGluZm8gb2JqZWN0LCBmcm9tIHRoZSBpbmZvLmpzb24gZmlsZS5cbiAgICAgICAgICogXG4gICAgICAgICAqICBAdHlwZSB7R3JpZEluZm99XG4gICAgICAgICAqICAqL1xuICAgICAgICB0aGlzLmluZm8gPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBhcHAgYmVpbmcgdXNlZC5cbiAgICAgICAgICogXG4gICAgICAgICAqIEB0eXBlIHtBcHB9XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmFwcCA9IGFwcDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBMb2FkIHRoZSBpbmZvLmpzb24gZnJvbSB0aGUgdXJsLlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb24oKTp2b2lkfSBjYWxsYmFja1xuICAgICAqIEByZXR1cm5zIHRoaXNcbiAgICAgKi9cbiAgICBsb2FkSW5mbyhjYWxsYmFjaykge1xuICAgICAgICBpZiAoIXRoaXMuaW5mbylcbiAgICAgICAgICAgIGpzb24odGhpcy51cmwgKyBcIi9pbmZvLmpzb25cIikudGhlbihcbiAgICAgICAgICAgICAgICAvKiogQHBhcmFtIHsqfSBkYXRhICovXG4gICAgICAgICAgICAgICAgKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmZvID0gZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXNvbHV0aW9uID0gdGhpcy5pbmZvLnJlc29sdXRpb25HZW87XG4gICAgICAgICAgICAgICAgICAgIGlmIChjYWxsYmFjaykgY2FsbGJhY2soKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuICAgICAgICBlbHNlIGlmIChjYWxsYmFjaykgY2FsbGJhY2soKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBDb21wdXRlIGEgdGlsaW5nIGVudmVsb3BlIGZyb20gYSBnZW9ncmFwaGljYWwgZW52ZWxvcGUuXG4gICAgICogVGhpcyBpcyB0aGUgZnVuY3Rpb24gdG8gdXNlIHRvIGtub3cgd2hpY2ggdGlsZXMgdG8gZG93bmxvYWQgZm9yIGEgZ2VvZ3JhcGhpY2FsIHZpZXcuXG4gICAgICogXG4gICAgICogQHBhcmFtIHtFbnZlbG9wZX0gZSBcbiAgICAgKiBAcmV0dXJucyB7RW52ZWxvcGV9XG4gICAgICovXG4gICAgZ2V0VGlsaW5nRW52ZWxvcGUoZSkge1xuICAgICAgICBjb25zdCBwbyA9IHRoaXMuaW5mby5vcmlnaW5Qb2ludCxcbiAgICAgICAgICAgIHIgPSB0aGlzLmluZm8ucmVzb2x1dGlvbkdlbyxcbiAgICAgICAgICAgIHMgPSB0aGlzLmluZm8udGlsZVNpemVDZWxsO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB4TWluOiBNYXRoLmZsb29yKChlLnhNaW4gLSBwby54KSAvIChyICogcykpLFxuICAgICAgICAgICAgeE1heDogTWF0aC5mbG9vcigoZS54TWF4IC0gcG8ueCkgLyAociAqIHMpKSxcbiAgICAgICAgICAgIHlNaW46IE1hdGguZmxvb3IoKGUueU1pbiAtIHBvLnkpIC8gKHIgKiBzKSksXG4gICAgICAgICAgICB5TWF4OiBNYXRoLmZsb29yKChlLnlNYXggLSBwby55KSAvIChyICogcykpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXF1ZXN0IGRhdGEgd2l0aGluIGEgZ2VvZ3JhcGhpYyBlbnZlbG9wZS5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0VudmVsb3BlfSBleHRHZW8gXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbigpOnZvaWR9IHJlZHJhd0Z1blxuICAgICAqIEByZXR1cm5zIHt0aGlzfVxuICAgICAqL1xuICAgIGdldERhdGEoZXh0R2VvLCByZWRyYXdGdW4pIHtcblxuICAgICAgICAvL1RPRE8gZW1wdHkgY2FjaGUgd2hlbiBpdCBnZXRzIHRvbyBiaWcgP1xuXG4gICAgICAgIC8vY2hlY2sgaWYgaW5mbyBoYXMgYmVlbiBsb2FkZWRcbiAgICAgICAgaWYgKCF0aGlzLmluZm8pIHJldHVybjtcblxuICAgICAgICAvL3RpbGVzIHdpdGhpbiB0aGUgc2NvcGVcbiAgICAgICAgLyoqIEB0eXBlIHtFbnZlbG9wZX0gKi9cbiAgICAgICAgY29uc3QgdGIgPSB0aGlzLmdldFRpbGluZ0VudmVsb3BlKGV4dEdlbyk7XG5cbiAgICAgICAgLy9ncmlkIGJvdW5kc1xuICAgICAgICAvKiogQHR5cGUge0VudmVsb3BlfSAqL1xuICAgICAgICBjb25zdCBnYiA9IHRoaXMuaW5mby50aWxpbmdCb3VuZHM7XG5cbiAgICAgICAgZm9yIChsZXQgeFQgPSBNYXRoLm1heCh0Yi54TWluLCBnYi54TWluKTsgeFQgPD0gTWF0aC5taW4odGIueE1heCwgZ2IueE1heCk7IHhUKyspIHtcbiAgICAgICAgICAgIGZvciAobGV0IHlUID0gTWF0aC5tYXgodGIueU1pbiwgZ2IueU1pbik7IHlUIDw9IE1hdGgubWluKHRiLnlNYXgsIGdiLnlNYXgpOyB5VCsrKSB7XG5cbiAgICAgICAgICAgICAgICAvL3ByZXBhcmUgY2FjaGVcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuY2FjaGVbeFRdKSB0aGlzLmNhY2hlW3hUXSA9IHt9O1xuXG4gICAgICAgICAgICAgICAgLy9jaGVjayBpZiB0aWxlIGV4aXN0cyBpbiB0aGUgY2FjaGVcbiAgICAgICAgICAgICAgICAvKiogQHR5cGUge0dyaWRUaWxlfSAqL1xuICAgICAgICAgICAgICAgIGxldCB0aWxlID0gdGhpcy5jYWNoZVt4VF1beVRdO1xuICAgICAgICAgICAgICAgIGlmICh0aWxlKSBjb250aW51ZTtcblxuICAgICAgICAgICAgICAgIC8vbWFyayB0aWxlIGFzIGxvYWRpbmdcbiAgICAgICAgICAgICAgICB0aGlzLmNhY2hlW3hUXVt5VF0gPSBcImxvYWRpbmdcIlxuXG4gICAgICAgICAgICAgICAgLy9yZXF1ZXN0IHRpbGVcbiAgICAgICAgICAgICAgICBjc3YodGhpcy51cmwgKyB4VCArIFwiL1wiICsgeVQgKyBcIi5jc3ZcIilcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oXG4gICAgICAgICAgICAgICAgICAgICAgICAvKiogQHBhcmFtIHsqfSBkYXRhICovXG4gICAgICAgICAgICAgICAgICAgICAgICAoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vc3RvcmUgdGlsZSBpbiBjYWNoZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRpbGVfID0gbmV3IEdyaWRUaWxlKGRhdGEsIHhULCB5VCwgdGhpcy5pbmZvKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNhY2hlW3hUXVt5VF0gPSB0aWxlXztcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vZXhlY3V0ZSBwcmVwcm9jZXNzLCBpZiBhbnlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5wcmVwcm9jZXNzKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGMgb2YgdGlsZV8uY2VsbHMpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByZXByb2Nlc3MoYyk7XG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vaWYgbm8gcmVkcmF3IGlzIHNwZWNpZmllZCwgdGhlbiBsZWF2ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcmVkcmF3RnVuKSByZXR1cm47XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2NoZWNrIGlmIHJlZHJhdyBpcyByZWFsbHkgbmVlZGVkLCB0aGF0IGlzIGlmOlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gMS4gdGhlIGRhdGFzZXQgYmVsb25ncyB0byBhIGxheWVyIHdoaWNoIGlzIHZpc2libGUgYXQgdGhlIGN1cnJlbnQgem9vbSBsZXZlbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCByZWRyYXcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGxheWVyIG9mIHRoaXMuYXBwLmxheWVycykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobGF5ZXIuZGF0YXNldCAhPSB0aGlzKSBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxheWVyLm1heFpvb20gPCB0aGlzLmFwcC56b29tRmFjdG9yKCkpIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobGF5ZXIubWluWm9vbSA+IHRoaXMuYXBwLnpvb21GYWN0b3IoKSkgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vZm91bmQgb25lIGxheWVyLiBObyBuZWVkIHRvIHNlZWsgbW9yZS5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVkcmF3ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcmVkcmF3KSByZXR1cm47XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAyLiB0aGUgdGlsZSBpcyB3aXRoaW4gdGhlIHZpZXcsIHRoYXQgaXMgaXRzIGdlbyBlbnZlbG9wZSBpbnRlcnNlY3RzIHRoZSB2aWV3ZXIgZ2VvIGVudmVsb3BlLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGVudiA9IHRoaXMuYXBwLmNnLnVwZGF0ZUV4dGVudEdlbygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGVudlQgPSB0aWxlXy5leHRHZW87XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoZW52LnhNYXggPD0gZW52VC54TWluKSByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoZW52LnhNaW4gPj0gZW52VC54TWF4KSByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoZW52LnlNYXggPD0gZW52VC55TWluKSByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoZW52LnlNaW4gPj0gZW52VC55TWF4KSByZXR1cm47XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3JlZHJhd1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZHJhd0Z1bigpXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9tYXJrIGFzIGZhaWxlZFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jYWNoZVt4VF1beVRdID0gXCJmYWlsZWRcIlxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEdldCBhbGwgY2VsbHMgZnJvbSBjYWNoZSB3aGljaCBhcmUgd2l0aGluIGEgZ2VvZ3JhcGhpY2FsIGVudmVsb3BlLlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7RW52ZWxvcGV9IGV4dEdlbyBcbiAgICAgKiBAcmV0dXJucyB7QXJyYXkuPENlbGw+fVxuICAgICAqL1xuICAgIGdldENlbGxzKGV4dEdlbykge1xuXG4gICAgICAgIC8qKiBAdHlwZSB7QXJyYXkuPENlbGw+fSAqL1xuICAgICAgICBsZXQgY2VsbHMgPSBbXVxuXG4gICAgICAgIC8vY2hlY2sgaWYgaW5mbyBoYXMgYmVlbiBsb2FkZWRcbiAgICAgICAgaWYgKCF0aGlzLmluZm8pIHJldHVybiBjZWxscztcblxuICAgICAgICAvL3RpbGVzIHdpdGhpbiB0aGUgc2NvcGVcbiAgICAgICAgLyoqIEB0eXBlIHtFbnZlbG9wZX0gKi9cbiAgICAgICAgY29uc3QgdGIgPSB0aGlzLmdldFRpbGluZ0VudmVsb3BlKGV4dEdlbyk7XG5cbiAgICAgICAgLy9ncmlkIGJvdW5kc1xuICAgICAgICAvKiogQHR5cGUge0VudmVsb3BlfSAqL1xuICAgICAgICBjb25zdCBnYiA9IHRoaXMuaW5mby50aWxpbmdCb3VuZHM7XG5cbiAgICAgICAgZm9yIChsZXQgeFQgPSBNYXRoLm1heCh0Yi54TWluLCBnYi54TWluKTsgeFQgPD0gTWF0aC5taW4odGIueE1heCwgZ2IueE1heCk7IHhUKyspIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5jYWNoZVt4VF0pIGNvbnRpbnVlO1xuICAgICAgICAgICAgZm9yIChsZXQgeVQgPSBNYXRoLm1heCh0Yi55TWluLCBnYi55TWluKTsgeVQgPD0gTWF0aC5taW4odGIueU1heCwgZ2IueU1heCk7IHlUKyspIHtcblxuICAgICAgICAgICAgICAgIC8vZ2V0IHRpbGVcbiAgICAgICAgICAgICAgICAvKiogQHR5cGUge0dyaWRUaWxlfSAqL1xuICAgICAgICAgICAgICAgIGNvbnN0IHRpbGUgPSB0aGlzLmNhY2hlW3hUXVt5VF07XG4gICAgICAgICAgICAgICAgaWYgKCF0aWxlIHx8IHR5cGVvZiB0aWxlID09PSBcInN0cmluZ1wiKSBjb250aW51ZTtcblxuICAgICAgICAgICAgICAgIC8vZ2V0IGNlbGxzXG4gICAgICAgICAgICAgICAgY2VsbHMgPSBjZWxscy5jb25jYXQodGlsZS5jZWxscylcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBjZWxscztcbiAgICB9XG5cbn1cbiIsIi8vQHRzLWNoZWNrXG5cbmltcG9ydCB7IEFwcCBhcyBBcHBfIH0gZnJvbSBcIi4vQXBwXCJcbmltcG9ydCAqIGFzIGRzYyBmcm9tIFwiZDMtc2NhbGUtY2hyb21hdGljXCJcblxuZXhwb3J0IGNvbnN0IEFwcCA9IGZ1bmN0aW9uIChvcHRzKSB7XG4gICAgcmV0dXJuIG5ldyBBcHBfKG9wdHMpXG59XG5cblxuXG5cbi8vZXhwb3J0IGNvbG9yICh0aGUgZW50aXJlIGQzIHNjYWxlIGNocm9tYXRpYylcbmV4cG9ydCBjb25zdCBjb2xvciA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gZHNjXG59XG5cblxuXG5cbi8vZXhwb3J0IGRhdGFzZXQgdHlwZXNcblxuaW1wb3J0IHsgQ1NWR3JpZCBhcyBDU1ZHcmlkXyB9IGZyb20gXCIuL2RhdGFzZXQvQ1NWR3JpZFwiXG5leHBvcnQgY29uc3QgQ1NWR3JpZCA9IGZ1bmN0aW9uICh1cmwsIHJlc29sdXRpb24sIHByZXByb2Nlc3MgPSBudWxsKSB7XG4gICAgcmV0dXJuIG5ldyBDU1ZHcmlkXyh1cmwsIHJlc29sdXRpb24sIHByZXByb2Nlc3MpXG59XG5cbmltcG9ydCB7IFRpbGVkR3JpZCBhcyBUaWxlZEdyaWRfIH0gZnJvbSBcIi4vZGF0YXNldC9UaWxlZEdyaWRcIlxuZXhwb3J0IGNvbnN0IFRpbGVkR3JpZCA9IGZ1bmN0aW9uICh1cmwsIHByZXByb2Nlc3MgPSBudWxsKSB7XG4gICAgcmV0dXJuIG5ldyBUaWxlZEdyaWRfKHVybCwgcHJlcHJvY2Vzcylcbn1cblxuXG5cblxuLy9leHBvcnQgc3R5bGVzXG5cbmltcG9ydCB7IFNoYXBlQ29sb3JTaXplU3R5bGUgYXMgU2hhcGVDb2xvclNpemVTdHlsZV8gfSBmcm9tIFwiLi9zdHlsZS9TaGFwZUNvbG9yU2l6ZVN0eWxlXCJcbmV4cG9ydCBjb25zdCBTaGFwZUNvbG9yU2l6ZVN0eWxlID0gZnVuY3Rpb24gKGNvbG9yXywgc2l6ZSwgc2hhcGUpIHtcbiAgICByZXR1cm4gbmV3IFNoYXBlQ29sb3JTaXplU3R5bGVfKGNvbG9yXywgc2l6ZSwgc2hhcGUpXG59XG5cbmltcG9ydCB7IExpbmVTdHlsZSBhcyBMaW5lU3R5bGVfIH0gZnJvbSBcIi4vc3R5bGUvTGluZVN0eWxlXCJcbmV4cG9ydCBjb25zdCBMaW5lU3R5bGUgPSBmdW5jdGlvbiAoaGVpZ2h0KSB7XG4gICAgcmV0dXJuIG5ldyBMaW5lU3R5bGVfKGhlaWdodClcbn1cblxuaW1wb3J0IHsgQ29tcG9zaXRpb25TdHlsZSBhcyBDb21wb3NpdGlvblN0eWxlXyB9IGZyb20gXCIuL3N0eWxlL0NvbXBvc2l0aW9uU3R5bGVcIlxuZXhwb3J0IGNvbnN0IENvbXBvc2l0aW9uU3R5bGUgPSBmdW5jdGlvbiAoY29sb3JfLCB0eXBlLCBzaXplKSB7XG4gICAgcmV0dXJuIG5ldyBDb21wb3NpdGlvblN0eWxlXyhjb2xvcl8sIHR5cGUsIHNpemUpXG59XG5cbmltcG9ydCB7IFNlZ21lbnRTdHlsZSBhcyBTZWdtZW50U3R5bGVfIH0gZnJvbSBcIi4vc3R5bGUvU2VnbWVudFN0eWxlXCJcbmV4cG9ydCBjb25zdCBTZWdtZW50U3R5bGUgPSBmdW5jdGlvbiAob3JpZW50YXRpb24sIGNvbG9yLCBsZW5ndGgsIHdpZHRoKSB7XG4gICAgcmV0dXJuIG5ldyBTZWdtZW50U3R5bGVfKG9yaWVudGF0aW9uLCBjb2xvciwgbGVuZ3RoLCB3aWR0aClcbn1cblxuIiwiLy9AdHMtY2hlY2tcblxuaW1wb3J0IHsgU3R5bGUsIFNpemUgfSBmcm9tIFwiLi4vU3R5bGVcIlxuaW1wb3J0IHsgQ2VsbCB9IGZyb20gXCIuLi9EYXRhc2V0XCJcbmltcG9ydCB7IENhbnZhc0dlbyB9IGZyb20gXCIuLi9DYW52YXNHZW9cIjtcblxuLyoqXG4gKiBBIHN0eWxlIHNob3dpbmcgdGhlIGNvbXBvc2l0aW9uIG9mIGEgdG90YWwgaW4gZGlmZmVyZW50IGNhdGVnb3JpZXMsIHdpdGggZGlmZmVyZW50IGNvbG9yIGh1ZXMuXG4gKiBJdCBjb25zaXN0cyBvZiBhIHN5bWJvbCB3aXRoIGRpZmZlcmVudCBwYXJ0cywgd2hvc2Ugc2l6ZSByZWZsZWN0IHRoZSBwcm9wb3J0aW9uIG9mIHRoZSBjb3JyZXNwb25kaW5nIGNhdGVnb3J5LlxuICogMyB0eXBlcyBvZiBzeW1ib2xzIGFyZSBwb3NzaWJsZTpcbiAqIC0gRmxhZyAoc3F1YXJlIHN5bWJvbCwgd2l0aCBkZWNvbXBvc2l0aW9uIGludG8gdmVydGljYWwgc3RyaXBlcylcbiAqIC0gUGllIGNoYXJ0IChjaXJjdWxhciBzeW1ib2wsIHdpdGggZGVjb21wb3NpdGlvbiBpbnRvIGFuZ3VsYXIgc2VjdG9ycylcbiAqIC0gUmluZyAoY2lyY3VsYXIgc3ltYm9sLCB3aXRoIGRlY29tcG9zaXRpb24gaW50byBjb25jZW50cmljIHJpbmdzKVxuICogVGhlIHN5bWJvbCBjYW4gYmUgc2NhbGVkIGRlcGVuZGluZyBvbiB0aGUgY2VsbCBpbXBvcnRhbmNlLlxuICogXG4gKiBAYXV0aG9yIEp1bGllbiBHYWZmdXJpXG4gKi9cbmV4cG9ydCBjbGFzcyBDb21wb3NpdGlvblN0eWxlIGV4dGVuZHMgU3R5bGUge1xuXG4gICAgLyoqXG4gICAgICAqIEBwYXJhbSB7T2JqZWN0fSBjb2xvciBUaGUgZGljdGlvbmFyeSB3aGljaCBnaXZlIHRoZSBjb2xvciBvZiBlYWNoIGNhdGVnb3J5LlxuICAgICAgKiBAcGFyYW0ge2Z1bmN0aW9uKENlbGwpOnN0cmluZ30gdHlwZSBBIGZ1bmN0aW9uIHJldHVybmluZyB0aGUgdHlwZSBvZiBkZWNvbXBvc2l0aW9uIHN5bWJvbCBvZiBhIGNlbGw6IEFtb25nICdmbGFnJywgJ3BpZWNoYXJ0JyBhbmQgJ3JpbmcnXG4gICAgICAqIEBwYXJhbSB7U2l6ZX0gc2l6ZSBBIGZ1bmN0aW9uIHJldHVybmluZyB0aGUgc2l6ZSBvZiBhIGNlbGwgKGluIGdlb2dyYXBoaWNhbCB1bml0KS5cbiAgICAgICovXG4gICAgY29uc3RydWN0b3IoY29sb3IsIHR5cGUgPSBudWxsLCBzaXplID0gbnVsbCkge1xuICAgICAgICBzdXBlcigpXG5cbiAgICAgICAgLy9kaWN0aW9ubmFyeSBjb2x1bW4gLT4gY29sb3JcbiAgICAgICAgLyoqIEB0eXBlIHtvYmplY3R9ICovXG4gICAgICAgIHRoaXMuY29sb3JfID0gY29sb3I7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtmdW5jdGlvbihDZWxsKTpzdHJpbmd9ICovXG4gICAgICAgIHRoaXMudHlwZV8gPSB0eXBlO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7U2l6ZX0gKi9cbiAgICAgICAgdGhpcy5zaXplXyA9IHNpemU7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBEcmF3IGNlbGxzIGFzIHNxdWFyZXMgZGVwZW5kaW5nIG9uIHRoZWlyIHZhbHVlLlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7QXJyYXkuPENlbGw+fSBjZWxscyBcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gcmVzb2x1dGlvbiBcbiAgICAgKiBAcGFyYW0ge0NhbnZhc0dlb30gY2cgXG4gICAgICovXG4gICAgZHJhdyhjZWxscywgcmVzb2x1dGlvbiwgY2cpIHtcblxuICAgICAgICAvL2lmIHNpemUgaXMgdXNlZCwgc29ydCBjZWxscyBieSBzaXplIHNvIHRoYXQgdGhlIGJpZ2dlc3QgYXJlIGRyYXduIGZpcnN0XG4gICAgICAgIGlmICh0aGlzLnNpemVfKVxuICAgICAgICAgICAgY2VsbHMuc29ydCgoYzEsIGMyKSA9PiAodGhpcy5zaXplXy52YWwoYzIpIC0gdGhpcy5zaXplXy52YWwoYzEpKSk7XG5cbiAgICAgICAgZm9yIChsZXQgY2VsbCBvZiBjZWxscykge1xuXG4gICAgICAgICAgICAvL2NvbXB1dGUgdG90YWxcbiAgICAgICAgICAgIGxldCB0b3RhbCA9IDA7XG4gICAgICAgICAgICBmb3IgKGxldCBjb2x1bW4gb2YgT2JqZWN0LmtleXModGhpcy5jb2xvcl8pKVxuICAgICAgICAgICAgICAgIHRvdGFsICs9ICtjZWxsW2NvbHVtbl1cblxuICAgICAgICAgICAgLy9zaXplXG4gICAgICAgICAgICAvKiogQHR5cGUge1NpemV9ICovXG4gICAgICAgICAgICBsZXQgc18gPSB0aGlzLnNpemVfIHx8IHsgdmFsOiBjPT5yZXNvbHV0aW9uLCB1bml0OiBcImdlb1wiIH07XG4gICAgICAgICAgICAvL3NpemUgLSBpbiBwaXhlbCBhbmQgZ2VvXG4gICAgICAgICAgICAvKiogQHR5cGUge251bWJlcn0gKi9cbiAgICAgICAgICAgIGNvbnN0IHNQID0gc18udW5pdCA9PT0gXCJwaXhcIiA/IHNfLnZhbChjZWxsKSA6IHNfLnZhbChjZWxsKSAvIGNnLnpmXG4gICAgICAgICAgICAvKiogQHR5cGUge251bWJlcn0gKi9cbiAgICAgICAgICAgIGNvbnN0IHNHID0gY2cuemYgKiBzUDtcblxuICAgICAgICAgICAgLy9nZXQgc3ltYm9sIHR5cGVcbiAgICAgICAgICAgIGNvbnN0IHR5cGVfID0gdGhpcy50eXBlXyA/IHRoaXMudHlwZV8oY2VsbCkgOiBcImZsYWdcIlxuXG4gICAgICAgICAgICAvL2RyYXcgZGVjb21wb3NpdGlvbiBzeW1ib2xcbiAgICAgICAgICAgIGxldCBjdW11bCA9IDA7XG4gICAgICAgICAgICBjb25zdCBkID0gcmVzb2x1dGlvbiAqICgxIC0gc0cgLyByZXNvbHV0aW9uKSAqIDAuNVxuICAgICAgICAgICAgZm9yIChsZXQgW2NvbHVtbiwgY29sb3JdIG9mIE9iamVjdC5lbnRyaWVzKHRoaXMuY29sb3JfKSkge1xuXG4gICAgICAgICAgICAgICAgLy9zZXQgY29sb3JcbiAgICAgICAgICAgICAgICBjZy5jdHguZmlsbFN0eWxlID0gY29sb3I7XG5cbiAgICAgICAgICAgICAgICAvL2NvbXB1dGUgc2hhcmVcbiAgICAgICAgICAgICAgICBjb25zdCBzaGFyZSA9IGNlbGxbY29sdW1uXSAvIHRvdGFsO1xuXG4gICAgICAgICAgICAgICAgLy9kcmF3IHN5bWJvbCBwYXJ0XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVfID09PSBcImZsYWdcIikge1xuICAgICAgICAgICAgICAgICAgICAvL2RyYXcgZmxhZyB2ZXJ0aWNhbCBzdHJpcGVcbiAgICAgICAgICAgICAgICAgICAgY2cuY3R4LmZpbGxSZWN0KFxuICAgICAgICAgICAgICAgICAgICAgICAgY3VtdWwgKiBzUCArIGNnLmdlb1RvUGl4WChjZWxsLnggKyBkICsgdGhpcy5vZmZzZXRfLmR4KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNnLmdlb1RvUGl4WShjZWxsLnkgKyByZXNvbHV0aW9uIC0gZCArIHRoaXMub2Zmc2V0Xy5keSksXG4gICAgICAgICAgICAgICAgICAgICAgICBzaGFyZSAqIHNQLCBzUCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlXyA9PT0gXCJwaWVjaGFydFwiKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vZHJhdyBwaWUgY2hhcnQgYW5ndWxhciBzZWN0b3JcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgeGMgPSBjZy5nZW9Ub1BpeFgoY2VsbC54ICsgcmVzb2x1dGlvbiAqIDAuNSArIHRoaXMub2Zmc2V0Xy5keCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHljID0gY2cuZ2VvVG9QaXhZKGNlbGwueSArIHJlc29sdXRpb24gKiAwLjUgKyB0aGlzLm9mZnNldF8uZHkpO1xuICAgICAgICAgICAgICAgICAgICBjZy5jdHguYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICAgICAgICAgIGNnLmN0eC5tb3ZlVG8oeGMsIHljKTtcbiAgICAgICAgICAgICAgICAgICAgY2cuY3R4LmFyYyh4YywgeWMsIHNQICogMC41LCBjdW11bCAqIDIgKiBNYXRoLlBJLCAoY3VtdWwgKyBzaGFyZSkgKiAyICogTWF0aC5QSSk7XG4gICAgICAgICAgICAgICAgICAgIGNnLmN0eC5saW5lVG8oeGMsIHljKTtcbiAgICAgICAgICAgICAgICAgICAgY2cuY3R4LmZpbGwoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVfID09PSBcInJpbmdcIikge1xuICAgICAgICAgICAgICAgICAgICAvL2RyYXcgcmluZ1xuICAgICAgICAgICAgICAgICAgICAvL1RPRE8gbmVlZCB0byBjb21wdXRlIHJhZGl1cyBwcm9wZXJseSAhIFZhcmlhdGlvbiBhcyByb290c3F1YXJlIG9mIHNoYXJlICFcbiAgICAgICAgICAgICAgICAgICAgY2cuY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgICAgICAgICBjZy5jdHguYXJjKFxuICAgICAgICAgICAgICAgICAgICAgICAgY2cuZ2VvVG9QaXhYKGNlbGwueCArIHJlc29sdXRpb24gKiAwLjUgKyB0aGlzLm9mZnNldF8uZHgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2cuZ2VvVG9QaXhZKGNlbGwueSArIHJlc29sdXRpb24gKiAwLjUgKyB0aGlzLm9mZnNldF8uZHkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgTWF0aC5zcXJ0KDEgLSBjdW11bCkgKiBzUCAqIDAuNSxcbiAgICAgICAgICAgICAgICAgICAgICAgIDAsIDIgKiBNYXRoLlBJKTtcbiAgICAgICAgICAgICAgICAgICAgY2cuY3R4LmZpbGwoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuZXhwZWN0ZWQgc3ltYm9sIHR5cGU6JyArIHR5cGVfKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjdW11bCArPSBzaGFyZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy9kcmF3IHN0cm9rZVxuICAgICAgICAgICAgdGhpcy5kcmF3U3Ryb2tlKGNlbGwsIHJlc29sdXRpb24sIGNnLCAoYykgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiAodHlwZV8gPT09IFwiZmxhZ1wiKSA/IFwic3F1YXJlXCIgOiBcImNpcmNsZVwiXG4gICAgICAgICAgICB9LCB0aGlzLnNpemVfKVxuICAgICAgICB9XG5cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBjb2xvciBcbiAgICAgKiBAcmV0dXJucyB7dGhpc3xvYmplY3R9XG4gICAgICovXG4gICAgY29sb3IoY29sb3IpIHtcbiAgICAgICAgaWYgKGNvbG9yKSB7XG4gICAgICAgICAgICB0aGlzLmNvbG9yXyA9IGNvbG9yO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXNcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5jb2xvcl9cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9uKENlbGwpOnN0cmluZ30gdHlwZSBcbiAgICAgKiBAcmV0dXJucyB7dGhpc3xmdW5jdGlvbihDZWxsKTpzdHJpbmd9XG4gICAgICovXG4gICAgdHlwZSh0eXBlKSB7XG4gICAgICAgIGlmICh0eXBlKSB7XG4gICAgICAgICAgICB0aGlzLnR5cGVfID0gdHlwZTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMudHlwZV9cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge1NpemV9IHNpemUgXG4gICAgICogQHJldHVybnMge3RoaXN8U2l6ZX1cbiAgICAgKi9cbiAgICBzaXplKHNpemUpIHtcbiAgICAgICAgaWYgKHNpemUpIHtcbiAgICAgICAgICAgIHRoaXMuc2l6ZV8gPSBzaXplO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXNcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5zaXplX1xuICAgIH1cblxufVxuIiwiLy9AdHMtY2hlY2tcblxuaW1wb3J0IHsgU3R5bGUsIFNpemUgfSBmcm9tIFwiLi4vU3R5bGVcIlxuaW1wb3J0IHsgQ2VsbCB9IGZyb20gXCIuLi9EYXRhc2V0XCJcbmltcG9ydCB7IENhbnZhc0dlbyB9IGZyb20gXCIuLi9DYW52YXNHZW9cIjtcblxuLyoqXG4gKiBcbiAqIEBhdXRob3IgSnVsaWVuIEdhZmZ1cmlcbiAqL1xuZXhwb3J0IGNsYXNzIExpbmVTdHlsZSBleHRlbmRzIFN0eWxlIHtcblxuICAgIC8qKlxuICAgICAgKiBAcGFyYW0ge1NpemV9IGhlaWdodCBBIGZ1bmN0aW9uIHJldHVybmluZyB0aGUgaGVpZ2h0IG9mIGEgY2VsbC5cbiAgICAgICovXG4gICAgY29uc3RydWN0b3IoaGVpZ2h0KSB7XG4gICAgICAgIHN1cGVyKClcblxuICAgICAgICAvKiogQHR5cGUge1NpemV9ICovXG4gICAgICAgIHRoaXMuaGVpZ2h0XyA9IGhlaWdodDtcblxuICAgICAgICAvKiogQHR5cGUge3N0cmluZ30gKi9cbiAgICAgICAgdGhpcy5saW5lQ29sb3JfID0gXCJncmF5XCJcbiAgICAgICAgLyoqIEB0eXBlIHtudW1iZXJ9ICovXG4gICAgICAgIHRoaXMubGluZVdpZHRoXyA9IDE7XG4gICAgICAgIC8qKiBAdHlwZSB7c3RyaW5nfSAqL1xuICAgICAgICB0aGlzLmZpbGxDb2xvcl8gPSBcInJnYmEoMTkyLCAxNDAsIDg5LCAwLjQpXCJcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIERyYXcgY2VsbHMgYXMgc3F1YXJlcyBkZXBlbmRpbmcgb24gdGhlaXIgdmFsdWUuXG4gICAgICogXG4gICAgICogQHBhcmFtIHtBcnJheS48Q2VsbD59IGNlbGxzIFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSByIFxuICAgICAqIEBwYXJhbSB7Q2FudmFzR2VvfSBjZyBcbiAgICAgKi9cbiAgICBkcmF3KGNlbGxzLCByLCBjZykge1xuXG4gICAgICAgIC8vaW5kZXggY2VsbHMgYnkgeSBhbmQgeFxuICAgICAgICAvKiogIEB0eXBlIHtvYmplY3R9ICovXG4gICAgICAgIGNvbnN0IGluZCA9IHt9O1xuICAgICAgICBmb3IgKGNvbnN0IGNlbGwgb2YgY2VsbHMpIHtcbiAgICAgICAgICAgIGxldCByb3cgPSBpbmRbY2VsbC55XTtcbiAgICAgICAgICAgIGlmICghcm93KSB7IHJvdyA9IHt9OyBpbmRbY2VsbC55XSA9IHJvdyB9XG4gICAgICAgICAgICByb3dbY2VsbC54XSA9IHRoaXMuaGVpZ2h0Xy52YWwoY2VsbCk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8vY29tcHV0ZSBleHRlbnRcbiAgICAgICAgY29uc3QgZSA9IGNnLmV4dEdlbztcbiAgICAgICAgY29uc3QgeE1pbiA9IE1hdGguZmxvb3IoZS54TWluIC8gcikgKiByO1xuICAgICAgICBjb25zdCB4TWF4ID0gTWF0aC5mbG9vcihlLnhNYXggLyByKSAqIHI7XG4gICAgICAgIGNvbnN0IHlNaW4gPSBNYXRoLmZsb29yKGUueU1pbiAvIHIpICogcjtcbiAgICAgICAgY29uc3QgeU1heCA9IE1hdGguZmxvb3IoZS55TWF4IC8gcikgKiByO1xuXG4gICAgICAgIC8vc2V0IGNvbG9yIGFuZCB3aWR0aFxuICAgICAgICBjZy5jdHguc3Ryb2tlU3R5bGUgPSB0aGlzLmxpbmVDb2xvcl87XG4gICAgICAgIGNnLmN0eC5saW5lV2lkdGggPSB0aGlzLmxpbmVXaWR0aF87XG4gICAgICAgIGNnLmN0eC5maWxsU3R5bGUgPSB0aGlzLmZpbGxDb2xvcl87XG5cbiAgICAgICAgLy9kcmF3IGxpbmVzLCByb3cgYnkgcm93LCBzdGF0aW5nIGZyb20gdGhlIHRvcFxuICAgICAgICBmb3IgKGxldCB5ID0geU1heDsgeSA+PSB5TWluOyB5IC09IHIpIHtcblxuICAgICAgICAgICAgLy9nZXQgcm93XG4gICAgICAgICAgICBjb25zdCByb3cgPSBpbmRbeV1cblxuICAgICAgICAgICAgLy9ubyByb3dcbiAgICAgICAgICAgIGlmICghcm93KSBjb250aW51ZTtcblxuICAgICAgICAgICAgLy9jb21wdXRlIHJvdyBiYXNlbGluZVxuICAgICAgICAgICAgY29uc3QgeVAgPSBjZy5nZW9Ub1BpeFkoeSk7XG5cbiAgICAgICAgICAgIC8vcGxhY2UgZmlyc3QgcG9pbnRcbiAgICAgICAgICAgIGNnLmN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgICAgIGNnLmN0eC5tb3ZlVG8oY2cuZ2VvVG9QaXhYKHhNaW4gLSByIC8gMiksIHlQKTtcblxuICAgICAgICAgICAgLy9zdG9yZSB0aGUgcHJldmlvdXMgaGVpZ2h0XG4gICAgICAgICAgICAvKiogQHR5cGUge251bWJlcn0gKi9cbiAgICAgICAgICAgIGxldCBoR187XG5cbiAgICAgICAgICAgIC8vZ28gdGhyb3VnaCB0aGUgbGluZSBjZWxsc1xuICAgICAgICAgICAgZm9yIChsZXQgeCA9IHhNaW47IHggPD0geE1heDsgeCArPSByKSB7XG5cbiAgICAgICAgICAgICAgICAvL2dldCBjb2x1bW4gdmFsdWVcbiAgICAgICAgICAgICAgICAvKiogQHR5cGUge251bWJlcn0gKi9cbiAgICAgICAgICAgICAgICBsZXQgaEcgPSByb3dbeF07XG4gICAgICAgICAgICAgICAgaWYgKCFoRykgaEcgPSAwO1xuXG4gICAgICAgICAgICAgICAgaWYgKGhHIHx8IGhHXykge1xuICAgICAgICAgICAgICAgICAgICAvL2RyYXcgbGluZSBvbmx5IHdoZW4gYXQgbGVhc3Qgb25lIG9mIGJvdGggdmFsdWVzIGlzIG5vbi1udWxsXG4gICAgICAgICAgICAgICAgICAgIC8vVE9ETyB0ZXN0IGJlemllckN1cnZlVG9cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZHlQID0gdGhpcy5oZWlnaHRfLnVuaXQ9PT1cInBpeFwiID8gaEcgOiBoRyAvIGNnLnpmXG4gICAgICAgICAgICAgICAgICAgIGNnLmN0eC5saW5lVG8oY2cuZ2VvVG9QaXhYKHggKyByIC8gMiksIHlQIC0gZHlQKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvL2Vsc2UgbW92ZSB0aGUgcG9pbnRcbiAgICAgICAgICAgICAgICAgICAgY2cuY3R4Lm1vdmVUbyhjZy5nZW9Ub1BpeFgoeCArIHIgLyAyKSwgeVApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvL3N0b3JlIHRoZSBwcmV2aW91cyB2YWx1ZVxuICAgICAgICAgICAgICAgIGhHXyA9IGhHO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvL2xhc3QgcG9pbnRcbiAgICAgICAgICAgIGlmIChoR18pXG4gICAgICAgICAgICAgICAgY2cuY3R4LmxpbmVUbyhjZy5nZW9Ub1BpeFgoeE1heCArIHIgLyAyKSwgeVApO1xuXG4gICAgICAgICAgICAvL2RyYXcgZmlsbFxuICAgICAgICAgICAgaWYgKHRoaXMuZmlsbENvbG9yXylcbiAgICAgICAgICAgICAgICBjZy5jdHguZmlsbCgpXG4gICAgICAgICAgICAvL2RyYXcgbGluZVxuICAgICAgICAgICAgaWYgKHRoaXMubGluZUNvbG9yXyAmJiB0aGlzLmxpbmVXaWR0aF8gPiAwKVxuICAgICAgICAgICAgICAgIGNnLmN0eC5zdHJva2UoKTtcblxuICAgICAgICB9XG4gICAgfVxuXG5cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7U2l6ZX0gaGVpZ2h0IFxuICAgICAqIEByZXR1cm5zIHt0aGlzfFNpemV9XG4gICAgICovXG4gICAgaGVpZ2h0KGhlaWdodCkge1xuICAgICAgICBpZiAoaGVpZ2h0KSB7XG4gICAgICAgICAgICB0aGlzLmhlaWdodF8gPSBoZWlnaHQ7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5oZWlnaHRfO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBsaW5lQ29sb3IgXG4gICAgICogQHJldHVybnMge3RoaXN8c3RyaW5nfVxuICAgICAqL1xuICAgIGxpbmVDb2xvcihsaW5lQ29sb3IpIHtcbiAgICAgICAgaWYgKGxpbmVDb2xvcikge1xuICAgICAgICAgICAgdGhpcy5saW5lQ29sb3JfID0gbGluZUNvbG9yO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMubGluZUNvbG9yXztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbGluZVdpZHRoIFxuICAgICAqIEByZXR1cm5zIHt0aGlzfG51bWJlcn1cbiAgICAgKi9cbiAgICBsaW5lV2lkdGgobGluZVdpZHRoKSB7XG4gICAgICAgIGlmIChsaW5lV2lkdGgpIHtcbiAgICAgICAgICAgIHRoaXMubGluZVdpZHRoXyA9IGxpbmVXaWR0aDtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmxpbmVXaWR0aF87XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGZpbGxDb2xvciBcbiAgICAgKiBAcmV0dXJucyB7dGhpc3xzdHJpbmd9XG4gICAgICovXG4gICAgZmlsbENvbG9yKGZpbGxDb2xvcikge1xuICAgICAgICBpZiAoZmlsbENvbG9yKSB7XG4gICAgICAgICAgICB0aGlzLmZpbGxDb2xvcl8gPSBmaWxsQ29sb3I7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5maWxsQ29sb3JfO1xuICAgIH1cblxufVxuIiwiLy9AdHMtY2hlY2tcblxuaW1wb3J0IHsgU3R5bGUsIFNpemUgfSBmcm9tIFwiLi4vU3R5bGVcIlxuaW1wb3J0IHsgQ2VsbCB9IGZyb20gXCIuLi9EYXRhc2V0XCJcbmltcG9ydCB7IENhbnZhc0dlbyB9IGZyb20gXCIuLi9DYW52YXNHZW9cIjtcblxuLyoqXG4gKiBBIHN0eWxlIHdoZXJlIGVhY2ggY2VsbCBpcyByZXByZXNlbnRlZCBieSBhIHNlZ21lbnQgd2hvc2UgbGVuZ3RoLCB3aWR0aCwgY29sb3IgYW5kIG9yaWVudGF0aW9uIGNhbiB2YXJ5IGFjY29yZGluZyB0byBzdGF0aXN0aWNhbCB2YWx1ZXMuXG4gKiBcbiAqIEBhdXRob3IgSnVsaWVuIEdhZmZ1cmlcbiAqL1xuZXhwb3J0IGNsYXNzIFNlZ21lbnRTdHlsZSBleHRlbmRzIFN0eWxlIHtcblxuICAgIC8qKlxuICAgICAgKiBAcGFyYW0ge2Z1bmN0aW9uKENlbGwpOm51bWJlcn0gb3JpZW50YXRpb24gQSBmdW5jdGlvbiByZXR1cm5pbmcgdGhlIG9yaWVudGF0aW9uIChpbiBkZWdyZWVzKSBvZiB0aGUgc2VnbWVudCByZXByZXNlbnRpbmcgYSBjZWxsLlxuICAgICAgKiBAcGFyYW0ge2Z1bmN0aW9uKENlbGwpOnN0cmluZ30gY29sb3IgQSBmdW5jdGlvbiByZXR1cm5pbmcgdGhlIGNvbG9yIG9mIHRoZSBzZWdtZW50IHJlcHJlc2VudGluZyBhIGNlbGwuXG4gICAgICAqIEBwYXJhbSB7U2l6ZX0gbGVuZ3RoIEEgZnVuY3Rpb24gcmV0dXJuaW5nIHRoZSBsZW5ndGggb2YgdGhlIHNlZ21lbnQgcmVwcmVzZW50aW5nIGEgY2VsbC5cbiAgICAgICogQHBhcmFtIHtTaXplfSB3aWR0aCBBIGZ1bmN0aW9uIHJldHVybmluZyB0aGUgd2lkdGggb2YgdGhlIHNlZ21lbnQgcmVwcmVzZW50aW5nIGEgY2VsbC5cbiAgICAgICovXG4gICAgY29uc3RydWN0b3Iob3JpZW50YXRpb24sIGNvbG9yLCBsZW5ndGgsIHdpZHRoKSB7XG4gICAgICAgIHN1cGVyKClcblxuICAgICAgICAvKiogQHR5cGUge2Z1bmN0aW9uKENlbGwpOm51bWJlcn0gKi9cbiAgICAgICAgdGhpcy5vcmllbnRhdGlvbl8gPSBvcmllbnRhdGlvbjtcbiAgICAgICAgLyoqIEB0eXBlIHtmdW5jdGlvbihDZWxsKTpzdHJpbmd9ICovXG4gICAgICAgIHRoaXMuY29sb3JfID0gY29sb3I7XG4gICAgICAgIC8qKiBAdHlwZSB7U2l6ZX0gKi9cbiAgICAgICAgdGhpcy5sZW5ndGhfID0gbGVuZ3RoO1xuICAgICAgICAvKiogQHR5cGUge1NpemV9ICovXG4gICAgICAgIHRoaXMud2lkdGhfID0gd2lkdGg7XG5cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIERyYXcgY2VsbHMgYXMgc2VnbWVudHMuXG4gICAgICogXG4gICAgICogQHBhcmFtIHtBcnJheS48Q2VsbD59IGNlbGxzIFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSByZXNvbHV0aW9uIFxuICAgICAqIEBwYXJhbSB7Q2FudmFzR2VvfSBjZyBcbiAgICAgKi9cbiAgICBkcmF3KGNlbGxzLCByZXNvbHV0aW9uLCBjZykge1xuXG4gICAgICAgIC8vY29udmVyc2lvbiBmYWN0b3IgZGVncmVlIC0+IHJhZGlhblxuICAgICAgICBjb25zdCBmID0gTWF0aC5QSSAvIDE4MDtcblxuICAgICAgICBmb3IgKGxldCBjIG9mIGNlbGxzKSB7XG5cbiAgICAgICAgICAgIC8vc2V0IHdpZHRoIGFuZCBjb2xvclxuICAgICAgICAgICAgY2cuY3R4LmxpbmVXaWR0aCA9IHRoaXMud2lkdGhfLnVuaXQgPT09IFwicGl4XCIgPyB0aGlzLndpZHRoXy52YWwoYykgOiB0aGlzLndpZHRoXy52YWwoYykgLyBjZy56ZjtcbiAgICAgICAgICAgIGNnLmN0eC5zdHJva2VTdHlsZSA9IHRoaXMuY29sb3JfKGMpO1xuXG4gICAgICAgICAgICAvL2dldCBzZWdtZW50IG9yaWVudGF0aW9uIChpbiByYWRpYW4pIGFuZCBsZW5ndGggKGluIHBpeGVsKVxuICAgICAgICAgICAgLyoqIEB0eXBlIHtudW1iZXJ9ICovXG4gICAgICAgICAgICBjb25zdCBvciA9IHRoaXMub3JpZW50YXRpb25fKGMpICogZlxuICAgICAgICAgICAgLyoqIEB0eXBlIHtudW1iZXJ9ICovXG4gICAgICAgICAgICBjb25zdCBsZW4gPSB0aGlzLmxlbmd0aF8udW5pdCA9PT0gXCJwaXhcIj8gdGhpcy5sZW5ndGhfLnZhbChjKSA6IHRoaXMubGVuZ3RoXy52YWwoYykgLyBjZy56ZlxuXG4gICAgICAgICAgICAvL2dldCBzZWdtZW50IGNlbnRlclxuICAgICAgICAgICAgY29uc3QgY3ggPSBjZy5nZW9Ub1BpeFgoYy54ICsgcmVzb2x1dGlvbiAvIDIgKyB0aGlzLm9mZnNldF8uZHgpLFxuICAgICAgICAgICAgICAgIGN5ID0gY2cuZ2VvVG9QaXhZKGMueSArIHJlc29sdXRpb24gLyAyICsgdGhpcy5vZmZzZXRfLmR5KTtcblxuICAgICAgICAgICAgLy9nZXQgZGlyZWN0aW9uXG4gICAgICAgICAgICBjb25zdCBkeCA9IDAuNSAqIE1hdGguY29zKG9yKSAqIGxlbixcbiAgICAgICAgICAgICAgICBkeSA9IDAuNSAqIE1hdGguc2luKG9yKSAqIGxlbjtcblxuICAgICAgICAgICAgLy9kcmF3IHNlZ21lbnRcbiAgICAgICAgICAgIGNnLmN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgICAgIGNnLmN0eC5tb3ZlVG8oY3ggLSBkeCwgY3kgLSBkeSk7XG4gICAgICAgICAgICBjZy5jdHgubGluZVRvKGN4ICsgZHgsIGN5ICsgZHkpO1xuICAgICAgICAgICAgY2cuY3R4LnN0cm9rZSgpO1xuICAgICAgICB9XG5cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb24oQ2VsbCk6bnVtYmVyfSBvcmllbnRhdGlvbiBcbiAgICAgKiBAcmV0dXJucyB7dGhpc3xmdW5jdGlvbihDZWxsKTpudW1iZXJ9XG4gICAgICovXG4gICAgb3JpZW50YXRpb24ob3JpZW50YXRpb24pIHtcbiAgICAgICAgaWYgKG9yaWVudGF0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLm9yaWVudGF0aW9uXyA9IG9yaWVudGF0aW9uO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXNcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5vcmllbnRhdGlvbl9cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9uKENlbGwpOnN0cmluZ30gY29sb3IgXG4gICAgICogQHJldHVybnMge3RoaXN8ZnVuY3Rpb24oQ2VsbCk6c3RyaW5nfVxuICAgICAqL1xuICAgIGNvbG9yKGNvbG9yKSB7XG4gICAgICAgIGlmIChjb2xvcikge1xuICAgICAgICAgICAgdGhpcy5jb2xvcl8gPSBjb2xvcjtcbiAgICAgICAgICAgIHJldHVybiB0aGlzXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuY29sb3JfXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtTaXplfSBsZW5ndGggXG4gICAgICogQHJldHVybnMge3RoaXN8U2l6ZX1cbiAgICAgKi9cbiAgICBsZW5ndGgobGVuZ3RoKSB7XG4gICAgICAgIGlmIChsZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMubGVuZ3RoXyA9IGxlbmd0aDtcbiAgICAgICAgICAgIHJldHVybiB0aGlzXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMubGVuZ3RoX1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7U2l6ZX0gd2lkdGggXG4gICAgICogQHJldHVybnMge3RoaXN8U2l6ZX1cbiAgICAgKi9cbiAgICB3aWR0aCh3aWR0aCkge1xuICAgICAgICBpZiAod2lkdGgpIHtcbiAgICAgICAgICAgIHRoaXMud2lkdGhfID0gd2lkdGg7XG4gICAgICAgICAgICByZXR1cm4gdGhpc1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLndpZHRoX1xuICAgIH1cblxufVxuIiwiLy9AdHMtY2hlY2tcblxuaW1wb3J0IHsgU3R5bGUsIFNpemUgfSBmcm9tIFwiLi4vU3R5bGVcIlxuaW1wb3J0IHsgQ2VsbCB9IGZyb20gXCIuLi9EYXRhc2V0XCJcbmltcG9ydCB7IENhbnZhc0dlbyB9IGZyb20gXCIuLi9DYW52YXNHZW9cIjtcblxuLyoqIEB0eXBlZGVmIHtcInNxdWFyZVwifFwiY2lyY2xlXCJ9IFNoYXBlICovXG5cbi8qKlxuICogQSB2ZXJ5IGdlbmVyaWMgc3R5bGUgdGhhdCBzaG93cyBncmlkIGNlbGxzIHdpdGggc3BlY2lmaWMgY29sb3IsIHNpemUgYW5kIHNoYXBlLlxuICogSXQgY2FuIGJlIHVzZWQgdG8gc2hvdyB2YXJpYWJsZXMgYXMgY2VsbCBjb2xvcnMsIGNlbGwgc2l6ZSwgY2VsbCBzaGFwZSwgb3IgYW55IGNvbWJpbmF0aW9uIG9mIHRoZSB0aHJlZSB2aXN1YWwgdmFyaWFibGVzLlxuICogXG4gKiBAYXV0aG9yIEp1bGllbiBHYWZmdXJpXG4gKi9cbmV4cG9ydCBjbGFzcyBTaGFwZUNvbG9yU2l6ZVN0eWxlIGV4dGVuZHMgU3R5bGUge1xuXG4gICAgLyoqXG4gICAgICAqIEBwYXJhbSB7ZnVuY3Rpb24oQ2VsbCk6c3RyaW5nfSBjb2xvciBBIGZ1bmN0aW9uIHJldHVybmluZyB0aGUgY29sb3Igb2YgdGhlIGNlbGwuXG4gICAgICAqIEBwYXJhbSB7U2l6ZX0gc2l6ZSBBIGZ1bmN0aW9uIHJldHVybmluZyB0aGUgc2l6ZSBvZiBhIGNlbGwgKGluIGdlb2dyYXBoaWNhbCB1bml0KS5cbiAgICAgICogQHBhcmFtIHtmdW5jdGlvbihDZWxsKTpTaGFwZX0gc2hhcGUgQSBmdW5jdGlvbiByZXR1cm5pbmcgdGhlIHNoYXBlIG9mIGEgY2VsbC5cbiAgICAgICovXG4gICAgY29uc3RydWN0b3IoY29sb3IgPSAoKSA9PiBcIiNFQTZCQUNcIiwgc2l6ZSA9IG51bGwsIHNoYXBlID0gKCkgPT4gXCJzcXVhcmVcIikge1xuICAgICAgICBzdXBlcigpXG5cbiAgICAgICAgLyoqIEB0eXBlIHtmdW5jdGlvbihDZWxsKTpzdHJpbmd9ICovXG4gICAgICAgIHRoaXMuY29sb3JfID0gY29sb3I7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtTaXplfSAqL1xuICAgICAgICB0aGlzLnNpemVfID0gc2l6ZTtcblxuICAgICAgICAvKiogQHR5cGUge2Z1bmN0aW9uKENlbGwpOlNoYXBlfSAqL1xuICAgICAgICB0aGlzLnNoYXBlXyA9IHNoYXBlO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogRHJhdyBjZWxscyBhcyBzcXVhcmVzLCB3aXRoIHZhcmlvdXMgY29sb3JzIGFuZCBzaXplLlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7QXJyYXkuPENlbGw+fSBjZWxscyBcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gcmVzb2x1dGlvbiBcbiAgICAgKiBAcGFyYW0ge0NhbnZhc0dlb30gY2cgXG4gICAgICovXG4gICAgZHJhdyhjZWxscywgcmVzb2x1dGlvbiwgY2cpIHtcblxuICAgICAgICAvL2lmIHNpemUgaXMgdXNlZCwgc29ydCBjZWxscyBieSBzaXplIHNvIHRoYXQgdGhlIGJpZ2dlc3QgYXJlIGRyYXduIGZpcnN0XG4gICAgICAgIGlmICh0aGlzLnNpemVfKVxuICAgICAgICAgICAgY2VsbHMuc29ydCgoYzEsIGMyKSA9PiAodGhpcy5zaXplXy52YWwoYzIpIC0gdGhpcy5zaXplXy52YWwoYzEpKSk7XG5cbiAgICAgICAgZm9yIChsZXQgY2VsbCBvZiBjZWxscykge1xuXG4gICAgICAgICAgICAvL2NvbG9yXG4gICAgICAgICAgICBjZy5jdHguZmlsbFN0eWxlID0gdGhpcy5jb2xvciA/IHRoaXMuY29sb3JfKGNlbGwpIDogXCIjRUE2QkFDXCI7XG5cbiAgICAgICAgICAgIC8vc2l6ZVxuICAgICAgICAgICAgLyoqIEB0eXBlIHtTaXplfSAqL1xuICAgICAgICAgICAgbGV0IHNfID0gdGhpcy5zaXplXyB8fCB7IHZhbDogYz0+cmVzb2x1dGlvbiwgdW5pdDogXCJnZW9cIiB9O1xuICAgICAgICAgICAgLy9zaXplIC0gaW4gcGl4ZWwgYW5kIGdlb1xuICAgICAgICAgICAgLyoqIEB0eXBlIHtudW1iZXJ9ICovXG4gICAgICAgICAgICBjb25zdCBzUCA9IHNfLnVuaXQgPT09IFwicGl4XCIgPyBzXy52YWwoY2VsbCkgOiBzXy52YWwoY2VsbCkgLyBjZy56ZlxuICAgICAgICAgICAgLyoqIEB0eXBlIHtudW1iZXJ9ICovXG4gICAgICAgICAgICBjb25zdCBzRyA9IGNnLnpmICogc1A7XG5cbiAgICAgICAgICAgIC8vZ2V0IHNoYXBlXG4gICAgICAgICAgICBjb25zdCBzaGFwZSA9IHRoaXMuc2hhcGVfID8gdGhpcy5zaGFwZV8oY2VsbCkgOiBcInNxdWFyZVwiO1xuICAgICAgICAgICAgaWYgKHNoYXBlID09PSBcInNxdWFyZVwiKSB7XG4gICAgICAgICAgICAgICAgLy9kcmF3IHNxdWFyZVxuICAgICAgICAgICAgICAgIGNvbnN0IGQgPSByZXNvbHV0aW9uICogKDEgLSBzRyAvIHJlc29sdXRpb24pICogMC41XG4gICAgICAgICAgICAgICAgY2cuY3R4LmZpbGxSZWN0KFxuICAgICAgICAgICAgICAgICAgICBjZy5nZW9Ub1BpeFgoY2VsbC54ICsgZCArIHRoaXMub2Zmc2V0Xy5keCksXG4gICAgICAgICAgICAgICAgICAgIGNnLmdlb1RvUGl4WShjZWxsLnkgKyByZXNvbHV0aW9uIC0gZCArIHRoaXMub2Zmc2V0Xy5keSksXG4gICAgICAgICAgICAgICAgICAgIHNQLCBzUCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHNoYXBlID09PSBcImNpcmNsZVwiKSB7XG4gICAgICAgICAgICAgICAgLy9kcmF3IGNpcmNsZVxuICAgICAgICAgICAgICAgIGNnLmN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgICAgICAgICBjZy5jdHguYXJjKFxuICAgICAgICAgICAgICAgICAgICBjZy5nZW9Ub1BpeFgoY2VsbC54ICsgcmVzb2x1dGlvbiAqIDAuNSArIHRoaXMub2Zmc2V0Xy5keCksXG4gICAgICAgICAgICAgICAgICAgIGNnLmdlb1RvUGl4WShjZWxsLnkgKyByZXNvbHV0aW9uICogMC41ICsgdGhpcy5vZmZzZXRfLmR5KSxcbiAgICAgICAgICAgICAgICAgICAgc1AgKiAwLjUsXG4gICAgICAgICAgICAgICAgICAgIDAsIDIgKiBNYXRoLlBJLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgY2cuY3R4LmZpbGwoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmV4cGVjdGVkIHNoYXBlOicgKyBzaGFwZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vZHJhdyBzdHJva2VcbiAgICAgICAgICAgIHRoaXMuZHJhd1N0cm9rZShjZWxsLCByZXNvbHV0aW9uLCBjZywgdGhpcy5zaGFwZV8sIHRoaXMuc2l6ZV8pXG4gICAgICAgIH1cblxuICAgIH1cblxuXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9uKENlbGwpOnN0cmluZ30gY29sb3IgXG4gICAgICogQHJldHVybnMge3RoaXN8ZnVuY3Rpb24oQ2VsbCk6c3RyaW5nfVxuICAgICAqL1xuICAgIGNvbG9yKGNvbG9yKSB7XG4gICAgICAgIGlmIChjb2xvcikge1xuICAgICAgICAgICAgdGhpcy5jb2xvcl8gPSBjb2xvcjtcbiAgICAgICAgICAgIHJldHVybiB0aGlzXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuY29sb3JfXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtTaXplfSBzaXplIFxuICAgICAqIEByZXR1cm5zIHt0aGlzfFNpemV9XG4gICAgICovXG4gICAgc2l6ZShzaXplKSB7XG4gICAgICAgIGlmIChzaXplKSB7XG4gICAgICAgICAgICB0aGlzLnNpemVfID0gc2l6ZTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuc2l6ZV9cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9uKENlbGwpOlNoYXBlfSBzaGFwZSBcbiAgICAgKiBAcmV0dXJucyB7dGhpc3xmdW5jdGlvbihDZWxsKTpTaGFwZX1cbiAgICAgKi9cbiAgICBzaGFwZShzaGFwZSkge1xuICAgICAgICBpZiAoc2hhcGUpIHtcbiAgICAgICAgICAgIHRoaXMuc2hhcGVfID0gc2hhcGU7XG4gICAgICAgICAgICByZXR1cm4gdGhpc1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnNoYXBlX1xuICAgIH1cblxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==