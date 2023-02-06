//@ts-check
"use strict";

import { initShaderProgram, createShader } from "./webGLUtils";
import { color } from "d3-color";

/**
 * Everything to easily draw colored squares with webGL.
 * All the same size, but different fill color.
 * The color interpolation is computed in the fragment shader program, by the GPU, thus it is less flexible but faster.
 */
export class WebGLSquareColoringKS {

    //see:
    //https://webglfundamentals.org/
    //https://webglfundamentals.org/webgl/lessons/fr/webgl-shaders-and-glsl.html#les-uniforms-dans-les-shaders-de-vertex
    //https://thebookofshaders.com/glossary/?search=mix
    //https://thebookofshaders.com/06/
    //https://thebookofshaders.com/glossary/


    /**
     * 
     * @param {*} gl 
     * @param {Array.<String>} colors 
     * @param {{fun:string,alpha:number}} stretching 
     * @param {number} sizePix 
     */
    constructor(gl, colors, stretching, sizePix = 10) {

        /** @type {WebGLRenderingContext} */
        this.gl = gl

        /** @type {WebGLShader} */
        const vShader = createShader(gl, gl.VERTEX_SHADER, `
        attribute vec2 pos;
        uniform float sizePix;
        uniform vec3 data[2];
        uniform mat3 mat;

        varying float vt;

        void main() {

            //one vertex for each screen pixels
            //list of data as uniform
            //compute smoothed t here from uniforms

            //compute cell screen position
            gl_Position = vec4(mat * vec3(pos, 1.0), 1.0);

            //set pixel size - same for all
            gl_PointSize = sizePix;

            //pass the pixel value to the fragment as varying
            vt = data[2];
        }
      `);

        //prepare fragment shader code
        //declare the uniform and other variables
        let fshString = `
        precision mediump float;
        varying float vt;
        uniform float alpha;
        uniform vec4 c0;
        uniform vec4 c1;
        uniform vec4 c2;
        uniform vec4 c3;
        uniform vec4 c4;
        void main(void) {
            if(vt == 0.0) return;
            float t = 1.0 - (1.0 / alpha) * log(exp(alpha) * (1.0 - vt) + vt);
            vec4 cI;
            vec4 cF;
            if(t<1.0/4.0) { cI=c0; cF=c1; t=t*4.0; }
            else if(t<2.0/4.0) { cI=c1; cF=c2; t=4.0*t-1.0; }
            else if(t<3.0/4.0) { cI=c2; cF=c3; t=4.0*t-2.0; }
            else { cI=c3; cF=c4; t=4.0*t-3.0; }
            gl_FragColor = mix(cI, cF, t);
        }`

        /** @type {WebGLShader} */
        const fShader = createShader(gl, gl.FRAGMENT_SHADER, fshString);

        /** @type {WebGLProgram} */
        this.program = initShaderProgram(gl, vShader, fShader);
        gl.useProgram(this.program);

        //set uniforms

        //sizePix
        gl.uniform1f(gl.getUniformLocation(this.program, "sizePix"), 1.0 * sizePix);

        //stretching alpha factor
        gl.uniform1f(gl.getUniformLocation(this.program, "alpha"), stretching ? 1.0 * stretching.alpha : 0.0);

        //colors
        for (let i = 0; i < colors.length; i++) {
            const c = color(colors[i])
            gl.uniform4fv(gl.getUniformLocation(this.program, "c" + i), [+c.r / 255.0, +c.g / 255.0, +c.b / 255.0, +c.opacity]);
        }
    }

    /**  */
    draw(verticesBuffer, data, transfoMat) {

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
        /*gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(tBuffer), gl.STATIC_DRAW);
        const t = gl.getAttribLocation(program, "t");
        gl.vertexAttribPointer(t, 1, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(t);*/

        //data
        //gl.uniformMatrix3fv(gl.getUniformLocation(program, "mat"), false, new Float32Array(transfoMat));
        gl.uniform3fv(gl.getUniformLocation(program, "data"), 2, new Float32Array(data));

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
