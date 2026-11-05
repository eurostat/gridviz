// The fullscreen button, with real data: basics/buttons.html in the viewer of the examples, in Chrome (it needs the network).
//
//     npm run test:fullscreen                 a bundle built from src/
//     npm run test:fullscreen -- --lib=<file> test a bundle you built
//
// What it checks. In fullscreen the canvas fills the container: a smaller canvas leaves the black backdrop of the browser
// around it. Back from fullscreen it fits the container again, and when fullscreen is left without the button (Esc), the next
// click opens it again. Esc itself goes through the browser: a test can only stand in for it with document.exitFullscreen().
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
const libArg = (process.argv.slice(2).find((a) => a.startsWith('--lib=')) || '').slice(6)

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

const types = { '.html': 'text/html', '.js': 'text/javascript', '.json': 'application/json' }
const server = createServer((req, res) => {
    const file = path.join(root, decodeURIComponent(req.url.split('?')[0]))
    if (!file.startsWith(root) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) return res.writeHead(404).end()
    res.writeHead(200, { 'content-type': types[path.extname(file)] || 'application/octet-stream' }).end(fs.readFileSync(file))
})
await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve))

const browser = await chromium.launch({
    executablePath: process.env.CHROME_PATH || undefined,
    channel: process.env.CHROME_PATH ? undefined : 'chrome',
    headless: true,
})
const context = await browser.newContext({ viewport: { width: 1280, height: 720 } })
await context.route(/\/gridviz(\.min)?\.js(\?.*)?$/, (r) => r.fulfill({ body: bundle, contentType: 'application/javascript' }))
const page = await context.newPage()
const errors = []
page.on('pageerror', (e) => errors.push(String(e).slice(0, 160)))
await page.goto(`http://127.0.0.1:${server.address().port}/examples/view.html?example=basics/buttons.html`)
await page.waitForTimeout(3000)
const frame = page.frames().find((f) => f !== page.mainFrame() && f.url().includes('basics/buttons.html'))
const button = frame.locator('#gridviz-fullscreen-button')

const state = () =>
    frame.evaluate(() => {
        const canvas = document.querySelector('#map canvas')
        const container = document.getElementById('map')
        return {
            fullscreen: !!document.fullscreenElement,
            flag: map.fullscreenButton.isFullscreen,
            container: [container.clientWidth, container.clientHeight].join('x'),
            sizes: {
                canvas: [canvas.width, canvas.height].join('x'),
                shown: [canvas.offsetWidth, canvas.offsetHeight].join('x'),
                map: [map.w, map.h].join('x'),
                geoCanvas: [map.geoCanvas.w, map.geoCanvas.h].join('x'),
                offscreen: [map.geoCanvas.offscreenCanvas.width, map.geoCanvas.offscreenCanvas.height].join('x'),
            },
        }
    })

let failures = 0
const check = async (name, fullscreen) => {
    await page.waitForTimeout(1000)
    const s = await state()
    const wrong = Object.entries(s.sizes).filter(([, v]) => v !== s.container)
    const ok = s.fullscreen === fullscreen && s.flag === fullscreen && wrong.length === 0
    if (!ok) failures++
    const details = wrong.map(([k, v]) => `, ${k} ${v}`).join('')
    console.log(`${ok ? 'ok  ' : 'FAIL'} ${name}: container ${s.container}, fullscreen ${s.fullscreen}, isFullscreen ${s.flag}${details}`)
    return s
}

const before = await check('at the start', false)
await button.click()
const open = await check('the button opens fullscreen', true)
if (open.container === before.container) {
    failures++
    console.log('FAIL fullscreen did not change the size of the container: nothing was tested')
}
await page.screenshot({ path: process.env.FULLSCREEN_SHOT || path.join(os.tmpdir(), 'gridviz-fullscreen.png') })
await button.click()
await check('the button closes it', false)
await button.click()
await check('the button opens it again', true)
await frame.evaluate(() => document.exitFullscreen())
await check('left without the button', false)
await button.click()
await check('the next click opens it', true)

if (errors.length) {
    failures++
    console.log('FAIL errors of the page:\n  ' + errors.join('\n  '))
}
await browser.close()
server.close()
console.log(failures ? `\n${failures} failed` : '\nall fine')
process.exit(failures ? 1 : 0)
