//@ts-check
/** @typedef {{type: String, width: Number, height:Number, title:String, titleFontSize:Number, format: String, cells:Number, cellWidth:Number, colorFunction?:Function, labels:Array,colors:Array, marginRight:any, marginLeft:any,marginTop:any,marginBottom:any, tickFormat:Function }} LegendConfig */

import * as LEGEND from "d3-svg-legend";
import { select, create, selectAll } from "d3-selection";
import { ticks } from "d3-array";
import { interpolateRound } from "d3-interpolate";
import { axisBottom } from "d3-axis";
import { format } from "d3-format";
import * as d3scale from "d3-scale";
import { range, quantile } from "d3-array";


export class Legend {

    /**
     * Creates an instance of Legend.
     * @param {LegendConfig} config
     * @memberof Legend
     */
    constructor(config) {
        this.type = config.type || "cells"; //cells vs continuous
        this.width = config.width || 300;
        this.height = config.height || 70;
        this.title = config.title || null; //if null, will default to the current colorField
        this.cells = config.cells || 5;
        this.cellWidth = config.cellWidth || 30;
        this.labels = config.labels || null;
        this.colors = config.colors || null;
        this.colorFunction = config.colorFunction || null;
        this.marginRight = config.marginRight || 5;
        this.marginLeft = config.marginLeft || 5;
        this.marginTop = config.marginTop || 25;
        this.marginBottom = config.marginBottom || 5;
        this.tickFormat = config.tickFormat;
        this.title = config.title || null;
        this.titleFontSize = config.titleFontSize || 16;
        //html node
        this._node = null;

        // builds a legend for a style
        this.createLegend();
    }

    /**
     * @description Creates a legend
     * @memberof Legend
     */
    createLegend() {
        // TODO: adapt legends to new gridviz API. Each style can have its own legend.
        if (this.type == "cells") this.createCellsLegend();
        // if (this.type == "continuous") this.createContinuousLegend();
    }

    /**
     * @description
     * @param {*} layer
     * @memberof Legend
     */
    createCellsLegend(layer) {
        let legendContainerDiv = select("#gridviz-legend").attr("class", "gridviz-legend-horizontal gridviz-plugin");
        //adjust width/height of parent container
        legendContainerDiv.style("height", this.height + "px");
        legendContainerDiv.style("width", this.width + "px");

        let legendSvg = legendContainerDiv.append("svg")
            .attr("class", "gridviz-legend-svg")
            .attr("height", this.height)
            .attr("width", this.width)
        //.attr("transform", "translate(10,15)"); //padding

        let xRange = [this.marginLeft, this.width - this.marginRight];
        let xDomain = [-1, this.colors.length - 1];
        let x = d3scale.scaleLinear()
            .domain(xDomain)
            .rangeRound(xRange);

        //title
        if (this.title) {
         legendSvg.append("g")
         .append("text")
         .attr("y", this.marginTop)
         .attr("x", this.marginLeft)
         .text(this.title)
         .style("font-size",this.titleFontSize);
        }

        //cells
        legendSvg
            .selectAll("rect")
            .data(this.colors)
            .join("rect")
            .attr("x", (d, i) =>
                x(i - 1)
            )
            .attr("y", this.marginTop)
            .attr("width", (d, i) =>
                x(i) - x(i - 1)
            )
            .attr("height", this.height - this.marginTop - this.marginBottom)
            .style("fill", d => d);

        //labels
        legendSvg.append("g")
            .selectAll("text")
            .data(this.labels)
            .join("text")
            .attr("x", (d, i) =>
                x(i - 1)
            )
            .attr("y", this.marginTop)
            .text(d => d);

        this._node = legendSvg.node();

    }


    /**
     * @description
     * @param {*} app
     * @memberof Legend
     */
    createContinuousLegend(opts, app) {
        let tickSize = this.tickSize || 6;
        let width = this.width || 500;
        let height = this.height || 44 + tickSize;
        let marginBottom = this.marginBottom || 16 + tickSize;
        let ticks = this.ticks || width / 64;

        /**
         * @description
         * @param {*} color
         * @param {number} [n=256]
         * @return {HTMLElement} 
         */
        function ramp(color, n = 256) {
            const canvas = document.createElement("CANVAS")
            canvas.width = n;
            canvas.height = 1;
            const context = canvas.getContext("2d");
            for (let i = 0; i < n; ++i) {
                context.fillStyle = color(i / (n - 1));
                context.fillRect(i, 0, 1, 1);
            }
            return canvas;
        }

        /**
         * 
         * @function colorLegend
         * @description see https://observablehq.com/@gabgrz/color-legend
         */
        function colorLegend({
            color,
            title,
            tickSize,
            width,
            height,
            marginTop,
            marginRight,
            marginBottom,
            marginLeft,
            ticks,
            tickFormat,
            tickValues
        } = {}) {

            const svg = create("svg")
                .attr("class", "gridviz-legend-svg")
                // .attr("class", "gridviz-continuous-legend")
                .attr("width", width)
                .attr("height", height)
                .attr("viewBox", [0, 0, width, height])
                .style("overflow", "visible")
                .style("display", "block");

            let x;

            // Continuous
            if (color.interpolator) {
                x = Object.assign(color.copy()
                    .interpolator(interpolateRound(marginLeft, width - marginRight)),
                    { range() { return [marginLeft, width - marginRight]; } });

                svg.append("image")
                    .attr("x", marginLeft)
                    .attr("y", marginTop)
                    .attr("width", width - marginLeft - marginRight)
                    .attr("height", height - marginTop - marginBottom)
                    .attr("preserveAspectRatio", "none")
                    .attr("xlink:href", ramp(color.interpolator()).toDataURL());

                // scaleSequentialQuantile doesn’t implement ticks or tickFormat.
                if (!x.ticks) {
                    if (tickValues === undefined) {
                        const n = Math.round(ticks + 1);
                        tickValues = range(n).map(i => quantile(color.domain(), i / (n - 1)));
                    }
                    if (typeof tickFormat !== "function") {
                        tickFormat = format(tickFormat === undefined ? ",f" : tickFormat);
                    }
                }
            }

            // Discrete
            else if (color.invertExtent) {
                const thresholds
                    = color.thresholds ? color.thresholds() // scaleQuantize
                        : color.quantiles ? color.quantiles() // scaleQuantile
                            : color.domain(); // scaleThreshold

                const thresholdFormat
                    = tickFormat === undefined ? d => d
                        : typeof tickFormat === "string" ? format(tickFormat)
                            : tickFormat;

                x = d3scale.scaleLinear()
                    .domain([-1, color.range().length - 1])
                    .rangeRound([marginLeft, width - marginRight]);

                svg.append("g")
                    .selectAll("rect")
                    .data(color.range())
                    .join("rect")
                    .attr("x", (d, i) => x(i - 1))
                    .attr("y", marginTop)
                    .attr("width", (d, i) => x(i) - x(i - 1))
                    .attr("height", height - marginTop - marginBottom)
                    .attr("fill", d => d);

                tickValues = range(thresholds.length);
                tickFormat = i => thresholdFormat(thresholds[i], i);
            }

            if (x) {
                svg.append("g")
                    .attr("transform", `translate(0, ${height - marginBottom})`)
                    .call(axisBottom(x)
                        .ticks(ticks, typeof tickFormat === "string" ? tickFormat : undefined)
                        .tickFormat(typeof tickFormat === "function" ? tickFormat : undefined)
                        .tickSize(tickSize)
                        .tickValues(tickValues))
                    .call(g => g.selectAll(".tick line").attr("y1", marginTop + marginBottom - height))
                    .call(g => g.select(".domain").remove())
                    .call(g => g.append("text")
                        .attr("y", marginTop + marginBottom - height - 10)
                        .attr("fill", "currentColor")
                        .attr("text-anchor", "start")
                        .attr("font-weight", "bold")
                        .attr("class", "gridviz-continuous-legend-title")
                        .text(title));

                return svg.node();
            }
        }



        return colorLegend({
            color: this.colorFunction,
            title: this.title,
            tickSize: tickSize,
            width: width,
            height: height,
            marginBottom: marginBottom,
            ticks: ticks,
            marginTop: this.marginRight || 18,
            marginRight: this.marginRight || 0,
            marginLeft: this.marginLeft || 0,
            tickFormat: this.tickFormat || ".0f",
            tickValues: this.thresholds || undefined
        });

    }

    /**
     * @description remove DOM element and rebuild legend
     * @function updateLegend
     */
    updateLegend() {
        // clear and create new
        var l = selectAll(".gridviz-legend-svg").remove();
        setTimeout(() => this.createLegend(), 1000);
    }

}





/**
   * 
   * @function thresholdLabels
   * @description generates labels for legends that use threshold scales
   */
function thresholdLabels({
    i,
    genLength,
    generatedLabels,
    labelDelimiter
}) {
    if (i === 0) {
        const values = generatedLabels[i].split(` ${labelDelimiter} `)
        return `Less than ${values[1]}`
    } else if (i === genLength - 1) {
        const values = generatedLabels[i].split(` ${labelDelimiter} `)
        return `${values[0]} or more`
    }
    return generatedLabels[i]
}


