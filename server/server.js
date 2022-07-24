const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');
const path = require('path');
const cors = require('cors');
require("dotenv").config({
  path: path.resolve(__dirname, '../.env')
});

let buildpath

const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(require('./routes/uploadsRoute'));

// Use cors middleware to allow React server with port 3000 for development and 5000 for production(build) to communicate with the backend server (port 5000)
app.use(cors({ origin: ["http://localhost:3000", "http://localhost:5000"] }));
// app.use(cors({ origin: "http://localhost:3000" }));

console.log(path.join(__dirname, 'uploads'));
app.use(express.static(path.join(__dirname, 'uploads')));

// On Production mode
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });
  buildpath = path.resolve('../client', 'build', 'index.html')
  // On Development mode  
} else {
  app.get('/', (req, res) => {
    res.send('DEVELOPMENT MODE - API is running...')
  })
}



app.use(routes);

db.once('open', () => {

  app.listen(PORT, () => {
    console.log(`API server for mocart running on port ${PORT}! with path ${buildpath}`);
  });
});
