module.exports = {
  mode: "production",
  output: {
    filename: "gridviz.min.js",
    publicPath: "dist/",
    library: "gviz",
    libraryTarget: "umd",
  },
  devtool: false,
  watch: false,
  optimization: {
    usedExports: true,
    minimize: true,
  },
};
