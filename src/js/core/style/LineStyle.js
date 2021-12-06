//@ts-check

import { Style } from "../Style"
import { Cell } from "../Dataset"
import { Viewer } from "../viewer/viewer";
import { Color, Group, LineBasicMaterial, Line, BufferGeometry, Vector3, Float32BufferAttribute, Object3D, Material } from "three";
import { LineMaterial } from "../../lib/threejs/lines/LineMaterial";
import { Line2 } from "../../lib/threejs/lines/Line2";
import { LineGeometry } from "../../lib/threejs/lines/LineGeometry";


/**
 * 
 * @author Julien Gaffuri
 */
export class LineStyle extends Style {

    /**
      * @param {function} height A function returning the height of a cell (in geographical unit).
      */
    constructor(height) {
        super()

        /** @type {function} */
        this.height = height;

        /** 
         * @type {number} 
         * used in drawLine() to determine if the user has used the default or not
        */
        this.defaultLineWidth = 0.001;

        /** @type {string} */
        this.lineColor_ = "grey"
        /** @type {number} */
        this.lineWidth_ = this.defaultLineWidth;
        /** @type {string} */
        this.fillColor_ = "rgba(192, 140, 89, 0.4)"
        /** @type {number} */
        this.lineZ = 0.001;
        /** @type {Object3D} */
        this.threejsObject = null;
        
        /** @type {Material} */
        this.lineMaterial = new LineBasicMaterial({
            linewidth: this.lineWidth_,
            vertexColors: true,
            //opacity: 1
            //color: this.lineColor_ - use color attribute in Geometry object instead
        }); 

    }


    /**
     * Draw cells as squares depending on their value.
     * 
     * @param {Array.<Cell>} cells 
     * @param {number} r 
     * @param {Viewer} viewer 
     */
    draw(cells, r, viewer) {

        // hex to be used in threejs
        let lineC = new Color(this.lineColor_);
        let backgroundC = new Color(viewer.backgroundColor);

        if (this.threejsObject) {
            // clear existing layer
            this.threejsObject.clear();
        } else {
            // add layer to threejs scene
            this.threejsObject = new Group();
            this.threejsObject.renderOrder = 1; //bottom
            viewer.scene.add(this.threejsObject);
        }

        //index cells by y and x
        const ind = {};
        for (const cell of cells) {
            let row = ind[cell.y];
            if (!row) { row = {}; ind[cell.y] = row }
            row[cell.x] = +this.height(cell);
        }

        //compute extent
        const e = viewer.extGeo;
        const xMin = Math.floor(e.xMin / r) * r;
        const xMax = Math.floor(e.xMax / r) * r;
        const yMin = Math.floor(e.yMin / r) * r;
        const yMax = Math.floor(e.yMax / r) * r;

        //draw lines row by row, stating from the top
        for (let y = yMax; y >= yMin; y -= r) {

            //get row
            const row = ind[y]
            if (!row) continue;

            let coords = []; //vertices positions
            let colors = []; //vertices colors

            //place first point
            coords.push((xMin - r / 2), y, this.lineZ);

            // we hide the segments of the line with no data by setting their color to the same colour as the viewer background. 
            // This is a LOT more efficient (in webgl) than creating a new geometry object.
            colors.push(backgroundC.r, backgroundC.g, backgroundC.b);

            //store the previous height
            let hG_ = 0;

            for (let x = xMin; x <= xMax; x += r) {

                //get column value
                let hG = row[x];
                if (!hG) hG = 0;

                if (hG || hG_) {
                    // segments where both values are non-null

                    //push xyz to buffer
                    coords.push((x + r / 2), y + hG, this.lineZ)
                    //push rgb to buffer
                    colors.push(lineC.r, lineC.g, lineC.b);

                } else {
                    // areas with no data

                    //push xyz to buffer
                    coords.push((x + r / 2), y, this.lineZ)
                    // hide this segment
                    colors.push(backgroundC.r, backgroundC.g, backgroundC.b);
                }
                //store the previous value
                hG_ = hG;
            }

            //last point
            if (hG_) {
                //cg.ctx.lineTo(cg.geoToPixX(xMax + r / 2), yP);
                coords.push((xMax + r / 2), y, this.lineZ)
                colors.push(lineC.r, lineC.g, lineC.b);
            }


            //draw fill
            // if (this.fillColor_)
            //     cg.ctx.fill()

            //draw line
            this.drawLine(coords, colors)
        }
    }

    drawLine(coords, colors) {
        if (this.lineColor_ && this.lineWidth_ > 0 && coords.length > 0) {

            // line width is complicated in webGL (see https://threejs.org/docs/?q=line#api/en/materials/LineBasicMaterial.linewidth)
            // therefore a workaround (Line2) is needed if the user wants a different line thickness
            let line; 
            if (this.lineWidth_ !== this.defaultLineWidth) {
                this.lineMaterial = new LineMaterial({
                    //color: this.lineColor_, 
                    linewidth: this.lineWidth_, 
                    vertexColors: true, // use our colors array
                    //opacity: 1
                });
                line = new Line2(this.createLineGeometry(coords, colors), this.lineMaterial);
            } else {
                line = new Line(this.createBufferGeometry(coords, colors), this.lineMaterial);
            }
            this.threejsObject.add(line);
        }
    }

    createBufferGeometry(vertices, colors) {
        const geometry = new BufferGeometry();
        geometry.setAttribute('position', new Float32BufferAttribute(vertices, 3));
        geometry.setAttribute('color', new Float32BufferAttribute(colors, 3));
        return geometry;
    }

    createLineGeometry(vertices, colors) {
        //workaround for custom line thickness
        // see https://threejs.org/examples/?q=lines#webgl_lines_fat
        let geometry = new LineGeometry()
        geometry.setPositions(vertices);
        geometry.setColors(colors);
        return geometry;
    }



    /**
     * 
     * @param {string} lineColor 
     * @returns 
     */
    lineColor(lineColor) {
        if (lineColor) {
            this.lineColor_ = lineColor;
            return this;
        }
        return this.lineColor_;
    }

    /**
     * 
     * @param {number} lineWidth 
     * @returns 
     */
    lineWidth(lineWidth) {
        if (lineWidth) {
            this.lineWidth_ = lineWidth;
            return this;
        }
        return this.lineWidth_;
    }

    /**
     * 
     * @param {string} fillColor 
     * @returns 
     */
    fillColor(fillColor) {
        if (fillColor) {
            this.fillColor_ = fillColor;
            return this;
        }
        return this.fillColor_;
    }

    /**
    * @description Build threejs line geometry from world coordinates
    * @function createLineFromCoords
    * @param {Array<Vector3>} coords  array of coord objects with values x,y,z
    * @param {String} lineColor  color value for geojson lines
    * @param {Number} lineWidth  Geojson line width. Default: 0.0012
    * @returns {Line2}
    */
    createLineFromCoords(coords, lineColor, lineWidth) {
        let line_geom = new LineGeometry();
        let color = new Color(lineColor);
        line_geom.setPositions(coords);
        //line_geom.setColors(colors);
        if (!this.lineMaterial) {
            this.lineMaterial = new LineMaterial({
                linewidth: lineWidth,
                color: color,
                vertexColors: true
            });
        }
        //line2 allows custom linewidth (but not currently included in main threejs build)
        return new Line2(line_geom, this.lineMaterial);
    }

}
