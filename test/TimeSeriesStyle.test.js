import { test } from 'node:test'
import assert from 'node:assert/strict'
import { TimeSeriesStyle } from '../src/style/TimeSeriesStyle.js'

// a canvas context which records the points of the lines
const recorder = () => {
    const lines = []
    let line
    return {
        lines,
        beginPath() {
            line = []
        },
        moveTo(x, y) {
            line.push([x, y])
        },
        lineTo(x, y) {
            line.push([x, y])
        },
        stroke() {
            lines.push(line)
        },
    }
}

const draw = (style, cells, resolution) => {
    const ctx = recorder()
    style.draw(cells, { view: { z: 1 }, offscreenCtx: ctx }, resolution)
    return ctx.lines
}

test('the values, which are text in a CSV file, are compared as numbers', () => {
    // as text, '9' is above '10000'. The line goes from the lowest value to the highest, over the height of the cell.
    const cell = { x: 0, y: 0, a: '9', b: '10000', c: '100' }
    const [line] = draw(new TimeSeriesStyle({ ts: ['a', 'b', 'c'] }), [cell], 10)
    assert.equal(line.length, 3)
    // the lowest value is at the bottom of the cell, the highest at the top
    assert.ok(Math.abs(line[0][1] - 0) < 1e-9, 'lowest: ' + line[0][1])
    assert.ok(Math.abs(line[1][1] - 10) < 1e-9, 'highest: ' + line[1][1])
    assert.ok(line[2][1] > 0 && line[2][1] < 1)
})

test('no data breaks the line', () => {
    const cell = { x: 0, y: 0, a: '1', b: '', c: '3', d: '4' }
    const lines = draw(new TimeSeriesStyle({ ts: ['a', 'b', 'c', 'd'] }), [cell], 10)
    // the line of the last two values, at the 3rd and 4th of the 4 positions along the width of the cell (10): the value in between is missing
    const last = lines[lines.length - 1]
    assert.equal(last.length, 2)
    assert.ok(Math.abs(last[0][0] - 20 / 3) < 1e-9 && Math.abs(last[1][0] - 10) < 1e-9)
})
