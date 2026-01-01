//@ts-check
'use strict'

import { Style } from '../core/Style.js'
import { cellsToMatrix } from '../utils/utils.js'
import { SquareColorWebGLStyle } from './SquareColorWebGLStyle.js'

/**
 * @module style
 * @author Julien Gaffuri
 */
export class ShadingRayStyle extends Style {
    /** @param {object} opts */
    constructor(opts) {
        super(opts)
        opts = opts || {}

        this.elevation = opts.elevation //(c,r,z,vs) => elevation

        /** A function returning the color of the cell.
         * @type {function(import('../core/Dataset.js').Cell, number, number, object):string} */
        this.color = opts.color || (() => '#EA6BAC') //(c,r,z,vs) => {}

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

        //index cells by y and x
        let m = cellsToMatrix(cells, resolution, c => this.elevation(c, resolution, z, viewScale))
        const x0 = m.x0, y0=m.y0

        // compute ray casting shadow
        m = referenceShadow(m, resolution);

        // make cells
        cells = []
        for (let i = 0; i < m.length; i++) {
            const row = m[i]
            const y = y0 - i * resolution
            for (let j = 0; j < row.length; j++) {
                const sh = row[j]
                if (!sh) continue
                cells.push({ x: x0 + j * resolution, y: y, shadow: sh })
            }
        }

        //TODO use category instead
        const sty = new SquareColorWebGLStyle({
            //viewScale: cells => d3.max(cells, c => c.shadow),
            //tFun: (c, r, z, max) => 0.4,//Math.min(1, c.shadow / max),
            tFun: () => 0.4,
            color: t => "rgba(0,0,0," + t + ")",
        })
        sty.draw(cells, geoCanvas, resolution)

        //update legends
        this.updateLegends({ style: this, resolution: resolution, z: z, viewScale: viewScale })
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

    const tanAlt = Math.tan(sunAltitude);

    // Sun direction TOWARD the sun
    const dx = Math.sin(sunAzimuth);
    const dy = -Math.cos(sunAzimuth);

    // Normalize horizontal direction
    const len = Math.hypot(dx, dy);
    const ux = dx / len;
    const uy = dy / len;

    const shade = Array.from({ length: rows }, () =>
        new Array(cols).fill(undefined)
    );

    for (let y0 = 0; y0 < rows; y0++) {
        for (let x0 = 0; x0 < cols; x0++) {

            const z0raw = elevation[y0][x0];
            if (z0raw === undefined) continue;

            const z0 = z0raw * zFactor;
            let shadowed = false;

            let t = resolution;

            while (true) {
                const x = x0 - ux * t / resolution;
                const y = y0 - uy * t / resolution;

                const ix = Math.round(x);
                const iy = Math.round(y);

                if (ix < 0 || iy < 0 || ix >= cols || iy >= rows) break;

                const zqraw = elevation[iy][ix];
                if (zqraw === undefined) break; // transparent gap

                const zq = zqraw * zFactor;
                const rayZ = z0 + tanAlt * t;

                // the height above the ground where light ray can be reached
                const delta = zq - rayZ;
                if (delta > 0) {
                    shadowed = delta;
                    break;
                }

                t += resolution;
            }

            // softness scale controls penumbra width
            //const softness = 0.5; // radians
            //shadowStrength = Math.min(1, shadowed / softness);
            //shade[y][x] = Math.round(255 * (1 - shadowStrength));
            if (!shadowed) continue
            if (shadowed) shade[y0][x0] = shadowed;
        }
    }
    return shade;
}
