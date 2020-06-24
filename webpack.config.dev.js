// webpack.config.js
const path = require("path");
var LiveReloadPlugin = require("webpack-livereload-plugin");
module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "gridviz.js",
    publicPath: "build",
    library: "gridviz",
    libraryTarget: "umd",
    path: path.resolve(__dirname, "build")
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  plugins: [new LiveReloadPlugin()],
  watch: true,
  devtool: "inline-source-map"
};
