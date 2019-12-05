// webpack.config.js
var webpack = require("webpack");
module.exports = {
    mode: "development",
    entry: ["./index.js"],
    output: {
        filename: "bundle.js",
        publicPath: "dist",
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    watch: true,
    devtool: "inline-source-map"
};