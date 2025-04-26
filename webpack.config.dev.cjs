// dev
const LiveReloadPlugin = require('webpack-livereload-plugin')

module.exports = {
    mode: 'development',
    output: {
        filename: 'gridviz.js',
        library: 'gridviz',
        libraryTarget: 'umd',
    },
    plugins: [new LiveReloadPlugin()],
    watch: true,
    devtool: 'inline-source-map',

    experiments: {
        asyncWebAssembly: true,
        //syncWebAssembly: true
    },

    // webpack.config.js

    // other config options
    module: {
        rules: [
            {
                test: /\.worker\.js$/,
                use: { loader: 'worker-loader' },
            },
            // other rules
        ],
    },
    //this is to test data from a local folder, exposed via a local server. Replace directory and port on request.
    devServer: {
        static: {
            //directory: '/home/juju/workspace/',
            //directory: '/home/juju/workspace/tiled-grid-france-filosofi/out/csv/',
            //directory: '/home/juju/Bureau/geodata/IFS/',
            directory: '/home/juju/gisco/grid_pop_c2021/',
        },
        port: 1234,
        headers: { 'Access-Control-Allow-Origin': '*' },
    },
}
