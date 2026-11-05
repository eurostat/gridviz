//@ts-check
'use strict'

// The grid layers on the GPU: one WebGL2 canvas, shared by the grid layers of the maps attached to it, which can be drawn again in the course of any movement.
//
// A map redraws a layer by running each style's code on every cell in view, and copying the result to a canvas: tens of milliseconds, on a laptop hundreds, for a
// view of a dense grid. Too slow for a movement. Here each tile of a grid goes to the GPU once, when it comes in: the position, size and colour of its cells. A draw only
// sets where the tiles are on the screen. For a gridviz map inside another map (Leaflet...), which moves it: the other map tells where the view is (host, below).
//
// The map stays in charge of everything else: the styles and their settings, loading the tiles, the view scale, the legends, the tooltips. Its redraw (at the end of a
// movement, when a tile arrives, when a setting changes) still runs the layer's styles: those that can be drawn here hand over their cells (submit), and those that cannot
// draw on the map's own canvas as ever, which lies over this one.
//
// During a movement the colour classes do not change: the view scale of the last redraw is kept, and worked out again when the map stops. A tile that came in for the view
// of a redraw is coloured with the classes of the view. Should a new view give other classes, tiles are recoloured a few at a time and in the meantime keep their colours:
// no blank, no long frame.
//
// Without attach(), nothing here runs: a map draws as it always has.

import { SquareColorCategoryWebGLStyle } from '../style/SquareColorCategoryWebGLStyle.js'
import { SquareColorWebGLStyle } from '../style/SquareColorWebGLStyle.js'
import { ShapeColorSizeStyle } from '../style/ShapeColorSizeStyle.js'
import { StrokeStyle } from '../style/StrokeStyle.js'

const DEFAULT_GPU_BUDGET_BYTES = 256 * 1024 * 1024
// x, y, size (float32), colour (rgba8)
const BYTES_PER_CELL = 16
// The time for building tiles, in a frame (ms): the map goes on moving, and what is missing comes on the next frames
const BUILD_MS_MOVING = 3
const BUILD_MS_STILL = 8
// How far beyond the view (fraction of the view, on each side) the canvas reaches (what a movement shows until the next draw), and tiles are built, and loaded
const PADDING = 0.25
const BUILD_MARGIN = 0.4
const LOAD_MARGIN = 0.6
// How often tiles are asked for during a movement (ms)
const LOAD_EVERY_MS = 100
// Number of steps of the colour ramp of the styles with a continuous colour
const RAMP_STEPS = 1024
// Number of cells whose result stands for the view when deciding whether its tiles have to be coloured again
const SAMPLE_CELLS = 200
// During a movement a view scale is worked out from at most this many cells of the view: the classes come out much the same, in a fraction of the time. A redraw at the end of
// the movement works them out from all the cells.
const MAX_CELLS_FOR_SCALE = 10000
// How many cells are made between two looks at the clock, when building a tile
const CELLS_BETWEEN_CHECKS = 256

const CELL_VS = `#version 300 es
precision highp float;
layout(location = 0) in vec3 a_cell;   // x, y of the centre (m, from the tile's origin); size (m): 0 for the size of the style, negative for a circle
layout(location = 1) in vec4 a_color;
layout(location = 2) in float a_shape; // see SHAPES; for a donut, the fractional part gives the hole. 0 where the attribute is not there.
uniform vec2 u_offset;    // the tile's origin in CSS pixels of the canvas
uniform vec2 u_scale;     // CSS pixels per metre
uniform vec2 u_viewport;
uniform float u_size;     // the size of the style (m)
uniform float u_minHalf;  // half a device pixel in CSS pixels: a cell never vanishes between the samples of the screen
uniform float u_circleScale; // see _setCellUniforms
out vec4 v_color;
out vec2 v_px;            // from the centre (CSS pixels)
out float v_radius;       // of a shape other than a square (CSS pixels), or 0
flat out int v_shape;
flat out float v_hole;    // of a donut, or half the width of an outline, as a part of its radius
void main() {
    // two triangles
    int v = gl_VertexID;
    vec2 corner = vec2(v == 1 || v == 3 || v == 5 ? 1.0 : -1.0, v == 2 || v == 4 || v == 5 ? 1.0 : -1.0);
    if (v == 3) corner = vec2(1.0, -1.0);
    bool circle = a_cell.z < 0.0;
    v_shape = int(floor(a_shape));
    v_hole = fract(a_shape) / 0.99;
    // the outline of a square stays on its square, whatever the zoom
    float size = a_cell.z != 0.0 ? abs(a_cell.z) * (circle && v_shape != 7 ? u_circleScale : 1.0) : u_size;
    vec2 half_ = max(abs(u_scale) * size * 0.5, vec2(u_minHalf));
    // an outline reaches beyond its shape by half its width
    vec2 reach = circle ? half_ * (v_shape >= 7 ? 1.0 + v_hole : 1.0) + 1.0 : half_;
    vec2 px = u_offset + a_cell.xy * u_scale + corner * reach;
    v_px = corner * reach;
    v_radius = circle ? half_.x : 0.0;
    v_color = a_color;
    gl_Position = vec4(px.x / u_viewport.x * 2.0 - 1.0, 1.0 - px.y / u_viewport.y * 2.0, 0.0, 1.0);
}`

const CELL_FS = `#version 300 es
precision highp float;
in vec4 v_color;
in vec2 v_px;
in float v_radius;
flat in int v_shape;
flat in float v_hole;
uniform float u_alpha;
out vec4 fragColor;
void main() {
    float a = v_color.a * u_alpha;
    if (v_radius > 0.0) {
        float r = v_radius;
        vec2 p = v_px;
        if (v_shape == 0) {
            a *= clamp(r - length(p) + 0.5, 0.0, 1.0);
        } else if (v_shape == 1) {
            // diamond
            a *= clamp(0.5 - (abs(p.x) + abs(p.y) - r) / 1.41421356, 0.0, 1.0);
        } else if (v_shape == 2) {
            // donut
            float l = length(p);
            a *= clamp(r - l + 0.5, 0.0, 1.0) * clamp(l - r * v_hole + 0.5, 0.0, 1.0);
        } else if (v_shape == 7) {
            // the outline of a square
            a *= clamp(0.5 - (abs(max(abs(p.x), abs(p.y)) - r) - r * v_hole), 0.0, 1.0);
        } else if (v_shape == 8) {
            // the outline of a circle
            a *= clamp(0.5 - (abs(length(p) - r) - r * v_hole), 0.0, 1.0);
        } else {
            // a triangle: the one pointing up, turned (y goes down on the screen)
            if (v_shape == 4) p = vec2(p.x, -p.y);
            else if (v_shape == 5) p = vec2(p.y, p.x);
            else if (v_shape == 6) p = vec2(p.y, -p.x);
            a *= clamp(0.5 - max(p.y - r, (2.0 * abs(p.x) - p.y - r) / 2.23606798), 0.0, 1.0);
        }
    }
    if (a <= 0.0) discard;
    fragColor = vec4(v_color.rgb * a, a);
}`

// The result of the 'multiply' blending, drawn on white (see _drawMultiply), back to colours over nothing
const RESOLVE_VS = `#version 300 es
out vec2 v_uv;
void main() {
    vec2 p = vec2(gl_VertexID == 1 ? 3.0 : -1.0, gl_VertexID == 2 ? 3.0 : -1.0);
    v_uv = p * 0.5 + 0.5;
    gl_Position = vec4(p, 0.0, 1.0);
}`

const RESOLVE_FS = `#version 300 es
precision highp float;
in vec2 v_uv;
uniform sampler2D u_tex;
out vec4 fragColor;
void main() {
    vec4 c = texture(u_tex, v_uv);
    fragColor = vec4(clamp(c.rgb - (1.0 - c.a), 0.0, 1.0), c.a);
}`

// How much coarser than the layer's own the resolution of the backdrop is, at least, and how far its tiles reach beyond the view (in views, on each side)
const BACKDROP_FACTOR = 8
const BACKDROP_REACH = 4

// How far a circle grows with the map during a zoom in, until the layer is redrawn
const MAX_CIRCLE_GROWTH = 2

// The shapes of ShapeColorSizeStyle other than the square, as the shaders know them
const SHAPES = { circle: 0, diamond: 1, donut: 2, triangle_up: 3, triangle_down: 4, triangle_left: 5, triangle_right: 6 }
// ... and the outlines of StrokeStyle
const OUTLINES = { square: 7, circle: 8 }

// What the stretching of the continuous colour styles does, as in the shaders of these styles
function stretch(t, s) {
    if (!s) return t
    const alpha = s.alpha
    switch (s.fun) {
        case 'pow':
            return Math.pow(t, alpha)
        case 'powInv':
            return 1 - Math.pow(1 - t, 1 / alpha)
        case 'exp':
            return alpha === 0 ? t : (Math.exp(t * alpha) - 1) / (Math.exp(alpha) - 1)
        case 'log':
            return alpha === 0 ? t : 1 - (1 / alpha) * Math.log(Math.exp(alpha) * (1 - t) + t)
        case 'circle': {
            if (alpha === 0) return t
            if (alpha === 1) return Math.sqrt(t * (2 - t))
            const a = alpha / (1 - alpha)
            return Math.sqrt(1 / (a * a) + t * (2 / a + 2 - t)) - 1 / a
        }
        case 'circleInv': {
            if (alpha === 0) return t
            if (alpha === 1) return 1 - Math.sqrt((1 - t) * (1 + t))
            const a = alpha / (1 - alpha)
            return 1 - Math.sqrt(1 / (a * a) + (1 - t) * (2 / a + 1 + t)) + 1 / a
        }
        default:
            return t
    }
}

// At most MAX_CELLS_FOR_SCALE cells, evenly over the list
function sampleOf(cells) {
    if (cells.length <= MAX_CELLS_FOR_SCALE) return cells
    const step = cells.length / MAX_CELLS_FOR_SCALE
    const sample = []
    for (let i = 0; i < cells.length; i += step) sample.push(cells[Math.floor(i)])
    return sample
}

/**
 * What a renderer asks of the map it is in.
 * @typedef {object} GPURendererHost
 * @property {function():(GPURendererView|null)} getView Where the view is now, in this frame. Null when there is no view yet.
 * @property {function():boolean} isMoving Whether the view is in the course of a movement.
 * @property {function():boolean} [canDraw] False to leave out a draw of a movement (the GPU has not finished the last one, for example).
 * @property {function():({x:number,y:number}|null)} [getGlide] For a view gliding somewhere: what is left of the glide, in pixels, for the tiles to be loaded ahead of it.
 * @property {function(GPURendererDrawn):void} [onDrawn] The canvas has just been drawn, in this very task: for placing it. It covers the view and a margin on each side.
 * @property {function(WebGL2RenderingContext):void} [onContextRestored] The WebGL context was lost, and is back.
 */

/**
 * A view, on the pixels of the host. A point in geographical coordinates is at x * scaleX + offsetX, y * scaleY + offsetY.
 * @typedef {object} GPURendererView
 * @property {number} width In CSS pixels.
 * @property {number} height In CSS pixels.
 * @property {number} left The left of the view.
 * @property {number} top The top of the view.
 * @property {number} scaleX Pixels per geographical unit.
 * @property {number} scaleY Pixels per geographical unit: negative when y goes up.
 * @property {number} offsetX
 * @property {number} offsetY
 * @property {number} z The size of a pixel, in geographical unit.
 */

/**
 * @typedef {object} GPURendererDrawn
 * @property {number} left The left of the canvas, on the pixels of the host.
 * @property {number} top The top of the canvas, on the pixels of the host.
 * @property {number} width In CSS pixels.
 * @property {number} height In CSS pixels.
 * @property {number} padX The margin on the left and on the right of the view.
 * @property {number} padY The margin above and below the view.
 */

/**
 * Draws the grid layers of gridviz maps on the GPU: fast enough for each frame of a movement. Opt-in: see attach().
 * Works for the styles SquareColorCategoryWebGLStyle, SquareColorWebGLStyle and ShapeColorSizeStyle (all its shapes) and StrokeStyle (squares and circles), on tiled and non tiled datasets. Other styles, and
 * those with a filterColor, go on being drawn by the map, on its canvas.
 *
 * @module core
 */
export class GPUGridRenderer {
    /**
     * @param {GPURendererHost} host The map this one is in.
     * @param {{gpuBudgetBytes?:number}} [opts] gpuBudgetBytes: how much of the GPU's memory the tiles can take (256 MB by default).
     */
    constructor(host, opts = {}) {
        this.host = host
        this._budget = opts.gpuBudgetBytes || DEFAULT_GPU_BUDGET_BYTES
        this._layers = new Map() // gridviz map -> { items, pending, only }
        this._batches = new WeakMap() // style -> dataset -> tile key -> batch
        this._jobs = new WeakMap() // the tile keys -> tile key -> what is being built
        this._allBatches = new Set()
        this._gpuBytes = 0
        this._frame = 0
        this._raf = null
        this._colors = new Map()
        this._ctx2d = null
        this._loadedAt = 0
        this._unsupported = new WeakSet()
        this._noBackdrop = new WeakSet()
        this._ramps = new WeakMap()
        /** Whether this browser can do it (WebGL2). If not, attach() does nothing and the maps draw as ever.
         * @type {boolean} */
        this.ok = this._init()
    }

    // --- setup ------------------------------------------------------------------------------------------------------------------------------

    _init() {
        const canvas = (this.canvas = document.createElement('canvas'))
        canvas.className = 'gridviz-gpu-canvas'
        canvas.style.position = 'absolute'
        canvas.style.transformOrigin = '0 0'
        canvas.style.left = '0'
        canvas.style.top = '0'
        canvas.style.pointerEvents = 'none'
        canvas.style.display = 'none'
        canvas.setAttribute('aria-hidden', 'true')
        canvas.addEventListener('webglcontextlost', (e) => {
            e.preventDefault()
            this._lost = true
        })
        canvas.addEventListener('webglcontextrestored', () => {
            this._lost = false
            this._forgetBatches()
            this._initGL()
            if (this.host.onContextRestored) this.host.onContextRestored(this.gl)
            this.redraw()
        })
        return this._initGL()
    }

    _initGL() {
        const gl = (this.gl = this.canvas.getContext('webgl2', { alpha: true, premultipliedAlpha: true, antialias: true, depth: false, stencil: true }))
        if (!gl) return false
        this._cell = this._program(CELL_VS, CELL_FS)
        this._resolve = this._program(RESOLVE_VS, RESOLVE_FS)
        this._emptyVao = gl.createVertexArray()
        this._fbo = gl.createFramebuffer()
        this._fboTex = gl.createTexture()
        gl.bindTexture(gl.TEXTURE_2D, this._fboTex)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
        this._fboStencil = gl.createRenderbuffer()
        this._fboSize = null
        this._size = null
        return true
    }

    _program(vsSource, fsSource) {
        const gl = this.gl
        const compile = (type, source) => {
            const shader = gl.createShader(type)
            gl.shaderSource(shader, source)
            gl.compileShader(shader)
            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error('Grid shader: ' + gl.getShaderInfoLog(shader))
            return shader
        }
        const program = gl.createProgram()
        gl.attachShader(program, compile(gl.VERTEX_SHADER, vsSource))
        gl.attachShader(program, compile(gl.FRAGMENT_SHADER, fsSource))
        gl.linkProgram(program)
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error('Grid program: ' + gl.getProgramInfoLog(program))
        const uniforms = {}
        const n = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS)
        for (let i = 0; i < n; i++) {
            const name = gl.getActiveUniform(program, i).name
            uniforms[name] = gl.getUniformLocation(program, name)
        }
        return { program, uniforms }
    }

    // --- the grid layers -----------------------------------------------------------------------------------------------------------------------

    /**
     * From now on the grid layers of this map are drawn here, for what they can be. The host puts the canvas (renderer.canvas) under the map's own: it is shown while a map is attached.
     * @param {import('./Map.js').Map} map
     * @returns {this}
     */
    attach(map) {
        if (!this.ok) return this
        if (!this._layers.has(map)) this._layers.set(map, { items: [], pending: null, only: false })
        map.setGPURenderer(this)
        this.canvas.style.display = ''
        return this
    }

    /**
     * The map goes back to drawing all by itself.
     * @param {import('./Map.js').Map} map
     * @returns {this}
     */
    detach(map) {
        if (!this._layers.delete(map)) return this
        map.setGPURenderer(null)
        if (this._layers.size === 0) {
            if (this._raf) cancelAnimationFrame(this._raf)
            this._raf = null
            this._drawPending = false
            this.canvas.style.display = 'none'
        } else {
            this.redraw()
        }
        return this
    }

    /**
     * Whether everything on this map is drawn here: nothing on the map's canvas.
     * @param {import('./Map.js').Map} map
     * @returns {boolean}
     */
    drawsAll(map) {
        const entry = this._layers.get(map)
        return !!entry && entry.only
    }

    /**
     * A redraw of a map is not needed when everything on it is drawn here and it is moving: the next frame draws what came in. It is redrawn at the end of the movement.
     * @param {import('./Map.js').Map} map
     * @returns {boolean} true when this one takes care of the redraw
     * @package
     */
    takesRedraw(map) {
        if (!this.drawsAll(map) || !this.host.isMoving()) return false
        this.redraw()
        return true
    }

    /** A redraw of a map begins: what its styles hand over replaces what is shown, at the end of it.
     * @param {import('./Map.js').Map} map
     * @package */
    beginRedraw(map) {
        const entry = this._layers.get(map)
        if (entry) entry.pending = []
    }

    /**
     * Whether a style of a grid layer can be drawn here.
     * @param {import('./Style.js').Style} style
     * @param {*} [gridLayer]
     * @returns {boolean}
     */
    accepts(style, gridLayer) {
        if (this._unsupported.has(style) || style.filterColor || (gridLayer && gridLayer.filterColor)) return false
        return style instanceof SquareColorCategoryWebGLStyle || style instanceof SquareColorWebGLStyle || style instanceof ShapeColorSizeStyle || style instanceof StrokeStyle
    }

    /** A style's draw, in a redraw of the map: in place of the style's own.
     * @package */
    submit(style, cells, geoCanvas, resolution, gridLayer) {
        const gv = this._findGv(geoCanvas)
        const entry = this._layers.get(gv)
        if (!entry || !entry.pending) return
        if (style.filter) cells = cells.filter(style.filter)
        const z = geoCanvas.view.z
        const viewScale = style.viewScale ? style.viewScale(cells, resolution, z) : undefined
        const dataset = gridLayer.getDataset(z)
        const item = { style, gridLayer, dataset, resolution, z, viewScale, scaleCells: cells, cells: cells.length }
        item.key = this._fingerprint(item, cells)
        entry.pending.push(item)
        style.updateLegends({ style, resolution, z, viewScale, cells })
        this._loadAhead(dataset)
    }

    _findGv(geoCanvas) {
        for (const gv of this._layers.keys()) if (gv.geoCanvas === geoCanvas) return gv
        return null
    }

    /** The redraw of a map is over: what it handed over replaces what was shown.
     * @param {import('./Map.js').Map} gv
     * @package */
    endRedraw(gv) {
        const entry = this._layers.get(gv)
        if (!entry || !entry.pending) return
        const items = entry.pending
        entry.pending = null
        // anything else on the map draws on its canvas: it cannot do without its redraws during a movement
        entry.only = items.length > 0 && gv.layers.every((l) => !!l.styles && l.styles.every((s) => this.accepts(s, l)))
        // an item stays under the one that takes its place until the new one's tiles are in
        items.forEach((item, i) => {
            const old = entry.items[i]
            if (old && (old.style !== item.style || old.dataset !== item.dataset)) item.under = old.drawn ? old : old.under
            else if (old) item.under = old.under
            item.backdrop = this._backdropOf(item, old)
        })
        entry.items = items
        // for the movement to come
        const view = this._view()
        for (const item of items) {
            if (view && item.backdrop && item.backdrop.dataset.getData) item.backdrop.dataset.getData(view.envelope(BACKDROP_REACH))
        }
        this.redraw()
    }

    // A coarser resolution of a layer, reaching beyond the view, for what a movement uncovers before its own tiles have come in. For a layer of several resolutions.
    _backdropOf(item, old) {
        const multi = item.gridLayer.dataset
        if (this._noBackdrop.has(item.style) || !multi || !multi.datasets || multi.datasets.length < 2 || !multi.resolutions) return null
        const at = multi.resolutions.findIndex((r) => r >= BACKDROP_FACTOR * item.resolution)
        if (at < 0) return null
        const dataset = multi.datasets[at]
        if (dataset === item.dataset) return null
        if (old && old.backdrop && old.backdrop.dataset === dataset && old.backdrop.style === item.style && old.backdrop.scaleOf === item.key) return old.backdrop
        return {
            style: item.style,
            gridLayer: item.gridLayer,
            dataset,
            resolution: multi.resolutions[at],
            z: item.z,
            viewScale: null,
            needsScale: !!item.style.viewScale,
            key: item.key + '|b',
            scaleOf: item.key,
            isBackdrop: true,
        }
    }

    // What the view's cells come out as, in short: when it has not changed, tiles built before need not be coloured again
    _fingerprint(item, cells) {
        const { style, resolution: r, z, viewScale } = item
        const parts = [style.highlightColors ? style.highlightColors.join('|') : '']
        if (viewScale && viewScale.breaks) parts.push(viewScale.breaks.join(','))
        const n = cells.length
        const step = Math.max(1, Math.floor(n / SAMPLE_CELLS))
        for (let i = 0; i < n; i += step) {
            const c = cells[i]
            if (style instanceof SquareColorCategoryWebGLStyle) parts.push(style.code(c, r, z, viewScale))
            else if (style instanceof SquareColorWebGLStyle) parts.push(style.tFun(c, r, z, viewScale))
            else if (style instanceof StrokeStyle) {
                parts.push(style.strokeColor ? style.strokeColor(c, r, z, viewScale) : '')
                parts.push(style.size ? style.size(c, r, z, viewScale) : r)
            } else {
                parts.push(typeof style.color === 'function' ? style.color(c, r, z, viewScale) : style.color)
                parts.push(typeof style.size === 'function' ? style.size(c, r, z, viewScale) : style.size)
            }
        }
        return parts.join(';')
    }

    _forgetBatches() {
        this._batches = new WeakMap()
        this._jobs = new WeakMap()
        this._allBatches.clear()
        this._gpuBytes = 0
    }

    // --- tiles to cells on the GPU -------------------------------------------------------------------------------------------------------------

    // The tiles of a dataset with cells in an envelope. A dataset of one file is one tile.
    _tiles(dataset, ext, visit) {
        if (dataset.cells) {
            if (dataset.cells.length) visit('all', { cells: dataset.cells })
            return
        }
        if (!dataset.cache || !dataset.info) return
        const tb = dataset.getTilingEnvelope(ext)
        if (!tb) return
        const gb = dataset.info.tilingBounds || tb
        for (let x = Math.max(tb.xMin, gb.xMin); x <= Math.min(tb.xMax, gb.xMax); x++) {
            const column = dataset.cache[x]
            if (!column) continue
            for (let y = Math.max(tb.yMin, gb.yMin); y <= Math.min(tb.yMax, gb.yMax); y++) {
                const tile = column[y]
                if (tile && tile.cells && tile.cells.length) visit(x + '/' + y, tile)
            }
        }
    }

    _batchMap(style, dataset) {
        let byDataset = this._batches.get(style)
        if (!byDataset) this._batches.set(style, (byDataset = new WeakMap()))
        let byTile = byDataset.get(dataset)
        if (!byTile) byDataset.set(dataset, (byTile = new Map()))
        return byTile
    }

    _parseColor(css) {
        let rgba = this._colors.get(css)
        if (rgba) return rgba
        if (!this._ctx2d) this._ctx2d = document.createElement('canvas').getContext('2d')
        const ctx = this._ctx2d
        ctx.fillStyle = '#000'
        ctx.fillStyle = css
        const c = ctx.fillStyle
        if (c[0] === '#') rgba = [parseInt(c.slice(1, 3), 16), parseInt(c.slice(3, 5), 16), parseInt(c.slice(5, 7), 16), 255]
        else {
            const m = c.match(/[\d.]+/g) || [0, 0, 0, 1]
            rgba = [+m[0], +m[1], +m[2], Math.round((m[3] === undefined ? 1 : +m[3]) * 255)]
        }
        this._colors.set(css, rgba)
        return rgba
    }

    // How a style gives a cell its colour and size: (cell, out) => false to leave it out, otherwise out.rgba and out.size (0: the style's size, negative: a circle)
    _cellReader(item) {
        const { style, resolution: r, z, viewScale } = item
        if (style instanceof SquareColorCategoryWebGLStyle) {
            const lut = style.colors.map((c) => this._parseColor(c))
            const shown = style.highlightColors ? style.colors.map((c) => style.isHighlighted(c)) : null
            return (c, out) => {
                const code = style.code(c, r, z, viewScale)
                if (code === undefined || code === null) return false
                const i = style.catToI[code]
                if (i === undefined || (shown && !shown[+i])) return false
                out.rgba = lut[+i]
                out.size = 0
                return true
            }
        }
        if (style instanceof SquareColorWebGLStyle) {
            const lut = this._ramp(style, item)
            return (c, out) => {
                const t = style.tFun(c, r, z, viewScale)
                if (t === null || t === undefined || t !== t) return false
                out.rgba = lut[Math.max(0, Math.min(RAMP_STEPS - 1, Math.floor((t > 1 ? 1 : t < 0 ? 0 : t) * (RAMP_STEPS - 1))))]
                out.size = 0
                return true
            }
        }
        if (style instanceof StrokeStyle) {
            return (c, out) => {
                const col = style.strokeColor ? style.strokeColor(c, r, z, viewScale) : undefined
                if (!col || col === 'none') return false
                const s = style.size ? style.size(c, r, z, viewScale) : r
                if (!s) return false
                const width = style.strokeWidth ? style.strokeWidth(c, r, z, viewScale) : z
                if (!width || width <= 0) return false
                const sh = style.shape ? style.shape(c, r, z, viewScale) : 'square'
                if (sh === 'none') return false
                const id = OUTLINES[sh]
                // the outlines of the other shapes are drawn by the map
                if (id === undefined) throw new UnsupportedShape()
                out.rgba = this._parseColor(col)
                out.size = -s
                // half the width, as a part of the radius: the width as a part of the size
                out.shape = id + Math.min(1, width / s) * 0.99
                return true
            }
        }
        // ShapeColorSizeStyle
        const color = style.color || 'black'
        const size = style.size || r
        const shape = style.shape || 'square'
        const highlight = style.highlightColors
        return (c, out) => {
            const col = typeof color === 'function' ? color(c, r, z, viewScale) : color
            if (!col || col === 'none') return false
            if (highlight && !style.isHighlighted(col)) return false
            const s = typeof size === 'function' ? size(c, r, z, viewScale) : size
            if (!s) return false
            const sh = typeof shape === 'function' ? shape(c, r, z, viewScale) : shape
            if (sh === 'none') return false
            out.rgba = this._parseColor(col)
            out.shape = 0
            if (sh === 'square') {
                out.size = s
                return true
            }
            const id = SHAPES[sh]
            // any other shape is drawn by the map
            if (id === undefined) throw new UnsupportedShape()
            out.shape = id
            out.size = -s
            if (sh === 'donut') {
                // its size is the part of the outer diameter it fills
                const outer = style.donutOuterSize === undefined ? r : typeof style.donutOuterSize === 'function' ? style.donutOuterSize(c, r, z, viewScale) : style.donutOuterSize
                if (!outer) return false
                out.size = -outer
                out.shape = id + Math.max(0, 1 - s / outer) * 0.99
            }
            return true
        }
    }

    _ramp(style, item) {
        const known = this._ramps.get(style)
        if (known && known.resolution === item.resolution) return known.lut
        const opacity = style.opacity ? style.opacity(item.resolution, item.z) : undefined
        const stops = style.colors.map((c) => this._parseColor(c))
        const lut = []
        const nb = stops.length - 1
        for (let i = 0; i < RAMP_STEPS; i++) {
            const t = stretch(i / (RAMP_STEPS - 1), style.stretching)
            const at = nb <= 0 ? 0 : Math.max(0, Math.min(nb, t * nb))
            const a = Math.min(nb, Math.floor(at))
            const b = Math.min(nb, a + 1)
            const f = at - a
            lut.push([0, 1, 2, 3].map((k) => (k === 3 && opacity !== undefined ? Math.round(opacity * 255) : Math.round(stops[a][k] + (stops[b][k] - stops[a][k]) * f))))
        }
        this._ramps.set(style, { lut, resolution: item.resolution })
        return lut
    }

    // The tile's cells on the GPU, a part of them on each frame until the deadline: a tile of a dense grid takes tens of milliseconds, too long for a frame of a movement.
    // Null when it is not finished: it goes on from there on the next call. Until then what the tile showed before stays.
    _build(item, key, tile, byTile, old, deadline = Infinity) {
        let jobs = this._jobs.get(byTile)
        if (!jobs) this._jobs.set(byTile, (jobs = new Map()))
        let job = jobs.get(key)
        if (!job || job.tile !== tile || job.key !== item.key) {
            const cells = tile.cells
            const buffer = new ArrayBuffer(cells.length * BYTES_PER_CELL)
            job = {
                tile,
                key: item.key,
                read: this._cellReader(item),
                buffer,
                floats: new Float32Array(buffer),
                bytes: new Uint8Array(buffer),
                ox: +cells[0].x,
                oy: +cells[0].y,
                i: 0,
                n: 0,
                circles: false,
                shapes: null,
            }
            jobs.set(key, job)
        }
        const { style, resolution: r, z } = item
        const { read, floats, bytes, ox, oy, buffer } = job
        const cells = tile.cells
        const r2 = r / 2
        const out = { rgba: null, size: 0, shape: 0 }
        const filter = style.filter
        const hasOffset = (style instanceof ShapeColorSizeStyle || style instanceof StrokeStyle) && style.offset
        let n = job.n
        let circles = job.circles
        let i = job.i
        while (i < cells.length) {
            if (i % CELLS_BETWEEN_CHECKS === 0 && performance.now() >= deadline) {
                job.i = i
                job.n = n
                job.circles = circles
                return null
            }
            const c = cells[i++]
            if (filter && !filter(c)) continue
            if (!read(c, out)) continue
            let x = +c.x + r2 - ox
            let y = +c.y + r2 - oy
            if (hasOffset) {
                const o = style.offset(c, r, z)
                x += o.dx
                y += o.dy
            }
            const at = n * 4
            floats[at] = x
            floats[at + 1] = y
            floats[at + 2] = out.size
            if (out.size < 0) circles = true
            // only for a tile that has shapes other than squares and circles: the others need no more memory
            if (out.shape) {
                if (!job.shapes) job.shapes = new Float32Array(cells.length)
                job.shapes[n] = out.shape
            }
            const b = at * 4 + 12
            bytes[b] = out.rgba[0]
            bytes[b + 1] = out.rgba[1]
            bytes[b + 2] = out.rgba[2]
            bytes[b + 3] = out.rgba[3]
            n++
        }
        jobs.delete(key)
        const gl = this.gl
        let batch = old
        if (!batch) {
            const vao = gl.createVertexArray()
            const vbo = gl.createBuffer()
            gl.bindVertexArray(vao)
            gl.bindBuffer(gl.ARRAY_BUFFER, vbo)
            gl.enableVertexAttribArray(0)
            gl.vertexAttribPointer(0, 3, gl.FLOAT, false, BYTES_PER_CELL, 0)
            gl.vertexAttribDivisor(0, 1)
            gl.enableVertexAttribArray(1)
            gl.vertexAttribPointer(1, 4, gl.UNSIGNED_BYTE, true, BYTES_PER_CELL, 12)
            gl.vertexAttribDivisor(1, 1)
            gl.bindVertexArray(null)
            batch = { vao, vbo, vboShapes: null, byTile, bytes: 0 }
            this._allBatches.add(batch)
        }
        gl.bindBuffer(gl.ARRAY_BUFFER, batch.vbo)
        gl.bufferData(gl.ARRAY_BUFFER, new Uint8Array(buffer, 0, n * BYTES_PER_CELL), gl.STATIC_DRAW)
        const shapes = job.shapes
        gl.bindVertexArray(batch.vao)
        if (shapes) {
            if (!batch.vboShapes) batch.vboShapes = gl.createBuffer()
            gl.bindBuffer(gl.ARRAY_BUFFER, batch.vboShapes)
            gl.bufferData(gl.ARRAY_BUFFER, shapes.subarray(0, n), gl.STATIC_DRAW)
            gl.enableVertexAttribArray(2)
            gl.vertexAttribPointer(2, 1, gl.FLOAT, false, 4, 0)
            gl.vertexAttribDivisor(2, 1)
        } else {
            gl.disableVertexAttribArray(2)
        }
        gl.bindVertexArray(null)
        gl.bindBuffer(gl.ARRAY_BUFFER, null)
        const used = n * BYTES_PER_CELL + (shapes ? n * 4 : 0)
        this._gpuBytes += used - batch.bytes
        batch.bytes = used
        batch.count = n
        batch.ox = ox
        batch.oy = oy
        batch.tile = tile
        batch.key = item.key
        batch.tileKey = key
        batch.circles = circles
        batch.lastUsed = this._frame
        byTile.set(key, batch)
        return batch
    }

    _free(batch) {
        const gl = this.gl
        gl.deleteVertexArray(batch.vao)
        gl.deleteBuffer(batch.vbo)
        if (batch.vboShapes) gl.deleteBuffer(batch.vboShapes)
        this._gpuBytes -= batch.bytes
        this._allBatches.delete(batch)
        if (batch.byTile.get(batch.tileKey) === batch) batch.byTile.delete(batch.tileKey)
    }

    _evict() {
        if (this._gpuBytes <= this._budget) return
        const old = [...this._allBatches].filter((b) => b.lastUsed < this._frame).sort((a, b) => a.lastUsed - b.lastUsed)
        for (const batch of old) {
            if (this._gpuBytes <= this._budget * 0.8) break
            this._free(batch)
        }
    }

    // --- a frame -----------------------------------------------------------------------------------------------------------------------------------

    // The view, with the canvas around it, in this frame
    _view() {
        const v = this.host.getView()
        if (!v) return null
        const pad = { x: Math.round(v.width * PADDING), y: Math.round(v.height * PADDING) }
        const size = { x: v.width + pad.x * 2, y: v.height + pad.y * 2 }
        const topLeft = { x: v.left - pad.x, y: v.top - pad.y }
        const envelope = (margin) => {
            const mx = v.width * margin
            const my = v.height * margin
            const ax = (v.left - mx - v.offsetX) / v.scaleX
            const bx = (v.left + v.width + mx - v.offsetX) / v.scaleX
            const ay = (v.top - my - v.offsetY) / v.scaleY
            const by = (v.top + v.height + my - v.offsetY) / v.scaleY
            return { xMin: Math.min(ax, bx), xMax: Math.max(ax, bx), yMin: Math.min(ay, by), yMax: Math.max(ay, by) }
        }
        const toPixel = (x, y) => ({ x: v.scaleX * x + v.offsetX, y: v.scaleY * y + v.offsetY })
        return { size, pad, topLeft, envelope, toPixel, scaleX: v.scaleX, scaleY: v.scaleY, z: v.z }
    }

    // Asks for the tiles around the view, and where a glide is taking it
    _loadAhead(dataset) {
        if (!dataset || !dataset.getData) return
        const view = this._view()
        if (!view) return
        const ext = view.envelope(LOAD_MARGIN)
        const glide = this.host.getGlide ? this.host.getGlide() : null
        if (glide) {
            const dx = glide.x / view.scaleX
            const dy = glide.y / view.scaleY
            if (dx < 0) ext.xMin += dx
            else ext.xMax += dx
            if (dy < 0) ext.yMin += dy
            else ext.yMax += dy
        }
        dataset.getData(ext)
        this._loadedAt = performance.now()
    }

    /** To call on each frame of a movement: asks for the tiles the movement is going to need. */
    moved() {
        if (!this._layers.size || performance.now() - this._loadedAt < LOAD_EVERY_MS) return
        for (const entry of this._layers.values()) for (const item of entry.items) this._loadAhead(item.dataset)
    }

    /** Draws now, on a frame of a movement. */
    drawNow() {
        if (this._raf) cancelAnimationFrame(this._raf)
        this._raf = null
        this._drawPending = false
        this._draw(BUILD_MS_MOVING)
    }

    // A tile is still being built, during a movement. On each frame some more of it is built, and the picture is only drawn again when a tile is finished: a draw that shows nothing
    // new is the GPU's time for nothing, and on an integrated GPU that time is what a frame lacks.
    _buildOn() {
        if (this._raf) return
        this._raf = requestAnimationFrame(() => {
            this._raf = null
            if (!this.host.isMoving()) return this._draw(BUILD_MS_STILL)
            if (this._lost || !this._layers.size) return
            const view = this._view()
            if (!view) return
            const deadline = performance.now() + BUILD_MS_MOVING
            const buildExt = view.envelope(BUILD_MARGIN)
            let finished = false
            let unfinished = false
            for (const entry of this._layers.values()) {
                for (const item of entry.items) {
                    if (item.needsScale) continue
                    const byTile = this._batchMap(item.style, item.dataset)
                    this._tiles(item.dataset, buildExt, (key, tile) => {
                        const batch = byTile.get(key)
                        if (batch && batch.tile === tile && batch.key === item.key) return
                        unfinished = true
                        if (performance.now() >= deadline) return
                        try {
                            if (this._build(item, key, tile, byTile, batch, deadline)) finished = true
                        } catch (error) {
                            // the draw takes care of it
                            if (!(error instanceof UnsupportedShape)) throw error
                            finished = true
                        }
                    })
                }
            }
            if (finished) this._builtSinceDraw = true
            if ((this._builtSinceDraw || !unfinished) && (!this.host.canDraw || this.host.canDraw())) {
                this._builtSinceDraw = false
                return this._draw(BUILD_MS_MOVING)
            }
            this._buildOn()
        })
    }

    /** Schedules a draw on the next animation frame. */
    redraw() {
        if (!this.ok) return
        // this one asks for a draw, which a frame that only builds would leave out
        if (this._raf) {
            if (!this._drawPending) {
                cancelAnimationFrame(this._raf)
                this._raf = null
            } else return
        }
        this._drawPending = true
        this._raf = requestAnimationFrame(() => {
            this._drawPending = false
            this._raf = null
            const moving = this.host.isMoving()
            // in a movement, the GPU first: this comes back on the next frame
            if (moving && this.host.canDraw && !this.host.canDraw()) return this.redraw()
            this._draw(moving ? BUILD_MS_MOVING : BUILD_MS_STILL)
        })
    }

    _draw(buildMs) {
        const gl = this.gl
        if (this._lost || !this._layers.size || !this.canvas.parentElement) return
        const view = this._view()
        if (!view) return
        this._frame++
        this._needsDrawAgain = false
        const dpr = Math.min(window.devicePixelRatio || 1, 2)
        const w = Math.max(1, Math.round(view.size.x * dpr))
        const h = Math.max(1, Math.round(view.size.y * dpr))
        if (this.canvas.width !== w || this.canvas.height !== h) {
            this.canvas.width = w
            this.canvas.height = h
            this.canvas.style.width = view.size.x + 'px'
            this.canvas.style.height = view.size.y + 'px'
        }
        this._dpr = dpr

        gl.bindFramebuffer(gl.FRAMEBUFFER, null)
        gl.viewport(0, 0, w, h)
        gl.clearColor(0, 0, 0, 0)
        gl.clear(gl.COLOR_BUFFER_BIT)

        const deadline = performance.now() + buildMs
        let unfinished = false
        for (const entry of this._layers.values()) {
            // a layer with a style that multiplies is drawn on the buffer for that: see _beginMultiply
            const multiply = entry.items.some((item) => this._multiplies(item, view))
            if (multiply) this._beginMultiply()
            for (let i = 0; i < entry.items.length; i++) {
                let item = entry.items[i]
                // a zoom has left the resolution of the layer's dataset: the new one takes over, under which the old one stays until its tiles are in
                const wanted = this.host.isMoving() ? item.gridLayer.getDataset(view.z) : item.dataset
                if (wanted && wanted !== item.dataset) {
                    item = entry.items[i] = {
                        ...item,
                        dataset: wanted,
                        resolution: wanted.getResolution(),
                        z: view.z,
                        viewScale: null,
                        under: item.drawn ? item : item.under,
                        key: 'zoom' + this._frame,
                        drawn: false,
                        scaleCells: null,
                        needsScale: !!item.style.viewScale,
                    }
                }
                if (!this._drawItem(item, view, deadline)) unfinished = true
            }
            if (multiply) this._endMultiply()
        }
        if (this.host.onDrawn) this.host.onDrawn({ left: view.topLeft.x, top: view.topLeft.y, width: view.size.x, height: view.size.y, padX: view.pad.x, padY: view.pad.y })
        this._evict()
        if (unfinished) {
            // what is missing is not ready to be drawn, or not built: while moving, only built on
            if (this.host.isMoving() && !this._needsDrawAgain) this._buildOn()
            else this.redraw()
        }
    }

    // Draws what a layer's style has ready, and builds what it has not, in the time left. True when all of the view is drawn.
    _drawItem(item, view, deadline) {
        const style = item.style
        const dataset = item.dataset
        const buildExt = view.envelope(BUILD_MARGIN)
        const viewExt = view.envelope(PADDING)
        const byTile = this._batchMap(style, dataset)

        // the view scale of a dataset that came in during a movement: from the cells of the view it has so far
        if (item.needsScale) {
            dataset.updateViewCache(viewExt)
            const cells = dataset.getViewCache() || []
            if (cells.length) {
                item.scaleCells = sampleOf(style.filter ? cells.filter(style.filter) : cells)
                item.viewScale = style.viewScale(item.scaleCells, item.resolution, view.z)
                item.needsScale = false
            }
        }

        const wanted = []
        let complete = true
        if (!item.needsScale) {
            this._tiles(dataset, buildExt, (key, tile) => {
                let batch = byTile.get(key)
                const fresh = batch && batch.tile === tile && batch.key === item.key
                if (!fresh && performance.now() < deadline) {
                    try {
                        const built = this._build(item, key, tile, byTile, batch, deadline)
                        if (built) batch = built
                        else complete = false
                    } catch (error) {
                        if (!(error instanceof UnsupportedShape)) throw error
                        // this style goes back to the map, for good
                        this._unsupported.add(style)
                        this._backToGridviz(style)
                        return
                    }
                } else if (!fresh) {
                    complete = false
                }
                if (batch) {
                    batch.lastUsed = this._frame
                    wanted.push(batch)
                }
            })
        } else {
            complete = false
            this._needsDrawAgain = true
        }
        const pending = dataset.info === undefined && !dataset.cells ? true : !!(dataset.info && this._loading(dataset, viewExt))
        if (complete && !pending && item.under) item.under = null
        // The view is not all here: what was shown before, and what is known from further away, stand in for what is missing. Only there: never through the gaps
        // between the cells of a tile that has come in (a place with no cell has none), where the cells of a coarser resolution would show, huge.
        const backdrop = item.backdrop && this.host.isMoving() && (!complete || pending || !this._covers(dataset, viewExt)) ? item.backdrop : null
        if (item.under || backdrop) {
            this._beginStandIn()
            this._markHere(dataset, byTile, view)
            if (item.under) {
                this._drawUnder(item.under, view)
                this._markHere(item.under.dataset, this._batchMap(item.under.style, item.under.dataset), view)
            }
            if (backdrop) this._drawBackdrop(backdrop, view, item)
            this.gl.disable(this.gl.STENCIL_TEST)
        }
        if (wanted.length) {
            item.drawn = true
            let alpha = style.alpha ? style.alpha(view.z) : 1
            if (item.gridLayer.alpha) alpha *= item.gridLayer.alpha(view.z)
            this._drawCells(wanted, item, view, alpha, this._multiplies(item, view))
        }
        // (tiles that are still on their way ask for a draw when they arrive)
        return complete
    }

    // From here on, cells are drawn only on what has not been marked
    _beginStandIn() {
        const gl = this.gl
        gl.clearStencil(0)
        gl.clear(gl.STENCIL_BUFFER_BIT)
        gl.enable(gl.STENCIL_TEST)
        gl.stencilFunc(gl.EQUAL, 0, 0xff)
        gl.stencilOp(gl.KEEP, gl.KEEP, gl.KEEP)
    }

    // Marks the places of the tiles of a dataset that are there: drawn, or known to be empty
    _markHere(dataset, byTile, view) {
        const gl = this.gl
        gl.clearStencil(1)
        if (dataset.cells) {
            if (dataset.cells.length) gl.clear(gl.STENCIL_BUFFER_BIT)
            return
        }
        if (!dataset.cache || !dataset.info) return
        const tb = dataset.getTilingEnvelope(view.envelope(PADDING))
        if (!tb) return
        const po = dataset.info.originPoint
        const span = dataset.info.resolutionGeo * dataset.info.tileSizeCell
        const h = this.canvas.height
        gl.enable(gl.SCISSOR_TEST)
        for (let x = tb.xMin; x <= tb.xMax; x++) {
            const column = dataset.cache[x]
            if (!column) continue
            for (let y = tb.yMin; y <= tb.yMax; y++) {
                const tile = column[y]
                if (!tile || typeof tile === 'string') continue
                if (tile.cells && tile.cells.length && !byTile.has(x + '/' + y)) continue
                const a = view.toPixel(po.x + span * x, po.y + span * y)
                const b = view.toPixel(po.x + span * (x + 1), po.y + span * (y + 1))
                const left = Math.round((Math.min(a.x, b.x) - view.topLeft.x) * this._dpr)
                const right = Math.round((Math.max(a.x, b.x) - view.topLeft.x) * this._dpr)
                const top = Math.round((Math.min(a.y, b.y) - view.topLeft.y) * this._dpr)
                const bottom = Math.round((Math.max(a.y, b.y) - view.topLeft.y) * this._dpr)
                gl.scissor(left, h - bottom, right - left, bottom - top)
                gl.clear(gl.STENCIL_BUFFER_BIT)
            }
        }
        gl.disable(gl.SCISSOR_TEST)
    }

    // Whether all the tiles of a dataset in an envelope have been asked for and answered
    _covers(dataset, ext) {
        if (dataset.cells) return true
        if (!dataset.cache || !dataset.info) return false
        const tb = dataset.getTilingEnvelope(ext)
        if (!tb) return false
        const gb = dataset.info.tilingBounds || tb
        for (let x = Math.max(tb.xMin, gb.xMin); x <= Math.min(tb.xMax, gb.xMax); x++) {
            const column = dataset.cache[x]
            if (!column) return false
            for (let y = Math.max(tb.yMin, gb.yMin); y <= Math.min(tb.yMax, gb.yMax); y++) if (!column[y] || column[y] === 'loading') return false
        }
        return true
    }

    // main: the item this one stands in for
    _drawBackdrop(item, view, main) {
        const ext = view.envelope(BACKDROP_REACH)
        const byTile = this._batchMap(item.style, item.dataset)
        const style = item.style
        const missing = []
        this._tiles(item.dataset, ext, (key, tile) => {
            const batch = byTile.get(key)
            if (!batch || batch.tile !== tile || batch.key !== item.key) missing.push([key, tile, batch])
        })
        if (missing.length) {
            // What is built needs a view scale of this resolution. The function of a view scale can give the same object each time (viewScaleQuantile does): worked out
            // here, what the layer's own view scale says changes too, and the next tiles of the layer would be built for a resolution that is not theirs: enormous
            // circles. So the layer's is worked out again right after.
            if (item.needsScale) {
                item.dataset.updateViewCache(ext)
                const cells = item.dataset.getViewCache() || []
                if (!cells.length) return
                item.viewScale = style.viewScale(sampleOf(style.filter ? cells.filter(style.filter) : cells), item.resolution, view.z)
            }
            for (const [key, tile, batch] of missing) this._build(item, key, tile, byTile, batch)
            if (item.needsScale && main.viewScale && main.scaleCells) main.viewScale = style.viewScale(main.scaleCells, main.resolution, main.z)
        }
        const batches = []
        this._tiles(item.dataset, ext, (key) => {
            const batch = byTile.get(key)
            if (!batch) return
            batch.lastUsed = this._frame
            batches.push(batch)
        })
        // a circle is sized for its resolution: a coarse one is out of all proportion, and worse than nothing
        if (batches.some((batch) => batch.circles)) {
            this._noBackdrop.add(style)
            return
        }
        if (batches.length) this._drawCells(batches, item, view, 1, false)
    }

    _loading(dataset, ext) {
        if (!dataset.cache) return false
        const tb = dataset.getTilingEnvelope(ext)
        if (!tb) return true
        for (let x = tb.xMin; x <= tb.xMax; x++) {
            const column = dataset.cache[x]
            if (!column) continue
            for (let y = tb.yMin; y <= tb.yMax; y++) if (column[y] === 'loading') return true
        }
        return false
    }

    // What was shown before, under what takes its place. Only what is built already.
    _drawUnder(item, view) {
        const byTile = this._batchMap(item.style, item.dataset)
        const batches = []
        this._tiles(item.dataset, view.envelope(BUILD_MARGIN), (key, tile) => {
            const batch = byTile.get(key)
            if (batch && batch.tile === tile) {
                batch.lastUsed = this._frame
                batches.push(batch)
            }
        })
        if (batches.length) this._drawCells(batches, item, view, 1)
    }

    _setCellUniforms(item, view, alpha) {
        const gl = this.gl
        const { program, uniforms: u } = this._cell
        const { style, resolution: r } = item
        gl.useProgram(program)
        gl.uniform2f(u.u_viewport, view.size.x, view.size.y)
        gl.uniform2f(u.u_scale, view.scaleX, view.scaleY)
        gl.uniform1f(u.u_minHalf, 0.5 / this._dpr)
        gl.uniform1f(u.u_alpha, alpha)
        // A circle's size was worked out for a zoom. In a zoom in, it grows with the map up to this factor and no further: scaled with everything else, the circles of a
        // view zoomed in by a few levels are enormous until the map stops and they are worked out again.
        const grown = item.z / view.z
        gl.uniform1f(u.u_circleScale, grown > MAX_CIRCLE_GROWTH ? MAX_CIRCLE_GROWTH / grown : 1)
        // the squares of a map overlap by a fraction of a pixel, so that no gap shows between them
        gl.uniform1f(u.u_size, style.size && typeof style.size === 'function' && !(style instanceof ShapeColorSizeStyle) && !(style instanceof StrokeStyle) ? style.size(r, view.z) : r + 0.2 * view.z)
        return u
    }

    // Only the cells of a 2D style multiply each other. The WebGL styles draw their squares in one image, and multiply that with what is under it:
    // with nothing under it, as these styles are, it comes to the squares as they are. (Squares multiplied one by one would darken where they overlap.)
    _multiplies(item, view) {
        const { style, gridLayer } = item
        if (!(style instanceof ShapeColorSizeStyle) && !(style instanceof StrokeStyle)) return false
        return (style.blendOperation && style.blendOperation(view.z) === 'multiply') || (gridLayer.blendOperation && gridLayer.blendOperation(view.z) === 'multiply')
    }

    _drawCells(batches, item, view, alpha, multiply) {
        const gl = this.gl
        const u = this._setCellUniforms(item, view, alpha)
        gl.enable(gl.BLEND)
        if (multiply) gl.blendFuncSeparate(gl.DST_COLOR, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA)
        else gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA)
        this._drawBatches(batches, u, view)
        gl.disable(gl.BLEND)
    }

    _drawBatches(batches, u, view) {
        const gl = this.gl
        for (const batch of batches) {
            const corner = view.toPixel(batch.ox, batch.oy)
            gl.uniform2f(u.u_offset, corner.x - view.topLeft.x, corner.y - view.topLeft.y)
            gl.bindVertexArray(batch.vao)
            gl.drawArraysInstanced(gl.TRIANGLES, 0, 6, batch.count)
        }
        gl.bindVertexArray(null)
    }

    // 'multiply', as the map's canvas does it, which blending cannot do on a canvas that is transparent: there, multiplying by what is there leaves
    // nothing. So the layer is drawn on a buffer of transparent white, where multiplying by what is there leaves a cell's colour as it is on an empty place,
    // and multiplies it with what is under it elsewhere. The white is taken away when it is copied to the canvas (RESOLVE_FS).
    _beginMultiply() {
        const gl = this.gl
        const w = this.canvas.width
        const h = this.canvas.height
        if (!this._fboSize || this._fboSize[0] !== w || this._fboSize[1] !== h) {
            gl.bindTexture(gl.TEXTURE_2D, this._fboTex)
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA8, w, h, 0, gl.RGBA, gl.UNSIGNED_BYTE, null)
            gl.bindFramebuffer(gl.FRAMEBUFFER, this._fbo)
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this._fboTex, 0)
            gl.bindRenderbuffer(gl.RENDERBUFFER, this._fboStencil)
            gl.renderbufferStorage(gl.RENDERBUFFER, gl.STENCIL_INDEX8, w, h)
            gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.STENCIL_ATTACHMENT, gl.RENDERBUFFER, this._fboStencil)
            this._fboSize = [w, h]
        }
        gl.bindFramebuffer(gl.FRAMEBUFFER, this._fbo)
        gl.clearColor(1, 1, 1, 0)
        gl.clear(gl.COLOR_BUFFER_BIT)
    }

    _endMultiply() {
        const gl = this.gl
        gl.bindFramebuffer(gl.FRAMEBUFFER, null)
        gl.enable(gl.BLEND)
        gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA)
        const { program, uniforms: ru } = this._resolve
        gl.useProgram(program)
        gl.activeTexture(gl.TEXTURE0)
        gl.bindTexture(gl.TEXTURE_2D, this._fboTex)
        gl.uniform1i(ru.u_tex, 0)
        gl.bindVertexArray(this._emptyVao)
        gl.drawArrays(gl.TRIANGLES, 0, 3)
        gl.bindVertexArray(null)
        gl.disable(gl.BLEND)
    }

    _backToGridviz(style) {
        for (const [gv, entry] of this._layers) {
            if (!entry.items.some((item) => item.style === style)) continue
            entry.items = entry.items.filter((item) => item.style !== style)
            entry.only = false
            gv.redraw()
        }
    }

    /** The grid layers as they are now, on a canvas of their own: a WebGL canvas is empty once the page has been drawn. For an export to an image.
     * @returns {HTMLCanvasElement|null} */
    snapshot() {
        if (!this.ok || !this._layers.size || !this.canvas.parentElement) return null
        this._draw(50)
        const copy = document.createElement('canvas')
        copy.width = this.canvas.width
        copy.height = this.canvas.height
        copy.getContext('2d').drawImage(this.canvas, 0, 0)
        return copy
    }
}

class UnsupportedShape extends Error {}
