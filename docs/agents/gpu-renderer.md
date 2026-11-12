# GPUGridRenderer

- Opt-in, and knows nothing of Leaflet. The atlas's adapter is `viewer/src/app/layer/grid/LeafletGridRenderer.js` in `../statistical-atlas`.
- It builds tiles in slices across frames, and a build or a batch only carries on while the tile is the same object. A tile made afresh on each draw is built from nothing every frame and never shown (3.4.0, one-file `CSVGrid`: `_wholeTile` keeps it).
- Write a new option so that undefined means the default: the unit tests make renderers without the constructor (see [testing.md](testing.md)).
- Pixel comparisons against the map's own drawing need several canvas reads first (`test/browser/gpu.mjs`).
