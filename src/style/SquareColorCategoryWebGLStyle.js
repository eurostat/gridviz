//@ts-check
'use strict'

import { Style } from '../core/Style.js'
import { getSharedWebGLCanvas, getProgram, getBuffer, bufferOwner } from '../utils/webGLUtils.js'
import { color } from 'd3-color'

const VERTEX_SHADER = `
        attribute vec2 pos;
        uniform float sizePix;
        uniform mat3 mat;
        attribute float i;
        varying float vi;
        void main() {
          gl_Position = vec4(mat * vec3(pos, 1.0), 1.0);
          gl_PointSize = sizePix;
          vi = i;
        }`

const FRAGMENT_SHADER = `
        precision highp float;
        varying float vi;
        uniform sampler2D colorLUT;
        uniform float lutSize;
        void main(void) {
            float idx = floor(vi + 0.5);
            float u = (idx + 0.5) / lutSize;
            gl_FragColor = texture2D(colorLUT, vec2(u, 0.5));
        }`

// names of the buffers this style fills in the shared context (getBuffer)
const POSITION_BUFFER = 'SquareColorCategoryWebGLStyle.pos'
const INDEX_BUFFER = 'SquareColorCategoryWebGLStyle.i'

/**
 * Style based on webGL
 * To show cells as colored squares, from categories.
 * All cells are drawn as squares, with the same size
 *
 * @module style
 * @author Julien Gaffuri
 */
export class SquareColorCategoryWebGLStyle extends Style {
    /** @param {object} opts */
    constructor(opts) {
        super(opts)
        opts = opts || {}

        /**
         * A function returning the category code of the cell, for coloring.
         * @type {function(import('../core/Dataset.js').Cell, number, number, viewScale):string} */
        this.code = opts.code  // (c, resolution, z, viewScale) => "code1"

        /**
         * The dictionary (code -> color) which gives the color of each category code.
         * @type {object} */
        opts.color = opts.color || undefined

        /** @type { Array.<string> } */
        const codes = Object.keys(opts.color)

        /** @type { object } @private */
        this.catToI = {}
        for (let i = 0; i < codes.length; i++) this.catToI[codes[i]] = i + ''

        /** @type { Array.<string> } @private */
        this.colors = []
        for (const code of codes) this.colors.push(opts.color['' + code])

        /**
         * A function returning the size of the cells, in geographical unit. All cells have the same size.
         * @type {function(number,number):number} */
        this.size = opts.size // (resolution, z) => ...

        /** The shared WebGL canvas this style last drew into (getSharedWebGLCanvas)
         * @type {{canvas:HTMLCanvasElement, gl:WebGLRenderingContext, width:number, height:number }}*/
        this.cvWGL = undefined
        /** @type {WebGLRenderingContext|undefined} */
        this.gl = undefined
        this.program = undefined
        this.lutTexture = undefined
        /** Number of points in the shared buffers, for drawArrays */
        this.pointsNb = 0

        this.x = undefined
        this.y = undefined
        this.z = undefined
        this.cellsNb = undefined
        /** The highlight (see Style.setHighlight) the vertices were bound with @private */
        this.highlightKey = ''
    }

    /**
     * Binds this style's program, colour lookup texture and uniforms in the shared WebGL
     * context (getSharedWebGLCanvas): compiled once per context, so a new style instance
     * (e.g. a setting change rebuilding the style) costs no new context or program.
     * @returns {boolean} true when the context is new to this style (its data must be re-uploaded)
     */
    init(w, h) {
        this.cvWGL = getSharedWebGLCanvas(w, h)
        const gl = this.cvWGL.gl
        const contextChanged = this.gl !== gl
        if (contextChanged) {
            this.gl = gl
            this.program = getProgram(gl, VERTEX_SHADER, FRAGMENT_SHADER)
            this.lutTexture = undefined
        }
        gl.useProgram(this.program)
        this.bindColors()
        return contextChanged
    }

    bindColors() {
        const gl = this.cvWGL.gl
        const lutSize = this.colors.length

        // created once per style and context
        if (!this.lutTexture) {
            const lutData = new Uint8Array(lutSize * 4) // RGBA for each entry
            for (let i = 0; i < lutSize; i++) {
                const c = color(this.colors[i])
                lutData[i * 4] = +c.r
                lutData[i * 4 + 1] = c.g
                lutData[i * 4 + 2] = c.b
                lutData[i * 4 + 3] = c?.opacity * 255
            }
            this.lutTexture = gl.createTexture()
            gl.bindTexture(gl.TEXTURE_2D, this.lutTexture)
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, lutSize, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, lutData)
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST)
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST)
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
        }

        gl.uniform1i(gl.getUniformLocation(this.program, 'colorLUT'), 0) // Texture unit 0
        gl.uniform1f(gl.getUniformLocation(this.program, 'lutSize'), lutSize)
        gl.activeTexture(gl.TEXTURE0)
        gl.bindTexture(gl.TEXTURE_2D, this.lutTexture)
    }

    /**
     * Fills the shared position and colour index buffers with the cells to draw.
     * @returns {number} the number of points uploaded (cells without a category are left out)
     */
    bindVertices(cells, resolution, z, viewScale) {
        const gl = this.cvWGL.gl
        //add vertice and fragment data
        const r2 = resolution / 2
        let c,
            nb = cells.length
        const verticesBuffer = new Float32Array(2 * nb)
        const iBuffer = new Float32Array(nb)
        // categories shown while a legend swatch is hovered: those drawn in the colour of the swatch
        const shown = this.highlightColors ? this.colors.map((c) => this.isHighlighted(c)) : null
        let n = 0
        for (let i = 0; i < nb; i++) {
            c = cells[i]
            const cat = this.code(c, resolution, z, viewScale)
            if (cat == undefined) {
                //console.log('Unexpected category: ' + cat)
                continue
            }
            const i_ = this.catToI[cat]
            if (isNaN(+i_)) {
                console.log('Unexpected category index: ' + cat + ' ' + i_)
                continue
            }
            if (shown && !shown[+i_]) continue
            verticesBuffer[2 * n] = c.x + r2
            verticesBuffer[2 * n + 1] = c.y + r2
            iBuffer[n] = +i_
            n++
        }

        gl.bindBuffer(gl.ARRAY_BUFFER, getBuffer(gl, POSITION_BUFFER))
        gl.bufferData(gl.ARRAY_BUFFER, verticesBuffer.subarray(0, 2 * n), gl.DYNAMIC_DRAW)
        gl.bindBuffer(gl.ARRAY_BUFFER, getBuffer(gl, INDEX_BUFFER))
        gl.bufferData(gl.ARRAY_BUFFER, iBuffer.subarray(0, n), gl.DYNAMIC_DRAW)
        bufferOwner(gl, POSITION_BUFFER, this)
        return n
    }

    /** Points the program's attributes at the shared buffers (whatever another style left bound). */
    bindAttributes() {
        const gl = this.cvWGL.gl
        const position = gl.getAttribLocation(this.program, 'pos')
        gl.bindBuffer(gl.ARRAY_BUFFER, getBuffer(gl, POSITION_BUFFER))
        gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)
        gl.enableVertexAttribArray(position)
        const i = gl.getAttribLocation(this.program, 'i')
        gl.bindBuffer(gl.ARRAY_BUFFER, getBuffer(gl, INDEX_BUFFER))
        gl.vertexAttribPointer(i, 1, gl.FLOAT, false, 0, 0)
        gl.enableVertexAttribArray(i)
    }

    // check if the vertices have to be bound again
    mapContentChanged(v, cellsNb) {
        if (v.x == this.x && v.y == this.y && v.z == this.z && this.cellsNb == cellsNb) return false
        this.x = v.x
        this.y = v.y
        this.z = v.z
        this.cellsNb = cellsNb
        return true
    }


    /**
     * @param {Array.<import("../core/Dataset.js").Cell>} cells
     * @param {import("../core/GeoCanvas.js").GeoCanvas} geoCanvas
     * @param {number} resolution
     */
    draw(cells, geoCanvas, resolution) {
        //filter
        if (this.filter) cells = cells.filter(this.filter)

        //
        const z = geoCanvas.view.z

        //get view scale
        const viewScale = this.viewScale ? this.viewScale(cells, resolution, z) : undefined

        //bind this style's program in the shared WebGL context
        const contextChanged = this.init(geoCanvas.w, geoCanvas.h)
        const gl = this.cvWGL.gl
        const canvas = this.cvWGL.canvas

        //bind sizePix
        const sizePix = this.size ? this.size(resolution, z) / z : resolution / z + 0.2
        gl.uniform1f(gl.getUniformLocation(this.program, 'sizePix'), 1.0 * sizePix)

        // mapContentChanged() is a cheap proxy for "did the content change", based on view
        // x/y/z and cell count alone. The upload is also needed when the shared buffers
        // hold another style's data (bufferOwner), or the context is new to this style
        // (e.g. replaced after being lost).
        const highlightKey = this.highlightColors ? this.highlightColors.join('|') : ''
        const highlightChanged = highlightKey !== this.highlightKey
        this.highlightKey = highlightKey
        const contentChanged = this.mapContentChanged(geoCanvas.view, cells.length) || highlightChanged
        if (contentChanged || contextChanged || bufferOwner(gl, POSITION_BUFFER) !== this)
            this.pointsNb = this.bindVertices(cells, resolution, z, viewScale)
        this.bindAttributes()

        //transformation
        gl.uniformMatrix3fv(
            gl.getUniformLocation(this.program, 'mat'),
            false,
            new Float32Array(geoCanvas.getWebGLTransform())
        )

        // Clear the color buffer bit
        gl.clearColor(0, 0, 0, 0)
        gl.clear(gl.COLOR_BUFFER_BIT)

        // only the points actually uploaded: cells without a category are left out, and
        // drawing past the end of the buffer is a WebGL error that draws nothing at all
        gl.drawArrays(gl.POINTS, 0, this.pointsNb)

        //draw in canvas geo
        geoCanvas.initCanvasTransform()
        geoCanvas.offscreenCtx.drawImage(canvas, 0, 0)

        //update legends
        this.updateLegends({ style: this, resolution: resolution, z: z, viewScale: viewScale })
    }
}



// early tests for webgl2 migration

/*
function getVectorShader2() {
    return `
        #version 300 es
        precision highp float;

        in vec2 pos;
        in int i;

        uniform float sizePix;
        uniform mat3 mat;

        flat out int vi;

        void main() {
            gl_Position = vec4(mat * vec3(pos, 1.0), 1.0);
            gl_PointSize = sizePix;
            vi = i;
        }
        `
}


function getFragmentShader2(colors) {

    //prepare fragment shader code
    //declare the uniform and other variables
    const out = []
    out.push('#version 300 es\nprecision highp float;\nflat in int vi;\n')

    //add color uniforms
    //uniform vec4 colors[12];
    out.push('uniform vec4 colors[')
    out.push(colors.length)
    out.push('];\n')

    out.push('out vec4 fragColor;\n')

    //start the main function
    //void main() { fragColor = colors[clamp(vi, 0, 11)]; }
    out.push('void main() { fragColor = colors[vi]; }\n')

    /** Fragment shader program
    const fshString = out.join('')
    console.log(fshString)
    return fshString
}

*/