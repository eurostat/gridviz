//@ts-check
'use strict'

import { select } from 'd3-selection'
import { Legend } from '../core/Legend.js'

/**
 *
 * @module legend
 * @author Julien Gaffuri
 */
export class TrivariateLegend extends Legend {
    /** @param {Object} opts */
    constructor(opts) {
        super(opts)
        opts = opts || {}

        //classifier
        this.classifier = opts.classifier

        this.width = opts.width || 150
        this.colorOver = opts.colorOver || "red"
        this.tooltip = opts.tooltip
        this.texts = opts.texts
    }

    /**
     * @param {{} } opts
     */
    update(opts) {

        //clear
        this.div.selectAll('*').remove()

        //title
        this.makeTitle()

        const sqrt2over2 = 0.866025
        const w = this.width, h = w * sqrt2over2
        const classifier = this.classifier
        const colorOver = this.colorOver
        const tt = this.tooltip
        const texts = this.texts

        //make svg element
        const svg = this.div
            .append('svg')
            .attr('width', w)
            .attr('height', h)

        //0 top
        svg.append('polygon')
            .attr('points', (w / 3) + "," + (h / 3) + " " + (w * 2 / 3) + "," + (h / 3) + " " + (w / 2) + ",0")
            .attr('fill', classifier.colors[0])
            .on("mouseover", function () { select(this).attr("fill", colorOver); })
            .on("mouseout", function () { select(this).attr("fill", classifier.colors[0]); })
            .on("mouseover", function (e) { select(this).attr("fill", colorOver); tt.html(texts["0"]); tt.setPosition(e); tt.show() })
            .on("mousemove", function (e) { select(this).attr("fill", colorOver); tt.setPosition(e) })
            .on("mouseout", function () { select(this).attr("fill", classifier.colors[0]); tt.hide() })
        //1 left
        svg.append('polygon')
            .attr('points', "0," + h + " " + (w / 3) + "," + h + " " + (w / 6) + "," + (2 * h / 3))
            .attr('fill', classifier.colors[1])
            .on("mouseover", function () { select(this).attr("fill", colorOver); })
            .on("mouseout", function () { select(this).attr("fill", classifier.colors[1]); })
        //2 right
        svg.append('polygon')
            .attr('points', (w * 2 / 3) + "," + h + " " + w + "," + h + " " + (w * 5 / 6) + "," + (2 * h / 3))
            .attr('fill', classifier.colors[2])
            .on("mouseover", function () { select(this).attr("fill", colorOver); })
            .on("mouseout", function () { select(this).attr("fill", classifier.colors[2]); })

        //middle triangle
        svg.append('polygon')
            .attr('points', (w / 2) + "," + (h / 3) + " " + (w / 4) + "," + (h * 5 / 6) + " " + (3 * w / 4) + "," + (h * 5 / 6))
            .attr('fill', classifier.centralColor)

        //12 bottom
        svg.append('polygon')
            .attr('points',
                (w / 3) + "," + (h) + " "
                + (2 * w / 3) + "," + (h) + " "
                + (w * 3 / 4) + "," + (h * 5 / 6) + " "
                + (w / 4) + "," + (h * 5 / 6))
            .attr('fill', classifier.colorsMiddle[0])
            .on("mouseover", function () { select(this).attr("fill", colorOver); })
            .on("mouseout", function () { select(this).attr("fill", classifier.colorsMiddle[0]); })

        //02 right
        svg.append('polygon')
            .attr('points',
                (w / 2) + "," + (h / 3) + " "
                + (w * 3 / 4) + "," + (h * 5 / 6) + " "
                + (w * 5 / 6) + "," + (h * 2 / 3) + " "
                + (w * 2 / 3) + "," + (h / 3))
            .attr('fill', classifier.colorsMiddle[1])
            .on("mouseover", function () { select(this).attr("fill", colorOver); })
            .on("mouseout", function () { select(this).attr("fill", classifier.colorsMiddle[1]); })

        //01 left
        svg.append('polygon')
            .attr('points',
                (w / 6) + "," + (h * 2 / 3) + " "
                + (w / 4) + "," + (h * 5 / 6) + " "
                + (w / 2) + "," + (h / 3) + " "
                + (w / 3) + "," + (h / 3))
            .attr('fill', classifier.colorsMiddle[2])
            .on("mouseover", function () { select(this).attr("fill", colorOver); })
            .on("mouseout", function () { select(this).attr("fill", classifier.colorsMiddle[2]); })

    }
}
