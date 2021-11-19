//@ts-check
import { CanvasPlus } from './CanvasPlus';
import { csv, json } from "d3-fetch";
import { interpolateReds } from "d3-scale-chromatic"

class GridVizCanvas {

    //TODO improve structure - use typing
    //TODO implement mouse over
    //TODO use spatial index

    constructor(opts) {
        opts = opts || {};

        opts.canvasId = opts.canvasId || "vacanvas";
        const canvas = document.getElementById(opts.canvasId);

        /** @type {number} */
        this.w = opts.w || canvas.offsetWidth;
        /** @type {number} */
        this.h = opts.h || canvas.offsetHeight;

        /** @type {CanvasPlus} */
        this.cplus = new CanvasPlus();
        this.cplus.c2d.fillStyle = "black";
        this.cplus.c2d.fillRect(0, 0, this.w, this.h);

        this.cplus.center = {x: 5184500, y: 3517000}
        this.cplus.ps = 200

        
        /** @type {string} */
        const tiledGridURL = "https://raw.githubusercontent.com/eurostat/gridviz/master/assets/csv/Europe/grid_pop_tiled/1km/"

        /** @type {Object} */
        let gridInfo = null;

        /** @type {Array} */
        let cells = null;


        //convert cell position from tile position into geo position
        const geoTile = (cells, gridInfo, xT, yT) => {

            /** @type {number} */
            const r = gridInfo.resolutionGeo;
            /** @type {number} */
            const s = gridInfo.tileSizeCell;
            /** @type {number} */
            const xMin = gridInfo.originPoint.x + r*s*xT
            /** @type {number} */
            const yMin = gridInfo.originPoint.y + r*s*yT

            for(let i=0; i<cells.length; i++) {
                const cell = cells[i];
                /** @type {number} */
                cell.x = xMin + cell.x * r;
                /** @type {number} */
                cell.y = yMin + cell.y * r;
            }
        }


        const th = this;
        this.cplus.redraw = function() {

            //geo extent
            this.updateExtentGeo(); //TODO choose margin parameter
            const e = this.extGeo
            const po = gridInfo.originPoint
            /** @type {number} */
            const r = gridInfo.resolutionGeo
            /** @type {number} */
            const s = gridInfo.tileSizeCell;

            const xTMin = Math.floor( (e.xMin-po.x)/(r*s) )
            const xTMax = Math.floor( (e.xMax-po.x)/(r*s) )
            const yTMin = Math.floor( (e.yMin-po.y)/(r*s) )
            const yTMax = Math.floor( (e.yMax-po.y)/(r*s) )

            //TODO use cache


            cells = [];

            //TODO use also min/max from gridinfo
            for(let xT=xTMin; xT<xTMax; xT++) {
                for(let yT=yTMin; yT<yTMax; yT++) {

                    //get cells
                    csv( tiledGridURL+xT+"/"+yT+".csv" ).then((data) => {
                        geoTile(data, gridInfo, xT, yT)
                        cells = cells.concat(data)
                        redrawCells(this)
                    });

                }
            }

            return this
        };

        //get grid info
        json(tiledGridURL+"/info.json").then((data) => {
            gridInfo = data;
            th.cplus.redraw()
        });






        const redrawCells = function(cp) {
            const c2 = cp.c2d

            //clear
            c2.fillStyle = "black";
            c2.fillRect(0, 0, th.w, th.h);

            /** @type {number} */
            const r = gridInfo.resolutionGeo

            for(let i=0; i<cells.length; i++) {

                /** @type {{x:number,y:number}} */
                const cell = cells[i];
                c2.fillStyle = getColor(cell[2011]);
                c2.fillRect(cp.geoToPixX(cell.x), cp.geoToPixY(cell.y), r/cp.ps, r/cp.ps);
            }
        }

        const getColor = (v) => {
            //TODO better
            return interpolateReds(v/200)
        }

    }

}

export const gridvizApp = function (opts) {
    return new GridVizCanvas(opts)
}
