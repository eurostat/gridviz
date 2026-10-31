import { test } from 'node:test'
import assert from 'node:assert/strict'
import { randomWalkInterpolate } from '../src/style/RandomWalkInterpolator.js'

const count = (arr, v) => arr.filter((x) => x === v).length

test('a grid with a single category gives a grid with this category', () => {
    const out = randomWalkInterpolate(new Int32Array(6).fill(2), 2, 3, 4)
    assert.equal(out.length, 2 * 4 * 3 * 4)
    assert.ok(out.every((c) => c === 2))
})

test('a factor of 1 changes nothing', () => {
    const codes = [0, 1, 1, 0, 2, 2]
    assert.deepEqual([...randomWalkInterpolate(codes, 2, 3, 1)], codes)
})

test('the cells without category give cells without category, and the others keep a category', () => {
    const codes = [0, -1, 1, 1]
    const out = randomWalkInterpolate(codes, 2, 2, 3)
    for (let I = 0; I < 6; I++)
        for (let J = 0; J < 6; J++) {
            const v = out[I * 6 + J]
            if (I < 3 && J >= 3) assert.equal(v, -1)
            else assert.ok(v === 0 || v === 1)
        }
})

test('the point of a cell, and the cells next to it, get its category', () => {
    // one cell of category 1, between cells of category 0, factor 5: its point is the fine cell (2,2) of the cell
    const factor = 5
    const codes = [0, 0, 0, 0, 1, 0, 0, 0, 0]
    const out = randomWalkInterpolate(codes, 3, 3, factor)
    const fineCols = 3 * factor
    // the point is at (1*5+2, 1*5+2)
    assert.equal(out[7 * fineCols + 7], 1)
    // the cells in the middle of the other cells are in their category, as their point is the closest
    assert.equal(out[2 * fineCols + 2], 0)
    assert.equal(out[12 * fineCols + 12], 0)
})

test('two halves with two categories: the limit is irregular, and each side is mostly its category', () => {
    const rows = 12,
        cols = 12,
        factor = 5
    const codes = new Int32Array(rows * cols)
    for (let i = 0; i < rows; i++) for (let j = 0; j < cols; j++) codes[i * cols + j] = j < cols / 2 ? 0 : 1
    const out = randomWalkInterpolate(codes, rows, cols, factor)
    const fineCols = cols * factor
    let leftOk = 0,
        rightOk = 0,
        mixedColumns = 0
    for (let I = 0; I < rows * factor; I++)
        for (let J = 0; J < fineCols; J++) {
            const v = out[I * fineCols + J]
            if (J < fineCols / 2 - factor) leftOk += v === 0
            if (J >= fineCols / 2 + factor) rightOk += v === 1
        }
    // away from the limit, almost all the cells are in the category of their side
    const nbSide = rows * factor * (fineCols / 2 - factor)
    assert.ok(leftOk / nbSide > 0.97, 'left ' + leftOk / nbSide)
    assert.ok(rightOk / nbSide > 0.97, 'right ' + rightOk / nbSide)
    // on the limit, the cells of the two categories are mixed: not a straight line
    for (let J = fineCols / 2 - 2; J < fineCols / 2 + 2; J++) {
        const col = []
        for (let I = 0; I < rows * factor; I++) col.push(out[I * fineCols + J])
        if (count(col, 0) > 0 && count(col, 1) > 0) mixedColumns++
    }
    assert.ok(mixedColumns >= 2, 'mixed columns ' + mixedColumns)
})

test('the result does not change from a draw to another, and changes with the seed', () => {
    const codes = [0, 1, 2, 1, 0, 2, 2, 1, 0]
    const a = randomWalkInterpolate(codes, 3, 3, 5)
    const b = randomWalkInterpolate(codes, 3, 3, 5)
    assert.deepEqual([...a], [...b])
    const c = randomWalkInterpolate(codes, 3, 3, 5, { seed: 7 })
    assert.notDeepEqual([...a], [...c])
})
