# Examples

- `examples/` must be served over http: run `python -m http.server 8080` from the repo root and open `/examples/`.
- Most examples load `dist/gridviz.js`, so the site shows whatever was last built there (see [releases.md](releases.md)).
- `examples/view.html` keeps the code panel's on/off state in `localStorage`, so a script reusing a browser context and clicking `#toggle` once per page gets the opposite state on every other page.
- `ships.html` views are entries in its `viewSections` table (styles, detail, key, tooltip). Its data lives elsewhere: see [datasets.md](datasets.md).
