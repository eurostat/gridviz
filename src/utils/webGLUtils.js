//@ts-check
'use strict'

/**
 * @param {string} width
 * @param {string} height
 * @param {object} opts
 * @returns {{canvas:HTMLCanvasElement, gl:WebGLRenderingContext, width:number, height:number }}
 */
export function makeWebGLCanvas(width, height, opts = {}) {
    const canvas = document.createElement('canvas')
    canvas.setAttribute('width', width)
    canvas.setAttribute('height', height)
    const version2 = (opts && +opts.version==2)? "2" : ""
    /** @type {WebGLRenderingContext} */
    const gl = canvas.getContext('webgl' + version2, opts)
    if (!gl) {
        throw new Error('Unable to initialize WebGL'+version2+'. Your browser or machine may not support it.')
    }
    return { canvas: canvas, gl: gl, width: width, height: height }
}

/**
 * The shared, off-page WebGL canvases, one per set of context options.
 * Styles draw into one of these and copy the result onto the map's canvas, one style at a
 * time, so they never need a context each. Browsers keep only ~16 live WebGL contexts and
 * drop the oldest beyond that, so one context per style instance (or worse, per draw)
 * eventually blanks other WebGL content on the page.
 * @type {Map<string, {canvas:HTMLCanvasElement, gl:WebGLRenderingContext, width:number, height:number}>} */
const sharedCanvases = new Map()

/**
 * Returns the shared WebGL canvas for these context options, resized to width x height.
 * Resizing keeps the context (and its compiled programs and buffers); only its drawing
 * buffer is reallocated. A lost context is replaced.
 *
 * @param {number} width
 * @param {number} height
 * @param {object} [opts] WebGL context attributes, e.g. { premultipliedAlpha: false }
 * @returns {{canvas:HTMLCanvasElement, gl:WebGLRenderingContext, width:number, height:number }}
 */
export function getSharedWebGLCanvas(width, height, opts = undefined) {
    const key = JSON.stringify(opts || {})
    let cv = sharedCanvases.get(key)
    if (!cv || cv.gl.isContextLost()) {
        cv = makeWebGLCanvas(width + '', height + '', opts)
        cv.width = +width
        cv.height = +height
        sharedCanvases.set(key, cv)
    }
    if (cv.width != width || cv.height != height) {
        cv.canvas.width = width
        cv.canvas.height = height
        cv.width = +width
        cv.height = +height
    }
    cv.gl.viewport(0, 0, cv.width, cv.height)
    return cv
}

/** @type {WeakMap<WebGLRenderingContext, {programs: Map<string, WebGLProgram>, buffers: Map<string, WebGLBuffer>, owners: Map<string, any>}>} */
const glResources = new WeakMap()
function resourcesOf(gl) {
    let r = glResources.get(gl)
    if (!r) {
        r = { programs: new Map(), buffers: new Map(), owners: new Map() }
        glResources.set(gl, r)
    }
    return r
}

/**
 * A shader program for these sources, compiled once per context and reused.
 *
 * @param {WebGLRenderingContext} gl
 * @param {string} vertexSource
 * @param {string} fragmentSource
 * @returns {WebGLProgram}
 */
export function getProgram(gl, vertexSource, fragmentSource) {
    const programs = resourcesOf(gl).programs
    const key = vertexSource + '\u0000' + fragmentSource
    let program = programs.get(key)
    if (!program) {
        program = initShaderProgram(
            gl,
            createShader(gl, gl.VERTEX_SHADER, vertexSource),
            createShader(gl, gl.FRAGMENT_SHADER, fragmentSource)
        )
        programs.set(key, program)
    }
    return program
}

/**
 * A named buffer of a context, created once and reused: refill it with bufferData instead
 * of creating a new buffer per draw (buffers are never garbage collected while their
 * context lives).
 *
 * @param {WebGLRenderingContext} gl
 * @param {string} name
 * @returns {WebGLBuffer}
 */
export function getBuffer(gl, name) {
    const buffers = resourcesOf(gl).buffers
    let buffer = buffers.get(name)
    if (!buffer) {
        buffer = gl.createBuffer()
        buffers.set(name, buffer)
    }
    return buffer
}

/**
 * Who last filled a named buffer, so a style can tell whether the data it uploaded is
 * still there or another style has overwritten it since.
 * @param {WebGLRenderingContext} gl
 * @param {string} name
 * @param {any} [owner] sets the owner when given
 * @returns {any} the owner
 */
export function bufferOwner(gl, name, owner = undefined) {
    const owners = resourcesOf(gl).owners
    if (owner !== undefined) owners.set(name, owner)
    return owners.get(name)
}

/**
 * Initialize a shader program, so WebGL knows how to draw our data
 *
 * @param {WebGLRenderingContext} gl
 * @param  {...WebGLShader} shaders
 * @returns {WebGLProgram}
 */
export function initShaderProgram(gl, ...shaders) {
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
export function createShader(gl, type, ...sources) {
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
export function checkWebGLSupport() {
    try {
        const canvas = document.createElement('canvas')
        return !!(
            !!window.WebGLRenderingContext &&
            (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
        )
    } catch (err) {
        return false
    }
}

/**
 * From this size, in pixels, the squares of the WebGL styles are drawn as triangles instead of points.
 *
 * A point (gl_PointSize) is limited by the GPU (gl.ALIASED_POINT_SIZE_RANGE, a few hundred pixels on some GPUs), and it is
 * dropped as soon as its centre is out of the view, even when the square is still partly in it. Both leave gaps in the grid
 * when the cells are large, that is when the map is zoomed in. Triangles have neither limit. There are few cells in the view
 * then, so their higher cost doesn't matter, and points stay faster for the small cells.
 */
export const MIN_SQUARE_SIZE_AS_TRIANGLES = 24

/**
 * Tells if squares of this size (in pixels) must be drawn as triangles rather than points.
 *
 * @param {WebGLRenderingContext} gl
 * @param {number} sizePix
 * @returns {boolean}
 */
export function drawSquaresAsTriangles(gl, sizePix) {
    const range = gl.getParameter(gl.ALIASED_POINT_SIZE_RANGE)
    const max = range ? range[1] : 1
    return sizePix > Math.min(max, MIN_SQUARE_SIZE_AS_TRIANGLES)
}

// the corners of a square, in units of its half size, as two triangles
const SQUARE_CORNERS = [-1, -1, 1, -1, 1, 1, -1, -1, 1, 1, -1, 1]

/**
 * Turns points into squares made of two triangles each (6 vertices), to be drawn with gl.TRIANGLES.
 * The vertex shader places the corners with `pos + corner * halfSize`.
 *
 * @param {ArrayLike<number>} positions The x,y of the n points (2*n numbers).
 * @param {number} n The number of points.
 * @param {Array.<ArrayLike<number>>} values Some values for each point (n numbers each), repeated for the 6 vertices of its square.
 * @returns {{positions:Float32Array, corners:Float32Array, values:Array.<Float32Array>}}
 */
export function pointsToSquares(positions, n, values = []) {
    const pos = new Float32Array(12 * n)
    const corners = new Float32Array(12 * n)
    const vals = values.map(() => new Float32Array(6 * n))
    for (let i = 0; i < n; i++) {
        for (let k = 0; k < 6; k++) {
            const o = 12 * i + 2 * k
            pos[o] = positions[2 * i]
            pos[o + 1] = positions[2 * i + 1]
            corners[o] = SQUARE_CORNERS[2 * k]
            corners[o + 1] = SQUARE_CORNERS[2 * k + 1]
            for (let v = 0; v < values.length; v++) vals[v][6 * i + k] = values[v][i]
        }
    }
    return { positions: pos, corners: corners, values: vals }
}
