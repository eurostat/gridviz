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
export function getClassifier(breaks) {
    const bl = breaks.length
    return value => {
        let i = 0
        while (i < bl) {
            const break_ = breaks[i]
            if (value <= break_) return i
            i++
        }
        return i
    }
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
