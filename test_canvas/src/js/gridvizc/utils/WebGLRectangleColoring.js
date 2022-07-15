//@ts-check

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
