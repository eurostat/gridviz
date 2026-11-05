// The worker option of TiledGrid, in a browser, with a small server here: the cells against those without the option, a tile that is missing, a tile that fails then comes back, a
// request that is aborted, and a page whose security policy forbids workers (with unsafe-eval: d3's csv needs it, so a page without it cannot read CSV on the main thread anyway). No network.
//
//     npm run test:csv-worker                     (a bundle built from src/)
//     npm run test:csv-worker -- --lib=<file>     (a bundle you built)
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
    execFileSync(process.execPath, [path.join(root, 'node_modules', 'webpack-cli', 'bin', 'cli.js'), '--config', path.join(root, 'webpack.config.prod.cjs'), '--output-path', dir, '--output-filename', 'gridviz.js'], { cwd: root, stdio: 'ignore' })
    return fs.readFileSync(path.join(dir, 'gridviz.js'))
})()

const INFO = { dims: [], crs: 'EPSG:3035', tileSizeCell: 10, originPoint: { x: 0, y: 0 }, resolutionGeo: 100, tilingBounds: { xMin: 0, xMax: 4, yMin: 0, yMax: 0 } }
const TILE0 = 'x,y,v,name\n0,0,1.50,"a, b"\n1,0,,\n2,0,"say ""hi""",c\n3\n'
const TILE3 = 'x,y,v,name\r\n3,4,002,x\r\n'
let failures = 0
let slowAnswers = []

const server = createServer((req, res) => {
    const url = req.url.split('?')[0]
    const send = (code, body, type = 'text/plain') => res.writeHead(code, { 'content-type': type, 'access-control-allow-origin': '*' }).end(body)
    if (url === '/g.js') return send(200, bundle, 'text/javascript')
    if (url === '/page') return send(200, '<!doctype html><div id="m" style="width:400px;height:300px"></div><script src="/g.js"></script>', 'text/html')
    if (url === '/csp')
        return res
            .writeHead(200, { 'content-type': 'text/html', 'content-security-policy': "default-src 'self' 'unsafe-inline' 'unsafe-eval'; worker-src 'none'" })
            .end('<!doctype html><div id="m" style="width:400px;height:300px"></div><script src="/g.js"></script>')
    if (url === '/t/info.json') return send(200, JSON.stringify(INFO), 'application/json')
    if (url === '/t/0/0.csv') return send(200, TILE0)
    if (url === '/t/3/0.csv') return send(200, TILE3)
    if (url === '/t/1/0.csv') return send(404, 'no')
    // fails the first time, then is there
    if (url === '/t/2/0.csv') return failures++ ? send(200, 'x,y,v,name\n20,0,7,z\n') : send(500, 'no')
    // never answers until the test is over
    if (url === '/t/4/0.csv') return slowAnswers.push(() => send(200, 'x,y,v,name\n40,0,1,z\n'))
    send(404, 'no')
})
await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve))
const base = `http://127.0.0.1:${server.address().port}`

const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || undefined, channel: process.env.CHROME_PATH ? undefined : 'chrome', headless: true })

// loads all the tiles but the last one, gives back what is in the cache
const load = async (worker) => {
    const map = new gridviz.Map(document.getElementById('m'), { x: 0, y: 0, z: 10, w: 400, h: 300 })
    const ds = new gridviz.TiledGrid(map, new URL('/t/', location.href).href, { worker })
    ds.preprocess = (c) => {
        if (c.x === '3' && c.y === '4') return false
        c.done = true
    }
    const seen = []
    gridviz.TiledGrid.onTileRequest = (d, x, y) => {
        seen.push('asked ' + x)
        return () => seen.push('came ' + x)
    }
    const started = performance.now()
    while (!ds.info && performance.now() - started < 5000) await new Promise((r) => setTimeout(r, 20))
    const ext = (x) => ({ xMin: x * 1000 + 1, xMax: x * 1000 + 2, yMin: 1, yMax: 2 })
    for (const x of [0, 1, 2, 3]) await ds.getData(ext(x))
    const out = {}
    for (const x of [0, 1, 2, 3]) {
        const t = ds.cache[x][0]
        out[x] = t.failed ? { failed: true, missing: !!t.missing } : { cells: t.cells, columns: t.cells.columns, ext: t.extGeo, kept: t.x + '/' + t.y }
    }
    // the tile that failed is asked again after a while
    gridviz.TiledGrid.retryFailedAfterMs = 0
    await ds.getData(ext(2))
    gridviz.TiledGrid.retryFailedAfterMs = 30000
    out.retried = ds.cache[2][0].cells ? ds.cache[2][0].cells.length : 'not there'

    // cancelled: forgotten, and asked again by the next request
    const pending = ds.getData(ext(4))
    await new Promise((r) => setTimeout(r, 100))
    ds.cancelCurrentRequests()
    await pending
    out.aborted = ds.cache[4][0] === undefined ? 'forgotten' : String(ds.cache[4][0])
    out.seen = worker ? seen.length > 0 && seen.filter((s) => s.startsWith('asked')).length === seen.filter((s) => s.startsWith('came')).length : seen.length === 0
    map.destroy()
    return out
}

let failed = 0
const check = (name, ok, detail) => {
    console.log((ok ? 'ok    ' : 'FAIL  ') + name + (ok ? '' : '  ' + JSON.stringify(detail)))
    if (!ok) failed++
}

const run = async (pagePath, worker) => {
    failures = 0
    const page = await (await browser.newContext()).newPage()
    const errors = []
    const workers = []
    page.on('pageerror', (e) => errors.push(e.message))
    page.on('worker', () => workers.push(1))
    await page.goto(base + pagePath)
    const result = await page.evaluate(load, worker)
    for (const a of slowAnswers.splice(0)) a()
    return { result, errors, workers: workers.length }
}

const without = await run('/page', false)
const withWorker = await run('/page', true)
const noWorkers = await run('/csp', true)

const clean = (r) => JSON.stringify({ ...r, seen: undefined })
check('no worker is started without the option', without.workers === 0, without.workers)
check('workers are started with the option', withWorker.workers > 0, withWorker.workers)
check('the tiles come out the same, with the preprocess, a missing tile, a failing tile, a retry and an abort', clean(withWorker.result) === clean(without.result), { w: withWorker.result, o: without.result })
check('a missing tile is final, a failing one is not', withWorker.result[1].missing === true && withWorker.result.retried === 1, withWorker.result)
check('an aborted tile is forgotten', withWorker.result.aborted === 'forgotten', withWorker.result.aborted)
check('onTileRequest is told, and of every end', withWorker.result.seen === true, withWorker.result)
check('no onTileRequest without the option', without.result.seen === true, without.result)
check('no errors in the page', !withWorker.errors.length && !without.errors.length, [withWorker.errors, without.errors])
check('a page that forbids workers gets the same tiles, from the main thread', clean(noWorkers.result) === clean(without.result), noWorkers)
check('... and no errors there', !noWorkers.errors.length, noWorkers.errors)

await browser.close()
server.close()
console.log(failed ? failed + ' failed' : 'all passed')
process.exit(failed ? 1 : 0)
