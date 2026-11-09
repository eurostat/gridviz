// Browser tests, with real data: the examples of the gallery, in Chrome, with the real datasets (they need the network).
//
//     npm run test:browser                 the hover, on a few examples
//     npm run test:browser -- --all        also: every example of the gallery loads without error
//     npm run test:browser -- --lib=<file> test a bundle you built (default: one built from src/)
//
// What it checks. With the pointer on a cell of the map, the rectangle of the selection must be on the canvas, whatever
// the application does on hover (nothing, a redraw from cellInfoHTML, a redraw on each mouse move), when the map is
// scrolled (zoomed with the wheel) and when it is panned (dragged). Issue #174. The share of the frames without the rectangle
// is compared to the one of the same example without any hook.
//
// It needs Chrome (set CHROME_PATH if it is not found) and playwright-core (a dev dependency).

import { chromium } from 'playwright-core'
import { execFileSync } from 'node:child_process'
import { createServer } from 'node:http'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '..')
const args = process.argv.slice(2)
const all = args.includes('--all')
const libArg = (args.find((a) => a.startsWith('--lib=')) || '').slice(6)

// the examples of the hover tests: real datasets, different styles. Each has a map of the whole window and no panel on the map.
const hoverExamples = [
    'basics/basic_CSV.html',
    'basics/missing_values.html',
    'styles/interpolator.html',
    'styles/squarecolorwgl_dark.html',
    'demos/EUR_bu.html',
]
const maxMissingOverBaseline = 8 // percent of the frames
const maxRestingRedraws = 2 // in 1 s, with the pointer at rest

// ---------- the bundle and the server ----------

const bundle = (() => {
    if (libArg) return fs.readFileSync(libArg)
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'gridviz-test-'))
    console.log('building the bundle from src/ ...')
    execFileSync(
        process.execPath,
        [
            path.join(root, 'node_modules', 'webpack-cli', 'bin', 'cli.js'),
            '--config',
            path.join(root, 'webpack.config.prod.cjs'),
            '--output-path',
            dir,
            '--output-filename',
            'gridviz.js',
        ],
        { cwd: root, stdio: 'ignore' }
    )
    return fs.readFileSync(path.join(dir, 'gridviz.js'))
})()

const types = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.css': 'text/css',
    '.png': 'image/png',
    '.csv': 'text/csv',
}
const server = createServer((req, res) => {
    const file = path.join(root, decodeURIComponent(req.url.split('?')[0]))
    if (!file.startsWith(root) || !fs.existsSync(file) || fs.statSync(file).isDirectory())
        return res.writeHead(404).end()
    res.writeHead(200, { 'content-type': types[path.extname(file)] || 'application/octet-stream' }).end(
        fs.readFileSync(file)
    )
})
await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve))
const base = `http://127.0.0.1:${server.address().port}/`

const browser = await chromium.launch({
    executablePath: process.env.CHROME_PATH || undefined,
    channel: process.env.CHROME_PATH ? undefined : 'chrome',
    headless: true,
    // the maps of some examples draw images of other servers: with web security on, the canvas could not be read
    args: ['--disable-web-security'],
})

// ---------- a page of an example, with the bundle we test ----------

const openExample = async (example, needMap = true, contextOptions = { viewport: { width: 1200, height: 800 } }) => {
    const context = await browser.newContext(contextOptions)
    // the bundle of the page is replaced by the one we test
    await context.route(/\/gridviz(\.min)?\.js(\?.*)?$/, (r) =>
        r.fulfill({ body: bundle, contentType: 'application/javascript' })
    )
    // the maps of the page: found when they redraw
    await context.addInitScript(() => {
        window.__maps = []
        let g
        Object.defineProperty(window, 'gridviz', {
            configurable: true,
            get: () => g,
            set: (v) => {
                g = v
                if (v && v.Map && v.Map.prototype && !v.Map.prototype.__w) {
                    const P = v.Map.prototype
                    P.__w = true
                    for (const name of ['redraw', 'redrawNow', 'focusCell']) {
                        const o = P[name]
                        P[name] = function (...a) {
                            if (!window.__maps.includes(this)) window.__maps.push(this)
                            return o.apply(this, a)
                        }
                    }
                }
            },
        })
    })
    const page = await context.newPage()
    const errors = []
    page.on('pageerror', (e) => errors.push(String(e).slice(0, 160)))
    await page.goto(base + example, { waitUntil: 'load', timeout: 40000 })
    await page.waitForLoadState('networkidle', { timeout: 25000 }).catch(() => {})
    await page.waitForTimeout(2500)
    const ok = await page.evaluate(() => !!(window.__maps[0] && window.__maps[0].geoCanvas))
    if (!ok) {
        if (needMap) throw new Error('no map in ' + example)
        return { page, context, errors }
    }
    // the tools of the test, in the page
    await page.evaluate(() => {
        const map = (window.M = window.__maps[0])
        const cv = map.geoCanvas.canvas
        const c = document.createElement('canvas').getContext('2d')
        c.fillStyle = map.selectionRectangleColor
        c.fillRect(0, 0, 1, 1)
        const [R, G, B] = c.getImageData(0, 0, 1, 1).data
        // is the rectangle of the selection on the canvas?
        window.hasRect = () => {
            const d = cv.getContext('2d', { willReadFrequently: true }).getImageData(0, 0, cv.width, cv.height).data
            for (let i = 0; i < d.length; i += 4) if (d[i] === R && d[i + 1] === G && d[i + 2] === B) return true
            return false
        }
        // is there a cell under the pointer (the way the map looks for it), and is the pointer over the map?
        window.cellAt = (x, y) => {
            if (document.elementFromPoint(x, y) !== cv) return false
            const r = cv.getBoundingClientRect()
            const z = map.geoCanvas.view.z
            const pos = {
                x: map.geoCanvas.pixToGeoX(x - r.x + map.tooltip.xMouseOffset),
                y: map.geoCanvas.pixToGeoY(y - r.y + map.tooltip.yMouseOffset),
            }
            for (let i = map.layers.length - 1; i >= 0; i--) {
                const l = map.layers[i]
                const v = l.visible
                if (typeof v === 'function' ? !v(z) : v === false) continue
                if (l.cellInfoHTML === 'none' || !l.cellInfoHTML || !l.getDataset) continue
                const ds = l.getDataset(z)
                if (!ds) continue
                if (ds.getCellFromPosition(pos, ds.getViewCache())) return true
                if (!map.digForTooltip) return false
            }
            return false
        }
        // the hooks of an application
        window.hooks = {
            none: () => () => {},
            // the hover code in the cellInfoHTML of the layers, which redraws the map
            info: () => {
                const saved = map.layers.map((l) => l.cellInfoHTML)
                map.layers.forEach((l) => {
                    const o = l.cellInfoHTML
                    if (typeof o === 'function')
                        l.cellInfoHTML = (...a) => {
                            map.redraw()
                            return o.apply(l, a)
                        }
                })
                return () => map.layers.forEach((l, i) => (l.cellInfoHTML = saved[i]))
            },
            // the hover code of the issue #174, on the data layer of the example: a stroke layer below (its cellInfoHTML is
            // 'none') shows the cell hovered, with a filter which the cellInfoHTML of the data layer sets for each cell, and
            // asks for a redraw
            issue174: () => {
                const dataLayer = [...map.layers]
                    .reverse()
                    .find((l) => l.getDataset && typeof l.cellInfoHTML === 'function')
                const strokeStyle = new gridviz.StrokeStyle({
                    strokeWidth: (c, r, z) => 4 * z,
                    strokeColor: () => 'white',
                    blendOperation: () => 'difference',
                    filter: () => false,
                })
                const strokeLayer = new gridviz.GridLayer(dataLayer.dataset, [strokeStyle])
                strokeLayer.cellInfoHTML = 'none'
                const saved = map.layers
                map.layers = [
                    ...saved.slice(0, saved.indexOf(dataLayer)),
                    strokeLayer,
                    ...saved.slice(saved.indexOf(dataLayer)),
                ]
                const original = dataLayer.cellInfoHTML
                dataLayer.cellInfoHTML = (cell, r) => {
                    const html = original(cell, r)
                    if (html) {
                        strokeStyle.filter = (c) => c.x === cell.x && c.y === cell.y
                        map.redraw()
                    }
                    return html
                }
                return () => {
                    dataLayer.cellInfoHTML = original
                    map.layers = saved
                }
            },
            // a redraw on each mouse move
            move: () => {
                const f = () => map.redraw()
                cv.addEventListener('mousemove', f)
                return () => cv.removeEventListener('mousemove', f)
            },
        }
    })
    return { page, context, errors }
}

// ---------- the scenarios ----------

// the pointer goes over the cells of the map: the share of the frames, with the pointer on a cell, without the rectangle
const hover = async (page, hook) => {
    const undo = await page.evaluate((h) => {
        window.undo = window.hooks[h]()
        window.draws = 0
        const o = M.redrawNow.bind(M)
        window.redrawNow = M.redrawNow
        M.redrawNow = () => (window.draws++, o())
        window.frames = []
        window.on = false
        window.lastMove = 0
        const loop = () => {
            requestAnimationFrame(loop)
            // the frames of the pointer on a cell, which has rested for 100 ms (the rectangle follows it by a frame or two)
            setTimeout(
                () => window.on && performance.now() - window.lastMove > 100 && window.frames.push(window.hasRect()),
                0
            )
        }
        if (!window.looping) {
            window.looping = true
            requestAnimationFrame(loop)
        }
    }, hook)
    const box = await page.evaluate(() => {
        const r = M.geoCanvas.canvas.getBoundingClientRect()
        return { x: r.x, y: r.y, w: r.width, h: r.height }
    })
    let onCells = 0
    for (const fy of [0.4, 0.5, 0.6])
        for (let fx = 0.2; fx <= 0.8; fx += 0.05) {
            const x = box.x + box.w * fx
            const y = box.y + box.h * fy
            await page.mouse.move(x, y, { steps: 2 })
            const on = await page.evaluate(
                ([x, y]) => ((window.lastMove = performance.now()), (window.on = window.cellAt(x, y))),
                [x, y]
            )
            if (on) onCells++
            await page.waitForTimeout(120)
        }
    await page.evaluate(() => (window.draws = 0))
    await page.waitForTimeout(1000)
    const result = await page.evaluate(() => {
        window.on = false
        window.undo()
        M.redrawNow = window.redrawNow
        return { frames: window.frames.length, missing: window.frames.filter((f) => !f).length, resting: window.draws }
    })
    await page.mouse.move(2, 2)
    await page.waitForTimeout(200)
    return { ...result, onCells, missingPct: result.frames ? Math.round((100 * result.missing) / result.frames) : null }
}

// a cell under the pointer, then the map is scrolled or panned: when the gesture and the loading of the data are over,
// the hover is on the cell under the pointer
const gesture = async (page, kind, hook) => {
    await page.evaluate((h) => (window.undo = window.hooks[h]()), hook)
    const box = await page.evaluate(() => {
        const r = M.geoCanvas.canvas.getBoundingClientRect()
        return { x: r.x, y: r.y, w: r.width, h: r.height }
    })
    // a cell near the center
    let target
    for (let dy = 0; dy < 160 && !target; dy += 16)
        for (let dx = 0; dx < 240 && !target; dx += 12) {
            const x = box.x + box.w * 0.5 + dx
            const y = box.y + box.h * 0.5 + dy
            if (await page.evaluate(([x, y]) => window.cellAt(x, y), [x, y])) target = [x, y]
        }
    if (!target) return { skipped: 'no cell under the pointer' }
    await page.mouse.move(target[0] - 3, target[1] - 3)
    await page.mouse.move(target[0], target[1], { steps: 3 })
    await page.waitForTimeout(700)
    if (kind === 'scroll') for (let i = 0; i < 3; i++) await page.mouse.wheel(0, -120), await page.waitForTimeout(90)
    else {
        await page.mouse.down()
        for (let i = 1; i <= 6; i++)
            await page.mouse.move(target[0] + i * 5, target[1] + i * 3), await page.waitForTimeout(30)
        await page.mouse.up()
        target = [target[0] + 30, target[1] + 18]
    }
    // wait for the end of the gesture and the loading of the data: up to 6 s for the rectangle
    let rect = false
    let cell = false
    for (let t = 0; t < 6000 && !rect; t += 150) {
        await page.waitForTimeout(150)
        ;[cell, rect] = await page.evaluate(([x, y]) => [window.cellAt(x, y), window.hasRect()], target)
    }
    // the tooltip fades in: wait for it, up to 1.5 s
    let state
    for (let t = 0; t <= 1500; t += 100) {
        state = await page.evaluate(() => ({
            cursor: M.geoCanvas.canvas.style.cursor,
            tooltip: +getComputedStyle(M.tooltip.tooltip.node()).opacity,
        }))
        if (state.tooltip > 0.5) break
        await page.waitForTimeout(100)
    }
    await page.evaluate(() => window.undo())
    return { cell, rect, ...state }
}

// ---------- run ----------

let failures = 0
const fail = (msg) => {
    failures++
    console.log('   FAIL ' + msg)
}

for (const example of hoverExamples) {
    console.log('\n' + example)
    let t
    try {
        t = await openExample('examples/' + example)
    } catch (e) {
        fail(String(e))
        continue
    }
    const { page, context, errors } = t
    const baseline = await hover(page, 'none')
    console.log(
        `   no hook     ${baseline.onCells} positions on a cell, ${baseline.frames} frames, missing ${baseline.missingPct}%`
    )
    if (baseline.onCells < 5 || baseline.frames < 50)
        fail('too few cells under the pointer to test (' + baseline.onCells + ')')
    for (const hook of ['info', 'move', 'issue174']) {
        const r = await hover(page, hook)
        console.log(
            `   ${hook.padEnd(11)} ${r.onCells} positions on a cell, ${r.frames} frames, missing ${
                r.missingPct
            }%, redraws at rest ${r.resting}`
        )
        if (r.missingPct > baseline.missingPct + maxMissingOverBaseline)
            fail(
                `${hook}: the rectangle is missing in ${r.missingPct}% of the frames (${baseline.missingPct}% without hook)`
            )
        if (r.resting > maxRestingRedraws)
            fail(`${hook}: ${r.resting} redraws in 1 s with the pointer at rest (a loop?)`)
    }
    for (const kind of ['scroll', 'pan'])
        for (const hook of ['none', 'info', 'issue174']) {
            const r = await gesture(page, kind, hook)
            if (r.skipped) {
                console.log(`   ${kind} (${hook}): skipped, ${r.skipped}`)
                continue
            }
            console.log(
                `   ${kind} (${hook}): cell under the pointer ${r.cell}, rectangle ${r.rect}, cursor ${r.cursor}, tooltip ${r.tooltip}`
            )
            if (r.cell && !r.rect)
                fail(`${kind} (${hook}): no rectangle on the cell under the pointer once the gesture is over`)
            if (r.cell && !(r.tooltip > 0.5))
                fail(`${kind} (${hook}): no tooltip for the cell under the pointer once the gesture is over`)
            if (r.cell && r.cursor !== 'pointer') fail(`${kind} (${hook}): the cursor is '${r.cursor}' over a cell`)
        }
    if (errors.length) fail('page errors: ' + errors.join(' | '))
    await context.close()
}

// ---------- the limits of the view, on the example of the limits ----------

const limitsTests = async () => {
    console.log('\nbasics/limits.html: the limits of the view')
    const check = (ok, msg) => (ok ? console.log('   ok   ' + msg) : fail(msg))
    const near = (a, b, tolerance = 1) => Math.abs(a - b) <= tolerance
    const { page, context, errors } = await openExample('examples/basics/limits.html')
    const view = () => page.evaluate(() => ({ ...M.getView(), e: M.geoCanvas.updateExtentGeo(0) }))
    const box = await page.evaluate(() => {
        const r = M.geoCanvas.canvas.getBoundingClientRect()
        return { x: r.x, y: r.y, w: r.width, h: r.height }
    })
    const cx = box.x + box.w / 2
    const cy = box.y + box.h / 2
    const wheel = async (dy, times) => {
        for (let i = 0; i < times; i++) await page.mouse.wheel(0, dy), await page.waitForTimeout(40)
        await page.waitForTimeout(250)
    }
    const drag = async (x0, y0, x1, y1) => {
        await page.mouse.move(x0, y0)
        await page.mouse.down()
        await page.mouse.move(x1, y1, { steps: 15 })
    }
    const inside = (v, [xMin, yMin, xMax, yMax]) =>
        v.e.xMin >= xMin - 1 && v.e.yMin >= yMin - 1 && v.e.xMax <= xMax + 1 && v.e.yMax <= yMax + 1
    const reset = (x, y, z, set) =>
        page.evaluate(
            ([x, y, z, set]) => {
                M.setViewExtent(set.view)
                M.setCenterExtent(set.center || [undefined, undefined, undefined, undefined])
                M.setZoomExtent(set.zoom)
                M.setView(x, y, z).redraw()
            },
            [x, y, z, set]
        )
    const viewExtent = [2500000, 1300000, 6500000, 5300000]
    const zoom = [200, 3000]

    // the view extent, zoomed out to the limit and dragged to a corner
    await page.mouse.move(cx, cy)
    await wheel(500, 8)
    let v = await view()
    check(near(v.z, 3000), `the wheel stops at the zoom limit (z=${v.z})`)
    await page.evaluate(() => {
        window.draws = 0
        const o = M.redrawNow.bind(M)
        M.redrawNow = () => (window.draws++, o())
    })
    await wheel(500, 3)
    check((await page.evaluate(() => window.draws)) === 0, 'a wheel event beyond the zoom limit does not redraw')
    await drag(box.x + 50, box.y + 50, box.x + box.w - 50, box.y + box.h - 50)
    await page.mouse.up()
    await page.waitForTimeout(300)
    v = await view()
    check(
        inside(v, viewExtent),
        `dragged to a corner, the view stays inside the extent (${Math.round(v.e.xMin)}, ${Math.round(v.e.yMax)})`
    )
    check(near(v.e.xMin, viewExtent[0]) && near(v.e.yMax, viewExtent[3]), 'and it reaches the limit')

    // wheeling out next to a limit
    await reset(viewExtent[0] + (box.w / 2) * 500, 3000000, 500, { view: viewExtent, zoom })
    await page.mouse.move(box.x + box.w - 20, cy)
    await wheel(120, 3)
    v = await view()
    check(
        v.z > 500 && inside(v, viewExtent),
        `zooming out next to a limit, the view stays inside the extent (z=${Math.round(v.z)})`
    )

    // a drag past the limit and back: the map stays under the pointer
    for (const [name, set, xLimit] of [
        ['viewExtent', { view: viewExtent, zoom }, viewExtent[2] - (box.w / 2) * 2000],
        ['centerExtent', { center: [4000000, 2400000, 5000000, 3400000], zoom }, 5000000],
    ]) {
        await reset(xLimit - 200000, 2900000, 2000, set)
        const x0 = box.x + box.w - 20
        await drag(x0, cy, x0 - 300, cy) // 100 pixels are enough to reach the limit: 200 beyond it
        const atLimit = await view()
        check(near(atLimit.x, xLimit), `${name}: a drag stops at the limit (x=${Math.round(atLimit.x)})`)
        await page.mouse.move(x0 - 150, cy, { steps: 8 })
        const back = await view()
        check(near(back.x, xLimit), `${name}: dragging back, the map waits for the pointer (x=${Math.round(back.x)})`)
        await page.mouse.move(x0 - 50, cy, { steps: 8 })
        const further = await view()
        check(
            near(further.x, xLimit - 50 * 2000, 2),
            `${name}: then it follows the pointer (x=${Math.round(further.x)})`
        )
        await page.mouse.up()
        await page.waitForTimeout(250)
    }

    // the zoom buttons
    await reset(4500000, 2900000, 1000, { view: viewExtent, zoom })
    await page.evaluate(() => {
        M.addZoomButtons()
        for (let i = 0; i < 30; i++) M.zoomButtons.zoomOut()
    })
    v = await view()
    check(near(v.z, 3000) && inside(v, viewExtent), `the zoom buttons stop at the zoom limit (z=${v.z})`)
    await page.evaluate(() => {
        for (let i = 0; i < 60; i++) M.zoomButtons.zoomIn()
    })
    check(near((await view()).z, 200), 'in both directions')

    // the gestures start from the view set by the application: d3 does not know it
    await reset(4500000, 2900000, 800, { zoom })
    await page.waitForTimeout(250)
    await page.mouse.move(box.x + 300, cy)
    const under = () =>
        page.evaluate(([x, y]) => [M.geoCanvas.pixToGeoX(x), M.geoCanvas.pixToGeoY(y)], [300, box.h / 2])
    const g0 = await under()
    await wheel(-120, 2)
    const g1 = await under()
    v = await view()
    check(
        v.z < 800 && near(g0[0], g1[0], v.z * 2) && near(g0[1], g1[1], v.z * 2),
        'without a limit of the position, the wheel zooms at the pointer, from a view set by setView'
    )
    await wheel(500, 8)
    check(near((await view()).z, 3000), 'and the zoom limit holds after setView')

    // nothing limits the position: a drag follows the pointer, far away
    await reset(4500000, 2900000, 1000, { zoom })
    await drag(box.x + box.w - 20, cy, box.x + 20, cy)
    await page.mouse.up()
    await page.waitForTimeout(250)
    check(
        near((await view()).x, 4500000 + (box.w - 40) * 1000, 2),
        'without a limit of the position, a drag is not limited'
    )

    if (errors.length) fail('page errors: ' + errors.join(' | '))
    await context.close()
}
await limitsTests()

// ---------- a phone: the tooltip of a tap does not come back after a pan or a zoom with the fingers ----------

const touchTests = async () => {
    const example = hoverExamples[0]
    console.log(`\n${example}, on a phone: the tooltip is for a tap, not for a pan or a zoom`)
    const check = (ok, msg) => (ok ? console.log('   ok   ' + msg) : fail(msg))
    const { page, context, errors } = await openExample('examples/' + example, true, {
        viewport: { width: 390, height: 844 },
        deviceScaleFactor: 2,
        hasTouch: true,
        isMobile: true,
    })
    const cdp = await context.newCDPSession(page)
    const touch = (type, points) =>
        cdp.send('Input.dispatchTouchEvent', { type, touchPoints: points.map(([x, y], id) => ({ x, y, id })) })
    const opacity = () => page.evaluate(() => +getComputedStyle(M.tooltip.tooltip.node()).opacity)
    // the highest opacity of the tooltip on any frame, from now on
    const watch = () =>
        page.evaluate(() => {
            window.maxTip = 0
            if (window.watching) return
            window.watching = true
            const frame = () => {
                window.maxTip = Math.max(window.maxTip, +getComputedStyle(M.tooltip.tooltip.node()).opacity)
                requestAnimationFrame(frame)
            }
            requestAnimationFrame(frame)
        })
    const box = await page.evaluate(() => {
        const r = M.geoCanvas.canvas.getBoundingClientRect()
        return { x: r.x, y: r.y, w: r.width, h: r.height }
    })
    const findCell = async () => {
        for (let dy = 0; dy < 200; dy += 10)
            for (let dx = -120; dx < 120; dx += 8) {
                const x = box.x + box.w / 2 + dx
                const y = box.y + box.h / 2 + dy
                if (await page.evaluate(([x, y]) => window.cellAt(x, y), [x, y])) return [x, y]
            }
    }
    let target = await findCell()
    if (!target) return fail('no cell to tap')
    const tap = async () => {
        await touch('touchStart', [target])
        await page.waitForTimeout(50)
        await touch('touchEnd', [])
        let tip = 0
        for (let t = 0; t < 1500 && tip < 0.5; t += 100) await page.waitForTimeout(100), (tip = await opacity())
        return tip
    }
    const clear = async () => {
        await page.evaluate(() => M.clearHover())
        await page.waitForTimeout(500)
    }
    const settle = () => page.waitForTimeout(2500)

    // a tap on a cell shows its tooltip: without it, the checks below would pass with no tooltip at all
    check((await tap()) > 0.5, 'a tap on a cell shows its tooltip')

    // a drag with one finger, from somewhere else
    await clear()
    await watch()
    let p = [box.x + box.w * 0.8, box.y + box.h * 0.3]
    await touch('touchStart', [p])
    for (let i = 0; i < 15; i++)
        (p = [p[0] - 12, p[1] + 4]), await touch('touchMove', [p]), await page.waitForTimeout(16)
    await touch('touchEnd', [])
    await settle()
    check(
        (await page.evaluate(() => window.maxTip)) < 0.05,
        'after a tap, a pan with a finger does not bring a tooltip back'
    )

    // a pinch, after another tap
    await tap()
    await clear()
    await watch()
    let a = [box.x + box.w / 2 - 40, box.y + box.h * 0.3]
    let b = [box.x + box.w / 2 + 40, box.y + box.h * 0.3]
    await touch('touchStart', [a])
    await touch('touchStart', [a, b])
    for (let i = 0; i < 15; i++)
        (a = [a[0] - 4, a[1]]), (b = [b[0] + 4, b[1]]), await touch('touchMove', [a, b]), await page.waitForTimeout(16)
    await touch('touchEnd', [])
    await settle()
    check((await page.evaluate(() => window.maxTip)) < 0.05, 'after a tap, a pinch does not bring a tooltip back')

    // a panel of the page over the map, scrolled with a finger: it makes no mouse event, and the tooltip must go all the same
    await clear()
    await page.evaluate(() => {
        const panel = document.createElement('div')
        panel.id = 'touch-panel'
        panel.style.cssText =
            'position:fixed;left:0;right:0;bottom:0;height:200px;overflow:auto;background:white;z-index:10000'
        panel.innerHTML = '<div style="height:1000px">a panel</div>'
        document.body.appendChild(panel)
    })
    target = await findCell()
    if (!target) return fail('no cell to tap')
    check((await tap()) > 0.5, 'a tap on a cell shows its tooltip, again')
    let q = [box.x + box.w / 2, box.y + box.h - 60]
    await touch('touchStart', [q])
    for (let i = 0; i < 10; i++) (q = [q[0], q[1] - 8]), await touch('touchMove', [q]), await page.waitForTimeout(16)
    await touch('touchEnd', [])
    await page.waitForTimeout(800)
    check((await opacity()) < 0.05, 'a scroll of a panel with a finger hides the tooltip')
    await page.evaluate(() => document.getElementById('touch-panel').remove())

    // a mouse still has its hover back after a redraw (the pointer is known again once the mouse moves)
    await clear()
    target = await findCell()
    if (!target) return fail('no cell for the mouse')
    await page.mouse.move(target[0] - 2, target[1] - 2)
    await page.mouse.move(target[0], target[1], { steps: 2 })
    await page.waitForTimeout(400)
    await page.evaluate(() => M.redrawNow())
    let tip = 0
    for (let t = 0; t < 1500 && tip < 0.5; t += 100) await page.waitForTimeout(100), (tip = await opacity())
    check(tip > 0.5, 'a mouse over a cell still has its tooltip after a redraw')

    if (errors.length) fail('page errors: ' + errors.join(' | '))
    await context.close()
}
await touchTests()

if (all) {
    // every example of the gallery loads, with its real data, without error
    const gallery = JSON.parse(fs.readFileSync(path.join(root, 'examples', 'gallery.json'), 'utf8')).map((e) => e.path)
    console.log(`\nthe ${gallery.length} examples of the gallery load without error:`)
    let next = 0
    const worker = async () => {
        while (next < gallery.length) {
            const example = gallery[next++]
            try {
                const { page, context, errors } = await openExample('examples/' + example, false)
                // the examples which use another version of gridviz, from a CDN, have no map to find
                console.log(
                    `   ${errors.length ? 'FAIL' : 'ok  '} ${example}${errors.length ? ': ' + errors.join(' | ') : ''}`
                )
                if (errors.length) failures++
                await context.close()
            } catch (e) {
                console.log(`   FAIL ${example}: ${String(e).slice(0, 120)}`)
                failures++
            }
        }
    }
    await Promise.all([worker(), worker(), worker(), worker()])
}

await browser.close()
server.close()
console.log(failures ? `\n${failures} failure(s)` : '\nall the browser tests pass')
process.exit(failures ? 1 : 0)
