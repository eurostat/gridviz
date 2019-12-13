const drawCircles = regl => {
  return {
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

      vec2 normalizeCoords(vec2 position) {
        float x = (position[0] + (stageWidth  / 2.0));
        float y = (position[1] + (stageHeight / 2.0));

        return vec2(
            2.0 * ((x / stageWidth ) - 0.5),
            2.0 * ((y / stageHeight) - 0.5)
        );
      }

      void main () {
        gl_PointSize = 10.0;
        vec3 final = transform * vec3(normalizeCoords(position), 1);
        gl_Position = vec4(final.xy, 0, 1);
      }`,

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

    count: function(context, props) {
      // set the count based on the number of points we have
      return props.points.length;
    },

    primitive: "points"
  };
};

const cmds = {
  circle: drawCircles
};

export default cmds;
