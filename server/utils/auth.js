const jwt = require('jsonwebtoken');
const path = require('path');
require("dotenv").config({
  path: path.resolve(__dirname, '../../.env')
});

const secret = process.env.NODE_ENV;

const expiration = '900s' //15 minutes;

module.exports = {
  signToken: function ({ email, firstName, lastName, userType, _id }) {
    const payload = { email, firstName, lastName, userType, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};

