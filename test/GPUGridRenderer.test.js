import { test } from 'node:test'
import assert from 'node:assert/strict'
import { Map as GridvizMap } from '../src/core/Map.js'
import { GridLayer } from '../src/layer/GridLayer.js'
import { GPUGridRenderer } from '../src/core/GPUGridRenderer.js'
import { viewScaleQuantile } from '../src/utils/scale.js'

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
    const map = { setGPURenderer(r) { this.gpuRenderer = r } }
    renderer.attach(map)
    assert.equal(map.gpuRenderer, renderer)
    renderer.detach(map)
    assert.equal(map.gpuRenderer, null)
    assert.equal(renderer.drawsAll(map), false)

    renderer.ok = false
    renderer.attach(map)
    assert.equal(map.gpuRenderer, null)
})
