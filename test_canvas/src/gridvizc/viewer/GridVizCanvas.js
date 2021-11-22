//@ts-check

import { CanvasPlus } from '../viewer/CanvasPlus';
import { TiledGrid } from '../tiledgrid/TiledGrid';
import { ColorStyle } from '../style/ColorStyle';
import { Layer } from './Layer';

export class GridVizCanvas {

    //TODO use layer - one per zoom level
    //TODO several styles
    //TODO dataset static CSV
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

            for (const layer of th.layers) {

                //get data to show
                layer.dataset.getData(this.updateExtentGeo(), () => { th.draw(layer); });

                //draw cells
                th.draw(layer);

            }
            return this
        };


        /** @type {Array.<Layer>} */
        this.layers = [];

        this.layers.push(new Layer(
            new TiledGrid("https://raw.githubusercontent.com/eurostat/gridviz/master/assets/csv/Europe/grid_pop_tiled/1km/").loadInfo(() => {
                this.cplus.redraw();
            }),
            new ColorStyle(),
            0,
            10000000
        ));


    }


    /**
     * @param {Layer} layer 
     */
    draw(layer) {
        //get cells to draw
        const cells = layer.dataset.getCells(this.cplus.extGeo)

        //draw cells
        layer.style.draw(cells, layer.dataset.resolutionGeo, this)
    }

}
