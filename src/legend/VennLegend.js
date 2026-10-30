//@ts-check
'use strict'

import { Legend } from '../core/Legend.js'

/**
 * A legend for the colors of a map which shows two or three variables as overlapping layers, one color for each,
 * blended by multiplication. It is a Venn diagram: a circle for each variable, in its color, and the colors of the overlaps are the mix of the colors
 * of the circles.
 *
 * It is interactive, like the other legends: when the pointer is over a part of the diagram, only the cells drawn in the color(s) of the circles
 * at this place are shown on the map. For a part of a single circle, it is the cells of its color. For an overlap, it is the cells of the colors
 * of all the circles which overlap. Hovering the label of a circle shows the cells of its color.
 *
 * By default, all the styles of the layer the legend is in are highlighted, so the legend should be put on one of the styles of the layer,
 * and the styles which draw the variables should be the ones of the layer. The `styles` option sets the styles to highlight otherwise.
 *
 * @example
 * style.legends = [
 *     new gridviz.VennLegend({
 *         title: 'Crops',
 *         items: [
 *             { label: 'Fruit trees', color: 'rgb(0,255,255)' },
 *             { label: 'Olive groves', color: 'rgb(245,210,0)' },
 *             { label: 'Vineyards', color: 'rgb(255,20,147)' },
 *         ],
 *     }),
 * ]
 *
 * @module legend
 * @author Joseph Davies
 */
export class VennLegend extends Legend {
    /**
     * @param {Object} opts The options of the legend (see Legend for the common ones: title, labelFontSize, labelFormat, interactive, className...).
     * @param {Array.<{label:string, color:string}>} opts.items The two or three variables: the label shown beside its circle, and its color. The color should be the one the style which draws the variable uses (it is matched with it to highlight the cells).
     * @param {number} [opts.radius] The radius of the circles, in pixels. Default: 45.
     * @param {number} [opts.opacity] The opacity of the circles, within [0,1]. Default: 1.
     * @param {Array.<import('../core/Style.js').Style>} [opts.styles] The styles to highlight, which draw the variables. Default: all the styles of the layer of the legend.
     */
    constructor(opts) {
        super(opts)
        opts = opts || {}

        /**
         * The variables: label and color.
         * @type {Array.<{label:string, color:string}>} */
        this.items = (opts.items || []).slice(0, 3)
        if (this.items.length < 2) throw new Error('A Venn legend needs two or three items')

        /** The radius of the circles, in pixels.
         * @type {number} */
        this.radius = opts.radius || 45

        /** The opacity of the circles.
         * @type {number} */
        this.opacity = opts.opacity === undefined ? 1 : opts.opacity

        /**
         * The styles to highlight, if not the ones of the layer.
         * @type {Array.<import('../core/Style.js').Style>|undefined} */
        this.styles = opts.styles

        /** The parts of the diagram being hovered, as a key. @private @type {string|null} */
        this._hovered = null

        this.setType('venn')
    }

    /**
     * The styles to highlight: the ones given, else all the ones of the layer.
     * @returns {Array.<import('../core/Style.js').Style>}
     * @override
     * @protected
     */
    highlightedStyles() {
        if (this.styles) return this.styles
        return this.layerStyles && this.layerStyles.length ? this.layerStyles : super.highlightedStyles()
    }

    /** The centers of the circles, relative to the center of the diagram. @private */
    centers() {
        const d = this.items.length === 2 ? 1.1 * this.radius : 1.3 * this.radius
        return this.items.length === 2
            ? [
                  [-d / 2, 0],
                  [d / 2, 0],
              ]
            : [
                  [-d / 2, 0],
                  [d / 2, 0],
                  [0, (d * Math.sqrt(3)) / 2],
              ]
    }

    /**
     * Draw the legend.
     */
    update() {
        //clear
        this.div.selectAll('*').remove()

        //title
        this.makeTitle()

        const R = this.radius
        const centers = this.centers()
        const n = this.items.length

        // the size of the labels, which stand on the sides of the circles, and below the third one
        const fontSize = parseFloat(this.labelFontSize) || 14
        const unit = /px$/.test(this.labelFontSize) || !isNaN(+this.labelFontSize) ? 1 : 16
        const fontPx = fontSize * unit
        const textWidth = (/** @type {string} */ label) => label.length * fontPx * 0.56
        const gap = 7

        // the position of the circles, in the svg: the labels of the first two are on the sides, the one of the third is below
        const leftWidth = textWidth(this.items[0].label) + gap
        const rightWidth = textWidth(this.items[1].label) + gap
        const spread = centers[1][0] - centers[0][0]
        const cx = centers.map((c) => leftWidth + R + (c[0] - centers[0][0]))
        const cy = centers.map((c) => R + c[1])
        const w = Math.ceil(leftWidth + 2 * R + spread + rightWidth)
        const height = Math.ceil(n === 2 ? 2 * R : centers[2][1] + 2 * R + gap + fontPx)

        const svg = this.div
            .append('svg')
            .classed('gridviz-legend-graphic', true)
            .attr('width', w)
            .attr('height', height)
            // a description for the screen readers: the diagram is a picture, made of the variables it shows
            .attr('role', 'img')
            .attr('aria-label', (this.title ? this.title + ': ' : '') + this.items.map((item) => item.label).join(', '))
            .style('overflow', 'visible')
            // the circles blend with each other only, not with what is behind the legend
            .style('isolation', 'isolate')

        //the circles
        const circles = this.items.map((item, i) =>
            svg
                .append('circle')
                .classed('gridviz-legend-swatch', true)
                .attr('cx', cx[i])
                .attr('cy', cy[i])
                .attr('r', R)
                .style('fill', item.color)
                .style('fill-opacity', this.opacity)
                .style('mix-blend-mode', 'multiply')
                .style('transition', 'opacity 0.1s')
        )

        //the labels: on the left of the first circle, on the right of the second one, below the third one
        const labels = this.items.map((item, i) => {
            const anchor = i === 0 ? 'end' : i === 1 ? 'start' : 'middle'
            const x = i === 0 ? cx[0] - R - gap : i === 1 ? cx[1] + R + gap : cx[2]
            const y = i === 2 ? cy[2] + R + fontPx : cy[i]
            const t = svg
                .append('text')
                .classed('gridviz-legend-label', true)
                .attr('x', x)
                .attr('y', y)
                .attr('text-anchor', anchor)
                .attr('dominant-baseline', i === 2 ? 'auto' : 'central')
                .style('font-size', this.labelFontSizeCSS())
                .style('fill', this.labelColorCSS())
            this.setText(t, item.label)
            return t
        })

        if (!this.interactive) return

        // The parts hovered: the circles under the pointer. The others are faded, and only the cells of the colors of the hovered circles are shown
        const hover = (/** @type {number[]} */ hit) => {
            const key = hit.join(',')
            if (key === this._hovered) return
            this._hovered = key || null
            circles.forEach((c, i) =>
                c
                    .classed('gridviz-legend-swatch--active', hit.includes(i))
                    .style('opacity', hit.length && !hit.includes(i) ? 0.25 : 1)
            )
            this.highlight(hit.length ? hit.map((i) => this.items[i].color) : null)
        }

        // over the diagram: the circles which contain the pointer
        svg.style('cursor', 'pointer')
            .on('mousemove', (/** @type {MouseEvent} */ event) => {
                const box = /** @type {SVGSVGElement} */ (svg.node()).getBoundingClientRect()
                const x = event.clientX - box.left
                const y = event.clientY - box.top
                const hit = []
                for (let i = 0; i < n; i++) if (Math.hypot(x - cx[i], y - cy[i]) <= R) hit.push(i)
                // not over a circle (over a label, for example): the label takes it
                if (hit.length || !(/** @type {Element} */ (event.target).classList.contains('gridviz-legend-label')))
                    hover(hit)
            })
            .on('mouseleave', () => hover([]))

        // over a label: the circle of the label
        labels.forEach((t, i) => t.style('cursor', 'pointer').on('mouseenter', () => hover([i])))
    }
}
