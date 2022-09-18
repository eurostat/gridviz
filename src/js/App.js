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
import { DatasetComponent } from './DatasetComponent';
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
         * @type {GeoCanvas}
         * @private */
        this.cg = new GeoCanvas(canvas);
        this.cg.redraw = (strong = true) => {
            if (monitor) monitorDuration("Start redraw")
            console.log("?x=" + this.cg.getCenter().x + "&y=" + this.cg.getCenter().y + "&z=" + this.cg.getZf())

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

        //
        //canvas.addEventListener("keydown", e => { console.log(arguments) });
    }




    /**
     * Returns the layers which are within the current viewer zoom extent, that is the ones that are visible.
     * @returns {Array.<Layer>}
     * @protected
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
     * @protected
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
     * @protected
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


    /** @returns {LineLayer | undefined} */
    getBoundaryLayer() { return this.boundaryLayer; }
    /** @param {LineLayer} val @returns {this} */
    setBoundaryLayer(val) { this.boundaryLayer = val; return this; }

    /** @returns {LabelLayer | undefined} */
    getLabelLayer() { return this.labelLayer; }
    /** @param {LabelLayer} val @returns {this} */
    setLabelLayer(val) { this.labelLayer = val; return this; }










    /**
     * Add a layer to the app.
     * 
     * @param {Dataset} dataset The dataset of the layer
     * @param {Array.<Style>} styles The styles of the layer
     * @param {{visible?:boolean,minZoom?:number,maxZoom?:number,pixNb?:number,cellInfoHTML?:function(Cell):string}} opts The layer options.
     * @returns {this}
     */
    addLayerFromDataset(dataset, styles, opts) {
        const lay = new Layer(dataset, styles, opts)
        this.layers.push(lay)
        return this;
    }




    //dataset creation

    /**
     * Make a CSV grid dataset.
     * 
     * @param {string} url The URL of the dataset.
     * @param {number} resolution The dataset resolution in geographical unit.
     * @param {object=} opts The parameters of the dataset.
     * @returns {Dataset}
     */
    makeCSVGridDataset(url, resolution, opts) {
        return new Dataset([new CSVGrid(url, resolution, opts).getData(undefined, () => { this.cg.redraw(); })], [], opts)
    }

    /**
     * Make a tiled CSV grid dataset.
     * 
     * @param {string} url 
     * @param {{preprocess?:function(Cell):void}} opts 
     * @returns {Dataset}
     */
    makeTiledCSVGridDataset(url, opts) {
        return new Dataset([new TiledGrid(url, this, opts).loadInfo(() => { this.cg.redraw(); })], [], opts)
    }

    //multi scale dataset creation


    /**
     * Make a multi scale CSV grid dataset.
     * 
     * @param {Array.<number>} resolutions 
     * @param {function(number):string} resToURL
     * @param {{preprocess?:function(Cell):void}} opts 
     * @returns {Dataset}
     */
    makeMultiScaleCSVGridDataset(resolutions, resToURL, opts) {
        return Dataset.make(
            resolutions,
            (res) => new CSVGrid(resToURL(res), res, opts).getData(undefined, () => { this.cg.redraw(); }),
            opts
        )
    }

    /**
     * Make a multi scale tiled CSV grid dataset.
     * 
     * @param {Array.<number>} resolutions 
     * @param {function(number):string} resToURL
     * @param {{preprocess?:function(Cell):void}} opts 
     * @returns {Dataset}
     */
    makeMultiScaleTiledCSVGridDataset(resolutions, resToURL, opts) {
        return Dataset.make(
            resolutions,
            (res) => new TiledGrid(resToURL(res), this, opts).loadInfo(() => { this.cg.redraw(); }),
            opts
        )
    }


    // direct layer creation


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
        const ds = this.makeCSVGridDataset(url, resolution, opts)
        return this.addLayerFromDataset(ds, styles, opts);
    }

    /**
    * 
    * @param {string} url 
     * @param {Array.<Style>} styles 
     * @param {{visible?:boolean,minZoom?:number,maxZoom?:number,pixNb?:number,cellInfoHTML?:function(Cell):string, preprocess?:function(Cell):void}} opts 
     * @returns {this}
     */
    addTiledCSVGridLayer(url, styles, opts) {
        const ds = this.makeTiledCSVGridDataset(url, opts)
        return this.addLayerFromDataset(ds, styles, opts);
    }


    /**
     * Add a layer from a CSV grid dataset.
     * 
     * @param {Array.<number>} resolutions 
     * @param {function(number):string} resToURL
     * @param {Array.<Style>} styles The styles, ordered in drawing order.
     * @param {object=} opts The parameters of the dataset and layer.
     * @returns {this}
     */
    addMultiScaleCSVGridLayer(resolutions, resToURL, styles, opts) {
        const ds = this.makeMultiScaleCSVGridDataset(resolutions, resToURL, opts)
        return this.addLayerFromDataset(ds, styles, opts);
    }

    /**
     * 
     * @param {Array.<number>} resolutions 
     * @param {function(number):string} resToURL 
     * @param {Array.<Style>} styles 
     * @param {{visible?:boolean,minZoom?:number,maxZoom?:number,pixNb?:number,cellInfoHTML?:function(Cell):string, preprocess?:function(Cell):void}} opts 
     * @returns {this}
     */
    addMultiScaleTiledCSVGridLayer(resolutions, resToURL, styles, opts) {
        const ds = this.makeMultiScaleTiledCSVGridDataset(resolutions, resToURL, opts)
        return this.addLayerFromDataset(ds, styles, opts);
    }



    /**
     * 
     * @param {string} id 
     * @param {object} opts 
     * @returns {this}
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
