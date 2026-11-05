// Bundles the tile worker with d3-dsv into a string the library can start a worker from: src/dataset/csvTileWorker.generated.js. To run after a change to csvTileWorker.js or csvTable.js.
const fs = require('fs')
const os = require('os')
const path = require('path')
const webpack = require('webpack')

const root = path.resolve(__dirname, '..')
const out = fs.mkdtempSync(path.join(os.tmpdir(), 'gridviz-worker-'))

webpack(
    {
        mode: 'production',
        target: 'webworker',
        entry: path.join(root, 'src/dataset/csvTileWorker.js'),
        output: { path: out, filename: 'worker.js' },
        devtool: false,
        performance: { hints: false },
        optimization: { minimize: true },
    },
    (error, stats) => {
        if (error || stats.hasErrors()) {
            console.error(error || stats.toString('errors-only'))
            process.exit(1)
        }
        const source = fs.readFileSync(path.join(out, 'worker.js'), 'utf8')
        fs.rmSync(out, { recursive: true, force: true })
        const header = '// Generated from csvTileWorker.js by scripts/build-worker.cjs: npm run build-worker\n'
        fs.writeFileSync(path.join(root, 'src/dataset/csvTileWorker.generated.js'), header + 'export const csvTileWorkerSource = ' + JSON.stringify(source) + '\n')
        console.log('worker bundled:', Math.round(source.length / 1024), 'KB')
    }
)
