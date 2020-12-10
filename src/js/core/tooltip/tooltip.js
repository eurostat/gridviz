//this file contains all the logic for creating and updating the tooltip

import { Object3D } from "three";
import * as Utils from "../utils";
import * as CONSTANTS from "../constants.js";
import { json } from "d3-fetch";

let tooltipContainer,
    tooltipTemplate,
    pointTip,
    labelTip,
    tooltip

let tooltip_state = {
    display: "none"
};

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
    <div id="gridviz-labeltip"></div>
<div id="gridviz-pointtip"></div>
</div>`);
    viewer.container_.append(tooltipTemplate);

    tooltip = document.querySelector("#gridviz-tooltip");
    pointTip = document.querySelector("#gridviz-pointtip");
    labelTip = document.querySelector("#gridviz-labeltip");
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

    tooltip.style.display = tooltip_state.display;
    tooltip.style.left = tooltip_state.left + "px";
    tooltip.style.top = tooltip_state.top + "px";
    //pointTip.innerText = tooltip_state.name;
    pointTip.style.background = tooltip_state.color;

    // set tooltip attributes HTML
    labelTip.innerHTML = `
    <table>
     <thead></thead>
     <tbody>

     <tr>
     <th><strong>${viewer.colorField_}:</strong> </th>
     <th>${tooltip_state.colorValue}</th>
     </tr>

     <tr>
     <th><strong>x:</strong> </th>
     <th>${x}</th>
     </tr>

     <tr>
     <th><strong>y:</strong> </th>
     <th>${y}</th>
     </tr>

     <tr>
     <th><strong>CRS:</strong> </th>
     <th>EPSG:${viewer.EPSG_}</th>
     </tr>

     <tr id="tooltip_lau_name">

     </tr>
     <tr id="tooltip_lau_id">

     </tr>
     <tr id="tooltip_nuts_id">

     </tr>


     </tbody>
    
    </table>
   `;

    //fetch NUTS info using GISCO id service
    if ([4326, 4258, 3035].includes(viewer.EPSG_)) {
        let nutsNode = document.getElementById("tooltip_nuts_id");
        let lauNode = document.getElementById("tooltip_lau_id");
        let lauNameNode = document.getElementById("tooltip_lau_name");
        let nutsRequest = `${CONSTANTS.nutsAPIBaseURL}nuts?x=${x}&y=${y}&proj=${viewer.EPSG_}&year=2021&level=3`;
        let lauRequest = `${CONSTANTS.nutsAPIBaseURL}lau?x=${x}&y=${y}&proj=${viewer.EPSG_}&year=2019&level=3`;
        //get NUTS
        json(nutsRequest).then(
            json => {

                if (json.features.length > 0) {
                    //add NUTS id to tooltip table
                    let f = json.features[0];

                    nutsNode.innerHTML = `
            <th><strong>NUTS3 code:</strong></th>
            <th>${f.properties.nuts_id}</th>
            `;
                }
            },
            err => {
                console.log("no results found")
                //console.error(err);
            })

        //get LAUs
        json(lauRequest).then(
            json => {

                if (json.features.length > 0) {
                    //add lau id and name to tooltip table
                    let f = json.features[0];
                    lauNode.innerHTML = `
              <th><strong>LAU code:</strong></th>
              <th>${f.properties.lau_id}</th>
              `;
                    lauNameNode.innerHTML = `
              <th><strong>LAU:</strong></th>
              <th>${f.properties.lau_name}</th>
              `;
                }
            },
            err => {
                console.log("no results found")
                //console.error(err);
            })

    }
}


/**
* @function showTooltip
* @description Shows the tooltip where the cell was clicked
* @param {Object} viewer
* @param {*} mouse_position
* @param {*} cell
*/
export function showTooltip(viewer, mouse_position, cell) {
    let x_offset = 25;
    let y_offset = -10;
    let tooltipWidth = parseInt(tooltip.style.width.replace("px", ""));
    let tooltipHeight = 100;//tooltip.style.height;
    let left = mouse_position[0] + x_offset;
    let top = mouse_position[1] + y_offset
    if (left > viewer.width_ - tooltipWidth) {
        left = left - (tooltipWidth + 40);
    }
    if (top < 0) {
        top = top + (tooltipHeight);
    }

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