//@ts-check
'use strict'

/**
 * Get the class id from a value and class break values
 *
 * @param {number} v the value
 * @param {Array.<number>} breaks the breaks
 * @returns The class id, from 0 to breaks.length
 * @deprecated use getClassifier instead
 */
export function getClass(v, breaks) {
    if (!breaks) return
    if (breaks.length == 0) return 0
    if (v <= breaks[0]) return 0
    for (let i = 1; i < breaks.length; i++) if (breaks[i - 1] < v && v <= breaks[i]) return i
    return breaks.length
}

/**
 * Return a classifier function from break values.
 * The classifier function returns the class id (from 0 to breaks.length) from a value to classifiy.
 * @param {Array.<number>} breaks the breaks
 */
export function classifier(breaks) {
    const bl = breaks.length
    const classifier = value => {
        let i = 0
        while (i < bl) {
            const break_ = breaks[i]
            if (value <= break_) return i
            i++
        }
        return i
    }
    classifier.breaks = breaks
    return classifier
}



/**
 * Return a color classifier function from break values.
 * The classifier function returns the color from a value to classifiy.
 * There should be one color more than break values.
 * @param {Array.<number>} breaks the breaks
 * @param {Array.<string>} colors the colors
 */
export function colorClassifier(breaks, colors) {
    const classifier_ = classifier(breaks)
    const colorClissifier = value => colors[classifier_(value)]
    colorClissifier.breaks = breaks
    colorClissifier.colors = colors
    return colorClissifier
}




export let monitor = false

let previousDate
export function monitorDuration(message) {
    const nowDate = Date.now()

    //first call
    if (!previousDate) {
        previousDate = nowDate
        console.log(previousDate, message)
        return
    }

    const d = nowDate - previousDate
    previousDate = nowDate
    console.log(d, message)
}
