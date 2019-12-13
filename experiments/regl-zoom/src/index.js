import networkGL from "./network-gl";
import createGraph from "ngraph.graph";

var canvas = document.createElement("canvas");
canvas.width = 400;
canvas.height = 400;
canvas.style.borderStyle = "solid";
document.body.appendChild(canvas);

var graph = createGraph();

graph.beginUpdate();
graph.addLink(0, 1);
graph.addLink(1, 2);
graph.addLink(2, 0);
graph.addLink(3, 1);
graph.addLink(4, 1);
graph.addLink(4, 2);
graph.addLink(5, 4);
graph.endUpdate();

var vis = networkGL(graph, { canvas: canvas });
vis.render();
