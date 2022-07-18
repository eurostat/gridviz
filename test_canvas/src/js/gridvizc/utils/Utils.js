//@ts-check



let duration
export function monitorDuration(message) {
    const nD = Date.now();

    //first call
    if (!duration) {
        duration = nD
        console.log(duration, message)
        return
    }

    const d = nD - duration
    duration = nD
    console.log(d, message)
}
