import { test } from 'node:test'
import assert from 'node:assert/strict'
import { csvParse, csvParseRows } from 'd3-dsv'
import { tableOfRows } from '../src/dataset/csvTable.js'
import { cellsOfTable } from '../src/dataset/csvTiles.js'

const viaWorker = async (text) => cellsOfTable(tableOfRows(csvParseRows(text)))

// the cells of the worker's way, against d3's csv, the way without the option
const files = {
    plain: 'x,y,v\n1,2,3\n4,5,6\n',
    'no final newline': 'x,y,v\n1,2,3\n4,5,6',
    'windows newlines': 'x,y,v\r\n1,2,3\r\n4,5,6\r\n',
    quotes: 'x,y,name\n1,2,"a, b"\n3,4,"say ""hi"""\n5,6,"two\nlines"\n',
    'empty values': 'x,y,v\n1,2,\n3,,\n,,\n',
    'short rows': 'x,y,v\n1,2\n3\n',
    'long rows': 'x,y\n1,2,3,4\n',
    'blank line': 'x,y\n1,2\n\n3,4\n',
    'header only': 'x,y,v\n',
    'two columns of the same name': 'x,y,x\n1,2,3\n4,5,6\n',
    'empty file': '',
    'many cells': 'x,y,v\n' + Array.from({ length: 2000 }, (_, i) => i + ',' + i * 2 + ',' + (i % 7 ? i : '')).join('\n') + '\n',
    'numbers stay strings': 'x,y,v\n1.50,002,1e3\n',
}

for (const [name, text] of Object.entries(files)) {
    test('cells as from d3: ' + name, async () => {
        const fromD3 = csvParse(text)
        const cells = await viaWorker(text)
        assert.deepEqual([...cells], [...fromD3])
        assert.deepEqual(cells.columns, fromD3.columns)
        for (const cell of cells) for (const value of Object.values(cell)) assert.equal(typeof value, 'string')
    })
}

test('a file with the character kept for the table is left to the main thread', () => {
    assert.equal(tableOfRows(csvParseRows('x,y\n1,a\0b\n')), null)
})
