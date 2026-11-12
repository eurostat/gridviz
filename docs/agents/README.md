# Agent notes

Context for agents (and people) working on gridviz, split by area. Read only the files for the area you are touching.

| If you are... | Read |
| --- | --- |
| Preparing, building or publishing a version; editing the changelog or reference | [releases.md](releases.md) |
| Running or writing tests, or comparing pixels | [testing.md](testing.md) |
| Working on `src/core/GPUGridRenderer.js` | [gpu-renderer.md](gpu-renderer.md) |
| Working on `Map`, hover, tooltips or pointer/touch events | [map-and-hover.md](map-and-hover.md) |
| Working on datasets (`TiledGrid`, `CSVGrid`, tiles) or the ships demo data | [datasets.md](datasets.md) |
| Working on styles, legends or view scale functions | [styles-and-legends.md](styles-and-legends.md) |
| Working on `examples/` pages or the examples site | [examples.md](examples.md) |

## Adding to these files

- One area per file, entries of a line or two. If a topic fits no file, add a new file and a row above rather than growing an existing one.
- Add what a future agent could not quickly work out from the code or git history: a pitfall, a constraint, a non-obvious cause, a decision by the user. Leave out task progress.
- Check commands and claims against the repo, and correct or remove what is wrong.
