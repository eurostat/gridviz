const faker = require('faker');
const padding = '                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        ';

// Server sent events
exports.sse = (req, res, next) => {
    
    // sse setup
    res.sseSetup = () => {
        res.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
            'Access-Control-Allow-Origin': 'http://localhost:4200',
            'Access-Control-Allow-Headers': 'Last-Event-ID',
        });
        res.write(padding);
        res.flush();
    };

    // push msg
    res.sseSend = (event, data) => {
        // The "event" field is "message" by default, otherwise new event handlers need to be manually added.
        res.write(`id: ${faker.random.uuid()}\nevent: ${event}\ndata: ${JSON.stringify(data)}\n\n`);
        res.flush();
    };

    next();
};
