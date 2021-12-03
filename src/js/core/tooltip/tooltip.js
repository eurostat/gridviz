//this file contains all the logic for creating and updating the tooltip

import { Object3D } from "three";
import * as Utils from "../utils/utils";
import * as CONSTANTS from "../constants.js";
import { json } from "d3-fetch";

let tooltipContainer,
    tooltipTemplate,
    tooltipTableBody,
    tooltipRows,
    pointTip,
    LAUNameTip,
    LAUCodeTip,
    NUTSCodeTip,
    tooltip

let tooltip_state = {
    display: "none"
};

export class Tooltip {

    constructor(parentNode, config) {

        this.parentNode = parentNode;
        this.eventType = config.eventType || "mousemove";
        this.showLAU = config.LAU || false;
        this.showEPSG = config.EPSG || false;
        this.showNUTS = config.NUTS || false;
        this.showCoordinates = config.showCoordiantes || false;
        this.xOffset = config.xOffset || 15;
        this.yOffset = config.yOffset || 15;
        this.tooltipTableRows = {}; // store table rows <tr>
        this.tooltipNode = null; //HTMLElement

        this.appendTooltipContainer(this.parentNode);
    }

    /**
    * @description Appends tooltip container to the scene
    * @function appendTooltipContainer
    * @param {HTMLElement} parentNode node upon which the tooltip is appended
    */
    appendTooltipContainer(parentNode) {

        //inject tooltip HTML to DOM
        let tooltipTemplate = document.createRange()
            .createContextualFragment(`<div id="gridviz-tooltip">
                <div id="gridviz-labeltip">

                <table>
                <thead></thead>
                <tbody id="tooltipTableBody">

                </tbody>
                </table>
            
                </div>
            <div id="gridviz-pointtip"></div>
            </div>`);
        parentNode.append(tooltipTemplate);

        this.tooltipTableBody = document.querySelector("#tooltipTableBody");
        this.tooltipNode = document.querySelector("#gridviz-tooltip");
        this.pointTipNode = document.querySelector("#gridviz-pointtip");

    }

    updateTooltip(cell, left, top, color) {
        //add row to table if necessary
        for (const field in cell) { 
            if (!this.tooltipTableRows[field]) {
                // add new row
                this.appendRowToTooltip(field);
                this.tooltipTableRows[field].innerHTML = field + ": " + cell[field];
            } else if (this.tooltipTableRows[field]) {
                //update existing row
                this.tooltipTableRows[field].innerHTML = field + ": " + cell[field];
            }
        }
        this.tooltipNode.style.left = (left + this.xOffset) + "px";
        this.tooltipNode.style.top = (top + this.yOffset) + "px";
        this.pointTipNode.style.background = color || 'none';
    }

    appendRowToTooltip(field) {
        let row = document.createElement('tr');
        row.id = field + 'tip';
        this.tooltipTableBody.appendChild(row)
        this.tooltipTableRows[field] = row;
    }

    /**
    * @function hide
    * @description sets tooltip display to none
    */
    hide() {
        this.tooltipNode.style.display = "none";
    }

    /**
    * @function show
    * @description sets tooltip display to block
    */
    show() {
        this.tooltipNode.style.display = "block";
    }

}


function appendRowToTooltip(tooltipTableBody, field) {
    let row = document.createElement('tr');
    row.id = field + 'tip';
    tooltipTableBody.appendChild(row)
    tooltipRows[field] = row;
}


/**
* @description Updates the innerHTML of the tooltip container
* @function updateTooltip
* @param {Object} app
*/
export function updateTooltip(app) {
    let x, y;
    if (app._mobile) {
        //mobile coords are scaled to [-1,1], so we invert them
        x = Math.round(app.viewer.mobileCoordScale.invert(tooltip_state.x))
        y = Math.round(app.viewer.mobileCoordScale.invert(tooltip_state.y))
    } else {
        x = tooltip_state.x;
        y = tooltip_state.y;
    }
    if (app.zerosRemoved_) {
        //add the zeros removed back on
        let f = Number('1E' + app.zerosRemoved_);
        x = Math.round(x * f);
        y = Math.round(y * f);
    }

    // set tooltip position and display
    tooltip.style.display = tooltip_state.display;
    tooltip.style.left = tooltip_state.left + "px";
    tooltip.style.top = tooltip_state.top + "px";
    pointTip.style.background = tooltip_state.color;

    // set tooltip attributes HTML
    app._cellFields.forEach((field) => {
        tooltipRows[field].innerHTML = `<th><strong>${field}:</strong> </th>
        <th>${tooltip_state[field]}</th>`
    })


    if (this.showCoordinates) {
        tooltipRows.x.innerHTML = `<th><strong>x:</strong></th>
        <th>${x}</th>`

        tooltipRows.y.innerHTML = `<th><strong>y:</strong></th>
        <th>${y}</th>`
    }

    if (this.showEPSG) {
        tooltipRows.crstip.innerHTML = `<th><strong>CRS:</strong></th>
        <th>EPSG:${app.EPSG_}</th>`
    }

    //fetch NUTS info using GISCO id REST API
    if ([4326, 4258, 3035].includes(app.EPSG_)) {

        let nutsRequest = `${CONSTANTS.nutsAPIBaseURL}nuts?x=${x}&y=${y}&proj=${app.EPSG_}&year=2021&level=3`;
        let lauRequest = `${CONSTANTS.nutsAPIBaseURL}lau?x=${x}&y=${y}&proj=${app.EPSG_}&year=2019&level=3`;

        //get both (promise.all required to ensure tooltip on screen after both requests have resolved)
        if (this.showLAU && this.showNUTS) {
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
                ensureTooltipOnScreen(app);
            })

        } else {
            //get NUTS
            if (this.showLAU) {

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
                        ensureTooltipOnScreen(app);
                    },
                    err => {
                        console.log("no LAU found");
                        ensureTooltipOnScreen(app);
                        //console.error(err);
                    })
            } else if (this.showNUTS) {

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
                        ensureTooltipOnScreen(app);
                    },
                    err => {
                        console.log("no NUTS found");
                        ensureTooltipOnScreen(app);
                        //console.error(err);
                    })
            } else {
                //dont need to wait for fetch
                ensureTooltipOnScreen(app);
            }
        }
    }
}

/**
* @function ensureTooltipOnScreen
* @description Prevents the tooltip from appearing off screen
* @param {Object} app
*/
function ensureTooltipOnScreen(app) {
    //too far right
    if (tooltip.offsetLeft > app.width_ - tooltip.clientWidth) {
        tooltip.style.left = tooltip.offsetLeft - (tooltip.clientWidth + this.xOffset * 2) + "px";

    }
    //too far down
    if (tooltip.offsetTop + tooltip.clientHeight > app.height_) {
        tooltip.style.top = tooltip.offsetTop - (tooltip.clientHeight + this.yOffset * 2) + "px";
    }
}


/**
* @function showTooltip
* @description Shows the tooltip where the cell was clicked
* @param {Object} app
* @param {*} mouse_position // {x,y}
* @param {*} cell // cell object intersected from the grid cache
*/
export function showTooltip(app, mouse_position, cell) {
    let left = mouse_position[0] + this.xOffset;
    let top = mouse_position[1] + this.yOffset;

    // prepare tooltip settings from cell attributes
    for (const key in cell) {
        tooltip_state[key] = cell[key]
    }
    // show and position tooltip
    tooltip_state.display = "block";
    tooltip_state.left = left
    tooltip_state.top = top;

    // tooltip_state.colorValue = Utils.formatNumber(parseFloat(cell[grid.colorField]));
    // tooltip_state.coords = [cell.x, cell.y];
    // tooltip_state.color = cell.color;
    updateTooltip(app);
}

