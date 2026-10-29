import { test } from 'node:test'
import assert from 'node:assert/strict'
import { TiledGrid } from '../src/dataset/TiledGrid.js'

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
