import { test } from 'node:test'
import assert from 'node:assert/strict'
import { stretchedBreaks } from '../src/utils/scale.js'
import { powerScale, logarithmicScale, exponentialScale, circularScale } from '../src/utils/stretching.js'

const near = (a, b, eps = 1e-9) => assert.ok(Math.abs(a - b) < eps, a + ' is not ' + b)

test('without stretching, the classes have the same width', () => {
    const b = stretchedBreaks(0, 100, 4)
    assert.equal(b.length, 3)
    b.forEach((v, i) => near(v, 25 * (i + 1)))
    assert.deepEqual(stretchedBreaks(10, 20, 1), [])
})

test('the breaks are the values a stretching maps to the limits of the classes of the color ramp', () => {
    for (const stretching of [
        powerScale(0.4),
        powerScale(3),
        logarithmicScale(-7),
        logarithmicScale(5),
        exponentialScale(4),
    ]) {
        const n = 8
        const breaks = stretchedBreaks(50, 450, n, stretching)
        assert.equal(breaks.length, n - 1)
        breaks.forEach((v, i) => {
            // the value of a break is stretched to the limit of the class
            near(stretching((v - 50) / 400), (i + 1) / n)
            // and they increase
            if (i) assert.ok(v > breaks[i - 1])
        })
    }
})

test('a log scale with a negative base puts the breaks of the low values close together', () => {
    const b = stretchedBreaks(0, 1000, 5, logarithmicScale(-7))
    assert.ok(b[0] < 10 && b[3] < 400)
})

test('a stretching without invert function is refused', () => {
    assert.throws(() => stretchedBreaks(0, 1, 4, circularScale(0.5)), /invert/)
})
