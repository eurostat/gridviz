import { test } from 'node:test'
import assert from 'node:assert/strict'
import { PillarStyle } from '../src/style/PillarStyle.js'

function draw(height, options = {}) {
    const segments = [], arcs = []
    const ctx = {
        beginPath() {}, stroke() {},
        moveTo(x, y) { segments.push([x, y]) },
        lineTo(x, y) { segments.push([x, y]) },
        arc(x, y, radius) { arcs.push([x, y, radius]) },
    }
    const style = new PillarStyle({ height: () => height, ...options })
    const geo = { w: 800, h: 600, view: { x: 0, y: 0, z: 1 }, offscreenCtx: ctx }
    style.draw([{ x: 100, y: 100 }], geo, 10)
    return { segments, arcs }
}

test('camera-plane heights and extreme values never reach the Canvas projection', () => {
    // Camera height is 1.5 * (800 + 600) / 2 = 1050.
    for (const simple of [true, false]) {
        for (const height of [525, 1049.999999, 1050, 1051, 1e308]) {
            const result = draw(height, { simple: () => simple })
            assert.ok(result.segments.length > 0)
            for (const point of [...result.segments, ...result.arcs]) {
                assert.ok(point.every(Number.isFinite))
                assert.ok(point.every(value => Math.abs(value) < 3000))
            }
            assert.deepEqual(result, draw(525, { simple: () => simple }))
        }
    }
})

test('ordinary gallery heights keep the original projection and shadows', () => {
    const { segments } = draw(100, { simple: () => true })
    const cx = 105, cy = 105, cameraY = -300
    const dx = cx, dy = cy - cameraY
    const angle = Math.atan2(dy, dx)
    const projected = Math.hypot(dx, dy) * 100 / (1050 - 100)
    const tip = segments.at(-1)
    assert.ok(Math.abs(tip[0] - (cx + projected * Math.cos(angle))) < 1e-10)
    assert.ok(Math.abs(tip[1] - (cy + projected * Math.sin(angle))) < 1e-10)
})

test('invalid heights and widths are skipped', () => {
    for (const height of [NaN, Infinity, -Infinity, -1, 0]) assert.equal(draw(height).segments.length, 0)
    for (const width of [NaN, Infinity, -1, 0]) assert.equal(draw(100, { width: () => width }).segments.length, 0)
})
