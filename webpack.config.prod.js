const path = require("path");

module.exports = {
  mode: "production",
  output: {
    filename: "gridviz.min.js",
    publicPath: "build/",
    library: "gviz",
    libraryTarget: "umd",
    path: path.resolve(__dirname, "build")
  },
  devtool: false,
  /*module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            babelrc: false,
            cacheDirectory: true,
            sourceMaps: false
          }
        }
      },
    ],
  },*/
  watch: false,
  optimization: {
    usedExports: true,
    minimize: true,
  },
};
