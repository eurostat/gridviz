// dev
const LiveReloadPlugin = require('webpack-livereload-plugin')

module.exports = {
    mode: 'development',
    output: {
        filename: 'gridviz.js',
        library: 'gviz',
        libraryTarget: 'umd',
    },
    plugins: [new LiveReloadPlugin()],
    watch: true,
    devtool: 'inline-source-map',

    experiments: {
        asyncWebAssembly: true,
        //syncWebAssembly: true
    },

    devServer: {
        static: {
            directory: '/home/juju/serveur_data/',
        },
        port: 1234,
    },
}
