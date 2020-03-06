const path = require("path");
module.exports = {
  mode: "production",
  entry: ["./src/index.js"],
  output: {
    filename: "eurogridviz.min.js",
    publicPath: "build",
    library: "EuroGridViz",
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
  watch: false,
  optimization: {
    usedExports: true
  }
};
