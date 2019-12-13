/* import forceLayout from "ngraph.forcelayout";
import physics from "ngraph.physics.simulator"; */
import createRegl from "regl";
import { mat3, vec2 } from "gl-matrix";

import { zoom as d3Zoom } from "d3-zoom";
import { select, event as d3event } from "d3-selection";

const d3Event = () => require("d3-selection").event;
var zoom = d3Zoom();

const initializeCommands = (regl, commands, cells) => {
  var initialized = {};
  Object.keys(commands).forEach(command => {
    initialized[command] = regl(commands[command](regl, cells));
  });
  return initialized;
};

const gridGL = (canvas, cells, options) => {
  var commands = require("./commands");
  /*  var nodes = {}; */
  /*   var layout = forceLayout(graph, {}); */

  /*   graph.forEachNode(node => {
      var data = {
        size: 4
      };
      data.pos = layout.getNodePosition(node.id);
      nodes[node.id] = data;
    }); */

  select(canvas).call(
    zoom.on("zoom", () => {
      var t = d3Event().transform;
      updateTransform(t.x, t.y, t.k);
    })
  );

  var regl = createRegl(canvas);
  var cmds = initializeCommands(regl, commands.default, cells);
  var loop = null;

  //webgl transform used in "vert" regl function
  var transform = mat3.create();
  function updateTransform(x, y, scale) {
    mat3.projection(transform, canvas.width, canvas.height);
    mat3.translate(transform, transform, [x, y]);
    mat3.scale(transform, transform, [scale, scale]);
    mat3.translate(transform, transform, [
      canvas.width / 2,
      canvas.height / 2
    ]);
    mat3.scale(transform, transform, [
      canvas.width / 2,
      canvas.height / 2
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

      regl.clear({
        // background color (black)
        color: [0, 0, 0, 1],
        depth: 1,
      });

      /* layout.step(); */
      //draw points rebgl function
      // note that the arguments are available via `regl.prop`.
      cmds["point"]({
        colors: options.colors,
        transform: transform,
        pointWidth: options.pointWidth
      }
      );
    });
  }

  function stop() {
    loop.cancel();
  }
};

export default gridGL;
