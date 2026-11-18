# WebAssembly feasibility for Gridviz

Investigated 2026-11-13 against the local 3.5.0 source.

WebAssembly could improve selected CPU computations. The best first experiment is
`randomWalkInterpolate`; a wholesale rewrite of rendering is unlikely to justify
its cost. This is a source review plus JavaScript CPU baselines, not a measured
Wasm speedup or a browser performance profile.

## Existing architecture

- `src/core/GPUGridRenderer.js` already caches tile geometry and colors on the GPU,
  draws instanced shapes using WebGL2, and limits tile-building work per frame.
  It is opt-in. Movement largely reuses buffers and updates view uniforms.
- `src/dataset/csvTiles.js` and `csvTileWorker.js` already offer opt-in CSV fetching
  and parsing in two workers. The worker uses d3-dsv and sends columns as packed
  strings. The main thread splits columns and constructs cell objects in slices.
  This improves responsiveness without changing the object/string data contract.
- Style values, filters, sizes, colors and view scales commonly come from arbitrary
  JavaScript callbacks. Moving their caller to Wasm does not move their computation.
- `TiledGrid.updateViewCache` restricts work to intersecting tiles, then tests their
  cells against the viewport. Dataset lookup code also already contains indexing;
  this is not a library without spatial acceleration.

## Candidates

| Area | Assessment | Reason and prerequisite |
| --- | --- | --- |
| Random-walk interpolation | Best first experiment | Exported pure kernel already consumes and produces flat Int32 arrays. Many integer operations per output cell; one batch call can avoid callbacks in the inner loop. |
| Terrain shadows (`ShadingRayStyle.referenceShadow`) | Strong computational candidate | Each elevation cell casts a ray until a blocker or boundary. Flatten the elevation matrix, preserve missing-value and rounding behavior, and return a mask. Algorithmic improvements may beat a direct port. |
| Bilinear interpolation (`Interpolator`) | Plausible, lower priority | Regular numeric work suits flat buffers and potentially SIMD, but expanded output objects and drawing remain costs. A factor f produces approximately f² as many values. |
| Side construction (`SideStyle.buildSides`) | Conditional | Currently sorts cell objects twice and allocates side objects. Compare cached adjacency or grid-index lookup in JavaScript first; a Wasm sort does not eliminate reconstruction costs. |
| Quantile view scales (`utils/scale.js`) | Conditional | Mapping values and sorting for D3 quantiles can become expensive. Extract numeric columns once; compare caching or exact selection algorithms before introducing Wasm. Preserve D3 coercion and missing-value semantics. |
| CSV parsing | Conditional, larger integration | A byte-oriented parser could help large files, especially if numeric columns remain numeric buffers. Converting every field back to JavaScript strings and objects can consume the gain. Existing workers already address parsing stalls. |
| GPU buffer preparation (`GPUGridRenderer._build`) | Limited with current API | Typed buffers are already used, but filters and the style reader call JavaScript. A useful Wasm path would need declarative field/class/ramp definitions or precomputed numeric attributes. |
| Canvas shapes, labels, tooltips, GPU rasterization, network | Poor direct targets | Wasm does not make browser drawing APIs, GPU execution or network delivery inherently faster. CPU preparation can still be optimized independently. |

Kernel smoothing is supplied by the separate `gridviz-smoothing` extension,
according to `docs/reference.md`. Its implementation was not inspected here, so
there is no repository-specific speedup claim for it. GeoTIFF and COGeo dataset
classes are placeholders here, not existing decoder bottlenecks.

## Measured CPU baselines

Run `node scripts/benchmark-wasm-candidates.mjs` with dependencies installed.
Local Windows x64, Node v26.13.1: three warmups, nine measured calls, medians below.
Random-walk input is a dense 100×100 grid with seven categories and seed 42;
the default maximum walk length is 6f². Side inputs are ordered rectangular grids;
quantile inputs use deterministic unsigned integer values.

| Workload | Median |
| --- | ---: |
| Random walk, factor 3, 90,000 output cells | 6.04 ms |
| Random walk, factor 5, 250,000 output cells | 53.08 ms |
| Random walk, factor 8, 640,000 output cells | 357.70 ms |
| Build sides, 10,000 cells, input copy included | 1.52 ms |
| Build sides, 100,000 cells, input copy included | 15.60 ms |
| Quantiles, 10,000 cells | 1.03 ms |
| Quantiles, 100,000 cells | 12.76 ms |

These timings identify expensive computations, not their share of a real map's
latency. They exclude matrix preparation, interpolated object creation, browser
drawing, network, worker communication and Wasm startup. Input ordering, density,
missing categories, device and engine can materially change results. No Wasm
compiler was found on PATH; no Wasm implementation was compiled or timed.

## Recommended experiment

1. Port only `randomWalkInterpolate` to a small optional C/C++ or Rust Wasm module.
   Keep its JS implementation as a fallback. Start scalar: the branchy walks are
   less straightforward SIMD targets than bilinear interpolation.
2. Allocate/reuse input and output regions in Wasm linear memory. Copy a whole
   input buffer, call once per grid or chunk, then consume/copy the output before
   reusing that memory. Account for copies and memory growth invalidating views.
3. Compare the same kernel in JS and Wasm on the main thread and in a worker.
   Worker offload addresses UI stalls independently of Wasm; synchronous Wasm
   still blocks its calling thread. Cache by input revision, factor, seed and
   offsets where repeated views permit it.
4. Check exact output equality for seeds, global offsets, boundaries, missing
   categories, factors and maxSteps. Preserve 32-bit overflow, unsigned shifts
   and multiplication in the hash. For a future shadow port, explicitly match
   JavaScript rounding at negative half values and the existing zero/no-data rules.
5. Measure cold startup and warm computation, conversion/copy time, memory use,
   full redraw latency and dropped frames in the real interpolation examples.
   Use Chrome, Firefox and Safari, including a slower/mobile device. Compare
   against optimized JS and JS in a worker, with equivalent caching.

A reasonable proposed adoption gate is at least 2× warm kernel throughput and a
material end-to-end improvement on representative maps, without unacceptable
cold-start or memory cost. This is a decision criterion, not a predicted result.
For example, if a kernel takes 20% of redraw time, doubling it only speeds the
whole redraw up by about 11%.

Keep the module lazy-loaded and optional. `package.json` currently publishes only
`dist/**/*.js` and `src/**/*.js`; shipping a separate `.wasm` file requires package
and build changes, bundler/CDN URL handling and suitable CSP. Single-threaded Wasm
in a worker does not require shared memory. Wasm pthreads introduce SharedArrayBuffer
and COOP/COEP deployment requirements, so they should not be the initial design.

## Platform references

- [MDN: WebAssembly concepts](https://developer.mozilla.org/en-US/docs/WebAssembly/Guides/Concepts): Wasm complements JavaScript; browser API access needs integration code.
- [WebAssembly JavaScript API](https://webassembly.org/getting-started/js-api/): linear memory is exposed through an ArrayBuffer.
- [Emscripten SIMD](https://emscripten.org/docs/porting/simd.html): compiler options and supported vector operations.
- [Emscripten pthreads](https://emscripten.org/docs/porting/pthreads.html): shared-memory deployment requirements.
