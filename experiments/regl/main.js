
//REGL API DOCUMENTATION: http://regl.party/api
const csvURL = "../assets/csv/pop_1km_new.csv";
const width = window.innerWidth;
const height = window.innerHeight;
const pointWidth = 1;
const canvas = document.getElementById("c");

const getMousePosition = event => {
    var canvas = event.currentTarget;
    var rect = canvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    var projection = mat3.create();
    var pos = vec2.fromValues(x, y);
    mat3.projection(projection, canvas.clientWidth, canvas.clientHeight);
    vec2.transformMat3(pos, pos, projection);
    return pos;
};

canvas.addEventListener("wheel", event => {
    event.preventDefault();
    mouse = getMousePosition(event);
    var direction = event.deltaY < 0 ? 1 : -1;
    zoomFactor = 1 + direction * 0.1;
    updateTransform();
});

function scale(transform, scale, viewCenter1) {
    var inverted = mat3.create();
    mat3.invert(inverted, transform);
    var modelCenter1 = map(inverted, viewCenter1); // scale from this point in model

    mat3.scale(transform, transform, [scale, scale]);
    var viewCenter2 = map(transform, modelCenter1); // map model center to screen
    var viewShift = [
        viewCenter1[0] - viewCenter2[0],
        viewCenter1[1] - viewCenter2[1]
    ];

    mat3.invert(inverted, transform);
    var modelShift = vec2.create();
    vec2.subtract(modelShift, map(inverted, viewShift), map(inverted, [0, 0]));
    mat3.translate(transform, transform, [-modelShift[0], -modelShift[1]]); // correct for the shift
}

var transform = mat3.create();
function updateTransform() {
    scale(transform, zoomFactor, mouse);
}

// initialize regl
createREGL({
    // callback when regl is initialized
    onDone: init,
});

function init(err, regl) {
    d3.csv(csvURL)
        .then(function (cells) {
            console.log("X; ", (parseInt(cells[1].X) / 10), "Y; ", (parseInt(cells[1].Y) / 10))
            points = cells.map(cell => ({
                x: (parseInt(cell.X) / 10), //conversion to screen coordinates
                y: (parseInt(cell.Y) / 10),
                color: valueToColor(cell.TOT_P),
            }));
            //run web gl stuff
            initialize_gl(err, regl);
        });
}

//https://stackoverflow.com/questions/42406600/using-d3-zoom-to-interact-with-webgl/42437153#42437153
function zoomed() {
    var t = d3.event.transform;
    set_transform(t.k, t.x, t.y);
}

var transform = mat3.create();
function set_transform(k, tx, ty) {

    // change the space to be pixels with 0,0 in top left
    var matrix = m4.ortho(0, gl.canvas.width, gl.canvas.height, 0, -1, 1);
    // apply the d3 translate and zoom
    matrix = m4.translate(matrix, [tx, ty, 0]);
    matrix = m4.scale(matrix, [k, k, 1]);
    // translate the unit quad to the center 
    matrix = m4.translate(matrix, [width / 2, height / 2, 0]);
    // make the unit quad be half the size of the canvas
    matrix = m4.scale(matrix, [width / 2, height / 2, 1]);

    gl.uniformMatrix4fv(shader.matrix_uniform, false, matrix);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

}




function initialize_gl(err, regl) {
    // function to compile a draw points regl func
    const drawPoints = regl({
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
          uniform float stageWidth;
          uniform float stageHeight;
  
          // helper function to transform from pixel space to normalized device coordinates (NDC)
          // in NDC (0,0) is the middle, (-1, 1) is the top left and (1, -1) is the bottom right.
          vec2 normalizeCoords(vec2 position) {
              // read in the positions into x and y vars
        float x = position[0];
        float y = position[1];
  
              return vec2(
            2.0 * ((x / stageWidth) - 0.5),
            // invert y since we think [0,0] is bottom left in pixel space
            -(2.0 * ((y / stageHeight) - 0.5)));
          }
  
          void main() {
              // update the size of a point based on the prop pointWidth
              gl_PointSize = pointWidth;
  
        // send color to the fragment shader
        fragColor = color;
  
              // scale to normalized device coordinates
              // gl_Position is a special variable that holds the position of a vertex
        gl_Position = vec4(normalizeCoords(position), 0.0, 1.0);
          }
          `,

        attributes: {
            // each of these gets mapped to a single entry for each of the points.
            // this means the vertex shader will receive just the relevant value for a given point.
            position: points.map(d => [d.x, d.y]),
            color: points.map(d => d.color),
        },

        uniforms: {
            // by using `regl.prop` to pass these in, we can specify them as arguments
            // to our drawPoints function
            pointWidth: regl.prop('pointWidth'),

            // regl actually provides these as viewportWidth and viewportHeight but I
            // am using these outside and I want to ensure they are the same numbers,
            // so I am explicitly passing them in.
            stageWidth: regl.prop('stageWidth'),
            stageHeight: regl.prop('stageHeight'),
        },

        // specify the number of points to draw
        count: points.length,

        // specify that each vertex is a point (not part of a mesh)
        primitive: 'points',
    });

    // start an animation loop
    let frameLoop = regl.frame(() => {
        // clear the buffer
        regl.clear({
            // background color (black)
            color: [0, 0, 0, 1],
            depth: 1,
        });

        // draw the points using our created regl func
        // note that the arguments are available via `regl.prop`.
        drawPoints({
            pointWidth,
            stageWidth: width,
            stageHeight: height,
        });

        // since we are only drawing once right now, let's just cancel the loop immediately
        if (frameLoop) {
            frameLoop.cancel();
        }
    });
}





function valueToColor(value) {
    let rgb;
    if (value > 10000) {
        rgb = d3.color("#ff0f00"); //red
    } else if (value > 5000) {
        rgb = d3.color("#ffce08"); //orange
    } else if (value > 1000) {
        rgb = d3.color("#ebff0a"); //yellow
    } else if (value > 100) {
        rgb = d3.color("#55e238"); //green
    } else if (value > 0) {
        rgb = d3.color("#005cff"); //blue
    }
    return [rgb.r, rgb.g, rgb.b, 1]
};


  // WEBPACK FOOTER //
  // script.js