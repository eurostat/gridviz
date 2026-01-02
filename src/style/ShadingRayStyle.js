//@ts-check
'use strict'

import { Style } from '../core/Style.js'
import { cellsToGrid, cellsToMatrix } from '../utils/utils.js'
import { SquareColorCategoryWebGLStyle } from './SquareColorCategoryWebGLStyle.js'
import { extent } from 'd3-array'

/**
 * @module style
 * @author Julien Gaffuri
 */
export class ShadingRayStyle extends Style {
    /** @param {object} opts */
    constructor(opts) {
        super(opts)
        opts = opts || {}

        this.elevation = opts.elevation //(c) => elevation

        this.sunAzimuth = opts.sunAzimuth || (() => 2.356) //(r,z,vs)=>
        this.sunAltitude = opts.sunAltitude || (() => 0.2) //(r,z,vs)=>
        this.zFactor = opts.zFactor || (() => 1) //(r,z,vs)=>

        this.alpha = opts.alpha || (() => 0.33) //(r,z,vs)
        this.color = opts.color || (() => 'black') //(r,z,vs) => {}

        this.version = opts.version || 1
        this.shadowProperty = opts.shadowProperty || "shadow"
    }

    /**
     *
     * @param {Array.<import("../core/Dataset.js").Cell>} cells
     * @param {import("../core/GeoCanvas.js").GeoCanvas} geoCanvas
     * @param {number} resolution
     */
    draw(cells, geoCanvas, resolution) {
        //filter
        if (this.filter) cells = cells.filter(this.filter)
        if (cells.length == 0) return;

        //
        const z = geoCanvas.view.z

        //get view scale
        const viewScale = this.viewScale ? this.viewScale(cells, resolution, z) : undefined

        if (this.version == "1") {
            //index cells by y and x
            let m = cellsToMatrix(cells, resolution, c => this.elevation(c))
            const x0 = m.x0, y0 = m.y0

            // compute ray casting shadow
            m = referenceShadow(m,
                resolution,
                this.sunAzimuth(resolution, z, viewScale),
                this.sunAltitude(resolution, z, viewScale),
                this.zFactor(resolution, z, viewScale));

            // make cells
            cells = []
            for (let i = 0; i < m.length; i++) {
                const row = m[i]
                const y = y0 - i * resolution
                for (let j = 0; j < row.length; j++) {
                    const sh = row[j]
                    if (!sh) continue
                    const c = { x: x0 + j * resolution, y: y }
                    c[this.shadowProperty] = sh
                    cells.push(c)
                }
            }
        } else {
            //clean previsouly computed shadows
            for (let c of cells) delete c[this.shadowProperty]

            //compute shading
            referenceShadowV2(
                cells,
                resolution,
                (c) => this.elevation(c),
                this.shadowProperty,
                this.sunAzimuth(resolution, z, viewScale),
                this.sunAltitude(resolution, z, viewScale),
                this.zFactor(resolution, z, viewScale));

            //keep only those with shadow
            cells = cells.filter(c => c.shadow)
        }

        //draw shadowed cells with webgl style
        new SquareColorCategoryWebGLStyle({
            code: () => "a",
            color: { 'a': this.color(resolution, z, viewScale) },
            alpha: () => this.alpha(resolution, z, viewScale),
        }).draw(cells, geoCanvas, resolution)

        //update legends
        this.updateLegends({ style: this, resolution: resolution, z: z, viewScale: viewScale })
    }
}



/**
 * Ground-truth terrain shadow algorithm (ray-based)
 * Trig-free with undefined handling
 *
 * @param {Array.<Cell>} cells - DEM [row][col], may contain undefined
 * @param {number} resolution
 * @param {Function} elevationFun
 * @param {string} shadowProperty
 * @param {number} sunAzimuth - radians, clockwise from north (+Y)
 * @param {number} sunAltitude - radians - solar elevation angle above the local horizontal plane
 * @param {number} zFactor
 */
function referenceShadowV2(
    cells,
    resolution = 1000,
    elevationFun,
    shadowProperty = "shadow",
    sunAzimuth = 2.356, // 2PI/3
    sunAltitude = 0.15,
    zFactor = 1
) {

    //get geo extent
    const [minx, maxx] = extent(cells, c => c.x)
    const [miny, maxy] = extent(cells, c => c.y)

    //index cells by y and x
    const ind = cellsToGrid(cells)

    // Sun direction TOWARD the sun
    const ux = Math.sin(sunAzimuth);
    const uy = Math.cos(sunAzimuth);
    const tanAlt = Math.tan(sunAltitude);

    for (let y0 = miny; y0 <= maxy; y0 += resolution) {
        const row = ind[y0]
        if (!row) continue
        for (let x0 = minx; x0 <= maxx; x0 += resolution) {
            const cell0 = row[x0]
            if (!cell0) continue
            const z0raw = elevationFun(cell0);
            if (z0raw === undefined) continue;

            // ray
            let t = resolution;
            while (true) {
                const y = y0 - Math.round(uy * t / resolution) * resolution;
                if (!ind[y]) break; // transparent gap

                const x = x0 + Math.round(ux * t / resolution) * resolution;
                const cellq = ind[y][x];
                if (!cellq) break; // transparent gap

                const zqraw = elevationFun(cellq);
                if (zqraw === undefined) break; // transparent gap

                // the height above the ground where light ray can be reached
                const delta = (zqraw - z0raw) * zFactor - tanAlt * t;
                if (delta > 0) {
                    cell0[shadowProperty] = delta
                    break;
                }
                t += resolution;
            }
        }
    }
}






/**
 * Ground-truth terrain shadow algorithm (ray-based)
 * Trig-free with undefined handling
 *
 * @param {number[][]} elevation - DEM [row][col], may contain undefined
 * @param {number} resolution
 * @param {number} sunAzimuth - radians, clockwise from north (+Y)
 * @param {number} sunAltitude - radians - solar elevation angle above the local horizontal plane
 * @param {number} zFactor
 * @returns {(number|undefined)[][]} shade. Height above ground where ray light can be reached.
 */
function referenceShadow(
    elevation,
    resolution = 1000,
    sunAzimuth = 2.356, // 2PI/3
    sunAltitude = 0.15,
    zFactor = 1
) {
    const rows = elevation.length;
    const cols = elevation[0].length;

    // Sun direction TOWARD the sun
    const ux = Math.sin(sunAzimuth);
    const uy = -Math.cos(sunAzimuth);
    const tanAlt = Math.tan(sunAltitude);

    const shade = Array.from({ length: rows }, () => new Array(cols).fill(undefined));

    for (let y0 = 0; y0 < rows; y0++) {
        for (let x0 = 0; x0 < cols; x0++) {

            const z0raw = elevation[y0][x0];
            if (z0raw === undefined) continue;

            // cast ray
            const step = resolution
            let t = step;
            while (true) {
                const x = x0 - ux * t / resolution;
                const y = y0 - uy * t / resolution;

                const ix = Math.round(x);
                const iy = Math.round(y);

                if (ix < 0 || iy < 0 || ix >= cols || iy >= rows) break;

                const zqraw = elevation[iy][ix];
                if (zqraw === undefined) break; // transparent gap

                // the height above the ground where light ray can be reached
                const delta = (zqraw - z0raw) * zFactor - tanAlt * t;
                if (delta > 0) {
                    shade[y0][x0] = delta;
                    break;
                }
                t += step;
            }
        }
    }
    return shade;
}
