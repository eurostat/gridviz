/**
*
*
* @function addHomeButtonToDOM
* @description adds a button element with a home icon to the DOM
*/
export function addHomeButtonToDOM(app) {
    // define position
    let left;
    let top;
    if (app._mobile) {
        // currently not adding buttons to mobile version
        // left = 3;
        // if (app.title_ || app.subtitle_) {
        //     top = 75;
        // } else {
        //     top = 20;
        // }
    } else {
        left = 10;
        if (app.title_ || app.subtitle_) {
            top = 100;
        } else {
            top = 20;
        }

        //create node
        app.homeButtonNode = document.createElement("div");
        app.homeButtonNode.style.left = left + 'px';
        app.homeButtonNode.style.top = top + 'px';
        app.homeButtonNode.id = "gridviz-home-btn";
        app.homeButtonNode.classList.add("gridviz-home-button", "gridviz-icon-button");
        let icon = document.createElement("span")
        icon.classList.add("icon")
        app.homeButtonNode.appendChild(icon)
        app.container_.appendChild(app.homeButtonNode);
    }

}

/**
*
*
* @function addZoomButtonsToDOM
* @description adds two zoom button elements to the DOM
*/
export function addZoomButtonsToDOM(app) {
    //define positions
    let left;
    let zoomInTop;
    let zoomOutTop;
    if (app._mobile) {
        // currently not adding buttons to mobile version
        // left = 3;
        // if (app.title_ || app.subtitle_) {
        //     zoomInTop = 110;
        //     zoomOutTop = 140;
        // } else {
        //     zoomInTop = 50;
        //     zoomOutTop = 80;
        // }
    } else {
        left = 10;
        if (app.title_ || app.subtitle_) {
            zoomInTop = 140;
            zoomOutTop = 170;
        } else {
            zoomInTop = 50;
            zoomOutTop = 80;
        }

        //build zoomin node
        app.zoominButtonNode = document.createElement("div");
        app.zoominButtonNode.id = "gridviz-zoomin-btn";
        app.zoominButtonNode.style.left = left + 'px';
        app.zoominButtonNode.style.top = zoomInTop + 'px';
        app.zoominButtonNode.classList.add("gridviz-zoomin-button", "gridviz-icon-button");
        let icon = document.createElement("span");
        icon.classList.add("icon");
        app.zoominButtonNode.appendChild(icon);
        app.container_.appendChild(app.zoominButtonNode);

        //build zoom out
        app.zoomoutButtonNode = document.createElement("div");
        app.zoomoutButtonNode.id = "gridviz-zoomout-btn";
        app.zoomoutButtonNode.style.left = left + 'px';
        app.zoomoutButtonNode.style.top = zoomOutTop + 'px';
        app.zoomoutButtonNode.classList.add("gridviz-zoomout-button", "gridviz-icon-button");
        let icon2 = document.createElement("span");
        icon2.classList.add("icon");
        app.zoomoutButtonNode.appendChild(icon2);
        app.container_.appendChild(app.zoomoutButtonNode);
    }

}