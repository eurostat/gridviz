// webpack.config.js
var webpack = require('webpack');
module.exports = {
    mode: 'development',
    entry: ["./globals.js", './app.js'],
    output: {
        filename: 'main.js',
        publicPath: 'dist'
    },
    watch: true
};