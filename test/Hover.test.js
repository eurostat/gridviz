import { test } from 'node:test'
import assert from 'node:assert/strict'
import { Dataset } from '../src/core/Dataset.js'
import { GridLayer } from '../src/layer/GridLayer.js'

const dataset = () => {
    const d = new Dataset(undefined, undefined, 100)
    d.getResolution = () => 100
    return d
}
const cells = [
    { x: 0, y: 0 },
    { x: 1000, y: 0 },
    { x: 1000, y: 1000 },
]

test('the nearest cell within the reach is found, from the middle of the cell', () => {
    assert.equal(dataset().getNearestCellFromPosition({ x: 1100, y: 100 }, cells, 200), cells[1])
    assert.equal(dataset().getNearestCellFromPosition({ x: 300, y: 50 }, cells, 300), cells[0])
})

test('no cell beyond the reach, and none in an empty list', () => {
    assert.equal(dataset().getNearestCellFromPosition({ x: 500, y: 500 }, cells, 100), undefined)
    assert.equal(dataset().getNearestCellFromPosition({ x: 0, y: 0 }, [], 100), undefined)
    assert.equal(dataset().getNearestCellFromPosition({ x: 0, y: 0 }, undefined, 100), undefined)
})

test('the exact lookup does not change, and a layer has no reach unless it says so', () => {
    assert.equal(dataset().getCellFromPosition({ x: 300, y: 50 }, cells), undefined)
    assert.equal(new GridLayer(dataset(), []).hoverReach, undefined)
    const reach = () => 5
    assert.equal(new GridLayer(dataset(), [], { hoverReach: reach }).hoverReach, reach)
})
