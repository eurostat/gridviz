import { test } from 'node:test'
import assert from 'node:assert/strict'
import { tooltipLeft, tooltipRoom } from '../src/core/Tooltip.js'

test('a tooltip goes to the right of the pointer when it fits there', () => {
    assert.equal(tooltipLeft(100, 200, 600, 30), 130)
})

test('it goes to the left of the pointer, relative to the container, when it does not fit on the right', () => {
    // pointer at 500 in a container 600 wide: 530 + 200 > 600, so 500 - 30 - 200
    assert.equal(tooltipLeft(500, 200, 600, 30), 270)
})

test('a tooltip too wide for both sides has no place on one line', () => {
    assert.equal(tooltipLeft(300, 400, 600, 30), undefined)
})

test('the room is that of the wider side of the pointer', () => {
    assert.deepEqual(tooltipRoom(200, 600, 30), { side: 'right', room: 370 })
    assert.deepEqual(tooltipRoom(450, 600, 30), { side: 'left', room: 420 })
    assert.deepEqual(tooltipRoom(10, 20, 30), { side: 'right', room: 0 })
})
