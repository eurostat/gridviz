//@ts-check

import { GeoCanvas, Envelope } from './GeoCanvas';
import { ALayer } from './ALayer';
import { Layer } from './Layer';
import { MultiScaleLayer } from './MultiScaleLayer';
import { Style } from './Style';
import { Dataset, Cell } from './Dataset';
import { Tooltip } from './Tooltip';

import { CSVGrid } from './dataset/CSVGrid';
import { TiledGrid } from './dataset/TiledGrid';
import { LabelLayer } from './LabelLayer';
import { BoundaryLayer } from './BoundaryLayer';

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
         * @type {Array.<ALayer>}
         * */
        this.layers = [];

        //get canvas element
        opts.canvasId = opts.canvasId || "vacanvas";
        const canvas = document.getElementById(opts.canvasId);
        if (!canvas) {
            console.error("Cannot find canvas element " + opts.canvasId)
            return;
        }

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

            //hide legends
            for (const alayer of this.layers) alayer.hideLegend()

            //go through the layers
            const zf = this.getZoomFactor();
            for (const alayer of this.layers) {

                //get layer
                /** @type {Layer} */
                const layer = alayer.getLayer(zf)
                if (!layer) continue;

                //get data to show
                layer.dataset.getData(this.cg.updateExtentGeo(), () => { this.cg.redraw(); });

                //update dataset view cache
                layer.dataset.updateViewCache(this.cg.extGeo);

                //clear
                this.cg.initCanvasTransform()
                this.cg.clear(this.backgroundColor);

                //draw cells, style by style
                for (const style of layer.styles)
                    style.draw(layer.dataset.getViewCache(), layer.dataset.getResolution(), this.cg)

                //show layer legend
                layer.showLegend()
            }

            //draw boundary layer
            if ((this.showBoundaries && this.boundaryLayer))
                this.boundaryLayer.draw(this.cg)

            //draw label layer
            if (this.showLabels && this.labelLayer)
                this.labelLayer.draw(this.cg)

            return this
        };

        /** @type {LabelLayer | undefined} */
        this.labelLayer = undefined;
        /** @type {boolean} */
        this.showLabels = true

        /** @type {BoundaryLayer | undefined} */
        this.boundaryLayer = undefined;
        /** @type {boolean} */
        this.showBoundaries = true

        //tooltip

        /** @private @type {Tooltip} */
        this.tooltip = new Tooltip()

        /** @param {MouseEvent} e */
        const focusCell = (e) => {
            //compute mouse geo position
            const mousePositionGeo = { x: this.cg.pixToGeoX(e.clientX), y: this.cg.pixToGeoY(e.clientY) }
            /** @type {{cell:Cell,html:string} | undefined} */
            const focus = this.getCellFocusInfo(mousePositionGeo)
            if (focus) {
                this.tooltip.setPosition(e);
                this.tooltip.show();
                this.tooltip.html(focus.html);
                //TODO show cell position
            } else {
                this.tooltip.hide();
            }
        }
        this.cg.canvas.addEventListener("mouseover", e => { focusCell(e) });
        this.cg.canvas.addEventListener("mousemove", e => { focusCell(e) });
        this.cg.canvas.addEventListener("mouseout", () => { this.tooltip.hide(); });
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
            new CSVGrid(url, resolution, opts).getData(undefined, () => { this.cg.redraw(); }),
            styles, minZoom, maxZoom
        )
    }




    /**
     * @param {string} urlBase
     * @param {Array.<{ code:string, styles:Array.<Style> }>} layersInfo
     * @param {Array.<number>} zooms
     * @returns {this}
     */
    addMultiScaleTiledGridLayer(urlBase, layersInfo, zooms) {
        const layers = [];
        for (const li of layersInfo) {
            layers.push(new Layer(new TiledGrid(urlBase + li.code, this).loadInfo(() => { this.cg.redraw(); }), li.styles))
        }
        this.layers.push(new MultiScaleLayer(layers, zooms));
        return this;
    }

    /**
     * @param {Array.<Layer>} layers
     * @param {Array.<number>} zooms
     * @returns {this}
     */
    addMultiScaleLayer(layers, zooms) {
        this.layers.push(new MultiScaleLayer(layers, zooms));
        return this;
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
        for (const alayer of this.layers) {
            const layer = alayer.getLayer(zf)
            if (!layer) continue;
            out.push(layer);
        }
        return out;
    }


    /**
     * Return the cell HTML info at a given geo position.
     * This is usefull for user interactions, to show this info where the user clicks for example.
     * 
     * @param {{x:number,y:number}} posGeo 
     * @returns {{cell:Cell,html:string} | undefined}
     */
    getCellFocusInfo(posGeo) {
        //get top layer
        const lays = this.getActiveLayers();
        /** @type {Layer} */
        const layer = lays[lays.length - 1]
        if (!layer) return undefined;
        //get cell at mouse position
        /** @type {Cell|undefined} */
        const cell = layer.dataset.getCellFromPosition(posGeo, layer.dataset.getViewCache());
        if (!cell) return undefined;
        return { cell: cell, html: layer.dataset.cellInfoHTML(cell) };
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
    getGeoCenter() { return this.cg.getCenter(); }
    /** @param {{x:number,y:number}} val @returns {this} */
    setGeoCenter(val) { this.cg.setCenter(val); return this; }

    /** @returns {number} */
    getZoomFactor() { return this.cg.getZf(); }
    /** @param {number} val @returns {this} */
    setZoomFactor(val) { this.cg.setZf(val); return this; }

    /** @returns {Array.<number>} */
    getZoomFactorExtent() { return this.cg.getZfExtent(); }
    /** @param {Array.<number>} val @returns {this} */
    setZoomFactorExtent(val) { this.cg.setZfExtent(val); return this; }

    /** @returns {string} */
    getBackgroundColor() { return this.backgroundColor; }
    /** @param {string} val @returns {this} */
    setBackgroundColor(val) { this.backgroundColor = val; return this; }

    /** @returns {function|undefined} */
    getProjection() { return this.projection; }
    /** @param {function} val @returns {this} */
    setProjection(val) { this.projection = val; return this; }



    /** @returns {BoundaryLayer | undefined} */
    getBoundaryLayer() { return this.boundaryLayer; }
    /** @param {BoundaryLayer} val @returns {this} */
    setBoundaryLayer(val) { this.boundaryLayer = val; return this; }

    /** @returns {LabelLayer | undefined} */
    getLabelLayer() { return this.labelLayer; }
    /** @param {LabelLayer} val @returns {this} */
    setLabelLayer(val) { this.labelLayer = val; return this; }

}
