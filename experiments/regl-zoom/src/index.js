import gridGL from "./grid-gl/grid";
/* import createGraph from "ngraph.graph"; */
import { color } from "d3";

var canvas = document.createElement("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
/* canvas.style.borderStyle = "solid"; */
document.body.appendChild(canvas);

/* var graph = createGraph(); */
/* graph.beginUpdate(); */

// create point data
var cells = [];
var colors = [];
for (var i = 0; i < 250000; i++) {
    var x = (Math.random() * 1) + 0; // this will get a number between 1 and 99;
    x *= (Math.random() * 2) == 1 ? 1 : -1; // this will add minus sign in 50% of cases
    var y = (Math.random() * 1) + -1; // this will get a number between 1 and 99;
    y *= (Math.random() * 2) == 1 ? 1 : -1; // this will add minus sign in 50% of cases

    cells.push([
        x, //webgl x
        y //webgl y
    ]);
    colors.push(valueToColor(x));
    //graph.addLink(Math.random(), Math.random()); 
}

var vis = gridGL(canvas, cells, {
    colors: colors,
    pointWidth: 2
});
/* var vis = gridGL(graph, { canvas: canvas }); */
vis.render();

function valueToColor(value) {
    let rgb;
    if (value > 0.7) {
        rgb = color("#ff0f00"); //red
    } else if (value > 0.5) {
        rgb = color("#ffce08"); //orange
    } else if (value > 0.2) {
        rgb = color("#ebff0a"); //yellow
    } else if (value > 0) {
        rgb = color("#55e238"); //green
    } else if (value > -1) {
        rgb = color("#005cff"); //blue
    } else {
        rgb = color("#000000");
    }
    return [rgb.r, rgb.g, rgb.b, 1]
};

