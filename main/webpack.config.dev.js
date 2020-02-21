// webpack.config.js
//var webpack = require("webpack");
var LiveReloadPlugin = require("webpack-livereload-plugin");
module.exports = {
  mode: "development",
  entry: ["./src/main.js"],
  output: {
    filename: "bundle.js",
    publicPath: "dist"
  },
  plugins: [new LiveReloadPlugin()],
  watch: true,
  devtool: "inline-source-map"
};
