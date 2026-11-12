# Testing

| Command | What it does | Needs |
| --- | --- | --- |
| `npm test` | Unit tests, about 12 s. One file: `node --test test/<name>.test.js` | |
| `npm run test:browser` | Hover on 5 examples, and the view limits on `basics/limits.html`. `--all`: also loads every gallery example. `--lib=<file>`: a built bundle | Chrome, network |
| `npm run test:compat` | Every gallery example, old bundle against new, at rest: it does not move the maps. `--only=<text>`: matching paths. `--old=<file>` (default the latest on npm), `--new=<file>` | Chrome, network |
| `npm run test:gpu` | `GPUGridRenderer` against the map's own drawing. `--lib=<file>`: a built bundle | Chrome |

- The browser tests build their own bundle from `src/`, so no `npm run build` is needed first. Set `CHROME_PATH` if Chrome is not found.
- Browser and integration checks use real data: drive the gallery examples in `examples/` with their real datasets, and compare against a baseline without the change. Fake canvases are only for unit tests of pure logic.
- `test:compat` reports `demos/ships.html` as `DIFF` until 3.5.0 is the published baseline: the page needs the new options and fails on an older bundle.
- `test:compat` noise: `dotdensity_random`, `joyplot_random` and `mosaic_full` differ from run to run even with one bundle (34-45% of pixels), so only their errors mean anything. It can still report a false `DIFF` for them, with `noise 0.00%`, when two old runs happen to match (seen on `mosaic_full`). Rerun to confirm.
- Chrome changes how a 2D canvas is drawn after several reads, which changes circle edges. A pixel comparison has to read the canvas several times first (see `test/browser/gpu.mjs`).
- `test/GPUGridRenderer.test.js` makes renderers without the constructor, so a field set there is undefined in those tests: write a new option so that undefined means the default.
- `test:browser` also checks the touch/pointer behaviour on a phone; see [map-and-hover.md](map-and-hover.md).
