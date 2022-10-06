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
     * @param {Array.<string>} colors 
     */
    constructor(colors) {

        /** 
         * @type {Array.<string>} */
        this.colors = colors;

        /** Vector shader program
        * @type {string} */
        this.vshString = `
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
        `

        //prepare fragment shader code
        //declare the uniform and other variables
        const out = [];
        out.push("precision mediump float;\nvarying float vi;\n")
        //add color uniforms
        out.push("uniform vec4")
        for (let i = 0; i < colors.length; i++) {
            if (i > 0) out.push(",")
            out.push(" c" + i)
        }
        out.push(";\n")
        //start the main function
        out.push("void main(void) {\n")
        //choose color i
        for (let i = 0; i < colors.length; i++) {
            if (i > 0) out.push("else ")
            out.push("if(vi==")
            out.push(i)
            out.push(".0) gl_FragColor = vec4(c")
            out.push(i)
            out.push("[0], c")
            out.push(i)
            out.push("[1], c")
            out.push(i)
            out.push("[2], c")
            out.push(i)
            out.push("[3]);\n")
        }
        out.push("else gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);\n}")
        /** Fragment shader program
         * @type {string} */
        this.fshString = out.join("")
    }

    /**  */
    draw(gl, verticesBuffer, iBuffer, transfoMat, sizePix = 10) {

        /** @type {WebGLShader} */
        const vShader = createShader(gl, gl.VERTEX_SHADER, this.vshString);

        /** @type {WebGLShader} */
        const fShader = createShader(gl, gl.FRAGMENT_SHADER, this.fshString);

        /** @type {WebGLProgram} */
        const program = initShaderProgram(gl, vShader, fShader);
        gl.useProgram(program);

        //set uniforms

        //sizePix
        gl.uniform1f(gl.getUniformLocation(program, "sizePix"), 1.0 * sizePix);

        //colors
        //gl.uniform4fv(gl.getUniformLocation(this.program, "c0"), [0.3, 0, 0.8, 0.5]);
        //TODO one uniform per color, indexed by i. Possible to use an array of colors?
        for (let i = 0; i < this.colors.length; i++) {
            const c = color(this.colors[i])
            gl.uniform4fv(gl.getUniformLocation(program, "c" + i), [+c.r / 255.0, +c.g / 255.0, +c.b / 255.0, +c.opacity]);
        }

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

        //i data
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
