//@ts-check

import { CanvasGeo } from './CanvasGeo';
import { Layer } from './Layer';
import { Style } from './Style';
import { Dataset, Cell } from './Dataset';
import { tooltip } from './Tooltip';

import { CSVGrid } from './dataset/CSVGrid';
import { TiledGrid } from './dataset/TiledGrid';
import { Tooltip2 } from './Tooltip2';

/**
 * A gridviz on a HTML canvas.
 * 
 * @author Julien Gaffuri
 */
export class App {

    /**
     * @param {object} opts 
     */
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
        this.cg.redraw = () => {

            //go through the list of layers and find the one(s) to draw
            for (const layer of this.getActiveLayers()) {

                //get data to show
                layer.dataset.getData(this.cg.updateExtentGeo(), () => { this.draw(layer); });

                //draw cells
                this.draw(layer);
            }
            return this
        };


        //add tooltip
        this.tooltip = new Tooltip2()//tooltip();
        /**
         * 
         * @param {*} e 
         * @returns {boolean}
         */
        const showCellInfoTooltip = (e) => {
            //compute mouse geo position
            const mousePositionGeo = { x: this.cg.pixToGeoX(e.clientX), y: this.cg.pixToGeoY(e.clientY) }
            //TODO show position somewhere ?
            /** @type {string} */
            const html = this.getCellInfoHTML(mousePositionGeo)
            if(!html) return false;
            this.tooltip.html(html);
            return true;
        }
        this.cg.canvas.addEventListener("mouseover", e => {
            const b = showCellInfoTooltip(e)
            if (b) this.tooltip.show(); else this.tooltip.hide();
            this.tooltip.setPosition(e);
        });
        this.cg.canvas.addEventListener("mousemove", e => {
            const b = showCellInfoTooltip(e)
            if (b) this.tooltip.show(); else this.tooltip.hide();
            this.tooltip.setPosition(e);
        });
        this.cg.canvas.addEventListener("mouseout", () => { this.tooltip.hide(); });

    }


    /**
     * @private
     * 
     * Draw a layer.
     * 
     * @param {Layer} layer 
     * @returns {this}
     */
    draw(layer) {

        //get cells to draw
        const cells = layer.dataset.getCells(this.cg.extGeo)

        //clear
        this.cg.clear(this.backgroundColor);

        //draw cells, style by style
        for (const style of layer.styles)
            style.draw(cells, layer.dataset.getResolution(), this.cg)

        return this;
    }


    /**
     * Add a layer.
     * 
     * @param {Dataset} dataset The dataset to show
     * @param {Array.<Style>} styles The styles, ordered in drawing order.
     * @param {number} minZoom The minimum zoom level when to show the layer
     * @param {number} maxZoom The maximum zoom level when to show the layer
     * @returns {this}
     */
    addLayer(dataset, styles, minZoom, maxZoom) {
        this.layers.push(new Layer(dataset, styles, minZoom, maxZoom));
        return this;
    }

    /**
     * Add a layer from a tiled grid dataset.
     * 
     * @param {string} url The url of the dataset info.json file.
     * @param {Array.<Style>} styles The styles, ordered in drawing order.
     * @param {number} minZoom The minimum zoom level when to show the layer
     * @param {number} maxZoom The maximum zoom level when to show the layer
     * @param {function(Cell):void} preprocess A preprocess to run on each cell after loading. It can be used to apply some specific treatment before or compute a new column.
     * @returns {this}
     */
    addTiledGrid(url, styles, minZoom, maxZoom, preprocess = null) {
        return this.addLayer(
            new TiledGrid(url, this, preprocess).loadInfo(() => { this.cg.redraw(); }),
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
     * @param {function(Cell):void} preprocess A preprocess to run on each cell after loading. It can be used to apply some specific treatment before or compute a new column.
     * @returns {this}
     */
    addCSVGrid(url, resolution, styles, minZoom, maxZoom, preprocess = null) {
        return this.addLayer(
            new CSVGrid(url, resolution, preprocess).getData(null, () => { this.cg.redraw(); }),
            styles, minZoom, maxZoom
        )
    }







    /**
     * Returns the layers which are within the current viewer zoom extent, that is the ones that are visible.
     * @returns {Array.<Layer>}
     */
    getActiveLayers() {

        /** @type {Array.<Layer>} */
        const out = []

        //go through the layers
        const zf = this.getZoomFactor();
        for (const layer of this.layers) {
            //check if layer zoom extent contains current zoom factor
            if (layer.maxZoom < zf) continue;
            if (layer.minZoom >= zf) continue;
            out.push(layer);
        }
        return out;
    }


    /**
     * Returns the layer which is on top of the visible layers. This is the layer the user can interact with.
     * @returns {Layer}
     */
    getTopActiveLayers() {
        const lays = this.getActiveLayers();
        return lays[lays.length - 1]
    }

    /**
     * Return the cell HTML info at a given geo position.
     * This is usefull for user interactions, to show this info where the user clicks for example.
     * 
     * @param {{x:number,y:number}} posGeo 
     * @returns {string}
     */
    getCellInfoHTML(posGeo) {
        //get top layer
        /** @type {Layer} */
        const layer = this.getTopActiveLayers();
        if (!layer) return undefined;
        //get cell at mouse position
        /** @type {Cell} */
        const cell = layer.dataset.getCellFromPosition(posGeo, layer.dataset.getCells(this.cg.updateExtentGeo()));
        if (!cell) return undefined;
        return layer.dataset.cellInfoHTML(cell);
    }




    //getters and setters

    /** @returns {{x:number,y:number}} */
    getGeoCenter() { return this.cg.center; }
    /** @param {{x:number,y:number}} val @returns {this} */
    setGeoCenter(val) { this.cg.center = val; return this; }

    /** @returns {number} */
    getZoomFactor() { return this.cg.zf; }
    /** @param {number} val @returns {this} */
    setZoomFactor(val) { this.cg.zf = val; return this; }

    /** @returns {string} */
    getBackgroundColor() { return this.backgroundColor; }
    /** @param {string} val @returns {this} */
    setBackgroundColor(val) { this.backgroundColor = val; return this; }

}
