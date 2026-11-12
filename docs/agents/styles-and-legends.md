# Styles, legends and view scales

- A view scale function can return one shared object that each call overwrites (`viewScaleQuantile`, `viewScaleCombination`). Never call one for another resolution without working the original out again afterwards.
- `multiply` on a dark map background gives black: cells then only show over a light layer such as bathymetry. Use `screen` or `lighter` there. Give `VennLegend` a matching `blendMode`.
- `DotDensityStyle` draws `dotNumber + 1` dots unless `exactDotNumber` is set: kept as the default so that existing maps do not change.
