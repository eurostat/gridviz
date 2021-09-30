/**
*
*
* @function addHomeButtonToDOM
* @description adds a button element with a home icon to the DOM
*/
export function addHomeButtonToDOM(viewer) {
    // define position
    let left;
    let top;
    if (viewer._mobile) {
        // currently not adding buttons to mobile version
        // left = 3;
        // if (viewer.title_ || viewer.subtitle_) {
        //     top = 75;
        // } else {
        //     top = 20;
        // }
    } else {
        left = 10;
        if (viewer.title_ || viewer.subtitle_) {
            top = 100;
        } else {
            top = 20;
        }

        //create node
        viewer.homeButtonNode = document.createElement("div");
        viewer.homeButtonNode.style.left = left + 'px';
        viewer.homeButtonNode.style.top = top + 'px';
        viewer.homeButtonNode.id = "gridviz-home-btn";
        viewer.homeButtonNode.classList.add("gridviz-home-button", "gridviz-icon-button");
        let icon = document.createElement("span")
        icon.classList.add("icon")
        viewer.homeButtonNode.appendChild(icon)
        viewer.container_.appendChild(viewer.homeButtonNode);
    }

}

/**
*
*
* @function addZoomButtonsToDOM
* @description adds two zoom button elements to the DOM
*/
export function addZoomButtonsToDOM(viewer) {
    //define positions
    let left;
    let zoomInTop;
    let zoomOutTop;
    if (viewer._mobile) {
        // currently not adding buttons to mobile version
        // left = 3;
        // if (viewer.title_ || viewer.subtitle_) {
        //     zoomInTop = 110;
        //     zoomOutTop = 140;
        // } else {
        //     zoomInTop = 50;
        //     zoomOutTop = 80;
        // }
    } else {
        left = 10;
        if (viewer.title_ || viewer.subtitle_) {
            zoomInTop = 140;
            zoomOutTop = 170;
        } else {
            zoomInTop = 50;
            zoomOutTop = 80;
        }

        //build zoomin node
        viewer.zoominButtonNode = document.createElement("div");
        viewer.zoominButtonNode.id = "gridviz-zoomin-btn";
        viewer.zoominButtonNode.style.left = left + 'px';
        viewer.zoominButtonNode.style.top = zoomInTop + 'px';
        viewer.zoominButtonNode.classList.add("gridviz-zoomin-button", "gridviz-icon-button");
        let icon = document.createElement("span");
        icon.classList.add("icon");
        viewer.zoominButtonNode.appendChild(icon);
        viewer.container_.appendChild(viewer.zoominButtonNode);

        //build zoom out
        viewer.zoomoutButtonNode = document.createElement("div");
        viewer.zoomoutButtonNode.id = "gridviz-zoomout-btn";
        viewer.zoomoutButtonNode.style.left = left + 'px';
        viewer.zoomoutButtonNode.style.top = zoomOutTop + 'px';
        viewer.zoomoutButtonNode.classList.add("gridviz-zoomout-button", "gridviz-icon-button");
        let icon2 = document.createElement("span");
        icon2.classList.add("icon");
        viewer.zoomoutButtonNode.appendChild(icon2);
        viewer.container_.appendChild(viewer.zoomoutButtonNode);
    }

}