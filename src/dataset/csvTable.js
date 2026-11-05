//@ts-check
'use strict'

// A CSV tile as columns: what a worker sends back to the main thread, which then makes the cells. Each column is one string, which a worker can send in one copy, however many
// values it has. Shared by the worker (csvTileWorker.js) and the main thread (csvTiles.js).

/** Between the values of a column. A file with this character in it is left to the main thread: see tableOfRows. */
const SEPARATOR = '\0'

/**
 * @typedef {{header:Array.<string>, names:Array.<string>, columns:Array.<string>, length:number}} CSVTable
 */

/**
 * @param {Array.<Array.<string>>} rows The rows of the file, the first one being the header.
 * @returns {CSVTable|null} null when a value has the character kept for the table: a very unusual file.
 */
export function tableOfRows(rows) {
    if (!rows.length) return { header: [], names: [], columns: [], length: 0 }
    // the last of two columns of the same name is the one that counts, as in d3-dsv: the cell has one value of that name
    const header = rows[0]
    const names = []
    const indices = []
    for (let j = 0; j < header.length; j++) {
        const at = names.indexOf(header[j])
        if (at >= 0) indices[at] = j
        else {
            names.push(header[j])
            indices.push(j)
        }
    }
    const length = rows.length - 1
    const columns = []
    for (let k = 0; k < names.length; k++) {
        const j = indices[k]
        const values = new Array(length)
        for (let i = 0; i < length; i++) {
            // a row shorter than the header: an empty string, as in d3-dsv
            const v = rows[i + 1][j] || ''
            if (v.indexOf(SEPARATOR) >= 0) return null
            values[i] = v
        }
        columns.push(values.join(SEPARATOR))
    }
    return { header, names, columns, length }
}

/**
 * The values of a column of a table.
 * @param {CSVTable} table
 * @param {number} k
 * @returns {Array.<string>}
 */
export function valuesOfColumn(table, k) {
    return table.length ? table.columns[k].split(SEPARATOR) : []
}
