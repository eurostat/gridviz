/**
 * Checks the examples of the gallery and makes their thumbnails.
 *
 * For each example of gallery.json, the page is opened in a browser: errors of the page, failed requests and
 * blank pages are reported, and a screenshot is saved as a thumbnail in examples/img/previews/.
 *
 * Usage, from the root of the repository (the build in dist/ must be up to date):
 *     npm install --no-save playwright-core
 *     node examples/scripts/make-gallery.mjs [filter]
 * The optional filter is a regular expression on the path of the examples, to redo only some of them.
 * A browser is needed: Microsoft Edge, Google Chrome, or the one installed by playwright.
 *
 * Exit code: 0 if all the examples are fine, 1 otherwise.
 */
import fs from 'node:fs'
import http from 'node:http'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright-core'

const examplesDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const rootDir = path.resolve(examplesDir, '..')
const previewsDir = path.join(examplesDir, 'img', 'previews')

// size of the page when it is captured, and of the thumbnails (same ratio)
const PAGE = { width: 1200, height: 750 }
const THUMB = { width: 480, height: 300 }
// time to let a page load its data and draw, once the network is quiet
const SETTLE_MS = 3500
const CONCURRENCY = 4
// the thumbnails of the legends show the legend alone, captured with this pixel ratio, on this background, and at most this size relative to the thumbnail
const LEGEND = { pixelRatio: 3, background: '#eef2f7', fill: 0.88, maxZoom: 1.8, margin: 6 }

/** The name of the thumbnail file of an example. */
export const thumbName = (examplePath) => examplePath.replace(/\//g, '__').replace(/\.html$/, '.jpg')

const types = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.csv': 'text/csv',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.svg': 'image/svg+xml',
}
/** A static server of the repository, so that the pages are not opened from file:// */
const serve = () =>
    new Promise((resolve) => {
        const server = http.createServer((req, res) => {
            const file = path.join(rootDir, decodeURIComponent(req.url.split('?')[0]))
            if (!file.startsWith(rootDir) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
                res.writeHead(404).end()
                return
            }
            res.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream' })
            fs.createReadStream(file).pipe(res)
        })
        server.listen(0, '127.0.0.1', () => resolve(server))
    })

const launch = async () => {
    for (const channel of ['msedge', 'chrome', undefined]) {
        try {
            return await chromium.launch(channel ? { channel } : {})
        } catch (e) {
            /* try the next browser */
        }
    }
    throw new Error('No browser found: install Edge or Chrome, or run "npx playwright install chromium"')
}

const entries = JSON.parse(fs.readFileSync(path.join(examplesDir, 'gallery.json'), 'utf8'))
const filter = process.argv[2] ? new RegExp(process.argv[2]) : null
const todo = entries.filter((e) => !filter || filter.test(e.path))
fs.mkdirSync(previewsDir, { recursive: true })

const server = await serve()
const base = 'http://127.0.0.1:' + server.address().port + '/examples/'
const browser = await launch()
// a page to resize the screenshots and to detect the blank ones
const toolPage = await browser.newPage()

/**
 * Resizes a PNG screenshot to a JPEG thumbnail. Returns the JPEG and the standard deviation of its grey levels.
 * With "fit", the screenshot (of a legend, taken with a pixel ratio) is centered on a plain background instead.
 */
const makeThumb = (png, fit = null) =>
    toolPage.evaluate(
        async ({ b64, w, h, fit }) => {
            const img = new Image()
            img.src = 'data:image/png;base64,' + b64
            await img.decode()
            const c = document.createElement('canvas')
            c.width = w
            c.height = h
            const ctx = c.getContext('2d')
            ctx.imageSmoothingQuality = 'high'
            if (fit) {
                ctx.fillStyle = fit.background
                ctx.fillRect(0, 0, w, h)
                const cssW = img.width / fit.pixelRatio
                const cssH = img.height / fit.pixelRatio
                const zoom = Math.min((fit.fill * w) / cssW, (fit.fill * h) / cssH, fit.maxZoom)
                const dw = cssW * zoom
                const dh = cssH * zoom
                ctx.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh)
            } else ctx.drawImage(img, 0, 0, w, h)
            const d = ctx.getImageData(0, 0, w, h).data
            let s = 0,
                s2 = 0
            const n = d.length / 4
            for (let i = 0; i < d.length; i += 4) {
                const g = (d[i] + d[i + 1] + d[i + 2]) / 3
                s += g
                s2 += g * g
            }
            return { jpeg: c.toDataURL('image/jpeg', 0.82).split(',')[1], sd: Math.sqrt(s2 / n - (s / n) ** 2) }
        },
        { b64: png.toString('base64'), w: THUMB.width, h: THUMB.height, fit }
    )

const problems = []
let next = 0
/** The legend of the page alone: hides the map, and returns the screenshot of the legends (and of their container, if any). */
const captureLegend = async (page) => {
    const box = await page.evaluate(({ margin, background }) => {
        const legends = [...document.querySelectorAll('.gridviz-legend')]
        if (!legends.length) return null
        document.querySelectorAll('canvas').forEach((c) => (c.style.visibility = 'hidden'))
        document.documentElement.style.background = document.body.style.background = background
        // the card of the legends when gridviz makes it, else the legends themselves
        const card = legends[0].closest('.gridviz-legends')
        const rects = (card ? [card] : legends).map((e) => e.getBoundingClientRect())
        const x0 = Math.min(...rects.map((r) => r.left)) - margin
        const y0 = Math.min(...rects.map((r) => r.top)) - margin
        const x1 = Math.max(...rects.map((r) => r.right)) + margin
        const y1 = Math.max(...rects.map((r) => r.bottom)) + margin
        return { x: Math.max(0, x0), y: Math.max(0, y0), width: x1 - Math.max(0, x0), height: y1 - Math.max(0, y0) }
    }, LEGEND)
    return box ? page.screenshot({ clip: box }) : null
}

const worker = async () => {
    const context = await browser.newContext({ viewport: PAGE })
    const legendContext = await browser.newContext({ viewport: PAGE, deviceScaleFactor: LEGEND.pixelRatio })
    while (next < todo.length) {
        const e = todo[next++]
        const isLegend = e.category === 'Legends'
        const page = await (isLegend ? legendContext : context).newPage()
        const errors = []
        page.on('pageerror', (err) => errors.push('error: ' + err.message.slice(0, 200)))
        page.on('console', (m) => {
            if (m.type() === 'error' && !/Failed to load resource/.test(m.text())) errors.push('console: ' + m.text().slice(0, 200))
        })
        // a missing tile (404) is normal for tiled grids and backgrounds: the other failures are not
        page.on('requestfailed', (r) => {
            if (r.resourceType() !== 'image') errors.push('request failed: ' + r.url().slice(0, 120))
        })
        page.on('response', (r) => {
            if (r.status() >= 400 && r.status() !== 404) errors.push('http ' + r.status() + ': ' + r.url().slice(0, 120))
            if (r.status() === 404 && r.url().startsWith(base)) errors.push('http 404: ' + r.url().slice(0, 120))
        })
        try {
            await page.goto(base + e.path, { timeout: 30000 })
            await page.waitForLoadState('networkidle', { timeout: 20000 }).catch(() => {})
            await page.waitForTimeout(SETTLE_MS)
            let shot
            if (isLegend) {
                shot = await captureLegend(page)
                if (!shot) throw new Error('no legend in the page')
            } else shot = await page.screenshot()
            const { jpeg, sd } = await makeThumb(shot, isLegend ? LEGEND : null)
            if (sd < 5) errors.push('the page looks blank')
            fs.writeFileSync(path.join(previewsDir, thumbName(e.path)), Buffer.from(jpeg, 'base64'))
        } catch (err) {
            errors.push('could not be opened: ' + err.message.slice(0, 120))
        }
        await page.close()
        console.log((errors.length ? 'FAIL ' : 'ok   ') + e.path)
        if (errors.length) problems.push([e.path, [...new Set(errors)]])
    }
    await context.close()
    await legendContext.close()
}
await Promise.all(Array.from({ length: CONCURRENCY }, worker))
await browser.close()
server.close()

console.log('\n' + (todo.length - problems.length) + ' of ' + todo.length + ' examples are fine')
for (const [p, errs] of problems.sort()) console.log('\n' + p + '\n  ' + errs.join('\n  '))
process.exit(problems.length ? 1 : 0)
