import gridGL from "./grid-gl/grid";
import createGraph from "ngraph.graph";

var canvas = document.createElement("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
/* canvas.style.borderStyle = "solid"; */
document.body.appendChild(canvas);

var graph = createGraph();

graph.beginUpdate();
for (var y = 0; y < 2500; y++) {
    graph.addLink(Math.random(), Math.random());
}
graph.endUpdate();

var vis = gridGL(graph, { canvas: canvas });
vis.render();
