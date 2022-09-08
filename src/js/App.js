//@ts-check

import { GeoCanvas, Envelope } from './GeoCanvas';
import { Layer } from './Layer';
import { Style } from './Style';
import { Dataset, Cell } from './Dataset';
import { Tooltip } from './Tooltip';

import { CSVGrid } from './dataset/CSVGrid';
import { TiledGrid } from './dataset/TiledGrid';
import { LabelLayer } from './LabelLayer';
import { LineLayer } from './LineLayer';

import { select } from "d3-selection";
import { monitor, monitorDuration } from "./utils/Utils"
//import { GeoTIFF } from './dataset/GeoTIFF';

/**
 * A gridviz application.
 * 
 * @author Joseph Davies, Julien Gaffuri
 */
export class App {

    /**
     * @param {HTMLDivElement} container 
     * @param {object} opts 
     */
    constructor(container, opts) {
        opts = opts || {};

        /**
         * The layers.
         * @type {Array.<Layer>}
         * */
        this.layers = [];

        //get container element
        container = container || document.getElementById("gridviz");
        if (!container) {
            console.error("Cannot find gridviz container element.")
            return;
        }

        //set dimensions
        /** @type {number} */
        this.w = opts.w || container.offsetWidth;
        /** @type {number} */
        this.h = opts.h || container.offsetHeight;

        //create canvas element
        /** @type {HTMLCanvasElement} */
        const canvas = document.createElement("canvas");
        canvas.setAttribute("width", "" + this.w);
        canvas.setAttribute("height", "" + this.h);
        container.appendChild(canvas);

        /** Make geo canvas
         * @type {GeoCanvas} @private */
        this.cg = new GeoCanvas(canvas);
        this.cg.redraw = (strong = true) => {
            if (monitor) monitorDuration("Start redraw")
            //console.log(this.cg.getZf(), this.cg.getCenter())

            //remove legend elements
            if (this.legend && strong)
                this.legend.selectAll("*").remove();

            //clear
            this.cg.initCanvasTransform()
            this.cg.clear(this.cg.backgroundColor);

            //go through the layers
            const zf = this.getZoomFactor();
            for (const layer of this.layers) {

                //check if layer is visible
                if (!layer.visible) continue;
                if (zf > layer.maxZoom) continue;
                if (zf < layer.minZoom) continue;

                //get layer dataset component
                const dsc = layer.getDatasetComponent(zf)
                if (!dsc) continue

                //launch data download, if necessary
                if (strong)
                    dsc.getData(this.cg.updateExtentGeo(), () => { this.cg.redraw(); });

                //update dataset view cache
                if (strong)
                    dsc.updateViewCache(this.cg.extGeo);

                //draw cells, style by style
                if (strong)
                    for (const s of layer.styles) {
                        if (zf > s.maxZoom) continue;
                        if (zf < s.minZoom) continue;
                        s.draw(dsc.getViewCache(), dsc.getResolution(), this.cg)
                    }

                //add legend element
                if (this.legend && strong)
                    for (const s of layer.styles) {
                        if (zf > s.maxZoom) continue;
                        if (zf < s.minZoom) continue;
                        for (const lg of s.legends) {
                            //console.log(s, lg)
                            //this.legend.append(lg.div)
                            //s1.node().appendChild(s2.node())
                            this.legend.node().append(lg.div.node())
                        }
                    }

            }

            //draw boundary layer
            //if (strong)
            if ((this.showBoundaries && this.boundaryLayer))
                this.boundaryLayer.draw(this.cg)

            //draw label layer
            //if (strong)
            if (this.showLabels && this.labelLayer)
                this.labelLayer.draw(this.cg)

            //
            this.canvasSave = null;

            if (monitor) monitorDuration("End redraw")

            return this
        };

        /** @type {LabelLayer | undefined} */
        this.labelLayer = undefined;
        /** @type {boolean} */
        this.showLabels = true

        /** @type {LineLayer | undefined} */
        this.boundaryLayer = undefined;
        /** @type {boolean} */
        this.showBoundaries = true


        //legend div

        this.legendDivId = opts.legendDivId || "gvizLegend";
        this.legend = select("#" + this.legendDivId);
        if (this.legend.empty()) {
            this.legend = select("body").append("div")
                .attr("id", this.legendDivId)
                .style("position", "absolute")
                .style("width", "auto")
                .style("height", "auto")
                .style("background", "#FFFFFFCC")
                //.style("padding", this.padding)
                .style("border", "0px")
                .style("border-radius", "5px")
                .style("box-shadow", "5px 5px 5px grey")
                .style("font-family", "Helvetica, Arial, sans-serif")
                .style("top", "20px")
                .style("right", "20px")
            //hide
            //.style("visibility", "hidden")
        }



        //tooltip

        /**
         * @private
         * @type {Tooltip} */
        this.tooltip = new Tooltip()

        /** @param {MouseEvent} e */
        const focusCell = (e) => {
            //compute mouse geo position
            const mousePositionGeo = { x: this.cg.pixToGeoX(e.clientX), y: this.cg.pixToGeoY(e.clientY) }
            /** @type {{cell:Cell,html:string,resolution:number} | undefined} */
            const focus = this.getCellFocusInfo(mousePositionGeo)
            if (focus) {
                this.tooltip.setPosition(e);
                this.tooltip.show();
                this.tooltip.html(focus.html);

                //show cell position as a rectangle
                if (!this.canvasSave) {
                    this.canvasSave = document.createElement("canvas");
                    this.canvasSave.setAttribute("width", "" + this.w);
                    this.canvasSave.setAttribute("height", "" + this.h);
                    this.canvasSave.getContext("2d").drawImage(this.cg.canvas, 0, 0);
                } else {
                    this.cg.ctx.drawImage(this.canvasSave, 0, 0);
                }

                //draw image saved + draw rectangle
                this.cg.initCanvasTransform()
                this.cg.ctx.strokeStyle = this.selectionRectangleColor;
                this.cg.ctx.lineWidth = this.selectionRectangleWidthPix;
                this.cg.ctx.beginPath();
                this.cg.ctx.rect(
                    this.cg.geoToPixX(focus.cell.x) - this.selectionRectangleWidthPix / 2,
                    this.cg.geoToPixY(focus.cell.y) + this.selectionRectangleWidthPix / 2,
                    focus.resolution / this.getZoomFactor() + this.selectionRectangleWidthPix,
                    -focus.resolution / this.getZoomFactor() - this.selectionRectangleWidthPix
                );
                this.cg.ctx.stroke();
            } else {
                this.tooltip.hide();
                if (this.canvasSave)
                    this.cg.ctx.drawImage(this.canvasSave, 0, 0);
            }
        }
        container.addEventListener("mouseover", e => { focusCell(e) });
        container.addEventListener("mousemove", e => { focusCell(e) });
        container.addEventListener("mouseout", () => { this.tooltip.hide(); });
        this.cg.onZoomStartFun = () => { this.tooltip.hide(); }

        //for mouse over
        /**
         * @private
         * @type {HTMLCanvasElement|null} */
        this.canvasSave = null

        this.selectionRectangleColor = opts.selectionRectangleColor || "red"
        this.selectionRectangleWidthPix = opts.selectionRectangleWidthPix || 4
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
        for (const lay of this.layers) {
            if (!lay.visible) continue
            if (!lay.getDatasetComponent(zf)) continue;
            out.push(lay);
        }
        return out;
    }


    /**
     * Hide all layers (set visible attribute to false)
     * @returns {this}
     */
    hideAllLayers() {
        for (const al of this.layers)
            al.visible = false
        return this;
    }




    /**
     * @param {number} marginPx 
     * @returns {Envelope}
     */
    updateExtentGeo(marginPx = 20) {
        return this.cg.updateExtentGeo(marginPx);
    }


    /**
     * Return the cell HTML info at a given geo position.
     * This is usefull for user interactions, to show this info where the user clicks for example.
     * 
     * @param {{x:number,y:number}} posGeo 
     * @returns {{cell:Cell,html:string,resolution:number} | undefined}
     */
    getCellFocusInfo(posGeo) {
        //get top layer
        const lays = this.getActiveLayers();
        /** @type {Layer} */
        const layer = lays[lays.length - 1]
        if (!layer) return undefined;
        const dsc = layer.getDatasetComponent(this.getZoomFactor())
        if (!dsc) return undefined
        //get cell at mouse position
        /** @type {Cell|undefined} */
        const cell = dsc.getCellFromPosition(posGeo, dsc.getViewCache());
        if (!cell) return undefined;
        return { cell: cell, html: layer.cellInfoHTML(cell), resolution: dsc.getResolution() };
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
    getBackgroundColor() { return this.cg.backgroundColor; }
    /** @param {string} val @returns {this} */
    setBackgroundColor(val) { this.cg.backgroundColor = val; return this; }

    /** @returns {function|undefined} */
    getProjection() { return this.projection; }
    /** @param {function} val @returns {this} */
    setProjection(val) { this.projection = val; return this; }



    /** @returns {LineLayer | undefined} */
    getBoundaryLayer() { return this.boundaryLayer; }
    /** @param {LineLayer} val @returns {this} */
    setBoundaryLayer(val) { this.boundaryLayer = val; return this; }

    /** @returns {LabelLayer | undefined} */
    getLabelLayer() { return this.labelLayer; }
    /** @param {LabelLayer} val @returns {this} */
    setLabelLayer(val) { this.labelLayer = val; return this; }







    /**
     * Add a layer from a CSV grid dataset.
     * 
     * @param {string} url The URL of the dataset.
     * @param {number} resolution The dataset resolution in geographical unit.
     * @param {Array.<Style>} styles The styles, ordered in drawing order.
     * @param {object=} opts The parameters of the dataset and layer.
     * @returns {this}
     */
    addCSVGridLayer(url, resolution, styles, opts) {

        //make dataset
        const ds = new CSVGrid(url, resolution, opts).getData(undefined, () => { this.cg.redraw(); });
        const dataset = new Dataset([ds], [], opts)

        //make layer
        const lay = new Layer(dataset, styles, opts)
        this.layers.push(lay)
        return this;
    }


    /**
     * Add a layer from a GeoTIFF dataset.
     * 
     * @param {string} url The URL of the dataset.
     * @param {number} resolution The dataset resolution in geographical unit.
     * @param {Array.<Style>} styles The styles, ordered in drawing order.
     * @param {object=} opts The parameters of the dataset and layer.
     * @returns {this}
     */
    /*addGeoTIFFLayer(url, resolution, styles, opts) {

        //make dataset
        const ds = new GeoTIFF(url, resolution, opts).getData(undefined, () => { this.cg.redraw(); });
        const dataset = new Dataset([ds], [], opts)

        //make layer
        const lay = new Layer(dataset, styles, opts)
        this.layers.push(lay)
        return this;
    }*/

    /**
     * 
     * @param {string} urlBase 
     * @param {Array.<number>} resolutions 
     * @param {function(number):string} resToURLCode 
     * @param {{preprocess?:function(Cell):void}} opts 
     * @returns {Dataset}
     */
    makeMultiScaleTiledGridDataset(urlBase, resolutions, resToURLCode, opts) {

        //make dataset components
        const dsc = []
        for (const res of resolutions) {
            dsc.push(new TiledGrid(
                urlBase + resToURLCode(res),
                this,
                opts)
                .loadInfo(() => { this.cg.redraw(); }))
        }
        //make dataset and layer
        return new Dataset(dsc, resolutions, opts)
    }

    /**
     * 
     * @param {string} urlBase 
     * @param {Array.<number>} resolutions 
     * @param {function(number):string} resToURLCode 
     * @param {Array.<Style>} styles 
     * @param {{visible?:boolean,minZoom?:number,maxZoom?:number,pixNb?:number,cellInfoHTML?:function(Cell):string, preprocess?:function(Cell):void}} opts 
     * @returns {this}
     */
    addMultiScaleTiledGridLayer(urlBase, resolutions, resToURLCode, styles, opts) {
        const ds = this.makeMultiScaleTiledGridDataset(urlBase, resolutions, resToURLCode, opts)
        return this.addMultiScaleTiledGridLayer2(ds, styles, opts);
    }

    /**
     * 
     * @param {Dataset} dataset 
     * @param {Array.<Style>} styles 
     * @param {{visible?:boolean,minZoom?:number,maxZoom?:number,pixNb?:number,cellInfoHTML?:function(Cell):string, preprocess?:function(Cell):void}} opts 
     * @returns {this}
     */
    addMultiScaleTiledGridLayer2(dataset, styles, opts) {
        const lay = new Layer(dataset, styles, opts)
        this.layers.push(lay)
        return this;
    }


    /**
     * 
     * @param {string} id 
     * @param {object} opts 
     * @returns 
     */
    addZoomSlider(id, opts) {
        this.cg.addZoomSlider(id, opts)
        return this
    }



    /** @returns {this} */
    setViewFromURL() {
        this.cg.setViewFromURL()
        return this
    }

}
