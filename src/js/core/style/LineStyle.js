//@ts-check

import { Style } from "../Style"
import { Cell } from "../Dataset"
import { Viewer } from "../viewer/viewer";
import { createLineFromCoords } from "../GeoJsonLayer";
import { Group } from "three";

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
        this.lineColor_ = "white"
        /** @type {number} */
        this.lineWidth_ = 0.002;
        /** @type {string} */
        this.fillColor_ = "rgba(192, 140, 89, 0.4)"

        this.threejsObject = new Group();
    }


    /**
     * Draw cells as squares depending on their value.
     * 
     * @param {Array.<Cell>} cells 
     * @param {number} r 
     * @param {Viewer} viewer 
     */
    draw(cells, r, viewer) {

        if (this.threejsObject) this.threejsObject.clear();

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

        //set color and width


        //draw lines row by row, stating from the top
        for (let y = yMax; y >= yMin; y -= r) {

            //get row
            const row = ind[y]
            if (!row) continue;

            //compute row baseline
            //const yP = viewer.geoToPixY(y);
            let coords = [];
            let startingPoint = [(xMin - r / 2), y];

            //place first point
            //cg.ctx.moveTo(cg.geoToPixX(xMin - r / 2), yP);
            coords.push(startingPoint);


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
                    coords.push([(x + r / 2), y - hG])
                } else {
                    //else move the point
                    //cg.ctx.moveTo(cg.geoToPixX(x + r / 2), yP);
                    coords.push([(x + r / 2), y])
                }
                //store the previous value
                hG_ = hG;
            }

            //last point
            if (hG_) {
                coords.push([(xMax + r / 2), y])
            }
            //cg.ctx.lineTo(cg.geoToPixX(xMax + r / 2), yP);

            //draw fill
            // if (this.fillColor_)
            //     cg.ctx.fill()

            //draw line
            if (this.lineColor_ && this.lineWidth_ > 0) {
                let line = createLineFromCoords(coords, this.lineColor_, this.lineWidth_);
                this.threejsObject.add(line);
            }

        }
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

}
