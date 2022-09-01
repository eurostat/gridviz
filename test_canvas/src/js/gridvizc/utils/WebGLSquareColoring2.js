//@ts-check

import { initShaderProgram, createShader } from "./webGLUtils";
import { color } from "d3-color";

/**
 */
export class WebGLSquareColoring2 {

    /**  */
    constructor(gl, colors, deformationFactor = 1, sizePix = 10) {

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

        let fshString = `
          precision mediump float;
          varying float vt;
          uniform float deformationFactor;`
            + (() => {
                const out = []
                for (let i = 0; i < colors.length; i++)
                    out.push("uniform vec4 c" + i + ";")
                return out.join("")
            })()
            + `void main(void) {
          float t = pow(vt, deformationFactor);`

        if (colors.length == 2)
            fshString += `
                 vec4 cI=c0;
                 vec4 cF=c1;`
        else if (colors.length == 3)
            fshString += `
                 vec4 cI;
                 vec4 cF;
                 if(t<0.5) { cI=c0; cF=c1; t=t*2.0; }
                 else { cI=c1; cF=c2; t=(t-0.5)*2.0; }`
        else if (colors.length == 4)
            fshString += `
                     vec4 cI;
                     vec4 cF;
                     if(t<1.0/3.0) { cI=c0; cF=c1; t=t*3.0; }
                     else if(t<2.0/3.0) { cI=c1; cF=c2; t=(t-1.0/3.0)*3.0; }
                     else { cI=c2; cF=c3; t=(t-2.0/3.0)*3.0; }`
        else if (colors.length == 5)
            fshString += `
                    vec4 cI;
                    vec4 cF;
                    if(t<0.25) { cI=c0; cF=c1; t=t*4.0; }
                    else if(t<0.5) { cI=c1; cF=c2; t=(t-0.25)*4.0; }
                    else if(t<0.75) { cI=c2; cF=c3; t=(t-0.5)*4.0; }
                    else { cI=c3; cF=c4; t=(t-0.75)*4.0; }`

        if (colors.length == 1)
            fshString += `gl_FragColor = vec4(c0[0], c0[1], c0[2], c0[3]);}`
        else if (colors.length <= 5)
            fshString += `gl_FragColor = mix(cI, cF, t);}`
            /*fshString += `
                gl_FragColor = vec4(
                   cI[0]*(1.0-t)+t*cF[0],
                   cI[1]*(1.0-t)+t*cF[1],
                   cI[2]*(1.0-t)+t*cF[2],
                   cI[3]*(1.0-t)+t*cF[3]);
               }`*/
        else
            fshString += `gl_FragColor = vec4(0.5, 0.5, 0.5, 1.0);}`

        /** @type {WebGLShader} */
        const fShader = createShader(gl, gl.FRAGMENT_SHADER, fshString);

        //see https://webglfundamentals.org/webgl/lessons/fr/webgl-shaders-and-glsl.html#les-uniforms-dans-les-shaders-de-vertex

        /** @type {WebGLProgram} */
        this.program = initShaderProgram(gl, vShader, fShader);
        gl.useProgram(this.program);

        //set uniforms

        //sizePix
        gl.uniform1f(gl.getUniformLocation(this.program, "sizePix"), 1.0 * sizePix);

        //deformation factor
        gl.uniform1f(gl.getUniformLocation(this.program, "deformationFactor"), 1.0 * deformationFactor);

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
