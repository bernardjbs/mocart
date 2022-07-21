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

const imgFileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg'
    || file.mimetype === 'image/jpeg') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer(
  {
    storage: storage, 
    fileFilter: imgFileFilter
  }
);

module.exports = store;