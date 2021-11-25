//@ts-check

import { CanvasGeo } from './CanvasGeo';
import { Layer } from './Layer';
import { Style } from './Style';
import { Dataset } from './Dataset';

import { CSVGrid } from './dataset/CSVGrid';
import { TiledGrid } from './dataset/TiledGrid';
import { ShapeColorSizeStyle } from './style/ShapeColorSizeStyle';
import { CompositionStyle } from './style/CompositionStyle';
import { LineStyle } from './style/LineStyle';

/**
 * A gridviz on a HTML canvas.
 * 
 * @author Julien Gaffuri
 */
export class App {

    //TODO style make pie chart / ring / multi(?) / radar
    //TODO styles with orientation
    //TODO style with variation - population geostat
    //TODO style kernel smoothing

    //TODO remove unnecessary redraw calls
    //TODO zoom/pan smartphone - use d3 events
    //TODO implement mouse over
    //TODO empty tile cache

    constructor(opts) {
        opts = opts || {};

        /**
         * The layers.
         * @type {Array.<Layer>}
         * */
         this.layers = [];

        //get canvas element
        opts.canvasId = opts.canvasId || "vacanvas";
        const canvas = document.getElementById(opts.canvasId);

        //set dimensions
        /** @type {number} */
        this.w = opts.w || canvas.offsetWidth;
        /** @type {number} */
        this.h = opts.h || canvas.offsetHeight;

        /** Background color.
         * @type {string} */
        this.backgroundColor = opts.backgroundColor || "white"


        /** Make geo canvas
         * @type {CanvasGeo} */
        this.cg = new CanvasGeo();
        const th = this;
        this.cg.redraw = function () {

            //go through the list of layers and find the one(s) to draw
            for (const layer of th.layers) {

                //skip layer not within the zoom range
                if (layer.minZoom >= this.zf) continue;
                if (layer.maxZoom < this.zf) continue;

                //get data to show
                layer.dataset.getData(this.updateExtentGeo(), () => { th.draw(layer); });

                //draw cells
                th.draw(layer);
            }
            return this
        };

    }

    /** */
    redrawWhenNecessary() {

        //TODO do not redraw it if it is no longer necessary
        //that is if another redraw with another zoom level has been triggered (?)
        //hasZoomedSinceLastCall()
        //if(XXX) return;

        this.cg.redraw();
    }


    /**
     * Add a layer.
     * 
     * @param {Dataset} dataset The dataset to show
     * @param {Array.<Style>} styles The styles, ordered in drawing order.
     * @param {number} minZoom The minimum zoom level when to show the layer
     * @param {number} maxZoom The maximum zoom level when to show the layer
     */
    add(dataset, styles, minZoom, maxZoom) {
        this.layers.push(new Layer(dataset, styles, minZoom, maxZoom));
    }

    /**
     * Add a layer from a tiled grid dataset.
     * 
     * @param {string} url The url of the dataset info.json file.
     * @param {Array.<Style>} styles The styles, ordered in drawing order.
     * @param {number} minZoom The minimum zoom level when to show the layer
     * @param {number} maxZoom The maximum zoom level when to show the layer
     * @param {function} preprocess A preprocess to run on each cell after loading. It can be used to apply some specific treatment before or compute a new column.
     */
    addTiledGrid(url, styles, minZoom, maxZoom, preprocess = null) {
        this.add(
            new TiledGrid(url, preprocess).loadInfo(() => { this.redrawWhenNecessary(); }),
            styles, minZoom, maxZoom
        )
    }


    /**
     * Add a layer from a CSV grid dataset.
     * 
     * @param {string} url The url of the dataset.
     * @param {number} resolution The dataset resolution (in geographical unit).
     * @param {Array.<Style>} styles The styles, ordered in drawing order.
     * @param {number} minZoom The minimum zoom level when to show the layer
     * @param {number} maxZoom The maximum zoom level when to show the layer
     * @param {function} preprocess A preprocess to run on each cell after loading. It can be used to apply some specific treatment before or compute a new column.
     */
    addCSVGrid(url, resolution, styles, minZoom, maxZoom, preprocess = null) {
        this.add(
            new CSVGrid(url, resolution, preprocess).getData(null, () => { this.redrawWhenNecessary(); }),
            styles, minZoom, maxZoom
        )
    }


    /**
     * Draw a layer.
     * 
     * @param {Layer} layer 
     */
    draw(layer) {

        //get cells to draw
        const cells = layer.dataset.getCells(this.cg.extGeo)

        //clear
        this.cg.clear(this.backgroundColor);

        //draw cells, style by style
        for (const style of layer.styles)
            style.draw(cells, layer.dataset.resolution, this.cg)
    }


    /**
     * Set viewer position.
     * 
     * @param {{x:number,y:number}} pos 
     */
    geoCenter(pos) {
        if (pos) {
            this.cg.center = pos;
            return this;
        }
        return pos;
    }

    /**
     * Set viewer zoom level (ground pixel size).
     * 
     * @param {number} zf 
     */
    zoomFactor(zf) {
        if (zf) {
            this.cg.zf = zf;
            return this;
        }
        return zf;
    }

}
