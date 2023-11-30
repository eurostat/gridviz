//@ts-check
'use strict'

import { Style } from '../core/Style.js'

/**
 *
 * @author Julien Gaffuri
 */
export class TextStyle extends Style {
    /** @param {object} opts */
    constructor(opts) {
        super(opts)
        opts = opts || {}

        /** The name of the column/attribute of the tabular data where to retrieve the variable for text.
         * @type {string} */
        this.textCol = opts.textCol

        /** A function returning the text of a cell.
         * @type {function(number,number,import("../core/Style").Stat|undefined,number):string} */
        this.text = opts.text || ((v, r, s, z) => 'X')

        /** The name of the column/attribute of the tabular data where to retrieve the variable for color.
         * @type {string} */
        this.colorCol = opts.colorCol

        /** A function returning the color of the cell.
         * @type {function(number,number,import("../core/Style").Stat|undefined,number):string} */
        this.color = opts.color || (() => '#EA6BAC')

        /** The name of the column/attribute of the tabular data where to retrieve the variable for font size.
         * @type {string} */
        this.fontSizeCol = opts.fontSizeCol

        /** A function returning the font size of a cell in geo unit.
         * @type {function(number,number,import("../core/Style").Stat|undefined,number):number} */
        this.fontSize = opts.fontSize || ((v, r, s, z) => r * 0.8)

        /** The text font family.
         * @type {string} */
        this.fontFamily = opts.fontFamily || 'Arial'

        /** The text font weight.
         * @type {string} */
        this.fontWeight = opts.fontWeight || 'bold'
    }

    /**
     * Draw cells as text.
     *
     * @param {Array.<import("../core/Dataset").Cell>} cells
     * @param {number} resolution
     * @param {import("../core/GeoCanvas").GeoCanvas} geoCanvas
     */
    draw(cells, geoCanvas, resolution) {
        //filter
        if (this.filter) cells = cells.filter(this.filter)

        //
        const z = geoCanvas.view.z

        let statText
        if (this.textCol) {
            //compute text variable statistics
            statText = Style.getStatistics(cells, (c) => c[this.textCol], true)
        }

        let statColor
        if (this.colorCol) {
            //compute color variable statistics
            statColor = Style.getStatistics(cells, (c) => c[this.colorCol], true)
        }

        let statFontSize
        if (this.fontSizeCol) {
            //if size is used, sort cells by size so that the biggest are drawn first
            cells.sort((c1, c2) => c2[this.fontSizeCol] - c1[this.fontSizeCol])
            //and compute size variable statistics
            statFontSize = Style.getStatistics(cells, (c) => c[this.fontSizeCol], true)
        }

        //draw with HTML canvas
        //in screen coordinates
        geoCanvas.initCanvasTransform()

        for (let cell of cells) {
            //get cell text
            const text = this.text ? this.text(cell[this.textCol], resolution, statText, z) : undefined
            if (text == undefined || text == null || text + '' === '') continue

            //color
            const col = this.color ? this.color(cell[this.colorCol], resolution, statColor, z) : undefined
            if (!col) continue
            geoCanvas.ctx.fillStyle = col

            //font size
            //size - in pixel unit
            const fontSizePix = this.fontSize(cell[this.fontSizeCol], resolution, statFontSize, z) / z

            //set font
            const fontFamily = this.fontFamily || 'Arial'
            const fontWeight = this.fontWeight || 'bold'
            geoCanvas.ctx.font = fontWeight + ' ' + fontSizePix + 'px ' + fontFamily

            //get offset
            const offset = this.offset(cell, resolution, z)

            //text position
            geoCanvas.ctx.textAlign = 'center'
            const tx = geoCanvas.geoToPixX(cell.x + resolution * 0.5 + offset.dx)
            const ty = geoCanvas.geoToPixY(cell.y + resolution * 0.5 + offset.dy) + fontSizePix * 0.3 //it should be 0.5 but 0.3 seems to work better

            //draw the text
            geoCanvas.ctx.fillText(text, tx, ty)
        }

        //update legends
        this.updateLegends({ style: this, r: resolution, z: z, sColor: statColor })
    }

    /**
     * Build a function [0,1]->string for characters legend
     *
     * @param {Array.<string>} chars
     * @returns {function(number):string}
     */
    static getCharLegendFun(chars) {
        const nb = chars.length
        return (t) => (t == 0 ? '' : t == 1 ? chars[nb - 1] : chars[Math.floor(t * nb)])
    }
}
