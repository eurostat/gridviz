//@ts-check
'use strict'

//import { TanakaStyle } from './SideTanakaStyle___OLD.js'
import { StrokeStyle } from './StrokeStyle.js'
import { SquareColorCategoryWebGLStyle } from './SquareColorCategoryWebGLStyle.js'
import { Style } from '../core/Style.js'
//import { SideStyle } from './SideStyle.js'
import { classifier as clFun, colorClassifier as cclFun } from '../utils/scale.js'
import { SideTanakaStyle } from './SideTanakaStyle.js'


/**
 * @module style
 * @author Julien Gaffuri
 */
export class LegoStyle {
    static get(value, breaks, colors, opts = {}) {
        opts = opts || {}

        //the colors
        //http://www.jennyscrayoncollection.com/2021/06/all-current-lego-colors.html
        //https://leonawicz.github.io/legocolors/reference/figures/README-plot-1.png
        /*opts.colors = opts.colors || [
            '#00852b', //darker green
            '#afd246', //light green
            '#fac80a', //dark yellow
            '#bb805a', //brown
            '#d67923', //mostard
            '#cb4e29', //redish
            '#b40000', //red
            '#720012', //dark red
            //"purple",
            //"#eee" //whithe
        ]*/

        opts.colorDark = opts.colorDark || '#333'
        opts.colorBright = opts.colorBright || '#aaa'

        //make classifier
        const classifier = clFun(breaks)
        const classifier2 = cell => classifier(value(cell))
        //make colors table
        const colorsDict = {}
        for (let i = 0; i < colors.length; i++) colorsDict[i + ''] = colors[i]

        //make cell fill style
        const cellStyle = new SquareColorCategoryWebGLStyle({
            code: classifier2,
            color: colorsDict,
        })

        //make tanaka side style
        const tanakaStyle = new SideTanakaStyle({
            classifier: () => classifier2,
            colorDark : opts.colorDark,
            colorBright : opts.colorBright,
            diamond: opts.diamond,
        })

        //style to show limits between pieces
        const sst = new StrokeStyle({
            strokeColor: () => '#666',
            strokeWidth: (c, r, z) => 0.2 * z,
            filter: opts.filter,
        })

        return [
            cellStyle,
            sst,
            tanakaStyle,
            new LegoTopStyle({ colDark: opts.colDark, colBright: opts.colBright, filter: opts.filter }),
        ]
    }

    /**
     * @param {function(import('../core/Dataset.js').Cell):string} code
     * @param {object} color
     * @param {object} opts
     * @returns {Array.<Style>}
     */
    static getCategory(code, color, opts) {
        opts = opts || {}

        opts.colDark = opts.colDark || '#333'
        opts.colBright = opts.colBright || '#aaa'

        //
        const s = new SquareColorCategoryWebGLStyle({ code: code, color: color })
        //style to show limits between pieces
        const sst = new StrokeStyle({ strokeColor: () => '#666', strokeWidth: (c, r, z) => 0.2 * z })

        return [s, sst, new LegoTopStyle({ colDark: opts.colDark, colBright: opts.colBright })]
    }
}

/**
 * A style to draw top circle of lego bricks.
 */
class LegoTopStyle extends Style {
    /** @param {object|undefined} opts */
    constructor(opts) {
        super(opts)
        opts = opts || {}
        this.colDark = opts.colDark || '#333'
        this.colBright = opts.colBright || '#aaa'
    }

    draw(cells, geoCanvas, r) {
        //filter
        if (this.filter) cells = cells.filter(this.filter)
        const ctx = geoCanvas.offscreenCtx

        ctx.lineWidth = 0.6 * geoCanvas.view.z

        //dark part
        ctx.strokeStyle = this.colDark
        for (let c of cells) {
            ctx.beginPath()
            ctx.arc(c.x + r * 0.5, c.y + r * 0.5, r * 0.55 * 0.5, Math.PI / 4, -Math.PI * (3 / 4), true)
            ctx.stroke()
        }

        //bright part
        ctx.strokeStyle = this.colBright
        for (let c of cells) {
            ctx.beginPath()
            ctx.arc(c.x + r * 0.5, c.y + r * 0.5, r * 0.55 * 0.5, Math.PI / 4, -Math.PI * (3 / 4), false)
            ctx.stroke()
        }
    }
}
