let container_div = document.getElementById("viz-container");
EuroGridViz.createViewer({
  container: container_div,
  // height: window.innerHeight,
  // width: window.innerWidth,
  background_color: "#b7b7b7",
  border_color: "#ffffff",
  color_scheme: "interpolateTurbo",
  color_scheme_selector: true,
  legend: true,
  legend_orientation: "vertical"
});
