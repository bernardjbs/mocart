const router = require('express').Router();
const { upload } = require('../../utils/multer');
const {
  getPictures,
  uploadPictures,
  getPictureByUser,
} = require('../../controllers/pictureController');

router.route('/pictures')
  .get(getPictures);

router.route('/pictures/:userId')
  .get(getPictureByUser)

router.post('/uploadmultiple', upload.array('files'), uploadPictures);

module.exports = router;