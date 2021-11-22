//@ts-check

import { CanvasPlus } from '../viewer/CanvasPlus';
import { TiledGrid } from '../tiledgrid/TiledGrid';
import { ColorStyle } from '../style/ColorStyle';
import { Layer } from './Layer';

export class GridVizCanvas {

    //TODO use layer - one per zoom level
    //TODO implement mouse over

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

            //get data to show
            th.layer.dataset.getData(this.updateExtentGeo(), ()=>{th.draw();});

            //draw cells
            th.draw();

            return this
        };


        //TODO
        //TODO add several
        this.layer = new Layer(
            new TiledGrid("https://raw.githubusercontent.com/eurostat/gridviz/master/assets/csv/Europe/grid_pop_tiled/1km/").loadInfo(() => {
                this.cplus.redraw();
            }),
            new ColorStyle(),
            0,
            10000000
        )


    }


    /**
     * 
     */
    draw() {
        //get cells within the view
        const cells = this.layer.dataset.getCells(this.cplus.extGeo)

        //draw cells
        this.layer.style.draw(cells, this.layer.dataset.resolutionGeo, this)
    }

}
