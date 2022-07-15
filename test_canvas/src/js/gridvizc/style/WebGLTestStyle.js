//@ts-check

import { Style } from "../Style"
import { Cell } from "../Dataset"
import { GeoCanvas } from "../GeoCanvas";

export class WebGLTestStyle extends Style {

    /** @param {object} opts */
    constructor(opts) {
        super(opts)
    }



    draw(cells, r, cg) {
        //zoom factor
        const zf = cg.getZf()

        //console.log("webgl test ", cells.length, r)

        //https://webglfundamentals.org/webgl/lessons/webgl-fundamentals.html
        //2D section

        //https://medium.com/trabe/a-brief-introduction-to-webgl-5b584db3d6d6
        //https://observablehq.com/d/dfb2674035a1f388
        //https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Tutorial/Adding_2D_content_to_a_WebGL_context
        //https://webglfundamentals.org/webgl/lessons/webgl-drawing-multiple-things.html



        //create canvas and webgl renderer
        const cvWGL = makeWebGLCanvas(cg)
        if (!cvWGL) return

        const p = new WebGLRectangleColoring(cvWGL.gl)

        //create vertice and fragment data
        for (let c of cells) {
            p.addRectangleData(c.x, c.x + r, c.y, c.y + r, 1, Math.random(), Math.random())
        }

        //draw
        p.draw(cg.getWebGLTransform())

        //draw in canvas geo
        cg.initCanvasTransform()
        cg.ctx.drawImage(cvWGL.canvas, 0, 0);
    }

}



export class WebGLRectangleColoring {

    constructor(gl) {

        this.gl = gl

        this.program = initShaderProgram(
            gl,
            createShader(gl, gl.VERTEX_SHADER, `
            attribute vec2 pos;
            uniform mat3 mat;
            attribute vec3 color;
            varying vec3 vColor;
            void main() {
              gl_Position = vec4(mat * vec3(pos, 1.0), 1.0);
              vColor = color;
            }
          `),
            createShader(gl, gl.FRAGMENT_SHADER, `
            precision mediump float;
            varying vec3 vColor;
            void main(void) {
               gl_FragColor = vec4(vColor, 1.0);
            }`)
        );
        gl.useProgram(this.program);

        //buffer data
        this.verticesBuffer = [];
        this.colorsBuffer = [];
    }

    /** Add data to vertices/color buffers for color rectangle drawing */
    addRectangleData(x1, x2, y1, y2, cR = 0, cG = 0, cB = 1, cA = 0) { //TODO cA
        //add vertices
        const v = this.verticesBuffer
        v.push(x1); v.push(y1)
        v.push(x2); v.push(y1)
        v.push(x1); v.push(y2)
        v.push(x2); v.push(y2)

        //colors, 3 parts (RGB), one per vertice
        const c = this.colorsBuffer
        c.push(cR); c.push(cG); c.push(cB)
        c.push(cR); c.push(cG); c.push(cB)
        c.push(cR); c.push(cG); c.push(cB)
        c.push(cR); c.push(cG); c.push(cB)
    }


    /**  */
    draw(transfoMat) {
        const gl = this.gl

        //vertice data
        gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.verticesBuffer), gl.STATIC_DRAW);
        const position = gl.getAttribLocation(this.program, "pos");
        gl.vertexAttribPointer(
            position,
            2, //numComponents
            gl.FLOAT, //type
            false, //normalise
            0, //stride
            0 //offset
        );
        gl.enableVertexAttribArray(position);

        //color data
        gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.colorsBuffer), gl.STATIC_DRAW);
        var color = gl.getAttribLocation(this.program, "color");
        gl.vertexAttribPointer(color, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(color);

        //transformation
        gl.uniformMatrix3fv(gl.getUniformLocation(this.program, "mat"), false, new Float32Array(transfoMat));

        // Enable the depth test
        //gl.enable(gl.DEPTH_TEST);
        // Clear the color buffer bit
        gl.clear(gl.COLOR_BUFFER_BIT);
        // Set the view port
        //gl.viewport(0, 0, cg.w, cg.h);

        for (let i = 0; i < this.verticesBuffer.length / 8; i++) {
            gl.drawArrays(
                gl.TRIANGLE_STRIP, // mode,see https://miro.medium.com/max/700/0*HQHB5lCGqlOUiysy.jpg
                i * 4, // vertex list start
                4 // vertex count
            );
        }

    }

}








// generic webgl

/**  */
const makeWebGLCanvas = function (cg) {
    const canvas = document.createElement("canvas");
    canvas.setAttribute("width", cg.w);
    canvas.setAttribute("height", cg.h);
    const gl = canvas.getContext("webgl");
    if (!gl) {
        console.error(gl, "Unable to initialize WebGL. Your browser or machine may not support it.");
        return
    }
    return { canvas: canvas, gl: gl }
}

// Initialize a shader program, so WebGL knows how to draw our data
function initShaderProgram(gl, ...shaders) {
    const program = gl.createProgram();
    for (const shader of shaders) gl.attachShader(program, shader);
    gl.linkProgram(program);
    if (gl.getProgramParameter(program, gl.LINK_STATUS)) return program;
    throw new Error(gl.getProgramInfoLog(program));
}


// creates a shader of the given type, uploads the source and compiles it.
function createShader(gl, type, ...sources) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, sources.join("\n"));
    gl.compileShader(shader);
    if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) return shader;
    throw new Error(gl.getShaderInfoLog(shader));
}
