// Mobile gestures on the ships example, with its real tiles.
// node test/browser/ships-touch.mjs [--lib=path/to/bundle]
import { chromium } from 'playwright-core'
import { execFileSync } from 'node:child_process'
import { createServer } from 'node:http'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '..')
const lib = (process.argv.find((arg) => arg.startsWith('--lib=')) || '').slice(6)
const dir = lib ? null : fs.mkdtempSync(path.join(os.tmpdir(), 'gridviz-touch-'))
if (dir)
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
        { cwd: root, stdio: 'inherit' }
    )
const bundle = fs.readFileSync(lib || path.join(dir, 'gridviz.js'))
const server = createServer((req, res) => {
    const file = path.resolve(root, '.' + decodeURIComponent(req.url.split('?')[0]))
    if (!file.startsWith(root + path.sep) || !fs.existsSync(file) || !fs.statSync(file).isFile())
        return res.writeHead(404).end()
    const types = { '.html': 'text/html', '.js': 'application/javascript', '.css': 'text/css' }
    res.writeHead(200, { 'content-type': types[path.extname(file)] || 'application/octet-stream' }).end(
        fs.readFileSync(file)
    )
})
await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve))
const browser = await chromium.launch({
    executablePath: process.env.CHROME_PATH || undefined,
    channel: process.env.CHROME_PATH ? undefined : 'chrome',
    headless: true,
    args: ['--disable-web-security'],
})
let failed = false
try {
    const context = await browser.newContext({
        viewport: { width: 390, height: 844 },
        deviceScaleFactor: 2,
        hasTouch: true,
        isMobile: true,
    })
    await context.route(/\/gridviz(\.min)?\.js(\?.*)?$/, (route) =>
        route.fulfill({ body: bundle, contentType: 'application/javascript' })
    )
    await context.addInitScript(() => {
        let value
        Object.defineProperty(window, 'gridviz', {
            configurable: true,
            get: () => value,
            set: (v) => {
                value = v
                const original = v.Map.prototype.redraw
                v.Map.prototype.redraw = function (...args) {
                    window.M = this
                    return original.apply(this, args)
                }
            },
        })
    })
    const page = await context.newPage()
    const errors = []
    page.on('pageerror', (e) => errors.push(String(e)))
    await page.goto(`http://127.0.0.1:${server.address().port}/examples/demos/ships.html`, {
        waitUntil: 'load',
        timeout: 60000,
    })
    await page.waitForFunction(
        () => window.M && M.layers.some((l) => l.getDataset && l.getDataset(M.getZoom())?.getViewCache()?.length),
        null,
        { timeout: 60000 }
    )
    const panelInitiallyOpen = (await page.locator('#togglePanel').getAttribute('aria-expanded')) === 'true'
    if (panelInitiallyOpen) await page.locator('#togglePanel').click()
    const cdp = await context.newCDPSession(page)
    const touch = (type, points) =>
        cdp.send('Input.dispatchTouchEvent', {
            type,
            touchPoints: points.map(([x, y], id) => ({ x, y, id })),
        })
    const box = await page.evaluate(() => {
        const r = M.geoCanvas.canvas.getBoundingClientRect()
        return { x: r.x, y: r.y, w: r.width, h: r.height }
    })
    const point = [box.x + box.w * 0.65, box.y + box.h * 0.35]
    const check = (ok, message) => {
        console.log(`${ok ? 'ok' : 'FAIL'} ${message}`)
        if (!ok) failed = true
    }
    check(!panelInitiallyOpen, 'mobile controls start collapsed')
    await page.evaluate(() => {
        window.gridEvents = []
        M.onGridLoad = (event) =>
            window.gridEvents.push({
                phase: event.phase,
                kind: event.request.kind,
                outcome: event.outcome,
            })
    })
    let drag = [box.x + box.w * 0.77, box.y + box.h * 0.6]
    await touch('touchStart', [drag])
    drag = [drag[0] - 160, drag[1]]
    await touch('touchMove', [drag])
    await page.waitForTimeout(5000)
    const held = await page.evaluate(() => {
        const cv = M.geoCanvas.canvas
        const data = cv.getContext('2d').getImageData(cv.width - 120, 160, 120, 500).data
        let background = 0
        for (let i = 0; i < data.length; i += 4)
            if (data[i] === 16 && data[i + 1] === 19 && data[i + 2] === 28) background++
        return { background: background / (data.length / 4), events: window.gridEvents }
    })
    check(
        held.background < 0.95,
        `newly exposed map is drawn while the finger is held (${Math.round(held.background * 100)}% background)`
    )
    check(
        held.events.some((event) => event.phase === 'start' && event.kind === 'tile'),
        'tile loading events are raised during the pan'
    )
    check(
        held.events.some((event) => event.phase === 'end' && event.kind === 'tile' && event.outcome === 'loaded'),
        'tile completion is reported during the pan'
    )
    await touch('touchEnd', [])
    await page.waitForTimeout(500)

    // A flick glides only after release; the next gesture can interrupt it.
    let flick = [box.x + box.w * 0.8, box.y + box.h * 0.6]
    await touch('touchStart', [flick])
    for (let i = 0; i < 4; i++) {
        flick = [flick[0] - 20, flick[1]]
        await touch('touchMove', [flick])
        await page.waitForTimeout(20)
    }
    await touch('touchEnd', [])
    const atRelease = await page.evaluate(() => ({ ...M.getView() }))
    await page.waitForTimeout(500)
    const afterFlick = await page.evaluate(() => ({ ...M.getView() }))
    check(afterFlick.x > atRelease.x + atRelease.z, 'a touch flick continues after release')
    check(Math.abs(afterFlick.z - atRelease.z) < atRelease.z * 1e-9, 'a glide pans without changing zoom')

    flick = [box.x + box.w * 0.8, box.y + box.h * 0.6]
    await touch('touchStart', [flick])
    for (let i = 0; i < 4; i++) {
        flick = [flick[0] - 20, flick[1]]
        await touch('touchMove', [flick])
        await page.waitForTimeout(20)
    }
    await touch('touchEnd', [])
    await page.waitForTimeout(60)
    await touch('touchStart', [flick])
    const interrupted = await page.evaluate(() => ({ ...M.getView() }))
    await page.waitForTimeout(300)
    const heldStill = await page.evaluate(() => ({ ...M.getView() }))
    check(Math.abs(interrupted.x - heldStill.x) < interrupted.z * 0.1, 'a new touch stops the glide')
    await touch('touchEnd', [])
    await page.waitForTimeout(300)

    flick = [box.x + box.w * 0.8, box.y + box.h * 0.6]
    await touch('touchStart', [flick])
    for (let i = 0; i < 4; i++) {
        flick = [flick[0] - 20, flick[1]]
        await touch('touchMove', [flick])
        await page.waitForTimeout(20)
    }
    await touch('touchEnd', [])
    await page.waitForTimeout(60)
    const programmed = await page.evaluate(() => {
        const { x, y, z } = M.getView()
        M.setView(x + 10000, y, z).redraw()
        return { ...M.getView() }
    })
    await page.waitForTimeout(500)
    const afterProgrammed = await page.evaluate(() => ({ ...M.getView() }))
    check(Math.abs(programmed.x - afterProgrammed.x) < programmed.z * 0.1, 'setView interrupts a glide')

    const limit = await page.evaluate(() => {
        const { x, y, z } = M.getView()
        M.setCenterExtent([x - 200 * z, y - 200 * z, x + 30 * z, y + 200 * z])
        return x + 30 * z
    })
    flick = [box.x + box.w * 0.8, box.y + box.h * 0.6]
    await touch('touchStart', [flick])
    for (let i = 0; i < 4; i++) {
        flick = [flick[0] - 20, flick[1]]
        await touch('touchMove', [flick])
        await page.waitForTimeout(20)
    }
    await touch('touchEnd', [])
    await page.waitForTimeout(600)
    const bounded = await page.evaluate(() => ({ ...M.getView() }))
    check(bounded.x <= limit + bounded.z * 0.01, 'touch panning and glide respect position limits')
    await page.evaluate(() => M.setCenterExtent([undefined, undefined, undefined, undefined]))

    await page.emulateMedia({ reducedMotion: 'reduce' })
    flick = [box.x + box.w * 0.8, box.y + box.h * 0.6]
    await touch('touchStart', [flick])
    for (let i = 0; i < 4; i++) {
        flick = [flick[0] - 20, flick[1]]
        await touch('touchMove', [flick])
        await page.waitForTimeout(20)
    }
    await touch('touchEnd', [])
    const reducedStart = await page.evaluate(() => ({ ...M.getView() }))
    await page.waitForTimeout(500)
    const reducedEnd = await page.evaluate(() => ({ ...M.getView() }))
    check(Math.abs(reducedStart.x - reducedEnd.x) < reducedStart.z * 0.1, 'reduced motion disables the glide')
    await page.emulateMedia({ reducedMotion: 'no-preference' })

    // Keyboard users can reach both controls and return to the same zoom.
    const zoomBefore = await page.evaluate(() => M.getZoom())
    await page.locator('#map canvas').first().focus()
    await page.keyboard.press('Tab')
    check(
        await page.locator('.gridviz-zoom-button--in').evaluate((el) => document.activeElement === el),
        'zoom in is keyboard focusable'
    )
    await page.keyboard.press('Enter')
    const zoomIn = await page.evaluate(() => M.getZoom())
    check(zoomIn < zoomBefore, 'Enter activates zoom in')
    await page.locator('.gridviz-zoom-button--out').focus()
    check(
        await page.locator('.gridviz-zoom-button--out').evaluate((el) => document.activeElement === el),
        'zoom out is keyboard focusable'
    )
    await page.keyboard.press('Space')
    const zoomAfter = await page.evaluate(() => M.getZoom())
    check(Math.abs(zoomAfter - zoomBefore) < zoomBefore * 1e-9, 'keyboard zoom in and out return to the same zoom')
    await page.locator('#map canvas').first().focus()
    const beforeKey = await page.evaluate(() => ({ ...M.getView() }))
    await page.keyboard.press('ArrowRight')
    const afterKey = await page.evaluate(() => ({ ...M.getView() }))
    check(afterKey.x > beforeKey.x, 'arrow keys pan the focused map')

    const before = await page.evaluate(([x, y]) => {
        const cv = M.geoCanvas,
            r = cv.canvas.getBoundingClientRect()
        return { z: cv.view.z, x: cv.pixToGeoX(x - r.x), y: cv.pixToGeoY(y - r.y) }
    }, point)
    for (let i = 0; i < 2; i++) {
        await touch('touchStart', [point])
        await page.waitForTimeout(40)
        await touch('touchEnd', [])
        if (!i) await page.waitForTimeout(70)
    }
    await page.waitForTimeout(800)
    const after = await page.evaluate(([x, y]) => {
        const cv = M.geoCanvas,
            r = cv.canvas.getBoundingClientRect()
        return { ...cv.view, anchorX: cv.pixToGeoX(x - r.x), anchorY: cv.pixToGeoY(y - r.y) }
    }, point)
    check(
        Number.isFinite(after.x) && Number.isFinite(after.y) && after.z < before.z * 0.6,
        `double tap zooms in with a finite view (${JSON.stringify({ before, after })})`
    )
    check(
        Number.isFinite(after.anchorX) &&
            Number.isFinite(after.anchorY) &&
            Math.abs(after.anchorX - before.x) < after.z * 2 &&
            Math.abs(after.anchorY - before.y) < after.z * 2,
        'double tap keeps the tapped location fixed'
    )
    if (!Number.isFinite(after.x) || !Number.isFinite(after.y))
        await page.evaluate(() => M.setView(3849990.4, 3849990.4, 2086.9426).redrawNow())
    {
        await page.waitForFunction(
            () => M.layers.some((l) => l.getDataset && l.getDataset(M.getZoom())?.getViewCache()?.length),
            null,
            { timeout: 60000 }
        )
        let p = [box.x + box.w * 0.7, box.y + box.h * 0.4]
        await touch('touchStart', [p])
        p = [p[0] - 25, p[1] + 10]
        await touch('touchMove', [p])
        const snapshot = await page.evaluate(() => {
            M.redrawNow()
            const cv = M.geoCanvas,
                a = cv.ctx.getImageData(0, 0, cv.w, cv.h).data
            if (!cv.canvasSave.c) return { differences: -1 }
            const b = cv.canvasSave.c.getContext('2d').getImageData(0, 0, cv.w, cv.h).data
            let differences = 0
            for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) differences++
            return { differences, view: cv.canvasSave.view, current: { ...cv.view } }
        })
        check(
            snapshot.differences === 0 && JSON.stringify(snapshot.view) === JSON.stringify(snapshot.current),
            `a redraw during a pan replaces the gesture snapshot (${snapshot.differences} different channels)`
        )
        await touch('touchEnd', [])
    }
    // Offset the real map on the page and move both fingers while pinching.
    await page.evaluate(() => {
        const container = document.getElementById('map')
        container.style.cssText = 'position:relative; margin:70px 0 0 30px; width:320px; height:700px'
        M.setSize(320, 700).redrawNow()
    })
    await page.waitForTimeout(500)
    const geoAt = (points) =>
        page.evaluate((points) => {
            const cv = M.geoCanvas,
                r = cv.canvas.getBoundingClientRect()
            return points.map(([x, y]) => [cv.pixToGeoX(x - r.x), cv.pixToGeoY(y - r.y)])
        }, points)
    let fingers = [
        [130, 450],
        [210, 450],
    ]
    const startGeo = await geoAt(fingers)
    await touch('touchStart', [fingers[0]])
    await touch('touchStart', fingers)
    fingers = [
        [125, 465],
        [245, 465],
    ]
    await touch('touchMove', fingers)
    const endGeo = await geoAt(fingers)
    const z = await page.evaluate(() => M.getZoom())
    check(
        startGeo.every((p, i) => p.every((v, j) => Math.abs(v - endGeo[i][j]) < z * 2)),
        'an offset map follows both fingers of a moving pinch'
    )
    await touch('touchEnd', [])
    const pinchEnd = await page.evaluate(() => ({ ...M.getView() }))
    await page.waitForTimeout(600)
    const afterPinch = await page.evaluate(() => ({ ...M.getView() }))
    check(
        Math.abs(pinchEnd.x - afterPinch.x) < pinchEnd.z * 0.1 &&
            Math.abs(pinchEnd.y - afterPinch.y) < pinchEnd.z * 0.1,
        'a pinch does not start a glide'
    )
    await page.evaluate(() => M.setCenterExtent([0, 0, 10000000, 10000000]))
    const limitedBefore = await page.evaluate(() => M.getZoom())
    for (let i = 0; i < 2; i++) {
        await touch('touchStart', [[200, 500]])
        await page.waitForTimeout(40)
        await touch('touchEnd', [])
        if (!i) await page.waitForTimeout(70)
    }
    await page.waitForTimeout(800)
    const limitedAfter = await page.evaluate(() => ({ ...M.getView() }))
    check(
        Number.isFinite(limitedAfter.x) && Number.isFinite(limitedAfter.y) && limitedAfter.z < limitedBefore * 0.6,
        'double tap also zooms with a position limit'
    )
    await page.goto(`http://127.0.0.1:${server.address().port}/examples/demos/ships.html?panel=open`, {
        waitUntil: 'load',
        timeout: 60000,
    })
    check(
        (await page.locator('#togglePanel').getAttribute('aria-expanded')) === 'true',
        'a shared link can explicitly open the mobile panel'
    )
    check(!errors.length, 'no page errors: ' + errors.join(' | '))
    await context.close()
} finally {
    await browser.close()
    server.close()
    if (dir) {
        fs.rmSync(path.join(dir, 'gridviz.js'), { force: true })
        fs.rmSync(path.join(dir, 'gridviz.js.LICENSE.txt'), { force: true })
        fs.rmdirSync(dir)
    }
}
process.exit(failed ? 1 : 0)
