// dev
const path = require("path");

const LiveReloadPlugin = require("webpack-livereload-plugin");

module.exports = {
  mode: "development",
  entry: "./src/js/gridvizc/index.js",
  output: {
    filename: "gridvizc.js",
    publicPath: "build/",
    library: "gviz",
    libraryTarget: "umd",
    path: path.resolve(__dirname, "build")
  },
  node: {
    fs: "empty"
  },
  plugins: [new LiveReloadPlugin()],
  watch: true,
  devtool: "inline-source-map"
};
