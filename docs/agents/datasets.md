# Datasets

- `TiledGrid.maxCachedCells` does not cover `cellsViewCache`: each dataset keeps its last view, so a page with one dataset per year must drop the unused ones (`ships.html`).
- A tile column named `x` or `y` overwrites the cell position.
- `examples/demos/ships.html` loads its tiles from `joewdavies/tiled-grids` (`vessels/`, with its readme and `build.mjs`), not from this repo. Its map stays empty if they are not pushed there.
- Tile format: [docs/tiledformat.md](../tiledformat.md).
