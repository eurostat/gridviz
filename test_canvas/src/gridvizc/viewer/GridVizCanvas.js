//@ts-check

import { CanvasZoomPan } from './CanvasZoomPan';
import { Layer } from './Layer';
import { Style } from './Style';
import { Dataset } from './Dataset';

import { TiledGrid } from '../dataset/TiledGrid';
import { ColorStyle } from '../style/ColorStyle';


export class GridVizCanvas {

    //TODO dataset static CSV
    //TODO make several styles
    //TODO implement mouse over

    constructor(opts) {
        opts = opts || {};

        opts.canvasId = opts.canvasId || "vacanvas";
        const canvas = document.getElementById(opts.canvasId);

        /** @type {number} */
        this.w = opts.w || canvas.offsetWidth;
        /** @type {number} */
        this.h = opts.h || canvas.offsetHeight;

        this.backgroundColor = opts.backgroundColor || "white"



        /** @type {CanvasZoomPan} */
        this.czp = new CanvasZoomPan();
        this.czp.center = opts.center || { x: 4000000, y: 2300000 }
        this.czp.ps = opts.ps || 100

        const th = this;
        this.czp.redraw = function () {

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
        //note: the layers are not supposed to overlap


        /**
         * Styles library.
         * This object exposes style constructors.
         */
        this.styling = {
            getColorStyle : function(value) {
                return new ColorStyle(value);
            }
        }

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
            new TiledGrid(url).loadInfo(() => { this.czp.redraw(); }),
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
     * Clear the app screen.
     * To be used before a redraw for example.
     * //TODO move that to canvas
     */
    clear() {
        const c2 = this.czp.c2d
        c2.fillStyle = this.backgroundColor;
        c2.fillRect(0, 0, this.w, this.h);
    }

    /**
     * @param {Layer} layer 
     */
    draw(layer) {
        //get cells to draw
        const cells = layer.dataset.getCells(this.czp.extGeo)

        //clear
        this.clear();

        //draw cells
        layer.style.draw(cells, layer.dataset.resolutionGeo, this.czp)
    }

}
