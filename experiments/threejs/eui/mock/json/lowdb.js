const jsonServer = require('json-server');

const userDetails = require('./core/user').generateUserDetails();
const userPreferences = require('./core/user').generateUserPreferences();

const generateMocks = () => {
    return Object.assign({
        'user-details': userDetails,
        'user-preferences': userPreferences,
    });
};

// set mocks-obj to the router
const mocks = generateMocks();
const router = jsonServer.router(mocks);

// expose router and db behind json-server
// (@{link https://github.com/typicode/lowdb})
exports.getDb = () => {
    return router.db;
};

exports.getRouter = () => {
    return router;
};
