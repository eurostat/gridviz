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

            const g = svg.append("g")

        //0 left triangle
        const left = g.append('polygon')
            .attr('points', "0," + h + " " + (w / 3) + "," + h + " " + (w / 6) + "," + (2 * h / 3))
        //1 top triangle
        const top = g.append('polygon')
            .attr('points', (w / 3) + "," + (h / 3) + " " + (w * 2 / 3) + "," + (h / 3) + " " + (w / 2) + ",0")
        //2 right triangle
        const right = g.append('polygon')
            .attr('points', (w * 2 / 3) + "," + h + " " + w + "," + h + " " + (w * 5 / 6) + "," + (2 * h / 3))
        //middle triangle
        const middle = g.append('polygon')
            .attr('points', (w / 2) + "," + (h / 3) + " " + (w / 4) + "," + (h * 5 / 6) + " " + (3 * w / 4) + "," + (h * 5 / 6))
        //01 left
        const left_ = g.append('polygon')
            .attr('points', (w / 6) + "," + (h * 2 / 3) + " " + (w / 4) + "," + (h * 5 / 6) + " " + (w / 2) + "," + (h / 3) + " " + (w / 3) + "," + (h / 3))
        //02 bottom
        const bottom_ = g.append('polygon')
            .attr('points', (w / 3) + "," + (h) + " " + (2 * w / 3) + "," + (h) + " " + (w * 3 / 4) + "," + (h * 5 / 6) + " " + (w / 4) + "," + (h * 5 / 6))
        //12 right
        const right_ = g.append('polygon')
            .attr('points', (w / 2) + "," + (h / 3) + " " + (w * 3 / 4) + "," + (h * 5 / 6) + " " + (w * 5 / 6) + "," + (h * 2 / 3) + " " + (w * 2 / 3) + "," + (h / 3))


        const setAttributes = (elt, color, text) => {
            //elt.raise();
            elt.attr('fill', color)
                .attr("stroke", "black")//colorOver)
                .attr("stroke-width", 0)
                .on("mouseover", function (e) { select(this).attr("stroke-width", 5); if (!tt || !text) return; tt.html(text); tt.setPosition(e); tt.show() })
                .on("mouseout", function () { select(this).attr("stroke-width", 0); if (tt) tt.hide() })
            if (tt && text) elt.on("mousemove", function (e) { tt.setPosition(e) })
        }
        setAttributes(left, classifier.colors[0], texts["0"])
        setAttributes(top, classifier.colors[1], texts["1"])
        setAttributes(right, classifier.colors[2], texts["2"])
        setAttributes(middle, classifier.centralColor, texts["middle"])
        setAttributes(left_, classifier.middleColors[2], texts["01"])
        setAttributes(bottom_, classifier.middleColors[1], texts["02"])
        setAttributes(right_, classifier.middleColors[0], texts["12"])


    }
}
