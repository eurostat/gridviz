//@ts-check

import { Style } from "../Style"
import { makeWebGLCanvas } from "../utils/webGLUtils";
import { WebGLRectangleColoring } from "../utils/WebGLRectangleColoring";


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
        const cvWGL = makeWebGLCanvas(cg)
        if (!cvWGL) return

        const p = new WebGLRectangleColoring(cvWGL.gl)

        //create vertice and fragment data
        for (let c of cells) {
            p.addRectangleData(c.x, c.x + r, c.y, c.y + r, 1, Math.random(), Math.random())
        }

        //draw
        p.draw(cg.getWebGLTransform())

        //draw in canvas geo
        cg.initCanvasTransform()
        cg.ctx.drawImage(cvWGL.canvas, 0, 0);
    }

}
