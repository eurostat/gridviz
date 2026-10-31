import { test } from 'node:test'
import assert from 'node:assert/strict'
import { GeoCanvas } from '../src/core/GeoCanvas.js'

// what the vertex shader computes, with 32 bits floats like the GPU: clip = mat * (pos, 1), for the x of a position
const gpuClipX = (mat, x) => {
    const f = Math.fround
    return f(f(mat[0] * f(x)) + f(mat[6]))
}

const canvas = (z) => ({ w: 1000, h: 700, view: { x: 3764000, y: 2891000, z: z } })

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
