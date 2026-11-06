import { test } from 'node:test'
import assert from 'node:assert/strict'
import { MultiResolutionDataset } from '../src/core/MultiResolutionDataset.js'
import { TiledGrid } from '../src/dataset/TiledGrid.js'

const RESOLUTIONS = [100, 200, 500]
const VIEW = { xMin: 0, xMax: 9999, yMin: 0, yMax: 9999 }

/** A tiled grid of 10 cells a tile, whose info is there or comes in with loadInfo(). */
const tiled = (resolution, map, hasInfo = true) => {
    const grid = new TiledGrid(map, 'https://data.test/' + resolution + '/')
    const info = {
        tileSizeCell: 10,
        originPoint: { x: 0, y: 0 },
        resolutionGeo: resolution,
        tilingBounds: { xMin: 0, xMax: 1000, yMin: 0, yMax: 1000 },
    }
    if (hasInfo) grid.info = info
    else grid.loadInfo = () => (grid.asked = true)
    grid.fakeInfo = info
    return grid
}
const mapOf = (extGeo = VIEW) => ({ geoCanvas: { extGeo }, layers: [], getZoom: () => 1, redraw() {} })
const multi = (opts, map = mapOf(), hasInfo = () => true) =>
    new MultiResolutionDataset(RESOLUTIONS, (r) => tiled(r, map, hasInfo(r)), opts)
// tiles of a view of 10 km, at 10 cells a tile: 100 m: 10x10 tiles, so 10000 cells. 200 m: 5x5 tiles, 2500 cells. 500 m: 2x2 tiles, 400 cells.
const resolutionOf = (dataset, ds) => dataset.resolutions[dataset.datasets.indexOf(ds)]

test('no limit by default: the resolution only depends on the zoom', () => {
    const dataset = multi()
    assert.equal(resolutionOf(dataset, dataset.getDataset(10, 5)), 100)
    assert.equal(resolutionOf(dataset, dataset.getDataset(30, 5)), 200)
    assert.equal(resolutionOf(dataset, dataset.getDataset(90, 5)), 500)
    assert.equal(resolutionOf(dataset, dataset.getDataset(1000, 5)), 500)
})

test('maxCells: the next coarser resolution within the limit is shown', () => {
    const dataset = multi({ maxCells: 3000 })
    assert.equal(resolutionOf(dataset, dataset.getDataset(10, 5)), 200)
    assert.equal(dataset.getRequestedDataset(10, 5), dataset.datasets[0])
})

test('maxCells: a resolution exactly at the limit is kept', () => {
    const dataset = multi({ maxCells: 10000 })
    assert.equal(resolutionOf(dataset, dataset.getDataset(10, 5)), 100)
})

test('maxCells: never finer than what the zoom asks for', () => {
    const dataset = multi({ maxCells: 1000000 })
    assert.equal(resolutionOf(dataset, dataset.getDataset(30, 5)), 200)
})

test('maxCells: the coarsest resolution when none is within the limit', () => {
    const dataset = multi({ maxCells: 1 })
    assert.equal(resolutionOf(dataset, dataset.getDataset(10, 5)), 500)
})

test('maxCells: a function of the resolution', () => {
    const asked = []
    const dataset = multi({
        maxCells: (r) => {
            asked.push(r)
            return r === 200 ? 100 : 500
        },
    })
    assert.equal(resolutionOf(dataset, dataset.getDataset(10, 5)), 500)
    assert.deepEqual(asked, [100, 200, 500])
})

test('maxCells: the view is limited to the tiles which exist', () => {
    const map = mapOf()
    const dataset = multi({ maxCells: 400 }, map)
    for (const ds of dataset.datasets) ds.info.tilingBounds = { xMin: 0, xMax: 1, yMin: 0, yMax: 1 }
    // 2x2 tiles of the bounds, whatever the size of the view
    assert.equal(resolutionOf(dataset, dataset.getDataset(10, 5)), 100)
    map.geoCanvas.extGeo = { xMin: 1e7, xMax: 2e7, yMin: 1e7, yMax: 2e7 }
    assert.equal(resolutionOf(dataset, dataset.getDataset(10, 5)), 100)
})

test('maxCells: a dataset without its info is returned, and asked for it, before going coarser', () => {
    const dataset = multi({ maxCells: 3000 }, mapOf(), (r) => r !== 100)
    const first = dataset.datasets[0]
    assert.equal(dataset.getDataset(10, 5), first)
    assert.equal(first.asked, true)
    // the info comes in: the choice is made
    first.info = first.fakeInfo
    assert.equal(resolutionOf(dataset, dataset.getDataset(10, 5)), 200)
})

test('maxCells: when the info of a resolution comes in, the next one is asked for', () => {
    const dataset = multi({ maxCells: 3000 }, mapOf(), () => false)
    const [first, second] = dataset.datasets
    assert.equal(dataset.getDataset(10, 5), first)
    assert.equal(second.asked, undefined)
    first.info = first.fakeInfo
    assert.equal(dataset.getDataset(10, 5), second)
    assert.equal(second.asked, true)
})

test('maxCells: datasets which are not tiled are not limited', () => {
    const plain = RESOLUTIONS.map(() => ({ preprocess: undefined }))
    const dataset = new MultiResolutionDataset(RESOLUTIONS, plain, { maxCells: 1 })
    assert.equal(dataset.getDataset(10, 5), plain[0])
})

test('maxCells: a single dataset stays the one', () => {
    const map = mapOf()
    const grid = tiled(100, map)
    const dataset = new MultiResolutionDataset([100], [grid], { maxCells: 1 })
    assert.equal(dataset.getDataset(1000, 5), grid)
})

test('a subclass of getRequestedDataset is followed by the limit', () => {
    class Bigger extends MultiResolutionDataset {
        getRequestedDataset(z, minPixelsPerCell) {
            return super.getRequestedDataset(z, minPixelsPerCell * 3)
        }
    }
    const map = mapOf()
    const dataset = new Bigger(RESOLUTIONS, (r) => tiled(r, map), { maxCells: 1000000 })
    assert.equal(resolutionOf(dataset, dataset.getDataset(10, 5)), 200)
})
