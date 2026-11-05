# Gridviz examples

The examples are plain HTML pages. They load the build of this repository (`dist/gridviz.js`), so they must be served over http, for example from the root of the repository:

```bash
python -m http.server 8080     # then open http://localhost:8080/examples/
```

| Page                                 | What it is                                                                                                                |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------- |
| `index.html`                         | The gallery: all the examples, by chapter, with a thumbnail. Open it online: https://eurostat.github.io/gridviz/examples/ |
| `view.html?example=styles/lego.html` | The viewer of an example: the example on the left, its source code on the right. The gallery opens the examples in it.    |
| `gallery.json`                       | The list of the examples of the gallery. See below.                                                                       |
| `scripts/make-gallery.mjs`           | Checks the examples and makes their thumbnails (`img/previews/`).                                                         |

## The chapters

-   **Getting started**: the first maps: a grid from a file or from JavaScript, tiled, at several resolutions.
-   **Data**: what to do with the cells: mixed resolutions, a computed value, missing values, a selection.
-   **Styles**: one subchapter for each style class of gridviz, with its examples. An example is in the subchapter of the style it shows (for example, an example of emoji is in "Text", since it uses `TextStyle`).
-   **Smoothing and interpolation**: the filters of the grid, which are not styles.
-   **Colours and scales**: the colours and how they are worked out: view scales, stretching, transparency, filters.
-   **Legends**: examples of the legends. The thumbnail shows the legend only. The example of the ternary legend is with the style it uses, in Styles.
-   **Background and other layers**: what goes with the grid: backgrounds, boundaries, GeoJSON, points, labels.
-   **Interaction and embedding**: the tooltip, the events, the buttons, the limits of the map, a map inside another map.
-   **Demos**: maps of whole countries, with a user interface.

## Adding an example

1. Write the page in the folder of its kind (`styles/`, `legends/`, `demos/`, and `basics/` for all the rest). The folders do not follow the chapters: the addresses of the examples are linked from outside, so they stay as they are. It should work on its own, and use `../../dist/gridviz.js`. A `<title>` is optional (many short examples have none): the gallery and the viewer use the title of `gallery.json`.
2. Add it to `gallery.json`, in the order it should be shown:

    ```json
    {
        "path": "styles/lego.html",
        "category": "Styles",
        "group": "Lego",
        "title": "Lego",
        "description": "Elevation as lego bricks."
    }
    ```

    - `category`: `Getting started`, `Data`, `Styles`, `Smoothing and interpolation`, `Colours and scales`, `Legends`, `Background and other layers`, `Interaction and embedding` or `Demos`. The chapters are shown in the order they first appear in the file, so keep the examples of a chapter together.
    - `group`: only for the `Styles`: the style the example shows, as in the reference (`Text`, `Shape/Color/Size`...). A style class of gridviz has one subchapter, so look for the class the example uses. Do not use a name for something which is not a style.
    - `title` and `description`: short, in the text of the card.

3. Check it and make its thumbnail:

    ```bash
    npm install --no-save playwright-core        # once
    node examples/scripts/make-gallery.mjs "styles/lego"
    ```

    The argument is a regular expression on the paths: without it, all the examples are checked. The script opens each example in a browser and reports the errors of the page, the requests which failed (a missing tile, 404, is normal) and the pages which look blank. It exits with an error if there is one, so it can be used in a check. Commit the new thumbnail with the example.

The viewer needs nothing: it opens any page of this folder, and takes its title from it.

## What is not in the gallery

The folder `test/` has pages to try things, which are not examples. `test/venn/` is the exception: its maps are listed, under the style they use. `leaflet-gridviz/` is not listed: it calls a service of `ec.europa.eu` which refuses requests from other websites (CORS), so it could not be checked.
