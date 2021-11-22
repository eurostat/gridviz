//@ts-check

import { CanvasPlus } from '../viewer/CanvasPlus';
import { Layer } from './Layer';
import { Style } from './Style';
import { Dataset } from './Dataset';

import { TiledGrid } from '../dataset/TiledGrid';
import { ColorStyle } from '../style/ColorStyle';


export class GridVizCanvas {

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

                //skip layer not within the zoom range
                if (layer.minZoom >= this.ps) continue;
                if (layer.maxZoom < this.ps) continue;

                //get data to show
                layer.dataset.getData(this.updateExtentGeo(), () => { th.draw(layer); });

                //draw cells
                th.draw(layer);

            }
            return this
        };




        /** @type {Array.<Layer>} */
        this.layers = [];


        const s = new ColorStyle();
        this.addTiledGrid("https://raw.githubusercontent.com/eurostat/gridviz/master/assets/csv/Europe/grid_pop_tiled/1km/", s, 0, 500);
        this.addTiledGrid("https://raw.githubusercontent.com/eurostat/gridviz/master/assets/csv/Europe/grid_pop_tiled/2km/", s, 500, 1000);
        this.addTiledGrid("https://raw.githubusercontent.com/eurostat/gridviz/master/assets/csv/Europe/grid_pop_tiled/5km/", s, 1000, 9999999999);

    }

    /**
     * @param {Dataset} dataset 
     * @param {Style} style 
     * @param {number} minZoom 
     * @param {number} maxZoom 
     */
    add(dataset, style, minZoom, maxZoom) {
        this.layers.push(new Layer(dataset, style, minZoom, maxZoom));
    }

    /**
     * @param {string} url 
     * @param {Style} style 
     * @param {number} minZoom 
     * @param {number} maxZoom 
     */
    addTiledGrid(url, style, minZoom, maxZoom) {
        this.add(
            new TiledGrid(url).loadInfo(() => { this.cplus.redraw(); }),
            style, minZoom, maxZoom
        )
    }

    /**
     * @param {string} url 
     * @param {Style} style 
     * @param {number} minZoom 
     * @param {number} maxZoom 
     */
    addGrid(url, style, minZoom, maxZoom) {
        //TODO with non-tiled CSV file
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
