module.exports = {
  mode: "production",
  output: {
    filename: "gridviz.min.js",
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
