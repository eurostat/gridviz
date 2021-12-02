// this file contains the logic for creating and updating threejs point layers (three.Points())
import {Points,Color,Float32BufferAttribute,BufferGeometry,ShaderMaterial,} from "three";
import * as CONSTANTS from "../constants.js";

/**
 * @description Returns a Three.Points object of square geometries
 * @export Three.Points
 * @class SquaresLayer
 */
export class SquaresLayer {
 
    /**
      * @param {Array<Cell>} cells
      * @param {String} colorField
      * @param {Function} colorFunction
      * @param {number} cellSize optional
      * @param {string} sizeField optional
      * @param {Function} sizeFunction optional
      */
    constructor(cells, colorField, colorFunction, cellSize, sizeField, sizeFunction) {

        this.bufferGeometry = new BufferGeometry();
        this.cells = cells;
        this.colorField = colorField;
        this.colorFunction = colorFunction;
        this.cellSize = cellSize;
        this.sizeField = sizeField;
        this.sizeFunction = sizeFunction;

        this.colors = [];
        this.positions = [];
        this.sizes = [];
        this.pointsLayer = undefined; // three.js Points object
        this.pointsMaterial = undefined; // three.js ShaderMaterial

        for (var i = 0; i < cells.length; i++) {
            // Set vector coordinates from data
            let coords = [
                cells[i].x,
                cells[i].y
            ];
            let x = parseFloat(coords[0]);
            let y = parseFloat(coords[1]);
            let z = CONSTANTS.point_z;
            let stat = cells[i][colorField];
            let hex = getCellColor(colorFunction, stat);
            cells[i].color = hex; //save for tooltip
            let color = new Color(hex);

            if (!isNaN(x) && !isNaN(y)) {
                this.positions.push(x, y, z);
                if (!isNaN(color.r) && !isNaN(color.g) && !isNaN(color.b)) {
                    this.colors.push(color.r, color.g, color.b);
                } else {
                    let blk = new Color("#000");
                    this.colors.push(blk.r, blk.g, blk.b)
                }
                if (sizeField) {
                    this.sizes.push(sizeFunction(cells[i][sizeField]));
                } else {
                    this.sizes.push(cellSize);
                }
            }
        }

        //set positions
        this.bufferGeometry.setAttribute("position",new Float32BufferAttribute(this.positions, 3));
        //set colors
        this.bufferGeometry.setAttribute("color",new Float32BufferAttribute(this.colors, 3));
        //set sizes
        this.bufferGeometry.setAttribute("size", new Float32BufferAttribute(this.sizes, 1));

        this.bufferGeometry.computeBoundingSphere();
        //create or reuse app.pointsLayer Material
        if (!this.pointsMaterial) {
            // Apply custom point sizes, instead of using three.js pointsMaterial
            this.pointsMaterial = new ShaderMaterial({
                uniforms: {
                    multiplier: {
                        value: 1000 //km TODO: define dynamically. This value needs to be adjusted according to screen in order prevent screen flickering when zooming
                    }
                },
                fragmentShader: fragmentShader(),
                vertexShader: vertexShader(),
                vertexColors: true
            });

            //use threejs PointsMaterial instead:
            // pointsMaterial = new PointsMaterial({
            //   size: pointSize * 2, // when using three.js attenuation we have to multiply the cellSize by 2
            //   sizeAttenuation: true,
            //   //https://github.com/mrdoob/three.js/blob/master/src/constants.js
            //   vertexColors: THREE.VertexColors
            // });

        } else {
            this.pointsMaterial.size = cellSize;
        }

        //create or overwrite this.pointsLayer object
        this.pointsLayer = new Points(this.bufferGeometry, this.pointsMaterial);
        this.pointsLayer.renderOrder = 1; //bottom

        return this.pointsLayer
    }

}

/**
* @description WebGL - Shader stage that will process a Fragment generated by the Rasterization into a set of colors and a single depth value
* @function fragmentShader
*/
function fragmentShader() {
    return `
      varying vec3 vColor;
    
      void main() {
        gl_FragColor = vec4( vColor.rgb, 1.0 );
      }
    `;
}

/**
* @description WebGL - shader stage in the rendering pipeline that handles the processing of individual vertices
* @function vertexShader
*/
function vertexShader() {
    return `
      uniform float multiplier;
      attribute float size;
      float scale;
      varying vec3 vColor;
    
      void main() {
        vColor = color;
    
        // mvPosition represents the vertex position in view space (model-view-position). It’s usually calculated like so:
        vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
    
        // manual 'point attenuation' attempt because threejs attenuation doesnt coincide with real world cellSize 
        // (e.g. 1000 for 1km grid leaves space between cells)...
        // this method works well on mobile & desktop, but not when appending the renderer to a container
        gl_PointSize = size * (multiplier / -mvPosition.z ); 
    
        // threejs attenuation (attenuation: true in pointer material)...
        // does this: gl_PointSize *= ( scale / - mvPosition.z );
        // works well in containers & desktop, but not mobile
        // gl_PointSize = size;
    
        //set position:
        gl_Position = projectionMatrix * mvPosition;
      }
    `;
}

function getCellColor(colorScaleFunction, value) {
    let hex = colorScaleFunction(parseFloat(value)); //d3 scale-chromatic
    if (hex == "rgb(NaN, NaN, NaN)") {
        hex = "#000"; //fallback to black
    }
    return hex;
}

/**
 * @description rebuilds array which stores point sizes
 * @function updatePointsSizes
 */
export function updatePointsSizes(app, cells) {
    let sizes = [];
    for (var i = 0; i < cells.length; i++) {
        if (sizeField && sizeField !== "null") {
            sizes.push(app.sizeScaleFunction_(cells[i][sizeField]));
        } else {
            sizes.push(app._currentResolution);
        }
    }
    //update sizes
    app.pointsGeometry.setAttribute("size", new Float32BufferAttribute(sizes, 1));
    app.pointsGeometry.computeBoundingSphere();
    app.pointsLayer.geometry = app.pointsGeometry;
}

/**
* @description rebuilds array of point colours
* @function updatePointsColors
*/
export function updatePointsColors(app, grid, cells) {
    let colors = [];
    for (var i = 0; i < cells.length; i++) {
        let hex = app.colorScaleFunction_(cells[i][colorField]); //d3 scale-chromatic
        if (hex == "rgb(NaN, NaN, NaN)") {
            hex = "#000"; //fallback to black
        }
        cells[i].color = hex; //for tooltip
        let color = new Color(hex);
        if (color) colors.push(color.r, color.g, color.b);
    }
    //update colors
    app.pointsGeometry.setAttribute(
        "color",
        new Float32BufferAttribute(colors, 3)
    );
    app.pointsGeometry.computeBoundingSphere();
    app.pointsLayer.geometry = app.pointsGeometry;
}


