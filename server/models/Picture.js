const { Schema, model } = require('mongoose');

// Image uploads
const pictureSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    files: [Object]
  },
  {
    timestamps: true
  },
);

const Picture = model('picture', pictureSchema);

module.exports = Picture;