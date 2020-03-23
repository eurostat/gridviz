let container_div = document.getElementById("viz-container");
GridViz.createViewer({
  container: container_div,
  // data: [{
  //   url: "https://raw.githubusercontent.com/eurostat/GridViz/development/assets/csv/3035/pop_2011_3035_5km.csv",
  //   cellSize: 10800,
  //   tiled: false,
  // }],
  // data: [{
  //   url: "../../assets/csv/3035/France_2015_1km_over80.csv",
  //   cellSize: 2000,
  //   tiled: false
  // }],
  colorColumn: "value", // csv column which you wish to visualize
  //sizeColumn: "value", // csv column which you wish to visualize
  EPSG: 3035,
  center: [4369000, 2834000],
  height: window.innerHeight,
  width: window.innerWidth,
  backgroundColor: "#000",
  borderColor: "#ffffff",
  colorScheme: "interpolateTurbo",
  colorSchemeSelector: true,
  legend: true,
  legendOrientation: "vertical",
  legendTitle: "Legend"
});
