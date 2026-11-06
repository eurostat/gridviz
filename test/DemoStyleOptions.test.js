import { test } from 'node:test'
import assert from 'node:assert/strict'
import { TimeSeriesStyle } from '../src/style/TimeSeriesStyle.js'
import { LegoStyle } from '../src/style/LegoStyle.js'
import { SideTanakaStyle } from '../src/style/SideTanakaStyle.js'
import { DotDensityStyle } from '../src/style/DotDensityStyle.js'

test('TimeSeriesStyle: the number 0 is a value, and an empty text is no data', () => {
    const { noData } = new TimeSeriesStyle({ ts: ['a'] })
    assert.equal(noData(0), false)
    assert.equal(noData('0'), false)
    assert.equal(noData(''), true)
    assert.equal(noData(undefined), true)
    assert.equal(noData(null), true)
    assert.equal(noData('x'), true)
})

// the dots drawn on a canvas, without webGL (there is none here)
const dotsOf = (opts, cell = { x: 0, y: 0 }) => {
    let dots = 0
    const ctx = {
        fillRect() {
            dots++
        },
    }
    new DotDensityStyle(opts).draw([cell], { view: { z: 1, x: 0, y: 0 }, offscreenCtx: ctx }, 10)
    return dots
}

test('DotDensityStyle: one dot more than dotNumber by default, as it always was', () => {
    assert.equal(dotsOf({ dotNumber: () => 3 }), 4)
    assert.equal(dotsOf({ dotNumber: () => 0 }), 1)
    assert.equal(dotsOf({ dotNumber: () => 2.5 }), 3)
})

test('DotDensityStyle: exactDotNumber gives dotNumber dots, none for 0', () => {
    assert.equal(dotsOf({ exactDotNumber: true, dotNumber: () => 3 }), 3)
    assert.equal(dotsOf({ exactDotNumber: true, dotNumber: () => 0 }), 0)
})

test('DotDensityStyle: exactDotNumber rounds decimals at random, right on average', () => {
    let total = 0
    for (let i = 0; i < 4000; i++) {
        const dots = dotsOf({ exactDotNumber: true, dotNumber: () => 0.25 })
        assert.ok(dots === 0 || dots === 1)
        total += dots
    }
    assert.ok(Math.abs(total / 4000 - 0.25) < 0.05, 'mean ' + total / 4000)
})

test('LegoStyle.getCategory: three styles and no filter by default, as it always was', () => {
    const styles = LegoStyle.getCategory(() => 'a', { a: 'red' })
    assert.equal(styles.length, 3)
    for (const s of styles) assert.equal(s.filter, undefined)
    assert.ok(!styles.some((s) => s instanceof SideTanakaStyle))
})

test('LegoStyle.getCategory: the filter goes to all the styles', () => {
    const filter = () => true
    for (const s of LegoStyle.getCategory(() => 'a', { a: 'red' }, { filter })) assert.equal(s.filter, filter)
})

test('LegoStyle.getCategory: heightClass adds the steps, under the studs', () => {
    const heightClass = (cell) => cell.h
    const filter = () => true
    const width = () => 1
    const styles = LegoStyle.getCategory(
        () => 'a',
        { a: 'red' },
        { heightClass, filter, colDark: '#111', tanaka: { width, colorBright: '#eee' } }
    )
    assert.equal(styles.length, 4)
    const steps = styles[2]
    assert.ok(steps instanceof SideTanakaStyle)
    assert.equal(steps.classifier(), heightClass)
    assert.equal(steps.filter, filter)
    assert.equal(steps.width, width)
    assert.equal(steps.colorDark, '#111')
    assert.equal(steps.colorBright, '#eee')
})
