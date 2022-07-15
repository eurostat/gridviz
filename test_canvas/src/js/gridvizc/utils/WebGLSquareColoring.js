//@ts-check

import { initShaderProgram, createShader } from "./webGLUtils";


/**
 * Aything to easily draw colored points (square) with webGL.
 */
export class WebGLSquareColoring {

    /**
     * 
     * @param {*} gl 
     */
    constructor(gl) {

        this.gl = gl

        this.program = initShaderProgram(
            gl,
            createShader(gl, gl.VERTEX_SHADER, `
            attribute vec2 pos;
            attribute float sizePix;
            uniform mat3 mat;
            attribute vec3 color;
            varying vec3 vColor;
            void main() {
              gl_Position = vec4(mat * vec3(pos, 1.0), 1.0);
              gl_PointSize = sizePix;
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
        this.sizeBuffer = [];
        this.colorsBuffer = [];
    }

    /** Add data to vertices/size/color buffers for color squares drawing */
    addPointData(xC, yC, sizePix, cR = 0, cG = 0, cB = 1, cA = 0) { //TODO cA
        //add vertices
        const v = this.verticesBuffer
        v.push(xC); v.push(yC)

        //add size
        this.sizeBuffer.push(sizePix)

        //colors, 3 parts (RGB)
        const c = this.colorsBuffer
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

        //size data
        gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.sizeBuffer), gl.STATIC_DRAW);
        var sizePix = gl.getAttribLocation(this.program, "sizePix");
        gl.vertexAttribPointer(sizePix, 1, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(sizePix);

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

        gl.drawArrays(gl.POINTS, 0, this.verticesBuffer.length/2)
    }
}
