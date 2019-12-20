// Simulate server side delay
exports.delay = (req, res, next) => {
    const randomOutcome = Math.random();
    const minimumDelay = 0;
    if (randomOutcome < 0.03) {
        setTimeout(next, Math.floor((Math.random() * 10000) + 100));
    } else {
        setTimeout(next, minimumDelay+1);
    }
};
