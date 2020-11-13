const path = require("path");
module.exports = {
  mode: "production",
  entry: ["./src/js/index.js"],
  devtool: false,
  output: {
    filename: "gridviz.min.js",
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
        loader: 'url-loader',
        options: {
          limit: 8192,
        },
      },
    ]
  },
  watch: false,
  optimization: {
    usedExports: true,
    minimize: true
  }
};
