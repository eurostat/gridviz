//@ts-check

import { initShaderProgram, createShader } from "./webGLUtils";

/**
 */
export class WebGLSquareColoring2 {

    /**
     * 
     * @param {WebGLRenderingContext} gl 
     */
    constructor(gl, sizePix) {

        this.gl = gl
        this.sizePix = sizePix || 10.0

        this.program = initShaderProgram(
            gl,
            createShader(gl, gl.VERTEX_SHADER, `
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
          `),
            createShader(gl, gl.FRAGMENT_SHADER, `
            precision mediump float;
            varying float vt;
            void main(void) {
                float t = vt;
                gl_FragColor = vec4(t, 1.0-t, 0.3, 1.0);
            }`)
        );
        gl.useProgram(this.program);

        //buffer data
        this.verticesBuffer = [];
        this.tBuffer = [];
    }

    /** Add data to vertices/size/color buffers for color squares drawing */
    addPointData(xC, yC, t) {
        //vertices
        this.verticesBuffer.push(xC, yC)
        //t value
        this.tBuffer.push(t)
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

        //t data
        gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.tBuffer), gl.STATIC_DRAW);
        const t = gl.getAttribLocation(this.program, "t");
        gl.vertexAttribPointer(t, 1, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(t);

        //sizePix
        gl.uniform1f(gl.getUniformLocation(this.program, "sizePix"), 1.0 * this.sizePix);

        //transformation
        gl.uniformMatrix3fv(gl.getUniformLocation(this.program, "mat"), false, new Float32Array(transfoMat));

        // Enable the depth test
        //gl.enable(gl.DEPTH_TEST);
        // Clear the color buffer bit
        gl.clear(gl.COLOR_BUFFER_BIT);
        // Set the view port
        //gl.viewport(0, 0, cg.w, cg.h);

        gl.drawArrays(gl.POINTS, 0, this.verticesBuffer.length / 2)
    }
}
