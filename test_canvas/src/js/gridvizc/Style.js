//@ts-check
import { Cell } from "./Dataset";
import { GeoCanvas } from './GeoCanvas';
import { Legend } from "./Legend";

/**
 * Statistics of a set of values
 * @typedef {{min:number,max:number}} Stat */

/**
 * A style, to show a grid dataset.
 * 
 * @abstract
 * 
 * @author Julien Gaffuri
 */
export class Style {

    /**
     * @abstract
     * @param {object} opts 
     */
    constructor(opts) {
        opts = opts || {};

        /** An offset. This is to alter the position of all symbols in a given direction. In geographical unit.
         * @protected @type {function(Cell,number,number):{dx:number,dy:number}} */
        this.offset = opts.offset || ((c, r, zf) => ({ dx: 0, dy: 0 }));


        //the cell stroke

        /** The zoom factor limit when to show/hide the stroke.
         * @private @type {number} */
        this.zfStroke = opts.zfStroke || undefined;

        /** The stroke color.
         * @private @type {string} */
        this.strokeColor = opts.strokeColor || "lightgray";

        /** The stroke line width, in pixels.
         * @private @type {number} */
        this.strokeWidth = opts.strokeWidth || 1.5;

        /** @protected @type {Legend} */
        this.legend = undefined
    }


    /**
     * Draw cells.
     * 
     * @param {Array.<Cell>} cells The cells to draw.
     * @param {number} resolution Their resolution (in geographic unit)
     * @param {GeoCanvas} cg The canvas where to draw them.
     * @abstract
     */
    draw(cells, resolution, cg) {
        throw new Error('Method draw not implemented.');
    }

    /**
     * @param {object} opts
     * @abstract
     * @returns {this}
     */
    addLegend(opts) {
        throw new Error('Method addLegend not implemented.');
        return this;
    }


    /**
     * Draw the stroke of the cells, as rectangle, only for detailled zoom levels when the cells are quite big.
     * 
     * @param {Cell} cell The cell to draw the stroke of.
     * @param {number} resolution Their resolution (in geographic unit)
     * @param {GeoCanvas} cg The canvas where to draw them.
     * @param {function(Cell):string} shape The shape of the stroke.
     * @param {function(Cell,number,Stat,number):number} size A function returning the size of a cell (in geographical unit).
     * @returns 
     */
    drawStroke(cell, resolution, cg, shape, size = null) {
        if (!this.zfStroke || cg.zf > this.zfStroke) return;

        cg.ctx.strokeStyle = this.strokeColor;
        cg.ctx.lineWidth = this.strokeWidth;

        //size
        /** @type {number} */
        size = size || (() => resolution);
        //size - in pixel and geo
        const sG = size(cell, resolution, null, cg.zf)
        const sP = sG / cg.zf;

        const shape_ = shape(cell);
        const offset = this.offset(cell, resolution, cg.zf)
        if (shape_ === "square") {
            //draw square
            const d = resolution * (1 - sG / resolution) * 0.5
            cg.ctx.beginPath();
            cg.ctx.rect(
                cg.geoToPixX(cell.x + d + offset.dx),
                cg.geoToPixY(cell.y + resolution - d + offset.dy),
                sP, sP);
            cg.ctx.stroke();

        } else if (shape_ === "circle") {
            //draw circle
            cg.ctx.beginPath();
            cg.ctx.arc(
                cg.geoToPixX(cell.x + resolution * 0.5 + offset.dx),
                cg.geoToPixY(cell.y + resolution * 0.5 + offset.dy),
                sP * 0.5,
                0, 2 * Math.PI, false);
            cg.ctx.stroke();
        }
    }



    //getters and setters

    /** @returns {function(Cell,number,number):{dx:number,dy:number}} */
    getOffset() { return this.offset; }
    /** @param {function(Cell,number,number):{dx:number,dy:number}} val @returns {this} */
    setOffset(val) { this.offset = val; return this; }

    /** @returns {number} */
    getZFStroke() { return this.zfStroke; }
    /** @param {number} val @returns {this} */
    setZFStroke(val) { this.zfStroke = val; return this; }

    /** @returns {string} */
    getStrokeColor() { return this.strokeColor; }
    /** @param {string} val @returns {this} */
    setStrokeColor(val) { this.strokeColor = val; return this; }

    /** @returns {number} */
    getStrokeWidth() { return this.strokeWidth; }
    /** @param {number} val @returns {this} */
    setStrokeWidth(val) { this.strokeWidth = val; return this; }

}



/**
 * Compute some statistics on a value of some cells.
 * TODO: compute median ?
 * 
 * @param {Array.<Cell>} cells 
 * @param {function(Cell):number} valFun 
 * @param {boolean} ignoreZeros 
 * @returns {Stat}
 */
export const getStatistics = function (cells, valFun, ignoreZeros) {
    if (!cells || cells.length == 0) return undefined
    let min = Infinity
    let max = -Infinity
    //let sum = 0
    //let nb = 0
    for (const cell of cells) {
        const v = +valFun(cell);
        if (ignoreZeros && !v) continue
        if (v < min) min = v
        if (v > max) max = v
        //sum += v
        //nb++
    }
    return { min: min, max: max, }
}
