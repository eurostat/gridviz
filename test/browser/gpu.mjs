// The GPU renderer on a map of its own, with no other map library: what it draws against what the map draws by itself, pixel by pixel. No network.
//
//     npm run test:gpu                     (a bundle built from src/)
//     npm run test:gpu -- --lib=<file>     (a bundle you built)
//
// It needs Chrome (set CHROME_PATH if it is not found) and playwright-core (a dev dependency).

import { chromium } from 'playwright-core'
import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '..')
const libArg = (process.argv.slice(2).find((a) => a.startsWith('--lib=')) || '').slice(6)

const bundleFile = (() => {
    if (libArg) return libArg
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'gridviz-test-'))
    console.log('building the bundle from src/ ...')
    execFileSync(process.execPath, [path.join(root, 'node_modules', 'webpack-cli', 'bin', 'cli.js'), '--config', path.join(root, 'webpack.config.prod.cjs'), '--output-path', dir, '--output-filename', 'gridviz.js'], { cwd: root, stdio: 'ignore' })
    return path.join(dir, 'gridviz.js')
})()

const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || undefined, channel: process.env.CHROME_PATH ? undefined : 'chrome', headless: true, args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] })
const page = await browser.newPage({ viewport: { width: 900, height: 700 } })
const errors = []
page.on('pageerror', (e) => errors.push(String(e)))
await page.setContent('<!doctype html><div id="m" style="width:800px;height:600px;position:relative"></div>')
await page.addScriptTag({ path: bundleFile })

const cases = {
    'colour classes (SquareColorCategoryWebGLStyle)': `new gridviz.SquareColorCategoryWebGLStyle({ code: (c) => (c.v > 60 ? 'a' : c.v > 30 ? 'b' : 'c'), color: { a: '#d7301f', b: '#fdbb84', c: '#fee8c8' } })`,
    'continuous colour (SquareColorWebGLStyle)': `new gridviz.SquareColorWebGLStyle({ tFun: (c) => c.v / 100, colors: ['#fff7ec', '#fc8d59', '#7f0000'] })`,
    'squares (ShapeColorSizeStyle)': `new gridviz.ShapeColorSizeStyle({ color: (c) => (c.v > 50 ? '#2b8cbe' : '#a6bddb') })`,
    'diamonds': `new gridviz.ShapeColorSizeStyle({ color: '#6a51a3', shape: 'diamond', size: (c, r) => r * 0.9 })`,
    'donuts': `new gridviz.ShapeColorSizeStyle({ color: '#d94801', shape: 'donut', size: (c, r) => r * 0.5 })`,
    'triangles up': `new gridviz.ShapeColorSizeStyle({ color: '#238b45', shape: 'triangle_up', size: (c, r) => r * 0.9 })`,
    'triangles down': `new gridviz.ShapeColorSizeStyle({ color: '#238b45', shape: 'triangle_down', size: (c, r) => r * 0.9 })`,
    'triangles left': `new gridviz.ShapeColorSizeStyle({ color: '#238b45', shape: 'triangle_left', size: (c, r) => r * 0.9 })`,
    'triangles right': `new gridviz.ShapeColorSizeStyle({ color: '#238b45', shape: 'triangle_right', size: (c, r) => r * 0.9 })`,
    'circles with a view scale (ShapeColorSizeStyle)': `new gridviz.ShapeColorSizeStyle({ color: '#238b45', shape: () => 'circle', viewScale: gridviz.viewScaleQuantile({ valueFunction: (c) => c.v, classNumber: 4, minSizePix: 3, maxSizeFactor: 0.9 }), size: (c, r, z, s) => s(c.v) })`,
}

let failed = 0
for (const [name, style] of Object.entries(cases)) {
    const result = await page.evaluate(async (styleCode) => {
        const container = document.getElementById('m')
        container.innerHTML = ''
        const w = 800, h = 600, z = 500
        const x0 = 400000, y0 = 300000
        const map = new gridviz.Map(container, { x: x0, y: y0, z, w, h, transparentBackground: true, disableZoom: true })
        const cells = []
        for (let i = 0; i < 60; i++) for (let j = 0; j < 40; j++) if ((i * 7 + j * 13) % 5) cells.push({ x: 200000 + i * 8000, y: 150000 + j * 8000, v: (i * 37 + j * 53) % 100 })
        const dataset = new gridviz.JSGrid(8000, cells)
        map.layers = [new gridviz.GridLayer(dataset, [eval(styleCode)], { cellInfoHTML: 'none' })]

        // gridviz alone
        // (several times: a browser can change how it draws a canvas once it has been read, and with that the edges of the circles)
        for (let i = 0; i < 6; i++) {
            map.redrawNow()
            map.geoCanvas.offscreenCtx.getImageData(0, 0, w, h)
        }
        const own = map.geoCanvas.offscreenCtx.getImageData(0, 0, w, h).data.slice()

        // on the GPU: the view as the host tells it, with y going up
        const renderer = new gridviz.GPUGridRenderer({
            isMoving: () => false,
            getView: () => ({ width: w, height: h, left: 0, top: 0, scaleX: 1 / z, scaleY: -1 / z, offsetX: w / 2 - x0 / z, offsetY: h / 2 + y0 / z, z }),
        })
        if (!renderer.ok) return { noWebGL: true }
        container.appendChild(renderer.canvas)
        renderer.attach(map)
        map.redrawNow()
        if (!renderer.drawsAll(map)) return { error: 'not all on the GPU' }
        // nothing on the map's canvas any more
        const left = map.geoCanvas.offscreenCtx.getImageData(0, 0, w, h).data
        let onOwn = 0
        for (let i = 3; i < left.length; i += 4) if (left[i]) onOwn++
        const dpr = Math.min(window.devicePixelRatio || 1, 2)
        const snap = renderer.snapshot()
        const pad = { x: Math.round(w * 0.25) * dpr, y: Math.round(h * 0.25) * dpr }
        const gpu = snap.getContext('2d').getImageData(pad.x, pad.y, w * dpr, h * dpr).data

        let drawn = 0, different = 0, far = 0, inkOwn = 0, inkGpu = 0
        for (let i = 0; i < own.length; i += 4) {
            if (own[i + 3] > 10) drawn++
            inkOwn += own[i + 3]
            inkGpu += gpu[i + 3]
            // the colours as they will look, weighted by their opacity: the colour of a pixel that can hardly be seen does not matter
            let d = Math.abs(own[i + 3] - gpu[i + 3])
            for (let k = 0; k < 3; k++) d = Math.max(d, Math.abs((own[i + k] * own[i + 3]) / 255 - (gpu[i + k] * gpu[i + 3]) / 255))
            if (d > 16) different++
            if (d > 128) far++
        }
        const out = { drawnPercent: (100 * drawn) / (w * h), differentPercent: (100 * different) / (w * h), farPercent: (100 * far) / (w * h), ink: inkGpu / inkOwn, onOwn }

        // and back: detached, the map draws by itself again
        renderer.detach(map)
        map.redrawNow()
        const back = map.geoCanvas.offscreenCtx.getImageData(0, 0, w, h).data
        let changed = 0
        for (let i = 0; i < back.length; i += 4) if (Math.max(Math.abs(back[i] - own[i]), Math.abs(back[i + 1] - own[i + 1]), Math.abs(back[i + 2] - own[i + 2]), Math.abs(back[i + 3] - own[i + 3])) > 16) changed++
        out.changedAfterDetachPercent = (100 * changed) / (w * h)
        map.destroy()
        renderer.canvas.remove()
        return out
    }, style)
    // the edges of small shapes differ, as they do between two ways a browser draws a canvas (a donut has twice as many edges): what counts is the amount of ink, and how few pixels are far off
    const ok = !result.noWebGL && !result.error && result.drawnPercent > 5 && result.differentPercent < (name === 'donuts' ? 15 : 8) && result.farPercent < 1 && Math.abs(result.ink - 1) < 0.05 && result.onOwn === 0 && result.changedAfterDetachPercent < 0.1
    console.log((ok ? 'ok    ' : 'FAIL  ') + name + '  ' + JSON.stringify(result))
    if (!ok) failed++
}
if (errors.length) {
    failed++
    console.log('errors in the page:', errors.slice(0, 5))
}
await browser.close()
console.log(failed ? failed + ' failed' : 'all passed')
process.exit(failed ? 1 : 0)
