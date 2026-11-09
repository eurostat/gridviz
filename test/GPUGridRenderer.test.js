import { test } from 'node:test'
import assert from 'node:assert/strict'
import { Map as GridvizMap } from '../src/core/Map.js'
import { GridLayer } from '../src/layer/GridLayer.js'
import { GPUGridRenderer } from '../src/core/GPUGridRenderer.js'
import { viewScaleQuantile } from '../src/utils/scale.js'
import { ShapeColorSizeStyle } from '../src/style/ShapeColorSizeStyle.js'

const makeGeoCanvas = () => ({
    view: { x: 0, y: 0, z: 1 },
    offscreenCtx: { save() {}, restore() {} },
    setCanvasTransform() {},
})

const makeLayer = (styles) => {
    const dataset = { getData() {}, updateViewCache() {}, getViewCache: () => [{ x: 0, y: 0 }], getResolution: () => 100 }
    return new GridLayer({ getDataset: () => dataset }, styles)
}

const makeStyle = (calls) => ({
    draw: () => calls.push('style draws'),
    updateLegends() {},
})

test('with no renderer, a layer has its styles draw, as ever', () => {
    const calls = []
    makeLayer([makeStyle(calls)]).draw(makeGeoCanvas())
    assert.deepEqual(calls, ['style draws'])
})

test('with a renderer, it gets the styles it accepts, and the others draw as ever', () => {
    const calls = []
    const taken = makeStyle(calls)
    const left = makeStyle(calls)
    const geoCanvas = makeGeoCanvas()
    geoCanvas.gpuRenderer = { accepts: (s) => s === taken, submit: (s) => calls.push(s === taken ? 'submitted' : 'wrong style') }
    makeLayer([taken, left]).draw(geoCanvas)
    assert.deepEqual(calls, ['submitted', 'style draws'])
})

// the real redraw and redrawNow of a map, without a DOM
const makeMap = () => {
    const map = Object.create(GridvizMap.prototype)
    Object.assign(map, {
        asyncRedraw: false,
        layers: [],
        legend: null,
        _pointer: null,
        _hovering: false,
        gpuRenderer: null,
        geoCanvas: {
            view: { z: 1 },
            ctx: { drawImage() {} },
            offscreenCtx: {},
            offscreenCanvas: {},
            initCanvasTransform() {},
            clear() {},
            updateExtentGeo() {},
        },
    })
    return map
}

test('a redraw tells the renderer when it begins and ends, and a map without one knows nothing of it', () => {
    const map = makeMap()
    assert.equal(map.redrawNow(), map)
    assert.equal(map.redraw(), map)

    const calls = []
    map.gpuRenderer = { takesRedraw: () => false, beginRedraw: () => calls.push('begin'), endRedraw: () => calls.push('end') }
    map.redraw()
    assert.deepEqual(calls, ['begin', 'end'])
})

test('a redraw the renderer takes care of does not run the styles', () => {
    const map = makeMap()
    const calls = []
    map.gpuRenderer = { takesRedraw: () => true, beginRedraw: () => calls.push('begin'), endRedraw() {} }
    map.redraw()
    assert.deepEqual(calls, [])
})

test('cancelRedraw, setSize and isDestroyed', () => {
    const cancelled = []
    globalThis.cancelAnimationFrame = (id) => cancelled.push(id)
    const map = makeMap()
    map._redrawFrame = 7
    map.cancelRedraw()
    assert.deepEqual(cancelled, [7])
    assert.equal(map._redrawFrame, null)
    assert.equal(map.isDestroyed(), false)

    const attributes = {}
    map.geoCanvas.canvas = { setAttribute: (k, v) => (attributes[k] = v) }
    map.setSize(300, 200)
    assert.deepEqual([map.w, map.h, map.geoCanvas.w, map.geoCanvas.h, map.geoCanvas.offscreenCanvas.width, map.geoCanvas.offscreenCanvas.height], [300, 200, 300, 200, 300, 200])
    assert.deepEqual(attributes, { width: '300', height: '200' })
})

// A renderer without WebGL, for what does not touch the GPU
const makeRenderer = (host) => {
    const renderer = Object.create(GPUGridRenderer.prototype)
    Object.assign(renderer, { host, _layers: new Map(), _batches: new WeakMap(), _noBackdrop: new WeakSet(), _frame: 0, ok: true, _raf: null })
    return renderer
}

test('a stand-in of another resolution leaves the view scale of the layer as it was', () => {
    // viewScaleQuantile gives the same object each time: its use for a stand-in changed what the layer's own says, and the next tiles of the layer had enormous circles
    const style = {
        viewScale: viewScaleQuantile({ valueFunction: (c) => c.v, classNumber: 4, minSizePix: 2, maxSizeFactor: 1.3 }),
    }
    const cellsOfLayer = [{ v: 1 }, { v: 5 }, { v: 9 }]
    const main = { style, resolution: 1000, z: 100, scaleCells: cellsOfLayer, viewScale: null }
    main.viewScale = style.viewScale(cellsOfLayer, main.resolution, main.z)
    const top = () => Math.max(...main.viewScale.range())
    assert.equal(top(), 1300)

    const coarseCells = [{ x: 0, y: 0, v: 3 }]
    const stand = {
        style,
        resolution: 50000,
        needsScale: true,
        viewScale: null,
        key: 'k|b',
        dataset: { cells: coarseCells, updateViewCache() {}, getViewCache: () => coarseCells },
    }
    const renderer = makeRenderer({})
    const seen = []
    renderer._build = function (item, key, tile, byTile) {
        seen.push(Math.max(...item.viewScale.range()))
        byTile.set(key, { tile, key: item.key, circles: false })
    }
    renderer._drawCells = () => {}
    renderer._drawBackdrop(stand, { envelope: () => ({}), z: 100 }, main)

    assert.deepEqual(seen, [65000], 'the stand-in is built for its own resolution')
    assert.equal(top(), 1300, 'and the layer goes on with its own')
})

test('takesRedraw: only for a map that is moving with all of it drawn on the GPU', () => {
    let moving = false
    const renderer = makeRenderer({ isMoving: () => moving })
    let asked = 0
    renderer.redraw = () => asked++
    const map = {}
    renderer._layers.set(map, { items: [], pending: null, only: false })
    assert.equal(renderer.takesRedraw(map), false)
    moving = true
    assert.equal(renderer.takesRedraw(map), false)
    renderer._layers.get(map).only = true
    assert.equal(renderer.takesRedraw(map), true)
    assert.equal(asked, 1)
    moving = false
    assert.equal(renderer.takesRedraw(map), false)
    assert.equal(renderer.takesRedraw({}), false)
})

test('attach and detach set and clear the map, and do nothing where there is no WebGL2', () => {
    const renderer = makeRenderer({})
    renderer.canvas = { style: { display: 'none' } }
    const map = { setGPURenderer(r) { this.gpuRenderer = r } }
    renderer.attach(map)
    assert.equal(map.gpuRenderer, renderer)
    assert.equal(renderer.canvas.style.display, '', 'the canvas shows while a map is attached')
    renderer.detach(map)
    assert.equal(map.gpuRenderer, null)
    assert.equal(renderer.canvas.style.display, 'none')
    assert.equal(renderer.drawsAll(map), false)

    renderer.ok = false
    renderer.attach(map)
    assert.equal(map.gpuRenderer, null)
    assert.equal(renderer.canvas.style.display, 'none')
})

// the calls a build makes to the GPU, none of which matter here
const fakeGL = () =>
    new Proxy(
        { ARRAY_BUFFER: 1, FLOAT: 2, UNSIGNED_BYTE: 3, STATIC_DRAW: 4 },
        { get: (target, name) => (name in target ? target[name] : () => ({})) }
    )

const cellsOfTile = (n) => Array.from({ length: n }, (_, i) => ({ x: i * 100, y: 0, v: i }))

const shapeStyle = () => Object.assign(Object.create(ShapeColorSizeStyle.prototype), { color: 'red', size: 100, shape: 'square', offset: () => ({ dx: 0, dy: 0 }) })

test('a tile is built a little at a time, goes on where it stopped, and gives the same as all at once', () => {
    const renderer = makeRenderer({})
    Object.assign(renderer, { gl: fakeGL(), _jobs: new WeakMap(), _allBatches: new Set(), _gpuBytes: 0, _colors: new Map() })
    renderer._parseColor = () => [255, 0, 0, 255]
    const tile = { cells: cellsOfTile(1000) }
    const item = { style: shapeStyle(), resolution: 100, z: 10, key: 'k' }
    const byTile = new Map()
    let read = 0
    const reader = renderer._cellReader.bind(renderer)
    renderer._cellReader = (it) => {
        const r = reader(it)
        return (c, out) => (read++, r(c, out))
    }

    // the deadline is already over: nothing is done, and nothing is lost
    assert.equal(renderer._build(item, 'a', tile, byTile, undefined, 0), null)
    assert.equal(read, 0)
    assert.equal(byTile.size, 0)

    // a part of it: the clock runs out after the first check, the next stop being 256 cells on
    const now = performance.now
    let calls = 0
    performance.now = () => (calls++ === 0 ? -1 : Infinity)
    assert.equal(renderer._build(item, 'a', tile, byTile, undefined, 0), null)
    performance.now = now
    assert.equal(read, 256)

    // the rest, without starting again
    const batch = renderer._build(item, 'a', tile, byTile, undefined)
    assert.equal(read, 1000)
    assert.equal(batch.count, 1000)
    assert.equal(byTile.get('a'), batch)

    const whole = renderer._build(item, 'b', tile, byTile, undefined)
    assert.equal(whole.count, batch.count)
})

test('a build in progress starts again if the tile or the colours have changed', () => {
    const renderer = makeRenderer({})
    Object.assign(renderer, { gl: fakeGL(), _jobs: new WeakMap(), _allBatches: new Set(), _gpuBytes: 0, _colors: new Map() })
    renderer._parseColor = () => [255, 0, 0, 255]
    const tile = { cells: cellsOfTile(600) }
    const byTile = new Map()
    const item = { style: shapeStyle(), resolution: 100, z: 10, key: 'k1' }
    const now = performance.now
    let calls = 0
    performance.now = () => (calls++ === 0 ? -1 : Infinity)
    assert.equal(renderer._build(item, 'a', tile, byTile, undefined, 0), null)
    performance.now = now
    const batch = renderer._build({ ...item, key: 'k2' }, 'a', tile, byTile, undefined)
    assert.equal(batch.count, 600)
    assert.equal(batch.key, 'k2')
})

// A dataset of one file (CSVGrid) is one tile. If it were a new tile on every draw, a build left unfinished at a deadline would start again from nothing on the next:
// a file of 100,000 cells was never drawn, a slice of 8 ms at a time.
test('a dataset of one file is the same tile on every draw, and its build goes on where it stopped', () => {
    const renderer = makeRenderer({})
    Object.assign(renderer, { gl: fakeGL(), _jobs: new WeakMap(), _allBatches: new Set(), _gpuBytes: 0, _colors: new Map() })
    renderer._parseColor = () => [255, 0, 0, 255]
    const dataset = { cells: cellsOfTile(1000) }
    const tileOf = () => {
        let tile
        renderer._tiles(dataset, null, (key, t) => (tile = t))
        return tile
    }
    const first = tileOf()
    assert.equal(tileOf(), first)
    assert.equal(first.cells, dataset.cells)

    const item = { style: shapeStyle(), resolution: 100, z: 10, key: 'k' }
    const byTile = new Map()
    const now = performance.now
    let calls = 0
    performance.now = () => (calls++ === 0 ? -1 : Infinity)
    assert.equal(renderer._build(item, 'all', tileOf(), byTile, undefined, 0), null)
    performance.now = now
    let read = 0
    const reader = renderer._cellReader.bind(renderer)
    renderer._cellReader = (it) => {
        const r = reader(it)
        return (c, out) => (read++, r(c, out))
    }
    const batch = renderer._build(item, 'all', tileOf(), byTile, undefined)
    assert.equal(read, 0, 'the build went on with the reader it had, and did not start again')
    assert.equal(batch.count, 1000)
    assert.equal(batch.tile, tileOf(), 'a built batch is fresh on the next draw')

    // new cells for the dataset: a new tile
    dataset.cells = cellsOfTile(10)
    assert.notEqual(tileOf(), first)
    assert.equal(tileOf().cells.length, 10)
})

test('no stand-in for a dataset whose resolution is not known yet, and otherwise a coarser one', () => {
    const renderer = makeRenderer({})
    const datasets = [{ name: 100 }, { name: 1000 }, { name: 10000 }, { name: 100000 }]
    const gridLayer = { dataset: { datasets, resolutions: [100, 1000, 10000, 100000] } }
    const style = {}
    // the info.json has not come in: before this, the finest resolution was asked for, all over the map
    assert.equal(renderer._backdropOf({ style, gridLayer, dataset: datasets[2], resolution: 0, key: 'k' }), null)
    assert.equal(renderer._backdropOf({ style, gridLayer, dataset: datasets[2], resolution: undefined, key: 'k' }), null)
    const stand = renderer._backdropOf({ style, gridLayer, dataset: datasets[0], resolution: 100, key: 'k' })
    assert.equal(stand.dataset, datasets[1])
    assert.ok(stand.resolution >= 8 * 100)
})

test('the backdrops option turns the stand-ins off', () => {
    const datasets = [{ name: 100 }, { name: 1000 }]
    const gridLayer = { dataset: { datasets, resolutions: [100, 1000] } }
    const item = { style: {}, gridLayer, dataset: datasets[0], resolution: 100, key: 'k' }
    assert.ok(makeRenderer({})._backdropOf(item))
    const renderer = makeRenderer({})
    renderer._noBackdrops = true
    assert.equal(renderer._backdropOf(item), null)
})

test('stats() answers on a renderer that has done nothing, and counts what is built', () => {
    const renderer = makeRenderer({})
    Object.assign(renderer, { _layers: new Map(), _allBatches: new Set(), _gpuBytes: 0 })
    assert.deepEqual(renderer.stats(), { ok: true, software: false, layers: 0, tiles: 0, gpuBytes: 0, tilesBuilt: 0, tilesBuiltWithoutScaleCells: 0, standInDraws: 0, largestStandInPixels: 0 })
    Object.assign(renderer, { gl: fakeGL(), _jobs: new WeakMap(), _colors: new Map() })
    renderer._parseColor = () => [255, 0, 0, 255]
    renderer._build({ style: shapeStyle(), resolution: 100, z: 10, key: 'k' }, 'a', { cells: cellsOfTile(10) }, new Map(), undefined)
    assert.equal(renderer.stats().tilesBuilt, 1)
    assert.equal(renderer.stats().tilesBuiltWithoutScaleCells, 0)
})
