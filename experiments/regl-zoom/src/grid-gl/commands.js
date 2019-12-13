//webGL logic
const drawPoints = regl => {
  return {
    // Shaders in regl are just strings.  You can use glslify or whatever you want
    // to define them.  No need to manually create shader objects.
    frag: `
      precision mediump float;
      uniform vec4 color;
      void main () {
        float r = 0.0, delta = 0.0, alpha = 1.0;
        vec2 cxy = 2.0 * gl_PointCoord - 1.0;
        r = dot(cxy, cxy);
        if (r > 1.0) {
            discard;
        }
        gl_FragColor = color * alpha;
      }`,

    vert: `
      precision highp float;
      attribute vec2 position;

      uniform mat3 transform;
      uniform float scale;
      uniform vec2 mouse;
      uniform int size;

      uniform float pixelRatio;
      uniform float stageWidth;
      uniform float stageHeight;



      void main () {
        gl_PointSize = 10.0;
        vec3 final = transform * vec3(normalizeCoords(position), 1);
        gl_Position = vec4(final.xy, 0, 1);
      }`,
    // Here we define the vertex attributes for the above shader
    attributes: {
      // There will be a position value for each point
      // we pass in
      position: regl.prop("points")
    },

    uniforms: {
      color: regl.prop("color"),
      transform: regl.prop("transform"),
      stageWidth: regl.context("drawingBufferWidth"),
      stageHeight: regl.context("drawingBufferHeight")
    },

    count: function (context, props) {
      // set the count based on the number of points we have
      return props.points.length;
    },

    primitive: "points"
  };
};

const cmds = {
  point: drawPoints
};

export default cmds;
