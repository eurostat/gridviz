//@ts-check
'use strict'

import { Layer } from '../core/Layer.js'
import { json } from 'd3-fetch'

/**
 * @module layer
 * @author Joseph Davies, Julien Gaffuri
 */
export class GeoJSONLayer extends Layer {
    /**
     * @param {object} opts
     */
    constructor(opts) {
        super(opts)
        opts = opts || {}

        /**
         * @private
         * @type {string} */
        this.url = opts.url

        /**
         * A preprocess to run on each feature after loading.
         * It can be used to apply some specific treatment before, format the label data, project coordinates, etc.
         * Return false if the label should not be kept.
         * @private
         * @type {function(object):boolean} */
        this.preprocess = opts.preprocess

        //for points
        /**
         * @private
         * @type {function(object,number):string} */
        this.shape = opts.shape || ((f, z) => 'circle')
        /**
         * In pixel
         * @private
         * @type {function(object,number):number} */
        this.size = opts.size || ((f, z) => 10)
        /**
         * @private
         * @type {function(object,number):string} */
        this.strokeStyle = opts.strokeStyle || ((f, z) => 'red')
        /**
         * @private
         * @type {function(object,number):string} */
        this.fillStyle = opts.fillStyle || ((f, z) => 'black')
        /**
         * In pixel
         * @private
         * @type {function(object,number):number} */
        this.lineWidth = opts.lineWidth || ((f, z) => 2)

        //for lines

        /**
         * @private
         * @type {function(object,number):string} */
        this.color = opts.color || ((f, z) => 'gray')
        /**
         * In pixel
         * @private
         * @type {function(object,number):number} */
        this.width = opts.width || ((f, z) => 2)
        /**
         * @private
         * @type {function(object,number):Array.<number>|undefined} */
        this.lineDash = opts.lineDash || ((f, z) => undefined)

        /**
         * @private
         * @type {Array.<object> | undefined} */
        this.fs = undefined

        /**
         * @private
         * @type {string} */
        this.loadingStatus = 'notLoaded'
    }

    /**
     * Draw the layer.
     * @param {import("../core/GeoCanvas.js").GeoCanvas} geoCanvas The canvas where to draw the layer.
     * @returns {void}
     */
    draw(geoCanvas) {
        //load data, if not done yet.
        if (!this.fs) {
            this.load(geoCanvas.redraw)
            return
        }

        //
        const z = geoCanvas.view.z
        const ctx = geoCanvas.offscreenCtx

        // draw each feature
        for (const f of this.fs)
            this.drawGeometry(f, f.geometry, f.geometry.type, z, ctx)

    }

    /**
     * @private
     * Draw a geometry on the canvas, according to its type and the layer style.
     * @param {object} f The feature to draw
     * @param {object} geom The geometry of the feature to draw
     * @param {string} gt The geometry type (e.g. 'Point', 'LineString', etc.)
     * @param {number} z The current zoom level of the map
     * @param {CanvasRenderingContext2D} ctx The canvas context to draw on
     * @returns {void}
     */
    drawGeometry(f, geom, gt, z, ctx) {
        if (gt == 'Point' || gt == 'MultiPoint') {

            //get style parameters for the point feature
            const shape = this.shape(f, z)
            if (!shape || shape == 'none') return
            console.log('shape:', shape, 'name', f.properties.name)
            const size = this.size(f, z) * z
            if (!size) return

            const strokeStyle = this.strokeStyle(f, z)
            const fillStyle = this.fillStyle(f, z)
            const lineWidth = this.lineWidth(f, z) * z

            //set canvas drawing parameters
            ctx.save()
            if (strokeStyle) ctx.strokeStyle = strokeStyle
            if (fillStyle) ctx.fillStyle = fillStyle
            if (lineWidth) ctx.lineWidth = lineWidth

            let cs = geom.coordinates
            if (gt == 'Point') cs = [cs]

            if (shape == 'circle') {
                //draw circle - fill and stroke
                for (const c of cs) {
                    ctx.beginPath()
                    ctx.arc(c[0], c[1], size / 2, 0, 2 * Math.PI, false)
                    if (fillStyle) ctx.fill()
                    if (strokeStyle && lineWidth) ctx.stroke()
                }
            } else if (shape == 'square') {
                //draw square - fill and stroke
                for (const c of cs) {
                    ctx.beginPath()
                    ctx.rect(c[0] - size / 2, c[1] - size / 2, size, size)
                    if (fillStyle) ctx.fill()
                    if (strokeStyle && lineWidth) ctx.stroke()
                }
            } else {
                console.error('Unexpected shape for point geojson: ' + shape)
            }
            ctx.restore()

        } else if (gt == 'LineString' || gt == 'MultiLineString') {

            const col = this.color(f, z)
            if (!col || col === 'none') return

            const wP = this.width(f, z)
            if (!wP || wP < 0) return

            ctx.save()
            ctx.strokeStyle = col
            ctx.lineWidth = wP * z
            ctx.setLineDash(this.lineDash(f, z) || [])

            //
            const css = gt === 'LineString' ? [geom.coordinates] : geom.coordinates

            for (const cs of css) {
                if (cs.length < 2) continue
                ctx.beginPath()
                ctx.moveTo(cs[0][0], cs[0][1])
                for (let i = 1; i < cs.length; i++) ctx.lineTo(cs[i][0], cs[i][1])
                ctx.stroke()
            }

            ctx.restore()

        } else if (gt == 'Polygon' || gt == 'MultiPolygon') {
            ctx.save()

            // A Polygon is [ outerRing, ...holes ]. A MultiPolygon is [ [ outerRing, ...holes ], ... ]
            const polygons = gt === 'Polygon' ? [geom.coordinates] : geom.coordinates

            ctx.beginPath()

            for (const rings of polygons) {
                for (const cs of rings) {
                    if (cs.length < 2) continue
                    ctx.moveTo(cs[0][0], cs[0][1])
                    for (let i = 1; i < cs.length; i++) ctx.lineTo(cs[i][0], cs[i][1])
                    ctx.closePath()
                }
            }

            // Fill
            const col = this.color(f, z)
            if (col && col !== 'none') {
                ctx.fillStyle = col
                ctx.fill('evenodd')         // even-odd punches holes correctly regardless of ring winding order
            }

            // Stroke (optional, only if style provides a width)
            const wP = this.width(f, z)
            if (wP && wP > 0) {
                const strokeCol = this.strokeColor?.(f, z) ?? col
                if (strokeCol && strokeCol !== 'none') {
                    ctx.strokeStyle = strokeCol
                    ctx.lineWidth = wP * z
                    ctx.setLineDash(this.lineDash?.(f, z) || [])
                    ctx.stroke()
                }
            }
            ctx.restore()

        } else if (gt == 'GeometryCollection') {
            //recursive call for each geometry in the collection
            for (const g of geom.geometries)
                this.drawGeometry(f, g, g.type, z, ctx)

        } else {
            console.log('Unexpected geometry type in GeoJSONLayer: ' + gt)
        }
    }

    /**
     * Load data for labels, from URL this.url
     * @param {function():void} callback
     * @private
     */
    async load(callback) {
        if (!this.url) {
            console.log('Failed loading boundaries: No URL specified. ' + this.url)
            this.loadingStatus = 'failed'
            this.labels = []
            return
        }

        //check if data already loaded
        if (this.loadingStatus != 'notLoaded') return

        //load data
        this.loadingStatus = 'loading'

        try {
            const data_ = await json(this.url)

            /** @type { Array.<object> } */
            const data = data_.features

            //preprocess/filter
            if (this.preprocess) {
                this.fs = []
                for (const c of data) {
                    const b = this.preprocess(c)
                    if (b == false) continue
                    this.fs.push(c)
                }
            } else {
                //store labels
                this.fs = data
            }

            this.loadingStatus = 'loaded'

            //redraw
            if (callback) callback()
        } catch (error) {
            console.log('Failed loading boundaries from ' + this.url)
            this.fs = []
            this.loadingStatus = 'failed'
        }
    }
}
