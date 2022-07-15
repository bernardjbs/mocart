const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');
const path = require('path');
require("dotenv").config({
  path: path.resolve(__dirname, '../.env')
});

const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// On Production mode
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });
// On Development mode  
}else {
  app.get('/', (req, res) => {
    res.send('DEVELOPMENT MODE - API is running...')
  })
}

app.use(routes);

db.once('open', () => {
  const clientbuildpath = path.resolve('client', 'build', 'index.html')
  app.listen(PORT, () => {
    console.log(`API server for mocart running on port ${PORT}! with path ${clientbuildpath}`);
  });
});
