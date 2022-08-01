const jwt = require('jsonwebtoken');
const path = require('path');
require("dotenv").config({
  path: path.resolve(__dirname, '../../.env'),
});

const secret = process.env.NODE_ENV;

const expiration = '900s' //15 minutes;

module.exports = {
  // function for our authenticated routes
  authMiddleware: function (req, res, next) {
    // allows token to be sent via  req.query or headers
    let token = req.query.token || req.headers.authorization;

    // ["Bearer", "<tokenvalue>"]
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    };

    if (!token) {
      return res.status(400).json({ message: 'You have no token!' });
    };

    // verify token and get user data out of it
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log('Invalid token');
      return res.status(400).json({ message: 'invalid token!' });
    };

    // send to next endpoint
    next();
  },
  signToken: function ({ email, firstName, lastName, userType, _id }) {
    const payload = { email, firstName, lastName, userType, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};

