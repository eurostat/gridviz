//@ts-check
import { CanvasPlus } from './CanvasPlus';
import { TiledGrid } from './TiledGrid';
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

        this.cplus.center = {x: 5000000, y: 3014000}
        this.cplus.ps = 200

 
        

        //TODO
        //this.layers = []

        const tg = new TiledGrid("https://raw.githubusercontent.com/eurostat/gridviz/master/assets/csv/Europe/grid_pop_tiled/1km/").then(()=>{
            this.cplus.redraw();
        })



        const th = this;
        this.cplus.redraw = function() {

            //geo extent
            this.updateExtentGeo(); //TODO choose margin parameter
            const e = this.extGeo
            tg.requestTiles(e, ()=>{ redrawCells(this) });

            return this
        };



        const redrawCells = function(cp) {
            const c2 = cp.c2d

            //clear
            c2.fillStyle = "black";
            c2.fillRect(0, 0, th.w, th.h);

            /** @type {number} */
            const r = tg.getInfo().resolutionGeo

            for(let i=0; i<tg.tiles.length; i++) {
                const tile = tg.tiles[i];
                for(let j=0; j<tile.cells.length; j++) {

                /** @type {{x:number,y:number}} */
                const cell = tile.cells[j];
                c2.fillStyle = getColor(cell[2011]);
                c2.fillRect(cp.geoToPixX(cell.x), cp.geoToPixY(cell.y), r/cp.ps, r/cp.ps);
            }
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
