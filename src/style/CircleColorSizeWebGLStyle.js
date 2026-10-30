//@ts-check
'use strict'

import { color as parseColor } from 'd3-color'
import { Style } from '../core/Style.js'
import { getBuffer, getProgram, getSharedWebGLCanvas } from '../utils/webGLUtils.js'

// One instance per circle: the position of its center relative to the view center (geographical unit), its radius (idem), and its color.
const FLOATS_PER_CIRCLE = 7

const VERTEX_SHADER = `#version 300 es
layout(location = 0) in vec2 corner;
layout(location = 1) in vec3 circle;
layout(location = 2) in vec4 col;
uniform vec2 canvasSize;
uniform float z;
out vec4 vCol;
out vec2 vLocal;
out float vRadius;
void main() {
    float radius = circle.z / z;
    // the quad is a pixel bigger than the circle, for its anti-aliased edge
    vec2 local = corner * (radius + 1.0);
    vec2 pix = circle.xy / z + local;
    gl_Position = vec4(pix * 2.0 / canvasSize, 0.0, 1.0);
    vCol = col;
    vLocal = local;
    vRadius = radius;
}
`

const FRAGMENT_SHADER = `#version 300 es
precision mediump float;
in vec4 vCol;
in vec2 vLocal;
in float vRadius;
out vec4 outColor;
void main() {
    float a = clamp(vRadius + 0.5 - length(vLocal), 0.0, 1.0) * vCol.a;
    outColor = vec4(vCol.rgb * a, a);
}
`

/** The colors already parsed, to not parse a color string for each cell. @type {Map<string, Array<number>|null>} */
const parsedColors = new Map()
/** @param {string} c @returns {Array<number>|null} r, g, b, a within [0,1] */
const rgba = (c) => {
    let v = parsedColors.get(c)
    if (v === undefined) {
        const p = parseColor(c)
        v = p ? [p.r / 255, p.g / 255, p.b / 255, p.opacity] : null
        if (parsedColors.size > 10000) parsedColors.clear()
        parsedColors.set(c, v)
    }
    return v
}

/** The data of the circles, reused from draw to draw. */
let instances = new Float32Array(FLOATS_PER_CIRCLE * 4096)

/**
 * A style which shows grid cells as circles, with a specific color and size, drawn with WebGL.
 *
 * It is made for maps with many circles. The circles of the style are drawn by the GPU at once, instead of one by one,
 * and then copied on the map in a single operation. It makes a big difference when there are many circles, and when the style
 * has a blend operation such as "multiply", which is then done once for the style and not for each circle.
 *
 * As a consequence, the circles of one style do not blend with each other: they are all drawn first, then blended with what is below.
 * It is the same as ShapeColorSizeStyle (with the 'circle' shape) in all other aspects.
 * It needs WebGL 2. Without it, the circles are drawn one by one.
 *
 * @example
 * new gridviz.CircleColorSizeWebGLStyle({
 *     color: (cell) => (cell.value > 100 ? 'red' : 'blue'),
 *     size: (cell, resolution) => resolution * 0.5,
 *     blendOperation: () => 'multiply',
 * })
 *
 * @module style
 * @author Joseph Davies
 */
export class CircleColorSizeWebGLStyle extends Style {
    /**
     * @param {object} opts The options of the style (see Style for the common ones: filter, offset, alpha, blendOperation, visible, viewScale).
     * @param {(function(import('../core/Dataset.js').Cell, number, number, object):string) | string} [opts.color] The color of the circle of a cell: a CSS color, or a function of the cell, the resolution, the zoom level and the view scale. A cell without color is not drawn. Default: '#EA6BAC'.
     * @param {(function(import('../core/Dataset.js').Cell, number, number, object):number) | number} [opts.size] The diameter of the circle of a cell, in geographical unit: a number, or a function of the cell, the resolution, the zoom level and the view scale. A cell without size (0) is not drawn. Default: the resolution.
     */
    constructor(opts) {
        super(opts)
        opts = opts || {}
        /**
         * The color of the circle of a cell.
         * @type {(function(import('../core/Dataset.js').Cell, number, number, object):string) | string} */
        this.color = opts.color || '#EA6BAC'

        /**
         * The diameter of the circle of a cell, in geographical unit. A cell without size (0) is not drawn.
         * @type {(function(import('../core/Dataset.js').Cell, number, number, object):number) | number} */
        this.size = opts.size || ((cell, resolution) => resolution)
    }

    /**
     * @param {Array.<import("../core/Dataset.js").Cell>} cells
     * @param {import("../core/GeoCanvas.js").GeoCanvas} geoCanvas
     * @param {number} resolution
     * @override
     */
    draw(cells, geoCanvas, resolution) {
        //filter
        if (this.filter) cells = cells.filter(this.filter)

        const z = geoCanvas.view.z
        const viewScale = this.viewScale ? this.viewScale(cells, resolution, z) : undefined
        const r2 = resolution * 0.5

        // the legend swatch hovered, if any: only the cells of its colour are drawn
        const highlight = this.highlightColors

        const colorFunction = typeof this.color === 'function' ? this.color : null
        const sizeFunction = typeof this.size === 'function' ? this.size : null

        //the circles are positioned relative to the center of the view, to keep the precision of the 32 bits floats
        const vx = geoCanvas.view.x
        const vy = geoCanvas.view.y

        //fill the data of the circles
        if (instances.length < FLOATS_PER_CIRCLE * cells.length)
            instances = new Float32Array(FLOATS_PER_CIRCLE * Math.max(cells.length, 2 * (instances.length / FLOATS_PER_CIRCLE)))
        let n = 0
        for (const c of cells) {
            //@ts-ignore
            const col = colorFunction ? colorFunction(c, resolution, z, viewScale) : this.color
            if (!col || col === 'none') continue
            if (highlight && !this.isHighlighted(col)) continue

            //@ts-ignore
            const size = sizeFunction ? sizeFunction(c, resolution, z, viewScale) : this.size
            if (!size) continue

            const v = rgba(col)
            if (!v) continue

            const offset = this.offset(c, resolution, z)
            const i = n * FLOATS_PER_CIRCLE
            instances[i] = c.x + r2 + offset.dx - vx
            instances[i + 1] = c.y + r2 + offset.dy - vy
            instances[i + 2] = size * 0.5
            instances[i + 3] = v[0]
            instances[i + 4] = v[1]
            instances[i + 5] = v[2]
            instances[i + 6] = v[3]
            n++
        }

        if (n > 0) {
            if (!this.drawWebGL(geoCanvas, n, z)) this.drawCanvas(geoCanvas, n)
        }

        //update legends
        this.updateLegends({ viewScale: viewScale, resolution: resolution, z: z, cells: cells })
    }

    /**
     * Draw the circles with webGL, on the shared canvas, and copy it on the map.
     * @param {import("../core/GeoCanvas.js").GeoCanvas} geoCanvas
     * @param {number} n
     * @param {number} z
     * @returns {boolean} false if webGL 2 is not available.
     * @private
     */
    drawWebGL(geoCanvas, n, z) {
        let cv
        try {
            cv = getSharedWebGLCanvas(geoCanvas.w, geoCanvas.h, { version: 2 })
        } catch (e) {
            return false
        }
        const gl = /** @type {WebGL2RenderingContext} */ (/** @type {unknown} */ (cv.gl))
        if (!gl.drawArraysInstanced) return false

        const program = getProgram(gl, VERTEX_SHADER, FRAGMENT_SHADER)
        gl.useProgram(program)
        gl.uniform2f(gl.getUniformLocation(program, 'canvasSize'), geoCanvas.w, geoCanvas.h)
        gl.uniform1f(gl.getUniformLocation(program, 'z'), z)

        //the corners of the quad of a circle, the same for all circles
        gl.bindBuffer(gl.ARRAY_BUFFER, getBuffer(gl, 'CircleColorSizeWebGLStyle.corner'))
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)
        gl.enableVertexAttribArray(0)
        gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0)
        gl.vertexAttribDivisor(0, 0)

        //the circles: one instance each
        const stride = FLOATS_PER_CIRCLE * 4
        gl.bindBuffer(gl.ARRAY_BUFFER, getBuffer(gl, 'CircleColorSizeWebGLStyle.circles'))
        gl.bufferData(gl.ARRAY_BUFFER, instances.subarray(0, n * FLOATS_PER_CIRCLE), gl.DYNAMIC_DRAW)
        gl.enableVertexAttribArray(1)
        gl.vertexAttribPointer(1, 3, gl.FLOAT, false, stride, 0)
        gl.vertexAttribDivisor(1, 1)
        gl.enableVertexAttribArray(2)
        gl.vertexAttribPointer(2, 4, gl.FLOAT, false, stride, 12)
        gl.vertexAttribDivisor(2, 1)

        gl.clearColor(0, 0, 0, 0)
        gl.clear(gl.COLOR_BUFFER_BIT)
        //colors are premultiplied by the fragment shader
        gl.enable(gl.BLEND)
        gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA)
        gl.drawArraysInstanced(gl.TRIANGLE_STRIP, 0, 4, n)
        gl.disable(gl.BLEND)

        //leave the context as found
        gl.vertexAttribDivisor(1, 0)
        gl.vertexAttribDivisor(2, 0)
        gl.disableVertexAttribArray(0)
        gl.disableVertexAttribArray(1)
        gl.disableVertexAttribArray(2)

        //copy on the map. The alpha and blend operation of the style are the ones of the canvas, set by the layer.
        geoCanvas.initCanvasTransform()
        geoCanvas.offscreenCtx.drawImage(cv.canvas, 0, 0)
        return true
    }

    /**
     * Draw the circles one by one, without webGL.
     * @param {import("../core/GeoCanvas.js").GeoCanvas} geoCanvas
     * @param {number} n
     * @private
     */
    drawCanvas(geoCanvas, n) {
        const ctx = geoCanvas.offscreenCtx
        const vx = geoCanvas.view.x
        const vy = geoCanvas.view.y
        geoCanvas.setCanvasTransform()
        for (let k = 0; k < n; k++) {
            const i = k * FLOATS_PER_CIRCLE
            ctx.fillStyle = 'rgba(' + [255 * instances[i + 3], 255 * instances[i + 4], 255 * instances[i + 5], instances[i + 6]].join(',') + ')'
            ctx.beginPath()
            ctx.arc(instances[i] + vx, instances[i + 1] + vy, instances[i + 2], 0, 2 * Math.PI)
            ctx.fill()
        }
    }
}
