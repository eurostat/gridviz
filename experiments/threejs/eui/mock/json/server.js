const jsonServer = require('json-server');
const app = jsonServer.create();
const router = require('./lowdb').getRouter();
const middlewares = jsonServer.defaults();

// const delayMiddleware = require('./middlewares/delay');
// const errorsMiddleware = require('./middlewares/errors');
// const sseMiddleware = require('./middlewares/sse');

// Set the port of our application
const port = process.env.PORT || 3000;

// Middlewares
app.use(middlewares);
// app.use(delayMiddleware.delay);
// app.use(errorsMiddleware.error);
// app.use(sseMiddleware.sse);

// To handle POST, PUT and PATCH we need to use any body-parser
// We using the one bundled with json-server
app.use(jsonServer.bodyParser);

// Controllers


// Rewriter rules
app.use(jsonServer.rewriter({
    '/api/*': '/$1',
    '/user/preferences?userId:userId&lang=:lang': '/user-preferences',
}));

// Mount the router based on lowdb.js
app.use(router);

// Start listening
app.listen(port, () => {
    console.log(`\n\nJSON Server is running! Open the browser at http://localhost:${port}\n\n`);
});
