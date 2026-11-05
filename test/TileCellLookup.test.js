import { test } from 'node:test'
import assert from 'node:assert/strict'
import { Dataset } from '../src/core/Dataset.js'

const INFO = { originPoint: { x: 1000, y: 2000 }, resolutionGeo: 100, tileSizeCell: 10 }
const SPAN = INFO.resolutionGeo * INFO.tileSizeCell

// a tiled dataset, with its cells at the positions given in cells of the grid
const tiled = (positions) => {
    const ds = new Dataset({ redraw() {} }, 'url/', INFO.resolutionGeo)
    ds.info = INFO
    ds.cache = {}
    ds.cellsViewCache = []
    for (const [ix, iy] of positions) {
        const x = INFO.originPoint.x + ix * INFO.resolutionGeo
        const y = INFO.originPoint.y + iy * INFO.resolutionGeo
        const xT = Math.floor(ix / INFO.tileSizeCell)
        const yT = Math.floor(iy / INFO.tileSizeCell)
        ds.cache[xT] = ds.cache[xT] || {}
        ds.cache[xT][yT] = ds.cache[xT][yT] || { x: xT, y: yT, cells: [] }
        const cell = { x, y, v: ix + '/' + iy }
        ds.cache[xT][yT].cells.push(cell)
        ds.cellsViewCache.push(cell)
    }
    return ds
}

// what a scan of the cells finds, the way it has always been: the first cell the position is in, edges included
const scan = (ds, pos) => {
    const r = ds.getResolution()
    for (const cell of ds.cellsViewCache) {
        if (pos.x < cell.x || cell.x + r < pos.x || pos.y < cell.y || cell.y + r < pos.y) continue
        return cell
    }
    return undefined
}

test('the lookup by tile finds the same cell as a scan of the cells, in and between cells', () => {
    const positions = []
    for (let ix = 0; ix < 40; ix++) for (let iy = 0; iy < 40; iy++) if ((ix * 7 + iy * 13) % 3) positions.push([ix, iy])
    const ds = tiled(positions)
    let found = 0
    for (let i = 0; i < 5000; i++) {
        const pos = { x: INFO.originPoint.x + ((i * 7919) % 4000) + 0.5, y: INFO.originPoint.y + ((i * 104729) % 4000) + 0.5 }
        const cell = ds.getCellFromPosition(pos, ds.getViewCache())
        assert.equal(cell, scan(ds, pos))
        if (cell) found++
    }
    assert.ok(found > 1000)
})

test('a position on an edge belongs to a cell on either side, across tiles too', () => {
    // two cells either side of the edge between tiles 0 and 1, and a lone cell at the end of tile 0
    for (const positions of [[[9, 0]], [[10, 0]], [[9, 0], [10, 0]], [[9, 9]]]) {
        const ds = tiled(positions)
        for (const pos of [
            { x: INFO.originPoint.x + SPAN, y: INFO.originPoint.y + 50 },
            { x: INFO.originPoint.x + SPAN, y: INFO.originPoint.y },
            { x: INFO.originPoint.x + SPAN, y: INFO.originPoint.y + SPAN },
        ]) {
            const lookup = ds.getCellFromPosition(pos, ds.getViewCache())
            assert.equal(!!lookup, !!scan(ds, pos), JSON.stringify({ positions, pos }))
        }
    }
})

test('nothing is found where no tile has come in, or a tile is still loading', () => {
    const ds = tiled([[0, 0]])
    ds.cache[3] = { 3: 'loading' }
    assert.equal(ds.getCellFromPosition({ x: 1000 + 3 * SPAN + 50, y: 2000 + 3 * SPAN + 50 }, ds.getViewCache()), undefined)
    assert.equal(ds.getCellFromPosition({ x: 1000 + 8 * SPAN, y: 2000 + 8 * SPAN }, ds.getViewCache()), undefined)
})

test('the index of a tile is made once, and survives a new view cache', () => {
    const ds = tiled([[1, 1], [2, 2]])
    const pos = { x: 1150, y: 2150 }
    const first = ds.getCellFromPosition(pos, ds.getViewCache())
    const index = ds.cache[0][0].cellIndex
    assert.ok(index)
    ds.cellsViewCache = [...ds.cellsViewCache]
    assert.equal(ds.getCellFromPosition(pos, ds.getViewCache()), first)
    assert.equal(ds.cache[0][0].cellIndex, index)
})

test('cells off the grid, and a list of cells that is not the view cache, are searched as before', () => {
    const ds = tiled([[1, 1]])
    ds.cache[0][0].cells[0].x += 30
    const offGrid = { x: 1000 + 100 + 30 + 50, y: 2150 }
    assert.equal(ds.getCellFromPosition(offGrid, ds.getViewCache()), ds.cache[0][0].cells[0])

    const other = tiled([[1, 1], [2, 2]])
    const subset = [other.cellsViewCache[1]]
    assert.equal(other.getCellFromPosition({ x: 1150, y: 2150 }, subset), undefined)
    assert.equal(other.getCellFromPosition({ x: 1250, y: 2250 }, subset), subset[0])
})
