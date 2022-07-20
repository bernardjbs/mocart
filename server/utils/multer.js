const multer = require('multer');

// set storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    var ext = file.originalname.substring(file.originalname.lastIndexOf('.'));
    
    cb(null, file.filename + '-' + Date.now() + ext);
  },
});

store = multer({ storage: storage });

module.exports = store;