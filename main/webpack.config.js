// webpack.config.js
var webpack = require("webpack");
var LiveReloadPlugin = require('webpack-livereload-plugin');
module.exports = {
  mode: "development",
  entry: ["./js/main.js"],
  output: {
    filename: "bundle.js",
    publicPath: "dist"
  },
  plugins: [
    new LiveReloadPlugin()
  ],
  watch: false,
  devtool: "inline-source-map"
};