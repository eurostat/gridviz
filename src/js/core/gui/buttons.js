/**
*
*
* @function addHomeButtonToDOM
* @description adds a button element with a home icon to the DOM
*/
export function addHomeButtonToDOM(viewer) {
    viewer.homeButtonNode = document.createElement("div");
    viewer.homeButtonNode.id = "gridviz-home-btn";
    viewer.homeButtonNode.classList.add("gridviz-home-button", "gridviz-icon-button");
    let icon = document.createElement("span")
    icon.classList.add("icon")
    viewer.homeButtonNode.appendChild(icon)
    viewer.container_.appendChild(viewer.homeButtonNode);
}

/**
*
*
* @function addZoomButtonsToDOM
* @description adds two zoom button elements to the DOM
*/
export function addZoomButtonsToDOM(viewer) {
    //zoom in
    viewer.zoominButtonNode = document.createElement("div");
    viewer.zoominButtonNode.id = "gridviz-zoomin-btn";
    viewer.zoominButtonNode.classList.add("gridviz-zoomin-button", "gridviz-icon-button");
    let icon = document.createElement("span")
    icon.classList.add("icon")
    viewer.zoominButtonNode.appendChild(icon)
    viewer.container_.appendChild(viewer.zoominButtonNode);

    //zoom out
    viewer.zoomoutButtonNode = document.createElement("div");
    viewer.zoomoutButtonNode.id = "gridviz-zoomout-btn";
    viewer.zoomoutButtonNode.classList.add("gridviz-zoomout-button", "gridviz-icon-button");
    let icon2 = document.createElement("span")
    icon2.classList.add("icon")
    viewer.zoomoutButtonNode.appendChild(icon2)
    viewer.container_.appendChild(viewer.zoomoutButtonNode);
}