//@ts-check
'use strict'

// internal imports
import { isVisibleAt } from './Drawable.js'
import { GeoCanvas } from './GeoCanvas.js'
import { Tooltip } from './Tooltip.js'
import { ZoomButtons } from '../button/ZoomButtons.js'
import { FullscreenButton } from '../button/FullscreenButton.js'

// external imports
import { select } from 'd3-selection'

/**
 * Tells a cell from another across redraws, which can make the cells again: by position and resolution.
 * @param {{cell:{x:any,y:any},resolution:number}} focus
 * @returns {string} */
function cellKey(focus) {
    return focus.cell.x + ',' + focus.cell.y + ',' + focus.resolution
}

/**
 * A gridviz application.
 *
 * @module core
 * @author Joseph Davies, Julien Gaffuri
 */
export class Map {
    /**
     * @param {HTMLDivElement} container
     * @param {object} opts
     */
    constructor(container, opts) {
        opts = opts || {}

        /**
         * The layers.
         * @type {Array.<import("./Layer.js").Layer>}
         * */
        this.layers = opts.layers || []

        /**
         * When true (the default), redraw() schedules one redraw for the next animation frame
         * instead of drawing at once, so the many redraw requests of a busy moment (every tile
         * that arrives, every info.json, every setting change) are drawn once. redrawNow() still
         * draws at once. Set it to false for redraw() to be synchronous, as it was before 3.1.0.
         * @type {boolean} */
        this.asyncRedraw = opts.asyncRedraw !== false

        /**
         * A function telling whether hovering is suspended: no cell is looked up under the pointer, and no tooltip or
         * rectangle is shown, while it returns true. For a map inside another one, moved by something else (a drag of
         * the Leaflet map, for example, during which the pointer is still on the canvas). See also clearHover().
         * @type {(function():boolean)|undefined} */
        this.hoverSuspended = opts.hoverSuspended
        /** @private @type {number|null} */
        this._redrawFrame = null

        /**
         * The renderer drawing the grid layers of this map on the GPU, if any: see GPUGridRenderer.attach().
         * @type {import('./GPUGridRenderer.js').GPUGridRenderer|null} */
        this.gpuRenderer = null

        //get container element
        this.container = container || document.getElementById('gridviz')
        if (!this.container) {
            console.error('Cannot find gridviz container element.')
            return
        }
        this.container.classList.add('gridviz-map')

        //https://css-tricks.com/absolute-positioning-inside-relative-positioning/
        this.container.style.position = 'relative' // container element must have relative positioning

        //set dimensions
        /** @type {number} */
        this.w = opts.w || this.container.offsetWidth
        /** @type {number} */
        this.h = opts.h || this.container.offsetHeight

        // Create the main canvas (for rendering to screen)
        /** @type {HTMLCanvasElement} */
        this._canvas = opts.canvas || this.initialiseCanvas()

        /**  Initialize GeoCanvas
         * @type {GeoCanvas}
         * @private */
        this.geoCanvas = new GeoCanvas(this._canvas, opts.x, opts.y, opts.z, opts)

        this.geoCanvas.redraw = () => {
            this.redraw()
        }
        this.geoCanvas.cancelCurrentRequests = () => {
            // when the zoom level changes, avoid drawing outdated tiles, and ensure that requests are properly aborted when necessary
            for (const layer of this.layers) {
                //multires
                if (layer.dataset?.datasets) {
                    for (const dataset of layer.dataset?.datasets) {
                        if (dataset?.cancelCurrentRequests) dataset.cancelCurrentRequests()
                    }
                }
                //single res
                if (layer.dataset?.cancelCurrentRequests) layer.dataset?.cancelCurrentRequests()
            }
        }

        // legend div
        this.legend = opts.legendContainer
            ? select(opts.legendContainer) // Wrap the provided HTML node in a D3 selection
            : null
        this._legendProvidedByUser = !!opts.legendContainer

        /**
         * Called with the legend container (an HTML element) each time the map has drawn and its legends
         * are in the container, for a host that needs to adjust them (fit their width, restyle...).
         * It can also be set after the map is created.
         * @type {function(HTMLElement):void|undefined} */
        this.onLegendUpdate = opts.onLegendUpdate
        if (!this.legend) this.initialiseLegend()

        //tooltip

        // set App container as default parent element for tooltip
        if (!opts.tooltip) opts.tooltip = {}
        if (!opts.tooltip.parentElement) opts.tooltip.parentElement = this.container

        /**
         * @type {Tooltip} */
        this.tooltip = new Tooltip(opts.tooltip)

        /** 
         * Set to true so that the tooltip appears for the first layer starting from top where a cell is found.
         * Otherwise, it shows a tooltip only for the first layer from the top with a cellInfoHTML property, even if there is no cell at the mouse position for this layer.
         * @type {boolean} */
        this.digForTooltip = opts.digForTooltip || false

        // add event listeners to the canvas. Mouse moves are handled at most once per
        // animation frame (the latest one): finding the cell and redrawing the highlight
        // for every intermediate event only delays the one that's shown.
        /** @private */
        this._focusFrame = null
        /** @private */
        this._focusEvent = null
        /** The last mouse event over the canvas, null when the mouse is out of it (see redrawNow)
         * @private
         * @type {MouseEvent|null} */
        this._lastMouseEvent = null
        /** True while the mouse is on a cell, which shows its rectangle and tooltip: the map gives them back after a redraw
         * @private */
        this._hovering = false
        /** The cell the hover is on (see cellKey), to tell after a redraw if the mouse is still on the same one
         * @private
         * @type {string|null} */
        this._hoverKey = null
        /** @private */
        this._refocusing = false
        /** The layer and the dataset of the cell which is hovered (see _hoverKey): another layer, or dataset, at the same place is
         * another cell, whose info is not the one of the tooltip (a time slider which changes the data for example)
         * @private
         * @type {{layer:*, dataset:*}|null} */
        this._hoverSource = null
        /** The cell whose info was asked for after a redraw, so that it is not asked again at each redraw
         * @private
         * @type {string|null} */
        this._triedKey = null
        /** @private
         * @type {{layer:*, dataset:*}|null} */
        this._triedSource = null
        /** The last position of the mouse in the page. The canvas does not get the mouse events while the map is dragged or
         * scrolled (the zoom of the canvas takes them), so this one is listened to in the window: the map shows the hover again
         * where the mouse is when a redraw ends the pan or the zoom.
         * @private
         * @type {{clientX:number, clientY:number}|null} */
        this._pointer = null
        this._pointerHandler = (e) => {
            this._pointer = { clientX: e.clientX, clientY: e.clientY }
        }
        // the mouse left the page
        this._pointerLeaveHandler = (e) => {
            if (!e.relatedTarget) this._pointer = null
        }
        for (const type of ['mousemove', 'mousedown', 'wheel'])
            window.addEventListener(type, this._pointerHandler, { capture: true, passive: true })
        window.addEventListener('mouseout', this._pointerLeaveHandler, { capture: true, passive: true })
        const scheduleFocus = (e) => {
            this._lastMouseEvent = e
            this._focusEvent = e
            if (this._focusFrame) return
            this._focusFrame = requestAnimationFrame(() => {
                this._focusFrame = null
                const ev = this._focusEvent
                this._focusEvent = null
                if (ev) this.focusCell(ev)
            })
        }
        this.mouseOverHandler = scheduleFocus
        this.mouseMoveHandler = scheduleFocus
        this.mouseOutHandler = (e) => {
            if (this._focusFrame) cancelAnimationFrame(this._focusFrame)
            this._focusFrame = null
            this._focusEvent = null
            this._lastMouseEvent = null
            this._hovering = false
            this._hoverKey = null
            this._hoverSource = null
            this._triedKey = null
            this._triedSource = null
            this.tooltip.hide()
        }
        this.geoCanvas.canvas.addEventListener('mouseover', this.mouseOverHandler)
        this.geoCanvas.canvas.addEventListener('mousemove', this.mouseMoveHandler)
        this.geoCanvas.canvas.addEventListener('mouseout', this.mouseOutHandler)

        // listen for resize events on the App's container and handle them
        this.defineResizeObserver()

        // add extra logic to onZoomStartFun
        this.geoCanvas.onZoomStartFun = (e) => {
            if (opts.onZoomStartFun) opts.onZoomStartFun(e)
            this._hovering = false
            this._hoverKey = null
            this._hoverSource = null
            this._triedKey = null
            this._triedSource = null
            this.tooltip.hide()
        }

        //for mouse over
        /**
         * @private
         * @type {HTMLCanvasElement|null} */
        this.canvasSave = null

        this.selectionRectangleColor = opts.selectionRectangleColor || '#FF6347'
        this.selectionRectangleWidthPix = opts.selectionRectangleWidthPix || (() => 4) //(r,z) => {}

        // transparent background (e.g. leaflet) 'red painting' fix
        this.transparentBackground = opts.transparentBackground

        //set default globalCompositeOperation
        this.defaultGlobalCompositeOperation =
            opts.defaultGlobalCompositeOperation || this.geoCanvas.ctx.globalCompositeOperation
    }

    /**
     * Ends the hover, if there is one: hides the tooltip and takes the rectangle of the cell off the map.
     * @returns {this}
     */
    clearHover() {
        this.mouseOutHandler()
        if (!this._focusedCell) return this
        this._focusedCell = undefined
        if (this.transparentBackground) {
            this.geoCanvas.initCanvasTransform()
            this.geoCanvas.ctx.clearRect(0, 0, this.w, this.h)
            this.geoCanvas.ctx.drawImage(this.geoCanvas.offscreenCanvas, 0, 0)
        } else {
            this.redraw()
        }
        return this
    }

    /**
     * Whether destroy() was called on this map.
     * @returns {boolean}
     */
    isDestroyed() {
        return !!this._destroyed
    }

    /**
     * Sets the size of the map, in pixels, and of its canvases. For a map whose size is set by what it is in: the canvas is cleared, and redraw() is up to the caller.
     * @param {number} w
     * @param {number} h
     * @returns {this}
     */
    setSize(w, h) {
        this.w = w
        this.h = h
        this.geoCanvas.w = w
        this.geoCanvas.h = h
        this.geoCanvas.offscreenCanvas.width = w
        this.geoCanvas.offscreenCanvas.height = h
        this.geoCanvas.canvas.setAttribute('width', '' + w)
        this.geoCanvas.canvas.setAttribute('height', '' + h)
        return this
    }

    /**
     * The geographical envelope of the last draw.
     * @returns {import('./GeoCanvas.js').Envelope|undefined}
     */
    getExtentGeo() {
        return this.geoCanvas.extGeo
    }

    /**
     * Cancels the redraw scheduled by redraw(), if there is one.
     * @returns {this}
     */
    cancelRedraw() {
        if (this._redrawFrame) cancelAnimationFrame(this._redrawFrame)
        this._redrawFrame = null
        return this
    }

    /**
     * Called by GPUGridRenderer.attach() and detach().
     * @param {import('./GPUGridRenderer.js').GPUGridRenderer|null} renderer
     * @returns {this}
     * @package
     */
    setGPURenderer(renderer) {
        this.gpuRenderer = renderer
        this.geoCanvas.gpuRenderer = renderer
        return this
    }

    /**
     * @protected
     * @returns {HTMLCanvasElement}
     */
    initialiseCanvas() {
        const canvas = document.createElement('canvas')
        canvas.classList.add('gridviz-canvas')
        canvas.setAttribute('width', '' + this.w)
        canvas.setAttribute('height', '' + this.h)
        this.container.appendChild(canvas)
        return canvas
    }

    initialiseLegend() {
        this.legend = select(this.container)
            .append('div') // Create a new container
            .attr('id', 'gridviz-legend')
            .classed('gridviz-legends', true)
            .style('position', 'absolute')
            .style('width', 'auto')
            .style('height', 'auto')
            .style('background', '#FFFFFF')
            //.style("padding", this.padding)
            .style('border', '1px solid #d5d5d5')
            .style('border-radius', '6px')
            .style('box-shadow', '0px 4px 6px rgba(0, 0, 0, 0.1), 0px 1px 3px rgba(0, 0, 0, 0.08)')
            .style('font-family', "'Helvetica Neue', Arial, Helvetica, sans-serif")
            .style('bottom', '15px')
            .style('right', '15px')
        //hide
        //.style("visibility", "hidden")
    }

    /**
     * Set/get layer stack.
     *
     * @param {undefined|import("./Layer.js").Layer|import("./Layer.js").Layer[]} layers
     * @returns { this | import("./Layer.js").Layer[] }
     */
    layers_(layers) {
        if (arguments.length === 0) return this.layers
        if (arguments.length === 1)
            if (Array.isArray(layers)) this.layers = layers
            else this.layers = [layers]
        else this.layers = arguments
        return this
    }

    /**
     * Redraws the map: at once, or, with the asyncRedraw option, once at the next
     * animation frame however many times it's called before then.
     * @returns {this} */
    redraw() {
        if (this.gpuRenderer && this.gpuRenderer.takesRedraw(this)) return this
        if (this.asyncRedraw) {
            if (!this._redrawFrame && !this._destroyed)
                this._redrawFrame = requestAnimationFrame(() => {
                    this._redrawFrame = null
                    this.redrawNow()
                })
            return this
        }
        return this.redrawNow()
    }

    /**
     * Redraws the map at once, whatever the asyncRedraw option (and cancels a scheduled redraw).
     * @returns {this} */
    redrawNow() {
        if (this._redrawFrame) cancelAnimationFrame(this._redrawFrame)
        this._redrawFrame = null
        // a destroyed map can still be asked to redraw by a dataset it shared (see destroy)
        if (this._destroyed) return this

        const gpuRenderer = this.gpuRenderer
        if (gpuRenderer) gpuRenderer.beginRedraw(this)

        //remove legend elements: the legends themselves only, not what is inside them
        //(a legend keeps its content while one of its swatches is hovered, see Style.updateLegends)
        //except the one being hovered, which would lose its mouseleave (see Legend.highlight)
        if (this.legend) {
            this.legend.selectAll(':scope > *:not([data-gridviz-hovered])').remove()
            // the legends of this draw are placed one after the other (see GridLayer.addLegends)
            this.legend.node()._gridvizLegendCursor = null
        }

        //clear
        this.geoCanvas.initCanvasTransform()
        this.geoCanvas.clear(this.geoCanvas.backgroundColor)

        const z = this.geoCanvas.view.z
        this.updateExtentGeo()

        const ctx = this.geoCanvas.offscreenCtx

        //go through the layers
        for (const layer of this.layers) {
            //check if layer is visible
            if (!isVisibleAt(layer, z)) continue

            //set layer alpha and blend mode
            if (layer.alpha || layer.blendOperation) {
                ctx.save()
                if (layer.alpha) ctx.globalAlpha = layer.alpha(z)
                if (layer.blendOperation) ctx.globalCompositeOperation = layer.blendOperation(z)
            }

            //set affin transform to draw with geographical coordinates
            this.geoCanvas.setCanvasTransform()

            //draw layer
            layer.draw(this.geoCanvas, this.legend)

            //draw layer filter
            if (layer.filterColor) layer.drawFilter(this.geoCanvas)

            //restore default alpha and blend operation
            if (layer.alpha || layer.blendOperation) ctx.restore()
        }

        // one drawImage call: draw the offscreen canvas to the main canvas
        this.geoCanvas.initCanvasTransform()
        this.geoCanvas.ctx.drawImage(this.geoCanvas.offscreenCanvas, 0, 0)

        this.canvasSave = null
        // the canvas holds no focus rectangle any more
        this._focusedCell = undefined

        // The mouse is on a cell: show its rectangle and its tooltip, in this very draw. The redraw cleared the rectangle,
        // which would stay away until the next mouse move: a flicker when the hover redraws the map (#174), or when the
        // map is scrolled or panned with the mouse over it. The cellInfoHTML of the layers is not called again for the cell
        // which is hovered already: it can ask for a redraw (to show the cells around the one hovered for example), which
        // would redraw for ever.
        if (!this._refocusing && !this.geoCanvas._isZooming) {
            const e = this.pointerEvent() || (this._hovering ? this._lastMouseEvent : null)
            if (e) {
                this._refocusing = true
                try {
                    this.refocusCell(e)
                } finally {
                    this._refocusing = false
                }
            }
        }

        // the legends are in the container now
        if (this.onLegendUpdate && this.legend) this.onLegendUpdate(this.legend.node())

        if (gpuRenderer) gpuRenderer.endRedraw(this)

        return this
    }

    /**
     * @param {number} marginPx
     * @returns {import('./GeoCanvas.js').Envelope}
     * @public
     */
    updateExtentGeo(marginPx = 20) {
        return this.geoCanvas.updateExtentGeo(marginPx)
    }

    /**
     * The geographical position of a mouse event, with the offset of the tooltip.
     * @param {MouseEvent} e
     * @returns {{x:number,y:number}}
     * @private */
    mousePositionGeo(e) {
        return {
            x: this.geoCanvas.pixToGeoX(e.offsetX + this.tooltip.xMouseOffset),
            y: this.geoCanvas.pixToGeoY(e.offsetY + this.tooltip.yMouseOffset),
        }
    }

    /**
     * The mouse event of the position of the mouse, when it is over the map: in the canvas, and not under something else of the
     * page (a panel, a button...). Null when the position of the mouse is not known, or not over the map.
     * @returns {{offsetX:number, offsetY:number, clientX:number, clientY:number}|null}
     * @private */
    pointerEvent() {
        const p = this._pointer
        if (!p) return null
        const canvas = this.geoCanvas.canvas
        const r = canvas.getBoundingClientRect()
        if (p.clientX < r.left || p.clientX >= r.right || p.clientY < r.top || p.clientY >= r.bottom) return null
        // (the root of the canvas is the document, or a shadow root when the map is in one)
        const root = canvas.getRootNode ? canvas.getRootNode() : document
        const top = (root.elementFromPoint ? root : document).elementFromPoint(p.clientX, p.clientY)
        if (top !== canvas) return null
        return { offsetX: p.clientX - r.left, offsetY: p.clientY - r.top, clientX: p.clientX, clientY: p.clientY }
    }

    /**
     * Shows again the hover of the mouse position after a redraw cleared it. When the mouse is still on the cell it was on,
     * its rectangle is drawn without asking its info again: the tooltip has it already, and cellInfoHTML is not called.
     * The info of another cell is asked for once.
     * @param {{offsetX:number, offsetY:number, clientX:number, clientY:number}} e
     * @private */
    refocusCell(e) {
        if (this.geoCanvas._isZooming || (this.hoverSuspended && this.hoverSuspended())) return
        const same = this.getCellFocusInfo(this.mousePositionGeo(e), false)
        if (!same) {
            // no cell here: nothing to show. Clear the hover which was, if any.
            this._triedKey = null
            this._triedSource = null
            if (this._hovering) this.focusCell(e)
            return
        }
        const key = cellKey(same)
        const source = { layer: same.layer, dataset: same.dataset }
        const sameSource = (o) => o && o.layer === source.layer && o.dataset === source.dataset
        if (key === this._hoverKey && sameSource(this._hoverSource)) this.focusCell(e, same)
        else if (!(key === this._triedKey && sameSource(this._triedSource))) {
            // another cell (the map moved, or the cells did, or the data): its info, once. When it has none the cell is not
            // hovered, and not asked again at the next redraw (until the mouse moves, the hover is ended by a pan, a zoom,
            // or the data changes).
            this.focusCell(e)
            this._triedKey = key
            this._triedSource = source
        }
    }

    /**
     * @param {MouseEvent} e
     * @param {{cell:import('./Dataset.js').Cell,html?:string,resolution:number}} [known] The cell under the mouse, when already found.
     * @returns {void} */
    focusCell(e, known) {
        // Don’t process hover events during active zoom
        if (this.geoCanvas._isZooming || (this.hoverSuspended && this.hoverSuspended())) return;

        // the mouse moved (or a redraw gave its cell, `known`): the info of the cells is asked again
        if (!known && !this._refocusing) {
            this._triedKey = null
            this._triedSource = null
        }

        /** @type {{cell:import('./Dataset.js').Cell,html?:string,resolution:number} | undefined} */
        const focus = known || this.getCellFocusInfo(this.mousePositionGeo(e))

        // Same cell as the one already highlighted (or still no cell): the canvas is right
        // as it is, only the tooltip follows the mouse. Saves a full-canvas copy per move.
        const focusedCell = focus ? focus.cell : null
        this._hovering = !!focus
        this._hoverKey = focus ? cellKey(focus) : null
        this._hoverSource = focus ? { layer: focus.layer, dataset: focus.dataset } : null
        if (focusedCell === this._focusedCell) {
            if (focus) {
                this.tooltip.setPosition(e)
                this.tooltip.show()
            } else this.tooltip.hide()
            return
        }
        this._focusedCell = focusedCell

        // Transparent background (Leaflet): redraw base, then draw focus rect directly on the visible canvas
        if (this.transparentBackground) {
            // Always restore the base (offscreen) into the visible canvas
            this.geoCanvas.initCanvasTransform();
            this.geoCanvas.ctx.clearRect(0, 0, this.w, this.h);
            this.geoCanvas.ctx.drawImage(this.geoCanvas.offscreenCanvas, 0, 0);

            if (focus) {
                if (focus.html !== undefined) this.tooltip.html(focus.html);
                this.tooltip.setPosition(e);
                this.tooltip.show();

                const rectWPix = this.selectionRectangleWidthPix
                    ? this.selectionRectangleWidthPix(focus.resolution, this.geoCanvas.view.z)
                    : 4;

                const ctx = this.geoCanvas.ctx; // draw directly on visible canvas
                ctx.save();
                ctx.strokeStyle = this.selectionRectangleColor;
                ctx.lineWidth = rectWPix;
                ctx.beginPath();
                // compute in pixel space (no geo transform on ctx)
                const xPix = this.geoCanvas.geoToPixX(focus.cell.x);
                const yPix = this.geoCanvas.geoToPixY(focus.cell.y);
                const wPix = focus.resolution / this.geoCanvas.view.z;
                const hPix = -wPix; // y axis inverted in geoToPix
                ctx.rect(
                    xPix - rectWPix / 2,
                    yPix + rectWPix / 2,
                    wPix + rectWPix,
                    hPix - rectWPix
                );
                ctx.stroke();
                ctx.restore();
            } else {
                this.tooltip.hide();
            }
            return; // handled
        }

        if (focus) {
            this.geoCanvas.canvas.style.cursor = 'pointer';
            if (focus.html !== undefined) this.tooltip.html(focus.html)
            this.tooltip.setPosition(e)
            this.tooltip.show()

            //show cell position as a rectangle
            if (!this.canvasSave) {
                this.canvasSave = document.createElement('canvas')
                this.canvasSave.setAttribute('width', '' + this.w)
                this.canvasSave.setAttribute('height', '' + this.h)
                this.canvasSave.getContext('2d')?.drawImage(this.geoCanvas.offscreenCanvas, 0, 0)
            } else {
                this.geoCanvas.offscreenCtx.drawImage(this.canvasSave, 0, 0)
            }

            //draw image saved + draw rectangle
            const rectWPix = this.selectionRectangleWidthPix
                ? this.selectionRectangleWidthPix(focus.resolution, this.geoCanvas.view.z)
                : 4
            this.geoCanvas.initCanvasTransform()
            const ctx = this.geoCanvas.offscreenCtx
            ctx.strokeStyle = this.selectionRectangleColor
            ctx.lineWidth = rectWPix
            ctx.beginPath()

            ctx.rect(
                this.geoCanvas.geoToPixX(focus.cell.x) - rectWPix / 2,
                this.geoCanvas.geoToPixY(focus.cell.y) + rectWPix / 2,
                focus.resolution / this.geoCanvas.view.z + rectWPix,
                -focus.resolution / this.geoCanvas.view.z - rectWPix
            )
            ctx.stroke()
            this.geoCanvas.ctx.drawImage(this.geoCanvas.offscreenCanvas, 0, 0)
        } else {
            this.geoCanvas.canvas.style.cursor = 'default';
            this.tooltip.hide()
            if (this.canvasSave) this.geoCanvas.ctx.drawImage(this.canvasSave, 0, 0)
        }
    }

    /**
     * Return the cell HTML info at a given geo position.
     * This is usefull for user interactions, to show this info where the user clicks for example.
     *
     * @param {{x:number,y:number}} posGeo
     * @param {boolean} [withHtml] False to find the cell without calling the cellInfoHTML of its layer: no html then.
     * @returns {{cell:import('./Dataset.js').Cell,html?:string,resolution:number} | undefined}
     * @protected
     */
    getCellFocusInfo(posGeo, withHtml = true) {

        // go through the layers, starting from top one
        const z = this.geoCanvas.view.z
        for (let i = this.layers.length - 1; i >= 0; i--) {

            /** @type {import("./Layer.js").Layer} */
            const layer = this.layers[i]

            if (!isVisibleAt(layer, z)) continue
            if (layer.cellInfoHTML === 'none') continue
            if (!layer.cellInfoHTML) continue
            if (!layer.getDataset) continue

            // get dataset
            const dsc = layer.getDataset(z)
            if (!dsc) continue

            //get cell at mouse position
            /** @type {import('./Dataset.js').Cell|undefined} */
            const cell = dsc.getCellFromPosition(posGeo, dsc.getViewCache())

            // no cell found at theis position for this layer
            if (!cell)
                // dig to the next layer below
                if (this.digForTooltip) continue
                // no tooltip to show
                else return undefined

            //rare case for a dataset with mixed resolutions
            if (dsc.mixedResolution) {
                const r = +dsc.mixedResolution(cell)
                const html = withHtml ? layer.cellInfoHTML(cell, r) : undefined
                if (withHtml && !html) return undefined
                return { cell: cell, html: html, resolution: r, layer: layer, dataset: dsc }
            }

            const html = withHtml ? layer.cellInfoHTML(cell, dsc.getResolution()) : undefined
            if (withHtml && !html) return undefined
            return { cell: cell, html: html, resolution: dsc.getResolution(), layer: layer, dataset: dsc }
        }
    }

    /**
     * @param {number} x
     * @param {number} y
     * @param {number|undefined} z
     */
    setView(x, y, z = undefined) {
        this.geoCanvas.view.x = x
        this.geoCanvas.view.y = y
        if (z != undefined) this.geoCanvas.view.z = z
        return this
    }

    /** @returns {import('./GeoCanvas.js').View} */
    getView() {
        return this.geoCanvas.view
    }

    /** @returns {number} */
    getZoom() {
        return this.geoCanvas.view.z
    }
    /** @param {number} z @returns {this} */
    setZoom(z) {
        this.geoCanvas.view.z = z
        return this
    }

    /** @returns {Array.<number|undefined>} */
    getCenterExtent() {
        return this.geoCanvas.getCenterExtent()
    }
    /** @param {Array.<number>} val @returns {this} */
    setCenterExtent(val) {
        this.geoCanvas.setCenterExtent(val)
        return this
    }

    /** @returns {Array.<number>|undefined} */
    getViewExtent() {
        return this.geoCanvas.getViewExtent()
    }
    /**
     * Limits what the user can see: the borders of the view stay within this extent.
     * @param {Array.<number>|undefined} val [xMin, yMin, xMax, yMax]
     * @returns {this}
     */
    setViewExtent(val) {
        this.geoCanvas.setViewExtent(val)
        return this
    }

    /** @returns {Array.<number>} */
    getZoomExtent() {
        return this.geoCanvas.getZoomExtent()
    }
    /** @param {Array.<number>} val @returns {this} */
    setZoomExtent(val) {
        this.geoCanvas.setZoomExtent(val)
        return this
    }

    /** @returns {string} */
    getBackgroundColor() {
        return this.geoCanvas.backgroundColor
    }
    /** @param {string} val @returns {this} */
    setBackgroundColor(val) {
        this.geoCanvas.backgroundColor = val
        return this
    }

    /**
     * Adds a set of zoom buttons to the map
     *
     * @param {object} opts
     * @returns {this}
     */
    addZoomButtons(opts) {
        // * opts.id
        // * opts.onZoom - custom event handler function
        // * opts.x
        // * opts.y
        // * opts.delta - zoom delta applied on each click

        this.zoomButtons = new ZoomButtons({
            map: this,
            id: opts?.id || 'gridviz-zoom-buttons-' + this.container.id,
            class: opts?.class,
            x: opts?.x,
            y: opts?.y,
            onZoom: opts?.onZoom,
            delta: opts?.delta || 0.2,
        })

        return this
    }

    /**
     * Adds a fullscreen toggle button to the app
     *
     * @param {object} opts
     * @returns {this}
     */
    addFullscreenButton(opts) {
        // * opts.map - the gridviz map
        // * opts.id
        // * opts.x
        // * opts.y

        this.fullscreenButton = new FullscreenButton({
            map: this,
            id: opts?.id || 'gridviz-fullscreen-button',
            class: opts?.class,
            x: opts?.x,
            y: opts?.y,
        })

        return this
    }

    /** @returns {this} */
    setViewFromURL() {
        this.geoCanvas.setViewFromURL()
        return this
    }

    /**
     * @description Add a resize event observer to the Apps container and update the canvas accordingly
     * @memberof App
     */
    defineResizeObserver() {
        // Track whether the observer is currently processing a resize event
        let resizePending = false

        const resizeObserver = new ResizeObserver((entries) => {
            if (!Array.isArray(entries) || !entries.length) return

            let container = this.container

            // Ensure the container has valid dimensions
            if (container.clientWidth > 0 && container.clientHeight > 0) {
                if (!resizePending) {
                    resizePending = true // Prevent overlapping resize triggers

                    window.requestAnimationFrame(() => {
                        resizePending = false // Reset the flag after processing

                        // Check for size changes
                        if (this.h !== container.clientHeight || this.w !== container.clientWidth) {
                            this.h = container.clientHeight
                            this.w = container.clientWidth

                            // Update geoCanvas sizes
                            this.geoCanvas.h = this.h
                            this.geoCanvas.w = this.w
                            this.geoCanvas.canvas.setAttribute('width', String(this.w))
                            this.geoCanvas.canvas.setAttribute('height', String(this.h))
                            this.geoCanvas.offscreenCanvas.setAttribute('width', String(this.w))
                            this.geoCanvas.offscreenCanvas.setAttribute('height', String(this.h))

                            this.redraw()

                            // Optionally reposition UI elements
                            // if (this.zoomButtons) this.zoomButtons.node.style.left = this.w - 50 + 'px';
                            // if (this.fullscreenButton) this.fullscreenButton.node.style.left = this.w - 50 + 'px';
                        }
                    })
                }
            }
        })

        resizeObserver.observe(this.container)
        /** @private */
        this._resizeObserver = resizeObserver
    }

    /**
     * @description Destroy the map and it's event listeners
     * This should significantly reduce the memory used when creating and destroying gridviz map instances (for example in leaflet-gridviz)
     * @memberof App
     */
    destroy() {
        if (this.gpuRenderer) this.gpuRenderer.detach(this)
        this._destroyed = true

        // clear layers
        this.layers = []
        this.bgLayers = []

        // cancel scheduled work
        if (this._redrawFrame) cancelAnimationFrame(this._redrawFrame)
        this._redrawFrame = null
        if (this._focusFrame) cancelAnimationFrame(this._focusFrame)
        this._focusFrame = null

        // stop observing the container: the observer would otherwise keep this map alive
        if (this._resizeObserver) this._resizeObserver.disconnect()
        this._resizeObserver = null

        // remove event listeners, from the window and from the canvas they were added to
        for (const type of ['mousemove', 'mousedown', 'wheel'])
            window.removeEventListener(type, this._pointerHandler, { capture: true })
        window.removeEventListener('mouseout', this._pointerLeaveHandler, { capture: true })
        this.geoCanvas.canvas.removeEventListener('mouseover', this.mouseOverHandler)
        this.geoCanvas.canvas.removeEventListener('mousemove', this.mouseMoveHandler)
        this.geoCanvas.canvas.removeEventListener('mouseout', this.mouseOutHandler)

        // remove canvas
        this.geoCanvas.canvas.remove()

        // remove legend
        // only remove legend if gridviz created it
        if (!this._legendProvidedByUser) {
            this.legend?.remove()
        }

        // remove tooltip
        this.tooltip.tooltip?.remove()
    }
}
