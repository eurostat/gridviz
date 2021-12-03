// code for adding panels / containers / indicators etc to the DOM
import * as Utils from "../utils/utils";

/**
*
*
* @function addHeadingsContainerToDOM
* @description adds a div container for app.title and app.subtitle texts
*/
export function addHeadingsContainerToDOM(app) {
    app.headingsNode = document.createElement("div");
    app.headingsNode.classList.add("gridviz-headings-container");
    app.headingsNode.classList.add("gridviz-plugin");
    app.container_.appendChild(app.headingsNode);
}

export function addLegendContainerToDOM(app) {
    let legendContainer = document.createElement("svg")
    legendContainer.id = "gridviz-legend";
    app.container_.appendChild(legendContainer);
}

/**
*
*
* @function addSelectorsContainerToDOM
* @description adds a div container for the available dropdown selectors to the DOM
*/
export function addSelectorsContainerToDOM(app) {
    app.selectorsContainer = document.createElement("div");
    app.selectorsContainer.classList.add("gridviz-selectors");
    app.selectorsContainer.classList.add("gridviz-plugin");
    app.container_.appendChild(app.selectorsContainer);
}

/**
*
*
* @function addTitleToDOM
* @description adds a div element for app.title to headings container 
*/
export function addTitleToDOM(app) {
    let node = document.createElement("div");
    node.classList.add("gridviz-title");
    node.innerHTML = app.title_;
    app.headingsNode.appendChild(node);
}

/**
*
*
* @function addSubtitleToDOM
* @description adds a div element for app.subtitle to headings container 
*/
export function addSubtitleToDOM(app) {
    let node = document.createElement("div");
    node.classList.add("gridviz-subtitle");
    node.innerHTML = app.subtitle_;
    app.headingsNode.appendChild(node);
}


/**
*
*
* @function addCellCountToDOM
* @description adds a div element for app.cellCount to headings container 
*/
export function addCellCountToDOM(app) {
    let node = document.createElement("div");
    node.id = "gridviz-cellcount";
    app.headingsNode.appendChild(node);
}


/**
*
*
* @function updateCellCount
* @description updates the cell count text
*/
export function updateCellCount(count) {
    let node = document.getElementById("gridviz-cellcount");
    let num = Utils.formatNumber(count);
    node.innerHTML = "Number of cells in view: " + num;
}


/**
*
*
* @function addSourcesToDOM
* @description adds a div element showing app.sourcesHTML in the bottom right corner
*/
export function addSourcesToDOM(app) {
    let node = document.createElement("div");
    node.classList.add("gridviz-sources");
    node.innerHTML = app.sourcesHTML_;
    app.container_.appendChild(node);
}