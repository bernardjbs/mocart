const multer = require('multer');

// set storage
const storage = multer.diskStorage({

  /* UNCOMMENT TO SAVE TO 'uploads' FOLDER */
  //   destination: (req, file, cb) => {
  //     cb(null, 'uploads');
  // },

  filename: (req, file, cb) => {
    cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
  }
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

module.exports = { upload };