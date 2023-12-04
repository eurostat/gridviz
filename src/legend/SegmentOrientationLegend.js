//@ts-check
'use strict'

import { Legend } from '../core/Legend.js'

/**
 * A legend element for segment orientation.
 *
 * @author Joseph Davies, Julien Gaffuri
 */
export class SegmentOrientationLegend extends Legend {
    /** @param {Object} opts */
    constructor(opts) {
        super(opts)
        opts = opts || {}

        //title
        this.title = opts.title
        this.titleFontSize = opts.titleFontSize || '0.8em'
        this.titleFontWeight = opts.titleFontWeight || 'bold'

        //exageration
        this.exaggerationFactor = opts.exaggerationFactor || 0.5

        //color
        this.color = opts.color || 'gray'
        //orientation
        this.orientation = opts.orientation || 0
        //width
        this.widthPix = opts.widthPix || 3

        //label
        this.label = opts.label || ''
        this.labelFontSize = opts.labelFontSize || '0.8em'
    }

    /**
     * @param {{ style: import("../style/SegmentStyle").SegmentStyle, resolution: number, z: number, viewScale:object }} opts
     */
    update(opts) {

        //clear
        this.div.selectAll('*').remove()

        const d = this.div.append('div')

        //title
        if (this.title) {
            d.append('div')
                .attr('class', 'title')
                .style('font-size', this.titleFontSize)
                .style('font-weight', this.titleFontWeight)
                .text(this.title)
        }

        //compute segment width and length, in pix
        const sWidth = this.widthPix
        const sLength = (1 * opts.resolution) / opts.z

        //draw SVG segment
        const svgS = Math.max(sLength, sWidth)
        const svg = d.append('svg').attr('width', svgS).attr('height', svgS).style('', 'inline-block')

        const cos = Math.cos((-this.orientation * Math.PI) / 180)
        const sin = Math.sin((-this.orientation * Math.PI) / 180)
        const dc = svgS * 0.5,
            l2 = sLength * 0.5
        svg.append('line')
            .attr('x1', dc - cos * l2)
            .attr('y1', dc - sin * l2)
            .attr('x2', dc + cos * l2)
            .attr('y2', dc + sin * l2)
            .style('stroke', this.color)
            .style('stroke-width', sWidth)

        //text label
        d.append('div')
            //show on right of svg
            .style('display', 'inline')
            .style('padding-left', '5px')
            .style('font-size', this.labelFontSize)
            //.style("font-weight", "bold")
            .text(this.label)
    }
}
