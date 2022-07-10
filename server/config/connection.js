const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/mocart',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

mongoose.connection.on('connected', () => {
  console.log('Mongoose is connected');
})
module.exports = mongoose.connection;