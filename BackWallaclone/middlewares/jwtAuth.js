'use strict';

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token =
    req.get('Authorization') || req.body.token || req.query.token || req.get('x-access-token');

  if (!token) {
    const err = new Error('no token provided');
    err.status = 401;
    return next(err);
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) {
      return next(err);
    }

    req.userId = payload._id;
    next();
  });
};
