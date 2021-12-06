//@ts-check

import { Style } from "../Style"
import { Cell } from "../Dataset"
import { Viewer } from "../viewer/viewer";
import { Color, Group, LineBasicMaterial, LineSegments,Line, BufferGeometry, Vector3, Float32BufferAttribute } from "three";
import { LineMaterial } from "../../lib/threejs/lines/LineMaterial";
import { Line2 } from "../../lib/threejs/lines/Line2";
import { LineGeometry } from "../../lib/threejs/lines/LineGeometry";
import * as CONSTANTS from "../constants.js";
import { LineSegments2 } from "../../lib/threejs/lines/LineSegments2";

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

        /** @type {string} */
        this.lineColor_ = "grey"
        /** @type {number} */
        this.lineWidth_ = 0.001;
        /** @type {string} */
        this.fillColor_ = "rgba(192, 140, 89, 0.4)"

        this.lineZ = 0.001;

        this.threejsObject = null;

        this.lineMaterial = new LineMaterial({
            linewidth: this.lineWidth_,
            vertexColors: true
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

            //compute row baseline
            //const yP = viewer.geoToPixY(y);
            let coords = [];
            let startingPoint = { "x": (xMin - r / 2), "y": y, "z": this.lineZ };

            //place first point
            //cg.ctx.moveTo(cg.geoToPixX(xMin - r / 2), yP);
            //coords.push(startingPoint);


            //store the previous height
            let hG_ = 0;

            for (let x = xMin; x <= xMax; x += r) {

                //get column value
                let hG = row[x];
                if (!hG) hG = 0;

                if (hG || hG_) {
                    //draw line only when at least one of both values is non-null
                    //TODO test bezierCurveTo
                    //cg.ctx.lineTo(cg.geoToPixX(x + r / 2), yP - hG/cg.zf);
                    coords.push((x + r / 2),  y + hG,  this.lineZ )
                } else {
                    //else move the point (end current line and start new line at next point)
                    //cg.ctx.moveTo(cg.geoToPixX(x + r / 2), yP);

                    //end current line
                    //this.drawLine(coords)

                    //start new line at next point
                    //coords = [];
                    coords.push((x + r / 2),y, this.lineZ )

                }
                //store the previous value
                hG_ = hG;
            }

            //last point
            if (hG_) {
                //cg.ctx.lineTo(cg.geoToPixX(xMax + r / 2), yP);
                coords.push((xMax + r / 2),  y,  this.lineZ )
            }


            //draw fill
            // if (this.fillColor_)
            //     cg.ctx.fill()

            //draw line
            this.drawLine(coords)
        }
    }

    drawLine(coords) {
        if (this.lineColor_ && this.lineWidth_ > 0 && coords.length > 0) {
            //     let line = this.createLineFromCoords(coords, this.lineColor_, this.lineWidth_);
            //     this.threejsObject.add(line);

            const material = new LineBasicMaterial({ color: this.lineColor_, opacity: 1 });

            const line = new Line(this.createGeometry(coords), material);
            this.threejsObject.add(line);
        }
    }

    createGeometry(vertices) {

        const geometry = new BufferGeometry();

        geometry.setAttribute('position', new Float32BufferAttribute(vertices, 3));

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
