let container_div = document.getElementById("viz-container");
EuroGridViz.createViewer({
  container: container_div,
  background_color: 0x000000,
  border_color: 0xffffff, //0x97dbf2
  color_scheme: "interpolateTurbo",
  legend: true,
  color_scheme_selector: true
});
