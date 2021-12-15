//@ts-check
/** @typedef {{ colorFunction: Function, sizeFunction: Function, shapeFunction: Function, opacity:Number, strokeWidth: Number, strokeColor:String }} ColorSizeShapeStyleConfig */

import { Style } from "../Style"
import { Cell } from "../Dataset"
import { Viewer } from "../viewer/viewer";
import * as CONSTANTS from "../constants.js";
import { Points, Color, Float32BufferAttribute, BufferGeometry, ShaderMaterial, } from "three";
import * as Utils from "../utils/utils";

// TODO: for each attribute that is the same value for ALL cells: send a Uniform to the GPU instead of an attribute array

/**
 * A very generic style that shows grid cells with specific color, size and shape.
 * It can be used to show variables as cell colors, cell size, cell shape, or any combination of the three visual variables.
 * 
 * @author Julien Gaffuri
 */
export class ColorSizeShapeStyle extends Style {

    /**
      * @constructor
      * @param {ColorSizeShapeStyleConfig} opts A configuration object for a color-size-shape style.
      */
    constructor(opts) {
        super()

        /** @type {function} */
        this.colorFunction = opts.colorFunction || null;

        /** @type {function} */
        this.sizeFunction = opts.sizeFunction || null;

        /** @type {function} */
        this.shapeFunction = opts.shapeFunction || null;

        /** @type {Number} */
        this.opacity = opts.opacity || 1;

        /** @type {Number} */
        this.strokeWidth = opts.strokeWidth || 0;

        /** @type {String} */
        this.strokeColor = opts.strokeColor || 'black';

        /** @type {Array<Cell>} */
        this.cells = []; // cells displayed by the style

        /** @type {Points} */
        this.threejsObject = undefined; // threejs Object3D
    }


    /**
     * Draw cells as squares, with various colors and size.
     * 
     * @param {Array.<Cell>} cells 
     * @param {number} resolution 
     * @param {Viewer} viewer 
     */
    draw(cells, resolution, viewer) {
        //save cells to style for tooltip
        this.cells = cells;
        let bufferGeometry = new BufferGeometry(); // new buffer for each draw

        // bufferGeometry attribute arrays
        let colors = [];
        let positions = [];
        let sizes = [];
        let shapes = [];

        //if size is used, sort cells by size so that the biggest are drawn first
        if (this.sizeFunction)
            cells.sort((c1, c2) => (this.sizeFunction(c2) - this.sizeFunction(c1)));

        for (let cell of cells) {

            //position
            positions.push(cell.x, cell.y, CONSTANTS.point_z);

            //color
            let colorString = this.colorFunction ? this.colorFunction(cell) : "#EA6BAC";
            let c = new Color(colorString);
            colors.push(c.r, c.g, c.b);
            cell.color = colorString; //save for tooltip

            //size - in ground meters. TODO: use a uniform in pointsMaterial if all cells have same size to optimize memory usage
            sizes.push(this.sizeFunction ? this.sizeFunction(cell) : resolution);

            //shape
            const shape = this.shapeFunction ? this.shapeFunction(cell) : 'square';
            if (shape == "square") shapes.push(2);
            else if (shape == "circle") shapes.push(1);
            else throw new Error('Unexpected shape:' + shape);

        }

        if (!this.pointsMaterial) {
            this.pointsMaterial = new ShaderMaterial({
                transparent: true,
                uniforms: {
                    //uniforms are constants sent to shaders
                    multiplier: {
                        value: 1000 //km TODO: define dynamically.
                    },
                    strokeWidth: {
                        value: this.strokeWidth
                    },
                    strokeColor: {
                        value: new Color(this.strokeColor)
                    },
                    opacity: {
                        value: this.opacity
                    }
                },
                fragmentShader: this.fragmentShader(),
                vertexShader: this.vertexShader(),
                vertexColors: true
            });
        }

        //set positions
        bufferGeometry.setAttribute("position", new Float32BufferAttribute(positions, 3));
        //set colors
        bufferGeometry.setAttribute("color", new Float32BufferAttribute(colors, 3));
        //set sizes
        bufferGeometry.setAttribute("size", new Float32BufferAttribute(sizes, 1));
        //set shapes
        bufferGeometry.setAttribute("shape", new Float32BufferAttribute(shapes, 1));

        // create layer if new
        if (!this.threejsObject) {
            this.threejsObject = new Points(bufferGeometry, this.pointsMaterial);
            this.threejsObject.renderOrder = 1; //bottom
            viewer.scene.add(this.threejsObject);
        } else {
            // else update its existing attributes
            this.threejsObject.geometry = bufferGeometry;
        }
    }

    
    // This is where the magicical chaos happens...

    /**
    * @description WebGL - Shader stage that will process a Fragment generated by the Rasterization into a set of colors and a single depth value
    * @function fragmentShader
    *  @description This fragment shader decides whether to render a cell as a square or a circle and applies a border stroke if applicable
    *  Read https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/WebGL_best_practices
    *  frag shaders dont like ifelse statements so we use vShape float to determine pixel discarding for circles (1.0 creates a circle and 2.0 maintains a square)
    *  Discard should be avoided. It's better to set the alpha to 0 for pixels outside of the desired area. (https://stackoverflow.com/questions/18425201/three-js-webgl-draw-a-circle-custom-fill-and-border-color-from-shader)
    */
    fragmentShader() {
        return `
        uniform vec3 strokeColor;
        uniform float strokeWidth;
        uniform float opacity;

        varying vec3 vColor;
        varying float vShape;
        varying vec2 vUV; // texture coordinates

            void main() {
                
                float r = 0.0, alpha = opacity, delta = 0.0;
                
                if (vShape > 1.0) {
                    // square

                    gl_FragColor = vec4(vColor.rgb, opacity);


                } else if (vShape < 2.0) { 
                    // circle

                    //radius
                    vec2 cxy = 2.0 * gl_PointCoord - 1.0;
                    r = dot(cxy, cxy);

                    // distance from texCoords to 0.5,0.5
                    float d = distance(vUV, vec2(.5, .5));

                    // outside radius
                    if (d<r) gl_FragColor = vec4(0.0,0.0,0.0,0.0);

                    // inside stroke area
                    else if (d < r + strokeWidth) gl_FragColor = vec4(strokeColor.rgb, opacity);

                    //inside radius
                    else gl_FragColor = vec4(vColor.rgb, opacity);

                }                
            }
        `;
    }


    /**
    * @description WebGL - shader stage in the rendering pipeline that handles the processing of individual vertices
    * @function vertexShader
    */
    vertexShader() {
        return `
      uniform float multiplier;
      uniform float opacity; //for fragment shader
      uniform float strokeWidth; //for fragment shader
      uniform vec3 strokeColor; //for fragment shader

      attribute float size;
      attribute float shape;

      float scale;
      varying vec3 vColor;
      varying float vShape;
      varying vec2 vUV;
      
      void main() {
        // pass variables with v prefix to fragment shader
        vColor = color;
        vShape = shape;
        vUV = uv;

        // mvPosition represents the vertex position in view space (model-view-position). It’s usually calculated like so:
        vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
    
        // manual 'point attenuation' because threejs attenuation doesnt coincide with real world cellSize 
        // (e.g. 1000 for 1km grid leaves space between cells)...
        // this method works well on mobile & desktop, but not when appending the renderer to a container

        if (shape < 2.0) gl_PointSize = (size * (multiplier / -mvPosition.z ))*1.5; //adjust for circles
        else gl_PointSize = size * (multiplier / -mvPosition.z ); 
        
    
        // threejs attenuation (when {attenuation: true} in pointer material)...
        // does this: gl_PointSize *= ( scale / - mvPosition.z );
        // works well in containers & desktop, but not mobile
        // gl_PointSize = size;
    
        //set position:
        gl_Position = projectionMatrix * mvPosition;
      }
    `;
    }
}

// TODO: allow user to use cuboid as a shape using following function (for 3d visualizations)
// for each cell:
// let bars = new Object3D();
// const bar = getBar(x, y, cellSize, cellSize, height, color);
// bar.lookAt(new Vector3(x, y, 0.0001));
// bars.add(bar);
// function getBar(x, y, width, length, height, color) {
//     const geometry = new BoxBufferGeometry(width, length, height);
//     const material = new MeshBasicMaterial({ color: color });
//     const bar = new Mesh(geometry, material);

//     // const phi = (90 - lat) * Math.PI / 180;
//     // const theta = (180 - lng) * Math.PI / 180;

//     // bar.position.x = radius * Math.sin(phi) * Math.cos(theta);
//     // bar.position.y = radius * Math.cos(phi);
//     // bar.position.z = radius * Math.sin(phi) * Math.sin(theta);

//     bar.position.x = x;
//     bar.position.y = y;
//     bar.position.z = 0.001 + (height / 2);

//     return bar;
// }
