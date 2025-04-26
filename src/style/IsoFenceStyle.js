//@ts-check
'use strict'

import { Style } from '../core/Style.js'
import { SideStyle } from './SideStyle.js'

/** @typedef {{x:number,y:number,or:"v"|"h",c1:import('../core/Dataset.js').Cell|undefined,c2:import('../core/Dataset.js').Cell|undefined}} Side */

/**
 * @module style
 * @author Julien Gaffuri
 */
export class IsoFenceStyle extends Style {
    /** @param {object} opts */
    constructor(opts) {
        super(opts)
        opts = opts || {}

        /**
         * The dictionary (string -> color) which give the color of each category.
         * @type {object} */
        this.color = opts.color

        /** A function returning the height of a cell in geographical unit.
         * @type {function(import('../core/Dataset.js').Cell, number, number, object):number} */
        this.height = opts.height || ((cell, resolution, z, viewScale) => resolution * 0.4)

        /** The perspective angle, in degree, within [-180,180], from [O,x] axis.
         * @type {number} */
        this.angle = opts.angle != undefined ? opts.angle : 50

        /** A function returning the corner line stroke style.
         * @type {function(import('../core/Dataset.js').Cell,number,number,number):string} */
        this.cornerLineStrokeColor = opts.cornerLineStrokeColor || ((c, r, z, angle) => '#999')

        /** A function returning the corner line width.
         * @type {function(import('../core/Dataset.js').Cell,number,number,number):number} */
        this.cornerLineWidth = opts.cornerLineWidth || ((c, r, z, angle) => (angle % 90 == 0 ? 0 : 0.8 * z))

        /**
         * Show vertical cross-sections.
         * @type {boolean} */
        this.sVert = opts.sVert != undefined ? opts.sVert : true

        /**
         * Show horizontal cross-sections.
         * @type {boolean} */
        this.sHor = opts.sHor != undefined ? opts.sHor : true
    }

    /**
     * @param {Array.<import("../core/Dataset.js").Cell>} cells
     * @param {import("../core/GeoCanvas.js").GeoCanvas} geoCanvas
     * @param {number} resolution
     * @override
     */
    draw(cells, geoCanvas, resolution) {
        //filter
        if (this.filter) cells = cells.filter(this.filter)

        //
        const z = geoCanvas.view.z
        const ctx = geoCanvas.offscreenCtx

        //get view scale
        const viewScale = this.viewScale ? this.viewScale(cells, resolution, z) : undefined

        //nb categories - used for radar and agepyramid
        const cats = Object.keys(this.color)

        //half resolution
        const r2 = resolution / 2

        //get offset
        // @ts-ignore
        const offset = this.offset(undefined, resolution, z),
            dx = offset.dx,
            dy = offset.dy

        //make sides
        /**  @type {Array.<Side>} */
        const sides = SideStyle.buildSides(
            cells,
            resolution,
            this.angle % 180 != 90 && this.sVert,
            this.angle % 180 != 0 && this.sHor
        )

        //
        if (sides.length == 0) return

        //angle in radians
        const aRad = (this.angle * Math.PI) / 180,
            cos = Math.cos(aRad),
            sin = Math.sin(aRad)

        //sort sides so that the back ones are drawn first. This depends on the angle.
        //depending on distance to the reference corner point
        const xCorner = Math.abs(this.angle) < 90 ? geoCanvas.extGeo.xMin : geoCanvas.extGeo.xMax
        const yCorner = this.angle < 0 ? geoCanvas.extGeo.yMax : geoCanvas.extGeo.yMin
        sides.sort(
            (s1, s2) =>
                Math.hypot(s2.x - xCorner, s2.y - yCorner) - Math.hypot(s1.x - xCorner, s1.y - yCorner)
        )

        //prepare function to draw corner line for a cell *c*
        const drawCornerLine = (cell) => {
            if (!cell) return
            //line style
            const lw = this.cornerLineWidth ? this.cornerLineWidth(cell, resolution, z, this.angle) : 0.8 * z
            if (lw == 0) return
            ctx.strokeStyle = this.cornerLineStrokeColor
                ? this.cornerLineStrokeColor(cell, resolution, z, this.angle)
                : '#333'
            ctx.lineWidth = lw

            //height - in geo
            const hG = this.height(cell, resolution, z, viewScale)

            //draw line
            ctx.beginPath()
            ctx.moveTo(cell.x + r2 + dx, cell.y + r2 + dy)
            ctx.lineTo(cell.x + r2 + hG * cos + dx, cell.y + r2 + hG * sin + dy)
            ctx.stroke()
        }

        //draw sides
        ctx.lineCap = 'round'
        for (let side of sides) {
            const c1 = side.c1,
                c2 = side.c2,
                x = side.x,
                y = side.y

            //heights - in geo
            const hG1 = c1 ? this.height(c1, resolution, z, viewScale) : 0,
                hG2 = c2 ? this.height(c2, resolution, z, viewScale) : 0

            //compute totals for both cells
            const total1 = computeTotal(c1, cats),
                total2 = computeTotal(c2, cats)
            if (total1 == 0 && total2 == 0) continue

            let cumul1 = 0,
                cumul2 = 0
            for (let [column, color] of Object.entries(this.color)) {
                //draw stripe of side s and category column

                //get values for both cells
                let v1 = c1 ? +c1[column] : 0
                let v2 = c2 ? +c2[column] : 0
                if (v1 == 0 && v2 == 0) continue

                //compute heights
                const h1 = (hG1 * cumul1) / total1 || 0
                const h1n = (hG1 * (cumul1 + v1)) / total1 || 0
                const h2 = (hG2 * cumul2) / total2 || 0
                const h2n = (hG2 * (cumul2 + v2)) / total2 || 0

                //make path
                ctx.beginPath()
                if (side.or == 'h') {
                    //horizontal side - vertical section
                    //bottom left
                    ctx.moveTo(x + h1 * cos + dx, y - r2 + h1 * sin + dy)
                    //top left
                    ctx.lineTo(x + h2 * cos + dx, y + r2 + h2 * sin + dy)
                    //top right
                    ctx.lineTo(x + h2n * cos + dx, y + r2 + h2n * sin + dy)
                    //bottom right
                    ctx.lineTo(x + h1n * cos + dx, y - r2 + h1n * sin + dy)
                } else {
                    //vertical side - horizontal section
                    //bottom left
                    ctx.moveTo(x - r2 + h1 * cos + dx, y + h1 * sin + dy)
                    //bottom right
                    ctx.lineTo(x + r2 + h2 * cos + dx, y + h2 * sin + dy)
                    //top right
                    ctx.lineTo(x + r2 + h2n * cos + dx, y + h2n * sin + dy)
                    //top left
                    ctx.lineTo(x - r2 + h1n * cos + dx, y + h1n * sin + dy)
                }
                //cg.ctx.closePath()

                //fill
                ctx.fillStyle = color
                ctx.fill()

                cumul1 += v1
                cumul2 += v2

                //TODO draw only one line
                //draw corner line
                //if (side.or == "h") {
                drawCornerLine(c1)
                drawCornerLine(c2)
                //if (this.angle > 0 && side.or == "h") drawCornerLine(c2)
                //else drawCornerLine(c2)
                //}
            }
        }

        //update legends
        this.updateLegends({ style: this, resolution: resolution, z: z, viewScale: viewScale })
    }
}

const computeTotal = (cell, categories) => {
    if (!cell) return 0
    let total = 0
    for (let column of categories) {
        const v = cell[column]
        if (!v) continue
        total += +v
    }
    return total || 0
}
