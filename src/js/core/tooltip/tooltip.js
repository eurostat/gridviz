//this file contains all the logic for creating and updating the tooltip

import { Object3D } from "three";
import * as Utils from "../utils";
import * as CONSTANTS from "../constants.js";
import { json } from "d3-fetch";

let tooltipContainer,
    tooltipTemplate,
    pointTip,
    colorFieldTip,
    crsTip,
    xTip,
    yTip,
    LAUNameTip,
    LAUCodeTip,
    NUTSCodeTip,
    tooltip

let tooltip_state = {
    display: "none"
};

// viewer.tooltip_ = {
//     eventType: "click", // click vs mouseover
//     showLAU: true,
//     showEPSG: false,
//     showNUTS: true,
//     showCoordinates: true,
//     xOffset: 15,
//     yOffset: 15,
//   };

/**
* @description Appends tooltip container to the scene
* @function createTooltipContainer
* @param {Object} viewer viewer object
*/
export function createTooltipContainer(viewer) {
    // Initial tooltip state
    tooltip_state = {
        display: "none"
    };

    //inject tooltip HTML to DOM
    tooltipTemplate = document.createRange()
        .createContextualFragment(`<div id="gridviz-tooltip">
    <div id="gridviz-labeltip">

    <table>
     <thead></thead>
     <tbody>
     <tr id="colorfieldtip"></tr>
     <tr id="xtip"></tr>
     <tr id="ytip"></tr>
     <tr id="crstip"></tr>
     <tr id="launametip"></tr>
     <tr id="laucodetip"></tr>
     <tr id="nutscodetip"></tr>
     </tbody>
    </table>
   
    </div>
<div id="gridviz-pointtip"></div>
</div>`);
    viewer.container_.append(tooltipTemplate);

    tooltip = document.querySelector("#gridviz-tooltip");
    pointTip = document.querySelector("#gridviz-pointtip");
    colorFieldTip = document.querySelector("#colorfieldtip");
    xTip = document.querySelector("#xtip");
    yTip = document.querySelector("#ytip");
    crsTip = document.querySelector("#crstip");
    LAUNameTip = document.querySelector("#launametip");
    LAUCodeTip = document.querySelector("#laucodetip");
    NUTSCodeTip = document.querySelector("#nutscodetip");

    tooltipContainer = new Object3D();
    viewer.scene.add(tooltipContainer);
}



/**
* @description Updates the innerHTML of the tooltip container
* @function updateTooltip
* @param {Object} viewer
*/
export function updateTooltip(viewer) {
    let x, y;
    if (viewer._mobile) {
        //mobile coords are scaled to [-1,1], so we "unscale" them
        x = Math.round(viewer.mobileCoordScaleX.invert(tooltip_state.coords[0]))
        y = Math.round(viewer.mobileCoordScaleY.invert(tooltip_state.coords[1]))
    } else {
        x = tooltip_state.coords[0];
        y = tooltip_state.coords[1];
    }
    if (viewer.zerosRemoved_) {
        //add the zeros removed back on
        let f = Number('1E' + viewer.zerosRemoved_);
        x = Math.round(x * f);
        y = Math.round(y * f);
    }

    // set tooltip position and display
    tooltip.style.display = tooltip_state.display;
    tooltip.style.left = tooltip_state.left + "px";
    tooltip.style.top = tooltip_state.top + "px";
    pointTip.style.background = tooltip_state.color;

    // set tooltip attributes HTML
    colorFieldTip.innerHTML = `<th><strong>${viewer.colorField_}:</strong> </th>
    <th>${tooltip_state.colorValue}</th>`

    if (viewer.tooltip_.showCoordinates) {
        xTip.innerHTML = `<th><strong>x:</strong></th>
        <th>${x}</th>`

        yTip.innerHTML = `<th><strong>y:</strong></th>
        <th>${y}</th>`
    }

    if (viewer.tooltip_.showEPSG) {
        crsTip.innerHTML = `<th><strong>CRS:</strong></th>
        <th>EPSG:${viewer.EPSG_}</th>`
    }

    //fetch NUTS info using GISCO id REST API
    if ([4326, 4258, 3035].includes(viewer.EPSG_)) {

        let nutsRequest = `${CONSTANTS.nutsAPIBaseURL}nuts?x=${x}&y=${y}&proj=${viewer.EPSG_}&year=2021&level=3`;
        let lauRequest = `${CONSTANTS.nutsAPIBaseURL}lau?x=${x}&y=${y}&proj=${viewer.EPSG_}&year=2019&level=3`;

        //get both (promise.all required to ensure tooltip on screen after both requests have resolved)
        if (viewer.tooltip_.showLAU && viewer.tooltip_.showNUTS) {
            let promises = [json(nutsRequest), json(lauRequest)];
            Promise.all(promises).then((res) => {

                if (res[0]) {
                    if (res[0].features.length > 0) {
                        //add NUTS id to tooltip table
                        let f = res[0].features[0];

                        NUTSCodeTip.innerHTML = `
<th><strong>NUTS3 code:</strong></th>
<th>${f.properties.nuts_id}</th>
`;
                    }
                }

                if (res[1]) {
                    if (res[1].features.length > 0) {
                        //add lau id and name to tooltip table
                        let f = res[1].features[0];
                        LAUCodeTip.innerHTML = `
          <th><strong>LAU code:</strong></th>
          <th>${f.properties.lau_id}</th>
          `;
                        LAUNameTip.innerHTML = `
          <th><strong>LAU:</strong></th>
          <th>${f.properties.lau_name}</th>
          `;
                    }
                }
                ensureTooltipOnScreen(viewer);
            })

        } else {
            //get NUTS
            if (viewer.tooltip_.showLAU) {

                json(nutsRequest).then(
                    json => {
                        if (json.features.length > 0) {
                            //add NUTS id to tooltip table
                            let f = json.features[0];

                            NUTSCodeTip.innerHTML = `
            <th><strong>NUTS3 code:</strong></th>
            <th>${f.properties.nuts_id}</th>
            `;
                        }
                        ensureTooltipOnScreen(viewer);
                    },
                    err => {
                        console.log("no LAU found");
                        ensureTooltipOnScreen(viewer);
                        //console.error(err);
                    })
            } else if (viewer.tooltip_.showNUTS) {

                json(lauRequest).then(
                    json => {

                        if (json.features.length > 0) {
                            //add lau id and name to tooltip table
                            let f = json.features[0];
                            LAUCodeTip.innerHTML = `
              <th><strong>LAU code:</strong></th>
              <th>${f.properties.lau_id}</th>
              `;
                            LAUNameTip.innerHTML = `
              <th><strong>LAU:</strong></th>
              <th>${f.properties.lau_name}</th>
              `;
                        }
                        ensureTooltipOnScreen(viewer);
                    },
                    err => {
                        console.log("no NUTS found");
                        ensureTooltipOnScreen(viewer);
                        //console.error(err);
                    })
            } else {
                //dont need to wait for fetch
                ensureTooltipOnScreen(viewer);
            }
        }
    }




}

/**
* @function ensureTooltipOnScreen
* @description Prevents the tooltip from appearing off screen
* @param {Object} viewer
*/
function ensureTooltipOnScreen(viewer) {
    //too far right
    if (tooltip.offsetLeft > viewer.width_ - tooltip.clientWidth) {
        tooltip.style.left = tooltip.offsetLeft - (tooltip.clientWidth + viewer.tooltip_.xOffset * 2) + "px";

    }
    //too far down
    if (tooltip.offsetTop + tooltip.clientHeight > viewer.height_) {
        tooltip.style.top = tooltip.offsetTop - (tooltip.clientHeight + viewer.tooltip_.yOffset * 2) + "px";
    }

}


/**
* @function showTooltip
* @description Shows the tooltip where the cell was clicked
* @param {Object} viewer
* @param {*} mouse_position // {x,y}
* @param {*} cell // cell object taken from the grid cache
*/
export function showTooltip(viewer, mouse_position, cell) {
    let left = mouse_position[0] + viewer.tooltip_.xOffset;
    let top = mouse_position[1] + viewer.tooltip_.yOffset;

    tooltip_state.display = "block";
    tooltip_state.left = left
    tooltip_state.top = top;
    tooltip_state.colorValue = Utils.formatNumber(parseFloat(cell[viewer.colorField_]));
    tooltip_state.coords = [cell.x, cell.y];
    tooltip_state.color = cell.color;
    updateTooltip(viewer);
}

/**
* @function hideTooltip
* @description sets tooltip display to none
*/
export function hideTooltip() {
    if (tooltip && tooltip_state) {
        tooltip.style.display = "none";
        //updateTooltip();
    }
}