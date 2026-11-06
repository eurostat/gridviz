import { test } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

// a minimal DOM element, enough for the d3 selections the legends make in their constructor
const element = () => {
    const el = {
        style: { setProperty() {}, getPropertyValue: () => '', removeProperty() {} },
        classList: { add() {}, remove() {}, contains: () => false },
        setAttribute() {},
        getAttribute: () => null,
        removeAttribute() {},
        appendChild: (c) => c,
        ownerDocument: undefined,
    }
    return el
}
globalThis.document = { createElement: element, createElementNS: element }

const { ColorLegend } = await import('../src/legend/ColorLegend.js')

const styleDir = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'src', 'style')

test('a color legend without ticks has a default number of ticks, from its width', () => {
    assert.equal(new ColorLegend({ colorScale: (t) => t }).ticks, 6, 'default width of 300 pixels: 6 ticks')
    assert.equal(new ColorLegend({ colorScale: (t) => t, width: 500 }).ticks, 10)
    assert.equal(
        new ColorLegend({ colorScale: (t) => t, width: 'fill' }).ticks,
        6,
        'the width of the container is not known yet'
    )
    assert.equal(new ColorLegend({ colorScale: (t) => t, width: 20 }).ticks, 2, 'at least the two ends')
    assert.equal(new ColorLegend({ colorScale: (t) => t, ticks: 3 }).ticks, 3, 'the given number is kept')
})

test('the ticks of a color legend follow the width it is drawn at, unless a number is given', () => {
    const legend = new ColorLegend({ colorScale: (t) => t, width: 'fill' })
    assert.equal(legend.tickCount(120), 2, 'a narrow container: not 6 labels in 120 pixels')
    assert.equal(legend.tickCount(600), 12)
    assert.equal(new ColorLegend({ colorScale: (t) => t, ticks: 5 }).tickCount(120), 5, 'the given number is kept')
    assert.equal(new ColorLegend({ colorScale: (t) => t, ticks: 1 }).tickCount(300), 2, 'one tick would divide by zero')
    const set = new ColorLegend({ colorScale: (t) => t })
    set.ticks = 4
    assert.equal(set.tickCount(300), 4, 'a number set afterwards is kept')
})

test('every style gives the cells of the view to its legends, so that a legend made from the cells (sizeLegendViewScale) works with any style', () => {
    const missing = []
    let styles = 0
    for (const file of fs.readdirSync(styleDir)) {
        const code = fs.readFileSync(path.join(styleDir, file), 'utf8')
        const calls = code.match(/this\.updateLegends\(\{[^}]*\}\)/g)
        if (!calls) continue
        styles++
        for (const call of calls) if (!/\bcells\s*:/.test(call)) missing.push(file + ': ' + call)
    }
    assert.ok(styles >= 15, 'the styles with legends were found: ' + styles)
    assert.deepEqual(missing, [])
})

test('a Venn legend multiplies its circles by default, and can mix them otherwise', async () => {
    const { VennLegend } = await import('../src/legend/VennLegend.js')
    const items = [
        { label: 'a', color: 'red' },
        { label: 'b', color: 'blue' },
    ]
    assert.equal(new VennLegend({ items }).blendMode, 'multiply')
    assert.equal(new VennLegend({ items, blendMode: 'plus-lighter' }).blendMode, 'plus-lighter')
})
