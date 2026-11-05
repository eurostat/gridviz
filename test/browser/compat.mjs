// A new version against the published one: every example of the gallery, opened with both bundles, side by side. To run before each release: what worked must still work.
//
//     npm run test:compat                       against the latest version on npm
//     npm run test:compat -- --old=<file>       against a bundle you have
//     npm run test:compat -- --new=<file>       the bundle to test (default: one built from src/)
//     npm run test:compat -- --only=<text>      only the examples with this text in their path
//
// For each example it compares the errors of the page, and the picture: at rest, and after a drag, the wheel, a zoom button and the mouse on a cell. A difference between two runs of the old bundle is noise (data still coming in, an animation): an
// example is only reported when the new bundle differs from the old by more than the old differs from itself. It needs the network.
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
const arg = (name) => (process.argv.slice(2).find((a) => a.startsWith('--' + name + '=')) || '').slice(name.length + 3)
const CONCURRENCY = 4
const NOISE_MARGIN = 0.5 // percent of the pixels

const newBundle = (() => {
    if (arg('new')) return fs.readFileSync(arg('new'))
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'gridviz-test-'))
    console.log('building the bundle from src/ ...')
    execFileSync(process.execPath, [path.join(root, 'node_modules', 'webpack-cli', 'bin', 'cli.js'), '--config', path.join(root, 'webpack.config.prod.cjs'), '--output-path', dir, '--output-filename', 'gridviz.js'], { cwd: root, stdio: 'ignore' })
    return fs.readFileSync(path.join(dir, 'gridviz.js'))
})()

const oldBundle = arg('old')
    ? fs.readFileSync(arg('old'))
    : Buffer.from(await (await fetch('https://cdn.jsdelivr.net/npm/gridviz@latest/dist/gridviz.min.js')).arrayBuffer())

const gallery = JSON.parse(fs.readFileSync(path.join(root, 'examples', 'gallery.json'), 'utf8'))
const examples = gallery.map((e) => e.path).filter((p) => p.includes(arg('only')))

const types = { '.html': 'text/html', '.js': 'text/javascript', '.json': 'application/json', '.css': 'text/css', '.png': 'image/png', '.csv': 'text/csv' }
const server = createServer((req, res) => {
    const file = path.join(root, 'examples', decodeURIComponent(req.url.split('?')[0]))
    if (!file.startsWith(root) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
        // the examples load the bundle from ../../dist: answered by the route below
        const fromRoot = path.join(root, decodeURIComponent(req.url.split('?')[0]))
        if (fs.existsSync(fromRoot) && !fs.statSync(fromRoot).isDirectory()) return res.writeHead(200, { 'content-type': types[path.extname(fromRoot)] || 'application/octet-stream' }).end(fs.readFileSync(fromRoot))
        return res.writeHead(404).end()
    }
    res.writeHead(200, { 'content-type': types[path.extname(file)] || 'application/octet-stream' }).end(fs.readFileSync(file))
})
await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve))
const base = `http://127.0.0.1:${server.address().port}/`

const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || undefined, channel: process.env.CHROME_PATH ? undefined : 'chrome', headless: true, args: ['--disable-web-security'] })

// the example with a bundle: its errors, and its picture
const open = async (example, bundle) => {
    const context = await browser.newContext({ viewport: { width: 1000, height: 700 } })
    await context.route(/\/(dist\/)?gridviz(\.min)?\.js(\?.*)?$/, (r) => r.fulfill({ body: bundle, contentType: 'application/javascript' }))
    // the same randomness each time
    await context.addInitScript(() => {
        let seed = 12345
        Math.random = () => (seed = (seed * 16807) % 2147483647) / 2147483647
    })
    const page = await context.newPage()
    const errors = []
    page.on('pageerror', (e) => errors.push(String(e).slice(0, 200)))
    let picture = null
    let used = null
    try {
        await page.goto(base + example, { waitUntil: 'load', timeout: 40000 })
        await page.waitForLoadState('networkidle', { timeout: 20000 }).catch(() => {})
        await page.waitForTimeout(2500)
        picture = (await page.screenshot({ type: 'png' })).toString('base64')
        // then used: a drag, the wheel, a zoom button if there is one, the mouse on a cell. The same gestures with both bundles
        await page.mouse.move(500, 350)
        await page.mouse.down()
        await page.mouse.move(420, 310, { steps: 8 })
        await page.mouse.up()
        await page.waitForTimeout(300)
        await page.mouse.wheel(0, -200)
        await page.waitForTimeout(300)
        await page.mouse.wheel(0, 100)
        await page.waitForTimeout(300)
        const button = await page.$('.gridviz-zoom-buttons button, .gridviz-zoom-button, [id*="zoom-buttons"] > *')
        if (button) await button.click({ timeout: 1000 }).catch(() => {})
        await page.mouse.move(520, 360)
        await page.waitForTimeout(150)
        await page.mouse.move(522, 362)
        await page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {})
        await page.waitForTimeout(1500)
        used = (await page.screenshot({ type: 'png' })).toString('base64')
    } catch (error) {
        errors.push('not opened: ' + String(error).slice(0, 120))
    }
    await context.close()
    return { errors, picture, used }
}

// the share of the pixels that differ, in a page of its own
const comparer = await browser.newPage()
const differ = (a, b) =>
    !a || !b
        ? Promise.resolve(a === b ? 0 : 100)
        : comparer.evaluate(
              async ([a, b]) => {
                  const load = async (d) => {
                      const img = new Image()
                      img.src = 'data:image/png;base64,' + d
                      await img.decode()
                      const c = document.createElement('canvas')
                      c.width = img.width
                      c.height = img.height
                      const ctx = c.getContext('2d')
                      ctx.drawImage(img, 0, 0)
                      return ctx.getImageData(0, 0, img.width, img.height).data
                  }
                  const [x, y] = [await load(a), await load(b)]
                  if (x.length !== y.length) return 100
                  let n = 0
                  for (let i = 0; i < x.length; i += 4) if (Math.max(Math.abs(x[i] - y[i]), Math.abs(x[i + 1] - y[i + 1]), Math.abs(x[i + 2] - y[i + 2])) > 16) n++
                  return (100 * n) / (x.length / 4)
              },
              [a, b]
          )

const report = []
let at = 0
const work = async () => {
    while (at < examples.length) {
        const example = examples[at++]
        const [before, after] = [await open(example, oldBundle), await open(example, newBundle)]
        // the larger difference: at rest, or after the gestures
        const differAll = async (a, b) => Math.max(await differ(a.picture, b.picture), await differ(a.used, b.used))
        let diff = await differAll(before, after)
        let noise = 0
        // differs: is that just the example? Once more with each bundle before calling it a difference
        if (diff > NOISE_MARGIN) {
            const again = await open(example, oldBundle)
            noise = await differAll(before, again)
            if (diff > noise + NOISE_MARGIN) {
                const retry = await open(example, newBundle)
                diff = Math.min(diff, await differAll(again, retry))
            }
        }
        const newErrors = after.errors.filter((e) => !before.errors.includes(e))
        const bad = newErrors.length > 0 || diff > noise + NOISE_MARGIN
        report.push({ example, diff, noise, newErrors, bad, oldErrors: before.errors.length })
        console.log((bad ? 'DIFF  ' : 'same  ') + example + '  ' + diff.toFixed(2) + '% (noise ' + noise.toFixed(2) + '%)' + (newErrors.length ? '  new errors: ' + newErrors.join(' | ') : ''))
    }
}
await Promise.all(Array.from({ length: CONCURRENCY }, work))
await browser.close()
server.close()

const bad = report.filter((r) => r.bad)
console.log(`\n${report.length} examples, ${report.length - bad.length} the same, ${bad.length} different`)
for (const r of bad) console.log('  ' + r.example)
process.exit(bad.length ? 1 : 0)
