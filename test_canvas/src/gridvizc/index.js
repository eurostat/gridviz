//@ts-check
/** @typedef { {xMin: number, xMax: number, yMin: number, yMax: number} } Envelope */

import { CanvasPlus } from './viewer/CanvasPlus';
import { TiledGrid } from './tiledgrid/TiledGrid';
import { interpolateReds } from "d3-scale-chromatic"

class GridVizCanvas {

    //TODO use layer - one per zoom level
    //TODO jsdoc https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html
    //TODO implement mouse over
    //TODO use spatial index

    constructor(opts) {
        opts = opts || {};

        opts.canvasId = opts.canvasId || "vacanvas";
        const canvas = document.getElementById(opts.canvasId);

        /** @type {number} */
        this.w = opts.w || canvas.offsetWidth;
        /** @type {number} */
        this.h = opts.h || canvas.offsetHeight;

        /** @type {CanvasPlus} */
        this.cplus = new CanvasPlus();
        this.cplus.c2d.fillStyle = "black";
        this.cplus.c2d.fillRect(0, 0, this.w, this.h);

        this.cplus.center = {x: 4000000, y: 2300000}
        this.cplus.ps = 10

 
        

        //TODO
        //this.layers = []

        const tg = new TiledGrid("https://raw.githubusercontent.com/eurostat/gridviz/master/assets/csv/Europe/grid_pop_tiled/1km/").then(()=>{
            this.cplus.redraw();
        })



        const th = this;
        this.cplus.redraw = function() {

            //geo extent
            this.updateExtentGeo();
            tg.requestTiles(this.extGeo, draw_);

            //redaw
            draw_()

            return this
        };

        const draw_ = function() {
            //get cells within the view
            const cells = tg.getCells(th.cplus.extGeo)
            //draw cells
            draw(cells)
        }


        //draw cells
        const draw = function(cells) {
            const cp = th.cplus;
            const c2 = cp.c2d

            //clear
            c2.fillStyle = "black";
            c2.fillRect(0, 0, th.w, th.h);

            /** @type {number} */
            const r = tg.getInfo().resolutionGeo

            for(let j=0; j<cells.length; j++) {
                const cell = cells[j];
                const value = cell[2011]; //TODO extract column name
                c2.fillStyle = getColor(value);
                c2.fillRect(cp.geoToPixX(cell.x), cp.geoToPixY(cell.y), r/cp.ps, r/cp.ps);
            }
    }

        //TODO generic style
        const getColor = (v) => {
            //TODO better
            return interpolateReds(v/200)
        }

    }

}

export const gridvizApp = function (opts) {
    return new GridVizCanvas(opts)
}
