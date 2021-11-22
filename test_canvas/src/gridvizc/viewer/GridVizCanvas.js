//@ts-check

import { CanvasPlus } from '../viewer/CanvasPlus';
import { TiledGrid } from '../tiledgrid/TiledGrid';
import { ColorStyle } from '../style/ColorStyle';

export class GridVizCanvas {

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

        this.cplus.center = { x: 4000000, y: 2300000 }
        this.cplus.ps = 100

        const th = this;
        this.cplus.redraw = function () {

            //retrieve tiles
            th.tg.requestTiles(this.updateExtentGeo(), ()=>{th.draw();});

            //draw cells
            th.draw();

            return this
        };



        //TODO
        //this.layers = []

        /** @type {TiledGrid} */
        this.tg = new TiledGrid("https://raw.githubusercontent.com/eurostat/gridviz/master/assets/csv/Europe/grid_pop_tiled/1km/").loadInfo(() => {
            this.cplus.redraw();
        })

        /** @type {ColorStyle} */
        this.style = new ColorStyle()

    }


    /**
     * 
     */
    draw() {
        //get cells within the view
        const cells = this.tg.getCells(this.cplus.extGeo)

        //draw cells
        this.style.draw(cells, this, this.tg)
    }

}
