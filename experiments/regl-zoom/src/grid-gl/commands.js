//webGL logic
const drawCells = (regl, cells) => {
  return {
    // Shaders in regl are just strings.  You can use glslify or whatever you want
    // to define them.  No need to manually create shader objects.
    frag: `
    // set the precision of floating point numbers
  precision highp float;

  // this value is populated by the vertex shader
    varying vec3 fragColor;

    void main() {
        // gl_FragColor is a special variable that holds the color of a pixel
        gl_FragColor = vec4(fragColor, 1);
    }
    `,

    vert: `
    // per vertex attributes
    attribute vec2 position;
    attribute vec3 color;

    // variables to send to the fragment shader
    varying vec3 fragColor;

    // values that are the same for all vertices
    uniform float pointWidth;

    // mat3 transformation defined in grid.js
    uniform mat3 transform;

    // helper function to transform from pixel space to normalized device coordinates (NDC)
    // in NDC (0,0) is the middle, (-1, 1) is the top left and (1, -1) is the bottom right.
    vec2 normalizeCoords(vec2 position) {
    // read in the positions into x and y vars
    float x = position[0];
    float y = position[1];

    return vec2(x,y);
    }

    void main() {
        // update the size of a point based on the prop pointWidth
        gl_PointSize = pointWidth;

  // send color to the fragment shader
  fragColor = color;

        // scale to normalized device coordinates
        // gl_Position is a special variable that holds the position of a vertex
        vec3 final = transform * vec3(normalizeCoords(position), 1);
  gl_Position = vec4(final.xy, 0.0, 1.0);
    }
    `,
    attributes: {
      // each of these gets mapped to a single entry for each of the cells.
      // this means the vertex shader will receive just the relevant value for a given point.
      position: cells,
      color: regl.prop('colors'),
    },

    uniforms: {
      // by using `regl.prop` to pass these in, we can specify them as arguments
      // to our drawcells function
      pointWidth: regl.prop('pointWidth'),
      transform: regl.prop("transform")
    },

    // specify the number of cells to draw
    count: cells.length,

    // specify that each vertex is a point (not part of a mesh)
    primitive: 'points',
  };
};

const cmds = {
  point: drawCells
};

export default cmds;
