import forceLayout from "ngraph.forcelayout";
import physics from "ngraph.physics.simulator";
import createRegl from "regl";
import { mat3, vec2 } from "gl-matrix";
import commands from "./commands";
import { zoom as d3Zoom } from "d3-zoom";
import { select, event as d3event } from "d3-selection";

const d3Event = () => require("d3-selection").event;
var zoom = d3Zoom();

const initializeCommands = (regl, commands) => {
  var initialized = {};
  Object.keys(commands).forEach(command => {
    initialized[command] = regl(commands[command](regl));
  });
  return initialized;
};

const gridGL = (graph, options) => {
  var nodes = {};
  var layout = forceLayout(graph, {});

  graph.forEachNode(node => {
    var data = {
      size: 4
    };
    data.pos = layout.getNodePosition(node.id);
    nodes[node.id] = data;
  });

  select(options.canvas).call(
    zoom.on("zoom", () => {
      var t = d3Event().transform;
      updateTransform(t.x, t.y, t.k);
    })
  );

  var regl = createRegl(options.canvas);
  var cmds = initializeCommands(regl, commands);
  var loop = null;

  var transform = mat3.create();
  function updateTransform(x, y, scale) {
    mat3.projection(transform, options.canvas.width, options.canvas.height);
    mat3.translate(transform, transform, [x, y]);
    mat3.scale(transform, transform, [scale, scale]);
    mat3.translate(transform, transform, [
      options.canvas.width / 2,
      options.canvas.height / 2
    ]);
    mat3.scale(transform, transform, [
      options.canvas.width / 2,
      options.canvas.height / 2
    ]);
    mat3.scale(transform, transform, [1, -1]);
  }

  var api = {
    render: render,
    stop: stop
  };

  return api;

  function render() {
    loop = regl.frame(context => {
      layout.step();
      var points = Object.keys(nodes).map((a, i) => [
        nodes[a].pos.x,
        nodes[a].pos.y
      ]);
      cmds["point"]([
        {
          points: points,
          color: [0, 0, 0, 1.0],
          transform: transform
        }
      ]);
    });
  }

  function stop() {
    loop.cancel();
  }
};

export default gridGL;
