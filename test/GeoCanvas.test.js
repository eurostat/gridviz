import { test } from 'node:test'
import assert from 'node:assert/strict'
import { GeoCanvas } from '../src/core/GeoCanvas.js'

// what the vertex shader computes, with 32 bits floats like the GPU: clip = mat * (pos, 1), for the x of a position
const gpuClipX = (mat, x) => {
    const f = Math.fround
    return f(f(mat[0] * f(x)) + f(mat[6]))
}

const canvas = (z) => ({ w: 1000, h: 700, view: { x: 3764000, y: 2891000, z: z } })

const limited = (props) => ({ w: 1000, h: 500, view: { x: 0, y: 0, z: 10 }, ...props })
const constrain = (cv, x, y, z) => GeoCanvas.prototype.constrainCenter.call(cv, x, y, z)

test('without a limit, the position is unchanged', () => {
    assert.deepEqual(constrain(limited({}), 123, -456), [123, -456])
})

test('centerExtent limits the center, whatever the zoom', () => {
    const cv = limited({ xMin: 0, yMin: 0, xMax: 100, yMax: 100 })
    assert.deepEqual(constrain(cv, -5, 500, 10), [0, 100])
    assert.deepEqual(constrain(cv, -5, 500, 1000), [0, 100])
    assert.deepEqual(constrain(cv, 50, 50), [50, 50])
})

test('centerExtent can limit one side only', () => {
    assert.deepEqual(constrain(limited({ xMin: 0 }), -5, -5), [0, -5])
})

test('viewExtent keeps the borders of the view inside', () => {
    // the view is 10000 x 5000 m at z = 10
    const cv = limited({ viewExtent: [0, 0, 20000, 20000] })
    assert.deepEqual(constrain(cv, -1000, 99999, 10), [5000, 17500])
    assert.deepEqual(constrain(cv, 8000, 8000, 10), [8000, 8000])
    // zoomed in, the view is smaller, so its center can go further
    assert.deepEqual(constrain(cv, -1000, 99999, 1), [500, 19750])
})

test('along an axis where the view is larger than viewExtent, it is centered on it', () => {
    // at z = 30 the view is 30000 x 15000 m: too wide for the extent, not too high
    const cv = limited({ viewExtent: [0, 0, 20000, 20000] })
    assert.deepEqual(constrain(cv, 777, 0, 30), [10000, 7500])
})

test('constrainView brings the zoom and the position back within the limits', () => {
    const cv = limited({ viewExtent: [0, 0, 20000, 20000], zoomExtent: [1, 20], view: { x: -1000, y: 8000, z: 500 } })
    cv.constrainCenter = GeoCanvas.prototype.constrainCenter
    cv.updateExtentGeo = () => {}
    GeoCanvas.prototype.constrainView.call(cv)
    assert.deepEqual(cv.view, { x: 10000, y: 8000, z: 20 })
})

test('the centered transform has no translation', () => {
    const m = GeoCanvas.prototype.getWebGLTransformCentered.call(canvas(10))
    assert.deepEqual(m.slice(6, 8), [0, 0])
    assert.equal(m[0], 2 / (1000 * 10))
    assert.equal(m[4], 2 / (700 * 10))
})

test('zoomed in, the position of a cell on the screen is exact with the centered transform, not with the other one', () => {
    // a cell border 1 km east of the center of the view, at a zoom where 1 km is 2000 pixels: it is at x = 1000 + 2000 pixels
    const z = 0.5
    const cv = canvas(z)
    const expectedClip = (2 * 1000) / (cv.w * z) // 1000 m east of the center, in the clip space (-1, 1)
    const pix = (clip) => (clip * cv.w) / 2

    const centered = gpuClipX(GeoCanvas.prototype.getWebGLTransformCentered.call(cv), 3764000 + 1000 - cv.view.x)
    assert.ok(Math.abs(pix(centered) - pix(expectedClip)) < 0.01)

    // the loss of the non centered one grows with the zoom: at 0.005 m/pixel it is tens of pixels
    const z2 = 0.005
    const cv2 = canvas(z2)
    const expected2 = (2 * 3) / (cv2.w * z2)
    const off = gpuClipX(GeoCanvas.prototype.getWebGLTransform.call(cv2), 3764000 + 3)
    const ok = gpuClipX(GeoCanvas.prototype.getWebGLTransformCentered.call(cv2), 3)
    assert.ok(Math.abs(pix(off) - pix(expected2)) > 1, 'the old transform is imprecise')
    assert.ok(Math.abs(pix(ok) - pix(expected2)) < 0.01, 'the centered transform is precise')
})
