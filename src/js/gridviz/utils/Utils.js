//@ts-check





export let monitor = false

let previousDate
export function monitorDuration(message) {
    const nowDate = Date.now();

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
