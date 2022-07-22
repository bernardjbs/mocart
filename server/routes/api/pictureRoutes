const router = require('express').Router();
const { upload } = require('../../utils/multer');
const {
  getPictures,
  uploadPictures,
} = require('../../controllers/pictureController');

router.route('/pictures')
  .get(getPictures)

router.post('/uploadmultiple', upload.array('files'), uploadPictures);

module.exports = router;