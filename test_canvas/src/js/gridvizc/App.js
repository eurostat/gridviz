//@ts-check

import { GeoCanvas, Envelope } from './GeoCanvas';
import { Layer } from './Layer';
import { Style } from './Style';
import { Dataset, Cell } from './Dataset';
import { Tooltip } from './Tooltip';

import { CSVGrid } from './dataset/CSVGrid';
import { TiledGrid } from './dataset/TiledGrid';
import { LabelLayer } from './LabelLayer';

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
         * @type {GeoCanvas} @private */
        this.cg = new GeoCanvas();
        this.cg.redraw = () => {

            //go through the layers
            const zf = this.getZoomFactor();
            for (const layer of this.layers) {
                //check if layer zoom extent contains current zoom factor
                if (layer.maxZoom < zf || layer.minZoom >= zf) {
                    //TODO hide style legends
                    continue;
                }

                //get data to show
                layer.dataset.getData(this.cg.updateExtentGeo(), () => { this.cg.redraw(); });

                //draw cells
                this.draw(layer);
            }

            //draw label layer
            if ((this.labelLayer))
                this.labelLayer.draw(this.cg)

            return this
        };

        /** @type {LabelLayer} */
        this.labelLayer = undefined;


        //tooltip

        /** @private @type {Tooltip} */
        this.tooltip = new Tooltip()

        /** @param {MouseEvent} e @returns {boolean} */
        const showCellInfoTooltip = (e) => {
            //compute mouse geo position
            const mousePositionGeo = { x: this.cg.pixToGeoX(e.clientX), y: this.cg.pixToGeoY(e.clientY) }
            /** @type {string} */
            const html = this.getCellInfoHTML(mousePositionGeo)
            if (!html) return false;
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

        //update dataset view cache
        layer.dataset.updateViewCache(this.cg.extGeo)

        //clear
        this.cg.initCanvasTransform()
        this.cg.clear(this.backgroundColor);

        //draw cells, style by style
        for (const style of layer.styles)
            style.draw(layer.dataset.getViewCache(), layer.dataset.getResolution(), this.cg)

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
     * @param {string} url The URL of the dataset.
     * @param {Array.<Style>} styles The styles, ordered in drawing order.
     * @param {number} minZoom The minimum zoom level when to show the layer
     * @param {number} maxZoom The maximum zoom level when to show the layer
     * @param {object=} opts The parameters of the dataset.
     * @returns {this}
     */
    addTiledGridLayer(url, styles, minZoom, maxZoom, opts) {
        return this.addLayer(
            new TiledGrid(url, this, opts).loadInfo(() => { this.cg.redraw(); }),
            styles, minZoom, maxZoom
        )
    }


    /**
     * Add a layer from a CSV grid dataset.
     * 
     * @param {string} url The URL of the dataset.
     * @param {number} resolution The dataset resolution in geographical unit.
     * @param {Array.<Style>} styles The styles, ordered in drawing order.
     * @param {number} minZoom The minimum zoom level when to show the layer
     * @param {number} maxZoom The maximum zoom level when to show the layer
     * @param {object=} opts The parameters of the dataset.
     * @returns {this}
     */
    addCSVGridLayer(url, resolution, styles, minZoom, maxZoom, opts) {
        return this.addLayer(
            new CSVGrid(url, resolution, opts).getData(null, () => { this.cg.redraw(); }),
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
     * Return the cell HTML info at a given geo position.
     * This is usefull for user interactions, to show this info where the user clicks for example.
     * 
     * @param {{x:number,y:number}} posGeo 
     * @returns {string}
     */
    getCellInfoHTML(posGeo) {
        //get top layer
        const lays = this.getActiveLayers();
        /** @type {Layer} */
        const layer = lays[lays.length - 1]
        if (!layer) return undefined;
        //get cell at mouse position
        /** @type {Cell} */
        const cell = layer.dataset.getCellFromPosition(posGeo, layer.dataset.getViewCache());
        if (!cell) return undefined;
        return layer.dataset.cellInfoHTML(cell);
    }



    /**
     * @param {number} marginPx 
     * @returns {Envelope}
     */
    updateExtentGeo(marginPx = 20) {
        return this.cg.updateExtentGeo(marginPx);
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

    /** @returns {function} */
    getProjection() { return this.projection; }
    /** @param {function} val @returns {this} */
    setProjection(val) { this.projection = val; return this; }

    /** @returns {LabelLayer} */
    getLabelLayer() { return this.labelLayer; }
    /** @param {LabelLayer} val @returns {this} */
    setLabelLayer(val) { this.labelLayer = val; return this; }

}
