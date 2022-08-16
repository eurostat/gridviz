//@ts-check

import { App } from "../App"



/**
 * 
 * @param {App} app 
 * @param {number} zfTarget 
 * @param {number} factor 
 * @param {number} delayMs 
 * @param {function} callback 
 * @param {number} delayBeforeCallBackMs 
 * @returns 
 */
export function zoomTo(app, zfTarget, factor = 1.01, delayMs = 0, callback, delayBeforeCallBackMs = 0) {

    //ensure good factor value: >1
    factor = factor || 1.01
    if (factor < 1) {
        console.error("Unexpected value for factor: " + factor + ". Set to default value 1.01")
        factor == 1.01
    }

    const zfIni = this.getZoomFactor()
    if (zfTarget == zfIni) return
    if (zfTarget < zfIni) factor = 1 / factor
    let zf = zfIni
    let timer = setInterval(() => {

        //compute new zoom level
        zf = this.getZoomFactor() * factor
        if (zfTarget > zfIni && zf > zfTarget) zf = zfTarget
        if (zfTarget < zfIni && zf < zfTarget) zf = zfTarget

        //set new zoom level
        this.setZoomFactor(zf)
        this.cg.redraw()

        //target reached
        if (zf == zfTarget) {
            clearInterval(timer)
            //trigger callback, if any
            if (callback)
                setTimeout(() => {
                    callback()
                }, delayBeforeCallBackMs)
        }
    }, delayMs)
    return timer;
}


/**
 * 
 * @param {App} app 
 * @param {number} xTarget 
 * @param {number} yTarget 
 * @param {number} zfTarget 
 * @param {number} progressFactorPix
 * @param {number} delayMs 
 * @param {function} callback 
 * @param {number} delayBeforeCallBackMs 
 * @returns 
 */
export function goToStraight(app, xTarget = NaN, yTarget = NaN, zfTarget = NaN, progressFactorPix = 5, delayMs = 0, callback, delayBeforeCallBackMs = 0) {

    //store initial position/zoom
    const zfIni = this.getZoomFactor();
    const cIni = this.getGeoCenter();

    //default
    xTarget = isNaN(xTarget) ? cIni.x : xTarget
    yTarget = isNaN(yTarget) ? cIni.y : yTarget
    zfTarget = isNaN(zfTarget) ? zfIni : zfTarget

    //prepare for pan
    const dx = xTarget - cIni.x
    const dy = yTarget - cIni.y
    let d = Math.hypot(dx, dy)
    const ddx = progressFactorPix * zfIni * dx / d
    const ddy = progressFactorPix * zfIni * dy / d

    //prepare for zoom
    let r = zfTarget / zfIni
    const n = d / (progressFactorPix * zfIni)
    const zoomFactor = d > 0 ? Math.pow(r, 1 / n) : Math.pow(r, 1 / 10) //TODO not 10 ?

    //timer
    let timer = setInterval(() => {

        //compute and set new position
        if (d > 0) {
            const c = this.getGeoCenter();
            let nx = c.x + ddx
            let ny = c.y + ddy
            //if went too far, stop at target values
            if (nx < xTarget && xTarget < c.x) nx = xTarget
            if (c.x < xTarget && xTarget < nx) nx = xTarget
            if (ny < yTarget && yTarget < c.y) ny = yTarget
            if (c.y < yTarget && yTarget < ny) ny = yTarget
            this.setGeoCenter({ x: nx, y: ny })
            if (nx == xTarget && ny == yTarget) d = 0
        }

        //compute and set new zoom
        if (r != 1) {
            const zf = this.getZoomFactor()
            let nzf = zoomFactor * zf
            //if went too far, stop at target values
            if (nzf < zfTarget && zfTarget < zf) nzf = zfTarget
            if (zf < zfTarget && zfTarget < nzf) nzf = zfTarget
            this.setZoomFactor(nzf)
            if (nzf == zfTarget) r = 1
        }

        //redraw
        this.cg.redraw()

        //if target reached, stop
        if (d == 0 && r == 1) {
            console.log("OK !")
            clearInterval(timer)
            //trigger callback, if any
            if (callback)
                setTimeout(() => {
                    callback()
                }, delayBeforeCallBackMs)
        }

    }, delayMs)

    return timer;
}
