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
/*! exports provided: App, color, CSVGrid, TiledGrid, ShapeColorSizeStyle, JoyPlotStyle, CompositionStyle, SegmentStyle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "App", function() { return App; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "color", function() { return color; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CSVGrid", function() { return CSVGrid; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TiledGrid", function() { return TiledGrid; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShapeColorSizeStyle", function() { return ShapeColorSizeStyle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JoyPlotStyle", function() { return JoyPlotStyle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CompositionStyle", function() { return CompositionStyle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SegmentStyle", function() { return SegmentStyle; });
/* harmony import */ var _App__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./App */ "./src/js/gridvizc/App.js");
/* harmony import */ var d3_scale_chromatic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-scale-chromatic */ "../node_modules/d3-scale-chromatic/src/index.js");
/* harmony import */ var _dataset_CSVGrid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dataset/CSVGrid */ "./src/js/gridvizc/dataset/CSVGrid.js");
/* harmony import */ var _dataset_TiledGrid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dataset/TiledGrid */ "./src/js/gridvizc/dataset/TiledGrid.js");
/* harmony import */ var _style_ShapeColorSizeStyle__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./style/ShapeColorSizeStyle */ "./src/js/gridvizc/style/ShapeColorSizeStyle.js");
/* harmony import */ var _style_JoyPlotStyle__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./style/JoyPlotStyle */ "./src/js/gridvizc/style/JoyPlotStyle.js");
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


const JoyPlotStyle = function (height) {
    return new _style_JoyPlotStyle__WEBPACK_IMPORTED_MODULE_5__["JoyPlotStyle"](height)
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
        /** @private @type {object} */
        this.color_ = color;

        /** @private @type {function(Cell):string} */
        this.type_ = type;

        /** @private @type {Size} */
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

/***/ "./src/js/gridvizc/style/JoyPlotStyle.js":
/*!***********************************************!*\
  !*** ./src/js/gridvizc/style/JoyPlotStyle.js ***!
  \***********************************************/
/*! exports provided: JoyPlotStyle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JoyPlotStyle", function() { return JoyPlotStyle; });
/* harmony import */ var _Style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Style */ "./src/js/gridvizc/Style.js");
/* harmony import */ var _Dataset__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Dataset */ "./src/js/gridvizc/Dataset.js");
/* harmony import */ var _CanvasGeo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../CanvasGeo */ "./src/js/gridvizc/CanvasGeo.js");
//@ts-check





/**
 * 
 * @author Julien Gaffuri
 */
class JoyPlotStyle extends _Style__WEBPACK_IMPORTED_MODULE_0__["Style"] {

    /**
      * @param {Size} height A function returning the height of a cell.
      */
    constructor(height) {
        super()

        /** @private @type {Size} */
        this.height_ = height;

        /** @private @type {string} */
        this.lineColor_ = "gray"
        /** @private @type {number} */
        this.lineWidth_ = 1;
        /** @private @type {string} */
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

        /** @private @type {function(Cell):number} */
        this.orientation = orientation;
        /** @private @type {function(Cell):string} */
        this.color = color;
        /** @private @type {Size} */
        this.length = length;
        /** @private @type {Size} */
        this.width = width;

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
            cg.ctx.lineWidth = this.width.unit === "pix" ? this.width.val(c) : this.width.val(c) / cg.zf;
            cg.ctx.strokeStyle = this.color(c);

            //get segment orientation (in radian) and length (in pixel)
            /** @type {number} */
            const or = this.orientation(c) * f
            /** @type {number} */
            const len = this.length.unit === "pix"? this.length.val(c) : this.length.val(c) / cg.zf

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



    //getters and setters

    /** @returns {function(Cell):number} */
    getOrientation() { return this.orientation; }
    /** @param {function(Cell):number} val @returns {this} */
    setOrientation(val) { this.orientation = val; return this; }

    /** @returns {function(Cell):string} */
    getColor() { return this.color; }
    /** @param {function(Cell):string} val @returns {this} */
    setColor(val) { this.color = val; return this; }

    /** @returns {Size} */
    getLength() { return this.length; }
    /** @param {Size} val @returns {this} */
    setLength(val) { this.length = val; return this; }
    /** @returns {Size} */

    getWidth() { return this.width; }
    /** @param {Size} val @returns {this} */
    setWidth(val) { this.width = val; return this; }

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

        /** @private @type {function(Cell):string} */
        this.color = color;

        /** @private @type {Size} */
        this.size = size;

        /** @private @type {function(Cell):Shape} */
        this.shape = shape;
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
        if (this.size)
            cells.sort((c1, c2) => (this.size.val(c2) - this.size.val(c1)));

        for (let cell of cells) {

            //color
            cg.ctx.fillStyle = this.color ? this.color(cell) : "#EA6BAC";

            //size
            /** @type {Size} */
            let s_ = this.size || { val: c=>resolution, unit: "geo" };
            //size - in pixel and geo
            /** @type {number} */
            const sP = s_.unit === "pix" ? s_.val(cell) : s_.val(cell) / cg.zf
            /** @type {number} */
            const sG = cg.zf * sP;

            //get shape
            const shape = this.shape ? this.shape(cell) : "square";
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
            this.drawStroke(cell, resolution, cg, this.shape, this.size)
        }

    }


    //getters and setters

    /** @returns {function(Cell):string} */
    getColor() { return this.color; }
    /** @param {function(Cell):string} val @returns {this} */
    setColor(val) { this.color = val; return this; }

    /** @returns {Size} */
    getSize() { return this.size; }
    /** @param {Size} val @returns {this} */
    setSize(val) { this.size = val; return this; }

    /** @returns {function(Cell):Shape} */
    getShape() { return this.shape; }
    /** @param {function(Cell):Shape} val @returns {this} */
    setShape(val) { this.shape = val; return this; }

}


/***/ })

/******/ });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9ndml6L3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly9ndml6L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2d2aXovLi4vbm9kZV9tb2R1bGVzL2QzLWNvbG9yL3NyYy9jb2xvci5qcyIsIndlYnBhY2s6Ly9ndml6Ly4uL25vZGVfbW9kdWxlcy9kMy1jb2xvci9zcmMvY3ViZWhlbGl4LmpzIiwid2VicGFjazovL2d2aXovLi4vbm9kZV9tb2R1bGVzL2QzLWNvbG9yL3NyYy9kZWZpbmUuanMiLCJ3ZWJwYWNrOi8vZ3Zpei8uLi9ub2RlX21vZHVsZXMvZDMtY29sb3Ivc3JjL2luZGV4LmpzIiwid2VicGFjazovL2d2aXovLi4vbm9kZV9tb2R1bGVzL2QzLWNvbG9yL3NyYy9sYWIuanMiLCJ3ZWJwYWNrOi8vZ3Zpei8uLi9ub2RlX21vZHVsZXMvZDMtY29sb3Ivc3JjL21hdGguanMiLCJ3ZWJwYWNrOi8vZ3Zpei8uLi9ub2RlX21vZHVsZXMvZDMtZHN2L3NyYy9hdXRvVHlwZS5qcyIsIndlYnBhY2s6Ly9ndml6Ly4uL25vZGVfbW9kdWxlcy9kMy1kc3Yvc3JjL2Nzdi5qcyIsIndlYnBhY2s6Ly9ndml6Ly4uL25vZGVfbW9kdWxlcy9kMy1kc3Yvc3JjL2Rzdi5qcyIsIndlYnBhY2s6Ly9ndml6Ly4uL25vZGVfbW9kdWxlcy9kMy1kc3Yvc3JjL2luZGV4LmpzIiwid2VicGFjazovL2d2aXovLi4vbm9kZV9tb2R1bGVzL2QzLWRzdi9zcmMvdHN2LmpzIiwid2VicGFjazovL2d2aXovLi4vbm9kZV9tb2R1bGVzL2QzLWZldGNoL3NyYy9ibG9iLmpzIiwid2VicGFjazovL2d2aXovLi4vbm9kZV9tb2R1bGVzL2QzLWZldGNoL3NyYy9idWZmZXIuanMiLCJ3ZWJwYWNrOi8vZ3Zpei8uLi9ub2RlX21vZHVsZXMvZDMtZmV0Y2gvc3JjL2Rzdi5qcyIsIndlYnBhY2s6Ly9ndml6Ly4uL25vZGVfbW9kdWxlcy9kMy1mZXRjaC9zcmMvaW1hZ2UuanMiLCJ3ZWJwYWNrOi8vZ3Zpei8uLi9ub2RlX21vZHVsZXMvZDMtZmV0Y2gvc3JjL2luZGV4LmpzIiwid2VicGFjazovL2d2aXovLi4vbm9kZV9tb2R1bGVzL2QzLWZldGNoL3NyYy9qc29uLmpzIiwid2VicGFjazovL2d2aXovLi4vbm9kZV9tb2R1bGVzL2QzLWZldGNoL3NyYy90ZXh0LmpzIiwid2VicGFjazovL2d2aXovLi4vbm9kZV9tb2R1bGVzL2QzLWZldGNoL3NyYy94bWwuanMiLCJ3ZWJwYWNrOi8vZ3Zpei8uLi9ub2RlX21vZHVsZXMvZDMtaW50ZXJwb2xhdGUvc3JjL2FycmF5LmpzIiwid2VicGFjazovL2d2aXovLi4vbm9kZV9tb2R1bGVzL2QzLWludGVycG9sYXRlL3NyYy9iYXNpcy5qcyIsIndlYnBhY2s6Ly9ndml6Ly4uL25vZGVfbW9kdWxlcy9kMy1pbnRlcnBvbGF0ZS9zcmMvYmFzaXNDbG9zZWQuanMiLCJ3ZWJwYWNrOi8vZ3Zpei8uLi9ub2RlX21vZHVsZXMvZDMtaW50ZXJwb2xhdGUvc3JjL2NvbG9yLmpzIiwid2VicGFjazovL2d2aXovLi4vbm9kZV9tb2R1bGVzL2QzLWludGVycG9sYXRlL3NyYy9jb25zdGFudC5qcyIsIndlYnBhY2s6Ly9ndml6Ly4uL25vZGVfbW9kdWxlcy9kMy1pbnRlcnBvbGF0ZS9zcmMvY3ViZWhlbGl4LmpzIiwid2VicGFjazovL2d2aXovLi4vbm9kZV9tb2R1bGVzL2QzLWludGVycG9sYXRlL3NyYy9kYXRlLmpzIiwid2VicGFjazovL2d2aXovLi4vbm9kZV9tb2R1bGVzL2QzLWludGVycG9sYXRlL3NyYy9kaXNjcmV0ZS5qcyIsIndlYnBhY2s6Ly9ndml6Ly4uL25vZGVfbW9kdWxlcy9kMy1pbnRlcnBvbGF0ZS9zcmMvaGNsLmpzIiwid2VicGFjazovL2d2aXovLi4vbm9kZV9tb2R1bGVzL2QzLWludGVycG9sYXRlL3NyYy9oc2wuanMiLCJ3ZWJwYWNrOi8vZ3Zpei8uLi9ub2RlX21vZHVsZXMvZDMtaW50ZXJwb2xhdGUvc3JjL2h1ZS5qcyIsIndlYnBhY2s6Ly9ndml6Ly4uL25vZGVfbW9kdWxlcy9kMy1pbnRlcnBvbGF0ZS9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZ3Zpei8uLi9ub2RlX21vZHVsZXMvZDMtaW50ZXJwb2xhdGUvc3JjL2xhYi5qcyIsIndlYnBhY2s6Ly9ndml6Ly4uL25vZGVfbW9kdWxlcy9kMy1pbnRlcnBvbGF0ZS9zcmMvbnVtYmVyLmpzIiwid2VicGFjazovL2d2aXovLi4vbm9kZV9tb2R1bGVzL2QzLWludGVycG9sYXRlL3NyYy9udW1iZXJBcnJheS5qcyIsIndlYnBhY2s6Ly9ndml6Ly4uL25vZGVfbW9kdWxlcy9kMy1pbnRlcnBvbGF0ZS9zcmMvb2JqZWN0LmpzIiwid2VicGFjazovL2d2aXovLi4vbm9kZV9tb2R1bGVzL2QzLWludGVycG9sYXRlL3NyYy9waWVjZXdpc2UuanMiLCJ3ZWJwYWNrOi8vZ3Zpei8uLi9ub2RlX21vZHVsZXMvZDMtaW50ZXJwb2xhdGUvc3JjL3F1YW50aXplLmpzIiwid2VicGFjazovL2d2aXovLi4vbm9kZV9tb2R1bGVzL2QzLWludGVycG9sYXRlL3NyYy9yZ2IuanMiLCJ3ZWJwYWNrOi8vZ3Zpei8uLi9ub2RlX21vZHVsZXMvZDMtaW50ZXJwb2xhdGUvc3JjL3JvdW5kLmpzIiwid2VicGFjazovL2d2aXovLi4vbm9kZV9tb2R1bGVzL2QzLWludGVycG9sYXRlL3NyYy9zdHJpbmcuanMiLCJ3ZWJwYWNrOi8vZ3Zpei8uLi9ub2RlX21vZHVsZXMvZDMtaW50ZXJwb2xhdGUvc3JjL3RyYW5zZm9ybS9kZWNvbXBvc2UuanMiLCJ3ZWJwYWNrOi8vZ3Zpei8uLi9ub2RlX21vZHVsZXMvZDMtaW50ZXJwb2xhdGUvc3JjL3RyYW5zZm9ybS9pbmRleC5qcyIsIndlYnBhY2s6Ly9ndml6Ly4uL25vZGVfbW9kdWxlcy9kMy1pbnRlcnBvbGF0ZS9zcmMvdHJhbnNmb3JtL3BhcnNlLmpzIiwid2VicGFjazovL2d2aXovLi4vbm9kZV9tb2R1bGVzL2QzLWludGVycG9sYXRlL3NyYy92YWx1ZS5qcyIsIndlYnBhY2s6Ly9ndml6Ly4uL25vZGVfbW9kdWxlcy9kMy1pbnRlcnBvbGF0ZS9zcmMvem9vbS5qcyIsIndlYnBhY2s6Ly9ndml6Ly4uL25vZGVfbW9kdWxlcy9kMy1zY2FsZS1jaHJvbWF0aWMvc3JjL2NhdGVnb3JpY2FsL0FjY2VudC5qcyIsIndlYnBhY2s6Ly9ndml6Ly4uL25vZGVfbW9kdWxlcy9kMy1zY2FsZS1jaHJvbWF0aWMvc3JjL2NhdGVnb3JpY2FsL0RhcmsyLmpzIiwid2VicGFjazovL2d2aXovLi4vbm9kZV9tb2R1bGVzL2QzLXNjYWxlLWNocm9tYXRpYy9zcmMvY2F0ZWdvcmljYWwvUGFpcmVkLmpzIiwid2VicGFjazovL2d2aXovLi4vbm9kZV9tb2R1bGVzL2QzLXNjYWxlLWNocm9tYXRpYy9zcmMvY2F0ZWdvcmljYWwvUGFzdGVsMS5qcyIsIndlYnBhY2s6Ly9ndml6Ly4uL25vZGVfbW9kdWxlcy9kMy1zY2FsZS1jaHJvbWF0aWMvc3JjL2NhdGVnb3JpY2FsL1Bhc3RlbDIuanMiLCJ3ZWJwYWNrOi8vZ3Zpei8uLi9ub2RlX21vZHVsZXMvZDMtc2NhbGUtY2hyb21hdGljL3NyYy9jYXRlZ29yaWNhbC9TZXQxLmpzIiwid2VicGFjazovL2d2aXovLi4vbm9kZV9tb2R1bGVzL2QzLXNjYWxlLWNocm9tYXRpYy9zcmMvY2F0ZWdvcmljYWwvU2V0Mi5qcyIsIndlYnBhY2s6Ly9ndml6Ly4uL25vZGVfbW9kdWxlcy9kMy1zY2FsZS1jaHJvbWF0aWMvc3JjL2NhdGVnb3JpY2FsL1NldDMuanMiLCJ3ZWJwYWNrOi8vZ3Zpei8uLi9ub2RlX21vZHVsZXMvZDMtc2NhbGUtY2hyb21hdGljL3NyYy9jYXRlZ29yaWNhbC9UYWJsZWF1MTAuanMiLCJ3ZWJwYWNrOi8vZ3Zpei8uLi9ub2RlX21vZHVsZXMvZDMtc2NhbGUtY2hyb21hdGljL3NyYy9jYXRlZ29yaWNhbC9jYXRlZ29yeTEwLmpzIiwid2VicGFjazovL2d2aXovLi4vbm9kZV9tb2R1bGVzL2QzLXNjYWxlLWNocm9tYXRpYy9zcmMvY29sb3JzLmpzIiwid2VicGFjazovL2d2aXovLi4vbm9kZV9tb2R1bGVzL2QzLXNjYWxlLWNocm9tYXRpYy9zcmMvZGl2ZXJnaW5nL0JyQkcuanMiLCJ3ZWJwYWNrOi8vZ3Zpei8uLi9ub2RlX21vZHVsZXMvZDMtc2NhbGUtY2hyb21hdGljL3NyYy9kaXZlcmdpbmcvUFJHbi5qcyIsIndlYnBhY2s6Ly9ndml6Ly4uL25vZGVfbW9kdWxlcy9kMy1zY2FsZS1jaHJvbWF0aWMvc3JjL2RpdmVyZ2luZy9QaVlHLmpzIiwid2VicGFjazovL2d2aXovLi4vbm9kZV9tb2R1bGVzL2QzLXNjYWxlLWNocm9tYXRpYy9zcmMvZGl2ZXJnaW5nL1B1T3IuanMiLCJ3ZWJwYWNrOi8vZ3Zpei8uLi9ub2RlX21vZHVsZXMvZDMtc2NhbGUtY2hyb21hdGljL3NyYy9kaXZlcmdpbmcvUmRCdS5qcyIsIndlYnBhY2s6Ly9ndml6Ly4uL25vZGVfbW9kdWxlcy9kMy1zY2FsZS1jaHJvbWF0aWMvc3JjL2RpdmVyZ2luZy9SZEd5LmpzIiwid2VicGFjazovL2d2aXovLi4vbm9kZV9tb2R1bGVzL2QzLXNjYWxlLWNocm9tYXRpYy9zcmMvZGl2ZXJnaW5nL1JkWWxCdS5qcyIsIndlYnBhY2s6Ly9ndml6Ly4uL25vZGVfbW9kdWxlcy9kMy1zY2FsZS1jaHJvbWF0aWMvc3JjL2RpdmVyZ2luZy9SZFlsR24uanMiLCJ3ZWJwYWNrOi8vZ3Zpei8uLi9ub2RlX21vZHVsZXMvZDMtc2NhbGUtY2hyb21hdGljL3NyYy9kaXZlcmdpbmcvU3BlY3RyYWwuanMiLCJ3ZWJwYWNrOi8vZ3Zpei8uLi9ub2RlX21vZHVsZXMvZDMtc2NhbGUtY2hyb21hdGljL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly9ndml6Ly4uL25vZGVfbW9kdWxlcy9kMy1zY2FsZS1jaHJvbWF0aWMvc3JjL3JhbXAuanMiLCJ3ZWJwYWNrOi8vZ3Zpei8uLi9ub2RlX21vZHVsZXMvZDMtc2NhbGUtY2hyb21hdGljL3NyYy9zZXF1ZW50aWFsLW11bHRpL0J1R24uanMiLCJ3ZWJwYWNrOi8vZ3Zpei8uLi9ub2RlX21vZHVsZXMvZDMtc2NhbGUtY2hyb21hdGljL3NyYy9zZXF1ZW50aWFsLW11bHRpL0J1UHUuanMiLCJ3ZWJwYWNrOi8vZ3Zpei8uLi9ub2RlX21vZHVsZXMvZDMtc2NhbGUtY2hyb21hdGljL3NyYy9zZXF1ZW50aWFsLW11bHRpL0duQnUuanMiLCJ3ZWJwYWNrOi8vZ3Zpei8uLi9ub2RlX21vZHVsZXMvZDMtc2NhbGUtY2hyb21hdGljL3NyYy9zZXF1ZW50aWFsLW11bHRpL09yUmQuanMiLCJ3ZWJwYWNrOi8vZ3Zpei8uLi9ub2RlX21vZHVsZXMvZDMtc2NhbGUtY2hyb21hdGljL3NyYy9zZXF1ZW50aWFsLW11bHRpL1B1QnUuanMiLCJ3ZWJwYWNrOi8vZ3Zpei8uLi9ub2RlX21vZHVsZXMvZDMtc2NhbGUtY2hyb21hdGljL3NyYy9zZXF1ZW50aWFsLW11bHRpL1B1QnVHbi5qcyIsIndlYnBhY2s6Ly9ndml6Ly4uL25vZGVfbW9kdWxlcy9kMy1zY2FsZS1jaHJvbWF0aWMvc3JjL3NlcXVlbnRpYWwtbXVsdGkvUHVSZC5qcyIsIndlYnBhY2s6Ly9ndml6Ly4uL25vZGVfbW9kdWxlcy9kMy1zY2FsZS1jaHJvbWF0aWMvc3JjL3NlcXVlbnRpYWwtbXVsdGkvUmRQdS5qcyIsIndlYnBhY2s6Ly9ndml6Ly4uL25vZGVfbW9kdWxlcy9kMy1zY2FsZS1jaHJvbWF0aWMvc3JjL3NlcXVlbnRpYWwtbXVsdGkvWWxHbi5qcyIsIndlYnBhY2s6Ly9ndml6Ly4uL25vZGVfbW9kdWxlcy9kMy1zY2FsZS1jaHJvbWF0aWMvc3JjL3NlcXVlbnRpYWwtbXVsdGkvWWxHbkJ1LmpzIiwid2VicGFjazovL2d2aXovLi4vbm9kZV9tb2R1bGVzL2QzLXNjYWxlLWNocm9tYXRpYy9zcmMvc2VxdWVudGlhbC1tdWx0aS9ZbE9yQnIuanMiLCJ3ZWJwYWNrOi8vZ3Zpei8uLi9ub2RlX21vZHVsZXMvZDMtc2NhbGUtY2hyb21hdGljL3NyYy9zZXF1ZW50aWFsLW11bHRpL1lsT3JSZC5qcyIsIndlYnBhY2s6Ly9ndml6Ly4uL25vZGVfbW9kdWxlcy9kMy1zY2FsZS1jaHJvbWF0aWMvc3JjL3NlcXVlbnRpYWwtbXVsdGkvY2l2aWRpcy5qcyIsIndlYnBhY2s6Ly9ndml6Ly4uL25vZGVfbW9kdWxlcy9kMy1zY2FsZS1jaHJvbWF0aWMvc3JjL3NlcXVlbnRpYWwtbXVsdGkvY3ViZWhlbGl4LmpzIiwid2VicGFjazovL2d2aXovLi4vbm9kZV9tb2R1bGVzL2QzLXNjYWxlLWNocm9tYXRpYy9zcmMvc2VxdWVudGlhbC1tdWx0aS9yYWluYm93LmpzIiwid2VicGFjazovL2d2aXovLi4vbm9kZV9tb2R1bGVzL2QzLXNjYWxlLWNocm9tYXRpYy9zcmMvc2VxdWVudGlhbC1tdWx0aS9zaW5lYm93LmpzIiwid2VicGFjazovL2d2aXovLi4vbm9kZV9tb2R1bGVzL2QzLXNjYWxlLWNocm9tYXRpYy9zcmMvc2VxdWVudGlhbC1tdWx0aS90dXJiby5qcyIsIndlYnBhY2s6Ly9ndml6Ly4uL25vZGVfbW9kdWxlcy9kMy1zY2FsZS1jaHJvbWF0aWMvc3JjL3NlcXVlbnRpYWwtbXVsdGkvdmlyaWRpcy5qcyIsIndlYnBhY2s6Ly9ndml6Ly4uL25vZGVfbW9kdWxlcy9kMy1zY2FsZS1jaHJvbWF0aWMvc3JjL3NlcXVlbnRpYWwtc2luZ2xlL0JsdWVzLmpzIiwid2VicGFjazovL2d2aXovLi4vbm9kZV9tb2R1bGVzL2QzLXNjYWxlLWNocm9tYXRpYy9zcmMvc2VxdWVudGlhbC1zaW5nbGUvR3JlZW5zLmpzIiwid2VicGFjazovL2d2aXovLi4vbm9kZV9tb2R1bGVzL2QzLXNjYWxlLWNocm9tYXRpYy9zcmMvc2VxdWVudGlhbC1zaW5nbGUvR3JleXMuanMiLCJ3ZWJwYWNrOi8vZ3Zpei8uLi9ub2RlX21vZHVsZXMvZDMtc2NhbGUtY2hyb21hdGljL3NyYy9zZXF1ZW50aWFsLXNpbmdsZS9PcmFuZ2VzLmpzIiwid2VicGFjazovL2d2aXovLi4vbm9kZV9tb2R1bGVzL2QzLXNjYWxlLWNocm9tYXRpYy9zcmMvc2VxdWVudGlhbC1zaW5nbGUvUHVycGxlcy5qcyIsIndlYnBhY2s6Ly9ndml6Ly4uL25vZGVfbW9kdWxlcy9kMy1zY2FsZS1jaHJvbWF0aWMvc3JjL3NlcXVlbnRpYWwtc2luZ2xlL1JlZHMuanMiLCJ3ZWJwYWNrOi8vZ3Zpei8uL3NyYy9qcy9ncmlkdml6Yy9BcHAuanMiLCJ3ZWJwYWNrOi8vZ3Zpei8uL3NyYy9qcy9ncmlkdml6Yy9DYW52YXNHZW8uanMiLCJ3ZWJwYWNrOi8vZ3Zpei8uL3NyYy9qcy9ncmlkdml6Yy9EYXRhc2V0LmpzIiwid2VicGFjazovL2d2aXovLi9zcmMvanMvZ3JpZHZpemMvTGF5ZXIuanMiLCJ3ZWJwYWNrOi8vZ3Zpei8uL3NyYy9qcy9ncmlkdml6Yy9TdHlsZS5qcyIsIndlYnBhY2s6Ly9ndml6Ly4vc3JjL2pzL2dyaWR2aXpjL2RhdGFzZXQvQ1NWR3JpZC5qcyIsIndlYnBhY2s6Ly9ndml6Ly4vc3JjL2pzL2dyaWR2aXpjL2RhdGFzZXQvR3JpZFRpbGUuanMiLCJ3ZWJwYWNrOi8vZ3Zpei8uL3NyYy9qcy9ncmlkdml6Yy9kYXRhc2V0L1RpbGVkR3JpZC5qcyIsIndlYnBhY2s6Ly9ndml6Ly4vc3JjL2pzL2dyaWR2aXpjL2luZGV4LmpzIiwid2VicGFjazovL2d2aXovLi9zcmMvanMvZ3JpZHZpemMvc3R5bGUvQ29tcG9zaXRpb25TdHlsZS5qcyIsIndlYnBhY2s6Ly9ndml6Ly4vc3JjL2pzL2dyaWR2aXpjL3N0eWxlL0pveVBsb3RTdHlsZS5qcyIsIndlYnBhY2s6Ly9ndml6Ly4vc3JjL2pzL2dyaWR2aXpjL3N0eWxlL1NlZ21lbnRTdHlsZS5qcyIsIndlYnBhY2s6Ly9ndml6Ly4vc3JjL2pzL2dyaWR2aXpjL3N0eWxlL1NoYXBlQ29sb3JTaXplU3R5bGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87UUNWQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUEyQzs7QUFFcEM7O0FBRUE7QUFDQTs7QUFFUDtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsSUFBSTtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDBEQUFNO0FBQ047QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsMERBQU0sV0FBVyx5REFBTTtBQUN2QjtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFD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QUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQXdFO0FBQ1I7QUFDRjtBQUNFO0FBQ0U7QUFDQTtBQUNOO0FBQ0E7QUFDQTtBQUNVO0FBQ2U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ007QUFDQTtBQUNNO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDTTtBQUNOO0FBQ0E7QUFDQTtBQUNNO0FBQ047QUFDTTtBQUNBO0FBQ0Y7QUFDRztB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QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7OztBQUdBOztBQUVBLGtCQUFrQixzQkFBc0I7QUFDeEMsZ0JBQWdCLG1CQUFtQjtBQUNuQyxnQkFBZ0Isc0JBQXNCLGVBQWUsS0FBSztBQUMxRCxtQkFBbUIsa0JBQWtCLGFBQWE7O0FBRWxELGtCQUFrQixLQUFLO0FBQ3ZCLGVBQWUsa0JBQWtCO0FBQ2pDLGdCQUFnQixLQUFLLGVBQWUsS0FBSztBQUN6QyxrQkFBa0IsaUJBQWlCLGFBQWE7O0FBRWhELGtCQUFrQixxQkFBcUI7QUFDdkMsZ0JBQWdCLG1CQUFtQjtBQUNuQyxnQkFBZ0IscUJBQXFCLGVBQWUsS0FBSztBQUN6RCxtQkFBbUIsa0JBQWtCLGFBQWE7O0FBRWxEIiwiZmlsZSI6ImdyaWR2aXpjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiZ3ZpelwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJndml6XCJdID0gZmFjdG9yeSgpO1xufSkod2luZG93LCBmdW5jdGlvbigpIHtcbnJldHVybiAiLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcImJ1aWxkL1wiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9qcy9ncmlkdml6Yy9pbmRleC5qc1wiKTtcbiIsImltcG9ydCBkZWZpbmUsIHtleHRlbmR9IGZyb20gXCIuL2RlZmluZS5qc1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gQ29sb3IoKSB7fVxuXG5leHBvcnQgdmFyIGRhcmtlciA9IDAuNztcbmV4cG9ydCB2YXIgYnJpZ2h0ZXIgPSAxIC8gZGFya2VyO1xuXG52YXIgcmVJID0gXCJcXFxccyooWystXT9cXFxcZCspXFxcXHMqXCIsXG4gICAgcmVOID0gXCJcXFxccyooWystXT9cXFxcZCpcXFxcLj9cXFxcZCsoPzpbZUVdWystXT9cXFxcZCspPylcXFxccypcIixcbiAgICByZVAgPSBcIlxcXFxzKihbKy1dP1xcXFxkKlxcXFwuP1xcXFxkKyg/OltlRV1bKy1dP1xcXFxkKyk/KSVcXFxccypcIixcbiAgICByZUhleCA9IC9eIyhbMC05YS1mXXszLDh9KSQvLFxuICAgIHJlUmdiSW50ZWdlciA9IG5ldyBSZWdFeHAoXCJecmdiXFxcXChcIiArIFtyZUksIHJlSSwgcmVJXSArIFwiXFxcXCkkXCIpLFxuICAgIHJlUmdiUGVyY2VudCA9IG5ldyBSZWdFeHAoXCJecmdiXFxcXChcIiArIFtyZVAsIHJlUCwgcmVQXSArIFwiXFxcXCkkXCIpLFxuICAgIHJlUmdiYUludGVnZXIgPSBuZXcgUmVnRXhwKFwiXnJnYmFcXFxcKFwiICsgW3JlSSwgcmVJLCByZUksIHJlTl0gKyBcIlxcXFwpJFwiKSxcbiAgICByZVJnYmFQZXJjZW50ID0gbmV3IFJlZ0V4cChcIl5yZ2JhXFxcXChcIiArIFtyZVAsIHJlUCwgcmVQLCByZU5dICsgXCJcXFxcKSRcIiksXG4gICAgcmVIc2xQZXJjZW50ID0gbmV3IFJlZ0V4cChcIl5oc2xcXFxcKFwiICsgW3JlTiwgcmVQLCByZVBdICsgXCJcXFxcKSRcIiksXG4gICAgcmVIc2xhUGVyY2VudCA9IG5ldyBSZWdFeHAoXCJeaHNsYVxcXFwoXCIgKyBbcmVOLCByZVAsIHJlUCwgcmVOXSArIFwiXFxcXCkkXCIpO1xuXG52YXIgbmFtZWQgPSB7XG4gIGFsaWNlYmx1ZTogMHhmMGY4ZmYsXG4gIGFudGlxdWV3aGl0ZTogMHhmYWViZDcsXG4gIGFxdWE6IDB4MDBmZmZmLFxuICBhcXVhbWFyaW5lOiAweDdmZmZkNCxcbiAgYXp1cmU6IDB4ZjBmZmZmLFxuICBiZWlnZTogMHhmNWY1ZGMsXG4gIGJpc3F1ZTogMHhmZmU0YzQsXG4gIGJsYWNrOiAweDAwMDAwMCxcbiAgYmxhbmNoZWRhbG1vbmQ6IDB4ZmZlYmNkLFxuICBibHVlOiAweDAwMDBmZixcbiAgYmx1ZXZpb2xldDogMHg4YTJiZTIsXG4gIGJyb3duOiAweGE1MmEyYSxcbiAgYnVybHl3b29kOiAweGRlYjg4NyxcbiAgY2FkZXRibHVlOiAweDVmOWVhMCxcbiAgY2hhcnRyZXVzZTogMHg3ZmZmMDAsXG4gIGNob2NvbGF0ZTogMHhkMjY5MWUsXG4gIGNvcmFsOiAweGZmN2Y1MCxcbiAgY29ybmZsb3dlcmJsdWU6IDB4NjQ5NWVkLFxuICBjb3Juc2lsazogMHhmZmY4ZGMsXG4gIGNyaW1zb246IDB4ZGMxNDNjLFxuICBjeWFuOiAweDAwZmZmZixcbiAgZGFya2JsdWU6IDB4MDAwMDhiLFxuICBkYXJrY3lhbjogMHgwMDhiOGIsXG4gIGRhcmtnb2xkZW5yb2Q6IDB4Yjg4NjBiLFxuICBkYXJrZ3JheTogMHhhOWE5YTksXG4gIGRhcmtncmVlbjogMHgwMDY0MDAsXG4gIGRhcmtncmV5OiAweGE5YTlhOSxcbiAgZGFya2toYWtpOiAweGJkYjc2YixcbiAgZGFya21hZ2VudGE6IDB4OGIwMDhiLFxuICBkYXJrb2xpdmVncmVlbjogMHg1NTZiMmYsXG4gIGRhcmtvcmFuZ2U6IDB4ZmY4YzAwLFxuICBkYXJrb3JjaGlkOiAweDk5MzJjYyxcbiAgZGFya3JlZDogMHg4YjAwMDAsXG4gIGRhcmtzYWxtb246IDB4ZTk5NjdhLFxuICBkYXJrc2VhZ3JlZW46IDB4OGZiYzhmLFxuICBkYXJrc2xhdGVibHVlOiAweDQ4M2Q4YixcbiAgZGFya3NsYXRlZ3JheTogMHgyZjRmNGYsXG4gIGRhcmtzbGF0ZWdyZXk6IDB4MmY0ZjRmLFxuICBkYXJrdHVycXVvaXNlOiAweDAwY2VkMSxcbiAgZGFya3Zpb2xldDogMHg5NDAwZDMsXG4gIGRlZXBwaW5rOiAweGZmMTQ5MyxcbiAgZGVlcHNreWJsdWU6IDB4MDBiZmZmLFxuICBkaW1ncmF5OiAweDY5Njk2OSxcbiAgZGltZ3JleTogMHg2OTY5NjksXG4gIGRvZGdlcmJsdWU6IDB4MWU5MGZmLFxuICBmaXJlYnJpY2s6IDB4YjIyMjIyLFxuICBmbG9yYWx3aGl0ZTogMHhmZmZhZjAsXG4gIGZvcmVzdGdyZWVuOiAweDIyOGIyMixcbiAgZnVjaHNpYTogMHhmZjAwZmYsXG4gIGdhaW5zYm9ybzogMHhkY2RjZGMsXG4gIGdob3N0d2hpdGU6IDB4ZjhmOGZmLFxuICBnb2xkOiAweGZmZDcwMCxcbiAgZ29sZGVucm9kOiAweGRhYTUyMCxcbiAgZ3JheTogMHg4MDgwODAsXG4gIGdyZWVuOiAweDAwODAwMCxcbiAgZ3JlZW55ZWxsb3c6IDB4YWRmZjJmLFxuICBncmV5OiAweDgwODA4MCxcbiAgaG9uZXlkZXc6IDB4ZjBmZmYwLFxuICBob3RwaW5rOiAweGZmNjliNCxcbiAgaW5kaWFucmVkOiAweGNkNWM1YyxcbiAgaW5kaWdvOiAweDRiMDA4MixcbiAgaXZvcnk6IDB4ZmZmZmYwLFxuICBraGFraTogMHhmMGU2OGMsXG4gIGxhdmVuZGVyOiAweGU2ZTZmYSxcbiAgbGF2ZW5kZXJibHVzaDogMHhmZmYwZjUsXG4gIGxhd25ncmVlbjogMHg3Y2ZjMDAsXG4gIGxlbW9uY2hpZmZvbjogMHhmZmZhY2QsXG4gIGxpZ2h0Ymx1ZTogMHhhZGQ4ZTYsXG4gIGxpZ2h0Y29yYWw6IDB4ZjA4MDgwLFxuICBsaWdodGN5YW46IDB4ZTBmZmZmLFxuICBsaWdodGdvbGRlbnJvZHllbGxvdzogMHhmYWZhZDIsXG4gIGxpZ2h0Z3JheTogMHhkM2QzZDMsXG4gIGxpZ2h0Z3JlZW46IDB4OTBlZTkwLFxuICBsaWdodGdyZXk6IDB4ZDNkM2QzLFxuICBsaWdodHBpbms6IDB4ZmZiNmMxLFxuICBsaWdodHNhbG1vbjogMHhmZmEwN2EsXG4gIGxpZ2h0c2VhZ3JlZW46IDB4MjBiMmFhLFxuICBsaWdodHNreWJsdWU6IDB4ODdjZWZhLFxuICBsaWdodHNsYXRlZ3JheTogMHg3Nzg4OTksXG4gIGxpZ2h0c2xhdGVncmV5OiAweDc3ODg5OSxcbiAgbGlnaHRzdGVlbGJsdWU6IDB4YjBjNGRlLFxuICBsaWdodHllbGxvdzogMHhmZmZmZTAsXG4gIGxpbWU6IDB4MDBmZjAwLFxuICBsaW1lZ3JlZW46IDB4MzJjZDMyLFxuICBsaW5lbjogMHhmYWYwZTYsXG4gIG1hZ2VudGE6IDB4ZmYwMGZmLFxuICBtYXJvb246IDB4ODAwMDAwLFxuICBtZWRpdW1hcXVhbWFyaW5lOiAweDY2Y2RhYSxcbiAgbWVkaXVtYmx1ZTogMHgwMDAwY2QsXG4gIG1lZGl1bW9yY2hpZDogMHhiYTU1ZDMsXG4gIG1lZGl1bXB1cnBsZTogMHg5MzcwZGIsXG4gIG1lZGl1bXNlYWdyZWVuOiAweDNjYjM3MSxcbiAgbWVkaXVtc2xhdGVibHVlOiAweDdiNjhlZSxcbiAgbWVkaXVtc3ByaW5nZ3JlZW46IDB4MDBmYTlhLFxuICBtZWRpdW10dXJxdW9pc2U6IDB4NDhkMWNjLFxuICBtZWRpdW12aW9sZXRyZWQ6IDB4YzcxNTg1LFxuICBtaWRuaWdodGJsdWU6IDB4MTkxOTcwLFxuICBtaW50Y3JlYW06IDB4ZjVmZmZhLFxuICBtaXN0eXJvc2U6IDB4ZmZlNGUxLFxuICBtb2NjYXNpbjogMHhmZmU0YjUsXG4gIG5hdmFqb3doaXRlOiAweGZmZGVhZCxcbiAgbmF2eTogMHgwMDAwODAsXG4gIG9sZGxhY2U6IDB4ZmRmNWU2LFxuICBvbGl2ZTogMHg4MDgwMDAsXG4gIG9saXZlZHJhYjogMHg2YjhlMjMsXG4gIG9yYW5nZTogMHhmZmE1MDAsXG4gIG9yYW5nZXJlZDogMHhmZjQ1MDAsXG4gIG9yY2hpZDogMHhkYTcwZDYsXG4gIHBhbGVnb2xkZW5yb2Q6IDB4ZWVlOGFhLFxuICBwYWxlZ3JlZW46IDB4OThmYjk4LFxuICBwYWxldHVycXVvaXNlOiAweGFmZWVlZSxcbiAgcGFsZXZpb2xldHJlZDogMHhkYjcwOTMsXG4gIHBhcGF5YXdoaXA6IDB4ZmZlZmQ1LFxuICBwZWFjaHB1ZmY6IDB4ZmZkYWI5LFxuICBwZXJ1OiAweGNkODUzZixcbiAgcGluazogMHhmZmMwY2IsXG4gIHBsdW06IDB4ZGRhMGRkLFxuICBwb3dkZXJibHVlOiAweGIwZTBlNixcbiAgcHVycGxlOiAweDgwMDA4MCxcbiAgcmViZWNjYXB1cnBsZTogMHg2NjMzOTksXG4gIHJlZDogMHhmZjAwMDAsXG4gIHJvc3licm93bjogMHhiYzhmOGYsXG4gIHJveWFsYmx1ZTogMHg0MTY5ZTEsXG4gIHNhZGRsZWJyb3duOiAweDhiNDUxMyxcbiAgc2FsbW9uOiAweGZhODA3MixcbiAgc2FuZHlicm93bjogMHhmNGE0NjAsXG4gIHNlYWdyZWVuOiAweDJlOGI1NyxcbiAgc2Vhc2hlbGw6IDB4ZmZmNWVlLFxuICBzaWVubmE6IDB4YTA1MjJkLFxuICBzaWx2ZXI6IDB4YzBjMGMwLFxuICBza3libHVlOiAweDg3Y2VlYixcbiAgc2xhdGVibHVlOiAweDZhNWFjZCxcbiAgc2xhdGVncmF5OiAweDcwODA5MCxcbiAgc2xhdGVncmV5OiAweDcwODA5MCxcbiAgc25vdzogMHhmZmZhZmEsXG4gIHNwcmluZ2dyZWVuOiAweDAwZmY3ZixcbiAgc3RlZWxibHVlOiAweDQ2ODJiNCxcbiAgdGFuOiAweGQyYjQ4YyxcbiAgdGVhbDogMHgwMDgwODAsXG4gIHRoaXN0bGU6IDB4ZDhiZmQ4LFxuICB0b21hdG86IDB4ZmY2MzQ3LFxuICB0dXJxdW9pc2U6IDB4NDBlMGQwLFxuICB2aW9sZXQ6IDB4ZWU4MmVlLFxuICB3aGVhdDogMHhmNWRlYjMsXG4gIHdoaXRlOiAweGZmZmZmZixcbiAgd2hpdGVzbW9rZTogMHhmNWY1ZjUsXG4gIHllbGxvdzogMHhmZmZmMDAsXG4gIHllbGxvd2dyZWVuOiAweDlhY2QzMlxufTtcblxuZGVmaW5lKENvbG9yLCBjb2xvciwge1xuICBjb3B5OiBmdW5jdGlvbihjaGFubmVscykge1xuICAgIHJldHVybiBPYmplY3QuYXNzaWduKG5ldyB0aGlzLmNvbnN0cnVjdG9yLCB0aGlzLCBjaGFubmVscyk7XG4gIH0sXG4gIGRpc3BsYXlhYmxlOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5yZ2IoKS5kaXNwbGF5YWJsZSgpO1xuICB9LFxuICBoZXg6IGNvbG9yX2Zvcm1hdEhleCwgLy8gRGVwcmVjYXRlZCEgVXNlIGNvbG9yLmZvcm1hdEhleC5cbiAgZm9ybWF0SGV4OiBjb2xvcl9mb3JtYXRIZXgsXG4gIGZvcm1hdEhzbDogY29sb3JfZm9ybWF0SHNsLFxuICBmb3JtYXRSZ2I6IGNvbG9yX2Zvcm1hdFJnYixcbiAgdG9TdHJpbmc6IGNvbG9yX2Zvcm1hdFJnYlxufSk7XG5cbmZ1bmN0aW9uIGNvbG9yX2Zvcm1hdEhleCgpIHtcbiAgcmV0dXJuIHRoaXMucmdiKCkuZm9ybWF0SGV4KCk7XG59XG5cbmZ1bmN0aW9uIGNvbG9yX2Zvcm1hdEhzbCgpIHtcbiAgcmV0dXJuIGhzbENvbnZlcnQodGhpcykuZm9ybWF0SHNsKCk7XG59XG5cbmZ1bmN0aW9uIGNvbG9yX2Zvcm1hdFJnYigpIHtcbiAgcmV0dXJuIHRoaXMucmdiKCkuZm9ybWF0UmdiKCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbG9yKGZvcm1hdCkge1xuICB2YXIgbSwgbDtcbiAgZm9ybWF0ID0gKGZvcm1hdCArIFwiXCIpLnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xuICByZXR1cm4gKG0gPSByZUhleC5leGVjKGZvcm1hdCkpID8gKGwgPSBtWzFdLmxlbmd0aCwgbSA9IHBhcnNlSW50KG1bMV0sIDE2KSwgbCA9PT0gNiA/IHJnYm4obSkgLy8gI2ZmMDAwMFxuICAgICAgOiBsID09PSAzID8gbmV3IFJnYigobSA+PiA4ICYgMHhmKSB8IChtID4+IDQgJiAweGYwKSwgKG0gPj4gNCAmIDB4ZikgfCAobSAmIDB4ZjApLCAoKG0gJiAweGYpIDw8IDQpIHwgKG0gJiAweGYpLCAxKSAvLyAjZjAwXG4gICAgICA6IGwgPT09IDggPyByZ2JhKG0gPj4gMjQgJiAweGZmLCBtID4+IDE2ICYgMHhmZiwgbSA+PiA4ICYgMHhmZiwgKG0gJiAweGZmKSAvIDB4ZmYpIC8vICNmZjAwMDAwMFxuICAgICAgOiBsID09PSA0ID8gcmdiYSgobSA+PiAxMiAmIDB4ZikgfCAobSA+PiA4ICYgMHhmMCksIChtID4+IDggJiAweGYpIHwgKG0gPj4gNCAmIDB4ZjApLCAobSA+PiA0ICYgMHhmKSB8IChtICYgMHhmMCksICgoKG0gJiAweGYpIDw8IDQpIHwgKG0gJiAweGYpKSAvIDB4ZmYpIC8vICNmMDAwXG4gICAgICA6IG51bGwpIC8vIGludmFsaWQgaGV4XG4gICAgICA6IChtID0gcmVSZ2JJbnRlZ2VyLmV4ZWMoZm9ybWF0KSkgPyBuZXcgUmdiKG1bMV0sIG1bMl0sIG1bM10sIDEpIC8vIHJnYigyNTUsIDAsIDApXG4gICAgICA6IChtID0gcmVSZ2JQZXJjZW50LmV4ZWMoZm9ybWF0KSkgPyBuZXcgUmdiKG1bMV0gKiAyNTUgLyAxMDAsIG1bMl0gKiAyNTUgLyAxMDAsIG1bM10gKiAyNTUgLyAxMDAsIDEpIC8vIHJnYigxMDAlLCAwJSwgMCUpXG4gICAgICA6IChtID0gcmVSZ2JhSW50ZWdlci5leGVjKGZvcm1hdCkpID8gcmdiYShtWzFdLCBtWzJdLCBtWzNdLCBtWzRdKSAvLyByZ2JhKDI1NSwgMCwgMCwgMSlcbiAgICAgIDogKG0gPSByZVJnYmFQZXJjZW50LmV4ZWMoZm9ybWF0KSkgPyByZ2JhKG1bMV0gKiAyNTUgLyAxMDAsIG1bMl0gKiAyNTUgLyAxMDAsIG1bM10gKiAyNTUgLyAxMDAsIG1bNF0pIC8vIHJnYigxMDAlLCAwJSwgMCUsIDEpXG4gICAgICA6IChtID0gcmVIc2xQZXJjZW50LmV4ZWMoZm9ybWF0KSkgPyBoc2xhKG1bMV0sIG1bMl0gLyAxMDAsIG1bM10gLyAxMDAsIDEpIC8vIGhzbCgxMjAsIDUwJSwgNTAlKVxuICAgICAgOiAobSA9IHJlSHNsYVBlcmNlbnQuZXhlYyhmb3JtYXQpKSA/IGhzbGEobVsxXSwgbVsyXSAvIDEwMCwgbVszXSAvIDEwMCwgbVs0XSkgLy8gaHNsYSgxMjAsIDUwJSwgNTAlLCAxKVxuICAgICAgOiBuYW1lZC5oYXNPd25Qcm9wZXJ0eShmb3JtYXQpID8gcmdibihuYW1lZFtmb3JtYXRdKSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXByb3RvdHlwZS1idWlsdGluc1xuICAgICAgOiBmb3JtYXQgPT09IFwidHJhbnNwYXJlbnRcIiA/IG5ldyBSZ2IoTmFOLCBOYU4sIE5hTiwgMClcbiAgICAgIDogbnVsbDtcbn1cblxuZnVuY3Rpb24gcmdibihuKSB7XG4gIHJldHVybiBuZXcgUmdiKG4gPj4gMTYgJiAweGZmLCBuID4+IDggJiAweGZmLCBuICYgMHhmZiwgMSk7XG59XG5cbmZ1bmN0aW9uIHJnYmEociwgZywgYiwgYSkge1xuICBpZiAoYSA8PSAwKSByID0gZyA9IGIgPSBOYU47XG4gIHJldHVybiBuZXcgUmdiKHIsIGcsIGIsIGEpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmdiQ29udmVydChvKSB7XG4gIGlmICghKG8gaW5zdGFuY2VvZiBDb2xvcikpIG8gPSBjb2xvcihvKTtcbiAgaWYgKCFvKSByZXR1cm4gbmV3IFJnYjtcbiAgbyA9IG8ucmdiKCk7XG4gIHJldHVybiBuZXcgUmdiKG8uciwgby5nLCBvLmIsIG8ub3BhY2l0eSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZ2IociwgZywgYiwgb3BhY2l0eSkge1xuICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA9PT0gMSA/IHJnYkNvbnZlcnQocikgOiBuZXcgUmdiKHIsIGcsIGIsIG9wYWNpdHkgPT0gbnVsbCA/IDEgOiBvcGFjaXR5KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFJnYihyLCBnLCBiLCBvcGFjaXR5KSB7XG4gIHRoaXMuciA9ICtyO1xuICB0aGlzLmcgPSArZztcbiAgdGhpcy5iID0gK2I7XG4gIHRoaXMub3BhY2l0eSA9ICtvcGFjaXR5O1xufVxuXG5kZWZpbmUoUmdiLCByZ2IsIGV4dGVuZChDb2xvciwge1xuICBicmlnaHRlcjogZnVuY3Rpb24oaykge1xuICAgIGsgPSBrID09IG51bGwgPyBicmlnaHRlciA6IE1hdGgucG93KGJyaWdodGVyLCBrKTtcbiAgICByZXR1cm4gbmV3IFJnYih0aGlzLnIgKiBrLCB0aGlzLmcgKiBrLCB0aGlzLmIgKiBrLCB0aGlzLm9wYWNpdHkpO1xuICB9LFxuICBkYXJrZXI6IGZ1bmN0aW9uKGspIHtcbiAgICBrID0gayA9PSBudWxsID8gZGFya2VyIDogTWF0aC5wb3coZGFya2VyLCBrKTtcbiAgICByZXR1cm4gbmV3IFJnYih0aGlzLnIgKiBrLCB0aGlzLmcgKiBrLCB0aGlzLmIgKiBrLCB0aGlzLm9wYWNpdHkpO1xuICB9LFxuICByZ2I6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuICBkaXNwbGF5YWJsZTogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuICgtMC41IDw9IHRoaXMuciAmJiB0aGlzLnIgPCAyNTUuNSlcbiAgICAgICAgJiYgKC0wLjUgPD0gdGhpcy5nICYmIHRoaXMuZyA8IDI1NS41KVxuICAgICAgICAmJiAoLTAuNSA8PSB0aGlzLmIgJiYgdGhpcy5iIDwgMjU1LjUpXG4gICAgICAgICYmICgwIDw9IHRoaXMub3BhY2l0eSAmJiB0aGlzLm9wYWNpdHkgPD0gMSk7XG4gIH0sXG4gIGhleDogcmdiX2Zvcm1hdEhleCwgLy8gRGVwcmVjYXRlZCEgVXNlIGNvbG9yLmZvcm1hdEhleC5cbiAgZm9ybWF0SGV4OiByZ2JfZm9ybWF0SGV4LFxuICBmb3JtYXRSZ2I6IHJnYl9mb3JtYXRSZ2IsXG4gIHRvU3RyaW5nOiByZ2JfZm9ybWF0UmdiXG59KSk7XG5cbmZ1bmN0aW9uIHJnYl9mb3JtYXRIZXgoKSB7XG4gIHJldHVybiBcIiNcIiArIGhleCh0aGlzLnIpICsgaGV4KHRoaXMuZykgKyBoZXgodGhpcy5iKTtcbn1cblxuZnVuY3Rpb24gcmdiX2Zvcm1hdFJnYigpIHtcbiAgdmFyIGEgPSB0aGlzLm9wYWNpdHk7IGEgPSBpc05hTihhKSA/IDEgOiBNYXRoLm1heCgwLCBNYXRoLm1pbigxLCBhKSk7XG4gIHJldHVybiAoYSA9PT0gMSA/IFwicmdiKFwiIDogXCJyZ2JhKFwiKVxuICAgICAgKyBNYXRoLm1heCgwLCBNYXRoLm1pbigyNTUsIE1hdGgucm91bmQodGhpcy5yKSB8fCAwKSkgKyBcIiwgXCJcbiAgICAgICsgTWF0aC5tYXgoMCwgTWF0aC5taW4oMjU1LCBNYXRoLnJvdW5kKHRoaXMuZykgfHwgMCkpICsgXCIsIFwiXG4gICAgICArIE1hdGgubWF4KDAsIE1hdGgubWluKDI1NSwgTWF0aC5yb3VuZCh0aGlzLmIpIHx8IDApKVxuICAgICAgKyAoYSA9PT0gMSA/IFwiKVwiIDogXCIsIFwiICsgYSArIFwiKVwiKTtcbn1cblxuZnVuY3Rpb24gaGV4KHZhbHVlKSB7XG4gIHZhbHVlID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oMjU1LCBNYXRoLnJvdW5kKHZhbHVlKSB8fCAwKSk7XG4gIHJldHVybiAodmFsdWUgPCAxNiA/IFwiMFwiIDogXCJcIikgKyB2YWx1ZS50b1N0cmluZygxNik7XG59XG5cbmZ1bmN0aW9uIGhzbGEoaCwgcywgbCwgYSkge1xuICBpZiAoYSA8PSAwKSBoID0gcyA9IGwgPSBOYU47XG4gIGVsc2UgaWYgKGwgPD0gMCB8fCBsID49IDEpIGggPSBzID0gTmFOO1xuICBlbHNlIGlmIChzIDw9IDApIGggPSBOYU47XG4gIHJldHVybiBuZXcgSHNsKGgsIHMsIGwsIGEpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaHNsQ29udmVydChvKSB7XG4gIGlmIChvIGluc3RhbmNlb2YgSHNsKSByZXR1cm4gbmV3IEhzbChvLmgsIG8ucywgby5sLCBvLm9wYWNpdHkpO1xuICBpZiAoIShvIGluc3RhbmNlb2YgQ29sb3IpKSBvID0gY29sb3Iobyk7XG4gIGlmICghbykgcmV0dXJuIG5ldyBIc2w7XG4gIGlmIChvIGluc3RhbmNlb2YgSHNsKSByZXR1cm4gbztcbiAgbyA9IG8ucmdiKCk7XG4gIHZhciByID0gby5yIC8gMjU1LFxuICAgICAgZyA9IG8uZyAvIDI1NSxcbiAgICAgIGIgPSBvLmIgLyAyNTUsXG4gICAgICBtaW4gPSBNYXRoLm1pbihyLCBnLCBiKSxcbiAgICAgIG1heCA9IE1hdGgubWF4KHIsIGcsIGIpLFxuICAgICAgaCA9IE5hTixcbiAgICAgIHMgPSBtYXggLSBtaW4sXG4gICAgICBsID0gKG1heCArIG1pbikgLyAyO1xuICBpZiAocykge1xuICAgIGlmIChyID09PSBtYXgpIGggPSAoZyAtIGIpIC8gcyArIChnIDwgYikgKiA2O1xuICAgIGVsc2UgaWYgKGcgPT09IG1heCkgaCA9IChiIC0gcikgLyBzICsgMjtcbiAgICBlbHNlIGggPSAociAtIGcpIC8gcyArIDQ7XG4gICAgcyAvPSBsIDwgMC41ID8gbWF4ICsgbWluIDogMiAtIG1heCAtIG1pbjtcbiAgICBoICo9IDYwO1xuICB9IGVsc2Uge1xuICAgIHMgPSBsID4gMCAmJiBsIDwgMSA/IDAgOiBoO1xuICB9XG4gIHJldHVybiBuZXcgSHNsKGgsIHMsIGwsIG8ub3BhY2l0eSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBoc2woaCwgcywgbCwgb3BhY2l0eSkge1xuICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA9PT0gMSA/IGhzbENvbnZlcnQoaCkgOiBuZXcgSHNsKGgsIHMsIGwsIG9wYWNpdHkgPT0gbnVsbCA/IDEgOiBvcGFjaXR5KTtcbn1cblxuZnVuY3Rpb24gSHNsKGgsIHMsIGwsIG9wYWNpdHkpIHtcbiAgdGhpcy5oID0gK2g7XG4gIHRoaXMucyA9ICtzO1xuICB0aGlzLmwgPSArbDtcbiAgdGhpcy5vcGFjaXR5ID0gK29wYWNpdHk7XG59XG5cbmRlZmluZShIc2wsIGhzbCwgZXh0ZW5kKENvbG9yLCB7XG4gIGJyaWdodGVyOiBmdW5jdGlvbihrKSB7XG4gICAgayA9IGsgPT0gbnVsbCA/IGJyaWdodGVyIDogTWF0aC5wb3coYnJpZ2h0ZXIsIGspO1xuICAgIHJldHVybiBuZXcgSHNsKHRoaXMuaCwgdGhpcy5zLCB0aGlzLmwgKiBrLCB0aGlzLm9wYWNpdHkpO1xuICB9LFxuICBkYXJrZXI6IGZ1bmN0aW9uKGspIHtcbiAgICBrID0gayA9PSBudWxsID8gZGFya2VyIDogTWF0aC5wb3coZGFya2VyLCBrKTtcbiAgICByZXR1cm4gbmV3IEhzbCh0aGlzLmgsIHRoaXMucywgdGhpcy5sICogaywgdGhpcy5vcGFjaXR5KTtcbiAgfSxcbiAgcmdiOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgaCA9IHRoaXMuaCAlIDM2MCArICh0aGlzLmggPCAwKSAqIDM2MCxcbiAgICAgICAgcyA9IGlzTmFOKGgpIHx8IGlzTmFOKHRoaXMucykgPyAwIDogdGhpcy5zLFxuICAgICAgICBsID0gdGhpcy5sLFxuICAgICAgICBtMiA9IGwgKyAobCA8IDAuNSA/IGwgOiAxIC0gbCkgKiBzLFxuICAgICAgICBtMSA9IDIgKiBsIC0gbTI7XG4gICAgcmV0dXJuIG5ldyBSZ2IoXG4gICAgICBoc2wycmdiKGggPj0gMjQwID8gaCAtIDI0MCA6IGggKyAxMjAsIG0xLCBtMiksXG4gICAgICBoc2wycmdiKGgsIG0xLCBtMiksXG4gICAgICBoc2wycmdiKGggPCAxMjAgPyBoICsgMjQwIDogaCAtIDEyMCwgbTEsIG0yKSxcbiAgICAgIHRoaXMub3BhY2l0eVxuICAgICk7XG4gIH0sXG4gIGRpc3BsYXlhYmxlOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gKDAgPD0gdGhpcy5zICYmIHRoaXMucyA8PSAxIHx8IGlzTmFOKHRoaXMucykpXG4gICAgICAgICYmICgwIDw9IHRoaXMubCAmJiB0aGlzLmwgPD0gMSlcbiAgICAgICAgJiYgKDAgPD0gdGhpcy5vcGFjaXR5ICYmIHRoaXMub3BhY2l0eSA8PSAxKTtcbiAgfSxcbiAgZm9ybWF0SHNsOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgYSA9IHRoaXMub3BhY2l0eTsgYSA9IGlzTmFOKGEpID8gMSA6IE1hdGgubWF4KDAsIE1hdGgubWluKDEsIGEpKTtcbiAgICByZXR1cm4gKGEgPT09IDEgPyBcImhzbChcIiA6IFwiaHNsYShcIilcbiAgICAgICAgKyAodGhpcy5oIHx8IDApICsgXCIsIFwiXG4gICAgICAgICsgKHRoaXMucyB8fCAwKSAqIDEwMCArIFwiJSwgXCJcbiAgICAgICAgKyAodGhpcy5sIHx8IDApICogMTAwICsgXCIlXCJcbiAgICAgICAgKyAoYSA9PT0gMSA/IFwiKVwiIDogXCIsIFwiICsgYSArIFwiKVwiKTtcbiAgfVxufSkpO1xuXG4vKiBGcm9tIEZ2RCAxMy4zNywgQ1NTIENvbG9yIE1vZHVsZSBMZXZlbCAzICovXG5mdW5jdGlvbiBoc2wycmdiKGgsIG0xLCBtMikge1xuICByZXR1cm4gKGggPCA2MCA/IG0xICsgKG0yIC0gbTEpICogaCAvIDYwXG4gICAgICA6IGggPCAxODAgPyBtMlxuICAgICAgOiBoIDwgMjQwID8gbTEgKyAobTIgLSBtMSkgKiAoMjQwIC0gaCkgLyA2MFxuICAgICAgOiBtMSkgKiAyNTU7XG59XG4iLCJpbXBvcnQgZGVmaW5lLCB7ZXh0ZW5kfSBmcm9tIFwiLi9kZWZpbmUuanNcIjtcbmltcG9ydCB7Q29sb3IsIHJnYkNvbnZlcnQsIFJnYiwgZGFya2VyLCBicmlnaHRlcn0gZnJvbSBcIi4vY29sb3IuanNcIjtcbmltcG9ydCB7ZGVnMnJhZCwgcmFkMmRlZ30gZnJvbSBcIi4vbWF0aC5qc1wiO1xuXG52YXIgQSA9IC0wLjE0ODYxLFxuICAgIEIgPSArMS43ODI3NyxcbiAgICBDID0gLTAuMjkyMjcsXG4gICAgRCA9IC0wLjkwNjQ5LFxuICAgIEUgPSArMS45NzI5NCxcbiAgICBFRCA9IEUgKiBELFxuICAgIEVCID0gRSAqIEIsXG4gICAgQkNfREEgPSBCICogQyAtIEQgKiBBO1xuXG5mdW5jdGlvbiBjdWJlaGVsaXhDb252ZXJ0KG8pIHtcbiAgaWYgKG8gaW5zdGFuY2VvZiBDdWJlaGVsaXgpIHJldHVybiBuZXcgQ3ViZWhlbGl4KG8uaCwgby5zLCBvLmwsIG8ub3BhY2l0eSk7XG4gIGlmICghKG8gaW5zdGFuY2VvZiBSZ2IpKSBvID0gcmdiQ29udmVydChvKTtcbiAgdmFyIHIgPSBvLnIgLyAyNTUsXG4gICAgICBnID0gby5nIC8gMjU1LFxuICAgICAgYiA9IG8uYiAvIDI1NSxcbiAgICAgIGwgPSAoQkNfREEgKiBiICsgRUQgKiByIC0gRUIgKiBnKSAvIChCQ19EQSArIEVEIC0gRUIpLFxuICAgICAgYmwgPSBiIC0gbCxcbiAgICAgIGsgPSAoRSAqIChnIC0gbCkgLSBDICogYmwpIC8gRCxcbiAgICAgIHMgPSBNYXRoLnNxcnQoayAqIGsgKyBibCAqIGJsKSAvIChFICogbCAqICgxIC0gbCkpLCAvLyBOYU4gaWYgbD0wIG9yIGw9MVxuICAgICAgaCA9IHMgPyBNYXRoLmF0YW4yKGssIGJsKSAqIHJhZDJkZWcgLSAxMjAgOiBOYU47XG4gIHJldHVybiBuZXcgQ3ViZWhlbGl4KGggPCAwID8gaCArIDM2MCA6IGgsIHMsIGwsIG8ub3BhY2l0eSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGN1YmVoZWxpeChoLCBzLCBsLCBvcGFjaXR5KSB7XG4gIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID09PSAxID8gY3ViZWhlbGl4Q29udmVydChoKSA6IG5ldyBDdWJlaGVsaXgoaCwgcywgbCwgb3BhY2l0eSA9PSBudWxsID8gMSA6IG9wYWNpdHkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gQ3ViZWhlbGl4KGgsIHMsIGwsIG9wYWNpdHkpIHtcbiAgdGhpcy5oID0gK2g7XG4gIHRoaXMucyA9ICtzO1xuICB0aGlzLmwgPSArbDtcbiAgdGhpcy5vcGFjaXR5ID0gK29wYWNpdHk7XG59XG5cbmRlZmluZShDdWJlaGVsaXgsIGN1YmVoZWxpeCwgZXh0ZW5kKENvbG9yLCB7XG4gIGJyaWdodGVyOiBmdW5jdGlvbihrKSB7XG4gICAgayA9IGsgPT0gbnVsbCA/IGJyaWdodGVyIDogTWF0aC5wb3coYnJpZ2h0ZXIsIGspO1xuICAgIHJldHVybiBuZXcgQ3ViZWhlbGl4KHRoaXMuaCwgdGhpcy5zLCB0aGlzLmwgKiBrLCB0aGlzLm9wYWNpdHkpO1xuICB9LFxuICBkYXJrZXI6IGZ1bmN0aW9uKGspIHtcbiAgICBrID0gayA9PSBudWxsID8gZGFya2VyIDogTWF0aC5wb3coZGFya2VyLCBrKTtcbiAgICByZXR1cm4gbmV3IEN1YmVoZWxpeCh0aGlzLmgsIHRoaXMucywgdGhpcy5sICogaywgdGhpcy5vcGFjaXR5KTtcbiAgfSxcbiAgcmdiOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgaCA9IGlzTmFOKHRoaXMuaCkgPyAwIDogKHRoaXMuaCArIDEyMCkgKiBkZWcycmFkLFxuICAgICAgICBsID0gK3RoaXMubCxcbiAgICAgICAgYSA9IGlzTmFOKHRoaXMucykgPyAwIDogdGhpcy5zICogbCAqICgxIC0gbCksXG4gICAgICAgIGNvc2ggPSBNYXRoLmNvcyhoKSxcbiAgICAgICAgc2luaCA9IE1hdGguc2luKGgpO1xuICAgIHJldHVybiBuZXcgUmdiKFxuICAgICAgMjU1ICogKGwgKyBhICogKEEgKiBjb3NoICsgQiAqIHNpbmgpKSxcbiAgICAgIDI1NSAqIChsICsgYSAqIChDICogY29zaCArIEQgKiBzaW5oKSksXG4gICAgICAyNTUgKiAobCArIGEgKiAoRSAqIGNvc2gpKSxcbiAgICAgIHRoaXMub3BhY2l0eVxuICAgICk7XG4gIH1cbn0pKTtcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGNvbnN0cnVjdG9yLCBmYWN0b3J5LCBwcm90b3R5cGUpIHtcbiAgY29uc3RydWN0b3IucHJvdG90eXBlID0gZmFjdG9yeS5wcm90b3R5cGUgPSBwcm90b3R5cGU7XG4gIHByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IGNvbnN0cnVjdG9yO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZXh0ZW5kKHBhcmVudCwgZGVmaW5pdGlvbikge1xuICB2YXIgcHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShwYXJlbnQucHJvdG90eXBlKTtcbiAgZm9yICh2YXIga2V5IGluIGRlZmluaXRpb24pIHByb3RvdHlwZVtrZXldID0gZGVmaW5pdGlvbltrZXldO1xuICByZXR1cm4gcHJvdG90eXBlO1xufVxuIiwiZXhwb3J0IHtkZWZhdWx0IGFzIGNvbG9yLCByZ2IsIGhzbH0gZnJvbSBcIi4vY29sb3IuanNcIjtcbmV4cG9ydCB7ZGVmYXVsdCBhcyBsYWIsIGhjbCwgbGNoLCBncmF5fSBmcm9tIFwiLi9sYWIuanNcIjtcbmV4cG9ydCB7ZGVmYXVsdCBhcyBjdWJlaGVsaXh9IGZyb20gXCIuL2N1YmVoZWxpeC5qc1wiO1xuIiwiaW1wb3J0IGRlZmluZSwge2V4dGVuZH0gZnJvbSBcIi4vZGVmaW5lLmpzXCI7XG5pbXBvcnQge0NvbG9yLCByZ2JDb252ZXJ0LCBSZ2J9IGZyb20gXCIuL2NvbG9yLmpzXCI7XG5pbXBvcnQge2RlZzJyYWQsIHJhZDJkZWd9IGZyb20gXCIuL21hdGguanNcIjtcblxuLy8gaHR0cHM6Ly9vYnNlcnZhYmxlaHEuY29tL0BtYm9zdG9jay9sYWItYW5kLXJnYlxudmFyIEsgPSAxOCxcbiAgICBYbiA9IDAuOTY0MjIsXG4gICAgWW4gPSAxLFxuICAgIFpuID0gMC44MjUyMSxcbiAgICB0MCA9IDQgLyAyOSxcbiAgICB0MSA9IDYgLyAyOSxcbiAgICB0MiA9IDMgKiB0MSAqIHQxLFxuICAgIHQzID0gdDEgKiB0MSAqIHQxO1xuXG5mdW5jdGlvbiBsYWJDb252ZXJ0KG8pIHtcbiAgaWYgKG8gaW5zdGFuY2VvZiBMYWIpIHJldHVybiBuZXcgTGFiKG8ubCwgby5hLCBvLmIsIG8ub3BhY2l0eSk7XG4gIGlmIChvIGluc3RhbmNlb2YgSGNsKSByZXR1cm4gaGNsMmxhYihvKTtcbiAgaWYgKCEobyBpbnN0YW5jZW9mIFJnYikpIG8gPSByZ2JDb252ZXJ0KG8pO1xuICB2YXIgciA9IHJnYjJscmdiKG8uciksXG4gICAgICBnID0gcmdiMmxyZ2Ioby5nKSxcbiAgICAgIGIgPSByZ2IybHJnYihvLmIpLFxuICAgICAgeSA9IHh5ejJsYWIoKDAuMjIyNTA0NSAqIHIgKyAwLjcxNjg3ODYgKiBnICsgMC4wNjA2MTY5ICogYikgLyBZbiksIHgsIHo7XG4gIGlmIChyID09PSBnICYmIGcgPT09IGIpIHggPSB6ID0geTsgZWxzZSB7XG4gICAgeCA9IHh5ejJsYWIoKDAuNDM2MDc0NyAqIHIgKyAwLjM4NTA2NDkgKiBnICsgMC4xNDMwODA0ICogYikgLyBYbik7XG4gICAgeiA9IHh5ejJsYWIoKDAuMDEzOTMyMiAqIHIgKyAwLjA5NzEwNDUgKiBnICsgMC43MTQxNzMzICogYikgLyBabik7XG4gIH1cbiAgcmV0dXJuIG5ldyBMYWIoMTE2ICogeSAtIDE2LCA1MDAgKiAoeCAtIHkpLCAyMDAgKiAoeSAtIHopLCBvLm9wYWNpdHkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ3JheShsLCBvcGFjaXR5KSB7XG4gIHJldHVybiBuZXcgTGFiKGwsIDAsIDAsIG9wYWNpdHkgPT0gbnVsbCA/IDEgOiBvcGFjaXR5KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbGFiKGwsIGEsIGIsIG9wYWNpdHkpIHtcbiAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPT09IDEgPyBsYWJDb252ZXJ0KGwpIDogbmV3IExhYihsLCBhLCBiLCBvcGFjaXR5ID09IG51bGwgPyAxIDogb3BhY2l0eSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBMYWIobCwgYSwgYiwgb3BhY2l0eSkge1xuICB0aGlzLmwgPSArbDtcbiAgdGhpcy5hID0gK2E7XG4gIHRoaXMuYiA9ICtiO1xuICB0aGlzLm9wYWNpdHkgPSArb3BhY2l0eTtcbn1cblxuZGVmaW5lKExhYiwgbGFiLCBleHRlbmQoQ29sb3IsIHtcbiAgYnJpZ2h0ZXI6IGZ1bmN0aW9uKGspIHtcbiAgICByZXR1cm4gbmV3IExhYih0aGlzLmwgKyBLICogKGsgPT0gbnVsbCA/IDEgOiBrKSwgdGhpcy5hLCB0aGlzLmIsIHRoaXMub3BhY2l0eSk7XG4gIH0sXG4gIGRhcmtlcjogZnVuY3Rpb24oaykge1xuICAgIHJldHVybiBuZXcgTGFiKHRoaXMubCAtIEsgKiAoayA9PSBudWxsID8gMSA6IGspLCB0aGlzLmEsIHRoaXMuYiwgdGhpcy5vcGFjaXR5KTtcbiAgfSxcbiAgcmdiOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgeSA9ICh0aGlzLmwgKyAxNikgLyAxMTYsXG4gICAgICAgIHggPSBpc05hTih0aGlzLmEpID8geSA6IHkgKyB0aGlzLmEgLyA1MDAsXG4gICAgICAgIHogPSBpc05hTih0aGlzLmIpID8geSA6IHkgLSB0aGlzLmIgLyAyMDA7XG4gICAgeCA9IFhuICogbGFiMnh5eih4KTtcbiAgICB5ID0gWW4gKiBsYWIyeHl6KHkpO1xuICAgIHogPSBabiAqIGxhYjJ4eXooeik7XG4gICAgcmV0dXJuIG5ldyBSZ2IoXG4gICAgICBscmdiMnJnYiggMy4xMzM4NTYxICogeCAtIDEuNjE2ODY2NyAqIHkgLSAwLjQ5MDYxNDYgKiB6KSxcbiAgICAgIGxyZ2IycmdiKC0wLjk3ODc2ODQgKiB4ICsgMS45MTYxNDE1ICogeSArIDAuMDMzNDU0MCAqIHopLFxuICAgICAgbHJnYjJyZ2IoIDAuMDcxOTQ1MyAqIHggLSAwLjIyODk5MTQgKiB5ICsgMS40MDUyNDI3ICogeiksXG4gICAgICB0aGlzLm9wYWNpdHlcbiAgICApO1xuICB9XG59KSk7XG5cbmZ1bmN0aW9uIHh5ejJsYWIodCkge1xuICByZXR1cm4gdCA+IHQzID8gTWF0aC5wb3codCwgMSAvIDMpIDogdCAvIHQyICsgdDA7XG59XG5cbmZ1bmN0aW9uIGxhYjJ4eXoodCkge1xuICByZXR1cm4gdCA+IHQxID8gdCAqIHQgKiB0IDogdDIgKiAodCAtIHQwKTtcbn1cblxuZnVuY3Rpb24gbHJnYjJyZ2IoeCkge1xuICByZXR1cm4gMjU1ICogKHggPD0gMC4wMDMxMzA4ID8gMTIuOTIgKiB4IDogMS4wNTUgKiBNYXRoLnBvdyh4LCAxIC8gMi40KSAtIDAuMDU1KTtcbn1cblxuZnVuY3Rpb24gcmdiMmxyZ2IoeCkge1xuICByZXR1cm4gKHggLz0gMjU1KSA8PSAwLjA0MDQ1ID8geCAvIDEyLjkyIDogTWF0aC5wb3coKHggKyAwLjA1NSkgLyAxLjA1NSwgMi40KTtcbn1cblxuZnVuY3Rpb24gaGNsQ29udmVydChvKSB7XG4gIGlmIChvIGluc3RhbmNlb2YgSGNsKSByZXR1cm4gbmV3IEhjbChvLmgsIG8uYywgby5sLCBvLm9wYWNpdHkpO1xuICBpZiAoIShvIGluc3RhbmNlb2YgTGFiKSkgbyA9IGxhYkNvbnZlcnQobyk7XG4gIGlmIChvLmEgPT09IDAgJiYgby5iID09PSAwKSByZXR1cm4gbmV3IEhjbChOYU4sIDAgPCBvLmwgJiYgby5sIDwgMTAwID8gMCA6IE5hTiwgby5sLCBvLm9wYWNpdHkpO1xuICB2YXIgaCA9IE1hdGguYXRhbjIoby5iLCBvLmEpICogcmFkMmRlZztcbiAgcmV0dXJuIG5ldyBIY2woaCA8IDAgPyBoICsgMzYwIDogaCwgTWF0aC5zcXJ0KG8uYSAqIG8uYSArIG8uYiAqIG8uYiksIG8ubCwgby5vcGFjaXR5KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxjaChsLCBjLCBoLCBvcGFjaXR5KSB7XG4gIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID09PSAxID8gaGNsQ29udmVydChsKSA6IG5ldyBIY2woaCwgYywgbCwgb3BhY2l0eSA9PSBudWxsID8gMSA6IG9wYWNpdHkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaGNsKGgsIGMsIGwsIG9wYWNpdHkpIHtcbiAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPT09IDEgPyBoY2xDb252ZXJ0KGgpIDogbmV3IEhjbChoLCBjLCBsLCBvcGFjaXR5ID09IG51bGwgPyAxIDogb3BhY2l0eSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBIY2woaCwgYywgbCwgb3BhY2l0eSkge1xuICB0aGlzLmggPSAraDtcbiAgdGhpcy5jID0gK2M7XG4gIHRoaXMubCA9ICtsO1xuICB0aGlzLm9wYWNpdHkgPSArb3BhY2l0eTtcbn1cblxuZnVuY3Rpb24gaGNsMmxhYihvKSB7XG4gIGlmIChpc05hTihvLmgpKSByZXR1cm4gbmV3IExhYihvLmwsIDAsIDAsIG8ub3BhY2l0eSk7XG4gIHZhciBoID0gby5oICogZGVnMnJhZDtcbiAgcmV0dXJuIG5ldyBMYWIoby5sLCBNYXRoLmNvcyhoKSAqIG8uYywgTWF0aC5zaW4oaCkgKiBvLmMsIG8ub3BhY2l0eSk7XG59XG5cbmRlZmluZShIY2wsIGhjbCwgZXh0ZW5kKENvbG9yLCB7XG4gIGJyaWdodGVyOiBmdW5jdGlvbihrKSB7XG4gICAgcmV0dXJuIG5ldyBIY2wodGhpcy5oLCB0aGlzLmMsIHRoaXMubCArIEsgKiAoayA9PSBudWxsID8gMSA6IGspLCB0aGlzLm9wYWNpdHkpO1xuICB9LFxuICBkYXJrZXI6IGZ1bmN0aW9uKGspIHtcbiAgICByZXR1cm4gbmV3IEhjbCh0aGlzLmgsIHRoaXMuYywgdGhpcy5sIC0gSyAqIChrID09IG51bGwgPyAxIDogayksIHRoaXMub3BhY2l0eSk7XG4gIH0sXG4gIHJnYjogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGhjbDJsYWIodGhpcykucmdiKCk7XG4gIH1cbn0pKTtcbiIsImV4cG9ydCB2YXIgZGVnMnJhZCA9IE1hdGguUEkgLyAxODA7XG5leHBvcnQgdmFyIHJhZDJkZWcgPSAxODAgLyBNYXRoLlBJO1xuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXV0b1R5cGUob2JqZWN0KSB7XG4gIGZvciAodmFyIGtleSBpbiBvYmplY3QpIHtcbiAgICB2YXIgdmFsdWUgPSBvYmplY3Rba2V5XS50cmltKCksIG51bWJlciwgbTtcbiAgICBpZiAoIXZhbHVlKSB2YWx1ZSA9IG51bGw7XG4gICAgZWxzZSBpZiAodmFsdWUgPT09IFwidHJ1ZVwiKSB2YWx1ZSA9IHRydWU7XG4gICAgZWxzZSBpZiAodmFsdWUgPT09IFwiZmFsc2VcIikgdmFsdWUgPSBmYWxzZTtcbiAgICBlbHNlIGlmICh2YWx1ZSA9PT0gXCJOYU5cIikgdmFsdWUgPSBOYU47XG4gICAgZWxzZSBpZiAoIWlzTmFOKG51bWJlciA9ICt2YWx1ZSkpIHZhbHVlID0gbnVtYmVyO1xuICAgIGVsc2UgaWYgKG0gPSB2YWx1ZS5tYXRjaCgvXihbLStdXFxkezJ9KT9cXGR7NH0oLVxcZHsyfSgtXFxkezJ9KT8pPyhUXFxkezJ9OlxcZHsyfSg6XFxkezJ9KFxcLlxcZHszfSk/KT8oWnxbLStdXFxkezJ9OlxcZHsyfSk/KT8kLykpIHtcbiAgICAgIGlmIChmaXh0eiAmJiAhIW1bNF0gJiYgIW1bN10pIHZhbHVlID0gdmFsdWUucmVwbGFjZSgvLS9nLCBcIi9cIikucmVwbGFjZSgvVC8sIFwiIFwiKTtcbiAgICAgIHZhbHVlID0gbmV3IERhdGUodmFsdWUpO1xuICAgIH1cbiAgICBlbHNlIGNvbnRpbnVlO1xuICAgIG9iamVjdFtrZXldID0gdmFsdWU7XG4gIH1cbiAgcmV0dXJuIG9iamVjdDtcbn1cblxuLy8gaHR0cHM6Ly9naXRodWIuY29tL2QzL2QzLWRzdi9pc3N1ZXMvNDVcbnZhciBmaXh0eiA9IG5ldyBEYXRlKFwiMjAxOS0wMS0wMVQwMDowMFwiKS5nZXRIb3VycygpIHx8IG5ldyBEYXRlKFwiMjAxOS0wNy0wMVQwMDowMFwiKS5nZXRIb3VycygpOyIsImltcG9ydCBkc3YgZnJvbSBcIi4vZHN2LmpzXCI7XG5cbnZhciBjc3YgPSBkc3YoXCIsXCIpO1xuXG5leHBvcnQgdmFyIGNzdlBhcnNlID0gY3N2LnBhcnNlO1xuZXhwb3J0IHZhciBjc3ZQYXJzZVJvd3MgPSBjc3YucGFyc2VSb3dzO1xuZXhwb3J0IHZhciBjc3ZGb3JtYXQgPSBjc3YuZm9ybWF0O1xuZXhwb3J0IHZhciBjc3ZGb3JtYXRCb2R5ID0gY3N2LmZvcm1hdEJvZHk7XG5leHBvcnQgdmFyIGNzdkZvcm1hdFJvd3MgPSBjc3YuZm9ybWF0Um93cztcbmV4cG9ydCB2YXIgY3N2Rm9ybWF0Um93ID0gY3N2LmZvcm1hdFJvdztcbmV4cG9ydCB2YXIgY3N2Rm9ybWF0VmFsdWUgPSBjc3YuZm9ybWF0VmFsdWU7XG4iLCJ2YXIgRU9MID0ge30sXG4gICAgRU9GID0ge30sXG4gICAgUVVPVEUgPSAzNCxcbiAgICBORVdMSU5FID0gMTAsXG4gICAgUkVUVVJOID0gMTM7XG5cbmZ1bmN0aW9uIG9iamVjdENvbnZlcnRlcihjb2x1bW5zKSB7XG4gIHJldHVybiBuZXcgRnVuY3Rpb24oXCJkXCIsIFwicmV0dXJuIHtcIiArIGNvbHVtbnMubWFwKGZ1bmN0aW9uKG5hbWUsIGkpIHtcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkobmFtZSkgKyBcIjogZFtcIiArIGkgKyBcIl0gfHwgXFxcIlxcXCJcIjtcbiAgfSkuam9pbihcIixcIikgKyBcIn1cIik7XG59XG5cbmZ1bmN0aW9uIGN1c3RvbUNvbnZlcnRlcihjb2x1bW5zLCBmKSB7XG4gIHZhciBvYmplY3QgPSBvYmplY3RDb252ZXJ0ZXIoY29sdW1ucyk7XG4gIHJldHVybiBmdW5jdGlvbihyb3csIGkpIHtcbiAgICByZXR1cm4gZihvYmplY3Qocm93KSwgaSwgY29sdW1ucyk7XG4gIH07XG59XG5cbi8vIENvbXB1dGUgdW5pcXVlIGNvbHVtbnMgaW4gb3JkZXIgb2YgZGlzY292ZXJ5LlxuZnVuY3Rpb24gaW5mZXJDb2x1bW5zKHJvd3MpIHtcbiAgdmFyIGNvbHVtblNldCA9IE9iamVjdC5jcmVhdGUobnVsbCksXG4gICAgICBjb2x1bW5zID0gW107XG5cbiAgcm93cy5mb3JFYWNoKGZ1bmN0aW9uKHJvdykge1xuICAgIGZvciAodmFyIGNvbHVtbiBpbiByb3cpIHtcbiAgICAgIGlmICghKGNvbHVtbiBpbiBjb2x1bW5TZXQpKSB7XG4gICAgICAgIGNvbHVtbnMucHVzaChjb2x1bW5TZXRbY29sdW1uXSA9IGNvbHVtbik7XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gY29sdW1ucztcbn1cblxuZnVuY3Rpb24gcGFkKHZhbHVlLCB3aWR0aCkge1xuICB2YXIgcyA9IHZhbHVlICsgXCJcIiwgbGVuZ3RoID0gcy5sZW5ndGg7XG4gIHJldHVybiBsZW5ndGggPCB3aWR0aCA/IG5ldyBBcnJheSh3aWR0aCAtIGxlbmd0aCArIDEpLmpvaW4oMCkgKyBzIDogcztcbn1cblxuZnVuY3Rpb24gZm9ybWF0WWVhcih5ZWFyKSB7XG4gIHJldHVybiB5ZWFyIDwgMCA/IFwiLVwiICsgcGFkKC15ZWFyLCA2KVxuICAgIDogeWVhciA+IDk5OTkgPyBcIitcIiArIHBhZCh5ZWFyLCA2KVxuICAgIDogcGFkKHllYXIsIDQpO1xufVxuXG5mdW5jdGlvbiBmb3JtYXREYXRlKGRhdGUpIHtcbiAgdmFyIGhvdXJzID0gZGF0ZS5nZXRVVENIb3VycygpLFxuICAgICAgbWludXRlcyA9IGRhdGUuZ2V0VVRDTWludXRlcygpLFxuICAgICAgc2Vjb25kcyA9IGRhdGUuZ2V0VVRDU2Vjb25kcygpLFxuICAgICAgbWlsbGlzZWNvbmRzID0gZGF0ZS5nZXRVVENNaWxsaXNlY29uZHMoKTtcbiAgcmV0dXJuIGlzTmFOKGRhdGUpID8gXCJJbnZhbGlkIERhdGVcIlxuICAgICAgOiBmb3JtYXRZZWFyKGRhdGUuZ2V0VVRDRnVsbFllYXIoKSwgNCkgKyBcIi1cIiArIHBhZChkYXRlLmdldFVUQ01vbnRoKCkgKyAxLCAyKSArIFwiLVwiICsgcGFkKGRhdGUuZ2V0VVRDRGF0ZSgpLCAyKVxuICAgICAgKyAobWlsbGlzZWNvbmRzID8gXCJUXCIgKyBwYWQoaG91cnMsIDIpICsgXCI6XCIgKyBwYWQobWludXRlcywgMikgKyBcIjpcIiArIHBhZChzZWNvbmRzLCAyKSArIFwiLlwiICsgcGFkKG1pbGxpc2Vjb25kcywgMykgKyBcIlpcIlxuICAgICAgOiBzZWNvbmRzID8gXCJUXCIgKyBwYWQoaG91cnMsIDIpICsgXCI6XCIgKyBwYWQobWludXRlcywgMikgKyBcIjpcIiArIHBhZChzZWNvbmRzLCAyKSArIFwiWlwiXG4gICAgICA6IG1pbnV0ZXMgfHwgaG91cnMgPyBcIlRcIiArIHBhZChob3VycywgMikgKyBcIjpcIiArIHBhZChtaW51dGVzLCAyKSArIFwiWlwiXG4gICAgICA6IFwiXCIpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihkZWxpbWl0ZXIpIHtcbiAgdmFyIHJlRm9ybWF0ID0gbmV3IFJlZ0V4cChcIltcXFwiXCIgKyBkZWxpbWl0ZXIgKyBcIlxcblxccl1cIiksXG4gICAgICBERUxJTUlURVIgPSBkZWxpbWl0ZXIuY2hhckNvZGVBdCgwKTtcblxuICBmdW5jdGlvbiBwYXJzZSh0ZXh0LCBmKSB7XG4gICAgdmFyIGNvbnZlcnQsIGNvbHVtbnMsIHJvd3MgPSBwYXJzZVJvd3ModGV4dCwgZnVuY3Rpb24ocm93LCBpKSB7XG4gICAgICBpZiAoY29udmVydCkgcmV0dXJuIGNvbnZlcnQocm93LCBpIC0gMSk7XG4gICAgICBjb2x1bW5zID0gcm93LCBjb252ZXJ0ID0gZiA/IGN1c3RvbUNvbnZlcnRlcihyb3csIGYpIDogb2JqZWN0Q29udmVydGVyKHJvdyk7XG4gICAgfSk7XG4gICAgcm93cy5jb2x1bW5zID0gY29sdW1ucyB8fCBbXTtcbiAgICByZXR1cm4gcm93cztcbiAgfVxuXG4gIGZ1bmN0aW9uIHBhcnNlUm93cyh0ZXh0LCBmKSB7XG4gICAgdmFyIHJvd3MgPSBbXSwgLy8gb3V0cHV0IHJvd3NcbiAgICAgICAgTiA9IHRleHQubGVuZ3RoLFxuICAgICAgICBJID0gMCwgLy8gY3VycmVudCBjaGFyYWN0ZXIgaW5kZXhcbiAgICAgICAgbiA9IDAsIC8vIGN1cnJlbnQgbGluZSBudW1iZXJcbiAgICAgICAgdCwgLy8gY3VycmVudCB0b2tlblxuICAgICAgICBlb2YgPSBOIDw9IDAsIC8vIGN1cnJlbnQgdG9rZW4gZm9sbG93ZWQgYnkgRU9GP1xuICAgICAgICBlb2wgPSBmYWxzZTsgLy8gY3VycmVudCB0b2tlbiBmb2xsb3dlZCBieSBFT0w/XG5cbiAgICAvLyBTdHJpcCB0aGUgdHJhaWxpbmcgbmV3bGluZS5cbiAgICBpZiAodGV4dC5jaGFyQ29kZUF0KE4gLSAxKSA9PT0gTkVXTElORSkgLS1OO1xuICAgIGlmICh0ZXh0LmNoYXJDb2RlQXQoTiAtIDEpID09PSBSRVRVUk4pIC0tTjtcblxuICAgIGZ1bmN0aW9uIHRva2VuKCkge1xuICAgICAgaWYgKGVvZikgcmV0dXJuIEVPRjtcbiAgICAgIGlmIChlb2wpIHJldHVybiBlb2wgPSBmYWxzZSwgRU9MO1xuXG4gICAgICAvLyBVbmVzY2FwZSBxdW90ZXMuXG4gICAgICB2YXIgaSwgaiA9IEksIGM7XG4gICAgICBpZiAodGV4dC5jaGFyQ29kZUF0KGopID09PSBRVU9URSkge1xuICAgICAgICB3aGlsZSAoSSsrIDwgTiAmJiB0ZXh0LmNoYXJDb2RlQXQoSSkgIT09IFFVT1RFIHx8IHRleHQuY2hhckNvZGVBdCgrK0kpID09PSBRVU9URSk7XG4gICAgICAgIGlmICgoaSA9IEkpID49IE4pIGVvZiA9IHRydWU7XG4gICAgICAgIGVsc2UgaWYgKChjID0gdGV4dC5jaGFyQ29kZUF0KEkrKykpID09PSBORVdMSU5FKSBlb2wgPSB0cnVlO1xuICAgICAgICBlbHNlIGlmIChjID09PSBSRVRVUk4pIHsgZW9sID0gdHJ1ZTsgaWYgKHRleHQuY2hhckNvZGVBdChJKSA9PT0gTkVXTElORSkgKytJOyB9XG4gICAgICAgIHJldHVybiB0ZXh0LnNsaWNlKGogKyAxLCBpIC0gMSkucmVwbGFjZSgvXCJcIi9nLCBcIlxcXCJcIik7XG4gICAgICB9XG5cbiAgICAgIC8vIEZpbmQgbmV4dCBkZWxpbWl0ZXIgb3IgbmV3bGluZS5cbiAgICAgIHdoaWxlIChJIDwgTikge1xuICAgICAgICBpZiAoKGMgPSB0ZXh0LmNoYXJDb2RlQXQoaSA9IEkrKykpID09PSBORVdMSU5FKSBlb2wgPSB0cnVlO1xuICAgICAgICBlbHNlIGlmIChjID09PSBSRVRVUk4pIHsgZW9sID0gdHJ1ZTsgaWYgKHRleHQuY2hhckNvZGVBdChJKSA9PT0gTkVXTElORSkgKytJOyB9XG4gICAgICAgIGVsc2UgaWYgKGMgIT09IERFTElNSVRFUikgY29udGludWU7XG4gICAgICAgIHJldHVybiB0ZXh0LnNsaWNlKGosIGkpO1xuICAgICAgfVxuXG4gICAgICAvLyBSZXR1cm4gbGFzdCB0b2tlbiBiZWZvcmUgRU9GLlxuICAgICAgcmV0dXJuIGVvZiA9IHRydWUsIHRleHQuc2xpY2UoaiwgTik7XG4gICAgfVxuXG4gICAgd2hpbGUgKCh0ID0gdG9rZW4oKSkgIT09IEVPRikge1xuICAgICAgdmFyIHJvdyA9IFtdO1xuICAgICAgd2hpbGUgKHQgIT09IEVPTCAmJiB0ICE9PSBFT0YpIHJvdy5wdXNoKHQpLCB0ID0gdG9rZW4oKTtcbiAgICAgIGlmIChmICYmIChyb3cgPSBmKHJvdywgbisrKSkgPT0gbnVsbCkgY29udGludWU7XG4gICAgICByb3dzLnB1c2gocm93KTtcbiAgICB9XG5cbiAgICByZXR1cm4gcm93cztcbiAgfVxuXG4gIGZ1bmN0aW9uIHByZWZvcm1hdEJvZHkocm93cywgY29sdW1ucykge1xuICAgIHJldHVybiByb3dzLm1hcChmdW5jdGlvbihyb3cpIHtcbiAgICAgIHJldHVybiBjb2x1bW5zLm1hcChmdW5jdGlvbihjb2x1bW4pIHtcbiAgICAgICAgcmV0dXJuIGZvcm1hdFZhbHVlKHJvd1tjb2x1bW5dKTtcbiAgICAgIH0pLmpvaW4oZGVsaW1pdGVyKTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZvcm1hdChyb3dzLCBjb2x1bW5zKSB7XG4gICAgaWYgKGNvbHVtbnMgPT0gbnVsbCkgY29sdW1ucyA9IGluZmVyQ29sdW1ucyhyb3dzKTtcbiAgICByZXR1cm4gW2NvbHVtbnMubWFwKGZvcm1hdFZhbHVlKS5qb2luKGRlbGltaXRlcildLmNvbmNhdChwcmVmb3JtYXRCb2R5KHJvd3MsIGNvbHVtbnMpKS5qb2luKFwiXFxuXCIpO1xuICB9XG5cbiAgZnVuY3Rpb24gZm9ybWF0Qm9keShyb3dzLCBjb2x1bW5zKSB7XG4gICAgaWYgKGNvbHVtbnMgPT0gbnVsbCkgY29sdW1ucyA9IGluZmVyQ29sdW1ucyhyb3dzKTtcbiAgICByZXR1cm4gcHJlZm9ybWF0Qm9keShyb3dzLCBjb2x1bW5zKS5qb2luKFwiXFxuXCIpO1xuICB9XG5cbiAgZnVuY3Rpb24gZm9ybWF0Um93cyhyb3dzKSB7XG4gICAgcmV0dXJuIHJvd3MubWFwKGZvcm1hdFJvdykuam9pbihcIlxcblwiKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZvcm1hdFJvdyhyb3cpIHtcbiAgICByZXR1cm4gcm93Lm1hcChmb3JtYXRWYWx1ZSkuam9pbihkZWxpbWl0ZXIpO1xuICB9XG5cbiAgZnVuY3Rpb24gZm9ybWF0VmFsdWUodmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUgPT0gbnVsbCA/IFwiXCJcbiAgICAgICAgOiB2YWx1ZSBpbnN0YW5jZW9mIERhdGUgPyBmb3JtYXREYXRlKHZhbHVlKVxuICAgICAgICA6IHJlRm9ybWF0LnRlc3QodmFsdWUgKz0gXCJcIikgPyBcIlxcXCJcIiArIHZhbHVlLnJlcGxhY2UoL1wiL2csIFwiXFxcIlxcXCJcIikgKyBcIlxcXCJcIlxuICAgICAgICA6IHZhbHVlO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBwYXJzZTogcGFyc2UsXG4gICAgcGFyc2VSb3dzOiBwYXJzZVJvd3MsXG4gICAgZm9ybWF0OiBmb3JtYXQsXG4gICAgZm9ybWF0Qm9keTogZm9ybWF0Qm9keSxcbiAgICBmb3JtYXRSb3dzOiBmb3JtYXRSb3dzLFxuICAgIGZvcm1hdFJvdzogZm9ybWF0Um93LFxuICAgIGZvcm1hdFZhbHVlOiBmb3JtYXRWYWx1ZVxuICB9O1xufVxuIiwiZXhwb3J0IHtkZWZhdWx0IGFzIGRzdkZvcm1hdH0gZnJvbSBcIi4vZHN2LmpzXCI7XG5leHBvcnQge2NzdlBhcnNlLCBjc3ZQYXJzZVJvd3MsIGNzdkZvcm1hdCwgY3N2Rm9ybWF0Qm9keSwgY3N2Rm9ybWF0Um93cywgY3N2Rm9ybWF0Um93LCBjc3ZGb3JtYXRWYWx1ZX0gZnJvbSBcIi4vY3N2LmpzXCI7XG5leHBvcnQge3RzdlBhcnNlLCB0c3ZQYXJzZVJvd3MsIHRzdkZvcm1hdCwgdHN2Rm9ybWF0Qm9keSwgdHN2Rm9ybWF0Um93cywgdHN2Rm9ybWF0Um93LCB0c3ZGb3JtYXRWYWx1ZX0gZnJvbSBcIi4vdHN2LmpzXCI7XG5leHBvcnQge2RlZmF1bHQgYXMgYXV0b1R5cGV9IGZyb20gXCIuL2F1dG9UeXBlLmpzXCI7XG4iLCJpbXBvcnQgZHN2IGZyb20gXCIuL2Rzdi5qc1wiO1xuXG52YXIgdHN2ID0gZHN2KFwiXFx0XCIpO1xuXG5leHBvcnQgdmFyIHRzdlBhcnNlID0gdHN2LnBhcnNlO1xuZXhwb3J0IHZhciB0c3ZQYXJzZVJvd3MgPSB0c3YucGFyc2VSb3dzO1xuZXhwb3J0IHZhciB0c3ZGb3JtYXQgPSB0c3YuZm9ybWF0O1xuZXhwb3J0IHZhciB0c3ZGb3JtYXRCb2R5ID0gdHN2LmZvcm1hdEJvZHk7XG5leHBvcnQgdmFyIHRzdkZvcm1hdFJvd3MgPSB0c3YuZm9ybWF0Um93cztcbmV4cG9ydCB2YXIgdHN2Rm9ybWF0Um93ID0gdHN2LmZvcm1hdFJvdztcbmV4cG9ydCB2YXIgdHN2Rm9ybWF0VmFsdWUgPSB0c3YuZm9ybWF0VmFsdWU7XG4iLCJmdW5jdGlvbiByZXNwb25zZUJsb2IocmVzcG9uc2UpIHtcbiAgaWYgKCFyZXNwb25zZS5vaykgdGhyb3cgbmV3IEVycm9yKHJlc3BvbnNlLnN0YXR1cyArIFwiIFwiICsgcmVzcG9uc2Uuc3RhdHVzVGV4dCk7XG4gIHJldHVybiByZXNwb25zZS5ibG9iKCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGlucHV0LCBpbml0KSB7XG4gIHJldHVybiBmZXRjaChpbnB1dCwgaW5pdCkudGhlbihyZXNwb25zZUJsb2IpO1xufVxuIiwiZnVuY3Rpb24gcmVzcG9uc2VBcnJheUJ1ZmZlcihyZXNwb25zZSkge1xuICBpZiAoIXJlc3BvbnNlLm9rKSB0aHJvdyBuZXcgRXJyb3IocmVzcG9uc2Uuc3RhdHVzICsgXCIgXCIgKyByZXNwb25zZS5zdGF0dXNUZXh0KTtcbiAgcmV0dXJuIHJlc3BvbnNlLmFycmF5QnVmZmVyKCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGlucHV0LCBpbml0KSB7XG4gIHJldHVybiBmZXRjaChpbnB1dCwgaW5pdCkudGhlbihyZXNwb25zZUFycmF5QnVmZmVyKTtcbn1cbiIsImltcG9ydCB7Y3N2UGFyc2UsIGRzdkZvcm1hdCwgdHN2UGFyc2V9IGZyb20gXCJkMy1kc3ZcIjtcbmltcG9ydCB0ZXh0IGZyb20gXCIuL3RleHQuanNcIjtcblxuZnVuY3Rpb24gZHN2UGFyc2UocGFyc2UpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKGlucHV0LCBpbml0LCByb3cpIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMiAmJiB0eXBlb2YgaW5pdCA9PT0gXCJmdW5jdGlvblwiKSByb3cgPSBpbml0LCBpbml0ID0gdW5kZWZpbmVkO1xuICAgIHJldHVybiB0ZXh0KGlucHV0LCBpbml0KS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICByZXR1cm4gcGFyc2UocmVzcG9uc2UsIHJvdyk7XG4gICAgfSk7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGRzdihkZWxpbWl0ZXIsIGlucHV0LCBpbml0LCByb3cpIHtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDMgJiYgdHlwZW9mIGluaXQgPT09IFwiZnVuY3Rpb25cIikgcm93ID0gaW5pdCwgaW5pdCA9IHVuZGVmaW5lZDtcbiAgdmFyIGZvcm1hdCA9IGRzdkZvcm1hdChkZWxpbWl0ZXIpO1xuICByZXR1cm4gdGV4dChpbnB1dCwgaW5pdCkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgIHJldHVybiBmb3JtYXQucGFyc2UocmVzcG9uc2UsIHJvdyk7XG4gIH0pO1xufVxuXG5leHBvcnQgdmFyIGNzdiA9IGRzdlBhcnNlKGNzdlBhcnNlKTtcbmV4cG9ydCB2YXIgdHN2ID0gZHN2UGFyc2UodHN2UGFyc2UpO1xuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oaW5wdXQsIGluaXQpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgIHZhciBpbWFnZSA9IG5ldyBJbWFnZTtcbiAgICBmb3IgKHZhciBrZXkgaW4gaW5pdCkgaW1hZ2Vba2V5XSA9IGluaXRba2V5XTtcbiAgICBpbWFnZS5vbmVycm9yID0gcmVqZWN0O1xuICAgIGltYWdlLm9ubG9hZCA9IGZ1bmN0aW9uKCkgeyByZXNvbHZlKGltYWdlKTsgfTtcbiAgICBpbWFnZS5zcmMgPSBpbnB1dDtcbiAgfSk7XG59XG4iLCJleHBvcnQge2RlZmF1bHQgYXMgYmxvYn0gZnJvbSBcIi4vYmxvYi5qc1wiO1xuZXhwb3J0IHtkZWZhdWx0IGFzIGJ1ZmZlcn0gZnJvbSBcIi4vYnVmZmVyLmpzXCI7XG5leHBvcnQge2RlZmF1bHQgYXMgZHN2LCBjc3YsIHRzdn0gZnJvbSBcIi4vZHN2LmpzXCI7XG5leHBvcnQge2RlZmF1bHQgYXMgaW1hZ2V9IGZyb20gXCIuL2ltYWdlLmpzXCI7XG5leHBvcnQge2RlZmF1bHQgYXMganNvbn0gZnJvbSBcIi4vanNvbi5qc1wiO1xuZXhwb3J0IHtkZWZhdWx0IGFzIHRleHR9IGZyb20gXCIuL3RleHQuanNcIjtcbmV4cG9ydCB7ZGVmYXVsdCBhcyB4bWwsIGh0bWwsIHN2Z30gZnJvbSBcIi4veG1sLmpzXCI7XG4iLCJmdW5jdGlvbiByZXNwb25zZUpzb24ocmVzcG9uc2UpIHtcbiAgaWYgKCFyZXNwb25zZS5vaykgdGhyb3cgbmV3IEVycm9yKHJlc3BvbnNlLnN0YXR1cyArIFwiIFwiICsgcmVzcG9uc2Uuc3RhdHVzVGV4dCk7XG4gIGlmIChyZXNwb25zZS5zdGF0dXMgPT09IDIwNCB8fCByZXNwb25zZS5zdGF0dXMgPT09IDIwNSkgcmV0dXJuO1xuICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihpbnB1dCwgaW5pdCkge1xuICByZXR1cm4gZmV0Y2goaW5wdXQsIGluaXQpLnRoZW4ocmVzcG9uc2VKc29uKTtcbn1cbiIsImZ1bmN0aW9uIHJlc3BvbnNlVGV4dChyZXNwb25zZSkge1xuICBpZiAoIXJlc3BvbnNlLm9rKSB0aHJvdyBuZXcgRXJyb3IocmVzcG9uc2Uuc3RhdHVzICsgXCIgXCIgKyByZXNwb25zZS5zdGF0dXNUZXh0KTtcbiAgcmV0dXJuIHJlc3BvbnNlLnRleHQoKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oaW5wdXQsIGluaXQpIHtcbiAgcmV0dXJuIGZldGNoKGlucHV0LCBpbml0KS50aGVuKHJlc3BvbnNlVGV4dCk7XG59XG4iLCJpbXBvcnQgdGV4dCBmcm9tIFwiLi90ZXh0LmpzXCI7XG5cbmZ1bmN0aW9uIHBhcnNlcih0eXBlKSB7XG4gIHJldHVybiBmdW5jdGlvbihpbnB1dCwgaW5pdCkgIHtcbiAgICByZXR1cm4gdGV4dChpbnB1dCwgaW5pdCkudGhlbihmdW5jdGlvbih0ZXh0KSB7XG4gICAgICByZXR1cm4gKG5ldyBET01QYXJzZXIpLnBhcnNlRnJvbVN0cmluZyh0ZXh0LCB0eXBlKTtcbiAgICB9KTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgcGFyc2VyKFwiYXBwbGljYXRpb24veG1sXCIpO1xuXG5leHBvcnQgdmFyIGh0bWwgPSBwYXJzZXIoXCJ0ZXh0L2h0bWxcIik7XG5cbmV4cG9ydCB2YXIgc3ZnID0gcGFyc2VyKFwiaW1hZ2Uvc3ZnK3htbFwiKTtcbiIsImltcG9ydCB2YWx1ZSBmcm9tIFwiLi92YWx1ZS5qc1wiO1xuaW1wb3J0IG51bWJlckFycmF5LCB7aXNOdW1iZXJBcnJheX0gZnJvbSBcIi4vbnVtYmVyQXJyYXkuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oYSwgYikge1xuICByZXR1cm4gKGlzTnVtYmVyQXJyYXkoYikgPyBudW1iZXJBcnJheSA6IGdlbmVyaWNBcnJheSkoYSwgYik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmljQXJyYXkoYSwgYikge1xuICB2YXIgbmIgPSBiID8gYi5sZW5ndGggOiAwLFxuICAgICAgbmEgPSBhID8gTWF0aC5taW4obmIsIGEubGVuZ3RoKSA6IDAsXG4gICAgICB4ID0gbmV3IEFycmF5KG5hKSxcbiAgICAgIGMgPSBuZXcgQXJyYXkobmIpLFxuICAgICAgaTtcblxuICBmb3IgKGkgPSAwOyBpIDwgbmE7ICsraSkgeFtpXSA9IHZhbHVlKGFbaV0sIGJbaV0pO1xuICBmb3IgKDsgaSA8IG5iOyArK2kpIGNbaV0gPSBiW2ldO1xuXG4gIHJldHVybiBmdW5jdGlvbih0KSB7XG4gICAgZm9yIChpID0gMDsgaSA8IG5hOyArK2kpIGNbaV0gPSB4W2ldKHQpO1xuICAgIHJldHVybiBjO1xuICB9O1xufVxuIiwiZXhwb3J0IGZ1bmN0aW9uIGJhc2lzKHQxLCB2MCwgdjEsIHYyLCB2Mykge1xuICB2YXIgdDIgPSB0MSAqIHQxLCB0MyA9IHQyICogdDE7XG4gIHJldHVybiAoKDEgLSAzICogdDEgKyAzICogdDIgLSB0MykgKiB2MFxuICAgICAgKyAoNCAtIDYgKiB0MiArIDMgKiB0MykgKiB2MVxuICAgICAgKyAoMSArIDMgKiB0MSArIDMgKiB0MiAtIDMgKiB0MykgKiB2MlxuICAgICAgKyB0MyAqIHYzKSAvIDY7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHZhbHVlcykge1xuICB2YXIgbiA9IHZhbHVlcy5sZW5ndGggLSAxO1xuICByZXR1cm4gZnVuY3Rpb24odCkge1xuICAgIHZhciBpID0gdCA8PSAwID8gKHQgPSAwKSA6IHQgPj0gMSA/ICh0ID0gMSwgbiAtIDEpIDogTWF0aC5mbG9vcih0ICogbiksXG4gICAgICAgIHYxID0gdmFsdWVzW2ldLFxuICAgICAgICB2MiA9IHZhbHVlc1tpICsgMV0sXG4gICAgICAgIHYwID0gaSA+IDAgPyB2YWx1ZXNbaSAtIDFdIDogMiAqIHYxIC0gdjIsXG4gICAgICAgIHYzID0gaSA8IG4gLSAxID8gdmFsdWVzW2kgKyAyXSA6IDIgKiB2MiAtIHYxO1xuICAgIHJldHVybiBiYXNpcygodCAtIGkgLyBuKSAqIG4sIHYwLCB2MSwgdjIsIHYzKTtcbiAgfTtcbn1cbiIsImltcG9ydCB7YmFzaXN9IGZyb20gXCIuL2Jhc2lzLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHZhbHVlcykge1xuICB2YXIgbiA9IHZhbHVlcy5sZW5ndGg7XG4gIHJldHVybiBmdW5jdGlvbih0KSB7XG4gICAgdmFyIGkgPSBNYXRoLmZsb29yKCgodCAlPSAxKSA8IDAgPyArK3QgOiB0KSAqIG4pLFxuICAgICAgICB2MCA9IHZhbHVlc1soaSArIG4gLSAxKSAlIG5dLFxuICAgICAgICB2MSA9IHZhbHVlc1tpICUgbl0sXG4gICAgICAgIHYyID0gdmFsdWVzWyhpICsgMSkgJSBuXSxcbiAgICAgICAgdjMgPSB2YWx1ZXNbKGkgKyAyKSAlIG5dO1xuICAgIHJldHVybiBiYXNpcygodCAtIGkgLyBuKSAqIG4sIHYwLCB2MSwgdjIsIHYzKTtcbiAgfTtcbn1cbiIsImltcG9ydCBjb25zdGFudCBmcm9tIFwiLi9jb25zdGFudC5qc1wiO1xuXG5mdW5jdGlvbiBsaW5lYXIoYSwgZCkge1xuICByZXR1cm4gZnVuY3Rpb24odCkge1xuICAgIHJldHVybiBhICsgdCAqIGQ7XG4gIH07XG59XG5cbmZ1bmN0aW9uIGV4cG9uZW50aWFsKGEsIGIsIHkpIHtcbiAgcmV0dXJuIGEgPSBNYXRoLnBvdyhhLCB5KSwgYiA9IE1hdGgucG93KGIsIHkpIC0gYSwgeSA9IDEgLyB5LCBmdW5jdGlvbih0KSB7XG4gICAgcmV0dXJuIE1hdGgucG93KGEgKyB0ICogYiwgeSk7XG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBodWUoYSwgYikge1xuICB2YXIgZCA9IGIgLSBhO1xuICByZXR1cm4gZCA/IGxpbmVhcihhLCBkID4gMTgwIHx8IGQgPCAtMTgwID8gZCAtIDM2MCAqIE1hdGgucm91bmQoZCAvIDM2MCkgOiBkKSA6IGNvbnN0YW50KGlzTmFOKGEpID8gYiA6IGEpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2FtbWEoeSkge1xuICByZXR1cm4gKHkgPSAreSkgPT09IDEgPyBub2dhbW1hIDogZnVuY3Rpb24oYSwgYikge1xuICAgIHJldHVybiBiIC0gYSA/IGV4cG9uZW50aWFsKGEsIGIsIHkpIDogY29uc3RhbnQoaXNOYU4oYSkgPyBiIDogYSk7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG5vZ2FtbWEoYSwgYikge1xuICB2YXIgZCA9IGIgLSBhO1xuICByZXR1cm4gZCA/IGxpbmVhcihhLCBkKSA6IGNvbnN0YW50KGlzTmFOKGEpID8gYiA6IGEpO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oeCkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHg7XG4gIH07XG59XG4iLCJpbXBvcnQge2N1YmVoZWxpeCBhcyBjb2xvckN1YmVoZWxpeH0gZnJvbSBcImQzLWNvbG9yXCI7XG5pbXBvcnQgY29sb3IsIHtodWV9IGZyb20gXCIuL2NvbG9yLmpzXCI7XG5cbmZ1bmN0aW9uIGN1YmVoZWxpeChodWUpIHtcbiAgcmV0dXJuIChmdW5jdGlvbiBjdWJlaGVsaXhHYW1tYSh5KSB7XG4gICAgeSA9ICt5O1xuXG4gICAgZnVuY3Rpb24gY3ViZWhlbGl4KHN0YXJ0LCBlbmQpIHtcbiAgICAgIHZhciBoID0gaHVlKChzdGFydCA9IGNvbG9yQ3ViZWhlbGl4KHN0YXJ0KSkuaCwgKGVuZCA9IGNvbG9yQ3ViZWhlbGl4KGVuZCkpLmgpLFxuICAgICAgICAgIHMgPSBjb2xvcihzdGFydC5zLCBlbmQucyksXG4gICAgICAgICAgbCA9IGNvbG9yKHN0YXJ0LmwsIGVuZC5sKSxcbiAgICAgICAgICBvcGFjaXR5ID0gY29sb3Ioc3RhcnQub3BhY2l0eSwgZW5kLm9wYWNpdHkpO1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgc3RhcnQuaCA9IGgodCk7XG4gICAgICAgIHN0YXJ0LnMgPSBzKHQpO1xuICAgICAgICBzdGFydC5sID0gbChNYXRoLnBvdyh0LCB5KSk7XG4gICAgICAgIHN0YXJ0Lm9wYWNpdHkgPSBvcGFjaXR5KHQpO1xuICAgICAgICByZXR1cm4gc3RhcnQgKyBcIlwiO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICBjdWJlaGVsaXguZ2FtbWEgPSBjdWJlaGVsaXhHYW1tYTtcblxuICAgIHJldHVybiBjdWJlaGVsaXg7XG4gIH0pKDEpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjdWJlaGVsaXgoaHVlKTtcbmV4cG9ydCB2YXIgY3ViZWhlbGl4TG9uZyA9IGN1YmVoZWxpeChjb2xvcik7XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbihhLCBiKSB7XG4gIHZhciBkID0gbmV3IERhdGU7XG4gIHJldHVybiBhID0gK2EsIGIgPSArYiwgZnVuY3Rpb24odCkge1xuICAgIHJldHVybiBkLnNldFRpbWUoYSAqICgxIC0gdCkgKyBiICogdCksIGQ7XG4gIH07XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbihyYW5nZSkge1xuICB2YXIgbiA9IHJhbmdlLmxlbmd0aDtcbiAgcmV0dXJuIGZ1bmN0aW9uKHQpIHtcbiAgICByZXR1cm4gcmFuZ2VbTWF0aC5tYXgoMCwgTWF0aC5taW4obiAtIDEsIE1hdGguZmxvb3IodCAqIG4pKSldO1xuICB9O1xufVxuIiwiaW1wb3J0IHtoY2wgYXMgY29sb3JIY2x9IGZyb20gXCJkMy1jb2xvclwiO1xuaW1wb3J0IGNvbG9yLCB7aHVlfSBmcm9tIFwiLi9jb2xvci5qc1wiO1xuXG5mdW5jdGlvbiBoY2woaHVlKSB7XG4gIHJldHVybiBmdW5jdGlvbihzdGFydCwgZW5kKSB7XG4gICAgdmFyIGggPSBodWUoKHN0YXJ0ID0gY29sb3JIY2woc3RhcnQpKS5oLCAoZW5kID0gY29sb3JIY2woZW5kKSkuaCksXG4gICAgICAgIGMgPSBjb2xvcihzdGFydC5jLCBlbmQuYyksXG4gICAgICAgIGwgPSBjb2xvcihzdGFydC5sLCBlbmQubCksXG4gICAgICAgIG9wYWNpdHkgPSBjb2xvcihzdGFydC5vcGFjaXR5LCBlbmQub3BhY2l0eSk7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKHQpIHtcbiAgICAgIHN0YXJ0LmggPSBoKHQpO1xuICAgICAgc3RhcnQuYyA9IGModCk7XG4gICAgICBzdGFydC5sID0gbCh0KTtcbiAgICAgIHN0YXJ0Lm9wYWNpdHkgPSBvcGFjaXR5KHQpO1xuICAgICAgcmV0dXJuIHN0YXJ0ICsgXCJcIjtcbiAgICB9O1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGhjbChodWUpO1xuZXhwb3J0IHZhciBoY2xMb25nID0gaGNsKGNvbG9yKTtcbiIsImltcG9ydCB7aHNsIGFzIGNvbG9ySHNsfSBmcm9tIFwiZDMtY29sb3JcIjtcbmltcG9ydCBjb2xvciwge2h1ZX0gZnJvbSBcIi4vY29sb3IuanNcIjtcblxuZnVuY3Rpb24gaHNsKGh1ZSkge1xuICByZXR1cm4gZnVuY3Rpb24oc3RhcnQsIGVuZCkge1xuICAgIHZhciBoID0gaHVlKChzdGFydCA9IGNvbG9ySHNsKHN0YXJ0KSkuaCwgKGVuZCA9IGNvbG9ySHNsKGVuZCkpLmgpLFxuICAgICAgICBzID0gY29sb3Ioc3RhcnQucywgZW5kLnMpLFxuICAgICAgICBsID0gY29sb3Ioc3RhcnQubCwgZW5kLmwpLFxuICAgICAgICBvcGFjaXR5ID0gY29sb3Ioc3RhcnQub3BhY2l0eSwgZW5kLm9wYWNpdHkpO1xuICAgIHJldHVybiBmdW5jdGlvbih0KSB7XG4gICAgICBzdGFydC5oID0gaCh0KTtcbiAgICAgIHN0YXJ0LnMgPSBzKHQpO1xuICAgICAgc3RhcnQubCA9IGwodCk7XG4gICAgICBzdGFydC5vcGFjaXR5ID0gb3BhY2l0eSh0KTtcbiAgICAgIHJldHVybiBzdGFydCArIFwiXCI7XG4gICAgfTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBoc2woaHVlKTtcbmV4cG9ydCB2YXIgaHNsTG9uZyA9IGhzbChjb2xvcik7XG4iLCJpbXBvcnQge2h1ZX0gZnJvbSBcIi4vY29sb3IuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oYSwgYikge1xuICB2YXIgaSA9IGh1ZSgrYSwgK2IpO1xuICByZXR1cm4gZnVuY3Rpb24odCkge1xuICAgIHZhciB4ID0gaSh0KTtcbiAgICByZXR1cm4geCAtIDM2MCAqIE1hdGguZmxvb3IoeCAvIDM2MCk7XG4gIH07XG59XG4iLCJleHBvcnQge2RlZmF1bHQgYXMgaW50ZXJwb2xhdGV9IGZyb20gXCIuL3ZhbHVlLmpzXCI7XG5leHBvcnQge2RlZmF1bHQgYXMgaW50ZXJwb2xhdGVBcnJheX0gZnJvbSBcIi4vYXJyYXkuanNcIjtcbmV4cG9ydCB7ZGVmYXVsdCBhcyBpbnRlcnBvbGF0ZUJhc2lzfSBmcm9tIFwiLi9iYXNpcy5qc1wiO1xuZXhwb3J0IHtkZWZhdWx0IGFzIGludGVycG9sYXRlQmFzaXNDbG9zZWR9IGZyb20gXCIuL2Jhc2lzQ2xvc2VkLmpzXCI7XG5leHBvcnQge2RlZmF1bHQgYXMgaW50ZXJwb2xhdGVEYXRlfSBmcm9tIFwiLi9kYXRlLmpzXCI7XG5leHBvcnQge2RlZmF1bHQgYXMgaW50ZXJwb2xhdGVEaXNjcmV0ZX0gZnJvbSBcIi4vZGlzY3JldGUuanNcIjtcbmV4cG9ydCB7ZGVmYXVsdCBhcyBpbnRlcnBvbGF0ZUh1ZX0gZnJvbSBcIi4vaHVlLmpzXCI7XG5leHBvcnQge2RlZmF1bHQgYXMgaW50ZXJwb2xhdGVOdW1iZXJ9IGZyb20gXCIuL251bWJlci5qc1wiO1xuZXhwb3J0IHtkZWZhdWx0IGFzIGludGVycG9sYXRlTnVtYmVyQXJyYXl9IGZyb20gXCIuL251bWJlckFycmF5LmpzXCI7XG5leHBvcnQge2RlZmF1bHQgYXMgaW50ZXJwb2xhdGVPYmplY3R9IGZyb20gXCIuL29iamVjdC5qc1wiO1xuZXhwb3J0IHtkZWZhdWx0IGFzIGludGVycG9sYXRlUm91bmR9IGZyb20gXCIuL3JvdW5kLmpzXCI7XG5leHBvcnQge2RlZmF1bHQgYXMgaW50ZXJwb2xhdGVTdHJpbmd9IGZyb20gXCIuL3N0cmluZy5qc1wiO1xuZXhwb3J0IHtpbnRlcnBvbGF0ZVRyYW5zZm9ybUNzcywgaW50ZXJwb2xhdGVUcmFuc2Zvcm1Tdmd9IGZyb20gXCIuL3RyYW5zZm9ybS9pbmRleC5qc1wiO1xuZXhwb3J0IHtkZWZhdWx0IGFzIGludGVycG9sYXRlWm9vbX0gZnJvbSBcIi4vem9vbS5qc1wiO1xuZXhwb3J0IHtkZWZhdWx0IGFzIGludGVycG9sYXRlUmdiLCByZ2JCYXNpcyBhcyBpbnRlcnBvbGF0ZVJnYkJhc2lzLCByZ2JCYXNpc0Nsb3NlZCBhcyBpbnRlcnBvbGF0ZVJnYkJhc2lzQ2xvc2VkfSBmcm9tIFwiLi9yZ2IuanNcIjtcbmV4cG9ydCB7ZGVmYXVsdCBhcyBpbnRlcnBvbGF0ZUhzbCwgaHNsTG9uZyBhcyBpbnRlcnBvbGF0ZUhzbExvbmd9IGZyb20gXCIuL2hzbC5qc1wiO1xuZXhwb3J0IHtkZWZhdWx0IGFzIGludGVycG9sYXRlTGFifSBmcm9tIFwiLi9sYWIuanNcIjtcbmV4cG9ydCB7ZGVmYXVsdCBhcyBpbnRlcnBvbGF0ZUhjbCwgaGNsTG9uZyBhcyBpbnRlcnBvbGF0ZUhjbExvbmd9IGZyb20gXCIuL2hjbC5qc1wiO1xuZXhwb3J0IHtkZWZhdWx0IGFzIGludGVycG9sYXRlQ3ViZWhlbGl4LCBjdWJlaGVsaXhMb25nIGFzIGludGVycG9sYXRlQ3ViZWhlbGl4TG9uZ30gZnJvbSBcIi4vY3ViZWhlbGl4LmpzXCI7XG5leHBvcnQge2RlZmF1bHQgYXMgcGllY2V3aXNlfSBmcm9tIFwiLi9waWVjZXdpc2UuanNcIjtcbmV4cG9ydCB7ZGVmYXVsdCBhcyBxdWFudGl6ZX0gZnJvbSBcIi4vcXVhbnRpemUuanNcIjtcbiIsImltcG9ydCB7bGFiIGFzIGNvbG9yTGFifSBmcm9tIFwiZDMtY29sb3JcIjtcbmltcG9ydCBjb2xvciBmcm9tIFwiLi9jb2xvci5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBsYWIoc3RhcnQsIGVuZCkge1xuICB2YXIgbCA9IGNvbG9yKChzdGFydCA9IGNvbG9yTGFiKHN0YXJ0KSkubCwgKGVuZCA9IGNvbG9yTGFiKGVuZCkpLmwpLFxuICAgICAgYSA9IGNvbG9yKHN0YXJ0LmEsIGVuZC5hKSxcbiAgICAgIGIgPSBjb2xvcihzdGFydC5iLCBlbmQuYiksXG4gICAgICBvcGFjaXR5ID0gY29sb3Ioc3RhcnQub3BhY2l0eSwgZW5kLm9wYWNpdHkpO1xuICByZXR1cm4gZnVuY3Rpb24odCkge1xuICAgIHN0YXJ0LmwgPSBsKHQpO1xuICAgIHN0YXJ0LmEgPSBhKHQpO1xuICAgIHN0YXJ0LmIgPSBiKHQpO1xuICAgIHN0YXJ0Lm9wYWNpdHkgPSBvcGFjaXR5KHQpO1xuICAgIHJldHVybiBzdGFydCArIFwiXCI7XG4gIH07XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbihhLCBiKSB7XG4gIHJldHVybiBhID0gK2EsIGIgPSArYiwgZnVuY3Rpb24odCkge1xuICAgIHJldHVybiBhICogKDEgLSB0KSArIGIgKiB0O1xuICB9O1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oYSwgYikge1xuICBpZiAoIWIpIGIgPSBbXTtcbiAgdmFyIG4gPSBhID8gTWF0aC5taW4oYi5sZW5ndGgsIGEubGVuZ3RoKSA6IDAsXG4gICAgICBjID0gYi5zbGljZSgpLFxuICAgICAgaTtcbiAgcmV0dXJuIGZ1bmN0aW9uKHQpIHtcbiAgICBmb3IgKGkgPSAwOyBpIDwgbjsgKytpKSBjW2ldID0gYVtpXSAqICgxIC0gdCkgKyBiW2ldICogdDtcbiAgICByZXR1cm4gYztcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzTnVtYmVyQXJyYXkoeCkge1xuICByZXR1cm4gQXJyYXlCdWZmZXIuaXNWaWV3KHgpICYmICEoeCBpbnN0YW5jZW9mIERhdGFWaWV3KTtcbn1cbiIsImltcG9ydCB2YWx1ZSBmcm9tIFwiLi92YWx1ZS5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihhLCBiKSB7XG4gIHZhciBpID0ge30sXG4gICAgICBjID0ge30sXG4gICAgICBrO1xuXG4gIGlmIChhID09PSBudWxsIHx8IHR5cGVvZiBhICE9PSBcIm9iamVjdFwiKSBhID0ge307XG4gIGlmIChiID09PSBudWxsIHx8IHR5cGVvZiBiICE9PSBcIm9iamVjdFwiKSBiID0ge307XG5cbiAgZm9yIChrIGluIGIpIHtcbiAgICBpZiAoayBpbiBhKSB7XG4gICAgICBpW2tdID0gdmFsdWUoYVtrXSwgYltrXSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNba10gPSBiW2tdO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbih0KSB7XG4gICAgZm9yIChrIGluIGkpIGNba10gPSBpW2tdKHQpO1xuICAgIHJldHVybiBjO1xuICB9O1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcGllY2V3aXNlKGludGVycG9sYXRlLCB2YWx1ZXMpIHtcbiAgdmFyIGkgPSAwLCBuID0gdmFsdWVzLmxlbmd0aCAtIDEsIHYgPSB2YWx1ZXNbMF0sIEkgPSBuZXcgQXJyYXkobiA8IDAgPyAwIDogbik7XG4gIHdoaWxlIChpIDwgbikgSVtpXSA9IGludGVycG9sYXRlKHYsIHYgPSB2YWx1ZXNbKytpXSk7XG4gIHJldHVybiBmdW5jdGlvbih0KSB7XG4gICAgdmFyIGkgPSBNYXRoLm1heCgwLCBNYXRoLm1pbihuIC0gMSwgTWF0aC5mbG9vcih0ICo9IG4pKSk7XG4gICAgcmV0dXJuIElbaV0odCAtIGkpO1xuICB9O1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oaW50ZXJwb2xhdG9yLCBuKSB7XG4gIHZhciBzYW1wbGVzID0gbmV3IEFycmF5KG4pO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IG47ICsraSkgc2FtcGxlc1tpXSA9IGludGVycG9sYXRvcihpIC8gKG4gLSAxKSk7XG4gIHJldHVybiBzYW1wbGVzO1xufVxuIiwiaW1wb3J0IHtyZ2IgYXMgY29sb3JSZ2J9IGZyb20gXCJkMy1jb2xvclwiO1xuaW1wb3J0IGJhc2lzIGZyb20gXCIuL2Jhc2lzLmpzXCI7XG5pbXBvcnQgYmFzaXNDbG9zZWQgZnJvbSBcIi4vYmFzaXNDbG9zZWQuanNcIjtcbmltcG9ydCBub2dhbW1hLCB7Z2FtbWF9IGZyb20gXCIuL2NvbG9yLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IChmdW5jdGlvbiByZ2JHYW1tYSh5KSB7XG4gIHZhciBjb2xvciA9IGdhbW1hKHkpO1xuXG4gIGZ1bmN0aW9uIHJnYihzdGFydCwgZW5kKSB7XG4gICAgdmFyIHIgPSBjb2xvcigoc3RhcnQgPSBjb2xvclJnYihzdGFydCkpLnIsIChlbmQgPSBjb2xvclJnYihlbmQpKS5yKSxcbiAgICAgICAgZyA9IGNvbG9yKHN0YXJ0LmcsIGVuZC5nKSxcbiAgICAgICAgYiA9IGNvbG9yKHN0YXJ0LmIsIGVuZC5iKSxcbiAgICAgICAgb3BhY2l0eSA9IG5vZ2FtbWEoc3RhcnQub3BhY2l0eSwgZW5kLm9wYWNpdHkpO1xuICAgIHJldHVybiBmdW5jdGlvbih0KSB7XG4gICAgICBzdGFydC5yID0gcih0KTtcbiAgICAgIHN0YXJ0LmcgPSBnKHQpO1xuICAgICAgc3RhcnQuYiA9IGIodCk7XG4gICAgICBzdGFydC5vcGFjaXR5ID0gb3BhY2l0eSh0KTtcbiAgICAgIHJldHVybiBzdGFydCArIFwiXCI7XG4gICAgfTtcbiAgfVxuXG4gIHJnYi5nYW1tYSA9IHJnYkdhbW1hO1xuXG4gIHJldHVybiByZ2I7XG59KSgxKTtcblxuZnVuY3Rpb24gcmdiU3BsaW5lKHNwbGluZSkge1xuICByZXR1cm4gZnVuY3Rpb24oY29sb3JzKSB7XG4gICAgdmFyIG4gPSBjb2xvcnMubGVuZ3RoLFxuICAgICAgICByID0gbmV3IEFycmF5KG4pLFxuICAgICAgICBnID0gbmV3IEFycmF5KG4pLFxuICAgICAgICBiID0gbmV3IEFycmF5KG4pLFxuICAgICAgICBpLCBjb2xvcjtcbiAgICBmb3IgKGkgPSAwOyBpIDwgbjsgKytpKSB7XG4gICAgICBjb2xvciA9IGNvbG9yUmdiKGNvbG9yc1tpXSk7XG4gICAgICByW2ldID0gY29sb3IuciB8fCAwO1xuICAgICAgZ1tpXSA9IGNvbG9yLmcgfHwgMDtcbiAgICAgIGJbaV0gPSBjb2xvci5iIHx8IDA7XG4gICAgfVxuICAgIHIgPSBzcGxpbmUocik7XG4gICAgZyA9IHNwbGluZShnKTtcbiAgICBiID0gc3BsaW5lKGIpO1xuICAgIGNvbG9yLm9wYWNpdHkgPSAxO1xuICAgIHJldHVybiBmdW5jdGlvbih0KSB7XG4gICAgICBjb2xvci5yID0gcih0KTtcbiAgICAgIGNvbG9yLmcgPSBnKHQpO1xuICAgICAgY29sb3IuYiA9IGIodCk7XG4gICAgICByZXR1cm4gY29sb3IgKyBcIlwiO1xuICAgIH07XG4gIH07XG59XG5cbmV4cG9ydCB2YXIgcmdiQmFzaXMgPSByZ2JTcGxpbmUoYmFzaXMpO1xuZXhwb3J0IHZhciByZ2JCYXNpc0Nsb3NlZCA9IHJnYlNwbGluZShiYXNpc0Nsb3NlZCk7XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbihhLCBiKSB7XG4gIHJldHVybiBhID0gK2EsIGIgPSArYiwgZnVuY3Rpb24odCkge1xuICAgIHJldHVybiBNYXRoLnJvdW5kKGEgKiAoMSAtIHQpICsgYiAqIHQpO1xuICB9O1xufVxuIiwiaW1wb3J0IG51bWJlciBmcm9tIFwiLi9udW1iZXIuanNcIjtcblxudmFyIHJlQSA9IC9bLStdPyg/OlxcZCtcXC4/XFxkKnxcXC4/XFxkKykoPzpbZUVdWy0rXT9cXGQrKT8vZyxcbiAgICByZUIgPSBuZXcgUmVnRXhwKHJlQS5zb3VyY2UsIFwiZ1wiKTtcblxuZnVuY3Rpb24gemVybyhiKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gYjtcbiAgfTtcbn1cblxuZnVuY3Rpb24gb25lKGIpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKHQpIHtcbiAgICByZXR1cm4gYih0KSArIFwiXCI7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGEsIGIpIHtcbiAgdmFyIGJpID0gcmVBLmxhc3RJbmRleCA9IHJlQi5sYXN0SW5kZXggPSAwLCAvLyBzY2FuIGluZGV4IGZvciBuZXh0IG51bWJlciBpbiBiXG4gICAgICBhbSwgLy8gY3VycmVudCBtYXRjaCBpbiBhXG4gICAgICBibSwgLy8gY3VycmVudCBtYXRjaCBpbiBiXG4gICAgICBicywgLy8gc3RyaW5nIHByZWNlZGluZyBjdXJyZW50IG51bWJlciBpbiBiLCBpZiBhbnlcbiAgICAgIGkgPSAtMSwgLy8gaW5kZXggaW4gc1xuICAgICAgcyA9IFtdLCAvLyBzdHJpbmcgY29uc3RhbnRzIGFuZCBwbGFjZWhvbGRlcnNcbiAgICAgIHEgPSBbXTsgLy8gbnVtYmVyIGludGVycG9sYXRvcnNcblxuICAvLyBDb2VyY2UgaW5wdXRzIHRvIHN0cmluZ3MuXG4gIGEgPSBhICsgXCJcIiwgYiA9IGIgKyBcIlwiO1xuXG4gIC8vIEludGVycG9sYXRlIHBhaXJzIG9mIG51bWJlcnMgaW4gYSAmIGIuXG4gIHdoaWxlICgoYW0gPSByZUEuZXhlYyhhKSlcbiAgICAgICYmIChibSA9IHJlQi5leGVjKGIpKSkge1xuICAgIGlmICgoYnMgPSBibS5pbmRleCkgPiBiaSkgeyAvLyBhIHN0cmluZyBwcmVjZWRlcyB0aGUgbmV4dCBudW1iZXIgaW4gYlxuICAgICAgYnMgPSBiLnNsaWNlKGJpLCBicyk7XG4gICAgICBpZiAoc1tpXSkgc1tpXSArPSBiczsgLy8gY29hbGVzY2Ugd2l0aCBwcmV2aW91cyBzdHJpbmdcbiAgICAgIGVsc2Ugc1srK2ldID0gYnM7XG4gICAgfVxuICAgIGlmICgoYW0gPSBhbVswXSkgPT09IChibSA9IGJtWzBdKSkgeyAvLyBudW1iZXJzIGluIGEgJiBiIG1hdGNoXG4gICAgICBpZiAoc1tpXSkgc1tpXSArPSBibTsgLy8gY29hbGVzY2Ugd2l0aCBwcmV2aW91cyBzdHJpbmdcbiAgICAgIGVsc2Ugc1srK2ldID0gYm07XG4gICAgfSBlbHNlIHsgLy8gaW50ZXJwb2xhdGUgbm9uLW1hdGNoaW5nIG51bWJlcnNcbiAgICAgIHNbKytpXSA9IG51bGw7XG4gICAgICBxLnB1c2goe2k6IGksIHg6IG51bWJlcihhbSwgYm0pfSk7XG4gICAgfVxuICAgIGJpID0gcmVCLmxhc3RJbmRleDtcbiAgfVxuXG4gIC8vIEFkZCByZW1haW5zIG9mIGIuXG4gIGlmIChiaSA8IGIubGVuZ3RoKSB7XG4gICAgYnMgPSBiLnNsaWNlKGJpKTtcbiAgICBpZiAoc1tpXSkgc1tpXSArPSBiczsgLy8gY29hbGVzY2Ugd2l0aCBwcmV2aW91cyBzdHJpbmdcbiAgICBlbHNlIHNbKytpXSA9IGJzO1xuICB9XG5cbiAgLy8gU3BlY2lhbCBvcHRpbWl6YXRpb24gZm9yIG9ubHkgYSBzaW5nbGUgbWF0Y2guXG4gIC8vIE90aGVyd2lzZSwgaW50ZXJwb2xhdGUgZWFjaCBvZiB0aGUgbnVtYmVycyBhbmQgcmVqb2luIHRoZSBzdHJpbmcuXG4gIHJldHVybiBzLmxlbmd0aCA8IDIgPyAocVswXVxuICAgICAgPyBvbmUocVswXS54KVxuICAgICAgOiB6ZXJvKGIpKVxuICAgICAgOiAoYiA9IHEubGVuZ3RoLCBmdW5jdGlvbih0KSB7XG4gICAgICAgICAgZm9yICh2YXIgaSA9IDAsIG87IGkgPCBiOyArK2kpIHNbKG8gPSBxW2ldKS5pXSA9IG8ueCh0KTtcbiAgICAgICAgICByZXR1cm4gcy5qb2luKFwiXCIpO1xuICAgICAgICB9KTtcbn1cbiIsInZhciBkZWdyZWVzID0gMTgwIC8gTWF0aC5QSTtcblxuZXhwb3J0IHZhciBpZGVudGl0eSA9IHtcbiAgdHJhbnNsYXRlWDogMCxcbiAgdHJhbnNsYXRlWTogMCxcbiAgcm90YXRlOiAwLFxuICBza2V3WDogMCxcbiAgc2NhbGVYOiAxLFxuICBzY2FsZVk6IDFcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGEsIGIsIGMsIGQsIGUsIGYpIHtcbiAgdmFyIHNjYWxlWCwgc2NhbGVZLCBza2V3WDtcbiAgaWYgKHNjYWxlWCA9IE1hdGguc3FydChhICogYSArIGIgKiBiKSkgYSAvPSBzY2FsZVgsIGIgLz0gc2NhbGVYO1xuICBpZiAoc2tld1ggPSBhICogYyArIGIgKiBkKSBjIC09IGEgKiBza2V3WCwgZCAtPSBiICogc2tld1g7XG4gIGlmIChzY2FsZVkgPSBNYXRoLnNxcnQoYyAqIGMgKyBkICogZCkpIGMgLz0gc2NhbGVZLCBkIC89IHNjYWxlWSwgc2tld1ggLz0gc2NhbGVZO1xuICBpZiAoYSAqIGQgPCBiICogYykgYSA9IC1hLCBiID0gLWIsIHNrZXdYID0gLXNrZXdYLCBzY2FsZVggPSAtc2NhbGVYO1xuICByZXR1cm4ge1xuICAgIHRyYW5zbGF0ZVg6IGUsXG4gICAgdHJhbnNsYXRlWTogZixcbiAgICByb3RhdGU6IE1hdGguYXRhbjIoYiwgYSkgKiBkZWdyZWVzLFxuICAgIHNrZXdYOiBNYXRoLmF0YW4oc2tld1gpICogZGVncmVlcyxcbiAgICBzY2FsZVg6IHNjYWxlWCxcbiAgICBzY2FsZVk6IHNjYWxlWVxuICB9O1xufVxuIiwiaW1wb3J0IG51bWJlciBmcm9tIFwiLi4vbnVtYmVyLmpzXCI7XG5pbXBvcnQge3BhcnNlQ3NzLCBwYXJzZVN2Z30gZnJvbSBcIi4vcGFyc2UuanNcIjtcblxuZnVuY3Rpb24gaW50ZXJwb2xhdGVUcmFuc2Zvcm0ocGFyc2UsIHB4Q29tbWEsIHB4UGFyZW4sIGRlZ1BhcmVuKSB7XG5cbiAgZnVuY3Rpb24gcG9wKHMpIHtcbiAgICByZXR1cm4gcy5sZW5ndGggPyBzLnBvcCgpICsgXCIgXCIgOiBcIlwiO1xuICB9XG5cbiAgZnVuY3Rpb24gdHJhbnNsYXRlKHhhLCB5YSwgeGIsIHliLCBzLCBxKSB7XG4gICAgaWYgKHhhICE9PSB4YiB8fCB5YSAhPT0geWIpIHtcbiAgICAgIHZhciBpID0gcy5wdXNoKFwidHJhbnNsYXRlKFwiLCBudWxsLCBweENvbW1hLCBudWxsLCBweFBhcmVuKTtcbiAgICAgIHEucHVzaCh7aTogaSAtIDQsIHg6IG51bWJlcih4YSwgeGIpfSwge2k6IGkgLSAyLCB4OiBudW1iZXIoeWEsIHliKX0pO1xuICAgIH0gZWxzZSBpZiAoeGIgfHwgeWIpIHtcbiAgICAgIHMucHVzaChcInRyYW5zbGF0ZShcIiArIHhiICsgcHhDb21tYSArIHliICsgcHhQYXJlbik7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcm90YXRlKGEsIGIsIHMsIHEpIHtcbiAgICBpZiAoYSAhPT0gYikge1xuICAgICAgaWYgKGEgLSBiID4gMTgwKSBiICs9IDM2MDsgZWxzZSBpZiAoYiAtIGEgPiAxODApIGEgKz0gMzYwOyAvLyBzaG9ydGVzdCBwYXRoXG4gICAgICBxLnB1c2goe2k6IHMucHVzaChwb3AocykgKyBcInJvdGF0ZShcIiwgbnVsbCwgZGVnUGFyZW4pIC0gMiwgeDogbnVtYmVyKGEsIGIpfSk7XG4gICAgfSBlbHNlIGlmIChiKSB7XG4gICAgICBzLnB1c2gocG9wKHMpICsgXCJyb3RhdGUoXCIgKyBiICsgZGVnUGFyZW4pO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHNrZXdYKGEsIGIsIHMsIHEpIHtcbiAgICBpZiAoYSAhPT0gYikge1xuICAgICAgcS5wdXNoKHtpOiBzLnB1c2gocG9wKHMpICsgXCJza2V3WChcIiwgbnVsbCwgZGVnUGFyZW4pIC0gMiwgeDogbnVtYmVyKGEsIGIpfSk7XG4gICAgfSBlbHNlIGlmIChiKSB7XG4gICAgICBzLnB1c2gocG9wKHMpICsgXCJza2V3WChcIiArIGIgKyBkZWdQYXJlbik7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gc2NhbGUoeGEsIHlhLCB4YiwgeWIsIHMsIHEpIHtcbiAgICBpZiAoeGEgIT09IHhiIHx8IHlhICE9PSB5Yikge1xuICAgICAgdmFyIGkgPSBzLnB1c2gocG9wKHMpICsgXCJzY2FsZShcIiwgbnVsbCwgXCIsXCIsIG51bGwsIFwiKVwiKTtcbiAgICAgIHEucHVzaCh7aTogaSAtIDQsIHg6IG51bWJlcih4YSwgeGIpfSwge2k6IGkgLSAyLCB4OiBudW1iZXIoeWEsIHliKX0pO1xuICAgIH0gZWxzZSBpZiAoeGIgIT09IDEgfHwgeWIgIT09IDEpIHtcbiAgICAgIHMucHVzaChwb3AocykgKyBcInNjYWxlKFwiICsgeGIgKyBcIixcIiArIHliICsgXCIpXCIpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbihhLCBiKSB7XG4gICAgdmFyIHMgPSBbXSwgLy8gc3RyaW5nIGNvbnN0YW50cyBhbmQgcGxhY2Vob2xkZXJzXG4gICAgICAgIHEgPSBbXTsgLy8gbnVtYmVyIGludGVycG9sYXRvcnNcbiAgICBhID0gcGFyc2UoYSksIGIgPSBwYXJzZShiKTtcbiAgICB0cmFuc2xhdGUoYS50cmFuc2xhdGVYLCBhLnRyYW5zbGF0ZVksIGIudHJhbnNsYXRlWCwgYi50cmFuc2xhdGVZLCBzLCBxKTtcbiAgICByb3RhdGUoYS5yb3RhdGUsIGIucm90YXRlLCBzLCBxKTtcbiAgICBza2V3WChhLnNrZXdYLCBiLnNrZXdYLCBzLCBxKTtcbiAgICBzY2FsZShhLnNjYWxlWCwgYS5zY2FsZVksIGIuc2NhbGVYLCBiLnNjYWxlWSwgcywgcSk7XG4gICAgYSA9IGIgPSBudWxsOyAvLyBnY1xuICAgIHJldHVybiBmdW5jdGlvbih0KSB7XG4gICAgICB2YXIgaSA9IC0xLCBuID0gcS5sZW5ndGgsIG87XG4gICAgICB3aGlsZSAoKytpIDwgbikgc1sobyA9IHFbaV0pLmldID0gby54KHQpO1xuICAgICAgcmV0dXJuIHMuam9pbihcIlwiKTtcbiAgICB9O1xuICB9O1xufVxuXG5leHBvcnQgdmFyIGludGVycG9sYXRlVHJhbnNmb3JtQ3NzID0gaW50ZXJwb2xhdGVUcmFuc2Zvcm0ocGFyc2VDc3MsIFwicHgsIFwiLCBcInB4KVwiLCBcImRlZylcIik7XG5leHBvcnQgdmFyIGludGVycG9sYXRlVHJhbnNmb3JtU3ZnID0gaW50ZXJwb2xhdGVUcmFuc2Zvcm0ocGFyc2VTdmcsIFwiLCBcIiwgXCIpXCIsIFwiKVwiKTtcbiIsImltcG9ydCBkZWNvbXBvc2UsIHtpZGVudGl0eX0gZnJvbSBcIi4vZGVjb21wb3NlLmpzXCI7XG5cbnZhciBjc3NOb2RlLFxuICAgIGNzc1Jvb3QsXG4gICAgY3NzVmlldyxcbiAgICBzdmdOb2RlO1xuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VDc3ModmFsdWUpIHtcbiAgaWYgKHZhbHVlID09PSBcIm5vbmVcIikgcmV0dXJuIGlkZW50aXR5O1xuICBpZiAoIWNzc05vZGUpIGNzc05vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiRElWXCIpLCBjc3NSb290ID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LCBjc3NWaWV3ID0gZG9jdW1lbnQuZGVmYXVsdFZpZXc7XG4gIGNzc05vZGUuc3R5bGUudHJhbnNmb3JtID0gdmFsdWU7XG4gIHZhbHVlID0gY3NzVmlldy5nZXRDb21wdXRlZFN0eWxlKGNzc1Jvb3QuYXBwZW5kQ2hpbGQoY3NzTm9kZSksIG51bGwpLmdldFByb3BlcnR5VmFsdWUoXCJ0cmFuc2Zvcm1cIik7XG4gIGNzc1Jvb3QucmVtb3ZlQ2hpbGQoY3NzTm9kZSk7XG4gIHZhbHVlID0gdmFsdWUuc2xpY2UoNywgLTEpLnNwbGl0KFwiLFwiKTtcbiAgcmV0dXJuIGRlY29tcG9zZSgrdmFsdWVbMF0sICt2YWx1ZVsxXSwgK3ZhbHVlWzJdLCArdmFsdWVbM10sICt2YWx1ZVs0XSwgK3ZhbHVlWzVdKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlU3ZnKHZhbHVlKSB7XG4gIGlmICh2YWx1ZSA9PSBudWxsKSByZXR1cm4gaWRlbnRpdHk7XG4gIGlmICghc3ZnTm9kZSkgc3ZnTm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsIFwiZ1wiKTtcbiAgc3ZnTm9kZS5zZXRBdHRyaWJ1dGUoXCJ0cmFuc2Zvcm1cIiwgdmFsdWUpO1xuICBpZiAoISh2YWx1ZSA9IHN2Z05vZGUudHJhbnNmb3JtLmJhc2VWYWwuY29uc29saWRhdGUoKSkpIHJldHVybiBpZGVudGl0eTtcbiAgdmFsdWUgPSB2YWx1ZS5tYXRyaXg7XG4gIHJldHVybiBkZWNvbXBvc2UodmFsdWUuYSwgdmFsdWUuYiwgdmFsdWUuYywgdmFsdWUuZCwgdmFsdWUuZSwgdmFsdWUuZik7XG59XG4iLCJpbXBvcnQge2NvbG9yfSBmcm9tIFwiZDMtY29sb3JcIjtcbmltcG9ydCByZ2IgZnJvbSBcIi4vcmdiLmpzXCI7XG5pbXBvcnQge2dlbmVyaWNBcnJheX0gZnJvbSBcIi4vYXJyYXkuanNcIjtcbmltcG9ydCBkYXRlIGZyb20gXCIuL2RhdGUuanNcIjtcbmltcG9ydCBudW1iZXIgZnJvbSBcIi4vbnVtYmVyLmpzXCI7XG5pbXBvcnQgb2JqZWN0IGZyb20gXCIuL29iamVjdC5qc1wiO1xuaW1wb3J0IHN0cmluZyBmcm9tIFwiLi9zdHJpbmcuanNcIjtcbmltcG9ydCBjb25zdGFudCBmcm9tIFwiLi9jb25zdGFudC5qc1wiO1xuaW1wb3J0IG51bWJlckFycmF5LCB7aXNOdW1iZXJBcnJheX0gZnJvbSBcIi4vbnVtYmVyQXJyYXkuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oYSwgYikge1xuICB2YXIgdCA9IHR5cGVvZiBiLCBjO1xuICByZXR1cm4gYiA9PSBudWxsIHx8IHQgPT09IFwiYm9vbGVhblwiID8gY29uc3RhbnQoYilcbiAgICAgIDogKHQgPT09IFwibnVtYmVyXCIgPyBudW1iZXJcbiAgICAgIDogdCA9PT0gXCJzdHJpbmdcIiA/ICgoYyA9IGNvbG9yKGIpKSA/IChiID0gYywgcmdiKSA6IHN0cmluZylcbiAgICAgIDogYiBpbnN0YW5jZW9mIGNvbG9yID8gcmdiXG4gICAgICA6IGIgaW5zdGFuY2VvZiBEYXRlID8gZGF0ZVxuICAgICAgOiBpc051bWJlckFycmF5KGIpID8gbnVtYmVyQXJyYXlcbiAgICAgIDogQXJyYXkuaXNBcnJheShiKSA/IGdlbmVyaWNBcnJheVxuICAgICAgOiB0eXBlb2YgYi52YWx1ZU9mICE9PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIGIudG9TdHJpbmcgIT09IFwiZnVuY3Rpb25cIiB8fCBpc05hTihiKSA/IG9iamVjdFxuICAgICAgOiBudW1iZXIpKGEsIGIpO1xufVxuIiwidmFyIHJobyA9IE1hdGguU1FSVDIsXG4gICAgcmhvMiA9IDIsXG4gICAgcmhvNCA9IDQsXG4gICAgZXBzaWxvbjIgPSAxZS0xMjtcblxuZnVuY3Rpb24gY29zaCh4KSB7XG4gIHJldHVybiAoKHggPSBNYXRoLmV4cCh4KSkgKyAxIC8geCkgLyAyO1xufVxuXG5mdW5jdGlvbiBzaW5oKHgpIHtcbiAgcmV0dXJuICgoeCA9IE1hdGguZXhwKHgpKSAtIDEgLyB4KSAvIDI7XG59XG5cbmZ1bmN0aW9uIHRhbmgoeCkge1xuICByZXR1cm4gKCh4ID0gTWF0aC5leHAoMiAqIHgpKSAtIDEpIC8gKHggKyAxKTtcbn1cblxuLy8gcDAgPSBbdXgwLCB1eTAsIHcwXVxuLy8gcDEgPSBbdXgxLCB1eTEsIHcxXVxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24ocDAsIHAxKSB7XG4gIHZhciB1eDAgPSBwMFswXSwgdXkwID0gcDBbMV0sIHcwID0gcDBbMl0sXG4gICAgICB1eDEgPSBwMVswXSwgdXkxID0gcDFbMV0sIHcxID0gcDFbMl0sXG4gICAgICBkeCA9IHV4MSAtIHV4MCxcbiAgICAgIGR5ID0gdXkxIC0gdXkwLFxuICAgICAgZDIgPSBkeCAqIGR4ICsgZHkgKiBkeSxcbiAgICAgIGksXG4gICAgICBTO1xuXG4gIC8vIFNwZWNpYWwgY2FzZSBmb3IgdTAg4omFIHUxLlxuICBpZiAoZDIgPCBlcHNpbG9uMikge1xuICAgIFMgPSBNYXRoLmxvZyh3MSAvIHcwKSAvIHJobztcbiAgICBpID0gZnVuY3Rpb24odCkge1xuICAgICAgcmV0dXJuIFtcbiAgICAgICAgdXgwICsgdCAqIGR4LFxuICAgICAgICB1eTAgKyB0ICogZHksXG4gICAgICAgIHcwICogTWF0aC5leHAocmhvICogdCAqIFMpXG4gICAgICBdO1xuICAgIH1cbiAgfVxuXG4gIC8vIEdlbmVyYWwgY2FzZS5cbiAgZWxzZSB7XG4gICAgdmFyIGQxID0gTWF0aC5zcXJ0KGQyKSxcbiAgICAgICAgYjAgPSAodzEgKiB3MSAtIHcwICogdzAgKyByaG80ICogZDIpIC8gKDIgKiB3MCAqIHJobzIgKiBkMSksXG4gICAgICAgIGIxID0gKHcxICogdzEgLSB3MCAqIHcwIC0gcmhvNCAqIGQyKSAvICgyICogdzEgKiByaG8yICogZDEpLFxuICAgICAgICByMCA9IE1hdGgubG9nKE1hdGguc3FydChiMCAqIGIwICsgMSkgLSBiMCksXG4gICAgICAgIHIxID0gTWF0aC5sb2coTWF0aC5zcXJ0KGIxICogYjEgKyAxKSAtIGIxKTtcbiAgICBTID0gKHIxIC0gcjApIC8gcmhvO1xuICAgIGkgPSBmdW5jdGlvbih0KSB7XG4gICAgICB2YXIgcyA9IHQgKiBTLFxuICAgICAgICAgIGNvc2hyMCA9IGNvc2gocjApLFxuICAgICAgICAgIHUgPSB3MCAvIChyaG8yICogZDEpICogKGNvc2hyMCAqIHRhbmgocmhvICogcyArIHIwKSAtIHNpbmgocjApKTtcbiAgICAgIHJldHVybiBbXG4gICAgICAgIHV4MCArIHUgKiBkeCxcbiAgICAgICAgdXkwICsgdSAqIGR5LFxuICAgICAgICB3MCAqIGNvc2hyMCAvIGNvc2gocmhvICogcyArIHIwKVxuICAgICAgXTtcbiAgICB9XG4gIH1cblxuICBpLmR1cmF0aW9uID0gUyAqIDEwMDA7XG5cbiAgcmV0dXJuIGk7XG59XG4iLCJpbXBvcnQgY29sb3JzIGZyb20gXCIuLi9jb2xvcnMuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY29sb3JzKFwiN2ZjOTdmYmVhZWQ0ZmRjMDg2ZmZmZjk5Mzg2Y2IwZjAwMjdmYmY1YjE3NjY2NjY2XCIpO1xuIiwiaW1wb3J0IGNvbG9ycyBmcm9tIFwiLi4vY29sb3JzLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNvbG9ycyhcIjFiOWU3N2Q5NWYwMjc1NzBiM2U3Mjk4YTY2YTYxZWU2YWIwMmE2NzYxZDY2NjY2NlwiKTtcbiIsImltcG9ydCBjb2xvcnMgZnJvbSBcIi4uL2NvbG9ycy5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjb2xvcnMoXCJhNmNlZTMxZjc4YjRiMmRmOGEzM2EwMmNmYjlhOTllMzFhMWNmZGJmNmZmZjdmMDBjYWIyZDY2YTNkOWFmZmZmOTliMTU5MjhcIik7XG4iLCJpbXBvcnQgY29sb3JzIGZyb20gXCIuLi9jb2xvcnMuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY29sb3JzKFwiZmJiNGFlYjNjZGUzY2NlYmM1ZGVjYmU0ZmVkOWE2ZmZmZmNjZTVkOGJkZmRkYWVjZjJmMmYyXCIpO1xuIiwiaW1wb3J0IGNvbG9ycyBmcm9tIFwiLi4vY29sb3JzLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNvbG9ycyhcImIzZTJjZGZkY2RhY2NiZDVlOGY0Y2FlNGU2ZjVjOWZmZjJhZWYxZTJjY2NjY2NjY1wiKTtcbiIsImltcG9ydCBjb2xvcnMgZnJvbSBcIi4uL2NvbG9ycy5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjb2xvcnMoXCJlNDFhMWMzNzdlYjg0ZGFmNGE5ODRlYTNmZjdmMDBmZmZmMzNhNjU2MjhmNzgxYmY5OTk5OTlcIik7XG4iLCJpbXBvcnQgY29sb3JzIGZyb20gXCIuLi9jb2xvcnMuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY29sb3JzKFwiNjZjMmE1ZmM4ZDYyOGRhMGNiZTc4YWMzYTZkODU0ZmZkOTJmZTVjNDk0YjNiM2IzXCIpO1xuIiwiaW1wb3J0IGNvbG9ycyBmcm9tIFwiLi4vY29sb3JzLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNvbG9ycyhcIjhkZDNjN2ZmZmZiM2JlYmFkYWZiODA3MjgwYjFkM2ZkYjQ2MmIzZGU2OWZjY2RlNWQ5ZDlkOWJjODBiZGNjZWJjNWZmZWQ2ZlwiKTtcbiIsImltcG9ydCBjb2xvcnMgZnJvbSBcIi4uL2NvbG9ycy5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjb2xvcnMoXCI0ZTc5YTdmMjhlMmNlMTU3NTk3NmI3YjI1OWExNGZlZGM5NDlhZjdhYTFmZjlkYTc5Yzc1NWZiYWIwYWJcIik7XG4iLCJpbXBvcnQgY29sb3JzIGZyb20gXCIuLi9jb2xvcnMuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY29sb3JzKFwiMWY3N2I0ZmY3ZjBlMmNhMDJjZDYyNzI4OTQ2N2JkOGM1NjRiZTM3N2MyN2Y3ZjdmYmNiZDIyMTdiZWNmXCIpO1xuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oc3BlY2lmaWVyKSB7XG4gIHZhciBuID0gc3BlY2lmaWVyLmxlbmd0aCAvIDYgfCAwLCBjb2xvcnMgPSBuZXcgQXJyYXkobiksIGkgPSAwO1xuICB3aGlsZSAoaSA8IG4pIGNvbG9yc1tpXSA9IFwiI1wiICsgc3BlY2lmaWVyLnNsaWNlKGkgKiA2LCArK2kgKiA2KTtcbiAgcmV0dXJuIGNvbG9ycztcbn1cbiIsImltcG9ydCBjb2xvcnMgZnJvbSBcIi4uL2NvbG9ycy5qc1wiO1xuaW1wb3J0IHJhbXAgZnJvbSBcIi4uL3JhbXAuanNcIjtcblxuZXhwb3J0IHZhciBzY2hlbWUgPSBuZXcgQXJyYXkoMykuY29uY2F0KFxuICBcImQ4YjM2NWY1ZjVmNTVhYjRhY1wiLFxuICBcImE2NjExYWRmYzI3ZDgwY2RjMTAxODU3MVwiLFxuICBcImE2NjExYWRmYzI3ZGY1ZjVmNTgwY2RjMTAxODU3MVwiLFxuICBcIjhjNTEwYWQ4YjM2NWY2ZThjM2M3ZWFlNTVhYjRhYzAxNjY1ZVwiLFxuICBcIjhjNTEwYWQ4YjM2NWY2ZThjM2Y1ZjVmNWM3ZWFlNTVhYjRhYzAxNjY1ZVwiLFxuICBcIjhjNTEwYWJmODEyZGRmYzI3ZGY2ZThjM2M3ZWFlNTgwY2RjMTM1OTc4ZjAxNjY1ZVwiLFxuICBcIjhjNTEwYWJmODEyZGRmYzI3ZGY2ZThjM2Y1ZjVmNWM3ZWFlNTgwY2RjMTM1OTc4ZjAxNjY1ZVwiLFxuICBcIjU0MzAwNThjNTEwYWJmODEyZGRmYzI3ZGY2ZThjM2M3ZWFlNTgwY2RjMTM1OTc4ZjAxNjY1ZTAwM2MzMFwiLFxuICBcIjU0MzAwNThjNTEwYWJmODEyZGRmYzI3ZGY2ZThjM2Y1ZjVmNWM3ZWFlNTgwY2RjMTM1OTc4ZjAxNjY1ZTAwM2MzMFwiXG4pLm1hcChjb2xvcnMpO1xuXG5leHBvcnQgZGVmYXVsdCByYW1wKHNjaGVtZSk7XG4iLCJpbXBvcnQgY29sb3JzIGZyb20gXCIuLi9jb2xvcnMuanNcIjtcbmltcG9ydCByYW1wIGZyb20gXCIuLi9yYW1wLmpzXCI7XG5cbmV4cG9ydCB2YXIgc2NoZW1lID0gbmV3IEFycmF5KDMpLmNvbmNhdChcbiAgXCJhZjhkYzNmN2Y3Zjc3ZmJmN2JcIixcbiAgXCI3YjMyOTRjMmE1Y2ZhNmRiYTAwMDg4MzdcIixcbiAgXCI3YjMyOTRjMmE1Y2ZmN2Y3ZjdhNmRiYTAwMDg4MzdcIixcbiAgXCI3NjJhODNhZjhkYzNlN2Q0ZThkOWYwZDM3ZmJmN2IxYjc4MzdcIixcbiAgXCI3NjJhODNhZjhkYzNlN2Q0ZThmN2Y3ZjdkOWYwZDM3ZmJmN2IxYjc4MzdcIixcbiAgXCI3NjJhODM5OTcwYWJjMmE1Y2ZlN2Q0ZThkOWYwZDNhNmRiYTA1YWFlNjExYjc4MzdcIixcbiAgXCI3NjJhODM5OTcwYWJjMmE1Y2ZlN2Q0ZThmN2Y3ZjdkOWYwZDNhNmRiYTA1YWFlNjExYjc4MzdcIixcbiAgXCI0MDAwNGI3NjJhODM5OTcwYWJjMmE1Y2ZlN2Q0ZThkOWYwZDNhNmRiYTA1YWFlNjExYjc4MzcwMDQ0MWJcIixcbiAgXCI0MDAwNGI3NjJhODM5OTcwYWJjMmE1Y2ZlN2Q0ZThmN2Y3ZjdkOWYwZDNhNmRiYTA1YWFlNjExYjc4MzcwMDQ0MWJcIlxuKS5tYXAoY29sb3JzKTtcblxuZXhwb3J0IGRlZmF1bHQgcmFtcChzY2hlbWUpO1xuIiwiaW1wb3J0IGNvbG9ycyBmcm9tIFwiLi4vY29sb3JzLmpzXCI7XG5pbXBvcnQgcmFtcCBmcm9tIFwiLi4vcmFtcC5qc1wiO1xuXG5leHBvcnQgdmFyIHNjaGVtZSA9IG5ldyBBcnJheSgzKS5jb25jYXQoXG4gIFwiZTlhM2M5ZjdmN2Y3YTFkNzZhXCIsXG4gIFwiZDAxYzhiZjFiNmRhYjhlMTg2NGRhYzI2XCIsXG4gIFwiZDAxYzhiZjFiNmRhZjdmN2Y3YjhlMTg2NGRhYzI2XCIsXG4gIFwiYzUxYjdkZTlhM2M5ZmRlMGVmZTZmNWQwYTFkNzZhNGQ5MjIxXCIsXG4gIFwiYzUxYjdkZTlhM2M5ZmRlMGVmZjdmN2Y3ZTZmNWQwYTFkNzZhNGQ5MjIxXCIsXG4gIFwiYzUxYjdkZGU3N2FlZjFiNmRhZmRlMGVmZTZmNWQwYjhlMTg2N2ZiYzQxNGQ5MjIxXCIsXG4gIFwiYzUxYjdkZGU3N2FlZjFiNmRhZmRlMGVmZjdmN2Y3ZTZmNWQwYjhlMTg2N2ZiYzQxNGQ5MjIxXCIsXG4gIFwiOGUwMTUyYzUxYjdkZGU3N2FlZjFiNmRhZmRlMGVmZTZmNWQwYjhlMTg2N2ZiYzQxNGQ5MjIxMjc2NDE5XCIsXG4gIFwiOGUwMTUyYzUxYjdkZGU3N2FlZjFiNmRhZmRlMGVmZjdmN2Y3ZTZmNWQwYjhlMTg2N2ZiYzQxNGQ5MjIxMjc2NDE5XCJcbikubWFwKGNvbG9ycyk7XG5cbmV4cG9ydCBkZWZhdWx0IHJhbXAoc2NoZW1lKTtcbiIsImltcG9ydCBjb2xvcnMgZnJvbSBcIi4uL2NvbG9ycy5qc1wiO1xuaW1wb3J0IHJhbXAgZnJvbSBcIi4uL3JhbXAuanNcIjtcblxuZXhwb3J0IHZhciBzY2hlbWUgPSBuZXcgQXJyYXkoMykuY29uY2F0KFxuICBcIjk5OGVjM2Y3ZjdmN2YxYTM0MFwiLFxuICBcIjVlM2M5OWIyYWJkMmZkYjg2M2U2NjEwMVwiLFxuICBcIjVlM2M5OWIyYWJkMmY3ZjdmN2ZkYjg2M2U2NjEwMVwiLFxuICBcIjU0Mjc4ODk5OGVjM2Q4ZGFlYmZlZTBiNmYxYTM0MGIzNTgwNlwiLFxuICBcIjU0Mjc4ODk5OGVjM2Q4ZGFlYmY3ZjdmN2ZlZTBiNmYxYTM0MGIzNTgwNlwiLFxuICBcIjU0Mjc4ODgwNzNhY2IyYWJkMmQ4ZGFlYmZlZTBiNmZkYjg2M2UwODIxNGIzNTgwNlwiLFxuICBcIjU0Mjc4ODgwNzNhY2IyYWJkMmQ4ZGFlYmY3ZjdmN2ZlZTBiNmZkYjg2M2UwODIxNGIzNTgwNlwiLFxuICBcIjJkMDA0YjU0Mjc4ODgwNzNhY2IyYWJkMmQ4ZGFlYmZlZTBiNmZkYjg2M2UwODIxNGIzNTgwNjdmM2IwOFwiLFxuICBcIjJkMDA0YjU0Mjc4ODgwNzNhY2IyYWJkMmQ4ZGFlYmY3ZjdmN2ZlZTBiNmZkYjg2M2UwODIxNGIzNTgwNjdmM2IwOFwiXG4pLm1hcChjb2xvcnMpO1xuXG5leHBvcnQgZGVmYXVsdCByYW1wKHNjaGVtZSk7XG4iLCJpbXBvcnQgY29sb3JzIGZyb20gXCIuLi9jb2xvcnMuanNcIjtcbmltcG9ydCByYW1wIGZyb20gXCIuLi9yYW1wLmpzXCI7XG5cbmV4cG9ydCB2YXIgc2NoZW1lID0gbmV3IEFycmF5KDMpLmNvbmNhdChcbiAgXCJlZjhhNjJmN2Y3Zjc2N2E5Y2ZcIixcbiAgXCJjYTAwMjBmNGE1ODI5MmM1ZGUwNTcxYjBcIixcbiAgXCJjYTAwMjBmNGE1ODJmN2Y3Zjc5MmM1ZGUwNTcxYjBcIixcbiAgXCJiMjE4MmJlZjhhNjJmZGRiYzdkMWU1ZjA2N2E5Y2YyMTY2YWNcIixcbiAgXCJiMjE4MmJlZjhhNjJmZGRiYzdmN2Y3ZjdkMWU1ZjA2N2E5Y2YyMTY2YWNcIixcbiAgXCJiMjE4MmJkNjYwNGRmNGE1ODJmZGRiYzdkMWU1ZjA5MmM1ZGU0MzkzYzMyMTY2YWNcIixcbiAgXCJiMjE4MmJkNjYwNGRmNGE1ODJmZGRiYzdmN2Y3ZjdkMWU1ZjA5MmM1ZGU0MzkzYzMyMTY2YWNcIixcbiAgXCI2NzAwMWZiMjE4MmJkNjYwNGRmNGE1ODJmZGRiYzdkMWU1ZjA5MmM1ZGU0MzkzYzMyMTY2YWMwNTMwNjFcIixcbiAgXCI2NzAwMWZiMjE4MmJkNjYwNGRmNGE1ODJmZGRiYzdmN2Y3ZjdkMWU1ZjA5MmM1ZGU0MzkzYzMyMTY2YWMwNTMwNjFcIlxuKS5tYXAoY29sb3JzKTtcblxuZXhwb3J0IGRlZmF1bHQgcmFtcChzY2hlbWUpO1xuIiwiaW1wb3J0IGNvbG9ycyBmcm9tIFwiLi4vY29sb3JzLmpzXCI7XG5pbXBvcnQgcmFtcCBmcm9tIFwiLi4vcmFtcC5qc1wiO1xuXG5leHBvcnQgdmFyIHNjaGVtZSA9IG5ldyBBcnJheSgzKS5jb25jYXQoXG4gIFwiZWY4YTYyZmZmZmZmOTk5OTk5XCIsXG4gIFwiY2EwMDIwZjRhNTgyYmFiYWJhNDA0MDQwXCIsXG4gIFwiY2EwMDIwZjRhNTgyZmZmZmZmYmFiYWJhNDA0MDQwXCIsXG4gIFwiYjIxODJiZWY4YTYyZmRkYmM3ZTBlMGUwOTk5OTk5NGQ0ZDRkXCIsXG4gIFwiYjIxODJiZWY4YTYyZmRkYmM3ZmZmZmZmZTBlMGUwOTk5OTk5NGQ0ZDRkXCIsXG4gIFwiYjIxODJiZDY2MDRkZjRhNTgyZmRkYmM3ZTBlMGUwYmFiYWJhODc4Nzg3NGQ0ZDRkXCIsXG4gIFwiYjIxODJiZDY2MDRkZjRhNTgyZmRkYmM3ZmZmZmZmZTBlMGUwYmFiYWJhODc4Nzg3NGQ0ZDRkXCIsXG4gIFwiNjcwMDFmYjIxODJiZDY2MDRkZjRhNTgyZmRkYmM3ZTBlMGUwYmFiYWJhODc4Nzg3NGQ0ZDRkMWExYTFhXCIsXG4gIFwiNjcwMDFmYjIxODJiZDY2MDRkZjRhNTgyZmRkYmM3ZmZmZmZmZTBlMGUwYmFiYWJhODc4Nzg3NGQ0ZDRkMWExYTFhXCJcbikubWFwKGNvbG9ycyk7XG5cbmV4cG9ydCBkZWZhdWx0IHJhbXAoc2NoZW1lKTtcbiIsImltcG9ydCBjb2xvcnMgZnJvbSBcIi4uL2NvbG9ycy5qc1wiO1xuaW1wb3J0IHJhbXAgZnJvbSBcIi4uL3JhbXAuanNcIjtcblxuZXhwb3J0IHZhciBzY2hlbWUgPSBuZXcgQXJyYXkoMykuY29uY2F0KFxuICBcImZjOGQ1OWZmZmZiZjkxYmZkYlwiLFxuICBcImQ3MTkxY2ZkYWU2MWFiZDllOTJjN2JiNlwiLFxuICBcImQ3MTkxY2ZkYWU2MWZmZmZiZmFiZDllOTJjN2JiNlwiLFxuICBcImQ3MzAyN2ZjOGQ1OWZlZTA5MGUwZjNmODkxYmZkYjQ1NzViNFwiLFxuICBcImQ3MzAyN2ZjOGQ1OWZlZTA5MGZmZmZiZmUwZjNmODkxYmZkYjQ1NzViNFwiLFxuICBcImQ3MzAyN2Y0NmQ0M2ZkYWU2MWZlZTA5MGUwZjNmOGFiZDllOTc0YWRkMTQ1NzViNFwiLFxuICBcImQ3MzAyN2Y0NmQ0M2ZkYWU2MWZlZTA5MGZmZmZiZmUwZjNmOGFiZDllOTc0YWRkMTQ1NzViNFwiLFxuICBcImE1MDAyNmQ3MzAyN2Y0NmQ0M2ZkYWU2MWZlZTA5MGUwZjNmOGFiZDllOTc0YWRkMTQ1NzViNDMxMzY5NVwiLFxuICBcImE1MDAyNmQ3MzAyN2Y0NmQ0M2ZkYWU2MWZlZTA5MGZmZmZiZmUwZjNmOGFiZDllOTc0YWRkMTQ1NzViNDMxMzY5NVwiXG4pLm1hcChjb2xvcnMpO1xuXG5leHBvcnQgZGVmYXVsdCByYW1wKHNjaGVtZSk7XG4iLCJpbXBvcnQgY29sb3JzIGZyb20gXCIuLi9jb2xvcnMuanNcIjtcbmltcG9ydCByYW1wIGZyb20gXCIuLi9yYW1wLmpzXCI7XG5cbmV4cG9ydCB2YXIgc2NoZW1lID0gbmV3IEFycmF5KDMpLmNvbmNhdChcbiAgXCJmYzhkNTlmZmZmYmY5MWNmNjBcIixcbiAgXCJkNzE5MWNmZGFlNjFhNmQ5NmExYTk2NDFcIixcbiAgXCJkNzE5MWNmZGFlNjFmZmZmYmZhNmQ5NmExYTk2NDFcIixcbiAgXCJkNzMwMjdmYzhkNTlmZWUwOGJkOWVmOGI5MWNmNjAxYTk4NTBcIixcbiAgXCJkNzMwMjdmYzhkNTlmZWUwOGJmZmZmYmZkOWVmOGI5MWNmNjAxYTk4NTBcIixcbiAgXCJkNzMwMjdmNDZkNDNmZGFlNjFmZWUwOGJkOWVmOGJhNmQ5NmE2NmJkNjMxYTk4NTBcIixcbiAgXCJkNzMwMjdmNDZkNDNmZGFlNjFmZWUwOGJmZmZmYmZkOWVmOGJhNmQ5NmE2NmJkNjMxYTk4NTBcIixcbiAgXCJhNTAwMjZkNzMwMjdmNDZkNDNmZGFlNjFmZWUwOGJkOWVmOGJhNmQ5NmE2NmJkNjMxYTk4NTAwMDY4MzdcIixcbiAgXCJhNTAwMjZkNzMwMjdmNDZkNDNmZGFlNjFmZWUwOGJmZmZmYmZkOWVmOGJhNmQ5NmE2NmJkNjMxYTk4NTAwMDY4MzdcIlxuKS5tYXAoY29sb3JzKTtcblxuZXhwb3J0IGRlZmF1bHQgcmFtcChzY2hlbWUpO1xuIiwiaW1wb3J0IGNvbG9ycyBmcm9tIFwiLi4vY29sb3JzLmpzXCI7XG5pbXBvcnQgcmFtcCBmcm9tIFwiLi4vcmFtcC5qc1wiO1xuXG5leHBvcnQgdmFyIHNjaGVtZSA9IG5ldyBBcnJheSgzKS5jb25jYXQoXG4gIFwiZmM4ZDU5ZmZmZmJmOTlkNTk0XCIsXG4gIFwiZDcxOTFjZmRhZTYxYWJkZGE0MmI4M2JhXCIsXG4gIFwiZDcxOTFjZmRhZTYxZmZmZmJmYWJkZGE0MmI4M2JhXCIsXG4gIFwiZDUzZTRmZmM4ZDU5ZmVlMDhiZTZmNTk4OTlkNTk0MzI4OGJkXCIsXG4gIFwiZDUzZTRmZmM4ZDU5ZmVlMDhiZmZmZmJmZTZmNTk4OTlkNTk0MzI4OGJkXCIsXG4gIFwiZDUzZTRmZjQ2ZDQzZmRhZTYxZmVlMDhiZTZmNTk4YWJkZGE0NjZjMmE1MzI4OGJkXCIsXG4gIFwiZDUzZTRmZjQ2ZDQzZmRhZTYxZmVlMDhiZmZmZmJmZTZmNTk4YWJkZGE0NjZjMmE1MzI4OGJkXCIsXG4gIFwiOWUwMTQyZDUzZTRmZjQ2ZDQzZmRhZTYxZmVlMDhiZTZmNTk4YWJkZGE0NjZjMmE1MzI4OGJkNWU0ZmEyXCIsXG4gIFwiOWUwMTQyZDUzZTRmZjQ2ZDQzZmRhZTYxZmVlMDhiZmZmZmJmZTZmNTk4YWJkZGE0NjZjMmE1MzI4OGJkNWU0ZmEyXCJcbikubWFwKGNvbG9ycyk7XG5cbmV4cG9ydCBkZWZhdWx0IHJhbXAoc2NoZW1lKTtcbiIsImV4cG9ydCB7ZGVmYXVsdCBhcyBzY2hlbWVDYXRlZ29yeTEwfSBmcm9tIFwiLi9jYXRlZ29yaWNhbC9jYXRlZ29yeTEwLmpzXCI7XG5leHBvcnQge2RlZmF1bHQgYXMgc2NoZW1lQWNjZW50fSBmcm9tIFwiLi9jYXRlZ29yaWNhbC9BY2NlbnQuanNcIjtcbmV4cG9ydCB7ZGVmYXVsdCBhcyBzY2hlbWVEYXJrMn0gZnJvbSBcIi4vY2F0ZWdvcmljYWwvRGFyazIuanNcIjtcbmV4cG9ydCB7ZGVmYXVsdCBhcyBzY2hlbWVQYWlyZWR9IGZyb20gXCIuL2NhdGVnb3JpY2FsL1BhaXJlZC5qc1wiO1xuZXhwb3J0IHtkZWZhdWx0IGFzIHNjaGVtZVBhc3RlbDF9IGZyb20gXCIuL2NhdGVnb3JpY2FsL1Bhc3RlbDEuanNcIjtcbmV4cG9ydCB7ZGVmYXVsdCBhcyBzY2hlbWVQYXN0ZWwyfSBmcm9tIFwiLi9jYXRlZ29yaWNhbC9QYXN0ZWwyLmpzXCI7XG5leHBvcnQge2RlZmF1bHQgYXMgc2NoZW1lU2V0MX0gZnJvbSBcIi4vY2F0ZWdvcmljYWwvU2V0MS5qc1wiO1xuZXhwb3J0IHtkZWZhdWx0IGFzIHNjaGVtZVNldDJ9IGZyb20gXCIuL2NhdGVnb3JpY2FsL1NldDIuanNcIjtcbmV4cG9ydCB7ZGVmYXVsdCBhcyBzY2hlbWVTZXQzfSBmcm9tIFwiLi9jYXRlZ29yaWNhbC9TZXQzLmpzXCI7XG5leHBvcnQge2RlZmF1bHQgYXMgc2NoZW1lVGFibGVhdTEwfSBmcm9tIFwiLi9jYXRlZ29yaWNhbC9UYWJsZWF1MTAuanNcIjtcbmV4cG9ydCB7ZGVmYXVsdCBhcyBpbnRlcnBvbGF0ZUJyQkcsIHNjaGVtZSBhcyBzY2hlbWVCckJHfSBmcm9tIFwiLi9kaXZlcmdpbmcvQnJCRy5qc1wiO1xuZXhwb3J0IHtkZWZhdWx0IGFzIGludGVycG9sYXRlUFJHbiwgc2NoZW1lIGFzIHNjaGVtZVBSR259IGZyb20gXCIuL2RpdmVyZ2luZy9QUkduLmpzXCI7XG5leHBvcnQge2RlZmF1bHQgYXMgaW50ZXJwb2xhdGVQaVlHLCBzY2hlbWUgYXMgc2NoZW1lUGlZR30gZnJvbSBcIi4vZGl2ZXJnaW5nL1BpWUcuanNcIjtcbmV4cG9ydCB7ZGVmYXVsdCBhcyBpbnRlcnBvbGF0ZVB1T3IsIHNjaGVtZSBhcyBzY2hlbWVQdU9yfSBmcm9tIFwiLi9kaXZlcmdpbmcvUHVPci5qc1wiO1xuZXhwb3J0IHtkZWZhdWx0IGFzIGludGVycG9sYXRlUmRCdSwgc2NoZW1lIGFzIHNjaGVtZVJkQnV9IGZyb20gXCIuL2RpdmVyZ2luZy9SZEJ1LmpzXCI7XG5leHBvcnQge2RlZmF1bHQgYXMgaW50ZXJwb2xhdGVSZEd5LCBzY2hlbWUgYXMgc2NoZW1lUmRHeX0gZnJvbSBcIi4vZGl2ZXJnaW5nL1JkR3kuanNcIjtcbmV4cG9ydCB7ZGVmYXVsdCBhcyBpbnRlcnBvbGF0ZVJkWWxCdSwgc2NoZW1lIGFzIHNjaGVtZVJkWWxCdX0gZnJvbSBcIi4vZGl2ZXJnaW5nL1JkWWxCdS5qc1wiO1xuZXhwb3J0IHtkZWZhdWx0IGFzIGludGVycG9sYXRlUmRZbEduLCBzY2hlbWUgYXMgc2NoZW1lUmRZbEdufSBmcm9tIFwiLi9kaXZlcmdpbmcvUmRZbEduLmpzXCI7XG5leHBvcnQge2RlZmF1bHQgYXMgaW50ZXJwb2xhdGVTcGVjdHJhbCwgc2NoZW1lIGFzIHNjaGVtZVNwZWN0cmFsfSBmcm9tIFwiLi9kaXZlcmdpbmcvU3BlY3RyYWwuanNcIjtcbmV4cG9ydCB7ZGVmYXVsdCBhcyBpbnRlcnBvbGF0ZUJ1R24sIHNjaGVtZSBhcyBzY2hlbWVCdUdufSBmcm9tIFwiLi9zZXF1ZW50aWFsLW11bHRpL0J1R24uanNcIjtcbmV4cG9ydCB7ZGVmYXVsdCBhcyBpbnRlcnBvbGF0ZUJ1UHUsIHNjaGVtZSBhcyBzY2hlbWVCdVB1fSBmcm9tIFwiLi9zZXF1ZW50aWFsLW11bHRpL0J1UHUuanNcIjtcbmV4cG9ydCB7ZGVmYXVsdCBhcyBpbnRlcnBvbGF0ZUduQnUsIHNjaGVtZSBhcyBzY2hlbWVHbkJ1fSBmcm9tIFwiLi9zZXF1ZW50aWFsLW11bHRpL0duQnUuanNcIjtcbmV4cG9ydCB7ZGVmYXVsdCBhcyBpbnRlcnBvbGF0ZU9yUmQsIHNjaGVtZSBhcyBzY2hlbWVPclJkfSBmcm9tIFwiLi9zZXF1ZW50aWFsLW11bHRpL09yUmQuanNcIjtcbmV4cG9ydCB7ZGVmYXVsdCBhcyBpbnRlcnBvbGF0ZVB1QnVHbiwgc2NoZW1lIGFzIHNjaGVtZVB1QnVHbn0gZnJvbSBcIi4vc2VxdWVudGlhbC1tdWx0aS9QdUJ1R24uanNcIjtcbmV4cG9ydCB7ZGVmYXVsdCBhcyBpbnRlcnBvbGF0ZVB1QnUsIHNjaGVtZSBhcyBzY2hlbWVQdUJ1fSBmcm9tIFwiLi9zZXF1ZW50aWFsLW11bHRpL1B1QnUuanNcIjtcbmV4cG9ydCB7ZGVmYXVsdCBhcyBpbnRlcnBvbGF0ZVB1UmQsIHNjaGVtZSBhcyBzY2hlbWVQdVJkfSBmcm9tIFwiLi9zZXF1ZW50aWFsLW11bHRpL1B1UmQuanNcIjtcbmV4cG9ydCB7ZGVmYXVsdCBhcyBpbnRlcnBvbGF0ZVJkUHUsIHNjaGVtZSBhcyBzY2hlbWVSZFB1fSBmcm9tIFwiLi9zZXF1ZW50aWFsLW11bHRpL1JkUHUuanNcIjtcbmV4cG9ydCB7ZGVmYXVsdCBhcyBpbnRlcnBvbGF0ZVlsR25CdSwgc2NoZW1lIGFzIHNjaGVtZVlsR25CdX0gZnJvbSBcIi4vc2VxdWVudGlhbC1tdWx0aS9ZbEduQnUuanNcIjtcbmV4cG9ydCB7ZGVmYXVsdCBhcyBpbnRlcnBvbGF0ZVlsR24sIHNjaGVtZSBhcyBzY2hlbWVZbEdufSBmcm9tIFwiLi9zZXF1ZW50aWFsLW11bHRpL1lsR24uanNcIjtcbmV4cG9ydCB7ZGVmYXVsdCBhcyBpbnRlcnBvbGF0ZVlsT3JCciwgc2NoZW1lIGFzIHNjaGVtZVlsT3JCcn0gZnJvbSBcIi4vc2VxdWVudGlhbC1tdWx0aS9ZbE9yQnIuanNcIjtcbmV4cG9ydCB7ZGVmYXVsdCBhcyBpbnRlcnBvbGF0ZVlsT3JSZCwgc2NoZW1lIGFzIHNjaGVtZVlsT3JSZH0gZnJvbSBcIi4vc2VxdWVudGlhbC1tdWx0aS9ZbE9yUmQuanNcIjtcbmV4cG9ydCB7ZGVmYXVsdCBhcyBpbnRlcnBvbGF0ZUJsdWVzLCBzY2hlbWUgYXMgc2NoZW1lQmx1ZXN9IGZyb20gXCIuL3NlcXVlbnRpYWwtc2luZ2xlL0JsdWVzLmpzXCI7XG5leHBvcnQge2RlZmF1bHQgYXMgaW50ZXJwb2xhdGVHcmVlbnMsIHNjaGVtZSBhcyBzY2hlbWVHcmVlbnN9IGZyb20gXCIuL3NlcXVlbnRpYWwtc2luZ2xlL0dyZWVucy5qc1wiO1xuZXhwb3J0IHtkZWZhdWx0IGFzIGludGVycG9sYXRlR3JleXMsIHNjaGVtZSBhcyBzY2hlbWVHcmV5c30gZnJvbSBcIi4vc2VxdWVudGlhbC1zaW5nbGUvR3JleXMuanNcIjtcbmV4cG9ydCB7ZGVmYXVsdCBhcyBpbnRlcnBvbGF0ZVB1cnBsZXMsIHNjaGVtZSBhcyBzY2hlbWVQdXJwbGVzfSBmcm9tIFwiLi9zZXF1ZW50aWFsLXNpbmdsZS9QdXJwbGVzLmpzXCI7XG5leHBvcnQge2RlZmF1bHQgYXMgaW50ZXJwb2xhdGVSZWRzLCBzY2hlbWUgYXMgc2NoZW1lUmVkc30gZnJvbSBcIi4vc2VxdWVudGlhbC1zaW5nbGUvUmVkcy5qc1wiO1xuZXhwb3J0IHtkZWZhdWx0IGFzIGludGVycG9sYXRlT3Jhbmdlcywgc2NoZW1lIGFzIHNjaGVtZU9yYW5nZXN9IGZyb20gXCIuL3NlcXVlbnRpYWwtc2luZ2xlL09yYW5nZXMuanNcIjtcbmV4cG9ydCB7ZGVmYXVsdCBhcyBpbnRlcnBvbGF0ZUNpdmlkaXN9IGZyb20gXCIuL3NlcXVlbnRpYWwtbXVsdGkvY2l2aWRpcy5qc1wiO1xuZXhwb3J0IHtkZWZhdWx0IGFzIGludGVycG9sYXRlQ3ViZWhlbGl4RGVmYXVsdH0gZnJvbSBcIi4vc2VxdWVudGlhbC1tdWx0aS9jdWJlaGVsaXguanNcIjtcbmV4cG9ydCB7ZGVmYXVsdCBhcyBpbnRlcnBvbGF0ZVJhaW5ib3csIHdhcm0gYXMgaW50ZXJwb2xhdGVXYXJtLCBjb29sIGFzIGludGVycG9sYXRlQ29vbH0gZnJvbSBcIi4vc2VxdWVudGlhbC1tdWx0aS9yYWluYm93LmpzXCI7XG5leHBvcnQge2RlZmF1bHQgYXMgaW50ZXJwb2xhdGVTaW5lYm93fSBmcm9tIFwiLi9zZXF1ZW50aWFsLW11bHRpL3NpbmVib3cuanNcIjtcbmV4cG9ydCB7ZGVmYXVsdCBhcyBpbnRlcnBvbGF0ZVR1cmJvfSBmcm9tIFwiLi9zZXF1ZW50aWFsLW11bHRpL3R1cmJvLmpzXCI7XG5leHBvcnQge2RlZmF1bHQgYXMgaW50ZXJwb2xhdGVWaXJpZGlzLCBtYWdtYSBhcyBpbnRlcnBvbGF0ZU1hZ21hLCBpbmZlcm5vIGFzIGludGVycG9sYXRlSW5mZXJubywgcGxhc21hIGFzIGludGVycG9sYXRlUGxhc21hfSBmcm9tIFwiLi9zZXF1ZW50aWFsLW11bHRpL3ZpcmlkaXMuanNcIjtcbiIsImltcG9ydCB7aW50ZXJwb2xhdGVSZ2JCYXNpc30gZnJvbSBcImQzLWludGVycG9sYXRlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHNjaGVtZSkge1xuICByZXR1cm4gaW50ZXJwb2xhdGVSZ2JCYXNpcyhzY2hlbWVbc2NoZW1lLmxlbmd0aCAtIDFdKTtcbn1cbiIsImltcG9ydCBjb2xvcnMgZnJvbSBcIi4uL2NvbG9ycy5qc1wiO1xuaW1wb3J0IHJhbXAgZnJvbSBcIi4uL3JhbXAuanNcIjtcblxuZXhwb3J0IHZhciBzY2hlbWUgPSBuZXcgQXJyYXkoMykuY29uY2F0KFxuICBcImU1ZjVmOTk5ZDhjOTJjYTI1ZlwiLFxuICBcImVkZjhmYmIyZTJlMjY2YzJhNDIzOGI0NVwiLFxuICBcImVkZjhmYmIyZTJlMjY2YzJhNDJjYTI1ZjAwNmQyY1wiLFxuICBcImVkZjhmYmNjZWNlNjk5ZDhjOTY2YzJhNDJjYTI1ZjAwNmQyY1wiLFxuICBcImVkZjhmYmNjZWNlNjk5ZDhjOTY2YzJhNDQxYWU3NjIzOGI0NTAwNTgyNFwiLFxuICBcImY3ZmNmZGU1ZjVmOWNjZWNlNjk5ZDhjOTY2YzJhNDQxYWU3NjIzOGI0NTAwNTgyNFwiLFxuICBcImY3ZmNmZGU1ZjVmOWNjZWNlNjk5ZDhjOTY2YzJhNDQxYWU3NjIzOGI0NTAwNmQyYzAwNDQxYlwiXG4pLm1hcChjb2xvcnMpO1xuXG5leHBvcnQgZGVmYXVsdCByYW1wKHNjaGVtZSk7XG4iLCJpbXBvcnQgY29sb3JzIGZyb20gXCIuLi9jb2xvcnMuanNcIjtcbmltcG9ydCByYW1wIGZyb20gXCIuLi9yYW1wLmpzXCI7XG5cbmV4cG9ydCB2YXIgc2NoZW1lID0gbmV3IEFycmF5KDMpLmNvbmNhdChcbiAgXCJlMGVjZjQ5ZWJjZGE4ODU2YTdcIixcbiAgXCJlZGY4ZmJiM2NkZTM4Yzk2YzY4ODQxOWRcIixcbiAgXCJlZGY4ZmJiM2NkZTM4Yzk2YzY4ODU2YTc4MTBmN2NcIixcbiAgXCJlZGY4ZmJiZmQzZTY5ZWJjZGE4Yzk2YzY4ODU2YTc4MTBmN2NcIixcbiAgXCJlZGY4ZmJiZmQzZTY5ZWJjZGE4Yzk2YzY4YzZiYjE4ODQxOWQ2ZTAxNmJcIixcbiAgXCJmN2ZjZmRlMGVjZjRiZmQzZTY5ZWJjZGE4Yzk2YzY4YzZiYjE4ODQxOWQ2ZTAxNmJcIixcbiAgXCJmN2ZjZmRlMGVjZjRiZmQzZTY5ZWJjZGE4Yzk2YzY4YzZiYjE4ODQxOWQ4MTBmN2M0ZDAwNGJcIlxuKS5tYXAoY29sb3JzKTtcblxuZXhwb3J0IGRlZmF1bHQgcmFtcChzY2hlbWUpO1xuIiwiaW1wb3J0IGNvbG9ycyBmcm9tIFwiLi4vY29sb3JzLmpzXCI7XG5pbXBvcnQgcmFtcCBmcm9tIFwiLi4vcmFtcC5qc1wiO1xuXG5leHBvcnQgdmFyIHNjaGVtZSA9IG5ldyBBcnJheSgzKS5jb25jYXQoXG4gIFwiZTBmM2RiYThkZGI1NDNhMmNhXCIsXG4gIFwiZjBmOWU4YmFlNGJjN2JjY2M0MmI4Y2JlXCIsXG4gIFwiZjBmOWU4YmFlNGJjN2JjY2M0NDNhMmNhMDg2OGFjXCIsXG4gIFwiZjBmOWU4Y2NlYmM1YThkZGI1N2JjY2M0NDNhMmNhMDg2OGFjXCIsXG4gIFwiZjBmOWU4Y2NlYmM1YThkZGI1N2JjY2M0NGViM2QzMmI4Y2JlMDg1ODllXCIsXG4gIFwiZjdmY2YwZTBmM2RiY2NlYmM1YThkZGI1N2JjY2M0NGViM2QzMmI4Y2JlMDg1ODllXCIsXG4gIFwiZjdmY2YwZTBmM2RiY2NlYmM1YThkZGI1N2JjY2M0NGViM2QzMmI4Y2JlMDg2OGFjMDg0MDgxXCJcbikubWFwKGNvbG9ycyk7XG5cbmV4cG9ydCBkZWZhdWx0IHJhbXAoc2NoZW1lKTtcbiIsImltcG9ydCBjb2xvcnMgZnJvbSBcIi4uL2NvbG9ycy5qc1wiO1xuaW1wb3J0IHJhbXAgZnJvbSBcIi4uL3JhbXAuanNcIjtcblxuZXhwb3J0IHZhciBzY2hlbWUgPSBuZXcgQXJyYXkoMykuY29uY2F0KFxuICBcImZlZThjOGZkYmI4NGUzNGEzM1wiLFxuICBcImZlZjBkOWZkY2M4YWZjOGQ1OWQ3MzAxZlwiLFxuICBcImZlZjBkOWZkY2M4YWZjOGQ1OWUzNGEzM2IzMDAwMFwiLFxuICBcImZlZjBkOWZkZDQ5ZWZkYmI4NGZjOGQ1OWUzNGEzM2IzMDAwMFwiLFxuICBcImZlZjBkOWZkZDQ5ZWZkYmI4NGZjOGQ1OWVmNjU0OGQ3MzAxZjk5MDAwMFwiLFxuICBcImZmZjdlY2ZlZThjOGZkZDQ5ZWZkYmI4NGZjOGQ1OWVmNjU0OGQ3MzAxZjk5MDAwMFwiLFxuICBcImZmZjdlY2ZlZThjOGZkZDQ5ZWZkYmI4NGZjOGQ1OWVmNjU0OGQ3MzAxZmIzMDAwMDdmMDAwMFwiXG4pLm1hcChjb2xvcnMpO1xuXG5leHBvcnQgZGVmYXVsdCByYW1wKHNjaGVtZSk7XG4iLCJpbXBvcnQgY29sb3JzIGZyb20gXCIuLi9jb2xvcnMuanNcIjtcbmltcG9ydCByYW1wIGZyb20gXCIuLi9yYW1wLmpzXCI7XG5cbmV4cG9ydCB2YXIgc2NoZW1lID0gbmV3IEFycmF5KDMpLmNvbmNhdChcbiAgXCJlY2U3ZjJhNmJkZGIyYjhjYmVcIixcbiAgXCJmMWVlZjZiZGM5ZTE3NGE5Y2YwNTcwYjBcIixcbiAgXCJmMWVlZjZiZGM5ZTE3NGE5Y2YyYjhjYmUwNDVhOGRcIixcbiAgXCJmMWVlZjZkMGQxZTZhNmJkZGI3NGE5Y2YyYjhjYmUwNDVhOGRcIixcbiAgXCJmMWVlZjZkMGQxZTZhNmJkZGI3NGE5Y2YzNjkwYzAwNTcwYjAwMzRlN2JcIixcbiAgXCJmZmY3ZmJlY2U3ZjJkMGQxZTZhNmJkZGI3NGE5Y2YzNjkwYzAwNTcwYjAwMzRlN2JcIixcbiAgXCJmZmY3ZmJlY2U3ZjJkMGQxZTZhNmJkZGI3NGE5Y2YzNjkwYzAwNTcwYjAwNDVhOGQwMjM4NThcIlxuKS5tYXAoY29sb3JzKTtcblxuZXhwb3J0IGRlZmF1bHQgcmFtcChzY2hlbWUpO1xuIiwiaW1wb3J0IGNvbG9ycyBmcm9tIFwiLi4vY29sb3JzLmpzXCI7XG5pbXBvcnQgcmFtcCBmcm9tIFwiLi4vcmFtcC5qc1wiO1xuXG5leHBvcnQgdmFyIHNjaGVtZSA9IG5ldyBBcnJheSgzKS5jb25jYXQoXG4gIFwiZWNlMmYwYTZiZGRiMWM5MDk5XCIsXG4gIFwiZjZlZmY3YmRjOWUxNjdhOWNmMDI4MThhXCIsXG4gIFwiZjZlZmY3YmRjOWUxNjdhOWNmMWM5MDk5MDE2YzU5XCIsXG4gIFwiZjZlZmY3ZDBkMWU2YTZiZGRiNjdhOWNmMWM5MDk5MDE2YzU5XCIsXG4gIFwiZjZlZmY3ZDBkMWU2YTZiZGRiNjdhOWNmMzY5MGMwMDI4MThhMDE2NDUwXCIsXG4gIFwiZmZmN2ZiZWNlMmYwZDBkMWU2YTZiZGRiNjdhOWNmMzY5MGMwMDI4MThhMDE2NDUwXCIsXG4gIFwiZmZmN2ZiZWNlMmYwZDBkMWU2YTZiZGRiNjdhOWNmMzY5MGMwMDI4MThhMDE2YzU5MDE0NjM2XCJcbikubWFwKGNvbG9ycyk7XG5cbmV4cG9ydCBkZWZhdWx0IHJhbXAoc2NoZW1lKTtcbiIsImltcG9ydCBjb2xvcnMgZnJvbSBcIi4uL2NvbG9ycy5qc1wiO1xuaW1wb3J0IHJhbXAgZnJvbSBcIi4uL3JhbXAuanNcIjtcblxuZXhwb3J0IHZhciBzY2hlbWUgPSBuZXcgQXJyYXkoMykuY29uY2F0KFxuICBcImU3ZTFlZmM5OTRjN2RkMWM3N1wiLFxuICBcImYxZWVmNmQ3YjVkOGRmNjViMGNlMTI1NlwiLFxuICBcImYxZWVmNmQ3YjVkOGRmNjViMGRkMWM3Nzk4MDA0M1wiLFxuICBcImYxZWVmNmQ0YjlkYWM5OTRjN2RmNjViMGRkMWM3Nzk4MDA0M1wiLFxuICBcImYxZWVmNmQ0YjlkYWM5OTRjN2RmNjViMGU3Mjk4YWNlMTI1NjkxMDAzZlwiLFxuICBcImY3ZjRmOWU3ZTFlZmQ0YjlkYWM5OTRjN2RmNjViMGU3Mjk4YWNlMTI1NjkxMDAzZlwiLFxuICBcImY3ZjRmOWU3ZTFlZmQ0YjlkYWM5OTRjN2RmNjViMGU3Mjk4YWNlMTI1Njk4MDA0MzY3MDAxZlwiXG4pLm1hcChjb2xvcnMpO1xuXG5leHBvcnQgZGVmYXVsdCByYW1wKHNjaGVtZSk7XG4iLCJpbXBvcnQgY29sb3JzIGZyb20gXCIuLi9jb2xvcnMuanNcIjtcbmltcG9ydCByYW1wIGZyb20gXCIuLi9yYW1wLmpzXCI7XG5cbmV4cG9ydCB2YXIgc2NoZW1lID0gbmV3IEFycmF5KDMpLmNvbmNhdChcbiAgXCJmZGUwZGRmYTlmYjVjNTFiOGFcIixcbiAgXCJmZWViZTJmYmI0YjlmNzY4YTFhZTAxN2VcIixcbiAgXCJmZWViZTJmYmI0YjlmNzY4YTFjNTFiOGE3YTAxNzdcIixcbiAgXCJmZWViZTJmY2M1YzBmYTlmYjVmNzY4YTFjNTFiOGE3YTAxNzdcIixcbiAgXCJmZWViZTJmY2M1YzBmYTlmYjVmNzY4YTFkZDM0OTdhZTAxN2U3YTAxNzdcIixcbiAgXCJmZmY3ZjNmZGUwZGRmY2M1YzBmYTlmYjVmNzY4YTFkZDM0OTdhZTAxN2U3YTAxNzdcIixcbiAgXCJmZmY3ZjNmZGUwZGRmY2M1YzBmYTlmYjVmNzY4YTFkZDM0OTdhZTAxN2U3YTAxNzc0OTAwNmFcIlxuKS5tYXAoY29sb3JzKTtcblxuZXhwb3J0IGRlZmF1bHQgcmFtcChzY2hlbWUpO1xuIiwiaW1wb3J0IGNvbG9ycyBmcm9tIFwiLi4vY29sb3JzLmpzXCI7XG5pbXBvcnQgcmFtcCBmcm9tIFwiLi4vcmFtcC5qc1wiO1xuXG5leHBvcnQgdmFyIHNjaGVtZSA9IG5ldyBBcnJheSgzKS5jb25jYXQoXG4gIFwiZjdmY2I5YWRkZDhlMzFhMzU0XCIsXG4gIFwiZmZmZmNjYzJlNjk5NzhjNjc5MjM4NDQzXCIsXG4gIFwiZmZmZmNjYzJlNjk5NzhjNjc5MzFhMzU0MDA2ODM3XCIsXG4gIFwiZmZmZmNjZDlmMGEzYWRkZDhlNzhjNjc5MzFhMzU0MDA2ODM3XCIsXG4gIFwiZmZmZmNjZDlmMGEzYWRkZDhlNzhjNjc5NDFhYjVkMjM4NDQzMDA1YTMyXCIsXG4gIFwiZmZmZmU1ZjdmY2I5ZDlmMGEzYWRkZDhlNzhjNjc5NDFhYjVkMjM4NDQzMDA1YTMyXCIsXG4gIFwiZmZmZmU1ZjdmY2I5ZDlmMGEzYWRkZDhlNzhjNjc5NDFhYjVkMjM4NDQzMDA2ODM3MDA0NTI5XCJcbikubWFwKGNvbG9ycyk7XG5cbmV4cG9ydCBkZWZhdWx0IHJhbXAoc2NoZW1lKTtcbiIsImltcG9ydCBjb2xvcnMgZnJvbSBcIi4uL2NvbG9ycy5qc1wiO1xuaW1wb3J0IHJhbXAgZnJvbSBcIi4uL3JhbXAuanNcIjtcblxuZXhwb3J0IHZhciBzY2hlbWUgPSBuZXcgQXJyYXkoMykuY29uY2F0KFxuICBcImVkZjhiMTdmY2RiYjJjN2ZiOFwiLFxuICBcImZmZmZjY2ExZGFiNDQxYjZjNDIyNWVhOFwiLFxuICBcImZmZmZjY2ExZGFiNDQxYjZjNDJjN2ZiODI1MzQ5NFwiLFxuICBcImZmZmZjY2M3ZTliNDdmY2RiYjQxYjZjNDJjN2ZiODI1MzQ5NFwiLFxuICBcImZmZmZjY2M3ZTliNDdmY2RiYjQxYjZjNDFkOTFjMDIyNWVhODBjMmM4NFwiLFxuICBcImZmZmZkOWVkZjhiMWM3ZTliNDdmY2RiYjQxYjZjNDFkOTFjMDIyNWVhODBjMmM4NFwiLFxuICBcImZmZmZkOWVkZjhiMWM3ZTliNDdmY2RiYjQxYjZjNDFkOTFjMDIyNWVhODI1MzQ5NDA4MWQ1OFwiXG4pLm1hcChjb2xvcnMpO1xuXG5leHBvcnQgZGVmYXVsdCByYW1wKHNjaGVtZSk7XG4iLCJpbXBvcnQgY29sb3JzIGZyb20gXCIuLi9jb2xvcnMuanNcIjtcbmltcG9ydCByYW1wIGZyb20gXCIuLi9yYW1wLmpzXCI7XG5cbmV4cG9ydCB2YXIgc2NoZW1lID0gbmV3IEFycmF5KDMpLmNvbmNhdChcbiAgXCJmZmY3YmNmZWM0NGZkOTVmMGVcIixcbiAgXCJmZmZmZDRmZWQ5OGVmZTk5MjljYzRjMDJcIixcbiAgXCJmZmZmZDRmZWQ5OGVmZTk5MjlkOTVmMGU5OTM0MDRcIixcbiAgXCJmZmZmZDRmZWUzOTFmZWM0NGZmZTk5MjlkOTVmMGU5OTM0MDRcIixcbiAgXCJmZmZmZDRmZWUzOTFmZWM0NGZmZTk5MjllYzcwMTRjYzRjMDI4YzJkMDRcIixcbiAgXCJmZmZmZTVmZmY3YmNmZWUzOTFmZWM0NGZmZTk5MjllYzcwMTRjYzRjMDI4YzJkMDRcIixcbiAgXCJmZmZmZTVmZmY3YmNmZWUzOTFmZWM0NGZmZTk5MjllYzcwMTRjYzRjMDI5OTM0MDQ2NjI1MDZcIlxuKS5tYXAoY29sb3JzKTtcblxuZXhwb3J0IGRlZmF1bHQgcmFtcChzY2hlbWUpO1xuIiwiaW1wb3J0IGNvbG9ycyBmcm9tIFwiLi4vY29sb3JzLmpzXCI7XG5pbXBvcnQgcmFtcCBmcm9tIFwiLi4vcmFtcC5qc1wiO1xuXG5leHBvcnQgdmFyIHNjaGVtZSA9IG5ldyBBcnJheSgzKS5jb25jYXQoXG4gIFwiZmZlZGEwZmViMjRjZjAzYjIwXCIsXG4gIFwiZmZmZmIyZmVjYzVjZmQ4ZDNjZTMxYTFjXCIsXG4gIFwiZmZmZmIyZmVjYzVjZmQ4ZDNjZjAzYjIwYmQwMDI2XCIsXG4gIFwiZmZmZmIyZmVkOTc2ZmViMjRjZmQ4ZDNjZjAzYjIwYmQwMDI2XCIsXG4gIFwiZmZmZmIyZmVkOTc2ZmViMjRjZmQ4ZDNjZmM0ZTJhZTMxYTFjYjEwMDI2XCIsXG4gIFwiZmZmZmNjZmZlZGEwZmVkOTc2ZmViMjRjZmQ4ZDNjZmM0ZTJhZTMxYTFjYjEwMDI2XCIsXG4gIFwiZmZmZmNjZmZlZGEwZmVkOTc2ZmViMjRjZmQ4ZDNjZmM0ZTJhZTMxYTFjYmQwMDI2ODAwMDI2XCJcbikubWFwKGNvbG9ycyk7XG5cbmV4cG9ydCBkZWZhdWx0IHJhbXAoc2NoZW1lKTtcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHQpIHtcbiAgdCA9IE1hdGgubWF4KDAsIE1hdGgubWluKDEsIHQpKTtcbiAgcmV0dXJuIFwicmdiKFwiXG4gICAgICArIE1hdGgubWF4KDAsIE1hdGgubWluKDI1NSwgTWF0aC5yb3VuZCgtNC41NCAtIHQgKiAoMzUuMzQgLSB0ICogKDIzODEuNzMgLSB0ICogKDY0MDIuNyAtIHQgKiAoNzAyNC43MiAtIHQgKiAyNzEwLjU3KSkpKSkpKSArIFwiLCBcIlxuICAgICAgKyBNYXRoLm1heCgwLCBNYXRoLm1pbigyNTUsIE1hdGgucm91bmQoMzIuNDkgKyB0ICogKDE3MC43MyArIHQgKiAoNTIuODIgLSB0ICogKDEzMS40NiAtIHQgKiAoMTc2LjU4IC0gdCAqIDY3LjM3KSkpKSkpKSArIFwiLCBcIlxuICAgICAgKyBNYXRoLm1heCgwLCBNYXRoLm1pbigyNTUsIE1hdGgucm91bmQoODEuMjQgKyB0ICogKDQ0Mi4zNiAtIHQgKiAoMjQ4Mi40MyAtIHQgKiAoNjE2Ny4yNCAtIHQgKiAoNjYxNC45NCAtIHQgKiAyNDc1LjY3KSkpKSkpKVxuICAgICAgKyBcIilcIjtcbn1cbiIsImltcG9ydCB7Y3ViZWhlbGl4fSBmcm9tIFwiZDMtY29sb3JcIjtcbmltcG9ydCB7aW50ZXJwb2xhdGVDdWJlaGVsaXhMb25nfSBmcm9tIFwiZDMtaW50ZXJwb2xhdGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgaW50ZXJwb2xhdGVDdWJlaGVsaXhMb25nKGN1YmVoZWxpeCgzMDAsIDAuNSwgMC4wKSwgY3ViZWhlbGl4KC0yNDAsIDAuNSwgMS4wKSk7XG4iLCJpbXBvcnQge2N1YmVoZWxpeH0gZnJvbSBcImQzLWNvbG9yXCI7XG5pbXBvcnQge2ludGVycG9sYXRlQ3ViZWhlbGl4TG9uZ30gZnJvbSBcImQzLWludGVycG9sYXRlXCI7XG5cbmV4cG9ydCB2YXIgd2FybSA9IGludGVycG9sYXRlQ3ViZWhlbGl4TG9uZyhjdWJlaGVsaXgoLTEwMCwgMC43NSwgMC4zNSksIGN1YmVoZWxpeCg4MCwgMS41MCwgMC44KSk7XG5cbmV4cG9ydCB2YXIgY29vbCA9IGludGVycG9sYXRlQ3ViZWhlbGl4TG9uZyhjdWJlaGVsaXgoMjYwLCAwLjc1LCAwLjM1KSwgY3ViZWhlbGl4KDgwLCAxLjUwLCAwLjgpKTtcblxudmFyIGMgPSBjdWJlaGVsaXgoKTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24odCkge1xuICBpZiAodCA8IDAgfHwgdCA+IDEpIHQgLT0gTWF0aC5mbG9vcih0KTtcbiAgdmFyIHRzID0gTWF0aC5hYnModCAtIDAuNSk7XG4gIGMuaCA9IDM2MCAqIHQgLSAxMDA7XG4gIGMucyA9IDEuNSAtIDEuNSAqIHRzO1xuICBjLmwgPSAwLjggLSAwLjkgKiB0cztcbiAgcmV0dXJuIGMgKyBcIlwiO1xufVxuIiwiaW1wb3J0IHtyZ2J9IGZyb20gXCJkMy1jb2xvclwiO1xuXG52YXIgYyA9IHJnYigpLFxuICAgIHBpXzFfMyA9IE1hdGguUEkgLyAzLFxuICAgIHBpXzJfMyA9IE1hdGguUEkgKiAyIC8gMztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24odCkge1xuICB2YXIgeDtcbiAgdCA9ICgwLjUgLSB0KSAqIE1hdGguUEk7XG4gIGMuciA9IDI1NSAqICh4ID0gTWF0aC5zaW4odCkpICogeDtcbiAgYy5nID0gMjU1ICogKHggPSBNYXRoLnNpbih0ICsgcGlfMV8zKSkgKiB4O1xuICBjLmIgPSAyNTUgKiAoeCA9IE1hdGguc2luKHQgKyBwaV8yXzMpKSAqIHg7XG4gIHJldHVybiBjICsgXCJcIjtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHQpIHtcbiAgdCA9IE1hdGgubWF4KDAsIE1hdGgubWluKDEsIHQpKTtcbiAgcmV0dXJuIFwicmdiKFwiXG4gICAgICArIE1hdGgubWF4KDAsIE1hdGgubWluKDI1NSwgTWF0aC5yb3VuZCgzNC42MSArIHQgKiAoMTE3Mi4zMyAtIHQgKiAoMTA3OTMuNTYgLSB0ICogKDMzMzAwLjEyIC0gdCAqICgzODM5NC40OSAtIHQgKiAxNDgyNS4wNSkpKSkpKSkgKyBcIiwgXCJcbiAgICAgICsgTWF0aC5tYXgoMCwgTWF0aC5taW4oMjU1LCBNYXRoLnJvdW5kKDIzLjMxICsgdCAqICg1NTcuMzMgKyB0ICogKDEyMjUuMzMgLSB0ICogKDM1NzQuOTYgLSB0ICogKDEwNzMuNzcgKyB0ICogNzA3LjU2KSkpKSkpKSArIFwiLCBcIlxuICAgICAgKyBNYXRoLm1heCgwLCBNYXRoLm1pbigyNTUsIE1hdGgucm91bmQoMjcuMiArIHQgKiAoMzIxMS4xIC0gdCAqICgxNTMyNy45NyAtIHQgKiAoMjc4MTQgLSB0ICogKDIyNTY5LjE4IC0gdCAqIDY4MzguNjYpKSkpKSkpXG4gICAgICArIFwiKVwiO1xufVxuIiwiaW1wb3J0IGNvbG9ycyBmcm9tIFwiLi4vY29sb3JzLmpzXCI7XG5cbmZ1bmN0aW9uIHJhbXAocmFuZ2UpIHtcbiAgdmFyIG4gPSByYW5nZS5sZW5ndGg7XG4gIHJldHVybiBmdW5jdGlvbih0KSB7XG4gICAgcmV0dXJuIHJhbmdlW01hdGgubWF4KDAsIE1hdGgubWluKG4gLSAxLCBNYXRoLmZsb29yKHQgKiBuKSkpXTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgcmFtcChjb2xvcnMoXCI0NDAxNTQ0NDAyNTY0NTA0NTc0NTA1NTk0NjA3NWE0NjA4NWM0NjBhNWQ0NjBiNWU0NzBkNjA0NzBlNjE0NzEwNjM0NzExNjQ0NzEzNjU0ODE0Njc0ODE2Njg0ODE3Njk0ODE4NmE0ODFhNmM0ODFiNmQ0ODFjNmU0ODFkNmY0ODFmNzA0ODIwNzE0ODIxNzM0ODIzNzQ0ODI0NzU0ODI1NzY0ODI2Nzc0ODI4Nzg0ODI5Nzk0NzJhN2E0NzJjN2E0NzJkN2I0NzJlN2M0NzJmN2Q0NjMwN2U0NjMyN2U0NjMzN2Y0NjM0ODA0NTM1ODE0NTM3ODE0NTM4ODI0NDM5ODM0NDNhODM0NDNiODQ0MzNkODQ0MzNlODU0MjNmODU0MjQwODY0MjQxODY0MTQyODc0MTQ0ODc0MDQ1ODg0MDQ2ODgzZjQ3ODgzZjQ4ODkzZTQ5ODkzZTRhODkzZTRjOGEzZDRkOGEzZDRlOGEzYzRmOGEzYzUwOGIzYjUxOGIzYjUyOGIzYTUzOGIzYTU0OGMzOTU1OGMzOTU2OGMzODU4OGMzODU5OGMzNzVhOGMzNzViOGQzNjVjOGQzNjVkOGQzNTVlOGQzNTVmOGQzNDYwOGQzNDYxOGQzMzYyOGQzMzYzOGQzMjY0OGUzMjY1OGUzMTY2OGUzMTY3OGUzMTY4OGUzMDY5OGUzMDZhOGUyZjZiOGUyZjZjOGUyZTZkOGUyZTZlOGUyZTZmOGUyZDcwOGUyZDcxOGUyYzcxOGUyYzcyOGUyYzczOGUyYjc0OGUyYjc1OGUyYTc2OGUyYTc3OGUyYTc4OGUyOTc5OGUyOTdhOGUyOTdiOGUyODdjOGUyODdkOGUyNzdlOGUyNzdmOGUyNzgwOGUyNjgxOGUyNjgyOGUyNjgyOGUyNTgzOGUyNTg0OGUyNTg1OGUyNDg2OGUyNDg3OGUyMzg4OGUyMzg5OGUyMzhhOGQyMjhiOGQyMjhjOGQyMjhkOGQyMThlOGQyMThmOGQyMTkwOGQyMTkxOGMyMDkyOGMyMDkyOGMyMDkzOGMxZjk0OGMxZjk1OGIxZjk2OGIxZjk3OGIxZjk4OGIxZjk5OGExZjlhOGExZTliOGExZTljODkxZTlkODkxZjllODkxZjlmODgxZmEwODgxZmExODgxZmExODcxZmEyODcyMGEzODYyMGE0ODYyMWE1ODUyMWE2ODUyMmE3ODUyMmE4ODQyM2E5ODMyNGFhODMyNWFiODIyNWFjODIyNmFkODEyN2FkODEyOGFlODAyOWFmN2YyYWIwN2YyY2IxN2UyZGIyN2QyZWIzN2MyZmI0N2MzMWI1N2IzMmI2N2EzNGI2NzkzNWI3NzkzN2I4NzgzOGI5NzczYWJhNzYzYmJiNzUzZGJjNzQzZmJjNzM0MGJkNzI0MmJlNzE0NGJmNzA0NmMwNmY0OGMxNmU0YWMxNmQ0Y2MyNmM0ZWMzNmI1MGM0NmE1MmM1Njk1NGM1Njg1NmM2Njc1OGM3NjU1YWM4NjQ1Y2M4NjM1ZWM5NjI2MGNhNjA2M2NiNWY2NWNiNWU2N2NjNWM2OWNkNWI2Y2NkNWE2ZWNlNTg3MGNmNTc3M2QwNTY3NWQwNTQ3N2QxNTM3YWQxNTE3Y2QyNTA3ZmQzNGU4MWQzNGQ4NGQ0NGI4NmQ1NDk4OWQ1NDg4YmQ2NDY4ZWQ2NDU5MGQ3NDM5M2Q3NDE5NWQ4NDA5OGQ4M2U5YmQ5M2M5ZGQ5M2JhMGRhMzlhMmRhMzdhNWRiMzZhOGRiMzRhYWRjMzJhZGRjMzBiMGRkMmZiMmRkMmRiNWRlMmJiOGRlMjliYWRlMjhiZGRmMjZjMGRmMjVjMmRmMjNjNWUwMjFjOGUwMjBjYWUxMWZjZGUxMWRkMGUxMWNkMmUyMWJkNWUyMWFkOGUyMTlkYWUzMTlkZGUzMThkZmUzMThlMmU0MThlNWU0MTllN2U0MTllYWU1MWFlY2U1MWJlZmU1MWNmMWU1MWRmNGU2MWVmNmU2MjBmOGU2MjFmYmU3MjNmZGU3MjVcIikpO1xuXG5leHBvcnQgdmFyIG1hZ21hID0gcmFtcChjb2xvcnMoXCIwMDAwMDQwMTAwMDUwMTAxMDYwMTAxMDgwMjAxMDkwMjAyMGIwMjAyMGQwMzAzMGYwMzAzMTIwNDA0MTQwNTA0MTYwNjA1MTgwNjA1MWEwNzA2MWMwODA3MWUwOTA3MjAwYTA4MjIwYjA5MjQwYzA5MjYwZDBhMjkwZTBiMmIxMDBiMmQxMTBjMmYxMjBkMzExMzBkMzQxNDBlMzYxNTBlMzgxNjBmM2IxODBmM2QxOTEwM2YxYTEwNDIxYzEwNDQxZDExNDcxZTExNDkyMDExNGIyMTExNGUyMjExNTAyNDEyNTMyNTEyNTUyNzEyNTgyOTExNWEyYTExNWMyYzExNWYyZDExNjEyZjExNjMzMTExNjUzMzEwNjczNDEwNjkzNjEwNmIzODEwNmMzOTBmNmUzYjBmNzAzZDBmNzEzZjBmNzI0MDBmNzQ0MjBmNzU0NDBmNzY0NTEwNzc0NzEwNzg0OTEwNzg0YTEwNzk0YzExN2E0ZTExN2I0ZjEyN2I1MTEyN2M1MjEzN2M1NDEzN2Q1NjE0N2Q1NzE1N2U1OTE1N2U1YTE2N2U1YzE2N2Y1ZDE3N2Y1ZjE4N2Y2MDE4ODA2MjE5ODA2NDFhODA2NTFhODA2NzFiODA2ODFjODE2YTFjODE2YjFkODE2ZDFkODE2ZTFlODE3MDFmODE3MjFmODE3MzIwODE3NTIxODE3NjIxODE3ODIyODE3OTIyODI3YjIzODI3YzIzODI3ZTI0ODI4MDI1ODI4MTI1ODE4MzI2ODE4NDI2ODE4NjI3ODE4ODI3ODE4OTI4ODE4YjI5ODE4YzI5ODE4ZTJhODE5MDJhODE5MTJiODE5MzJiODA5NDJjODA5NjJjODA5ODJkODA5OTJkODA5YjJlN2Y5YzJlN2Y5ZTJmN2ZhMDJmN2ZhMTMwN2VhMzMwN2VhNTMxN2VhNjMxN2RhODMyN2RhYTMzN2RhYjMzN2NhZDM0N2NhZTM0N2JiMDM1N2JiMjM1N2JiMzM2N2FiNTM2N2FiNzM3NzliODM3NzliYTM4NzhiYzM5NzhiZDM5NzdiZjNhNzdjMDNhNzZjMjNiNzVjNDNjNzVjNTNjNzRjNzNkNzNjODNlNzNjYTNlNzJjYzNmNzFjZDQwNzFjZjQwNzBkMDQxNmZkMjQyNmZkMzQzNmVkNTQ0NmRkNjQ1NmNkODQ1NmNkOTQ2NmJkYjQ3NmFkYzQ4NjlkZTQ5NjhkZjRhNjhlMDRjNjdlMjRkNjZlMzRlNjVlNDRmNjRlNTUwNjRlNzUyNjNlODUzNjJlOTU0NjJlYTU2NjFlYjU3NjBlYzU4NjBlZDVhNWZlZTViNWVlZjVkNWVmMDVmNWVmMTYwNWRmMjYyNWRmMjY0NWNmMzY1NWNmNDY3NWNmNDY5NWNmNTZiNWNmNjZjNWNmNjZlNWNmNzcwNWNmNzcyNWNmODc0NWNmODc2NWNmOTc4NWRmOTc5NWRmOTdiNWRmYTdkNWVmYTdmNWVmYTgxNWZmYjgzNWZmYjg1NjBmYjg3NjFmYzg5NjFmYzhhNjJmYzhjNjNmYzhlNjRmYzkwNjVmZDkyNjZmZDk0NjdmZDk2NjhmZDk4NjlmZDlhNmFmZDliNmJmZTlkNmNmZTlmNmRmZWExNmVmZWEzNmZmZWE1NzFmZWE3NzJmZWE5NzNmZWFhNzRmZWFjNzZmZWFlNzdmZWIwNzhmZWIyN2FmZWI0N2JmZWI2N2NmZWI3N2VmZWI5N2ZmZWJiODFmZWJkODJmZWJmODRmZWMxODVmZWMyODdmZWM0ODhmZWM2OGFmZWM4OGNmZWNhOGRmZWNjOGZmZWNkOTBmZWNmOTJmZWQxOTRmZWQzOTVmZWQ1OTdmZWQ3OTlmZWQ4OWFmZGRhOWNmZGRjOWVmZGRlYTBmZGUwYTFmZGUyYTNmZGUzYTVmZGU1YTdmZGU3YTlmZGU5YWFmZGViYWNmY2VjYWVmY2VlYjBmY2YwYjJmY2YyYjRmY2Y0YjZmY2Y2YjhmY2Y3YjlmY2Y5YmJmY2ZiYmRmY2ZkYmZcIikpO1xuXG5leHBvcnQgdmFyIGluZmVybm8gPSByYW1wKGNvbG9ycyhcIjAwMDAwNDAxMDAwNTAxMDEwNjAxMDEwODAyMDEwYTAyMDIwYzAyMDIwZTAzMDIxMDA0MDMxMjA0MDMxNDA1MDQxNzA2MDQxOTA3MDUxYjA4MDUxZDA5MDYxZjBhMDcyMjBiMDcyNDBjMDgyNjBkMDgyOTBlMDkyYjEwMDkyZDExMGEzMDEyMGEzMjE0MGIzNDE1MGIzNzE2MGIzOTE4MGMzYzE5MGMzZTFiMGM0MTFjMGM0MzFlMGM0NTFmMGM0ODIxMGM0YTIzMGM0YzI0MGM0ZjI2MGM1MTI4MGI1MzI5MGI1NTJiMGI1NzJkMGI1OTJmMGE1YjMxMGE1YzMyMGE1ZTM0MGE1ZjM2MDk2MTM4MDk2MjM5MDk2MzNiMDk2NDNkMDk2NTNlMDk2NjQwMGE2NzQyMGE2ODQ0MGE2ODQ1MGE2OTQ3MGI2YTQ5MGI2YTRhMGM2YjRjMGM2YjRkMGQ2YzRmMGQ2YzUxMGU2YzUyMGU2ZDU0MGY2ZDU1MGY2ZDU3MTA2ZTU5MTA2ZTVhMTE2ZTVjMTI2ZTVkMTI2ZTVmMTM2ZTYxMTM2ZTYyMTQ2ZTY0MTU2ZTY1MTU2ZTY3MTY2ZTY5MTY2ZTZhMTc2ZTZjMTg2ZTZkMTg2ZTZmMTk2ZTcxMTk2ZTcyMWE2ZTc0MWE2ZTc1MWI2ZTc3MWM2ZDc4MWM2ZDdhMWQ2ZDdjMWQ2ZDdkMWU2ZDdmMWU2YzgwMWY2YzgyMjA2Yzg0MjA2Yjg1MjE2Yjg3MjE2Yjg4MjI2YThhMjI2YThjMjM2OThkMjM2OThmMjQ2OTkwMjU2ODkyMjU2ODkzMjY2Nzk1MjY2Nzk3Mjc2Njk4Mjc2NjlhMjg2NTliMjk2NDlkMjk2NDlmMmE2M2EwMmE2M2EyMmI2MmEzMmM2MWE1MmM2MGE2MmQ2MGE4MmU1ZmE5MmU1ZWFiMmY1ZWFkMzA1ZGFlMzA1Y2IwMzE1YmIxMzI1YWIzMzI1YWI0MzM1OWI2MzQ1OGI3MzU1N2I5MzU1NmJhMzY1NWJjMzc1NGJkMzg1M2JmMzk1MmMwM2E1MWMxM2E1MGMzM2I0ZmM0M2M0ZWM2M2Q0ZGM3M2U0Y2M4M2Y0YmNhNDA0YWNiNDE0OWNjNDI0OGNlNDM0N2NmNDQ0NmQwNDU0NWQyNDY0NGQzNDc0M2Q0NDg0MmQ1NGE0MWQ3NGIzZmQ4NGMzZWQ5NGQzZGRhNGUzY2RiNTAzYmRkNTEzYWRlNTIzOGRmNTMzN2UwNTUzNmUxNTYzNWUyNTczNGUzNTkzM2U0NWEzMWU1NWMzMGU2NWQyZmU3NWUyZWU4NjAyZGU5NjEyYmVhNjMyYWViNjQyOWViNjYyOGVjNjcyNmVkNjkyNWVlNmEyNGVmNmMyM2VmNmUyMWYwNmYyMGYxNzExZmYxNzMxZGYyNzQxY2YzNzYxYmYzNzgxOWY0NzkxOGY1N2IxN2Y1N2QxNWY2N2UxNGY2ODAxM2Y3ODIxMmY3ODQxMGY4ODUwZmY4ODcwZWY4ODkwY2Y5OGIwYmY5OGMwYWY5OGUwOWZhOTAwOGZhOTIwN2ZhOTQwN2ZiOTYwNmZiOTcwNmZiOTkwNmZiOWIwNmZiOWQwN2ZjOWYwN2ZjYTEwOGZjYTMwOWZjYTUwYWZjYTYwY2ZjYTgwZGZjYWEwZmZjYWMxMWZjYWUxMmZjYjAxNGZjYjIxNmZjYjQxOGZiYjYxYWZiYjgxZGZiYmExZmZiYmMyMWZiYmUyM2ZhYzAyNmZhYzIyOGZhYzQyYWZhYzYyZGY5YzcyZmY5YzkzMmY5Y2IzNWY4Y2QzN2Y4Y2YzYWY3ZDEzZGY3ZDM0MGY2ZDU0M2Y2ZDc0NmY1ZDk0OWY1ZGI0Y2Y0ZGQ0ZmY0ZGY1M2Y0ZTE1NmYzZTM1YWYzZTU1ZGYyZTY2MWYyZTg2NWYyZWE2OWYxZWM2ZGYxZWQ3MWYxZWY3NWYxZjE3OWYyZjI3ZGYyZjQ4MmYzZjU4NmYzZjY4YWY0Zjg4ZWY1Zjk5MmY2ZmE5NmY4ZmI5YWY5ZmM5ZGZhZmRhMWZjZmZhNFwiKSk7XG5cbmV4cG9ydCB2YXIgcGxhc21hID0gcmFtcChjb2xvcnMoXCIwZDA4ODcxMDA3ODgxMzA3ODkxNjA3OGExOTA2OGMxYjA2OGQxZDA2OGUyMDA2OGYyMjA2OTAyNDA2OTEyNjA1OTEyODA1OTIyYTA1OTMyYzA1OTQyZTA1OTUyZjA1OTYzMTA1OTczMzA1OTczNTA0OTgzNzA0OTkzODA0OWEzYTA0OWEzYzA0OWIzZTA0OWMzZjA0OWM0MTA0OWQ0MzAzOWU0NDAzOWU0NjAzOWY0ODAzOWY0OTAzYTA0YjAzYTE0YzAyYTE0ZTAyYTI1MDAyYTI1MTAyYTM1MzAyYTM1NTAyYTQ1NjAxYTQ1ODAxYTQ1OTAxYTU1YjAxYTU1YzAxYTY1ZTAxYTY2MDAxYTY2MTAwYTc2MzAwYTc2NDAwYTc2NjAwYTc2NzAwYTg2OTAwYTg2YTAwYTg2YzAwYTg2ZTAwYTg2ZjAwYTg3MTAwYTg3MjAxYTg3NDAxYTg3NTAxYTg3NzAxYTg3ODAxYTg3YTAyYTg3YjAyYTg3ZDAzYTg3ZTAzYTg4MDA0YTg4MTA0YTc4MzA1YTc4NDA1YTc4NjA2YTY4NzA3YTY4ODA4YTY4YTA5YTU4YjBhYTU4ZDBiYTU4ZTBjYTQ4ZjBkYTQ5MTBlYTM5MjBmYTM5NDEwYTI5NTExYTE5NjEzYTE5ODE0YTA5OTE1OWY5YTE2OWY5YzE3OWU5ZDE4OWQ5ZTE5OWRhMDFhOWNhMTFiOWJhMjFkOWFhMzFlOWFhNTFmOTlhNjIwOThhNzIxOTdhODIyOTZhYTIzOTVhYjI0OTRhYzI2OTRhZDI3OTNhZTI4OTJiMDI5OTFiMTJhOTBiMjJiOGZiMzJjOGViNDJlOGRiNTJmOGNiNjMwOGJiNzMxOGFiODMyODliYTMzODhiYjM0ODhiYzM1ODdiZDM3ODZiZTM4ODViZjM5ODRjMDNhODNjMTNiODJjMjNjODFjMzNkODBjNDNlN2ZjNTQwN2VjNjQxN2RjNzQyN2NjODQzN2JjOTQ0N2FjYTQ1N2FjYjQ2NzljYzQ3NzhjYzQ5NzdjZDRhNzZjZTRiNzVjZjRjNzRkMDRkNzNkMTRlNzJkMjRmNzFkMzUxNzFkNDUyNzBkNTUzNmZkNTU0NmVkNjU1NmRkNzU2NmNkODU3NmJkOTU4NmFkYTVhNmFkYTViNjlkYjVjNjhkYzVkNjdkZDVlNjZkZTVmNjVkZTYxNjRkZjYyNjNlMDYzNjNlMTY0NjJlMjY1NjFlMjY2NjBlMzY4NWZlNDY5NWVlNTZhNWRlNTZiNWRlNjZjNWNlNzZlNWJlNzZmNWFlODcwNTllOTcxNThlOTcyNTdlYTc0NTdlYjc1NTZlYjc2NTVlYzc3NTRlZDc5NTNlZDdhNTJlZTdiNTFlZjdjNTFlZjdlNTBmMDdmNGZmMDgwNGVmMTgxNGRmMTgzNGNmMjg0NGJmMzg1NGJmMzg3NGFmNDg4NDlmNDg5NDhmNThiNDdmNThjNDZmNjhkNDVmNjhmNDRmNzkwNDRmNzkxNDNmNzkzNDJmODk0NDFmODk1NDBmOTk3M2ZmOTk4M2VmOTlhM2VmYTliM2RmYTljM2NmYTllM2JmYjlmM2FmYmExMzlmYmEyMzhmY2EzMzhmY2E1MzdmY2E2MzZmY2E4MzVmY2E5MzRmZGFiMzNmZGFjMzNmZGFlMzJmZGFmMzFmZGIxMzBmZGIyMmZmZGI0MmZmZGI1MmVmZWI3MmRmZWI4MmNmZWJhMmNmZWJiMmJmZWJkMmFmZWJlMmFmZWMwMjlmZGMyMjlmZGMzMjhmZGM1MjdmZGM2MjdmZGM4MjdmZGNhMjZmZGNiMjZmY2NkMjVmY2NlMjVmY2QwMjVmY2QyMjVmYmQzMjRmYmQ1MjRmYmQ3MjRmYWQ4MjRmYWRhMjRmOWRjMjRmOWRkMjVmOGRmMjVmOGUxMjVmN2UyMjVmN2U0MjVmNmU2MjZmNmU4MjZmNWU5MjZmNWViMjdmNGVkMjdmM2VlMjdmM2YwMjdmMmYyMjdmMWY0MjZmMWY1MjVmMGY3MjRmMGY5MjFcIikpO1xuIiwiaW1wb3J0IGNvbG9ycyBmcm9tIFwiLi4vY29sb3JzLmpzXCI7XG5pbXBvcnQgcmFtcCBmcm9tIFwiLi4vcmFtcC5qc1wiO1xuXG5leHBvcnQgdmFyIHNjaGVtZSA9IG5ldyBBcnJheSgzKS5jb25jYXQoXG4gIFwiZGVlYmY3OWVjYWUxMzE4MmJkXCIsXG4gIFwiZWZmM2ZmYmRkN2U3NmJhZWQ2MjE3MWI1XCIsXG4gIFwiZWZmM2ZmYmRkN2U3NmJhZWQ2MzE4MmJkMDg1MTljXCIsXG4gIFwiZWZmM2ZmYzZkYmVmOWVjYWUxNmJhZWQ2MzE4MmJkMDg1MTljXCIsXG4gIFwiZWZmM2ZmYzZkYmVmOWVjYWUxNmJhZWQ2NDI5MmM2MjE3MWI1MDg0NTk0XCIsXG4gIFwiZjdmYmZmZGVlYmY3YzZkYmVmOWVjYWUxNmJhZWQ2NDI5MmM2MjE3MWI1MDg0NTk0XCIsXG4gIFwiZjdmYmZmZGVlYmY3YzZkYmVmOWVjYWUxNmJhZWQ2NDI5MmM2MjE3MWI1MDg1MTljMDgzMDZiXCJcbikubWFwKGNvbG9ycyk7XG5cbmV4cG9ydCBkZWZhdWx0IHJhbXAoc2NoZW1lKTtcbiIsImltcG9ydCBjb2xvcnMgZnJvbSBcIi4uL2NvbG9ycy5qc1wiO1xuaW1wb3J0IHJhbXAgZnJvbSBcIi4uL3JhbXAuanNcIjtcblxuZXhwb3J0IHZhciBzY2hlbWUgPSBuZXcgQXJyYXkoMykuY29uY2F0KFxuICBcImU1ZjVlMGExZDk5YjMxYTM1NFwiLFxuICBcImVkZjhlOWJhZTRiMzc0YzQ3NjIzOGI0NVwiLFxuICBcImVkZjhlOWJhZTRiMzc0YzQ3NjMxYTM1NDAwNmQyY1wiLFxuICBcImVkZjhlOWM3ZTljMGExZDk5Yjc0YzQ3NjMxYTM1NDAwNmQyY1wiLFxuICBcImVkZjhlOWM3ZTljMGExZDk5Yjc0YzQ3NjQxYWI1ZDIzOGI0NTAwNWEzMlwiLFxuICBcImY3ZmNmNWU1ZjVlMGM3ZTljMGExZDk5Yjc0YzQ3NjQxYWI1ZDIzOGI0NTAwNWEzMlwiLFxuICBcImY3ZmNmNWU1ZjVlMGM3ZTljMGExZDk5Yjc0YzQ3NjQxYWI1ZDIzOGI0NTAwNmQyYzAwNDQxYlwiXG4pLm1hcChjb2xvcnMpO1xuXG5leHBvcnQgZGVmYXVsdCByYW1wKHNjaGVtZSk7XG4iLCJpbXBvcnQgY29sb3JzIGZyb20gXCIuLi9jb2xvcnMuanNcIjtcbmltcG9ydCByYW1wIGZyb20gXCIuLi9yYW1wLmpzXCI7XG5cbmV4cG9ydCB2YXIgc2NoZW1lID0gbmV3IEFycmF5KDMpLmNvbmNhdChcbiAgXCJmMGYwZjBiZGJkYmQ2MzYzNjNcIixcbiAgXCJmN2Y3ZjdjY2NjY2M5Njk2OTY1MjUyNTJcIixcbiAgXCJmN2Y3ZjdjY2NjY2M5Njk2OTY2MzYzNjMyNTI1MjVcIixcbiAgXCJmN2Y3ZjdkOWQ5ZDliZGJkYmQ5Njk2OTY2MzYzNjMyNTI1MjVcIixcbiAgXCJmN2Y3ZjdkOWQ5ZDliZGJkYmQ5Njk2OTY3MzczNzM1MjUyNTIyNTI1MjVcIixcbiAgXCJmZmZmZmZmMGYwZjBkOWQ5ZDliZGJkYmQ5Njk2OTY3MzczNzM1MjUyNTIyNTI1MjVcIixcbiAgXCJmZmZmZmZmMGYwZjBkOWQ5ZDliZGJkYmQ5Njk2OTY3MzczNzM1MjUyNTIyNTI1MjUwMDAwMDBcIlxuKS5tYXAoY29sb3JzKTtcblxuZXhwb3J0IGRlZmF1bHQgcmFtcChzY2hlbWUpO1xuIiwiaW1wb3J0IGNvbG9ycyBmcm9tIFwiLi4vY29sb3JzLmpzXCI7XG5pbXBvcnQgcmFtcCBmcm9tIFwiLi4vcmFtcC5qc1wiO1xuXG5leHBvcnQgdmFyIHNjaGVtZSA9IG5ldyBBcnJheSgzKS5jb25jYXQoXG4gIFwiZmVlNmNlZmRhZTZiZTY1NTBkXCIsXG4gIFwiZmVlZGRlZmRiZTg1ZmQ4ZDNjZDk0NzAxXCIsXG4gIFwiZmVlZGRlZmRiZTg1ZmQ4ZDNjZTY1NTBkYTYzNjAzXCIsXG4gIFwiZmVlZGRlZmRkMGEyZmRhZTZiZmQ4ZDNjZTY1NTBkYTYzNjAzXCIsXG4gIFwiZmVlZGRlZmRkMGEyZmRhZTZiZmQ4ZDNjZjE2OTEzZDk0ODAxOGMyZDA0XCIsXG4gIFwiZmZmNWViZmVlNmNlZmRkMGEyZmRhZTZiZmQ4ZDNjZjE2OTEzZDk0ODAxOGMyZDA0XCIsXG4gIFwiZmZmNWViZmVlNmNlZmRkMGEyZmRhZTZiZmQ4ZDNjZjE2OTEzZDk0ODAxYTYzNjAzN2YyNzA0XCJcbikubWFwKGNvbG9ycyk7XG5cbmV4cG9ydCBkZWZhdWx0IHJhbXAoc2NoZW1lKTtcbiIsImltcG9ydCBjb2xvcnMgZnJvbSBcIi4uL2NvbG9ycy5qc1wiO1xuaW1wb3J0IHJhbXAgZnJvbSBcIi4uL3JhbXAuanNcIjtcblxuZXhwb3J0IHZhciBzY2hlbWUgPSBuZXcgQXJyYXkoMykuY29uY2F0KFxuICBcImVmZWRmNWJjYmRkYzc1NmJiMVwiLFxuICBcImYyZjBmN2NiYzllMjllOWFjODZhNTFhM1wiLFxuICBcImYyZjBmN2NiYzllMjllOWFjODc1NmJiMTU0Mjc4ZlwiLFxuICBcImYyZjBmN2RhZGFlYmJjYmRkYzllOWFjODc1NmJiMTU0Mjc4ZlwiLFxuICBcImYyZjBmN2RhZGFlYmJjYmRkYzllOWFjODgwN2RiYTZhNTFhMzRhMTQ4NlwiLFxuICBcImZjZmJmZGVmZWRmNWRhZGFlYmJjYmRkYzllOWFjODgwN2RiYTZhNTFhMzRhMTQ4NlwiLFxuICBcImZjZmJmZGVmZWRmNWRhZGFlYmJjYmRkYzllOWFjODgwN2RiYTZhNTFhMzU0Mjc4ZjNmMDA3ZFwiXG4pLm1hcChjb2xvcnMpO1xuXG5leHBvcnQgZGVmYXVsdCByYW1wKHNjaGVtZSk7XG4iLCJpbXBvcnQgY29sb3JzIGZyb20gXCIuLi9jb2xvcnMuanNcIjtcbmltcG9ydCByYW1wIGZyb20gXCIuLi9yYW1wLmpzXCI7XG5cbmV4cG9ydCB2YXIgc2NoZW1lID0gbmV3IEFycmF5KDMpLmNvbmNhdChcbiAgXCJmZWUwZDJmYzkyNzJkZTJkMjZcIixcbiAgXCJmZWU1ZDlmY2FlOTFmYjZhNGFjYjE4MWRcIixcbiAgXCJmZWU1ZDlmY2FlOTFmYjZhNGFkZTJkMjZhNTBmMTVcIixcbiAgXCJmZWU1ZDlmY2JiYTFmYzkyNzJmYjZhNGFkZTJkMjZhNTBmMTVcIixcbiAgXCJmZWU1ZDlmY2JiYTFmYzkyNzJmYjZhNGFlZjNiMmNjYjE4MWQ5OTAwMGRcIixcbiAgXCJmZmY1ZjBmZWUwZDJmY2JiYTFmYzkyNzJmYjZhNGFlZjNiMmNjYjE4MWQ5OTAwMGRcIixcbiAgXCJmZmY1ZjBmZWUwZDJmY2JiYTFmYzkyNzJmYjZhNGFlZjNiMmNjYjE4MWRhNTBmMTU2NzAwMGRcIlxuKS5tYXAoY29sb3JzKTtcblxuZXhwb3J0IGRlZmF1bHQgcmFtcChzY2hlbWUpO1xuIiwiLy9AdHMtY2hlY2tcblxuaW1wb3J0IHsgQ2FudmFzR2VvIH0gZnJvbSAnLi9DYW52YXNHZW8nO1xuaW1wb3J0IHsgTGF5ZXIgfSBmcm9tICcuL0xheWVyJztcbmltcG9ydCB7IFN0eWxlIH0gZnJvbSAnLi9TdHlsZSc7XG5pbXBvcnQgeyBEYXRhc2V0LCBDZWxsIH0gZnJvbSAnLi9EYXRhc2V0JztcblxuaW1wb3J0IHsgQ1NWR3JpZCB9IGZyb20gJy4vZGF0YXNldC9DU1ZHcmlkJztcbmltcG9ydCB7IFRpbGVkR3JpZCB9IGZyb20gJy4vZGF0YXNldC9UaWxlZEdyaWQnO1xuXG4vKipcbiAqIEEgZ3JpZHZpeiBvbiBhIEhUTUwgY2FudmFzLlxuICogXG4gKiBAYXV0aG9yIEp1bGllbiBHYWZmdXJpXG4gKi9cbmV4cG9ydCBjbGFzcyBBcHAge1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtvYmplY3R9IG9wdHMgXG4gICAgICovXG4gICAgY29uc3RydWN0b3Iob3B0cykge1xuICAgICAgICBvcHRzID0gb3B0cyB8fCB7fTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIGxheWVycy5cbiAgICAgICAgICogQHR5cGUge0FycmF5LjxMYXllcj59XG4gICAgICAgICAqICovXG4gICAgICAgICB0aGlzLmxheWVycyA9IFtdO1xuXG4gICAgICAgIC8vZ2V0IGNhbnZhcyBlbGVtZW50XG4gICAgICAgIG9wdHMuY2FudmFzSWQgPSBvcHRzLmNhbnZhc0lkIHx8IFwidmFjYW52YXNcIjtcbiAgICAgICAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQob3B0cy5jYW52YXNJZCk7XG5cbiAgICAgICAgLy9zZXQgZGltZW5zaW9uc1xuICAgICAgICAvKiogQHR5cGUge251bWJlcn0gKi9cbiAgICAgICAgdGhpcy53ID0gb3B0cy53IHx8IGNhbnZhcy5vZmZzZXRXaWR0aDtcbiAgICAgICAgLyoqIEB0eXBlIHtudW1iZXJ9ICovXG4gICAgICAgIHRoaXMuaCA9IG9wdHMuaCB8fCBjYW52YXMub2Zmc2V0SGVpZ2h0O1xuXG4gICAgICAgIC8qKiBCYWNrZ3JvdW5kIGNvbG9yLlxuICAgICAgICAgKiBAdHlwZSB7c3RyaW5nfSAqL1xuICAgICAgICB0aGlzLmJhY2tncm91bmRDb2xvcl8gPSBvcHRzLmJhY2tncm91bmRDb2xvciB8fCBcIndoaXRlXCJcblxuXG4gICAgICAgIC8qKiBNYWtlIGdlbyBjYW52YXNcbiAgICAgICAgICogQHR5cGUge0NhbnZhc0dlb30gKi9cbiAgICAgICAgdGhpcy5jZyA9IG5ldyBDYW52YXNHZW8oKTtcbiAgICAgICAgY29uc3QgdGggPSB0aGlzO1xuICAgICAgICB0aGlzLmNnLnJlZHJhdyA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgLy9nbyB0aHJvdWdoIHRoZSBsaXN0IG9mIGxheWVycyBhbmQgZmluZCB0aGUgb25lKHMpIHRvIGRyYXdcbiAgICAgICAgICAgIGZvciAoY29uc3QgbGF5ZXIgb2YgdGgubGF5ZXJzKSB7XG5cbiAgICAgICAgICAgICAgICAvL3NraXAgbGF5ZXIgbm90IHdpdGhpbiB0aGUgem9vbSByYW5nZVxuICAgICAgICAgICAgICAgIGlmIChsYXllci5taW5ab29tID49IHRoaXMuemYpIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGlmIChsYXllci5tYXhab29tIDwgdGhpcy56ZikgY29udGludWU7XG5cbiAgICAgICAgICAgICAgICAvL2dldCBkYXRhIHRvIHNob3dcbiAgICAgICAgICAgICAgICBsYXllci5kYXRhc2V0LmdldERhdGEodGhpcy51cGRhdGVFeHRlbnRHZW8oKSwgKCkgPT4geyB0aC5kcmF3KGxheWVyKTsgfSk7XG5cbiAgICAgICAgICAgICAgICAvL2RyYXcgY2VsbHNcbiAgICAgICAgICAgICAgICB0aC5kcmF3KGxheWVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzXG4gICAgICAgIH07XG5cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEFkZCBhIGxheWVyLlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7RGF0YXNldH0gZGF0YXNldCBUaGUgZGF0YXNldCB0byBzaG93XG4gICAgICogQHBhcmFtIHtBcnJheS48U3R5bGU+fSBzdHlsZXMgVGhlIHN0eWxlcywgb3JkZXJlZCBpbiBkcmF3aW5nIG9yZGVyLlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBtaW5ab29tIFRoZSBtaW5pbXVtIHpvb20gbGV2ZWwgd2hlbiB0byBzaG93IHRoZSBsYXllclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBtYXhab29tIFRoZSBtYXhpbXVtIHpvb20gbGV2ZWwgd2hlbiB0byBzaG93IHRoZSBsYXllclxuICAgICAqIEByZXR1cm5zIHt0aGlzfVxuICAgICAqL1xuICAgIGFkZExheWVyKGRhdGFzZXQsIHN0eWxlcywgbWluWm9vbSwgbWF4Wm9vbSkge1xuICAgICAgICB0aGlzLmxheWVycy5wdXNoKG5ldyBMYXllcihkYXRhc2V0LCBzdHlsZXMsIG1pblpvb20sIG1heFpvb20pKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkIGEgbGF5ZXIgZnJvbSBhIHRpbGVkIGdyaWQgZGF0YXNldC5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXJsIFRoZSB1cmwgb2YgdGhlIGRhdGFzZXQgaW5mby5qc29uIGZpbGUuXG4gICAgICogQHBhcmFtIHtBcnJheS48U3R5bGU+fSBzdHlsZXMgVGhlIHN0eWxlcywgb3JkZXJlZCBpbiBkcmF3aW5nIG9yZGVyLlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBtaW5ab29tIFRoZSBtaW5pbXVtIHpvb20gbGV2ZWwgd2hlbiB0byBzaG93IHRoZSBsYXllclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBtYXhab29tIFRoZSBtYXhpbXVtIHpvb20gbGV2ZWwgd2hlbiB0byBzaG93IHRoZSBsYXllclxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb24oQ2VsbCk6dm9pZH0gcHJlcHJvY2VzcyBBIHByZXByb2Nlc3MgdG8gcnVuIG9uIGVhY2ggY2VsbCBhZnRlciBsb2FkaW5nLiBJdCBjYW4gYmUgdXNlZCB0byBhcHBseSBzb21lIHNwZWNpZmljIHRyZWF0bWVudCBiZWZvcmUgb3IgY29tcHV0ZSBhIG5ldyBjb2x1bW4uXG4gICAgICogQHJldHVybnMge3RoaXN9XG4gICAgICovXG4gICAgYWRkVGlsZWRHcmlkKHVybCwgc3R5bGVzLCBtaW5ab29tLCBtYXhab29tLCBwcmVwcm9jZXNzID0gbnVsbCkge1xuICAgICAgICByZXR1cm4gdGhpcy5hZGRMYXllcihcbiAgICAgICAgICAgIG5ldyBUaWxlZEdyaWQodXJsLCB0aGlzLCBwcmVwcm9jZXNzKS5sb2FkSW5mbygoKSA9PiB7IHRoaXMuY2cucmVkcmF3KCk7IH0pLFxuICAgICAgICAgICAgc3R5bGVzLCBtaW5ab29tLCBtYXhab29tXG4gICAgICAgIClcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEFkZCBhIGxheWVyIGZyb20gYSBDU1YgZ3JpZCBkYXRhc2V0LlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgVGhlIHVybCBvZiB0aGUgZGF0YXNldC5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gcmVzb2x1dGlvbiBUaGUgZGF0YXNldCByZXNvbHV0aW9uIChpbiBnZW9ncmFwaGljYWwgdW5pdCkuXG4gICAgICogQHBhcmFtIHtBcnJheS48U3R5bGU+fSBzdHlsZXMgVGhlIHN0eWxlcywgb3JkZXJlZCBpbiBkcmF3aW5nIG9yZGVyLlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBtaW5ab29tIFRoZSBtaW5pbXVtIHpvb20gbGV2ZWwgd2hlbiB0byBzaG93IHRoZSBsYXllclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBtYXhab29tIFRoZSBtYXhpbXVtIHpvb20gbGV2ZWwgd2hlbiB0byBzaG93IHRoZSBsYXllclxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb24oQ2VsbCk6dm9pZH0gcHJlcHJvY2VzcyBBIHByZXByb2Nlc3MgdG8gcnVuIG9uIGVhY2ggY2VsbCBhZnRlciBsb2FkaW5nLiBJdCBjYW4gYmUgdXNlZCB0byBhcHBseSBzb21lIHNwZWNpZmljIHRyZWF0bWVudCBiZWZvcmUgb3IgY29tcHV0ZSBhIG5ldyBjb2x1bW4uXG4gICAgICogQHJldHVybnMge3RoaXN9XG4gICAgICovXG4gICAgYWRkQ1NWR3JpZCh1cmwsIHJlc29sdXRpb24sIHN0eWxlcywgbWluWm9vbSwgbWF4Wm9vbSwgcHJlcHJvY2VzcyA9IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWRkTGF5ZXIoXG4gICAgICAgICAgICBuZXcgQ1NWR3JpZCh1cmwsIHJlc29sdXRpb24sIHByZXByb2Nlc3MpLmdldERhdGEobnVsbCwgKCkgPT4geyB0aGlzLmNnLnJlZHJhdygpOyB9KSxcbiAgICAgICAgICAgIHN0eWxlcywgbWluWm9vbSwgbWF4Wm9vbVxuICAgICAgICApXG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBEcmF3IGEgbGF5ZXIuXG4gICAgICogXG4gICAgICogQHBhcmFtIHtMYXllcn0gbGF5ZXIgXG4gICAgICogQHJldHVybnMge3RoaXN9XG4gICAgICovXG4gICAgZHJhdyhsYXllcikge1xuXG4gICAgICAgIC8vZ2V0IGNlbGxzIHRvIGRyYXdcbiAgICAgICAgY29uc3QgY2VsbHMgPSBsYXllci5kYXRhc2V0LmdldENlbGxzKHRoaXMuY2cuZXh0R2VvKVxuXG4gICAgICAgIC8vY2xlYXJcbiAgICAgICAgdGhpcy5jZy5jbGVhcih0aGlzLmJhY2tncm91bmRDb2xvcl8pO1xuXG4gICAgICAgIC8vZHJhdyBjZWxscywgc3R5bGUgYnkgc3R5bGVcbiAgICAgICAgZm9yIChjb25zdCBzdHlsZSBvZiBsYXllci5zdHlsZXMpXG4gICAgICAgICAgICBzdHlsZS5kcmF3KGNlbGxzLCBsYXllci5kYXRhc2V0LnJlc29sdXRpb24sIHRoaXMuY2cpXG4gICAgICAgIFxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIFNldCB2aWV3ZXIgcG9zaXRpb24uXG4gICAgICogXG4gICAgICogQHBhcmFtIHt7eDpudW1iZXIseTpudW1iZXJ9PX0gcG9zIFxuICAgICAqIEByZXR1cm5zIHt0aGlzfHt4Om51bWJlcix5Om51bWJlcn19XG4gICAgICovXG4gICAgZ2VvQ2VudGVyKHBvcykge1xuICAgICAgICBpZiAocG9zKSB7XG4gICAgICAgICAgICB0aGlzLmNnLmNlbnRlciA9IHBvcztcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmNnLmNlbnRlcjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXQgdmlld2VyIHpvb20gbGV2ZWwgKGdyb3VuZCBwaXhlbCBzaXplKS5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge251bWJlcj19IHpmXG4gICAgICogQHJldHVybnMge3RoaXN8bnVtYmVyfVxuICAgICAqL1xuICAgICB6b29tRmFjdG9yKHpmKSB7XG4gICAgICAgIGlmICh6Zikge1xuICAgICAgICAgICAgdGhpcy5jZy56ZiA9IHpmO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuY2cuemY7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IHZpZXdlciB6b29tIGxldmVsIChncm91bmQgcGl4ZWwgc2l6ZSkuXG4gICAgICogXG4gICAgICogQHBhcmFtIHtzdHJpbmc9fSBiYWNrZ3JvdW5kQ29sb3IgXG4gICAgICogQHJldHVybnMge3RoaXN8c3RyaW5nfVxuICAgICAqL1xuICAgICBiYWNrZ3JvdW5kQ29sb3IoYmFja2dyb3VuZENvbG9yKSB7XG4gICAgICAgIGlmIChiYWNrZ3JvdW5kQ29sb3IpIHtcbiAgICAgICAgICAgIHRoaXMuYmFja2dyb3VuZENvbG9yXyA9IGJhY2tncm91bmRDb2xvcjtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmJhY2tncm91bmRDb2xvcl87XG4gICAgfVxuXG59XG4iLCIvL0B0cy1jaGVja1xuLyoqIEB0eXBlZGVmIHsge3hNaW46IG51bWJlciwgeE1heDogbnVtYmVyLCB5TWluOiBudW1iZXIsIHlNYXg6IG51bWJlcn0gfSBFbnZlbG9wZSAqL1xuXG4vKipcbiAqIEEgSFRNTCBjYW52YXMsIGVuaGFuY2VkIHdpdGggem9vbSBhbmQgcGFuIGNhcGFiaWxpdGllcy5cbiAqIFxuICogQGF1dGhvciBKdWxpZW4gR2FmZnVyaVxuICovXG5leHBvcnQgY2xhc3MgQ2FudmFzR2VvIHtcblxuICAgIC8qKlxuICAgICAqIEBjb25zdHJ1Y3RvclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjYW52YXNJZFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBjZW50ZXJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gemZcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihjYW52YXNJZCA9IFwidmFjYW52YXNcIiwgY2VudGVyID0gdW5kZWZpbmVkLCB6ZiA9IDEpIHtcblxuICAgICAgICAvKiogQHR5cGUgeyp9ICovXG4gICAgICAgIHRoaXMuY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY2FudmFzSWQpO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7bnVtYmVyfSAqL1xuICAgICAgICB0aGlzLncgPSB0aGlzLmNhbnZhcy5vZmZzZXRXaWR0aDtcbiAgICAgICAgLyoqIEB0eXBlIHtudW1iZXJ9ICovXG4gICAgICAgIHRoaXMuaCA9IHRoaXMuY2FudmFzLm9mZnNldEhlaWdodDtcblxuICAgICAgICB0aGlzLmNhbnZhcy53aWR0aCA9IHRoaXMudztcbiAgICAgICAgdGhpcy5jYW52YXMuaGVpZ2h0ID0gdGhpcy5oO1xuXG4gICAgICAgIC8qKkB0eXBlIHtPYmplY3R9ICovXG4gICAgICAgIHRoaXMuY3R4ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuXG4gICAgICAgIC8vIGdlbyBjb29yZGluYXRlcyBvZiB0aGUgY2VudGVyXG4gICAgICAgIC8qKiBAdHlwZSB7e3g6bnVtYmVyLHk6bnVtYmVyfX0gKi9cbiAgICAgICAgdGhpcy5jZW50ZXIgPSBjZW50ZXIgfHwgeyB4OiB0aGlzLncgKiAwLjUsIHk6IHRoaXMuaCAqIDAuNSB9XG5cbiAgICAgICAgLy8gem9vbSBmYWN0b3I6IHBpeGVsIHNpemUsIGluIG0vcGl4XG4gICAgICAgIC8qKiBAdHlwZSB7bnVtYmVyfSAqL1xuICAgICAgICB0aGlzLnpmID0gemY7XG5cbiAgICAgICAgLy9leHRlbnRcbiAgICAgICAgLyoqIEB0eXBlIHt7eE1pbjogbnVtYmVyLCB4TWF4OiBudW1iZXIsIHlNaW46IG51bWJlciwgeU1heDogbnVtYmVyfX0gKi9cbiAgICAgICAgdGhpcy5leHRHZW8gPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMudXBkYXRlRXh0ZW50R2VvKClcblxuICAgICAgICAvL21vdXNlIGNsaWNrIC0gcGFuXG4gICAgICAgIGxldCBtcGFuID0gZmFsc2VcbiAgICAgICAgdGhpcy5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCBlID0+IHsgbXBhbiA9IHRydWUgfSk7XG4gICAgICAgIHRoaXMuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgZSA9PiB7XG4gICAgICAgICAgICBpZiAobXBhbikgdGhpcy5wYW4oLWUubW92ZW1lbnRYICogdGhpcy56ZiwgZS5tb3ZlbWVudFkgKiB0aGlzLnpmKVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgZSA9PiB7IG1wYW4gPSBmYWxzZSB9KTtcblxuICAgICAgICAvL21vdXNlIHdoZWVsIC0gem9vbVxuICAgICAgICBjb25zdCBmID0gMS41XG4gICAgICAgIHRoaXMuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoXCJ3aGVlbFwiLCBlID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGZfID0gZS5kZWx0YVkgPiAwID8gZiA6IDEgLyBmO1xuICAgICAgICAgICAgdGhpcy56b29tKGZfLCB0aGlzLnBpeFRvR2VvWChlLm9mZnNldFgpLCB0aGlzLnBpeFRvR2VvWShlLm9mZnNldFkpKVxuICAgICAgICB9KTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqL1xuICAgIHJlZHJhdygpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNZXRob2QgcmVkcmF3IG5vdCBpbXBsZW1lbnRlZC4nKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDbGVhciB0aGUgYXBwIHNjcmVlbi5cbiAgICAgKiBUbyBiZSB1c2VkIGJlZm9yZSBhIHJlZHJhdyBmb3IgZXhhbXBsZS5cbiAgICAgKiBAcGFyYW0geyp9IGNvbG9yIFxuICAgICAqL1xuICAgIGNsZWFyKGNvbG9yPVwid2hpdGVcIikge1xuICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBjb2xvcjtcbiAgICAgICAgdGhpcy5jdHguZmlsbFJlY3QoMCwgMCwgdGhpcy53LCB0aGlzLmgpO1xuICAgIH1cblxuICAgIC8vY29udmVyc2lvbiBmdW5jdGlvbnNcbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge251bWJlcn0geEdlb1xuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAgKi9cbiAgICBnZW9Ub1BpeFgoeEdlbykgeyByZXR1cm4gKHhHZW8gLSB0aGlzLmNlbnRlci54KSAvIHRoaXMuemYgKyB0aGlzLncgKiAwLjU7IH1cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge251bWJlcn0geUdlb1xuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAgKi9cbiAgICBnZW9Ub1BpeFkoeUdlbykgeyByZXR1cm4gLSh5R2VvIC0gdGhpcy5jZW50ZXIueSkgLyB0aGlzLnpmICsgdGhpcy5oICogMC41OyB9XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHhcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgICovXG4gICAgcGl4VG9HZW9YKHgpIHsgcmV0dXJuICh4IC0gdGhpcy53ICogMC41KSAqIHRoaXMuemYgKyB0aGlzLmNlbnRlci54OyB9XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHlcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgICovXG4gICAgcGl4VG9HZW9ZKHkpIHsgcmV0dXJuIC0oeSAtIHRoaXMuaCAqIDAuNSkgKiB0aGlzLnpmICsgdGhpcy5jZW50ZXIueTsgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGR4R2VvXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGR5R2VvXG4gICAgICovXG4gICAgcGFuKGR4R2VvLCBkeUdlbykge1xuICAgICAgICB0aGlzLmNlbnRlci54ICs9IGR4R2VvO1xuICAgICAgICB0aGlzLmNlbnRlci55ICs9IGR5R2VvO1xuICAgICAgICB0aGlzLnVwZGF0ZUV4dGVudEdlbygpXG4gICAgICAgIHRoaXMucmVkcmF3KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGZcbiAgICAgKiBAcGFyYW0ge251bWJlcn0geEdlb1xuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB5R2VvXG4gICAgICovXG4gICAgem9vbShmID0gMSwgeEdlbyA9IHRoaXMuY2VudGVyLngsIHlHZW8gPSB0aGlzLmNlbnRlci55KSB7XG4gICAgICAgIHRoaXMuemYgKj0gZjtcbiAgICAgICAgdGhpcy5jZW50ZXIueCArPSAoeEdlbyAtIHRoaXMuY2VudGVyLngpICogKDEgLSBmKVxuICAgICAgICB0aGlzLmNlbnRlci55ICs9ICh5R2VvIC0gdGhpcy5jZW50ZXIueSkgKiAoMSAtIGYpXG4gICAgICAgIHRoaXMudXBkYXRlRXh0ZW50R2VvKClcbiAgICAgICAgdGhpcy5yZWRyYXcoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbWFyZ2luUHggXG4gICAgICogQHJldHVybnMge0VudmVsb3BlfVxuICAgICAqL1xuICAgIHVwZGF0ZUV4dGVudEdlbyhtYXJnaW5QeCA9IDIwKSB7XG4gICAgICAgIHRoaXMuZXh0R2VvID0ge1xuICAgICAgICAgICAgeE1pbjogdGhpcy5waXhUb0dlb1goLW1hcmdpblB4KSxcbiAgICAgICAgICAgIHhNYXg6IHRoaXMucGl4VG9HZW9YKHRoaXMudyArIG1hcmdpblB4KSxcbiAgICAgICAgICAgIHlNaW46IHRoaXMucGl4VG9HZW9ZKHRoaXMuaCArIG1hcmdpblB4KSxcbiAgICAgICAgICAgIHlNYXg6IHRoaXMucGl4VG9HZW9ZKC1tYXJnaW5QeClcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5leHRHZW87XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2sgaWYgdGhlIG9iamVjdCBoYXMgdG8gYmUgZHJhd25cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge3t4Om51bWJlcix5Om51bWJlcn19IG9iaiBcbiAgICAgKi9cbiAgICB0b0RyYXcob2JqKSB7XG4gICAgICAgIGlmIChvYmoueCA8IHRoaXMuZXh0R2VvLnhNaW4pIHJldHVybiBmYWxzZTtcbiAgICAgICAgaWYgKG9iai54ID4gdGhpcy5leHRHZW8ueE1heCkgcmV0dXJuIGZhbHNlO1xuICAgICAgICBpZiAob2JqLnkgPCB0aGlzLmV4dEdlby55TWluKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIGlmIChvYmoueSA+IHRoaXMuZXh0R2VvLnlNYXgpIHJldHVybiBmYWxzZTtcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG59XG4iLCIvL0B0cy1jaGVja1xuXG4vKiogQHR5cGVkZWYgeyB7eE1pbjogbnVtYmVyLCB4TWF4OiBudW1iZXIsIHlNaW46IG51bWJlciwgeU1heDogbnVtYmVyfSB9IEVudmVsb3BlICovXG4vKiogQHR5cGVkZWYge3t4OiBudW1iZXIsIHk6IG51bWJlcn19IENlbGwgKi9cblxuLyoqXG4gKiBBIGRhdGFzZXQgb2YgZ3JpZCBjZWxscy5cbiAqIFxuICogQGFic3RyYWN0XG4gKiBcbiAqIEBhdXRob3IgSnVsaWVuIEdhZmZ1cmlcbiAqL1xuZXhwb3J0IGNsYXNzIERhdGFzZXQge1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVybCBUaGUgdXJsIG9mIHRoZSBkYXRhc2V0LlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSByZXNvbHV0aW9uIFRoZSBkYXRhc2V0IHJlc29sdXRpb24gKGluIGdlb2dyYXBoaWNhbCB1bml0KS5cbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9uKENlbGwpOnZvaWR9IHByZXByb2Nlc3MgQSBwcmVwcm9jZXNzIHRvIHJ1biBvbiBlYWNoIGNlbGwgYWZ0ZXIgbG9hZGluZy4gSXQgY2FuIGJlIHVzZWQgdG8gYXBwbHkgc29tZSBzcGVjaWZpYyB0cmVhdG1lbnQgYmVmb3JlIG9yIGNvbXB1dGUgYSBuZXcgY29sdW1uLlxuICAgICAqIEBhYnN0cmFjdFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHVybCwgcmVzb2x1dGlvbiwgcHJlcHJvY2VzcyA9IG51bGwpIHtcblxuICAgICAgICAvKiogQHR5cGUge3N0cmluZ30gKi9cbiAgICAgICAgdGhpcy51cmwgPSB1cmw7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtudW1iZXJ9ICovXG4gICAgICAgIHRoaXMucmVzb2x1dGlvbiA9IHJlc29sdXRpb247XG5cbiAgICAgICAgLyoqIEB0eXBlIHtmdW5jdGlvbihDZWxsKTp2b2lkfSAqL1xuICAgICAgICB0aGlzLnByZXByb2Nlc3MgPSBwcmVwcm9jZXNzO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogUmVxdWVzdCBkYXRhIHdpdGhpbiBhIGdlb2dyYXBoaWMgZW52ZWxvcGUuXG4gICAgICogXG4gICAgICogQHBhcmFtIHtFbnZlbG9wZX0gZXh0R2VvIFxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb24oKTp2b2lkfSBjYWxsYmFjayBcbiAgICAgKiBAcmV0dXJucyB7dGhpc31cbiAgICAgKiBAYWJzdHJhY3RcbiAgICAgKi9cbiAgICBnZXREYXRhKGV4dEdlbywgY2FsbGJhY2spIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNZXRob2QgZ2V0RGF0YSBub3QgaW1wbGVtZW50ZWQuJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtFbnZlbG9wZX0gZXh0R2VvIFxuICAgICAqIEByZXR1cm5zIHtBcnJheS48Q2VsbD59XG4gICAgICogQGFic3RyYWN0XG4gICAgICovXG4gICAgZ2V0Q2VsbHMoZXh0R2VvKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTWV0aG9kIGdldENlbGxzIG5vdCBpbXBsZW1lbnRlZC4nKTtcbiAgICB9XG5cbn1cbiIsIi8vQHRzLWNoZWNrXG5cbmltcG9ydCB7IERhdGFzZXQgfSBmcm9tIFwiLi9EYXRhc2V0XCI7XG5pbXBvcnQgeyBTdHlsZSB9IGZyb20gXCIuL1N0eWxlXCI7XG5cbi8qKlxuICogQSBkYXRhIGxheWVyLCB3aGljaCBzcGVjaWZpZXMgYSBkYXRhc2V0IHRvIGJlIHNob3duIHdpdGhpbiBhIHNwZWNpZmllZCB6b29tIHJhbmdlLCB3aXRoIGEgc3BlY2lmaWVkIHN0eWxlLlxuICogXG4gKiBAYXV0aG9yIEp1bGllbiBHYWZmdXJpXG4gKi9cbmV4cG9ydCBjbGFzcyBMYXllciB7XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge0RhdGFzZXR9IGRhdGFzZXQgVGhlIGRhdGFzZXQgdG8gc2hvd1xuICAgICAqIEBwYXJhbSB7QXJyYXkuPFN0eWxlPn0gc3R5bGVzIFRoZSBzdHlsZXMsIG9yZGVyZWQgaW4gZHJhd2luZyBvcmRlci5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbWluWm9vbSBUaGUgbWluaW11bSB6b29tIGxldmVsIHdoZW4gdG8gc2hvdyB0aGUgbGF5ZXJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbWF4Wm9vbSBUaGUgbWF4aW11bSB6b29tIGxldmVsIHdoZW4gdG8gc2hvdyB0aGUgbGF5ZXJcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihkYXRhc2V0LCBzdHlsZXMsIG1pblpvb20sIG1heFpvb20pIHtcblxuICAgICAgICAvKiogQHR5cGUge0RhdGFzZXR9ICovXG4gICAgICAgIHRoaXMuZGF0YXNldCA9IGRhdGFzZXQ7XG4gICAgICAgIC8qKiBAdHlwZSB7QXJyYXkuPFN0eWxlPn0gKi9cbiAgICAgICAgdGhpcy5zdHlsZXMgPSBzdHlsZXM7XG4gICAgICAgIC8qKiBAdHlwZSB7bnVtYmVyfSAqL1xuICAgICAgICB0aGlzLm1pblpvb20gPSBtaW5ab29tO1xuICAgICAgICAvKiogQHR5cGUge251bWJlcn0gKi9cbiAgICAgICAgdGhpcy5tYXhab29tID0gbWF4Wm9vbTtcblxuICAgIH1cblxufVxuIiwiLy9AdHMtY2hlY2tcbmltcG9ydCB7IENlbGwgfSBmcm9tIFwiLi9EYXRhc2V0XCI7XG5pbXBvcnQgeyBDYW52YXNHZW8gfSBmcm9tICcuL0NhbnZhc0dlbyc7XG5cbi8qKiBEZWZpbml0aW9uIG9mIGEgY2VsbCBzaXplIHBhcmFtZXRlci5cbiAqIHZhbDogVGhlIGZ1bmN0aW9uIHJldHVybmluZyB0aGUgc2l6ZSBvZiBhIGNlbGwuXG4gKiB1bml0OiBUaGUgdW5pdCBvZiB0aGUgc2l6ZSB2YWx1ZSwgZWl0aGVyIGluIHBpeGVsIChcInBpeFwiKSBvciBpbiBnZW9ncmFwaGljYWwgdW5pdCAoXCJnZW9cIikuXG4gKiBAdHlwZWRlZiB7e3ZhbDogZnVuY3Rpb24oQ2VsbCk6bnVtYmVyLCB1bml0OiBcInBpeFwifFwiZ2VvXCJ9fSBTaXplICovXG5cbi8qKlxuICogQSBzdHlsZSwgdG8gc2hvdyBhIGdyaWQgZGF0YXNldC5cbiAqIFxuICogQGFic3RyYWN0XG4gKiBcbiAqIEBhdXRob3IgSnVsaWVuIEdhZmZ1cmlcbiAqL1xuZXhwb3J0IGNsYXNzIFN0eWxlIHtcblxuICAgIC8qKlxuICAgICAqIEBhYnN0cmFjdFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKCkge1xuXG4gICAgICAgIC8qKiBBbiBvZmZzZXQuIFRoaXMgaXMgdG8gYWx0ZXIgdGhlIHBvc2l0aW9uIG9mIGFsbCBzeW1ib2xzIGluIGEgZ2l2ZW4gZGlyZWN0aW9uLiBJbiBnZW9ncmFwaGljYWwgdW5pdC5cbiAgICAgICAgICogQHR5cGUge3tkeDpudW1iZXIsZHk6bnVtYmVyfX0gKi9cbiAgICAgICAgdGhpcy5vZmZzZXRfID0geyBkeDogMCwgZHk6IDAgfTtcblxuXG4gICAgICAgIC8vdGhlIGNlbGwgc3Ryb2tlXG5cbiAgICAgICAgLyoqIFRoZSB6b29tIGZhY3RvciBsaW1pdCB3aGVuIHRvIHNob3cvaGlkZSB0aGUgc3Ryb2tlLlxuICAgICAgICAgKiBAdHlwZSB7bnVtYmVyfSAqL1xuICAgICAgICB0aGlzLnpmU3Ryb2tlXyA9IHVuZGVmaW5lZDtcblxuICAgICAgICAvKiogVGhlIHN0cm9rZSBjb2xvci5cbiAgICAgICAgICogQHR5cGUge3N0cmluZ30gKi9cbiAgICAgICAgdGhpcy5zdHJva2VDb2xvcl8gPSBcImxpZ2h0Z3JheVwiO1xuXG4gICAgICAgIC8qKiBUaGUgc3Ryb2tlIGxpbmUgd2lkdGgsIGluIHBpeGVscy5cbiAgICAgICAgICogQHR5cGUge251bWJlcn0gKi9cbiAgICAgICAgdGhpcy5zdHJva2VXaWR0aF8gPSAxLjU7XG5cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIERyYXcgY2VsbHMuXG4gICAgICogXG4gICAgICogQHBhcmFtIHtBcnJheS48Q2VsbD59IGNlbGxzIFRoZSBjZWxscyB0byBkcmF3LlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSByZXNvbHV0aW9uIFRoZWlyIHJlc29sdXRpb24gKGluIGdlb2dyYXBoaWMgdW5pdClcbiAgICAgKiBAcGFyYW0ge0NhbnZhc0dlb30gY2cgVGhlIGNhbnZhcyB3aGVyZSB0byBkcmF3IHRoZW0uXG4gICAgICogQGFic3RyYWN0XG4gICAgICovXG4gICAgZHJhdyhjZWxscywgcmVzb2x1dGlvbiwgY2cpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNZXRob2QgZHJhdyBub3QgaW1wbGVtZW50ZWQuJyk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAqIFRoZSBvZmZzZXRcbiAgICAqIFRoaXMgaXMgdG8gYWx0ZXIgdGhlIHBvc2l0aW9uIG9mIGFsbCBzeW1ib2xzIGluIGEgZ2l2ZW4gZGlyZWN0aW9uLiBJbiBnZW9ncmFwaGljYWwgdW5pdC5cbiAgICAqIFxuICAgICogQHBhcmFtIHt7ZHg6bnVtYmVyLGR5Om51bWJlcn19IG9mZnNldCBcbiAgICAqIEByZXR1cm5zIHt0aGlzfHtkeDpudW1iZXIsZHk6bnVtYmVyfX1cbiAgICAqL1xuICAgIG9mZnNldChvZmZzZXQpIHtcbiAgICAgICAgaWYgKG9mZnNldCkge1xuICAgICAgICAgICAgdGhpcy5vZmZzZXRfID0gb2Zmc2V0O1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMub2Zmc2V0XztcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGhlIHpvb20gbGltaXQgd2hlbiB0byBzaG93L2hpZGUgdGhlIHN0cm9rZS5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gemZTdHJva2UgXG4gICAgICogQHJldHVybnMge3RoaXN8bnVtYmVyfVxuICAgICAqL1xuICAgIHpmU3Ryb2tlKHpmU3Ryb2tlKSB7XG4gICAgICAgIGlmICh6ZlN0cm9rZSkge1xuICAgICAgICAgICAgdGhpcy56ZlN0cm9rZV8gPSB6ZlN0cm9rZTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnpmU3Ryb2tlXztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGUgc3Ryb2tlIGNvbG9yLlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzdHJva2VDb2xvciBcbiAgICAgKiBAcmV0dXJucyB7dGhpc3xzdHJpbmd9XG4gICAgICovXG4gICAgc3Ryb2tlQ29sb3Ioc3Ryb2tlQ29sb3IpIHtcbiAgICAgICAgaWYgKHN0cm9rZUNvbG9yKSB7XG4gICAgICAgICAgICB0aGlzLnN0cm9rZUNvbG9yXyA9IHN0cm9rZUNvbG9yO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuc3Ryb2tlQ29sb3JfO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoZSBzdHJva2UgbGluZSB3aWR0aCwgaW4gcGl4ZWxzLlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBzdHJva2VXaWR0aCBcbiAgICAgKiBAcmV0dXJucyB7dGhpc3xudW1iZXJ9XG4gICAgICovXG4gICAgc3Ryb2tlV2lkdGgoc3Ryb2tlV2lkdGgpIHtcbiAgICAgICAgaWYgKHN0cm9rZVdpZHRoKSB7XG4gICAgICAgICAgICB0aGlzLnN0cm9rZVdpZHRoXyA9IHN0cm9rZVdpZHRoO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuc3Ryb2tlV2lkdGhfO1xuICAgIH1cblxuXG5cblxuICAgIC8qKlxuICAgICAqIERyYXcgdGhlIHN0cm9rZSBvZiB0aGUgY2VsbHMsIGFzIHJlY3RhbmdsZSwgb25seSBmb3IgZGV0YWlsbGVkIHpvb20gbGV2ZWxzIHdoZW4gdGhlIGNlbGxzIGFyZSBxdWl0ZSBiaWcuXG4gICAgICogXG4gICAgICogQHBhcmFtIHtDZWxsfSBjZWxsIFRoZSBjZWxsIHRvIGRyYXcgdGhlIHN0cm9rZSBvZi5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gcmVzb2x1dGlvbiBUaGVpciByZXNvbHV0aW9uIChpbiBnZW9ncmFwaGljIHVuaXQpXG4gICAgICogQHBhcmFtIHtDYW52YXNHZW99IGNnIFRoZSBjYW52YXMgd2hlcmUgdG8gZHJhdyB0aGVtLlxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb24oQ2VsbCk6c3RyaW5nfSBzaGFwZSBUaGUgc2hhcGUgb2YgdGhlIHN0cm9rZS5cbiAgICAgKiBAcGFyYW0ge1NpemV9IHNpemUgQSBmdW5jdGlvbiByZXR1cm5pbmcgdGhlIHNpemUgb2YgYSBjZWxsIChpbiBnZW9ncmFwaGljYWwgdW5pdCkuXG4gICAgICogQHJldHVybnMgXG4gICAgICovXG4gICAgZHJhd1N0cm9rZShjZWxsLCByZXNvbHV0aW9uLCBjZywgc2hhcGUsIHNpemUpIHtcbiAgICAgICAgaWYgKCF0aGlzLnpmU3Ryb2tlXyB8fCBjZy56ZiA+IHRoaXMuemZTdHJva2VfKSByZXR1cm47XG5cbiAgICAgICAgY2cuY3R4LnN0cm9rZVN0eWxlID0gdGhpcy5zdHJva2VDb2xvcl87XG4gICAgICAgIGNnLmN0eC5saW5lV2lkdGggPSB0aGlzLnN0cm9rZVdpZHRoXztcblxuICAgICAgICAvL3NpemVcbiAgICAgICAgLyoqIEB0eXBlIHtudW1iZXJ9ICovXG4gICAgICAgIHNpemUgPSBzaXplIHx8IHsgdmFsOiBjID0+IHJlc29sdXRpb24sIHVuaXQ6IFwiZ2VvXCIgfTtcbiAgICAgICAgLy9zaXplIC0gaW4gcGl4ZWwgYW5kIGdlb1xuICAgICAgICBjb25zdCBzUCA9IHNpemUudW5pdCA9PT0gXCJwaXhcIiA/IHNpemUudmFsKGNlbGwpIDogc2l6ZS52YWwoY2VsbCkgLyBjZy56ZlxuICAgICAgICBjb25zdCBzRyA9IGNnLnpmICogc1A7XG5cbiAgICAgICAgY29uc3Qgc2hhcGVfID0gc2hhcGUoY2VsbCk7XG4gICAgICAgIGlmIChzaGFwZV8gPT09IFwic3F1YXJlXCIpIHtcbiAgICAgICAgICAgIC8vZHJhdyBzcXVhcmVcbiAgICAgICAgICAgIGNvbnN0IGQgPSByZXNvbHV0aW9uICogKDEgLSBzRyAvIHJlc29sdXRpb24pICogMC41XG4gICAgICAgICAgICBjZy5jdHguYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICBjZy5jdHgucmVjdChcbiAgICAgICAgICAgICAgICBjZy5nZW9Ub1BpeFgoY2VsbC54ICsgZCArIHRoaXMub2Zmc2V0Xy5keCksXG4gICAgICAgICAgICAgICAgY2cuZ2VvVG9QaXhZKGNlbGwueSArIHJlc29sdXRpb24gLSBkICsgdGhpcy5vZmZzZXRfLmR5KSxcbiAgICAgICAgICAgICAgICBzUCwgc1ApO1xuICAgICAgICAgICAgY2cuY3R4LnN0cm9rZSgpO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoc2hhcGVfID09PSBcImNpcmNsZVwiKSB7XG4gICAgICAgICAgICAvL2RyYXcgY2lyY2xlXG4gICAgICAgICAgICBjZy5jdHguYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICBjZy5jdHguYXJjKFxuICAgICAgICAgICAgICAgIGNnLmdlb1RvUGl4WChjZWxsLnggKyByZXNvbHV0aW9uICogMC41ICsgdGhpcy5vZmZzZXRfLmR4KSxcbiAgICAgICAgICAgICAgICBjZy5nZW9Ub1BpeFkoY2VsbC55ICsgcmVzb2x1dGlvbiAqIDAuNSArIHRoaXMub2Zmc2V0Xy5keSksXG4gICAgICAgICAgICAgICAgc1AgKiAwLjUsXG4gICAgICAgICAgICAgICAgMCwgMiAqIE1hdGguUEksIGZhbHNlKTtcbiAgICAgICAgICAgIGNnLmN0eC5zdHJva2UoKTtcbiAgICAgICAgfVxuICAgIH1cblxufVxuIiwiLy9AdHMtY2hlY2tcbi8qKiBAdHlwZWRlZiB7eyBkaW1zOiBvYmplY3QsIGNyczogc3RyaW5nLCB0aWxlU2l6ZUNlbGw6IG51bWJlciwgb3JpZ2luUG9pbnQ6IHt4Om51bWJlcix5Om51bWJlcn0sIHJlc29sdXRpb25HZW86IG51bWJlciwgdGlsaW5nQm91bmRzOkVudmVsb3BlIH19IEdyaWRJbmZvICovXG5cbmltcG9ydCB7IGNzdiB9IGZyb20gXCJkMy1mZXRjaFwiO1xuaW1wb3J0IHsgRGF0YXNldCwgQ2VsbCwgRW52ZWxvcGUgfSBmcm9tIFwiLi4vRGF0YXNldFwiXG5cbi8qKlxuICogQSBkYXRhc2V0IGNvbXBvc2VkIG9mIGEgc2luZ2xlIENTViBmaWxlIChub3QgdGlsZWQpLlxuICogXG4gKiBAYXV0aG9yIEp1bGllbiBHYWZmdXJpXG4gKi9cbmV4cG9ydCBjbGFzcyBDU1ZHcmlkIGV4dGVuZHMgRGF0YXNldCB7XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXJsIFRoZSB1cmwgb2YgdGhlIGRhdGFzZXQuXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHJlc29sdXRpb24gVGhlIGRhdGFzZXQgcmVzb2x1dGlvbiAoaW4gZ2VvZ3JhcGhpY2FsIHVuaXQpLlxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb24oQ2VsbCk6dm9pZH0gcHJlcHJvY2VzcyBBIHByZXByb2Nlc3MgdG8gcnVuIG9uIGVhY2ggY2VsbCBhZnRlciBsb2FkaW5nLiBJdCBjYW4gYmUgdXNlZCB0byBhcHBseSBzb21lIHNwZWNpZmljIHRyZWF0bWVudCBiZWZvcmUgb3IgY29tcHV0ZSBhIG5ldyBjb2x1bW4uXG4gICAgICovXG4gICAgY29uc3RydWN0b3IodXJsLCByZXNvbHV0aW9uLCBwcmVwcm9jZXNzID0gbnVsbCkge1xuICAgICAgICBzdXBlcih1cmwsIHJlc29sdXRpb24sIHByZXByb2Nlc3MpXG5cbiAgICAgICAgLyoqIEB0eXBlIHtBcnJheS48Q2VsbD59ICovXG4gICAgICAgIHRoaXMuY2VsbHMgPSB1bmRlZmluZWQ7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBSZXF1ZXN0IGRhdGEgd2l0aGluIGEgZ2VvZ3JhcGhpYyBlbnZlbG9wZS5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0VudmVsb3BlfSBlIFxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb24oKTp2b2lkfSByZWRyYXcgXG4gICAgICovXG4gICAgZ2V0RGF0YShlLCByZWRyYXcpIHtcblxuICAgICAgICAvL1RPRE8gZW5zdXJlIGl0IGlzIG5vdCBsb2FkaW5nIHR3aWNlID9cblxuICAgICAgICAvL2NoZWNrIGlmIGRhdGEgYWxyZWFkeSBsb2FkZWRcbiAgICAgICAgaWYodGhpcy5jZWxscykgcmV0dXJuIHRoaXM7XG5cbiAgICAgICAgLy9sb2FkIGRhdGFcbiAgICAgICAgY3N2KHRoaXMudXJsKVxuICAgICAgICAudGhlbihcbiAgICAgICAgICAgIC8qKiBAcGFyYW0geyp9IGRhdGEgKi9cbiAgICAgICAgICAgIChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgLy9jb252ZXJ0IGNvb3JkaW5hdGVzIGluIG51bWJlcnNcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGMgb2YgZGF0YSkgeyBjLng9K2MueDsgYy55PStjLnk7IH1cblxuICAgICAgICAgICAgICAgIHRoaXMuY2VsbHMgPSBkYXRhO1xuXG4gICAgICAgICAgICAgICAgLy9leGVjdXRlIHByZXByb2Nlc3MsIGlmIGFueVxuICAgICAgICAgICAgICAgIGlmKHRoaXMucHJlcHJvY2VzcykgZm9yIChjb25zdCBjIG9mIHRoaXMuY2VsbHMpIHRoaXMucHJlcHJvY2VzcyhjKTtcblxuICAgICAgICAgICAgICAgIC8vVE9ETyBjaGVjayBpZiByZWRyYXcgaXMgbmVjZXNzYXJ5XG4gICAgICAgICAgICAgICAgLy90aGF0IGlzIGlmIHRoZSBkYXRhc2V0IGJlbG9uZ3MgdG8gYSBsYXllciB3aGljaCBpcyB2aXNpYmxlIGF0IHRoZSBjdXJyZW50IHpvb20gbGV2ZWxcblxuICAgICAgICAgICAgICAgIC8vZXhlY3V0ZSB0aGUgY2FsbGJhY2ssIHVzdWFsbHkgYSBkcmF3IGZ1bmN0aW9uXG4gICAgICAgICAgICAgICAgaWYocmVkcmF3KSByZWRyYXcoKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgIC8vbWFyayBhcyBmYWlsZWRcbiAgICAgICAgICAgIHRoaXMuY2VsbHMgPSBbXVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEdldCBhbGwgY2VsbHMgZnJvbSBjYWNoZSB3aGljaCBhcmUgd2l0aGluIGEgZ2VvZ3JhcGhpY2FsIGVudmVsb3BlLlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7RW52ZWxvcGV9IGV4dEdlbyBcbiAgICAgKiBAcmV0dXJucyB7QXJyYXkuPENlbGw+fVxuICAgICAqL1xuICAgIGdldENlbGxzKGV4dEdlbykge1xuXG4gICAgICAgIC8vZGF0YSBub3QgbG9hZGVkIHlldFxuICAgICAgICBpZighdGhpcy5jZWxscykgcmV0dXJuIFtdO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7QXJyYXkuPENlbGw+fSAqL1xuICAgICAgICBsZXQgY2VsbHMgPSBbXVxuICAgICAgICBmb3IgKGNvbnN0IGNlbGwgb2YgdGhpcy5jZWxscykge1xuICAgICAgICAgICAgaWYoK2NlbGwueCArIHRoaXMucmVzb2x1dGlvbiA8IGV4dEdlby54TWluKSBjb250aW51ZTtcbiAgICAgICAgICAgIGlmKCtjZWxsLnggLSB0aGlzLnJlc29sdXRpb24gPiBleHRHZW8ueE1heCkgY29udGludWU7XG4gICAgICAgICAgICBpZigrY2VsbC55ICsgdGhpcy5yZXNvbHV0aW9uIDwgZXh0R2VvLnlNaW4pIGNvbnRpbnVlO1xuICAgICAgICAgICAgaWYoK2NlbGwueSAtIHRoaXMucmVzb2x1dGlvbiA+IGV4dEdlby55TWF4KSBjb250aW51ZTtcbiAgICAgICAgICAgIGNlbGxzLnB1c2goY2VsbClcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBjZWxscztcbiAgICB9XG5cbn1cbiIsIi8vQHRzLWNoZWNrXG5cbmltcG9ydCB7IENlbGwgfSBmcm9tIFwiLi4vRGF0YXNldFwiXG5pbXBvcnQgeyBHcmlkSW5mbyB9IGZyb20gXCIuL1RpbGVkR3JpZFwiXG5cbi8qKlxuICogQSBncmlkIHRpbGUuXG4gKiBcbiAqIEBhdXRob3IgSnVsaWVuIEdhZmZ1cmlcbiAqL1xuZXhwb3J0IGNsYXNzIEdyaWRUaWxlIHtcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7QXJyYXkuPENlbGw+fSBjZWxscyBUaGUgdGlsZSBjZWxscy5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0geFQgVGhlIFggcG9zaXRpb24gb2YgdGhlIHRpbGUuXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHlUIFRoZSBZIHBvc2l0aW9uIG9mIHRoZSB0aWxlLlxuICAgICAqIEBwYXJhbSB7R3JpZEluZm99IGdyaWRJbmZvIFRoZSBncmlkIGluZm8gb2JqZWN0LlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGNlbGxzLCB4VCwgeVQsIGdyaWRJbmZvKSB7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtBcnJheS48Q2VsbD59ICovXG4gICAgICAgIHRoaXMuY2VsbHMgPSBjZWxscztcbiAgICAgICAgLyoqIEB0eXBlIHtudW1iZXJ9ICovXG4gICAgICAgIHRoaXMueCA9IHhUXG4gICAgICAgIC8qKiBAdHlwZSB7bnVtYmVyfSAqL1xuICAgICAgICB0aGlzLnkgPSB5VFxuXG4gICAgICAgIGNvbnN0IHIgPSBncmlkSW5mby5yZXNvbHV0aW9uR2VvO1xuICAgICAgICBjb25zdCBzID0gZ3JpZEluZm8udGlsZVNpemVDZWxsO1xuXG4gICAgICAgIC8qKiBAdHlwZSB7aW1wb3J0KFwiLi4vRGF0YXNldFwiKS5FbnZlbG9wZX0gKi9cbiAgICAgICAgdGhpcy5leHRHZW8gPSB7XG4gICAgICAgICAgICB4TWluOiBncmlkSW5mby5vcmlnaW5Qb2ludC54ICsgciAqIHMgKiB0aGlzLngsXG4gICAgICAgICAgICB4TWF4OiBncmlkSW5mby5vcmlnaW5Qb2ludC54ICsgciAqIHMgKiAodGhpcy54ICsgMSksXG4gICAgICAgICAgICB5TWluOiBncmlkSW5mby5vcmlnaW5Qb2ludC55ICsgciAqIHMgKiB0aGlzLnksXG4gICAgICAgICAgICB5TWF4OiBncmlkSW5mby5vcmlnaW5Qb2ludC55ICsgciAqIHMgKiAodGhpcy55ICsgMSlcbiAgICAgICAgfVxuXG4gICAgICAgIC8vY29udmVydCBjZWxsIGNvb3JkaW5hdGVzIGludG8gZ2VvZ3JhcGhpY2FsIGNvb3JkaW5hdGVzXG4gICAgICAgIGZvciAobGV0IGNlbGwgb2YgdGhpcy5jZWxscykge1xuICAgICAgICAgICAgY2VsbC54ID0gdGhpcy5leHRHZW8ueE1pbiArIGNlbGwueCAqIHI7XG4gICAgICAgICAgICBjZWxsLnkgPSB0aGlzLmV4dEdlby55TWluICsgY2VsbC55ICogcjtcbiAgICAgICAgfVxuICAgIH1cblxufVxuIiwiLy9AdHMtY2hlY2tcbi8qKiBAdHlwZWRlZiB7eyBkaW1zOiBvYmplY3QsIGNyczogc3RyaW5nLCB0aWxlU2l6ZUNlbGw6IG51bWJlciwgb3JpZ2luUG9pbnQ6IHt4Om51bWJlcix5Om51bWJlcn0sIHJlc29sdXRpb25HZW86IG51bWJlciwgdGlsaW5nQm91bmRzOkVudmVsb3BlIH19IEdyaWRJbmZvICovXG5cbmltcG9ydCB7IGpzb24sIGNzdiB9IGZyb20gXCJkMy1mZXRjaFwiO1xuaW1wb3J0IHsgR3JpZFRpbGUgfSBmcm9tICcuL0dyaWRUaWxlJztcbmltcG9ydCB7IEFwcCB9IGZyb20gJy4uL0FwcCc7XG5pbXBvcnQgeyBEYXRhc2V0LCBDZWxsLCBFbnZlbG9wZSB9IGZyb20gXCIuLi9EYXRhc2V0XCJcblxuLyoqXG4gKiBBIHRpbGVkIGRhdGFzZXQsIGNvbXBvc2VkIG9mIENTViB0aWxlcy5cbiAqIFxuICogQGF1dGhvciBKdWxpZW4gR2FmZnVyaVxuICovXG5leHBvcnQgY2xhc3MgVGlsZWRHcmlkIGV4dGVuZHMgRGF0YXNldCB7XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXJsIFRoZSB1cmwgb2YgdGhlIGRhdGFzZXQgaW5mby5qc29uIGZpbGUuXG4gICAgICogQHBhcmFtIHtBcHB9IGFwcCBUaGUgYXBwLlxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb24oQ2VsbCk6dm9pZH0gcHJlcHJvY2VzcyBBIHByZXByb2Nlc3MgdG8gcnVuIG9uIGVhY2ggY2VsbCBhZnRlciBsb2FkaW5nLiBJdCBjYW4gYmUgdXNlZCB0byBhcHBseSBzb21lIHNwZWNpZmljIHRyZWF0bWVudCBiZWZvcmUgb3IgY29tcHV0ZSBhIG5ldyBjb2x1bW4uXG4gICAgICovXG4gICAgY29uc3RydWN0b3IodXJsLCBhcHAsIHByZXByb2Nlc3MgPSBudWxsKSB7XG4gICAgICAgIHN1cGVyKHVybCwgdW5kZWZpbmVkLCBwcmVwcm9jZXNzKVxuXG4gICAgICAgIC8qKiBcbiAgICAgICAgICogVGhlIGNhY2hlIG9mIHRoZSBsb2FkZWQgdGlsZXMuIEl0IGlzIGRvdWJsZSBpbmRleGVkOiBieSB4VCBhbmQgdGhlbiB5VC5cbiAgICAgICAgICogRXhhbXBsZTogdGhpcy5jYWNoZVt4VF1beVRdIHJldHVybnMgdGhlIHRpbGUgYXQgW3hUXVt5VF0gbG9jYXRpb24uXG4gICAgICAgICAqIFxuICAgICAgICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgICAgICAgKiAqL1xuICAgICAgICB0aGlzLmNhY2hlID0ge31cblxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIGdyaWQgaW5mbyBvYmplY3QsIGZyb20gdGhlIGluZm8uanNvbiBmaWxlLlxuICAgICAgICAgKiBcbiAgICAgICAgICogIEB0eXBlIHtHcmlkSW5mb31cbiAgICAgICAgICogICovXG4gICAgICAgIHRoaXMuaW5mbyA9IHVuZGVmaW5lZDtcblxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIGFwcCBiZWluZyB1c2VkLlxuICAgICAgICAgKiBcbiAgICAgICAgICogQHR5cGUge0FwcH1cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuYXBwID0gYXBwO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIExvYWQgdGhlIGluZm8uanNvbiBmcm9tIHRoZSB1cmwuXG4gICAgICogXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbigpOnZvaWR9IGNhbGxiYWNrXG4gICAgICogQHJldHVybnMgdGhpc1xuICAgICAqL1xuICAgIGxvYWRJbmZvKGNhbGxiYWNrKSB7XG4gICAgICAgIGlmICghdGhpcy5pbmZvKVxuICAgICAgICAgICAganNvbih0aGlzLnVybCArIFwiL2luZm8uanNvblwiKS50aGVuKFxuICAgICAgICAgICAgICAgIC8qKiBAcGFyYW0geyp9IGRhdGEgKi9cbiAgICAgICAgICAgICAgICAoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmluZm8gPSBkYXRhO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc29sdXRpb24gPSB0aGlzLmluZm8ucmVzb2x1dGlvbkdlbztcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSBjYWxsYmFjaygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG4gICAgICAgIGVsc2UgaWYgKGNhbGxiYWNrKSBjYWxsYmFjaygpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIENvbXB1dGUgYSB0aWxpbmcgZW52ZWxvcGUgZnJvbSBhIGdlb2dyYXBoaWNhbCBlbnZlbG9wZS5cbiAgICAgKiBUaGlzIGlzIHRoZSBmdW5jdGlvbiB0byB1c2UgdG8ga25vdyB3aGljaCB0aWxlcyB0byBkb3dubG9hZCBmb3IgYSBnZW9ncmFwaGljYWwgdmlldy5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0VudmVsb3BlfSBlIFxuICAgICAqIEByZXR1cm5zIHtFbnZlbG9wZX1cbiAgICAgKi9cbiAgICBnZXRUaWxpbmdFbnZlbG9wZShlKSB7XG4gICAgICAgIGNvbnN0IHBvID0gdGhpcy5pbmZvLm9yaWdpblBvaW50LFxuICAgICAgICAgICAgciA9IHRoaXMuaW5mby5yZXNvbHV0aW9uR2VvLFxuICAgICAgICAgICAgcyA9IHRoaXMuaW5mby50aWxlU2l6ZUNlbGw7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHhNaW46IE1hdGguZmxvb3IoKGUueE1pbiAtIHBvLngpIC8gKHIgKiBzKSksXG4gICAgICAgICAgICB4TWF4OiBNYXRoLmZsb29yKChlLnhNYXggLSBwby54KSAvIChyICogcykpLFxuICAgICAgICAgICAgeU1pbjogTWF0aC5mbG9vcigoZS55TWluIC0gcG8ueSkgLyAociAqIHMpKSxcbiAgICAgICAgICAgIHlNYXg6IE1hdGguZmxvb3IoKGUueU1heCAtIHBvLnkpIC8gKHIgKiBzKSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlcXVlc3QgZGF0YSB3aXRoaW4gYSBnZW9ncmFwaGljIGVudmVsb3BlLlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7RW52ZWxvcGV9IGV4dEdlbyBcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9uKCk6dm9pZH0gcmVkcmF3RnVuXG4gICAgICogQHJldHVybnMge3RoaXN9XG4gICAgICovXG4gICAgZ2V0RGF0YShleHRHZW8sIHJlZHJhd0Z1bikge1xuXG4gICAgICAgIC8vVE9ETyBlbXB0eSBjYWNoZSB3aGVuIGl0IGdldHMgdG9vIGJpZyA/XG5cbiAgICAgICAgLy9jaGVjayBpZiBpbmZvIGhhcyBiZWVuIGxvYWRlZFxuICAgICAgICBpZiAoIXRoaXMuaW5mbykgcmV0dXJuO1xuXG4gICAgICAgIC8vdGlsZXMgd2l0aGluIHRoZSBzY29wZVxuICAgICAgICAvKiogQHR5cGUge0VudmVsb3BlfSAqL1xuICAgICAgICBjb25zdCB0YiA9IHRoaXMuZ2V0VGlsaW5nRW52ZWxvcGUoZXh0R2VvKTtcblxuICAgICAgICAvL2dyaWQgYm91bmRzXG4gICAgICAgIC8qKiBAdHlwZSB7RW52ZWxvcGV9ICovXG4gICAgICAgIGNvbnN0IGdiID0gdGhpcy5pbmZvLnRpbGluZ0JvdW5kcztcblxuICAgICAgICBmb3IgKGxldCB4VCA9IE1hdGgubWF4KHRiLnhNaW4sIGdiLnhNaW4pOyB4VCA8PSBNYXRoLm1pbih0Yi54TWF4LCBnYi54TWF4KTsgeFQrKykge1xuICAgICAgICAgICAgZm9yIChsZXQgeVQgPSBNYXRoLm1heCh0Yi55TWluLCBnYi55TWluKTsgeVQgPD0gTWF0aC5taW4odGIueU1heCwgZ2IueU1heCk7IHlUKyspIHtcblxuICAgICAgICAgICAgICAgIC8vcHJlcGFyZSBjYWNoZVxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5jYWNoZVt4VF0pIHRoaXMuY2FjaGVbeFRdID0ge307XG5cbiAgICAgICAgICAgICAgICAvL2NoZWNrIGlmIHRpbGUgZXhpc3RzIGluIHRoZSBjYWNoZVxuICAgICAgICAgICAgICAgIC8qKiBAdHlwZSB7R3JpZFRpbGV9ICovXG4gICAgICAgICAgICAgICAgbGV0IHRpbGUgPSB0aGlzLmNhY2hlW3hUXVt5VF07XG4gICAgICAgICAgICAgICAgaWYgKHRpbGUpIGNvbnRpbnVlO1xuXG4gICAgICAgICAgICAgICAgLy9tYXJrIHRpbGUgYXMgbG9hZGluZ1xuICAgICAgICAgICAgICAgIHRoaXMuY2FjaGVbeFRdW3lUXSA9IFwibG9hZGluZ1wiXG5cbiAgICAgICAgICAgICAgICAvL3JlcXVlc3QgdGlsZVxuICAgICAgICAgICAgICAgIGNzdih0aGlzLnVybCArIHhUICsgXCIvXCIgKyB5VCArIFwiLmNzdlwiKVxuICAgICAgICAgICAgICAgICAgICAudGhlbihcbiAgICAgICAgICAgICAgICAgICAgICAgIC8qKiBAcGFyYW0geyp9IGRhdGEgKi9cbiAgICAgICAgICAgICAgICAgICAgICAgIChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9zdG9yZSB0aWxlIGluIGNhY2hlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdGlsZV8gPSBuZXcgR3JpZFRpbGUoZGF0YSwgeFQsIHlULCB0aGlzLmluZm8pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2FjaGVbeFRdW3lUXSA9IHRpbGVfO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9leGVjdXRlIHByZXByb2Nlc3MsIGlmIGFueVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnByZXByb2Nlc3MpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgYyBvZiB0aWxlXy5jZWxscylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJlcHJvY2VzcyhjKTtcblxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9pZiBubyByZWRyYXcgaXMgc3BlY2lmaWVkLCB0aGVuIGxlYXZlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFyZWRyYXdGdW4pIHJldHVybjtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vY2hlY2sgaWYgcmVkcmF3IGlzIHJlYWxseSBuZWVkZWQsIHRoYXQgaXMgaWY6XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAxLiB0aGUgZGF0YXNldCBiZWxvbmdzIHRvIGEgbGF5ZXIgd2hpY2ggaXMgdmlzaWJsZSBhdCB0aGUgY3VycmVudCB6b29tIGxldmVsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJlZHJhdyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgbGF5ZXIgb2YgdGhpcy5hcHAubGF5ZXJzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsYXllci5kYXRhc2V0ICE9IHRoaXMpIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobGF5ZXIubWF4Wm9vbSA8IHRoaXMuYXBwLnpvb21GYWN0b3IoKSkgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsYXllci5taW5ab29tID4gdGhpcy5hcHAuem9vbUZhY3RvcigpKSBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9mb3VuZCBvbmUgbGF5ZXIuIE5vIG5lZWQgdG8gc2VlayBtb3JlLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWRyYXcgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFyZWRyYXcpIHJldHVybjtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIDIuIHRoZSB0aWxlIGlzIHdpdGhpbiB0aGUgdmlldywgdGhhdCBpcyBpdHMgZ2VvIGVudmVsb3BlIGludGVyc2VjdHMgdGhlIHZpZXdlciBnZW8gZW52ZWxvcGUuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZW52ID0gdGhpcy5hcHAuY2cudXBkYXRlRXh0ZW50R2VvKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZW52VCA9IHRpbGVfLmV4dEdlbztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihlbnYueE1heCA8PSBlbnZULnhNaW4pIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihlbnYueE1pbiA+PSBlbnZULnhNYXgpIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihlbnYueU1heCA8PSBlbnZULnlNaW4pIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihlbnYueU1pbiA+PSBlbnZULnlNYXgpIHJldHVybjtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vcmVkcmF3XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVkcmF3RnVuKClcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIC5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL21hcmsgYXMgZmFpbGVkXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNhY2hlW3hUXVt5VF0gPSBcImZhaWxlZFwiXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogR2V0IGFsbCBjZWxscyBmcm9tIGNhY2hlIHdoaWNoIGFyZSB3aXRoaW4gYSBnZW9ncmFwaGljYWwgZW52ZWxvcGUuXG4gICAgICogXG4gICAgICogQHBhcmFtIHtFbnZlbG9wZX0gZXh0R2VvIFxuICAgICAqIEByZXR1cm5zIHtBcnJheS48Q2VsbD59XG4gICAgICovXG4gICAgZ2V0Q2VsbHMoZXh0R2VvKSB7XG5cbiAgICAgICAgLyoqIEB0eXBlIHtBcnJheS48Q2VsbD59ICovXG4gICAgICAgIGxldCBjZWxscyA9IFtdXG5cbiAgICAgICAgLy9jaGVjayBpZiBpbmZvIGhhcyBiZWVuIGxvYWRlZFxuICAgICAgICBpZiAoIXRoaXMuaW5mbykgcmV0dXJuIGNlbGxzO1xuXG4gICAgICAgIC8vdGlsZXMgd2l0aGluIHRoZSBzY29wZVxuICAgICAgICAvKiogQHR5cGUge0VudmVsb3BlfSAqL1xuICAgICAgICBjb25zdCB0YiA9IHRoaXMuZ2V0VGlsaW5nRW52ZWxvcGUoZXh0R2VvKTtcblxuICAgICAgICAvL2dyaWQgYm91bmRzXG4gICAgICAgIC8qKiBAdHlwZSB7RW52ZWxvcGV9ICovXG4gICAgICAgIGNvbnN0IGdiID0gdGhpcy5pbmZvLnRpbGluZ0JvdW5kcztcblxuICAgICAgICBmb3IgKGxldCB4VCA9IE1hdGgubWF4KHRiLnhNaW4sIGdiLnhNaW4pOyB4VCA8PSBNYXRoLm1pbih0Yi54TWF4LCBnYi54TWF4KTsgeFQrKykge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmNhY2hlW3hUXSkgY29udGludWU7XG4gICAgICAgICAgICBmb3IgKGxldCB5VCA9IE1hdGgubWF4KHRiLnlNaW4sIGdiLnlNaW4pOyB5VCA8PSBNYXRoLm1pbih0Yi55TWF4LCBnYi55TWF4KTsgeVQrKykge1xuXG4gICAgICAgICAgICAgICAgLy9nZXQgdGlsZVxuICAgICAgICAgICAgICAgIC8qKiBAdHlwZSB7R3JpZFRpbGV9ICovXG4gICAgICAgICAgICAgICAgY29uc3QgdGlsZSA9IHRoaXMuY2FjaGVbeFRdW3lUXTtcbiAgICAgICAgICAgICAgICBpZiAoIXRpbGUgfHwgdHlwZW9mIHRpbGUgPT09IFwic3RyaW5nXCIpIGNvbnRpbnVlO1xuXG4gICAgICAgICAgICAgICAgLy9nZXQgY2VsbHNcbiAgICAgICAgICAgICAgICBjZWxscyA9IGNlbGxzLmNvbmNhdCh0aWxlLmNlbGxzKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGNlbGxzO1xuICAgIH1cblxufVxuIiwiLy9AdHMtY2hlY2tcblxuaW1wb3J0IHsgQXBwIGFzIEFwcF8gfSBmcm9tIFwiLi9BcHBcIlxuaW1wb3J0ICogYXMgZHNjIGZyb20gXCJkMy1zY2FsZS1jaHJvbWF0aWNcIlxuXG5leHBvcnQgY29uc3QgQXBwID0gZnVuY3Rpb24gKG9wdHMpIHtcbiAgICByZXR1cm4gbmV3IEFwcF8ob3B0cylcbn1cblxuXG5cblxuLy9leHBvcnQgY29sb3IgKHRoZSBlbnRpcmUgZDMgc2NhbGUgY2hyb21hdGljKVxuZXhwb3J0IGNvbnN0IGNvbG9yID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBkc2Ncbn1cblxuXG5cblxuLy9leHBvcnQgZGF0YXNldCB0eXBlc1xuXG5pbXBvcnQgeyBDU1ZHcmlkIGFzIENTVkdyaWRfIH0gZnJvbSBcIi4vZGF0YXNldC9DU1ZHcmlkXCJcbmV4cG9ydCBjb25zdCBDU1ZHcmlkID0gZnVuY3Rpb24gKHVybCwgcmVzb2x1dGlvbiwgcHJlcHJvY2VzcyA9IG51bGwpIHtcbiAgICByZXR1cm4gbmV3IENTVkdyaWRfKHVybCwgcmVzb2x1dGlvbiwgcHJlcHJvY2Vzcylcbn1cblxuaW1wb3J0IHsgVGlsZWRHcmlkIGFzIFRpbGVkR3JpZF8gfSBmcm9tIFwiLi9kYXRhc2V0L1RpbGVkR3JpZFwiXG5leHBvcnQgY29uc3QgVGlsZWRHcmlkID0gZnVuY3Rpb24gKHVybCwgcHJlcHJvY2VzcyA9IG51bGwpIHtcbiAgICByZXR1cm4gbmV3IFRpbGVkR3JpZF8odXJsLCBwcmVwcm9jZXNzKVxufVxuXG5cblxuXG4vL2V4cG9ydCBzdHlsZXNcblxuaW1wb3J0IHsgU2hhcGVDb2xvclNpemVTdHlsZSBhcyBTaGFwZUNvbG9yU2l6ZVN0eWxlXyB9IGZyb20gXCIuL3N0eWxlL1NoYXBlQ29sb3JTaXplU3R5bGVcIlxuZXhwb3J0IGNvbnN0IFNoYXBlQ29sb3JTaXplU3R5bGUgPSBmdW5jdGlvbiAoY29sb3JfLCBzaXplLCBzaGFwZSkge1xuICAgIHJldHVybiBuZXcgU2hhcGVDb2xvclNpemVTdHlsZV8oY29sb3JfLCBzaXplLCBzaGFwZSlcbn1cblxuaW1wb3J0IHsgSm95UGxvdFN0eWxlIGFzIEpveVBsb3RTdHlsZV8gfSBmcm9tIFwiLi9zdHlsZS9Kb3lQbG90U3R5bGVcIlxuZXhwb3J0IGNvbnN0IEpveVBsb3RTdHlsZSA9IGZ1bmN0aW9uIChoZWlnaHQpIHtcbiAgICByZXR1cm4gbmV3IEpveVBsb3RTdHlsZV8oaGVpZ2h0KVxufVxuXG5pbXBvcnQgeyBDb21wb3NpdGlvblN0eWxlIGFzIENvbXBvc2l0aW9uU3R5bGVfIH0gZnJvbSBcIi4vc3R5bGUvQ29tcG9zaXRpb25TdHlsZVwiXG5leHBvcnQgY29uc3QgQ29tcG9zaXRpb25TdHlsZSA9IGZ1bmN0aW9uIChjb2xvcl8sIHR5cGUsIHNpemUpIHtcbiAgICByZXR1cm4gbmV3IENvbXBvc2l0aW9uU3R5bGVfKGNvbG9yXywgdHlwZSwgc2l6ZSlcbn1cblxuaW1wb3J0IHsgU2VnbWVudFN0eWxlIGFzIFNlZ21lbnRTdHlsZV8gfSBmcm9tIFwiLi9zdHlsZS9TZWdtZW50U3R5bGVcIlxuZXhwb3J0IGNvbnN0IFNlZ21lbnRTdHlsZSA9IGZ1bmN0aW9uIChvcmllbnRhdGlvbiwgY29sb3IsIGxlbmd0aCwgd2lkdGgpIHtcbiAgICByZXR1cm4gbmV3IFNlZ21lbnRTdHlsZV8ob3JpZW50YXRpb24sIGNvbG9yLCBsZW5ndGgsIHdpZHRoKVxufVxuXG4iLCIvL0B0cy1jaGVja1xuXG5pbXBvcnQgeyBTdHlsZSwgU2l6ZSB9IGZyb20gXCIuLi9TdHlsZVwiXG5pbXBvcnQgeyBDZWxsIH0gZnJvbSBcIi4uL0RhdGFzZXRcIlxuaW1wb3J0IHsgQ2FudmFzR2VvIH0gZnJvbSBcIi4uL0NhbnZhc0dlb1wiO1xuXG4vKipcbiAqIEEgc3R5bGUgc2hvd2luZyB0aGUgY29tcG9zaXRpb24gb2YgYSB0b3RhbCBpbiBkaWZmZXJlbnQgY2F0ZWdvcmllcywgd2l0aCBkaWZmZXJlbnQgY29sb3IgaHVlcy5cbiAqIEl0IGNvbnNpc3RzIG9mIGEgc3ltYm9sIHdpdGggZGlmZmVyZW50IHBhcnRzLCB3aG9zZSBzaXplIHJlZmxlY3QgdGhlIHByb3BvcnRpb24gb2YgdGhlIGNvcnJlc3BvbmRpbmcgY2F0ZWdvcnkuXG4gKiAzIHR5cGVzIG9mIHN5bWJvbHMgYXJlIHBvc3NpYmxlOlxuICogLSBGbGFnIChzcXVhcmUgc3ltYm9sLCB3aXRoIGRlY29tcG9zaXRpb24gaW50byB2ZXJ0aWNhbCBzdHJpcGVzKVxuICogLSBQaWUgY2hhcnQgKGNpcmN1bGFyIHN5bWJvbCwgd2l0aCBkZWNvbXBvc2l0aW9uIGludG8gYW5ndWxhciBzZWN0b3JzKVxuICogLSBSaW5nIChjaXJjdWxhciBzeW1ib2wsIHdpdGggZGVjb21wb3NpdGlvbiBpbnRvIGNvbmNlbnRyaWMgcmluZ3MpXG4gKiBUaGUgc3ltYm9sIGNhbiBiZSBzY2FsZWQgZGVwZW5kaW5nIG9uIHRoZSBjZWxsIGltcG9ydGFuY2UuXG4gKiBcbiAqIEBhdXRob3IgSnVsaWVuIEdhZmZ1cmlcbiAqL1xuZXhwb3J0IGNsYXNzIENvbXBvc2l0aW9uU3R5bGUgZXh0ZW5kcyBTdHlsZSB7XG5cbiAgICAvKipcbiAgICAgICogQHBhcmFtIHtPYmplY3R9IGNvbG9yIFRoZSBkaWN0aW9uYXJ5IHdoaWNoIGdpdmUgdGhlIGNvbG9yIG9mIGVhY2ggY2F0ZWdvcnkuXG4gICAgICAqIEBwYXJhbSB7ZnVuY3Rpb24oQ2VsbCk6c3RyaW5nfSB0eXBlIEEgZnVuY3Rpb24gcmV0dXJuaW5nIHRoZSB0eXBlIG9mIGRlY29tcG9zaXRpb24gc3ltYm9sIG9mIGEgY2VsbDogQW1vbmcgJ2ZsYWcnLCAncGllY2hhcnQnIGFuZCAncmluZydcbiAgICAgICogQHBhcmFtIHtTaXplfSBzaXplIEEgZnVuY3Rpb24gcmV0dXJuaW5nIHRoZSBzaXplIG9mIGEgY2VsbCAoaW4gZ2VvZ3JhcGhpY2FsIHVuaXQpLlxuICAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcihjb2xvciwgdHlwZSA9IG51bGwsIHNpemUgPSBudWxsKSB7XG4gICAgICAgIHN1cGVyKClcblxuICAgICAgICAvL2RpY3Rpb25uYXJ5IGNvbHVtbiAtPiBjb2xvclxuICAgICAgICAvKiogQHByaXZhdGUgQHR5cGUge29iamVjdH0gKi9cbiAgICAgICAgdGhpcy5jb2xvcl8gPSBjb2xvcjtcblxuICAgICAgICAvKiogQHByaXZhdGUgQHR5cGUge2Z1bmN0aW9uKENlbGwpOnN0cmluZ30gKi9cbiAgICAgICAgdGhpcy50eXBlXyA9IHR5cGU7XG5cbiAgICAgICAgLyoqIEBwcml2YXRlIEB0eXBlIHtTaXplfSAqL1xuICAgICAgICB0aGlzLnNpemVfID0gc2l6ZTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIERyYXcgY2VsbHMgYXMgc3F1YXJlcyBkZXBlbmRpbmcgb24gdGhlaXIgdmFsdWUuXG4gICAgICogXG4gICAgICogQHBhcmFtIHtBcnJheS48Q2VsbD59IGNlbGxzIFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSByZXNvbHV0aW9uIFxuICAgICAqIEBwYXJhbSB7Q2FudmFzR2VvfSBjZyBcbiAgICAgKi9cbiAgICBkcmF3KGNlbGxzLCByZXNvbHV0aW9uLCBjZykge1xuXG4gICAgICAgIC8vaWYgc2l6ZSBpcyB1c2VkLCBzb3J0IGNlbGxzIGJ5IHNpemUgc28gdGhhdCB0aGUgYmlnZ2VzdCBhcmUgZHJhd24gZmlyc3RcbiAgICAgICAgaWYgKHRoaXMuc2l6ZV8pXG4gICAgICAgICAgICBjZWxscy5zb3J0KChjMSwgYzIpID0+ICh0aGlzLnNpemVfLnZhbChjMikgLSB0aGlzLnNpemVfLnZhbChjMSkpKTtcblxuICAgICAgICBmb3IgKGxldCBjZWxsIG9mIGNlbGxzKSB7XG5cbiAgICAgICAgICAgIC8vY29tcHV0ZSB0b3RhbFxuICAgICAgICAgICAgbGV0IHRvdGFsID0gMDtcbiAgICAgICAgICAgIGZvciAobGV0IGNvbHVtbiBvZiBPYmplY3Qua2V5cyh0aGlzLmNvbG9yXykpXG4gICAgICAgICAgICAgICAgdG90YWwgKz0gK2NlbGxbY29sdW1uXVxuXG4gICAgICAgICAgICAvL3NpemVcbiAgICAgICAgICAgIC8qKiBAdHlwZSB7U2l6ZX0gKi9cbiAgICAgICAgICAgIGxldCBzXyA9IHRoaXMuc2l6ZV8gfHwgeyB2YWw6IGM9PnJlc29sdXRpb24sIHVuaXQ6IFwiZ2VvXCIgfTtcbiAgICAgICAgICAgIC8vc2l6ZSAtIGluIHBpeGVsIGFuZCBnZW9cbiAgICAgICAgICAgIC8qKiBAdHlwZSB7bnVtYmVyfSAqL1xuICAgICAgICAgICAgY29uc3Qgc1AgPSBzXy51bml0ID09PSBcInBpeFwiID8gc18udmFsKGNlbGwpIDogc18udmFsKGNlbGwpIC8gY2cuemZcbiAgICAgICAgICAgIC8qKiBAdHlwZSB7bnVtYmVyfSAqL1xuICAgICAgICAgICAgY29uc3Qgc0cgPSBjZy56ZiAqIHNQO1xuXG4gICAgICAgICAgICAvL2dldCBzeW1ib2wgdHlwZVxuICAgICAgICAgICAgY29uc3QgdHlwZV8gPSB0aGlzLnR5cGVfID8gdGhpcy50eXBlXyhjZWxsKSA6IFwiZmxhZ1wiXG5cbiAgICAgICAgICAgIC8vZHJhdyBkZWNvbXBvc2l0aW9uIHN5bWJvbFxuICAgICAgICAgICAgbGV0IGN1bXVsID0gMDtcbiAgICAgICAgICAgIGNvbnN0IGQgPSByZXNvbHV0aW9uICogKDEgLSBzRyAvIHJlc29sdXRpb24pICogMC41XG4gICAgICAgICAgICBmb3IgKGxldCBbY29sdW1uLCBjb2xvcl0gb2YgT2JqZWN0LmVudHJpZXModGhpcy5jb2xvcl8pKSB7XG5cbiAgICAgICAgICAgICAgICAvL3NldCBjb2xvclxuICAgICAgICAgICAgICAgIGNnLmN0eC5maWxsU3R5bGUgPSBjb2xvcjtcblxuICAgICAgICAgICAgICAgIC8vY29tcHV0ZSBzaGFyZVxuICAgICAgICAgICAgICAgIGNvbnN0IHNoYXJlID0gY2VsbFtjb2x1bW5dIC8gdG90YWw7XG5cbiAgICAgICAgICAgICAgICAvL2RyYXcgc3ltYm9sIHBhcnRcbiAgICAgICAgICAgICAgICBpZiAodHlwZV8gPT09IFwiZmxhZ1wiKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vZHJhdyBmbGFnIHZlcnRpY2FsIHN0cmlwZVxuICAgICAgICAgICAgICAgICAgICBjZy5jdHguZmlsbFJlY3QoXG4gICAgICAgICAgICAgICAgICAgICAgICBjdW11bCAqIHNQICsgY2cuZ2VvVG9QaXhYKGNlbGwueCArIGQgKyB0aGlzLm9mZnNldF8uZHgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2cuZ2VvVG9QaXhZKGNlbGwueSArIHJlc29sdXRpb24gLSBkICsgdGhpcy5vZmZzZXRfLmR5KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNoYXJlICogc1AsIHNQKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVfID09PSBcInBpZWNoYXJ0XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgLy9kcmF3IHBpZSBjaGFydCBhbmd1bGFyIHNlY3RvclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB4YyA9IGNnLmdlb1RvUGl4WChjZWxsLnggKyByZXNvbHV0aW9uICogMC41ICsgdGhpcy5vZmZzZXRfLmR4KTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgeWMgPSBjZy5nZW9Ub1BpeFkoY2VsbC55ICsgcmVzb2x1dGlvbiAqIDAuNSArIHRoaXMub2Zmc2V0Xy5keSk7XG4gICAgICAgICAgICAgICAgICAgIGNnLmN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgICAgICAgICAgICAgY2cuY3R4Lm1vdmVUbyh4YywgeWMpO1xuICAgICAgICAgICAgICAgICAgICBjZy5jdHguYXJjKHhjLCB5Yywgc1AgKiAwLjUsIGN1bXVsICogMiAqIE1hdGguUEksIChjdW11bCArIHNoYXJlKSAqIDIgKiBNYXRoLlBJKTtcbiAgICAgICAgICAgICAgICAgICAgY2cuY3R4LmxpbmVUbyh4YywgeWMpO1xuICAgICAgICAgICAgICAgICAgICBjZy5jdHguZmlsbCgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZV8gPT09IFwicmluZ1wiKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vZHJhdyByaW5nXG4gICAgICAgICAgICAgICAgICAgIC8vVE9ETyBuZWVkIHRvIGNvbXB1dGUgcmFkaXVzIHByb3Blcmx5ICEgVmFyaWF0aW9uIGFzIHJvb3RzcXVhcmUgb2Ygc2hhcmUgIVxuICAgICAgICAgICAgICAgICAgICBjZy5jdHguYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICAgICAgICAgIGNnLmN0eC5hcmMoXG4gICAgICAgICAgICAgICAgICAgICAgICBjZy5nZW9Ub1BpeFgoY2VsbC54ICsgcmVzb2x1dGlvbiAqIDAuNSArIHRoaXMub2Zmc2V0Xy5keCksXG4gICAgICAgICAgICAgICAgICAgICAgICBjZy5nZW9Ub1BpeFkoY2VsbC55ICsgcmVzb2x1dGlvbiAqIDAuNSArIHRoaXMub2Zmc2V0Xy5keSksXG4gICAgICAgICAgICAgICAgICAgICAgICBNYXRoLnNxcnQoMSAtIGN1bXVsKSAqIHNQICogMC41LFxuICAgICAgICAgICAgICAgICAgICAgICAgMCwgMiAqIE1hdGguUEkpO1xuICAgICAgICAgICAgICAgICAgICBjZy5jdHguZmlsbCgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVW5leHBlY3RlZCBzeW1ib2wgdHlwZTonICsgdHlwZV8pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGN1bXVsICs9IHNoYXJlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvL2RyYXcgc3Ryb2tlXG4gICAgICAgICAgICB0aGlzLmRyYXdTdHJva2UoY2VsbCwgcmVzb2x1dGlvbiwgY2csIChjKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICh0eXBlXyA9PT0gXCJmbGFnXCIpID8gXCJzcXVhcmVcIiA6IFwiY2lyY2xlXCJcbiAgICAgICAgICAgIH0sIHRoaXMuc2l6ZV8pXG4gICAgICAgIH1cblxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGNvbG9yIFxuICAgICAqIEByZXR1cm5zIHt0aGlzfG9iamVjdH1cbiAgICAgKi9cbiAgICBjb2xvcihjb2xvcikge1xuICAgICAgICBpZiAoY29sb3IpIHtcbiAgICAgICAgICAgIHRoaXMuY29sb3JfID0gY29sb3I7XG4gICAgICAgICAgICByZXR1cm4gdGhpc1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmNvbG9yX1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb24oQ2VsbCk6c3RyaW5nfSB0eXBlIFxuICAgICAqIEByZXR1cm5zIHt0aGlzfGZ1bmN0aW9uKENlbGwpOnN0cmluZ31cbiAgICAgKi9cbiAgICB0eXBlKHR5cGUpIHtcbiAgICAgICAgaWYgKHR5cGUpIHtcbiAgICAgICAgICAgIHRoaXMudHlwZV8gPSB0eXBlO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXNcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy50eXBlX1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7U2l6ZX0gc2l6ZSBcbiAgICAgKiBAcmV0dXJucyB7dGhpc3xTaXplfVxuICAgICAqL1xuICAgIHNpemUoc2l6ZSkge1xuICAgICAgICBpZiAoc2l6ZSkge1xuICAgICAgICAgICAgdGhpcy5zaXplXyA9IHNpemU7XG4gICAgICAgICAgICByZXR1cm4gdGhpc1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnNpemVfXG4gICAgfVxuXG59XG4iLCIvL0B0cy1jaGVja1xuXG5pbXBvcnQgeyBTdHlsZSwgU2l6ZSB9IGZyb20gXCIuLi9TdHlsZVwiXG5pbXBvcnQgeyBDZWxsIH0gZnJvbSBcIi4uL0RhdGFzZXRcIlxuaW1wb3J0IHsgQ2FudmFzR2VvIH0gZnJvbSBcIi4uL0NhbnZhc0dlb1wiO1xuXG4vKipcbiAqIFxuICogQGF1dGhvciBKdWxpZW4gR2FmZnVyaVxuICovXG5leHBvcnQgY2xhc3MgSm95UGxvdFN0eWxlIGV4dGVuZHMgU3R5bGUge1xuXG4gICAgLyoqXG4gICAgICAqIEBwYXJhbSB7U2l6ZX0gaGVpZ2h0IEEgZnVuY3Rpb24gcmV0dXJuaW5nIHRoZSBoZWlnaHQgb2YgYSBjZWxsLlxuICAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihoZWlnaHQpIHtcbiAgICAgICAgc3VwZXIoKVxuXG4gICAgICAgIC8qKiBAcHJpdmF0ZSBAdHlwZSB7U2l6ZX0gKi9cbiAgICAgICAgdGhpcy5oZWlnaHRfID0gaGVpZ2h0O1xuXG4gICAgICAgIC8qKiBAcHJpdmF0ZSBAdHlwZSB7c3RyaW5nfSAqL1xuICAgICAgICB0aGlzLmxpbmVDb2xvcl8gPSBcImdyYXlcIlxuICAgICAgICAvKiogQHByaXZhdGUgQHR5cGUge251bWJlcn0gKi9cbiAgICAgICAgdGhpcy5saW5lV2lkdGhfID0gMTtcbiAgICAgICAgLyoqIEBwcml2YXRlIEB0eXBlIHtzdHJpbmd9ICovXG4gICAgICAgIHRoaXMuZmlsbENvbG9yXyA9IFwicmdiYSgxOTIsIDE0MCwgODksIDAuNClcIlxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogRHJhdyBjZWxscyBhcyBzcXVhcmVzIGRlcGVuZGluZyBvbiB0aGVpciB2YWx1ZS5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0FycmF5LjxDZWxsPn0gY2VsbHMgXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHIgXG4gICAgICogQHBhcmFtIHtDYW52YXNHZW99IGNnIFxuICAgICAqL1xuICAgIGRyYXcoY2VsbHMsIHIsIGNnKSB7XG5cbiAgICAgICAgLy9pbmRleCBjZWxscyBieSB5IGFuZCB4XG4gICAgICAgIC8qKiAgQHR5cGUge29iamVjdH0gKi9cbiAgICAgICAgY29uc3QgaW5kID0ge307XG4gICAgICAgIGZvciAoY29uc3QgY2VsbCBvZiBjZWxscykge1xuICAgICAgICAgICAgbGV0IHJvdyA9IGluZFtjZWxsLnldO1xuICAgICAgICAgICAgaWYgKCFyb3cpIHsgcm93ID0ge307IGluZFtjZWxsLnldID0gcm93IH1cbiAgICAgICAgICAgIHJvd1tjZWxsLnhdID0gdGhpcy5oZWlnaHRfLnZhbChjZWxsKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgLy9jb21wdXRlIGV4dGVudFxuICAgICAgICBjb25zdCBlID0gY2cuZXh0R2VvO1xuICAgICAgICBjb25zdCB4TWluID0gTWF0aC5mbG9vcihlLnhNaW4gLyByKSAqIHI7XG4gICAgICAgIGNvbnN0IHhNYXggPSBNYXRoLmZsb29yKGUueE1heCAvIHIpICogcjtcbiAgICAgICAgY29uc3QgeU1pbiA9IE1hdGguZmxvb3IoZS55TWluIC8gcikgKiByO1xuICAgICAgICBjb25zdCB5TWF4ID0gTWF0aC5mbG9vcihlLnlNYXggLyByKSAqIHI7XG5cbiAgICAgICAgLy9zZXQgY29sb3IgYW5kIHdpZHRoXG4gICAgICAgIGNnLmN0eC5zdHJva2VTdHlsZSA9IHRoaXMubGluZUNvbG9yXztcbiAgICAgICAgY2cuY3R4LmxpbmVXaWR0aCA9IHRoaXMubGluZVdpZHRoXztcbiAgICAgICAgY2cuY3R4LmZpbGxTdHlsZSA9IHRoaXMuZmlsbENvbG9yXztcblxuICAgICAgICAvL2RyYXcgbGluZXMsIHJvdyBieSByb3csIHN0YXRpbmcgZnJvbSB0aGUgdG9wXG4gICAgICAgIGZvciAobGV0IHkgPSB5TWF4OyB5ID49IHlNaW47IHkgLT0gcikge1xuXG4gICAgICAgICAgICAvL2dldCByb3dcbiAgICAgICAgICAgIGNvbnN0IHJvdyA9IGluZFt5XVxuXG4gICAgICAgICAgICAvL25vIHJvd1xuICAgICAgICAgICAgaWYgKCFyb3cpIGNvbnRpbnVlO1xuXG4gICAgICAgICAgICAvL2NvbXB1dGUgcm93IGJhc2VsaW5lXG4gICAgICAgICAgICBjb25zdCB5UCA9IGNnLmdlb1RvUGl4WSh5KTtcblxuICAgICAgICAgICAgLy9wbGFjZSBmaXJzdCBwb2ludFxuICAgICAgICAgICAgY2cuY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgY2cuY3R4Lm1vdmVUbyhjZy5nZW9Ub1BpeFgoeE1pbiAtIHIgLyAyKSwgeVApO1xuXG4gICAgICAgICAgICAvL3N0b3JlIHRoZSBwcmV2aW91cyBoZWlnaHRcbiAgICAgICAgICAgIC8qKiBAdHlwZSB7bnVtYmVyfSAqL1xuICAgICAgICAgICAgbGV0IGhHXztcblxuICAgICAgICAgICAgLy9nbyB0aHJvdWdoIHRoZSBsaW5lIGNlbGxzXG4gICAgICAgICAgICBmb3IgKGxldCB4ID0geE1pbjsgeCA8PSB4TWF4OyB4ICs9IHIpIHtcblxuICAgICAgICAgICAgICAgIC8vZ2V0IGNvbHVtbiB2YWx1ZVxuICAgICAgICAgICAgICAgIC8qKiBAdHlwZSB7bnVtYmVyfSAqL1xuICAgICAgICAgICAgICAgIGxldCBoRyA9IHJvd1t4XTtcbiAgICAgICAgICAgICAgICBpZiAoIWhHKSBoRyA9IDA7XG5cbiAgICAgICAgICAgICAgICBpZiAoaEcgfHwgaEdfKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vZHJhdyBsaW5lIG9ubHkgd2hlbiBhdCBsZWFzdCBvbmUgb2YgYm90aCB2YWx1ZXMgaXMgbm9uLW51bGxcbiAgICAgICAgICAgICAgICAgICAgLy9UT0RPIHRlc3QgYmV6aWVyQ3VydmVUb1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBkeVAgPSB0aGlzLmhlaWdodF8udW5pdD09PVwicGl4XCIgPyBoRyA6IGhHIC8gY2cuemZcbiAgICAgICAgICAgICAgICAgICAgY2cuY3R4LmxpbmVUbyhjZy5nZW9Ub1BpeFgoeCArIHIgLyAyKSwgeVAgLSBkeVApO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vZWxzZSBtb3ZlIHRoZSBwb2ludFxuICAgICAgICAgICAgICAgICAgICBjZy5jdHgubW92ZVRvKGNnLmdlb1RvUGl4WCh4ICsgciAvIDIpLCB5UCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vc3RvcmUgdGhlIHByZXZpb3VzIHZhbHVlXG4gICAgICAgICAgICAgICAgaEdfID0gaEc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vbGFzdCBwb2ludFxuICAgICAgICAgICAgaWYgKGhHXylcbiAgICAgICAgICAgICAgICBjZy5jdHgubGluZVRvKGNnLmdlb1RvUGl4WCh4TWF4ICsgciAvIDIpLCB5UCk7XG5cbiAgICAgICAgICAgIC8vZHJhdyBmaWxsXG4gICAgICAgICAgICBpZiAodGhpcy5maWxsQ29sb3JfKVxuICAgICAgICAgICAgICAgIGNnLmN0eC5maWxsKClcbiAgICAgICAgICAgIC8vZHJhdyBsaW5lXG4gICAgICAgICAgICBpZiAodGhpcy5saW5lQ29sb3JfICYmIHRoaXMubGluZVdpZHRoXyA+IDApXG4gICAgICAgICAgICAgICAgY2cuY3R4LnN0cm9rZSgpO1xuXG4gICAgICAgIH1cbiAgICB9XG5cblxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtTaXplfSBoZWlnaHQgXG4gICAgICogQHJldHVybnMge3RoaXN8U2l6ZX1cbiAgICAgKi9cbiAgICBoZWlnaHQoaGVpZ2h0KSB7XG4gICAgICAgIGlmIChoZWlnaHQpIHtcbiAgICAgICAgICAgIHRoaXMuaGVpZ2h0XyA9IGhlaWdodDtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmhlaWdodF87XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGxpbmVDb2xvciBcbiAgICAgKiBAcmV0dXJucyB7dGhpc3xzdHJpbmd9XG4gICAgICovXG4gICAgbGluZUNvbG9yKGxpbmVDb2xvcikge1xuICAgICAgICBpZiAobGluZUNvbG9yKSB7XG4gICAgICAgICAgICB0aGlzLmxpbmVDb2xvcl8gPSBsaW5lQ29sb3I7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5saW5lQ29sb3JfO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBsaW5lV2lkdGggXG4gICAgICogQHJldHVybnMge3RoaXN8bnVtYmVyfVxuICAgICAqL1xuICAgIGxpbmVXaWR0aChsaW5lV2lkdGgpIHtcbiAgICAgICAgaWYgKGxpbmVXaWR0aCkge1xuICAgICAgICAgICAgdGhpcy5saW5lV2lkdGhfID0gbGluZVdpZHRoO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMubGluZVdpZHRoXztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZmlsbENvbG9yIFxuICAgICAqIEByZXR1cm5zIHt0aGlzfHN0cmluZ31cbiAgICAgKi9cbiAgICBmaWxsQ29sb3IoZmlsbENvbG9yKSB7XG4gICAgICAgIGlmIChmaWxsQ29sb3IpIHtcbiAgICAgICAgICAgIHRoaXMuZmlsbENvbG9yXyA9IGZpbGxDb2xvcjtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmZpbGxDb2xvcl87XG4gICAgfVxuXG59XG4iLCIvL0B0cy1jaGVja1xuXG5pbXBvcnQgeyBTdHlsZSwgU2l6ZSB9IGZyb20gXCIuLi9TdHlsZVwiXG5pbXBvcnQgeyBDZWxsIH0gZnJvbSBcIi4uL0RhdGFzZXRcIlxuaW1wb3J0IHsgQ2FudmFzR2VvIH0gZnJvbSBcIi4uL0NhbnZhc0dlb1wiO1xuXG4vKipcbiAqIEEgc3R5bGUgd2hlcmUgZWFjaCBjZWxsIGlzIHJlcHJlc2VudGVkIGJ5IGEgc2VnbWVudCB3aG9zZSBsZW5ndGgsIHdpZHRoLCBjb2xvciBhbmQgb3JpZW50YXRpb24gY2FuIHZhcnkgYWNjb3JkaW5nIHRvIHN0YXRpc3RpY2FsIHZhbHVlcy5cbiAqIFxuICogQGF1dGhvciBKdWxpZW4gR2FmZnVyaVxuICovXG5leHBvcnQgY2xhc3MgU2VnbWVudFN0eWxlIGV4dGVuZHMgU3R5bGUge1xuXG4gICAgLyoqXG4gICAgICAqIEBwYXJhbSB7ZnVuY3Rpb24oQ2VsbCk6bnVtYmVyfSBvcmllbnRhdGlvbiBBIGZ1bmN0aW9uIHJldHVybmluZyB0aGUgb3JpZW50YXRpb24gKGluIGRlZ3JlZXMpIG9mIHRoZSBzZWdtZW50IHJlcHJlc2VudGluZyBhIGNlbGwuXG4gICAgICAqIEBwYXJhbSB7ZnVuY3Rpb24oQ2VsbCk6c3RyaW5nfSBjb2xvciBBIGZ1bmN0aW9uIHJldHVybmluZyB0aGUgY29sb3Igb2YgdGhlIHNlZ21lbnQgcmVwcmVzZW50aW5nIGEgY2VsbC5cbiAgICAgICogQHBhcmFtIHtTaXplfSBsZW5ndGggQSBmdW5jdGlvbiByZXR1cm5pbmcgdGhlIGxlbmd0aCBvZiB0aGUgc2VnbWVudCByZXByZXNlbnRpbmcgYSBjZWxsLlxuICAgICAgKiBAcGFyYW0ge1NpemV9IHdpZHRoIEEgZnVuY3Rpb24gcmV0dXJuaW5nIHRoZSB3aWR0aCBvZiB0aGUgc2VnbWVudCByZXByZXNlbnRpbmcgYSBjZWxsLlxuICAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihvcmllbnRhdGlvbiwgY29sb3IsIGxlbmd0aCwgd2lkdGgpIHtcbiAgICAgICAgc3VwZXIoKVxuXG4gICAgICAgIC8qKiBAcHJpdmF0ZSBAdHlwZSB7ZnVuY3Rpb24oQ2VsbCk6bnVtYmVyfSAqL1xuICAgICAgICB0aGlzLm9yaWVudGF0aW9uID0gb3JpZW50YXRpb247XG4gICAgICAgIC8qKiBAcHJpdmF0ZSBAdHlwZSB7ZnVuY3Rpb24oQ2VsbCk6c3RyaW5nfSAqL1xuICAgICAgICB0aGlzLmNvbG9yID0gY29sb3I7XG4gICAgICAgIC8qKiBAcHJpdmF0ZSBAdHlwZSB7U2l6ZX0gKi9cbiAgICAgICAgdGhpcy5sZW5ndGggPSBsZW5ndGg7XG4gICAgICAgIC8qKiBAcHJpdmF0ZSBAdHlwZSB7U2l6ZX0gKi9cbiAgICAgICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuXG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBEcmF3IGNlbGxzIGFzIHNlZ21lbnRzLlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7QXJyYXkuPENlbGw+fSBjZWxscyBcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gcmVzb2x1dGlvbiBcbiAgICAgKiBAcGFyYW0ge0NhbnZhc0dlb30gY2cgXG4gICAgICovXG4gICAgZHJhdyhjZWxscywgcmVzb2x1dGlvbiwgY2cpIHtcblxuICAgICAgICAvL2NvbnZlcnNpb24gZmFjdG9yIGRlZ3JlZSAtPiByYWRpYW5cbiAgICAgICAgY29uc3QgZiA9IE1hdGguUEkgLyAxODA7XG5cbiAgICAgICAgZm9yIChsZXQgYyBvZiBjZWxscykge1xuXG4gICAgICAgICAgICAvL3NldCB3aWR0aCBhbmQgY29sb3JcbiAgICAgICAgICAgIGNnLmN0eC5saW5lV2lkdGggPSB0aGlzLndpZHRoLnVuaXQgPT09IFwicGl4XCIgPyB0aGlzLndpZHRoLnZhbChjKSA6IHRoaXMud2lkdGgudmFsKGMpIC8gY2cuemY7XG4gICAgICAgICAgICBjZy5jdHguc3Ryb2tlU3R5bGUgPSB0aGlzLmNvbG9yKGMpO1xuXG4gICAgICAgICAgICAvL2dldCBzZWdtZW50IG9yaWVudGF0aW9uIChpbiByYWRpYW4pIGFuZCBsZW5ndGggKGluIHBpeGVsKVxuICAgICAgICAgICAgLyoqIEB0eXBlIHtudW1iZXJ9ICovXG4gICAgICAgICAgICBjb25zdCBvciA9IHRoaXMub3JpZW50YXRpb24oYykgKiBmXG4gICAgICAgICAgICAvKiogQHR5cGUge251bWJlcn0gKi9cbiAgICAgICAgICAgIGNvbnN0IGxlbiA9IHRoaXMubGVuZ3RoLnVuaXQgPT09IFwicGl4XCI/IHRoaXMubGVuZ3RoLnZhbChjKSA6IHRoaXMubGVuZ3RoLnZhbChjKSAvIGNnLnpmXG5cbiAgICAgICAgICAgIC8vZ2V0IHNlZ21lbnQgY2VudGVyXG4gICAgICAgICAgICBjb25zdCBjeCA9IGNnLmdlb1RvUGl4WChjLnggKyByZXNvbHV0aW9uIC8gMiArIHRoaXMub2Zmc2V0Xy5keCksXG4gICAgICAgICAgICAgICAgY3kgPSBjZy5nZW9Ub1BpeFkoYy55ICsgcmVzb2x1dGlvbiAvIDIgKyB0aGlzLm9mZnNldF8uZHkpO1xuXG4gICAgICAgICAgICAvL2dldCBkaXJlY3Rpb25cbiAgICAgICAgICAgIGNvbnN0IGR4ID0gMC41ICogTWF0aC5jb3Mob3IpICogbGVuLFxuICAgICAgICAgICAgICAgIGR5ID0gMC41ICogTWF0aC5zaW4ob3IpICogbGVuO1xuXG4gICAgICAgICAgICAvL2RyYXcgc2VnbWVudFxuICAgICAgICAgICAgY2cuY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgY2cuY3R4Lm1vdmVUbyhjeCAtIGR4LCBjeSAtIGR5KTtcbiAgICAgICAgICAgIGNnLmN0eC5saW5lVG8oY3ggKyBkeCwgY3kgKyBkeSk7XG4gICAgICAgICAgICBjZy5jdHguc3Ryb2tlKCk7XG4gICAgICAgIH1cblxuICAgIH1cblxuXG5cbiAgICAvL2dldHRlcnMgYW5kIHNldHRlcnNcblxuICAgIC8qKiBAcmV0dXJucyB7ZnVuY3Rpb24oQ2VsbCk6bnVtYmVyfSAqL1xuICAgIGdldE9yaWVudGF0aW9uKCkgeyByZXR1cm4gdGhpcy5vcmllbnRhdGlvbjsgfVxuICAgIC8qKiBAcGFyYW0ge2Z1bmN0aW9uKENlbGwpOm51bWJlcn0gdmFsIEByZXR1cm5zIHt0aGlzfSAqL1xuICAgIHNldE9yaWVudGF0aW9uKHZhbCkgeyB0aGlzLm9yaWVudGF0aW9uID0gdmFsOyByZXR1cm4gdGhpczsgfVxuXG4gICAgLyoqIEByZXR1cm5zIHtmdW5jdGlvbihDZWxsKTpzdHJpbmd9ICovXG4gICAgZ2V0Q29sb3IoKSB7IHJldHVybiB0aGlzLmNvbG9yOyB9XG4gICAgLyoqIEBwYXJhbSB7ZnVuY3Rpb24oQ2VsbCk6c3RyaW5nfSB2YWwgQHJldHVybnMge3RoaXN9ICovXG4gICAgc2V0Q29sb3IodmFsKSB7IHRoaXMuY29sb3IgPSB2YWw7IHJldHVybiB0aGlzOyB9XG5cbiAgICAvKiogQHJldHVybnMge1NpemV9ICovXG4gICAgZ2V0TGVuZ3RoKCkgeyByZXR1cm4gdGhpcy5sZW5ndGg7IH1cbiAgICAvKiogQHBhcmFtIHtTaXplfSB2YWwgQHJldHVybnMge3RoaXN9ICovXG4gICAgc2V0TGVuZ3RoKHZhbCkgeyB0aGlzLmxlbmd0aCA9IHZhbDsgcmV0dXJuIHRoaXM7IH1cbiAgICAvKiogQHJldHVybnMge1NpemV9ICovXG5cbiAgICBnZXRXaWR0aCgpIHsgcmV0dXJuIHRoaXMud2lkdGg7IH1cbiAgICAvKiogQHBhcmFtIHtTaXplfSB2YWwgQHJldHVybnMge3RoaXN9ICovXG4gICAgc2V0V2lkdGgodmFsKSB7IHRoaXMud2lkdGggPSB2YWw7IHJldHVybiB0aGlzOyB9XG5cbn1cbiIsIi8vQHRzLWNoZWNrXG5cbmltcG9ydCB7IFN0eWxlLCBTaXplIH0gZnJvbSBcIi4uL1N0eWxlXCJcbmltcG9ydCB7IENlbGwgfSBmcm9tIFwiLi4vRGF0YXNldFwiXG5pbXBvcnQgeyBDYW52YXNHZW8gfSBmcm9tIFwiLi4vQ2FudmFzR2VvXCI7XG5cbi8qKiBAdHlwZWRlZiB7XCJzcXVhcmVcInxcImNpcmNsZVwifSBTaGFwZSAqL1xuXG4vKipcbiAqIEEgdmVyeSBnZW5lcmljIHN0eWxlIHRoYXQgc2hvd3MgZ3JpZCBjZWxscyB3aXRoIHNwZWNpZmljIGNvbG9yLCBzaXplIGFuZCBzaGFwZS5cbiAqIEl0IGNhbiBiZSB1c2VkIHRvIHNob3cgdmFyaWFibGVzIGFzIGNlbGwgY29sb3JzLCBjZWxsIHNpemUsIGNlbGwgc2hhcGUsIG9yIGFueSBjb21iaW5hdGlvbiBvZiB0aGUgdGhyZWUgdmlzdWFsIHZhcmlhYmxlcy5cbiAqIFxuICogQGF1dGhvciBKdWxpZW4gR2FmZnVyaVxuICovXG5leHBvcnQgY2xhc3MgU2hhcGVDb2xvclNpemVTdHlsZSBleHRlbmRzIFN0eWxlIHtcblxuICAgIC8qKlxuICAgICAgKiBAcGFyYW0ge2Z1bmN0aW9uKENlbGwpOnN0cmluZ30gY29sb3IgQSBmdW5jdGlvbiByZXR1cm5pbmcgdGhlIGNvbG9yIG9mIHRoZSBjZWxsLlxuICAgICAgKiBAcGFyYW0ge1NpemV9IHNpemUgQSBmdW5jdGlvbiByZXR1cm5pbmcgdGhlIHNpemUgb2YgYSBjZWxsIChpbiBnZW9ncmFwaGljYWwgdW5pdCkuXG4gICAgICAqIEBwYXJhbSB7ZnVuY3Rpb24oQ2VsbCk6U2hhcGV9IHNoYXBlIEEgZnVuY3Rpb24gcmV0dXJuaW5nIHRoZSBzaGFwZSBvZiBhIGNlbGwuXG4gICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGNvbG9yID0gKCkgPT4gXCIjRUE2QkFDXCIsIHNpemUgPSBudWxsLCBzaGFwZSA9ICgpID0+IFwic3F1YXJlXCIpIHtcbiAgICAgICAgc3VwZXIoKVxuXG4gICAgICAgIC8qKiBAcHJpdmF0ZSBAdHlwZSB7ZnVuY3Rpb24oQ2VsbCk6c3RyaW5nfSAqL1xuICAgICAgICB0aGlzLmNvbG9yID0gY29sb3I7XG5cbiAgICAgICAgLyoqIEBwcml2YXRlIEB0eXBlIHtTaXplfSAqL1xuICAgICAgICB0aGlzLnNpemUgPSBzaXplO1xuXG4gICAgICAgIC8qKiBAcHJpdmF0ZSBAdHlwZSB7ZnVuY3Rpb24oQ2VsbCk6U2hhcGV9ICovXG4gICAgICAgIHRoaXMuc2hhcGUgPSBzaGFwZTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIERyYXcgY2VsbHMgYXMgc3F1YXJlcywgd2l0aCB2YXJpb3VzIGNvbG9ycyBhbmQgc2l6ZS5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0FycmF5LjxDZWxsPn0gY2VsbHMgXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHJlc29sdXRpb24gXG4gICAgICogQHBhcmFtIHtDYW52YXNHZW99IGNnIFxuICAgICAqL1xuICAgIGRyYXcoY2VsbHMsIHJlc29sdXRpb24sIGNnKSB7XG5cbiAgICAgICAgLy9pZiBzaXplIGlzIHVzZWQsIHNvcnQgY2VsbHMgYnkgc2l6ZSBzbyB0aGF0IHRoZSBiaWdnZXN0IGFyZSBkcmF3biBmaXJzdFxuICAgICAgICBpZiAodGhpcy5zaXplKVxuICAgICAgICAgICAgY2VsbHMuc29ydCgoYzEsIGMyKSA9PiAodGhpcy5zaXplLnZhbChjMikgLSB0aGlzLnNpemUudmFsKGMxKSkpO1xuXG4gICAgICAgIGZvciAobGV0IGNlbGwgb2YgY2VsbHMpIHtcblxuICAgICAgICAgICAgLy9jb2xvclxuICAgICAgICAgICAgY2cuY3R4LmZpbGxTdHlsZSA9IHRoaXMuY29sb3IgPyB0aGlzLmNvbG9yKGNlbGwpIDogXCIjRUE2QkFDXCI7XG5cbiAgICAgICAgICAgIC8vc2l6ZVxuICAgICAgICAgICAgLyoqIEB0eXBlIHtTaXplfSAqL1xuICAgICAgICAgICAgbGV0IHNfID0gdGhpcy5zaXplIHx8IHsgdmFsOiBjPT5yZXNvbHV0aW9uLCB1bml0OiBcImdlb1wiIH07XG4gICAgICAgICAgICAvL3NpemUgLSBpbiBwaXhlbCBhbmQgZ2VvXG4gICAgICAgICAgICAvKiogQHR5cGUge251bWJlcn0gKi9cbiAgICAgICAgICAgIGNvbnN0IHNQID0gc18udW5pdCA9PT0gXCJwaXhcIiA/IHNfLnZhbChjZWxsKSA6IHNfLnZhbChjZWxsKSAvIGNnLnpmXG4gICAgICAgICAgICAvKiogQHR5cGUge251bWJlcn0gKi9cbiAgICAgICAgICAgIGNvbnN0IHNHID0gY2cuemYgKiBzUDtcblxuICAgICAgICAgICAgLy9nZXQgc2hhcGVcbiAgICAgICAgICAgIGNvbnN0IHNoYXBlID0gdGhpcy5zaGFwZSA/IHRoaXMuc2hhcGUoY2VsbCkgOiBcInNxdWFyZVwiO1xuICAgICAgICAgICAgaWYgKHNoYXBlID09PSBcInNxdWFyZVwiKSB7XG4gICAgICAgICAgICAgICAgLy9kcmF3IHNxdWFyZVxuICAgICAgICAgICAgICAgIGNvbnN0IGQgPSByZXNvbHV0aW9uICogKDEgLSBzRyAvIHJlc29sdXRpb24pICogMC41XG4gICAgICAgICAgICAgICAgY2cuY3R4LmZpbGxSZWN0KFxuICAgICAgICAgICAgICAgICAgICBjZy5nZW9Ub1BpeFgoY2VsbC54ICsgZCArIHRoaXMub2Zmc2V0Xy5keCksXG4gICAgICAgICAgICAgICAgICAgIGNnLmdlb1RvUGl4WShjZWxsLnkgKyByZXNvbHV0aW9uIC0gZCArIHRoaXMub2Zmc2V0Xy5keSksXG4gICAgICAgICAgICAgICAgICAgIHNQLCBzUCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHNoYXBlID09PSBcImNpcmNsZVwiKSB7XG4gICAgICAgICAgICAgICAgLy9kcmF3IGNpcmNsZVxuICAgICAgICAgICAgICAgIGNnLmN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgICAgICAgICBjZy5jdHguYXJjKFxuICAgICAgICAgICAgICAgICAgICBjZy5nZW9Ub1BpeFgoY2VsbC54ICsgcmVzb2x1dGlvbiAqIDAuNSArIHRoaXMub2Zmc2V0Xy5keCksXG4gICAgICAgICAgICAgICAgICAgIGNnLmdlb1RvUGl4WShjZWxsLnkgKyByZXNvbHV0aW9uICogMC41ICsgdGhpcy5vZmZzZXRfLmR5KSxcbiAgICAgICAgICAgICAgICAgICAgc1AgKiAwLjUsXG4gICAgICAgICAgICAgICAgICAgIDAsIDIgKiBNYXRoLlBJLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgY2cuY3R4LmZpbGwoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmV4cGVjdGVkIHNoYXBlOicgKyBzaGFwZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vZHJhdyBzdHJva2VcbiAgICAgICAgICAgIHRoaXMuZHJhd1N0cm9rZShjZWxsLCByZXNvbHV0aW9uLCBjZywgdGhpcy5zaGFwZSwgdGhpcy5zaXplKVxuICAgICAgICB9XG5cbiAgICB9XG5cblxuICAgIC8vZ2V0dGVycyBhbmQgc2V0dGVyc1xuXG4gICAgLyoqIEByZXR1cm5zIHtmdW5jdGlvbihDZWxsKTpzdHJpbmd9ICovXG4gICAgZ2V0Q29sb3IoKSB7IHJldHVybiB0aGlzLmNvbG9yOyB9XG4gICAgLyoqIEBwYXJhbSB7ZnVuY3Rpb24oQ2VsbCk6c3RyaW5nfSB2YWwgQHJldHVybnMge3RoaXN9ICovXG4gICAgc2V0Q29sb3IodmFsKSB7IHRoaXMuY29sb3IgPSB2YWw7IHJldHVybiB0aGlzOyB9XG5cbiAgICAvKiogQHJldHVybnMge1NpemV9ICovXG4gICAgZ2V0U2l6ZSgpIHsgcmV0dXJuIHRoaXMuc2l6ZTsgfVxuICAgIC8qKiBAcGFyYW0ge1NpemV9IHZhbCBAcmV0dXJucyB7dGhpc30gKi9cbiAgICBzZXRTaXplKHZhbCkgeyB0aGlzLnNpemUgPSB2YWw7IHJldHVybiB0aGlzOyB9XG5cbiAgICAvKiogQHJldHVybnMge2Z1bmN0aW9uKENlbGwpOlNoYXBlfSAqL1xuICAgIGdldFNoYXBlKCkgeyByZXR1cm4gdGhpcy5zaGFwZTsgfVxuICAgIC8qKiBAcGFyYW0ge2Z1bmN0aW9uKENlbGwpOlNoYXBlfSB2YWwgQHJldHVybnMge3RoaXN9ICovXG4gICAgc2V0U2hhcGUodmFsKSB7IHRoaXMuc2hhcGUgPSB2YWw7IHJldHVybiB0aGlzOyB9XG5cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=