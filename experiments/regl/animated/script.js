const width = window.innerWidth;
const height = window.innerHeight;
var numPoints = 100000;
var pointWidth = 3;
const pointMargin = 1;
var duration = 5000;
var delayByIndex;
var maxDuration; // include max delay in here
var delayAtEnd = 0; // how long to stay at a final frame before animating again (in seconds)
imgURL = "image.json";
csvURL = "../../assets/csv/pop_5km.csv";

function main(regl, cellsData, imgData) {
  const toMap = points => mapLayout(points, width, height, cellsData);
  const toBars = points => barsLayout(points, width, height, cellsData);
  const toSwarm = points => swarmLayout(points, width, height, cellsData);
  const toRandom = points => randomLayout(points, width, height, cellsData);
  const toPhoto = points => photoLayout(points, width, height, imgData);
  const toArea = points => areaLayout(points, width, height, cellsData);
  const toPhyllotaxis = points =>
    phyllotaxisLayout(points, pointWidth, width / 2, height / 2, cellsData);
  const toMiddle = points => {
    points.forEach((d, i) => {
      d.x = width / 2;
      d.y = height / 2;
      d.color = [0, 0, 0];
    });
  };
  const toBlack = points => {
    points.forEach((d, i) => {
      d.color = [0, 0, 0];
    });
  };

  /*   const layouts = [toPhyllotaxis, toMap, toArea, toBars, toPhoto, toBlack]; */
  const layouts = [toPhoto, toMap, toBars, toArea];
  let currentLayout = 0;

  // wrap d3 color scales so they produce vec3s with values 0-1
  // also limit the t value to remove darkest color
  function wrapColorScale(scale) {
    const tScale = d3
      .scaleLinear()
      .domain([0, 1])
      .range([0.4, 1]);
    return t => {
      const rgb = d3.rgb(scale(tScale(t)));
      return [rgb.r / 255, rgb.g / 255, rgb.b / 255];
    };
  }

  const colorScales = [
    d3.scaleSequential(d3.interpolateViridis),
    d3.scaleSequential(d3.interpolateMagma),
    d3.scaleSequential(d3.interpolateInferno),
    d3.scaleSequential(d3.interpolateCool),
  ].map(wrapColorScale);
  let currentColorScale = 0;


  // function to compile a draw points regl func
  function createDrawPoints(points) {
    const drawPoints = regl({
      frag: `
		  precision highp float;
			varying vec3 fragColor;
			void main() {
				gl_FragColor = vec4(fragColor, 1);
			}
			`,

      vert: `
			attribute vec2 positionStart;
			attribute vec2 positionEnd;
			attribute float index;
			attribute vec3 colorStart;
			attribute vec3 colorEnd;

			varying vec3 fragColor;

			uniform float pointWidth;
			uniform float stageWidth;
			uniform float stageHeight;
			uniform float elapsed;
			uniform float duration;
			uniform float delayByIndex;
			// uniform float tick;
			// uniform float animationRadius;
      uniform float numPoints;
      uniform vec2 rotation;

			// helper function to transform from pixel space to normalized device coordinates (NDC)
			// in NDC (0,0) is the middle, (-1, 1) is the top left and (1, -1) is the bottom right.
			vec2 normalizeCoords(vec2 position) {
				// read in the positions into x and y vars
	      float x = 2.0 * ((position[0] / stageWidth) - 0.5);
	      float y = -(2.0 * ((position[1] / stageHeight) - 0.5)); // invert y since we think [0,0] is bottom left in pixel space

        return vec2(
           x,
           y
           );

        //rotate 90 degrees doesnt seem to correct the coordinates
          //return vec2(
           // x * rotation.y + y * rotation.x,
           // y * rotation.y - x * rotation.x
           // );
      }
      


			// helper function to handle cubic easing (copied from d3 for consistency)
			// note there are pre-made easing functions available via glslify.
			float easeCubicInOut(float t) {
				t *= 2.0;
        t = (t <= 1.0 ? t * t * t : (t -= 2.0) * t * t + 2.0) / 2.0;

        if (t > 1.0) {
          t = 1.0;
        }

        return t;
			}

			void main() {
				gl_PointSize = pointWidth;

				float delay = delayByIndex * index;
	      float t;

	      // drawing without animation, so show end state immediately
	      if (duration == 0.0) {
	        t = 1.0;

	      // still delaying before animating
	      } else if (elapsed < delay) {
	        t = 0.0;
	      } else {
	        t = easeCubicInOut((elapsed - delay) / duration);
	      }

	      // interpolate position
	      vec2 position = mix(positionStart, positionEnd, t);

	      // apply an ambient animation
				// float dir = index > numPoints / 2.0 ? 1.0 : -1.0;
	      // position[0] += animationRadius * cos((tick + index) * dir);
	      // position[1] += animationRadius * sin((tick + index) * dir);

	      // above we + index to offset how they move
	      // we multiply by dir to change CW vs CCW for half


	      // interpolate color
	      fragColor = mix(colorStart, colorEnd, t);

	      // scale to normalized device coordinates
				// gl_Position is a special variable that holds the position of a vertex
        //4 dimensional floating point vector
        gl_Position = vec4(normalizeCoords(position), 0.0, 1.0);
			}
			`,

      attributes: {
        positionStart: points.map(d => [d.sx, d.sy]),
        positionEnd: points.map(d => [d.tx, d.ty]),
        colorStart: points.map(d => d.colorStart),
        colorEnd: points.map(d => d.colorEnd),
        index: d3.range(points.length),
      },

      uniforms: {
        pointWidth: regl.prop('pointWidth'),
        stageWidth: regl.prop('stageWidth'),
        stageHeight: regl.prop('stageHeight'),
        delayByIndex: regl.prop('delayByIndex'),
        duration: regl.prop('duration'),
        numPoints: numPoints,
        // animationRadius: 0,// 15.0,
        // tick: (reglprops) => { // increase multiplier for faster animation speed
        // 	// console.log(reglprops);
        // 	// return reglprops.tick / 50;
        // 	return 0; // disable ambient animation
        // },
        // time in milliseconds since the prop startTime (i.e. time elapsed)
        elapsed: ({
          time
        }, {
          startTime = 0
        }) => (time - startTime) * 1000,
      },

      count: points.length,
      primitive: 'points',
    });

    return drawPoints;
  }

  // function to start animation loop (note: time is in seconds)
  function animate(layout, points) {
    /*  console.log('animating with new layout'); */
    // make previous end the new beginning
    points.forEach(d => {
      d.sx = d.tx;
      d.sy = d.ty;
      d.colorStart = d.colorEnd;
    });

    // layout points
    layout(points);

    //change point width according to 
    if (currentLayout === 0) {
      pointWidth = 3;
    } else {
      pointWidth = 2;
    }

    // copy layout x y to end positions
    const colorScale = colorScales[currentColorScale];
    points.forEach((d, i) => {
      d.tx = d.x;
      d.ty = d.y;
      // d.colorEnd = colorScale(i / points.length)
      d.colorEnd = d.color;
    });

    // create the regl function with the new start and end points
    const drawPoints = createDrawPoints(points);

    // start an animation loop
    let startTime = null; // in seconds
    const frameLoop = regl.frame(({
      time
    }) => {
      // keep track of start time so we can get time elapsed
      // this is important since time doesn't reset when starting new animations
      if (startTime === null) {
        startTime = time;
      }

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
        duration,
        delayByIndex,
        startTime,
      });



      // if we have exceeded the maximum duration, move on to the next animation
      if (time - startTime > maxDuration / 1000 + delayAtEnd) {
        /*     console.log('done animating, moving to next layout'); */

        frameLoop.cancel();
        currentLayout = (currentLayout + 1) % layouts.length;
        currentColorScale = (currentColorScale + 1) % colorScales.length;

        // when restarting at the beginning, come back from the middle again
        if (currentLayout === 0) {
          points.forEach((d, i) => {
            d.tx = width / 2;
            d.ty = height / 2;
            d.colorEnd = [0, 0, 0];
          });
        }


        animate(layouts[currentLayout], points);
      }
    });
  }

  // create initial set of points
  const points = d3.range(numPoints).map(d => ({}));

  points.forEach((d, i) => {
    d.tx = width / 2;
    d.ty = height / 2;
    d.colorEnd = [0, 0, 0];
  });

  // start animation loop
  animate(layouts[currentLayout], points);
}

loadData(width, height).then(({
  cellsData,
  imgData
}) => {
  console.log('data has loaded. initializing regl...');
  console.log("number of cells in csv file:", cellsData.length); //toPhoto will throw an error if there are less pixels than numPoints
  delayByIndex = 500 / numPoints;
  maxDuration = duration + delayByIndex * numPoints;

  // initialize regl
  createREGL({
    // callback when regl is initialized
    onDone: (err, regl) => {
      if (err) {
        console.error('Error initializing regl', err);
        return;
      }
      main(regl, cellsData, imgData);
    },
  });
});