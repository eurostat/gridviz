// webpack.config.js
const path = require("path");
var LiveReloadPlugin = require("webpack-livereload-plugin");
module.exports = {
  mode: "development",
  entry: "./src/js/index.js",
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
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        exclude: /node_modules/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[hash]-[name].[ext]',
        },
      }
    ]
  },
  plugins: [new LiveReloadPlugin()],
  watch: true,
  devtool: "inline-source-map"
};
