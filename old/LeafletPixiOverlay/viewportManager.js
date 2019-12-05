//Parent class for the viewport and additional functionality

const Viewport = require("pixi-viewport");
viewportManager = {};

viewportManager.init = function () {
  viewportManager.graphicsLayers = []; // cache of pixi.graphics objects added to the viewport
  viewportManager.initialXScale = null; //
  viewportManager.initialYScale = null; //
  viewportManager.viewport = null; //

  // create viewport (viewer) to add pan and zoom capability to pixijs
  const viewport = new Viewport.Viewport({
    screenWidth: window.innerWidth,
    screenHeight: window.innerHeight,
    worldWidth: 6000000,
    worldHeight: 5000000,
    antialias: true,
    interaction: app.renderer.plugins.interaction // the interaction module is important for wheel to work properly when renderer.view is placed or scaled
  });
  viewportManager.viewport = viewport;

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

  //function that clears all primitives from all graphics layers off the canvas
  viewportManager.clearAllGraphicsLayers = function () {
    for (var i = 0; i < viewportManager.graphicsLayers.length; i++) {
      viewportManager.graphicsLayers[i].clear();
    }
  };

  // define scroll event
  viewport.on("wheel", e => {
    var scale = e.viewport.scaled;
    console.info("scale: " + scale);
  });

  viewportManager.clearViewport = function () {
    for (var i = viewportManager.viewport.children.length - 1; i >= 0; i--) {
      viewportManager.viewport.removeChild(
        viewportManager.viewport.children[i]
      );
    }
  };
};

/*   viewport.fitWorld(false); */
