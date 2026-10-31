import { test } from 'node:test'
import assert from 'node:assert/strict'
import { ShapeColorSizeStyle } from '../src/style/ShapeColorSizeStyle.js'

// a canvas context which records the radii of the arcs
const draw = (style, cells, resolution) => {
    const arcs = []
    const ctx = {
        arcs,
        beginPath() {},
        moveTo() {},
        closePath() {},
        fill() {},
        arc(x, y, r) {
            arcs.push([x, y, r])
        },
    }
    style.draw(cells, { view: { z: 1 }, offscreenCtx: ctx }, resolution)
    return arcs
}

const cell = { x: 100, y: 200 }

test('a donut has the diameter of the cell, and a hole which depends on its size', () => {
    // size 20 of 100: a ring of 10 (the hole has a diameter of 80)
    const arcs = draw(new ShapeColorSizeStyle({ shape: 'donut', color: 'red', size: () => 20 }), [cell], 100)
    assert.deepEqual(arcs, [
        [150, 250, 50],
        [150, 250, 40],
    ])
})

test('the outer diameter of a donut can be given: the size is then the part of it which is filled', () => {
    // outer diameter 60: radius 30. A size of 15 leaves a hole of 45, of radius 22.5
    const arcs = draw(
        new ShapeColorSizeStyle({ shape: 'donut', color: 'red', size: () => 15, donutOuterSize: () => 60 }),
        [cell],
        100
    )
    assert.deepEqual(arcs, [
        [150, 250, 30],
        [150, 250, 22.5],
    ])
})

test('the outer diameter of a donut can be a number, and a size which equals it makes a disk', () => {
    const arcs = draw(
        new ShapeColorSizeStyle({ shape: 'donut', color: 'red', size: () => 60, donutOuterSize: 60 }),
        [cell],
        100
    )
    assert.deepEqual(arcs, [
        [150, 250, 30],
        [150, 250, 0],
    ])
})

test('a donut without outer diameter is not drawn', () => {
    const arcs = draw(
        new ShapeColorSizeStyle({ shape: 'donut', color: 'red', size: () => 15, donutOuterSize: () => 0 }),
        [cell],
        100
    )
    assert.deepEqual(arcs, [])
})
