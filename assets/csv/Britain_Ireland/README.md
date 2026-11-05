# Bird abundance in Britain and Ireland

`bird_abundance_2km.csv` is used by the demo `examples/demos/birds.html`. It comes from:

> Modelled relative abundance of bird species in Britain and Ireland 2007-2011, version 1.4. British Trust for Ornithology. https://doi.org/10.5281/zenodo.19204490

These data originate from the Bird Atlas 2007–11 project, which was run by the BTO in partnership with BirdWatch Ireland and the Scottish Ornithologists' Club. The BTO thanks the thousands of volunteers who undertook and organised the fieldwork for the atlas.

**Licence: [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/). This licence is for these data only, not for gridviz: they can not be used for commercial purposes.**

## The columns

`x` and `y` are the lower left corner of a cell of 2 km, on the British National Grid (EPSG:27700), which the source extends to Ireland.

The other columns are the modelled number of birds per hour of observation, for a species and a season (`b`: breeding season, April to July, `w`: winter, November to February). An empty value is a value of zero, or a cell the source has no value for.

| Column         | Species              |
| -------------- | -------------------- |
| `RKb`, `RKw`   | Red Kite             |
| `BZb`, `BZw`   | Buzzard              |
| `KEb`, `KEw`   | Kestrel              |
| `RGb`, `RGw`   | Red Grouse           |
| `RLb`, `RLw`   | Red-legged Partridge |
| `RPb`, `RPw`   | Ring-necked Parakeet |
| `CCb`, `CCw`   | Carrion Crow         |
| `MGb`          | Magpie               |

These are relative abundances, not densities: they come from surveys of one hour, with no correction for the species' detectability. They come from a model of climate, elevation and land cover, so they should not be related to these. See the metadata of the source.

## What was changed from the source

-   The two files of the source (a row for a cell, a species and a season) are joined in one table, with the values rounded to 2 decimals. The columns of the species are renamed.
-   `x` and `y` are the corner of the cell, not its center.
-   The cells of Ireland are on the Irish Grid in the source, about 5° from the British one, so they do not line up with the cells of Britain. Each cell of the British grid over Ireland takes the values of the closest cell of the source, up to half of the diagonal of a cell away (1.4 km). Positions in Ireland are therefore approximate, by up to 1.4 km.
-   The winter values of the Magpie are left out: in version 1.4 of the source they are the same as the breeding values in all of the 75,579 cells.

`towns.csv` is not from the source: it gives the cell closest to some towns, from their longitude and latitude, to label the map.
