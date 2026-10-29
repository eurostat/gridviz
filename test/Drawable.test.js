import { test } from 'node:test'
import assert from 'node:assert/strict'
import { Drawable } from '../src/core/Drawable.js'
import { TiledGrid } from '../src/dataset/TiledGrid.js'

test('an element is visible unless told otherwise', () => {
    assert.equal(new Drawable().isVisible(10), true)
    assert.equal(new Drawable({ visible: undefined }).isVisible(10), true)
})

test('visible can be a function of the zoom level, or a boolean that can be changed', () => {
    assert.equal(new Drawable({ visible: (z) => z < 100 }).isVisible(10), true)
    assert.equal(new Drawable({ visible: (z) => z < 100 }).isVisible(500), false)

    const layer = new Drawable({ visible: false })
    assert.equal(layer.isVisible(10), false)
    layer.visible = true
    assert.equal(layer.isVisible(10), true)
    layer.visible = false
    assert.equal(layer.isVisible(10), false)
})

test('a dataset is not shown by a layer that is hidden', () => {
    const dataset = Object.create(TiledGrid.prototype)
    const layer = new Drawable({ visible: false })
    layer.getDataset = () => dataset
    dataset.map = { layers: [layer], getZoom: () => 1 }
    assert.equal(dataset.isShown(), false)
    layer.visible = true
    assert.equal(dataset.isShown(), true)
})

test('visibility also works for layers and styles that are not Drawable', async () => {
    const { isVisibleAt } = await import('../src/core/Drawable.js')
    assert.equal(isVisibleAt({}, 1), true)
    assert.equal(isVisibleAt({ visible: false }, 1), false)
    assert.equal(isVisibleAt({ visible: (z) => z > 2 }, 1), false)
    assert.equal(isVisibleAt({ visible: () => 1 }, 1), true)
})
