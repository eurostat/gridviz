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
        const cv2 = document.createElement("canvas");
        cv2.setAttribute("width", cg.w);
        cv2.setAttribute("height", cg.h);
        const gl = cv2.getContext("webgl");
        if (!gl) {
            console.error(gl, "Unable to initialize WebGL. Your browser or machine may not support it.");
            return
        }



        const p = initShaderProgram(
            gl,
            createShader(gl, gl.VERTEX_SHADER, `
            attribute vec2 pos;
            attribute vec3 color;
            varying vec3 vColor;
            void main() {
              gl_Position = vec4(pos, 1, 1);
              vColor = color;
            }
          `),
            createShader(gl, gl.FRAGMENT_SHADER, `
            precision mediump float;
            varying vec3 vColor;
            void main(void) {
               gl_FragColor = vec4(vColor, 0.5);
            }`)
        );
        gl.useProgram(p);




        const drawRects = function (program, v, c) {

            //vertice data
            gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(v), gl.STATIC_DRAW);
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

            //color data
            gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(c), gl.STATIC_DRAW);
            var color = gl.getAttribLocation(program, "color");
            gl.vertexAttribPointer(color, 3, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(color);

            for (let i = 0; i < v.length / 8; i++) {
                gl.drawArrays(
                    gl.TRIANGLE_STRIP, // mode,see https://miro.medium.com/max/700/0*HQHB5lCGqlOUiysy.jpg
                    i * 8, // vertex list start
                    4 // vertex count
                );
            }


        }



        //create random vertices
        const v = []
        const cols = []
        for (let c of cells) {

            let x1 = cg.geoToPixX(c.x)
            x1 = x1/cg.w * 2 -1
            let y1 = cg.geoToPixY(c.y)
            y1 = -y1/cg.h * 2 +1

            const x2 = x1 + 0.005
            const y2 = y1 + 0.01

            v.push(x1); v.push(y1)
            v.push(x2); v.push(y1)
            v.push(x1); v.push(y2)
            v.push(x2); v.push(y2)

            //colors, 3 parts (RGB), one per vertice
            const randR = Math.random()
            const randG = Math.random()
            const randB = Math.random()
            cols.push(randR); cols.push(randG); cols.push(randB)
            cols.push(randR); cols.push(randG); cols.push(randB)
            cols.push(randR); cols.push(randG); cols.push(randB)
            cols.push(randR); cols.push(randG); cols.push(randB)
        }

        //setColor(p, 1, 0.1, 0.4, 0.8)
        //draw all rectangles
        drawRects(p, v, cols)


        //...
        //draw in correct position
        //compute as much as possible in GPU:
        //- compute geoToScreen in vector shader
        //- compute value to color in fragment shader

        //generic functions to draw rectangles + lines with width
        //use webGL mode in relevant styles



        //draw in canvas geo
        cg.initCanvasTransform()
        cg.ctx.drawImage(cv2, 0, 0);

    }

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
