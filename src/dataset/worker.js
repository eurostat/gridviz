self.onmessage = function (e) {
    const { type, cells, preprocess } = e.data
    if (type === 'processCells') {
        const result = processCells(cells, preprocess)
        self.postMessage({ type: 'processedCells', result })
    }
}

function processCells(cells, preprocess) {
    // If no preprocess function is provided, return the cells as they are
    if (!preprocess) {
        return cells
    }

    // Apply preprocess function to each cell if available
    const preprocessedCells = cells.map((cell) => preprocess(cell)).filter((cell) => cell !== false)
    return preprocessedCells
}
