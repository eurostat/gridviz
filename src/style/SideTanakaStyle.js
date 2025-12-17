//@ts-check
'use strict'

import { Style } from '../core/Style.js'
import { SideStyle } from './SideStyle.js'

/** @typedef {{ x:number, y:number, or:"v"|"h", c1:(import('../core/Dataset.js').Cell)|undefined, c2:(import('../core/Dataset.js').Cell)|undefined }} Side */

/**
 * @typedef {function(Array.<Side>,number, number):*} SideViewScale */

/**
 * @module style
 * @author Julien Gaffuri
 */
export class SideTanakaStyle extends Style {
    /** @param {object} opts */
    constructor(opts = {}) {
        super(opts)

        /** A function returning the cells classifier.
         * The cell classifier is a function that for each cell returns its class number (int).
        */
        this.classifier = opts.classifier || ((cells, resolution, z) => c => 1)

        /** A function returning the width of a cell side, in geo unit
         * @type {function(Side, number, number, number, object):number} */
        this.width = opts.width || ((side, sideValue, resolution, z, sidesScale) => Math.abs(sideValue) * Math.min(2 * z, resolution / 3))

        /** A function returning the length of a cell side, in geo unit
         * @type {function(Side, number, number, object):number} */
        this.length = opts.length || ((side, resolution, z, sidesScale) => resolution)

        // the dark color: for side facing away from light (coming from NW)
        this.colorDark = opts.colorDark || '#111'
        // the bright color: for side facing the light (coming from NW)
        this.colorBright = opts.colorBright || '#ddd'
        //
        this.revert = opts.revert == undefined? false : opts.revert

        /** Set to A or true so that the side is drawn as a diamond */
        this.diamond = opts.diamond

        /* Determines what to do for limit sides, between a cell with value and one with no value
        * steep: the cell value absence is equivalent to 0. It shows potentially a steep limit then.
        * skip: no side is drawn
        * step: a side with a 1 step */
        this.limit = opts.limit || "steep"
    }

    /**
     * @param {Array.<import("../core/Dataset.js").Cell>} cells
     * @param {number} resolution
     * @param {import("../core/GeoCanvas.js").GeoCanvas} geoCanvas
     */
    draw(cells, geoCanvas, resolution) {
        //filter
        if (this.filter) cells = cells.filter(this.filter)

        //
        const z = geoCanvas.view.z
        const ctx = geoCanvas.offscreenCtx

        //get cell classifier
        const classifier = this.classifier(cells, resolution, z)

        //get side value: class change difference
        const getSideValue = (/** @type {{ c1: Side; c2: Side; }} */ side) => {
            const cl1 = side.c1 ? classifier(side.c1) : undefined
            const cl2 = side.c2 ? classifier(side.c2) : undefined
            if (cl1 === undefined && cl2 === undefined) return undefined
            if (cl1 === undefined) return this.limit=="none"? undefined : this.limit=="steep"? cl2 : Math.sign(cl2)
            if (cl2 === undefined) return this.limit=="none"? undefined : this.limit=="steep"? -cl1 : Math.sign(-cl1)
            return cl2 - cl1
        }

        //build sides
        //TODO build only those with different codes ?
        /**  @type {Array.<Side>} */
        const sides = SideStyle.buildSides(cells, resolution)
        if (sides.length == 0) return

        //get side view scale
        const viewScale = this.viewScale ? this.viewScale(sides, resolution, z) : undefined

        //draw sides
        ctx.lineCap = 'butt'
        const r2 = resolution * 0.5
        const cd = this.revert? this.colorBright : this.colorDark
        const cb = this.revert? this.colorDark : this.colorBright
        for (let side of sides) {

            //get side value
            const v = getSideValue(side)
            if (v === undefined || v === 0) continue

            //color
            /** @type {string|undefined} */
            const col = ((v < 0 && side.or === 'h') || (v > 0 && side.or === 'v')) ? cb : cd
            if (!col || col == 'none') continue

            if (this.diamond) {
                //set color
                ctx.fillStyle = col

                //draw diamond
                const x = side.x,
                    y = side.y
                ctx.beginPath()
                ctx.moveTo(x - r2, y)
                ctx.lineTo(x, y + r2)
                ctx.lineTo(x + r2, y)
                ctx.lineTo(x, y - r2)
                ctx.closePath()
                ctx.fill()
            } else {
                //width
                /** @type {number|undefined} */
                const wG = this.width ? this.width(side, v, resolution, z, viewScale) : undefined
                if (!wG || wG <= 0) continue

                //length
                /** @type {number|undefined} */
                const lG = this.length ? this.length(side, resolution, z, viewScale) : undefined
                if (!lG || lG <= 0) continue
                const lG2 = lG * 0.5

                //set width
                ctx.lineWidth = wG
                //set color
                ctx.strokeStyle = col

                //draw segment with correct orientation
                const x = side.x,
                    y = side.y
                ctx.beginPath()
                if (side.or === 'v') {
                    ctx.moveTo(x, y - lG2)
                    ctx.lineTo(x, y + lG2)
                } else {
                    ctx.moveTo(x - lG2, y)
                    ctx.lineTo(x + lG2, y)
                }
                ctx.stroke()
            }
        }

        //update legends
        this.updateLegends({ style: this, resolution: resolution, z: z, viewScale: viewScale })
    }

}
