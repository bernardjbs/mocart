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

  uploadPictures (req, res, next) {
    const files = req.files;
    let result = files.map(async (file, index) => {
      let img = fs.readFileSync(file.path)
      const img_base64 = img.toString('base64')
      const picture = new Picture({
        filename: files[index].originalname,
        contentType: files[index].mimetype,
        imageBase64: img_base64,
      });

      return picture
      .save()
      .then(() => {
          return { msg : `${files[index].originalname} Uploaded Successfully...!`}
      })
      .catch(error =>{
          if(error){
              return Promise.reject({ error : error.message || `Cannot Upload ${files[index].originalname} Something Missing!`})
          }
      })
    });
    Promise.all(result)
    .then( msg => {
        res.json(msg);
    })
    .catch(err =>{
        res.json(err);
    })
  },
};