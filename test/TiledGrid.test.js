import { test } from 'node:test'
import assert from 'node:assert/strict'
import { TiledGrid } from '../src/dataset/TiledGrid.js'
import { CSVGrid } from '../src/dataset/CSVGrid.js'
import { Map } from '../src/core/Map.js'

const INFO = {
    crs: 'EPSG:3035',
    tileSizeCell: 10,
    originPoint: { x: 0, y: 0 },
    resolutionGeo: 100,
    tilingBounds: { xMin: 0, xMax: 1, yMin: 0, yMax: 1 },
    dims: {},
}
const VIEW = { xMin: 0, xMax: 1999, yMin: 0, yMax: 1999 }

/** A grid whose server only has the tiles in `existing` ("x/y"), recording the requests. */
class FakeGrid extends TiledGrid {
    constructor(existing, opts) {
        const map = {
            redraws: 0,
            redraw() {
                this.redraws++
            },
            getZoom: () => 1,
            layers: [],
            updateExtentGeo: () => VIEW,
        }
        super(map, 'http://fake/', opts)
        this.existing = existing
        this.requests = []
        this.info = INFO
        this.infoLoadingStatus = 'loaded'
        this.isShown = () => true
    }
    async loadTile(x, y, signal) {
        this.requests.push(`${x}/${y}`)
        await new Promise((r) => setTimeout(r, 1))
        if (signal.aborted) throw Object.assign(new Error('aborted'), { name: 'AbortError' })
        if (!this.existing.includes(`${x}/${y}`))
            throw this.notFound ? new Error('404 Not Found') : new TypeError('Failed to fetch')
        const tile = {
            x,
            y,
            cells: [{ x: 1, y: 1 }],
            extGeo: { xMin: x * 1000, xMax: x * 1000 + 1000, yMin: y * 1000, yMax: y * 1000 + 1000 },
        }
        return tile
    }
}

const observe = (map) => {
    const events = []
    Object.assign(map, {
        _gridRequests: new Set(),
        getGridLoading: Map.prototype.getGridLoading,
        beginGridLoad: Map.prototype.beginGridLoad,
        _beginGridLoad: Map.prototype._beginGridLoad,
        _endGridLoad: Map.prototype._endGridLoad,
        onGridLoad: (event) => events.push(event),
    })
    return events
}

test('grid loading events pair tile starts and outcomes, including missing and cancelled tiles', async () => {
    const g = new FakeGrid(['0/0'])
    g.notFound = true
    const events = observe(g.map)
    const first = g.getData(VIEW)
    assert.equal(g.map.getGridLoading().length, 4)
    await first
    assert.equal(g.map.getGridLoading().length, 0)
    assert.equal(events.filter((e) => e.phase === 'start').length, 4)
    assert.deepEqual(events.filter((e) => e.phase === 'start').map((e) => e.pendingCount), [1, 2, 3, 4])
    assert.deepEqual(events.filter((e) => e.phase === 'end').map((e) => e.pendingCount), [3, 2, 1, 0])
    assert.equal(events.filter((e) => e.outcome === 'loaded').length, 1)
    assert.equal(events.filter((e) => e.outcome === 'missing').length, 3)
    const tile = events.find((e) => e.request.tile.x === 0 && e.request.tile.y === 0)
    assert.deepEqual(tile.request.extent, { xMin: 0, xMax: 1000, yMin: 0, yMax: 1000 })
    assert.equal(tile.request.dataset, g)
    assert.equal(tile.request.worker, false)
    await g.getData(VIEW)
    assert.equal(events.length, 8, 'cached tiles do not start another request')

    const cancelled = new FakeGrid(['0/0', '0/1', '1/0', '1/1'])
    const cancelledEvents = observe(cancelled.map)
    const loading = cancelled.getData(VIEW)
    cancelled.cancelCurrentRequests()
    await loading
    assert.equal(cancelledEvents.filter((e) => e.outcome === 'cancelled').length, 4)
    assert.equal(cancelled.map.getGridLoading().length, 0)
})

test('extension requests finish once even when their map is destroyed', async () => {
    const map = {}
    const events = observe(map)
    const request = { dataset: {}, kind: 'tile', url: 'tile.parquet', worker: true }
    const finish = map.beginGridLoad(request)
    map._destroyed = true
    await Promise.resolve()
    finish('loaded')
    finish('error', new Error('duplicate'))
    await Promise.resolve()
    assert.deepEqual(events.map((event) => event.phase), ['start', 'end'])
    assert.equal(events[1].outcome, 'loaded')
    assert.equal(events[1].request, request)
    assert.deepEqual(map.getGridLoading(), [])
    map.beginGridLoad({ dataset: {}, kind: 'info', url: 'after-destroy' })('loaded')
    await Promise.resolve()
    assert.equal(events.length, 2)
})

test('worker-backed CSV tile events identify the worker option', async () => {
    const grid = new FakeGrid(['0/0'], { worker: true })
    const events = observe(grid.map)
    await grid.getData({ xMin: 0, xMax: 1, yMin: 0, yMax: 1 })
    assert.equal(events[0].request.worker, true)
})

test('metadata and CSV loading report their start, completion and failures', async () => {
    const originalFetch = globalThis.fetch
    const map = { layers: [], redraw() {}, getZoom: () => 1 }
    const events = observe(map)
    try {
        globalThis.fetch = async (url) => {
            if (url.endsWith('info.json')) return { ok: true, json: async () => INFO }
            if (url.endsWith('ok.csv')) return { ok: true, text: async () => 'x,y,value\n1,2,3' }
            return { ok: false, status: 503, statusText: 'Unavailable' }
        }
        new TiledGrid(map, 'http://example/')
        new CSVGrid(map, 'http://example/ok.csv', 1)
        new CSVGrid(map, 'http://example/fail.csv', 1)
        await Promise.resolve()
        assert.deepEqual(events.map((e) => e.request.kind), ['info', 'csv', 'csv'])
        while (map.getGridLoading().length) await new Promise((resolve) => setTimeout(resolve, 1))
        assert.deepEqual(events.filter((e) => e.phase === 'end').map((e) => e.outcome).sort(), ['error', 'loaded', 'loaded'])
        assert.ok(events.find((e) => e.outcome === 'error').error)
    } finally {
        globalThis.fetch = originalFetch
    }
})

test('a tile that failed is not requested again at every redraw', async () => {
    const g = new FakeGrid(['0/0'])
    await g.getData(VIEW)
    assert.deepEqual(g.requests.sort(), ['0/0', '0/1', '1/0', '1/1'])
    await g.getData(VIEW)
    await g.getData(VIEW)
    assert.equal(g.requests.length, 4)
})

test('a failed tile is requested again after retryFailedAfterMs', async () => {
    const before = TiledGrid.retryFailedAfterMs
    TiledGrid.retryFailedAfterMs = 20
    try {
        const g = new FakeGrid([])
        await g.getData(VIEW)
        await new Promise((r) => setTimeout(r, 40))
        await g.getData(VIEW)
        assert.equal(g.requests.length, 8)
    } finally {
        TiledGrid.retryFailedAfterMs = before
    }
})

test('a cancelled request is not a failure: the tile is requested again', async () => {
    const g = new FakeGrid(['0/0', '0/1', '1/0', '1/1'])
    const loading = g.getData(VIEW)
    g.cancelCurrentRequests()
    await loading
    assert.equal(g.map.redraws, 0)
    await g.getData(VIEW)
    assert.equal(g.requests.length, 8)
    assert.equal(g.map.redraws, 4)
})

test('a tile that failed asks for no redraw, and is skipped when the view is built', async () => {
    const g = new FakeGrid(['0/0'])
    await g.getData(VIEW)
    assert.equal(g.map.redraws, 1)
    g.updateViewCache(VIEW)
    assert.equal(g.cellsViewCache.length, 1)
})

test('with onlyDrawWhenAllTilesReady, the map is drawn when the last tile fails too', async () => {
    const g = new FakeGrid([], { onlyDrawWhenAllTilesReady: true })
    await g.getData(VIEW)
    assert.equal(g.map.redraws, 1)
})

test('a tile the server answered 404 for is never requested again', async () => {
    const before = TiledGrid.retryFailedAfterMs
    TiledGrid.retryFailedAfterMs = 20
    try {
        const g = new FakeGrid(['0/0'])
        g.notFound = true
        await g.getData(VIEW)
        await new Promise((r) => setTimeout(r, 40))
        await g.getData(VIEW)
        assert.equal(g.requests.length, 4)
    } finally {
        TiledGrid.retryFailedAfterMs = before
    }
})

test('with onlyDrawWhenAllTilesReady, overlapping requests draw once, when every tile of the view has arrived', async () => {
    const g = new FakeGrid(['0/0', '0/1', '1/0', '1/1'], { onlyDrawWhenAllTilesReady: true })
    // a second request for the same view while the first one's tiles are still under way
    const first = g.getData(VIEW)
    await new Promise((r) => setTimeout(r, 0))
    const second = g.getData(VIEW)
    await Promise.all([first, second])
    assert.equal(g.requests.length, 4)
    assert.equal(g.map.redraws, 1)
    g.updateViewCache(VIEW)
    assert.equal(g.cellsViewCache.length, 4)
})

test('with onlyDrawWhenAllTilesReady, a request that only finds tiles under way still gets its draw', async () => {
    const g = new FakeGrid(['0/0', '0/1', '1/0', '1/1'], { onlyDrawWhenAllTilesReady: true })
    const small = { xMin: 0, xMax: 999, yMin: 0, yMax: 999 }
    const first = g.getData(VIEW)
    await new Promise((r) => setTimeout(r, 0))
    const second = g.getData(small)
    await Promise.all([first, second])
    assert.ok(g.map.redraws >= 1)
})

test('with onlyDrawWhenAllTilesReady, the map is drawn even when the last tile to arrive is outside the view', async () => {
    const g = new FakeGrid(['0/0', '0/1', '1/0', '1/1'], { onlyDrawWhenAllTilesReady: true })
    // the view only covers the first tile, the margin brings in the others
    g.map.updateExtentGeo = () => ({ xMin: 0, xMax: 500, yMin: 0, yMax: 500 })
    await g.getData(VIEW)
    assert.equal(g.map.redraws, 1)
})

test('without onlyDrawWhenAllTilesReady, a tile outside the view asks for no redraw', async () => {
    const g = new FakeGrid(['1/1'])
    g.map.updateExtentGeo = () => ({ xMin: 0, xMax: 500, yMin: 0, yMax: 500 })
    await g.getData(VIEW)
    assert.equal(g.map.redraws, 0)
})
