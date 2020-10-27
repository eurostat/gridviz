# gridviz
![npm bundle size](https://img.shields.io/bundlephobia/minzip/gridviz)
![npm](https://img.shields.io/npm/v/gridviz)

A JavaScript Library built for visualizing gridded statistics from CSV files. 

<div>
  <img src="assets/images/previews/preview6.png" alt="preview" width="100%"/>
<img src="assets/images/previews/preview5.png" alt="preview" width="49.7%" height="210px"/>
<img src="assets/images/previews/preview2.png" alt="preview" width="49.7%" height="210px"/>
<img src="assets/images/previews/preview3.png" alt="preview" width="49.7%" height="210px"/>
<img src="assets/images/previews/preview4.png" alt="preview" width="49.7%" height="210px"/>

</div>

## Examples

[Europe - 5km² Population Grid](https://eurostat.github.io/gridviz/examples/europe/5km/index.html) | [Data Source](https://ec.europa.eu/eurostat/web/gisco) 

[Europe - 2km² Population Grid](https://eurostat.github.io/gridviz/examples/europe/2km/index.html) | [Data Source](https://ec.europa.eu/eurostat/web/gisco)  

[Europe - 1km² Population Grid](https://eurostat.github.io/gridviz/examples/europe/1km/index.html) | [Data Source](https://ec.europa.eu/eurostat/web/gisco)  

[Netherlands - Inhabitants per 100m²](https://eurostat.github.io/gridviz/examples/netherlands/index.html) | [Data Source](https://www.cbs.nl/nl-nl/dossier/nederland-regionaal/geografische-data/kaart-van-100-meter-bij-100-meter-met-statistieken)  

[France - 1km² Population Grid](https://eurostat.github.io/gridviz/examples/france/index.html) | [Data Source](https://insee.fr/fr/statistiques/4176290?sommaire=4176305)  

[France - Inhabitants over 80 years of age per 1km²](https://eurostat.github.io/gridviz/examples/france/population-over-80.html) | [Data Source](https://insee.fr/fr/statistiques/4176290?sommaire=4176305)   

## Description

gridviz is a JavaScript library which allows you to visualize large gridded datasets. Unlike traditional raster-based approaches, this tool utilizes WebGL through Three.js in order to render eveything client-side.

From a CSV file with x and y columns, gridviz will build a Three.js viewer capable of visualizing millions of grid cells on the fly.

For colouring, you can use any of D3's scale chromatic colour schemes, or define them yourself by passing an array to the colors method along with the threshold values they correspond with.

## Installation & Usage

Coming soon...
