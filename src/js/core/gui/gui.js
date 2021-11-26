// code for adding panels / containers / indicators etc to the DOM
import * as Utils from "../utils/utils";

/**
*
*
* @function addHeadingsContainerToDOM
* @description adds a div container for app.title and app.subtitle texts
*/
export function addHeadingsContainerToDOM(viewer) {
    app.headingsNode = document.createElement("div");
    app.headingsNode.classList.add("gridviz-headings-container");
    app.headingsNode.classList.add("gridviz-plugin");
    app.container_.appendChild(app.headingsNode);
}

/**
*
*
* @function addSelectorsContainerToDOM
* @description adds a div container for the available dropdown selectors to the DOM
*/
export function addSelectorsContainerToDOM(viewer) {
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
export function addTitleToDOM(viewer) {
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
export function addSubtitleToDOM(viewer) {
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
export function addCellCountToDOM(viewer) {
    let node = document.createElement("div");
    node.classList.add("gridviz-cellcount");
    node.innerHTML = "Number of cells: " + Utils.formatNumber(app.cellCount);
    app.headingsNode.appendChild(node);
}


/**
*
*
* @function addSourcesToDOM
* @description adds a div element showing app.sourcesHTML in the bottom right corner
*/
export function addSourcesToDOM(viewer) {
    let node = document.createElement("div");
    node.classList.add("gridviz-sources");
    node.innerHTML = app.sourcesHTML_;
    app.container_.appendChild(node);
}