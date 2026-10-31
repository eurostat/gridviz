import { test } from 'node:test'
import assert from 'node:assert/strict'
import { pointsToSquares, drawSquaresAsTriangles, MIN_SQUARE_SIZE_AS_TRIANGLES } from '../src/utils/webGLUtils.js'

test('a point becomes a square of two triangles, with its values repeated on the six vertices', () => {
    const sq = pointsToSquares([10, 20, 30, 40], 2, [[0.25, 0.75]])
    assert.equal(sq.positions.length, 24)
    assert.equal(sq.corners.length, 24)
    assert.deepEqual([...sq.values[0]], [0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75])
    // the six vertices of the first square are all at its centre
    for (let k = 0; k < 6; k++) assert.deepEqual([sq.positions[2 * k], sq.positions[2 * k + 1]], [10, 20])
    // the corners cover the four corners of the square, and the two triangles have the same orientation
    const corners = []
    for (let k = 0; k < 6; k++) corners.push([sq.corners[2 * k], sq.corners[2 * k + 1]])
    assert.equal(new Set(corners.map((c) => c.join())).size, 4)
    const area = (a, b, c) => (b[0] - a[0]) * (c[1] - a[1]) - (c[0] - a[0]) * (b[1] - a[1])
    assert.equal(area(...corners.slice(0, 3)), area(...corners.slice(3, 6)))
    // together they cover the whole square (twice the area of a triangle is the cross product)
    assert.equal(Math.abs(area(...corners.slice(0, 3))) + Math.abs(area(...corners.slice(3, 6))), 8)
})

test('without cells, there is nothing to draw', () => {
    const sq = pointsToSquares([], 0, [[]])
    assert.equal(sq.positions.length, 0)
    assert.equal(sq.values[0].length, 0)
})

test('squares are drawn as points while they are small, as triangles from MIN_SQUARE_SIZE_AS_TRIANGLES, or from the size limit of the points when it is lower', () => {
    const gl = (max) => ({ ALIASED_POINT_SIZE_RANGE: 1, getParameter: () => [1, max] })
    assert.equal(drawSquaresAsTriangles(gl(1024), MIN_SQUARE_SIZE_AS_TRIANGLES - 1), false)
    assert.equal(drawSquaresAsTriangles(gl(1024), MIN_SQUARE_SIZE_AS_TRIANGLES + 1), true)
    // a GPU with a small limit
    assert.equal(drawSquaresAsTriangles(gl(10), 11), true)
    assert.equal(drawSquaresAsTriangles(gl(10), 9), false)
})
