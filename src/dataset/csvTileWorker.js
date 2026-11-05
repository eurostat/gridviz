// The worker that fetches and parses the tiles of a TiledGrid with the worker option. Bundled with d3-dsv into csvTileWorker.generated.js (npm run build-worker).
import { csvParseRows } from 'd3-dsv'
import { tableOfRows } from './csvTable.js'

const requests = new Map()

self.onmessage = async (event) => {
    const { id, url, abort } = event.data
    if (abort) {
        const controller = requests.get(id)
        if (controller) controller.abort()
        return
    }
    const controller = new AbortController()
    requests.set(id, controller)
    try {
        const response = await fetch(url, { signal: controller.signal })
        // as d3-fetch: the message starts with the status, by which a missing tile is told from a failure
        if (!response.ok) {
            self.postMessage({ id, error: response.status + ' ' + response.statusText })
            return
        }
        const table = tableOfRows(csvParseRows(await response.text()))
        self.postMessage(table ? { id, table } : { id, onMainThread: true })
    } catch (error) {
        self.postMessage({ id, error: String((error && error.message) || error), aborted: !!error && error.name === 'AbortError' })
    } finally {
        requests.delete(id)
    }
}
