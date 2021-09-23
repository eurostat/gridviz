// code for adding panels / containers / indicators etc to the DOM
import * as Utils from "../utils/utils";

/**
*
*
* @function addHeadingsContainerToDOM
* @description adds a div container for viewer.title and viewer.subtitle texts
*/
export function addHeadingsContainerToDOM(viewer) {
    viewer.headingsNode = document.createElement("div");
    viewer.headingsNode.classList.add("gridviz-headings-container");
    viewer.headingsNode.classList.add("gridviz-plugin");
    viewer.container_.appendChild(viewer.headingsNode);
}

/**
*
*
* @function addSelectorsContainerToDOM
* @description adds a div container for the available dropdown selectors to the DOM
*/
export function addSelectorsContainerToDOM(viewer) {
    viewer.selectorsContainer = document.createElement("div");
    viewer.selectorsContainer.classList.add("gridviz-selectors");
    viewer.selectorsContainer.classList.add("gridviz-plugin");
    viewer.container_.appendChild(viewer.selectorsContainer);
}

/**
*
*
* @function addTitleToDOM
* @description adds a div element for viewer.title to headings container 
*/
export function addTitleToDOM(viewer) {
    let node = document.createElement("div");
    node.classList.add("gridviz-title");
    node.innerHTML = viewer.title_;
    viewer.headingsNode.appendChild(node);
}

/**
*
*
* @function addSubtitleToDOM
* @description adds a div element for viewer.subtitle to headings container 
*/
export function addSubtitleToDOM(viewer) {
    let node = document.createElement("div");
    node.classList.add("gridviz-subtitle");
    node.innerHTML = viewer.subtitle_;
    viewer.headingsNode.appendChild(node);
}


/**
*
*
* @function addCellCountToDOM
* @description adds a div element for viewer.cellCount to headings container 
*/
export function addCellCountToDOM(viewer) {
    let node = document.createElement("div");
    node.classList.add("gridviz-cellcount");
    node.innerHTML = "Number of cells: " + Utils.formatNumber(viewer.cellCount);
    viewer.headingsNode.appendChild(node);
}


/**
*
*
* @function addSourcesToDOM
* @description adds a div element showing viewer.sourcesHTML in the bottom right corner
*/
export function addSourcesToDOM(viewer) {
    let node = document.createElement("div");
    node.classList.add("gridviz-sources");
    node.innerHTML = viewer.sourcesHTML_;
    viewer.container_.appendChild(node);
}