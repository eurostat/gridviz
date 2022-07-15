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



        //make program
        const p = initShaderProgram(
            gl,
            createShader(gl, gl.VERTEX_SHADER, `
            attribute vec4 pos;
            //attribute vec4 vertexColor;
            //uniform mat4 uModelViewMatrix;
            //uniform mat4 uProjectionMatrix;
            void main() {
              gl_Position = /*uProjectionMatrix **/ /**uModelViewMatrix **/ pos;
              //color = vertexColor;
            }
          `),
            createShader(gl, gl.FRAGMENT_SHADER, `
            precision mediump float;
            uniform vec4 color;
            //varying lowp vec4 color;
            void main() {
                gl_FragColor = color;
            }`)
        );
        gl.useProgram(p);




        /*
 
Vertex Shader Code:

attribute vec4 vertexPosition;
attribute vec3 vertexColor;
uniform mat4 mvpMatrix;
varying highp vec3 color;
 
void main() {
  gl_Position = mvpMatrix * vertexPosition;
  color = vertexColor;
}
 
Fragment Shader Code:
 
varying lowp vec3 color;
void main() {
  gl_FragColor = vec4(color, 1);
}
*/


        const drawRects = function (program, v, c) {

            //define input vertices
            const vertices = new Float32Array(v);

            const positionBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
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




            //define vertex colors
            /*const colors = new Float32Array(c);

            const colorBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, colors, gl.STATIC_DRAW);
            const vertexColor = gl.getAttribLocation(program, "vertexColor");*/
            /*gl.vertexAttribPointer(
                vertexColor,
                2, //numComponents
                gl.FLOAT, //type
                false, //normalise
                0, //stride
                0 //offset
            );
            gl.enableVertexAttribArray(vertexColor);*/






            // Draw the scene
            //gl.clearColor(0.3, 0.3, 0.0, 1.0);
            //gl.clearDepth(1.0); // Clear everything
            //gl.enable(gl.DEPTH_TEST); // Enable depth testing
            //gl.depthFunc(gl.LEQUAL); // Near things obscure far things
            // Clear the canvas before we start drawing on it.
            //gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

            for (let i = 0; i < v.length / 8; i++) {
                gl.drawArrays(
                    gl.TRIANGLE_STRIP, // mode,see https://miro.medium.com/max/700/0*HQHB5lCGqlOUiysy.jpg
                    i * 8, // vertex list start
                    4 // vertex count
                );
            }


        }



        const setColor = function (program, r, g, b, a) {
            // Shader uniform variable for color (read-only)
            const color = gl.getUniformLocation(program, "color");

            // Set color        R  G  B  A
            gl.uniform4f(color, r, g, b, a);
        }



        //setColor(p, 0.5, 0.3, 1, 0.6)
        //drawRect(p, 0, 0.1, 0.3, 0.3)
        //setColor(p, 1, 0.1, 0.4, 0.8)
        //drawRect(p, -0.2, -0.9, 0.9, 0)

        //set random color
        //setColor(p, Math.random(), Math.random(), Math.random(), 1)

        console.log(cells.length)

        //create random vertices
        const v = []
        for (let i = 0; i < cells.length; i++) {
            //random position
            const x1 = 2 * Math.random() - 1
            const y1 = 2 * Math.random() - 1
            const x2 = x1 + 0.005
            const y2 = y1 + 0.01

            v.push(x1); v.push(y1)
            v.push(x2); v.push(y1)
            v.push(x1); v.push(y2)
            v.push(x2); v.push(y2)
        }

        setColor(p, 1, 0.1, 0.4, 0.8)
        //draw all rectangles
        drawRects(p, v)


        //for(let c of cells) {
        //get coords
        //}


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
