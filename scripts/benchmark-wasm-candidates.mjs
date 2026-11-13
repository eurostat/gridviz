// CPU baselines for the WebAssembly feasibility investigation.
// Run: node scripts/benchmark-wasm-candidates.mjs
// Synthetic Node workloads; these do not measure browser rendering or Wasm.
import { performance } from 'node:perf_hooks'
import { randomWalkInterpolate } from '../src/style/RandomWalkInterpolator.js'
import { SideStyle } from '../src/style/SideStyle.js'
import { viewScaleQuantile } from '../src/utils/scale.js'

function bench(name, fn) {
    for (let i = 0; i < 3; i++) fn()
    const times = []
    let result
    for (let i = 0; i < 9; i++) {
        const start = performance.now()
        result = fn()
        times.push(performance.now() - start)
    }
    times.sort((a, b) => a - b)
    console.log(JSON.stringify({
        name,
        medianMs: +times[4].toFixed(2),
        minMs: +times[0].toFixed(2),
        maxMs: +times[8].toFixed(2),
        outputLength: result.length,
    }))
}

console.log(JSON.stringify({ node: process.version, arch: process.arch, platform: process.platform }))
for (const factor of [3, 5, 8]) {
    const codes = Int32Array.from({ length: 10000 }, (_, i) => i % 7)
    bench(`randomWalk 100x100 factor=${factor}`, () =>
        randomWalkInterpolate(codes, 100, 100, factor, { seed: 42 }))
}
for (const count of [10000, 100000]) {
    const cells = Array.from({ length: count }, (_, i) => ({
        x: (i % 1000) * 1000,
        y: Math.floor(i / 1000) * 1000,
        v: Math.imul(i + 1, 2654435761) >>> 0,
    }))
    // buildSides sorts its input; include a copy to keep each invocation comparable.
    bench(`buildSides ${count} cells (copy included)`, () => SideStyle.buildSides(cells.slice(), 1000))
    const scale = viewScaleQuantile({ valueFunction: c => c.v })
    bench(`quantiles ${count} cells`, () => scale(cells, 1000, 10).breaks)
}
