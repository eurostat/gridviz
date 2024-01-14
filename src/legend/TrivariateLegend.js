//@ts-check
'use strict'

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

        //make svg element
        const svg = this.div
            .append('svg')
            .attr('width', w)
            .attr('height', h)

        /*/triangle fill
        const points = "0," + height + " " + this.width + "," + height + " " + (this.width / 2) + ",0"
        svg.append('polygon')
            .attr('points', points)
            .attr('fill', this.classifier.centralColor)*/

        //0 top
        svg.append('polygon')
            .attr('points', (w / 3) + "," + (h / 3) + " " + (w * 2 / 3) + "," + (h / 3) + " " + (w / 2) + ",0")
            .attr('fill', this.classifier.colors[0])
        //1 left
        svg.append('polygon')
            .attr('points', "0," + h + " " + (w / 3) + "," + h + " " + (w / 6) + "," + (2 * h / 3))
            .attr('fill', this.classifier.colors[1])
        //2 right
        svg.append('polygon')
            .attr('points', (w * 2 / 3) + "," + h + " " + w + "," + h + " " + (w * 5 / 6) + "," + (2 * h / 3))
            .attr('fill', this.classifier.colors[2])

        //middle triangle
        svg.append('polygon')
            .attr('points', (w / 2) + "," + (h / 3) + " " + (w / 4) + "," + (h * 5 / 6) + " " + (3 * w / 4) + "," + (h * 5 / 6))
            .attr('fill', this.classifier.centralColor)

        //12 bottom
        svg.append('polygon')
            .attr('points', (w / 3) + "," + (h / 3) + " " + (w * 2 / 3) + "," + (h / 3) + " " + (w / 2) + ",0")
            .attr('fill', this.classifier.colors[0])





        //
        //TODO

        /*/triangle stroke
        svg.append('polygon')
            .attr('points', points)
            .attr('fill', "none")
            .attr('stroke-width', 1)
            .attr('stroke', "black")
*/
    }
}
