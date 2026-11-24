# AGENTS.md

gridviz is a JavaScript library (ES modules, d3 modules, no framework) that draws gridded statistics on a canvas or with WebGL. Package `gridviz`, published to npm by the maintainers.

## Where to look

-   **Changing the library**: [docs/agents/README.md](docs/agents/README.md) has per-area notes (releases, testing, GPU renderer, map and hover, datasets, styles and legends, examples). Read only the file for the area you touch.
-   **Using the library** to build a map: [skills/gridviz/SKILL.md](skills/gridviz/SKILL.md), then [docs/reference.md](docs/reference.md) and [examples/](examples).

## Layout

-   `src/`: the library. `core/` (Map, GeoCanvas, GPUGridRenderer, Style, Tooltip), `dataset/`, `layer/`, `style/`, `legend/`, `button/`, `utils/`. Entry point `src/index.js`, which is also the package's default export.
-   `dist/`: built bundles, **committed**. Do not edit by hand.
-   `examples/`: the gallery and demos; most pages load `dist/gridviz.js`.
-   `test/`: unit tests (`*.test.js`, Node's built-in runner) and `test/browser/` (Playwright with Chrome).
-   `docs/`: `reference.md`, `changelog.md`, tutorials, and `docs/agents/`.

## Commands

-   `npm test`: unit tests (about 12 s). One file: `node --test test/<name>.test.js`.
-   `npm run test:browser`, `test:gpu`, `test:compat`: browser tests that need Chrome (details in [docs/agents/testing.md](docs/agents/testing.md)).
-   `npm run build`: rebuilds `dist/` (production and development bundles).
-   `npm run build-worker`: regenerates `src/dataset/csvTileWorker.generated.js` after editing `csvTileWorker.js` or `csvTable.js`. Never edit the generated file.
-   Do **not** run `npm run start` (a watcher that never exits) or `npm run format` (rewrites the whole repo, `dist` included). Format changed files with `npx prettier --write <files>`.

## Conventions

-   Prettier: 4 spaces, no semicolons, single quotes, 120 columns, ES5 trailing commas.
-   Backwards compatibility: new behaviour is opt-in and defaults stay unchanged. Do not remove public API without the user's agreement.
-   A user-visible change updates `docs/changelog.md` and `docs/reference.md` in the same change, and adds or updates a test.
-   Publishing (`npm publish`) is the maintainer's manual step. Do not publish.
-   Never credit an AI as author or co-author in commits, PRs, releases, code comments or docs.
-   Other sessions may leave uncommitted work: read `git status` before staging, and stage files by name.
