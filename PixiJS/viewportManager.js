//Defines the PIXI application and the viewport

app = new PIXI.Application({
  width: window.innerWidth - 10,
  height: window.innerHeight - 10
});
document.body.appendChild(app.view);
app.view.id = "grid-canvas";

// create viewport (viewer) to add pan and zoom capability to pixijs
const viewport = new Viewport.Viewport({
  screenWidth: window.innerWidth,
  screenHeight: window.innerHeight,
  worldWidth: 5135000,
  worldHeight: 4470000,
  top: 5410000,
  bottom: 940000,
  right: 940000,
  interaction: app.renderer.plugins.interaction // the interaction module is important for wheel to work properly when renderer.view is placed or scaled
});

//restrict viewport
/* viewport.clamp({
    left: viewport.worldWidth - 20000,
    right: viewport.worldWidth + 20000,
    top: -20000,
    bottom: +20000
  }); */

// add the viewport to the stage
app.stage.addChild(viewport);

// activate plugins
viewport
  .drag()
  .pinch()
  .wheel()
  .decelerate();

this.initialXScale = viewport.worldWidth / app.view.width;
this.initialYScale = viewport.worldHeight / app.view.height;
/* viewport.scaled = this.initialScale; */

function clearAllGraphicsLayers() {
  for (var i = 0; i < this.graphicsLayers.length; i++) {
    this.graphicsLayers[i].clear();
  }
}

// define scroll event
viewport.on("wheel", e => {
  var scale = e.viewport.scaled;
  console.log("scale: " + scale);
  this.changeGraphicsForCurrentScale(scale);
});

/*   viewport.fitWorld(false); */
