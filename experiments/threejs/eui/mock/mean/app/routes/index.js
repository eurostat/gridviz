const userRoutes = require('./user_routes');
module.exports = function (app, db) {
  userRoutes(app, db);
};
