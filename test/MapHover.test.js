import { test } from 'node:test'
import assert from 'node:assert/strict'
import { Map } from '../src/core/Map.js'

// focusCell saves the canvas in a canvas of its own
globalThis.document = {
    createElement: () => ({ setAttribute() {}, getContext: () => ({ drawImage() {} }) }),
    // what is under the pointer: the canvas, unless a test puts something else (a panel) on top
    elementFromPoint: () => globalThis.__topElement,
}

// A map without a DOM: the real focusCell/redrawNow/redraw, on a fake canvas which records what is drawn.
const makeMap = (opts = {}) => {
    const calls = []
    const ctx = () => ({
        strokeStyle: '',
        lineWidth: 0,
        save() {},
        restore() {},
        beginPath() {},
        clearRect() {},
        rect() {},
        stroke() {
            calls.push('stroke')
        },
        drawImage() {},
    })
    const cell = { x: 100, y: 200 }
    const geoCanvas = {
        view: { x: 0, y: 0, z: 1 },
        canvas: { style: {}, getBoundingClientRect: () => ({ left: 10, top: 20, right: 110, bottom: 120 }) },
        offscreenCanvas: {},
        ctx: ctx(),
        offscreenCtx: ctx(),
        _isZooming: false,
        backgroundColor: 'white',
        initCanvasTransform() {},
        setCanvasTransform() {},
        clear() {},
        updateExtentGeo() {},
        pixToGeoX: (p) => p,
        pixToGeoY: (p) => p,
        geoToPixX: (g) => g,
        geoToPixY: (g) => g,
    }
    const tooltip = {
        xMouseOffset: 0,
        yMouseOffset: 0,
        shown: false,
        html() {},
        setPosition() {},
        show() {
            this.shown = true
        },
        hide() {
            this.shown = false
        },
    }
    const map = Object.create(Map.prototype)
    globalThis.__topElement = geoCanvas.canvas
    Object.assign(map, {
        geoCanvas,
        tooltip,
        w: 100,
        h: 100,
        layers: [],
        asyncRedraw: opts.asyncRedraw !== false,
        selectionRectangleColor: 'red',
        selectionRectangleWidthPix: () => 4,
        _redrawFrame: null,
        _focusedCell: undefined,
        _lastMouseEvent: null,
        _hovering: false,
        _hoverKey: null,
        _triedKey: null,
        _pointer: null,
        canvasSave: { fake: true },
        // what is under the mouse: the cell, or nothing
        getCellFocusInfo: () =>
            map.cellUnderMouse === false ? undefined : { cell: map.cellUnderMouse || cell, html: 'x', resolution: 10 },
    })
    return { map, calls, cell }
}

const mouse = { offsetX: 105, offsetY: 205 }

test('the rectangle of the hovered cell is drawn again by a redraw, instead of disappearing until the next mouse move (issue 174)', () => {
    const { map, calls } = makeMap()
    map._lastMouseEvent = mouse
    map.focusCell(mouse)
    assert.equal(calls.length, 1, 'the hover draws the rectangle')

    // the application redraws the map on the hover (to show the neighbouring cells): the canvas is cleared and drawn again
    map.redrawNow()
    assert.equal(calls.length, 2, 'the redraw draws the rectangle again, in the same draw')
    assert.equal(map._focusedCell.x, 100)
})

test('a redraw requested on each hover keeps the rectangle in every frame, not only once', () => {
    const { map, calls } = makeMap()
    const frames = []
    globalThis.requestAnimationFrame = (f) => frames.push(f)
    globalThis.cancelAnimationFrame = () => {}
    try {
        map._lastMouseEvent = mouse
        map.focusCell(mouse)
        for (let i = 0; i < 3; i++) {
            map.redraw() // asynchronous by default
            map.redraw() // coalesced with the previous
            assert.equal(frames.length, 1)
            const before = calls.length
            frames.shift()()
            assert.equal(calls.length, before + 1, 'the frame ends with the rectangle on the canvas')
        }
    } finally {
        delete globalThis.requestAnimationFrame
        delete globalThis.cancelAnimationFrame
    }
})

test('a redraw with the mouse out of the canvas or not yet over it draws no rectangle', () => {
    const { map, calls } = makeMap()
    map.redrawNow()
    assert.equal(calls.length, 0, 'no mouse yet')
    map._lastMouseEvent = mouse
    map.focusCell(mouse)
    map._lastMouseEvent = null // mouseout
    calls.length = 0
    map.redrawNow()
    assert.equal(calls.length, 0, 'mouse out')
})

test('a redraw with the mouse over no cell draws no rectangle and hides the tooltip', () => {
    const { map, calls } = makeMap()
    map._lastMouseEvent = mouse
    map.focusCell(mouse)
    map.cellUnderMouse = false // the redraw moved the cells away from the mouse
    calls.length = 0
    map.redrawNow()
    assert.equal(calls.length, 0)
    assert.equal(map.tooltip.shown, false)
    assert.equal(map._focusedCell, null)
})

test('the rectangle follows the cell under the mouse after the redraw changed the cells', () => {
    const { map, calls } = makeMap()
    map._lastMouseEvent = mouse
    map.focusCell(mouse)
    map.cellUnderMouse = { x: 300, y: 400 }
    calls.length = 0
    map.redrawNow()
    assert.equal(calls.length, 1)
    assert.equal(map._focusedCell.x, 300)
})

test('no hover is processed while zooming, also after a redraw', () => {
    const { map, calls } = makeMap()
    map._lastMouseEvent = mouse
    map.geoCanvas._isZooming = true
    map.redrawNow()
    assert.equal(calls.length, 0)
})

test('the same cell hovered again costs no redraw of the rectangle', () => {
    const { map, calls } = makeMap()
    map._lastMouseEvent = mouse
    map.focusCell(mouse)
    map.focusCell(mouse)
    map.focusCell(mouse)
    assert.equal(calls.length, 1)
})

test('with a transparent background the rectangle is also drawn again by a redraw', () => {
    const { map, calls } = makeMap()
    map.transparentBackground = true
    map._lastMouseEvent = mouse
    map.focusCell(mouse)
    map.redrawNow()
    assert.equal(calls.length, 2)
})

test('after a pan or a zoom started (the hover is over), a redraw does not bring the rectangle, the tooltip or the cursor back', () => {
    const { map, calls } = makeMap()
    map._lastMouseEvent = mouse
    map.focusCell(mouse)
    assert.equal(map._hovering, true)
    map._hovering = false // what the start of a pan or a zoom does
    map.geoCanvas.canvas.style.cursor = 'grab'
    map.tooltip.shown = false
    calls.length = 0
    map.redrawNow()
    assert.equal(calls.length, 0)
    assert.equal(map.tooltip.shown, false)
    assert.equal(map.geoCanvas.canvas.style.cursor, 'grab')
})

test('the hover is over when the mouse is on no cell', () => {
    const { map } = makeMap()
    map._lastMouseEvent = mouse
    map.focusCell(mouse)
    assert.equal(map._hovering, true)
    map.cellUnderMouse = false
    map.focusCell(mouse)
    assert.equal(map._hovering, false)
})

// With the real getCellFocusInfo and a layer whose cellInfoHTML, like the hover code of an application, redraws the map
// (to show the cells around the hovered one): the hover must neither loop nor recurse.
const makeMapWithLayer = (opts, cellInfoHTML) => {
    const made = makeMap(opts)
    const { map, cell } = made
    delete map.getCellFocusInfo // the one of the class
    const dataset = {
        getCellFromPosition: () => (map.cellUnderMouse === false ? undefined : map.cellUnderMouse || cell),
        getViewCache: () => [],
        getResolution: () => 10,
    }
    map.layers = [{ draw() {}, cellInfoHTML: (c, r) => cellInfoHTML(map, c, r), getDataset: () => dataset }]
    let draws = 0
    const redrawNow = map.redrawNow
    map.redrawNow = function () {
        draws++
        return redrawNow.call(this)
    }
    return { ...made, draws: () => draws }
}

// requestAnimationFrame: the frames are run by hand
const withFrames = (f) => {
    const frames = []
    globalThis.requestAnimationFrame = (cb) => frames.push(cb)
    globalThis.cancelAnimationFrame = () => {}
    const runFrames = (n) => {
        for (let i = 0; i < n && frames.length; i++) frames.shift()()
        return frames.length
    }
    try {
        f(runFrames)
    } finally {
        delete globalThis.requestAnimationFrame
        delete globalThis.cancelAnimationFrame
    }
}

test('a cellInfoHTML which redraws the map (async) shows the rectangle and the map goes quiet: no endless redraws', () => {
    withFrames((runFrames) => {
        let infoCalls = 0
        const { map, calls, draws } = makeMapWithLayer({}, (m) => {
            infoCalls++
            m.redraw()
            return 'html'
        })
        map._lastMouseEvent = mouse
        map.focusCell(mouse)
        assert.equal(calls.length, 1)
        const pending = runFrames(50)
        assert.equal(pending, 0, 'no frame left waiting: the map is quiet')
        assert.equal(draws(), 1, 'one redraw, the one asked for')
        assert.equal(infoCalls, 1, 'cellInfoHTML is not called again by the redraw')
        assert.equal(calls.length, 2, 'the rectangle is drawn again after the redraw')
    })
})

test('a cellInfoHTML which redraws the map (sync) does not recurse for ever and the rectangle is drawn', () => {
    const { map, calls, draws } = makeMapWithLayer({ asyncRedraw: false }, (m) => {
        m.redraw()
        return 'html'
    })
    map._lastMouseEvent = mouse
    map.focusCell(mouse)
    map.focusCell({ offsetX: 106, offsetY: 206 }) // moves in the cell: the first redraw of cellInfoHTML is now with a hover
    assert.ok(draws() >= 1 && draws() <= 6, 'a few redraws, ' + draws())
    assert.ok(calls.length >= 1)
    assert.ok(map._hovering)
})

test('after a redraw, cellInfoHTML is called again only when the mouse is on another cell', () => {
    withFrames(() => {
        let infoCalls = 0
        const { map } = makeMapWithLayer({}, () => {
            infoCalls++
            return 'html'
        })
        map._lastMouseEvent = mouse
        map.focusCell(mouse)
        assert.equal(infoCalls, 1)
        map.redrawNow()
        assert.equal(infoCalls, 1, 'same cell: its info is in the tooltip already')
        map.cellUnderMouse = { x: 300, y: 400 }
        map.redrawNow()
        assert.equal(infoCalls, 2, 'another cell: its info is needed')
    })
})

test('the tooltip keeps the html of the cell through a redraw', () => {
    withFrames(() => {
        const { map } = makeMapWithLayer({}, () => 'html of the cell')
        const htmls = []
        map.tooltip.html = (h) => htmls.push(h)
        map._lastMouseEvent = mouse
        map.focusCell(mouse)
        map.redrawNow()
        assert.deepEqual(htmls, ['html of the cell'], 'not reset by the redraw')
        assert.equal(map.tooltip.shown, true)
    })
})

// ---------- the mouse position, after a scroll, a pan, or any redraw (the hover follows the mouse) ----------

// the page position of the pointer: the canvas is at (10, 20) in the page, the cell under (105, 205) of the canvas
const pointerAt = (x, y) => ({ clientX: 10 + x, clientY: 20 + y })

test('the position of the mouse is the one of the page, in the canvas: null outside the canvas, or under a panel', () => {
    const { map } = makeMap()
    assert.equal(map.pointerEvent(), null, 'unknown position')
    map._pointer = pointerAt(50, 60)
    assert.deepEqual(map.pointerEvent(), { offsetX: 50, offsetY: 60, clientX: 60, clientY: 80 })
    map._pointer = { clientX: 5, clientY: 80 }
    assert.equal(map.pointerEvent(), null, 'left of the canvas')
    map._pointer = { clientX: 60, clientY: 125 }
    assert.equal(map.pointerEvent(), null, 'under the canvas')
    map._pointer = pointerAt(50, 60)
    globalThis.__topElement = { panel: true }
    assert.equal(map.pointerEvent(), null, 'a panel over the map')
})

test('after a scroll or a pan, the redraw shows the hover of the cell the mouse is on, which was not hovered (the hover ended at the start of the pan)', () => {
    withFrames(() => {
        let infoCalls = 0
        const { map, calls } = makeMapWithLayer({}, () => {
            infoCalls++
            return 'html of the cell'
        })
        map._pointer = pointerAt(5, 5) // over the cell of the layer
        assert.equal(map._hovering, false)
        map.redrawNow() // what the end of a scroll does
        assert.equal(calls.length, 1, 'the rectangle')
        assert.equal(infoCalls, 1, 'the info of the cell, once')
        assert.equal(map._hovering, true)
        assert.equal(map.tooltip.shown, true)
        assert.equal(map.geoCanvas.canvas.style.cursor, 'pointer')
        map.redrawNow()
        map.redrawNow()
        assert.equal(calls.length, 3, 'the rectangle is back at each redraw')
        assert.equal(infoCalls, 1, 'and the info is not asked again')
    })
})

test('a cell with no info is asked once, not at every redraw, even when the info redraws the map', () => {
    withFrames((runFrames) => {
        let infoCalls = 0
        const { map, draws } = makeMapWithLayer({}, (m) => {
            infoCalls++
            m.redraw()
            return undefined // no info: the cell is not hovered
        })
        map._pointer = pointerAt(5, 5)
        map.redrawNow()
        assert.equal(runFrames(50), 0, 'the map goes quiet')
        assert.ok(infoCalls <= 2, 'info asked ' + infoCalls + ' times')
        assert.ok(draws() <= 3, 'redraws: ' + draws())
        assert.equal(map._hovering, false)
    })
})

test('the mouse over no cell, with nothing hovered: no rectangle, no tooltip, the cursor is left as it is', () => {
    const { map, calls } = makeMapWithLayer({}, () => 'html')
    map.cellUnderMouse = false
    map.geoCanvas.canvas.style.cursor = 'grab'
    map._pointer = pointerAt(5, 5)
    map.redrawNow()
    assert.equal(calls.length, 0)
    assert.equal(map.tooltip.shown, false)
    assert.equal(map.geoCanvas.canvas.style.cursor, 'grab')
})

test('the mouse over a panel, or out of the map: nothing is shown after a redraw', () => {
    const { map, calls } = makeMapWithLayer({}, () => 'html')
    map._pointer = pointerAt(5, 5)
    globalThis.__topElement = { panel: true }
    map.redrawNow()
    assert.equal(calls.length, 0, 'under a panel')
    globalThis.__topElement = map.geoCanvas.canvas
    map._pointer = { clientX: 500, clientY: 500 }
    map.redrawNow()
    assert.equal(calls.length, 0, 'out of the canvas')
})

test('nothing is shown while the map is zoomed, or panned (the picture is the one of the start of the gesture)', () => {
    const { map, calls } = makeMapWithLayer({}, () => 'html')
    map._pointer = pointerAt(5, 5)
    map.geoCanvas._isZooming = true
    map.redrawNow()
    assert.equal(calls.length, 0)
})

test('the hover is followed to the cell under the mouse after a redraw changed the cells', () => {
    withFrames(() => {
        let infoCalls = 0
        const { map, calls } = makeMapWithLayer({}, () => {
            infoCalls++
            return 'html'
        })
        map._pointer = pointerAt(5, 5)
        map.redrawNow()
        map.cellUnderMouse = { x: 300, y: 400 } // the scroll moved another cell under the mouse
        map.redrawNow()
        assert.equal(infoCalls, 2, 'the info of the new cell')
        assert.equal(map._hoverKey.startsWith('300,400'), true)
        assert.equal(calls.length, 2)
    })
})

test('after a zoom started (the hover ended), the cell under the mouse is asked again even if it was asked before', () => {
    withFrames(() => {
        let infoCalls = 0
        const { map, calls } = makeMapWithLayer({}, () => {
            infoCalls++
            return 'html'
        })
        map._pointer = pointerAt(5, 5)
        map.redrawNow() // the cell is hovered
        assert.equal(infoCalls, 1)
        // what the start of a pan or a zoom does (see onZoomStartFun)
        map._hovering = false
        map._hoverKey = null
        map._triedKey = null
        calls.length = 0
        map.redrawNow() // the end of the pan: the same cell is under the mouse
        assert.equal(calls.length, 1, 'its rectangle is shown again')
        assert.equal(infoCalls, 2)
    })
})

test('a mouse move asks again for the info of a cell which had none', () => {
    withFrames(() => {
        let infoCalls = 0
        const { map } = makeMapWithLayer({}, () => {
            infoCalls++
            return undefined
        })
        map._pointer = pointerAt(5, 5)
        map.redrawNow()
        map.redrawNow()
        assert.equal(infoCalls, 1, 'asked once for the redraws')
        map.focusCell(mouse) // the mouse moves
        assert.equal(infoCalls, 2, 'asked again')
    })
})

test('another dataset (or layer) at the same place is another cell: its info is asked, and the tooltip follows (a time slider)', () => {
    withFrames(() => {
        let infoCalls = 0
        const htmls = []
        const { map, calls } = makeMapWithLayer({}, (m, c) => {
            infoCalls++
            return 'year ' + infoCalls
        })
        map.tooltip.html = (h) => htmls.push(h)
        map._pointer = pointerAt(5, 5)
        map.redrawNow()
        map.redrawNow()
        assert.equal(infoCalls, 1)
        // the application shows the data of another year: the same cells, in another dataset
        const layer = map.layers[0]
        const before = layer.getDataset()
        const swapped = { ...before }
        layer.getDataset = () => swapped
        calls.length = 0
        map.redrawNow()
        assert.equal(infoCalls, 2, 'asked again')
        assert.deepEqual(htmls, ['year 1', 'year 2'], 'the tooltip has the new info')
        assert.equal(calls.length, 1, 'and the rectangle is there')
        map.redrawNow()
        assert.equal(infoCalls, 2, 'once')
    })
})

test('a cell with no info is asked again when the data is another one', () => {
    withFrames(() => {
        let infoCalls = 0
        const { map } = makeMapWithLayer({}, () => {
            infoCalls++
            return undefined
        })
        map._pointer = pointerAt(5, 5)
        map.redrawNow()
        map.redrawNow()
        assert.equal(infoCalls, 1)
        const layer = map.layers[0]
        const before = layer.getDataset()
        const swapped = { ...before }
        layer.getDataset = () => swapped
        map.redrawNow()
        assert.equal(infoCalls, 2)
    })
})

test('in a shadow root, what is under the pointer is asked of the root of the canvas', () => {
    const { map } = makeMap()
    map._pointer = pointerAt(50, 60)
    // the document gives the host of the shadow root: not the canvas
    globalThis.__topElement = { host: true }
    map.geoCanvas.canvas.getRootNode = () => ({ elementFromPoint: () => map.geoCanvas.canvas })
    assert.deepEqual(map.pointerEvent(), { offsetX: 50, offsetY: 60, clientX: 60, clientY: 80 })
    map.geoCanvas.canvas.getRootNode = () => ({ elementFromPoint: () => ({ panel: true }) })
    assert.equal(map.pointerEvent(), null)
})

test('hovering does nothing while it is suspended, and comes back after', () => {
    const { map, calls } = makeMap()
    let suspended = true
    map.hoverSuspended = () => suspended
    map.focusCell(mouse)
    map.refocusCell(mouse)
    assert.equal(calls.length, 0, 'no rectangle')
    assert.equal(map._hovering, false)
    assert.equal(map.tooltip.shown, false)

    suspended = false
    map.focusCell(mouse)
    assert.equal(calls.length, 1, 'the rectangle')
    assert.equal(map._hovering, true)
})

test('clearHover ends the hover and takes the rectangle off the map', () => {
    const { map, calls } = makeMap()
    let copies = 0
    map.transparentBackground = true
    map.geoCanvas.ctx.drawImage = () => copies++
    // (in a real map, made by the constructor)
    map.mouseOutHandler = () => {
        map._hovering = false
        map.tooltip.hide()
    }
    map.focusCell(mouse)
    assert.equal(calls.length, 1, 'the rectangle')
    assert.equal(map.tooltip.shown, true)
    const before = copies

    map.clearHover()
    assert.equal(map._hovering, false)
    assert.equal(map.tooltip.shown, false)
    assert.equal(map._focusedCell, undefined)
    assert.equal(copies, before + 1, 'the map without the rectangle is copied back')

    // nothing hovered: nothing to repaint
    map.clearHover()
    assert.equal(copies, before + 1)
})
