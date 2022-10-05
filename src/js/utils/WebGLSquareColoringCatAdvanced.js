//@ts-check

import { initShaderProgram, createShader } from "./webGLUtils";
import { color } from "d3-color";

/**
 * Everything to easily draw colored squares with webGL.
 * All the same size, but different fill color.
 * Color based on categories.
 */
export class WebGLSquareColoringCatAdvanced {

    /**
     * 
     * @param {*} gl 
     * @param {Array.<string>} colors 
     * @param {number} sizePix 
     */
    constructor(gl, colors, sizePix = 10) {

        /** @type {WebGLRenderingContext} */
        this.gl = gl

        /** @type {WebGLShader} */
        const vShader = createShader(gl, gl.VERTEX_SHADER, `
        attribute vec2 pos;
        uniform float sizePix;
        uniform mat3 mat;

        attribute float i;
        varying float vi;

        void main() {
          gl_Position = vec4(mat * vec3(pos, 1.0), 1.0);
          gl_PointSize = sizePix;
          vi = i;
        }
      `);

        //prepare fragment shader code
        //declare the uniform and other variables
        let fshString = `
          precision mediump float;
          varying float vi;`
            /*+ (() => {
                const out = []
                for (let i = 0; i < colors.length; i++)
                    out.push("uniform vec4 c" + i + ";")
                return out.join("")
            })()*/
            //start the main function, apply the stretching of t
            + `void main(void) {`
        fshString += `float i = vi;`
        //TODO choose color i
        //fshString += `gl_FragColor = vec4(c0[0], c0[1], c0[2], c0[3]);}`
        fshString += `gl_FragColor = vec4(0.1, 0.9, 0.2, 0.6);}`

        /** @type {WebGLShader} */
        const fShader = createShader(gl, gl.FRAGMENT_SHADER, fshString);

        /** @type {WebGLProgram} */
        this.program = initShaderProgram(gl, vShader, fShader);
        gl.useProgram(this.program);

        //set uniforms

        //sizePix
        gl.uniform1f(gl.getUniformLocation(this.program, "sizePix"), 1.0 * sizePix);

        //colors
        //gl.uniform4fv(gl.getUniformLocation(this.program, "c0"), [0.3, 0, 0.8, 0.5]);
        //TODO one uniform per color, indexed by i. Possible to use an array of colors?
        /*for (let i = 0; i < colors.length; i++) {
            const c = color(colors[i])
            gl.uniform4fv(gl.getUniformLocation(this.program, "c" + i), [+c.r / 255.0, +c.g / 255.0, +c.b / 255.0, +c.opacity]);
        }*/
    }

    /**  */
    draw(verticesBuffer, iBuffer, transfoMat) {

        const gl = this.gl
        const program = this.program

        //vertice data
        gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verticesBuffer), gl.STATIC_DRAW);
        const position = gl.getAttribLocation(program, "pos");
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
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(iBuffer), gl.STATIC_DRAW);
        const i = gl.getAttribLocation(program, "i");
        gl.vertexAttribPointer(i, 1, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(i);

        //transformation
        gl.uniformMatrix3fv(gl.getUniformLocation(program, "mat"), false, new Float32Array(transfoMat));

        // Enable the depth test
        //gl.enable(gl.DEPTH_TEST);
        // Clear the color buffer bit
        gl.clear(gl.COLOR_BUFFER_BIT);
        // Set the view port
        //gl.viewport(0, 0, cg.w, cg.h);

        gl.drawArrays(gl.POINTS, 0, verticesBuffer.length / 2)
    }

}
