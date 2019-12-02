// webpack.config.js
var webpack = require("webpack");
module.exports = {
  mode: "development",
  entry: ["./globals.js", "./index.js"],
  output: {
    filename: "bundle.js",
    publicPath: "dist"
  },
  watch: true,
  devtool: "inline-source-map"
};
