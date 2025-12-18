//@ts-check
'use strict'

import { Style } from '../core/Style.js'
import { initShaderProgram, createShader, makeWebGLCanvas } from '../utils/webGLUtils.js'
import { color } from 'd3-color'

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

        /**  * @type {{canvas:HTMLCanvasElement, gl:WebGLRenderingContext, width:number, height:number }}*/
        this.cvWGL = undefined
        this.programm = undefined
    }


    init(w, h) {
        this.cvWGL = makeWebGLCanvas(w + '', h + '')
        if (!this.cvWGL) { console.error('No webGL'); return }

        const gl = this.cvWGL.gl

        //draw
        const vectorShader = `
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
        /** @type {WebGLShader} */
        const vShader = createShader(gl, gl.VERTEX_SHADER, vectorShader)

        const fragmentShader = `
        precision highp float;
        varying float vi;
        uniform sampler2D colorLUT;
        uniform float lutSize;
        void main(void) {
            float idx = floor(vi + 0.5);
            float u = (idx + 0.5) / lutSize;
            gl_FragColor = texture2D(colorLUT, vec2(u, 0.5));
        }`
        /** @type {WebGLShader} */
        const fShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShader)

        /** @type {WebGLProgram} */
        this.program = initShaderProgram(gl, vShader, fShader)
        gl.useProgram(this.program)
    }

    bindColors() {
        const gl = this.cvWGL.gl
        const lutSize = this.colors.length;
        const lutData = new Uint8Array(lutSize * 4); // RGBA for each entry

        // Fill lutData with your color values (e.g., rainbow, grayscale, etc.)
        for (let i = 0; i < lutSize; i++) {
            const c = color(this.colors[i])
            lutData[i * 4] = +c.r;     // R
            lutData[i * 4 + 1] = c.g; // G
            lutData[i * 4 + 2] = c.b; // B
            lutData[i * 4 + 3] = c?.opacity * 255; // A
        }

        // Create and bind texture
        const lutTexture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, lutTexture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, lutSize, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, lutData);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

        // Get uniform locations
        const uColorLUT = gl.getUniformLocation(this.program, 'colorLUT');
        const uLutSize = gl.getUniformLocation(this.program, 'lutSize');

        // Set uniform values
        gl.uniform1i(uColorLUT, 0); // Texture unit 0
        gl.uniform1f(uLutSize, lutSize);

        // Bind the texture to texture unit 0
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, lutTexture);
    }

    bindVertices(cells, resolution, z, viewScale) {
        const gl = this.cvWGL.gl
        //add vertice and fragment data
        const r2 = resolution / 2
        let c, nb = cells.length
        const verticesBuffer = []
        const iBuffer = []
        for (let i = 0; i < nb; i++) {
            c = cells[i]
            const cat = this.code(c, resolution, z, viewScale)
            if (cat == undefined) {
                console.log('Unexpected category: ' + cat)
                continue
            }
            const i_ = this.catToI[cat]
            if (isNaN(+i_)) {
                console.log('Unexpected category index: ' + cat + ' ' + i_)
                continue
            }
            verticesBuffer.push(c.x + r2, c.y + r2)
            iBuffer.push(+i_)
        }

        //bind vertice data
        gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer())
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verticesBuffer), gl.STATIC_DRAW)
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

        //i data
        gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer())
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(iBuffer), gl.STATIC_DRAW)
        const i = gl.getAttribLocation(this.program, 'i')
        gl.vertexAttribPointer(i, 1, gl.FLOAT, false, 0, 0)
        gl.enableVertexAttribArray(i)
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

        //create canvas and webgl renderer
        if (!this.cvWGL || geoCanvas.w != this.cvWGL.width || geoCanvas.h != this.cvWGL.height) {
            this.init(geoCanvas.w, geoCanvas.h)
            this.bindColors()
        }
        const gl = this.cvWGL.gl
        const canvas = this.cvWGL.canvas

        //bind sizePix
        const sizePix = this.size ? this.size(resolution, z) / z : resolution / z + 0.2
        gl.uniform1f(gl.getUniformLocation(this.program, 'sizePix'), 1.0 * sizePix)

        //
        this.bindVertices(cells, resolution, z, viewScale)

        //transformation
        gl.uniformMatrix3fv(gl.getUniformLocation(this.program, 'mat'), false, new Float32Array(geoCanvas.getWebGLTransform()))

        // Enable the depth test
        //gl.enable(gl.DEPTH_TEST);
        // Clear the color buffer bit
        gl.clear(gl.COLOR_BUFFER_BIT)
        // Set the view port
        //gl.viewport(0, 0, cg.w, cg.h);

        gl.drawArrays(gl.POINTS, 0, cells.length)

        //draw in canvas geo
        geoCanvas.initCanvasTransform()
        geoCanvas.offscreenCtx.drawImage(canvas, 0, 0)

        //update legends
        this.updateLegends({ style: this, resolution: resolution, z: z })
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