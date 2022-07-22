const { Picture } = require('../models');
const { signToken } = require('../utils/auth');
const fs = require('fs');

module.exports = {
  async getPictures(req, res) {
    try {
      const pictures = await Picture.find();
      res.status(200).json(pictures);
    } catch (err) {
      res.status(500).json({ message: 'Your request could not be performed, please try again', body: err });
    };
  },

  uploadPictures(req, res) {
    const files = req.files;
    files.map(async (file, index) => {
      let img = fs.readFileSync(file.path)
      const img_base64 = img.toString('base64')
      const picture = new Picture({
        filename: files[index].originalname,
        contentType: files[index].mimetype,
        imageBase64: img_base64,
      });
      try {
        await picture
          .save();
        res.status(201).send('Files Uploaded Successfully');
      } catch (error) {
        res.status(400).send(error.message);
      }
    });
  },
};