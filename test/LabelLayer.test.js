import { test } from 'node:test'
import assert from 'node:assert/strict'
import { LabelLayer } from '../src/layer/LabelLayer.js'
import { GeoCanvas } from '../src/core/GeoCanvas.js'

// A canvas context which counts the assignments of the font (the browser parses it each time: slow) and keeps the texts
const makeCanvas = () => {
    const drawn = []
    let fonts = 0
    const ctx = {
        set font(v) {
            fonts++
        },
        strokeText: (t) => drawn.push('stroke ' + t),
        fillText: (t) => drawn.push('fill ' + t),
    }
    const geoCanvas = {
        view: { z: 10 },
        offscreenCtx: ctx,
        extGeo: { xMin: 0, xMax: 100, yMin: 0, yMax: 100 },
        initCanvasTransform() {},
        toDraw: GeoCanvas.prototype.toDraw,
        geoToPixX: (x) => x,
        geoToPixY: (y) => y,
    }
    return { geoCanvas, drawn, fonts: () => fonts }
}

test('the labels out of the view are not styled, and the font is set once for labels of the same style', () => {
    const layer = new LabelLayer({ url: 'x' })
    let styled = 0
    layer.style = () => (styled++, '12px Arial')
    // 5 labels in the view, and 20000 out of it, like the labels of Europe when zoomed in
    layer.labels = [
        ...Array.from({ length: 5 }, (_, i) => ({ name: 'in' + i, x: 10 + i, y: 10 })),
        ...Array.from({ length: 20000 }, (_, i) => ({ name: 'out' + i, x: 1000 + i, y: 10 })),
    ]
    const { geoCanvas, drawn, fonts } = makeCanvas()
    layer.draw(geoCanvas)
    assert.equal(styled, 5, 'only the labels in the view are styled')
    assert.equal(fonts(), 1, 'one font assignment: the style does not change')
    assert.equal(drawn.filter((d) => d.startsWith('fill')).length, 5)
    assert.deepEqual(
        drawn.filter((d) => d.startsWith('fill')).map((d) => d.slice(5)),
        ['in0', 'in1', 'in2', 'in3', 'in4']
    )
})

test('a label with a style which changes gets its font, and a label without style is not drawn', () => {
    const layer = new LabelLayer({ url: 'x' })
    layer.style = (lb) => (lb.name === 'hidden' ? undefined : lb.name === 'big' ? '20px Arial' : '10px Arial')
    layer.labels = [
        { name: 'a', x: 1, y: 1 },
        { name: 'b', x: 2, y: 1 },
        { name: 'big', x: 3, y: 1 },
        { name: 'hidden', x: 4, y: 1 },
        { name: 'c', x: 5, y: 1 },
    ]
    const { geoCanvas, drawn, fonts } = makeCanvas()
    layer.draw(geoCanvas)
    assert.equal(fonts(), 3, '10px, 20px, 10px again')
    assert.deepEqual(
        drawn.filter((d) => d.startsWith('fill')).map((d) => d.slice(5)),
        ['a', 'b', 'big', 'c']
    )
})
