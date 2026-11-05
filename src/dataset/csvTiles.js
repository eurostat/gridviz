//@ts-check
'use strict'

import { csv } from 'd3-fetch'
import { valuesOfColumn } from './csvTable.js'
import { csvTileWorkerSource } from './csvTileWorker.generated.js'

// The CSV tiles of a TiledGrid with the worker option. Parsing a tile takes the main thread tens of milliseconds on a laptop, during which a map being panned stands still. So
// tiles are fetched and parsed in workers, and the cells are made from the columns a little at a time. The cells come out exactly as from d3's csv: objects of strings. The worker
// runs from a Blob, its code in a string: that works under any bundler, and needs no file to be served. Where it cannot run (no Worker, a security policy without blob:), tiles
// are read on the main thread.

const WORKERS = 2
const SLICE_MS = 4
const CELLS_BETWEEN_CHECKS = 256

/** @type {Array.<Worker>} */
const pool = []
let nextWorker = 0
let nextRequest = 1
let workersFailed = typeof Worker === 'undefined' || typeof Blob === 'undefined' || typeof URL === 'undefined' || !URL.createObjectURL
/** @type {Map<number, {url:string, signal:AbortSignal|undefined, resolve:function, reject:function, done:function}>} */
const requests = new Map()

const abortError = () => {
    const error = new Error('The tile request was aborted.')
    error.name = 'AbortError'
    return error
}

function onWorkerFailure() {
    workersFailed = true
    for (const worker of pool) worker.terminate()
    pool.length = 0
    // what was asked of them is read here instead
    const waiting = [...requests.values()]
    requests.clear()
    for (const { url, signal, resolve, reject, done } of waiting) {
        done()
        csv(url, { signal }).then(resolve, reject)
    }
}

function worker() {
    if (!pool.length) {
        const blob = new Blob([csvTileWorkerSource], { type: 'text/javascript' })
        const url = URL.createObjectURL(blob)
        for (let i = 0; i < WORKERS; i++) {
            const w = new Worker(url)
            w.onerror = onWorkerFailure
            w.onmessage = (event) => {
                const msg = event.data
                const request = requests.get(msg.id)
                if (!request) return
                requests.delete(msg.id)
                request.done()
                if (msg.aborted) request.reject(abortError())
                else if (msg.error) request.reject(new Error(msg.error))
                else if (msg.onMainThread) csv(request.url, { signal: request.signal }).then(request.resolve, request.reject)
                else cellsOfTable(msg.table).then(request.resolve, request.reject)
            }
            pool.push(w)
        }
    }
    nextWorker = (nextWorker + 1) % pool.length
    return pool[nextWorker]
}

/**
 * The cells of a CSV file, as d3's csv gives them.
 * @param {string} url
 * @param {AbortSignal} [signal]
 * @returns {Promise<Array.<any>>} Rejected with an error whose message starts with the status of the answer if there was one, and named AbortError when aborted.
 */
export function fetchCSVCells(url, signal) {
    if (workersFailed) return csv(url, { signal })
    if (signal && signal.aborted) return Promise.reject(abortError())
    // a worker has its own base address: nothing relative
    const absolute = new URL(url, document.baseURI).href
    return new Promise((resolve, reject) => {
        const id = nextRequest++
        let target
        const onAbort = () => {
            requests.delete(id)
            if (target) target.postMessage({ id, abort: true })
            signal.removeEventListener('abort', onAbort)
            reject(abortError())
        }
        const done = () => signal && signal.removeEventListener('abort', onAbort)
        requests.set(id, { url: absolute, signal, resolve, reject, done })
        if (signal) signal.addEventListener('abort', onAbort)
        try {
            target = worker()
            target.postMessage({ id, url: absolute })
        } catch (error) {
            onWorkerFailure()
        }
    })
}

/** @type {Array.<any>} */
const queue = []
let pumping = false

function nextSlice() {
    if (typeof requestAnimationFrame === 'undefined') return setTimeout(pump, 0)
    // on the next frame, or after a moment where there are no frames (a browser stops them in a window that is hidden): the tiles still come in
    let done = false
    const go = () => {
        if (done) return
        done = true
        pump()
    }
    requestAnimationFrame(go)
    setTimeout(go, 100)
}

function pump() {
    const clock = typeof performance !== 'undefined' ? performance : Date
    const deadline = clock.now() + SLICE_MS
    while (queue.length && clock.now() < deadline) {
        const job = queue[0]
        if (!job.values) {
            // a column at a time, each a look at the clock
            job.parts.push(valuesOfColumn(job.table, job.parts.length))
            if (job.parts.length === job.table.names.length) job.values = job.parts
            continue
        }
        const { names, length } = job.table
        const stop = Math.min(length, job.i + CELLS_BETWEEN_CHECKS)
        for (; job.i < stop; job.i++) {
            /** @type {any} */
            const cell = {}
            for (let k = 0; k < names.length; k++) cell[names[k]] = job.values[k][job.i]
            job.cells[job.i] = cell
        }
        if (job.i >= length) {
            queue.shift()
            job.cells.columns = job.table.header
            job.resolve(job.cells)
        }
    }
    if (queue.length) nextSlice()
    else pumping = false
}

/**
 * The cells of a table, as objects, made a little on each frame.
 * @param {import('./csvTable.js').CSVTable} table
 * @returns {Promise<Array.<any>>}
 */
export function cellsOfTable(table) {
    if (!table.length) {
        const none = []
        // @ts-ignore
        none.columns = table.header
        return Promise.resolve(none)
    }
    return new Promise((resolve) => {
        queue.push({ table, resolve, parts: [], values: null, i: 0, cells: new Array(table.length) })
        if (!pumping) {
            pumping = true
            nextSlice()
        }
    })
}
