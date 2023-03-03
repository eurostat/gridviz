//@ts-check
"use strict";

import { initShaderProgram, createShader } from "./webGLUtils";
import { color } from "d3-color";

/**
 * Everything to easily draw colored squares with webGL.
 * All the same size, but different fill color.
 * The color interpolation is computed in the fragment shader program, by the GPU, thus it is less flexible but faster.
 */
export class WebGLSquareColoringAdvanced {

    //see:
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
        uniform mat3 mat;

        attribute float t;
        varying float vt;

        void main() {
          gl_Position = vec4(mat * vec3(pos, 1.0), 1.0);
          gl_PointSize = sizePix;
          vt = t;
        }
      `);

        //prepare fragment shader code
        //declare the uniform and other variables
        let fshString = `
          precision mediump float;
          varying float vt;
          uniform float alpha;`
            + (() => {
                const out = []
                for (let i = 0; i < colors.length; i++)
                    out.push("uniform vec4 c" + i + ";")
                return out.join("")
            })()
            //start the main function, apply the stretching of t
            + `void main(void) {
          `

        if (stretching) {
            if (stretching.fun == "pow")
                //sPow = (t, alpha = 3) => Math.pow(t, alpha);
                fshString += `float t = pow(vt, alpha);`
            else if (stretching.fun == "powRev")
                //sPowRev = (t, alpha = 3) => 1 - Math.pow(1 - t, 1 / alpha);
                fshString += `float t = 1.0-pow(1.0-vt, 1.0/alpha);`
            else if (stretching.fun == "exp")
                //sExp = (t, alpha = 3) => alpha == 0 ? t : (Math.exp(t * alpha) - 1) / (Math.exp(alpha) - 1);
                fshString += stretching.alpha == 0 ? `float t = vt;`
                    : `float t = (exp(vt * alpha) - 1.0) / (exp(alpha) - 1.0);`
            else if (stretching.fun == "expRev")
                //sExpRev = (t, alpha = 3) => alpha == 0 ? t : 1 - (1 / alpha) * Math.log(Math.exp(alpha) * (1 - t) + t);
                fshString += stretching.alpha == 0 ? `float t = vt;`
                    : `float t = 1.0 - (1.0 / alpha) * log(exp(alpha) * (1.0 - vt) + vt);`
            else if (stretching.fun == "circleLow") {
                if (stretching.alpha == 0)
                    //if (alpha == 0) return t;
                    fshString += `float t = vt;`
                else if (stretching.alpha == 1)
                    // if (alpha == 1) return Math.sqrt(2 * t - t * t);
                    fshString += `float t = sqrt(vt * (2.0 - vt));`
                else {
                    //const a = alpha / (1 - alpha);
                    //return Math.sqrt(1 / (a * a) + t * (2 / a + 2 - t)) - 1 / a;
                    fshString += `float a = alpha / (1.0 - alpha);
                    float t = sqrt(1.0 / (a * a) + vt * ( 2.0/a + 2.0 - vt )) - 1.0 / a;`
                }
            } else if (stretching.fun == "circleHigh") {
                // 1 - sCircleLow(1 - t, alpha)
                if (stretching.alpha == 0)
                    //if (alpha == 0) return t;
                    fshString += `float t = vt;`
                else if (stretching.alpha == 1)
                    // if (alpha == 1) return Math.sqrt(2 * t - t * t);
                    fshString += `float t = 1.0 - sqrt((1.0 - vt) * (1.0 + vt));`
                else {
                    //const a = alpha / (1 - alpha);
                    //return Math.sqrt(1 / (a * a) + (2 * t) / a + 2 * t - t * t) - 1 / a;
                    fshString += `float a = alpha / (1.0 - alpha);
                    float t = 1.0 - sqrt(1.0 / (a * a) + (1.0-vt) * ( 2.0/a + 1.0 + vt )) + 1.0 / a;`
                }
            }
            else {
                console.error("Unexpected stretching function code: " + stretching.fun)
                fshString += `float t = vt;`
            }
        } else {
            fshString += `float t = vt;`
        }

        //choose initial and final colors, and adjust t value
        if (colors.length == 1)
            fshString += `
                 vec4 cI=c0;
                 vec4 cF=c0;`
        else if (colors.length == 2)
            fshString += `
                 vec4 cI=c0;
                 vec4 cF=c1;`
        else {
            const nb = colors.length - 1
            const nbs = nb + ".0"
            fshString += `
                vec4 cI;
                vec4 cF;
                if(t<1.0/`+ nbs + `) { cI=c0; cF=c1; t=t*` + nbs + `; }`
            for (let i = 2; i < nb; i++)
                fshString += `else if(t<` + i + `.0/` + nbs + `) { cI=c` + (i - 1) + `; cF=c` + i + `; t=` + nbs + `*t-` + (i - 1) + `.0; }`
            fshString += `else { cI=c` + (nb - 1) + `; cF=c` + nb + `; t=` + nbs + `*t-` + (nb - 1) + `.0; }`
        }

        //one single color
        if (colors.length == 1)
            fshString += `gl_FragColor = vec4(c0[0], c0[1], c0[2], c0[3]);}`
        //set interpolated color, between initial and final one
        else
            fshString += `gl_FragColor = mix(cI, cF, t);}`

        /** @type {WebGLShader} */
        const fShader = createShader(gl, gl.FRAGMENT_SHADER, fshString);

        /** @type {WebGLProgram} */
        this.program = initShaderProgram(gl, vShader, fShader);
        gl.useProgram(this.program);

        //set uniforms

        //sizePix
        //TODO: bug here. Seems to be limited to some threshold value (around 250).
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
    draw(verticesBuffer, tBuffer, transfoMat) {

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
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(tBuffer), gl.STATIC_DRAW);
        const t = gl.getAttribLocation(program, "t");
        gl.vertexAttribPointer(t, 1, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(t);

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
