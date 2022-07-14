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


        cg.initCanvasTransform()
        cg.ctx.fillStyle = "red";
        cg.ctx.fillRect(200, 200, 100, 200);
        cg.ctx.fillStyle = "green";
        cg.ctx.fillRect(300, 10, 60, 100);



        const cv = document.createElement("canvas");
        //var newElem = document.createElementNS(d3.ns.prefix.svg, tagname);
        cv.setAttribute("width", cg.w);
        cv.setAttribute("height", cg.h);
        //console.log(cg.canvas)
        //console.log(cv)

        const ctx = cv.getContext("2d");

        //console.log(cg.ctx)
        //console.log(ctx)

        ctx.fillStyle = "blue";
        ctx.fillRect(400, 60, 160, 150);

        cg.ctx.drawImage(cv, 0, 0);




        //2
        //same but draw with webGL


        //...
        //draw several objects
        //draw in correct position
        //compute as much as possible in GPU:
        //compute geoToScreen in vector shader
        //compute value to color in fragment shader

        //generic functions to draw rectangles + lines with width
        //use webGL mode in relevant styles
    }

}
