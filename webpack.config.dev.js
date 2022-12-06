// dev
const path = require("path");
const LiveReloadPlugin = require("webpack-livereload-plugin");
module.exports = {
  mode: "development",
  output: {
    filename: "gridviz.js",
    publicPath: "dist/",
    library: "gviz",
    libraryTarget: "umd",
    path: path.resolve(__dirname, "build")
  },
  /*node: {
    fs: "empty"
  },*/
  plugins: [new LiveReloadPlugin()],
  watch: true,
  devtool: "inline-source-map"
};
