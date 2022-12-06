// dev
const LiveReloadPlugin = require("webpack-livereload-plugin");
module.exports = {
  mode: "development",
  output: {
    filename: "gridviz.js",
    publicPath: "dist/",
    library: "gviz",
    libraryTarget: "umd",
  },
  /*node: {
    fs: "empty"
  },*/
  plugins: [new LiveReloadPlugin()],
  watch: true,
  devtool: "inline-source-map"
};
