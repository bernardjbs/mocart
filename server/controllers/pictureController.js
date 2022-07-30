const { Picture } = require('../models');
const { signToken } = require('../utils/auth');
const fs = require('fs');
const SERVER_URI = process.env.NODE_ENV === 'development' ? process.env.DEV_SERVER_URI : process.env.PROD_SERVER_URI;

module.exports = {
  async getPictures(req, res, next) {
    try {
      const pictures = await Picture.find();
      res.status(200).json(pictures);
    } catch (err) {
      res.status(500).json({ message: 'Your request could not be performed, please try again', body: err });
    };
  },

  async getPictureByUser(req, res) {
    try {
      console.log(req.params)
      const pictures = await Picture.find({ userId: req.params.userId } )
      res.status(200).json(pictures);
    } catch (err) {
      res.status(500).json({ message: 'Your request could not be performed, please try again', body: err });
    };
  },

  uploadPictures (req, res, next) {
    const files = req.files;
    let filepath = '';
    // console.log(req.body.userId) 

    let result = files.map(async (file, index) => {
      filepath = file.path.replace(/\\/g, '/') // convert the backslash to forward slash
      let img = fs.readFileSync(file.path)
      const img_base64 = img.toString('base64')
      let userId = req.body.userId

      console.log(userId[0])
      const picture = new Picture({
        filename: files[index].originalname,
        contentType: files[index].mimetype,
        imageBase64: img_base64,
        filepath: `${SERVER_URI}/${filepath}`,
        userId: userId[0]
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
      .then(msg => {
        userId = req.body.userId
      res.json(msg);
    })
    .catch(err =>{
        res.json(err);
    })
    
  },
};