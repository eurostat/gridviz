//@ts-check
'use strict'

import { Style } from '../core/Style.js'

/**
 * @author Julien Gaffuri
 */
export class PillarStyle extends Style {
    //TODO make a webGL version ?

    /** @param {object} opts */
    constructor(opts) {
        super(opts)
        opts = opts || {}

        /** @type {string} */
        this.heightCol = opts.heightCol

        /** A function returning the height of the line representing a cell, in geo unit
         * @type {function(number,number,import("../Style").Stat|undefined,number):number} */
        this.height = opts.height

        /** @type {string} */
        this.colorCol = opts.colorCol

        /** A function returning the color of the line representing a cell.
         * @type {function(number,number,import("../Style").Stat|undefined):string} */
        this.color = opts.color || (() => '#c08c59') //bb

        /** @type {string} */
        this.widthCol = opts.widthCol

        /** A function returning the width of the line representing a cell, in geo unit
         * @type {function(number,number,import("../Style").Stat|undefined,number):number} */
        this.width = opts.width || ((v, r) => 0.5 * r)

        /** @type {boolean} */
        this.simple = opts.simple == true

        /** @type {number} */
        this.viewHeightFactor = opts.viewHeightFactor || 1.5
        //0,0 is the center
        /** @type {number} */
        this.viewSX = opts.viewSX == undefined ? 0 : opts.viewSX
        /** @type {number} */
        this.viewSY = opts.viewSY == undefined ? -0.5 : opts.viewSY

        //TODO replace with sun location ?
        /** @type {number} */
        this.shadowDirection =
            opts.shadowDirection == undefined ? (-40.3 * Math.PI) / 180.0 : opts.shadowDirection
        /** @type {number} */
        this.shadowFactor = opts.shadowFactor || 0.3
        /** @type {string} */
        this.shadowColor = opts.shadowColor || '#00000033'

        /** @type {string} */
        this.outlineCol = opts.outlineCol || '#FFFFFF'
        /** @type {number} */
        this.outlineWidthPix = opts.outlineWidthPix == undefined ? 0.5 : opts.outlineWidthPix
    }

    /**
     * Draw cells as segments.
     *
     * @param {Array.<import("../Dataset").Cell>} cells
     * @param {import("../GeoCanvas").GeoCanvas} geoCanvas
     * @param {number} resolution
     */
    draw(cells, geoCanvas, resolution) {
        //filter
        if (this.filter) cells = cells.filter(this.filter)

        //
        const z = geoCanvas.view.z

        let statHeight
        if (this.heightCol) {
            //compute size variable statistics
            statHeight = Style.getStatistics(cells, (c) => c[this.heightCol], true)
        }

        let statColor
        if (this.colorCol) {
            //compute color variable statistics
            statColor = Style.getStatistics(cells, (c) => c[this.colorCol], true)
        }

        let statWidth
        if (this.widthCol) {
            //and compute size variable statistics
            statWidth = Style.getStatistics(cells, (c) => c[this.widthCol], true)
        }

        //get view center geo position
        const cvx = geoCanvas.view.x + this.viewSX * geoCanvas.w * z
        const cvy = geoCanvas.view.y + this.viewSY * geoCanvas.h * z
        //get view height
        const H = this.viewHeightFactor * (geoCanvas.w + geoCanvas.h) * 0.5 * z

        //sort cells by y and x
        //const distToViewCenter = (c) => { const dx = cvx - c.x, dy = cvy - c.y; return Math.sqrt(dx * dx + dy * dy) }
        cells.sort((c1, c2) => 100000000 * (c2.y - c1.y) + c1.x - c2.x)

        geoCanvas.ctx.lineCap = this.simple ? 'butt' : 'round'

        //draw shadows
        geoCanvas.ctx.strokeStyle = this.shadowColor
        geoCanvas.ctx.fillStyle = this.shadowColor
        for (let c of cells) {
            //width
            /** @type {number|undefined} */
            const wG = this.width ? this.width(c[this.widthCol], resolution, statWidth, z) : undefined
            if (!wG || wG < 0) continue

            //height
            /** @type {number|undefined} */
            const hG = this.height ? this.height(c[this.heightCol], resolution, statHeight, z) : undefined
            if (!hG || hG < 0) continue

            //get offset
            //TODO use that
            const offset = this.offset(c, resolution, z)

            //set width
            geoCanvas.ctx.lineWidth = wG

            //compute cell centre postition
            const cx = c.x + resolution / 2
            const cy = c.y + resolution / 2
            const ls = hG * this.shadowFactor

            //draw segment
            geoCanvas.ctx.beginPath()
            geoCanvas.ctx.moveTo(cx, cy)
            geoCanvas.ctx.lineTo(cx + ls * Math.cos(this.shadowDirection), cy + ls * Math.sin(this.shadowDirection))
            geoCanvas.ctx.stroke()

            /*
            if (this.simple) {
                //draw base circle
                cg.ctx.beginPath();
                cg.ctx.arc(
                    cx, cy,
                    wG * 0.5,
                    0, 2 * Math.PI, false);
                //cg.ctx.stroke();
                cg.ctx.fill();
            }*/
        }

        //draw pillars
        for (let c of cells) {
            //color
            /** @type {string|undefined} */
            const col = this.color ? this.color(c[this.colorCol], resolution, statColor) : undefined
            if (!col) continue

            //width
            /** @type {number|undefined} */
            const wG = this.width ? this.width(c[this.widthCol], resolution, statWidth, z) : undefined
            if (!wG || wG < 0) continue

            //height
            /** @type {number|undefined} */
            const hG = this.height ? this.height(c[this.heightCol], resolution, statHeight, z) : undefined
            if (!hG || hG < 0) continue

            //get offset
            //TODO use that
            const offset = this.offset(c, resolution, z)

            //compute cell centre postition
            const cx = c.x + resolution / 2
            const cy = c.y + resolution / 2

            //compute angle
            const dx = cx - cvx,
                dy = cy - cvy
            const a = Math.atan2(dy, dx)
            const D = Math.sqrt(dx * dx + dy * dy)
            const d = (D * hG) / (H - hG)

            if (this.simple) {
                //draw segment
                geoCanvas.ctx.strokeStyle = col
                geoCanvas.ctx.lineWidth = wG
                geoCanvas.ctx.beginPath()
                geoCanvas.ctx.moveTo(cx, cy)
                geoCanvas.ctx.lineTo(cx + d * Math.cos(a), cy + d * Math.sin(a))
                geoCanvas.ctx.stroke()
            } else {
                //draw background segment
                geoCanvas.ctx.strokeStyle = this.outlineCol
                geoCanvas.ctx.lineWidth = wG + 2 * this.outlineWidthPix * z
                geoCanvas.ctx.beginPath()
                geoCanvas.ctx.moveTo(cx, cy)
                geoCanvas.ctx.lineTo(cx + d * Math.cos(a), cy + d * Math.sin(a))
                geoCanvas.ctx.stroke()

                //draw segment
                geoCanvas.ctx.strokeStyle = col
                geoCanvas.ctx.lineWidth = wG
                geoCanvas.ctx.beginPath()
                geoCanvas.ctx.moveTo(cx, cy)
                geoCanvas.ctx.lineTo(cx + d * Math.cos(a), cy + d * Math.sin(a))
                geoCanvas.ctx.stroke()

                //draw top circle
                geoCanvas.ctx.strokeStyle = this.outlineCol
                //cg.ctx.fillStyle = "#c08c59"
                geoCanvas.ctx.lineWidth = this.outlineWidthPix * z
                geoCanvas.ctx.beginPath()
                geoCanvas.ctx.arc(cx + d * Math.cos(a), cy + d * Math.sin(a), wG * 0.5, 0, 2 * Math.PI, false)
                geoCanvas.ctx.stroke()
                //cg.ctx.fill();
            }
        }

        //in case...
        geoCanvas.ctx.lineCap = 'butt'

        //update legends
        this.updateLegends({ style: this, r: resolution, z: z, sColor: statColor })
    }
}
