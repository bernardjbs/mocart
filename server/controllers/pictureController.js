const { Picture } = require('../models');
const { signToken } = require('../utils/auth');

module.exports = {
  async getPictures(req, res) {
    try {
      const pictures = await Picture.find();
      res.status(200).json(pictures);
    } catch (err) {
      res.status(500).json({ message: 'Your request could not be performed, please try again', body: err });
    };
  },

  async uploadPictures(req, res, next) {
    try {
      let filesArray = [];
      req.files.forEach(element => {
        const file = {
          fileName: element.originalname,
          filePath: element.path,
          fileType: element.mimetype,
        }
        filesArray.push(file);
      });
      const pictures = new Picture({
        title: req.body.title,
        files: filesArray
      });
      await pictures.save();
      res.status(201).send('Files Uploaded Successfully');
    } catch (error) {
      res.status(400).send(error.message);
    }
  },
};