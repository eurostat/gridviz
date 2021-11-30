// logic for creating either continous legends or "cell" legends

import * as LEGEND from "d3-svg-legend";
import { select, create, selectAll } from "d3-selection";
import { ticks } from "d3-array";
import { interpolateRound } from "d3-interpolate";
import { axisBottom } from "d3-axis";
import { format } from "d3-format";
import * as d3scale from "d3-scale";
import { range, quantile } from "d3-array";

let title;

export const defaultLegendConfig = {
    type: "continuous", //cells vs continuous
    width: 300,
    height: null,
    orientation: "horizontal",
    title: null, //if null, will default to the current colorField
    titleWidth: 50,
    format: ".0s",
    cells: 5,
    shapeWidth: 30
  };

/**
   * 
   * @function createLegend
   * @description Add svg legend to DOM using d3-svg-legend
   */
export function createLegend(app, grid) {
    // title for color legend defaults to colorField
    if (!app.legend_.title) title = grid.colorField; else title = app.legend_.title;

    if (app.legend_.type == "cells") {
        createCellsLegend(app)
    } else if (app.legend_.type == "continuous") {
        createContinuousLegend(app)
    }
}

/**
   * 
   * @function createCellsLegend 
   * @description uses npm package 'd3-svg-legend' to build a "cells" style legend
   */
function createCellsLegend(app) {
    let legendContainer;
    if (document.getElementById("gridviz-legend")) {
        legendContainer = select("#gridviz-legend");
    } else {
        legendContainer = create("svg").attr("id", "gridviz-legend");
        app.container_.appendChild(legendContainer.node());
    }
    if (app.legend_.orientation == "horizontal") {
        legendContainer.attr("class", "gridviz-legend-horizontal gridviz-plugin");
    } else {
        legendContainer.attr("class", "gridviz-legend-vertical gridviz-plugin");
    }
    let legendSvg =
        legendContainer.append("g")
            .attr("class", "gridviz-legend-svg")
            .attr("height", app.legend_.height)
            .attr("width", app.legend_.width)
            .attr("transform", "translate(10,15)"); //padding


    app.__Legend = LEGEND.legendColor()
        .shapeWidth(app.legend_.shapeWidth)
        .cells(app.legend_.cells)
        .labelFormat(format(app.legend_.format))
        .orient(app.legend_.orientation)
        .scale(app.colorScaleFunction_)
        .title(title)
        .titleWidth(app.legend_.titleWidth)

    if (app.thresholds_) {
        app.__Legend.labels(thresholdLabels)
    }

    legendSvg.call(app.__Legend);

    //adjust width/height
    if (!app.legend_.height) {
        app.legend_.height = 320
    }
    legendContainer.style("height", app.legend_.height + "px");
    legendContainer.style("width", app.legend_.width + "px");
    //legend.style("height", app.legend_.height +"px");
}


/**
   * 
   * @function createContinuousLegend
   * @description creates a continuous color legend using d3. see https://observablehq.com/@gabgrz/color-legend
   */
function createContinuousLegend(app) {

    let container;
    if (document.getElementById("gridviz-legend")) {
        container = select("#gridviz-legend");
    } else {
        container = create("div").attr("id", "gridviz-legend");
        container.attr("class", "gridviz-plugin");
        app.container_.appendChild(container.node());
    }

    let tickSize = app.legend_.tickSize || 6;
    let width = app.legend_.width || 500;
    let height = app.legend_.height || 44 + tickSize;
    let marginBottom = app.legend_.marginBottom || 16 + tickSize;
    let ticks = app.legend_.ticks || width / 64;

    app.__Legend = colorLegend({
        color: app.colorScaleFunction_,
        title: title,
        tickSize: tickSize,
        width: width,
        height: height,
        marginBottom: marginBottom,
        ticks: ticks,
        marginTop: app.legend_.marginRight || 18,
        marginRight: app.legend_.marginRight || 0,
        marginLeft: app.legend_.marginLeft || 0,
        tickFormat: app.legend_.tickFormat || ".0f",
        tickValues: app.thresholds_ || undefined
    });

    container.node().appendChild(app.__Legend);

}
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

/**
 * @description remove DOM element and rebuild legend
 * @function updateLegend
 */
export function updateLegend(app, grid) {
    // TODO: make less hacky :)
    var l = selectAll(".gridviz-legend-svg").remove();
    setTimeout(createLegend(app, grid), 1000);
}

