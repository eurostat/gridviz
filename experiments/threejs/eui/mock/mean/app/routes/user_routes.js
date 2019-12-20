const User = require('../models/user');
const uuid = require('uuid/v1');

module.exports = function (app, db) {
  db.then(db => {

    app.get('/api/user-details', (req, res) => {
      res.send(db.get('user-details'))
    });

    app.get('/api/users', (req, res) => {
      res.send(db.get('users'))
    });

    app.post('/api/users', (req, res) => {
      db.get('users')
        .push({ ...User, ...req.body, ...{ id: uuid() } })
        .last()
        .write()
        .then(user => res.send(user))
    });

  });
};
